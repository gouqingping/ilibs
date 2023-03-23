import { isType } from "../libs";

export interface DATE_FMT {
    "Y+": String
    "m+": String
    "d+": String
    "H+": String
    "M+": String
    "S+": String
    "W+": String
}
/**
 * @description: 时间格式化
 * @param {any} date 时间
 * @param {string} fmt 格式
 * @return {string}
 * @Date: 2021-02-01 11:11:33
 * @author: Pat
 */
export function dateFmt(date: Date = new Date(), fmt: string = "YYYY/mm/dd HH:MM:SS"): string {
    if (!date) return date;
    let ret: any;
    if (isType(date, ["string", "number"])) { date = new Date(date) };
    const opt: DATE_FMT | any = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString(),          // 秒
        "W+": date.getDay().toString(),            // 周
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
    };
    return fmt;
}