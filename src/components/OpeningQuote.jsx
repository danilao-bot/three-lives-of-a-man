import { useEffect, useState, useRef } from 'react';

export default function OpeningQuote() {
  const [isInterlockingActive, setIsInterlockingActive] = useState(false);
  const interlockingRef = useRef(null);

  useEffect(() => {
    // Reveal animation observer
    const targets = document.querySelectorAll('.reveal, .reveal-line');
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
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => obs.observe(t));

    // Mobile click listener to dismiss interlocking state
    const handleDocumentClick = () => {
      setIsInterlockingActive(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      obs.disconnect();
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleInterlockingClick = (e) => {
    e.stopPropagation();
    setIsInterlockingActive(!isInterlockingActive);
  };

  return (
    <section className="quote on-ink" id="quote">
      {/* Liquid background blob */}
      <div className="liquid">
        <span
          className="blob"
          style={{
            width: '380px',
            height: '380px',
            top: '-100px',
            left: '-80px',
            background: 'var(--wine)',
            opacity: 0.28
          }}
        ></span>
      </div>

      <div className="container stagger" style={{ maxWidth: '960px', position: 'relative', zIndex: 1 }}>
        <p className="reveal-line memory-line" style={{ fontSize: 'clamp(22px, 4.2vw, 44px)', fontFamily: 'var(--f-display)', fontStyle: 'italic', lineHeight: 1.35, marginBottom: 0 }}>
          <span className="memory-word" style={{ '--delay': '0.1s' }}>Some</span>&nbsp;
          <span className="memory-word" style={{ '--delay': '0.9s' }}>stories</span>&nbsp;
          <span className="memory-word" style={{ '--delay': '0.3s' }}>are</span>&nbsp;
          <span className="memory-word" style={{ '--delay': '1.4s' }}>carried</span>&nbsp;
          <span className="memory-word" style={{ '--delay': '0.6s' }}>in</span>&nbsp;
          <span className="memory-word" style={{ '--delay': '1.8s' }}>memory.</span>
        </p>

        <p className="reveal-line silence-line">In silence.</p>

        <div
          ref={interlockingRef}
          onClick={handleInterlockingClick}
          className={`reveal-line interlocking-quote ${isInterlockingActive ? 'active' : ''}`}
        >
          {/* Row 1: What was said */}
          <span className="said-word" style={{ gridColumn: 1 }}>In</span>
          <span className="said-word" style={{ gridColumn: 3 }}>the</span>
          <span className="said-word" style={{ gridColumn: 5 }}>spaces</span>
          <span className="said-word" style={{ gridColumn: 7 }}>between</span>
          <span className="said-word" style={{ gridColumn: 9 }}>what</span>
          <span className="said-word" style={{ gridColumn: 11 }}>was</span>
          <span className="said-word" style={{ gridColumn: 13 }}>said</span>
          
          {/* Row 2: What was left unsaid */}
          <span className="unsaid-word" style={{ gridColumn: 2 }}>and</span>
          <span className="unsaid-word" style={{ gridColumn: 4 }}>what</span>
          <span className="unsaid-word" style={{ gridColumn: 6 }}>was</span>
          <span className="unsaid-word" style={{ gridColumn: 8 }}>left</span>
          <span className="unsaid-word" style={{ gridColumn: 10 }}>unsaid.</span>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C240,0 480,90 720,30 C960,0 1200,80 1440,40 L1440,90 Z" fill="#F8F5EE" />
        </svg>
      </div>
    </section>
  );
}
