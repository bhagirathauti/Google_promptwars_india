import React from 'react';
import { motion } from 'framer-motion';
import { Vote, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const Landing = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 p-4 bg-primary-100 rounded-3xl"
      >
        <Vote size={64} className="text-primary-600" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900"
      >
        VoteSmart <span className="text-primary-600">Simulation</span>
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed"
      >
        Experience the journey of a voter in the world's largest democracy. 
        Step into the polling booth, learn about EVMs, and understand how every vote counts.
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        aria-label="Start the election simulation"
        className="btn-primary text-xl"
      >
        Start Simulation <ArrowRight size={24} aria-hidden="true" />
      </motion.button>

      <div className="grid md:grid-cols-3 gap-8 mt-24 text-left">
        <FeatureCard 
          icon={<ShieldCheck className="text-emerald-500" />}
          title="Secure & Private"
          description="Learn how the secret ballot ensures your choice remains yours alone."
        />
        <FeatureCard 
          icon={<HelpCircle className="text-amber-500" />}
          title="Educational"
          description="Powered by AI to provide real-time insights into the voting process."
        />
        <FeatureCard 
          icon={<Vote className="text-primary-500" />}
          title="Interactive EVM"
          description="A digital twin of the Electronic Voting Machine used in Indian polls."
        />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 w-full max-w-5xl text-left"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">General Election <span className="text-primary-600">Timeline</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TimelineItem date="Phase 1" title="Notification" desc="The President issues a notification on the advice of the EC." />
          <TimelineItem date="Phase 2" title="Nominations" desc="Candidates file papers. Scrutiny and withdrawals follow." />
          <TimelineItem date="Phase 3" title="Campaigning" desc="Parties reach out to voters. Silent period begins 48h before poll." />
          <TimelineItem date="Phase 4" title="Polling & Results" desc="Citizens cast votes, followed by counting and result declaration." />
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="material-card p-8">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-500">{description}</p>
  </div>
);

const TimelineItem = ({ date, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-primary-600 font-bold text-xs uppercase tracking-widest mb-2">{date}</div>
    <h4 className="font-bold text-lg mb-2">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
