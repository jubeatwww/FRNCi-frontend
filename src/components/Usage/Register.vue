<template>
    <div class="form-wrapper">
        <p>Sign up with <a href="">Facebook</a> or <a href="">Google</a></p>
        <div class="or-separator">
            <hr><span>or</span>
        </div>
        <div>
            <md-input-container>
                <label>First name</label>
                <md-input v-model="firstname" required></md-input>
            </md-input-container>
            <md-input-container>
                <label>Last name</label>
                <md-input v-model="lastname" required></md-input>
            </md-input-container>
            <md-input-container>
                <label>Email address</label>
                <md-input v-model="email" required></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Password</label>
                <md-input v-model="password" type="password" required></md-input>
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
export default {
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        };
    },
    methods: {
        signup() {
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
