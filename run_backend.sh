#!/bin/bash
# Ensure we are in the project root
cd "$(dirname "$0")"

# Activate venv and run uvicorn
./.venv/bin/uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
