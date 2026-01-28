import React, { ChangeEvent } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { FocusedField } from '@/app/signup/page';

interface EmailFieldProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    error?: string;
    focusedField: FocusedField;
    colors: any;
}

export const EmailField: React.FC<EmailFieldProps> = ({
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    focusedField,
    colors
}) => {
    return (
        <div className="animate-fadeInUp" style={{ animationDuration: '0.5s', animationDelay: '0.1s' }}>
            <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
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
                    name="email"
                    type="email"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder="john@university.edu"
                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none"
                    style={{
                        backgroundColor: colors.bg.elevated,
                        border: `2px solid ${
                            error
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
