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
;// ./src/math/Mat4.js

var _v1 = new Vec3();
var _m1 = new Mat4();
var _zero = new Vec3(0, 0, 0);
var _one = new Vec3(1, 1, 1);
var _x = new Vec3();
var _y = new Vec3();
var _z = new Vec3();

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */

function Mat4() {
  this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  if (arguments.length > 0) {
    console.error('Tiny.Matrix4: the constructor no longer reads arguments. use .set() instead.');
  }
}
Object.assign(Mat4.prototype, {
  isMat4: true,
  set: function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    var te = this.elements;
    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  },
  identity: function identity() {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  clone: function clone() {
    return new Mat4().fromArray(this.elements);
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
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];
    return this;
  },
  copyPosition: function copyPosition(m) {
    var te = this.elements,
      me = m.elements;
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    return this;
  },
  extractBasis: function extractBasis(xAxis, yAxis, zAxis) {
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);
    return this;
  },
  makeBasis: function makeBasis(xAxis, yAxis, zAxis) {
    this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
    return this;
  },
  extractRotation: function extractRotation(m) {
    // this method does not support reflection matrices

    var te = this.elements;
    var me = m.elements;
    var scaleX = 1 / _v1.setFromMatrixColumn(m, 0).length();
    var scaleY = 1 / _v1.setFromMatrixColumn(m, 1).length();
    var scaleZ = 1 / _v1.setFromMatrixColumn(m, 2).length();
    te[0] = me[0] * scaleX;
    te[1] = me[1] * scaleX;
    te[2] = me[2] * scaleX;
    te[3] = 0;
    te[4] = me[4] * scaleY;
    te[5] = me[5] * scaleY;
    te[6] = me[6] * scaleY;
    te[7] = 0;
    te[8] = me[8] * scaleZ;
    te[9] = me[9] * scaleZ;
    te[10] = me[10] * scaleZ;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  },
  makeRotationFromEuler: function makeRotationFromEuler(euler) {
    if (!(euler && euler.isEuler)) {
      console.error('Tiny.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
    }
    var te = this.elements;
    var x = euler.x,
      y = euler.y,
      z = euler.z;
    var a = Math.cos(x),
      b = Math.sin(x);
    var c = Math.cos(y),
      d = Math.sin(y);
    var e = Math.cos(z),
      f = Math.sin(z);
    if (euler.order === 'XYZ') {
      var ae = a * e,
        af = a * f,
        be = b * e,
        bf = b * f;
      te[0] = c * e;
      te[4] = -c * f;
      te[8] = d;
      te[1] = af + be * d;
      te[5] = ae - bf * d;
      te[9] = -b * c;
      te[2] = bf - ae * d;
      te[6] = be + af * d;
      te[10] = a * c;
    } else if (euler.order === 'YXZ') {
      var ce = c * e,
        cf = c * f,
        de = d * e,
        df = d * f;
      te[0] = ce + df * b;
      te[4] = de * b - cf;
      te[8] = a * d;
      te[1] = a * f;
      te[5] = a * e;
      te[9] = -b;
      te[2] = cf * b - de;
      te[6] = df + ce * b;
      te[10] = a * c;
    } else if (euler.order === 'ZXY') {
      var ce = c * e,
        cf = c * f,
        de = d * e,
        df = d * f;
      te[0] = ce - df * b;
      te[4] = -a * f;
      te[8] = de + cf * b;
      te[1] = cf + de * b;
      te[5] = a * e;
      te[9] = df - ce * b;
      te[2] = -a * d;
      te[6] = b;
      te[10] = a * c;
    } else if (euler.order === 'ZYX') {
      var ae = a * e,
        af = a * f,
        be = b * e,
        bf = b * f;
      te[0] = c * e;
      te[4] = be * d - af;
      te[8] = ae * d + bf;
      te[1] = c * f;
      te[5] = bf * d + ae;
      te[9] = af * d - be;
      te[2] = -d;
      te[6] = b * c;
      te[10] = a * c;
    } else if (euler.order === 'YZX') {
      var ac = a * c,
        ad = a * d,
        bc = b * c,
        bd = b * d;
      te[0] = c * e;
      te[4] = bd - ac * f;
      te[8] = bc * f + ad;
      te[1] = f;
      te[5] = a * e;
      te[9] = -b * e;
      te[2] = -d * e;
      te[6] = ad * f + bc;
      te[10] = ac - bd * f;
    } else if (euler.order === 'XZY') {
      var ac = a * c,
        ad = a * d,
        bc = b * c,
        bd = b * d;
      te[0] = c * e;
      te[4] = -f;
      te[8] = d * e;
      te[1] = ac * f + bd;
      te[5] = a * e;
      te[9] = ad * f - bc;
      te[2] = bc * f - ad;
      te[6] = b * e;
      te[10] = bd * f + ac;
    }

    // bottom row
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;

    // last column
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  },
  makeRotationFromQuat: function makeRotationFromQuat(q) {
    return this.compose(_zero, q, _one);
  },
  lookAt: function lookAt(eye, target, up) {
    var te = this.elements;
    _z.sub2(eye, target);
    if (_z.lengthSq() === 0) {
      // eye and target are in the same position

      _z.z = 1;
    }
    _z.normalize();
    _x.crossVectors(up, _z);
    if (_x.lengthSq() === 0) {
      // up and z are parallel

      if (Math.abs(up.z) === 1) {
        _z.x += 0.0001;
      } else {
        _z.z += 0.0001;
      }
      _z.normalize();
      _x.crossVectors(up, _z);
    }
    _x.normalize();
    _y.crossVectors(_z, _x);
    te[0] = _x.x;
    te[4] = _y.x;
    te[8] = _z.x;
    te[1] = _x.y;
    te[5] = _y.y;
    te[9] = _z.y;
    te[2] = _x.z;
    te[6] = _y.z;
    te[10] = _z.z;
    return this;
  },
  mul: function mul(m) {
    return this.mul2(this, m);
  },
  premul: function premul(m) {
    return this.mul2(m, this);
  },
  mul2: function mul2(a, b) {
    var ae = a.elements;
    var be = b.elements;
    var te = this.elements;
    var a11 = ae[0],
      a12 = ae[4],
      a13 = ae[8],
      a14 = ae[12];
    var a21 = ae[1],
      a22 = ae[5],
      a23 = ae[9],
      a24 = ae[13];
    var a31 = ae[2],
      a32 = ae[6],
      a33 = ae[10],
      a34 = ae[14];
    var a41 = ae[3],
      a42 = ae[7],
      a43 = ae[11],
      a44 = ae[15];
    var b11 = be[0],
      b12 = be[4],
      b13 = be[8],
      b14 = be[12];
    var b21 = be[1],
      b22 = be[5],
      b23 = be[9],
      b24 = be[13];
    var b31 = be[2],
      b32 = be[6],
      b33 = be[10],
      b34 = be[14];
    var b41 = be[3],
      b42 = be[7],
      b43 = be[11],
      b44 = be[15];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return this;
  },
  mulScalar: function mulScalar(s) {
    var te = this.elements;
    te[0] *= s;
    te[4] *= s;
    te[8] *= s;
    te[12] *= s;
    te[1] *= s;
    te[5] *= s;
    te[9] *= s;
    te[13] *= s;
    te[2] *= s;
    te[6] *= s;
    te[10] *= s;
    te[14] *= s;
    te[3] *= s;
    te[7] *= s;
    te[11] *= s;
    te[15] *= s;
    return this;
  },
  applyToBufferAttribute: function applyToBufferAttribute(attribute) {
    for (var i = 0, l = attribute.count; i < l; i++) {
      _v1.x = attribute.getX(i);
      _v1.y = attribute.getY(i);
      _v1.z = attribute.getZ(i);
      _v1.applyMat4(this);
      attribute.setXYZ(i, _v1.x, _v1.y, _v1.z);
    }
    return attribute;
  },
  determinant: function determinant() {
    var te = this.elements;
    var n11 = te[0],
      n12 = te[4],
      n13 = te[8],
      n14 = te[12];
    var n21 = te[1],
      n22 = te[5],
      n23 = te[9],
      n24 = te[13];
    var n31 = te[2],
      n32 = te[6],
      n33 = te[10],
      n34 = te[14];
    var n41 = te[3],
      n42 = te[7],
      n43 = te[11],
      n44 = te[15];

    //TODO: make this more efficient
    //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

    return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
  },
  transpose: function transpose() {
    var te = this.elements;
    var tmp;
    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;
    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;
    return this;
  },
  setPosition: function setPosition(x, y, z) {
    var te = this.elements;
    if (x.isVec3) {
      te[12] = x.x;
      te[13] = x.y;
      te[14] = x.z;
    } else {
      te[12] = x;
      te[13] = y;
      te[14] = z;
    }
    return this;
  },
  getInverse: function getInverse(m, throwOnDegenerate) {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    var te = this.elements,
      me = m.elements,
      n11 = me[0],
      n21 = me[1],
      n31 = me[2],
      n41 = me[3],
      n12 = me[4],
      n22 = me[5],
      n32 = me[6],
      n42 = me[7],
      n13 = me[8],
      n23 = me[9],
      n33 = me[10],
      n43 = me[11],
      n14 = me[12],
      n24 = me[13],
      n34 = me[14],
      n44 = me[15],
      t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
      t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
      t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
      t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
    if (det === 0) {
      var msg = "Tiny.Matrix4: .getInverse() can't invert matrix, determinant is 0";
      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }
      return this.identity();
    }
    var detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
    return this;
  },
  scale: function scale(v) {
    var te = this.elements;
    var x = v.x,
      y = v.y,
      z = v.z;
    te[0] *= x;
    te[4] *= y;
    te[8] *= z;
    te[1] *= x;
    te[5] *= y;
    te[9] *= z;
    te[2] *= x;
    te[6] *= y;
    te[10] *= z;
    te[3] *= x;
    te[7] *= y;
    te[11] *= z;
    return this;
  },
  getMaxScaleOnAxis: function getMaxScaleOnAxis() {
    var te = this.elements;
    var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
    var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
    var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  },
  makeTranslation: function makeTranslation(x, y, z) {
    this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    return this;
  },
  makeRotationX: function makeRotationX(theta) {
    var c = Math.cos(theta),
      s = Math.sin(theta);
    this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationY: function makeRotationY(theta) {
    var c = Math.cos(theta),
      s = Math.sin(theta);
    this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationZ: function makeRotationZ(theta) {
    var c = Math.cos(theta),
      s = Math.sin(theta);
    this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationAxis: function makeRotationAxis(axis, angle) {
    // Based on http://www.gamedev.net/reference/articles/article1199.asp

    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var t = 1 - c;
    var x = axis.x,
      y = axis.y,
      z = axis.z;
    var tx = t * x,
      ty = t * y;
    this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
    return this;
  },
  makeScale: function makeScale(x, y, z) {
    this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    return this;
  },
  makeShear: function makeShear(x, y, z) {
    this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);
    return this;
  },
  compose: function compose(position, quaternion, scale) {
    var te = this.elements;
    var x = quaternion._x,
      y = quaternion._y,
      z = quaternion._z,
      w = quaternion._w;
    var x2 = x + x,
      y2 = y + y,
      z2 = z + z;
    var xx = x * x2,
      xy = x * y2,
      xz = x * z2;
    var yy = y * y2,
      yz = y * z2,
      zz = z * z2;
    var wx = w * x2,
      wy = w * y2,
      wz = w * z2;
    var sx = scale.x,
      sy = scale.y,
      sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
  },
  decompose: function decompose(position, quaternion, scale) {
    var te = this.elements;
    var sx = _v1.set(te[0], te[1], te[2]).length();
    var sy = _v1.set(te[4], te[5], te[6]).length();
    var sz = _v1.set(te[8], te[9], te[10]).length();

    // if determine is negative, we need to invert one scale
    var det = this.determinant();
    if (det < 0) sx = -sx;
    position.x = te[12];
    position.y = te[13];
    position.z = te[14];

    // scale the rotation part
    _m1.copy(this);
    var invSX = 1 / sx;
    var invSY = 1 / sy;
    var invSZ = 1 / sz;
    _m1.elements[0] *= invSX;
    _m1.elements[1] *= invSX;
    _m1.elements[2] *= invSX;
    _m1.elements[4] *= invSY;
    _m1.elements[5] *= invSY;
    _m1.elements[6] *= invSY;
    _m1.elements[8] *= invSZ;
    _m1.elements[9] *= invSZ;
    _m1.elements[10] *= invSZ;
    quaternion.setFromRotationMatrix(_m1);
    scale.x = sx;
    scale.y = sy;
    scale.z = sz;
    return this;
  },
  makePerspective: function makePerspective(left, right, top, bottom, near, far) {
    if (far === undefined) {
      console.warn('Tiny.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');
    }
    var te = this.elements;
    var x = 2 * near / (right - left);
    var y = 2 * near / (top - bottom);
    var a = (right + left) / (right - left);
    var b = (top + bottom) / (top - bottom);
    var c = -(far + near) / (far - near);
    var d = -2 * far * near / (far - near);
    te[0] = x;
    te[4] = 0;
    te[8] = a;
    te[12] = 0;
    te[1] = 0;
    te[5] = y;
    te[9] = b;
    te[13] = 0;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
    return this;
  },
  makeOrthographic: function makeOrthographic(left, right, top, bottom, near, far) {
    var te = this.elements;
    var w = 1.0 / (right - left);
    var h = 1.0 / (top - bottom);
    var p = 1.0 / (far - near);
    var x = (right + left) * w;
    var y = (top + bottom) * h;
    var z = (far + near) * p;
    te[0] = 2 * w;
    te[4] = 0;
    te[8] = 0;
    te[12] = -x;
    te[1] = 0;
    te[5] = 2 * h;
    te[9] = 0;
    te[13] = -y;
    te[2] = 0;
    te[6] = 0;
    te[10] = -2 * p;
    te[14] = -z;
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
    return this;
  },
  equals: function equals(matrix) {
    var te = this.elements;
    var me = matrix.elements;
    for (var i = 0; i < 16; i++) {
      if (te[i] !== me[i]) return false;
    }
    return true;
  },
  fromArray: function fromArray(array, offset) {
    if (offset === undefined) offset = 0;
    for (var i = 0; i < 16; i++) {
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
    array[offset + 9] = te[9];
    array[offset + 10] = te[10];
    array[offset + 11] = te[11];
    array[offset + 12] = te[12];
    array[offset + 13] = te[13];
    array[offset + 14] = te[14];
    array[offset + 15] = te[15];
    return array;
  }
});

;// ./src/math/Box3.js

var _points = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
var Box3_vector = new Vec3();
var _box = new Box3();

// triangle centered vertices

var _v0 = new Vec3();
var Box3_v1 = new Vec3();
var _v2 = new Vec3();

// triangle edge vectors

var _f0 = new Vec3();
var _f1 = new Vec3();
var _f2 = new Vec3();
var _center = new Vec3();
var _extents = new Vec3();
var _triangleNormal = new Vec3();
var _testAxis = new Vec3();

/**
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */

function Box3(min, max) {
  this.min = min !== undefined ? min : new Vec3(+Infinity, +Infinity, +Infinity);
  this.max = max !== undefined ? max : new Vec3(-Infinity, -Infinity, -Infinity);
}
Object.assign(Box3.prototype, {
  isBox3: true,
  set: function set(min, max) {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  },
  setFromArray: function setFromArray(array) {
    var minX = +Infinity;
    var minY = +Infinity;
    var minZ = +Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var maxZ = -Infinity;
    for (var i = 0, l = array.length; i < l; i += 3) {
      var x = array[i];
      var y = array[i + 1];
      var z = array[i + 2];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }
    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);
    return this;
  },
  setFromBufferAttribute: function setFromBufferAttribute(attribute) {
    var minX = +Infinity;
    var minY = +Infinity;
    var minZ = +Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var maxZ = -Infinity;
    for (var i = 0, l = attribute.count; i < l; i++) {
      var x = attribute.getX(i);
      var y = attribute.getY(i);
      var z = attribute.getZ(i);
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }
    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);
    return this;
  },
  setFromPoints: function setFromPoints(points) {
    this.makeEmpty();
    for (var i = 0, il = points.length; i < il; i++) {
      this.expandByPoint(points[i]);
    }
    return this;
  },
  setFromCenterAndSize: function setFromCenterAndSize(center, size) {
    var halfSize = Box3_vector.copy(size).mulScalar(0.5);
    this.min.copy(center).sub(halfSize);
    this.max.copy(center).add(halfSize);
    return this;
  },
  setFromObject: function setFromObject(object) {
    this.makeEmpty();
    return this.expandByObject(object);
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(box) {
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  },
  makeEmpty: function makeEmpty() {
    this.min.x = this.min.y = this.min.z = +Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  },
  isEmpty: function isEmpty() {
    // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  },
  getCenter: function getCenter(target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .getCenter() target is now required');
      target = new Vec3();
    }
    return this.isEmpty() ? target.set(0, 0, 0) : target.add2(this.min, this.max).mulScalar(0.5);
  },
  getSize: function getSize(target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .getSize() target is now required');
      target = new Vec3();
    }
    return this.isEmpty() ? target.set(0, 0, 0) : target.sub2(this.max, this.min);
  },
  expandByPoint: function expandByPoint(point) {
    this.min.min(point);
    this.max.max(point);
    return this;
  },
  expandByVector: function expandByVector(vector) {
    this.min.sub(vector);
    this.max.add(vector);
    return this;
  },
  expandByScalar: function expandByScalar(scalar) {
    this.min.addScalar(-scalar);
    this.max.addScalar(scalar);
    return this;
  },
  expandByObject: function expandByObject(object) {
    // Computes the world-axis-aligned bounding box of an object (including its children),
    // accounting for both the object's, and children's, world transforms

    object.updateWorldMatrix(false, false);
    var geometry = object.geometry;
    if (geometry !== undefined) {
      if (geometry.boundingBox === null) {
        geometry.computeBoundingBox();
      }
      _box.copy(geometry.boundingBox);
      _box.applyMat4(object.matrixWorld);
      this.expandByPoint(_box.min);
      this.expandByPoint(_box.max);
    }
    var children = object.children;
    for (var i = 0, l = children.length; i < l; i++) {
      this.expandByObject(children[i]);
    }
    return this;
  },
  containsPoint: function containsPoint(point) {
    return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
  },
  containsBox: function containsBox(box) {
    return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
  },
  getParameter: function getParameter(point, target) {
    // This can potentially have a divide by zero if the box
    // has a size dimension of 0.

    if (target === undefined) {
      console.warn('THREE.Box3: .getParameter() target is now required');
      target = new Vec3();
    }
    return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
  },
  intersectsBox: function intersectsBox(box) {
    // using 6 splitting planes to rule out intersections.
    return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
  },
  intersectsSphere: function intersectsSphere(sphere) {
    // Find the point on the AABB closest to the sphere center.
    this.clampPoint(sphere.center, Box3_vector);

    // If that point is inside the sphere, the AABB and sphere intersect.
    return Box3_vector.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
  },
  intersectsPlane: function intersectsPlane(plane) {
    // We compute the minimum and maximum dot product values. If those values
    // are on the same side (back or front) of the plane, then there is no intersection.

    var min, max;
    if (plane.normal.x > 0) {
      min = plane.normal.x * this.min.x;
      max = plane.normal.x * this.max.x;
    } else {
      min = plane.normal.x * this.max.x;
      max = plane.normal.x * this.min.x;
    }
    if (plane.normal.y > 0) {
      min += plane.normal.y * this.min.y;
      max += plane.normal.y * this.max.y;
    } else {
      min += plane.normal.y * this.max.y;
      max += plane.normal.y * this.min.y;
    }
    if (plane.normal.z > 0) {
      min += plane.normal.z * this.min.z;
      max += plane.normal.z * this.max.z;
    } else {
      min += plane.normal.z * this.max.z;
      max += plane.normal.z * this.min.z;
    }
    return min <= -plane.constant && max >= -plane.constant;
  },
  intersectsTriangle: function intersectsTriangle(triangle) {
    if (this.isEmpty()) {
      return false;
    }

    // compute box center and extents
    this.getCenter(_center);
    _extents.sub2(this.max, _center);

    // translate triangle to aabb origin
    _v0.sub2(triangle.a, _center);
    Box3_v1.sub2(triangle.b, _center);
    _v2.sub2(triangle.c, _center);

    // compute edge vectors for triangle
    _f0.sub2(Box3_v1, _v0);
    _f1.sub2(_v2, Box3_v1);
    _f2.sub2(_v0, _v2);

    // test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
    // make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
    // axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
    var axes = [0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y, _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x, -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0];
    if (!satForAxes(axes, _v0, Box3_v1, _v2, _extents)) {
      return false;
    }

    // test 3 face normals from the aabb
    axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (!satForAxes(axes, _v0, Box3_v1, _v2, _extents)) {
      return false;
    }

    // finally testing the face normal of the triangle
    // use already existing triangle edge vectors here
    _triangleNormal.crossVectors(_f0, _f1);
    axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
    return satForAxes(axes, _v0, Box3_v1, _v2, _extents);
  },
  clampPoint: function clampPoint(point, target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .clampPoint() target is now required');
      target = new Vec3();
    }
    return target.copy(point).clamp(this.min, this.max);
  },
  distanceToPoint: function distanceToPoint(point) {
    var clampedPoint = Box3_vector.copy(point).clamp(this.min, this.max);
    return clampedPoint.sub(point).length();
  },
  getBoundingSphere: function getBoundingSphere(target) {
    if (target === undefined) {
      console.error('THREE.Box3: .getBoundingSphere() target is now required');
      //target = new Sphere(); // removed to avoid cyclic dependency
    }
    this.getCenter(target.center);
    target.radius = this.getSize(Box3_vector).length() * 0.5;
    return target;
  },
  intersect: function intersect(box) {
    this.min.max(box.min);
    this.max.min(box.max);

    // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
    if (this.isEmpty()) this.makeEmpty();
    return this;
  },
  union: function union(box) {
    this.min.min(box.min);
    this.max.max(box.max);
    return this;
  },
  applyMat4: function applyMat4(matrix) {
    // transform of empty box is an empty box.
    if (this.isEmpty()) return this;

    // NOTE: I am using a binary pattern to specify all 2^3 combinations below
    _points[0].set(this.min.x, this.min.y, this.min.z).applyMat4(matrix); // 000
    _points[1].set(this.min.x, this.min.y, this.max.z).applyMat4(matrix); // 001
    _points[2].set(this.min.x, this.max.y, this.min.z).applyMat4(matrix); // 010
    _points[3].set(this.min.x, this.max.y, this.max.z).applyMat4(matrix); // 011
    _points[4].set(this.max.x, this.min.y, this.min.z).applyMat4(matrix); // 100
    _points[5].set(this.max.x, this.min.y, this.max.z).applyMat4(matrix); // 101
    _points[6].set(this.max.x, this.max.y, this.min.z).applyMat4(matrix); // 110
    _points[7].set(this.max.x, this.max.y, this.max.z).applyMat4(matrix); // 111

    this.setFromPoints(_points);
    return this;
  },
  translate: function translate(offset) {
    this.min.add(offset);
    this.max.add(offset);
    return this;
  },
  equals: function equals(box) {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
});
function satForAxes(axes, v0, v1, v2, extents) {
  var i, j;
  for (i = 0, j = axes.length - 3; i <= j; i += 3) {
    _testAxis.fromArray(axes, i);
    // project the aabb onto the seperating axis
    var r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
    // project all 3 vertices of the triangle onto the seperating axis
    var p0 = v0.dot(_testAxis);
    var p1 = v1.dot(_testAxis);
    var p2 = v2.dot(_testAxis);
    // actual test, basically see if either of the most extreme of the triangle points intersects r
    if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
      // points of the projected triangle are outside the projected half-length of the aabb
      // the axis is seperating and we can exit
      return false;
    }
  }
  return true;
}

