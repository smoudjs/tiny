/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 999:
/***/ (function() {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";

// EXTERNAL MODULE: ./src/utils/polyfills.js
var polyfills = __webpack_require__(999);
;// ./src/utils/CanvasBuffer.js
var CanvasBuffer = function CanvasBuffer(width, height, options) {
  this.width = width;
  this.height = height;
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d', options);
  this.canvas.width = width;
  this.canvas.height = height;
};
CanvasBuffer.prototype.constructor = CanvasBuffer;
CanvasBuffer.prototype.clear = function () {
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.width, this.height);
};
CanvasBuffer.prototype.resize = function (width, height) {
  this.width = this.canvas.width = width;
  this.height = this.canvas.height = height;
};

;// ./src/utils/EventTarget.js
function EventListeners() {
  this.a = [];
  this.n = 0;
}
var EventTarget = {
  call: function call(obj) {
    if (obj) {
      obj = obj.prototype || obj;
      EventTarget.mixin(obj);
    }
  },
  mixin: function mixin(obj) {
    obj = obj.prototype || obj;
    obj.on = function (event, fn, context, once) {
      var listeners_events = this._listeners = this._listeners || {};
      var listeners = listeners_events[event];
      if (!listeners) {
        listeners = listeners_events[event] = new EventListeners();
      }
      listeners.a.push(fn, context || null, once || false);
      listeners.n += 3;
    };
    obj.once = function (event, fn, context) {
      this.on(event, fn, context, true);
    };
    obj.hasEventListener = function (event, fn, context) {
      var listeners_events = this._listeners;
      if (!listeners_events) return false;
      var listeners = listeners_events[event];
      if (listeners) {
        var indexOf = listeners.a.indexOf(fn);
        return indexOf > -1 && listeners.a[indexOf + 1] === (context || null);
      }
      return false;
    };
    obj.clearEventListeners = function (event) {
      if (!this._listeners) return;
      if (event) {
        delete this._listeners[event];
      } else {
        delete this._listeners;
      }
    };
    obj.off = function (event, fn, context) {
      var listeners_events = this._listeners;
      if (!listeners_events) return;
      var listeners = listeners_events[event];
      if (!listeners) return;
      var fnArray = listeners_events[event].a;
      if (!fn) {
        fnArray.length = 0;
      } else if (!context) {
        for (var i = 0; i < fnArray.length; i += 3) {
          if (fnArray[i] == fn) {
            fnArray.splice(i, 3);
            i -= 3;
          }
        }
      } else {
        for (var i = 0; i < fnArray.length; i += 3) {
          if (fnArray[i] == fn && fnArray[i + 1] == context) {
            fnArray.splice(i, 3);
            i -= 3;
          }
        }
      }
      if (fnArray.length == 0) {
        delete listeners_events[event];
      }
    };
    obj.emit = function (event, a1, a2, a3) {
      var listeners_events = this._listeners;
      if (!listeners_events) return;
      var listeners = listeners_events[event];
      if (!listeners) return;
      var fnArray = listeners.a;
      listeners.n = 0;
      var len = arguments.length;
      var fn, ctx;
      for (var i = 0; i < fnArray.length - listeners.n; i += 3) {
        fn = fnArray[i];
        ctx = fnArray[i + 1];
        if (fnArray[i + 2]) {
          fnArray.splice(i, 3);
          i -= 3;
        }
        if (len <= 1) fn.call(ctx);else if (len == 2) fn.call(ctx, a1);else if (len == 3) fn.call(ctx, a1, a2);else fn.call(ctx, a1, a2, a3);

        // if (fnArray[i + 2])
        // {
        //     fnArray.splice(i, 3);
        //     i -= 3;
        // }
      }
      if (fnArray.length == 0) {
        delete listeners_events[event];
      }
    };
  }
};

;// ./src/utils/SystemTarget.js
/**
 * Mixins functionality to make an object have "systems".
 *
 * @example
 *      function MyObject() {}
 *
 *      SystemTarget.mixin(MyObject);
 *
 * @mixin
 * @memberof Tiny.utils
 */
var SystemTarget = {
  /**
   * Mixes in the properties of the SystemTarget into another object
   *
   * @param {object} obj - The obj to mix into
   */
  mixin: function mixin(obj) {
    obj._systems = {};

    /**
     * Adds a system to an object
     *
     * @param {Function} ctor - The constructor function for the system.
     */
    obj.registerSystem = function registerSystem(ctor) {
      if (!ctor.system) throw new Error('.system is not defined for ' + ctor.name);
      if (!ctor.system.name) throw new Error('.system.name is not defined for ' + ctor.name);
      obj._systems[ctor.system.name] = ctor;
    };

    /**
     * Instantiates all the systems of this object
     *
     */
    obj.prototype.initSystems = function initSystems() {
      this.systems = this.systems || {};
      for (var o in obj._systems) {
        var ctor = obj._systems[o];
        var system = this.systems[o] = new ctor(this);
        if (ctor.system.rooted) this[o] = system;
        if (ctor.system.states) {
          for (var i = 0; i < ctor.system.states.length; i++) {
            var state = ctor.systems.states[i];
            this[state].push(system);
          }
        }
      }
    };

    /**
     * Removes all the systems of this object
     *
     */
    obj.prototype.disposeSystems = function disposeSystems() {
      for (var o in this.systems) {
        this.systems[o].dispose();
        this.systems[o] = null;
      }
      this.systems = null;
    };
  }
};

;// ./src/utils/index.js
var nextUid = 0;

/**
 * Gets the next unique identifier
 * @function uid
 * @returns {number} The next unique identifier to use.
 */
function uid() {
  return ++nextUid;
}

/**
 * Checks if a number is a power of two.
 * @function isPow2
 * @param {number} v - input value
 * @returns {boolean} `true` if value is power of two
 */
function isPow2(v) {
  return !(v & v - 1) && !!v;
}
function ceilPow2(value) {
  return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}
function floorPow2(value) {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}
function nextPow2(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}
function arrayMax(array) {
  if (array.length === 0) return -Infinity;
  var max = array[0];
  for (var i = 1, l = array.length; i < l; ++i) {
    if (array[i] > max) max = array[i];
  }
  return max;
}
function getValue(options, name, defaultValue) {
  if (options && options[name] !== undefined) return options[name];
  return defaultValue;
}
;// ./src/math/Math.js

var DEG2RAD = Math.PI / 180;
var RAD2DEG = 180 / Math.PI;
var _Math = {
  DEG2RAD: DEG2RAD,
  RAD2DEG: RAD2DEG,
  distance: function distance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  },
  clamp: function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  },
  degToRad: function degToRad(degrees) {
    return degrees * DEG2RAD;
  },
  radToDeg: function radToDeg(radians) {
    return radians * RAD2DEG;
  },
  log2: function log2(v) {
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
    return r | v >> 1;
  },
  isPow2: isPow2,
  nextPow2: nextPow2
};

;// ./src/math/Color.js
// import { MathFunc } from './MathFunc.js';

function Color(r, g, b) {
  this.r = 1;
  this.g = 1;
  this.b = 1;
  this.a = 1;
  this["int"] = 0xffffff;
  this._bgr = 0xffffff;
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

function convert(value) {
  return (value >> 16) + (value & 0xff00) + ((value & 0xff) << 16);
}
Object.assign(Color.prototype, {
  isColor: true,
  set: function set(value) {
    if (value && typeof value["int"] == 'number') {
      this.copy(value);
    } else if (typeof value == 'number') {
      this.setHex(value);
    } else if (typeof value == 'string') {
      this.setStyle(value);
    }
    return this;
  },
  refresh: function refresh() {
    this["int"] = (this.r * 255 << 16) + (this.g * 255 << 8) + (this.b * 255 | 0);
    this._bgr = convert(this["int"]);
    return this;
  },
  setHex: function setHex(hex) {
    hex = hex | 0;
    this["int"] = hex;
    this._bgr = convert(hex);
    this.r = (hex >> 16 & 255) / 255;
    this.g = (hex >> 8 & 255) / 255;
    this.b = (hex & 255) / 255;
    return this;
  },
  setRGB: function setRGB(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this.refresh();
  },
  clone: function clone() {
    return new this.constructor(this.r, this.g, this.b);
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

  setStyle: function setStyle(style) {
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
  copy: function copy(color) {
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
  toStyle: function toStyle() {
    return '#' + ('00000' + this["int"].toString(16)).slice(-6);
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

  multiply: function multiply(color) {
    this.r *= color.r;
    this.g *= color.g;
    this.b *= color.b;
    return this.refresh();
  },
  mulScalar: function mulScalar(s) {
    this.r *= s;
    this.g *= s;
    this.b *= s;
    return this;
  },
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

  toArray: function toArray(array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this.r;
    array[offset + 1] = this.g;
    array[offset + 2] = this.b;
    return array;
  }
});
Color.WHITE = new Color();

;// ./src/math/MathFunc.js
// /**
//  * @author alteredq / http://alteredqualia.com/
//  * @author mrdoob / http://mrdoob.com/
//  */

// var _lut = [];

// for ( var i = 0; i < 256; i ++ ) {

// 	_lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

// }

// var MathFunc = {

// 	DEG2RAD: Math.PI / 180,
// 	RAD2DEG: 180 / Math.PI,

// 	generateUUID: function () {

// 		// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

// 		var d0 = Math.random() * 0xffffffff | 0;
// 		var d1 = Math.random() * 0xffffffff | 0;
// 		var d2 = Math.random() * 0xffffffff | 0;
// 		var d3 = Math.random() * 0xffffffff | 0;
// 		var uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
// 			_lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
// 			_lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
// 			_lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];

// 		// .toUpperCase() here flattens concatenated strings to save heap memory space.
// 		return uuid.toUpperCase();

// 	},

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// 	// compute euclidian modulo of m % n
// 	// https://en.wikipedia.org/wiki/Modulo_operation

// 	euclideanModulo: function ( n, m ) {

// 		return ( ( n % m ) + m ) % m;

// 	},

// 	// Linear mapping from range <a1, a2> to range <b1, b2>

// 	mapLinear: function ( x, a1, a2, b1, b2 ) {

// 		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

// 	},

// 	// https://en.wikipedia.org/wiki/Linear_interpolation

// 	lerp: function ( x, y, t ) {

// 		return ( 1 - t ) * x + t * y;

// 	},

// 	// http://en.wikipedia.org/wiki/Smoothstep

// 	smoothstep: function ( x, min, max ) {

// 		if ( x <= min ) return 0;
// 		if ( x >= max ) return 1;

// 		x = ( x - min ) / ( max - min );

// 		return x * x * ( 3 - 2 * x );

// 	},

// 	smootherstep: function ( x, min, max ) {

// 		if ( x <= min ) return 0;
// 		if ( x >= max ) return 1;

// 		x = ( x - min ) / ( max - min );

// 		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

// 	},

// 	// Random integer from <low, high> interval

// 	randInt: function ( low, high ) {

// 		return low + Math.floor( Math.random() * ( high - low + 1 ) );

// 	},

// 	// Random float from <low, high> interval

// 	randFloat: function ( low, high ) {

// 		return low + Math.random() * ( high - low );

// 	},

// 	// Random float from <-range/2, range/2> interval

// 	randFloatSpread: function ( range ) {

// 		return range * ( 0.5 - Math.random() );

// 	},

// 	degToRad: function ( degrees ) {

// 		return degrees * MathFunc.DEG2RAD;

// 	},

// 	radToDeg: function ( radians ) {

// 		return radians * MathFunc.RAD2DEG;

// 	},

// 	isPowerOfTwo: function ( value ) {

// 		return ( value & ( value - 1 ) ) === 0 && value !== 0;

// 	},

// 	ceilPowerOfTwo: function ( value ) {

// 		return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

// 	},

// 	floorPowerOfTwo: function ( value ) {

// 		return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

// 	}

// };

// export { MathFunc };

function denormalize(value, array) {
  switch (array.constructor) {
    case Float32Array:
      return value;
    case Uint32Array:
      return value / 4294967295.0;
    case Uint16Array:
      return value / 65535.0;
    case Uint8Array:
      return value / 255.0;
    case Int32Array:
      return Math.max(value / 2147483647.0, -1.0);
    case Int16Array:
      return Math.max(value / 32767.0, -1.0);
    case Int8Array:
      return Math.max(value / 127.0, -1.0);
    default:
      throw new Error('Invalid component type.');
  }
}
function normalize(value, array) {
  switch (array.constructor) {
    case Float32Array:
      return value;
    case Uint32Array:
      return Math.round(value * 4294967295.0);
    case Uint16Array:
      return Math.round(value * 65535.0);
    case Uint8Array:
      return Math.round(value * 255.0);
    case Int32Array:
      return Math.round(value * 2147483647.0);
    case Int16Array:
      return Math.round(value * 32767.0);
    case Int8Array:
      return Math.round(value * 127.0);
    default:
      throw new Error('Invalid component type.');
  }
}

;// ./src/math/Quat.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */


function Quat(x, y, z, w) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._w = w !== undefined ? w : 1;
}
Object.assign(Quat, {
  slerp: function slerp(qa, qb, qm, t) {
    return qm.copy(qa).slerp(qb, t);
  },
  slerpFlat: function slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
    // fuzz-free, array-based Quaternion SLERP operation

    var x0 = src0[srcOffset0 + 0],
      y0 = src0[srcOffset0 + 1],
      z0 = src0[srcOffset0 + 2],
      w0 = src0[srcOffset0 + 3],
      x1 = src1[srcOffset1 + 0],
      y1 = src1[srcOffset1 + 1],
      z1 = src1[srcOffset1 + 2],
      w1 = src1[srcOffset1 + 3];
    if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
      var s = 1 - t,
        cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
        dir = cos >= 0 ? 1 : -1,
        sqrSin = 1 - cos * cos;

      // Skip the Slerp for tiny steps to avoid numeric problems:
      if (sqrSin > Number.EPSILON) {
        var sin = Math.sqrt(sqrSin),
          len = Math.atan2(sin, cos * dir);
        s = Math.sin(s * len) / sin;
        t = Math.sin(t * len) / sin;
      }
      var tDir = t * dir;
      x0 = x0 * s + x1 * tDir;
      y0 = y0 * s + y1 * tDir;
      z0 = z0 * s + z1 * tDir;
      w0 = w0 * s + w1 * tDir;

      // Normalize in case we just did a lerp:
      if (s === 1 - t) {
        var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
        x0 *= f;
        y0 *= f;
        z0 *= f;
        w0 *= f;
      }
    }
    dst[dstOffset] = x0;
    dst[dstOffset + 1] = y0;
    dst[dstOffset + 2] = z0;
    dst[dstOffset + 3] = w0;
  }
});
Object.defineProperties(Quat.prototype, {
  x: {
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
      this._onChangeCallback();
    }
  },
  y: {
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
      this._onChangeCallback();
    }
  },
  z: {
    get: function get() {
      return this._z;
    },
    set: function set(value) {
      this._z = value;
      this._onChangeCallback();
    }
  },
  w: {
    get: function get() {
      return this._w;
    },
    set: function set(value) {
      this._w = value;
      this._onChangeCallback();
    }
  }
});
Object.assign(Quat.prototype, {
  isQuat: true,
  set: function set(x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this._onChangeCallback();
    return this;
  },
  clone: function clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  },
  copy: function copy(quaternion) {
    this._x = quaternion.x;
    this._y = quaternion.y;
    this._z = quaternion.z;
    this._w = quaternion.w;
    this._onChangeCallback();
    return this;
  },
  setFromEuler: function setFromEuler(euler, update) {
    if (!(euler && euler.isEuler)) {
      throw new Error('Tiny.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
    }
    var x = euler._x,
      y = euler._y,
      z = euler._z,
      order = euler.order;

    // http://www.mathworks.com/matlabcentral/fileexchange/
    // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
    //	content/SpinCalc.m

    var cos = Math.cos;
    var sin = Math.sin;
    var c1 = cos(x / 2);
    var c2 = cos(y / 2);
    var c3 = cos(z / 2);
    var s1 = sin(x / 2);
    var s2 = sin(y / 2);
    var s3 = sin(z / 2);
    if (order === 'XYZ') {
      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'YXZ') {
      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;
    } else if (order === 'ZXY') {
      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'ZYX') {
      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;
    } else if (order === 'YZX') {
      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'XZY') {
      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;
    }
    if (update !== false) this._onChangeCallback();
    return this;
  },
  setFromAxisAngle: function setFromAxisAngle(axis, angle) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

    // assumes axis is normalized

    var halfAngle = angle / 2,
      s = Math.sin(halfAngle);
    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(halfAngle);
    this._onChangeCallback();
    return this;
  },
  setFromRotationMatrix: function setFromRotationMatrix(m) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements,
      m11 = te[0],
      m12 = te[4],
      m13 = te[8],
      m21 = te[1],
      m22 = te[5],
      m23 = te[9],
      m31 = te[2],
      m32 = te[6],
      m33 = te[10],
      trace = m11 + m22 + m33,
      s;
    if (trace > 0) {
      s = 0.5 / Math.sqrt(trace + 1.0);
      this._w = 0.25 / s;
      this._x = (m32 - m23) * s;
      this._y = (m13 - m31) * s;
      this._z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
      this._w = (m32 - m23) / s;
      this._x = 0.25 * s;
      this._y = (m12 + m21) / s;
      this._z = (m13 + m31) / s;
    } else if (m22 > m33) {
      s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
      this._w = (m13 - m31) / s;
      this._x = (m12 + m21) / s;
      this._y = 0.25 * s;
      this._z = (m23 + m32) / s;
    } else {
      s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
      this._w = (m21 - m12) / s;
      this._x = (m13 + m31) / s;
      this._y = (m23 + m32) / s;
      this._z = 0.25 * s;
    }
    this._onChangeCallback();
    return this;
  },
  setFromUnitVectors: function setFromUnitVectors(vFrom, vTo) {
    // assumes direction vectors vFrom and vTo are normalized

    var EPS = 0.000001;
    var r = vFrom.dot(vTo) + 1;
    if (r < EPS) {
      r = 0;
      if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
        this._x = -vFrom.y;
        this._y = vFrom.x;
        this._z = 0;
        this._w = r;
      } else {
        this._x = 0;
        this._y = -vFrom.z;
        this._z = vFrom.y;
        this._w = r;
      }
    } else {
      // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

      this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
      this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
      this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
      this._w = r;
    }
    return this.normalize();
  },
  angleTo: function angleTo(q) {
    return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
  },
  rotateTowards: function rotateTowards(q, step) {
    var angle = this.angleTo(q);
    if (angle === 0) return this;
    var t = Math.min(1, step / angle);
    this.slerp(q, t);
    return this;
  },
  invert: function invert() {
    // quaternion is assumed to have unit length

    return this.conjugate();
  },
  conjugate: function conjugate() {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this._onChangeCallback();
    return this;
  },
  dot: function dot(v) {
    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
  },
  lengthSq: function lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  },
  length: function length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  },
  normalize: function normalize() {
    var l = this.length();
    if (l === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;
    } else {
      l = 1 / l;
      this._x = this._x * l;
      this._y = this._y * l;
      this._z = this._z * l;
      this._w = this._w * l;
    }
    this._onChangeCallback();
    return this;
  },
  mul: function mul(q) {
    return this.mul2(this, q);
  },
  premul: function premul(q) {
    return this.mul2(q, this);
  },
  mul2: function mul2(a, b) {
    // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

    var qax = a._x,
      qay = a._y,
      qaz = a._z,
      qaw = a._w;
    var qbx = b._x,
      qby = b._y,
      qbz = b._z,
      qbw = b._w;
    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    this._onChangeCallback();
    return this;
  },
  slerp: function slerp(qb, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(qb);
    var x = this._x,
      y = this._y,
      z = this._z,
      w = this._w;

    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
    if (cosHalfTheta < 0) {
      this._w = -qb._w;
      this._x = -qb._x;
      this._y = -qb._y;
      this._z = -qb._z;
      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(qb);
    }
    if (cosHalfTheta >= 1.0) {
      this._w = w;
      this._x = x;
      this._y = y;
      this._z = z;
      return this;
    }
    var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;
    if (sqrSinHalfTheta <= Number.EPSILON) {
      var s = 1 - t;
      this._w = s * w + t * this._w;
      this._x = s * x + t * this._x;
      this._y = s * y + t * this._y;
      this._z = s * z + t * this._z;
      this.normalize();
      this._onChangeCallback();
      return this;
    }
    var sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
      ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    this._w = w * ratioA + this._w * ratioB;
    this._x = x * ratioA + this._x * ratioB;
    this._y = y * ratioA + this._y * ratioB;
    this._z = z * ratioA + this._z * ratioB;
    this._onChangeCallback();
    return this;
  },
  equals: function equals(quaternion) {
    return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
  },
  fromArray: function fromArray(array, offset) {
    if (offset === undefined) offset = 0;
    this._x = array[offset];
    this._y = array[offset + 1];
    this._z = array[offset + 2];
    this._w = array[offset + 3];
    this._onChangeCallback();
    return this;
  },
  toArray: function toArray(array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._w;
    return array;
  },
  _onChange: function _onChange(callback) {
    this._onChangeCallback = callback;
    return this;
  },
  _onChangeCallback: function _onChangeCallback() {}
});

;// ./src/math/Vec3.js



/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

