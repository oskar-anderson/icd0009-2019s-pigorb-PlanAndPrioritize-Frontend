import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import AccountLogin from '../views/Account/Login.vue'
import AccountRegister from '../views/Account/Register.vue'
import UserManagerIndex from '../views/UserManager/Index.vue'
import CreateDeleteUser from '../views/UserManager/CreateDeleteUser.vue'
import CreateDeleteRole from '../views/UserManager/CreateDeleteRole.vue'
import ChangePassword from '../views/Account/ChangePassword.vue'

import TaskList from '../views/Client/TaskList.vue'
import Roadmap from '../views/Client/Roadmap.vue'
import AssignedVotings from '../views/Client/AssignedVotings.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    { path: '/', name: 'TaskList', component: TaskList },
    { path: '/roadmap', name: 'Roadmap', component: Roadmap },
    { path: '/assigned', name: 'AssignedVotings', component: AssignedVotings },

    { path: '/account/login', name: 'AccountLogin', component: AccountLogin },

    { path: '/usermanager', name: 'UserManagerIndex', component: UserManagerIndex },
    { path: '/usermanager/user', name: 'CreateDeleteUser', component: CreateDeleteUser },
    { path: '/usermanager/role', name: 'CreateDeleteRole', component: CreateDeleteRole },
    { path: '/account/changePassword', name: 'ChangePassword', component: ChangePassword }
]

const router = new VueRouter({
    routes
})

export default router
