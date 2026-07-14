import { useState, useEffect } from 'react';
import { getStoredData } from '../utils/db';

export default function BookDetails() {
  const [details, setDetails] = useState(() => getStoredData('bookDetailsList'));

  useEffect(() => {
    const handleUpdate = () => setDetails(getStoredData('bookDetailsList'));
    window.addEventListener('db-update', handleUpdate);
    return () => window.removeEventListener('db-update', handleUpdate);
  }, []);

  useEffect(() => {
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
    <section className="section on-dim" id="details" style={{ position: 'relative', paddingBottom: '180px' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="eyebrow reveal">Book Details</span>
        <div className="details-card reveal" style={{ marginTop: '36px' }}>
          {details.map((item, idx) => (
            <div className="detail" key={idx}>
              <div className="l">{item.label}</div>
              <div className="v">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C360,5 720,90 1080,15 C1260,-12 1380,52 1440,28 L1440,90 Z" fill="#081625" />
        </svg>
      </div>
    </section>
  );
}
