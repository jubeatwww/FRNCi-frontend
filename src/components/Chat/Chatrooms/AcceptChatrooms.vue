<template>
    <section class="chat-accept" @scroll="onScroll">
        <ul v-if="chatrooms.length > 0">
            <li v-for="room in chatrooms" :key="room.otherUser._id" @click="changeRoom(room.otherUser._id)">
                <div>
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <img :src="room.otherUser.photo" alt="Avatar">
                    </md-avatar>
                </div>
                <div class="content">
                    <span class="chatroom-name">{{room.otherUser.firstName}}</span>
                    <span :class="room.unRead ? 'unread' : ''">{{content(room.latestMessage.content)}}</span>
                </div>
                <div>
                    <span class="chat-time">{{toTimeString(room.latestMessage.time)}}</span><!-- 最新訊息時間(當天) -->
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import { accept } from '../../../utils/mixins/Chatrooms';

export default {
    mixins: [accept],
    async beforeRouteUpdate(to, from, next) {
        const res = await this.api.messages.all();
        if (res.ok) {
            this.chatrooms = res.data;
        }
        next();
    },
    data() {
        return {
            page: 1,
            roomEnd: false,
            roomUpdating: false,
        };
    },
    methods: {
        changeRoom(id) {
            this.$router.push({ path: `/chat/a/${id}` });
        },
        content(text) {
            if (text.length > 20) {
                return `${text.slice(0, 20)}...`;
            }
            return text;
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
        async onScroll(e) {
            if (this.roomUpdating) {
                return false;
            }
            if (this.roomEnd) {
                return false;
            }

            if (e.target.clientHeight + e.target.scrollTop + 5 >= e.target.scrollHeight) {
                this.roomUpdating = true;
                const res = await this.api.messages.all({ query: { page: this.page + 1 } });
                if (res.ok) {
                    if (res.data.length === 0) {
                        this.roomEnd = true;
                    } else {
                        this.chatrooms.push(...res.data);
                        this.page += 1;
                    }
                }
                this.roomUpdating = false;
            }
            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
section {
    width: 100%;
    height: 100%;
    overflow: scroll;
    ul {
        list-style-type: none;
        padding: 20px 0 1rem;
        margin: 0;
        width: 100%;
        li {
            list-style: none;
            display: flex;
            justify-content: space-between;
            padding: 10px 0 20px;
            @media screen and (max-width: 768px) {
                justify-content: center;
            }

            &:hover {
                background-color: #def5ea;
            }

            .content {
                display: flex;
                flex-direction: column;
                text-align: left;

                @media screen and (max-width: 768px) {
                    display: none;
                }

                .chatroom-name {
                    font-weight: bold;
                    color: black;
                }

                .unread {
                    font-weight: bold;
                }
            }

            .chat-time {
                @media screen and (max-width: 768px) {
                    display: none;
                }
            }
        }
    }
}
</style>
