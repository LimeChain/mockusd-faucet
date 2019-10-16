import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
  render: (h) => h(App),
}).$mount('#app');
