export interface IFeatureEdit {
    id: string;
    title: string;
    size: number;
    priorityValue: number;
    description: string;
    startTime: Date;
    endTime: Date;
    categoryId: string;
    featureStatus: string;
    userId: string;
    timeCreated: Date;
    changeLog: string;

    userEditedEmail: string;
}
