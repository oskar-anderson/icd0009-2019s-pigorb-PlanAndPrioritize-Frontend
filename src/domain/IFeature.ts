export interface IFeature {
    id: string;
    title: string;
    size: number;
    priorityValue: number;
    description: string;
    startTime: Date | null;
    endTime: Date | null;
    duration: number;
    categoryId: string;
    appUserId: string | null;
    timeCreated: Date;
    createdBy: string;
    lastEdited: Date;
    changeLog: string;

    categoryName: string;
    featureStatus: string;
    assignee: string;

    isInOpenVoting: boolean;
}
