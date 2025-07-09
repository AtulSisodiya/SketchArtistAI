import React from 'react';
import { X, Trash2, Database, Shield, Palette } from 'lucide-react';
import { storage } from '../utils/storage';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all stored data? This will remove your API token and sketch history.')) {
      storage.clear();
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Configuration</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-crime-blue" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Data Management</h3>
            </div>
            
            <div className="pl-8 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">API Token</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Stored locally for authentication</p>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400">Encrypted</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Sketch History</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last 10 generated sketches</p>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400">Local</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-crime-blue" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Privacy & Security</h3>
            </div>
            
            <div className="pl-8 space-y-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                • All data is stored locally on your device
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                • API tokens are never transmitted to our servers
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                • Sketches are generated using Hugging Face API
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                • No personal data is collected or stored remotely
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Palette className="h-5 w-5 text-crime-blue" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Appearance</h3>
            </div>
            
            <div className="pl-8">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Theme preference is automatically saved and synced across sessions.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={clearAllData}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All Data</span>
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              This will remove all stored data and refresh the application
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};