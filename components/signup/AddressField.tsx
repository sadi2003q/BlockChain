import React, { ChangeEvent } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import {FocusedField} from "@/lib/Schema_Lib/signup.schema";
import {_colorType} from "@/lib/_colors";

interface AddressFieldProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    error?: string;
    focusedField: FocusedField;
    colors: _colorType;
}

export const AddressField: React.FC<AddressFieldProps> = ({
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    focusedField,
    colors
}) => {
    return (
        <div className="animate-fadeInUp" style={{ animationDuration: '0.5s' }}>
            <label
                htmlFor="address"
                className="block text-sm font-semibold mb-2"
                style={{
                    color: colors.text.primary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Address
            </label>
            <div className="relative">
                <div
                    className="absolute left-4 top-4 transition-all duration-300"
                    style={{
                        color: focusedField === 'address' ? colors.accent.primary : colors.text.tertiary
                    }}
                >
                    <MapPin className="w-5 h-5" />
                </div>
                <textarea
                    id="address"
                    name="address"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder="123 Main St, City, State, ZIP"
                    rows={3}
                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none resize-none"
                    style={{
                        backgroundColor: colors.bg.elevated,
                        border: `2px solid ${
                            error
                                ? colors.accent.danger
                                : focusedField === 'address'
                                    ? colors.accent.primary
                                    : colors.border.subtle
                        }`,
                        color: colors.text.primary,
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: focusedField === 'address'
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
