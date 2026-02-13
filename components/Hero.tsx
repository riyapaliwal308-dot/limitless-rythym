
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[560px] w-full overflow-hidden">
      {/* High-impact Academy Image */}
      <img 
        className="w-full h-full object-cover" 
        src="https://i.ibb.co/pBtSQyC1/download.jpg" 
        alt="Limitless Rythymm Performance"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2070&auto=format&fit=crop';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Brand Mark with Monogram Logo - Fixed Filter */}
      <div 
        onClick={() => window.openLogoModal && window.openLogoModal()}
        className="absolute top-8 left-6 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl z-20 shadow-2xl cursor-pointer hover:bg-black/80 hover:scale-105 active:scale-95 transition-all group"
      >
         <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="https://i.ibb.co/mFtRR255/LR-Monogram-Logo.png" 
              className="w-full h-full object-contain" 
              alt="LR Logo" 
            />
         </div>
         <span className="text-[11px] font-black uppercase tracking-[0.3em] group-hover:text-primary transition-colors text-white">Limitless</span>
      </div>

      <div className="absolute bottom-0 left-0 p-8 w-full z-10">
        <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#4169E1]"></span>
            <span className="white text-[10px] font-black tracking-[0.2em] uppercase text-white">Admissions Open • Season 04</span>
        </div>
        <h1 
          onClick={() => window.openLogoModal && window.openLogoModal()}
          className="text-5xl font-black leading-[0.9] tracking-tighter text-white drop-shadow-2xl cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="hover:text-primary transition-colors">LIMITLESS</span><br/><span className="text-primary italic">RYTHYMM</span> ACADEMY
        </h1>
        <p className="text-slate-200 mt-5 text-sm max-w-[90%] leading-relaxed font-semibold drop-shadow-lg">
          Master the rhythm where East meets West. The premier destination for Bollywood Fusion and Urban Street Dance.
        </p>
        <div className="flex gap-4 mt-10">
          <button 
            onClick={() => navigate('/register')}
            className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(65,105,225,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            Join the Pulse
          </button>
          <button 
            onClick={() => navigate('/classes')}
            className="flex-1 bg-white/10 backdrop-blur-xl border border-white/10 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
          >
            Our Styles
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
