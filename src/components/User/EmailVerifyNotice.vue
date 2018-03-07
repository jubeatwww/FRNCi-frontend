<template>
    <md-layout md-column>
        <h4>Check Your Email!</h4>
        <p>
            We sent you an email to 
            <span style="font-weight:bolder;">{{email}}</span> 
            to verify your email address. 
            <br>
            <br>
            You must click the link we sent to use all the features of Glocal Click.
            <br>
            <br>
            PS. If you can't find it, please look for it in your junk mail folder. 
            <br>
            If you find it there, please add 
            <a href="mailto:contactus@fnrci.com">contactus@frnci.com</a> 
            to your email contacts <br>so that you won't miss anything important.
            <br>
            <br>
            Didn't receive verification email? <a @click="resend">Send again</a>.
        </p>
    </md-layout>
</template>

<script>
export default {
    data() {
        return { email: localStorage.getItem('_email') };
    },
    methods: {
        async resend() {
            const result = await this.api.users.resendVerifyEmail({
                params: {
                    userId: localStorage.getItem('_id'),
                },
            });
            if (result.ok) {
                alert('Email has resent!');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
h4 {
    font-size: 22px;
}

p {
    font-size: 15px;
    text-align: left;
    line-height: 22px;
}
.md-theme-default a:not(.md-button) {
    color: #f8b62c;
}
</style>

