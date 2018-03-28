<template>
    <div>
        <div class="language-group">
            <span>Speak</span>
            <Language v-for="(lang, i) in native" :key="i" :language="lang" color="#f8b62c"></Language>
        </div>
        <div class="language-group">
            <span>Learning</span>
            <Language v-for="(lang, i) in study" :key="i" :language="lang"></Language>   
        </div>
    </div>
</template>

<script>
import Language from './Language';

export default {
    props: ['native', 'study'],
    components: { Language },
};
</script>

<style lang="scss" scoped>
.language-group {
    display: flex;
    span {
        padding: 0 15px;
        width: 20%;
    }

    > div {
        padding: 0 15px;
    }
}
</style>
