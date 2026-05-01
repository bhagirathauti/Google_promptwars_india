import React, { useEffect, useState } from 'react';
import useStore from './store/useStore';
import Landing from './pages/Landing';
import Simulation from './pages/Simulation';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { fetchConfig, currentStep } = useStore();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <Landing key="landing" onStart={() => setIsStarted(true)} />
        ) : (
          <Simulation key="simulation" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
