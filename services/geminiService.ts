import { GoogleGenAI } from "@google/genai";

export const generateFunTitle = async (name: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is not set.");
      return "Office Ninja";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Generate a single, short, funny but safe-for-work corporate job title for someone named "${name}". 
    Examples: "Chief Snack Officer", "Director of Vibe Checks", "Excel Wizard". 
    Return ONLY the title string, no quotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const title = response.text?.trim() || "Team Player";
    return title;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Mysterious Employee";
  }
};