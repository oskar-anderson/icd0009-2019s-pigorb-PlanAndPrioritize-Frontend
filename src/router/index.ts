import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

import AccountLogin from '../views/Account/Login.vue'
import AccountRegister from '../views/Account/Register.vue'
import UserManagerIndex from '../views/UserManager/Index.vue'
import CreateDeleteUser from '../views/UserManager/CreateDeleteUser.vue'
import CreateDeleteRole from '../views/UserManager/CreateDeleteRole.vue'
import ChangePassword from '../views/Account/ChangePassword.vue'

import TaskList from '../views/Client/TaskList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    { path: '/', name: 'Home', component: Home },

    { path: '/account/login', name: 'AccountLogin', component: AccountLogin },
    { path: '/account/register', name: 'AccountRegister', component: AccountRegister },
    { path: '/userManager/index', name: 'UserManagerIndex', component: UserManagerIndex },
    { path: '/userManager/createDeleteUser', name: 'CreateDeleteUser', component: CreateDeleteUser },
    { path: '/userManager/createDeleteRole', name: 'CreateDeleteRole', component: CreateDeleteRole },
    { path: '/account/changePassword', name: 'ChangePassword', component: ChangePassword },

    { path: '/client/taskList', name: 'TaskList', component: TaskList }
]

const router = new VueRouter({
    routes
})

export default router
