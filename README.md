# 🦅 IberBirds

IberBirds is a tool to help identify birds of prey and storks commonly found in the Iberian Peninsula. I built this project to explore how computer vision can assist in nature observation without complex infrastructure.

[![Hugging Face Spaces](https://img.shields.io/badge/%F0%9F%A4%97%20Open%20App-Hugging%20Face-blue)](https://rubenppombo-birds-app.hf.space)

![Application Screenshot](frontend/src/assets/landing_bg.png)

## About the Project

The concept is simple: you upload a photo of a bird, and the application identifies it along with a confidence score. It runs completely in the browser/cloud session—no accounts, no databases, and no tracking. Once the analysis is done, the image is discarded.

I trained a **YOLO11** model specifically for this task, focusing on 10 distinct species often confused by casual observers (like differentiating a Red Kite from a Black Kite).

### How it runs
Unlike typical web apps that separate frontend and backend on different providers, this project is packaged as a single **Docker container**.
- **Frontend**: A React application (bundled with Vite) handles the user interface.
- **Backend**: A lightweight FastAPI Python server hosts the model and serves the static frontend files.
- **Inference**: When you upload an image, it's processed in-memory by the YOLO model running on the server.

You can try it live here: **[rubenppombo-birds-app.hf.space](https://rubenppombo-birds-app.hf.space)**

## Supported Species
The model detects the following birds:
*   **Storks**: White Stork, Black Stork.
*   **Vultures**: Griffon Vulture, Cinereous Vulture, Egyptian Vulture.
*   **Raptors**: Spanish Imperial Eagle, Golden Eagle, Red Kite, Black Kite, Peregrine Falcon.

## Running Locally

If you want to run this on your own machine (requires Docker):

```bash
# Clone the repository
git clone https://github.com/Rubenpombo/birds_app.git
cd birds_app

# Build and run
docker build -t iberbirds .
docker run -p 7860:7860 iberbirds
```
The app will be available at `http://localhost:7860`.
