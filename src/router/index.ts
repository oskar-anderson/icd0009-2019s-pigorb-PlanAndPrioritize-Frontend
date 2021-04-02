import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import AccountLogin from '../views/Account/Login.vue'
import UserManagerIndex from '../views/UserManager/Index.vue'
import CreateDeleteUser from '../views/UserManager/CreateDeleteUser.vue'
import CreateDeleteRole from '../views/UserManager/CreateDeleteRole.vue'
import ChangePassword from '../views/Account/ChangePassword.vue'

import TaskList from '../views/Client/TaskList.vue'
import TaskCreate from '../views/Client/TaskCreate.vue'
import Roadmap from '../views/Client/Roadmap.vue'
import AssignedVotings from '../views/Client/AssignedVotings.vue'
import Categories from '../views/Client/Categories.vue'
import CategoryCreate from '../views/Client/CategoryCreate.vue'
import CategoryEdit from '../views/Client/CategoryEdit.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    { path: '/', name: 'TaskList', component: TaskList },
    { path: '/create-task', name: 'TaskCreate', component: TaskCreate },
    { path: '/roadmap', name: 'Roadmap', component: Roadmap },
    { path: '/assigned', name: 'AssignedVotings', component: AssignedVotings },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/create-category', name: 'CategoryCreate', component: CategoryCreate },
    { path: '/edit-category/:id?', name: 'CategoryEdit', component: CategoryEdit, props: true },

    { path: '/login', name: 'AccountLogin', component: AccountLogin },

    { path: '/usermanager', name: 'UserManagerIndex', component: UserManagerIndex },
    { path: '/user', name: 'CreateDeleteUser', component: CreateDeleteUser },
    { path: '/role', name: 'CreateDeleteRole', component: CreateDeleteRole },
    { path: '/changePassword', name: 'ChangePassword', component: ChangePassword }
]

const router = new VueRouter({
    routes
})

export default router
