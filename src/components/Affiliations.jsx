import { useEffect, useState } from 'react';
import { getStoredData } from '../utils/db';

export default function Affiliations() {
  const [affiliationsList, setAffiliationsList] = useState(() => getStoredData('affiliations'));

  useEffect(() => {
    const handleUpdate = () => setAffiliationsList(getStoredData('affiliations'));
    window.addEventListener('db-update', handleUpdate);

    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return () => window.removeEventListener('db-update', handleUpdate);
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

    return () => {
      window.removeEventListener('db-update', handleUpdate);
      obs.disconnect();
    };
  }, []);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">Affiliations</span>
          <h1 className="reveal">The rooms he's worked in.</h1>
          <p className="lede reveal">Institutions, fellowships, and ventures Dr. Felix has been part of across research, education, and enterprise.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row-list reveal">
            {affiliationsList.map((aff, index) => (
              <div key={index} className="row-item">
                <div className="row-main">
                  <div className="aff-mark">{aff.mark}</div>
                  <div className="row-body">
                    <span className="tag">{aff.tag}</span>
                    <h3>{aff.name}</h3>
                    <p>{aff.role}</p>
                  </div>
                </div>
                <span className="row-period">{aff.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
