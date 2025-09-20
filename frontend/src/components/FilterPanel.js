import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FunnelIcon,
  GlobeAmericasIcon,
  TagIcon,
  ClockIcon,
  ScaleIcon,
  CheckBadgeIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const FilterPanel = ({ filters, onFilterChange, resultCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const regions = [
    { value: 'all', label: 'All Regions', icon: '🌍' },
    { value: 'north-america', label: 'North America', icon: '🇺🇸' },
    { value: 'europe', label: 'Europe', icon: '🇪🇺' },
    { value: 'asia', label: 'Asia', icon: '🌏' },
    { value: 'middle-east', label: 'Middle East', icon: '🌐' },
    { value: 'africa', label: 'Africa', icon: '🌍' },
    { value: 'latin-america', label: 'Latin America', icon: '🌎' },
    { value: 'oceania', label: 'Oceania', icon: '🏝️' }
  ];

  const topics = [
    { value: 'all', label: 'All Topics' },
    { value: 'elections', label: 'Elections & Democracy' },
    { value: 'diplomacy', label: 'International Relations' },
    { value: 'trade', label: 'Trade & Economics' },
    { value: 'security', label: 'Security & Defense' },
    { value: 'climate', label: 'Climate Policy' },
    { value: 'human-rights', label: 'Human Rights' },
    { value: 'technology', label: 'Tech Policy' }
  ];

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const biasLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'low', label: 'Low Bias', color: 'green' },
    { value: 'medium', label: 'Medium Bias', color: 'yellow' },
    { value: 'high', label: 'High Bias', color: 'red' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeFiltersCount = Object.values(filters).filter(
    v => v !== 'all' && v !== '24h' && v !== false
  ).length;

  return (
    <div className="mb-8">
      {/* Filter Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full md:w-auto flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-3">
          <FunnelIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Filters
          </span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {resultCount} results
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </motion.button>

      {/* Expanded Filter Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Region Filter */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <GlobeAmericasIcon className="h-4 w-4" />
                    <span>Region</span>
                  </label>
                  <select
                    value={filters.region}
                    onChange={(e) => handleFilterChange('region', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.icon} {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic Filter */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <TagIcon className="h-4 w-4" />
                    <span>Topic</span>
                  </label>
                  <select
                    value={filters.topic}
                    onChange={(e) => handleFilterChange('topic', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {topics.map((topic) => (
                      <option key={topic.value} value={topic.value}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Range Filter */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <ClockIcon className="h-4 w-4" />
                    <span>Time Range</span>
                  </label>
                  <select
                    value={filters.timeRange}
                    onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {timeRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bias Level Filter */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <ScaleIcon className="h-4 w-4" />
                    <span>Bias Level</span>
                  </label>
                  <select
                    value={filters.biasLevel}
                    onChange={(e) => handleFilterChange('biasLevel', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {biasLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Verified Only Toggle */}
                <div className="flex items-end">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.verified}
                      onChange={(e) => handleFilterChange('verified', e.target.checked)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex items-center space-x-2">
                      <CheckBadgeIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Verified Only
                      </span>
                    </div>
                  </label>
                </div>

                {/* Reset Filters */}
                <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onFilterChange({
                      region: 'all',
                      topic: 'all',
                      timeRange: '24h',
                      biasLevel: 'all',
                      verified: false
                    })}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Reset All
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;
