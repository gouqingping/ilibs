import { isString, REG_EXP_HEX, REG_EXP_RGB, REG_EXP_RGBA } from "../libs";

/**
 * @description: 将hex表示方式转换为rgb表示方式
 * @param {string} color hex 色值
 * @param {string} a 转换结束的透明度，默认1
 * @return {string}
 * @Date: 2021-02-01 11:25:00
 * @author: Pat
 */
export function hexToRgb(color: string, a: string | number = 1): string {
    if (!isString(color)) return color;
    let colorChange: (number | string)[] = [];
    color = color.toLowerCase();
    if (isHex(color)) {
        if (color.length === 4) {
            color = "#";
            for (let i = 1; i < 4; i += 1) color += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        for (let i = 1; i < 7; i += 2) colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    } else {
        if (!isRgb(color)) return color;
        const regExpMatchColor: RegExpMatchArray | [] = color.match(/\((.+)\)/g) || [];
        const matcgColor: string = regExpMatchColor?.length < 0 ? "(0,0,0)" : regExpMatchColor?.[0] || '';
        colorChange = matcgColor.replace(/\(|\)/g, '').split(',');
    }
    const [r, g, b] = colorChange, rgb = a ? `rgba(${r}, ${g}, ${b},${a})` : `rgb(${r}, ${g}, ${b})`;
    return rgb.replace(/\s+/g, "");
};
/**
 * @description: 将rgb表示方式转换为hex表示方式
 * @param {string} rgb rgb 色值
 * @return {string}
 * @Date: 2021-02-01 11:27:39
 * @author: Pat
 */
export function rgbToHex(rgb: string): string {
    if (!isString(rgb) || !isRgb(rgb)) return rgb;
    const rgbArr = rgb.split(",");
    if (rgbArr.length < 3) return rgb;
    let strHex = "#";
    for (let i = 0, color: any; color = rgbArr[i++];) {
        if (i < 4) {
            color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
            strHex += (color.length == 1 ? "0" + color : color);
        } else {
            color = color.replace(')', '');
            strHex += parseInt(`${color * 255}`).toString(16);
        }
    }
    return strHex.toUpperCase();
}

/**
 * @description: 验证是否为hex颜色有效值
 * @param {string} color
 * @Date: 2021-07-29 15:30:48
 * @author: Pat
 */
export function isHex(color: string): boolean {
    return REG_EXP_HEX.test(color)
}

/**
 * @description: 验证是否为rgb颜色有效值
 * @param {string} color
 * @Date: 2021-07-29 15:30:48
 * @author: Pat
 */
export function isRgb(color: string): boolean {
    return REG_EXP_RGB.test(color) || REG_EXP_RGBA.test(color);
}
/**
 * @description: 验证是否为颜色有效值
 * @param {string} color
 * @Date: 2021-07-29 15:30:48
 * @author: Pat
 */
export function isColor(color: string): boolean {
    return isHex(color) || isRgb(color)
}

/**
 * @description: 生成随机颜色
 * @return {string}
 * @Date: 2022-10-08 10:53:46
 * @author: GGos
 */
export const generateRandomHexColor = (): string => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;