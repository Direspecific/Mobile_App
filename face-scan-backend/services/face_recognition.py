import cv2
import numpy as np
from deepface import DeepFace
from services.antispoof import decode_image

def extract_embedding(image_bytes: bytes) -> dict:
    """
    Detects face and extracts ArcFace embedding using DeepFace
    """
    image = decode_image(image_bytes)
    if image is None:
        return { "success": False, "reason": "invalid_image" }

    try:
        # DeepFace expects RGB
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        result = DeepFace.represent(
            img_path=rgb,
            model_name="ArcFace",       # same model as InsightFace
            detector_backend="opencv",  # fast and works on Windows
            enforce_detection=True      # fail if no face found
        )

        if not result or len(result) == 0:
            return { "success": False, "reason": "no_face_detected" }

        embedding = result[0]["embedding"]
        facial_area = result[0]["facial_area"]

        return {
            "success":          True,
            "embedding":        embedding,
            "embedding_length": len(embedding),
            "facial_area":      facial_area
        }

    except ValueError as e:
        # DeepFace raises ValueError when no face is detected
        return { "success": False, "reason": "no_face_detected", "detail": str(e) }

    except Exception as e:
        return { "success": False, "reason": f"error: {str(e)}" }


def cosine_similarity(a: list, b: list) -> float:
    """
    Compare two embeddings.
    Returns 0.0 to 1.0 — higher means more similar
    1.0 = same person
    0.0 = completely different person
    """
    a = np.array(a)
    b = np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))