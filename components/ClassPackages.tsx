
import React from 'react';

const PACKAGES = [
  {
    id: 'pack-6',
    count: 6,
    price: 2000,
    tag: 'Starter',
    color: 'bg-slate-800',
    border: 'border-white/5',
    validity: '30 Days'
  },
  {
    id: 'pack-12',
    count: 12,
    price: 3500,
    tag: 'Pro Choice',
    color: 'bg-primary/20',
    border: 'border-primary/30',
    validity: '60 Days',
    popular: true
  },
  {
    id: 'pack-24',
    count: 24,
    price: 6500,
    tag: 'Elite Value',
    color: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    validity: '90 Days'
  }
];

const ClassPackages: React.FC = () => {
  return (
    <section className="mt-8 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] whitespace-nowrap">Class Bundles</h2>
        <div className="h-px flex-1 bg-white/5"></div>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
        {PACKAGES.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`min-w-[200px] snap-center rounded-[32px] p-6 border ${pkg.border} ${pkg.color} flex flex-col relative overflow-hidden`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white text-[8px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                Popular
              </div>
            )}
            
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{pkg.tag}</span>
            <div className="flex items-baseline gap-1 mb-4">
              <h3 className="text-4xl font-black">{pkg.count}</h3>
              <span className="text-xs font-bold text-slate-500 uppercase">Classes</span>
            </div>

            <div className="mt-auto">
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Total Pack</div>
              <div className="text-2xl font-black text-white">₹{pkg.price.toLocaleString('en-IN')}</div>
              <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                <span className="material-icons-round text-sm">history</span>
                Valid: {pkg.validity}
              </div>
              
              <button className="w-full mt-5 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Select Pack
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClassPackages;
