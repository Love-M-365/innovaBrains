import { motion } from 'motion/react';
import { ArrowLeft, Clock } from 'lucide-react';
import React from 'react';

interface PortalProps {
  category: string;
  onBack: () => void;
}

export const Portal: React.FC<PortalProps> = ({ category, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col bg-brand-light overflow-y-auto"
    >
      {/* Background elements */}
      <div className="mesh-bg opacity-30" />
      <div className="grid-bg" />
      
      {/* Abstract Background Text */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-display font-black text-brand-dark/[0.02] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap rotate-12">
        {category}
      </div>

      {/* Navbar */}
      <nav className="p-12 relative z-10 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark/40 hover:text-accent transition-all group px-8 py-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-brand-dark/5 shadow-2xl"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
          Esc Out
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-dark/40">
            Secure Stream: Active
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-20 pb-20 px-8 text-center relative z-10">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl"
        >
          <div className="mb-14 inline-flex items-center gap-4 px-8 py-3 rounded-2xl border border-accent/10 bg-white/50 backdrop-blur-lg shadow-sm">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
              Under Construction • Coming Soon
            </span>
          </div>

          <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-display font-bold text-brand-dark tracking-tighter uppercase mb-6 leading-none break-words">
            {category}
          </h1>

          <div className="w-32 h-[1px] bg-brand-dark/10 mx-auto mb-8 md:mb-12" />

          <p className="text-lg md:text-2xl text-brand-dark/60 font-sans max-w-2xl mx-auto leading-relaxed font-light tracking-tight px-4">
            We are engineering a proprietary <strong>{category.toLowerCase()}</strong> ecosystem. 
            Innova Brains is merging high-level strategy with automated intelligence to redefine this vertical.
          </p>

         
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-12 flex justify-between items-center bg-white/50 backdrop-blur-xl border-t border-brand-dark/5 mt-auto relative z-10">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-brand-dark/50 uppercase tracking-[0.4em] font-black italic">
            Innova Brains Intelligence
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-accent/20" />
            <div className="w-2 h-2 rounded-full bg-accent/40" />
            <div className="w-2 h-2 rounded-full bg-accent/60" />
            <div className="w-2 h-2 rounded-full bg-accent/80" />
          </div>
        </div>

        <div className="text-[10px] text-brand-dark/30 uppercase tracking-[0.4em] font-bold">
          Projected Deployment Q3 2026
        </div>
      </footer>
    </motion.div>
  );
};