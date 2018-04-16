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

<style lang="scss">
body {
    font-family: "Microsoft JhengHei", PMingLiU, MingLiu, "Segoe UI", "Helvetica", Garuda, Arial, sans-serif;

    .md-button {
        text-transform: none;
    }
}
</style>