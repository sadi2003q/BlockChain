"use client"

import React, { useMemo } from 'react';
import { getColor } from '@/lib/_colors';

interface DashboardAnimationProps {
    isDarkMode: boolean;
}

export const DashboardAnimation: React.FC<DashboardAnimationProps> = ({ isDarkMode }) => {
    const colors = getColor(isDarkMode);

    // Generate particle positions once to avoid hydration mismatch
    const particles = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            left: (i * 37 + 13) % 100, // Deterministic values
            top: (i * 47 + 23) % 100,
            opacity: 0.3 + ((i * 17) % 40) / 100,
            duration: 5 + ((i * 23) % 100) / 10,
            delay: (i * 13) % 50 / 10
        }));
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-[0.15]">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern
                            id="dashboardGrid"
                            width="48"
                            height="48"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 48 0 L 0 0 0 48"
                                fill="none"
                                stroke={colors.accent.primary}
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#dashboardGrid)"
                        style={{ animation: 'gridMoveFast 4s linear infinite' }}
                    />
                </svg>
            </div>

            {/* Gradient Orbs */}
            <div
                className="absolute -top-48 -left-48 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.primary} 0%, transparent 70%)`,
                    animation: 'pulse 6s ease-in-out infinite'
                }}
            />
            <div
                className="absolute top-1/3 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.secondary || colors.accent.primary} 0%, transparent 70%)`,
                    animation: 'pulse 8s ease-in-out infinite',
                    animationDelay: '2s'
                }}
            />
            <div
                className="absolute -bottom-32 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-15"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.primary} 0%, transparent 70%)`,
                    animation: 'pulse 7s ease-in-out infinite',
                    animationDelay: '4s'
                }}
            />

            {/* Floating Particles */}
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        backgroundColor: colors.accent.primary,
                        opacity: particle.opacity,
                        animation: `float ${particle.duration}s ease-in-out infinite`,
                        animationDelay: `${particle.delay}s`
                    }}
                />
            ))}

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    50% {
                        transform: translateY(0) translateX(20px);
                    }
                    75% {
                        transform: translateY(20px) translateX(10px);
                    }
                }
            `}</style>
        </div>
    );
};
