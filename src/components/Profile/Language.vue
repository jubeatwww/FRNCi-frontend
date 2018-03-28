<template>
    <div class="language">
        <div>{{languageName}} - {{language.level}}</div>
        <div class="progress">
            <div class="bar" :style="[barLength, barColor]"></div>
        </div>
    </div>
</template>

<script>
import { languages } from '../../config';

export default {
    props: {
        language: {
            type: Object,
        },
        color: {
            type: String,
            default: '#60bc90',
        },
    },
    data() {
        return { languages };
    },
    computed: {
        languageName() {
            return this.languages.find(lang => lang.value === this.language.language).label;
        },
        level() {
            switch (this.language.level) {
            case 'beginner':
                return '20%';
            case 'elementary':
                return '40%';
            case 'intermediate':
                return '60%';
            case 'fluent':
                return '80%';
            case 'native':
                return '100%';
            default:
                return '0%';
            }
        },
        barLength() {
            return { width: this.level };
        },
        barColor() {
            return { backgroundColor: this.color };
        },
    },
};
</script>

<style lang="scss" scoped>
.language {
    display: flex;
    flex-direction: column;
    width: 25%;

    .progress {
        width: 100%;
        background-color: #e9ecef;
        height: 1rem;
        border-radius: 0.25rem;
        overflow: hidden;

        .bar {
            width: 80%;
            height: 100%;
        }
    }
}
</style>
