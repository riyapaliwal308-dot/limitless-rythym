
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Shows from './pages/Shows';
import Profile from './pages/Profile';
import ClassDetail from './pages/ClassDetail';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import BottomNav from './components/BottomNav';
import AIChatBot from './components/AIChatBot';

// Global access for the logo modal and user state
declare global {
  interface Window {
    openLogoModal: () => void;
    updateUser: (name: string, photo?: string) => void;
    userData: { name: string; photo: string };
  }
}

const App: React.FC = () => {
  const [showLogoModal, setShowLogoModal] = useState(false);
  
  // Safe initialization for SSR environments like Vercel build steps
  const [user, setUser] = useState(() => {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return { name: 'Alex Rivera', photo: 'https://picsum.photos/seed/user123/200' };
    
    return {
      name: localStorage.getItem('lr_user_name') || 'Alex Rivera',
      photo: localStorage.getItem('lr_user_photo') || 'https://picsum.photos/seed/user123/200'
    };
  });

  // Assign global methods immediately so they are available to child components during first render
  if (typeof window !== 'undefined') {
    window.openLogoModal = () => setShowLogoModal(true);
    window.updateUser = (name: string, photo?: string) => {
      const newUser = { ...user, name, photo: photo || user.photo };
      setUser(newUser);
      localStorage.setItem('lr_user_name', newUser.name);
      localStorage.setItem('lr_user_photo', newUser.photo);
    };
    window.userData = user;
  }

  return (
    <Router>
      <div className="max-w-[430px] mx-auto min-h-screen bg-background-dark relative shadow-2xl overflow-x-hidden flex flex-col">
        {/* Mock Status Bar */}
        <div className="h-11 px-8 flex justify-between items-center sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md text-white">
          <span className="text-sm font-semibold">9:41</span>
          <div className="flex gap-1.5 items-center">
            <span className="material-icons-round text-[16px]">signal_cellular_alt</span>
            <span className="material-icons-round text-[16px]">wifi</span>
            <span className="material-icons-round text-[18px]">battery_full</span>
          </div>
        </div>

        <main className="flex-1 pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/class/:id" element={<ClassDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <BottomNav />
        <AIChatBot />
        
        {/* iOS Home Indicator */}
        <div className="fixed bottom-1.5 left-0 right-0 max-w-[430px] mx-auto flex justify-center z-[60] pointer-events-none">
          <div className="w-32 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        {/* Global Logo Popup */}
        {showLogoModal && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300"
            onClick={() => setShowLogoModal(false)}
          >
            <div className="relative max-w-[280px] w-full animate-in zoom-in duration-500 flex flex-col items-center">
                <div className="w-full aspect-square relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
                    <img 
                      src="https://i.ibb.co/GfkQ5MpP/image.png" 
                      className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(65,105,225,0.6)] relative z-10" 
                      alt="Limitless Rythymm Logo" 
                    />
                </div>
                <h2 className="text-2xl font-black tracking-[0.4em] uppercase text-white mt-12 text-center">Limitless</h2>
                <p className="text-primary font-bold text-[10px] uppercase tracking-[0.6em] mt-2">Rythymm Academy</p>
                
                <button 
                    className="mt-16 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/10"
                    onClick={() => setShowLogoModal(false)}
                >
                    <span className="material-icons-round">close</span>
                </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
