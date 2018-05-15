<template>
    <section class="chat-send" @scroll="onScroll">
        <ul v-if="chatrooms.length > 0">
            <li v-for="room in chatrooms" :key="room.to._id" @click="roomChange(room.to._id)">
                <div>
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <img :src="room.to.photo" alt="Avatar">
                    </md-avatar>
                </div>
                <div class="content">
                        <span>{{room.to.firstName}}</span>
                        <span>{{content(room.content)}}</span>
                </div>
                <div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>

import { send } from '../../../utils/mixins/Chatrooms';

export default {
    mixins: [send],
    async beforeRouteUpdate(to, from, next) {
        const res = await this.api.invitations.all({ query: { role: 'from' } });
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
        roomChange(id) {
            this.$router.push({ path: `/chat/s/${id}` });
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
                const res = await this.api.invitations.all({
                    query: {
                        role: 'from',
                        page: this.page + 1,
                    },
                });
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
            padding: 10px 0 20px;
            
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
