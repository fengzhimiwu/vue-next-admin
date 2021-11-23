
import { MDAttribute } from './MDAttribute';
import { MDBaseElement } from './MDBaseElement';

/**
 * 实体类元数据
 */  
 export class MDEntity extends MDBaseElement {
    private attributes: Array<MDAttribute>;
    
    public constructor() {
        super();
        this.attributes = new Array<MDAttribute>();
    }

    /**
     * 获取实体下的属性集合
     * @returns 属性集合
     */
    public GetAttributes(): Array<MDAttribute>{
        return this.attributes;
    }

    /**
     * 根据名称查找属性
     * @param name 属性名称
     * @returns 属性，如果没找到则返回null
     */
    public GetAttribute(name: string): MDAttribute | null{
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
    public PushAttribute(attribute: MDAttribute): void{
        attribute.SetEntity(this);
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
    public static Create(name: string, fullName: string, displayName: string, description: string): MDEntity {
         const entity: MDEntity = new MDEntity();
         entity.SetValue(name, fullName, displayName, description);
         return entity;
    }
}