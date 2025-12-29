
import React, { useState, useCallback } from 'react';
import { ResumeInput } from './ResumeInput';
import { FeedbackOutput } from './FeedbackOutput';
import { analyzeResume } from '../services/geminiService';

const DEMO_RESUME_TEXT = `
John Doe
Software Engineer
john.doe@email.com | (123) 456-7890 | linkedin.com/in/johndoe

Professional Summary
Highly motivated Software Engineer with 3+ years of experience in developing, testing, and maintaining web applications. Proficient in JavaScript, React, and Node.js. Seeking to leverage my skills to contribute to a dynamic engineering team.

Skills
- Languages: JavaScript (ES6+), Python, HTML5, CSS3
- Frameworks/Libraries: React, Node.js, Express.js
- Databases: MongoDB, PostgreSQL
- Tools: Git, Docker, Webpack, Jest

Experience
Tech Solutions Inc. - Software Engineer | June 2021 - Present
- Developed and maintained front-end features for a client-facing dashboard using React, resulting in a 20% increase in user engagement.
- Collaborated with a team of 5 engineers to build a RESTful API with Node.js and Express.js, serving over 100,000 requests per day.

Education
State University - B.S. in Computer Science | 2017 - 2021
`;

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

  const handleClear = useCallback(() => {
    setResumeText('');
    setFeedback(null);
    setError(null);
    setJobRole('General');
  }, []);
  
  const handleDemo = useCallback(() => {
    setResumeText(DEMO_RESUME_TEXT);
    setJobRole('Software Engineer');
    setFeedback(null);
    setError(null);
  }, []);

  const isClearDisabled = !resumeText.trim() && !feedback && !error;

  return (
    <section className="py-20 sm:py-24">
        <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-6 shadow-2xl shadow-blue-900/20">
            <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                <h2 className="text-2xl font-bold text-white">Resume Analyzer</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:col-span-2">
                    <ResumeInput
                        resumeText={resumeText}
                        setResumeText={setResumeText}
                        jobRole={jobRole}
                        setJobRole={setJobRole}
                        onAnalyze={handleAnalyze}
                        onDemo={handleDemo}
                        isLoading={isLoading}
                        onClear={handleClear}
                        isClearDisabled={isClearDisabled}
                    />
                </div>
                <div className="lg:col-span-2">
                    <FeedbackOutput
                        feedback={feedback}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    </section>
  );
};
