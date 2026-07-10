import { useEffect } from 'react';

export default function FelixIntro() {
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
    }, { threshold: 0.15 });
    targets.forEach(t => obs.observe(t));

    return () => obs.disconnect();
  }, []);

  return (
    <section className="intro section on-ink" id="intro" style={{ background: '#081625', color: 'var(--on-ink)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="reveal">
          <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Welcome</span>
          <h2 
            style={{ 
              marginTop: '24px', 
              fontSize: 'clamp(24px, 3.8vw, 36px)', 
              lineHeight: 1.4,
              fontStyle: 'italic',
              fontWeight: '400',
              color: 'var(--on-ink)'
            }}
          >
            "I believe technology should do more than automate processes—it should solve meaningful problems, inspire innovation, and improve lives."
          </h2>
          
          <div 
            style={{ 
              marginTop: '40px', 
              fontSize: 'clamp(16px, 1.8vw, 18px)', 
              lineHeight: 1.8, 
              color: 'var(--on-ink-soft)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <p style={{ color: 'var(--on-ink-soft)' }}>
              As an Artificial Intelligence researcher, university lecturer, author, and technology entrepreneur, my work bridges academic excellence with practical innovation. Through research, teaching, writing, and product development, I strive to make emerging technologies more accessible, trustworthy, and impactful for individuals, organizations, and society.
            </p>
            <p style={{ color: 'var(--on-ink-soft)' }}>
              Whether I'm publishing research, authoring books, mentoring future innovators, speaking at conferences, or building AI-driven solutions, my mission remains constant:
            </p>
            <p style={{ 
              fontFamily: 'var(--f-display)', 
              fontSize: 'clamp(20px, 2.5vw, 24px)', 
              color: 'var(--gold-soft)', 
              fontWeight: '600',
              borderLeft: '4px solid var(--gold)',
              paddingLeft: '20px',
              margin: '12px 0'
            }}>
              To create knowledge that empowers people and technology that transforms lives.
            </p>
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

