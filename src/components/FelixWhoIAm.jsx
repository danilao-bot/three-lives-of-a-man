import { useEffect } from 'react';
import { 
  Brain, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Cpu, 
  Lightbulb, 
  Mic, 
  Terminal, 
  Globe, 
  Users 
} from 'lucide-react';

const roles = [
  { icon: Brain, title: 'Artificial Intelligence Researcher' },
  { icon: BookOpen, title: 'Author' },
  { icon: GraduationCap, title: 'University Lecturer' },
  { icon: Award, title: 'Technology Leader' },
  { icon: Cpu, title: 'AI Engineer' },
  { icon: Lightbulb, title: 'Entrepreneur' },
  { icon: Mic, title: 'International Speaker' },
  { icon: Terminal, title: 'Software Developer' },
  { icon: Globe, title: 'Digital Transformation Consultant' },
  { icon: Users, title: 'Research Supervisor' }
];

export default function FelixWhoIAm() {
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
    <section className="who-i-am section" id="who-i-am" style={{ background: '#EFE8D9', paddingBottom: '140px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
          <span className="eyebrow" style={{ color: 'var(--wine)' }}>Roles &amp; Identity</span>
          <h2 style={{ marginTop: '16px', fontSize: 'clamp(28px, 3.6vw, 42px)' }}>Who I Am</h2>
          <p style={{ marginTop: '14px', color: 'var(--text-soft)', fontSize: '16.5px', maxWidth: '560px', margin: '14px auto 0' }}>
            I wear several hats, each connected by a passion for innovation and lifelong learning.
          </p>
        </div>

        <div className="whoi-grid reveal">
          {roles.map((role, idx) => {
            const IconComponent = role.icon;
            return (
              <div 
                key={idx}
                className="role-card-item"
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-md)',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  transition: 'transform 0.4s var(--ease), box-shadow 0.4s var(--ease), border-color 0.4s',
                  boxShadow: '0 4px 20px -10px rgba(8, 22, 37, 0.05)'
                }}
              >
                <div 
                  className="role-icon-wrapper"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--paper-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--wine)',
                    flexShrink: 0,
                    transition: 'background 0.3s, color 0.3s'
                  }}
                >
                  <IconComponent size={22} strokeWidth={1.75} />
                </div>
                <span 
                  style={{ 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    color: 'var(--ink)',
                    lineHeight: '1.4'
                  }}
                >
                  {role.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Wave divider at bottom */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C360,10 720,90 1080,20 C1260,-5 1380,50 1440,30 L1440,90 Z" fill="#F8F5EE" />
        </svg>
      </div>
    </section>
  );
}
