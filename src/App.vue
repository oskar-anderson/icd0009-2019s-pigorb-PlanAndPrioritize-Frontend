<template>
    <div>
        <header>
            <div class="main">
            <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div class="container">
                        <form v-if="isAuthenticated === true" class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search task" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                        <Identity />
                    </div>
                </div>
            </nav>
            </div>
        </header>
        <div v-if="isAuthenticated === true" class="sidenav">
            <router-link to="/" class="navbar-brand">Task List</router-link>
            <router-link to="/roadmap" class="navbar-brand">Roadmap</router-link>
            <router-link to="/assigned" class="navbar-brand">Assigned Votings</router-link>
            <span v-if="isAdmin === true">
                <router-link to="/usermanager" class="navbar-brand">Manage Users</router-link>
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
import { ISearch } from "./domain/ISearch";
import store from './store';

@Component({
    components: {
        Identity
    }
})

export default class App extends Vue {
    private search: ISearch = {
        searchPhrase: ""
    };

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get isAdmin(): boolean {
        return store.getters.isAdmin;
    }
}
</script>
