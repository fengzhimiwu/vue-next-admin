<template>
    <ax-input-radio ref="refCom" v-model="value" :entries="entries.values" :lableText="lableText" :attribute="attribute" :labelWidth="labelWidth" @valueChanged="valueChanged" :disabled="disabled" :titleText="titleText" :visible="visible"/>
</template>
<script lang="ts">
/**
 * 通用布尔控件: 开关型
 * @author mst
 */
import { MDAttribute } from "@/infrastructure/md/MDAttribute";
import { Dictionary } from "@/infrastructure/util/Dictionary";
import { computed, defineComponent, reactive, ref } from "vue";
import axInputRadio from "./ax-input-radio.vue";
export default defineComponent({
  components: { axInputRadio },
    name: 'ax-input-bool',
    props: {
        /** 属性元数据 */
        attribute: {
            type : MDAttribute,
            required: true
        },
        /** 缺省值 */
        modelValue: {
            type: [Boolean, String],
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
        const value = computed<string|boolean>({
            get: () => String(props.modelValue).toLowerCase(),
            set: val => {
                emit('update:modelValue', val === 'true');
            }
        });

        /** 获取枚举元数据，构建下拉框需要的字典 */
        const entries = reactive({values:new Dictionary<string, string>()});
        entries.values.append(props.attribute.trueLab, "true");
        entries.values.append(props.attribute.falseLab, "false");

        const valueChanged = () => {
            emit('valueChanged');
        };
        
        const refCom = ref(null);
        const isValid = (): boolean => {
            return (refCom.value as any).isValid();
        };

        return {
            value: value as unknown as boolean,
            valueChanged,
            entries,
            isValid,
            refCom,
        }
    }
});
</script>
<style lang="scss" scoped>
</style>