<template>
    <md-layout md-gutter md-align="center">
        <md-layout md-flex="40" style="max-width: 600px">
            <form>
                <Login v-if="$route.name === 'login'"></Login>
                <Register v-else></Register>
            </form>
        </md-layout>
    </md-layout>
</template>
<script>
import Login from './Login';
import Register from './Register';

export default {
    components: { Login, Register },
};
</script>
<style lang="scss" scoped>
form {
    max-width: 600px;
    width: 100%;
    margin: 10% 0;
    padding: 40px;
    border: 1px solid #B5B2B2;
    border-radius: 40px;
}
</style>
