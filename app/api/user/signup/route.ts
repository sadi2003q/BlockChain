


import { NextRequest, NextResponse } from 'next/server'
import { connect } from "@/lib/dbConfig";
import { User } from '@/schema/user.schema'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect();

export const POST = async (req: NextRequest) => {
    try {

        const body = req.body;
        console.log("Request from the Body: ", body)
        return NextResponse.json(
            {
                message: "Success"
            },
            {status: 200}
        )

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
    }
}

