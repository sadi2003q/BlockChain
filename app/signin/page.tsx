"use client"

import React, { useState, FormEvent } from 'react';
import {getColor} from "@/lib/_colors";
import {ThemeToggleButton} from "@/components/signin/ThemeToggleButton";
import {AnimatedGrid} from "@/components/signin/AnimatedGrid";
import {Header} from "@/components/signin/Header";
import {Form} from "@/components/signin/Form"
import {Security} from "@/components/signin/Security";
import {ForewordLink} from "@/components/signin/ForewordLink";
import axios from "axios";
import {useRouter} from "next/navigation";
import {NextResponse} from "next/server";
import toast from "react-hot-toast";

export interface ValidationErrors {
    email?: string;
    password?: string;
}

export type FocusedField = 'email' | 'password' | null;

export default function VoteSecureSignIn() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [focusedField, setFocusedField] = useState<FocusedField>(null);
    const router = useRouter();



    const colors = getColor(isDarkMode);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        // Basic validation
        const newErrors: ValidationErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const user = {
                email: email,
                password: password,
            }

            await axios.post("api/user/signin", user)
            router.push("/dashboard")
        } catch (error) {
            if(error instanceof NextResponse) {
                console.error(error.body)
            }
            toast.error("Invalid Credentials")
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div
            className="min-h-screen flex items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary }}
        >
            {/* Dark Mode Toggle Button - Top Right */}
            <ThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

            {/* Animated Background Grid - Faster animation */}
            <AnimatedGrid isDarkMode={isDarkMode}/>


            {/* Sign In Card */}
            <div
                className="w-full max-w-md relative z-10 animate-fadeInUp"
                style={{ animationDelay: '100ms' }}
            >
                {/* Logo Header */}
                <Header isDarkMode={isDarkMode}/>

                {/* Main Card */}
                <div
                    className="p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden animate-fadeInUp"
                    style={{
                        backgroundColor: colors.bg.card,
                        border: `1px solid ${colors.border.subtle}`,
                        boxShadow: `0 24px 48px ${colors.glow.primary}`,
                        animationDelay: '200ms'
                    }}
                >
                    {/* Subtle glow effect */}
                    <div
                        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                        style={{ background: colors.accent.primary }}
                    />

                    <Form

                        isDarkMode={isDarkMode} handleSubmit={handleSubmit}
                        focusedField={focusedField} setFocusedField={setFocusedField}
                        password={password} setPassword={setPassword}
                        showPassword={showPassword} setShowPassword={setShowPassword}
                        email={email} setEmail={setEmail}
                        errors={errors} isLoading={isLoading}

                    />

                </div>

                {/* Sign-Up Link */}
                <ForewordLink isDarkMode={isDarkMode}/>

                {/* Security Badge */}
                <Security isDarkMode={isDarkMode}/>
            </div>

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
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes gridMoveFast {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(48px, 48px);
                    }
                }
                
                .animate-fadeInDown {
                    animation: fadeInDown 0.5s ease-out forwards;
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                
                * {
                    scroll-behavior: smooth;
                }
                
                input::placeholder {
                    opacity: 0.5;
                }
                
                input:focus::placeholder {
                    opacity: 0.3;
                }
            `}</style>
        </div>
    );
}