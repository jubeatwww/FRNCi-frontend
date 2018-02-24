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
import CtrlOrders from '@/components/ControlPanel/Orders';
import CtrlAttendees from '@/components/ControlPanel/Attendees';
import EventPage from '@/components/Event/Main';
import Purchase from '@/components/Product/Purchase';

import api from '@/actions/api/index';

import VueMaterial from 'vue-material';
import alertify from 'alertifyjs';
import 'vue-material/dist/vue-material.css';
import 'alertifyjs/build/css/alertify.min.css';

Vue.use(VueMaterial);
Vue.use(Router);
Vue.mixin({
    data() {
        return { api, alertify };
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

                        const result = await api.users.confirmEmailVerify(
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
                    redirect: '/controlpanel/account',
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
                        {
                            path: 'orders',
                            component: CtrlOrders,
                            name: 'ControlPanelOrders',
                            meta: {
                                requireAuth: true,
                            },
                        },
                        {
                            path: 'attendees',
                            component: CtrlAttendees,
                            name: 'ControlPanelAttendees',
                            meta: {
                                requireAuth: true,
                            },
                        },
                    ],
                },
                {
                    path: 'events/:slug',
                    component: EventPage,
                    name: 'Event',
                    meta: {
                        static: true,
                    },
                },
                {
                    path: 'purchase/:productId',
                    component: Purchase,
                    name: 'Purchase',
                    meta: {
                        requireAuth: true,
                    },
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
        if (to.meta.static) {
            next();
        } else {
            const userInfo = await api.users.get(userid, token);
            const userIntegrity = await api.users.integrity(userid, token);

            if ((!userIntegrity.ok || !userInfo.ok) && to.meta.requireAuth) {
                next({ path: '/login' });
            } else {
                /* eslint-disable */
                to.meta.isLogin = userInfo.ok;
                to.meta.avatar = userInfo ? userInfo.photo : '';
                to.meta.user = userInfo;
                /* eslint-enable */

                localStorage.setItem('_email', userInfo.email);

                if (to.name === 'Email Verification') {
                    next();
                } else if (to.name === 'EmailVerifyNotice') {
                    if (userInfo.verification.email) {
                        next('/');
                    } else {
                        next();
                    }
                } else if (to.name === 'registprofile') {
                    next();
                } else if (!(userInfo.verification.email || userInfo.verification.facebook)) {
                    next({ path: '/email-verify-notice' });
                } else if (!userIntegrity.integrity) {
                    next({ path: '/registprofile' });
                } else {
                    const paid = await api.users.paid(userid, token);
                    if (paid) {
                        next();
                    } else {
                        next({ path: '/registprofile', query: { tab: 'payment' } });
                    }
                }
            }
        }
    } else if (to.meta.requireAuth) {
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;
