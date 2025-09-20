import axios from 'axios';

// HARDCODED backend URLs - Change these based on your deployment
// For local development: 'http://localhost:8000'
// For production (Render): Replace with your actual Render URL
const API_BASE_URL = 'http://localhost:8000';  // Change this to your Render URL when deployed

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const fetchNews = async (filters = {}) => {
  try {
    const response = await api.get('/api/v1/news/politics', {
      params: {
        region: filters.region || 'all',
        topic: filters.topic || 'all',
        timeRange: filters.timeRange || '24h',
        biasLevel: filters.biasLevel || 'all',
        verified: filters.verified || false,
        limit: 50
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const searchNews = async (query, filters = {}) => {
  try {
    const response = await api.get('/api/v1/news/search', {
      params: {
        q: query,
        category: 'politics',
        ...filters,
        limit: 50
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

export const analyzeArticle = async (articleId) => {
  try {
    const response = await api.post(`/api/v1/analysis/article/${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Error analyzing article:', error);
    throw error;
  }
};

export const getRealtimeStats = async () => {
  try {
    const response = await api.get('/api/v1/stats/realtime');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export const factCheckClaim = async (claim) => {
  try {
    const response = await api.post('/api/v1/analysis/fact-check', { claim });
    return response.data;
  } catch (error) {
    console.error('Error fact-checking claim:', error);
    throw error;
  }
};

export const getTrendingTopics = async () => {
  try {
    const response = await api.get('/api/v1/trending/politics');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    throw error;
  }
};

export default api;
