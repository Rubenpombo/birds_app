# Development Roadmap

## Phase 1: Foundation & Setup
- [x] **Project Initialization**: Set up directory structure, create Python virtual environment, install backend dependencies (FastAPI, Ultralytics), and initialize React app.
- [x] **Backend - Model Integration**: Implement `ModelService` to load `models/best.pt` and run inference.
- [x] **Backend - API Basic**: Create `POST /predict` endpoint to accept images and return raw detection data.

## Phase 2: Core Functionality (The Loop)
- [x] **Frontend - Basic UI**: Create a minimalist, nature-themed landing page with a drag-and-drop file upload.
- [x] **Integration - Inference**: Connect the Frontend upload to the Backend API and display the result.
- [x] **Visualization**: Render bounding boxes/processed image.
- [x] **Feature - Download**: Implement download functionality.
- [x] **Feature - Sharing (Backend)**: Create database models and endpoints to save results.
- [x] **Feature - Sharing (Frontend)**: Add "Share" button and route.

## Phase 3: UI/UX & Redesign (Completed)
- [x] **Landing Page Redesign**: Implemented a cinematic "Glassmorphism" landing page with a separate Dashboard.
- [x] **Species Showcase**: Created a detailed card grid for the 10 detected species using custom illustrations.
- [x] **Assets Integration**: Migrated high-quality images and bird illustrations to the frontend assets.
- [x] **Internationalization (i18n)**: Implemented full English/Spanish translation with a minimalist toggle.
- [x] **Theme Consistency**: Unified the "Earthy Organic" design system across all pages (Landing, Dashboard, Login, Register, SharedResult).

## Phase 4: Authentication & User Experience
- [x] **Backend - Auth Foundation**:
    - [x] Update `requirements.txt` (passlib, python-jose, python-multipart).
    - [x] Create `User` model in `database.py`.
    - [x] Implement password hashing and JWT token generation in `auth.py`.
    - [x] Create API routes: `POST /api/register`, `POST /api/token` (login).
- [x] **Backend - History Feature**:
    - [x] Update `SharedResult` model to link to `User` (foreign key).
    - [x] Create `GET /api/history` endpoint to fetch user's past detections.
- [x] **Frontend - Auth Pages**:
    - [x] Create `Login.jsx` and `Register.jsx`.
    - [x] Implement `AuthContext` to manage login state and token storage.
- [x] **Frontend - Sidebar & Navigation**:
    - [x] Create a `Sidebar` component to display history.
    - [x] Update `Home.jsx` to show "Log in to save" if guest.
    - [x] Connect Sidebar to `GET /api/history`.

## Phase 5: DevOps & Production Readiness (Current)
- [x] **Deployment Configuration**: Added `vercel.json` and entrypoint for Serverless deployment.
- [ ] **Vercel Deployment**: Deploy Frontend and Backend to Vercel.
- [ ] **CI/CD Pipeline**: Configure GitHub Actions to run tests on push.
- [ ] **Optimization**: Ensure YOLO model runs efficiently within Serverless memory/timeout limits.
- [ ] **Lightweight Monitoring**: Basic error tracking (e.g., check logs, maybe Sentry).
