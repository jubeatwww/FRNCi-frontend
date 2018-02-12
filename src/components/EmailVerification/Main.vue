<template>
    <div>
        <div>Verification failed</div>
        <a @click="resend">Resend Verification Mail</a>
    </div>
</template>

<script>
import { API_URL } from '../../config';

export default {
    methods: {
        async resend() {
            const [userid, token] = [
                localStorage.getItem('_id'),
                localStorage.getItem('_token'),
            ];

            const result = await fetch(`${API_URL}/users/${userid}/resend-verify`, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({ uesrId: userid }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: token,
                }),
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            }).catch((err) => {
                console.error(err);
                switch (err.status) {
                case 401:
                    break;
                default:
                    break;
                }
            });
            console.log(result);
        },
    },
    created() {
        console.log(this.$route);
    },
};
</script>

<style lang="scss" scoped>

</style>
