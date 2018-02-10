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
                name="gender">
            </radio-group>
        </form-field>
        <form-field
            title="Birthday"
            description="Only your age will be displayed on your profile.">
            <date-picker v-model="info.birthday" class="md-input-container"></date-picker>
        </form-field>
        <form-field
            title="Nationality">
            <md-input-container>
                <label for="nationality">Nationality</label>
                <md-select name="nationality" id="nationality" v-model="info.nationality">
                    <md-option v-for="nation in nationalities" :value="nation.value" :key="nation.value">
                        {{nation.label}}
                    </md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field
            title="Current Location">
              <md-input-container>
                <md-input
                    placeholder="The city you are living in"
                    v-model="info.location"
                    class="location"
                    ref="location"></md-input>
            </md-input-container>
        </form-field>
        <form-field
            title="Occupation">
              <md-input-container>
                <md-input
                    v-model="info.occupation"
                    ref="location"></md-input>
            </md-input-container>
        </form-field>
        <form-field
            title="Major / Profession">
              <md-input-container>
                <md-input
                    v-model="info.major"
                    ref="location"></md-input>
            </md-input-container>
        </form-field>
        <md-button class="md-raised md-primary">Save</md-button>
    </form>
</template>

<script>
import jQuery from 'jquery';
import 'geocomplete';
import DatePicker from 'vuejs-datepicker';

import RadioGroup from '../../CustomComponents/RadioGroup';
import FormField from '../../CustomComponents/FormField';
import { nationalities } from '../../../config';

export default {
    components: { FormField, RadioGroup, DatePicker },
    data() {
        return {
            info: {
                email: '',
                phone: '',
                gender: 'male',
                birthday: '',
                nationality: 'tw',
                location: '',
                occupation: '',
                major: '',
            },
            genderOpt: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
            nationalities,
        };
    },
    created() {
        // get user info before mounted
    },
    mounted() {
        /*  Set up geocomplete, since geocomplete won't trigger the v-model event,
         *  bind the geocode:result event to sync the data of this template.
         */
        jQuery('.location').geocomplete().bind('geocode:result', () => {
            this.info.location = this.$refs.location.$el.value;
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