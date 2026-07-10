import { useEffect } from 'react';
import { 
  BrainCircuit, 
  SearchCode, 
  Library, 
  BookOpen,
  Presentation, 
  Lightbulb, 
  ArrowUpRight 
} from 'lucide-react';

const expertiseList = [
  {
    icon: BrainCircuit,
    title: 'Artificial Intelligence',
    description: 'Designing intelligent systems using Machine Learning, Deep Learning, Computer Vision, Explainable AI, and Large Language Models.',
    link: '#/research',
    linkText: 'Explore Research'
  },
  {
    icon: SearchCode,
    title: 'Research',
    description: 'Publishing impactful research that advances AI, data science, and intelligent systems while addressing real-world challenges.',
    link: '#/research',
    linkText: 'View Publications'
  },
  {
    icon: Library,
    title: 'Books & Publications',
    description: 'Authoring books, academic publications, and educational resources that simplify complex technological concepts and inspire continuous learning.',
    link: '#/book',
    linkText: 'Read My Books'
  },
  {
    icon: Presentation,
    title: 'Teaching & Mentorship',
    description: 'Equipping students, researchers, and professionals with practical knowledge in Artificial Intelligence, Data Science, Software Engineering, and Digital Innovation.',
    link: '#/affiliations',
    linkText: 'View Academic Work'
  },
  {
    icon: Lightbulb,
    title: 'Innovation & Entrepreneurship',
    description: 'Building technology ventures and AI-powered solutions that create measurable value across education, business, and governance.',
    link: '#/affiliations',
    linkText: 'Explore Ventures'
  },
  {
    icon: BookOpen,
    title: 'Speaking & Advisory',
    description: 'Delivering keynote presentations, workshops, executive training, and strategic advisory services on Artificial Intelligence, innovation, leadership, and digital transformation.',
    link: '#/opinion',
    linkText: 'Read Opinions'
  }
];

export default function FelixExpertise() {
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
    <section className="expertise section" id="expertise" style={{ background: 'var(--paper)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
          <span className="eyebrow" style={{ color: 'var(--wine)' }}>Core Pillars</span>
          <h2 style={{ marginTop: '16px', fontSize: 'clamp(28px, 3.6vw, 42px)' }}>Featured Expertise</h2>
          <p style={{ marginTop: '14px', color: 'var(--text-soft)', fontSize: '16.5px', maxWidth: '560px', margin: '14px auto 0' }}>
            Bridging the gap between theory and real-world impact across key fields of technology and leadership.
          </p>
        </div>

        <div className="grid grid-3 reveal">
          {expertiseList.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx} 
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: '36px',
                  boxShadow: '0 4px 30px -15px rgba(8, 22, 37, 0.04)'
                }}
              >
                <div>
                  <div 
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(122, 35, 49, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--wine)',
                      marginBottom: '24px'
                    }}
                  >
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--ink)', fontFamily: 'var(--f-display)', margin: '0 0 12px 0' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-soft)', lineHeight: '1.7', margin: 0 }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <a 
                    href={item.link} 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: 'var(--wine)',
                      transition: 'gap 0.3s'
                    }}
                    className="expertise-link-hover"
                  >
                    {item.linkText}
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C200,15 540,85 840,25 C1080,-10 1300,65 1440,38 L1440,90 Z" fill="#081625" />
        </svg>
      </div>
    </section>
  );
}
