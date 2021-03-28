<template>
    <ul class="navbar-nav">
        <li v-if="isAuthenticated === true" class="nav-item">
            <router-link to="/userManager/index" class="nav-link text-dark">User manager</router-link>
        </li>
        <template v-if="isAuthenticated">
            <li class="nav-item">
                <span class="nav-link text-dark">Hello {{userEmail}}!</span>
            </li>
            <li class="nav-item">
                <a @click="logoutOnClick" class="nav-link text-dark" href>Logout</a>
            </li>
        </template>
        <li v-else class="nav-item">
            <router-link to="/account/login" class="nav-link text-dark">Login</router-link>
        </li>
        <li v-if="isAuthenticated === false" class="nav-item">
            <router-link to="/account/register" class="nav-link text-dark">Register</router-link>
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
        router.push("/");
    }
}
</script>
