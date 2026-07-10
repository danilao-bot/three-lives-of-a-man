import { useState, useEffect, useCallback } from 'react';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// New Portfolio Home Components
import FelixHero from './components/FelixHero';
import FelixIntro from './components/FelixIntro';
import FelixWhoIAm from './components/FelixWhoIAm';
import FelixExpertise from './components/FelixExpertise';
import FelixPhilosophy from './components/FelixPhilosophy';
import FelixContact from './components/FelixContact';

// Subpages
import Book from './components/Book';
import Fiction from './components/Fiction';
import Opinion from './components/Opinion';
import Research from './components/Research';
import Affiliations from './components/Affiliations';
import SplashIntro from './components/SplashIntro';
import Admin from './components/Admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [splashActive, setSplashActive] = useState(false);
  const [loaderKey, setLoaderKey] = useState(0);   // bumping this remounts PageLoader
  const [showLoader, setShowLoader] = useState(true);

  const navigateTo = useCallback((page, extraWork) => {
    window.scrollTo(0, 0);
    document.body.classList.remove('page-revealed');
    setCurrentPage(page);
    setShowLoader(true);
    setLoaderKey(k => k + 1);   // remount loader
    if (extraWork) extraWork();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // Anchor-only links on home page (e.g. #contact) — no loader
      if (hash.startsWith('#') && !hash.startsWith('#/')) {
        setCurrentPage('home');
        setSplashActive(false);
        const targetId = hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }

      if (hash.startsWith('#/fiction'))       navigateTo('fiction');
      else if (hash.startsWith('#/opinion'))   navigateTo('opinion');
      else if (hash.startsWith('#/research'))  navigateTo('research');
      else if (hash.startsWith('#/affiliations')) navigateTo('affiliations');
      else if (hash.startsWith('#/admin')) navigateTo('admin');
      else if (hash.startsWith('#/book') || hash.startsWith('#/story')) {
        navigateTo('book', () => {
          const hasVisited = sessionStorage.getItem('book_splash_visited');
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (!hasVisited && !reduced) setSplashActive(true);
        });
      } else {
        navigateTo('home');
        setSplashActive(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigateTo]);

  const handleSplashComplete = () => {
    setSplashActive(false);
    sessionStorage.setItem('book_splash_visited', 'true');
    document.body.classList.add('page-revealed');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'fiction':
        return <Fiction />;
      case 'opinion':
        return <Opinion />;
      case 'research':
        return <Research />;
      case 'affiliations':
        return <Affiliations />;
      case 'book':
        return <Book />;
      case 'admin':
        return <Admin />;
      case 'home':
      default:
        return (
          <>
            <FelixHero />
            <FelixIntro />
            <FelixWhoIAm />
            <FelixExpertise />
            <FelixPhilosophy />
            <FelixContact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-paper text-soft-ink antialiased overflow-x-hidden selection:bg-dawn-gold/30 selection:text-soft-ink">
      {/* Global page loader — shows on every route visit */}
      {showLoader && (
        <PageLoader
          key={loaderKey}
          onComplete={() => setShowLoader(false)}
        />
      )}

      {/* Book splash (only on first visit to #/book) */}
      {currentPage === 'book' && splashActive && (
        <SplashIntro onComplete={handleSplashComplete} />
      )}

      {/* Sticky Navigation Bar */}
      {currentPage !== 'admin' && <Navbar currentPage={currentPage} />}

      {/* Main Content Sections */}
      <main>
        {renderContent()}
      </main>

      {/* Footer Section */}
      {currentPage !== 'admin' && <Footer currentPage={currentPage} />}
    </div>
  );
}
