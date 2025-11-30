import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FeaturesDesign from './components/FeaturesDesign.jsx';
import FeaturesPerformance from './components/FeaturesPerformance.jsx';
import Reviews from './components/Reviews.jsx';
import LoadingScreen from './components/ui/LoadingScreen.jsx';
import useAssetPreloader from './hooks/useAssetPreloader.js';
import useMinSplashTime from './hooks/useMinSplashTime.js';

export default function App() {
  // State to track if Hero intro animation is complete
  const [heroIntroDone, setHeroIntroDone] = useState(false);
  // Splash stages: 'logo' -> 'presents' -> 'done'
  const [splashStage, setSplashStage] = useState('logo');
  // Asset preload state and splash timing (min 500 ms)
  const assetsLoaded = useAssetPreloader();
  const minSplashTimeElapsed = useMinSplashTime();

  // Advance splash stages when ready
  if (
    splashStage === 'logo' &&
    assetsLoaded &&
    minSplashTimeElapsed
  ) {
    setSplashStage('presents');
    setTimeout(() => {
      setSplashStage('done');
    }, 700);
  }

  return (
    <div className="min-h-screen bg-page text-ink">
      {splashStage !== 'done' && (
        <LoadingScreen showPresents={splashStage === 'presents'} />
      )}

      {splashStage === 'done' && (
        <>
          {/* Navbar (shown only after Hero intro animation is complete)*/}
          {heroIntroDone && <Navbar />}

          {/* Hero Section */}
          <Hero onIntroComplete={() => setHeroIntroDone(true)} />

          {/* Performance Features */}
          <FeaturesPerformance />

          {/* Design Features */}
          <FeaturesDesign />

          {/* Reviews */}
          <Reviews />
        </>
      )}
    </div>
  );
}
