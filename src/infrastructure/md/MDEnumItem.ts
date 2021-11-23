
import { EnumAttributeType } from "./EnumAttributeType";
import { EnumDateFormat } from "./EnumDateFormat";
import { EnumMultiplicity } from "./EnumMultiplicity";
import { EnumReferenceType } from "./EnumReferenceType";
import { MDAttributeBase } from "./MDAttributeBase";
import { MDEnum } from "./MDEnum";

/**
 * 实体属性类
 */  
 export class MDEnumItem extends MDAttributeBase {
     /** 所属枚举类型 */
     private enumType: MDEnum | null;

     public constructor(){
         super();
         this.enumType = null;
     }

     /**
      * 获取所属的枚举
      * @returns 枚举
      */
     public GetEnum(){
         return this.enumType;
     }

     /**
      * 设置所属的枚举类型
      * @param enumType 枚举类型
      */
     public SetEnum(enumType: MDEnum | null){
         this.enumType = enumType;
     }

     /**
      * 创建枚举项
      * @param name 名称
      * @param fullName 全名
      * @param displayName 显示名称
      * @param description 描述
      * @param defaultValue 枚举值
      * @returns 
      */
     static Create(name: string, fullName: string, displayName: string, description: string,
         defaultValue: string): MDEnumItem{
         const enumItem: MDEnumItem = new MDEnumItem();
         enumItem.SetAttributeValue(name, fullName, displayName, description, EnumAttributeType.Enum, 'number', defaultValue, '', '', EnumReferenceType.DropDownList, EnumMultiplicity.None, EnumDateFormat.DateTime);
         return enumItem;
     }
 }
    