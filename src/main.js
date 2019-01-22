import Vue from 'vue';
import 'bootswatch/dist/litera/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vueResource from 'vue-resource';
import axios from "axios";
import pl from 'vee-validate/dist/locale/pl';
import VeeValidate, { Validator } from "vee-validate";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faCheck, faEdit, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import "chart.js";
import "hchs-vue-charts";



Vue.use(window.VueCharts);
library.add(faTrash, faCheck, faEdit, faBan);
Vue.use(vueResource);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Validator.localize('pl', pl);


axios.interceptors.request.use(function (config) {
  if(store.state.token) {
      config.headers.common['Authorization'] = `${store.state.token.tokenType} ${store.state.token.accessToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');




