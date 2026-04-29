import { LucideIcon } from 'lucide-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  images: string[];
  onClick: () => void;
  accentColor: string;
  index: number;
  animDelay?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon: Icon,
  images,
  onClick,
  accentColor,
  index,
  animDelay = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stagger carousel start by index so cards never all switch at once
  useEffect(() => {
    const startDelay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    }, index * 600); // stagger by 600ms per card

    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, index]);

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div
      className="cat-card"
      style={{ animationDelay: `${animDelay + 400}ms` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Explore ${title}`}
    >
      {/* IMAGE LAYER — all images kept mounted, opacity toggled via CSS class */}
      <div className="card-images">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={title}
            className={`card-img ${i === currentIndex ? 'card-img-active' : ''}`}
            // Only decode the first image eagerly; rest are already preloaded globally
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="card-gradient" />
      </div>

      {/* TOP-LEFT BADGE */}
      <div className="card-badge">
        <div
          className="card-badge-icon"
          style={{ borderColor: `${accentColor}44` }}
        >
          <Icon size={16} color="#fff" />
        </div>
        <div className="card-badge-text">
          <span className="card-badge-module">Module</span>
          <span className="card-badge-name">{title.split(' ')[0]}</span>
        </div>
      </div>

      {/* TOP-RIGHT INDEX */}
      <div className="card-index">
        <span className="card-num">0{index + 1}</span>
        <span className="card-status">Status: Standby</span>
      </div>

      {/* CENTER OVERLAY TITLE */}
      <div className="card-center-overlay">
        <div className="card-overlay-bg" />
        <h3 className="card-overlay-title">{title}</h3>
      </div>

      {/* HOVER PANEL — CSS transform only, no JS */}
      <div className="card-panel">
        <div className="panel-label">
          <div className="panel-line" style={{ backgroundColor: accentColor }} />
          <span className="panel-tag" style={{ color: accentColor }}>We Offer</span>
        </div>

        <h4 className="panel-title">{title}</h4>
        <p className="panel-desc">{description}</p>

        <div className="panel-footer">
          <div className="panel-dots">
            {images.map((_, i) => (
              <div
                key={i}
                className="panel-dot"
                style={{
                  width: i === currentIndex ? '16px' : '4px',
                  backgroundColor: i === currentIndex ? accentColor : 'rgba(26,26,26,0.12)',
                }}
              />
            ))}
          </div>
          <span className="panel-cta">
            Visit our site
            <span className="panel-cta-arrow" />
          </span>
        </div>
      </div>

      {/* SHINE OVERLAY */}
      <div className="card-shine" />
    </div>
  );
};