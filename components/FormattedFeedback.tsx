
import React, { useState, useMemo } from 'react';

// --- HELPER COMPONENTS ---

const ScoreCard = ({ title, score, scoreClass }: { title: string, score: string, scoreClass: string }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center flex flex-col justify-center items-center">
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className={`text-4xl font-bold my-1 ${scoreClass}`}>{score}</p>
    </div>
);

const FeedbackCard = ({ title, content }: { title: string; content: string }) => (
    <div className="prose prose-sm max-w-none prose-slate prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
);

const Pill: React.FC<{ text: string }> = ({ text }) => (
  <span className="bg-blue-900/50 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">{text}</span>
);

const sectionIcons: { [key: string]: React.ReactNode } = {
  summary: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
  skills: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.75 3.75 0 00-5.304-5.304L5.17 11.42M11.42 15.17l-2.472 2.472a3.75 3.75 0 01-5.304-5.304L11.42 5.17" />,
  experience: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.001c0 .621.504 1.125 1.125 1.125z" />,
  projects: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />,
  education: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-1.07-1.07a50.57 50.57 0 013.728-3.728L7.16 8.84a50.57 50.57 0 01-2.9 1.307" />,
  default: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
};

const SectionIcon: React.FC<{ title: string }> = ({ title }) => {
  const normalizedTitle = title.toLowerCase();
  let key = 'default';
  if (normalizedTitle.includes('summary')) key = 'summary';
  else if (normalizedTitle.includes('skills')) key = 'skills';
  else if (normalizedTitle.includes('experience')) key = 'experience';
  else if (normalizedTitle.includes('projects')) key = 'projects';
  else if (normalizedTitle.includes('education')) key = 'education';
  
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {sectionIcons[key]}
        </svg>
    </div>
  );
};

