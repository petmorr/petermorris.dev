import { useEffect, useState } from 'react';

const CLOUD_COUNT = 5;

export const DayBackground = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const generateClouds = () => {
      const next = Array.from({ length: CLOUD_COUNT }, (_, i) => ({
        id: `cloud-${i}`,
        size: Math.random() * 40 + 60,
        x: Math.random() * 100,
        y: Math.random() * 30 + 10,
        delay: Math.random() * 3,
        duration: Math.random() * 20 + 20,
      }));
      setClouds(next);
    };

    generateClouds();
    window.addEventListener('resize', generateClouds);
    return () => window.removeEventListener('resize', generateClouds);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden day-bg dark:hidden">
      <div className="sun" />
      {clouds.map((c) => (
        <div
          key={c.id}
          className="cloud animate-cloud"
          style={{
            width: `${c.size}px`,
            height: `${c.size / 2}px`,
            left: `${c.x}%`,
            top: `${c.y}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
