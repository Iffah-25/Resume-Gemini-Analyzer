
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex space-x-2 justify-center items-center" aria-label="Loading animation">
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
      <div className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
      <div className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce"></div>
    </div>
  );
};
