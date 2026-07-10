import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);
  const coverRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => {
    const hero = heroRef.current;
    const cover = coverRef.current;
    if (!hero || !cover) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 980px)').matches;

    const handleMouseMove = (e) => {
      if (reducedMotion || isMobile) return;
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      
      setTiltStyle({
        transform: `rotateY(${-14 + px * 14}deg) rotateX(${2 - py * 10}deg)`
      });
    };

    const handleMouseLeave = () => {
      if (reducedMotion || isMobile) return;
      setTiltStyle({
        transform: 'rotateY(-14deg) rotateX(2deg)'
      });
    };

    const handleScroll = () => {
      if (reducedMotion) return;
      const y = window.scrollY;
      if (y < window.innerHeight && cover) {
        cover.style.translate = `0px ${y * 0.12}px`;
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

  const handleCTAClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Liquid Blobs */}
      <div className="liquid">
        <span className="blob"></span>
        <span className="blob"></span>
        <span className="blob"></span>
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-fade-in" style={{ animationDelay: '0.1s' }}>
            A Debut Literary Work
          </span>
          <h1 className="hero-fade-in" style={{ animationDelay: '0.25s' }}>
            Birth<span className="hero-dot">·</span>Death<span className="hero-dot">·</span>
            <br />
            Rebirth
          </h1>
          <p className="thesis hero-fade-in" style={{ animationDelay: '0.4s' }}>
            We do not live one life. We live three — and the third is the one we have to build with our own hands.
          </p>
          <div className="hero-cta hero-fade-in" style={{ animationDelay: '0.55s' }}>
            <a
              href="#purchase"
              onClick={(e) => handleCTAClick(e, 'purchase')}
              className="btn btn-primary"
            >
              Buy the Book
            </a>
            <a
              href="#story"
              onClick={(e) => handleCTAClick(e, 'story')}
              className="btn btn-ghost"
            >
              Read About the Story
            </a>
          </div>
        </div>

        <div className="book-stage hero-fade-in" style={{ animationDelay: '0.75s' }}>
          <div
            ref={coverRef}
            className="book-cover"
            style={tiltStyle}
          >
            <div className="book-cover__inner">
              <span className="book-cover__rule"></span>
              <h2>
                THREE
                <br />
                LIVES
                <br />
                OF A
                <br />
                MAN
              </h2>
              <span className="book-cover__sub">A Novel · Dr. Felix</span>
              <span className="book-cover__rule"></span>
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
