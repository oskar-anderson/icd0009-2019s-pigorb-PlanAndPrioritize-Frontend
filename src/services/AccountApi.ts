import { IRegisterDTO } from './../types/IRegisterDTO';
import { ILoginDTO } from './../types/ILoginDTO';
import Axios from 'axios';

interface ILoginResponse {
    token: string;
    status: string;
}

interface IRegisterResponse {
    status: string;
}

export abstract class AccountApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1.0/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getJwt(loginDTO: ILoginDTO): Promise<string | null> {
        const url = "account/login";
        try {
            const response = await this.axios.post<ILoginResponse>(url, loginDTO);
            console.log('getJwt response', response);
            if (response.status === 200) {
                return response.data.token;
            }
            return null;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return null;
        }
    }

    static async registerUser(registerDTO: IRegisterDTO): Promise<boolean> {
        const url = "account/register";
        try {
            const response = await this.axios.post<IRegisterResponse>(url, registerDTO);
            console.log('register response', response);
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
