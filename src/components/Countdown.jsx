import { useState, useEffect } from 'react';

function getTimeRemaining() {
  const target = new Date('2026-08-01T00:00:00');
  const now = new Date();
  const total = target - now;

  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    // Reveal animation
    const targets = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18 });
      targets.forEach(t => obs.observe(t));
      return () => { clearInterval(timer); obs.disconnect(); };
    }

    targets.forEach(t => t.classList.add('is-visible'));
    return () => clearInterval(timer);
  }, []);

  const isExpired = timeLeft.total <= 0;

  return (
    <section className="countdown section" id="countdown" style={{ position: 'relative', paddingBottom: '180px' }}>
      <div className="liquid">
        <span className="blob" style={{ width: '420px', height: '420px', top: '-120px', right: '-100px', background: 'var(--gold)', opacity: 0.18 }}></span>
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="eyebrow reveal" style={{ color: 'var(--gold-soft)' }}>Launching Soon</span>
        <h2 className="reveal" style={{ color: 'var(--on-ink)', marginTop: '16px', fontSize: 'clamp(28px,3.6vw,44px)' }}>
          The third life begins July 1.
        </h2>
        <div className="countdown-card glass reveal" data-countdown="2026-08-01T00:00:00">
          {isExpired ? (
            <div className="cd-grid">
              <div className="cd-unit">
                <div className="n" style={{ color: 'var(--gold)' }}>Available</div>
                <div className="l">Now</div>
              </div>
            </div>
          ) : (
            <div className="cd-grid">
              <div className="cd-unit">
                <div className="n">{pad(timeLeft.days)}</div>
                <div className="l">Days</div>
              </div>
              <div className="cd-unit">
                <div className="n">{pad(timeLeft.hours)}</div>
                <div className="l">Hours</div>
              </div>
              <div className="cd-unit">
                <div className="n">{pad(timeLeft.minutes)}</div>
                <div className="l">Minutes</div>
              </div>
              <div className="cd-unit">
                <div className="n">{pad(timeLeft.seconds)}</div>
                <div className="l">Seconds</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C240,20 600,85 900,15 C1140,-15 1320,58 1440,32 L1440,90 Z" fill="#F8F5EE" />
        </svg>
      </div>
    </section>
  );
}
