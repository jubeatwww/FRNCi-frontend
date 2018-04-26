<template>
    <section class="chat-accept">
        <ul v-if="chatrooms.length > 0">
            <li v-for="room in chatrooms" :key="room.latestMessage.who" @click="changeRoom(room.otherUser._id)">
                <div>
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <img :src="room.otherUser.photo" alt="Avatar">
                    </md-avatar>
                </div>
                <div class="content">
                        <span>{{room.otherUser.firstName}}</span>
                        <span>{{content(room.latestMessage.content)}}</span>
                </div>
                <div>
                    <span class="chat-time">15:34</span><!-- 最新訊息時間(當天) -->
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import { accept } from '../../../utils/mixins/Chatrooms';

export default {
    mixins: [accept],
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
            }
        }
    }
}
</style>
