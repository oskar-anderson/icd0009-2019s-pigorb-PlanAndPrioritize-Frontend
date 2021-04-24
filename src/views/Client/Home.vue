<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>
    </div>
</template>

<script lang="ts">
import router from "@/router";
import { Component, Vue } from "vue-property-decorator";
import store from "./../../store";

@Component
export default class Home extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    mounted() {
        if (this.isAuthenticated) {
            router.push("/list");
        }
    }
}
</script>
