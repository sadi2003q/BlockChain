import React from "react";
import { getColor } from "@/lib/_colors";
import { AlertCircle, Clock } from "lucide-react";

interface VotePendingAlertProps {
    isDarkMode: boolean;
}

export const VotePendingAlert: React.FC<VotePendingAlertProps> = ({ isDarkMode }) => {
    const colors = getColor(isDarkMode);

    return (
        <div
            className="mb-8 p-6 rounded-2xl animate-fadeInUp"
            style={{
                backgroundColor: colors.bg.card,
                border: `2px solid ${colors.accent.warning}`,
                boxShadow: `0 12px 32px rgba(245, 158, 11, 0.15)`
            }}
        >
            <div className="flex items-start gap-4">
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ 
                        backgroundColor: `${colors.accent.warning}20`,
                        boxShadow: `0 4px 16px rgba(245, 158, 11, 0.3)`
                    }}
                >
                    <AlertCircle className="w-7 h-7" style={{ color: colors.accent.warning }} />
                </div>
                <div className="flex-1">
                    <h3
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        ⏳ You Haven&#39;t Voted Yet
                    </h3>
                    <p
                        className="text-sm mb-3 leading-relaxed"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Cast your vote before the election closes. Your voice matters in shaping the future!
                    </p>
                    <div 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                        style={{
                            backgroundColor: colors.bg.elevated,
                            color: colors.text.tertiary,
                            border: `1px solid ${colors.border.subtle}`
                        }}
                    >
                        <Clock className="w-4 h-4" style={{ color: colors.accent.warning }} />
                        Election is currently active
                    </div>
                </div>
            </div>
        </div>
    );
};
