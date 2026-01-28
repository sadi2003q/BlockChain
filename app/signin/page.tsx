"use client"

import React, { useState, FormEvent } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Moon, Sun } from 'lucide-react';
import {getColor} from "@/lib/_colors";

interface ValidationErrors {
    email?: string;
    password?: string;
}

type FocusedField = 'email' | 'password' | null;

export default function VoteSecureSignIn() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [focusedField, setFocusedField] = useState<FocusedField>(null);


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

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Handle sign-in logic here
            console.log('Signing in...', { email, password });
        }, 1500);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary }}
        >
            {/* Dark Mode Toggle Button - Top Right */}
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="fixed top-6 right-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                    backgroundColor: colors.bg.tertiary,
                    border: `1px solid ${colors.border.subtle}`,
                    boxShadow: `0 4px 16px ${colors.glow.primary}`
                }}
            >
                {isDarkMode ? (
                    <Sun className="w-5 h-5" style={{ color: colors.accent.warning }} />
                ) : (
                    <Moon className="w-5 h-5" style={{ color: colors.accent.primary }} />
                )}
            </button>

            {/* Animated Background Grid - Faster animation */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: isDarkMode
                            ? 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)'
                            : 'linear-gradient(rgba(79, 70, 229, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.02) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        animation: 'gridMoveFast 12s linear infinite'
                    }}
                />
            </div>

            {/* Gradient Orbs - Faster pulsing */}
            <div
                className="absolute top-20 right-20 w-125 h-125 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.primary}, transparent)`,
                    animationDuration: '2.5s'
                }}
            />
            <div
                className="absolute bottom-20 left-20 w-125 h-125 rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.secondary}, transparent)`,
                    animationDuration: '3.5s',
                    animationDelay: '0.5s'
                }}
            />

            {/* Sign In Card */}
            <div
                className="w-full max-w-md relative z-10 animate-fadeInUp"
                style={{ animationDelay: '100ms' }}
            >
                {/* Logo Header */}
                <div className="text-center mb-8 animate-fadeInDown">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300"
                            style={{
                                backgroundColor: colors.accent.primary,
                                boxShadow: `0 12px 32px ${colors.glow.primary}`
                            }}
                        >
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            color: colors.text.primary
                        }}
                    >
                        Welcome Back
                    </h1>
                    <p
                        className="text-base"
                        style={{
                            color: colors.text.secondary,
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        Sign in to your VoteSecure account
                    </p>
                </div>

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

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Email Field */}
                        <div
                            className="animate-fadeInUp"
                            style={{ animationDelay: '300ms' }}
                        >
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold mb-3"
                                style={{
                                    color: colors.text.primary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div
                                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300"
                                    style={{
                                        color: focusedField === 'email' ? colors.accent.primary : colors.text.tertiary
                                    }}
                                >
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="admin@university.edu"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 outline-none"
                                    style={{
                                        backgroundColor: colors.bg.elevated,
                                        border: `2px solid ${
                                            errors.email
                                                ? colors.accent.danger
                                                : focusedField === 'email'
                                                    ? colors.accent.primary
                                                    : colors.border.subtle
                                        }`,
                                        color: colors.text.primary,
                                        fontFamily: "'Inter', sans-serif",
                                        boxShadow: focusedField === 'email'
                                            ? `0 0 0 4px ${colors.glow.primary}`
                                            : 'none'
                                    }}
                                />
                            </div>
                            {errors.email && (
                                <div
                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                    style={{ color: colors.accent.danger }}
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    <span
                                        className="text-sm font-medium"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {errors.email}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Password Field */}
                        <div
                            className="animate-fadeInUp"
                            style={{ animationDelay: '400ms' }}
                        >
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold mb-3"
                                style={{
                                    color: colors.text.primary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div
                                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300"
                                    style={{
                                        color: focusedField === 'password' ? colors.accent.primary : colors.text.tertiary
                                    }}
                                >
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-4 rounded-xl transition-all duration-300 outline-none"
                                    style={{
                                        backgroundColor: colors.bg.elevated,
                                        border: `2px solid ${
                                            errors.password
                                                ? colors.accent.danger
                                                : focusedField === 'password'
                                                    ? colors.accent.primary
                                                    : colors.border.subtle
                                        }`,
                                        color: colors.text.primary,
                                        fontFamily: "'Inter', sans-serif",
                                        boxShadow: focusedField === 'password'
                                            ? `0 0 0 4px ${colors.glow.primary}`
                                            : 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                                    style={{ color: colors.text.tertiary }}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <div
                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                    style={{ color: colors.accent.danger }}
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    <span
                                        className="text-sm font-medium"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {errors.password}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div
                            className="flex items-center justify-between animate-fadeInUp"
                            style={{ animationDelay: '500ms' }}
                        >
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded cursor-pointer transition-all duration-200"
                                    style={{
                                        accentColor: colors.accent.primary,
                                        border: `2px solid ${colors.border.medium}`
                                    }}
                                />
                                <span
                                    className="text-sm font-medium transition-colors duration-200 group-hover:opacity-80"
                                    style={{
                                        color: colors.text.secondary,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    Remember me
                                </span>
                            </label>

                            <a
                                href="#"
                                className="text-sm font-semibold transition-all duration-200 hover:opacity-80"
                                style={{
                                    color: colors.accent.primary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 animate-fadeInUp"
                            style={{
                                backgroundColor: colors.accent.primary,
                                color: '#ffffff',
                                fontFamily: "'Inter', sans-serif",
                                boxShadow: `0 12px 32px ${colors.glow.primary}`,
                                animationDelay: '600ms'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                    />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div
                            className="relative my-8 animate-fadeInUp"
                            style={{ animationDelay: '700ms' }}
                        >
                            <div
                                className="absolute inset-0 flex items-center"
                            >
                                <div
                                    className="w-full border-t"
                                    style={{ borderColor: colors.border.subtle }}
                                />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span
                                    className="px-4 text-sm font-medium"
                                    style={{
                                        backgroundColor: colors.bg.card,
                                        color: colors.text.tertiary,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* SSO Buttons */}
                        <div
                            className="grid grid-cols-2 gap-4 animate-fadeInUp"
                            style={{ animationDelay: '800ms' }}
                        >
                            {['Google', 'Microsoft'].map((provider) => (
                                <button
                                    key={provider}
                                    type="button"
                                    className="py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                    style={{
                                        backgroundColor: colors.bg.elevated,
                                        color: colors.text.primary,
                                        border: `2px solid ${colors.border.medium}`,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    <div
                                        className="w-5 h-5 rounded-full"
                                        style={{
                                            backgroundColor: provider === 'Google' ? '#4285f4' : '#00a4ef'
                                        }}
                                    />
                                    {provider}
                                </button>
                            ))}
                        </div>
                    </form>
                </div>

                {/* Sign-Up Link */}
                <div
                    className="text-center mt-8 animate-fadeInUp"
                    style={{ animationDelay: '900ms' }}
                >
                    <p
                        className="text-sm"
                        style={{
                            color: colors.text.secondary,
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        Don&#39;t have an account?{' '}
                        <a
                            href="#"
                            className="font-bold transition-all duration-200 hover:opacity-80"
                            style={{
                                color: colors.accent.primary
                            }}
                        >
                            Request Access
                        </a>
                    </p>
                </div>

                {/* Security Badge */}
                <div
                    className="flex items-center justify-center gap-2 mt-8 animate-fadeInUp"
                    style={{ animationDelay: '1000ms' }}
                >
                    <Shield
                        className="w-4 h-4"
                        style={{ color: colors.accent.success }}
                    />
                    <span
                        className="text-xs font-medium"
                        style={{
                            color: colors.text.tertiary,
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        Protected by 256-bit encryption
                    </span>
                </div>
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
                    animation: fadeInDown 0.8s ease-out forwards;
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
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