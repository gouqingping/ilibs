import { isString, REG_EXP_HEX, REG_EXP_RGB, REG_EXP_RGBA } from "../libs";
export function hexToRgb(color, a = 1) {
    if (!isString(color))
        return color;
    let colorChange = [];
    color = color.toLowerCase();
    if (isHex(color)) {
        if (color.length === 4) {
            color = "#";
            for (let i = 1; i < 4; i += 1)
                color += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        for (let i = 1; i < 7; i += 2)
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    else {
        if (!isRgb(color))
            return color;
        const regExpMatchColor = color.match(/\((.+)\)/g) || [];
        const matcgColor = regExpMatchColor?.length < 0 ? "(0,0,0)" : regExpMatchColor?.[0] || '';
        colorChange = matcgColor.replace(/\(|\)/g, '').split(',');
    }
    const [r, g, b] = colorChange, rgb = a ? `rgba(${r}, ${g}, ${b},${a})` : `rgb(${r}, ${g}, ${b})`;
    return rgb.replace(/\s+/g, "");
}
;
export function rgbToHex(rgb) {
    if (!isString(rgb) || !isRgb(rgb))
        return rgb;
    const rgbArr = rgb.split(",");
    if (rgbArr.length < 3)
        return rgb;
    let strHex = "#";
    for (let i = 0, color; color = rgbArr[i++];) {
        if (i < 4) {
            color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
            strHex += (color.length == 1 ? "0" + color : color);
        }
        else {
            color = color.replace(')', '');
            strHex += parseInt(`${color * 255}`).toString(16);
        }
    }
    return strHex.toUpperCase();
}
export function isHex(color) {
    return REG_EXP_HEX.test(color);
}
export function isRgb(color) {
    return REG_EXP_RGB.test(color) || REG_EXP_RGBA.test(color);
}
export function isColor(color) {
    return isHex(color) || isRgb(color);
}
export const generateRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
