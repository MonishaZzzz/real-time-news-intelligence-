#!/usr/bin/env python
"""
NewsAPI Configuration Tester
Tests if your NewsAPI key is working correctly
"""

import requests
import json
from datetime import datetime

def test_newsapi_key(api_key):
    """Test if NewsAPI key is valid and working"""
    
    if not api_key or api_key == "YOUR_NEWSAPI_KEY_HERE":
        print("❌ No API key configured!")
        print("\n📝 How to get your API key:")
        print("1. Go to https://newsapi.org/register")
        print("2. Sign up for free")
        print("3. Copy your API key")
        print("4. Add it to backend/main.py line 34")
        return False
    
    print(f"Testing API Key: {api_key[:10]}...")
    print("-" * 50)
    
    # Test the API key
    url = "https://newsapi.org/v2/top-headlines"
    params = {
        "apiKey": api_key,
        "category": "politics",
        "language": "en",
        "pageSize": 5
    }
    
    try:
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ API Key is valid!")
            print(f"✅ Found {data['totalResults']} political news articles")
            
            if data.get('articles'):
                print("\n📰 Latest Political News:")
                print("-" * 50)
                for i, article in enumerate(data['articles'][:3], 1):
                    print(f"{i}. {article['title'][:80]}")
                    print(f"   Source: {article['source']['name']}")
                    print(f"   Published: {article['publishedAt'][:10]}")
                    print()
            
            return True
            
        elif response.status_code == 401:
            print("❌ API Key is invalid!")
            print("Please check your key and try again")
            return False
            
        elif response.status_code == 429:
            print("⚠️ Rate limit exceeded!")
            print("Free tier allows 500 requests/day")
            return False
            
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.json().get('message', 'Unknown error'))
            return False
            
    except Exception as e:
        print(f"❌ Connection error: {e}")
        return False

def check_backend_config():
    """Check current backend configuration"""
    print("\n" + "="*50)
    print("Checking Backend Configuration")
    print("="*50)
    
    try:
        with open('backend/main.py', 'r') as f:
            content = f.read()
            
        # Find the API key line
        for line in content.split('\n'):
            if 'NEWS_API_KEY = ' in line and not line.strip().startswith('#'):
                if 'YOUR_NEWSAPI_KEY_HERE' in line:
                    print("⚠️ API key not configured in backend/main.py")
                    print("📝 Edit line 34 in backend/main.py")
                    return None
                elif '""' in line or "= ''" in line:
                    print("⚠️ API key is empty in backend/main.py")
                    return None
                else:
                    # Extract the key
                    import re
                    match = re.search(r'NEWS_API_KEY = ["\']([^"\']+)["\']', line)
                    if match:
                        api_key = match.group(1)
                        print(f"✅ Found API key in backend: {api_key[:10]}...")
                        return api_key
    except Exception as e:
        print(f"Error reading backend config: {e}")
    
    return None

if __name__ == "__main__":
    print("\n🔑 NewsAPI Configuration Tester")
    print("="*50)
    
    # Check backend configuration
    api_key = check_backend_config()
    
    if api_key:
        # Test the API key
        print("\n" + "="*50)
        print("Testing NewsAPI Connection")
        print("="*50)
        
        if test_newsapi_key(api_key):
            print("\n✅ SUCCESS! Your NewsAPI is configured correctly!")
            print("\n📚 Next Steps:")
            print("1. Start backend: cd backend && python main.py")
            print("2. Start frontend: cd frontend && npm start")
            print("3. Enjoy real political news from around the world!")
        else:
            print("\n❌ NewsAPI test failed. Please check your configuration.")
    else:
        print("\n📝 Please add your NewsAPI key to backend/main.py")
        print("Get your free key at: https://newsapi.org/register")