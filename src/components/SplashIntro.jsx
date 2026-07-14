import { useEffect, useState, useRef } from 'react';

const sequence = [
  { num: 'I', text: 'Birth', duration: 1200 },
  { num: 'II', text: 'Death', duration: 1200 },
  { num: 'III', text: 'Rebirth', duration: 2000 }
];

export default function SplashIntro({ onComplete }) {
  const [stage, setStage] = useState(0); // 0, 1, 2
  const [fadedOut, setFadedOut] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('book_splash_visited');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !!(hasVisited || reducedMotion);
    }
    return false;
  });
  const [numStyle, setNumStyle] = useState({ opacity: 0, transform: 'translateY(12px)' });
  const [textStyle, setTextStyle] = useState({ opacity: 0, transform: 'translateY(18px) scale(0.95)' });
  const [dashOffset, setDashOffset] = useState(200);
  
  const timerRef = useRef([]);

  const bypassSplash = () => {
    onComplete();
  };

  useEffect(() => {
    // Check if visited or reduced motion
    const hasVisited = sessionStorage.getItem('book_splash_visited');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasVisited || reducedMotion) {
      onComplete();
      return;
    }

    // Start sequence
    document.body.classList.add('splash-active');
    
    const playStage = (currentStage) => {
      if (currentStage >= sequence.length) {
        finishSplash();
        return;
      }

      setStage(currentStage);
      const stageData = sequence[currentStage];

      // Reset style to prepare for transition
      setNumStyle({ opacity: 0, transform: 'translateY(12px)', transition: 'none' });
      setTextStyle({ opacity: 0, transform: 'translateY(18px) scale(0.95)', transition: 'none' });
      
      // Delay to allow DOM reset
      const t1 = setTimeout(() => {
        setNumStyle({ opacity: 0.85, transform: 'translateY(0)', transition: 'opacity 0.4s ease, transform 0.4s ease' });
        setTextStyle({ opacity: 1, transform: 'translateY(0) scale(1)', transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' });
        
        if (stageData.text === 'Rebirth') {
          const tThread = setTimeout(() => {
            setDashOffset(0);
          }, 200);
          timerRef.current.push(tThread);
        }
      }, 50);
      timerRef.current.push(t1);

      // Start fade out before next stage
      const tFade = setTimeout(() => {
        setNumStyle({ opacity: 0, transform: 'translateY(-10px)', transition: 'opacity 0.4s ease, transform 0.4s ease' });
        setTextStyle({ opacity: 0, transform: 'translateY(-15px) scale(0.95)', transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' });

        const tNext = setTimeout(() => {
          playStage(currentStage + 1);
        }, 250); // delay between stages
        timerRef.current.push(tNext);
      }, stageData.duration - 350);
      timerRef.current.push(tFade);
    };

    const finishSplash = () => {
      sessionStorage.setItem('book_splash_visited', 'true');
      setFadedOut(true);
      document.body.classList.remove('splash-active');
      // Delay callbacks to allow layout transitions
      const tCallback = setTimeout(() => {
        onComplete();
      }, 800);
      timerRef.current.push(tCallback);
    };

    const tStart = setTimeout(() => {
      playStage(0);
    }, 300);
    timerRef.current.push(tStart);

    const activeTimers = timerRef.current;

    return () => {
      activeTimers.forEach(clearTimeout);
      document.body.classList.remove('splash-active');
    };
  }, [onComplete]);

  if (fadedOut) return null;

  return (
    <div
      id="splash-preloader"
      className={`splash-preloader splash-stage-${stage + 1}`}
    >
      <div className="splash-bg splash-bg-1"></div>
      <div className="splash-bg splash-bg-2"></div>
      <div className="splash-bg splash-bg-3"></div>
      
      <div className="splash-content">
        <div className="splash-numeral" style={numStyle}>
          {sequence[stage]?.num}
        </div>
        <div className="splash-text" style={textStyle}>
          {sequence[stage]?.text}
        </div>

        <svg className="splash-thread-svg" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path
            d="M 0 5 Q 25 2, 50 5 T 100 5"
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
      </div>
      
      <button
        className="splash-skip"
        id="splash-skip"
        aria-label="Skip intro animation"
        onClick={bypassSplash}
      >
        Skip Intro
      </button>
    </div>
  );
}
