
import React from 'react';
import { NewsItem } from '../types';

const NEWS: NewsItem[] = [
  {
    id: '1',
    category: 'STUDIO DIARY',
    title: 'Litefeet Workshop with RAMAN',
    description: 'Inside the high-energy session that took the studio by storm last weekend.',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '2',
    category: 'ACADEMY UPDATE',
    title: 'New Contemporary Class Added',
    description: 'Registration now open for the Advanced Contemporary workshop with Elena Vance.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFprj8CXM-45fJlFQEZBmYmwy_QFe9lKq_mSNRb8pn7wNp6X9CgTbTvRDDhC6lLlHCS54xfBflbcdQILenawKEbjTB1uEFN9ynIaXGcPv4myQ2KqClPwiGG1AqvFvIHTg98HTBe0fXhm3LJmXRrvShHSUiHttgh2ICIcuSBWYSJbjCDasGClLp49quSKXqprHTSH_T9Gpwq5wN2TxInN8Skb0KxozN4YZyx7BHATS3lMOEbfAPZyCmWLf2h9xD-0TVrbaCXQ-doOKx'
  }
];

const LatestNews: React.FC = () => {
  return (
    <section className="mt-10 px-6">
      <h2 className="text-xl font-bold tracking-tight mb-4">Latest News</h2>
      <div className="space-y-4">
        {NEWS.map((item) => (
          <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 items-center active:bg-white/10 transition-colors">
            <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden">
              <img className="w-full h-full object-cover" src={item.imageUrl} alt={item.title} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-primary text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
              <h4 className="text-sm font-bold mt-1 truncate">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-snug">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
