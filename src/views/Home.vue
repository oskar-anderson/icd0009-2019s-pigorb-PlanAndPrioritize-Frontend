<template>
    <div>
        <div v-if="isAuthenticated === false" class="text-center">
            <h2>Plan and prioritize your work</h2>
            <br />
            <h5>Please log in or create an account</h5>
        </div>
        <div v-if="isAuthenticated === true" class="text-center">
            <h5>Plan and prioritize your work</h5>
            <hr />
            <br />
        </div>

        <div v-if="isAuthenticated === true" class="text-center">
            <form class="form-inline">
                <div class="form-group" style="margin-right:40px;">
                    <router-link :to="{name: 'TaskList'}">
                        <button
                            type="submit"
                            class="btn btn-primary"
                        >Task list</button>
                    </router-link>
                </div>
                <div class="form-group" style="margin-right:10px;">
                    <input v-model="search.searchPhrase" class="form-control" />
                </div>&nbsp;&nbsp;
                <div class="form-group" style="margin-right:40px;">
                    <button
                        @click="searchOnClick(search.searchPhrase)"
                        type="submit"
                        class="btn btn-primary"
                        style="margin-right:10px;"
                    >search</button>
                    <button
                        @click="searchOnClick('')"
                        type="submit"
                        class="btn btn-secondary"
                    >Reset</button>
                </div>
                <router-link :to="{name: 'TaskList'}">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        style="margin-right:40px;"
                    >Task list</button>
                </router-link>
                <router-link :to="{name: 'TaskList'}">
                    <button
                        type="submit"
                        class="btn btn-primary"
                    >Task list</button>
                </router-link>
            </form>
            <br />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ISearch } from "./../domain/ISearch";
import store from "./../store";
import router from '../router';

@Component
export default class Home extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    private search: ISearch = {
        searchPhrase: ""
    };

    searchOnClick(search: string): void {
        // store.dispatch("getBooks", search);
    }

    async GoToDetails(id: string): Promise<void> {
        // await store.dispatch("getBook", id);
        // await store.dispatch("getUserBooksForBook", id);
        // router.push({ name: 'BookDetails', params: { id: id } });
    }

    mounted(): void {
        // store.dispatch("getBooks", "");
    }
}
</script>
