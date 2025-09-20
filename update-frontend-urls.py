#!/usr/bin/env python
"""
Quick script to update frontend URLs for production deployment
Run this after you get your Render backend URL
"""

import sys
import re

def update_frontend_urls(backend_url):
    """Update frontend service files with production URLs"""
    
    # Clean up the URL
    if not backend_url.startswith('https://'):
        backend_url = f'https://{backend_url}'
    if backend_url.endswith('/'):
        backend_url = backend_url[:-1]
    
    # Derive WebSocket URL
    ws_url = backend_url.replace('https://', 'wss://') + '/ws'
    
    print(f"Backend URL: {backend_url}")
    print(f"WebSocket URL: {ws_url}")
    print("-" * 50)
    
    # Update api.js
    api_file = 'frontend/src/services/api.js'
    try:
        with open(api_file, 'r') as f:
            content = f.read()
        
        # Replace the API_BASE_URL line
        content = re.sub(
            r"const API_BASE_URL = ['\"].*?['\"];",
            f"const API_BASE_URL = '{backend_url}';",
            content
        )
        
        with open(api_file, 'w') as f:
            f.write(content)
        
        print(f"✅ Updated {api_file}")
    except Exception as e:
        print(f"❌ Error updating {api_file}: {e}")
        return False
    
    # Update websocket.js
    ws_file = 'frontend/src/services/websocket.js'
    try:
        with open(ws_file, 'r') as f:
            content = f.read()
        
        # Replace the WS_URL line
        content = re.sub(
            r"const WS_URL = ['\"].*?['\"];",
            f"const WS_URL = '{ws_url}';",
            content
        )
        
        with open(ws_file, 'w') as f:
            f.write(content)
        
        print(f"✅ Updated {ws_file}")
    except Exception as e:
        print(f"❌ Error updating {ws_file}: {e}")
        return False
    
    print("-" * 50)
    print("✅ Frontend URLs updated successfully!")
    print("\n📝 Next steps:")
    print("1. Run: cd frontend && npm run build")
    print("2. Deploy the 'frontend/build' folder to Netlify")
    
    return True

if __name__ == "__main__":
    print("\n🔧 Frontend URL Updater")
    print("="*50)
    
    if len(sys.argv) > 1:
        backend_url = sys.argv[1]
    else:
        print("\nEnter your Render backend URL")
        print("Example: news-intelligence-backend.onrender.com")
        print("or: https://news-intelligence-backend.onrender.com")
        backend_url = input("\nYour Render URL: ").strip()
    
    if not backend_url:
        print("❌ No URL provided!")
        sys.exit(1)
    
    update_frontend_urls(backend_url)