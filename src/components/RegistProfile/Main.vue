<template>
    <md-layout md-align="center">
        <md-layout
            md-flex="75"
            style="padding: 5% 4%">
            <md-stepper @change="stepChanged" ref="stepper">
                <Basic 
                    :completed.sync="basicCompleted"
                    :info.sync="basicInfo"></Basic>
                <Preference 
                    :completed.sync="preferenceCompleted" 
                    :md-continue="continued"
                    :info.sync="preferInfo"></Preference>
                <md-step md-label="Payment" :md-disabled="!continued">
                </md-step>
            </md-stepper>
        </md-layout>
    </md-layout>
</template>

<script>
import Basic from './Basic';
import Preference from './Preference';
import { API_URL } from '../../config';

export default {
    components: { Basic, Preference },
    data() {
        return {
            basicCompleted: false,
            preferenceCompleted: false,
            paymentEntered: false,
            basicInfo: {},
            preferInfo: {},
        };
    },
    computed: {
        continued() {
            return this.basicCompleted && this.preferenceCompleted;
        },
    },
    methods: {
        async stepChanged(nextStep) {
            if (nextStep === 2) {
                const [userid, token] = [
                    localStorage.getItem('_id'),
                    localStorage.getItem('_token'),
                ];
                const userInfo = {
                    ...this.basicInfo,
                    ...this.preferInfo,
                };

                const ret = await fetch(`${API_URL}/users/${userid}`, {
                    mode: 'cors',
                    method: 'PUT',
                    body: JSON.stringify(userInfo),
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
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.md-stepper {
    border: 1px solid #B5B2B2;
    border-radius: 40px;
    box-shadow: none;
    text-align: left;
}
</style>
