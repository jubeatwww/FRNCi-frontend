<template>
    <div>
        <div>Verification failed</div>
        <a @click="resend">Resend Verification Mail</a>
    </div>
</template>

<script>
export default {
    methods: {
        async resend() {
            const result = await this.api.users.resendVerifyEmail({
                params: {
                    userId: localStorage.getItem('_id'),
                },
            });
            if (result.ok) {
                this.alertify.alert('Success!', 'Email has resent!');
            } else {
                this.$router.push('/login');
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