;// ./src/math/Vec4.js
/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

function Vec4(x, y, z, w) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = w !== undefined ? w : 1;
}
Object.defineProperties(Vec4.prototype, {
  "width": {
    get: function get() {
      return this.z;
    },
    set: function set(value) {
      this.z = value;
    }
  },
  "height": {
    get: function get() {
      return this.w;
    },
    set: function set(value) {
      this.w = value;
    }
  }
});
Object.assign(Vec4.prototype, {
  isVec4: true,
  set: function set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  },
  setScalar: function setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    this.w = scalar;
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
  setW: function setW(w) {
    this.w = w;
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
      case 3:
        this.w = value;
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
      case 3:
        return this.w;
      default:
        throw new Error('index is out of range: ' + index);
    }
  },
  clone: function clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  },
  copy: function copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w !== undefined ? v.w : 1;
    return this;
  },
  add: function add(v, w) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  },
  addScalar: function addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;
    return this;
  },
  add2: function add2(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this;
  },
  addScaledVector: function addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    this.w += v.w * s;
    return this;
  },
  sub: function sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  },
  subScalar: function subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;
    return this;
  },
  sub2: function sub2(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
    return this;
  },
  mulScalar: function mulScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  },
  applyMat4: function applyMat4(m) {
    var x = this.x,
      y = this.y,
      z = this.z,
      w = this.w;
    var e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
    this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
    return this;
  },
  divideScalar: function divideScalar(scalar) {
    return this.mulScalar(1 / scalar);
  },
  setAxisAngleFromQuaternion: function setAxisAngleFromQuaternion(q) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

    // q is assumed to be normalized

    this.w = 2 * Math.acos(q.w);
    var s = Math.sqrt(1 - q.w * q.w);
    if (s < 0.0001) {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    } else {
      this.x = q.x / s;
      this.y = q.y / s;
      this.z = q.z / s;
    }
    return this;
  },
  setAxisAngleFromRotationMatrix: function setAxisAngleFromRotationMatrix(m) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var angle,
      x,
      y,
      z,
      // variables for result
      epsilon = 0.01,
      // margin to allow for rounding errors
      epsilon2 = 0.1,
      // margin to distinguish between 0 and 180 degrees

      te = m.elements,
      m11 = te[0],
      m12 = te[4],
      m13 = te[8],
      m21 = te[1],
      m22 = te[5],
      m23 = te[9],
      m31 = te[2],
      m32 = te[6],
      m33 = te[10];
    if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
      // singularity found
      // first check for identity matrix which must have +1 for all terms
      // in leading diagonal and zero in other terms

      if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
        // this singularity is identity matrix so angle = 0

        this.set(1, 0, 0, 0);
        return this; // zero angle, arbitrary axis
      }

      // otherwise this singularity is angle = 180

      angle = Math.PI;
      var xx = (m11 + 1) / 2;
      var yy = (m22 + 1) / 2;
      var zz = (m33 + 1) / 2;
      var xy = (m12 + m21) / 4;
      var xz = (m13 + m31) / 4;
      var yz = (m23 + m32) / 4;
      if (xx > yy && xx > zz) {
        // m11 is the largest diagonal term

        if (xx < epsilon) {
          x = 0;
          y = 0.707106781;
          z = 0.707106781;
        } else {
          x = Math.sqrt(xx);
          y = xy / x;
          z = xz / x;
        }
      } else if (yy > zz) {
        // m22 is the largest diagonal term

        if (yy < epsilon) {
          x = 0.707106781;
          y = 0;
          z = 0.707106781;
        } else {
          y = Math.sqrt(yy);
          x = xy / y;
          z = yz / y;
        }
      } else {
        // m33 is the largest diagonal term so base result on this

        if (zz < epsilon) {
          x = 0.707106781;
          y = 0.707106781;
          z = 0;
        } else {
          z = Math.sqrt(zz);
          x = xz / z;
          y = yz / z;
        }
      }
      this.set(x, y, z, angle);
      return this; // return 180 deg rotation
    }

    // as we have reached here there are no singularities so we can handle normally

    var s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12)); // used to normalize

    if (Math.abs(s) < 0.001) s = 1;

    // prevent divide by zero, should not happen if matrix is orthogonal and should be
    // caught by singularity test above, but I've left it in just in case

    this.x = (m32 - m23) / s;
    this.y = (m13 - m31) / s;
    this.z = (m21 - m12) / s;
    this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
    return this;
  },
  min: function min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    this.w = Math.min(this.w, v.w);
    return this;
  },
  max: function max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    this.w = Math.max(this.w, v.w);
    return this;
  },
  clamp: function clamp(min, max) {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));
    this.w = Math.max(min.w, Math.min(max.w, this.w));
    return this;
  },
  clampScalar: function clampScalar(minVal, maxVal) {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));
    this.w = Math.max(minVal, Math.min(maxVal, this.w));
    return this;
  },
  clampLength: function clampLength(min, max) {
    var length = this.length();
    return this.divideScalar(length || 1).mulScalar(Math.max(min, Math.min(max, length)));
  },
  floor: function floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  },
  ceil: function ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  },
  round: function round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);
    return this;
  },
  roundToZero: function roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
    this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w);
    return this;
  },
  negate: function negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  },
  dot: function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  },
  lengthSq: function lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  },
  length: function length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  },
  manhattanLength: function manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  },
  normalize: function normalize() {
    return this.divideScalar(this.length() || 1);
  },
  setLength: function setLength(length) {
    return this.normalize().mulScalar(length);
  },
  lerp: function lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    this.w += (v.w - this.w) * alpha;
    return this;
  },
  lerpVectors: function lerpVectors(v1, v2, alpha) {
    return this.sub2(v2, v1).mulScalar(alpha).add(v1);
  },
  equals: function equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
  },
  fromArray: function fromArray(array, offset) {
    if (offset === undefined) offset = 0;
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    this.w = array[offset + 3];
    return this;
  },
  toArray: function toArray(array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    array[offset + 3] = this.w;
    return array;
  },
  fromBufferAttribute: function fromBufferAttribute(attribute, index, offset) {
    if (offset !== undefined) {
      console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().');
    }
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    this.w = attribute.getW(index);
    return this;
  }
});

;// ./src/geometries/BufferAttribute.js





var BufferAttribute_vector = new Vec3();
var _vector2 = new Vec2();
function BufferAttribute(array, itemSize, normalized) {
  if (Array.isArray(array)) {
    throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
  }
  this.name = '';
  this.array = array;
  this.itemSize = itemSize;
  this.count = array !== undefined ? array.length / itemSize : 0;
  this.normalized = normalized === true;
  this.usage = StaticDrawUsage;
  this.updateRange = {
    offset: 0,
    count: -1
  };
  this.version = 0;
}
Object.defineProperty(BufferAttribute.prototype, 'needsUpdate', {
  set: function set(value) {
    if (value === true) this.version++;
  }
});
Object.assign(BufferAttribute.prototype, {
  isBufferAttribute: true,
  onUploadCallback: function onUploadCallback() {},
  setUsage: function setUsage(value) {
    this.usage = value;
    return this;
  },
  copy: function copy(source) {
    this.name = source.name;
    this.array = new source.array.constructor(source.array);
    this.itemSize = source.itemSize;
    this.count = source.count;
    this.normalized = source.normalized;
    this.usage = source.usage;
    return this;
  },
  copyAt: function copyAt(index1, attribute, index2) {
    index1 *= this.itemSize;
    index2 *= attribute.itemSize;
    for (var i = 0, l = this.itemSize; i < l; i++) {
      this.array[index1 + i] = attribute.array[index2 + i];
    }
    return this;
  },
  copyArray: function copyArray(array) {
    this.array.set(array);
    return this;
  },
  copyColorsArray: function copyColorsArray(colors) {
    var array = this.array;
    var offset = 0;
    for (var i = 0, l = colors.length; i < l; i++) {
      var color = colors[i];
      if (color === undefined) {
        console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
        color = new Color();
      }
      array[offset++] = color.r;
      array[offset++] = color.g;
      array[offset++] = color.b;
    }
    return this;
  },
  copyVec2sArray: function copyVec2sArray(vectors) {
    var array = this.array;
    var offset = 0;
    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];
      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVec2sArray(): vector is undefined', i);
        vector = new Vec2();
      }
      array[offset++] = vector.x;
      array[offset++] = vector.y;
    }
    return this;
  },
  copyVec3sArray: function copyVec3sArray(vectors) {
    var array = this.array;
    var offset = 0;
    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];
      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVec3sArray(): vector is undefined', i);
        vector = new Vec3();
      }
      array[offset++] = vector.x;
      array[offset++] = vector.y;
      array[offset++] = vector.z;
    }
    return this;
  },
  copyVec4sArray: function copyVec4sArray(vectors) {
    var array = this.array;
    var offset = 0;
    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];
      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVec4sArray(): vector is undefined', i);
        vector = new Vec4();
      }
      array[offset++] = vector.x;
      array[offset++] = vector.y;
      array[offset++] = vector.z;
      array[offset++] = vector.w;
    }
    return this;
  },
  applyMat3: function applyMat3(m) {
    if (this.itemSize === 2) {
      for (var i = 0, l = this.count; i < l; i++) {
        _vector2.fromBufferAttribute(this, i);
        _vector2.applyMat3(m);
        this.setXY(i, _vector2.x, _vector2.y);
      }
    } else if (this.itemSize === 3) {
      for (var _i = 0, _l = this.count; _i < _l; _i++) {
        BufferAttribute_vector.fromBufferAttribute(this, _i);
        BufferAttribute_vector.applyMat3(m);
        this.setXYZ(_i, BufferAttribute_vector.x, BufferAttribute_vector.y, BufferAttribute_vector.z);
      }
    }
    return this;
  },
  applyMat4: function applyMat4(m) {
    for (var i = 0, l = this.count; i < l; i++) {
      BufferAttribute_vector.x = this.getX(i);
      BufferAttribute_vector.y = this.getY(i);
      BufferAttribute_vector.z = this.getZ(i);
      BufferAttribute_vector.applyMat4(m);
      this.setXYZ(i, BufferAttribute_vector.x, BufferAttribute_vector.y, BufferAttribute_vector.z);
    }
    return this;
  },
  applyNormalMatrix: function applyNormalMatrix(m) {
    for (var i = 0, l = this.count; i < l; i++) {
      BufferAttribute_vector.x = this.getX(i);
      BufferAttribute_vector.y = this.getY(i);
      BufferAttribute_vector.z = this.getZ(i);
      BufferAttribute_vector.applyNormalMatrix(m);
      this.setXYZ(i, BufferAttribute_vector.x, BufferAttribute_vector.y, BufferAttribute_vector.z);
    }
    return this;
  },
  transformDirection: function transformDirection(m) {
    for (var i = 0, l = this.count; i < l; i++) {
      BufferAttribute_vector.x = this.getX(i);
      BufferAttribute_vector.y = this.getY(i);
      BufferAttribute_vector.z = this.getZ(i);
      BufferAttribute_vector.transformDirection(m);
      this.setXYZ(i, BufferAttribute_vector.x, BufferAttribute_vector.y, BufferAttribute_vector.z);
    }
    return this;
  },
  set: function set(value) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.array.set(value, offset);
    return this;
  },
  getX: function getX(index) {
    return this.array[index * this.itemSize];
  },
  setX: function setX(index, x) {
    this.array[index * this.itemSize] = x;
    return this;
  },
  getY: function getY(index) {
    return this.array[index * this.itemSize + 1];
  },
  setY: function setY(index, y) {
    this.array[index * this.itemSize + 1] = y;
    return this;
  },
  getZ: function getZ(index) {
    return this.array[index * this.itemSize + 2];
  },
  setZ: function setZ(index, z) {
    this.array[index * this.itemSize + 2] = z;
    return this;
  },
  getW: function getW(index) {
    return this.array[index * this.itemSize + 3];
  },
  setW: function setW(index, w) {
    this.array[index * this.itemSize + 3] = w;
    return this;
  },
  setXY: function setXY(index, x, y) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    return this;
  },
  setXYZ: function setXYZ(index, x, y, z) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    return this;
  },
  setXYZW: function setXYZW(index, x, y, z, w) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    this.array[index + 3] = w;
    return this;
  },
  onUpload: function onUpload(callback) {
    this.onUploadCallback = callback;
    return this;
  },
  clone: function clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  },
  toJSON: function toJSON() {
    var data = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.prototype.slice.call(this.array),
      normalized: this.normalized
    };
    if (this.name !== '') data.name = this.name;
    if (this.usage !== StaticDrawUsage) data.usage = this.usage;
    if (this.updateRange.offset !== 0 || this.updateRange.count !== -1) data.updateRange = this.updateRange;
    return data;
  }
});

