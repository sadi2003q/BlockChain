


export const profile_style = `
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
            `