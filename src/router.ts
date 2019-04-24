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
import UserProfileUpdate from '@/views/UserProfileUpdate.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/app',
      component: TheNavigator,
      children: [
        {
          path: 'tasks',
          component: TaskIndex,
        },
        {
          path: 'users/index',
          component: UserIndex,
        },
        {
          path: 'users/tasks',
          component: UsersTasks,
        },
        {
          path: 'user/:userId/tasks',
          component: UserTasks,
          props: true,
        },
        {
          path: 'user/update',
          component: UserProfileUpdate,
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
