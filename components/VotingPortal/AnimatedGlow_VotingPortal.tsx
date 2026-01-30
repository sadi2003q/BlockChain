import React from "react";
import {getColor} from "@/lib/_colors";

type IAnimatedGlow = {
    isDarkMode: boolean
}

export const AnimatedGlow = (
    {isDarkMode}: IAnimatedGlow,
) => {

    const colors = getColor(isDarkMode)

    return (
        <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: colors.accent.primary }}
        />
    );
}