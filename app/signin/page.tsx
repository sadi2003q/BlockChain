/**
 * VoteSecure Sign-In Page
 * 
 * Client-side authentication page for the VoteSecure voting application.
 * Handles user login with email and password validation, form submission,
 * and theme toggling between dark and light modes.
 * 
 * Features:
 * - Email and password validation with error messaging
 * - Password visibility toggle
 * - Dark/Light theme support with persistent state
 * - Loading state during API request
 * - Toast notifications for error feedback
 * - Animated UI transitions
 * - Responsive design for all screen sizes
 * - Security badge and sign-up link
 * 
 * Flow:
 * 1. User enters email and password
 * 2. Client-side validation is performed
 * 3. Credentials are sent to the API endpoint
 * 4. On success: User is redirected to the dashboard
 * 5. On error: Error toast is displayed and the form remains active
 */

"use client"

import React, {useState, FormEvent, JSX} from 'react';
import {getColor} from "@/lib/_colors";
import {ThemeToggleButton} from "@/components/signin/ThemeToggleButton";
import {AnimatedGrid} from "@/components/signin/AnimatedGrid";
import {Header} from "@/components/signin/Header";
import {Form} from "@/components/signin/Form"
import {Security} from "@/components/signin/Security";
import {ForewordLink} from "@/components/signin/ForewordLink";
import axios from "axios";
import {useRouter} from "next/navigation";
import {NextResponse} from "next/server";
import toast from "react-hot-toast";
import {ValidationErrors, FocusedField} from "@/lib/Schema_Lib/signup.schema";

/**
 * VoteSecureSignIn Component
 * 
 * The main sign-in page part that manages the complete authentication flow.
 * Handles from state, validation, API communication, and UI presentation.
 * 
 * @component
 * @returns {JSX.Element} The complete sign-in page with all components and styling
 */