var _vector = new Vec3();
var _quaternion = new Quat();
function Vec3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}
Object.assign(Vec3.prototype, {
  isVec3: true,
  set: function set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  },
  setScalar: function setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  },
  setX: function setX(x) {
    this.x = x;
    return this;
  },
  setY: function setY(y) {
    this.y = y;
    return this;
  },
  setZ: function setZ(z) {
    this.z = z;
    return this;
  },
  setComponent: function setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      default:
        throw new Error('index is out of range: ' + index);
    }
    return this;
  },
  getComponent: function getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error('index is out of range: ' + index);
    }
  },
  clone: function clone() {
    return new this.constructor(this.x, this.y, this.z);
  },
  copy: function copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  },
  add: function add(v, w) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  },
  addScalar: function addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  },
  add2: function add2(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  },
  addScaledVector: function addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  },
  sub: function sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  },
  subScalar: function subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  },
  sub2: function sub2(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  },
  mul: function mul(v, w) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  },
  mulScalar: function mulScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  },
  mul2: function mul2(a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  },
  applyEuler: function applyEuler(euler) {
    if (!(euler && euler.isEuler)) {
      console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
    }
    return this.applyQuat(_quaternion.setFromEuler(euler));
  },
  applyAxisAngle: function applyAxisAngle(axis, angle) {
    return this.applyQuat(_quaternion.setFromAxisAngle(axis, angle));
  },
  applyMat3: function applyMat3(m) {
    var x = this.x,
      y = this.y,
      z = this.z;
    var e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;
    return this;
  },
  applyNormalMatrix: function applyNormalMatrix(m) {
    return this.applyMat3(m).normalize();
  },
  applyMat4: function applyMat4(m) {
    var x = this.x,
      y = this.y,
      z = this.z;
    var e = m.elements;
    var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return this;
  },
  applyQuat: function applyQuat(q) {
    var x = this.x,
      y = this.y,
      z = this.z;
    var qx = q.x,
      qy = q.y,
      qz = q.z,
      qw = q.w;

    // calculate quat * vector

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return this;
  },
  project: function project(camera) {
    return this.applyMat4(camera.matrixWorldInverse).applyMat4(camera.projectionMatrix);
  },
  unproject: function unproject(camera) {
    return this.applyMat4(camera.projectionMatrixInverse).applyMat4(camera.matrixWorld);
  },
  transformDirection: function transformDirection(m) {
    // input: THREE.Matrix4 affine matrix
    // vector interpreted as a direction

    var x = this.x,
      y = this.y,
      z = this.z;
    var e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z;
    this.y = e[1] * x + e[5] * y + e[9] * z;
    this.z = e[2] * x + e[6] * y + e[10] * z;
    return this.normalize();
  },
  div: function div(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  },
  divScalar: function divScalar(scalar) {
    return this.mulScalar(1 / scalar);
  },
  min: function min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    return this;
  },
  max: function max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    return this;
  },
  clamp: function clamp(min, max) {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));
    return this;
  },
  clampScalar: function clampScalar(minVal, maxVal) {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));
    return this;
  },
  clampLength: function clampLength(min, max) {
    var length = this.length();
    return this.divScalar(length || 1).mulScalar(Math.max(min, Math.min(max, length)));
  },
  floor: function floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  },
  ceil: function ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  },
  round: function round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  },
  roundToZero: function roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
    return this;
  },
  negate: function negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  },
  dot: function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  // TODO lengthSquared?

  lengthSq: function lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  length: function length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  manhattanLength: function manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  },
  normalize: function normalize() {
    return this.divScalar(this.length() || 1);
  },
  setLength: function setLength(length) {
    return this.normalize().mulScalar(length);
  },
  lerp: function lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  },
  lerpVectors: function lerpVectors(v1, v2, alpha) {
    return this.sub2(v2, v1).mulScalar(alpha).add(v1);
  },
  cross: function cross(v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
      return this.crossVectors(v, w);
    }
    return this.crossVectors(this, v);
  },
  crossVectors: function crossVectors(a, b) {
    var ax = a.x,
      ay = a.y,
      az = a.z;
    var bx = b.x,
      by = b.y,
      bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  },
  projectOnVector: function projectOnVector(v) {
    // v cannot be the zero v

    var scalar = v.dot(this) / v.lengthSq();
    return this.copy(v).mulScalar(scalar);
  },
  projectOnPlane: function projectOnPlane(planeNormal) {
    _vector.copy(this).projectOnVector(planeNormal);
    return this.sub(_vector);
  },
  reflect: function reflect(normal) {
    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length

    return this.sub(_vector.copy(normal).mulScalar(2 * this.dot(normal)));
  },
  angleTo: function angleTo(v) {
    var denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denominator === 0) console.error('THREE.Vector3: angleTo() can\'t handle zero length vectors.');
    var theta = this.dot(v) / denominator;

    // clamp, to handle numerical problems

    return Math.acos(clamp(theta, -1, 1));
  },
  distanceTo: function distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  },
  distanceToSquared: function distanceToSquared(v) {
    var dx = this.x - v.x,
      dy = this.y - v.y,
      dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  },
  manhattanDistanceTo: function manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  },
  setFromSpherical: function setFromSpherical(s) {
    return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
  },
  setFromSphericalCoords: function setFromSphericalCoords(radius, phi, theta) {
    var sinPhiRadius = Math.sin(phi) * radius;
    this.x = sinPhiRadius * Math.sin(theta);
    this.y = Math.cos(phi) * radius;
    this.z = sinPhiRadius * Math.cos(theta);
    return this;
  },
  setFromCylindrical: function setFromCylindrical(c) {
    return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
  },
  setFromCylindricalCoords: function setFromCylindricalCoords(radius, theta, y) {
    this.x = radius * Math.sin(theta);
    this.y = y;
    this.z = radius * Math.cos(theta);
    return this;
  },
  setFromMatrixPosition: function setFromMatrixPosition(m) {
    var e = m.elements;
    this.x = e[12];
    this.y = e[13];
    this.z = e[14];
    return this;
  },
  setFromMatrixScale: function setFromMatrixScale(m) {
    var sx = this.setFromMatrixColumn(m, 0).length();
    var sy = this.setFromMatrixColumn(m, 1).length();
    var sz = this.setFromMatrixColumn(m, 2).length();
    this.x = sx;
    this.y = sy;
    this.z = sz;
    return this;
  },
  setFromMatrixColumn: function setFromMatrixColumn(m, index) {
    return this.fromArray(m.elements, index * 4);
  },
  equals: function equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
  },
  fromArray: function fromArray(array, offset) {
    if (offset === undefined) offset = 0;
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    return this;
  },
  toArray: function toArray(array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    return array;
  },
  fromAttribute: function fromAttribute(attribute, index) {
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    return this;
  }
});

;// ./src/math/Mat3.js


/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */

var Mat3_vector = new Vec3();
function Mat3() {
  this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  if (arguments.length > 0) {
    console.error('THREE.Mat3: the constructor no longer reads arguments. use .set() instead.');
  }
}
Object.assign(Mat3.prototype, {
  isMat3: true,
  set: function set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    var te = this.elements;
    te[0] = n11;
    te[1] = n21;
    te[2] = n31;
    te[3] = n12;
    te[4] = n22;
    te[5] = n32;
    te[6] = n13;
    te[7] = n23;
    te[8] = n33;
    return this;
  },
  identity: function identity() {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this;
  },
  // to2D: function() {

  //     const array = this.elements;
  //     const result = {};

  //     result.a = array[0]
  //     result.b = array[1]
  //     result.c = array[3]
  //     result.d = array[4]
  //     result.tx = array[6]
  //     result.ty = array[7]

  //     return result;
  // },

  clone: function clone() {
    return new this.constructor().fromArray(this.elements);
  },
  copy: function copy(m) {
    var te = this.elements;
    var me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    return this;
  },
  setFromMatrix4: function setFromMatrix4(m) {
    var me = m.elements;
    this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
    return this;
  },
  applyToBufferAttribute: function applyToBufferAttribute(attribute) {
    for (var i = 0, l = attribute.count; i < l; i++) {
      Mat3_vector.x = attribute.getX(i);
      Mat3_vector.y = attribute.getY(i);
      Mat3_vector.z = attribute.getZ(i);
      Mat3_vector.applyMat3(this);
      attribute.setXYZ(i, Mat3_vector.x, Mat3_vector.y, Mat3_vector.z);
    }
    return attribute;
  },
  multiply: function multiply(m) {
    return this.mul2(this, m);
  },
  premultiply: function premultiply(m) {
    return this.mul2(m, this);
  },
  mul2: function mul2(a, b) {
    var ae = a.elements;
    var be = b.elements;
    var te = this.elements;
    var a11 = ae[0],
      a12 = ae[3],
      a13 = ae[6];
    var a21 = ae[1],
      a22 = ae[4],
      a23 = ae[7];
    var a31 = ae[2],
      a32 = ae[5],
      a33 = ae[8];
    var b11 = be[0],
      b12 = be[3],
      b13 = be[6];
    var b21 = be[1],
      b22 = be[4],
      b23 = be[7];
    var b31 = be[2],
      b32 = be[5],
      b33 = be[8];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31;
    te[3] = a11 * b12 + a12 * b22 + a13 * b32;
    te[6] = a11 * b13 + a12 * b23 + a13 * b33;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31;
    te[4] = a21 * b12 + a22 * b22 + a23 * b32;
    te[7] = a21 * b13 + a22 * b23 + a23 * b33;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31;
    te[5] = a31 * b12 + a32 * b22 + a33 * b32;
    te[8] = a31 * b13 + a32 * b23 + a33 * b33;
    return this;
  },
  mulScalar: function mulScalar(s) {
    var te = this.elements;
    te[0] *= s;
    te[3] *= s;
    te[6] *= s;
    te[1] *= s;
    te[4] *= s;
    te[7] *= s;
    te[2] *= s;
    te[5] *= s;
    te[8] *= s;
    return this;
  },
  determinant: function determinant() {
    var te = this.elements;
    var a = te[0],
      b = te[1],
      c = te[2],
      d = te[3],
      e = te[4],
      f = te[5],
      g = te[6],
      h = te[7],
      i = te[8];
    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  },
  getInverse: function getInverse(matrix, throwOnDegenerate) {
    if (matrix && matrix.isMat4) {
      console.error("THREE.Mat3: .getInverse() no longer takes a Matrix4 argument.");
    }
    var me = matrix.elements,
      te = this.elements,
      n11 = me[0],
      n21 = me[1],
      n31 = me[2],
      n12 = me[3],
      n22 = me[4],
      n32 = me[5],
      n13 = me[6],
      n23 = me[7],
      n33 = me[8],
      t11 = n33 * n22 - n32 * n23,
      t12 = n32 * n13 - n33 * n12,
      t13 = n23 * n12 - n22 * n13,
      det = n11 * t11 + n21 * t12 + n31 * t13;
    if (det === 0) {
      var msg = "THREE.Mat3: .getInverse() can't invert matrix, determinant is 0";
      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }
      return this.identity();
    }
    var detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n31 * n23 - n33 * n21) * detInv;
    te[2] = (n32 * n21 - n31 * n22) * detInv;
    te[3] = t12 * detInv;
    te[4] = (n33 * n11 - n31 * n13) * detInv;
    te[5] = (n31 * n12 - n32 * n11) * detInv;
    te[6] = t13 * detInv;
    te[7] = (n21 * n13 - n23 * n11) * detInv;
    te[8] = (n22 * n11 - n21 * n12) * detInv;
    return this;
  },
  transpose: function transpose() {
    var tmp,
      m = this.elements;
    tmp = m[1];
    m[1] = m[3];
    m[3] = tmp;
    tmp = m[2];
    m[2] = m[6];
    m[6] = tmp;
    tmp = m[5];
    m[5] = m[7];
    m[7] = tmp;
    return this;
  },
  getNormalMatrix: function getNormalMatrix(matrix4) {
    return this.setFromMatrix4(matrix4).getInverse(this).transpose();
  },
  transposeIntoArray: function transposeIntoArray(r) {
    var m = this.elements;
    r[0] = m[0];
    r[1] = m[3];
    r[2] = m[6];
    r[3] = m[1];
    r[4] = m[4];
    r[5] = m[7];
    r[6] = m[2];
    r[7] = m[5];
    r[8] = m[8];
    return this;
  },
  setUvTransform: function setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
    var c = Math.cos(rotation);
    var s = Math.sin(rotation);
    this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
  },
  scale: function scale(sx, sy) {
    var te = this.elements;
    te[0] *= sx;
    te[3] *= sx;
    te[6] *= sx;
    te[1] *= sy;
    te[4] *= sy;
    te[7] *= sy;
    return this;
  },
  rotate: function rotate(theta) {
    var c = Math.cos(theta);
    var s = Math.sin(theta);
    var te = this.elements;
    var a11 = te[0],
      a12 = te[3],
      a13 = te[6];
    var a21 = te[1],
      a22 = te[4],
      a23 = te[7];
    te[0] = c * a11 + s * a21;
    te[3] = c * a12 + s * a22;
    te[6] = c * a13 + s * a23;
    te[1] = -s * a11 + c * a21;
    te[4] = -s * a12 + c * a22;
    te[7] = -s * a13 + c * a23;
    return this;
  },
  translate: function translate(tx, ty) {
    var te = this.elements;
    te[0] += tx * te[2];
    te[1] += ty * te[2];
    te[3] += tx * te[5];
    te[4] += ty * te[5];
    te[6] += tx * te[8];
    te[7] += ty * te[8];
    return this;
  },
  equals: function equals(matrix) {
    var te = this.elements;
    var me = matrix.elements;
    for (var i = 0; i < 9; i++) {
      if (te[i] !== me[i]) return false;
    }
    return true;
  },
  fromArray: function fromArray(array, offset) {
    if (offset === undefined) offset = 0;
    for (var i = 0; i < 9; i++) {
      this.elements[i] = array[i + offset];
    }
    return this;
  },
  toArray: function toArray(array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    var te = this.elements;
    array[offset] = te[0];
    array[offset + 1] = te[1];
    array[offset + 2] = te[2];
    array[offset + 3] = te[3];
    array[offset + 4] = te[4];
    array[offset + 5] = te[5];
    array[offset + 6] = te[6];
    array[offset + 7] = te[7];
    array[offset + 8] = te[8];
    return array;
  }
});
var identityMatrix = new Mat3();

;// ./src/math/Vec2.js
var Vec2 = function Vec2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};
Object.assign(Vec2.prototype, {
  isVec2: true,
  set: function set(x, y) {
    this.x = x || 0;
    this.y = y || (y !== 0 ? this.x : 0);
    return this;
  },
  // setScalar: function (scalar) {
  //     this.x = scalar;
  //     this.y = scalar;

  //     return this;
  // },

  // setX: function (x) {
  //     this.x = x;

  //     return this;
  // },

  // setY: function (y) {
  //     this.y = y;

  //     return this;
  // },

  /**
   *  START: Uses by Orbit controls
   */
  sub2: function sub2(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },
  mulScalar: function mulScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  },
  copy: function copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  },
  mul: function mul(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  },
  clone: function clone() {
    return new this.constructor(this.x, this.y);
  }

  /**
   *  END: Uses by Orbit controls
   */
});

;// ./src/constants.js
var VERSION = '3.0.3';

// export const BLEND_MODES = {
//     NORMAL: 0,
//     ADD: 1,
//     MULTIPLY: 2,
//     SCREEN: 3,
//     OVERLAY: 4,
//     DARKEN: 5,
//     LIGHTEN: 6,
//     COLOR_DODGE: 7,
//     COLOR_BURN: 8,
//     HARD_LIGHT: 9,
//     SOFT_LIGHT: 10,
//     DIFFERENCE: 11,
//     EXCLUSION: 12,
//     HUE: 13,
//     SATURATION: 14,
//     COLOR: 15,
//     LUMINOSITY: 16,

//     NORMAL_NPM: 17,
//     ADD_NPM: 18,
//     SCREEN_NPM: 19
// };

// export const SCALE_MODES = {
//     LINEAR: 0,
//     NEAREST: 1
// };

// export const SHAPES = {
//     POLY: 0,
//     RECT: 1,
//     CIRC: 2,
//     ELIP: 3,
//     RREC: 4
// };

var PolygonShape = 0;
var RectangleShape = 1;
var CircleShape = 2;
var EllipseShape = 3;
var RoundedRectangleShape = 4;
// export const CubeShape = 5;
// export const SphereShape = 6;
// export const CylinderShape = 7;
// export const ConeShape = 8;
// export const PyramidShape = 9;

var NoColors = 0;

// export const MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
// export const TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };
var CullFaceNone = 0;
var CullFaceBack = 1;
var CullFaceFront = 2;
// export const CullFaceFrontBack = 3;
// export const BasicShadowMap = 0;
var PCFShadowMap = 1;
var PCFSoftShadowMap = 2;
var VSMShadowMap = 3;
var FrontSide = 0;
var BackSide = 1;
var DoubleSide = 2;
var FlatShading = 1;
var SmoothShading = 2;
var NoBlending = 0;
var NormalBlending = 1;
var AdditiveBlending = 2;
var SubtractiveBlending = 3;
var MultiplyBlending = 4;
var ScreenBlending = 5;
var CustomBlending = 6;
var AddEquation = 100;
var SubtractEquation = 101;
var ReverseSubtractEquation = 102;
var MinEquation = 103;
var MaxEquation = 104;
var ZeroFactor = 200;
var OneFactor = 201;
var SrcColorFactor = 202;
var OneMinusSrcColorFactor = 203;
var SrcAlphaFactor = 204;
var OneMinusSrcAlphaFactor = 205;
var DstAlphaFactor = 206;
var OneMinusDstAlphaFactor = 207;
var DstColorFactor = 208;
var OneMinusDstColorFactor = 209;
var SrcAlphaSaturateFactor = 210;
var NeverDepth = 0;
var AlwaysDepth = 1;
var LessDepth = 2;
var LessEqualDepth = 3;
var EqualDepth = 4;
var GreaterEqualDepth = 5;
var GreaterDepth = 6;
var NotEqualDepth = 7;
var MultiplyOperation = 0;
var MixOperation = 1;
var AddOperation = 2;
var NoToneMapping = 0;
var LinearToneMapping = 1;
var ReinhardToneMapping = 2;
var CineonToneMapping = 3;
var ACESFilmicToneMapping = 4;
var CustomToneMapping = 5;
var UVMapping = 300;
var CubeReflectionMapping = 301;
var CubeRefractionMapping = 302;
var EquirectangularReflectionMapping = 303;
var EquirectangularRefractionMapping = 304;
var CubeUVReflectionMapping = 306;
var CubeUVRefractionMapping = 307;
var RepeatWrapping = 1000;
var ClampToEdgeWrapping = 1001;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var NearestMipmapNearestFilter = 1004;
// export const NearestMipMapNearestFilter = 1004;
var NearestMipmapLinearFilter = 1005;
// export const NearestMipMapLinearFilter = 1005;
var LinearFilter = 1006;
var LinearMipmapNearestFilter = 1007;
// export const LinearMipMapNearestFilter = 1007;
var LinearMipmapLinearFilter = 1008;
var LinearMipMapLinearFilter = 1008;
var UnsignedByteType = 1009;
var ByteType = 1010;
var ShortType = 1011;
var UnsignedShortType = 1012;
var IntType = 1013;
var UnsignedIntType = 1014;
var FloatType = 1015;
var HalfFloatType = 1016;
var UnsignedShort4444Type = 1017;
var UnsignedShort5551Type = 1018;
var UnsignedShort565Type = 1019;
var UnsignedInt248Type = 1020;
var AlphaFormat = 1021;
var RGBFormat = 1022;
var RGBAFormat = 1023;
var LuminanceFormat = 1024;
var LuminanceAlphaFormat = 1025;
// export const RGBEFormat = RGBAFormat;
var DepthFormat = 1026;
var DepthStencilFormat = 1027;
var RedFormat = 1028;
var RedIntegerFormat = 1029;
var RGFormat = 1030;
var RGIntegerFormat = 1031;
var RGBIntegerFormat = 1032;
var RGBAIntegerFormat = 1033;
var RGB_S3TC_DXT1_Format = 33776;
var RGBA_S3TC_DXT1_Format = 33777;
var RGBA_S3TC_DXT3_Format = 33778;
var RGBA_S3TC_DXT5_Format = 33779;
var RGB_PVRTC_4BPPV1_Format = 35840;
var RGB_PVRTC_2BPPV1_Format = 35841;
var RGBA_PVRTC_4BPPV1_Format = 35842;
var RGBA_PVRTC_2BPPV1_Format = 35843;
var RGB_ETC1_Format = 36196;
var RGB_ETC2_Format = 37492;
var RGBA_ETC2_EAC_Format = 37496;
var RGBA_ASTC_4x4_Format = 37808;
var RGBA_ASTC_5x4_Format = 37809;
var RGBA_ASTC_5x5_Format = 37810;
var RGBA_ASTC_6x5_Format = 37811;
var RGBA_ASTC_6x6_Format = 37812;
var RGBA_ASTC_8x5_Format = 37813;
var RGBA_ASTC_8x6_Format = 37814;
var RGBA_ASTC_8x8_Format = 37815;
var RGBA_ASTC_10x5_Format = 37816;
var RGBA_ASTC_10x6_Format = 37817;
var RGBA_ASTC_10x8_Format = 37818;
var RGBA_ASTC_10x10_Format = 37819;
var RGBA_ASTC_12x10_Format = 37820;
var RGBA_ASTC_12x12_Format = 37821;
var RGBA_BPTC_Format = 36492;
var SRGB8_ALPHA8_ASTC_4x4_Format = 37840;
var SRGB8_ALPHA8_ASTC_5x4_Format = 37841;
var SRGB8_ALPHA8_ASTC_5x5_Format = 37842;
var SRGB8_ALPHA8_ASTC_6x5_Format = 37843;
var SRGB8_ALPHA8_ASTC_6x6_Format = 37844;
var SRGB8_ALPHA8_ASTC_8x5_Format = 37845;
var SRGB8_ALPHA8_ASTC_8x6_Format = 37846;
var SRGB8_ALPHA8_ASTC_8x8_Format = 37847;
var SRGB8_ALPHA8_ASTC_10x5_Format = 37848;
var SRGB8_ALPHA8_ASTC_10x6_Format = 37849;
var SRGB8_ALPHA8_ASTC_10x8_Format = 37850;
var SRGB8_ALPHA8_ASTC_10x10_Format = 37851;
var SRGB8_ALPHA8_ASTC_12x10_Format = 37852;
var SRGB8_ALPHA8_ASTC_12x12_Format = 37853;
// export const LoopOnce = 2200;
// export const LoopRepeat = 2201;
// export const LoopPingPong = 2202;
// export const InterpolateDiscrete = 2300;
// export const InterpolateLinear = 2301;
// export const InterpolateSmooth = 2302;
// export const ZeroCurvatureEnding = 2400;
// export const ZeroSlopeEnding = 2401;
// export const WrapAroundEnding = 2402;
// export const NormalAnimationBlendMode = 2500;
// export const AdditiveAnimationBlendMode = 2501;
// export const TrianglesDrawMode = 0;
// export const TriangleStripDrawMode = 1;
// export const TriangleFanDrawMode = 2;
var LinearEncoding = 3000;
var sRGBEncoding = 3001;
var GammaEncoding = 3007;
var RGBEEncoding = 3002;
var LogLuvEncoding = 3003;
var RGBM7Encoding = 3004;
var RGBM16Encoding = 3005;
var RGBDEncoding = 3006;
// export const BasicDepthPacking = 3200;
// export const RGBADepthPacking = 3201;
var TangentSpaceNormalMap = 0;
var ObjectSpaceNormalMap = 1;

