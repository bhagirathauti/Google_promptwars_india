import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';
import { UserCheck } from 'lucide-react';
import BoothLookup from '../BoothLookup';

const Registration = () => {
  const { userData, updateUserData } = useStore();

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary-100 rounded-2xl">
          <UserCheck size={32} className="text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Identity & Booth Lookup</h2>
          <p className="text-slate-500">First, verify your details and find your assigned booth.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="voter-id" className="block text-sm font-medium text-slate-700 mb-2">Voter ID Number (EPIC)</label>
            <input 
              id="voter-id"
              type="text" 
              placeholder="ABC1234567"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
              value={userData.voterId}
              onChange={(e) => updateUserData({ voterId: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input 
              id="full-name"
              type="text" 
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
              value={userData.name}
              onChange={(e) => updateUserData({ name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-4">Find Your Polling Booth</label>
          <BoothLookup />
        </div>
      </div>
    </motion.div>
  );
};

export default Registration;
