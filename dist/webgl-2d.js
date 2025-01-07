/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./src/webgl-renderer/2d/ObjectRenderer.js
/**
 * Base for a common object renderer that can be used as a system renderer plugin.
 *
 * @class
 * @extends PIXI.WebGLManager
 * @memberof PIXI
 */

/**
 * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
 */
function ObjectRenderer(renderer) {
  /**
   * The renderer this manager works for.
   *
   * @member {PIXI.WebGLRenderer}
   */
  this.renderer = renderer;
  this.renderer.on('context', this.onContextChange, this);
}
Object.assign(ObjectRenderer.prototype, {
  constructor: ObjectRenderer,
  onContextChange: function onContextChange() {
    // do some codes init!
  },
  /**
   * Starts the renderer and sets the shader
   *
   */
  start: function start() {
    // set the shader..
  },
  /**
   * Stops the renderer
   *
   */
  stop: function stop() {
    this.flush();
  },
  /**
   * Stub method for rendering content and emptying the current batch.
   *
   */
  flush: function flush() {
    // flush!
  },
  /**
   * Renders an object
   *
   * @param {PIXI.DisplayObject} object - The object to render.
   */
  render: function render(object // eslint-disable-line no-unused-vars
  ) {
    // render the object
  },
  /**
   * Generic destroy methods to be overridden by the subclass
   *
   */
  dispose: function dispose() {
    this.renderer.off('context', this.onContextChange, this);
    this.renderer = null;
  }
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

;// ./src/loaders/Cache.js
var Cache = {
  image: {},
  texture: {}
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


;// ./src/textures/DataTexture.js
/**
 * @author alteredq / http://alteredqualia.com/
 */



function DataTexture(data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding) {
  _Texture.call(this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
  this.image = {
    data: data || null,
    width: width || 1,
    height: height || 1
  };
  this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
  this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
  this.generateMipmaps = false;
  this.flipY = false;
  this.unpackAlignment = 1;
  this.needsUpdate = true;
}
DataTexture.prototype = Object.create(_Texture.prototype);
DataTexture.prototype.constructor = DataTexture;
DataTexture.prototype.isDataTexture = true;

;// ./src/math/Box3.js

var _points = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
var Box3_vector = new Vec3();
var _box = new Box3();

// triangle centered vertices

var _v0 = new Vec3();
var _v1 = new Vec3();
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
    _v1.sub2(triangle.b, _center);
    _v2.sub2(triangle.c, _center);

    // compute edge vectors for triangle
    _f0.sub2(_v1, _v0);
    _f1.sub2(_v2, _v1);
    _f2.sub2(_v0, _v2);

    // test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
    // make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
    // axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
    var axes = [0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y, _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x, -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0];
    if (!satForAxes(axes, _v0, _v1, _v2, _extents)) {
      return false;
    }

    // test 3 face normals from the aabb
    axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (!satForAxes(axes, _v0, _v1, _v2, _extents)) {
      return false;
    }

    // finally testing the face normal of the triangle
    // use already existing triangle edge vectors here
    _triangleNormal.crossVectors(_f0, _f1);
    axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
    return satForAxes(axes, _v0, _v1, _v2, _extents);
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

;// ./src/math/Plane.js



/**
 * @author bhouston / http://clara.io
 */

var _vector1 = new Vec3();
var _vector2 = new Vec3();
var _normalMatrix = new Mat3();
function Plane(normal, constant) {
  // normal is assumed to be normalized

  this.normal = normal !== undefined ? normal : new Vec3(1, 0, 0);
  this.constant = constant !== undefined ? constant : 0;
}
Object.assign(Plane.prototype, {
  isPlane: true,
  set: function set(normal, constant) {
    this.normal.copy(normal);
    this.constant = constant;
    return this;
  },
  setComponents: function setComponents(x, y, z, w) {
    this.normal.set(x, y, z);
    this.constant = w;
    return this;
  },
  setFromNormalAndCoplanarPoint: function setFromNormalAndCoplanarPoint(normal, point) {
    this.normal.copy(normal);
    this.constant = -point.dot(this.normal);
    return this;
  },
  setFromCoplanarPoints: function setFromCoplanarPoints(a, b, c) {
    var normal = _vector1.sub2(c, b).cross(_vector2.sub2(a, b)).normalize();

    // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

    this.setFromNormalAndCoplanarPoint(normal, a);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(plane) {
    this.normal.copy(plane.normal);
    this.constant = plane.constant;
    return this;
  },
  normalize: function normalize() {
    // Note: will lead to a divide by zero if the plane is invalid.

    var inverseNormalLength = 1.0 / this.normal.length();
    this.normal.mulScalar(inverseNormalLength);
    this.constant *= inverseNormalLength;
    return this;
  },
  negate: function negate() {
    this.constant *= -1;
    this.normal.negate();
    return this;
  },
  distanceToPoint: function distanceToPoint(point) {
    return this.normal.dot(point) + this.constant;
  },
  distanceToSphere: function distanceToSphere(sphere) {
    return this.distanceToPoint(sphere.center) - sphere.radius;
  },
  projectPoint: function projectPoint(point, target) {
    if (target === undefined) {
      console.warn('THREE.Plane: .projectPoint() target is now required');
      target = new Vec3();
    }
    return target.copy(this.normal).mulScalar(-this.distanceToPoint(point)).add(point);
  },
  intersectLine: function intersectLine(line, target) {
    if (target === undefined) {
      console.warn('THREE.Plane: .intersectLine() target is now required');
      target = new Vec3();
    }
    var direction = line.delta(_vector1);
    var denominator = this.normal.dot(direction);
    if (denominator === 0) {
      // line is coplanar, return origin
      if (this.distanceToPoint(line.start) === 0) {
        return target.copy(line.start);
      }

      // Unsure if this is the correct method to handle this case.
      return undefined;
    }
    var t = -(line.start.dot(this.normal) + this.constant) / denominator;
    if (t < 0 || t > 1) {
      return undefined;
    }
    return target.copy(direction).mulScalar(t).add(line.start);
  },
  intersectsLine: function intersectsLine(line) {
    // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

    var startSign = this.distanceToPoint(line.start);
    var endSign = this.distanceToPoint(line.end);
    return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
  },
  intersectsBox: function intersectsBox(box) {
    return box.intersectsPlane(this);
  },
  intersectsSphere: function intersectsSphere(sphere) {
    return sphere.intersectsPlane(this);
  },
  coplanarPoint: function coplanarPoint(target) {
    if (target === undefined) {
      console.warn('THREE.Plane: .coplanarPoint() target is now required');
      target = new Vec3();
    }
    return target.copy(this.normal).mulScalar(-this.constant);
  },
  applyMat4: function applyMat4(matrix, optionalNormalMatrix) {
    var normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
    var referencePoint = this.coplanarPoint(_vector1).applyMat4(matrix);
    var normal = this.normal.applyMat3(normalMatrix).normalize();
    this.constant = -referencePoint.dot(normal);
    return this;
  },
  translate: function translate(offset) {
    this.constant -= offset.dot(this.normal);
    return this;
  },
  equals: function equals(plane) {
    return plane.normal.equals(this.normal) && plane.constant === this.constant;
  }
});

;// ./src/math/Frustum.js




/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author bhouston / http://clara.io
 */

var _sphere = new Sphere();
var Frustum_vector = new Vec3();
function Frustum(p0, p1, p2, p3, p4, p5) {
  this.planes = [p0 !== undefined ? p0 : new Plane(), p1 !== undefined ? p1 : new Plane(), p2 !== undefined ? p2 : new Plane(), p3 !== undefined ? p3 : new Plane(), p4 !== undefined ? p4 : new Plane(), p5 !== undefined ? p5 : new Plane()];
}
Object.assign(Frustum.prototype, {
  set: function set(p0, p1, p2, p3, p4, p5) {
    var planes = this.planes;
    planes[0].copy(p0);
    planes[1].copy(p1);
    planes[2].copy(p2);
    planes[3].copy(p3);
    planes[4].copy(p4);
    planes[5].copy(p5);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(frustum) {
    var planes = this.planes;
    for (var i = 0; i < 6; i++) {
      planes[i].copy(frustum.planes[i]);
    }
    return this;
  },
  setFromMatrix: function setFromMatrix(m) {
    var planes = this.planes;
    var me = m.elements;
    var me0 = me[0],
      me1 = me[1],
      me2 = me[2],
      me3 = me[3];
    var me4 = me[4],
      me5 = me[5],
      me6 = me[6],
      me7 = me[7];
    var me8 = me[8],
      me9 = me[9],
      me10 = me[10],
      me11 = me[11];
    var me12 = me[12],
      me13 = me[13],
      me14 = me[14],
      me15 = me[15];
    planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
    planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
    planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
    planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
    planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
    planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
    return this;
  },
  intersectsObject: function intersectsObject(object) {
    var geometry = object.geometry;
    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    _sphere.copy(geometry.boundingSphere).applyMat4(object.matrixWorld);
    return this.intersectsSphere(_sphere);
  },
  intersectsSprite: function intersectsSprite(sprite) {
    _sphere.center.set(0, 0, 0);
    _sphere.radius = 0.7071067811865476;
    _sphere.applyMat4(sprite.matrixWorld);
    return this.intersectsSphere(_sphere);
  },
  intersectsSphere: function intersectsSphere(sphere) {
    var planes = this.planes;
    var center = sphere.center;
    var negRadius = -sphere.radius;
    for (var i = 0; i < 6; i++) {
      var distance = planes[i].distanceToPoint(center);
      if (distance < negRadius) {
        return false;
      }
    }
    return true;
  },
  intersectsBox: function intersectsBox(box) {
    var planes = this.planes;
    for (var i = 0; i < 6; i++) {
      var plane = planes[i];

      // corner at max distance

      Frustum_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
      Frustum_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
      Frustum_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;
      if (plane.distanceToPoint(Frustum_vector) < 0) {
        return false;
      }
    }
    return true;
  },
  containsPoint: function containsPoint(point) {
    var planes = this.planes;
    for (var i = 0; i < 6; i++) {
      if (planes[i].distanceToPoint(point) < 0) {
        return false;
      }
    }
    return true;
  }
});

;// ./src/math/Mat4.js

var Mat4_v1 = new Vec3();
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
    var scaleX = 1 / Mat4_v1.setFromMatrixColumn(m, 0).length();
    var scaleY = 1 / Mat4_v1.setFromMatrixColumn(m, 1).length();
    var scaleZ = 1 / Mat4_v1.setFromMatrixColumn(m, 2).length();
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
      Mat4_v1.x = attribute.getX(i);
      Mat4_v1.y = attribute.getY(i);
      Mat4_v1.z = attribute.getZ(i);
      Mat4_v1.applyMat4(this);
      attribute.setXYZ(i, Mat4_v1.x, Mat4_v1.y, Mat4_v1.z);
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
    var sx = Mat4_v1.set(te[0], te[1], te[2]).length();
    var sy = Mat4_v1.set(te[4], te[5], te[6]).length();
    var sz = Mat4_v1.set(te[8], te[9], te[10]).length();

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

;// ./src/webgl-renderer/Animation.js
function WebGLAnimation() {
  var context = null;
  var isAnimating = false;
  var animationLoop = null;
  var requestId = null;
  function onAnimationFrame(time, frame) {
    animationLoop(time, frame);
    requestId = context.requestAnimationFrame(onAnimationFrame);
  }
  return {
    start: function start() {
      if (isAnimating === true) return;
      if (animationLoop === null) return;
      requestId = context.requestAnimationFrame(onAnimationFrame);
      isAnimating = true;
    },
    stop: function stop() {
      context.cancelAnimationFrame(requestId);
      isAnimating = false;
    },
    setAnimationLoop: function setAnimationLoop(callback) {
      animationLoop = callback;
    },
    setContext: function setContext(value) {
      context = value;
    }
  };
}

;// ./src/webgl-renderer/Attributes.js
function WebGLAttributes(gl, capabilities) {
  var isWebGL2 = capabilities.isWebGL2;
  var buffers = new WeakMap();
  function createBuffer(attribute, bufferType) {
    var array = attribute.array;
    var usage = attribute.usage;
    var buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, array, usage);
    attribute.onUploadCallback();
    var type = gl.FLOAT;
    if (array instanceof Float32Array) {
      type = gl.FLOAT;
    } else if (array instanceof Float64Array) {
      console.warn('THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.');
    } else if (array instanceof Uint16Array) {
      if (attribute.isFloat16BufferAttribute) {
        if (isWebGL2) {
          type = gl.HALF_FLOAT;
        } else {
          console.warn('THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.');
        }
      } else {
        type = gl.UNSIGNED_SHORT;
      }
    } else if (array instanceof Int16Array) {
      type = gl.SHORT;
    } else if (array instanceof Uint32Array) {
      type = gl.UNSIGNED_INT;
    } else if (array instanceof Int32Array) {
      type = gl.INT;
    } else if (array instanceof Int8Array) {
      type = gl.BYTE;
    } else if (array instanceof Uint8Array) {
      type = gl.UNSIGNED_BYTE;
    }
    return {
      buffer: buffer,
      type: type,
      bytesPerElement: array.BYTES_PER_ELEMENT,
      version: attribute.version
    };
  }
  function updateBuffer(buffer, attribute, bufferType) {
    var array = attribute.array;
    var updateRange = attribute.updateRange;
    gl.bindBuffer(bufferType, buffer);
    if (updateRange.count === -1) {
      // Not using update ranges

      gl.bufferSubData(bufferType, 0, array);
    } else {
      if (isWebGL2) {
        gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array, updateRange.offset, updateRange.count);
      } else {
        gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));
      }
      updateRange.count = -1; // reset range
    }
  }

  //

  function get(attribute) {
    if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
    return buffers.get(attribute);
  }
  function remove(attribute) {
    if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
    var data = buffers.get(attribute);
    if (data) {
      gl.deleteBuffer(data.buffer);
      buffers["delete"](attribute);
    }
  }
  function update(attribute, bufferType) {
    if (attribute.isGLBufferAttribute) {
      var cached = buffers.get(attribute);
      if (!cached || cached.version < attribute.version) {
        buffers.set(attribute, {
          buffer: attribute.buffer,
          type: attribute.type,
          bytesPerElement: attribute.elementSize,
          version: attribute.version
        });
      }
      return;
    }
    if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
    var data = buffers.get(attribute);
    if (data === undefined) {
      buffers.set(attribute, createBuffer(attribute, bufferType));
    } else if (data.version < attribute.version) {
      updateBuffer(data.buffer, attribute, bufferType);
      data.version = attribute.version;
    }
  }
  return {
    get: get,
    remove: remove,
    update: update
  };
}

;// ./src/webgl-renderer/Background.js
// import { BackSide, FrontSide, CubeUVReflectionMapping } from '../constants.js';
// import { BoxGeometry } from '../geometries/BoxGeometry.js';
// import { PlaneGeometry } from '../geometries/PlaneGeometry.js';
// import { ShaderMaterial } from '../materials/ShaderMaterial.js';

// import { Mesh } from '../objects/Mesh.js';
// import { ShaderLib } from './shaders/ShaderLib.js';
// import { cloneUniforms } from './shaders/UniformsUtils.js';

function WebGLBackground(renderer, cubemaps, state, objects, premultipliedAlpha) {
  var clearColor = new Color(0x000000);
  var clearAlpha = 0;
  var planeMesh;
  var boxMesh;
  var currentBackground = null;
  var currentBackgroundVersion = 0;
  var currentTonemapping = null;
  function render(renderList, scene, camera, forceClear) {
    var background = scene.isScene === true ? scene.background : null;

    // if ( background && background.isTexture ) {

    // 	background = cubemaps.get( background );

    // }

    // Ignore background in AR
    // TODO: Reconsider this.

    // const xr = renderer.xr;
    // const session = xr.getSession && xr.getSession();

    // if ( session && session.environmentBlendMode === 'additive' ) {

    // 	background = null;

    // }

    // if ( background === null ) {

    setClear(clearColor, clearAlpha);

    // } else if ( background && background.isColor ) {

    // 	setClear( background, 1 );
    // 	forceClear = true;

    // }

    if (renderer.autoClear || forceClear) {
      renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
    }

    // if ( background && ( background.isCubeTexture || background.mapping === CubeUVReflectionMapping ) ) {

    // 	if ( boxMesh === undefined ) {

    // 		boxMesh = new Mesh(
    // 			new BoxGeometry( 1, 1, 1 ),
    // 			new ShaderMaterial( {
    // 				name: 'BackgroundCubeMaterial',
    // 				uniforms: cloneUniforms( ShaderLib.cube.uniforms ),
    // 				vertexShader: ShaderLib.cube.vertexShader,
    // 				fragmentShader: ShaderLib.cube.fragmentShader,
    // 				side: BackSide,
    // 				depthTest: false,
    // 				depthWrite: false,
    // 				fog: false
    // 			} )
    // 		);

    // 		boxMesh.geometry.deleteAttribute( 'normal' );
    // 		boxMesh.geometry.deleteAttribute( 'uv' );

    // 		boxMesh.onBeforeRender = function ( renderer, scene, camera ) {

    // 			this.matrixWorld.copyPosition( camera.matrixWorld );

    // 		};

    // 		// enable code injection for non-built-in material
    // 		Object.defineProperty( boxMesh.material, 'envMap', {

    // 			get: function () {

    // 				return this.uniforms.envMap.value;

    // 			}

    // 		} );

    // 		objects.update( boxMesh );

    // 	}

    // 	boxMesh.material.uniforms.envMap.value = background;
    // 	boxMesh.material.uniforms.flipEnvMap.value = ( background.isCubeTexture && background._needsFlipEnvMap ) ? - 1 : 1;

    // 	if ( currentBackground !== background ||
    // 		currentBackgroundVersion !== background.version ||
    // 		currentTonemapping !== renderer.toneMapping ) {

    // 		boxMesh.material.needsUpdate = true;

    // 		currentBackground = background;
    // 		currentBackgroundVersion = background.version;
    // 		currentTonemapping = renderer.toneMapping;

    // 	}

    // 	// push to the pre-sorted opaque render list
    // 	renderList.unshift( boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null );

    // } else if ( background && background.isTexture ) {

    // 	if ( planeMesh === undefined ) {

    // 		planeMesh = new Mesh(
    // 			new PlaneGeometry( 2, 2 ),
    // 			new ShaderMaterial( {
    // 				name: 'BackgroundMaterial',
    // 				uniforms: cloneUniforms( ShaderLib.background.uniforms ),
    // 				vertexShader: ShaderLib.background.vertexShader,
    // 				fragmentShader: ShaderLib.background.fragmentShader,
    // 				side: FrontSide,
    // 				depthTest: false,
    // 				depthWrite: false,
    // 				fog: false
    // 			} )
    // 		);

    // 		planeMesh.geometry.deleteAttribute( 'normal' );

    // 		// enable code injection for non-built-in material
    // 		Object.defineProperty( planeMesh.material, 'map', {

    // 			get: function () {

    // 				return this.uniforms.t2D.value;

    // 			}

    // 		} );

    // 		objects.update( planeMesh );

    // 	}

    // 	planeMesh.material.uniforms.t2D.value = background;

    // 	if ( background.matrixAutoUpdate === true ) {

    // 		background.updateMatrix();

    // 	}

    // 	planeMesh.material.uniforms.uvTransform.value.copy( background.matrix );

    // 	if ( currentBackground !== background ||
    // 		currentBackgroundVersion !== background.version ||
    // 		currentTonemapping !== renderer.toneMapping ) {

    // 		planeMesh.material.needsUpdate = true;

    // 		currentBackground = background;
    // 		currentBackgroundVersion = background.version;
    // 		currentTonemapping = renderer.toneMapping;

    // 	}

    // 	// push to the pre-sorted opaque render list
    // 	renderList.unshift( planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null );

    // }
  }
  function setClear(color, alpha) {
    state.buffers.color.setClear(color.r, color.g, color.b, alpha, premultipliedAlpha);
  }
  return {
    getClearColor: function getClearColor() {
      return clearColor;
    },
    setClearColor: function setClearColor(color) {
      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      clearColor.set(color);
      clearAlpha = alpha;
      setClear(clearColor, clearAlpha);
    },
    getClearAlpha: function getClearAlpha() {
      return clearAlpha;
    },
    setClearAlpha: function setClearAlpha(alpha) {
      clearAlpha = alpha;
      setClear(clearColor, clearAlpha);
    },
    render: render
  };
}

;// ./src/webgl-renderer/BindingStates.js
function WebGLBindingStates(gl, extensions, attributes, capabilities) {
  var maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
  var extension = capabilities.isWebGL2 ? null : extensions.get('OES_vertex_array_object');
  var vaoAvailable = capabilities.isWebGL2 || extension !== null;
  var bindingStates = {};
  var defaultState = createBindingState(null);
  var currentState = defaultState;
  function setup(object, material, program, geometry, index) {
    var updateBuffers = false;
    if (vaoAvailable) {
      var state = getBindingState(geometry, program, material);
      if (currentState !== state) {
        currentState = state;
        bindVertexArrayObject(currentState.object);
      }
      updateBuffers = needsUpdate(geometry, index);
      if (updateBuffers) saveCache(geometry, index);
    } else {
      var wireframe = material.wireframe === true;
      if (currentState.geometry !== geometry.id || currentState.program !== program.id || currentState.wireframe !== wireframe) {
        currentState.geometry = geometry.id;
        currentState.program = program.id;
        currentState.wireframe = wireframe;
        updateBuffers = true;
      }
    }
    if (object.isInstancedMesh === true) {
      updateBuffers = true;
    }
    if (index !== null) {
      attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);
    }
    if (updateBuffers) {
      setupVertexAttributes(object, material, program, geometry);
      if (index !== null) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attributes.get(index).buffer);
      }
    }
  }
  function createVertexArrayObject() {
    if (capabilities.isWebGL2) return gl.createVertexArray();
    return extension.createVertexArrayOES();
  }
  function bindVertexArrayObject(vao) {
    if (capabilities.isWebGL2) return gl.bindVertexArray(vao);
    return extension.bindVertexArrayOES(vao);
  }
  function deleteVertexArrayObject(vao) {
    if (capabilities.isWebGL2) return gl.deleteVertexArray(vao);
    return extension.deleteVertexArrayOES(vao);
  }
  function getBindingState(geometry, program, material) {
    var wireframe = material.wireframe === true;
    var programMap = bindingStates[geometry.id];
    if (programMap === undefined) {
      programMap = {};
      bindingStates[geometry.id] = programMap;
    }
    var stateMap = programMap[program.id];
    if (stateMap === undefined) {
      stateMap = {};
      programMap[program.id] = stateMap;
    }
    var state = stateMap[wireframe];
    if (state === undefined) {
      state = createBindingState(createVertexArrayObject());
      stateMap[wireframe] = state;
    }
    return state;
  }
  function createBindingState(vao) {
    var newAttributes = [];
    var enabledAttributes = [];
    var attributeDivisors = [];
    for (var i = 0; i < maxVertexAttributes; i++) {
      newAttributes[i] = 0;
      enabledAttributes[i] = 0;
      attributeDivisors[i] = 0;
    }
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: false,
      newAttributes: newAttributes,
      enabledAttributes: enabledAttributes,
      attributeDivisors: attributeDivisors,
      object: vao,
      attributes: {},
      index: null
    };
  }
  function needsUpdate(geometry, index) {
    var cachedAttributes = currentState.attributes;
    var geometryAttributes = geometry.attributes;
    var attributesNum = 0;
    for (var key in geometryAttributes) {
      var cachedAttribute = cachedAttributes[key];
      var geometryAttribute = geometryAttributes[key];
      if (cachedAttribute === undefined) return true;
      if (cachedAttribute.attribute !== geometryAttribute) return true;
      if (cachedAttribute.data !== geometryAttribute.data) return true;
      attributesNum++;
    }
    if (currentState.attributesNum !== attributesNum) return true;
    if (currentState.index !== index) return true;
    return false;
  }
  function saveCache(geometry, index) {
    var cache = {};
    var attributes = geometry.attributes;
    var attributesNum = 0;
    for (var key in attributes) {
      var attribute = attributes[key];
      var data = {};
      data.attribute = attribute;
      if (attribute.data) {
        data.data = attribute.data;
      }
      cache[key] = data;
      attributesNum++;
    }
    currentState.attributes = cache;
    currentState.attributesNum = attributesNum;
    currentState.index = index;
  }
  function initAttributes() {
    var newAttributes = currentState.newAttributes;
    for (var i = 0, il = newAttributes.length; i < il; i++) {
      newAttributes[i] = 0;
    }
  }
  function enableAttribute(attribute) {
    enableAttributeAndDivisor(attribute, 0);
  }
  function enableAttributeAndDivisor(attribute, meshPerAttribute) {
    var newAttributes = currentState.newAttributes;
    var enabledAttributes = currentState.enabledAttributes;
    var attributeDivisors = currentState.attributeDivisors;
    newAttributes[attribute] = 1;
    if (enabledAttributes[attribute] === 0) {
      gl.enableVertexAttribArray(attribute);
      enabledAttributes[attribute] = 1;
    }
    if (attributeDivisors[attribute] !== meshPerAttribute) {
      var _extension = capabilities.isWebGL2 ? gl : extensions.get('ANGLE_instanced_arrays');
      _extension[capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'](attribute, meshPerAttribute);
      attributeDivisors[attribute] = meshPerAttribute;
    }
  }
  function disableUnusedAttributes() {
    var newAttributes = currentState.newAttributes;
    var enabledAttributes = currentState.enabledAttributes;
    for (var i = 0, il = enabledAttributes.length; i < il; i++) {
      if (enabledAttributes[i] !== newAttributes[i]) {
        gl.disableVertexAttribArray(i);
        enabledAttributes[i] = 0;
      }
    }
  }
  function vertexAttribPointer(index, size, type, normalized, stride, offset) {
    if (capabilities.isWebGL2 === true && (type === gl.INT || type === gl.UNSIGNED_INT)) {
      gl.vertexAttribIPointer(index, size, type, stride, offset);
    } else {
      gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }
  }
  function setupVertexAttributes(object, material, program, geometry) {
    if (capabilities.isWebGL2 === false && (object.isInstancedMesh || geometry.isInstancedBufferGeometry)) {
      if (extensions.get('ANGLE_instanced_arrays') === null) return;
    }
    initAttributes();
    var geometryAttributes = geometry.attributes;
    var programAttributes = program.getAttributes();
    var materialDefaultAttributeValues = material.defaultAttributeValues;
    for (var name in programAttributes) {
      var programAttribute = programAttributes[name];
      if (programAttribute >= 0) {
        var geometryAttribute = geometryAttributes[name];
        if (geometryAttribute !== undefined) {
          var normalized = geometryAttribute.normalized;
          var size = geometryAttribute.itemSize;
          var attribute = attributes.get(geometryAttribute);

          // TODO Attribute may not be available on context restore

          if (attribute === undefined) continue;
          var buffer = attribute.buffer;
          var type = attribute.type;
          var bytesPerElement = attribute.bytesPerElement;
          if (geometryAttribute.isInterleavedBufferAttribute) {
            var data = geometryAttribute.data;
            var stride = data.stride;
            var offset = geometryAttribute.offset;
            if (data && data.isInstancedInterleavedBuffer) {
              enableAttributeAndDivisor(programAttribute, data.meshPerAttribute);
              if (geometry._maxInstanceCount === undefined) {
                geometry._maxInstanceCount = data.meshPerAttribute * data.count;
              }
            } else {
              enableAttribute(programAttribute);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            vertexAttribPointer(programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement);
          } else {
            if (geometryAttribute.isInstancedBufferAttribute) {
              enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);
              if (geometry._maxInstanceCount === undefined) {
                geometry._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
              }
            } else {
              enableAttribute(programAttribute);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            vertexAttribPointer(programAttribute, size, type, normalized, 0, 0);
          }
        } else if (name === 'instanceMatrix') {
          var _attribute = attributes.get(object.instanceMatrix);

          // TODO Attribute may not be available on context restore

          if (_attribute === undefined) continue;
          var _buffer = _attribute.buffer;
          var _type = _attribute.type;
          enableAttributeAndDivisor(programAttribute + 0, 1);
          enableAttributeAndDivisor(programAttribute + 1, 1);
          enableAttributeAndDivisor(programAttribute + 2, 1);
          enableAttributeAndDivisor(programAttribute + 3, 1);
          gl.bindBuffer(gl.ARRAY_BUFFER, _buffer);
          gl.vertexAttribPointer(programAttribute + 0, 4, _type, false, 64, 0);
          gl.vertexAttribPointer(programAttribute + 1, 4, _type, false, 64, 16);
          gl.vertexAttribPointer(programAttribute + 2, 4, _type, false, 64, 32);
          gl.vertexAttribPointer(programAttribute + 3, 4, _type, false, 64, 48);
        } else if (name === 'instanceColor') {
          var _attribute2 = attributes.get(object.instanceColor);

          // TODO Attribute may not be available on context restore

          if (_attribute2 === undefined) continue;
          var _buffer2 = _attribute2.buffer;
          var _type2 = _attribute2.type;
          enableAttributeAndDivisor(programAttribute, 1);
          gl.bindBuffer(gl.ARRAY_BUFFER, _buffer2);
          gl.vertexAttribPointer(programAttribute, 3, _type2, false, 12, 0);
        } else if (materialDefaultAttributeValues !== undefined) {
          var value = materialDefaultAttributeValues[name];
          if (value !== undefined) {
            switch (value.length) {
              case 2:
                gl.vertexAttrib2fv(programAttribute, value);
                break;
              case 3:
                gl.vertexAttrib3fv(programAttribute, value);
                break;
              case 4:
                gl.vertexAttrib4fv(programAttribute, value);
                break;
              default:
                gl.vertexAttrib1fv(programAttribute, value);
            }
          }
        }
      }
    }
    disableUnusedAttributes();
  }
  function dispose() {
    reset();
    for (var geometryId in bindingStates) {
      var programMap = bindingStates[geometryId];
      for (var programId in programMap) {
        var stateMap = programMap[programId];
        for (var wireframe in stateMap) {
          deleteVertexArrayObject(stateMap[wireframe].object);
          delete stateMap[wireframe];
        }
        delete programMap[programId];
      }
      delete bindingStates[geometryId];
    }
  }
  function releaseStatesOfGeometry(geometry) {
    if (bindingStates[geometry.id] === undefined) return;
    var programMap = bindingStates[geometry.id];
    for (var programId in programMap) {
      var stateMap = programMap[programId];
      for (var wireframe in stateMap) {
        deleteVertexArrayObject(stateMap[wireframe].object);
        delete stateMap[wireframe];
      }
      delete programMap[programId];
    }
    delete bindingStates[geometry.id];
  }
  function releaseStatesOfProgram(program) {
    for (var geometryId in bindingStates) {
      var programMap = bindingStates[geometryId];
      if (programMap[program.id] === undefined) continue;
      var stateMap = programMap[program.id];
      for (var wireframe in stateMap) {
        deleteVertexArrayObject(stateMap[wireframe].object);
        delete stateMap[wireframe];
      }
      delete programMap[program.id];
    }
  }
  function reset() {
    resetDefaultState();
    if (currentState === defaultState) return;
    currentState = defaultState;
    bindVertexArrayObject(currentState.object);
  }

  // for backward-compatilibity

  function resetDefaultState() {
    defaultState.geometry = null;
    defaultState.program = null;
    defaultState.wireframe = false;
  }
  return {
    setup: setup,
    reset: reset,
    resetDefaultState: resetDefaultState,
    dispose: dispose,
    releaseStatesOfGeometry: releaseStatesOfGeometry,
    releaseStatesOfProgram: releaseStatesOfProgram,
    initAttributes: initAttributes,
    enableAttribute: enableAttribute,
    disableUnusedAttributes: disableUnusedAttributes
  };
}

;// ./src/webgl-renderer/BufferRenderer.js
function WebGLBufferRenderer(gl, extensions, info, capabilities) {
  var isWebGL2 = capabilities.isWebGL2;
  var mode;
  function setMode(value) {
    mode = value;
  }
  function render(start, count) {
    gl.drawArrays(mode, start, count);
    info.update(count, mode, 1);
  }
  function renderInstances(start, count, primcount) {
    if (primcount === 0) return;
    var extension, methodName;
    if (isWebGL2) {
      extension = gl;
      methodName = 'drawArraysInstanced';
    } else {
      extension = extensions.get('ANGLE_instanced_arrays');
      methodName = 'drawArraysInstancedANGLE';
      if (extension === null) {
        console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
        return;
      }
    }
    extension[methodName](mode, start, count, primcount);
    info.update(count, mode, primcount);
  }

  //

  this.setMode = setMode;
  this.render = render;
  this.renderInstances = renderInstances;
}

;// ./src/webgl-renderer/Capabilities.js
function WebGLCapabilities(gl, extensions, parameters) {
  var maxAnisotropy;
  function getMaxAnisotropy() {
    if (maxAnisotropy !== undefined) return maxAnisotropy;
    if (extensions.has('EXT_texture_filter_anisotropic') === true) {
      var extension = extensions.get('EXT_texture_filter_anisotropic');
      maxAnisotropy = gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else {
      maxAnisotropy = 0;
    }
    return maxAnisotropy;
  }
  function getMaxPrecision(precision) {
    if (precision === 'highp') {
      if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {
        return 'highp';
      }
      precision = 'mediump';
    }
    if (precision === 'mediump') {
      if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {
        return 'mediump';
      }
    }
    return 'lowp';
  }

  /* eslint-disable no-undef */
  var isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext || typeof WebGL2ComputeRenderingContext !== 'undefined' && gl instanceof WebGL2ComputeRenderingContext;
  /* eslint-enable no-undef */

  var precision = parameters.precision !== undefined ? parameters.precision : 'highp';
  var maxPrecision = getMaxPrecision(precision);
  if (maxPrecision !== precision) {
    console.warn('THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.');
    precision = maxPrecision;
  }
  var logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;
  var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
  var maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  var maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  var maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
  var maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
  var maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
  var maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
  var maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
  var vertexTextures = maxVertexTextures > 0;
  var floatFragmentTextures = isWebGL2 || extensions.has('OES_texture_float');
  var floatVertexTextures = vertexTextures && floatFragmentTextures;
  var maxSamples = isWebGL2 ? gl.getParameter(gl.MAX_SAMPLES) : 0;
  return {
    isWebGL2: isWebGL2,
    getMaxAnisotropy: getMaxAnisotropy,
    getMaxPrecision: getMaxPrecision,
    precision: precision,
    logarithmicDepthBuffer: logarithmicDepthBuffer,
    maxTextures: maxTextures,
    maxVertexTextures: maxVertexTextures,
    maxTextureSize: maxTextureSize,
    maxCubemapSize: maxCubemapSize,
    maxAttributes: maxAttributes,
    maxVertexUniforms: maxVertexUniforms,
    maxVaryings: maxVaryings,
    maxFragmentUniforms: maxFragmentUniforms,
    vertexTextures: vertexTextures,
    floatFragmentTextures: floatFragmentTextures,
    floatVertexTextures: floatVertexTextures,
    maxSamples: maxSamples
  };
}

;// ./src/webgl-renderer/Clipping.js


function WebGLClipping(properties) {
  var scope = this;
  var globalState = null,
    numGlobalPlanes = 0,
    localClippingEnabled = false,
    renderingShadows = false;
  var plane = new Plane(),
    viewNormalMatrix = new Mat3(),
    uniform = {
      value: null,
      needsUpdate: false
    };
  this.uniform = uniform;
  this.numPlanes = 0;
  this.numIntersection = 0;
  this.init = function (planes, enableLocalClipping, camera) {
    var enabled = planes.length !== 0 || enableLocalClipping ||
    // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    numGlobalPlanes !== 0 || localClippingEnabled;
    localClippingEnabled = enableLocalClipping;
    globalState = projectPlanes(planes, camera, 0);
    numGlobalPlanes = planes.length;
    return enabled;
  };
  this.beginShadows = function () {
    renderingShadows = true;
    projectPlanes(null);
  };
  this.endShadows = function () {
    renderingShadows = false;
    resetGlobalState();
  };
  this.setState = function (material, camera, useCache) {
    var planes = material.clippingPlanes,
      clipIntersection = material.clipIntersection,
      clipShadows = material.clipShadows;
    var materialProperties = properties.get(material);
    if (!localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && !clipShadows) {
      // there's no local clipping

      if (renderingShadows) {
        // there's no global clipping

        projectPlanes(null);
      } else {
        resetGlobalState();
      }
    } else {
      var nGlobal = renderingShadows ? 0 : numGlobalPlanes,
        lGlobal = nGlobal * 4;
      var dstArray = materialProperties.clippingState || null;
      uniform.value = dstArray; // ensure unique state

      dstArray = projectPlanes(planes, camera, lGlobal, useCache);
      for (var i = 0; i !== lGlobal; ++i) {
        dstArray[i] = globalState[i];
      }
      materialProperties.clippingState = dstArray;
      this.numIntersection = clipIntersection ? this.numPlanes : 0;
      this.numPlanes += nGlobal;
    }
  };
  function resetGlobalState() {
    if (uniform.value !== globalState) {
      uniform.value = globalState;
      uniform.needsUpdate = numGlobalPlanes > 0;
    }
    scope.numPlanes = numGlobalPlanes;
    scope.numIntersection = 0;
  }
  function projectPlanes(planes, camera, dstOffset, skipTransform) {
    var nPlanes = planes !== null ? planes.length : 0;
    var dstArray = null;
    if (nPlanes !== 0) {
      dstArray = uniform.value;
      if (skipTransform !== true || dstArray === null) {
        var flatSize = dstOffset + nPlanes * 4,
          viewMatrix = camera.matrixWorldInverse;
        viewNormalMatrix.getNormalMatrix(viewMatrix);
        if (dstArray === null || dstArray.length < flatSize) {
          dstArray = new Float32Array(flatSize);
        }
        for (var i = 0, i4 = dstOffset; i !== nPlanes; ++i, i4 += 4) {
          plane.copy(planes[i]).applyMat4(viewMatrix, viewNormalMatrix);
          plane.normal.toArray(dstArray, i4);
          dstArray[i4 + 3] = plane.constant;
        }
      }
      uniform.value = dstArray;
      uniform.needsUpdate = true;
    }
    scope.numPlanes = nPlanes;
    scope.numIntersection = 0;
    return dstArray;
  }
}

;// ./src/webgl-renderer/Extensions.js
function WebGLExtensions(gl) {
  var extensions = {};
  function getExtension(name) {
    if (extensions[name] !== undefined) {
      return extensions[name];
    }
    var extension;
    switch (name) {
      case 'WEBGL_depth_texture':
        extension = gl.getExtension('WEBGL_depth_texture') || gl.getExtension('MOZ_WEBGL_depth_texture') || gl.getExtension('WEBKIT_WEBGL_depth_texture');
        break;
      case 'EXT_texture_filter_anisotropic':
        extension = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
        break;
      case 'WEBGL_compressed_texture_s3tc':
        extension = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        break;
      case 'WEBGL_compressed_texture_pvrtc':
        extension = gl.getExtension('WEBGL_compressed_texture_pvrtc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
        break;
      default:
        extension = gl.getExtension(name);
    }
    extensions[name] = extension;
    return extension;
  }
  return {
    has: function has(name) {
      return getExtension(name) !== null;
    },
    init: function init(capabilities) {
      if (capabilities.isWebGL2) {
        getExtension('EXT_color_buffer_float');
      } else {
        getExtension('WEBGL_depth_texture');
        getExtension('OES_texture_float');
        getExtension('OES_texture_half_float');
        getExtension('OES_texture_half_float_linear');
        getExtension('OES_standard_derivatives');
        getExtension('OES_element_index_uint');
        getExtension('OES_vertex_array_object');
        getExtension('ANGLE_instanced_arrays');
      }
      getExtension('OES_texture_float_linear');
      getExtension('EXT_color_buffer_half_float');
    },
    get: function get(name) {
      var extension = getExtension(name);
      if (extension === null) {
        console.warn('THREE.WebGLRenderer: ' + name + ' extension not supported.');
      }
      return extension;
    }
  };
}

;// ./src/geometries/BufferAttribute.js





var BufferAttribute_vector = new Vec3();
var BufferAttribute_vector2 = new Vec2();
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
        BufferAttribute_vector2.fromBufferAttribute(this, i);
        BufferAttribute_vector2.applyMat3(m);
        this.setXY(i, BufferAttribute_vector2.x, BufferAttribute_vector2.y);
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


;// ./src/webgl-renderer/Geometries.js


function WebGLGeometries(gl, attributes, info, bindingStates) {
  var geometries = {};
  var wireframeAttributes = new WeakMap();
  function onGeometryDispose() {
    var geometry = this;
    if (geometry.index !== null) {
      attributes.remove(geometry.index);
    }
    for (var name in geometry.attributes) {
      attributes.remove(geometry.attributes[name]);
    }
    geometry.off('dispose', onGeometryDispose, geometry);
    delete geometries[geometry.id];
    var attribute = wireframeAttributes.get(geometry);
    if (attribute) {
      attributes.remove(attribute);
      wireframeAttributes["delete"](geometry);
    }
    bindingStates.releaseStatesOfGeometry(geometry);
    if (geometry.isInstancedBufferGeometry === true) {
      delete geometry._maxInstanceCount;
    }

    //

    info.memory.geometries--;
  }
  function get(object, geometry) {
    if (geometries[geometry.id] === true) return geometry;
    geometry.on('dispose', onGeometryDispose, geometry);
    geometries[geometry.id] = true;
    info.memory.geometries++;
    return geometry;
  }
  function update(geometry) {
    var geometryAttributes = geometry.attributes;

    // Updating index buffer in VAO now. See WebGLBindingStates.

    for (var name in geometryAttributes) {
      attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);
    }

    // morph targets

    var morphAttributes = geometry.morphAttributes;
    for (var _name in morphAttributes) {
      var array = morphAttributes[_name];
      for (var i = 0, l = array.length; i < l; i++) {
        attributes.update(array[i], gl.ARRAY_BUFFER);
      }
    }
  }
  function updateWireframeAttribute(geometry) {
    var indices = [];
    var geometryIndex = geometry.index;
    var geometryPosition = geometry.attributes.position;
    var version = 0;
    if (geometryIndex !== null) {
      var array = geometryIndex.array;
      version = geometryIndex.version;
      for (var i = 0, l = array.length; i < l; i += 3) {
        var a = array[i + 0];
        var b = array[i + 1];
        var c = array[i + 2];
        indices.push(a, b, b, c, c, a);
      }
    } else {
      var _array = geometryPosition.array;
      version = geometryPosition.version;
      for (var _i = 0, _l = _array.length / 3 - 1; _i < _l; _i += 3) {
        var _a = _i + 0;
        var _b = _i + 1;
        var _c = _i + 2;
        indices.push(_a, _b, _b, _c, _c, _a);
      }
    }
    var attribute = new (arrayMax(indices) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);
    attribute.version = version;

    // Updating index buffer in VAO now. See WebGLBindingStates

    //

    var previousAttribute = wireframeAttributes.get(geometry);
    if (previousAttribute) attributes.remove(previousAttribute);

    //

    wireframeAttributes.set(geometry, attribute);
  }
  function getWireframeAttribute(geometry) {
    var currentAttribute = wireframeAttributes.get(geometry);
    if (currentAttribute) {
      var geometryIndex = geometry.index;
      if (geometryIndex !== null) {
        // if the attribute is obsolete, create a new one

        if (currentAttribute.version < geometryIndex.version) {
          updateWireframeAttribute(geometry);
        }
      }
    } else {
      updateWireframeAttribute(geometry);
    }
    return wireframeAttributes.get(geometry);
  }
  return {
    get: get,
    update: update,
    getWireframeAttribute: getWireframeAttribute
  };
}

;// ./src/webgl-renderer/IndexedBufferRenderer.js
function WebGLIndexedBufferRenderer(gl, extensions, info, capabilities) {
  var isWebGL2 = capabilities.isWebGL2;
  var mode;
  function setMode(value) {
    mode = value;
  }
  var type, bytesPerElement;
  function setIndex(value) {
    type = value.type;
    bytesPerElement = value.bytesPerElement;
  }
  function render(start, count) {
    gl.drawElements(mode, count, type, start * bytesPerElement);
    info.update(count, mode, 1);
  }
  function renderInstances(start, count, primcount) {
    if (primcount === 0) return;
    var extension, methodName;
    if (isWebGL2) {
      extension = gl;
      methodName = 'drawElementsInstanced';
    } else {
      extension = extensions.get('ANGLE_instanced_arrays');
      methodName = 'drawElementsInstancedANGLE';
      if (extension === null) {
        console.error('THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
        return;
      }
    }
    extension[methodName](mode, count, type, start * bytesPerElement, primcount);
    info.update(count, mode, primcount);
  }

  //

  this.setMode = setMode;
  this.setIndex = setIndex;
  this.render = render;
  this.renderInstances = renderInstances;
}

;// ./src/webgl-renderer/Info.js
function WebGLInfo(gl) {
  var memory = {
    geometries: 0,
    textures: 0
  };
  var render = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function update(count, mode, instanceCount) {
    render.calls++;
    switch (mode) {
      case gl.TRIANGLES:
        render.triangles += instanceCount * (count / 3);
        break;
      case gl.LINES:
        render.lines += instanceCount * (count / 2);
        break;
      case gl.LINE_STRIP:
        render.lines += instanceCount * (count - 1);
        break;
      case gl.LINE_LOOP:
        render.lines += instanceCount * count;
        break;
      case gl.POINTS:
        render.points += instanceCount * count;
        break;
      default:
        console.error('THREE.WebGLInfo: Unknown draw mode:', mode);
        break;
    }
  }
  function reset() {
    render.frame++;
    render.calls = 0;
    render.triangles = 0;
    render.points = 0;
    render.lines = 0;
  }
  return {
    memory: memory,
    render: render,
    programs: null,
    autoReset: true,
    reset: reset,
    update: update
  };
}

;// ./src/webgl-renderer/Morphtargets.js
function numericalSort(a, b) {
  return a[0] - b[0];
}
function absNumericalSort(a, b) {
  return Math.abs(b[1]) - Math.abs(a[1]);
}
function WebGLMorphtargets(gl) {
  var influencesList = {};
  var morphInfluences = new Float32Array(8);
  var workInfluences = [];
  for (var i = 0; i < 8; i++) {
    workInfluences[i] = [i, 0];
  }
  function update(object, geometry, material, program) {
    var objectInfluences = object.morphTargetInfluences;

    // When object doesn't have morph target influences defined, we treat it as a 0-length array
    // This is important to make sure we set up morphTargetBaseInfluence / morphTargetInfluences

    var length = objectInfluences === undefined ? 0 : objectInfluences.length;
    var influences = influencesList[geometry.id];
    if (influences === undefined) {
      // initialise list

      influences = [];
      for (var _i = 0; _i < length; _i++) {
        influences[_i] = [_i, 0];
      }
      influencesList[geometry.id] = influences;
    }

    // Collect influences

    for (var _i2 = 0; _i2 < length; _i2++) {
      var influence = influences[_i2];
      influence[0] = _i2;
      influence[1] = objectInfluences[_i2];
    }
    influences.sort(absNumericalSort);
    for (var _i3 = 0; _i3 < 8; _i3++) {
      if (_i3 < length && influences[_i3][1]) {
        workInfluences[_i3][0] = influences[_i3][0];
        workInfluences[_i3][1] = influences[_i3][1];
      } else {
        workInfluences[_i3][0] = Number.MAX_SAFE_INTEGER;
        workInfluences[_i3][1] = 0;
      }
    }
    workInfluences.sort(numericalSort);
    var morphTargets = material.morphTargets && geometry.morphAttributes.position;
    var morphNormals = material.morphNormals && geometry.morphAttributes.normal;
    var morphInfluencesSum = 0;
    for (var _i4 = 0; _i4 < 8; _i4++) {
      var _influence = workInfluences[_i4];
      var index = _influence[0];
      var value = _influence[1];
      if (index !== Number.MAX_SAFE_INTEGER && value) {
        if (morphTargets && geometry.getAttribute('morphTarget' + _i4) !== morphTargets[index]) {
          geometry.setAttribute('morphTarget' + _i4, morphTargets[index]);
        }
        if (morphNormals && geometry.getAttribute('morphNormal' + _i4) !== morphNormals[index]) {
          geometry.setAttribute('morphNormal' + _i4, morphNormals[index]);
        }
        morphInfluences[_i4] = value;
        morphInfluencesSum += value;
      } else {
        if (morphTargets && geometry.hasAttribute('morphTarget' + _i4) === true) {
          geometry.deleteAttribute('morphTarget' + _i4);
        }
        if (morphNormals && geometry.hasAttribute('morphNormal' + _i4) === true) {
          geometry.deleteAttribute('morphNormal' + _i4);
        }
        morphInfluences[_i4] = 0;
      }
    }

    // GLSL shader uses formula baseinfluence * base + sum(target * influence)
    // This allows us to switch between absolute morphs and relative morphs without changing shader code
    // When baseinfluence = 1 - sum(influence), the above is equivalent to sum((target - base) * influence)
    var morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;
    program.getUniforms().setValue(gl, 'morphTargetBaseInfluence', morphBaseInfluence);
    program.getUniforms().setValue(gl, 'morphTargetInfluences', morphInfluences);
  }
  return {
    update: update
  };
}

;// ./src/webgl-renderer/Objects.js
function WebGLObjects(gl, geometries, attributes, info) {
  var updateMap = new WeakMap();
  function update(object) {
    var frame = info.render.frame;
    var geometry = object.geometry;
    var buffergeometry = geometries.get(object, geometry);

    // Update once per frame

    if (updateMap.get(buffergeometry) !== frame) {
      geometries.update(buffergeometry);
      updateMap.set(buffergeometry, frame);
    }
    if (object.isInstancedMesh) {
      if (!object.hasEventListener('dispose', onInstancedMeshDispose)) {
        object.once('dispose', onInstancedMeshDispose);
      }
      attributes.update(object.instanceMatrix, gl.ARRAY_BUFFER);
      if (object.instanceColor !== null) {
        attributes.update(object.instanceColor, gl.ARRAY_BUFFER);
      }
    }
    return buffergeometry;
  }
  function dispose() {
    updateMap = new WeakMap();
  }
  function onInstancedMeshDispose(event) {
    var instancedMesh = event.target;

    // instancedMesh.removeEventListener( 'dispose', onInstancedMeshDispose );

    attributes.remove(instancedMesh.instanceMatrix);
    if (instancedMesh.instanceColor !== null) attributes.remove(instancedMesh.instanceColor);
  }
  return {
    update: update,
    dispose: dispose
  };
}

;// ./src/webgl-renderer/Uniforms.js
/**
 * Uniforms of a program.
 * Those form a tree structure with a special top-level container for the root,
 * which you get by calling 'new WebGLUniforms( gl, program )'.
 *
 *
 * Properties of inner nodes including the top-level container:
 *
 * .seq - array of nested uniforms
 * .map - nested uniforms by name
 *
 *
 * Methods of all nodes except the top-level container:
 *
 * .setValue( gl, value, [textures] )
 *
 * 		uploads a uniform value(s)
 *  	the 'textures' parameter is needed for sampler uniforms
 *
 *
 * Static methods of the top-level container (textures factorizations):
 *
 * .upload( gl, seq, values, textures )
 *
 * 		sets uniforms in 'seq' to 'values[id].value'
 *
 * .seqWithValue( seq, values ) : filteredSeq
 *
 * 		filters 'seq' entries with corresponding entry in values
 *
 *
 * Methods of the top-level container (textures factorizations):
 *
 * .setValue( gl, name, value, textures )
 *
 * 		sets uniform with  name 'name' to 'value'
 *
 * .setOptional( gl, obj, prop )
 *
 * 		like .set for an optional property of the object
 *
 */

// import { CubeTexture } from '../textures/CubeTexture.js';

// import { DataTexture2DArray } from '../textures/DataTexture2DArray.js';
// import { DataTexture3D } from '../textures/DataTexture3D.js';

var emptyTexture = new _Texture();
// const emptyTexture2dArray = new DataTexture2DArray();
// const emptyTexture3d = new DataTexture3D();
// const emptyCubeTexture = new CubeTexture();

// --- Utilities ---

// Array Caches (provide typed arrays for temporary by size)

var arrayCacheF32 = [];
var arrayCacheI32 = [];

// Float32Array caches used for uploading Matrix uniforms

var mat4array = new Float32Array(16);
var mat3array = new Float32Array(9);
var mat2array = new Float32Array(4);

// Flattening for arrays of vectors and matrices

function flatten(array, nBlocks, blockSize) {
  var firstElem = array[0];
  if (firstElem <= 0 || firstElem > 0) return array;
  // unoptimized: ! isNaN( firstElem )
  // see http://jacksondunstan.com/articles/983

  var n = nBlocks * blockSize;
  var r = arrayCacheF32[n];
  if (r === undefined) {
    r = new Float32Array(n);
    arrayCacheF32[n] = r;
  }
  if (nBlocks !== 0) {
    firstElem.toArray(r, 0);
    for (var i = 1, offset = 0; i !== nBlocks; ++i) {
      offset += blockSize;
      array[i].toArray(r, offset);
    }
  }
  return r;
}
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function copyArray(a, b) {
  for (var i = 0, l = b.length; i < l; i++) {
    a[i] = b[i];
  }
}

// Texture unit allocation

function allocTexUnits(textures, n) {
  var r = arrayCacheI32[n];
  if (r === undefined) {
    r = new Int32Array(n);
    arrayCacheI32[n] = r;
  }
  for (var i = 0; i !== n; ++i) {
    r[i] = textures.allocateTextureUnit();
  }
  return r;
}

// --- Setters ---

// Note: Defining these methods externally, because they come in a bunch
// and this way their names minify.

// Single scalar

function setValueV1f(gl, v) {
  var cache = this.cache;
  if (cache[0] === v) return;
  gl.uniform1f(this.addr, v);
  cache[0] = v;
}

// Single float vector (from flat array or THREE.VectorN)

function setValueV2f(gl, v) {
  var cache = this.cache;
  if (v.x !== undefined) {
    if (cache[0] !== v.x || cache[1] !== v.y) {
      gl.uniform2f(this.addr, v.x, v.y);
      cache[0] = v.x;
      cache[1] = v.y;
    }
  } else {
    if (arraysEqual(cache, v)) return;
    gl.uniform2fv(this.addr, v);
    copyArray(cache, v);
  }
}
function setValueV3f(gl, v) {
  var cache = this.cache;
  if (v.x !== undefined) {
    if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
      gl.uniform3f(this.addr, v.x, v.y, v.z);
      cache[0] = v.x;
      cache[1] = v.y;
      cache[2] = v.z;
    }
  } else if (v.r !== undefined) {
    if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {
      gl.uniform3f(this.addr, v.r, v.g, v.b);
      cache[0] = v.r;
      cache[1] = v.g;
      cache[2] = v.b;
    }
  } else {
    if (arraysEqual(cache, v)) return;
    gl.uniform3fv(this.addr, v);
    copyArray(cache, v);
  }
}
function setValueV4f(gl, v) {
  var cache = this.cache;
  if (v.x !== undefined) {
    if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
      gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);
      cache[0] = v.x;
      cache[1] = v.y;
      cache[2] = v.z;
      cache[3] = v.w;
    }
  } else {
    if (arraysEqual(cache, v)) return;
    gl.uniform4fv(this.addr, v);
    copyArray(cache, v);
  }
}

// Single matrix (from flat array or THREE.MatrixN)

function setValueM2(gl, v) {
  var cache = this.cache;
  var elements = v.elements;
  if (elements === undefined) {
    if (arraysEqual(cache, v)) return;
    gl.uniformMatrix2fv(this.addr, false, v);
    copyArray(cache, v);
  } else {
    if (arraysEqual(cache, elements)) return;
    mat2array.set(elements);
    gl.uniformMatrix2fv(this.addr, false, mat2array);
    copyArray(cache, elements);
  }
}
function setValueM3(gl, v) {
  var cache = this.cache;
  var elements = v.elements;
  if (elements === undefined) {
    if (arraysEqual(cache, v)) return;
    gl.uniformMatrix3fv(this.addr, false, v);
    copyArray(cache, v);
  } else {
    if (arraysEqual(cache, elements)) return;
    mat3array.set(elements);
    gl.uniformMatrix3fv(this.addr, false, mat3array);
    copyArray(cache, elements);
  }
}
function setValueM4(gl, v) {
  var cache = this.cache;
  var elements = v.elements;
  if (elements === undefined) {
    if (arraysEqual(cache, v)) return;
    gl.uniformMatrix4fv(this.addr, false, v);
    copyArray(cache, v);
  } else {
    if (arraysEqual(cache, elements)) return;
    mat4array.set(elements);
    gl.uniformMatrix4fv(this.addr, false, mat4array);
    copyArray(cache, elements);
  }
}

// Single integer / boolean

function setValueV1i(gl, v) {
  var cache = this.cache;
  if (cache[0] === v) return;
  gl.uniform1i(this.addr, v);
  cache[0] = v;
}

// Single integer / boolean vector (from flat array)

function setValueV2i(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v)) return;
  gl.uniform2iv(this.addr, v);
  copyArray(cache, v);
}
function setValueV3i(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v)) return;
  gl.uniform3iv(this.addr, v);
  copyArray(cache, v);
}
function setValueV4i(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v)) return;
  gl.uniform4iv(this.addr, v);
  copyArray(cache, v);
}

// Single unsigned integer

function setValueV1ui(gl, v) {
  var cache = this.cache;
  if (cache[0] === v) return;
  gl.uniform1ui(this.addr, v);
  cache[0] = v;
}

// Single unsigned integer vector (from flat array)

function setValueV2ui(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v)) return;
  gl.uniform2uiv(this.addr, v);
  copyArray(cache, v);
}
function setValueV3ui(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v)) return;
  gl.uniform3uiv(this.addr, v);
  copyArray(cache, v);
}
function setValueV4ui(gl, v) {
  var cache = this.cache;
  if (arraysEqual(cache, v)) return;
  gl.uniform4uiv(this.addr, v);
  copyArray(cache, v);
}

// Single texture (2D / Cube)

function setValueT1(gl, v, textures) {
  var cache = this.cache;
  var unit = textures.allocateTextureUnit();
  if (cache[0] !== unit) {
    gl.uniform1i(this.addr, unit);
    cache[0] = unit;
  }
  textures.safeSetTexture2D(v || emptyTexture, unit);
}

// function setValueT3D1( gl, v, textures ) {

// 	const cache = this.cache;
// 	const unit = textures.allocateTextureUnit();

// 	if ( cache[ 0 ] !== unit ) {

// 		gl.uniform1i( this.addr, unit );
// 		cache[ 0 ] = unit;

// 	}

// 	textures.setTexture3D( v || emptyTexture3d, unit );

// }

// function setValueT6( gl, v, textures ) {

// 	const cache = this.cache;
// 	const unit = textures.allocateTextureUnit();

// 	if ( cache[ 0 ] !== unit ) {

// 		gl.uniform1i( this.addr, unit );
// 		cache[ 0 ] = unit;

// 	}

// 	textures.safeSetTextureCube( v || emptyCubeTexture, unit );

// }

// function setValueT2DArray1( gl, v, textures ) {

// 	const cache = this.cache;
// 	const unit = textures.allocateTextureUnit();

// 	if ( cache[ 0 ] !== unit ) {

// 		gl.uniform1i( this.addr, unit );
// 		cache[ 0 ] = unit;

// 	}

// 	textures.setTexture2DArray( v || emptyTexture2dArray, unit );

// }

// Helper to pick the right setter for the singular case

function getSingularSetter(type) {
  switch (type) {
    case 0x1406:
      return setValueV1f;
    // FLOAT
    case 0x8b50:
      return setValueV2f;
    // _VEC2
    case 0x8b51:
      return setValueV3f;
    // _VEC3
    case 0x8b52:
      return setValueV4f;
    // _VEC4

    case 0x8b5a:
      return setValueM2;
    // _MAT2
    case 0x8b5b:
      return setValueM3;
    // _MAT3
    case 0x8b5c:
      return setValueM4;
    // _MAT4

    case 0x1404:
    case 0x8b56:
      return setValueV1i;
    // INT, BOOL
    case 0x8b53:
    case 0x8b57:
      return setValueV2i;
    // _VEC2
    case 0x8b54:
    case 0x8b58:
      return setValueV3i;
    // _VEC3
    case 0x8b55:
    case 0x8b59:
      return setValueV4i;
    // _VEC4

    case 0x1405:
      return setValueV1ui;
    // UINT
    case 0x8dc6:
      return setValueV2ui;
    // _VEC2
    case 0x8dc7:
      return setValueV3ui;
    // _VEC3
    case 0x8dc8:
      return setValueV4ui;
    // _VEC4

    case 0x8b5e: // SAMPLER_2D
    case 0x8d66: // SAMPLER_EXTERNAL_OES
    case 0x8dca: // INT_SAMPLER_2D
    case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
    case 0x8b62:
      // SAMPLER_2D_SHADOW
      return setValueT1;

    // case 0x8b5f: // SAMPLER_3D
    // case 0x8dcb: // INT_SAMPLER_3D
    // case 0x8dd3: // UNSIGNED_INT_SAMPLER_3D
    // 	return setValueT3D1;

    // case 0x8b60: // SAMPLER_CUBE
    // case 0x8dcc: // INT_SAMPLER_CUBE
    // case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
    // case 0x8dc5: // SAMPLER_CUBE_SHADOW
    // 	return setValueT6;

    // case 0x8dc1: // SAMPLER_2D_ARRAY
    // case 0x8dcf: // INT_SAMPLER_2D_ARRAY
    // case 0x8dd7: // UNSIGNED_INT_SAMPLER_2D_ARRAY
    // case 0x8dc4: // SAMPLER_2D_ARRAY_SHADOW
    // 	return setValueT2DArray1;
  }
}

// Array of scalars

function setValueV1fArray(gl, v) {
  gl.uniform1fv(this.addr, v);
}

// Array of vectors (from flat array or array of THREE.VectorN)

function setValueV2fArray(gl, v) {
  var data = flatten(v, this.size, 2);
  gl.uniform2fv(this.addr, data);
}
function setValueV3fArray(gl, v) {
  var data = flatten(v, this.size, 3);
  gl.uniform3fv(this.addr, data);
}
function setValueV4fArray(gl, v) {
  var data = flatten(v, this.size, 4);
  gl.uniform4fv(this.addr, data);
}

// Array of matrices (from flat array or array of THREE.MatrixN)

function setValueM2Array(gl, v) {
  var data = flatten(v, this.size, 4);
  gl.uniformMatrix2fv(this.addr, false, data);
}
function setValueM3Array(gl, v) {
  var data = flatten(v, this.size, 9);
  gl.uniformMatrix3fv(this.addr, false, data);
}
function setValueM4Array(gl, v) {
  var data = flatten(v, this.size, 16);
  gl.uniformMatrix4fv(this.addr, false, data);
}

// Array of integer / boolean

function setValueV1iArray(gl, v) {
  gl.uniform1iv(this.addr, v);
}

// Array of integer / boolean vectors (from flat array)

function setValueV2iArray(gl, v) {
  gl.uniform2iv(this.addr, v);
}
function setValueV3iArray(gl, v) {
  gl.uniform3iv(this.addr, v);
}
function setValueV4iArray(gl, v) {
  gl.uniform4iv(this.addr, v);
}

// Array of unsigned integer

function setValueV1uiArray(gl, v) {
  gl.uniform1uiv(this.addr, v);
}

// Array of unsigned integer vectors (from flat array)

function setValueV2uiArray(gl, v) {
  gl.uniform2uiv(this.addr, v);
}
function setValueV3uiArray(gl, v) {
  gl.uniform3uiv(this.addr, v);
}
function setValueV4uiArray(gl, v) {
  gl.uniform4uiv(this.addr, v);
}

// Array of textures (2D / Cube)

function setValueT1Array(gl, v, textures) {
  var n = v.length;
  var units = allocTexUnits(textures, n);
  gl.uniform1iv(this.addr, units);
  for (var i = 0; i !== n; ++i) {
    textures.safeSetTexture2D(v[i] || emptyTexture, units[i]);
  }
}

// function setValueT6Array( gl, v, textures ) {

// 	const n = v.length;

// 	const units = allocTexUnits( textures, n );

// 	gl.uniform1iv( this.addr, units );

// 	for ( let i = 0; i !== n; ++ i ) {

// 		textures.safeSetTextureCube( v[ i ] || emptyCubeTexture, units[ i ] );

// 	}

// }

// Helper to pick the right setter for a pure (bottom-level) array

function getPureArraySetter(type) {
  switch (type) {
    case 0x1406:
      return setValueV1fArray;
    // FLOAT
    case 0x8b50:
      return setValueV2fArray;
    // _VEC2
    case 0x8b51:
      return setValueV3fArray;
    // _VEC3
    case 0x8b52:
      return setValueV4fArray;
    // _VEC4

    case 0x8b5a:
      return setValueM2Array;
    // _MAT2
    case 0x8b5b:
      return setValueM3Array;
    // _MAT3
    case 0x8b5c:
      return setValueM4Array;
    // _MAT4

    case 0x1404:
    case 0x8b56:
      return setValueV1iArray;
    // INT, BOOL
    case 0x8b53:
    case 0x8b57:
      return setValueV2iArray;
    // _VEC2
    case 0x8b54:
    case 0x8b58:
      return setValueV3iArray;
    // _VEC3
    case 0x8b55:
    case 0x8b59:
      return setValueV4iArray;
    // _VEC4

    case 0x1405:
      return setValueV1uiArray;
    // UINT
    case 0x8dc6:
      return setValueV2uiArray;
    // _VEC2
    case 0x8dc7:
      return setValueV3uiArray;
    // _VEC3
    case 0x8dc8:
      return setValueV4uiArray;
    // _VEC4

    case 0x8b5e: // SAMPLER_2D
    case 0x8d66: // SAMPLER_EXTERNAL_OES
    case 0x8dca: // INT_SAMPLER_2D
    case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
    case 0x8b62:
      // SAMPLER_2D_SHADOW
      return setValueT1Array;

    // case 0x8b60: // SAMPLER_CUBE
    // case 0x8dcc: // INT_SAMPLER_CUBE
    // case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
    // case 0x8dc5: // SAMPLER_CUBE_SHADOW
    // 	return setValueT6Array;
  }
}

// --- Uniform Classes ---

function SingleUniform(id, activeInfo, addr) {
  this.id = id;
  this.addr = addr;
  this.cache = [];
  this.setValue = getSingularSetter(activeInfo.type);

  // this.path = activeInfo.name; // DEBUG
}
function PureArrayUniform(id, activeInfo, addr) {
  this.id = id;
  this.addr = addr;
  this.cache = [];
  this.size = activeInfo.size;
  this.setValue = getPureArraySetter(activeInfo.type);

  // this.path = activeInfo.name; // DEBUG
}
PureArrayUniform.prototype.updateCache = function (data) {
  var cache = this.cache;
  if (data instanceof Float32Array && cache.length !== data.length) {
    this.cache = new Float32Array(data.length);
  }
  copyArray(cache, data);
};
function StructuredUniform(id) {
  this.id = id;
  this.seq = [];
  this.map = {};
}
StructuredUniform.prototype.setValue = function (gl, value, textures) {
  var seq = this.seq;
  for (var i = 0, n = seq.length; i !== n; ++i) {
    var u = seq[i];
    u.setValue(gl, value[u.id], textures);
  }
};

// --- Top-level ---

// Parser - builds up the property tree from the path strings

var RePathPart = /(\w+)(\])?(\[|\.)?/g;

// extracts
// 	- the identifier (member name or array index)
//  - followed by an optional right bracket (found when array index)
//  - followed by an optional left bracket or dot (type of subscript)
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.

function addUniform(container, uniformObject) {
  container.seq.push(uniformObject);
  container.map[uniformObject.id] = uniformObject;
}
function parseUniform(activeInfo, addr, container) {
  var path = activeInfo.name,
    pathLength = path.length;

  // reset RegExp object, because of the early exit of a previous run
  RePathPart.lastIndex = 0;
  while (true) {
    var match = RePathPart.exec(path),
      matchEnd = RePathPart.lastIndex;
    var id = match[1];
    var idIsIndex = match[2] === ']',
      subscript = match[3];
    if (idIsIndex) id = id | 0; // convert to integer

    if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {
      // bare name or "pure" bottom-level array "[0]" suffix

      addUniform(container, subscript === undefined ? new SingleUniform(id, activeInfo, addr) : new PureArrayUniform(id, activeInfo, addr));
      break;
    } else {
      // step into inner node / create it in case it doesn't exist

      var map = container.map;
      var next = map[id];
      if (next === undefined) {
        next = new StructuredUniform(id);
        addUniform(container, next);
      }
      container = next;
    }
  }
}

// Root Container

function WebGLUniforms(gl, program) {
  this.seq = [];
  this.map = {};
  var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < n; ++i) {
    var info = gl.getActiveUniform(program, i),
      addr = gl.getUniformLocation(program, info.name);
    parseUniform(info, addr, this);
  }
}
WebGLUniforms.prototype.setValue = function (gl, name, value, textures) {
  var u = this.map[name];
  if (u !== undefined) u.setValue(gl, value, textures);
};
WebGLUniforms.prototype.setOptional = function (gl, object, name) {
  var v = object[name];
  if (v !== undefined) this.setValue(gl, name, v);
};

// Static interface

WebGLUniforms.upload = function (gl, seq, values, textures) {
  for (var i = 0, n = seq.length; i !== n; ++i) {
    var u = seq[i],
      v = values[u.id];
    if (v.needsUpdate !== false) {
      // note: always updating when .needsUpdate is undefined
      u.setValue(gl, v.value, textures);
    }
  }
};
WebGLUniforms.seqWithValue = function (seq, values) {
  var r = [];
  for (var i = 0, n = seq.length; i !== n; ++i) {
    var u = seq[i];
    if (u.id in values) r.push(u);
  }
  return r;
};

;// ./src/webgl-renderer/utils/compileProgram.js
function compileShader(gl, type, string) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, string);
  gl.compileShader(shader);
  return shader;
}

/**
 * Compile GL program
 * @param gl {WebGLRenderingContext} The current WebGL context {WebGLProgram}
 * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
 * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
 * @param parameters {Object} An attribute location map that lets you manually set the attribute locations
 * @return {WebGLProgram} the shader program
 */
function compileProgram(gl, vertexSrc, fragmentSrc, parameters) {
  parameters = parameters || {};
  var program = gl.createProgram();
  var vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
  var fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  if (parameters.index0AttributeName !== undefined) {
    gl.bindAttribLocation(program, 0, parameters.index0AttributeName);
  } else if (parameters.morphTargets === true) {
    // programs with morphTargets displace position out of attribute 0
    gl.bindAttribLocation(program, 0, 'position');
  }
  var attribs = parameters.attributeLocations;
  if (attribs) {
    for (var i in attribs) {
      gl.bindAttribLocation(program, attribs[i], i);
    }
  }
  gl.linkProgram(program);

  // check for link errors
  if (true) {
    var programLog = gl.getProgramInfoLog(program).trim();
    var vertexLog = gl.getShaderInfoLog(vertexShader).trim();
    var fragmentLog = gl.getShaderInfoLog(fragmentShader).trim();
    var runnable = true;
    var haveDiagnostics = true;
    if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
      runnable = false;
      var vertexErrors = getShaderErrors(gl, vertexShader, 'vertex');
      var fragmentErrors = getShaderErrors(gl, fragmentShader, 'fragment');
      console.error('THREE.WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexErrors, fragmentErrors);
    } else if (programLog !== '') {
      console.warn('THREE.WebGLProgram: gl.getProgramInfoLog()', programLog);
    } else if (vertexLog === '' || fragmentLog === '') {
      haveDiagnostics = false;
    }

    // if ( haveDiagnostics ) {

    // 	this.diagnostics = {

    // 		runnable: runnable,

    // 		programLog: programLog,

    // 		vertexShader: {

    // 			log: vertexLog,
    // 			prefix: prefixVertex

    // 		},

    // 		fragmentShader: {

    // 			log: fragmentLog,
    // 			prefix: prefixFragment

    // 		}

    // 	};

    // }
  }

  // Clean up

  // Crashes in iOS9 and iOS10. #18402
  // gl.detachShader( program, vertexShader );
  // gl.detachShader( program, fragmentShader );

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}
function addLineNumbers(string) {
  var lines = string.split('\n');
  for (var i = 0; i < lines.length; i++) {
    lines[i] = i + 1 + ': ' + lines[i];
  }
  return lines.join('\n');
}
function getShaderErrors(gl, shader, type) {
  var status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  var log = gl.getShaderInfoLog(shader).trim();
  if (status && log === '') return '';

  // --enable-privileged-webgl-extension
  // console.log( '**' + type + '**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

  var source = gl.getShaderSource(shader);
  return 'THREE.WebGLShader: gl.getShaderInfoLog() ' + type + '\n' + log + addLineNumbers(source);
}

;// ./src/webgl-renderer/shaders/ShaderChunk/alphamap_fragment.glsl.js
/* harmony default export */ const alphamap_fragment_glsl = (/* glsl */"\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/alphamap_pars_fragment.glsl.js
/* harmony default export */ const alphamap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/alphatest_fragment.glsl.js
/* harmony default export */ const alphatest_fragment_glsl = (/* glsl */"\n#ifdef ALPHATEST\n\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/aomap_fragment.glsl.js
/* harmony default export */ const aomap_fragment_glsl = (/* glsl */"\n#ifdef USE_AOMAP\n\n\t// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/aomap_pars_fragment.glsl.js
/* harmony default export */ const aomap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_AOMAP\n\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/begin_vertex.glsl.js
/* harmony default export */ const begin_vertex_glsl = (/* glsl */"\nvec3 transformed = vec3( position );\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/beginnormal_vertex.glsl.js
/* harmony default export */ const beginnormal_vertex_glsl = (/* glsl */"\nvec3 objectNormal = vec3( normal );\n\n#ifdef USE_TANGENT\n\n\tvec3 objectTangent = vec3( tangent.xyz );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/bsdfs.glsl.js
/* harmony default export */ const bsdfs_glsl = (/* glsl */"\n\n// Analytical approximation of the DFG LUT, one half of the\n// split-sum approximation used in indirect specular lighting.\n// via 'environmentBRDF' from \"Physically Based Shading on Mobile\"\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile\nvec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\n\tvec4 r = roughness * c0 + c1;\n\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n\n}\n\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\n\t// based upon Frostbite 3 Moving to Physically-based Rendering\n\t// page 32, equation 26: E[window1]\n\t// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\n\t// this is intended to be used on spot and point lights who are represented as luminous intensity\n\t// but who must be converted to luminous irradiance for surface lighting calculation\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\n\tif( cutoffDistance > 0.0 ) {\n\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\n\t}\n\n\treturn distanceFalloff;\n\n#else\n\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\n\t}\n\n\treturn 1.0;\n\n#endif\n\n}\n\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\n\treturn RECIPROCAL_PI * diffuseColor;\n\n} // validated\n\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\n\t// Original approximation by Christophe Schlick '94\n\t// float fresnel = pow( 1.0 - dotLH, 5.0 );\n\n\t// Optimized variant (presented by Epic at SIGGRAPH '13)\n\t// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n\n} // validated\n\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\n\t// See F_Schlick\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\n\treturn Fr * fresnel + F0;\n\n}\n\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (34)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is \"roughness squared\" in Disney\u2019s reparameterization\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\t// geometry term (normalized) = G(l)\u22C5G(v) / 4(n\u22C5l)(n\u22C5v)\n\t// also see #12151\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\n\treturn 1.0 / ( gl * gv );\n\n} // validated\n\n// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2\n// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\tfloat a2 = pow2( alpha );\n\n\t// dotNL and dotNV are explicitly swapped. This is not a mistake.\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\n\treturn 0.5 / max( gv + gl, EPSILON );\n\n}\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (33)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is \"roughness squared\" in Disney\u2019s reparameterization\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1\n\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n\n}\n\n// GGX Distribution, Schlick Fresnel, GGX-Smith Visibility\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\n\tfloat alpha = pow2( roughness ); // UE4's roughness\n\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n\tfloat D = D_GGX( alpha, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n// Rect Area Light\n\n// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines\n// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt\n// code: https://github.com/selfshadow/ltc_code/\n\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\n\tfloat dotNV = saturate( dot( N, V ) );\n\n\t// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\treturn uv;\n\n}\n\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\n\t// Real-Time Area Lighting: a Journey from Research to Production (p.102)\n\t// An approximation of the form factor of a horizon-clipped rectangle.\n\n\tfloat l = length( f );\n\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n\n}\n\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\n\tfloat x = dot( v1, v2 );\n\n\tfloat y = abs( x );\n\n\t// rational polynomial approximation to theta / sin( theta ) / 2PI\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\n\treturn cross( v1, v2 ) * theta_sintheta;\n\n}\n\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\n\t// bail if point is on back side of plane of light\n\t// assumes ccw winding order of light vertices\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\n\t// construct orthonormal basis around N\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system\n\n\t// compute transform\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\n\t// transform rect\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\n\t// project rect onto sphere\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\n\t// calculate vector form factor\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\n\t// adjust for horizon clipping\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\n/*\n\t// alternate method of adjusting for horizon clipping (see referece)\n\t// refactoring required\n\tfloat len = length( vectorFormFactor );\n\tfloat z = vectorFormFactor.z / len;\n\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\n\t// tabulated horizon-clipped sphere, apparently...\n\tvec2 uv = vec2( z * 0.5 + 0.5, len );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\tfloat scale = texture2D( ltc_2, uv ).w;\n\n\tfloat result = len * scale;\n*/\n\n\treturn vec3( result );\n\n}\n\n// End Rect Area Light\n\n// ref: https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\n\treturn specularColor * brdf.x + brdf.y;\n\n} // validated\n\n// Fdez-Ag\xFCera's \"Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting\"\n// Approximates multiscattering in order to preserve energy.\n// http://www.jcgt.org/published/0008/01/03/\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619; // 1/21\n\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n\n}\n\nfloat G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {\n\n\t// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)\n\treturn 0.25;\n\n}\n\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n\n}\n\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\n\t//float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\t//float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\n\tfloat G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );\n\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n// source: http://simonstechblog.blogspot.ca/2011/12/microfacet-brdf.html\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\n\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n\n#if defined( USE_SHEEN )\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs#L94\nfloat D_Charlie(float roughness, float NoH) {\n\t// Estevez and Kulla 2017, \"Production Friendly Microfacet Sheen BRDF\"\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125); // 2^(-14/2), so sin2h^2 > 0 in fp16\n\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs#L136\nfloat V_Neubelt(float NoV, float NoL) {\n\t// Neubelt and Pettineo 2013, \"Crafting a Next-gen Material Pipeline for The Order: 1886\"\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\n\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n\n}\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/bumpmap_pars_fragment.glsl.js
/* harmony default export */ const bumpmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen\n\t// http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\n\t\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\t\t// normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/clipping_planes_fragment.glsl.js
/* harmony default export */ const clipping_planes_fragment_glsl = (/* glsl */"\n#if NUM_CLIPPING_PLANES > 0\n\n\tvec4 plane;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\n\t\tbool clipped = true;\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t\tif ( clipped ) discard;\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/clipping_planes_pars_fragment.glsl.js
/* harmony default export */ const clipping_planes_pars_fragment_glsl = (/* glsl */"\n#if NUM_CLIPPING_PLANES > 0\n\n\tvarying vec3 vClipPosition;\n\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/clipping_planes_pars_vertex.glsl.js
/* harmony default export */ const clipping_planes_pars_vertex_glsl = (/* glsl */"\n#if NUM_CLIPPING_PLANES > 0\n\n\tvarying vec3 vClipPosition;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/clipping_planes_vertex.glsl.js
/* harmony default export */ const clipping_planes_vertex_glsl = (/* glsl */"\n#if NUM_CLIPPING_PLANES > 0\n\n\tvClipPosition = - mvPosition.xyz;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/color_fragment.glsl.js
/* harmony default export */ const color_fragment_glsl = (/* glsl */"\n#if defined( USE_COLOR_ALPHA )\n\n\tdiffuseColor *= vColor;\n\n#elif defined( USE_COLOR )\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/color_pars_fragment.glsl.js
/* harmony default export */ const color_pars_fragment_glsl = (/* glsl */"\n#if defined( USE_COLOR_ALPHA )\n\n\tvarying vec4 vColor;\n\n#elif defined( USE_COLOR )\n\n\tvarying vec3 vColor;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/color_pars_vertex.glsl.js
/* harmony default export */ const color_pars_vertex_glsl = (/* glsl */"\n#if defined( USE_COLOR_ALPHA )\n\n\tvarying vec4 vColor;\n\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\n\tvarying vec3 vColor;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/color_vertex.glsl.js
/* harmony default export */ const color_vertex_glsl = (/* glsl */"\n#if defined( USE_COLOR_ALPHA )\n\n\tvColor = vec4( 1.0 );\n\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\n\tvColor = vec3( 1.0 );\n\n#endif\n\n#ifdef USE_COLOR\n\n\tvColor *= color;\n\n#endif\n\n#ifdef USE_INSTANCING_COLOR\n\n\tvColor.xyz *= instanceColor.xyz;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/common.glsl.js
/* harmony default export */ const common_glsl = (/* glsl */"\n#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n\n#ifndef saturate\n// <tonemapping_pars_fragment> may have defined saturate() already\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\n\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\n// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.\n// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\n\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\n\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n}\n\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t// dir can be either a direction vector or a normal vector\n\t// upper-left 3x3 of matrix is assumed to be orthogonal\n\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n\n}\n\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\n\treturn - distance * planeNormal + point;\n\n}\n\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n\n}\n\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n\n}\n\nmat3 transposeMat3( const in mat3 m ) {\n\n\tmat3 tmp;\n\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\n\treturn tmp;\n\n}\n\n// https://en.wikipedia.org/wiki/Relative_luminance\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\n\treturn dot( weights, color.rgb );\n\n}\n\nbool isPerspectiveMatrix( mat4 m ) {\n\n\treturn m[ 2 ][ 3 ] == - 1.0;\n\n}\n\nvec2 equirectUv( in vec3 dir ) {\n\n\t// dir is assumed to be unit length\n\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n\treturn vec2( u, v );\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js
/* harmony default export */ const cube_uv_reflection_fragment_glsl = (/* glsl */"\n#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\n\t// These shader functions convert between the UV coordinates of a single face of\n\t// a cubemap, the 0-5 integer index of a cube face, and the direction vector for\n\t// sampling a textureCube (not generally normalized ).\n\n\tfloat getFace( vec3 direction ) {\n\n\t\tvec3 absDirection = abs( direction );\n\n\t\tfloat face = - 1.0;\n\n\t\tif ( absDirection.x > absDirection.z ) {\n\n\t\t\tif ( absDirection.x > absDirection.y )\n\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\n\t\t\telse\n\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\n\t\t} else {\n\n\t\t\tif ( absDirection.z > absDirection.y )\n\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\n\t\t\telse\n\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\n\t\t}\n\n\t\treturn face;\n\n\t}\n\n\t// RH coordinate system; PMREM face-indexing convention\n\tvec2 getUV( vec3 direction, float face ) {\n\n\t\tvec2 uv;\n\n\t\tif ( face == 0.0 ) {\n\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x\n\n\t\t} else if ( face == 1.0 ) {\n\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y\n\n\t\t} else if ( face == 2.0 ) {\n\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z\n\n\t\t} else if ( face == 3.0 ) {\n\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x\n\n\t\t} else if ( face == 4.0 ) {\n\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y\n\n\t\t} else {\n\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z\n\n\t\t}\n\n\t\treturn 0.5 * ( uv + 1.0 );\n\n\t}\n\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\n\t\tfloat face = getFace( direction );\n\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\n\t\tfloat faceSize = exp2( mipInt );\n\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\n\t\tvec2 f = fract( uv );\n\n\t\tuv += 0.5 - f;\n\n\t\tif ( face > 2.0 ) {\n\n\t\t\tuv.y += faceSize;\n\n\t\t\tface -= 3.0;\n\n\t\t}\n\n\t\tuv.x += face * faceSize;\n\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\n\t\t}\n\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\n\t\tuv *= texelSize;\n\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\n\t\tuv.x += texelSize;\n\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\n\t\tuv.y += texelSize;\n\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\n\t\tuv.x -= texelSize;\n\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\n\t\tvec3 tm = mix( tl, tr, f.x );\n\n\t\tvec3 bm = mix( bl, br, f.x );\n\n\t\treturn mix( tm, bm, f.y );\n\n\t}\n\n\t// These defines must match with PMREMGenerator\n\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\n\tfloat roughnessToMip( float roughness ) {\n\n\t\tfloat mip = 0.0;\n\n\t\tif ( roughness >= r1 ) {\n\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\n\t\t} else if ( roughness >= r4 ) {\n\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\n\t\t} else if ( roughness >= r5 ) {\n\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\n\t\t} else if ( roughness >= r6 ) {\n\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\n\t\t} else {\n\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25\n\t\t}\n\n\t\treturn mip;\n\n\t}\n\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\n\t\tfloat mipF = fract( mip );\n\n\t\tfloat mipInt = floor( mip );\n\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\n\t\tif ( mipF == 0.0 ) {\n\n\t\t\treturn vec4( color0, 1.0 );\n\n\t\t} else {\n\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\n\t\t}\n\n\t}\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/defaultnormal_vertex.glsl.js
/* harmony default export */ const defaultnormal_vertex_glsl = (/* glsl */"\nvec3 transformedNormal = objectNormal;\n\n#ifdef USE_INSTANCING\n\n\t// this is in lieu of a per-instance normal-matrix\n\t// shear transforms in the instance matrix are not supported\n\n\tmat3 m = mat3( instanceMatrix );\n\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\n\ttransformedNormal = m * transformedNormal;\n\n#endif\n\ntransformedNormal = normalMatrix * transformedNormal;\n\n#ifdef FLIP_SIDED\n\n\ttransformedNormal = - transformedNormal;\n\n#endif\n\n#ifdef USE_TANGENT\n\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\n\t#ifdef FLIP_SIDED\n\n\t\ttransformedTangent = - transformedTangent;\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/displacementmap_pars_vertex.glsl.js
/* harmony default export */ const displacementmap_pars_vertex_glsl = (/* glsl */"\n#ifdef USE_DISPLACEMENTMAP\n\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/displacementmap_vertex.glsl.js
/* harmony default export */ const displacementmap_vertex_glsl = (/* glsl */"\n#ifdef USE_DISPLACEMENTMAP\n\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/emissivemap_fragment.glsl.js
/* harmony default export */ const emissivemap_fragment_glsl = (/* glsl */"\n#ifdef USE_EMISSIVEMAP\n\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/emissivemap_pars_fragment.glsl.js
/* harmony default export */ const emissivemap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_EMISSIVEMAP\n\n\tuniform sampler2D emissiveMap;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/encodings_fragment.glsl.js
/* harmony default export */ const encodings_fragment_glsl = (/* glsl */"\ngl_FragColor = linearToOutputTexel( gl_FragColor );\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/encodings_pars_fragment.glsl.js
/* harmony default export */ const encodings_pars_fragment_glsl = (/* glsl */"\n// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/\n\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\n\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\n\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\n\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\n\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\n\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\n\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n\t// return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\n\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\n\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\t// NOTE: The implementation with min causes the shader to not compile on\n\t// a common Alcatel A502DL in Chrome 78/Android 8.1. Some research suggests \n\t// that the chipset is Mediatek MT6739 w/ IMG PowerVR GE8100 GPU.\n\t// D = min( floor( D ) / 255.0, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\n\n// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html\n\n// M matrix, for encoding\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\n\n// Inverse M matrix, for decoding\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/envmap_fragment.glsl.js
/* harmony default export */ const envmap_fragment_glsl = (/* glsl */"\n#ifdef USE_ENVMAP\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvec3 cameraToFrag;\n\n\t\tif ( isOrthographic ) {\n\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\n\t\t} else {\n\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\n\t\t}\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\n\t#else\n\n\t\tvec4 envColor = vec4( 0.0 );\n\n\t#endif\n\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\n\t\tenvColor = envMapTexelToLinear( envColor );\n\n\t#endif\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/envmap_common_pars_fragment.glsl.js
/* harmony default export */ const envmap_common_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_ENVMAP\n\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/envmap_pars_fragment.glsl.js
/* harmony default export */ const envmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_ENVMAP\n\n\tuniform float reflectivity;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/envmap_pars_vertex.glsl.js
/* harmony default export */ const envmap_pars_vertex_glsl = (/* glsl */"\n#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/envmap_vertex.glsl.js
/* harmony default export */ const envmap_vertex_glsl = (/* glsl */"\n#ifdef USE_ENVMAP\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvWorldPosition = worldPosition.xyz;\n\n\t#else\n\n\t\tvec3 cameraToVertex;\n\n\t\tif ( isOrthographic ) {\n\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\n\t\t} else {\n\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t\t}\n\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/fog_vertex.glsl.js
/* harmony default export */ const fog_vertex_glsl = (/* glsl */"\n#ifdef USE_FOG\n\n\tfogDepth = - mvPosition.z;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/fog_pars_vertex.glsl.js
/* harmony default export */ const fog_pars_vertex_glsl = (/* glsl */"\n#ifdef USE_FOG\n\n\tvarying float fogDepth;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/fog_fragment.glsl.js
/* harmony default export */ const fog_fragment_glsl = (/* glsl */"\n#ifdef USE_FOG\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\n\t#endif\n\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/fog_pars_fragment.glsl.js
/* harmony default export */ const fog_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/gradientmap_pars_fragment.glsl.js
/* harmony default export */ const gradientmap_pars_fragment_glsl = (/* glsl */"\n\n#ifdef USE_GRADIENTMAP\n\n\tuniform sampler2D gradientMap;\n\n#endif\n\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\n\t// dotNL will be from -1.0 to 1.0\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\n\t#ifdef USE_GRADIENTMAP\n\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\n\t#else\n\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\n\t#endif\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lightmap_fragment.glsl.js
/* harmony default export */ const lightmap_fragment_glsl = (/* glsl */"\n#ifdef USE_LIGHTMAP\n\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity; // factor of PI should not be present; included here to prevent breakage\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lightmap_pars_fragment.glsl.js
/* harmony default export */ const lightmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_LIGHTMAP\n\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_lambert_vertex.glsl.js
/* harmony default export */ const lights_lambert_vertex_glsl = (/* glsl */"\nvec3 diffuse = vec3( 1.0 );\n\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\n\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\n\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\n\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\n\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n\n#ifdef DOUBLE_SIDED\n\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n\n#endif\n\n#if NUM_POINT_LIGHTS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if NUM_SPOT_LIGHTS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n/*\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n\t\t// TODO (abelnation): implement\n\n\t}\n\n#endif\n*/\n\n#if NUM_DIR_LIGHTS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if NUM_HEMI_LIGHTS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\n\t\t#endif\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_pars_begin.glsl.js
/* harmony default export */ const lights_pars_begin_glsl = (/* glsl */"\nuniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\n\n// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere\n// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\n\t// normal is assumed to have unit length\n\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\n\t// band 0\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\n\t// band 1\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\n\t// band 2\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\n\treturn result;\n\n}\n\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\n\treturn irradiance;\n\n}\n\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\n\tvec3 irradiance = ambientLightColor;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI;\n\n\t#endif\n\n\treturn irradiance;\n\n}\n\n#if NUM_DIR_LIGHTS > 0\n\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\n\t}\n\n#endif\n\n\n#if NUM_POINT_LIGHTS > 0\n\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\n\t// directLight is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\n\t}\n\n#endif\n\n\n#if NUM_SPOT_LIGHTS > 0\n\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\n\t// directLight is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\n\t\tif ( angleCos > spotLight.coneCos ) {\n\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\n\t\t} else {\n\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\n\t\t}\n\t}\n\n#endif\n\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\n\t// Pre-computed values of LinearTransformedCosine approximation of BRDF\n\t// BRDF approximation Texture is 64x64\n\tuniform sampler2D ltc_1; // RGBA Float\n\tuniform sampler2D ltc_2; // RGBA Float\n\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n\n#endif\n\n\n#if NUM_HEMI_LIGHTS > 0\n\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\t\tirradiance *= PI;\n\n\t\t#endif\n\n\t\treturn irradiance;\n\n\t}\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/envmap_physical_pars_fragment.glsl.js
/* harmony default export */ const envmap_physical_pars_fragment_glsl = (/* glsl */"\n#if defined( USE_ENVMAP )\n\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\n\tvec3 getLightProbeIndirectIrradiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in int maxMIPLevel ) {\n\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\n\t\t\t// TODO: replace with properly filtered cubemaps and access the irradiance LOD level, be it the last LOD level\n\t\t\t// of a specular cubemap, or just the default level of a specially created irradiance cubemap.\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\n\t\t\t#else\n\n\t\t\t\t// force the bias high to get the last LOD level as it is the most blurred.\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\n\t\t#else\n\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\n\t\t#endif\n\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\n\t}\n\n\t// Trowbridge-Reitz distribution to Mip level, following the logic of http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\n\t\t// clamp to allowable LOD ranges.\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\n\t}\n\n\tvec3 getLightProbeIndirectRadiance( /*const in SpecularLightProbe specularLightProbe,*/ const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( -viewDir, normal );\n\n\t\t\t// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\n\t\t#endif\n\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\n\t\t\t#else\n\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\n\t\t#endif\n\n\t\treturn envMapColor.rgb * envMapIntensity;\n\n\t}\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_toon_fragment.glsl.js
/* harmony default export */ const lights_toon_fragment_glsl = (/* glsl */"\nToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_toon_pars_fragment.glsl.js
/* harmony default export */ const lights_toon_pars_fragment_glsl = (/* glsl */"\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n\nstruct ToonMaterial {\n\n\tvec3 diffuseColor;\n\n};\n\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI; // punctual light\n\n\t#endif\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n\n#define Material_LightProbeLOD( material )\t(0)\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_phong_fragment.glsl.js
/* harmony default export */ const lights_phong_fragment_glsl = (/* glsl */"\nBlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_phong_pars_fragment.glsl.js
/* harmony default export */ const lights_phong_pars_fragment_glsl = (/* glsl */"\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n\nstruct BlinnPhongMaterial {\n\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n\n};\n\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI; // punctual light\n\n\t#endif\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n\n}\n\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n\n#define Material_LightProbeLOD( material )\t(0)\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_physical_fragment.glsl.js
/* harmony default export */ const lights_physical_fragment_glsl = (/* glsl */"\nPhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\n\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\n\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.\nmaterial.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n\n#ifdef REFLECTIVITY\n\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\n#else\n\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n\n#endif\n\n#ifdef CLEARCOAT\n\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\n\t#ifdef USE_CLEARCOATMAP\n\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\n\t#endif\n\n\tmaterial.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model\n\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n\n#endif\n\n#ifdef USE_SHEEN\n\n\tmaterial.sheenColor = sheen;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_physical_pars_fragment.glsl.js
/* harmony default export */ const lights_physical_pars_fragment_glsl = (/* glsl */"\nstruct PhysicalMaterial {\n\n\tvec3 diffuseColor;\n\tfloat specularRoughness;\n\tvec3 specularColor;\n\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n\n};\n\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\n\n// Clear coat directional hemishperical reflectance (this approximation should be improved)\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n\n}\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction\n\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\n\t\t// LTC Fresnel Approximation by Stephen Hill\n\t\t// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\n\t}\n\n#endif\n\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\n\tvec3 irradiance = dotNL * directLight.color;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI; // punctual light\n\n\t#endif\n\n\t#ifdef CLEARCOAT\n\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\t\tccIrradiance *= PI; // punctual light\n\n\t\t#endif\n\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\n\t#else\n\n\t\tfloat clearcoatDHR = 0.0;\n\n\t#endif\n\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\n\t#ifdef CLEARCOAT\n\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\n\t#else\n\n\t\tfloat clearcoatDHR = 0.0;\n\n\t#endif\n\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\n\t// Both indirect specular and indirect diffuse light accumulate here\n\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n\n// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_fragment_begin.glsl.js
/* harmony default export */ const lights_fragment_begin_glsl = (/* glsl */"\n/**\n * This is a template that can be used to light a material, it uses pluggable\n * RenderEquations (RE)for specific lighting scenarios.\n *\n * Instructions for use:\n * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined\n * - If you have defined an RE_IndirectSpecular, you need to also provide a Material_LightProbeLOD. <---- ???\n * - Create a material parameter that is to be passed as the third parameter to your lighting functions.\n *\n * TODO:\n * - Add area light support.\n * - Add sphere light support.\n * - Add diffuse light probe (irradiance cubemap) support.\n */\n\nGeometricContext geometry;\n\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n#ifdef CLEARCOAT\n\n\tgeometry.clearcoatNormal = clearcoatNormal;\n\n#endif\n\nIncidentLight directLight;\n\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tpointLight = pointLights[ i ];\n\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tspotLight = spotLights[ i ];\n\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tdirectionalLight = directionalLights[ i ];\n\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n\tRectAreaLight rectAreaLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if defined( RE_IndirectDiffuse )\n\n\tvec3 iblIrradiance = vec3( 0.0 );\n\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t#endif\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_fragment_maps.glsl.js
/* harmony default export */ const lights_fragment_maps_glsl = (/* glsl */"\n#if defined( RE_IndirectDiffuse )\n\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\t\tlightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage\n\n\t\t#endif\n\n\t\tirradiance += lightMapIrradiance;\n\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( /*lightProbe,*/ geometry, maxMipLevel );\n\n\t#endif\n\n#endif\n\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\n\tradiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\n\t#ifdef CLEARCOAT\n\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/lights_fragment_end.glsl.js
/* harmony default export */ const lights_fragment_end_glsl = (/* glsl */"\n#if defined( RE_IndirectDiffuse )\n\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/logdepthbuf_fragment.glsl.js
/* harmony default export */ const logdepthbuf_fragment_glsl = (/* glsl */"\n#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\t// Doing a strict comparison with == 1.0 can cause noise artifacts\n\t// on some platforms. See issue #17623.\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/logdepthbuf_pars_fragment.glsl.js
/* harmony default export */ const logdepthbuf_pars_fragment_glsl = (/* glsl */"\n#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/logdepthbuf_pars_vertex.glsl.js
/* harmony default export */ const logdepthbuf_pars_vertex_glsl = (/* glsl */"\n#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\n\t#else\n\n\t\tuniform float logDepthBufFC;\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/logdepthbuf_vertex.glsl.js
/* harmony default export */ const logdepthbuf_vertex_glsl = (/* glsl */"\n#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\n\t#else\n\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\n\t\t\tgl_Position.z *= gl_Position.w;\n\n\t\t}\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/map_fragment.glsl.js
/* harmony default export */ const map_fragment_glsl = (/* glsl */"\n#ifdef USE_MAP\n\n\tvec4 texelColor = texture2D( map, vUv );\n\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/map_pars_fragment.glsl.js
/* harmony default export */ const map_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/map_particle_fragment.glsl.js
/* harmony default export */ const map_particle_fragment_glsl = (/* glsl */"\n#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\n#endif\n\n#ifdef USE_MAP\n\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/map_particle_pars_fragment.glsl.js
/* harmony default export */ const map_particle_pars_fragment_glsl = (/* glsl */"\n#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\tuniform mat3 uvTransform;\n\n#endif\n\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/metalnessmap_fragment.glsl.js
/* harmony default export */ const metalnessmap_fragment_glsl = (/* glsl */"\nfloat metalnessFactor = metalness;\n\n#ifdef USE_METALNESSMAP\n\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\n\t// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tmetalnessFactor *= texelMetalness.b;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/metalnessmap_pars_fragment.glsl.js
/* harmony default export */ const metalnessmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_METALNESSMAP\n\n\tuniform sampler2D metalnessMap;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/morphnormal_vertex.glsl.js
/* harmony default export */ const morphnormal_vertex_glsl = (/* glsl */"\n#ifdef USE_MORPHNORMALS\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/morphtarget_pars_vertex.glsl.js
/* harmony default export */ const morphtarget_pars_vertex_glsl = (/* glsl */"\n#ifdef USE_MORPHTARGETS\n\n\tuniform float morphTargetBaseInfluence;\n\n\t#ifndef USE_MORPHNORMALS\n\n\t\tuniform float morphTargetInfluences[ 8 ];\n\n\t#else\n\n\t\tuniform float morphTargetInfluences[ 4 ];\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/morphtarget_vertex.glsl.js
/* harmony default export */ const morphtarget_vertex_glsl = (/* glsl */"\n#ifdef USE_MORPHTARGETS\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\n\t#ifndef USE_MORPHNORMALS\n\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/normal_fragment_begin.glsl.js
/* harmony default export */ const normal_fragment_begin_glsl = (/* glsl */"\nfloat faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n\n#ifdef FLAT_SHADED\n\n\t// Workaround for Adreno GPUs not able to do dFdx( vViewPosition )\n\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#else\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * faceDirection;\n\n\t#endif\n\n\t#ifdef USE_TANGENT\n\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\n\t\t#endif\n\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\n\t\t#endif\n\n\t#endif\n\n#endif\n\n// non perturbed normal for clearcoat among others\n\nvec3 geometryNormal = normal;\n\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/normal_fragment_maps.glsl.js
/* harmony default export */ const normal_fragment_maps_glsl = (/* glsl */"\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n\t#ifdef FLIP_SIDED\n\n\t\tnormal = - normal;\n\n\t#endif\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * faceDirection;\n\n\t#endif\n\n\tnormal = normalize( normalMatrix * normal );\n\n#elif defined( TANGENTSPACE_NORMALMAP )\n\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\n\t#ifdef USE_TANGENT\n\n\t\tnormal = normalize( vTBN * mapN );\n\n\t#else\n\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );\n\n\t#endif\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/normalmap_pars_fragment.glsl.js
/* harmony default export */ const normalmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n#endif\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n\tuniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\n\t// Normal Mapping Without Precomputed Tangents\n\t// http://www.thetenthplanet.de/archives/1180\n\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\n\t\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\n\t\tvec3 N = surf_norm; // normalized\n\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\n\t}\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/clearcoat_normal_fragment_begin.glsl.js
/* harmony default export */ const clearcoat_normal_fragment_begin_glsl = (/* glsl */"\n#ifdef CLEARCOAT\n\n\tvec3 clearcoatNormal = geometryNormal;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/clearcoat_normal_fragment_maps.glsl.js
/* harmony default export */ const clearcoat_normal_fragment_maps_glsl = (/* glsl */"\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\n\t#ifdef USE_TANGENT\n\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\n\t#else\n\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/clearcoat_pars_fragment.glsl.js
/* harmony default export */ const clearcoat_pars_fragment_glsl = (/* glsl */"\n\n#ifdef USE_CLEARCOATMAP\n\n\tuniform sampler2D clearcoatMap;\n\n#endif\n\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tuniform sampler2D clearcoatRoughnessMap;\n\n#endif\n\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/packing.glsl.js
/* harmony default export */ const packing_glsl = (/* glsl */"\nvec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\n\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\n\nconst float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)\nconst float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)\n\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n\nconst float ShiftRight8 = 1. / 256.;\n\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8; // tidy overflow\n\treturn r * PackUpscale;\n}\n\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\n\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\n\n// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions\n\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\n\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/premultiplied_alpha_fragment.glsl.js
/* harmony default export */ const premultiplied_alpha_fragment_glsl = (/* glsl */"\n#ifdef PREMULTIPLIED_ALPHA\n\n\t// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.\n\tgl_FragColor.rgb *= gl_FragColor.a;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/project_vertex.glsl.js
/* harmony default export */ const project_vertex_glsl = (/* glsl */"\nvec4 mvPosition = vec4( transformed, 1.0 );\n\n#ifdef USE_INSTANCING\n\n\tmvPosition = instanceMatrix * mvPosition;\n\n#endif\n\nmvPosition = modelViewMatrix * mvPosition;\n\ngl_Position = projectionMatrix * mvPosition;\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/dithering_fragment.glsl.js
/* harmony default export */ const dithering_fragment_glsl = (/* glsl */"\n#ifdef DITHERING\n\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/dithering_pars_fragment.glsl.js
/* harmony default export */ const dithering_pars_fragment_glsl = (/* glsl */"\n#ifdef DITHERING\n\n\t// based on https://www.shadertoy.com/view/MslGR8\n\tvec3 dithering( vec3 color ) {\n\t\t//Calculate grid position\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\n\t\t//Shift the individual colors differently, thus making it even harder to see the dithering pattern\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\n\t\t//modify shift acording to grid position.\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\n\t\t//shift the color by dither_shift\n\t\treturn color + dither_shift_RGB;\n\t}\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/roughnessmap_fragment.glsl.js
/* harmony default export */ const roughnessmap_fragment_glsl = (/* glsl */"\nfloat roughnessFactor = roughness;\n\n#ifdef USE_ROUGHNESSMAP\n\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\n\t// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\troughnessFactor *= texelRoughness.g;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/roughnessmap_pars_fragment.glsl.js
/* harmony default export */ const roughnessmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_ROUGHNESSMAP\n\n\tuniform sampler2D roughnessMap;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/shadowmap_pars_fragment.glsl.js
/* harmony default export */ const shadowmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): create uniforms for area light shadows\n\n\t#endif\n\t*/\n\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\n\t}\n\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\n\t}\n\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\n\t\tfloat occlusion = 1.0;\n\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\n\t\tfloat hard_shadow = step( compare , distribution.x ); // Hard Shadow\n\n\t\tif (hard_shadow != 1.0 ) {\n\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality\n\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed\n\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\n\t\t}\n\t\treturn occlusion;\n\n\t}\n\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\n\t\tfloat shadow = 1.0;\n\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\n\t\t// if ( something && something ) breaks ATI OpenGL shader compiler\n\t\t// if ( all( something, something ) ) using this instead\n\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n\t\tbool frustumTest = all( frustumTestVec );\n\n\t\tif ( frustumTest ) {\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#else // no percentage-closer filtering:\n\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#endif\n\n\t\t}\n\n\t\treturn shadow;\n\n\t}\n\n\t// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D\n\t// vector suitable for 2D texture mapping. This code uses the following layout for the\n\t// 2D texture:\n\t//\n\t// xzXZ\n\t//  y Y\n\t//\n\t// Y - Positive y direction\n\t// y - Negative y direction\n\t// X - Positive x direction\n\t// x - Negative x direction\n\t// Z - Positive z direction\n\t// z - Negative z direction\n\t//\n\t// Source and test bed:\n\t// https://gist.github.com/tschw/da10c43c467ce8afd0c4\n\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\n\t\t// Number of texels to avoid at the edge of each square\n\n\t\tvec3 absV = abs( v );\n\n\t\t// Intersect unit cube\n\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\n\t\t// Apply scale to avoid seams\n\n\t\t// two texels less per square (one texel will do for NEAREST)\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\n\t\t// Unwrap\n\n\t\t// space: -1 ... 1 range for each square\n\t\t//\n\t\t// #X##\t\tdim    := ( 4 , 2 )\n\t\t//  # #\t\tcenter := ( 1 , 1 )\n\n\t\tvec2 planar = v.xy;\n\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\n\t\tif ( absV.z >= almostOne ) {\n\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\n\t\t} else if ( absV.x >= almostOne ) {\n\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\n\t\t} else if ( absV.y >= almostOne ) {\n\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\n\t\t}\n\n\t\t// Transform to UV space\n\n\t\t// scale := 0.5 / dim\n\t\t// translate := ( center + 0.5 ) / dim\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\n\t}\n\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\n\t\t// for point lights, the uniform @vShadowCoord is re-purposed to hold\n\t\t// the vector from the light to the world-space position of the fragment.\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\n\t\t// dp = normalized distance from light to fragment position\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?\n\t\tdp += shadowBias;\n\n\t\t// bd3D = base direction 3D\n\t\tvec3 bd3D = normalize( lightToPosition );\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#else // no percentage-closer filtering\n\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\n\t\t#endif\n\n\t}\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/shadowmap_pars_vertex.glsl.js
/* harmony default export */ const shadowmap_pars_vertex_glsl = (/* glsl */"\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): uniforms for area light shadows\n\n\t#endif\n\t*/\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/shadowmap_vertex.glsl.js
/* harmony default export */ const shadowmap_vertex_glsl = (/* glsl */"\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\t// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\n\t#endif\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update vAreaShadowCoord with area light info\n\n\t#endif\n\t*/\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/shadowmask_pars_fragment.glsl.js
/* harmony default export */ const shadowmask_pars_fragment_glsl = (/* glsl */"\nfloat getShadowMask() {\n\n\tfloat shadow = 1.0;\n\n\t#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\tDirectionalLightShadow directionalLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\tSpotLightShadow spotLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\tPointLightShadow pointLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update shadow for Area light\n\n\t#endif\n\t*/\n\n\t#endif\n\n\treturn shadow;\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/skinbase_vertex.glsl.js
/* harmony default export */ const skinbase_vertex_glsl = (/* glsl */"\n#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/skinning_pars_vertex.glsl.js
/* harmony default export */ const skinning_pars_vertex_glsl = (/* glsl */"\n#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\t#ifdef BONE_TEXTURE\n\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\n\t\t\ty = dy * ( y + 0.5 );\n\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\n\t\t\treturn bone;\n\n\t\t}\n\n\t#else\n\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\n\t\t}\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/skinning_vertex.glsl.js
/* harmony default export */ const skinning_vertex_glsl = (/* glsl */"\n#ifdef USE_SKINNING\n\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/skinnormal_vertex.glsl.js
/* harmony default export */ const skinnormal_vertex_glsl = (/* glsl */"\n#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\n\t#ifdef USE_TANGENT\n\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\n\t#endif\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/specularmap_fragment.glsl.js
/* harmony default export */ const specularmap_fragment_glsl = (/* glsl */"\nfloat specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/specularmap_pars_fragment.glsl.js
/* harmony default export */ const specularmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/tonemapping_fragment.glsl.js
/* harmony default export */ const tonemapping_fragment_glsl = (/* glsl */"\n#if defined( TONE_MAPPING )\n\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/tonemapping_pars_fragment.glsl.js
/* harmony default export */ const tonemapping_pars_fragment_glsl = (/* glsl */"\n#ifndef saturate\n// <common> may have defined saturate() already\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n\nuniform float toneMappingExposure;\n\n// exposure only\nvec3 LinearToneMapping( vec3 color ) {\n\n\treturn toneMappingExposure * color;\n\n}\n\n// source: https://www.cs.utah.edu/~reinhard/cdrom/\nvec3 ReinhardToneMapping( vec3 color ) {\n\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n\n}\n\n// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\n\t// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n\n}\n\n// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs\nvec3 RRTAndODTFit( vec3 v ) {\n\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n\n}\n\n// this implementation of ACES is modified to accommodate a brighter viewing environment.\n// the scale factor of 1/0.6 is subjective. see discussion in #19621.\n\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\n\t// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ), // transposed from source\n\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\n\t// ODT_SAT => XYZ => D60_2_D65 => sRGB\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ), // transposed from source\n\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\n\tcolor *= toneMappingExposure / 0.6;\n\n\tcolor = ACESInputMat * color;\n\n\t// Apply RRT and ODT\n\tcolor = RRTAndODTFit( color );\n\n\tcolor = ACESOutputMat * color;\n\n\t// Clamp to [0, 1]\n\treturn saturate( color );\n\n}\n\nvec3 CustomToneMapping( vec3 color ) { return color; }\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/transmissionmap_fragment.glsl.js
/* harmony default export */ const transmissionmap_fragment_glsl = (/* glsl */"\n#ifdef USE_TRANSMISSIONMAP\n\n\ttotalTransmission *= texture2D( transmissionMap, vUv ).r;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/transmissionmap_pars_fragment.glsl.js
/* harmony default export */ const transmissionmap_pars_fragment_glsl = (/* glsl */"\n#ifdef USE_TRANSMISSIONMAP\n\n\tuniform sampler2D transmissionMap;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/uv_pars_fragment.glsl.js
/* harmony default export */ const uv_pars_fragment_glsl = (/* glsl */"\n#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\n\tvarying vec2 vUv;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/uv_pars_vertex.glsl.js
/* harmony default export */ const uv_pars_vertex_glsl = (/* glsl */"\n#ifdef USE_UV\n\n\t#ifdef UVS_VERTEX_ONLY\n\n\t\tvec2 vUv;\n\n\t#else\n\n\t\tvarying vec2 vUv;\n\n\t#endif\n\n\tuniform mat3 uvTransform;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/uv_vertex.glsl.js
/* harmony default export */ const uv_vertex_glsl = (/* glsl */"\n#ifdef USE_UV\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/uv2_pars_fragment.glsl.js
/* harmony default export */ const uv2_pars_fragment_glsl = (/* glsl */"\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tvarying vec2 vUv2;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/uv2_pars_vertex.glsl.js
/* harmony default export */ const uv2_pars_vertex_glsl = (/* glsl */"\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\n\tuniform mat3 uv2Transform;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/uv2_vertex.glsl.js
/* harmony default export */ const uv2_vertex_glsl = (/* glsl */"\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderChunk/worldpos_vertex.glsl.js
/* harmony default export */ const worldpos_vertex_glsl = (/* glsl */"\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\n\t#ifdef USE_INSTANCING\n\n\t\tworldPosition = instanceMatrix * worldPosition;\n\n\t#endif\n\n\tworldPosition = modelMatrix * worldPosition;\n\n#endif\n");
;// ./src/webgl-renderer/shaders/ShaderLib/background_frag.glsl.js
/* harmony default export */ const background_frag_glsl = (/* glsl */"\nuniform sampler2D t2D;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tvec4 texColor = texture2D( t2D, vUv );\n\n\tgl_FragColor = mapTexelToLinear( texColor );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/background_vert.glsl.js
/* harmony default export */ const background_vert_glsl = (/* glsl */"\nvarying vec2 vUv;\nuniform mat3 uvTransform;\n\nvoid main() {\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/cube_frag.glsl.js
/* harmony default export */ const cube_frag_glsl = (/* glsl */"\n#include <envmap_common_pars_fragment>\nuniform float opacity;\n\nvarying vec3 vWorldDirection;\n\n#include <cube_uv_reflection_fragment>\n\nvoid main() {\n\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/cube_vert.glsl.js
/* harmony default export */ const cube_vert_glsl = (/* glsl */"\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\tgl_Position.z = gl_Position.w; // set z to camera.far\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/depth_frag.glsl.js
/* harmony default export */ const depth_frag_glsl = (/* glsl */"\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\t// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\n\t#endif\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/depth_vert.glsl.js
/* harmony default export */ const depth_vert_glsl = (/* glsl */"\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.\n// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for\n// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvHighPrecisionZW = gl_Position.zw;\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/distanceRGBA_frag.glsl.js
/* harmony default export */ const distanceRGBA_frag_glsl = (/* glsl */"\n#define DISTANCE\n\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main () {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist ); // clamp to [ 0, 1 ]\n\n\tgl_FragColor = packDepthToRGBA( dist );\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/distanceRGBA_vert.glsl.js
/* harmony default export */ const distanceRGBA_vert_glsl = (/* glsl */"\n#define DISTANCE\n\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvWorldPosition = worldPosition.xyz;\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/equirect_frag.glsl.js
/* harmony default export */ const equirect_frag_glsl = (/* glsl */"\nuniform sampler2D tEquirect;\n\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvec3 direction = normalize( vWorldDirection );\n\n\tvec2 sampleUV = equirectUv( direction );\n\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\n\tgl_FragColor = mapTexelToLinear( texColor );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/equirect_vert.glsl.js
/* harmony default export */ const equirect_vert_glsl = (/* glsl */"\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/linedashed_frag.glsl.js
/* harmony default export */ const linedashed_frag_glsl = (/* glsl */"\nuniform vec3 diffuse;\nuniform float opacity;\n\nuniform float dashSize;\nuniform float totalSize;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\n\t\tdiscard;\n\n\t}\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\n\toutgoingLight = diffuseColor.rgb; // simple shader\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/linedashed_vert.glsl.js
/* harmony default export */ const linedashed_vert_glsl = (/* glsl */"\nuniform float scale;\nattribute float lineDistance;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\tvLineDistance = scale * lineDistance;\n\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshbasic_frag.glsl.js
/* harmony default export */ const meshbasic_frag_glsl = (/* glsl */"\nuniform vec3 diffuse;\nuniform float opacity;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n\t// accumulation (baked indirect lighting only)\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\n\t#endif\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshbasic_vert.glsl.js
/* harmony default export */ const meshbasic_vert_glsl = (/* glsl */"\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_ENVMAP\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshlambert_frag.glsl.js
/* harmony default export */ const meshlambert_frag_glsl = (/* glsl */"\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\n\t#ifdef DOUBLE_SIDED\n\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\n\t#endif\n\n\t#include <lightmap_fragment>\n\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\n\t#else\n\n\t\treflectedLight.directDiffuse = vLightFront;\n\n\t#endif\n\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\n\t// modulation\n\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshlambert_vert.glsl.js
/* harmony default export */ const meshlambert_vert_glsl = (/* glsl */"\n#define LAMBERT\n\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshmatcap_frag.glsl.js
/* harmony default export */ const meshmatcap_frag_glsl = (/* glsl */"\n#define MATCAP\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\n\t#ifdef USE_MATCAP\n\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\n\t#else\n\n\t\tvec4 matcapColor = vec4( 1.0 );\n\n\t#endif\n\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshmatcap_vert.glsl.js
/* harmony default export */ const meshmatcap_vert_glsl = (/* glsl */"\n#define MATCAP\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\t\tvNormal = normalize( transformedNormal );\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshtoon_frag.glsl.js
/* harmony default export */ const meshtoon_frag_glsl = (/* glsl */"\n#define TOON\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshtoon_vert.glsl.js
/* harmony default export */ const meshtoon_vert_glsl = (/* glsl */"\n#define TOON\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshphong_frag.glsl.js
/* harmony default export */ const meshphong_frag_glsl = (/* glsl */"\n#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshphong_vert.glsl.js
/* harmony default export */ const meshphong_vert_glsl = (/* glsl */"\n#define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshphysical_frag.glsl.js
/* harmony default export */ const meshphysical_frag_glsl = (/* glsl */"\n#define STANDARD\n\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef TRANSMISSION\n\tuniform float transmission;\n#endif\n\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#ifdef TRANSMISSION\n\t\tfloat totalTransmission = transmission;\n\t#endif\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <transmissionmap_fragment>\n\n\t// accumulation\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\t// this is a stub for the transmission model\n\t#ifdef TRANSMISSION\n\t\tdiffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );\n\t#endif\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/meshphysical_vert.glsl.js
/* harmony default export */ const meshphysical_vert_glsl = (/* glsl */"\n#define STANDARD\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n\t#ifdef USE_TANGENT\n\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\n\t#endif\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/normal_frag.glsl.js
/* harmony default export */ const normal_frag_glsl = (/* glsl */"\n#define NORMAL\n\nuniform float opacity;\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/normal_vert.glsl.js
/* harmony default export */ const normal_vert_glsl = (/* glsl */"\n#define NORMAL\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n\t#ifdef USE_TANGENT\n\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\n\t#endif\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\n\tvViewPosition = - mvPosition.xyz;\n\n#endif\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/points_frag.glsl.js
/* harmony default export */ const points_frag_glsl = (/* glsl */"\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/points_vert.glsl.js
/* harmony default export */ const points_vert_glsl = (/* glsl */"\nuniform float size;\nuniform float scale;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\n\tgl_PointSize = size;\n\n\t#ifdef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\n\t#endif\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/shadow_frag.glsl.js
/* harmony default export */ const shadow_frag_glsl = (/* glsl */"\nuniform vec3 color;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n\nvoid main() {\n\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/shadow_vert.glsl.js
/* harmony default export */ const shadow_vert_glsl = (/* glsl */"\n#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n\nvoid main() {\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/sprite_frag.glsl.js
/* harmony default export */ const sprite_frag_glsl = (/* glsl */"\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderLib/sprite_vert.glsl.js
/* harmony default export */ const sprite_vert_glsl = (/* glsl */"\nuniform float rotation;\nuniform vec2 center;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\n\t#ifndef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\n\t#endif\n\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\n\tmvPosition.xy += rotatedPosition;\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n");
;// ./src/webgl-renderer/shaders/ShaderChunk.js

































































































































var ShaderChunk = {
  alphamap_fragment: alphamap_fragment_glsl,
  alphamap_pars_fragment: alphamap_pars_fragment_glsl,
  alphatest_fragment: alphatest_fragment_glsl,
  aomap_fragment: aomap_fragment_glsl,
  aomap_pars_fragment: aomap_pars_fragment_glsl,
  begin_vertex: begin_vertex_glsl,
  beginnormal_vertex: beginnormal_vertex_glsl,
  bsdfs: bsdfs_glsl,
  bumpmap_pars_fragment: bumpmap_pars_fragment_glsl,
  clipping_planes_fragment: clipping_planes_fragment_glsl,
  clipping_planes_pars_fragment: clipping_planes_pars_fragment_glsl,
  clipping_planes_pars_vertex: clipping_planes_pars_vertex_glsl,
  clipping_planes_vertex: clipping_planes_vertex_glsl,
  color_fragment: color_fragment_glsl,
  color_pars_fragment: color_pars_fragment_glsl,
  color_pars_vertex: color_pars_vertex_glsl,
  color_vertex: color_vertex_glsl,
  common: common_glsl,
  cube_uv_reflection_fragment: cube_uv_reflection_fragment_glsl,
  defaultnormal_vertex: defaultnormal_vertex_glsl,
  displacementmap_pars_vertex: displacementmap_pars_vertex_glsl,
  displacementmap_vertex: displacementmap_vertex_glsl,
  emissivemap_fragment: emissivemap_fragment_glsl,
  emissivemap_pars_fragment: emissivemap_pars_fragment_glsl,
  encodings_fragment: encodings_fragment_glsl,
  encodings_pars_fragment: encodings_pars_fragment_glsl,
  envmap_fragment: envmap_fragment_glsl,
  envmap_common_pars_fragment: envmap_common_pars_fragment_glsl,
  envmap_pars_fragment: envmap_pars_fragment_glsl,
  envmap_pars_vertex: envmap_pars_vertex_glsl,
  envmap_physical_pars_fragment: envmap_physical_pars_fragment_glsl,
  envmap_vertex: envmap_vertex_glsl,
  fog_vertex: fog_vertex_glsl,
  fog_pars_vertex: fog_pars_vertex_glsl,
  fog_fragment: fog_fragment_glsl,
  fog_pars_fragment: fog_pars_fragment_glsl,
  gradientmap_pars_fragment: gradientmap_pars_fragment_glsl,
  lightmap_fragment: lightmap_fragment_glsl,
  lightmap_pars_fragment: lightmap_pars_fragment_glsl,
  lights_lambert_vertex: lights_lambert_vertex_glsl,
  lights_pars_begin: lights_pars_begin_glsl,
  lights_toon_fragment: lights_toon_fragment_glsl,
  lights_toon_pars_fragment: lights_toon_pars_fragment_glsl,
  lights_phong_fragment: lights_phong_fragment_glsl,
  lights_phong_pars_fragment: lights_phong_pars_fragment_glsl,
  lights_physical_fragment: lights_physical_fragment_glsl,
  lights_physical_pars_fragment: lights_physical_pars_fragment_glsl,
  lights_fragment_begin: lights_fragment_begin_glsl,
  lights_fragment_maps: lights_fragment_maps_glsl,
  lights_fragment_end: lights_fragment_end_glsl,
  logdepthbuf_fragment: logdepthbuf_fragment_glsl,
  logdepthbuf_pars_fragment: logdepthbuf_pars_fragment_glsl,
  logdepthbuf_pars_vertex: logdepthbuf_pars_vertex_glsl,
  logdepthbuf_vertex: logdepthbuf_vertex_glsl,
  map_fragment: map_fragment_glsl,
  map_pars_fragment: map_pars_fragment_glsl,
  map_particle_fragment: map_particle_fragment_glsl,
  map_particle_pars_fragment: map_particle_pars_fragment_glsl,
  metalnessmap_fragment: metalnessmap_fragment_glsl,
  metalnessmap_pars_fragment: metalnessmap_pars_fragment_glsl,
  morphnormal_vertex: morphnormal_vertex_glsl,
  morphtarget_pars_vertex: morphtarget_pars_vertex_glsl,
  morphtarget_vertex: morphtarget_vertex_glsl,
  normal_fragment_begin: normal_fragment_begin_glsl,
  normal_fragment_maps: normal_fragment_maps_glsl,
  normalmap_pars_fragment: normalmap_pars_fragment_glsl,
  clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin_glsl,
  clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps_glsl,
  clearcoat_pars_fragment: clearcoat_pars_fragment_glsl,
  packing: packing_glsl,
  premultiplied_alpha_fragment: premultiplied_alpha_fragment_glsl,
  project_vertex: project_vertex_glsl,
  dithering_fragment: dithering_fragment_glsl,
  dithering_pars_fragment: dithering_pars_fragment_glsl,
  roughnessmap_fragment: roughnessmap_fragment_glsl,
  roughnessmap_pars_fragment: roughnessmap_pars_fragment_glsl,
  shadowmap_pars_fragment: shadowmap_pars_fragment_glsl,
  shadowmap_pars_vertex: shadowmap_pars_vertex_glsl,
  shadowmap_vertex: shadowmap_vertex_glsl,
  shadowmask_pars_fragment: shadowmask_pars_fragment_glsl,
  skinbase_vertex: skinbase_vertex_glsl,
  skinning_pars_vertex: skinning_pars_vertex_glsl,
  skinning_vertex: skinning_vertex_glsl,
  skinnormal_vertex: skinnormal_vertex_glsl,
  specularmap_fragment: specularmap_fragment_glsl,
  specularmap_pars_fragment: specularmap_pars_fragment_glsl,
  tonemapping_fragment: tonemapping_fragment_glsl,
  tonemapping_pars_fragment: tonemapping_pars_fragment_glsl,
  transmissionmap_fragment: transmissionmap_fragment_glsl,
  transmissionmap_pars_fragment: transmissionmap_pars_fragment_glsl,
  uv_pars_fragment: uv_pars_fragment_glsl,
  uv_pars_vertex: uv_pars_vertex_glsl,
  uv_vertex: uv_vertex_glsl,
  uv2_pars_fragment: uv2_pars_fragment_glsl,
  uv2_pars_vertex: uv2_pars_vertex_glsl,
  uv2_vertex: uv2_vertex_glsl,
  worldpos_vertex: worldpos_vertex_glsl,
  background_frag: background_frag_glsl,
  background_vert: background_vert_glsl,
  cube_frag: cube_frag_glsl,
  cube_vert: cube_vert_glsl,
  depth_frag: depth_frag_glsl,
  depth_vert: depth_vert_glsl,
  distanceRGBA_frag: distanceRGBA_frag_glsl,
  distanceRGBA_vert: distanceRGBA_vert_glsl,
  equirect_frag: equirect_frag_glsl,
  equirect_vert: equirect_vert_glsl,
  linedashed_frag: linedashed_frag_glsl,
  linedashed_vert: linedashed_vert_glsl,
  meshbasic_frag: meshbasic_frag_glsl,
  meshbasic_vert: meshbasic_vert_glsl,
  meshlambert_frag: meshlambert_frag_glsl,
  meshlambert_vert: meshlambert_vert_glsl,
  meshmatcap_frag: meshmatcap_frag_glsl,
  meshmatcap_vert: meshmatcap_vert_glsl,
  meshtoon_frag: meshtoon_frag_glsl,
  meshtoon_vert: meshtoon_vert_glsl,
  meshphong_frag: meshphong_frag_glsl,
  meshphong_vert: meshphong_vert_glsl,
  meshphysical_frag: meshphysical_frag_glsl,
  meshphysical_vert: meshphysical_vert_glsl,
  normal_frag: normal_frag_glsl,
  normal_vert: normal_vert_glsl,
  points_frag: points_frag_glsl,
  points_vert: points_vert_glsl,
  shadow_frag: shadow_frag_glsl,
  shadow_vert: shadow_vert_glsl,
  sprite_frag: sprite_frag_glsl,
  sprite_vert: sprite_vert_glsl
};
;// ./src/webgl-renderer/Program.js




var programIdCount = 0;
function getEncodingComponents(encoding) {
  switch (encoding) {
    case LinearEncoding:
      return ['Linear', '( value )'];
    case sRGBEncoding:
      return ['sRGB', '( value )'];
    case RGBEEncoding:
      return ['RGBE', '( value )'];
    case RGBM7Encoding:
      return ['RGBM', '( value, 7.0 )'];
    case RGBM16Encoding:
      return ['RGBM', '( value, 16.0 )'];
    case RGBDEncoding:
      return ['RGBD', '( value, 256.0 )'];
    case GammaEncoding:
      return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
    case LogLuvEncoding:
      return ['LogLuv', '( value )'];
    default:
      console.warn('THREE.WebGLProgram: Unsupported encoding:', encoding);
      return ['Linear', '( value )'];
  }
}
function getTexelDecodingFunction(functionName, encoding) {
  var components = getEncodingComponents(encoding);
  return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
}
function getTexelEncodingFunction(functionName, encoding) {
  var components = getEncodingComponents(encoding);
  return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[0] + components[1] + '; }';
}
function getToneMappingFunction(functionName, toneMapping) {
  var toneMappingName;
  switch (toneMapping) {
    case LinearToneMapping:
      toneMappingName = 'Linear';
      break;
    case ReinhardToneMapping:
      toneMappingName = 'Reinhard';
      break;
    case CineonToneMapping:
      toneMappingName = 'OptimizedCineon';
      break;
    case ACESFilmicToneMapping:
      toneMappingName = 'ACESFilmic';
      break;
    case CustomToneMapping:
      toneMappingName = 'Custom';
      break;
    default:
      console.warn('THREE.WebGLProgram: Unsupported toneMapping:', toneMapping);
      toneMappingName = 'Linear';
  }
  return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';
}
function generateExtensions(parameters) {
  var chunks = [parameters.extensionDerivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.tangentSpaceNormalMap || parameters.clearcoatNormalMap || parameters.flatShading || parameters.shaderID === 'physical' ? '#extension GL_OES_standard_derivatives : enable' : '', (parameters.extensionFragDepth || parameters.logarithmicDepthBuffer) && parameters.rendererExtensionFragDepth ? '#extension GL_EXT_frag_depth : enable' : '', parameters.extensionDrawBuffers && parameters.rendererExtensionDrawBuffers ? '#extension GL_EXT_draw_buffers : require' : '', (parameters.extensionShaderTextureLOD || parameters.envMap) && parameters.rendererExtensionShaderTextureLod ? '#extension GL_EXT_shader_texture_lod : enable' : ''];
  return chunks.filter(filterEmptyLine).join('\n');
}
function generateDefines(defines) {
  var chunks = [];
  for (var name in defines) {
    var value = defines[name];
    if (value === false) continue;
    chunks.push('#define ' + name + ' ' + value);
  }
  return chunks.join('\n');
}
function fetchAttributeLocations(gl, program) {
  var attributes = {};
  var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (var i = 0; i < n; i++) {
    var info = gl.getActiveAttrib(program, i);
    var name = info.name;

    // console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

    attributes[name] = gl.getAttribLocation(program, name);
  }
  return attributes;
}
function filterEmptyLine(string) {
  return string !== '';
}
function replaceLightNums(string, parameters) {
  return string.replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights).replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights).replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows);
}
function replaceClippingPlaneNums(string, parameters) {
  return string.replace(/NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, parameters.numClippingPlanes - parameters.numClipIntersection);
}

// Resolve Includes

var includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
function resolveIncludes(string) {
  return string.replace(includePattern, includeReplacer);
}
function includeReplacer(match, include) {
  var string = ShaderChunk[include];
  if (string === undefined) {
    throw new Error('Can not resolve #include <' + include + '>');
  }
  return resolveIncludes(string);
}

// Unroll Loops

var deprecatedUnrollLoopPattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
var unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function unrollLoops(string) {
  return string.replace(unrollLoopPattern, loopReplacer).replace(deprecatedUnrollLoopPattern, deprecatedLoopReplacer);
}
function deprecatedLoopReplacer(match, start, end, snippet) {
  console.warn('WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead.');
  return loopReplacer(match, start, end, snippet);
}
function loopReplacer(match, start, end, snippet) {
  var string = '';
  for (var i = parseInt(start); i < parseInt(end); i++) {
    string += snippet.replace(/\[\s*i\s*\]/g, '[ ' + i + ' ]').replace(/UNROLLED_LOOP_INDEX/g, i);
  }
  return string;
}

//

function generatePrecision(parameters) {
  var precisionstring = 'precision ' + parameters.precision + ' float;\nprecision ' + parameters.precision + ' int;';
  if (parameters.precision === 'highp') {
    precisionstring += '\n#define HIGH_PRECISION';
  } else if (parameters.precision === 'mediump') {
    precisionstring += '\n#define MEDIUM_PRECISION';
  } else if (parameters.precision === 'lowp') {
    precisionstring += '\n#define LOW_PRECISION';
  }
  return precisionstring;
}
function generateShadowMapTypeDefine(parameters) {
  var shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';
  if (parameters.shadowMapType === PCFShadowMap) {
    shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';
  } else if (parameters.shadowMapType === PCFSoftShadowMap) {
    shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';
  } else if (parameters.shadowMapType === VSMShadowMap) {
    shadowMapTypeDefine = 'SHADOWMAP_TYPE_VSM';
  }
  return shadowMapTypeDefine;
}
function generateEnvMapTypeDefine(parameters) {
  var envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
  if (parameters.envMap) {
    switch (parameters.envMapMode) {
      case CubeReflectionMapping:
      case CubeRefractionMapping:
        envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
        break;
      case CubeUVReflectionMapping:
      case CubeUVRefractionMapping:
        envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
        break;
    }
  }
  return envMapTypeDefine;
}
function generateEnvMapModeDefine(parameters) {
  var envMapModeDefine = 'ENVMAP_MODE_REFLECTION';
  if (parameters.envMap) {
    switch (parameters.envMapMode) {
      case CubeRefractionMapping:
      case CubeUVRefractionMapping:
        envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
        break;
    }
  }
  return envMapModeDefine;
}
function generateEnvMapBlendingDefine(parameters) {
  var envMapBlendingDefine = 'ENVMAP_BLENDING_NONE';
  if (parameters.envMap) {
    switch (parameters.combine) {
      case MultiplyOperation:
        envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
        break;
      case MixOperation:
        envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
        break;
      case AddOperation:
        envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
        break;
    }
  }
  return envMapBlendingDefine;
}
function WebGLProgram(renderer, cacheKey, parameters, bindingStates) {
  var gl = renderer.getContext();
  var defines = parameters.defines;
  var vertexShader = parameters.vertexShader;
  var fragmentShader = parameters.fragmentShader;
  var shadowMapTypeDefine = generateShadowMapTypeDefine(parameters);
  var envMapTypeDefine = generateEnvMapTypeDefine(parameters);
  var envMapModeDefine = generateEnvMapModeDefine(parameters);
  var envMapBlendingDefine = generateEnvMapBlendingDefine(parameters);
  var gammaFactorDefine = renderer.gammaFactor > 0 ? renderer.gammaFactor : 1.0;
  var customExtensions = parameters.isWebGL2 ? '' : generateExtensions(parameters);
  var customDefines = generateDefines(defines);
  var prefixVertex, prefixFragment;
  var versionString = parameters.glslVersion ? '#version ' + parameters.glslVersion + '\n' : '';
  if (parameters.isRawShaderMaterial) {
    prefixVertex = [customDefines].filter(filterEmptyLine).join('\n');
    if (prefixVertex.length > 0) {
      prefixVertex += '\n';
    }
    prefixFragment = [customExtensions, customDefines].filter(filterEmptyLine).join('\n');
    if (prefixFragment.length > 0) {
      prefixFragment += '\n';
    }
  } else {
    prefixVertex = [generatePrecision(parameters), '#define SHADER_NAME ' + parameters.shaderName, customDefines, parameters.instancing ? '#define USE_INSTANCING' : '', parameters.instancingColor ? '#define USE_INSTANCING_COLOR' : '', parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '', '#define GAMMA_FACTOR ' + gammaFactorDefine, '#define MAX_BONES ' + parameters.maxBones, parameters.useFog && parameters.fog ? '#define USE_FOG' : '', parameters.useFog && parameters.fogExp2 ? '#define FOG_EXP2' : '', parameters.map ? '#define USE_MAP' : '', parameters.envMap ? '#define USE_ENVMAP' : '', parameters.envMap ? '#define ' + envMapModeDefine : '', parameters.lightMap ? '#define USE_LIGHTMAP' : '', parameters.aoMap ? '#define USE_AOMAP' : '', parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '', parameters.bumpMap ? '#define USE_BUMPMAP' : '', parameters.normalMap ? '#define USE_NORMALMAP' : '', parameters.normalMap && parameters.objectSpaceNormalMap ? '#define OBJECTSPACE_NORMALMAP' : '', parameters.normalMap && parameters.tangentSpaceNormalMap ? '#define TANGENTSPACE_NORMALMAP' : '', parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '', parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '', parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '', parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '', parameters.specularMap ? '#define USE_SPECULARMAP' : '', parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '', parameters.metalnessMap ? '#define USE_METALNESSMAP' : '', parameters.alphaMap ? '#define USE_ALPHAMAP' : '', parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '', parameters.vertexTangents ? '#define USE_TANGENT' : '', parameters.vertexColors ? '#define USE_COLOR' : '', parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '', parameters.vertexUvs ? '#define USE_UV' : '', parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '', parameters.flatShading ? '#define FLAT_SHADED' : '', parameters.skinning ? '#define USE_SKINNING' : '', parameters.useVertexTexture ? '#define BONE_TEXTURE' : '', parameters.morphTargets ? '#define USE_MORPHTARGETS' : '', parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '', parameters.doubleSided ? '#define DOUBLE_SIDED' : '', parameters.flipSided ? '#define FLIP_SIDED' : '', parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '', parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '', parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '', parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '', parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ? '#define USE_LOGDEPTHBUF_EXT' : '', 'uniform mat4 modelMatrix;', 'uniform mat4 modelViewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat3 normalMatrix;', 'uniform vec3 cameraPosition;', 'uniform bool isOrthographic;', '#ifdef USE_INSTANCING', '	attribute mat4 instanceMatrix;', '#endif', '#ifdef USE_INSTANCING_COLOR', '	attribute vec3 instanceColor;', '#endif', 'attribute vec3 position;', 'attribute vec3 normal;', 'attribute vec2 uv;', '#ifdef USE_TANGENT', '	attribute vec4 tangent;', '#endif', '#if defined( USE_COLOR_ALPHA )', '	attribute vec4 color;', '#elif defined( USE_COLOR )', '	attribute vec3 color;', '#endif', '#ifdef USE_MORPHTARGETS', '	attribute vec3 morphTarget0;', '	attribute vec3 morphTarget1;', '	attribute vec3 morphTarget2;', '	attribute vec3 morphTarget3;', '	#ifdef USE_MORPHNORMALS', '		attribute vec3 morphNormal0;', '		attribute vec3 morphNormal1;', '		attribute vec3 morphNormal2;', '		attribute vec3 morphNormal3;', '	#else', '		attribute vec3 morphTarget4;', '		attribute vec3 morphTarget5;', '		attribute vec3 morphTarget6;', '		attribute vec3 morphTarget7;', '	#endif', '#endif', '#ifdef USE_SKINNING', '	attribute vec4 skinIndex;', '	attribute vec4 skinWeight;', '#endif', '\n'].filter(filterEmptyLine).join('\n');
    prefixFragment = [customExtensions, generatePrecision(parameters), '#define SHADER_NAME ' + parameters.shaderName, customDefines, parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest + (parameters.alphaTest % 1 ? '' : '.0') : '',
    // add '.0' if integer

    '#define GAMMA_FACTOR ' + gammaFactorDefine, parameters.useFog && parameters.fog ? '#define USE_FOG' : '', parameters.useFog && parameters.fogExp2 ? '#define FOG_EXP2' : '', parameters.map ? '#define USE_MAP' : '', parameters.matcap ? '#define USE_MATCAP' : '', parameters.envMap ? '#define USE_ENVMAP' : '', parameters.envMap ? '#define ' + envMapTypeDefine : '', parameters.envMap ? '#define ' + envMapModeDefine : '', parameters.envMap ? '#define ' + envMapBlendingDefine : '', parameters.lightMap ? '#define USE_LIGHTMAP' : '', parameters.aoMap ? '#define USE_AOMAP' : '', parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '', parameters.bumpMap ? '#define USE_BUMPMAP' : '', parameters.normalMap ? '#define USE_NORMALMAP' : '', parameters.normalMap && parameters.objectSpaceNormalMap ? '#define OBJECTSPACE_NORMALMAP' : '', parameters.normalMap && parameters.tangentSpaceNormalMap ? '#define TANGENTSPACE_NORMALMAP' : '', parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '', parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '', parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '', parameters.specularMap ? '#define USE_SPECULARMAP' : '', parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '', parameters.metalnessMap ? '#define USE_METALNESSMAP' : '', parameters.alphaMap ? '#define USE_ALPHAMAP' : '', parameters.sheen ? '#define USE_SHEEN' : '', parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '', parameters.vertexTangents ? '#define USE_TANGENT' : '', parameters.vertexColors || parameters.instancingColor ? '#define USE_COLOR' : '', parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '', parameters.vertexUvs ? '#define USE_UV' : '', parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '', parameters.gradientMap ? '#define USE_GRADIENTMAP' : '', parameters.flatShading ? '#define FLAT_SHADED' : '', parameters.doubleSided ? '#define DOUBLE_SIDED' : '', parameters.flipSided ? '#define FLIP_SIDED' : '', parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '', parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '', parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '', parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '', parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '', parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ? '#define USE_LOGDEPTHBUF_EXT' : '', (parameters.extensionShaderTextureLOD || parameters.envMap) && parameters.rendererExtensionShaderTextureLod ? '#define TEXTURE_LOD_EXT' : '', 'uniform mat4 viewMatrix;', 'uniform vec3 cameraPosition;', 'uniform bool isOrthographic;', parameters.toneMapping !== NoToneMapping ? '#define TONE_MAPPING' : '', parameters.toneMapping !== NoToneMapping ? ShaderChunk['tonemapping_pars_fragment'] : '',
    // this code is required here because it is used by the toneMapping() function defined below
    parameters.toneMapping !== NoToneMapping ? getToneMappingFunction('toneMapping', parameters.toneMapping) : '', parameters.dithering ? '#define DITHERING' : '', ShaderChunk['encodings_pars_fragment'],
    // this code is required here because it is used by the various encoding/decoding function defined below
    parameters.map ? getTexelDecodingFunction('mapTexelToLinear', parameters.mapEncoding) : '', parameters.matcap ? getTexelDecodingFunction('matcapTexelToLinear', parameters.matcapEncoding) : '', parameters.envMap ? getTexelDecodingFunction('envMapTexelToLinear', parameters.envMapEncoding) : '', parameters.emissiveMap ? getTexelDecodingFunction('emissiveMapTexelToLinear', parameters.emissiveMapEncoding) : '', parameters.lightMap ? getTexelDecodingFunction('lightMapTexelToLinear', parameters.lightMapEncoding) : '', getTexelEncodingFunction('linearToOutputTexel', parameters.outputEncoding), parameters.depthPacking ? '#define DEPTH_PACKING ' + parameters.depthPacking : '', '\n'].filter(filterEmptyLine).join('\n');
  }
  vertexShader = resolveIncludes(vertexShader);
  vertexShader = replaceLightNums(vertexShader, parameters);
  vertexShader = replaceClippingPlaneNums(vertexShader, parameters);
  fragmentShader = resolveIncludes(fragmentShader);
  fragmentShader = replaceLightNums(fragmentShader, parameters);
  fragmentShader = replaceClippingPlaneNums(fragmentShader, parameters);
  vertexShader = unrollLoops(vertexShader);
  fragmentShader = unrollLoops(fragmentShader);
  if (parameters.isWebGL2 && parameters.isRawShaderMaterial !== true) {
    // GLSL 3.0 conversion for built-in materials and ShaderMaterial

    versionString = '#version 300 es\n';
    prefixVertex = ['#define attribute in', '#define varying out', '#define texture2D texture'].join('\n') + '\n' + prefixVertex;
    prefixFragment = ['#define varying in', parameters.glslVersion === GLSL3 ? '' : 'out highp vec4 pc_fragColor;', parameters.glslVersion === GLSL3 ? '' : '#define gl_FragColor pc_fragColor', '#define gl_FragDepthEXT gl_FragDepth', '#define texture2D texture', '#define textureCube texture', '#define texture2DProj textureProj', '#define texture2DLodEXT textureLod', '#define texture2DProjLodEXT textureProjLod', '#define textureCubeLodEXT textureLod', '#define texture2DGradEXT textureGrad', '#define texture2DProjGradEXT textureProjGrad', '#define textureCubeGradEXT textureGrad'].join('\n') + '\n' + prefixFragment;
  }
  var vertexGlsl = versionString + prefixVertex + vertexShader;
  var fragmentGlsl = versionString + prefixFragment + fragmentShader;
  var program = compileProgram(gl, vertexGlsl, fragmentGlsl, parameters);

  // set up caching for uniform locations

  var cachedUniforms;
  this.getUniforms = function () {
    if (cachedUniforms === undefined) {
      cachedUniforms = new WebGLUniforms(gl, program);
    }
    return cachedUniforms;
  };

  // set up caching for attribute locations

  var cachedAttributes;
  this.getAttributes = function () {
    if (cachedAttributes === undefined) {
      cachedAttributes = fetchAttributeLocations(gl, program);
    }
    return cachedAttributes;
  };

  // free resource

  this.destroy = function () {
    bindingStates.releaseStatesOfProgram(this);
    gl.deleteProgram(program);
    this.program = undefined;
  };

  //

  this.name = parameters.shaderName;
  this.id = programIdCount++;
  this.cacheKey = cacheKey;
  this.usedTimes = 1;
  this.program = program;
  // this.vertexShader = glVertexShader;
  // this.fragmentShader = glFragmentShader;

  return this;
}

;// ./src/webgl-renderer/shaders/UniformsUtils.js
/**
 * Uniform Utilities
 */

function cloneUniforms(src) {
  var dst = {};
  for (var u in src) {
    dst[u] = {};
    for (var p in src[u]) {
      var property = src[u][p];
      if (property && (property.isColor || property.isMat3 || property.isMat4 || property.isVec2 || property.isVec3 || property.isVec4 || property.isTexture || property.isQuat)) {
        dst[u][p] = property.clone();
      } else if (Array.isArray(property)) {
        dst[u][p] = property.slice();
      } else {
        dst[u][p] = property;
      }
    }
  }
  return dst;
}
function mergeUniforms(uniforms) {
  var merged = {};
  for (var u = 0; u < uniforms.length; u++) {
    var tmp = cloneUniforms(uniforms[u]);
    for (var p in tmp) {
      merged[p] = tmp[p];
    }
  }
  return merged;
}

// Legacy

var UniformsUtils = {
  clone: cloneUniforms,
  merge: mergeUniforms
};

;// ./src/webgl-renderer/shaders/UniformsLib.js




/**
 * Uniforms library for shared webgl shaders
 */

var UniformsLib = {
  common: {
    diffuse: {
      value: new Color(0xeeeeee)
    },
    opacity: {
      value: 1.0
    },
    map: {
      value: null
    },
    uvTransform: {
      value: new Mat3()
    },
    uv2Transform: {
      value: new Mat3()
    },
    alphaMap: {
      value: null
    }
  },
  specularmap: {
    specularMap: {
      value: null
    }
  },
  envmap: {
    envMap: {
      value: null
    },
    flipEnvMap: {
      value: -1
    },
    reflectivity: {
      value: 1.0
    },
    refractionRatio: {
      value: 0.98
    },
    maxMipLevel: {
      value: 0
    }
  },
  aomap: {
    aoMap: {
      value: null
    },
    aoMapIntensity: {
      value: 1
    }
  },
  lightmap: {
    lightMap: {
      value: null
    },
    lightMapIntensity: {
      value: 1
    }
  },
  emissivemap: {
    emissiveMap: {
      value: null
    }
  },
  bumpmap: {
    bumpMap: {
      value: null
    },
    bumpScale: {
      value: 1
    }
  },
  normalmap: {
    normalMap: {
      value: null
    },
    normalScale: {
      value: new Vec2(1, 1)
    }
  },
  displacementmap: {
    displacementMap: {
      value: null
    },
    displacementScale: {
      value: 1
    },
    displacementBias: {
      value: 0
    }
  },
  roughnessmap: {
    roughnessMap: {
      value: null
    }
  },
  metalnessmap: {
    metalnessMap: {
      value: null
    }
  },
  gradientmap: {
    gradientMap: {
      value: null
    }
  },
  fog: {
    fogDensity: {
      value: 0.00025
    },
    fogNear: {
      value: 1
    },
    fogFar: {
      value: 2000
    },
    fogColor: {
      value: new Color(0xffffff)
    }
  },
  lights: {
    ambientLightColor: {
      value: []
    },
    lightProbe: {
      value: []
    },
    directionalLights: {
      value: [],
      properties: {
        direction: {},
        color: {}
      }
    },
    directionalLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    directionalShadowMap: {
      value: []
    },
    directionalShadowMatrix: {
      value: []
    },
    spotLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        direction: {},
        distance: {},
        coneCos: {},
        penumbraCos: {},
        decay: {}
      }
    },
    spotLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    spotShadowMap: {
      value: []
    },
    spotShadowMatrix: {
      value: []
    },
    pointLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        decay: {},
        distance: {}
      }
    },
    pointLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {},
        shadowCameraNear: {},
        shadowCameraFar: {}
      }
    },
    pointShadowMap: {
      value: []
    },
    pointShadowMatrix: {
      value: []
    },
    hemisphereLights: {
      value: [],
      properties: {
        direction: {},
        skyColor: {},
        groundColor: {}
      }
    },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        width: {},
        height: {}
      }
    },
    ltc_1: {
      value: null
    },
    ltc_2: {
      value: null
    }
  },
  points: {
    diffuse: {
      value: new Color(0xeeeeee)
    },
    opacity: {
      value: 1.0
    },
    size: {
      value: 1.0
    },
    scale: {
      value: 1.0
    },
    map: {
      value: null
    },
    alphaMap: {
      value: null
    },
    uvTransform: {
      value: new Mat3()
    }
  },
  sprite: {
    diffuse: {
      value: new Color(0xeeeeee)
    },
    opacity: {
      value: 1.0
    },
    center: {
      value: new Vec2(0.5, 0.5)
    },
    rotation: {
      value: 0.0
    },
    map: {
      value: null
    },
    alphaMap: {
      value: null
    },
    uvTransform: {
      value: new Mat3()
    }
  }
};

;// ./src/webgl-renderer/shaders/ShaderLib.js







var ShaderLib = {
  basic: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.fog]),
    vertexShader: ShaderChunk.meshbasic_vert,
    fragmentShader: ShaderChunk.meshbasic_frag
  },
  lambert: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.fog, UniformsLib.lights, {
      emissive: {
        value: new Color(0x000000)
      }
    }]),
    vertexShader: ShaderChunk.meshlambert_vert,
    fragmentShader: ShaderChunk.meshlambert_frag
  },
  phong: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, {
      emissive: {
        value: new Color(0x000000)
      },
      specular: {
        value: new Color(0x111111)
      },
      shininess: {
        value: 30
      }
    }]),
    vertexShader: ShaderChunk.meshphong_vert,
    fragmentShader: ShaderChunk.meshphong_frag
  },
  standard: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.roughnessmap, UniformsLib.metalnessmap, UniformsLib.fog, UniformsLib.lights, {
      emissive: {
        value: new Color(0x000000)
      },
      roughness: {
        value: 1.0
      },
      metalness: {
        value: 0.0
      },
      envMapIntensity: {
        value: 1
      } // temporary
    }]),
    vertexShader: ShaderChunk.meshphysical_vert,
    fragmentShader: ShaderChunk.meshphysical_frag
  },
  toon: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.gradientmap, UniformsLib.fog, UniformsLib.lights, {
      emissive: {
        value: new Color(0x000000)
      }
    }]),
    vertexShader: ShaderChunk.meshtoon_vert,
    fragmentShader: ShaderChunk.meshtoon_frag
  },
  matcap: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, {
      matcap: {
        value: null
      }
    }]),
    vertexShader: ShaderChunk.meshmatcap_vert,
    fragmentShader: ShaderChunk.meshmatcap_frag
  },
  points: {
    uniforms: mergeUniforms([UniformsLib.points, UniformsLib.fog]),
    vertexShader: ShaderChunk.points_vert,
    fragmentShader: ShaderChunk.points_frag
  },
  dashed: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.fog, {
      scale: {
        value: 1
      },
      dashSize: {
        value: 1
      },
      totalSize: {
        value: 2
      }
    }]),
    vertexShader: ShaderChunk.linedashed_vert,
    fragmentShader: ShaderChunk.linedashed_frag
  },
  depth: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap]),
    vertexShader: ShaderChunk.depth_vert,
    fragmentShader: ShaderChunk.depth_frag
  },
  normal: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, {
      opacity: {
        value: 1.0
      }
    }]),
    vertexShader: ShaderChunk.normal_vert,
    fragmentShader: ShaderChunk.normal_frag
  },
  sprite: {
    uniforms: mergeUniforms([UniformsLib.sprite, UniformsLib.fog]),
    vertexShader: ShaderChunk.sprite_vert,
    fragmentShader: ShaderChunk.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: {
        value: new Mat3()
      },
      t2D: {
        value: null
      }
    },
    vertexShader: ShaderChunk.background_vert,
    fragmentShader: ShaderChunk.background_frag
  },
  /* -------------------------------------------------------------------------
  //	Cube map shader
   ------------------------------------------------------------------------- */

  cube: {
    uniforms: mergeUniforms([UniformsLib.envmap, {
      opacity: {
        value: 1.0
      }
    }]),
    vertexShader: ShaderChunk.cube_vert,
    fragmentShader: ShaderChunk.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: {
        value: null
      }
    },
    vertexShader: ShaderChunk.equirect_vert,
    fragmentShader: ShaderChunk.equirect_frag
  },
  distanceRGBA: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap, {
      referencePosition: {
        value: new Vec3()
      },
      nearDistance: {
        value: 1
      },
      farDistance: {
        value: 1000
      }
    }]),
    vertexShader: ShaderChunk.distanceRGBA_vert,
    fragmentShader: ShaderChunk.distanceRGBA_frag
  },
  shadow: {
    uniforms: mergeUniforms([UniformsLib.lights, UniformsLib.fog, {
      color: {
        value: new Color(0x00000)
      },
      opacity: {
        value: 1.0
      }
    }]),
    vertexShader: ShaderChunk.shadow_vert,
    fragmentShader: ShaderChunk.shadow_frag
  }
};
ShaderLib.physical = {
  uniforms: mergeUniforms([ShaderLib.standard.uniforms, {
    clearcoat: {
      value: 0
    },
    clearcoatMap: {
      value: null
    },
    clearcoatRoughness: {
      value: 0
    },
    clearcoatRoughnessMap: {
      value: null
    },
    clearcoatNormalScale: {
      value: new Vec2(1, 1)
    },
    clearcoatNormalMap: {
      value: null
    },
    sheen: {
      value: new Color(0x000000)
    },
    transmission: {
      value: 0
    },
    transmissionMap: {
      value: null
    }
  }]),
  vertexShader: ShaderChunk.meshphysical_vert,
  fragmentShader: ShaderChunk.meshphysical_frag
};

;// ./src/webgl-renderer/Programs.js




function WebGLPrograms(renderer, cubemaps, extensions, capabilities, bindingStates, clipping) {
  var programs = [];
  var isWebGL2 = capabilities.isWebGL2;
  var logarithmicDepthBuffer = capabilities.logarithmicDepthBuffer;
  var floatVertexTextures = capabilities.floatVertexTextures;
  var maxVertexUniforms = capabilities.maxVertexUniforms;
  var vertexTextures = capabilities.vertexTextures;
  var precision = capabilities.precision;
  var shaderIDs = {
    MeshDepthMaterial: 'depth',
    MeshDistanceMaterial: 'distanceRGBA',
    MeshNormalMaterial: 'normal',
    MeshBasicMaterial: 'basic',
    MeshLambertMaterial: 'lambert',
    MeshPhongMaterial: 'phong',
    MeshToonMaterial: 'toon',
    MeshStandardMaterial: 'physical',
    MeshPhysicalMaterial: 'physical',
    MeshMatcapMaterial: 'matcap',
    LineBasicMaterial: 'basic',
    LineDashedMaterial: 'dashed',
    PointsMaterial: 'points',
    ShadowMaterial: 'shadow',
    SpriteMaterial: 'sprite'
  };
  var parameterNames = ['precision', 'isWebGL2', 'supportsVertexTextures', 'outputEncoding', 'instancing', 'instancingColor', 'map', 'mapEncoding', 'matcap', 'matcapEncoding', 'envMap', 'envMapMode', 'envMapEncoding', 'envMapCubeUV', 'lightMap', 'lightMapEncoding', 'aoMap', 'emissiveMap', 'emissiveMapEncoding', 'bumpMap', 'normalMap', 'objectSpaceNormalMap', 'tangentSpaceNormalMap', 'clearcoatMap', 'clearcoatRoughnessMap', 'clearcoatNormalMap', 'displacementMap', 'specularMap', 'roughnessMap', 'metalnessMap', 'gradientMap', 'alphaMap', 'combine', 'vertexColors', 'vertexAlphas', 'vertexTangents', 'vertexUvs', 'uvsVertexOnly', 'fog', 'useFog', 'fogExp2', 'flatShading', 'sizeAttenuation', 'logarithmicDepthBuffer', 'skinning', 'maxBones', 'useVertexTexture', 'morphTargets', 'morphNormals', 'premultipliedAlpha', 'numDirLights', 'numPointLights', 'numSpotLights', 'numHemiLights', 'numRectAreaLights', 'numDirLightShadows', 'numPointLightShadows', 'numSpotLightShadows', 'shadowMapEnabled', 'shadowMapType', 'toneMapping', 'physicallyCorrectLights', 'alphaTest', 'doubleSided', 'flipSided', 'numClippingPlanes', 'numClipIntersection', 'depthPacking', 'dithering', 'sheen', 'transmissionMap'];
  function getMaxBones(object) {
    var skeleton = object.skeleton;
    var bones = skeleton.bones;
    if (floatVertexTextures) {
      return 1024;
    } else {
      // default for when object is not specified
      // ( for example when prebuilding shader to be used with multiple objects )
      //
      //  - leave some extra space for other uniforms
      //  - limit here is ANGLE's 254 max uniform vectors
      //    (up to 54 should be safe)

      var nVertexUniforms = maxVertexUniforms;
      var nVertexMatrices = Math.floor((nVertexUniforms - 20) / 4);
      var maxBones = Math.min(nVertexMatrices, bones.length);
      if (maxBones < bones.length) {
        console.warn('THREE.WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.');
        return 0;
      }
      return maxBones;
    }
  }
  function getTextureEncodingFromMap(map) {
    var encoding;
    if (map && map.isTexture) {
      encoding = map.encoding;
    } else if (map && map.isWebGLRenderTarget) {
      console.warn('THREE.WebGLPrograms.getTextureEncodingFromMap: don\'t use render targets as textures. Use their .texture property instead.');
      encoding = map.texture.encoding;
    } else {
      encoding = LinearEncoding;
    }
    return encoding;
  }
  function getParameters(material, lights, shadows, scene, object) {
    var fog = scene.fog;
    var environment = material.isMeshStandardMaterial ? scene.environment : null;

    // const envMap = cubemaps.get( material.envMap || environment );

    var shaderID = shaderIDs[material.type];

    // heuristics to create shader parameters according to lights in the scene
    // (not to blow over maxLights budget)

    var maxBones = object.isSkinnedMesh ? getMaxBones(object) : 0;
    if (material.precision !== null) {
      precision = capabilities.getMaxPrecision(material.precision);
      if (precision !== material.precision) {
        console.warn('THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');
      }
    }
    var vertexShader, fragmentShader;
    if (shaderID) {
      var shader = ShaderLib[shaderID];
      vertexShader = shader.vertexShader;
      fragmentShader = shader.fragmentShader;
    } else {
      vertexShader = material.vertexShader;
      fragmentShader = material.fragmentShader;
    }
    var currentRenderTarget = renderer.getRenderTarget();
    var parameters = {
      isWebGL2: isWebGL2,
      shaderID: shaderID,
      shaderName: material.type,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      defines: material.defines,
      isRawShaderMaterial: material.isRawShaderMaterial === true,
      glslVersion: material.glslVersion,
      precision: precision,
      instancing: object.isInstancedMesh === true,
      instancingColor: object.isInstancedMesh === true && object.instanceColor !== null,
      supportsVertexTextures: vertexTextures,
      outputEncoding: currentRenderTarget !== null ? getTextureEncodingFromMap(currentRenderTarget.texture) : renderer.outputEncoding,
      map: !!material.map,
      mapEncoding: getTextureEncodingFromMap(material.map),
      matcap: !!material.matcap,
      matcapEncoding: getTextureEncodingFromMap(material.matcap),
      // envMap: !! envMap,
      // envMapMode: envMap && envMap.mapping,
      // envMapEncoding: getTextureEncodingFromMap( envMap ),
      // envMapCubeUV: ( !! envMap ) && ( ( envMap.mapping === CubeUVReflectionMapping ) || ( envMap.mapping === CubeUVRefractionMapping ) ),
      lightMap: !!material.lightMap,
      lightMapEncoding: getTextureEncodingFromMap(material.lightMap),
      aoMap: !!material.aoMap,
      emissiveMap: !!material.emissiveMap,
      emissiveMapEncoding: getTextureEncodingFromMap(material.emissiveMap),
      bumpMap: !!material.bumpMap,
      normalMap: !!material.normalMap,
      objectSpaceNormalMap: material.normalMapType === ObjectSpaceNormalMap,
      tangentSpaceNormalMap: material.normalMapType === TangentSpaceNormalMap,
      clearcoatMap: !!material.clearcoatMap,
      clearcoatRoughnessMap: !!material.clearcoatRoughnessMap,
      clearcoatNormalMap: !!material.clearcoatNormalMap,
      displacementMap: !!material.displacementMap,
      roughnessMap: !!material.roughnessMap,
      metalnessMap: !!material.metalnessMap,
      specularMap: !!material.specularMap,
      alphaMap: !!material.alphaMap,
      gradientMap: !!material.gradientMap,
      sheen: !!material.sheen,
      transmissionMap: !!material.transmissionMap,
      combine: material.combine,
      vertexTangents: material.normalMap && material.vertexTangents,
      vertexColors: material.vertexColors,
      vertexAlphas: material.vertexColors === true && object.geometry.attributes.color && object.geometry.attributes.color.itemSize === 4,
      vertexUvs: !!material.map || !!material.bumpMap || !!material.normalMap || !!material.specularMap || !!material.alphaMap || !!material.emissiveMap || !!material.roughnessMap || !!material.metalnessMap || !!material.clearcoatMap || !!material.clearcoatRoughnessMap || !!material.clearcoatNormalMap || !!material.displacementMap || !!material.transmissionMap,
      uvsVertexOnly: !(!!material.map || !!material.bumpMap || !!material.normalMap || !!material.specularMap || !!material.alphaMap || !!material.emissiveMap || !!material.roughnessMap || !!material.metalnessMap || !!material.clearcoatNormalMap || !!material.transmissionMap) && !!material.displacementMap,
      fog: !!fog,
      useFog: material.fog,
      fogExp2: fog && fog.isFogExp2,
      flatShading: !!material.flatShading,
      sizeAttenuation: material.sizeAttenuation,
      logarithmicDepthBuffer: logarithmicDepthBuffer,
      skinning: material.skinning && maxBones > 0,
      maxBones: maxBones,
      useVertexTexture: floatVertexTextures,
      morphTargets: material.morphTargets,
      morphNormals: material.morphNormals,
      numDirLights: lights.directional.length,
      numPointLights: lights.point.length,
      numSpotLights: lights.spot.length,
      numRectAreaLights: lights.rectArea.length,
      numHemiLights: lights.hemi.length,
      numDirLightShadows: lights.directionalShadowMap.length,
      numPointLightShadows: lights.pointShadowMap.length,
      numSpotLightShadows: lights.spotShadowMap.length,
      numClippingPlanes: clipping.numPlanes,
      numClipIntersection: clipping.numIntersection,
      dithering: material.dithering,
      shadowMapEnabled: renderer.shadowMap.enabled && shadows.length > 0,
      shadowMapType: renderer.shadowMap.type,
      toneMapping: material.toneMapped ? renderer.toneMapping : NoToneMapping,
      physicallyCorrectLights: renderer.physicallyCorrectLights,
      premultipliedAlpha: material.premultipliedAlpha,
      alphaTest: material.alphaTest,
      doubleSided: material.side === DoubleSide,
      flipSided: material.side === BackSide,
      depthPacking: material.depthPacking !== undefined ? material.depthPacking : false,
      index0AttributeName: material.index0AttributeName,
      extensionDerivatives: material.extensions && material.extensions.derivatives,
      extensionFragDepth: material.extensions && material.extensions.fragDepth,
      extensionDrawBuffers: material.extensions && material.extensions.drawBuffers,
      extensionShaderTextureLOD: material.extensions && material.extensions.shaderTextureLOD,
      rendererExtensionFragDepth: isWebGL2 || extensions.has('EXT_frag_depth'),
      rendererExtensionDrawBuffers: isWebGL2 || extensions.has('WEBGL_draw_buffers'),
      rendererExtensionShaderTextureLod: isWebGL2 || extensions.has('EXT_shader_texture_lod'),
      customProgramCacheKey: material.customProgramCacheKey()
    };
    return parameters;
  }
  function getProgramCacheKey(parameters) {
    var array = [];
    if (parameters.shaderID) {
      array.push(parameters.shaderID);
    } else {
      array.push(parameters.fragmentShader);
      array.push(parameters.vertexShader);
    }
    if (parameters.defines !== undefined) {
      for (var name in parameters.defines) {
        array.push(name);
        array.push(parameters.defines[name]);
      }
    }
    if (parameters.isRawShaderMaterial === false) {
      for (var i = 0; i < parameterNames.length; i++) {
        array.push(parameters[parameterNames[i]]);
      }
      array.push(renderer.outputEncoding);
      array.push(renderer.gammaFactor);
    }
    array.push(parameters.customProgramCacheKey);
    return array.join();
  }
  function getUniforms(material) {
    var shaderID = shaderIDs[material.type];
    var uniforms;
    if (shaderID) {
      var shader = ShaderLib[shaderID];
      uniforms = UniformsUtils.clone(shader.uniforms);
    } else {
      uniforms = material.uniforms;
    }
    return uniforms;
  }
  function acquireProgram(parameters, cacheKey) {
    var program;

    // Check if code has been already compiled
    for (var p = 0, pl = programs.length; p < pl; p++) {
      var preexistingProgram = programs[p];
      if (preexistingProgram.cacheKey === cacheKey) {
        program = preexistingProgram;
        ++program.usedTimes;
        break;
      }
    }
    if (program === undefined) {
      program = new WebGLProgram(renderer, cacheKey, parameters, bindingStates);
      programs.push(program);
    }
    return program;
  }
  function releaseProgram(program) {
    if (--program.usedTimes === 0) {
      // Remove from unordered set
      var i = programs.indexOf(program);
      programs[i] = programs[programs.length - 1];
      programs.pop();

      // Free WebGL resources
      program.destroy();
    }
  }
  return {
    getParameters: getParameters,
    getProgramCacheKey: getProgramCacheKey,
    getUniforms: getUniforms,
    acquireProgram: acquireProgram,
    releaseProgram: releaseProgram,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: programs
  };
}

;// ./src/webgl-renderer/Properties.js
function WebGLProperties() {
  var properties = new WeakMap();
  function get(object) {
    var map = properties.get(object);
    if (map === undefined) {
      map = {};
      properties.set(object, map);
    }
    return map;
  }
  function remove(object) {
    properties["delete"](object);
  }
  function update(object, key, value) {
    properties.get(object)[key] = value;
  }
  function dispose() {
    properties = new WeakMap();
  }
  return {
    get: get,
    remove: remove,
    update: update,
    dispose: dispose
  };
}

;// ./src/webgl-renderer/RenderLists.js
function painterSortStable(a, b) {
  if (a.groupOrder !== b.groupOrder) {
    return a.groupOrder - b.groupOrder;
  } else if (a.renderOrder !== b.renderOrder) {
    return a.renderOrder - b.renderOrder;
  } else if (a.program !== b.program) {
    return a.program.id - b.program.id;
  } else if (a.material.id !== b.material.id) {
    return a.material.id - b.material.id;
  } else if (a.z !== b.z) {
    return a.z - b.z;
  } else {
    return a.id - b.id;
  }
}
function reversePainterSortStable(a, b) {
  if (a.groupOrder !== b.groupOrder) {
    return a.groupOrder - b.groupOrder;
  } else if (a.renderOrder !== b.renderOrder) {
    return a.renderOrder - b.renderOrder;
  } else if (a.z !== b.z) {
    return b.z - a.z;
  } else {
    return a.id - b.id;
  }
}
function WebGLRenderList(properties) {
  var renderItems = [];
  var renderItemsIndex = 0;
  var opaque = [];
  var transparent = [];
  var screen = [];
  var defaultProgram = {
    id: -1
  };
  function init() {
    renderItemsIndex = 0;
    opaque.length = 0;
    transparent.length = 0;
    screen.length = 0;
  }
  function getNextRenderItem(object, geometry, material, groupOrder, z, group) {
    var renderItem = renderItems[renderItemsIndex];
    var materialProperties = properties.get(material);
    if (renderItem === undefined) {
      renderItem = {
        id: object.id,
        object: object,
        geometry: geometry,
        material: material,
        program: materialProperties.program || defaultProgram,
        groupOrder: groupOrder,
        renderOrder: object.renderOrder,
        z: z,
        group: group
      };
      renderItems[renderItemsIndex] = renderItem;
    } else {
      renderItem.id = object.id;
      renderItem.object = object;
      renderItem.geometry = geometry;
      renderItem.material = material;
      renderItem.program = materialProperties.program || defaultProgram;
      renderItem.groupOrder = groupOrder;
      renderItem.renderOrder = object.renderOrder;
      renderItem.z = z;
      renderItem.group = group;
    }
    renderItemsIndex++;
    return renderItem;
  }
  function push(object, geometry, material, groupOrder, z, group) {
    var renderItem = getNextRenderItem(object, geometry, material, groupOrder, z, group);
    (material.transparent === true ? transparent : opaque).push(renderItem);
  }
  function unshift(object, geometry, material, groupOrder, z, group) {
    var renderItem = getNextRenderItem(object, geometry, material, groupOrder, z, group);
    (material.transparent === true ? transparent : opaque).unshift(renderItem);
  }
  function sort(customOpaqueSort, customTransparentSort) {
    if (opaque.length > 1) opaque.sort(customOpaqueSort || painterSortStable);
    if (transparent.length > 1) transparent.sort(customTransparentSort || reversePainterSortStable);
  }
  function finish() {
    // Clear references from inactive renderItems in the list

    for (var i = renderItemsIndex, il = renderItems.length; i < il; i++) {
      var renderItem = renderItems[i];
      if (renderItem.id === null) break;
      renderItem.id = null;
      renderItem.object = null;
      renderItem.geometry = null;
      renderItem.material = null;
      renderItem.program = null;
      renderItem.group = null;
    }
  }
  return {
    opaque: opaque,
    transparent: transparent,
    screen: screen,
    init: init,
    push: push,
    unshift: unshift,
    finish: finish,
    sort: sort
  };
}
function WebGLRenderLists(properties) {
  var lists = new WeakMap();
  function get(scene, renderCallDepth) {
    var list;
    if (lists.has(scene) === false) {
      list = new WebGLRenderList(properties);
      lists.set(scene, [list]);
    } else {
      if (renderCallDepth >= lists.get(scene).length) {
        list = new WebGLRenderList(properties);
        lists.get(scene).push(list);
      } else {
        list = lists.get(scene)[renderCallDepth];
      }
    }
    return list;
  }
  function dispose() {
    lists = new WeakMap();
  }
  return {
    get: get,
    dispose: dispose
  };
}

;// ./src/webgl-renderer/Lights.js





function UniformsCache() {
  var lights = {};
  return {
    get: function get(light) {
      if (lights[light.id] !== undefined) {
        return lights[light.id];
      }
      var uniforms;
      switch (light.type) {
        case 'DirectionalLight':
          uniforms = {
            direction: new Vec3(),
            color: new Color()
          };
          break;
        case 'SpotLight':
          uniforms = {
            position: new Vec3(),
            direction: new Vec3(),
            color: new Color(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case 'PointLight':
          uniforms = {
            position: new Vec3(),
            color: new Color(),
            distance: 0,
            decay: 0
          };
          break;
        case 'HemisphereLight':
          uniforms = {
            direction: new Vec3(),
            skyColor: new Color(),
            groundColor: new Color()
          };
          break;
        case 'RectAreaLight':
          uniforms = {
            color: new Color(),
            position: new Vec3(),
            halfWidth: new Vec3(),
            halfHeight: new Vec3()
          };
          break;
      }
      lights[light.id] = uniforms;
      return uniforms;
    }
  };
}
function ShadowUniformsCache() {
  var lights = {};
  return {
    get: function get(light) {
      if (lights[light.id] !== undefined) {
        return lights[light.id];
      }
      var uniforms;
      switch (light.type) {
        case 'DirectionalLight':
          uniforms = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vec2()
          };
          break;
        case 'SpotLight':
          uniforms = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vec2()
          };
          break;
        case 'PointLight':
          uniforms = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vec2(),
            shadowCameraNear: 1,
            shadowCameraFar: 1000
          };
          break;

        // TODO (abelnation): set RectAreaLight shadow uniforms
      }
      lights[light.id] = uniforms;
      return uniforms;
    }
  };
}
var nextVersion = 0;
function shadowCastingLightsFirst(lightA, lightB) {
  return (lightB.castShadow ? 1 : 0) - (lightA.castShadow ? 1 : 0);
}
function WebGLLights(extensions, capabilities) {
  var cache = new UniformsCache();
  var shadowCache = ShadowUniformsCache();
  var state = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotShadow: [],
    spotShadowMap: [],
    spotShadowMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: []
  };
  for (var i = 0; i < 9; i++) state.probe.push(new Vec3());
  var vector3 = new Vec3();
  var matrix4 = new Mat4();
  var matrix42 = new Mat4();
  function setup(lights) {
    var r = 0,
      g = 0,
      b = 0;
    for (var _i = 0; _i < 9; _i++) state.probe[_i].set(0, 0, 0);
    var directionalLength = 0;
    var pointLength = 0;
    var spotLength = 0;
    var rectAreaLength = 0;
    var hemiLength = 0;
    var numDirectionalShadows = 0;
    var numPointShadows = 0;
    var numSpotShadows = 0;
    lights.sort(shadowCastingLightsFirst);
    for (var _i2 = 0, l = lights.length; _i2 < l; _i2++) {
      var light = lights[_i2];
      var color = light.color;
      var intensity = light.intensity;
      var distance = light.distance;
      var shadowMap = light.shadow && light.shadow.map ? light.shadow.map.texture : null;
      if (light.isAmbientLight) {
        r += color.r * intensity;
        g += color.g * intensity;
        b += color.b * intensity;
      } else if (light.isLightProbe) {
        for (var j = 0; j < 9; j++) {
          state.probe[j].addScaledVector(light.sh.coefficients[j], intensity);
        }
      } else if (light.isDirectionalLight) {
        var uniforms = cache.get(light);
        uniforms.color.copy(light.color).mulScalar(light.intensity);
        if (light.castShadow) {
          var shadow = light.shadow;
          var shadowUniforms = shadowCache.get(light);
          shadowUniforms.shadowBias = shadow.bias;
          shadowUniforms.shadowNormalBias = shadow.normalBias;
          shadowUniforms.shadowRadius = shadow.radius;
          shadowUniforms.shadowMapSize = shadow.mapSize;
          state.directionalShadow[directionalLength] = shadowUniforms;
          state.directionalShadowMap[directionalLength] = shadowMap;
          state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;
          numDirectionalShadows++;
        }
        state.directional[directionalLength] = uniforms;
        directionalLength++;
      } else if (light.isSpotLight) {
        var _uniforms = cache.get(light);
        _uniforms.position.setFromMatrixPosition(light.matrixWorld);
        _uniforms.color.copy(color).mulScalar(intensity);
        _uniforms.distance = distance;
        _uniforms.coneCos = Math.cos(light.angle);
        _uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
        _uniforms.decay = light.decay;
        if (light.castShadow) {
          var _shadow = light.shadow;
          var _shadowUniforms = shadowCache.get(light);
          _shadowUniforms.shadowBias = _shadow.bias;
          _shadowUniforms.shadowNormalBias = _shadow.normalBias;
          _shadowUniforms.shadowRadius = _shadow.radius;
          _shadowUniforms.shadowMapSize = _shadow.mapSize;
          state.spotShadow[spotLength] = _shadowUniforms;
          state.spotShadowMap[spotLength] = shadowMap;
          state.spotShadowMatrix[spotLength] = light.shadow.matrix;
          numSpotShadows++;
        }
        state.spot[spotLength] = _uniforms;
        spotLength++;
      } else if (light.isRectAreaLight) {
        var _uniforms2 = cache.get(light);

        // (a) intensity is the total visible light emitted
        //uniforms.color.copy( color ).mulScalar( intensity / ( light.width * light.height * Math.PI ) );

        // (b) intensity is the brightness of the light
        _uniforms2.color.copy(color).mulScalar(intensity);
        _uniforms2.halfWidth.set(light.width * 0.5, 0.0, 0.0);
        _uniforms2.halfHeight.set(0.0, light.height * 0.5, 0.0);
        state.rectArea[rectAreaLength] = _uniforms2;
        rectAreaLength++;
      } else if (light.isPointLight) {
        var _uniforms3 = cache.get(light);
        _uniforms3.color.copy(light.color).mulScalar(light.intensity);
        _uniforms3.distance = light.distance;
        _uniforms3.decay = light.decay;
        if (light.castShadow) {
          var _shadow2 = light.shadow;
          var _shadowUniforms2 = shadowCache.get(light);
          _shadowUniforms2.shadowBias = _shadow2.bias;
          _shadowUniforms2.shadowNormalBias = _shadow2.normalBias;
          _shadowUniforms2.shadowRadius = _shadow2.radius;
          _shadowUniforms2.shadowMapSize = _shadow2.mapSize;
          _shadowUniforms2.shadowCameraNear = _shadow2.camera.near;
          _shadowUniforms2.shadowCameraFar = _shadow2.camera.far;
          state.pointShadow[pointLength] = _shadowUniforms2;
          state.pointShadowMap[pointLength] = shadowMap;
          state.pointShadowMatrix[pointLength] = light.shadow.matrix;
          numPointShadows++;
        }
        state.point[pointLength] = _uniforms3;
        pointLength++;
      } else if (light.isHemisphereLight) {
        var _uniforms4 = cache.get(light);
        _uniforms4.skyColor.copy(light.color).mulScalar(intensity);
        _uniforms4.groundColor.copy(light.groundColor).mulScalar(intensity);
        state.hemi[hemiLength] = _uniforms4;
        hemiLength++;
      }
    }
    if (rectAreaLength > 0) {
      if (capabilities.isWebGL2) {
        // WebGL 2

        state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
        state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;
      } else {
        // WebGL 1

        if (extensions.has('OES_texture_float_linear') === true) {
          state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
          state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;
        } else if (extensions.has('OES_texture_half_float_linear') === true) {
          state.rectAreaLTC1 = UniformsLib.LTC_HALF_1;
          state.rectAreaLTC2 = UniformsLib.LTC_HALF_2;
        } else {
          console.error('THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.');
        }
      }
    }
    state.ambient[0] = r;
    state.ambient[1] = g;
    state.ambient[2] = b;
    var hash = state.hash;
    if (hash.directionalLength !== directionalLength || hash.pointLength !== pointLength || hash.spotLength !== spotLength || hash.rectAreaLength !== rectAreaLength || hash.hemiLength !== hemiLength || hash.numDirectionalShadows !== numDirectionalShadows || hash.numPointShadows !== numPointShadows || hash.numSpotShadows !== numSpotShadows) {
      state.directional.length = directionalLength;
      state.spot.length = spotLength;
      state.rectArea.length = rectAreaLength;
      state.point.length = pointLength;
      state.hemi.length = hemiLength;
      state.directionalShadow.length = numDirectionalShadows;
      state.directionalShadowMap.length = numDirectionalShadows;
      state.pointShadow.length = numPointShadows;
      state.pointShadowMap.length = numPointShadows;
      state.spotShadow.length = numSpotShadows;
      state.spotShadowMap.length = numSpotShadows;
      state.directionalShadowMatrix.length = numDirectionalShadows;
      state.pointShadowMatrix.length = numPointShadows;
      state.spotShadowMatrix.length = numSpotShadows;
      hash.directionalLength = directionalLength;
      hash.pointLength = pointLength;
      hash.spotLength = spotLength;
      hash.rectAreaLength = rectAreaLength;
      hash.hemiLength = hemiLength;
      hash.numDirectionalShadows = numDirectionalShadows;
      hash.numPointShadows = numPointShadows;
      hash.numSpotShadows = numSpotShadows;
      state.version = nextVersion++;
    }
  }
  function setupView(lights, camera) {
    var directionalLength = 0;
    var pointLength = 0;
    var spotLength = 0;
    var rectAreaLength = 0;
    var hemiLength = 0;
    var viewMatrix = camera.matrixWorldInverse;
    for (var _i3 = 0, l = lights.length; _i3 < l; _i3++) {
      var light = lights[_i3];
      if (light.isDirectionalLight) {
        var uniforms = state.directional[directionalLength];
        uniforms.direction.setFromMatrixPosition(light.matrixWorld);
        vector3.setFromMatrixPosition(light.target.matrixWorld);
        uniforms.direction.sub(vector3);
        uniforms.direction.transformDirection(viewMatrix);
        directionalLength++;
      } else if (light.isSpotLight) {
        var _uniforms5 = state.spot[spotLength];
        _uniforms5.position.setFromMatrixPosition(light.matrixWorld);
        _uniforms5.position.applyMat4(viewMatrix);
        _uniforms5.direction.setFromMatrixPosition(light.matrixWorld);
        vector3.setFromMatrixPosition(light.target.matrixWorld);
        _uniforms5.direction.sub(vector3);
        _uniforms5.direction.transformDirection(viewMatrix);
        spotLength++;
      } else if (light.isRectAreaLight) {
        var _uniforms6 = state.rectArea[rectAreaLength];
        _uniforms6.position.setFromMatrixPosition(light.matrixWorld);
        _uniforms6.position.applyMat4(viewMatrix);

        // extract local rotation of light to derive width/height half vectors
        matrix42.identity();
        matrix4.copy(light.matrixWorld);
        matrix4.premultiply(viewMatrix);
        matrix42.extractRotation(matrix4);
        _uniforms6.halfWidth.set(light.width * 0.5, 0.0, 0.0);
        _uniforms6.halfHeight.set(0.0, light.height * 0.5, 0.0);
        _uniforms6.halfWidth.applyMat4(matrix42);
        _uniforms6.halfHeight.applyMat4(matrix42);
        rectAreaLength++;
      } else if (light.isPointLight) {
        var _uniforms7 = state.point[pointLength];
        _uniforms7.position.setFromMatrixPosition(light.matrixWorld);
        _uniforms7.position.applyMat4(viewMatrix);
        pointLength++;
      } else if (light.isHemisphereLight) {
        var _uniforms8 = state.hemi[hemiLength];
        _uniforms8.direction.setFromMatrixPosition(light.matrixWorld);
        _uniforms8.direction.transformDirection(viewMatrix);
        _uniforms8.direction.normalize();
        hemiLength++;
      }
    }
  }
  return {
    setup: setup,
    setupView: setupView,
    state: state
  };
}

;// ./src/webgl-renderer/RenderStates.js

function WebGLRenderState(extensions, capabilities) {
  var lights = new WebGLLights(extensions, capabilities);
  var lightsArray = [];
  var shadowsArray = [];
  function init() {
    lightsArray.length = 0;
    shadowsArray.length = 0;
  }
  function pushLight(light) {
    lightsArray.push(light);
  }
  function pushShadow(shadowLight) {
    shadowsArray.push(shadowLight);
  }
  function setupLights() {
    lights.setup(lightsArray);
  }
  function setupLightsView(camera) {
    lights.setupView(lightsArray, camera);
  }
  var state = {
    lightsArray: lightsArray,
    shadowsArray: shadowsArray,
    lights: lights
  };
  return {
    init: init,
    state: state,
    setupLights: setupLights,
    setupLightsView: setupLightsView,
    pushLight: pushLight,
    pushShadow: pushShadow
  };
}
function WebGLRenderStates(extensions, capabilities) {
  var renderStates = new WeakMap();
  function get(scene) {
    var renderCallDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var renderState;
    if (renderStates.has(scene) === false) {
      renderState = new WebGLRenderState(extensions, capabilities);
      renderStates.set(scene, [renderState]);
    } else {
      if (renderCallDepth >= renderStates.get(scene).length) {
        renderState = new WebGLRenderState(extensions, capabilities);
        renderStates.get(scene).push(renderState);
      } else {
        renderState = renderStates.get(scene)[renderCallDepth];
      }
    }
    return renderState;
  }
  function dispose() {
    renderStates = new WeakMap();
  }
  return {
    get: get,
    dispose: dispose
  };
}

;// ./src/webgl-renderer/State.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



function WebGLState(gl, extensions, capabilities) {
  var _factorToGL;
  var isWebGL2 = capabilities.isWebGL2;
  function ColorBuffer() {
    var locked = false;
    var color = new Vec4();
    var currentColorMask = null;
    var currentColorClear = new Vec4(0, 0, 0, 0);
    return {
      setMask: function setMask(colorMask) {
        if (currentColorMask !== colorMask && !locked) {
          gl.colorMask(colorMask, colorMask, colorMask, colorMask);
          currentColorMask = colorMask;
        }
      },
      setLocked: function setLocked(lock) {
        locked = lock;
      },
      setClear: function setClear(r, g, b, a, premultipliedAlpha) {
        if (premultipliedAlpha === true) {
          r *= a;
          g *= a;
          b *= a;
        }
        color.set(r, g, b, a);
        if (currentColorClear.equals(color) === false) {
          gl.clearColor(r, g, b, a);
          currentColorClear.copy(color);
        }
      },
      reset: function reset() {
        locked = false;
        currentColorMask = null;
        currentColorClear.set(-1, 0, 0, 0); // set to invalid state
      }
    };
  }
  function DepthBuffer() {
    var locked = false;
    var currentDepthMask = null;
    var currentDepthFunc = null;
    var currentDepthClear = null;
    return {
      setTest: function setTest(depthTest) {
        if (depthTest) {
          enable(gl.DEPTH_TEST);
        } else {
          disable(gl.DEPTH_TEST);
        }
      },
      setMask: function setMask(depthMask) {
        if (currentDepthMask !== depthMask && !locked) {
          gl.depthMask(depthMask);
          currentDepthMask = depthMask;
        }
      },
      setFunc: function setFunc(depthFunc) {
        if (currentDepthFunc !== depthFunc) {
          if (depthFunc) {
            switch (depthFunc) {
              case NeverDepth:
                gl.depthFunc(gl.NEVER);
                break;
              case AlwaysDepth:
                gl.depthFunc(gl.ALWAYS);
                break;
              case LessDepth:
                gl.depthFunc(gl.LESS);
                break;
              case LessEqualDepth:
                gl.depthFunc(gl.LEQUAL);
                break;
              case EqualDepth:
                gl.depthFunc(gl.EQUAL);
                break;
              case GreaterEqualDepth:
                gl.depthFunc(gl.GEQUAL);
                break;
              case GreaterDepth:
                gl.depthFunc(gl.GREATER);
                break;
              case NotEqualDepth:
                gl.depthFunc(gl.NOTEQUAL);
                break;
              default:
                gl.depthFunc(gl.LEQUAL);
            }
          } else {
            gl.depthFunc(gl.LEQUAL);
          }
          currentDepthFunc = depthFunc;
        }
      },
      setLocked: function setLocked(lock) {
        locked = lock;
      },
      setClear: function setClear(depth) {
        if (currentDepthClear !== depth) {
          gl.clearDepth(depth);
          currentDepthClear = depth;
        }
      },
      reset: function reset() {
        locked = false;
        currentDepthMask = null;
        currentDepthFunc = null;
        currentDepthClear = null;
      }
    };
  }
  function StencilBuffer() {
    var locked = false;
    var currentStencilMask = null;
    var currentStencilFunc = null;
    var currentStencilRef = null;
    var currentStencilFuncMask = null;
    var currentStencilFail = null;
    var currentStencilZFail = null;
    var currentStencilZPass = null;
    var currentStencilClear = null;
    return {
      setTest: function setTest(stencilTest) {
        if (!locked) {
          if (stencilTest) {
            enable(gl.STENCIL_TEST);
          } else {
            disable(gl.STENCIL_TEST);
          }
        }
      },
      setMask: function setMask(stencilMask) {
        if (currentStencilMask !== stencilMask && !locked) {
          gl.stencilMask(stencilMask);
          currentStencilMask = stencilMask;
        }
      },
      setFunc: function setFunc(stencilFunc, stencilRef, stencilMask) {
        if (currentStencilFunc !== stencilFunc || currentStencilRef !== stencilRef || currentStencilFuncMask !== stencilMask) {
          gl.stencilFunc(stencilFunc, stencilRef, stencilMask);
          currentStencilFunc = stencilFunc;
          currentStencilRef = stencilRef;
          currentStencilFuncMask = stencilMask;
        }
      },
      setOp: function setOp(stencilFail, stencilZFail, stencilZPass) {
        if (currentStencilFail !== stencilFail || currentStencilZFail !== stencilZFail || currentStencilZPass !== stencilZPass) {
          gl.stencilOp(stencilFail, stencilZFail, stencilZPass);
          currentStencilFail = stencilFail;
          currentStencilZFail = stencilZFail;
          currentStencilZPass = stencilZPass;
        }
      },
      setLocked: function setLocked(lock) {
        locked = lock;
      },
      setClear: function setClear(stencil) {
        if (currentStencilClear !== stencil) {
          gl.clearStencil(stencil);
          currentStencilClear = stencil;
        }
      },
      reset: function reset() {
        locked = false;
        currentStencilMask = null;
        currentStencilFunc = null;
        currentStencilRef = null;
        currentStencilFuncMask = null;
        currentStencilFail = null;
        currentStencilZFail = null;
        currentStencilZPass = null;
        currentStencilClear = null;
      }
    };
  }

  //

  var colorBuffer = new ColorBuffer();
  var depthBuffer = new DepthBuffer();
  var stencilBuffer = new StencilBuffer();
  var enabledCapabilities = {};
  var xrFramebuffer = null;
  var currentBoundFramebuffers = {};
  var currentProgram = null;
  var currentBlendingEnabled = false;
  var currentBlending = null;
  var currentBlendEquation = null;
  var currentBlendSrc = null;
  var currentBlendDst = null;
  var currentBlendEquationAlpha = null;
  var currentBlendSrcAlpha = null;
  var currentBlendDstAlpha = null;
  var currentPremultipledAlpha = false;
  var currentFlipSided = null;
  var currentCullFace = null;
  var currentLineWidth = null;
  var currentPolygonOffsetFactor = null;
  var currentPolygonOffsetUnits = null;
  var maxCombinedTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  var lineWidthAvailable = false;
  var version = 0;
  var glVersion = gl.getParameter(gl.VERSION);
  if (glVersion.indexOf('WebGL') !== -1) {
    version = parseFloat(/^WebGL (\d)/.exec(glVersion)[1]);
    lineWidthAvailable = version >= 1.0;
  } else if (glVersion.indexOf('OpenGL ES') !== -1) {
    version = parseFloat(/^OpenGL ES (\d)/.exec(glVersion)[1]);
    lineWidthAvailable = version >= 2.0;
  }
  var currentTextureSlot = null;
  var currentBoundTextures = {};

  // const maxTextures = capabilities.maxTextures;

  // const boundTextures = new Array(maxTextures);
  // // const emptyTextures = new Array(maxTextures);

  // // const emptyGLTexture = new glCore.GLTexture.fromData(gl, null, 1, 1);

  //     const tempObj = {}//{ _glTextures: {} };

  //     // tempObj._glTextures[this.CONTEXT_UID] = {};

  //     for (let i = 0; i < maxTextures; i++)
  //     {
  //         // const empty = new BaseTexture();

  //         // empty._glTextures[this.CONTEXT_UID] = emptyGLTexture;

  //         boundTextures[i] = tempObj;
  //         // this.emptyTextures[i] = empty;
  //         // this.bindTexture(null, i);
  //     }

  var currentScissor = new Vec4(0, 0, gl.canvas.width, gl.canvas.height);
  var currentViewport = new Vec4(0, 0, gl.canvas.width, gl.canvas.height);
  function createTexture(type, target, count) {
    var data = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.
    var texture = gl.createTexture();
    gl.bindTexture(type, texture);
    gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    for (var i = 0; i < count; i++) {
      gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }
    return texture;
  }
  var emptyTextures = {};
  emptyTextures[gl.TEXTURE_2D] = createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
  emptyTextures[gl.TEXTURE_CUBE_MAP] = createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);

  // init

  colorBuffer.setClear(0, 0, 0, 1);
  depthBuffer.setClear(1);
  stencilBuffer.setClear(0);
  enable(gl.DEPTH_TEST);
  depthBuffer.setFunc(LessEqualDepth);
  setFlipSided(false);
  setCullFace(CullFaceBack);
  enable(gl.CULL_FACE);
  setBlending(NoBlending);

  //

  function enable(id) {
    if (enabledCapabilities[id] !== true) {
      gl.enable(id);
      enabledCapabilities[id] = true;
    }
  }
  function disable(id) {
    if (enabledCapabilities[id] !== false) {
      gl.disable(id);
      enabledCapabilities[id] = false;
    }
  }
  function bindXRFramebuffer(framebuffer) {
    if (framebuffer !== xrFramebuffer) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      xrFramebuffer = framebuffer;
    }
  }
  function bindFramebuffer(target, framebuffer) {
    if (framebuffer === null && xrFramebuffer !== null) framebuffer = xrFramebuffer; // use active XR framebuffer if available

    if (currentBoundFramebuffers[target] !== framebuffer) {
      gl.bindFramebuffer(target, framebuffer);
      currentBoundFramebuffers[target] = framebuffer;
    }
  }
  function useProgram(program) {
    if (currentProgram !== program) {
      gl.useProgram(program);
      currentProgram = program;
      return true;
    }
    return false;
  }
  var activeShader = null;
  var projectionMatrix = new Mat3();
  var destinationFrame = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight
  };
  var sourceFrame = destinationFrame;
  projectionMatrix.identity();
  var el = projectionMatrix.elements;

  // // TODO: make dest scale source
  // if (!this.root)
  // {
  //     pm.a = 1 / destinationFrame.width * 2;
  //     pm.d = 1 / destinationFrame.height * 2;

  //     pm.tx = -1 - (sourceFrame.x * pm.a);
  //     pm.ty = -1 - (sourceFrame.y * pm.d);
  // }
  // else
  // {
  el[0] = 1 / destinationFrame.width * 2;
  el[4] = -1 / destinationFrame.height * 2;
  el[6] = -1 - sourceFrame.x * el[0];
  el[7] = 1 - sourceFrame.y * el[4];
  window.addEventListener('resize', function () {
    projectionMatrix.identity();
    var el = projectionMatrix.elements;
    el[0] = 1 / window.innerWidth * 2;
    el[4] = -1 / window.innerHeight * 2;
    el[6] = -1 - sourceFrame.x * el[0];
    el[7] = 1 - sourceFrame.y * el[4];
  });
  // }

  // gl.bindFramebuffer(gl.FRAMEBUFFER, null );
  // const resolution = 1.25;
  // gl.disable(gl.SCISSOR_TEST);
  // gl.viewport(
  //     destinationFrame.x | 0,
  //     destinationFrame.y | 0,
  //     (destinationFrame.width * resolution) | 0,
  //     (destinationFrame.height * resolution) | 0
  // );

  // gl.viewport(0,0, projectionFrame.width * this.resolution, projectionFrame.height * this.resolution);

  function bindShader(shader, autoProject) {
    if (currentProgram !== shader.program) {
      activeShader = shader;
      useProgram(shader.program);
      // shader.bind();

      // `autoProject` normally would be a default parameter set to true
      // but because of how Babel transpiles default parameters
      // it hinders the performance of this method.
      if (autoProject !== false) {
        // automatically set the projection matrix
        // console.log(projectionMatrix);
        window.shader = shader;
        window.gl = gl;
        window.projectionMatrix = projectionMatrix;
        // gl.disable(gl.SCISSOR_TEST);
        // gl.clearColor(1, 1, 0, 1);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        shader._uniforms.projectionMatrix.setValue(gl, projectionMatrix);
      }
    }
  }
  var activeGeometry = null;
  function bindGeometry(geometry) {
    if (activeGeometry === geometry) {
      return this;
    }
    if (geometry) {
      geometry.bind();
    } else if (activeGeometry) {
      // TODO this should always be true i think?
      activeGeometry.unbind();
    }
    activeGeometry = geometry;
  }
  var equationToGL = _defineProperty(_defineProperty(_defineProperty({}, AddEquation, gl.FUNC_ADD), SubtractEquation, gl.FUNC_SUBTRACT), ReverseSubtractEquation, gl.FUNC_REVERSE_SUBTRACT);
  if (isWebGL2) {
    equationToGL[MinEquation] = gl.MIN;
    equationToGL[MaxEquation] = gl.MAX;
  } else {
    var extension = extensions.get('EXT_blend_minmax');
    if (extension !== null) {
      equationToGL[MinEquation] = extension.MIN_EXT;
      equationToGL[MaxEquation] = extension.MAX_EXT;
    }
  }
  var factorToGL = (_factorToGL = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_factorToGL, ZeroFactor, gl.ZERO), OneFactor, gl.ONE), SrcColorFactor, gl.SRC_COLOR), SrcAlphaFactor, gl.SRC_ALPHA), SrcAlphaSaturateFactor, gl.SRC_ALPHA_SATURATE), DstColorFactor, gl.DST_COLOR), DstAlphaFactor, gl.DST_ALPHA), OneMinusSrcColorFactor, gl.ONE_MINUS_SRC_COLOR), OneMinusSrcAlphaFactor, gl.ONE_MINUS_SRC_ALPHA), OneMinusDstColorFactor, gl.ONE_MINUS_DST_COLOR), _defineProperty(_factorToGL, OneMinusDstAlphaFactor, gl.ONE_MINUS_DST_ALPHA));
  function setBlending(blending, premultipliedAlpha, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha) {
    if (blending === NoBlending) {
      if (currentBlendingEnabled === true) {
        disable(gl.BLEND);
        currentBlendingEnabled = false;
      }
      return;
    }
    if (currentBlendingEnabled === false) {
      enable(gl.BLEND);
      currentBlendingEnabled = true;
    }
    if (blending !== CustomBlending) {
      if (blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha) {
        if (currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation) {
          gl.blendEquation(gl.FUNC_ADD);
          currentBlendEquation = AddEquation;
          currentBlendEquationAlpha = AddEquation;
        }
        if (premultipliedAlpha) {
          switch (blending) {
            case NormalBlending:
              gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              break;
            case AdditiveBlending:
              gl.blendFunc(gl.ONE, gl.ONE);
              break;
            case SubtractiveBlending:
              // gl.blendFuncSeparate( gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA ); // THREE original
              gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
              break;
            case MultiplyBlending:
              // gl.blendFuncSeparate( gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA ); // THREE original
              gl.blendFuncSeparate(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              break;
            case ScreenBlending:
              gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              break;
            default:
              console.error('THREE.WebGLState: Invalid blending: ', blending);
              break;
          }
        } else {
          switch (blending) {
            case NormalBlending:
              gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              break;
            case AdditiveBlending:
              gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
              break;
            case SubtractiveBlending:
              gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
              break;
            case MultiplyBlending:
              gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
              break;
            case ScreenBlending:
              gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              break;
            default:
              console.error('THREE.WebGLState: Invalid blending: ', blending);
              break;
          }
        }
        currentBlendSrc = null;
        currentBlendDst = null;
        currentBlendSrcAlpha = null;
        currentBlendDstAlpha = null;
        currentBlending = blending;
        currentPremultipledAlpha = premultipliedAlpha;
      }
      return;
    }

    // custom blending

    blendEquationAlpha = blendEquationAlpha || blendEquation;
    blendSrcAlpha = blendSrcAlpha || blendSrc;
    blendDstAlpha = blendDstAlpha || blendDst;
    if (blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha) {
      gl.blendEquationSeparate(equationToGL[blendEquation], equationToGL[blendEquationAlpha]);
      currentBlendEquation = blendEquation;
      currentBlendEquationAlpha = blendEquationAlpha;
    }
    if (blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha) {
      gl.blendFuncSeparate(factorToGL[blendSrc], factorToGL[blendDst], factorToGL[blendSrcAlpha], factorToGL[blendDstAlpha]);
      currentBlendSrc = blendSrc;
      currentBlendDst = blendDst;
      currentBlendSrcAlpha = blendSrcAlpha;
      currentBlendDstAlpha = blendDstAlpha;
    }
    currentBlending = blending;
    currentPremultipledAlpha = null;
  }
  function setMaterial(material, frontFaceCW) {
    material.side === DoubleSide ? disable(gl.CULL_FACE) : enable(gl.CULL_FACE);
    var flipSided = material.side === BackSide;
    if (frontFaceCW) flipSided = !flipSided;
    setFlipSided(flipSided);
    material.blending === NormalBlending && material.transparent === false ? setBlending(NoBlending) : setBlending(material.blending, material.premultipliedAlpha, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha);
    depthBuffer.setFunc(material.depthFunc);
    depthBuffer.setTest(material.depthTest);
    depthBuffer.setMask(material.depthWrite);
    colorBuffer.setMask(material.colorWrite);
    var stencilWrite = material.stencilWrite;
    stencilBuffer.setTest(stencilWrite);
    if (stencilWrite) {
      stencilBuffer.setMask(material.stencilWriteMask);
      stencilBuffer.setFunc(material.stencilFunc, material.stencilRef, material.stencilFuncMask);
      stencilBuffer.setOp(material.stencilFail, material.stencilZFail, material.stencilZPass);
    }
    setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);
    material.alphaToCoverage === true ? enable(gl.SAMPLE_ALPHA_TO_COVERAGE) : disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
  }

  //

  function setFlipSided(flipSided) {
    if (currentFlipSided !== flipSided) {
      if (flipSided) {
        gl.frontFace(gl.CW);
      } else {
        gl.frontFace(gl.CCW);
      }
      currentFlipSided = flipSided;
    }
  }
  function setCullFace(cullFace) {
    if (cullFace !== CullFaceNone) {
      enable(gl.CULL_FACE);
      if (cullFace !== currentCullFace) {
        if (cullFace === CullFaceBack) {
          gl.cullFace(gl.BACK);
        } else if (cullFace === CullFaceFront) {
          gl.cullFace(gl.FRONT);
        } else {
          gl.cullFace(gl.FRONT_AND_BACK);
        }
      }
    } else {
      disable(gl.CULL_FACE);
    }
    currentCullFace = cullFace;
  }
  function setLineWidth(width) {
    if (width !== currentLineWidth) {
      if (lineWidthAvailable) gl.lineWidth(width);
      currentLineWidth = width;
    }
  }
  function setPolygonOffset(polygonOffset, factor, units) {
    if (polygonOffset) {
      enable(gl.POLYGON_OFFSET_FILL);
      if (currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units) {
        gl.polygonOffset(factor, units);
        currentPolygonOffsetFactor = factor;
        currentPolygonOffsetUnits = units;
      }
    } else {
      disable(gl.POLYGON_OFFSET_FILL);
    }
  }
  function setScissorTest(scissorTest) {
    if (scissorTest) {
      enable(gl.SCISSOR_TEST);
    } else {
      disable(gl.SCISSOR_TEST);
    }
  }

  // texture

  function activeTexture(webglSlot) {
    if (webglSlot === undefined) webglSlot = gl.TEXTURE0 + maxCombinedTextures - 1;
    if (currentTextureSlot !== webglSlot) {
      gl.activeTexture(webglSlot);
      currentTextureSlot = webglSlot;
    }
  }
  function bindTexture(webglType, webglTexture) {
    if (currentTextureSlot === null) {
      activeTexture();
    }
    var boundTexture = currentBoundTextures[currentTextureSlot];
    if (boundTexture === undefined) {
      boundTexture = {
        type: undefined,
        texture: undefined
      };
      currentBoundTextures[currentTextureSlot] = boundTexture;
    }
    if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {
      gl.bindTexture(webglType, webglTexture || emptyTextures[webglType]);
      boundTexture.type = webglType;
      boundTexture.texture = webglTexture;
    }
  }
  function unbindTexture() {
    var boundTexture = currentBoundTextures[currentTextureSlot];
    if (boundTexture !== undefined && boundTexture.type !== undefined) {
      gl.bindTexture(boundTexture.type, null);
      boundTexture.type = undefined;
      boundTexture.texture = undefined;
    }
  }
  function compressedTexImage2D() {
    try {
      gl.compressedTexImage2D.apply(gl, arguments);
    } catch (error) {
      console.error('THREE.WebGLState:', error);
    }
  }
  function texImage2D() {
    try {
      gl.texImage2D.apply(gl, arguments);
    } catch (error) {
      console.error('THREE.WebGLState:', error);
    }
  }
  function texImage3D() {
    try {
      gl.texImage3D.apply(gl, arguments);
    } catch (error) {
      console.error('THREE.WebGLState:', error);
    }
  }

  //

  function scissor(scissor) {
    if (currentScissor.equals(scissor) === false) {
      gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
      currentScissor.copy(scissor);
    }
  }
  function viewport(viewport) {
    if (currentViewport.equals(viewport) === false) {
      gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
      currentViewport.copy(viewport);
    }
  }

  //

  function reset() {
    // reset state

    gl.disable(gl.BLEND);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.disable(gl.SCISSOR_TEST);
    gl.disable(gl.STENCIL_TEST);
    gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ZERO);
    gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);
    gl.colorMask(true, true, true, true);
    gl.clearColor(0, 0, 0, 0);
    gl.depthMask(true);
    gl.depthFunc(gl.LESS);
    gl.clearDepth(1);
    gl.stencilMask(0xffffffff);
    gl.stencilFunc(gl.ALWAYS, 0, 0xffffffff);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    gl.clearStencil(0);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.polygonOffset(0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (isWebGL2 === true) {
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
      gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
    }
    gl.useProgram(null);
    gl.lineWidth(1);
    gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // reset internals

    enabledCapabilities = {};
    currentTextureSlot = null;
    currentBoundTextures = {};
    xrFramebuffer = null;
    currentBoundFramebuffers = {};
    currentProgram = null;
    currentBlendingEnabled = false;
    currentBlending = null;
    currentBlendEquation = null;
    currentBlendSrc = null;
    currentBlendDst = null;
    currentBlendEquationAlpha = null;
    currentBlendSrcAlpha = null;
    currentBlendDstAlpha = null;
    currentPremultipledAlpha = false;
    currentFlipSided = null;
    currentCullFace = null;
    currentLineWidth = null;
    currentPolygonOffsetFactor = null;
    currentPolygonOffsetUnits = null;
    currentScissor.set(0, 0, gl.canvas.width, gl.canvas.height);
    currentViewport.set(0, 0, gl.canvas.width, gl.canvas.height);
    colorBuffer.reset();
    depthBuffer.reset();
    stencilBuffer.reset();
  }
  return {
    buffers: {
      color: colorBuffer,
      depth: depthBuffer,
      stencil: stencilBuffer
    },
    enable: enable,
    disable: disable,
    bindFramebuffer: bindFramebuffer,
    bindXRFramebuffer: bindXRFramebuffer,
    useProgram: useProgram,
    bindShader: bindShader,
    attribs2D: {
      tempAttribState: new Array(capabilities.maxAttributes),
      attribState: new Array(capabilities.maxAttributes)
    },
    bindGeometry: bindGeometry,
    setBlending: setBlending,
    setMaterial: setMaterial,
    setFlipSided: setFlipSided,
    setCullFace: setCullFace,
    setLineWidth: setLineWidth,
    setPolygonOffset: setPolygonOffset,
    setScissorTest: setScissorTest,
    activeTexture: activeTexture,
    bindTexture: bindTexture,
    unbindTexture: unbindTexture,
    compressedTexImage2D: compressedTexImage2D,
    texImage2D: texImage2D,
    texImage3D: texImage3D,
    scissor: scissor,
    viewport: viewport,
    reset: reset
  };
}

;// ./src/webgl-renderer/Textures.js
function Textures_typeof(o) { "@babel/helpers - typeof"; return Textures_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Textures_typeof(o); }
function Textures_defineProperty(e, r, t) { return (r = Textures_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function Textures_toPropertyKey(t) { var i = Textures_toPrimitive(t, "string"); return "symbol" == Textures_typeof(i) ? i : i + ""; }
function Textures_toPrimitive(t, r) { if ("object" != Textures_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Textures_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



function WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info, textureGC) {
  var isWebGL2 = capabilities.isWebGL2;
  var maxTextures = capabilities.maxTextures;
  var maxCubemapSize = capabilities.maxCubemapSize;
  var maxTextureSize = capabilities.maxTextureSize;
  var maxSamples = capabilities.maxSamples;
  var managedTextures = [];
  var _videoTextures = new WeakMap();
  var _canvas;

  // cordova iOS (as of 5.0) still uses UIWebView, which provides OffscreenCanvas,
  // also OffscreenCanvas.getContext("webgl"), but not OffscreenCanvas.getContext("2d")!
  // Some implementations may only implement OffscreenCanvas partially (e.g. lacking 2d).

  var useOffscreenCanvas = false;
  try {
    useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined' && new OffscreenCanvas(1, 1).getContext('2d') !== null;
  } catch (err) {

    // Ignore any errors
  }
  function createCanvas(width, height) {
    // Use OffscreenCanvas when available. Specially needed in web workers

    return useOffscreenCanvas ? new OffscreenCanvas(width, height) : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
  }
  function resizeImage(image, needsPowerOfTwo, needsNewCanvas, maxSize) {
    var scale = 1;

    // handle case if texture exceeds max size

    if (image.width > maxSize || image.height > maxSize) {
      scale = maxSize / Math.max(image.width, image.height);
    }

    // only perform resize if necessary

    if (scale < 1 || needsPowerOfTwo === true) {
      // only perform resize for certain image types

      if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
        var floor = needsPowerOfTwo ? floorPow2 : Math.floor;
        var width = floor(scale * image.width);
        var height = floor(scale * image.height);
        if (_canvas === undefined) _canvas = createCanvas(width, height);

        // cube textures can't reuse the same canvas

        var canvas = needsNewCanvas ? createCanvas(width, height) : _canvas;
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        console.warn('THREE.WebGLRenderer: Texture has been resized from (' + image.width + 'x' + image.height + ') to (' + width + 'x' + height + ').');
        return canvas;
      } else {
        if ('data' in image) {
          console.warn('THREE.WebGLRenderer: Image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
        }
        return image;
      }
    }
    return image;
  }
  function isPowerOf2(image) {
    return isPow2(image.width) && isPow2(image.height);
  }
  function textureNeedsPowerOfTwo(texture) {
    if (isWebGL2) return false;
    return texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping || texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
  }
  function textureNeedsGenerateMipmaps(texture, supportsMips) {
    return texture.generateMipmaps && supportsMips && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
  }
  function generateMipmap(target, texture, width, height) {
    _gl.generateMipmap(target);
    var textureProperties = properties.get(texture);
    textureProperties.__maxMipLevel = Math.log2(Math.max(width, height));
  }
  function getInternalFormat(internalFormatName, glFormat, glType) {
    if (isWebGL2 === false) return glFormat;
    if (internalFormatName !== null) {
      if (_gl[internalFormatName] !== undefined) return _gl[internalFormatName];
      console.warn('THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format \'' + internalFormatName + '\'');
    }
    var internalFormat = glFormat;
    if (glFormat === _gl.RED) {
      if (glType === _gl.FLOAT) internalFormat = _gl.R32F;
      if (glType === _gl.HALF_FLOAT) internalFormat = _gl.R16F;
      if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.R8;
    }
    if (glFormat === _gl.RGB) {
      if (glType === _gl.FLOAT) internalFormat = _gl.RGB32F;
      if (glType === _gl.HALF_FLOAT) internalFormat = _gl.RGB16F;
      if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.RGB8;
    }
    if (glFormat === _gl.RGBA) {
      if (glType === _gl.FLOAT) internalFormat = _gl.RGBA32F;
      if (glType === _gl.HALF_FLOAT) internalFormat = _gl.RGBA16F;
      if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.RGBA8;
    }
    if (internalFormat === _gl.R16F || internalFormat === _gl.R32F || internalFormat === _gl.RGBA16F || internalFormat === _gl.RGBA32F) {
      extensions.get('EXT_color_buffer_float');
    }
    return internalFormat;
  }

  // Fallback filters for non-power-of-2 textures

  function filterFallback(f) {
    if (f === NearestFilter || f === NearestMipmapNearestFilter || f === NearestMipmapLinearFilter) {
      return _gl.NEAREST;
    }
    return _gl.LINEAR;
  }

  //

  function onTextureDispose() {
    // this.removeEventListener( 'dispose', onTextureDispose );

    deallocateTexture(this);
    if (this.isVideoTexture) {
      _videoTextures["delete"](this);
    }
    info.memory.textures--;
  }
  function onRenderTargetDispose(event) {
    var renderTarget = event.target;
    renderTarget.removeEventListener('dispose', onRenderTargetDispose);
    deallocateRenderTarget(renderTarget);
    info.memory.textures--;
  }

  //

  function deallocateTexture(texture) {
    var textureProperties = properties.get(texture);
    if (textureProperties.__webglInit === undefined) return;
    _gl.deleteTexture(textureProperties.__webglTexture);
    var i = managedTextures.indexOf(texture);
    if (i !== -1) {
      managedTextures[i] = managedTextures[managedTextures.length - 1];
      managedTextures.pop();
    }
    properties.remove(texture);
  }
  function deallocateRenderTarget(renderTarget) {
    var texture = renderTarget.texture;
    var renderTargetProperties = properties.get(renderTarget);
    var textureProperties = properties.get(texture);
    if (!renderTarget) return;
    if (textureProperties.__webglTexture !== undefined) {
      _gl.deleteTexture(textureProperties.__webglTexture);
    }
    if (renderTarget.depthTexture) {
      renderTarget.depthTexture.dispose();
    }
    if (renderTarget.isWebGLCubeRenderTarget) {
      for (var i = 0; i < 6; i++) {
        _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[i]);
        if (renderTargetProperties.__webglDepthbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer[i]);
      }
    } else {
      _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer);
      if (renderTargetProperties.__webglDepthbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer);
      if (renderTargetProperties.__webglMultisampledFramebuffer) _gl.deleteFramebuffer(renderTargetProperties.__webglMultisampledFramebuffer);
      if (renderTargetProperties.__webglColorRenderbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglColorRenderbuffer);
      if (renderTargetProperties.__webglDepthRenderbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthRenderbuffer);
    }
    properties.remove(texture);
    properties.remove(renderTarget);
  }

  //

  var textureUnits = 0;
  function resetTextureUnits() {
    textureUnits = 0;
  }
  function allocateTextureUnit() {
    var textureUnit = textureUnits;
    if (textureUnit >= maxTextures) {
      console.warn('THREE.WebGLTextures: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + maxTextures);
    }
    textureUnits += 1;
    return textureUnit;
  }

  //

  function setTexture2D(texture, slot, saveCache) {
    texture.touched = textureGC.count;
    var textureProperties = properties.get(texture);
    if (boundTextures[slot] === texture && textureProperties.__version === texture.version) return;

    // console.log(boundTextures);
    // console.log("slot", slot, texture.uuid);

    if (texture.isVideoTexture) updateVideoTexture(texture);
    if (texture.version > 0 && textureProperties.__version !== texture.version) {
      if (texture.valid) {
        boundTextures[slot] = texture;
        uploadTexture(textureProperties, texture, slot);
        return;
      }
    }
    boundTextures[slot] = texture;
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
  }
  function setTexture2DArray(texture, slot) {
    texture.touched = textureGC.count;
    var textureProperties = properties.get(texture);
    if (texture.version > 0 && textureProperties.__version !== texture.version) {
      uploadTexture(textureProperties, texture, slot);
      return;
    }
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(_gl.TEXTURE_2D_ARRAY, textureProperties.__webglTexture);
  }
  function setTexture3D(texture, slot) {
    texture.touched = textureGC.count;
    var textureProperties = properties.get(texture);
    if (texture.version > 0 && textureProperties.__version !== texture.version) {
      uploadTexture(textureProperties, texture, slot);
      return;
    }
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(_gl.TEXTURE_3D, textureProperties.__webglTexture);
  }
  function setTextureCube(texture, slot) {
    texture.touched = textureGC.count;
    var textureProperties = properties.get(texture);
    if (texture.version > 0 && textureProperties.__version !== texture.version) {
      uploadCubeTexture(textureProperties, texture, slot);
      return;
    }
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture);
  }
  var wrappingToGL = Textures_defineProperty(Textures_defineProperty(Textures_defineProperty({}, RepeatWrapping, _gl.REPEAT), ClampToEdgeWrapping, _gl.CLAMP_TO_EDGE), MirroredRepeatWrapping, _gl.MIRRORED_REPEAT);
  var filterToGL = Textures_defineProperty(Textures_defineProperty(Textures_defineProperty(Textures_defineProperty(Textures_defineProperty(Textures_defineProperty({}, NearestFilter, _gl.NEAREST), NearestMipmapNearestFilter, _gl.NEAREST_MIPMAP_NEAREST), NearestMipmapLinearFilter, _gl.NEAREST_MIPMAP_LINEAR), LinearFilter, _gl.LINEAR), LinearMipmapNearestFilter, _gl.LINEAR_MIPMAP_NEAREST), LinearMipmapLinearFilter, _gl.LINEAR_MIPMAP_LINEAR);
  function setTextureParameters(textureType, texture, supportsMips) {
    if (supportsMips) {
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, wrappingToGL[texture.wrapS]);
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, wrappingToGL[texture.wrapT]);
      if (textureType === _gl.TEXTURE_3D || textureType === _gl.TEXTURE_2D_ARRAY) {
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_R, wrappingToGL[texture.wrapR]);
      }
      _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, filterToGL[texture.magFilter]);
      _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, filterToGL[texture.minFilter]);
    } else {
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);
      if (textureType === _gl.TEXTURE_3D || textureType === _gl.TEXTURE_2D_ARRAY) {
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_R, _gl.CLAMP_TO_EDGE);
      }
      if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) {
        console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.');
      }
      _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, filterFallback(texture.magFilter));
      _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, filterFallback(texture.minFilter));
      if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) {
        console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.');
      }
    }
    if (extensions.has('EXT_texture_filter_anisotropic') === true) {
      var extension = extensions.get('EXT_texture_filter_anisotropic');
      if (texture.type === FloatType && extensions.has('OES_texture_float_linear') === false) return; // verify extension for WebGL 1 and WebGL 2
      if (isWebGL2 === false && texture.type === HalfFloatType && extensions.has('OES_texture_half_float_linear') === false) return; // verify extension for WebGL 1 only

      if (texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy) {
        _gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, capabilities.getMaxAnisotropy()));
        properties.get(texture).__currentAnisotropy = texture.anisotropy;
      }
    }
  }
  function initTexture(textureProperties, texture) {
    if (textureProperties.__webglInit === undefined) {
      textureProperties.__webglInit = true;
      texture.once('dispose', onTextureDispose, texture);
      managedTextures.push(texture);
      textureProperties.__webglTexture = _gl.createTexture();
      info.memory.textures++;
    }
  }
  function uploadTexture(textureProperties, texture, slot) {
    var textureType = _gl.TEXTURE_2D;
    if (texture.isDataTexture2DArray) textureType = _gl.TEXTURE_2D_ARRAY;
    if (texture.isDataTexture3D) textureType = _gl.TEXTURE_3D;
    initTexture(textureProperties, texture);
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(textureType, textureProperties.__webglTexture);
    _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);
    _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
    _gl.pixelStorei(_gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, _gl.NONE);
    var needsPowerOfTwo = textureNeedsPowerOfTwo(texture) && isPowerOf2(texture.image) === false;
    var image = resizeImage(texture.image, needsPowerOfTwo, false, maxTextureSize);
    var supportsMips = isPowerOf2(image) || isWebGL2,
      glFormat = utils.convert(texture.format);
    var glType = utils.convert(texture.type),
      glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType);
    setTextureParameters(textureType, texture, supportsMips);
    var mipmap;
    var mipmaps = texture.mipmaps;
    if (texture.isDepthTexture) {
      // populate depth texture with dummy data

      glInternalFormat = _gl.DEPTH_COMPONENT;
      if (isWebGL2) {
        if (texture.type === FloatType) {
          glInternalFormat = _gl.DEPTH_COMPONENT32F;
        } else if (texture.type === UnsignedIntType) {
          glInternalFormat = _gl.DEPTH_COMPONENT24;
        } else if (texture.type === UnsignedInt248Type) {
          glInternalFormat = _gl.DEPTH24_STENCIL8;
        } else {
          glInternalFormat = _gl.DEPTH_COMPONENT16; // WebGL2 requires sized internalformat for glTexImage2D
        }
      } else {
        if (texture.type === FloatType) {
          console.error('WebGLRenderer: Floating point depth texture requires WebGL2.');
        }
      }

      // validation checks for WebGL 1

      if (texture.format === DepthFormat && glInternalFormat === _gl.DEPTH_COMPONENT) {
        // The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
        // DEPTH_COMPONENT and type is not UNSIGNED_SHORT or UNSIGNED_INT
        // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
        if (texture.type !== UnsignedShortType && texture.type !== UnsignedIntType) {
          console.warn('THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.');
          texture.type = UnsignedShortType;
          glType = utils.convert(texture.type);
        }
      }
      if (texture.format === DepthStencilFormat && glInternalFormat === _gl.DEPTH_COMPONENT) {
        // Depth stencil textures need the DEPTH_STENCIL internal format
        // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
        glInternalFormat = _gl.DEPTH_STENCIL;

        // The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
        // DEPTH_STENCIL and type is not UNSIGNED_INT_24_8_WEBGL.
        // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
        if (texture.type !== UnsignedInt248Type) {
          console.warn('THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.');
          texture.type = UnsignedInt248Type;
          glType = utils.convert(texture.type);
        }
      }

      //

      state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null);
    } else if (texture.isDataTexture) {
      // use manually created mipmaps if available
      // if there are no manual mipmaps
      // set 0 level mipmap and then use GL to generate other mipmap levels

      if (mipmaps.length > 0 && supportsMips) {
        for (var i = 0, il = mipmaps.length; i < il; i++) {
          mipmap = mipmaps[i];
          state.texImage2D(_gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
        }
        texture.generateMipmaps = false;
        textureProperties.__maxMipLevel = mipmaps.length - 1;
      } else {
        state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data);
        textureProperties.__maxMipLevel = 0;
      }
    } else if (texture.isCompressedTexture) {
      for (var _i = 0, _il = mipmaps.length; _i < _il; _i++) {
        mipmap = mipmaps[_i];
        if (texture.format !== RGBAFormat && texture.format !== RGBFormat) {
          if (glFormat !== null) {
            state.compressedTexImage2D(_gl.TEXTURE_2D, _i, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
          } else {
            console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()');
          }
        } else {
          state.texImage2D(_gl.TEXTURE_2D, _i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
        }
      }
      textureProperties.__maxMipLevel = mipmaps.length - 1;
    } else if (texture.isDataTexture2DArray) {
      state.texImage3D(_gl.TEXTURE_2D_ARRAY, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data);
      textureProperties.__maxMipLevel = 0;
    } else if (texture.isDataTexture3D) {
      state.texImage3D(_gl.TEXTURE_3D, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data);
      textureProperties.__maxMipLevel = 0;
    } else {
      // regular Texture (image, video, canvas)

      // use manually created mipmaps if available
      // if there are no manual mipmaps
      // set 0 level mipmap and then use GL to generate other mipmap levels

      if (mipmaps.length > 0 && supportsMips) {
        for (var _i2 = 0, _il2 = mipmaps.length; _i2 < _il2; _i2++) {
          mipmap = mipmaps[_i2];
          state.texImage2D(_gl.TEXTURE_2D, _i2, glInternalFormat, glFormat, glType, mipmap);
        }
        texture.generateMipmaps = false;
        textureProperties.__maxMipLevel = mipmaps.length - 1;
      } else {
        state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, glFormat, glType, image);
        textureProperties.__maxMipLevel = 0;
      }
    }
    if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
      generateMipmap(textureType, texture, image.width, image.height);
    }
    textureProperties.__version = texture.version;
    if (texture.onUpdate) texture.onUpdate(texture);
  }
  function uploadCubeTexture(textureProperties, texture, slot) {
    if (texture.image.length !== 6) return;
    initTexture(textureProperties, texture);
    state.activeTexture(_gl.TEXTURE0 + slot);
    state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture);
    _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);
    _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
    _gl.pixelStorei(_gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, _gl.NONE);
    var isCompressed = texture && (texture.isCompressedTexture || texture.image[0].isCompressedTexture);
    var isDataTexture = texture.image[0] && texture.image[0].isDataTexture;
    var cubeImage = [];
    for (var i = 0; i < 6; i++) {
      if (!isCompressed && !isDataTexture) {
        cubeImage[i] = resizeImage(texture.image[i], false, true, maxCubemapSize);
      } else {
        cubeImage[i] = isDataTexture ? texture.image[i].image : texture.image[i];
      }
    }
    var image = cubeImage[0],
      supportsMips = isPowerOf2(image) || isWebGL2,
      glFormat = utils.convert(texture.format),
      glType = utils.convert(texture.type),
      glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType);
    setTextureParameters(_gl.TEXTURE_CUBE_MAP, texture, supportsMips);
    var mipmaps;
    if (isCompressed) {
      for (var _i3 = 0; _i3 < 6; _i3++) {
        mipmaps = cubeImage[_i3].mipmaps;
        for (var j = 0; j < mipmaps.length; j++) {
          var mipmap = mipmaps[j];
          if (texture.format !== RGBAFormat && texture.format !== RGBFormat) {
            if (glFormat !== null) {
              state.compressedTexImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i3, j, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
            } else {
              console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()');
            }
          } else {
            state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i3, j, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
          }
        }
      }
      textureProperties.__maxMipLevel = mipmaps.length - 1;
    } else {
      mipmaps = texture.mipmaps;
      for (var _i4 = 0; _i4 < 6; _i4++) {
        if (isDataTexture) {
          state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i4, 0, glInternalFormat, cubeImage[_i4].width, cubeImage[_i4].height, 0, glFormat, glType, cubeImage[_i4].data);
          for (var _j = 0; _j < mipmaps.length; _j++) {
            var _mipmap = mipmaps[_j];
            var mipmapImage = _mipmap.image[_i4].image;
            state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i4, _j + 1, glInternalFormat, mipmapImage.width, mipmapImage.height, 0, glFormat, glType, mipmapImage.data);
          }
        } else {
          state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i4, 0, glInternalFormat, glFormat, glType, cubeImage[_i4]);
          for (var _j2 = 0; _j2 < mipmaps.length; _j2++) {
            var _mipmap2 = mipmaps[_j2];
            state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i4, _j2 + 1, glInternalFormat, glFormat, glType, _mipmap2.image[_i4]);
          }
        }
      }
      textureProperties.__maxMipLevel = mipmaps.length;
    }
    if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
      // We assume images for cube map have the same size.
      generateMipmap(_gl.TEXTURE_CUBE_MAP, texture, image.width, image.height);
    }
    textureProperties.__version = texture.version;
    if (texture.onUpdate) texture.onUpdate(texture);
  }

  // Render targets

  // Setup storage for target texture and bind it to correct framebuffer
  function setupFrameBufferTexture(framebuffer, renderTarget, attachment, textureTarget) {
    var texture = renderTarget.texture;
    var glFormat = utils.convert(texture.format);
    var glType = utils.convert(texture.type);
    var glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType);
    if (textureTarget === _gl.TEXTURE_3D || textureTarget === _gl.TEXTURE_2D_ARRAY) {
      state.texImage3D(textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, renderTarget.depth, 0, glFormat, glType, null);
    } else {
      state.texImage2D(textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null);
    }
    state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
    _gl.framebufferTexture2D(_gl.FRAMEBUFFER, attachment, textureTarget, properties.get(texture).__webglTexture, 0);
    state.bindFramebuffer(_gl.FRAMEBUFFER, null);
  }

  // Setup storage for internal depth/stencil buffers and bind to correct framebuffer
  function setupRenderBufferStorage(renderbuffer, renderTarget, isMultisample) {
    _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderbuffer);
    if (renderTarget.depthBuffer && !renderTarget.stencilBuffer) {
      var glInternalFormat = _gl.DEPTH_COMPONENT16;
      if (isMultisample) {
        var depthTexture = renderTarget.depthTexture;
        if (depthTexture && depthTexture.isDepthTexture) {
          if (depthTexture.type === FloatType) {
            glInternalFormat = _gl.DEPTH_COMPONENT32F;
          } else if (depthTexture.type === UnsignedIntType) {
            glInternalFormat = _gl.DEPTH_COMPONENT24;
          }
        }
        var samples = getRenderTargetSamples(renderTarget);
        _gl.renderbufferStorageMultisample(_gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height);
      } else {
        _gl.renderbufferStorage(_gl.RENDERBUFFER, glInternalFormat, renderTarget.width, renderTarget.height);
      }
      _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);
    } else if (renderTarget.depthBuffer && renderTarget.stencilBuffer) {
      if (isMultisample) {
        var _samples = getRenderTargetSamples(renderTarget);
        _gl.renderbufferStorageMultisample(_gl.RENDERBUFFER, _samples, _gl.DEPTH24_STENCIL8, renderTarget.width, renderTarget.height);
      } else {
        _gl.renderbufferStorage(_gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height);
      }
      _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer);
    } else {
      var texture = renderTarget.texture;
      var glFormat = utils.convert(texture.format);
      var glType = utils.convert(texture.type);
      var _glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType);
      if (isMultisample) {
        var _samples2 = getRenderTargetSamples(renderTarget);
        _gl.renderbufferStorageMultisample(_gl.RENDERBUFFER, _samples2, _glInternalFormat, renderTarget.width, renderTarget.height);
      } else {
        _gl.renderbufferStorage(_gl.RENDERBUFFER, _glInternalFormat, renderTarget.width, renderTarget.height);
      }
    }
    _gl.bindRenderbuffer(_gl.RENDERBUFFER, null);
  }

  // Setup resources for a Depth Texture for a FBO (needs an extension)
  function setupDepthTexture(framebuffer, renderTarget) {
    var isCube = renderTarget && renderTarget.isWebGLCubeRenderTarget;
    if (isCube) throw new Error('Depth Texture with cube render targets is not supported');
    state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
    if (!(renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture)) {
      throw new Error('renderTarget.depthTexture must be an instance of THREE.DepthTexture');
    }

    // upload an empty depth texture with framebuffer size
    if (!properties.get(renderTarget.depthTexture).__webglTexture || renderTarget.depthTexture.image.width !== renderTarget.width || renderTarget.depthTexture.image.height !== renderTarget.height) {
      renderTarget.depthTexture.image.width = renderTarget.width;
      renderTarget.depthTexture.image.height = renderTarget.height;
      renderTarget.depthTexture.needsUpdate = true;
    }
    setTexture2D(renderTarget.depthTexture, 0);
    var webglDepthTexture = properties.get(renderTarget.depthTexture).__webglTexture;
    if (renderTarget.depthTexture.format === DepthFormat) {
      _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0);
    } else if (renderTarget.depthTexture.format === DepthStencilFormat) {
      _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0);
    } else {
      throw new Error('Unknown depthTexture format');
    }
  }

  // Setup GL resources for a non-texture depth buffer
  function setupDepthRenderbuffer(renderTarget) {
    var renderTargetProperties = properties.get(renderTarget);
    var isCube = renderTarget.isWebGLCubeRenderTarget === true;
    if (renderTarget.depthTexture) {
      if (isCube) throw new Error('target.depthTexture not supported in Cube render targets');
      setupDepthTexture(renderTargetProperties.__webglFramebuffer, renderTarget);
    } else {
      if (isCube) {
        renderTargetProperties.__webglDepthbuffer = [];
        for (var i = 0; i < 6; i++) {
          state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer[i]);
          renderTargetProperties.__webglDepthbuffer[i] = _gl.createRenderbuffer();
          setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer[i], renderTarget, false);
        }
      } else {
        state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer);
        renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
        setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer, renderTarget, false);
      }
    }
    state.bindFramebuffer(_gl.FRAMEBUFFER, null);
  }

  // Set up GL resources for the render target
  function setupRenderTarget(renderTarget) {
    var texture = renderTarget.texture;
    var renderTargetProperties = properties.get(renderTarget);
    var textureProperties = properties.get(texture);
    renderTarget.addEventListener('dispose', onRenderTargetDispose);
    textureProperties.__webglTexture = _gl.createTexture();
    textureProperties.__version = texture.version;
    info.memory.textures++;
    var isCube = renderTarget.isWebGLCubeRenderTarget === true;
    var isMultisample = renderTarget.isWebGLMultisampleRenderTarget === true;
    var isRenderTarget3D = texture.isDataTexture3D || texture.isDataTexture2DArray;
    var supportsMips = isPowerOf2(renderTarget) || isWebGL2;

    // Handles WebGL2 RGBFormat fallback - #18858

    if (isWebGL2 && texture.format === RGBFormat && (texture.type === FloatType || texture.type === HalfFloatType)) {
      texture.format = RGBAFormat;
      console.warn('THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.');
    }

    // Setup framebuffer

    if (isCube) {
      renderTargetProperties.__webglFramebuffer = [];
      for (var i = 0; i < 6; i++) {
        renderTargetProperties.__webglFramebuffer[i] = _gl.createFramebuffer();
      }
    } else {
      renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();
      if (isMultisample) {
        if (isWebGL2) {
          renderTargetProperties.__webglMultisampledFramebuffer = _gl.createFramebuffer();
          renderTargetProperties.__webglColorRenderbuffer = _gl.createRenderbuffer();
          _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer);
          var glFormat = utils.convert(texture.format);
          var glType = utils.convert(texture.type);
          var glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType);
          var samples = getRenderTargetSamples(renderTarget);
          _gl.renderbufferStorageMultisample(_gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height);
          state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer);
          _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer);
          _gl.bindRenderbuffer(_gl.RENDERBUFFER, null);
          if (renderTarget.depthBuffer) {
            renderTargetProperties.__webglDepthRenderbuffer = _gl.createRenderbuffer();
            setupRenderBufferStorage(renderTargetProperties.__webglDepthRenderbuffer, renderTarget, true);
          }
          state.bindFramebuffer(_gl.FRAMEBUFFER, null);
        } else {
          console.warn('THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.');
        }
      }
    }

    // Setup color buffer

    if (isCube) {
      state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture);
      setTextureParameters(_gl.TEXTURE_CUBE_MAP, texture, supportsMips);
      for (var _i5 = 0; _i5 < 6; _i5++) {
        setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer[_i5], renderTarget, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i5);
      }
      if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
        generateMipmap(_gl.TEXTURE_CUBE_MAP, texture, renderTarget.width, renderTarget.height);
      }
      state.bindTexture(_gl.TEXTURE_CUBE_MAP, null);
    } else {
      var glTextureType = _gl.TEXTURE_2D;
      if (isRenderTarget3D) {
        // Render targets containing layers, i.e: Texture 3D and 2d arrays

        if (isWebGL2) {
          var isTexture3D = texture.isDataTexture3D;
          glTextureType = isTexture3D ? _gl.TEXTURE_3D : _gl.TEXTURE_2D_ARRAY;
        } else {
          console.warn('THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.');
        }
      }
      state.bindTexture(glTextureType, textureProperties.__webglTexture);
      setTextureParameters(glTextureType, texture, supportsMips);
      setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, _gl.COLOR_ATTACHMENT0, glTextureType);
      if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
        generateMipmap(_gl.TEXTURE_2D, texture, renderTarget.width, renderTarget.height);
      }
      state.bindTexture(_gl.TEXTURE_2D, null);
    }

    // Setup depth and stencil buffers

    if (renderTarget.depthBuffer) {
      setupDepthRenderbuffer(renderTarget);
    }
  }
  function updateRenderTargetMipmap(renderTarget) {
    var texture = renderTarget.texture;
    var supportsMips = isPowerOf2(renderTarget) || isWebGL2;
    if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
      var target = renderTarget.isWebGLCubeRenderTarget ? _gl.TEXTURE_CUBE_MAP : _gl.TEXTURE_2D;
      var webglTexture = properties.get(texture).__webglTexture;
      state.bindTexture(target, webglTexture);
      generateMipmap(target, texture, renderTarget.width, renderTarget.height);
      state.bindTexture(target, null);
    }
  }
  function updateMultisampleRenderTarget(renderTarget) {
    if (renderTarget.isWebGLMultisampleRenderTarget) {
      if (isWebGL2) {
        var renderTargetProperties = properties.get(renderTarget);
        state.bindFramebuffer(_gl.READ_FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer);
        state.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, renderTargetProperties.__webglFramebuffer);
        var width = renderTarget.width;
        var height = renderTarget.height;
        var mask = _gl.COLOR_BUFFER_BIT;
        if (renderTarget.depthBuffer) mask |= _gl.DEPTH_BUFFER_BIT;
        if (renderTarget.stencilBuffer) mask |= _gl.STENCIL_BUFFER_BIT;
        _gl.blitFramebuffer(0, 0, width, height, 0, 0, width, height, mask, _gl.NEAREST);
        state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer); // see #18905
      } else {
        console.warn('THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.');
      }
    }
  }
  function getRenderTargetSamples(renderTarget) {
    return isWebGL2 && renderTarget.isWebGLMultisampleRenderTarget ? Math.min(maxSamples, renderTarget.samples) : 0;
  }
  function updateVideoTexture(texture) {
    var frame = info.render.frame;

    // Check the last frame we updated the VideoTexture

    if (_videoTextures.get(texture) !== frame) {
      _videoTextures.set(texture, frame);
      texture.update();
    }
  }

  // backwards compatibility

  var warnedTexture2D = false;
  var warnedTextureCube = false;
  function safeSetTexture2D(texture, slot) {
    if (texture && texture.isWebGLRenderTarget) {
      if (warnedTexture2D === false) {
        console.warn('THREE.WebGLTextures.safeSetTexture2D: don\'t use render targets as textures. Use their .texture property instead.');
        warnedTexture2D = true;
      }
      texture = texture.texture;
    }
    setTexture2D(texture.base, slot);
  }
  function safeSetTextureCube(texture, slot) {
    if (texture && texture.isWebGLCubeRenderTarget) {
      if (warnedTextureCube === false) {
        console.warn('THREE.WebGLTextures.safeSetTextureCube: don\'t use cube render targets as textures. Use their .texture property instead.');
        warnedTextureCube = true;
      }
      texture = texture.texture;
    }
    setTextureCube(texture, slot);
  }
  var boundTextures = new Array(maxTextures);
  var emptyTextures = new Array(maxTextures);

  // const emptyGLTexture = new glCore.GLTexture.fromData(gl, null, 1, 1);

  var tempObj = {}; //{ _glTextures: {} };

  // tempObj._glTextures[this.CONTEXT_UID] = {};

  for (var i = 0; i < maxTextures; i++) {
    var empty = new BaseTexture();

    // empty._glTextures[this.CONTEXT_UID] = emptyGLTexture;

    boundTextures[i] = tempObj;
    emptyTextures[i] = empty;
    // boundTextures[i] = null;
    state.activeTexture(_gl.TEXTURE0 + i);
    state.bindTexture(_gl.TEXTURE_2D, null);
    // this.bindTexture(null, i);
  }
  this.boundTextures = boundTextures;
  this.emptyTextures = emptyTextures;
  this.managedTextures = managedTextures;

  //

  this.allocateTextureUnit = allocateTextureUnit;
  this.resetTextureUnits = resetTextureUnits;
  this.setTexture2D = setTexture2D;
  this.setTexture2DArray = setTexture2DArray;
  this.setTexture3D = setTexture3D;
  this.setTextureCube = setTextureCube;
  this.setupRenderTarget = setupRenderTarget;
  this.updateRenderTargetMipmap = updateRenderTargetMipmap;
  this.updateMultisampleRenderTarget = updateMultisampleRenderTarget;
  this.safeSetTexture2D = safeSetTexture2D;
  this.safeSetTextureCube = safeSetTextureCube;
}

;// ./src/webgl-renderer/Utils.js

function WebGLUtils(gl, extensions, capabilities) {
  var isWebGL2 = capabilities.isWebGL2;
  function convert(p) {
    var extension;
    if (p === UnsignedByteType) return gl.UNSIGNED_BYTE;
    if (p === UnsignedShort4444Type) return gl.UNSIGNED_SHORT_4_4_4_4;
    if (p === UnsignedShort5551Type) return gl.UNSIGNED_SHORT_5_5_5_1;
    if (p === UnsignedShort565Type) return gl.UNSIGNED_SHORT_5_6_5;
    if (p === ByteType) return gl.BYTE;
    if (p === ShortType) return gl.SHORT;
    if (p === UnsignedShortType) return gl.UNSIGNED_SHORT;
    if (p === IntType) return gl.INT;
    if (p === UnsignedIntType) return gl.UNSIGNED_INT;
    if (p === FloatType) return gl.FLOAT;
    if (p === HalfFloatType) {
      if (isWebGL2) return gl.HALF_FLOAT;
      extension = extensions.get('OES_texture_half_float');
      if (extension !== null) {
        return extension.HALF_FLOAT_OES;
      } else {
        return null;
      }
    }
    if (p === AlphaFormat) return gl.ALPHA;
    if (p === RGBFormat) return gl.RGB;
    if (p === RGBAFormat) return gl.RGBA;
    if (p === LuminanceFormat) return gl.LUMINANCE;
    if (p === LuminanceAlphaFormat) return gl.LUMINANCE_ALPHA;
    if (p === DepthFormat) return gl.DEPTH_COMPONENT;
    if (p === DepthStencilFormat) return gl.DEPTH_STENCIL;
    if (p === RedFormat) return gl.RED;

    // WebGL2 formats.

    if (p === RedIntegerFormat) return gl.RED_INTEGER;
    if (p === RGFormat) return gl.RG;
    if (p === RGIntegerFormat) return gl.RG_INTEGER;
    if (p === RGBIntegerFormat) return gl.RGB_INTEGER;
    if (p === RGBAIntegerFormat) return gl.RGBA_INTEGER;
    if (p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format || p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format) {
      extension = extensions.get('WEBGL_compressed_texture_s3tc');
      if (extension !== null) {
        if (p === RGB_S3TC_DXT1_Format) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (p === RGBA_S3TC_DXT1_Format) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (p === RGBA_S3TC_DXT3_Format) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (p === RGBA_S3TC_DXT5_Format) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else {
        return null;
      }
    }
    if (p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format || p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format) {
      extension = extensions.get('WEBGL_compressed_texture_pvrtc');
      if (extension !== null) {
        if (p === RGB_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (p === RGB_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (p === RGBA_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (p === RGBA_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else {
        return null;
      }
    }
    if (p === RGB_ETC1_Format) {
      extension = extensions.get('WEBGL_compressed_texture_etc1');
      if (extension !== null) {
        return extension.COMPRESSED_RGB_ETC1_WEBGL;
      } else {
        return null;
      }
    }
    if (p === RGB_ETC2_Format || p === RGBA_ETC2_EAC_Format) {
      extension = extensions.get('WEBGL_compressed_texture_etc');
      if (extension !== null) {
        if (p === RGB_ETC2_Format) return extension.COMPRESSED_RGB8_ETC2;
        if (p === RGBA_ETC2_EAC_Format) return extension.COMPRESSED_RGBA8_ETC2_EAC;
      }
    }
    if (p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format || p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format || p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format || p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format || p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format || p === SRGB8_ALPHA8_ASTC_4x4_Format || p === SRGB8_ALPHA8_ASTC_5x4_Format || p === SRGB8_ALPHA8_ASTC_5x5_Format || p === SRGB8_ALPHA8_ASTC_6x5_Format || p === SRGB8_ALPHA8_ASTC_6x6_Format || p === SRGB8_ALPHA8_ASTC_8x5_Format || p === SRGB8_ALPHA8_ASTC_8x6_Format || p === SRGB8_ALPHA8_ASTC_8x8_Format || p === SRGB8_ALPHA8_ASTC_10x5_Format || p === SRGB8_ALPHA8_ASTC_10x6_Format || p === SRGB8_ALPHA8_ASTC_10x8_Format || p === SRGB8_ALPHA8_ASTC_10x10_Format || p === SRGB8_ALPHA8_ASTC_12x10_Format || p === SRGB8_ALPHA8_ASTC_12x12_Format) {
      extension = extensions.get('WEBGL_compressed_texture_astc');
      if (extension !== null) {
        // TODO Complete?

        return p;
      } else {
        return null;
      }
    }
    if (p === RGBA_BPTC_Format) {
      extension = extensions.get('EXT_texture_compression_bptc');
      if (extension !== null) {
        // TODO Complete?

        return p;
      } else {
        return null;
      }
    }
    if (p === UnsignedInt248Type) {
      if (isWebGL2) return gl.UNSIGNED_INT_24_8;
      extension = extensions.get('WEBGL_depth_texture');
      if (extension !== null) {
        return extension.UNSIGNED_INT_24_8_WEBGL;
      } else {
        return null;
      }
    }
  }
  return {
    convert: convert
  };
}

;// ./src/webgl-renderer/Materials.js

function WebGLMaterials(properties) {
  function refreshFogUniforms(uniforms, fog) {
    uniforms.fogColor.value.copy(fog.color);
    if (fog.isFog) {
      uniforms.fogNear.value = fog.near;
      uniforms.fogFar.value = fog.far;
    } else if (fog.isFogExp2) {
      uniforms.fogDensity.value = fog.density;
    }
  }
  function refreshMaterialUniforms(uniforms, material, pixelRatio, height) {
    if (material.isMeshBasicMaterial) {
      refreshUniformsCommon(uniforms, material);
    } else if (material.isMeshLambertMaterial) {
      refreshUniformsCommon(uniforms, material);
      refreshUniformsLambert(uniforms, material);
    } else if (material.isMeshToonMaterial) {
      refreshUniformsCommon(uniforms, material);
      refreshUniformsToon(uniforms, material);
    } else if (material.isMeshPhongMaterial) {
      refreshUniformsCommon(uniforms, material);
      refreshUniformsPhong(uniforms, material);
    } else if (material.isMeshStandardMaterial) {
      refreshUniformsCommon(uniforms, material);
      if (material.isMeshPhysicalMaterial) {
        refreshUniformsPhysical(uniforms, material);
      } else {
        refreshUniformsStandard(uniforms, material);
      }
    } else if (material.isMeshMatcapMaterial) {
      refreshUniformsCommon(uniforms, material);
      refreshUniformsMatcap(uniforms, material);
    } else if (material.isMeshDepthMaterial) {
      refreshUniformsCommon(uniforms, material);
      refreshUniformsDepth(uniforms, material);
    } else if (material.isMeshDistanceMaterial) {
      refreshUniformsCommon(uniforms, material);
      refreshUniformsDistance(uniforms, material);
    } else if (material.isMeshNormalMaterial) {
      refreshUniformsCommon(uniforms, material);
      refreshUniformsNormal(uniforms, material);
    } else if (material.isLineBasicMaterial) {
      refreshUniformsLine(uniforms, material);
      if (material.isLineDashedMaterial) {
        refreshUniformsDash(uniforms, material);
      }
    } else if (material.isPointsMaterial) {
      refreshUniformsPoints(uniforms, material, pixelRatio, height);
    } else if (material.isSpriteMaterial) {
      refreshUniformsSprites(uniforms, material);
    } else if (material.isShadowMaterial) {
      uniforms.color.value.copy(material.color);
      uniforms.opacity.value = material.opacity;
    } else if (material.isShaderMaterial) {
      material.uniformsNeedUpdate = false; // #15581
    }
  }
  function refreshUniformsCommon(uniforms, material) {
    uniforms.opacity.value = material.opacity;
    if (material.color) {
      uniforms.diffuse.value.copy(material.color);
    }
    if (material.emissive) {
      uniforms.emissive.value.copy(material.emissive).mulScalar(material.emissiveIntensity);
    }
    if (material.map) {
      uniforms.map.value = material.map;
    }
    if (material.alphaMap) {
      uniforms.alphaMap.value = material.alphaMap;
    }
    if (material.specularMap) {
      uniforms.specularMap.value = material.specularMap;
    }
    var envMap = properties.get(material).envMap;
    if (envMap) {
      uniforms.envMap.value = envMap;
      uniforms.flipEnvMap.value = envMap.isCubeTexture && envMap._needsFlipEnvMap ? -1 : 1;
      uniforms.reflectivity.value = material.reflectivity;
      uniforms.refractionRatio.value = material.refractionRatio;
      var maxMipLevel = properties.get(envMap).__maxMipLevel;
      if (maxMipLevel !== undefined) {
        uniforms.maxMipLevel.value = maxMipLevel;
      }
    }
    if (material.lightMap) {
      uniforms.lightMap.value = material.lightMap;
      uniforms.lightMapIntensity.value = material.lightMapIntensity;
    }
    if (material.aoMap) {
      uniforms.aoMap.value = material.aoMap;
      uniforms.aoMapIntensity.value = material.aoMapIntensity;
    }

    // uv repeat and offset setting priorities
    // 1. color map
    // 2. specular map
    // 3. displacementMap map
    // 4. normal map
    // 5. bump map
    // 6. roughnessMap map
    // 7. metalnessMap map
    // 8. alphaMap map
    // 9. emissiveMap map
    // 10. clearcoat map
    // 11. clearcoat normal map
    // 12. clearcoat roughnessMap map

    var uvScaleMap;
    if (material.map) {
      uvScaleMap = material.map;
    } else if (material.specularMap) {
      uvScaleMap = material.specularMap;
    } else if (material.displacementMap) {
      uvScaleMap = material.displacementMap;
    } else if (material.normalMap) {
      uvScaleMap = material.normalMap;
    } else if (material.bumpMap) {
      uvScaleMap = material.bumpMap;
    } else if (material.roughnessMap) {
      uvScaleMap = material.roughnessMap;
    } else if (material.metalnessMap) {
      uvScaleMap = material.metalnessMap;
    } else if (material.alphaMap) {
      uvScaleMap = material.alphaMap;
    } else if (material.emissiveMap) {
      uvScaleMap = material.emissiveMap;
    } else if (material.clearcoatMap) {
      uvScaleMap = material.clearcoatMap;
    } else if (material.clearcoatNormalMap) {
      uvScaleMap = material.clearcoatNormalMap;
    } else if (material.clearcoatRoughnessMap) {
      uvScaleMap = material.clearcoatRoughnessMap;
    }
    if (uvScaleMap !== undefined) {
      // backwards compatibility
      if (uvScaleMap.isWebGLRenderTarget) {
        uvScaleMap = uvScaleMap.texture;
      }
      if (uvScaleMap.matrixAutoUpdate === true) {
        uvScaleMap.updateMatrix();
      }
      uniforms.uvTransform.value.copy(uvScaleMap.matrix);
    }

    // uv repeat and offset setting priorities for uv2
    // 1. ao map
    // 2. light map

    var uv2ScaleMap;
    if (material.aoMap) {
      uv2ScaleMap = material.aoMap;
    } else if (material.lightMap) {
      uv2ScaleMap = material.lightMap;
    }
    if (uv2ScaleMap !== undefined) {
      // backwards compatibility
      if (uv2ScaleMap.isWebGLRenderTarget) {
        uv2ScaleMap = uv2ScaleMap.texture;
      }
      if (uv2ScaleMap.matrixAutoUpdate === true) {
        uv2ScaleMap.updateMatrix();
      }
      uniforms.uv2Transform.value.copy(uv2ScaleMap.matrix);
    }
  }
  function refreshUniformsLine(uniforms, material) {
    uniforms.diffuse.value.copy(material.color);
    uniforms.opacity.value = material.opacity;
  }
  function refreshUniformsDash(uniforms, material) {
    uniforms.dashSize.value = material.dashSize;
    uniforms.totalSize.value = material.dashSize + material.gapSize;
    uniforms.scale.value = material.scale;
  }
  function refreshUniformsPoints(uniforms, material, pixelRatio, height) {
    uniforms.diffuse.value.copy(material.color);
    uniforms.opacity.value = material.opacity;
    uniforms.size.value = material.size * pixelRatio;
    uniforms.scale.value = height * 0.5;
    if (material.map) {
      uniforms.map.value = material.map;
    }
    if (material.alphaMap) {
      uniforms.alphaMap.value = material.alphaMap;
    }

    // uv repeat and offset setting priorities
    // 1. color map
    // 2. alpha map

    var uvScaleMap;
    if (material.map) {
      uvScaleMap = material.map;
    } else if (material.alphaMap) {
      uvScaleMap = material.alphaMap;
    }
    if (uvScaleMap !== undefined) {
      if (uvScaleMap.matrixAutoUpdate === true) {
        uvScaleMap.updateMatrix();
      }
      uniforms.uvTransform.value.copy(uvScaleMap.matrix);
    }
  }
  function refreshUniformsSprites(uniforms, material) {
    uniforms.diffuse.value.copy(material.color);
    uniforms.opacity.value = material.opacity;
    uniforms.rotation.value = material.rotation;
    if (material.map) {
      uniforms.map.value = material.map;
    }
    if (material.alphaMap) {
      uniforms.alphaMap.value = material.alphaMap;
    }

    // uv repeat and offset setting priorities
    // 1. color map
    // 2. alpha map

    var uvScaleMap;
    if (material.map) {
      uvScaleMap = material.map;
    } else if (material.alphaMap) {
      uvScaleMap = material.alphaMap;
    }
    if (uvScaleMap !== undefined) {
      if (uvScaleMap.matrixAutoUpdate === true) {
        uvScaleMap.updateMatrix();
      }
      uniforms.uvTransform.value.copy(uvScaleMap.matrix);
    }
  }
  function refreshUniformsLambert(uniforms, material) {
    if (material.emissiveMap) {
      uniforms.emissiveMap.value = material.emissiveMap;
    }
  }
  function refreshUniformsPhong(uniforms, material) {
    uniforms.specular.value.copy(material.specular);
    uniforms.shininess.value = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )

    if (material.emissiveMap) {
      uniforms.emissiveMap.value = material.emissiveMap;
    }
    if (material.bumpMap) {
      uniforms.bumpMap.value = material.bumpMap;
      uniforms.bumpScale.value = material.bumpScale;
      if (material.side === BackSide) uniforms.bumpScale.value *= -1;
    }
    if (material.normalMap) {
      uniforms.normalMap.value = material.normalMap;
      uniforms.normalScale.value.copy(material.normalScale);
      if (material.side === BackSide) uniforms.normalScale.value.negate();
    }
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
  }
  function refreshUniformsToon(uniforms, material) {
    if (material.gradientMap) {
      uniforms.gradientMap.value = material.gradientMap;
    }
    if (material.emissiveMap) {
      uniforms.emissiveMap.value = material.emissiveMap;
    }
    if (material.bumpMap) {
      uniforms.bumpMap.value = material.bumpMap;
      uniforms.bumpScale.value = material.bumpScale;
      if (material.side === BackSide) uniforms.bumpScale.value *= -1;
    }
    if (material.normalMap) {
      uniforms.normalMap.value = material.normalMap;
      uniforms.normalScale.value.copy(material.normalScale);
      if (material.side === BackSide) uniforms.normalScale.value.negate();
    }
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
  }
  function refreshUniformsStandard(uniforms, material) {
    uniforms.roughness.value = material.roughness;
    uniforms.metalness.value = material.metalness;
    if (material.roughnessMap) {
      uniforms.roughnessMap.value = material.roughnessMap;
    }
    if (material.metalnessMap) {
      uniforms.metalnessMap.value = material.metalnessMap;
    }
    if (material.emissiveMap) {
      uniforms.emissiveMap.value = material.emissiveMap;
    }
    if (material.bumpMap) {
      uniforms.bumpMap.value = material.bumpMap;
      uniforms.bumpScale.value = material.bumpScale;
      if (material.side === BackSide) uniforms.bumpScale.value *= -1;
    }
    if (material.normalMap) {
      uniforms.normalMap.value = material.normalMap;
      uniforms.normalScale.value.copy(material.normalScale);
      if (material.side === BackSide) uniforms.normalScale.value.negate();
    }
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
    var envMap = properties.get(material).envMap;
    if (envMap) {
      //uniforms.envMap.value = material.envMap; // part of uniforms common
      uniforms.envMapIntensity.value = material.envMapIntensity;
    }
  }
  function refreshUniformsPhysical(uniforms, material) {
    refreshUniformsStandard(uniforms, material);
    uniforms.reflectivity.value = material.reflectivity; // also part of uniforms common

    uniforms.clearcoat.value = material.clearcoat;
    uniforms.clearcoatRoughness.value = material.clearcoatRoughness;
    if (material.sheen) uniforms.sheen.value.copy(material.sheen);
    if (material.clearcoatMap) {
      uniforms.clearcoatMap.value = material.clearcoatMap;
    }
    if (material.clearcoatRoughnessMap) {
      uniforms.clearcoatRoughnessMap.value = material.clearcoatRoughnessMap;
    }
    if (material.clearcoatNormalMap) {
      uniforms.clearcoatNormalScale.value.copy(material.clearcoatNormalScale);
      uniforms.clearcoatNormalMap.value = material.clearcoatNormalMap;
      if (material.side === BackSide) {
        uniforms.clearcoatNormalScale.value.negate();
      }
    }
    uniforms.transmission.value = material.transmission;
    if (material.transmissionMap) {
      uniforms.transmissionMap.value = material.transmissionMap;
    }
  }
  function refreshUniformsMatcap(uniforms, material) {
    if (material.matcap) {
      uniforms.matcap.value = material.matcap;
    }
    if (material.bumpMap) {
      uniforms.bumpMap.value = material.bumpMap;
      uniforms.bumpScale.value = material.bumpScale;
      if (material.side === BackSide) uniforms.bumpScale.value *= -1;
    }
    if (material.normalMap) {
      uniforms.normalMap.value = material.normalMap;
      uniforms.normalScale.value.copy(material.normalScale);
      if (material.side === BackSide) uniforms.normalScale.value.negate();
    }
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
  }
  function refreshUniformsDepth(uniforms, material) {
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
  }
  function refreshUniformsDistance(uniforms, material) {
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
    uniforms.referencePosition.value.copy(material.referencePosition);
    uniforms.nearDistance.value = material.nearDistance;
    uniforms.farDistance.value = material.farDistance;
  }
  function refreshUniformsNormal(uniforms, material) {
    if (material.bumpMap) {
      uniforms.bumpMap.value = material.bumpMap;
      uniforms.bumpScale.value = material.bumpScale;
      if (material.side === BackSide) uniforms.bumpScale.value *= -1;
    }
    if (material.normalMap) {
      uniforms.normalMap.value = material.normalMap;
      uniforms.normalScale.value.copy(material.normalScale);
      if (material.side === BackSide) uniforms.normalScale.value.negate();
    }
    if (material.displacementMap) {
      uniforms.displacementMap.value = material.displacementMap;
      uniforms.displacementScale.value = material.displacementScale;
      uniforms.displacementBias.value = material.displacementBias;
    }
  }
  return {
    refreshFogUniforms: refreshFogUniforms,
    refreshMaterialUniforms: refreshMaterialUniforms
  };
}

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

;// ./src/webgl-renderer/utils/createContext.js
// const contextNames = ['webgl2', 'webgl', 'experimental-webgl'];

function getContext(canvas, contextNames, contextAttributes) {
  for (var i = 0; i < contextNames.length; i++) {
    var contextName = contextNames[i];
    var context = canvas.getContext(contextName, contextAttributes);
    if (context !== null) return context;
  }
  return null;
}
function createContext(canvas, contextAttributes, forceWebGL1) {
  var contextNames = ['webgl2', 'webgl', 'experimental-webgl'];
  if (forceWebGL1) contextNames.shift();
  var _gl = getContext(canvas, contextNames, contextAttributes);
  if (_gl === null) {
    if (getContext(canvas, contextNames)) {
      throw new Error('Error creating WebGL context with your selected attributes.');
    } else {
      throw new Error('Error creating WebGL context.');
    }
  }
  return _gl;
}
;// ./src/webgl-renderer/WebGLRenderer.js
















// import { WebGLCubeMaps } from './CubeMaps.js';










// import { WebGLShadowMap } from './ShadowMap.js';

// import { WebGLRawState } from './RawState.js';



// import { WebXRManager } from './webxr/WebXRManager.js';




function createCanvasElement() {
  var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
  canvas.style.display = 'block';
  return canvas;
}
function WebGLRenderer(parameters) {
  EventTarget.mixin(this);
  parameters = parameters || {};
  var _canvas = parameters.canvas !== undefined ? parameters.canvas : createCanvasElement(),
    _context = parameters.context !== undefined ? parameters.context : null,
    _alpha = parameters.alpha !== undefined ? parameters.alpha : false,
    _depth = parameters.depth !== undefined ? parameters.depth : true,
    // глибина для 3Д - обовязково true, але для 2Д, разом з antialias працюєє гірше
    _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
    _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
    _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
    _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
    _powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default',
    _failIfMajorPerformanceCaveat = parameters.failIfMajorPerformanceCaveat !== undefined ? parameters.failIfMajorPerformanceCaveat : false;
  var currentRenderList = null;
  var currentRenderState = null;

  // render() can be called from within a callback triggered by another render.
  // We track this so that the nested render call gets its list and state isolated from the parent render call.

  var renderListStack = [];
  var renderStateStack = [];

  // public properties

  this.domElement = _canvas;
  this.autoResize = parameters.autoResize || false;

  // Debug configuration container
  this.debug = {
    /**
     * Enables error checking and reporting when shader programs are being compiled
     * @type {boolean}
     */
    checkShaderErrors: true
  };

  // clearing

  this.autoClear = true;
  this.autoClearColor = true;
  this.autoClearDepth = true;
  this.autoClearStencil = true;

  // scene graph

  this.sortObjects = true;

  // user-defined clipping

  this.clippingPlanes = [];
  this.localClippingEnabled = false;

  // physically based shading

  this.gammaFactor = 2.0; // for backwards compatibility
  this.outputEncoding = LinearEncoding;

  // physical lights

  this.physicallyCorrectLights = false;

  // tone mapping

  this.toneMapping = NoToneMapping;
  this.toneMappingExposure = 1.0;
  this.initSystems();

  // internal properties

  var _this = this;
  var _isContextLost = false;

  // internal state cache

  var _currentActiveCubeFace = 0;
  var _currentActiveMipmapLevel = 0;
  var _currentRenderTarget = null;
  var _currentMaterialId = -1;
  var _currentCamera = null;
  var _currentViewport = new Vec4();
  var _currentScissor = new Vec4();
  var _currentScissorTest = null;
  var _width = parameters.width || 800;
  var _height = parameters.height || 600;
  var _pixelRatio = this.resolution = parameters.resolution || 1;
  var _opaqueSort = null;
  var _transparentSort = null;
  var _viewport = new Vec4(0, 0, _width, _height);
  var _scissor = new Vec4(0, 0, _width, _height);
  var _scissorTest = false;

  // frustum

  var _frustum = new Frustum();

  // clipping

  var _clippingEnabled = false;
  var _localClippingEnabled = false;

  // camera matrices cache

  var _projScreenMatrix = new Mat4();
  var _vector3 = new Vec3();
  var _emptyScene = {
    background: null,
    fog: null,
    environment: null,
    overrideMaterial: null,
    isScene: true
  };
  function getTargetPixelRatio() {
    return _currentRenderTarget === null ? _pixelRatio : 1;
  }

  // initialize

  var _gl = _context;
  try {
    var contextAttributes = {
      alpha: _alpha,
      depth: _depth,
      stencil: _stencil,
      antialias: _antialias,
      premultipliedAlpha: _premultipliedAlpha,
      preserveDrawingBuffer: _preserveDrawingBuffer,
      powerPreference: _powerPreference,
      failIfMajorPerformanceCaveat: _failIfMajorPerformanceCaveat
    };

    // event listeners must be registered before WebGL context is created, see #12753

    _canvas.addEventListener('webglcontextlost', onContextLost, false);
    _canvas.addEventListener('webglcontextrestored', onContextRestore, false);
    if (_gl === null) {
      _gl = createContext(_canvas, contextAttributes, _this.isWebGL1Renderer);
    }

    // Some experimental-webgl implementations do not have getShaderPrecisionFormat

    if (_gl.getShaderPrecisionFormat === undefined) {
      _gl.getShaderPrecisionFormat = function () {
        return {
          'rangeMin': 1,
          'rangeMax': 1,
          'precision': 1
        };
      };
    }
  } catch (error) {
    console.error('THREE.WebGLRenderer: ' + error.message);
    throw error;
  }
  var extensions, capabilities, state, info;
  var properties, textures, cubemaps, attributes, geometries, objects;
  var programCache, materials, renderLists, renderStates, clipping, shadowMap;
  var background, morphtargets, bufferRenderer, indexedBufferRenderer;
  var utils, bindingStates;
  function initGLContext() {
    extensions = new WebGLExtensions(_gl);
    capabilities = new WebGLCapabilities(_gl, extensions, parameters);
    extensions.init(capabilities);
    utils = new WebGLUtils(_gl, extensions, capabilities);
    state = new WebGLState(_gl, extensions, capabilities);

    // rawState = new WebGLRawState( _gl, capabilities );

    info = new WebGLInfo(_gl);
    properties = new WebGLProperties();
    textures = new WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info, _this.textureGC);
    // cubemaps = new WebGLCubeMaps( _this );
    attributes = new WebGLAttributes(_gl, capabilities);
    bindingStates = new WebGLBindingStates(_gl, extensions, attributes, capabilities);
    geometries = new WebGLGeometries(_gl, attributes, info, bindingStates);
    objects = new WebGLObjects(_gl, geometries, attributes, info);
    // spriteBatch = new SpriteBatch( _gl, attributes, info );
    morphtargets = new WebGLMorphtargets(_gl);
    clipping = new WebGLClipping(properties);
    programCache = new WebGLPrograms(_this, "cubemaps", extensions, capabilities, bindingStates, clipping);
    materials = new WebGLMaterials(properties);
    renderLists = new WebGLRenderLists(properties);
    renderStates = new WebGLRenderStates(extensions, capabilities);
    background = new WebGLBackground(_this, "cubemaps", state, objects, _premultipliedAlpha);
    // shadowMap = new WebGLShadowMap( _this, objects, capabilities );

    bufferRenderer = new WebGLBufferRenderer(_gl, extensions, info, capabilities);
    indexedBufferRenderer = new WebGLIndexedBufferRenderer(_gl, extensions, info, capabilities);
    info.programs = programCache.programs;
    _this.capabilities = capabilities;
    _this.extensions = extensions;
    _this.properties = properties;
    _this.renderLists = renderLists;
    _this.textures = textures;
    // _this.shadowMap = shadowMap;
    _this.shadowMap = {};
    _this.state = state;
    // _this.rawState = rawState;
    _this.info = info;
    _this.gl = _gl;
    _this.emit('context', _gl);
  }

  // xr

  // const xr = new WebXRManager( _this, _gl );

  // this.xr = xr;

  // API

  this.getContext = function () {
    return _gl;
  };
  this.getContextAttributes = function () {
    return _gl.getContextAttributes();
  };
  this.forceContextLoss = function () {
    var extension = extensions.get('WEBGL_lose_context');
    if (extension) extension.loseContext();
  };
  this.forceContextRestore = function () {
    var extension = extensions.get('WEBGL_lose_context');
    if (extension) extension.restoreContext();
  };
  this.getPixelRatio = function () {
    return _pixelRatio;
  };
  this.setPixelRatio = function (value) {
    if (value === undefined) return;
    _pixelRatio = this.resolution = value;
    this.resize(_width, _height, false);
  };
  this.getSize = function (target) {
    if (target === undefined) {
      console.warn('WebGLRenderer: .getsize() now requires a Vec2 as an argument');
      target = new Vec2();
    }
    return target.set(_width, _height);
  };
  this.resize = function (width, height, updateStyle) {
    // if ( xr.isPresenting ) {

    // 	console.warn( 'THREE.WebGLRenderer: Can\'t change size while VR device is presenting.' );
    // 	return;

    // }

    _width = width;
    _height = height;
    _canvas.width = Math.floor(width * _pixelRatio);
    _canvas.height = Math.floor(height * _pixelRatio);
    if (updateStyle !== false && this.autoResize) {
      _canvas.style.width = width + 'px';
      _canvas.style.height = height + 'px';
    }
    this.setViewport(0, 0, width, height);
  };
  this.getDrawingBufferSize = function (target) {
    if (target === undefined) {
      console.warn('WebGLRenderer: .getdrawingBufferSize() now requires a Vec2 as an argument');
      target = new Vec2();
    }
    return target.set(_width * _pixelRatio, _height * _pixelRatio).floor();
  };
  this.setDrawingBufferSize = function (width, height, pixelRatio) {
    _width = width;
    _height = height;
    _pixelRatio = pixelRatio;
    _canvas.width = Math.floor(width * pixelRatio);
    _canvas.height = Math.floor(height * pixelRatio);
    this.setViewport(0, 0, width, height);
  };
  this.getCurrentViewport = function (target) {
    if (target === undefined) {
      console.warn('WebGLRenderer: .getCurrentViewport() now requires a Vec4 as an argument');
      target = new Vec4();
    }
    return target.copy(_currentViewport);
  };
  this.getViewport = function (target) {
    return target.copy(_viewport);
  };
  this.setViewport = function (x, y, width, height) {
    if (x.isVec4) {
      _viewport.set(x.x, x.y, x.z, x.w);
    } else {
      _viewport.set(x, y, width, height);
    }
    state.viewport(_currentViewport.copy(_viewport).mulScalar(_pixelRatio).floor());
  };
  this.getScissor = function (target) {
    return target.copy(_scissor);
  };
  this.setScissor = function (x, y, width, height) {
    if (x.isVec4) {
      _scissor.set(x.x, x.y, x.z, x.w);
    } else {
      _scissor.set(x, y, width, height);
    }
    state.scissor(_currentScissor.copy(_scissor).mulScalar(_pixelRatio).floor());
  };
  this.getScissorTest = function () {
    return _scissorTest;
  };
  this.setScissorTest = function (_boolean) {
    state.setScissorTest(_scissorTest = _boolean);
  };
  this.setOpaqueSort = function (method) {
    _opaqueSort = method;
  };
  this.setTransparentSort = function (method) {
    _transparentSort = method;
  };

  // Clearing

  this.getClearColor = function (target) {
    if (target === undefined) {
      console.warn('WebGLRenderer: .getClearColor() now requires a Color as an argument');
      target = new Color();
    }
    return target.copy(background.getClearColor());
  };
  this.setClearColor = function () {
    background.setClearColor.apply(background, arguments);
  };
  this.getClearAlpha = function () {
    return background.getClearAlpha();
  };
  this.setClearAlpha = function () {
    background.setClearAlpha.apply(background, arguments);
  };
  this.clear = function (color, depth, stencil) {
    var bits = 0;
    if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
    if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
    if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;
    _gl.clear(bits);
  };
  this.clearColor = function () {
    this.clear(true, false, false);
  };
  this.clearDepth = function () {
    this.clear(false, true, false);
  };
  this.clearStencil = function () {
    this.clear(false, false, true);
  };

  //

  this.dispose = function () {
    _canvas.removeEventListener('webglcontextlost', onContextLost, false);
    _canvas.removeEventListener('webglcontextrestored', onContextRestore, false);
    renderLists.dispose();
    renderStates.dispose();
    properties.dispose();
    cubemaps.dispose();
    objects.dispose();
    bindingStates.dispose();

    // xr.dispose();

    // xr.removeEventListener( 'sessionstart', onXRSessionStart );
    // xr.removeEventListener( 'sessionend', onXRSessionEnd );

    animation.stop();
  };
  initGLContext();

  // Events

  function onContextLost(event) {
    event.preventDefault();
    console.log('THREE.WebGLRenderer: Context Lost.');
    _isContextLost = true;
  }
  function onContextRestore(/* event */
  ) {
    console.log('THREE.WebGLRenderer: Context Restored.');
    _isContextLost = false;
    var infoAutoReset = info.autoReset;
    var shadowMapEnabled = shadowMap.enabled;
    var shadowMapAutoUpdate = shadowMap.autoUpdate;
    var shadowMapNeedsUpdate = shadowMap.needsUpdate;
    var shadowMapType = shadowMap.type;
    initGLContext();
    info.autoReset = infoAutoReset;
    shadowMap.enabled = shadowMapEnabled;
    shadowMap.autoUpdate = shadowMapAutoUpdate;
    shadowMap.needsUpdate = shadowMapNeedsUpdate;
    shadowMap.type = shadowMapType;
  }
  function onMaterialDispose() {
    var material = this;
    material.off('dispose', onMaterialDispose, material);
    deallocateMaterial(material);
  }

  // Buffer deallocation

  function deallocateMaterial(material) {
    releaseMaterialProgramReferences(material);
    properties.remove(material);
  }
  function releaseMaterialProgramReferences(material) {
    var programs = properties.get(material).programs;
    if (programs !== undefined) {
      programs.forEach(function (program) {
        programCache.releaseProgram(program);
      });
    }
  }

  // Buffer rendering

  function renderObjectImmediate(object, program) {
    object.render(function (object) {
      _this.renderBufferImmediate(object, program);
    });
  }
  this.renderBufferImmediate = function (object, program) {
    bindingStates.initAttributes();
    var buffers = properties.get(object);
    if (object.hasPositions && !buffers.position) buffers.position = _gl.createBuffer();
    if (object.hasNormals && !buffers.normal) buffers.normal = _gl.createBuffer();
    if (object.hasUvs && !buffers.uv) buffers.uv = _gl.createBuffer();
    if (object.hasColors && !buffers.color) buffers.color = _gl.createBuffer();
    var programAttributes = program.getAttributes();
    if (object.hasPositions) {
      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffers.position);
      _gl.bufferData(_gl.ARRAY_BUFFER, object.positionArray, _gl.DYNAMIC_DRAW);
      bindingStates.enableAttribute(programAttributes.position);
      _gl.vertexAttribPointer(programAttributes.position, 3, _gl.FLOAT, false, 0, 0);
    }
    if (object.hasNormals) {
      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffers.normal);
      _gl.bufferData(_gl.ARRAY_BUFFER, object.normalArray, _gl.DYNAMIC_DRAW);
      bindingStates.enableAttribute(programAttributes.normal);
      _gl.vertexAttribPointer(programAttributes.normal, 3, _gl.FLOAT, false, 0, 0);
    }
    if (object.hasUvs) {
      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffers.uv);
      _gl.bufferData(_gl.ARRAY_BUFFER, object.uvArray, _gl.DYNAMIC_DRAW);
      bindingStates.enableAttribute(programAttributes.uv);
      _gl.vertexAttribPointer(programAttributes.uv, 2, _gl.FLOAT, false, 0, 0);
    }
    if (object.hasColors) {
      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffers.color);
      _gl.bufferData(_gl.ARRAY_BUFFER, object.colorArray, _gl.DYNAMIC_DRAW);
      bindingStates.enableAttribute(programAttributes.color);
      _gl.vertexAttribPointer(programAttributes.color, 3, _gl.FLOAT, false, 0, 0);
    }
    bindingStates.disableUnusedAttributes();
    _gl.drawArrays(_gl.TRIANGLES, 0, object.count);
    object.count = 0;
  };
  this.renderBufferDirect = function (camera, scene, geometry, material, object, group) {
    if (scene === null) scene = _emptyScene; // renderBufferDirect second parameter used to be fog (could be null)

    var frontFaceCW = object.isMesh && object.matrixWorld.determinant() < 0;
    var program = setProgram(camera, scene, material, object);
    state.setMaterial(material, frontFaceCW);

    //

    var index = geometry.index;
    var position = geometry.attributes.position;

    //

    if (index === null) {
      if (position === undefined || position.count === 0) return;
    } else if (index.count === 0) {
      return;
    }

    //

    var rangeFactor = 1;
    if (material.wireframe === true) {
      index = geometries.getWireframeAttribute(geometry);
      rangeFactor = 2;
    }
    if (material.morphTargets || material.morphNormals) {
      morphtargets.update(object, geometry, material, program);
    }
    bindingStates.setup(object, material, program, geometry, index);
    var attribute;
    var renderer = bufferRenderer;
    if (index !== null) {
      attribute = attributes.get(index);
      renderer = indexedBufferRenderer;
      renderer.setIndex(attribute);
    }

    //

    var dataCount = index !== null ? index.count : position.count;
    var rangeStart = geometry.drawRange.start * rangeFactor;
    var rangeCount = geometry.drawRange.count * rangeFactor;
    var groupStart = group !== null ? group.start * rangeFactor : 0;
    var groupCount = group !== null ? group.count * rangeFactor : Infinity;
    var drawStart = Math.max(rangeStart, groupStart);
    var drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;
    var drawCount = Math.max(0, drawEnd - drawStart + 1);
    if (drawCount === 0) return;

    //

    if (object.isMesh) {
      if (material.wireframe === true) {
        state.setLineWidth(material.wireframeLinewidth * getTargetPixelRatio());
        renderer.setMode(_gl.LINES);
      } else {
        renderer.setMode(_gl.TRIANGLES);
      }
    } else if (object.isLine) {
      var lineWidth = material.linewidth;
      if (lineWidth === undefined) lineWidth = 1; // Not using Line*Material

      state.setLineWidth(lineWidth * getTargetPixelRatio());
      if (object.isLineSegments) {
        renderer.setMode(_gl.LINES);
      } else if (object.isLineLoop) {
        renderer.setMode(_gl.LINE_LOOP);
      } else {
        renderer.setMode(_gl.LINE_STRIP);
      }
    } else if (object.isPoints) {
      renderer.setMode(_gl.POINTS);
    } else if (object.isSprite) {
      renderer.setMode(_gl.TRIANGLES);
    }
    if (object.isInstancedMesh) {
      renderer.renderInstances(drawStart, drawCount, object.count);
    } else if (geometry.isInstancedBufferGeometry) {
      var instanceCount = Math.min(geometry.instanceCount, geometry._maxInstanceCount);
      renderer.renderInstances(drawStart, drawCount, instanceCount);
    } else {
      renderer.render(drawStart, drawCount);
    }
  };

  // Compile

  this.compile = function (scene, camera) {
    currentRenderState = renderStates.get(scene);
    currentRenderState.init();
    scene.traverseVisible(function (object) {
      if (object.isLight && object.layers.test(camera.layers)) {
        currentRenderState.pushLight(object);
        if (object.castShadow) {
          currentRenderState.pushShadow(object);
        }
      }
    });
    currentRenderState.setupLights();
    scene.traverse(function (object) {
      var material = object.material;
      if (material) {
        if (Array.isArray(material)) {
          for (var i = 0; i < material.length; i++) {
            var material2 = material[i];
            getProgram(material2, scene, object);
          }
        } else {
          getProgram(material, scene, object);
        }
      }
    });
  };

  // Animation Loop

  var onAnimationFrameCallback = null;
  function onAnimationFrame(time) {
    if (onAnimationFrameCallback) onAnimationFrameCallback(time);
  }

  // function onXRSessionStart() {

  // 	animation.stop();

  // }

  // function onXRSessionEnd() {

  // 	animation.start();

  // }

  var animation = new WebGLAnimation();
  animation.setAnimationLoop(onAnimationFrame);
  if (typeof window !== 'undefined') animation.setContext(window);
  this.setAnimationLoop = function (callback) {
    onAnimationFrameCallback = callback;
    // xr.setAnimationLoop( callback );

    callback === null ? animation.stop() : animation.start();
  };
  var currentRenderer;
  if (Tiny.ObjectRenderer) currentRenderer = new Tiny.ObjectRenderer(this);
  this.setObjectRenderer = function (objectRenderer) {
    console.log(objectRenderer);
    if (currentRenderer === objectRenderer) {
      return;
    }
    currentRenderer.stop();
    currentRenderer = objectRenderer;
    currentRenderer.start();
  };

  // xr.addEventListener( 'sessionstart', onXRSessionStart );
  // xr.addEventListener( 'sessionend', onXRSessionEnd );

  // Rendering

  this.render = function (scene, camera) {
    // let renderTarget, forceClear;

    // if ( arguments[ 2 ] !== undefined ) {

    // 	console.warn( 'THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead.' );
    // 	renderTarget = arguments[ 2 ];

    // }

    // if ( arguments[ 3 ] !== undefined ) {

    // 	console.warn( 'THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead.' );
    // 	forceClear = arguments[ 3 ];

    // }

    if (camera !== undefined && camera.isCamera !== true) {
      console.error('THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.');
      return;
    }
    if (_isContextLost === true) return;

    // update scene graph

    if (scene.autoUpdate === true) scene.updateChildren();
    if (!camera) {
      state.setCullFace(CullFaceNone);
      background.render(currentRenderList, scene);
      render2D(scene);

      // state.buffers.depth.setTest( true );
      // state.buffers.depth.setMask( true );
      // state.buffers.color.setMask( true );

      // state.setPolygonOffset( false );

      _gl.finish();

      // bindingStates.resetDefaultState();
      // _currentMaterialId = - 1;
      // _currentCamera = null;

      return;
    }

    // update camera matrices and frustum

    if (camera.parent === null) camera.updateTransform();

    // if ( xr.enabled === true && xr.isPresenting === true ) {

    // 	camera = xr.getCamera( camera );

    // }

    //
    // if ( scene.isScene === true ) scene.onBeforeRender( _this, scene, camera, renderTarget || _currentRenderTarget );

    // state.setCullFace( CullFaceNone ); render2D(scene.children[2]); return;

    currentRenderState = renderStates.get(scene, renderStateStack.length);
    currentRenderState.init();
    renderStateStack.push(currentRenderState);
    _projScreenMatrix.mul2(camera.projectionMatrix, camera.matrixWorldInverse);
    _frustum.setFromMatrix(_projScreenMatrix);
    _localClippingEnabled = this.localClippingEnabled;
    _clippingEnabled = clipping.init(this.clippingPlanes, _localClippingEnabled, camera);
    currentRenderList = renderLists.get(scene, renderListStack.length);
    currentRenderList.init();
    renderListStack.push(currentRenderList);
    var children = scene.children;
    for (var i = 0, l = children.length; i < l; i++) {
      projectObject(children[i], camera, 0, _this.sortObjects);
    }
    currentRenderList.finish();
    if (_this.sortObjects === true) {
      currentRenderList.sort(_opaqueSort, _transparentSort);
    }
    if (_clippingEnabled === true) clipping.beginShadows();
    var shadowsArray = currentRenderState.state.shadowsArray;

    // shadowMap.render( shadowsArray, scene, camera );

    currentRenderState.setupLights();
    currentRenderState.setupLightsView(camera);
    if (_clippingEnabled === true) clipping.endShadows();

    //

    if (this.info.autoReset === true) this.info.reset();

    // if ( renderTarget !== undefined ) {

    // 	this.setRenderTarget( renderTarget );

    // }

    //

    background.render(currentRenderList, scene, camera);
    // window.currentRenderList = currentRenderList;

    // render scene

    var opaqueObjects = currentRenderList.opaque;
    var transparentObjects = currentRenderList.transparent;
    var screenObjects = currentRenderList.screen;
    if (opaqueObjects.length > 0) renderObjects(opaqueObjects, scene, camera);
    if (transparentObjects.length > 0) renderObjects(transparentObjects, scene, camera);
    if (screenObjects.length > 0) renderScreens(screenObjects);

    //

    if (_currentRenderTarget !== null) {
      // Generate mipmap if we're using any kind of mipmap filtering

      textures.updateRenderTargetMipmap(_currentRenderTarget);

      // resolve multisample renderbuffers to a single-sample texture if necessary

      textures.updateMultisampleRenderTarget(_currentRenderTarget);
    }

    //

    // if ( scene.isScene === true ) scene.onAfterRender( _this, scene, camera );

    // Ensure depth buffer writing is enabled so it can be cleared on next render

    state.buffers.depth.setTest(true);
    state.buffers.depth.setMask(true);
    state.buffers.color.setMask(true);
    state.setPolygonOffset(false);
    _gl.finish();
    bindingStates.resetDefaultState();
    _currentMaterialId = -1;
    _currentCamera = null;
    renderStateStack.pop();
    if (renderStateStack.length > 0) {
      currentRenderState = renderStateStack[renderStateStack.length - 1];
    } else {
      currentRenderState = null;
    }
    renderListStack.pop();
    if (renderListStack.length > 0) {
      currentRenderList = renderListStack[renderListStack.length - 1];
    } else {
      currentRenderList = null;
    }
  };
  function projectObject(object, camera, groupOrder, sortObjects) {
    if (object.visible === false) return;
    if (object.isScreen) {
      // object.update();
      currentRenderList.screen.push(object);
      return;
    }
    var visible = object.layers.test(camera.layers);
    if (visible) {
      if (object.isGroup) {
        groupOrder = object.renderOrder;
      } else if (object.isLOD) {
        if (object.autoUpdate === true) object.update(camera);
      } else if (object.isLight) {
        currentRenderState.pushLight(object);
        if (object.castShadow) {
          currentRenderState.pushShadow(object);
        }
      } else if (object.isSprite) {
        if (!object.frustumCulled || _frustum.intersectsSprite(object)) {
          if (sortObjects) {
            _vector3.setFromMatrixPosition(object.matrixWorld).applyMat4(_projScreenMatrix);
          }
          var geometry = objects.update(object);
          var material = object.material;
          if (material.visible) {
            currentRenderList.push(object, geometry, material, groupOrder, _vector3.z, null);
          }
        }
      } else if (object.isImmediateRenderObject) {
        if (sortObjects) {
          _vector3.setFromMatrixPosition(object.matrixWorld).applyMat4(_projScreenMatrix);
        }
        currentRenderList.push(object, null, object.material, groupOrder, _vector3.z, null);
      } else if (object.isMesh || object.isLine || object.isPoints) {
        if (object.isSkinnedMesh) {
          // update skeleton only once in a frame

          if (object.skeleton.frame !== info.render.frame) {
            object.skeleton.update();
            object.skeleton.frame = info.render.frame;
          }
        }
        if (!object.frustumCulled || _frustum.intersectsObject(object)) {
          if (sortObjects) {
            _vector3.setFromMatrixPosition(object.matrixWorld).applyMat4(_projScreenMatrix);
          }
          var _geometry = objects.update(object);
          var _material = object.material;
          if (Array.isArray(_material)) {
            var groups = _geometry.groups;
            for (var i = 0, l = groups.length; i < l; i++) {
              var group = groups[i];
              var groupMaterial = _material[group.materialIndex];
              if (groupMaterial && groupMaterial.visible) {
                currentRenderList.push(object, _geometry, groupMaterial, groupOrder, _vector3.z, group);
              }
            }
          } else if (_material.visible) {
            currentRenderList.push(object, _geometry, _material, groupOrder, _vector3.z, null);
          }
        }
      }
    }
    var children = object.children;
    for (var _i = 0, _l = children.length; _i < _l; _i++) {
      projectObject(children[_i], camera, groupOrder, sortObjects);
    }
  }
  function render2D(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
    // can be handy to know!
    // this.renderingToScreen = !renderTexture;

    _this.emit('prerender');

    // no point rendering if our context has been blown up!
    // if (!this.gl || this.gl.isContextLost())
    // {
    //     return;
    // }

    // this._nextTextureLocation = 0;

    // if (!renderTexture)
    // {
    //     this._lastObjectRendered = displayObject;
    // }

    // if (!skipUpdateTransform)
    // {
    //     // update the scene graph
    //     const cacheParent = displayObject.parent;

    //     displayObject.parent = this._tempDisplayObjectParent;
    //     displayObject.updateTransform();
    //     displayObject.parent = cacheParent;
    //    // displayObject.hitArea = //TODO add a temp hit area
    // }

    // this.bindRenderTexture(renderTexture, transform);

    currentRenderer.start();

    // if (clear !== undefined ? clear : this.clearBeforeRender)
    // {
    //     this._activeRenderTarget.clear();
    // }

    for (var i = 0, l = displayObject.children.length; i < l; i++) {
      displayObject.children[i].render(_this);
    }

    // apply transform..
    currentRenderer.flush();

    // this.setObjectRenderer(this.emptyRenderer);

    // _this.textureGC.update();

    _this.emit('postrender');
  }
  function renderScreens(renderList) {
    // state.bindGeometry(null);
    bindingStates.reset();
    state.setCullFace(CullFaceNone);
    for (var i = 0, l = renderList.length; i < l; i++) {
      render2D(renderList[i]);
      // renderList[ i ].renderWebGL()
    }
    state.setCullFace(CullFaceBack);
    state.enable(_gl.CULL_FACE);
    state.bindGeometry(null);
  }
  function renderObjects(renderList, scene, camera) {
    var overrideMaterial = null; //scene.isScene === true ? scene.overrideMaterial : null;

    for (var i = 0, l = renderList.length; i < l; i++) {
      var renderItem = renderList[i];
      var object = renderItem.object;
      var geometry = renderItem.geometry;
      var material = overrideMaterial === null ? renderItem.material : overrideMaterial;
      var group = renderItem.group;
      if (camera.isArrayCamera) {
        var cameras = camera.cameras;
        for (var j = 0, jl = cameras.length; j < jl; j++) {
          var camera2 = cameras[j];
          if (object.layers.test(camera2.layers)) {
            state.viewport(_currentViewport.copy(camera2.viewport));
            currentRenderState.setupLightsView(camera2);
            renderObject(object, scene, camera2, geometry, material, group);
          }
        }
      } else {
        renderObject(object, scene, camera, geometry, material, group);
      }
    }
  }
  function renderObject(object, scene, camera, geometry, material, group) {
    object.onBeforeRender(_this, scene, camera, geometry, material, group);
    object.modelViewMatrix.mul2(camera.matrixWorldInverse, object.matrixWorld);
    object.normalMatrix.getNormalMatrix(object.modelViewMatrix);
    if (object.isImmediateRenderObject) {
      var program = setProgram(camera, scene, material, object);
      state.setMaterial(material);
      bindingStates.reset();
      renderObjectImmediate(object, program);
    } else {
      _this.renderBufferDirect(camera, scene, geometry, material, object, group);
    }
    object.onAfterRender(_this, scene, camera, geometry, material, group);
  }
  function getProgram(material, scene, object) {
    if (scene.isScene !== true) scene = _emptyScene; // scene could be a Mesh, Line, Points, ...

    var materialProperties = properties.get(material);
    var lights = currentRenderState.state.lights;
    var shadowsArray = currentRenderState.state.shadowsArray;
    var lightsStateVersion = lights.state.version;
    var parameters = programCache.getParameters(material, lights.state, shadowsArray, scene, object);
    var programCacheKey = programCache.getProgramCacheKey(parameters);
    var programs = materialProperties.programs;

    // always update environment and fog - changing these trigger an getProgram call, but it's possible that the program doesn't change

    materialProperties.environment = material.isMeshStandardMaterial ? scene.environment : null;
    materialProperties.fog = scene.fog;
    // materialProperties.envMap = cubemaps.get( material.envMap || materialProperties.environment );

    if (programs === undefined) {
      // new material

      material.on('dispose', onMaterialDispose, material);
      programs = new Map();
      materialProperties.programs = programs;
    }
    var program = programs.get(programCacheKey);
    if (program !== undefined) {
      // early out if program and light state is identical

      if (materialProperties.currentProgram === program && materialProperties.lightsStateVersion === lightsStateVersion) {
        updateCommonMaterialProperties(material, parameters);
        return program;
      }
    } else {
      parameters.uniforms = programCache.getUniforms(material);
      material.onBeforeCompile(parameters, _this);
      program = programCache.acquireProgram(parameters, programCacheKey);
      programs.set(programCacheKey, program);
      materialProperties.uniforms = parameters.uniforms;
    }
    var uniforms = materialProperties.uniforms;
    if (!material.isShaderMaterial && !material.isRawShaderMaterial || material.clipping === true) {
      uniforms.clippingPlanes = clipping.uniform;
    }
    updateCommonMaterialProperties(material, parameters);

    // store the light setup it was created for

    materialProperties.needsLights = materialNeedsLights(material);
    materialProperties.lightsStateVersion = lightsStateVersion;
    if (materialProperties.needsLights) {
      // wire up the material to this renderer's lighting state

      uniforms.ambientLightColor.value = lights.state.ambient;
      uniforms.lightProbe.value = lights.state.probe;
      uniforms.directionalLights.value = lights.state.directional;
      uniforms.directionalLightShadows.value = lights.state.directionalShadow;
      uniforms.spotLights.value = lights.state.spot;
      uniforms.spotLightShadows.value = lights.state.spotShadow;
      uniforms.rectAreaLights.value = lights.state.rectArea;
      uniforms.ltc_1.value = lights.state.rectAreaLTC1;
      uniforms.ltc_2.value = lights.state.rectAreaLTC2;
      uniforms.pointLights.value = lights.state.point;
      uniforms.pointLightShadows.value = lights.state.pointShadow;
      uniforms.hemisphereLights.value = lights.state.hemi;
      uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
      uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
      uniforms.spotShadowMap.value = lights.state.spotShadowMap;
      uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
      uniforms.pointShadowMap.value = lights.state.pointShadowMap;
      uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
      // TODO (abelnation): add area lights shadow info to uniforms
    }
    var progUniforms = program.getUniforms();
    var uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);
    materialProperties.currentProgram = program;
    materialProperties.uniformsList = uniformsList;
    return program;
  }
  function updateCommonMaterialProperties(material, parameters) {
    var materialProperties = properties.get(material);
    materialProperties.outputEncoding = parameters.outputEncoding;
    materialProperties.instancing = parameters.instancing;
    materialProperties.numClippingPlanes = parameters.numClippingPlanes;
    materialProperties.numIntersection = parameters.numClipIntersection;
    materialProperties.vertexAlphas = parameters.vertexAlphas;
  }
  function setProgram(camera, scene, material, object) {
    if (scene.isScene !== true) scene = _emptyScene; // scene could be a Mesh, Line, Points, ...

    textures.resetTextureUnits();
    var fog = scene.fog;
    var environment = material.isMeshStandardMaterial ? scene.environment : null;
    var encoding = _currentRenderTarget === null ? _this.outputEncoding : _currentRenderTarget.texture.encoding;
    // const envMap = cubemaps.get( material.envMap || environment );
    var vertexAlphas = material.vertexColors === true && object.geometry.attributes.color && object.geometry.attributes.color.itemSize === 4;
    var materialProperties = properties.get(material);
    var lights = currentRenderState.state.lights;
    if (_clippingEnabled === true) {
      if (_localClippingEnabled === true || camera !== _currentCamera) {
        var useCache = camera === _currentCamera && material.id === _currentMaterialId;

        // we might want to call this function with some ClippingGroup
        // object instead of the material, once it becomes feasible
        // (#8465, #8379)
        clipping.setState(material, camera, useCache);
      }
    }

    //

    var needsProgramChange = false;
    if (material.version === materialProperties.__version) {
      if (materialProperties.needsLights && materialProperties.lightsStateVersion !== lights.state.version) {
        needsProgramChange = true;
      } else if (materialProperties.outputEncoding !== encoding) {
        needsProgramChange = true;
      } else if (object.isInstancedMesh && materialProperties.instancing === false) {
        needsProgramChange = true;
      } else if (!object.isInstancedMesh && materialProperties.instancing === true) {
        needsProgramChange = true;

        // } else if ( materialProperties.envMap !== envMap ) {

        // 	needsProgramChange = true;
      } else if (material.fog && materialProperties.fog !== fog) {
        needsProgramChange = true;
      } else if (materialProperties.numClippingPlanes !== undefined && (materialProperties.numClippingPlanes !== clipping.numPlanes || materialProperties.numIntersection !== clipping.numIntersection)) {
        needsProgramChange = true;
      } else if (materialProperties.vertexAlphas !== vertexAlphas) {
        needsProgramChange = true;
      }
    } else {
      needsProgramChange = true;
      materialProperties.__version = material.version;
    }

    //

    var program = materialProperties.currentProgram;
    if (needsProgramChange === true) {
      program = getProgram(material, scene, object);
    }
    var refreshProgram = false;
    var refreshMaterial = false;
    var refreshLights = false;
    var p_uniforms = program.getUniforms(),
      m_uniforms = materialProperties.uniforms;
    if (state.useProgram(program.program)) {
      refreshProgram = true;
      refreshMaterial = true;
      refreshLights = true;
    }
    if (material.id !== _currentMaterialId) {
      _currentMaterialId = material.id;
      refreshMaterial = true;
    }
    if (refreshProgram || _currentCamera !== camera) {
      p_uniforms.setValue(_gl, 'projectionMatrix', camera.projectionMatrix);
      if (capabilities.logarithmicDepthBuffer) {
        p_uniforms.setValue(_gl, 'logDepthBufFC', 2.0 / (Math.log(camera.far + 1.0) / Math.LN2));
      }
      if (_currentCamera !== camera) {
        _currentCamera = camera;

        // lighting uniforms depend on the camera so enforce an update
        // now, in case this material supports lights - or later, when
        // the next material that does gets activated:

        refreshMaterial = true; // set to true on material change
        refreshLights = true; // remains set until update done
      }

      // load material specific uniforms
      // (shader material also gets them for the sake of genericity)

      if (material.isShaderMaterial || material.isMeshPhongMaterial || material.isMeshToonMaterial || material.isMeshStandardMaterial || material.envMap) {
        var uCamPos = p_uniforms.map.cameraPosition;
        if (uCamPos !== undefined) {
          uCamPos.setValue(_gl, _vector3.setFromMatrixPosition(camera.matrixWorld));
        }
      }
      if (material.isMeshPhongMaterial || material.isMeshToonMaterial || material.isMeshLambertMaterial || material.isMeshBasicMaterial || material.isMeshStandardMaterial || material.isShaderMaterial) {
        p_uniforms.setValue(_gl, 'isOrthographic', camera.isOrthographicCamera === true);
      }
      if (material.isMeshPhongMaterial || material.isMeshToonMaterial || material.isMeshLambertMaterial || material.isMeshBasicMaterial || material.isMeshStandardMaterial || material.isShaderMaterial || material.isShadowMaterial || material.skinning) {
        p_uniforms.setValue(_gl, 'viewMatrix', camera.matrixWorldInverse);
      }
    }

    // skinning uniforms must be set even if material didn't change
    // auto-setting of texture unit for bone texture must go before other textures
    // otherwise textures used for skinning can take over texture units reserved for other material textures

    if (material.skinning) {
      p_uniforms.setOptional(_gl, object, 'bindMatrix');
      p_uniforms.setOptional(_gl, object, 'bindMatrixInverse');
      var skeleton = object.skeleton;
      if (skeleton) {
        var bones = skeleton.bones;
        if (capabilities.floatVertexTextures) {
          if (skeleton.boneTexture === null) {
            // layout (1 matrix = 4 pixels)
            //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
            //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
            //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
            //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
            //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)

            var size = Math.sqrt(bones.length * 4); // 4 pixels needed for 1 matrix
            size = ceilPow2(size);
            size = Math.max(size, 4);
            var boneMatrices = new Float32Array(size * size * 4); // 4 floats per RGBA pixel
            boneMatrices.set(skeleton.boneMatrices); // copy current values

            var boneTexture = new DataTexture(boneMatrices, size, size, RGBAFormat, FloatType);
            skeleton.boneMatrices = boneMatrices;
            skeleton.boneTexture = boneTexture;
            skeleton.boneTextureSize = size;
          }
          p_uniforms.setValue(_gl, 'boneTexture', skeleton.boneTexture, textures);
          p_uniforms.setValue(_gl, 'boneTextureSize', skeleton.boneTextureSize);
        } else {
          p_uniforms.setOptional(_gl, skeleton, 'boneMatrices');
        }
      }
    }
    if (refreshMaterial || materialProperties.receiveShadow !== object.receiveShadow) {
      materialProperties.receiveShadow = object.receiveShadow;
      p_uniforms.setValue(_gl, 'receiveShadow', object.receiveShadow);
    }
    if (refreshMaterial) {
      p_uniforms.setValue(_gl, 'toneMappingExposure', _this.toneMappingExposure);
      if (materialProperties.needsLights) {
        // the current material requires lighting info

        // note: all lighting uniforms are always set correctly
        // they simply reference the renderer's state for their
        // values
        //
        // use the current material's .needsUpdate flags to set
        // the GL state when required

        markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);
      }

      // refresh uniforms common to several materials

      if (fog && material.fog) {
        materials.refreshFogUniforms(m_uniforms, fog);
      }
      materials.refreshMaterialUniforms(m_uniforms, material, _pixelRatio, _height);
      WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, textures);
    }
    if (material.isShaderMaterial && material.uniformsNeedUpdate === true) {
      WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, textures);
      material.uniformsNeedUpdate = false;
    }
    if (material.isSpriteMaterial) {
      p_uniforms.setValue(_gl, 'center', object.center);
    }

    // common matrices

    p_uniforms.setValue(_gl, 'modelViewMatrix', object.modelViewMatrix);
    p_uniforms.setValue(_gl, 'normalMatrix', object.normalMatrix);
    p_uniforms.setValue(_gl, 'modelMatrix', object.matrixWorld);
    return program;
  }

  // If uniforms are marked as clean, they don't need to be loaded to the GPU.

  function markUniformsLightsNeedsUpdate(uniforms, value) {
    uniforms.ambientLightColor.needsUpdate = value;
    uniforms.lightProbe.needsUpdate = value;
    uniforms.directionalLights.needsUpdate = value;
    uniforms.directionalLightShadows.needsUpdate = value;
    uniforms.pointLights.needsUpdate = value;
    uniforms.pointLightShadows.needsUpdate = value;
    uniforms.spotLights.needsUpdate = value;
    uniforms.spotLightShadows.needsUpdate = value;
    uniforms.rectAreaLights.needsUpdate = value;
    uniforms.hemisphereLights.needsUpdate = value;
  }
  function materialNeedsLights(material) {
    return material.isMeshLambertMaterial || material.isMeshToonMaterial || material.isMeshPhongMaterial || material.isMeshStandardMaterial || material.isShadowMaterial || material.isShaderMaterial && material.lights === true;
  }
  this.getActiveCubeFace = function () {
    return _currentActiveCubeFace;
  };
  this.getActiveMipmapLevel = function () {
    return _currentActiveMipmapLevel;
  };
  this.getRenderTarget = function () {
    return _currentRenderTarget;
  };
  this.setRenderTarget = function (renderTarget) {
    var activeCubeFace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var activeMipmapLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    _currentRenderTarget = renderTarget;
    _currentActiveCubeFace = activeCubeFace;
    _currentActiveMipmapLevel = activeMipmapLevel;
    if (renderTarget && properties.get(renderTarget).__webglFramebuffer === undefined) {
      textures.setupRenderTarget(renderTarget);
    }
    var framebuffer = null;
    var isCube = false;
    var isRenderTarget3D = false;
    if (renderTarget) {
      var texture = renderTarget.texture;
      if (texture.isDataTexture3D || texture.isDataTexture2DArray) {
        isRenderTarget3D = true;
      }
      var __webglFramebuffer = properties.get(renderTarget).__webglFramebuffer;
      if (renderTarget.isWebGLCubeRenderTarget) {
        framebuffer = __webglFramebuffer[activeCubeFace];
        isCube = true;
      } else if (renderTarget.isWebGLMultisampleRenderTarget) {
        framebuffer = properties.get(renderTarget).__webglMultisampledFramebuffer;
      } else {
        framebuffer = __webglFramebuffer;
      }
      _currentViewport.copy(renderTarget.viewport);
      _currentScissor.copy(renderTarget.scissor);
      _currentScissorTest = renderTarget.scissorTest;
    } else {
      _currentViewport.copy(_viewport).mulScalar(_pixelRatio).floor();
      _currentScissor.copy(_scissor).mulScalar(_pixelRatio).floor();
      _currentScissorTest = _scissorTest;
    }
    state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
    state.viewport(_currentViewport);
    state.scissor(_currentScissor);
    state.setScissorTest(_currentScissorTest);
    if (isCube) {
      var textureProperties = properties.get(renderTarget.texture);
      _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + activeCubeFace, textureProperties.__webglTexture, activeMipmapLevel);
    } else if (isRenderTarget3D) {
      var _textureProperties = properties.get(renderTarget.texture);
      var layer = activeCubeFace || 0;
      _gl.framebufferTextureLayer(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _textureProperties.__webglTexture, activeMipmapLevel || 0, layer);
    }
  };
  this.readRenderTargetPixels = function (renderTarget, x, y, width, height, buffer, activeCubeFaceIndex) {
    if (!(renderTarget && renderTarget.isWebGLRenderTarget)) {
      console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.');
      return;
    }
    var framebuffer = properties.get(renderTarget).__webglFramebuffer;
    if (renderTarget.isWebGLCubeRenderTarget && activeCubeFaceIndex !== undefined) {
      framebuffer = framebuffer[activeCubeFaceIndex];
    }
    if (framebuffer) {
      state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
      try {
        var texture = renderTarget.texture;
        var textureFormat = texture.format;
        var textureType = texture.type;
        if (textureFormat !== RGBAFormat && utils.convert(textureFormat) !== _gl.getParameter(_gl.IMPLEMENTATION_COLOR_READ_FORMAT)) {
          console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.');
          return;
        }
        var halfFloatSupportedByExt = textureType === HalfFloatType && (extensions.has('EXT_color_buffer_half_float') || capabilities.isWebGL2 && extensions.has('EXT_color_buffer_float'));
        if (textureType !== UnsignedByteType && utils.convert(textureType) !== _gl.getParameter(_gl.IMPLEMENTATION_COLOR_READ_TYPE) &&
        // Edge and Chrome Mac < 52 (#9513)
        !(textureType === FloatType && (capabilities.isWebGL2 || extensions.has('OES_texture_float') || extensions.has('WEBGL_color_buffer_float'))) &&
        // Chrome Mac >= 52 and Firefox
        !halfFloatSupportedByExt) {
          console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.');
          return;
        }
        if (_gl.checkFramebufferStatus(_gl.FRAMEBUFFER) === _gl.FRAMEBUFFER_COMPLETE) {
          // the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)

          if (x >= 0 && x <= renderTarget.width - width && y >= 0 && y <= renderTarget.height - height) {
            _gl.readPixels(x, y, width, height, utils.convert(textureFormat), utils.convert(textureType), buffer);
          }
        } else {
          console.error('THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.');
        }
      } finally {
        // restore framebuffer of current render target if necessary

        var _framebuffer = _currentRenderTarget !== null ? properties.get(_currentRenderTarget).__webglFramebuffer : null;
        state.bindFramebuffer(_gl.FRAMEBUFFER, _framebuffer);
      }
    }
  };
  this.copyFramebufferToTexture = function (position, texture) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var levelScale = Math.pow(2, -level);
    var width = Math.floor(texture.image.width * levelScale);
    var height = Math.floor(texture.image.height * levelScale);
    var glFormat = utils.convert(texture.format);
    textures.setTexture2D(texture, 0);
    _gl.copyTexImage2D(_gl.TEXTURE_2D, level, glFormat, position.x, position.y, width, height, 0);
    state.unbindTexture();
  };
  this.copyTextureToTexture = function (position, srcTexture, dstTexture) {
    var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var width = srcTexture.image.width;
    var height = srcTexture.image.height;
    var glFormat = utils.convert(dstTexture.format);
    var glType = utils.convert(dstTexture.type);
    textures.setTexture2D(dstTexture, 0);

    // As another texture upload may have changed pixelStorei
    // parameters, make sure they are correct for the dstTexture
    _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, dstTexture.flipY);
    _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, dstTexture.premultipliedAlpha);
    _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, dstTexture.unpackAlignment);
    if (srcTexture.isDataTexture) {
      _gl.texSubImage2D(_gl.TEXTURE_2D, level, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data);
    } else {
      if (srcTexture.isCompressedTexture) {
        _gl.compressedTexSubImage2D(_gl.TEXTURE_2D, level, position.x, position.y, srcTexture.mipmaps[0].width, srcTexture.mipmaps[0].height, glFormat, srcTexture.mipmaps[0].data);
      } else {
        _gl.texSubImage2D(_gl.TEXTURE_2D, level, position.x, position.y, glFormat, glType, srcTexture.image);
      }
    }

    // Generate mipmaps only when copying level 0
    if (level === 0 && dstTexture.generateMipmaps) _gl.generateMipmap(_gl.TEXTURE_2D);
    state.unbindTexture();
  };
  this.copyTextureToTexture3D = function (sourceBox, position, srcTexture, dstTexture) {
    var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    if (_this.isWebGL1Renderer) {
      console.warn('THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.');
      return;
    }
    var _srcTexture$image = srcTexture.image,
      width = _srcTexture$image.width,
      height = _srcTexture$image.height,
      data = _srcTexture$image.data;
    var glFormat = utils.convert(dstTexture.format);
    var glType = utils.convert(dstTexture.type);
    var glTarget;
    if (dstTexture.isDataTexture3D) {
      textures.setTexture3D(dstTexture, 0);
      glTarget = _gl.TEXTURE_3D;
    } else if (dstTexture.isDataTexture2DArray) {
      textures.setTexture2DArray(dstTexture, 0);
      glTarget = _gl.TEXTURE_2D_ARRAY;
    } else {
      console.warn('THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.');
      return;
    }
    _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, dstTexture.flipY);
    _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, dstTexture.premultipliedAlpha);
    _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, dstTexture.unpackAlignment);
    var unpackRowLen = _gl.getParameter(_gl.UNPACK_ROW_LENGTH);
    var unpackImageHeight = _gl.getParameter(_gl.UNPACK_IMAGE_HEIGHT);
    var unpackSkipPixels = _gl.getParameter(_gl.UNPACK_SKIP_PIXELS);
    var unpackSkipRows = _gl.getParameter(_gl.UNPACK_SKIP_ROWS);
    var unpackSkipImages = _gl.getParameter(_gl.UNPACK_SKIP_IMAGES);
    _gl.pixelStorei(_gl.UNPACK_ROW_LENGTH, width);
    _gl.pixelStorei(_gl.UNPACK_IMAGE_HEIGHT, height);
    _gl.pixelStorei(_gl.UNPACK_SKIP_PIXELS, sourceBox.min.x);
    _gl.pixelStorei(_gl.UNPACK_SKIP_ROWS, sourceBox.min.y);
    _gl.pixelStorei(_gl.UNPACK_SKIP_IMAGES, sourceBox.min.z);
    _gl.texSubImage3D(glTarget, level, position.x, position.y, position.z, sourceBox.max.x - sourceBox.min.x + 1, sourceBox.max.y - sourceBox.min.y + 1, sourceBox.max.z - sourceBox.min.z + 1, glFormat, glType, data);
    _gl.pixelStorei(_gl.UNPACK_ROW_LENGTH, unpackRowLen);
    _gl.pixelStorei(_gl.UNPACK_IMAGE_HEIGHT, unpackImageHeight);
    _gl.pixelStorei(_gl.UNPACK_SKIP_PIXELS, unpackSkipPixels);
    _gl.pixelStorei(_gl.UNPACK_SKIP_ROWS, unpackSkipRows);
    _gl.pixelStorei(_gl.UNPACK_SKIP_IMAGES, unpackSkipImages);

    // Generate mipmaps only when copying level 0
    if (level === 0 && dstTexture.generateMipmaps) _gl.generateMipmap(glTarget);
    state.unbindTexture();
  };

  // this.initTexture = function ( texture ) {

  // 	textures.setTexture2D( texture, 0 );

  // 	state.unbindTexture();

  // };

  this.resetState = function () {
    _currentActiveCubeFace = 0;
    _currentActiveMipmapLevel = 0;
    _currentRenderTarget = null;
    state.reset();
    bindingStates.reset();
  };

  // if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

  // 	__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'observe', { detail: this } ) ); // eslint-disable-line no-undef

  // }

  this.resize(_width, _height);
}
SystemTarget.mixin(WebGLRenderer);

;// ./src/webgl-renderer/textures/TextureGCSystem.js


/**
 * TextureGCSystem. This class manages the GPU and ensures that it does not get clogged
 * up with textures that are no longer being used.
 *
 * @class
 * @memberof Tiny
 */

function TextureGCSystem(renderer) {
  this.renderer = renderer;
  this.count = 0;
  this.checkCount = 0;
  this.maxIdle = TextureGCSystem.defaultMaxIdle;
  this.checkCountMax = TextureGCSystem.defaultCheckCountMax;
  this.active = TextureGCSystem.defaultActive;
  renderer.on('postrender', this.postrender, this);
}
Object.assign(TextureGCSystem.prototype, {
  constructor: TextureGCSystem,
  /**
   * Checks to see when the last time a texture was used
   * if the texture has not been used for a specified amount of time it will be removed from the GPU
   */
  postrender: function postrender() {
    // if (!this.renderer.renderingToScreen) return;

    this.count++;
    if (!this.active) return;
    this.checkCount++;
    if (this.checkCount > this.checkCountMax) {
      this.checkCount = 0;
      this.run();
    }
  },
  /**
   * Checks to see when the last time a texture was used
   * if the texture has not been used for a specified amount of time it will be removed from the GPU
   */
  run: function run() {
    // const tm = this.renderer.textureManager;
    var managedTextures = this.renderer.textures.managedTextures;
    var wasRemoved = false;
    for (var i = 0; i < managedTextures.length; i++) {
      var texture = managedTextures[i];

      // only supports non generated textures at the moment!
      if (!texture._glRenderTargets && this.count - texture.touched > this.maxIdle) {
        texture.dispose();
        // console.log(texture.uuid + ': Dispose !');

        // tm.destroyTexture(texture, true);
        // managedTextures[i] = null;
        // wasRemoved = true;
      }
    }

    // if (wasRemoved) {
    //     let j = 0;

    //     for (let i = 0; i < managedTextures.length; i++) {
    //         if (managedTextures[i] !== null) {
    //             managedTextures[j++] = managedTextures[i];
    //         }
    //     }

    //     managedTextures.length = j;
    // }
  },
  /**
   * Removes all the textures within the specified displayObject and its children from the GPU
   *
   * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
   */
  unload: function unload(displayObject) {
    var tm = this.renderer.textureManager;

    // only destroy non generated textures
    if (displayObject._texture && displayObject._texture._glRenderTargets) {
      tm.destroyTexture(displayObject._texture, true);
    }
    for (var i = displayObject.children.length - 1; i >= 0; i--) {
      this.unload(displayObject.children[i]);
    }
  },
  dispose: function dispose() {
    this.renderer.off('postrender', this.postrender, this);
    this.renderer = null;
  }
});
TextureGCSystem.system = {
  name: 'textureGC',
  rooted: true
};

/**
 * If set to true, this will enable the garbage collector on the GPU.
 * @default true
 */
TextureGCSystem.defaultActive = true;

/**
 * The maximum idle frames before a texture is destroyed by garbage collection.
 * @default 60 * 60
 */
TextureGCSystem.defaultMaxIdle = 60 * 60;

/**
 * Frames between two garbage collections.
 * @default 600
 */
TextureGCSystem.defaultCheckCountMax = 600;
WebGLRenderer.registerSystem(TextureGCSystem);

;// ./src/utils/Device.js
var appleIphone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
var androidTablet = /Android/i;
var amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
var amazonTablet = /Silk/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i;
var otherBlackBerry = /BlackBerry/i;
var otherBlackBerry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i;
var isAppleTabletOnIos13 = function isAppleTabletOnIos13(navigator) {
  return typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1 && typeof MSStream === 'undefined';
};
function createMatch(userAgent) {
  return function (regex) {
    return regex.test(userAgent);
  };
}
var semanticVersionsOrder = ['major', 'minor', 'patch'];
function fillVersions(result, versions) {
  result.os.version.full = versions.join('.');
  for (var i = 0; i < semanticVersionsOrder.length; i++) {
    var ver = versions[i];
    if (ver !== undefined) result.os.version[semanticVersionsOrder[i]] = Number(ver);
  }
}
function parse(param) {
  var nav = {
    userAgent: '',
    platform: '',
    maxTouchPoints: 0
  };
  if (!param && typeof navigator !== 'undefined') {
    nav = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints || 0
    };
  } else if (typeof param === 'string') {
    nav.userAgent = param;
  } else if (param && param.userAgent) {
    nav = {
      userAgent: param.userAgent,
      platform: param.platform,
      maxTouchPoints: param.maxTouchPoints || 0
    };
  }
  var userAgent = nav.userAgent;
  var tmp = userAgent.split('[FBAN');
  if (typeof tmp[1] !== 'undefined') {
    userAgent = tmp[0];
  }
  tmp = userAgent.split('Twitter');
  if (typeof tmp[1] !== 'undefined') {
    userAgent = tmp[0];
  }
  var match = createMatch(userAgent);
  var result = {
    os: {
      version: {}
    },
    apple: {
      phone: match(appleIphone) && !match(windowsPhone),
      ipod: match(appleIpod),
      tablet: !match(appleIphone) && (match(appleTablet) || isAppleTabletOnIos13(nav)) && !match(windowsPhone),
      universal: match(appleUniversal),
      device: (match(appleIphone) || match(appleIpod) || match(appleTablet) || match(appleUniversal) || isAppleTabletOnIos13(nav)) && !match(windowsPhone)
    },
    amazon: {
      phone: match(amazonPhone),
      tablet: !match(amazonPhone) && match(amazonTablet),
      device: match(amazonPhone) || match(amazonTablet)
    },
    android: {
      phone: !match(windowsPhone) && match(amazonPhone) || !match(windowsPhone) && match(androidPhone),
      tablet: !match(windowsPhone) && !match(amazonPhone) && !match(androidPhone) && (match(amazonTablet) || match(androidTablet)),
      device: !match(windowsPhone) && (match(amazonPhone) || match(amazonTablet) || match(androidPhone) || match(androidTablet)) || match(/\bokhttp\b/i)
    },
    windows: {
      phone: match(windowsPhone),
      tablet: match(windowsTablet),
      device: match(windowsPhone) || match(windowsTablet)
    },
    other: {
      blackberry: match(otherBlackBerry),
      blackberry10: match(otherBlackBerry10),
      opera: match(otherOpera),
      firefox: match(otherFirefox),
      chrome: match(otherChrome),
      device: match(otherBlackBerry) || match(otherBlackBerry10) || match(otherOpera) || match(otherFirefox) || match(otherChrome)
    },
    any: false,
    phone: false,
    tablet: false
  };
  result.any = result.apple.device || result.android.device || result.windows.device || result.other.device;
  result.phone = result.apple.phone || result.android.phone || result.windows.phone;
  result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
  result.desktop = !result.any;
  result.maxTouchPoints = nav.maxTouchPoints;
  if (result.apple.device) {
    var _matches = /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i.exec(userAgent);
    if (_matches && _matches[1]) {
      fillVersions(result, _matches[1].split('_'));
    }
  } else if (result.android.device) {
    var matches = /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i.exec(navigator.userAgent);
    if (matches && matches[2]) {
      fillVersions(result, matches[2].split('.'));
    }
  }
  return result;
}
var device = parse();

;// ./src/webgl-renderer/utils/extractAttributes.js
/**
 * Extracts the attributes
 * @class
 * @memberof PIXI.glCore.shader
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param program {WebGLProgram} The shader program to get the attributes from
 * @return attributes {Object}
 */
function extractAttributes(gl, program) {
  var attributes = {};
  var totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (var i = 0; i < totalAttributes; i++) {
    var attribData = gl.getActiveAttrib(program, i);
    var type = mapType(gl, attribData.type);
    attributes[attribData.name] = {
      type: type,
      size: mapSize(type),
      location: gl.getAttribLocation(program, attribData.name),
      //TODO - make an attribute object
      pointer: pointer
    };
  }
  return attributes;
}
var GLSL_TO_SIZE = {
  "float": 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  "int": 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
};
var mapSize = function mapSize(type) {
  return GLSL_TO_SIZE[type];
};
var mapType = function mapType(gl, type) {
  if (!GL_TABLE) {
    var typeNames = Object.keys(GL_TO_GLSL_TYPES);
    GL_TABLE = {};
    for (var i = 0; i < typeNames.length; ++i) {
      var tn = typeNames[i];
      GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
    }
  }
  return GL_TABLE[type];
};
var GL_TABLE = null;
var GL_TO_GLSL_TYPES = {
  FLOAT: 'float',
  FLOAT_VEC2: 'vec2',
  FLOAT_VEC3: 'vec3',
  FLOAT_VEC4: 'vec4',
  INT: 'int',
  INT_VEC2: 'ivec2',
  INT_VEC3: 'ivec3',
  INT_VEC4: 'ivec4',
  BOOL: 'bool',
  BOOL_VEC2: 'bvec2',
  BOOL_VEC3: 'bvec3',
  BOOL_VEC4: 'bvec4',
  FLOAT_MAT2: 'mat2',
  FLOAT_MAT3: 'mat3',
  FLOAT_MAT4: 'mat4',
  SAMPLER_2D: 'sampler2D'
};
function pointer(type, normalized, stride, start) {
  // console.log(this.location)
  gl.vertexAttribPointer(this.location, this.size, type || gl.FLOAT, normalized || false, stride || 0, start || 0);
}

;// ./src/webgl-renderer/2d/core/GLShader.js




// var compileProgram = require('./shader/compileProgram'),
// 	extractAttributes = require('./shader/extractAttributes'),
// 	extractUniforms = require('./shader/extractUniforms'),
// 	generateUniformAccessObject = require('./shader/generateUniformAccessObject');

/**
 * Helper class to create a webGL GLShader
 *
 * @class
 * @memberof PIXI.glCore
 * @param gl {WebGLRenderingContext}
 * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
 * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
 * @param attributeLocations {object} A key value pair showing which location eact attribute should sit eg {position:0, uvs:1}
 */
var GLShader = function GLShader(renderer, vertexSrc, fragmentSrc, uniforms, attributeLocations) {
  var gl = renderer.gl;
  uniforms = uniforms || {};
  /**
   * The current WebGL rendering context
   *
   * @member {WebGLRenderingContext}
   */
  this.gl = gl;

  /**
   * The shader program
   *
   * @member {WebGLProgram}
   */
  // First compile the program..
  var program = this.program = compileProgram(gl, vertexSrc, fragmentSrc, {
    attributeLocations: attributeLocations
  });

  /**
   * The attributes of the shader as an object containing the following properties
   * {
   * 	type,
   * 	size,
   * 	location,
   * 	pointer
   * }
   * @member {Object}
   */
  // next extract the attributes
  this.attributes = extractAttributes(gl, program);
  var _uniforms = new WebGLUniforms(gl, program);

  // console.log(cachedUniforms);

  // const progUniforms = program.getUniforms();

  this.uniforms = _uniforms;
  this._uniforms = _uniforms.map;
  window.a = this;

  // console.log(uniformsList);

  // this.uniformData = extractUniforms(gl, this.program);

  /**
   * The uniforms of the shader as an object containing the following properties
   * {
   * 	gl,
   * 	data
   * }
   * @member {Object}
   */
  // this.uniforms = generateUniformAccessObject(gl, this.uniformData);
};
Object.assign(GLShader.prototype, {
  /**
   * Uses this shader
   *
   * @return {PIXI.glCore.GLGLShader} Returns itself.
   */
  // bind: function () {
  // 	this.gl.useProgram(this.program);
  // 	return this;
  // },

  /**
   * Destroys this shader
   * TODO
   */
  dispose: function dispose() {
    this.attributes = null;
    this.uniformData = null;
    this.uniforms = null;
    this.gl.deleteProgram(this.program);
  }
});

;// ./src/webgl-renderer/2d/sprite/generateMultiTextureShader.js
// import Shader from '../../Shader';
// import { readFileSync } from 'fs';
// import { join } from 'path';




var fragTemplate = ['varying vec2 vTextureCoord;', 'varying vec4 vColor;', 'varying float vTextureId;', 'uniform sampler2D uSamplers[%count%];', 'void main(void){', 'vec4 color;', '%forloop%', 'gl_FragColor = color * vColor;', '}'].join('\n');
var vertexSrc = ['precision highp float;', 'attribute vec2 aVertexPosition;', 'attribute vec2 aTextureCoord;', 'attribute vec4 aColor;', 'attribute float aTextureId;', 'uniform mat3 projectionMatrix;', 'varying vec2 vTextureCoord;', 'varying vec4 vColor;', 'varying float vTextureId;', 'void main(void){', '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, -1.0, 1.0);', '    vTextureCoord = aTextureCoord;', '    vTextureId = aTextureId;', '    vColor = aColor;', '}'].join('\n');
function checkPrecision(src, def) {
  if (src.trim().substring(0, 9) !== 'precision') {
    return "precision ".concat(def, " float;\n").concat(src);
  }
  return src;
}
function generateMultiTextureShader(renderer, maxTextures) {
  var gl = renderer.gl;
  var fragmentSrc = fragTemplate;
  fragmentSrc = fragmentSrc.replace(/%count%/gi, maxTextures);
  fragmentSrc = fragmentSrc.replace(/%forloop%/gi, generateSampleSrc(maxTextures));
  var vertexPrecision = 'highp';
  var fragPrecision = device.apple.device ? 'highp' : 'mediump';
  var sampleValues = new Array(maxTextures);

  // for (let i = 0; i < maxTextures; i++) {
  //     sampleValues[i] = null;
  // }

  var uniforms = {
    projectionMatrix: {
      value: new Mat3()
    },
    uSamplers: {
      value: null
    }
  };
  var shader = new GLShader(renderer, checkPrecision(vertexSrc, vertexPrecision), checkPrecision(fragmentSrc, fragPrecision), uniforms);
  renderer.textures.resetTextureUnits();
  gl.useProgram(shader.program);
  shader.uniforms.setValue(gl, 'uSamplers', sampleValues, renderer.textures);

  // shader.uniforms.uSamplers = sampleValues;

  return shader;
}
function generateSampleSrc(maxTextures) {
  var src = '';
  src += '\n';
  src += '\n';
  for (var i = 0; i < maxTextures; i++) {
    if (i > 0) {
      src += '\nelse ';
    }
    if (i < maxTextures - 1) {
      src += "if(vTextureId < ".concat(i, ".5)");
    }
    src += '\n{';
    src += "\n\tcolor = texture2D(uSamplers[".concat(i, "], vTextureCoord);");
    src += '\n}';
  }
  src += '\n';
  src += '\n';
  return src;
}
;// ./src/webgl-renderer/utils/checkMaxIfStatmentsInShader.js

var checkMaxIfStatmentsInShader_fragTemplate = ['precision mediump float;', 'void main(void){', 'float test = 0.1;', '%forloop%', 'gl_FragColor = vec4(0.0);', '}'].join('\n');
function generateIfTestSrc(maxIfs) {
  var src = '';
  for (var i = 0; i < maxIfs; ++i) {
    if (i > 0) {
      src += '\nelse ';
    }
    if (i < maxIfs - 1) {
      src += "if(test == ".concat(i, ".0){}");
    }
  }
  return src;
}
function checkMaxIfStatmentsInShader(maxIfs, gl) {
  var createTempContext = !gl;

  // @if DEBUG
  if (maxIfs === 0) {
    throw new Error('Invalid value of `0` passed to `checkMaxIfStatementsInShader`');
  }
  // @endif

  if (createTempContext) {
    var tinyCanvas = document.createElement('canvas');
    tinyCanvas.width = 1;
    tinyCanvas.height = 1;
    gl = createContext(tinyCanvas);
  }
  var shader = gl.createShader(gl.FRAGMENT_SHADER);
  while (true) {
    // eslint-disable-line no-constant-condition
    var fragmentSrc = checkMaxIfStatmentsInShader_fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
    gl.shaderSource(shader, fragmentSrc);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      maxIfs = maxIfs / 2 | 0;
    } else {
      // valid!
      break;
    }
  }
  if (createTempContext) {
    // get rid of context
    if (gl.getExtension('WEBGL_lose_context')) {
      gl.getExtension('WEBGL_lose_context').loseContext();
    }
  }
  return maxIfs;
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

;// ./src/webgl-renderer/2d/core/GLBuffer.js
var EMPTY_ARRAY_BUFFER = new ArrayBuffer(0);
function GLBuffer(gl, type, data, drawType) {
  /**
   * The current WebGL rendering context
   *
   * @member {WebGLRenderingContext}
   */
  this.gl = gl;

  /**
   * The WebGL buffer, created upon instantiation
   *
   * @member {WebGLBuffer}
   */
  this.buffer = gl.createBuffer();

  /**
   * The type of the buffer
   *
   * @member {gl.ARRAY_BUFFER|gl.ELEMENT_ARRAY_BUFFER}
   */
  this.type = type || gl.ARRAY_BUFFER;

  /**
   * The draw type of the buffer
   *
   * @member {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
   */
  this.drawType = drawType || gl.STATIC_DRAW;

  /**
   * The data in the buffer, as a typed array
   *
   * @member {ArrayBuffer| SharedArrayBuffer|ArrayBufferView}
   */
  this.data = EMPTY_ARRAY_BUFFER;
  if (data) {
    this.upload(data);
  }
  this._updateID = 0;
}
Object.assign(GLBuffer.prototype, {
  /**
   * Uploads the buffer to the GPU
   * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data to upload
   * @param offset {Number} if only a subset of the data should be uploaded, this is the amount of data to subtract
   * @param dontBind {Boolean} whether to bind the buffer before uploading it
   */
  upload: function upload(data, offset, dontBind) {
    // todo - needed?
    if (!dontBind) this.bind();
    var gl = this.gl;
    data = data || this.data;
    offset = offset || 0;
    if (this.data.byteLength >= data.byteLength) {
      gl.bufferSubData(this.type, offset, data);
    } else {
      gl.bufferData(this.type, data, this.drawType);
    }
    this.data = data;
  },
  /**
   * Binds the buffer
   *
   */
  bind: function bind() {
    var gl = this.gl;
    gl.bindBuffer(this.type, this.buffer);
  },
  /**
   * Destroys the buffer
   *
   */
  dispose: function dispose() {
    this.gl.deleteBuffer(this.buffer);
  }
});

;// ./src/webgl-renderer/2d/core/GLGeometry.js
/**
 * Helper class to work with WebGL VertexArrayObjects (vaos)
 * Only works if WebGL extensions are enabled (they usually are)
 *
 * @class
 * @memberof PIXI.glCore
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 */
function GLGeometry(gl, state) {
  this.nativeVaoExtension = null;
  if (!GLGeometry.FORCE_NATIVE) {
    this.nativeVaoExtension = gl.getExtension('OES_vertex_array_object') || gl.getExtension('MOZ_OES_vertex_array_object') || gl.getExtension('WEBKIT_OES_vertex_array_object');
  }
  this.nativeState = state;
  if (this.nativeVaoExtension) {
    this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
    var maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

    // GLGeometry - overwrite the state..
    this.nativeState = {
      tempAttribState: new Array(maxAttribs),
      attribState: new Array(maxAttribs)
    };
  }

  /**
   * The current WebGL rendering context
   *
   * @member {WebGLRenderingContext}
   */
  this.gl = gl;

  /**
   * An array of attributes
   *
   * @member {Array}
   */
  this.attributes = [];

  /**
   * @member {PIXI.glCore.GLBuffer}
   */
  this.index = null;

  /**
   * A boolean flag
   *
   * @member {Boolean}
   */
  this.dirty = false;
}
Object.assign(GLGeometry.prototype, {
  constructor: GLGeometry,
  /**
   * Binds the buffer
   */
  bind: function bind() {
    if (this.nativeVao) {
      this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);
      if (this.dirty) {
        this.dirty = false;
        this.activate();
        return this;
      }
      if (this.index) {
        this.index.bind();
      }
    } else {
      this.activate();
    }
    return this;
  },
  /**
   * Unbinds the buffer
   */
  unbind: function unbind() {
    if (this.nativeVao) {
      this.nativeVaoExtension.bindVertexArrayOES(null);
    }
    return this;
  },
  /**
   * Uses this vao
   */
  activate: function activate() {
    var gl = this.gl;
    var lastBuffer = null;
    for (var i = 0; i < this.attributes.length; i++) {
      var attrib = this.attributes[i];
      if (lastBuffer !== attrib.buffer) {
        attrib.buffer.bind();
        lastBuffer = attrib.buffer;
      }
      gl.vertexAttribPointer(attrib.attribute.location, attrib.attribute.size, attrib.type || gl.FLOAT, attrib.normalized || false, attrib.stride || 0, attrib.start || 0);
    }
    setVertexAttribArrays(gl, this.attributes, this.nativeState);
    if (this.index) {
      this.index.bind();
    }
    return this;
  },
  /**
   *
   * @param buffer     {PIXI.gl.GLBuffer}
   * @param attribute  {*}
   * @param type       {String}
   * @param normalized {Boolean}
   * @param stride     {Number}
   * @param start      {Number}
   */
  addAttribute: function addAttribute(buffer, attribute, type, normalized, stride, start) {
    this.attributes.push({
      buffer: buffer,
      attribute: attribute,
      location: attribute.location,
      type: type || this.gl.FLOAT,
      normalized: normalized || false,
      stride: stride || 0,
      start: start || 0
    });
    this.dirty = true;
    return this;
  },
  /**
   *
   * @param buffer   {PIXI.gl.GLBuffer}
   */
  addIndex: function addIndex(buffer /*, options*/) {
    this.index = buffer;
    this.dirty = true;
    return this;
  },
  /**
   * Unbinds this vao and disables it
   */
  clear: function clear() {
    // var gl = this.gl;

    // TODO - should this function unbind after clear?
    // for now, no but lets see what happens in the real world!
    if (this.nativeVao) {
      this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);
    }
    this.attributes.length = 0;
    this.index = null;
    return this;
  },
  /**
   * @param type  {Number}
   * @param size  {Number}
   * @param start {Number}
   */
  draw: function draw(type, size, start) {
    var gl = this.gl;
    if (this.index) {
      gl.drawElements(type, size || this.index.data.length, gl.UNSIGNED_SHORT, (start || 0) * 2);
    } else {
      // TODO need a better way to calculate size..
      gl.drawArrays(type, start, size || this.getSize());
    }
    return this;
  },
  /**
   * Destroy this vao
   */
  destroy: function destroy() {
    // lose references
    this.gl = null;
    this.index = null;
    this.attributes = null;
    this.nativeState = null;
    if (this.nativeVao) {
      this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao);
    }
    this.nativeVaoExtension = null;
    this.nativeVao = null;
  },
  getSize: function getSize() {
    var attrib = this.attributes[0];
    return attrib.buffer.data.length / (attrib.stride / 4 || attrib.attribute.size);
  }
});

/**
 * Some devices behave a bit funny when using the newer extensions (im looking at you ipad 2!)
 * If you find on older devices that things have gone a bit weird then set this to true.
 */
/**
 * Lets the GLGeometry know if you should use the WebGL extension or the native methods.
 * Some devices behave a bit funny when using the newer extensions (im looking at you ipad 2!)
 * If you find on older devices that things have gone a bit weird then set this to true.
 * @static
 * @property {Boolean} FORCE_NATIVE
 */
GLGeometry.FORCE_NATIVE = false;
function setVertexAttribArrays(gl, attribs, state) {
  var i;
  if (state) {
    var tempAttribState = state.tempAttribState,
      attribState = state.attribState;
    for (i = 0; i < tempAttribState.length; i++) {
      tempAttribState[i] = false;
    }

    // set the new attribs
    for (i = 0; i < attribs.length; i++) {
      tempAttribState[attribs[i].attribute.location] = true;
    }
    for (i = 0; i < attribState.length; i++) {
      if (attribState[i] !== tempAttribState[i]) {
        attribState[i] = tempAttribState[i];
        if (state.attribState[i]) {
          gl.enableVertexAttribArray(i);
        } else {
          gl.disableVertexAttribArray(i);
        }
      }
    }
  } else {
    for (i = 0; i < attribs.length; i++) {
      var attrib = attribs[i];
      gl.enableVertexAttribArray(attrib.attribute.location);
    }
  }
}

;// ./src/webgl-renderer/utils/premultiplyTint.js
function premultiplyTint(tint, alpha) {
  if (alpha === 1.0) {
    return (alpha * 255 << 24) + tint._bgr;
  }
  if (alpha === 0.0) {
    return 0;
  }
  var R = tint.b * 255 * alpha + 0.5 | 0;
  var G = tint.g * 255 * alpha + 0.5 | 0;
  var B = tint.r * 255 * alpha + 0.5 | 0;
  return (alpha * 255 << 24) + (R << 16) + (G << 8) + B;
}
;// ./src/webgl-renderer/utils/capabilities.js

window.device = device;
function canUploadSameBuffer() {
  // // Uploading the same buffer multiple times in a single frame can cause perf issues.
  // // Apparent on IOS so only check for that at the moment
  // // this check may become more complex if this issue pops up elsewhere.
  // const ios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  return !device.apple.device || device.os.version.major > 10;
}
// alert(JSON.stringify(device))
// alert(!device.apple.device || (device.os.version.major > 11))

function maxRecommendedTextures(max) {
  if (device.tablet || device.phone) {
    if (device.os.version.major < 11) {
      // check if the res is iphone 6 or higher..
      return 8; // 4
    }
  }

  // desktop should be ok
  return max;
}
;// ./src/webgl-renderer/2d/sprite/SpriteRenderer.js




// import settings from '../settings.js';

// import { getAdjustedBlendMode } from '../../utils/getAdjustedBlendMode.js';





// import glCore from 'pixi-gl-core';

var TICK = 0;
var TEXTURE_TICK = 0;
var CAN_UPLOAD_SAME_BUFFER = canUploadSameBuffer();
var SPRITE_MAX_TEXTURES = maxRecommendedTextures(32);
var SPRITE_BATCH_SIZE = 4096;
var SpriteRenderer_emptyTexture = new BaseTexture();

/**
 * Renderer dedicated to drawing and batching sprites.
 *
 * @class
 * @private
 * @memberof PIXI
 * @extends PIXI.ObjectRenderer
 */
function SpriteRenderer(renderer) {
  ObjectRenderer.call(this, renderer);

  /**
   * Number of values sent in the vertex buffer.
   * aVertexPosition(2), aTextureCoord(1), aColor(1), aTextureId(1) = 5
   *
   * @member {number}
   */
  this.vertSize = 5;

  /**
   * The size of the vertex information in bytes.
   *
   * @member {number}
   */
  this.vertByteSize = this.vertSize * 4;

  /**
   * The number of images in the SpriteRenderer before it flushes.
   *
   * @member {number}
   */
  this.size = SPRITE_BATCH_SIZE; // 2000 is a nice balance between mobile / desktop

  // the total number of bytes in our batch
  // let numVerts = this.size * 4 * this.vertByteSize;

  this.buffers = [];
  for (var i = 1; i <= _Math.nextPow2(this.size); i *= 2) {
    this.buffers.push(new BatchBuffer(i * 4 * this.vertByteSize));
  }

  // window.g = this;

  /**
   * Holds the indices of the geometry (quads) to draw
   *
   * @member {Uint16Array}
   */
  this.indices = createIndicesForQuads(this.size);

  /**
   * The default shaders that is used if a sprite doesn't have a more specific one.
   * there is a shader for each number of textures that can be rendererd.
   * These shaders will also be generated on the fly as required.
   * @member {PIXI.Shader[]}
   */
  this.shader = null;
  this.currentIndex = 0;
  this.groups = [];
  for (var k = 0; k < this.size; k++) {
    this.groups[k] = {
      textures: [],
      textureCount: 0,
      ids: [],
      size: 0,
      start: 0,
      blend: 0,
      premultipliedAlpha: true
    };
  }
  this.sprites = [];
  this.vertexBuffers = [];
  this.vaos = [];
  this.vaoMax = 2;
  this.vertexCount = 0;
  this.renderer.on('prerender', this.onPrerender, this);
}
SpriteRenderer.prototype = Object.assign(Object.create(ObjectRenderer.prototype), {
  constructor: SpriteRenderer,
  /**
   * Sets up the renderer context and necessary buffers.
   *
   * @private
   */
  onContextChange: function onContextChange() {
    var renderer = this.renderer;
    var gl = renderer.getContext();
    if (renderer.legacy) {
      this.MAX_TEXTURES = 1;
    } else {
      // console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
      // console.log(SPRITE_MAX_TEXTURES);
      // step 1: first check max textures the GPU can handle.
      this.MAX_TEXTURES = Math.min(renderer.capabilities.maxTextures, SPRITE_MAX_TEXTURES);

      // step 2: check the maximum number of if statements the shader can have too..
      this.MAX_TEXTURES = checkMaxIfStatmentsInShader(this.MAX_TEXTURES, gl);
    }

    // alert(renderer.capabilities.maxTextures + ' ' + this.MAX_TEXTURES)

    this.shader = generateMultiTextureShader(renderer, this.MAX_TEXTURES);

    // create a couple of buffers
    this.indexBuffer = new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    // we use the second shader as the first one depending on your browser may omit aTextureId
    // as it is not used by the shader so is optimized out.

    renderer.state.bindGeometry(null);
    var attrs = this.shader.attributes;
    for (var i = 0; i < this.vaoMax; i++) {
      /* eslint-disable max-len */
      var vertexBuffer = this.vertexBuffers[i] = new GLBuffer(gl, gl.ARRAY_BUFFER, null, gl.STREAM_DRAW);
      /* eslint-enable max-len */

      // build the vao object that will render..
      var vao = new GLGeometry(gl, renderer.state.attribs2D).addIndex(this.indexBuffer).addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0).addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, true, this.vertByteSize, 2 * 4).addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, true, this.vertByteSize, 3 * 4);
      if (attrs.aTextureId) {
        vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, false, this.vertByteSize, 4 * 4);
      }
      this.vaos[i] = vao;
    }
    this.vao = this.vaos[0];
    this.currentBlendMode = 99999;
    this.boundTextures = new Array(this.MAX_TEXTURES);
  },
  /**
   * Called before the renderer starts rendering.
   *
   */
  onPrerender: function onPrerender() {
    this.vertexCount = 0;
  },
  /**
   * Renders the sprite object.
   *
   * @param {PIXI.Sprite} sprite - the sprite to render when using this spritebatch
   */
  render: function render(sprite) {
    // TODO set blend modes..
    // check texture..
    if (this.currentIndex >= this.size) {
      this.flush();
    }

    // get the uvs for the texture

    // if the uvs have not updated then no point rendering just yet!
    // window.s = sprite.texture;
    if (!sprite.texture._uvs) {
      return;
    }

    // push a texture.
    // increment the batchsize
    this.sprites[this.currentIndex++] = sprite;
  },
  /**
   * Renders the content and empties the current batch.
   *
   */
  flush: function flush() {
    if (this.currentIndex === 0) {
      return;
    }
    var renderer = this.renderer;
    var gl = renderer.getContext();
    var MAX_TEXTURES = this.MAX_TEXTURES;
    var np2 = _Math.nextPow2(this.currentIndex);
    var log2 = _Math.log2(np2);
    var buffer = this.buffers[log2];
    var sprites = this.sprites;
    var groups = this.groups;
    var float32View = buffer.float32View;
    var uint32View = buffer.uint32View;
    var boundTextures = this.boundTextures;
    var rendererBoundTextures = renderer.textures.boundTextures;
    var touch = renderer.textureGC.count;
    var index = 0;
    var nextTexture;
    var currentTexture;
    var groupCount = 1;
    var textureCount = 0;
    var currentGroup = groups[0];
    var vertexData;
    var uvs;
    var blending = sprites[0].blending;
    var premultipliedAlpha = sprites[0].texture.base.premultipliedAlpha;
    currentGroup.textureCount = 0;
    currentGroup.start = 0;
    currentGroup.blend = blending;
    currentGroup.premultipliedAlpha = premultipliedAlpha;
    TICK++;
    var i;

    // copy textures..
    for (i = 0; i < MAX_TEXTURES; ++i) {
      var bt = rendererBoundTextures[i];
      if (bt._enabled === TICK) {
        boundTextures[i] = SpriteRenderer_emptyTexture; // renderer.textures.emptyTextures[i];
        continue;
      }

      // console.log(bt)
      boundTextures[i] = bt;
      bt._virtalBoundId = i;
      bt._enabled = TICK;
    }
    TICK++;
    for (i = 0; i < this.currentIndex; ++i) {
      // upload the sprite elemetns...
      // they have all ready been calculated so we just need to push them into the buffer.
      var sprite = sprites[i];
      sprites[i] = null;
      nextTexture = sprite.texture.base;

      // const spriteBlendMode = getAdjustedBlendMode(sprite.blending, nextTexture);

      if (blending !== sprite.blending || premultipliedAlpha !== nextTexture.premultipliedAlpha) {
        // finish a group..
        blending = sprite.blending;
        premultipliedAlpha = nextTexture.premultipliedAlpha;

        // force the batch to break!
        currentTexture = null;
        textureCount = MAX_TEXTURES;
        TICK++;
      }
      if (currentTexture !== nextTexture) {
        currentTexture = nextTexture;
        if (nextTexture._enabled !== TICK) {
          if (textureCount === MAX_TEXTURES) {
            TICK++;
            currentGroup.size = i - currentGroup.start;
            textureCount = 0;
            currentGroup = groups[groupCount++];
            currentGroup.blend = blending;
            currentGroup.premultipliedAlpha = premultipliedAlpha;
            currentGroup.textureCount = 0;
            currentGroup.start = i;
          }
          nextTexture.touched = touch;
          if (nextTexture._virtalBoundId === -1) {
            for (var j = 0; j < MAX_TEXTURES; ++j) {
              var tIndex = (j + TEXTURE_TICK) % MAX_TEXTURES;

              // tIndex = 2;
              var t = boundTextures[tIndex];
              if (t._enabled !== TICK) {
                // console.log(tIndex);
                TEXTURE_TICK++;
                t._virtalBoundId = -1;
                nextTexture._virtalBoundId = tIndex;
                boundTextures[tIndex] = nextTexture;
                break;
              }
            }
          }
          nextTexture._enabled = TICK;
          currentGroup.textureCount++;
          currentGroup.ids[textureCount] = nextTexture._virtalBoundId;
          currentGroup.textures[textureCount++] = nextTexture;
        }
      }
      vertexData = sprite.vertexData;

      // TODO this sum does not need to be set each frame..
      uvs = sprite.texture._uvs;

      // window.s = sprite.texture;

      if (renderer.roundPixels) {
        var resolution = renderer.resolution;

        // xy
        float32View[index] = (vertexData[0] * resolution | 0) / resolution;
        float32View[index + 1] = (vertexData[1] * resolution | 0) / resolution;

        // xy
        float32View[index + 5] = (vertexData[2] * resolution | 0) / resolution;
        float32View[index + 6] = (vertexData[3] * resolution | 0) / resolution;

        // xy
        float32View[index + 10] = (vertexData[4] * resolution | 0) / resolution;
        float32View[index + 11] = (vertexData[5] * resolution | 0) / resolution;

        // xy
        float32View[index + 15] = (vertexData[6] * resolution | 0) / resolution;
        float32View[index + 16] = (vertexData[7] * resolution | 0) / resolution;
      } else {
        // xy
        float32View[index] = vertexData[0];
        float32View[index + 1] = vertexData[1];

        // xy
        float32View[index + 5] = vertexData[2];
        float32View[index + 6] = vertexData[3];

        // xy
        float32View[index + 10] = vertexData[4];
        float32View[index + 11] = vertexData[5];

        // xy
        float32View[index + 15] = vertexData[6];
        float32View[index + 16] = vertexData[7];
      }
      uint32View[index + 2] = uvs[0];
      uint32View[index + 7] = uvs[1];
      uint32View[index + 12] = uvs[2];
      uint32View[index + 17] = uvs[3];
      /* eslint-disable max-len */
      var alpha = Math.min(sprite.worldOpacity, 1.0);
      // we dont call extra function if alpha is 1.0, that's faster
      var argb = alpha < 1.0 && nextTexture.premultipliedAlpha ? premultiplyTint(sprite.tint, alpha) : sprite.tint._bgr + (alpha * 255 << 24);
      // window.argb = argb;

      uint32View[index + 3] = uint32View[index + 8] = uint32View[index + 13] = uint32View[index + 18] = argb;
      float32View[index + 4] = float32View[index + 9] = float32View[index + 14] = float32View[index + 19] = nextTexture._virtalBoundId;
      /* eslint-enable max-len */

      index += 20;
    }
    currentGroup.size = i - currentGroup.start;
    if (!CAN_UPLOAD_SAME_BUFFER) {
      // this is still needed for IOS performance..
      // it really does not like uploading to the same buffer in a single frame!
      if (this.vaoMax <= this.vertexCount) {
        this.vaoMax++;
        var attrs = this.shader.attributes;

        /* eslint-disable max-len */
        var vertexBuffer = this.vertexBuffers[this.vertexCount] = new GLBuffer(gl, gl.ARRAY_BUFFER, null, gl.STREAM_DRAW);

        /* eslint-enable max-len */

        var vao = new GLGeometry(gl, renderer.state.attribs2D);
        vao.addIndex(this.indexBuffer).addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0).addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, true, this.vertByteSize, 2 * 4).addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, true, this.vertByteSize, 3 * 4);
        if (attrs.aTextureId) {
          vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, false, this.vertByteSize, 4 * 4);
        }
        this.vaos[this.vertexCount] = vao;
      }
      renderer.state.bindGeometry(this.vaos[this.vertexCount]);
      this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, false);
      this.vertexCount++;
    } else {
      // lets use the faster option, always use buffer number 0
      this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, true);
    }
    for (i = 0; i < MAX_TEXTURES; ++i) {
      rendererBoundTextures[i]._virtalBoundId = -1;
    }

    // render the groups..
    for (i = 0; i < groupCount; ++i) {
      var group = groups[i];
      var groupTextureCount = group.textureCount;
      for (var _j = 0; _j < groupTextureCount; _j++) {
        currentTexture = group.textures[_j];

        // // reset virtual ids..
        // // lets do a quick check..
        // if (rendererBoundTextures[group.ids[j]] !== currentTexture) {
        // console.log(currentTexture._virtalBoundId, group.ids[j])
        renderer.textures.setTexture2D(currentTexture, group.ids[_j]); //, true);
        // }

        // reset the virtualId..
        currentTexture._virtalBoundId = -1;
      }

      // set the blend mode..
      renderer.state.setBlending(group.blend, group.premultipliedAlpha);
      gl.drawElements(gl.TRIANGLES, group.size * 6, gl.UNSIGNED_SHORT, group.start * 6 * 2);
    }

    // window.currentGroup = currentGroup;
    // window.rendererBoundTextures = rendererBoundTextures;

    // reset elements for the next flush
    this.currentIndex = 0;
  },
  /**
   * Starts a new sprite batch.
   */
  start: function start() {
    var renderer = this.renderer;
    renderer.textures.resetTextureUnits();
    renderer.state.bindShader(this.shader);
    if (CAN_UPLOAD_SAME_BUFFER) {
      // bind buffer #0, we don't need others
      renderer.state.bindGeometry(this.vaos[this.vertexCount]);
      this.vertexBuffers[this.vertexCount].bind();
    }
  },
  /**
   * Stops and flushes the current batch.
   *
   */
  stop: function stop() {
    this.flush();
  },
  /**
   * Destroys the SpriteRenderer.
   *
   */
  destroy: function destroy() {
    for (var i = 0; i < this.vaoMax; i++) {
      if (this.vertexBuffers[i]) {
        this.vertexBuffers[i].destroy();
      }
      if (this.vaos[i]) {
        this.vaos[i].destroy();
      }
    }
    if (this.indexBuffer) {
      this.indexBuffer.destroy();
    }
    this.renderer.off('prerender', this.onPrerender, this);
    ObjectRenderer.prototype.destroy.call(this);
    if (this.shader) {
      this.shader.destroy();
      this.shader = null;
    }
    this.vertexBuffers = null;
    this.vaos = null;
    this.indexBuffer = null;
    this.indices = null;
    this.sprites = null;
    for (var _i = 0; _i < this.buffers.length; ++_i) {
      this.buffers[_i].destroy();
    }
  }
});
SpriteRenderer.system = {
  name: 'sprite'
};
console.log("dasdasd");
console.log(SpriteRenderer);
WebGLRenderer.registerSystem(SpriteRenderer);
function BatchBuffer(size) {
  this.vertices = new ArrayBuffer(size);

  /**
   * View on the vertices as a Float32Array for positions
   *
   * @member {Float32Array}
   */
  this.float32View = new Float32Array(this.vertices);

  /**
   * View on the vertices as a Uint32Array for uvs
   *
   * @member {Float32Array}
   */
  this.uint32View = new Uint32Array(this.vertices);
}
Object.assign(BatchBuffer.prototype, {
  constructor: BatchBuffer,
  destroy: function destroy() {
    this.vertices = null;
    this.positions = null;
    // this.uvs = null;
    // this.colors = null;
  }
});
function createIndicesForQuads(size) {
  // the total number of indices in our array, there are 6 points per quad.

  var totalIndices = size * 6;
  var indices = new Uint16Array(totalIndices);

  // fill the indices with the quads to draw
  for (var i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
    indices[i + 0] = j + 0;
    indices[i + 1] = j + 1;
    indices[i + 2] = j + 2;
    indices[i + 3] = j + 0;
    indices[i + 4] = j + 2;
    indices[i + 5] = j + 3;
  }
  return indices;
}

;// ./src/webgl-renderer/2d/graphics/WebGLGraphicsData.js



/**
 * An object containing WebGL specific properties to be used by the WebGL renderer
 *
 * @class
 * @private
 * @memberof PIXI
 */

/**
 * @param {WebGLRenderingContext} gl - The current WebGL drawing context
 * @param {PIXI.Shader} shader - The shader
 * @param {object} attribsState - The state for the VAO
 */
function WebGLGraphicsData(gl, shader, attribsState) {
  /**
   * The current WebGL drawing context
   *
   * @member {WebGLRenderingContext}
   */
  this.gl = gl;

  // TODO does this need to be split before uploading??
  /**
   * An array of color components (r,g,b)
   * @member {number[]}
   */
  this.color = [0, 0, 0]; // color split!

  /**
   * An array of points to draw
   * @member {PIXI.Point[]}
   */
  this.points = [];

  /**
   * The indices of the vertices
   * @member {number[]}
   */
  this.indices = [];
  /**
   * The main buffer
   * @member {WebGLBuffer}
   */
  this.buffer = new GLBuffer(gl, gl.ARRAY_BUFFER);

  /**
   * The index buffer
   * @member {WebGLBuffer}
   */
  this.indexBuffer = new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER);

  /**
   * Whether this graphics is dirty or not
   * @member {boolean}
   */
  this.dirty = true;
  this.glPoints = null;
  this.glIndices = null;

  /**
   *
   * @member {PIXI.Shader}
   */
  this.shader = shader;
  this.vao = new GLGeometry(gl, attribsState).addIndex(this.indexBuffer).addAttribute(this.buffer, shader.attributes.aVertexPosition, gl.FLOAT, false, 4 * 6, 0).addAttribute(this.buffer, shader.attributes.aColor, gl.FLOAT, false, 4 * 6, 2 * 4);
}
Object.assign(WebGLGraphicsData.prototype, {
  constructor: WebGLGraphicsData,
  /**
   * Resets the vertices and the indices
   */
  reset: function reset() {
    this.points.length = 0;
    this.indices.length = 0;
  },
  /**
   * Binds the buffers and uploads the data
   */
  upload: function upload() {
    this.glPoints = new Float32Array(this.points);
    this.buffer.upload(this.glPoints);
    this.glIndices = new Uint16Array(this.indices);
    this.indexBuffer.upload(this.glIndices);
    this.dirty = false;
  },
  /**
   * Empties all the data
   */
  destroy: function destroy() {
    this.color = null;
    this.points = null;
    this.indices = null;
    this.vao.destroy();
    this.buffer.destroy();
    this.indexBuffer.destroy();
    this.gl = null;
    this.buffer = null;
    this.indexBuffer = null;
    this.glPoints = null;
    this.glIndices = null;
  }
});

;// ./src/webgl-renderer/2d/graphics/shaders/PrimitiveShader.js


var PrimitiveShader_vertexSrc = ['precision highp float;', 'attribute vec2 aVertexPosition;', 'attribute vec4 aColor;', 'uniform mat3 translationMatrix;', 'uniform mat3 projectionMatrix;', 'uniform float alpha;', 'uniform vec3 tint;', 'varying vec4 vColor;', 'void main(void){', '   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, -1.0, 1.0);', '   vColor = aColor * vec4(tint * alpha, alpha);', '}'].join('\n');
var fragmentSrc = ['precision mediump float;', 'varying vec4 vColor;', 'void main(void){', '   gl_FragColor = vColor;', '}'].join('\n');

/**
 * This shader is used to draw simple primitive shapes for {@link PIXI.Graphics}.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.Shader
 */
function PrimitiveShader(renderer) {
  // const uniforms = {
  //     projectionMatrix: { value: new Mat3() },
  //     translationMatrix: { value: new Mat3() },
  //     tint: { value: null },
  //     alpha: { value: null }
  // };

  GLShader.call(this, renderer, PrimitiveShader_vertexSrc, fragmentSrc);
}

;// ./src/utils/EarCut.js
function EarCut(data, holeIndices, dim) {
  dim = dim || 2;
  var hasHoles = holeIndices && holeIndices.length,
    outerLen = hasHoles ? holeIndices[0] * dim : data.length,
    outerNode = linkedList(data, 0, outerLen, dim, true),
    triangles = [];
  if (!outerNode || outerNode.next === outerNode.prev) return triangles;
  var minX, minY, maxX, maxY, x, y, invSize;
  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

  // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
  if (data.length > 80 * dim) {
    minX = maxX = data[0];
    minY = maxY = data[1];
    for (var i = dim; i < outerLen; i += dim) {
      x = data[i];
      y = data[i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }

    // minX, minY and invSize are later used to transform coords into integers for z-order calculation
    invSize = Math.max(maxX - minX, maxY - minY);
    invSize = invSize !== 0 ? 32767 / invSize : 0;
  }
  earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
  return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
  var i, last;
  if (clockwise === signedArea(data, start, end, dim) > 0) {
    for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
  } else {
    for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
  }
  if (last && equals(last, last.next)) {
    removeNode(last);
    last = last.next;
  }
  return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
  if (!start) return start;
  if (!end) end = start;
  var p = start,
    again;
  do {
    again = false;
    if (!p.steiner && (equals(p, p.next) || EarCut_area(p.prev, p, p.next) === 0)) {
      removeNode(p);
      p = end = p.prev;
      if (p === p.next) break;
      again = true;
    } else {
      p = p.next;
    }
  } while (again || p !== end);
  return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
  if (!ear) return;

  // interlink polygon nodes in z-order
  if (!pass && invSize) indexCurve(ear, minX, minY, invSize);
  var stop = ear,
    prev,
    next;

  // iterate through ears, slicing them one by one
  while (ear.prev !== ear.next) {
    prev = ear.prev;
    next = ear.next;
    if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
      // cut off the triangle
      triangles.push(prev.i / dim | 0);
      triangles.push(ear.i / dim | 0);
      triangles.push(next.i / dim | 0);
      removeNode(ear);

      // skipping the next vertex leads to less sliver triangles
      ear = next.next;
      stop = next.next;
      continue;
    }
    ear = next;

    // if we looped through the whole remaining polygon and can't find any more ears
    if (ear === stop) {
      // try filtering points and slicing again
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

        // if this didn't work, try curing all small self-intersections locally
      } else if (pass === 1) {
        ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
        earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

        // as a last resort, try splitting the remaining polygon into two
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim, minX, minY, invSize);
      }
      break;
    }
  }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
  var a = ear.prev,
    b = ear,
    c = ear.next;
  if (EarCut_area(a, b, c) >= 0) return false; // reflex, can't be an ear

  // now make sure we don't have other points inside the potential ear
  var ax = a.x,
    bx = b.x,
    cx = c.x,
    ay = a.y,
    by = b.y,
    cy = c.y;

  // triangle bbox; min & max are calculated like this for speed
  var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx,
    y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy,
    x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx,
    y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
  var p = c.next;
  while (p !== a) {
    if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && EarCut_area(p.prev, p, p.next) >= 0) return false;
    p = p.next;
  }
  return true;
}
function isEarHashed(ear, minX, minY, invSize) {
  var a = ear.prev,
    b = ear,
    c = ear.next;
  if (EarCut_area(a, b, c) >= 0) return false; // reflex, can't be an ear

  var ax = a.x,
    bx = b.x,
    cx = c.x,
    ay = a.y,
    by = b.y,
    cy = c.y;

  // triangle bbox; min & max are calculated like this for speed
  var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx,
    y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy,
    x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx,
    y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;

  // z-order range for the current triangle bbox;
  var minZ = zOrder(x0, y0, minX, minY, invSize),
    maxZ = zOrder(x1, y1, minX, minY, invSize);
  var p = ear.prevZ,
    n = ear.nextZ;

  // look for points inside the triangle in both directions
  while (p && p.z >= minZ && n && n.z <= maxZ) {
    if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && EarCut_area(p.prev, p, p.next) >= 0) return false;
    p = p.prevZ;
    if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && EarCut_area(n.prev, n, n.next) >= 0) return false;
    n = n.nextZ;
  }

  // look for remaining points in decreasing z-order
  while (p && p.z >= minZ) {
    if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && EarCut_area(p.prev, p, p.next) >= 0) return false;
    p = p.prevZ;
  }

  // look for remaining points in increasing z-order
  while (n && n.z <= maxZ) {
    if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && EarCut_area(n.prev, n, n.next) >= 0) return false;
    n = n.nextZ;
  }
  return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
  var p = start;
  do {
    var a = p.prev,
      b = p.next.next;
    if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
      triangles.push(a.i / dim | 0);
      triangles.push(p.i / dim | 0);
      triangles.push(b.i / dim | 0);

      // remove two nodes involved
      removeNode(p);
      removeNode(p.next);
      p = start = b;
    }
    p = p.next;
  } while (p !== start);
  return filterPoints(p);
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
  // look for a valid diagonal that divides the polygon into two
  var a = start;
  do {
    var b = a.next.next;
    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        // split the polygon in two by the diagonal
        var c = splitPolygon(a, b);

        // filter colinear points around the cuts
        a = filterPoints(a, a.next);
        c = filterPoints(c, c.next);

        // run earcut on each half
        earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
        earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
        return;
      }
      b = b.next;
    }
    a = a.next;
  } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
  var queue = [],
    i,
    len,
    start,
    end,
    list;
  for (i = 0, len = holeIndices.length; i < len; i++) {
    start = holeIndices[i] * dim;
    end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
    list = linkedList(data, start, end, dim, false);
    if (list === list.next) list.steiner = true;
    queue.push(getLeftmost(list));
  }
  queue.sort(compareX);

  // process holes from left to right
  for (i = 0; i < queue.length; i++) {
    outerNode = eliminateHole(queue[i], outerNode);
  }
  return outerNode;
}
function compareX(a, b) {
  return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
  var bridge = findHoleBridge(hole, outerNode);
  if (!bridge) {
    return outerNode;
  }
  var bridgeReverse = splitPolygon(bridge, hole);

  // filter collinear points around the cuts
  filterPoints(bridgeReverse, bridgeReverse.next);
  return filterPoints(bridge, bridge.next);
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
  var p = outerNode,
    hx = hole.x,
    hy = hole.y,
    qx = -Infinity,
    m;

  // find a segment intersected by a ray from the hole's leftmost point to the left;
  // segment's endpoint with lesser x will be potential connection point
  do {
    if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
      var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
      if (x <= hx && x > qx) {
        qx = x;
        m = p.x < p.next.x ? p : p.next;
        if (x === hx) return m; // hole touches outer segment; pick leftmost endpoint
      }
    }
    p = p.next;
  } while (p !== outerNode);
  if (!m) return null;

  // look for points inside the triangle of hole point, segment intersection and endpoint;
  // if there are no points found, we have a valid connection;
  // otherwise choose the point of the minimum angle with the ray as connection point

  var stop = m,
    mx = m.x,
    my = m.y,
    tanMin = Infinity,
    tan;
  p = m;
  do {
    if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
      tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

      if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
        m = p;
        tanMin = tan;
      }
    }
    p = p.next;
  } while (p !== stop);
  return m;
}

// whether sector in vertex m contains sector in vertex p in the same coordinates
function sectorContainsSector(m, p) {
  return EarCut_area(m.prev, m, p.prev) < 0 && EarCut_area(p.next, m, m.next) < 0;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
  var p = start;
  do {
    if (p.z === 0) p.z = zOrder(p.x, p.y, minX, minY, invSize);
    p.prevZ = p.prev;
    p.nextZ = p.next;
    p = p.next;
  } while (p !== start);
  p.prevZ.nextZ = null;
  p.prevZ = null;
  sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
  var i,
    p,
    q,
    e,
    tail,
    numMerges,
    pSize,
    qSize,
    inSize = 1;
  do {
    p = list;
    list = null;
    tail = null;
    numMerges = 0;
    while (p) {
      numMerges++;
      q = p;
      pSize = 0;
      for (i = 0; i < inSize; i++) {
        pSize++;
        q = q.nextZ;
        if (!q) break;
      }
      qSize = inSize;
      while (pSize > 0 || qSize > 0 && q) {
        if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
          e = p;
          p = p.nextZ;
          pSize--;
        } else {
          e = q;
          q = q.nextZ;
          qSize--;
        }
        if (tail) tail.nextZ = e;else list = e;
        e.prevZ = tail;
        tail = e;
      }
      p = q;
    }
    tail.nextZ = null;
    inSize *= 2;
  } while (numMerges > 1);
  return list;
}

// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
  // coords are transformed into non-negative 15-bit integer range
  x = (x - minX) * invSize | 0;
  y = (y - minY) * invSize | 0;
  x = (x | x << 8) & 0x00FF00FF;
  x = (x | x << 4) & 0x0F0F0F0F;
  x = (x | x << 2) & 0x33333333;
  x = (x | x << 1) & 0x55555555;
  y = (y | y << 8) & 0x00FF00FF;
  y = (y | y << 4) & 0x0F0F0F0F;
  y = (y | y << 2) & 0x33333333;
  y = (y | y << 1) & 0x55555555;
  return x | y << 1;
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
  var p = start,
    leftmost = start;
  do {
    if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y) leftmost = p;
    p = p.next;
  } while (p !== start);
  return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
  return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
  return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && (
  // dones't intersect other edges
  locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && (
  // locally visible
  EarCut_area(a.prev, a, b.prev) || EarCut_area(a, b.prev, b)) ||
  // does not create opposite-facing sectors
  equals(a, b) && EarCut_area(a.prev, a, a.next) > 0 && EarCut_area(b.prev, b, b.next) > 0); // special zero-length case
}

// signed area of a triangle
function EarCut_area(p, q, r) {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
  var o1 = sign(EarCut_area(p1, q1, p2));
  var o2 = sign(EarCut_area(p1, q1, q2));
  var o3 = sign(EarCut_area(p2, q2, p1));
  var o4 = sign(EarCut_area(p2, q2, q1));
  if (o1 !== o2 && o3 !== o4) return true; // general case

  if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
  if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
  if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
  if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

  return false;
}

// for collinear points p, q, r, check if point q lies on segment pr
function onSegment(p, q, r) {
  return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}
function sign(num) {
  return num > 0 ? 1 : num < 0 ? -1 : 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
  var p = a;
  do {
    if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
    p = p.next;
  } while (p !== a);
  return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
  return EarCut_area(a.prev, a, a.next) < 0 ? EarCut_area(a, b, a.next) >= 0 && EarCut_area(a, a.prev, b) >= 0 : EarCut_area(a, b, a.prev) < 0 || EarCut_area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
  var p = a,
    inside = false,
    px = (a.x + b.x) / 2,
    py = (a.y + b.y) / 2;
  do {
    if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
    p = p.next;
  } while (p !== a);
  return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
  var a2 = new Node(a.i, a.x, a.y),
    b2 = new Node(b.i, b.x, b.y),
    an = a.next,
    bp = b.prev;
  a.next = b;
  b.prev = a;
  a2.next = an;
  an.prev = a2;
  b2.next = a2;
  a2.prev = b2;
  bp.next = b2;
  b2.prev = bp;
  return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
  var p = new Node(i, x, y);
  if (!last) {
    p.prev = p;
    p.next = p;
  } else {
    p.next = last.next;
    p.prev = last;
    last.next.prev = p;
    last.next = p;
  }
  return p;
}
function removeNode(p) {
  p.next.prev = p.prev;
  p.prev.next = p.next;
  if (p.prevZ) p.prevZ.nextZ = p.nextZ;
  if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}
function Node(i, x, y) {
  // vertex index in coordinates array
  this.i = i;

  // vertex coordinates
  this.x = x;
  this.y = y;

  // previous and next vertex nodes in a polygon ring
  this.prev = null;
  this.next = null;

  // z-order curve value
  this.z = 0;

  // previous and next nodes in z-order
  this.prevZ = null;
  this.nextZ = null;

  // indicates whether this is a steiner point
  this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
// EarCut.deviation = function (data, holeIndices, dim, triangles) {
//     var hasHoles = holeIndices && holeIndices.length;
//     var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

//     var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
//     if (hasHoles) {
//         for (var i = 0, len = holeIndices.length; i < len; i++) {
//             var start = holeIndices[i] * dim;
//             var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
//             polygonArea -= Math.abs(signedArea(data, start, end, dim));
//         }
//     }

//     var trianglesArea = 0;
//     for (i = 0; i < triangles.length; i += 3) {
//         var a = triangles[i] * dim;
//         var b = triangles[i + 1] * dim;
//         var c = triangles[i + 2] * dim;
//         trianglesArea += Math.abs(
//             (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
//             (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
//     }

//     return polygonArea === 0 && trianglesArea === 0 ? 0 :
//         Math.abs((trianglesArea - polygonArea) / polygonArea);
// };

function signedArea(data, start, end, dim) {
  var sum = 0;
  for (var i = start, j = end - dim; i < end; i += dim) {
    sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
    j = i;
  }
  return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
// EarCut.flatten = function (data) {
//     var dim = data[0][0].length,
//         result = {vertices: [], holes: [], dimensions: dim},
//         holeIndex = 0;

//     for (var i = 0; i < data.length; i++) {
//         for (var j = 0; j < data[i].length; j++) {
//             for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
//         }
//         if (i > 0) {
//             holeIndex += data[i - 1].length;
//             result.holes.push(holeIndex);
//         }
//     }
//     return result;
// };


;// ./src/webgl-renderer/2d/graphics/utils/buildLine.js


/** Minimal distance between points that are considered different. Affects line tesselation. */
var eps = 1e-4;

/**
 * Builds a line to draw using the poligon method.
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildLine(graphicsData, webGLData) {
  // TODO OPTIMISE!
  var points = graphicsData.points;
  if (points.length === 0) {
    return;
  }
  // if the line width is an odd number add 0.5 to align to a whole pixel
  // commenting this out fixes #711 and #1620
  // if (graphicsData.lineWidth%2)
  // {
  //     for (i = 0; i < points.length; i++)
  //     {
  //         points[i] += 0.5;
  //     }
  // }

  // get first and last point.. figure out the middle!
  var firstPoint = {
    x: points[0],
    y: points[1]
  };
  var lastPoint = {
    x: points[points.length - 2],
    y: points[points.length - 1]
  };
  var closedShape = graphicsData.type !== PolygonShape || graphicsData.shape.closed;
  var closedPath = Math.abs(firstPoint.x - lastPoint.x) < eps && Math.abs(firstPoint.y - lastPoint.y) < eps;

  // const closedPath = firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y

  // if the first point is the last point - gonna have issues :)
  if (closedShape) {
    // need to clone as we are going to slightly modify the shape..
    points = points.slice();
    if (closedPath) {
      points.pop();
      points.pop();
      lastPoint.x = points[points.length - 2];
      lastPoint.y = points[points.length - 1];
    }
    var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
    var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;
    points.unshift(midPointX, midPointY);
    points.push(midPointX, midPointY);
  }
  var verts = webGLData.points;
  var indices = webGLData.indices;
  var length = points.length / 2;
  var indexCount = points.length;
  var indexStart = verts.length / 6;

  // DRAW the Line
  var width = graphicsData.lineWidth / 2;

  // sort color
  var color = graphicsData.lineColor;
  var alpha = color.a;
  var r = color.r * alpha;
  var g = color.g * alpha;
  var b = color.b * alpha;
  var p1x = points[0];
  var p1y = points[1];
  var p2x = points[2];
  var p2y = points[3];
  var p3x = 0;
  var p3y = 0;
  var perpx = -(p1y - p2y);
  var perpy = p1x - p2x;
  var perp2x = 0;
  var perp2y = 0;
  var perp3x = 0;
  var perp3y = 0;
  var dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist;
  perpy /= dist;
  perpx *= width;
  perpy *= width;
  var ratio = graphicsData.alignment; // 0.5;
  var r1 = (1 - ratio) * 2;
  var r2 = ratio * 2;

  // start
  verts.push(p1x - perpx * r1, p1y - perpy * r1, r, g, b, alpha);
  verts.push(p1x + perpx * r2, p1y + perpy * r2, r, g, b, alpha);
  for (var i = 1; i < length - 1; ++i) {
    p1x = points[(i - 1) * 2];
    p1y = points[(i - 1) * 2 + 1];
    p2x = points[i * 2];
    p2y = points[i * 2 + 1];
    p3x = points[(i + 1) * 2];
    p3y = points[(i + 1) * 2 + 1];
    perpx = -(p1y - p2y);
    perpy = p1x - p2x;
    dist = Math.sqrt(perpx * perpx + perpy * perpy);
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;
    perp2x = -(p2y - p3y);
    perp2y = p2x - p3x;
    dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
    perp2x /= dist;
    perp2y /= dist;
    perp2x *= width;
    perp2y *= width;
    var a1 = -perpy + p1y - (-perpy + p2y);
    var b1 = -perpx + p2x - (-perpx + p1x);
    var c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
    var a2 = -perp2y + p3y - (-perp2y + p2y);
    var b2 = -perp2x + p2x - (-perp2x + p3x);
    var c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
    var denom = a1 * b2 - a2 * b1;
    if (Math.abs(denom) < 0.1) {
      denom += 10.1;
      verts.push(p2x - perpx * r1, p2y - perpy * r1, r, g, b, alpha);
      verts.push(p2x + perpx * r2, p2y + perpy * r2, r, g, b, alpha);
      continue;
    }
    var px = (b1 * c2 - b2 * c1) / denom;
    var py = (a2 * c1 - a1 * c2) / denom;
    var pdist = (px - p2x) * (px - p2x) + (py - p2y) * (py - p2y);
    if (pdist > 196 * width * width) {
      perp3x = perpx - perp2x;
      perp3y = perpy - perp2y;
      dist = Math.sqrt(perp3x * perp3x + perp3y * perp3y);
      perp3x /= dist;
      perp3y /= dist;
      perp3x *= width;
      perp3y *= width;
      verts.push(p2x - perp3x * r1, p2y - perp3y * r1);
      verts.push(r, g, b, alpha);
      verts.push(p2x + perp3x * r2, p2y + perp3y * r2);
      verts.push(r, g, b, alpha);
      verts.push(p2x - perp3x * r2 * r1, p2y - perp3y * r1);
      verts.push(r, g, b, alpha);
      indexCount++;
    } else {
      verts.push(p2x + (px - p2x) * r1, p2y + (py - p2y) * r1);
      verts.push(r, g, b, alpha);
      verts.push(p2x - (px - p2x) * r2, p2y - (py - p2y) * r2);
      verts.push(r, g, b, alpha);
    }
  }
  p1x = points[(length - 2) * 2];
  p1y = points[(length - 2) * 2 + 1];
  p2x = points[(length - 1) * 2];
  p2y = points[(length - 1) * 2 + 1];
  perpx = -(p1y - p2y);
  perpy = p1x - p2x;
  dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist;
  perpy /= dist;
  perpx *= width;
  perpy *= width;
  verts.push(p2x - perpx * r1, p2y - perpy * r1);
  verts.push(r, g, b, alpha);
  verts.push(p2x + perpx * r2, p2y + perpy * r2);
  verts.push(r, g, b, alpha);
  indices.push(indexStart);
  for (var _i = 0; _i < indexCount; ++_i) {
    indices.push(indexStart++);
  }
  indices.push(indexStart - 1);
}
;// ./src/webgl-renderer/2d/graphics/utils/buildPoly.js



/**
 * Builds a polygon to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildPoly(graphicsData, webGLData) {
  graphicsData.points = graphicsData.shape.points.slice();
  var points = graphicsData.points;
  if (graphicsData.fill && points.length >= 6) {
    // const holeArray = [];
    // // Process holes..
    // const holes = graphicsData.holes;

    // for (let i = 0; i < holes.length; i++) {
    //     const hole = holes[i];

    //     holeArray.push(points.length / 2);

    //     points = points.concat(hole.points);
    // }

    // get first and last point.. figure out the middle!
    var verts = webGLData.points;
    var indices = webGLData.indices;
    var length = points.length / 2;

    // sort color
    var color = graphicsData.fillColor;
    var alpha = color.a;
    var r = color.r * alpha;
    var g = color.g * alpha;
    var b = color.b * alpha;
    var triangles = EarCut(points, null, 2); // EarCut(points, holeArray, 2);

    if (!triangles) {
      return;
    }
    var vertPos = verts.length / 6;
    for (var i = 0; i < triangles.length; i += 3) {
      indices.push(triangles[i] + vertPos);
      indices.push(triangles[i] + vertPos);
      indices.push(triangles[i + 1] + vertPos);
      indices.push(triangles[i + 2] + vertPos);
      indices.push(triangles[i + 2] + vertPos);
    }
    for (var _i = 0; _i < length; _i++) {
      verts.push(points[_i * 2], points[_i * 2 + 1], r, g, b, alpha);
    }
  }
  if (graphicsData.lineWidth > 0) {
    buildLine(graphicsData, webGLData);
  }
}
;// ./src/webgl-renderer/2d/graphics/utils/buildRectangle.js


/**
 * Builds a rectangle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildRectangle(graphicsData, webGLData) {
  // --- //
  // need to convert points to a nice regular data
  //
  var rectData = graphicsData.shape;
  var x = rectData.x;
  var y = rectData.y;
  var width = rectData.width;
  var height = rectData.height;
  if (graphicsData.fill) {
    var color = graphicsData.fillColor;
    var alpha = color.a;
    var r = color.r * alpha;
    var g = color.g * alpha;
    var b = color.b * alpha;
    var verts = webGLData.points;
    var indices = webGLData.indices;
    var vertPos = verts.length / 6;

    // start
    verts.push(x, y);
    verts.push(r, g, b, alpha);
    verts.push(x + width, y);
    verts.push(r, g, b, alpha);
    verts.push(x, y + height);
    verts.push(r, g, b, alpha);
    verts.push(x + width, y + height);
    verts.push(r, g, b, alpha);

    // insert 2 dead triangles..
    indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
  }
  if (graphicsData.lineWidth) {
    var tempPoints = graphicsData.points;
    graphicsData.points = [x, y, x + width, y, x + width, y + height, x, y + height, x, y];
    buildLine(graphicsData, webGLData);
    graphicsData.points = tempPoints;
  }
}
;// ./src/webgl-renderer/2d/graphics/utils/buildRoundedRectangle.js



/**
 * Builds a rounded rectangle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildRoundedRectangle(graphicsData, webGLData) {
  var rrectData = graphicsData.shape;
  var x = rrectData.x;
  var y = rrectData.y;
  var width = rrectData.width;
  var height = rrectData.height;
  var radius = rrectData.radius;
  var recPoints = [];
  recPoints.push(x + radius, y);
  quadraticBezierCurve(x + width - radius, y, x + width, y, x + width, y + radius, recPoints);
  quadraticBezierCurve(x + width, y + height - radius, x + width, y + height, x + width - radius, y + height, recPoints);
  quadraticBezierCurve(x + radius, y + height, x, y + height, x, y + height - radius, recPoints);
  quadraticBezierCurve(x, y + radius, x, y, x + radius + 0.0000000001, y, recPoints);

  // this tiny number deals with the issue that occurs when points overlap and earcut fails to triangulate the item.
  // TODO - fix this properly, this is not very elegant.. but it works for now.

  if (graphicsData.fill) {
    var color = graphicsData.fillColor;
    var alpha = color.a;
    var r = color.r * alpha;
    var g = color.g * alpha;
    var b = color.b * alpha;
    var verts = webGLData.points;
    var indices = webGLData.indices;
    var vecPos = verts.length / 6;
    var triangles = EarCut(recPoints, null, 2);
    for (var i = 0, j = triangles.length; i < j; i += 3) {
      indices.push(triangles[i] + vecPos);
      indices.push(triangles[i] + vecPos);
      indices.push(triangles[i + 1] + vecPos);
      indices.push(triangles[i + 2] + vecPos);
      indices.push(triangles[i + 2] + vecPos);
    }
    for (var _i = 0, _j = recPoints.length; _i < _j; _i++) {
      verts.push(recPoints[_i], recPoints[++_i], r, g, b, alpha);
    }
  }
  if (graphicsData.lineWidth) {
    var tempPoints = graphicsData.points;
    graphicsData.points = recPoints;
    buildLine(graphicsData, webGLData);
    graphicsData.points = tempPoints;
  }
}

/**
 * Calculate a single point for a quadratic bezier curve.
 * Utility function used by quadraticBezierCurve.
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {number} n1 - first number
 * @param {number} n2 - second number
 * @param {number} perc - percentage
 * @return {number} the result
 *
 */
function getPt(n1, n2, perc) {
  var diff = n2 - n1;
  return n1 + diff * perc;
}

/**
 * Calculate the points for a quadratic bezier curve. (helper function..)
 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {number} fromX - Origin point x
 * @param {number} fromY - Origin point x
 * @param {number} cpX - Control point x
 * @param {number} cpY - Control point y
 * @param {number} toX - Destination point x
 * @param {number} toY - Destination point y
 * @param {number[]} [out=[]] - The output array to add points into. If not passed, a new array is created.
 * @return {number[]} an array of points
 */
function quadraticBezierCurve(fromX, fromY, cpX, cpY, toX, toY) {
  var out = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
  var n = 20;
  var points = out;
  var xa = 0;
  var ya = 0;
  var xb = 0;
  var yb = 0;
  var x = 0;
  var y = 0;
  for (var i = 0, j = 0; i <= n; ++i) {
    j = i / n;

    // The Green Line
    xa = getPt(fromX, cpX, j);
    ya = getPt(fromY, cpY, j);
    xb = getPt(cpX, toX, j);
    yb = getPt(cpY, toY, j);

    // The Black Dot
    x = getPt(xa, xb, j);
    y = getPt(ya, yb, j);
    points.push(x, y);
  }
  return points;
}
;// ./src/webgl-renderer/2d/graphics/utils/buildCircle.js



/**
 * Builds a circle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object to draw
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildCircle(graphicsData, webGLData) {
  // need to convert points to a nice regular data
  var circleData = graphicsData.shape;
  var x = circleData.x;
  var y = circleData.y;
  var width;
  var height;

  // TODO - bit hacky??
  if (graphicsData.type === CircleShape) {
    width = circleData.radius;
    height = circleData.radius;
  } else {
    width = circleData.width;
    height = circleData.height;
  }
  if (width === 0 || height === 0) {
    return;
  }
  var totalSegs = Math.floor(30 * Math.sqrt(circleData.radius)) || Math.floor(15 * Math.sqrt(circleData.width + circleData.height));
  var seg = Math.PI * 2 / totalSegs;
  if (graphicsData.fill) {
    var color = graphicsData.fillColor;
    var alpha = color.a;
    var r = color.r * alpha;
    var g = color.g * alpha;
    var b = color.b * alpha;
    var verts = webGLData.points;
    var indices = webGLData.indices;
    var vecPos = verts.length / 6;
    indices.push(vecPos);
    for (var i = 0; i < totalSegs + 1; i++) {
      verts.push(x, y, r, g, b, alpha);
      verts.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height, r, g, b, alpha);
      indices.push(vecPos++, vecPos++);
    }
    indices.push(vecPos - 1);
  }
  if (graphicsData.lineWidth) {
    var tempPoints = graphicsData.points;
    graphicsData.points = [];
    for (var _i = 0; _i < totalSegs; _i++) {
      graphicsData.points.push(x + Math.sin(seg * -_i) * width, y + Math.cos(seg * -_i) * height);
    }
    graphicsData.points.push(graphicsData.points[0], graphicsData.points[1]);
    buildLine(graphicsData, webGLData);
    graphicsData.points = tempPoints;
  }
}
;// ./src/webgl-renderer/2d/graphics/GraphicsRenderer.js









var CONTEXT_UID = 0;

/**
 * Renders the graphics object.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.ObjectRenderer
 */
function GraphicsRenderer(renderer) {
  ObjectRenderer.call(this, renderer);
  this.graphicsDataPool = [];
  this.primitiveShader = null;
  this.gl = renderer.gl;

  // easy access!
  this.CONTEXT_UID = CONTEXT_UID++;
}
GraphicsRenderer.prototype = Object.assign(Object.create(ObjectRenderer.prototype), {
  constructor: GraphicsRenderer,
  /**
   * Called when there is a WebGL context change
   *
   * @private
   *
   */
  onContextChange: function onContextChange() {
    this.gl = this.renderer.gl;
    this.primitiveShader = new PrimitiveShader(this.renderer);
  },
  /**
   * Destroys this renderer.
   *
   */
  dispose: function dispose() {
    ObjectRenderer.prototype.dispose.call(this);
    for (var i = 0; i < this.graphicsDataPool.length; ++i) {
      this.graphicsDataPool[i].dispose();
    }
    this.graphicsDataPool = null;
  },
  /**
   * Renders a graphics object.
   *
   * @param {PIXI.Graphics} graphics - The graphics object to render.
   */
  render: function render(graphics) {
    var renderer = this.renderer;
    var gl = renderer.gl;
    var webGLData;
    var webGL = graphics._webGL[this.CONTEXT_UID];
    if (!webGL || graphics.dirty !== webGL.dirty) {
      this.updateGraphics(graphics);
      webGL = graphics._webGL[this.CONTEXT_UID];
    }

    // This  could be speeded up for sure!
    var shader = this.primitiveShader;
    renderer.state.bindShader(shader);
    renderer.state.setBlending(graphics.blending);
    for (var i = 0, n = webGL.data.length; i < n; i++) {
      webGLData = webGL.data[i];
      var shaderTemp = webGLData.shader;
      renderer.state.bindShader(shaderTemp);
      // console.log(graphics.worldTransform.elements)
      shaderTemp._uniforms.translationMatrix.setValue(gl, graphics.worldTransform);
      shaderTemp._uniforms.tint.setValue(gl, graphics.tint);
      shaderTemp._uniforms.alpha.setValue(gl, graphics.worldOpacity);
      renderer.state.bindGeometry(webGLData.vao);
      webGLData.vao.draw(gl.TRIANGLE_STRIP, webGLData.indices.length);
    }
  },
  /**
   * Updates the graphics object
   *
   * @private
   * @param {PIXI.Graphics} graphics - The graphics object to update
   */
  updateGraphics: function updateGraphics(graphics) {
    var gl = this.renderer.gl;

    // get the contexts graphics object
    var webGL = graphics._webGL[this.CONTEXT_UID];

    // if the graphics object does not exist in the webGL context time to create it!
    if (!webGL) {
      webGL = graphics._webGL[this.CONTEXT_UID] = {
        lastIndex: 0,
        data: [],
        gl: gl,
        clearDirty: -1,
        dirty: -1
      };
    }

    // flag the graphics as not dirty as we are about to update it...
    webGL.dirty = graphics.dirty;

    // if the user cleared the graphics object we will need to clear every object
    if (graphics.clearDirty !== webGL.clearDirty) {
      webGL.clearDirty = graphics.clearDirty;

      // loop through and return all the webGLDatas to the object pool so than can be reused later on
      for (var i = 0; i < webGL.data.length; i++) {
        this.graphicsDataPool.push(webGL.data[i]);
      }

      // clear the array and reset the index..
      webGL.data.length = 0;
      webGL.lastIndex = 0;
    }
    var webGLData;

    // loop through the graphics datas and construct each one..
    // if the object is a complex fill then the new stencil buffer technique will be used
    // other wise graphics objects will be pushed into a batch..
    for (var _i = webGL.lastIndex; _i < graphics.graphicsData.length; _i++) {
      var data = graphics.graphicsData[_i];

      // TODO - this can be simplified
      webGLData = this.getWebGLData(webGL, 0);
      if (data.type === PolygonShape) {
        buildPoly(data, webGLData);
      }
      if (data.type === RectangleShape) {
        buildRectangle(data, webGLData);
      } else if (data.type === CircleShape || data.type === EllipseShape) {
        buildCircle(data, webGLData);
      } else if (data.type === RoundedRectangleShape) {
        buildRoundedRectangle(data, webGLData);
      }
      webGL.lastIndex++;
    }
    this.renderer.state.bindGeometry(null);

    // upload all the dirty data...
    for (var _i2 = 0; _i2 < webGL.data.length; _i2++) {
      webGLData = webGL.data[_i2];
      if (webGLData.dirty) {
        webGLData.upload();
      }
    }
  },
  /**
   *
   * @private
   * @param {WebGLRenderingContext} gl - the current WebGL drawing context
   * @param {number} type - TODO @Alvin
   * @return {*} TODO
   */
  getWebGLData: function getWebGLData(gl, type) {
    var webGLData = gl.data[gl.data.length - 1];
    if (!webGLData || webGLData.points.length > 320000) {
      webGLData = this.graphicsDataPool.pop() || new WebGLGraphicsData(this.renderer.gl, this.primitiveShader, this.renderer.state.attribs2D);
      webGLData.reset(type);
      gl.data.push(webGLData);
    }
    webGLData.dirty = true;
    return webGLData;
  }
});
GraphicsRenderer.system = {
  name: 'graphics'
};
WebGLRenderer.registerSystem(GraphicsRenderer);

;// ./src/webgl-renderer/2d/index.js




Tiny.ObjectRenderer = ObjectRenderer;
Tiny.TextureGCSystem = TextureGCSystem;
;// ./packages/webgl-2d/index.js
// import { WebGLRenderer } from '../../src/renderers/webgl/WebGLRenderer.js';
// import { WebGLGraphics } from '../../src/renderers/webgl/utils/WebGLGraphics.js';
// import { SpriteBatch } from '../../src/renderers/webgl/utils/SpriteBatch.js';

// Tiny.SpriteBatch = SpriteBatch;
// Tiny.WebGLGraphics = WebGLGraphics;
// Tiny.WebGLRenderer = WebGLRenderer;




/******/ })()
;