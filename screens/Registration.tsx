
import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const Registration: React.FC<Props> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="flex items-center justify-between p-6 pt-12 border-b border-slate-50 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Registration</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
        <div>
          <div className="flex justify-between items-end mb-4">
             <div>
               <p className="text-sm font-bold text-primary mb-1">Step {step} of 3</p>
               <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                 {step === 1 ? 'Personal Details' : step === 2 ? 'Work Schedule' : 'Face Registration'}
               </h2>
             </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div 
                key={s} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-primary' : 'bg-slate-100'}`} 
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 ml-1">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">badge</span>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 pl-12 focus:ring-primary focus:border-primary" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 ml-1">Mobile Number</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">smartphone</span>
                <input 
                  type="tel" 
                  placeholder="Enter mobile number" 
                  className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 pl-12 focus:ring-primary focus:border-primary" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 ml-1">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                <input 
                  type="password" 
                  placeholder="Create a password" 
                  className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 pl-12 focus:ring-primary focus:border-primary" 
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 ml-1">Department</label>
              <select className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-4 focus:ring-primary focus:border-primary outline-none">
                <option>Select Department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>General Medicine</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Check-in</label>
                 <input type="time" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-4" defaultValue="09:00" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Check-out</label>
                 <input type="time" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-4" defaultValue="18:00" />
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center space-y-6">
             <div className="relative size-64 mb-4">
               <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
               <div className="relative w-full h-full rounded-full border-4 border-primary overflow-hidden shadow-2xl bg-slate-100 flex items-center justify-center">
                 <span className="material-symbols-outlined text-8xl text-primary/50">face</span>
               </div>
               <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-lg border border-slate-100 flex items-center gap-2">
                 <div className="w-2 h-2 bg-primary animate-pulse rounded-full"></div>
                 <span className="text-xs font-bold text-primary uppercase tracking-widest">Live Preview</span>
               </div>
             </div>
             <p className="text-center text-slate-500 text-sm font-medium px-4">
               Position your face within the circle to register your biometric identity for quick attendance marking.
             </p>
          </div>
        )}
      </div>

      <footer className="p-6 bg-white border-t border-slate-50 sticky bottom-0 z-10">
        <button 
          onClick={nextStep}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>{step === 3 ? 'Register Account' : 'Next Step'}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};

export default Registration;
