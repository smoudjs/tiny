/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

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

;// ./packages/input-3d/Raycaster.js
// TODO: barycentric code shouldn't be here, but where?
// TODO: SphereCast?

// var Vec2 = Tiny.Vec2;
// var Vec3 = Tiny.Vec3;
// var Mat4 = Tiny.Mat4;
//
// var tempVec2a = new Vec2();
// var tempVec2b = new Vec2();
// var tempVec2c = new Vec2();
//
// var tempVec3a = new Vec3();
// var tempVec3b = new Vec3();
// var tempVec3c = new Vec3();
// var tempVec3d = new Vec3();
// var tempVec3e = new Vec3();
// var tempVec3f = new Vec3();
// var tempVec3g = new Vec3();
// var tempVec3h = new Vec3();
// var tempVec3i = new Vec3();
// var tempVec3j = new Vec3();
// var tempVec3k = new Vec3();
//
// var tempMat4 = new Mat4();

function Raycaster() {
  this.origin = new Tiny.Vec3();
  this.direction = new Tiny.Vec3();
}
Raycaster.prototype = {
  castMouse: function castMouse(camera, mouse) {
    if (camera.isOrthographicCamera) {
      // Set origin
      // Since camera is orthographic, origin is not the camera position
      var left = camera.left,
        right = camera.right,
        bottom = camera.bottom,
        top = camera.top,
        zoom = camera.zoom;
      var x = left / zoom + (right - left) / zoom * (mouse.x * 0.5 + 0.5);
      var y = bottom / zoom + (top - bottom) / zoom * (mouse.y * 0.5 + 0.5);
      this.origin.set(x, y, 0);
      this.origin.applyMatrix4(camera.worldMatrix);

      // Set direction
      // https://community.khronos.org/t/get-direction-from-transformation-matrix-or-quat/65502/2
      this.direction.x = -camera.worldMatrix.elements[8];
      this.direction.y = -camera.worldMatrix.elements[9];
      this.direction.z = -camera.worldMatrix.elements[10];
    } else {
      // Set origin
      camera.worldMatrix.getTranslation(this.origin);

      // Set direction
      this.direction.set(mouse.x, mouse.y, 0.5);
      camera.unproject(this.direction);
      this.direction.sub(this.origin).normalize();
    }
  },
  intersectBox: function intersectBox(box, origin, direction) {
    origin = origin || this.origin;
    direction = direction || this.direction;
    var tmin, tmax, tYmin, tYmax, tZmin, tZmax;
    var invdirx = 1 / direction.x;
    var invdiry = 1 / direction.y;
    var invdirz = 1 / direction.z;
    var min = box.min;
    var max = box.max;
    tmin = ((invdirx >= 0 ? min.x : max.x) - origin.x) * invdirx;
    tmax = ((invdirx >= 0 ? max.x : min.x) - origin.x) * invdirx;
    tYmin = ((invdiry >= 0 ? min.y : max.y) - origin.y) * invdiry;
    tYmax = ((invdiry >= 0 ? max.y : min.y) - origin.y) * invdiry;
    if (tmin > tYmax || tYmin > tmax) return 0;
    if (tYmin > tmin) tmin = tYmin;
    if (tYmax < tmax) tmax = tYmax;
    tZmin = ((invdirz >= 0 ? min.z : max.z) - origin.z) * invdirz;
    tZmax = ((invdirz >= 0 ? max.z : min.z) - origin.z) * invdirz;
    if (tmin > tZmax || tZmin > tmax) return 0;
    if (tZmin > tmin) tmin = tZmin;
    if (tZmax < tmax) tmax = tZmax;
    if (tmax < 0) return 0;
    return tmin >= 0 ? tmin : tmax;
  }
};

