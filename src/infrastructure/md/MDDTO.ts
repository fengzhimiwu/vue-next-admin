
import { MDDTOAttribute } from './MDDTOAttribute';
import { MDBaseElement } from './MDBaseElement';

/**
 * 实体类
 */  
 export class MDDTO extends MDBaseElement {
    private attributes: Array<MDDTOAttribute>;
    
    protected constructor() {
        super();
        this.attributes = new Array<MDDTOAttribute>();
    }

    /**
     * 获取DTO下的属性集合
     * @returns 属性集合
     */
    public GetAttributes(){
        return this.attributes;
    }

    /**
     * 根据名称查找属性
     * @param name 属性名称
     * @returns 属性，如果没找到则返回null
     */
    public GetAttribute(name: string): MDDTOAttribute | null{
        const attr = this.attributes.find(t => t.name == name);
        if(!attr){
            return null;
        }
        return attr;
    }

    /**
     * 在实体中添加属性
     * @param attribute 要添加的属性
     */
    PushAttribute(attribute: MDDTOAttribute){
        attribute.SetDTO(this);
        this.attributes.push(attribute);
    }

    /**
     * 创建实体的新实例
     * @param name 名称
     * @param fullName 全名称
     * @param displayName 显示名称
     * @param description 描述信息
     * @returns 实体的新实例
     */
    public static Create(name: string, fullName: string, displayName: string, description: string): MDDTO {
         const dto: MDDTO = new MDDTO();
         dto.SetValue(name, fullName, displayName, description);
         return dto;
    }
}