// export const ZeroStencilOp = 0;
var KeepStencilOp = 7680;
// export const ReplaceStencilOp = 7681;
// export const IncrementStencilOp = 7682;
// export const DecrementStencilOp = 7683;
// export const IncrementWrapStencilOp = 34055;
// export const DecrementWrapStencilOp = 34056;
// export const InvertStencilOp = 5386;

// export const NeverStencilFunc = 512;
// export const LessStencilFunc = 513;
// export const EqualStencilFunc = 514;
// export const LessEqualStencilFunc = 515;
// export const GreaterStencilFunc = 516;
// export const NotEqualStencilFunc = 517;
// export const GreaterEqualStencilFunc = 518;
var AlwaysStencilFunc = 519;
var StaticDrawUsage = 35044;
// export const DynamicDrawUsage = 35048;
// export const StreamDrawUsage = 35040;
// export const StaticReadUsage = 35045;
// export const DynamicReadUsage = 35049;
// export const StreamReadUsage = 35041;
// export const StaticCopyUsage = 35046;
// export const DynamicCopyUsage = 35050;
// export const StreamCopyUsage = 35042;

// export const GLSL1 = '100';
var GLSL3 = '300 es';
;// ./src/core.js









var core_Tiny = {
  VERSION: VERSION,
  CanvasBuffer: CanvasBuffer,
  EventTarget: EventTarget,
  SystemTarget: SystemTarget,
  Math: _Math,
  Mat3: Mat3,
  Vec2: Vec2,
  Color: Color,
  PCFShadowMap: PCFShadowMap,
  PCFSoftShadowMap: PCFSoftShadowMap,
  VSMShadowMap: VSMShadowMap,
  FrontSide: FrontSide,
  BackSide: BackSide,
  DoubleSide: DoubleSide,
  FlatShading: FlatShading,
  SmoothShading: SmoothShading,
  NoBlending: NoBlending,
  NormalBlending: NormalBlending,
  AdditiveBlending: AdditiveBlending,
  SubtractiveBlending: SubtractiveBlending,
  MultiplyBlending: MultiplyBlending,
  ScreenBlending: ScreenBlending,
  CustomBlending: CustomBlending,
  AddEquation: AddEquation,
  SubtractEquation: SubtractEquation,
  ReverseSubtractEquation: ReverseSubtractEquation,
  MinEquation: MinEquation,
  MaxEquation: MaxEquation,
  ZeroFactor: ZeroFactor,
  OneFactor: OneFactor,
  SrcColorFactor: SrcColorFactor
};
window.Tiny = core_Tiny;
;// ./src/app/registrar.js
var systems = [];
function registerSystem(name, system) {
  systems.push({
    name: name,
    _class_: system
  });
}
;

;// ./src/app/App.js


var noop = function noop() {};
var App = function App(states) {
  this.callbackContext = this;
  this.state = 0;
  this.timeScale = 1;
  this.time = 0;
  this.width = 0;
  this.height = 0;
  this.systems = [];
  this.updatable = [];
  this.paused = false;
  this.pauseDuration = 0;
  this.inputView = document.body;
  if (!Tiny.app) Tiny.app = this;
  EventTarget.mixin(this);
  states = states || {};
  this.boot = states.boot || this.boot || noop;
  this.preload = states.preload || this.preload || noop;
  this.create = states.create || this.create || noop;
  this.update = states.update || this.update || noop;
  this.render = states.render || this.render || noop;
  this._resize_cb = states.resize || noop;
  this._destroy_cb = states.destroy || noop;
  var self = this;
  setTimeout(function () {
    self._boot();
  }, 0);
};
App.prototype._boot = function () {
  for (var i = 0; i < systems.length; i++) {
    var system = systems[i];
    var _sys_ = new system._class_(this);
    this.systems.push(_sys_);
    if (_sys_.update) this.updatable.push(_sys_);
    if (system.name) this[system.name] = _sys_;
  }
  if (Tiny.RAF) {
    this.raf = new Tiny.RAF(this);
  }
  this.boot.call(this.callbackContext);
  var self = this;
  setTimeout(function () {
    if (self.load) self._preload();else self._create();
  }, 0);
};
App.prototype._preload = function () {
  this.preload.call(this.callbackContext);
  this.state = 1;
  this.load.start(this._create);
};
App.prototype._create = function () {
  this.emit('load');
  this.create.call(this.callbackContext);
  if (this.raf) {
    this.raf.start();
  }
  this.state = 2;
};
App.prototype.pause = function () {
  if (this.raf) {
    this.raf.reset();
  }
  if (!this.paused) {
    for (var i = 0; i < this.systems.length; i++) {
      if (this.systems[i].pause) this.systems[i].pause();
    }
    this.paused = true;
  }
};
App.prototype.resume = function () {
  if (this.raf) {
    this.raf.reset();
  }
  if (this.paused) {
    for (var i = 0; i < this.systems.length; i++) {
      if (this.systems[i].resume) this.systems[i].resume();
    }
    this.paused = false;
  }
};
App.prototype._update = function (delta) {
  if (!this.paused) {
    delta *= this.timeScale;
    this.time += delta;
    this.update.call(this.callbackContext, this.time, delta);
    this.emit('update', delta);
    for (var i = 0; i < this.updatable.length; i++) {
      this.updatable[i].update(delta);
    }
  } else {
    this.pauseDuration += delta;
  }
  this.render();
  this.emit('postrender');
};
App.prototype.resize = function (width, height) {
  this.width = width || this.width;
  this.height = height || this.height;
  if (this.state > 0) {
    this._resize_cb.call(this.callbackContext, this.width, this.height);
    this.emit('resize', width, height);
  }
  var self = this;
  setTimeout(function () {
    if (self.input) self.input.updateBounds();
  }, 0);
};
App.prototype.destroy = function (clearCache) {
  for (var i = 0; i < this.systems.length; i++) {
    if (this.systems[i].destroy) this.systems[i].destroy(clearCache);
  }
  this.paused = true;
  if (clearCache) {
    this.load.clearCache();
  }
  if (this.raf) {
    this.raf.stop();
  }
  this._destroy_cb.call(this.callbackContext);
  if (Tiny.app === this) Tiny.app = null;
};

;// ./src/app/RAF.js
var _isSetTimeOut, _onLoop, _timeOutID, _prevTime, _lastTime;
var now = function now() {
  return new Date().getTime();
};
if (self.performance !== undefined && self.performance.now !== undefined) {
  now = self.performance.now.bind(self.performance);
} else if (Date.now !== undefined) {
  now = Date.now;
}
var RAF = function RAF(game, forceSetTimeOut) {
  if (forceSetTimeOut === undefined) {
    forceSetTimeOut = false;
  }
  this.game = game;
  this.isRunning = false;
  this.forceSetTimeOut = forceSetTimeOut;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  _isSetTimeOut = false;
  _onLoop = null;
  _timeOutID = null;
  _prevTime = 0;
  _lastTime = 0;
};
RAF.prototype = {
  start: function start() {
    _prevTime = now();
    this.isRunning = true;
    var _this = this;
    if (!window.requestAnimationFrame || this.forceSetTimeOut) {
      _isSetTimeOut = true;
      _onLoop = function _onLoop() {
        return _this.updateSetTimeout();
      };
      _timeOutID = window.setTimeout(_onLoop, 0);
    } else {
      _isSetTimeOut = false;
      _onLoop = function _onLoop() {
        return _this.updateRAF();
      };
      _timeOutID = window.requestAnimationFrame(_onLoop);
    }
  },
  updateRAF: function updateRAF() {
    _lastTime = now();
    if (this.isRunning) {
      this.game._update(_lastTime - _prevTime);
      _timeOutID = window.requestAnimationFrame(_onLoop);
    }
    _prevTime = _lastTime;
  },
  updateSetTimeout: function updateSetTimeout() {
    _lastTime = now();
    if (this.isRunning) {
      this.game._update(_lastTime - _prevTime);
      _timeOutID = window.setTimeout(_onLoop, RAF.timeToCall);
    }
    _prevTime = _lastTime;
  },
  reset: function reset() {
    _prevTime = now();
  },
  stop: function stop() {
    if (_isSetTimeOut) {
      clearTimeout(_timeOutID);
    } else {
      window.cancelAnimationFrame(_timeOutID);
    }
    this.isRunning = false;
  }
};
RAF.timeToCall = 15;

;// ./src/loaders/Cache.js
var Cache = {
  image: {},
  texture: {}
};

;// ./src/loaders/LoadingManager.js



var LoadingManager = function LoadingManager(parent) {
  EventTarget.mixin(this);
  parent.cache = Cache;
  this.game = parent;
  this.list = [];
};
LoadingManager.prototype = {
  clearCache: function clearCache() {
    for (var y in Cache.texture) Cache.texture[y].destroy();
    for (var y in Cache) Cache[y] = {};
  },
  all: function all(array) {
    this.list = this.list.concat(array);
  },
  start: function start(callback) {
    var _this = this;
    var game = _this.game;
    var list = _this.list;
    var total = list.length;
    if (total == 0) {
      callback.call(game);
      return;
    }
    function loadNext() {
      // var done = false;
      var resource = list.shift();
      var loader = LoadingManager[resource.type];
      if (loader) {
        loader(resource, loaded);
      } else {
        console.warn('Cannot find loader for ' + resource.type);
        loaded();
      }
    }
    function loaded(resource, data) {
      _this.emit('progress', 1 - list.length / total);
      if (list.length != 0) {
        loadNext();
      } else {
        _this.emit('complete');
        callback.call(game);
      }
    }
    loadNext();
  }
};
registerSystem('load', LoadingManager);

;// ./src/math/shapes/Rectangle.js


/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * the Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
 *
 * @class Rectangle
 * @constructor
 * @param x {Number} The X coordinate of the upper-left corner of the rectangle
 * @param y {Number} The Y coordinate of the upper-left corner of the rectangle
 * @param width {Number} The overall width of this rectangle
 * @param height {Number} The overall height of this rectangle
 */
var Rectangle = function Rectangle(x, y, width, height) {
  /**
   * @property x
   * @type Number
   * @default 0
   */
  this.x = x || 0;

  /**
   * @property y
   * @type Number
   * @default 0
   */
  this.y = y || 0;

  /**
   * @property width
   * @type Number
   * @default 0
   */
  this.width = width || 0;

  /**
   * @property height
   * @type Number
   * @default 0
   */
  this.height = height || 0;

  /**
   * The type of the object, should be one of the Graphics type consts, PIXI.Graphics.RECT in this case
   * @property type
   * @type Number
   * @default 0
   */

  this.type = RectangleShape;
};

// constructor
Rectangle.prototype.constructor = Rectangle;

/**
 * Creates a clone of this Rectangle
 *
 * @method clone
 * @return {Rectangle} a copy of the rectangle
 */
// Rectangle.prototype.clone = function()
// {
//     return new Rectangle(this.x, this.y, this.width, this.height);
// };

/**
 * Checks whether the x and y coordinates given are contained within this Rectangle
 *
 * @method contains
 * @param x {Number} The X coordinate of the point to test
 * @param y {Number} The Y coordinate of the point to test
 * @return {Boolean} Whether the x/y coordinates are within this Rectangle
 */
Rectangle.prototype.contains = function (x, y) {
  if (this.width <= 0 || this.height <= 0) return false;
  var x1 = this.x;
  if (x >= x1 && x <= x1 + this.width) {
    var y1 = this.y;
    if (y >= y1 && y <= y1 + this.height) {
      return true;
    }
  }
  return false;
};
var EmptyRectangle = new Rectangle(0, 0, 0, 0);

;// ./src/textures/BaseTexture.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */






// import { ImageUtils } from '../extras/ImageUtils.js';

var textureId = 0;
function BaseTexture(image, options) {
  options = options || {};
  Object.defineProperty(this, 'id', {
    value: textureId++
  });
  this.uuid = uid();
  this.name = '';
  this.image = image !== undefined ? image : BaseTexture.DEFAULT_IMAGE;
  this.mipmaps = [];
  this.mapping = getValue(options, 'mapping', BaseTexture.DEFAULT_MAPPING);
  this.wrapS = getValue(options, 'wrapS', ClampToEdgeWrapping);
  this.wrapT = getValue(options, 'wrapT', ClampToEdgeWrapping);
  this.magFilter = getValue(options, 'magFilter', LinearFilter);
  this.minFilter = getValue(options, 'minFilter', LinearFilter);
  this.anisotropy = getValue(options, 'anisotropy', 1);
  this.format = getValue(options, 'format', RGBAFormat);
  this.internalFormat = null;
  this.type = getValue(options, 'type', UnsignedByteType);

  // this.offset = new Vec2(0, 0);
  // this.repeat = new Vec2(1, 1);
  // this.center = new Vec2(0, 0);
  // this.rotation = 0;

  // this.matrixAutoUpdate = true;
  // this.matrix = new Mat3();

  this.generateMipmaps = true;
  // this.premultiplyAlpha = false;
  this.flipY = false;
  this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

  // Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
  //
  // Also changing the encoding after already used by a Material will not automatically make the Material
  // update. You need to explicitly call Material.needsUpdate to trigger it to recompile.
  this.encoding = getValue(options, 'encoding', LinearEncoding);
  this.version = 0;
  // this.onUpdate = null;

  /**
   * The Resolution of the texture.
   *
   * @property resolution
   * @type Number
   */
  this.resolution = 1;

  /**
   * [read-only] The width of the base texture set when the image has valid
   *
   * @property width
   * @type Number
   * @readOnly
   */
  this.width = 100;

  /**
   * [read-only] The height of the base texture set when the image has valid
   *
   * @property height
   * @type Number
   * @readOnly
   */
  this.height = 100;

  // this.scaleMode = scaleMode || 0;
  this.valid = false;
  // this.source = source;

  // this._UID = uid();
  this.premultipliedAlpha = true;
  // this._glTextures = [];
  this.mipmap = false;
  // this._dirty = [true, true, true, true];
  this.imageUrl = null;
  this._powerOf2 = false;
  this._enabled = 0;
  this._virtalBoundId = -1;
  this.touched = 0;
  if (!image) return;
  var self = this;
  function onLoad() {
    self.valid = true;
    self.width = self.image.naturalWidth || self.image.width;
    self.height = self.image.naturalHeight || self.image.height;
    // self.dirty();
    self.version++;
    self.emit('load');
  }
  if ((image.complete || image.getContext) && image.width && image.height) {
    onLoad();
  } else {
    image.onload = onLoad;
  }
}
BaseTexture.DEFAULT_IMAGE = undefined;
BaseTexture.DEFAULT_MAPPING = UVMapping;
Object.assign(BaseTexture.prototype, {
  constructor: BaseTexture,
  isBaseTexture: true,
  /**
   * Sets all glTextures to be dirty.
   *
   * @method dirty
   */
  // dirty: function () {
  // 	for (var i = 0; i < this._glTextures.length; i++) {
  // 		this._dirty[i] = true;
  // 	}
  // },

  // updateMatrix: function () {
  // 	this.matrix.setUvTransform(
  // 		this.offset.x,
  // 		this.offset.y,
  // 		this.repeat.x,
  // 		this.repeat.y,
  // 		this.rotation,
  // 		this.center.x,
  // 		this.center.y
  // 	);
  // },

  // clone: function () {

  // 	return new this.constructor().copy( this );

  // },

  // copy: function ( source ) {

  // 	this.name = source.name;

  // 	this.image = source.image;
  // 	this.mipmaps = source.mipmaps.slice( 0 );

  // 	this.mapping = source.mapping;

  // 	this.wrapS = source.wrapS;
  // 	this.wrapT = source.wrapT;

  // 	this.magFilter = source.magFilter;
  // 	this.minFilter = source.minFilter;

  // 	this.anisotropy = source.anisotropy;

  // 	this.format = source.format;
  // 	this.internalFormat = source.internalFormat;
  // 	this.type = source.type;

  // 	this.offset.copy( source.offset );
  // 	this.repeat.copy( source.repeat );
  // 	this.center.copy( source.center );
  // 	this.rotation = source.rotation;

  // 	this.matrixAutoUpdate = source.matrixAutoUpdate;
  // 	this.matrix.copy( source.matrix );

  // 	this.generateMipmaps = source.generateMipmaps;
  // 	this.premultiplyAlpha = source.premultiplyAlpha;
  // 	this.flipY = source.flipY;
  // 	this.unpackAlignment = source.unpackAlignment;
  // 	this.encoding = source.encoding;

  // 	return this;

  // },

  // toJSON: function ( meta ) {

  // 	var isRootObject = ( meta === undefined || typeof meta === 'string' );

  // 	if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

  // 		return meta.textures[ this.uuid ];

  // 	}

  // 	var output = {

  // 		metadata: {
  // 			version: 4.5,
  // 			type: 'Texture',
  // 			generator: 'Texture.toJSON'
  // 		},

  // 		uuid: this.uuid,
  // 		name: this.name,

  // 		mapping: this.mapping,

  // 		repeat: [ this.repeat.x, this.repeat.y ],
  // 		offset: [ this.offset.x, this.offset.y ],
  // 		center: [ this.center.x, this.center.y ],
  // 		rotation: this.rotation,

  // 		wrap: [ this.wrapS, this.wrapT ],

  // 		format: this.format,
  // 		type: this.type,
  // 		encoding: this.encoding,

  // 		minFilter: this.minFilter,
  // 		magFilter: this.magFilter,
  // 		anisotropy: this.anisotropy,

  // 		flipY: this.flipY,

  // 		premultiplyAlpha: this.premultiplyAlpha,
  // 		unpackAlignment: this.unpackAlignment

  // 	};

  // 	if ( this.image !== undefined ) {

  // 		// TODO: Move to THREE.Image

  // 		var image = this.image;

  // 		if ( image.uuid === undefined ) {

  // 			image.uuid = _Math.generateUUID(); // UGH

  // 		}

  // 		if ( ! isRootObject && meta.images[ image.uuid ] === undefined ) {

  // 			var url;

  // 			if ( Array.isArray( image ) ) {

  // 				// process array of images e.g. CubeBaseTexture

  // 				url = [];

  // 				for ( var i = 0, l = image.length; i < l; i ++ ) {

  // 					url.push( ImageUtils.getDataURL( image[ i ] ) );

  // 				}

  // 			} else {

  // 				// process single image

  // 				url = ImageUtils.getDataURL( image );

  // 			}

  // 			meta.images[ image.uuid ] = {
  // 				uuid: image.uuid,
  // 				url: url
  // 			};

  // 		}

  // 		output.image = image.uuid;

  // 	}

  // 	if ( ! isRootObject ) {

  // 		meta.textures[ this.uuid ] = output;

  // 	}

  // 	return output;

  // },

  dispose: function dispose() {
    this.emit('dispose');
  }

  // transformUv: function (uv) {
  // 	if (this.mapping !== UVMapping) return uv;

  // 	uv.applyMat3(this.matrix);

  // 	if (uv.x < 0 || uv.x > 1) {
  // 		switch (this.wrapS) {
  // 			case RepeatWrapping:
  // 				uv.x = uv.x - Math.floor(uv.x);
  // 				break;

  // 			case ClampToEdgeWrapping:
  // 				uv.x = uv.x < 0 ? 0 : 1;
  // 				break;

  // 			case MirroredRepeatWrapping:
  // 				if (Math.abs(Math.floor(uv.x) % 2) === 1) {
  // 					uv.x = Math.ceil(uv.x) - uv.x;
  // 				} else {
  // 					uv.x = uv.x - Math.floor(uv.x);
  // 				}
  // 				break;
  // 		}
  // 	}

  // 	if (uv.y < 0 || uv.y > 1) {
  // 		switch (this.wrapT) {
  // 			case RepeatWrapping:
  // 				uv.y = uv.y - Math.floor(uv.y);
  // 				break;

  // 			case ClampToEdgeWrapping:
  // 				uv.y = uv.y < 0 ? 0 : 1;
  // 				break;

  // 			case MirroredRepeatWrapping:
  // 				if (Math.abs(Math.floor(uv.y) % 2) === 1) {
  // 					uv.y = Math.ceil(uv.y) - uv.y;
  // 				} else {
  // 					uv.y = uv.y - Math.floor(uv.y);
  // 				}
  // 				break;
  // 		}
  // 	}

  // 	if (this.flipY) {
  // 		uv.y = 1 - uv.y;
  // 	}

  // 	return uv;
  // }
});
Object.defineProperty(BaseTexture.prototype, 'needsUpdate', {
  set: function set(value) {
    if (value === true) this.version++;
  }
});
EventTarget.mixin(BaseTexture);

;// ./src/textures/Texture.js







// Tiny.TextureCache = {};
// Tiny.FrameCache = {};
// Tiny.TextureCacheIdGenerator = 0;
// Tiny.TextureSilentFail = false;

