from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.antispoof import check_antispoof
from services.gesture import detect_gesture
from services.face_recognition import extract_embedding, cosine_similarity

router = APIRouter()

@router.post("/register/biometric")
async def register_biometric(
    image: UploadFile = File(...),
    voter_id: str = Form(...),
    liveness_token: str = Form(...)
):
    # Validate liveness token (mocked for now)
    if not liveness_token.startswith("liveness_token_"):
        raise HTTPException(status_code=401, detail="Invalid liveness token")

    image_bytes = await image.read()
    print(f"Received image: {len(image_bytes)} bytes for voter {voter_id}")

    # Mocked response — real ArcFace logic comes in Phase 2
    return {
        "status": "success",
        "voter_id": voter_id,
        "message": "Face registered successfully (mock)",
        "embedding_stored": True
    }
    
# ── Test endpoint for anti-spoof only ────────────────────────────────────────
@router.post("/test/antispoof")
async def test_antispoof(image: UploadFile = File(...)):
    """
    Test endpoint to check if anti-spoof is working.
    Upload any image and see if it passes.
    """
    image_bytes = await image.read()
    result = check_antispoof(image_bytes)
    return result

@router.post("/test/gesture")
async def test_gesture(image: UploadFile = File(...)):
    """
    Test endpoint for gesture detection.
    Upload a face photo and see what gestures are detected.
    """
    image_bytes = await image.read()
    result = detect_gesture(image_bytes)
    return result

@router.post("/test/embedding")
async def test_embedding(image: UploadFile = File(...)):
    """
    Test ArcFace embedding extraction.
    Upload a face photo and get the 512-dim embedding back.
    """
    image_bytes = await image.read()
    result = extract_embedding(image_bytes)
    return result

@router.post("/test/compare")
async def test_compare(
    image1: UploadFile = File(...),
    image2: UploadFile = File(...)
):
    """
    Compare two face photos.
    Returns similarity score — above 0.5 means likely same person.
    """
    bytes1 = await image1.read()
    bytes2 = await image2.read()

    result1 = extract_embedding(bytes1)
    result2 = extract_embedding(bytes2)

    if not result1["success"]:
        return { "error": f"Image 1: {result1['reason']}" }
    if not result2["success"]:
        return { "error": f"Image 2: {result2['reason']}" }

    similarity = cosine_similarity(result1["embedding"], result2["embedding"])

    return {
        "similarity":    round(similarity, 4),
        "same_person":   similarity > 0.5,
        "confidence":    "high" if similarity > 0.7 else "medium" if similarity > 0.5 else "low"
    }