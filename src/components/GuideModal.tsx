import React from 'react';
import { X, BookOpen, Zap, Shield, Download } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Guide</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-crime-blue" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Getting Started</h3>
            </div>
            
            <div className="space-y-3">
              <div className="pl-9">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">1. Setup API Token</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                  <li>Visit <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-crime-blue hover:underline">Hugging Face Tokens</a></li>
                  <li>Create a new token with "Read" access</li>
                  <li>Copy and paste the token in the API Token section</li>
                  <li>Token will be securely saved in your browser</li>
                </ul>
              </div>

              <div className="pl-9">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">2. Generate Sketches</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                  <li>Describe the subject in detail (age, gender, features)</li>
                  <li>Include distinctive marks, scars, or characteristics</li>
                  <li>Be specific about facial features and hair</li>
                  <li>Click "Generate Police Sketch" to create the image</li>
                </ul>
              </div>

              <div className="pl-9">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">3. Use Your Sketches</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                  <li>Download high-quality PNG files</li>
                  <li>Print with official law enforcement headers</li>
                  <li>Share via system share dialog or copy link</li>
                  <li>Access recent sketches from history</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-crime-amber" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pro Tips</h3>
            </div>
            
            <div className="pl-9 space-y-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>Detailed Descriptions:</strong> The more specific your description, the more accurate the sketch. Include age ranges, facial structure, eye shape, and any unique features.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-800 dark:text-green-200">
                  <strong>Multiple Attempts:</strong> Generate several sketches with slightly different descriptions to capture various perspectives of the subject.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-xs text-purple-800 dark:text-purple-200">
                  <strong>Professional Quality:</strong> All sketches are optimized for law enforcement use with appropriate styling and contrast.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-crime-red" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Important Notes</h3>
            </div>
            
            <div className="pl-9 space-y-2">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Legal Disclaimer:</strong> AI-generated sketches are tools for investigation assistance only. They should not be used as the sole basis for identification or legal proceedings. Always corroborate with additional evidence and witness testimony.
                </p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-800 dark:text-red-200 leading-relaxed">
                  <strong>Privacy Notice:</strong> All data is processed locally and securely. Your API token and generated sketches are stored only on your device and are not transmitted to our servers.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Download className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">File Formats & Quality</h3>
            </div>
            
            <div className="pl-9 text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <p>• <strong>Download:</strong> High-resolution PNG format (512x512px)</p>
              <p>• <strong>Print:</strong> Optimized for standard 8.5x11" paper with headers</p>
              <p>• <strong>Share:</strong> Compressed for easy transmission while maintaining quality</p>
              <p>• <strong>Storage:</strong> Last 10 sketches automatically saved locally</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};