import {CheckCircle, Shield, XCircle} from "lucide-react";
import React from "react";
import {_colorType} from "@/lib/_colors";
import {VerificationStatus} from "@/app/verification/page";
type ILogoHeader = {
    colors: _colorType
    email: string
    status: VerificationStatus
}

export const LogoHeader:React.FC<ILogoHeader> = (
    {colors, email, status}
) => {
    return (
        <div className="text-center mb-8 animate-fadeIn">
            <div className="flex items-center justify-center gap-3 mb-6">
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300"
                    style={{
                        backgroundColor: status === 'success' ? colors.accent.success : status === 'error' ? colors.accent.danger : colors.accent.primary,
                        boxShadow: `0 12px 32px ${status === 'success' ? colors.glow.success : status === 'error' ? colors.glow.primary : colors.glow.primary}`
                    }}
                >
                    {status === 'success' ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                    ) : status === 'error' ? (
                        <XCircle className="w-8 h-8 text-white" />
                    ) : (
                        <Shield className="w-8 h-8 text-white" />
                    )}
                </div>
            </div>

            <h1
                className="text-3xl font-bold mb-2"
                style={{
                    fontFamily: "'Sora', sans-serif",
                    color: colors.text.primary
                }}
            >
                {status === 'success' ? 'Email Verified!' : status === 'error' ? 'Verification Failed' : 'Verify Your Email'}
            </h1>
            <p
                className="text-base"
                style={{
                    color: colors.text.secondary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                {status === 'success'
                    ? 'Your email has been successfully verified'
                    : status === 'error'
                        ? 'The code you entered is incorrect'
                        : `We've sent a 6-digit code to ${email}`
                }
            </p>
        </div>
    );
}