import { useState, useEffect } from 'react';
import { getStoredData } from '../utils/db';

export default function Research() {
  const [researchPapers, setResearchPapers] = useState(() => getStoredData('researchPapers'));

  useEffect(() => {
    const handleUpdate = () => setResearchPapers(getStoredData('researchPapers'));
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
          <span className="eyebrow reveal">Research</span>
          <h1 className="reveal">Published work, before the page.</h1>
          <p className="lede reveal">Dr. Felix's academic research spans education, entrepreneurship, and the role narrative plays in how people learn and lead. Selected publications below.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row-list reveal">
            {researchPapers.map((paper, index) => (
              <div key={index} className="row-item">
                <div className="row-main">
                  <div className="row-body">
                    <span className="tag">{paper.tag}</span>
                    <h3>{paper.title}</h3>
                    <p>{paper.citation}</p>
                  </div>
                </div>
                <a 
                  href={paper.link || '#'} 
                  className="btn btn-ghost btn-sm" 
                  target={paper.link && paper.link !== '#' ? '_blank' : undefined} 
                  rel="noopener noreferrer"
                  onClick={(!paper.link || paper.link === '#') ? (e) => e.preventDefault() : undefined}
                >
                  Read Paper →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
