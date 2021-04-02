export interface IComment {
    id: string;
    content: string;
    appUserId: string;
    user: string;
    featureId: string;
    timeCreated: Date;
}