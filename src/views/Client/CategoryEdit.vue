<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <h5>Edit category</h5>

        <hr />
        <div class="row">
            <div class="col-md-4">
                <form>
                    <h6 v-if="errorMessage != ''" class="text-danger">{{errorMessage}}</h6>

                    <div class="form-group">
                        <label class="control-label">Category</label>
                        <input v-model="category.title" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Description</label>
                        <textarea v-model="category.description" class="form-control" />
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
import router from '@/router';
import { ICategoryEdit } from "@/domain/ICategoryEdit";
import { ICategory } from "@/domain/ICategory";

@Component
export default class CategoryEdit extends Vue {
    @Prop()
    private id!: string;

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    private errorMessage = "";

    get category(): ICategoryEdit | null {
        return store.state.category;
    }

    async Edit(): Promise<void> {
        if (this.category != null && this.category.title === "") {
            this.errorMessage = "Title field must be filled";
        } else {
            await store.dispatch("editCategory", this.category);
            router.push("/categories")
        }
    }

    mounted(): void {
        store.dispatch("getCategory", this.id);
    }
}
</script>
