import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import Task from '@/models/Task';
import { listen, listenUser } from '@/plugins/firebase';
import uppperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import moment from 'moment';

Vue.config.productionTip = false;

listen(store, Task);
listenUser(store);

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

Vue.filter('toTime', (value: number | null) => {
  if (value === null || value === 0) {
    return 'なし';
  } else {
    const hour = Math.floor(value);
    const minute = (value - hour) * 60;
    let str = '';
    if (hour !== 0) {
      str += `${hour}時間`;
    }
    if (minute !== 0) {
      str += `${minute}分`;
    }
    return str;
  }
});

Vue.filter('toDate', (value: number) => {
  moment.locale('ja');
  return moment(value).format('YYYY年M月D日(ddd)');
});

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
