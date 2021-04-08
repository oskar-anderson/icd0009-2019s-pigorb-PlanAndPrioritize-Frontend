import Axios from 'axios';
import { IVoting } from '@/domain/IVoting';
import { IVotingCreate } from '@/domain/IVotingCreate';
import { IFeatureInVotingCreate } from '@/domain/IFeatureInVotingCreate';
import { IUserInVotingCreate } from '@/domain/IUserInVotingCreate';

interface IResponse {
    status: string;
}

export abstract class VotingApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1/Votings/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getAllVotings(jwt: string): Promise<IVoting[]> {
        const url = 'GetVotings';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IVoting[]>(url, auth);
            console.log('getAllVotings response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getActiveVotings(jwt: string): Promise<IVoting[]> {
        const url = 'GetActiveVotings';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IVoting[]>(url, auth);
            console.log('GetActiveVotings response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getVoting(jwt: string, id: string): Promise<IVoting | null> {
        const url = 'GetVoting/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IVoting>(url, auth);
            console.log('getVoting response', response);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return null;
        }
    }

    static async createVoting(voting: IVotingCreate, jwt: string): Promise<boolean> {
        const url = 'CreateVoting';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IVoting>(url, voting, auth);
            console.log('CreateVoting response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return false;
        }
    }

    static async deleteVoting(id: string, jwt: string): Promise<void> {
        const url = 'DeleteVoting/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.delete<IVoting>(url, auth);
            console.log('DeleteVoting response', response);
            if (response.status === 200) {
                return;
            }
            return;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
        }
    }

    static async editVoting(id: string, Voting: IVoting, jwt: string): Promise<boolean> {
        const url = 'EditVoting/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.put<IVoting>(url, Voting, auth);
            console.log('EditVoting response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
            return false;
        }
    }

    static async getVotingsForFeature(id: string, jwt: string): Promise<IVoting[]> {
        const url = 'GetVotingsForFeature/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IVoting[]>(url, auth);
            console.log('GetVotingsForFeature response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async removeFeatureFromVoting(featureRemove: IFeatureInVotingCreate, jwt: string): Promise<boolean> {
        const url = 'RemoveFeature';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IFeatureInVotingCreate>(url, featureRemove, auth);
            console.log('RemoveFeature response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return false;
        }
    }

    static async removeUserFromVoting(userRemove: IUserInVotingCreate, jwt: string): Promise<boolean> {
        const url = 'RemoveUser';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IUserInVotingCreate>(url, userRemove, auth);
            console.log('RemoveUser response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return false;
        }
    }

    static async addFeatureToVoting(featureInVoting: IFeatureInVotingCreate, jwt: string): Promise<boolean> {
        const url = 'AddFeatureToVoting';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IFeatureInVotingCreate>(url, featureInVoting, auth);
            console.log('AddFeatureToVoting response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return false;
        }
    }
}
