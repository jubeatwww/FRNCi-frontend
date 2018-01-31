<template>
    <md-layout md-column>
        <div style="margin-bottom: 10%">Please log in to start your adventure.</div>
        <md-button id="fb-login" class="md-raised md-primary login-btn">
            <i class="fa fa-facebook"></i> Log in with Facebook
        </md-button>
        <md-button id="google-login" class="md-raised md-primary login-btn">
            <i class="fa fa-google"></i> Log in with Google
        </md-button>
        <div class="or-separator">
            <hr><span>or</span>
        </div>
        <div class="login-input">
            <md-input-container>
                <label>Email address</label>
                <md-input v-model="email" required></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Password</label>
                <md-input v-model="password" type="password" required></md-input>
            </md-input-container>
        </div>
        <a href="" id="forgot-pwd-btn">Forgot password?</a>
        <md-button class="md-raised md-primary">Log in</md-button>
        <p>Don't have an account? <router-link to="register">Sign up now!</router-link></p>
    </md-layout>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            const { email, password } = this;
            const loginInfo = await fetch(`${API_URL}/auth/login`, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            }).catch((err) => {
                console.log(err);
                switch (err.status) {
                case 401:
                    break;
                default:
                    break;
                }
            });

            if (loginInfo) {
                const { _id } = loginInfo.user;
                localStorage.setItem('_token', loginInfo.token);
                localStorage.setItem('_id', _id);
                this.$router.go(-1);
            }
        },
        checkInput() {

        },
        setErrorMsg() {

        },
    },
};
</script>
<style lang="scss" scoped>
#fb-login {
    background-color: #3B5998;
}

#google-login {
    background-color: #DD4B39;
}

.login-btn {
    font-size: 20px;
    i {
        position: absolute;
        left: 10px;

        &:before {
            font-size: 30px;
        }
    }
}

.or-separator{
    hr{
        margin: 40px 0 30px 0;
        border-top: 1px solid #707070;
    }

    span{
        text-align: center;
        top: -48px;
        position: relative;
        background: #FFFFFF;
        padding: 2%;
        color: #707070;
    }
}

.login-input {
    label {
        font-size: 10px;
        padding-left: 28px;
    }

    .md-input-focused {
        label {
            padding-left: 0;
        }
    }

    input {
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 4px;
        padding: 12px 25px 11px;
        height: 40px;
    }

}

#forgot-pwd-btn {
    text-align: right;
}
</style>
