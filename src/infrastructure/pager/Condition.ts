import { OrderItem } from './OrderItem';
import { ConditionItem } from './ConditionItem';
import { SubCondition } from './SubCondition';
import { Dictionary } from '../util/Dictionary';
/**
 *查询条件实体 (for back)
 *
 * @export
 * @class Condition
 */
export class Condition {
  /**
   * 查询条件实体
   * @param {Dictionary<string, string>} 自定义参数
   * @param {string} 自定义oql
   * @param {Array<ConditionItem>} 查询项
   * @param {Array<SubCondition>} 子查询项
   * @param {Array<OrderItem>} 排序项
   * @param {Array<string>} 查询的列
   * @memberof Condition
   */
  constructor() {
    this.params = new Dictionary<string, string>();
    this.oql = '';
    this.cond = new Array<ConditionItem>();
    this.subCond = new Array<SubCondition>();
    this.orderBy = new Array<OrderItem>();
    this.snapCols = new Array<string>();
  }
  /**
   *  自定义参数
   *
   * @type {Dictionary<string, string>}
   * @memberof Condition
   */
  params: Dictionary<string, string>;
  /**
   *
   *一句OQL表达式
   * @type {string}
   * @memberof Condition
   */
  oql: string;
  /**
   *条件项集合
   *
   * @type {Array<ConditionItem>}
   * @memberof Condition
   */
  cond: Array<ConditionItem>;
  /**
   *子条件集合
   *
   * @type {Array<SubCondition>}
   * @memberof Condition
   */
  subCond: Array<SubCondition>;
  /**
   *排序集合
   *
   * @type {Array<OrderItem>}
   * @memberof Condition
   */
  orderBy: Array<OrderItem>;
  /**
   *要获取的列
   *
   * @type {Array<string>}
   * @memberof Condition
   */
  snapCols: Array<string>;
}
