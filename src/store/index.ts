import Vue from 'vue'
import Vuex from 'vuex'
import { ILoginDTO } from '@/types/ILoginDTO';
import { AccountApi } from '@/services/AccountApi';
import { IRegisterDTO } from '@/types/IRegisterDTO';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },

    mutations: {
        setJwt(state, jwt: string | null) {
            if (jwt) {
                localStorage.setItem('jwt', jwt);
            } else {
                localStorage.removeItem('jwt');
            }
        }
    },

    getters: {
        isAuthenticated(): boolean {
            return localStorage.getItem('jwt') !== null;
        },
        jwt(): string | null {
            return localStorage.getItem('jwt');
        }
    },

    actions: {
        clearJwt(context): void {
            context.commit('setJwt', null);
        },
        async authenticateUser(context, loginDTO: ILoginDTO): Promise<boolean> {
            const jwt = await AccountApi.getJwt(loginDTO);
            context.commit('setJwt', jwt);
            return jwt !== null;
        },
        async registerUser(context, registerDTO: IRegisterDTO): Promise<boolean> {
            return await AccountApi.registerUser(registerDTO);
        }
    },

    modules: {
    }
})
