import Vue from 'vue'
import Vuex from 'vuex'
import { ILoginDTO } from '@/types/ILoginDTO';
import { AccountApi } from '@/services/AccountApi';
import { IRegisterDTO } from '@/types/IRegisterDTO';
import { IUser } from '@/domain/IUser';
import { IRole } from '@/domain/IRole';
import { IToken } from '@/domain/IToken';
import jwtDecode from 'jwt-decode';
import { IUserRole } from '@/domain/IUserRole';
import { IUserDelete } from '@/domain/IUserDelete';
import { IUserCreate } from '@/domain/IUserCreate';
import { FeatureApi } from '@/services/FeatureApi';
import { IFeature } from '@/domain/IFeature';
import { IFeatureCreate } from '@/domain/IFeatureCreate';
import { IPasswordDTO } from '@/types/IPasswordDTO';
import { ICategory } from '@/domain/ICategory';
import { CategoryApi } from '@/services/CategoryApi';
import { ICategoryCreate } from '@/domain/ICategoryCreate';
import { ICategoryEdit } from '@/domain/ICategoryEdit';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [] as IUser[],
        roles: [] as IRole[],
        role: null as IRole | null,
        requirePasswordChange: true,

        feature: null as IFeature | null,
        features: [] as IFeature[],

        category: null as ICategoryEdit | null,
        categories: [] as ICategory[]
    },

    mutations: {
        setJwt(state, jwt: string | null) {
            if (jwt) {
                localStorage.setItem('jwt', jwt);
            } else {
                localStorage.removeItem('jwt');
            }
        },
        setRequirePasswordChange(state, require: boolean) {
            state.requirePasswordChange = require;
        },
        setUsers(state, users: IUser[]) {
            state.users = users;
        },
        setRoles(state, roles: IRole[]) {
            state.roles = roles;
        },
        setRole(state, role: IRole) {
            state.role = role;
        },

        setFeatures(state, features: IFeature[]) {
            state.features = features;
        },
        setFeature(state, feature: IFeature) {
            state.feature = feature;
        },
        setCategories(state, categories: ICategory[]) {
            state.categories = categories;
        },
        setCategory(state, category: ICategoryEdit) {
            state.category = category;
        }
    },

    getters: {
        isAuthenticated(): boolean {
            return localStorage.getItem('jwt') !== null;
        },
        isAdmin(): boolean {
            const jwt = localStorage.getItem('jwt');
            if (jwt === null) {
                return false;
            }
            const dict = jwtDecode<IToken>(jwt);
            let stmnt = false;

            const roles = dict["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            if (typeof roles === 'string') {
                if (roles === 'Admin') {
                    stmnt = true;
                }
            } else {
                roles.forEach((role: string) => {
                    if (role === 'Admin') {
                        stmnt = true;
                    }
                });
            }
            console.log('IsAdmin: ' + stmnt);
            return stmnt;
        },
        jwt(): string | null {
            return localStorage.getItem('jwt');
        }
    },

    actions: {
        clearJwt(context): void {
            context.commit('setJwt', null);
            context.commit('setRequirePasswordChange', false);
        },
        async authenticateUser(context, loginDTO: ILoginDTO): Promise<boolean> {
            const loginResponse = await AccountApi.getJwt(loginDTO);
            const jwt = loginResponse?.token;
            context.commit('setJwt', jwt);
            const requirePasswordChange = loginResponse?.requirePasswordChange;
            context.commit('setRequirePasswordChange', requirePasswordChange);
            return jwt !== null;
        },
        async registerUser(context, registerDTO: IRegisterDTO): Promise<boolean> {
            return await AccountApi.registerUser(registerDTO);
        },
        async changePassword(context, passwordDTO: IPasswordDTO): Promise<boolean> {
            return await AccountApi.changePassword(passwordDTO);
        },
        async getUsers(context): Promise<void> {
            const users = await AccountApi.getUsers(context.getters.jwt);
            context.commit('setUsers', users);
        },
        async getRoles(context): Promise<void> {
            const roles = await AccountApi.getRoles(context.getters.jwt);
            context.commit('setRoles', roles);
        },
        async createRole(context, role: IRole): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await AccountApi.createRole(role, context.getters.jwt);
                await context.dispatch('getRoles');
                return result;
            }
            return false;
        },
        async deleteRole(context, role: IRole): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await AccountApi.deleteRole(role, context.getters.jwt);
                await context.dispatch('getRoles');
                return result;
            }
            return false;
        },
        async addRoleToUser(context, role: IUserRole): Promise<boolean> {
            console.log('addRoleToUser', context.getters.isAuthenticated);
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await AccountApi.addRoleToUser(role, context.getters.jwt);
                return result;
            }
            return false;
        },
        async removeRoleFromUser(context, role: IUserRole): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await AccountApi.removeRoleFromUser(role, context.getters.jwt);
                return result;
            }
            return false;
        },
        async deleteUser(context, user: IUserDelete): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await AccountApi.deleteUser(user, context.getters.jwt);
                await context.dispatch('getUsers');
                return result;
            }
            return false;
        },
        async createUserWithRole(context, user: IUserCreate): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await AccountApi.createUserWithRole(user, context.getters.jwt);
                await context.dispatch('getUsers');
                return result;
            }
            return false;
        },

        async getFeatures(context): Promise<void> {
            const features = await FeatureApi.getAllFeatures(context.getters.jwt);
            context.commit('setFeatures', features);
        },
        async getFeature(context, id: string): Promise<void> {
            const feature = await FeatureApi.getFeature(context.getters.jwt, id);
            context.commit('setFeature', feature);
        },
        async createFeature(context, feature: IFeatureCreate): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await FeatureApi.createFeature(feature, context.getters.jwt);
                return result;
            }
            return false;
        },
        async deleteFeature(context, featureId: string): Promise<void> {
            if (context.getters.isAdmin && context.getters.jwt) {
                await FeatureApi.deleteFeature(featureId, context.getters.jwt);
                const features = await FeatureApi.getAllFeatures(context.getters.jwt);
                context.commit('setFeatures', features);
            }
        },
        async editFeature(context, feature: IFeature): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await FeatureApi.editFeature(feature, context.getters.jwt);
                return result;
            }
            return false;
        },

        async getCategories(context): Promise<void> {
            const categories = await CategoryApi.getAllCategories(context.getters.jwt);
            context.commit('setCategories', categories);
        },
        async getCategory(context, id: string): Promise<void> {
            const category = await CategoryApi.getCategory(context.getters.jwt, id);
            context.commit('setCategory', category);
        },
        async createCategory(context, category: ICategoryCreate): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await CategoryApi.createCategory(category, context.getters.jwt);
                return result;
            }
            return false;
        },
        async deleteCategory(context, categoryId: string): Promise<void> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                await CategoryApi.deleteCategory(categoryId, context.getters.jwt);
                const categories = await CategoryApi.getAllCategories(context.getters.jwt);
                context.commit('setCategories', categories);
            }
        },
        async editCategory(context, category: ICategoryEdit): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await CategoryApi.editCategory(category.id, category, context.getters.jwt);
                return result;
            }
            return false;
        }
    },

    modules: {
    }
})
