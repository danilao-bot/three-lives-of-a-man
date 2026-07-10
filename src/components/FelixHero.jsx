import { useState, useEffect, useRef } from 'react';

export default function FelixHero() {
  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [showMoreCTAs, setShowMoreCTAs] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const portrait = portraitRef.current;
    if (!hero || !portrait) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 980px)').matches;

    const handleMouseMove = (e) => {
      if (reducedMotion || isMobile) return;
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Gentle 3D tilt
      setTiltStyle({
        transform: `rotateY(${px * 18}deg) rotateX(${-py * 14}deg)`
      });
    };

    const handleMouseLeave = () => {
      if (reducedMotion || isMobile) return;
      setTiltStyle({
        transform: 'rotateY(0deg) rotateX(0deg)'
      });
    };

    const handleScroll = () => {
      if (reducedMotion) return;
      const y = window.scrollY;
      if (y < window.innerHeight && portrait) {
        portrait.style.translate = `0px ${y * 0.08}px`;
      }
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Liquid Blobs for background texture */}
      <div className="liquid">
        <span className="blob"></span>
        <span className="blob"></span>
        <span className="blob"></span>
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-fade-in" style={{ animationDelay: '0.1s' }}>
            Researcher · Educator · Entrepreneur
          </span>
          <h1 className="hero-fade-in" style={{ animationDelay: '0.25s', fontSize: 'clamp(32px, 4.5vw, 54px)', lineHeight: 1.15 }}>
            Building Intelligent Systems.<br />
            Advancing Knowledge.<br />
            Inspiring Innovation.
          </h1>
          <p className="thesis hero-fade-in" style={{ animationDelay: '0.4s', maxWidth: '520px' }}>
            Shaping the future of AI, education, and technology across Africa.
          </p>

          <div className="hero-cta hero-fade-in" style={{ animationDelay: '0.55s' }}>
            <div className="hero-cta-row">
              <a
                href="#expertise"
                onClick={(e) => handleScrollTo(e, 'expertise')}
                className="btn btn-primary"
              >
                Explore My Work
              </a>
              <button
                className="btn-more-toggle"
                onClick={() => setShowMoreCTAs(v => !v)}
                aria-expanded={showMoreCTAs}
                aria-label="Show more links"
              >
                {showMoreCTAs ? 'Less ↑' : 'More →'}
              </button>
            </div>

            <div className={`hero-cta-secondary${showMoreCTAs ? ' is-open' : ''}`}>
              <a href="#/book" className="btn btn-ghost">Read My Books</a>
              <a href="#/research" className="btn btn-ghost">View Research</a>
            </div>
          </div>
        </div>

        <div className="book-stage hero-fade-in" style={{ animationDelay: '0.75s', display: 'flex', justifyContent: 'center' }}>
          <div
            ref={portraitRef}
            className="portrait-tilt-container"
            style={tiltStyle}
          >
            {/* Elegant glowing background border */}
            <div style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: 'var(--r-lg)',
              background: 'linear-gradient(135deg, var(--gold-soft) 0%, var(--wine) 100%)',
              opacity: 0.15,
              filter: 'blur(10px)',
              zIndex: 0
            }} />
            
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--line)',
              overflow: 'hidden',
              boxShadow: '0 30px 60px -15px rgba(8, 22, 37, 0.3)',
              background: 'var(--glass)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              zIndex: 1
            }}>
              <img
                src="/author.jpeg"
                alt="Dr. Felix Oshiorenoya Uloko"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  transition: 'transform 0.6s var(--ease)'
                }}
                className="portrait-image"
              />
              
              {/* Overlay with info */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(0deg, rgba(8, 22, 37, 0.9) 0%, rgba(8, 22, 37, 0) 100%)',
                padding: '24px',
                color: 'var(--on-ink)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'var(--f-display)', color: 'var(--on-ink)' }}>Dr. Felix</h3>
                <p style={{ fontSize: '12px', opacity: 0.8, fontFamily: 'var(--f-mono)', letterSpacing: '0.05em', color: 'var(--gold-soft)', marginTop: '4px' }}>AI Researcher & Educator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C240,30 480,90 720,40 C960,10 1200,80 1440,50 L1440,90 Z" fill="#081625" />
        </svg>
      </div>
    </section>
  );
}
