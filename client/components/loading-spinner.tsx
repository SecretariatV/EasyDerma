import { useState, useEffect } from 'react';

interface SpinnerProps {
    size?: number;
    color?: string;
    secondaryColor?: string;
    thickness?: number;
    speed?: number;
}

export default function LoadingSpinner({
    size = 40,
    color = "#3498db",
    secondaryColor = "#e6e6e6",
    thickness = 4,
    speed = 1.5
}: SpinnerProps) {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 6) % 360);
        }, 16); // ~60fps

        return () => clearInterval(interval);
    }, []);

    const center = size / 2;
    const radius = size / 2 - thickness / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${circumference * 0.6} ${circumference * 0.4}`;

    return (
        <div className="flex items-center justify-center">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="animate-spin"
                style={{ animationDuration: `${speed}s` }}
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={secondaryColor}
                    strokeWidth={thickness}
                />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={thickness}
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    style={{ transformOrigin: 'center', transform: `rotate(${rotation}deg)` }}
                />
            </svg>
        </div>
    );
}