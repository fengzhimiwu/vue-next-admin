import { ConditionItem } from './ConditionItem';

export class SubCondition {
   /**
   * 查询子条件实体
   * @param {string} 链接符号 or/and
   * @param {Array<ConditionItem>} 查询项
   * @memberof Condition
   */
    constructor() {
      this.connector = '';
      this.cond = new Array<ConditionItem>();
    }
  /**
   *连接符 and or
   *
   * @type {string}
   * @memberof SubCondition
   */
  connector!: string | '';
  /**
   * 条件项
   *
   * @type {Array<ConditionItem>}
   * @memberof SubCondition
   */
  cond: Array<ConditionItem> = [];

  /**
   * 创建子查询条件
   * @param connector 链接符号 or/and
   * @param cond 条件
   * @returns 子查询条件
   */
   static Create(connector: string, cond: Array<ConditionItem>): SubCondition{
    const subCondition = new SubCondition();
    subCondition.connector = connector;
    subCondition.cond = cond;

    return subCondition;
  }
}
