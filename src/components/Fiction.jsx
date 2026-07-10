import { useState, useEffect } from 'react';
import { getStoredData } from '../utils/db';

export default function Fiction() {
  const [fictionArticles, setFictionArticles] = useState(() => getStoredData('fictionArticles'));

  useEffect(() => {
    const handleUpdate = () => setFictionArticles(getStoredData('fictionArticles'));
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
          <span className="eyebrow reveal">Fiction</span>
          <h1 className="reveal">Stories that didn't make the book.</h1>
          <p className="lede reveal">Short fiction and excerpts — some finished, some still finding their ending.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3 reveal">
            {fictionArticles.map((art, index) => (
              <article key={index} className="card">
                <span className="tag">{art.tag}</span>
                <h3>{art.title}</h3>
                <p className="excerpt">{art.excerpt}</p>
                <div className="post-meta">
                  <span>{art.metaWords}</span>
                  <span className="dot-sep"></span>
                  <span>{art.metaType}</span>
                </div>
                <a href="#" className="read" onClick={(e) => e.preventDefault()}>
                  {art.linkText}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
