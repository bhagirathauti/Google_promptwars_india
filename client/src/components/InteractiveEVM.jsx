import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Ticket, Search, Info } from 'lucide-react';
import useStore from '../store/useStore';

const InteractiveEVM = ({ candidates = [] }) => {
  const { userData, updateUserData } = useStore();
  const [isVoted, setIsVoted] = useState(false);
  const [error, setError] = useState(null);
  const [showVVPAT, setShowVVPAT] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [lastSelected, setLastSelected] = useState(null);
  
  const beepRef = useRef(null);

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
      setError("You have already cast your vote. Multiple votes are not allowed.");
      return;
    }

    setLastSelected(candidate);
    setIsVoted(true);
    setError(null);
    updateUserData({ selectedCandidate: candidate.id });

    // Simulate EVM Beep
    console.log("LONG BEEP...");
    
    // Trigger VVPAT
    setShowVVPAT(true);
    setPrinting(true);
    
    setTimeout(() => {
      setPrinting(false);
    }, 4000); // Slip visible for 4 seconds
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
      {/* EVM Control Unit */}
      <div className="material-card bg-slate-200 p-6 md:p-8 border-8 border-slate-300 rounded-[2.5rem] shadow-inner relative">
        <div className="absolute top-4 right-8 flex gap-2">
          <div className={`w-3 h-3 rounded-full ${isVoted ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-green-500 shadow-[0_0_10px_green] animate-pulse'}`} />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Ready</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between text-[10px] font-bold text-slate-400">
            <span>BALLOT UNIT - NO. 1</span>
            <span>ELECTION COMMISSION OF INDIA</span>
          </div>
          
          <div className="divide-y divide-slate-100">
            {candidates.map((c, idx) => (
              <div 
                key={c.id} 
                className={`flex items-center p-4 transition-all ${isVoted && lastSelected?.id !== c.id ? 'opacity-40 grayscale' : ''}`}
              >
                <div className="w-8 text-xs font-mono text-slate-400">{idx + 1}</div>
                <div className="w-12 h-12 flex items-center justify-center text-3xl bg-slate-50 rounded-lg mr-4 border border-slate-100">
                  {c.symbol}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 leading-tight">{c.name}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">{c.party}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    lastSelected?.id === c.id ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]' : 'bg-slate-100'
                  }`} />
                  
                  <motion.button
                    whileTap={{ y: 2 }}
                    disabled={isVoted}
                    onClick={() => handleVote(c)}
                    className={`w-14 h-10 rounded-lg flex items-center justify-center shadow-lg transition-all ${
                      isVoted ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-blue-200'
                    }`}
                    aria-label={`Vote for ${c.name}`}
                  >
                    <div className="w-7 h-7 bg-blue-400/20 rounded-full border border-white/30" />
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
              className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
            >
              <AlertCircle size={20} />
              {error}
            </motion.div>
          )}
          
          {isVoted && !error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 text-sm font-bold"
            >
              <CheckCircle2 size={20} />
              VOTE RECORDED SUCCESSFULLY
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* VVPAT Printer Unit */}
      <div className="flex flex-col gap-6">
        <div className="material-card bg-slate-800 p-8 rounded-[2.5rem] border-8 border-slate-700 shadow-2xl relative aspect-square max-w-sm mx-auto flex flex-col overflow-hidden">
          <div className="w-full h-3 bg-slate-900 rounded-full mb-8 shadow-inner" />
          
          <div className="bg-slate-950 w-full flex-1 rounded-3xl border-4 border-slate-900 p-6 flex flex-col items-center justify-center relative">
            <AnimatePresence>
              {printing && (
                <motion.div
                  initial={{ y: -200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 250, opacity: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                  className="bg-white w-48 p-5 shadow-2xl flex flex-col items-center"
                >
                  <div className="w-full border-b border-dashed border-slate-200 pb-2 mb-4 text-center text-[10px] font-bold text-slate-400">
                    E.C.I. VVPAT SLIP
                  </div>
                  <div className="text-5xl mb-3">{lastSelected?.symbol}</div>
                  <div className="font-black text-slate-900 text-center leading-tight uppercase mb-1">
                    {lastSelected?.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {lastSelected?.party}
                  </div>
                  <div className="mt-6 text-[8px] text-slate-300 font-mono">
                    ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!printing && !isVoted && (
              <div className="text-slate-700 text-center flex flex-col items-center">
                <Ticket size={48} className="opacity-10 mb-4" />
                <p className="text-xs uppercase font-bold tracking-widest opacity-20">Waiting for vote...</p>
              </div>
            )}

            {!printing && isVoted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-emerald-500 text-center flex flex-col items-center"
              >
                <Search size={48} className="opacity-20 mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest">Slip Deposited</p>
              </motion.div>
            )}
          </div>
          
          <div className="mt-4 flex justify-between px-4">
            <div className="flex gap-1">
              <div className={`w-2 h-2 rounded-full ${printing ? 'bg-orange-500 animate-pulse' : 'bg-slate-700'}`} />
              <div className={`w-2 h-2 rounded-full ${isVoted ? 'bg-green-500' : 'bg-slate-700'}`} />
            </div>
            <div className="text-[8px] font-mono text-slate-600">VVPAT_V2_PRO</div>
          </div>
        </div>
        
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
          <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
            <Info size={16} /> How it works
          </h4>
          <p className="text-blue-800 text-xs leading-relaxed">
            The VVPAT slip is visible for 7 seconds through the glass window, allowing you to verify your vote before it falls into the sealed collection box. This ensures your vote was recorded exactly as cast.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveEVM;
