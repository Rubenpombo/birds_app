# Architecture & Design

## System Overview
**Birds App** is a lightweight, stateless web application designed to detect and classify Iberian bird species using a YOLO11 model. 
The system focuses purely on the inference capability: a user uploads an image, the system analyzes it, and returns the result immediately.

It is deployed as a **Serverless Containerized Monolith** on **Hugging Face Spaces**.

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
  - **Docker**: Multi-stage build (Frontend build -> Backend container).
  - **Hugging Face Spaces**: Serverless compute platform (Docker SDK).

## Data Flow
1. **Access**: User visits the public URL (Landing Page -> "Start Detection").
2. **Upload**: User uploads an image via the React frontend.
3. **Inference**: Image is sent to the FastAPI backend (`POST /api/detect`) and processed in-memory.
4. **Processing**: 
   - Backend loads the YOLO model.
   - Performs inference.
   - Generates visualization (bounding boxes).
5. **Result**: 
   - Backend returns the processed image (Base64) and detection metadata (JSON).
   - **No data is persisted**. The server forgets the image immediately after the response.
6. **Action**: User views the result and can download the image.

## Design Philosophy
- **Stateless & Ephemeral**: The application has no "memory". It treats every request as a new, isolated event. This eliminates the need for databases, storage buckets, and user management, drastically reducing complexity and cost.
- **KISS (Keep It Simple, Stupid)**: Focus entirely on the core value proposition: Bird Classification.
- **Cost Efficiency**: Running on Cloud Run with "scale to zero" means the cost is effectively zero when no one is using the inference engine.

## Directory Structure
```
/
├── backend/
│   ├── app/
│   │   ├── main.py        # Entrypoint (serves API + Static Frontend)
│   │   ├── model.py       # Inference Logic
│   │   ├── api.py         # Endpoints (only /detect)
│   │   └── ...            # (auth.py, database.py, storage.py to be deleted)
│   ├── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/         # Landing, Dashboard (renamed to App/Tool)
│   │   └── ...            # (Login, Register, History components to be deleted)
│   ├── dist/              # Built frontend assets
│   └── ...
├── models/
│   └── best.pt
├── Dockerfile             # Multi-stage build definition
├── ARCHITECTURE.md
├── PROGRESS.md
└── README.md
```

## Deployment Strategy (Hugging Face Spaces)
1. **Push**: Code is pushed to the Hugging Face Space repository.
2. **Build**: Hugging Face automatically builds the Docker image from `Dockerfile`.
   - **No external dependencies** (No SQL, No Buckets).
   - **Configuration**: Metadata in `README.md` (YAML header) configures the Space.