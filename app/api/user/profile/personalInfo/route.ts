
import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/lib/dbConfig";
import { User } from '@/schema/user.schema'
import jwt from "jsonwebtoken";

await connect();
export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("auth")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
            email: string;
        };

        const user = await User.findOne({ email: decoded.email })
            .select("-passwordHash");


        return NextResponse.json(user);


    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                {
                    error: error.message,
                    message: "Internal Server Error"
                },
                {status: 500}
            )
        }
    }
}


