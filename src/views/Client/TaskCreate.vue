<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <h5>Create new task</h5>

        <hr />
        <div class="row">
            <div class="col-md-4">
                <form>
                    <h6 v-if="errorMessage != ''" class="text-danger">{{errorMessage}}</h6>

                    <div class="form-group">
                        <label class="control-label">Task</label>
                        <input v-model="featureCreate.title" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Description</label>
                        <textarea v-model="featureCreate.description" class="form-control" />
                    </div>
                    <div class="form-group">
                    <label class="control-label">Category</label>
                    <select class="form-control" v-model="featureCreate.categoryId">
                        <option v-for="category in categories" :key="category.id" v-bind:value="category.id">
                            {{category.title}}
                        </option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label class="control-label">Assign to user</label>
                    <select class="form-control" v-model="featureCreate.appUserId">
                        <option></option>
                        <option v-for="user in users" :key="user.id" v-bind:value="user.id">
                            {{user.firstLastName}}
                        </option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label class="control-label">Start time</label>
                    <img src="../../assets/icons/clear_icon.png" height="15" style="float: right;" alt="clear-icon" @click="Clear('start')">
                    <input type="date" v-model="featureCreate.startTime" class="form-control" />
                    </div>
                    <div class="form-group">
                    <label class="control-label">End time</label>
                    <img src="../../assets/icons/clear_icon.png" height="15" style="float: right;" alt="clear-icon" @click="Clear('end')">
                    <input type="date" v-model="featureCreate.endTime" class="form-control" />
                    </div>
                    <div>
                        <router-link :to="{name: 'TaskList'}">
                            <button
                                type="submit"
                                class="btn btn-outline-success my-2 my-sm-0"
                                style="margin-right:15px;"
                            >Cancel</button>
                        </router-link>
                        <button type="submit" class="btn btn-outline-success my-2 my-sm-0" style="padding-right:20px; padding-left:20px;" @click="Create()">Save</button>
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
import { IFeatureCreate } from "@/domain/IFeatureCreate";
import { ICategoryEdit } from "@/domain/ICategoryEdit";
import { IUser } from "@/domain/IUser";

@Component
export default class TaskCreate extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get categories(): ICategoryEdit[] {
        return store.state.categoriesPlain;
    }

    get users(): IUser[] {
        return store.state.users;
    }

    private featureCreate: IFeatureCreate = {
        title: "",
        description: "",
        startTime: null,
        endTime: null,
        categoryId: "",
        appUserId: null
    };

    private errorMessage = "";

    async Create(): Promise<void> {
        if (this.featureCreate.title === "" || this.featureCreate.categoryId === "") {
            this.errorMessage = "Title and category fields must be filled";
        } else if ((this.featureCreate.startTime !== null && this.featureCreate.endTime !== null) && (this.featureCreate.startTime > this.featureCreate.endTime)) {
            this.errorMessage = "End date can't be earlier than start date";
        } else {
            const feature = await store.dispatch("createFeature", this.featureCreate);
            router.push("/task/" + feature.id)
        }
    }

    Clear(date: string): void {
        if (date === "start") {
            this.featureCreate.startTime = null;
        }
        if (date === "end") {
            this.featureCreate.endTime = null;
        }
    }

    mounted(): void {
        store.dispatch("getCategoriesPlain");
        store.dispatch("getUsers");
    }
}
</script>