//

function Int8BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int8Array(array), itemSize, normalized);
}
Int8BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int8BufferAttribute.prototype.constructor = Int8BufferAttribute;
function Uint8BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint8Array(array), itemSize, normalized);
}
Uint8BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint8BufferAttribute.prototype.constructor = Uint8BufferAttribute;
function Uint8ClampedBufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint8ClampedArray(array), itemSize, normalized);
}
Uint8ClampedBufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint8ClampedBufferAttribute.prototype.constructor = Uint8ClampedBufferAttribute;
function Int16BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int16Array(array), itemSize, normalized);
}
Int16BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int16BufferAttribute.prototype.constructor = Int16BufferAttribute;
function Uint16BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint16Array(array), itemSize, normalized);
}
Uint16BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;
function Int32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int32Array(array), itemSize, normalized);
}
Int32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int32BufferAttribute.prototype.constructor = Int32BufferAttribute;
function Uint32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint32Array(array), itemSize, normalized);
}
Uint32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;
function Float16BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint16Array(array), itemSize, normalized);
}
Float16BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Float16BufferAttribute.prototype.constructor = Float16BufferAttribute;
Float16BufferAttribute.prototype.isFloat16BufferAttribute = true;
function Float32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Float32Array(array), itemSize, normalized);
}
Float32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;
function Float64BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Float64Array(array), itemSize, normalized);
}
Float64BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Float64BufferAttribute.prototype.constructor = Float64BufferAttribute;

//


;// ./src/math/Sphere.js


var Sphere_box = new Box3();

/**
 * @author bhouston / http://clara.io
 * @author mrdoob / http://mrdoob.com/
 */

function Sphere(center, radius) {
  this.center = center !== undefined ? center : new Vec3();
  this.radius = radius !== undefined ? radius : 0;
}
Object.assign(Sphere.prototype, {
  set: function set(center, radius) {
    this.center.copy(center);
    this.radius = radius;
    return this;
  },
  setFromPoints: function setFromPoints(points, optionalCenter) {
    var center = this.center;
    if (optionalCenter !== undefined) {
      center.copy(optionalCenter);
    } else {
      Sphere_box.setFromPoints(points).getCenter(center);
    }
    var maxRadiusSq = 0;
    for (var i = 0, il = points.length; i < il; i++) {
      maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
    }
    this.radius = Math.sqrt(maxRadiusSq);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(sphere) {
    this.center.copy(sphere.center);
    this.radius = sphere.radius;
    return this;
  },
  empty: function empty() {
    return this.radius <= 0;
  },
  containsPoint: function containsPoint(point) {
    return point.distanceToSquared(this.center) <= this.radius * this.radius;
  },
  distanceToPoint: function distanceToPoint(point) {
    return point.distanceTo(this.center) - this.radius;
  },
  intersectsSphere: function intersectsSphere(sphere) {
    var radiusSum = this.radius + sphere.radius;
    return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
  },
  intersectsBox: function intersectsBox(box) {
    return box.intersectsSphere(this);
  },
  intersectsPlane: function intersectsPlane(plane) {
    return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
  },
  clampPoint: function clampPoint(point, target) {
    var deltaLengthSq = this.center.distanceToSquared(point);
    if (target === undefined) {
      console.warn('THREE.Sphere: .clampPoint() target is now required');
      target = new Vec3();
    }
    target.copy(point);
    if (deltaLengthSq > this.radius * this.radius) {
      target.sub(this.center).normalize();
      target.mulScalar(this.radius).add(this.center);
    }
    return target;
  },
  getBoundingBox: function getBoundingBox(target) {
    if (target === undefined) {
      console.warn('THREE.Sphere: .getBoundingBox() target is now required');
      target = new Box3();
    }
    target.set(this.center, this.center);
    target.expandByScalar(this.radius);
    return target;
  },
  applyMat4: function applyMat4(matrix) {
    this.center.applyMat4(matrix);
    this.radius = this.radius * matrix.getMaxScaleOnAxis();
    return this;
  },
  translate: function translate(offset) {
    this.center.add(offset);
    return this;
  },
  equals: function equals(sphere) {
    return sphere.center.equals(this.center) && sphere.radius === this.radius;
  }
});

;// ./src/math/Euler.js





/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */

var _matrix = new Mat4();
var Euler_quaternion = new Quat();
function Euler(x, y, z, order) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._order = order || Euler.DefaultOrder;
}
Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
Euler.DefaultOrder = 'XYZ';
Object.defineProperties(Euler.prototype, {
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
  order: {
    get: function get() {
      return this._order;
    },
    set: function set(value) {
      this._order = value;
      this._onChangeCallback();
    }
  }
});
Object.assign(Euler.prototype, {
  isEuler: true,
  set: function set(x, y, z, order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order || this._order;
    this._onChangeCallback();
    return this;
  },
  clone: function clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  },
  copy: function copy(euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;
    this._onChangeCallback();
    return this;
  },
  setFromRotationMatrix: function setFromRotationMatrix(m, order, update) {
    var clamp = _Math.clamp;

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements;
    var m11 = te[0],
      m12 = te[4],
      m13 = te[8];
    var m21 = te[1],
      m22 = te[5],
      m23 = te[9];
    var m31 = te[2],
      m32 = te[6],
      m33 = te[10];
    order = order || this._order;
    if (order === 'XYZ') {
      this._y = Math.asin(clamp(m13, -1, 1));
      if (Math.abs(m13) < 0.9999999) {
        this._x = Math.atan2(-m23, m33);
        this._z = Math.atan2(-m12, m11);
      } else {
        this._x = Math.atan2(m32, m22);
        this._z = 0;
      }
    } else if (order === 'YXZ') {
      this._x = Math.asin(-clamp(m23, -1, 1));
      if (Math.abs(m23) < 0.9999999) {
        this._y = Math.atan2(m13, m33);
        this._z = Math.atan2(m21, m22);
      } else {
        this._y = Math.atan2(-m31, m11);
        this._z = 0;
      }
    } else if (order === 'ZXY') {
      this._x = Math.asin(clamp(m32, -1, 1));
      if (Math.abs(m32) < 0.9999999) {
        this._y = Math.atan2(-m31, m33);
        this._z = Math.atan2(-m12, m22);
      } else {
        this._y = 0;
        this._z = Math.atan2(m21, m11);
      }
    } else if (order === 'ZYX') {
      this._y = Math.asin(-clamp(m31, -1, 1));
      if (Math.abs(m31) < 0.9999999) {
        this._x = Math.atan2(m32, m33);
        this._z = Math.atan2(m21, m11);
      } else {
        this._x = 0;
        this._z = Math.atan2(-m12, m22);
      }
    } else if (order === 'YZX') {
      this._z = Math.asin(clamp(m21, -1, 1));
      if (Math.abs(m21) < 0.9999999) {
        this._x = Math.atan2(-m23, m22);
        this._y = Math.atan2(-m31, m11);
      } else {
        this._x = 0;
        this._y = Math.atan2(m13, m33);
      }
    } else if (order === 'XZY') {
      this._z = Math.asin(-clamp(m12, -1, 1));
      if (Math.abs(m12) < 0.9999999) {
        this._x = Math.atan2(m32, m22);
        this._y = Math.atan2(m13, m11);
      } else {
        this._x = Math.atan2(-m23, m33);
        this._y = 0;
      }
    } else {
      console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
    }
    this._order = order;
    if (update !== false) this._onChangeCallback();
    return this;
  },
  setFromQuat: function setFromQuat(q, order, update) {
    _matrix.makeRotationFromQuat(q);
    return this.setFromRotationMatrix(_matrix, order, update);
  },
  setFromVec3: function setFromVec3(v, order) {
    return this.set(v.x, v.y, v.z, order || this._order);
  },
  reorder: function reorder(newOrder) {
    // WARNING: this discards revolution information -bhouston

    Euler_quaternion.setFromEuler(this);
    return this.setFromQuat(Euler_quaternion, newOrder);
  },
  equals: function equals(euler) {
    return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
  },
  fromArray: function fromArray(array) {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];
    if (array[3] !== undefined) this._order = array[3];
    this._onChangeCallback();
    return this;
  },
  toArray: function toArray(array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._order;
    return array;
  },
  toVec3: function toVec3(optionalResult) {
    if (optionalResult) {
      return optionalResult.set(this._x, this._y, this._z);
    } else {
      return new Vec3(this._x, this._y, this._z);
    }
  },
  _onChange: function _onChange(callback) {
    this._onChangeCallback = callback;
    return this;
  },
  _onChangeCallback: function _onChangeCallback() {}
});

;// ./src/objects/Layers.js
/**
 * @author mrdoob / http://mrdoob.com/
 */

function Layers() {
  this.mask = 1 | 0;
}
Object.assign(Layers.prototype, {
  set: function set(channel) {
    this.mask = 1 << channel | 0;
  },
  enable: function enable(channel) {
    this.mask |= 1 << channel | 0;
  },
  enableAll: function enableAll() {
    this.mask = 0xffffffff | 0;
  },
  toggle: function toggle(channel) {
    this.mask ^= 1 << channel | 0;
  },
  disable: function disable(channel) {
    this.mask &= ~(1 << channel | 0);
  },
  disableAll: function disableAll() {
    this.mask = 0;
  },
  test: function test(layers) {
    return (this.mask & layers.mask) !== 0;
  }
});

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

;// ./src/objects/Object3D.js








var _object3DId = 0;
var Object3D_v1 = new Vec3();
var _q1 = new Quat();
var Object3D_m1 = new Mat4();
var _target = new Vec3();
var _position = new Vec3();
var _scale = new Vec3();
var Object3D_quaternion = new Quat();
var _xAxis = new Vec3(1, 0, 0);
var _yAxis = new Vec3(0, 1, 0);
var _zAxis = new Vec3(0, 0, 1);

/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author elephantatwork / www.elephantatwork.ch
 */

