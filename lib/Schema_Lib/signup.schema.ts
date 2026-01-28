


export interface ValidationErrors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: string;
    profileImage?: string;
}

export type FocusedField = 'name' | 'email' | 'phone' | 'password' | 'confirmPassword' | 'dateOfBirth' | 'address' | null;

export type GenderType = 'male' | 'female' | 'other' | '';