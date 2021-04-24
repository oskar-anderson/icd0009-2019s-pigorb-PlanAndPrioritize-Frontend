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
                <h5>{{feature.title}}
                    <span v-if="isAdmin === true">
                        <img src="../../assets/icons/delete_icon.png" height="20" style="float: right;" alt="delete-icon" @click="confirmDelete(feature)">
                    </span>
                    <span>
                        <router-link :to="{name: 'TaskEdit', params: { id: feature.id }}">
                            <img src="../../assets/icons/edit_icon.png" height="20" style="float: right; margin-right: 15px;" alt="edit-icon">
                        </router-link>
                    </span>
                     <span v-if="isAdmin === true" class="clickable" @click="displayVotingSelection()">+ Add to voting</span>
                </h5>
            </div>
            <div class="card-body">

                <div class="row" v-if="chooseVoting === true">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label">Choose voting</label>
                            <select class="form-control" v-model="featureInVoting.votingId">
                                <option v-for="voting in activeVotings" :key="voting.id" v-bind:value="voting.id">{{voting.title}}</option>
                            </select>
                            <br>
                            <button type="submit" class="btn btn-outline-success my-2 my-sm-0" @click="addToVoting()">Add to voting</button>
                            <br><br>
                        </div>
                     </div>
                </div>

                <p class="bold">Description</p>
                <hr>
                <div class="row">
                    <div class="column1">
                        <p>Category </p>
                    </div>
                    <div class="column2">
                        <p>{{feature.categoryName}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Priority value </p>
                    </div>
                    <div class="column2">
                        <p>{{showValueIfNot0AndNotInOpenVotings(feature.priorityValue, feature.isInOpenVoting)}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Assignee </p>
                    </div>
                    <div class="column2">
                        <p>{{feature.assignee}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Status </p>
                    </div>
                    <div class="column2">
                        <p>{{feature.featureStatus}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Size </p>
                    </div>
                    <div class="column2">
                        <p>{{showValueIfNot0AndNotInOpenVotings(feature.size, feature.isInOpenVoting)}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Start date </p>
                    </div>
                    <div class="column2">
                        <p>{{formatDate(feature.startTime)}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>End date </p>
                    </div>
                    <div class="column2">
                        <p>{{formatDate(feature.endTime)}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Duration </p>
                    </div>
                    <div class="column2">
                        <p>{{checkValue(feature.duration)}} {{days(feature.duration)}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Description </p>
                    </div>
                    <div class="column2">
                        <p>{{feature.description}}</p>
                    </div>
                </div>
                <br>
                <p class="bold">Priority votings</p>
                <hr>
                <ul v-for="voting in votings" :key="voting.id">
                    <li>
                        <router-link :to="{name: 'VotingDetails', params: { id: voting.id }}">
                            {{voting.title}}
                        </router-link>
                    </li>
                </ul>
                <br>
                <p class="bold">Comments</p>
                <hr>
                <div v-for="comment in comments" :key="comment.id">
                    <small class="text-muted">{{comment.user}} commented at {{formatDateTime(comment.timeCreated)}}</small>
                    <div>{{comment.content}}</div>
                    <br>
                </div>
                 <div class="form-group">
                    <textarea v-model="commentCreate.content" class="form-control" />
                </div>
                <button type="submit" class="btn btn-outline-success my-2 my-sm-0" @click="addComment()">Comment</button>
                <br>
                <br>
                <p class="bold">Change log</p>
                <hr>
                <p class="text-muted">Created: {{formatDateTime(feature.timeCreated)}} by {{feature.createdBy}}</p>
                <p class="text-muted">Last edited: {{formatDateTime(feature.lastEdited)}}</p>
                <hr>
                <p class="text-muted" v-html="feature.changeLog.replace(/(?:\\n)/g, '<br />')"></p>
            </div>
            <div class="card-footer text-muted"></div>
        </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IFeature } from "@/domain/IFeature";
import { ICommentCreate } from "@/domain/ICommentCreate";
import { IComment } from "@/domain/IComment";
import store from "../../store";
import moment from "moment";
import router from "@/router";
import { IVoting } from "@/domain/IVoting";
import { IFeatureInVotingCreate } from "@/domain/IFeatureInVotingCreate";

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

    get feature(): IFeature | null {
        return store.state.feature;
    }

    get comments(): IComment[] {
        return store.state.comments;
    }

    get votings(): IVoting[] {
        return store.state.votings;
    }

    get activeVotings(): IVoting[] {
        return store.state.activeVotings;
    }

    private commentCreate: ICommentCreate = {
        content: "",
        featureId: this.id
    };

    private featureInVoting: IFeatureInVotingCreate = {
        featureId: this.id,
        votingId: ""
    };

    private chooseVoting = false;

    confirmDelete(feature: IFeature): void {
        if (confirm("Delete task: '" + feature.title + "'?")) {
            this.delete(feature.id);
        }
    }

    async delete(featureId: string): Promise<void> {
        store.dispatch("deleteFeature", featureId);
        router.push("/list");
    }

    async addComment(): Promise<void> {
        if (this.commentCreate.content !== "") {
            await store.dispatch("createComment", this.commentCreate);
            this.commentCreate.content = "";
            location.reload();
        }
    }

    formatDate(date: Date | null): string {
        if (date === null) {
            return "";
        }
        return moment(date).format('DD.MM.YYYY');
    }

    formatDateTime(date: Date | null): string {
        if (date === null) {
            return "";
        }
        return moment(date).format('DD.MM.YYYY HH:mm');
    }

    showValueIfNot0AndNotInOpenVotings(size: number, isInOpenVoting: boolean): string | number {
        if (size === 0 || isInOpenVoting === true) {
            return "";
        }
        return size;
    }

    checkValue(value: number): string | number {
        if (value === 0) {
            return "";
        }
        return value;
    }

    days(count: number): string {
        if (count === 0) {
            return "";
        }
        if (count === 1) {
            return "day";
        }
        return "days";
    }

    displayVotingSelection(): void {
        this.chooseVoting = true;
    }

    async addToVoting(): Promise<void> {
        const result = await store.dispatch("addFeatureToVoting", this.featureInVoting);
        if (result === true) {
            await store.dispatch("getVotingsForFeature", this.id);
            store.dispatch("getActiveVotingsNotAddedToFeature", this.id);
            this.chooseVoting = false;
        }
    }

    mounted(): void {
        store.dispatch("getFeature", this.id);
        store.dispatch("getComments", this.id);
        store.dispatch("getVotingsForFeature", this.id);
        store.dispatch("getActiveVotingsNotAddedToFeature", this.id);
    }
}
</script>
