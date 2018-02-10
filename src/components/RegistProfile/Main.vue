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
import { loadProducts } from '../../actions/products';

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
    methods: {
        stepChanged(nextStep) {
            if (nextStep === 2) {
                console.log(this.basicInfo);
                console.log(this.preferInfo);
                if (!this.paymentInfo.products && this.basicInfo.nationality) {
                    loadProducts(this.basicInfo.nationality).then((products) => {
                        this.paymentInfo = {
                            ...this.paymentInfo,
                            products,
                            loading: false,
                        };
                    });
                }
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
