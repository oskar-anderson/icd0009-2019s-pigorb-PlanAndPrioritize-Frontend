<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>
        <div v-else class="main">
        <h5>Task List</h5>

        <small class="text-muted">Smaller task list text</small>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Assignee</th>
                    <th>Priority value</th>
                    <th>Dates</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="feature in features" :key="feature.id">
                    <td>{{feature.title}}</td>
                    <td>{{feature.categoryName}}</td>
                    <td>{{feature.size}}</td>
                    <td>{{feature.assignee}}</td>
                    <td>{{feature.priorityValue}}</td>
                    <td>{{feature.startTime}} - {{feature.endTime}}</td>
                    <td>
                        <div>
                            <span>
                                <img src="../../assets/icons/edit_icon.png" height="20" alt="edit-icon" @click="Edit(feature)">
                            </span>
                            &nbsp;
                            <span v-if="isAdmin === true">
                                <img src="../../assets/icons/delete_icon.png" height="20" alt="delete-icon" @click="ConfirmDelete(feature)">
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
import { IFeature } from "@/domain/IFeature";
import { Component, Vue } from "vue-property-decorator";
import store from "./../../store";

@Component
export default class TaskList extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get isAdmin(): boolean {
        return store.getters.isAdmin;
    }

    get features(): IFeature[] {
        return store.state.features;
    }

    async Edit(featureId: string): Promise<void> {
        // Redirect to edit page
        store.dispatch("editFeature", featureId);
    }

    ConfirmDelete(feature: IFeature): void {
        if (confirm("Delete task: '" + feature.title + "'?")) {
            this.Delete(feature.id);
        }
    }

    async Delete(featureId: string): Promise<void> {
        store.dispatch("deleteFeature", featureId);
    }

    mounted(): void {
        store.dispatch("getFeatures");
    }
}
</script>
