import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsCard from './NewsCard';
import ArticleModal from './ArticleModal';

const NewsFeed = ({ news, loading, onArticleClick, selectedArticle, onCloseArticle }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <svg
          className="mx-auto h-24 w-24 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or search query
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {news.map((article, index) => (
            <NewsCard
              key={article.id || index}
              article={article}
              onClick={() => onArticleClick(article)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={onCloseArticle}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsFeed;
