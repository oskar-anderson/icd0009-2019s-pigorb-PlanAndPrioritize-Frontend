export interface IFeature {
    id: string;
    title: string;
    size: number;
    priorityValue: number;
    description: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    categoryId: string;
    userId: string;
    timeCreated: Date;
    lastEdited: Date;
    changeLog: string;

    categoryName: string;
    featureStatus: string;
    assignee: string;
    commentIds: string [];
    votingIds: string [];
}
