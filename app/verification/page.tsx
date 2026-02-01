"use client"

import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent, ClipboardEvent } from 'react';
import {RefreshCw } from 'lucide-react';
import {getColor} from "@/lib/_colors";
import {verification_style} from "@/lib/style/verification";
import {ThemeToggleButton} from "@/components/signin/ThemeToggleButton";
import {AnimatedBackground} from "@/components/profile/AnimatedBackground";
import {Gradient} from "@/components/verification/Gradient";
import {SuccessButton} from "@/components/verification/SuccessButton";
import {LogoHeader} from "@/components/verification/LogoHeader";
import {ErrorMessage} from "@/components/verification/ErrorMessage";
import {SubmitButton} from "@/components/verification/SubmitButton";
import {State_Success} from "@/components/verification/State_Success";
import {State_Error} from "@/components/verification/State_Error";
import {State_Idle} from "@/components/verification/State_Idle";
import {VerificationStatus} from "@/lib/Schema_Lib/verification.schema"
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation';

export default function EmailVerification() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State management
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [status, setStatus] = useState<VerificationStatus>('idle');
    const [email, setEmail] = useState<string>('');
    const [isResending, setIsResending] = useState<boolean>(false);
    const [resendTimer, setResendTimer] = useState<number>(300); // 5 minutes in seconds
    const [canResend, setCanResend] = useState<boolean>(false);

    // Refs
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const sentOtpRef = useRef<string>(''); // Store the OTP sent to email

    // Color system matching the landing page
    const colors = getColor(isDarkMode);

    // Generate 6-digit random OTP
    const generateRandomNumber = (): string => {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    };

    // Timer management
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

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Send OTP email
    const handleSendEmail = async (isResend: boolean = false): Promise<boolean> => {
        try {
            const newOtp = generateRandomNumber();
            sentOtpRef.current = newOtp; // Store OTP for verification

            // Send OTP to the backend
            const response = await axios.post('/api/user/verify', {
                email: email,
                otp: newOtp,
                type: isResend ? 'resend' : 'initial'
            });

            if (response.data.success) {
                if (isResend) {
                    toast.success('Verification code resent successfully!');
                } else {
                    toast.success('Verification code sent to your email!');
                }
                return true;
            } else {
                toast.error(response.data.message || 'Failed to send verification code');
                return false;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Failed to send verification code';
                console.error('Email send error:', errorMessage);
                toast.error(errorMessage);
            } else if (error instanceof Error) {
                console.error('Email send error:', error.message);
                toast.error(error.message);
            } else {
                console.error('Unknown error:', error);
                toast.error('An unexpected error occurred');
            }
            return false;
        }
    };

    // Verify OTP
    const verifyOtp = async (otpString: string) => {
        setStatus('verifying');

        try {
            // Verify against stored OTP
            if (otpString === sentOtpRef.current) {
                // Call backend to mark email as verified
                const response = await axios.post('/api/user/verify/confirm', {
                    email: email,
                    otp: otpString
                });

                if (response.data.success) {
                    setStatus('success');
                    toast.success('Email verified successfully!');

                    // Clear timer on success
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }

                    // Redirect to dashboard after 2 seconds
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 2000);
                } else {
                    setStatus('error');
                    toast.error('Verification failed. Please try again.');
                }
            } else {
                setStatus('error');
                toast.error('Invalid verification code');
            }
        } catch (error) {
            setStatus('error');
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Verification failed';
                toast.error(errorMessage);
            } else {
                toast.error('Verification failed. Please try again.');
            }
            console.error('Verification error:', error);
        }
    };

    // OTP Input handlers
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
            verifyOtp(otpString).then();
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
            verifyOtp(newOtp.join('')).then();
        }
    };

    // Form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length === 6) {
            verifyOtp(otpString).then();
        }
    };

    // Resend OTP
    const handleResend = async () => {
        if (!canResend || isResending) return;

        setIsResending(true);
        setOtp(new Array(6).fill(''));
        setStatus('idle');

        // Send new OTP
        const success = await handleSendEmail(true);

        if (success) {
            // Reset timer to 5 minutes
            setResendTimer(300);
            startTimer();
        }

        setIsResending(false);
        inputRefs.current[0]?.focus();
    };

    // Try again after an error
    const handleTryAgain = () => {
        setOtp(new Array(6).fill(''));
        setStatus('idle');
        inputRefs.current[0]?.focus();
    };

    // Initialize on mount
    useEffect(() => {
        // Get email from URL params (passed from signup/signin)
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        } else {
            // If no email in params, redirect to signin
            toast.error('Email not found. Please sign in again.');
            router.push('/signin');
            return;
        }

        // Send initial OTP email
        const initializeVerification = async () => {
            const success = await handleSendEmail(false);
            if (!success) {
                // If the email sending fails, show an error but don't redirect
                console.error('Failed to send initial verification email');
            }
        };

        initializeVerification().then();

        // Focus first input
        inputRefs.current[0]?.focus();

        // Start timer
        startTimer();

        // Cleanup on unmounting
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


    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary }}
        >
            {/* Dark Mode Toggle Button - Top Right */}
            <ThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

            {/* Animated Background Grid - Faster */}
            <AnimatedBackground isDarkMode={isDarkMode}/>

            {/* Gradient Orbs - Faster */}
            <Gradient colors={colors} status={status}/>

            {/* Main Content */}
            <div className="w-full max-w-md relative z-10">
                {/* Back Button */}
                {status !== 'success' && <SuccessButton colors={colors}/> }

                {/* Logo Header */}
                <LogoHeader colors={colors} email={email} status={status}/>


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
                            {status === 'error' && <ErrorMessage colors={colors}/>}

                            {/* Submit Button */}
                            <SubmitButton colors={colors} status={status} otp={otp}/>

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
                {status === 'success' && <State_Success colors={colors}/> }

                {/* Error State - Try Again */}
                {status === 'error' && <State_Error colors={colors} handleTryAgain={handleTryAgain} /> }

                {/* Idle State */}
                {status === 'idle' && <State_Idle colors={colors}/> }
            </div>

            {/* CSS Animations */}
            <style>{verification_style}</style>
        </div>
    );
}