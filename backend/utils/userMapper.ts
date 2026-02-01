

// backend/utils/userMapper.ts
import { UserDTO } from "../types/user.dto";

export function toUserDTO(user: any): UserDTO {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone ?? "",
        gender: user.gender,
        dateOfBirth: user.dateOfBirth.toISOString(),
        age: user.age,
        address: user.address,
        profileImage: user.profileImage || "",
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        createdAt: user.createdAt,
    };
}
