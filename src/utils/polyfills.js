if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

if (typeof Float32Array == 'undefined') {
    window.Float32Array = Array;
    window.Uint16Array = Array;
}

if (Object.assign === undefined) {
    Object.assign = function (target) {
        'use strict';

        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];

            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }

        return output;
    };
}
