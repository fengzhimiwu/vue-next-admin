/**
 *分页实体
 *
 * @export
 * @class Pagenation
 */
export class Pagenation {
    constructor() {
        this.pn = 1;
        this.ps = 10;
        this.isDoCount = false;
        this.tp = 0;
    }
    /**
     *分页页数 默认1
     *
     * @type {number}
     * @memberof Pagenation
     */
    pn: number;
    /**
     *分页页面数据条数 默认10
     *
     * @type {number}
     * @memberof Pagenation
     */
    ps: number;
    /**
     *暂未使用
     *
     * @type {number}
     * @memberof Pagenation
     */
    tp: number;
    /**
     *是否获取总记录数，缺省为true
     *
     * @type {boolean}
     * @memberof Pagenation
     */
    isDoCount: boolean;
}