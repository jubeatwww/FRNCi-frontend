<template>
    <div class="checkbox-group"
        style="display: flex">
        <div v-for="(optCol, colIdx) in _optionsColumns" 
            :key="`${name}-checkbox-group-col-${colIdx}`"
            :style="columnStyle">
            <md-checkbox
                v-for="(opt, idx) in optCol"
                :key="`${name}-${opt.value}`"
                :name="name"
                :id="`${name}-${opt.value}`"
                :md-value="opt.value"
                :disabled="selected.length >= limit && disabledList[colLength * colIdx + idx]"
                @change="changed(colLength * colIdx + idx)"
                v-model="selected">
                {{ opt.label }}
            </md-checkbox>
        </div>
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
        limit: {
            type: Number,
            default: Number.MAX_VALUE,
        },
        columns: {
            type: Number,
            default: 1,
        },
        default: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selected: this.default,
            disabledList: [...Array(this.options.length)].map(() => true),
        };
    },
    computed: {
        supplementOptions() {
            return this.options.map((opt, i) => ({
                value: i,
                label: i,
                ...opt,
            }));
        },
        colLength() {
            const len = Math.floor(this.options.length / this.columns);
            return (this.options.length % this.columns) ? len + 1 : len;
        },
        _optionsColumns() {
            return [...Array(this.columns)].map((col, i) =>
                this.supplementOptions.slice(this.colLength * i, this.colLength * (i + 1)),
            );
        },
        columnStyle() {
            return {
                disaply: 'flex',
                flexDirection: 'column',
                width: `${100 / this.columns}%`,
            };
        },
    },
    methods: {
        changed(idx) {
            if (this.selected.length >= this.limit) {
                this.alertify.notify(
                    `You can only select ${this.limit} at most`,
                    'warning',
                    2,
                );
            }

            this.disabledList[idx] = !this.disabledList[idx];
            this.$emit('update:value', this.selected);
        },
    },
    created() {
        this.default.map((val) => {
            const idx = this.options.findIndex(opt => opt.value === val);
            this.disabledList[idx] = false;
            return false;
        });
    },
};
</script>

<style lang="scss" scoped>
.md-checkbox {
    width: 100%;
}
</style>
