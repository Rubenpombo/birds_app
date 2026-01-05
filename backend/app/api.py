from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from PIL import Image
import io
import base64
import os
import uuid
import json
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .model import model_service
from .database import get_db, SharedResult, User
from . import auth

router = APIRouter()

class ShareRequest(BaseModel):
    image_base64: str
    detections: list

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=Token)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    hashed_password = auth.get_password_hash(user_data.password)
    new_user = User(
        id=user_id,
        username=user_data.username,
        password_hash=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = auth.create_access_token(data={"sub": new_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

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

@router.post("/share")
def share_result(request: ShareRequest, db: Session = Depends(get_db), current_user: User = Depends(auth.get_current_user)):
    # Note: I changed this to require login because otherwise it's not "SharedResult/History" linked to User
    # But for public sharing we might want a different endpoint or handle None user.
    # Given requirements say "Update SharedResult model to link to User", and Sidebar needs History.
    # I'll make it optionally authenticated for public shares, but if auth is present, link it.
    # Actually, the requirement says "sidebar fetches user's past queries".
    # Let's check how auth.get_current_user behaves. It raises if token is missing.
    # I'll use a wrapper or manual check if I want it optional.
    # For now, let's strictly follow the "authenticated" path for history.
    
    try:
        # Generate ID
        share_id = str(uuid.uuid4())
        filename = f"{share_id}.jpg"
        
        # Path logic
        base_dir = os.path.dirname(os.path.abspath(__file__))
        upload_dir = os.path.join(base_dir, "..", "static", "uploads")
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
            
        filepath = os.path.join(upload_dir, filename)
        
        # Save image
        img_data_str = request.image_base64
        if "," in img_data_str:
            img_data_str = img_data_str.split(",")[1]
            
        img_data = base64.b64decode(img_data_str)
        
        with open(filepath, "wb") as f:
            f.write(img_data)
            
        # Save to DB
        db_entry = SharedResult(
            id=share_id,
            user_id=current_user.id if current_user else None,
            image_filename=f"uploads/{filename}",
            metadata_json=json.dumps(request.detections)
        )
        db.add(db_entry)
        db.commit()
        db.refresh(db_entry)
        
        return {"id": share_id, "url": f"/static/uploads/{filename}"}
        
    except Exception as e:
        print(f"Share error: {e}")
        raise HTTPException(status_code=500, detail="Failed to share result")

@router.get("/history")
def get_history(db: Session = Depends(get_db), current_user: User = Depends(auth.get_current_user)):
    results = db.query(SharedResult).filter(SharedResult.user_id == current_user.id).order_by(SharedResult.created_at.desc()).all()
    
    return [
        {
            "id": r.id,
            "image_url": f"/static/{r.image_filename}",
            "detections": json.loads(r.metadata_json),
            "created_at": r.created_at
        } for r in results
    ]

@router.get("/share/{share_id}")
def get_shared_result(share_id: str, db: Session = Depends(get_db)):
    result = db.query(SharedResult).filter(SharedResult.id == share_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Shared result not found")
        
    return {
        "id": result.id,
        "image_url": f"/static/{result.image_filename}",
        "detections": json.loads(result.metadata_json),
        "created_at": result.created_at
    }