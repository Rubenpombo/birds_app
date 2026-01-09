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

## Phase 5: Cloud Run Deployment (Stateless)
- [x] **Container Architecture**: Implement Docker multi-stage build (Node + Python).
- [x] **Monolithic Serving**: FastAPI serving both API and React production build.
- [x] **Architecture Pivot**: Transitioned to **Google Cloud Run** Stateless.
- [ ] **Google Cloud Deployment**:
    - [ ] Create Artifact Registry and push Docker image.
    - [ ] Deploy to **Cloud Run** (Max instances: 3, Memory: 2Gi).
    - [ ] Verify public access.

## Phase 6: Maintenance & Polish
- [ ] **CI/CD**: Automate builds via GitHub Actions.
- [ ] **Performance**: Monitor YOLO inference times on Cloud Run.
