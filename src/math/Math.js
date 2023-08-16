import { getNextPow2, isPow2 } from '../utils';

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

    isPow2: isPow2,

    getNextPow2: getNextPow2
};

export { _Math };
