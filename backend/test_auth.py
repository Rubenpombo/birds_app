from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine, SessionLocal
import uuid

# Use the same DB for testing or a separate one? 
# For simplicity, we use the current one but with unique usernames.

client = TestClient(app)

def test_auth_flow():
    username = f"testuser_{uuid.uuid4().hex[:8]}"
    password = "testpassword"
    
    # 1. Register
    response = client.post(
        "/api/register",
        json={"username": username, "password": password}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    token = data["access_token"]
    print(f"Registration successful for {username}")
    
    # 2. Login
    response = client.post(
        "/api/token",
        data={"username": username, "password": password}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    print("Login successful")
    
    # 3. Access protected history
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/history", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    print("History access successful")

def test_invalid_login():
    response = client.post(
        "/api/token",
        data={"username": "nonexistent", "password": "wrong"}
    )
    assert response.status_code == 401
    print("Invalid login handled correctly")

if __name__ == "__main__":
    try:
        test_auth_flow()
        test_invalid_login()
        print("AUTH TESTS PASSED")
    except Exception as e:
        print(f"Auth test failed: {e}")
        import traceback
        traceback.print_exc()