function Object3D() {
  Container.call(this);
  Object.defineProperty(this, 'id', {
    value: _object3DId++
  });

  // this.uuid = _Math.generateUUID();

  this.name = '';
  this.type = 'Object3D';

  // this.parent = null;
  // this.children = [];

  this.up = Object3D.DefaultUp.clone();
  var position = new Vec3();
  var rotation = new Euler();
  var quaternion = new Quat();
  var scale = new Vec3(1, 1, 1);
  function onRotationChange() {
    quaternion.setFromEuler(rotation, false);
  }
  function onQuatChange() {
    rotation.setFromQuat(quaternion, undefined, false);
  }
  rotation._onChange(onRotationChange);
  quaternion._onChange(onQuatChange);
  Object.defineProperties(this, {
    position: {
      configurable: true,
      enumerable: true,
      value: position
    },
    rotation: {
      configurable: true,
      enumerable: true,
      value: rotation
    },
    quaternion: {
      configurable: true,
      enumerable: true,
      value: quaternion
    },
    scale: {
      configurable: true,
      enumerable: true,
      value: scale
    },
    modelViewMatrix: {
      value: new Mat4()
    },
    normalMatrix: {
      value: new Mat3()
    }
  });
  this.matrix = new Mat4();
  this.matrixWorld = new Mat4();
  this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
  this.matrixWorldNeedsUpdate = false;
  this.layers = new Layers();
  this.visible = true;
  this.castShadow = false;
  this.receiveShadow = false;
  this.frustumCulled = true;
  this.renderOrder = 0;
  this.userData = {};
}
Object3D.DefaultUp = new Vec3(0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;
Object3D.prototype = Object.assign(Object.create(Container.prototype), {
  constructor: Object3D,
  isObject: true,
  // isObject3D: true,

  onBeforeRender: function onBeforeRender() {},
  onAfterRender: function onAfterRender() {},
  applyMatrix: function applyMatrix(matrix) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    this.matrix.premul(matrix);
    this.matrix.decompose(this.position, this.quaternion, this.scale);
  },
  applyQuat: function applyQuat(q) {
    this.quaternion.premul(q);
    return this;
  },
  setRotationFromAxisAngle: function setRotationFromAxisAngle(axis, angle) {
    // assumes axis is normalized

    this.quaternion.setFromAxisAngle(axis, angle);
  },
  setRotationFromEuler: function setRotationFromEuler(euler) {
    this.quaternion.setFromEuler(euler, true);
  },
  setRotationFromMatrix: function setRotationFromMatrix(m) {
    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    this.quaternion.setFromRotationMatrix(m);
  },
  setRotationFromQuat: function setRotationFromQuat(q) {
    // assumes q is normalized

    this.quaternion.copy(q);
  },
  rotateOnAxis: function rotateOnAxis(axis, angle) {
    // rotate object on axis in object space
    // axis is assumed to be normalized

    _q1.setFromAxisAngle(axis, angle);
    this.quaternion.multiply(_q1);
    return this;
  },
  rotateOnWorldAxis: function rotateOnWorldAxis(axis, angle) {
    // rotate object on axis in world space
    // axis is assumed to be normalized
    // method assumes no rotated parent

    _q1.setFromAxisAngle(axis, angle);
    this.quaternion.premul(_q1);
    return this;
  },
  rotateX: function rotateX(angle) {
    return this.rotateOnAxis(_xAxis, angle);
  },
  rotateY: function rotateY(angle) {
    return this.rotateOnAxis(_yAxis, angle);
  },
  rotateZ: function rotateZ(angle) {
    return this.rotateOnAxis(_zAxis, angle);
  },
  translateOnAxis: function translateOnAxis(axis, distance) {
    // translate object by distance along axis in object space
    // axis is assumed to be normalized

    Object3D_v1.copy(axis).applyQuat(this.quaternion);
    this.position.add(Object3D_v1.mulScalar(distance));
    return this;
  },
  translateX: function translateX(distance) {
    return this.translateOnAxis(_xAxis, distance);
  },
  translateY: function translateY(distance) {
    return this.translateOnAxis(_yAxis, distance);
  },
  translateZ: function translateZ(distance) {
    return this.translateOnAxis(_zAxis, distance);
  },
  localToWorld: function localToWorld(vector) {
    return vector.applyMat4(this.matrixWorld);
  },
  worldToLocal: function worldToLocal(vector) {
    return vector.applyMat4(Object3D_m1.getInverse(this.matrixWorld));
  },
  lookAt: function lookAt(x, y, z) {
    // This method does not support objects having non-uniformly-scaled parent(s)

    if (x.isVec3) {
      _target.copy(x);
    } else {
      _target.set(x, y, z);
    }
    var parent = this.parent;
    this.updateWorldMatrix(true, false);
    _position.setFromMatrixPosition(this.matrixWorld);
    if (this.isCamera || this.isLight) {
      Object3D_m1.lookAt(_position, _target, this.up);
    } else {
      Object3D_m1.lookAt(_target, _position, this.up);
    }
    this.quaternion.setFromRotationMatrix(Object3D_m1);
    if (parent && !parent.isScene) {
      Object3D_m1.extractRotation(parent.matrixWorld);
      _q1.setFromRotationMatrix(Object3D_m1);
      this.quaternion.premul(_q1.invert());
    }
  },
  // add: function (object) {
  //     if (arguments.length > 1) {
  //         for (var i = 0; i < arguments.length; i++) {
  //             this.add(arguments[i]);
  //         }

  //         return this;
  //     }

  //     if (object === this) {
  //         console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
  //         return this;
  //     }

  //     if (object && object.isObject3D) {
  //         if (object.parent !== null) {
  //             object.parent.remove(object);
  //         }

  //         object.parent = this;
  //         this.children.push(object);

  //         object.emit('added');
  //     } else {
  //         console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
  //     }

  //     return this;
  // },

  // remove: function (object) {
  //     if (arguments.length > 1) {
  //         for (var i = 0; i < arguments.length; i++) {
  //             this.remove(arguments[i]);
  //         }

  //         return this;
  //     }

  //     var index = this.children.indexOf(object);

  //     if (index !== -1) {
  //         object.parent = null;
  //         this.children.splice(index, 1);

  //         object.emit('removed');
  //     }

  //     return this;
  // },

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

  // getObjectById: function (id) {
  //     return this.getObjectByProperty('id', id);
  // },

  // getObjectByName: function (name) {
  //     return this.getObjectByProperty('name', name);
  // },

  // getObjectByProperty: function (name, value) {
  //     if (this[name] === value) return this;

  //     for (var i = 0, l = this.children.length; i < l; i++) {
  //         var child = this.children[i];
  //         var object = child.getObjectByProperty(name, value);

  //         if (object !== undefined) {
  //             return object;
  //         }
  //     }

  //     return undefined;
  // },

  getWorldPosition: function getWorldPosition(target) {
    if (target === undefined) {
      console.warn('THREE.Object3D: .getWorldPosition() target is now required');
      target = new Vec3();
    }
    this.updateTransform(true);
    return target.setFromMatrixPosition(this.matrixWorld);
  },
  getWorldQuat: function getWorldQuat(target) {
    if (target === undefined) {
      console.warn('THREE.Object3D: .getWorldQuat() target is now required');
      target = new Quat();
    }
    this.updateTransform(true);
    this.matrixWorld.decompose(_position, target, _scale);
    return target;
  },
  getWorldScale: function getWorldScale(target) {
    if (target === undefined) {
      console.warn('THREE.Object3D: .getWorldScale() target is now required');
      target = new Vec3();
    }
    this.updateTransform(true);
    this.matrixWorld.decompose(_position, Object3D_quaternion, target);
    return target;
  },
  getWorldDirection: function getWorldDirection(target) {
    if (target === undefined) {
      console.warn('THREE.Object3D: .getWorldDirection() target is now required');
      target = new Vec3();
    }
    this.updateTransform(true);
    var e = this.matrixWorld.elements;
    return target.set(e[8], e[9], e[10]).normalize();
  },
  raycast: function raycast() {},
  // traverse: function (callback) {
  //     callback(this);

  //     var children = this.children;

  //     for (var i = 0, l = children.length; i < l; i++) {
  //         children[i].traverse(callback);
  //     }
  // },

  // traverseVisible: function (callback) {
  //     if (this.visible === false) return;

  //     callback(this);

  //     var children = this.children;

  //     for (var i = 0, l = children.length; i < l; i++) {
  //         children[i].traverseVisible(callback);
  //     }
  // },

  // traverseAncestors: function (callback) {
  //     var parent = this.parent;

  //     if (parent !== null) {
  //         callback(parent);

  //         parent.traverseAncestors(callback);
  //     }
  // },

  updateMatrix: function updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.matrixWorldNeedsUpdate = true;
  },
  updateTransform: function updateTransform(force) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || force) {
      if (this.parent === null || this.parent.isScene) {
        this.matrixWorld.copy(this.matrix);
      } else {
        this.matrixWorld.mul2(this.parent.matrixWorld, this.matrix);
      }
      this.matrixWorldNeedsUpdate = false;
      force = true;
    }

    // update children

    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      children[i].updateTransform(force);
    }
  },
  updateWorldMatrix: function updateWorldMatrix(updateParents, updateChildren) {
    var parent = this.parent;
    if (updateParents === true && parent !== null && !parent.isScene) {
      parent.updateWorldMatrix(true, false);
    }
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.parent === null || this.parent.isScene) {
      this.matrixWorld.copy(this.matrix);
    } else {
      this.matrixWorld.mul2(this.parent.matrixWorld, this.matrix);
    }

    // update children

    if (updateChildren === true) {
      var children = this.children;
      for (var i = 0, l = children.length; i < l; i++) {
        children[i].updateWorldMatrix(false, true);
      }
    }
  },
  // toJSON: function (meta) {
  //     // meta is a string when called from JSON.stringify
  //     var isRootObject = meta === undefined || typeof meta === 'string';

  //     var output = {};

  //     // meta is a hash used to collect geometries, materials.
  //     // not providing it implies that this is the root object
  //     // being serialized.
  //     if (isRootObject) {
  //         // initialize meta obj
  //         meta = {
  //             geometries: {},
  //             materials: {},
  //             textures: {},
  //             images: {},
  //             shapes: {}
  //         };

  //         output.metadata = {
  //             version: 4.5,
  //             type: 'Object',
  //             generator: 'Object3D.toJSON'
  //         };
  //     }

  //     // standard Object3D serialization

  //     var object = {};

  //     object.uuid = this.uuid;
  //     object.type = this.type;

  //     if (this.name !== '') object.name = this.name;
  //     if (this.castShadow === true) object.castShadow = true;
  //     if (this.receiveShadow === true) object.receiveShadow = true;
  //     if (this.visible === false) object.visible = false;
  //     if (this.frustumCulled === false) object.frustumCulled = false;
  //     if (this.renderOrder !== 0) object.renderOrder = this.renderOrder;
  //     if (JSON.stringify(this.userData) !== '{}') object.userData = this.userData;

  //     object.layers = this.layers.mask;
  //     object.matrix = this.matrix.toArray();

  //     if (this.matrixAutoUpdate === false) object.matrixAutoUpdate = false;

  //     // object specific properties

  //     if (this.isInstancedMesh) {
  //         object.type = 'InstancedMesh';
  //         object.count = this.count;
  //         object.instanceMatrix = this.instanceMatrix.toJSON();
  //     }

  //     //

  //     function serialize(library, element) {
  //         if (library[element.uuid] === undefined) {
  //             library[element.uuid] = element.toJSON(meta);
  //         }

  //         return element.uuid;
  //     }

  //     if (this.isMesh || this.isLine || this.isPoints) {
  //         object.geometry = serialize(meta.geometries, this.geometry);

  //         var parameters = this.geometry.parameters;

  //         if (parameters !== undefined && parameters.shapes !== undefined) {
  //             var shapes = parameters.shapes;

  //             if (Array.isArray(shapes)) {
  //                 for (var i = 0, l = shapes.length; i < l; i++) {
  //                     var shape = shapes[i];

  //                     serialize(meta.shapes, shape);
  //                 }
  //             } else {
  //                 serialize(meta.shapes, shapes);
  //             }
  //         }
  //     }

  //     if (this.material !== undefined) {
  //         if (Array.isArray(this.material)) {
  //             var uuids = [];

  //             for (var i = 0, l = this.material.length; i < l; i++) {
  //                 uuids.push(serialize(meta.materials, this.material[i]));
  //             }

  //             object.material = uuids;
  //         } else {
  //             object.material = serialize(meta.materials, this.material);
  //         }
  //     }

  //     //

  //     if (this.children.length > 0) {
  //         object.children = [];

  //         for (var i = 0; i < this.children.length; i++) {
  //             object.children.push(this.children[i].toJSON(meta).object);
  //         }
  //     }

  //     if (isRootObject) {
  //         var geometries = extractFromCache(meta.geometries);
  //         var materials = extractFromCache(meta.materials);
  //         var textures = extractFromCache(meta.textures);
  //         var images = extractFromCache(meta.images);
  //         var shapes = extractFromCache(meta.shapes);

  //         if (geometries.length > 0) output.geometries = geometries;
  //         if (materials.length > 0) output.materials = materials;
  //         if (textures.length > 0) output.textures = textures;
  //         if (images.length > 0) output.images = images;
  //         if (shapes.length > 0) output.shapes = shapes;
  //     }

  //     output.object = object;

  //     return output;

  //     // extract data from the cache hash
  //     // remove metadata on each item
  //     // and return as array
  //     function extractFromCache(cache) {
  //         var values = [];
  //         for (var key in cache) {
  //             var data = cache[key];
  //             delete data.metadata;
  //             values.push(data);
  //         }
  //         return values;
  //     }
  // },

  clone: function clone(recursive) {
    return new this.constructor().copy(this, recursive);
  },
  copy: function copy(source, recursive) {
    if (recursive === undefined) recursive = true;
    this.name = source.name;
    this.up.copy(source.up);
    this.position.copy(source.position);
    this.quaternion.copy(source.quaternion);
    this.scale.copy(source.scale);
    this.matrix.copy(source.matrix);
    this.matrixWorld.copy(source.matrixWorld);
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
    this.layers.mask = source.layers.mask;
    this.visible = source.visible;
    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;
    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    if (recursive === true) {
      for (var i = 0; i < source.children.length; i++) {
        var child = source.children[i];
        this.add(child.clone());
      }
    }
    return this;
  }
});

;// ./src/geometries/Geometry.js








// import { MathUtils } from '../math/MathUtils.js';


var _id = 0;
var Geometry_m1 = new Mat4();
var _obj = new Object3D();
var _offset = new Vec3();
var Geometry_box = new Box3();
var _boxMorphTargets = new Box3();
var Geometry_vector = new Vec3();
function Geometry() {
  Object.defineProperty(this, 'id', {
    value: _id++
  });
  EventTarget.mixin(this);

  // this.uuid = MathUtils.generateUUID();

  this.name = '';
  this.type = 'Geometry';
  this.index = null;
  this.attributes = {};
  this.morphAttributes = {};
  this.morphTargetsRelative = false;
  this.groups = [];
  this.boundingBox = null;
  this.boundingSphere = null;
  this.drawRange = {
    start: 0,
    count: Infinity
  };
  this.userData = {};
}

// EventTarget.call(Geometry);

