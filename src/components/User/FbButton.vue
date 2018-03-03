<template>
    <md-button :id="buttonId" class="md-raised md-primary login-btn" @click="fbLogin">
        <i class="fa fa-facebook"></i> {{buttonText}}
    </md-button>
</template>

<script>
export default {
    props: ['buttonId', 'buttonText'],
    methods: {
        async fbLogin() {
            window.FB.login(async (fbres) => {
                if (fbres.status === 'connected') {
                    const result = await this.api.auth.fbLogin({ body: {
                        access_token: fbres.authResponse.accessToken,
                    } });

                    if (result.ok) {
                        if (result._no_email) {
                            /* eslint-disable */
                            const email = prompt(`We couldn't find your email; in order to continue, please enter your email to sign up with Facebook`);
                            /* eslint-enable */
                            if (email && email.length) {
                                await this.fbSignupWithEmail(email, fbres.authResponse.accessToken);
                            }
                        } else {
                            this.onAuthComplete(result);
                        }
                    }
                }
            }, { scope: 'public_profile,email' });
        },
        async fbSignupWithEmail(email, accessToken) {
            const result = await this.api.auth.fbSignupWithEmail(email, accessToken);
            if (result.ok) {
                this.onAuthComplete(result);
            }
        },
        onAuthComplete(result) {
            const { user: { _id, email }, token } = result;
            localStorage.clear();
            localStorage.setItem('_email', email);
            localStorage.setItem('_token', token);
            localStorage.setItem('_id', _id);
            this.$router.go(-1);
        },
    },
};
</script>

<style>
</style>
