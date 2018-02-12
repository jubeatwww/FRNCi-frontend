import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/components/Main/Main';
import Home from '@/components/Home/Main';
import Profile from '@/components/Profile/Main';
import User from '@/components/User/Main';
import Policy from '@/components/Policy/Main';
import RegistProfile from '@/components/RegistProfile/Main';
import EmailVerification from '@/components/EmailVerification/Main';
import ControlPanel from '@/components/ControlPanel/Main';
import CtrlAccount from '@/components/ControlPanel/Account';
import CtrlProfile from '@/components/ControlPanel/Profile';

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
                    path: 'email-verification',
                    component: EmailVerification,
                    name: 'Email Verification',
                    beforeEnter(to, from, next) {
                        const { token } = to.query;
                        const [userId, authToken] = [
                            localStorage.getItem('_id'),
                            localStorage.getItem('_token'),
                        ];
                        const verifyInfo = { userId, token };

                        fetch(`${API_URL}/users/${userId}/confirm-verify`, {
                            mode: 'cors',
                            method: 'POST',
                            body: JSON.stringify(verifyInfo),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                Authorization: authToken,
                            }),
                        }).then((res) => {
                            if (res.ok) {
                                next('registprofile');
                                return res.json();
                            }
                            throw res;
                        }).catch((err) => {
                            console.error(err);
                            switch (err.status) {
                            case 400:
                                break;
                            case 401:
                                break;
                            default:
                                break;
                            }
                        });
                        next();
                    },
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
                {
                    path: 'controlpanel',
                    component: ControlPanel,
                    name: 'Control Panel',
                    children: [
                        {
                            path: 'account',
                            component: CtrlAccount,
                            meta: {
                                requireAuth: true,
                            },
                        },
                        {
                            path: 'profile',
                            component: CtrlProfile,
                            meta: {
                                requireAuth: true,
                            },
                        },
                    ],
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
        const response = await fetch(`${API_URL}/users/${userid}/integrity`, {
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
            console.error(err);
            if (to.meta.requireAuth) {
                next({ path: 'login' });
            }
        });
        // eslint-disable-next-line
        to.params.isLogin = response ? true : false;
        if (!response.integrity && to.name !== 'registprofile') {
            next({ path: 'registprofile' });
        } else {
            next();
        }
    } else if (to.meta.requireAuth) {
        next({ path: 'login' });
    } else {
        next();
    }
});

export default router;
