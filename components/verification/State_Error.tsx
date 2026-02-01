import React from "react";
import {_colorType} from "@/lib/_colors";



type IState_Error = {
    colors: _colorType
    handleTryAgain: () => void;
}

export const State_Error = (
    {colors, handleTryAgain}: IState_Error,
) => {
    return (
        <div className="text-center mt-6">
            <button
                onClick={handleTryAgain}
                className="text-sm font-semibold transition-all duration-300 hover:opacity-80"
                style={{
                    color: colors.accent.primary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                Clear and try again
            </button>
        </div>
    );
}