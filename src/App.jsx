import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-page text-ink">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}
