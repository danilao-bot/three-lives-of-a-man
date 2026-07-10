import { useEffect } from 'react';

export default function BookDetails() {
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
          <div className="detail">
            <div className="l">Genre</div>
            <div className="v">Literary Fiction</div>
          </div>
          <div className="detail">
            <div className="l">Release Date</div>
            <div className="v">July 1, 2026</div>
          </div>
          <div className="detail">
            <div className="l">Format</div>
            <div className="v">Digital (PDF/EPUB)</div>
          </div>
          <div className="detail">
            <div className="l">Price</div>
            <div className="v">₦5,000</div>
          </div>
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
