
import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';

interface ResumeInputProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobRole: string;
  setJobRole: (role: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const UploadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> );
const LockIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg> );

const jobRoles = ["General", "Software Engineer", "Product Manager", "Data Scientist", "Data Analyst", "UX/UI Designer", "Marketing Manager", "Sales Representative"];

export const ResumeInput: React.FC<ResumeInputProps> = ({
  resumeText, setResumeText, jobRole, setJobRole, onAnalyze, isLoading
}) => {
    const [fileError, setFileError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = async (file: File) => {
        if (!file) return;
        if (!file.name.endsWith('.docx')) {
            setFileError('Invalid file type. Please upload a .docx file.');
            return;
        }
        setFileError(null);
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                if (arrayBuffer) {
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    setResumeText(result.value);
                }
            } catch (error) {
                setFileError('Could not read the file. It may be corrupted.');
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { processFile(e.target.files[0]); } };
    const handleUploadClick = () => { fileInputRef.current?.click(); };

  return (
    <div className="space-y-6">
        <textarea
            className="w-full p-4 border border-slate-700 bg-slate-900 text-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-y text-sm min-h-[250px]"
            placeholder="Paste your resume content here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            disabled={isLoading}
            aria-label="Resume text input"
        />
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <button onClick={handleUploadClick} disabled={isLoading} className="w-full flex items-center justify-center bg-slate-700/50 text-slate-300 font-semibold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300 disabled:opacity-50">
                <UploadIcon />
                DOC / DOCX Upload
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".docx" className="hidden" />

            <select
                id="job-role"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                disabled={isLoading}
                className="w-full p-3 border border-slate-700 bg-slate-900 text-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
                {jobRoles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
        </div>
         {fileError && <p className="text-red-500 text-sm -mt-2 text-center" role="alert">{fileError}</p>}
        <div className="lg:col-span-2 flex flex-col items-center gap-3">
            <button onClick={onAnalyze} disabled={isLoading || !resumeText.trim()} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-800 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-md hover:shadow-lg disabled:shadow-none transform hover:-translate-y-0.5 disabled:transform-none">
                {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
            </button>
             <p className="text-xs text-slate-500 text-center"><LockIcon /> Privacy-First Design (No Storage)</p>
       </div>
    </div>
  );
};
