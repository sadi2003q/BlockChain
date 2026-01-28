import React from "react";
import {getColor} from "@/lib/_colors";

type IAnimatedBackground = {
    isDarkMode: boolean
}

export const AnimatedBackground = (
    {isDarkMode}: IAnimatedBackground,
) => {
    const colors = getColor(isDarkMode)
    return (
        <>
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: isDarkMode
                            ? 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)'
                            : 'linear-gradient(rgba(79, 70, 229, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.02) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        animation: 'gridMoveFast 10s linear infinite'
                    }}
                />
            </div>


            {/* Gradient Orbs */}
            <div
                className="fixed top-0 right-0 w-125 h-125 rounded-full blur-3xl opacity-10 animate-pulse pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.primary}, transparent)`,
                    animationDuration: '3s'
                }}
            />
        </>
    )
}