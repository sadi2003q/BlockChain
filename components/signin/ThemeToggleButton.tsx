import {getColor} from "@/lib/_colors";
import {Moon, Sun} from "lucide-react";
import React from "react";


type IThemeToggleButton = {
    isDarkMode: boolean
    setIsDarkMode: (isDarkMode: boolean) => void
}
export const ThemeToggleButton = (
    {isDarkMode, setIsDarkMode}: IThemeToggleButton
) => {

    const colors = getColor(isDarkMode)

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
                backgroundColor: colors.bg.tertiary,
                border: `1px solid ${colors.border.subtle}`,
                boxShadow: `0 4px 16px ${colors.glow.primary}`
            }}
        >
            {isDarkMode ? (
                <Sun className="w-5 h-5" style={{ color: colors.accent.warning }} />
            ) : (
                <Moon className="w-5 h-5" style={{ color: colors.accent.primary }} />
            )}
        </button>
    )
}