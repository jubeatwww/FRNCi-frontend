<template>
    <div>
        <FRNCiHeader :scrollTop="scrollTop"></FRNCiHeader>
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

<style lang="scss">
body {
    font-family: "Microsoft JhengHei", PMingLiU, MingLiu, "Segoe UI", "Helvetica", Garuda, Arial, sans-serif;

    .md-button {
        text-transform: none;
    }
}
</style>