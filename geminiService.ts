
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "./types";

export const analyzeCV = async (cvText: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key tidak ditemukan. Pastikan environment variabel sudah terkonfigurasi.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analisis teks CV ini dan berikan feedback dalam format JSON. 
      Teks CV: ${cvText}`,
      config: {
        systemInstruction: `Anda adalah HR Manager yang gaul, modern, dan jujur. 
        Berikan penilaian CV dalam skala 0-100.
        Gunakan bahasa Indonesia yang semi-formal namun tetap ramah (seperti kakak tingkat atau mentor muda).
        Berikan 'coachAdvice' berupa 2-3 kalimat penyemangat yang unik.
        Identifikasi: 'strengths', 'weaknesses', 'suggestions', dan 'grammarCheck'.
        Output HARUS JSON valid.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            grammarCheck: { type: Type.STRING },
            coachAdvice: { type: Type.STRING },
          },
          required: ["score", "strengths", "weaknesses", "suggestions", "grammarCheck", "coachAdvice"],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Error analyzing CV:", error);
    throw error;
  }
};
