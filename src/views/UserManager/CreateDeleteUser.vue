<template>
    <div class="main">
    <h5>Add role to user</h5>
    <br>
    <h6 v-if="roleAddingFailed === true" class="text-danger">{{errorMessage}}</h6>
    <h6 v-if="roleAddingSucceeded === true" class="text-success">{{successMessage}}</h6>
    <div class="row">
        <div class="col-md-3">
            <form>

                <div class="form-group">
                    <label class="control-label">User</label>
                    <select class="form-control" v-model="userRoleToAdd.email">
                        <option v-for="user in users" :key="user.id">
                            {{user.email}}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="control-label">Role</label>
                    <select class="form-control" v-model="userRoleToAdd.roleName">
                        <option v-for="role in roles" :key="role.roleName">
                            {{role.roleName}}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <button type="submit" @click="addRoleToUser()" class="btn btn-outline-success my-2 my-sm-0">Add</button>
                </div>
            </form>
        </div>
    </div>
    <hr />

    <h5>Remove role from user</h5>
    <br>
    <h6 v-if="roleRemovingFailed === true" class="text-danger">{{errorMessage}}</h6>
    <h6 v-if="roleRemovingSucceeded === true" class="text-success">{{successMessage}}</h6>
    <div class="row">
        <div class="col-md-3">
            <form submit.trigger="onRemoveRole($event)">

                <div class="form-group">
                    <label class="control-label">User</label>
                    <select class="form-control" v-model="userRoleToRemove.email">
                        <option v-for="user in users" :key="user.id">
                            {{user.email}}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="control-label">Role</label>
                    <select class="form-control" v-model="userRoleToRemove.roleName">
                        <option v-for="role in roles" :key="role.roleName">
                            {{role.roleName}}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <button type="submit" @click="removeRoleFromUser()" class="btn btn-outline-success my-2 my-sm-0">Remove</button>
                </div>
            </form>
        </div>
    </div>
    <hr />

    <h5>Delete user</h5>
    <br>
    <h6 v-if="userDeletingFailed === true" class="text-danger">{{errorMessage}}</h6>
    <h6 v-if="userDeletingSucceeded === true" class="text-success">{{successMessage}}</h6>
    <div class="row">
        <div class="col-md-3">
            <form>
                <div class="form-group">
                    <label class="control-label">User</label>
                    <select class="form-control" v-model="userToDelete.email">
                        <option v-for="user in users" :key="user.email">
                            {{user.email}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" @click="deleteUser()" class="btn btn-outline-success my-2 my-sm-0">Delete</button>
                </div>
            </form>
        </div>
    </div>
    <hr />

    <h5>Create new user</h5>
    <br>
    <h6 v-if="userCreatingSucceeded === true" class="text-success">{{successMessage}}</h6>
    <h6 v-if="incorrectEmail === true" class="text-danger">Inncorrect email</h6>
    <h6 v-if="passWordsDontMatch === true" class="text-danger">Passwords don't match!</h6>
    <h6 v-if="userCreatingFailed === true" class="text-danger">{{errorMessage}}</h6>
    <div class="row">
        <div class="col-md-3">
            <form>
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input v-model="userToCreate.email" class="form-control" type="email" id="Input_Email" />
            </div>
            <div class="form-group">
                <label for="Input_firstName">First name</label>
                <input v-model="userToCreate.firstName" class="form-control" type="text" id="Input_firstName" />
            </div>
            <div class="form-group">
                <label for="Input_lastName">Last name</label>
                <input v-model="userToCreate.lastName" class="form-control" type="text" id="Input_lastName" />
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                    v-model="userToCreate.password"
                    class="form-control"
                    type="password"
                    id="Input_Password"
                />
            </div>
            <div class="form-group">
                <label for="Input_Password_Confirm">Confirm password</label>
                <input
                    v-model="confirmPassword"
                    class="form-control"
                    type="password"
                    id="Input_Password_Confirm"
                />
            </div>
                <div class="form-group">
                    <label class="control-label">Role</label>
                    <select class="form-control" v-model="userToCreate.roleName">
                        <option v-for="role in roles" :key="role.roleName">
                            {{role.roleName}}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <button type="submit" @click="createUserWithRole()" class="btn btn-outline-success my-2 my-sm-0">Create</button>
                </div>
            </form>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IRole } from '../../domain/IRole';
