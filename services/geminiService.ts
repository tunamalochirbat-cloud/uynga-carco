import { GoogleGenAI } from "@google/genai";

/**
 * Safely retrieves the API key from the environment.
 * The SDK expects process.env.API_KEY to be present.
 */
const getApiKey = () => {
  try {
    // Priority 1: standard process.env (Node/Vite)
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    // Priority 2: window.process shim (Browser fallback)
    if (typeof window !== 'undefined' && (window as any).process?.env?.API_KEY) {
      return (window as any).process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Error accessing API key from process.env", e);
  }
  return "";
};

export const getLogisticsAdvice = async (userPrompt: string) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error("Gemini API Error: API Key is missing. Ensure process.env.API_KEY is configured.");
    return "Системийн тохиргоо дутуу байна (API Key олдсонгүй).";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the MyCargo Pro AI Assistant. 
        You provide world-class logistics expertise for international shipping, focusing on routes involving Mongolia, China, Europe, and the USA.
        Current time: ${new Date().toLocaleString()}.
        Be helpful, fast, and professional. Respond in Mongolian unless asked otherwise.`,
        temperature: 0.7,
      },
    });

    return response.text || "Уучлаарай, хариулт ирсэнгүй.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Handle specific API errors gracefully
    if (error.message?.includes("API_KEY_INVALID") || error.status === 403) {
      return "Уучлаарай, API түлхүүр хүчингүй байна эсвэл эрх хүрэлцэхгүй байна.";
    }
    
    if (error.status === 429) {
      return "Хэт олон хүсэлт илгээсэн байна. Та түр хүлээгээд дахин оролдоно уу.";
    }

    return "Холболтын алдаа гарлаа. Та интернэт холболтоо шалгаад дахин оролдоно уу.";
  }
};