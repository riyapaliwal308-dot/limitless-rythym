
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DanceClass } from '../types';
import ClassPackages from '../components/ClassPackages';

export const CLASSES: DanceClass[] = [
  { 
    id: 'litefeet-1', 
    name: 'Litefeet Workshop', 
    level: 'Advanced', 
    duration: '90 min', 
    price: 2400, 
    instructor: 'RAMAN',
    description: 'The evolution of NY street dance. Intense focus on the lock-in, tone-wop, and creative hat/shoe tricks.',
    benefits: ['Advanced footwork', 'Prop manipulation', 'Speed drills', 'Battle readiness'],
    requirements: ['Prior Hip Hop experience', 'Flat-sole sneakers'],
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop'
  },
  { 
    id: 'hiphop-1', 
    name: 'Hip Hop Fundamentals', 
    level: 'Beginner', 
    duration: '60 min', 
    price: 1800, 
    instructor: 'Leonel',
    description: 'Master the foundations of Hip Hop. We focus on bounce, rock, and basic grooves to build your confidence on the floor.',
    benefits: ['Rhythm isolation', 'Foundational grooves', 'Body control', 'Confidence building'],
    requirements: ['Comfortable sneakers', 'Water bottle', 'Loose clothing'],
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    id: 'house-1', 
    name: 'House Groove', 
    level: 'Intermediate', 
    duration: '75 min', 
    price: 2100, 
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
    price: 1900, 
    instructor: 'Gaurav Thukral',
    description: 'A vibrant mix of traditional Indian dance and modern western styles. High energy and expressive storytelling.',
    benefits: ['Expressive movement', 'Total body workout', 'Cultural fusion', 'Hand gesture mastery'],
    requirements: ['No prior experience', 'Barefoot or light shoes'],
    imageUrl: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 'locking-1', 
    name: 'Locking Foundations', 
    level: 'Intermediate', 
    duration: '75 min', 
    price: 2000, 
    instructor: 'Lockin Larry',
    description: 'Funky, rhythmic, and strictly 70s foundation. Learn the locks, points, and rolls with character.',
    benefits: ['Sharp isolation', 'Groove dynamics', 'Performance character', 'Timing precision'],
    requirements: ['Comfortable clothing', 'Funk spirit'],
    imageUrl: 'https://images.unsplash.com/photo-1502519144081-9b691d145aa1?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 'contemporary-1', 
    name: 'Contemporary Dance', 
    level: 'Intermediate', 
    duration: '75 min', 
    price: 2200, 
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
    <div className="px-6 pt-6 animate-in slide-in-from-right duration-500">
      <h1 className="text-4xl font-black tracking-tighter mb-2">Academy Styles</h1>
      <p className="text-slate-500 text-sm font-semibold mb-8">Structured elite curriculum for urban artists.</p>

      {/* Class Bundles Section */}
      <ClassPackages />

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] whitespace-nowrap">Explore Classes</h2>
        <div className="h-px flex-1 bg-white/5"></div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-10">
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl as any)}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              filter === lvl 
              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-white/5 border-white/5 text-slate-500'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="space-y-5 pb-10">
        {filteredClasses.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/class/${item.id}`)}
            className="p-5 rounded-[32px] bg-surface-dark border border-white/5 flex gap-5 items-center group active:scale-[0.98] transition-all cursor-pointer shadow-xl"
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  item.level === 'Beginner' ? 'bg-green-500' : item.level === 'Intermediate' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.level}</span>
              </div>
              <h3 className="font-black text-lg leading-tight truncate">{item.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-slate-500 text-[10px] font-black uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="material-icons-round text-[14px]">person</span>
                  {item.instructor}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-icons-round text-[14px]">schedule</span>
                  {item.duration}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="block text-primary font-black text-xl">₹{item.price.toLocaleString('en-IN')}</span>
              <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest">/ Month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
