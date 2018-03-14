<template>
    <md-layout md-column class="form-wrapper">
        <h1>Reset Password By Email</h1>
        <md-input-container
            :class="{'md-input-invalid': !passwordFirst && !passwordValidation}"
            md-has-password>
            <label>Enter your new password</label>
            <md-input
                :debounce="600"
                @change="passwordChanged"
                v-model="password"
                type="password"
                required></md-input>
            <span class="md-error">The length of password should be greater than 6</span>
        </md-input-container>
        <md-input-container
            :class="{'md-input-invalid': !repeatPasswordFirst && !repeatPasswordValidation}"
            md-has-password>
            <label>Enter your new password again</label>
            <md-input
                :debounce="600"
                @change="repeatPasswordChanged"
                v-model="repeatPassword"
                type="password"
                required></md-input>
            <span class="md-error">Password not same</span>
        </md-input-container>
        <md-button
            class="md-raised md-primary"
            :disabled="!submitValidation"
            @click="resetPassword">Reset</md-button>
    </md-layout>
</template>
<script>
export default {
    data() {
        return {
            password: '',
            repeatPassword: '',
            passwordFirst: true,
            repeatPasswordFirst: true,
        };
    },
    computed: {
        passwordValidation() {
            return this.password.length > 6;
        },
        repeatPasswordValidation() {
            return this.password === this.repeatPassword && this.repeatPassword !== '';
        },
        submitValidation() {
            return this.passwordValidation && this.repeatPasswordValidation;
        },
    },
    watch: {
        email() {
            this.isFirstInput = false;
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.mailValid = emailRegex.test(this.email);
        },
    },
    methods: {
        async resetPassword() {
            const token = this.$route.query && this.$route.query.token;
            const result = await this.api.users.resetPassword({
                body: {
                    password: this.password,
                    token,
                },
            });
            if (result.ok) {
                this.alertify.alert('Success', 'Password reset successfully!');
                this.$router.push('login');
            } else if (result.status === 400) {
                this.$router.push('forgotpassword');
            }
        },
        passwordChanged() {
            this.passwordFirst = false;
        },
        repeatPasswordChanged() {
            this.repeatPasswordFirst = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
    h1 {
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 1.8rem;
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
