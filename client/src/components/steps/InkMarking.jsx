import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Signature, AlertCircle } from 'lucide-react';
import useStore from '../../store/useStore';

const InkMarking = () => {
  const { userData, config } = useStore();
  const selectedBooth = config?.booths.find(b => b.id === userData.boothId);
  
  // Simulate a "Wrong Booth" case for demo purposes
  const isWrongBooth = userData.boothId === 'PB-003';

  if (isWrongBooth) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-red-50 border-2 border-red-200 rounded-3xl text-center"
      >
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-red-900 mb-2">Wrong Polling Station!</h3>
        <p className="text-red-700 mb-6">
          According to the electoral roll, you are assigned to a different booth. 
          You cannot vote at <strong>{selectedBooth?.name}</strong>.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary bg-red-600 hover:bg-red-700 border-none shadow-red-200 mx-auto"
        >
          Return to Start
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-100 rounded-2xl">
          <Pencil size={32} className="text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Indelible Ink</h2>
          <p className="text-slate-500">The symbol of democracy.</p>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
             <Signature size={48} className="text-slate-400" />
          </div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white"
          />
        </div>
        <h3 className="text-xl font-bold mb-2">Marking the Finger</h3>
        <p className="text-slate-500 max-w-xs">
          The polling officer marks your left forefinger with indelible ink and asks for your signature in the register.
        </p>
      </div>

      <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Did you know?</h4>
        <p className="text-indigo-700 text-sm">
          Indelible ink is manufactured by Mysore Paints and Varnish Limited, the only company authorized to make it in India.
        </p>
      </div>
    </motion.div>
  );
};

export default InkMarking;
