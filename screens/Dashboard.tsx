
import React, { useState } from 'react';
import { DashboardTab } from '../types';
import HomeTab from '../tabs/HomeTab';
import ReportsTab from '../tabs/ReportsTab';
import LeaveTab from '../tabs/LeaveTab';
import ProfileTab from '../tabs/ProfileTab';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('HOME');
  const [showLocation, setShowLocation] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'HOME': return <HomeTab />;
      case 'REPORTS': return <ReportsTab />;
      case 'LEAVE': return <LeaveTab />;
      case 'PROFILE': return <ProfileTab />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background-light">
      <div className="flex-1 overflow-hidden relative">
        {renderTab()}

        {/* Live Location Overlay Modal */}
        {showLocation && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end animate-in fade-in duration-300">
             <div className="w-full bg-white rounded-t-[3rem] p-10 animate-in slide-in-from-bottom duration-500 shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
                <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-10"></div>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Live Location</h3>
                    <p className="text-sm text-slate-400 font-medium">Real-time Hospital Perimeter Tracking</p>
                  </div>
                  <button onClick={() => setShowLocation(false)} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-slate-400">close</span>
                  </button>
                </div>
                
                <div className="w-full h-64 bg-slate-100 rounded-[2.5rem] mb-10 relative overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner">
                   <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=16&size=600x400&scale=2&style=feature:all|element:all|saturation:-100|lightness:10')] bg-cover opacity-60"></div>
                   
                   {/* Scanning Pulse Visual */}
                   <div className="relative">
                      <div className="w-24 h-24 bg-primary/20 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl relative border-4 border-primary">
                        <span className="material-symbols-outlined text-primary text-3xl animate-bounce">location_on</span>
                      </div>
                   </div>

                   <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-2 shadow-sm">
                         <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
                         <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Active: On Duty</p>
                      </div>
                      <div className="bg-primary px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                         <span className="material-symbols-outlined text-white text-[14px]">wifi</span>
                         <p className="text-[10px] font-black text-white uppercase tracking-widest">High Accuracy</p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-black uppercase mb-1 tracking-widest">Coordinates</p>
                      <p className="text-sm font-bold text-slate-800 tracking-tight">28.6139° N, 77.2090° E</p>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-black uppercase mb-1 tracking-widest">Zone Accuracy</p>
                      <p className="text-sm font-bold text-slate-800 tracking-tight">Main Wing ~ 2m</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      <nav className="h-[100px] bg-slate-950 mx-6 mb-8 rounded-[2.5rem] flex items-center justify-around px-4 relative z-50 shadow-2xl">
        <button 
          onClick={() => setActiveTab('HOME')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'HOME' ? 'text-primary' : 'text-slate-600'}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'HOME' ? 'bg-primary text-white shadow-[0_0_20px_rgba(66,124,240,0.4)]' : 'hover:bg-white/5'}`}>
            <span className="material-symbols-outlined text-[24px]">home</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Home</span>
        </button>

        <button 
          onClick={() => setActiveTab('REPORTS')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'REPORTS' ? 'text-primary' : 'text-slate-600'}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'REPORTS' ? 'bg-primary text-white shadow-[0_0_20px_rgba(66,124,240,0.4)]' : 'hover:bg-white/5'}`}>
            <span className="material-symbols-outlined text-[24px]">bar_chart</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Reports</span>
        </button>

        <button 
          onClick={() => setShowLocation(true)}
          className="flex-1 flex flex-col items-center justify-center relative group"
        >
          <div className="w-[72px] h-[72px] bg-white rounded-3xl flex items-center justify-center shadow-2xl border-4 border-slate-950 -translate-y-8 active:scale-95 transition-all group-hover:-translate-y-10 duration-300">
            <span className="material-symbols-outlined text-primary text-[36px] fill-1">location_on</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 -mt-6">Location</span>
        </button>

        <button 
          onClick={() => setActiveTab('LEAVE')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'LEAVE' ? 'text-primary' : 'text-slate-600'}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'LEAVE' ? 'bg-primary text-white shadow-[0_0_20px_rgba(66,124,240,0.4)]' : 'hover:bg-white/5'}`}>
            <span className="material-symbols-outlined text-[24px]">event_busy</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Leave</span>
        </button>

        <button 
          onClick={() => setActiveTab('PROFILE')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'PROFILE' ? 'text-primary' : 'text-slate-600'}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'PROFILE' ? 'bg-primary text-white shadow-[0_0_20px_rgba(66,124,240,0.4)]' : 'hover:bg-white/5'}`}>
            <span className="material-symbols-outlined text-[24px]">person</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
