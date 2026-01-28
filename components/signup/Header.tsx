import {Shield} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";


type IHeader = {
    isDarkMode: boolean
}

export const Header = (
    {isDarkMode}: IHeader,
) => {

    const colors = getColor(isDarkMode);

    return (
        <div className="flex items-center gap-3 mb-8">
            <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300"
                style={{
                    backgroundColor: colors.accent.primary,
                    boxShadow: `0 12px 32px ${colors.glow.primary}`
                }}
            >
                <Shield className="w-8 h-8 text-white" />
            </div>
            <span
                className="text-3xl font-bold tracking-tight"
                style={{
                    fontFamily: "'Sora', sans-serif",
                    color: colors.text.primary
                }}
            >
                                VoteSecure
                            </span>
        </div>
    )
}