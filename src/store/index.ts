import Vue from 'vue'
import Vuex from 'vuex'
import { ILoginDTO } from '@/types/ILoginDTO';
import { AccountApi } from '@/services/AccountApi';
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
import { IFeatureEdit } from '@/domain/IFeatureEdit';
import { IComment } from '@/domain/IComment';
import { ICommentCreate } from '@/domain/ICommentCreate';
import { CommentApi } from '@/services/CommentApi';
import { IFeatureState } from '@/domain/IFeatureState';
import { IVoting } from '@/domain/IVoting';
import { VotingApi } from '@/services/VotingApi';
import { IVotingCreate } from '@/domain/IVotingCreate';
import { IAppUser } from '@/domain/IAppUser';
import { UserApi } from '@/services/UserApi';
import { IFeatureInVotingCreate } from '@/domain/IFeatureInVotingCreate';
import { IUserInVotingCreate } from '@/domain/IUserInVotingCreate';
import { IVotingEdit } from '@/domain/IVotingEdit';
import { IFeatureWithPriority } from '@/domain/IFeatureWithPriority';
import { IUsersFeaturePriority } from '@/domain/IUsersFeaturePriority';
import { IFeatureForGraph } from '@/domain/IFeatureForGraph';
import { IFeatureRequest } from '@/domain/IFeatureRequest';
import { IResetPasswordDTO } from '@/types/IResetPasswordDTO';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        featuresParameters: { limit: 100, search: '' } as IFeatureRequest,
        users: [] as IUser[],
        roles: [] as IRole[],
        role: null as IRole | null,
        requirePasswordChange: true,
        hasAssignedOpenVotings: false,

        feature: null as IFeature | null,
        featurePlain: null as IFeatureEdit | null,
        features: [] as IFeature[],
        toDoFeatures: [] as IFeature[],
        featureStates: [] as IFeatureState[],
        featuresWithPriority: [] as IFeatureWithPriority[],
        featuresForGraph: [] as IFeatureForGraph[],

        category: null as ICategoryEdit | null,
        categories: [] as ICategory[],
        categoriesPlain: [] as ICategoryEdit[],

        comments: [] as IComment[],

        voting: null as IVoting | null,
        votingEdit: null as IVotingEdit | null,
        votings: [] as IVoting[],
        activeVotings: [] as IVoting[],
        featuresForVoting: [] as IFeature[],
        toDoFeaturesNotInVoting: [] as IFeature[],
        usersForVoting: [] as IAppUser[],
        usersNotInVoting: [] as IAppUser[],

        userFeaturePriorities: [] as IUsersFeaturePriority[],
        userHasVoted: false as boolean
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
        setToDoFeatures(state, features: IFeature[]) {
            state.toDoFeatures = features;
        },
        setFeaturesWithPriority(state, features: IFeatureWithPriority[]) {
            state.featuresWithPriority = features;
        },
        setFeature(state, feature: IFeature) {
            state.feature = feature;
        },
        setFeaturePlain(state, feature: IFeatureEdit) {
            state.featurePlain = feature;
        },
        setFeatureStates(state, states: IFeatureState[]) {
            state.featureStates = states;
        },
        setFeaturesForGraph(state, features: IFeatureForGraph[]) {
            state.featuresForGraph = features;
        },

        setCategories(state, categories: ICategory[]) {
            state.categories = categories;
        },
        setCategoriesPlain(state, categories: ICategoryEdit[]) {
            state.categoriesPlain = categories;
        },
        setCategory(state, category: ICategoryEdit) {
            state.category = category;
        },

        setComments(state, comments: IComment[]) {
            state.comments = comments;
        },

        setVotings(state, votings: IVoting[]) {
            state.votings = votings;
        },
        setActiveVotings(state, votings: IVoting[]) {
            state.activeVotings = votings;
        },
        setVoting(state, voting: IVoting) {
            state.voting = voting;
        },
        setVotingEdit(state, voting: IVotingEdit) {
            state.votingEdit = voting;
        },
        setFeaturesForVoting(state, features: IFeature[]) {
            state.featuresForVoting = features;
        },
        setToDoFeaturesNotInVoting(state, features: IFeature[]) {
            state.toDoFeaturesNotInVoting = features;
        },
        setUsersForVoting(state, users: IAppUser[]) {
            state.usersForVoting = users;
        },
        setUsersNotInVoting(state, users: IAppUser[]) {
            state.usersNotInVoting = users;
        },
        setFeaturesParameters(state, parameters: IFeatureRequest) {
            state.featuresParameters = parameters;
        },
        setUserPriorities(state, priorities: IUsersFeaturePriority[]) {
            state.userFeaturePriorities = priorities;
        },
        setUserHasVoted(state, hasVoted: boolean) {
            state.userHasVoted = hasVoted;
        },
        setHasAssignedOpenVotings(state, hasAssignedOpenVotings: boolean) {
            state.hasAssignedOpenVotings = hasAssignedOpenVotings;
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
        setFeaturesParameters(context, parameters: IFeatureRequest) {
            context.commit('setFeaturesParameters', parameters);
        },
        async authenticateUser(context, loginDTO: ILoginDTO): Promise<boolean> {
            const loginResponse = await AccountApi.getJwt(loginDTO);
            const jwt = loginResponse?.token;
            context.commit('setJwt', jwt);
            const requirePasswordChange = loginResponse?.requirePasswordChange;
            context.commit('setRequirePasswordChange', requirePasswordChange);
            const hasVotings = await VotingApi.getHasAssignedOpenVotings(jwt);
            context.commit('setHasAssignedOpenVotings', hasVotings);
            return jwt !== undefined;
        },
        async changePassword(context, passwordDTO: IPasswordDTO): Promise<boolean> {
            return await AccountApi.changePassword(context.getters.jwt, passwordDTO);
        },
        async resetPassword(context, resetPasswordDTO: IResetPasswordDTO): Promise<boolean> {
            return await AccountApi.resetPassword(context.getters.jwt, resetPasswordDTO);
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
                return await AccountApi.addRoleToUser(role, context.getters.jwt);
            }
            return false;
        },
        async removeRoleFromUser(context, role: IUserRole): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await AccountApi.removeRoleFromUser(role, context.getters.jwt);
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
            const features = await FeatureApi.getAllFeatures(this.state.featuresParameters, context.getters.jwt);
            context.commit('setFeatures', features);
        },
        async getFeaturesForGraph(context, limit: number): Promise<void> {
            const features = await FeatureApi.getFeaturesForGraph(limit, context.getters.jwt);
            context.commit('setFeaturesForGraph', features);
        },
        async getToDoFeatures(context): Promise<void> {
            const features = await FeatureApi.getToDoFeatures(context.getters.jwt);
            context.commit('setToDoFeatures', features);
        },
        async getFeature(context, id: string): Promise<void> {
            const feature = await FeatureApi.getFeature(context.getters.jwt, id);
            context.commit('setFeature', feature);
        },
        async getFeaturePlain(context, id: string): Promise<void> {
            const feature = await FeatureApi.getFeaturePlain(context.getters.jwt, id);
            context.commit('setFeaturePlain', feature);
        },
        async createFeature(context, feature: IFeatureCreate): Promise<IFeature | null> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const createdFeature = await FeatureApi.createFeature(feature, context.getters.jwt);
                return createdFeature;
            }
            return null;
        },
        async deleteFeature(context, featureId: string): Promise<void> {
            if (context.getters.isAdmin && context.getters.jwt) {
                await FeatureApi.deleteFeature(featureId, context.getters.jwt);
                const features = await FeatureApi.getAllFeatures(this.state.featuresParameters, context.getters.jwt);
                context.commit('setFeatures', features);
            }
        },
        async editFeature(context, feature: IFeatureEdit): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await FeatureApi.editFeature(feature.id, feature, context.getters.jwt);
            }
            return false;
        },
        async getFeatureStates(context): Promise<void> {
            const states = await FeatureApi.getFeatureStates(context.getters.jwt);
            context.commit('setFeatureStates', states);
        },

        async getCategories(context): Promise<void> {
            const categories = await CategoryApi.getAllCategories(context.getters.jwt);
            context.commit('setCategories', categories);
        },
        async getCategoriesPlain(context): Promise<void> {
            const categories = await CategoryApi.getAllCategoriesPlain(context.getters.jwt);
            context.commit('setCategoriesPlain', categories);
        },
        async getCategory(context, id: string): Promise<void> {
            const category = await CategoryApi.getCategory(context.getters.jwt, id);
            context.commit('setCategory', category);
        },
        async createCategory(context, category: ICategoryCreate): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await CategoryApi.createCategory(category, context.getters.jwt);
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
                return await CategoryApi.editCategory(category.id, category, context.getters.jwt);
            }
            return false;
        },

        async getComments(context, id: string): Promise<void> {
            const comments = await CommentApi.getCommentsForFeature(id, context.getters.jwt);
            context.commit('setComments', comments);
        },
        async createComment(context, comment: ICommentCreate): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await CommentApi.createComment(comment, context.getters.jwt);
            }
            return false;
        },

        async getVotings(context): Promise<void> {
            const votings = await VotingApi.getAllVotings(context.getters.jwt);
            context.commit('setVotings', votings);
        },
        async getAssignedVotings(context): Promise<void> {
            const votings = await VotingApi.getAssignedVotings(context.getters.jwt);
            context.commit('setVotings', votings);
        },
        async getActiveVotings(context): Promise<void> {
            const votings = await VotingApi.getActiveVotings(context.getters.jwt);
            context.commit('setActiveVotings', votings);
        },
        async getActiveVotingsNotAddedToFeature(context, featureId: string): Promise<void> {
            const votings = await VotingApi.getActiveVotingsNotAddedToFeature(featureId, context.getters.jwt);
            context.commit('setActiveVotings', votings);
        },
        async getVoting(context, id: string): Promise<void> {
            const voting = await VotingApi.getVoting(id, context.getters.jwt);
            context.commit('setVoting', voting);
        },
        async getVotingEdit(context, id: string): Promise<void> {
            const voting = await VotingApi.getVotingEdit(id, context.getters.jwt);
            context.commit('setVotingEdit', voting);
        },
        async createVoting(context, voting: IVotingCreate): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await VotingApi.createVoting(voting, context.getters.jwt);
            }
            return false;
        },
        async deleteVoting(context, votingId: string): Promise<void> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                await VotingApi.deleteVoting(votingId, context.getters.jwt);
                const votings = await VotingApi.getAllVotings(context.getters.jwt);
                context.commit('setVotings', votings);
            }
        },
        async editVoting(context, voting: IVotingEdit): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                const result = await VotingApi.editVoting(voting.id, voting, context.getters.jwt);
                return result;
            }
            return false;
        },
        async getFeaturesForVoting(context, votingId: string): Promise<void> {
            const features = await FeatureApi.getFeaturesForVoting(context.getters.jwt, votingId);
            context.commit('setFeaturesForVoting', features);
        },
        async getFeaturesWithPriorityTemplate(context, votingId: string): Promise<void> {
            const features = await FeatureApi.getFeaturesWithPriorityTemplate(context.getters.jwt, votingId);
            context.commit('setFeaturesWithPriority', features);
        },
        async getFeaturesWithUsersPriorities(context, votingId: string): Promise<void> {
            const features = await FeatureApi.getFeaturesWithUsersPriorities(context.getters.jwt, votingId);
            context.commit('setFeaturesWithPriority', features);
        },
        async getToDoFeaturesNotInVoting(context, votingId: string): Promise<void> {
            const features = await FeatureApi.getToDoFeaturesNotInVoting(context.getters.jwt, votingId);
            context.commit('setToDoFeaturesNotInVoting', features);
        },
        async getUsersForVoting(context, votingId: string): Promise<void> {
            const users = await UserApi.getUsersForVoting(context.getters.jwt, votingId);
            context.commit('setUsersForVoting', users);
        },
        async getUsersNotInVoting(context, votingId: string): Promise<void> {
            const users = await UserApi.getUsersNotInVoting(context.getters.jwt, votingId);
            context.commit('setUsersNotInVoting', users);
        },
        async getVotingsForFeature(context, featureId: string): Promise<void> {
            const votings = await VotingApi.getVotingsForFeature(featureId, context.getters.jwt);
            context.commit('setVotings', votings);
        },
        async removeFeatureFromVoting(context, featureRemove: IFeatureInVotingCreate): Promise<void> {
            await VotingApi.removeFeatureFromVoting(featureRemove, context.getters.jwt);
            const featuresIn = await FeatureApi.getFeaturesForVoting(context.getters.jwt, featureRemove.votingId);
            const featuresNotIn = await FeatureApi.getToDoFeaturesNotInVoting(context.getters.jwt, featureRemove.votingId);
            context.commit('setFeaturesForVoting', featuresIn);
            context.commit('setToDoFeaturesNotInVoting', featuresNotIn);
        },
        async removeUserFromVoting(context, userRemove: IUserInVotingCreate): Promise<void> {
            await VotingApi.removeUserFromVoting(userRemove, context.getters.jwt);
            const usersIn = await UserApi.getUsersForVoting(context.getters.jwt, userRemove.votingId);
            const usersNotIn = await UserApi.getUsersNotInVoting(context.getters.jwt, userRemove.votingId);
            context.commit('setUsersForVoting', usersIn);
            context.commit('setUsersNotInVoting', usersNotIn);
        },
        async addFeatureToVoting(context, featureInVoting: IFeatureInVotingCreate): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await VotingApi.addFeatureToVoting(featureInVoting, context.getters.jwt);
            }
            return false;
        },
        async addUserToVoting(context, userInVoting: IUserInVotingCreate): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await VotingApi.addUserToVoting(userInVoting, context.getters.jwt);
            }
            return false;
        },
        async vote(context, featuresWithPriority: IFeatureWithPriority[]): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await VotingApi.vote(featuresWithPriority, context.getters.jwt);
            }
            return false;
        },
        async editVotes(context, featuresWithPriority: IFeatureWithPriority[]): Promise<boolean> {
            if (context.getters.isAuthenticated && context.getters.jwt) {
                return await VotingApi.editVotes(featuresWithPriority, context.getters.jwt);
            }
            return false;
        },
        async getUserPriorities(context, featureInVoting: IFeatureInVotingCreate): Promise<void> {
            const priorities = await FeatureApi.getUserPriorities(context.getters.jwt, featureInVoting);
            context.commit('setUserPriorities', priorities);
        },
        async getUserHasVoted(context, votingId: string): Promise<void> {
            const hasVoted = await VotingApi.getUserHasVoted(context.getters.jwt, votingId);
            context.commit('setUserHasVoted', hasVoted);
        }
    },

    modules: {
    }
})
