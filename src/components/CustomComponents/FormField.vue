<template>
    <section>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <slot>
        </slot>
    </section>
</template>

<script>
export default {
    props: ['title', 'description'],
};
</script>

<style lang="scss" scoped>

</style>
