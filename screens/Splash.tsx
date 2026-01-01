
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-cyan-50 via-white to-white relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="flex-1" />
      
      <div className="z-10 flex flex-col items-center animate-bounce">
        <div className="relative w-32 h-32 bg-white rounded-[2rem] shadow-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-cyan-500 text-6xl fill-1">local_hospital</span>
          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-sm">check</span>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Divyam <span className="text-cyan-500">Hospital</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-8 bg-slate-300"></div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Employee Attendance
            </p>
            <div className="h-[1px] w-8 bg-slate-300"></div>
          </div>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="w-full flex flex-col items-center gap-4 z-10">
        <div className="relative w-12 h-12">
          <svg className="animate-spin w-full h-full text-cyan-500/20" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full"></div>
        </div>
        <p className="text-xs font-medium text-slate-400">Securely connecting...</p>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-4">v2.4.0</p>
      </div>
    </div>
  );
};

export default Splash;
