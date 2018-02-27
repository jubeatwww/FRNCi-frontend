<template>
    <div class="form-wrapper">
        <div style="margin-bottom: 3%">Sign up to Glocal Click</div>
        <fb-button button-id="fb-signup" button-text="Sign up with Facebook"></fb-button>
        <!-- <md-button id="fb-signup" class="md-raised md-primary login-btn" @click="fbSignup">
            <i class="fa fa-facebook"></i> Sign up with Facebook
        </md-button> -->
        <div class="or-separator">
            <hr><span>or</span>
        </div>
        <div>
            <md-input-container>
                <label>First name</label>
                <md-input v-model="firstName" required></md-input>
            </md-input-container>
            <md-input-container>
                <label>Last name</label>
                <md-input v-model="lastName" required></md-input>
            </md-input-container>
            <md-input-container>
                <label>Email address</label>
                <md-input v-model="email" required></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Password</label>
                <md-input v-model="password" type="password" required></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Repeat Password</label>
                <md-input v-model="repeatPassword" type="password" required></md-input>
            </md-input-container>
            <md-checkbox>I agree to the Glocal Click
                <router-link to="termsofservice">terms of service</router-link>
                and
                <router-link to="privacypolicy">privacy policy</router-link>
            </md-checkbox>
            <md-button class="md-raised md-primary" @click="signup">Sign up</md-button>
        </div>
        <p>Already have an Glocal Click account? <router-link to="login" class="loginLink">Log in.</router-link></p>
    </div>
</template>
<script>
import FbButton from './FbButton';

export default {
    components: { FbButton },
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
        };
    },
    methods: {
        async signup() {
            const { firstName, lastName, email, password } = this;
            const result = await this.api.auth.signup({ firstName, lastName, email, password });

            if (result.ok) {
                const { _id } = result.user;
                localStorage.clear();
                localStorage.setItem('_token', result.token);
                localStorage.setItem('_id', _id);
                localStorage.setItem('_email', result.email);
                this.$router.push('/email-verify-notice');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#fb-signup {
    background-color: #3B5998;
    width: 100%;
    height: 55px;
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

.md-theme-default {
    .md-button:not([disabled]).md-primary.md-raised {
        background-color: #f8b62c;
        width: 100%;
        height: 15%;
    }

    .md-input-container.md-input-focused:after {
        background-color: #60bc90;
    }

     a:not(.md-button) {
        color: #707070;
        text-decoration: underline
    }

     a:not(.md-button).loginLink {
        color: #f8b62c;
        text-decoration: none;
    }
}

.md-checkbox:not(.md-disabled) {
    font-size: 14px;
    text-align: left;
    margin-bottom: 10%;
}

.form-wrapper {
    p {
        font-size: 18px;
    }
}
</style>

<style lang="scss">
.md-theme-default {
    .md-checkbox.md-checked .md-checkbox-container  {
        background-color: #60bc90;
        border-color: #60bc90;
    }

    .md-checkbox .md-ink-ripple {
        color: #60bc90;
    }
}
</style>
