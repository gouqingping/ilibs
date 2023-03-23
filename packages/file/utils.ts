/**
 * @description: 根据文件路径获取文件名称
 * @param {string} src
 * @return {string}
 * @author: GGos
 */
export const getFileSuffix = (src: string): string => src?.replace(/[^\\/]*[\\/./]+/g, '') || src;
/**
 * @description: 根据文件路径获取文件名称
 * @param {string} src
 * @return {string}
 * @author: GGos
 */
export const getFileName = (src: string): string => {
    if (!src) return src;
    const reg = getFileSuffix(src);
    return src.replace(/[^\\/]*[\\/]+/g, '')
};