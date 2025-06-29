import { useEffect, useState } from 'react';
import { Bird, Plane } from 'lucide-react';

const CLOUD_COUNT = 5;
const BIRD_COUNT  = 3;
const PLANE_COUNT = 1;

export const DayBackground = () => {
  const [clouds, setClouds] = useState([]);
  const [birds,  setBirds]  = useState([]);
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const genClouds = () =>
      setClouds(Array.from({ length: CLOUD_COUNT }, (_, i) => ({
        id: `cloud-${i}`,
        size: Math.random() * 40 + 60,
        x: Math.random() * 100,
        y: Math.random() * 30 + 10,
        delay: Math.random() * 3,
        dur: Math.random() * 20 + 20,
      })));

    const genBirds = () =>
      setBirds(Array.from({ length: BIRD_COUNT }, (_, i) => ({
        id: `bird-${i}`,
        size: Math.random() * 16 + 24,
        x: Math.random() * 100,
        y: Math.random() * 20 + 20,
        delay: Math.random() * 5,
        dur: Math.random() * 15 + 15,
      })));

    const genPlanes = () =>
      setPlanes(Array.from({ length: PLANE_COUNT }, (_, i) => ({
        id: `plane-${i}`,
        size: 40,
        x: Math.random() * 100,
        y: Math.random() * 30 + 10,
        delay: Math.random() * 8,
        dur: Math.random() * 20 + 20,
      })));

    const handleResize = () => {
      genClouds();
      genBirds();
      genPlanes();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden day-bg">
      <div className="sun" />
      {clouds.map(c => (
        <div
          key={c.id}
          className="cloud animate-cloud"
          style={{
            width:  `${c.size}px`,
            height: `${c.size / 2}px`,
            left:   `${c.x}%`,
            top:    `${c.y}%`,
            animationDelay:    `${c.delay}s`,
            animationDuration: `${c.dur}s`,
          }}
        />
      ))}
      {birds.map(b => (
        <Bird
          key={b.id}
          className="bird animate-bird"
          style={{
            width:  `${b.size}px`,
            height: `${b.size}px`,
            left:   `${b.x}%`,
            top:    `${b.y}%`,
            animationDelay:    `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}
      {planes.map(p => (
        <Plane
          key={p.id}
          className="plane animate-plane"
          style={{
            width:  `${p.size}px`,
            height: `${p.size}px`,
            left:   `${p.x}%`,
            top:    `${p.y}%`,
            animationDelay:    `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
};
