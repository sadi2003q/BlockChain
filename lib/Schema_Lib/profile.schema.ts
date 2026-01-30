// Enums from User schema
export type Gender = 'MALE' | 'FEMALE' | 'THIRD_GENDER';
export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// User interface based on schema
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    dateOfBirth: Date;
    age: number;
    gender: Gender;
    address: string;
    isVerified: boolean;
    verificationStatus: VerificationStatus;
    profileImage?: string;
    registeredAt: Date;
    verifiedAt?: Date;
    lastLoginAt: Date;
}

// Voter ID interface (additional field for display)
export interface VoterInfo {
    voterId: string;
    userId: string;
}

// Verification Document interface
export interface VerificationDocument {
    id: string;
    name: string;
    status: string;
    verifiedDate: Date;
}

// Voting Statistics interface
export interface VotingStatistics {
    userId: string;
    totalVotesParticipated: number;
    lastVoted?: Date;
    registeredDate: Date;
}

// Tab Item interface
export interface TabItem {
    id: string;
    label: string;
    icon: any;
}

// Profile display data (combines User + additional info)
export interface ProfileData {
    user: User;
    voterInfo: VoterInfo;
    votingStats: VotingStatistics;
}

// Eligible Elections list
export interface EligibleElection {
    id: string;
    name: string;
}

// User data for profile page
export const userData: User = {
    id: 'user_123',
    name: 'Alex Thompson',
    email: 'alex.thompson@university.edu',
    phone: '+1 (555) 123-4567',
    passwordHash: '', // Not exposed in frontend
    dateOfBirth: new Date('1998-05-15'),
    age: 26,
    gender: 'MALE',
    address: '123 Campus Drive, University City, ST 12345',
    isVerified: true,
    verificationStatus: 'APPROVED',
    profileImage: undefined,
    registeredAt: new Date('2024-01-15'),
    verifiedAt: new Date('2024-01-15'),
    lastLoginAt: new Date('2024-01-30')
};

// Voter information
export const voterInfo: VoterInfo = {
    voterId: 'VTR-2024-ALEX-7891',
    userId: 'user_123'
};

// Voting statistics
export const votingStatistics: VotingStatistics = {
    userId: 'user_123',
    totalVotesParticipated: 3,
    lastVoted: new Date('2024-01-20'),
    registeredDate: new Date('2024-01-15')
};

// Verification documents
export const verificationDocuments: VerificationDocument[] = [
    {
        id: 'doc_1',
        name: 'Student ID Card',
        status: 'Verified',
        verifiedDate: new Date('2024-01-15')
    },
    {
        id: 'doc_2',
        name: 'Institutional Email',
        status: 'Verified',
        verifiedDate: new Date('2024-01-15')
    },
    {
        id: 'doc_3',
        name: 'Identity Proof',
        status: 'Verified',
        verifiedDate: new Date('2024-01-15')
    }
];

// Eligible elections
export const eligibleElections: EligibleElection[] = [
    {
        id: 'elec_1',
        name: 'Student Council Elections'
    },
    {
        id: 'elec_2',
        name: 'Department Representative Elections'
    },
    {
        id: 'elec_3',
        name: 'Faculty Senate Elections'
    },
    {
        id: 'elec_4',
        name: 'Club & Society Elections'
    }
];