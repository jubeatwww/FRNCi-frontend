<template>
    <md-step md-label="Preferences">
        <form-field title="Who You Prefer To Meet">
            <radio-group 
                :options="preferToMeet" 
                :default="2" 
                :value.sync="meet"
                name="meet">
            </radio-group>
        </form-field>
        <form-field title="How You Prefer to Interact">
            <radio-group 
                :options="preferToInteract" 
                :value.sync="interact"
                name="interact">
            </radio-group>
        </form-field>
        <form-field
            title="Your Native Language"
            description="You can add more languages you speak fluently later.">
            <md-input-container>
                <label for="language">Language</label>
                <md-select name="language" id="language" v-model="language">
                    <md-option value="chinese">Chinese</md-option>
                    <md-option value="english">English</md-option>
                    <md-option value="japanese">Japanese</md-option>
                    <md-option value="korean">Korean</md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field
            title="Language You Are Learning"
            description="Please pick the main language you are learning now. You can add more languages later.">
            <md-input-container>
                <label for="learning">Language</label>
                <md-select name="learning" id="learning" v-model="learning">
                    <md-option value="chinese">Chinese</md-option>
                    <md-option value="english">English</md-option>
                    <md-option value="japanese">Japanese</md-option>
                    <md-option value="korean">Korean</md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field title="Select Your Language Level">
            <radio-group 
                :options="level" 
                :default="2"
                name="level">
            </radio-group>
        </form-field>
    </md-step>
</template>

<script>
import RadioGroup from '../CustomComponents/RadioGroup';
import FormField from '../CustomComponents/FormField';

export default {
    components: { RadioGroup, FormField },
    data() {
        return {
            preferToMeet: [
                { label: 'Language partners', value: 'language' },
                { label: 'Cross-cultrual friends', value: 'cultrual' },
                { label: 'Not available now', value: 'invalid' },
            ],
            preferToInteract: [
                { label: 'Face to face', value: 'f2f' },
                { label: 'online', value: 'online' },
            ],
            level: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Elementary', value: 'elementary' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Fluent', value: 'fluent' },
            ],
            language: '',
            learning: '',
            meet: '',
            interact: '',
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
