import Axios from 'axios';
import { IFeature } from '@/domain/IFEature';
import { IFeatureCreate } from '@/domain/IFeatureCreate';
import { IFeatureEdit } from '@/domain/IFeatureEdit';
import { IFeatureState } from '@/domain/IFeatureState';
import { IFeatureWithPriority } from '@/domain/IFeatureWithPriority';
import { IFeatureInVotingCreate } from '@/domain/IFeatureInVotingCreate';
import { IUsersFeaturePriority } from '@/domain/IUsersFeaturePriority';

interface IResponse {
    status: string;
}

export abstract class FeatureApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1/Features/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getAllFeatures(search: string, jwt: string): Promise<IFeature[]> {
        const url = 'GetFeaturesForList/' + search;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IFeature[]>(url, auth);
            console.log('getAllFeatures response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getToDoFeatures(jwt: string): Promise<IFeature[]> {
        const url = 'GetToDoFeatures';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IFeature[]>(url, auth);
            console.log('GetToDoFeatures response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getFeature(jwt: string, id: string): Promise<IFeature | null> {
        const url = 'GetFeature/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IFeature>(url, auth);
            console.log('getFeature response', response);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return null;
        }
    }

    static async getFeaturePlain(jwt: string, id: string): Promise<IFeatureEdit | null> {
        const url = 'GetFeaturePlain/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IFeatureEdit>(url, auth);
            console.log('getFeaturePlain response', response);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return null;
        }
    }

    static async createFeature(feature: IFeatureCreate, jwt: string): Promise<IFeature | null> {
        const url = 'CreateFeature';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IFeature>(url, feature, auth);
            console.log('CreateFeature response', response);
            if (response.status === 201) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return null;
        }
    }

    static async deleteFeature(id: string, jwt: string): Promise<void> {
        const url = 'DeleteFeature/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.delete<IFeature>(url, auth);
            console.log('DeleteFeature response', response);
            if (response.status === 200) {
                return;
            }
            return;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
        }
    }

    static async editFeature(id: string, feature: IFeatureEdit, jwt: string): Promise<boolean> {
        const url = 'EditFeature/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.put<IFeatureEdit>(url, feature, auth);
            console.log('EditFeature response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
            return false;
        }
    }

    static async getFeatureStates(jwt: string): Promise<IFeatureState[]> {
        const url = 'GetFeatureStates';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IFeatureState[]>(url, auth);
            console.log('getFeatureStates response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getFeaturesForVoting(jwt: string, id: string): Promise<IFeature[]> {
        const url = 'GetFeaturesForVoting/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IFeature[]>(url, auth);
            console.log('getFeaturesForVoting response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getFeaturesWithPriorityTemplate(jwt: string, id: string): Promise<IFeatureWithPriority[]> {
        const url = 'GetFeaturesWithPriority/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IFeatureWithPriority[]>(url, auth);
            console.log('getFeaturesWithPriorityTemplate response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getToDoFeaturesNotInVoting(jwt: string, id: string): Promise<IFeature[]> {
        const url = 'GetFeaturesNotInVoting/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IFeature[]>(url, auth);
            console.log('GetFeaturesNotInVoting response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getUserPriorities(jwt: string, featureInVoting: IFeatureInVotingCreate) {
        const url = 'GetUserPriorities/' + featureInVoting.featureId + '/' + featureInVoting.votingId;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IUsersFeaturePriority[]>(url, auth);
            console.log('getUserPriorities response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }
}
