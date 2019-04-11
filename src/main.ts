import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import Task from '@/models/Task';
import { listen } from '@/plugins/firebase';
import uppperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

Vue.config.productionTip = false;

listen(store, Task);

const requireComponent = require.context(
  './components',
  false,
  /(Base|Task)\w+\.vue$/,
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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
