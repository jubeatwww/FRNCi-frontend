<template>
    <md-layout md-column>
        <md-stepper>
            <md-step :md-continue="mailValid">
                <h1>Reset Password By Email</h1>
                <p>To reset your password, enter the email address that you used to sign in to Glocal Click.</p>
                <md-input-container :class="{'md-input-invalid': !mailValid && !isFirstInput}">
                    <md-input type="email" v-model="email" required/>
                    <label>Email</label>
                </md-input-container>
            </md-step>
            <md-step>
                <h1>Reset Password By Email</h1>
                <p>We just sent a verification code to your email address. Please enter the verification code here.</p>
                <md-input-container :class="{'md-input-invalid': false}">
                    <md-input type="number" v-model="verifyCode" required/>
                    <label>Verification code</label>
                </md-input-container>
            </md-step>
            <md-step>
                <h1>Reset Password By Email</h1>
                <p>We just sent a verification code to your email address. Please enter the verification code here.</p>
                <md-input-container :class="{'md-input-invalid': false}">
                    <md-input type="password" v-model="verifyCode" required/>
                    <label>Enter your new password</label>
                </md-input-container>
                <md-input-container :class="{'md-input-invalid': false}">
                    <md-input type="password" v-model="verifyCode" required/>
                    <label>Enter your new password again</label>
                </md-input-container>
            </md-step>
        </md-stepper>
    </md-layout>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            isFirstInput: true,
            mailValid: false,
            verifyCode: '',
        };
    },
    watch: {
        email() {
            this.isFirstInput = false;
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.mailValid = emailRegex.test(this.email);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>

<style lang="scss">
#forgot-form {
    .md-steps-navigation{
        display: none;
    }

    .md-whiteframe {
        box-shadow: none;
    }
}
</style>

