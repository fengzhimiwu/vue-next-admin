
/**
 * 属性类型
 */
 export enum EnumAttributeType
 {
   /**
    * 简单类型
    */
   Primitive=1,
   /**
    * 枚举
    */
   Enum=2,
   /**
    * 实体引用类型
    */
   EntityRef=4,
   /**
    * DTO引用类型
    */
   DTORef=8,
   /** 
    * ID属性 
   */
   ID = 16
 }