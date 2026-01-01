
import React from 'react';

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

const Welcome: React.FC<Props> = ({ onLogin, onRegister }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-background-light px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <header className="mb-12 flex flex-col items-center">
          <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary text-xl fill-1">local_hospital</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Divyam Hospital</span>
          </div>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
            <div className="absolute inset-4 bg-primary/5 rounded-full animate-pulse"></div>
            <div className="relative w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-white">
              <span className="material-symbols-outlined text-6xl text-primary">how_to_reg</span>
            </div>
            <div className="absolute top-4 right-4 bg-green-500 text-white p-1.5 rounded-xl border-4 border-background-light shadow-lg">
              <span className="material-symbols-outlined text-sm">check</span>
            </div>
          </div>
        </header>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Your Work, <span className="text-primary">Simplified</span>
          </h1>
          <p className="text-slate-500 font-medium px-4">
            Effortless Attendance Management for Divyam Hospital Staff.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={onLogin}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
        >
          Login
        </button>
        <button 
          onClick={onRegister}
          className="w-full border-2 border-primary/20 bg-white text-primary font-bold h-14 rounded-2xl hover:bg-primary hover:text-white active:scale-95 transition-all"
        >
          Register
        </button>
        <div className="pt-4 text-center">
          <button className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            Need Help? Contact Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
