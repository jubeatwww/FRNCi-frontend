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

import api from '@/actions/api/index';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

Vue.use(VueMaterial);
Vue.use(Router);
Vue.mixin({
    data() {
        return { api };
    },
});

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
                    path: 'email-verify-notice',
                    component: User,
                    name: 'EmailVerifyNotice',
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'email-verification',
                    component: EmailVerification,
                    name: 'Email Verification',
                    meta: {
                        requireAuth: true,
                    },
                    async beforeEnter(to, from, next) {
                        const { token: verifyToken } = to.query;
                        const [userId, authToken] = [
                            localStorage.getItem('_id'),
                            localStorage.getItem('_token'),
                        ];

                        const result = await api.user.confirmEmailVerify(
                            userId,
                            authToken,
                            verifyToken,
                        );
                        if (result.ok) {
                            next('registprofile');
                        }
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
                            name: 'ControlPanelAccount',
                            meta: {
                                requireAuth: true,
                            },
                        },
                        {
                            path: 'profile',
                            component: CtrlProfile,
                            name: 'ControlPanelProfile',
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
        const userInfo = await api.users.get(userid, token);
        const userIntegrity = await api.users.integrity(userid, token);

        if ((!userIntegrity.ok || !userInfo.ok) && to.meta.requireAuth) {
            next({ path: 'login' });
        }

        /* eslint-disable */
        to.params.isLogin = userInfo.ok;
        to.params.avatar = userInfo ? userInfo.photo : '';
        to.params.user = userInfo;
        /* eslint-enable */

        localStorage.setItem('_email', userInfo.email);

        if (to.name === 'EmailVerifyNotice' || to.name === 'registprofile') {
            if (userInfo.verification.email && userIntegrity.integrity) {
                next('/');
            } else {
                next();
            }
        } else {
            if (!(userInfo.verification.email || userInfo.verification.facebook)) {
                next({ path: 'email-verify-notice' });
            } else if (!userIntegrity.integrity) {
                next({ path: 'registprofile' });
            } else {
                next();
            }
            next();
        }
    } else if (to.meta.requireAuth) {
        next({ path: 'login' });
    } else {
        next();
    }
});

export default router;
