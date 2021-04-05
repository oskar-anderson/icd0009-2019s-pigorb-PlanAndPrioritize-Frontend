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
            <h5>Votings
            <router-link :to="{name: 'VotingCreate'}">
              <button type="submit" class="btn btn-outline-success my-2 my-sm-0" style="float: right;">Add voting</button>
              </router-link></h5>
        </div>
        <br>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Voting</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="voting in votings" :key="voting.id">
                    <td>{{voting.title}}</td>
                    <td>
                        <div>
                            <span>
                                <router-link :to="{name: 'VotingEdit', params: { id: voting.id }}">
                                    <img src="../../assets/icons/edit_icon.png" height="20" alt="edit-icon">
                                </router-link>
                            </span>
                            &nbsp;
                            <span>
                                <img src="../../assets/icons/delete_icon.png" height="20" alt="delete-icon" @click="ConfirmDelete(voting)">
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

@Component
export default class Votings extends Vue {
    get isAdmin(): boolean {
        return store.getters.isAuthenticated;
    }

    get votings(): IVoting[] {
        return store.state.votings;
    }

    ConfirmDelete(category: IVoting): void {
        if (confirm("Delete voting: '" + voting.title + "'?")) {
            this.Delete(voting.id);
        }
    }

    async Delete(votingId: string): Promise<void> {
        store.dispatch("deleteVoting", votingId);
    }

    mounted(): void {
        store.dispatch("getVotings");
    }
}
</script>