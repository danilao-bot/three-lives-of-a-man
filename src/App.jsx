import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OpeningQuote from './components/OpeningQuote';
import ThreeLives from './components/ThreeLives';
import AboutTheStory from './components/AboutTheStory';
import WhyThisMatters from './components/WhyThisMatters';
import CoreThemes from './components/CoreThemes';
import AuthorsNote from './components/AuthorsNote';
import AboutTheAuthor from './components/AboutTheAuthor';
import BookDetails from './components/BookDetails';
import Countdown from './components/Countdown';
import Purchase from './components/Purchase';
import FinalReflection from './components/FinalReflection';
import Footer from './components/Footer';

// Subpages
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
      } else {
        setCurrentPage('home');
        // If not running splash, reveal the home page
        const hasVisited = sessionStorage.getItem('tlm_visited');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (hasVisited || reducedMotion) {
          document.body.classList.add('page-revealed');
        } else {
          setSplashActive(true);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSplashComplete = () => {
    setSplashActive(false);
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
      case 'home':
      default:
        return (
          <>
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Opening Quote Section (Signature Device #1) */}
            <OpeningQuote />

            {/* 3. The Three Lives Cards Centerpiece */}
            <ThreeLives />

            {/* 4. About The Story Section */}
            <AboutTheStory />

            {/* 5. Why This Story Matters Section */}
            <WhyThisMatters />

            {/* 6. Core Themes Section */}
            <CoreThemes />

            {/* 7. Author's Note Section */}
            <AuthorsNote />

            {/* 8. About The Author Section */}
            <AboutTheAuthor />

            {/* 9. Book Details Section (Frosted Glass Card) */}
            <BookDetails />

            {/* 10. Release Countdown Section */}
            <Countdown />

            {/* 11. Purchase Section (Liquid Glass Card) */}
            <Purchase />

            {/* 12. Final Reflection Section (Signature Device #2) */}
            <FinalReflection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-paper text-soft-ink antialiased overflow-x-hidden selection:bg-dawn-gold/30 selection:text-soft-ink">
      {/* Splash Intro Preloader */}
      {currentPage === 'home' && splashActive && (
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
