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
                        <img src="../../assets/icons/delete_icon.png" height="20" style="float: right;" alt="delete-icon" @click="ConfirmDelete(feature)">
                    </span>
                    <span>
                        <router-link :to="{name: 'TaskEdit', params: { id: feature.id }}">
                            <img src="../../assets/icons/edit_icon.png" height="20" style="float: right; margin-right: 15px;" alt="edit-icon">
                        </router-link>
                    </span>
                </h5>
            </div>
            <div class="card-body">
                <p class="bold">Description</p>
                <hr>
                <p>Category: {{feature.categoryName}}</p>
                <p>Priority value: {{checkValue(feature.priorityValue)}}</p>
                <p>Assignee: {{feature.assignee}}</p>
                <p>Status: {{feature.featureStatus}}</p>
                <p>Size: {{checkValue(feature.size)}}</p>
                <p>Start date: {{formatDate(feature.startTime)}}</p>
                <p>End date: {{formatDate(feature.endTime)}}</p>
                <p>Duration: {{checkValue(feature.duration)}} {{days(feature.duration)}}</p>
                <p>Description: {{feature.description}}</p>
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
                <button type="submit" class="btn btn-outline-success my-2 my-sm-0" @click="AddComment()">Comment</button>
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

    private commentCreate: ICommentCreate = {
        content: "",
        featureId: this.id
    };

    ConfirmDelete(feature: IFeature): void {
        if (confirm("Delete task: '" + feature.title + "'?")) {
            this.Delete(feature.id);
        }
    }

    async Delete(featureId: string): Promise<void> {
        store.dispatch("deleteFeature", featureId);
        router.push("/");
    }

    async AddComment(): Promise<void> {
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

    checkValue(size: number): string | number {
        if (size === 0) {
            return "";
        }
        return size;
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

    mounted(): void {
        store.dispatch("getFeature", this.id);
        store.dispatch("getComments", this.id);
        store.dispatch("getVotingsForFeature", this.id);
    }
}
</script>
