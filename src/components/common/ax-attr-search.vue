<template>
    <el-form-item :label="(lableText==''?attribute.displayName:lableText)" :prop="attribute.name" :title="(titleText==''?attribute.description:titleText)" v-if="visible">
        <template v-if="isEnum()">
            <ax-input-ddl :attribute="attribute" :entries="entries" :isForSearch="true" v-model="value" :disabled="disabled" :placeHolder="placeHolder"/>
        </template>
        <template v-else-if="isRefDropDownList() || isRefOpenWindow() || isRefRadioBoxList()">
            <ax-input-ddl :attribute="attribute" :entries="entries" :isForSearch="true" v-model="value" :disabled="disabled" :placeHolder="placeHolder"/>
        </template>
        <template v-else-if="isString() || isLongString()">
            <ax-input-string :attribute="attribute" :isForSearch="true" v-model="value" :disabled="disabled" :placeHolder="placeHolder"/>
        </template>
        <template v-else-if="isBoolean()">
            <ax-input-ddl :attribute="attribute" :entries="boolEntries" :isForSearch="true" v-model="value" style='width:100px' :disabled="disabled"/>
        </template>
        <template v-else-if="isDateTime()">
            <ax-input-between-datetime v-model:model-max-value="maxValue" v-model:model-min-value="minValue" :disabled="disabled" :placeHolder="placeHolder"/>
        </template>
        <template v-else-if="isDate()">
            <ax-input-between-date v-model:model-max-value="maxValue" v-model:model-min-value="minValue" :disabled="disabled" :placeHolder="placeHolder"/>
        </template>
        <template v-else-if="isTime()">
            <ax-input-between-time v-model:model-max-value="maxValue" v-model:model-min-value="minValue" :disabled="disabled" :placeHolder="placeHolder"/>
        </template>
        <template v-else-if="isNumber()">
            <ax-input-between-number v-model:model-max-value="maxValue" v-model:model-min-value="minValue" :disabled="disabled" :placeHolder="placeHolder"/>
        </template>
    </el-form-item>
</template>
<script lang="ts">
/**
 * 查询属性控件
 * @author mst
 */
import { EnumAttributeType } from "@/infrastructure/md/EnumAttributeType";
import { EnumReferenceType } from "@/infrastructure/md/EnumReferenceType";
import { MDAttribute } from "@/infrastructure/md/MDAttribute";
import { computed, defineComponent, onMounted } from "vue";
import AxInputString from "./ax-input-string.vue";
import AxInputBetweenNumber from "./ax-input-between-number.vue";
import AxInputBetweenDate from "./ax-input-between-date.vue";
import AxInputBetweenDatetime from "./ax-input-between-datetime.vue";
import AxInputBetweenTime from "./ax-input-between-time.vue";
import AxInputDdl from "./ax-input-ddl.vue";
import { Dictionary } from "@/infrastructure/util/Dictionary";
import { EnumDateFormat } from "@/infrastructure/md/EnumDateFormat";
export default defineComponent({
    name: 'ax-attr-search',
    components: {
        AxInputString,
        AxInputDdl,
        AxInputBetweenNumber,
        AxInputBetweenDate,
        AxInputBetweenDatetime,
        AxInputBetweenTime,
    },
    props: {
        /** 属性元数据 */
        attribute: {
            type : MDAttribute,
            required: true
        },
        /** 缺省值，区间控件时无效 */
        modelValue: {
            type: [String, Boolean, Date, Number],
            default: ''
        },
        /** 下拉的时候的字典 */
        entries: {
            type: Dictionary
        },
        /** 缺省值：最小值 */
        modelMinValue: {
            type: [String, Date, Number],
            default: '',
        },
        /** 缺省值：最大值 */
        modelMaxValue: {
            type: [String, Date, Number],
            default: ''
        },
        /** 属性文本 */
        lableText: {
            type: String,
            default: '',
        },
        /** title文本 */
        titleText: {
            type: String,
            default: '',
        },
        /** 禁用 */
        disabled: {
            type: Boolean,
            default: false
        },
        /** 可见性 */
        visible:{
            type: Boolean,
            default: true
        },
        /** 默认显示文字 */
        placeHolder:{
            type: String,
        }
    },
    emits:['update:modelValue','update:modelMinValue','update:modelMaxValue'],
    setup(props, { emit }) {
        // 数据值
        const value = computed<string|boolean|Date|number>({
            get: () => props.modelValue,
            set: val => {
                emit('update:modelValue', val);
            }
        });
        // 数据值：最小值
        const minValue = computed<string|Date|number>({
            get: () => props.modelMinValue,
            set: val => {
                emit('update:modelMinValue', val);
            }
        });
        // 数据值：最大值
        const maxValue = computed<string|Date|number>({
            get: () => props.modelMaxValue,
            set: val => {                
                emit('update:modelMaxValue', val);
            }
        });

        const boolEntries = new Dictionary<string, boolean>();
        boolEntries.append(props.attribute.trueLab, true);
        boolEntries.append(props.attribute.falseLab, false);
        return {
            value: value as unknown as string | boolean | Date | number,
            minValue: minValue as unknown as string | Date | number,
            maxValue: maxValue as unknown as string | Date | number,
            boolEntries,
        }
    },
    methods:{
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