import Vue from 'vue';
import Router from 'vue-router';

import TaskIndex from '@/views/TaskIndex.vue';
import Signin from '@/views/Signin.vue';
import Signup from '@/views/Signup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: TaskIndex,
    },
    {
      path: '/signin',
      component: Signin,
    },
    {
      path: '/signup',
      component: Signup,
    },
  ],
});
