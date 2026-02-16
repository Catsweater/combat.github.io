import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Rankings from './components/Rankings';
import FiendAnalysis from './components/FiendAnalysis';
import { DashboardData } from './types';
import { getCombatDashboard } from './services/gemini';
import { Share2, MessageCircle, Heart, ChevronRight, User, Flame, Radio, ExternalLink, Loader2, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboard = await getCombatDashboard();
        setData(dashboard);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-600 selection:text-white">
      {/* Ticker Bar */}
      <div className="bg-red-600 overflow-hidden h-8 flex items-center">
        <div className="flex items-center gap-4 bg-black px-4 h-full relative z-10 skew-x-[-20deg] -ml-2">
          <Zap className="w-4 h-4 text-red-600 fill-red-600 animate-pulse skew-x-[20deg]" />
          <span className="oswald font-black text-sm italic tracking-widest skew-x-[20deg]">BREAKING</span>
        </div>
        <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] flex gap-12 items-center">
          {(data?.ticker || ["FETCHING GLOBAL COMBAT INTEL...", "STAND BY FOR REAL-TIME UPDATES..."]).map((t, i) => (
            <span key={i} className="oswald font-bold text-xs tracking-widest uppercase">
              {t} <span className="mx-4 text-black opacity-30">/</span>
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {(data?.ticker || []).map((t, i) => (
            <span key={`dup-${i}`} className="oswald font-bold text-xs tracking-widest uppercase">
              {t} <span className="mx-4 text-black opacity-30">/</span>
            </span>
          ))}
        </div>
      </div>

      <Navbar />
      
      <main className="flex-grow pt-4">
        {loading ? (
          <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin"></div>
              <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-red-600 fill-red-600 animate-pulse" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black oswald italic tracking-tighter mb-2">SYNCING WITH THE OCTAGON</h2>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">Awaiting real-time battlefield data</p>
            </div>
          </div>
        ) : (
          <>
            <Hero story={data?.featured} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* News Feed */}
                <div className="lg:col-span-2 space-y-12">
                  
                  <section>
                    <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-8 bg-red-600 rounded-sm"></div>
                        <h2 className="text-4xl font-black oswald tracking-tighter italic">BATTLEFIELD INTEL</h2>
                      </div>
                      <div className="hidden sm:flex gap-6 text-[11px] font-black oswald text-zinc-500 uppercase tracking-widest">
                        <button className="text-red-600 border-b-2 border-red-600 pb-4 -mb-[17px]">ALL STORIES</button>
                        <button className="hover:text-white transition-colors pb-4">MMA</button>
                        <button className="hover:text-white transition-colors pb-4">BOXING</button>
                        <button className="hover:text-white transition-colors pb-4">GRAPPLING</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                      {data?.news.map((news) => (
                        <article key={news.id} className="group cursor-pointer">
                          <div className="relative overflow-hidden rounded-xl mb-5 aspect-[16/10] border border-zinc-800 shadow-lg">
                            <img 
                              src={news.imageUrl} 
                              alt={news.title}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase oswald tracking-widest shadow-lg">
                                {news.category}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-black mb-3 group-hover:text-red-500 transition-colors oswald leading-tight italic tracking-tight">
                            {news.title}
                          </h3>
                          <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                            {news.excerpt}
                          </p>
                          <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                                <User className="w-3 h-3 text-red-600" />
                              </div>
                              {news.author}
                            </div>
                            <div className="flex items-center gap-4 text-zinc-500">
                              <button className="flex items-center gap-1 hover:text-red-500 transition-colors text-[10px] font-black oswald"><Heart className="w-4 h-4" /> 241</button>
                              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors text-[10px] font-black oswald"><MessageCircle className="w-4 h-4" /> 18</button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    <button className="w-full mt-16 py-6 border border-zinc-800 rounded-xl font-black oswald hover:bg-zinc-800/50 hover:border-red-600 transition-all flex items-center justify-center gap-3 tracking-[0.3em] text-xs group">
                      RELOAD RECON DATA <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </section>

                  <FiendAnalysis />
                </div>

                {/* Sidebar */}
                <aside className="space-y-12">
                  <Rankings rankings={data?.rankings} />

                  <div className="bg-black border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Radio className="w-24 h-24 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-black oswald border-b border-zinc-800 pb-4 mb-8 tracking-tight italic">UPCOMING WARFARE</h3>
                    <div className="space-y-8">
                      {data?.events.map((evt, i) => (
                        <div key={i} className="flex gap-5 group cursor-pointer">
                          <div className="flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:border-red-600 transition-colors w-14 h-14 rounded-xl font-black oswald leading-none">
                            <span className="text-[10px] text-red-600 uppercase mb-1">{evt.date.split(',')[0]}</span>
                            <span className="text-lg">{evt.date.split(' ')[2]}</span>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <p className="text-red-500 text-[9px] font-black tracking-[0.2em] uppercase mb-1">{evt.event}</p>
                            <p className="font-bold oswald text-sm tracking-tight group-hover:text-white transition-colors">{evt.main}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-600 to-red-900 p-8 rounded-2xl relative overflow-hidden group shadow-2xl">
                    <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                      <Flame className="w-64 h-64 text-white fill-white" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-4xl font-black oswald leading-none mb-4 italic tracking-tighter">JOIN THE TRIBE</h3>
                      <p className="text-white/90 font-bold uppercase tracking-widest text-[10px] mb-8">Raw Fight Analysis & Intel Drop Weekly</p>
                      <input type="email" placeholder="FIGHTER EMAIL" className="w-full bg-black/20 border border-white/20 rounded-xl px-5 py-4 placeholder:text-white/40 mb-4 outline-none focus:bg-black/30 transition-all font-bold text-sm" />
                      <button className="w-full bg-white text-black font-black oswald py-4 rounded-xl hover:bg-black hover:text-white transition-all tracking-[0.2em] text-sm">ENLIST NOW</button>
                    </div>
                  </div>
                </aside>

              </div>
            </div>
          </>
        )}
      </main>

      <footer className="bg-[#050505] border-t border-zinc-900 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-red-600 p-3 rounded-xl shadow-lg shadow-red-900/20">
                <Flame className="w-8 h-8 text-white fill-white" />
              </div>
              <span className="text-4xl font-black tracking-tighter oswald italic uppercase">
                COMBAT <span className="text-red-600">FIEND</span>
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xs font-black oswald text-zinc-500 tracking-[0.3em] uppercase">
              <a href="#" className="hover:text-red-600 transition-colors">News</a>
              <a href="#" className="hover:text-red-600 transition-colors">Training</a>
              <a href="#" className="hover:text-red-600 transition-colors">Culture</a>
              <a href="#" className="hover:text-red-600 transition-colors">Merch</a>
              <a href="#" className="hover:text-red-600 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-600 text-[9px] font-black tracking-[0.3em] uppercase">© 2024 COMBATFIEND.COM / DIGITAL WARFARE NETWORK</p>
            <div className="flex gap-8">
              <Share2 className="w-5 h-5 text-zinc-700 hover:text-red-600 cursor-pointer" />
              <MessageCircle className="w-5 h-5 text-zinc-700 hover:text-red-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default App;
