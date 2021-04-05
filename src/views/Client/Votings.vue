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
                    <th>Voting</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Open for voting</th>
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
        return store.getters.isAuthenticated;
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

    mounted(): void {
        store.dispatch("getVotings");
    }
}
</script>
