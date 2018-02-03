<template>
    <md-layout md-align="center">
        <md-layout
            md-flex="75"
            style="padding: 5% 4%">
            <md-stepper>
                <Basic 
                    :completed.sync="basicCompleted"></Basic>
                <Preference 
                    :completed.sync="preferenceCompleted" 
                    :md-continue="continued"></Preference>
                <md-step md-label="Payment" :md-disabled="!continued">
                </md-step>
            </md-stepper>
        </md-layout>
    </md-layout>
</template>

<script>
import Basic from './Basic';
import Preference from './Preference';

export default {
    components: { Basic, Preference },
    data() {
        return {
            basicCompleted: false,
            preferenceCompleted: false,
            paymentEntered: false,
        };
    },
    computed: {
        continued() {
            return this.basicCompleted && this.preferenceCompleted;
        },
    },
    methods: {
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
