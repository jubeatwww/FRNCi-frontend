<template>
    <md-step md-label="Basic Info" :md-disabled="mdDisabled">
        <form-field title="Upload Your Profile Photo" >
            <span>
                Please use a photo that clearly shows your face. Nobody is interested in meeting a landscape or an animal.
                <br>
                ( Image types allowed: JPG, PNG. Maximum image size: 4 MB. Suggested image ratio: 1:1. )
            </span>
            <img :src="uploadImg">
            <md-input-container>
                <md-file v-model="info.photo" accept="image/*"
                    @input="fileInput"
                    ref="fileUploader"></md-file>
            </md-input-container>
        </form-field>
        <form-field
            title="Contact Email"
            description="Your email address will not be displayed on the site and shared with other users.">
              <md-input-container>
                <md-input 
                    placeholder="A valid e-mail address you check regularly"
                    v-model="info.email"
                    disabled></md-input>
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
                    v-model="info.localCity"
                    class="location"
                    ref="localCity"></md-input>
            </md-input-container>
        </form-field>
    </md-step>
</template>

<script>
import jQuery from 'jquery';
import 'geocomplete';
import DatePicker from 'vuejs-datepicker';

import RadioGroup from '../CustomComponents/RadioGroup';
import FormField from '../CustomComponents/FormField';
import { nationalities } from '../../config';

export default {
    props: ['mdDisabled'],
    components: { RadioGroup, FormField, DatePicker },
    data() {
        const { photo, email } = this.$route.meta.user;
        return {
            info: {
                photo: '',
                email,
                gender: 'm',
                birthday: '',
                nationality: 'TW',
                localCity: '',
            },
            uploadImg: photo,
            genderOpt: [{ label: 'male', value: 'm' }, { label: 'female', value: 'f' }],
            nationalities,
        };
    },
    watch: {
        info: {
            handler(preData, nextData) {
                const status = Object.values(nextData).every(val => val !== '');
                this.$emit('update:completed', status);
                this.$emit('update:info', nextData);
            },
            deep: true,
        },
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
                this.info.photo = '';
                this.uploadImg = '';
            }
        },
    },
    mounted() {
        /*  Set up geocomplete, since geocomplete won't trigger the v-model event,
         *  bind the geocode:result event to sync the data of this template.
         */
        jQuery('.location').geocomplete().bind('geocode:result', () => {
            this.info.localCity = this.$refs.localCity.$el.value;
        });

        this.$emit('update:info', this.info);
    },
};
</script>

<style lang="scss" scoped>
.vdp-datepicker /deep/ {
    > div:first-child {
        width: 100%;
        input {
            font-size: 15px;
        }
    }
}
</style>

<style lang="scss">
.md-steps-navigation{
    display: none;
}

.md-whiteframe-1dp {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0), 0 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0px rgba(0, 0, 0, 0);
}

.radio-group input[type="radio"] ~ button {
    border: solid 1px #60bc90;
}

.md-whiteframe {
    box-shadow: none;
}

.md-theme-default {
    .md-button:not([disabled]).md-primary.md-raised {
        background-color: #f8b62c;
        &:hover {
            background-color: #f8b62c;
        }
    }

    .md-input-container.md-input-focused:after {
        background-color: #60bc90;
    }

    .md-stepper {
        .md-step-header.md-active .md-step-number {
            background-color: #60bc90;
        }

        .md-step-header.md-primary .md-step-icon {
            background-color: #60bc90;
        }

        .md-steps-navigation {
            border-bottom: #B5B2B2 2.3px solid;
        }
    }
}

.md-button[disabled] {
    border: solid 1px #f8b62c;
}

</style>
