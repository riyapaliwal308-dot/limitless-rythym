
import React from 'react';
import { Show } from '../types';

const UPCOMING_SHOWS: Show[] = [
  {
    id: '1',
    title: 'Modern Echoes',
    category: 'Experimental Contemporary Ensemble',
    dates: 'DEC 12-15',
    priceFrom: 45,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdTjkel5Lj8zPbn5IWIhkuvVYd3UtM86uCp7S87CMnr6D3zxa2vS_rn2nvqlfNy8cuKsmLQfdfGRT5pxIJY5fu06qFdxbDGMoHPPayiYwARQmBJ3WDXwmfcGMms23AdoBIA7mUtMKxC_6F4maJBqr3t8ezrHFMFMVf49Z9q_1wRztYO4e8cLiyfCRCpUsEjTJ7uovK6FfBieHEdpIi-jXT0cSy_mp6cHNDXtdkZFVXk4x6d8fdnvxKzRKwTLG5lyF8UmCgx4t2ftyw'
  },
  {
    id: '3',
    title: 'Bollywood Blast',
    category: 'High-Energy Fusion Night',
    dates: 'JAN 05-08',
    priceFrom: 35,
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop'
  }
];

const ShowsSection: React.FC = () => {
  return (
    <section className="mt-8 px-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Live Battles & Shows</h2>
          <p className="text-xs text-slate-400">Experience the energy live</p>
        </div>
        <button className="text-primary text-xs font-bold uppercase tracking-wider">See All</button>
      </div>
      <div className="flex overflow-x-auto gap-4 hide-scrollbar snap-x snap-mandatory -mx-6 px-6 pb-2">
        {UPCOMING_SHOWS.map((show) => (
          <div key={show.id} className="min-w-[260px] snap-start bg-primary/5 rounded-2xl overflow-hidden border border-white/5">
            <div className="h-40 relative">
              <img className="w-full h-full object-cover" src={show.imageUrl} alt={show.title} />
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                {show.dates}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-base">{show.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{show.category}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-bold text-primary">From ${show.priceFrom}</span>
                <button className="material-icons-round bg-primary/20 text-primary p-1.5 rounded-lg text-lg active:scale-90 transition-transform">
                  arrow_forward
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
