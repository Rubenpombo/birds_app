---
title: IberBirds App
emoji: 🦅
colorFrom: green
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# 🦅 IberBirds

IberBirds is a tool to help identify birds commonly found in the Iberian Peninsula. I built this project to explore how computer vision can assist in nature observation without complex infrastructure.

[![Hugging Face Spaces](https://img.shields.io/badge/%F0%9F%A4%97%20Open%20App-Hugging%20Face-blue)](https://rubenppombo-birds-app.hf.space)

![Landing page](frontend/src/assets/landing_bg.png)

## About the Project

The concept is simple: you upload a photo of a bird, and the application identifies it along with a confidence score. It runs completely in the browser/cloud session—no accounts, no databases, and no tracking. Once the analysis is done, the image is discarded.

## Computer Vision Model

[YOLO11](https://docs.ultralytics.com/models/yolo11#overview) finetuned. Trained on [a dataset I'm coauthor of](https://www.sciencedirect.com/science/article/pii/S2352340925003427), which represents 4000 labeled images from 10 bird species.

The model focuses on species often confused by casual observers (like differentiating a Red Kite from a Black Kite).

**The model detects the following birds:**
*   **Storks**: White Stork, Black Stork.
*   **Vultures**: Griffon Vulture, Cinereous Vulture, Egyptian Vulture.
*   **Raptors**: Spanish Imperial Eagle, Golden Eagle, Red Kite, Black Kite, Peregrine Falcon.

### Example Output

When you upload a sighting, the tool draws bounding boxes around each detected bird and shows a confidence score per detection. It works best on long-distance photos of birds in flight, like these Griffon Vultures (*Gyps fulvus*) spotted against the sky:

![Detection example — two Griffon Vultures identified in flight with confidence scores](frontend/src/assets/output_example.png)

## How it runs
Unlike typical web apps that separate frontend and backend on different providers, this project is packaged as a single **Docker container**.
- **Frontend**: A React application (bundled with Vite) handles the user interface.
- **Backend**: A lightweight FastAPI Python server hosts the model and serves the static frontend files.
- **Inference**: When you upload an image, it's processed in-memory by the YOLO model running on the server.

You can try it live here: **[rubenppombo-birds-app.hf.space](https://rubenppombo-birds-app.hf.space)**


### Running Locally

If you want to run this on your own machine (requires Docker):

```bash
# Clone the repository
git clone https://github.com/Rubenpombo/birds_app.git
cd birds_app

# Provide the model weights (not tracked in git).
# Use your own trained weights, or the experiment weights included in this repo:
mkdir -p models
cp Experimento_6/Resultados_Exp6/weights/best.pt models/best.pt

# Build and run
docker build -t iberbirds .
docker run -p 7860:7860 iberbirds
```
The app will be available at `http://localhost:7860`.

> **Note:** `models/best.pt` is intentionally excluded from git (large binary). On Hugging Face
> Spaces the weights are uploaded directly to the Space repository. For a local build you must
> place a `best.pt` in `models/` as shown above.
