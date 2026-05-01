import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';
import { Ticket, Search } from 'lucide-react';

const VVPAT = () => {
  const { userData, config } = useStore();
  const [printing, setPrinting] = useState(true);
  
  const candidate = config?.candidates.find(c => c.id === userData.selectedCandidate);

  useEffect(() => {
    const timer = setTimeout(() => setPrinting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-100 rounded-2xl">
          <Ticket size={32} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">VVPAT Verification</h2>
          <p className="text-slate-500">Voter Verifiable Paper Audit Trail.</p>
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-[2rem] border-8 border-slate-700 shadow-2xl relative max-w-md mx-auto aspect-square flex flex-col items-center justify-start overflow-hidden">
        <div className="w-full h-4 bg-slate-900 rounded-full mb-8 shadow-inner" />
        
        <div className="bg-slate-950 w-full flex-1 rounded-2xl border-4 border-slate-900 p-6 flex flex-col items-center justify-center relative">
          <div className="absolute top-2 right-4 text-[10px] text-slate-700 font-mono">SECURE VIEWPORT</div>
          
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={printing ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white w-48 p-4 shadow-lg flex flex-col items-center"
          >
            <div className="w-full border-b border-dashed border-slate-200 pb-2 mb-2 text-center text-[10px] font-bold text-slate-400">
              ELECTION COMMISSION OF INDIA
            </div>
            <div className="text-4xl mb-2">{candidate?.symbol || '❓'}</div>
            <div className="font-bold text-slate-900">{candidate?.name || 'Unknown'}</div>
            <div className="text-[10px] text-slate-500">{candidate?.party || 'Independent'}</div>
            <div className="mt-4 text-[8px] text-slate-300">REF: {Math.random().toString(16).slice(2, 10).toUpperCase()}</div>
          </motion.div>

          {!printing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-400 text-center"
            >
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm font-medium">The slip has dropped into the sealed box.</p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
        <p className="text-emerald-800 text-sm">
          The VVPAT slip is visible for <strong>7 seconds</strong> through the glass window, allowing you to verify your vote before it falls into the collection box.
        </p>
      </div>
    </motion.div>
  );
};

export default VVPAT;
