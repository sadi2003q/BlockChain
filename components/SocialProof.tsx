import {Shield} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";


type ISocialProof = {
    isDarkMode: boolean
    isVisible(
        section,
    ): boolean
}


export const SocialProof = (
    { isDarkMode, isVisible }: ISocialProof,
) => {

    const colors = getColor(isDarkMode);

    return (
        <section
            className="py-20 lg:py-32"
            data-animate="proof"
            style={{ backgroundColor: colors.bg.secondary }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Testimonial */}
                <div
                    className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 ${
                        isVisible('proof') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <div
                        className="p-12 rounded-3xl relative overflow-hidden"
                        style={{
                            backgroundColor: colors.bg.card,
                            border: `1px solid ${colors.border.subtle}`,
                            boxShadow: `0 24px 48px ${colors.glow.primary}`
                        }}
                    >
                        {/* Quote Icon Background */}
                        <div
                            className="absolute top-8 right-8 text-9xl opacity-5 font-serif"
                            style={{ color: colors.accent.primary }}
                        >
                            "
                        </div>

                        <div className="relative z-10">
                            <p
                                className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed italic"
                                style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                            >
                                "VoteSecure turned our three-day manual tally into a 5-minute automated success.
                                The 'Zero-Trace' guarantee was the only way we could get our faculty senate to
                                agree to a digital transition."
                            </p>

                            <div className="flex items-center gap-4">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                                    style={{
                                        backgroundColor: colors.accent.primary,
                                        color: '#ffffff'
                                    }}
                                >
                                    AT
                                </div>
                                <div>
                                    <div
                                        className="font-bold text-lg"
                                        style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                                    >
                                        Dr. Aris Thorne
                                    </div>
                                    <div
                                        className="text-sm"
                                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                                    >
                                        University Registrar
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Credibility Badges */}
                <div
                    className={`transition-all duration-1000 ${
                        isVisible('proof') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '200ms' }}
                >
                    <div className="text-center mb-12">
                        <p
                            className="text-sm font-semibold tracking-wider uppercase"
                            style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                        >
                            Enterprise-Grade Security Certifications
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['SOC 2 Type II', 'GDPR Compliant', 'ISO 27001', 'Verified Secure 2026'].map((cert, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: colors.bg.card,
                                    border: `1px solid ${colors.border.subtle}`
                                }}
                            >
                                <Shield
                                    className="w-10 h-10 mx-auto mb-3"
                                    style={{ color: colors.accent.success }}
                                />
                                <div
                                    className="font-bold text-sm"
                                    style={{ color: colors.text.primary, fontFamily: "'Inter', sans-serif" }}
                                >
                                    {cert}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}