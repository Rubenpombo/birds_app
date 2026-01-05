# IberBirds Backend - Docker Image
# Optimized for YOLO model inference

FROM python:3.11-slim

# Install system dependencies for OpenCV and image processing
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user (Hugging Face Spaces requirement)
RUN useradd -m -u 1000 user

WORKDIR /app

# Copy requirements first
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy application code
COPY backend/ ./backend/
COPY models/ ./models/

# Create static directories and set ownership
RUN mkdir -p backend/static/uploads && \
    chown -R user:user /app

# Switch to non-root user
USER user

# Expose port (HF Spaces defaults to 7860)
EXPOSE 7860

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:7860/health')" || exit 1

# Start server
CMD ["sh", "-c", "uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT:-7860}"]
