<template>
    <md-layout md-column id="form-wrapper">
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
        <p>Don't have an account? <router-link to="register" class="loginLink">Sign up now!</router-link></p>
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
#form-wrapper {
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

            &::before {
                font-size: 30px;
            }
        }
    }

    .or-separator {
        hr {
            margin: 40px 0 30px 0;
            line-height: 5px;
            border-top: 1px solid #707070;
        }

        span {
            text-align: center;
            top: -48px;
            position: relative;
            background: #FFFFFF;
            padding: 2%;
            color: #707070;
        }
    }

    .md-input-container {
        label {
            &::after {
                font-size: 14px;
                color: red;
            }
        }
    }

    #forgot-pwd-btn {
        text-align: right;
        color: #707070;
        margin: 1rem 0;

        &:hover {
            text-decoration: none;
        }
    }

    .md-button:not(:disabled).md-primary.md-raised {
        background-color: #f8b62c;
        border-radius: 3.6px;
        margin-bottom: 1rem;

        &:hover {
            background-color: #f8b62c;
        }
    }

    .md-input-focused {
        &::after {
            background-color: #60bc90;
        }
    }

    .loginLink {
        color: #f8b62c;

        &:hover {
            color: #f8b62c;
            text-decoration: none;
        }
    }
}

@media (max-width: 575.98px) {
    #form-wrapper {
        .login-btn {
            font-size: 15px;
        }

        p {
            line-height: 1.8rem;
        }
    }
}
</style>
