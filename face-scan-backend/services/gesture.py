import cv2
import numpy as np
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from services.antispoof import decode_image
import urllib.request
import os

# ── Download model if not present ────────────────────────────────────────────
MODEL_PATH = "models/face_landmarker.task"

if not os.path.exists("models"):
    os.makedirs("models")

if not os.path.exists(MODEL_PATH):
    print("Downloading Face Landmarker model...")
    urllib.request.urlretrieve(
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        MODEL_PATH
    )
    print("Model downloaded.")

# ── Initialize Face Landmarker ────────────────────────────────────────────────
base_options = python.BaseOptions(model_asset_path=MODEL_PATH)
options = vision.FaceLandmarkerOptions(
    base_options=base_options,
    output_face_blendshapes=True,      # gives us blink, smile scores directly
    output_facial_transformation_matrixes=True,
    num_faces=1
)
detector = vision.FaceLandmarker.create_from_options(options)

# ── Landmark indices ──────────────────────────────────────────────────────────
LEFT_EYE  = [362, 385, 387, 263, 373, 380]
RIGHT_EYE = [33,  160, 158, 133, 153, 144]
MOUTH     = [61,  291, 39,  181, 0,   17, 269, 405]
NOSE_TIP  = 1
LEFT_EAR  = 234
RIGHT_EAR = 454

def eye_aspect_ratio(landmarks, eye_indices, image_size) -> float:
    w, h = image_size
    points = [(landmarks[i].x * w, landmarks[i].y * h) for i in eye_indices]
    v1 = np.linalg.norm(np.array(points[1]) - np.array(points[5]))
    v2 = np.linalg.norm(np.array(points[2]) - np.array(points[4]))
    h1 = np.linalg.norm(np.array(points[0]) - np.array(points[3]))
    return round((v1 + v2) / (2.0 * h1), 4)

def mouth_aspect_ratio(landmarks, image_size) -> float:
    w, h = image_size
    points = [(landmarks[i].x * w, landmarks[i].y * h) for i in MOUTH]
    v1 = np.linalg.norm(np.array(points[2]) - np.array(points[6]))
    v2 = np.linalg.norm(np.array(points[3]) - np.array(points[7]))
    h1 = np.linalg.norm(np.array(points[0]) - np.array(points[1]))
    return round((v1 + v2) / (2.0 * h1), 4)

def head_turn_ratio(landmarks, image_size) -> float:
    w, h = image_size
    nose  = (landmarks[NOSE_TIP].x * w,  landmarks[NOSE_TIP].y * h)
    l_ear = (landmarks[LEFT_EAR].x * w,  landmarks[LEFT_EAR].y * h)
    r_ear = (landmarks[RIGHT_EAR].x * w, landmarks[RIGHT_EAR].y * h)
    left_dist  = np.linalg.norm(np.array(nose) - np.array(l_ear))
    right_dist = np.linalg.norm(np.array(nose) - np.array(r_ear))
    if right_dist == 0:
        return 1.0
    return round(left_dist / right_dist, 4)

def detect_gesture(image_bytes: bytes) -> dict:
    image = decode_image(image_bytes)
    if image is None:
        return { "face_detected": False, "gestures": {} }

    # Convert to MediaPipe image format
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

    result = detector.detect(mp_image)

    if not result.face_landmarks:
        return { "face_detected": False, "gestures": {} }

    landmarks  = result.face_landmarks[0]
    blendshapes = result.face_blendshapes[0] if result.face_blendshapes else None
    image_size = (image.shape[1], image.shape[0])

    # ── Use blendshape scores if available (more accurate) ────────────────────
    if blendshapes:
        blendshape_map = {b.category_name: b.score for b in blendshapes}

        blink_left  = blendshape_map.get("eyeBlink_L", 0)
        blink_right = blendshape_map.get("eyeBlink_R", 0)
        avg_blink   = round((blink_left + blink_right) / 2, 4)
        smile_left  = blendshape_map.get("mouthSmile_L", 0)
        smile_right = blendshape_map.get("mouthSmile_R", 0)
        avg_smile   = round((smile_left + smile_right) / 2, 4)
    else:
        avg_blink = 1.0 - eye_aspect_ratio(landmarks, LEFT_EYE, image_size)
        avg_smile = mouth_aspect_ratio(landmarks, image_size)

    turn = head_turn_ratio(landmarks, image_size)

    # ── Thresholds ────────────────────────────────────────────────────────────
    is_blinking     = avg_blink > 0.5
    is_smiling      = avg_smile > 0.4
    is_turned_left  = turn < 0.65
    is_turned_right = turn > 1.45

    return {
        "face_detected": True,
        "scores": {
            "blink_score":     float(avg_blink),
            "smile_score":     float(avg_smile),
            "head_turn_ratio": float(turn)
        },
        "gestures": {
            "blink":       bool(is_blinking),
            "smile":       bool(is_smiling),
            "turn_left":   bool(is_turned_left),
            "turn_right":  bool(is_turned_right)
        }
    }