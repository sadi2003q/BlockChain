import React from "react";
import {getColor} from "@/lib/_colors";


type IForewordLink_SignIn = {
    isDarkMode: boolean
}

export const ForewordLink_SignIn = (
    {isDarkMode}: IForewordLink_SignIn,
) => {

    const colors = getColor(isDarkMode);

    return(
        <div className="text-center mt-6">
            <p
                className="text-sm"
                style={{
                    color: colors.text.secondary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Already have an account?{' '}
                <a
                    href="#"
                    className="font-bold transition-all duration-200 hover:opacity-80"
                    style={{
                        color: colors.accent.primary
                    }}
                >
                    Sign In
                </a>
            </p>
        </div>
    );
}