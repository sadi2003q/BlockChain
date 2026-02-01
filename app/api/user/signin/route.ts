import { NextRequest, NextResponse } from "next/server";
import { User } from "@/schema/user.schema";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {connect} from "@/lib/dbConfig";


await connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // 1️⃣ Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Email or Password is incorrect..." },
                { status: 400 }
            );
        }

        // 2️⃣ Compare password
        const validPassword = await bcryptjs.compare(
            password,
            user.passwordHash
        );

        if (!validPassword) {
            return NextResponse.json(
                { error: "Email or Password is incorrect..." },
                { status: 400 }
            );
        }

        // 3️⃣ Token payload (ONLY safe fields)
        const tokenData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone
        };

        // 4️⃣ Create token
        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        );

        // 5️⃣ Set cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", // Important!
            maxAge: 60 * 60 * 24 , // 1 day
            path: "/",
        });

        return response;

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: "SignIn Unsuccessful",
                    error: error.message,
                },
                { status: 500 }
            );
        }
    }
}
