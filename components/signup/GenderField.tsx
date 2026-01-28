import React, { ChangeEvent } from 'react';
import { AlertCircle } from 'lucide-react';
import { GenderType } from '@/app/signup/page';

interface GenderFieldProps {
    value: GenderType;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    colors: any;
}

export const GenderField: React.FC<GenderFieldProps> = ({
    value,
    onChange,
    error,
    colors
}) => {
    return (
        <div className="animate-fadeInUp" style={{ animationDuration: '0.5s', animationDelay: '0.3s' }}>
            <label
                htmlFor="gender"
                className="block text-sm font-semibold mb-2"
                style={{
                    color: colors.text.primary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Gender
            </label>
            <select
                id="gender"
                name="gender"
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                style={{
                    backgroundColor: colors.bg.elevated,
                    border: `2px solid ${
                        error
                            ? colors.accent.danger
                            : colors.border.subtle
                    }`,
                    color: colors.text.primary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
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
