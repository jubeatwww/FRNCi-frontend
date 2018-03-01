<template>
    <md-layout md-align="center">
        <md-layout
            md-flex="75"
            style="padding: 5% 4%">
            <md-stepper @change="stepChanged" ref="stepper">
                <Basic
                    :completed.sync="basicCompleted"
                    :info.sync="basicInfo"></Basic>
                <Preference
                    :completed.sync="preferenceCompleted"
                    :info.sync="preferInfo"></Preference>
                <Payment
                    :paymentInfo="paymentInfo"></Payment>
            </md-stepper>
        </md-layout>
    </md-layout>
</template>

<script>

import Basic from './Basic';
import Preference from './Preference';
import Payment from './Payment';

export default {
    components: { Basic, Preference, Payment },
    data() {
        return {
            basicCompleted: false,
            preferenceCompleted: false,
            paymentEntered: false,
            basicInfo: {},
            preferInfo: {},
            paymentInfo: {
                loading: true,
            },
            basicErrorMsg: {
                photo: 'Please upload your photo.',
                birthday: 'Please tell us your birthday.',
                localCity: 'Please tell us the city you are living in',
            },
            preferErrorMsg: {
                nativeLanguage: 'Please choose your native language.',
                studyLanguage: 'Please choose the language you want to learn.',
                interests: 'Please pick up some topic that interests in.',
                introduction: 'Please tell us about yourself. (At least 5 words)',
            },
        };
    },
    computed: {
        continued() {
            return this.basicCompleted && this.preferenceCompleted;
        },
        infoValidation() {
            const errorMsg = [];
            if (!this.basicCompleted) {
                Object.keys(this.basicInfo).forEach((key) => {
                    if (this.basicInfo[key] === '') {
                        errorMsg.push(this.basicErrorMsg[key]);
                    }
                });
            }
            if (!this.preferenceCompleted) {
                Object.keys(this.preferInfo).forEach((key) => {
                    if (this.preferInfo[key] === '') {
                        errorMsg.push(this.preferErrorMsg[key]);
                    }
                });
            }
            if (this.preferInfo.interests.length === 0) {
                errorMsg.push(this.preferErrorMsg.interests);
            }
            return errorMsg;
        },
    },
    methods: {
        async stepChanged(nextStep) {
            if (nextStep === 2) {
                if (this.infoValidation.length > 0) {
                    let errors = '';
                    this.infoValidation.forEach((msg) => {
                        errors += `${msg}\n`;
                    });
                    alert(errors);
                    this.$refs.stepper.movePreviousStep();
                } else {
                    const [userid, token] = [
                        localStorage.getItem('_id'),
                        localStorage.getItem('_token'),
                    ];
                    const userInfo = this.parseUserInfo({
                        ...this.basicInfo,
                        ...this.preferInfo,
                    });

                    const result = await this.api.users.update(userid, token, userInfo);
                    if (result.ok) {
                        await this.loadProducts();
                    } else {
                        /* Return to previous step when update user data failed from api.
                        * We have to do this because vuematerial 0.8.2 doesn't provide the method
                        * to prevent stepper from stepping forward,
                        * and there is only a listener method that is able to know which
                        * step we are. This should be fixed when vuematerial will have updated.
                        */
                        this.$refs.stepper.movePreviousStep();
                    }
                }
            }
        },
        parseUserInfo(info) {
            const userInfo = info;
            userInfo.studyLanguages = [{
                language: userInfo.studyLanguages,
                level: userInfo.level,
            }];
            userInfo.nativeLanguages = [{
                languages: userInfo.nativeLanguages,
                level: 'native',
            }];
            delete userInfo.level;
            delete userInfo.email;
            delete userInfo.photo;

            return userInfo;
        },
    },
};
</script>

<style lang="scss" scoped>
.md-stepper {
    border: 1px solid #B5B2B2;
    border-radius: 40px;
    box-shadow: none;
    text-align: left;
}
</style>
