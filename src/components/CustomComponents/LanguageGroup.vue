<template>
    <div>
        <div v-for="(langSkill, i) in languageSkills" :key="`${name}-langSkill-${i}`">
            <md-input-container>
                <label>Language</label>
                <md-select name="" v-model="languageSkills[i].language">
                    <md-option v-for="lang in languages" :value="lang.value" :key="lang.value">
                        {{lang.label}}
                    </md-option>
                </md-select>
            </md-input-container>
            <radio-group
                :options="level"
                :default="langSkill.level"
                :value.sync="languageSkills[i].level"
                :name="`${name}-level-${i}`">
            </radio-group>
        </div>
        <div @click="addLanguage"
            v-if="languageSkills.length < limit"
            class="gc-add-language">
            <i class="fa fa-plus-square"></i> {{addingStr}}
        </div>
    </div>
</template>

<script>
import RadioGroup from './RadioGroup';
import { languages } from '../../config';

export default {
    components: { RadioGroup },
    props: {
        name: {
            type: String,
            required: true,
        },
        level: {
            type: Array,
            required: true,
        },
        default: {
            type: Array,
            default: () => [{ language: '', level: this.level[0].value }],
        },
        limit: {
            type: Number,
            default: 3,
        },
        addingStr: {
            type: String,
            default: 'ADD',
        },
    },
    data() {
        return {
            languageSkills: [...this.default],
            languages,
        };
    },
    watch: {
        languageSkills: {
            handler(preData, nextData) {
                const parsedData = nextData.filter((data) => {
                    if (data.language === '') {
                        return false;
                    }
                    return true;
                });
                this.$emit('update:value', parsedData);
            },
            deep: true,
        },
    },
    methods: {
        addLanguage() {
            this.languageSkills.push({ language: '', level: this.level[0].value });
        },
    },
};
</script>

<style lang="scss" scoped>
.gc-add-language {
    color: #60bc90;
    margin: 1rem 1rem 2rem;
    text-decoration: underline;
    cursor: pointer;
}
</style>
