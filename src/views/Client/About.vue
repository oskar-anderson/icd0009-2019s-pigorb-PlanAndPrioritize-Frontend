<template>
    <div>
        <div v-if="isAuthenticated === false" class="about-section">
            <br>
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or contact your administrator to create a new account</h5>
        </div>

        <div v-else class="main">
        <div class="about-section">
            <h5>About</h5>
            <div> ... to be filled</div>
            <br>
            <div>* Priority value and size is only displayed for task if it's not in any open votings.</div>
            <div>* Priority is calculated based on last voting. If task is added into new voting (even not started yet) then previous priority value is not displayed any more</div>
            <div>* Other users priority values can only be seen after voting closes.</div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store";

@Component
export default class About extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }
}
</script>
