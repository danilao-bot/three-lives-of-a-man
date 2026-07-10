import { useEffect, useRef } from 'react';

export default function Footer() {
  const footerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const canvas = canvasRef.current;
    if (!footer || !canvas) return;

    const ctx = canvas.getContext('2d');

    // Select all .physics-node elements inside footer
    const nodeElements = footer.querySelectorAll('.physics-node');
    if (nodeElements.length === 0) return;

    let width = canvas.width = footer.offsetWidth;
    let height = canvas.height = footer.offsetHeight;

    const nodes = [];
    let state = 'entropy';

    const mouse = { x: -1000, y: -1000, active: false, radius: 140 };

    const damping = 0.88;
    const entropySpring = 0.0001;
    const rebuildSpring = 0.035;
    const mouseRepel = 4.0;

    nodeElements.forEach((el, index) => {
      let mass = 1.0;
      if (el.tagName === 'H4' || el.classList.contains('footer-brand')) {
        mass = 3.0;
      } else if (el.tagName === 'A' && el.parentElement && el.parentElement.classList.contains('footer-socials')) {
        mass = 0.7;
      } else if (el.parentElement && el.parentElement.classList.contains('footer-bottom')) {
        mass = 1.5;
      }

      nodes.push({
        element: el,
        mass,
        x: undefined,
        y: undefined,
        homeX: 0,
        homeY: 0,
        vx: 0,
        vy: 0,
        history: [],
        hovered: false,
        pulseOffset: Math.random() * Math.PI * 2
      });

      el.addEventListener('mouseenter', () => { nodes[index].hovered = true; });
      el.addEventListener('mouseleave', () => { nodes[index].hovered = false; });
    });

    function measure() {
      nodes.forEach(n => { n.element.style.transform = 'none'; });
      const footerRect = footer.getBoundingClientRect();
      width = canvas.width = footer.offsetWidth;
      height = canvas.height = footer.offsetHeight;

      nodes.forEach(n => {
        const rect = n.element.getBoundingClientRect();
        n.homeX = rect.left - footerRect.left + rect.width / 2;
        n.homeY = rect.top - footerRect.top + rect.height / 2;

        if (n.x === undefined) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 120 + Math.random() * 260;
          n.x = Math.max(20, Math.min(width - 20, n.homeX + Math.cos(angle) * dist));
          n.y = Math.max(20, Math.min(height - 20, n.homeY + Math.sin(angle) * dist));
          n.vx = (Math.random() - 0.5) * 1.5;
          n.vy = (Math.random() - 0.5) * 1.5;
        }
      });
    }

    measure();
    window.addEventListener('resize', measure);

    footer.addEventListener('mousemove', (e) => {
      const rect = footer.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      if (state === 'entropy') state = 'rebuilding';
    });

    footer.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          state = 'rebuilding';
        }
      });
    }, { threshold: 0.15 });
    observer.observe(footer);

    function updatePhysics() {
      const currentSpring = state === 'rebuilding' ? rebuildSpring : entropySpring;

      nodes.forEach(n => {
        let fx = 0, fy = 0;

        const dx = n.homeX - n.x;
        const dy = n.homeY - n.y;
        fx += dx * currentSpring;
        fy += dy * currentSpring;

        if (mouse.active) {
          const mx = mouse.x - n.x;
          const my = mouse.y - n.y;
          const dist = Math.sqrt(mx * mx + my * my);
          if (dist < mouse.radius && dist > 1) {
            const force = (mouse.radius - dist) / mouse.radius;
            fx -= (mx / dist) * force * mouseRepel;
            fy -= (my / dist) * force * mouseRepel;
            n.hovered = true;
          }
        }

        if (state === 'entropy') {
          fx += (Math.random() - 0.5) * 0.15;
          fy += (Math.random() - 0.5) * 0.15;
        }

        n.vx = (n.vx + fx / n.mass) * damping;
        n.vy = (n.vy + fy / n.mass) * damping;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 15)  { n.x = 15;  n.vx *= -0.5; }
        if (n.x > width - 15)  { n.x = width - 15;  n.vx *= -0.5; }
        if (n.y < 15)  { n.y = 15;  n.vy *= -0.5; }
        if (n.y > height - 15) { n.y = height - 15; n.vy *= -0.5; }

        n.history.push({ x: n.x, y: n.y });
        if (n.history.length > 8) n.history.shift();

        const offsetLeft = n.x - n.homeX;
        const offsetTop  = n.y - n.homeY;
        n.element.style.transform = `translate3d(${offsetLeft.toFixed(2)}px,${offsetTop.toFixed(2)}px,0)`;

        if (state === 'rebuilding' && Math.abs(offsetLeft) < 1.5 && Math.abs(offsetTop) < 1.5) {
          n.element.classList.add('rebuilt');
        } else {
          n.element.classList.remove('rebuilt');
        }
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.65;

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        if (state === 'rebuilding') {
          const dx = n1.homeX - n1.x;
          const dy = n1.homeY - n1.y;
          const distToHome = Math.sqrt(dx * dx + dy * dy);
          if (distToHome > 3) {
            ctx.beginPath();
            ctx.setLineDash([3, 4]);
            ctx.strokeStyle = `rgba(199,162,74,${Math.min(0.22, distToHome / 120)})`;
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n1.homeX, n1.homeY);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        const connections = [];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) connections.push({ node: n2, dist });
        }

        connections.sort((a, b) => a.dist - b.dist);
        const limit = Math.min(connections.length, 3);
        for (let c = 0; c < limit; c++) {
          const n2  = connections[c].node;
          const dist = connections[c].dist;
          const opacity = (1 - dist / 180) * 0.16;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(243,239,227,${opacity})`;
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      nodes.forEach(n => {
        if (n.history.length > 1) {
          ctx.beginPath();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'rgba(199,162,74,0.08)';
          ctx.moveTo(n.history[0].x, n.history[0].y);
          for (let h = 1; h < n.history.length; h++) {
            ctx.lineTo(n.history[h].x, n.history[h].y);
          }
          ctx.stroke();
        }

        const pulse = 1 + Math.sin(Date.now() * 0.003 + n.pulseOffset) * 0.12;
        const glowRadius  = n.hovered ? 38 : 22;
        const glowOpacity = (n.hovered ? 0.15 : 0.06) * (state === 'entropy' ? 0.8 : 1);

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius * pulse);
        g.addColorStop(0, `rgba(199,162,74,${glowOpacity})`);
        g.addColorStop(0.5, `rgba(199,162,74,${glowOpacity * 0.4})`);
        g.addColorStop(1, 'rgba(199,162,74,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = n.hovered ? 'rgba(199,162,74,0.95)' : 'rgba(243,239,227,0.35)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hovered ? 2.5 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let rafId;
    function tick() {
      updatePhysics();
      renderCanvas();
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <canvas ref={canvasRef} id="footer-physics-canvas"></canvas>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="physics-node" style={{ fontFamily: 'var(--f-display)', display: 'block', fontSize: '22px', color: 'var(--on-ink)' }}>
              Three Lives of a Man
            </span>
            <p className="physics-node">
              A literary work by Dr. Felix — on fathers, brothers, loss, and the lives we are forced to rebuild.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4 className="physics-node">Read</h4>
              <a href="#/book" className="physics-node">The Book</a>
              <a href="#/book#themes" className="physics-node">Core Themes</a>
              <a href="#/book#purchase" className="physics-node">Buy the Book</a>
            </div>
            <div className="footer-col">
              <h4 className="physics-node">Dr. Felix</h4>
              <a href="#/research" className="physics-node">Research</a>
              <a href="#/opinion" className="physics-node">Opinion</a>
              <a href="#/fiction" className="physics-node">Fiction</a>
              <a href="#/affiliations" className="physics-node">Affiliations</a>
            </div>
            <div className="footer-col">
              <h4 className="physics-node">Elsewhere</h4>
              <div className="footer-socials" style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <a href="https://instagram.com/drfelix" target="_blank" rel="noreferrer" aria-label="Instagram" className="physics-node social-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://x.com/drfelix" target="_blank" rel="noreferrer" aria-label="X" className="physics-node social-icon">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/drfelix" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="physics-node social-icon">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="physics-node">© {new Date().getFullYear()} Dr. Felix. All rights reserved.</span>
          <span className="physics-node">Three lives. One man. One story.</span>
        </div>
      </div>
    </footer>
  );
}
