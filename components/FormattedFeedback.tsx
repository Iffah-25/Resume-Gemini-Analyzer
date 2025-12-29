
import React, { useMemo, useState } from 'react';
import { CircularProgress } from './CircularProgress';

// --- UI COMPONENTS ---

const StrengthScoreCard: React.FC<{ score: number }> = ({ score }) => (
  <div className="glass-card p-6 flex flex-col items-center justify-center text-center h-full">
    <h3 className="font-semibold text-slate-300 mb-4">Resume Strength Score</h3>
    <CircularProgress score={score} />
  </div>
);

const AtsKeywordsCard: React.FC<{ friendliness: string; keywords: string[] }> = ({ friendliness, keywords }) => (
  <div className="glass-card p-6 h-full">
    <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="font-semibold text-slate-300">ATS Friendliness: {friendliness}</h3>
    </div>
    <div className="mt-4">
      <h4 className="font-semibold text-slate-400 mb-2">Missing Keywords:</h4>
      <div className="flex flex-col items-start gap-1">
        {keywords.map((keyword, i) => (
          <p key={i} className="text-red-400 font-mono text-lg tracking-tight">"{keyword}"</p>
        ))}
      </div>
    </div>
  </div>
);

const JobRoleCard: React.FC<{ role: string }> = ({ role }) => (
  <div className="glass-card glow-border p-6 flex flex-col sm:flex-row items-center justify-center text-center gap-4">
    <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-slate-700/50 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
        <div className="w-10 h-10 flex items-center justify-center bg-slate-700/50 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.122l2.454-2.454a1.5 1.5 0 012.122 0l1.414 1.414a1.5 1.5 0 002.122 0l4.242-4.242a1.5 1.5 0 012.122 0l2.455 2.455" /></svg></div>
        <div className="w-10 h-10 flex items-center justify-center bg-slate-700/50 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z M12 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 3.75z M7.5 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM12 15.75a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75-.75zM16.5 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75z" /></svg></div>
    </div>
    <div className="mt-2 sm:mt-0">
        <p className="font-semibold text-slate-300">Job Role-Based Feedback</p>
        <p className="text-sm text-slate-400">'{role}' Selected</p>
    </div>
  </div>
);

const DetailedFeedbackTabs: React.FC<{ summary: string; suggestions: { title: string, content: string }[] }> = ({ summary, suggestions }) => {
  const [activeTab, setActiveTab] = useState('summary');

  const renderTabContent = () => {
    if (activeTab === 'summary') {
      return (
        <div className="prose prose-sm max-w-none prose-slate prose-invert">
          <p>{summary}</p>
        </div>
      );
    }
    if (activeTab === 'suggestions') {
      return (
        <div className="space-y-4">
          {suggestions.map((item, i) => {
            const points = item.content
              .split('\n')
              .map(line => line.trim().replace(/^[-*]\s*/, ''))
              .filter(line => line);

            return (
              <div key={i}>
                <h4 className="font-semibold text-slate-200 mb-2">{item.title}</h4>
                <ul className="space-y-1 list-none p-0">
                  {points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      <span className="text-slate-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };
  
  const TabButton = ({ id, label }: { id: string, label: string }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === id ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'
        }`}
    >
        {label}
    </button>
  );

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-4">
        <TabButton id="summary" label="Improved Summary" />
        <TabButton id="suggestions" label="Detailed Suggestions" />
      </div>
      <div className="min-h-[200px] p-2">
        {renderTabContent()}
      </div>
    </div>
  );
};

// --- PARSING LOGIC ---

interface ParsedFeedback {
  strengthScore: number;
  atsFriendliness: string;
  missingKeywords: string[];
  improvedSummary: string;
  detailedSuggestions: { title: string; content: string }[];
}

const parseStructuredFeedback = (text: string): ParsedFeedback | null => {
  try {
    const scoreMatch = text.match(/\[START_SCORE\]([\s\S]*?)\[END_SCORE\]/);
    const keywordsMatch = text.match(/\[START_KEYWORDS\]([\s\S]*?)\[END_KEYWORDS\]/);
    const summaryMatch = text.match(/\[START_IMPROVED_SUMMARY\]([\s\S]*?)\[END_IMPROVED_SUMMARY\]/);
    const suggestionsMatch = text.match(/\[START_DETAILED_SUGGESTIONS\]([\s\S]*?)\[END_DETAILED_SUGGESTIONS\]/);
    
    if (!scoreMatch || !keywordsMatch || !summaryMatch || !suggestionsMatch) {
        console.warn("Could not find all required sections in feedback.");
        return null;
    }

    const scoreContent = scoreMatch[1];
    const scoreLine = scoreContent.match(/Strength Score.*?(\d+(\.\d+)?)/);
    const friendlinessLine = scoreContent.match(/ATS Friendliness.*?:\s*(\w+)/);
    
    const keywords = keywordsMatch[1].split(':')[1]?.split(',').map(k => k.trim()).filter(Boolean) ?? [];

    const summaryContent = summaryMatch[1].split(/:\s*\n/).slice(1).join('\n').trim();

    const suggestionsContent = suggestionsMatch[1].split(/\*\s\*\*(.*?)\*\*/).filter(Boolean);
    const suggestions = [];
    for (let i = 0; i < suggestionsContent.length; i += 2) {
      if(suggestionsContent[i] && suggestionsContent[i+1]) {
        suggestions.push({
            title: suggestionsContent[i].replace(':', '').trim(),
            content: suggestionsContent[i+1].trim()
        });
      }
    }

    return {
      strengthScore: scoreLine ? parseFloat(scoreLine[1]) : 0,
      atsFriendliness: friendlinessLine ? friendlinessLine[1] : 'N/A',
      missingKeywords: keywords,
      improvedSummary: summaryContent,
      detailedSuggestions: suggestions
    };
  } catch (error) {
    console.error("Failed to parse AI feedback:", error);
    return null;
  }
};


// --- MAIN COMPONENT ---

export const FormattedFeedback: React.FC<{ text: string; jobRole: string }> = ({ text, jobRole }) => {
  const feedback = useMemo(() => parseStructuredFeedback(text), [text]);

  if (!feedback) {
    return (
        <div className="glass-card p-6 prose prose-sm max-w-none prose-slate prose-invert whitespace-pre-wrap">
            <h3 className="font-semibold text-amber-400">Could not parse feedback structure</h3>
            <p className="text-xs text-amber-500 mb-4">Displaying raw output from the AI:</p>
            {text}
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white animate-fade-in">
        <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
        <div className="md:col-span-1">
            <StrengthScoreCard score={feedback.strengthScore} />
        </div>
        <div className="md:col-span-1">
            <AtsKeywordsCard friendliness={feedback.atsFriendliness} keywords={feedback.missingKeywords} />
        </div>
        <div className="md:col-span-2">
            <JobRoleCard role={jobRole} />
        </div>
        <div className="md:col-span-2">
            <DetailedFeedbackTabs summary={feedback.improvedSummary} suggestions={feedback.detailedSuggestions} />
        </div>
    </div>
  );
};
