import {Clock, Database, Eye} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";

type IProblem = {
    isVisible(
        section,
    ): boolean
    isDarkMode: boolean
}

export const Problem = (
    {isVisible, isDarkMode}: IProblem,
) => {

    const colors = getColor(isDarkMode);

    return (
        <section
            className="py-20 lg:py-32 relative"
            data-animate="problem"
            style={{ backgroundColor: colors.bg.secondary }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div
                        className={`text-center mb-16 transition-all duration-1000 ${
                            isVisible('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <div
                            className="inline-block px-4 py-2 rounded-full mb-6"
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `1px solid ${colors.border.subtle}`
                            }}
                        >
                <span
                    className="text-sm font-bold tracking-wider uppercase"
                    style={{ color: colors.accent.danger, fontFamily: "'Inter', sans-serif" }}
                >
                  The Hidden Cost
                </span>
                        </div>

                        <h2
                            className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                            style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                        >
                            One Disputed Result Can Ruin{' '}
                            <span
                                className="inline-block"
                                style={{
                                    color: colors.accent.primary,
                                }}
                            >
                  a Decade
                </span>{' '}
                            of Institutional Trust.
                        </h2>

                        <p
                            className="text-xl leading-relaxed"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                            Manual counting is a liability. Basic digital forms are a security nightmare.
                            When a single "leaked" ballot or a delayed tally can trigger a campus-wide crisis,
                            you can't afford a system that leaves a paper trail.
                        </p>
                    </div>

                    {/* Pain Points */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Eye,
                                title: 'The Shadow of Doubt',
                                desc: "If voters don't believe their choices are anonymous, they won't vote honestly.",
                                accent: colors.accent.primary,
                                delay: '100ms'
                            },
                            {
                                icon: Clock,
                                title: 'Admin Burnout',
                                desc: "Spending 40+ hours verifying IDs and chasing committee approvals isn't just exhausting—it's where human error happens.",
                                accent: colors.accent.secondary,
                                delay: '200ms'
                            },
                            {
                                icon: Database,
                                title: 'The Traceability Trap',
                                desc: 'Most platforms store data that could be traced. In an era of data breaches, "could be" is a risk you can\'t take.',
                                accent: colors.accent.primary,
                                delay: '300ms'
                            }
                        ].map((point, i) => (
                            <div
                                key={i}
                                className={`p-8 rounded-2xl transition-all duration-1000 hover:scale-105 ${
                                    isVisible('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                                style={{
                                    backgroundColor: colors.bg.card,
                                    border: `1px solid ${colors.border.subtle}`,
                                    transitionDelay: point.delay
                                }}
                            >
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                                    style={{
                                        backgroundColor: `${point.accent}15`,
                                        border: `2px solid ${point.accent}30`
                                    }}
                                >
                                    <point.icon className="w-8 h-8" style={{ color: point.accent }} />
                                </div>
                                <h3
                                    className="text-xl font-bold mb-3"
                                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                                >
                                    {point.title}
                                </h3>
                                <p
                                    className="leading-relaxed"
                                    style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                                >
                                    {point.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}