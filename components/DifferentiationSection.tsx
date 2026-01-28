import {CheckCircle, Shield} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";

type IDifferentiationSection = {
    isDarkMode: boolean,
    isVisible(
        section,
    ): boolean
}

export const DifferentiationSection = (
    {isDarkMode, isVisible}: IDifferentiationSection
) => {

    const colors = getColor(isDarkMode)

    return (
        <section
            className="py-20 lg:py-32 relative overflow-hidden"
            data-animate="diff"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div
                    className={`max-w-4xl mx-auto transition-all duration-1000 ${
                        isVisible('diff') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2
                            className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                            style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                        >
                            More Than a Ballot Box.{' '}
                            <span
                                className="inline-block"
                                style={{
                                    color: colors.accent.primary,
                                }}
                            >
                  A Fortress
                </span>{' '}
                            for Integrity.
                        </h2>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left: Others */}
                        <div
                            className="p-8 rounded-2xl"
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `2px solid ${colors.border.subtle}`,
                                opacity: 0.7
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: colors.bg.tertiary }}
                                >
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3
                                    className="text-xl font-bold"
                                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.secondary }}
                                >
                                    Standard Survey Tools
                                </h3>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    'Server stores voter-vote links',
                                    'Vulnerable to database breaches',
                                    'Manual permission management',
                                    'No cryptographic guarantees'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                      <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm"
                          style={{ backgroundColor: `${colors.accent.danger}20`, color: colors.accent.danger }}
                      >
                        ✕
                      </span>
                                        <span style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}>
                        {item}
                      </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: VoteSecure */}
                        <div
                            className="p-8 rounded-2xl relative overflow-hidden"
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `2px solid ${colors.accent.primary}`,
                                boxShadow: `0 12px 32px ${colors.glow.primary}`
                            }}
                        >
                            {/* Glow effect */}
                            <div
                                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30"
                                style={{ background: colors.accent.primary }}
                            />

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                    style={{
                                        backgroundColor: colors.accent.primary
                                    }}
                                >
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <h3
                                    className="text-xl font-bold"
                                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                                >
                                    The VoteSecure Standard
                                </h3>
                            </div>

                            <ul className="space-y-3 relative z-10">
                                {[
                                    'Decentralized verification model',
                                    'Mathematically shielded identities',
                                    'Native role-based architecture',
                                    'Zero-Knowledge cryptographic proofs'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle
                                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                                            style={{ color: colors.accent.success }}
                                        />
                                        <span
                                            className="font-medium"
                                            style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                                        >
                        {item}
                      </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Quote */}
                    <div
                        className="mt-12 p-6 rounded-xl text-center"
                        style={{
                            backgroundColor: colors.bg.elevated,
                            border: `1px solid ${colors.border.subtle}`
                        }}
                    >
                        <p
                            className="text-lg italic"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                            "It's so simple a first-year student can vote in 10 seconds, yet so secure
                            a Cyber-Security Dean would approve it."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}