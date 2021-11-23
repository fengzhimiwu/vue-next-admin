
import { MDBaseElement } from './MDBaseElement';
import { MDEnumItem } from './MDEnumItem';

/**
 * 枚举类元数据
 */  
 export class MDEnum extends MDBaseElement {
    private enumItems: Array<MDEnumItem>;
    
    public constructor() {
        super();
        this.enumItems = new Array<MDEnumItem>();
    }

    /**
     * 获取枚举下的枚举项集合
     * @returns 枚举项集合
     */
    public GetEnumItems(): Array<MDEnumItem>{
        return this.enumItems;
    }

    /**
     * 根据名称查找枚举项
     * @param name 枚举项名称
     * @returns 枚举项，如果没找到则返回null
     */
    public GetEnumItem(name: string): MDEnumItem | null{
        const enumItem = this.enumItems.find(t => t.name == name);
        if(!enumItem){
            return null;
        }
        return enumItem;
    }

    /**
     * 根据名称查找枚举项
     * @param name 枚举项名称
     * @returns 枚举项，如果没找到则返回null
     */
    public GetEnumItemByValue(value: string): MDEnumItem | null{
        const enumItem = this.enumItems.find(t => t.defaultValue == value);
        if(!enumItem){
            return null;
        }
        return enumItem;
    }

    /**
     * 在枚举中添加枚举项
     * @param enumItem 要添加的枚举项
     */
    public PushEnumItem(enumItem: MDEnumItem): void{
        enumItem.SetEnum(this);
        this.enumItems.push(enumItem);
    }

    /**
     * 创建枚举的新实例
     * @param name 名称
     * @param fullName 全名称
     * @param displayName 显示名称
     * @param description 描述信息
     * @returns 枚举的新实例
     */
    public static Create(name: string, fullName: string, displayName: string, description: string): MDEnum {
         const enumType: MDEnum = new MDEnum();
         enumType.SetValue(name, fullName, displayName, description);
         return enumType;
    }
}