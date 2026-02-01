"use client"

import React, { useState } from 'react';

import {getColor} from "@/lib/_colors";
import {NavigationBar} from "@/components/landingPage/NavigationBar";
import {FAQ} from "@/components/landingPage/FAQ";
import {SocialProof} from "@/components/landingPage/SocialProof";
import {Benefits} from "@/components/landingPage/Benefits";
import {Problem} from "@/components/landingPage/Problem";
import {HeroSection} from "@/components/landingPage/HeroSection";
import {DifferentiationSection} from "@/components/landingPage/DifferentiationSection";
import {CTA} from "@/components/landingPage/CTA";
import {Footer} from "@/components/landingPage/Footer";
import {layout_style} from "@/lib/style/layout";

export default function VoteSecureLanding() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [visibleSections, setVisibleSections] = useState(new Set());



    // Color system based on dark mode - Bold Charcoal/Crimson/Amber palette for security & authority
    const colors = getColor(isDarkMode);


    const isVisible = (section: string) => visibleSections.has(section);

    return (
        <div
            className="min-h-screen transition-colors duration-500"
            style={{ backgroundColor: colors.bg.primary, color: colors.text.primary }}
        >
            {/* Navigation */}
            <NavigationBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setVisibleSections={setVisibleSections}/>

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
            <style>{layout_style}</style>
        </div>
    );
}