import { useState, useEffect } from 'react';

export default function Navbar({ currentPage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 18) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, path) => {
    setIsOpen(false);
    // If navigating to home story anchor, we handle it if already on home page
    if (path === '#story' && currentPage === 'home') {
      e.preventDefault();
      const el = document.getElementById('story');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getLinkClass = (pageName) => {
    return currentPage === pageName ? 'is-active' : '';
  };

  return (
    <nav className={`nav ${isScrolled ? 'is-scrolled' : ''} ${isOpen ? 'is-open' : ''}`}>
      <a href="#/" onClick={(e) => handleLinkClick(e, '#/')} className="nav-brand">
        <span className="mark"></span>Three Lives of a Man
      </a>

      <div className="nav-links">
        <a
          href="#story"
          onClick={(e) => handleLinkClick(e, '#story')}
          className={getLinkClass('home')}
        >
          The Story
        </a>
        <a
          href="#/research"
          onClick={(e) => handleLinkClick(e, '#/research')}
          className={getLinkClass('research')}
        >
          Research
        </a>
        <a
          href="#/opinion"
          onClick={(e) => handleLinkClick(e, '#/opinion')}
          className={getLinkClass('opinion')}
        >
          Opinion
        </a>
        <a
          href="#/fiction"
          onClick={(e) => handleLinkClick(e, '#/fiction')}
          className={getLinkClass('fiction')}
        >
          Fiction
        </a>
        <a
          href="#/affiliations"
          onClick={(e) => handleLinkClick(e, '#/affiliations')}
          className={getLinkClass('affiliations')}
        >
          Affiliations
        </a>
      </div>

      <div className="nav-actions">
        <a
          href="#/purchase"
          onClick={(e) => {
            setIsOpen(false);
            if (currentPage === 'home') {
              e.preventDefault();
              const el = document.getElementById('purchase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="btn btn-primary btn-sm"
        >
          Buy the Book
        </a>
        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
