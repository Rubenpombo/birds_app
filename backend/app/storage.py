import os
import uuid
import base64
from abc import ABC, abstractmethod
from supabase import create_client, Client

class StorageService(ABC):
    @abstractmethod
    def upload_base64_image(self, image_data_b64: str, filename: str) -> str:
        pass

class LocalStorageService(StorageService):
    def __init__(self, base_dir: str):
        self.upload_dir = os.path.join(base_dir, "..", "static", "uploads")
        if not os.path.exists(self.upload_dir):
            os.makedirs(self.upload_dir)

    def upload_base64_image(self, image_data_b64: str, filename: str) -> str:
        if "," in image_data_b64:
            image_data_b64 = image_data_b64.split(",")[1]
            
        img_data = base64.b64decode(image_data_b64)
        filepath = os.path.join(self.upload_dir, filename)
        
        with open(filepath, "wb") as f:
            f.write(img_data)
            
        return f"/static/uploads/{filename}"

class SupabaseStorageService(StorageService):
    def __init__(self, url: str, key: str, bucket_name: str = "images"):
        self.client: Client = create_client(url, key)
        self.bucket = bucket_name

    def upload_base64_image(self, image_data_b64: str, filename: str) -> str:
        if "," in image_data_b64:
            image_data_b64 = image_data_b64.split(",")[1]
            
        img_data = base64.b64decode(image_data_b64)
        
        # Determine content type (simple guess, ideally passed in)
        content_type = "image/jpeg" 
        
        res = self.client.storage.from_(self.bucket).upload(
            file=img_data,
            path=filename,
            file_options={"content-type": content_type}
        )
        
        # Get public URL
        public_url = self.client.storage.from_(self.bucket).get_public_url(filename)
        return public_url

def get_storage_service():
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    if supabase_url and supabase_key:
        print("Using Supabase Storage")
        return SupabaseStorageService(supabase_url, supabase_key)
    else:
        print("Using Local Storage (Ephemeral)")
        base_dir = os.path.dirname(os.path.abspath(__file__))
        return LocalStorageService(base_dir)

storage_service = get_storage_service()
