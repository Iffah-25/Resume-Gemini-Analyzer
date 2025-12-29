
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelName = 'gemini-3-flash-preview';

const getPrompt = (resumeText: string, jobRole: string): string => {
  const roleContext = jobRole && jobRole !== 'General' 
    ? `The candidate is applying for a "${jobRole}" role.` 
    : 'The candidate is a student or fresher looking for a general entry-level role.';

  return `
You are a world-class professional resume reviewer and career coach with expertise in Applicant Tracking Systems (ATS).

Analyze the resume text provided below with the following context: ${roleContext}

Your feedback must be constructive, actionable, and tailored. Return the output STRICTLY in this format, using the exact headers and delimiters. Do not add any other commentary before or after the structured output.

[START_SCORE]
1. **Resume Strength Score**: (Provide a score out of 10. Example: 8/10).
2. **ATS Compatibility Score**: (Provide a percentage score for ATS compatibility. Example: 95%).
[END_SCORE]

[START_SUMMARY]
3. **Improved Professional Summary**: (Rewrite the summary to be more impactful, 3-4 lines).
[END_SUMMARY]

[START_SKILLS]
4. **Skills to Add or Improve**: (List key skills missing or needing emphasis. Use bullet points).
[END_SKILLS]

[START_KEYWORDS]
5. **ATS Keywords to Include**: (Suggest specific, comma-separated keywords relevant to the job role that are missing).
[END_KEYWORDS]

[START_SECTIONS]
6. **Section-by-Section Suggestions**:
    * **Summary**: (Critique and suggestions).
    * **Skills**: (Critique and suggestions).
    * **Experience**: (Critique and suggestions on bullet points, action verbs, and impact).
    * **Projects**: (Critique and suggestions).
    * **Education**: (Critique and suggestions).
[END_SECTIONS]

Resume Text:
---
${resumeText}
---
  `;
};

export const analyzeResume = async (resumeText: string, jobRole: string): Promise<string> => {
  try {
    const prompt = getPrompt(resumeText, jobRole);
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    if (!response.text) {
        throw new Error("Received an empty response from the AI. The content might have been blocked.");
    }
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error('The configured API key is not valid. Please check your configuration.');
        }
         throw new Error(`Failed to get feedback from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
