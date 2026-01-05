from fastapi.testclient import TestClient
import sys
import os

# Add backend directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__)))

from app.main import app

client = TestClient(app)

def test_share_flow():
    # 1. Share dummy data
    # 1x1 pixel png
    dummy_base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" 
    payload = {
        "image_base64": dummy_base64,
        "detections": [{"class_name": "TestBird", "confidence": 0.99}]
    }
    
    print("Sending POST /api/share...")
    response = client.post("/api/share", json=payload)
    if response.status_code != 200:
        print(f"Share failed: {response.text}")
        sys.exit(1)
        
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    share_id = data["id"]
    print(f"Shared ID: {share_id}")
    
    # 2. Get shared data
    print(f"Sending GET /api/share/{share_id}...")
    response = client.get(f"/api/share/{share_id}")
    assert response.status_code == 200
    get_data = response.json()
    assert get_data["id"] == share_id
    assert get_data["detections"][0]["class_name"] == "TestBird"
    print("Share flow success!")

if __name__ == "__main__":
    test_share_flow()
