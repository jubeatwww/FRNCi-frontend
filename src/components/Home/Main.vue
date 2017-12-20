<template>
    <div>
        <OnBoard></OnBoard>
        <SearchForm></SearchForm>
        <HowTo></HowTo>
        <Feedback></Feedback>
    </div>
</template>
<script>
import OnBoard from './OnBoard';
import SearchForm from './SearchForm';
import Feedback from './Feedback';
import HowTo from './HowTo';

export default {
    components: {
        OnBoard,
        SearchForm,
        Feedback,
        HowTo,
    },
};
</script>

<style>
</style>