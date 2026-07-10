import { useEffect, useState } from 'react';
import { getStoredData } from '../utils/db';

export default function Purchase() {
  const [settings, setSettings] = useState(() => getStoredData('bookSettings'));

  useEffect(() => {
    const handleUpdate = () => setSettings(getStoredData('bookSettings'));
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
    <section className="purchase section" id="purchase" style={{ position: 'relative', paddingBottom: '180px' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="purchase-card glass-light reveal">
          <span className="edition">Digital Edition</span>
          <div className="price">{settings.digitalPrice}</div>
          <ul className="purchase-list">
            <li>Instant download</li>
            <li>Read anywhere - phone, tablet, e-reader</li>
            <li>Launch edition pricing</li>
          </ul>
          <a href={settings.purchaseLink} className="btn btn-primary">Get Your Copy</a>
        </div>
      </div>
    </section>
  );
}
