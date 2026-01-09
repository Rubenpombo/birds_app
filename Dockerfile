# Stage 1: Build Frontend
FROM node:20-slim as frontend-builder

WORKDIR /app/frontend

# Copy dependencies first for caching
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Backend + Final Image
FROM python:3.11-slim

# Install system dependencies for OpenCV and image processing
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -u 1000 user

WORKDIR /app

# Copy requirements first
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy application code
COPY backend/ ./backend/
COPY models/ ./models/

# Copy built frontend assets from Stage 1
# We place them in a known location that main.py will check
COPY --from=frontend-builder /app/frontend/dist /app/static_ui

# Create upload directory (even if we use Supabase, some temp operations might need it, or legacy)
# Also ensure permissions
RUN mkdir -p backend/static/uploads && \
    chown -R user:user /app

# Switch to non-root user
USER user

# Cloud Run uses 8080, Hugging Face uses 7860. We default to 7860 for HF.
ENV PORT=7860
# Set HOME to a writable directory for YOLO/matplotlib cache
ENV HOME=/app/backend/static
EXPOSE 7860

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD python -c "import urllib.request, os; port = os.environ.get('PORT', '7860'); urllib.request.urlopen(f'http://localhost:{port}/api/health')" || exit 1

# Start server
CMD ["sh", "-c", "uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT}"]