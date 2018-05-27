<template>
    <main>
        <div class="chatroom-wrapper">
            <nav>
                <router-link to="/chat/a" :class="unread>0 ? 'shownote':''">Accepted
                    <span class="red-notification"  v-if="unread > 0">{{unread}}</span>
                </router-link>
                <md-menu>
                    <md-button :class="recv>0 ? 'shownote':''" md-menu-trigger>Pending
                        <span class="red-notification" v-if="recv > 0">{{recv}}</span>
                    </md-button>

                    <md-menu-content>
                        <md-menu-item @click="toChatSend">Sent</md-menu-item>
                        <md-menu-item @click="toChatRecv">Received</md-menu-item>
                    </md-menu-content>
                </md-menu>
            </nav>
            <router-view name="chatrooms"></router-view>
        </div>
        <router-view name="content"></router-view>
    </main>
</template>

<script>
export default {
    data() {
        return {
            unread: 0,
            recv: 0,
        };
    },
    async beforeRouteUpdate(to, from, next) {
        this.updateMsgNotify();
        next();
    },
    created() {
        this.updateMsgNotify();
    },
    methods: {
        toChatSend() {
            this.$router.push('/chat/s');
        },
        toChatRecv() {
            this.$router.push('/chat/r');
        },
        async updateMsgNotify() {
            const resUnread = await this.api.messages.all();
            const resRecv = await this.api.invitations.all({ query: { role: 'to' } });
            if (resUnread.ok && resRecv.ok) {
                this.unread = resUnread.data.filter(m => m.unRead).length;
                this.recv = resRecv.data.length;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
main {
    display: flex;
    justify-content: center;
    max-width: 960px;
    height: calc(89vh - 70px);
    margin: 65px auto 2%;
    padding: 0 15px;
    
    .chatroom-wrapper {
        width: 33%;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid rgba(112, 112, 112, .4);
        border-right: 0;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        @media screen and (max-width: 768px) {
            width: 20%;
        }
        @media screen and (max-width: 576px) {
            width: 25%;
        }

        nav {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;

            @media screen and (max-width: 768px) {
                align-items: center;
                flex-direction: column;
                flex-wrap: nowrap;
            }
            @mixin red-notification {
                .red-notification {
                    background-color: #ef210f;
                    text-align: center;
                    padding: 3px 8px;
                    border-radius: 50%;
                    color: white;
                    font-size: 12px;
                    margin-left: 3px;
                    @media screen and (max-width: 768px) {
                        position: absolute;
                        left: 10%;
                        top: 64%;
                    }
                }
                &.shownote {
                    @media screen and (max-width: 768px) {
                        height: 80px;
                    }
                }
            }

            a {
                padding: 0.5rem 1rem;
                text-decoration: none;
                font-size: 1rem;
                font-weight: bold;
                line-height: 1.5;
                border-bottom: 2px solid #60bc90;
                .red-notification {
                    background-color: #ef210f;
                    text-align: center;
                    padding: 3px 8px;
                    border-radius: 50%;
                    color: white;
                    font-size: 12px;
                    margin-left: 3px;
                }
                @media screen and (max-width: 576px) {
                    width: 170%;
                    font-size: 14px;
                }
            }

            .md-menu {
                border-bottom: 2px solid #60bc90;
                > button {
                    width: 100%;
                    margin: 0;
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                    font-weight: bold;
                    line-height: 1.5;
                    @include red-notification();
                    @media screen and (max-width: 576px) {
                        font-size: 14px;
                    }
                }
            }
        }
    }

}
</style>
