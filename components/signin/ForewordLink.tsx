import React from "react";
import {getColor} from "@/lib/_colors";

type IForewordLink = {
    isDarkMode: boolean
}
export const ForewordLink = (
    {isDarkMode}: IForewordLink,
) => {

    const colors = getColor(isDarkMode);

    return (
        <div
            className="text-center mt-8 animate-fadeInUp"
            style={{ animationDelay: '900ms' }}
        >
            <p
                className="text-sm"
                style={{
                    color: colors.text.secondary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Don&#39;t have an account?{' '}
                <a
                    href="#"
                    className="font-bold transition-all duration-200 hover:opacity-80"
                    style={{
                        color: colors.accent.primary
                    }}
                >
                    Request Access
                </a>
            </p>
        </div>
    );
}