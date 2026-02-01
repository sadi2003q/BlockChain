


"use client"

import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { Shield, CheckCircle, XCircle, ArrowRight, Moon, Sun, RefreshCw, ArrowLeft } from 'lucide-react';
import {getColor} from "@/lib/_colors";
import {verification_style} from "@/lib/style/verification";

type VerificationStatus = 'idle' | 'verifying' | 'success' | 'error';

export default function EmailVerification() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [status, setStatus] = useState<VerificationStatus>('idle');

    //FIXME: SET EMAIL IS NOT DEFINED
    const [email, setEmail] = useState<string>('john@university.edu');



    const [isResending, setIsResending] = useState<boolean>(false);
    const [resendTimer, setResendTimer] = useState<number>(300); // 5 minutes in seconds
    const [canResend, setCanResend] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Mock OTP for demonstration (in production, this would be validated against backend)
    const MOCK_OTP = '123456';

    // Color system matching the landing page
    const colors = getColor(isDarkMode)


    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };



    useEffect(() => {
        // Focus first input on the mount
        inputRefs.current[0]?.focus();

        // Start timer on mount
        startTimer();

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Update canResend based on the timer
        setCanResend(resendTimer === 0);
    }, [resendTimer]);


    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last character
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all 6 digits are entered
        if (index === 5 && value) {
            const otpString = [...newOtp.slice(0, 5), value].join('');
            verifyOtp(otpString);
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Move to the previous input on backspace if the current is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Move to the next input on arrow right
        if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Move to previous input on arrow left
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);

        // Focus on the next empty input or the last one
        const nextEmptyIndex = newOtp.findIndex(digit => !digit);
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        } else {
            inputRefs.current[5]?.focus();
            // Auto-verify if all digits are pasted
            verifyOtp(newOtp.join(''));
        }
    };

    const verifyOtp = (otpString: string) => {
        setStatus('verifying');

        // Simulate API call
        setTimeout(() => {
            if (otpString === MOCK_OTP) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        }, 1000);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length === 6) {
            verifyOtp(otpString);
        }
    };

    const handleResend = () => {
        if (!canResend) return;

        setIsResending(true);
        setOtp(new Array(6).fill(''));
        setStatus('idle');
        inputRefs.current[0]?.focus();

        // Simulate resend
        setTimeout(() => {
            setIsResending(false);
            // Reset timer to 5 minutes
            setResendTimer(300);
            startTimer();
        }, 2000);
    };

    const handleTryAgain = () => {
        setOtp(new Array(6).fill(''));
        setStatus('idle');
        inputRefs.current[0]?.focus();
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden"
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

            {/* Animated Background Grid - Faster */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: isDarkMode
                            ? 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)'
                            : 'linear-gradient(rgba(79, 70, 229, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.02) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        animation: 'gridMoveFast 10s linear infinite'
                    }}
                />
            </div>

            {/* Gradient Orbs - Faster */}
            <div
                className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${status === 'success' ? colors.accent.success : status === 'error' ? colors.accent.danger : colors.accent.primary}, transparent)`,
                    animationDuration: '2s'
                }}
            />
            <div
                className="absolute bottom-20 left-20 w-[350px] h-[350px] rounded-full blur-3xl opacity-20 animate-pulse"
                style={{
                    background: `radial-gradient(circle, ${colors.accent.secondary}, transparent)`,
                    animationDuration: '3s',
                    animationDelay: '0.5s'
                }}
            />

            {/* Main Content */}
            <div className="w-full max-w-md relative z-10">
                {/* Back Button */}
                {status !== 'success' && (
                    <button
                        onClick={() => {/* Navigate back */}}
                        className="flex items-center gap-2 mb-6 transition-all duration-300 hover:gap-3 group"
                        style={{
                            color: colors.text.secondary,
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                        <span className="text-sm font-semibold">Back to Sign In</span>
                    </button>
                )}

                {/* Logo Header */}
                <div className="text-center mb-8 animate-fadeIn">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300"
                            style={{
                                backgroundColor: status === 'success' ? colors.accent.success : status === 'error' ? colors.accent.danger : colors.accent.primary,
                                boxShadow: `0 12px 32px ${status === 'success' ? colors.glow.success : status === 'error' ? colors.glow.primary : colors.glow.primary}`
                            }}
                        >
                            {status === 'success' ? (
                                <CheckCircle className="w-8 h-8 text-white" />
                            ) : status === 'error' ? (
                                <XCircle className="w-8 h-8 text-white" />
                            ) : (
                                <Shield className="w-8 h-8 text-white" />
                            )}
                        </div>
                    </div>

                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            color: colors.text.primary
                        }}
                    >
                        {status === 'success' ? 'Email Verified!' : status === 'error' ? 'Verification Failed' : 'Verify Your Email'}
                    </h1>
                    <p
                        className="text-base"
                        style={{
                            color: colors.text.secondary,
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        {status === 'success'
                            ? 'Your email has been successfully verified'
                            : status === 'error'
                                ? 'The code you entered is incorrect'
                                : `We've sent a 6-digit code to ${email}`
                        }
                    </p>
                </div>

                {/* Verification Form */}
                {status !== 'success' && (
                    <div
                        className="p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden animate-fadeIn"
                        style={{
                            backgroundColor: colors.bg.card,
                            border: `1px solid ${colors.border.subtle}`,
                            boxShadow: `0 24px 48px ${status === 'error' ? colors.glow.primary : colors.glow.primary}`
                        }}
                    >
                        {/* Subtle glow effect */}
                        <div
                            className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                            style={{ background: status === 'error' ? colors.accent.danger : colors.accent.primary }}
                        />

                        <form onSubmit={handleSubmit} className="relative z-10">
                            {/* OTP Input */}
                            <div className="mb-6">
                                <label
                                    className="block text-sm font-semibold mb-4 text-center"
                                    style={{
                                        color: colors.text.primary,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    Enter Verification Code
                                </label>
                                <div className="flex gap-3 justify-center">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            disabled={status === 'verifying'}
                                            className="w-12 h-14 text-center text-2xl font-bold rounded-xl transition-all duration-300 outline-none"
                                            style={{
                                                backgroundColor: colors.bg.elevated,
                                                border: `2px solid ${
                                                    status === 'error' && digit
                                                        ? colors.accent.danger
                                                        : digit
                                                            ? colors.accent.primary
                                                            : colors.border.subtle
                                                }`,
                                                color: colors.text.primary,
                                                fontFamily: "'Sora', sans-serif",
                                                boxShadow: digit ? `0 0 0 4px ${status === 'error' ? colors.glow.primary : colors.glow.primary}` : 'none'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Error Message */}
                            {status === 'error' && (
                                <div
                                    className="mb-6 p-4 rounded-xl flex items-center gap-3 animate-fadeIn"
                                    style={{
                                        backgroundColor: `${colors.accent.danger}15`,
                                        border: `1px solid ${colors.accent.danger}30`
                                    }}
                                >
                                    <XCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.accent.danger }} />
                                    <p
                                        className="text-sm font-medium"
                                        style={{
                                            color: colors.accent.danger,
                                            fontFamily: "'Inter', sans-serif"
                                        }}
                                    >
                                        Invalid verification code. Please try again.
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={otp.join('').length !== 6 || status === 'verifying'}
                                className="group w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 mb-6"
                                style={{
                                    backgroundColor: colors.accent.primary,
                                    color: '#ffffff',
                                    fontFamily: "'Inter', sans-serif",
                                    boxShadow: `0 12px 32px ${colors.glow.primary}`
                                }}
                            >
                                {status === 'verifying' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Verify Email
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>

                            {/* Resend Code */}
                            <div className="text-center">
                                <p
                                    className="text-sm mb-3"
                                    style={{
                                        color: colors.text.secondary,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    Didn&#39;t receive the code?
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={!canResend || isResending}
                                    className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        color: canResend ? colors.accent.primary : colors.text.tertiary,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                                    {isResending
                                        ? 'Sending...'
                                        : canResend
                                            ? 'Resend Code'
                                            : `Resend in ${formatTime(resendTimer)}`
                                    }
                                </button>
                                {!canResend && !isResending && (
                                    <p
                                        className="text-xs mt-2"
                                        style={{
                                            color: colors.text.tertiary,
                                            fontFamily: "'Inter', sans-serif"
                                        }}
                                    >
                                        You can request a new code after the timer expires
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                )}

                {/* Success State */}
                {status === 'success' && (
                    <div
                        className="p-10 rounded-3xl backdrop-blur-xl relative overflow-hidden animate-fadeIn text-center"
                        style={{
                            backgroundColor: colors.bg.card,
                            border: `1px solid ${colors.border.subtle}`,
                            boxShadow: `0 24px 48px ${colors.glow.success}`
                        }}
                    >
                        {/* Success glow effect */}
                        <div
                            className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse"
                            style={{ background: colors.accent.success, animationDuration: '2s' }}
                        />

                        <div className="relative z-10">
                            {/* Success Icon */}
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scaleIn"
                                style={{
                                    backgroundColor: `${colors.accent.success}20`,
                                    border: `3px solid ${colors.accent.success}`
                                }}
                            >
                                <CheckCircle className="w-10 h-10" style={{ color: colors.accent.success }} />
                            </div>

                            <h2
                                className="text-2xl font-bold mb-3"
                                style={{
                                    fontFamily: "'Sora', sans-serif",
                                    color: colors.text.primary
                                }}
                            >
                                Congratulations! 🎉
                            </h2>

                            <p
                                className="text-base mb-8"
                                style={{
                                    color: colors.text.secondary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                Your email has been successfully verified. You can now access all features of VoteSecure.
                            </p>

                            <button
                                onClick={() => {/* Navigate to dashboard */}}
                                className="group px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                                style={{
                                    backgroundColor: colors.accent.success,
                                    color: '#ffffff',
                                    fontFamily: "'Inter', sans-serif",
                                    boxShadow: `0 12px 32px ${colors.glow.success}`
                                }}
                            >
                                Continue to Dashboard
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Error State - Try Again */}
                {status === 'error' && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleTryAgain}
                            className="text-sm font-semibold transition-all duration-300 hover:opacity-80"
                            style={{
                                color: colors.accent.primary,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            Clear and try again
                        </button>
                    </div>
                )}

                {/* Back to Sign In Link */}
                {status === 'idle' && (
                    <div className="text-center mt-6">
                        <a
                            href="#"
                            className="text-sm font-semibold transition-all duration-300 hover:opacity-80"
                            style={{
                                color: colors.text.secondary,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            ← Back to Sign In
                        </a>
                    </div>
                )}
            </div>

            {/* CSS Animations */}
            <style>{verification_style}</style>
        </div>
    );
}