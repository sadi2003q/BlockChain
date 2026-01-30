import React, { ChangeEvent } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import {_colorType} from "@/lib/_colors";

interface ProfileImageUploadProps {
    imagePreview: string | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    colors: _colorType;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
    imagePreview,
    onChange,
    error,
    colors
}) => {
    return (
        <div className="animate-fadeInUp" style={{ animationDuration: '0.5s', animationDelay: '0.1s' }}>
            <label
                className="block text-sm font-semibold mb-2"
                style={{
                    color: colors.text.primary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Profile Picture (Optional)
            </label>
            <div
                className="relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                    backgroundColor: colors.bg.elevated,
                    borderColor: error ? colors.accent.danger : colors.border.medium
                }}
            >
                <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            src={imagePreview}
                            alt="Preview"
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover"
                            style={{
                                border: `3px solid ${colors.accent.primary}`
                            }}
                        />
                        <p
                            className="text-sm font-medium"
                            style={{
                                color: colors.text.secondary,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            Click to change image
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{
                                backgroundColor: colors.bg.tertiary
                            }}
                        >
                            <Upload className="w-8 h-8" style={{ color: colors.text.tertiary }} />
                        </div>
                        <div>
                            <p
                                className="text-sm font-medium mb-1"
                                style={{
                                    color: colors.text.primary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                Click to upload or drag and drop
                            </p>
                            <p
                                className="text-xs"
                                style={{
                                    color: colors.text.tertiary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                PNG, JPG up to 5MB
                            </p>
                        </div>
                    </div>
                )}
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
