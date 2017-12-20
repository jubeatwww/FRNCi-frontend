import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/components/Main/Main';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

Vue.use(VueMaterial);
Vue.use(Router);

Vue.material.registerTheme({
    black: {
        primary: 'black',
    },
    orange: {
        primary: 'orange',
    },
});

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
        },
    ],
});
