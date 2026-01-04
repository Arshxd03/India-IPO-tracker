import React, { useEffect, useState } from 'react';
import { LOADING_TIPS } from '../constants';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    // Random initial tip
    setTipIndex(Math.floor(Math.random() * LOADING_TIPS.length));
    
    // Rotate tips every 4 seconds
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % LOADING_TIPS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 p-6 text-center">
      <div className="relative">
         {/* Pulsing effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <Loader2 size={48} className="text-primary animate-spin relative z-10" />
      </div>
      
      <div className="max-w-md space-y-2 animate-fade-in-up">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Fetching Live Market Data...</h3>
        <p className="text-gray-500 text-sm">Scanning Chittorgarh.com & NSE for latest filings</p>
      </div>

      <div className="bg-white dark:bg-charcoal-light p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 max-w-lg w-full transition-all duration-500">
        <p className="text-primary font-bold text-xs uppercase mb-2">IPO Pathshala Trivia</p>
        <p className="text-gray-700 dark:text-gray-300 font-medium italic">
          "{LOADING_TIPS[tipIndex]}"
        </p>
      </div>

      {/* Skeleton Grid for background visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full opacity-20 max-w-4xl pointer-events-none absolute bottom-0 -z-10 translate-y-1/2">
        {[1,2,3].map(i => (
           <div key={i} className="h-40 bg-gray-300 dark:bg-gray-700 rounded-xl w-full"></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;