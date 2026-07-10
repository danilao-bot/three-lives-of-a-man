import { useState, useEffect } from 'react';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [splashActive, setSplashActive] = useState(false);

  useEffect(() => {
    // Parse the hash on load
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      // If we are navigating to an anchor section on the home page (e.g. #contact)
      if (hash.startsWith('#') && !hash.startsWith('#/')) {
        setCurrentPage('home');
        document.body.classList.add('page-revealed');
        setSplashActive(false);
        // Let browser handle scroll or do it manually
        const targetId = hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }

      if (hash.startsWith('#/fiction')) {
        setCurrentPage('fiction');
        document.body.classList.add('page-revealed');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#/opinion')) {
        setCurrentPage('opinion');
        document.body.classList.add('page-revealed');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#/research')) {
        setCurrentPage('research');
        document.body.classList.add('page-revealed');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#/affiliations')) {
        setCurrentPage('affiliations');
        document.body.classList.add('page-revealed');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#/book') || hash.startsWith('#/story')) {
        setCurrentPage('book');
        const hasVisitedBook = sessionStorage.getItem('book_splash_visited');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (hasVisitedBook || reducedMotion) {
          document.body.classList.add('page-revealed');
          setSplashActive(false);
        } else {
          document.body.classList.remove('page-revealed'); // Hide page until splash is done
          setSplashActive(true);
        }
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
        document.body.classList.add('page-revealed');
        setSplashActive(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
      {/* Splash Intro Preloader (only on Book subpage first load) */}
      {currentPage === 'book' && splashActive && (
        <SplashIntro onComplete={handleSplashComplete} />
      )}

      {/* Sticky Navigation Bar */}
      <Navbar currentPage={currentPage} />

      {/* Main Content Sections */}
      <main>
        {renderContent()}
      </main>

      {/* Footer Section */}
      <Footer currentPage={currentPage} />
    </div>
  );
}
