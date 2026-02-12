
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="px-6 pt-4 animate-in slide-in-from-right duration-300">
      <div className="flex flex-col items-center mt-8 mb-10">
        <div className="w-24 h-24 rounded-full p-1 border-2 border-primary relative">
          <img 
            className="w-full h-full object-cover rounded-full" 
            src="https://picsum.photos/seed/user123/200" 
            alt="Profile" 
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-4 border-background-dark flex items-center justify-center">
            <span className="material-icons-round text-[14px] text-white">edit</span>
          </button>
        </div>
        <h2 className="text-2xl font-extrabold mt-4">Alex Rivera</h2>
        <p className="text-slate-500 text-sm">Elite Member • Since 2023</p>
      </div>

      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-icons-round text-primary">loyalty</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Membership</h4>
              <p className="text-[11px] text-slate-500">Unlimited Monthly Plan</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <span className="material-icons-round text-green-500">history</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Class History</h4>
              <p className="text-[11px] text-slate-500">24 sessions completed</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <span className="material-icons-round text-orange-500">payments</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Billing</h4>
              <p className="text-[11px] text-slate-500">Next payment Dec 1st</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>
      </div>

      <button className="w-full mt-10 py-4 text-red-500 font-bold text-sm rounded-2xl border border-red-500/20 active:bg-red-500/10 transition-colors">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
