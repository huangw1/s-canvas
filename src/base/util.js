export const noop = () => {
};

export const clone = (source) => {
    const target = {};
    for(let key in source) {
        target[key] = source;
    }
    return target;
};

export const isUndefined = (o) => {
    return o === undefined || o === null;
}
