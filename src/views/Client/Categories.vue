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
            <h5>Task categories
            <router-link :to="{name: 'CategoryCreate'}">
              <button type="submit" class="btn btn-outline-success my-2 my-sm-0" style="float: right;">Add category</button>
              </router-link></h5>
        </div>
        <br>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th style="text-align:center">Number of tasks</th>
                    <th style="text-align:center">In progress</th>
                    <th style="text-align:center">Closed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{category.title}}</td>
                    <td>{{category.description}}</td>
                    <td style="text-align:center">{{category.count}}</td>
                    <td style="text-align:center">{{category.inProgress}}</td>
                    <td style="text-align:center">{{category.finished}}</td>
                    <td>
                        <div>
                            <span>
                                <router-link :to="{name: 'CategoryEdit', params: { id: category.id }}">
                                    <img src="../../assets/icons/edit_icon.png" height="20" alt="edit-icon">
                                </router-link>
                            </span>
                            &nbsp;
                            <span>
                                <img v-if="isAdmin === true" src="../../assets/icons/delete_icon.png" height="20" alt="delete-icon" @click="ConfirmDelete(category)">
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
import { ICategory } from "@/domain/ICategory";
import { Component, Vue } from "vue-property-decorator";
import store from "./../../store";

@Component
export default class Categories extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get isAdmin(): boolean {
        return store.getters.isAdmin;
    }

    get categories(): ICategory[] {
        return store.state.categories;
    }

    ConfirmDelete(category: ICategory): void {
        if (confirm("Delete category: '" + category.title + "'?")) {
            this.Delete(category.id);
        }
    }

    async Delete(categoryId: string): Promise<void> {
        store.dispatch("deleteCategory", categoryId);
    }

    mounted(): void {
        store.dispatch("getCategories");
    }
}
</script>