// @TODO Horch check if any methods needed
// export class Raycaster {
//     varructor() {
//         this.origin = new Vec3();
//         this.direction = new Vec3();
//     }
//
//     // Set ray from mouse unprojection
//     castMouse(camera, mouse = [0, 0]) {
//         if (camera.isOrthographicCamera) {
//             // Set origin
//             // Since camera is orthographic, origin is not the camera position
//             var { left, right, bottom, top, zoom } = camera;
//             var x = left / zoom + ((right - left) / zoom) * (mouse[0] * 0.5 + 0.5);
//             var y = bottom / zoom + ((top - bottom) / zoom) * (mouse[1] * 0.5 + 0.5);
//             this.origin.set(x, y, 0);
//             this.origin.applyMatrix4(camera.worldMatrix);
//
//             // Set direction
//             // https://community.khronos.org/t/get-direction-from-transformation-matrix-or-quat/65502/2
//             this.direction.x = -camera.worldMatrix.elements[8];
//             this.direction.y = -camera.worldMatrix.elements[9];
//             this.direction.z = -camera.worldMatrix.elements[10];
//         } else {
//             // Set origin
//             camera.worldMatrix.getTranslation(this.origin);
//
//             // Set direction
//             this.direction.set(mouse[0], mouse[1], 0.5);
//             camera.unproject(this.direction);
//             this.direction.sub(this.origin).normalize();
//         }
//     }
//
//     // intersectBounds(meshes, { maxDistance, output = [] } = {}) {
//     //     if (!Array.isArray(meshes)) meshes = [meshes];
//     //
//     //     var invWorldMat4 = tempMat4;
//     //     var origin = tempVec3a;
//     //     var direction = tempVec3b;
//     //
//     //     var hits = output;
//     //     hits.length = 0;
//     //
//     //     meshes.forEach((mesh) => {
//     //         // Create bounds
//     //         if (!mesh.geometry.bounds || mesh.geometry.bounds.radius === Infinity) mesh.geometry.computeBoundingSphere();
//     //         var bounds = mesh.geometry.bounds;
//     //         invWorldMat4.inverse(mesh.worldMatrix);
//     //
//     //         // Get max distance locally
//     //         let localMaxDistance;
//     //         if (maxDistance) {
//     //             direction.copy(this.direction).scaleRotateMatrix4(invWorldMat4);
//     //             localMaxDistance = maxDistance * direction.len();
//     //         }
//     //
//     //         // Take world space ray and make it object space to align with bounding box
//     //         origin.copy(this.origin).applyMatrix4(invWorldMat4);
//     //         direction.copy(this.direction).transformDirection(invWorldMat4);
//     //
//     //         // Break out early if bounds too far away from origin
//     //         if (maxDistance) {
//     //             if (origin.distance(bounds.center) - bounds.radius > localMaxDistance) return;
//     //         }
//     //
//     //         let localDistance = 0;
//     //
//     //         // Check origin isn't inside bounds before testing intersection
//     //         if (mesh.geometry.raycast === 'sphere') {
//     //             if (origin.distance(bounds.center) > bounds.radius) {
//     //                 localDistance = this.intersectSphere(bounds, origin, direction);
//     //                 if (!localDistance) return;
//     //             }
//     //         } else {
//     //             if (
//     //                 origin.x < bounds.min.x ||
//     //                 origin.x > bounds.max.x ||
//     //                 origin.y < bounds.min.y ||
//     //                 origin.y > bounds.max.y ||
//     //                 origin.z < bounds.min.z ||
//     //                 origin.z > bounds.max.z
//     //             ) {
//     //                 localDistance = this.intersectBox(bounds, origin, direction);
//     //                 if (!localDistance) return;
//     //             }
//     //         }
//     //
//     //         if (maxDistance && localDistance > localMaxDistance) return;
//     //
//     //         // Create object on mesh to avoid generating lots of objects
//     //         if (!mesh.hit) mesh.hit = { localPoint: new Vec3(), point: new Vec3() };
//     //
//     //         mesh.hit.localPoint.copy(direction).multiply(localDistance).add(origin);
//     //         mesh.hit.point.copy(mesh.hit.localPoint).applyMatrix4(mesh.worldMatrix);
//     //         mesh.hit.distance = mesh.hit.point.distance(this.origin);
//     //
//     //         hits.push(mesh);
//     //     });
//     //
//     //     hits.sort((a, b) => a.hit.distance - b.hit.distance);
//     //     return hits;
//     // }
//     //
//     // intersectMeshes(meshes, { cullFace = true, maxDistance, includeUV = true, includeNormal = true, output = [] } = {}) {
//     //     // Test bounds first before testing geometry
//     //     var hits = this.intersectBounds(meshes, { maxDistance, output });
//     //     if (!hits.length) return hits;
//     //
//     //     var invWorldMat4 = tempMat4;
//     //     var origin = tempVec3a;
//     //     var direction = tempVec3b;
//     //     var a = tempVec3c;
//     //     var b = tempVec3d;
//     //     var c = tempVec3e;
//     //     var closestFaceNormal = tempVec3f;
//     //     var faceNormal = tempVec3g;
//     //     var barycoord = tempVec3h;
//     //     var uvA = tempVec2a;
//     //     var uvB = tempVec2b;
//     //     var uvC = tempVec2c;
//     //
//     //     for (let i = hits.length - 1; i >= 0; i--) {
//     //         var mesh = hits[i];
//     //         invWorldMat4.inverse(mesh.worldMatrix);
//     //
//     //         // Get max distance locally
//     //         let localMaxDistance;
//     //         if (maxDistance) {
//     //             direction.copy(this.direction).scaleRotateMatrix4(invWorldMat4);
//     //             localMaxDistance = maxDistance * direction.len();
//     //         }
//     //
//     //         // Take world space ray and make it object space to align with bounding box
//     //         origin.copy(this.origin).applyMatrix4(invWorldMat4);
//     //         direction.copy(this.direction).transformDirection(invWorldMat4);
//     //
//     //         let localDistance = 0;
//     //         let closestA, closestB, closestC;
//     //
//     //         var geometry = mesh.geometry;
//     //         var attributes = geometry.attributes;
//     //         var index = attributes.index;
//     //         var position = attributes.position;
//     //
//     //         var start = Math.max(0, geometry.drawRange.start);
//     //         var end = Math.min(index ? index.count : position.count, geometry.drawRange.start + geometry.drawRange.count);
//     //         // Data loaded shouldn't haave stride, only buffers
//     //         // var stride = position.stride ? position.stride / position.data.BYTES_PER_ELEMENT : position.size;
//     //         var stride = position.size;
//     //
//     //         for (let j = start; j < end; j += 3) {
//     //             // Position attribute indices for each triangle
//     //             var ai = index ? index.data[j] : j;
//     //             var bi = index ? index.data[j + 1] : j + 1;
//     //             var ci = index ? index.data[j + 2] : j + 2;
//     //
//     //             a.fromArray(position.data, ai * stride);
//     //             b.fromArray(position.data, bi * stride);
//     //             c.fromArray(position.data, ci * stride);
//     //
//     //             var distance = this.intersectTriangle(a, b, c, cullFace, origin, direction, faceNormal);
//     //             if (!distance) continue;
//     //
//     //             // Too far away
//     //             if (maxDistance && distance > localMaxDistance) continue;
//     //
//     //             if (!localDistance || distance < localDistance) {
//     //                 localDistance = distance;
//     //                 closestA = ai;
//     //                 closestB = bi;
//     //                 closestC = ci;
//     //                 closestFaceNormal.copy(faceNormal);
//     //             }
//     //         }
//     //
//     //         if (!localDistance) hits.splice(i, 1);
//     //
//     //         // Update hit values from bounds-test
//     //         mesh.hit.localPoint.copy(direction).multiply(localDistance).add(origin);
//     //         mesh.hit.point.copy(mesh.hit.localPoint).applyMatrix4(mesh.worldMatrix);
//     //         mesh.hit.distance = mesh.hit.point.distance(this.origin);
//     //
//     //         // Add unique hit objects on mesh to avoid generating lots of objects
//     //         if (!mesh.hit.faceNormal) {
//     //             mesh.hit.localFaceNormal = new Vec3();
//     //             mesh.hit.faceNormal = new Vec3();
//     //             mesh.hit.uv = new Vec2();
//     //             mesh.hit.localNormal = new Vec3();
//     //             mesh.hit.normal = new Vec3();
//     //         }
//     //
//     //         // Add face normal data which is already computed
//     //         mesh.hit.localFaceNormal.copy(closestFaceNormal);
//     //         mesh.hit.faceNormal.copy(mesh.hit.localFaceNormal).transformDirection(mesh.worldMatrix);
//     //
//     //         // Optional data, opt out to optimise a bit if necessary
//     //         if (includeUV || includeNormal) {
//     //             // Calculate barycoords to find uv values at hit point
//     //             a.fromArray(position.data, closestA * 3);
//     //             b.fromArray(position.data, closestB * 3);
//     //             c.fromArray(position.data, closestC * 3);
//     //             this.getBarycoord(mesh.hit.localPoint, a, b, c, barycoord);
//     //         }
//     //
//     //         if (includeUV && attributes.uv) {
//     //             uvA.fromArray(attributes.uv.data, closestA * 2);
//     //             uvB.fromArray(attributes.uv.data, closestB * 2);
//     //             uvC.fromArray(attributes.uv.data, closestC * 2);
//     //             mesh.hit.uv.set(
//     //                 uvA.x * barycoord.x + uvB.x * barycoord.y + uvC.x * barycoord.z,
//     //                 uvA.y * barycoord.x + uvB.y * barycoord.y + uvC.y * barycoord.z
//     //             );
//     //         }
//     //
//     //         if (includeNormal && attributes.normal) {
//     //             a.fromArray(attributes.normal.data, closestA * 3);
//     //             b.fromArray(attributes.normal.data, closestB * 3);
//     //             c.fromArray(attributes.normal.data, closestC * 3);
//     //             mesh.hit.localNormal.set(
//     //                 a.x * barycoord.x + b.x * barycoord.y + c.x * barycoord.z,
//     //                 a.y * barycoord.x + b.y * barycoord.y + c.y * barycoord.z,
//     //                 a.z * barycoord.x + b.z * barycoord.y + c.z * barycoord.z
//     //             );
//     //
//     //             mesh.hit.normal.copy(mesh.hit.localNormal).transformDirection(mesh.worldMatrix);
//     //         }
//     //     }
//     //
//     //     hits.sort((a, b) => a.hit.distance - b.hit.distance);
//     //     return hits;
//     // }
//     //
//     // intersectPlane(plane, origin = this.origin, direction = this.direction) {
//     //     var xminp = tempVec3a;
//     //     xminp.sub(plane.origin, origin);
//     //
//     //     var a = xminp.dot(plane.normal);
//     //     var b = direction.dot(plane.normal);
//     //     // Assuming we don't want to count a ray parallel to the plane as intersecting
//     //     if (b == 0) return 0;
//     //     var delta = a / b;
//     //     if (delta <= 0) return 0;
//     //     return origin.add(direction.scale(delta));
//     // }
//     //
//     // intersectSphere(sphere, origin = this.origin, direction = this.direction) {
//     //     var ray = tempVec3c;
//     //     ray.sub(sphere.center, origin);
//     //     var tca = ray.dot(direction);
//     //     var d2 = ray.dot(ray) - tca * tca;
//     //     var radius2 = sphere.radius * sphere.radius;
//     //     if (d2 > radius2) return 0;
//     //     var thc = Math.sqrt(radius2 - d2);
//     //     var t0 = tca - thc;
//     //     var t1 = tca + thc;
//     //     if (t0 < 0 && t1 < 0) return 0;
//     //     if (t0 < 0) return t1;
//     //     return t0;
//     // }
//
//     // Ray AABB - Ray Axis aligned bounding box testing
//     intersectBox(box, origin = this.origin, direction = this.direction) {
//         let tmin, tmax, tYmin, tYmax, tZmin, tZmax;
//         var invdirx = 1 / direction.x;
//         var invdiry = 1 / direction.y;
//         var invdirz = 1 / direction.z;
//         var min = box.min;
//         var max = box.max;
//         tmin = ((invdirx >= 0 ? min.x : max.x) - origin.x) * invdirx;
//         tmax = ((invdirx >= 0 ? max.x : min.x) - origin.x) * invdirx;
//         tYmin = ((invdiry >= 0 ? min.y : max.y) - origin.y) * invdiry;
//         tYmax = ((invdiry >= 0 ? max.y : min.y) - origin.y) * invdiry;
//         if (tmin > tYmax || tYmin > tmax) return 0;
//         if (tYmin > tmin) tmin = tYmin;
//         if (tYmax < tmax) tmax = tYmax;
//         tZmin = ((invdirz >= 0 ? min.z : max.z) - origin.z) * invdirz;
//         tZmax = ((invdirz >= 0 ? max.z : min.z) - origin.z) * invdirz;
//         if (tmin > tZmax || tZmin > tmax) return 0;
//         if (tZmin > tmin) tmin = tZmin;
//         if (tZmax < tmax) tmax = tZmax;
//         if (tmax < 0) return 0;
//         return tmin >= 0 ? tmin : tmax;
//     }
//
//     // intersectTriangle(a, b, c, backfaceCulling = true, origin = this.origin, direction = this.direction, normal = tempVec3g) {
//     //     // from https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js
//     //     // which is from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
//     //     var edge1 = tempVec3h;
//     //     var edge2 = tempVec3i;
//     //     var diff = tempVec3j;
//     //     edge1.sub(b, a);
//     //     edge2.sub(c, a);
//     //     normal.cross(edge1, edge2);
//     //     let DdN = direction.dot(normal);
//     //     if (!DdN) return 0;
//     //     let sign;
//     //     if (DdN > 0) {
//     //         if (backfaceCulling) return 0;
//     //         sign = 1;
//     //     } else {
//     //         sign = -1;
//     //         DdN = -DdN;
//     //     }
//     //     diff.sub(origin, a);
//     //     let DdQxE2 = sign * direction.dot(edge2.cross(diff, edge2));
//     //     if (DdQxE2 < 0) return 0;
//     //     let DdE1xQ = sign * direction.dot(edge1.cross(diff));
//     //     if (DdE1xQ < 0) return 0;
//     //     if (DdQxE2 + DdE1xQ > DdN) return 0;
//     //     let QdN = -sign * diff.dot(normal);
//     //     if (QdN < 0) return 0;
//     //     return QdN / DdN;
//     // }
//     //
//     // getBarycoord(point, a, b, c, target = tempVec3h) {
//     //     // From https://github.com/mrdoob/three.js/blob/master/src/math/Triangle.js
//     //     // static/instance method to calculate barycentric coordinates
//     //     // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
//     //     var v0 = tempVec3i;
//     //     var v1 = tempVec3j;
//     //     var v2 = tempVec3k;
//     //     v0.sub(c, a);
//     //     v1.sub(b, a);
//     //     v2.sub(point, a);
//     //     var dot00 = v0.dot(v0);
//     //     var dot01 = v0.dot(v1);
//     //     var dot02 = v0.dot(v2);
//     //     var dot11 = v1.dot(v1);
//     //     var dot12 = v1.dot(v2);
//     //     var denom = dot00 * dot11 - dot01 * dot01;
//     //     if (denom === 0) return target.set(-2, -1, -1);
//     //     var invDenom = 1 / denom;
//     //     var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
//     //     var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
//     //     return target.set(1 - u - v, v, u);
//     // }
// }
;// ./packages/input-3d/index.js


