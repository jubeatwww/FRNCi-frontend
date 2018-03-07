<template>
    <md-layout md-column class="form-wrapper">
        <md-stepper>
            <md-step :md-continue="mailValid">
                <h1>Reset Password By Email</h1>
                <p>To reset your password, enter the email address that you used to sign in to Glocal Click.</p>
                <md-input-container :class="{'md-input-invalid': !mailValid && !isFirstInput}">
                    <md-input type="email" v-model="email" required/>
                    <label>Email</label>
                </md-input-container>
            </md-step>
            <md-step>
                <h1>Reset Password By Email</h1>
                <p>We just sent a verification code to your email address. Please enter the verification code here.</p>
                <md-input-container :class="{'md-input-invalid': false}">
                    <md-input type="number" v-model="verifyCode" required/>
                    <label>Verification code</label>
                </md-input-container>
            </md-step>
            <md-step>
                <h1>Reset Password By Email</h1>
                <p>We just sent a verification code to your email address. Please enter the verification code here.</p>
                <md-input-container :class="{'md-input-invalid': false}">
                    <md-input type="password" v-model="verifyCode" required/>
                    <label>Enter your new password</label>
                </md-input-container>
                <md-input-container :class="{'md-input-invalid': false}">
                    <md-input type="password" v-model="verifyCode" required/>
                    <label>Enter your new password again</label>
                </md-input-container>
            </md-step>
        </md-stepper>
    </md-layout>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            isFirstInput: true,
            mailValid: false,
            verifyCode: '',
        };
    },
    watch: {
        email() {
            this.isFirstInput = false;
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.mailValid = emailRegex.test(this.email);
        },
    },
};
</script>

<style lang="scss" scoped>
.form-wrapper /deep/ {
    .md-stepper {
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
            P {
                text-align: left;
                font-size: 16px;
            }

            .md-input-focused {
                &::after {
                    background-color: #60bc90;
                }
            }

            .md-input-container {
                label {
                    &::after {
                        font-size: 14px;
                        color: red;
                    }
                }
            }

            .md-button:not(:disabled).md-primary {
                background-color: #60bc90;

                &:hover {
                    background-color: #60bc90;
                }
            }

            .md-button {
                border: 1px solid #60bc90;
            }
        }
    }
}

@media (max-width: 575.98px) {
    .form-wrapper /deep/ {
        .md-stepper {
            .md-step-actions {
                .md-button {
                    padding: 0;
                }
            }
        }
    }
}
</style>
