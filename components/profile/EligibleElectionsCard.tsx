import React from 'react';
import { CheckCircle } from 'lucide-react';
import { EligibleElection } from '@/lib/Schema_Lib/profile.schema';
import {_colorType} from "@/lib/_colors";

interface EligibleElectionsCardProps {
    elections: EligibleElection[];
    colors: _colorType;
    isVerified: boolean;
}

export const EligibleElectionsCard: React.FC<EligibleElectionsCardProps> = ({
    elections,
    colors,
    isVerified
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
                Eligible Elections
            </h3>

            {isVerified && (
                <div className="space-y-3">
                    {elections.map((election, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-lg"
                            style={{
                                backgroundColor: colors.bg.tertiary
                            }}
                        >
                            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.accent.success }} />
                            <span
                                className="font-medium text-sm sm:text-base"
                                style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                            >
                            {election.name}
                        </span>
                        </div>
                    ))}
                </div>
            )}

            {!isVerified && (
                <p
                    className="text-sm italic"
                    style={{
                        color: colors.text.tertiary,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    You are not Eligible to Vote until document Verification. Please Verify papers to proceed
                </p>
            )}


        </div>
    );
};