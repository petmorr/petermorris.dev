
import { useCallback, useEffect, useState } from 'react';

const STAR_DENSITY = 4000;
// REMOVED METEOR_COUNT - no more React meteors
const CONSTELLATION_COUNT = 4;

const generateStar = (i) => ({
    id: `star-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.7 + 0.3,
    twinkleDuration: Math.random() * 5 + 2,
    twinkleDelay: Math.random() * 8,
    brightness: Math.random() * 0.4 + 0.6,
    color: Math.random() > 0.85 ? 'blue' : Math.random() > 0.93 ? 'red' : 'white',
});

const generateConstellation = (i) => {
    const centerX = Math.random() * 70 + 15;
    const centerY = Math.random() * 70 + 15;
    const starCount = Math.floor(Math.random() * 5) + 4;

    return {
        id: `constellation-${i}`,
        centerX,
        centerY,
        stars: Array.from({ length: starCount }, (_, j) => ({
            id: `const-star-${i}-${j}`,
            x: centerX + (Math.random() - 0.5) * 15,
            y: centerY + (Math.random() - 0.5) * 15,
            size: Math.random() * 2 + 2.5,
            brightness: Math.random() * 0.4 + 0.6,
        }))
    };
};

export const StarBackground = () => {
    const [elements, setElements] = useState({
        stars: [],
        constellations: []
        // REMOVED meteors array
    });

    const generateAllElements = useCallback(() => {
        const count = Math.floor((window.innerWidth * window.innerHeight) / STAR_DENSITY);

        return {
            stars: Array.from({ length: Math.max(count, 150) }, (_, i) => generateStar(i)),
            constellations: Array.from({ length: CONSTELLATION_COUNT }, (_, i) => generateConstellation(i)),
            // REMOVED meteors generation
        };
    }, []);

    useEffect(() => {
        const handleResize = () => setElements(generateAllElements());

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [generateAllElements]);

    return (
        <div className="night-sky-container">
            {/* Night Sky Background */}
            <div className="night-background" />

            {/* FIXED: Nebula effects - at proper z-index */}
            <div className="nebula nebula-1 animate-float" />
            <div className="nebula nebula-2 animate-[float_25s_ease-in-out_infinite_reverse]" />

            {/* Star Elements Container */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                {/* Regular stars */}
                {elements.stars.map((star) => (
                    <div
                        key={star.id}
                        className={`star star-${star.color} animate-twinkle`}
                        style={{
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            opacity: star.opacity,
                            animationDuration: `${star.twinkleDuration}s`,
                            animationDelay: `${star.twinkleDelay}s`,
                        }}
                    />
                ))}

                {/* Constellation stars */}
                {elements.constellations.map((constellation) => (
                    <div key={constellation.id} className="constellation">
                        {constellation.stars.map((star) => (
                            <div
                                key={star.id}
                                className="star star-constellation animate-twinkle-slow"
                                style={{
                                    width: `${star.size}px`,
                                    height: `${star.size}px`,
                                    left: `${star.x}%`,
                                    top: `${star.y}%`,
                                    opacity: star.brightness,
                                }}
                            />
                        ))}
                    </div>
                ))}

                {/* COMPLETELY REMOVED: No more React meteors - handled purely by CSS */}
            </div>

            {/* Pure CSS meteors container */}
            <div className="night-meteors-container" />

            {/* FIXED: Moon without halo - clean appearance */}
            <div className="moon animate-float" />
        </div>
    );
};