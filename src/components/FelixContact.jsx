import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Check } from 'lucide-react';

export default function FelixContact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section className="contact section" id="contact" style={{ background: 'var(--paper)', paddingBottom: '140px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
          <span className="eyebrow" style={{ color: 'var(--wine)' }}>Get In Touch</span>
          <h2 style={{ marginTop: '16px', fontSize: 'clamp(28px, 3.6vw, 42px)' }}>Contact Me</h2>
          <p style={{ marginTop: '14px', color: 'var(--text-soft)', fontSize: '16.5px', maxWidth: '560px', margin: '14px auto 0' }}>
            Let's connect to discuss research collaborations, teaching invitations, speaking engagements, or technology advisory.
          </p>
        </div>

        <div className="contact-grid reveal">
          {/* Contact Details Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            <div className="card" style={{ display: 'flex', gap: '20px', padding: '30px' }}>
              <div 
                style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '12px', 
                  background: 'rgba(122, 35, 49, 0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--wine)',
                  flexShrink: 0
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', fontFamily: 'var(--f-body)', margin: '0 0 4px 0' }}>Email Address</h4>
                <a href="mailto:info@drfelix.com" style={{ fontSize: '14.5px', color: 'var(--text-soft)', transition: 'color 0.3s' }} className="contact-link">
                  info@drfelix.com
                </a>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', gap: '20px', padding: '30px' }}>
              <div 
                style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '12px', 
                  background: 'rgba(122, 35, 49, 0.06)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--wine)',
                  flexShrink: 0
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', fontFamily: 'var(--f-body)', margin: '0 0 4px 0' }}>Academic &amp; Research Affiliations</h4>
                <p style={{ fontSize: '14.5px', color: 'var(--text-soft)', lineHeight: '1.5', margin: 0 }}>
                  Departments of Computer Science &amp; Artificial Intelligence
                </p>
              </div>
            </div>
            
            <p style={{ fontSize: '13.5px', color: 'var(--text-soft)', lineHeight: '1.6', margin: '12px 0 0 0', fontStyle: 'italic' }}>
              Dr. Felix Oshiorenoya Uloko regularly consults for global institutions on digital transformation and emerging tech policies.
            </p>
          </div>

          {/* Contact Form Panel */}
          <form 
            onSubmit={handleSubmit}
            className="card"
            style={{ 
              padding: '40px',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px',
              boxShadow: '0 20px 40px -20px rgba(16,42,67,.12)' 
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="form-name" style={{ fontSize: '12px', fontFamily: 'var(--f-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>Your Name</label>
              <input 
                type="text" 
                id="form-name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
                placeholder="Dr. John Doe"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: 'var(--r-sm)',
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                  fontFamily: 'var(--f-body)',
                  fontSize: '14.5px',
                  outline: 'none',
                  transition: 'border-color 0.3s, background 0.3s'
                }}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="form-email" style={{ fontSize: '12px', fontFamily: 'var(--f-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>Email Address</label>
              <input 
                type="email" 
                id="form-email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: 'var(--r-sm)',
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                  fontFamily: 'var(--f-body)',
                  fontSize: '14.5px',
                  outline: 'none',
                  transition: 'border-color 0.3s, background 0.3s'
                }}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="form-message" style={{ fontSize: '12px', fontFamily: 'var(--f-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>Message</label>
              <textarea 
                id="form-message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                placeholder="Hello Dr. Felix, I would love to talk about..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: 'var(--r-sm)',
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                  fontFamily: 'var(--f-body)',
                  fontSize: '14.5px',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.3s, background 0.3s'
                }}
                className="form-input"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                marginTop: '12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : isSuccess ? (
                <>
                  <Check size={18} />
                  <span>Message Sent Successfully</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
