import { GoogleGenAI } from "@google/genai";

export type GeminiResponseData = {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    avgLogprobs: number;
  }>;
  modelVersion: string;
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: Array<{
      modality: string;
      tokenCount: number;
    }>;
    candidatesTokensDetails: Array<{
      modality: string;
      tokenCount: number;
    }>;
  };
};

const ApiGemini = new GoogleGenAI({ apiKey: process.env.API_GEMINI_KEY });

export default ApiGemini.models;
