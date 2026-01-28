import {Shield} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";

type ISecurityPage = {
    isDarkMode: boolean
}
export const Security = (
    {isDarkMode}: ISecurityPage,
) => {
    const colors = getColor(isDarkMode);
    return (
        <div
            className="flex items-center justify-center gap-2 mt-8 animate-fadeInUp"
            style={{ animationDelay: '1000ms' }}
        >
            <Shield
                className="w-4 h-4"
                style={{ color: colors.accent.success }}
            />
            <span
                className="text-xs font-medium"
                style={{
                    color: colors.text.tertiary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                        Protected by 256-bit encryption
                    </span>
        </div>
    );
}