var nextUid = 0;

/**
 * Gets the next unique identifier
 * @function uid
 * @returns {number} The next unique identifier to use.
 */
export function uid() {
    return ++nextUid;
}

/**
 * Checks if a number is a power of two.
 * @function isPow2
 * @param {number} v - input value
 * @returns {boolean} `true` if value is power of two
 */
export function isPow2(v) {
    return !(v & (v - 1)) && !!v;
}

export function ceilPow2(value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}

export function floorPow2(value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}

export function nextPow2(v) {
    v += v === 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;
    return v + 1;
}

export function arrayMax(array) {
    if (array.length === 0) return -Infinity;

    let max = array[0];

    for (let i = 1, l = array.length; i < l; ++i) {
        if (array[i] > max) max = array[i];
    }

    return max;
}

export function getValue(options, name, defaultValue) {
    if (options && options[name] !== undefined) return options[name];

    return defaultValue;
}
