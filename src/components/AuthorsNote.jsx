import { useState, useEffect } from 'react';
import { getStoredData } from '../utils/db';

export default function AuthorsNote() {
  const [note, setNote] = useState(() => getStoredData('authorsNote'));

  useEffect(() => {
    const handleUpdate = () => setNote(getStoredData('authorsNote'));
    window.addEventListener('db-update', handleUpdate);
    return () => window.removeEventListener('db-update', handleUpdate);
  }, []);

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
          <img
            src={note.image || "/author.jpeg"}
            alt="Dr. Felix – Author"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: 'inherit' }}
          />
        </div>
        <div className="reveal">
          <span className="eyebrow">Author's Note</span>
          <p className="note-quote" style={{ marginTop: '22px' }}>
            {note.quote}
          </p>
          <div className="note-body">
            <p>
              {note.p1}
            </p>
            <p>
              {note.p2}
            </p>
          </div>
          <p className="note-sign">{note.sign}</p>
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
