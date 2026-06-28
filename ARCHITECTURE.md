# Architecture & Design

## System Overview
**IberBirds** is a lightweight, stateless web application that detects and classifies Iberian bird
species (raptors and storks) using a YOLO11 model. The system focuses purely on inference: a user
uploads an image, the server analyzes it, and returns the annotated result immediately.

It is deployed as a **Containerized Monolith** on **Hugging Face Spaces** (Docker SDK).

## Tech Stack
- **Frontend**:
  - React 19 (Vite 7)
  - Tailwind CSS 3.4 (Styling)
  - Lucide React (Icons)
  - Axios (API Communication)
  - React Router DOM (Routing)
- **Backend**:
  - Python 3.11 (FastAPI)
  - Ultralytics YOLO (Inference)
  - Pillow (Image Processing)
  - Uvicorn (ASGI Server)
- **Infrastructure**:
  - **Docker**: Multi-stage build (frontend build -> backend runtime).
  - **Hugging Face Spaces**: Docker SDK, served on port `7860`.

## Data Flow
1. **Access**: User visits the public URL (Landing Page -> "Start Detection").
2. **Upload**: User uploads an image via the React frontend.
3. **Inference**: Image is sent to the FastAPI backend (`POST /api/detect`) and processed in-memory.
4. **Processing**:
   - Backend runs the YOLO model.
   - Generates a visualization (bounding boxes).
5. **Result**:
   - Backend returns the processed image (Base64) and detection metadata (JSON).
   - **No data is persisted**. The image is discarded after the response.
6. **Action**: User views the result and can download the annotated image.

## Design Philosophy
- **Stateless & Ephemeral**: Every request is an isolated event. No databases, storage buckets, or
  user accounts — drastically reducing complexity and cost.
- **KISS**: Focus entirely on the core value proposition: bird classification.

## Directory Structure
```
/
├── backend/
│   ├── app/
│   │   ├── main.py        # Entrypoint (serves API + static frontend)
│   │   ├── model.py       # Inference logic (YOLO singleton)
│   │   └── api.py         # Endpoints (/detect, /health)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/         # Landing, Detector
│   │   ├── components/    # Showcase, language switcher, etc.
│   │   └── ...
│   └── ...                # Vite config, Tailwind, etc.
├── models/
│   └── best.pt            # Inference weights (uploaded to the Space, not tracked in git)
├── Experimento_6/         # Training notebook + experiment results (reference only)
├── Dockerfile             # Multi-stage build definition
├── .github/workflows/     # sync_to_hub.yml: pushes the repo to the HF Space
├── ARCHITECTURE.md
├── PROGRESS.md
└── README.md
```

## Deployment Strategy (Hugging Face Spaces)
1. **Sync**: A push to `main` triggers `.github/workflows/sync_to_hub.yml`, which uploads the repo
   to the Hugging Face Space.
2. **Build**: Hugging Face builds the Docker image from `Dockerfile`.
   - **No external dependencies** (no SQL, no buckets).
   - **Configuration**: Metadata in `README.md` (YAML header) configures the Space (`app_port: 7860`).
3. **Model weights**: `models/best.pt` is uploaded directly to the Space repository (it is not
   committed to git, since it is a large binary).
