
import React, { useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TrustAndPrivacySection } from './components/TrustAndPrivacySection';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const analyzerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const handleScrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const handleScrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-300 bg-[#24242c]">
      <HeroSection 
        onGetStartedClick={handleScrollToAnalyzer} 
        onKeyFeaturesClick={handleScrollToFeatures} 
      />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={featuresRef} className="pt-20 -mt-20">
          <FeaturesSection />
        </div>
        <HowItWorksSection />
        <div ref={analyzerRef} className="pt-20 -mt-20">
            <ResumeAnalyzer />
        </div>
        <TrustAndPrivacySection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
