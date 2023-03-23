import { isType } from "../libs";
export function dateFmt(date = new Date(), fmt = "YYYY/mm/dd HH:MM:SS") {
    if (!date)
        return date;
    let ret;
    if (isType(date, ["string", "number"])) {
        date = new Date(date);
    }
    ;
    const opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString(),
        "W+": date.getDay().toString(),
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret)
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
    }
    ;
    return fmt;
}
