import { useEffect, useState } from 'react';

// Preload core static assets (hero_scene + feature images)
export default function useAssetPreloader() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const imageSources = [
      '/images/Manora_FeaturesPerformance_Scene.webp',
      '/images/Manora_Color_Graphite.webp',
      '/images/Manora_Color_Glacier.webp',
      '/images/Manora_Color_Copper.webp',
      '/images/Manora_Chassis.webp',
      '/images/Manora_Ports.webp',
      '/images/Manora_Display.webp',
      '/images/Manora_Keyboard.webp',
      '/images/Manora_Review_Sample.png',
    ];

    const videoSources = ['/media/Manora_Hero_Scene.webm'];

    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = src;
      });

    const preloadVideo = (src) =>
      new Promise((resolve) => {
        const video = document.createElement('video');
        let settled = false;

        const done = () => {
          if (settled) return;
          settled = true;
          video.removeEventListener('loadeddata', done);
          video.removeEventListener('error', done);
          resolve();
        };

        video.addEventListener('loadeddata', done);
        video.addEventListener('error', done);
        video.preload = 'auto';
        video.src = src;

        // Fallback timeout 
        setTimeout(done, 4000);
      });

    // I picked up async programming during my last internship :)
    const loadAssets = async () => {
      await Promise.all([
        ...imageSources.map(preloadImage),
        ...videoSources.map(preloadVideo),
      ]);
      setAssetsLoaded(true);
    };

    loadAssets();
  }, []);

  return assetsLoaded;
}

