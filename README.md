---
title: IberBirds Backend
emoji: 🦅
colorFrom: green
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

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
8. Aquila adalberti
9. Aquila chrysaetos
10. Falco peregrinus

## Tech Stack
- **Frontend**: React, Tailwind CSS, Vite.
- **Backend**: Python, FastAPI, YOLO11 (Ultralytics).
- **Database**: Supabase (PostgreSQL).
- **Deployment**: Vercel (Frontend), Hugging Face Spaces (Backend).
