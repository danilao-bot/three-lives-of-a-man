import { useEffect } from 'react';

export default function FinalReflection() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal-line');
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
    <section className="reflection" id="reflection" style={{ position: 'relative' }}>
      <div className="container stagger">
        <p className="reveal-line">Some stories entertain.</p>
        <p className="reveal-line">Some stories inform.</p>
        <p className="reveal-line">And some stories stay with you.</p>
        <p className="reveal-line">Long after the final page is turned.</p>
        <a href="#purchase" className="btn btn-primary reveal-line">Buy the Book</a>
      </div>
    </section>
  );
}
