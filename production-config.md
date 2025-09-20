# Production Configuration Guide

## Backend (Render)
When you deploy to Render, update these files:

### 1. Environment Variables on Render
Add these environment variables in your Render dashboard:
```
NEWS_API_KEY=your_actual_api_key_here
```

## Frontend (Netlify)

### 1. Update API URLs before deployment
Edit `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'https://your-backend-name.onrender.com';
```

Edit `frontend/src/services/websocket.js`:
```javascript
const WS_URL = 'wss://your-backend-name.onrender.com/ws';
```

### 2. Build Command for Netlify
```bash
cd frontend && npm install && npm run build
```

### 3. Publish Directory
```
frontend/build
```

## Local Development

### Backend
```bash
cd backend
python main.py
```
Backend will run at: http://localhost:8000

### Frontend
```bash
cd frontend
npm start
```
Frontend will run at: http://localhost:3000

## Testing the Connection

1. Start backend first
2. Start frontend
3. Check browser console for any errors
4. The app should display mock news data even without an API key

## Troubleshooting

### CORS Issues
The backend already has CORS configured to accept all origins:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Connection Failed
1. Check if backend is running
2. Verify the API_BASE_URL in frontend matches your backend URL
3. For Render, make sure the service is active (free tier may sleep)
4. Check browser console for specific error messages