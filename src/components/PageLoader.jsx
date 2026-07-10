import { useState, useEffect } from 'react';

export default function PageLoader({ onComplete }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Lock scroll during load
    document.body.style.overflow = 'hidden';
    document.body.classList.remove('page-revealed');

    // Start fade-out after one full animation cycle (2.5s)
    const fadeTimer = setTimeout(() => setFading(true), 2500);

    // Remove loader and reveal page after fade completes (2.5s + 0.5s)
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = '';
      document.body.classList.add('page-revealed');
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={`page-loader-overlay${fading ? ' page-loader-overlay--out' : ''}`}>
      {/* Brand wordmark above spinner */}
      <p className="page-loader-brand">Dr. Felix</p>

      {/* Morphing inset spinner */}
      <div className="page-loader-spinner">
        <span className="loader-span loader-span--1" />
        <span className="loader-span loader-span--2" />
      </div>

      {/* Subtle tagline */}
      <p className="page-loader-tagline">Building Intelligent Systems</p>
    </div>
  );
}
