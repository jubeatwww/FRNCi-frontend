<template>
    <div>
        <FRNCiHeader :scrollTop="scrollTop"></FRNCiHeader>
        <OnBoard></OnBoard>
        <SearchForm></SearchForm>
        <HowTo></HowTo>
        <Feedback></Feedback>
        <FRNCiFooter></FRNCiFooter>
    </div>
</template>
<script>
import FRNCiHeader from './Header';
import OnBoard from './OnBoard';
import SearchForm from './SearchForm';
import Feedback from './Feedback';
import HowTo from './HowTo';
import FRNCiFooter from './Footer';

export default {
    components: {
        FRNCiHeader,
        OnBoard,
        SearchForm,
        Feedback,
        HowTo,
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