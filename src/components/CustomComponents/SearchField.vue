<template>
    <section>
        <header>
            <img :src="icon">
            <h6>{{ title }}</h6>
        </header>
        <article>
            <slot>
            </slot>
        </article>
    </section>
</template>

<script>
export default {
    props: ['title', 'icon'],
};
</script>

<style lang="scss" scoped>
section {
    display: flex;
    flex-direction: column;
}
</style>
