<template>
    <ul class="navbar-nav">
        <template v-if="isAuthenticated">
            <li class="nav-item">
                <span class="nav-link text-dark">Hi {{userEmail}}!</span>
            </li>
            <li class="nav-item">
                <a @click="logoutOnClick" class="nav-link text-dark" href>Logout</a>
            </li>
        </template>
        <li v-else class="nav-item">
            <router-link to="/login" class="nav-link text-dark">Login</router-link>
        </li>
    </ul>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";
import JwtDecode from 'jwt-decode';

@Component
export default class Identity extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get isAdmin(): boolean {
        return store.getters.isAdmin;
    }

    get userEmail(): string {
        if (store.getters.jwt) {
            const decoded = JwtDecode(store.getters.jwt) as Record<string, string>;
            return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        }
        return 'null';
    }

    logoutOnClick(): void {
        store.dispatch("clearJwt");
        router.push("/list");
    }
}
</script>
