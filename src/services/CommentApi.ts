import Axios from 'axios';
import { IComment } from '@/domain/IComment';
import { ICommentCreate } from '@/domain/ICommentCreate';

interface IResponse {
    status: string;
}

export abstract class CommentApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1/Comments/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getCommentsForFeature(id: string, jwt: string): Promise<IComment[]> {
        const url = 'GetCommentsForFeature/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IComment[]>(url, auth);
            console.log('getCommentsForFeature response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async createComment(Comment: ICommentCreate, jwt: string): Promise<boolean> {
        const url = 'CreateComment';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IComment>(url, Comment, auth);
            console.log('CreateComment response', response);
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
