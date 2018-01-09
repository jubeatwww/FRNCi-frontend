<template>
    <div>
        <div>Please log in to start your adventure.</div>
        <div>
            <md-button class="md-raised md-primary">Log in with Facebook</md-button>
            <md-button class="md-raised md-primary">Log in with Google</md-button>
        </div>
        <div class="or-separator">
            <hr><span>or</span>
        </div>
        <div>
            <md-input-container>
                <label>Email address</label>
                <md-input v-model="email" required></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Password</label>
                <md-input v-model="password" type="password" required></md-input>
            </md-input-container>
            <a href="">Forgot password?</a>
            <md-button class="md-raised md-primary">Sign up</md-button>
        </div>
        <p>Don't have an account? <router-link to="register">Sign up now!</router-link></p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
};
</script>
<style lang="scss" scoped>
.or-separator{
    hr{
        margin: 40px 0 30px 0;
        border-top: 1px solid #707070;
    }

    span{
        text-align: center;
        top: -48px;
        position: relative;
        background: #FFFFFF;
        padding: 2%;
        color: #707070;
    }
}
</style>
