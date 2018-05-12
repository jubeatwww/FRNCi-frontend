<template>
    <section>
        <template v-if="content !== ''">
            <header>
                <div class="chat-content-avatar">
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <img :src="otherUser.photo" alt="Avatar">
                    </md-avatar>
                </div>
                <div class="chat-content-info">
                    <div>You get a new request from {{otherUser.firstName}}. He/She is looking forward to your reply!</div>
                    <div class="invitation-ctrl">
                        <button class="btn-accept" @click="accept">Accept</button>
                        <button class="btn-ignore" @click="reject">Ignore</button>
                    </div>
                </div>
            </header>
            <article>
                <ul>
                    <li class="other-message message">
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
import { recv } from '../../../utils/mixins/ChatContent';

export default {
    mixins: [recv],
    async beforeRouteUpdate(to, from, next) {
        if (to.params.userId) {
            const apiArgs = {
                params: { userId: to.params.userId },
            };
            const res = await this.api.invitations.get(apiArgs);
            if (res.ok) {
                this.content = res.content;
                this.otherUser = res.from;
            }
        }
        next();
    },
    methods: {
        async accept() {
            this.api.invitations.confirm({
                params: { userId: this.$route.params.userId },
            });
        },
        async reject() {
            this.alertify.InviteReject(
                `Are you sure you want to ignore this request?
                This chat box will be closed afterwards.`,
                async () => {
                    const res = await this.api.invitations.reject({
                        params: { userId: this.$route.params.userId },
                    });
                    if (res.ok) {
                        this.$router.push({ path: '/chat/r' });
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

            .invitation-ctrl {
                width: 25%;
                display: flex;
                flex-direction: column;
                .btn-accept {
                    border: 2px solid #60bc90;
                    background-color: #60bc90;
                    padding: 4px 20px;
                    color: white;
                    margin: 5% 0 5%;
                    white-space: unset;
                    font-size: 1rem;
                    line-height: 1.5;
                    border-radius: 0.25rem;
                    font-weight: bold;
                    cursor: pointer;
                }
                .btn-ignore {
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

                &.other-message {
                    align-self: flex-start;
                    .detail {
                        display: flex;
                        i {
                            color: #60bc90;
                        }
                    }
                    .content {
                        display: block;
                        position: relative;
                        background-color: #60bc90;
                        float: left;
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
                        border-bottom-color: #60bc90;

                        &:after {
                       bottom: 100%;
                            bottom: 100%;
                            left: 25%;
                            border: solid transparent;
                            content: " ";
                            height: 0;
                            width: 0;
                            position: absolute;
                            pointer-events: none;
                            border-width: 10px;
                            border-bottom-color: #60bc90;
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
