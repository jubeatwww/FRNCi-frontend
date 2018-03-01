<template>
    <div>
        <tw v-if="region === 'zh-TW'"></tw>
        <en v-else></en>
    </div>
</template>
<script>
import tw from './zh-TW/Main';
import en from './en-US/Main';

export default {
    components: {
        tw,
        en,
    },
    data() {
        return {
            region: navigator.language,
        };
    },
};
</script>

<style>

</style>