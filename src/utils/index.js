
export const noop = () => {
};

export const reverse = (array) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result[i] = array[array.length - i - 1];
    }
    return result;
};

export const register = (SC, name, Component) => {
    SC.prototype[name] = function (setting) {
        return new Component(this, setting);
    }
};
