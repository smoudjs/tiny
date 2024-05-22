import { nextPow2, isPow2 } from '../utils/index.js';

var DEG2RAD = Math.PI / 180;
var RAD2DEG = 180 / Math.PI;

var _Math = {
    distance: function (x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    },

    clamp: function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    degToRad: function (degrees) {
        return degrees * DEG2RAD;
    },

    radToDeg: function (radians) {
        return radians * RAD2DEG;
    },

    log2: function (v) {
        var r, shift;
        r = (v > 0xffff) << 4;
        v >>>= r;
        shift = (v > 0xff) << 3;
        v >>>= shift;
        r |= shift;
        shift = (v > 0xf) << 2;
        v >>>= shift;
        r |= shift;
        shift = (v > 0x3) << 1;
        v >>>= shift;
        r |= shift;
        return r | (v >> 1);
    },

    isPow2: isPow2,

    nextPow2: nextPow2
};

export { _Math };
