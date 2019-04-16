import Vue from 'vue';
import Router from 'vue-router';

import TheNavigator from '@/views/TheNavigator.vue';
import TaskIndex from '@/views/TaskIndex.vue';
import UserIndex from '@/views/UserIndex.vue';
import UserTasks from '@/views/UserTasks.vue';
import UsersTasks from '@/views/UsersTasks.vue';
import Signin from '@/views/Signin.vue';
import Signup from '@/views/Signup.vue';
import ResetPassword from '@/views/ResetPassword.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/app',
      component: TheNavigator,
      meta: { guestAccess: true },
      children: [
        {
          path: 'tasks',
          component: TaskIndex,
          meta: { guestAccess: true },
        },
        {
          path: 'users',
          component: UserIndex,
          meta: { guestAccess: true },
        },
        {
          path: 'users/tasks',
          component: UsersTasks,
          meta: { guestAccess: true },
        },
        {
          path: 'user/:userId/tasks',
          component: UserTasks,
          meta: { guestAccess: true },
          props: true,
        },
      ],
    },
    {
      path: '/',
      component: Signin,
      meta: { guestAccess: true },
    },
    {
      path: '/signup',
      component: Signup,
      meta: { guestAccess: true },
    },
    {
      path: '/password',
      component: ResetPassword,
      meta: { guestAccess: true },
    },
  ],
});
