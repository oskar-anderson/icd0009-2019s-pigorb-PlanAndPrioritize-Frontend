<template>
    <div class="row">
        <div class="col-md-6">
            <h4>Register new account.</h4>
            <h5 v-if="incorrectEmail === true" class="text-danger">Incorrect email!</h5>
            <h5 v-if="passWordsDontMatch === true" class="text-danger">Passwords don't match!</h5>
            <h5 v-if="cantRegister === true" class="text-danger">Password must be 6-100 characters long, contain upper and lower case letters, numbers and special characters!</h5>
            <hr />
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input v-model="registerInfo.email" class="form-control" type="email" id="Input_Email" />
            </div>
            <div class="form-group">
                <label for="Input_firstName">First Name</label>
                <input v-model="registerInfo.firstName" class="form-control" type="text" id="Input_firstName" />
            </div>
            <div class="form-group">
                <label for="Input_lastName">Last Name</label>
                <input v-model="registerInfo.lastName" class="form-control" type="text" id="Input_lastName" />
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                    v-model="registerInfo.password"
                    class="form-control"
                    type="password"
                    id="Input_Password"
                />
            </div>
            <div class="form-group">
                <label for="Input_Password_Confirm">Confirm Password</label>
                <input
                    v-model="confirmPassword"
                    class="form-control"
                    type="password"
                    id="Input_Password_Confirm"
                />
            </div>
            <div class="form-group">
                <button @click="registerOnClick($event)" class="btn btn-primary">Register</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IRegisterDTO } from "@/types/IRegisterDTO";
import store from "../../store";
import router from "../../router";

@Component
export default class RegisterIndex extends Vue {
    private registerInfo: IRegisterDTO = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    };

    private confirmPassword = '';
    private incorrectEmail = false;
    private passWordsDontMatch = false;
    private cantRegister = false;

    async registerOnClick(): Promise<void> {
        this.passWordsDontMatch = false;
        this.cantRegister = false;
        this.incorrectEmail = false;
        if (!this.registerInfo.email.includes("@")) {
            this.incorrectEmail = true;
            if (this.registerInfo.password !== this.confirmPassword) {
                this.passWordsDontMatch = true;
            }
        } else if (this.registerInfo.password !== this.confirmPassword) {
            this.passWordsDontMatch = true;
        } else {
            if (await store.dispatch("registerUser", this.registerInfo)) {
                router.push("/account/login");
            } else {
                this.cantRegister = true;
            }
        }
    }
}
</script>
