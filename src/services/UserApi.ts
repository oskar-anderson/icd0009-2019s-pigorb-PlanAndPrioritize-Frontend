import Axios from 'axios';
import { IAppUser } from '@/domain/IAppUser';

interface IResponse {
    status: string;
}

export abstract class UserApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1/AppUsers/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getUsersForVoting(jwt: string, id: string): Promise<IAppUser[]> {
        const url = 'GetUsersForVoting/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IAppUser[]>(url, auth);
            console.log('GetUsersForVoting response', response);
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
