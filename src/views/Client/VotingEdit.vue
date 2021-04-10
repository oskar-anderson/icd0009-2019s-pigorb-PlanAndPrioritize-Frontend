<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <h5>Edit: {{votingEdit.title}}</h5>
        <hr />
        <div class="row">
            <div class="col-md-4">
                <form>
                    <h6 v-if="errorMessage != ''" class="text-danger">{{errorMessage}}</h6>

                    <div class="form-group">
                        <label class="control-label">Voting</label>
                        <input v-model="votingEdit.title" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Description</label>
                        <textarea v-model="votingEdit.description" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Start time</label>
                        <input type="datetime-local" v-model="votingEdit.startTime" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">End time</label>
                        <input type="datetime-local" v-model="votingEdit.endTime" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Assign to users</label>
                        <img src="../../assets/icons/clear_icon.png" height="15" style="float: right;" alt="clear-icon" @click="ClearUsers()">
                        <select multiple class="form-control" v-model="votingEdit.users">
                            <option
                                v-for="user in users"
                                v-bind:value="user.id"
                                :key="user.id"
                            >{{user.email}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Add features to voting</label>
                        <img src="../../assets/icons/clear_icon.png" height="15" style="float: right;" alt="clear-icon" @click="ClearFeatures()">
                        <select multiple class="form-control" v-model="votingEdit.features">
                            <option
                                v-for="feature in features"
                                v-bind:value="feature.id"
                                :key="feature.id"
                            >{{feature.title}}</option>
                        </select>
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
                            @click="Edit()">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../../store";
import { IVotingEdit } from "@/domain/IVotingEdit";
import { IUser } from "@/domain/IUser";
import { IFeature } from "@/domain/IFeature";
import router from "@/router";

@Component
export default class VotingEdit extends Vue {
    @Prop()
    private id!: string;

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get features(): IFeature[] {
        return store.state.toDoFeatures;
    }

    get users(): IUser[] {
        return store.state.users;
    }

    get votingEdit(): IVotingEdit | null {
        return store.state.votingEdit;
    }

    private errorMessage = "";

    async Edit(): Promise<void> {
        if (this.votingEdit != null) {
            if (this.votingEdit.title === "" || this.votingEdit.startTime === null || this.votingEdit.endTime === null) {
                this.errorMessage = "Title and time fields must be filled";
            } else if (this.votingEdit.startTime > this.votingEdit.endTime) {
                this.errorMessage = "End time can't be earlier than start time";
            } else {
                if (await store.dispatch("editVoting", this.votingEdit)) {
                    router.push("/voting/" + this.id);
                }
            }
        }
    }

    ClearUsers(): void {
        if (this.votingEdit != null) {
            this.votingEdit.users = [];
        }
    }

    ClearFeatures(): void {
        if (this.votingEdit != null) {
            this.votingEdit.features = [];
        }
    }

    mounted() {
        store.dispatch("getVotingEdit", this.id);
        store.dispatch("getUsers");
        store.dispatch("getToDoFeatures");
    }
}
</script>
