<template>
    <div>
        <div v-if="isAdmin === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <div>
            <h5>Priority votings
            <router-link :to="{name: 'VotingCreate'}">
              <button type="submit" class="btn btn-outline-success my-2 my-sm-0" style="float: right;">Add voting</button>
              </router-link></h5>
        </div>
        <br>
        <table class="table table-striped">
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
                    <td>
                        <div>
                            <span>
                            <span>
                                <img src="../../assets/icons/delete_icon.png" style="float: right;" height="20" alt="delete-icon" @click="ConfirmDelete(voting)">
                            </span>
                                <router-link :to="{name: 'VotingEdit', params: { id: voting.id }}">
                                    <img src="../../assets/icons/edit_icon.png" style="float: right; margin-right: 10px;" height="20" alt="edit-icon">
                                </router-link>
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "./../../store";
import { IVoting } from "@/domain/IVoting";
import moment from "moment";

@Component
export default class Votings extends Vue {
    get isAdmin(): boolean {
        return store.getters.isAdmin;
    }

    get votings(): IVoting[] {
        return store.state.votings;
    }

    ConfirmDelete(voting: IVoting): void {
        if (confirm("Delete voting: '" + voting.title + "'?")) {
            this.Delete(voting.id);
        }
    }

    async Delete(votingId: string): Promise<void> {
        store.dispatch("deleteVoting", votingId);
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

    mounted(): void {
        store.dispatch("getVotings");
    }
}
</script>
