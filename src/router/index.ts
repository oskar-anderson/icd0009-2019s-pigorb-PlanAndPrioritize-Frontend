import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import AccountLogin from '../views/Account/Login.vue'
import UserManagerIndex from '../views/UserManager/Index.vue'
import CreateDeleteUser from '../views/UserManager/CreateDeleteUser.vue'
import CreateDeleteRole from '../views/UserManager/CreateDeleteRole.vue'
import ChangePassword from '../views/Account/ChangePassword.vue'

import Home from '../views/Client/Home.vue'
import TaskList from '../views/Client/TaskList.vue'
import TaskCreate from '../views/Client/TaskCreate.vue'
import TaskEdit from '../views/Client/TaskEdit.vue'
import TaskDetails from '../views/Client/TaskDetails.vue'

import Contact from '../views/Client/Contact.vue'
import About from '../views/Client/About.vue'
import Roadmap from '../views/Client/Roadmap.vue'
import AssignedVotings from '../views/Client/AssignedVotings.vue'
import Categories from '../views/Client/Categories.vue'
import CategoryCreate from '../views/Client/CategoryCreate.vue'
import CategoryEdit from '../views/Client/CategoryEdit.vue'

import Votings from '../views/Client/Votings.vue'
import VotingCreate from '../views/Client/VotingCreate.vue'
import VotingDetails from '../views/Client/VotingDetails.vue'
import VotingEdit from '../views/Client/VotingEdit.vue'
import Vote from '../views/Client/Vote.vue'
import EditVotes from '../views/Client/EditVotes.vue'
import TaskPriorityHistory from '../views/Client/TaskPriorityHistory.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    { path: '/', name: 'Home', component: Home },
    { path: '/list', name: 'TaskList', component: TaskList, props: true },
    { path: '/create-task', name: 'TaskCreate', component: TaskCreate },
    { path: '/edit-task/:id?', name: 'TaskEdit', component: TaskEdit, props: true },
    { path: '/task/:id?', name: 'TaskDetails', component: TaskDetails, props: true },
    { path: '/task-priorities/:id?', name: 'TaskPriorityHistory', component: TaskPriorityHistory, props: true },

    { path: '/roadmap', name: 'Roadmap', component: Roadmap },

    { path: '/assigned', name: 'AssignedVotings', component: AssignedVotings },

    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/create-category', name: 'CategoryCreate', component: CategoryCreate },
    { path: '/edit-category/:id?', name: 'CategoryEdit', component: CategoryEdit, props: true },

    { path: '/votings', name: 'Votings', component: Votings },
    { path: '/create-voting', name: 'VotingCreate', component: VotingCreate },
    { path: '/voting/:id?', name: 'VotingDetails', component: VotingDetails, props: true },
    { path: '/edit-voting/:id?', name: 'VotingEdit', component: VotingEdit, props: true },
    { path: '/vote/:id?', name: 'Vote', component: Vote, props: true },
    { path: '/re-vote/:id?', name: 'EditVotes', component: EditVotes, props: true },

    { path: '/login', name: 'AccountLogin', component: AccountLogin },
    { path: '/usermanager', name: 'UserManagerIndex', component: UserManagerIndex },
    { path: '/user', name: 'CreateDeleteUser', component: CreateDeleteUser },
    { path: '/role', name: 'CreateDeleteRole', component: CreateDeleteRole },
    { path: '/changePassword', name: 'ChangePassword', component: ChangePassword },

    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/about', name: 'About', component: About }
]

const router = new VueRouter({
    routes
})

export default router
