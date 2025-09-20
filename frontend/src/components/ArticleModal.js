import React from 'react';
import { motion } from 'framer-motion';
import {
  XMarkIcon,
  LinkIcon,
  ShareIcon,
  BookmarkIcon,
  CheckBadgeIcon,
  // ExclamationTriangleIcon, // Removed unused import
  ChartBarIcon,
  ScaleIcon,
  GlobeAltIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const ArticleModal = ({ article, onClose }) => {
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modal = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        variants={modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {article.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <GlobeAltIcon className="h-4 w-4" />
                  <span>{article.source}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{new Date(article.publishedAt || new Date()).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {/* Image */}
          {article.image && (
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Analysis Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            {article.verified && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckBadgeIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-700 dark:text-green-300">Fact Checked</span>
              </div>
            )}
            
            {article.biasLevel && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <ScaleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  {article.biasLevel.charAt(0).toUpperCase() + article.biasLevel.slice(1)} Bias
                </span>
              </div>
            )}

            {article.confidence && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <ChartBarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-purple-700 dark:text-purple-300">
                  {Math.round(article.confidence * 100)}% Confidence
                </span>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {article.content || article.summary || article.description}
            </p>
          </div>

          {/* AI Analysis Section */}
          {article.analysis && (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <ChartBarIcon className="h-5 w-5 text-blue-600" />
                <span>AI Analysis</span>
              </h3>
              
              <div className="space-y-4">
                {article.analysis.keyPoints && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Points:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {article.analysis.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.analysis.sentiment && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Sentiment Analysis:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{article.analysis.sentiment}</p>
                  </div>
                )}

                {article.analysis.factCheck && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Fact Check Results:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{article.analysis.factCheck}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related Topics */}
          {article.topics && article.topics.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Related Topics:</h4>
              <div className="flex flex-wrap gap-2">
                {article.topics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <LinkIcon className="h-5 w-5" />
                <span>Open Original</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ShareIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <BookmarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View on {article.source}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArticleModal;
