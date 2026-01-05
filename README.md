# IBERBIRDS

IBERBIRDS is a web application that uses a custom-trained YOLO11 model to detect and classify 10 specific bird species found in the Iberian Peninsula.

## Features
- **Bird Detection**: Detects 10 Iberian bird species using YOLO11.
- **Modern UI**: Nature-themed, minimalist interface with drag-and-drop upload.
- **Visualization**: Displays bounding boxes and confidence scores directly on the image.
- **Sharing**: Generate unique shareable links for your discoveries.
- **Download**: Download analyzed images with results.
- **Responsive**: Optimized for Desktop and Mobile.

## Bird Species Detected
1. Ciconia ciconia
2. Ciconia nigra
3. Aegypius monachus
4. Gyps fulvus
5. Milvus milvus
6. Milvus migrans
7. Neophron percnopterus
8. Falco peregrinus
9. Aquila chrysaetos
10. Aquila adalberti

## Project Structure
- `backend/`: FastAPI application and YOLO inference logic.
- `frontend/`: React + Vite + Tailwind CSS application.
- `models/`: Contains the trained YOLO model (`best.pt`).

## Setup & Running

### Prerequisites
- Python 3.10+
- Node.js 18+

### Quick Start

1. **Backend**:
   ```bash
   # Create virtual environment if not exists
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r backend/requirements.txt
   
   # Run server
   chmod +x run_backend.sh
   ./run_backend.sh
   ```
   The backend API runs at `http://localhost:8000`.

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Access the app at `http://localhost:5173`.