"""
Simple main.py at root level for Render deployment
This creates a basic FastAPI app for testing
"""

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

# Create FastAPI app
app = FastAPI(
    title="News Intelligence API",
    version="1.0.0",
    description="Real-time news intelligence backend"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "News Intelligence Backend API",
        "status": "running",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/v1/news/politics")
def get_politics_news():
    """Return mock political news for testing"""
    return {
        "articles": [
            {
                "id": "1",
                "title": "G20 Summit: World Leaders Agree on Climate Action",
                "description": "Leaders reach historic agreement on climate policy",
                "source": "Reuters",
                "url": "https://example.com/article1",
                "publishedAt": datetime.now().isoformat(),
                "category": "politics",
                "biasLevel": "low",
                "verified": True
            },
            {
                "id": "2", 
                "title": "UN Security Council Passes Resolution",
                "description": "Unanimous approval for humanitarian aid",
                "source": "BBC News",
                "url": "https://example.com/article2",
                "publishedAt": datetime.now().isoformat(),
                "category": "politics",
                "biasLevel": "low",
                "verified": True
            },
            {
                "id": "3",
                "title": "EU Parliament Votes on Digital Privacy",
                "description": "New laws affecting tech companies",
                "source": "Politico",
                "url": "https://example.com/article3",
                "publishedAt": datetime.now().isoformat(),
                "category": "politics",
                "biasLevel": "medium",
                "verified": False
            }
        ],
        "total": 3
    }

@app.get("/api/v1/news/search")
def search_news(q: str = "politics"):
    return {
        "articles": [
            {
                "id": "1",
                "title": f"Search result for: {q}",
                "description": "Mock search result",
                "source": "Test Source",
                "url": "https://example.com",
                "publishedAt": datetime.now().isoformat()
            }
        ],
        "query": q,
        "total": 1
    }

@app.get("/api/v1/stats/realtime")
def get_stats():
    return {
        "totalArticles": 1234,
        "verifiedClaims": 567,
        "lowBias": 300,
        "mediumBias": 200,
        "highBias": 100,
        "sourcesActive": 12,
        "lastUpdate": datetime.now().isoformat()
    }

@app.get("/api/v1/trending/politics")
def get_trending():
    return {
        "topics": [
            {"name": "Climate Summit", "count": 245, "trend": "up"},
            {"name": "Trade Wars", "count": 189, "trend": "down"},
            {"name": "Election 2024", "count": 456, "trend": "up"}
        ],
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/v1/analysis/article/{article_id}")
def analyze_article(article_id: str):
    return {
        "articleId": article_id,
        "analysis": {
            "keyPoints": ["Point 1", "Point 2", "Point 3"],
            "sentiment": "Neutral with slight positive bias",
            "factCheck": "Claims verified",
            "biasAnalysis": "Low bias detected"
        },
        "timestamp": datetime.now().isoformat()
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket):
    await websocket.accept()
    await websocket.send_json({
        "type": "connection",
        "status": "connected",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)