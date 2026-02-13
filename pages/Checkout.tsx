
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CLASSES } from './Classes';

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const classItem = CLASSES.find(c => c.id === id);
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  if (!classItem) return null;

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background-dark">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-icons-round text-primary text-3xl">lock</span>
          </div>
        </div>
        <h2 className="text-2xl font-black tracking-tight">Processing Payment</h2>
        <p className="text-slate-500 mt-2 text-sm">Verification in progress, please don't refresh.</p>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background-dark p-6 flex flex-col justify-center animate-in fade-in duration-700">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-bounce">
            <span className="material-icons-round text-5xl font-black">check</span>
          </div>
          <h1 className="text-4xl font-black mb-2">Welcome Aboard!</h1>
          <p className="text-slate-400 mb-10 max-w-[280px]">Your registration for <strong>{classItem.name}</strong> is confirmed.</p>
        </div>

        <div className="p-8 bg-surface-dark border border-white/5 rounded-[40px] w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Digital Receipt</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Class Style</span>
              <span className="text-white text-sm font-bold">{classItem.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Instructor</span>
              <span className="text-white text-sm font-bold">{classItem.instructor}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium">Start Date</span>
              <span className="text-white text-sm font-bold">Next Monday</span>
            </div>
            <div className="h-px bg-white/5 w-full my-2" />
            <div className="flex justify-between items-center">
              <span className="text-slate-200 font-black">Total Paid</span>
              <span className="text-primary font-black text-2xl">${(classItem.price * 1.05).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-dashed border-white/10 flex flex-col items-center">
             <div className="w-full h-12 bg-white/10 rounded-xl mb-4 flex items-center justify-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">#LR-TXN-990231-CONF</span>
             </div>
             <p className="text-[9px] text-slate-500 text-center leading-relaxed">
               Please present this receipt or your Digital ID in the Profile section at the studio front desk for your first session.
             </p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/profile')}
          className="mt-10 w-full bg-white text-black py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
        >
          My Student Portal
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10 pb-10 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <h1 className="text-2xl font-black tracking-tight">Registration</h1>
      </div>

      <div className="space-y-8">
        {/* Course Card Preview */}
        <div className="p-5 rounded-[32px] bg-gradient-to-br from-surface-dark to-black border border-white/5 flex gap-5 items-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10">
            <img src={classItem.imageUrl} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="font-black text-lg truncate leading-none mb-1">{classItem.name}</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{classItem.instructor} • {classItem.level}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="material-icons-round text-primary text-sm">verified</span>
              <span className="text-[10px] font-black text-primary uppercase">Elite Certified</span>
            </div>
          </div>
        </div>

        {/* Card Mockup */}
        <div>
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Preferred Card</h2>
          <div className="aspect-[1.6/1] w-full rounded-[30px] bg-gradient-to-br from-primary to-[#2a4fc0] p-8 text-white shadow-2xl shadow-primary/30 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start">
              <span className="material-icons-round text-3xl">contactless</span>
              <span className="font-black italic text-xl">VISA</span>
            </div>
            <div>
              <p className="text-xl font-mono tracking-[0.3em] mb-6">•••• •••• •••• 4242</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-60 mb-1">Card Holder</p>
                  <p className="text-sm font-bold tracking-widest">ALEX RIVERA</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-60 mb-1">Expires</p>
                  <p className="text-sm font-bold tracking-widest">12/26</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="p-8 rounded-[40px] bg-surface-dark border border-white/5 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-medium">Monthly Tuition</span>
            <span className="font-bold font-mono">${classItem.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-medium">Facility Fee (GST 5%)</span>
            <span className="font-bold font-mono">${(classItem.price * 0.05).toFixed(2)}</span>
          </div>
          <div className="h-px bg-white/5 w-full my-4" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-black tracking-tight">Total Amount</span>
            <span className="text-primary font-black text-2xl font-mono">${(classItem.price * 1.05).toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-2">
          <button 
            onClick={handlePay}
            className="w-full bg-primary py-5 rounded-[24px] font-black text-base shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 transition-all group"
          >
            <span className="material-icons-round text-xl group-hover:rotate-12 transition-transform">verified_user</span>
            Authorize Payment
          </button>
          <p className="mt-4 text-[9px] text-slate-600 text-center uppercase tracking-[0.2em] font-bold">
            Guaranteed Secure • Bank Grade Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
