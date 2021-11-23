<template>
    <template v-if="isForSearch">
        <el-radio-group v-model="value"  @change="valueChanged" size="small" :disabled="disabled">
            <el-radio v-for="item in entries.Entries" border :key="item.value" :label="item.value">{{item.key}}</el-radio>
        </el-radio-group>
    </template>
    <template v-else>
        <el-form :model="entries" ref="refForm" :label-width="labelWidth + 'px'" display:flex flex-direction: row flex-wrap: wrap v-if="visible">
            <el-form-item :label="(lableText==''?attribute.displayName:lableText)" prop="attr" :title="(titleText==''?attribute.description:titleText)">
                <el-radio-group v-model="value" :disabled="disabled||!attribute.isInput" @change="valueChanged" size="small">
                    <el-radio v-for="item in entries.Entries" border :key="item.value" :label="item.value">{{item.key}}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </template>
</template>
<script lang="ts">
/**
 * 通用单选控件，使用<key, value>
 * @author mst
 */
import { MDAttribute } from "@/infrastructure/md/MDAttribute";
import { computed, defineComponent } from "vue";
import { Dictionary } from "@/infrastructure/util/Dictionary"

export default defineComponent({
    name: 'ax-input-ddl',
    props: {
        modelValue: {
            type: String,
            required: true
        },
        entries:{
            type: Dictionary,
            require: true
        },
        /** 属性元数据 */
        attribute: {
            type : MDAttribute,
            required: true
        },
        /** 是否用于搜索，搜索情况下不做录入校验，不封装form */
        isForSearch: {
            type: Boolean,
            default: false
        },
        /** 属性文本的长度，默认100px */
        labelWidth: {
            type: Number,
            requried: true
        },        
        /** 属性文本 */
        lableText: {
            type: String,
            default:''
        },
        /** title文本 */
        titleText: {
            type: String,
            default:'',
        },
        /** 禁用 */
        disabled: {
            type: Boolean,
            default:false
        },
        /** 可见性 */
        visible:{
            type: Boolean,
            default:true
        }
    },
    emits:['valueChanged','update:modelValue'],
    setup(props, { emit }) {

        // 数据值
        const value = computed<string>({
            get: () => props.modelValue,
            set: val => {
                emit('update:modelValue', val || '');
            }
        });

        const valueChanged = () => {
            emit('valueChanged');
        };

        /** 校验结果是否通过，由外层统一调用 */
        const isValid = (): boolean => {
            return true;
        };


        return {
            value,
            valueChanged,
            isValid,
        }
    }
});
</script>
<style lang="scss" scoped>
</style>