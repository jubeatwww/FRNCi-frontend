<template>
    <md-step md-label="Basic Info">
        <h3>Upload Your Profile Photo</h3>
        <form-field 
            title="Contact Email"
            description="Your email address will not be displayed on the site and shared with other users.">
              <md-input-container>
                <label>A valid e-mail address you check regularly</label>
                <md-input v-model="email"></md-input>
            </md-input-container>
        </form-field>
        <form-field title="Gender">
            <radio-group 
                :options="genderOpt" 
                :value.sync="gender"
                name="gender">
            </radio-group>
        </form-field>
        <form-field
            title="Nationality">
            <md-input-container>
                <label for="nationality">Nationality</label>
                <md-select name="nationality" id="nationality" v-model="nationality">
                    <md-option value="tw">Taiwan</md-option>
                    <md-option value="us">United States</md-option>
                    <md-option value="jp">Japan</md-option>
                    <md-option value="kr">Korea</md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field 
            title="Current Location">
              <md-input-container>
                <label>The city you are living in</label>
                <md-input v-model="location"></md-input>
            </md-input-container>
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
            email: '',
            gender: '',
            nationality: 'tw',
            location: '',
            genderOpt: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
        };
    },
};
</script>

<style lang="scss" scoped>

</style>
