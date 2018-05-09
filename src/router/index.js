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

import Chat from '@/components/Chat/Main';
import AcceptChatrooms from '@/components/Chat/Chatrooms/AcceptChatrooms';
import SendChatrooms from '@/components/Chat/Chatrooms/SendChatrooms';
import RecvChatrooms from '@/components/Chat/Chatrooms/RecvChatrooms';
import AcceptContent from '@/components/Chat/Contents/AcceptContent';
import SendContent from '@/components/Chat/Contents/SendContent';
import RecvContent from '@/components/Chat/Contents/RecvContent';
import DefaultContent from '@/components/Chat/Contents/DefaultContent';

import api from '@/actions/api/index';

import VueMaterial from 'vue-material';
import alertify from 'alertifyjs';
import 'vue-material/dist/vue-material.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import customAlertify from '../lib/CustomAlertify';

Vue.use(VueMaterial);
Vue.use(Router);

alertify.dialog('AlertInvite', customAlertify.InvitePrompt, true, 'prompt');
alertify.dialog('InviteReject', customAlertify.InviteReject, true, 'confirm');
alertify.dialog('InviteCancel', customAlertify.InviteCancel, true, 'confirm');

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
                    meta: {
                        region: localStorage.getItem('region'),
                        static: true,
                    },
                },
                {
                    path: 'profile/:id',
                    component: Profile,
                    name: 'profile',
                    meta: {
                        requireAuth: true,
                        static: true,
                    },
                    async beforeEnter(to, from, next) {
                        const apiArgs = { params: { userId: to.params.id } };
                        /* eslint-disable */
                        if (to.params.id !== 'me' && to.params.id !== localStorage.getItem('_id')) {
                            to.meta.otherUser = {
                                user: await api.users.profile(apiArgs),
                                userIntegrity: await api.users.integrity(apiArgs),
                                invitation: await api.invitations.get(apiArgs),
                            };
                        }
                        /* eslint-enable */
                        next();
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
                    path: 'forgot-pw',
                    component: User,
                    name: 'ResetPassword',
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
                        const { token } = to.query;
                        const userId = localStorage.getItem('_id');

                        const result = await api.users.confirmEmailVerify({
                            params: { userId: 'me' },
                            body: { userId, token },
                        });
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
                    meta: {
                        static: true,
                    },
                },
                {
                    path: 'privacypolicy',
                    component: Policy,
                    name: 'Privacy Policy',
                    meta: {
                        static: true,
                    },
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
                {
                    path: 'chat',
                    component: Chat,
                    name: 'Chat',
                    redirect: '/chat/a',
                    children: [
                        {
                            path: 'a',
                            name: 'Chat Accept No Content',
                            components: {
                                chatrooms: AcceptChatrooms,
                                content: DefaultContent,
                            },
                            meta: {
                                requireAuth: true,
                                static: true,
                            },
                        },
                        {
                            path: 's',
                            name: 'Chat Send No Content',
                            components: {
                                chatrooms: SendChatrooms,
                                content: DefaultContent,
                            },
                            meta: {
                                requireAuth: true,
                                static: true,
                            },
                        },
                        {
                            path: 'r',
                            name: 'Chat Recv No Content',
                            components: {
                                chatrooms: RecvChatrooms,
                                content: DefaultContent,
                            },
                            meta: {
                                requireAuth: true,
                                static: true,
                            },
                        },
                        {
                            path: 'a/:userId',
                            name: 'ChatAccept',
                            components: {
                                chatrooms: AcceptChatrooms,
                                content: AcceptContent,
                            },
                            meta: {
                                requireAuth: true,
                                static: true,
                            },
                        },
                        {
                            path: 's/:userId',
                            name: 'ChatSend',
                            components: {
                                chatrooms: SendChatrooms,
                                content: SendContent,
                            },
                            meta: {
                                requireAuth: true,
                                static: true,
                            },
                        },
                        {
                            path: 'r/:userId',
                            name: 'ChatReceive',
                            components: {
                                chatrooms: RecvChatrooms,
                                content: RecvContent,
                            },
                            meta: {
                                requireAuth: true,
                                static: true,
                            },
                        },

                    ],
                },
                {
                    path: '*',
                    redirect: { path: '/' },
                },
            ],
        },
    ],
});

function logout(nextFn, redirectToLogin) {
    localStorage.clear();
    if (redirectToLogin) {
        nextFn({ path: '/login' });
    } else {
        nextFn();
    }
}

router.beforeEach(async (to, from, next) => {
    if (to.path.indexOf('chat') >= 0) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'scroll';
    }
    console.log('route before each', to);
    const token = localStorage.getItem('_token');
    const userId = localStorage.getItem('_id');
    if (token) {
        const apiArgs = { params: { userId } };
        if (to.meta.static) {
            /* eslint-disable */
            try {
                const userInfo = await api.users.get(apiArgs);
                const userIntegrity = await api.users.integrity(apiArgs);
                to.meta.isLogin = userInfo.ok;
                to.meta.avatar = userInfo ? userInfo.photo : '';
                to.meta.user = { user: userInfo, userIntegrity };
                localStorage.setItem('_email', userInfo.email);
            } catch (e) {
                to.meta.isLogin = false;
                logout(next, false);
                return;
            }
            /* eslint-enable */
            next();
        } else {
            try {
                const userInfo = await api.users.get(apiArgs);
                const userIntegrity = await api.users.integrity(apiArgs);
                if ((!userIntegrity.ok || !userInfo.ok) && to.meta.requireAuth) {
                    next({ path: '/login' });
                } else {
                    /* eslint-disable */
                    to.meta.isLogin = userInfo.ok;
                    to.meta.avatar = userInfo ? userInfo.photo : '';
                    to.meta.user = { user: userInfo, userIntegrity };
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
                        const paid = await api.users.paid(localStorage.getItem('_id'), token);
                        if (paid) {
                            next();
                        } else if (to.name === 'ControlPanelAccount' || to.name === 'ControlPanelProfile') {
                            next();
                        } else {
                            next({ path: '/registprofile', query: { tab: 'payment' } });
                        }
                    }
                }
            } catch (ignored) {
                // eslint-disable-next-line
                to.meta.isLogin = false;
                logout(next, true);
            }
        }
    } else if (to.meta.requireAuth) {
        // eslint-disable-next-line
        to.meta.isLogin = false;
        next({ path: '/login' });
    } else {
        // eslint-disable-next-line
        to.meta.isLogin = false;
        next();
    }
});

export default router;
