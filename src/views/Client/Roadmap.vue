<template>
    <div class="main">
        <h5>Roadmap</h5>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store";

@Component
export default class Roadmap extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    mounted(): void {
        // store.dispatch("getFeatures");
    }
}
</script>
