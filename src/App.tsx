import React, { useState } from 'react';
import { Header } from './components/Header';
import { ApiTokenManager } from './components/ApiTokenManager';
import { SketchGenerator } from './components/SketchGenerator';
import { SketchResultComponent } from './components/SketchResult';
import { ConfigModal } from './components/ConfigModal';
import { GuideModal } from './components/GuideModal';
import { SketchResult } from './utils/imageGeneration';

function App() {
  const [apiToken, setApiToken] = useState('');
  const [currentSketch, setCurrentSketch] = useState<SketchResult | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary transition-colors duration-200">
      <Header 
        onConfigClick={() => setShowConfig(true)}
        onGuideClick={() => setShowGuide(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <SketchGenerator
              apiToken={apiToken}
              onSketchGenerated={setCurrentSketch}
            />
            
            {currentSketch && (
              <SketchResultComponent sketch={currentSketch} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ApiTokenManager onTokenChange={setApiToken} />
            
            {!apiToken && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                  Quick Start Guide
                </h3>
                <ol className="text-xs text-amber-700 dark:text-amber-300 space-y-1 list-decimal list-inside">
                  <li>Get your Hugging Face API token</li>
                  <li>Enter it in the API Token field above</li>
                  <li>Start generating professional police sketches</li>
                </ol>
                <button
                  onClick={() => setShowGuide(true)}
                  className="mt-3 text-xs text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 underline"
                >
                  View detailed guide →
                </button>
              </div>
            )}

            <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Recent Activity
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Total Sketches</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {currentSketch ? '1' : '0'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                  <span className="text-xs text-gray-600 dark:text-gray-400">API Status</span>
                  <span className={`text-xs font-medium ${apiToken ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {apiToken ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConfigModal isOpen={showConfig} onClose={() => setShowConfig(false)} />
      <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}

export default App;