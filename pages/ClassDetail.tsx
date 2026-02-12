
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CLASSES } from './Classes';

const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const classItem = CLASSES.find(c => c.id === id);

  if (!classItem) {
    return <div className="p-10 text-center">Class not found.</div>;
  }

  return (
    <div className="animate-in slide-in-from-bottom duration-500 pb-32">
      {/* Header Image */}
      <div className="relative h-[300px]">
        <img src={classItem.imageUrl} alt={classItem.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
        >
          <span className="material-icons-round">arrow_back</span>
        </button>
      </div>

      <div className="px-6 -mt-12 relative">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-3 inline-block ${
          classItem.level === 'Beginner' ? 'bg-green-500' : classItem.level === 'Intermediate' ? 'bg-blue-500' : 'bg-orange-500'
        }`}>
          {classItem.level} Level
        </span>
        <h1 className="text-3xl font-extrabold mb-2">{classItem.name}</h1>
        
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="material-icons-round text-primary text-base">person</span>
            {classItem.instructor}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="material-icons-round text-primary text-base">schedule</span>
            {classItem.duration}
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">About this Class</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {classItem.description}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
          <div className="grid grid-cols-1 gap-3">
            {classItem.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="material-icons-round text-primary text-base">check_circle</span>
                <span className="text-sm text-slate-200">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Class Requirements</h2>
          <ul className="space-y-2">
            {classItem.requirements.map((req, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {req}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Sticky Bottom Enrollment */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-6 bg-background-dark/90 backdrop-blur-xl border-t border-white/10 z-[60] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">Monthly Fee</span>
          <span className="text-2xl font-black text-white">${classItem.price}</span>
        </div>
        <button 
          onClick={() => navigate(`/checkout/${classItem.id}`)}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default ClassDetail;