Object.assign(Geometry.prototype, {
  constructor: Geometry,
  isGeometry: true,
  getIndex: function getIndex() {
    return this.index;
  },
  setIndex: function setIndex(index) {
    if (Array.isArray(index)) {
      this.index = new (arrayMax(index) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);
    } else {
      this.index = index;
    }
    return this;
  },
  getAttribute: function getAttribute(name) {
    return this.attributes[name];
  },
  setAttribute: function setAttribute(name, attribute) {
    this.attributes[name] = attribute;
    return this;
  },
  deleteAttribute: function deleteAttribute(name) {
    delete this.attributes[name];
    return this;
  },
  hasAttribute: function hasAttribute(name) {
    return this.attributes[name] !== undefined;
  },
  addGroup: function addGroup(start, count) {
    var materialIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.groups.push({
      start: start,
      count: count,
      materialIndex: materialIndex
    });
  },
  clearGroups: function clearGroups() {
    this.groups = [];
  },
  setDrawRange: function setDrawRange(start, count) {
    this.drawRange.start = start;
    this.drawRange.count = count;
  },
  applyMat4: function applyMat4(matrix) {
    var position = this.attributes.position;
    if (position !== undefined) {
      position.applyMat4(matrix);
      position.needsUpdate = true;
    }
    var normal = this.attributes.normal;
    if (normal !== undefined) {
      var normalMatrix = new Mat3().getNormalMatrix(matrix);
      normal.applyNormalMatrix(normalMatrix);
      normal.needsUpdate = true;
    }
    var tangent = this.attributes.tangent;
    if (tangent !== undefined) {
      tangent.transformDirection(matrix);
      tangent.needsUpdate = true;
    }
    if (this.boundingBox !== null) {
      this.computeBoundingBox();
    }
    if (this.boundingSphere !== null) {
      this.computeBoundingSphere();
    }
    return this;
  },
  rotateX: function rotateX(angle) {
    // rotate geometry around world x-axis

    Geometry_m1.makeRotationX(angle);
    this.applyMat4(Geometry_m1);
    return this;
  },
  rotateY: function rotateY(angle) {
    // rotate geometry around world y-axis

    Geometry_m1.makeRotationY(angle);
    this.applyMat4(Geometry_m1);
    return this;
  },
  rotateZ: function rotateZ(angle) {
    // rotate geometry around world z-axis

    Geometry_m1.makeRotationZ(angle);
    this.applyMat4(Geometry_m1);
    return this;
  },
  translate: function translate(x, y, z) {
    // translate geometry

    Geometry_m1.makeTranslation(x, y, z);
    this.applyMat4(Geometry_m1);
    return this;
  },
  scale: function scale(x, y, z) {
    // scale geometry

    Geometry_m1.makeScale(x, y, z);
    this.applyMat4(Geometry_m1);
    return this;
  },
  lookAt: function lookAt(vector) {
    _obj.lookAt(vector);
    _obj.updateMatrix();
    this.applyMat4(_obj.matrix);
    return this;
  },
  center: function center() {
    this.computeBoundingBox();
    this.boundingBox.getCenter(_offset).negate();
    this.translate(_offset.x, _offset.y, _offset.z);
    return this;
  },
  setFromPoints: function setFromPoints(points) {
    var position = [];
    for (var i = 0, l = points.length; i < l; i++) {
      var point = points[i];
      position.push(point.x, point.y, point.z || 0);
    }
    this.setAttribute('position', new Float32BufferAttribute(position, 3));
    return this;
  },
  computeBoundingBox: function computeBoundingBox() {
    if (this.boundingBox === null) {
      this.boundingBox = new Box3();
    }
    var position = this.attributes.position;
    var morphAttributesPosition = this.morphAttributes.position;
    if (position && position.isGLBufferAttribute) {
      console.error('THREE.Geometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this);
      this.boundingBox.set(new Vec3(-Infinity, -Infinity, -Infinity), new Vec3(+Infinity, +Infinity, +Infinity));
      return;
    }
    if (position !== undefined) {
      this.boundingBox.setFromBufferAttribute(position);

      // process morph attributes if present

      if (morphAttributesPosition) {
        for (var i = 0, il = morphAttributesPosition.length; i < il; i++) {
          var morphAttribute = morphAttributesPosition[i];
          Geometry_box.setFromBufferAttribute(morphAttribute);
          if (this.morphTargetsRelative) {
            Geometry_vector.addVectors(this.boundingBox.min, Geometry_box.min);
            this.boundingBox.expandByPoint(Geometry_vector);
            Geometry_vector.addVectors(this.boundingBox.max, Geometry_box.max);
            this.boundingBox.expandByPoint(Geometry_vector);
          } else {
            this.boundingBox.expandByPoint(Geometry_box.min);
            this.boundingBox.expandByPoint(Geometry_box.max);
          }
        }
      }
    } else {
      this.boundingBox.makeEmpty();
    }
    if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
      console.error('THREE.Geometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
    }
  },
  computeBoundingSphere: function computeBoundingSphere() {
    if (this.boundingSphere === null) {
      this.boundingSphere = new Sphere();
    }
    var position = this.attributes.position;
    var morphAttributesPosition = this.morphAttributes.position;
    if (position && position.isGLBufferAttribute) {
      console.error('THREE.Geometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this);
      this.boundingSphere.set(new Vec3(), Infinity);
      return;
    }
    if (position) {
      // first, find the center of the bounding sphere

      var center = this.boundingSphere.center;
      Geometry_box.setFromBufferAttribute(position);

      // process morph attributes if present

      if (morphAttributesPosition) {
        for (var i = 0, il = morphAttributesPosition.length; i < il; i++) {
          var morphAttribute = morphAttributesPosition[i];
          _boxMorphTargets.setFromBufferAttribute(morphAttribute);
          if (this.morphTargetsRelative) {
            Geometry_vector.addVectors(Geometry_box.min, _boxMorphTargets.min);
            Geometry_box.expandByPoint(Geometry_vector);
            Geometry_vector.addVectors(Geometry_box.max, _boxMorphTargets.max);
            Geometry_box.expandByPoint(Geometry_vector);
          } else {
            Geometry_box.expandByPoint(_boxMorphTargets.min);
            Geometry_box.expandByPoint(_boxMorphTargets.max);
          }
        }
      }
      Geometry_box.getCenter(center);

      // second, try to find a boundingSphere with a radius smaller than the
      // boundingSphere of the boundingBox: sqrt(3) smaller in the best case

      var maxRadiusSq = 0;
      for (var _i = 0, _il = position.count; _i < _il; _i++) {
        Geometry_vector.fromAttribute(position, _i);
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(Geometry_vector));
      }

      // process morph attributes if present

      if (morphAttributesPosition) {
        for (var _i2 = 0, _il2 = morphAttributesPosition.length; _i2 < _il2; _i2++) {
          var _morphAttribute = morphAttributesPosition[_i2];
          var morphTargetsRelative = this.morphTargetsRelative;
          for (var j = 0, jl = _morphAttribute.count; j < jl; j++) {
            Geometry_vector.fromAttribute(_morphAttribute, j);
            if (morphTargetsRelative) {
              _offset.fromAttribute(position, j);
              Geometry_vector.add(_offset);
            }
            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(Geometry_vector));
          }
        }
      }
      this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
      if (isNaN(this.boundingSphere.radius)) {
        console.error('THREE.Geometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
      }
    }
  },
  computeFaceNormals: function computeFaceNormals() {

    // backwards compatibility
  },
  computeTangents: function computeTangents() {
    var index = this.index;
    var attributes = this.attributes;

    // based on http://www.terathon.com/code/tangent.html
    // (per vertex tangents)

    if (index === null || attributes.position === undefined || attributes.normal === undefined || attributes.uv === undefined) {
      console.error('THREE.Geometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)');
      return;
    }
    var indices = index.array;
    var positions = attributes.position.array;
    var normals = attributes.normal.array;
    var uvs = attributes.uv.array;
    var nVertices = positions.length / 3;
    if (attributes.tangent === undefined) {
      this.setAttribute('tangent', new BufferAttribute(new Float32Array(4 * nVertices), 4));
    }
    var tangents = attributes.tangent.array;
    var tan1 = [],
      tan2 = [];
    for (var i = 0; i < nVertices; i++) {
      tan1[i] = new Vec3();
      tan2[i] = new Vec3();
    }
    var vA = new Vec3(),
      vB = new Vec3(),
      vC = new Vec3(),
      uvA = new Vec2(),
      uvB = new Vec2(),
      uvC = new Vec2(),
      sdir = new Vec3(),
      tdir = new Vec3();
    function handleTriangle(a, b, c) {
      vA.fromArray(positions, a * 3);
      vB.fromArray(positions, b * 3);
      vC.fromArray(positions, c * 3);
      uvA.fromArray(uvs, a * 2);
      uvB.fromArray(uvs, b * 2);
      uvC.fromArray(uvs, c * 2);
      vB.sub(vA);
      vC.sub(vA);
      uvB.sub(uvA);
      uvC.sub(uvA);
      var r = 1.0 / (uvB.x * uvC.y - uvC.x * uvB.y);

      // silently ignore degenerate uv triangles having coincident or colinear vertices

      if (!isFinite(r)) return;
      sdir.copy(vB).mulScalar(uvC.y).addScaledVector(vC, -uvB.y).mulScalar(r);
      tdir.copy(vC).mulScalar(uvB.x).addScaledVector(vB, -uvC.x).mulScalar(r);
      tan1[a].add(sdir);
      tan1[b].add(sdir);
      tan1[c].add(sdir);
      tan2[a].add(tdir);
      tan2[b].add(tdir);
      tan2[c].add(tdir);
    }
    var groups = this.groups;
    if (groups.length === 0) {
      groups = [{
        start: 0,
        count: indices.length
      }];
    }
    for (var _i3 = 0, il = groups.length; _i3 < il; ++_i3) {
      var group = groups[_i3];
      var start = group.start;
      var count = group.count;
      for (var j = start, jl = start + count; j < jl; j += 3) {
        handleTriangle(indices[j + 0], indices[j + 1], indices[j + 2]);
      }
    }
    var tmp = new Vec3(),
      tmp2 = new Vec3();
    var n = new Vec3(),
      n2 = new Vec3();
    function handleVertex(v) {
      n.fromArray(normals, v * 3);
      n2.copy(n);
      var t = tan1[v];

      // Gram-Schmidt orthogonalize

      tmp.copy(t);
      tmp.sub(n.mulScalar(n.dot(t))).normalize();

      // Calculate handedness

      tmp2.crossVectors(n2, t);
      var test = tmp2.dot(tan2[v]);
      var w = test < 0.0 ? -1.0 : 1.0;
      tangents[v * 4] = tmp.x;
      tangents[v * 4 + 1] = tmp.y;
      tangents[v * 4 + 2] = tmp.z;
      tangents[v * 4 + 3] = w;
    }
    for (var _i4 = 0, _il3 = groups.length; _i4 < _il3; ++_i4) {
      var _group = groups[_i4];
      var _start = _group.start;
      var _count = _group.count;
      for (var _j = _start, _jl = _start + _count; _j < _jl; _j += 3) {
        handleVertex(indices[_j + 0]);
        handleVertex(indices[_j + 1]);
        handleVertex(indices[_j + 2]);
      }
    }
  },
  computeVertexNormals: function computeVertexNormals() {
    var index = this.index;
    var positionAttribute = this.getAttribute('position');
    if (positionAttribute !== undefined) {
      var normalAttribute = this.getAttribute('normal');
      if (normalAttribute === undefined) {
        normalAttribute = new BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
        this.setAttribute('normal', normalAttribute);
      } else {
        // reset existing normals to zero

        for (var i = 0, il = normalAttribute.count; i < il; i++) {
          normalAttribute.setXYZ(i, 0, 0, 0);
        }
      }
      var pA = new Vec3(),
        pB = new Vec3(),
        pC = new Vec3();
      var nA = new Vec3(),
        nB = new Vec3(),
        nC = new Vec3();
      var cb = new Vec3(),
        ab = new Vec3();

      // indexed elements

      if (index) {
        for (var _i5 = 0, _il4 = index.count; _i5 < _il4; _i5 += 3) {
          var vA = index.getX(_i5 + 0);
          var vB = index.getX(_i5 + 1);
          var vC = index.getX(_i5 + 2);
          pA.fromAttribute(positionAttribute, vA);
          pB.fromAttribute(positionAttribute, vB);
          pC.fromAttribute(positionAttribute, vC);
          cb.sub2(pC, pB);
          ab.sub2(pA, pB);
          cb.cross(ab);
          nA.fromAttribute(normalAttribute, vA);
          nB.fromAttribute(normalAttribute, vB);
          nC.fromAttribute(normalAttribute, vC);
          nA.add(cb);
          nB.add(cb);
          nC.add(cb);
          normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z);
          normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z);
          normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);
        }
      } else {
        // non-indexed elements (unconnected triangle soup)

        for (var _i6 = 0, _il5 = positionAttribute.count; _i6 < _il5; _i6 += 3) {
          pA.fromAttribute(positionAttribute, _i6 + 0);
          pB.fromAttribute(positionAttribute, _i6 + 1);
          pC.fromAttribute(positionAttribute, _i6 + 2);
          cb.sub2(pC, pB);
          ab.sub2(pA, pB);
          cb.cross(ab);
          normalAttribute.setXYZ(_i6 + 0, cb.x, cb.y, cb.z);
          normalAttribute.setXYZ(_i6 + 1, cb.x, cb.y, cb.z);
          normalAttribute.setXYZ(_i6 + 2, cb.x, cb.y, cb.z);
        }
      }
      this.normalizeNormals();
      normalAttribute.needsUpdate = true;
    }
  },
  merge: function merge(geometry, offset) {
    if (!(geometry && geometry.isGeometry)) {
      console.error('THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry);
      return;
    }
    if (offset === undefined) {
      offset = 0;
      console.warn('THREE.Geometry.merge(): Overwriting original geometry, starting at offset=0. ' + 'Use GeometryUtils.mergeBufferGeometries() for lossless merge.');
    }
    var attributes = this.attributes;
    for (var key in attributes) {
      if (geometry.attributes[key] === undefined) continue;
      var attribute1 = attributes[key];
      var attributeArray1 = attribute1.array;
      var attribute2 = geometry.attributes[key];
      var attributeArray2 = attribute2.array;
      var attributeOffset = attribute2.itemSize * offset;
      var length = Math.min(attributeArray2.length, attributeArray1.length - attributeOffset);
      for (var i = 0, j = attributeOffset; i < length; i++, j++) {
        attributeArray1[j] = attributeArray2[i];
      }
    }
    return this;
  },
  normalizeNormals: function normalizeNormals() {
    var normals = this.attributes.normal;
    for (var i = 0, il = normals.count; i < il; i++) {
      Geometry_vector.fromAttribute(normals, i);
      Geometry_vector.normalize();
      normals.setXYZ(i, Geometry_vector.x, Geometry_vector.y, Geometry_vector.z);
    }
  },
  toNonIndexed: function toNonIndexed() {
    function convertBufferAttribute(attribute, indices) {
      var array = attribute.array;
      var itemSize = attribute.itemSize;
      var normalized = attribute.normalized;
      var array2 = new array.constructor(indices.length * itemSize);
      var index = 0,
        index2 = 0;
      for (var i = 0, l = indices.length; i < l; i++) {
        index = indices[i] * itemSize;
        for (var j = 0; j < itemSize; j++) {
          array2[index2++] = array[index++];
        }
      }
      return new BufferAttribute(array2, itemSize, normalized);
    }

    //

    if (this.index === null) {
      console.warn('THREE.Geometry.toNonIndexed(): Geometry is already non-indexed.');
      return this;
    }
    var geometry2 = new Geometry();
    var indices = this.index.array;
    var attributes = this.attributes;

    // attributes

    for (var name in attributes) {
      var attribute = attributes[name];
      var newAttribute = convertBufferAttribute(attribute, indices);
      geometry2.setAttribute(name, newAttribute);
    }

    // morph attributes

    var morphAttributes = this.morphAttributes;
    for (var _name in morphAttributes) {
      var morphArray = [];
      var morphAttribute = morphAttributes[_name]; // morphAttribute: array of Float32BufferAttributes

      for (var i = 0, il = morphAttribute.length; i < il; i++) {
        var _attribute = morphAttribute[i];
        var _newAttribute = convertBufferAttribute(_attribute, indices);
        morphArray.push(_newAttribute);
      }
      geometry2.morphAttributes[_name] = morphArray;
    }
    geometry2.morphTargetsRelative = this.morphTargetsRelative;

    // groups

    var groups = this.groups;
    for (var _i7 = 0, l = groups.length; _i7 < l; _i7++) {
      var group = groups[_i7];
      geometry2.addGroup(group.start, group.count, group.materialIndex);
    }
    return geometry2;
  },
  toJSON: function toJSON() {
    var data = {
      metadata: {
        version: 4.5,
        type: 'Geometry',
        generator: 'Geometry.toJSON'
      }
    };

    // standard Geometry serialization

    data.uuid = this.uuid;
    data.type = this.type;
    if (this.name !== '') data.name = this.name;
    if (Object.keys(this.userData).length > 0) data.userData = this.userData;
    if (this.parameters !== undefined) {
      var parameters = this.parameters;
      for (var key in parameters) {
        if (parameters[key] !== undefined) data[key] = parameters[key];
      }
      return data;
    }

    // for simplicity the code assumes attributes are not shared across geometries, see #15811

    data.data = {
      attributes: {}
    };
    var index = this.index;
    if (index !== null) {
      data.data.index = {
        type: index.array.constructor.name,
        array: Array.prototype.slice.call(index.array)
      };
    }
    var attributes = this.attributes;
    for (var _key in attributes) {
      var attribute = attributes[_key];
      data.data.attributes[_key] = attribute.toJSON(data.data);
    }
    var morphAttributes = {};
    var hasMorphAttributes = false;
    for (var _key2 in this.morphAttributes) {
      var attributeArray = this.morphAttributes[_key2];
      var array = [];
      for (var i = 0, il = attributeArray.length; i < il; i++) {
        var _attribute2 = attributeArray[i];
        array.push(_attribute2.toJSON(data.data));
      }
      if (array.length > 0) {
        morphAttributes[_key2] = array;
        hasMorphAttributes = true;
      }
    }
    if (hasMorphAttributes) {
      data.data.morphAttributes = morphAttributes;
      data.data.morphTargetsRelative = this.morphTargetsRelative;
    }
    var groups = this.groups;
    if (groups.length > 0) {
      data.data.groups = JSON.parse(JSON.stringify(groups));
    }
    var boundingSphere = this.boundingSphere;
    if (boundingSphere !== null) {
      data.data.boundingSphere = {
        center: boundingSphere.center.toArray(),
        radius: boundingSphere.radius
      };
    }
    return data;
  },
  clone: function clone() {
    /*
     // Handle primitives
    		 const parameters = this.parameters;
    		 if ( parameters !== undefined ) {
    		 const values = [];
    		 for ( const key in parameters ) {
    		 values.push( parameters[ key ] );
    		 }
    		 const geometry = Object.create( this.constructor.prototype );
     this.constructor.apply( geometry, values );
     return geometry;
    		 }
    		 return new this.constructor().copy( this );
     */

    return new Geometry().copy(this);
  },
  copy: function copy(source) {
    // reset

    this.index = null;
    this.attributes = {};
    this.morphAttributes = {};
    this.groups = [];
    this.boundingBox = null;
    this.boundingSphere = null;

    // used for storing cloned, shared data

    var data = {};

    // name

    this.name = source.name;

    // index

    var index = source.index;
    if (index !== null) {
      this.setIndex(index.clone(data));
    }

    // attributes

    var attributes = source.attributes;
    for (var name in attributes) {
      var attribute = attributes[name];
      this.setAttribute(name, attribute.clone(data));
    }

    // morph attributes

    var morphAttributes = source.morphAttributes;
    for (var _name2 in morphAttributes) {
      var array = [];
      var morphAttribute = morphAttributes[_name2]; // morphAttribute: array of Float32BufferAttributes

      for (var i = 0, l = morphAttribute.length; i < l; i++) {
        array.push(morphAttribute[i].clone(data));
      }
      this.morphAttributes[_name2] = array;
    }
    this.morphTargetsRelative = source.morphTargetsRelative;

    // groups

    var groups = source.groups;
    for (var _i8 = 0, _l = groups.length; _i8 < _l; _i8++) {
      var group = groups[_i8];
      this.addGroup(group.start, group.count, group.materialIndex);
    }

    // bounding box

    var boundingBox = source.boundingBox;
    if (boundingBox !== null) {
      this.boundingBox = boundingBox.clone();
    }

    // bounding sphere

    var boundingSphere = source.boundingSphere;
    if (boundingSphere !== null) {
      this.boundingSphere = boundingSphere.clone();
    }

    // draw range

    this.drawRange.start = source.drawRange.start;
    this.drawRange.count = source.drawRange.count;

    // user data

    this.userData = source.userData;
    return this;
  },
  dispose: function dispose() {
    this.emit('dispose');
  }
});

;// ./src/materials/Material.js



// import { MathUtils } from '../math/MathUtils.js';

