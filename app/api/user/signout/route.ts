

import {NextRequest, NextResponse} from 'next/server'


export const POST = async (req: NextRequest) => {
    try {


        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Clear auth cookie
        response.cookies.set("auth", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0, // 👈 immediately expires cookie
        });

        return response;

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: "Sign Out Unsuccessful",
                    error: error.message,
                },
                { status: 500 }
            );
        }
    }
}

