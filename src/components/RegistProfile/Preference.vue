<template>
    <md-step md-label="Preferences" :md-continue="mdContinue" :md-disabled="mdDisabled">
        <form-field title="Who You Prefer To Meet">
            <radio-group
                :options="preferToMeet"
                :value.sync="info.meet"
                name="meet">
            </radio-group>
        </form-field>
        <form-field title="How You Prefer to Interact">
            <radio-group
                :options="preferToInteract"
                :value.sync="info.interact"
                name="interact">
            </radio-group>
        </form-field>
        <form-field
            title="Your Native Language"
            description="You can add more languages you speak fluently later.">
            <md-input-container>
                <label for="language">Language</label>
                <md-select name="language" id="language" v-model="info.nativeLanguages">
                    <md-option v-for="lang in languages" :value="lang.value" :key="lang.value">
                        {{lang.label}}
                    </md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field
            title="Language You Are Learning"
            description="Please pick the main language you are learning now. You can add more languages later.">
            <md-input-container>
                <label for="learning">Language</label>
                <md-select name="learning" id="learning" v-model="info.studyLanguages">
                    <md-option v-for="lang in languages" :value="lang.value" :key="lang.value">
                        {{lang.label}}
                    </md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field title="Select Your Language Level">
            <radio-group
                :options="level"
                :default="2"
                :value.sync="info.level"
                name="level">
            </radio-group>
        </form-field>
        <form-field
            title="Your Favorite Topics (Select 5 at most)"
            description="Pick a few topics you are interested in chatting with people so we can find the most matched buddies for you.">
            <check-box-group
                name="hobbies"
                :options="hobbies"
                :value.sync="info.interests"
                :limit="5"
                :columns="2">
            </check-box-group>
        </form-field>
        <form-field
            title="Share More About Yourself"
            description="Tell something about your background and your passion! Help other members get to know you better!">
            <md-input-container>
                <md-textarea v-model="info.introduction"></md-textarea>
            </md-input-container>
        </form-field>
    </md-step>
</template>

<script>
import RadioGroup from '../CustomComponents/RadioGroup';
import FormField from '../CustomComponents/FormField';
import CheckBoxGroup from '../CustomComponents/CheckBoxGroup';
import { languages, hobbies } from '../../config';

export default {
    props: ['mdContinue', 'mdDisabled'],
    components: { RadioGroup, FormField, CheckBoxGroup },
    data() {
        return {
            preferToMeet: [
                { label: 'Find Language partners', value: 'language' },
                { label: 'Find Cross-cultrual friends', value: 'cultrual' },
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
            info: {
                meet: '',
                interact: '',
                nativeLanguages: '',
                studyLanguages: '',
                level: 'intermediate',
                interests: [],
                introduction: '',
            },
            languages,
            hobbies,
        };
    },
    watch: {
        info: {
            handler(preData, nextData) {
                const status = Object.values(nextData).every(val => val !== '') && nextData.interests.length > 0;
                this.$emit('update:completed', status);
                this.$emit('update:info', nextData);
            },
            deep: true,
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
