#!/usr/bin/env python
"""
Quick API Test Script
Tests both local and production APIs
"""

import requests
import json
from datetime import datetime

def test_api(base_url, name="API"):
    """Test API endpoints"""
    print(f"\n{'='*50}")
    print(f"Testing {name}: {base_url}")
    print('='*50)
    
    # Test root endpoint
    try:
        response = requests.get(f"{base_url}/", timeout=10)
        if response.status_code == 200:
            print("✅ Root endpoint working")
            data = response.json()
            print(f"   Version: {data.get('version', 'N/A')}")
            print(f"   Status: {data.get('status', 'N/A')}")
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Cannot connect to {base_url}: {e}")
        return False
    
    # Test news endpoint
    try:
        response = requests.get(f"{base_url}/api/v1/news/politics", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ News endpoint working")
            print(f"   Articles found: {data.get('total', 0)}")
            if data.get('articles'):
                print(f"   First article: {data['articles'][0].get('title', 'N/A')[:50]}...")
        else:
            print(f"❌ News endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ News endpoint error: {e}")
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health", timeout=10)
        if response.status_code == 200:
            print("✅ Health endpoint working")
        else:
            print(f"❌ Health endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health endpoint error: {e}")
    
    return True

if __name__ == "__main__":
    print("\nGlobal Politics Intelligence API Tester")
    print("="*50)
    
    # Test local API
    LOCAL_URL = "http://localhost:8000"
    test_api(LOCAL_URL, "Local API")
    
    # Test production API (update this with your Render URL)
    PRODUCTION_URL = "https://your-backend-name.onrender.com"  # UPDATE THIS
    
    print("\n" + "="*50)
    print("To test production API:")
    print("1. Update PRODUCTION_URL in this script with your Render URL")
    print("2. Run this script again")
    print("="*50)
    
    # Uncomment this when you have your production URL:
    # test_api(PRODUCTION_URL, "Production API (Render)")