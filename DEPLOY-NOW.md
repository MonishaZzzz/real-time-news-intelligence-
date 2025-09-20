# 🚀 DEPLOYMENT INSTRUCTIONS - STEP BY STEP

## PART 1: Deploy Backend to Render

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Add NewsAPI key and prepare for deployment"
git push origin main
```

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (easiest option)

### Step 3: Deploy Backend on Render
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Use these EXACT settings:

**Service Settings:**
- **Name:** `news-intelligence-backend` (or any name you like)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Runtime:** Python
- **Build Command:** 
  ```
  pip install -r requirements.txt
  ```
- **Start Command:**
  ```
  uvicorn backend.main:app --host 0.0.0.0 --port $PORT
  ```

### Step 4: Add Environment Variable (OPTIONAL - we have it hardcoded)
Skip this since we hardcoded the API key, but if you want:
- Click "Environment" tab
- Add: `NEWS_API_KEY` = `46b22d914f924ef086cf247254c0e5ab`

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (takes 5-10 minutes)
3. Copy your backend URL (looks like: `https://news-intelligence-backend.onrender.com`)

## PART 2: Update Frontend with Backend URL

### Step 6: Get Your Render URL
Your backend URL will be something like:
```
https://[your-service-name].onrender.com
```

### Step 7: Update Frontend Files
You need to update these two files with your Render URL:

**File 1: `frontend/src/services/api.js`**
Line 6 - Change from:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```
To:
```javascript
const API_BASE_URL = 'https://[your-service-name].onrender.com';
```

**File 2: `frontend/src/services/websocket.js`**
Line 4 - Change from:
```javascript
const WS_URL = 'ws://localhost:8000/ws';
```
To:
```javascript
const WS_URL = 'wss://[your-service-name].onrender.com/ws';
```

## PART 3: Deploy Frontend to Netlify

### Step 8: Build Frontend
```bash
cd frontend
npm run build
```
This creates a `build` folder with your production-ready app.

### Step 9: Deploy to Netlify

#### Option A: Drag & Drop (Easiest)
1. Go to https://netlify.com
2. Sign up/Login
3. Drag the `frontend/build` folder to the deployment area
4. Done! Your site is live!

#### Option B: GitHub Integration
1. Push updated code to GitHub
2. In Netlify, click "Import from Git"
3. Choose your repository
4. Build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
5. Click "Deploy"

### Step 10: Test Your Live App
1. Open your Netlify URL
2. You should see real political news loading!

## 🎯 QUICK CHECKLIST

- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend `api.js` updated with Render URL
- [ ] Frontend `websocket.js` updated with Render WSS URL
- [ ] Frontend built (`npm run build`)
- [ ] Frontend deployed on Netlify
- [ ] Live app tested and working

## ⚠️ IMPORTANT NOTES

1. **Render Free Tier:** Your backend may sleep after 15 minutes of inactivity. First request will take 30 seconds to wake up.

2. **API Key:** Your NewsAPI key is hardcoded in `backend/main.py`. This is fine for personal projects but not recommended for production.

3. **CORS:** Already configured to accept all origins, so no issues there.

4. **Testing:** After deployment, check browser console (F12) for any errors.

## 🆘 TROUBLESHOOTING

### "Cannot connect to backend"
- Check if Render service is running (not sleeping)
- Verify URLs in frontend are correct (https not http, wss not ws)

### "CORS error"
- Should not happen, but if it does, check backend is using latest code

### "No news loading"
- Check NewsAPI key is working (500 requests/day limit)
- Verify backend logs in Render dashboard

## 📝 YOUR DEPLOYMENT URLS

After deployment, save these:

**Backend (Render):**
```
URL: https://[your-service-name].onrender.com
API: https://[your-service-name].onrender.com/api/v1/news/politics
Docs: https://[your-service-name].onrender.com/docs
```

**Frontend (Netlify):**
```
URL: https://[your-app-name].netlify.app
```

## Ready? Let's Deploy! 🚀