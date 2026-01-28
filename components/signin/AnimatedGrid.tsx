import React from "react";
import {getColor} from "@/lib/_colors";


type IAnimatedGrid = {
    isDarkMode: boolean
}

export const AnimatedGrid = (
    {isDarkMode}: IAnimatedGrid,
) => {

    const colors = getColor(isDarkMode)

    return (
        <>

            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: isDarkMode
                            ? 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)'
                            : 'linear-gradient(rgba(79, 70, 229, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.02) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        animation: 'gridMoveFast 12s linear infinite'
                    }}
                />
            </div>

            <div
                className="absolute top-20 right-20 w-125 h-125 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.primary}, transparent)`,
                    animationDuration: '2.5s'
                }}
            />
            <div
                className="absolute bottom-20 left-20 w-125 h-125 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.secondary}, transparent)`,
                    animationDuration: '3.5s',
                    animationDelay: '0.5s'
                }}
            />
        </>
    )
}