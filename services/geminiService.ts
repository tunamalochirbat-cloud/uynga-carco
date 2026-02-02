
import { GoogleGenAI } from "@google/genai";

export const getLogisticsAdvice = async (userPrompt: string) => {
  // Always fetch the latest key from the process environment
  const apiKey = (window as any).process?.env?.API_KEY || "";
  
  if (!apiKey) {
    console.error("Gemini API Error: API Key is missing.");
    return "Системийн тохиргоо дутуу байна (Vercel дээр API_KEY холбоно уу).";
  }

  // Proper SDK initialization
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Та бол Uyanga Shop Control-ийн ухаалаг туслах. 
        Та онлайн дэлгүүрийн захиалагч нарт ачаа тээвэр, төлбөр тооцоо, хүргэлтийн талаар маш найрсаг, тодорхой мэдээлэл өгөх ёстой.
        Одоогийн цаг: ${new Date().toLocaleString()}.
        Хариултаа үргэлж Монгол хэлээр өгнө үү. Мэдээлэл өгөхдөө цэгцтэй, ойлгомжтой байхыг хичээгээрэй.`,
        temperature: 0.7,
      },
    });

    return response.text || "Уучлаарай, системээс хариу ирсэнгүй. Та дахин оролдоно уу.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message?.includes("API_KEY_INVALID") || error.status === 403) {
      return "Уучлаарай, холболтын түлхүүр алдаатай байна. Админд хандана уу.";
    }
    
    if (error.status === 429) {
      return "Систем ачаалалтай байна. Түр хүлээгээд дахин оролдоно уу.";
    }

    return "Интернэт холболтоо шалгаад дахин оролдоно уу.";
  }
};
