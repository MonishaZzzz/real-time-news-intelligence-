// DEPLOYMENT URL CONFIGURATION
// ================================
// This file contains all the URLs you need to update for deployment

// STEP 1: Deploy Backend to Render
// ---------------------------------
// 1. Create a new Web Service on Render
// 2. Connect your GitHub repository
// 3. Use these settings:
//    - Build Command: pip install -r requirements.txt
//    - Start Command: uvicorn backend.main:app --host 0.0.0.0 --port $PORT
// 4. After deployment, get your backend URL (e.g., https://your-app.onrender.com)

// STEP 2: Update Frontend URLs
// ---------------------------------
// Once you have your Render backend URL, update these two files:

// File: frontend/src/services/api.js
// Replace line 6 with your Render URL:
const BACKEND_URL_FOR_API = 'https://your-backend-name.onrender.com';  
// Example: 'https://news-intelligence-backend.onrender.com'

// File: frontend/src/services/websocket.js  
// Replace line 4 with your Render WebSocket URL:
const BACKEND_URL_FOR_WEBSOCKET = 'wss://your-backend-name.onrender.com/ws';
// Example: 'wss://news-intelligence-backend.onrender.com/ws'

// STEP 3: Deploy Frontend to Netlify
// ---------------------------------
// 1. Build locally first: cd frontend && npm run build
// 2. Deploy to Netlify:
//    - Drag and drop the 'frontend/build' folder to Netlify
//    OR
//    - Connect GitHub and use these settings:
//      - Build command: cd frontend && npm install && npm run build
//      - Publish directory: frontend/build

// STEP 4: Test Your Deployment
// ---------------------------------
// 1. Open your Netlify URL
// 2. Open browser console (F12)
// 3. Check for any errors
// 4. You should see the mock news data loading

// CURRENT LOCAL SETUP (for testing)
// ---------------------------------
const LOCAL_API_URL = 'http://localhost:8000';
const LOCAL_WS_URL = 'ws://localhost:8000/ws';

// IMPORTANT NOTES:
// ================
// 1. The backend is configured to use MOCK DATA by default (no API key needed)
// 2. If you want to use real NewsAPI data:
//    - Get a free API key from https://newsapi.org
//    - Add it to Render environment variables: NEWS_API_KEY=your_key
//    - Update backend/main.py line 36: USE_MOCK_DATA = False
// 3. CORS is already configured to accept all origins
// 4. Free Render services may sleep after 15 minutes of inactivity

console.log('Deployment URLs Configuration Helper');
console.log('=====================================');
console.log('Backend should be deployed to Render');
console.log('Frontend should be deployed to Netlify');
console.log('Update the URLs in this file with your actual deployment URLs');