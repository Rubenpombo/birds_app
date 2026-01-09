from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io
import base64
from .model import model_service

router = APIRouter()

@router.post("/detect")
async def detect(file: UploadFile = File(...)):
    if not model_service:
        raise HTTPException(status_code=500, detail="Model not loaded")

    # Validate image
    if file.content_type not in ["image/jpeg", "image/png", "image/webp", "image/jpg"]:
        raise HTTPException(status_code=400, detail=f"Invalid image type: {file.content_type}")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        result = model_service.predict(image)
        
        # Generate plotted image (BGR -> RGB -> Base64)
        im_array = result.plot() # Returns BGR numpy array
        im_pil = Image.fromarray(im_array[..., ::-1]) # Convert BGR to RGB
        
        buffered = io.BytesIO()
        im_pil.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        # Parse results
        detections = []
        # result.names is a dict mapping class_id to name
        names = result.names
        
        for box in result.boxes:
            cls_id = int(box.cls[0])
            detections.append({
                "class_id": cls_id,
                "class_name": names[cls_id],
                "confidence": float(box.conf[0]),
                "bbox": box.xyxy[0].tolist() # [x1, y1, x2, y2]
            })
            
        return {
            "detections": detections,
            "image_base64": img_str
        }

    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=str(e))
