<template>
    <section class="chat-accept">
        <ul v-if="$route.meta.chatrooms">
            <li v-for="room in $route.meta.chatrooms" :key="room.latestMessage.who">
                <div>
                        <md-avatar class="md-avatar-icon" md-menu-trigger>
                            <img :src="room.otherUser.photo" alt="Avatar">
                        </md-avatar>
                </div>
                <div class="content">
                        <span>{{name(room)}}</span>
                        <span>{{room.latestMessage.content}}</span>
                </div>
                <div>
                        <span class="chat-time">15:34</span><!-- 最新訊息時間(當天) -->
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        console.log(this.$route);
        return {};
    },
    methods: {
        name(room) {
            if (this.$route.name === 'ChatAccept') {
                return room.otherUser.firstName;
            } else if (this.$route.name === 'ChatSend') {
                return room.to.firstName;
            } else if (this.$route.name === 'ChatReceive') {
                return room.from.firstName;
            }
            return '';
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
            .content {
                display: flex;
                flex-direction: column;
            }
        }
    }
}
</style>
