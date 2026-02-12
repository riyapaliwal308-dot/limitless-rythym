
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
    setTimeout(() => setStep('success'), 2500);
  };

  if (!classItem) return null;

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
        <h2 className="text-2xl font-bold">Securing your spot...</h2>
        <p className="text-slate-500 mt-2">Connecting to payment gateway</p>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/20">
          <span className="material-icons-round text-5xl">check</span>
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">You're Enrolled!</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Welcome to the <strong>{classItem.name}</strong> family. We've sent your digital pass and class schedule to your email.
        </p>
        <div className="p-6 bg-surface-dark border border-white/5 rounded-3xl w-full mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-500 text-xs">Transaction ID</span>
            <span className="text-white text-xs font-mono">#LR-992384</span>
          </div>
          <div className="h-px bg-white/5 w-full mb-4" />
          <div className="flex justify-between items-center">
            <span className="text-slate-200 font-bold">Total Paid</span>
            <span className="text-primary font-black text-xl">${classItem.price}</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/profile')}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
        >
          View My Courses
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10 pb-10 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-slate-400">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      <div className="space-y-6">
        {/* Course Summary */}
        <div className="p-4 rounded-2xl bg-surface-dark border border-white/5 flex gap-4">
          <img src={classItem.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt="" />
          <div>
            <h3 className="font-bold">{classItem.name}</h3>
            <p className="text-xs text-slate-500">{classItem.level} • {classItem.instructor}</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Payment Method</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-icons-round text-primary">credit_card</span>
                <span className="text-sm font-bold">•••• •••• •••• 4242</span>
              </div>
              <span className="material-icons-round text-primary">check_circle</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <span className="material-icons-round">account_balance_wallet</span>
                <span className="text-sm font-bold">Apple Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Course Fee</span>
            <span>${classItem.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Registration Tax (5%)</span>
            <span>${(classItem.price * 0.05).toFixed(2)}</span>
          </div>
          <div className="h-px bg-white/5 w-full my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">${(classItem.price * 1.05).toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={handlePay}
          className="w-full bg-primary py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span className="material-icons-round text-xl">lock</span>
          Pay Securely
        </button>
        
        <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
          Encrypted with 256-bit SSL
        </p>
      </div>
    </div>
  );
};

export default Checkout;
