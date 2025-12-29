
import React from 'react';
import { AnimatedSection } from './AnimatedSection';

const StepCard = ({ icon, title, description, isLast }: { icon: React.ReactNode; title: string; description: string, isLast?: boolean }) => (
    <div className="flex items-start gap-6">
        <div className="relative flex flex-col items-center">
            <div className="bg-slate-800 border-2 border-slate-700 h-12 w-12 rounded-full flex items-center justify-center z-10">
                {icon}
            </div>
            {!isLast && <div className="absolute top-12 h-full w-0.5 bg-slate-700"></div>}
        </div>
        <div>
            <h3 className="font-semibold text-lg text-white">{title}</h3>
            <p className="text-slate-400 max-w-md">{description}</p>
        </div>
    </div>
);

export const HowItWorksSection: React.FC = () => {
    return (
        <AnimatedSection>
            <section className="py-20 sm:py-24">
                 <div className="text-center mb-16">
                    <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">How It Works</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 text-white">A Simple 3-Step Process</h2>
                    <p className="max-w-2xl mx-auto mt-2 text-slate-400">From resume to results in just a few clicks.</p>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-12">
                         <StepCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                            title="1. Upload or Paste Resume"
                            description="Begin by either uploading your .docx file or pasting the text directly into the analyzer. Add a target job role for tailored advice."
                        />
                         <StepCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                            title="2. Gemini AI Analyzes Content"
                            description="Our powerful AI engine reviews your resume against best practices, ATS standards, and your target job role."
                        />
                         <StepCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            title="3. Get Actionable Feedback"
                            description="Receive a detailed report with an ATS score, keyword suggestions, an improved summary, and section-wise improvement tips."
                            isLast
                        />
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
};
