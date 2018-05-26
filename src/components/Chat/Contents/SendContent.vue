<template>
    <section>
        <template v-if="content !== ''">
            <header>
                <div class="chat-content-avatar">
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <router-link :to="`/profile/${otherUser._id}`">
                            <img :src="otherUser.photo" alt="Avatar">
                        </router-link>
                    </md-avatar>
                </div>
                <div class="chat-content-info">
                    <div>{{otherUser.firstName}} has not replied your request. You can either cancel the request or wait.</div>
                    <div class="invitation-ctrl">
                        <button class="btn-cancel" @click="cancel">Cancel</button>
                    </div>
                </div>
            </header>
            <article>
                <ul>
                    <li class="my-message message">
                        <div class="detail">
                            {{ otherUser.firstName }}
                        </div>
                        <div class="content">
                            {{ content }}
                        </div>
                    </li>
                </ul>
            </article>
            <footer>
                <textarea name="message" rows="3" disabled></textarea>
                <button>Send</button>
            </footer>
        </template>
    </section>
</template>

<script>
import { send } from '../../../utils/mixins/ChatContent';

export default {
    mixins: [send],
    async beforeRouteUpdate(to, from, next) {
        if (to.params.userId) {
            const apiArgs = {
                params: { userId: to.params.userId },
            };
            const res = await this.api.invitations.get(apiArgs);
            if (res.ok) {
                this.content = res.content;
                this.otherUser = res.to;
            }
        }
        next();
    },
    methods: {
        async cancel() {
            this.alertify.InviteCancel(
                `Are you sure you want to cancel your request?
                This chat box will be closed afterwards.`,
                async () => {
                    const res = await this.api.invitations.cancel({
                        params: { userId: this.$route.params.userId },
                    });
                    if (res.ok) {
                        this.$router.push({ path: '/chat/s' });
                    }
                },
            );
        },
    },
};
</script>

<style lang="scss" scoped>
section {
    width: 66%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 15px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid rgba(112, 112, 112, .4);
    header {
        display: flex;
        padding: 20px;
        border-bottom: 1px solid rgba(112, 112, 112, .4);
        @media screen and (max-width: 768px) {
            flex-direction: column;
        }

        .chat-content-avatar {
            width: 16.666667%;
            .md-avatar {
                height: 80px;
                width: 80px;
                margin: 0;
            }
        }

        .chat-content-info {
            width: 83.333333%;
            text-align: left;
            padding: 0 0 0 15px;
            display: flex;
            @media screen and (max-width: 768px) {
                flex-direction: column;
                font-size: 14px;
                width: 100%;
            }

            .invitation-ctrl {
                width: 25%;
                display: flex;
                flex-direction: column;
                @media screen and (max-width: 768px) {
                    flex-direction: row;
                }
                @media screen and (max-width: 400px) {
                    flex-direction: column;
                    width: 100%;
                }
                .btn-cancel {
                    border: 2px solid #60bc90;
                    background-color: transparent;
                    padding: 4px 20px;
                    color: #60bc90;
                    margin: 5% 0 5%;
                    white-space: unset;
                    font-size: 1rem;
                    line-height: 1.5;
                    border-radius: 0.25rem;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
        }
    }
    article {
        height: calc(100% - 290px);
        @media screen and (max-width: 768px) {
            height: calc(100% - 360px);
        }
        @media screen and (max-width: 576px) {
            height: calc(100% - 400px);
        }
        @media screen and (max-width: 400px) {
            height: calc(100% - 460px);
        }
        ul {
            height: 100%;
            list-style: none;
            display: flex;
            flex-direction: column-reverse;
            overflow: scroll;
            margin: 16px 0 0 0;
            padding: 0;

            li {
                width: 66%;

                &.my-message {
                    align-self: flex-end;
                    .detail {
                        display: flex;
                        flex-direction: row-reverse;
                        i {
                            color: #f8b62c;
                        }
                        .time {
                            padding: 0 10px;
                            font-size: 14px;
                            color: #a8aab1;
                        }
                    }

                    .content {
                        display: block;
                        position: relative;
                        background-color: #f8b62c;
                        float: right;
                        color: white;
                        padding: 18px 20px;
                        line-height: 26px;
                        font-size: 16px;
                        border-radius: 7px;
                        margin: 8px 0 30px;
                        max-width: 90%;
                        text-align: left;
                        word-wrap: break-word;
                        word-break: normal;
                        &:after {
                            bottom: 100%;
                            right: 8%;
                            border: solid transparent;
                            content: " ";
                            height: 0;
                            width: 0;
                            position: absolute;
                            pointer-events: none;
                            border-bottom-color: #f8b62c;
                            border-width: 10px;
                            margin-left: -10px;
                        }
                    }
                }
            }
        }

        .first-msg {
            order: 2;
        }

        .show-hello {
            order: 1;
        }

        .hide-hello {
            display: none;
        }
    }

    footer {
        padding: 1.5rem;
        @media screen and (max-width: 576px) {
            padding: 1.5rem 0;
        }
        textarea {
            width: 100%;
            padding: 10px 20px;
            margin-bottom: 10px;
            border-radius: 5px;
            resize: none;
            border: 1px solid rgba(112, 112, 112, .4);

        }

        button {
            border: 2px solid #f8b62c;
            background-color: #f8b62c;
            padding: 4px 20px;
            color: #fff !important;
            letter-spacing: 1px;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            float: right;
        }
    }

}
</style>
