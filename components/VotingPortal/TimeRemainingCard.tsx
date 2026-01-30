import React from "react";
import { getColor } from "@/lib/_colors";
import { Clock } from "lucide-react";
import { TimeRemaining } from "@/app/VotingPortal/page";

interface TimeRemainingCardProps {
    isDarkMode: boolean;
    timeRemaining: TimeRemaining;
}

export const TimeRemainingCard: React.FC<TimeRemainingCardProps> = ({ isDarkMode, timeRemaining }) => {
    const colors = getColor(isDarkMode);

    const timeUnits = [
        { label: 'Days', value: timeRemaining.days },
        { label: 'Hours', value: timeRemaining.hours },
        { label: 'Mins', value: timeRemaining.minutes },
        { label: 'Secs', value: timeRemaining.seconds }
    ];

    return (
        <div className="animate-fadeInLeft" style={{ animationDelay: '0.2s' }}>

        <div
            className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`,
                boxShadow: `0 8px 24px ${colors.glow.secondary}`
            }}
        >
            <div className="flex items-center gap-2 mb-5">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.bg.elevated }}
                >
                    <Clock className="w-5 h-5" style={{ color: colors.accent.warning }} />
                </div>
                <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                >
                    Time Remaining
                </h3>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {timeUnits.map((item, i) => (
                    <div
                        key={i}
                        className="p-3 rounded-xl text-center transition-all duration-300"
                        style={{
                            backgroundColor: colors.bg.elevated,
                            border: `1px solid ${colors.border.subtle}`
                        }}
                    >
                        <div
                            className="text-2xl font-bold mb-1"
                            style={{ 
                                fontFamily: "'Sora', sans-serif", 
                                color: colors.accent.primary,
                                textShadow: `0 0 20px ${colors.glow.primary}`
                            }}
                        >
                            {String(item.value).padStart(2, '0')}
                        </div>
                        <div
                            className="text-xs font-medium"
                            style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                        >
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
            </div>
    );
};
