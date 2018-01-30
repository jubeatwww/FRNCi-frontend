<template>
    <md-stepper>
        <Basic></Basic>
        <Preference></Preference>
    </md-stepper>
</template>

<script>
import Basic from './Basic';
import Preference from './Preference';

export default {
    components: { Basic, Preference },
};
</script>

<style lang="scss" scoped>

</style>
