
import React, { useState } from 'react';

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const LoginMPIN: React.FC<Props> = ({ onSuccess, onBack }) => {
  const [pin, setPin] = useState<string[]>([]);

  const handlePress = (val: string) => {
    if (pin.length < 4) {
      const newPin = [...pin, val];
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(onSuccess, 500);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="h-full flex flex-col bg-background-light">
      <header className="flex items-center p-6 pt-12">
        <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center px-6 pt-4">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full p-1 bg-white shadow-md">
            <img 
              alt="Doctor" 
              className="w-full h-full rounded-full object-cover" 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop" 
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-[3px] border-background-light">
             <span className="material-symbols-outlined text-[14px]">lock</span>
          </div>
        </div>

        <div className="text-center space-y-1 mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Welcome, Dr. Sarah</h2>
          <p className="text-slate-400 text-sm font-medium">Enter your 4-digit MPIN to verify</p>
        </div>

        <div className="flex gap-4 mb-16">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 transition-all ${pin[i] ? 'bg-primary border-primary shadow-glow' : 'border-slate-300'}`}
            />
          ))}
        </div>

        <div className="w-full max-w-[320px] grid grid-cols-3 gap-y-6 gap-x-8 justify-items-center">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button 
              key={num}
              onClick={() => handlePress(num)}
              className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-xl font-bold hover:bg-slate-50 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button className="w-16 h-16 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">fingerprint</span>
          </button>
          <button 
            onClick={() => handlePress('0')}
            className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-xl font-bold hover:bg-slate-50 active:scale-95 transition-all"
          >
            0
          </button>
          <button 
            onClick={handleBackspace}
            className="w-16 h-16 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined text-2xl">backspace</span>
          </button>
        </div>
      </div>

      <div className="p-8 pb-12 flex flex-col items-center gap-4">
        <button className="text-primary font-bold text-sm">Forgot MPIN?</button>
        <button className="w-full bg-white border border-slate-200 text-slate-500 font-bold h-12 rounded-xl text-sm">
          Use Password Instead
        </button>
      </div>
    </div>
  );
};

export default LoginMPIN;
