<template>
    <header>
        <div id="logo" @click="homeLink"></div>
        <nav>
            <md-theme md-name="orange">
                <!-- <md-button class="md-raised md-primary">Find Buddies</md-button> -->
                <md-menu md-direction="bottom left" v-if="$route.meta.isLogin">
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <md-icon v-if="showDefaultAvatar">person</md-icon>
                        <img :src="$route.meta.avatar" alt="Avatar" v-else>
                    </md-avatar>
                    <md-menu-content>
                        <md-menu-item @selected="account">My Account</md-menu-item>
                        <md-menu-item @selected="profile">My Profile Page</md-menu-item>
                        <md-menu-item>Get Verfied</md-menu-item>
                        <md-menu-item @selected="logout">Log Out</md-menu-item>
                    </md-menu-content>
                </md-menu>
                <md-button
                    class="md-dense"
                    @click="loginLink"
                    v-else>
                    Sign Up/Login
                </md-button>
            </md-theme>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return { avatar: '' };
    },
    computed: {
        showDefaultAvatar() {
            return !this.$route.meta.avatar;
        },
    },
    methods: {
        homeLink() {
            this.$router.push({ path: '/' });
        },
        loginLink() {
            this.$router.push({ path: '/login' });
        },
        account() {
            this.$router.push('/controlpanel/account');
        },
        profile() {
            this.$router.push('/controlpanel/profile');
        },
        logout() {
            localStorage.clear();
            this.$router.push({ path: '/login' });
        },
    },
};
</script>

<style lang="scss" scoped>
header{
    display: flex;
    justify-content: space-between;
    z-index: 2;
    top: 0;
    height: 11vh;
    width: 100vw;
    transition: all .2s linear;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);

    #logo{
        height: 36px;
        width: 216px;
        background: url('../../assets/logo_glocal.png') no-repeat center center;
        background-size: cover;
        align-self: center;
        margin-left: 5%;
        cursor: pointer;
    }

    nav{
        display: flex;
        align-items: center;
        margin-right: 2%;

        button.md-theme-orange.md-button:not([disabled]).md-primary.md-raised {
            margin: 0 20px;
            background: #f8b62c;
            padding: 0 10px;
            border: 2px solid #f8b62c;
            border-radius: 4px;
            color: white;
        }

        button.md-theme-orange.md-button:not([disabled]).md-primary.md-raised:hover {
            background-color: #f8b62c;
            color: white;
        }
    }
}
</style>
