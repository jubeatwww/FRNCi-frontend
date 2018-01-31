<template>
    <md-step md-label="Basic Info">
        <form-field title="Upload Your Profile Photo">
            <md-input-container>
                <md-file v-model="photo" accept="image/*"></md-file>
            </md-input-container>
        </form-field>
        <form-field 
            title="Contact Email"
            description="Your email address will not be displayed on the site and shared with other users.">
              <md-input-container>
                <md-input 
                    placeholder="A valid e-mail address you check regularly"
                    v-model="email"></md-input>
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
                    <md-option v-for="nation in nationalities" :value="nation.value" :key="nation.value">
                        {{nation.label}}
                    </md-option>
                    <md-option value="">Taiwan</md-option>
                    <md-option value="us">United States</md-option>
                    <md-option value="jp">Japan</md-option>
                    <md-option value="kr">Korea</md-option>
                </md-select>
            </md-input-container>
        </form-field>
        <form-field 
            title="Current Location">
              <md-input-container>
                <md-input 
                    placeholder="The city you are living in"    
                    v-model="location"></md-input>
            </md-input-container>
        </form-field>
    </md-step>
</template>

<script>
import RadioGroup from '../CustomComponents/RadioGroup';
import FormField from '../CustomComponents/FormField';
import { nationalities } from '../../config';

export default {
    components: { RadioGroup, FormField },
    data() {
        return {
            photo: '',
            email: '',
            gender: 'male',
            nationality: 'tw',
            location: '',
            genderOpt: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
            nationalities,
        };
    },
};
</script>

<style lang="scss" scoped>

</style>
