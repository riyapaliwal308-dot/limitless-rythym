
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Shows from './pages/Shows';
import Profile from './pages/Profile';
import ClassDetail from './pages/ClassDetail';
import Checkout from './pages/Checkout';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Router>
      <div className="max-w-[430px] mx-auto min-h-screen bg-background-dark relative shadow-2xl overflow-x-hidden flex flex-col">
        {/* Mock Status Bar */}
        <div className="h-11 px-8 flex justify-between items-center sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md">
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
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* iOS Home Indicator */}
        <div className="fixed bottom-1.5 left-0 right-0 max-w-[430px] mx-auto flex justify-center z-[60] pointer-events-none">
          <div className="w-32 h-1.5 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </Router>
  );
};

export default App;
