<template>
    <md-layout md-align="center">
        <md-layout
            md-flex="75"
            style="padding: 5% 4%" id="gc-regist-wrapper">
            <md-stepper @change="stepChanged" ref="stepper" :md-disable-header-nav="true">
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
                photo: 'Please upload your profile photo.',
                birthday: 'Please tell us your birthday.',
                localCity: 'Please tell us the city you are living in',
            },
            preferErrorMsg: {
                nativeLanguage: 'Please choose your native language.',
                studyLanguage: 'Please choose the language you want to learn.',
                interests: 'Please pick up some topics that interest you.',
                introduction: 'Please tell us about yourself. (At least 5 words)',
            },
        };
    },
    computed: {
        infoValidation() {
            if (this.basicInfo.studentId === '') {
                this.basicInfo.studentId = 'N/A';
            }
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
            if (this.preferInfo.introduction.length < 5 &&
                this.preferInfo.introduction !== '') {
                errorMsg.push(this.preferErrorMsg.introduction);
            }
            return errorMsg;
        },
    },
    mounted() {
        const { query } = this.$route;
        if (query && query.tab === 'payment') {
            this.$nextTick(() => {
                const { stepper } = this.$refs;
                stepper.setActiveStep(stepper.getStepByIndex(2), true);
                this.loadProducts().then();
            });
        }
    },
    methods: {
        async stepChanged(nextStep) {
            if (nextStep === 2) {
                if (this.infoValidation.length > 0) {
                    let errors = '';
                    this.infoValidation.forEach((msg) => {
                        errors += `${msg}<br>`;
                    });
                    this.alertify.alert('Profile not completed', errors);
                    this.$refs.stepper.movePreviousStep();
                } else {
                    const userInfo = this.parseUserInfo({
                        ...this.basicInfo,
                        ...this.preferInfo,
                    });

                    const args = {
                        params: { userId: localStorage.getItem('_id') },
                        body: userInfo,
                    };
                    const result = await this.api.users.update(args);
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
            window.scrollTo(0, 0);
        },
        async loadProducts() {
            const nationality = this.basicInfo.nationality ||
                this.$route.meta.user.nationality;
            if (nationality) {
                const products = await this.api.products.loadProducts(nationality);
                this.paymentInfo.products = products;
                this.paymentInfo.loading = false;
            } else {
                this.$refs.stepper.movePreviousStep();
            }
        },
        parseUserInfo(info) {
            const userInfo = info;
            userInfo.studyLanguages = [{
                language: userInfo.studyLanguage,
                level: userInfo.level,
            }];
            userInfo.nativeLanguages = [{
                language: userInfo.nativeLanguage,
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
#gc-regist-wrapper /deep/ {
    .md-stepper {
        border: 1px solid #B5B2B2;
        border-radius: 40px;
        box-shadow: none;
        text-align: left;

        .md-whiteframe-1dp {
            box-shadow: 0 0px 0px rgba(0, 0, 0, 0), 0 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0px rgba(0, 0, 0, 0);
        }

        .md-steps-navigation {
            border-bottom: #B5B2B2 1px solid;

            .md-active, .md-primary  {
                .md-step-number, .md-step-icon {
                    background-color: #60bc90;
                }
            }
        }

        .md-step-content {
            .md-input-focused {
                &::after {
                    background-color: #60bc90;
                }
            }

            .md-button:not(:disabled).md-primary {
                background-color: #f8b62c;

                &:hover {
                    background-color: #f8b62c;
                }
            }
        }
    }
}

@media (max-width: 575.98px) {
    #gc-regist-wrapper /deep/ {
        .md-stepper {
            .md-steps-container {
                .md-step-content {
                    padding: 0;
                }
            }
        }
        
        .md-button {
            margin: 6px 6px;
            padding: 0 12px;
        }
    }
}
</style>