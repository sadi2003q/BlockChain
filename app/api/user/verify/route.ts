import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import {Resend} from "resend";
import {_EmailTemplate} from "@/components/verification/EmailComponent";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async ( req: NextRequest) => {
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
            name: string;
        };

        const opt = await req.json();





        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [decoded.email],
            subject: 'Hello world',
            react: _EmailTemplate({ name: decoded.name, otp: opt }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);





    } catch (error) {
        if(error instanceof Error) {
            console.log(error);
            return NextResponse.json(
                {
                    message: "Email Send Unsuccessful!!! Internal Server Error",
                    error: error.message
                },
                { status: 500 }
            );
        }
    }
}
