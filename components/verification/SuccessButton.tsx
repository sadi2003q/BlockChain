import {ArrowLeft} from "lucide-react";
import React from "react";
import {_colorType} from "@/lib/_colors";
import {useRouter} from "next/navigation";


type ISuccessButton = {
    colors: _colorType;
}

export const SuccessButton:React.FC<ISuccessButton> = (
    {colors}
) => {

    const router = useRouter();
    const navigateToHome = () => router.push('/dashboard');

    return (
        <button
            onClick={navigateToHome}
            className="flex items-center gap-2 mb-6 transition-all duration-300 hover:gap-3 group"
            style={{
                color: colors.text.secondary,
                fontFamily: "'Inter', sans-serif"
            }}
        >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-sm font-semibold">Back to Home</span>
        </button>
    );
}