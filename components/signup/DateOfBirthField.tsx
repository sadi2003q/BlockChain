import React, { ChangeEvent } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { FocusedField } from '@/app/signup/page';

interface DateOfBirthFieldProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    error?: string;
    focusedField: FocusedField;
    colors: any;
}

export const DateOfBirthField: React.FC<DateOfBirthFieldProps> = ({
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    focusedField,
    colors
}) => {
    return (
        <div className="animate-fadeInUp" style={{ animationDuration: '0.5s', animationDelay: '0.2s' }}>
            <label
                htmlFor="dateOfBirth"
                className="block text-sm font-semibold mb-2"
                style={{
                    color: colors.text.primary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Date of Birth
            </label>
            <div className="relative">
                <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                        color: focusedField === 'dateOfBirth' ? colors.accent.primary : colors.text.tertiary
                    }}
                >
                    <Calendar className="w-5 h-5" />
                </div>
                <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none"
                    style={{
                        backgroundColor: colors.bg.elevated,
                        border: `2px solid ${
                            error
                                ? colors.accent.danger
                                : focusedField === 'dateOfBirth'
                                    ? colors.accent.primary
                                    : colors.border.subtle
                        }`,
                        color: colors.text.primary,
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: focusedField === 'dateOfBirth'
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
