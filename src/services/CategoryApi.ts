import Axios from 'axios';
import { ICategory } from '@/domain/ICategory';
import { ICategoryCreate } from '@/domain/ICategoryCreate';

interface IResponse {
    status: string;
}

export abstract class CategoryApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1/Categories/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getAllCategories(jwt: string): Promise<ICategory[]> {
        const url = 'GetCategories';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<ICategory[]>(url, auth);
            console.log('getAllCategories response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getCategory(jwt: string, id: string): Promise<ICategory | null> {
        const url = 'GetCategory/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<ICategory>(url, auth);
            console.log('getCategory response', response);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return null;
        }
    }

    static async createCategory(Category: ICategoryCreate, jwt: string): Promise<boolean> {
        const url = 'CreateCategory';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<ICategory>(url, Category, auth);
            console.log('CreateCategory response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return false;
        }
    }

    static async deleteCategory(id: string, jwt: string): Promise<void> {
        const url = 'DeleteCategory/' + id;
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.delete<ICategory>(url, auth);
            console.log('DeleteCategory response', response);
            if (response.status === 200) {
                return;
            }
            return;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
        }
    }

    static async editCategory(Category: ICategory, jwt: string): Promise<boolean> {
        const url = 'EditCategory';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.put<ICategory>(url, Category, auth);
            console.log('EditCategory response', response);
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
