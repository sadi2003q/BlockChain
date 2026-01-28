"use client"

import React, { useState, FormEvent, ChangeEvent } from 'react';
import {getColor} from "@/lib/_colors";
import {ThemeToggleButton} from "@/components/signin/ThemeToggleButton";
import {Animation} from "@/components/signup/Animation";
import {Header} from "@/components/signup/Header";
import {FeatureCard} from "@/components/signup/FeatureCard";
import {SignUpBadge} from "@/components/signup/Badge";
import {HeadingText} from "@/components/signup/HeadingText";
import {MobileLoginForm} from "@/components/signup/MobileLoginForm";
import {SignUpProgress} from "@/components/signup/SignUpProgress";
import {SignUpGlow} from "@/components/signup/SignUpGlow";
import {SignUpFormText} from "@/components/signup/SignUpFormText";
import {NameField} from "@/components/signup/NameField";
import {EmailField} from "@/components/signup/EmailField";
import {PhoneField} from "@/components/signup/PhoneField";
import {PasswordField} from "@/components/signup/PasswordField";
import {ConfirmPasswordField} from "@/components/signup/ConfirmPasswordField";
import {DateOfBirthField} from "@/components/signup/DateOfBirthField";
import {GenderField} from "@/components/signup/GenderField";
import {AddressField} from "@/components/signup/AddressField";
import {ProfileImageUpload} from "@/components/signup/ProfileImageUpload";
import {NavigationButtons} from "@/components/signup/NavigationButtons";
import {ForewordLink_SignIn} from "@/components/signup/ForewordLink_SignIn";
import {ValidationErrors, FocusedField, GenderType} from "@/lib/Schema_Lib/signup.schema";


