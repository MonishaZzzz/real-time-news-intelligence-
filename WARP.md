# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Real-time Global Politics News Intelligence System with React frontend and FastAPI backend, featuring AI-powered analysis, fact-checking, and bias detection.

## Quick Commands

### Local Development

Start backend server:
```bash
cd backend && python main.py
```

Start frontend development server:
```bash
cd frontend && npm start
```

Run both simultaneously (requires concurrently):
```bash
npm run dev
```

### Testing

Test API endpoints:
```bash
python test-api.py
```

Run frontend tests:
```bash
cd frontend && npm test
```

### Building

Build frontend for production:
```bash
cd frontend && npm run build
```

## Architecture

### Backend (FastAPI)
- **Entry Point**: `backend/main.py`
- **Framework**: FastAPI with async support
- **Key Features**:
  - Mock news data generator (no API key required)
  - WebSocket support for real-time updates
  - CORS enabled for all origins
  - RESTful API endpoints for news, search, and analysis

### Frontend (React)
- **Entry Point**: `frontend/src/App.js`
- **Framework**: React 18 with Tailwind CSS
- **Key Components**:
  - `App.js`: Main application logic and state management
  - `components/NewsFeed.js`: News article display grid
  - `components/Dashboard.js`: Real-time statistics
  - `services/api.js`: API service layer
  - `services/websocket.js`: WebSocket connection handler

## Deployment Configuration

### Backend URLs (Update before deployment)
- **File**: `frontend/src/services/api.js`
- **Line 6**: Change `API_BASE_URL` to your Render URL

### WebSocket URLs (Update before deployment)  
- **File**: `frontend/src/services/websocket.js`
- **Line 4**: Change `WS_URL` to your Render WebSocket URL

### Deployment Platforms
- **Backend**: Render (Web Service)
- **Frontend**: Netlify (Static Site)

## Important Files

- `DEPLOYMENT-URLS.js`: URL configuration guide
- `production-config.md`: Production deployment instructions
- `test-api.py`: API endpoint tester
- `.env`: Environment variables (NEWS_API_KEY)

## Common Issues & Solutions

### CORS Errors
Already configured in `backend/main.py` to accept all origins.

### Connection Failed
1. Ensure backend is running on port 8000
2. Check that frontend points to correct backend URL
3. For production, verify Render service is active

### Mock Data Mode
Backend uses mock data by default (`USE_MOCK_DATA = True` in `backend/main.py` line 36).
To use real NewsAPI data:
1. Get API key from https://newsapi.org
2. Add to `.env` file or Render environment variables
3. Set `USE_MOCK_DATA = False`

## Development Workflow

1. Backend changes: Edit `backend/main.py`, restart server
2. Frontend changes: Edit files in `frontend/src/`, auto-reloads
3. Test API: Run `python test-api.py`
4. Deploy: Update URLs in frontend service files, then deploy to respective platforms