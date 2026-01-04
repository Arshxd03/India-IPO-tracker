import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-charcoal-light rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse relative overflow-hidden">
      {/* Badge Placeholder */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Title Placeholder */}
      <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 mt-1"></div>

      {/* Info Rows */}
      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>

      {/* Highlight Box */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
             <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
             <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonCard;