export interface IUsersFeaturePriorityCreate {
    businessValue: number | null;
    timeCriticality: number | null;
    riskOrOpportunity: number | null;
    size: number | null;
    featureId: string;
    votingId: string;
}