var _Texture = function Texture(base, frame, crop, trim) {
  // console.log(this);
  this.noFrame = false;

  // this.resolution = 1;

  // this.hasLoaded = false;

  if (!frame) {
    this.noFrame = true;
    frame = new Rectangle(0, 0, 1, 1);
  }
  if (typeof base == 'string') {
    var key = base;
    base = Cache.image[key];
    if (!base) throw new Error('Cache Error: image ' + key + ' does`t found in cache');
    Cache.texture[key] = this;
    this.key = key;
  } else if (base instanceof _Texture) {
    base = base.base;
  } else if (!(base instanceof BaseTexture)) {
    base = new BaseTexture(base);
  }
  this.base = base;
  this.frame = frame;
  this.trim = trim;
  this.valid = false;
  this.matrixAutoUpdate = false;
  // this.matrix = new Mat3();
  this.matrix = null;
  this.center = new Vec2(0, 0);
  this._uvs = null;
  this.width = 0;
  this.height = 0;
  this.rotation = 0;
  this.crop = crop || new Rectangle(0, 0, 1, 1);
  if (base.valid) {
    this.onBaseUpdate();
  } else {
    base.once('load', this.onBaseUpdate, this);
  }

  // if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) {
  //     this.onSourceLoaded();
  // } else {
  //     var scope = this;
  //     this.source.onload = function () {
  //         scope.onSourceLoaded();
  //     };
  // }
};
Object.assign(_Texture.prototype, {
  constructor: _Texture,
  updateMatrix: function updateMatrix() {
    // return;
    // console.log('dasdasd');
    // if (!this._uvs) this._uvs = new TextureUvs();

    if (!this.matrix) this.matrix = new Mat3();
    var frame = this.crop;
    var tw = this.base.width;
    var th = this.base.height;
    var x0 = frame.x / tw;
    var y0 = frame.y / th;

    // var x1 = (frame.x + frame.width) / tw;
    // var y1 = frame.y / th;

    // var x2 = (frame.x + frame.width) / tw;
    // var y2 = (frame.y + frame.height) / th;

    // var x3 = frame.x / tw;
    // var y3 = (frame.y + frame.height) / th;

    var c = Math.cos(this.rotation);
    var s = Math.sin(this.rotation);
    var cx = this.center.x;
    var cy = this.center.y;

    // if (this.rotation !== 0) {
    // const w2 = frame.width / 2 / tw;
    // const h2 = frame.height / 2 / th;

    // const cX = (frame.x / tw) + w2;
    // const cY = (frame.y / th) + h2;

    // console.log(w2, h2)
    // console.log(cX, cY)

    // cx = 1- cX;
    // cy =  1- cY;
    // }

    var sx = frame.width / tw;
    var sy = frame.height / th;
    if (this.base.flipY) {
      // cy = 1 - cy;
      y0 = 1 - y0 - sy;
    }
    x0 -= (1 - sx) * cx;
    y0 -= (1 - sy) * cy;

    // if (this.base.id == 2) {
    //     console.log(y0);
    // }

    this.matrix.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + x0, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + y0, 0, 0, 1);
    var elements = this.matrix.elements;
    if (this.base.flipY) {
      // cy = 1 - cy;
      y0 = 1 - y0 - sy;
    }
    var x1 = x0 + elements[0];
    var y1 = y0;
    var x2 = x0 + elements[0];
    var y2 = y0 + elements[4];
    var x3 = x0;
    var y3 = y0 + elements[4];
    if (!this._uvs) this._uvs = new Uint32Array(4);
    this._uvs[0] = (Math.round(y0 * 65535) & 0xffff) << 16 | Math.round(x0 * 65535) & 0xffff;
    this._uvs[1] = (Math.round(y1 * 65535) & 0xffff) << 16 | Math.round(x1 * 65535) & 0xffff;
    this._uvs[2] = (Math.round(y2 * 65535) & 0xffff) << 16 | Math.round(x2 * 65535) & 0xffff;
    this._uvs[3] = (Math.round(y3 * 65535) & 0xffff) << 16 | Math.round(x3 * 65535) & 0xffff;

    // console.log(y0, this.matrix.elements[7]);
    // this.matrix.setUvTransform(0.5, 0, 0.5, 1, 0, 0.5, 0.5);

    // setUvTransform: function ( tx, ty, sx, sy, rotation, cx, cy ) {

    // console.log(x0, y0)
    // console.log(x1, y1)
    // console.log(x2, y2)
    // console.log(x3, y3)

    // },

    // this.matrix.set(1, 0.5, 0, 0, 1, 0, 0, 0, 1);
    // this.matrix.set(
    //     this._uvs.x0, this._uvs.x1, this._uvs.x2,
    //     this._uvs.y1, this._uvs.y0, this._uvs.y2,
    //     0, 0, 1
    // );

    // this.matrix.setUvTransform(
    //     this.offset.x,
    //     this.offset.y,
    //     this.repeat.x,
    //     this.repeat.y,
    //     this.rotation,
    //     this.center.x,
    //     this.center.y
    // );
  },
  onBaseUpdate: function onBaseUpdate() {
    // this.hasLoaded = true;
    // this.width = this.source.naturalWidth || this.source.width;
    // this.height = this.source.naturalHeight || this.source.height;

    var baseTexture = this.base;
    if (this.noFrame) this.frame = new Rectangle(0, 0, baseTexture.width, baseTexture.height);
    this.setFrame(this.frame);
  },
  addToCache: function addToCache(key, frameName) {
    this.key = this.key || key;
    this.frame.name = this.frame.name || frameName;
    if (this.frame.name) key += '.' + this.frame.name;
    Cache.texture[key] = this;
  },
  destroy: function destroy(destroyBase) {
    this.base.off('load', this.onBaseUpdate, this);
    if (destroyBase) this.base.destroy();
    if (this.key) {
      delete Cache.texture[this.key];
    }
    // this.source = null;
    this.valid = false;
  },
  setFrame: function setFrame(frame) {
    this.noFrame = false;
    this.frame = frame;
    this.width = frame.width;
    this.height = frame.height;
    this.crop.x = frame.x;
    this.crop.y = frame.y;
    this.crop.width = frame.width;
    this.crop.height = frame.height;
    if (!this.trim && (frame.x + frame.width > this.base.width || frame.y + frame.height > this.base.height)) {
      // throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);

      this.valid = false;
      return;
    }
    this.valid = frame && frame.width && frame.height && this.base.valid;
    if (this.trim) {
      this.width = this.trim.width;
      this.height = this.trim.height;
      this.frame.width = this.trim.width;
      this.frame.height = this.trim.height;
    }
    if (this.valid) this.updateMatrix();
  }

  // _updateUvs: function () {
  //     if (!this._uvs) this._uvs = new TextureUvs();

  //     var frame = this.crop;
  //     var tw = this.base.width;
  //     var th = this.base.height;

  //     this._uvs.x0 = frame.x / tw;
  //     this._uvs.y0 = frame.y / th;

  //     this._uvs.x1 = (frame.x + frame.width) / tw;
  //     this._uvs.y1 = frame.y / th;

  //     this._uvs.x2 = (frame.x + frame.width) / tw;
  //     this._uvs.y2 = (frame.y + frame.height) / th;

  //     this._uvs.x3 = frame.x / tw;
  //     this._uvs.y3 = (frame.y + frame.height) / th;

  //     this.uvsUint32 = [];

  //     this.uvsUint32[0] =
  //         ((Math.round(this._uvs.y0 * 65535) & 0xffff) << 16) | (Math.round(this._uvs.x0 * 65535) & 0xffff);
  //     this.uvsUint32[1] =
  //         ((Math.round(this._uvs.y1 * 65535) & 0xffff) << 16) | (Math.round(this._uvs.x1 * 65535) & 0xffff);
  //     this.uvsUint32[2] =
  //         ((Math.round(this._uvs.y2 * 65535) & 0xffff) << 16) | (Math.round(this._uvs.x2 * 65535) & 0xffff);
  //     this.uvsUint32[3] =
  //         ((Math.round(this._uvs.y3 * 65535) & 0xffff) << 16) | (Math.round(this._uvs.x3 * 65535) & 0xffff);
  // }
});

// Texture.fromImage = function(key, imageUrl, crossorigin)
// {
//     var texture = TextureCache[key];

//     if(!texture)
//     {
//         texture = new Texture(Tiny.BaseTexture.fromImage(key, imageUrl, crossorigin));
//         texture.key = key
//         TextureCache[key] = texture;
//     }

//     return texture;
// };

// Texture.fromFrame = function(frameId)
// {
//     var texture = TextureCache[frameId];
//     if(!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ');
//     return texture;
// };

// Texture.fromCanvas = function (canvas) {
// if(!canvas._tinyId)
// {
//     canvas._tinyId = '_from_canvas_' + TextureCacheIdGenerator++;
// }

// var texture = Cache.texture[canvas._tinyId];

// if(!texture)
// {
//     texture = new Texture( canvas );
//     Cache.texture[canvas._tinyId] = texture;
// }

// return texture;
// return new Texture(canvas);
// };

// Texture.addTextureToCache = function(texture, id)
// {
//     TextureCache[id] = texture;
// };

// Texture.removeTextureFromCache = function(id)
// {
//     var texture = TextureCache[id];
//     delete TextureCache[id];
//     delete Tiny.BaseTextureCache[id];
//     return texture;
// };


;// ./src/loaders/ImageLoader.js



var ImageLoader = function ImageLoader(resource, cb) {
  // if (Cache["image"][resource.key]) return cb(resource, Cache["image"][resource.key]);

  var image = new Image();
  image.addEventListener('load', function () {
    var texture = new _Texture(image);
    Cache.texture[resource.key] = texture;
    Cache.image[resource.key] = texture.base;
    cb(resource, texture.base);
  });

  // image.addEventListener('error', function()
  // {
  //     cb(resource, image);
  // })

  image.src = resource.src;
};
LoadingManager.image = ImageLoader;
LoadingManager.prototype.image = function (key, source) {
  this.list.push({
    src: source,
    key: key,
    type: 'image'
  });
};

;// ./src/loaders/AtlasLoader.js




var AtlasLoader = function AtlasLoader(resource, cb) {
  var key = resource.key;
  ImageLoader(resource, function (resource, base) {
    for (var i = 0; i < resource.data.length; i++) {
      var uuid = key + '.' + resource.data[i].name;
      var texture = new _Texture(base, resource.data[i]);
      texture.key = key;
      Cache.texture[uuid] = texture;
    }
    cb();
  });
};
LoadingManager.atlas = AtlasLoader;
LoadingManager.prototype.atlas = function (key, source, atlasData) {
  this.list.push({
    src: source,
    key: key,
    data: atlasData,
    type: 'atlas'
  });
};

;// ./src/loaders/SpritesheetLoader.js




var SpritesheetLoader = function SpritesheetLoader(resource, cb) {
  var key = resource.key;
  ImageLoader(resource, function (resource, base) {
    var lastFrame, uuid, texture;
    if (resource.data) {
      var frameData = resource.data;
      lastFrame = frameData.length - 1;
      for (var i = 0; i <= lastFrame; i++) {
        uuid = key + '.' + i;
        texture = new _Texture(base, {
          name: i,
          x: Math.floor(frameData[i].x),
          y: Math.floor(frameData[i].y),
          width: Math.floor(frameData[i].width),
          height: Math.floor(frameData[i].height),
          duration: frameData[i].duration
        });
        texture.key = key;
        texture.lastFrame = lastFrame;
        Cache.texture[uuid] = texture;
      }
    } else {
      var width = base.width;
      var height = base.height;
      var frameWidth = resource.width;
      var frameHeight = resource.height;
      if (!frameWidth) frameWidth = Math.floor(width / (resource.cols || 1));
      if (!frameHeight) frameHeight = Math.floor(height / (resource.rows || 1));
      var cols = Math.floor(width / frameWidth);
      var rows = Math.floor(height / frameHeight);
      var total = cols * rows;
      if (total === 0) {
        return cb();
      }
      if (resource.total) total = Math.min(total, resource.total);
      var x = 0;
      var y = 0;
      lastFrame = total - 1;
      for (var i = 0; i < total; i++) {
        uuid = key + '.' + i;
        texture = new _Texture(base, {
          name: i,
          x: x,
          y: y,
          width: frameWidth,
          height: frameHeight,
          duration: resource.duration
        });
        texture.key = key;
        texture.lastFrame = lastFrame;
        Cache.texture[uuid] = texture;
        x += frameWidth;
        if (x + frameWidth > width) {
          x = 0;
          y += frameHeight;
        }
      }
    }
    cb();
  });
};
LoadingManager.spritesheet = SpritesheetLoader;
LoadingManager.prototype.spritesheet = function (key, source, arg_1, arg_2, totalFrames, duration) {
  var res = {
    src: source,
    key: key,
    type: 'spritesheet'
  };
  if (typeof arg_1 == 'number') {
    res.width = arg_1;
    res.height = arg_2;
    res.total = totalFrames;
    res.duration = duration;
  } else if (arg_1.length > 0) {
    res.data = arg_1;
  }
  this.list.push(res);
};

;// ./src/app/Input.js



var listeningToTouchEvents;
var _Input = function Input(game) {
  this.game = game;
  var view = this.domElement = game.inputView;
  this.bounds = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  this.candidates = [];
  this.list = [];
  this.lastMove = null;
  this.isDown = false;
  this.downHandler = this.downHandler.bind(this);
  this.moveHandler = this.moveHandler.bind(this);
  this.upHandler = this.upHandler.bind(this);
  // this.clickHandler.bind(this);

  view.addEventListener('touchstart', this.downHandler);
  view.addEventListener('touchmove', this.moveHandler);
  view.addEventListener('touchend', this.upHandler);
  view.addEventListener('touchcancel', this.upHandler);

  // view.addEventListener('click', this.clickHandler);

  view.addEventListener('mousedown', this.downHandler);
  view.addEventListener('mousemove', this.moveHandler);
  view.addEventListener('mouseup', this.upHandler);
  for (var i = 0; i < _Input.systems.length; i++) {
    _Input.systems[i].init.call(this);
  }
  this.updateBounds();
};
_Input.prototype = {
  add: function add(object, options) {
    object.inputEnabled = true;
    options = options || {};
    options.system = this;
    object.input = options;
    EventTarget.mixin(object.input);
    this.list.push(object);
  },
  remove: function remove(object) {
    var index = this.list.indexOf(object);
    if (index > -1) {
      var removed = this.list[index];
      removed.input = null;
      removed.inputEnabled = false;
      this.list.splice(index, 1);
      return removed;
    }
  },
  inputHandler: function inputHandler(name, event) {
    // console.log(name)
    var coords = this.getCoords(event);
    if (coords !== null) {
      if (name != 'move') {
        this.candidates.length = 0;
        for (var i = 0; i < _Input.systems.length; i++) {
          _Input.systems[i].preHandle.call(this, coords.x, coords.y);
        }
        var isGood, obj;
        for (var t = 0; t < this.list.length; t++) {
          obj = this.list[t];
          if (!obj.inputEnabled || !obj.parent) continue;
          if (obj.input.checkBounds) isGood = obj.input.checkBounds.call(this, obj, coords.x, coords.y);else isGood = _Input.checkBounds.call(this, obj, coords.x, coords.y);
          if (isGood) this.candidates.push(obj);
        }

        //var i = this.candidates.length

        for (var i = this.candidates.length - 1; i >= 0; i--) {
          obj = this.candidates[i];
          obj.input['last_' + name] = {
            x: coords.x,
            y: coords.y
          };
          obj.input.emit(name, {
            x: coords.x,
            y: coords.y
          });
          if (name == 'up') {
            var point = obj.input['last_down'];
            if (point && _Math.distance(point.x, point.y, coords.x, coords.y) < 30) obj.input.emit('click', {
              x: coords.x,
              y: coords.y
            });
          }
          if (!obj.input.transparent) {
            break;
          }
        }

        // if (i > 0) {
        //     var obj = this.candidates[i - 1]
        //     obj.input["last_" + name] = {x: coords.x, y: coords.y}

        //     obj.input.emit(name, {x: coords.x, y: coords.y})

        //     if (name == "up") {
        //         var point = obj.input["last_down"]
        //         if (point && _Math.distance(point.x, point.y, coords.x, coords.y) < 30)
        //             obj.input.emit("click", {x: coords.x, y: coords.y})
        //     }
        // }
      }
      this.emit(name, {
        x: coords.x,
        y: coords.y
      });
    }
  },
  moveHandler: function moveHandler(event) {
    this.lastMove = event;
    this.inputHandler('move', event);
  },
  upHandler: function upHandler(event) {
    this.isDown = false;
    this.inputHandler('up', this.lastMove);
  },
  downHandler: function downHandler(event) {
    this.isDown = true;
    this.lastMove = event;
    this.inputHandler('down', event);
  },
  clickHandler: function clickHandler(event) {
    this.inputHandler('click', event);
  },
  getCoords: function getCoords(event) {
    var coords = null;
    if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
      listeningToTouchEvents = true;
      if (event.touches.length > 0) {
        coords = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      } else if (event.clientX && event.clientY) {
        coords = {
          x: event.clientX,
          y: event.clientY
        };
      } else {
        // listeningToTouchEvents = false;
      }
    } else {
      // Mouse event
      coords = {
        x: event.clientX,
        y: event.clientY
      };
    }
    if (listeningToTouchEvents && event instanceof MouseEvent || coords === null) return null;
    coords = {
      x: coords.x - this.bounds.x,
      y: coords.y - this.bounds.y
    };
    return coords;
  },
  updateBounds: function updateBounds() {
    var bounds = this.bounds;
    var clientRect = this.domElement.getBoundingClientRect();
    bounds.x = clientRect.left;
    bounds.y = clientRect.top;
    bounds.width = clientRect.width;
    bounds.height = clientRect.height;
  },
  destroy: function destroy() {
    var view = this.domElement;
    view.removeEventListener('touchstart', this.downHandler);
    view.removeEventListener('touchmove', this.moveHandler);
    view.removeEventListener('touchend', this.upHandler);
    view.removeEventListener('touchcancel', this.upHandler);

    // view.removeEventListener('click', this.clickHandler);

    view.removeEventListener('mousedown', this.downHandler);
    view.removeEventListener('mousemove', this.moveHandler);
    view.removeEventListener('mouseup', this.upHandler);
  }
};
_Input.checkBounds = function (obj, x, y) {
  if (obj.worldVisible) {
    if (obj.getBounds().contains(x, y)) {
      return true;
    }
  }

  // if (obj.children && obj.children.length > 0)
  // {
  //     for (var t = 0; t < obj.children.length; t++)
  //     {
  //         _checkOnActiveObjects(obj.children[t], x, y);
  //     }
  // }
};
EventTarget.mixin(_Input);
_Input.systems = [];
registerSystem('input', _Input);

;// ./src/app/Timer.js

var Timer_noop = function noop() {};
var Timer = function Timer(autoStart, autoRemove, game, cb, ctx, delay, loop, n, oncomplete) {
  this.game = game;
  this.cb = cb || Timer_noop;
  this.ctx = ctx || this;
  this.delay = delay == undefined ? 1000 : delay;
  this.loop = loop;
  this.count = n || 0;
  this.repeat = this.count > 0;
  this.running = !!autoStart;
  this._lastFrame = 0;
  this.autoRemove = autoRemove;
  this.onComplete = oncomplete || Timer_noop;
};
Timer.prototype = {
  start: function start() {
    this.running = true;
  },
  pause: function pause() {
    this.running = false;
  },
  stop: function stop() {
    this.running = false;
    this._lastFrame = 0;
  },
  update: function update(deltaTime) {
    if (this.running) {
      this._lastFrame += deltaTime;
      if (this._lastFrame >= this.delay) {
        this.cb.call(this.ctx);
        this._lastFrame = 0;
        if (this.repeat) {
          this.count--;
          if (this.count === 0) {
            this.running = false;
            this.autoRemove && this.game.timer.remove(this);
            this.onComplete();
          }
        } else if (!this.loop) {
          this.running = false;
          this.autoRemove && this.game.timer.remove(this);
        }
      }
    }
  }
};
var TimerCreator = function TimerCreator(game) {
  this.game = game;
  this.list = [];
  this.autoStart = true;
  this.autoRemove = true;
};
TimerCreator.prototype = {
  update: function update(delta) {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].update(delta);
    }
  },
  removeAll: function removeAll() {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].stop();
    }
    this.list = [];
  },
  remove: function remove(tm) {
    var indexOf = this.list.indexOf(tm);
    if (indexOf > -1) {
      tm.stop();
      this.list.splice(indexOf, 1);
    }
  },
  add: function add(delay, cb, ctx, autostart, autoremove) {
    autostart = autostart != undefined ? autostart : this.autoStart;
    autoremove = autoremove != undefined ? autoremove : this.autoRemove;
    var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay);
    this.list.push(timer);
    return timer;
  },
  loop: function loop(delay, cb, ctx, autostart, autoremove) {
    autostart = autostart != undefined ? autostart : this.autoStart;
    autoremove = autoremove != undefined ? autoremove : this.autoRemove;
    var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay, true);
    this.list.push(timer);
    return timer;
  },
  repeat: function repeat(delay, n, cb, ctx, autostart, autoremove, complete) {
    autostart = autostart != undefined ? autostart : this.autoStart;
    autoremove = autoremove != undefined ? autoremove : this.autoRemove;
    var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay, false, n, complete);
    this.list.push(timer);
    return timer;
  },
  destroy: function destroy() {
    this.removeAll();
  }
};
registerSystem('timer', TimerCreator);

;// ./src/app/Tween.js


/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

var _Group = function _Group() {
  this._tweens = {};
  this._tweensAddedDuringUpdate = {};
};
_Group.prototype = {
  getAll: function getAll() {
    return Object.keys(this._tweens).map(function (tweenId) {
      return this._tweens[tweenId];
    }.bind(this));
  },
  removeAll: function removeAll() {
    this._tweens = {};
  },
  add: function add(tween) {
    var id = tween.getId();
    this._tweens[id] = tween;
    this._tweensAddedDuringUpdate[id] = tween;
  },
  remove: function remove(tween) {
    var id = tween.getId();
    delete this._tweens[id];
    delete this._tweensAddedDuringUpdate[id];
  },
  update: function update(delta, preserve) {
    var tweenIds = Object.keys(this._tweens);
    if (tweenIds.length === 0) {
      return false;
    }

    // time = time !== undefined ? time : TWEEN.now();

    // Tweens are updated in "batches". If you add a new tween during an
    // update, then the new tween will be updated in the next batch.
    // If you remove a tween during an update, it may or may not be updated.
    // However, if the removed tween was added during the current batch,
    // then it will not be updated.
    while (tweenIds.length > 0) {
      this._tweensAddedDuringUpdate = {};
      for (var i = 0; i < tweenIds.length; i++) {
        var tween = this._tweens[tweenIds[i]];
        if (tween && tween.update(delta) === false) {
          tween._isPlaying = false;
          if (!preserve) {
            delete this._tweens[tweenIds[i]];
          }
        }
      }
      tweenIds = Object.keys(this._tweensAddedDuringUpdate);
    }
    return true;
  }
};
var TWEEN = new _Group();
TWEEN.Group = _Group;
TWEEN._nextId = 0;
TWEEN.nextId = function () {
  return TWEEN._nextId++;
};

// // Include a performance.now polyfill.
// // In node.js, use process.hrtime.
// if (typeof (self) === 'undefined' && typeof (process) !== 'undefined' && process.hrtime) {
//  TWEEN.now = function () {
//      var time = process.hrtime();

//      // Convert [seconds, nanoseconds] to milliseconds.
//      return time[0] * 1000 + time[1] / 1000000;
//  };
// }
// // In a browser, use self.performance.now if it is available.
// else if (typeof (self) !== 'undefined' &&
//          self.performance !== undefined &&
//       self.performance.now !== undefined) {
//  // This must be bound, because directly assigning this function
//  // leads to an invocation exception in Chrome.
//  TWEEN.now = self.performance.now.bind(self.performance);
// }
// // Use Date.now if it is available.
// else if (Date.now !== undefined) {
//  TWEEN.now = Date.now;
// }
// // Otherwise, use 'new Date().getTime()'.
// else {
//  TWEEN.now = function () {
//      return new Date().getTime();
//  };
// }

