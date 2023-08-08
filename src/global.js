window.Tiny = {};

Tiny.VERSION = '2.2.2';

Tiny.Primitives = {
    POLY: 0,
    RECT: 1,
    CIRC: 2,
    ELIP: 3,
    RREC: 4
};

Tiny.rnd = function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

Tiny.style2hex = function (color) {
    return +color.replace('#', '0x');
};

Tiny.hex2style = function (hex) {
    return '#' + ('00000' + (hex | 0).toString(16)).substr(-6);
};

Tiny.hex2rgb = function (hex) {
    return [((hex >> 16) & 0xff) / 255, ((hex >> 8) & 0xff) / 255, (hex & 0xff) / 255];
};

Tiny.rgb2hex = function (rgb) {
    return ((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + rgb[2] * 255;
};
