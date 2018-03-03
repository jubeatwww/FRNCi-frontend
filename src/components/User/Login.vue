<template>
    <md-layout md-column>
        <div style="margin-bottom: 10%">Log in to Glocal Click</div>
        <fb-button button-id="fb-login" button-text="Log in with Facebook"></fb-button>
        <!--<md-button id="google-login" class="md-raised md-primary login-btn">
            <i class="fa fa-google"></i> Log in with Google
        </md-button>-->
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
        <router-link to="forgotpassword" id="forgot-pwd-btn">Forgot password?</router-link>
        <md-button class="md-raised md-primary" @click="login">Log in</md-button>
        <p>Don't have an account? <router-link to="register">Sign up now!</router-link></p>
    </md-layout>
</template>
<script>
import FbButton from './FbButton';

export default {
    components: { FbButton },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            const result = await this.api.auth.login({ body: {
                email: this.email,
                password: this.password,
            } });
            if (result.ok) {
                const { _id } = result.user;
                localStorage.clear();
                localStorage.setItem('_email', result.email);
                localStorage.setItem('_token', result.token);
                localStorage.setItem('_id', _id);
                this.$router.go(-1);
            }
        },
        checkInput() {

        },
        setErrorMsg() {

        },
    },
    created() {
        if (this.$route.meta.isLogin) {
            this.$router.go(-1);
        }
    },
};
</script>

<style lang="scss" scoped>
#fb-login {
    background-color: #3B5998;
    height: 55px;
}

#google-login {
    background-color: #DD4B39;
}

.login-btn {
    font-size: 20px;
    text-transform: none;
    i {
        position: absolute;
        left: 20%;

        &:before {
            font-size: 30px;
        }
    }
}

.or-separator{
    hr{
        margin: 40px 0 30px 0;
        line-height: 5px;
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

.md-theme-default {
    .md-button:not([disabled]).md-primary.md-raised {
        background-color: #f8b62c;
        border-radius: 3.6px;

        &:hover {
            background-color: #f8b62c;
        }
    }

    .md-input-container.md-input-focused:after {
        background-color: #60bc90;
    }

    a:not(.md-button) {
        color: #f8b62c;
    }
}

#forgot-pwd-btn {
    color: #707070;
}
</style>
