
import { GoogleGenAI, Type } from "@google/genai";

export const getAIRecommendation = async (userInterests: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Based on the following user interests: "${userInterests}", recommend the best dance class from Limitless Rythym. 
  Our classes include: Hip Hop, Contemporary, House, Bollywood, Litefeet, and Locking. 
  Provide the recommendation in JSON format with fields: className, reason, and difficultyLevel.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            className: { type: Type.STRING },
            reason: { type: Type.STRING },
            difficultyLevel: { type: Type.STRING },
          },
          required: ["className", "reason", "difficultyLevel"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
