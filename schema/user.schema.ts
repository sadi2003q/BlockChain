import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            unique: true,
            sparse: true, // allows multiple null values
        },
        passwordHash: {
            type: String,
            required: [true, "Password hash is required"],
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        address: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationStatus: {
            type: String,
            enum: ["pending", "verified", "rejected"],
            default: "pending",
        },
        profileImage: {
            type: String, // URL
            required: false,
            default: "",
        },
        verifiedAt: {
            type: Date,
            default: null,
            required: false,
        },

    },
    { timestamps: true }
);


/**
 * Derive age from dateOfBirth automatically
 */
UserSchema.pre("save", function () {
    if (this.dateOfBirth) {
        const birthDate = new Date(this.dateOfBirth);
        if (isNaN(birthDate.getTime())) {
            throw new Error("Invalid dateOfBirth");
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        this.age = age;
    }
});

export const User =
    mongoose.models.User
    || mongoose.model("User", UserSchema);