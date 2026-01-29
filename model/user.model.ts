

export interface USER_MODEL {
    name: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    dateOfBirth: string
    gender: string
    address: string
    profileImage?: File | null
}