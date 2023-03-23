export const getFileSuffix = (src) => src?.replace(/[^\\/]*[\\/./]+/g, '') || src;
export const getFileName = (src) => {
    if (!src)
        return src;
    const reg = getFileSuffix(src);
    return src.replace(/[^\\/]*[\\/]+/g, '');
};
