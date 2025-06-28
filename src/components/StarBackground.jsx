import { useCallback, useEffect, useState } from 'react';

const STAR_DENSITY = 10000; //px² per star
const METEOR_COUNT = 5;

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const generateStars = useCallback(() => {
    const count = Math.floor((window.innerWidth * window.innerHeight) / STAR_DENSITY);
    const next = Array.from({ length: count }, (_, i) => ({
      id: `star-${i}`,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 4 + 2,
    }));
    setStars(next);
  }, []);

  const generateMeteors = useCallback(() => {
    const next = Array.from({ length: METEOR_COUNT }, (_, i) => ({
      id: `meteor-${i}`,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 20,
      delay: Math.random() * 15,
      duration: Math.random() * 3 + 3,
    }));
    setMeteors(next);
  }, []);

  useEffect(() => {
    generateStars();
    generateMeteors();
    window.addEventListener('resize', generateStars);
    window.addEventListener('resize', generateMeteors);
    return () => {
      window.removeEventListener('resize', generateStars);
      window.removeEventListener('resize', generateMeteors);
    };
  }, [generateStars, generateMeteors]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {meteors.map((m) => (
        <div
          key={m.id}
          className="meteor animate-meteor"
          style={{
            width: `${m.size * 50}px`,
            height: `${m.size * 2}px`,
            left: `${m.x}%`,
            top: `${m.y}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  );
};