<template>
    <div class="field">
        <h4>{{title}}</h4>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['title'],
};
</script>

<style lang="scss" scoped>
.field {
    text-align: left;
    margin-top: 3rem;
    h4 {
        font-size: 20px;
        position: relative;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #000;
    }
    h4::before {
        position: absolute;
        content: '';
        right: 0;
        bottom: -10px;
        left: 0;
        background: #141414;
        height: 1px;
    }
}
</style>
