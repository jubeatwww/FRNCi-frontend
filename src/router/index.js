import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/components/Main/Main';
import Home from '@/components/Home/Main';
import Profile from '@/components/Profile/Main';
import Usage from '@/components/Usage/Main';
import Policy from '@/components/Policy/Main';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import 'font-awesome/css/font-awesome.css';

import { API_URL } from '../config';


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

const router = new Router({
    routes: [
        {
            path: '/',
            component: Main,
            children: [
                {
                    path: '',
                    component: Home,
                    name: 'home',
                },
                {
                    path: 'profile/:id',
                    component: Profile,
                    name: 'profile',
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'login',
                    component: Usage,
                    name: 'login',
                },
                {
                    path: 'register',
                    component: Usage,
                    name: 'register',
                },
                {
                    path: 'termsofservice',
                    component: Policy,
                    name: 'Terms of Service',
                },
                {
                    path: 'privacypolicy',
                    component: Policy,
                    name: 'Privacy Policy',
                },
            ],
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    console.log(to, from);
    const [userid, token] = [
        localStorage.getItem('_id'),
        localStorage.getItem('_token'),
    ];
    if (userid && token) {
        const info = await fetch(`${API_URL}/users/${userid}`, {
            mode: 'cors',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: token,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).catch((err) => {
            console.log(err);
            if (to.meta.requireAuth) {
                next('login');
            }
        });
        console.log(info);
        // eslint-disable-next-line
        to.params.isLogin = true;
        next();
    }

    if (to.meta.requireAuth) {
        next('login');
    }
    next();
});

export default router;
