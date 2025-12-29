
import React, { useState, useCallback } from 'react';
import { ResumeInput } from './ResumeInput';
import { FeedbackOutput } from './FeedbackOutput';
import { analyzeResume } from '../services/geminiService';

export const ResumeAnalyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobRole, setJobRole] = useState<string>('Software Engineer');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!resumeText.trim()) {
      setError('Please provide resume content before analyzing.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const result = await analyzeResume(resumeText, jobRole);
      setFeedback(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`An error occurred: ${err.message}. Please try again.`);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [resumeText, jobRole]);

  return (
    <section className="py-20 sm:py-24">
        <div className="glass-card p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Your Resume</h2>
                    <ResumeInput
                        resumeText={resumeText}
                        setResumeText={setResumeText}
                        jobRole={jobRole}
                        setJobRole={setJobRole}
                        onAnalyze={handleAnalyze}
                        isLoading={isLoading}
                    />
                </div>
                <div>
                     <h2 className="text-2xl font-bold text-white mb-4">AI-Powered Feedback</h2>
                    <FeedbackOutput
                        feedback={feedback}
                        isLoading={isLoading}
                        error={error}
                        jobRole={jobRole}
                    />
                </div>
            </div>
        </div>
    </section>
  );
};
