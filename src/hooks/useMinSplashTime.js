import { useEffect, useState } from 'react';

// This hook ensures a minimum splash screen time
// Becaueuse assets load too quickly lol
export default function useMinSplashTime(durationMs = 1_000) {
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setElapsed(true);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs]);

  return elapsed;
}
