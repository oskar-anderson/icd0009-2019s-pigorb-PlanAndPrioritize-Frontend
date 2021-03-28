<template>
    <div>
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
                    <td>{{feature.categoryId}}</td>
                    <td>{{feature.size}}</td>
                    <td>{{feature.userId}}</td>
                    <td>{{feature.priorityValue}}</td>
                    <td>{{feature.startTime}} - {{feature.endTime}}</td>
                    <td>
                        <div>
                            <span>
                                <img src="../../assets/icons/edit_icon.png" height="20" alt="edit-icon" @click="Edit(feature)">
                            </span>
                            &nbsp;
                            <span>
                                <img src="../../assets/icons/delete_icon.png" height="20" alt="delete-icon" @click="Delete(feature.id)">
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
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

    get features(): IFeature[] {
        return store.state.features;
    }

    async Edit(featureId: string): Promise<void> {
        store.dispatch("editFeature", featureId);
    }

    async Delete(featureId: string): Promise<void> {
        store.dispatch("deleteFeature", featureId);
    }

    mounted(): void {
        console.log("mounted");
        store.dispatch("getFeatures");
    }
}
</script>
