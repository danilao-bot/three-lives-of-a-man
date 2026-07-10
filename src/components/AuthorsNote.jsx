import { useEffect } from 'react';

export default function AuthorsNote() {
  useEffect(() => {
    // Reveal animation
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
    }, { threshold: 0.18 });
    targets.forEach(t => obs.observe(t));

    return () => obs.disconnect();
  }, []);

  return (
    <section className="note section" id="note" style={{ paddingBottom: '180px' }}>
      <div className="container note-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div className="note-portrait reveal">
          <span>F</span>
        </div>
        <div className="reveal">
          <span className="eyebrow">Author's Note</span>
          <p className="note-quote" style={{ marginTop: '22px' }}>
            This book began the way most honest things do — quietly, and without permission.
          </p>
          <div className="note-body">
            <p>
              I didn't set out to write a novel about fathers and brothers and the lives we lose along the way. I set out to make sense of something I couldn't say out loud. The writing did the rest.
            </p>
            <p>
              If you've ever had to rebuild a version of yourself you didn't ask for, this book was written for you. Not to give you answers — I don't have many — but to keep you company while you find your own.
            </p>
          </div>
          <p className="note-sign">— Dr. Felix</p>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C200,15 540,85 840,25 C1080,-10 1300,65 1440,38 L1440,90 Z" fill="#EFE8D9" />
        </svg>
      </div>
    </section>
  );
}
