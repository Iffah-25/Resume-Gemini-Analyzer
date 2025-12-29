
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
1. **Resume Strength Score**: (Provide a score out of 10. Example: 9.2/10).
2. **ATS Friendliness**: (Provide a single-word rating: Excellent, Good, Fair, or Poor).
[END_SCORE]

[START_KEYWORDS]
3. **Missing Keywords**: (Suggest 2-3 most critical, comma-separated keywords relevant to the role).
[END_KEYWORDS]

[START_IMPROVED_SUMMARY]
4. **Improved Professional Summary**:
(Rewrite the professional summary from the resume to be more impactful, concise, and tailored to the job role. If no summary exists, create one based on the resume content. Provide the summary as a single paragraph.)
[END_IMPROVED_SUMMARY]

[START_DETAILED_SUGGESTIONS]
5. **Detailed Suggestions**:
    * **Experience Section**:
        - (Provide 2-3 specific, actionable bullet points on how to improve the experience section. Focus on quantifying achievements and using the STAR method.)
    * **Skills Section**:
        - (Provide 2-3 specific, actionable bullet points on how to improve the skills section. Suggest relevant skills to add or highlight.)
    * **Formatting & Readability**:
        - (Provide 2-3 specific, actionable bullet points on improving the overall resume format for better readability and ATS compatibility.)
[END_DETAILED_SUGGESTIONS]

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
