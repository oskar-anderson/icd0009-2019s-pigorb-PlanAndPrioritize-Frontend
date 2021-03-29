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
    featureStatusId: string;
    userId: string;
    timeCreated: Date;
    lastEdited: Date;
    changeLog: string;

    categoryName: string;
    featureStatusName: string;
    assignee: string;
    commentIds: string [];
    votingIds: string [];
}