var materialId = 0;
function Material() {
  Object.defineProperty(this, 'id', {
    value: materialId++
  });

  // this.uuid = MathUtils.generateUUID();

  this.name = '';
  this.type = 'Material';
  this.fog = true;
  this.blending = NormalBlending;
  this.side = FrontSide;
  this.vertexColors = false;
  this.opacity = 1;
  this.transparent = false;
  this.blendSrc = SrcAlphaFactor;
  this.blendDst = OneMinusSrcAlphaFactor;
  this.blendEquation = AddEquation;
  this.blendSrcAlpha = null;
  this.blendDstAlpha = null;
  this.blendEquationAlpha = null;
  this.depthFunc = LessEqualDepth;
  this.depthTest = true;
  this.depthWrite = true;
  this.stencilWriteMask = 0xff;
  this.stencilFunc = AlwaysStencilFunc;
  this.stencilRef = 0;
  this.stencilFuncMask = 0xff;
  this.stencilFail = KeepStencilOp;
  this.stencilZFail = KeepStencilOp;
  this.stencilZPass = KeepStencilOp;
  this.stencilWrite = false;
  this.clippingPlanes = null;
  this.clipIntersection = false;
  this.clipShadows = false;
  this.shadowSide = null;
  this.colorWrite = true;
  this.precision = null; // override the renderer's default precision for this material

  this.polygonOffset = false;
  this.polygonOffsetFactor = 0;
  this.polygonOffsetUnits = 0;
  this.dithering = false;
  this.alphaTest = 0;
  this.alphaToCoverage = false;
  this.premultipliedAlpha = false;
  this.visible = true;
  this.toneMapped = true;
  this.userData = {};
  this.version = 0;
}
EventTarget.mixin(Material);
Object.assign(Material.prototype, {
  constructor: Material,
  isMaterial: true,
  onBeforeCompile: function onBeforeCompile(/* shaderobject, renderer */) {},
  customProgramCacheKey: function customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  },
  setValues: function setValues(values) {
    if (values === undefined) return;
    if (typeof values === 'string') values = {
      map: values
    };
    for (var key in values) {
      var newValue = values[key];
      if (newValue === undefined) {
        console.warn('THREE.Material: \'' + key + '\' parameter is undefined.');
        continue;
      }

      // for backward compatability if shading is set in the constructor
      if (key === 'shading') {
        console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
        this.flatShading = newValue === FlatShading ? true : false;
        continue;
      }
      if (key === 'map' && typeof newValue === 'string') {
        this.map = Cache.texture[newValue];
        this.premultipliedAlpha = this.map.base.premultipliedAlpha;
        continue;
      }
      if (key.endsWith('Map') && typeof newValue === 'string') {
        this[key] = Cache.texture[newValue];
        continue;
      }
      var currentValue = this[key];
      if (currentValue === undefined) {
        console.warn('THREE.' + this.type + ': \'' + key + '\' is not a property of this material.');
        continue;
      }
      if (currentValue && currentValue.isColor) {
        currentValue.set(newValue);
      } else if (currentValue && currentValue.isVec3 && newValue && newValue.isVec3) {
        currentValue.copy(newValue);
      } else {
        this[key] = newValue;
      }
    }
  },
  // toJSON: function ( meta ) {

  // 	const isRoot = ( meta === undefined || typeof meta === 'string' );

  // 	if ( isRoot ) {

  // 		meta = {
  // 			textures: {},
  // 			images: {}
  // 		};

  // 	}

  // 	const data = {
  // 		metadata: {
  // 			version: 4.5,
  // 			type: 'Material',
  // 			generator: 'Material.toJSON'
  // 		}
  // 	};

  // 	// standard Material serialization
  // 	data.uuid = this.uuid;
  // 	data.type = this.type;

  // 	if ( this.name !== '' ) data.name = this.name;

  // 	if ( this.color && this.color.isColor ) data.color = this.color.getHex();

  // 	if ( this.roughness !== undefined ) data.roughness = this.roughness;
  // 	if ( this.metalness !== undefined ) data.metalness = this.metalness;

  // 	if ( this.sheen && this.sheen.isColor ) data.sheen = this.sheen.getHex();
  // 	if ( this.emissive && this.emissive.isColor ) data.emissive = this.emissive.getHex();
  // 	if ( this.emissiveIntensity && this.emissiveIntensity !== 1 ) data.emissiveIntensity = this.emissiveIntensity;

  // 	if ( this.specular && this.specular.isColor ) data.specular = this.specular.getHex();
  // 	if ( this.shininess !== undefined ) data.shininess = this.shininess;
  // 	if ( this.clearcoat !== undefined ) data.clearcoat = this.clearcoat;
  // 	if ( this.clearcoatRoughness !== undefined ) data.clearcoatRoughness = this.clearcoatRoughness;

  // 	if ( this.clearcoatMap && this.clearcoatMap.isTexture ) {

  // 		data.clearcoatMap = this.clearcoatMap.toJSON( meta ).uuid;

  // 	}

  // 	if ( this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture ) {

  // 		data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON( meta ).uuid;

  // 	}

  // 	if ( this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture ) {

  // 		data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON( meta ).uuid;
  // 		data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();

  // 	}

  // 	if ( this.map && this.map.isTexture ) data.map = this.map.toJSON( meta ).uuid;
  // 	if ( this.matcap && this.matcap.isTexture ) data.matcap = this.matcap.toJSON( meta ).uuid;
  // 	if ( this.alphaMap && this.alphaMap.isTexture ) data.alphaMap = this.alphaMap.toJSON( meta ).uuid;

  // 	if ( this.lightMap && this.lightMap.isTexture ) {

  // 		data.lightMap = this.lightMap.toJSON( meta ).uuid;
  // 		data.lightMapIntensity = this.lightMapIntensity;

  // 	}

  // 	if ( this.aoMap && this.aoMap.isTexture ) {

  // 		data.aoMap = this.aoMap.toJSON( meta ).uuid;
  // 		data.aoMapIntensity = this.aoMapIntensity;

  // 	}

  // 	if ( this.bumpMap && this.bumpMap.isTexture ) {

  // 		data.bumpMap = this.bumpMap.toJSON( meta ).uuid;
  // 		data.bumpScale = this.bumpScale;

  // 	}

  // 	if ( this.normalMap && this.normalMap.isTexture ) {

  // 		data.normalMap = this.normalMap.toJSON( meta ).uuid;
  // 		data.normalMapType = this.normalMapType;
  // 		data.normalScale = this.normalScale.toArray();

  // 	}

  // 	if ( this.displacementMap && this.displacementMap.isTexture ) {

  // 		data.displacementMap = this.displacementMap.toJSON( meta ).uuid;
  // 		data.displacementScale = this.displacementScale;
  // 		data.displacementBias = this.displacementBias;

  // 	}

  // 	if ( this.roughnessMap && this.roughnessMap.isTexture ) data.roughnessMap = this.roughnessMap.toJSON( meta ).uuid;
  // 	if ( this.metalnessMap && this.metalnessMap.isTexture ) data.metalnessMap = this.metalnessMap.toJSON( meta ).uuid;

  // 	if ( this.emissiveMap && this.emissiveMap.isTexture ) data.emissiveMap = this.emissiveMap.toJSON( meta ).uuid;
  // 	if ( this.specularMap && this.specularMap.isTexture ) data.specularMap = this.specularMap.toJSON( meta ).uuid;

  // 	if ( this.envMap && this.envMap.isTexture ) {

  // 		data.envMap = this.envMap.toJSON( meta ).uuid;
  // 		data.reflectivity = this.reflectivity; // Scale behind envMap
  // 		data.refractionRatio = this.refractionRatio;

  // 		if ( this.combine !== undefined ) data.combine = this.combine;
  // 		if ( this.envMapIntensity !== undefined ) data.envMapIntensity = this.envMapIntensity;

  // 	}

  // 	if ( this.gradientMap && this.gradientMap.isTexture ) {

  // 		data.gradientMap = this.gradientMap.toJSON( meta ).uuid;

  // 	}

  // 	if ( this.size !== undefined ) data.size = this.size;
  // 	if ( this.shadowSide !== null ) data.shadowSide = this.shadowSide;
  // 	if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

  // 	if ( this.blending !== NormalBlending ) data.blending = this.blending;
  // 	if ( this.side !== FrontSide ) data.side = this.side;
  // 	if ( this.vertexColors ) data.vertexColors = true;

  // 	if ( this.opacity < 1 ) data.opacity = this.opacity;
  // 	if ( this.transparent === true ) data.transparent = this.transparent;

  // 	data.depthFunc = this.depthFunc;
  // 	data.depthTest = this.depthTest;
  // 	data.depthWrite = this.depthWrite;
  // 	data.colorWrite = this.colorWrite;

  // 	data.stencilWrite = this.stencilWrite;
  // 	data.stencilWriteMask = this.stencilWriteMask;
  // 	data.stencilFunc = this.stencilFunc;
  // 	data.stencilRef = this.stencilRef;
  // 	data.stencilFuncMask = this.stencilFuncMask;
  // 	data.stencilFail = this.stencilFail;
  // 	data.stencilZFail = this.stencilZFail;
  // 	data.stencilZPass = this.stencilZPass;

  // 	// rotation (SpriteMaterial)
  // 	if ( this.rotation && this.rotation !== 0 ) data.rotation = this.rotation;

  // 	if ( this.polygonOffset === true ) data.polygonOffset = true;
  // 	if ( this.polygonOffsetFactor !== 0 ) data.polygonOffsetFactor = this.polygonOffsetFactor;
  // 	if ( this.polygonOffsetUnits !== 0 ) data.polygonOffsetUnits = this.polygonOffsetUnits;

  // 	if ( this.linewidth && this.linewidth !== 1 ) data.linewidth = this.linewidth;
  // 	if ( this.dashSize !== undefined ) data.dashSize = this.dashSize;
  // 	if ( this.gapSize !== undefined ) data.gapSize = this.gapSize;
  // 	if ( this.scale !== undefined ) data.scale = this.scale;

  // 	if ( this.dithering === true ) data.dithering = true;

  // 	if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
  // 	if ( this.alphaToCoverage === true ) data.alphaToCoverage = this.alphaToCoverage;
  // 	if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = this.premultipliedAlpha;

  // 	if ( this.wireframe === true ) data.wireframe = this.wireframe;
  // 	if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
  // 	if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
  // 	if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

  // 	if ( this.morphTargets === true ) data.morphTargets = true;
  // 	if ( this.morphNormals === true ) data.morphNormals = true;
  // 	if ( this.skinning === true ) data.skinning = true;

  // 	if ( this.flatShading === true ) data.flatShading = this.flatShading;

  // 	if ( this.visible === false ) data.visible = false;

  // 	if ( this.toneMapped === false ) data.toneMapped = false;

  // 	if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

  // 	// TODO: Copied from Object3D.toJSON

  // 	function extractFromCache( cache ) {

  // 		const values = [];

  // 		for ( const key in cache ) {

  // 			const data = cache[ key ];
  // 			delete data.metadata;
  // 			values.push( data );

  // 		}

  // 		return values;

  // 	}

  // 	if ( isRoot ) {

  // 		const textures = extractFromCache( meta.textures );
  // 		const images = extractFromCache( meta.images );

  // 		if ( textures.length > 0 ) data.textures = textures;
  // 		if ( images.length > 0 ) data.images = images;

  // 	}

  // 	return data;

  // },

  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(source) {
    this.name = source.name;
    this.fog = source.fog;
    this.blending = source.blending;
    this.side = source.side;
    this.vertexColors = source.vertexColors;
    this.opacity = source.opacity;
    this.transparent = source.transparent;
    this.blendSrc = source.blendSrc;
    this.blendDst = source.blendDst;
    this.blendEquation = source.blendEquation;
    this.blendSrcAlpha = source.blendSrcAlpha;
    this.blendDstAlpha = source.blendDstAlpha;
    this.blendEquationAlpha = source.blendEquationAlpha;
    this.depthFunc = source.depthFunc;
    this.depthTest = source.depthTest;
    this.depthWrite = source.depthWrite;
    this.stencilWriteMask = source.stencilWriteMask;
    this.stencilFunc = source.stencilFunc;
    this.stencilRef = source.stencilRef;
    this.stencilFuncMask = source.stencilFuncMask;
    this.stencilFail = source.stencilFail;
    this.stencilZFail = source.stencilZFail;
    this.stencilZPass = source.stencilZPass;
    this.stencilWrite = source.stencilWrite;
    var srcPlanes = source.clippingPlanes;
    var dstPlanes = null;
    if (srcPlanes !== null) {
      var n = srcPlanes.length;
      dstPlanes = new Array(n);
      for (var i = 0; i !== n; ++i) {
        dstPlanes[i] = srcPlanes[i].clone();
      }
    }
    this.clippingPlanes = dstPlanes;
    this.clipIntersection = source.clipIntersection;
    this.clipShadows = source.clipShadows;
    this.shadowSide = source.shadowSide;
    this.colorWrite = source.colorWrite;
    this.precision = source.precision;
    this.polygonOffset = source.polygonOffset;
    this.polygonOffsetFactor = source.polygonOffsetFactor;
    this.polygonOffsetUnits = source.polygonOffsetUnits;
    this.dithering = source.dithering;
    this.alphaTest = source.alphaTest;
    this.alphaToCoverage = source.alphaToCoverage;
    this.premultipliedAlpha = source.premultipliedAlpha;
    this.visible = source.visible;
    this.toneMapped = source.toneMapped;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    return this;
  },
  dispose: function dispose() {
    this.emit('dispose');
  }
});
Object.defineProperty(Material.prototype, 'needsUpdate', {
  set: function set(value) {
    if (value === true) this.version++;
  }
});

;// ./src/materials/MeshBasicMaterial.js




/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>
 * }
 */

function MeshBasicMaterial(parameters) {
  Material.call(this);
  this.type = 'MeshBasicMaterial';
  this.color = new Color(0xffffff); // emissive

  this.map = null;
  this.lightMap = null;
  this.lightMapIntensity = 1.0;
  this.aoMap = null;
  this.aoMapIntensity = 1.0;
  this.specularMap = null;
  this.alphaMap = null;
  this.envMap = null;
  this.combine = MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.wireframeLinecap = 'round';
  this.wireframeLinejoin = 'round';
  this.skinning = false;
  this.morphTargets = false;
  this.setValues(parameters);
}
MeshBasicMaterial.prototype = Object.create(Material.prototype);
MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;
MeshBasicMaterial.prototype.isMeshBasicMaterial = true;
MeshBasicMaterial.prototype.copy = function (source) {
  Material.prototype.copy.call(this, source);
  this.color.copy(source.color);
  this.map = source.map;
  this.lightMap = source.lightMap;
  this.lightMapIntensity = source.lightMapIntensity;
  this.aoMap = source.aoMap;
  this.aoMapIntensity = source.aoMapIntensity;
  this.specularMap = source.specularMap;
  this.alphaMap = source.alphaMap;
  this.envMap = source.envMap;
  this.combine = source.combine;
  this.reflectivity = source.reflectivity;
  this.refractionRatio = source.refractionRatio;
  this.wireframe = source.wireframe;
  this.wireframeLinewidth = source.wireframeLinewidth;
  this.wireframeLinecap = source.wireframeLinecap;
  this.wireframeLinejoin = source.wireframeLinejoin;
  this.skinning = source.skinning;
  this.morphTargets = source.morphTargets;
  return this;
};

;// ./src/objects/Mesh.js


// import { Sphere } from '../math/Sphere.js';
// import { Ray } from '../math/Ray.js';


// import { Triangle } from '../math/Triangle.js';
// import { Face3 } from '../core/Face3.js';




/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author jonobr1 / http://jonobr1.com/
 */

var _inverseMatrix = new Mat4();
// var _ray = new Ray();
// var _sphere = new Sphere();

var _vA = new Vec3();
var _vB = new Vec3();
var _vC = new Vec3();
var _tempA = new Vec3();
var _tempB = new Vec3();
var _tempC = new Vec3();
var _morphA = new Vec3();
var _morphB = new Vec3();
var _morphC = new Vec3();
var _uvA = new Vec2();
var _uvB = new Vec2();
var _uvC = new Vec2();
var _intersectionPoint = new Vec3();
var _intersectionPointWorld = new Vec3();
function Mesh(geometry, material) {
  Object3D.call(this);
  this.type = 'Mesh';
  this.geometry = geometry !== undefined ? geometry : new Geometry();
  this.material = material !== undefined ? material : new MeshBasicMaterial({
    color: Math.random() * 0xffffff
  });
  this.updateMorphTargets();
}
Mesh.prototype = Object.assign(Object.create(Object3D.prototype), {
  constructor: Mesh,
  isMesh: true,
  copy: function copy(source) {
    Object3D.prototype.copy.call(this, source);
    if (source.morphTargetInfluences !== undefined) {
      this.morphTargetInfluences = source.morphTargetInfluences.slice();
    }
    if (source.morphTargetDictionary !== undefined) {
      this.morphTargetDictionary = Object.assign({}, source.morphTargetDictionary);
    }
    return this;
  },
  updateMorphTargets: function updateMorphTargets() {
    var geometry = this.geometry;
    var m, ml, name;
    if (geometry.isGeometry) {
      var morphAttributes = geometry.morphAttributes;
      var keys = Object.keys(morphAttributes);
      if (keys.length > 0) {
        var morphAttribute = morphAttributes[keys[0]];
        if (morphAttribute !== undefined) {
          this.morphTargetInfluences = [];
          this.morphTargetDictionary = {};
          for (m = 0, ml = morphAttribute.length; m < ml; m++) {
            name = morphAttribute[m].name || String(m);
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[name] = m;
          }
        }
      }
    } else {
      var morphTargets = geometry.morphTargets;
      if (morphTargets !== undefined && morphTargets.length > 0) {
        console.error('THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.Geometry instead.');
      }
    }
  },
  raycast: function raycast(raycaster, intersects) {
    var geometry = this.geometry;
    var material = this.material;
    var matrixWorld = this.matrixWorld;
    if (material === undefined) return;

    // Checking boundingSphere distance to ray

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    _sphere.copy(geometry.boundingSphere);
    _sphere.applyMat4(matrixWorld);
    if (raycaster.ray.intersectsSphere(_sphere) === false) return;

    //

    _inverseMatrix.getInverse(matrixWorld);
    _ray.copy(raycaster.ray).applyMat4(_inverseMatrix);

    // Check boundingBox before continuing

    if (geometry.boundingBox !== null) {
      if (_ray.intersectsBox(geometry.boundingBox) === false) return;
    }
    var intersection;
    if (geometry.isGeometry) {
      var a, b, c;
      var index = geometry.index;
      var position = geometry.attributes.position;
      var morphPosition = geometry.morphAttributes.position;
      var morphTargetsRelative = geometry.morphTargetsRelative;
      var uv = geometry.attributes.uv;
      var uv2 = geometry.attributes.uv2;
      var groups = geometry.groups;
      var drawRange = geometry.drawRange;
      var i, j, il, jl;
      var group, groupMaterial;
      var start, end;
      if (index !== null) {
        // indexed buffer geometry

        if (Array.isArray(material)) {
          for (i = 0, il = groups.length; i < il; i++) {
            group = groups[i];
            groupMaterial = material[group.materialIndex];
            start = Math.max(group.start, drawRange.start);
            end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
            for (j = start, jl = end; j < jl; j += 3) {
              a = index.getX(j);
              b = index.getX(j + 1);
              c = index.getX(j + 2);
              intersection = checkGeometryIntersection(this, groupMaterial, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);
              if (intersection) {
                intersection.faceIndex = Math.floor(j / 3); // triangle number in indexed buffer semantics
                intersection.face.materialIndex = group.materialIndex;
                intersects.push(intersection);
              }
            }
          }
        } else {
          start = Math.max(0, drawRange.start);
          end = Math.min(index.count, drawRange.start + drawRange.count);
          for (i = start, il = end; i < il; i += 3) {
            a = index.getX(i);
            b = index.getX(i + 1);
            c = index.getX(i + 2);
            intersection = checkGeometryIntersection(this, material, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);
            if (intersection) {
              intersection.faceIndex = Math.floor(i / 3); // triangle number in indexed buffer semantics
              intersects.push(intersection);
            }
          }
        }
      } else if (position !== undefined) {
        // non-indexed buffer geometry

        if (Array.isArray(material)) {
          for (i = 0, il = groups.length; i < il; i++) {
            group = groups[i];
            groupMaterial = material[group.materialIndex];
            start = Math.max(group.start, drawRange.start);
            end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
            for (j = start, jl = end; j < jl; j += 3) {
              a = j;
              b = j + 1;
              c = j + 2;
              intersection = checkGeometryIntersection(this, groupMaterial, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);
              if (intersection) {
                intersection.faceIndex = Math.floor(j / 3); // triangle number in non-indexed buffer semantics
                intersection.face.materialIndex = group.materialIndex;
                intersects.push(intersection);
              }
            }
          }
        } else {
          start = Math.max(0, drawRange.start);
          end = Math.min(position.count, drawRange.start + drawRange.count);
          for (i = start, il = end; i < il; i += 3) {
            a = i;
            b = i + 1;
            c = i + 2;
            intersection = checkGeometryIntersection(this, material, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);
            if (intersection) {
              intersection.faceIndex = Math.floor(i / 3); // triangle number in non-indexed buffer semantics
              intersects.push(intersection);
            }
          }
        }
      }
    } else if (geometry.isGeometry) {
      var fvA, fvB, fvC;
      var isMultiMaterial = Array.isArray(material);
      var vertices = geometry.vertices;
      var faces = geometry.faces;
      var uvs;
      var faceVertexUvs = geometry.faceVertexUvs[0];
      if (faceVertexUvs.length > 0) uvs = faceVertexUvs;
      for (var f = 0, fl = faces.length; f < fl; f++) {
        var face = faces[f];
        var faceMaterial = isMultiMaterial ? material[face.materialIndex] : material;
        if (faceMaterial === undefined) continue;
        fvA = vertices[face.a];
        fvB = vertices[face.b];
        fvC = vertices[face.c];
        intersection = checkIntersection(this, faceMaterial, raycaster, _ray, fvA, fvB, fvC, _intersectionPoint);
        if (intersection) {
          if (uvs && uvs[f]) {
            var uvs_f = uvs[f];
            _uvA.copy(uvs_f[0]);
            _uvB.copy(uvs_f[1]);
            _uvC.copy(uvs_f[2]);
            intersection.uv = Triangle.getUV(_intersectionPoint, fvA, fvB, fvC, _uvA, _uvB, _uvC, new Vec2());
          }
          intersection.face = face;
          intersection.faceIndex = f;
          intersects.push(intersection);
        }
      }
    }
  },
  clone: function clone() {
    return new this.constructor(this.geometry, this.material).copy(this);
  }
});
function checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {
  var intersect;
  if (material.side === BackSide) {
    intersect = ray.intersectTriangle(pC, pB, pA, true, point);
  } else {
    intersect = ray.intersectTriangle(pA, pB, pC, material.side !== DoubleSide, point);
  }
  if (intersect === null) return null;
  _intersectionPointWorld.copy(point);
  _intersectionPointWorld.applyMat4(object.matrixWorld);
  var distance = raycaster.ray.origin.distanceTo(_intersectionPointWorld);
  if (distance < raycaster.near || distance > raycaster.far) return null;
  return {
    distance: distance,
    point: _intersectionPointWorld.clone(),
    object: object
  };
}
function checkGeometryIntersection(object, material, raycaster, ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c) {
  _vA.fromBufferAttribute(position, a);
  _vB.fromBufferAttribute(position, b);
  _vC.fromBufferAttribute(position, c);
  var morphInfluences = object.morphTargetInfluences;
  if (material.morphTargets && morphPosition && morphInfluences) {
    _morphA.set(0, 0, 0);
    _morphB.set(0, 0, 0);
    _morphC.set(0, 0, 0);
    for (var i = 0, il = morphPosition.length; i < il; i++) {
      var influence = morphInfluences[i];
      var morphAttribute = morphPosition[i];
      if (influence === 0) continue;
      _tempA.fromBufferAttribute(morphAttribute, a);
      _tempB.fromBufferAttribute(morphAttribute, b);
      _tempC.fromBufferAttribute(morphAttribute, c);
      if (morphTargetsRelative) {
        _morphA.addScaledVector(_tempA, influence);
        _morphB.addScaledVector(_tempB, influence);
        _morphC.addScaledVector(_tempC, influence);
      } else {
        _morphA.addScaledVector(_tempA.sub(_vA), influence);
        _morphB.addScaledVector(_tempB.sub(_vB), influence);
        _morphC.addScaledVector(_tempC.sub(_vC), influence);
      }
    }
    _vA.add(_morphA);
    _vB.add(_morphB);
    _vC.add(_morphC);
  }
  var intersection = checkIntersection(object, material, raycaster, ray, _vA, _vB, _vC, _intersectionPoint);
  if (intersection) {
    if (uv) {
      _uvA.fromBufferAttribute(uv, a);
      _uvB.fromBufferAttribute(uv, b);
      _uvC.fromBufferAttribute(uv, c);
      intersection.uv = Triangle.getUV(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vec2());
    }
    if (uv2) {
      _uvA.fromBufferAttribute(uv2, a);
      _uvB.fromBufferAttribute(uv2, b);
      _uvC.fromBufferAttribute(uv2, c);
      intersection.uv2 = Triangle.getUV(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vec2());
    }
    var face = new Face3(a, b, c);
    Triangle.getNormal(_vA, _vB, _vC, face.normal);
    intersection.face = face;
  }
  return intersection;
}

