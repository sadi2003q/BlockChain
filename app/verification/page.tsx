


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

export default function EmailVerification() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [status, setStatus] = useState<VerificationStatus>('idle');

    //FIXME: SET EMAIL IS NOT DEFINED
    const [email,] = useState<string>('john@university.edu');

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
                                    don&#39;t receive the code?
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

                {/* Back to Sign In Link */}
                {status === 'idle' && <State_Idle colors={colors}/> }
            </div>

            {/* CSS Animations */}
            <style>{verification_style}</style>
        </div>
    );
}