import { useEffect } from 'react';

const affiliationsList = [
  {
    mark: 'U',
    tag: 'Academic',
    name: '[University / Institution Name]',
    role: 'Faculty & Researcher',
    period: '20XX — Present'
  },
  {
    mark: 'O',
    tag: 'Fellowship',
    name: '[Fellowship / Organization Name]',
    role: 'Fellow',
    period: '20XX'
  },
  {
    mark: 'V',
    tag: 'Enterprise',
    name: '[Venture / Company Name]',
    role: 'Founder',
    period: '20XX — Present'
  },
  {
    mark: 'P',
    tag: 'Professional Body',
    name: '[Professional Association Name]',
    role: 'Member',
    period: '20XX'
  },
  {
    mark: 'E',
    tag: 'Education',
    name: '[Advisory / Board Role]',
    role: 'Advisor',
    period: '20XX — Present'
  }
];

export default function Affiliations() {
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
