import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import Task from '@/models/Task';
import User from '@/models/User';
import { listen, listenUser } from '@/plugins/firebase';
import uppperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import toDate from '@/filters/ToDate';
import toTime from '@/filters/ToTime';

Vue.config.productionTip = false;

listen(store, Task);
listen(store, User);

listenUser(store); // listen current user

const requireComponent = require.context(
  './components',
  false,
  /\w+\.vue$/,
);

requireComponent.keys().forEach((fileName: any) => {
  const componentConfig = requireComponent(fileName);
  const componentName = uppperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  );
  Vue.component(
    componentName,
    componentConfig.default || componentConfig,
  );
});

Vue.filter('toTime', toTime);
Vue.filter('toDate', toDate);

router.beforeEach((to, from, next) => {
  if (store.state.user || to.matched.some((record) => record.meta.guestAccess)) {
    next();
  } else {
    next({ path: '/' });
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