var tempBox = {
    min: new Vec3(),
    max: new Vec3()
  },
  hitBox = new Tiny.Vec3(1, 1, 1),
  temp = new Tiny.Vec3();
var InputSystem3D = {
  init: function init() {
    this.raycaster = new Raycaster();
  },
  preHandle: function preHandle(x, y) {
    if (!this.game.camera) return;
    temp.set(x / this.game.width * 2 - 1, -(y / this.game.height) * 2 + 1, 0);
    this.raycaster.castMouse(this.game.camera, temp);
  }
};
Tiny.Input.systems.push(InputSystem3D);
Tiny.Input.checkBounds3D = function (obj) {
  if (obj.input.hitBox) {
    hitBox.copy(obj.input.hitBox);
  } else {
    obj.getWorldScale(hitBox);
  }
  var halfSize = temp.copy(hitBox).multiplyScalar(0.5);
  tempBox.min.copy(obj.position).sub(halfSize);
  tempBox.max.copy(obj.position).add(halfSize);
  if (this.raycaster.intersectBox(tempBox)) {
    return true;
  }
};
Tiny.Input.prototype.add3d = function (object, options) {
  options = options || {};
  options.checkBounds = Tiny.Input.checkBounds3D;
  this.add(object, options);
};
/******/ })()
;