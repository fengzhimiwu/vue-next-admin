<template>
    <!-- <el-form-item :label="attribute.displayName" prop="{{attribute.name}}" :title="attribute.description"> -->
        <template v-if="isCollection()">
            <ax-input-ddl-multi ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText" :labelWidth="labelWidth" :entries="entries" v-model="value" :isForSearch="false" @valueChanged="valueChanged" :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isEnum()">
            <ax-input-ddl ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText" :labelWidth="labelWidth" :entries="entries" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isRefDropDownList()">
            <ax-input-ddl ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" :entries="entries" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isRefOpenWindow()">
            openwindow
        </template>
        <template v-else-if="isRefRadioBoxList()">
            <ax-input-radio ref="attrCom" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" :entries="entries" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isString()">
            <ax-input-string ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isLongString()">
            <ax-input-long-string ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isBoolean()">
            <ax-input-bool ref="attrCom" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" v-model="value" :isForSearch="false" @valueChanged="valueChanged" :disabled="disabled" :titleText="titleText" :visible="visible" />
        </template>
        <template v-else-if="isDateTime()">
            <ax-input-datetime ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isDate()">
            <ax-input-date ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isTime()">
            <ax-input-time ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
        <template v-else-if="isNumber()">
            <ax-input-number ref="attrCom" :placeHolder="placeHolder" :attribute="attribute" :lableText="lableText"  :labelWidth="labelWidth" v-model="value" :isForSearch="false" @valueChanged="valueChanged"  :disabled="disabled" :titleText="titleText" :visible="visible"/>
        </template>
    <!-- </el-form-item> -->
</template>
<script lang="ts">
/**
 * 属性控件
 * @author mst
 */
import { EnumAttributeType } from "@/infrastructure/md/EnumAttributeType";
import { EnumReferenceType } from "@/infrastructure/md/EnumReferenceType";
import { MDAttribute } from "@/infrastructure/md/MDAttribute";
import { computed, defineComponent, ref } from "vue";
import AxInputBool from "./ax-input-bool.vue";
import AxInputDatetime from "./ax-input-datetime.vue";
import AxInputDate from "./ax-input-date.vue";
import AxInputTime from "./ax-input-time.vue";
import AxInputString from "./ax-input-string.vue";
import AxInputLongString from "./ax-input-long-string.vue";
import AxInputRadio from "./ax-input-radio.vue";
import AxInputDdl from "./ax-input-ddl.vue";
import AxInputDdlMulti from "./ax-input-ddl-multi.vue";
import { Dictionary } from "@/infrastructure/util/Dictionary";
import AxInputNumber from "./ax-input-number.vue";
import { EnumDateFormat } from "@/infrastructure/md/EnumDateFormat";
export default defineComponent({
    name: 'ax-attr',
    components: {
        AxInputString,
        AxInputLongString,
        AxInputBool,
        AxInputDatetime,
        AxInputDate,
        AxInputTime,
        AxInputDdl,
        AxInputDdlMulti,
        AxInputRadio,
        AxInputNumber,
    },
    props: {
        /** 属性元数据 */
        attribute: {
            type : MDAttribute,
            required: true
        },
        /** 缺省值 */
        modelValue: {
            type: [String, Boolean, Date, Number, Array],
            default: ''
        },
        /** 对于多个选项（下拉、单选、多选等）的情况，提供所有的备选值列表 */
        entries: {
            type: Dictionary
        },
        /** 属性文本的长度，默认100px */
        labelWidth: {
            type: Number,
            default: 100
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
        }
    },
    emits:['valueChanged','update:modelValue'],
    setup(props, { emit }) {

        // 数据值
        const value = computed<string|boolean|Date|number|Array<any>>({
            get: () => props.modelValue,
            set: val => {                
                emit('update:modelValue', val);
            }
        });

        const valueChanged = () =>{
            emit('valueChanged');
        };
        
        const attrCom = ref(null);
        const isValid = (): boolean => {
            return (attrCom.value as any).isValid();
        };
        
        return {
            value: value as unknown as string | boolean | Date | number | Array<any>,
            valueChanged,
            isValid,
            attrCom,
        }
    },
    methods:{
        /** 是否是集合 */
        isCollection(): boolean{
            return (this.attribute.isCollection);
        },
        /** 属性是否是字符串类型 */
        isString(): boolean{
            return this.attribute.dataType === "string" && this.attribute.length <= 100;
        },
        /** 属性是否是长字符串类型 */
        isLongString(): boolean{
            return this.attribute.dataType === "string" && this.attribute.length > 100;
        },
        /** 是否是数值 */
        isNumber(): boolean{
            return this.attribute.dataType === "number";
        },
        /** 属性是否是布尔类型 */
        isBoolean(): boolean{
            return this.attribute.dataType === "boolean";
        },
        /** 是否是枚举 */
        isEnum(): boolean{
            return (this.attribute.attributeType === EnumAttributeType.Enum);
        },
        /** 是否是引用：普通下拉 */
        isRefDropDownList(): boolean{
            return (this.attribute.attributeType === EnumAttributeType.EntityRef || this.attribute.attributeType === EnumAttributeType.DTORef)
            && this.attribute.referenceType === EnumReferenceType.DropDownList;
        },
        /** 是否是引用：弹出窗口 */
        isRefOpenWindow(): boolean{
            return (this.attribute.attributeType === EnumAttributeType.EntityRef || this.attribute.attributeType === EnumAttributeType.DTORef)
            && this.attribute.referenceType === EnumReferenceType.OpenWindow;
        },
        /** 是否是引用：平铺单选 */
        isRefRadioBoxList(): boolean{
            return (this.attribute.attributeType === EnumAttributeType.EntityRef || this.attribute.attributeType === EnumAttributeType.DTORef)
            && this.attribute.referenceType === EnumReferenceType.RadioBoxList;
        },
        /** 是否是时间日期 */
        isDateTime(): boolean{
            return this.attribute.dataType === "Date" && this.attribute.dateFormat === EnumDateFormat.DateTime;
        },
        /** 是否是日期 */
        isDate(): boolean{
            return this.attribute.dataType === "Date" && this.attribute.dateFormat === EnumDateFormat.Date;
        },
        /** 是否是时间 */
        isTime(): boolean{
            return this.attribute.dataType === "Date" && this.attribute.dateFormat === EnumDateFormat.Time;
        }
    }
});
</script>
<style lang="scss" scoped>
</style>