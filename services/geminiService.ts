
import { GoogleGenAI, Type } from "@google/genai";

const ACADEMY_CONTEXT = `
You are the Limitless Rythymm (LR) AI Assistant. 

CONVERSATIONAL FLOWS:

1. CLASS INQUIRIES:
   - Ask for style: Western or Bollywood?
   - Share Faculty for the style: 
     * Western: RAMAN (Litefeet), Leonel (Hip Hop), RIYA (House), Lockin Larry (Locking), Elena Vance (Contemporary).
     * Bollywood: Gaurav Thukral (Fusion).
   - Share Class Packages: 6 for ₹2,000 | 12 for ₹3,500 | 24 for ₹6,500.

2. SHOW & CHOREOGRAPHY PACKAGES:
   - When asked about "Show Packages", "Choreography", or specific events:
   - Provide pricing based on performances:
     * Wedding Magic: ₹5,000 (1 perf) | ₹12,000 (3 perf) | ₹22,000 (6+ perf).
     * Corporate Energy: ₹25,000 (1 perf) | ₹45,000 (2 perf) | ₹80,000 (4+ perf).
     * Elite Coaching: ₹7,000 (5 sessions) | ₹12,000 (10 sessions).
     * Flashmobs: ₹20,000 (1 loc) | ₹50,000 (3 loc).
   - CALL TO ACTION: Always end by telling them to fill the "Join the Pulse" registration form to book.

TONE & CONSTRAINTS: 
- Be energetic and professional.
- CRITICAL: Keep answers EXTREMELY BRIEF (max 2 short sentences).
- Do not dump all info. Answer the specific question asked.
`;

export const getAIRecommendation = async (userInterests: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Based on: "${userInterests}", recommend a class. 
  JSON format: {className, reason, difficultyLevel}. Concise reason.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: ACADEMY_CONTEXT,
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

export const sendChatMessage = async (history: {role: 'user' | 'model', parts: {text: string}[]}[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: ACADEMY_CONTEXT,
        temperature: 0.7,
      }
    });

    return response.text || "I didn't quite catch that. Could you say it again?";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Our rhythmic pulse is temporarily offline. Please check back later.";
  }
};
