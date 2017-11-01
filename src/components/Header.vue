<template>
    <header :style="headerColor">
        <div id="logo"></div>
        <nav>
            <md-theme md-name="orange">
                <md-button class="md-raised md-primary">Search Locals</md-button>
                <md-button class="md-raised md-primary">Sign Up/Login</md-button>
            </md-theme>
        </nav>
    </header>
</template>

<script>
export default {
    props: ['scrollTop'],
    computed: {
        headerColor() {
            return this.scrollTop ? { background: 'transparent' } : { background: 'white' };
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

    #logo{
        height: 30px;
        width: 105px;
        background: url('../assets/logo_frnci.png') no-repeat center center;
        background-size: cover;

        align-self: center;

        margin-left: 5%;
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
