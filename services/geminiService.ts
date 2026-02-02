
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const getLogisticsAdvice = async (userPrompt: string) => {
  if (!API_KEY) {
    return "API Key is missing. Please check your configuration.";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the MyCargo Pro AI Assistant, a world-class logistics expert. 
        You provide advice on international shipping, customs regulations (especially for Mongolia and global routes), 
        cost optimization, and cargo safety. 
        Respond in the user's language (Mongolian or English). 
        Be professional, concise, and helpful.`,
        temperature: 0.7,
      },
    });

    return response.text || "Уучлаарай, хариулт авч чадсангүй.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Системийн алдаа гарлаа. Та дараа дахин оролдоно уу.";
  }
};
