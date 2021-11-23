<template>
    <el-date-picker
        v-model="value"
        type="datetimerange"
        size="small"
        style="width:360px"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :disabled="disabled"
        @change="valueInput">
    </el-date-picker>
</template>
<script lang="ts">
/**
 * 通用区间控件，支持：string, number, Date
 * 暂时不支持输入值校验，仅用于查询
 * @author mst
 */
import { computed, defineComponent, reactive, ref } from "vue";
export default defineComponent({
    name: 'ax-input-between-datetime',
    props: {
        /** 缺省值：最小值 */
        modelMinValue: {
            type: [String, Date],
            default: '',
        },
        /** 缺省值：最大值 */
        modelMaxValue: {
            type: [String, Date],
            default: '',
        },
        /** 禁用 */
        disabled: {
            type: Boolean,
            default:false
        }
    },
    emits:['valueChanged','update:modelMinValue','update:modelMaxValue'],
    setup(props, { emit }) {
        // 数据值：最小值
        const minValue = computed<string|Date>({
            get: () => props.modelMinValue,
            set: val => {
                emit('update:modelMinValue', val);
                emit('valueChanged');
            }
        });
        // 数据值：最大值
        const maxValue = computed<string|Date>({
            get: () => props.modelMaxValue,
            set: val => {                
                emit('update:modelMaxValue', val);
                emit('valueChanged');
            }
        });

        const value = ref([minValue, maxValue]);

        const valueInput = (val: any) =>{
            minValue.value = val[0];
            maxValue.value = val[1];
        }
        
        return {
            minValue,
            maxValue,
            value,
            valueInput,
        }
    }
});
</script>
<style lang="scss" scoped>
</style>