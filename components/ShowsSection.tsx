
import React from 'react';
import { Show } from '../types';

const UPCOMING_SHOWS: Show[] = [
  {
    id: '3',
    title: 'Bollywood Blast',
    category: 'High-Energy Fusion Night',
    dates: 'JAN 05-08',
    priceFrom: 1499,
    imageUrl: 'https://i.ibb.co/DHVSz0R4/image.png'
  },
  {
    id: '1',
    title: 'Modern Echoes',
    category: 'Experimental Contemporary Ensemble',
    dates: 'DEC 12-15',
    priceFrom: 1999,
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1935&auto=format&fit=crop'
  }
];

const ShowsSection: React.FC = () => {
  return (
    <section className="mt-12 px-6">
      <div className="flex justify-between items-end mb-6">
        <div>
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">On Stage</h2>
            <h3 className="text-2xl font-black tracking-tight">Upcoming Premieres</h3>
        </div>
        <button className="bg-white/5 p-2 rounded-xl text-slate-400 hover:text-white transition-colors">
            <span className="material-icons-round">tune</span>
        </button>
      </div>
      <div className="flex overflow-x-auto gap-5 hide-scrollbar snap-x snap-mandatory -mx-6 px-6 pb-4">
        {UPCOMING_SHOWS.map((show) => (
          <div key={show.id} className="min-w-[280px] snap-start bg-surface-dark rounded-[32px] overflow-hidden border border-white/5 group shadow-2xl">
            <div className="h-44 relative overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                src={show.imageUrl} 
                alt={show.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2070&auto=format&fit=crop';
                }}
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                {show.dates}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-black text-lg tracking-tight leading-tight">{show.title}</h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">{show.category}</p>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-600 font-black uppercase">Admission</span>
                    <span className="text-lg font-black text-white">₹{show.priceFrom}+</span>
                </div>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-90 transition-all">
                  <span className="material-icons-round">local_activity</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowsSection;