;// ./src/objects/InstancedMesh.js



var _instanceLocalMatrix = new Mat4();
var _instanceWorldMatrix = new Mat4();
var _instanceIntersects = [];
var _mesh = new Mesh();
function InstancedMesh(geometry, material, count) {
  Mesh.call(this, geometry, material);
  this.instanceMatrix = new BufferAttribute(new Float32Array(count * 16), 16);
  this.instanceColor = null;
  this.count = count;
  this.frustumCulled = false;
}
InstancedMesh.prototype = Object.assign(Object.create(Mesh.prototype), {
  constructor: InstancedMesh,
  isInstancedMesh: true,
  copy: function copy(source) {
    Mesh.prototype.copy.call(this, source);
    this.instanceMatrix.copy(source.instanceMatrix);
    if (source.instanceColor !== null) this.instanceColor = source.instanceColor.clone();
    this.count = source.count;
    return this;
  },
  getColorAt: function getColorAt(index, color) {
    color.fromArray(this.instanceColor.array, index * 3);
  },
  getMatrixAt: function getMatrixAt(index, matrix) {
    matrix.fromArray(this.instanceMatrix.array, index * 16);
  },
  raycast: function raycast(raycaster, intersects) {
    var matrixWorld = this.matrixWorld;
    var raycastTimes = this.count;
    _mesh.geometry = this.geometry;
    _mesh.material = this.material;
    if (_mesh.material === undefined) return;
    for (var instanceId = 0; instanceId < raycastTimes; instanceId++) {
      // calculate the world matrix for each instance

      this.getMatrixAt(instanceId, _instanceLocalMatrix);
      _instanceWorldMatrix.mul2(matrixWorld, _instanceLocalMatrix);

      // the mesh represents this single instance

      _mesh.matrixWorld = _instanceWorldMatrix;
      _mesh.raycast(raycaster, _instanceIntersects);

      // process the result of raycast

      for (var i = 0, l = _instanceIntersects.length; i < l; i++) {
        var intersect = _instanceIntersects[i];
        intersect.instanceId = instanceId;
        intersect.object = this;
        intersects.push(intersect);
      }
      _instanceIntersects.length = 0;
    }
  },
  setColorAt: function setColorAt(index, color) {
    if (this.instanceColor === null) {
      this.instanceColor = new BufferAttribute(new Float32Array(this.count * 3), 3);
    }
    color.toArray(this.instanceColor.array, index * 3);
  },
  setMatrixAt: function setMatrixAt(index, matrix) {
    matrix.toArray(this.instanceMatrix.array, index * 16);
  },
  updateMorphTargets: function updateMorphTargets() {},
  dispose: function dispose() {
    this.emit('dispose');
  }
});

;// ./src/geometries/InterleavedBuffer.js


/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

function InterleavedBuffer(array, stride) {
  this.array = array;
  this.stride = stride;
  this.count = array !== undefined ? array.length / stride : 0;
  this.usage = StaticDrawUsage;
  this.updateRange = {
    offset: 0,
    count: -1
  };
  this.version = 0;
}
Object.defineProperty(InterleavedBuffer.prototype, 'needsUpdate', {
  set: function set(value) {
    if (value === true) this.version++;
  }
});
Object.assign(InterleavedBuffer.prototype, {
  isInterleavedBuffer: true,
  onUploadCallback: function onUploadCallback() {},
  setUsage: function setUsage(value) {
    this.usage = value;
    return this;
  },
  copy: function copy(source) {
    this.array = new source.array.constructor(source.array);
    this.count = source.count;
    this.stride = source.stride;
    this.usage = source.usage;
    return this;
  },
  copyAt: function copyAt(index1, attribute, index2) {
    index1 *= this.stride;
    index2 *= attribute.stride;
    for (var i = 0, l = this.stride; i < l; i++) {
      this.array[index1 + i] = attribute.array[index2 + i];
    }
    return this;
  },
  set: function set(value, offset) {
    if (offset === undefined) offset = 0;
    this.array.set(value, offset);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  onUpload: function onUpload(callback) {
    this.onUploadCallback = callback;
    return this;
  }
});

;// ./src/geometries/InterleavedBufferAttribute.js


/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */

var InterleavedBufferAttribute_vector = new Vec3();
function InterleavedBufferAttribute(interleavedBuffer, itemSize, offset, normalized) {
  this.data = interleavedBuffer;
  this.itemSize = itemSize;
  this.offset = offset;
  this.normalized = normalized === true;
}
Object.defineProperties(InterleavedBufferAttribute.prototype, {
  count: {
    get: function get() {
      return this.data.count;
    }
  },
  array: {
    get: function get() {
      return this.data.array;
    }
  }
});
Object.assign(InterleavedBufferAttribute.prototype, {
  isInterleavedBufferAttribute: true,
  applyMatrix4: function applyMatrix4(m) {
    for (var i = 0, l = this.data.count; i < l; i++) {
      InterleavedBufferAttribute_vector.x = this.getX(i);
      InterleavedBufferAttribute_vector.y = this.getY(i);
      InterleavedBufferAttribute_vector.z = this.getZ(i);
      InterleavedBufferAttribute_vector.applyMatrix4(m);
      this.setXYZ(i, InterleavedBufferAttribute_vector.x, InterleavedBufferAttribute_vector.y, InterleavedBufferAttribute_vector.z);
    }
    return this;
  },
  setX: function setX(index, x) {
    this.data.array[index * this.data.stride + this.offset] = x;
    return this;
  },
  setY: function setY(index, y) {
    this.data.array[index * this.data.stride + this.offset + 1] = y;
    return this;
  },
  setZ: function setZ(index, z) {
    this.data.array[index * this.data.stride + this.offset + 2] = z;
    return this;
  },
  setW: function setW(index, w) {
    this.data.array[index * this.data.stride + this.offset + 3] = w;
    return this;
  },
  getX: function getX(index) {
    return this.data.array[index * this.data.stride + this.offset];
  },
  getY: function getY(index) {
    return this.data.array[index * this.data.stride + this.offset + 1];
  },
  getZ: function getZ(index) {
    return this.data.array[index * this.data.stride + this.offset + 2];
  },
  getW: function getW(index) {
    return this.data.array[index * this.data.stride + this.offset + 3];
  },
  setXY: function setXY(index, x, y) {
    index = index * this.data.stride + this.offset;
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    return this;
  },
  setXYZ: function setXYZ(index, x, y, z) {
    index = index * this.data.stride + this.offset;
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    this.data.array[index + 2] = z;
    return this;
  },
  setXYZW: function setXYZW(index, x, y, z, w) {
    index = index * this.data.stride + this.offset;
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    this.data.array[index + 2] = z;
    this.data.array[index + 3] = w;
    return this;
  }
});

;// ./src/materials/SpriteMaterial.js


function SpriteMaterial(parameters) {
  Material.call(this);
  this.type = 'SpriteMaterial';
  this.color = new Color(0xffffff);
  this.map = null;
  this.alphaMap = null;
  this.rotation = 0;
  this.sizeAttenuation = true;
  this.transparent = true;
  this.setValues(parameters);
}
SpriteMaterial.prototype = Object.create(Material.prototype);
SpriteMaterial.prototype.constructor = SpriteMaterial;
SpriteMaterial.prototype.isSpriteMaterial = true;

// SpriteMaterial.prototype.copy = function ( source ) {

// 	Material.prototype.copy.call( this, source );

// 	this.color.copy( source.color );

// 	this.map = source.map;

// 	this.alphaMap = source.alphaMap;

// 	this.rotation = source.rotation;

// 	this.sizeAttenuation = source.sizeAttenuation;

// 	return this;

// };


;// ./src/objects/Sprite3D.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */




// import { Triangle } from '../math/Triangle.js';





var _geometry;

// var _intersectPoint = new Vec3();
// var _worldScale = new Vec3();
// var _mvPosition = new Vec3();

// var _alignedPosition = new Vec2();
// var _rotatedPosition = new Vec2();
// var _viewWorldMatrix = new Mat4();

// var _vA = new Vec3();
// var _vB = new Vec3();
// var _vC = new Vec3();

// var _uvA = new Vec2();
// var _uvB = new Vec2();
// var _uvC = new Vec2();

function Sprite3D(material) {
  Object3D.call(this);

  // this.type = 'Sprite3D';

  if (_geometry === undefined) {
    _geometry = new Geometry();
    var float32Array = new Float32Array([-0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1]);
    var interleavedBuffer = new InterleavedBuffer(float32Array, 5);
    _geometry.setIndex([0, 1, 2, 0, 2, 3]);
    _geometry.setAttribute('position', new InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
    _geometry.setAttribute('uv', new InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));
  }
  this.geometry = _geometry;
  this.material = material !== undefined ? material : new SpriteMaterial();
  this.center = new Vec2(0.5, 0.5);
}
Sprite3D.prototype = Object.assign(Object.create(Object3D.prototype), {
  constructor: Sprite3D,
  isSprite3D: true

  // raycast: function ( raycaster, intersects ) {

  // 	if ( raycaster.camera === null ) {

  // 		console.error( 'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.' );

  // 	}

  // 	_worldScale.setFromMatrixScale( this.matrixWorld );

  // 	_viewWorldMatrix.copy( raycaster.camera.matrixWorld );
  // 	this.modelViewMatrix.multiplyMatrices( raycaster.camera.matrixWorldInverse, this.matrixWorld );

  // 	_mvPosition.setFromMatrixPosition( this.modelViewMatrix );

  // 	if ( raycaster.camera.isPerspectiveCamera && this.material.sizeAttenuation === false ) {

  // 		_worldScale.multiplyScalar( - _mvPosition.z );

  // 	}

  // 	var rotation = this.material.rotation;
  // 	var sin, cos;
  // 	if ( rotation !== 0 ) {

  // 		cos = Math.cos( rotation );
  // 		sin = Math.sin( rotation );

  // 	}

  // 	var center = this.center;

  // 	transformVertex( _vA.set( - 0.5, - 0.5, 0 ), _mvPosition, center, _worldScale, sin, cos );
  // 	transformVertex( _vB.set( 0.5, - 0.5, 0 ), _mvPosition, center, _worldScale, sin, cos );
  // 	transformVertex( _vC.set( 0.5, 0.5, 0 ), _mvPosition, center, _worldScale, sin, cos );

  // 	_uvA.set( 0, 0 );
  // 	_uvB.set( 1, 0 );
  // 	_uvC.set( 1, 1 );

  // 	// check first triangle
  // 	var intersect = raycaster.ray.intersectTriangle( _vA, _vB, _vC, false, _intersectPoint );

  // 	if ( intersect === null ) {

  // 		// check second triangle
  // 		transformVertex( _vB.set( - 0.5, 0.5, 0 ), _mvPosition, center, _worldScale, sin, cos );
  // 		_uvB.set( 0, 1 );

  // 		intersect = raycaster.ray.intersectTriangle( _vA, _vC, _vB, false, _intersectPoint );
  // 		if ( intersect === null ) {

  // 			return;

  // 		}

  // 	}

  // 	var distance = raycaster.ray.origin.distanceTo( _intersectPoint );

  // 	if ( distance < raycaster.near || distance > raycaster.far ) return;

  // 	intersects.push( {

  // 		distance: distance,
  // 		point: _intersectPoint.clone(),
  // 		uv: Triangle.getUV( _intersectPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vec2() ),
  // 		face: null,
  // 		object: this

  // 	} );

  // },

  // clone: function () {

  // 	return new this.constructor( this.material ).copy( this );

  // },

  // copy: function ( source ) {

  // 	Object3D.prototype.copy.call( this, source );

  // 	if ( source.center !== undefined ) this.center.copy( source.center );

  // 	return this;

  // }
});

// function transformVertex( vertexPosition, mvPosition, center, scale, sin, cos ) {

// 	// compute position in camera space
// 	_alignedPosition.subVectors( vertexPosition, center ).addScalar( 0.5 ).multiply( scale );

// 	// to check if rotation is not zero
// 	if ( sin !== undefined ) {

// 		_rotatedPosition.x = ( cos * _alignedPosition.x ) - ( sin * _alignedPosition.y );
// 		_rotatedPosition.y = ( sin * _alignedPosition.x ) + ( cos * _alignedPosition.y );

// 	} else {

// 		_rotatedPosition.copy( _alignedPosition );

// 	}

// 	vertexPosition.copy( mvPosition );
// 	vertexPosition.x += _rotatedPosition.x;
// 	vertexPosition.y += _rotatedPosition.y;

// 	// transform to world space
// 	vertexPosition.applyMat4( _viewWorldMatrix );

// }


;// ./src/objects/Canvas.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/




function Canvas() {
  Object3D.call(this);

  // this.matrixWorldInverse = new Mat4();

  // this.projectionMatrix = new Mat4();
  // this.projectionMatrixInverse = new Mat4();
}
Canvas.prototype = Object.assign(Object.create(Object3D.prototype), {
  constructor: Canvas,
  isCanvas: true,
  isSprite: true
});

;// ./src/objects/Screen.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
 */




function Screen() {
  Container.call(this);
  this.visible = true;
  this.worldOpacity = 1;
  this.worldTransform = new Mat3();

  // this.matrixWorldInverse = new Mat4();

  // this.projectionMatrix = new Mat4();
  // this.projectionMatrixInverse = new Mat4();
}
Screen.prototype = Object.assign(Object.create(Container.prototype), {
  constructor: Screen,
  isObject: true,
  isScreen: true,
  updateTransform: function updateTransform() {
    for (var i = 0, j = this.children.length; i < j; i++) {
      this.children[i].updateTransform();
    }
  }
});

;// ./src/objects/Camera.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/




function Camera() {
  Object3D.call(this);
  this.type = 'Camera';
  this.matrixWorldInverse = new Mat4();
  this.projectionMatrix = new Mat4();
  this.projectionMatrixInverse = new Mat4();
}
Camera.prototype = Object.assign(Object.create(Object3D.prototype), {
  constructor: Camera,
  isCamera: true,
  copy: function copy(source, recursive) {
    Object3D.prototype.copy.call(this, source, recursive);
    this.matrixWorldInverse.copy(source.matrixWorldInverse);
    this.projectionMatrix.copy(source.projectionMatrix);
    this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
    return this;
  },
  getWorldDirection: function getWorldDirection(target) {
    if (target === undefined) {
      console.warn('THREE.Camera: .getWorldDirection() target is now required');
      target = new Vec3();
    }
    this.updateTransform(true);
    var e = this.matrixWorld.elements;
    return target.set(-e[8], -e[9], -e[10]).normalize();
  },
  updateTransform: function updateTransform(force) {
    Object3D.prototype.updateTransform.call(this, force);
    this.matrixWorldInverse.getInverse(this.matrixWorld);
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  }
});

;// ./src/objects/OrthographicCamera.js



/**
 * @author alteredq / http://alteredqualia.com/
 * @author arose / http://github.com/arose
 */

function OrthographicCamera(left, right, top, bottom, near, far) {
  Camera.call(this);
  this.type = 'OrthographicCamera';
  this.zoom = 1;
  this.view = null;
  this.left = left !== undefined ? left : -1;
  this.right = right !== undefined ? right : 1;
  this.top = top !== undefined ? top : 1;
  this.bottom = bottom !== undefined ? bottom : -1;
  this.near = near !== undefined ? near : 0.1;
  this.far = far !== undefined ? far : 2000;
  this.updateProjectionMatrix();
}
OrthographicCamera.prototype = Object.assign(Object.create(Camera.prototype), {
  constructor: OrthographicCamera,
  isOrthographicCamera: true,
  copy: function copy(source, recursive) {
    Camera.prototype.copy.call(this, source, recursive);
    this.left = source.left;
    this.right = source.right;
    this.top = source.top;
    this.bottom = source.bottom;
    this.near = source.near;
    this.far = source.far;
    this.zoom = source.zoom;
    this.view = source.view === null ? null : Object.assign({}, source.view);
    return this;
  },
  setViewOffset: function setViewOffset(fullWidth, fullHeight, x, y, width, height) {
    if (this.view === null) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = fullWidth;
    this.view.fullHeight = fullHeight;
    this.view.offsetX = x;
    this.view.offsetY = y;
    this.view.width = width;
    this.view.height = height;
    this.updateProjectionMatrix();
  },
  clearViewOffset: function clearViewOffset() {
    if (this.view !== null) {
      this.view.enabled = false;
    }
    this.updateProjectionMatrix();
  },
  updateProjectionMatrix: function updateProjectionMatrix() {
    var dx = (this.right - this.left) / (2 * this.zoom);
    var dy = (this.top - this.bottom) / (2 * this.zoom);
    var cx = (this.right + this.left) / 2;
    var cy = (this.top + this.bottom) / 2;
    var left = cx - dx;
    var right = cx + dx;
    var top = cy + dy;
    var bottom = cy - dy;
    if (this.view !== null && this.view.enabled) {
      var zoomW = this.zoom / (this.view.width / this.view.fullWidth);
      var zoomH = this.zoom / (this.view.height / this.view.fullHeight);
      var scaleW = (this.right - this.left) / this.view.width;
      var scaleH = (this.top - this.bottom) / this.view.height;
      left += scaleW * (this.view.offsetX / zoomW);
      right = left + scaleW * (this.view.width / zoomW);
      top -= scaleH * (this.view.offsetY / zoomH);
      bottom = top - scaleH * (this.view.height / zoomH);
    }
    this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
    this.projectionMatrixInverse.getInverse(this.projectionMatrix);
  }

  // toJSON: function ( meta ) {

  //     var data = Object3D.prototype.toJSON.call( this, meta );

  //     data.object.zoom = this.zoom;
  //     data.object.left = this.left;
  //     data.object.right = this.right;
  //     data.object.top = this.top;
  //     data.object.bottom = this.bottom;
  //     data.object.near = this.near;
  //     data.object.far = this.far;

  //     if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

  //     return data;

  // }
});

;// ./src/objects/PerspectiveCamera.js




/**
 * @author mrdoob / http://mrdoob.com/
 * @author greggman / http://games.greggman.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author tschw
 */

function PerspectiveCamera(fov, aspect, near, far) {
  Camera.call(this);
  this.type = 'PerspectiveCamera';
  this.fov = fov !== undefined ? fov : 50;
  this.zoom = 1;
  this.near = near !== undefined ? near : 0.1;
  this.far = far !== undefined ? far : 2000;
  this.focus = 10;
  this.aspect = aspect !== undefined ? aspect : 1;
  this.view = null;
  this.filmGauge = 35; // width of the film (default in millimeters)
  this.filmOffset = 0; // horizontal film offset (same unit as gauge)

  this.updateProjectionMatrix();
}
PerspectiveCamera.prototype = Object.assign(Object.create(Camera.prototype), {
  constructor: PerspectiveCamera,
  isPerspectiveCamera: true,
  copy: function copy(source, recursive) {
    Camera.prototype.copy.call(this, source, recursive);
    this.fov = source.fov;
    this.zoom = source.zoom;
    this.near = source.near;
    this.far = source.far;
    this.focus = source.focus;
    this.aspect = source.aspect;
    this.view = source.view === null ? null : Object.assign({}, source.view);
    this.filmGauge = source.filmGauge;
    this.filmOffset = source.filmOffset;
    return this;
  },
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength: function setFocalLength(focalLength) {
    // see http://www.bobatkins.com/photography/technical/field_of_view.html
    var vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
    this.fov = _Math.RAD2DEG * 2 * Math.atan(vExtentSlope);
    this.updateProjectionMatrix();
  },
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength: function getFocalLength() {
    var vExtentSlope = Math.tan(_Math.DEG2RAD * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / vExtentSlope;
  },
  getEffectiveFOV: function getEffectiveFOV() {
    return _Math.RAD2DEG * 2 * Math.atan(Math.tan(_Math.DEG2RAD * 0.5 * this.fov) / this.zoom);
  },
  getFilmWidth: function getFilmWidth() {
    // film not completely covered in portrait format (aspect < 1)
    return this.filmGauge * Math.min(this.aspect, 1);
  },
  getFilmHeight: function getFilmHeight() {
    // film not completely covered in landscape format (aspect > 1)
    return this.filmGauge / Math.max(this.aspect, 1);
  },
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   var w = 1920;
   *   var h = 1080;
   *   var fullWidth = w * 3;
   *   var fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset: function setViewOffset(fullWidth, fullHeight, x, y, width, height) {
    this.aspect = fullWidth / fullHeight;
    if (this.view === null) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = fullWidth;
    this.view.fullHeight = fullHeight;
    this.view.offsetX = x;
    this.view.offsetY = y;
    this.view.width = width;
    this.view.height = height;
    this.updateProjectionMatrix();
  },
  clearViewOffset: function clearViewOffset() {
    if (this.view !== null) {
      this.view.enabled = false;
    }
    this.updateProjectionMatrix();
  },
  updateProjectionMatrix: function updateProjectionMatrix() {
    var near = this.near,
      top = near * Math.tan(_Math.DEG2RAD * 0.5 * this.fov) / this.zoom,
      height = 2 * top,
      width = this.aspect * height,
      left = -0.5 * width,
      view = this.view;
    if (this.view !== null && this.view.enabled) {
      var fullWidth = view.fullWidth,
        fullHeight = view.fullHeight;
      left += view.offsetX * width / fullWidth;
      top -= view.offsetY * height / fullHeight;
      width *= view.width / fullWidth;
      height *= view.height / fullHeight;
    }
    var skew = this.filmOffset;
    if (skew !== 0) left += near * skew / this.getFilmWidth();
    this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
    this.projectionMatrixInverse.getInverse(this.projectionMatrix);
  }

  // toJSON: function ( meta ) {

  // 	var data = Object3D.prototype.toJSON.call( this, meta );

  // 	data.object.fov = this.fov;
  // 	data.object.zoom = this.zoom;

  // 	data.object.near = this.near;
  // 	data.object.far = this.far;
  // 	data.object.focus = this.focus;

  // 	data.object.aspect = this.aspect;

  // 	if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

  // 	data.object.filmGauge = this.filmGauge;
  // 	data.object.filmOffset = this.filmOffset;

  // 	return data;

  // }
});

;// ./src/geometries/BoxGeometry.js



function BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
  Geometry.call(this);
  width = width || 1;
  height = height || 1;
  depth = depth || 1;
  widthSegments = widthSegments | 0 || 1;
  heightSegments = heightSegments | 0 || 1;
  depthSegments = depthSegments | 0 || 1;
  this.type = 'BoxGeometry';

  // this.parameters = {
  // 	width: width,
  // 	height: height,
  // 	depth: depth,
  // 	widthSegments: widthSegments,
  // 	heightSegments: heightSegments,
  // 	depthSegments: depthSegments
  // };

  var scope = this;

  // segments

  // widthSegments = Math.floor( widthSegments );
  // heightSegments = Math.floor( heightSegments );
  // depthSegments = Math.floor( depthSegments );

  // buffers

  var indices = [];
  var vertices = [];
  var normals = [];
  var uvs = [];

  // helper variables

  var numberOfVertices = 0;
  var groupStart = 0;

  // build each side of the box geometry

  buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px
  buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx
  buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
  buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny
  buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz
  buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz

  // build geometry

  this.setIndex(indices);
  this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
  this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
    var segmentWidth = width / gridX;
    var segmentHeight = height / gridY;
    var widthHalf = width / 2;
    var heightHalf = height / 2;
    var depthHalf = depth / 2;
    var gridX1 = gridX + 1;
    var gridY1 = gridY + 1;
    var vertexCounter = 0;
    var groupCount = 0;
    var vector = new Vec3();

    // generate vertices, normals and uvs

    for (var iy = 0; iy < gridY1; iy++) {
      var y = iy * segmentHeight - heightHalf;
      for (var ix = 0; ix < gridX1; ix++) {
        var x = ix * segmentWidth - widthHalf;

        // set values to correct vector component

        vector[u] = x * udir;
        vector[v] = y * vdir;
        vector[w] = depthHalf;

        // now apply vector to vertex buffer

        vertices.push(vector.x, vector.y, vector.z);

        // set values to correct vector component

        vector[u] = 0;
        vector[v] = 0;
        vector[w] = depth > 0 ? 1 : -1;

        // now apply vector to normal buffer

        normals.push(vector.x, vector.y, vector.z);

        // uvs

        uvs.push(ix / gridX);
        uvs.push(1 - iy / gridY);

        // counters

        vertexCounter += 1;
      }
    }

    // indices

    // 1. you need three indices to draw a single face
    // 2. a single segment consists of two faces
    // 3. so we need to generate six (2*3) indices per segment

    for (var _iy = 0; _iy < gridY; _iy++) {
      for (var _ix = 0; _ix < gridX; _ix++) {
        var a = numberOfVertices + _ix + gridX1 * _iy;
        var b = numberOfVertices + _ix + gridX1 * (_iy + 1);
        var c = numberOfVertices + (_ix + 1) + gridX1 * (_iy + 1);
        var d = numberOfVertices + (_ix + 1) + gridX1 * _iy;

        // faces

        indices.push(a, b, d);
        indices.push(b, c, d);

        // increase counter

        groupCount += 6;
      }
    }

    // add a group to the geometry. this will ensure multi material support

    scope.addGroup(groupStart, groupCount, materialIndex);

    // calculate new start value for groups

    groupStart += groupCount;

    // update total number of vertices

    numberOfVertices += vertexCounter;
  }
}
BoxGeometry.prototype = Object.create(Geometry.prototype);
BoxGeometry.prototype.constructor = BoxGeometry;

