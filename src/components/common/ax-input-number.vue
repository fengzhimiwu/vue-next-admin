<template>
    <template v-if="isForSearch">
        <el-input :placeholder="placeHolder==''?attribute.description:placeHolder" v-model.number="formModel.attr"  @input="valueChanged" :disabled="disabled"/>
    </template>
    <template v-else>
        <el-form :model="formModel" ref="refForm" :label-width="labelWidth + 'px'" display:flex flex-direction: row flex-wrap: wrap v-if="visible">
            <el-form-item :label="(lableText==''?attribute.displayName:lableText)" prop="attr" :title="(titleText==''?attribute.description:titleText)" :rules="rules()">
                <el-input-number :controls="false" :placeholder="placeHolder==''?attribute.description:placeHolder" :precision="attribute.numberPrecision" :max="attribute.maxNumber" :min="attribute.minNumber" v-model.number="formModel.attr" :disabled="disabled||!attribute.isInput" @input="valueChanged" />
            </el-form-item>
        </el-form>
    </template>
</template>
<script lang="ts">
/**
 * 通用数字控件
 * @author mst
 */
import { MDAttribute } from "@/infrastructure/md/MDAttribute";
import { Validate } from "@/infrastructure/util/Validate";
import { computed, defineComponent, reactive, ref } from "vue";
export default defineComponent({
    name: 'ax-input-number',
    props: {
        /** 缺省值 */
        modelValue: {
            type: Number,
            default: 0
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
        },
        /** 默认显示文字 */
        placeHolder:{
            type: String,
            default: '',
        }
    },
    emits:['valueChanged','update:modelValue'],
    setup(props, { emit }) {
        // 数据值
        const value = computed<number>({
            get: () => props.modelValue,
            set: val => {
                emit('update:modelValue', val);
            }
        });

        /** 表单数据模型，包装了v-model */
        const formModel = reactive({attr: value});

        /** 本身ELForm的引用，此对象在onmounted之后可用 */
        const refForm = ref(null);

        /** 值发生变化以后抛出的事件，不带参数 */
        const valueChanged = () => {
            emit('valueChanged');
        };
        
        /** 获取校验规则 */
        const rules = () => {
            if(!props.isForSearch){
                return Validate.getRules(props.attribute, 'blur');
            }else{
                return [];
            }
        };

        /** 校验结果是否通过，由外层统一调用 */
        const isValid = (): boolean => {
          let result = true;
          (refForm.value as any).validate((valid: any) => {
            result = valid;
          });
          return result;
        };

        return {
            value,
            valueChanged,
            formModel,
            isValid,
            rules,
            refForm,
        }
    }
});
</script>
<style lang="scss" scoped>
</style>