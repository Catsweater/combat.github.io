import React, { useState } from 'react';
import { Bot, Send, Loader2, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { getCombatAnalysis } from '../services/gemini';
import { AnalysisResponse } from '../types';

const FiendAnalysis: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const result = await getCombatAnalysis(query);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border-2 border-red-900/30 rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-red-900/10">
      <div className="bg-gradient-to-r from-red-900 to-black px-6 py-4 flex items-center gap-3">
        <Bot className="w-6 h-6 text-white" />
        <h2 className="text-xl font-bold oswald tracking-wider">FIEND ANALYSIS ENGINE</h2>
      </div>
      
      <div className="p-6">
        <p className="text-zinc-400 mb-6 italic">
          Ask for a deep breakdown of any upcoming fight, fighter record, or martial arts technique. 
          Powered by real-time web search.
        </p>

        <form onSubmit={handleAnalyze} className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Breakdown the striking patterns of Alex Pereira..."
            className="w-full bg-black border border-zinc-700 rounded-lg py-4 pl-4 pr-16 focus:outline-none focus:border-red-600 transition-colors text-zinc-100"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bg-red-600 hover:bg-red-700 p-2 rounded-md transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </form>

        {analysis && (
          <div className="bg-black/50 border border-zinc-800 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none text-zinc-300 whitespace-pre-line mb-6">
              {analysis.text}
            </div>
            
            {analysis.sources.length > 0 && (
              <div className="border-t border-zinc-800 pt-4">
                <h4 className="flex items-center gap-2 text-sm font-bold oswald text-zinc-500 mb-3 uppercase tracking-widest">
                  <LinkIcon className="w-4 h-4" /> Evidence & Citations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.sources.map((src, i) => (
                    <a 
                      key={i} 
                      href={src.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-xs px-3 py-1.5 rounded-full transition-colors text-zinc-300"
                    >
                      {src.title} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FiendAnalysis;
