import { useEffect, useState } from 'react';
import { Bird, Plane } from 'lucide-react';

const CLOUD_COUNT = 5;
const BIRD_COUNT = 3;
const PLANE_COUNT = 1;

export const DayBackground = () => {
  const [clouds, setClouds] = useState([]);
  const [birds, setBirds] = useState([]);
  const [planes, setPlanes] = useState([]);

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

    const generateBirds = () => {
      const next = Array.from({ length: BIRD_COUNT }, (_, i) => ({
        id: `bird-${i}`,
        size: Math.random() * 16 + 24,
        x: Math.random() * 100,
        y: Math.random() * 20 + 20,
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 15,
      }));
      setBirds(next);
    };

    const generatePlanes = () => {
      const next = Array.from({ length: PLANE_COUNT }, (_, i) => ({
        id: `plane-${i}`,
        size: 40,
        x: Math.random() * 100,
        y: Math.random() * 30 + 10,
        delay: Math.random() * 8,
        duration: Math.random() * 20 + 20,
      }));
      setPlanes(next);
    };

    generateClouds();
    generateBirds();
    generatePlanes();
    window.addEventListener('resize', generateClouds);
    window.addEventListener('resize', generateBirds);
    window.addEventListener('resize', generatePlanes);
    return () => {
      window.removeEventListener('resize', generateClouds);
      window.removeEventListener('resize', generateBirds);
      window.removeEventListener('resize', generatePlanes);
    };
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
      {birds.map((b) => (
        <Bird
          key={b.id}
          className="bird animate-bird"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.x}%`,
            top: `${b.y}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
      {planes.map((p) => (
        <Plane
          key={p.id}
          className="plane animate-plane"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
