
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Credentials required for Academy access.');
      return;
    }
    
    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      window.signIn(username);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-8 relative overflow-hidden font-display animate-in fade-in duration-1000">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

      <div className="w-full max-w-[360px] relative z-10 flex flex-col items-center">
        {/* Brand Identity */}
        <div className="mb-12 flex flex-col items-center animate-in zoom-in duration-700">
            <div className="w-24 h-24 mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                <img 
                    src="https://i.ibb.co/mFtRR255/LR-Monogram-Logo.png" 
                    className="w-full h-full object-contain relative z-10" 
                    alt="LR Logo" 
                />
            </div>
            <h1 className="text-4xl font-black tracking-[0.2em] uppercase text-white text-center leading-none">Limitless</h1>
            <p className="text-primary font-bold text-[10px] uppercase tracking-[0.5em] mt-3">Rhythmic Excellence</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-5">
            <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Academy ID / Username</label>
                <div className="relative">
                    <span className="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">person</span>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError(''); }}
                        placeholder="alex.rivera"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary transition-all text-white placeholder:text-slate-600"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
                <div className="relative">
                    <span className="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">lock</span>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary transition-all text-white placeholder:text-slate-600"
                    />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-wider px-1 animate-in slide-in-from-top duration-300">
                    <span className="material-icons-round text-sm">error_outline</span>
                    {error}
                </div>
            )}

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(65,105,225,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:scale-100"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        Enter Portal
                        <span className="material-icons-round text-sm">arrow_forward</span>
                    </>
                )}
            </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-6">
            <button className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                Forgot Academy Password?
            </button>
            <div className="flex items-center gap-4 w-full opacity-20">
                <div className="h-px flex-1 bg-white"></div>
                <span className="text-[8px] font-black text-white uppercase tracking-widest">New Student?</span>
                <div className="h-px flex-1 bg-white"></div>
            </div>
            <button className="px-8 py-3 rounded-xl border border-white/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                Join the Pulse
            </button>
        </div>
      </div>

      {/* Footer Branded Copy */}
      <div className="absolute bottom-10 left-0 right-0 text-center px-10">
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.2em] leading-relaxed">
            Authorized Personnel Only. © 2024 Limitless Rythymm Academy. <br/> Mumbai • Andheri West HQ
        </p>
      </div>
    </div>
  );
};

export default Login;
