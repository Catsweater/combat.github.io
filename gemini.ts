import { GoogleGenAI } from "@google/genai";
import { AnalysisResponse, DashboardData, CombatSport } from "../types";

export const getCombatAnalysis = async (query: string): Promise<AnalysisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are the 'Combat Fiend' - an expert analyst in MMA, Boxing, BJJ, and Traditional Martial Arts. Provide deep, technical analysis with a slightly aggressive but respectful tone. Always cite recent news using search grounding."
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri || "#"
      })) || [];

    return {
      text: response.text || "I'm currently unable to analyze this fight. Please try again later.",
      sources: sources
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const getCombatDashboard = async (): Promise<DashboardData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const today = new Date().toISOString().split('T')[0];

  const prompt = `
    Today is ${today}. Retrieve the following combat sports information and return it STRICTLY as a JSON block.
    
    1. A single 'featured' news story with title and excerpt.
    2. Four 'news' items (one for MMA, Boxing, Grappling, TMA each).
    3. The current top 5 MMA P4P 'rankings' (name, score out of 100, weight class).
    4. Three major 'events' coming up (event name, main fight, date).
    5. A list of 5 short 'ticker' headlines for a news ticker.

    Use this JSON structure:
    {
      "featured": {"title": "", "excerpt": "", "category": "MMA"},
      "news": [{"id": "1", "title": "", "excerpt": "", "category": "Boxing", "author": ""}],
      "rankings": [{"name": "", "score": 95, "weight": ""}],
      "events": [{"event": "", "main": "", "date": "SAT, MAR 30"}],
      "ticker": ["Headline 1", "Headline 2"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    
    const parsed = JSON.parse(jsonMatch[0]);

    // Enhance news with random images as search doesn't return them easily in this format
    const enhanceNews = (item: any, i: number) => ({
      ...item,
      id: item.id || `news-${i}`,
      imageUrl: `https://picsum.photos/seed/combat-${i}-${Date.now()}/600/400`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: item.author || "Combat Fiend Staff"
    });

    return {
      featured: {
        ...parsed.featured,
        id: 'hero',
        imageUrl: `https://picsum.photos/seed/hero-${Date.now()}/1200/800`,
        date: "JUST NOW",
        author: "Chief Editor"
      },
      news: parsed.news.map(enhanceNews),
      rankings: parsed.rankings,
      events: parsed.events,
      ticker: parsed.ticker
    };
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    // Return fallback data
    return {
      featured: { id: '1', title: "Live Intel Offline", excerpt: "Unable to reach the frontlines. Check your connection.", category: CombatSport.MMA, imageUrl: "", date: "", author: "" },
      news: [],
      rankings: [],
      events: [],
      ticker: ["CONNECTION LOST TO NEWS GRID..."]
    };
  }
};
