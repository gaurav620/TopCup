// Christmas countdown timer component
'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function ChristmasCountdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = (): TimeLeft => {
            const christmas = new Date('2025-12-25T00:00:00');
            const now = new Date();
            const difference = christmas.getTime() - now.getTime();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-3 justify-center">
            <div className="countdown-box">
                <div className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="countdown-label">Days</div>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-box">
                <div className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="countdown-label">Hours</div>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-box">
                <div className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="countdown-label">Mins</div>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-box">
                <div className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="countdown-label">Secs</div>
            </div>

            <style jsx>{`
        .countdown-box {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 12px 16px;
          min-width: 70px;
          text-align: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .countdown-number {
          font-size: 28px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .countdown-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 4px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .countdown-colon {
          font-size: 28px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 640px) {
          .countdown-box {
            padding: 8px 12px;
            min-width: 60px;
          }

          .countdown-number {
            font-size: 20px;
          }

          .countdown-label {
            font-size: 9px;
          }

          .countdown-colon {
            font-size: 20px;
          }
        }
      `}</style>
        </div>
    );
}
