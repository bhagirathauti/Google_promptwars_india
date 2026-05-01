import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';
import { Cpu, CheckCircle2 } from 'lucide-react';

const EVM = () => {
  const { config, userData, updateUserData } = useStore();
  const [beep, setBeep] = useState(false);

  const handleVote = (candidateId) => {
    updateUserData({ selectedCandidate: candidateId });
    setBeep(true);
    setTimeout(() => setBeep(false), 1000);
  };

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-800 rounded-2xl">
          <Cpu size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Electronic Voting Machine</h2>
          <p className="text-slate-500">Press the blue button to cast your vote.</p>
        </div>
      </div>

      <div className="bg-slate-200 p-4 md:p-8 rounded-[2rem] border-8 border-slate-300 shadow-inner max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg divide-y divide-slate-100 overflow-hidden">
          {config?.candidates.map((candidate) => (
            <div 
              key={candidate.id}
              className={`flex items-center p-4 transition-colors ${
                userData.selectedCandidate === candidate.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center text-2xl bg-slate-50 rounded-lg mr-4 border border-slate-200">
                {candidate.symbol}
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">{candidate.name}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{candidate.party}</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${
                  userData.selectedCandidate === candidate.id ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-slate-200'
                }`} />
                
                <button
                  onClick={() => handleVote(candidate.id)}
                  className={`w-12 h-10 rounded-lg flex items-center justify-center transition-all shadow-md active:translate-y-1 ${
                    userData.selectedCandidate === candidate.id 
                      ? 'bg-blue-600 shadow-blue-200' 
                      : 'bg-blue-500 hover:bg-blue-400'
                  }`}
                >
                  <div className="w-6 h-6 bg-blue-100/20 rounded-full border border-white/30" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {beep && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-3 bg-red-100 text-red-700 text-center rounded-xl font-bold animate-pulse"
          >
            LONG BEEP SOUND... VOTE REGISTERED
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EVM;
