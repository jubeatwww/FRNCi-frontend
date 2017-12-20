<template>
    <div>
        <FRNCiHeader :scrollTop="scrollTop"></FRNCiHeader>
        <router-view></router-view>
        <FRNCiFooter></FRNCiFooter>
    </div>
</template>
<script>
import FRNCiHeader from './Header';
import Home from '../Home/Main';
import FRNCiFooter from './Footer';

export default {
    components: {
        FRNCiHeader,
        Home,
        FRNCiFooter,
    },
    data() {
        return {
            scrollTop: window.scrollY === 0,
        };
    },
    methods: {
        handleScroll() {
            this.scrollTop = window.scrollY === 0;
        },
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<style>
</style>