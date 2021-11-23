import { MDAttribute } from "../md/MDAttribute";

/* 定义字符串格式化 */
export class Validate {
    /**
     * 获取基于Element-UI的校验规则
     * 使用属性元数据生成对应的规则
     * 校验规则：
     * 1、非空必须校验
     * 2、如果需要校验
     *    2.1 如果正则表达式不为''，则校验正则表达式
     * @param attribute 属性元数据
     * @param trigger 校验的触发方式，取值：blur，change
     * @returns 校验规则对象，可用于基于Element-UI的校验 
     */
    static getRules(attribute: MDAttribute, trigger: string): Array<object> {
        const rules = new Array<object>();

        if (!attribute.isNullable) {
            rules.push(Validate.validRequire(attribute, trigger));
        }

        if (attribute.isValidate) {
            if (attribute.validateExpress !== '') {
                rules.push(Validate.validExpress(attribute, trigger));
            }
        }
        return rules;
    }

    /** 是否非空 */
    static validRequire(attribute: MDAttribute, trigger: string): object {
        return { required: true, message: '请输入' + attribute.displayName, trigger: trigger };
    }

    /** 正则表达式校验 */
    static validExpress(attribute: MDAttribute, trigger: string): object {
        return {
            validator: (rule: any, value: any, cb: any) => {
                const reg = new RegExp("^" + attribute.validateExpress + "$")
                if (value=="" || reg.test(value)) {
                    return cb();
                }
                if (attribute.vaildMessage == '') {
                    cb(new Error(attribute.displayName + " 输入不合法"));
                } else {
                    cb(new Error(attribute.vaildMessage));
                }
            }, trigger: trigger
        };
    }
}