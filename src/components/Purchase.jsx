import { useEffect } from 'react';

export default function Purchase() {
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
    <section className="purchase section" id="purchase" style={{ position: 'relative', paddingBottom: '180px' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="purchase-card glass-light reveal">
          <span className="edition">Digital Edition</span>
          <div className="price">₦5,000</div>
          <ul className="purchase-list">
            <li>Instant download</li>
            <li>Read anywhere — phone, tablet, e-reader</li>
            <li>Launch edition pricing</li>
          </ul>
          <a href="#" className="btn btn-primary">Get Your Copy</a>
        </div>
      </div>
    </section>
  );
}
