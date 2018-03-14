<template>
    <md-layout md-column id="form-wrapper">
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
#form-wrapper {
    h1 {
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 1.8rem;
    }

    p {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.3rem;
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
</style>
