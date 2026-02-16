import React from 'react';
import { Clock } from 'lucide-react';
import { NewsItem } from '../types';

interface HeroProps {
  story?: NewsItem;
}

const Hero: React.FC<HeroProps> = ({ story }) => {
  if (!story) return null;

  return (
    <div className="relative w-full overflow-hidden mb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="relative group overflow-hidden rounded-2xl h-[500px] md:h-[600px] border border-zinc-800 shadow-2xl">
          <img 
            src={story.imageUrl} 
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 news-gradient pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-black uppercase tracking-widest rounded-sm oswald">
                {story.category}
              </span>
              <span className="flex items-center gap-1 text-zinc-300 text-xs font-bold oswald tracking-widest">
                <Clock className="w-4 h-4 text-red-500" /> {story.date}
              </span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black mb-4 leading-none oswald italic tracking-tighter max-w-4xl">
              {story.title}
            </h1>
            <p className="text-zinc-300 text-base md:text-xl mb-8 max-w-2xl line-clamp-2 font-medium">
              {story.excerpt}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black hover:bg-red-600 hover:text-white transition-all px-10 py-4 font-black oswald text-lg tracking-widest">
                READ INTEL
              </button>
              <button className="border-2 border-white/20 hover:border-red-600 text-white transition-all px-10 py-4 font-black oswald text-lg tracking-widest backdrop-blur-md">
                WATCH RECAP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
