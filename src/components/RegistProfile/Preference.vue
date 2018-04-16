<template>
    <md-step md-label="Preferences" :md-continue="mdContinue" :md-disabled="mdDisabled" class="gc-regist-preference">
        <form-field title="I’m looking for">
            <radio-group
                :options="preferToMeet"
                :value.sync="info.meet"
                name="meet">
            </radio-group>
        </form-field>
        <form-field title="I’d prefer to meet" description="You can change this setting anytime.">
            <radio-group
                :options="preferToInteract"
                :value.sync="info.interact"
                name="interact">
            </radio-group>
        </form-field>
        <form-field
            title="Languages you speak"
            description="You can add more languages you speak fluently later.">
            <md-input-container>
                <label for="language">Language</label>
                <md-select name="language" id="language" v-model="info.nativeLanguage">
                    <md-option v-for="lang in languages" :value="lang.value" :key="lang.value">
                        {{lang.label}}
                    </md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field
            title="Languages you are learning"
            description="Please pick the main language you are learning now. You can add more languages later.">
            <md-input-container>
                <label for="learning">Language</label>
                <md-select name="learning" id="learning" v-model="info.studyLanguage">
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
            title="Favourite Topics (Select up to 5)"
            description="Choose a few topics you are interested in, so we can find buddies for you with similar interests.">
            <check-box-group
                name="hobbies"
                :options="hobbies"
                :value.sync="info.interests"
                :limit="5"
                :columns="2">
            </check-box-group>
        </form-field>
        <form-field
            title="About Yourself"
            description="Share some more about your background and passions! Help other members get to know you better!">
            <md-input-container>
                <md-textarea v-model="info.introduction" maxlength="500"></md-textarea>
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
                { label: 'Find Cross-cultural friends', value: 'cultural' },
                { label: 'Both', value: 'both' },
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
                nativeLanguage: '',
                studyLanguage: '',
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
                const status =
                    Object.values(nextData).every(val => val !== '') &&
                    nextData.interests.length > 0 &&
                    nextData.introduction.length > 5 &&
                    nextData.introduction.length <= 500;
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
