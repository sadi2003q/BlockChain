// components/Settings/LogoutConfirmModal.tsx

import React from "react";
import {LogOut} from "lucide-react";
import {getColor} from "@/lib/_colors";

interface LogoutConfirmModalProps {
    isDarkMode: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const LogoutConfirmationModal = ({
                                            isDarkMode,
                                            onCancel,
                                            onConfirm,
                                        }: LogoutConfirmModalProps) => {
    const colors = getColor(isDarkMode);

    return (
        <div
            className="
                fixed inset-0 z-50 flex items-center justify-center p-4
                bg-black/30
                backdrop-blur-lg
                backdrop-saturate-150
            "
        >
            {/* Card */}
            <div
                className="max-w-md w-full rounded-2xl shadow-2xl border p-8"
                style={{
                    backgroundColor: colors.bg.card,
                    borderColor: colors.border.subtle,
                }}
            >
                {/* Icon */}
                <div className="text-center mb-6">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                        style={{
                            backgroundColor: colors.accent.warning,
                            boxShadow: colors.glow.primary,
                        }}
                    >
                        <LogOut className="w-8 h-8 text-white"/>
                    </div>

                    <h3
                        className="text-2xl font-bold mb-2"
                        style={{color: colors.text.primary}}
                    >
                        Log out?
                    </h3>

                    <p style={{color: colors.text.secondary}}>
                        You’ll be signed out of your account. You can log back in anytime.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    {/* Cancel */}
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                        style={{
                            backgroundColor: colors.bg.secondary,
                            color: colors.text.primary,
                            border: `1px solid ${colors.border.subtle}`,
                        }}
                    >
                        Cancel
                    </button>

                    {/* Logout */}
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]"
                        style={{
                            backgroundColor: colors.accent.warning,
                            boxShadow: colors.glow.secondary,
                        }}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};
