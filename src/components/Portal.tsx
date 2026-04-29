import { ArrowLeft, Clock } from 'lucide-react';
import React from 'react';

interface PortalProps {
  category: string;
  onBack: () => void;
}

export const Portal: React.FC<PortalProps> = ({ category, onBack }) => {
  return (
    <div className="portal-wrap">
      {/* Ghost background text */}
      <div className="portal-ghost" aria-hidden="true">{category}</div>

      {/* Nav */}
      <nav className="portal-nav">
        <button className="back-btn" onClick={onBack} type="button">
          <ArrowLeft size={16} className="back-arrow" />
          Esc Out
        </button>
        <div className="stream-indicator">
          <span className="stream-dot" />
          <span className="stream-label">Secure Stream: Active</span>
        </div>
      </nav>

      {/* Main */}
      <main className="portal-main">
        <div className="portal-content">
          <div className="portal-badge">
            <Clock size={14} className="portal-badge-icon" />
            <span className="portal-badge-text">
              Under Construction · Coming Soon
            </span>
          </div>

          <h1 className="portal-title">{category}</h1>
          <div className="portal-divider" />

          <p className="portal-desc">
            We are engineering a proprietary{' '}
            <strong>{category.toLowerCase()}</strong> ecosystem.
            Innova Brains is merging high-level strategy with automated
            intelligence to redefine this vertical.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="portal-footer">
        <div className="portal-footer-left">
          <span className="portal-footer-brand">
            Innova Brains Intelligence
          </span>
          <div className="portal-footer-dots">
            {[0.2, 0.4, 0.6, 0.85].map((opacity, i) => (
              <div
                key={i}
                className="portal-footer-dot"
                style={{ backgroundColor: `rgba(79,70,229,${opacity})` }}
              />
            ))}
          </div>
        </div>
        <span className="portal-footer-deploy">
          Projected Deployment Q3 2026
        </span>
      </footer>
    </div>
  );
};