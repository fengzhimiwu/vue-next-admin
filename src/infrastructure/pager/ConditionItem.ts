export class ConditionItem {
  /**
   * 查询项实体
   * @param {string} 列名
   * @param {string} 查询符号 > < = <= >= in is isnot like ...
   * @param {string} 查询数值
   * @memberof ConditionItem
   */
  constructor() {
    this.field = '';
    this.operator = '';
    this.value = '';
    this.alias = '';
  }
  /**
   *查询条件的列
   *
   * @type {string}
   * @memberof ConditionItem
   */
  field: string;
  /**
   *查询的值
   *
   * @type {string}
   * @memberof ConditionItem
   */
  value: string;
  /**
   *查询操作符 = > < >= <= like is (is not) 
   *
   * @type {string}
   * @memberof ConditionItem
   */
  operator: string;
  /**
   *查询条件的表别名
   *
   * @type {string}
   * @memberof ConditionItem
   */
  alias: string;

  /**
   * 创建查询条件
   * @param field 属性名称(实体属性名称 需要和模型字段一样 且符合C#属性命名规则)
   * @param operator 操作符 > < = <= >= in is isnot like ...
   * @param value 属性的值
   * @param alias 属性的简称，不需要可不传
   * @returns 查询条件
   */
  static Create(field: string, operator: string, value: string, alias = ''): ConditionItem{
    const conditionItem = new ConditionItem();
    conditionItem.field = field;
    conditionItem.operator = operator;
    conditionItem.value = value;
    conditionItem.alias = alias;

    return conditionItem;
  }
}
