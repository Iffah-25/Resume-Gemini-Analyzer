
import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';

interface ResumeInputProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobRole: string;
  setJobRole: (role: string) => void;
  onAnalyze: () => void;
  onDemo: () => void;
  isLoading: boolean;
  onClear: () => void;
  isClearDisabled: boolean;
}

// Icons
const AnalyzeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg> );
const UploadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg> );
const ClearIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> );
const DemoIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3.5a1.5 1.5 0 01.555.092l4.5 1.5a1.5 1.5 0 010 2.816l-4.5 1.5A1.5 1.5 0 0110 8.5v-5zM10 11.5a1.5 1.5 0 01.555.092l4.5 1.5a1.5 1.5 0 010 2.816l-4.5 1.5A1.5 1.5 0 0110 16.5v-5zM3.5 7a1.5 1.5 0 01.555.092l4.5 1.5a1.5 1.5 0 010 2.816l-4.5 1.5A1.5 1.5 0 013.5 12V7z" /></svg>);


const jobRoles = ["General", "Software Engineer", "Product Manager", "Data Scientist", "Data Analyst", "UX/UI Designer", "Marketing Manager", "Sales Representative"];

export const ResumeInput: React.FC<ResumeInputProps> = ({
  resumeText, setResumeText, jobRole, setJobRole, onAnalyze, onDemo, isLoading, onClear, isClearDisabled
}) => {
    const [isDragging, setIsDragging] = useState(false);
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
                console.error('Error parsing DOCX file:', error);
                setFileError('Could not read the file. It may be corrupted.');
            }
        };
        reader.onerror = () => { setFileError('Failed to read the file.'); };
        reader.readAsArrayBuffer(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) { processFile(e.dataTransfer.files[0]); }
    };
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { processFile(e.target.files[0]); } };
    const handleAreaClick = () => { fileInputRef.current?.click(); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
            <p className="text-sm font-medium text-slate-400 mb-2">Upload your resume file</p>
            <div onClick={handleAreaClick} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`cursor-pointer rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center transition-all duration-200 ${isDragging ? 'border-blue-500 bg-blue-900/20' : 'hover:border-slate-500'}`}>
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".docx" className="hidden" />
                <UploadIcon />
                <p className="font-semibold text-blue-400">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">DOC or DOCX files only</p>
            </div>
            {fileError && <p className="text-red-500 text-sm mt-2 text-center" role="alert">{fileError}</p>}
        </div>
        <div>
            <p className="text-sm font-medium text-slate-400 mb-2">Or paste your resume text</p>
            <textarea
                className="w-full h-full p-3 border border-slate-700 bg-slate-900 text-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-y text-sm min-h-[140px]"
                placeholder="Paste content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                disabled={isLoading}
                aria-label="Resume text input"
            />
        </div>
        <div className="lg:col-span-2">
            <label htmlFor="job-role" className="block text-sm font-medium text-slate-400 mb-2">(Optional) Select your target job role for tailored feedback</label>
            <select
                id="job-role"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                disabled={isLoading}
                className="w-full p-2.5 border border-slate-700 bg-slate-900 text-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
                {jobRoles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
        </div>
        <div className="lg:col-span-2 flex flex-col sm:flex-row items-stretch gap-3">
            <button onClick={onAnalyze} disabled={isLoading || !resumeText.trim()} className="flex-grow bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-800 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-md hover:shadow-lg disabled:shadow-none transform hover:-translate-y-0.5 disabled:transform-none">
                <AnalyzeIcon />
                {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
            </button>
            <button onClick={onDemo} disabled={isLoading} className="bg-slate-700 text-slate-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-all duration-300 disabled:bg-slate-800 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-md hover:shadow-lg disabled:shadow-none transform hover:-translate-y-0.5 disabled:transform-none">
                <DemoIcon />
                Try Demo
            </button>
            <button onClick={onClear} disabled={isLoading || isClearDisabled} className="bg-slate-800 text-slate-400 font-bold p-3 rounded-lg hover:bg-slate-700 transition-colors duration-200 disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg disabled:shadow-none transform hover:-translate-y-0.5 disabled:transform-none" aria-label="Clear input and feedback">
                <ClearIcon />
            </button>
       </div>
    </div>
  );
};
