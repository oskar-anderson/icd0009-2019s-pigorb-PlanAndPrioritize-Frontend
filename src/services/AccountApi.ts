import { IUserDelete } from './../domain/IUserDelete';
import { IRegisterDTO } from './../types/IRegisterDTO';
import { ILoginDTO } from './../types/ILoginDTO';
import Axios from 'axios';
import { IUser } from '@/domain/IUser';
import { IRole } from '@/domain/IRole';
import { IUserRole } from '@/domain/IUserRole';
import { IUserCreate } from '@/domain/IUserCreate';
import { IPasswordDTO } from '@/types/IPasswordDTO';

interface ILoginResponse {
    token: string;
    status: string;
    requirePasswordChange: boolean;
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

    static async getJwt(loginDTO: ILoginDTO): Promise<ILoginResponse | null> {
        const url = "account/login";
        try {
            const response = await this.axios.post<ILoginResponse>(url, loginDTO);
            console.log('getJwt response', response);
            if (response.status === 200) {
                return response.data;
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

    static async changePassword(passwordDTO: IPasswordDTO): Promise<boolean> {
        const url = "account/changePassword";
        console.log('Change password - email: ' + passwordDTO.email + ', old: ' + passwordDTO.oldPassword + ', new: ' + passwordDTO.newPassword);
        try {
            const response = await this.axios.post<IRegisterResponse>(url, passwordDTO);
            console.log('change password response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return false;
        }
    }

    static async getUsers(jwt: string): Promise<IUser[]> {
        const url = '/UserManager/GetUsers';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IUser[]>(url, auth);
            console.log('getUsers response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async getRoles(jwt: string): Promise<IRole[]> {
        const url = '/UserManager/GetRoles';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.get<IRole[]>(url, auth);
            console.log('getRoles response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async createRole(role: IRole, jwt: string): Promise<boolean> {
        const url = '/UserManager/CreateRole';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IRole>(url, role, auth);
            console.log('create response', response);
            if (response.status === 200) {
                console.log('Role created!');
                return true;
            };
            return false;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
        }
        return false;
    }

    static async deleteRole(role: IRole, jwt: string): Promise<boolean> {
        const url = '/UserManager/DeleteRole';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IRole>(url, role, auth);
            console.log('delete response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
        }
        return false;
    }

    static async addRoleToUser(role: IUserRole, jwt: string): Promise<boolean> {
        const url = '/UserManager/AddRoleToUser';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IUserRole>(url, role, auth);
            console.log('addRoleToUser response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
        }
        return false;
    }

    static async removeRoleFromUser(role: IUserRole, jwt: string): Promise<boolean> {
        const url = '/UserManager/RemoveRoleFromUser';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IUserRole>(url, role, auth);
            console.log('removeRoleFromUser response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
        }
        return false;
    }

    static async deleteUser(user: IUserDelete, jwt: string): Promise<boolean> {
        const url = '/UserManager/DeleteUser';
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IUserDelete>(url, user, auth);
            console.log('delete response', response);
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error: ', (error as Error).message);
        }
        return false;
    }

    static async createUserWithRole(user: IUserCreate, jwt: string): Promise<boolean> {
        console.log("Role: " + user.roleName);
        const url = "/UserManager/CreateUser";
        const auth = {
            headers: { Authorization: 'Bearer ' + jwt }
        }
        try {
            const response = await this.axios.post<IUserCreate>(url, user, auth);
            console.log('create user with role response', response);
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
