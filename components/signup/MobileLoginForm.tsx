import {Shield} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";


type IMobileLoginForm = {
    isDarkMode: boolean
}

export const MobileLoginForm = (
    {isDarkMode}: IMobileLoginForm,
) => {

    const colors = getColor(isDarkMode);

    return (
        <div className="lg:hidden text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                        backgroundColor: colors.accent.primary,
                        boxShadow: `0 8px 24px ${colors.glow.primary}`
                    }}
                >
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <span
                    className="text-2xl font-bold"
                    style={{
                        fontFamily: "'Sora', sans-serif",
                        color: colors.text.primary
                    }}
                >
                                    VoteSecure
                                </span>
            </div>
        </div>
    );
}