import React from "react";
import {getColor} from "@/lib/_colors";


type IProgress = {
    currentStep: number,
    progressPercentage: number,
    isDarkMode: boolean
}

export const SignUpProgress = (
    {currentStep, progressPercentage, isDarkMode}: IProgress,
) => {

    const colors = getColor(isDarkMode);

    return (
        <div className="mb-6">
            <div className="flex justify-between mb-3">
                {[1, 2, 3].map((step) => (
                    <div
                        key={step}
                        className="flex items-center"
                        style={{
                            color: currentStep >= step ? colors.accent.primary : colors.text.tertiary,
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                currentStep >= step ? 'scale-110' : ''
                            }`}
                            style={{
                                backgroundColor: currentStep > step
                                    ? colors.accent.success
                                    : currentStep === step
                                        ? colors.accent.primary
                                        : colors.bg.tertiary,
                                color: currentStep >= step ? '#ffffff' : colors.text.tertiary,
                                border: `2px solid ${
                                    currentStep > step
                                        ? colors.accent.success
                                        : currentStep === step
                                            ? colors.accent.primary
                                            : colors.border.medium
                                }`
                            }}
                        >
                            {currentStep > step ? '✓' : step}
                        </div>
                        {step < 3 && (
                            <div
                                className="w-12 sm:w-20 h-0.5 mx-2"
                                style={{
                                    backgroundColor: currentStep > step ? colors.accent.success : colors.border.subtle
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div
                className="h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: colors.bg.tertiary }}
            >
                <div
                    className="h-full transition-all duration-500"
                    style={{
                        width: `${progressPercentage}%`,
                        backgroundColor: colors.accent.primary
                    }}
                />
            </div>
        </div>
    );
}