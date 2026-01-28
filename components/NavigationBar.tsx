import {Moon, Shield, Sun} from "lucide-react";
import React, {useState} from "react";
import {getColor} from "@/lib/_colors";

type INavigationBar = {
    isDarkMode: boolean;
    setIsDarkMode: (isDarkMode: boolean) => void;
}

export const NavigationBar = (
    {isDarkMode, setIsDarkMode}: INavigationBar
) => {

    const colors = getColor(isDarkMode);

    const [isScrolled, ] = useState(false);

    return (
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
    );
}