
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DanceClass } from '../types';

export const CLASSES: DanceClass[] = [
  { 
    id: 'hiphop-1', 
    name: 'Hip Hop Fundamentals', 
    level: 'Beginner', 
    duration: '60 min', 
    price: 100, 
    instructor: 'Leonel',
    description: 'Master the foundations of Hip Hop. We focus on bounce, rock, and basic grooves to build your confidence on the floor.',
    benefits: ['Rhythm isolation', 'Foundational grooves', 'Body control', 'Confidence building'],
    requirements: ['Comfortable sneakers', 'Water bottle', 'Loose clothing'],
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    id: 'litefeet-1', 
    name: 'Litefeet Workshop', 
    level: 'Advanced', 
    duration: '90 min', 
    price: 150, 
    instructor: 'RAMAN',
    description: 'The evolution of NY street dance. Intense focus on the lock-in, tone-wop, and creative hat/shoe tricks.',
    benefits: ['Advanced footwork', 'Prop manipulation', 'Speed drills', 'Battle readiness'],
    requirements: ['Prior Hip Hop experience', 'Flat-sole sneakers'],
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1974&auto=format&fit=crop'
  },
  { 
    id: 'house-1', 
    name: 'House Groove', 
    level: 'Intermediate', 
    duration: '75 min', 
    price: 120, 
    instructor: 'RIYA',
    description: 'Dive into the soul of House music. Focusing on jack, lofting, and intricate footwork patterns.',
    benefits: ['Musicality', 'Fluidity', 'Cardio endurance', 'Improvisation skills'],
    requirements: ['Basic footwork knowledge', 'Smooth-sole shoes'],
    imageUrl: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 'bollywood-1', 
    name: 'Bollywood Fusion', 
    level: 'Beginner', 
    duration: '60 min', 
    price: 110, 
    instructor: 'Gaurav Thukral',
    description: 'A vibrant mix of traditional Indian dance and modern western styles. High energy and expressive storytelling.',
    benefits: ['Expressive movement', 'Total body workout', 'Cultural fusion', 'Hand gesture mastery'],
    requirements: ['No prior experience', 'Barefoot or light shoes'],
    imageUrl: 'https://images.unsplash.com/photo-1516475429146-3620395ec7ff?q=80&w=2080&auto=format&fit=crop'
  },
  { 
    id: 'locking-1', 
    name: 'Locking Foundations', 
    level: 'Intermediate', 
    duration: '75 min', 
    price: 120, 
    instructor: 'Lockin Larry',
    description: 'Funky, rhythmic, and strictly 70s foundation. Learn the locks, points, and rolls with character.',
    benefits: ['Sharp isolation', 'Groove dynamics', 'Performance character', 'Timing precision'],
    requirements: ['Comfortable clothing', 'Funk spirit'],
    imageUrl: 'https://images.unsplash.com/photo-1508700915892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    id: 'contemporary-1', 
    name: 'Contemporary Dance', 
    level: 'Intermediate', 
    duration: '75 min', 
    price: 120, 
    instructor: 'Elena Vance',
    description: 'Explore the boundaries between technique and emotion. Focuses on floorwork, release, and athletic movement.',
    benefits: ['Emotional expression', 'Floorwork technique', 'Strength & flexibility', 'Modern vocabulary'],
    requirements: ['Comfortable leggings/sweats', 'Knee pads recommended'],
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1935&auto=format&fit=crop'
  },
];

const Classes: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const navigate = useNavigate();

  const filteredClasses = filter === 'All' ? CLASSES : CLASSES.filter(c => c.level === filter);

  return (
    <div className="px-6 pt-4 animate-in slide-in-from-right duration-300">
      <h1 className="text-3xl font-extrabold mb-2">Limitless Rythym</h1>
      <p className="text-slate-400 text-sm mb-6">Structured curriculum for the urban dancer.</p>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-8">
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              filter === lvl ? 'bg-primary text-white' : 'bg-white/5 text-slate-400'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredClasses.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/class/${item.id}`)}
            className="p-4 rounded-2xl bg-surface-dark border border-white/5 flex justify-between items-center group active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${
                  item.level === 'Beginner' ? 'bg-green-500' : item.level === 'Intermediate' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.level}</span>
              </div>
              <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
              <div className="flex items-center gap-3 mt-2 text-slate-400 text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-icons-round text-[14px]">schedule</span>
                  {item.duration}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-icons-round text-[14px]">person</span>
                  {item.instructor}
                </span>
              </div>
            </div>
            <div className="text-right ml-4">
              <span className="block text-primary font-extrabold text-lg">${item.price}</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">per month</span>
              <div className="mt-2 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-icons-round text-lg">chevron_right</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Info */}
      <div className="mt-10 p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
        <h4 className="font-bold text-lg mb-2">Member Pricing</h4>
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex justify-between"><span>Drop-in Session</span><span className="font-bold">$25</span></div>
          <div className="flex justify-between"><span>Monthly (1 class/week)</span><span className="font-bold">$120</span></div>
          <div className="flex justify-between"><span>Unlimited Access</span><span className="font-bold">$180</span></div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
