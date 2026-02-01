

// backend/types/user.dto.ts

import {USER_GENDER} from "@/model/user.model";

export interface UserDTO {
    id: string;              // mapped from _id
    name: string;
    email: string;
    phone?: string;
    gender?: USER_GENDER;
    dateOfBirth: string;     // ISO string
    age: number;
    address: string;
    profileImage: string | File | null;    // URL only
    isVerified: boolean;
    verificationStatus: "pending" | "verified" | "rejected";
    createdAt: Date;
}
