import {ArrowRight} from "lucide-react";
import React from "react";
import {_colorType} from "@/lib/_colors";
import {VerificationStatus} from "@/app/verification/page";


type ISubmitButton = {
    colors: _colorType;
    otp: string[];
    status: VerificationStatus;
}

export const SubmitButton = (
    {colors, otp, status}: ISubmitButton,
) => {
    return (
        <button
            type="submit"
            disabled={otp.join('').length !== 6 || status === 'verifying'}
            className="group w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 mb-6"
            style={{
                backgroundColor: colors.accent.primary,
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                boxShadow: `0 12px 32px ${colors.glow.primary}`
            }}
        >
            {status === 'verifying' ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                </>
            ) : (
                <>
                    Verify Email
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
            )}
        </button>
    );
}