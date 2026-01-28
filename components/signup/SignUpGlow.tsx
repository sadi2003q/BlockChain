import React from "react";
import {getColor} from "@/lib/_colors";

type ISignUpGlow = {
    isDarkMode: boolean
}

export const SignUpGlow = (
    {isDarkMode}: ISignUpGlow,
) => {

    const colors = getColor(isDarkMode);

    return (
        <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: colors.accent.primary }}
        />
    );
}