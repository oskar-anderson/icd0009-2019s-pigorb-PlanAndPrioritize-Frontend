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
            <h5>Task list
            <router-link :to="{name: 'TaskCreate'}">
              <button type="submit" class="btn btn-outline-success my-2 my-sm-0" style="float: right;">Add task</button>
              </router-link></h5>
              <br>
              <div >
            <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByCreationTime()"> Sort by creation time
            </div>
        </div>
        <br>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Task <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByTitle()"></th>
                    <th>Category <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByCategory()"></th>
                    <th>Size <img src="../../assets/icons/sort_icon.png" height="12" alt="sort-icon" @click="sortBySize()"></th>
                    <th>Assignee <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByAssignee()"></th>
                    <th>Priority <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByPriority()"></th>
                    <th>Status <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByStatus()"></th>
                    <th>Dates <img src="../../assets/icons/sort_icon.png" height="11" alt="sort-icon" @click="sortByStartDate()"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="feature in features" :key="feature.id">
                    <td style="max-width: 30em;">
                         <router-link :to="{name: 'TaskDetails', params: { id: feature.id }}">
                            {{feature.title}}
                        </router-link>
                    </td>
                    <td>{{feature.categoryName}}</td>
                    <td style="text-align:center">{{checkValue(feature.size)}}</td>
                    <td>{{feature.assignee}}</td>
                    <td style="text-align:center">{{checkValue(feature.priorityValue)}}</td>
                    <td>{{feature.featureStatus}}</td>
                    <td>{{formatDate(feature.startTime, feature.endTime)}}</td>
                    <td>
                        <div>
                            <span>
                                <router-link :to="{name: 'TaskEdit', params: { id: feature.id }}">
                                    <img src="../../assets/icons/edit_icon.png" height="20" alt="edit-icon">
                                </router-link>
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
import moment from "moment";
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

    ConfirmDelete(feature: IFeature): void {
        if (confirm("Delete task: '" + feature.title + "'?")) {
            this.Delete(feature.id);
        }
    }

    async Delete(featureId: string): Promise<void> {
        store.dispatch("deleteFeature", featureId);
    }

    formatDate(startTime: Date | null, endTime: Date | null): string {
        if (startTime === null && endTime === null) {
            return "";
        }
        if (startTime === null) {
            return " . . . . . . . . . . - " + moment(endTime).format('DD.MM.YYYY');
        }
        if (endTime === null) {
            return moment(startTime).format('DD.MM.YYYY') + " - . . . . . . . . . . ";
        }
        return moment(startTime).format('DD.MM.YYYY') + " - " + moment(endTime).format('DD.MM.YYYY');
    }

    checkValue(size: number): string | number {
        if (size === 0) {
            return "";
        }
        return size;
    }

    private titleSort = 1;

    sortByTitle(): IFeature[] {
        if (this.titleSort === 1) {
            this.titleSort *= -1;
            return this.features.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        }
        this.titleSort *= -1;
        return this.features.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
    }

    private categorySort = 1;

    sortByCategory(): IFeature[] {
        if (this.categorySort === 1) {
            this.categorySort *= -1;
            return this.features.sort((a, b) => a.categoryName.toLowerCase().localeCompare(b.categoryName.toLowerCase()));
        }
        this.categorySort *= -1;
        return this.features.sort((a, b) => b.categoryName.toLowerCase().localeCompare(a.categoryName.toLowerCase()));
    }

    private sizeSort = 1;

    sortBySize(): IFeature[] {
        if (this.sizeSort === 1) {
            this.sizeSort *= -1;
            return this.features.sort((a, b) => b.size - a.size);
        }
        this.sizeSort *= -1;
        return this.features.sort((a, b) => a.size - b.size);
    }

    private assigneeSort = 1;

    sortByAssignee(): IFeature[] {
        if (this.assigneeSort === 1) {
            this.assigneeSort *= -1;
            return this.features.sort((a, b) => a.assignee.toLowerCase().localeCompare(b.assignee.toLowerCase()));
        }
        this.assigneeSort *= -1;
        return this.features.sort((a, b) => b.assignee.toLowerCase().localeCompare(a.assignee.toLowerCase()));
    }

    private prioritySort = 1;

    sortByPriority(): IFeature[] {
        if (this.prioritySort === 1) {
            this.prioritySort *= -1;
            return this.features.sort((a, b) => b.priorityValue - a.priorityValue);
        }
        this.prioritySort *= -1;
        return this.features.sort((a, b) => a.priorityValue - b.priorityValue);
    }

    private statusSort = 1;

    sortByStatus(): IFeature[] {
        if (this.statusSort === 1) {
            this.statusSort *= -1;
            return this.features.sort((a, b) => a.featureStatus.toLowerCase().localeCompare(b.featureStatus.toLowerCase()));
        }
        this.statusSort *= -1;
        return this.features.sort((a, b) => b.featureStatus.toLowerCase().localeCompare(a.featureStatus.toLowerCase()));
    }

    private datesSort = 1;

    sortByStartDate(): IFeature[] {
        if (this.datesSort === 1) {
            this.datesSort *= -1;
            return this.features.sort((a, b) => (b.startTime === null ? 0 : new Date(b.startTime).getTime()) - (a.startTime === null ? 0 : new Date(a.startTime).getTime()));
        }
        this.datesSort *= -1;
        return this.features.sort((a, b) => (a.startTime === null ? 0 : new Date(a.startTime).getTime()) - (b.startTime === null ? 0 : new Date(b.startTime).getTime()));
    }

    private timeCreatedSort = -1;

    sortByCreationTime(): IFeature[] {
        if (this.datesSort === 1) {
            this.datesSort *= -1;
            return this.features.sort((a, b) => new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime());
        }
        this.datesSort *= -1;
        return this.features.sort((a, b) => new Date(a.timeCreated).getTime() - new Date(b.timeCreated).getTime());
    }

    mounted(): void {
        store.dispatch("getFeatures");
        this.sortByCreationTime();
    }
}
</script>
