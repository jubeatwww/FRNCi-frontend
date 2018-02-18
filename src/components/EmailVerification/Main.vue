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
            const [userid, token] = [
                localStorage.getItem('_id'),
                localStorage.getItem('_token'),
            ];

            const result = await this.api.users.resendVerifyEmail(userid, token);
            if (!result.ok) {
                this.$router.push('/login');
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
