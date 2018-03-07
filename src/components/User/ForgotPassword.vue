<template>
    <md-layout md-column>
        <template v-if="!emailSent">
            <h1>Reset Password By Email</h1>
            <p>To reset your password, enter the email address that you used to sign in to Glocal Click.</p>
            <md-input-container :class="{'md-input-invalid': !mailValid && !isFirstInput}">
                <md-input type="email" v-model="email" required/>
                <label>Email</label>
            </md-input-container>
            <md-button class="md-raised md-primary" @click="forgotPassword" :disabled="!mailValid">Submit</md-button>
        </template>
        <template v-else>
            <h1>Reset Password By Email</h1>
            <p>We just sent a verification link to your email address.</p>
        </template>
    </md-layout>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            isFirstInput: true,
            mailValid: false,
            emailSent: false,
        };
    },
    watch: {
        email() {
            this.isFirstInput = false;
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.mailValid = emailRegex.test(this.email);
        },
    },
    methods: {
        async forgotPassword() {
            const result = await this.api.users.forgotPassword({ body: { email: this.email } });
            if (result.ok) {
                this.emailSent = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#forgot-form {
    .md-steps-navigation{
        display: none;
    }

    .md-whiteframe {
        box-shadow: none;
    }
}

.md-step-content > p {
    text-align: left;
    font-size: 16px;
}

.md-stepper .md-steps-navigation {
    border-bottom: #B5B2B2 2.3px solid;
}

.md-whiteframe-1dp {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0), 0 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0px rgba(0, 0, 0, 0);
}
</style>

<style lang="scss">
.md-theme-default {
    .md-stepper .md-step-header.md-active .md-step-number, .md-stepper .md-step-header.md-primary .md-step-icon {
        background-color: #60bc90;
    }

    .md-button:not([disabled]).md-primary.md-raised {
        background-color: #60bc90;
        &:hover {
            background-color: #60bc90;
        }
    }

    .md-input-container.md-input-focused:after {
        background-color: #60bc90;
    }
}
</style>
