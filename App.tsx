
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Shows from './pages/Shows';
import Profile from './pages/Profile';
import ClassDetail from './pages/ClassDetail';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Login from './pages/Login';
import BottomNav from './components/BottomNav';
import AIChatBot from './components/AIChatBot';

// Global access for the logo modal and user state
declare global {
  interface Window {
    openLogoModal: () => void;
    updateUser: (name: string, photo?: string) => void;
    signOut: () => void;
    signIn: (name: string) => void;
    userData: { name: string; photo: string };
  }
}

const App: React.FC = () => {
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('lr_is_logged_in') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    return {
      name: localStorage.getItem('lr_user_name') || 'Alex Rivera',
      photo: localStorage.getItem('lr_user_photo') || 'https://picsum.photos/seed/user123/200'
    };
  });

  // Effect to handle global window assignments safely
  useEffect(() => {
    window.openLogoModal = () => setShowLogoModal(true);
    
    window.updateUser = (name: string, photo?: string) => {
      const newUser = { ...user, name, photo: photo || user.photo };
      setUser(newUser);
      localStorage.setItem('lr_user_name', newUser.name);
      localStorage.setItem('lr_user_photo', newUser.photo);
    };

    window.signOut = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('lr_is_logged_in');
      // We keep name/photo for "Welcome back" vibes but session is dead
    };

    window.signIn = (name: string) => {
      setIsLoggedIn(true);
      localStorage.setItem('lr_is_logged_in', 'true');
      window.updateUser(name);
    };

    window.userData = user;
  }, [user]);

  if (!isLoggedIn) {
    return <Login />;
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
            className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300"
            onClick={() => setShowLogoModal(false)}
          >
            <div className="relative max-w-[320px] w-full animate-in zoom-in duration-500 flex flex-col items-center">
                <div className="w-full aspect-square relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                    <img 
                      src="https://i.ibb.co/mFtRR255/LR-Monogram-Logo.png" 
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                      alt="Limitless Rythymm Logo" 
                    />
                </div>
                <h2 className="text-3xl font-black tracking-[0.4em] uppercase text-white mt-12 text-center">Limitless</h2>
                <p className="text-primary font-bold text-[10px] uppercase tracking-[0.6em] mt-3">Elite Academy</p>
                
                <button 
                    className="mt-16 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/10 hover:bg-white/10 active:scale-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLogoModal(false);
                    }}
                >
                    <span className="material-icons-round text-2xl">close</span>
                </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
