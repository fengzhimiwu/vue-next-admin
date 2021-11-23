/* 定义字符串格式化 */
export class StringFormat {
  /**
   * 格式化日期时间：YYYY-MM-DD h:m:s
   * @param input 要格式化的日期
   * @returns 格式化后的字符串
   */
  static formatDateTime(input: Date): string {
    let month: string | number = input.getMonth() + 1;
    let strDate: string | number = input.getDate();

    if (month <= 9) {
      month = "0" + month;
    }

    if (strDate <= 9) {
      strDate = "0" + strDate;
    }

    return input.getFullYear() + "-" + month + "-" + strDate + " "
      + input.getHours() + ":" + input.getMinutes() + ":" + input.getSeconds();
  }
  
  /**
   * 格式化日期时间：YYYY-MM-DD
   * @param input 要格式化的日期
   * @returns 格式化后的字符串
   */
  static formatDate(input: Date): string {
    let month: string | number = input.getMonth() + 1;
    let strDate: string | number = input.getDate();

    if (month <= 9) {
      month = "0" + month;
    }

    if (strDate <= 9) {
      strDate = "0" + strDate;
    }

    return input.getFullYear() + "-" + month + "-" + strDate;
  }
}