<template>
    <nav :style="bgStyle">
        <figure><img :src="avatar"/></figure>
        <h2>{{name}}</h2>
        <h2>{{position}}</h2>
        <h2>{{nationality}}</h2>
        <button></button>
    </nav>
</template>

<script>
export default {
    props: {
        bg: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
            default: 'static/img/logo_frnci.png',
        },
        name: {
            type: String,
            default: 'FRNCi',
        },
        nationality: {
            type: String,
            default: '',
        },
        position: {
            type: String,
            default: '',
        },
    },
    computed: {
        bgStyle() {
            return {
                background: `${this.bg} no-repeat center center`,
                height: '200px',
            };
        },
    },
};
</script>

<style lang="scss" scoped>

figure {
    position: relative;
    float: left;
    border: 3px solid gray;
    border-radius: 150%;
    overflow: hidden;
    margin: 0;
    height: 150px;
    width: 150px;

    img {  
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
