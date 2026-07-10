import { useEffect, useRef } from 'react';

export default function AboutTheStory() {
  const wavyRef = useRef(null);

  useEffect(() => {
    // --- Wavify the text: split into per-character <span class="ch"> ---
    const el = wavyRef.current;
    if (el && !el.dataset.wavified) {
      const text = el.textContent;
      el.textContent = '';
      el.classList.add('wavy');
      el.dataset.wavified = 'true';

      let i = 0;
      text.split(/(\s+)/).forEach((token) => {
        if (token === '') return;
        if (/^\s+$/.test(token)) {
          el.appendChild(document.createTextNode(token));
          return;
        }
        const word = document.createElement('span');
        word.style.display = 'inline-block';
        word.style.whiteSpace = 'nowrap';
        token.split('').forEach((char) => {
          const ch = document.createElement('span');
          ch.className = 'ch';
          ch.style.setProperty('--i', i++);
          ch.textContent = char;
          word.appendChild(ch);
        });
        el.appendChild(word);
      });
    }

    // --- Reveal observer for .reveal, .reveal-line, .wavy ---
    const targets = document.querySelectorAll('.reveal, .reveal-line, .wavy');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((t) => obs.observe(t));

    // Assign stagger indices to .stagger children
    document.querySelectorAll('.stagger').forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        child.style.setProperty('--d', i);
      });
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section className="story section" id="story">
      <div className="container">
        {/* Eyebrow on its own line */}
        <div className="reveal">
          <span className="eyebrow">About the Story</span>
        </div>

        {/* Wavy headline — ref used to wavify in useEffect */}
        <p
          ref={wavyRef}
          className="reveal"
          data-wavy
          style={{ marginTop: '22px' }}
        >
          Some stories are not told in straight lines.
        </p>

        {/* Body stagger lines */}
        <div className="story-body stagger">
          <p className="reveal-line">They are carried in memory.</p>
          <p className="reveal-line">In silence.</p>
          <p className="reveal-line">In fragments of joy, loss, and unanswered questions.</p>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider wave-divider--bottom">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C180,20 480,80 720,30 C960,-5 1200,70 1440,40 L1440,90 Z" fill="#EFE8D9" />
        </svg>
      </div>
    </section>
  );
}
