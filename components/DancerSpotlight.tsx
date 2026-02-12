
import React from 'react';
import { Dancer } from '../types';

const DANCERS: Dancer[] = [
  { id: '2', name: 'RAMAN', role: 'Litefeet Pro', imageUrl: 'https://picsum.photos/seed/litefeet/200' },
  { id: '3', name: 'Gaurav Thukral', role: 'Bollywood Head', imageUrl: 'https://picsum.photos/seed/bollywood/200' },
  { id: '4', name: 'Lockin Larry', role: 'Locking Specialist', imageUrl: 'https://picsum.photos/seed/locking/200' },
  { id: '5', name: 'Leonel', role: 'Hip Hop Lead', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0uwmXOMC18DPNXJypthDdiA7BPNIAJKvTeegUSsZFI9BW_lRRibfVI54Jl5ywu2AmTZLaM5MUwJgXKEIxsRo8Wu3IYTs9CgAAeptngZXPaL46_-YHRLVM-6V6--RTzIuPLEOqKhXLOElRLap3C7HmX9v2NYysFVofZO46KaU_sFyg1JGwEavIArlDIcnYT2RA14Is2odrWvaHfaJbIX6Lvj40TGUwHPsnLYC-lkDPbkawwKqHRVPNUR0JyrtV6HLAV2hEqtY74XVb' },
  { id: '6', name: 'RIYA', role: 'House Queen', imageUrl: 'https://picsum.photos/seed/house/200' }
];

const DancerSpotlight: React.FC = () => {
  return (
    <section className="mt-10 px-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Style Masters</h2>
          <p className="text-xs text-slate-400">Learn from world-class innovators</p>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
        {DANCERS.map((dancer, idx) => (
          <div key={dancer.id} className="flex flex-col items-center gap-2 shrink-0">
            <div className={`w-20 h-20 rounded-full p-0.5 border-2 ${idx === 0 ? 'border-primary' : 'border-primary/20'}`}>
              <img className="w-full h-full object-cover rounded-full bg-surface-dark" src={dancer.imageUrl} alt={dancer.name} />
            </div>
            <span className="text-[11px] font-bold text-center w-20 leading-tight">{dancer.name}</span>
            <span className="text-[9px] text-slate-500 font-medium">{dancer.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DancerSpotlight;
