import React from "react";
import { getColor } from "@/lib/_colors";
import { Shield, Lock, Eye } from "lucide-react";

interface SecurityNoticeProps {
    isDarkMode: boolean;
}

export const SecurityNotice: React.FC<SecurityNoticeProps> = ({ isDarkMode }) => {
    const colors = getColor(isDarkMode);

    return (
        <div
            className="mt-6 p-5 rounded-2xl"
            style={{
                backgroundColor: colors.bg.elevated,
                border: `1px solid ${colors.border.subtle}`
            }}
        >
            <div className="flex items-start gap-4">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${colors.accent.secondary}20` }}
                >
                    <Shield className="w-5 h-5" style={{ color: colors.accent.secondary }} />
                </div>
                <div className="flex-1">
                    <h4
                        className="text-sm font-bold mb-2"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        🔐 Your Vote is 100% Anonymous & Secure
                    </h4>
                    <p
                        className="text-xs leading-relaxed mb-3"
                        style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Our zero-knowledge blockchain technology ensures your identity cannot be traced to your ballot. 
                        Once cast, your vote is permanently recorded and cannot be changed or tampered with.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <div 
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={{ backgroundColor: colors.bg.primary, color: colors.text.secondary }}
                        >
                            <Lock className="w-3 h-3" style={{ color: colors.accent.success }} />
                            End-to-End Encrypted
                        </div>
                        <div 
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={{ backgroundColor: colors.bg.primary, color: colors.text.secondary }}
                        >
                            <Eye className="w-3 h-3" style={{ color: colors.accent.success }} />
                            Zero-Knowledge Proof
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
