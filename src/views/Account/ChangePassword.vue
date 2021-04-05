<template>
    <div v-if="isAuthenticated===true" class=main>
        <h5>Password change is required after first login</h5>
    <div class="row">
        <div class="col-md-3">
            <h6 v-if="passWordsDontMatch === true" class="text-danger">Passwords don't match!</h6>
            <h6 v-if="cantCange === true" class="text-danger">Error occurred while trying to change password. Password must be 6-100 characters long, contain upper and lower case letters, numbers and special characters!</h6>

            <hr />
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input v-model="passwordInfo.email" class="form-control" type="email" id="Input_Email" />
            </div>
            <div class="form-group">
                <label for="Input_Old_Password">Current password</label>
                <input
                    v-model="passwordInfo.oldPassword"
                    class="form-control"
                    type="password"
                    id="Input_Old_Password"
                />
            </div>
            <div class="form-group">
                <label for="Input_New_Password">New password</label>
                <input
                    v-model="passwordInfo.newPassword"
                    class="form-control"
                    type="password"
                    id="Input_New_Password"
                />
            </div>
            <div class="form-group">
                <label for="Input_Password_Confirm">Confirm new password</label>
                <input
                    v-model="confirmPassword"
                    class="form-control"
                    type="password"
                    id="Input_Password_Confirm"
                />
            </div>
            <div class="form-group">
                <button @click="changeOnClick($event)" class="btn btn-outline-success my-2 my-sm-0">Change password</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { IPasswordDTO } from "@/types/IPasswordDTO";
import store from "../../store";
import router from "../../router";

@Component
export default class ChangePassword extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    private passwordInfo: IPasswordDTO = {
        email: '',
        oldPassword: '',
        newPassword: ''
    };

    private confirmPassword = '';
    private passWordsDontMatch = false;
    private cantCange = false;

    async changeOnClick(): Promise<void> {
        this.passWordsDontMatch = false;
        this.cantCange = false;

        if (this.passwordInfo.newPassword !== this.confirmPassword) {
            this.passWordsDontMatch = true;
        } else {
            if (await store.dispatch("changePassword", this.passwordInfo)) {
                store.dispatch("clearJwt");
                router.push("/");
                location.reload();
            } else {
                this.cantCange = true;
            }
        }
    }
}
</script>
