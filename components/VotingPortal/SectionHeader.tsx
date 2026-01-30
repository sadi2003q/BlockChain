import React from "react";
import {getColor} from "@/lib/_colors";


type ISectionHeader = {
    isDarkMode: boolean;
    title: string;
}

export const SectionHeader = (
    {isDarkMode, title}: ISectionHeader) => {

    const colors = getColor(isDarkMode);

    return (
        <div className="mb-6 sm:mb-8 relative z-10">
            <h2
                className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3"
                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
            >
                {title}
            </h2>
            <p
                className="text-sm sm:text-base"
                style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
            >
                Select one candidate below. Your choice is completely anonymous and secured by blockchain technology.
            </p>
        </div>
    );
}