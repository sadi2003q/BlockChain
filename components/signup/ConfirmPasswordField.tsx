import React, { ChangeEvent } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { FocusedField } from '@/app/signup/page';

interface ConfirmPasswordFieldProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    error?: string;
    focusedField: FocusedField;
    showConfirmPassword: boolean;
    setShowConfirmPassword: (show: boolean) => void;
    colors: any;
}

export const ConfirmPasswordField: React.FC<ConfirmPasswordFieldProps> = ({
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    focusedField,
    showConfirmPassword,
    setShowConfirmPassword,
    colors
}) => {
    return (
        <div className="animate-fadeInUp" style={{ animationDuration: '0.5s', animationDelay: '0.1s' }}>
            <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold mb-2"
                style={{
                    color: colors.text.primary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Confirm Password
            </label>
            <div className="relative">
                <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                        color: focusedField === 'confirmPassword' ? colors.accent.primary : colors.text.tertiary
                    }}
                >
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder="Re-enter your password"
                    className="w-full pl-12 pr-12 py-3 rounded-xl transition-all duration-300 outline-none"
                    style={{
                        backgroundColor: colors.bg.elevated,
                        border: `2px solid ${
                            error
                                ? colors.accent.danger
                                : focusedField === 'confirmPassword'
                                    ? colors.accent.primary
                                    : colors.border.subtle
                        }`,
                        color: colors.text.primary,
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: focusedField === 'confirmPassword'
                            ? `0 0 0 4px ${colors.glow.primary}`
                            : 'none'
                    }}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                    style={{ color: colors.text.tertiary }}
                >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
            {error && (
                <div
                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                    style={{ color: colors.accent.danger }}
                >
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {error}
                    </span>
                </div>
            )}
        </div>
    );
};
