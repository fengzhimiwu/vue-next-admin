/**
 *分页返回实体
 *
 * @export
 * @class Pagenation
 */
export class PageResult<T>{

    constructor (){
        this.total = 0;
        this.models = new Array<T>();
    }
    /**
     *分页数据总数
     *
     * @type {number}
     * @memberof PageResult
     */
    total: number;
    /**
     *分页数据实体集合
     *
     * @type {Array<T>}
     * @memberof PageResult
     */
    models: Array<T>;
}