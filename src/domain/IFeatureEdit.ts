export interface IFeatureEdit {
    id: string;
    title: string;
    description: string;
    startTime: Date | null;
    endTime: Date | null;
    categoryId: string;
    appUserId: string | null;
    featureStatus: string;
}
