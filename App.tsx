
import React, { useState, useEffect } from 'react';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Welcome from './screens/Welcome';
import LoginFace from './screens/LoginFace';
import LoginMPIN from './screens/LoginMPIN';
import Registration from './screens/Registration';
import Dashboard from './screens/Dashboard';
import { AppScreen } from './types';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('SPLASH');

  useEffect(() => {
    if (screen === 'SPLASH') {
      const timer = setTimeout(() => {
        setScreen('ONBOARDING');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case 'SPLASH':
        return <Splash />;
      case 'ONBOARDING':
        return <Onboarding onComplete={() => setScreen('WELCOME')} />;
      case 'WELCOME':
        return (
          <Welcome 
            onLogin={() => setScreen('LOGIN_FACE')} 
            onRegister={() => setScreen('REGISTRATION')} 
          />
        );
      case 'LOGIN_FACE':
        return (
          <LoginFace 
            onSuccess={() => setScreen('LOGIN_MPIN')} 
            onBack={() => setScreen('WELCOME')} 
          />
        );
      case 'LOGIN_MPIN':
        return (
          <LoginMPIN 
            onSuccess={() => setScreen('DASHBOARD')} 
            onBack={() => setScreen('LOGIN_FACE')} 
          />
        );
      case 'REGISTRATION':
        return (
          <Registration 
            onComplete={() => setScreen('DASHBOARD')} 
            onBack={() => setScreen('WELCOME')} 
          />
        );
      case 'DASHBOARD':
        return <Dashboard />;
      default:
        return <Splash />;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="w-full max-w-[400px] h-[844px] bg-background-light overflow-hidden shadow-2xl relative border-[8px] border-white rounded-[3rem] ring-1 ring-black/5">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
