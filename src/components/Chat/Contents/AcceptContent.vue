<template>
    <section>
        <template v-if="messages.length > 0">
            <header>
                <div class="chat-content-avatar">
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <img :src="otherUser.photo" alt="Avatar">
                    </md-avatar>
                </div>
                <div class="chat-content-info">
                    <div>{{otherUser.firstName}}</div>
                    <div>from {{otherUser.nationality}}</div>
                </div>
            </header>
            <article>
                <ul @scroll="onScroll">
                    <li v-for="(msg, i) in messages"
                        :key="`msg-${i}`"
                        :class="[
                            msg.seq === 1 ? 'first-msg' : '',
                            msg.who === otherUser._id ? 'other-message' : 'my-message',
                            'message',
                        ]">
                        <div class="detail">
                            <i class="fa fa-circle"></i>
                            <div class="author">{{ author(msg.who) }}</div>
                            <div class="time">{{toTimeString(msg.time)}}</div>
                        </div>
                        <div class="content">
                            {{ msg.content }}
                        </div>
                    </li>
                    <div :class="[isTop ? 'show-hello' : 'hide-hello']">
                        Hey {{myName}} and {{othersName}}! You’re matched!<br>So excited to introduce you two.
                        Take a quick moment to break the ice.
                    </div>
                </ul>
            </article>
            <footer>
                <textarea
                    name="message"
                    id="post-message"
                    rows="3"
                    placeholder="Type your message"
                    v-model="postMsg"></textarea>
                <button @click="send">Send</button>
            </footer>
        </template>
    </section>
</template>

<script>
import { accept } from '../../../utils/mixins/ChatContent';

export default {
    mixins: [accept],
    async beforeRouteUpdate(to, from, next) {
        if (to.params.userId) {
            const apiArgs = {
                params: { userId: to.params.userId },
            };
            const res = await this.api.messages.get(apiArgs);
            if (res.ok) {
                this.messages = res.messages;
                this.otherUser = res.otherUser;
            }
        }
        next();
    },
    data() {
        return {
            msgUpdating: false,
            postMsg: '',
            page: 1,
        };
    },
    computed: {
        isTop() {
            return this.messages[this.messages.length - 1].seq === 1;
        },
        myName() {
            return this.$route.meta.user.user.firstName;
        },
        othersName() {
            return this.otherUser.firstName;
        },
    },
    methods: {
        author(uid) {
            if (uid === this.otherUser._id) {
                return this.othersName;
            }
            return this.myName;
        },
        async send() {
            const apiArgs = {
                params: { userId: this.otherUser._id },
                body: { content: this.postMsg },
            };
            const res = await this.api.messages.send(apiArgs);
            if (res.ok) {
                this.messages.splice(0, 0, {
                    content: this.postMsg,
                    seq: this.seq + 1,
                    time: new Date(Date.now()).toISOString(),
                    who: this.$route.meta.user.user._id,
                });
                this.postMsg = '';
                this.seq += 1;
            }
        },
        async onScroll(e) {
            if (this.msgUpdating) {
                return false;
            }

            if (this.messages[this.messages.length - 1].seq === 1) {
                return false;
            }
            if (e.target.scrollTop === 0) {
                const apiArgs = {
                    params: { userId: this.otherUser._id },
                    query: { page: this.page + 1 },
                };
                this.msgUpdating = true;
                const res = await this.api.messages.get(apiArgs);
                if (res.ok) {
                    this.page += 1;
                    this.messages.push(...res.messages);
                }
                this.msgUpdating = false;
            }
            return true;
        },
        isToday(t) {
            const today = new Date(Date.now());
            const time = new Date(t);

            return ['getFullYear', 'getMonth', 'getDate'].every(fn => (
                today[fn]() === time[fn]()
            ));
        },
        toTimeString(t) {
            const time = new Date(t);
            if (this.isToday(t)) {
                return `${time.getHours()}:${time.getMinutes()}, Today`;
            }
            return `${time.getHours()}:${time.getMinutes()}, ${time.getMonth()}.${time.getDate()} ${time.getFullYear()}`;
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
        height: 120px;
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
            padding: 0 15px;
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

                &.other-message {
                    align-self: flex-start;

                    .detail {
                        display: flex;
                        i {
                            color: #60bc90;
                        }

                        .time {
                            padding: 0 10px;
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
        height: 180px;
        textarea {
            width: 100%;
            padding: 10px 20px;
            margin-bottom: 10px;
            border-radius: 5px;
            resize: none;
            border: 1px solid rgba(112, 112, 112, .4);
            line-height: 26px;
            font-size: 16px;

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
