import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FighterRanking } from '../types';

interface RankingsProps {
  rankings?: FighterRanking[];
}

const Rankings: React.FC<RankingsProps> = ({ rankings = [] }) => {
  const month = new Date().toLocaleString('default', { month: 'short' }).toUpperCase();
  const year = new Date().getFullYear();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-12 shadow-xl">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-2xl font-black oswald tracking-tight">FIGHTER POWER INDEX</h2>
        <div className="flex items-center justify-between">
          <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">Official P4P Matrix</span>
          <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{month} {year}</span>
        </div>
      </div>
      
      {rankings.length > 0 ? (
        <>
          <div className="h-[300px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={rankings} margin={{ left: -10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#888" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #ef4444', borderRadius: '4px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="score" radius={[0, 2, 2, 0]} barSize={16}>
                  {rankings.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#dc2626' : '#3f3f46'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {rankings.map((fighter, i) => (
              <div key={i} className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-zinc-800/50 hover:border-red-600/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-red-600 font-black oswald italic text-sm">#{i + 1}</span>
                  <div>
                    <p className="oswald font-bold text-sm tracking-tight group-hover:text-red-500 transition-colors">{fighter.name}</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{fighter.weight}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="oswald font-black text-lg">{fighter.score}</span>
                  <span className="text-[8px] text-zinc-600 block leading-none font-bold">RATING</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="py-12 text-center text-zinc-600 oswald uppercase text-xs tracking-widest">
          Recalibrating power index...
        </div>
      )}
    </div>
  );
};

export default Rankings;
