# Development Roadmap

## Phase 1: Foundation & Setup
- [x] **Project Initialization**: Set up directory structure and virtual environment.
- [x] **Backend - Model Integration**: Implement `ModelService` with YOLO11.
- [x] **Backend - API Basic**: Create detection endpoints.

## Phase 2: Core Functionality
- [x] **Frontend - Basic UI**: minimalist, nature-themed landing page.
- [x] **Integration - Inference**: Connect Frontend upload to Backend API.
- [x] **Visualization**: Render bounding boxes/processed image.
- [x] **Feature - Download**: Implement download functionality.

## Phase 3: UI/UX & Redesign
- [x] **Landing Page Redesign**: Cinematic "Glassmorphism" landing page.
- [x] **Species Showcase**: Detailed card grid for the 10 bird species.
- [x] **Internationalization (i18n)**: English/Spanish translation system.
- [x] **Theme Consistency**: Unified "Earthy Organic" design system.

## Phase 4: Simplification (The Pivot)
- [x] **Cleanup Backend**:
    - [x] Remove `database.py`, `storage.py`, `auth.py`.
    - [x] Remove SQLAlchemy models and dependencies.
    - [x] Clean up `api.py` (remove login/register/history routes).
- [x] **Cleanup Frontend**:
    - [x] Remove `Login.jsx`, `Register.jsx`, `SharedResult.jsx`.
    - [x] Remove `AuthContext` and `Sidebar` history logic.
    - [x] Make the "Dashboard" accessible without login (rename to "Detector").

## Phase 5: Deployment (Hugging Face Spaces, Stateless)
- [x] **Container Architecture**: Docker multi-stage build (Node + Python).
- [x] **Monolithic Serving**: FastAPI serving both the API and the React production build.
- [x] **Hugging Face Spaces**: Deployed as a Docker Space on port 7860.
- [x] **CI/CD**: `sync_to_hub.yml` pushes the repo to the Space on every push to `main`.
- [x] **Model delivery**: `models/best.pt` uploaded to the Space (kept out of git).

## Phase 6: Maintenance & Polish
- [x] **Repo cleanup**: Removed unused Vercel/Railway configs and stale auth dependencies.
- [ ] **Performance**: Make inference non-blocking, warm up the model at startup, cap upload size.
- [ ] **(Optional) Inference speed**: Evaluate ONNX/OpenVINO export for faster CPU inference.
