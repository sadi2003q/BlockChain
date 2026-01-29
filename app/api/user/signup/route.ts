


import { NextRequest, NextResponse } from 'next/server'
import { connect } from "@/lib/dbConfig";
import { User } from '@/schema/user.schema'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect();


/**
 * Handles HTTP POST requests for user registration.
 *
 * This function performs the following tasks:
 * - Parses the JSON body of the request to extract user details (name, email, phone, password, date of birth, gender, and address).
 * - Checks if a user with the provided email or phone already exists in the database. If a user exists, it returns a 400 response with an error message.
 * - Hashes the provided password using bcryptjs for secure storage.
 * - Creates a new user in the database with the provided details and the hashed password.
 * - Generates a JSON Web Token (JWT) for the newly created user.
 * - Sends a success response containing user details (excluding sensitive information) along with the JWT token set as an HTTP-only cookie.
 * - Handles errors by returning a 500 response with the error message.
 *
 */
export const POST = async (req: NextRequest) => {
    try {

        const body = await req.json();
        const {
            name, email, phone,
            password, dateOfBirth, gender,
            address,
        } = body;

        // Check if a user already exists
        const userExists = await User.findOne({
            $or: [
                { email },
                { phone }
            ]
        });
        if(userExists) {
            return NextResponse.json(
                { error: "Email is already registered" },
                { status: 400 }
            );
        }

        // hash password
        const passwordHash = await bcryptjs.hash(password, 12);

        // Convert string to Date
        const dob = new Date(dateOfBirth);
        if (isNaN(dob.getTime())) {
            return NextResponse.json(
                { error: "Invalid dateOfBirth" },
                { status: 400 }
            );
        }

        // Compute age manually
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        const user = await User.create({
            name,
            email,
            phone,
            passwordHash,
            dateOfBirth: dob,
            age, // ✅ now age is set
            gender,
            address,
        });




        const token = jwt.sign(
            { id: user._id, email: user.email, phone: user.phone },
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json(
            {
                message: "User is Created Successfully",
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            {status: 200}
        )

        response.cookies.set("auth", token, {
            httpOnly: true,
        });

        return response;


    } catch (error) {
        if(error instanceof Error) {
            console.log(error);
            return NextResponse.json(
                {
                    message: "SignUp Unsuccessful!!! Internal Server Error",
                    error: error.message
                },
                { status: 500 }
            );
        }
    }
}