export default function VoteSecureSignUp() {


    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '' as GenderType,
        address: '',
        profileImage: null as File | null,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [focusedField, setFocusedField] = useState<FocusedField>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);



    // Color system matching the landing page
    const colors = getColor(isDarkMode)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, profileImage: 'Image must be less than 5MB' }));
                return;
            }
            setFormData(prev => ({ ...prev, profileImage: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setErrors(prev => ({ ...prev, profileImage: undefined }));
        }
    };

    const validateStep = (step: number): boolean => {
        const newErrors: ValidationErrors = {};

        if (step === 1) {
            if (!formData.name) newErrors.name = 'Name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
            if (!formData.phone) newErrors.phone = 'Phone number is required';
            else if (!/^\d{10,15}$/.test(formData.phone.replace(/[-()\s]/g, '')))
                newErrors.phone = 'Invalid phone number';
        } else if (step === 2) {
            if (!formData.password) newErrors.password = 'Password is required';
            else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
            else if (formData.password !== formData.confirmPassword)
                newErrors.confirmPassword = 'Passwords do not match';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
            if (!formData.gender) newErrors.gender = 'Please select your gender';
        } else if (step === 3) {
            if (!formData.address) newErrors.address = 'Address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateStep(currentStep)) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Signing up...', formData);
            // Handle sign-up logic here
        }, 1500);
    };

    const progressPercentage = (currentStep / 3) * 100;

    return (
        <div
            className="min-h-screen transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary }}
        >
            {/* Dark Mode Toggle Button - Top Right */}
            <ThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>


            {/* Animated Background Grid - Faster */}
            <Animation isDarkMode={isDarkMode}/>


            {/* Main Container */}
            <div className="relative z-10 w-full px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">

                    {/* Left Side - Feature Highlights */}
                    <div className="hidden lg:block animate-fadeInLeft">
                        {/* Logo Header */}
                        <Header isDarkMode={isDarkMode}/>

                        {/*  Heading Information  */}
                        <HeadingText isDarkMode={isDarkMode}/>

                        {/* Feature Cards */}
                        <FeatureCard isDarkMode={isDarkMode}/>

                        {/* Trust Badge */}
                        <SignUpBadge isDarkMode={isDarkMode}/>
                    </div>

                    {/* Right Side - Sign-Up Form */}
                    <div className="w-full animate-fadeInRight">
                        {/* Mobile Logo */}
                        <MobileLoginForm isDarkMode={isDarkMode}/>

                        {/* Progress Bar */}
                        <SignUpProgress
                            currentStep={currentStep}
                            progressPercentage={progressPercentage}
                            isDarkMode={isDarkMode}
                        />

                        {/* Form Card */}
                        <div
                            className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden"
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `1px solid ${colors.border.subtle}`,
                                boxShadow: `0 24px 48px ${colors.glow.primary}`
                            }}
                        >
                            {/* Subtle glow effect */}
                            <SignUpGlow isDarkMode={isDarkMode}/>

                            <SignUpFormText currentStep={currentStep} isDarkMode={isDarkMode}/>

                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                {/* Step 1: Personal Info */}
                                {currentStep === 1 && (
                                    <>
                                        <NameField
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            error={errors.name}
                                            focusedField={focusedField}
                                            colors={colors}
                                        />

                                        <EmailField
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            error={errors.email}
                                            focusedField={focusedField}
                                            colors={colors}
                                        />

                                        <PhoneField
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField(null)}
                                            error={errors.phone}
                                            focusedField={focusedField}
                                            colors={colors}
                                        />
                                    </>
                                )}

                                {/* Step 2: Security */}
                                {currentStep === 2 && (
                                    <>
                                        <PasswordField
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                            error={errors.password}
                                            focusedField={focusedField}
                                            showPassword={showPassword}
                                            setShowPassword={setShowPassword}
                                            colors={colors}
                                        />

                                        <ConfirmPasswordField
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('confirmPassword')}
                                            onBlur={() => setFocusedField(null)}
                                            error={errors.confirmPassword}
                                            focusedField={focusedField}
                                            showConfirmPassword={showConfirmPassword}
                                            setShowConfirmPassword={setShowConfirmPassword}
                                            colors={colors}
                                        />

                                        <DateOfBirthField
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('dateOfBirth')}
                                            onBlur={() => setFocusedField(null)}
                                            error={errors.dateOfBirth}
                                            focusedField={focusedField}
                                            colors={colors}
                                        />

                                        <GenderField
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            error={errors.gender}
                                            colors={colors}
                                        />
                                    </>
                                )}

                                {/* Step 3: Additional Info */}
                                {currentStep === 3 && (
                                    <>
                                        <AddressField
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('address')}
                                            onBlur={() => setFocusedField(null)}
                                            error={errors.address}
                                            focusedField={focusedField}
                                            colors={colors}
                                        />

                                        <ProfileImageUpload
                                            imagePreview={imagePreview}
                                            onChange={handleImageChange}
                                            error={errors.profileImage}
                                            colors={colors}
                                        />
                                    </>
                                )}

                                {/* Navigation Buttons */}
                                <NavigationButtons
                                    currentStep={currentStep}
                                    isLoading={isLoading}
                                    onBack={() => setCurrentStep(prev => prev - 1)}
                                    onNext={handleNext}
                                    colors={colors}
                                />
                            </form>
                        </div>

                        {/* Sign In Link */}
                        <ForewordLink_SignIn isDarkMode={isDarkMode}/>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes gridMoveFast {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(40px, 40px);
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.8s ease-out forwards;
                }
                
                .animate-fadeInRight {
                    animation: fadeInRight 0.8s ease-out forwards;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                
                * {
                    scroll-behavior: smooth;
                }
                
                input::placeholder,
                textarea::placeholder {
                    opacity: 0.5;
                }
                
                input:focus::placeholder,
                textarea:focus::placeholder {
                    opacity: 0.3;
                }
                
                /* Custom date input styling */
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: ${isDarkMode ? 'invert(1)' : 'invert(0)'};
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}