
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home', path: '/' },
    { id: 'classes', icon: 'calendar_month', label: 'Classes', path: '/classes' },
    { id: 'shows', icon: 'theaters', label: 'Shows', path: '/shows' },
    { id: 'profile', icon: 'person', label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-background-dark/90 backdrop-blur-2xl border-t border-white/5 px-8 py-4 pb-10 z-50">
      <div className="flex justify-between items-center relative">
        {navItems.slice(0, 2).map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              isActive(item.path) ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`material-icons-round ${isActive(item.path) ? 'scale-110' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-extrabold uppercase tracking-tighter">{item.label}</span>
            {isActive(item.path) && <div className="w-1 h-1 bg-primary rounded-full absolute -bottom-2"></div>}
          </button>
        ))}

        {/* Floating Action Button - AI Recommendation */}
        <div className="relative -top-8">
          <button 
            onClick={() => navigate('/classes')}
            className="w-16 h-16 bg-primary text-white rounded-[24px] shadow-2xl shadow-primary/50 flex items-center justify-center transition-all hover:scale-105 active:scale-90"
          >
            <span className="material-icons-round text-3xl">add</span>
          </button>
        </div>

        {navItems.slice(2).map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              isActive(item.path) ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`material-icons-round ${isActive(item.path) ? 'scale-110' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-extrabold uppercase tracking-tighter">{item.label}</span>
            {isActive(item.path) && <div className="w-1 h-1 bg-primary rounded-full absolute -bottom-2"></div>}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
