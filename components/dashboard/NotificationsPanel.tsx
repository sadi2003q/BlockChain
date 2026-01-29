"use client"

import React from 'react';
import { getColor } from '@/lib/_colors';
import { Bell, Info, CheckCircle, AlertTriangle, Vote, X, Check } from 'lucide-react';
import { Notification } from '@/app/dashboard/page';

interface NotificationsPanelProps {
    isDarkMode: boolean;
    notifications: Notification[];
    onMarkAsRead: (id: number) => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
    isDarkMode,
    notifications,
    onMarkAsRead
}) => {
    const colors = getColor(isDarkMode);

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return { icon: CheckCircle, color: '#22c55e', bgColor: '#22c55e20' };
            case 'warning':
                return { icon: AlertTriangle, color: '#f59e0b', bgColor: '#f59e0b20' };
            case 'election':
                return { icon: Vote, color: colors.accent.primary, bgColor: `${colors.accent.primary}20` };
            default:
                return { icon: Info, color: '#3b82f6', bgColor: '#3b82f620' };
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div
            className="p-5 sm:p-6 rounded-2xl border backdrop-blur-sm"
            style={{
                backgroundColor: colors.bg.card,
                borderColor: colors.border.subtle
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3
                    className="text-lg font-bold flex items-center gap-2"
                    style={{ color: colors.text.primary, fontFamily: "'Sora', sans-serif" }}
                >
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: '#ef444420' }}
                    >
                        <Bell className="w-4 h-4" style={{ color: '#ef4444' }} />
                    </div>
                    Notifications
                </h3>
                {unreadCount > 0 && (
                    <span
                        className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: '#ef4444' }}
                    >
                        {unreadCount} New
                    </span>
                )}
            </div>

            {/* Notifications List */}
            <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-custom">
                {notifications.length === 0 ? (
                    <div className="text-center py-6">
                        <Bell className="w-10 h-10 mx-auto mb-2" style={{ color: colors.text.muted }} />
                        <p style={{ color: colors.text.muted }}>No notifications</p>
                    </div>
                ) : (
                    notifications.map((notification) => {
                        const { icon: Icon, color, bgColor } = getNotificationIcon(notification.type);
                        
                        return (
                            <div
                                key={notification.id}
                                className={`p-3 rounded-xl border transition-all duration-300 ${!notification.isRead ? 'hover:scale-[1.01]' : ''}`}
                                style={{
                                    backgroundColor: notification.isRead ? `${colors.bg.secondary}40` : `${colors.bg.secondary}80`,
                                    borderColor: notification.isRead ? colors.border.subtle : color,
                                    borderLeftWidth: notification.isRead ? '1px' : '3px'
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: bgColor }}
                                    >
                                        <Icon className="w-4 h-4" style={{ color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4
                                                className={`text-sm font-semibold truncate ${notification.isRead ? 'opacity-70' : ''}`}
                                                style={{ color: colors.text.primary }}
                                            >
                                                {notification.title}
                                            </h4>
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => onMarkAsRead(notification.id)}
                                                    className="p-1 rounded hover:opacity-70 transition-opacity shrink-0"
                                                    title="Mark as read"
                                                >
                                                    <Check className="w-3.5 h-3.5" style={{ color }} />
                                                </button>
                                            )}
                                        </div>
                                        <p
                                            className={`text-xs mt-0.5 line-clamp-2 ${notification.isRead ? 'opacity-60' : ''}`}
                                            style={{ color: colors.text.secondary }}
                                        >
                                            {notification.message}
                                        </p>
                                        <p
                                            className="text-xs mt-1 opacity-50"
                                            style={{ color: colors.text.muted }}
                                        >
                                            {notification.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* View All Button */}
            {notifications.length > 0 && (
                <button
                    className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
                    style={{
                        backgroundColor: `${colors.accent.primary}10`,
                        color: colors.accent.primary
                    }}
                >
                    View All Notifications
                </button>
            )}
        </div>
    );
};
