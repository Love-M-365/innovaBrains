import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Plane, Users, Briefcase } from 'lucide-react';
import { CategoryCard } from './components/CategoryCard';
import { Portal } from './components/Portal';

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

// Preload ALL images once at module level — before any component mounts.
// This means the browser fetches them immediately and caches them globally.
// Cards will never reload images on re-render.
const ALL_IMAGES = [t1, t2, t3, t4, h1, h2, h3, h4, b1, b2, b3, b4];
ALL_IMAGES.forEach((src) => {
  const img = new Image();
  img.src = src;
});

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // 'idle' | 'entering-portal' | 'portal' | 'leaving-portal'
  const [transitionState, setTransitionState] = useState<string>('idle');
  const landingRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const CATEGORIES = useMemo(() => [
    {
      id: 'travel',
      title: 'Travel',
      description: 'Expert travel booking services. From luxury getaways to corporate logistics, we handle every detail of your journey.',
      icon: Plane,
      images: [t1, t2, t3, t4],
      accent: '#6366F1',
    },
    {
      id: 'hr',
      title: 'HR',
      description: 'Comprehensive HR management solutions. Empowering your workforce through innovative talent acquisition and people systems.',
      icon: Users,
      images: [h1, h2, h3, h4],
      accent: '#10B981',
    },
    {
      id: 'consulting',
      title: 'Business Consulting',
      description: 'Strategic consulting. Navigating complexity with data-driven insights to scale and transform your enterprise.',
      icon: Briefcase,
      images: [b1, b2, b3, b4],
      accent: '#F59E0B',
    },
  ], []);

  const selectedData = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory),
    [activeCategory, CATEGORIES]
  );

  const handleCategoryClick = useCallback((id: string) => {
    // 1. Start exit animation on landing
    setTransitionState('entering-portal');
    setActiveCategory(id);
  }, []);

  // Once transition state changes, handle the CSS class swap
  useEffect(() => {
    if (transitionState === 'entering-portal') {
      // Small timeout lets React paint the portal (hidden) before we animate
      const t = setTimeout(() => setTransitionState('portal'), 500);
      return () => clearTimeout(t);
    }
    if (transitionState === 'leaving-portal') {
      const t = setTimeout(() => {
        setActiveCategory(null);
        setTransitionState('idle');
      }, 500);
      return () => clearTimeout(t);
    }
  }, [transitionState]);

  const handleBack = useCallback(() => {
    setTransitionState('leaving-portal');
  }, []);

  // Derive CSS classes from transitionState
  const landingClass = [
    'screen',
    transitionState === 'idle' ? 'screen-active' : '',
    transitionState === 'entering-portal' ? 'screen-exit' : '',
    transitionState === 'leaving-portal' ? 'screen-enter' : '',
    transitionState === 'portal' ? 'screen-hidden' : '',
  ].join(' ');

  const portalClass = [
    'screen',
    transitionState === 'portal' ? 'screen-active' : '',
    transitionState === 'entering-portal' ? 'screen-enter' : '',
    transitionState === 'leaving-portal' ? 'screen-exit' : '',
    transitionState === 'idle' ? 'screen-hidden' : '',
  ].join(' ');

  return (
    <div className="app-root">
      <div className="mesh-bg" />
      <div className="grid-bg" />

      {/* LANDING */}
      <div ref={landingRef} className={landingClass}>
        <div className="nav-contact">
  <a href="tel:+919911949189">+91 99119 49189</a>
  <span className="dot" />
  <a href="mailto:mail@innovabrains.com">mail@innovabrains.com</a>
</div>
        <nav className="main-nav">
          <div className="logo">
            <div className="logo-icon">
              <Briefcase size={20} color="#fff" />
            </div>
            <div className="logo-text">
              <span className="logo-name">Innova Brains</span>
              <span className="logo-sub">Global Intelligence</span>
            </div>
          </div>

          <div className="nav-links">
            {['Vision', 'Insights', 'Partners'].map((item) => (
              <a key={item} href="#" className="nav-link">{item}</a>
            ))}
          </div>

          <div className="nav-hamburger">
            <div className="ham-line" />
            <div className="ham-line ham-line-short" />
          </div>
        </nav>

        <main className="hero-main">
          <div className="hero-text">
            <h1 className="hero-title">
              Innova<br />
              <span className="hero-accent">Brains</span>
            </h1>
            <p className="hero-sub">
              Empowering the Global Enterprise through Precision Travel,
              Talent Management, and Strategic Consulting.
            </p>
          </div>

          <div className="card-grid">
            {CATEGORIES.map((cat, idx) => (
              <CategoryCard
                key={cat.id}
                {...cat}
                index={idx}
                onClick={() => handleCategoryClick(cat.id)}
                accentColor={cat.accent}
                animDelay={idx * 100}
              />
            ))}
          </div>
        </main>

        <footer className="main-footer">
  <p className="footer-copy">© 2026 Innova Brains</p>

  <div className="footer-links">
    {['Ethics', 'Manifesto', 'Privacy'].map((item) => (
      <span key={item} className="footer-link">{item}</span>
    ))}
  </div>

  {/* ── Contact ── */}
  <div className="footer-contact">
    <a href="tel:+919911949189" className="footer-contact-item">
      +91 99119 49189
    </a>
    <span className="footer-contact-sep">·</span>
    <a href="mailto:mail@innovabrains.com" className="footer-contact-item">
      mail@innovabrains.com
    </a>
  </div>
</footer>
      </div>

      {/* PORTAL — always mounted so images stay cached, hidden via CSS */}
      <div ref={portalRef} className={portalClass}>
        <Portal
          category={selectedData?.title || ''}
          onBack={handleBack}
        />
      </div>
      
    </div>
  );
}