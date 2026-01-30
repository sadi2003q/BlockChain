import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { VerificationDocument } from '@/lib/Schema_Lib/profile.schema';
import {_colorType} from "@/lib/_colors";

interface VerificationDocumentsCardProps {
    documents: VerificationDocument[];
    colors: _colorType;
}

export const VerificationDocumentsCard: React.FC<VerificationDocumentsCardProps> = ({
    documents,
    colors
}) => {
    return (
        <div
            className="p-6 sm:p-8 rounded-2xl"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`
            }}
        >
            <h3
                className="text-lg sm:text-xl font-bold mb-4 sm:mb-6"
                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
            >
                Verification Documents
            </h3>

            <div className="space-y-3 sm:space-y-4">
                {documents.map((doc, i) => (
                    <div
                        key={i}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl"
                        style={{
                            backgroundColor: colors.bg.tertiary,
                            border: `1px solid ${colors.border.subtle}`
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5" style={{ color: colors.accent.primary }} />
                            <div>
                                <p
                                    className="font-semibold text-sm sm:text-base"
                                    style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                                >
                                    {doc.name}
                                </p>
                                <p
                                    className="text-xs sm:text-sm"
                                    style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                                >
                                    Verified on {doc.verifiedDate.toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-2 px-3 py-1 rounded-full"
                            style={{
                                backgroundColor: `${colors.accent.success}20`
                            }}
                        >
                            <CheckCircle className="w-4 h-4" style={{ color: colors.accent.success }} />
                            <span
                                className="text-sm font-semibold"
                                style={{ color: colors.accent.success, fontFamily: "'Inter', sans-serif" }}
                            >
                                {doc.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};