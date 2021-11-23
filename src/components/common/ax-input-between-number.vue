<template>
    <el-col :span="11">
      <el-input type="text" placeholder="从" v-model="minValue" style="width: 60px;" :disabled="disabled"/>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-input type="text" placeholder="到" v-model="maxValue" style="width: 60px;" :disabled="disabled"/>
    </el-col>
</template>
<script lang="ts">
/**
 * 通用区间控件，支持：string, number, Date
 * 暂时不支持输入值校验，仅用于查询
 * @author mst
 */
import { computed, defineComponent } from "vue";
export default defineComponent({
    name: 'ax-input-between-number',
    props: {
        /** 缺省值：最小值 */
        modelMinValue: {
            type: String,
            default: '',
        },
        /** 缺省值：最大值 */
        modelMaxValue: {
            type: String,
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
        const minValue = computed<string>({
            get: () => props.modelMinValue,
            set: val => {                
                emit('update:modelMinValue', val);
                emit('valueChanged');
            }
        });
        // 数据值：最大值
        const maxValue = computed<string>({
            get: () => props.modelMaxValue,
            set: val => {                
                emit('update:modelMaxValue', val);
                emit('valueChanged');
            }
        });

        return {
            minValue,
            maxValue,
        }
    }
});
</script>
<style lang="scss" scoped>
</style>