
import React from 'react';

const ProfileTab: React.FC = () => {
  return (
    <div className="h-full flex flex-col px-6 pt-14 hide-scrollbar overflow-y-auto">
      <header className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">My Profile</h2>
        <button className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
          <span className="material-symbols-outlined text-slate-800">settings</span>
        </button>
      </header>

      <div className="flex items-center gap-6 mb-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-white shadow-lg ring-2 ring-primary/20">
            <img 
              alt="Sarah" 
              className="w-full h-full rounded-full object-cover"
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold w-7 h-7 flex items-center justify-center rounded-full border-2 border-white">
            ID
          </div>
        </div>
        <div>
           <p className="text-slate-400 text-sm font-medium">Welcome back,</p>
           <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Dr. Sarah Smith</h3>
           <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">On Duty</span>
           </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-4xl p-6 relative overflow-hidden shadow-xl mb-8 group cursor-pointer hover:scale-[1.01] transition-transform">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h4 className="text-xl font-bold text-white mb-1">Request Salary</h4>
            <p className="text-blue-100 text-xs font-medium">Monthly cycle complete</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
             <span className="material-symbols-outlined text-white">attach_money</span>
          </div>
        </div>
        
        <div className="bg-black/10 rounded-2xl p-2 pl-4 flex items-center justify-between mb-4 backdrop-blur-md border border-white/5 relative z-10">
           <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Eligible Amount</span>
           <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
             <span className="text-sm font-bold text-slate-900">$4,250.00</span>
           </div>
        </div>
        
        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 relative z-10">
          Proceed to Withdraw
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      <div className="space-y-4 pb-20">
         <button className="w-full bg-white p-4 rounded-3xl flex items-center justify-between border border-slate-50 shadow-sm hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">description</span>
               </div>
               <div className="text-left">
                  <h5 className="text-sm font-bold text-slate-900">Attendance History</h5>
                  <p className="text-[10px] text-slate-400 font-medium">View full logs & reports</p>
               </div>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
         </button>
         
         <button className="w-full bg-white p-4 rounded-3xl flex items-center justify-between border border-slate-50 shadow-sm hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">support_agent</span>
               </div>
               <div className="text-left">
                  <h5 className="text-sm font-bold text-slate-900">Support & Help</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Contact administration</p>
               </div>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
         </button>
      </div>
    </div>
  );
};

export default ProfileTab;
