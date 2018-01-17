<template>
    <section>
        <ProfileNav></ProfileNav>
        <Languages :speaking="speaking" :learning="learning"></Languages>
    </section>
</template>

<script>
import ProfileNav from './Nav';
import Languages from './Languages';

export default {
    components: {
        ProfileNav,
        Languages,
    },
    data() {
        return {
            speaking: [],
            learning: [],
        };
    },
};
</script>

<style lang="scss" scoped>

</style>
