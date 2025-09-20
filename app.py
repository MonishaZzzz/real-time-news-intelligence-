"""
Root-level app.py for Render deployment
This imports and runs the actual backend application
"""

import sys
import os

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import and expose the app from backend/main.py
from main import app

# This allows Render to run: uvicorn app:app
__all__ = ['app']