
import React, { useState, useRef } from 'react';

type ViewState = 'main' | 'pass' | 'qr' | 'billing' | 'edit_profile' | 'contact';

interface ProfileProps {
  user: { name: string; photo: string };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<ViewState>('main');
  const [newName, setNewName] = useState(user.name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        window.updateUser(user.name, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateName = () => {
    if (newName.trim()) {
      window.updateUser(newName.trim());
      setActiveView('main');
    }
  };

  const renderPassDetails = () => (
    <div className="animate-in slide-in-from-right duration-500 px-6 pt-4">
      <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-slate-500 mb-8 font-black text-[10px] uppercase tracking-widest">
        <span className="material-icons-round text-sm">arrow_back</span> Back to Profile
      </button>
      
      <div className="p-8 rounded-[40px] bg-gradient-to-br from-primary to-indigo-900 shadow-2xl shadow-primary/30 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-black tracking-tight">LR Unlimited</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Platinum Membership</p>
          </div>
          <span className="material-icons-round text-3xl">verified</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Status</p>
              <p className="text-sm font-bold">Active • Auto-Renew</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Valid Until</p>
              <p className="text-sm font-bold">Dec 31, 2024</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-1">Member Benefits</h3>
      <div className="space-y-3">
        {['Unlimited Academy Classes', 'Priority Show Bookings', '15% Off Studio Merch', 'Exclusive Masterclass Access'].map((benefit, i) => (
          <div key={i} className="p-5 rounded-3xl bg-surface-dark border border-white/5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-icons-round text-sm">done</span>
            </div>
            <span className="text-sm font-bold text-slate-200">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocationQR = () => (
    <div className="animate-in slide-in-from-right duration-500 px-6 pt-4 text-center">
      <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-slate-500 mb-8 font-black text-[10px] uppercase tracking-widest text-left">
        <span className="material-icons-round text-sm">arrow_back</span> Back
      </button>
      
      <div className="bg-white p-8 rounded-[40px] inline-block mb-8 shadow-2xl shadow-white/5">
        <img 
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://maps.google.com/?q=Limitless+Rythymm+Academy+Andheri+West+Mumbai+User+${encodeURIComponent(user.name)}`} 
          alt="Studio Location QR"
          className="w-48 h-48"
        />
      </div>
      
      <h2 className="text-2xl font-black tracking-tight mb-2">Studio Digital ID</h2>
      <p className="text-slate-400 text-sm mb-10">Scan this at the front desk for check-in or to visit our Mumbai studio.</p>
      
      <div className="p-6 rounded-[32px] bg-surface-dark border border-white/5 text-left flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-icons-round">location_on</span>
        </div>
        <div>
          <h4 className="font-bold text-sm">Limitless Rythymm HQ</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">Andheri West, Mumbai,<br/>Maharashtra, India</p>
        </div>
      </div>

      <div className="p-6 rounded-[32px] bg-surface-dark border border-white/5 text-left flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
          <span className="material-icons-round">contact_support</span>
        </div>
        <div>
          <h4 className="font-bold text-sm">Contact Details</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">Phone: +91 97185 34236<br/>Email: riyapaliwal308@gmail.com</p>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="animate-in slide-in-from-right duration-500 px-6 pt-4">
      <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-slate-500 mb-8 font-black text-[10px] uppercase tracking-widest">
        <span className="material-icons-round text-sm">arrow_back</span> Back
      </button>
      
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 ml-1">Saved Payment Methods</h3>
      
      <div className="space-y-4 mb-10">
        <div className="p-6 rounded-[32px] bg-gradient-to-r from-surface-dark to-black border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-[10px] font-black italic text-white italic">VISA</div>
            <div>
              <p className="font-bold text-sm">•••• 4242</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Primary Card</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">more_horiz</span>
        </div>
      </div>

      <button className="w-full py-5 rounded-[24px] border border-dashed border-white/10 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/5 transition-all">
        + Add Payment Method
      </button>
    </div>
  );

  const renderContact = () => (
    <div className="animate-in slide-in-from-right duration-500 px-6 pt-4">
      <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-slate-500 mb-8 font-black text-[10px] uppercase tracking-widest">
        <span className="material-icons-round text-sm">arrow_back</span> Back
      </button>
      
      <h2 className="text-2xl font-black tracking-tight mb-6">Contact Studio</h2>
      
      <div className="space-y-4">
        <a href="tel:9718534236" className="p-6 rounded-[32px] bg-surface-dark border border-white/5 flex items-center gap-5 active:bg-white/10 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <span className="material-icons-round text-3xl">call</span>
          </div>
          <div>
            <h4 className="font-black text-sm">Call Us</h4>
            <p className="text-xs text-slate-500 mt-1">+91 97185 34236</p>
          </div>
        </a>

        <a href="mailto:riyapaliwal308@gmail.com" className="p-6 rounded-[32px] bg-surface-dark border border-white/5 flex items-center gap-5 active:bg-white/10 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-icons-round text-3xl">email</span>
          </div>
          <div>
            <h4 className="font-black text-sm">Email Us</h4>
            <p className="text-xs text-slate-500 mt-1">riyapaliwal308@gmail.com</p>
          </div>
        </a>

        <div className="p-6 rounded-[32px] bg-surface-dark border border-white/5 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <span className="material-icons-round text-3xl">location_on</span>
          </div>
          <div>
            <h4 className="font-black text-sm">Studio Location</h4>
            <p className="text-xs text-slate-500 mt-1">Andheri West, Mumbai</p>
          </div>
        </div>
      </div>

      <div className="mt-12 p-8 rounded-[40px] bg-primary/5 border border-primary/10">
        <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-2">Visit Us</h4>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          Our doors are open Monday to Saturday, 10 AM to 9 PM. We'd love to see you in person for a studio tour!
        </p>
      </div>
    </div>
  );

  const renderEditModal = () => (
    <div className="fixed inset-0 z-[150] flex flex-col justify-end">
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setActiveView('main')}
        ></div>
        <div className="relative w-full max-w-[430px] mx-auto bg-surface-dark border-t border-white/10 rounded-t-[40px] p-8 pb-12 animate-in slide-in-from-bottom duration-500">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8"></div>
            <h2 className="text-2xl font-black tracking-tight mb-2">Update Identity</h2>
            <p className="text-slate-500 text-sm mb-8">Your name will be visible on show rosters and certificates.</p>
            
            <div className="space-y-6">
                <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-base font-bold focus:outline-none focus:border-primary transition-colors text-white"
                    />
                </div>
                
                <button 
                  onClick={handleUpdateName}
                  className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/40 active:scale-95 transition-all"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setActiveView('main')}
                  className="w-full py-2 text-slate-500 font-bold text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
            </div>
        </div>
    </div>
  );

  if (activeView === 'pass') return renderPassDetails();
  if (activeView === 'qr') return renderLocationQR();
  if (activeView === 'billing') return renderBilling();
  if (activeView === 'contact') return renderContact();

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-700 pb-20">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      {/* Premium Header */}
      <div className="relative h-64 w-full bg-[#0a1120] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-30 scale-125">
           <img 
            src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover mix-blend-overlay"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050a14]"></div>
        </div>
        
        {/* Visible Watermark Logo */}
        <div 
          onClick={() => window.openLogoModal && window.openLogoModal()}
          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
        >
            <div className="w-64 h-64 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                <img 
                  src="https://i.ibb.co/mFtRR255/LR-Monogram-Logo.png" 
                  className="w-full h-full object-contain brightness-0 invert" 
                  alt="LR Logo Watermark" 
                />
            </div>
        </div>

        {/* Top Brand Mark */}
        <div 
          onClick={() => window.openLogoModal && window.openLogoModal()}
          className="absolute top-8 left-6 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl z-20 shadow-2xl cursor-pointer hover:bg-black/80 transition-all"
        >
           <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src="https://i.ibb.co/mFtRR255/LR-Monogram-Logo.png" 
                className="w-full h-full object-contain" 
                alt="LR Logo" 
              />
           </div>
           <span className="text-[11px] font-black uppercase tracking-[0.3em]">Limitless</span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-primary to-indigo-400 border-2 border-white/20 relative shadow-2xl shadow-primary/20">
                <img 
                    className="w-full h-full object-cover rounded-full bg-surface-dark" 
                    src={user.photo} 
                    alt="Profile" 
                />
                <button 
                  onClick={handlePhotoClick}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-4 border-[#050a14] flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-90"
                >
                    <span className="material-icons-round text-[14px] text-white">photo_camera</span>
                </button>
            </div>
        </div>
      </div>

      <div className="px-6 text-center -mt-2">
        <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-black tracking-tight">{user.name}</h2>
            <button 
              onClick={() => setActiveView('edit_profile')}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
            >
                <span className="material-icons-round text-sm">edit</span>
            </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">Elite Member</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">• Since 2023</span>
        </div>
      </div>

      {/* Main Studio Info (Directly Visible) */}
      <div className="px-6 mt-8">
         <div className="p-6 rounded-[32px] bg-gradient-to-br from-surface-dark to-black border border-white/10 shadow-xl overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Mumbai Studio HQ</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-icons-round text-xl">location_on</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-white">Andheri West, Mumbai</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Maharashtra, India</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <span className="material-icons-round text-xl">call</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-white">+91 97185 34236</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wider">WhatsApp & Calls</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                    <span className="material-icons-round text-xl">mail</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-white">riyapaliwal308@gmail.com</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Official Inquiries</p>
                 </div>
              </div>
            </div>
         </div>
      </div>

      <div className="px-6 mt-10 space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Account & Membership</h3>
        
        <div 
          onClick={() => setActiveView('pass')}
          className="p-5 rounded-3xl bg-surface-dark border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-icons-round">loyalty</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">LR Unlimited Pass</h4>
              <p className="text-[11px] text-slate-500 font-medium">Valid until Dec 31, 2024</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>

        <div 
          onClick={() => setActiveView('qr')}
          className="p-5 rounded-3xl bg-surface-dark border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <span className="material-icons-round">qr_code_2</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Studio Access ID</h4>
              <p className="text-[11px] text-slate-500 font-medium">Check-in QR</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>

        <div 
          onClick={() => setActiveView('billing')}
          className="p-5 rounded-3xl bg-surface-dark border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <span className="material-icons-round">payments</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Billing & Methods</h4>
              <p className="text-[11px] text-slate-500 font-medium">Manage Wallet</p>
            </div>
          </div>
          <span className="material-icons-round text-slate-600">chevron_right</span>
        </div>
      </div>

      <div className="px-6 pb-12">
        <button 
          onClick={() => window.signOut()}
          className="w-full mt-10 py-5 text-slate-500 font-black text-xs uppercase tracking-widest rounded-[24px] border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all active:scale-95"
        >
          Sign Out of Academy
        </button>
      </div>

      {activeView === 'edit_profile' && renderEditModal()}
    </div>
  );
};

export default Profile;
