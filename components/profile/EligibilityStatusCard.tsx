import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { _colorType } from "@/lib/_colors";

interface EligibilityStatusCardProps {
    voterId: string;
    registrationDate: Date;
    colors: _colorType;
    isVerified: boolean;
}

export const EligibilityStatusCard: React.FC<EligibilityStatusCardProps> = (
    {
        voterId,
        registrationDate,
        isVerified,
        colors,
    }) => {
    // 🔹 UI configuration based on verification status
    const statusConfig = isVerified
        ? {
            title: "Voting Eligibility Status",
            description:
                "Your account has been verified and you are eligible to vote in all institutional elections.",
            badgeText: "✓ VERIFIED VOTER",
            accentColor: colors.accent.success,
            glowColor: colors.glow.primary,
            Icon: CheckCircle,
        }
        : {
            title: "Voting Eligibility Status",
            description:
                "Your account is not yet verified. Please complete verification to participate in voting.",
            badgeText: "⚠ NOT VERIFIED",
            accentColor: colors.accent.danger,   // ✅ use existing
            glowColor: colors.glow.primary,
            Icon: AlertCircle,
        };

    return (
        <div
            className="p-6 sm:p-8 rounded-2xl"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`,
                boxShadow: `0 4px 16px ${statusConfig.glowColor}`,
            }}
        >
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                        backgroundColor: `${statusConfig.accentColor}20`,
                        border: `2px solid ${statusConfig.accentColor}50`,
                    }}
                >
                    <statusConfig.Icon
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        style={{ color: statusConfig.accentColor }}
                    />
                </div>

                <div className="flex-1">
                    <h2
                        className="text-xl sm:text-2xl font-bold mb-2"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            color: colors.text.primary,
                        }}
                    >
                        {statusConfig.title}
                    </h2>

                    <p
                        className="text-base sm:text-lg mb-4"
                        style={{
                            color: colors.text.secondary,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        {statusConfig.description}
                    </p>

                    <div
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                        style={{
                            backgroundColor: `${statusConfig.accentColor}20`,
                            border: `1px solid ${statusConfig.accentColor}`,
                        }}
                    >
            <span
                className="text-xs sm:text-sm font-bold"
                style={{
                    color: statusConfig.accentColor,
                    fontFamily: "'Inter', sans-serif",
                }}
            >
              {statusConfig.badgeText}
            </span>
                    </div>
                </div>
            </div>

            {/* DIVIDER */}
            <div
                className="h-px mb-6"
                style={{ backgroundColor: colors.border.subtle }}
            />

            {/* DETAILS */}
            {isVerified ? (
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <p
                            className="text-sm font-semibold mb-1"
                            style={{
                                color: colors.text.tertiary,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            Voter ID
                        </p>
                        <p
                            className="text-base sm:text-lg font-bold"
                            style={{
                                color: colors.text.primary,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            {voterId}
                        </p>
                    </div>

                    <div>
                        <p
                            className="text-sm font-semibold mb-1"
                            style={{
                                color: colors.text.tertiary,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            Registration Date
                        </p>
                        <p
                            className="text-base sm:text-lg font-bold"
                            style={{
                                color: colors.text.primary,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            {registrationDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            ) : (
                <p
                    className="text-sm italic"
                    style={{
                        color: colors.text.tertiary,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    Voter details will be available after verification.
                </p>
            )}
        </div>
    );
};
