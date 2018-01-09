<template>
    <div>
        <div>
            <span>Speak</span>
            <Language v-for="(lang, i) in speaking" :key="i" :lang="lang"></Language>   
        </div>
        <div>
            <span>Learning</span>
            <Language v-for="(lang, i) in learning" :key="i" :lang="lang"></Language>   
        </div>
    </div>
</template>

<script>
import Language from './Language';

export default {
    props: ['speaking', 'learning'],
    component: [Language],
};
</script>

<style lang="scss" scoped>

</style>
