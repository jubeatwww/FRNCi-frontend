<template>
    <div>
        <form>
            <Login v-if="$route.name === 'login'"></Login>
            <Register v-else></Register>
        </form>
    </div>
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
    max-width: 1140px;
    margin: 10% 30%;
    padding: 40px;
    border: 1px solid #B5B2B2;
    border-radius: 40px;
}
</style>
