import {AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail} from "lucide-react";
import React, {FormEvent} from "react";
import {getColor} from "@/lib/_colors";
import {FocusedField, ValidationErrors} from "@/app/signin/page";

type IForm = {
    isDarkMode: boolean;
    handleSubmit(
        e: FormEvent<HTMLFormElement>,
    ): Promise<void>,
    focusedField: FocusedField,
    setFocusedField: (value: React.SetStateAction<FocusedField>) => void
    password: string
    setPassword: (value: React.SetStateAction<string>) => void
    email: string
    setEmail: (value: React.SetStateAction<string>) => void
    showPassword: boolean
    setShowPassword: (value: React.SetStateAction<boolean>) => void
    isLoading: boolean
    errors: ValidationErrors


}


export const Form = (
    {
        isDarkMode, handleSubmit,
        focusedField, setFocusedField,
        password, setPassword,
        showPassword, setShowPassword,
        email, setEmail,
        errors, isLoading
    }: IForm,
) => {

    const colors = getColor(isDarkMode);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Email Field */}
            <div
                className="animate-fadeInUp"
                style={{animationDelay: '300ms'}}
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
                        <Mail className="w-5 h-5"/>
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
                        style={{color: colors.accent.danger}}
                    >
                        <AlertCircle className="w-4 h-4"/>
                        <span
                            className="text-sm font-medium"
                            style={{fontFamily: "'Inter', sans-serif"}}
                        >
                                        {errors.email}
                                    </span>
                    </div>
                )}
            </div>

            {/* Password Field */}
            <div
                className="animate-fadeInUp"
                style={{animationDelay: '400ms'}}
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
                        <Lock className="w-5 h-5"/>
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
                        style={{color: colors.text.tertiary}}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5"/>
                        ) : (
                            <Eye className="w-5 h-5"/>
                        )}
                    </button>
                </div>
                {errors.password && (
                    <div
                        className="flex items-center gap-2 mt-2 animate-fadeIn"
                        style={{color: colors.accent.danger}}
                    >
                        <AlertCircle className="w-4 h-4"/>
                        <span
                            className="text-sm font-medium"
                            style={{fontFamily: "'Inter', sans-serif"}}
                        >
                                        {errors.password}
                                    </span>
                    </div>
                )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div
                className="flex items-center justify-between animate-fadeInUp"
                style={{animationDelay: '500ms'}}
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
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"/>
                    </>
                )}
            </button>

            {/* Divider */}
            <div
                className="relative my-8 animate-fadeInUp"
                style={{animationDelay: '700ms'}}
            >
                <div
                    className="absolute inset-0 flex items-center"
                >
                    <div
                        className="w-full border-t"
                        style={{borderColor: colors.border.subtle}}
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
                style={{animationDelay: '800ms'}}
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
    );
}