var Tween = function Tween(object, group) {
  this._isPaused = false;
  // this._pauseStart = null;
  this._object = object;
  this._valuesStart = {};
  this._valuesEnd = {};
  this._valuesStartRepeat = {};
  this._duration = 1000;
  this._repeat = 0;
  this._repeatDelayTime = undefined;
  this._yoyo = false;
  this._isPlaying = false;
  this._reversed = false;
  this._delayTime = 0;
  this._startTime = null;
  this._time = 0;
  this._easingFunction = Easing.Linear.None;
  this._interpolationFunction = Interpolation.Linear;
  this._chainedTweens = [];
  this._onStartCallback = null;
  this._onStartCallbackFired = false;
  this._onUpdateCallback = null;
  this._onRepeatCallback = null;
  this._onCompleteCallback = null;
  this._onStopCallback = null;
  this._group = group || TWEEN;
  this._id = TWEEN.nextId();
};
Tween.prototype = {
  getId: function getId() {
    return this._id;
  },
  isPlaying: function isPlaying() {
    return this._isPlaying;
  },
  isPaused: function isPaused() {
    return this._isPaused;
  },
  to: function to(properties, duration) {
    this._valuesEnd = Object.create(properties);
    if (duration !== undefined) {
      this._duration = duration;
    }
    return this;
  },
  duration: function duration(d) {
    this._duration = d;
    return this;
  },
  start: function start(reset) {
    this._group.add(this);
    this._isPlaying = true;
    this._isPaused = false;
    this._time = 0;
    this._onStartCallbackFired = false;
    this._startTime = this._delayTime;
    for (var property in this._valuesEnd) {
      // Check if an Array was provided as property value
      if (this._valuesEnd[property] instanceof Array) {
        if (this._valuesEnd[property].length === 0) {
          continue;
        }

        // Create a local copy of the Array with the start value at the front
        this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
      }

      // If `to()` specifies a property that doesn't exist in the source object,
      // we should not set that property in the object
      if (this._object[property] === undefined) {
        continue;
      }

      // Save the starting value, only once - if reset set to false.
      if (reset == true || typeof this._valuesStart[property] === 'undefined') {
        this._valuesStart[property] = this._object[property];
      }
      if (this._valuesStart[property] instanceof Array === false) {
        this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
      }
      this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
    }
    return this;
  },
  stop: function stop() {
    if (!this._isPlaying) {
      return this;
    }
    this._group.remove(this);
    this._isPlaying = false;
    this._isPaused = false;
    if (this._onStopCallback !== null) {
      this._onStopCallback(this._object);
    }
    this.stopChainedTweens();
    return this;
  },
  end: function end() {
    this.update(Infinity);
    return this;
  },
  pause: function pause() {
    if (this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = true;

    // this._pauseStart = time === undefined ? TWEEN.now() : time;

    this._group.remove(this);
    return this;
  },
  resume: function resume() {
    if (!this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = false;

    // this._startTime += (time === undefined ? TWEEN.now() : time)
    //  - this._pauseStart;

    // this._pauseStart = 0;

    this._group.add(this);
    return this;
  },
  stopChainedTweens: function stopChainedTweens() {
    for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
      this._chainedTweens[i].stop();
    }
  },
  group: function group(_group) {
    this._group = _group;
    return this;
  },
  delay: function delay(amount) {
    this._delayTime = amount;
    return this;
  },
  repeat: function repeat(times) {
    this._repeat = times;
    return this;
  },
  repeatDelay: function repeatDelay(amount) {
    this._repeatDelayTime = amount;
    return this;
  },
  yoyo: function yoyo(_yoyo) {
    this._yoyo = _yoyo;
    return this;
  },
  easing: function easing(easingFunction) {
    this._easingFunction = easingFunction;
    return this;
  },
  interpolation: function interpolation(interpolationFunction) {
    this._interpolationFunction = interpolationFunction;
    return this;
  },
  chain: function chain() {
    this._chainedTweens = arguments;
    return this;
  },
  onStart: function onStart(callback) {
    this._onStartCallback = callback;
    return this;
  },
  onUpdate: function onUpdate(callback) {
    this._onUpdateCallback = callback;
    return this;
  },
  onRepeat: function onRepeat(callback) {
    this._onRepeatCallback = callback;
    return this;
  },
  onComplete: function onComplete(callback) {
    this._onCompleteCallback = callback;
    return this;
  },
  onStop: function onStop(callback) {
    this._onStopCallback = callback;
    return this;
  },
  update: function update(delta) {
    var property;
    var elapsed;
    var value;
    this._time += delta;
    if (this._time < this._startTime) {
      return true;
    }
    if (this._onStartCallbackFired === false) {
      if (this._onStartCallback !== null) {
        this._onStartCallback(this._object);
      }
      this._onStartCallbackFired = true;
    }
    elapsed = (this._time - this._startTime) / this._duration;
    elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
    value = this._easingFunction(elapsed);
    for (property in this._valuesEnd) {
      // Don't update properties that do not exist in the source object
      if (this._valuesStart[property] === undefined) {
        continue;
      }
      var start = this._valuesStart[property] || 0;
      var end = this._valuesEnd[property];
      if (end instanceof Array) {
        this._object[property] = this._interpolationFunction(end, value);
      } else {
        // Parses relative end values with start as base (e.g.: +10, -3)
        if (typeof end === 'string') {
          if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            end = start + parseFloat(end);
          } else {
            end = parseFloat(end);
          }
        }

        // Protect against non numeric properties.
        if (typeof end === 'number') {
          this._object[property] = start + (end - start) * value;
        }
      }
    }
    if (this._onUpdateCallback !== null) {
      this._onUpdateCallback(this._object, elapsed);
    }
    if (elapsed === 1) {
      this._time = 0;
      if (this._repeat > 0) {
        if (isFinite(this._repeat)) {
          this._repeat--;
        }

        // Reassign starting values, restart by making startTime = now
        for (property in this._valuesStartRepeat) {
          if (typeof this._valuesEnd[property] === 'string') {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
          }
          if (this._yoyo) {
            var tmp = this._valuesStartRepeat[property];
            this._valuesStartRepeat[property] = this._valuesEnd[property];
            this._valuesEnd[property] = tmp;
          }
          this._valuesStart[property] = this._valuesStartRepeat[property];
        }
        if (this._yoyo) {
          this._reversed = !this._reversed;
        }
        if (this._repeatDelayTime !== undefined) {
          this._startTime = this._repeatDelayTime;
        } else {
          this._startTime = this._delayTime;
        }
        if (this._onRepeatCallback !== null) {
          this._onRepeatCallback(this._object);
        }
        return true;
      } else {
        if (this._onCompleteCallback !== null) {
          this._onCompleteCallback(this._object);
        }
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
          // Make the chained tweens start exactly at the time they should,
          // even if the `update()` method was called way past the duration of the tween
          this._chainedTweens[i].start();
        }
        return false;
      }
    }
    return true;
  }
};
var Easing = {
  Linear: {
    None: function None(k) {
      return k;
    }
  },
  Quadratic: {
    In: function In(k) {
      return k * k;
    },
    Out: function Out(k) {
      return k * (2 - k);
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }
      return -0.5 * (--k * (k - 2) - 1);
    }
  },
  Cubic: {
    In: function In(k) {
      return k * k * k;
    },
    Out: function Out(k) {
      return --k * k * k + 1;
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k + 2);
    }
  },
  Quartic: {
    In: function In(k) {
      return k * k * k * k;
    },
    Out: function Out(k) {
      return 1 - --k * k * k * k;
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }
      return -0.5 * ((k -= 2) * k * k * k - 2);
    }
  },
  Quintic: {
    In: function In(k) {
      return k * k * k * k * k;
    },
    Out: function Out(k) {
      return --k * k * k * k * k + 1;
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }
  },
  Sinusoidal: {
    In: function In(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    Out: function Out(k) {
      return Math.sin(k * Math.PI / 2);
    },
    InOut: function InOut(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  },
  Exponential: {
    In: function In(k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    Out: function Out(k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    InOut: function InOut(k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }
  },
  Circular: {
    In: function In(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    Out: function Out(k) {
      return Math.sqrt(1 - --k * k);
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  },
  Elastic: {
    In: function In(k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    },
    Out: function Out(k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function InOut(k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      k *= 2;
      if (k < 1) {
        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
      }
      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    }
  },
  Back: {
    In: function In(k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    Out: function Out(k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    InOut: function InOut(k) {
      var s = 1.70158 * 1.525;
      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
  },
  Bounce: {
    In: function In(k) {
      return 1 - Easing.Bounce.Out(1 - k);
    },
    Out: function Out(k) {
      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    InOut: function InOut(k) {
      if (k < 0.5) {
        return Easing.Bounce.In(k * 2) * 0.5;
      }
      return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
    }
  }
};
var Interpolation = {
  Linear: function Linear(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.Linear;
    if (k < 0) {
      return fn(v[0], v[1], f);
    }
    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }
    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  },
  Bezier: function Bezier(v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = Interpolation.Utils.Bernstein;
    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }
    return b;
  },
  CatmullRom: function CatmullRom(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.CatmullRom;
    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }
      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }
      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }
      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  },
  Utils: {
    Linear: function Linear(p0, p1, t) {
      return (p1 - p0) * t + p0;
    },
    Bernstein: function Bernstein(n, i) {
      var fc = Interpolation.Utils.Factorial;
      return fc(n) / fc(i) / fc(n - i);
    },
    Factorial: function () {
      var a = [1];
      return function (n) {
        var s = 1;
        if (a[n]) {
          return a[n];
        }
        for (var i = n; i > 1; i--) {
          s *= i;
        }
        a[n] = s;
        return s;
      };
    }(),
    CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }
  }
};
var TweenManager = function TweenManager(game) {
  this.game = game;
  this.bufferList = [];
  this.group = new _Group();
};
TweenManager.prototype = {
  remove: function remove(tween) {
    this.group.remove(tween);
  },
  add: function add(obj) {
    return new Tween(obj, this.group);
  },
  pause: function pause() {
    this.bufferList.length = 0;
    for (var k in this.group._tweens) {
      this.bufferList.push(this.group._tweens[k]);
      this.group._tweens[k].pause();
    }
  },
  resume: function resume() {
    for (var i = 0; i < this.bufferList.length; i++) {
      this.bufferList[i].resume();
    }
    this.bufferList.length = 0;
  },
  update: function update(delta) {
    this.group.update(delta);
  },
  destroy: function destroy() {
    this.bufferList.length = 0;
    this.group.removeAll();
    this.group = null;
  }
};
registerSystem('tweens', TweenManager);

;// ./src/app.js











Tiny.App = App;
Tiny.RAF = RAF;
Tiny.registerSystem = registerSystem;
Tiny.systems = systems;
Tiny.TweenManager = TweenManager;
Tiny.Cache = Cache;
Tiny.Loader = LoadingManager;
Tiny.Easing = Easing;
Tiny.Interpolation = Interpolation;
Tiny.Input = _Input;
Tiny.Timer = Timer;
;// ./src/objects/Entity2D.js



var pi2 = Math.PI * 2;
var Entity2D = function Entity2D() {
  this.position = new Vec2(0, 0);
  this.scale = new Vec2(1, 1);
  this.pivot = new Vec2(0, 0);
  this.rotation = 0;
  this.alpha = 1;
  this.visible = true;
  this.renderable = false;
  this.parent = null;
  this.worldAlpha = 1;
  this.worldTransform = new Mat3();
  this._sr = 0;
  this._cr = 1;
  this._cacheAsBitmap = false;
};
Entity2D.prototype.constructor = Entity2D;
Entity2D.prototype.destroy = function () {
  if (this.parent) this.parent.remove(this);
  this.parent = null;
  this.worldTransform = null;
  this.visible = false;
  this.renderable = false;
  this._destroyCachedSprite();
};
Object.defineProperty(Entity2D.prototype, 'worldVisible', {
  get: function get() {
    var item = this;
    do {
      if (!item.visible) return false;
      item = item.parent;
    } while (item);
    return true;
  }
});
Object.defineProperty(Entity2D.prototype, 'cacheAsBitmap', {
  get: function get() {
    return this._cacheAsBitmap;
  },
  set: function set(value) {
    if (this._cacheAsBitmap === value) return;
    if (value) {
      this._generateCachedSprite();
    } else {
      this._destroyCachedSprite();
    }
    this._cacheAsBitmap = value;
  }
});
Entity2D.prototype.updateTransform = function () {
  if (!this.parent) {
    return;
  }

  // create some matrix refs for easy access
  var pt = this.parent.worldTransform;
  var wt = this.worldTransform;

  // temporary matrix variables
  var a, b, c, d, tx, ty;

  // so if rotation is between 0 then we can simplify the multiplication process..
  if (this.rotation % pi2) {
    // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
    if (this.rotation !== this.rotationCache) {
      this.rotationCache = this.rotation;
      this._sr = Math.sin(this.rotation);
      this._cr = Math.cos(this.rotation);
    }

    // get the matrix values of the displayobject based on its transform properties..
    a = this._cr * this.scale.x;
    b = this._sr * this.scale.x;
    c = -this._sr * this.scale.y;
    d = this._cr * this.scale.y;
    tx = this.position.x;
    ty = this.position.y;

    // check for pivot.. not often used so geared towards that fact!
    if (this.pivot.x || this.pivot.y) {
      tx -= this.pivot.x * a + this.pivot.y * c;
      ty -= this.pivot.x * b + this.pivot.y * d;
    }

    // concat the parent matrix with the objects transform.
    wt.a = a * pt.a + b * pt.c;
    wt.b = a * pt.b + b * pt.d;
    wt.c = c * pt.a + d * pt.c;
    wt.d = c * pt.b + d * pt.d;
    wt.tx = tx * pt.a + ty * pt.c + pt.tx;
    wt.ty = tx * pt.b + ty * pt.d + pt.ty;
  } else {
    // lets do the fast version as we know there is no rotation..
    a = this.scale.x;
    d = this.scale.y;
    tx = this.position.x - this.pivot.x * a;
    ty = this.position.y - this.pivot.y * d;
    wt.a = a * pt.a;
    wt.b = a * pt.b;
    wt.c = d * pt.c;
    wt.d = d * pt.d;
    wt.tx = tx * pt.a + ty * pt.c + pt.tx;
    wt.ty = tx * pt.b + ty * pt.d + pt.ty;
  }

  // multiply the alphas..
  this.worldAlpha = this.alpha * this.parent.worldAlpha;
};

// performance increase to avoid using call.. (10x faster)
Entity2D.prototype.displayObjectUpdateTransform = Entity2D.prototype.updateTransform;
Entity2D.prototype.getBounds = function (matrix) {
  // matrix = matrix;//just to get passed js hinting (and preserve inheritance)
  return EmptyRectangle;
};
Entity2D.prototype.getLocalBounds = function () {
  return this.getBounds(identityMatrix);
};
Entity2D.prototype.generateTexture = function (resolution, renderer) {
  var bounds = this.getLocalBounds();
  var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0, renderer, resolution);
  Entity2D._tempMatrix.tx = -bounds.x;
  Entity2D._tempMatrix.ty = -bounds.y;
  renderTexture.render(this, Entity2D._tempMatrix);
  return renderTexture;
};
Entity2D.prototype.updateCache = function () {
  this._generateCachedSprite();
};
Entity2D.prototype.toGlobal = function (position) {
  // don't need to u[date the lot
  this.displayObjectUpdateTransform();
  return this.worldTransform.apply(position);
};
Entity2D.prototype.toLocal = function (position, from) {
  if (from) {
    position = from.toGlobal(position);
  }

  // don't need to u[date the lot
  this.displayObjectUpdateTransform();
  return this.worldTransform.applyInverse(position);
};
Entity2D.prototype._renderCachedSprite = function (renderSession) {
  this._cachedSprite.worldAlpha = this.worldAlpha;
  if (renderSession.gl) {
    Tiny.Sprite.prototype.render.call(this._cachedSprite, renderSession);
  } else {
    Tiny.Sprite.prototype.renderCanvas.call(this._cachedSprite, renderSession);
  }
};
Entity2D.prototype._generateCachedSprite = function () {
  this._cachedSprite = null;
  this._cacheAsBitmap = false;
  var bounds = this.getLocalBounds();

  // if (!this._cachedSprite) {
  var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0); //, renderSession.renderer);

  this._cachedSprite = new Tiny.Sprite(renderTexture);
  this._cachedSprite.worldTransform = this.worldTransform;
  // } else {
  //     this._cachedSprite.texture.resize(bounds.width | 0, bounds.height | 0);
  // }

  var tempFilters = this._filters;
  this._filters = null;
  this._cachedSprite.filters = tempFilters;
  Entity2D._tempMatrix.tx = -bounds.x;
  Entity2D._tempMatrix.ty = -bounds.y;
  this._cachedSprite.texture.render(this, Entity2D._tempMatrix, true);
  this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
  this._cachedSprite.anchor.y = -(bounds.y / bounds.height);
  this._cacheAsBitmap = true;
};
Entity2D.prototype._destroyCachedSprite = function () {
  if (!this._cachedSprite) return;
  this._cachedSprite.texture.destroy(true);
  this._cachedSprite = null;
};
Entity2D.prototype.render = function (renderSession) {};
Object.defineProperty(Entity2D.prototype, 'x', {
  get: function get() {
    return this.position.x;
  },
  set: function set(value) {
    this.position.x = value;
  }
});
Object.defineProperty(Entity2D.prototype, 'y', {
  get: function get() {
    return this.position.y;
  },
  set: function set(value) {
    this.position.y = value;
  }
});
Entity2D._tempMatrix = new Mat3();

;// ./src/objects/Container.js


// var _addedEvent = { type: 'added' };
// var _removedEvent = { type: 'removed' };

function Container() {
  EventTarget.mixin(this);
  this.parent = null;
  this.children = [];
}
Object.assign(Container.prototype, {
  constructor: Container,
  isContainer: true,
  add: function add(object) {
    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        this.add(arguments[i]);
      }
      return this;
    }
    if (object === this) {
      // console.error("Tiny.Container.add: object can't be added as a child of itself.", object);
      return this;
    }
    if (object && object.isObject) {
      if (object.parent !== null) {
        object.parent.remove(object);
      }
      object.parent = this;
      this.children.push(object);

      // console.log(object);
      object.emit('added', this);
    } else {
      // console.error('Tiny.Container.add: object not an instance of Tiny.Object.', object);
    }
    return this;
  },
  remove: function remove(object) {
    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        this.remove(arguments[i]);
      }
      return this;
    }
    var index = this.children.indexOf(object);
    if (index !== -1) {
      object.parent = null;
      this.children.splice(index, 1);
      object.emit('removed');
    }
    return this;
  },
  // attach: function (object) {
  //     // adds object as a child of this, while maintaining the object's world transform

  //     this.updateWorldMatrix(true, false);

  //     _m1.getInverse(this.matrixWorld);

  //     if (object.parent !== null) {
  //         object.parent.updateWorldMatrix(true, false);

  //         _m1.multiply(object.parent.matrixWorld);
  //     }

  //     object.applyMatrix(_m1);

  //     object.updateWorldMatrix(false, false);

  //     this.add(object);

  //     return this;
  // },

  getObjectById: function getObjectById(id) {
    return this.getObjectByProperty('id', id);
  },
  getObjectByName: function getObjectByName(name) {
    return this.getObjectByProperty('name', name);
  },
  getObjectByProperty: function getObjectByProperty(name, value) {
    if (this[name] === value) return this;
    for (var i = 0, l = this.children.length; i < l; i++) {
      var child = this.children[i];
      var object = child.getObjectByProperty(name, value);
      if (object !== undefined) {
        return object;
      }
    }
    return undefined;
  },
  traverse: function traverse(callback) {
    callback(this);
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      children[i].traverse(callback);
    }
  },
  traverseVisible: function traverseVisible(callback) {
    if (this.visible === false) return;
    callback(this);
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      children[i].traverseVisible(callback);
    }
  },
  // traverseAncestors: function (callback) {
  //     var parent = this.parent;

  //     if (parent !== null) {
  //         callback(parent);

  //         parent.traverseAncestors(callback);
  //     }
  // },

  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(source) {
    for (var i = 0; i < source.children.length; i++) {
      var child = source.children[i];
      this.add(child.clone());
    }
    return this;
  },
  dispose: function dispose(options) {
    var i = this.children.length;
    while (i--) {
      this.children[i].parent = null;
      this.children[i].emit('removed', this);
      this.children[i].dispose(options);
    }
    this.children.length = 0;
    if (this.parent) {
      this.parent.remove(this);
      this.parent = null;
    }
  }
});

;// ./src/objects/Object2D.js


// import { Entity2D } from './Entity2D';



var Object2D_pi2 = Math.PI * 2;
var Object2D = function Object2D() {
  // Entity2D.call(this);
  Container.call(this);
  this.position = new Vec2(0, 0);
  this.scale = new Vec2(1, 1);
  this.pivot = new Vec2(0, 0);
  this.skew = new Vec2(0, 0);
  this.rotation = 0;
  this.opacity = 1;
  this.visible = true;
  this.renderable = false;
  // this.parent = null;
  this.worldOpacity = 1;
  this.worldTransform = new Mat3();
  this._cx = 1; // cos rotation + skewY;
  this._sx = 0; // sin rotation + skewY;
  this._cy = 0; // cos rotation + Math.PI/2 - skewX;
  this._sy = 1; // sin rotation + Math.PI/2 - skewX;
  this._cacheAsBitmap = false;

  // this.children = [];
  this._bounds = new Rectangle(0, 0, 1, 1);
  this._currentBounds = null;
  this._mask = null;
};
Object2D.prototype = Object.assign(Object.create(Container.prototype), {
  constructor: Object2D,
  isObject: true
});

// Object.defineProperty(Object2D.prototype, 'inputEnabled', {

//     get: function() {
//         return (this.input && this.input.enabled)
//     },

//     set: function(value) {
//         if (value) {
//             if (this.input === null) {
//                 this.input = {enabled: true, parent: this}
//                 Tiny.EventTarget.mixin(this.input)
//             } else
//                 this.input.enabled = true
//         } else {
//             this.input !== null && (this.input.enabled = false)
//         }
//     }

// });

