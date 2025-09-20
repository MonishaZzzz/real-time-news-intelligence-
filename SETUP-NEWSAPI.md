# 🔑 NewsAPI Setup Guide

## Step 1: Get Your Free API Key

1. **Go to NewsAPI Registration**: 
   👉 https://newsapi.org/register

2. **Sign Up for Free**:
   - Enter your email
   - Create a password
   - Select "I am an individual" 
   - Click "Get API Key"

3. **Copy Your API Key**:
   - After registration, you'll see your API key
   - It looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
   - Copy this key

## Step 2: Add API Key to Your App

### Option A: Direct Configuration (Quickest)

Edit `backend/main.py` line 34:
```python
# Change this line:
NEWS_API_KEY = "YOUR_NEWSAPI_KEY_HERE"

# To this (with your actual key):
NEWS_API_KEY = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"  # Your actual key
```

### Option B: Environment Variable (More Secure)

1. Create/edit `.env` file in root directory:
```
NEWS_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

2. Update `backend/main.py` line 34:
```python
NEWS_API_KEY = os.getenv("NEWS_API_KEY", "")
```

## Step 3: Test Your Configuration

Run this command to test:
```bash
python test-newsapi.py
```

## Step 4: Start Using Real News

1. **Start Backend**:
```bash
cd backend
python main.py
```

2. **Start Frontend**:
```bash
cd frontend  
npm start
```

You should now see real, live political news from around the world!

## 📊 NewsAPI Free Tier Limits

- **500 requests/day** (plenty for development)
- **100 requests per hour**
- **News from last month only**
- **Required attribution**: "Powered by NewsAPI"

## 🌍 What You'll Get

Real-time news from major sources:
- BBC News
- CNN
- Reuters
- The Guardian
- The Washington Post
- Al Jazeera
- Associated Press
- And many more...

## ⚠️ Important Notes

1. **Don't commit your API key to GitHub!**
   - Add `.env` to your `.gitignore`
   - Use environment variables in production

2. **For Production (Render)**:
   - Add `NEWS_API_KEY` to Render environment variables
   - Don't hardcode the key in your code

3. **Testing Without API Key**:
   - The app will automatically use mock data if no valid key is found
   - This ensures your app always works

## 🔧 Troubleshooting

### "API key is invalid"
- Check for typos in your key
- Make sure you've activated your account via email
- Try regenerating your key on NewsAPI dashboard

### "Rate limit exceeded"
- Free tier allows 500 requests/day
- Wait for the limit to reset (midnight UTC)
- Consider caching responses

### "No articles found"
- NewsAPI free tier only provides news from last 30 days
- Try broader search terms
- Check if your sources are active

## Need Help?

1. Check NewsAPI documentation: https://newsapi.org/docs
2. View your API usage: https://newsapi.org/account
3. Test your key: Run `python test-newsapi.py`