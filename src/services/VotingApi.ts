import Axios from 'axios';
import { IVoting } from '@/domain/IVoting';
import { IVotingCreate } from '@/domain/IVotingCreate';

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

    static async createVoting(Category: IVotingCreate, jwt: string): Promise<boolean> {
        const url = 'CreateVoting';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IVoting>(url, Category, auth);
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
}
