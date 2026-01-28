import {ArrowRight, Key, Play, Shield, Zap} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";

import { LucideIcon } from 'lucide-react';

type IHeroSection = {
    isDarkMode: boolean
}


export const HeroSection = (
    {isDarkMode}: IHeroSection
) => {

    type AccentColor = 'primary' | 'secondary';

    const benefits:{
        icon: LucideIcon,
        title: string,
        desc: string,
        delay: string,
        color: AccentColor
    }[] = [
        {
            icon: Shield,
            title: 'Zero-Knowledge Privacy',
            desc: "We don't just hide votes; we ensure they can never be linked to an identity.",
            delay: '300ms',
            color: 'primary'
        },
        {
            icon: Zap,
            title: 'Instant Verification',
            desc: 'Get audit-ready, real-time results the second polls close.',
            delay: '400ms',
            color: 'secondary'
        },
        {
            icon: Key,
            title: 'Role-Based Control',
            desc: 'Manage candidates, voters, and approvals with granular, military-grade permissions.',
            delay: '500ms',
            color: 'primary'
        }
    ]



    const colors = getColor(isDarkMode);

    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-30">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: isDarkMode
                            ? 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)'
                            : 'linear-gradient(rgba(79, 70, 229, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.02) 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                        animation: 'gridMove 20s linear infinite'
                    }}
                />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 right-0 w-150 h-150 rounded-full blur-3xl opacity-20 animate-pulse"
                 style={{
                     background: `radial-gradient(circle, ${colors.accent.primary}, transparent)`,
                     animationDuration: '4s'
                 }}
            />
            <div className="absolute bottom-0 left-0 w-125 h-125 rounded-full blur-3xl opacity-20 animate-pulse"
                 style={{
                     background: `radial-gradient(circle, ${colors.accent.secondary}, transparent)`,
                     animationDuration: '6s',
                     animationDelay: '1s'
                 }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fadeInDown backdrop-blur-sm"
                        style={{
                            backgroundColor: colors.bg.card,
                            border: `1px solid ${colors.border.subtle}`,
                            boxShadow: `0 4px 16px ${colors.glow.primary}`,
                            animationDelay: '0ms'
                        }}
                    >
                        <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: colors.accent.secondary }}
                        />
                        <span
                            className="text-sm font-medium"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                Trusted by 450+ Universities & Institutions
              </span>
                    </div>

                    {/* Main Headline */}
                    <h1
                        className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fadeInDown"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            color: colors.text.primary,
                            animationDelay: '100ms'
                        }}
                    >
                        Elections Your Voters{' '}
                        <span
                            className="inline-block"
                            style={{
                                color: colors.accent.primary,
                            }}
                        >
                Trust
              </span>
                        .<br />
                        <span className="text-4xl lg:text-6xl">100% Trace-Free.</span>
                    </h1>

                    {/* Sub-headline */}
                    <p
                        className="text-xl lg:text-2xl mb-12 leading-relaxed animate-fadeInDown"
                        style={{
                            color: colors.text.secondary,
                            fontFamily: "'Inter', sans-serif",
                            animationDelay: '200ms'
                        }}
                    >
                        Stop the whispers of &#34;rigged&#34; results. Conduct secure, institutional-grade
                        elections with the only platform that makes voter traceability{' '}
                        <span style={{ color: colors.text.primary, fontWeight: 600 }}>
                mathematically impossible
              </span>.
                    </p>

                    {/* Key Benefits */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {benefits.map((benefit, i) => (
                            <div
                                key={i}
                                className="group p-6 rounded-2xl transition-all duration-500 hover:scale-105 animate-fadeInUp cursor-pointer"
                                style={{
                                    backgroundColor: colors.bg.card,
                                    border: `1px solid ${colors.border.subtle}`,
                                    boxShadow: `0 4px 16px ${benefit.color === 'secondary' ? colors.glow.secondary : colors.glow.primary}`,
                                    animationDelay: benefit.delay
                                }}
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 group-hover:rotate-6"
                                    style={{
                                        backgroundColor: colors.accent[benefit.color],
                                        boxShadow: `0 8px 24px ${benefit.color === 'secondary' ? colors.glow.secondary : colors.glow.primary}`
                                    }}
                                >
                                    <benefit.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3
                                    className="text-lg font-bold mb-2"
                                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                                >
                                    {benefit.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                                >
                                    {benefit.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
                        <button
                            className="group px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3"
                            style={{
                                backgroundColor: colors.accent.primary,
                                color: '#ffffff',
                                fontFamily: "'Inter', sans-serif",
                                boxShadow: `0 12px 32px ${colors.glow.primary}`
                            }}
                        >
                            Secure Your Election Date
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        <button
                            className="px-8 py-4 rounded-xl font-semibold text-base tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-3"
                            style={{
                                backgroundColor: colors.bg.card,
                                color: colors.text.primary,
                                fontFamily: "'Inter', sans-serif",
                                border: `2px solid ${colors.border.medium}`
                            }}
                        >
                            <Play className="w-5 h-5" />
                            Watch Demo (60s)
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}