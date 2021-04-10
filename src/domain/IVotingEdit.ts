export interface IVotingEdit {
    id: string;
    title: string;
    description: string;
    startTime: Date | null;
    endTime: Date | null;
    users: string[];
    features: string[];
}