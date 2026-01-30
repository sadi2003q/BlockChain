import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
    colors: {
        text: {
            primary: string;
            secondary: string;
        };
    };
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, colors }) => {
    return (
        <div className="mb-4 sm:mb-6">
            <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3"
                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
            >
                {title}
            </h1>
            <p
                className="text-sm sm:text-base"
                style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
            >
                {description}
            </p>
        </div>
    );
};