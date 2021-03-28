<template>
    <div class="row">
        <div class="col-md-6">
            <h4>Use a local account to log in.</h4>
            <h5 v-if="loginWasOk === false" class="text-danger">Bad login attempt!</h5>
            <hr />
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input v-model="loginInfo.email" class="form-control" type="email" id="Input_Email" />
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                    v-model="loginInfo.password"
                    class="form-control"
                    type="password"
                    id="Input_Password"
                />
            </div>
            <div class="form-group">
                <button @click="loginOnClick($event)" class="btn btn-primary">Log in</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ILoginDTO } from "@/types/ILoginDTO";
import store from "../../store";
import router from "../../router";

@Component
export default class LoginIndex extends Vue {
    private loginInfo: ILoginDTO = {
        email: "piret@mail.ee",
        password: "Test_1"
    };

    private loginWasOk: boolean | null = null;

    loginOnClick(): void {
        if (
            this.loginInfo.email.length > 0 &&
            this.loginInfo.password.length > 0
        ) {
            store
                .dispatch("authenticateUser", this.loginInfo)
                .then((isLoggedIn: boolean) => {
                    if (isLoggedIn) {
                        console.log("User signed in");
                        this.loginWasOk = true;
                        const requirePasswordChange = store.state.requirePasswordChange;
                        let route = "/";
                        if (requirePasswordChange) {
                            route = "/account/changePassword";
                        }
                        router.push(route);
                        location.reload();
                    } else {
                        this.loginWasOk = false;
                        router.push("account/login");
                    }
                });
        }
    }
}
</script>
