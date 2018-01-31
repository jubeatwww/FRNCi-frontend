<template>
    <header :style="isHome">
        <div id="logo" @click="homeLink"></div>
        <nav>
            <md-theme md-name="orange">
                <md-button class="md-raised md-primary">Find Buddies</md-button>
                <md-menu md-direction="bottom left" v-if="$route.params.isLogin">
                    <md-avatar class="md-avatar-icon" md-menu-trigger>
                        <md-icon>folder</md-icon>
                    </md-avatar>
                    <md-menu-content>
                        <md-menu-item>My Account</md-menu-item>
                        <md-menu-item>My Profile Page</md-menu-item>
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
    computed: {
        isHome() {
            return this.$route.name === 'home' ? { position: 'fixed' } : { position: 'relative' };
        },
    },
    methods: {
        homeLink() {
            this.$router.push({ path: '/' });
        },
        loginLink() {
            this.$router.push({ path: 'login' });
        },
        logout() {
            localStorage.clear();
            this.$router.go(0);
        },
    },
    created() {
        console.log(this.$route);
    },
};
</script>

<style lang="scss" scoped>
header{
    position: fixed;
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

        button.md-theme-orange.md-button:not([disabled]).md-primary.md-raised {
            margin: 0 20px;
            background: #e6af2a;
            padding: 0 10px;
            border: 2px solid #e6af2a;
            border-radius: 4px;
            color: white;
        }

        button.md-theme-orange.md-button:not([disabled]).md-primary.md-raised:hover {
            background-color: transparent;
            color: #e6af2a;
        }
    }
}
</style>
