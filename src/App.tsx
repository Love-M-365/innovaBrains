import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Users, Briefcase } from 'lucide-react';
import { CategoryCard } from './components/CategoryCard';
import { Portal } from './components/Portal';

// ✅ Import images
import t1 from './assets/t1.jpg';
import t2 from './assets/t2.jpg';
import t3 from './assets/t3.jpg';
import t4 from './assets/t4.jpg';

import h1 from './assets/h1.jpg';
import h2 from './assets/h2.jpg';
import h3 from './assets/h3.jpg';
import h4 from './assets/h4.jpg';

import b1 from './assets/b1.jpg';
import b2 from './assets/b2.jpg';
import b3 from './assets/b3.jpg';
import b4 from './assets/b4.jpg';

const CATEGORIES = [
  {
    id: 'travel',
    title: 'Travel',
    description: 'Expert travel booking services. From luxury getaways to corporate logistics, we handle every detail of your journey.',
    icon: Plane,
    images: [t1, t2, t3, t4], // ✅ using imports
    accent: '#6366F1'
  },
  {
    id: 'hr',
    title: 'HR',
    description: 'Comprehensive HR management solutions. Empowering your workforce through innovative talent acquisition and people systems.',
    icon: Users,
    images: [h1, h2, h3, h4], // ✅ using imports
    accent: '#10B981'
  },
  {
    id: 'consulting',
    title: 'Business consulting',
    description: 'Strategic consulting. Navigating complexity with data-driven insights to scale and transform your enterprise.',
    icon: Briefcase,
    images: [b1, b2, b3, b4], // ✅ using imports
    accent: '#F59E0B'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null);

  const selectedData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="mesh-bg opacity-[0.25]" />
      <div className="grid-bg" />
      
      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen relative z-10"
          >

            {/* Nav */}
            <nav className="flex justify-between items-center px-6 md:px-12 py-8 md:py-10 z-30">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="font-bold uppercase text-sm text-brand-dark">
                  Innova Brains
                </span>
              </div>
            </nav>

            {/* Cards */}
            <main className="flex-1 flex items-center justify-center px-6 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {CATEGORIES.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
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