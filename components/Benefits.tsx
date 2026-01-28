import {CheckCircle, Lock, Users, Zap} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";


type IBenefits = {
    isDarkMode: boolean;
    isVisible(
        section,
    ): boolean
}

export const Benefits = (
    {isDarkMode, isVisible}: IBenefits,
) => {

    const colors = getColor(isDarkMode);

    return (
        <section
            className="py-20 lg:py-32 relative overflow-hidden"
            data-animate="solution"
        >
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-20">
                <div
                    style={{
                        backgroundImage: isDarkMode
                            ? 'linear-gradient(rgba(99, 102, 241, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.02) 1px, transparent 1px)'
                            : 'linear-gradient(rgba(79, 70, 229, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.015) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                    className="w-full h-full"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div
                    className={`text-center mb-20 transition-all duration-1000 ${
                        isVisible('solution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2
                        className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
              <span
                  className="inline-block"
                  style={{
                      color: colors.accent.primary,
                  }}
              >
                Ironclad Integrity
              </span>
                        . Zero Traceability.
                    </h2>
                    <p
                        className="text-xl max-w-3xl mx-auto"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        The only election platform engineered from the ground up to make voter anonymity
                        a mathematical certainty, not just a promise.
                    </p>
                </div>

                {/* Feature Blocks */}
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            icon: Lock,
                            title: 'Mathematical Anonymity',
                            tech: 'Zero-Knowledge Proofs (P vs V)',
                            desc: 'Uses Zero-Knowledge Proofs to verify a vote is valid without revealing the voter\'s identity.',
                            benefit: 'Eliminate the fear of retaliation and ensure 100% honest turnout.',
                            delay: '0ms',
                            color: 'primary'
                        },
                        {
                            icon: CheckCircle,
                            title: 'Real-Time Audit Trail',
                            tech: 'Tamper-Proof Ledger',
                            desc: 'Watch the tally live with a tamper-proof ledger. No "black box" counting.',
                            benefit: 'No 48-hour delays. Complete transparency from start to finish.',
                            delay: '100ms',
                            color: 'secondary'
                        },
                        {
                            icon: Users,
                            title: 'Native Role-Based Access',
                            tech: 'Granular Permission System',
                            desc: 'Separate the "Admin" from the "Observer." Ensure the right people approve candidates.',
                            benefit: 'The system handles counting while you maintain control.',
                            delay: '200ms',
                            color: 'primary'
                        },
                        {
                            icon: Zap,
                            title: 'Deployment in < 15 Minutes',
                            tech: 'Zero-Code Platform',
                            desc: 'Go from a blank page to a live election in minutes. No code, no IT tickets.',
                            benefit: 'Focus on governance, not technical implementation.',
                            delay: '300ms',
                            color: 'secondary'
                        }
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className={`group p-8 rounded-2xl transition-all duration-1000 hover:scale-[1.02] ${
                                isVisible('solution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `1px solid ${colors.border.subtle}`,
                                boxShadow: `0 4px 16px ${feature.color === 'secondary' ? colors.glow.secondary : colors.glow.primary}`,
                                transitionDelay: feature.delay
                            }}
                        >
                            <div className="flex items-start gap-6">
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6"
                                    style={{
                                        backgroundColor: colors.accent[feature.color],
                                        boxShadow: `0 8px 24px ${feature.color === 'secondary' ? colors.glow.secondary : colors.glow.primary}`
                                    }}
                                >
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>

                                <div className="flex-1">
                                    <div
                                        className="inline-block px-3 py-1 rounded-full mb-3 text-xs font-semibold"
                                        style={{
                                            backgroundColor: colors.bg.tertiary,
                                            color: colors.accent[feature.color],
                                            fontFamily: "'Inter', sans-serif"
                                        }}
                                    >
                                        {feature.tech}
                                    </div>

                                    <h3
                                        className="text-2xl font-bold mb-3"
                                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                                    >
                                        {feature.title}
                                    </h3>

                                    <p
                                        className="mb-4 leading-relaxed"
                                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {feature.desc}
                                    </p>

                                    <div
                                        className="p-4 rounded-xl"
                                        style={{
                                            backgroundColor: colors.bg.elevated,
                                            border: `1px solid ${colors.border.subtle}`
                                        }}
                                    >
                                        <div className="flex items-start gap-2">
                                            <CheckCircle
                                                className="w-5 h-5 flex-shrink-0 mt-0.5"
                                                style={{ color: colors.accent.success }}
                                            />
                                            <p
                                                className="text-sm font-medium leading-relaxed"
                                                style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                                            >
                                                {feature.benefit}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}