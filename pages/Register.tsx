
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: window.userData?.name || '',
    email: '',
    phone: '',
    style: 'Western',
    experience: 'Beginner'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      window.updateUser(formData.name.trim());
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-dark p-6 flex flex-col justify-center items-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(65,105,225,0.4)]">
          <span className="material-icons-round text-5xl">auto_awesome</span>
        </div>
        <h1 className="text-4xl font-black text-center tracking-tighter mb-4">APPLICATION<br/><span className="text-primary">RECEIVED</span></h1>
        <p className="text-slate-400 text-center text-sm font-medium max-w-[280px] leading-relaxed mb-12">
          Welcome to the family, <strong>{formData.name}</strong>! An LR scout will contact you via WhatsApp within 24 hours.
        </p>
        <button 
          onClick={() => navigate('/profile')}
          className="w-full bg-white text-black py-5 rounded-[24px] font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-2xl"
        >
          View My Profile
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10 pb-20 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <div>
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Registration</h2>
            <h1 className="text-2xl font-black tracking-tight">Join the Pulse</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Alex Rivera"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary transition-colors text-white"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Contact Email</label>
            <input 
              required
              type="email" 
              placeholder="alex@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary transition-colors text-white"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">WhatsApp Number</label>
            <input 
              required
              type="tel" 
              placeholder="+91 98765 43210"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary transition-colors text-white"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Primary Style</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary transition-colors text-white appearance-none"
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value})}
                >
                    <option value="Western">Western</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Both">Both Fusion</option>
                </select>
            </div>
            <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Level</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary transition-colors text-white appearance-none"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
        </div>

        <div className="p-6 rounded-[32px] bg-primary/5 border border-primary/10 mt-4">
            <div className="flex items-start gap-4">
                <span className="material-icons-round text-primary mt-1">info</span>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    By submitting, you agree to the LR Academy terms. We will verify your details and assign a counselor to help you pick the right styles.
                </p>
            </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 active:scale-95 transition-all mt-4"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Register;
