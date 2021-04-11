export interface IFeatureWithPriority {
    id: string;
    title: string;
    description: string;
    categoryName: string;
    votingId: string;

    taskSize: number | null;
    businessValue: number | null;
    timeCriticality: number | null;
    riskOrOpportunity: number | null;    
}
