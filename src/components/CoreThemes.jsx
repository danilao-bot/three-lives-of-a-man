import { useRef, useEffect } from 'react';

const themesList = [
  { idx: '01', title: 'Fatherhood', desc: 'What it means to inherit a name — and what it costs to live up to it.' },
  { idx: '02', title: 'Brotherhood', desc: 'The quiet loyalty between men who were never taught to say what they feel.' },
  { idx: '03', title: 'Legacy', desc: 'What we leave behind, on purpose and by accident.' },
  { idx: '04', title: 'Identity', desc: 'Who you are when the roles that defined you fall away.' },
  { idx: '05', title: 'Forgiveness', desc: 'Not as an ending, but as the only way forward.' },
  { idx: '06', title: 'Grief', desc: "The weight that doesn't disappear — it just changes shape." },
  { idx: '07', title: 'Renewal', desc: 'The third life. The one you build with your own hands.' }
];

export default function CoreThemes() {
  const trackRef = useRef(null);

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

    // Drag to scroll logic
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX;
    let startScroll;

    const handleMouseDown = (e) => {
      isDown = true;
      track.classList.add('is-dragging');
      startX = e.pageX;
      startScroll = track.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
      isDown = false;
      track.classList.remove('is-dragging');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      track.scrollLeft = startScroll - (e.pageX - startX);
    };

    track.addEventListener('mousedown', handleMouseDown);
    track.addEventListener('mouseleave', handleMouseLeaveOrUp);
    track.addEventListener('mouseup', handleMouseLeaveOrUp);
    track.addEventListener('mousemove', handleMouseMove);

    return () => {
      obs.disconnect();
      if (track) {
        track.removeEventListener('mousedown', handleMouseDown);
        track.removeEventListener('mouseleave', handleMouseLeaveOrUp);
        track.removeEventListener('mouseup', handleMouseLeaveOrUp);
        track.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleStep = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.theme-card');
    const w = card ? card.getBoundingClientRect().width + 22 : 320;
    track.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <section className="themes section" id="themes" style={{ paddingBottom: '180px' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="themes-head reveal">
          <div>
            <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Core Themes</span>
            <h2>What the book carries.</h2>
          </div>
          <div className="themes-nav">
            <button onClick={() => handleStep(-1)} aria-label="Previous theme">←</button>
            <button onClick={() => handleStep(1)} aria-label="Next theme">→</button>
          </div>
        </div>
        <div ref={trackRef} className="theme-track reveal">
          {themesList.map((theme, index) => (
            <div key={index} className="theme-card">
              <span className="idx">{theme.idx}</span>
              <h3>{theme.title}</h3>
              <p>{theme.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C300,0 720,80 1080,10 C1260,-15 1380,55 1440,30 L1440,90 Z" fill="#F8F5EE" />
        </svg>
      </div>
    </section>
  );
}
