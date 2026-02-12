
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[520px] w-full">
      <img 
        className="w-full h-full object-cover" 
        src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop" 
        alt="Urban Dance"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-widest uppercase rounded-full">New Season</span>
        <h1 className="text-4xl font-extrabold mt-3 leading-tight tracking-tight">
          The Rhythm<br/>Rebellion: <span className="text-primary">Urban Pulse</span>
        </h1>
        <p className="text-slate-300 mt-2 text-sm max-w-[80%] leading-relaxed font-light">
          Unleash your potential with our intensive street style workshops this winter.
        </p>
        <div className="flex gap-3 mt-6">
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95 transition-transform">
            Book Workshops
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform">
            Explore Styles
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
