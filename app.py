"""
Root-level app.py for Render deployment
This imports and runs the actual backend application
"""

import sys
import os
from pathlib import Path

# Get the absolute path to the backend directory
BASE_DIR = Path(__file__).resolve().parent
BACKEND_DIR = BASE_DIR / 'backend'

# Add backend directory to Python path
sys.path.insert(0, str(BACKEND_DIR))

# Now import the FastAPI app from backend/main.py
try:
    from main import app
    print(f"Successfully imported app from {BACKEND_DIR}/main.py")
    
    # Add a debug endpoint to verify deployment
    @app.get("/debug")
    def debug_info():
        return {
            "status": "App imported successfully",
            "backend_dir": str(BACKEND_DIR),
            "base_dir": str(BASE_DIR),
            "sys_path": sys.path[:3]
        }
except ImportError as e:
    print(f"Failed to import app: {e}")
    # Fallback: create a simple app for debugging
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/")
    def root():
        return {"error": "Failed to import main app", "detail": str(e)}
    
    @app.get("/health")
    def health():
        return {"status": "unhealthy", "error": str(e)}
    
    @app.get("/debug")
    def debug_info():
        return {
            "status": "Import failed",
            "error": str(e),
            "backend_dir": str(BACKEND_DIR),
            "base_dir": str(BASE_DIR),
            "sys_path": sys.path[:3]
        }

# This allows Render to run: uvicorn app:app
__all__ = ['app']