Object.defineProperty(Object2D.prototype, 'width', {
  get: function get() {
    return this.scale.x * this.getLocalBounds().width;
  },
  set: function set(value) {
    var width = this.getLocalBounds().width;
    if (width !== 0) {
      this.scale.x = value / width;
    } else {
      this.scale.x = 1;
    }
    this._width = value;
  }
});
Object.defineProperty(Object2D.prototype, 'height', {
  get: function get() {
    return this.scale.y * this.getLocalBounds().height;
  },
  set: function set(value) {
    var height = this.getLocalBounds().height;
    if (height !== 0) {
      this.scale.y = value / height;
    } else {
      this.scale.y = 1;
    }
    this._height = value;
  }
});
Object.defineProperty(Object2D.prototype, 'mask', {
  get: function get() {
    return this._mask;
  },
  set: function set(value) {
    if (this._mask) this._mask.isMask = false;
    this._mask = value;
    if (this._mask) this._mask.isMask = true;
  }
});
Object2D.prototype.dispose = function (options) {
  Container.prototype.dispose.call(this, options);
  this.worldTransform = null;
  this.visible = false;
  this.renderable = false;
  this._destroyCachedSprite();

  // Entity2D.prototype.destroy.call(this);

  this._bounds = null;
  this._currentBounds = null;
  this._mask = null;
  this.emit('dispose');
  // if (this.input) this.input.system.remove(this);
};

// Object2D.prototype.add = function (child) {
//     return this.addChildAt(child, this.children.length);
// };

// Object2D.prototype.addChildAt = function (child, index) {
//     if (index >= 0 && index <= this.children.length) {
//         if (child.parent) {
//             child.parent.remove(child);
//         }

//         child.parent = this;

//         if (this.game) child.game = this.game;

//         this.children.splice(index, 0, child);

//         return child;
//     } else {
//         throw new Error(
//             child + 'addChildAt: The index ' + index + ' supplied is out of bounds ' + this.children.length
//         );
//     }
// };

// Object2D.prototype.swapChildren = function (child, child2) {
//     if (child === child2) {
//         return;
//     }

//     var index1 = this.getChildIndex(child);
//     var index2 = this.getChildIndex(child2);

//     if (index1 < 0 || index2 < 0) {
//         throw new Error('swapChildren: Both the supplied Objects must be a child of the caller.');
//     }

//     this.children[index1] = child2;
//     this.children[index2] = child;
// };

// Object2D.prototype.getChildIndex = function (child) {
//     var index = this.children.indexOf(child);
//     if (index === -1) {
//         throw new Error('The supplied Object must be a child of the caller');
//     }
//     return index;
// };

// Object2D.prototype.setChildIndex = function (child, index) {
//     if (index < 0 || index >= this.children.length) {
//         throw new Error('The supplied index is out of bounds');
//     }
//     var currentIndex = this.getChildIndex(child);
//     this.children.splice(currentIndex, 1); //remove from old position
//     this.children.splice(index, 0, child); //add at new position
// };

// Object2D.prototype.getChildAt = function (index) {
//     if (index < 0 || index >= this.children.length) {
//         throw new Error(
//             'getChildAt: Supplied index ' +
//                 index +
//                 ' does not exist in the child list, or the supplied Object must be a child of the caller'
//         );
//     }
//     return this.children[index];
// };

// Object2D.prototype.remove = function (child) {
//     var index = this.children.indexOf(child);
//     if (index === -1) return;

//     return this.removeChildAt(index);
// };

// Object2D.prototype.removeChildAt = function (index) {
//     var child = this.getChildAt(index);
//     child.parent = undefined;
//     this.children.splice(index, 1);
//     return child;
// };

Object2D.prototype.updateTransform = function () {
  if (!this.visible) return;
  if (!this.parent) {
    return;
  }
  var worldTransform;
  var worldOpacity;
  if (this.parent.isScene) {
    worldTransform = identityMatrix;
    worldOpacity = 1;
  } else {
    worldTransform = this.parent.worldTransform;
    worldOpacity = this.parent.worldOpacity;
  }

  // create some matrix refs for easy access
  var pt = worldTransform.elements;
  var wt = this.worldTransform.elements;

  // temporary matrix variables
  var a, b, c, d, tx, ty;

  // so if rotation is between 0 then we can simplify the multiplication process..
  if (this.rotation % Object2D_pi2 || this.skew.x !== 0 || this.skew.y !== 0) {
    // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
    if (this.rotation !== this._rot || this._skX !== this.skew.x || this._skY !== this.skew.y) {
      this._rot = this.rotation;
      this._skX = this.skew.x;
      this._skY = this.skew.y;
      this._cx = Math.cos(this.rotation + this._skY);
      this._sx = Math.sin(this.rotation + this._skY);
      this._cy = -Math.sin(this.rotation - this._skX); // cos, added PI/2
      this._sy = Math.cos(this.rotation - this._skX);
    }

    // get the matrix values of the displayobject based on its transform properties..
    a = this._cx * this.scale.x;
    b = this._sx * this.scale.x;
    c = this._cy * this.scale.y;
    d = this._sy * this.scale.y;
    tx = this.position.x;
    ty = this.position.y;

    // check for pivot.. not often used so geared towards that fact!
    if (this.pivot.x || this.pivot.y) {
      tx -= this.pivot.x * a + this.pivot.y * c;
      ty -= this.pivot.x * b + this.pivot.y * d;
    }

    // concat the parent matrix with the objects transform.
    wt[0] = a * pt[0] + b * pt[3];
    wt[1] = a * pt[1] + b * pt[4];
    wt[3] = c * pt[0] + d * pt[3];
    wt[4] = c * pt[1] + d * pt[4];
    wt[6] = tx * pt[0] + ty * pt[3] + pt[6];
    wt[7] = tx * pt[1] + ty * pt[4] + pt[7];
  } else {
    // lets do the fast version as we know there is no rotation..
    a = this.scale.x;
    d = this.scale.y;
    tx = this.position.x - this.pivot.x * a;
    ty = this.position.y - this.pivot.y * d;
    wt[0] = a * pt[0];
    wt[1] = a * pt[1];
    wt[3] = d * pt[3];
    wt[4] = d * pt[4];
    wt[6] = tx * pt[0] + ty * pt[3] + pt[6];
    wt[7] = tx * pt[1] + ty * pt[4] + pt[7];
  }

  // multiply the alphas..
  this.worldOpacity = this.opacity * worldOpacity;
  if (this._cacheAsBitmap) return;
  for (var i = 0, j = this.children.length; i < j; i++) {
    this.children[i].updateTransform();
  }
};

// performance increase to avoid using call.. (10x faster)
Object2D.prototype.displayObjectContainerUpdateTransform = Object2D.prototype.updateTransform;
Object2D.prototype.getBounds = function () {
  if (this.children.length === 0) return EmptyRectangle;
  if (this._cachedSprite) return this._cachedSprite.getBounds();

  // TODO the bounds have already been calculated this render session so return what we have

  var minX = Infinity;
  var minY = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;
  var childBounds;
  var childMaxX;
  var childMaxY;
  var childVisible = false;
  for (var i = 0, j = this.children.length; i < j; i++) {
    var child = this.children[i];
    if (!child.visible) continue;
    childVisible = true;
    childBounds = this.children[i].getBounds();
    minX = minX < childBounds.x ? minX : childBounds.x;
    minY = minY < childBounds.y ? minY : childBounds.y;
    childMaxX = childBounds.width + childBounds.x;
    childMaxY = childBounds.height + childBounds.y;
    maxX = maxX > childMaxX ? maxX : childMaxX;
    maxY = maxY > childMaxY ? maxY : childMaxY;
  }
  if (!childVisible) return EmptyRectangle;
  var bounds = this._bounds;
  bounds.x = minX;
  bounds.y = minY;
  bounds.width = maxX - minX;
  bounds.height = maxY - minY;

  // TODO: store a reference so that if this function gets called again in the render cycle we do not have to recalculate
  //this._currentBounds = bounds;

  return bounds;
};
Object2D.prototype.getLocalBounds = function () {
  var matrixCache = this.worldTransform;
  this.worldTransform = identityMatrix;
  for (var i = 0, j = this.children.length; i < j; i++) {
    this.children[i].updateTransform();
  }
  var bounds = this.getBounds();
  this.worldTransform = matrixCache;
  return bounds;
};
Object2D.prototype._render = function () {};
Object2D.prototype.render = function (renderer) {
  // if the object is not visible or the alpha is 0 then no need to render this element
  if (!this.visible || this.worldOpacity <= 0) {
    return;
  }

  // do a quick check to see if this element has a mask or a filter.
  if (this._mask || this._filters) {
    this.renderAdvancedWebGL(renderer);
  } else {
    this._render(renderer);

    // simple render children!
    for (var i = 0, j = this.children.length; i < j; ++i) {
      this.children[i].render(renderer);
    }
  }
};

/**
 * Render the object using the WebGL renderer and advanced features.
 *
 * @private
 * @param {PIXI.WebGLRenderer} renderer - The renderer
 */
Object2D.prototype.renderAdvancedWebGL = function (renderer) {
  renderer.flush();
  var filters = this._filters;
  var mask = this._mask;

  // push filter first as we need to ensure the stencil buffer is correct for any masking
  if (filters) {
    if (!this._enabledFilters) {
      this._enabledFilters = [];
    }
    this._enabledFilters.length = 0;
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].enabled) {
        this._enabledFilters.push(filters[i]);
      }
    }
    if (this._enabledFilters.length) {
      renderer.filterManager.pushFilter(this, this._enabledFilters);
    }
  }
  if (mask) {
    renderer.maskManager.pushMask(this, this._mask);
  }

  // add this object to the batch, only rendered if it has a texture.
  this._render(renderer);

  // now loop through the children and make sure they get rendered
  for (var _i = 0, j = this.children.length; _i < j; _i++) {
    this.children[_i].render(renderer);
  }
  renderer.flush();
  if (mask) {
    renderer.maskManager.popMask(this, this._mask);
  }
  if (filters && this._enabledFilters && this._enabledFilters.length) {
    renderer.filterManager.popFilter();
  }
};
Object2D.prototype.renderOLD = function (renderSession) {
  if (!this.visible || this.opacity <= 0) return;
  if (this._cacheAsBitmap) {
    this._renderCachedSprite(renderSession);
    return;
  }
  var i, j;
  if (this._mask || this._filters) {
    // push filter first as we need to ensure the stencil buffer is correct for any masking
    if (this._filters) {
      renderSession.spriteBatch.flush();
      renderSession.filterManager.pushFilter(this._filterBlock);
    }
    if (this._mask) {
      renderSession.spriteBatch.stop();
      renderSession.maskManager.pushMask(this.mask, renderSession);
      renderSession.spriteBatch.start();
    }

    // simple render children!
    for (i = 0, j = this.children.length; i < j; i++) {
      this.children[i].render(renderSession);
    }
    renderSession.spriteBatch.stop();
    if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);
    if (this._filters) renderSession.filterManager.popFilter();
    renderSession.spriteBatch.start();
  } else {
    // simple render children!
    for (i = 0, j = this.children.length; i < j; i++) {
      this.children[i].render(renderSession);
    }
  }
};

;// ./src/objects/Scene.js


function Scene(appContext) {
  Container.call(this);
  this.app = appContext;
  this.autoUpdate = true; // checked by the renderer
}
Scene.prototype = Object.assign(Object.create(Container.prototype), {
  constructor: Scene,
  isScene: true,
  updateChildren: function updateChildren(force) {
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      children[i].updateTransform(force);
    }
  }
});

;// ./src/objects/Sprite.js






var Sprite = function Sprite(texture, key) {
  Object2D.call(this);
  this.anchor = new Vec2();
  this.setTexture(texture, key, false);
  this.vertexData = new Float32Array(8);
  this._width = 0;
  this._height = 0;

  // this._frame = 0;

  this.tint = new Color();
  this.blending = NormalBlending;
  if (this.texture.valid) {
    this.onTextureUpdate();
  }
  this.renderable = true;
};
Sprite.prototype = Object.assign(Object.create(Object2D.prototype), {
  constructor: Sprite,
  calculateVertices: function calculateVertices() {
    var texture = this.texture;
    var wt = this.worldTransform.elements;
    var a = wt[0];
    var b = wt[1];
    var c = wt[3];
    var d = wt[4];
    var tx = wt[6];
    var ty = wt[7];
    var vertexData = this.vertexData;
    var trim = texture.trim;
    var frame = texture.frame;
    var aX = this.anchor.x;
    var aY = this.anchor.y;
    var w0 = 0;
    var w1 = 0;
    var h0 = 0;
    var h1 = 0;
    if (trim) {
      // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords..

      w1 = trim.x - aX * trim.width;
      w0 = w1 + texture.crop.width;
      h1 = trim.y - aY * trim.height;
      h0 = h1 + texture.crop.height;
    } else {
      w0 = frame.width * (1 - aX);
      w1 = frame.width * -aX;
      h0 = frame.height * (1 - aY);
      h1 = frame.height * -aY;
    }

    // xy
    vertexData[0] = a * w1 + c * h1 + tx;
    vertexData[1] = d * h1 + b * w1 + ty;

    // xy
    vertexData[2] = a * w0 + c * h1 + tx;
    vertexData[3] = d * h1 + b * w0 + ty;

    // xy
    vertexData[4] = a * w0 + c * h0 + tx;
    vertexData[5] = d * h0 + b * w0 + ty;

    // xy
    vertexData[6] = a * w1 + c * h0 + tx;
    vertexData[7] = d * h0 + b * w1 + ty;
  },
  setTexture: function setTexture(texture, frameName, updateDimension) {
    if (typeof texture == 'string') {
      var imagePath = texture;
      if (frameName != undefined) {
        imagePath = imagePath + '.' + frameName;
      }
      texture = Cache.texture[imagePath];
      if (!texture) {
        texture = new _Texture(imagePath);
        // throw new Error('Cache Error: image ' + imagePath + ' does`t found in cache');
      }
    }
    if (this.texture === texture) return false;
    this.texture = texture;
    this.cachedTint = '#ffffff';
    if (updateDimension === true) {
      this.onTextureUpdate();
    }
    return true;
  },
  onTextureUpdate: function onTextureUpdate() {
    // so if _width is 0 then width was not set..
    if (this._width) this.scale.x = this._width / this.texture.frame.width;
    if (this._height) this.scale.y = this._height / this.texture.frame.height;
  },
  // animate: function(delay, yoyo) {
  //     this.reverse = false;
  //     this.yoyo = yoyo;

  //     if (this.texture.lastFrame) {
  //         delay = delay || this.texture.frame.duration || 100;

  //         if (!this.animation) {
  //             this.animation = this.game.timer.loop(
  //                 delay,
  //                 function () {
  //                     if (this.yoyo) {
  //                         if (this.frame === 0) this.reverse = false;
  //                         else if (this.frame === this.texture.lastFrame) this.reverse = true;
  //                     }

  //                     this.frame += this.reverse ? -1 : 1;
  //                     this.animation.delay = delay || this.texture.frame.duration || 100;
  //                 },
  //                 this
  //             );

  //             this.animation.start();
  //         } else {
  //             this.animation.delay = delay;
  //             this.animation.start();
  //         }
  //     }
  // };

  getBounds: function getBounds(matrix) {
    var width = this.texture.frame.width / this.texture.base.resolution;
    var height = this.texture.frame.height / this.texture.base.resolution;
    var w0 = width * (1 - this.anchor.x);
    var w1 = width * -this.anchor.x;
    var h0 = height * (1 - this.anchor.y);
    var h1 = height * -this.anchor.y;
    var worldTransform = matrix || this.worldTransform;
    var a = worldTransform.a;
    var b = worldTransform.b;
    var c = worldTransform.c;
    var d = worldTransform.d;
    var tx = worldTransform.tx;
    var ty = worldTransform.ty;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var minX = Infinity;
    var minY = Infinity;
    if (b === 0 && c === 0) {
      // // scale may be negative!
      // if (a < 0) a *= -1;
      // if (d < 0) d *= -1;

      // // this means there is no rotation going on right? RIGHT?
      // // if thats the case then we can avoid checking the bound values! yay
      // minX = a * w1 + tx;
      // maxX = a * w0 + tx;
      // minY = d * h1 + ty;
      // maxY = d * h0 + ty;

      if (a < 0) {
        minX = a * w0 + tx;
        maxX = a * w1 + tx;
      } else {
        minX = a * w1 + tx;
        maxX = a * w0 + tx;
      }
      if (d < 0) {
        minY = d * h0 + ty;
        maxY = d * h1 + ty;
      } else {
        minY = d * h1 + ty;
        maxY = d * h0 + ty;
      }
    } else {
      var x1 = a * w1 + c * h1 + tx;
      var y1 = d * h1 + b * w1 + ty;
      var x2 = a * w0 + c * h1 + tx;
      var y2 = d * h1 + b * w0 + ty;
      var x3 = a * w0 + c * h0 + tx;
      var y3 = d * h0 + b * w0 + ty;
      var x4 = a * w1 + c * h0 + tx;
      var y4 = d * h0 + b * w1 + ty;
      minX = x1 < minX ? x1 : minX;
      minX = x2 < minX ? x2 : minX;
      minX = x3 < minX ? x3 : minX;
      minX = x4 < minX ? x4 : minX;
      minY = y1 < minY ? y1 : minY;
      minY = y2 < minY ? y2 : minY;
      minY = y3 < minY ? y3 : minY;
      minY = y4 < minY ? y4 : minY;
      maxX = x1 > maxX ? x1 : maxX;
      maxX = x2 > maxX ? x2 : maxX;
      maxX = x3 > maxX ? x3 : maxX;
      maxX = x4 > maxX ? x4 : maxX;
      maxY = y1 > maxY ? y1 : maxY;
      maxY = y2 > maxY ? y2 : maxY;
      maxY = y3 > maxY ? y3 : maxY;
      maxY = y4 > maxY ? y4 : maxY;
    }
    var bounds = this._bounds;
    bounds.x = minX;
    bounds.width = maxX - minX;
    bounds.y = minY;
    bounds.height = maxY - minY;

    // store a reference so that if this function gets called again in the render cycle we do not have to recalculate
    this._currentBounds = bounds;
    return bounds;
  },
  _render: function _render(renderer) {
    this.calculateVertices();
    renderer.setObjectRenderer(renderer.systems.sprite);
    renderer.systems.sprite.render(this);

    // // if the sprite is not visible or the alpha is 0 then no need to render this element
    // if (!this.visible || this.alpha <= 0) return;

    // var i, j;

    // // do a quick check to see if this element has a mask or a filter.
    // if (this._mask || this._filters) {
    //     var spriteBatch = renderer.spriteBatch;

    //     // push filter first as we need to ensure the stencil buffer is correct for any masking
    //     if (this._filters) {
    //         spriteBatch.flush();
    //         renderer.filterManager.pushFilter(this._filterBlock);
    //     }

    //     if (this._mask) {
    //         spriteBatch.stop();
    //         renderer.maskManager.pushMask(this.mask, renderer);
    //         spriteBatch.start();
    //     }

    //     // add this sprite to the batch
    //     spriteBatch.render(this);

    //     // now loop through the children and make sure they get rendered
    //     for (i = 0, j = this.children.length; i < j; i++) {
    //         this.children[i].render(renderer);
    //     }

    //     // time to stop the sprite batch as either a mask element or a filter draw will happen next
    //     spriteBatch.stop();

    //     if (this._mask) renderer.maskManager.popMask(this._mask, renderer);
    //     if (this._filters) renderer.filterManager.popFilter();

    //     spriteBatch.start();
    // } else {
    //     renderer.spriteBatch.render(this);

    //     // simple render children!
    //     for (i = 0, j = this.children.length; i < j; i++) {
    //         this.children[i].render(renderer);
    //     }
    // }
  }
});
Object.defineProperty(Sprite.prototype, 'frameName', {
  get: function get() {
    return this.texture.frame.name;
  },
  set: function set(value) {
    if (this.texture.frame.name) {
      this.setTexture(Cache.texture[this.texture.key + '.' + value]);
    }
  }
});

// Object.defineProperty(Sprite.prototype, 'frame', {
//     get: function () {
//         return this._frame;
//     },

//     set: function (value) {
//         if (this.texture.lastFrame) {
//             this._frame = value;
//             if (this._frame > this.texture.lastFrame) this._frame = 0;
//             else if (this._frame < 0) this._frame = this.texture.lastFrame;
//             this.setTexture(Cache.texture[this.texture.key + '.' + this._frame]);
//         }
//     }
// });

Object.defineProperty(Sprite.prototype, 'width', {
  get: function get() {
    return this.scale.x * this.texture.frame.width;
  },
  set: function set(value) {
    this.scale.x = value / this.texture.frame.width;
    this._width = value;
  }
});
Object.defineProperty(Sprite.prototype, 'height', {
  get: function get() {
    return this.scale.y * this.texture.frame.height;
  },
  set: function set(value) {
    this.scale.y = value / this.texture.frame.height;
    this._height = value;
  }
});

;// ./src/objects/Text.js


