<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>
        <div v-else class="main">
            <div class="card">
            <div class="card-header">
                <h5>{{voting.title}}
                    <span v-if="isAdmin === true">
                        <img src="../../assets/icons/delete_icon.png" height="20" style="float: right;" alt="delete-icon" @click="ConfirmDelete(voting)">
                    </span>
                    <span v-if="isAdmin === true">
                        <router-link :to="{name: 'VotingEdit', params: { id: voting.id }}">
                            <img src="../../assets/icons/edit_icon.png" height="20" style="float: right; margin-right: 15px;" alt="edit-icon">
                        </router-link>
                    </span>
                </h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="column1">
                        <p>Status </p>
                    </div>
                    <div class="column2">
                        <p>{{voting.votingStatus}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Open for voting </p>
                    </div>
                    <div class="column2">
                        <p>{{formatDates(voting.startTime, voting.endTime)}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Description </p>
                    </div>
                    <div class="column2">
                        <p>{{voting.description}}</p>
                    </div>
                </div>
            </div>

        <hr>
        <div class="title">Tasks added to voting</div>
        <table class="table table-striped">
            <thead>
                <tr v-if="hasFeatures() === true">
                    <th>Task</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="feature in featuresForVoting" :key="feature.id">
                    <td>
                         <router-link :to="{name: 'TaskDetails', params: { id: feature.id }}">
                            {{feature.title}}
                        </router-link>
                    </td>
                    <td>{{feature.categoryName}}</td>
                    <td>{{feature.description}}</td>
                    <td>
                        <div>
                            <img v-if="isAdmin === true" src="../../assets/icons/delete_icon.png" height="20" style="float: right; margin-right: 15px;" alt="delete-icon" @click="ConfirmRemoveFeature(feature)">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="isAdmin === true">
        <button type="submit" class="btn btn-outline-success my-2 my-sm-0" style="margin-left: 10px;" @click="displayFeatureSelection()">Add task</button>
        </div>
        <br>
        <div class="row" v-if="chooseTask === true && isAdmin === true">
            <div class="col-md-6">
                <div class="form-group" style="margin-left: 10px;">
                    <label class="control-label">Choose task</label>
                    <select class="form-control" v-model="featureInVoting.featureId">
                        <option v-for="feature in toDoFeaturesNotInVoting" :key="feature.id" v-bind:value="feature.id">{{feature.title}}</option>
                    </select>
                    <br>
                    <button type="submit" class="btn btn-outline-success my-2 my-sm-0" @click="addFeatureToVoting()">Add</button>
                    <br><br>
                </div>
            </div>
        </div>
        <br>

        <table class="table">
            <thead>
                <tr>
                    <th>Assigned to users</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in usersForVoting" :key="user.id">
                    <td>{{formatUser(user)}}</td>
                    <td>
                        <div>
                            <img v-if="isAdmin === true" src="../../assets/icons/delete_icon.png" style="float: right; margin-right: 15px;" height="20" alt="delete-icon" @click="ConfirmRemoveUser(user)">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="isAdmin === true">
        <button type="submit" class="btn btn-outline-success my-2 my-sm-0" style="margin-left: 10px;" @click="displayUserSelection()">Add user</button>
        </div>
        <br>
        <div class="row" v-if="chooseUser === true && isAdmin === true">
            <div class="col-md-6">
                <div class="form-group" style="margin-left: 10px;">
                    <label class="control-label">Choose user</label>
                    <select class="form-control" v-model="userInVoting.appUserId">
                        <option v-for="user in usersNotInVoting" :key="user.id" v-bind:value="user.id">{{formatUser(user)}}</option>
                    </select>
                    <br>
                    <button type="submit" class="btn btn-outline-success my-2 my-sm-0" @click="addUserToVoting()">Add</button>
                    <br><br>
                </div>
            </div>
        </div>
        <div class="card-footer text-muted"></div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IFeature } from "@/domain/IFeature";
import store from "../../store";
import moment from "moment";
import router from "@/router";
import { IVoting } from "@/domain/IVoting";
import { IAppUser } from "@/domain/IAppUser";
import { IFeatureInVotingCreate } from "@/domain/IFeatureInVotingCreate";
import { IUserInVotingCreate } from "@/domain/IUserInVotingCreate";

@Component
export default class TaskDetails extends Vue {
    @Prop()
    private id!: string;

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get isAdmin(): boolean {
        return store.getters.isAdmin;
    }

    get voting(): IVoting | null {
        return store.state.voting;
    }

    get featuresForVoting(): IFeature[] {
        return store.state.featuresForVoting;
    }

    get toDoFeaturesNotInVoting(): IFeature[] {
        return store.state.toDoFeaturesNotInVoting;
    }

    get usersForVoting(): IAppUser[] {
        return store.state.usersForVoting;
    }

    get usersNotInVoting(): IAppUser[] {
        return store.state.usersNotInVoting;
    }

    private chooseTask = false;

    private chooseUser = false;

    private featureInVoting: IFeatureInVotingCreate = {
        featureId: "",
        votingId: this.id
    }

    private userInVoting: IUserInVotingCreate = {
        appUserId: "",
        votingId: this.id
    }

    hasFeatures(): boolean {
        return this.featuresForVoting.length > 0;
    }

    ConfirmDelete(feature: IFeature): void {
        if (confirm("Delete task: '" + feature.title + "'?")) {
            this.Delete(feature.id);
        }
    }

    async Delete(votingId: string): Promise<void> {
        store.dispatch("deleteVoting", votingId);
        router.push("/votings");
    }

    ConfirmRemoveFeature(feature: IFeature): void {
        if (confirm("Remove task: '" + feature.title + "' from priority voting?")) {
            this.RemoveFeatureFromVoting(feature.id);
        }
    }

    async RemoveFeatureFromVoting(featureId: string): Promise<void> {
        this.featureInVoting.featureId = featureId;
        store.dispatch("removeFeatureFromVoting", this.featureInVoting);
    }

    ConfirmRemoveUser(user: IAppUser): void {
        if (confirm("Remove user: '" + this.formatUser(user) + "' from priority voting?")) {
            this.RemoveUserFromVoting(user.id);
        }
    }

    async RemoveUserFromVoting(userId: string): Promise<void> {
        this.userInVoting.appUserId = userId;
        store.dispatch("removeUserFromVoting", this.userInVoting);
    }

    formatDates(startTime: Date | null, endTime: Date | null): string {
        return moment(startTime).format('DD.MM.YYYY HH:mm') + " - " + moment(endTime).format('DD.MM.YYYY HH:mm');
    }

    formatUser(user: IAppUser): string {
        return user.firstName + " " + user.lastName + " (" + user.email + ")";
    }

    displayFeatureSelection(): void {
        this.chooseTask = true;
    }

    async addFeatureToVoting(): Promise<void> {
        const result = await store.dispatch("addFeatureToVoting", this.featureInVoting);
        if (result === true) {
            store.dispatch("getFeaturesForVoting", this.id);
            store.dispatch("getToDoFeaturesNotInVoting", this.id);
            this.chooseTask = false;
        }
    }

    displayUserSelection(): void {
        this.chooseUser = true;
    }

    async addUserToVoting(): Promise<void> {
        const result = await store.dispatch("addUserToVoting", this.userInVoting);
        if (result === true) {
            store.dispatch("getUsersForVoting", this.id);
            store.dispatch("getUsersNotInVoting", this.id);
            this.chooseUser = false;
        }
    }

    mounted(): void {
        store.dispatch("getVoting", this.id);
        store.dispatch("getFeaturesForVoting", this.id);
        store.dispatch("getToDoFeaturesNotInVoting", this.id);
        store.dispatch("getUsersForVoting", this.id);
        store.dispatch("getUsersNotInVoting", this.id);
    }
}
</script>
