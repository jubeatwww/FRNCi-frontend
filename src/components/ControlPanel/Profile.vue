<template>
    <form>
        <form-field
            title="Profile Photo"
            description="Please use a photo that clearly shows your face. Nobody is interested in meeting a landscape or an animal. ( Image types allowed: JPG, PNG. Maximum image size: 4 MB. Suggested image ratio: 1:1. )">
            <md-input-container>
                <md-file v-model="info.photo" accept="image/*"></md-file>
            </md-input-container>
        </form-field>
        <form-field title="Your Main Intention on GlocalClick!">
            <radio-group
                :options="preferToMeet"
                :value.sync="info.meet"
                name="meet">
            </radio-group>
        </form-field>
        <form-field
            title="How You Prefer to Interact"
            description="You can change this setting anytime.">
            <radio-group
                :options="preferToInteract"
                :value.sync="info.interact"
                name="interact">
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
            title="Your Interests / Hobbies"
            description="Tell anything you like to do in your free time.">
            <md-input-container>
                <md-textarea v-model="info.hobbyDetail"></md-textarea>
            </md-input-container>
        </form-field>
        <form-field
            title="Your Learning Language Goal"
            description="What are the specific outcomes you want to achieve in a limited time? Please tell specific things you plan to learn or to focus on. And share why you want to learn the language.">
            <md-input-container>
                <md-textarea v-model="info.learningGoal"></md-textarea>
            </md-input-container>
        </form-field>
        <form-field
            title="The Expectation on Your Buddy"
            description="What are the things you expect him/her to share with you?">
            <md-input-container>
                <md-textarea v-model="info.buddyExpectation"></md-textarea>
            </md-input-container>
        </form-field>
        <form-field
            title="Share More About Yourself"
            description="Tell something about your background and your passion! Help other members get to know you better!">
            <md-input-container>
                <md-textarea v-model="info.introduction"></md-textarea>
            </md-input-container>
        </form-field>
    </form>
</template>

<script>
import RadioGroup from '../CustomComponents/RadioGroup';
import FormField from '../CustomComponents/FormField';
import CheckBoxGroup from '../CustomComponents/CheckBoxGroup';
import { languages, hobbies } from '../../config';

export default {
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
            info: {
                meet: '',
                interact: '',
                interests: [],
                hobbyDetail: '',
                learningGoal: '',
                buddyExpectation: '',
                introduction: '',
            },
            languages,
            hobbies,
        };
    },
};
</script>

<style lang="scss">
form {
    width: 100%;
    text-align: left;
}
</style>