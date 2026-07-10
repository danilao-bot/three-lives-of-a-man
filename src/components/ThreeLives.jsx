import { useEffect } from 'react';

export default function ThreeLives() {
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
    <section className="lives section" id="three-lives">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="lives-head">
          <span className="eyebrow reveal">The Central Arc</span>
          <h2 className="reveal">Three lives. One man. One story.</h2>
        </div>
        <div className="lives-grid reveal">
          <article className="life-card life-card--1">
            <span className="life-num">01</span>
            <h3>The Life He Is Born Into</h3>
            <p>
              A name, a family, a set of expectations he never chose — the first life arrives whole, inherited, and unquestioned.
            </p>
          </article>
          <article className="life-card life-card--2">
            <span className="life-num">02</span>
            <h3>The Life He Loses</h3>
            <p>
              Then it fractures. Loss does not ask permission — it simply arrives, and takes the ground out from under everything he assumed was permanent.
            </p>
          </article>
          <article className="life-card life-card--3">
            <span className="life-num">03</span>
            <h3>The Life He Must Rebuild</h3>
            <p>
              What's left is not a return to the old self, but the slow, deliberate work of building a third life — one he chooses, this time, on purpose.
            </p>
          </article>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C360,10 720,90 1080,20 C1260,-5 1380,50 1440,30 L1440,90 Z" fill="#EFE8D9" />
        </svg>
      </div>
    </section>
  );
}
