import React from 'react';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  MoonIcon, 
  SunIcon,
  WifiIcon,
  BellIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Header = ({ darkMode, setDarkMode, wsConnected }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <GlobeAltIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Politics Intel
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Real-time Global Analysis
              </p>
            </div>
          </div>

          {/* Center Status */}
          <div className="hidden md:flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              wsConnected ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
            }`}>
              <WifiIcon className={`h-4 w-4 ${
                wsConnected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`} />
              <span className={`text-sm font-medium ${
                wsConnected ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              }`}>
                {wsConnected ? 'Live' : 'Offline'}
              </span>
              {wsConnected && <span className="pulse-dot"></span>}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Settings"
            >
              <Cog6ToothIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
