
import { EnumAttributeType } from "./EnumAttributeType";
import { EnumDateFormat } from "./EnumDateFormat";
import { EnumMultiplicity } from "./EnumMultiplicity";
import { EnumReferenceType } from "./EnumReferenceType";
import { MDAttributeBase } from "./MDAttributeBase";
import { MDDTO } from "./MDDTO";

/**
 * 实体属性类
 */  
 export class MDDTOAttribute extends MDAttributeBase {
     /** 所属DTO */
     private dto: MDDTO | null;
     /** 是否可空 */
     isNullable: boolean;
     /** 是否进行校验 */
     isValidate: boolean;
     /** 校验的正则表达式 */
     validateExpress: string;
     /** 是否是集合 */
     isCollection: boolean;
     /** 分组名称 */
     uiGroupName: string;

     public constructor(){
         super();
         this.dto = null;
         this.isNullable = true;
         this.isValidate = false;
         this.validateExpress = '';
         this.isCollection = false;
         this.uiGroupName='';
     }

     /**
      * 获取所属的DTO
      * @returns DTO
      */
     public GetDTO(){
         return this.dto;
     }

     /**
      * 设置所属的DTO
      * @param dto DTO
      */
     public SetDTO(dto: MDDTO | null){
         this.dto = dto;
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
      * @param isNullable 是否可空
      * @param isValidate 是否需要校验
      * @param validateExpress 校验的正则表达式，当isValidate为true时有效
      * @param isCollection 是否是集合
      * @param uiGroupName 分组名称
      * @param refNamespace 引用实体名空间
      * @param refEntityName 引用实体名称
      * @param referenceType 参照类型
      * @param multiplictity 多样性
      * @returns 
      */
     static Create(name: string, fullName: string, displayName: string, description: string, attributeType: EnumAttributeType,
         dataType: string, defaultValue: string, isNullable: boolean, isValidate: boolean, 
         validateExpress: string, isCollection: boolean, uiGroupName: string,
         refNamespace: string, refEntityName: string,referenceType: EnumReferenceType, multiplictity: EnumMultiplicity,
         dateFormat: EnumDateFormat): MDDTOAttribute{
         const attribute: MDDTOAttribute = new MDDTOAttribute();
         attribute.SetAttributeValue(name, fullName, displayName, description, attributeType, dataType, defaultValue,
            refNamespace, refEntityName, referenceType, multiplictity, dateFormat);
         attribute.name = name;
         attribute.fullName = fullName;
         attribute.displayName = displayName;
         attribute.description = description;
         attribute.dataType = dataType;
         attribute.defaultValue = defaultValue;
         attribute.isNullable = isNullable;
         attribute.isValidate = isValidate;
         attribute.validateExpress = validateExpress;
         attribute.isCollection = isCollection;
         attribute.uiGroupName = uiGroupName;
         return attribute;
     }
 }
    