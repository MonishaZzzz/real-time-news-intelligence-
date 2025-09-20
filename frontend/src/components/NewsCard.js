import React from 'react';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const NewsCard = ({ article, onClick, index }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: index * 0.05
      }
    }
  };

  const getBiasColor = (level) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😔';
      case 'neutral': return '😐';
      default: return '🤔';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); // minutes

    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.article
      variants={item}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer card-hover group"
    >
      {/* Image or Gradient Header */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <GlobeAltIcon className="h-20 w-20 text-white/30" />
          </div>
        )}
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {article.verified && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
              <CheckBadgeIcon className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
          {article.breaking && (
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full animate-pulse">
              BREAKING
            </span>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {article.category || 'Politics'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {article.summary || article.description}
        </p>

        {/* Metadata */}
        <div className="space-y-2">
          {/* Source and Time */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="h-4 w-4" />
              <span className="font-medium">{article.source}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>{formatTime(article.publishedAt || new Date())}</span>
            </div>
          </div>

          {/* Analysis Tags */}
          <div className="flex flex-wrap gap-2">
            {article.biasLevel && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBiasColor(article.biasLevel)}`}>
                {article.biasLevel} bias
              </span>
            )}
            {article.sentiment && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                {getSentimentIcon(article.sentiment)} {article.sentiment}
              </span>
            )}
            {article.confidence && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center space-x-1">
                <ChartBarIcon className="h-3 w-3" />
                <span>{Math.round(article.confidence * 100)}% confidence</span>
              </span>
            )}
          </div>

          {/* Topics/Tags */}
          {article.topics && article.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.topics.slice(0, 3).map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 flex items-center justify-between">
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center space-x-1">
            <span>Read Analysis</span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </button>
          
          {article.factCheckStatus && (
            <div className="flex items-center space-x-1">
              {article.factCheckStatus === 'verified' ? (
                <CheckBadgeIcon className="h-5 w-5 text-green-600" />
              ) : article.factCheckStatus === 'disputed' ? (
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;
