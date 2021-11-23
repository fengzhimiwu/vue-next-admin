
/**
 * 多样性枚举
 */
export enum EnumMultiplicity {
    /** 无效 */
    None = 0,
    /**
     * 一个
     */
    One = 1,
    /**
     * 一个或多个
     */
    OneMany = 2,
    /**
     * 实体引用类型
     */
    ZeroOne = 4,
    /**
     * 零个或多个
     */
    ZeroMany = 8,
}