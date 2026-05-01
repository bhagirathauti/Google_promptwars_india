import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Ticket, Search, Info } from 'lucide-react';
import useStore from '../store/useStore';

const InteractiveEVM = ({ candidates = [], onVote }) => {
  const { userData, updateUserData } = useStore();
  const [isVoted, setIsVoted] = useState(false);
  const [error, setError] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  
  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isVoted) return;
      if (e.key >= '1' && e.key <= String(candidates.length)) {
        const index = parseInt(e.key) - 1;
        handleVote(candidates[index]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [candidates, isVoted]);

  const handleVote = (candidate) => {
    if (isVoted) {
      setError("You have already cast your vote.");
      return;
    }

    setLastSelected(candidate);
    setIsVoted(true);
    setError(null);
    updateUserData({ selectedCandidate: candidate.id });

    if (onVote) {
      onVote(candidate);
    }
  };

  return (
    <div className="w-full">
      {/* EVM Control Unit */}
      <div className="material-card bg-slate-200 p-3 sm:p-5 md:p-6 border-4 md:border-8 border-slate-300 rounded-[2rem] md:rounded-[2.5rem] shadow-inner relative w-full">
        <div className="absolute top-3 right-4 md:top-5 md:right-6 flex items-center gap-1.5">
          <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${isVoted ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-green-500 shadow-[0_0_8px_green] animate-pulse'}`} />
          <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-tighter">Ready</span>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-slate-100">
          <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-100 flex justify-between text-[8px] md:text-[9px] font-bold text-slate-400">
            <span>BALLOT UNIT - NO. 1</span>
            <span>E. C. I.</span>
          </div>
          
          <div className="divide-y divide-slate-100">
            {candidates.map((c, idx) => (
              <div 
                key={c.id} 
                className={`flex items-center p-2.5 md:p-3.5 transition-all ${isVoted && lastSelected?.id !== c.id ? 'opacity-40 grayscale' : ''}`}
              >
                <div className="w-5 md:w-6 text-[9px] md:text-[10px] font-mono text-slate-400 shrink-0">{idx + 1}</div>
                <div className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-xl md:text-2xl bg-slate-50 rounded-lg mx-2 md:mx-3 border border-slate-100 shrink-0">
                  {c.symbol}
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="font-black text-slate-900 leading-tight text-xs md:text-sm break-words">{c.name}</div>
                  <div className="text-[7px] md:text-[9px] text-slate-500 uppercase font-bold tracking-wider leading-none mt-0.5">{c.party}</div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-4 shrink-0">
                  <div className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300 ${
                    lastSelected?.id === c.id ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]' : 'bg-slate-100'
                  }`} />
                  
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    disabled={isVoted}
                    onClick={() => handleVote(c)}
                    className={`w-10 h-8 md:w-12 md:h-9 rounded-lg flex items-center justify-center shadow-md transition-all ${
                      isVoted ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-blue-100'
                    }`}
                    aria-label={`Vote for ${c.name}`}
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-400/20 rounded-full border border-white/30" />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-xs font-bold"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}
          
          {isVoted && !error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest"
            >
              <CheckCircle2 size={16} />
              Vote Recorded
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveEVM;
