import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Search, Info } from 'lucide-react';

const VVPATPrinter = ({ printing, isVoted, lastSelected }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="material-card bg-slate-800 p-6 md:p-8 rounded-[2.5rem] border-8 border-slate-700 shadow-2xl relative aspect-square w-full max-w-[320px] mx-auto flex flex-col overflow-hidden">
        <div className="w-full h-2.5 bg-slate-900 rounded-full mb-6 shadow-inner" />
        
        <div className="bg-slate-950 w-full flex-1 rounded-2xl border-4 border-slate-900 p-4 md:p-6 flex flex-col items-center justify-center relative">
          <AnimatePresence>
            {printing && (
              <motion.div
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 250, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                className="bg-white w-32 md:w-40 p-4 shadow-2xl flex flex-col items-center"
              >
                <div className="w-full border-b border-dashed border-slate-200 pb-1.5 mb-3 text-center text-[8px] font-bold text-slate-400">
                  E.C.I. VVPAT SLIP
                </div>
                <div className="text-3xl md:text-4xl mb-2">{lastSelected?.symbol}</div>
                <div className="font-black text-slate-900 text-center text-[10px] md:text-xs leading-tight uppercase mb-0.5">
                  {lastSelected?.name}
                </div>
                <div className="text-[7px] md:text-[8px] text-slate-500 font-bold uppercase tracking-widest">
                  {lastSelected?.party}
                </div>
                <div className="mt-4 text-[6px] text-slate-300 font-mono">
                  ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!printing && !isVoted && (
            <div className="text-slate-700 text-center flex flex-col items-center">
              <Ticket size={40} className="opacity-10 mb-2" />
              <p className="text-[9px] uppercase font-bold tracking-widest opacity-20">Waiting for vote...</p>
            </div>
          )}

          {!printing && isVoted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-500 text-center flex flex-col items-center"
            >
              <Search size={40} className="opacity-20 mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Slip Deposited</p>
            </motion.div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between px-2">
          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${printing ? 'bg-orange-500 animate-pulse' : 'bg-slate-700'}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${isVoted ? 'bg-green-500' : 'bg-slate-700'}`} />
          </div>
          <div className="text-[7px] font-mono text-slate-600 uppercase">VVPAT System Ready</div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
        <h4 className="font-bold text-blue-900 text-[11px] mb-1.5 flex items-center gap-1.5">
          <Info size={14} /> VVPAT Verification
        </h4>
        <p className="text-blue-800 text-[10px] leading-relaxed">
          The Voter Verifiable Paper Audit Trail (VVPAT) allows you to verify that your vote was cast correctly. A paper slip showing your selection is visible for 7 seconds.
        </p>
      </div>
    </div>
  );
};

export default VVPATPrinter;
