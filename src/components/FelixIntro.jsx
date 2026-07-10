import { useState, useEffect } from 'react';
import { getStoredData } from '../utils/db';

export default function FelixIntro() {
  const [bio, setBio] = useState(() => getStoredData('biography'));

  useEffect(() => {
    const handleUpdate = () => setBio(getStoredData('biography'));
    window.addEventListener('db-update', handleUpdate);
    return () => window.removeEventListener('db-update', handleUpdate);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return;
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

    return () => obs.disconnect();
  }, []);

  return (
    <section className="intro section on-ink" id="intro" style={{ background: '#081625', color: 'var(--on-ink)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="reveal">
          <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Welcome</span>
          <h2 
            style={{ 
              marginTop: '24px', 
              fontSize: 'clamp(24px, 3.8vw, 36px)', 
              lineHeight: 1.4,
              fontStyle: 'italic',
              fontWeight: '400',
              color: 'var(--on-ink)'
            }}
          >
            "{bio.introQuote}"
          </h2>
          
          <div 
            style={{ 
              marginTop: '40px', 
              fontSize: 'clamp(16px, 1.8vw, 18px)', 
              lineHeight: 1.8, 
              color: 'var(--on-ink-soft)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {bio.introParagraphs.map((para, i) => (
              <p key={i} style={{ color: 'var(--on-ink-soft)' }}>
                {para}
              </p>
            ))}
            <p style={{ 
              fontFamily: 'var(--f-display)', 
              fontSize: 'clamp(20px, 2.5vw, 24px)', 
              color: 'var(--gold-soft)', 
              fontWeight: '600',
              borderLeft: '4px solid var(--gold)',
              paddingLeft: '20px',
              margin: '12px 0'
            }}>
              {bio.introHighlights}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C420,10 840,85 1200,20 C1320,-5 1400,40 1440,25 L1440,90 Z" fill="#EFE8D9" />
        </svg>
      </div>
    </section>
  );
}

