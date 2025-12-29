
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { FormattedFeedback } from './FormattedFeedback';

interface FeedbackOutputProps {
  feedback: string | null;
  isLoading: boolean;
  error: string | null;
}

const InitialState = () => (
    <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-slate-400">AI Feedback Panel</h3>
        <p className="max-w-xs text-sm">Your resume analysis will appear here.</p>
    </div>
);


export const FeedbackOutput: React.FC<FeedbackOutputProps> = ({ feedback, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <div className="flex flex-col items-center justify-center h-full"><LoadingSpinner /><p className="mt-4 text-slate-400">Gemini is analyzing your resume...</p></div>;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (feedback) {
      return <FormattedFeedback text={feedback} />;
    }
    return <InitialState />;
  };

  return (
    <div className="bg-slate-900 p-1 rounded-xl shadow-lg border border-slate-800 min-h-[500px] lg:min-h-0 h-full">
        <div className="bg-slate-900/50 p-4 rounded-lg h-full">
            {renderContent()}
        </div>
    </div>
  );
};
