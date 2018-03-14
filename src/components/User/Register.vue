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
                <md-input :debounce="600" v-model="firstName" required></md-input>
            </md-input-container>
            <md-input-container>
                <label>Last name</label>
                <md-input :debounce="600" v-model="lastName" required></md-input>
            </md-input-container>
            <md-input-container>
                <label>Email address</label>
                <md-input :debounce="600" v-model="email" required></md-input>
            </md-input-container>
            <md-input-container
                :class="{'md-input-invalid': !passwordFirst && !passwordValidation}"
                md-has-password>
                <label>Password</label>
                <md-input
                    :debounce="600"
                    @change="passwordChanged"
                    v-model="password"
                    type="password"
                    required></md-input>
                <span class="md-error">The length of password should be greater than 6</span>
            </md-input-container>
            <md-input-container
                :class="{'md-input-invalid': !repeatPasswordFirst && !repeatPasswordValidation}"
                md-has-password>
                <label>Repeat Password</label>
                <md-input
                    :debounce="600"
                    @change="repeatPasswordChanged"
                    v-model="repeatPassword"
                    type="password"
                    required></md-input>
                <span class="md-error">Password not same</span>
            </md-input-container>
            <md-checkbox v-model="policy">I agree to the Glocal Click
                <router-link to="termsofservice" class="gc-policy">terms of service</router-link>
                and
                <router-link to="privacypolicy" class="gc-policy">privacy policy</router-link>
            </md-checkbox>
            <md-button
                class="md-raised md-primary"
                :disabled="!submitValidation"
                @click="signup">Sign up</md-button>
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
            policy: false,
            passwordFirst: true,
            repeatPasswordFirst: true,
        };
    },
    computed: {
        formValidation() {
            return Object.values(this.$data).every(val => val !== '');
        },
        passwordValidation() {
            return this.password.length > 6;
        },
        repeatPasswordValidation() {
            return this.password === this.repeatPassword && this.repeatPassword !== '';
        },
        submitValidation() {
            return this.formValidation
                && this.passwordValidation
                && this.repeatPasswordValidation
                && this.policy;
        },
    },
    methods: {
        async signup() {
            const { firstName, lastName, email, password } = this;
            const result = await this.api.auth.signup({
                body: { firstName, lastName, email, password },
            });

            if (result.ok) {
                const { _id } = result.user;
                localStorage.clear();
                localStorage.setItem('_token', result.token);
                localStorage.setItem('_id', _id);
                localStorage.setItem('_email', result.email);
                this.$router.push('/email-verify-notice');
            }
        },
        passwordChanged() {
            this.passwordFirst = false;
        },
        repeatPasswordChanged() {
            this.repeatPasswordFirst = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.form-wrapper /deep/ {
    #fb-signup {
        background-color: #3B5998;
        width: 100%;
        height: 55px;
        font-size: 20px;
        text-transform: none;

        i {
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

    .md-input-focused {
        &::after {
            background-color: #60bc90;
        }
    }

    .md-checkbox {
        font-size: 14px;
        text-align: left;
        margin-bottom: 10%;

        .md-checkbox-label {
            .gc-policy {
                color: #707070;
                text-decoration: underline;
            }
        }

        .md-ink-ripple {
            color: #60bc90;
        }
    }

    .md-checked {
        .md-checkbox-container {
            background-color: #60bc90;
            border-color: #60bc90;
        }
    }

    .md-button:disabled {
        width: 100%;
        height: 15%;
    }

    .md-button:not(:disabled).md-primary.md-raised {
        background-color: #f8b62c;
        width: 100%;
        height: 15%;
    }
    
    p {
        font-size: 18px;

        .loginLink {
            color: #f8b62c;
            font-weight: 600;
            text-decoration: none;

            &:hover {
                color: #f8b62c;
            }
        }
    }
}

@media (max-width: 575.98px) {
    .form-wrapper /deep/ {
        #fb-signup {
            font-size: 15px;
        }

        .md-checkbox {
            font-size: 1rem;
            line-height: 2rem;
        }

        .md-button {
            margin: 3rem 0 1rem;
        }

        p {
            line-height: 1.8rem;
        }
    }
}
</style>