;// ./src/materials/MeshLambertMaterial.js




/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */

function MeshLambertMaterial(parameters) {
  Material.call(this);
  this.type = 'MeshLambertMaterial';
  this.color = new Color(0xffffff); // diffuse

  this.map = null;
  this.lightMap = null;
  this.lightMapIntensity = 1.0;
  this.aoMap = null;
  this.aoMapIntensity = 1.0;
  this.emissive = new Color(0x000000);
  this.emissiveIntensity = 1.0;
  this.emissiveMap = null;
  this.specularMap = null;
  this.alphaMap = null;
  this.envMap = null;
  this.combine = MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.wireframeLinecap = 'round';
  this.wireframeLinejoin = 'round';
  this.skinning = false;
  this.morphTargets = false;
  this.morphNormals = false;
  this.setValues(parameters);
}
MeshLambertMaterial.prototype = Object.create(Material.prototype);
MeshLambertMaterial.prototype.constructor = MeshLambertMaterial;
MeshLambertMaterial.prototype.isMeshLambertMaterial = true;
MeshLambertMaterial.prototype.copy = function (source) {
  Material.prototype.copy.call(this, source);
  this.color.copy(source.color);
  this.map = source.map;
  this.lightMap = source.lightMap;
  this.lightMapIntensity = source.lightMapIntensity;
  this.aoMap = source.aoMap;
  this.aoMapIntensity = source.aoMapIntensity;
  this.emissive.copy(source.emissive);
  this.emissiveMap = source.emissiveMap;
  this.emissiveIntensity = source.emissiveIntensity;
  this.specularMap = source.specularMap;
  this.alphaMap = source.alphaMap;
  this.envMap = source.envMap;
  this.combine = source.combine;
  this.reflectivity = source.reflectivity;
  this.refractionRatio = source.refractionRatio;
  this.wireframe = source.wireframe;
  this.wireframeLinewidth = source.wireframeLinewidth;
  this.wireframeLinecap = source.wireframeLinecap;
  this.wireframeLinejoin = source.wireframeLinejoin;
  this.skinning = source.skinning;
  this.morphTargets = source.morphTargets;
  this.morphNormals = source.morphNormals;
  return this;
};

;// ./src/objects/Light.js



/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

function Light(color, intensity) {
  Object3D.call(this);

  // this.type = 'Light';

  this.color = new Color(color);
  this.intensity = intensity !== undefined ? intensity : 1;
  this.receiveShadow = undefined;
}
Light.prototype = Object.assign(Object.create(Object3D.prototype), {
  constructor: Light,
  isLight: true

  // copy: function ( source ) {

  //     Object3D.prototype.copy.call( this, source );

  //     this.color.copy( source.color );
  //     this.intensity = source.intensity;

  //     return this;

  // },

  // toJSON: function ( meta ) {

  //     var data = Object3D.prototype.toJSON.call( this, meta );

  //     data.object.color = this.color.getHex();
  //     data.object.intensity = this.intensity;

  //     if ( this.groundColor !== undefined ) data.object.groundColor = this.groundColor.getHex();

  //     if ( this.distance !== undefined ) data.object.distance = this.distance;
  //     if ( this.angle !== undefined ) data.object.angle = this.angle;
  //     if ( this.decay !== undefined ) data.object.decay = this.decay;
  //     if ( this.penumbra !== undefined ) data.object.penumbra = this.penumbra;

  //     if ( this.shadow !== undefined ) data.object.shadow = this.shadow.toJSON();

  //     return data;

  // }
});

;// ./src/objects/AmbientLight.js


/**
 * @author mrdoob / http://mrdoob.com/
 */

function AmbientLight(color, intensity) {
  Light.call(this, color, intensity);

  // this.type = 'AmbientLight';

  this.castShadow = undefined;
}
AmbientLight.prototype = Object.assign(Object.create(Light.prototype), {
  constructor: AmbientLight,
  isAmbientLight: true
});

;// ./src/objects/DirectionalLight.js

// import { DirectionalLightShadow } from './DirectionalLightShadow.js';


/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

function DirectionalLight(color, intensity) {
  Light.call(this, color, intensity);
  this.type = 'DirectionalLight';
  this.position.copy(Object3D.DefaultUp);
  this.updateMatrix();
  this.target = new Object3D();

  // this.shadow = new DirectionalLightShadow();
}
DirectionalLight.prototype = Object.assign(Object.create(Light.prototype), {
  constructor: DirectionalLight,
  isDirectionalLight: true

  // copy: function ( source ) {

  //     Light.prototype.copy.call( this, source );

  //     this.target = source.target.clone();

  //     this.shadow = source.shadow.clone();

  //     return this;

  // }
});

;// ./src/3d.js










// import { Light } from './objects/lights/Light.js';
// import { AmbientLight } from './objects/lights/AmbientLight.js';
// import { DirectionalLight } from './objects/lights/DirectionalLight.js';
// import { Camera } from './objects/Camera.js';


// import {
//     Attribute,
//     Float16Attribute,
//     Float32Attribute,
//     Float64Attribute, Int16Attribute,
//     Int32Attribute, Int8Attribute, Uint16Attribute,
//     Uint32Attribute, Uint8Attribute, Uint8ClampedAttribute
// } from "./renderers/Attribute";
// import {Material} from "./renderers/Material";
// import {InstancedMeshBasicMaterial, PointsMaterial} from "./renderers/materials";
// import {
//     ColorUniform,
//     FloatUniform, Matrix3Uniform, Matrix4Uniform,
//     TextureUniform,
//     Uniform,
//     Vector2Uniform,
//     Vector3Uniform,
//     Vector4Uniform
// } from "./renderers/Uniform";

// import { WebGLRenderer } from './renderers/WebGLRenderer.js';

// import { PlaneGeometry } from './renderers/geometries/PlaneGeometry.js';

// import { MeshLambertMaterial } from './renderers/materials/MeshLambertMaterial.js';


// import { InstancedMeshLambertMaterial } from './renderers/materials/InstancedMeshLambertMaterial.js';


Tiny.Vec3 = Vec3;
Tiny.Mat4 = Mat4;
Tiny.Quat = Quat;
Tiny.Geometry = Geometry;
Tiny.MeshBasicMaterial = MeshBasicMaterial;
Tiny.MeshLambertMaterial = MeshLambertMaterial;
Tiny.Object3D = Object3D;
Tiny.Mesh = Mesh;
Tiny.Sprite3D = Sprite3D;
Tiny.AmbientLight = AmbientLight;
Tiny.DirectionalLight = DirectionalLight;
Tiny.InstancedMesh = InstancedMesh;
Tiny.Canvas = Canvas;
Tiny.Screen = Screen;

// Tiny.Light = Light;
// Tiny.AmbientLight = AmbientLight;

// Tiny.Camera = Camera;
Tiny.OrthographicCamera = OrthographicCamera;
Tiny.PerspectiveCamera = PerspectiveCamera;

// Tiny.WebGLRenderer = WebGLRenderer;
// Tiny.WebGlTexture = Texture;

// Tiny.PlaneGeometry = PlaneGeometry;
Tiny.BoxGeometry = BoxGeometry;

// Tiny.Material = Material;
// Tiny.MeshBasicMaterial = MeshBasicMaterial;
// Tiny.MeshLambertMaterial = MeshLambertMaterial;
// Tiny.PointsMaterial = PointsMaterial;

// Tiny.InstancedMeshBasicMaterial = InstancedMeshBasicMaterial;
// Tiny.InstancedMeshLambertMaterial = InstancedMeshLambertMaterial;

// Tiny.Uniform = Uniform;
// Tiny.FloatUniform = FloatUniform;
// Tiny.TextureUniform = TextureUniform;
// Tiny.Vector2Uniform = Vector2Uniform;
// Tiny.Vector3Uniform = Vector3Uniform;
// Tiny.Vector4Uniform = Vector4Uniform;
// Tiny.ColorUniform = ColorUniform;
// Tiny.Matrix3Uniform = Matrix3Uniform;
// Tiny.Matrix4Uniform = Matrix4Uniform;

// Tiny.Attribute = Attribute;

// Tiny.Float64Attribute = Float64Attribute;
// Tiny.Float32Attribute = Float32Attribute;
// Tiny.Float16Attribute = Float16Attribute;
// Tiny.Uint32Attribute = Uint32Attribute;
// Tiny.Int32Attribute = Int32Attribute;
// Tiny.Uint16Attribute = Uint16Attribute;
// Tiny.Int16Attribute = Int16Attribute;
// Tiny.Uint8ClampedAttribute = Uint8ClampedAttribute;
// Tiny.Uint8Attribute = Uint8Attribute;
// Tiny.Int8Attribute = Int8Attribute;
;// ./packages/3d/index.js



}();
/******/ })()
;