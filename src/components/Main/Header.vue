<template>
    <header :style="[headerColor, isHome]">
        <div id="logo" @click="home"></div>
        <nav>
            <md-theme md-name="orange">
                <md-button class="md-raised md-primary">Find Buddies</md-button>
                <md-button class="md-dense" @click="loginClick">Sign Up/Login</md-button>
            </md-theme>
        </nav>
    </header>
</template>

<script>
export default {
    props: ['scrollTop'],
    computed: {
        isHome() {
            return this.$route.name === 'home' ? { position: 'fixed' } : { position: 'relative' };
        },
    },
    methods: {
        home() {
            this.$router.push({ path: '/' });
        },
        loginClick() {
            this.$router.push({ path: 'login' });
        },
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
    height: 80px;
    width: 100vw;
    transition: all .2s linear;
    background-color: white;

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
