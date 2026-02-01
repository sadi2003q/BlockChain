import {ArrowRight, CheckCircle} from "lucide-react";
import React from "react";
import {_colorType} from "@/lib/_colors";

type IState_Success = {
    colors: _colorType
}


export const State_Success = (
    {colors}: IState_Success
) => {
    return (
        <div
            className="p-10 rounded-3xl backdrop-blur-xl relative overflow-hidden animate-fadeIn text-center"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`,
                boxShadow: `0 24px 48px ${colors.glow.success}`
            }}
        >
            {/* Success glow effect */}
            <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse"
                style={{ background: colors.accent.success, animationDuration: '2s' }}
            />

            <div className="relative z-10">
                {/* Success Icon */}
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scaleIn"
                    style={{
                        backgroundColor: `${colors.accent.success}20`,
                        border: `3px solid ${colors.accent.success}`
                    }}
                >
                    <CheckCircle className="w-10 h-10" style={{ color: colors.accent.success }} />
                </div>

                <h2
                    className="text-2xl font-bold mb-3"
                    style={{
                        fontFamily: "'Sora', sans-serif",
                        color: colors.text.primary
                    }}
                >
                    Congratulations! 🎉
                </h2>

                <p
                    className="text-base mb-8"
                    style={{
                        color: colors.text.secondary,
                        fontFamily: "'Inter', sans-serif"
                    }}
                >
                    Your email has been successfully verified. You can now access all features of VoteSecure.
                </p>

                <button
                    onClick={() => {/* Navigate to dashboard */}}
                    className="group px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                    style={{
                        backgroundColor: colors.accent.success,
                        color: '#ffffff',
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: `0 12px 32px ${colors.glow.success}`
                    }}
                >
                    Continue to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        </div>
    );
}