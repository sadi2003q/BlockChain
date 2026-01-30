

export type _colorType= {
    bg: {
        primary: string
        secondary: string
        tertiary: string
        card: string
        elevated: string
    }
    text: {
        primary: string
        secondary: string
        tertiary: string
        muted: string
    }
    accent: {
        primary: string
        secondary: string
        success: string
        warning: string
        danger: string
    }
    border: {
        subtle: string,
        medium: string
        strong: string
    },

    glow: {
        primary: string,
        secondary: string,
    },
}


export const getColor = (isDarkMode: boolean): _colorType => ({
    bg: {
        primary: isDarkMode ? '#0a0a0a' : '#f3e9dc',
        secondary: isDarkMode ? '#141414' : '#ede3d6',
        tertiary: isDarkMode ? '#1e1e1e' : '#e7ddd0',
        card: isDarkMode ? '#1a1a1a' : '#f9f0e3',
        elevated: isDarkMode ? '#242424' : '#fdf5e8',
    },

    text: {
        primary: isDarkMode ? '#ffffff' : '#1a1a1a',
        secondary: isDarkMode ? '#d4d4d4' : '#4a4a4a',
        tertiary: isDarkMode ? '#a3a3a3' : '#6a6a6a',
        muted: isDarkMode ? '#737373' : '#8a8a8a',
    },

    accent: {
        primary: isDarkMode ? '#dc2626' : '#780116',
        secondary: isDarkMode ? '#f59e0b' : '#2563eb',
        success: isDarkMode ? '#22c55e' : '#16a34a',
        warning: isDarkMode ? '#f59e0b' : '#d97706',
        danger: isDarkMode ? '#ef4444' : '#780116',
    },

    border: {
        subtle: isDarkMode ? '#262626' : '#d4c9bd',
        medium: isDarkMode ? '#404040' : '#c4b9ad',
        strong: isDarkMode ? '#525252' : '#b4a99d',
    },

    glow: {
        primary: isDarkMode
            ? 'rgba(220, 38, 38, 0.25)'
            : 'rgba(120, 1, 22, 0.15)',
        secondary: isDarkMode
            ? 'rgba(245, 158, 11, 0.2)'
            : 'rgba(37, 99, 235, 0.08)',
    },
});