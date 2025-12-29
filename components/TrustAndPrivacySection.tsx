
import React from 'react';
import { AnimatedSection } from './AnimatedSection';

const TrustCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <p className="text-sm text-slate-400">{description}</p>
    </div>
);


export const TrustAndPrivacySection: React.FC = () => {
    const checkmarkIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
    const lockIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

    
    return (
        <AnimatedSection>
            <section className="py-20 sm:py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Trust & Privacy-First</h2>
                    <p className="max-w-2xl mx-auto mt-2 text-slate-400">Your career data is sensitive. We're committed to protecting it.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TrustCard 
                        icon={checkmarkIcon}
                        title="No Login Required"
                        description="No account creation or login needed. Start analyzing your resume instantly."
                    />
                     <TrustCard 
                        icon={lockIcon}
                        title="Never Stored on Servers"
                        description="Your resume data is processed on-the-fly and is never saved or stored."
                    />
                     <TrustCard 
                        icon={checkmarkIcon}
                        title="Secure Processing"
                        description="All analysis is handled securely using Google's Gemini AI infrastructure."
                    />
                </div>
            </section>
        </AnimatedSection>
    );
};