export default function VoteSecureSignIn(): JSX.Element {

    // ==================== STATE VARIABLES ====================
    
    /** Tracks whether the application is in dark mode or light mode */
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    
    /** Stores the email input value from the user */
    const [email, setEmail] = useState<string>('Adnan@gmail.com');
    
    /** Stores the password input value from the user */
    const [password, setPassword] = useState<string>('123456789');
    
    /** Controls the visibility of the password field (masked or visible) */
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    /** Indicates whether the login request is currently being processed */
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    /** Stores validation error messages for each form field */
    const [errors, setErrors] = useState<ValidationErrors>({});
    
    /** Tracks which form field currently has keyboard focus for styling */
    const [focusedField, setFocusedField] = useState<FocusedField>(null);
    
    /** Next.js router instance for navigation after successful authentication */
    const router = useRouter();


    // ==================== UTILITY FUNCTIONS ====================
    
    /**
     * Color scheme object retrieved from the utility function
     * Provides theme-aware colors for all UI components based on isDarkMode state
     * Updates dynamically when isDarkMode changes
     */
    const colors = getColor(isDarkMode);


    /**
     * Performs client-side validation on email and password fields
     * 
     * Validates:
     * - Email field is not empty
     * - Password field is not empty
     * - Email format matches a valid email pattern (basic regex validation)
     * 
     * Sets the error state if validation fails and stops the loading state.
     * Should be called before making an API request.
     * 
     * @returns {void}
     */
    const basicValidation = (): void => {
        const newErrors: ValidationErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }
    }

    /**
     * Handles the sign-in form submission
     * 
     * Process:
     * 1. Prevents default form submission behavior
     * 2. Clears any previous validation errors
     * 3. Sets loading state to true
     * 4. Performs client-side validation
     * 5. Sends POST request with email and password to authentication API
     * 6. On success: Redirects user to /dashboard
     * 7. On error: Displays error toast notification
     * 8. Finally: Sets loading state to false
     * 
     * @param {FormEvent<HTMLFormElement>} e - The form submission event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        basicValidation()

        try {
            const user = {
                email: email,
                password: password,
            }

            await axios.post("api/user/signin", user)
            router.push("/dashboard")
        } catch (error) {
            if(error instanceof NextResponse) {
                console.error(error.body)
            }
            toast.error("Invalid Credentials")
        } finally {
            setIsLoading(false);
        }
    };





    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden"
            style={{ backgroundColor: colors.bg.primary }}
        >
            {/* ==================== THEME TOGGLE BUTTON ==================== */}
            {/* 
             * Dark/Light mode toggle button positioned in the top-right corner
             * Allows users to switch between dark and light themes
             * Updates isDarkMode state which affects all UI colors
             */}
            <ThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

            {/* ==================== ANIMATED BACKGROUND ==================== */}
            {/* 
             * Decorative animated grid background for visual appeal
             * Creates a moving grid pattern effect in the background
             * Dynamically updates based on theme mode
             */}
            <AnimatedGrid isDarkMode={isDarkMode}/>


            {/* ==================== SIGN-IN CARD CONTAINER ==================== */}
            {/* 
             * Main card wrapper containing all sign-in form elements
             * Max width of 28rem (448px) for optimal form layout
             * Positioned with relative z-index and fade-in animation
             */}
            <div
                className="w-full max-w-md relative z-10 animate-fadeInUp"
                style={{ animationDelay: '100ms' }}
            >
                {/* ==================== LOGO HEADER ==================== */}
                {/* 
                 * Application logo and header component
                 * Displayed at the top of the sign-in card
                 * Updates styling based on the dark/light theme
                 */}
                <Header isDarkMode={isDarkMode}/>

                {/* ==================== SIGN-IN CARD ====================*/}
                {/* 
                 * Main card container with glassmorphism design
                 * Features:
                 * - Backdrop blur for frosted glass effect
                 * - Subtle glow shadow effect
                 * - Theme-aware background color and border
                 * - Fade-in animation with staggered timing
                 */}
                <div
                    className="p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden animate-fadeInUp"
                    style={{
                        backgroundColor: colors.bg.card,
                        border: `1px solid ${colors.border.subtle}`,
                        boxShadow: `0 24px 48px ${colors.glow.primary}`,
                        animationDelay: '200ms'
                    }}
                >
                    {/* 
                     * Decorative glow effect overlaid on top-right of card
                     * Creates subtle ambient lighting effect
                     * Opacity set to 20% for understated appearance
                     */}
                    <div
                        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                        style={{ background: colors.accent.primary }}
                    />

                    {/* ==================== SIGN-IN FORM ==================== */}
                    {/* 
                     * Main authentication form component
                     * Handles email and password input
                     * Manages form state, validation errors, loading state, and field focus
                     * Includes password visibility toggle
                     */}
                    <Form
                        isDarkMode={isDarkMode} 
                        handleSubmit={handleSubmit}
                        focusedField={focusedField} 
                        setFocusedField={setFocusedField}
                        password={password} 
                        setPassword={setPassword}
                        showPassword={showPassword} 
                        setShowPassword={setShowPassword}
                        email={email} 
                        setEmail={setEmail}
                        errors={errors} 
                        isLoading={isLoading}
                    />

                </div>

                {/* ==================== SIGN-UP LINK ==================== */}
                {/* 
                 * Foreword/footer link for new users
                 * Provides navigation to the sign-up page
                 * Text: "Don't have an account? Sign up"
                 */}
                <ForewordLink isDarkMode={isDarkMode}/>

                {/* ==================== SECURITY BADGE ==================== */}
                {/* 
                 * Security assurance badge at bottom of form
                 * Displays security information or SSL certificate badge
                 * Builds user trust and confidence in the application
                 */}
                <Security isDarkMode={isDarkMode}/>
            </div>

            {/* ==================== GLOBAL STYLES AND ANIMATIONS ==================== */}
            {/* 
             * CSS module containing:
             * - Google Font imports (Sora and Inter typefaces)
             * - Keyframe animations (fadeInDown, fadeInUp, fadeIn, gridMoveFast)
             * - Animation class utilities for element transitions
             * - Global input and scroll behavior styling
             */}
            <style>{`
                /* ==================== FONT IMPORTS ==================== */
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                
                /* ==================== FADE ANIMATIONS ==================== */
                
                /* Fade In animation with downward slide effect */
                /* Used for elements that should appear from the top */
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Fade In animation with upward slide effect */
                /* Used for elements that should appear from the bottom */
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
                
                /* Simple fade in animation */
                /* Used for opacity-only transitions */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                /* Grid background animation effect */
                /* Creates a moving grid pattern in the background */
                @keyframes gridMoveFast {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(48px, 48px);
                    }
                }
                
                /* ==================== ANIMATION CLASS UTILITIES ==================== */
                
                /* Applies fadeInDown animation to elements */
                .animate-fadeInDown {
                    animation: fadeInDown 0.5s ease-out forwards;
                }
                
                /* Applies fadeInUp animation to elements */
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                
                /* Applies fadeIn animation to elements */
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                
                /* ==================== GLOBAL BEHAVIORS ==================== */
                
                /* Enable smooth scrolling across the entire page */
                * {
                    scroll-behavior: smooth;
                }
                
                /* Input placeholder styling - shows at normal opacity */
                input::placeholder {
                    opacity: 0.5;
                }
                
                /* Input placeholder styling - dims when input is focused */
                input:focus::placeholder {
                    opacity: 0.3;
                }
            `}</style>
        </div>
    );
}