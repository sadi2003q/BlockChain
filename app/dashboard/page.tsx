"use client"

import React, {useState} from 'react';
import {
    Shield,
    Moon,
    Sun,
    Bell,
    User,
    Calendar as CalendarIcon,
    CheckCircle,
    Clock,
    Users,
    Vote,
    BarChart3,
    Settings,
    LogOut,
    ChevronRight,
    AlertCircle,
    Award
} from 'lucide-react';
import {getColor} from "@/lib/_colors";
import {
    CalendarEvent,
    Election,
    ElectionStatus,
    ResultSummary,
    _calendarEvents,
    _elections,
    _recentResults
} from "@/lib/Schema_Lib/dashboard.schema";
import {AnimatedBackground} from "@/components/dashboard/AnimatedBackground";


export default function VoteSecureDashboard() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

    //FIXME: STATE VARIABLE IS NOT INITAILISED
    const [notificationCount, setNotificationCount] = useState<number>(3);
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(_calendarEvents);
    const [elections, setElections] = useState<Election[]>(_elections);
    const [recentResults, setRecentResults] = useState<ResultSummary[]>(_recentResults);


    // Color system matching the landing page
    const colors = getColor(isDarkMode);


    const getStatusColor = (status: ElectionStatus) => {
        switch (status) {
            case 'ONGOING':
                return colors.accent.success;
            case 'UPCOMING':
                return colors.accent.secondary;
            case 'COMPLETED':
                return colors.text.tertiary;
            case 'CANCELLED':
                return colors.accent.danger;
            default:
                return colors.text.tertiary;
        }
    };

    const getStatusIcon = (status: ElectionStatus) => {
        switch (status) {
            case 'ONGOING':
                return <Vote className="w-4 h-4"/>;
            case 'UPCOMING':
                return <Clock className="w-4 h-4"/>;
            case 'COMPLETED':
                return <CheckCircle className="w-4 h-4"/>;
            case 'CANCELLED':
                return <AlertCircle className="w-4 h-4"/>;
            default:
                return <Clock className="w-4 h-4"/>;
        }
    };

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'election':
                return colors.accent.primary;
            case 'deadline':
                return colors.accent.warning;
            case 'result':
                return colors.accent.success;
            default:
                return colors.text.tertiary;
        }
    };

    return (
        <div
            className="min-h-screen transition-colors duration-500 relative overflow-hidden"
            style={{backgroundColor: colors.bg.primary}}
        >
            {/* Animated Background Grid - Faster */}
            <AnimatedBackground isDarkMode={isDarkMode}/>



            {/* Header / Navigation */}
            <header
                className="sticky top-0 z-40 backdrop-blur-2xl border-b transition-all duration-300"
                style={{
                    backgroundColor: isDarkMode ? 'rgba(10, 10, 10, 0.8)' : 'rgba(243, 233, 220, 0.8)',
                    borderColor: colors.border.subtle
                }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300"
                                style={{
                                    backgroundColor: colors.accent.primary,
                                    boxShadow: `0 8px 24px ${colors.glow.primary}`
                                }}
                            >
                                <Shield className="w-6 h-6 text-white"/>
                            </div>
                            <div>
                                <span
                                    className="text-xl font-bold tracking-tight"
                                    style={{
                                        fontFamily: "'Sora', sans-serif",
                                        color: colors.text.primary
                                    }}
                                >
                                    VoteSecure
                                </span>
                                <p
                                    className="text-xs"
                                    style={{
                                        color: colors.text.tertiary,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    Dashboard
                                </p>
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{
                                    backgroundColor: colors.bg.tertiary,
                                    border: `1px solid ${colors.border.subtle}`
                                }}
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5" style={{color: colors.accent.warning}}/>
                                ) : (
                                    <Moon className="w-5 h-5" style={{color: colors.accent.primary}}/>
                                )}
                            </button>

                            {/* Notifications */}
                            <button
                                className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{
                                    backgroundColor: colors.bg.tertiary,
                                    border: `1px solid ${colors.border.subtle}`
                                }}
                            >
                                <Bell className="w-5 h-5" style={{color: colors.text.secondary}}/>
                                {notificationCount > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                                        style={{
                                            backgroundColor: colors.accent.primary,
                                            color: '#ffffff'
                                        }}
                                    >
                                        {notificationCount}
                                    </span>
                                )}
                            </button>

                            {/* Profile */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    style={{
                                        backgroundColor: colors.accent.primary,
                                        boxShadow: `0 4px 16px ${colors.glow.primary}`
                                    }}
                                >
                                    <User className="w-5 h-5 text-white"/>
                                </button>

                                {/* Profile Dropdown */}
                                {showProfileMenu && (
                                    <div
                                        className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl animate-fadeIn overflow-hidden"
                                        style={{
                                            backgroundColor: colors.bg.card,
                                            border: `1px solid ${colors.border.subtle}`
                                        }}
                                    >
                                        <div
                                            className="px-4 py-3 border-b"
                                            style={{borderColor: colors.border.subtle}}
                                        >
                                            <p
                                                className="text-sm font-bold"
                                                style={{
                                                    color: colors.text.primary,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                John Doe
                                            </p>
                                            <p
                                                className="text-xs"
                                                style={{
                                                    color: colors.text.tertiary,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                john@university.edu
                                            </p>
                                        </div>
                                        <div className="py-2">
                                            {[
                                                {
                                                    icon: User, label: 'Profile', action: () => {
                                                    }
                                                },
                                                {
                                                    icon: Settings, label: 'Settings', action: () => {
                                                    }
                                                },
                                                {
                                                    icon: LogOut, label: 'Sign Out', action: () => {
                                                    }
                                                }
                                            ].map((item, i) => (
                                                <button
                                                    key={i}
                                                    onClick={item.action}
                                                    className="w-full px-4 py-2 flex items-center gap-3 transition-colors duration-200"
                                                    style={{
                                                        color: colors.text.secondary,
                                                        fontFamily: "'Inter', sans-serif"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = colors.bg.elevated;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    <item.icon className="w-4 h-4"/>
                                                    <span className="text-sm">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>





















            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 relative z-10">
                {/* Welcome Section */}
                <div className="mb-8 animate-fadeInDown">
                    <h1
                        className="text-3xl lg:text-4xl font-bold mb-2"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            color: colors.text.primary
                        }}
                    >
                        Welcome back, John! 👋
                    </h1>
                    <p
                        className="text-base"
                        style={{
                            color: colors.text.secondary,
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        Here's what's happening with your elections today.
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Left Column - Running/Upcoming Elections (spans 2 columns) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Running/Upcoming Elections Card */}
                        <div
                            className="rounded-2xl p-6 animate-fadeInLeft"
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `1px solid ${colors.border.subtle}`,
                                boxShadow: `0 4px 16px ${colors.glow.primary}`
                            }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2
                                    className="text-2xl font-bold"
                                    style={{
                                        fontFamily: "'Sora', sans-serif",
                                        color: colors.text.primary
                                    }}
                                >
                                    Running/Upcoming Elections
                                </h2>
                                <button
                                    className="text-sm font-semibold flex items-center gap-1 transition-all duration-200 hover:gap-2"
                                    style={{
                                        color: colors.accent.primary,
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    View All
                                    <ChevronRight className="w-4 h-4"/>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {elections.map((election, index) => (
                                    <div
                                        key={election.id}
                                        className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                                        style={{
                                            backgroundColor: colors.bg.elevated,
                                            border: `1px solid ${colors.border.subtle}`,
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3
                                                        className="text-lg font-bold group-hover:text-opacity-80 transition-all"
                                                        style={{
                                                            fontFamily: "'Sora', sans-serif",
                                                            color: colors.text.primary
                                                        }}
                                                    >
                                                        {election.title}
                                                    </h3>
                                                </div>
                                                <p
                                                    className="text-sm mb-3"
                                                    style={{
                                                        color: colors.text.secondary,
                                                        fontFamily: "'Inter', sans-serif"
                                                    }}
                                                >
                                                    {election.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs">
                                                    <span
                                                        className="flex items-center gap-1"
                                                        style={{
                                                            color: colors.text.tertiary,
                                                            fontFamily: "'Inter', sans-serif"
                                                        }}
                                                    >
                                                        <CalendarIcon className="w-3 h-3"/>
                                                        {election.startDate.toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })} - {election.endDate.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                    </span>
                                                    <span
                                                        className="flex items-center gap-1"
                                                        style={{
                                                            color: colors.text.tertiary,
                                                            fontFamily: "'Inter', sans-serif"
                                                        }}
                                                    >
                                                        <Users className="w-3 h-3"/>
                                                        {election.totalVoters} eligible voters
                                                    </span>
                                                </div>
                                            </div>

                                            <div
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
                                                style={{
                                                    backgroundColor: `${getStatusColor(election.status)}20`,
                                                    color: getStatusColor(election.status),
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                {getStatusIcon(election.status)}
                                                {election.status === 'ONGOING' ? 'Running' : election.status.charAt(0) + election.status.slice(1).toLowerCase()}
                                            </div>
                                        </div>

                                        {election.status === 'ONGOING' && (
                                            <>
                                                {/* Progress Bar */}
                                                <div className="mb-3">
                                                    <div className="flex justify-between text-xs mb-2">
                                                        <span
                                                            style={{
                                                                color: colors.text.tertiary,
                                                                fontFamily: "'Inter', sans-serif"
                                                            }}
                                                        >
                                                            Voter Turnout
                                                        </span>
                                                        <span
                                                            className="font-bold"
                                                            style={{
                                                                color: colors.text.primary,
                                                                fontFamily: "'Inter', sans-serif"
                                                            }}
                                                        >
                                                            {Math.round((election.totalVotesCast / election.totalVoters) * 100)}%
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="h-2 rounded-full overflow-hidden"
                                                        style={{backgroundColor: colors.bg.tertiary}}
                                                    >
                                                        <div
                                                            className="h-full transition-all duration-500"
                                                            style={{
                                                                width: `${(election.totalVotesCast / election.totalVoters) * 100}%`,
                                                                backgroundColor: colors.accent.success
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                                                    style={{
                                                        backgroundColor: colors.accent.primary,
                                                        color: '#ffffff',
                                                        fontFamily: "'Inter', sans-serif"
                                                    }}
                                                >
                                                    Vote Now
                                                </button>
                                            </>
                                        )}

                                        {election.status === 'UPCOMING' && (
                                            <button
                                                className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                                                style={{
                                                    backgroundColor: colors.bg.tertiary,
                                                    color: colors.text.primary,
                                                    border: `1px solid ${colors.border.medium}`,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                View Details
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Calendar & Results */}
                    <div className="space-y-6">

                        {/* Calendar Card */}
                        <div
                            className="rounded-2xl p-6 animate-fadeInRight"
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `1px solid ${colors.border.subtle}`,
                                boxShadow: `0 4px 16px ${colors.glow.secondary}`,
                                animationDelay: '100ms'
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{
                                        backgroundColor: colors.accent.secondary,
                                        boxShadow: `0 4px 16px ${colors.glow.secondary}`
                                    }}
                                >
                                    <CalendarIcon className="w-5 h-5 text-white"/>
                                </div>
                                <h2
                                    className="text-xl font-bold"
                                    style={{
                                        fontFamily: "'Sora', sans-serif",
                                        color: colors.text.primary
                                    }}
                                >
                                    Calendar
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {calendarEvents.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                                        style={{
                                            backgroundColor: colors.bg.elevated,
                                            border: `1px solid ${colors.border.subtle}`,
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    backgroundColor: `${getEventTypeColor(event.type)}20`,
                                                    border: `2px solid ${getEventTypeColor(event.type)}30`
                                                }}
                                            >
                                                <div
                                                    className="w-2 h-2 rounded-full"
                                                    style={{backgroundColor: getEventTypeColor(event.type)}}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3
                                                    className="text-sm font-bold mb-1"
                                                    style={{
                                                        fontFamily: "'Sora', sans-serif",
                                                        color: colors.text.primary
                                                    }}
                                                >
                                                    {event.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span
                                                        className="font-semibold"
                                                        style={{
                                                            color: colors.text.secondary,
                                                            fontFamily: "'Inter', sans-serif"
                                                        }}
                                                    >
                                                        {event.date.toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: colors.text.tertiary,
                                                            fontFamily: "'Inter', sans-serif"
                                                        }}
                                                    >
                                                        •
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: colors.text.tertiary,
                                                            fontFamily: "'Inter', sans-serif"
                                                        }}
                                                    >
                                                        {event.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Results Card */}
                        <div
                            className="rounded-2xl p-6 animate-fadeInRight"
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `1px solid ${colors.border.subtle}`,
                                boxShadow: `0 4px 16px ${colors.glow.primary}`,
                                animationDelay: '200ms'
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{
                                        backgroundColor: colors.accent.success,
                                        boxShadow: `0 4px 16px rgba(34, 197, 94, 0.3)`
                                    }}
                                >
                                    <BarChart3 className="w-5 h-5 text-white"/>
                                </div>
                                <h2
                                    className="text-xl font-bold"
                                    style={{
                                        fontFamily: "'Sora', sans-serif",
                                        color: colors.text.primary
                                    }}
                                >
                                    Results
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {recentResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                                        style={{
                                            backgroundColor: colors.bg.elevated,
                                            border: `1px solid ${colors.border.subtle}`,
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    backgroundColor: `${colors.accent.success}20`
                                                }}
                                            >
                                                <Award className="w-4 h-4" style={{color: colors.accent.success}}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3
                                                    className="text-sm font-bold mb-1"
                                                    style={{
                                                        fontFamily: "'Sora', sans-serif",
                                                        color: colors.text.primary
                                                    }}
                                                >
                                                    {result.electionTitle}
                                                </h3>
                                                <p
                                                    className="text-xs mb-2"
                                                    style={{
                                                        color: colors.text.tertiary,
                                                        fontFamily: "'Inter', sans-serif"
                                                    }}
                                                >
                                                    {result.publishedAt.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className="p-3 rounded-lg mb-2"
                                            style={{
                                                backgroundColor: colors.bg.tertiary,
                                                border: `1px solid ${colors.border.subtle}`
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{
                                                        color: colors.text.primary,
                                                        fontFamily: "'Inter', sans-serif"
                                                    }}
                                                >
                                                    Winner: {result.winner}
                                                </span>
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{
                                                        color: colors.accent.success,
                                                        fontFamily: "'Inter', sans-serif"
                                                    }}
                                                >
                                                    {result.winPercentage}%
                                                </span>
                                            </div>
                                            <div
                                                className="h-1.5 rounded-full overflow-hidden"
                                                style={{backgroundColor: colors.bg.secondary}}
                                            >
                                                <div
                                                    className="h-full transition-all duration-500"
                                                    style={{
                                                        width: `${result.winPercentage}%`,
                                                        backgroundColor: colors.accent.success
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <span
                                                style={{
                                                    color: colors.text.tertiary,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                Total Votes: {result.totalVotes}
                                            </span>
                                            <button
                                                className="font-semibold flex items-center gap-1 transition-all duration-200 hover:gap-2"
                                                style={{
                                                    color: colors.accent.primary,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                View Details
                                                <ChevronRight className="w-3 h-3"/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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
                
                .animate-fadeInDown {
                    animation: fadeInDown 0.6s ease-out forwards;
                }
                
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.7s ease-out forwards;
                }
                
                .animate-fadeInRight {
                    animation: fadeInRight 0.7s ease-out forwards;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                
                * {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}