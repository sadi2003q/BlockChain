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
import {USER_MODEL} from "@/model/user.model";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";



export default function VoteSecureSignUp() {

    // =================  STATE VARIABLES =================
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<USER_MODEL>({
        name: 'Adnan Abdullah',
        email: 'Adnan@gmail.com',
        phone: '01999477414',
        password: 'qwywtru455%',
        confirmPassword: 'qwywtru455%',
        dateOfBirth: '',
        gender: 'male' as GenderType,
        address: '',
        profileImage: null as File | null,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [focusedField, setFocusedField] = useState<FocusedField>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const router = useRouter();




    // =================  FUNCTIONS  =================

    /**
     * Returns the Color object based on the current theme mode.
     */
    const colors = getColor(isDarkMode)


    /**
     * Handles the change event for input elements in a form and updates the corresponding form data state.
     *
     * - Updates the form data state by extracting the `name` and `value` from the event's target element.
     * - Clears validation errors for the field being updated if an error exists.
     *
     * @param e - The change event triggered by an HTML input, select, or textarea element.
     */
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    /**
     * Handles the change event for an image file input.
     *
     * This function is triggered when a user selects a file through an input of type `file`. It validates the file size,
     * sets error messages if the file size exceeds the allowed limit, updates the form data with the selected file,
     * and generates a preview of the image using a FileReader.
     *
     * Validation:
     * - Ensures that the selected file's size does not exceed 5MB.
     *
     * Actions:
     * - Updates the state with the selected file.
     * - Generates a base64-encoded string for preview and updates the corresponding state.
     * - Clears any prior error messages related to the profile image.
     *
     * @param {ChangeEvent<HTMLInputElement>} e - The change event triggered by a file input element.
     */
    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
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

    /**
     * Validates the input fields of a multistep form based on the provided step number.
     *
     * @param {number} step - The current step of the form (e.g., 1, 2, or 3).
     * @returns {boolean} - Returns `true` if all validations pass and no errors are found. Otherwise, returns `false`.
     *
     * The function performs validation for each step as follows:
     * - Step 1: Validates `name`, `email`, and `phone` fields for presence, format, and correctness.
     * - Step 2: Validates `password`, `confirmPassword`, `dateOfBirth`, and `gender` fields for presence, format, and logical consistency (e.g., passwords match).
     * - Step 3: Validates the `address` field for presence.
     *
     * Any validation errors encountered during this process are stored in an internal `newErrors` object,
     * which is then set to the state using the `setErrors` function.
     * This provides a means of displaying error messages to the user.
     */
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


    /**
     * Handles the form submission event.
     *
     * This function prevents the default behavior of a form submission and validates
     * the current step before proceeding. If validation fails, the submission process
     * is halted. The function simulates an API call by setting a loading state while
     * asynchronously handling the submission logic.
     *
     * @param {FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateStep(currentStep)) return;

        setIsLoading(true);

        try {

            await axios.post('/api/user/signup', formData)
            router.push('/dashboard')
        } catch (error) {
            toast.error("Error signing up");
        } finally {
            setIsLoading(false);
        }

    };

    /**
     * Represents the progress as a percentage value based on the current step
     * in a process consisting of three steps.
     *
     * This variable calculates the progress by dividing the current step
     * by the total number of steps (3) and multiplying the result by 100.
     * It is used to track and represent how far a user or process has
     * progressed in a predefined sequence of steps.
     *
     * @type {number}
     */
    const progressPercentage: number = (currentStep / 3) * 100;





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