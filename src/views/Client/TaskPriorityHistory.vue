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
                <h5>{{feature.title}}</h5>
            </div>
            <div class="card-body">
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
                        <p>{{checkValue(feature.priorityValue)}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column1">
                        <p>Size </p>
                    </div>
                    <div class="column2">
                        <p>{{checkValue(feature.size)}}</p>
                    </div>
                </div>
                <br>
                <p class="bold">Priority values</p>
                <hr>
            <table class="table">
            <thead>
                <tr>
                    <th>User</th>
                    <th style="text-align:center">Priority value</th>
                    <th style="text-align:center">Size</th>
                    <th style="text-align:center">Business value</th>
                    <th style="text-align:center">Time criticality</th>
                    <th style="text-align:center">Risk/Opportunity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="priority in userPriorities" :key="priority.id">
                    <td>{{priority.userName}}</td>
                    <td style="text-align:center">{{priority.priorityValue}}</td>
                    <td style="text-align:center">{{priority.size}}</td>
                    <td style="text-align:center">{{priority.businessValue}}</td>
                    <td style="text-align:center">{{priority.timeCriticality}}</td>
                    <td style="text-align:center">{{priority.riskOrOpportunity}}</td>
                </tr>
            </tbody>
        </table>
            </div>
            <div class="card-footer text-muted"></div>
        </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IFeature } from "@/domain/IFeature";
import store from "../../store";
import moment from "moment";
import { IFeatureInVotingCreate } from "@/domain/IFeatureInVotingCreate";
import { IUsersFeaturePriority } from "@/domain/IUsersFeaturePriority";

@Component
export default class TaskPriorityHistory extends Vue {
    @Prop()
    private id!: string;

    @Prop()
    private votingId!: string;

    private featureInVoting: IFeatureInVotingCreate = {
        featureId: this.id,
        votingId: this.votingId
    };

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get feature(): IFeature | null {
        return store.state.feature;
    }

    get userPriorities(): IUsersFeaturePriority[] {
        return store.state.userFeaturePriorities;
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

    mounted(): void {
        store.dispatch("getFeature", this.id);
        store.dispatch("getUserPriorities", this.featureInVoting);
    }
}
</script>
