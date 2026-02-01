

export enum USER_GENDER {
    Male = "male",
    Female = "female",
    Other = "other",
}



export interface USER_MODEL_SIGNUP {
    name: string
    gender: USER_GENDER
    email: string,
    phone: string,
    dateOfBirth: string,
    address: string,
    profileImage: File | null,
    isVerified: boolean
    password: string
    confirmPassword: string
}