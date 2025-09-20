import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NewsFeed from './components/NewsFeed';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import LoadingScreen from './components/LoadingScreen';
import { fetchNews, searchNews, analyzeArticle } from './services/api';
import { connectWebSocket } from './services/websocket';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: 'all',
    topic: 'all',
    timeRange: '24h',
    biasLevel: 'all',
    verified: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalArticles: 0,
    verifiedClaims: 0,
    lowBias: 0,
    mediumBias: 0,
    highBias: 0,
    sourcesActive: 0,
    lastUpdate: new Date()
  });
  const [wsConnected, setWsConnected] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    // Initial load
    loadNews();
    
    // Connect to WebSocket for real-time updates
    const ws = connectWebSocket((data) => {
      handleRealtimeUpdate(data);
    });

    ws.onopen = () => {
      setWsConnected(true);
      toast.success('Connected to real-time feed');
    };

    ws.onclose = () => {
      setWsConnected(false);
      // Silently handle disconnection without showing toast
    };

    // Cleanup
    return () => {
      if (ws) ws.close();
    };
  }, []);

  useEffect(() => {
    // Apply filters when they change
    loadNews();
  }, [filters]);

  useEffect(() => {
    // Dark mode toggle
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await fetchNews(filters);
      setNews(data.articles);
      updateStats(data.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error loading news:', error);
      toast.error('Failed to load news. Please try again.');
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      loadNews();
      return;
    }

    setLoading(true);
    setSearchQuery(query);
    try {
      const data = await searchNews(query, filters);
      setNews(data.articles);
      updateStats(data.articles);
      toast.success(`Found ${data.articles.length} articles`);
    } catch (error) {
      console.error('Error searching news:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRealtimeUpdate = (data) => {
    if (data.type === 'new_article') {
      setNews(prev => [data.article, ...prev].slice(0, 50));
      toast('New article received', {
        icon: '📰',
        duration: 3000,
      });
      updateStats([data.article, ...news]);
    } else if (data.type === 'stats_update') {
      setStats(prev => ({ ...prev, ...data.stats }));
    }
  };

  const updateStats = (articles) => {
    const biasCount = { low: 0, medium: 0, high: 0 };
    let verifiedCount = 0;

    articles.forEach(article => {
      if (article.biasLevel) {
        biasCount[article.biasLevel]++;
      }
      if (article.verified) {
        verifiedCount++;
      }
    });

    setStats({
      totalArticles: articles.length,
      verifiedClaims: verifiedCount,
      lowBias: biasCount.low,
      mediumBias: biasCount.medium,
      highBias: biasCount.high,
      sourcesActive: new Set(articles.map(a => a.source)).size,
      lastUpdate: new Date()
    });
  };

  const handleArticleClick = async (article) => {
    setSelectedArticle(article);
    
    // Analyze article for more details
    try {
      const analysis = await analyzeArticle(article.id);
      setSelectedArticle({ ...article, analysis });
    } catch (error) {
      console.error('Error analyzing article:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading && news.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            background: darkMode ? '#1f2937' : '#fff',
            color: darkMode ? '#fff' : '#000',
          },
        }}
      />
      
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        wsConnected={wsConnected}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                <span className="gradient-text">Global Politics Intelligence</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Real-time analysis of global political news with AI-powered fact-checking and bias detection
              </p>
              
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Dashboard Stats */}
            <Dashboard stats={stats} />

            {/* Filter Panel */}
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange}
              resultCount={news.length}
            />

            {/* News Feed */}
            <NewsFeed 
              news={news}
              loading={loading}
              onArticleClick={handleArticleClick}
              selectedArticle={selectedArticle}
              onCloseArticle={() => setSelectedArticle(null)}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 Global Politics Intelligence. Powered by advanced AI and real-time data analysis.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
