import { useCallback, useEffect, useState } from 'react';

// screen density: 1 star per 10 000 px²
const STAR_DENSITY = 10_000;
const METEOR_COUNT = 10;
const UFO_COUNT    = 2;

export const StarBackground = () => {
  /* state buckets */
  const [stars,   setStars]   = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [ufos,    setUfos]    = useState([]);

  /* generators --------------------------------------------------- */
  const genStars = useCallback(() => {
    const count = Math.floor((window.innerWidth * window.innerHeight) / STAR_DENSITY);
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: `star-${i}`,
        x:  Math.random() * 100,
        y:  Math.random() * 100,
        size: Math.random() * 4 + 2,             // 2–6 px
        opacity: Math.random() * 0.5 + 0.5,      // .5–1
        twinkle: Math.random() * 4 + 2,          // 2–6 s
      })),
    );
  }, [setStars]);

  const genMeteors = useCallback(() => {
    setMeteors(
      Array.from({ length: METEOR_COUNT }, (_, i) => ({
        id:   `meteor-${i}`,
        x:    Math.random() * 100,
        y:    Math.random() * 45,                // upper half
        delay: Math.random() * 12,
        dur:   Math.random() * 4 + 4,            // 4–8 s
        angle: Math.random() * 60 + 200,         // 200°–260°
        len:   Math.random() * 120 + 160,        // 160–280 px
      })),
    );
  }, [setMeteors]);

  const genUfos = useCallback(() => {
    setUfos(
      Array.from({ length: UFO_COUNT }, (_, i) => ({
        id:     `ufo-${i}`,
        y:      Math.random() * 50 + 20,         // 20–70 vh
        delay:  Math.random() * 25,
        dur:    Math.random() * 6 + 10,          // 10–16 s
        variant: Math.random() > 0.5 ? 'ufo--fast' : 'ufo--slow',
      })),
    );
  }, [setUfos]);

  /* init + resize listeners ------------------------------------- */
  useEffect(() => {
    genStars(); genMeteors(); genUfos();
    window.addEventListener('resize', genStars);
    return () => window.removeEventListener('resize', genStars);
  }, [genStars, genMeteors, genUfos]);

  /* render ------------------------------------------------------- */
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden dark:block">
      {/* static moon */}
      <div className="moon" />

      {/* stars */}
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            width:  `${s.size}px`,
            height: `${s.size}px`,
            left:   `${s.x}%`,
            top:    `${s.y}%`,
            opacity: s.opacity,
            '--twinkle-duration': `${s.twinkle}s`,
          }}
        />
      ))}

      {/* meteors */}
      {meteors.map(m => (
        <div
          key={m.id}
          className="meteor"
          style={{
            left: `${m.x}%`,
            top:  `${m.y}%`,
            animationDelay:   `${m.delay}s`,
            '--meteor-duration':    `${m.dur}s`,
            '--meteor-angle':       `${m.angle}deg`,
            '--meteor-tail-length': `${m.len}px`,
          }}
        />
      ))}

      {/* UFOs */}
      {ufos.map(u => (
        <div
          key={u.id}
          className={`ufo ${u.variant}`}
          style={{
            top: `${u.y}%`,
            animationDelay:  `${u.delay}s`,
            '--ufo-duration': `${u.dur}s`,
          }}
        />
      ))}
    </div>
  );
};
