<template>
    <form>
        <form-field
            title="Contact Email"
            description="Your email address will not be displayed on the site and shared with other users.">
            <md-input-container>
                <md-input
                    placeholder="A valid e-mail address you check regularly"
                    v-model="info.email"></md-input>
            </md-input-container>
        </form-field>
        <form-field
            title="Phone Number"
            desciption="We won't share your phone number with other users.">
            <md-input-container>
                <md-input
                    placeholder="+886 912345678"
                    v-model="info.phone"></md-input>
            </md-input-container>
        </form-field>
        <form-field title="Gender">
            <radio-group
                :options="genderOpt"
                :value.sync="info.gender"
                name="gender"
                :default="info.gender">
            </radio-group>
        </form-field>
        <form-field
            title="Birthday"
            description="Only your age will be displayed on your profile.">
            <date-picker v-model="info.birthday" class="md-input-container"></date-picker>
        </form-field>
        <form-field title="Nationality">
            <md-input-container>
                <label for="nationality">Nationality</label>
                <md-select name="nationality" id="nationality" v-model="info.nationality">
                    <md-option v-for="nation in nationalities" :value="nation.value" :key="nation.value">
                        {{nation.label}}
                    </md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field title="Current Location">
            <md-input-container>
                <md-input
                    placeholder="The city you are living in"
                    v-model="info.localCity"
                    class="location"
                    ref="location"></md-input>
            </md-input-container>
        </form-field>
        <form-field title="Occupation">
            <md-input-container>
                <md-input v-model="info.occupation"></md-input>
            </md-input-container>
        </form-field>
        <form-field title="Major / Profession">
            <md-input-container>
                <md-input v-model="info.major"></md-input>
            </md-input-container>
        </form-field>
        <md-button class="md-raised md-primary" @click="save">Save</md-button>
    </form>
</template>

<script>
import jQuery from 'jquery';
import 'geocomplete';
import DatePicker from 'vuejs-datepicker';

import RadioGroup from '../CustomComponents/RadioGroup';
import FormField from '../CustomComponents/FormField';
import { nationalities } from '../../config';

export default {
    components: { FormField, RadioGroup, DatePicker },
    data() {
        const { user } = this.$route.meta;
        return {
            info: {
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                birthday: user.birthday,
                nationality: user.nationality.toUpperCase(),
                localCity: user.localCity,
                occupation: '',
                major: '',
            },
            genderOpt: [{ label: 'male', value: 'm' }, { label: 'female', value: 'f' }],
            nationalities,
        };
    },
    methods: {
        async save() {
            const [userid, token] = [
                localStorage.getItem('_id'),
                localStorage.getItem('_token'),
            ];

            const result = await this.api.users.update(userid, token, this.info);
            if (!result.ok) {
                console.error(result);
            }
        },
    },
    mounted() {
        /*  Set up geocomplete, since geocomplete won't trigger the v-model event,
         *  bind the geocode:result event to sync the data of this template.
         */
        jQuery('.location').geocomplete().bind('geocode:result', () => {
            this.info.localCity = this.$refs.location.$el.value;
        });
    },

};
</script>

<style lang="scss">
form {
    width: 100%;
    text-align: left;
}
</style>
