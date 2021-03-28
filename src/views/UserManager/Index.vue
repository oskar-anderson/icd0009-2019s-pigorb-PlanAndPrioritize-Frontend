<template>
    <div>
    <h4>Current Users</h4>
<table class="table">
    <thead>
    <tr>
        <th>
            Email
        </th>
        <th>
            Roles
        </th>
        <th></th>
    </tr>
    </thead>
    <tbody>
        <tr v-for="user in users" :key="user.id">
            <td>
                {{user.email}}
            </td>
            <td>
                {{user.roles}}
            </td>
        </tr>
    </tbody>
</table>

<div>
    <router-link :to="{name: 'CreateDeleteRole'}">
        <button type="submit" class="btn btn-primary">Manage roles</button>
    </router-link> &nbsp;
    <router-link :to="{name: 'CreateDeleteUser'}">
        <button type="submit" class="btn btn-primary">Manage users</button>
    </router-link>
</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IUser } from "../../domain/IUser";
import store from "../../store";

@Component
export default class UserManagerIndex extends Vue {
    get users(): IUser[] {
        return store.state.users;
    }

    mounted(): void {
        console.log("mounted");
        store.dispatch("getUsers");
    }
}
</script>
