import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { SIMULATION_STEPS } from '../../../shared/constants.js';
import Registration from '../components/steps/Registration';
import InkMarking from '../components/steps/InkMarking';
import PollingBooth from '../components/steps/PollingBooth';
import InteractiveEVM from '../components/InteractiveEVM';
import Chatbot from '../components/Chatbot';
import { ChevronRight, ChevronLeft, Info, RefreshCcw, AlertCircle, Bot } from 'lucide-react';

const Simulation = () => {
  const { 
    currentStep, nextStep, prevStep, fetchInsight, insight, 
    isLoading, resetSimulation, userData, explainError, aiExplanation, config 
  } = useStore();

  const [showErrorHelp, setShowErrorHelp] = useState(false);

  useEffect(() => {
    const currentStepId = SIMULATION_STEPS[currentStep]?.id;
    if (currentStepId) {
      fetchInsight(currentStepId);
      setShowErrorHelp(false);
    }
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Registration />;
      case 1: return <InkMarking />;
      case 2: return <PollingBooth />;
      case 3: return <InteractiveEVM candidates={config?.candidates} />;
      default: return null;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 0 && (!userData.voterId || !userData.boothId)) return true;
    if (currentStep === 3 && !userData.selectedCandidate) return true;
    return false;
  };

  const handleNextWithCheck = () => {
    if (isNextDisabled()) {
      const stepTitle = SIMULATION_STEPS[currentStep].title;
      const errorText = currentStep === 0 
        ? "Voter ID and Polling Booth must be selected before proceeding." 
        : "You must select a candidate on the EVM to cast your vote.";
      explainError(stepTitle, errorText);
      setShowErrorHelp(true);
      return;
    }
    nextStep();
  };

  if (currentStep >= SIMULATION_STEPS.length) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="material-card p-12"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <RefreshCcw size={40} />
          </div>
          <h2 className="text-4xl font-bold mb-4">Simulation Complete!</h2>
          <p className="text-slate-500 text-xl mb-12">
            You have successfully navigated the voting process. 
            Thank you for being an informed citizen.
          </p>
          <button onClick={resetSimulation} className="btn-primary mx-auto">
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <Chatbot />
      
      <div className="relative mb-12 px-4">
        <div className="stepper-line" />
        <div 
          className="stepper-line-active" 
          style={{ width: `${(currentStep / (SIMULATION_STEPS.length - 1)) * 100}%` }}
        />
        
        <div className="flex justify-between items-center relative">
          {SIMULATION_STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 z-10 ${
                idx <= currentStep ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'
              }`}>
                {idx + 1}
              </div>
              <span className={`hidden md:block text-xs mt-2 font-medium ${idx <= currentStep ? 'text-primary-600' : 'text-slate-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="material-card p-8 md:p-12 min-h-[500px] flex flex-col">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex justify-between items-center border-t border-slate-100 pt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`btn-secondary ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                <ChevronLeft size={20} /> Back
              </button>
              
              <button
                onClick={handleNextWithCheck}
                className={`btn-primary ${isNextDisabled() ? 'bg-slate-400 cursor-not-allowed' : ''}`}
              >
                {currentStep === SIMULATION_STEPS.length - 1 ? 'Finish' : 'Continue'} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {showErrorHelp && aiExplanation ? (
              <motion.div 
                key="error-help"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="material-card bg-amber-50 border-amber-200 p-8 sticky top-8 shadow-amber-100 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6 text-amber-600">
                  <AlertCircle size={24} />
                  <h3 className="font-bold uppercase tracking-wider text-sm">AI Procedural Help</h3>
                </div>
                <p className="text-slate-800 leading-relaxed mb-8 whitespace-pre-line">
                  {aiExplanation}
                </p>
                <button 
                  onClick={() => setShowErrorHelp(false)}
                  className="flex items-center gap-2 text-amber-700 font-bold text-sm bg-white px-4 py-2 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors shadow-sm"
                >
                  <Info size={16} /> Show General Insight
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="insight"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="material-card bg-primary-900 text-white p-8 sticky top-8"
              >
                <div className="flex items-center gap-3 mb-6 text-primary-300">
                  <Info size={24} />
                  <h3 className="font-bold uppercase tracking-wider text-sm">Educational Insight</h3>
                </div>
                
                {isLoading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-primary-800 rounded w-3/4"></div>
                    <div className="h-4 bg-primary-800 rounded w-full"></div>
                    <div className="h-4 bg-primary-800 rounded w-2/3"></div>
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed text-primary-50">
                    {insight}
                  </p>
                )}

                <div className="mt-8 pt-8 border-t border-primary-800 text-primary-400 text-xs flex items-center gap-2">
                  <Bot size={14} /> Powered by Google Gemini AI
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
