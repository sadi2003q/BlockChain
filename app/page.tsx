"use client"

import React, { useState, useEffect } from 'react';
import { Shield, Zap, Key, Clock, Users, Lock, CheckCircle, Eye, Database, ArrowRight, Moon, Sun, Play } from 'lucide-react';
import {getColor} from "@/lib/_colors";
import {NavigationBar} from "@/components/NavigationBar";
import {FAQ} from "@/components/FAQ";
import {SocialProof} from "@/components/SocialProof";
import {Benefits} from "@/components/Benefits";
import {Problem} from "@/components/Problem";
import {HeroSection} from "@/components/HeroSection";
import {DifferentiationSection} from "@/components/DifferentiationSection";
import {CTA} from "@/components/CTA";
import {Footer} from "@/components/Footer";

export default function VoteSecureLanding() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [visibleSections, setVisibleSections] = useState(new Set());

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Intersection observer for scroll animations
            const sections = document.querySelectorAll('[data-animate]');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    setVisibleSections(prev => new Set([...prev, section.dataset.animate]));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Color system based on dark mode - Bold Charcoal/Crimson/Amber palette for security & authority
    const colors = getColor(isDarkMode);


    const isVisible = (section) => visibleSections.has(section);

    return (
        <div
            className="min-h-screen transition-colors duration-500"
            style={{ backgroundColor: colors.bg.primary, color: colors.text.primary }}
        >
            {/* Navigation */}
            <NavigationBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

            {/* Hero Section */}
            <HeroSection isDarkMode={isDarkMode}/>

            {/* Problem / Agitation Section */}
            <Problem isVisible={isVisible} isDarkMode={isDarkMode}/>






            {/* Solution / Benefits Section */}
            <Benefits isDarkMode={isDarkMode} isVisible={isVisible}/>






            {/* Social Proof Section */}
            <SocialProof isDarkMode={isDarkMode} isVisible={isVisible}/>






            {/* Differentiation Section */}
            <DifferentiationSection isDarkMode={isDarkMode} isVisible={isVisible}/>

            {/* FAQ Section */}
            <FAQ isDarkMode={isDarkMode} isVisible={isVisible}/>

            {/* Final CTA Section */}
            <CTA isVisible={isVisible} isDarkMode={isDarkMode}/>

            {/* Footer */}
            <Footer isDarkMode={isDarkMode}/>

            {/* CSS Animations */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
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
        
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(64px, 64px);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        * {
          scroll-behavior: smooth;
        }
      `}</style>
        </div>
    );
}