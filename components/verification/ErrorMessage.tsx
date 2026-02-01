import {XCircle} from "lucide-react";
import React from "react";
import {_colorType} from "@/lib/_colors";

type IErrorMessage = {
    colors: _colorType
}

export const ErrorMessage:React.FC<IErrorMessage> = (
    {colors}
) => {
    return (
        <div
            className="mb-6 p-4 rounded-xl flex items-center gap-3 animate-fadeIn"
            style={{
                backgroundColor: `${colors.accent.danger}15`,
                border: `1px solid ${colors.accent.danger}30`
            }}
        >
            <XCircle className="w-5 h-5 shrink-0" style={{ color: colors.accent.danger }} />
            <p
                className="text-sm font-medium"
                style={{
                    color: colors.accent.danger,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Invalid verification code. Please try again.
            </p>
        </div>
    );
}