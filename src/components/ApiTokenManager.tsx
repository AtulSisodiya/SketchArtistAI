import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, Eye, EyeOff, Check, AlertCircle, Trash2 } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface ApiTokenManagerProps {
  onTokenChange: (token: string) => void;
}

export const ApiTokenManager: React.FC<ApiTokenManagerProps> = ({ onTokenChange }) => {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const savedToken = storage.get(STORAGE_KEYS.API_TOKEN);
    if (savedToken) {
      setToken(savedToken);
      setIsValid(true);
      onTokenChange(savedToken);
    }
  }, [onTokenChange]);

  const handleTokenChange = (value: string) => {
    setToken(value);
    const valid = value.length > 10 && value.startsWith('hf_');
    setIsValid(valid);
    
    if (valid) {
      storage.set(STORAGE_KEYS.API_TOKEN, value);
      onTokenChange(value);
    }
  };

  const clearToken = () => {
    setToken('');
    setIsValid(false);
    storage.remove(STORAGE_KEYS.API_TOKEN);
    onTokenChange('');
  };

  return (
    <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Key className="h-5 w-5 text-crime-blue" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Hugging Face API Token
          </h3>
        </div>
        
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="text-xs text-crime-blue hover:text-crime-blue/80 transition-colors flex items-center space-x-1"
        >
          <span>Need help?</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type={showToken ? 'text' : 'password'}
            value={token}
            onChange={(e) => handleTokenChange(e.target.value)}
            placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-dark-tertiary border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crime-blue focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pr-20"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
            {token && (
              <button
                onClick={clearToken}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Clear token"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            
            <button
              onClick={() => setShowToken(!showToken)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title={showToken ? 'Hide token' : 'Show token'}
            >
              {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isValid ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400">Token saved and ready</span>
            </>
          ) : token ? (
            <>
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-amber-600 dark:text-amber-400">Invalid token format</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Token required to generate sketches</span>
            </>
          )}
        </div>

        {showGuide && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              How to get your API token:
            </h4>
            <ol className="text-xs text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
              <li>Visit <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Hugging Face Token Settings</a></li>
              <li>Click "New token" and select "Read" access</li>
              <li>Copy the token (starts with "hf_")</li>
              <li>Paste it above and it will be securely saved</li>
            </ol>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              <strong>Note:</strong> Your token is stored locally and never sent to our servers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};