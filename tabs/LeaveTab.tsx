
import React from 'react';

const LeaveTab: React.FC = () => {
  return (
    <div className="h-full flex flex-col px-6 pt-14 hide-scrollbar overflow-y-auto pb-40">
      <header className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Leave Status</h2>
        <div className="bg-primary p-7 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Available Balance</p>
          <p className="text-5xl font-black">12 <span className="text-lg font-medium opacity-50">Days</span></p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-10">
        {[
          { label: 'Approved', val: '08', icon: 'check_circle', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Rejected', val: '01', icon: 'cancel', color: 'text-rose-500', bg: 'bg-rose-50' },
          { label: 'Pending', val: '02', icon: 'pending', color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Free Taken', val: '01', icon: 'card_giftcard', color: 'text-primary', bg: 'bg-primary/5' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[2rem] border border-slate-50 shadow-sm flex flex-col items-center">
             <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-3`}>
                <span className="material-symbols-outlined text-[20px] fill-1">{item.icon}</span>
             </div>
             <p className="text-xl font-black text-slate-900 mb-1">{item.val}</p>
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-12">
        <button className="flex-1 bg-slate-900 text-white font-bold h-16 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
          <span className="material-symbols-outlined text-sm">add</span>
          Request Leave
        </button>
        <button className="flex-1 bg-white border border-slate-200 text-slate-500 font-bold h-16 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-sm">close</span>
          Cancel Req.
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 mb-6 px-1 tracking-tight">Recent Applications</h3>
        {[
          { type: 'Medical Leave', dates: 'Nov 01 - Nov 03', status: 'Pending', color: 'bg-amber-500' },
          { type: 'Casual Leave', dates: 'Oct 15 - Oct 16', status: 'Approved', color: 'bg-emerald-500' }
        ].map((leave, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex justify-between items-center group hover:border-primary/20 transition-all">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                 <span className="material-symbols-outlined">event_note</span>
               </div>
               <div>
                 <h4 className="font-bold text-slate-900">{leave.type}</h4>
                 <p className="text-xs text-slate-400 font-medium">{leave.dates}</p>
               </div>
             </div>
             <span className={`text-[9px] font-black text-white px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg shadow-opacity-20 ${leave.color}`}>
               {leave.status}
             </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveTab;
