// Snowfall animation component for Christmas theme
'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
    id: number;
    left: string;
    animationDelay: string;
    animationDuration: string;
    fontSize: string;
}

export default function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        // Create 50 snowflakes with random properties
        const flakes: Snowflake[] = [];
        for (let i = 0; i < 50; i++) {
            flakes.push({
                id: i,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                fontSize: `${10 + Math.random() * 10}px`,
            });
        }
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="snowfall-container">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: flake.left,
                        animationDelay: flake.animationDelay,
                        animationDuration: flake.animationDuration,
                        fontSize: flake.fontSize,
                    }}
                >
                    ❄
                </div>
            ))}

            <style jsx>{`
        .snowfall-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .snowflake {
          position: absolute;
          top: -20px;
          color: white;
          opacity: 0.8;
          animation: fall linear infinite;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        /* Reduce on mobile for performance */
        @media (max-width: 768px) {
          .snowflake:nth-child(n+26) {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
