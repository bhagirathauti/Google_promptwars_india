import React, { useEffect, useState, Suspense, lazy } from 'react';
import useStore from './store/useStore';
import { AnimatePresence } from 'framer-motion';

const Landing = lazy(() => import('./pages/Landing'));
const Simulation = lazy(() => import('./pages/Simulation'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

function App() {
  const { fetchConfig, currentStep } = useStore();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <main id="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <Landing key="landing" onStart={() => setIsStarted(true)} />
            ) : (
              <Simulation key="simulation" />
            )}
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
