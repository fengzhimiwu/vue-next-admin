//#region 布尔类型扩展
interface Boolean {
    /**
     *转换boolean值 为(1:是,0:否)
     *
     * @memberof Boolean
     */
    toBooleanString: () => string;
}
Boolean.prototype.toBooleanString = function (): string {
    return this.valueOf() ? "是" : "否";
}
//#endregion

//#region 日期类型扩展
interface Date {
    /**
     *日期拷贝
     *
     * @memberof Date
     */
    copy: () => Date;
    /**
     *时间拷贝
     *
     * @memberof Date
     */
    clone: () => Date;
    /**
     *
     *
     * @memberof Date
     */
    compare: (date: Date) => number;
    toLocalString: (format: string) => string;
    customerString: (format: string) => string;
    addDays: (day: number) => void;
    addWeeks: (week: number) => void;
    addMonths: (month: number) => void;
    addYears: (year: number) => void;
    startTimeOfDate: () => Date;
    endTimeOfDate: () => Date;
    getDaysOfMonth: (year: number, month: number) => number;
}

/// <summary>
/// 日期拷贝
/// </summary>
/// <return>日期对象</return>
//本日开始时间
Date.prototype.startTimeOfDate = function (): Date {
    return new Date(new Date().setHours(0, 0, 0, 0));
}
//本日结束时间
Date.prototype.endTimeOfDate = function (): Date {
    return new Date(new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 24 * 60 * 60 * 1000 - 1)
}
//某月天数
Date.prototype.getDaysOfMonth = function (year, month): number {
    const d = new Date(year, month, 0);
    return d.getDate();
}
Date.prototype.copy = function (): Date {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
}
Date.prototype.clone = function (): Date {
    const d = new Date(this.getTime());
    return d;
}
/*
 * 日期比较
 */
Date.prototype.compare = function (date): number {
    return this.getTime() - date.getTime();
}
/**本地话时间 默认 yyyy-MM-dd HH:mm:ss */
Date.prototype.toLocalString = function (format = "yyyy-MM-dd HH:mm:ss"): string {
    if (this.compare(Date.minValue()) === 0) return '';
    format = format.replace(/yyyy/, this.getFullYear() + '')
        .replace(/yy/, this.getFullYear().toString().substring(2))
        .replace(/y/, this.getFullYear().toString().substring(2).trimLeft_("0"))
        .replace(/MM/, (this.getMonth() + 1).toString().padLeft('0', 2) + '')
        .replace(/dd/, this.getDate().toString().padLeft('0', 2) + '')
        .replace(/M/, this.getMonth() + 1 + '')
        .replace(/d/, this.getDate().toString())
        .replace(/HH/, this.getHours().toString().padLeft('0', 2) + '')
        .replace(/hh/, (this.getHours() > 12 ? (this.getHours() - 12) + '' : this.getHours()).toString().padLeft('0', 2) + '')
        .replace(/mm/, this.getMinutes().toString().padLeft('0', 2) + '')
        .replace(/ss/, this.getSeconds().toString().padLeft('0', 2) + '')
        .replace(/H/, this.getHours() + '')
        .replace(/h/, (this.getHours() > 12 ? (this.getHours() - 12) : this.getHours()) + '')
        .replace(/m/, this.getMinutes() + '')
        .replace(/s/, this.getSeconds() + '');
    return format;
}
Date.prototype.addDays = function (d: number) {
    this.setDate(this.getDate() + d);
};
Date.prototype.addMonths = function (m) {
    const d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
};
Date.prototype.addYears = function (y) {
    const m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);
    if (m < this.getMonth()) {
        this.setDate(0);
    }
}
//#endregion
//日期方法扩展
interface DateConstructor {
    minValue: () => Date;
}

Date.minValue = function (): Date {
    return new Date('0001/01/01 00:00:00');
}

//#region 字符串扩展
interface String {
    /**
     *转换字符串 ->时间
     *
     * @param {string} format
     * @return {*}  {Date}
     * @memberof String
     */
    toDate(format: string): Date;
    /**
     *从左边 移除 某个字符串
     *
     * @param {string} ch
     * @return {*}  {string}
     * @memberof String
     */
    trimLeft_(ch: string): string;
    /**
     *从右边 移除 某个字符串
     *
     * @param {string} ch
     * @return {*}  {string}
     * @memberof String
     */
    trimRight_(ch: string): string;
    /**
     *左0 补位
     *
     * @param {string} ch
     * @param {number} len
     * @return {*}  {string}
     * @memberof String
     */
    padLeft(ch: string, len: number): string;
    /**
     *右0 补位
     *
     * @param {string} ch
     * @param {number} len
     * @return {*}  {string}
     * @memberof String
     */
    padRight(ch: string, len: number): string;
    /**
     *转换字符串为 数字类型(错误类型返回为0)
     *
     * @return {*}  {number}
     * @memberof String
     */
    parseNumber(): number;
}
/// <summary>
/// 移除字符空白字符
/// </summary>
String.prototype.trim = function () {
    if (this == "") return '';
    return this.replace(/(^\s*)|(\s*$)/g, '');
}
/// <summary>
/// 移除左侧字符
/// </summary>
/// <param name="str">字符串</param>
/// <param name="ch">移除字符</param>
/// <returns>移除后字符串</returns>
String.prototype.trimLeft_ = function (ch: string) {
    if (this == "") return '';
    return this.replace(new RegExp('^' + ch + '*', 'g'), '');
}
/// <summary>
/// 移除右侧侧字符
/// </summary>
/// <param name="str">字符串</param>
/// <param name="char">移除字符</param>
/// <returns>移除后字符串</returns>
String.prototype.trimRight_ = function (ch: string) {
    if (this == "") return '';
    return this.replace(new RegExp(ch + '*$', 'g'), '');
}
/// <summary>
/// 左侧字符填充
/// </summary>
/// <param name="ch">填充字符</param>
/// <param name="length">填充后字符串长度</param>
/// <returns>填充后字符串</returns>
String.prototype.padLeft = function (ch: string, length: number) {
    let str = '';
    for (let i = 0; i < length - this.length; i++)
        str = ch + str;
    return str + this;
}
/// <summary>
/// 右侧字符填充
/// </summary>
/// <param name="ch">填充字符</param>
/// <param name="length">填充后字符串长度</param>
/// <returns>填充后字符串</returns>
String.prototype.padRight = function (ch: string, length: number) {
    let str = '';
    for (let i = 0; i < length - str.length; i++)
        str = str + ch;
    return this + str;
}
/// <summary>
/// 字符串转换数字(错误格式返回 0 )
/// </summary>
/// <param name="input">转换字符</param>
/// <returns>转换后的数字(错误格式返回 0 )</returns>
String.prototype.parseNumber = function (): number {
    const res = Number(this);
    if (isNaN(res)) return 0;
    return res;
}
//#endregion