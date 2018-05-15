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
    max-width: 25%;
    padding: 0 15px;
    @media screen and (max-width: 767px) {
        max-width: 100%;
    }

    header {
        padding: 8px 16px;
        border-bottom: 2px solid #60bc90;
        img {
            width: 70px;
        }

        h6 {
            margin: .5rem 0 .25rem;
            line-height: 1.2;
            font-size: 1rem;
            color: inherit;
        }
    }
}
</style>
