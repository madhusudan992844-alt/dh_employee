
import React, { useState } from 'react';

const ReportsTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<'Month' | 'Year' | 'Custom'>('Month');

  const logs = [
    { date: 'Nov 01, Wed', in: '09:12 AM', bS: '1:00 PM', bE: '1:45 PM', out: '06:00 PM', status: 'Late In' },
    { date: 'Oct 31, Tue', in: '08:50 AM', bS: '1:10 PM', bE: '2:00 PM', out: '06:05 PM', status: 'On Time' },
    { date: 'Oct 30, Mon', in: '08:55 AM', bS: '1:00 PM', bE: '1:45 PM', out: '06:10 PM', status: 'On Time' }
  ];

  return (
    <div className="h-full flex flex-col px-6 pt-14 hide-scrollbar overflow-y-auto pb-40">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Monthly Overview</h2>
          <p className="text-sm text-slate-400 font-medium">November 2023</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
          <span className="material-symbols-outlined font-bold">file_download</span>
        </button>
      </header>

      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 mb-8">
        {(['Month', 'Year', 'Custom'] as const).map((mode) => (
          <button 
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${viewMode === mode ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        {[
          { label: 'Present', val: '22', icon: 'check_circle', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Absent', val: '01', icon: 'cancel', color: 'text-rose-500', bg: 'bg-rose-50' },
          { label: 'Leave', val: '02', icon: 'event_busy', color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Late In', val: '03', icon: 'schedule', color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Work Hr', val: '176h', icon: 'timer', color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Early Out', val: '01', icon: 'logout', color: 'text-purple-500', bg: 'bg-purple-50' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[2rem] border border-slate-50 shadow-sm flex flex-col items-start gap-3">
            <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-[20px] fill-1">{stat.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.val}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">Daily Activity</h3>
        {logs.map((log, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col gap-5 group hover:border-primary/20 transition-all">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
               <div>
                 <h4 className="font-bold text-slate-900">{log.date}</h4>
                 <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-1">Shift Details</p>
               </div>
               <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${log.status === 'Late In' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                 {log.status}
               </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">login</span>
                 </div>
                 <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">In</p>
                    <p className="text-xs font-bold text-slate-800">{log.in}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">logout</span>
                 </div>
                 <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Out</p>
                    <p className="text-xs font-bold text-slate-800">{log.out}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">coffee</span>
                 </div>
                 <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Break</p>
                    <p className="text-xs font-bold text-slate-800">{log.bS} - {log.bE}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">timer</span>
                 </div>
                 <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                    <p className="text-xs font-bold text-slate-800">8h 45m</p>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsTab;
