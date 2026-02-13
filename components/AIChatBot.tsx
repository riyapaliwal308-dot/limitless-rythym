
import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Limitless Rythymm! What style do you want to learn? (Western or Bollywood?)" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const newMessages: Message[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const history = newMessages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await sendChatMessage(history, text);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const QUICK_ACTIONS = [
    "Western Styles",
    "Bollywood Fusion",
    "Show Packages",
    "Meet Faculty"
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-[0_15px_30px_rgba(65,105,225,0.4)] flex items-center justify-center z-[70] hover:scale-110 active:scale-90 transition-all border-2 border-white/20"
      >
        <span className="material-icons-round text-2xl">auto_awesome</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background-dark animate-pulse"></div>
      </button>

      {/* Chat Interface Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          <div className="relative w-full max-w-[400px] mx-auto h-[70vh] bg-surface-dark border border-white/10 rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="p-6 bg-primary/10 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                  <span className="material-icons-round">blur_on</span>
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">LR Pulse</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Online Now</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                <span className="material-icons-round">close</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none shadow-lg' 
                    : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none animate-pulse flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="px-6 py-2">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {QUICK_ACTIONS.map(action => (
                  <button 
                    key={action}
                    onClick={() => handleSend(action)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-400 whitespace-nowrap hover:bg-primary/20 hover:text-primary transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Tell me your style choice..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-primary transition-colors text-white"
                />
                <button 
                  onClick={() => handleSend(input)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
                >
                  <span className="material-icons-round">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
