Tiny.PI_2 = Math.PI * 2
Tiny._UID = 0
Tiny.RETINA_PREFIX = 'none'

Tiny.Primitives = {
    POLY: 0,
    RECT: 1, 
    CIRC: 2,
    ELIP: 3,
    RREC: 4
}

Tiny.blendModes = {
    NORMAL: 0
}

Tiny.scaleModes = {
	DEFAULT: 0
}

Tiny.hex2rgb = function(hex) {
    return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
};

Tiny.rgb2hex = function(rgb) {
    return ((rgb[0]*255 << 16) + (rgb[1]*255 << 8) + rgb[2]*255);
};

Tiny.CIRCLE = Tiny.Primitives.CIRC
Tiny.POLYGON = Tiny.Primitives.POLY