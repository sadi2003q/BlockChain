import React, { ChangeEvent } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit2, Save, X } from 'lucide-react';
import {_colorType} from "@/lib/_colors";

interface PersonalInfoFormProps {
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    formData: {
        fullName: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        address: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        fullName: string
        email: string
        phone: string
        dateOfBirth: string
        address: string
    }>>
    onSave: () => void;
    colors: _colorType;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
    isEditing,
    setIsEditing,
    formData,
    setFormData,
    onSave,
    colors
}) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev:  {
            fullName: string;
            email: string;
            phone: string;
            dateOfBirth: string;
            address: string;
        }) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className="p-4 sm:p-8 rounded-2xl"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`
            }}
        >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                >
                    Personal Information
                </h2>
                
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: colors.accent.primary,
                            color: '#ffffff',
                            fontFamily: "'Inter', sans-serif",
                            boxShadow: `0 4px 12px ${colors.glow.primary}`
                        }}
                    >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit Profile</span>
                        <span className="sm:hidden">Edit</span>
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={onSave}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: colors.accent.success,
                                color: '#ffffff',
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            <Save className="w-4 h-4" />
                            <span className="hidden sm:inline">Save</span>
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300"
                            style={{
                                backgroundColor: colors.bg.tertiary,
                                color: colors.text.secondary,
                                border: `1px solid ${colors.border.medium}`,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            <X className="w-4 h-4" />
                            <span className="hidden sm:inline">Cancel</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Vertical Layout for all fields */}
            <div className="space-y-4 sm:space-y-5">
                {/* Full Name */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-200"
                        style={{
                            backgroundColor: colors.bg.tertiary,
                            border: `1px solid ${colors.border.subtle}`,
                            color: colors.text.primary,
                            fontFamily: "'Inter', sans-serif",
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-200"
                        style={{
                            backgroundColor: colors.bg.tertiary,
                            border: `1px solid ${colors.border.subtle}`,
                            color: colors.text.primary,
                            fontFamily: "'Inter', sans-serif",
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Phone */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-200"
                        style={{
                            backgroundColor: colors.bg.tertiary,
                            border: `1px solid ${colors.border.subtle}`,
                            color: colors.text.primary,
                            fontFamily: "'Inter', sans-serif",
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-200"
                        style={{
                            backgroundColor: colors.bg.tertiary,
                            border: `1px solid ${colors.border.subtle}`,
                            color: colors.text.primary,
                            fontFamily: "'Inter', sans-serif",
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Address */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-200"
                        style={{
                            backgroundColor: colors.bg.tertiary,
                            border: `1px solid ${colors.border.subtle}`,
                            color: colors.text.primary,
                            fontFamily: "'Inter', sans-serif",
                            outline: 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};