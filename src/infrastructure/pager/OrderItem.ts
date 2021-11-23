/**
 *排序项
 *
 * @export
 * @class OrderItem
 */
export class OrderItem {
  /**
   *排序项
   * @param {string} 列名
   * @param {string} 排序类型 asc desc
   * @memberof OrderItem
   */
  constructor() {
    this.field = '';
    this.type = 'asc';
  }
  /**
   *排序列
   *
   * @type {string}
   * @memberof OrderItem
   */
  field: string;
  /**
   *排序方式，取值：asc, desc
   *
   * @type {string}
   * @memberof OrderItem
   */
  type: string;

  /**
   * 创建一个排序
   * @param field 排序属性
   * @param isAsc 是否升序排列
   * @returns 排序
   */
  static Create(field: string, isAsc: boolean): OrderItem {
    const orderItem = new OrderItem();
    orderItem.field = field;
    orderItem.type = isAsc ? 'asc' : 'desc';

    return orderItem;
  }
}