const AccordionItem: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`bg-slate-800/40 rounded-lg mb-2 border border-slate-700/50 transition-all duration-300 ${isOpen ? 'bg-slate-800/80' : 'hover:bg-slate-800/60'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-4 p-4 text-left">
        <SectionIcon title={title} />
        <span className="flex-grow font-semibold text-slate-200">{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
            <div className="border-t border-slate-700 pt-4">
                 <div className="prose prose-sm max-w-none prose-slate prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
      )}
    </div>
  );
};


// --- PARSING LOGIC ---

interface ParsedFeedback {
  strengthScore: string;
  atsScore: string;
  improvedSummary: string;
  skills: string[];
  keywords: string[];
  sections: { title: string; content: string }[];
}

const parseStructuredFeedback = (text: string): ParsedFeedback | null => {
  try {
    const scoreMatch = text.match(/\[START_SCORE\]([\s\S]*?)\[END_SCORE\]/);
    const summaryMatch = text.match(/\[START_SUMMARY\]([\s\S]*?)\[END_SUMMARY\]/);
    const skillsMatch = text.match(/\[START_SKILLS\]([\s\S]*?)\[END_SKILLS\]/);
    const keywordsMatch = text.match(/\[START_KEYWORDS\]([\s\S]*?)\[END_KEYWORDS\]/);
    const sectionsMatch = text.match(/\[START_SECTIONS\]([\s\S]*?)\[END_SECTIONS\]/);

    if (!scoreMatch || !summaryMatch || !skillsMatch || !keywordsMatch || !sectionsMatch) {
      console.warn("Response format incorrect, falling back.");
      return null;
    }

    const scoreContent = scoreMatch[1];
    const strengthScoreMatch = scoreContent.match(/Strength Score.*?(\d+(\.\d+)?\s*\/\s*10)/);
    const atsScoreMatch = scoreContent.match(/ATS Compatibility Score.*?(\d+%?)/);

    const skillsList = skillsMatch[1].split('\n').map(s => s.replace(/[-*]\s*/, '').trim()).filter(Boolean).slice(1);
    const keywordsList = keywordsMatch[1].split(':')[1]?.split(',').map(k => k.trim()).filter(Boolean) ?? [];

    const sectionsContent = sectionsMatch[1].split(/\*\s\*\*(.*?)\*\*/).filter(Boolean);
    const sectionPairs = [];
    for (let i = 0; i < sectionsContent.length; i += 2) {
      if(sectionsContent[i] && sectionsContent[i+1]) {
        sectionPairs.push({
            title: sectionsContent[i].replace(':', '').trim(),
            content: sectionsContent[i+1].replace(':', '').trim()
        });
      }
    }
    
    return {
      strengthScore: strengthScoreMatch ? strengthScoreMatch[1].replace(/\s/g, '') : 'N/A',
      atsScore: atsScoreMatch ? atsScoreMatch[1].replace(/\s/g, '') : 'N/A',
      improvedSummary: summaryMatch[1].split(/:\s*\n/).slice(1).join('\n').trim(),
      skills: skillsList,
      keywords: keywordsList,
      sections: sectionPairs
    };
  } catch (error) {
    console.error("Failed to parse AI feedback:", error);
    return null; // Indicates parsing failure
  }
};

const formatContent = (content: string): string => {
    // 1. Handle bold text first
    let html = content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');

    // 2. Process lines for paragraphs and lists
    const lines = html.split('\n').filter(line => line.trim() !== '');
    
    let resultHtml = '';
    let inList = false;

    for (const line of lines) {
        const trimmedLine = line.trim();
        const isListItem = trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ');
        
        if (isListItem) {
            // If we are not in a list, start one
            if (!inList) {
                resultHtml += '<ul>';
                inList = true;
            }
            // Add the list item, removing the bullet
            resultHtml += `<li>${trimmedLine.substring(2)}</li>`;
        } else {
            // If we were in a list, close it
            if (inList) {
                resultHtml += '</ul>';
                inList = false;
            }
            // Add the line as a paragraph
            resultHtml += `<p>${line}</p>`;
        }
    }

    // 3. Close any open list at the end
    if (inList) {
        resultHtml += '</ul>';
    }

    return resultHtml;
};

// --- MAIN COMPONENT ---

export const FormattedFeedback: React.FC<{ text: string }> = ({ text }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const feedback = useMemo(() => parseStructuredFeedback(text), [text]);

  if (!feedback) {
    // Render the raw text if parsing fails, ensuring user always sees the result.
    return (
        <div className="prose prose-sm max-w-none prose-slate prose-invert whitespace-pre-wrap">
            <h3 className="font-semibold text-amber-400">Could not parse feedback structure</h3>
            <p className="text-xs text-amber-500 mb-4">Displaying raw output from the AI:</p>
            {text}
        </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return <FeedbackCard title="Improved Professional Summary" content={formatContent(feedback.improvedSummary)} />;
      case 'skills':
        return (
          <div>
            <h4 className="font-semibold text-slate-200 mb-3">Skills to Add or Improve</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {feedback.skills.map((skill, i) => <Pill key={i} text={skill} />)}
            </div>
            <h4 className="font-semibold text-slate-200 mb-3">ATS Keywords to Include</h4>
            <div className="flex flex-wrap gap-2">
              {feedback.keywords.map((keyword, i) => <Pill key={i} text={keyword} />)}
            </div>
          </div>
        );
      case 'analysis':
        return (
          <div>
            {feedback.sections.map((sec, i) => (
              <AccordionItem key={i} title={sec.title} content={formatContent(sec.content)} />
            ))}
          </div>
        );
      default:
        return null;
    }
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
    <div className="space-y-4 text-sm text-slate-300">
      <div className="grid grid-cols-2 gap-4">
        <ScoreCard title="Resume Strength" score={feedback.strengthScore} scoreClass="text-blue-400" />
        <ScoreCard title="ATS Score" score={feedback.atsScore} scoreClass="text-green-400" />
      </div>
      
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-1">
        <div className="flex items-center gap-2 p-2 border-b border-slate-700">
            <TabButton id="summary" label="Improved Summary" />
            <TabButton id="skills" label="Skills & Keywords" />
            <TabButton id="analysis" label="Sectional Analysis" />
        </div>
        <div className="p-4 min-h-[200px]">
            {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
