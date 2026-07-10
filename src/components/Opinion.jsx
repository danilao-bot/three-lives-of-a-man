import { useState, useEffect } from 'react';
import { getStoredData } from '../utils/db';

export default function Opinion() {
  const [opinionArticles, setOpinionArticles] = useState(() => getStoredData('opinionArticles'));

  useEffect(() => {
    const handleUpdate = () => setOpinionArticles(getStoredData('opinionArticles'));
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
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">Opinion</span>
          <h1 className="reveal">Thoughts, not headlines.</h1>
          <p className="lede reveal">Short, candid pieces on identity, ambition, and the things we carry. Updated occasionally — usually when something won't leave him alone.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3 reveal">
            {opinionArticles.map((art, index) => (
              <article key={index} className="card">
                <span className="tag">{art.tag}</span>
                <h3>{art.title}</h3>
                <p className="excerpt">{art.excerpt}</p>
                <div className="post-meta">
                  <span>{art.metaDate}</span>
                  <span className="dot-sep"></span>
                  <span>{art.metaRead}</span>
                </div>
                <a 
                  href={art.link || '#'} 
                  className="read" 
                  target={art.link && art.link !== '#' ? '_blank' : undefined} 
                  rel="noopener noreferrer"
                  onClick={(!art.link || art.link === '#') ? (e) => e.preventDefault() : undefined}
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
