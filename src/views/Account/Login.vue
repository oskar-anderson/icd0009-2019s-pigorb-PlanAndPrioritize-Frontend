<template>
    <div class="main">
    <div class="row">
        <div class="col-md-3">
            <h4>Log in</h4>
            <h6 v-if="loginWasOk === false" class="text-danger">Bad login attempt!</h6>
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
                <button @click="loginOnClick()" class="btn btn-outline-success my-2 my-sm-0">Log in</button>
            </div>
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

    async loginOnClick(): Promise<void> {
        if (this.loginInfo.email.length > 0 && this.loginInfo.password.length > 0) {
            const isLoggedIn = await store.dispatch("authenticateUser", this.loginInfo);
            if (isLoggedIn) {
                console.log("User signed in");
                this.loginWasOk = true;
                const requirePasswordChange = store.state.requirePasswordChange;
                const hasAssignedOpenVotings = store.state.hasAssignedOpenVotings;
                let route = "/list";
                if (requirePasswordChange) {
                    route = "/changePassword";
                } else if (hasAssignedOpenVotings) {
                    route = "/assigned";
                }
                router.push(route);
            } else {
                this.loginWasOk = false;
            }
        };
    }
}
</script>
