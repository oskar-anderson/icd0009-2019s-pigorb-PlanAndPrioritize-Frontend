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
            <h5>Contact</h5>
            <div>Sebastian Sõeruer</div>
            <div>IT-manager</div>
            <div>(+372) 5665 6151</div>
            <div>(+372) 600 5151</div>
            <div>sebastian.soeruer@byroomaailm.ee</div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store";

@Component
export default class Contact extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }
}
</script>
