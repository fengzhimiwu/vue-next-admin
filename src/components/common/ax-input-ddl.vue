<template>
    <template v-if="isForSearch">
        <el-select v-model="value" :placeholder="placeHolder"  @change="valueChanged" clearable :disabled="disabled">
            <el-option v-for="item in entries?.Entries" :key="item.value" :label="item.key" :value="item.value" />
        </el-select>
    </template>
    <template v-else>
        <el-form :model="formModel" ref="refForm" :label-width="labelWidth + 'px'" display:flex flex-direction: row flex-wrap: wrap v-if="visible">
            <el-form-item :label="(lableText==''?attribute.displayName:lableText)" prop="attr" :title="(titleText==''?attribute.description:titleText)" :rules="rules()">
                <el-select v-model="formModel.attr" :placeholder="placeHolder" :disabled="disabled||!attribute.isInput" @change="valueChanged" clearable>
                    <el-option v-for="item in entries?.Entries" :key="item.value" :label="item.key" :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
    </template>
</template>
<script lang="ts">
/**
 * 通用下拉控件，最基础的下拉控件，使用<key, value>
 * @author mst
 */
import { MDAttribute } from "@/infrastructure/md/MDAttribute";
import { Validate } from "@/infrastructure/util/Validate";
import { computed, defineComponent, reactive, ref } from "vue";
import { Dictionary } from "@/infrastructure/util/Dictionary"

export default defineComponent({
    name: 'ax-input-ddl',
    props: {
        entries:{
            type: Dictionary,
            require: true
        },
        modelValue: {
            type: [String, Number, Boolean],
            default: ''
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
            default: '请选择',
        }
    },
    emits:['valueChanged','update:modelValue'],
    setup(props, { emit }) {

        // 数据值
        const value = computed<string|number|boolean>({
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
                return Validate.getRules(props.attribute, 'change');
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
            value: value as unknown as string | number | boolean,
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