import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Users, Briefcase, Globe } from 'lucide-react';
import { CategoryCard } from './components/CategoryCard';
import { Portal } from './components/Portal';

// ✅ Import images (Vercel-safe)
import t1 from '../assets/t1.jpg';
import t2 from '../assets/t2.jpg';
import t3 from '../assets/t3.jpg';
import t4 from '../assets/t4.jpg';

import h1 from '../assets/h1.jpg';
import h2 from '../assets/h2.jpg';
import h3 from '../assets/h3.jpg';
import h4 from '../assets/h4.jpg';

import b1 from '../assets/b1.jpg';
import b2 from '../assets/b2.jpg';
import b3 from '../assets/b3.jpg';
import b4 from '../assets/b4.jpg';

const CATEGORIES = [
  {
    id: 'travel',
    title: 'Travel',
    description: 'Expert travel booking services. From luxury getaways to corporate logistics, we handle every detail of your journey.',
    icon: Plane,
    images: [t1, t2, t3, t4],
    accent: '#6366F1'
  },
  {
    id: 'hr',
    title: 'HR',
    description: 'Comprehensive HR management solutions. Empowering your workforce through innovative talent acquisition and people systems.',
    icon: Users,
    images: [h1, h2, h3, h4],
    accent: '#10B981'
  },
  {
    id: 'consulting',
    title: 'Business consulting',
    description: 'Strategic consulting. Navigating complexity with data-driven insights to scale and transform your enterprise.',
    icon: Briefcase,
    images: [b1, b2, b3, b4],
    accent: '#F59E0B'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null);

  const selectedData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Layers */}
      <div className="mesh-bg opacity-[0.25]" />
      <div className="grid-bg" />
      
      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} // ✅ always smooth, no dependency
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col min-h-screen relative z-10"
          >
            {/* Nav */}
            <nav className="flex justify-between items-center px-6 md:px-12 py-8 md:py-10 z-30">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] md:rounded-[1.2rem] bg-brand-dark flex items-center justify-center text-white shadow-2xl transition-all group-hover:rotate-6 group-hover:scale-105">
                  <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="font-display font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-sm md:text-base text-brand-dark leading-none">Innova Brains</span>
                    <span className="text-[8px] md:text-[10px] font-bold text-accent uppercase tracking-[0.3em] md:tracking-[0.4em] mt-1">Global Intelligence</span>
                </div>
              </div>
              <div className="hidden lg:flex gap-16 text-[10px] uppercase font-bold tracking-[0.4em] text-brand-dark/40">
                <a href="#" className="hover:text-accent transition-all hover:tracking-[0.5em] relative group/nav">
                    Vision
                    <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all group-hover/nav:w-full" />
                </a>
                <a href="#" className="hover:text-accent transition-all hover:tracking-[0.5em] relative group/nav">
                    Insights
                    <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all group-hover/nav:w-full" />
                </a>
                <a href="#" className="hover:text-accent transition-all hover:tracking-[0.5em] relative group/nav">
                    Partners
                    <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all group-hover/nav:w-full" />
                </a>
              </div>
              <div className="lg:hidden p-2 rounded-xl bg-brand-dark/5">
                <div className="w-5 h-0.5 bg-brand-dark mb-1 ml-auto" />
                <div className="w-3 h-0.5 bg-brand-dark/60 ml-auto" />
              </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 pb-32 relative">
              <div className="text-center mb-16 md:mb-28 max-w-5xl relative">
                
                <motion.h1 
                   initial={{ y: 40, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                   className="text-5xl md:text-7xl lg:text-[10rem] font-display font-bold tracking-tighter uppercase mb-6 md:mb-10 text-brand-dark leading-[0.9] md:leading-[0.85] text-balance"
                >
                   Innova <br className="hidden md:block"/> <span className="text-accent underline decoration-accent/10 underline-offset-12">Brains</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-brand-dark/40 font-sans tracking-[0.1em] uppercase text-xs md:text-sm font-bold max-w-2xl mx-auto leading-relaxed border-t border-brand-dark/5 pt-8 md:pt-10"
                >
                  Empowering the Global Enterprise through Precision Travel, Talent Management, and Strategic Consulting.
                </motion.p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 w-full max-w-7xl px-4 relative">
                {CATEGORIES.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (idx * 0.15), type: "spring", damping: 15 }}
                  >
                    <CategoryCard 
                      {...cat}
                      index={idx}
                      onClick={() => setActiveCategory(cat.id)}
                      accentColor={cat.accent}
                    />
                  </motion.div>
                ))}
              </div>
            </main>

            {/* Footer */}
            <footer className="px-12 py-10 flex flex-col md:row justify-between items-center gap-8 mt-auto border-t border-brand-dark/5 bg-white/30 backdrop-blur-md">
                <div className="flex flex-col gap-1 items-center md:items-start text-[10px] text-brand-dark/30 font-bold uppercase tracking-[0.3em]">
                    <p>© 2026 Innova Brains</p>
                </div>
                <div className="flex gap-12 text-[10px] text-brand-dark/40 font-bold uppercase tracking-[0.3em]">
                    <span className="hover:text-accent cursor-pointer transition-all hover:-translate-y-1">Ethics</span>
                    <span className="hover:text-accent cursor-pointer transition-all hover:-translate-y-1">Manifesto</span>
                    <span className="hover:text-accent cursor-pointer transition-all hover:-translate-y-1">Privacy</span>
                </div>
            </footer>
          </motion.div>
        ) : (
          <Portal 
            key="portal" 
            category={selectedData?.title || ''} 
            onBack={() => setActiveCategory(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}