
import React, { useState } from 'react';

type ViewState = 'main' | 'pass' | 'qr' | 'billing';

const Profile: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('main');

  const renderPassDetails = () => (
    <div className="animate-in slide-in-from-right duration-500 px-6 pt-4">
      <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-slate-500 mb-8 font-black text-[10px] uppercase tracking-widest">
        <span className="material-icons-round text-sm">arrow_back</span> Back to Profile
      </button>
      
      <div className="p-8 rounded-[40px] bg-gradient-to-br from-primary to-indigo-900 shadow-2xl shadow-primary/30 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-black tracking-tight">LR Unlimited</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Platinum Membership</p>
          </div>
          <span className="material-icons-round text-3xl">verified</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Status</p>
              <p className="text-sm font-bold">Active • Auto-Renew</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Valid Until</p>
              <p className="text-sm font-bold">Dec 31, 2024</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-1">Member Benefits</h3>
      <div className="space-y-3">
        {['Unlimited Academy Classes', 'Priority Show Bookings', '15% Off Studio Merch', 'Exclusive Masterclass Access'].map((benefit, i) => (
          <div key={i} className="p-5 rounded-3xl bg-surface-dark border border-white/5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-icons-round text-sm">done</span>
            </div>
            <span className="text-sm font-bold text-slate-200">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocationQR = () => (
    <div className="animate-in slide-in-from-right duration-500 px-6 pt-4 text-center">
      <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-slate-500 mb-8 font-black text-[10px] uppercase tracking-widest text-left">
        <span className="material-icons-round text-sm">arrow_back</span> Back
      </button>
      
      <div className="bg-white p-8 rounded-[40px] inline-block mb-8 shadow-2xl shadow-white/5">
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://maps.google.com/?q=Limitless+Rythymm+Academy+Mumbai" 
          alt="Studio Location QR"
          className="w-48 h-48"
        />
      </div>
      
      <h2 className="text-2xl font-black tracking-tight mb-2">Studio Digital ID</h2>
      <p className="text-slate-400 text-sm mb-10">Scan this at the front desk for check-in or to share our location.</p>
      
      <div className="p-6 rounded-[32px] bg-surface-dark border border-white/5 text-left flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-icons-round">location_on</span>
        </div>
        <div>
          <h4 className="font-bold text-sm">Limitless Rythymm HQ</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">Unit 4B, Terminal 5 Creative District,<br/>Industrial Estate, Mumbai - 400013</p>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="animate-in slide-in-from-right duration-500 px-6 pt-4">
      <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-slate-500 mb-8 font-black text-[10px] uppercase tracking-widest">
        <span className="material-icons-round text-sm">arrow_back</span> Back
      </button>
      
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 ml-1">Saved Payment Methods</h3>
      
      <div className="space-y-4 mb-10">
        <div className="p-6 rounded-[32px] bg-gradient-to-r from-surface-dark to-black border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-[10px] font-black italic text-white italic">VISA</div>
            <div>
              <p className="font-bold text-sm">•••• 4242</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Primary Card</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">more_horiz</span>
        </div>

        <div className="p-6 rounded-[32px] bg-surface-dark border border-white/5 flex items-center justify-between opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
              <span className="material-icons-round text-slate-400">account_balance_wallet</span>
            </div>
            <div>
              <p className="font-bold text-sm">Google Pay / UPI</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">alex@okaxis</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">more_horiz</span>
        </div>

        <div className="p-6 rounded-[32px] bg-surface-dark border border-white/5 flex items-center justify-between opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-black border border-white/10 rounded flex items-center justify-center text-[10px] font-black text-white">Apple Pay</div>
            <div>
              <p className="font-bold text-sm">Connected</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">more_horiz</span>
        </div>
      </div>

      <button className="w-full py-5 rounded-[24px] border border-dashed border-white/10 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/5 transition-all">
        + Add Payment Method
      </button>
    </div>
  );

  if (activeView === 'pass') return renderPassDetails();
  if (activeView === 'qr') return renderLocationQR();
  if (activeView === 'billing') return renderBilling();

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-700 pb-20">
      {/* Premium Header with Official Logo */}
      <div className="relative h-64 w-full bg-[#0a1120] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 scale-125">
           <img 
            src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover mix-blend-overlay"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050a14]"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 opacity-30">
                <img 
                  src="https://i.ibb.co/GfkQ5MpP/image.png" 
                  className="w-full h-full object-contain brightness-0 invert" 
                  alt="LR Logo Watermark" 
                />
            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-primary to-indigo-400 border-2 border-white/20 relative shadow-2xl shadow-primary/20">
                <img 
                    className="w-full h-full object-cover rounded-full" 
                    src="https://picsum.photos/seed/user123/200" 
                    alt="Profile" 
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-4 border-[#050a14] flex items-center justify-center shadow-lg">
                    <span className="material-icons-round text-[14px] text-white">edit</span>
                </button>
            </div>
        </div>
      </div>

      <div className="px-6 text-center -mt-2">
        <h2 className="text-3xl font-black tracking-tight">Alex Rivera</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">Elite Member</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">• Since 2023</span>
        </div>
      </div>

      <div className="px-6 mt-10 space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Account & Membership</h3>
        
        <div 
          onClick={() => setActiveView('pass')}
          className="p-5 rounded-3xl bg-surface-dark border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-icons-round">loyalty</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">LR Unlimited Pass</h4>
              <p className="text-[11px] text-slate-500 font-medium">Valid until Dec 31, 2024</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>

        <div 
          onClick={() => setActiveView('qr')}
          className="p-5 rounded-3xl bg-surface-dark border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <span className="material-icons-round">qr_code_2</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Studio Access ID</h4>
              <p className="text-[11px] text-slate-500 font-medium">Location & Check-in QR</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>

        <div 
          onClick={() => setActiveView('billing')}
          className="p-5 rounded-3xl bg-surface-dark border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <span className="material-icons-round">payments</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Billing & Methods</h4>
              <p className="text-[11px] text-slate-500 font-medium">VISA •••• 4242</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>
      </div>

      <div className="px-6 pb-12">
        <button className="w-full mt-10 py-5 text-slate-500 font-black text-xs uppercase tracking-widest rounded-[24px] border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all active:scale-95">
          Sign Out of Academy
        </button>
      </div>
    </div>
  );
};

export default Profile;
