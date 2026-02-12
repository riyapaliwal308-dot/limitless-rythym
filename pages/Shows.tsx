
import React from 'react';

const Shows: React.FC = () => {
  return (
    <div className="px-6 pt-4 animate-in slide-in-from-right duration-300">
      <h1 className="text-3xl font-extrabold mb-2">Performances</h1>
      <p className="text-slate-400 text-sm mb-6">The magic of dance, live on stage.</p>

      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search shows or artists..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
        />
        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
      </div>

      <div className="space-y-6">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
          <img 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop" 
            alt="The Urban Pulse" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Selling Fast</span>
            <h2 className="text-2xl font-extrabold text-white">The Rhythm Rebellion: Urban Pulse</h2>
            <p className="text-slate-300 text-xs mt-1">December 1 - 24, 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-dark border border-white/5">
            <h3 className="font-bold text-sm mb-1">Bollywood Blast</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Fusion Extravaganza</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-primary">Jan 05-08</span>
              <button className="material-icons-round text-primary text-lg">arrow_forward</button>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-surface-dark border border-white/5">
            <h3 className="font-bold text-sm mb-1">Modern Echoes</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Contemporary</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-primary">Dec 12-15</span>
              <button className="material-icons-round text-primary text-lg">arrow_forward</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shows;