var _Text = function Text(text, style) {
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.resolution = 1;
  this.style = Object.assign({}, _Text.defaultStyle);
  Sprite.call(this, new _Texture(this.canvas));
  this.setText(text);
  this.setStyle(style);
};
_Text.defaultStyle = {
  fontFamily: 'Arial',
  fontSize: 26,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'bold',
  fill: 'black',
  align: 'left',
  stroke: 'black',
  strokeThickness: 0,
  wordWrap: false,
  lineSpacing: 0,
  wordWrapWidth: 100,
  dropShadow: false,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 4,
  dropShadowColor: 'black',
  dropShadowBlur: 0,
  lineJoin: "miter",
  miterLimit: 2
};
_Text.prototype = Object.assign(Object.create(Sprite.prototype), {
  constructor: _Text,
  setStyle: function setStyle(style) {
    // style = style || {};

    Object.assign(this.style, style);

    // style.font = style.font || 'bold 20pt Arial';
    // fontFamily: 'Arial';
    // fontSize: 26;
    // fontStyle: 'normal';
    // fontVariant: 'normal';
    // fontWeight: 'normal';

    // style.fill = style.fill || 'black';
    // style.align = style.align || 'left';
    // style.stroke = style.stroke || 'black';
    // style.strokeThickness = style.strokeThickness || 0;
    // style.wordWrap = style.wordWrap || false;
    // style.lineSpacing = style.lineSpacing || 0;
    // style.wordWrapWidth = style.wordWrapWidth !== undefined ? style.wordWrapWidth : 100;

    // style.dropShadow = style.dropShadow || false;
    // style.dropShadowAngle = style.dropShadowAngle !== undefined ? style.dropShadowAngle : Math.PI / 6;
    // style.dropShadowDistance = style.dropShadowDistance !== undefined ? style.dropShadowDistance : 4;
    // style.dropShadowColor = style.dropShadowColor || 'black';
    // style.dropShadowBlur = style.dropShadowBlur || 0;

    // this.style = style;
    this.dirty = true;
  },
  setText: function setText(text) {
    this.text = text.toString() || ' ';
    this.dirty = true;
  },
  getFontString: function getFontString() {
    var style = this.style;
    // build canvas api font setting from individual components. Convert a numeric this.fontSize to px
    var fontSizeString = style.fontSize;
    if (typeof fontSizeString === 'number') fontSizeString = fontSizeString + 'px';
    return style.fontStyle + ' ' + style.fontVariant + ' ' + style.fontWeight + ' ' + fontSizeString + ' ' + style.fontFamily;
  },
  updateText: function updateText() {
    var style = this.style;
    var context = this.context;
    var fontStyle = this.getFontString();
    context.font = fontStyle;
    var outputText = this.text;

    // word wrap
    // preserve original text
    if (style.wordWrap) outputText = this.wordWrap(this.text);

    //split text into lines
    var lines = outputText.split(/(?:\r\n|\r|\n)/);

    //calculate text width
    var lineWidths = [];
    var maxLineWidth = 0;
    var fontProperties = this.determineFontProperties(fontStyle);
    for (var i = 0; i < lines.length; i++) {
      var lineWidth = context.measureText(lines[i]).width;
      lineWidths[i] = lineWidth;
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    var width = maxLineWidth + style.strokeThickness;
    if (style.dropShadow) width += style.dropShadowDistance;
    this.canvas.width = Math.ceil(width * this.resolution);

    //calculate text height
    var lineHeight = fontProperties.fontSize + style.strokeThickness + style.lineSpacing;
    var height = lineHeight * lines.length;
    if (style.dropShadow) height += style.dropShadowDistance;
    this.canvas.height = Math.ceil((height - style.lineSpacing) * this.resolution);

    // used for debugging..
    // context.fillStyle ="#FF0000"
    // context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    context.scale(this.resolution, this.resolution);
    if (navigator.isCocoonJS) context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.font = fontStyle;
    context.strokeStyle = style.stroke;
    context.lineWidth = style.strokeThickness;
    context.textBaseline = 'alphabetic';
    context.miterLimit = style.miterLimit;
    context.lineJoin = style.lineJoin;
    var linePositionX;
    var linePositionY;
    if (style.dropShadow) {
      context.fillStyle = style.dropShadowColor;
      context.shadowBlur = style.dropShadowBlur;
      if (style.dropShadowBlur > 0) {
        context.shadowColor = style.dropShadowColor;
      }
      var xShadowOffset = Math.sin(style.dropShadowAngle) * style.dropShadowDistance;
      var yShadowOffset = Math.cos(style.dropShadowAngle) * style.dropShadowDistance;
      for (i = 0; i < lines.length; i++) {
        linePositionX = style.strokeThickness / 2;
        linePositionY = style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;
        if (style.align === 'right') {
          linePositionX += maxLineWidth - lineWidths[i];
        } else if (style.align === 'center') {
          linePositionX += (maxLineWidth - lineWidths[i]) / 2;
        }
        if (style.fill) {
          context.fillText(lines[i], linePositionX + xShadowOffset, linePositionY + yShadowOffset);
        }

        //  if(dropShadow)
      }
    }
    context.shadowBlur = 0;

    //set canvas text styles
    context.fillStyle = style.fill;

    //draw lines line by line
    for (i = 0; i < lines.length; i++) {
      linePositionX = style.strokeThickness / 2;
      linePositionY = style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;
      if (style.align === 'right') {
        linePositionX += maxLineWidth - lineWidths[i];
      } else if (style.align === 'center') {
        linePositionX += (maxLineWidth - lineWidths[i]) / 2;
      }
      if (style.stroke && style.strokeThickness) {
        context.strokeText(lines[i], linePositionX, linePositionY);
      }
      if (style.fill) {
        context.fillText(lines[i], linePositionX, linePositionY);
      }

      //  if(dropShadow)
    }
    this.updateTexture();
  },
  updateTexture: function updateTexture() {
    var baseTexture = this.texture.base;
    var canvas = this.canvas;
    var width = canvas.width / this.resolution;
    var height = canvas.height / this.resolution;

    // this.texture.width = this.canvas.width;
    // this.texture.height = this.canvas.height;
    this.texture.crop.width = this.texture.frame.width = width;
    this.texture.crop.height = this.texture.frame.height = height;
    this.texture.base.resolution = this.resolution;
    baseTexture.width = width;
    baseTexture.height = height;
    this._width = width;
    this._height = height;
    this.texture.base.needsUpdate = true;

    // this.texture.base.dirty();
  },
  render: function render(renderer) {
    if (this.dirty || this.resolution !== renderer.resolution) {
      // this.resolution = renderer.resolution;

      this.updateText();
      this.dirty = false;
    }
    Sprite.prototype.render.call(this, renderer);
  },
  determineFontProperties: function determineFontProperties(fontStyle) {
    var properties = _Text.fontPropertiesCache[fontStyle];
    if (!properties) {
      properties = {};
      var canvas = _Text.fontPropertiesCanvas;
      var context = _Text.fontPropertiesContext;
      context.font = fontStyle;
      var width = Math.ceil(context.measureText('|MÉq').width);
      var baseline = Math.ceil(context.measureText('|MÉq').width);
      var height = 2 * baseline;
      baseline = baseline * 1.4 | 0;
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = '#f00';
      context.fillRect(0, 0, width, height);
      context.font = fontStyle;
      context.textBaseline = 'alphabetic';
      context.fillStyle = '#000';
      context.fillText('|MÉq', 0, baseline);
      var imagedata = context.getImageData(0, 0, width, height).data;
      var pixels = imagedata.length;
      var line = width * 4;
      var i, j;
      var idx = 0;
      var stop = false;

      // ascent. scan from top to bottom until we find a non red pixel
      for (i = 0; i < baseline; i++) {
        for (j = 0; j < line; j += 4) {
          if (imagedata[idx + j] !== 255) {
            stop = true;
            break;
          }
        }
        if (!stop) {
          idx += line;
        } else {
          break;
        }
      }
      properties.ascent = baseline - i;
      idx = pixels - line;
      stop = false;

      // descent. scan from bottom to top until we find a non red pixel
      for (i = height; i > baseline; i--) {
        for (j = 0; j < line; j += 4) {
          if (imagedata[idx + j] !== 255) {
            stop = true;
            break;
          }
        }
        if (!stop) {
          idx -= line;
        } else {
          break;
        }
      }
      properties.descent = i - baseline;
      //TODO might need a tweak. kind of a temp fix!
      properties.descent += 6;
      properties.fontSize = properties.ascent + properties.descent;
      _Text.fontPropertiesCache[fontStyle] = properties;
    }
    return properties;
  },
  wordWrap: function wordWrap(text) {
    // Greedy wrapping algorithm that will wrap words as the line grows longer
    // than its horizontal bounds.
    var result = '';
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var spaceLeft = this.style.wordWrapWidth;
      var words = lines[i].split(' ');
      for (var j = 0; j < words.length; j++) {
        var wordWidth = this.context.measureText(words[j]).width;
        var wordWidthWithSpace = wordWidth + this.context.measureText(' ').width;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          // Skip printing the newline if it's the first word of the line that is
          // greater than the word wrap width.
          if (j > 0) {
            result += '\n';
          }
          result += words[j];
          spaceLeft = this.style.wordWrapWidth - wordWidth;
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  },
  getBounds: function getBounds(matrix) {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return Sprite.prototype.getBounds.call(this, matrix);
  },
  destroy: function destroy() {
    // make sure to reset the the context and canvas.. dont want this hanging around in memory!
    this.context = null;
    this.canvas = null;
    this.texture.destroy();
    Sprite.prototype.destroy.call(this);
  }
});
Object.defineProperty(_Text.prototype, 'width', {
  get: function get() {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return this.scale.x * this.texture.frame.width;
  },
  set: function set(value) {
    this.scale.x = value / this.texture.frame.width;
    this._width = value;
  }
});
Object.defineProperty(_Text.prototype, 'height', {
  get: function get() {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return this.scale.y * this.texture.frame.height;
  },
  set: function set(value) {
    this.scale.y = value / this.texture.frame.height;
    this._height = value;
  }
});
_Text.fontPropertiesCache = {};
_Text.fontPropertiesCanvas = document.createElement('canvas');
_Text.fontPropertiesContext = _Text.fontPropertiesCanvas.getContext('2d');

;// ./src/math/shapes/Circle.js



/**
 * @author Chad Engler <chad@pantherdev.com>
 */

/**
 * The Circle object can be used to specify a hit area for displayObjects
 *
 * @class Circle
 * @constructor
 * @param x {Number} The X coordinate of the center of this circle
 * @param y {Number} The Y coordinate of the center of this circle
 * @param radius {Number} The radius of the circle
 */
var Circle = function Circle(x, y, radius) {
  /**
   * @property x
   * @type Number
   * @default 0
   */
  this.x = x || 0;

  /**
   * @property y
   * @type Number
   * @default 0
   */
  this.y = y || 0;

  /**
   * @property radius
   * @type Number
   * @default 0
   */
  this.radius = radius || 0;

  /**
   * The type of the object, should be one of the Graphics type consts, PIXI.Graphics.CIRC in this case
   * @property type
   * @type Number
   * @default 0
   */

  this.type = CircleShape;
};
Object.assign(Circle.prototype, {
  constructor: Circle,
  /**
   * Creates a clone of this Circle instance
   *
   * @method clone
   * @return {Circle} a copy of the Circle
   */
  // Circle.prototype.clone = function()
  // {
  //     return new Circle(this.x, this.y, this.radius);
  // };

  /**
   * Checks whether the x and y coordinates given are contained within this circle
   *
   * @method contains
   * @param x {Number} The X coordinate of the point to test
   * @param y {Number} The Y coordinate of the point to test
   * @return {Boolean} Whether the x/y coordinates are within this Circle
   */
  contains: function contains(x, y) {
    if (this.radius <= 0) return false;
    var dx = this.x - x,
      dy = this.y - y,
      r2 = this.radius * this.radius;
    dx *= dx;
    dy *= dy;
    return dx + dy <= r2;
  },
  /**
   * Returns the framing rectangle of the circle as a PIXI.Rectangle object
   *
   * @method getBounds
   * @return {Rectangle} the framing rectangle
   */
  getBounds: function getBounds() {
    return new PIXI.Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
});

;// ./src/math/shapes/Polygon.js


var Polygon = function Polygon(points) {
  // this.area = 0;
  //if points isn't an array, use arguments as the array
  if (!(points instanceof Array)) points = Array.prototype.slice.call(arguments);

  //if this is a flat array of numbers, convert it to points
  if (typeof points[0] !== 'number') {
    var p = [];
    for (var i = 0, il = points.length; i < il; i++) {
      p.push(points[i].x, points[i].y);
    }
    points = p;
  }
  this.closed = true;

  /**
   * An array of the points of this polygon
   * @property points
   * @type Array(Point)|Array(Number)
   *
   */
  this.points = points;
  this.type = PolygonShape;
};
Object.assign(Polygon.prototype, {
  constructor: Polygon,
  toNumberArray: function toNumberArray(output) {
    if (typeof output === 'undefined') {
      output = [];
    }
    for (var i = 0; i < this.points.length; i++) {
      if (typeof this.points[i] === 'number') {
        output.push(this.points[i]);
        output.push(this.points[i + 1]);
        i++;
      } else {
        output.push(this.points[i].x);
        output.push(this.points[i].y);
      }
    }
    return output;
  },
  // flatten: function () {
  //     this.points = this.toNumberArray();

  //     return this;
  // },

  /**
   * Closes the polygon, adding points if necessary.
   *
   */
  close: function close() {
    var points = this.points;

    // close the poly if the value is true!
    if (points[0] !== points[points.length - 2] || points[1] !== points[points.length - 1]) {
      points.push(points[0], points[1]);
    }
  },
  // clone: function (output) {
  //     var points = this._points.slice();

  //     if (typeof output === 'undefined' || output === null) {
  //         output = new Polygon(points);
  //     } else {
  //         output.setTo(points);
  //     }

  //     return output;
  // },

  // contains: function (x, y) {
  //     var length = this._points.length;
  //     var inside = false;

  //     for (var i = -1, j = length - 1; ++i < length; j = i) {
  //         var ix = this._points[i].x;
  //         var iy = this._points[i].y;

  //         var jx = this._points[j].x;
  //         var jy = this._points[j].y;

  //         if (((iy <= y && y < jy) || (jy <= y && y < iy)) && x < ((jx - ix) * (y - iy)) / (jy - iy) + ix) {
  //             inside = !inside;
  //         }
  //     }

  //     return inside;
  // },

  contains: function contains(x, y) {
    var inside = false;

    // use some raycasting to test hits
    // https://github.com/substack/point-in-polygon/blob/master/index.js
    var length = this.points.length / 2;
    for (var i = 0, j = length - 1; i < length; j = i++) {
      var xi = this.points[i * 2],
        yi = this.points[i * 2 + 1],
        xj = this.points[j * 2],
        yj = this.points[j * 2 + 1],
        intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // setTo: function (points) {
  //     this.area = 0;
  //     this._points = [];

  //     if (arguments.length > 0) {
  //         //  If points isn't an array, use arguments as the array
  //         if (!Array.isArray(points)) {
  //             points = Array.prototype.slice.call(arguments);
  //         }

  //         var y0 = Number.MAX_VALUE;

  //         //  Allows for mixed-type arguments
  //         for (var i = 0, len = points.length; i < len; i++) {
  //             if (typeof points[i] === 'number') {
  //                 var p = new Vec2(points[i], points[i + 1]);
  //                 i++;
  //             } else {
  //                 var p = new Vec2(points[i].x, points[i].y);
  //             }

  //             this._points.push(p);

  //             //  Lowest boundary
  //             if (p.y < y0) {
  //                 y0 = p.y;
  //             }
  //         }

  //         this.calculateArea(y0);
  //     }

  //     return this;
  // },

  // calculateArea: function (y0) {
  //     var p1;
  //     var p2;
  //     var avgHeight;
  //     var width;

  //     for (var i = 0, len = this.points.length; i < len; i++) {
  //         p1 = this.points[i];

  //         if (i === len - 1) {
  //             p2 = this.points[0];
  //         } else {
  //             p2 = this.points[i + 1];
  //         }

  //         avgHeight = (p1.y - y0 + (p2.y - y0)) / 2;
  //         width = p1.x - p2.x;
  //         this.area += avgHeight * width;
  //     }

  //     return this.area;
  // }
});

// Object.defineProperty(Polygon.prototype, 'points', {
//     get: function () {
//         return this._points;
//     },

//     set: function (points) {
//         if (points != null) {
//             this.setTo(points);
//         } else {
//             //  Clear the points
//             this.setTo();
//         }
//     }
// });


;// ./src/math/shapes/RoundedRectangle.js

var RoundedRectangle = function RoundedRectangle(x, y, width, height, radius) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 0;
  this.height = height || 0;
  this.radius = radius || 0;
  this.type = RoundedRectangleShape;
};
RoundedRectangle.prototype.constructor = RoundedRectangle;

// RoundedRectangle.prototype.clone = function () {
//     return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
// };

RoundedRectangle.prototype.contains = function (x, y) {
  if (this.width <= 0 || this.height <= 0) {
    return false;
  }
  var x1 = this.x;
  if (x >= x1 && x <= x1 + this.width) {
    var y1 = this.y;
    if (y >= y1 && y <= y1 + this.height) {
      return true;
    }
  }
  return false;
};

;// ./src/math/shapes/Ellipse.js

var Ellipse = function Ellipse(x, y, width, height) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 0;
  this.height = height || 0;
  this.type = EllipseShape;
};
Ellipse.prototype.constructor = Ellipse;

;// ./src/objects/Graphics.js












var GraphicsData = function GraphicsData(lineWidth, lineColor, fillColor, fill, alignment, shape) {
  this.lineWidth = lineWidth;
  this.lineColor = lineColor;
  // this.lineAlpha = lineAlpha;
  // this._lineTint = lineColor;
  this.fillColor = fillColor;
  // this.fillAlpha = fillAlpha;
  // this._fillTint = fillColor;
  this.fill = fill;
  this.alignment = alignment;
  this.shape = shape;
  this.type = shape.type;
};
GraphicsData.prototype.constructor = GraphicsData;

// GraphicsData.prototype.clone = function () {
//     return new GraphicsData(
//         this.lineWidth,
//         this.lineColor,
//         this.lineAlpha,
//         this.fillColor,
//         this.fillAlpha,
//         this.fill,
//         this.shape
//     );
// };

var Graphics = function Graphics() {
  Object2D.call(this);
  this.renderable = true;

  /**
   * The alpha value used when filling the Graphics object.
   *
   * @property fillAlpha
   * @type Number
   */
  // this.fillAlpha = 1;

  /**
   * The width (thickness) of any lines drawn.
   *
   * @property lineWidth
   * @type Number
   */
  this.lineWidth = 0;

  /**
   * The color of any lines drawn.
   *
   * @property lineColor
   * @type String
   * @default 0
   */
  this.lineColor = new Color();

  /**
   * The alignment of any lines drawn (0.5 = middle, 1 = outter, 0 = inner).
   *
   * @member {number}
   * @default 0.5
   */
  this.alignment = 0.5;

  /**
   * Graphics data
   *
   * @property graphicsData
   * @type Array
   * @private
   */
  this.graphicsData = [];

  /**
   * The tint applied to the graphic shape. This is a hex value. Apply a value of 0xFFFFFF to reset the tint.
   *
   * @property tint
   * @type Number
   * @default 0xFFFFFF
   */
  this.tint = new Color();

  /**
   * The blend mode to be applied to the graphic shape. Apply a value of PIXI.blendModes.NORMAL to reset the blend mode.
   *
   * @property blendMode
   * @type Number
   * @default PIXI.blendModes.NORMAL;
   */
  this.blending = NormalBlending;

  /**
   * Current path
   *
   * @property currentPath
   * @type Object
   * @private
   */
  this.currentPath = null;

  /**
   * Array containing some WebGL-related properties used by the WebGL renderer.
   *
   * @property _webGL
   * @type Array
   * @private
   */
  this._webGL = [];

  /**
   * Whether this shape is being used as a mask.
   *
   * @property isMask
   * @type Boolean
   */
  this.isMask = false;

  /**
   * The bounds' padding used for bounds calculation.
   *
   * @property boundsPadding
   * @type Number
   */
  this.boundsPadding = 0;
  this._localBounds = new Rectangle(0, 0, 1, 1);

  /**
   * Used to detect if the graphics object has changed. If this is set to true then the graphics object will be recalculated.
   *
   * @property dirty
   * @type Boolean
   * @private
   */
  this.dirty = 0;

  /**
   * Used to detect if we clear the graphics webGL data
   * @type {Number}
   */
  this.clearDirty = 0;

  /**
   * Used to detect if the cached sprite object needs to be updated.
   *
   * @property cachedSpriteDirty
   * @type Boolean
   * @private
   */
  this.cachedSpriteDirty = false;
};

// constructor
Graphics.prototype = Object.create(Object2D.prototype);
Graphics.prototype.constructor = Graphics;

/**
 * When cacheAsBitmap is set to true the graphics object will be rendered as if it was a sprite.
 * This is useful if your graphics element does not change often, as it will speed up the rendering of the object in exchange for taking up texture memory.
 * It is also useful if you need the graphics object to be anti-aliased, because it will be rendered using canvas.
 * This is not recommended if you are constantly redrawing the graphics element.
 *
 * @property cacheAsBitmap
 * @type Boolean
 * @default false
 * @private
 */
Object.defineProperty(Graphics.prototype, 'cacheAsBitmap', {
  get: function get() {
    return this._cacheAsBitmap;
  },
  set: function set(value) {
    this._cacheAsBitmap = value;
    if (this._cacheAsBitmap) {
      this._generateCachedSprite();
    } else {
      this.destroyCachedSprite();
      this.dirty++;
    }
  }
});
Object.assign(Graphics.prototype, {
  /**
   * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
   *
   * @method lineStyle
   * @param lineWidth {Number} width of the line to draw, will update the objects stored style
   * @param color {Number} color of the line to draw, will update the objects stored style
   * @param alpha {Number} alpha of the line to draw, will update the objects stored style
   * @return {Graphics}
   */
  lineStyle: function lineStyle(lineWidth, color, alpha, alignment) {
    this.lineWidth = lineWidth || 0;
    this.lineColor = new Color(color || 0);
    if (alpha !== undefined) this.lineColor.a = alpha;
    this.alignment = alignment !== undefined ? alignment : 0.5;
    if (this.currentPath) {
      if (this.currentPath.shape.points.length) {
        // halfway through a line? start a new one!
        var shape = new Polygon(this.currentPath.shape.points.slice(-2));
        shape.closed = false;
        this.drawShape(shape);
      } else {
        // otherwise its empty so lets just set the line properties
        this.currentPath.lineWidth = this.lineWidth;
        this.currentPath.lineColor = this.lineColor;
        this.currentPath.alignment = this.alignment;
        // this.currentPath.lineAlpha = this.lineAlpha;
      }
    }
    return this;
  },
  /**
   * Moves the current drawing position to x, y.
   *
   * @method moveTo
   * @param x {Number} the X coordinate to move to
   * @param y {Number} the Y coordinate to move to
   * @return {Graphics}
   */
  moveTo: function moveTo(x, y) {
    var shape = new Polygon([x, y]);
    shape.closed = false;
    this.drawShape(shape);
    return this;
  },
  /**
   * Draws a line using the current line style from the current drawing position to (x, y);
   * The current drawing position is then set to (x, y).
   *
   * @method lineTo
   * @param x {Number} the X coordinate to draw to
   * @param y {Number} the Y coordinate to draw to
   * @return {Graphics}
   */
  lineTo: function lineTo(x, y) {
    if (!this.currentPath) {
      this.moveTo(0, 0);
    }
    this.currentPath.shape.points.push(x, y);
    this.dirty++;
    return this;
  },
  /**
   * Calculate the points for a quadratic bezier curve and then draws it.
   * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
   *
   * @method quadraticCurveTo
   * @param cpX {Number} Control point x
   * @param cpY {Number} Control point y
   * @param toX {Number} Destination point x
   * @param toY {Number} Destination point y
   * @return {Graphics}
   */
  quadraticCurveTo: function quadraticCurveTo(cpX, cpY, toX, toY) {
    if (this.currentPath) {
      if (this.currentPath.shape.points.length === 0) this.currentPath.shape.points = [0, 0];
    } else {
      this.moveTo(0, 0);
    }
    var xa,
      ya,
      n = 20,
      points = this.currentPath.shape.points;
    if (points.length === 0) this.moveTo(0, 0);
    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];
    var j = 0;
    for (var i = 1; i <= n; i++) {
      j = i / n;
      xa = fromX + (cpX - fromX) * j;
      ya = fromY + (cpY - fromY) * j;
      points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
    }
    this.dirty++;
    return this;
  },
  /**
   * Calculate the points for a bezier curve and then draws it.
   *
   * @method bezierCurveTo
   * @param cpX {Number} Control point x
   * @param cpY {Number} Control point y
   * @param cpX2 {Number} Second Control point x
   * @param cpY2 {Number} Second Control point y
   * @param toX {Number} Destination point x
   * @param toY {Number} Destination point y
   * @return {Graphics}
   */
  bezierCurveTo: function bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY) {
    if (this.currentPath) {
      if (this.currentPath.shape.points.length === 0) this.currentPath.shape.points = [0, 0];
    } else {
      this.moveTo(0, 0);
    }
    var n = 20,
      dt,
      dt2,
      dt3,
      t2,
      t3,
      points = this.currentPath.shape.points;
    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];
    var j = 0;
    for (var i = 1; i <= n; i++) {
      j = i / n;
      dt = 1 - j;
      dt2 = dt * dt;
      dt3 = dt2 * dt;
      t2 = j * j;
      t3 = t2 * j;
      points.push(dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX, dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
    }
    this.dirty++;
    return this;
  },
  /*
   * The arcTo() method creates an arc/curve between two tangents on the canvas.
   *
   * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
   *
   * @method arcTo
   * @param x1 {Number} The x-coordinate of the beginning of the arc
   * @param y1 {Number} The y-coordinate of the beginning of the arc
   * @param x2 {Number} The x-coordinate of the end of the arc
   * @param y2 {Number} The y-coordinate of the end of the arc
   * @param radius {Number} The radius of the arc
   * @return {Graphics}
   */
  arcTo: function arcTo(x1, y1, x2, y2, radius) {
    if (this.currentPath) {
      if (this.currentPath.shape.points.length === 0) {
        this.currentPath.shape.points.push(x1, y1);
      }
    } else {
      this.moveTo(x1, y1);
    }
    var points = this.currentPath.shape.points;
    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];
    var a1 = fromY - y1;
    var b1 = fromX - x1;
    var a2 = y2 - y1;
    var b2 = x2 - x1;
    var mm = Math.abs(a1 * b2 - b1 * a2);
    if (mm < 1.0e-8 || radius === 0) {
      if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
        //console.log(">>")
        points.push(x1, y1);
      }
    } else {
      var dd = a1 * a1 + b1 * b1;
      var cc = a2 * a2 + b2 * b2;
      var tt = a1 * a2 + b1 * b2;
      var k1 = radius * Math.sqrt(dd) / mm;
      var k2 = radius * Math.sqrt(cc) / mm;
      var j1 = k1 * tt / dd;
      var j2 = k2 * tt / cc;
      var cx = k1 * b2 + k2 * b1;
      var cy = k1 * a2 + k2 * a1;
      var px = b1 * (k2 + j1);
      var py = a1 * (k2 + j1);
      var qx = b2 * (k1 + j2);
      var qy = a2 * (k1 + j2);
      var startAngle = Math.atan2(py - cy, px - cx);
      var endAngle = Math.atan2(qy - cy, qx - cx);
      this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
    }
    this.dirty++;
    return this;
  },
  /**
   * The arc method creates an arc/curve (used to create circles, or parts of circles).
   *
   * @method arc
   * @param cx {Number} The x-coordinate of the center of the circle
   * @param cy {Number} The y-coordinate of the center of the circle
   * @param radius {Number} The radius of the circle
   * @param startAngle {Number} The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
   * @param endAngle {Number} The ending angle, in radians
   * @param anticlockwise {Boolean} Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
   * @return {Graphics}
   */
  arc: function arc(cx, cy, radius, startAngle, endAngle, anticlockwise) {
    anticlockwise = anticlockwise || false;
    if (startAngle === endAngle) {
      return this;
    }
    if (!anticlockwise && endAngle <= startAngle) {
      endAngle += Math.PI * 2;
    } else if (anticlockwise && startAngle <= endAngle) {
      startAngle += Math.PI * 2;
    }
    var sweep = anticlockwise ? (startAngle - endAngle) * -1 : endAngle - startAngle;
    var segs = Math.abs(sweep) / (Math.PI * 2) * 40;
    if (sweep === 0) {
      return this;
    }
    var startX = cx + Math.cos(startAngle) * radius;
    var startY = cy + Math.sin(startAngle) * radius;
    if (anticlockwise && this.filling) {
      this.moveTo(cx, cy);
    } else {
      this.moveTo(startX, startY);
    }

    //  currentPath will always exist after calling a moveTo
    var points = this.currentPath.shape.points;
    var theta = sweep / (segs * 2);
    var theta2 = theta * 2;
    var cTheta = Math.cos(theta);
    var sTheta = Math.sin(theta);
    var segMinus = segs - 1;
    var remainder = segMinus % 1 / segMinus;
    for (var i = 0; i <= segMinus; i++) {
      var real = i + remainder * i;
      var angle = theta + startAngle + theta2 * real;
      var c = Math.cos(angle);
      var s = -Math.sin(angle);
      points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
    }
    this.dirty++;
    return this;
  },
  /**
   * Specifies a simple one-color fill that subsequent calls to other Graphics methods
   * (such as lineTo() or drawCircle()) use when drawing.
   *
   * @method beginFill
   * @param color {Number} the color of the fill
   * @param alpha {Number} the alpha of the fill
   * @return {Graphics}
   */
  beginFill: function beginFill(color, alpha) {
    this.filling = true;
    this.fillColor = new Color(color || 0);
    if (alpha !== undefined) this.fillColor.a = alpha;
    if (this.currentPath) {
      if (this.currentPath.shape.points.length <= 2) {
        this.currentPath.fill = this.filling;
        this.currentPath.fillColor = this.fillColor;
        // this.currentPath.fillAlpha = this.fillAlpha;
      }
    }
    return this;
  },
  /**
   * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
   *
   * @method endFill
   * @return {Graphics}
   */
  endFill: function endFill() {
    this.filling = false;
    this.fillColor = null;
    // this.fillAlpha = 1;

    return this;
  },
  /**
   * Draws a rectangle.
   *
   * @method drawRect
   *
   * @param x {Number} The X coord of the top-left of the rectangle
   * @param y {Number} The Y coord of the top-left of the rectangle
   * @param width {Number} The width of the rectangle
   * @param height {Number} The height of the rectangle
   * @return {Graphics}
   */
  drawRect: function drawRect(x, y, width, height) {
    this.drawShape(new Rectangle(x, y, width, height));
    return this;
  },
  /**
   * Draws a rounded rectangle.
   *
   * @method drawRoundedRect
   *
   * @param x {Number} The X coord of the top-left of the rectangle
   * @param y {Number} The Y coord of the top-left of the rectangle
   * @param width {Number} The width of the rectangle
   * @param height {Number} The height of the rectangle
   * @param radius {Number} Radius of the rectangle corners
   * @return {Graphics}
   */
  drawRoundedRect: function drawRoundedRect(x, y, width, height, radius) {
    this.drawShape(new RoundedRectangle(x, y, width, height, radius));
    return this;
  },
  /**
   * Draws a circle.
   *
   * @method drawCircle
   * @param x {Number} The X coordinate of the center of the circle
   * @param y {Number} The Y coordinate of the center of the circle
   * @param radius {Number} The radius of the circle
   * @return {Graphics}
   */
  drawCircle: function drawCircle(x, y, radius) {
    this.drawShape(new Circle(x, y, radius));
    return this;
  },
  /**
   * Draws an ellipse.
   *
   * @param {number} x - The X coordinate of the center of the ellipse
   * @param {number} y - The Y coordinate of the center of the ellipse
   * @param {number} width - The half width of the ellipse
   * @param {number} height - The half height of the ellipse
   * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
   */
  drawEllipse: function drawEllipse(x, y, width, height) {
    this.drawShape(new Ellipse(x, y, width, height));
    return this;
  },
  /**
   * Draws a polygon using the given path.
   *
   * @method drawPolygon
   * @param path {Array} The path data used to construct the polygon.
   * @return {Graphics}
   */
  drawPolygon: function drawPolygon(path) {
    if (!(path instanceof Array)) path = Array.prototype.slice.call(arguments);
    this.drawShape(new Polygon(path));
    return this;
  },
  /**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
   *
   * @method clear
   * @return {Graphics}
   */
  clear: function clear() {
    this.lineWidth = 0;
    this.filling = false;
    this.alignment = 0.5;
    this.dirty++;
    this.clearDirty++;
    this.graphicsData = [];
    return this;
  },
  /**
   * Adds a hole in the current path.
   *
   * @return {PIXI.Graphics} Returns itself.
   */
  // addHole: function () {
  //     // this is a hole!
  //     const hole = this.graphicsData.pop();

  //     this.currentPath = this.graphicsData[this.graphicsData.length - 1];

  //     this.currentPath.addHole(hole.shape);
  //     this.currentPath = null;

  //     return this;
  // },

  _render: function _render(renderer) {
    // if the sprite is not visible or the alpha is 0 then no need to render this element
    // if (this.dirty !== this.fastRectDirty)
    // {
    //     this.fastRectDirty = this.dirty;
    //     this._fastRect = this.isFastRect();
    // }

    // TODO this check can be moved to dirty?
    if (this._fastRect) {
      this._renderSpriteRect(renderer);
    } else {
      renderer.setObjectRenderer(renderer.systems.graphics);
      renderer.systems.graphics.render(this);
    }
  },
  /**
   * Renders the object using the WebGL renderer
   *
   * @method render
   * @param renderer {RenderSession}
   * @private
   */
  // render: function (renderer) {
  //     // if the sprite is not visible or the alpha is 0 then no need to render this element
  //     if (this.visible === false || this.alpha === 0 || this.isMask === true) return;

  //     if (this._cacheAsBitmap) {
  //         if (this.dirty || this.cachedSpriteDirty) {
  //             this._generateCachedSprite();

  //             // we will also need to update the texture on the gpu too!
  //             this.updateCachedSpriteTexture();

  //             this.cachedSpriteDirty = false;
  //             this.dirty = false;
  //         }

  //         this._cachedSprite.worldOpacity = this.worldOpacity;
  //         Sprite.prototype.render.call(this._cachedSprite, renderer);

  //         return;
  //     } else {
  //         renderer.spriteBatch.stop();
  //         renderer.blendModeManager.setBlendMode(this.blendMode);

  //         if (this._mask) renderer.maskManager.pushMask(this._mask, renderer);
  //         if (this._filters) renderer.filterManager.pushFilter(this._filterBlock);

  //         // check blend mode
  //         if (this.blendMode !== renderer.spriteBatch.currentBlendMode) {
  //             renderer.spriteBatch.currentBlendMode = this.blendMode;
  //             var blendModeWebGL = renderer.blendModes[renderer.spriteBatch.currentBlendMode];
  //             renderer.spriteBatch.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
  //         }

  //         // check if the webgl graphic needs to be updated
  //         if (this.webGLDirty) {
  //             this.dirty++;
  //             this.webGLDirty = false;
  //         }

  //         Tiny.WebGLGraphics.renderGraphics(this, renderer);

  //         // only render if it has children!
  //         if (this.children.length) {
  //             renderer.spriteBatch.start();

  //             // simple render children!
  //             for (var i = 0, j = this.children.length; i < j; i++) {
  //                 this.children[i].render(renderer);
  //             }

  //             renderer.spriteBatch.stop();
  //         }

  //         if (this._filters) renderer.filterManager.popFilter();
  //         if (this._mask) renderer.maskManager.popMask(this.mask, renderer);

  //         renderer.drawCount++;

  //         renderer.spriteBatch.start();
  //     }
  // },

  /**
   * Closes the current path.
   *
   * @return {PIXI.Graphics} Returns itself.
   */
  closePath: function closePath() {
    // ok so close path assumes next one is a hole!
    var currentPath = this.currentPath;
    if (currentPath && currentPath.shape) {
      currentPath.shape.close();
    }
    return this;
  },
  /**
   * Retrieves the bounds of the graphic shape as a rectangle object
   *
   * @method getBounds
   * @return {Rectangle} the rectangular bounding area
   */
  getBounds: function getBounds(matrix) {
    // return an empty object if the item is a mask!
    if (this.isMask) return EmptyRectangle;
    if (this.dirty) {
      this.updateLocalBounds();
      this.cachedSpriteDirty = true;
      this.dirty = false;
    }
    var bounds = this._localBounds;
    var w0 = bounds.x;
    var w1 = bounds.width + bounds.x;
    var h0 = bounds.y;
    var h1 = bounds.height + bounds.y;
    var worldTransform = matrix || this.worldTransform;
    var a = worldTransform.a;
    var b = worldTransform.b;
    var c = worldTransform.c;
    var d = worldTransform.d;
    var tx = worldTransform.tx;
    var ty = worldTransform.ty;
    var x1 = a * w1 + c * h1 + tx;
    var y1 = d * h1 + b * w1 + ty;
    var x2 = a * w0 + c * h1 + tx;
    var y2 = d * h1 + b * w0 + ty;
    var x3 = a * w0 + c * h0 + tx;
    var y3 = d * h0 + b * w0 + ty;
    var x4 = a * w1 + c * h0 + tx;
    var y4 = d * h0 + b * w1 + ty;
    var maxX = x1;
    var maxY = y1;
    var minX = x1;
    var minY = y1;
    minX = x2 < minX ? x2 : minX;
    minX = x3 < minX ? x3 : minX;
    minX = x4 < minX ? x4 : minX;
    minY = y2 < minY ? y2 : minY;
    minY = y3 < minY ? y3 : minY;
    minY = y4 < minY ? y4 : minY;
    maxX = x2 > maxX ? x2 : maxX;
    maxX = x3 > maxX ? x3 : maxX;
    maxX = x4 > maxX ? x4 : maxX;
    maxY = y2 > maxY ? y2 : maxY;
    maxY = y3 > maxY ? y3 : maxY;
    maxY = y4 > maxY ? y4 : maxY;
    this._bounds.x = minX;
    this._bounds.width = maxX - minX;
    this._bounds.y = minY;
    this._bounds.height = maxY - minY;
    return this._bounds;
  },
  /**
   * Update the bounds of the object
   *
   * @method updateLocalBounds
   */
  updateLocalBounds: function updateLocalBounds() {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    if (this.graphicsData.length) {
      var shape, points, x, y, w, h;
      for (var i = 0; i < this.graphicsData.length; i++) {
        var data = this.graphicsData[i];
        var type = data.type;
        var lineOffset = data.lineWidth * data.alignment;
        shape = data.shape;
        if (type === RectangleShape || type === RoundedRectangleShape || type === EllipseShape) {
          x = shape.x - lineOffset;
          y = shape.y - lineOffset;
          w = shape.width + lineOffset * 2;
          h = shape.height + lineOffset * 2;
          minX = x < minX ? x : minX;
          maxX = x + w > maxX ? x + w : maxX;
          minY = y < minY ? y : minY;
          maxY = y + h > maxY ? y + h : maxY;
        } else if (type === CircleShape) {
          x = shape.x;
          y = shape.y;
          w = shape.radius + lineOffset;
          h = shape.radius + lineOffset;
          minX = x - w < minX ? x - w : minX;
          maxX = x + w > maxX ? x + w : maxX;
          minY = y - h < minY ? y - h : minY;
          maxY = y + h > maxY ? y + h : maxY;
          // } else if (type === EllipseShape) {
          //     x = shape.x;
          //     y = shape.y;
          //     w = shape.width + lineOffset;
          //     h = shape.height + lineOffset;

          //     minX = x - w < minX ? x - w : minX;
          //     maxX = x + w > maxX ? x + w : maxX;

          //     minY = y - h < minY ? y - h : minY;
          //     maxY = y + h > maxY ? y + h : maxY;
        } else {
          // POLY
          var _points = shape.points;
          var x2 = 0;
          var y2 = 0;
          var dx = 0;
          var dy = 0;
          var rw = 0;
          var rh = 0;
          var cx = 0;
          var cy = 0;
          h = lineOffset * 2;
          for (var j = 0; j + 2 < _points.length; j += 2) {
            x = _points[j];
            y = _points[j + 1];
            x2 = _points[j + 2];
            y2 = _points[j + 3];
            dx = Math.abs(x2 - x);
            dy = Math.abs(y2 - y);
            w = Math.sqrt(dx * dx + dy * dy);
            if (w < 1e-9) {
              continue;
            }
            rw = (h / w * dy + dx) / 2;
            rh = (h / w * dx + dy) / 2;
            cx = (x2 + x) / 2;
            cy = (y2 + y) / 2;
            minX = cx - rw < minX ? cx - rw : minX;
            maxX = cx + rw > maxX ? cx + rw : maxX;
            minY = cy - rh < minY ? cy - rh : minY;
            maxY = cy + rh > maxY ? cy + rh : maxY;
          }
        }

        /**
         * Old method to calculate points bounds
         */
        // else {
        //     // POLY
        //     points = shape.points;
        //     let h = lineOffset * 2;

        //     for (var j = 0; j < points.length; j += 2) {
        //         x = points[j];
        //         y = points[j + 1];
        //         minX = x - h < minX ? x - h : minX;
        //         maxX = x + h > maxX ? x + h : maxX;

        //         minY = y - h < minY ? y - h : minY;
        //         maxY = y + h > maxY ? y + h : maxY;
        //     }
        // }
      }
    } else {
      minX = 0;
      maxX = 0;
      minY = 0;
      maxY = 0;
    }
    var padding = this.boundsPadding;
    this._localBounds.x = minX - padding;
    this._localBounds.width = maxX - minX + padding * 2;
    this._localBounds.y = minY - padding;
    this._localBounds.height = maxY - minY + padding * 2;
  },
  /**
   * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
   *
   * @method drawShape
   * @param {Circle|Rectangle|Ellipse|Line|Polygon} shape The Shape object to draw.
   * @return {GraphicsData} The generated GraphicsData object.
   */
  drawShape: function drawShape(shape) {
    if (this.currentPath) {
      // check current path!
      if (this.currentPath.shape.points.length <= 2) this.graphicsData.pop();
    }
    this.currentPath = null;

    // if (shape.type === PolygonShape) {
    //     shape.flatten();
    // }

    var data = new GraphicsData(this.lineWidth, this.lineColor, this.fillColor, this.filling, this.alignment, shape);
    this.graphicsData.push(data);
    if (data.type === PolygonShape) {
      // data.shape.closed = this.filling;
      this.currentPath = data;
    }
    this.dirty++;
    return data;
  }
});

