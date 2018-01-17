<template>
    <div>
        <FRNCiHeader></FRNCiHeader>
        <router-view></router-view>
        <FRNCiFooter></FRNCiFooter>
    </div>
</template>
<script>
import FRNCiHeader from './Header';
import FRNCiFooter from './Footer';

export default {
    components: {
        FRNCiHeader,
        FRNCiFooter,
    },
};
</script>

<style>
</style>