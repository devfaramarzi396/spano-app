import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

import VueRouter from 'vue-router'
import {Routes} from './Routes.js'


import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const router = new VueRouter({
  routes: Routes,
  mode : 'history'
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
