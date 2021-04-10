<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <div>
            <h5>Assigned priority votings</h5>
        </div>
        <br>
        <table v-if="hasAssignedVotings() === true" class="table table-striped">
            <thead>
                <tr>
                    <th>Voting <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByTitle()"></th>
                    <th>Description <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByDescription()"></th>
                    <th>Status <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByStatus()"></th>
                    <th>Open for voting <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByStartDate()"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="voting in votings" :key="voting.id">
                    <td>
                         <router-link :to="{name: 'VotingDetails', params: { id: voting.id }}">
                            {{voting.title}}
                        </router-link>
                    </td>
                    <td style="max-width: 50em;">{{voting.description}}</td>
                    <td>{{voting.votingStatus}}</td>
                    <td>{{formatDates(voting.startTime, voting.endTime)}}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="hasAssignedVotings() === false">
            <h6>You have currently no assigned votings!</h6>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "./../../store";
import { IVoting } from "@/domain/IVoting";
import moment from "moment";

@Component
export default class AssignedVotings extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get votings(): IVoting[] {
        return store.state.votings;
    }

    formatDates(startTime: Date | null, endTime: Date | null): string {
        return moment(startTime).format('DD.MM.YYYY HH:mm') + " - " + moment(endTime).format('DD.MM.YYYY HH:mm');
    }

    private titleSort = 1;

    sortByTitle(): void {
        if (this.titleSort === 1) {
            this.votings.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        } else {
            this.votings.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
        }
        this.titleSort *= -1;
    }

    private descriptionSort = 1;

    sortByDescription(): void {
        if (this.descriptionSort === 1) {
            this.votings.sort((a, b) => a.description.toLowerCase().localeCompare(b.description.toLowerCase()));
        } else {
            this.votings.sort((a, b) => b.description.toLowerCase().localeCompare(a.description.toLowerCase()));
        }
        this.descriptionSort *= -1;
    }

    private statusSort = 1;

    sortByStatus(): void {
        if (this.statusSort === 1) {
            this.votings.sort((a, b) => a.votingStatus.toLowerCase().localeCompare(b.votingStatus.toLowerCase()));
        } else {
            this.votings.sort((a, b) => b.votingStatus.toLowerCase().localeCompare(a.votingStatus.toLowerCase()));
        }
        this.statusSort *= -1;
    }

    private datesSort = 1;

    sortByStartDate(): void {
        if (this.datesSort === 1) {
            this.votings.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        } else {
            this.votings.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        }
        this.datesSort *= -1;
    }

    hasAssignedVotings(): boolean {
        return this.votings.length > 0;
    }

    mounted(): void {
        store.dispatch("getAssignedVotings");
    }
}
</script>
