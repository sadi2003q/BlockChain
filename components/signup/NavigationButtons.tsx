import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface NavigationButtonsProps {
    currentStep: number;
    isLoading: boolean;
    onBack: () => void;
    onNext: () => void;
    colors: any;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    currentStep,
    isLoading,
    onBack,
    onNext,
    colors
}) => {
    return (
        <div className="flex gap-4 pt-4">
            {currentStep > 1 && (
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                        backgroundColor: colors.bg.elevated,
                        color: colors.text.primary,
                        border: `2px solid ${colors.border.medium}`,
                        fontFamily: "'Inter', sans-serif"
                    }}
                >
                    Back
                </button>
            )}

            {currentStep < 3 ? (
                <button
                    type="button"
                    onClick={onNext}
                    className="group flex-1 py-3 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3"
                    style={{
                        backgroundColor: colors.accent.primary,
                        color: '#ffffff',
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: `0 12px 32px ${colors.glow.primary}`
                    }}
                >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex-1 py-3 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                    style={{
                        backgroundColor: colors.accent.primary,
                        color: '#ffffff',
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: `0 12px 32px ${colors.glow.primary}`
                    }}
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        <>
                            Create Account
                            <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
};
