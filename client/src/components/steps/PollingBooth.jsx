import React from 'react';
import { motion } from 'framer-motion';
import { EyeOff, DoorOpen } from 'lucide-react';

const PollingBooth = () => {
  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-amber-100 rounded-2xl">
          <DoorOpen size={32} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Secret Compartment</h2>
          <p className="text-slate-500">Your choice is your secret.</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-slate-900 aspect-video flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white p-8"
        >
          <EyeOff size={64} className="mx-auto mb-6 text-amber-400" />
          <h3 className="text-2xl font-bold mb-4">Entering the Booth</h3>
          <p className="text-slate-400 max-w-sm">
            You are now inside the voting compartment. No one else is allowed here. Use the EVM to cast your vote.
          </p>
        </motion.div>
        
        {/* Animated curtains */}
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: -100 }}
          className="absolute left-0 top-0 bottom-0 w-1/4 bg-slate-800 border-r border-slate-700"
        />
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: 100 }}
          className="absolute right-0 top-0 bottom-0 w-1/4 bg-slate-800 border-l border-slate-700"
        />
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
        <p className="text-amber-800 text-sm font-medium">
          Note: Mobile phones and cameras are strictly prohibited inside the polling booth to maintain the secrecy of the ballot.
        </p>
      </div>
    </motion.div>
  );
};

export default PollingBooth;
