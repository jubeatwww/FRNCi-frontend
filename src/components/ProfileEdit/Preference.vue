<template>
    <md-step md-label="Preferences">
        <h3>Who You Prefer To Meet</h3>
        <radio-group :options="preferToMeet" name="meet" :default="2"></radio-group>
    </md-step>
</template>

<script>
import RadioGroup from '../CustomComponents/RadioGroup';

export default {
    components: { RadioGroup },
    data() {
        return {
            preferToMeet: [
                { label: 'Language partners', value: 'language' },
                { label: 'Cross-cultrual friends', value: 'cultrual' },
                { label: 'Not available now', value: 'invalid' },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
