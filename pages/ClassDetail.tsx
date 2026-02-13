
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
      <div className="relative h-[340px]">
        <img src={classItem.imageUrl} alt={classItem.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white z-10"
        >
          <span className="material-icons-round">arrow_back</span>
        </button>
      </div>

      <div className="px-6 -mt-16 relative">
        <div className="flex gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${
            classItem.level === 'Beginner' ? 'bg-green-500' : classItem.level === 'Intermediate' ? 'bg-blue-500' : 'bg-orange-500'
          }`}>
            {classItem.level} Level
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md text-white">
            Urban Style
          </span>
        </div>
        
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">{classItem.name}</h1>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 text-slate-300 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="material-icons-round text-primary text-base">person</span>
            <span className="font-semibold text-white">{classItem.instructor}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="material-icons-round text-primary text-base">schedule</span>
            <span className="font-semibold text-white">{classItem.duration}</span>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-extrabold mb-3">About the Course</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {classItem.description} This intensive course at Limitless Rythym is designed to push your boundaries and develop authentic style movements.
          </p>
        </section>

        {/* Schedule Mockup */}
        <section className="mb-10">
          <h2 className="text-xl font-extrabold mb-4">Weekly Schedule</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-surface-dark border border-white/5 rounded-2xl">
              <span className="font-bold">Mon & Wed</span>
              <span className="text-primary font-bold">19:00 - 20:30</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-surface-dark border border-white/5 rounded-2xl opacity-60">
              <span className="font-bold">Sat (Optional Lab)</span>
              <span className="text-slate-400">14:00 - 16:00</span>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-extrabold mb-4">What you'll master</h2>
          <div className="grid grid-cols-1 gap-3">
            {classItem.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <span className="material-icons-round text-sm">bolt</span>
                </div>
                <span className="text-sm font-semibold text-slate-200">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-extrabold mb-4">Entry Requirements</h2>
          <div className="p-5 rounded-3xl bg-surface-dark border border-white/5">
            <ul className="space-y-3">
              {classItem.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="material-icons-round text-primary text-[16px]">info</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Enrollment */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-6 bg-background-dark/95 backdrop-blur-2xl border-t border-white/10 z-[60] flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-widest mb-1">Tuition Fee</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white">₹{classItem.price.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-slate-500 font-bold">/MO</span>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/checkout/${classItem.id}`)}
          className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-primary/30 active:scale-95 transition-all"
        >
          Secure Enrollment
        </button>
      </div>
    </div>
  );
};

export default ClassDetail;
