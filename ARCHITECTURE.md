# Architecture & Design

## System Overview
**Birds App** (physically located in `devops_birds`) is a web application designed to detect and classify Iberian bird species using a YOLO11 model. The system features a modern, nature-themed UI, user authentication, and a history of past analyses.

## Tech Stack
- **Frontend**: 
  - React 19 (Vite 7)
  - Tailwind CSS 3.4 (Styling)
  - Lucide React (Icons)
  - Axios (API Communication)
  - React Router DOM (Routing)
- **Backend**: 
  - Python 3.x (FastAPI)
  - Ultralytics YOLO (Inference)
  - Pillow (Image Processing)
  - SQLite (Persistence for users, history, and shared links)
  - SQLAlchemy (ORM)
  - Passlib & JWT (Authentication)
  - Uvicorn (ASGI Server)

## Data Flow
1. **Auth**: User registers/logs in. JWT token returned and stored in client.
2. **Upload**: User uploads an image via the React frontend.
3. **Inference**: Image is sent to the FastAPI backend (`POST /api/detect`).
4. **Processing**: 
   - Backend loads the YOLO model.
   - Performs inference.
   - Generates visualization.
5. **Persistence**:
   - Result is saved to `history` table linked to `user_id`.
   - Image stored in `static/uploads`.
6. **Result**: Backend returns processed image and metadata.
7. **History**: Sidebar fetches user's past queries from `GET /api/history`.

## Design Philosophy
- **Lightweight & Serverless**: The architecture prioritizes simplicity and low maintenance. Instead of complex container orchestration (k8s), we utilize serverless functions (Vercel) for the backend and static hosting for the frontend.
- **Monolithic Source, Decoupled Deploy**: The codebase is kept together for ease of development, but deploys as decoupled services (Frontend -> CDN, Backend -> Serverless).

## Database Schema (SQLite)
- **User**
  - `id` (UUID/Integer)
  - `username` (String, Unique)
  - `password_hash` (String)
  - `created_at` (DateTime)
- **SharedResult/History**
  - `id` (UUID)
  - `user_id` (ForeignKey -> User.id, nullable for anonymous shares?)
  - `image_filename` (String)
  - `metadata_json` (Text)
  - `created_at` (DateTime)

## Directory Structure
```
/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── model.py
│   │   ├── database.py
│   │   ├── models.py      # DB Models (User, History)
│   │   ├── auth.py        # Auth logic
│   │   └── api.py
│   ├── static/
│   ├── iberbirds.db
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── context/       # AuthContext
│   │   ├── components/    # Sidebar, Navbar
│   │   ├── pages/         # Login, Register, Home
│   │   └── ...
├── models/
│   └── best.pt
├── api/                   # Vercel Entrypoint
│   └── index.py
├── ARCHITECTURE.md
├── PROGRESS.md
└── README.md
```

## Future Roadmap
- **CI/CD**: GitHub Actions for automated testing and Vercel deployment.
- **Optimization**: Model quantization (ONNX/TFLite) to improve serverless startup times.
- **Monitoring**: Lightweight integration (e.g., Sentry or Vercel Analytics).