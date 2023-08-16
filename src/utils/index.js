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

export function getNextPow2(number) {
    if (number > 0 && (number & (number - 1)) === 0)
        // see: http://goo.gl/D9kPj
        return number;
    else {
        var result = 1;
        while (result < number) result <<= 1;
        return result;
    }
}
