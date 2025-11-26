import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';

export default function App() {
  // State to track if Hero intro animation is complete
  const [heroIntroDone, setHeroIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-page text-ink">
      {/* Navbar (shown only after Hero intro animation is complete)*/}
      {heroIntroDone && <Navbar />}

      {/* Hero Section */}
      <Hero onIntroComplete={() => setHeroIntroDone(true)} />

      {/* Features Section */}
      <Features />
    </div>
  );
}
