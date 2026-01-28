import React from "react";
import {getColor} from "@/lib/_colors";

type IAnimation = {
    isDarkMode: boolean
}

export const Animation = (
    {isDarkMode}: IAnimation,
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
                        backgroundSize: '40px 40px',
                        animation: 'gridMoveFast 10s linear infinite'
                    }}
                />
            </div>

            <div
                className="absolute top-20 right-20 w-100 h-100 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.primary}, transparent)`,
                    animationDuration: '2s'
                }}
            />


            <div
                className="absolute bottom-20 left-20 w-87.5 h-87.5 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.secondary}, transparent)`,
                    animationDuration: '3s',
                    animationDelay: '0.5s'
                }}
            />

        </>
    )
}