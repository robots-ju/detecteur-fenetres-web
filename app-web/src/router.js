import Vue from 'vue';
import VueRouter from 'vue-router';

import Auth from './views/Auth';
import User from './views/User';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
        path: '/',
        redirect: '/home',
        beforeEnter() {
          
        }
    },
    {
      path: '/home',
      component: User
    },
    {
      path: '/auth',
      component: Auth
    }
  ]
});

export default router;
