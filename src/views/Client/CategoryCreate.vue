<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <h5>Create new category</h5>

        <hr />
        <div class="row">
            <div class="col-md-4">
                <form>
                    <h6 v-if="errorMessage != ''" class="text-danger">{{errorMessage}}</h6>

                    <div class="form-group">
                        <label class="control-label">Category</label>
                        <input v-model="categoryCreate.title" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Description</label>
                        <textarea v-model="categoryCreate.description" class="form-control" />
                    </div>
                    <div>
                        <router-link :to="{name: 'Categories'}">
                            <button
                                type="submit"
                                class="btn btn-outline-success my-2 my-sm-0"
                                style="margin-right:15px;"
                            >Cancel</button>
                        </router-link>
                        <button
                            type="submit"
                            class="btn btn-outline-success my-2 my-sm-0"
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
import store from "./../../store";
import router from '@/router';
import { ICategoryCreate } from "@/domain/ICategoryCreate";

@Component
export default class CategoryCreate extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    private categoryCreate: ICategoryCreate = {
        title: "",
        description: ""
    };

    private errorMessage = "";

    async Create(): Promise<void> {
        if (this.categoryCreate.title === "") {
            this.errorMessage = "Title field must be filled";
        } else {
            await store.dispatch("createCategory", this.categoryCreate);
            router.push("/categories")
        }
    }
}
</script>
