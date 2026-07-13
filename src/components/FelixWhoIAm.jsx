import { useState, useEffect } from 'react';
import { getStoredData } from '../utils/db';
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
  Users,
  CheckCircle2
} from 'lucide-react';

function getRoleIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('researcher') || t.includes('brain') || t.includes('intelligence') || t.includes('ai')) return Brain;
  if (t.includes('author') || t.includes('book') || t.includes('write')) return BookOpen;
  if (t.includes('lecturer') || t.includes('teacher') || t.includes('professor') || t.includes('education') || t.includes('academy')) return GraduationCap;
  if (t.includes('leader') || t.includes('award') || t.includes('director')) return Award;
  if (t.includes('engineer') || t.includes('cpu') || t.includes('hardware')) return Cpu;
  if (t.includes('entrepreneur') || t.includes('innovator') || t.includes('founder') || t.includes('lightbulb')) return Lightbulb;
  if (t.includes('speaker') || t.includes('mic') || t.includes('talk')) return Mic;
  if (t.includes('developer') || t.includes('programmer') || t.includes('terminal') || t.includes('software')) return Terminal;
  if (t.includes('consultant') || t.includes('globe') || t.includes('international')) return Globe;
  if (t.includes('supervisor') || t.includes('user') || t.includes('manager')) return Users;
  return CheckCircle2;
}

export default function FelixWhoIAm() {
  const [bio, setBio] = useState(() => getStoredData('biography'));

  useEffect(() => {
    const handleUpdate = () => setBio(getStoredData('biography'));
    window.addEventListener('db-update', handleUpdate);

    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return () => window.removeEventListener('db-update', handleUpdate);
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

    return () => {
      window.removeEventListener('db-update', handleUpdate);
      obs.disconnect();
    };
  }, []);

  const roles = bio?.roles || [];

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
          {roles.map((roleTitle, idx) => {
            const IconComponent = getRoleIcon(roleTitle);
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
                  {roleTitle}
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
