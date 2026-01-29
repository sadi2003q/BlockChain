

export interface ValidationErrors {
    email?: string;
    password?: string;
}

export type FocusedField = 'email' | 'password' | null;
