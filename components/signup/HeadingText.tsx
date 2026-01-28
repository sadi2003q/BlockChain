import React from "react";
import {getColor} from "@/lib/_colors";

type IHeadingText = {
    isDarkMode: boolean
}

export const HeadingText = (
    {isDarkMode}: IHeadingText,
) => {

    const colors = getColor(isDarkMode);

    return (
        <>
            <h1
                className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{
                    fontFamily: "'Sora', sans-serif",
                    color: colors.text.primary
                }}
            >
                Join the Future of{' '}
                <span style={{ color: colors.accent.primary }}>
                                Secure Elections
                            </span>
            </h1>

            <p
                className="text-lg mb-10 leading-relaxed"
                style={{
                    color: colors.text.secondary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Create your account and gain access to the most secure,
                transparent election platform trusted by 450+ institutions worldwide.
            </p>
        </>
    );
}