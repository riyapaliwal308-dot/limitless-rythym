
import React from 'react';
import { NewsItem } from '../types';

const NEWS: NewsItem[] = [
  {
    id: '2',
    category: 'STUDIO DIARY',
    title: 'Fusion Masterclass Sessions',
    description: 'Inside our latest intensive studio session exploring the intersection of classical and urban movement.',
    imageUrl: 'https://i.ibb.co/8nf32PTG/download-2.jpg'
  },
  {
    id: '1',
    category: 'STREET UPDATE',
    title: 'Litefeet: The FOX Alley Lab',
    description: 'Recap of the high-octane battle session held at the iconic FOX alley last weekend.',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop'
  }
];

const LatestNews: React.FC = () => {
  return (
    <section className="mt-12 px-6 mb-12">
      <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Academy Intelligence</h2>
      <div className="space-y-4">
        {NEWS.map((item) => (
          <div key={item.id} className="flex gap-5 p-4 rounded-[32px] bg-surface-dark border border-white/5 items-center active:bg-white/10 transition-all">
            <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-white/5">
              <img 
                className="w-full h-full object-cover" 
                src={item.imageUrl} 
                alt={item.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1974&auto=format&fit=crop';
                }}
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest">{item.category}</span>
              <h4 className="text-base font-black mt-1 tracking-tight leading-tight">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-medium">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
