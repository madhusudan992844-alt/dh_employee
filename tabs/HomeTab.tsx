
import React, { useState, useEffect, useRef } from 'react';

type ShiftState = 'NONE' | 'DUTY' | 'BREAK' | 'POST_BREAK' | 'FINISHED';

const SwipeButton: React.FC<{ 
  onConfirm: () => void; 
  label: string;
  countLabel?: string;
  colorClass: string;
  icon: string;
  disabled?: boolean;
}> = ({ onConfirm, label, countLabel, colorClass, icon, disabled }) => {
  const [sliderPos, setSliderPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleStart = (clientX: number) => {
    if (disabled) return;
    isDragging.current = true;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const handleWidth = 64;
    const maxPath = rect.width - handleWidth - 12;
    let pos = clientX - rect.left - handleWidth / 2;
    pos = Math.max(0, Math.min(pos, maxPath));
    setSliderPos(pos);
  };

  const handleEnd = () => {
    if (!isDragging.current || !containerRef.current) return;
    isDragging.current = false;
    const rect = containerRef.current.getBoundingClientRect();
    const handleWidth = 64;
    const maxPath = rect.width - handleWidth - 12;
    
    if (sliderPos > maxPath * 0.8) {
      setSliderPos(maxPath);
      onConfirm();
      setTimeout(() => setSliderPos(0), 500);
    } else {
      setSliderPos(0);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full h-24 rounded-[2rem] p-2 relative flex items-center shadow-xl transition-all overflow-hidden ${disabled ? 'bg-slate-100' : colorClass}`}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* Label and Count */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pl-12 pr-6">
        <p className={`font-bold tracking-tight text-lg ${disabled ? 'text-slate-300' : 'text-white'}`}>
          {label}
        </p>
        {countLabel && !disabled && (
          <div className="ml-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter whitespace-nowrap">{countLabel}</span>
          </div>
        )}
      </div>

      {/* Handle */}
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-10 transition-transform duration-75 ease-out select-none ${disabled ? 'bg-slate-200' : 'bg-white cursor-grab active:cursor-grabbing'}`}
        style={{ transform: `translateX(${sliderPos}px)` }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      >
        <span className={`material-symbols-outlined text-3xl font-light ${disabled ? 'text-slate-100' : 'text-primary'}`}>
          {icon}
        </span>
      </div>
      
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <div className="flex gap-1 animate-pulse">
           {[1,2,3].map(i => <span key={i} className="material-symbols-outlined text-white text-sm">chevron_right</span>)}
        </div>
      </div>
    </div>
  );
};

const HomeTab: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [shiftStatus, setShiftStatus] = useState<ShiftState>('NONE');
  const [logs, setLogs] = useState<any>({
    checkIn: null,
    breakStart: null,
    breakEnd: null,
    checkOut: null
  });

  const shiftStartHour = 9;
  const breakStartHour = 13;
  const shiftEndHour = 18;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeHHMM = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatTimeFull = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  // Countdown Logic
  const getCountdown = (targetH: number) => {
    const target = new Date();
    target.setHours(targetH, 0, 0, 0);
    const diff = target.getTime() - time.getTime();
    if (diff <= 0) return 0;
    return Math.ceil(diff / 60000);
  };

  const lateInMinutes = getCountdown(shiftStartHour);
  const breakCountdown = getCountdown(breakStartHour);
  const checkoutCountdown = getCountdown(shiftEndHour);

  const isBreakEnabled = breakCountdown <= 15;
  const isCheckoutEnabled = checkoutCountdown <= 15;

  const handleSwipe = () => {
    const now = new Date();
    if (shiftStatus === 'NONE') {
      setLogs({ ...logs, checkIn: now });
      setShiftStatus('DUTY');
    } else if (shiftStatus === 'DUTY') {
      setLogs({ ...logs, breakStart: now });
      setShiftStatus('BREAK');
    } else if (shiftStatus === 'BREAK') {
      setLogs({ ...logs, breakEnd: now });
      setShiftStatus('POST_BREAK');
    } else if (shiftStatus === 'POST_BREAK') {
      setLogs({ ...logs, checkOut: now });
      setShiftStatus('FINISHED');
    }
  };

  return (
    <div className="h-full flex flex-col px-6 pt-14 hide-scrollbar overflow-y-auto pb-40">
      <header className="flex justify-between items-center mb-6">
        <div>
          <p className="text-slate-400 text-sm font-medium">Welcome back,</p>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dr. Julia Doe</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400">notifications</span>
          </button>
          <img 
            alt="Profile" 
            className="w-12 h-12 rounded-full ring-2 ring-primary/20"
            src="https://avatar.iran.liara.run/public/61"
          />
        </div>
      </header>

      <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-3 w-fit mb-6">
        <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
        <span className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' })}</span>
      </div>

      {/* Main Status Card */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden mb-8">
        <div className="absolute top-6 left-6 flex items-center gap-2">
           <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${shiftStatus === 'NONE' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
             {shiftStatus === 'NONE' ? 'Not Checked In' : 'On Duty'}
           </div>
        </div>
        <div className="absolute top-6 right-6">
           <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-300 text-sm">info</span>
           </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Current Time</p>
          <h1 className="text-7xl font-bold text-slate-900 tracking-tighter flex items-end justify-center">
             {formatTimeHHMM(time)}
             <span className="text-2xl text-slate-400 ml-2 mb-2 font-bold uppercase">{time.getHours() >= 12 ? 'PM' : 'AM'}</span>
          </h1>
        </div>

        <div className="mt-12 pt-8 border-t border-dashed border-slate-100 flex justify-between">
           <div>
             <p className="text-xs font-bold text-slate-400 mb-1">Shift Starts</p>
             <p className="text-base font-black text-slate-800">09:00 AM</p>
           </div>
           <div className="text-right">
             <p className="text-xs font-bold text-slate-400 mb-1">Late In</p>
             <p className={`text-base font-black ${lateInMinutes > 0 ? 'text-orange-500' : 'text-slate-800'}`}>
                {lateInMinutes > 0 ? `${lateInMinutes} mins` : 'On Time'}
             </p>
           </div>
        </div>
      </div>

      {/* Action Area: Only one visible at a time */}
      <div className="mb-10">
        {shiftStatus === 'NONE' && (
          <SwipeButton 
            icon="fingerprint" 
            label="Swipe to Check In" 
            countLabel={`${lateInMinutes}m left`} 
            colorClass="bg-[#00BCD4]" 
            onConfirm={handleSwipe} 
          />
        )}
        {shiftStatus === 'DUTY' && (
          <SwipeButton 
            icon="coffee" 
            label="Swipe for Break" 
            countLabel={isBreakEnabled ? "" : `${breakCountdown}m left`} 
            colorClass="bg-teal-500" 
            disabled={!isBreakEnabled}
            onConfirm={handleSwipe} 
          />
        )}
        {shiftStatus === 'BREAK' && (
          <SwipeButton 
            icon="timer" 
            label="Swipe to End Break" 
            colorClass="bg-orange-500" 
            onConfirm={handleSwipe} 
          />
        )}
        {shiftStatus === 'POST_BREAK' && (
          <SwipeButton 
            icon="logout" 
            label="Swipe to Check Out" 
            countLabel={isCheckoutEnabled ? "" : `${checkoutCountdown}m left`} 
            colorClass="bg-rose-500" 
            disabled={!isCheckoutEnabled}
            onConfirm={handleSwipe} 
          />
        )}
        {shiftStatus === 'FINISHED' && (
          <div className="w-full bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center justify-center gap-3">
             <span className="material-symbols-outlined text-emerald-500 text-3xl">verified</span>
             <span className="text-emerald-700 font-bold">Shift Completed Successfully</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Your Overview</h3>
        <div className="grid grid-cols-2 gap-4 pb-10">
           <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                 <span className="material-symbols-outlined fill-1">check_circle</span>
              </div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Weekly</p>
              <h4 className="text-2xl font-black text-slate-900">42 <span className="text-xs font-bold text-slate-400">h</span></h4>
              <p className="text-[10px] font-bold text-slate-400">Total Hours</p>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                 <span className="material-symbols-outlined fill-1">description</span>
              </div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Month</p>
              <h4 className="text-2xl font-black text-slate-900">22 <span className="text-xs font-bold text-slate-400">d</span></h4>
              <p className="text-[10px] font-bold text-slate-400">Present</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
