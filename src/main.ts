import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/reset.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import moment from 'moment'
import { GGanttChart, GGanttRow } from 'vue-ganttastic';

Vue.prototype.moment = moment
Vue.prototype.GGanttChart = GGanttChart
Vue.prototype.GGanttRow = GGanttRow
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
