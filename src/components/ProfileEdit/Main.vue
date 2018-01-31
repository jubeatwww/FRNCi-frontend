<template>
    <md-layout md-align="center">
        <md-layout
            md-flex="75"
            style="padding: 5% 4%">
            <md-stepper>
                <Basic></Basic>
                <Preference></Preference>
                <md-step md-label="Payment">
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
};
</script>

<style lang="scss" scoped>
.md-stepper {
    border: 1px solid #B5B2B2;
    border-radius: 40px;
    box-shadow: none;
}
</style>
