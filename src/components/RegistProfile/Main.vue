<template>
    <md-layout md-align="center">
        <md-layout
            md-flex="75"
            style="padding: 5% 4%">
            <md-stepper @change="stepChanged" ref="stepper" :md-disable-header-nav="true">
                <Basic
                    :completed.sync="basicCompleted"
                    :info.sync="basicInfo"></Basic>
                <Preference
                    :completed.sync="preferenceCompleted"
                    :md-continue="continued"
                    :info.sync="preferInfo"></Preference>
                <Payment
                    :paymentInfo="paymentInfo"
                    :md-disabled="!continued"></Payment>
            </md-stepper>
        </md-layout>
    </md-layout>
</template>

<script>

import Basic from './Basic';
import Preference from './Preference';
import Payment from './Payment';

export default {
    components: { Basic, Preference, Payment },
    data() {
        return {
            basicCompleted: false,
            preferenceCompleted: false,
            paymentEntered: false,
            basicInfo: {},
            preferInfo: {},
            paymentInfo: {
                loading: true,
            },
        };
    },
    computed: {
        continued() {
            return this.basicCompleted && this.preferenceCompleted;
        },
    },
    mounted() {
        const { query } = this.$route;
        if (query && query.tab === 'payment') {
            this.$nextTick(() => {
                const { stepper } = this.$refs;
                stepper.setActiveStep(stepper.getStepByIndex(2), true);
                this.loadProducts().then();
            });
        }
    },
    methods: {
        async stepChanged(nextStep) {
            if (nextStep === 2) {
                const [userid, token] = [
                    localStorage.getItem('_id'),
                    localStorage.getItem('_token'),
                ];
                const userInfo = this.parseUserInfo({
                    ...this.basicInfo,
                    ...this.preferInfo,
                });

                const result = await this.api.users.update(userid, token, userInfo);
                if (result.ok) {
                    await this.loadProducts();
                } else {
                    /* Return to previous step when update user data failed from api.
                    * We have to do this because vuematerial 0.8.2 doesn't provide the method
                    * to prevent stepper from stepping forward,
                    * and there is only a listener method that is able to know which step we are.
                    * This should be fixed when vuematerial will have updated.
                    */
                    this.$refs.stepper.movePreviousStep();
                }
            }
        },
        async loadProducts() {
            const nationality = this.basicInfo.nationality ||
                this.$route.meta.user.nationality;
            if (nationality) {
                const products = await this.api.products.loadProducts(nationality);
                this.paymentInfo.products = products;
                this.paymentInfo.loading = false;
            } else {
                this.$refs.stepper.movePreviousStep();
            }
        },
        parseUserInfo(info) {
            const userInfo = info;
            userInfo.studyLanguages = [{
                language: userInfo.studyLanguages,
                level: userInfo.level,
            }];
            userInfo.nativeLanguages = [{
                languages: userInfo.nativeLanguages,
                level: 'native',
            }];
            delete userInfo.level;
            delete userInfo.email;
            delete userInfo.photo;

            return userInfo;
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
