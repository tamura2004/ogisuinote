import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import Task from '@/models/Task';
import { listen } from '@/plugins/firebase';

Vue.config.productionTip = false;

listen(store, Task);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
