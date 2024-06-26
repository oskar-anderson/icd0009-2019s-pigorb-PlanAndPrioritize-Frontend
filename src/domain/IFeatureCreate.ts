export interface IFeatureCreate {
    title: string;
    description: string;
    startTime: Date | null;
    endTime: Date | null;
    categoryId: string;
    appUserId: string | null;
}
