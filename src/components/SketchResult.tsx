import React from 'react';
import { Download, Share2, Printer, Clock, User } from 'lucide-react';
import { SketchResult, downloadSketch, printSketch } from '../utils/imageGeneration';

interface SketchResultProps {
  sketch: SketchResult;
}

export const SketchResultComponent: React.FC<SketchResultProps> = ({ sketch }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        // Convert blob URL to file for sharing
        const response = await fetch(sketch.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `sketch-${sketch.id}.png`, { type: 'image/png' });
        
        await navigator.share({
          title: 'Police Sketch',
          text: `Generated sketch: ${sketch.prompt}`,
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const shareText = `Check out this police sketch: ${sketch.prompt}`;
    const shareUrl = window.location.href;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Share link copied to clipboard!');
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark-secondary rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Generated Police Sketch
          </h3>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{formatTimestamp(sketch.timestamp)}</span>
          </div>
        </div>

        <div className="relative group mb-6">
          <img
            src={sketch.imageUrl}
            alt="Generated police sketch"
            className="w-full h-auto rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-md"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
              Click to view full size
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <User className="h-4 w-4 text-crime-blue mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject Description:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {sketch.prompt}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadSketch(sketch.imageUrl, `police-sketch-${sketch.id}.png`)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>

            <button
              onClick={() => printSketch(sketch.imageUrl)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-xs text-amber-800 dark:text-amber-200">
              <strong>Law Enforcement Notice:</strong> This AI-generated sketch is for identification assistance only. 
              Always verify with additional evidence and witness testimony.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};