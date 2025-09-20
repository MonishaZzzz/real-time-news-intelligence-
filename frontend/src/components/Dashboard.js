import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  CheckBadgeIcon,
  ScaleIcon,
  GlobeAmericasIcon,
  ClockIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

const Dashboard = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: ChartBarIcon,
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Verified Claims',
      value: stats.verifiedClaims,
      icon: CheckBadgeIcon,
      color: 'green',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Low Bias',
      value: stats.lowBias,
      icon: ScaleIcon,
      color: 'emerald',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Active Sources',
      value: stats.sourcesActive,
      icon: GlobeAmericasIcon,
      color: 'purple',
      change: '0%',
      trend: 'neutral'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="mb-8">
      {/* Live Status Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SignalIcon className="h-6 w-6 animate-pulse" />
            <div>
              <p className="font-semibold">Live Intelligence Feed Active</p>
              <p className="text-sm opacity-90">
                Last updated: {stats.lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5" />
            <span className="text-sm">Real-time</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                <span>{stat.change}</span>
                {stat.trend === 'up' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
                {stat.trend === 'down' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bias Distribution */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Bias Distribution Analysis
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Bias</span>
            <div className="flex items-center space-x-2">
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.lowBias / stats.totalArticles) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-green-500 h-2 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                {stats.lowBias}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Medium Bias</span>
            <div className="flex items-center space-x-2">
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.mediumBias / stats.totalArticles) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  className="bg-yellow-500 h-2 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                {stats.mediumBias}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">High Bias</span>
            <div className="flex items-center space-x-2">
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.highBias / stats.totalArticles) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="bg-red-500 h-2 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                {stats.highBias}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
