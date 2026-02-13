
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChoreographyPackage {
  performances: string;
  price: string;
  features: string[];
}

interface Service {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  packages: ChoreographyPackage[];
}

const Shows: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const CHOREOGRAPHY_SERVICES: Service[] = [
    {
      id: 'wedding',
      title: 'Wedding Magic',
      desc: 'Elegant, custom routines for your first dance or group performances.',
      icon: 'favorite',
      color: 'text-pink-500',
      packages: [
        { performances: '1 Performance', price: '₹5,000', features: ['Couple Dance', '1 Music Edit', '2 Hours Prep'] },
        { performances: '3 Performances', price: '₹12,000', features: ['Family Sets', 'Full Medley Edit', '6 Hours Prep'] },
        { performances: '6+ Performances', price: '₹22,000', features: ['Grand Sangeet', 'Theme Direction', '12 Hours Prep'] },
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate Energy',
      desc: 'Team building workshops and high-impact opening acts for events.',
      icon: 'business',
      color: 'text-blue-500',
      packages: [
        { performances: '1 Performance', price: '₹25,000', features: ['High Octane Opening', '6 Dancers', 'Costumes Included'] },
        { performances: '2 Performances', price: '₹45,000', features: ['Opening + Finale', '10 Dancers', 'Visual Sync'] },
        { performances: '4+ Performances', price: '₹80,000', features: ['Full Event Concept', '15+ Dancers', 'Behind Scenes'] },
      ]
    },
    {
      id: 'private',
      title: 'Elite Coaching',
      desc: 'Intensive one-on-one sessions to master specific styles or pieces.',
      icon: 'military_tech',
      color: 'text-primary',
      packages: [
        { performances: '1 Session', price: '₹1,500', features: ['Technique Focus', 'Video Critique', '60 Minutes'] },
        { performances: '5 Sessions', price: '₹7,000', features: ['Full Choreography', 'Style Immersion', 'Performance Ready'] },
        { performances: '10 Sessions', price: '₹12,000', features: ['Elite Mentorship', 'Competition Prep', 'Stage Mastery'] },
      ]
    },
    {
      id: 'flashmob',
      title: 'Flash Mobs',
      desc: 'Surprise high-octane performances designed for maximum crowd impact.',
      icon: 'groups',
      color: 'text-orange-500',
      packages: [
        { performances: '1 Location', price: '₹20,000', features: ['Surprise Concept', 'Public Permissions', 'Video Capturing'] },
        { performances: '3 Locations', price: '₹50,000', features: ['Multi-City Tour', 'Viral Editing', 'Full Crew'] },
      ]
    }
  ];

  return (
    <div className="px-6 pt-4 pb-32 animate-in slide-in-from-right duration-300">
      <h1 className="text-3xl font-extrabold mb-2">Performances</h1>
      <p className="text-slate-400 text-sm mb-6">The magic of dance, live on stage.</p>

      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="Search shows or artists..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
        />
        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
      </div>

      {/* Featured Performance */}
      <div className="mb-10">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Headline Show</h2>
        <div className="relative rounded-[40px] overflow-hidden aspect-[4/3] group shadow-2xl">
          <img 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop" 
            alt="The Urban Pulse" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-lg">Selling Fast</span>
            <h2 className="text-3xl font-black text-white leading-tight">Urban Rebel:<br/>The Underground</h2>
            <p className="text-slate-300 text-xs mt-2 font-semibold">Live at Terminal 5 • Dec 1 - 24</p>
          </div>
        </div>
      </div>

      {/* Grid Performances */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="p-5 rounded-3xl bg-surface-dark border border-white/5 active:bg-white/10 transition-colors">
          <h3 className="font-black text-sm mb-1">Bollywood Blast</h3>
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-4">Fusion Night</p>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-primary uppercase">Jan 05-08</span>
            <button className="material-icons-round text-primary text-lg">arrow_forward</button>
          </div>
        </div>
        <div className="p-5 rounded-3xl bg-surface-dark border border-white/5 active:bg-white/10 transition-colors">
          <h3 className="font-black text-sm mb-1">Modern Echoes</h3>
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-4">Contemporary</p>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-primary uppercase">Dec 12-15</span>
            <button className="material-icons-round text-primary text-lg">arrow_forward</button>
          </div>
        </div>
      </div>

      {/* Event Choreography Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
           <div className="h-px flex-1 bg-white/5"></div>
           <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] whitespace-nowrap">Event Choreography</h2>
           <div className="h-px flex-1 bg-white/5"></div>
        </div>
        
        <p className="text-center text-slate-400 text-xs font-medium mb-8 max-w-[80%] mx-auto">
          Select a service to view specialized performance packages.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {CHOREOGRAPHY_SERVICES.map((service) => (
            <div 
              key={service.id} 
              onClick={() => setSelectedService(service)}
              className="p-6 rounded-[32px] bg-gradient-to-br from-surface-dark to-black border border-white/5 flex items-center gap-5 hover:border-primary/40 active:scale-[0.98] cursor-pointer transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform shadow-inner`}>
                <span className="material-icons-round text-3xl">{service.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-black text-base tracking-tight mb-1">{service.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{service.desc}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-icons-round text-lg">chevron_right</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Package Selection Modal / Drawer */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedService(null)}
          ></div>
          <div className="relative w-full max-w-[430px] mx-auto bg-surface-dark border-t border-white/10 rounded-t-[40px] p-8 pb-12 animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center ${selectedService.color} shadow-inner`}>
                <span className="material-icons-round text-4xl">{selectedService.icon}</span>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">{selectedService.title}</h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Select Performance Pack</p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedService.packages.map((pkg, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-[32px] bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-pointer"
                  onClick={() => navigate('/register')}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-black text-white">{pkg.performances}</h4>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Premium Plan</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">{pkg.price}</span>
                      <span className="block text-[8px] text-slate-600 uppercase font-black">Base Fee</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.features.map((feat, fidx) => (
                      <span key={fidx} className="bg-white/5 px-3 py-1.5 rounded-full text-[9px] font-bold text-slate-400 border border-white/5 flex items-center gap-1.5">
                        <span className="material-icons-round text-[12px] text-primary">done</span>
                        {feat}
                      </span>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 group-active:scale-95 transition-all">
                    Book This Plan
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedService(null)}
              className="w-full mt-6 py-4 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shows;
