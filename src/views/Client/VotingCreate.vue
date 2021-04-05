<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <h5>Create new priority voting</h5>

        <hr />
        <div class="row">
            <div class="col-md-4">
                <form>
                    <h6 v-if="errorMessage != ''" class="text-danger">{{errorMessage}}</h6>

                    <div class="form-group">
                        <label class="control-label">Voting</label>
                        <input v-model="votingCreate.title" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Description</label>
                        <textarea v-model="votingCreate.description" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Start time</label>
                        <input type="datetime-local" v-model="votingCreate.startTime" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">End time</label>
                        <input type="datetime-local" v-model="votingCreate.endTime" class="form-control" />
                    </div>
                    <div>
                        <router-link :to="{name: 'Votings'}">
                            <button
                                type="submit"
                                class="btn btn-outline-success my-2 my-sm-0"
                                style="margin-right:15px;"
                            >Cancel</button>
                        </router-link>
                        <button
                            type="submit"
                            class="btn btn-outline-success my-2 my-sm-0"
                            style="padding-right:20px; padding-left:20px;"
                            @click="Create()">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store";
import router from '@/router';
import { IVotingCreate } from "@/domain/IVotingCreate";

@Component
export default class VotingCreate extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    private votingCreate: IVotingCreate = {
        title: "",
        description: "",
        startTime: null,
        endTime: null
    };

    private errorMessage = "";

    async Create(): Promise<void> {
        if (this.votingCreate.title === "" || this.votingCreate.startTime === null || this.votingCreate.endTime === null) {
            this.errorMessage = "Title and time fields must be filled";
        } else if (this.votingCreate.startTime > this.votingCreate.endTime) {
            this.errorMessage = "End time can't be earlier than start time";
        } else {
            await store.dispatch("createVoting", this.votingCreate);
            router.push("/votings")
        }
    }
}
</script>
