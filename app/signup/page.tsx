"use client"

import React, { useState, FormEvent, ChangeEvent } from 'react';
import {
    Shield, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, User, Phone, MapPin, Calendar, Upload, CheckCircle,
} from 'lucide-react';
import {getColor} from "@/lib/_colors";
import {ThemeToggleButton} from "@/components/signin/ThemeToggleButton";
import {Animation} from "@/components/signup/Animation";
import {Header} from "@/components/signup/Header";
import {FeatureCard} from "@/components/signup/FeatureCard";
import Image from 'next/image'
import {SignUpBadge} from "@/components/signup/Badge";
import {HeadingText} from "@/components/signup/HeadingText";
import {MobileLoginForm} from "@/components/signup/MobileLoginForm";
import {SignUpProgress} from "@/components/signup/SignUpProgress";
import {SignUpGlow} from "@/components/signup/SignUpGlow";
import {SignUpFormText} from "@/components/signup/SignUpFormText";

interface ValidationErrors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: string;
    profileImage?: string;
}

export type FocusedField = 'name' | 'email' | 'phone' | 'password' | 'confirmPassword' | 'dateOfBirth' | 'address' | null;

export type GenderType = 'male' | 'female' | 'other' | '';

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
                                        {/* Name Field */}
                                        <div className="animate-fadeInUp" style={{animationDuration: '0.5s'}}>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-semibold mb-2"
                                                style={{
                                                    color: colors.text.primary,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <div
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300"
                                                    style={{
                                                        color: focusedField === 'name' ? colors.accent.primary : colors.text.tertiary
                                                    }}
                                                >
                                                    <User className="w-5 h-5"/>
                                                </div>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="John Doe"
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none"
                                                    style={{
                                                        backgroundColor: colors.bg.elevated,
                                                        border: `2px solid ${
                                                            errors.name
                                                                ? colors.accent.danger
                                                                : focusedField === 'name'
                                                                    ? colors.accent.primary
                                                                    : colors.border.subtle
                                                        }`,
                                                        color: colors.text.primary,
                                                        fontFamily: "'Inter', sans-serif",
                                                        boxShadow: focusedField === 'name'
                                                            ? `0 0 0 4px ${colors.glow.primary}`
                                                            : 'none'
                                                    }}
                                                />
                                            </div>
                                            {errors.name && (
                                                <div
                                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                                    style={{color: colors.accent.danger}}
                                                >
                                                    <AlertCircle className="w-4 h-4"/>
                                                    <span className="text-sm font-medium" style={{fontFamily: "'Inter', sans-serif"}}>
                                                        {errors.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Email Field */}
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
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="john@university.edu"
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none"
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
                                                    style={{ color: colors.accent.danger }}
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                        {errors.email}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Phone Field */}
                                        <div className="animate-fadeInUp" style={{ animationDuration: '0.5s', animationDelay: '0.2s' }}>
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-semibold mb-2"
                                                style={{
                                                    color: colors.text.primary,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <div
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300"
                                                    style={{
                                                        color: focusedField === 'phone' ? colors.accent.primary : colors.text.tertiary
                                                    }}
                                                >
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('phone')}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="+1 (555) 123-4567"
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none"
                                                    style={{
                                                        backgroundColor: colors.bg.elevated,
                                                        border: `2px solid ${
                                                            errors.phone
                                                                ? colors.accent.danger
                                                                : focusedField === 'phone'
                                                                    ? colors.accent.primary
                                                                    : colors.border.subtle
                                                        }`,
                                                        color: colors.text.primary,
                                                        fontFamily: "'Inter', sans-serif",
                                                        boxShadow: focusedField === 'phone'
                                                            ? `0 0 0 4px ${colors.glow.primary}`
                                                            : 'none'
                                                    }}
                                                />
                                            </div>
                                            {errors.phone && (
                                                <div
                                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                                    style={{ color: colors.accent.danger }}
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                        {errors.phone}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </>




















                                )}

                                {/* Step 2: Security */}
                                {currentStep === 2 && (
                                    <>
                                        {/* Password Field */}
                                        <div className="animate-fadeInUp" style={{ animationDuration: '0.5s' }}>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-semibold mb-2"
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
                                                    <Lock className="w-5 h-5" />
                                                </div>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('password')}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="Create a strong password"
                                                    className="w-full pl-12 pr-12 py-3 rounded-xl transition-all duration-300 outline-none"
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
                                                    style={{ color: colors.text.tertiary }}
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <div
                                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                                    style={{ color: colors.accent.danger }}
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                        {errors.password}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Confirm Password Field */}
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
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('confirmPassword')}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="Re-enter your password"
                                                    className="w-full pl-12 pr-12 py-3 rounded-xl transition-all duration-300 outline-none"
                                                    style={{
                                                        backgroundColor: colors.bg.elevated,
                                                        border: `2px solid ${
                                                            errors.confirmPassword
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
                                            {errors.confirmPassword && (
                                                <div
                                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                                    style={{ color: colors.accent.danger }}
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                        {errors.confirmPassword}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Date of Birth */}
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
                                                    value={formData.dateOfBirth}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('dateOfBirth')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none"
                                                    style={{
                                                        backgroundColor: colors.bg.elevated,
                                                        border: `2px solid ${
                                                            errors.dateOfBirth
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
                                            {errors.dateOfBirth && (
                                                <div
                                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                                    style={{ color: colors.accent.danger }}
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                        {errors.dateOfBirth}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Gender */}
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
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                                                style={{
                                                    backgroundColor: colors.bg.elevated,
                                                    border: `2px solid ${
                                                        errors.gender
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
                                            {errors.gender && (
                                                <div
                                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                                    style={{ color: colors.accent.danger }}
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                        {errors.gender}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Step 3: Additional Info */}
                                {currentStep === 3 && (
                                    <>
                                        {/* Address Field */}
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
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('address')}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="123 Main St, City, State, ZIP"
                                                    rows={3}
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none resize-none"
                                                    style={{
                                                        backgroundColor: colors.bg.elevated,
                                                        border: `2px solid ${
                                                            errors.address
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
                                            {errors.address && (
                                                <div
                                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                                    style={{ color: colors.accent.danger }}
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                        {errors.address}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Profile Image Upload */}
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
                                                    borderColor: errors.profileImage ? colors.accent.danger : colors.border.medium
                                                }}
                                            >
                                                <input
                                                    id="profileImage"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                {imagePreview ? (
                                                    <div className="flex flex-col items-center gap-3">
                                                        <Image
                                                            src={imagePreview}
                                                            alt="Preview"
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
                                            {errors.profileImage && (
                                                <div
                                                    className="flex items-center gap-2 mt-2 animate-fadeIn"
                                                    style={{ color: colors.accent.danger }}
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                        {errors.profileImage}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex gap-4 pt-4">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(prev => prev - 1)}
                                            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                                            style={{
                                                backgroundColor: colors.bg.elevated,
                                                color: colors.text.primary,
                                                border: `2px solid ${colors.border.medium}`,
                                                fontFamily: "'Inter', sans-serif"
                                            }}
                                        >
                                            Back
                                        </button>
                                    )}

                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="group flex-1 py-3 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3"
                                            style={{
                                                backgroundColor: colors.accent.primary,
                                                color: '#ffffff',
                                                fontFamily: "'Inter', sans-serif",
                                                boxShadow: `0 12px 32px ${colors.glow.primary}`
                                            }}
                                        >
                                            Continue
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="group flex-1 py-3 rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                                            style={{
                                                backgroundColor: colors.accent.primary,
                                                color: '#ffffff',
                                                fontFamily: "'Inter', sans-serif",
                                                boxShadow: `0 12px 32px ${colors.glow.primary}`
                                            }}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    Create Account
                                                    <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center mt-6">
                            <p
                                className="text-sm"
                                style={{
                                    color: colors.text.secondary,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                Already have an account?{' '}
                                <a
                                    href="#"
                                    className="font-bold transition-all duration-200 hover:opacity-80"
                                    style={{
                                        color: colors.accent.primary
                                    }}
                                >
                                    Sign In
                                </a>
                            </p>
                        </div>
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