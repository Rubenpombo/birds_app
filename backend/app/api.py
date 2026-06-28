from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.concurrency import run_in_threadpool
from PIL import Image
import io
import base64
from .model import model_service

router = APIRouter()

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/jpg"}
MAX_UPLOAD_BYTES = 10 * 1024 * 1024  # 10 MB
MAX_IMAGE_SIDE = 1920  # downscale very large uploads before inference (YOLO letterboxes to 640)


def _run_inference(image: Image.Image) -> dict:
    """CPU-bound work. Executed in a threadpool to avoid blocking the event loop."""
    result = model_service.predict(image)

    # Generate plotted image (BGR -> RGB -> Base64)
    im_array = result.plot()  # Returns BGR numpy array
    im_pil = Image.fromarray(im_array[..., ::-1])  # Convert BGR to RGB
    buffered = io.BytesIO()
    im_pil.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    names = result.names  # dict mapping class_id -> name
    detections = []
    for box in result.boxes:
        cls_id = int(box.cls[0])
        detections.append({
            "class_id": cls_id,
            "class_name": names[cls_id],
            "confidence": float(box.conf[0]),
            "bbox": box.xyxy[0].tolist(),  # [x1, y1, x2, y2]
        })

    return {"detections": detections, "image_base64": img_str}


@router.post("/detect")
async def detect(file: UploadFile = File(...)):
    if not model_service:
        raise HTTPException(status_code=500, detail="Model not loaded")

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid image type: {file.content_type}")

    contents = await file.read()
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Image too large (max 10 MB)")

    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read image file")

    # Bound latency/memory for very large uploads. Still well above the 640px inference size.
    if max(image.size) > MAX_IMAGE_SIDE:
        image.thumbnail((MAX_IMAGE_SIDE, MAX_IMAGE_SIDE))

    try:
        return await run_in_threadpool(_run_inference, image)
    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail="Inference failed")
