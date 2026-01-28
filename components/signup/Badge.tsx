import {CheckCircle} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";

type IBadge = {
    isDarkMode: boolean
}

export const SignUpBadge = (
    {isDarkMode}: IBadge,
) => {

    const colors = getColor(isDarkMode);

    return (
        <div
            className="mt-10 p-4 rounded-xl flex items-center gap-3"
            style={{
                backgroundColor: colors.bg.elevated,
                border: `1px solid ${colors.border.subtle}`
            }}
        >
            <CheckCircle className="w-5 h-5" style={{ color: colors.accent.success }} />
            <div>
                <p
                    className="text-sm font-bold"
                    style={{
                        color: colors.text.primary,
                        fontFamily: "'Inter', sans-serif"
                    }}
                >
                    Trusted by 450+ Institutions
                </p>
                <p
                    className="text-xs"
                    style={{
                        color: colors.text.tertiary,
                        fontFamily: "'Inter', sans-serif"
                    }}
                >
                    SOC 2 Type II • GDPR Compliant • ISO 27001
                </p>
            </div>
        </div>
    );
}