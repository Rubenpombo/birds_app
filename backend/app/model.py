import os
from ultralytics import YOLO
from PIL import Image
from typing import Any

class ModelService:
    def __init__(self, model_path: str = None):
        if model_path is None:
            # Resolve path relative to this file: ../../models/best.pt
            base_dir = os.path.dirname(os.path.abspath(__file__))
            # Adjust path traversal based on project structure
            # app/model.py -> app/ -> backend/ -> root/ -> models/best.pt
            model_path = os.path.join(base_dir, "..", "..", "models", "best.pt")
        
        self.model_path = os.path.abspath(model_path)
        
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model file not found at: {self.model_path}")
            
        print(f"Loading model from: {self.model_path}")
        self.model = YOLO(self.model_path)

    def predict(self, image: Image.Image) -> Any:
        """
        Run inference on a PIL Image.
        Returns the Ultralytics Results object.
        """
        # Run inference
        # conf=0.25 is a standard default, can be adjusted
        results = self.model(image, conf=0.25) 
        return results[0]  # Return the first result (single image)

# Singleton instance
try:
    model_service = ModelService()
except Exception as e:
    print(f"Failed to initialize ModelService: {e}")
    model_service = None
