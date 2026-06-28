from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from .api import router
import os

app = FastAPI(title="IberBirds API")

# API Routes
app.include_router(router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/health")
def api_health_check():
    return {"status": "ok"}

# Frontend Serving Logic
# Dockerfile puts frontend dist at /app/static_ui
# Local development might need fallback or just run vite separately
frontend_dist = os.environ.get("FRONTEND_DIST", "/app/static_ui")

if os.path.exists(frontend_dist):
    # Mount assets (Vite puts js/css in /assets)
    # This allows /assets/index-D8s...js to work
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    
    # Catch-all route for SPA (React Router)
    @app.get("/{full_path:path}")
    async def catch_all(full_path: str):
        # Allow requests to specific files in root (like vite.svg, robots.txt)
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
             return FileResponse(file_path)
             
        # Unknown /api/ paths should 404 rather than fall through to the SPA shell.
        if full_path.startswith("api/"):
            return JSONResponse(status_code=404, content={"error": "API endpoint not found"})

        # Fallback to index.html for everything else (SPA routing).
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    print(f"Frontend dist not found at {frontend_dist}. Running in API-only mode.")

# Configure CORS - read from environment for production
cors_origins_env = os.getenv("CORS_ORIGINS", "*")
if cors_origins_env == "*":
    cors_origins = ["*"]
else:
    cors_origins = [origin.strip() for origin in cors_origins_env.split(",")]

# The app uses no cookies/auth, so credentials are disabled. This also keeps the
# wildcard origin (`*`) valid, since browsers reject `*` together with credentials.
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)