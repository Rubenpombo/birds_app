import sys
import os

# Add backend directory to sys.path so we can import app.model
sys.path.append(os.path.join(os.path.dirname(__file__)))

try:
    from app.model import model_service
    from PIL import Image
    import numpy as np

    if model_service and model_service.model:
        print("SUCCESS: Model loaded successfully.")
        
        # Create a dummy black image
        dummy_image = Image.fromarray(np.zeros((640, 640, 3), dtype=np.uint8))
        print("Running dummy prediction...")
        result = model_service.predict(dummy_image)
        print("SUCCESS: Prediction ran without errors.")
        print(f"Result boxes: {len(result.boxes)}")
        
    else:
        print("FAILURE: Model service initialized but model is None.")
        sys.exit(1)
except Exception as e:
    print(f"FAILURE: Exception occurred: {e}")
    sys.exit(1)
