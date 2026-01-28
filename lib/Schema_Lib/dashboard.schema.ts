

// Enums from schema
export type ElectionType = 'GENERAL' | 'LOCAL' | 'STUDENT' | 'INTERNAL' | 'REFERENDUM';
export type ElectionScope = 'NATIONAL' | 'STATE' | 'DISTRICT' | 'CONSTITUENCY' | 'ORGANIZATION';
export type ElectionStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

// Election interface based on schema
export interface Election {
    id: string;
    title: string;
    description: string;
    type: ElectionType;
    scope: ElectionScope;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
    votingStartTime: Date;
    votingEndTime: Date;
    status: ElectionStatus;
    totalVoters: number;
    totalCandidates: number;
    totalVotesCast: number;
    rules: string;
    isResultPublished: boolean;
    createdBy: string; // AdminId
    createdAt: Date;
    updatedAt: Date;
}

// Result interface based on schema
export interface Result {
    id: string;
    electionId: string;
    totalVotes: number;
    votePercentage: number;
    position: {
        candidateId: string;
        voteCount: number;
    }[];
    winner: string;
    publishedAt: Date;
    createdAt: Date;
}

// Calendar Event interface (derived from Election)
export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    time: string;
    type: 'election' | 'deadline' | 'result';
    electionId: string;
}

// Result Summary interface for display
export interface ResultSummary {
    id: string;
    electionId: string;
    electionTitle: string;
    winner: string;
    totalVotes: number;
    winPercentage: number;
    publishedAt: Date;
}










// Mock data matching the schema
export const _elections: Election[] = [
    {
        id: '1',
        title: 'Student Council President 2024',
        description: 'Annual election for student body president',
        type: 'STUDENT',
        scope: 'ORGANIZATION',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-15'),
        registrationDeadline: new Date('2024-01-25'),
        votingStartTime: new Date('2024-02-01T09:00:00'),
        votingEndTime: new Date('2024-02-15T23:59:59'),
        status: 'ONGOING',
        totalVoters: 2500,
        totalCandidates: 5,
        totalVotesCast: 1247,
        rules: 'One person one vote',
        isResultPublished: false,
        createdBy: 'admin123',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
    },
    {
        id: '2',
        title: 'Faculty Senate Representative',
        description: 'Elect representatives for the faculty senate',
        type: 'INTERNAL',
        scope: 'ORGANIZATION',
        startDate: new Date('2024-02-20'),
        endDate: new Date('2024-03-05'),
        registrationDeadline: new Date('2024-02-15'),
        votingStartTime: new Date('2024-02-20T09:00:00'),
        votingEndTime: new Date('2024-03-05T23:59:59'),
        status: 'UPCOMING',
        totalVoters: 450,
        totalCandidates: 8,
        totalVotesCast: 0,
        rules: 'Faculty members only',
        isResultPublished: false,
        createdBy: 'admin123',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-25')
    },
    {
        id: '3',
        title: 'Department Head - Computer Science',
        description: 'Selection of new CS department head',
        type: 'INTERNAL',
        scope: 'DISTRICT',
        startDate: new Date('2024-03-10'),
        endDate: new Date('2024-03-20'),
        registrationDeadline: new Date('2024-03-05'),
        votingStartTime: new Date('2024-03-10T09:00:00'),
        votingEndTime: new Date('2024-03-20T23:59:59'),
        status: 'UPCOMING',
        totalVoters: 89,
        totalCandidates: 3,
        totalVotesCast: 0,
        rules: 'CS faculty and staff only',
        isResultPublished: false,
        createdBy: 'admin456',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-05')
    }
];

export const _calendarEvents: CalendarEvent[] = [
    {
        id: '1',
        title: 'Student Council Voting Ends',
        date: new Date('2024-02-15'),
        time: '11:59 PM',
        type: 'deadline',
        electionId: '1'
    },
    {
        id: '2',
        title: 'Faculty Senate Voting Begins',
        date: new Date('2024-02-20'),
        time: '9:00 AM',
        type: 'election',
        electionId: '2'
    },
    {
        id: '3',
        title: 'CS Dept Head Results',
        date: new Date('2024-03-21'),
        time: '2:00 PM',
        type: 'result',
        electionId: '3'
    }
];

export const _recentResults: ResultSummary[] = [
    {
        id: 'result1',
        electionId: 'elec_completed_1',
        electionTitle: 'Class Representative 2024',
        winner: 'Sarah Johnson',
        totalVotes: 892,
        winPercentage: 58.3,
        publishedAt: new Date('2024-01-28')
    },
    {
        id: 'result2',
        electionId: 'elec_completed_2',
        electionTitle: 'Club President - Tech Club',
        winner: 'Michael Chen',
        totalVotes: 234,
        winPercentage: 67.2,
        publishedAt: new Date('2024-01-25')
    }
];