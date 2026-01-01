
import React, { useRef, useEffect, useState } from 'react';

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const LoginFace: React.FC<Props> = ({ onSuccess, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Position your face');

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        // Simulated auto-detection with status updates
        setTimeout(() => {
          setFaceDetected(true);
          setStatusMessage('Face alignment successful');
        }, 1800);
      } catch (err) {
        console.error("Camera access error:", err);
        setStatusMessage('Camera access denied');
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScan = () => {
    if (!faceDetected) return;
    setScanning(true);
    let p = 0;
    const messages = [
      'Analyzing features...',
      'Verifying biometrics...',
      'Matching patterns...',
      'Securely authenticating...'
    ];
    
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);
      
      const msgIndex = Math.floor((p / 100) * messages.length);
      if (messages[msgIndex] && statusMessage !== messages[msgIndex]) {
        setStatusMessage(messages[msgIndex]);
      }

      if (p >= 100) {
        clearInterval(interval);
        setStatusMessage('Identity Verified');
        setTimeout(onSuccess, 600);
      }
    }, 40);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white relative">
      <header className="absolute top-0 w-full flex items-center justify-between p-6 pt-12 z-50">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
          <span className="material-symbols-outlined text-sm text-primary fill-1 animate-pulse">security</span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Encrypted Scan</span>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {/* Real Camera Feed */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-x-[-1]" 
        />
        
        {/* Dark Scrim */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Scanning Portal Visuals */}
        <div className="relative z-20 flex items-center justify-center">
          {/* Main Frame */}
          <div className="relative w-80 h-80 rounded-full border-2 border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-visible">
            
            {/* Dynamic Face Box */}
            {faceDetected && (
              <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-72 border-2 border-primary/40 rounded-[2.5rem] transition-all duration-700 ${scanning ? 'scale-95' : 'scale-100'}`}>
                {/* Tech Corners */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary shadow-[0_0_15px_rgba(66,124,240,0.5)]"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary shadow-[0_0_15px_rgba(66,124,240,0.5)]"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary shadow-[0_0_15px_rgba(66,124,240,0.5)]"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary shadow-[0_0_15px_rgba(66,124,240,0.5)]"></div>
                
                {/* Horizontal Scanning Beam */}
                {scanning && (
                  <div 
                    className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_20px_rgba(66,124,240,0.8)] z-10 transition-all duration-75" 
                    style={{ top: `${progress}%` }}
                  />
                )}
                
                {/* Center Target */}
                {!scanning && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border border-white/20 rounded-full flex items-center justify-center animate-ping">
                      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Circular Progress Indicators */}
            <div className="absolute inset-[-20px] pointer-events-none">
               <svg className="w-[360px] h-[360px] -rotate-90">
                 {/* Outer Static Ring */}
                 <circle 
                    cx="180" cy="180" r="160" 
                    className="stroke-white/5 fill-none" 
                    strokeWidth="1" 
                 />
                 {/* Inner Decorative Dashed Ring */}
                 <circle 
                    cx="180" cy="180" r="150" 
                    className="stroke-primary/10 fill-none" 
                    strokeWidth="1" 
                    strokeDasharray="4 8"
                 />
                 {/* Main Progress Ring */}
                 <circle 
                    cx="180" cy="180" r="160" 
                    className="stroke-primary fill-none transition-all duration-100 ease-out" 
                    strokeWidth="4" 
                    strokeDasharray="1005" 
                    strokeDashoffset={1005 - (1005 * progress / 100)}
                    strokeLinecap="round"
                 />
               </svg>
            </div>
          </div>
        </div>

        {/* Ambient Tech Labels */}
        <div className="absolute bottom-1/4 w-full flex justify-between px-12 z-30 pointer-events-none opacity-40">
           <div className="text-[8px] font-bold uppercase tracking-widest text-primary">Biometric Data: Stream_001</div>
           <div className="text-[8px] font-bold uppercase tracking-widest text-primary">Status: {faceDetected ? 'LOCKED' : 'SEARCHING'}</div>
        </div>
      </div>

      {/* Bottom Control Sheet */}
      <div className="bg-white rounded-t-[3rem] p-8 pb-12 flex flex-col items-center z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]">
        <div className="w-12 h-1 bg-slate-100 rounded-full mb-8"></div>
        
        <div className="text-center space-y-2 mb-10">
          <div className="flex items-center justify-center gap-2 mb-1">
             <div className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`}></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
               {faceDetected ? 'Face Verified' : 'Searching for Subject'}
             </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {scanning ? 'Authenticating...' : faceDetected ? 'Identity Ready' : 'Biometric Check'}
          </h2>
          <p className="text-slate-400 font-medium max-w-[280px] mx-auto text-sm leading-relaxed">
            {statusMessage}
          </p>
        </div>

        <button 
          onClick={startScan}
          disabled={!faceDetected || scanning}
          className={`w-full font-bold h-16 rounded-2xl shadow-xl active:scale-[0.97] transition-all flex items-center justify-center gap-3 overflow-hidden relative ${
            scanning ? 'bg-slate-50 text-slate-400 cursor-wait' : 
            faceDetected ? 'bg-primary text-white shadow-primary/30' : 
            'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {scanning ? (
            <div className="flex items-center gap-3">
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <span className="font-bold tracking-wide">Processing {progress}%</span>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined text-2xl">face_unlock</span>
              <span className="font-bold tracking-wide">{faceDetected ? 'Start Recognition' : 'Waiting for Device...'}</span>
            </>
          )}
        </button>

        <p className="mt-8 text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
          Powered by Divyam Health Security
        </p>
      </div>
    </div>
  );
};

export default LoginFace;
