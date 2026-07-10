import { useEffect } from 'react';

const whyItems = [
  {
    title: 'Family',
    description: "The bonds that hold us, even when they're strained past recognition.",
    icon: (
      <svg className="why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8.5" r="4.5" />
        <circle cx="8.5" cy="14.5" r="4.5" />
        <circle cx="15.5" cy="14.5" r="4.5" />
      </svg>
    )
  },
  {
    title: 'Fatherhood',
    description: 'What is inherited, what is owed, and what must be chosen.',
    icon: (
      <svg className="why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="3" x2="12" y2="9" />
        <line x1="12" y1="15" x2="12" y2="21" />
      </svg>
    )
  },
  {
    title: 'Brotherhood',
    description: 'Loyalty tested by distance, time, and things left unsaid.',
    icon: (
      <svg className="why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="4" x2="8" y2="20" />
        <line x1="16" y1="4" x2="16" y2="20" />
        <path d="M8 12h8" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    title: 'Loss',
    description: 'The grief that rewrites who we thought we were.',
    icon: (
      <svg className="why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 3.1A9 9 0 0 0 10.5 20.9" />
        <path d="M13.5 3.1A9 9 0 0 1 13.5 20.9" style={{ transform: 'translate(2px, -2px)' }} />
      </svg>
    )
  },
  {
    title: 'Renewal',
    description: 'The quiet, deliberate work of becoming someone new.',
    icon: (
      <svg className="why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21V10c0-3.3 2.7-6 6-6" />
        <path d="M12 13c0-3-2-5-5-5" />
        <path d="M4 21h16" strokeDasharray="1 3" />
      </svg>
    )
  }
];

export default function WhyThisMatters() {
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
    <section className="section on-dim" id="why" style={{ paddingBottom: '180px' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="eyebrow reveal">Why This Story Matters</span>
        <h2 className="reveal" style={{ marginTop: '16px', maxWidth: '600px', fontSize: 'clamp(28px,3.6vw,42px)', lineHeight: 1.15 }}>
          Because it isn't only his story.
        </h2>
        <div className="why-grid reveal">
          {whyItems.map((item, index) => (
            <div key={index} className="why-card">
              {item.icon}
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C240,30 600,90 900,20 C1140,-10 1320,60 1440,35 L1440,90 Z" fill="#081625" />
        </svg>
      </div>
    </section>
  );
}
