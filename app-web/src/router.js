import Vue from 'vue';
import VueRouter from 'vue-router';

import Auth from './views/Auth';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/auth',
            component: Auth
        }
    ]
})

export default router;