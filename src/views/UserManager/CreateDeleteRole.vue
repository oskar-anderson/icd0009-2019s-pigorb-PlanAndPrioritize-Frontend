<template>
    <div class="main">
    <h5>Create new role</h5>
    <hr />
    <h6 v-if="actionFailed === true" class="text-danger">{{errorMessage}}</h6>
    <h6 v-if="successMessage !== ''" class="text-success">{{successMessage}}</h6>
    <div class="row">
        <div class="col-md-3">
            <form>
                <div class="form-group">
                    <label class="control-label" for="roleName">Role name</label>
                    <input class="form-control" name="roleName" type="text" minlength="1" maxlength="64" v-model="roleCreate.roleName"/>
                </div>
                <div class="form-group">
                    <button type="submit" @click="createRoleOnClick()" class="btn btn-outline-success my-2 my-sm-0">Create role</button>
                </div>
            </form>
        </div>
    </div>
    <hr />

    <h5>Delete role</h5>

    <div class="row">
        <div class="col-md-3">
            <form>
                <div class="form-group">
                    <label class="control-label">Role name</label>
                    <select class="form-control" v-model="role.roleName">
                        <option v-for="role in roles" :key="role.name">
                            {{role.roleName}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" @click="deleteRoleOnClick()" class="btn btn-outline-success my-2 my-sm-0">Delete role</button>
                </div>
            </form>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IRole } from '../../domain/IRole';
import store from "../../store";

@Component
export default class CreateDeleteRole extends Vue {
    private roleCreate: IRole = {
        roleName: ''
    };

    private role: IRole = {
        roleName: ''
    };

    get roles(): IRole[] {
        return store.state.roles;
    }

    private errorMessage = '';
    private successMessage = '';
    private actionFailed = false;

    async createRoleOnClick(): Promise<void> {
        this.errorMessage = '';
        this.successMessage = '';
        this.actionFailed = false;

        const result = await store.dispatch('createRole', this.roleCreate);

        if (result === false) {
            this.actionFailed = true;
            this.errorMessage = 'Role creation failed!';
        } else {
            this.successMessage = 'Role created!';
        }
    }

    async deleteRoleOnClick(): Promise<void> {
        this.errorMessage = '';
        this.successMessage = '';
        this.actionFailed = false;

        const result = await store.dispatch('deleteRole', this.role);

        if (result === false) {
            this.actionFailed = true;
            this.errorMessage = 'Deleting the role failed!';
        } else {
            this.successMessage = 'Role deleted!';
        }
    }

    mounted(): void {
        console.log("mounted");
        store.dispatch("getRoles");
    }
}
</script>
