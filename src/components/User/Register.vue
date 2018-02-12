<template>
    <div class="form-wrapper">
        <md-button id="fb-signup" class="md-raised md-primary login-btn">
            <i class="fa fa-facebook"></i> Sign up with Facebook
        </md-button>
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
        <p>Already have an Glocal Click account? <router-link to="login">Log in.</router-link></p>
    </div>
</template>
<script>
import { API_URL } from '../../config';

export default {
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
            const signupInfo = await fetch(`${API_URL}/auth/signup`, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({ email, password, firstName, lastName }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            }).catch((err) => {
                console.error(err);
                switch (err.status) {
                case 400:
                    break;
                case 401:
                    break;
                default:
                    break;
                }
            });
            if (signupInfo) {
                const { _id } = signupInfo.user;
                localStorage.setItem('_token', signupInfo.token);
                localStorage.setItem('_id', _id);
            }
        },
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
