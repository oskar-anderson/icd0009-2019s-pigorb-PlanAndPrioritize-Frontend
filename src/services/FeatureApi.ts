import Axios from 'axios';
import { IFeature } from '@/domain/IFEature';
import { IFeatureCreate } from '@/domain/IFeatureCreate';

interface IResponse {
    status: string;
}

export abstract class FeatureApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1/FeatureList/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getAllFeatures(jwt: string): Promise<IFeature[]> {
        const url = 'GetFeatures';
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

    static async createFeature(feature: IFeatureCreate, jwt: string): Promise<boolean> {
        const url = 'CreateFeature';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IFeature>(url, feature, auth);
            console.log('CreateFeature response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return false;
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

    static async editFeature(feature: IFeature, jwt: string): Promise<boolean> {
        const url = 'EditFeature';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.put<IFeature>(url, feature, auth);
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
}
