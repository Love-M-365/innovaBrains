import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  images: string[];
  onClick: () => void;
  accentColor: string;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon: Icon,
  images,
  onClick,
  accentColor,
  index,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  // ✅ Image carousel logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  // ✅ Preload images (fix lag)
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      id={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className="bento-card relative h-[28rem] md:h-[32rem] w-full cursor-pointer perspective-1000 group p-2"
    >
      <div className="relative h-full w-full rounded-[1.8rem] overflow-hidden bg-brand-dark">
        
        {/* ✅ FIXED Background Image Carousel */}
        <div className="absolute inset-0 z-0 bg-black">
          
          {/* Layered Images for Smooth Crossfade */}
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ willChange: 'opacity' }}
            />
          ))}

          {/* Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Top-Left Module Indicator */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-lg bg-white/10"
            style={{ borderColor: `${accentColor}44` }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Module</span>
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest leading-none">
              {title.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Center Title */}
       {/* Center Title with Fade Background */}
<div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-6">
  
  {/* Fade overlay (only visible when NOT hovered) */}
  <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:opacity-0" />

  <h3 className="relative text-4xl font-display font-bold text-white text-center uppercase tracking-tighter transition-all duration-700 group-hover:scale-90 group-hover:opacity-0 group-hover:-translate-y-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
    {title}
  </h3>
</div>

        {/* Top Right Info */}
        <div className="absolute top-6 right-8 text-right z-20 transition-opacity duration-700 group-hover:opacity-0">
          <div className="text-xl font-display font-light text-white/20 tracking-tighter">
            0{index + 1}
          </div>
          <div className="text-[8px] font-mono text-white/10 uppercase tracking-widest mt-1">
            Status: Standby
          </div>
        </div>

        {/* Content Hover Panel */}
        <div 
          style={{ transform: 'translateZ(80px)' }}
          className="absolute bottom-6 left-6 right-6 p-7 rounded-[1.5rem] bg-white border border-brand-dark/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-6" style={{ backgroundColor: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>
              We Offer
            </span>
          </div>

          <h4 className="text-xl font-display font-bold text-brand-dark tracking-tight mb-2 uppercase">
            {title}
          </h4>

          <p className="text-xs text-brand-dark/60 font-sans leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between border-t border-brand-dark/5 pt-6">
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentImageIndex ? 'w-4 bg-accent' : 'w-1 bg-brand-dark/10'
                  }`} 
                />
              ))}
            </div>

            <div className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-2 group/btn">
              visit our site
              <div className="w-4 h-[1px] bg-accent transition-all duration-300 group-hover/btn:w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-10 bg-gradient-to-tr from-transparent via-white to-transparent transition-opacity duration-700" />
    </motion.div>
  );
};