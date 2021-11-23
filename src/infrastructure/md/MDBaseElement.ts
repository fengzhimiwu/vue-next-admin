
/**
 * 元数据基类 实体类
 * 所有元数据的基类
 */  
export abstract class MDBaseElement {
    /** 名称: 元数据名称 */
    name: string;
    /** 全名 ：元数据的全名称 */
    fullName: string;
    /** 显示名称: 元数据的显示名称 */
    displayName: string;
    /** 描述: 元数据的描述 */
    description: string;
    
    protected constructor() {
      this.name = '';
      this.fullName = '';
      this.displayName = '';
      this.description = '';
    }

    /**
     * 设置基类的值
     * @param name 名称
     * @param fullname 全名
     * @param displayName 显示名称
     * @param description 描述
     */
    protected SetValue(name: string, fullname: string, displayName: string, description: string){
        this.name = name;
        this.fullName = fullname;
        this.displayName = displayName;
        this.description = description;
    }

}