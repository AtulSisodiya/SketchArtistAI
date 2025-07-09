import React, { useState } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { generateSketch, SketchResult } from '../utils/imageGeneration';

interface SketchGeneratorProps {
  apiToken: string;
  onSketchGenerated: (sketch: SketchResult) => void;
}

export const SketchGenerator: React.FC<SketchGeneratorProps> = ({ 
  apiToken, 
  onSketchGenerated 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiToken) {
      setError('Please provide a valid API token first');
      return;
    }

    if (!prompt.trim()) {
      setError('Please describe the subject for the sketch');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const sketch = await generateSketch({
        prompt: prompt.trim(),
        apiToken
      });
      
      onSketchGenerated(sketch);
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate sketch');
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = [
    "Male, 35-40 years old, brown hair, beard, scar on left cheek",
    "Female, 25-30 years old, blonde hair, blue eyes, round face",
    "Male, 20-25 years old, black hair, thin build, distinctive nose",
    "Female, 45-50 years old, gray hair, glasses, serious expression"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Generate Professional Police Sketch
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Describe the subject in detail for an accurate forensic sketch
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the subject in detail: age, gender, hair color, facial features, distinctive marks, etc."
            rows={4}
            className="w-full px-4 py-3 text-sm bg-white dark:bg-dark-secondary border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-crime-blue focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isGenerating}
          />
          
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <span className="text-xs text-gray-400">
              {prompt.length}/500
            </span>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isGenerating || !apiToken || !prompt.trim()}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-crime-blue text-white rounded-xl hover:bg-crime-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating Sketch...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Generate Police Sketch</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <h4 className="col-span-full text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Example descriptions:
          </h4>
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPrompt(example)}
              className="text-left p-3 text-xs bg-gray-50 dark:bg-dark-tertiary border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
              disabled={isGenerating}
            >
              {example}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};