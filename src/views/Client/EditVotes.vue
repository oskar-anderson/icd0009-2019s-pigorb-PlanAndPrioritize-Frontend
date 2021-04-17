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
                <h5>Redo voting for '{{voting.title}}'</h5>
            </div>
            <div class="card-body">
                <h6 v-if="errorMessage != ''" class="text-danger">{{errorMessage}}</h6>
                <div v-for="feature in features" :key="feature.id">
                    <div class="bold">{{feature.title}}</div><br>
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
                            <p>Description </p>
                        </div>
                        <div class="column2">
                            <p>{{feature.description}}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="column1">
                            <label class="control-label">Task size</label>
                        </div>
                        <div class="column3">
                            <input v-model="feature.taskSize" type="number" min="1" step="1" class="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column1">
                            <label class="control-label">Business value</label>
                        </div>
                        <div class="column3">
                            <input v-model="feature.businessValue" type="number" min="0" step="1" class="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column1">
                            <label class="control-label">Time criticality</label>
                        </div>
                        <div class="column3">
                            <input v-model="feature.timeCriticality" type="number" min="0" step="1" class="form-control form-control-sm"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column1">
                            <label class="control-label">Risk vs opportunity</label>
                        </div>
                        <div class="column3">
                            <input v-model="feature.riskOrOpportunity" type="number" min="0" step="1" class="form-control form-control-sm"/>
                        </div>
                    </div>
                    <hr>
                </div>
                <div>
                    <router-link :to="{name: 'VotingDetails', params: { id: voting.id }}">
                        <button
                            type="submit"
                            class="btn btn-outline-success my-2 my-sm-0"
                            style="margin-right:15px;"
                        >Cancel</button>
                    </router-link>
                    <button type="submit" class="btn btn-outline-success my-2 my-sm-0" style="padding-right:20px; padding-left:20px;" @click="Vote()">Save</button>
                </div>
            </div>

        <div class="card-footer text-muted"></div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../../store";
import { IVoting } from "@/domain/IVoting";
import { IFeatureWithPriority } from "@/domain/IFeatureWithPriority";
import router from "@/router";

@Component
export default class EditVotes extends Vue {
    @Prop()
    private id!: string;

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    private errorMessage = "";

    get voting(): IVoting | null {
        return store.state.voting;
    }

    get features(): IFeatureWithPriority[] {
        return store.state.featuresWithPriority;
    }

    hasFeatures(): boolean {
        return this.features.length > 0;
    }

    async Vote(): Promise<void> {
        this.errorMessage = "";

        for (const feature of this.features) {
            if (feature.taskSize === undefined || feature.businessValue === undefined || feature.timeCriticality === undefined || feature.riskOrOpportunity === undefined ||
                feature.taskSize === null || feature.businessValue === null || feature.timeCriticality === null || feature.riskOrOpportunity === null) {
                this.errorMessage = "All values have to be filled!";
                break;
            } else if (!Number.isInteger(Number(feature.taskSize)) || !Number.isInteger(Number(feature.businessValue)) ||
                !Number.isInteger(Number(feature.timeCriticality)) || !Number.isInteger(Number(feature.riskOrOpportunity))) {
                this.errorMessage = "All values have to be integers!";
                break;
            } else if (Number(feature.taskSize) === 0) {
                this.errorMessage = "Task size has to be bigger than 0!";
                break;
            }
        }

        if (this.errorMessage === "") {
            for (const feature of this.features) {
                feature.votingId = this.id;
            }
            const result = await store.dispatch("editVotes", this.features);
            if (result === true) {
                router.push("/assigned");
            }
        }
    }

    mounted(): void {
        store.dispatch("getVoting", this.id);
        store.dispatch("getFeaturesWithUsersPriorities", this.id);
    }
}
</script>
