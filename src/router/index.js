import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/components/Main/Main';
import Home from '@/components/Home/Main';
import Profile from '@/components/Profile/Main';
import User from '@/components/User/Main';
import Policy from '@/components/Policy/Main';
import RegistProfile from '@/components/RegistProfile/Main';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

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
    mode: 'history',
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
                    component: User,
                    name: 'Login',
                },
                {
                    path: 'register',
                    component: User,
                    name: 'Register',
                },
                {
                    path: 'forgotpassword',
                    component: User,
                    name: 'ForgotPassword',
                },
                {
                    path: 'registprofile',
                    component: RegistProfile,
                    name: 'registprofile',
                    meta: {
                        requireAuth: true,
                    },
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
                next({ path: 'login' });
            }
        });
        // eslint-disable-next-line
        to.params.isLogin = info ? true : false;
        next();
    } else if (to.meta.requireAuth) {
        next({ path: 'login' });
    }
    next();
});

export default router;
