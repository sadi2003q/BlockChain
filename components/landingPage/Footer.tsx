import {Shield} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";

type IFooter = {
    isDarkMode: boolean
}

export const Footer = (
    {isDarkMode}: IFooter
) => {

    const colors = getColor(isDarkMode)

    return (
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
    )
}