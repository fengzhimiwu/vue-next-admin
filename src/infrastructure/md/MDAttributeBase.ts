import { EnumAttributeType } from "./EnumAttributeType";
import { EnumDateFormat } from "./EnumDateFormat";
import { EnumMultiplicity } from "./EnumMultiplicity";
import { EnumReferenceType } from "./EnumReferenceType";
import { MDBaseElement } from "./MDBaseElement";

/**
 * 属性基类
 */  
export abstract class MDAttributeBase extends MDBaseElement {
    /** 属性类型 */
    attributeType: EnumAttributeType;
    /** 数据类型 */ 
    dataType: string;
    /** 缺省值 */
    defaultValue: string;
    /** 引用实体名空间 */
    refNamespace: string;
    /** 引用实体名称 */
    refEntityName: string;
    /** 参照类型 */
    referenceType: EnumReferenceType;
    /** 引用得多样性 */
    multiplictity: EnumMultiplicity;
    /** 日期的格式 */
    dateFormat: EnumDateFormat;

    protected constructor(){
        super();
        this.attributeType = EnumAttributeType.Primitive;
        this.dataType = '';
        this.defaultValue = '';
        this.refNamespace = '';
        this.refEntityName = '';
        this.referenceType = EnumReferenceType.DropDownList;
        this.multiplictity = EnumMultiplicity.None;
        this.dateFormat = EnumDateFormat.DateTime;
    }

    /**
     * 设置基础值
     * @param name 名称
     * @param fullName 全名称
     * @param displayName 显示名称
     * @param description 描述信息
     * @param attributeType 属性类型
     * @param dataType 数据类型
     * @param defaultValue 缺省值
     * @param refNamespace 引用实体名空间
     * @param refEntityName 引用实体名称
     * @param referenceType 参照类型
     * @param dateFormat 日期格式
     */
    protected SetAttributeValue(name: string, fullName: string, displayName: string, description: string, 
        attributeType: EnumAttributeType, dataType: string, defaultValue: string,
        refNamespace: string, refEntityName: string, referenceType: EnumReferenceType, multiplictity: EnumMultiplicity,
        dateFormat: EnumDateFormat){
        super.SetValue(name, fullName, displayName, description);
        this.attributeType = attributeType;
        this.dataType = dataType;
        this.defaultValue = defaultValue;
        this.refNamespace = refNamespace;
        this.refEntityName = refEntityName;
        this.referenceType = referenceType;
        this.multiplictity = multiplictity;
        this.dateFormat = dateFormat;
    }
 }
    