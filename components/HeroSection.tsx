
import React from 'react';

interface HeroSectionProps {
  onGetStartedClick: () => void;
  onKeyFeaturesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStartedClick, onKeyFeaturesClick }) => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center py-24 sm:py-32 px-4 overflow-hidden">
        <div className="max-w-4xl z-10">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Build an <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-slate-200">ATS-Ready Resume</span>
            <br />
            with Gemini AI
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Instant resume feedback, keyword insights, and role-based suggestions — no sign-up required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStartedClick}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transform hover:-translate-y-1"
            >
              Analyze My Resume
            </button>
            <button
              onClick={onKeyFeaturesClick}
              className="bg-slate-800 text-slate-300 font-medium py-3 px-8 rounded-lg hover:bg-slate-700 transition-all duration-300"
            >
              Key Features
            </button>
          </div>
        </div>
    </section>
  );
};
