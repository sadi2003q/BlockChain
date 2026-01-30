import React from 'react';
import { TabItem } from '@/lib/Schema_Lib/profile.schema';
import {_colorType} from "@/lib/_colors";

interface ProfileTabsProps {
    tabs: TabItem[];
    activeTab: string;
    setActiveTab: (tabId: string) => void;
    colors: _colorType;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
    tabs,
    activeTab,
    setActiveTab,
    colors
}) => {
    return (
        <div
            className="flex gap-2 mb-4 sm:mb-8 p-1.5 sm:p-2 rounded-xl overflow-x-auto"
            style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.border.subtle}`
            }}
        >
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap"
                    style={{
                        backgroundColor: activeTab === tab.id ? colors.accent.primary : 'transparent',
                        color: activeTab === tab.id ? '#ffffff' : colors.text.secondary,
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: activeTab === tab.id ? `0 8px 24px ${colors.glow.primary}` : 'none'
                    }}
                >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.id === 'profile' ? 'Profile' : 'Eligibility'}</span>
                </button>
            ))}
        </div>
    );
};