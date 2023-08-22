// import { MathFunc } from './MathFunc.js';

function Color(r, g, b) {
	this.r = 1;
	this.g = 1;
	this.b = 1;
	this.a = 1;
	this.int = 0xffffff;

	if (g === undefined && b === undefined) {
		// r is THREE.Color, hex or string
		return this.set(r);
	}

	return this.setRGB(r, g, b);
}

// function hue2rgb(p, q, t) {
// 	if (t < 0) t += 1;
// 	if (t > 1) t -= 1;
// 	if (t < 1 / 6) return p + (q - p) * 6 * t;
// 	if (t < 1 / 2) return q;
// 	if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
// 	return p;
// }

// function SRGBToLinear(c) {
// 	return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
// }

// function LinearToSRGB(c) {
// 	return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
// }

Object.assign(Color.prototype, {
	set: function (value) {
		if (value && typeof value.int == 'number') {
			this.copy(value);
		} else if (typeof value == 'number') {
			this.setHex(value);
		} else if (typeof value == 'string') {
			this.setStyle(value);
		}

		return this;
	},

	refresh: function () {
		this.int = ((this.r * 255) << 16) + ((this.g * 255) << 8) + ((this.b * 255) | 0);
		return this;
	},

	setHex: function (hex) {
		hex = hex | 0;
		this.int = hex;

		this.r = ((hex >> 16) & 255) / 255;
		this.g = ((hex >> 8) & 255) / 255;
		this.b = (hex & 255) / 255;

		return this;
	},

	setRGB: function (r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;

		return this.refresh();
	},

	// setHSL: function (h, s, l) {
	// 	// h,s,l ranges are in 0.0 - 1.0
	// 	h = MathFunc.euclideanModulo(h, 1);
	// 	s = MathFunc.clamp(s, 0, 1);
	// 	l = MathFunc.clamp(l, 0, 1);

	// 	if (s === 0) {
	// 		this.r = this.g = this.b = l;
	// 	} else {
	// 		var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
	// 		var q = 2 * l - p;

	// 		this.r = hue2rgb(q, p, h + 1 / 3);
	// 		this.g = hue2rgb(q, p, h);
	// 		this.b = hue2rgb(q, p, h - 1 / 3);
	// 	}

	// 	return this;
	// },

	setStyle: function (style) {
		var size = style.length;

		if (size === 4) {
			// #ff0
			var cr = style.charAt(1);
			var cg = style.charAt(2);
			var cb = style.charAt(3);

			return this.setHex(+('0x' + cr + cr + cg + cg + cb + cb));

			// this.r = +('0x' + cr + cr) / 255;
			// this.g = +('0x' + cg + cg) / 255;
			// this.b = +('0x' + cb + cb) / 255;

			// this.r = parseInt(style.charAt(1) + style.charAt(1), 16) / 255;
			// this.g = parseInt(style.charAt(2) + style.charAt(2), 16) / 255;
			// this.b = parseInt(style.charAt(3) + style.charAt(3), 16) / 255;

			// return this.refresh();
		} else if (size === 7) {
			// #ff0000
			return this.setHex(+style.replace('#', '0x'));
		}

		return this;

		// function handleAlpha(string) {
		// 	if (string === undefined) return;

		// 	if (parseFloat(string) < 1) {
		// 		console.warn('THREE.Color: Alpha component of ' + style + ' will be ignored.');
		// 	}
		// }

		// var m;

		// if ((m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style))) {
		// 	// rgb / hsl

		// 	var color;
		// 	var name = m[1];
		// 	var components = m[2];

		// 	switch (name) {
		// 		case 'rgb':
		// 		case 'rgba':
		// 			if (
		// 				(color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
		// 					components
		// 				))
		// 			) {
		// 				// rgb(255,0,0) rgba(255,0,0,0.5)
		// 				this.r = Math.min(255, parseInt(color[1], 10)) / 255;
		// 				this.g = Math.min(255, parseInt(color[2], 10)) / 255;
		// 				this.b = Math.min(255, parseInt(color[3], 10)) / 255;

		// 				handleAlpha(color[5]);

		// 				return this;
		// 			}

		// 			if (
		// 				(color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
		// 					components
		// 				))
		// 			) {
		// 				// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
		// 				this.r = Math.min(100, parseInt(color[1], 10)) / 100;
		// 				this.g = Math.min(100, parseInt(color[2], 10)) / 100;
		// 				this.b = Math.min(100, parseInt(color[3], 10)) / 100;

		// 				handleAlpha(color[5]);

		// 				return this;
		// 			}

		// 			break;

		// 		case 'hsl':
		// 		case 'hsla':
		// 			if (
		// 				(color =
		// 					/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
		// 						components
		// 					))
		// 			) {
		// 				// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
		// 				var h = parseFloat(color[1]) / 360;
		// 				var s = parseInt(color[2], 10) / 100;
		// 				var l = parseInt(color[3], 10) / 100;

		// 				handleAlpha(color[5]);

		// 				return this.setHSL(h, s, l);
		// 			}

		// 			break;
		// 	}
		// } else if ((m = /^\#([A-Fa-f0-9]+)$/.exec(style))) {
		// 	// hex color

		// 	var hex = m[1];
		// 	var size = hex.length;

		// 	if (size === 3) {
		// 		// #ff0
		// 		this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
		// 		this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
		// 		this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;

		// 		return this;
		// 	} else if (size === 6) {
		// 		// #ff0000
		// 		this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
		// 		this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
		// 		this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;

		// 		return this;
		// 	}
		// }

		// if (style && style.length > 0) {
		// 	return this.setColorName(style);
		// }

		// return this.refresh();
	},

	copy: function (color) {
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
		this.a = color.a;

		return this.refresh();
	},

	// copyGammaToLinear: function (color, gammaFactor) {
	// 	if (gammaFactor === undefined) gammaFactor = 2.0;

	// 	this.r = Math.pow(color.r, gammaFactor);
	// 	this.g = Math.pow(color.g, gammaFactor);
	// 	this.b = Math.pow(color.b, gammaFactor);

	// 	return this;
	// },

	// copyLinearToGamma: function (color, gammaFactor) {
	// 	if (gammaFactor === undefined) gammaFactor = 2.0;

	// 	var safeInverse = gammaFactor > 0 ? 1.0 / gammaFactor : 1.0;

	// 	this.r = Math.pow(color.r, safeInverse);
	// 	this.g = Math.pow(color.g, safeInverse);
	// 	this.b = Math.pow(color.b, safeInverse);

	// 	return this;
	// },

	// convertGammaToLinear: function (gammaFactor) {
	// 	this.copyGammaToLinear(this, gammaFactor);

	// 	return this;
	// },

	// convertLinearToGamma: function (gammaFactor) {
	// 	this.copyLinearToGamma(this, gammaFactor);

	// 	return this;
	// },

	// copySRGBToLinear: function (color) {
	// 	this.r = SRGBToLinear(color.r);
	// 	this.g = SRGBToLinear(color.g);
	// 	this.b = SRGBToLinear(color.b);

	// 	return this;
	// },

	// copyLinearToSRGB: function (color) {
	// 	this.r = LinearToSRGB(color.r);
	// 	this.g = LinearToSRGB(color.g);
	// 	this.b = LinearToSRGB(color.b);

	// 	return this;
	// },

	// convertSRGBToLinear: function () {
	// 	this.copySRGBToLinear(this);

	// 	return this;
	// },

	// convertLinearToSRGB: function () {
	// 	this.copyLinearToSRGB(this);

	// 	return this;
	// },

	// getHex: function () {
	// 	return ((this.r * 255) << 16) ^ ((this.g * 255) << 8) ^ ((this.b * 255) << 0);
	// },

	// getHexString: function () {
	// 	return ('000000' + this.getHex().toString(16)).slice(-6);
	// },

	// getHSL: function (target) {
	// 	// h,s,l ranges are in 0.0 - 1.0

	// 	if (target === undefined) {
	// 		console.warn('THREE.Color: .getHSL() target is now required');
	// 		target = { h: 0, s: 0, l: 0 };
	// 	}

	// 	var r = this.r,
	// 		g = this.g,
	// 		b = this.b;

	// 	var max = Math.max(r, g, b);
	// 	var min = Math.min(r, g, b);

	// 	var hue, saturation;
	// 	var lightness = (min + max) / 2.0;

	// 	if (min === max) {
	// 		hue = 0;
	// 		saturation = 0;
	// 	} else {
	// 		var delta = max - min;

	// 		saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

	// 		switch (max) {
	// 			case r:
	// 				hue = (g - b) / delta + (g < b ? 6 : 0);
	// 				break;
	// 			case g:
	// 				hue = (b - r) / delta + 2;
	// 				break;
	// 			case b:
	// 				hue = (r - g) / delta + 4;
	// 				break;
	// 		}

	// 		hue /= 6;
	// 	}

	// 	target.h = hue;
	// 	target.s = saturation;
	// 	target.l = lightness;

	// 	return target;
	// },

	/**
	 * Convert to a hexidecimal string.
	 * @example
	 * import { Color } from 'pixi.js';
	 * new Color('white').toHex(); // returns "#ffffff"
	 */
	toStyle() {
		return '#' + ('00000' + this.int.toString(16)).slice(-6);
	},

	/**
	 * Convert to a hexidecimal string with alpha.
	 * @example
	 * import { Color } from 'pixi.js';
	 * new Color('white').toHexa(); // returns "#ffffffff"
	 */
	// toStyleA() {
	// 	const alphaValue = Math.round(this.a * 255);

	// 	return this.toHex() + ('00000' + alphaValue.toString(16)).slice(-2);
	// },

	// getStyle: function () {
	// 	return 'rgb(' + ((this.r * 255) | 0) + ',' + ((this.g * 255) | 0) + ',' + ((this.b * 255) | 0) + ')';
	// },

	// offsetHSL: function (h, s, l) {
	// 	this.getHSL(_hslA);

	// 	_hslA.h += h;
	// 	_hslA.s += s;
	// 	_hslA.l += l;

	// 	this.setHSL(_hslA.h, _hslA.s, _hslA.l);

	// 	return this;
	// },

	// add: function (color) {
	// 	this.r += color.r;
	// 	this.g += color.g;
	// 	this.b += color.b;

	// 	return this;
	// },

	// addColors: function (color1, color2) {
	// 	this.r = color1.r + color2.r;
	// 	this.g = color1.g + color2.g;
	// 	this.b = color1.b + color2.b;

	// 	return this;
	// },

	// addScalar: function (s) {
	// 	this.r += s;
	// 	this.g += s;
	// 	this.b += s;

	// 	return this;
	// },

	// sub: function (color) {
	// 	this.r = Math.max(0, this.r - color.r);
	// 	this.g = Math.max(0, this.g - color.g);
	// 	this.b = Math.max(0, this.b - color.b);

	// 	return this;
	// },

	multiply: function (color) {
		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this.refresh();
	},

	// multiplyScalar: function (s) {
	// 	this.r *= s;
	// 	this.g *= s;
	// 	this.b *= s;

	// 	return this;
	// },

	// lerp: function (color, alpha) {
	// 	this.r += (color.r - this.r) * alpha;
	// 	this.g += (color.g - this.g) * alpha;
	// 	this.b += (color.b - this.b) * alpha;

	// 	return this;
	// },

	// lerpHSL: function (color, alpha) {
	// 	this.getHSL(_hslA);
	// 	color.getHSL(_hslB);

	// 	var h = MathFunc.lerp(_hslA.h, _hslB.h, alpha);
	// 	var s = MathFunc.lerp(_hslA.s, _hslB.s, alpha);
	// 	var l = MathFunc.lerp(_hslA.l, _hslB.l, alpha);

	// 	this.setHSL(h, s, l);

	// 	return this;
	// },

	// equals: function (c) {
	// 	return c.r === this.r && c.g === this.g && c.b === this.b;
	// },

	// fromArray: function (array, offset) {
	// 	if (offset === undefined) offset = 0;

	// 	this.r = array[offset];
	// 	this.g = array[offset + 1];
	// 	this.b = array[offset + 2];

	// 	return this;
	// },

	toArray: function (array, offset) {
		if (array === undefined) array = [];
		if (offset === undefined) offset = 0;

		array[offset] = this.r;
		array[offset + 1] = this.g;
		array[offset + 2] = this.b;

		return array;
	}
});

Color.WHITE = new Color();

export { Color };
