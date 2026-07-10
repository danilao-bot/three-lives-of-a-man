import { useEffect } from 'react';
import Hero from './Hero';
import OpeningQuote from './OpeningQuote';
import ThreeLives from './ThreeLives';
import AboutTheStory from './AboutTheStory';
import WhyThisMatters from './WhyThisMatters';
import CoreThemes from './CoreThemes';
import BookDetails from './BookDetails';
import Countdown from './Countdown';
import Purchase from './Purchase';
import FinalReflection from './FinalReflection';

export default function Book() {
  useEffect(() => {
    // Scroll to section based on hash after rendering
    const handleScrollOnHash = () => {
      const hash = window.location.hash;
      if (hash.includes('#')) {
        const parts = hash.split('#');
        // If hash format is #/book#themes, parts will be ["", "/book", "themes"]
        const targetId = parts[parts.length - 1];
        if (targetId && targetId !== 'book' && targetId !== 'story' && !targetId.startsWith('/')) {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };

    handleScrollOnHash();
    window.addEventListener('hashchange', handleScrollOnHash);
    return () => window.removeEventListener('hashchange', handleScrollOnHash);
  }, []);

  return (
    <>
      <Hero />
      <OpeningQuote />
      <ThreeLives />
      <AboutTheStory />
      <WhyThisMatters />
      <CoreThemes />
      <BookDetails />
      <Countdown />
      <Purchase />
      <FinalReflection />
    </>
  );
}
