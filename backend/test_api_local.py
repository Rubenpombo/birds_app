from fastapi.testclient import TestClient
from app.main import app
from PIL import Image
import io
import numpy as np

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
    print("Health check passed.")

def test_predict_dummy():
    # Create dummy image
    img = Image.fromarray(np.zeros((640, 640, 3), dtype=np.uint8))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)
    
    response = client.post(
        "/api/detect",
        files={"file": ("dummy.jpg", buf, "image/jpeg")}
    )
    
    if response.status_code != 200:
        print(f"Prediction failed: {response.text}")
    
    assert response.status_code == 200
    data = response.json()
    assert "detections" in data
    assert isinstance(data["detections"], list)
    print("Prediction test passed.")

if __name__ == "__main__":
    try:
        test_health()
        test_predict_dummy()
        print("ALL API TESTS PASSED")
    except ImportError:
        print("httpx not installed, cannot use TestClient. Install httpx or use manual curl.")
        # Fallback to check if we can import httpx
        import httpx
    except Exception as e:
        print(f"Test failed: {e}")
        import traceback
        traceback.print_exc()
