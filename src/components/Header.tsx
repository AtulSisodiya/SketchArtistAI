import React from 'react';
import { PenTool, Moon, Sun, Settings, HelpCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onConfigClick: () => void;
  onGuideClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onConfigClick, onGuideClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-light-primary dark:bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-crime-blue rounded-lg">
              <PenTool className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sketch Artist AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Professional Criminal Sketch Generation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onGuideClick}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="User Guide"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <button
              onClick={onConfigClick}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Configuration"
            >
              <Settings className="h-5 w-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};