import { IUser } from '../../domain/IUser';
import { IUserCreate } from '../../domain/IUserCreate';
import { IUserDelete } from '../../domain/IUserDelete';
import { IUserRole } from '../../domain/IUserRole';
import store from "../../store";

@Component
export default class CreateDeleteUser extends Vue {
    private incorrectEmail = false;
    private passWordsDontMatch = false;
    private confirmPassword = '';

    private errorMessage = '';
    private successMessage = '';
    private roleAddingFailed = false;
    private roleAddingSucceeded = false;
    private roleRemovingFailed = false;
    private roleRemovingSucceeded = false;
    private userDeletingFailed = false;
    private userDeletingSucceeded = false;
    private userCreatingFailed = false;
    private userCreatingSucceeded = false;

    private userToCreate: IUserCreate = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        roleName: ''
    };

    private userToDelete: IUserDelete = {
        email: ''
    };

    private userRoleToAdd: IUserRole = {
        email: '',
        roleName: ''
    };

    private userRoleToRemove: IUserRole = {
        email: '',
        roleName: ''
    };

    get roles(): IRole[] {
        return store.state.roles;
    }

    get users(): IUser[] {
        return store.state.users;
    }

    resetActionsAndMessages(): void {
        this.errorMessage = '';
        this.successMessage = '';
        this.roleAddingFailed = false;
        this.roleAddingSucceeded = false;
        this.roleRemovingFailed = false;
        this.roleRemovingSucceeded = false;
        this.userDeletingFailed = false;
        this.userDeletingSucceeded = false;
        this.userCreatingFailed = false;
        this.userCreatingSucceeded = false;
        this.incorrectEmail = false;
        this.passWordsDontMatch = false;
    }

    async addRoleToUser(): Promise<void> {
        this.resetActionsAndMessages();
        const result = await store.dispatch('addRoleToUser', this.userRoleToAdd);

        if (result === false) {
            this.roleAddingFailed = true;
            this.errorMessage = 'Adding the role to user failed!';
        } else {
            this.roleAddingSucceeded = true;
            this.successMessage = 'Role added!';
        }
    }

    async removeRoleFromUser(): Promise<void> {
        this.resetActionsAndMessages();
        const result = await store.dispatch('removeRoleFromUser', this.userRoleToRemove);

        if (result === false) {
            this.roleRemovingFailed = true;
            this.errorMessage = 'Removing the role failed!';
        } else {
            this.roleRemovingSucceeded = true;
            this.successMessage = 'Role removed!';
        }
    }

    async deleteUser(): Promise<void> {
        this.resetActionsAndMessages();
        const result = await store.dispatch('deleteUser', this.userToDelete);

        if (result === false) {
            this.userDeletingFailed = true;
            this.errorMessage = 'Deleting the user failed!';
        } else {
            this.userDeletingSucceeded = true;
            this.successMessage = 'User deleted!';
        }
    }

    async createUserWithRole(): Promise<void> {
        this.resetActionsAndMessages();
        if (!this.userToCreate.email.includes("@")) {
            this.incorrectEmail = true;
            if (this.userToCreate.password !== this.confirmPassword) {
                this.passWordsDontMatch = true;
            }
        } else if (this.userToCreate.password !== this.confirmPassword) {
            this.passWordsDontMatch = true;
        } else {
            const result = await store.dispatch('createUserWithRole', this.userToCreate);

            if (result === false) {
                this.userCreatingFailed = true;
                this.errorMessage = "User creation failed! Check if user with such email doesn't already exist, all fields are filled and password is correct! " +
                                    "Password must be 6-100 characters long, contain upper and lower case letters, numbers and special characters!";
            } else {
                this.userCreatingSucceeded = true;
                this.successMessage = 'User created!';
            }
        }
    }

    mounted(): void {
        store.dispatch("getRoles");
        store.dispatch("getUsers");
    }
}
</script>
