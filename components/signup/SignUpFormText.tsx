import React from "react";
import {getColor} from "@/lib/_colors";

type ISignUpFormText = {
    currentStep: number
    isDarkMode: boolean
}

export const SignUpFormText = (
    {currentStep, isDarkMode}: ISignUpFormText,
) => {
    const colors = getColor(isDarkMode);
    return (
        <>
            <h2
                className="text-2xl font-bold mb-2 relative z-10"
                style={{
                    fontFamily: "'Sora', sans-serif",
                    color: colors.text.primary
                }}
            >
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Security Details'}
                {currentStep === 3 && 'Additional Information'}
            </h2>
            <p
                className="text-sm mb-6 relative z-10"
                style={{
                    color: colors.text.secondary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                {currentStep === 1 && 'Let\'s start with your basic details'}
                {currentStep === 2 && 'Secure your account'}
                {currentStep === 3 && 'Just a few more details'}
            </p>
        </>
    );
}