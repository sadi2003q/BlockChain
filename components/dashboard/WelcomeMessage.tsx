import React from "react";
import {getColor} from "@/lib/_colors";

type IWelcomeMessage = {
    isDarkMode: boolean
    name: string
}


export const WelcomeMessage = (
    {isDarkMode, name}: IWelcomeMessage,
) => {

    const colors = getColor(isDarkMode);

    return (
        <div className="mb-6 animate-fadeInUp">
            <h1
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                    color: colors.text.primary,
                    fontFamily: "'Sora', sans-serif"
                }}
            >
                Welcome back, {name}! 👋
            </h1>
            <p className="text-base sm:text-lg" style={{ color: colors.text.secondary }}>
                Here&#39;s your voting dashboard overview
            </p>
        </div>
    );
}