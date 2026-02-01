import React from "react";
import {_colorType} from "@/lib/_colors";

type IState_Idle = {
    colors: _colorType
}


export const State_Idle = (
    {colors}: IState_Idle,
) => {
    return (
        <div className="text-center mt-6">
            <a
                href="/profile"
                className="text-sm font-semibold transition-all duration-300 hover:opacity-80"
                style={{
                    color: colors.text.secondary,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                ← back
            </a>
        </div>
    );
}