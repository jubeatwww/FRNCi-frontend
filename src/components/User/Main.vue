<template>
    <md-layout md-align="center">
        <md-layout
            md-flex-xsmall="85"
            md-flex-small="85"
            md-flex-medium="50"
            md-flex-large="50"
            md-flex-xlarge="50"
            style="padding: 0 4%">
            <form :style="$route.name  ? '' : 'padding: 0'">
                <component :is="contentView"></component>
            </form>
        </md-layout>
    </md-layout>
</template>
<script>
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import EmailVerifyNotice from './EmailVerifyNotice';

export default {
    components: { Login, Register, ForgotPassword, ResetPassword, EmailVerifyNotice },
    data() {
        return {
            contentView: this.$route.name,
        };
    },
    beforeUpdate() {
        this.contentView = this.$route.name;
    },
};
</script>
<style lang="scss" scoped>
form {
    width: 100%;
    margin: 10% 0;
    padding: 40px;
    border: 1px solid #B5B2B2;
    border-radius: 40px;
    text-align: center;
}
</style>
