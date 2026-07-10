import { useEffect } from 'react';

export default function AboutTheAuthor() {
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
    <section className="author section" id="author" style={{ paddingBottom: '180px' }}>
      <div className="container author-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal">
          <span className="eyebrow">About Dr. Felix</span>
          <h2 style={{ marginTop: '16px', fontSize: 'clamp(28px,3.6vw,42px)' }}>
            Researcher. Educator. Entrepreneur. Storyteller.
          </h2>
          <div className="author-roles">
            <span className="role-chip">Research</span>
            <span className="role-chip">Education</span>
            <span className="role-chip">Entrepreneurship</span>
            <span className="role-chip">Storytelling</span>
          </div>
          <p className="author-bio">
            Dr. Felix has spent his career moving between the classroom, the research desk, and the boardroom — building things that outlast a single role or title. <em>Three Lives of a Man</em> is where all three meet: the discipline of research, the empathy of teaching, and the instinct of a builder, turned toward the most personal subject he's ever written about.
          </p>
          <span className="debut-badge">
            <span className="dot"></span>Debut Literary Work
          </span>
        </div>
        
        <div className="author-stats reveal">
          <div className="stat">
            <div className="n">10+</div>
            <div className="l">Years across research &amp; education</div>
          </div>
          <div className="stat">
            <div className="n">3</div>
            <div className="l">Fields of practice — research, business, story</div>
          </div>
          <div className="stat">
            <div className="n">1st</div>
            <div className="l">Literary work — Three Lives of a Man</div>
          </div>
          <div className="stat">
            <div className="n">∞</div>
            <div className="l">Lives a single story can hold</div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C420,10 840,85 1200,20 C1320,-5 1400,40 1440,25 L1440,90 Z" fill="#EFE8D9" />
        </svg>
      </div>
    </section>
  );
}
