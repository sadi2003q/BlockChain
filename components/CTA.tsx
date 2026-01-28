import {ArrowRight, CheckCircle, Play} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";

type ICTA = {
    isVisible(
        section,
    ): boolean
    isDarkMode: boolean
}

export const CTA = (
    {isVisible, isDarkMode}: ICTA,
) => {
    const colors = getColor(isDarkMode);

    return (
        <section
            className="py-32 relative overflow-hidden"
            data-animate="cta"
        >
            {/* Dramatic Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${colors.accent.primary}, transparent 70%)`
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                <div
                    className={`text-center transition-all duration-1000 ${
                        isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2
                        className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        Don't Leave Your Reputation{' '}
                        <span
                            className="inline-block"
                            style={{
                                color: colors.accent.primary,
                            }}
                        >
                to Chance
              </span>.
                    </h2>

                    <p
                        className="text-2xl mb-12 leading-relaxed"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        Your next election is too important to get wrong. Join the administrators
                        who have traded election anxiety for total certainty.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                        <button
                            className="group px-10 py-5 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3"
                            style={{
                                backgroundColor: colors.accent.primary,
                                color: '#ffffff',
                                fontFamily: "'Inter', sans-serif",
                                boxShadow: `0 16px 40px ${colors.glow.primary}`
                            }}
                        >
                            Protect My Election Integrity
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        <a
                            href="#"
                            className="flex items-center gap-2 px-6 py-3 text-base font-medium transition-colors duration-200 hover:opacity-80"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                            <Play className="w-5 h-5" />
                            Watch the 60-second Security Architecture Overview
                        </a>
                    </div>

                    {/* Final Trust Signal */}
                    <div
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                        style={{
                            backgroundColor: colors.bg.card,
                            border: `1px solid ${colors.border.subtle}`
                        }}
                    >
                        <CheckCircle className="w-5 h-5" style={{ color: colors.accent.success }} />
                        <span
                            className="text-sm font-medium"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                No credit card required • Setup in 15 minutes • Cancel anytime
              </span>
                    </div>
                </div>
            </div>
        </section>
    )
}