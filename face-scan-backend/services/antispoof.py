import cv2
import numpy as np

def decode_image(image_bytes: bytes) -> np.ndarray:
    """Convert raw bytes to OpenCV image"""
    np_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return image

def check_antispoof(image_bytes: bytes) -> dict:
    """
    Basic anti-spoof check using image quality analysis.
    Phase 2 placeholder — will be replaced with proper model in Phase 3.
    
    Checks:
    - Is it a valid image?
    - Is the image too small?
    - Is the image too blurry? (photo of a screen is often blurry)
    - Is the brightness too flat? (printed photo has flat lighting)
    """
    try:
        image = decode_image(image_bytes)

        if image is None:
            return { "is_real": False, "reason": "invalid_image" }

        # Check image size
        height, width = image.shape[:2]
        if width < 100 or height < 100:
            return { "is_real": False, "reason": "image_too_small" }

        # Check blurriness using Laplacian variance
        # A real face has more sharp edges than a photo of a screen
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()

        if blur_score < 20:
            return { "is_real": False, "reason": "image_too_blurry", "score": blur_score }

        # Check brightness variance
        # A printed photo held up to camera has very flat, uniform brightness
        brightness = np.mean(gray)
        brightness_std = np.std(gray)

        if brightness_std < 15:
            return { "is_real": False, "reason": "flat_lighting", "score": brightness_std }

        return { 
            "is_real": True, 
            "blur_score": round(blur_score, 2),
            "brightness": round(float(brightness), 2),
            "brightness_std": round(float(brightness_std), 2)
        }

    except Exception as e:
        return { "is_real": False, "reason": f"error: {str(e)}" }