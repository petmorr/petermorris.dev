
import { useEffect, useState, useCallback } from 'react';

const CLOUD_COUNT = 12;
const BIRD_COUNT = 8;

const generateElement = (type, index) => {
  const baseConfig = {
    id: `${type}-${index}`,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 25,
  };

  switch (type) {
    case 'cloud':
      return {
        ...baseConfig,
        x: -250,
        y: Math.random() * 60 + 15,
        size: Math.random() * 120 + 80,
        opacity: Math.random() * 0.3 + 0.7,
        duration: Math.random() * 40 + 50,
        layer: Math.floor(Math.random() * 3),
      };
        case 'bird':
            return {
                ...baseConfig,
                x: -120 - Math.random() * 80,
                y: Math.random() * 20 + 40,
                size: Math.random() * 25 + 30,
                duration: Math.random() * 20 + 25,
                flockOffset: Math.random() * 10 - 5,
            };
        default:
            return baseConfig;
    }
};

    /**
     * Bird SVG component with animated wings
     */
    const BirdSVG = ({ size }) => (
      <svg
    width={size}
    height={size * 0.45}
    viewBox="0 0 140 65"
      >
        <ellipse cx="70" cy="32" rx="35" ry="7" fill="#1e3a8a" />
        <ellipse cx="98" cy="30" rx="14" ry="10" fill="#1e3a8a" />
        <path d="M110 30 L122 27 L120 32 L110 33 Z" fill="#f59e0b" />

        {/* Tail feathers */}
        <path d="M35 32 Q18 28 8 30 Q12 34 22 36 Q28 38 35 36 Z" fill="#1e3a8a" />
        <path d="M33 34 Q16 30 6 32 Q10 36 20 38 Q26 40 33 38 Z" fill="#1d4ed8" />
        <path d="M31 36 Q14 32 4 34 Q8 38 18 40 Q24 42 31 40 Z" fill="#2563eb" opacity="0.7" />

        {/* Eye */}
        <circle cx="101" cy="28" r="3" fill="white" />
        <circle cx="102" cy="27" r="2" fill="black" />
        <circle cx="102.5" cy="26.5" r="0.8" fill="white" />
        <ellipse cx="101.5" cy="29" rx="1" ry="0.5" fill="#e5e7eb" opacity="0.6" />

        {/* Body markings */}
        <ellipse cx="70" cy="30" rx="20" ry="3" fill="#3b82f6" opacity="0.4" />
        <ellipse cx="85" cy="32" rx="8" ry="2" fill="#1d4ed8" opacity="0.3" />

        {/* Wings */}
        <g className="wing-left" style={{ transformOrigin: '65px 28px' }}>
            <path d="M65 28 Q45 12 30 17 Q25 22 30 27 Q35 30 45 30 Q55 28 65 28 Z" fill="#2563eb" />
            <path d="M30 17 Q25 15 23 20 Q27 24 33 22 Q35 20 30 17 Z" fill="#1d4ed8" />
            <path d="M40 22 Q35 20 37 26 Q40 28 45 26 Q47 24 40 22 Z" fill="#3b82f6" opacity="0.8" />
        </g>

        <g className="wing-right" style={{ transformOrigin: '75px 28px' }}>
            <path d="M75 28 Q95 12 110 17 Q115 22 110 27 Q105 30 95 30 Q85 28 75 28 Z" fill="#2563eb" />
            <path d="M110 17 Q115 15 117 20 Q113 24 107 22 Q105 20 110 17 Z" fill="#1d4ed8" />
            <path d="M100 22 Q105 20 103 26 Q100 28 95 26 Q93 24 100 22 Z" fill="#3b82f6" opacity="0.8" />
        </g>

        {/* Feather markings */}
        <path d="M55 28 Q50 30 55 35" stroke="#1d4ed8" strokeWidth="1.2" fill="none" opacity="0.7" />
        <path d="M85 28 Q90 30 85 35" stroke="#1d4ed8" strokeWidth="1.2" fill="none" opacity="0.7" />
    </svg>
);

    /**
     * Day background scene with animated clouds and birds
     */
    export const DayBackground = () => {
      const [elements, setElements] = useState({
    clouds: [],
    birds: [],
      });

      const generateAllElements = useCallback(() => ({
    clouds: Array.from({ length: CLOUD_COUNT }, (_, i) => generateElement('cloud', i)),
    birds: Array.from({ length: BIRD_COUNT }, (_, i) => generateElement('bird', i)),
      }), []);

      useEffect(() => {
    // Generate elements initially and on window resize
    const handleResize = () => setElements(generateAllElements());

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
      }, [generateAllElements]);

      const getCloudLayerClass = (layer) => {
    const layers = ['cloud-front', 'cloud-mid', 'cloud-back'];
    return layers[layer] || 'cloud-mid';
      };

          return (
            <div className="day-sky-container">
              {/* Sky gradient background with sun */}
              <div className="day-background">
        <div className="sun animate-pulse-slow" />
              </div>

              {/* Animated elements container */}
              <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                              {/* Cloud elements */}
                              {elements.clouds.map((cloud) => (
                <div
                  key={cloud.id}
                  className={`cloud animate-cloud-drift ${getCloudLayerClass(cloud.layer)}`}
                  style={{
                    width: `${cloud.size}px`,
                    height: `${cloud.size * 0.5}px`,
                    left: `${cloud.x}px`,
                    top: `${cloud.y}%`,
                    opacity: cloud.opacity,
                    animationDuration: `${cloud.duration}s`,
                    animationDelay: `${cloud.delay}s`,
                    position: 'absolute',
                    zIndex: 5 - cloud.layer
                  }}
                />
                ))}

              {/* Bird elements */}
              {elements.birds.map((bird) => (
                <div
                  key={bird.id}
                  className="absolute animate-bird-flock transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${bird.x}px`,
                    top: `${bird.y + bird.flockOffset}%`,
                    animationDuration: `${bird.duration}s`,
                    animationDelay: `${bird.delay}s`,
                    zIndex: 7,
                    filter: 'drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.25))',
                  }}
                >
                  <BirdSVG size={bird.size} />
                </div>
              ))}
            </div>
        </div>
    );
};