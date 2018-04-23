<template>
    <main>
        <div class="chatroom-wrapper">
            <nav>
                <a>Accepted</a>
                <md-menu>
                    <md-button md-menu-trigger>Pending</md-button>

                    <md-menu-content>
                        <md-menu-item>Send</md-menu-item>
                        <md-menu-item>Received</md-menu-item>
                    </md-menu-content>
                </md-menu>
            </nav>
            <Chatrooms></Chatrooms>
        </div>
        <router-view></router-view>
    </main>
</template>

<script>
import Chatrooms from './Chatrooms';

export default {
    components: { Chatrooms },
};
</script>

<style lang="scss" scoped>
main {
    display: flex;
    max-width: 960px;
    height: calc(100vh - 170px);
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

        nav {
            margin-top: 8px;
            display: flex;

            a {
                padding: 0.5rem 1rem;
                font-size: 1rem;
                font-weight: bold;
                line-height: 1.5;
                border-bottom: 2px solid #60bc90;
            }

            .md-menu {
                border-bottom: 2px solid #60bc90;
                > button {
                    margin: 0;
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                    font-weight: bold;
                    line-height: 1.5;
                }
            }
        }
    }

}
</style>
