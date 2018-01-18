<template>
    <div class="radio-group">
        <label v-for="opt in _options" :for="`${name}-${opt.value}`" :key="opt.value">
            <input type="radio" :name="name" :id="`${name}-${opt.value}`" :value="opt.value" v-model="selected">
            <md-button @click="clicked">{{opt.label}}</md-button>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        default: {
            type: Number,
            default: 0,
        },
    },
    data() {
        const d = this.default < this.options.length ? this.default : this.options.length - 1;
        return {
            selected: this.options[d].value,
        };
    },
    computed: {
        _options() {
            return this.options.map((opt, i) => ({
                value: i,
                label: i,
                ...opt,
            }));
        },
    },
    methods: {
        clicked(e) {
            this.selected = e.target.previousElementSibling.value;
        },
    },
};
</script>

<style lang="scss" scoped>
input[type="radio"] {
    display: none;
    
    & ~ button {
        color: #60bc90;
    }

    &:checked ~ button {
        color: white;
        background-color: #60bc90 !important;
    }
}
</style>
