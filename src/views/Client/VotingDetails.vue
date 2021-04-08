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
                <p>Status: {{voting.votingStatus}}</p>
                <p>Open for voting: {{formatDates(voting.startTime, voting.endTime)}}</p>
                <p>Description: {{voting.description}}</p>
            </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="feature in features" :key="feature.id">
                    <td>
                         <router-link :to="{name: 'TaskDetails', params: { id: feature.id }}">
                            {{feature.title}}
                        </router-link>
                    </td>
                    <td>{{feature.categoryName}}</td>
                    <td>{{feature.description}}</td>
                    <td>
                        <div>
                            <img src="../../assets/icons/delete_icon.png" height="20" alt="delete-icon" @click="ConfirmRemoveFeature(feature)">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table">
            <thead>
                <tr>
                    <th>Assigned to users</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{formatUser(user)}}</td>
                    <td>
                        <div>
                            <img src="../../assets/icons/delete_icon.png" style="float: right; margin-right: 15px;" height="20" alt="delete-icon" @click="ConfirmRemoveUser(user)">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
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

    get features(): IFeature[] {
        return store.state.featuresForVoting;
    }

    get users(): IAppUser[] {
        return store.state.usersForVoting;
    }

    private removeFeature: IFeatureInVotingCreate = {
        featureId: "",
        votingId: this.id
    }

    private removeUser: IUserInVotingCreate = {
        appUserId: "",
        votingId: this.id
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
        this.removeFeature.featureId = featureId;
        const response = await store.dispatch("removeFeatureFromVoting", this.removeFeature);
        if (response === true) {
            location.reload();
        }
    }

    ConfirmRemoveUser(user: IAppUser): void {
        if (confirm("Remove user: '" + this.formatUser(user) + "' from priority voting?")) {
            this.RemoveUserFromVoting(user.id);
        }
    }

    async RemoveUserFromVoting(userId: string): Promise<void> {
        this.removeUser.appUserId = userId;
        const response = await store.dispatch("removeUserFromVoting", this.removeUser);
        if (response === true) {
            location.reload();
        }
    }

    formatDates(startTime: Date | null, endTime: Date | null): string {
        return moment(startTime).format('DD.MM.YYYY HH:mm') + " - " + moment(endTime).format('DD.MM.YYYY HH:mm');
    }

    formatUser(user: IAppUser): string {
        return user.firstName + " " + user.lastName + " (" + user.email + ")";
    }

    mounted(): void {
        store.dispatch("getVoting", this.id);
        store.dispatch("getFeaturesForVoting", this.id);
        store.dispatch("getUsersForVoting", this.id);
    }
}
</script>
