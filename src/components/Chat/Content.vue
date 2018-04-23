<template>
    <section>
        <template v-if="$route.meta.messages">
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
                <li v-for="(msg, i) in messages" :key="`msg-${i}`" :class="msg.seq === 1 ? 'first-msg' : ''">
                    <div>
                        {{ name(msg.who) }}
                    </div>
                    <div>
                        {{ msg.content }}
                    </div>
                </li>
                <div :class="[isTop ? 'show-hello' : 'hide-hello']">
                    Hey {{myName}} and {{othersName}}! You’re matched! So excited to introduce you two.
                    Take a quick moment to break the ice.
                </div>
            </article>
            <footer>
                <textarea name="message" id="" rows="3" v-model="postMsg"></textarea>
                <button @click="send">Send</button>
            </footer>
        </template>
    </section>
</template>

<script>
export default {
    data() {
        return {
            postMsg: '',
            page: 1,
        };
    },
    computed: {
        otherUser() {
            if (this.$route.name === 'ChatAccept') {
                return this.$route.meta.messages.otherUser;
            } else if (this.$route.name === 'ChatSend') {
                return this.$route.meta.messages.from;
            } else if (this.$route.name === 'ChatReceive') {
                return this.$route.meta.messages.to;
            }
            return null;
        },
        messages() {
            return this.$route.meta.messages.messages;
        },
        myName() {
            return this.$route.meta.user.user.firstName;
        },
        othersName() {
            return this.otherUser.firstName;
        },
        isTop() {
            return this.messages[this.messages.length - 1].seq === 1;
        },
    },
    methods: {
        name(id) {
            if (id === this.otherUser._id) {
                return this.othersName;
            }
            return this.myName;
        },
        send() {
            const apiArgs = {
                params: { userId: this.otherUser._id },
                body: { content: this.postMsg },
            };
            this.api.messages.send(apiArgs);
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
            padding: 0 15px;
        }
    }
    article {
        height: 60%;
        list-style: none;
        display: flex;
        flex-direction: column-reverse;
        overflow: scroll;

        li {
            width: 66%;
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
