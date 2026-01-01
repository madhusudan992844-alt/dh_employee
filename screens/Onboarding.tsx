
import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
}

const slides = [
  {
    title: "Effortless Time Management",
    description: "Manage your work hours and breaks with ease.",
    icon: "timelapse",
    color: "bg-blue-500",
    bg: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Accurate Location Tracking",
    description: "Ensuring precise check-ins wherever you are.",
    icon: "location_on",
    color: "bg-teal-500",
    bg: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Secure Face Recognition",
    description: "Your fast and secure way to mark attendance.",
    icon: "face_unlock",
    color: "bg-primary",
    bg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
  }
];

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="absolute top-12 right-6 z-20">
        <button onClick={onComplete} className="text-slate-400 font-bold text-sm tracking-wide py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors">
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
        <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center mb-12">
          <div className={`absolute inset-0 ${slides[index].color} opacity-10 rounded-[3rem] blur-2xl transition-all duration-500 animate-pulse`}></div>
          <div className="relative w-full h-full rounded-[2.5rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center overflow-hidden">
             <span className={`material-symbols-outlined text-8xl ${index === 2 ? 'text-primary' : index === 1 ? 'text-teal-500' : 'text-blue-500'} transition-all duration-500`}>
                {slides[index].icon}
             </span>
          </div>
        </div>

        <div className="text-center space-y-4 max-w-xs transition-all duration-500">
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            {slides[index].title}
          </h2>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            {slides[index].description}
          </p>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center gap-8 bg-white z-10">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-primary' : 'w-2 bg-slate-200'}`} 
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>{index === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