;// ./src/textures/TextureUvs.js
var TextureUvs = function TextureUvs() {
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = 0;
  this.x3 = 0;
  this.y3 = 0;
};

;// ./src/textures/RenderTexture.js




var RenderTexture = function RenderTexture(width, height, renderer, resolution) {
  this.width = width || 100;
  this.height = height || 100;

  // console.log(this);
  resolution = resolution || 1;

  // this.frame = new Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);

  // this.crop = new Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);

  this.textureBuffer = new CanvasBuffer(this.width * resolution, this.height * resolution);
  this.base = new BaseTexture(this.textureBuffer.canvas);
  this.base.width = this.width * this.resolution;
  this.base.height = this.height * this.resolution;
  this.base.resolution = resolution;
  this.base.valid = true;
  _Texture.call(this, this.base, new Rectangle(0, 0, Math.floor(this.width * resolution), Math.floor(this.height * resolution)));
  this.resolution = resolution;

  // this.hasLoaded = true;

  this.renderer = renderer || Tiny.defaultRenderer;
  this.valid = true;
};
RenderTexture.prototype = Object.create(_Texture.prototype);
RenderTexture.prototype.constructor = RenderTexture;
RenderTexture.prototype.resize = function (width, height, updateBase) {
  if (width === this.width && height === this.height) return;
  this.valid = width > 0 && height > 0;
  this.width = width;
  this.height = height;
  this.frame.width = this.crop.width = width * this.resolution;
  this.frame.height = this.crop.height = height * this.resolution;
  if (updateBase) {
    // this.baseTexture.width = this.width * this.resolution;
    // this.baseTexture.height = this.height * this.resolution;
  }
  if (!this.valid) return;
  this.textureBuffer.resize(this.width * this.resolution, this.height * this.resolution);
};
RenderTexture.prototype.clear = function () {
  if (!this.valid) return;
  this.textureBuffer.clear();
};
RenderTexture.prototype.render = function (displayObject, matrix, clear) {
  if (!this.valid) return;
  var wt = displayObject.worldTransform;
  wt.identity();
  if (matrix) wt.append(matrix);

  // setWorld Alpha to ensure that the object is renderer at full opacity
  displayObject.worldAlpha = 1;

  // Time to update all the children of the displayObject with the new matrix..
  var children = displayObject.children;
  for (var i = 0, j = children.length; i < j; i++) {
    children[i].updateTransform();
  }
  if (clear) this.textureBuffer.clear();
  var context = this.textureBuffer.context;
  var realResolution = this.renderer.resolution;
  this.renderer.resolution = this.resolution;
  this.renderer.renderObject(displayObject, context);
  this.renderer.resolution = realResolution;
};
RenderTexture.prototype.getImage = function () {
  var image = new Image();
  image.src = this.getBase64();
  return image;
};
RenderTexture.prototype.getBase64 = function () {
  return this.getCanvas().toDataURL();
};
RenderTexture.prototype.getCanvas = function () {
  return this.textureBuffer.canvas;
};

;// ./src/2d.js











Tiny.Entity2D = Entity2D;
Tiny.Object2D = Object2D;
Tiny.Scene = Scene;
Tiny.Sprite = Sprite;
Tiny.Text = _Text;
Tiny.Graphics = Graphics;
Tiny.BaseTexture = BaseTexture;
Tiny.TextureUvs = TextureUvs;
Tiny.Texture = _Texture;
Tiny.RenderTexture = RenderTexture;
Tiny.Rectangle = Rectangle;
;// ./packages/2d/index.js



}();
/******/ })()
;