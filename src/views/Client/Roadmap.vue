<template>
    <div class="main">
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else>
            <h5>Roadmap</h5>
            <br>
            <div class="form-group">
                <label class="control-label">Display period</label>
                <div class="row">
                    <div class="col-xs-4" style="padding-right:20px;">
                        <input type="date" v-model="graphStart" class="form-control" />
                    </div>
                    <div class="col-xs-4">
                        <input type="date" v-model="graphEnd" class="form-control" />
                    </div>
                </div>
            </div>
            <br>
            <g-gantt-chart
                :chart-start="graphStart"
                :chart-end="graphEnd"
                :row-label-width="`${rowLabelWidth}%`"
                theme="vue"
            >
                <g-gantt-row @click="routeToTask(feature.id)"
                    v-for="feature in features"
                    :key="feature.id"
                    :label="feature.title"
                    :bars="feature.bars"
                    bar-start="startDate"
                    bar-end="endDate"
                    :highlight-on-hover="highlightOnHover"
                >
                <template #bar-label="{bar}">
                    <span @click="routeToTask(feature.id)">{{bar.label}}</span>
                </template>
                </g-gantt-row>
            </g-gantt-chart>
        </div>
        <br>
        <div class="text-muted">
            <label class="control-label">Show number of tasks</label>
        </div>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" v-model="limit" type="number" min="1" step="1">
            <button @click="load()" class="btn btn-outline-success my-2 my-sm-0" type="submit">Load</button>
        </form>
    </div>
</template>

<script lang="ts">
import { IFeatureForGraph } from "@/domain/IFeatureForGraph";
import { Component, Vue } from "vue-property-decorator";
import store from "../../store";
import { GGanttChart, GGanttRow } from 'vue-ganttastic';
import moment from "moment";
import router from '@/router';

Vue.component('g-gantt-chart', GGanttChart);
Vue.component('g-gantt-row', GGanttRow);

@Component
export default class Roadmap extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get features(): IFeatureForGraph[] {
        return store.state.featuresForGraph;
    }

    private limit = 100;

    private graphStart = moment().startOf("day").format("YYYY-MM-DD");

    private graphEnd = moment().startOf("day").add(7, "days").format("YYYY-MM-DD");

    private highlightOnHover = true;

    // Change this if want to display task names on left column or not (0 will not show)
    private rowLabelWidth = 10;

    load(): void {
        store.dispatch("getFeaturesForGraph", this.limit);
    }

    routeToTask(featureId: string): void {
        router.push("/task/" + featureId)
    }

    mounted(): void {
        store.dispatch("getFeaturesForGraph", this.limit);
    }
}
</script>
