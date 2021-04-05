<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <h5>Edit: {{feature.title}}</h5>

        <hr />
        <div class="row">
            <div class="col-md-4">
                <form>
                    <h6 v-if="errorMessage != ''" class="text-danger">{{errorMessage}}</h6>

                    <div class="form-group">
                        <label class="control-label">Task</label>
                        <input v-model="feature.title" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Description</label>
                        <textarea v-model="feature.description" class="form-control" />
                    </div>
                    <div class="form-group">
                    <label class="control-label">Category</label>
                    <select class="form-control" v-model="feature.categoryId">
                        <option v-for="category in categories" :key="category.id" v-bind:value="category.id">
                            {{category.title}}
                        </option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label class="control-label">Assign to user</label>
                    <select class="form-control" v-model="feature.appUserId">
                        <option></option>
                        <option v-for="user in users" :key="user.id" v-bind:value="user.id">
                            {{user.firstLastName}}
                        </option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label class="control-label">Status</label>
                    <select class="form-control" v-model="feature.featureStatus">
                        <option v-for="status in states" :key="status.state">
                            {{status.state}}
                        </option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label class="control-label">Start time</label>
                    <img src="../../assets/icons/clear_icon.png" height="17" style="float: right;" alt="clear-icon" @click="Clear('start')">
                    <input class="col-sm-6, form-control" type="datetime-local" v-model="feature.startTime"/>
                    </div>
                    <div class="form-group">
                    <label class="control-label">End time</label>
                    <img src="../../assets/icons/clear_icon.png" height="17" style="float: right;" alt="clear-icon" @click="Clear('end')">
                    <input type="datetime-local" v-model="feature.endTime" class="form-control" />
                    </div>
                    <div>
                        <router-link :to="{name: 'TaskList'}">
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
import { ICategoryEdit } from "@/domain/ICategoryEdit";
import { IFeatureEdit } from "@/domain/IFeatureEdit";
import { IFeatureState } from "@/domain/IFeatureState";
import { IUser } from "@/domain/IUser";
import router from "@/router";
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "./../../store";

@Component
export default class TaskEdit extends Vue {
    @Prop()
    private id!: string;

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get feature(): IFeatureEdit | null {
        return store.state.featurePlain;
    }

    get categories(): ICategoryEdit[] {
        return store.state.categoriesPlain;
    }

    get users(): IUser[] {
        return store.state.users;
    }

    get states(): IFeatureState[] {
        return store.state.featureStates;
    }

    private errorMessage = "";

    async Edit(): Promise<void> {
        if (this.feature !== null && (this.feature.title === "" || this.feature.categoryId === "" || this.feature.featureStatus === "")) {
            this.errorMessage = "Title and category fields must be filled";
        } else if ((this.feature!.startTime !== null && this.feature!.endTime !== null) && (this.feature!.startTime > this.feature!.endTime)) {
            this.errorMessage = "End date can't be earlier than start date";
        } else {
            await store.dispatch("editFeature", this.feature);
            router.push("/task/" + this.id)
        }
    }

    Clear(date: string): void {
        if (date === "start") {
            this.feature!.startTime = null;
        }
        if (date === "end") {
            this.feature!.endTime = null;
        }
    }

    mounted(): void {
        store.dispatch("getFeaturePlain", this.id);
        store.dispatch("getCategoriesPlain");
        store.dispatch("getUsers");
        store.dispatch("getFeatureStates");
    }
}
</script>
