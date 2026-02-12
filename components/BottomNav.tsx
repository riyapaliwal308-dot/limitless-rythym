
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home', path: '/' },
    { id: 'classes', icon: 'calendar_month', label: 'Classes', path: '/classes' },
    { id: 'shows', icon: 'theaters', label: 'Shows', path: '/shows' },
    { id: 'profile', icon: 'person', label: 'Profile', path: '/profile' },
  ];

  const handleNav = (path: string, id: string) => {
    setActiveTab(id);
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-background-dark/80 backdrop-blur-xl border-t border-white/10 px-8 py-3 pb-8 z-50">
      <div className="flex justify-between items-center relative">
        {navItems.slice(0, 2).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.path, item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              location.pathname === item.path ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}

        {/* Floating Action Button */}
        <div className="relative -top-6">
          <button className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
            <span className="material-icons-round text-3xl">confirmation_number</span>
          </button>
        </div>

        {navItems.slice(2).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.path, item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              location.pathname === item.path ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
