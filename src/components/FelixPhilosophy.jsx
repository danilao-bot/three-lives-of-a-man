import { useState, useEffect } from 'react';
import { getStoredData } from '../utils/db';

export default function FelixPhilosophy() {
  const [bio, setBio] = useState(() => getStoredData('biography'));

  useEffect(() => {
    const handleUpdate = () => setBio(getStoredData('biography'));
    window.addEventListener('db-update', handleUpdate);

    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return () => window.removeEventListener('db-update', handleUpdate);
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(t => obs.observe(t));

    return () => {
      window.removeEventListener('db-update', handleUpdate);
      obs.disconnect();
    };
  }, []);

  const quote = bio?.philosophyQuote || "Knowledge creates possibilities.\nInnovation creates impact.\nLeadership creates legacy.";
  const para = bio?.philosophyParagraph || "I believe the true value of knowledge lies not only in discovering new ideas but in sharing them, applying them, and empowering others to build upon them. Through research, writing, teaching, and innovation, I am committed to advancing technologies that serve humanity and contribute to Africa's digital future.";

  return (
    <section className="philosophy section on-ink" id="philosophy" style={{ background: 'linear-gradient(180deg, #081625 0%, #102A43 100%)', color: 'var(--on-ink)', padding: '140px 0 200px' }}>
      {/* Wave decorative background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(var(--gold-soft) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="reveal">
          <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Personal Philosophy</span>
          
          <h2 
            style={{ 
              marginTop: '32px', 
              fontSize: 'clamp(28px, 4.2vw, 48px)', 
              lineHeight: 1.25,
              fontFamily: 'var(--f-display)',
              color: 'var(--on-ink)',
              letterSpacing: '-0.02em',
              fontWeight: '500'
            }}
          >
            {quote.split('\n').map((line, idx, arr) => (
              <span key={idx}>
                {line}
                {idx < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
          
          <div 
            style={{ 
              marginTop: '48px', 
              fontSize: 'clamp(16px, 1.8vw, 18px)', 
              lineHeight: 1.8, 
              color: 'var(--on-ink-soft)',
              maxWidth: '720px',
              margin: '48px auto 0'
            }}
          >
            <p>
              {para}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C420,10 840,85 1200,20 C1320,-5 1400,40 1440,25 L1440,90 Z" fill="#F8F5EE" />
        </svg>
      </div>
    </section>
  );
}
