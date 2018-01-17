<template>
    <md-layout md-gutter md-align="center">
        <md-layout md-flex="50" style="max-width: 550px; padding: 0 4%">
            <form :style="$route.name === 'forgotpassword' ? 'padding: 0' : ''">
                <Login v-if="$route.name === 'login'" id="login-form"></Login>
                <Register v-else-if="$route.name === 'register'" id="signup-form"></Register>
                <ForgotPassword id="forgot-form" v-else></ForgotPassword>
            </form>
        </md-layout>
    </md-layout>
</template>
<script>
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

export default {
    components: { Login, Register, ForgotPassword },
};
</script>
<style lang="scss" scoped>
form {
    max-width: 550px;
    width: 100%;
    margin: 10% 0;
    padding: 40px;
    border: 1px solid #B5B2B2;
    border-radius: 40px;
}
</style>
