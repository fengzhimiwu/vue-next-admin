
import { EnumAlignType } from "./EnumAliagnType";
import { EnumAttributeType } from "./EnumAttributeType";
import { EnumDateFormat } from "./EnumDateFormat";
import { EnumMultiplicity } from "./EnumMultiplicity";
import { EnumReferenceType } from "./EnumReferenceType";
import { MDAttributeBase } from "./MDAttributeBase";
import { MDEntity } from "./MDEntity";

/**
 * 实体属性类
 */
export class MDAttribute extends MDAttributeBase {
    /** 所属实体 */
    private entity: MDEntity | null;
    /** 是否是标题 */
    isTitle: boolean;
    /** 是否可空 */
    isNullable: boolean;
    /** 是否只读 */
    isReadOnly: boolean;
    /** 最大长度 */
    length: number;
    /** 是否可排序 */
    isSort: boolean;
    /** 是否是缺省排序 */
    isDefaultSort: boolean;
    /** 是否是百分比 */
    isPercent: boolean;
    /** 是否可录入 */
    isInput: boolean;
    /** 是否可查询 */
    isQuery: boolean;
    /** 是否在列表 */
    isInList: boolean;
    /** 在列表中的对齐方式 */
    listAlign: EnumAlignType;
    /** 是否进行校验 */
    isValidate: boolean;
    /** 校验的正则表达式 */
    validateExpress: string;
    /** 校验提示消息 */
    vaildMessage: string;
    /** 是否是富文本 */
    isRichText: boolean;
    /** 是否是集合 */
    isCollection: boolean;
    /** **分组名称*/
    uiGroupName: string;
    /** Bool为True时显示名称 */
    trueLab: string;
    /** Bool为Flase时显示名称 */
    falseLab: string;
    /** 数字类型最大值 */
    maxNumber: number;
    /** 数字类型最小值 */
    minNumber: number;
    /** 数字类型小数位 */
    numberPrecision: number;

    public constructor() {
        super();
        this.entity = null;
        this.isTitle = false;
        this.isNullable = true;
        this.isReadOnly = false;
        this.length = 50;
        this.isSort = false;
        this.isDefaultSort = false;
        this.isPercent = false;
        this.isInput = true;
        this.isQuery = false;
        this.isInList = false;
        this.listAlign = EnumAlignType.Left;
        this.isValidate = false;
        this.validateExpress = '';
        this.isRichText = false;
        this.isCollection = false;
        this.uiGroupName = '';
        this.vaildMessage = '';
        this.trueLab = '是';
        this.falseLab = "否";
        this.maxNumber = Infinity;
        this.minNumber = -Infinity;
        this.numberPrecision = 0;
    }

    /**
     * 获取所属的实体
     * @returns 实体
     */
    public GetEntity() {
        return this.entity;
    }

    /**
     * 设置所属的实体
     * @param entity 实体
     */
    public SetEntity(entity: MDEntity | null) {
        this.entity = entity;
    }

    /**
     * 创建实体属性
     * @param name 名称
     * @param fullName 全名
     * @param displayName 显示名称
     * @param description 描述
     * @param attributeType 属性类型
     * @param dataType 数据类型
     * @param defaultValue 缺省值
     * @param isTitle 是否是标题属性
     * @param isNullable 是否可空
     * @param isReadOnly 是否是只读
     * @param length 最大长度
     * @param isSort 是否可排序
     * @param isDefaultSort 是否是缺省的排序属性
     * @param isPercent 是否是百分比
     * @param isInput 是否可录入
     * @param isQuery 是否可查询
     * @param isInList 是否在列表中
     * @param listAlign 列表中的对齐方式
     * @param isValidate 是否需要校验
     * @param validateExpress 校验的正则表达式，当isValidate为true时有效
     * @param vaildMessage 校验失败提示消息
     * @param isRichText 是否是富文本
     * @param isCollection 是否是集合
     * @param uiGroupName 分组名称
     * @param refNamespace 引用实体名空间
     * @param refEntityName 引用实体名称
     * @param referenceType 参照类型
     * @param multiplictity 引用的多样性
     * @param minNumber 数字类型最小值
     * @param maxNumber 数字类型最大值;
     * @param numberPrecision 数字类型小数位;
     * @param maxNumber 数字类型最大值;
     * @param trueLab 为true是显示名称
     * @param falseLab 为false是显示名称
     * @returns 
     */
    static Create(name: string, fullName: string, displayName: string, description: string, attributeType: EnumAttributeType,
        dataType: string, defaultValue: string, isTitle: boolean, isNullable: boolean, isReadOnly: boolean, length: number,
        isSort: boolean, isDefaultSort: boolean, isPercent: boolean, isInput: boolean, isQuery: boolean,
        isInList: boolean, listAlign: EnumAlignType, isValidate: boolean, validateExpress: string,
        isRichText: boolean, isCollection: boolean, uiGroupName: string,
        refNamespace: string, refEntityName: string, referenceType: EnumReferenceType, multiplictity: EnumMultiplicity,
        dateFormat: EnumDateFormat, vaildMessage: string, minNumber: number, maxNumber: number, numberPrecision: number, trueLab: string, falseLab: string): MDAttribute {
        const attribute: MDAttribute = new MDAttribute();
        attribute.SetAttributeValue(name, fullName, displayName, description, attributeType, dataType,
            defaultValue, refNamespace, refEntityName, referenceType, multiplictity, dateFormat);
        attribute.name = name;
        attribute.fullName = fullName;
        attribute.displayName = displayName;
        attribute.description = description;
        attribute.dataType = dataType;
        attribute.defaultValue = defaultValue;
        attribute.isTitle = isTitle;
        attribute.isNullable = isNullable;
        attribute.isReadOnly = isReadOnly;
        attribute.length = length;
        attribute.isSort = isSort;
        attribute.isDefaultSort = isDefaultSort;
        attribute.isPercent = isPercent;
        attribute.isInput = isInput;
        attribute.isQuery = isQuery;
        attribute.isInList = isInList;
        attribute.listAlign = listAlign;
        attribute.isValidate = isValidate;
        attribute.validateExpress = validateExpress;
        attribute.vaildMessage = vaildMessage;
        attribute.isRichText = isRichText;
        attribute.isCollection = isCollection;
        attribute.uiGroupName = uiGroupName;
        attribute.minNumber = minNumber;
        attribute.maxNumber = maxNumber;
        attribute.minNumber = minNumber;
        attribute.numberPrecision = numberPrecision;
        attribute.trueLab = trueLab;
        attribute.falseLab = falseLab;
        return attribute;
    }
}
