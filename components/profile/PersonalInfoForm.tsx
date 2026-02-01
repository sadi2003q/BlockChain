import React from 'react';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { _colorType } from "@/lib/_colors";
import { UserDTO } from "@/backend/types/user.dto";

interface PersonalInfoViewProps {
    userData: UserDTO;
    colors: _colorType;
}

export const PersonalInfoForm: React.FC<PersonalInfoViewProps> = ({
                                                                      userData,
                                                                      colors
                                                                  }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Not provided';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateAge = (dateString: string) => {
        if (!dateString) return null;
        const birthDate = new Date(dateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const age = userData.dateOfBirth ? calculateAge(userData.dateOfBirth) : null;

    return (
        <div className="space-y-6">
            {/* Main Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Full Name Card */}
                <div
                    className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                    style={{
                        backgroundColor: colors.bg.card,
                        border: `1px solid ${colors.border.subtle}`,
                    }}
                >
                    <div className="relative flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{
                                border: `2px solid ${colors.accent.primary}`,
                                backgroundColor: colors.bg.secondary
                            }}
                        >
                            <User className="w-6 h-6" style={{ color: colors.accent.primary }} />
                        </div>
                        <div className="flex-1">
                            <p
                                className="text-sm font-medium mb-1"
                                style={{
                                    color: colors.text.secondary,
                                    fontFamily: "'Sora', sans-serif"
                                }}
                            >
                                Full Name
                            </p>
                            <p
                                className="text-xl font-bold"
                                style={{
                                    color: colors.text.primary,
                                    fontFamily: "'Sora', sans-serif"
                                }}
                            >
                                {userData.name || 'Not provided'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Email Card */}
                <div
                    className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                    style={{
                        backgroundColor: colors.bg.card,
                        border: `1px solid ${colors.border.subtle}`,
                    }}
                >
                    <div className="relative flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{
                                border: `2px solid ${colors.accent.primary}`,
                                backgroundColor: colors.bg.secondary
                            }}
                        >
                            <Mail className="w-6 h-6" style={{ color: colors.accent.primary }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p
                                className="text-sm font-medium mb-1"
                                style={{
                                    color: colors.text.secondary,
                                    fontFamily: "'Sora', sans-serif"
                                }}
                            >
                                Email Address
                            </p>
                            <p
                                className="text-lg font-bold truncate"
                                style={{
                                    color: colors.text.primary,
                                    fontFamily: "'Sora', sans-serif"
                                }}
                            >
                                {userData.email || 'Not provided'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Phone Card */}
                <div
                    className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                    style={{
                        backgroundColor: colors.bg.card,
                        border: `1px solid ${colors.border.subtle}`,
                    }}
                >
                    <div className="relative flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{
                                border: `2px solid ${colors.accent.primary}`,
                                backgroundColor: colors.bg.secondary
                            }}
                        >
                            <Phone className="w-6 h-6" style={{ color: colors.accent.primary }} />
                        </div>
                        <div className="flex-1">
                            <p
                                className="text-sm font-medium mb-1"
                                style={{
                                    color: colors.text.secondary,
                                    fontFamily: "'Sora', sans-serif"
                                }}
                            >
                                Phone Number
                            </p>
                            <p
                                className="text-xl font-bold"
                                style={{
                                    color: colors.text.primary,
                                    fontFamily: "'Sora', sans-serif"
                                }}
                            >
                                {userData.phone || 'Not provided'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Date of Birth Card */}
                <div
                    className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                    style={{
                        backgroundColor: colors.bg.card,
                        border: `1px solid ${colors.border.subtle}`,
                    }}
                >
                    <div className="relative flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{
                                border: `2px solid ${colors.accent.primary}`,
                                backgroundColor: colors.bg.secondary
                            }}
                        >
                            <Calendar className="w-6 h-6" style={{ color: colors.accent.primary }} />
                        </div>
                        <div className="flex-1">
                            <p
                                className="text-sm font-medium mb-1"
                                style={{
                                    color: colors.text.secondary,
                                    fontFamily: "'Sora', sans-serif"
                                }}
                            >
                                Date of Birth
                            </p>
                            <p
                                className="text-lg font-bold"
                                style={{
                                    color: colors.text.primary,
                                    fontFamily: "'Sora', sans-serif"
                                }}
                            >
                                {userData.dateOfBirth ? formatDate(userData.dateOfBirth) : 'Not provided'}
                            </p>
                            {/*{age && (*/}
                            {/*    <p*/}
                            {/*        className="text-sm mt-1 font-medium"*/}
                            {/*        style={{*/}
                            {/*            color: colors.accent.primary,*/}
                            {/*            fontFamily: "'Inter', sans-serif"*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        {age} years old*/}
                            {/*    </p>*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Card - Full Width */}
            <div
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                style={{
                    backgroundColor: colors.bg.card,
                    border: `1px solid ${colors.border.subtle}`,
                }}
            >
                <div className="relative flex items-start gap-4">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                            border: `2px solid ${colors.accent.primary}`,
                            backgroundColor: colors.bg.secondary
                        }}
                    >
                        <MapPin className="w-6 h-6" style={{ color: colors.accent.primary }} />
                    </div>
                    <div className="flex-1">
                        <p
                            className="text-sm font-medium mb-1"
                            style={{
                                color: colors.text.secondary,
                                fontFamily: "'Sora', sans-serif"
                            }}
                        >
                            Address
                        </p>
                        <p
                            className="text-xl font-bold leading-relaxed"
                            style={{
                                color: colors.text.primary,
                                fontFamily: "'Sora', sans-serif"
                            }}
                        >
                            {userData.address || 'Not provided'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};