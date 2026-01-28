import {Key, Shield, Zap} from "lucide-react";
import React from "react";
import {getColor} from "@/lib/_colors";
import type { LucideIcon } from 'lucide-react';



type IFeatureCard = {
    isDarkMode: boolean
}

export const FeatureCard = (
    {isDarkMode}: IFeatureCard,
) => {

    const colors = getColor(isDarkMode);

    const features: {
        icon: LucideIcon,
        title: string,
        desc: string,
        color: 'primary' | 'secondary'
    }[] = [
        {
            icon: Shield,
            title: 'Zero-Knowledge Privacy',
            desc: 'Mathematical anonymity guaranteed with cryptographic proofs',
            color: 'primary'
        },
        {
            icon: Zap,
            title: 'Instant Verification',
            desc: 'Get verified in minutes, not days',
            color: 'secondary'
        },
        {
            icon: Key,
            title: 'Role-Based Access',
            desc: 'Secure permissions from day one',
            color: 'primary'
        }
    ]



    return (
        <div className="space-y-6">
            {features.map((feature, i) => (
                <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                        backgroundColor: colors.bg.card,
                        border: `1px solid ${colors.border.subtle}`,
                        animationDelay: `${i * 100}ms`
                    }}
                >
                    <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                            backgroundColor: colors.accent[feature.color],
                            boxShadow: `0 8px 20px ${feature.color === 'secondary' ? colors.glow.secondary : colors.glow.primary}`
                        }}
                    >
                        <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3
                            className="text-lg font-bold mb-1"
                            style={{
                                fontFamily: "'Sora', sans-serif",
                                color: colors.text.primary
                            }}
                        >
                            {feature.title}
                        </h3>
                        <p
                            className="text-sm"
                            style={{
                                color: colors.text.secondary,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            {feature.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}