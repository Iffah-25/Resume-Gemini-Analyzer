
import React, { useState, useEffect } from 'react';
import { AnimatedSection } from './AnimatedSection';

const features = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-4.188 11.955 11.955 0 019 4.188z" /></svg>,
    title: "Privacy-First",
    description: "Your resume data is processed securely and is never stored on our servers. No sign-up needed."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    title: "ATS Score & Resume Strength",
    description: "Get a clear score that tells you how well your resume will pass automated screening."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    title: "Keyword Suggestions",
    description: "Discover crucial keywords you're missing to catch a recruiter's eye for your target role."
  }
];

const DURATION = 5000; // 5 seconds per feature

export const FeaturesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
        setProgress(p => p + 100 / (DURATION/100));
    }, 100);
    return () => clearInterval(progressInterval);
  }, [activeIndex]);

  const activeFeature = features[activeIndex];

  return (
    <AnimatedSection>
        <section className="py-20 sm:py-24">
            <div className="text-center mb-12">
                <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">Key Features</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 text-white">Why You'll Love It</h2>
                <p className="max-w-2xl mx-auto mt-2 text-slate-400">Our Resume Improver is packed with features designed to give you a competitive edge in your job search.</p>
            </div>
            
            <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl shadow-blue-900/20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/20">
                    <div className="h-1 bg-blue-500" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{activeFeature.icon}</div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">{activeFeature.title}</h3>
                        <p className="text-slate-400 mt-1">{activeFeature.description}</p>
                    </div>
                </div>
            </div>
        </section>
    </AnimatedSection>
  );
};
