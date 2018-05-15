<template>
    <form id="form-wrapper">
        <form-field
            title="Profile Photo"
            description="Please use a photo that clearly shows your face. Nobody is interested in meeting a landscape or an animal. ( Image types allowed: JPG, PNG. Maximum image size: 4 MB. Suggested image ratio: 1:1. )">
            <img :src="uploadImg">
            <md-input-container>
                <md-file v-model="info.photo" accept="image/*"
                    @input="fileInput"
                    ref="fileUploader"></md-file>
            </md-input-container>
        </form-field>
        <form-field title="I’m looking for ">
            <radio-group
                :options="preferToMeet"
                :value.sync="info.meet"
                :default="info.meet"
                name="meet">
            </radio-group>
        </form-field>
        <form-field
            title="I’d prefer to meet"
            description="You can change this setting anytime.">
            <radio-group
                :options="preferToInteract"
                :value.sync="info.interact"
                name="interact"
                :default="info.interact">
            </radio-group>
        </form-field>
        <form-field title="Availability for meetups">
            <check-box-group
                name="meetTimes"
                :options="times"
                :value.sync="info.meetTimes"
                :columns="1"
                :default="info.meetTimes">
            </check-box-group>
        </form-field>
        <form-field title="Frequency I’m expecting">
            <radio-group
                :options="frequency"
                :value.sync="info.meetFrequency"
                name="meetFrequency"
                :default="info.meetFrequency">
            </radio-group>
        </form-field>
        <form-field title="Languages you speak">
            <language-group
                name="nativeLanguage"
                addingStr="Add a language you speak fluently"
                :level="nativeLevel"
                :default="info.nativeLanguages"
                :limit="3"
                :value.sync="info.nativeLanguages">
            </language-group>
        </form-field>
        <form-field title="Languages you are learning">
            <language-group
                name="studyLanguage"
                addingStr="Add a language you are learning"
                :level="studyLevel"
                :default="info.studyLanguages"
                :limit="2"
                :value.sync="info.studyLanguages">
            </language-group>
        </form-field>
        <form-field
            title="Favourite Topics (Select up to 5)"
            description="Choose a few topics you are interested in, so we can find buddies for you with similar interests.">
            <check-box-group
                name="hobbies"
                :options="hobbies"
                :value.sync="info.interests"
                :limit="5"
                :columns="2"
                :default="info.interests">
            </check-box-group>
        </form-field>
        <form-field
            title="Your Interests / Hobbies"
            description="Tell anything you like to do in your free time.">
            <md-input-container>
                <md-textarea v-model="info.interestsDesc" maxlength="500"></md-textarea>
            </md-input-container>
        </form-field>
        <form-field
            title="Language Learning Goals"
            description="Describe any specific goals or outcomes you hope to achieve. Share what motivated you to want to learn the language.">
            <md-input-container>
                <md-textarea v-model="info.learningGoal" maxlength="500"></md-textarea>
            </md-input-container>
        </form-field>
        <form-field
            title="Expectations of your buddy"
            description="What are some things you hope him/her can share with you?">
            <md-input-container>
                <md-textarea v-model="info.idealBuddy" maxlength="500"></md-textarea>
            </md-input-container>
        </form-field>
        <form-field
            title="About Yourself"
            description="Share some more about your background and passions! Help other members get to know you better!">
            <md-input-container>
                <md-textarea v-model="info.introduction" maxlength="500"></md-textarea>
            </md-input-container>
        </form-field>
        <md-button class="md-raised md-primary" @click="save">Save</md-button>
    </form>
</template>

<script>
import RadioGroup from '../CustomComponents/RadioGroup';
import FormField from '../CustomComponents/FormField';
import CheckBoxGroup from '../CustomComponents/CheckBoxGroup';
import LanguageGroup from '../CustomComponents/LanguageGroup';
import { languages, hobbies } from '../../config';

export default {
    components: { RadioGroup, FormField, CheckBoxGroup, LanguageGroup },
    data() {
        const { user } = this.$route.meta.user;
        return {
            preferToMeet: [
                { label: 'Find Language partners', value: 'language' },
                { label: 'Find Cross-cultrual friends', value: 'cultrual' },
                { label: 'Both', value: 'both' },
            ],
            preferToInteract: [
                { label: 'Face to face', value: 'f2f' },
                { label: 'online', value: 'online' },
            ],
            nativeLevel: [
                { label: 'Fluent', value: 'fluent' },
                { label: 'Native', value: 'native' },
            ],
            studyLevel: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Elementary', value: 'elementary' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Fluent', value: 'fluent' },
            ],
            times: [
                { label: 'Weekday morning', value: 'weekday_morning' },
                { label: 'Weekday afternoon', value: 'weekday_afternoon' },
                { label: 'Weekday evening', value: 'weekday_evening' },
                { label: 'Weekend morning', value: 'weekend_morning' },
                { label: 'Weekend afternoon', value: 'weekend_afternoon' },
                { label: 'Weekend evening', value: 'weekend_evening' },
            ],
            frequency: [
                { label: 'More than once a week', value: 'week_gt' },
                { label: 'Around once a week', value: 'week_eq' },
                { label: 'Around once a month', value: 'month_eq' },
                { label: 'Less than once a month', value: 'month_lt' },
            ],
            info: {
                photo: user.photo,
                meet: user.meet,
                nativeLanguages: user.nativeLanguages,
                studyLanguages: user.studyLanguages,
                interact: user.interact,
                meetTimes: user.meetTimes || [],
                meetFrequency: user.meetFrequency || '',
                interests: user.interests || [],
                interestsDesc: user.interestsDesc || '',
                learningGoal: user.learningGoal || '',
                idealBuddy: user.idealBuddy || '',
                introduction: user.introduction,
            },
            uploadImg: user.photo,
            languages,
            hobbies,
        };
    },
    methods: {
        async fileInput() {
            const file = this.$refs.fileUploader.$refs.fileInput.files[0];
            const [userid, token] = [
                localStorage.getItem('_id'),
                localStorage.getItem('_token'),
            ];

            const result = await this.api.users.uploadPhoto(userid, token, file);
            if (result.ok) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.uploadImg = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.photo = '';
                this.uploadImg = '';
            }
        },
        async save() {
            let error = '';
            if (this.info.interests.length === 0) {
                error += 'Please pick up some topics that interest you.<br>';
            }
            if (this.info.introduction.length < 5) {
                error += 'Please tell us about yourself. (At least 5 words)<br>';
            }

            if (!error) {
                const args = {
                    params: { userId: localStorage.getItem('_id') },
                    body: this.info,
                };
                const result = await this.api.users.update(args);
                if (result.ok) {
                    this.alertify.notify('Saved successfully');
                } else {
                    console.error(result);
                }
            } else {
                this.alertify.alert(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#form-wrapper /deep/ {
    width: 100%;
    text-align: left;

    section {
        margin: 1rem 0;

        .md-input-focused {
            &::after {
                background-color: #60bc90;
            }
        }

        .vdp-datepicker__calendar {
            .selected {
                background: #60bc90;
            }

            .cell:not(.blank):not(.disabled).day {
                &:hover {
                    border: 1px solid #60bc90;
                }
            }
        }
    }

    .md-button:not(:disabled).md-primary.md-raised {
        font-size: 1.2rem;
        font-weight: 600;
        letter-spacing: 0.1rem;
        background-color: #f8b62c;
        border-radius: 3.6px;
        padding: 8px 80px;

        &:hover {
            background-color: #f8b62c;
        }
    }
}
</style>
