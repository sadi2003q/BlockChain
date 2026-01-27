"use client"

import React, { useState, useEffect } from 'react';
import { Shield, Zap, Key, Clock, Users, Lock, CheckCircle, Eye, Database, ArrowRight, Moon, Sun, Play } from 'lucide-react';

export default function VoteSecureLanding() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [visibleSections, setVisibleSections] = useState(new Set());

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Intersection observer for scroll animations
            const sections = document.querySelectorAll('[data-animate]');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    setVisibleSections(prev => new Set([...prev, section.dataset.animate]));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Color system based on dark mode - Bold Charcoal/Crimson/Amber palette for security & authority
    const colors = {
        bg: {
            primary: isDarkMode ? '#0a0a0a' : '#f3e9dc',
            secondary: isDarkMode ? '#141414' : '#ede3d6',
            tertiary: isDarkMode ? '#1e1e1e' : '#e7ddd0',
            card: isDarkMode ? '#1a1a1a' : '#f9f0e3',
            elevated: isDarkMode ? '#242424' : '#fdf5e8',
        },

        text: {
            primary: isDarkMode ? '#ffffff' : '#1a1a1a',
            secondary: isDarkMode ? '#d4d4d4' : '#4a4a4a',
            tertiary: isDarkMode ? '#a3a3a3' : '#6a6a6a',
            muted: isDarkMode ? '#737373' : '#8a8a8a',
        },

        accent: {
            primary: isDarkMode ? '#dc2626' : '#780116',
            secondary: isDarkMode ? '#f59e0b' : '#2563eb',
            success: isDarkMode ? '#22c55e' : '#16a34a',
            warning: isDarkMode ? '#f59e0b' : '#d97706',
            danger: isDarkMode ? '#ef4444' : '#780116',
        },

        border: {
            subtle: isDarkMode ? '#262626' : '#d4c9bd',
            medium: isDarkMode ? '#404040' : '#c4b9ad',
            strong: isDarkMode ? '#525252' : '#b4a99d',
        },

        glow: {
            primary: isDarkMode
                ? 'rgba(220, 38, 38, 0.25)'
                : 'rgba(120, 1, 22, 0.15)',
            secondary: isDarkMode
                ? 'rgba(245, 158, 11, 0.2)'
                : 'rgba(37, 99, 235, 0.08)',
        },
    };


    const isVisible = (section) => visibleSections.has(section);

    return (
        <div
            className="min-h-screen transition-colors duration-500"
            style={{ backgroundColor: colors.bg.primary, color: colors.text.primary }}
        >
            {/* Navigation */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                    isScrolled ? 'backdrop-blur-2xl shadow-2xl' : ''
                }`}
                style={{
                    backgroundColor: isScrolled
                        ? isDarkMode ? 'rgba(10, 10, 10, 0.3)' : 'rgba(255, 255, 255, 0.3)'
                        : 'transparent',
                    borderBottom: isScrolled ? `1px solid ${colors.border.subtle}` : 'none'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300"
                                style={{
                                    backgroundColor: colors.accent.primary,
                                    boxShadow: `0 8px 24px ${colors.glow.primary}`
                                }}
                            >
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span
                                className="text-2xl font-bold tracking-tight"
                                style={{
                                    fontFamily: "'Sora', sans-serif",
                                    color: colors.text.primary
                                }}
                            >
                VoteSecure
              </span>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {['Features', 'Security', 'Pricing', 'Docs'].map((item, i) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm font-medium tracking-wide relative group transition-colors duration-200"
                                    style={{
                                        color: colors.text.secondary,
                                        fontFamily: "'Inter', sans-serif",
                                        animationDelay: `${i * 50}ms`
                                    }}
                                >
                                    {item}
                                    <span
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                                        style={{ backgroundColor: colors.accent.primary }}
                                    />
                                </a>
                            ))}
                        </div>

                        {/* Dark Mode Toggle & CTA */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{
                                    backgroundColor: colors.bg.tertiary,
                                    border: `1px solid ${colors.border.subtle}`
                                }}
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5" style={{ color: colors.accent.warning }} />
                                ) : (
                                    <Moon className="w-5 h-5" style={{ color: colors.accent.primary }} />
                                )}
                            </button>

                            <button
                                className="px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    backgroundColor: colors.accent.primary,
                                    color: '#ffffff',
                                    fontFamily: "'Inter', sans-serif",
                                    boxShadow: `0 8px 24px ${colors.glow.primary}`
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
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
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-pulse"
                     style={{
                         background: `radial-gradient(circle, ${colors.accent.primary}, transparent)`,
                         animationDuration: '4s'
                     }}
                />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-pulse"
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
                            Stop the whispers of "rigged" results. Conduct secure, institutional-grade
                            elections with the only platform that makes voter traceability{' '}
                            <span style={{ color: colors.text.primary, fontWeight: 600 }}>
                mathematically impossible
              </span>.
                        </p>

                        {/* Key Benefits */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {[
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
                            ].map((benefit, i) => (
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

            {/* Problem / Agitation Section */}
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

            {/* Solution / Benefits Section */}
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

            {/* Social Proof Section */}
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

            {/* Differentiation Section */}
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

            {/* FAQ Section */}
            <section
                className="py-20 lg:py-32"
                data-animate="faq"
                style={{ backgroundColor: colors.bg.secondary }}
            >
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div
                        className={`text-center mb-16 transition-all duration-1000 ${
                            isVisible('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <h2
                            className="text-4xl lg:text-5xl font-bold mb-6"
                            style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                        >
                            Crushing the Final Objections
                        </h2>
                        <p
                            className="text-xl"
                            style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                        >
                            The questions every security-conscious administrator asks.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: 'Is it truly untraceable?',
                                a: 'Yes. We utilize cryptographic salts and zero-knowledge protocols. The link between voter ID and ballot is severed the moment "Submit" is clicked. Even if our servers were compromised, voter identities remain mathematically shielded.',
                                delay: '0ms'
                            },
                            {
                                q: 'What if someone tries to vote twice?',
                                a: 'Our role-based identity layer ensures 1-person-1-vote without ever storing how that person voted. The system verifies eligibility without connecting identity to ballot content.',
                                delay: '100ms'
                            },
                            {
                                q: 'How fast are the results?',
                                a: 'Instant. The moment your election window closes, the final report is generated and ready for admin approval. No delays, no manual counting, no waiting.',
                                delay: '200ms'
                            }
                        ].map((faq, i) => (
                            <div
                                key={i}
                                className={`p-8 rounded-2xl transition-all duration-1000 hover:scale-[1.02] ${
                                    isVisible('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                                style={{
                                    backgroundColor: colors.bg.card,
                                    border: `1px solid ${colors.border.subtle}`,
                                    transitionDelay: faq.delay
                                }}
                            >
                                <h3
                                    className="text-xl font-bold mb-4 flex items-center gap-3"
                                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{
                                            backgroundColor: colors.accent.primary
                                        }}
                                    >
                                        <span className="text-white font-bold">?</span>
                                    </div>
                                    {faq.q}
                                </h3>
                                <p
                                    className="leading-relaxed pl-11"
                                    style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                                >
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
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

            {/* Footer */}
            <footer
                className="py-12 border-t"
                style={{
                    backgroundColor: colors.bg.secondary,
                    borderColor: colors.border.subtle
                }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    backgroundColor: colors.accent.primary
                                }}
                            >
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span
                                className="text-xl font-bold"
                                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                            >
                VoteSecure
              </span>
                        </div>

                        <div className="flex items-center gap-8">
                            {['Privacy', 'Terms', 'Security', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                                    style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        <div
                            className="text-sm"
                            style={{ color: colors.text.tertiary, fontFamily: "'Inter', sans-serif" }}
                        >
                            © 2026 VoteSecure. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>

            {/* CSS Animations */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(64px, 64px);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        * {
          scroll-behavior: smooth;
        }
      `}</style>
        </div>
    );
}