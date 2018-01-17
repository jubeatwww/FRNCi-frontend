<template>
    <md-layout md-column>
        <div style="margin-bottom: 10%">Please log in to start your adventure.</div>
        <md-button id="fb-login" class="md-raised md-primary login-btn">
            <i class="fa fa-facebook"></i> Log in with Facebook
        </md-button>
        <md-button id="google-login" class="md-raised md-primary login-btn">
            <i class="fa fa-google"></i> Log in with Google
        </md-button>
        <div class="or-separator">
            <hr><span>or</span>
        </div>
        <div class="login-input">
            <md-input-container>
                <label>Email address</label>
                <md-input v-model="email" required></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Password</label>
                <md-input v-model="password" type="password" required></md-input>
            </md-input-container>
        </div>
        <a href="" id="forgot-pwd-btn">Forgot password?</a>
        <md-button class="md-raised md-primary">Log in</md-button>
        <p>Don't have an account? <router-link to="register">Sign up now!</router-link></p>
    </md-layout>
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
#fb-login {
    background-color: #3B5998;
}

#google-login {
    background-color: #DD4B39;
}

.login-btn {
    font-size: 20px;
    text-transform: none;
    i {
        position: absolute;
        left: 10px;

        &:before {
            font-size: 30px;
        }
    }
}

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

#forgot-pwd-btn {
    text-align: right;
}
</style>
