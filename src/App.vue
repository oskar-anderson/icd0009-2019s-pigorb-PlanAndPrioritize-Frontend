<template>
    <div>
        <header>
            <div class="main">
            <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div class="container">
                        <form v-if="isAuthenticated === true" class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" v-model="search" maxlength="50" placeholder="Search task">
                            <button @click="searchOnClick()" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                        <Identity />
                    </div>
                </div>
            </nav>
            </div>
        </header>
        <div v-if="isAuthenticated === true" class="sidenav">
            <span @click="clearSearch()">
            <router-link to="/" class="navbar-brand">Task List</router-link>
            </span>
            <router-link to="/roadmap" class="navbar-brand">Roadmap</router-link>
            <router-link to="/assigned" class="navbar-brand">Assigned Votings</router-link>
            <router-link to="/categories" class="navbar-brand">Categories</router-link>
            <hr class="hr-grey" v-if="isAdmin === true">
            <span v-if="isAdmin === true">
                <router-link to="/votings" class="navbar-brand">Priority votings</router-link>
            </span>
            <span v-if="isAdmin === true">
                <router-link to="/usermanager" class="navbar-brand">Manage Users</router-link>
            </span>
            <hr class="hr-grey">
            <span>
                <router-link to="/contact" class="navbar-brand">Contact</router-link>
            </span>
            <span>
                <router-link to="/about" class="navbar-brand">About</router-link>
            </span>
        </div>
        <div class="container-fluid">
            <main role="main">
                <router-view />
            </main>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Identity from "./components/Identity.vue";
import router from "./router";
import store from './store';

@Component({
    components: {
        Identity
    }
})

export default class App extends Vue {
    private search = "";

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get isAdmin(): boolean {
        return store.getters.isAdmin;
    }

    searchOnClick(): void {
        store.dispatch("setSearch", this.search)
        store.dispatch("getFeatures");
        this.search = "";
        router.push("/")
    }

    clearSearch(): void {
        store.dispatch("setSearch", "")
        store.dispatch("getFeatures");
    }
}
</script>
