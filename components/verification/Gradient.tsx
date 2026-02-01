import React from "react";
import {_colorType} from "@/lib/_colors";
import {VerificationStatus} from "@/app/verification/page";

type IGradient = {
    colors: _colorType
    status: VerificationStatus
}


export const Gradient: React.FC<IGradient> = (
    {colors, status}
) => {
    return (
        <>
            <div
                className="absolute top-20 right-20 w-100 h-100 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${status === 'success' ? colors.accent.success : status === 'error' ? colors.accent.danger : colors.accent.primary}, transparent)`,
                    animationDuration: '2s'
                }}
            />
            <div
                className="absolute bottom-20 left-20 w-87.5 h-87.5 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.secondary}, transparent)`,
                    animationDuration: '3s',
                    animationDelay: '0.5s'
                }}
            />
        </>
    )
}