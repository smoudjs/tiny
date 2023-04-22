/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ (() => {

var noop = function () {};

Tiny.App = function (states) {
    this.callbackContext = this;
    this.state = 0;
    this.timeScale = 1;
    this.width = 0;
    this.height = 0;
    this.systems = [];
    this.updatable = [];
    this.paused = false;
    this.pauseDuration = 0;
    this.inputView = document.body;

    if (!Tiny.app) Tiny.app = this;

    if (Tiny.EventEmitter) Tiny.EventEmitter.mixin(this);

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

Tiny.App.prototype._boot = function () {
    for (var i = 0; i < Tiny.systems.length; i++) {
        var system = Tiny.systems[i];

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
        if (self.load) self._preload();
        else self._create();
    }, 0);
};

Tiny.App.prototype._preload = function () {
    this.preload.call(this.callbackContext);
    this.state = 1;
    this.load.start(this._create);
};

Tiny.App.prototype._create = function () {
    this.emit("load");
    this.create.call(this.callbackContext);

    if (this.raf) {
        this.raf.start();
    }

    this.state = 2;
};

Tiny.App.prototype.pause = function () {
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

Tiny.App.prototype.resume = function () {
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

Tiny.App.prototype._update = function (time, delta) {
    if (!this.paused) {
        delta *= this.timeScale;
        this.update.call(this.callbackContext, time, delta);
        this.emit("update", delta);

        for (var i = 0; i < this.updatable.length; i++) {
            this.updatable[i].update(delta);
        }
    } else {
        this.pauseDuration += delta;
    }

    this.render();
    this.emit("postrender");
};

Tiny.App.prototype.resize = function (width, height) {
    this.width = width || this.width;
    this.height = height || this.height;

    if (this.state > 0) {
        this._resize_cb.call(this.callbackContext, this.width, this.height);
        this.emit("resize", width, height);
    }

    var self = this;
    setTimeout(function () {
        if (self.input) self.input.updateBounds();
    }, 0);
};

Tiny.App.prototype.destroy = function (clearCache) {

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


/***/ }),

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./utils/polyfill.js */ "./src/utils/polyfill.js");

window.Tiny = {};

__webpack_require__(/*! ./App.js */ "./src/App.js");
__webpack_require__(/*! ./global.js */ "./src/global.js");
__webpack_require__(/*! ./math/Math.js */ "./src/math/Math.js"); // 1 Kb
__webpack_require__(/*! ./math/Point.js */ "./src/math/Point.js"); //
__webpack_require__(/*! ./math/Matrix.js */ "./src/math/Matrix.js"); //
__webpack_require__(/*! ./math/Rectangle.js */ "./src/math/Rectangle.js"); //  8 Kb

__webpack_require__(/*! ./objects/BaseObject2D.js */ "./src/objects/BaseObject2D.js"); //
__webpack_require__(/*! ./objects/Object2D.js */ "./src/objects/Object2D.js"); //
__webpack_require__(/*! ./objects/Scene.js */ "./src/objects/Scene.js"); // 10 Kb

__webpack_require__(/*! ./renderers/CanvasRenderer.js */ "./src/renderers/CanvasRenderer.js"); // 3 Kb


/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/***/ (() => {

Tiny.VERSION = '2.1.12';

Tiny.systems = [];

Tiny.registerSystem = function (name, system) {
    Tiny.systems.push({
        name: name,
        _class_: system
    });
};

Tiny.Primitives = {
    POLY: 0,
    RECT: 1,
    CIRC: 2,
    ELIP: 3,
    RREC: 4,
    RREC_LJOIN: 5
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


/***/ }),

/***/ "./src/math/Circle.js":
/*!****************************!*\
  !*** ./src/math/Circle.js ***!
  \****************************/
/***/ (() => {

Tiny.Circle = function (x, y, diameter) {
    x = x || 0;
    y = y || 0;
    diameter = diameter || 0;

    this.x = x;

    this.y = y;

    this._diameter = diameter;

    this._radius = 0;

    if (diameter > 0) {
        this._radius = diameter * 0.5;
    }

    this.type = Tiny.Primitives.CIRC;
};

Tiny.Circle.prototype = {
    getBounds: function () {
        return new Tiny.Rectangle(this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
    },

    setTo: function (x, y, diameter) {
        this.x = x;
        this.y = y;
        this._diameter = diameter;
        this._radius = diameter * 0.5;

        return this;
    },

    copyFrom: function (source) {
        return this.setTo(source.x, source.y, source.diameter);
    },

    copyTo: function (dest) {
        dest.x = this.x;
        dest.y = this.y;
        dest.diameter = this._diameter;

        return dest;
    },

    distance: function (dest, round) {
        var distance = Tiny.Math.distance(this.x, this.y, dest.x, dest.y);
        return round ? Math.round(distance) : distance;
    },

    clone: function (output) {
        if (typeof output === "undefined" || output === null) {
            output = new Tiny.Circle(this.x, this.y, this.diameter);
        } else {
            output.setTo(this.x, this.y, this.diameter);
        }

        return output;
    },

    contains: function (x, y) {
        return Tiny.Circle.contains(this, x, y);
    },

    offset: function (dx, dy) {
        this.x += dx;
        this.y += dy;

        return this;
    },

    offsetPoint: function (point) {
        return this.offset(point.x, point.y);
    }
};

Tiny.Circle.prototype.constructor = Tiny.Circle;

Object.defineProperty(Tiny.Circle.prototype, "diameter", {
    get: function () {
        return this._diameter;
    },

    set: function (value) {
        if (value > 0) {
            this._diameter = value;
            this._radius = value * 0.5;
        }
    }
});

Object.defineProperty(Tiny.Circle.prototype, "radius", {
    get: function () {
        return this._radius;
    },

    set: function (value) {
        if (value > 0) {
            this._radius = value;
            this._diameter = value * 2;
        }
    }
});

Object.defineProperty(Tiny.Circle.prototype, "left", {
    get: function () {
        return this.x - this._radius;
    },

    set: function (value) {
        if (value > this.x) {
            this._radius = 0;
            this._diameter = 0;
        } else {
            this.radius = this.x - value;
        }
    }
});

Object.defineProperty(Tiny.Circle.prototype, "right", {
    get: function () {
        return this.x + this._radius;
    },

    set: function (value) {
        if (value < this.x) {
            this._radius = 0;
            this._diameter = 0;
        } else {
            this.radius = value - this.x;
        }
    }
});

Object.defineProperty(Tiny.Circle.prototype, "top", {
    get: function () {
        return this.y - this._radius;
    },

    set: function (value) {
        if (value > this.y) {
            this._radius = 0;
            this._diameter = 0;
        } else {
            this.radius = this.y - value;
        }
    }
});

Object.defineProperty(Tiny.Circle.prototype, "bottom", {
    get: function () {
        return this.y + this._radius;
    },

    set: function (value) {
        if (value < this.y) {
            this._radius = 0;
            this._diameter = 0;
        } else {
            this.radius = value - this.y;
        }
    }
});

Object.defineProperty(Tiny.Circle.prototype, "area", {
    get: function () {
        if (this._radius > 0) {
            return Math.PI * this._radius * this._radius;
        } else {
            return 0;
        }
    }
});

Object.defineProperty(Tiny.Circle.prototype, "empty", {
    get: function () {
        return this._diameter === 0;
    },

    set: function (value) {
        if (value === true) {
            this.setTo(0, 0, 0);
        }
    }
});

Tiny.Circle.contains = function (a, x, y) {
    //  Check if x/y are within the bounds first
    if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y <= a.bottom) {
        var dx = (a.x - x) * (a.x - x);
        var dy = (a.y - y) * (a.y - y);

        return dx + dy <= a.radius * a.radius;
    } else {
        return false;
    }
};

Tiny.Circle.equals = function (a, b) {
    return a.x == b.x && a.y == b.y && a.diameter == b.diameter;
};

Tiny.Circle.intersects = function (a, b) {
    return Tiny.Math.distance(a.x, a.y, b.x, b.y) <= a.radius + b.radius;
};

Tiny.Circle.intersectsRectangle = function (c, r) {
    var cx = Math.abs(c.x - r.x - r.halfWidth);
    var xDist = r.halfWidth + c.radius;

    if (cx > xDist) {
        return false;
    }

    var cy = Math.abs(c.y - r.y - r.halfHeight);
    var yDist = r.halfHeight + c.radius;

    if (cy > yDist) {
        return false;
    }

    if (cx <= r.halfWidth || cy <= r.halfHeight) {
        return true;
    }

    var xCornerDist = cx - r.halfWidth;
    var yCornerDist = cy - r.halfHeight;
    var xCornerDistSq = xCornerDist * xCornerDist;
    var yCornerDistSq = yCornerDist * yCornerDist;
    var maxCornerDistSq = c.radius * c.radius;

    return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
};


/***/ }),

/***/ "./src/math/Math.js":
/*!**************************!*\
  !*** ./src/math/Math.js ***!
  \**************************/
/***/ (() => {

Tiny.Math = {
    distance: function (x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }
};

var degreeToRadiansFactor = Math.PI / 180;
var radianToDegreesFactor = 180 / Math.PI;

Tiny.Math.degToRad = function degToRad(degrees) {
    return degrees * degreeToRadiansFactor;
};

Tiny.Math.radToDeg = function radToDeg(radians) {
    return radians * radianToDegreesFactor;
};


/***/ }),

/***/ "./src/math/Matrix.js":
/*!****************************!*\
  !*** ./src/math/Matrix.js ***!
  \****************************/
/***/ (() => {

Tiny.Matrix = function () {
    this.a = 1;

    this.b = 0;

    this.c = 0;

    this.d = 1;

    this.tx = 0;

    this.ty = 0;

    this.type = Tiny.MATRIX;
};

Tiny.Matrix.prototype.fromArray = function (array) {
    this.a = array[0];
    this.b = array[1];
    this.c = array[3];
    this.d = array[4];
    this.tx = array[2];
    this.ty = array[5];
};

Tiny.Matrix.prototype.toArray = function (transpose) {
    if (!this.array) {
        this.array = new Float32Array(9);
    }

    var array = this.array;

    if (transpose) {
        array[0] = this.a;
        array[1] = this.b;
        array[2] = 0;
        array[3] = this.c;
        array[4] = this.d;
        array[5] = 0;
        array[6] = this.tx;
        array[7] = this.ty;
        array[8] = 1;
    } else {
        array[0] = this.a;
        array[1] = this.c;
        array[2] = this.tx;
        array[3] = this.b;
        array[4] = this.d;
        array[5] = this.ty;
        array[6] = 0;
        array[7] = 0;
        array[8] = 1;
    }

    return array;
};

Tiny.Matrix.prototype.apply = function (pos, newPos) {
    newPos = newPos || new Tiny.Point();

    var x = pos.x;
    var y = pos.y;

    newPos.x = this.a * x + this.c * y + this.tx;
    newPos.y = this.b * x + this.d * y + this.ty;

    return newPos;
};

Tiny.Matrix.prototype.applyInverse = function (pos, newPos) {
    newPos = newPos || new Tiny.Point();

    var id = 1 / (this.a * this.d + this.c * -this.b);
    var x = pos.x;
    var y = pos.y;

    newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
    newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;

    return newPos;
};

Tiny.Matrix.prototype.translate = function (x, y) {
    this.tx += x;
    this.ty += y;

    return this;
};

Tiny.Matrix.prototype.scale = function (x, y) {
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;

    return this;
};

Tiny.Matrix.prototype.rotate = function (angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    var a1 = this.a;
    var c1 = this.c;
    var tx1 = this.tx;

    this.a = a1 * cos - this.b * sin;
    this.b = a1 * sin + this.b * cos;
    this.c = c1 * cos - this.d * sin;
    this.d = c1 * sin + this.d * cos;
    this.tx = tx1 * cos - this.ty * sin;
    this.ty = tx1 * sin + this.ty * cos;

    return this;
};

Tiny.Matrix.prototype.append = function (matrix) {
    var a1 = this.a;
    var b1 = this.b;
    var c1 = this.c;
    var d1 = this.d;

    this.a = matrix.a * a1 + matrix.b * c1;
    this.b = matrix.a * b1 + matrix.b * d1;
    this.c = matrix.c * a1 + matrix.d * c1;
    this.d = matrix.c * b1 + matrix.d * d1;

    this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
    this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;

    return this;
};

Tiny.Matrix.prototype.identity = function () {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;

    return this;
};

Tiny.identityMatrix = new Tiny.Matrix();


/***/ }),

/***/ "./src/math/Point.js":
/*!***************************!*\
  !*** ./src/math/Point.js ***!
  \***************************/
/***/ (() => {

Tiny.Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Tiny.Point.prototype = {
    set: function (x, y) {
        this.x = x || 0;
        this.y = y || (y !== 0 ? this.x : 0);

        return this;
    }
};


/***/ }),

/***/ "./src/math/Polygon.js":
/*!*****************************!*\
  !*** ./src/math/Polygon.js ***!
  \*****************************/
/***/ (() => {

Tiny.Polygon = function () {
    this.area = 0;
    this._points = [];

    if (arguments.length > 0) {
        this.setTo.apply(this, arguments);
    }
    this.closed = true;
    this.type = Tiny.Primitives.POLY;
};

Tiny.Polygon.prototype = {
    toNumberArray: function (output) {
        if (typeof output === "undefined") {
            output = [];
        }

        for (var i = 0; i < this._points.length; i++) {
            if (typeof this._points[i] === "number") {
                output.push(this._points[i]);
                output.push(this._points[i + 1]);
                i++;
            } else {
                output.push(this._points[i].x);
                output.push(this._points[i].y);
            }
        }

        return output;
    },

    flatten: function () {
        this._points = this.toNumberArray();

        return this;
    },

    clone: function (output) {
        var points = this._points.slice();

        if (typeof output === "undefined" || output === null) {
            output = new Tiny.Polygon(points);
        } else {
            output.setTo(points);
        }

        return output;
    },

    contains: function (x, y) {
        var length = this._points.length;
        var inside = false;

        for (var i = -1, j = length - 1; ++i < length; j = i) {
            var ix = this._points[i].x;
            var iy = this._points[i].y;

            var jx = this._points[j].x;
            var jy = this._points[j].y;

            if (((iy <= y && y < jy) || (jy <= y && y < iy)) && x < ((jx - ix) * (y - iy)) / (jy - iy) + ix) {
                inside = !inside;
            }
        }

        return inside;
    },

    setTo: function (points) {
        this.area = 0;
        this._points = [];

        if (arguments.length > 0) {
            //  If points isn't an array, use arguments as the array
            if (!Array.isArray(points)) {
                points = Array.prototype.slice.call(arguments);
            }

            var y0 = Number.MAX_VALUE;

            //  Allows for mixed-type arguments
            for (var i = 0, len = points.length; i < len; i++) {
                if (typeof points[i] === "number") {
                    var p = new Tiny.Point(points[i], points[i + 1]);
                    i++;
                } else {
                    var p = new Tiny.Point(points[i].x, points[i].y);
                }

                this._points.push(p);

                //  Lowest boundary
                if (p.y < y0) {
                    y0 = p.y;
                }
            }

            this.calculateArea(y0);
        }

        return this;
    },

    calculateArea: function (y0) {
        var p1;
        var p2;
        var avgHeight;
        var width;

        for (var i = 0, len = this._points.length; i < len; i++) {
            p1 = this._points[i];

            if (i === len - 1) {
                p2 = this._points[0];
            } else {
                p2 = this._points[i + 1];
            }

            avgHeight = (p1.y - y0 + (p2.y - y0)) / 2;
            width = p1.x - p2.x;
            this.area += avgHeight * width;
        }

        return this.area;
    }
};

Tiny.Polygon.prototype.constructor = Tiny.Polygon;

Object.defineProperty(Tiny.Polygon.prototype, "points", {
    get: function () {
        return this._points;
    },

    set: function (points) {
        if (points != null) {
            this.setTo(points);
        } else {
            //  Clear the points
            this.setTo();
        }
    }
});


/***/ }),

/***/ "./src/math/Rectangle.js":
/*!*******************************!*\
  !*** ./src/math/Rectangle.js ***!
  \*******************************/
/***/ (() => {

Tiny.Rectangle = function (x, y, width, height) {
    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.type = Tiny.Primitives.RECT;
};

Tiny.Rectangle.prototype = {
    setTo: function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;
    },

    contains: function (x, y) {
        return Tiny.Rectangle.contains(this, x, y);
    },

    intersects: function (b) {
        return Tiny.Rectangle.intersects(this, b);
    }
};

Object.defineProperty(Tiny.Rectangle.prototype, "bottom", {
    get: function () {
        return this.y + this.height;
    },

    set: function (value) {
        if (value <= this.y) {
            this.height = 0;
        } else {
            this.height = value - this.y;
        }
    }
});

Object.defineProperty(Tiny.Rectangle.prototype, "right", {
    get: function () {
        return this.x + this.width;
    },

    set: function (value) {
        if (value <= this.x) {
            this.width = 0;
        } else {
            this.width = value - this.x;
        }
    }
});

Object.defineProperty(Tiny.Rectangle.prototype, "volume", {
    get: function () {
        return this.width * this.height;
    }
});

Tiny.Rectangle.prototype.constructor = Tiny.Rectangle;

Tiny.Rectangle.contains = function (a, x, y) {
    if (a.width <= 0 || a.height <= 0) {
        return false;
    }

    return x >= a.x && x < a.right && y >= a.y && y < a.bottom;
};

Tiny.Rectangle.containsPoint = function (a, point) {
    return Tiny.Rectangle.contains(a, point.x, point.y);
};

Tiny.Rectangle.containsRect = function (a, b) {
    //  If the given rect has a larger volume than this one then it can never contain it
    if (a.volume > b.volume) {
        return false;
    }

    return a.x >= b.x && a.y >= b.y && a.right < b.right && a.bottom < b.bottom;
};

Tiny.Rectangle.intersects = function (a, b) {
    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0) {
        return false;
    }

    return !(a.right < b.x || a.bottom < b.y || a.x > b.right || a.y > b.bottom);
};

Tiny.EmptyRectangle = new Tiny.Rectangle(0, 0, 0, 0);


/***/ }),

/***/ "./src/math/RoundedRectangle.js":
/*!**************************************!*\
  !*** ./src/math/RoundedRectangle.js ***!
  \**************************************/
/***/ (() => {

Tiny.RoundedRectangle = function (x, y, width, height, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.radius = radius || 0;
    this.type = Tiny.Primitives.RREC;
};

Tiny.RoundedRectangle.prototype.clone = function () {
    return new Tiny.RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
};

Tiny.RoundedRectangle.prototype.contains = function (x, y) {
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

Tiny.RoundedRectangle.prototype.constructor = Tiny.RoundedRectangle;


/***/ }),

/***/ "./src/mini.js":
/*!*********************!*\
  !*** ./src/mini.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./base.js */ "./src/base.js");

__webpack_require__(/*! ./systems/RAF.js */ "./src/systems/RAF.js"); // 2 Kb
// require('./systems/ObjectCreator.js'); // 1 Kb
__webpack_require__(/*! ./systems/Loader.js */ "./src/systems/Loader.js"); // 3 Kb
__webpack_require__(/*! ./systems/Input.js */ "./src/systems/Input.js"); // 1 Kb
__webpack_require__(/*! ./systems/Timer.js */ "./src/systems/Timer.js"); // 1 Kb

__webpack_require__(/*! ./utils/EventEmitter.js */ "./src/utils/EventEmitter.js");

__webpack_require__(/*! ./textures/Texture.js */ "./src/textures/Texture.js"); // 4 Kb

__webpack_require__(/*! ./objects/Sprite.js */ "./src/objects/Sprite.js"); // 3 Kb
__webpack_require__(/*! ./objects/Text.js */ "./src/objects/Text.js"); // 5 Kb


/***/ }),

/***/ "./src/objects/BaseObject2D.js":
/*!*************************************!*\
  !*** ./src/objects/BaseObject2D.js ***!
  \*************************************/
/***/ (() => {

var pi2 = Math.PI * 2;

Tiny.BaseObject2D = function () {
    this.position = new Tiny.Point(0, 0);
    this.scale = new Tiny.Point(1, 1);
    this.pivot = new Tiny.Point(0, 0);
    this.rotation = 0;
    this.alpha = 1;
    this.visible = true;
    this.renderable = false;
    this.parent = null;
    this.worldAlpha = 1;
    this.worldTransform = new Tiny.Matrix();
    this._sr = 0;
    this._cr = 1;
    this._cacheAsBitmap = false;
};

Tiny.BaseObject2D.prototype.constructor = Tiny.BaseObject2D;

Tiny.BaseObject2D.prototype.destroy = function () {
    if (this.parent) this.parent.remove(this);

    this.parent = null;
    this.worldTransform = null;
    this.visible = false;
    this.renderable = false;
    this._destroyCachedSprite();
};

Object.defineProperty(Tiny.BaseObject2D.prototype, "worldVisible", {
    get: function () {
        var item = this;

        do {
            if (!item.visible) return false;
            item = item.parent;
        } while (item);

        return true;
    }
});

Object.defineProperty(Tiny.BaseObject2D.prototype, "cacheAsBitmap", {
    get: function () {
        return this._cacheAsBitmap;
    },

    set: function (value) {
        if (this._cacheAsBitmap === value) return;

        if (value) {
            this._generateCachedSprite();
        } else {
            this._destroyCachedSprite();
        }

        this._cacheAsBitmap = value;
    }
});

Tiny.BaseObject2D.prototype.updateTransform = function () {
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
Tiny.BaseObject2D.prototype.displayObjectUpdateTransform = Tiny.BaseObject2D.prototype.updateTransform;

Tiny.BaseObject2D.prototype.getBounds = function (matrix) {
    // matrix = matrix;//just to get passed js hinting (and preserve inheritance)
    return Tiny.EmptyRectangle;
};

Tiny.BaseObject2D.prototype.getLocalBounds = function () {
    return this.getBounds(Tiny.identityMatrix);
};

Tiny.BaseObject2D.prototype.generateTexture = function (resolution, renderer) {
    var bounds = this.getLocalBounds();

    var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0, renderer, resolution);

    Tiny.BaseObject2D._tempMatrix.tx = -bounds.x;
    Tiny.BaseObject2D._tempMatrix.ty = -bounds.y;

    renderTexture.render(this, Tiny.BaseObject2D._tempMatrix);

    return renderTexture;
};

Tiny.BaseObject2D.prototype.updateCache = function () {
    this._generateCachedSprite();
};

Tiny.BaseObject2D.prototype.toGlobal = function (position) {
    // don't need to u[date the lot
    this.displayObjectUpdateTransform();
    return this.worldTransform.apply(position);
};

Tiny.BaseObject2D.prototype.toLocal = function (position, from) {
    if (from) {
        position = from.toGlobal(position);
    }

    // don't need to u[date the lot
    this.displayObjectUpdateTransform();

    return this.worldTransform.applyInverse(position);
};

Tiny.BaseObject2D.prototype._renderCachedSprite = function (renderSession) {
    this._cachedSprite.worldAlpha = this.worldAlpha;

    Tiny.Sprite.prototype.render.call(this._cachedSprite, renderSession);
};

Tiny.BaseObject2D.prototype._generateCachedSprite = function () {
    this._cachedSprite = null;
    this._cacheAsBitmap = false;

    var bounds = this.getLocalBounds();

    if (!this._cachedSprite) {
        var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0); //, renderSession.renderer);

        this._cachedSprite = new Tiny.Sprite(renderTexture);
        this._cachedSprite.worldTransform = this.worldTransform;
    } else {
        this._cachedSprite.texture.resize(bounds.width | 0, bounds.height | 0);
    }

    Tiny.BaseObject2D._tempMatrix.tx = -bounds.x;
    Tiny.BaseObject2D._tempMatrix.ty = -bounds.y;

    this._cachedSprite.texture.render(this, Tiny.BaseObject2D._tempMatrix, true);

    this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
    this._cachedSprite.anchor.y = -(bounds.y / bounds.height);

    this._cacheAsBitmap = true;
};

Tiny.BaseObject2D.prototype._destroyCachedSprite = function () {
    if (!this._cachedSprite) return;

    this._cachedSprite.texture.destroy(true);

    this._cachedSprite = null;
};

Tiny.BaseObject2D.prototype.render = function (renderSession) {};

Object.defineProperty(Tiny.BaseObject2D.prototype, "x", {
    get: function () {
        return this.position.x;
    },

    set: function (value) {
        this.position.x = value;
    }
});

Object.defineProperty(Tiny.BaseObject2D.prototype, "y", {
    get: function () {
        return this.position.y;
    },

    set: function (value) {
        this.position.y = value;
    }
});

Tiny.BaseObject2D._tempMatrix = new Tiny.Matrix();


/***/ }),

/***/ "./src/objects/Graphics.js":
/*!*********************************!*\
  !*** ./src/objects/Graphics.js ***!
  \*********************************/
/***/ (() => {

Tiny.GraphicsData = function (lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape) {
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.lineAlpha = lineAlpha;
    this._lineTint = lineColor;
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this._fillTint = fillColor;
    this.fill = fill;
    this.shape = shape;
    this.type = shape.type;
};

Tiny.GraphicsData.prototype.constructor = Tiny.GraphicsData;

Tiny.GraphicsData.prototype.clone = function () {
    return new GraphicsData(
        this.lineWidth,
        this.lineColor,
        this.lineAlpha,
        this.fillColor,
        this.fillAlpha,
        this.fill,
        this.shape
    );
};

Tiny.Graphics = function () {
    Tiny.Object2D.call(this);

    this.renderable = true;
    this.fillAlpha = 1;
    this.lineWidth = 0;
    this.lineColor = "#000000";
    this.graphicsData = [];
    this.tint = "#ffffff";
    this.blendMode = "source-over";
    this.currentPath = null;
    this.isMask = false;
    this.boundsPadding = 0;

    this._localBounds = new Tiny.Rectangle(0, 0, 1, 1);
    this._boundsDirty = true;
    this.cachedSpriteDirty = false;
};

// constructor
Tiny.Graphics.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.Graphics.prototype.constructor = Tiny.Graphics;

Tiny.Graphics.prototype.lineStyle = function (lineWidth, color, alpha) {
    this.lineWidth = lineWidth || 0;
    this.lineColor = color || "#000000";
    this.lineAlpha = alpha === undefined ? 1 : alpha;

    if (this.currentPath) {
        if (this.currentPath.shape.points.length) {
            // halfway through a line? start a new one!
            this.drawShape(new Tiny.Polygon(this.currentPath.shape.points.slice(-2)));
        } else {
            // otherwise its empty so lets just set the line properties
            this.currentPath.lineWidth = this.lineWidth;
            this.currentPath.lineColor = this.lineColor;
            this.currentPath.lineAlpha = this.lineAlpha;
        }
    }

    return this;
};

Tiny.Graphics.prototype.moveTo = function (x, y) {
    this.drawShape(new Tiny.Polygon([x, y]));

    return this;
};

Tiny.Graphics.prototype.lineTo = function (x, y) {
    if (!this.currentPath) {
        this.moveTo(0, 0);
    }

    this.currentPath.shape.points.push(x, y);
    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.quadraticCurveTo = function (cpX, cpY, toX, toY) {
    if (this.currentPath) {
        if (this.currentPath.shape.points.length === 0) {
            this.currentPath.shape.points = [0, 0];
        }
    } else {
        this.moveTo(0, 0);
    }

    var xa,
        ya,
        n = 20,
        points = this.currentPath.shape.points;

    if (points.length === 0) {
        this.moveTo(0, 0);
    }

    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];
    var j = 0;
    for (var i = 1; i <= n; ++i) {
        j = i / n;

        xa = fromX + (cpX - fromX) * j;
        ya = fromY + (cpY - fromY) * j;

        points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.bezierCurveTo = function (cpX, cpY, cpX2, cpY2, toX, toY) {
    if (this.currentPath) {
        if (this.currentPath.shape.points.length === 0) {
            this.currentPath.shape.points = [0, 0];
        }
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

    for (var i = 1; i <= n; ++i) {
        j = i / n;

        dt = 1 - j;
        dt2 = dt * dt;
        dt3 = dt2 * dt;

        t2 = j * j;
        t3 = t2 * j;

        points.push(
            dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX,
            dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY
        );
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.arcTo = function (x1, y1, x2, y2, radius) {
    if (this.currentPath) {
        if (this.currentPath.shape.points.length === 0) {
            this.currentPath.shape.points.push(x1, y1);
        }
    } else {
        this.moveTo(x1, y1);
    }

    var points = this.currentPath.shape.points,
        fromX = points[points.length - 2],
        fromY = points[points.length - 1],
        a1 = fromY - y1,
        b1 = fromX - x1,
        a2 = y2 - y1,
        b2 = x2 - x1,
        mm = Math.abs(a1 * b2 - b1 * a2);

    if (mm < 1.0e-8 || radius === 0) {
        if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
            points.push(x1, y1);
        }
    } else {
        var dd = a1 * a1 + b1 * b1,
            cc = a2 * a2 + b2 * b2,
            tt = a1 * a2 + b1 * b2,
            k1 = (radius * Math.sqrt(dd)) / mm,
            k2 = (radius * Math.sqrt(cc)) / mm,
            j1 = (k1 * tt) / dd,
            j2 = (k2 * tt) / cc,
            cx = k1 * b2 + k2 * b1,
            cy = k1 * a2 + k2 * a1,
            px = b1 * (k2 + j1),
            py = a1 * (k2 + j1),
            qx = b2 * (k1 + j2),
            qy = a2 * (k1 + j2),
            startAngle = Math.atan2(py - cy, px - cx),
            endAngle = Math.atan2(qy - cy, qx - cx);

        this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.arc = function (cx, cy, radius, startAngle, endAngle, anticlockwise) {
    //  If we do this we can never draw a full circle
    if (startAngle === endAngle) {
        return this;
    }

    if (typeof anticlockwise === "undefined") {
        anticlockwise = false;
    }

    if (!anticlockwise && endAngle <= startAngle) {
        endAngle += Math.PI * 2;
    } else if (anticlockwise && startAngle <= endAngle) {
        startAngle += Math.PI * 2;
    }

    var sweep = anticlockwise ? (startAngle - endAngle) * -1 : endAngle - startAngle;
    var segs = Math.ceil(Math.abs(sweep) / (Math.PI * 2)) * 40;

    //  Sweep check - moved here because we don't want to do the moveTo below if the arc fails
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

    var remainder = (segMinus % 1) / segMinus;

    for (var i = 0; i <= segMinus; i++) {
        var real = i + remainder * i;

        var angle = theta + startAngle + theta2 * real;

        var c = Math.cos(angle);
        var s = -Math.sin(angle);

        points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.beginFill = function (color, alpha) {
    this.filling = true;
    this.fillColor = color || "#000000";
    this.fillAlpha = alpha === undefined ? 1 : alpha;

    if (this.currentPath) {
        if (this.currentPath.shape.points.length <= 2) {
            this.currentPath.fill = this.filling;
            this.currentPath.fillColor = this.fillColor;
            this.currentPath.fillAlpha = this.fillAlpha;
        }
    }

    return this;
};

Tiny.Graphics.prototype.endFill = function () {
    this.filling = false;
    this.fillColor = null;
    this.fillAlpha = 1;

    return this;
};

Tiny.Graphics.prototype.drawRect = function (x, y, width, height) {
    this.drawShape(new Tiny.Rectangle(x, y, width, height));

    return this;
};

Tiny.Graphics.prototype.drawRoundedRect = function (x, y, width, height, radius) {
    if (radius > 0) this.drawShape(new Tiny.RoundedRectangle(x, y, width, height, radius));
    else this.drawRect(x, y, width, height);

    return this;
};

// Tiny.Graphics.prototype.drawRoundedRect2 = function(x, y, width, height, radius)
// {
//     var shape = new Tiny.RoundedRectangle(x, y, width, height, radius)
//     shape.type = Tiny.Primitives.RREC_LJOIN;
//     this.drawShape(shape);

//     return this;
// };

Tiny.Graphics.prototype.drawCircle = function (x, y, diameter) {
    this.drawShape(new Tiny.Circle(x, y, diameter));

    return this;
};

// Moved to extra Ellipse
// Tiny.Graphics.prototype.drawEllipse = function(x, y, width, height)
// {
//     this.drawShape(new Tiny.Ellipse(x, y, width, height));

//     return this;
// };

Tiny.Graphics.prototype.drawPolygon = function (path) {
    // prevents an argument assignment deopt
    // see section 3.1: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
    var points = path;

    if (!Array.isArray(points)) {
        // prevents an argument leak deopt
        // see section 3.2: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
        points = new Array(arguments.length);

        for (var i = 0; i < points.length; ++i) {
            points[i] = arguments[i];
        }
    }

    this.drawShape(new Tiny.Polygon(points));

    return this;
};

Tiny.Graphics.prototype.clear = function () {
    this.lineWidth = 0;
    this.filling = false;

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;
    this.graphicsData = [];
    this.updateLocalBounds();

    return this;
};

Tiny.Graphics.prototype.destroy = function (destroyChildren) {
    Tiny.Object2D.prototype.destroy.call(this);

    this.clear();
};

Tiny.Graphics.prototype.generateTexture = function (resolution) {
    resolution = resolution || 1;

    var bounds = this.getBounds();

    var canvasBuffer = new Tiny.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);

    var texture = Tiny.Texture.fromCanvas(canvasBuffer.canvas);
    texture.resolution = resolution;

    canvasBuffer.context.scale(resolution, resolution);

    canvasBuffer.context.translate(-bounds.x, -bounds.y);

    Tiny.CanvasGraphics.renderGraphics(this, canvasBuffer.context);

    return texture;
};

Tiny.Graphics.prototype.render = function (renderSession) {
    if (this.isMask === true) {
        return;
    }

    // if the tint has changed, set the graphics object to dirty.
    if (this._prevTint !== this.tint) {
        this._boundsDirty = true;
        this._prevTint = this.tint;
    }

    if (this._cacheAsBitmap) {
        if (this.cachedSpriteDirty) {
            this._generateCachedSprite();

            // we will also need to update the texture
            this.updateCachedSpriteTexture();

            this.cachedSpriteDirty = false;
            this._boundsDirty = false;
        }

        this._cachedSprite.alpha = this.alpha;
        Tiny.Sprite.prototype.render.call(this._cachedSprite, renderSession);

        return;
    } else {
        var context = renderSession.context;
        var transform = this.worldTransform;

        if (this.blendMode !== renderSession.currentBlendMode) {
            renderSession.currentBlendMode = this.blendMode;
            context.globalCompositeOperation = renderSession.currentBlendMode;
        }

        if (this._mask) {
            renderSession.maskManager.pushMask(this._mask, renderSession);
        }

        var resolution = renderSession.resolution;

        context.setTransform(
            transform.a * resolution,
            transform.b * resolution,
            transform.c * resolution,
            transform.d * resolution,
            transform.tx * resolution,
            transform.ty * resolution
        );

        Tiny.CanvasGraphics.renderGraphics(this, context);

        // simple render children!
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].render(renderSession);
        }

        if (this._mask) {
            renderSession.maskManager.popMask(renderSession);
        }
    }
};

Tiny.Graphics.prototype.getBounds = function (matrix) {
    if (!this._currentBounds || this._boundsDirty) {
        // return an empty object if the item is a mask!
        if (!this.renderable) {
            return Tiny.EmptyRectangle;
        }

        if (this._boundsDirty) {
            this.updateLocalBounds();
            this.cachedSpriteDirty = true;
            this._boundsDirty = false;
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

        this._currentBounds = this._bounds;
    }

    return this._currentBounds;
};

Tiny.Graphics.prototype.containsPoint = function (point) {
    this.worldTransform.applyInverse(point, tempPoint);

    var graphicsData = this.graphicsData;

    for (var i = 0; i < graphicsData.length; i++) {
        var data = graphicsData[i];

        if (!data.fill) {
            continue;
        }

        // only deal with fills..
        if (data.shape) {
            if (data.shape.contains(tempPoint.x, tempPoint.y)) {
                return true;
            }
        }
    }

    return false;
};

Tiny.Graphics.prototype.updateLocalBounds = function () {
    var minX = Infinity;
    var maxX = -Infinity;

    var minY = Infinity;
    var maxY = -Infinity;

    if (this.graphicsData.length) {
        var shape, points, x, y, w, h;

        for (var i = 0; i < this.graphicsData.length; i++) {
            var data = this.graphicsData[i];
            var type = data.type;
            var lineWidth = data.lineWidth;
            shape = data.shape;

            if (
                type === Tiny.Primitives.RECT ||
                type === Tiny.Primitives.RREC ||
                type === Tiny.Primitives.RREC_LJOIN
            ) {
                x = shape.x - lineWidth / 2;
                y = shape.y - lineWidth / 2;
                w = shape.width + lineWidth;
                h = shape.height + lineWidth;

                minX = x < minX ? x : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y < minY ? y : minY;
                maxY = y + h > maxY ? y + h : maxY;
            } else if (type === Tiny.Primitives.CIRC) {
                x = shape.x;
                y = shape.y;
                w = shape.radius + lineWidth / 2;
                h = shape.radius + lineWidth / 2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            } else if (type === Tiny.Primitives.ELIP) {
                x = shape.x;
                y = shape.y;
                w = shape.width + lineWidth / 2;
                h = shape.height + lineWidth / 2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            } else {
                // POLY - assumes points are sequential, not Point objects
                points = shape.points;

                for (var j = 0; j < points.length; j++) {
                    if (points[j] instanceof Tiny.Point) {
                        x = points[j].x;
                        y = points[j].y;
                    } else {
                        x = points[j];
                        y = points[j + 1];

                        if (j < points.length - 1) {
                            j++;
                        }
                    }

                    minX = x - lineWidth < minX ? x - lineWidth : minX;
                    maxX = x + lineWidth > maxX ? x + lineWidth : maxX;

                    minY = y - lineWidth < minY ? y - lineWidth : minY;
                    maxY = y + lineWidth > maxY ? y + lineWidth : maxY;
                }
            }
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
};

Tiny.Graphics.prototype._generateCachedSprite = function () {
    var bounds = this.getLocalBounds();

    if (!this._cachedSprite) {
        var canvasBuffer = new Tiny.CanvasBuffer(bounds.width, bounds.height);
        var texture = Tiny.Texture.fromCanvas(canvasBuffer.canvas);

        this._cachedSprite = new Tiny.Sprite(texture);
        this._cachedSprite.buffer = canvasBuffer;

        this._cachedSprite.worldTransform = this.worldTransform;
    } else {
        this._cachedSprite.buffer.resize(bounds.width, bounds.height);
    }

    // leverage the anchor to account for the offset of the element
    this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
    this._cachedSprite.anchor.y = -(bounds.y / bounds.height);

    // this._cachedSprite.buffer.context.save();
    this._cachedSprite.buffer.context.translate(-bounds.x, -bounds.y);

    // make sure we set the alpha of the graphics to 1 for the render..
    this.worldAlpha = 1;

    // now render the graphic..
    Tiny.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context);
    this._cachedSprite.alpha = this.alpha;
};

/**
 * Updates texture size based on canvas size
 *
 * @method updateCachedSpriteTexture
 * @private
 */
Tiny.Graphics.prototype.updateCachedSpriteTexture = function () {
    var cachedSprite = this._cachedSprite;
    var texture = cachedSprite.texture;
    var canvas = cachedSprite.buffer.canvas;

    texture.width = canvas.width;
    texture.height = canvas.height;
    texture.crop.width = texture.frame.width = canvas.width;
    texture.crop.height = texture.frame.height = canvas.height;

    cachedSprite._width = canvas.width;
    cachedSprite._height = canvas.height;
};

/**
 * Destroys a previous cached sprite.
 *
 * @method destroyCachedSprite
 */
Tiny.Graphics.prototype.destroyCachedSprite = function () {
    this._cachedSprite.texture.destroy(true);
    this._cachedSprite = null;
};

Tiny.Graphics.prototype.drawShape = function (shape) {
    if (this.currentPath) {
        // check current path!
        if (this.currentPath.shape.points.length <= 2) {
            this.graphicsData.pop();
        }
    }

    this.currentPath = null;

    //  Handle mixed-type polygons
    if (shape instanceof Tiny.Polygon) {
        shape.flatten();
    }

    var data = new Tiny.GraphicsData(
        this.lineWidth,
        this.lineColor,
        this.lineAlpha,
        this.fillColor,
        this.fillAlpha,
        this.filling,
        shape
    );

    this.graphicsData.push(data);

    if (data.type === Tiny.Primitives.POLY) {
        data.shape.closed = this.filling;
        this.currentPath = data;
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return data;
};

Object.defineProperty(Tiny.Graphics.prototype, "cacheAsBitmap", {
    get: function () {
        return this._cacheAsBitmap;
    },

    set: function (value) {
        this._cacheAsBitmap = value;

        if (this._cacheAsBitmap) {
            this._generateCachedSprite();
        } else {
            this.destroyCachedSprite();
            this._boundsDirty = true;
        }
    }
});


/***/ }),

/***/ "./src/objects/Object2D.js":
/*!*********************************!*\
  !*** ./src/objects/Object2D.js ***!
  \*********************************/
/***/ (() => {

Tiny.Object2D = function () {
    Tiny.BaseObject2D.call(this);

    this.children = [];
    this._bounds = new Tiny.Rectangle(0, 0, 1, 1);
    this._currentBounds = null;
    this._mask = null;
};

Tiny.Object2D.prototype = Object.create(Tiny.BaseObject2D.prototype);
Tiny.Object2D.prototype.constructor = Tiny.Object2D;

// Object.defineProperty(Tiny.Object2D.prototype, 'inputEnabled', {

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

Object.defineProperty(Tiny.Object2D.prototype, "width", {
    get: function () {
        return this.scale.x * this.getLocalBounds().width;
    },

    set: function (value) {
        var width = this.getLocalBounds().width;

        if (width !== 0) {
            this.scale.x = value / width;
        } else {
            this.scale.x = 1;
        }

        this._width = value;
    }
});

Object.defineProperty(Tiny.Object2D.prototype, "height", {
    get: function () {
        return this.scale.y * this.getLocalBounds().height;
    },

    set: function (value) {
        var height = this.getLocalBounds().height;

        if (height !== 0) {
            this.scale.y = value / height;
        } else {
            this.scale.y = 1;
        }

        this._height = value;
    }
});

Object.defineProperty(Tiny.Object2D.prototype, "mask", {
    get: function () {
        return this._mask;
    },

    set: function (value) {
        if (this._mask) this._mask.isMask = false;

        this._mask = value;

        if (this._mask) this._mask.isMask = true;
    }
});

Tiny.Object2D.prototype.destroy = function () {
    var i = this.children.length;

    while (i--) {
        this.children[i].destroy();
    }

    this.children = [];

    Tiny.BaseObject2D.prototype.destroy.call(this);

    this._bounds = null;
    this._currentBounds = null;
    this._mask = null;

    if (this.input) this.input.system.remove(this);
};

Tiny.Object2D.prototype.add = function (child) {
    return this.addChildAt(child, this.children.length);
};

Tiny.Object2D.prototype.addChildAt = function (child, index) {
    if (index >= 0 && index <= this.children.length) {
        if (child.parent) {
            child.parent.remove(child);
        }

        child.parent = this;

        if (this.game) child.game = this.game;

        this.children.splice(index, 0, child);

        return child;
    } else {
        throw new Error(
            child + "addChildAt: The index " + index + " supplied is out of bounds " + this.children.length
        );
    }
};

Tiny.Object2D.prototype.swapChildren = function (child, child2) {
    if (child === child2) {
        return;
    }

    var index1 = this.getChildIndex(child);
    var index2 = this.getChildIndex(child2);

    if (index1 < 0 || index2 < 0) {
        throw new Error("swapChildren: Both the supplied Objects must be a child of the caller.");
    }

    this.children[index1] = child2;
    this.children[index2] = child;
};

Tiny.Object2D.prototype.getChildIndex = function (child) {
    var index = this.children.indexOf(child);
    if (index === -1) {
        throw new Error("The supplied Object must be a child of the caller");
    }
    return index;
};

Tiny.Object2D.prototype.setChildIndex = function (child, index) {
    if (index < 0 || index >= this.children.length) {
        throw new Error("The supplied index is out of bounds");
    }
    var currentIndex = this.getChildIndex(child);
    this.children.splice(currentIndex, 1); //remove from old position
    this.children.splice(index, 0, child); //add at new position
};

Tiny.Object2D.prototype.getChildAt = function (index) {
    if (index < 0 || index >= this.children.length) {
        throw new Error(
            "getChildAt: Supplied index " +
                index +
                " does not exist in the child list, or the supplied Object must be a child of the caller"
        );
    }
    return this.children[index];
};

Tiny.Object2D.prototype.remove = function (child) {
    var index = this.children.indexOf(child);
    if (index === -1) return;

    return this.removeChildAt(index);
};

Tiny.Object2D.prototype.removeChildAt = function (index) {
    var child = this.getChildAt(index);
    child.parent = undefined;
    this.children.splice(index, 1);
    return child;
};

Tiny.Object2D.prototype.updateTransform = function () {
    if (!this.visible) return;

    this.displayObjectUpdateTransform();

    if (this._cacheAsBitmap) return;

    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].updateTransform();
    }
};

// performance increase to avoid using call.. (10x faster)
Tiny.Object2D.prototype.displayObjectContainerUpdateTransform = Tiny.Object2D.prototype.updateTransform;

Tiny.Object2D.prototype.getBounds = function () {
    if (this.children.length === 0) return Tiny.EmptyRectangle;
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

    if (!childVisible) return Tiny.EmptyRectangle;

    var bounds = this._bounds;

    bounds.x = minX;
    bounds.y = minY;
    bounds.width = maxX - minX;
    bounds.height = maxY - minY;

    // TODO: store a reference so that if this function gets called again in the render cycle we do not have to recalculate
    //this._currentBounds = bounds;

    return bounds;
};

Tiny.Object2D.prototype.getLocalBounds = function () {
    var matrixCache = this.worldTransform;

    this.worldTransform = Tiny.identityMatrix;

    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].updateTransform();
    }

    var bounds = this.getBounds();

    this.worldTransform = matrixCache;

    return bounds;
};

Tiny.Object2D.prototype.render = function (renderSession) {
    if (this.visible === false || this.alpha === 0) return;

    if (this._cacheAsBitmap) {
        this._renderCachedSprite(renderSession);
        return;
    }

    if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].render(renderSession);
    }

    if (this._mask) {
        renderSession.maskManager.popMask(renderSession);
    }
};


/***/ }),

/***/ "./src/objects/Scene.js":
/*!******************************!*\
  !*** ./src/objects/Scene.js ***!
  \******************************/
/***/ (() => {

Tiny.Scene = function (game) {
    Tiny.Object2D.call(this);
    this.worldTransform = new Tiny.Matrix();
    this.game = game;
};

Tiny.Scene.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.Scene.prototype.constructor = Tiny.Scene;

Tiny.Scene.prototype.updateTransform = function () {
    this.worldAlpha = 1;

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].updateTransform();
    }
};


/***/ }),

/***/ "./src/objects/Sprite.js":
/*!*******************************!*\
  !*** ./src/objects/Sprite.js ***!
  \*******************************/
/***/ (() => {

Tiny.Sprite = function (texture, key) {
    Tiny.Object2D.call(this);

    this.anchor = new Tiny.Point();

    this.setTexture(texture, key, false);

    this._width = 0;

    this._height = 0;

    this._frame = 0;

    this.tint = '#ffffff';

    this.blendMode = 'source-over';

    if (this.texture.hasLoaded) {
        this.onTextureUpdate();
    }

    this.renderable = true;
};

Tiny.Sprite.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.Sprite.prototype.constructor = Tiny.Sprite;

Object.defineProperty(Tiny.Sprite.prototype, 'frameName', {
    get: function () {
        return this.texture.frame.name;
    },

    set: function (value) {
        if (this.texture.frame.name) {
            this.setTexture(Tiny.Cache.texture[this.texture.key + '.' + value]);
        }
    }
});

Object.defineProperty(Tiny.Sprite.prototype, 'frame', {
    get: function () {
        return this._frame;
    },

    set: function (value) {
        if (this.texture.lastFrame) {
            this._frame = value;
            if (this._frame > this.texture.lastFrame) this._frame = 0;
            else if (this._frame < 0) this._frame = this.texture.lastFrame;
            this.setTexture(Tiny.Cache.texture[this.texture.key + '.' + this._frame]);
        }
    }
});

Object.defineProperty(Tiny.Sprite.prototype, 'width', {
    get: function () {
        return this.scale.x * this.texture.frame.width;
    },

    set: function (value) {
        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    }
});

Object.defineProperty(Tiny.Sprite.prototype, 'height', {
    get: function () {
        return this.scale.y * this.texture.frame.height;
    },

    set: function (value) {
        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    }
});

Tiny.Sprite.prototype.setTexture = function (texture, key, updateDimension) {
    if (typeof texture == 'string') {
        var imagePath = texture;

        if (key != undefined) {
            imagePath = imagePath + '.' + key;
        }

        texture = Tiny.Cache.texture[imagePath];

        if (!texture) {
            texture = new Tiny.Texture(imagePath);
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
};

Tiny.Sprite.prototype.onTextureUpdate = function () {
    // so if _width is 0 then width was not set..
    if (this._width) this.scale.x = this._width / this.texture.frame.width;
    if (this._height) this.scale.y = this._height / this.texture.frame.height;
};

Tiny.Sprite.prototype.animate = function (delay, yoyo) {
    this.reverse = false;
    this.yoyo = yoyo;

    if (this.texture.lastFrame) {
        delay = delay || this.texture.frame.duration || 100;

        if (!this.animation) {
            this.animation = this.game.timer.loop(
                delay,
                function () {
                    if (this.yoyo) {
                        if (this.frame === 0) this.reverse = false;
                        else if (this.frame === this.texture.lastFrame) this.reverse = true;
                    }

                    this.frame += this.reverse ? -1 : 1;
                    this.animation.delay = delay || this.texture.frame.duration || 100;
                },
                this
            );

            this.animation.start();
        } else {
            this.animation.delay = delay;
            this.animation.start();
        }
    }
};

Tiny.Sprite.prototype.getBounds = function (matrix) {
    var width = this.texture.frame.width / this.texture.resolution;
    var height = this.texture.frame.height / this.texture.resolution;

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
};

Tiny.Sprite.prototype.render = function (renderSession) {
    // If the sprite is not visible or the alpha is 0 then no need to render this element
    if (
        this.visible === false ||
        this.alpha === 0 ||
        this.renderable === false ||
        this.texture.crop.width <= 0 ||
        this.texture.crop.height <= 0
    )
        return;

    if (this.blendMode !== renderSession.currentBlendMode) {
        renderSession.currentBlendMode = this.blendMode;
        renderSession.context.globalCompositeOperation = renderSession.currentBlendMode;
    }

    if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    //  Ignore null sources
    if (this.texture.valid) {
        var resolution = this.texture.resolution / renderSession.resolution;

        renderSession.context.globalAlpha = this.worldAlpha;

        //  If the texture is trimmed we offset by the trim x/y, otherwise we use the frame dimensions
        var dx = this.texture.trim
            ? this.texture.trim.x - this.anchor.x * this.texture.trim.width
            : this.anchor.x * -this.texture.frame.width;
        var dy = this.texture.trim
            ? this.texture.trim.y - this.anchor.y * this.texture.trim.height
            : this.anchor.y * -this.texture.frame.height;

        //  Allow for pixel rounding
        if (renderSession.roundPixels) {
            renderSession.context.setTransform(
                this.worldTransform.a,
                this.worldTransform.b,
                this.worldTransform.c,
                this.worldTransform.d,
                (this.worldTransform.tx * renderSession.resolution) | 0,
                (this.worldTransform.ty * renderSession.resolution) | 0
            );
            dx = dx | 0;
            dy = dy | 0;
        } else {
            renderSession.context.setTransform(
                this.worldTransform.a,
                this.worldTransform.b,
                this.worldTransform.c,
                this.worldTransform.d,
                this.worldTransform.tx * renderSession.resolution,
                this.worldTransform.ty * renderSession.resolution
            );
        }

        if (this.tint !== '#ffffff') {
            if (this.cachedTint !== this.tint) {
                this.cachedTint = this.tint;
                this.tintedTexture = Tiny.CanvasTinter.getTintedTexture(this, this.tint);
            }

            renderSession.context.drawImage(
                this.tintedTexture,
                0,
                0,
                this.texture.crop.width,
                this.texture.crop.height,
                dx / resolution,
                dy / resolution,
                this.texture.crop.width / resolution,
                this.texture.crop.height / resolution
            );
        } else {
            renderSession.context.drawImage(
                this.texture.source,
                this.texture.crop.x,
                this.texture.crop.y,
                this.texture.crop.width,
                this.texture.crop.height,
                dx / resolution,
                dy / resolution,
                this.texture.crop.width / resolution,
                this.texture.crop.height / resolution
            );
        }
    }

    // OVERWRITE
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].render(renderSession);
    }

    if (this._mask) {
        renderSession.maskManager.popMask(renderSession);
    }
};


/***/ }),

/***/ "./src/objects/Text.js":
/*!*****************************!*\
  !*** ./src/objects/Text.js ***!
  \*****************************/
/***/ (() => {

Tiny.Text = function (text, style) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.resolution = 1;

    Tiny.Sprite.call(this, Tiny.Texture.fromCanvas(this.canvas));

    this.setText(text);
    this.setStyle(style);
};

Tiny.Text.prototype = Object.create(Tiny.Sprite.prototype);
Tiny.Text.prototype.constructor = Tiny.Text;

Object.defineProperty(Tiny.Text.prototype, "width", {
    get: function () {
        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }

        return this.scale.x * this.texture.frame.width;
    },
    set: function (value) {
        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    }
});

Object.defineProperty(Tiny.Text.prototype, "height", {
    get: function () {
        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }

        return this.scale.y * this.texture.frame.height;
    },
    set: function (value) {
        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    }
});

Tiny.Text.prototype.setStyle = function (style) {
    style = style || {};
    style.font = style.font || "bold 20pt Arial";
    style.fill = style.fill || "black";
    style.align = style.align || "left";
    style.stroke = style.stroke || "black";
    style.strokeThickness = style.strokeThickness || 0;
    style.wordWrap = style.wordWrap || false;
    style.lineSpacing = style.lineSpacing || 0;
    style.wordWrapWidth = style.wordWrapWidth !== undefined ? style.wordWrapWidth : 100;

    style.dropShadow = style.dropShadow || false;
    style.dropShadowAngle = style.dropShadowAngle !== undefined ? style.dropShadowAngle : Math.PI / 6;
    style.dropShadowDistance = style.dropShadowDistance !== undefined ? style.dropShadowDistance : 4;
    style.dropShadowColor = style.dropShadowColor || "black";

    this.style = style;
    this.dirty = true;
};

Tiny.Text.prototype.setText = function (text) {
    this.text = text.toString() || " ";
    this.dirty = true;
};

Tiny.Text.prototype.updateText = function () {
    this.texture.resolution = this.resolution;

    this.context.font = this.style.font;

    var outputText = this.text;

    // word wrap
    // preserve original text
    if (this.style.wordWrap) outputText = this.wordWrap(this.text);

    //split text into lines
    var lines = outputText.split(/(?:\r\n|\r|\n)/);

    //calculate text width
    var lineWidths = [];
    var maxLineWidth = 0;
    var fontProperties = this.determineFontProperties(this.style.font);
    for (var i = 0; i < lines.length; i++) {
        var lineWidth = this.context.measureText(lines[i]).width;
        lineWidths[i] = lineWidth;
        maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }

    var width = maxLineWidth + this.style.strokeThickness;
    if (this.style.dropShadow) width += this.style.dropShadowDistance;

    this.canvas.width = (width + this.context.lineWidth) * this.resolution;

    //calculate text height
    var lineHeight = fontProperties.fontSize + this.style.strokeThickness + this.style.lineSpacing;

    var height = lineHeight * lines.length;
    if (this.style.dropShadow) height += this.style.dropShadowDistance;

    this.canvas.height = (height - this.style.lineSpacing) * this.resolution;

    this.context.scale(this.resolution, this.resolution);

    if (navigator.isCocoonJS) this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // used for debugging..
    //this.context.fillStyle ="#FF0000"
    //this.context.fillRect(0, 0, this.canvas.width,this.canvas.height);

    this.context.font = this.style.font;
    this.context.strokeStyle = this.style.stroke;
    this.context.lineWidth = this.style.strokeThickness;
    this.context.textBaseline = "alphabetic";
    this.context.miterLimit = 2;

    //this.context.lineJoin = 'round';

    var linePositionX;
    var linePositionY;

    if (this.style.dropShadow) {
        this.context.fillStyle = this.style.dropShadowColor;

        var xShadowOffset = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance;
        var yShadowOffset = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;

        for (i = 0; i < lines.length; i++) {
            linePositionX = this.style.strokeThickness / 2;
            linePositionY = this.style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;

            if (this.style.align === "right") {
                linePositionX += maxLineWidth - lineWidths[i];
            } else if (this.style.align === "center") {
                linePositionX += (maxLineWidth - lineWidths[i]) / 2;
            }

            if (this.style.fill) {
                this.context.fillText(lines[i], linePositionX + xShadowOffset, linePositionY + yShadowOffset);
            }

            //  if(dropShadow)
        }
    }

    //set canvas text styles
    this.context.fillStyle = this.style.fill;

    //draw lines line by line
    for (i = 0; i < lines.length; i++) {
        linePositionX = this.style.strokeThickness / 2;
        linePositionY = this.style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;

        if (this.style.align === "right") {
            linePositionX += maxLineWidth - lineWidths[i];
        } else if (this.style.align === "center") {
            linePositionX += (maxLineWidth - lineWidths[i]) / 2;
        }

        if (this.style.stroke && this.style.strokeThickness) {
            this.context.strokeText(lines[i], linePositionX, linePositionY);
        }

        if (this.style.fill) {
            this.context.fillText(lines[i], linePositionX, linePositionY);
        }

        //  if(dropShadow)
    }

    this.updateTexture();
};

Tiny.Text.prototype.updateTexture = function () {
    this.texture.width = this.canvas.width;
    this.texture.height = this.canvas.height;
    this.texture.crop.width = this.texture.frame.width = this.canvas.width;
    this.texture.crop.height = this.texture.frame.height = this.canvas.height;

    this._width = this.canvas.width;
    this._height = this.canvas.height;
};

Tiny.Text.prototype.render = function (renderSession) {
    if (this.dirty || this.resolution !== renderSession.resolution) {
        this.resolution = renderSession.resolution;

        this.updateText();
        this.dirty = false;
    }

    Tiny.Sprite.prototype.render.call(this, renderSession);
};

Tiny.Text.prototype.determineFontProperties = function (fontStyle) {
    var properties = Tiny.Text.fontPropertiesCache[fontStyle];

    if (!properties) {
        properties = {};

        var canvas = Tiny.Text.fontPropertiesCanvas;
        var context = Tiny.Text.fontPropertiesContext;

        context.font = fontStyle;

        var width = Math.ceil(context.measureText("|MÉq").width);
        var baseline = Math.ceil(context.measureText("|MÉq").width);
        var height = 2 * baseline;

        baseline = (baseline * 1.4) | 0;

        canvas.width = width;
        canvas.height = height;

        context.fillStyle = "#f00";
        context.fillRect(0, 0, width, height);

        context.font = fontStyle;

        context.textBaseline = "alphabetic";
        context.fillStyle = "#000";
        context.fillText("|MÉq", 0, baseline);

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

        Tiny.Text.fontPropertiesCache[fontStyle] = properties;
    }

    return properties;
};

Tiny.Text.prototype.wordWrap = function (text) {
    // Greedy wrapping algorithm that will wrap words as the line grows longer
    // than its horizontal bounds.
    var result = "";
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var spaceLeft = this.style.wordWrapWidth;
        var words = lines[i].split(" ");
        for (var j = 0; j < words.length; j++) {
            var wordWidth = this.context.measureText(words[j]).width;
            var wordWidthWithSpace = wordWidth + this.context.measureText(" ").width;
            if (j === 0 || wordWidthWithSpace > spaceLeft) {
                // Skip printing the newline if it's the first word of the line that is
                // greater than the word wrap width.
                if (j > 0) {
                    result += "\n";
                }
                result += words[j];
                spaceLeft = this.style.wordWrapWidth - wordWidth;
            } else {
                spaceLeft -= wordWidthWithSpace;
                result += " " + words[j];
            }
        }

        if (i < lines.length - 1) {
            result += "\n";
        }
    }
    return result;
};

Tiny.Text.prototype.getBounds = function (matrix) {
    if (this.dirty) {
        this.updateText();
        this.dirty = false;
    }

    return Tiny.Sprite.prototype.getBounds.call(this, matrix);
};

Tiny.Text.prototype.destroy = function () {
    // make sure to reset the the context and canvas.. dont want this hanging around in memory!
    this.context = null;
    this.canvas = null;

    this.texture.destroy();

    Tiny.Sprite.prototype.destroy.call(this);
};

Tiny.Text.fontPropertiesCache = {};
Tiny.Text.fontPropertiesCanvas = document.createElement("canvas");
Tiny.Text.fontPropertiesContext = Tiny.Text.fontPropertiesCanvas.getContext("2d");


/***/ }),

/***/ "./src/renderers/CanvasMaskManager.js":
/*!********************************************!*\
  !*** ./src/renderers/CanvasMaskManager.js ***!
  \********************************************/
/***/ (() => {

Tiny.CanvasMaskManager = function () {};

Tiny.CanvasMaskManager.prototype.constructor = Tiny.CanvasMaskManager;

Tiny.CanvasMaskManager.prototype.pushMask = function (maskData, renderSession) {
    var context = renderSession.context;

    context.save();

    var cacheAlpha = maskData.alpha;
    var transform = maskData.worldTransform;

    var resolution = renderSession.resolution;

    context.setTransform(
        transform.a * resolution,
        transform.b * resolution,
        transform.c * resolution,
        transform.d * resolution,
        transform.tx * resolution,
        transform.ty * resolution
    );

    Tiny.CanvasGraphics.renderGraphicsMask(maskData, context);

    context.clip();

    maskData.worldAlpha = cacheAlpha;
};

Tiny.CanvasMaskManager.prototype.popMask = function (renderSession) {
    renderSession.context.restore();
};


/***/ }),

/***/ "./src/renderers/CanvasRenderer.js":
/*!*****************************************!*\
  !*** ./src/renderers/CanvasRenderer.js ***!
  \*****************************************/
/***/ (() => {

Tiny.CanvasRenderer = function (width, height, options) {
    options = options || {};

    this.resolution = options.resolution != undefined ? options.resolution : 1;

    this.clearBeforeRender = options.clearBeforeRender != undefined ? options.clearBeforeRender : true;

    this.transparent = options.transparent != undefined ? options.transparent : false;

    this.autoResize = options.autoResize || false;

    // this.width = width || 800;
    // this.height = height || 600;

    // this.width *= this.resolution;
    // this.height *= this.resolution;

    if (!Tiny.defaultRenderer) Tiny.defaultRenderer = this;

    var view = (this.domElement = options.domElement || document.createElement("canvas"));

    this.context = view.getContext("2d", { alpha: this.transparent });

    // view.width = this.width * this.resolution;
    // view.height = this.height * this.resolution;

    this.resize(width || 800, height || 600);

    this.setClearColor("#ffffff");

    if (Tiny.CanvasMaskManager) this.maskManager = new Tiny.CanvasMaskManager();

    this.renderSession = {
        context: this.context,
        maskManager: this.maskManager,
        smoothProperty: null,
        /**
         * If true Pixi will Math.floor() x/y values when rendering, stopping pixel interpolation.
         * Handy for crisp pixel art and speed on legacy devices.
         *
         */
        roundPixels: false
    };

    if ("imageSmoothingEnabled" in this.context) this.renderSession.smoothProperty = "imageSmoothingEnabled";
    else if ("webkitImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "webkitImageSmoothingEnabled";
    else if ("mozImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "mozImageSmoothingEnabled";
    else if ("oImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "oImageSmoothingEnabled";
    else if ("msImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "msImageSmoothingEnabled";
};

Tiny.CanvasRenderer.prototype.constructor = Tiny.CanvasRenderer;

Tiny.CanvasRenderer.prototype.setClearColor = function (color) {
    this.clearColor = color;

    // if (color === null) {
    //     this.clearColor = null;
    //     return;
    // }

    // this.clearColor = color || 0x000000;
    // // this.backgroundColorSplit = Tiny.hex2rgb(this.backgroundColor);
    // var hex = this.clearColor.toString(16);
    // hex = '000000'.substr(0, 6 - hex.length) + hex;
    // this._clearColor = '#' + hex;
};

// Tiny.CanvasRenderer.prototype.setPixelArt = function() {

//     var canvas = this.domElement;

//     var types = [ 'optimizeSpeed', '-moz-crisp-edges', '-o-crisp-edges', '-webkit-optimize-contrast', 'optimize-contrast', 'crisp-edges', 'pixelated' ];

//     types.forEach(function (type)
//     {
//         canvas.style['image-rendering'] = type;
//     });

//     canvas.style.msInterpolationMode = 'nearest-neighbor';
//     this.renderSession.roundPixels = true;
// }

Tiny.CanvasRenderer.prototype.render = function (scene) {
    scene.updateTransform();

    this.context.setTransform(1, 0, 0, 1, 0, 0);

    this.context.globalAlpha = 1;

    this.renderSession.currentBlendMode = "source-over";
    this.context.globalCompositeOperation = "source-over";

    if (navigator.isCocoonJS && this.domElement.screencanvas) {
        this.context.fillStyle = "black";
        this.context.clear();
    }

    if (this.clearBeforeRender) {
        if (this.transparent) {
            this.context.clearRect(0, 0, this.width * this.resolution, this.height * this.resolution);
        } else {
            this.context.fillStyle = this.clearColor;
            this.context.fillRect(0, 0, this.width * this.resolution, this.height * this.resolution);
        }
    }

    this.renderObject(scene);
};

Tiny.CanvasRenderer.prototype.destroy = function (removeView) {
    if (typeof removeView === "undefined") {
        removeView = true;
    }

    if (removeView && this.domElement.parentNode) {
        this.domElement.parentNode.removeChild(this.domElement);
    }

    this.domElement = null;
    this.context = null;
    this.maskManager = null;
    this.renderSession = null;

    if (Tiny.defaultRenderer === this) Tiny.defaultRenderer = null;
};

Tiny.CanvasRenderer.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;

    var view = this.domElement;

    view.width = Math.floor(this.width * this.resolution);
    view.height = Math.floor(this.height * this.resolution);

    if (this.autoResize) {
        view.style.width = width + "px";
        view.style.height = height + "px";
    }
};

Tiny.CanvasRenderer.prototype.setPixelRatio = function (resolution) {
    this.resolution = resolution;

    var view = this.domElement;

    view.width = Math.floor(this.width * this.resolution);
    view.height = Math.floor(this.height * this.resolution);
};

Tiny.CanvasRenderer.prototype.renderObject = function (displayObject, context) {
    this.renderSession.context = context || this.context;
    this.renderSession.resolution = this.resolution;
    displayObject.render(this.renderSession);
};


/***/ }),

/***/ "./src/renderers/CanvasTinter.js":
/*!***************************************!*\
  !*** ./src/renderers/CanvasTinter.js ***!
  \***************************************/
/***/ (() => {

Tiny.CanvasTinter = function () {};

Tiny.CanvasTinter.getTintedTexture = function (sprite, color) {
    var texture = sprite.texture;

    if (!texture._tintCache) texture._tintCache = {};

    if (texture._tintCache[color]) return texture._tintCache[color];

    var canvas = Tiny.CanvasTinter.canvas || document.createElement("canvas");

    Tiny.CanvasTinter.tintMethod(texture, color, canvas);

    if (Tiny.CanvasTinter.convertTintToImage) {
        // is this better?
        var tintImage = new Image();
        tintImage.src = canvas.toDataURL();

        // texture._tintCache[stringColor] = tintImage;
    } else {
        Tiny.CanvasTinter.canvas = null;
    }

    if (Tiny.CanvasTinter.cacheTint) texture._tintCache[color] = canvas;

    return canvas;
};

Tiny.CanvasTinter.tintWithMultiply = function (texture, color, canvas) {
    var context = canvas.getContext("2d");

    var crop = texture.crop;

    canvas.width = crop.width;
    canvas.height = crop.height;

    context.fillStyle = color;

    context.fillRect(0, 0, crop.width, crop.height);

    context.globalCompositeOperation = "multiply";

    context.drawImage(texture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

    context.globalCompositeOperation = "destination-atop";

    context.drawImage(texture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
};

Tiny.CanvasTinter.tintWithPerPixel = function (texture, color, canvas) {
    var context = canvas.getContext("2d");

    var crop = texture.crop;

    canvas.width = crop.width;
    canvas.height = crop.height;

    context.globalCompositeOperation = "copy";
    context.drawImage(texture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

    var rgbValues = Tiny.hex2rgb(Tiny.style2hex(color));
    var r = rgbValues[0],
        g = rgbValues[1],
        b = rgbValues[2];

    var pixelData = context.getImageData(0, 0, crop.width, crop.height);

    var pixels = pixelData.data;

    for (var i = 0; i < pixels.length; i += 4) {
        pixels[i + 0] *= r;
        pixels[i + 1] *= g;
        pixels[i + 2] *= b;

        if (!Tiny.canHandleAlpha) {
            var alpha = pixels[i + 3];

            pixels[i + 0] /= 255 / alpha;
            pixels[i + 1] /= 255 / alpha;
            pixels[i + 2] /= 255 / alpha;
        }
    }

    context.putImageData(pixelData, 0, 0);
};

function checkInverseAlpha() {
    var canvas = new Tiny.CanvasBuffer(2, 1, { willReadFrequently: true });

    canvas.context.fillStyle = "rgba(10, 20, 30, 0.5)";

    //  Draw a single pixel
    canvas.context.fillRect(0, 0, 1, 1);

    //  Get the color values
    var s1 = canvas.context.getImageData(0, 0, 1, 1);

    //  Plot them to x2
    canvas.context.putImageData(s1, 1, 0);

    //  Get those values
    var s2 = canvas.context.getImageData(1, 0, 1, 1);

    //  Compare and return
    return (
        s2.data[0] === s1.data[0] &&
        s2.data[1] === s1.data[1] &&
        s2.data[2] === s1.data[2] &&
        s2.data[3] === s1.data[3]
    );
}

function checkBlendMode() {
    var pngHead = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/";
    var pngEnd = "AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==";

    var magenta = new Image();

    magenta.onload = function () {
        var yellow = new Image();

        yellow.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = 6;
            canvas.height = 1;
            var context = canvas.getContext("2d", { willReadFrequently: true });

            context.globalCompositeOperation = "multiply";

            context.drawImage(magenta, 0, 0);
            context.drawImage(yellow, 2, 0);

            if (!context.getImageData(2, 0, 1, 1)) {
                return false;
            }

            var data = context.getImageData(2, 0, 1, 1).data;

            Tiny.supportNewBlendModes = data[0] === 255 && data[1] === 0 && data[2] === 0;
            Tiny.CanvasTinter.tintMethod = Tiny.CanvasTinter.tintWithMultiply;
        };

        yellow.src = pngHead + "/wCKxvRF" + pngEnd;
    };

    magenta.src = pngHead + "AP804Oa6" + pngEnd;

    return false;
}

Tiny.CanvasTinter.convertTintToImage = false;

Tiny.CanvasTinter.cacheTint = false;

Tiny.canHandleAlpha = checkInverseAlpha();

Tiny.supportNewBlendModes = checkBlendMode();

Tiny.CanvasTinter.tintMethod = Tiny.supportNewBlendModes
    ? Tiny.CanvasTinter.tintWithMultiply
    : Tiny.CanvasTinter.tintWithPerPixel;


/***/ }),

/***/ "./src/renderers/GraphicsRenderer.js":
/*!*******************************************!*\
  !*** ./src/renderers/GraphicsRenderer.js ***!
  \*******************************************/
/***/ (() => {

Tiny.CanvasGraphics = function () {};

Tiny.CanvasGraphics.renderGraphics = function (graphics, context) {
    var worldAlpha = graphics.worldAlpha;

    if (graphics.dirty) {
        this.updateGraphicsTint(graphics);
        graphics.dirty = false;
    }

    for (var i = 0; i < graphics.graphicsData.length; i++) {
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        var fillColor = data._fillTint;
        var lineColor = data._lineTint;

        context.lineWidth = data.lineWidth;

        if (data.type === Tiny.Primitives.POLY) {
            context.beginPath();

            var points = shape.points;

            context.moveTo(points[0], points[1]);

            for (var j = 1; j < points.length / 2; j++) {
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            }

            if (shape.closed) {
                context.lineTo(points[0], points[1]);
            }

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
                context.closePath();
            }

            if (data.fill) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.stroke();
            }
        } else if (data.type === Tiny.Primitives.RECT) {
            if (data.fillColor) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fillRect(shape.x, shape.y, shape.width, shape.height);
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
        } else if (data.type === Tiny.Primitives.CIRC) {
            // TODO - need to be Undefined!
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.closePath();

            if (data.fill) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.stroke();
            }
        } else if (data.type === Tiny.Primitives.ELIP) {
            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w / 2;
            var y = shape.y - h / 2;

            context.beginPath();

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w, // x-end
                ye = y + h, // y-end
                xm = x + w / 2, // x-middle
                ym = y + h / 2; // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

            context.closePath();

            if (data.fill) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.stroke();
            }
        } else if (data.type === Tiny.Primitives.RREC) {
            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = (Math.min(width, height) / 2) | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            context.beginPath();
            context.moveTo(rx, ry + radius);
            context.lineTo(rx, ry + height - radius);
            context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            context.lineTo(rx + width - radius, ry + height);
            context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            context.lineTo(rx + width, ry + radius);
            context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            context.lineTo(rx + radius, ry);
            context.quadraticCurveTo(rx, ry, rx, ry + radius);
            context.closePath();

            if (data.fillColor) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.stroke();
            }
        }
        // else if (data.type === Tiny.Primitives.RREC_LJOIN)
        // {
        //     var rx = shape.x;
        //     var ry = shape.y;
        //     var width = shape.width;
        //     var height = shape.height;
        //     var radius = shape.radius;

        //     if (data.fillColor)
        //     {
        //         context.globalAlpha = data.fillAlpha * worldAlpha;
        //         context.fillStyle = fillColor;
        //         context.strokeStyle = fillColor;
        //     }

        //     context.lineJoin = "round";
        //     context.lineWidth = radius;

        //     context.strokeRect(rx + (radius / 2), ry + (radius / 2), width - radius, height - radius);
        //     context.fillRect(rx + (radius / 2), ry + (radius / 2), width - radius, height - radius);
        // }
    }
};

Tiny.CanvasGraphics.renderGraphicsMask = function (graphics, context) {
    var len = graphics.graphicsData.length;

    if (len === 0) {
        return;
    }

    context.beginPath();

    for (var i = 0; i < len; i++) {
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        if (data.type === Tiny.Primitives.POLY) {
            var points = shape.points;

            context.moveTo(points[0], points[1]);

            for (var j = 1; j < points.length / 2; j++) {
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            }

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
                context.closePath();
            }
        } else if (data.type === Tiny.Primitives.RECT) {
            context.rect(shape.x, shape.y, shape.width, shape.height);
            context.closePath();
        } else if (data.type === Tiny.Primitives.CIRC) {
            // TODO - need to be Undefined!
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.closePath();
        } else if (data.type === Tiny.Primitives.ELIP) {
            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w / 2;
            var y = shape.y - h / 2;

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w, // x-end
                ye = y + h, // y-end
                xm = x + w / 2, // x-middle
                ym = y + h / 2; // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            context.closePath();
        } else if (data.type === Tiny.Primitives.RREC || data.type === Tiny.Primitives.RREC_LJOIN) {
            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = (Math.min(width, height) / 2) | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            context.moveTo(rx, ry + radius);
            context.lineTo(rx, ry + height - radius);
            context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            context.lineTo(rx + width - radius, ry + height);
            context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            context.lineTo(rx + width, ry + radius);
            context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            context.lineTo(rx + radius, ry);
            context.quadraticCurveTo(rx, ry, rx, ry + radius);
            context.closePath();
        }
    }
};

Tiny.CanvasGraphics.updateGraphicsTint = function (graphics) {
    console.log(graphics.tint);

    if (graphics.tint === "#ffffff") {
        return;
    }

    var tintHex = Tiny.style2hex(graphics.tint);
    
    var tintR = ((tintHex >> 16) & 0xff) / 255;
    var tintG = ((tintHex >> 8) & 0xff) / 255;
    var tintB = (tintHex & 0xff) / 255;

    for (var i = 0; i < graphics.graphicsData.length; i++) {
        var data = graphics.graphicsData[i];

        var fillColor = Tiny.style2hex(data.fillColor);
        var lineColor = Tiny.style2hex(data.lineColor);

        /*
        var colorR = (fillColor >> 16 & 0xFF) / 255;
        var colorG = (fillColor >> 8 & 0xFF) / 255;
        var colorB = (fillColor & 0xFF) / 255; 
        colorR *= tintR;
        colorG *= tintG;
        colorB *= tintB;
        fillColor = ((colorR*255 << 16) + (colorG*255 << 8) + colorB*255);
        colorR = (lineColor >> 16 & 0xFF) / 255;
        colorG = (lineColor >> 8 & 0xFF) / 255;
        colorB = (lineColor & 0xFF) / 255; 
        colorR *= tintR;
        colorG *= tintG;
        colorB *= tintB;
        lineColor = ((colorR*255 << 16) + (colorG*255 << 8) + colorB*255);   
        */

        data._fillTint =
            (((((fillColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
            (((((fillColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
            ((fillColor & 0xff) / 255) * tintB * 255;
        data._lineTint =
            (((((lineColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
            (((((lineColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
            ((lineColor & 0xff) / 255) * tintB * 255;

        data._fillTint = Tiny.hex2style(data._fillTint);
        data._lineTint = Tiny.hex2style(data._lineTint);
    }
};


/***/ }),

/***/ "./src/systems/Input.js":
/*!******************************!*\
  !*** ./src/systems/Input.js ***!
  \******************************/
/***/ (() => {

var listeningToTouchEvents;

Tiny.Input = function (game) {
    this.game = game;
    var view = (this.domElement = game.inputView);

    this.bounds = { x: 0, y: 0, width: 0, height: 0 };
    this.candidates = [];
    this.list = [];

    this.lastMove = null;
    this.isDown = false;

    this.downHandler = this.downHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.upHandler = this.upHandler.bind(this);
    // this.clickHandler.bind(this);

    view.addEventListener("touchstart", this.downHandler);
    view.addEventListener("touchmove", this.moveHandler);
    view.addEventListener("touchend", this.upHandler);
    view.addEventListener("touchcancel", this.upHandler);

    // view.addEventListener('click', this.clickHandler);

    view.addEventListener("mousedown", this.downHandler);
    view.addEventListener("mousemove", this.moveHandler);
    view.addEventListener("mouseup", this.upHandler);

    Tiny.EventEmitter.mixin(this);

    for (var i = 0; i < Tiny.Input.systems.length; i++) {
        Tiny.Input.systems[i].init.call(this);
    }

    this.updateBounds();
};

Tiny.Input.prototype = {
    add: function (object, options) {
        object.inputEnabled = true;

        options = options || {};
        options.system = this;

        object.input = options;

        Tiny.EventEmitter.mixin(object.input);

        this.list.push(object);
    },

    remove: function (object) {
        var index = this.list.indexOf(object);

        if (index > -1) {
            var removed = this.list[index];
            removed.input = null;
            removed.inputEnabled = false;

            this.list.splice(index, 1);

            return removed;
        }
    },

    inputHandler: function (name, event) {
        // console.log(name)
        var coords = this.getCoords(event);

        if (coords !== null) {
            if (name != "move") {
                this.candidates.length = 0;

                for (var i = 0; i < Tiny.Input.systems.length; i++) {
                    Tiny.Input.systems[i].preHandle.call(this, coords.x, coords.y);
                }

                var isGood, obj;

                for (var t = 0; t < this.list.length; t++) {
                    obj = this.list[t];

                    if (!obj.inputEnabled || !obj.parent) continue;

                    if (obj.input.checkBounds)
                        isGood = obj.input.checkBounds.call(this, obj, coords.x, coords.y);
                    else isGood = Tiny.Input.checkBounds.call(this, obj, coords.x, coords.y);

                    if (isGood) this.candidates.push(obj);
                }

                //var i = this.candidates.length

                for (var i = this.candidates.length - 1; i >= 0; i--) {
                    obj = this.candidates[i];
                    obj.input["last_" + name] = {
                        x: coords.x,
                        y: coords.y
                    };

                    obj.input.emit(name, {
                        x: coords.x,
                        y: coords.y
                    });

                    if (name == "up") {
                        var point = obj.input["last_down"];
                        if (point && Tiny.Math.distance(point.x, point.y, coords.x, coords.y) < 30)
                            obj.input.emit("click", {
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
                //         if (point && Tiny.Math.distance(point.x, point.y, coords.x, coords.y) < 30)
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

    moveHandler: function (event) {
        this.lastMove = event;
        this.inputHandler("move", event);
    },

    upHandler: function (event) {
        this.isDown = false;
        this.inputHandler("up", this.lastMove);
    },

    downHandler: function (event) {
        this.isDown = true;
        this.lastMove = event;
        this.inputHandler("down", event);
    },

    clickHandler: function (event) {
        this.inputHandler("click", event);
    },

    getCoords: function (event) {
        var coords = null;

        if (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) {
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

        if ((listeningToTouchEvents && event instanceof MouseEvent) || coords === null) return null;

        coords = {
            x: coords.x - this.bounds.x,
            y: coords.y - this.bounds.y
        };

        return coords;
    },

    updateBounds: function () {
        bounds = this.bounds;

        var clientRect = this.domElement.getBoundingClientRect();

        bounds.x = clientRect.left;
        bounds.y = clientRect.top;
        bounds.width = clientRect.width;
        bounds.height = clientRect.height;
    },

    destroy: function () {
        var view = this.domElement;

        view.removeEventListener("touchstart", this.downHandler);
        view.removeEventListener("touchmove", this.moveHandler);
        view.removeEventListener("touchend", this.upHandler);
        view.removeEventListener("touchcancel", this.upHandler);

        // view.removeEventListener('click', this.clickHandler);

        view.removeEventListener("mousedown", this.downHandler);
        view.removeEventListener("mousemove", this.moveHandler);
        view.removeEventListener("mouseup", this.upHandler);
    }
};

Tiny.Input.checkBounds = function (obj, x, y) {
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

Tiny.Input.systems = [];

Tiny.registerSystem("input", Tiny.Input);


/***/ }),

/***/ "./src/systems/Loader.js":
/*!*******************************!*\
  !*** ./src/systems/Loader.js ***!
  \*******************************/
/***/ (() => {

Tiny.Cache = {
    image: {},
    texture: {}
};

Tiny.Loader = function (game) {
    game.cache = Tiny.Cache;

    this.game = game;
    this.list = [];
};

Tiny.Loader.prototype = {
    clearCache: function () {
        for (var y in Tiny.Cache.texture) Tiny.Cache.texture[y].destroy();

        for (var y in Tiny.Cache) Tiny.Cache[y] = {};
    },

    all: function (array) {
        this.list = this.list.concat(array);
    },

    image: function (key, source) {
        this.list.push({
            src: source,
            key: key,
            type: "image"
        });
    },

    spritesheet: function (key, source, arg_1, arg_2, totalFrames, duration) {
        var res = {
            src: source,
            key: key,
            type: "spritesheet"
        };

        if (typeof arg_1 == "number") {
            res.width = arg_1;
            res.height = arg_2;
            res.total = totalFrames;
            res.duration = duration;
        } else if (arg_1.length > 0) {
            res.data = arg_1;
        }

        this.list.push(res);
    },

    atlas: function (key, source, atlasData) {
        this.list.push({
            src: source,
            key: key,
            data: atlasData,
            type: "atlas"
        });
    },

    start: function (callback) {
        var game = this.game;
        var list = this.list;

        if (list.length == 0) {
            callback.call(game);
            return;
        }

        function loadNext() {
            // var done = false;
            var resource = list.shift();

            var loader = Tiny.Loader[resource.type];

            if (loader) {
                loader(resource, loaded);
            } else {
                console.warn("Cannot find loader for " + resource.type);
                loaded();
            }
        }

        function loaded(resource, data) {
            if (list.length != 0) {
                loadNext();
            } else {
                callback.call(game);
            }
        }

        loadNext();
    }
};

Tiny.Loader.atlas = function (resource, cb) {
    var key = resource.key;

    Tiny.Loader.image(resource, function (resource, image) {
        for (var i = 0; i < resource.data.length; i++) {
            var uuid = key + "." + resource.data[i].name;
            var texture = new Tiny.Texture(image, resource.data[i]);
            texture.key = key;

            Tiny.Cache.texture[uuid] = texture;
        }

        cb();
    });
};

Tiny.Loader.spritesheet = function (resource, cb) {
    var key = resource.key;

    Tiny.Loader.image(resource, function (resource, image) {
        var lastFrame, uuid, texture;

        if (resource.data) {
            var frameData = resource.data;
            lastFrame = frameData.length - 1;

            for (var i = 0; i <= lastFrame; i++) {
                uuid = key + "." + i;

                texture = new Tiny.Texture(image, {
                    index: i,
                    x: Math.floor(frameData[i].x),
                    y: Math.floor(frameData[i].y),
                    width: Math.floor(frameData[i].width),
                    height: Math.floor(frameData[i].height),
                    duration: frameData[i].duration
                });

                texture.key = key;
                texture.lastFrame = lastFrame;

                Tiny.Cache.texture[uuid] = texture;
            }
        } else {
            var width = image.naturalWidth || image.width;
            var height = image.naturalHeight || image.height;

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
                uuid = key + "." + i;
                texture = new Tiny.Texture(image, {
                    index: i,
                    x: x,
                    y: y,
                    width: frameWidth,
                    height: frameHeight,
                    duration: resource.duration
                });
                texture.key = key;
                texture.lastFrame = lastFrame;
                Tiny.Cache.texture[uuid] = texture;

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

Tiny.Loader.image = function (resource, cb) {
    // if (Tiny.Cache["image"][resource.key]) return cb(resource, Tiny.Cache["image"][resource.key]);

    const image = new Image();

    image.addEventListener("load", function () {
        Tiny.Cache.image[resource.key] = image;

        cb(resource, image);
    });

    // image.addEventListener('error', function()
    // {
    //     cb(resource, image);
    // })

    image.src = resource.src;
};

Tiny.registerSystem("load", Tiny.Loader);


/***/ }),

/***/ "./src/systems/RAF.js":
/*!****************************!*\
  !*** ./src/systems/RAF.js ***!
  \****************************/
/***/ (() => {

var _isSetTimeOut, _onLoop, _timeOutID, _prevTime, _lastTime;

var now = function () {
    return new Date().getTime();
};

if (self.performance !== undefined && self.performance.now !== undefined) {
    now = self.performance.now.bind(self.performance);
} else if (Date.now !== undefined) {
    now = Date.now;
}

Tiny.RAF = function (game, forceSetTimeOut) {
    if (forceSetTimeOut === undefined) {
        forceSetTimeOut = false;
    }
    this.game = game;

    this.isRunning = false;
    this.forceSetTimeOut = forceSetTimeOut;

    var vendors = ["ms", "moz", "webkit", "o"];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame =
            window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    _isSetTimeOut = false;
    _onLoop = null;
    _timeOutID = null;

    _prevTime = 0;
    _lastTime = 0;
};

Tiny.RAF.prototype = {
    start: function () {
        _prevTime = now();

        this.isRunning = true;

        var _this = this;

        if (!window.requestAnimationFrame || this.forceSetTimeOut) {
            _isSetTimeOut = true;

            _onLoop = function () {
                return _this.updateSetTimeout();
            };

            _timeOutID = window.setTimeout(_onLoop, 0);
        } else {
            _isSetTimeOut = false;

            _onLoop = function () {
                return _this.updateRAF();
            };

            _timeOutID = window.requestAnimationFrame(_onLoop);
        }
    },

    updateRAF: function () {
        _lastTime = now();

        if (this.isRunning) {
            this.game._update(Math.floor(_lastTime), _lastTime - _prevTime);

            _timeOutID = window.requestAnimationFrame(_onLoop);
        }

        _prevTime = _lastTime;
    },

    updateSetTimeout: function () {
        _lastTime = now();
        if (this.isRunning) {
            this.game._update(Math.floor(_lastTime), _lastTime - _prevTime);

            _timeOutID = window.setTimeout(_onLoop, Tiny.RAF.timeToCall);
        }
        _prevTime = _lastTime;
    },

    reset: function () {
        _prevTime = now();
    },

    stop: function () {
        if (_isSetTimeOut) {
            clearTimeout(_timeOutID);
        } else {
            window.cancelAnimationFrame(_timeOutID);
        }

        this.isRunning = false;
    }
};

Tiny.RAF.timeToCall = 15;


/***/ }),

/***/ "./src/systems/Timer.js":
/*!******************************!*\
  !*** ./src/systems/Timer.js ***!
  \******************************/
/***/ (() => {

var noop = function () {};

var Timer = function (autoStart, autoRemove, game, cb, ctx, delay, loop, n, oncomplete) {
    this.game = game;
    this.cb = cb || noop;
    this.ctx = ctx || this;
    this.delay = delay == undefined ? 1000 : delay;
    this.loop = loop;
    this.count = n || 0;
    this.repeat = this.count > 0;
    this.running = !!autoStart;
    this._lastFrame = 0;
    this.autoRemove = autoRemove;
    this.onComplete = oncomplete || noop;
};

Timer.prototype = {
    start: function () {
        this.running = true;
    },
    pause: function () {
        this.running = false;
    },
    stop: function () {
        this.running = false;
        this._lastFrame = 0;
    },
    update: function (deltaTime) {
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

Tiny.Timer = Timer;

Tiny.TimerCreator = function (game) {
    this.game = game;
    this.list = [];
    this.autoStart = true;
    this.autoRemove = true;
};

Tiny.TimerCreator.prototype = {
    update: function (delta) {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].update(delta);
        }
    },
    removeAll: function () {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].stop();
        }

        this.list = [];
    },
    remove: function (tm) {
        var indexOf = this.list.indexOf(tm);
        if (indexOf > -1) {
            tm.stop();
            this.list.splice(indexOf, 1);
        }
    },
    add: function (delay, cb, ctx, autostart, autoremove) {
        autostart = autostart != undefined ? autostart : this.autoStart;
        autoremove = autoremove != undefined ? autoremove : this.autoRemove;

        var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay);
        this.list.push(timer);
        return timer;
    },
    loop: function (delay, cb, ctx, autostart, autoremove) {
        autostart = autostart != undefined ? autostart : this.autoStart;
        autoremove = autoremove != undefined ? autoremove : this.autoRemove;

        var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay, true);
        this.list.push(timer);
        return timer;
    },
    repeat: function (delay, n, cb, ctx, autostart, autoremove, complete) {
        autostart = autostart != undefined ? autostart : this.autoStart;
        autoremove = autoremove != undefined ? autoremove : this.autoRemove;

        var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay, false, n, complete);
        this.list.push(timer);
        return timer;
    },
    destroy: function () {
        this.removeAll();
    }
};

Tiny.registerSystem("timer", Tiny.TimerCreator);


/***/ }),

/***/ "./src/systems/Tween.js":
/*!******************************!*\
  !*** ./src/systems/Tween.js ***!
  \******************************/
/***/ (() => {

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

var _Group = function () {
    this._tweens = {};
    this._tweensAddedDuringUpdate = {};
};

_Group.prototype = {
    getAll: function () {
        return Object.keys(this._tweens).map(
            function (tweenId) {
                return this._tweens[tweenId];
            }.bind(this)
        );
    },

    removeAll: function () {
        this._tweens = {};
    },

    add: function (tween) {
        var id = tween.getId();
        this._tweens[id] = tween;
        this._tweensAddedDuringUpdate[id] = tween;
    },

    remove: function (tween) {
        var id = tween.getId();
        delete this._tweens[id];
        delete this._tweensAddedDuringUpdate[id];
    },

    update: function (delta, preserve) {
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

Tiny.Tween = function (object, group) {
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
    this._easingFunction = Tiny.Easing.Linear.None;
    this._interpolationFunction = Tiny.Interpolation.Linear;
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

Tiny.Tween.prototype = {
    getId: function () {
        return this._id;
    },

    isPlaying: function () {
        return this._isPlaying;
    },

    isPaused: function () {
        return this._isPaused;
    },

    to: function (properties, duration) {
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

    start: function (reset) {
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
            if (reset == true || typeof this._valuesStart[property] === "undefined") {
                this._valuesStart[property] = this._object[property];
            }

            if (this._valuesStart[property] instanceof Array === false) {
                this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
            }

            this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
        }

        return this;
    },

    stop: function () {
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

    end: function () {
        this.update(Infinity, Infinity);
        return this;
    },

    pause: function () {
        if (this._isPaused || !this._isPlaying) {
            return this;
        }

        this._isPaused = true;

        // this._pauseStart = time === undefined ? TWEEN.now() : time;

        this._group.remove(this);

        return this;
    },

    resume: function () {
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

    stopChainedTweens: function () {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].stop();
        }
    },

    group: function (group) {
        this._group = group;
        return this;
    },

    delay: function (amount) {
        this._delayTime = amount;
        return this;
    },

    repeat: function (times) {
        this._repeat = times;
        return this;
    },

    repeatDelay: function (amount) {
        this._repeatDelayTime = amount;
        return this;
    },

    yoyo: function (yoyo) {
        this._yoyo = yoyo;
        return this;
    },

    easing: function (easingFunction) {
        this._easingFunction = easingFunction;
        return this;
    },

    interpolation: function (interpolationFunction) {
        this._interpolationFunction = interpolationFunction;
        return this;
    },

    chain: function () {
        this._chainedTweens = arguments;
        return this;
    },

    onStart: function (callback) {
        this._onStartCallback = callback;
        return this;
    },

    onUpdate: function (callback) {
        this._onUpdateCallback = callback;
        return this;
    },

    onRepeat: function onRepeat(callback) {
        this._onRepeatCallback = callback;
        return this;
    },

    onComplete: function (callback) {
        this._onCompleteCallback = callback;
        return this;
    },

    onStop: function (callback) {
        this._onStopCallback = callback;
        return this;
    },

    update: function (delta) {
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
                if (typeof end === "string") {
                    if (end.charAt(0) === "+" || end.charAt(0) === "-") {
                        end = start + parseFloat(end);
                    } else {
                        end = parseFloat(end);
                    }
                }

                // Protect against non numeric properties.
                if (typeof end === "number") {
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
                    if (typeof this._valuesEnd[property] === "string") {
                        this._valuesStartRepeat[property] =
                            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
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

Tiny.Easing = {
    Linear: {
        None: function (k) {
            return k;
        }
    },

    Quadratic: {
        In: function (k) {
            return k * k;
        },

        Out: function (k) {
            return k * (2 - k);
        },

        InOut: function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k;
            }

            return -0.5 * (--k * (k - 2) - 1);
        }
    },

    Cubic: {
        In: function (k) {
            return k * k * k;
        },

        Out: function (k) {
            return --k * k * k + 1;
        },

        InOut: function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k;
            }

            return 0.5 * ((k -= 2) * k * k + 2);
        }
    },

    Quartic: {
        In: function (k) {
            return k * k * k * k;
        },

        Out: function (k) {
            return 1 - --k * k * k * k;
        },

        InOut: function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k;
            }

            return -0.5 * ((k -= 2) * k * k * k - 2);
        }
    },

    Quintic: {
        In: function (k) {
            return k * k * k * k * k;
        },

        Out: function (k) {
            return --k * k * k * k * k + 1;
        },

        InOut: function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k * k;
            }

            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        }
    },

    Sinusoidal: {
        In: function (k) {
            return 1 - Math.cos((k * Math.PI) / 2);
        },

        Out: function (k) {
            return Math.sin((k * Math.PI) / 2);
        },

        InOut: function (k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }
    },

    Exponential: {
        In: function (k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1);
        },

        Out: function (k) {
            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        },

        InOut: function (k) {
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
        In: function (k) {
            return 1 - Math.sqrt(1 - k * k);
        },

        Out: function (k) {
            return Math.sqrt(1 - --k * k);
        },

        InOut: function (k) {
            if ((k *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - k * k) - 1);
            }

            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        }
    },

    Elastic: {
        In: function (k) {
            if (k === 0) {
                return 0;
            }

            if (k === 1) {
                return 1;
            }

            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
        },

        Out: function (k) {
            if (k === 0) {
                return 0;
            }

            if (k === 1) {
                return 1;
            }

            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
        },

        InOut: function (k) {
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
        In: function (k) {
            var s = 1.70158;

            return k * k * ((s + 1) * k - s);
        },

        Out: function (k) {
            var s = 1.70158;

            return --k * k * ((s + 1) * k + s) + 1;
        },

        InOut: function (k) {
            var s = 1.70158 * 1.525;

            if ((k *= 2) < 1) {
                return 0.5 * (k * k * ((s + 1) * k - s));
            }

            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        }
    },

    Bounce: {
        In: function (k) {
            return 1 - Tiny.Easing.Bounce.Out(1 - k);
        },

        Out: function (k) {
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

        InOut: function (k) {
            if (k < 0.5) {
                return Tiny.Easing.Bounce.In(k * 2) * 0.5;
            }

            return Tiny.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
        }
    }
};

Tiny.Interpolation = {
    Linear: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Tiny.Interpolation.Utils.Linear;

        if (k < 0) {
            return fn(v[0], v[1], f);
        }

        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }

        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },

    Bezier: function (v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = Tiny.Interpolation.Utils.Bernstein;

        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }

        return b;
    },

    CatmullRom: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Tiny.Interpolation.Utils.CatmullRom;

        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor((f = m * (1 + k)));
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
        Linear: function (p0, p1, t) {
            return (p1 - p0) * t + p0;
        },

        Bernstein: function (n, i) {
            var fc = Tiny.Interpolation.Utils.Factorial;

            return fc(n) / fc(i) / fc(n - i);
        },

        Factorial: (function () {
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
        })(),

        CatmullRom: function (p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;

            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        }
    }
};

Tiny.TweenManager = function (game) {
    this.game = game;
    this.bufferList = [];
    this.group = new _Group();
};

Tiny.TweenManager.prototype = {
    remove: function (tween) {
        this.group.remove(tween);
    },

    add: function (obj) {
        return new Tiny.Tween(obj, this.group);
    },

    pause: function () {
        this.bufferList.length = 0;

        for (var k in this.group._tweens) {
            this.bufferList.push(this.group._tweens[k]);
            this.group._tweens[k].pause();
        }
    },

    resume() {
        for (var i = 0; i < this.bufferList.length; i++) {
            this.bufferList[i].resume();
        }

        this.bufferList.length = 0;
    },

    update: function (delta) {
        this.group.update(delta);
    },

    destroy: function () {
        this.bufferList.length = 0;
        this.group.removeAll();
        this.group = null;
    }
};

Tiny.registerSystem("tweens", Tiny.TweenManager);


/***/ }),

/***/ "./src/textures/RenderTexture.js":
/*!***************************************!*\
  !*** ./src/textures/RenderTexture.js ***!
  \***************************************/
/***/ (() => {

Tiny.RenderTexture = function (width, height, renderer, resolution) {
    this.width = width || 100;
    this.height = height || 100;

    // console.log(this);
    resolution = resolution || 1;

    // this.frame = new Tiny.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);

    // this.crop = new Tiny.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);

    // this.baseTexture = new Tiny.BaseTexture();
    // this.baseTexture.width = this.width * this.resolution;
    // this.baseTexture.height = this.height * this.resolution;
    // this.baseTexture.resolution = this.resolution;

    // this.baseTexture.hasLoaded = true;
    this.textureBuffer = new Tiny.CanvasBuffer(this.width * resolution, this.height * resolution);

    Tiny.Texture.call(
        this,
        this.textureBuffer.canvas,
        new Tiny.Rectangle(0, 0, Math.floor(this.width * resolution), Math.floor(this.height * resolution))
    );

    this.resolution = resolution;

    // this.hasLoaded = true;

    this.renderer = renderer || Tiny.defaultRenderer;

    this.valid = true;
};

Tiny.RenderTexture.prototype = Object.create(Tiny.Texture.prototype);
Tiny.RenderTexture.prototype.constructor = Tiny.RenderTexture;

Tiny.RenderTexture.prototype.resize = function (width, height, updateBase) {
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

Tiny.RenderTexture.prototype.clear = function () {
    if (!this.valid) return;

    this.textureBuffer.clear();
};

Tiny.RenderTexture.prototype.render = function (displayObject, matrix, clear) {
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

Tiny.RenderTexture.prototype.getImage = function () {
    var image = new Image();
    image.src = this.getBase64();
    return image;
};

Tiny.RenderTexture.prototype.getBase64 = function () {
    return this.getCanvas().toDataURL();
};

Tiny.RenderTexture.prototype.getCanvas = function () {
    return this.textureBuffer.canvas;
};


/***/ }),

/***/ "./src/textures/Texture.js":
/*!*********************************!*\
  !*** ./src/textures/Texture.js ***!
  \*********************************/
/***/ (() => {

// Tiny.TextureCache = {};
// Tiny.FrameCache = {};
Tiny.TextureCacheIdGenerator = 0;
Tiny.TextureSilentFail = false;

Tiny.Texture = function (source, frame, crop, trim) {
    // console.log(this);
    this.noFrame = false;

    this.resolution = 1;

    this.hasLoaded = false;

    if (!frame) {
        this.noFrame = true;
        frame = new Tiny.Rectangle(0, 0, 1, 1);
    }

    if (typeof source == "string") {
        var key = source;

        source = Tiny.Cache.image[key];

        if (!source) throw new Error("Cache Error: image " + key + " does`t found in cache");

        Tiny.Cache.texture[key] = this;

        this.key = key;
    }

    this.source = source;

    this.frame = frame;

    this.trim = trim;

    this.valid = false;

    this.width = 0;

    this.height = 0;

    this.crop = crop || new Tiny.Rectangle(0, 0, 1, 1);

    if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) {
        this.onSourceLoaded();
    } else {
        var scope = this;
        this.source.onload = function () {
            scope.onSourceLoaded();
        };
    }
};

Tiny.Texture.prototype.constructor = Tiny.Texture;

Tiny.Texture.prototype.onSourceLoaded = function () {
    this.hasLoaded = true;
    this.width = this.source.naturalWidth || this.source.width;
    this.height = this.source.naturalHeight || this.source.height;

    if (this.noFrame) this.frame = new Tiny.Rectangle(0, 0, this.width, this.height);

    this.setFrame(this.frame);
};

Tiny.Texture.prototype.addToCache = function (key) {
    Tiny.Cache.texture[key] = this;
    this.key = key;
};

Tiny.Texture.prototype.destroy = function () {
    if (this.key) {
        delete Tiny.Cache.texture[this.key];
    }

    this.source = null;
    this.valid = false;
};

Tiny.Texture.prototype.setFrame = function (frame) {
    this.noFrame = false;

    this.frame = frame;

    this.valid = frame && frame.width && frame.height && this.source && this.hasLoaded;

    if (!this.valid) return;

    // this.width = frame.width;
    // this.height = frame.height;

    this.crop.x = frame.x;
    this.crop.y = frame.y;
    this.crop.width = frame.width;
    this.crop.height = frame.height;

    if (!this.trim && (frame.x + frame.width > this.width || frame.y + frame.height > this.height)) {
        if (!Tiny.TextureSilentFail) {
            throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
        }

        this.valid = false;
        return;
    }

    if (this.trim) {
        // this.width = this.trim.width;
        // this.height = this.trim.height;
        this.frame.width = this.trim.width;
        this.frame.height = this.trim.height;
    }
};

// Tiny.Texture.fromImage = function(key, imageUrl, crossorigin)
// {
//     var texture = Tiny.TextureCache[key];

//     if(!texture)
//     {
//         texture = new Tiny.Texture(Tiny.BaseTexture.fromImage(key, imageUrl, crossorigin));
//         texture.key = key
//         Tiny.TextureCache[key] = texture;
//     }

//     return texture;
// };

// Tiny.Texture.fromFrame = function(frameId)
// {
//     var texture = Tiny.TextureCache[frameId];
//     if(!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ');
//     return texture;
// };

Tiny.Texture.fromCanvas = function (canvas) {
    // if(!canvas._tinyId)
    // {
    //     canvas._tinyId = '_from_canvas_' + Tiny.TextureCacheIdGenerator++;
    // }

    // var texture = Tiny.Cache.texture[canvas._tinyId];

    // if(!texture)
    // {
    //     texture = new Tiny.Texture( canvas );
    //     Tiny.Cache.texture[canvas._tinyId] = texture;
    // }

    // return texture;
    return new Tiny.Texture(canvas);
};

// Tiny.Texture.addTextureToCache = function(texture, id)
// {
//     Tiny.TextureCache[id] = texture;
// };

// Tiny.Texture.removeTextureFromCache = function(id)
// {
//     var texture = Tiny.TextureCache[id];
//     delete Tiny.TextureCache[id];
//     delete Tiny.BaseTextureCache[id];
//     return texture;
// };


/***/ }),

/***/ "./src/utils/CanvasBuffer.js":
/*!***********************************!*\
  !*** ./src/utils/CanvasBuffer.js ***!
  \***********************************/
/***/ (() => {

Tiny.CanvasBuffer = function (width, height, options) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d", options);

    this.canvas.width = width;
    this.canvas.height = height;
};

Tiny.CanvasBuffer.prototype.constructor = Tiny.CanvasBuffer;

Tiny.CanvasBuffer.prototype.clear = function () {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
};

Tiny.CanvasBuffer.prototype.resize = function (width, height) {
    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;
};


/***/ }),

/***/ "./src/utils/EventEmitter.js":
/*!***********************************!*\
  !*** ./src/utils/EventEmitter.js ***!
  \***********************************/
/***/ (() => {

function EventListeners() {
    this.a = [];
    this.n = 0;
}

Tiny.EventEmitter = {
    call: function (obj) {
        if (obj) {
            obj = obj.prototype || obj;
            Tiny.EventEmitter.mixin(obj);
        }
    },

    mixin: function (obj) {
        const listeners_events = {};

        function pushListener(event, fn, context, once) {
            var listeners = listeners_events[event];

            if (!listeners) {
                listeners = listeners_events[event] = new EventListeners();
            }

            listeners.a.push(fn, context || null, once || false);
            listeners.n += 3;
        }

        obj.once = function (event, fn, context) {
            pushListener(event, fn, context, true);
        };

        obj.on = pushListener;

        obj.off = function (event, fn, context) {
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

                if (len <= 1) fn.call(ctx);
                else if (len == 2) fn.call(ctx, a1);
                else if (len == 3) fn.call(ctx, a1, a2);
                else fn.call(ctx, a1, a2, a3);

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


/***/ }),

/***/ "./src/utils/polyfill.js":
/*!*******************************!*\
  !*** ./src/utils/polyfill.js ***!
  \*******************************/
/***/ (() => {

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

if (typeof Float32Array == "undefined") {
  window.Float32Array = Array;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__(/*! ./mini.js */ "./src/mini.js");

// require('./systems/ObjectCreator.js'); // 1 Kb
// require('./systems/Loader.js'); // 3 Kb
// require('./systems/Input.js'); // 1 Kb
// require('./systems/Timer.js'); // 1 Kb
__webpack_require__(/*! ./systems/Tween.js */ "./src/systems/Tween.js");

__webpack_require__(/*! ./math/RoundedRectangle.js */ "./src/math/RoundedRectangle.js"); //
__webpack_require__(/*! ./math/Polygon.js */ "./src/math/Polygon.js"); //
__webpack_require__(/*! ./math/Circle.js */ "./src/math/Circle.js"); // 6 Kb

__webpack_require__(/*! ./renderers/GraphicsRenderer.js */ "./src/renderers/GraphicsRenderer.js"); // 4Kb

__webpack_require__(/*! ./objects/Graphics.js */ "./src/objects/Graphics.js"); // 10 Kb
// require('./objects/TilingSprite.js'); // 4 Kb   ############### TilingSprite  game.add.tilesprite

__webpack_require__(/*! ./textures/RenderTexture.js */ "./src/textures/RenderTexture.js"); // 2 Kb

__webpack_require__(/*! ./utils/CanvasBuffer.js */ "./src/utils/CanvasBuffer.js"); // 1 Kb
__webpack_require__(/*! ./renderers/CanvasMaskManager.js */ "./src/renderers/CanvasMaskManager.js"); // 1Kb
__webpack_require__(/*! ./renderers/CanvasTinter.js */ "./src/renderers/CanvasTinter.js"); // 3 Kb ################ tint function

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlueS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDJCQUEyQjtBQUNuRDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pKQSxtQkFBTyxDQUFDLG9EQUFxQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLDhCQUFVO0FBQ2xCLG1CQUFPLENBQUMsb0NBQWE7QUFDckIsbUJBQU8sQ0FBQywwQ0FBZ0IsR0FBRztBQUMzQixtQkFBTyxDQUFDLDRDQUFpQixHQUFHO0FBQzVCLG1CQUFPLENBQUMsOENBQWtCLEdBQUc7QUFDN0IsbUJBQU8sQ0FBQyxvREFBcUIsR0FBRztBQUNoQztBQUNBLG1CQUFPLENBQUMsZ0VBQTJCLEdBQUc7QUFDdEMsbUJBQU8sQ0FBQyx3REFBdUIsR0FBRztBQUNsQyxtQkFBTyxDQUFDLGtEQUFvQixHQUFHO0FBQy9CO0FBQ0EsbUJBQU8sQ0FBQyx3RUFBK0IsR0FBRzs7Ozs7Ozs7Ozs7QUNmMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlCQUF5QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxTQUFTO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQzlJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvQkEsbUJBQU8sQ0FBQyxnQ0FBVztBQUNuQjtBQUNBLG1CQUFPLENBQUMsOENBQWtCLEdBQUc7QUFDN0IsMENBQTBDO0FBQzFDLG1CQUFPLENBQUMsb0RBQXFCLEdBQUc7QUFDaEMsbUJBQU8sQ0FBQyxrREFBb0IsR0FBRztBQUMvQixtQkFBTyxDQUFDLGtEQUFvQixHQUFHO0FBQy9CO0FBQ0EsbUJBQU8sQ0FBQyw0REFBeUI7QUFDakM7QUFDQSxtQkFBTyxDQUFDLHdEQUF1QixHQUFHO0FBQ2xDO0FBQ0EsbUJBQU8sQ0FBQyxvREFBcUIsR0FBRztBQUNoQyxtQkFBTyxDQUFDLGdEQUFtQixHQUFHOzs7Ozs7Ozs7OztBQ2I5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUY7QUFDekY7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7Ozs7OztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDhCQUE4QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxtQkFBbUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQzV2QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDalZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDLHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkMsd0JBQXdCLFVBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHlCQUF5QjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQywwQkFBMEI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCwwQkFBMEI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0JBQStCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsK0JBQStCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELFFBQVE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBLDZDQUE2Qyx5QkFBeUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QseUJBQXlCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDblBBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsV0FBVztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IscURBQXFEO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFCQUFxQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHVFQUF1RSxzQkFBc0I7QUFDN0Y7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzQkFBc0I7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCLDRCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsT0FBTztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxnQ0FBZ0Msb0JBQW9CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0NBQWtDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxtQkFBTyxDQUFDLGdDQUFXO0FBQ25CO0FBQ0EsMENBQTBDO0FBQzFDLG1DQUFtQztBQUNuQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLG1CQUFPLENBQUMsa0RBQW9CO0FBQzVCO0FBQ0EsbUJBQU8sQ0FBQyxrRUFBNEIsR0FBRztBQUN2QyxtQkFBTyxDQUFDLGdEQUFtQixHQUFHO0FBQzlCLG1CQUFPLENBQUMsOENBQWtCLEdBQUc7QUFDN0I7QUFDQSxtQkFBTyxDQUFDLDRFQUFpQyxHQUFHO0FBQzVDO0FBQ0EsbUJBQU8sQ0FBQyx3REFBdUIsR0FBRztBQUNsQyx5Q0FBeUM7QUFDekM7QUFDQSxtQkFBTyxDQUFDLG9FQUE2QixHQUFHO0FBQ3hDO0FBQ0EsbUJBQU8sQ0FBQyw0REFBeUIsR0FBRztBQUNwQyxtQkFBTyxDQUFDLDhFQUFrQyxHQUFHO0FBQzdDLG1CQUFPLENBQUMsb0VBQTZCLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvQXBwLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9iYXNlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvQ2lyY2xlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL01hdGguanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvTWF0cml4LmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL1BvaW50LmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL1BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUmVjdGFuZ2xlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL1JvdW5kZWRSZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21pbmkuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvQmFzZU9iamVjdDJELmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL0dyYXBoaWNzLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL09iamVjdDJELmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL1NjZW5lLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL1Nwcml0ZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvb2JqZWN0cy9UZXh0LmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9yZW5kZXJlcnMvQ2FudmFzTWFza01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3JlbmRlcmVycy9DYW52YXNSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvcmVuZGVyZXJzL0NhbnZhc1RpbnRlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvcmVuZGVyZXJzL0dyYXBoaWNzUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvSW5wdXQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvTG9hZGVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL1JBRi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9UaW1lci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9Ud2Vlbi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdGV4dHVyZXMvUmVuZGVyVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdGV4dHVyZXMvVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdXRpbHMvQ2FudmFzQnVmZmVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy91dGlscy9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3V0aWxzL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2g1dGlueS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcblRpbnkuQXBwID0gZnVuY3Rpb24gKHN0YXRlcykge1xyXG4gICAgdGhpcy5jYWxsYmFja0NvbnRleHQgPSB0aGlzO1xyXG4gICAgdGhpcy5zdGF0ZSA9IDA7XHJcbiAgICB0aGlzLnRpbWVTY2FsZSA9IDE7XHJcbiAgICB0aGlzLndpZHRoID0gMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgIHRoaXMuc3lzdGVtcyA9IFtdO1xyXG4gICAgdGhpcy51cGRhdGFibGUgPSBbXTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhdXNlRHVyYXRpb24gPSAwO1xyXG4gICAgdGhpcy5pbnB1dFZpZXcgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgIGlmICghVGlueS5hcHApIFRpbnkuYXBwID0gdGhpcztcclxuXHJcbiAgICBpZiAoVGlueS5FdmVudEVtaXR0ZXIpIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKHRoaXMpO1xyXG5cclxuICAgIHN0YXRlcyA9IHN0YXRlcyB8fCB7fTtcclxuICAgIHRoaXMuYm9vdCA9IHN0YXRlcy5ib290IHx8IHRoaXMuYm9vdCB8fCBub29wO1xyXG4gICAgdGhpcy5wcmVsb2FkID0gc3RhdGVzLnByZWxvYWQgfHwgdGhpcy5wcmVsb2FkIHx8IG5vb3A7XHJcbiAgICB0aGlzLmNyZWF0ZSA9IHN0YXRlcy5jcmVhdGUgfHwgdGhpcy5jcmVhdGUgfHwgbm9vcDtcclxuICAgIHRoaXMudXBkYXRlID0gc3RhdGVzLnVwZGF0ZSB8fCB0aGlzLnVwZGF0ZSB8fCBub29wO1xyXG4gICAgdGhpcy5yZW5kZXIgPSBzdGF0ZXMucmVuZGVyIHx8IHRoaXMucmVuZGVyIHx8IG5vb3A7XHJcbiAgICB0aGlzLl9yZXNpemVfY2IgPSBzdGF0ZXMucmVzaXplIHx8IG5vb3A7XHJcbiAgICB0aGlzLl9kZXN0cm95X2NiID0gc3RhdGVzLmRlc3Ryb3kgfHwgbm9vcDtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9ib290KCk7XHJcbiAgICB9LCAwKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fYm9vdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHN5c3RlbSA9IFRpbnkuc3lzdGVtc1tpXTtcclxuXHJcbiAgICAgICAgdmFyIF9zeXNfID0gbmV3IHN5c3RlbS5fY2xhc3NfKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtcy5wdXNoKF9zeXNfKTtcclxuICAgICAgICBpZiAoX3N5c18udXBkYXRlKSB0aGlzLnVwZGF0YWJsZS5wdXNoKF9zeXNfKTtcclxuXHJcbiAgICAgICAgaWYgKHN5c3RlbS5uYW1lKSB0aGlzW3N5c3RlbS5uYW1lXSA9IF9zeXNfO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChUaW55LlJBRikge1xyXG4gICAgICAgIHRoaXMucmFmID0gbmV3IFRpbnkuUkFGKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYm9vdC5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoc2VsZi5sb2FkKSBzZWxmLl9wcmVsb2FkKCk7XHJcbiAgICAgICAgZWxzZSBzZWxmLl9jcmVhdGUoKTtcclxuICAgIH0sIDApO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl9wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5wcmVsb2FkLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IDE7XHJcbiAgICB0aGlzLmxvYWQuc3RhcnQodGhpcy5fY3JlYXRlKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5lbWl0KFwibG9hZFwiKTtcclxuICAgIHRoaXMuY3JlYXRlLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG5cclxuICAgIGlmICh0aGlzLnJhZikge1xyXG4gICAgICAgIHRoaXMucmFmLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IDI7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5yYWYpIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wYXVzZWQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLnBhdXNlKSB0aGlzLnN5c3RlbXNbaV0ucGF1c2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5yYWYpIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN5c3RlbXNbaV0ucmVzdW1lKSB0aGlzLnN5c3RlbXNbaV0ucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAodGltZSwgZGVsdGEpIHtcclxuICAgIGlmICghdGhpcy5wYXVzZWQpIHtcclxuICAgICAgICBkZWx0YSAqPSB0aGlzLnRpbWVTY2FsZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZS5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwidXBkYXRlXCIsIGRlbHRhKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVwZGF0YWJsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0YWJsZVtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZUR1cmF0aW9uICs9IGRlbHRhO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB0aGlzLmVtaXQoXCJwb3N0cmVuZGVyXCIpO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgdGhpcy53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlID4gMCkge1xyXG4gICAgICAgIHRoaXMuX3Jlc2l6ZV9jYi5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwicmVzaXplXCIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChzZWxmLmlucHV0KSBzZWxmLmlucHV0LnVwZGF0ZUJvdW5kcygpO1xyXG4gICAgfSwgMCk7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChjbGVhckNhY2hlKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLmRlc3Ryb3kpIHRoaXMuc3lzdGVtc1tpXS5kZXN0cm95KGNsZWFyQ2FjaGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoY2xlYXJDYWNoZSkge1xyXG4gICAgICAgIHRoaXMubG9hZC5jbGVhckNhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmFmKSB7XHJcbiAgICAgICAgdGhpcy5yYWYuc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2Rlc3Ryb3lfY2IuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcblxyXG4gICAgaWYgKFRpbnkuYXBwID09PSB0aGlzKSBUaW55LmFwcCA9IG51bGw7XHJcbn07XHJcbiIsInJlcXVpcmUoXCIuL3V0aWxzL3BvbHlmaWxsLmpzXCIpO1xyXG5cclxud2luZG93LlRpbnkgPSB7fTtcclxuXHJcbnJlcXVpcmUoXCIuL0FwcC5qc1wiKTtcclxucmVxdWlyZShcIi4vZ2xvYmFsLmpzXCIpO1xyXG5yZXF1aXJlKFwiLi9tYXRoL01hdGguanNcIik7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vbWF0aC9Qb2ludC5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vbWF0aC9NYXRyaXguanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL21hdGgvUmVjdGFuZ2xlLmpzXCIpOyAvLyAgOCBLYlxyXG5cclxucmVxdWlyZShcIi4vb2JqZWN0cy9CYXNlT2JqZWN0MkQuanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL29iamVjdHMvT2JqZWN0MkQuanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL29iamVjdHMvU2NlbmUuanNcIik7IC8vIDEwIEtiXHJcblxyXG5yZXF1aXJlKFwiLi9yZW5kZXJlcnMvQ2FudmFzUmVuZGVyZXIuanNcIik7IC8vIDMgS2JcclxuIiwiVGlueS5WRVJTSU9OID0gJzIuMS4xMic7XHJcblxyXG5UaW55LnN5c3RlbXMgPSBbXTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0gPSBmdW5jdGlvbiAobmFtZSwgc3lzdGVtKSB7XHJcbiAgICBUaW55LnN5c3RlbXMucHVzaCh7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBfY2xhc3NfOiBzeXN0ZW1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuVGlueS5QcmltaXRpdmVzID0ge1xyXG4gICAgUE9MWTogMCxcclxuICAgIFJFQ1Q6IDEsXHJcbiAgICBDSVJDOiAyLFxyXG4gICAgRUxJUDogMyxcclxuICAgIFJSRUM6IDQsXHJcbiAgICBSUkVDX0xKT0lOOiA1XHJcbn07XHJcblxyXG5UaW55LnJuZCA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XHJcbn07XHJcblxyXG5UaW55LnN0eWxlMmhleCA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG4gICAgcmV0dXJuICtjb2xvci5yZXBsYWNlKCcjJywgJzB4Jyk7XHJcbn07XHJcblxyXG5UaW55LmhleDJzdHlsZSA9IGZ1bmN0aW9uIChoZXgpIHtcclxuICAgIHJldHVybiAnIycgKyAoJzAwMDAwJyArIChoZXggfCAwKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7XHJcbn07XHJcblxyXG5UaW55LmhleDJyZ2IgPSBmdW5jdGlvbiAoaGV4KSB7XHJcbiAgICByZXR1cm4gWygoaGV4ID4+IDE2KSAmIDB4ZmYpIC8gMjU1LCAoKGhleCA+PiA4KSAmIDB4ZmYpIC8gMjU1LCAoaGV4ICYgMHhmZikgLyAyNTVdO1xyXG59O1xyXG5cclxuVGlueS5yZ2IyaGV4ID0gZnVuY3Rpb24gKHJnYikge1xyXG4gICAgcmV0dXJuICgocmdiWzBdICogMjU1KSA8PCAxNikgKyAoKHJnYlsxXSAqIDI1NSkgPDwgOCkgKyByZ2JbMl0gKiAyNTU7XHJcbn07XHJcbiIsIlRpbnkuQ2lyY2xlID0gZnVuY3Rpb24gKHgsIHksIGRpYW1ldGVyKSB7XHJcbiAgICB4ID0geCB8fCAwO1xyXG4gICAgeSA9IHkgfHwgMDtcclxuICAgIGRpYW1ldGVyID0gZGlhbWV0ZXIgfHwgMDtcclxuXHJcbiAgICB0aGlzLnggPSB4O1xyXG5cclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy5fZGlhbWV0ZXIgPSBkaWFtZXRlcjtcclxuXHJcbiAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG5cclxuICAgIGlmIChkaWFtZXRlciA+IDApIHtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSBkaWFtZXRlciAqIDAuNTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuQ0lSQztcclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLnByb3RvdHlwZSA9IHtcclxuICAgIGdldEJvdW5kczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGlueS5SZWN0YW5nbGUodGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLmRpYW1ldGVyLCB0aGlzLmRpYW1ldGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5LCBkaWFtZXRlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLl9kaWFtZXRlciA9IGRpYW1ldGVyO1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IGRpYW1ldGVyICogMC41O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY29weUZyb206IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXRUbyhzb3VyY2UueCwgc291cmNlLnksIHNvdXJjZS5kaWFtZXRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvcHlUbzogZnVuY3Rpb24gKGRlc3QpIHtcclxuICAgICAgICBkZXN0LnggPSB0aGlzLng7XHJcbiAgICAgICAgZGVzdC55ID0gdGhpcy55O1xyXG4gICAgICAgIGRlc3QuZGlhbWV0ZXIgPSB0aGlzLl9kaWFtZXRlcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc3RhbmNlOiBmdW5jdGlvbiAoZGVzdCwgcm91bmQpIHtcclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBUaW55Lk1hdGguZGlzdGFuY2UodGhpcy54LCB0aGlzLnksIGRlc3QueCwgZGVzdC55KTtcclxuICAgICAgICByZXR1cm4gcm91bmQgPyBNYXRoLnJvdW5kKGRpc3RhbmNlKSA6IGRpc3RhbmNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiIHx8IG91dHB1dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5DaXJjbGUodGhpcy54LCB0aGlzLnksIHRoaXMuZGlhbWV0ZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5zZXRUbyh0aGlzLngsIHRoaXMueSwgdGhpcy5kaWFtZXRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gVGlueS5DaXJjbGUuY29udGFpbnModGhpcywgeCwgeSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9mZnNldDogZnVuY3Rpb24gKGR4LCBkeSkge1xyXG4gICAgICAgIHRoaXMueCArPSBkeDtcclxuICAgICAgICB0aGlzLnkgKz0gZHk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBvZmZzZXRQb2ludDogZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0KHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DaXJjbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DaXJjbGU7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImRpYW1ldGVyXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaWFtZXRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHZhbHVlICogMC41O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcInJhZGl1c1wiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gdmFsdWUgKiAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImxlZnRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAtIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLngpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdGhpcy54IC0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwicmlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPCB0aGlzLngpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdmFsdWUgLSB0aGlzLng7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwidG9wXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgLSB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID4gdGhpcy55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHRoaXMueSAtIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IHRoaXMueSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB2YWx1ZSAtIHRoaXMueTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJhcmVhXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9yYWRpdXMgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlBJICogdGhpcy5fcmFkaXVzICogdGhpcy5fcmFkaXVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImVtcHR5XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaWFtZXRlciA9PT0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUbygwLCAwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5DaXJjbGUuY29udGFpbnMgPSBmdW5jdGlvbiAoYSwgeCwgeSkge1xyXG4gICAgLy8gIENoZWNrIGlmIHgveSBhcmUgd2l0aGluIHRoZSBib3VuZHMgZmlyc3RcclxuICAgIGlmIChhLnJhZGl1cyA+IDAgJiYgeCA+PSBhLmxlZnQgJiYgeCA8PSBhLnJpZ2h0ICYmIHkgPj0gYS50b3AgJiYgeSA8PSBhLmJvdHRvbSkge1xyXG4gICAgICAgIHZhciBkeCA9IChhLnggLSB4KSAqIChhLnggLSB4KTtcclxuICAgICAgICB2YXIgZHkgPSAoYS55IC0geSkgKiAoYS55IC0geSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkeCArIGR5IDw9IGEucmFkaXVzICogYS5yYWRpdXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLmVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICByZXR1cm4gYS54ID09IGIueCAmJiBhLnkgPT0gYi55ICYmIGEuZGlhbWV0ZXIgPT0gYi5kaWFtZXRlcjtcclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgcmV0dXJuIFRpbnkuTWF0aC5kaXN0YW5jZShhLngsIGEueSwgYi54LCBiLnkpIDw9IGEucmFkaXVzICsgYi5yYWRpdXM7XHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5pbnRlcnNlY3RzUmVjdGFuZ2xlID0gZnVuY3Rpb24gKGMsIHIpIHtcclxuICAgIHZhciBjeCA9IE1hdGguYWJzKGMueCAtIHIueCAtIHIuaGFsZldpZHRoKTtcclxuICAgIHZhciB4RGlzdCA9IHIuaGFsZldpZHRoICsgYy5yYWRpdXM7XHJcblxyXG4gICAgaWYgKGN4ID4geERpc3QpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN5ID0gTWF0aC5hYnMoYy55IC0gci55IC0gci5oYWxmSGVpZ2h0KTtcclxuICAgIHZhciB5RGlzdCA9IHIuaGFsZkhlaWdodCArIGMucmFkaXVzO1xyXG5cclxuICAgIGlmIChjeSA+IHlEaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjeCA8PSByLmhhbGZXaWR0aCB8fCBjeSA8PSByLmhhbGZIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeENvcm5lckRpc3QgPSBjeCAtIHIuaGFsZldpZHRoO1xyXG4gICAgdmFyIHlDb3JuZXJEaXN0ID0gY3kgLSByLmhhbGZIZWlnaHQ7XHJcbiAgICB2YXIgeENvcm5lckRpc3RTcSA9IHhDb3JuZXJEaXN0ICogeENvcm5lckRpc3Q7XHJcbiAgICB2YXIgeUNvcm5lckRpc3RTcSA9IHlDb3JuZXJEaXN0ICogeUNvcm5lckRpc3Q7XHJcbiAgICB2YXIgbWF4Q29ybmVyRGlzdFNxID0gYy5yYWRpdXMgKiBjLnJhZGl1cztcclxuXHJcbiAgICByZXR1cm4geENvcm5lckRpc3RTcSArIHlDb3JuZXJEaXN0U3EgPD0gbWF4Q29ybmVyRGlzdFNxO1xyXG59O1xyXG4iLCJUaW55Lk1hdGggPSB7XHJcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgdmFyIGR4ID0geDEgLSB4MjtcclxuICAgICAgICB2YXIgZHkgPSB5MSAtIHkyO1xyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgIH1cclxufTtcclxuXHJcbnZhciBkZWdyZWVUb1JhZGlhbnNGYWN0b3IgPSBNYXRoLlBJIC8gMTgwO1xyXG52YXIgcmFkaWFuVG9EZWdyZWVzRmFjdG9yID0gMTgwIC8gTWF0aC5QSTtcclxuXHJcblRpbnkuTWF0aC5kZWdUb1JhZCA9IGZ1bmN0aW9uIGRlZ1RvUmFkKGRlZ3JlZXMpIHtcclxuICAgIHJldHVybiBkZWdyZWVzICogZGVncmVlVG9SYWRpYW5zRmFjdG9yO1xyXG59O1xyXG5cclxuVGlueS5NYXRoLnJhZFRvRGVnID0gZnVuY3Rpb24gcmFkVG9EZWcocmFkaWFucykge1xyXG4gICAgcmV0dXJuIHJhZGlhbnMgKiByYWRpYW5Ub0RlZ3JlZXNGYWN0b3I7XHJcbn07XHJcbiIsIlRpbnkuTWF0cml4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hID0gMTtcclxuXHJcbiAgICB0aGlzLmIgPSAwO1xyXG5cclxuICAgIHRoaXMuYyA9IDA7XHJcblxyXG4gICAgdGhpcy5kID0gMTtcclxuXHJcbiAgICB0aGlzLnR4ID0gMDtcclxuXHJcbiAgICB0aGlzLnR5ID0gMDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55Lk1BVFJJWDtcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5mcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgIHRoaXMuYSA9IGFycmF5WzBdO1xyXG4gICAgdGhpcy5iID0gYXJyYXlbMV07XHJcbiAgICB0aGlzLmMgPSBhcnJheVszXTtcclxuICAgIHRoaXMuZCA9IGFycmF5WzRdO1xyXG4gICAgdGhpcy50eCA9IGFycmF5WzJdO1xyXG4gICAgdGhpcy50eSA9IGFycmF5WzVdO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAodHJhbnNwb3NlKSB7XHJcbiAgICBpZiAoIXRoaXMuYXJyYXkpIHtcclxuICAgICAgICB0aGlzLmFycmF5ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xyXG5cclxuICAgIGlmICh0cmFuc3Bvc2UpIHtcclxuICAgICAgICBhcnJheVswXSA9IHRoaXMuYTtcclxuICAgICAgICBhcnJheVsxXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVsyXSA9IDA7XHJcbiAgICAgICAgYXJyYXlbM10gPSB0aGlzLmM7XHJcbiAgICAgICAgYXJyYXlbNF0gPSB0aGlzLmQ7XHJcbiAgICAgICAgYXJyYXlbNV0gPSAwO1xyXG4gICAgICAgIGFycmF5WzZdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVs3XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbOF0gPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhcnJheVswXSA9IHRoaXMuYTtcclxuICAgICAgICBhcnJheVsxXSA9IHRoaXMuYztcclxuICAgICAgICBhcnJheVsyXSA9IHRoaXMudHg7XHJcbiAgICAgICAgYXJyYXlbM10gPSB0aGlzLmI7XHJcbiAgICAgICAgYXJyYXlbNF0gPSB0aGlzLmQ7XHJcbiAgICAgICAgYXJyYXlbNV0gPSB0aGlzLnR5O1xyXG4gICAgICAgIGFycmF5WzZdID0gMDtcclxuICAgICAgICBhcnJheVs3XSA9IDA7XHJcbiAgICAgICAgYXJyYXlbOF0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJheTtcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uIChwb3MsIG5ld1Bvcykge1xyXG4gICAgbmV3UG9zID0gbmV3UG9zIHx8IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdmFyIHggPSBwb3MueDtcclxuICAgIHZhciB5ID0gcG9zLnk7XHJcblxyXG4gICAgbmV3UG9zLnggPSB0aGlzLmEgKiB4ICsgdGhpcy5jICogeSArIHRoaXMudHg7XHJcbiAgICBuZXdQb3MueSA9IHRoaXMuYiAqIHggKyB0aGlzLmQgKiB5ICsgdGhpcy50eTtcclxuXHJcbiAgICByZXR1cm4gbmV3UG9zO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5SW52ZXJzZSA9IGZ1bmN0aW9uIChwb3MsIG5ld1Bvcykge1xyXG4gICAgbmV3UG9zID0gbmV3UG9zIHx8IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdmFyIGlkID0gMSAvICh0aGlzLmEgKiB0aGlzLmQgKyB0aGlzLmMgKiAtdGhpcy5iKTtcclxuICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICB2YXIgeSA9IHBvcy55O1xyXG5cclxuICAgIG5ld1Bvcy54ID0gdGhpcy5kICogaWQgKiB4ICsgLXRoaXMuYyAqIGlkICogeSArICh0aGlzLnR5ICogdGhpcy5jIC0gdGhpcy50eCAqIHRoaXMuZCkgKiBpZDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5hICogaWQgKiB5ICsgLXRoaXMuYiAqIGlkICogeCArICgtdGhpcy50eSAqIHRoaXMuYSArIHRoaXMudHggKiB0aGlzLmIpICogaWQ7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BvcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdGhpcy50eCArPSB4O1xyXG4gICAgdGhpcy50eSArPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMuYSAqPSB4O1xyXG4gICAgdGhpcy5kICo9IHk7XHJcbiAgICB0aGlzLmMgKj0geDtcclxuICAgIHRoaXMuYiAqPSB5O1xyXG4gICAgdGhpcy50eCAqPSB4O1xyXG4gICAgdGhpcy50eSAqPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xyXG4gICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XHJcblxyXG4gICAgdmFyIGExID0gdGhpcy5hO1xyXG4gICAgdmFyIGMxID0gdGhpcy5jO1xyXG4gICAgdmFyIHR4MSA9IHRoaXMudHg7XHJcblxyXG4gICAgdGhpcy5hID0gYTEgKiBjb3MgLSB0aGlzLmIgKiBzaW47XHJcbiAgICB0aGlzLmIgPSBhMSAqIHNpbiArIHRoaXMuYiAqIGNvcztcclxuICAgIHRoaXMuYyA9IGMxICogY29zIC0gdGhpcy5kICogc2luO1xyXG4gICAgdGhpcy5kID0gYzEgKiBzaW4gKyB0aGlzLmQgKiBjb3M7XHJcbiAgICB0aGlzLnR4ID0gdHgxICogY29zIC0gdGhpcy50eSAqIHNpbjtcclxuICAgIHRoaXMudHkgPSB0eDEgKiBzaW4gKyB0aGlzLnR5ICogY29zO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICAgIHZhciBhMSA9IHRoaXMuYTtcclxuICAgIHZhciBiMSA9IHRoaXMuYjtcclxuICAgIHZhciBjMSA9IHRoaXMuYztcclxuICAgIHZhciBkMSA9IHRoaXMuZDtcclxuXHJcbiAgICB0aGlzLmEgPSBtYXRyaXguYSAqIGExICsgbWF0cml4LmIgKiBjMTtcclxuICAgIHRoaXMuYiA9IG1hdHJpeC5hICogYjEgKyBtYXRyaXguYiAqIGQxO1xyXG4gICAgdGhpcy5jID0gbWF0cml4LmMgKiBhMSArIG1hdHJpeC5kICogYzE7XHJcbiAgICB0aGlzLmQgPSBtYXRyaXguYyAqIGIxICsgbWF0cml4LmQgKiBkMTtcclxuXHJcbiAgICB0aGlzLnR4ID0gbWF0cml4LnR4ICogYTEgKyBtYXRyaXgudHkgKiBjMSArIHRoaXMudHg7XHJcbiAgICB0aGlzLnR5ID0gbWF0cml4LnR4ICogYjEgKyBtYXRyaXgudHkgKiBkMSArIHRoaXMudHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuaWRlbnRpdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmEgPSAxO1xyXG4gICAgdGhpcy5iID0gMDtcclxuICAgIHRoaXMuYyA9IDA7XHJcbiAgICB0aGlzLmQgPSAxO1xyXG4gICAgdGhpcy50eCA9IDA7XHJcbiAgICB0aGlzLnR5ID0gMDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuaWRlbnRpdHlNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuIiwiVGlueS5Qb2ludCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbn07XHJcblxyXG5UaW55LlBvaW50LnByb3RvdHlwZSA9IHtcclxuICAgIHNldDogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICAgICAgdGhpcy55ID0geSB8fCAoeSAhPT0gMCA/IHRoaXMueCA6IDApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5Qb2x5Z29uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hcmVhID0gMDtcclxuICAgIHRoaXMuX3BvaW50cyA9IFtdO1xyXG5cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuc2V0VG8uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5QT0xZO1xyXG59O1xyXG5cclxuVGlueS5Qb2x5Z29uLnByb3RvdHlwZSA9IHtcclxuICAgIHRvTnVtYmVyQXJyYXk6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcG9pbnRzW2ldID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2godGhpcy5fcG9pbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0ueCk7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGZsYXR0ZW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9wb2ludHMgPSB0aGlzLnRvTnVtYmVyQXJyYXkoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMuX3BvaW50cy5zbGljZSgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvdXRwdXQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gbmV3IFRpbnkuUG9seWdvbihwb2ludHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5zZXRUbyhwb2ludHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuX3BvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGluc2lkZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gLTEsIGogPSBsZW5ndGggLSAxOyArK2kgPCBsZW5ndGg7IGogPSBpKSB7XHJcbiAgICAgICAgICAgIHZhciBpeCA9IHRoaXMuX3BvaW50c1tpXS54O1xyXG4gICAgICAgICAgICB2YXIgaXkgPSB0aGlzLl9wb2ludHNbaV0ueTtcclxuXHJcbiAgICAgICAgICAgIHZhciBqeCA9IHRoaXMuX3BvaW50c1tqXS54O1xyXG4gICAgICAgICAgICB2YXIgankgPSB0aGlzLl9wb2ludHNbal0ueTtcclxuXHJcbiAgICAgICAgICAgIGlmICgoKGl5IDw9IHkgJiYgeSA8IGp5KSB8fCAoankgPD0geSAmJiB5IDwgaXkpKSAmJiB4IDwgKChqeCAtIGl4KSAqICh5IC0gaXkpKSAvIChqeSAtIGl5KSArIGl4KSB7XHJcbiAgICAgICAgICAgICAgICBpbnNpZGUgPSAhaW5zaWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5zaWRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHBvaW50cykge1xyXG4gICAgICAgIHRoaXMuYXJlYSA9IDA7XHJcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gW107XHJcblxyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyAgSWYgcG9pbnRzIGlzbid0IGFuIGFycmF5LCB1c2UgYXJndW1lbnRzIGFzIHRoZSBhcnJheVxyXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocG9pbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHkwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICAgICAgICAgIC8vICBBbGxvd3MgZm9yIG1peGVkLXR5cGUgYXJndW1lbnRzXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcG9pbnRzW2ldID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgVGlueS5Qb2ludChwb2ludHNbaV0sIHBvaW50c1tpICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgVGlueS5Qb2ludChwb2ludHNbaV0ueCwgcG9pbnRzW2ldLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvaW50cy5wdXNoKHApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICBMb3dlc3QgYm91bmRhcnlcclxuICAgICAgICAgICAgICAgIGlmIChwLnkgPCB5MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkwID0gcC55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUFyZWEoeTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGN1bGF0ZUFyZWE6IGZ1bmN0aW9uICh5MCkge1xyXG4gICAgICAgIHZhciBwMTtcclxuICAgICAgICB2YXIgcDI7XHJcbiAgICAgICAgdmFyIGF2Z0hlaWdodDtcclxuICAgICAgICB2YXIgd2lkdGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9wb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgcDEgPSB0aGlzLl9wb2ludHNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLl9wb2ludHNbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuX3BvaW50c1tpICsgMV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF2Z0hlaWdodCA9IChwMS55IC0geTAgKyAocDIueSAtIHkwKSkgLyAyO1xyXG4gICAgICAgICAgICB3aWR0aCA9IHAxLnggLSBwMi54O1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgKz0gYXZnSGVpZ2h0ICogd2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hcmVhO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5Qb2x5Z29uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUG9seWdvbjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlBvbHlnb24ucHJvdG90eXBlLCBcInBvaW50c1wiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uIChwb2ludHMpIHtcclxuICAgICAgICBpZiAocG9pbnRzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUbyhwb2ludHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICBDbGVhciB0aGUgcG9pbnRzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG8oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJUaW55LlJlY3RhbmdsZSA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB4ID0geCB8fCAwO1xyXG4gICAgeSA9IHkgfHwgMDtcclxuICAgIHdpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIGhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SRUNUO1xyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUucHJvdG90eXBlID0ge1xyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW50ZXJzZWN0czogZnVuY3Rpb24gKGIpIHtcclxuICAgICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0cyh0aGlzLCBiKTtcclxuICAgIH1cclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwiYm90dG9tXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPD0gdGhpcy55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHZhbHVlIC0gdGhpcy55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLngpIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHZhbHVlIC0gdGhpcy54O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInZvbHVtZVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmVjdGFuZ2xlO1xyXG5cclxuVGlueS5SZWN0YW5nbGUuY29udGFpbnMgPSBmdW5jdGlvbiAoYSwgeCwgeSkge1xyXG4gICAgaWYgKGEud2lkdGggPD0gMCB8fCBhLmhlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4ID49IGEueCAmJiB4IDwgYS5yaWdodCAmJiB5ID49IGEueSAmJiB5IDwgYS5ib3R0b207XHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKGEsIHBvaW50KSB7XHJcbiAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuY29udGFpbnMoYSwgcG9pbnQueCwgcG9pbnQueSk7XHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWluc1JlY3QgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgLy8gIElmIHRoZSBnaXZlbiByZWN0IGhhcyBhIGxhcmdlciB2b2x1bWUgdGhhbiB0aGlzIG9uZSB0aGVuIGl0IGNhbiBuZXZlciBjb250YWluIGl0XHJcbiAgICBpZiAoYS52b2x1bWUgPiBiLnZvbHVtZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYS54ID49IGIueCAmJiBhLnkgPj0gYi55ICYmIGEucmlnaHQgPCBiLnJpZ2h0ICYmIGEuYm90dG9tIDwgYi5ib3R0b207XHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIGlmIChhLndpZHRoIDw9IDAgfHwgYS5oZWlnaHQgPD0gMCB8fCBiLndpZHRoIDw9IDAgfHwgYi5oZWlnaHQgPD0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIShhLnJpZ2h0IDwgYi54IHx8IGEuYm90dG9tIDwgYi55IHx8IGEueCA+IGIucmlnaHQgfHwgYS55ID4gYi5ib3R0b20pO1xyXG59O1xyXG5cclxuVGlueS5FbXB0eVJlY3RhbmdsZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAwLCAwKTtcclxuIiwiVGlueS5Sb3VuZGVkUmVjdGFuZ2xlID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cykge1xyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXMgfHwgMDtcclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SUkVDO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5yYWRpdXMpO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICBpZiAodGhpcy53aWR0aCA8PSAwIHx8IHRoaXMuaGVpZ2h0IDw9IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHgxID0gdGhpcy54O1xyXG5cclxuICAgIGlmICh4ID49IHgxICYmIHggPD0geDEgKyB0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgdmFyIHkxID0gdGhpcy55O1xyXG5cclxuICAgICAgICBpZiAoeSA+PSB5MSAmJiB5IDw9IHkxICsgdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuUm91bmRlZFJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJvdW5kZWRSZWN0YW5nbGU7XHJcbiIsInJlcXVpcmUoXCIuL2Jhc2UuanNcIik7XHJcblxyXG5yZXF1aXJlKFwiLi9zeXN0ZW1zL1JBRi5qc1wiKTsgLy8gMiBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvT2JqZWN0Q3JlYXRvci5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvTG9hZGVyLmpzXCIpOyAvLyAzIEtiXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvSW5wdXQuanNcIik7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9UaW1lci5qc1wiKTsgLy8gMSBLYlxyXG5cclxucmVxdWlyZShcIi4vdXRpbHMvRXZlbnRFbWl0dGVyLmpzXCIpO1xyXG5cclxucmVxdWlyZShcIi4vdGV4dHVyZXMvVGV4dHVyZS5qc1wiKTsgLy8gNCBLYlxyXG5cclxucmVxdWlyZShcIi4vb2JqZWN0cy9TcHJpdGUuanNcIik7IC8vIDMgS2JcclxucmVxdWlyZShcIi4vb2JqZWN0cy9UZXh0LmpzXCIpOyAvLyA1IEtiXHJcbiIsInZhciBwaTIgPSBNYXRoLlBJICogMjtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJEID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUaW55LlBvaW50KDEsIDEpO1xyXG4gICAgdGhpcy5waXZvdCA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmFscGhhID0gMTtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLl9zciA9IDA7XHJcbiAgICB0aGlzLl9jciA9IDE7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkJhc2VPYmplY3QyRDtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG51bGw7XHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZGVzdHJveUNhY2hlZFNwcml0ZSgpO1xyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ3b3JsZFZpc2libGVcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGlmICghaXRlbS52aXNpYmxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnBhcmVudDtcclxuICAgICAgICB9IHdoaWxlIChpdGVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJjYWNoZUFzQml0bWFwXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwID09PSB2YWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIHNvbWUgbWF0cml4IHJlZnMgZm9yIGVhc3kgYWNjZXNzXHJcbiAgICB2YXIgcHQgPSB0aGlzLnBhcmVudC53b3JsZFRyYW5zZm9ybTtcclxuICAgIHZhciB3dCA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgLy8gdGVtcG9yYXJ5IG1hdHJpeCB2YXJpYWJsZXNcclxuICAgIHZhciBhLCBiLCBjLCBkLCB0eCwgdHk7XHJcblxyXG4gICAgLy8gc28gaWYgcm90YXRpb24gaXMgYmV0d2VlbiAwIHRoZW4gd2UgY2FuIHNpbXBsaWZ5IHRoZSBtdWx0aXBsaWNhdGlvbiBwcm9jZXNzLi5cclxuICAgIGlmICh0aGlzLnJvdGF0aW9uICUgcGkyKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSByb3RhdGlvbiBpcyB0aGUgc2FtZSBhcyB0aGUgcHJldmlvdXMgcmVuZGVyLiBUaGlzIG1lYW5zIHdlIG9ubHkgbmVlZCB0byB1c2Ugc2luIGFuZCBjb3Mgd2hlbiByb3RhdGlvbiBhY3R1YWxseSBjaGFuZ2VzXHJcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb24gIT09IHRoaXMucm90YXRpb25DYWNoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uQ2FjaGUgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9zciA9IE1hdGguc2luKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9jciA9IE1hdGguY29zKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtYXRyaXggdmFsdWVzIG9mIHRoZSBkaXNwbGF5b2JqZWN0IGJhc2VkIG9uIGl0cyB0cmFuc2Zvcm0gcHJvcGVydGllcy4uXHJcbiAgICAgICAgYSA9IHRoaXMuX2NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGIgPSB0aGlzLl9zciAqIHRoaXMuc2NhbGUueDtcclxuICAgICAgICBjID0gLXRoaXMuX3NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIGQgPSB0aGlzLl9jciAqIHRoaXMuc2NhbGUueTtcclxuICAgICAgICB0eCA9IHRoaXMucG9zaXRpb24ueDtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIHBpdm90Li4gbm90IG9mdGVuIHVzZWQgc28gZ2VhcmVkIHRvd2FyZHMgdGhhdCBmYWN0IVxyXG4gICAgICAgIGlmICh0aGlzLnBpdm90LnggfHwgdGhpcy5waXZvdC55KSB7XHJcbiAgICAgICAgICAgIHR4IC09IHRoaXMucGl2b3QueCAqIGEgKyB0aGlzLnBpdm90LnkgKiBjO1xyXG4gICAgICAgICAgICB0eSAtPSB0aGlzLnBpdm90LnggKiBiICsgdGhpcy5waXZvdC55ICogZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbmNhdCB0aGUgcGFyZW50IG1hdHJpeCB3aXRoIHRoZSBvYmplY3RzIHRyYW5zZm9ybS5cclxuICAgICAgICB3dC5hID0gYSAqIHB0LmEgKyBiICogcHQuYztcclxuICAgICAgICB3dC5iID0gYSAqIHB0LmIgKyBiICogcHQuZDtcclxuICAgICAgICB3dC5jID0gYyAqIHB0LmEgKyBkICogcHQuYztcclxuICAgICAgICB3dC5kID0gYyAqIHB0LmIgKyBkICogcHQuZDtcclxuICAgICAgICB3dC50eCA9IHR4ICogcHQuYSArIHR5ICogcHQuYyArIHB0LnR4O1xyXG4gICAgICAgIHd0LnR5ID0gdHggKiBwdC5iICsgdHkgKiBwdC5kICsgcHQudHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGxldHMgZG8gdGhlIGZhc3QgdmVyc2lvbiBhcyB3ZSBrbm93IHRoZXJlIGlzIG5vIHJvdGF0aW9uLi5cclxuICAgICAgICBhID0gdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGQgPSB0aGlzLnNjYWxlLnk7XHJcblxyXG4gICAgICAgIHR4ID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy5waXZvdC54ICogYTtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueSAtIHRoaXMucGl2b3QueSAqIGQ7XHJcblxyXG4gICAgICAgIHd0LmEgPSBhICogcHQuYTtcclxuICAgICAgICB3dC5iID0gYSAqIHB0LmI7XHJcbiAgICAgICAgd3QuYyA9IGQgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgPSBkICogcHQuZDtcclxuICAgICAgICB3dC50eCA9IHR4ICogcHQuYSArIHR5ICogcHQuYyArIHB0LnR4O1xyXG4gICAgICAgIHd0LnR5ID0gdHggKiBwdC5iICsgdHkgKiBwdC5kICsgcHQudHk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbXVsdGlwbHkgdGhlIGFscGhhcy4uXHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSB0aGlzLmFscGhhICogdGhpcy5wYXJlbnQud29ybGRBbHBoYTtcclxufTtcclxuXHJcbi8vIHBlcmZvcm1hbmNlIGluY3JlYXNlIHRvIGF2b2lkIHVzaW5nIGNhbGwuLiAoMTB4IGZhc3RlcilcclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0gPSBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICAgIC8vIG1hdHJpeCA9IG1hdHJpeDsvL2p1c3QgdG8gZ2V0IHBhc3NlZCBqcyBoaW50aW5nIChhbmQgcHJlc2VydmUgaW5oZXJpdGFuY2UpXHJcbiAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5nZXRMb2NhbEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldEJvdW5kcyhUaW55LmlkZW50aXR5TWF0cml4KTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5nZW5lcmF0ZVRleHR1cmUgPSBmdW5jdGlvbiAocmVzb2x1dGlvbiwgcmVuZGVyZXIpIHtcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwLCByZW5kZXJlciwgcmVzb2x1dGlvbik7XHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuXHJcbiAgICByZW5kZXJUZXh0dXJlLnJlbmRlcih0aGlzLCBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeCk7XHJcblxyXG4gICAgcmV0dXJuIHJlbmRlclRleHR1cmU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnRvR2xvYmFsID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcbiAgICAvLyBkb24ndCBuZWVkIHRvIHVbZGF0ZSB0aGUgbG90XHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIHJldHVybiB0aGlzLndvcmxkVHJhbnNmb3JtLmFwcGx5KHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS50b0xvY2FsID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBmcm9tKSB7XHJcbiAgICBpZiAoZnJvbSkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gZnJvbS50b0dsb2JhbChwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG9uJ3QgbmVlZCB0byB1W2RhdGUgdGhlIGxvdFxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5fcmVuZGVyQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsIHJlbmRlclNlc3Npb24pO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSkge1xyXG4gICAgICAgIHZhciByZW5kZXJUZXh0dXJlID0gbmV3IFRpbnkuUmVuZGVyVGV4dHVyZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7IC8vLCByZW5kZXJTZXNzaW9uLnJlbmRlcmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHJlbmRlclRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlc2l6ZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5yZW5kZXIodGhpcywgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgsIHRydWUpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueCA9IC0oYm91bmRzLnggLyBib3VuZHMud2lkdGgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLShib3VuZHMueSAvIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9kZXN0cm95Q2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5kZXN0cm95KHRydWUpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHt9O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ4XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLng7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ5XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuIiwiVGlueS5HcmFwaGljc0RhdGEgPSBmdW5jdGlvbiAobGluZVdpZHRoLCBsaW5lQ29sb3IsIGxpbmVBbHBoYSwgZmlsbENvbG9yLCBmaWxsQWxwaGEsIGZpbGwsIHNoYXBlKSB7XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuICAgIHRoaXMubGluZUNvbG9yID0gbGluZUNvbG9yO1xyXG4gICAgdGhpcy5saW5lQWxwaGEgPSBsaW5lQWxwaGE7XHJcbiAgICB0aGlzLl9saW5lVGludCA9IGxpbmVDb2xvcjtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gZmlsbENvbG9yO1xyXG4gICAgdGhpcy5maWxsQWxwaGEgPSBmaWxsQWxwaGE7XHJcbiAgICB0aGlzLl9maWxsVGludCA9IGZpbGxDb2xvcjtcclxuICAgIHRoaXMuZmlsbCA9IGZpbGw7XHJcbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XHJcbiAgICB0aGlzLnR5cGUgPSBzaGFwZS50eXBlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljc0RhdGEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5HcmFwaGljc0RhdGE7XHJcblxyXG5UaW55LkdyYXBoaWNzRGF0YS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmV3IEdyYXBoaWNzRGF0YShcclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCxcclxuICAgICAgICB0aGlzLmxpbmVDb2xvcixcclxuICAgICAgICB0aGlzLmxpbmVBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGxDb2xvcixcclxuICAgICAgICB0aGlzLmZpbGxBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGwsXHJcbiAgICAgICAgdGhpcy5zaGFwZVxyXG4gICAgKTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gMTtcclxuICAgIHRoaXMubGluZVdpZHRoID0gMDtcclxuICAgIHRoaXMubGluZUNvbG9yID0gXCIjMDAwMDAwXCI7XHJcbiAgICB0aGlzLmdyYXBoaWNzRGF0YSA9IFtdO1xyXG4gICAgdGhpcy50aW50ID0gXCIjZmZmZmZmXCI7XHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuICAgIHRoaXMuY3VycmVudFBhdGggPSBudWxsO1xyXG4gICAgdGhpcy5pc01hc2sgPSBmYWxzZTtcclxuICAgIHRoaXMuYm91bmRzUGFkZGluZyA9IDA7XHJcblxyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBjb25zdHJ1Y3RvclxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuR3JhcGhpY3M7XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5saW5lU3R5bGUgPSBmdW5jdGlvbiAobGluZVdpZHRoLCBjb2xvciwgYWxwaGEpIHtcclxuICAgIHRoaXMubGluZVdpZHRoID0gbGluZVdpZHRoIHx8IDA7XHJcbiAgICB0aGlzLmxpbmVDb2xvciA9IGNvbG9yIHx8IFwiIzAwMDAwMFwiO1xyXG4gICAgdGhpcy5saW5lQWxwaGEgPSBhbHBoYSA9PT0gdW5kZWZpbmVkID8gMSA6IGFscGhhO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyBoYWxmd2F5IHRocm91Z2ggYSBsaW5lPyBzdGFydCBhIG5ldyBvbmUhXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlBvbHlnb24odGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMuc2xpY2UoLTIpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGl0cyBlbXB0eSBzbyBsZXRzIGp1c3Qgc2V0IHRoZSBsaW5lIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5saW5lQ29sb3IgPSB0aGlzLmxpbmVDb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5saW5lQWxwaGEgPSB0aGlzLmxpbmVBbHBoYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbihbeCwgeV0pKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudFBhdGgpIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5wdXNoKHgsIHkpO1xyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5xdWFkcmF0aWNDdXJ2ZVRvID0gZnVuY3Rpb24gKGNwWCwgY3BZLCB0b1gsIHRvWSkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzID0gWzAsIDBdO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHhhLFxyXG4gICAgICAgIHlhLFxyXG4gICAgICAgIG4gPSAyMCxcclxuICAgICAgICBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBmcm9tWCA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl07XHJcbiAgICB2YXIgZnJvbVkgPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgdmFyIGogPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gbjsgKytpKSB7XHJcbiAgICAgICAgaiA9IGkgLyBuO1xyXG5cclxuICAgICAgICB4YSA9IGZyb21YICsgKGNwWCAtIGZyb21YKSAqIGo7XHJcbiAgICAgICAgeWEgPSBmcm9tWSArIChjcFkgLSBmcm9tWSkgKiBqO1xyXG5cclxuICAgICAgICBwb2ludHMucHVzaCh4YSArIChjcFggKyAodG9YIC0gY3BYKSAqIGogLSB4YSkgKiBqLCB5YSArIChjcFkgKyAodG9ZIC0gY3BZKSAqIGogLSB5YSkgKiBqKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmJlemllckN1cnZlVG8gPSBmdW5jdGlvbiAoY3BYLCBjcFksIGNwWDIsIGNwWTIsIHRvWCwgdG9ZKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbiA9IDIwLFxyXG4gICAgICAgIGR0LFxyXG4gICAgICAgIGR0MixcclxuICAgICAgICBkdDMsXHJcbiAgICAgICAgdDIsXHJcbiAgICAgICAgdDMsXHJcbiAgICAgICAgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHM7XHJcblxyXG4gICAgdmFyIGZyb21YID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXTtcclxuICAgIHZhciBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV07XHJcbiAgICB2YXIgaiA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gbjsgKytpKSB7XHJcbiAgICAgICAgaiA9IGkgLyBuO1xyXG5cclxuICAgICAgICBkdCA9IDEgLSBqO1xyXG4gICAgICAgIGR0MiA9IGR0ICogZHQ7XHJcbiAgICAgICAgZHQzID0gZHQyICogZHQ7XHJcblxyXG4gICAgICAgIHQyID0gaiAqIGo7XHJcbiAgICAgICAgdDMgPSB0MiAqIGo7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKFxyXG4gICAgICAgICAgICBkdDMgKiBmcm9tWCArIDMgKiBkdDIgKiBqICogY3BYICsgMyAqIGR0ICogdDIgKiBjcFgyICsgdDMgKiB0b1gsXHJcbiAgICAgICAgICAgIGR0MyAqIGZyb21ZICsgMyAqIGR0MiAqIGogKiBjcFkgKyAzICogZHQgKiB0MiAqIGNwWTIgKyB0MyAqIHRvWVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5hcmNUbyA9IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5MiwgcmFkaXVzKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMucHVzaCh4MSwgeTEpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oeDEsIHkxKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMsXHJcbiAgICAgICAgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDJdLFxyXG4gICAgICAgIGZyb21ZID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSxcclxuICAgICAgICBhMSA9IGZyb21ZIC0geTEsXHJcbiAgICAgICAgYjEgPSBmcm9tWCAtIHgxLFxyXG4gICAgICAgIGEyID0geTIgLSB5MSxcclxuICAgICAgICBiMiA9IHgyIC0geDEsXHJcbiAgICAgICAgbW0gPSBNYXRoLmFicyhhMSAqIGIyIC0gYjEgKiBhMik7XHJcblxyXG4gICAgaWYgKG1tIDwgMS4wZS04IHx8IHJhZGl1cyA9PT0gMCkge1xyXG4gICAgICAgIGlmIChwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDJdICE9PSB4MSB8fCBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdICE9PSB5MSkge1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaCh4MSwgeTEpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGRkID0gYTEgKiBhMSArIGIxICogYjEsXHJcbiAgICAgICAgICAgIGNjID0gYTIgKiBhMiArIGIyICogYjIsXHJcbiAgICAgICAgICAgIHR0ID0gYTEgKiBhMiArIGIxICogYjIsXHJcbiAgICAgICAgICAgIGsxID0gKHJhZGl1cyAqIE1hdGguc3FydChkZCkpIC8gbW0sXHJcbiAgICAgICAgICAgIGsyID0gKHJhZGl1cyAqIE1hdGguc3FydChjYykpIC8gbW0sXHJcbiAgICAgICAgICAgIGoxID0gKGsxICogdHQpIC8gZGQsXHJcbiAgICAgICAgICAgIGoyID0gKGsyICogdHQpIC8gY2MsXHJcbiAgICAgICAgICAgIGN4ID0gazEgKiBiMiArIGsyICogYjEsXHJcbiAgICAgICAgICAgIGN5ID0gazEgKiBhMiArIGsyICogYTEsXHJcbiAgICAgICAgICAgIHB4ID0gYjEgKiAoazIgKyBqMSksXHJcbiAgICAgICAgICAgIHB5ID0gYTEgKiAoazIgKyBqMSksXHJcbiAgICAgICAgICAgIHF4ID0gYjIgKiAoazEgKyBqMiksXHJcbiAgICAgICAgICAgIHF5ID0gYTIgKiAoazEgKyBqMiksXHJcbiAgICAgICAgICAgIHN0YXJ0QW5nbGUgPSBNYXRoLmF0YW4yKHB5IC0gY3ksIHB4IC0gY3gpLFxyXG4gICAgICAgICAgICBlbmRBbmdsZSA9IE1hdGguYXRhbjIocXkgLSBjeSwgcXggLSBjeCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXJjKGN4ICsgeDEsIGN5ICsgeTEsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGIxICogYTIgPiBiMiAqIGExKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmFyYyA9IGZ1bmN0aW9uIChjeCwgY3ksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGFudGljbG9ja3dpc2UpIHtcclxuICAgIC8vICBJZiB3ZSBkbyB0aGlzIHdlIGNhbiBuZXZlciBkcmF3IGEgZnVsbCBjaXJjbGVcclxuICAgIGlmIChzdGFydEFuZ2xlID09PSBlbmRBbmdsZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgYW50aWNsb2Nrd2lzZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGFudGljbG9ja3dpc2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWFudGljbG9ja3dpc2UgJiYgZW5kQW5nbGUgPD0gc3RhcnRBbmdsZSkge1xyXG4gICAgICAgIGVuZEFuZ2xlICs9IE1hdGguUEkgKiAyO1xyXG4gICAgfSBlbHNlIGlmIChhbnRpY2xvY2t3aXNlICYmIHN0YXJ0QW5nbGUgPD0gZW5kQW5nbGUpIHtcclxuICAgICAgICBzdGFydEFuZ2xlICs9IE1hdGguUEkgKiAyO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzd2VlcCA9IGFudGljbG9ja3dpc2UgPyAoc3RhcnRBbmdsZSAtIGVuZEFuZ2xlKSAqIC0xIDogZW5kQW5nbGUgLSBzdGFydEFuZ2xlO1xyXG4gICAgdmFyIHNlZ3MgPSBNYXRoLmNlaWwoTWF0aC5hYnMoc3dlZXApIC8gKE1hdGguUEkgKiAyKSkgKiA0MDtcclxuXHJcbiAgICAvLyAgU3dlZXAgY2hlY2sgLSBtb3ZlZCBoZXJlIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBkbyB0aGUgbW92ZVRvIGJlbG93IGlmIHRoZSBhcmMgZmFpbHNcclxuICAgIGlmIChzd2VlcCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFydFggPSBjeCArIE1hdGguY29zKHN0YXJ0QW5nbGUpICogcmFkaXVzO1xyXG4gICAgdmFyIHN0YXJ0WSA9IGN5ICsgTWF0aC5zaW4oc3RhcnRBbmdsZSkgKiByYWRpdXM7XHJcblxyXG4gICAgaWYgKGFudGljbG9ja3dpc2UgJiYgdGhpcy5maWxsaW5nKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oY3gsIGN5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjdXJyZW50UGF0aCB3aWxsIGFsd2F5cyBleGlzdCBhZnRlciBjYWxsaW5nIGEgbW92ZVRvXHJcbiAgICB2YXIgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHM7XHJcblxyXG4gICAgdmFyIHRoZXRhID0gc3dlZXAgLyAoc2VncyAqIDIpO1xyXG4gICAgdmFyIHRoZXRhMiA9IHRoZXRhICogMjtcclxuXHJcbiAgICB2YXIgY1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xyXG4gICAgdmFyIHNUaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcclxuXHJcbiAgICB2YXIgc2VnTWludXMgPSBzZWdzIC0gMTtcclxuXHJcbiAgICB2YXIgcmVtYWluZGVyID0gKHNlZ01pbnVzICUgMSkgLyBzZWdNaW51cztcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzZWdNaW51czsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHJlYWwgPSBpICsgcmVtYWluZGVyICogaTtcclxuXHJcbiAgICAgICAgdmFyIGFuZ2xlID0gdGhldGEgKyBzdGFydEFuZ2xlICsgdGhldGEyICogcmVhbDtcclxuXHJcbiAgICAgICAgdmFyIGMgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgICAgdmFyIHMgPSAtTWF0aC5zaW4oYW5nbGUpO1xyXG5cclxuICAgICAgICBwb2ludHMucHVzaCgoY1RoZXRhICogYyArIHNUaGV0YSAqIHMpICogcmFkaXVzICsgY3gsIChjVGhldGEgKiAtcyArIHNUaGV0YSAqIGMpICogcmFkaXVzICsgY3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYmVnaW5GaWxsID0gZnVuY3Rpb24gKGNvbG9yLCBhbHBoYSkge1xyXG4gICAgdGhpcy5maWxsaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gY29sb3IgfHwgXCIjMDAwMDAwXCI7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IGFscGhhID09PSB1bmRlZmluZWQgPyAxIDogYWxwaGE7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoIDw9IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5maWxsID0gdGhpcy5maWxsaW5nO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmZpbGxDb2xvciA9IHRoaXMuZmlsbENvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmZpbGxBbHBoYSA9IHRoaXMuZmlsbEFscGhhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmVuZEZpbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZpbGxpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gbnVsbDtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gMTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSZWN0ID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Um91bmRlZFJlY3QgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKSB7XHJcbiAgICBpZiAocmFkaXVzID4gMCkgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUm91bmRlZFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpKTtcclxuICAgIGVsc2UgdGhpcy5kcmF3UmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vIFRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdDIgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbi8vIHtcclxuLy8gICAgIHZhciBzaGFwZSA9IG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG4vLyAgICAgc2hhcGUudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOO1xyXG4vLyAgICAgdGhpcy5kcmF3U2hhcGUoc2hhcGUpO1xyXG5cclxuLy8gICAgIHJldHVybiB0aGlzO1xyXG4vLyB9O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd0NpcmNsZSA9IGZ1bmN0aW9uICh4LCB5LCBkaWFtZXRlcikge1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuQ2lyY2xlKHgsIHksIGRpYW1ldGVyKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBNb3ZlZCB0byBleHRyYSBFbGxpcHNlXHJcbi8vIFRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdFbGxpcHNlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodClcclxuLy8ge1xyXG4vLyAgICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuRWxsaXBzZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XHJcblxyXG4vLyAgICAgcmV0dXJuIHRoaXM7XHJcbi8vIH07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3UG9seWdvbiA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICAvLyBwcmV2ZW50cyBhbiBhcmd1bWVudCBhc3NpZ25tZW50IGRlb3B0XHJcbiAgICAvLyBzZWUgc2VjdGlvbiAzLjE6IGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzLW1hbmFnaW5nLWFyZ3VtZW50c1xyXG4gICAgdmFyIHBvaW50cyA9IHBhdGg7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBvaW50cykpIHtcclxuICAgICAgICAvLyBwcmV2ZW50cyBhbiBhcmd1bWVudCBsZWFrIGRlb3B0XHJcbiAgICAgICAgLy8gc2VlIHNlY3Rpb24gMy4yOiBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL3dpa2kvT3B0aW1pemF0aW9uLWtpbGxlcnMjMy1tYW5hZ2luZy1hcmd1bWVudHNcclxuICAgICAgICBwb2ludHMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHBvaW50c1tpXSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbihwb2ludHMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSAwO1xyXG4gICAgdGhpcy5maWxsaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmdyYXBoaWNzRGF0YSA9IFtdO1xyXG4gICAgdGhpcy51cGRhdGVMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkZXN0cm95Q2hpbGRyZW4pIHtcclxuICAgIFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5nZW5lcmF0ZVRleHR1cmUgPSBmdW5jdGlvbiAocmVzb2x1dGlvbikge1xyXG4gICAgcmVzb2x1dGlvbiA9IHJlc29sdXRpb24gfHwgMTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICB2YXIgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKGJvdW5kcy53aWR0aCAqIHJlc29sdXRpb24sIGJvdW5kcy5oZWlnaHQgKiByZXNvbHV0aW9uKTtcclxuXHJcbiAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKGNhbnZhc0J1ZmZlci5jYW52YXMpO1xyXG4gICAgdGV4dHVyZS5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC5zY2FsZShyZXNvbHV0aW9uLCByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC50cmFuc2xhdGUoLWJvdW5kcy54LCAtYm91bmRzLnkpO1xyXG5cclxuICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcywgY2FudmFzQnVmZmVyLmNvbnRleHQpO1xyXG5cclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLmlzTWFzayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGUgdGludCBoYXMgY2hhbmdlZCwgc2V0IHRoZSBncmFwaGljcyBvYmplY3QgdG8gZGlydHkuXHJcbiAgICBpZiAodGhpcy5fcHJldlRpbnQgIT09IHRoaXMudGludCkge1xyXG4gICAgICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9wcmV2VGludCA9IHRoaXMudGludDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlZFNwcml0ZURpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB3ZSB3aWxsIGFsc28gbmVlZCB0byB1cGRhdGUgdGhlIHRleHR1cmVcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYWNoZWRTcHJpdGVUZXh0dXJlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYWxwaGEgPSB0aGlzLmFscGhhO1xyXG4gICAgICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsIHJlbmRlclNlc3Npb24pO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gcmVuZGVyU2Vzc2lvbi5jb250ZXh0O1xyXG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSkge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcclxuICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS5iICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgdHJhbnNmb3JtLmMgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS50eCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS50eSAqIHJlc29sdXRpb25cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICAvLyBzaW1wbGUgcmVuZGVyIGNoaWxkcmVuIVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAobWF0cml4KSB7XHJcbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRCb3VuZHMgfHwgdGhpcy5fYm91bmRzRGlydHkpIHtcclxuICAgICAgICAvLyByZXR1cm4gYW4gZW1wdHkgb2JqZWN0IGlmIHRoZSBpdGVtIGlzIGEgbWFzayFcclxuICAgICAgICBpZiAoIXRoaXMucmVuZGVyYWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ib3VuZHNEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxvY2FsQm91bmRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2xvY2FsQm91bmRzO1xyXG5cclxuICAgICAgICB2YXIgdzAgPSBib3VuZHMueDtcclxuICAgICAgICB2YXIgdzEgPSBib3VuZHMud2lkdGggKyBib3VuZHMueDtcclxuXHJcbiAgICAgICAgdmFyIGgwID0gYm91bmRzLnk7XHJcbiAgICAgICAgdmFyIGgxID0gYm91bmRzLmhlaWdodCArIGJvdW5kcy55O1xyXG5cclxuICAgICAgICB2YXIgd29ybGRUcmFuc2Zvcm0gPSBtYXRyaXggfHwgdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICAgICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgICAgIHZhciBiID0gd29ybGRUcmFuc2Zvcm0uYjtcclxuICAgICAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICAgICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgICAgIHZhciB0eCA9IHdvcmxkVHJhbnNmb3JtLnR4O1xyXG4gICAgICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG5cclxuICAgICAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDQgPSBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTQgPSBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIG1heFggPSB4MTtcclxuICAgICAgICB2YXIgbWF4WSA9IHkxO1xyXG5cclxuICAgICAgICB2YXIgbWluWCA9IHgxO1xyXG4gICAgICAgIHZhciBtaW5ZID0geTE7XHJcblxyXG4gICAgICAgIG1pblggPSB4MiA8IG1pblggPyB4MiA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgICAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICAgICAgbWF4WCA9IHgyID4gbWF4WCA/IHgyIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4NCA+IG1heFggPyB4NCA6IG1heFg7XHJcblxyXG4gICAgICAgIG1heFkgPSB5MiA+IG1heFkgPyB5MiA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG5cclxuICAgICAgICB0aGlzLl9ib3VuZHMueCA9IG1pblg7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgICAgIHRoaXMuX2JvdW5kcy55ID0gbWluWTtcclxuICAgICAgICB0aGlzLl9ib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRCb3VuZHM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmFwcGx5SW52ZXJzZShwb2ludCwgdGVtcFBvaW50KTtcclxuXHJcbiAgICB2YXIgZ3JhcGhpY3NEYXRhID0gdGhpcy5ncmFwaGljc0RhdGE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgaWYgKCFkYXRhLmZpbGwpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvbmx5IGRlYWwgd2l0aCBmaWxscy4uXHJcbiAgICAgICAgaWYgKGRhdGEuc2hhcGUpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc2hhcGUuY29udGFpbnModGVtcFBvaW50LngsIHRlbXBQb2ludC55KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUudXBkYXRlTG9jYWxCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIGlmICh0aGlzLmdyYXBoaWNzRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICB2YXIgc2hhcGUsIHBvaW50cywgeCwgeSwgdywgaDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZ3JhcGhpY3NEYXRhW2ldO1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGRhdGEudHlwZTtcclxuICAgICAgICAgICAgdmFyIGxpbmVXaWR0aCA9IGRhdGEubGluZVdpZHRoO1xyXG4gICAgICAgICAgICBzaGFwZSA9IGRhdGEuc2hhcGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVCB8fFxyXG4gICAgICAgICAgICAgICAgdHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMgfHxcclxuICAgICAgICAgICAgICAgIHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLnggLSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgeSA9IHNoYXBlLnkgLSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLndpZHRoICsgbGluZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgaCA9IHNoYXBlLmhlaWdodCArIGxpbmVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCA8IG1pblggPyB4IDogbWluWDtcclxuICAgICAgICAgICAgICAgIG1heFggPSB4ICsgdyA+IG1heFggPyB4ICsgdyA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWSA9IHkgPCBtaW5ZID8geSA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0geSArIGggPiBtYXhZID8geSArIGggOiBtYXhZO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5DSVJDKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgICAgIHkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLnJhZGl1cyArIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUucmFkaXVzICsgbGluZVdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCAtIHcgPCBtaW5YID8geCAtIHcgOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGggPCBtaW5ZID8geSAtIGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUCkge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgICAgICB5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgICAgIHcgPSBzaGFwZS53aWR0aCArIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUuaGVpZ2h0ICsgbGluZVdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCAtIHcgPCBtaW5YID8geCAtIHcgOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGggPCBtaW5ZID8geSAtIGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFBPTFkgLSBhc3N1bWVzIHBvaW50cyBhcmUgc2VxdWVudGlhbCwgbm90IFBvaW50IG9iamVjdHNcclxuICAgICAgICAgICAgICAgIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBvaW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2ludHNbal0gaW5zdGFuY2VvZiBUaW55LlBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb2ludHNbal0ueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBvaW50c1tqXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwb2ludHNbaiArIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBwb2ludHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5YID0geCAtIGxpbmVXaWR0aCA8IG1pblggPyB4IC0gbGluZVdpZHRoIDogbWluWDtcclxuICAgICAgICAgICAgICAgICAgICBtYXhYID0geCArIGxpbmVXaWR0aCA+IG1heFggPyB4ICsgbGluZVdpZHRoIDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluWSA9IHkgLSBsaW5lV2lkdGggPCBtaW5ZID8geSAtIGxpbmVXaWR0aCA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBsaW5lV2lkdGggPiBtYXhZID8geSArIGxpbmVXaWR0aCA6IG1heFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pblggPSAwO1xyXG4gICAgICAgIG1heFggPSAwO1xyXG4gICAgICAgIG1pblkgPSAwO1xyXG4gICAgICAgIG1heFkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYWRkaW5nID0gdGhpcy5ib3VuZHNQYWRkaW5nO1xyXG5cclxuICAgIHRoaXMuX2xvY2FsQm91bmRzLnggPSBtaW5YIC0gcGFkZGluZztcclxuICAgIHRoaXMuX2xvY2FsQm91bmRzLndpZHRoID0gbWF4WCAtIG1pblggKyBwYWRkaW5nICogMjtcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy55ID0gbWluWSAtIHBhZGRpbmc7XHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWSArIHBhZGRpbmcgKiAyO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSkge1xyXG4gICAgICAgIHZhciBjYW52YXNCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIoYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcclxuICAgICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKGNhbnZhc0J1ZmZlci5jYW52YXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBuZXcgVGlueS5TcHJpdGUodGV4dHVyZSk7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlciA9IGNhbnZhc0J1ZmZlcjtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5yZXNpemUoYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXZlcmFnZSB0aGUgYW5jaG9yIHRvIGFjY291bnQgZm9yIHRoZSBvZmZzZXQgb2YgdGhlIGVsZW1lbnRcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueCA9IC0oYm91bmRzLnggLyBib3VuZHMud2lkdGgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLShib3VuZHMueSAvIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dC5zYXZlKCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQudHJhbnNsYXRlKC1ib3VuZHMueCwgLWJvdW5kcy55KTtcclxuXHJcbiAgICAvLyBtYWtlIHN1cmUgd2Ugc2V0IHRoZSBhbHBoYSBvZiB0aGUgZ3JhcGhpY3MgdG8gMSBmb3IgdGhlIHJlbmRlci4uXHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgIC8vIG5vdyByZW5kZXIgdGhlIGdyYXBoaWMuLlxyXG4gICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLCB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFscGhhID0gdGhpcy5hbHBoYTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRleHR1cmUgc2l6ZSBiYXNlZCBvbiBjYW52YXMgc2l6ZVxyXG4gKlxyXG4gKiBAbWV0aG9kIHVwZGF0ZUNhY2hlZFNwcml0ZVRleHR1cmVcclxuICogQHByaXZhdGVcclxuICovXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnVwZGF0ZUNhY2hlZFNwcml0ZVRleHR1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY2FjaGVkU3ByaXRlID0gdGhpcy5fY2FjaGVkU3ByaXRlO1xyXG4gICAgdmFyIHRleHR1cmUgPSBjYWNoZWRTcHJpdGUudGV4dHVyZTtcclxuICAgIHZhciBjYW52YXMgPSBjYWNoZWRTcHJpdGUuYnVmZmVyLmNhbnZhcztcclxuXHJcbiAgICB0ZXh0dXJlLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgdGV4dHVyZS5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgdGV4dHVyZS5jcm9wLndpZHRoID0gdGV4dHVyZS5mcmFtZS53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRleHR1cmUuY3JvcC5oZWlnaHQgPSB0ZXh0dXJlLmZyYW1lLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgY2FjaGVkU3ByaXRlLl93aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGNhY2hlZFNwcml0ZS5faGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZXN0cm95cyBhIHByZXZpb3VzIGNhY2hlZCBzcHJpdGUuXHJcbiAqXHJcbiAqIEBtZXRob2QgZGVzdHJveUNhY2hlZFNwcml0ZVxyXG4gKi9cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZGVzdHJveUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1NoYXBlID0gZnVuY3Rpb24gKHNoYXBlKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIC8vIGNoZWNrIGN1cnJlbnQgcGF0aCFcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoIDw9IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljc0RhdGEucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudFBhdGggPSBudWxsO1xyXG5cclxuICAgIC8vICBIYW5kbGUgbWl4ZWQtdHlwZSBwb2x5Z29uc1xyXG4gICAgaWYgKHNoYXBlIGluc3RhbmNlb2YgVGlueS5Qb2x5Z29uKSB7XHJcbiAgICAgICAgc2hhcGUuZmxhdHRlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYXRhID0gbmV3IFRpbnkuR3JhcGhpY3NEYXRhKFxyXG4gICAgICAgIHRoaXMubGluZVdpZHRoLFxyXG4gICAgICAgIHRoaXMubGluZUNvbG9yLFxyXG4gICAgICAgIHRoaXMubGluZUFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbENvbG9yLFxyXG4gICAgICAgIHRoaXMuZmlsbEFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbGluZyxcclxuICAgICAgICBzaGFwZVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmdyYXBoaWNzRGF0YS5wdXNoKGRhdGEpO1xyXG5cclxuICAgIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5QT0xZKSB7XHJcbiAgICAgICAgZGF0YS5zaGFwZS5jbG9zZWQgPSB0aGlzLmZpbGxpbmc7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGF0aCA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5HcmFwaGljcy5wcm90b3R5cGUsIFwiY2FjaGVBc0JpdG1hcFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVBc0JpdG1hcDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJUaW55Lk9iamVjdDJEID0gZnVuY3Rpb24gKCkge1xyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICB0aGlzLl9ib3VuZHMgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX21hc2sgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5PYmplY3QyRDtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgJ2lucHV0RW5hYmxlZCcsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgIHJldHVybiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmVuYWJsZWQpXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuLy8gICAgICAgICBpZiAodmFsdWUpIHtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQgPT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB7ZW5hYmxlZDogdHJ1ZSwgcGFyZW50OiB0aGlzfVxyXG4vLyAgICAgICAgICAgICAgICAgVGlueS5FdmVudFRhcmdldC5taXhpbih0aGlzLmlucHV0KVxyXG4vLyAgICAgICAgICAgICB9IGVsc2VcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZW5hYmxlZCA9IHRydWVcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmlucHV0ICE9PSBudWxsICYmICh0aGlzLmlucHV0LmVuYWJsZWQgPSBmYWxzZSlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy5nZXRMb2NhbEJvdW5kcygpLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDtcclxuXHJcbiAgICAgICAgaWYgKHdpZHRoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gd2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS55ICogdGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGhlaWdodCAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIGhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnkgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCBcIm1hc2tcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hc2s7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHRoaXMuX21hc2suaXNNYXNrID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX21hc2sgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHRoaXMuX21hc2suaXNNYXNrID0gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGkgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG5cclxuICAgIFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFzayA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuaW5wdXQpIHRoaXMuaW5wdXQuc3lzdGVtLnJlbW92ZSh0aGlzKTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkQ2hpbGRBdChjaGlsZCwgdGhpcy5jaGlsZHJlbi5sZW5ndGgpO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuYWRkQ2hpbGRBdCA9IGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDw9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xyXG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdhbWUpIGNoaWxkLmdhbWUgPSB0aGlzLmdhbWU7XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBjaGlsZCArIFwiYWRkQ2hpbGRBdDogVGhlIGluZGV4IFwiICsgaW5kZXggKyBcIiBzdXBwbGllZCBpcyBvdXQgb2YgYm91bmRzIFwiICsgdGhpcy5jaGlsZHJlbi5sZW5ndGhcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuc3dhcENoaWxkcmVuID0gZnVuY3Rpb24gKGNoaWxkLCBjaGlsZDIpIHtcclxuICAgIGlmIChjaGlsZCA9PT0gY2hpbGQyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbmRleDEgPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xyXG4gICAgdmFyIGluZGV4MiA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZDIpO1xyXG5cclxuICAgIGlmIChpbmRleDEgPCAwIHx8IGluZGV4MiA8IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzd2FwQ2hpbGRyZW46IEJvdGggdGhlIHN1cHBsaWVkIE9iamVjdHMgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXIuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hpbGRyZW5baW5kZXgxXSA9IGNoaWxkMjtcclxuICAgIHRoaXMuY2hpbGRyZW5baW5kZXgyXSA9IGNoaWxkO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3VwcGxpZWQgT2JqZWN0IG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuc2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3VwcGxpZWQgaW5kZXggaXMgb3V0IG9mIGJvdW5kc1wiKTtcclxuICAgIH1cclxuICAgIHZhciBjdXJyZW50SW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoY3VycmVudEluZGV4LCAxKTsgLy9yZW1vdmUgZnJvbSBvbGQgcG9zaXRpb25cclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7IC8vYWRkIGF0IG5ldyBwb3NpdGlvblxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Q2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgXCJnZXRDaGlsZEF0OiBTdXBwbGllZCBpbmRleCBcIiArXHJcbiAgICAgICAgICAgICAgICBpbmRleCArXHJcbiAgICAgICAgICAgICAgICBcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdCwgb3IgdGhlIHN1cHBsaWVkIE9iamVjdCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlclwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2luZGV4XTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHJldHVybjtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVDaGlsZEF0KGluZGV4KTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbW92ZUNoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIHZhciBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRBdChpbmRleCk7XHJcbiAgICBjaGlsZC5wYXJlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gY2hpbGQ7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKSByZXR1cm47XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBwZXJmb3JtYW5jZSBpbmNyZWFzZSB0byBhdm9pZCB1c2luZyBjYWxsLi4gKDEweCBmYXN0ZXIpXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmRpc3BsYXlPYmplY3RDb250YWluZXJVcGRhdGVUcmFuc2Zvcm0gPSBUaW55Lk9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG4gICAgaWYgKHRoaXMuX2NhY2hlZFNwcml0ZSkgcmV0dXJuIHRoaXMuX2NhY2hlZFNwcml0ZS5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICAvLyBUT0RPIHRoZSBib3VuZHMgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsY3VsYXRlZCB0aGlzIHJlbmRlciBzZXNzaW9uIHNvIHJldHVybiB3aGF0IHdlIGhhdmVcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBjaGlsZEJvdW5kcztcclxuICAgIHZhciBjaGlsZE1heFg7XHJcbiAgICB2YXIgY2hpbGRNYXhZO1xyXG5cclxuICAgIHZhciBjaGlsZFZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcclxuXHJcbiAgICAgICAgaWYgKCFjaGlsZC52aXNpYmxlKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgY2hpbGRWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY2hpbGRCb3VuZHMgPSB0aGlzLmNoaWxkcmVuW2ldLmdldEJvdW5kcygpO1xyXG5cclxuICAgICAgICBtaW5YID0gbWluWCA8IGNoaWxkQm91bmRzLnggPyBtaW5YIDogY2hpbGRCb3VuZHMueDtcclxuICAgICAgICBtaW5ZID0gbWluWSA8IGNoaWxkQm91bmRzLnkgPyBtaW5ZIDogY2hpbGRCb3VuZHMueTtcclxuXHJcbiAgICAgICAgY2hpbGRNYXhYID0gY2hpbGRCb3VuZHMud2lkdGggKyBjaGlsZEJvdW5kcy54O1xyXG4gICAgICAgIGNoaWxkTWF4WSA9IGNoaWxkQm91bmRzLmhlaWdodCArIGNoaWxkQm91bmRzLnk7XHJcblxyXG4gICAgICAgIG1heFggPSBtYXhYID4gY2hpbGRNYXhYID8gbWF4WCA6IGNoaWxkTWF4WDtcclxuICAgICAgICBtYXhZID0gbWF4WSA+IGNoaWxkTWF4WSA/IG1heFkgOiBjaGlsZE1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjaGlsZFZpc2libGUpIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gVE9ETzogc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIC8vdGhpcy5fY3VycmVudEJvdW5kcyA9IGJvdW5kcztcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0TG9jYWxCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbWF0cml4Q2FjaGUgPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBUaW55LmlkZW50aXR5TWF0cml4O1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xyXG5cclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBtYXRyaXhDYWNoZTtcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNhY2hlZFNwcml0ZShyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlNjZW5lID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbn07XHJcblxyXG5UaW55LlNjZW5lLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LlNjZW5lLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuU2NlbmU7XHJcblxyXG5UaW55LlNjZW5lLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcbn07XHJcbiIsIlRpbnkuU3ByaXRlID0gZnVuY3Rpb24gKHRleHR1cmUsIGtleSkge1xyXG4gICAgVGlueS5PYmplY3QyRC5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYW5jaG9yID0gbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB0aGlzLnNldFRleHR1cmUodGV4dHVyZSwga2V5LCBmYWxzZSk7XHJcblxyXG4gICAgdGhpcy5fd2lkdGggPSAwO1xyXG5cclxuICAgIHRoaXMuX2hlaWdodCA9IDA7XHJcblxyXG4gICAgdGhpcy5fZnJhbWUgPSAwO1xyXG5cclxuICAgIHRoaXMudGludCA9ICcjZmZmZmZmJztcclxuXHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9ICdzb3VyY2Utb3Zlcic7XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dHVyZS5oYXNMb2FkZWQpIHtcclxuICAgICAgICB0aGlzLm9uVGV4dHVyZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuT2JqZWN0MkQucHJvdG90eXBlKTtcclxuVGlueS5TcHJpdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5TcHJpdGU7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnZnJhbWVOYW1lJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZS5mcmFtZS5uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUuZnJhbWUubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMudGV4dHVyZS5rZXkgKyAnLicgKyB2YWx1ZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnZnJhbWUnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5sYXN0RnJhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lID4gdGhpcy50ZXh0dXJlLmxhc3RGcmFtZSkgdGhpcy5fZnJhbWUgPSAwO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9mcmFtZSA8IDApIHRoaXMuX2ZyYW1lID0gdGhpcy50ZXh0dXJlLmxhc3RGcmFtZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuQ2FjaGUudGV4dHVyZVt0aGlzLnRleHR1cmUua2V5ICsgJy4nICsgdGhpcy5fZnJhbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdoZWlnaHQnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS55ICogdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSwga2V5LCB1cGRhdGVEaW1lbnNpb24pIHtcclxuICAgIGlmICh0eXBlb2YgdGV4dHVyZSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHZhciBpbWFnZVBhdGggPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSBpbWFnZVBhdGggKyAnLicgKyBrZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2ltYWdlUGF0aF07XHJcblxyXG4gICAgICAgIGlmICghdGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZVBhdGgpO1xyXG4gICAgICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoJ0NhY2hlIEVycm9yOiBpbWFnZSAnICsgaW1hZ2VQYXRoICsgJyBkb2VzYHQgZm91bmQgaW4gY2FjaGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dHVyZSA9PT0gdGV4dHVyZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICB0aGlzLmNhY2hlZFRpbnQgPSAnI2ZmZmZmZic7XHJcblxyXG4gICAgaWYgKHVwZGF0ZURpbWVuc2lvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUub25UZXh0dXJlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gc28gaWYgX3dpZHRoIGlzIDAgdGhlbiB3aWR0aCB3YXMgbm90IHNldC4uXHJcbiAgICBpZiAodGhpcy5fd2lkdGgpIHRoaXMuc2NhbGUueCA9IHRoaXMuX3dpZHRoIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgaWYgKHRoaXMuX2hlaWdodCkgdGhpcy5zY2FsZS55ID0gdGhpcy5faGVpZ2h0IC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24gKGRlbGF5LCB5b3lvKSB7XHJcbiAgICB0aGlzLnJldmVyc2UgPSBmYWxzZTtcclxuICAgIHRoaXMueW95byA9IHlveW87XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dHVyZS5sYXN0RnJhbWUpIHtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IHx8IHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDA7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmdhbWUudGltZXIubG9vcChcclxuICAgICAgICAgICAgICAgIGRlbGF5LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlveW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhbWUgPT09IDApIHRoaXMucmV2ZXJzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZyYW1lID09PSB0aGlzLnRleHR1cmUubGFzdEZyYW1lKSB0aGlzLnJldmVyc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZSArPSB0aGlzLnJldmVyc2UgPyAtMSA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZGVsYXkgPSBkZWxheSB8fCB0aGlzLnRleHR1cmUuZnJhbWUuZHVyYXRpb24gfHwgMTAwO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZGVsYXkgPSBkZWxheTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgdmFyIHdpZHRoID0gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoIC8gdGhpcy50ZXh0dXJlLnJlc29sdXRpb247XHJcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodCAvIHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEgLSB0aGlzLmFuY2hvci54KTtcclxuICAgIHZhciB3MSA9IHdpZHRoICogLXRoaXMuYW5jaG9yLng7XHJcblxyXG4gICAgdmFyIGgwID0gaGVpZ2h0ICogKDEgLSB0aGlzLmFuY2hvci55KTtcclxuICAgIHZhciBoMSA9IGhlaWdodCAqIC10aGlzLmFuY2hvci55O1xyXG5cclxuICAgIHZhciB3b3JsZFRyYW5zZm9ybSA9IG1hdHJpeCB8fCB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciBhID0gd29ybGRUcmFuc2Zvcm0uYTtcclxuICAgIHZhciBiID0gd29ybGRUcmFuc2Zvcm0uYjtcclxuICAgIHZhciBjID0gd29ybGRUcmFuc2Zvcm0uYztcclxuICAgIHZhciBkID0gd29ybGRUcmFuc2Zvcm0uZDtcclxuICAgIHZhciB0eCA9IHdvcmxkVHJhbnNmb3JtLnR4O1xyXG4gICAgdmFyIHR5ID0gd29ybGRUcmFuc2Zvcm0udHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICBpZiAoYiA9PT0gMCAmJiBjID09PSAwKSB7XHJcbiAgICAgICAgLy8gLy8gc2NhbGUgbWF5IGJlIG5lZ2F0aXZlIVxyXG4gICAgICAgIC8vIGlmIChhIDwgMCkgYSAqPSAtMTtcclxuICAgICAgICAvLyBpZiAoZCA8IDApIGQgKj0gLTE7XHJcblxyXG4gICAgICAgIC8vIC8vIHRoaXMgbWVhbnMgdGhlcmUgaXMgbm8gcm90YXRpb24gZ29pbmcgb24gcmlnaHQ/IFJJR0hUP1xyXG4gICAgICAgIC8vIC8vIGlmIHRoYXRzIHRoZSBjYXNlIHRoZW4gd2UgY2FuIGF2b2lkIGNoZWNraW5nIHRoZSBib3VuZCB2YWx1ZXMhIHlheVxyXG4gICAgICAgIC8vIG1pblggPSBhICogdzEgKyB0eDtcclxuICAgICAgICAvLyBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgLy8gbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgIC8vIG1heFkgPSBkICogaDAgKyB0eTtcclxuXHJcbiAgICAgICAgaWYgKGEgPCAwKSB7XHJcbiAgICAgICAgICAgIG1pblggPSBhICogdzAgKyB0eDtcclxuICAgICAgICAgICAgbWF4WCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1pblggPSBhICogdzEgKyB0eDtcclxuICAgICAgICAgICAgbWF4WCA9IGEgKiB3MCArIHR4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGQgPCAwKSB7XHJcbiAgICAgICAgICAgIG1pblkgPSBkICogaDAgKyB0eTtcclxuICAgICAgICAgICAgbWF4WSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1pblkgPSBkICogaDEgKyB0eTtcclxuICAgICAgICAgICAgbWF4WSA9IGQgKiBoMCArIHR5O1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHgxID0gYSAqIHcxICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgICAgIHZhciB5MiA9IGQgKiBoMSArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHg0ID0gYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICAgICAgdmFyIHk0ID0gZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgICAgIG1pblggPSB4MSA8IG1pblggPyB4MSA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDMgPCBtaW5YID8geDMgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgICAgIG1pblkgPSB5MSA8IG1pblkgPyB5MSA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHkyIDwgbWluWSA/IHkyIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTMgPCBtaW5ZID8geTMgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgICAgIG1heFggPSB4MSA+IG1heFggPyB4MSA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHgyID4gbWF4WCA/IHgyIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4NCA+IG1heFggPyB4NCA6IG1heFg7XHJcblxyXG4gICAgICAgIG1heFkgPSB5MSA+IG1heFkgPyB5MSA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTMgPiBtYXhZID8geTMgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuXHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgLy8gSWYgdGhlIHNwcml0ZSBpcyBub3QgdmlzaWJsZSBvciB0aGUgYWxwaGEgaXMgMCB0aGVuIG5vIG5lZWQgdG8gcmVuZGVyIHRoaXMgZWxlbWVudFxyXG4gICAgaWYgKFxyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHxcclxuICAgICAgICB0aGlzLmFscGhhID09PSAwIHx8XHJcbiAgICAgICAgdGhpcy5yZW5kZXJhYmxlID09PSBmYWxzZSB8fFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIDw9IDAgfHxcclxuICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPD0gMFxyXG4gICAgKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSkge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBJZ25vcmUgbnVsbCBzb3VyY2VzXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlLnZhbGlkKSB7XHJcbiAgICAgICAgdmFyIHJlc29sdXRpb24gPSB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiAvIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIHRleHR1cmUgaXMgdHJpbW1lZCB3ZSBvZmZzZXQgYnkgdGhlIHRyaW0geC95LCBvdGhlcndpc2Ugd2UgdXNlIHRoZSBmcmFtZSBkaW1lbnNpb25zXHJcbiAgICAgICAgdmFyIGR4ID0gdGhpcy50ZXh0dXJlLnRyaW1cclxuICAgICAgICAgICAgPyB0aGlzLnRleHR1cmUudHJpbS54IC0gdGhpcy5hbmNob3IueCAqIHRoaXMudGV4dHVyZS50cmltLndpZHRoXHJcbiAgICAgICAgICAgIDogdGhpcy5hbmNob3IueCAqIC10aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICAgICAgdmFyIGR5ID0gdGhpcy50ZXh0dXJlLnRyaW1cclxuICAgICAgICAgICAgPyB0aGlzLnRleHR1cmUudHJpbS55IC0gdGhpcy5hbmNob3IueSAqIHRoaXMudGV4dHVyZS50cmltLmhlaWdodFxyXG4gICAgICAgICAgICA6IHRoaXMuYW5jaG9yLnkgKiAtdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gIEFsbG93IGZvciBwaXhlbCByb3VuZGluZ1xyXG4gICAgICAgIGlmIChyZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzKSB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmQsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pIHwgMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBkeCA9IGR4IHwgMDtcclxuICAgICAgICAgICAgZHkgPSBkeSB8IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50aW50ICE9PSAnI2ZmZmZmZicpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkVGludCAhPT0gdGhpcy50aW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZFRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbnRlZFRleHR1cmUgPSBUaW55LkNhbnZhc1RpbnRlci5nZXRUaW50ZWRUZXh0dXJlKHRoaXMsIHRoaXMudGludCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbnRlZFRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLnksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIGR4IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCAvIHJlc29sdXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT1ZFUldSSVRFXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5UZXh0ID0gZnVuY3Rpb24gKHRleHQsIHN0eWxlKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLmNhbGwodGhpcywgVGlueS5UZXh0dXJlLmZyb21DYW52YXModGhpcy5jYW52YXMpKTtcclxuXHJcbiAgICB0aGlzLnNldFRleHQodGV4dCk7XHJcbiAgICB0aGlzLnNldFN0eWxlKHN0eWxlKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuU3ByaXRlLnByb3RvdHlwZSk7XHJcblRpbnkuVGV4dC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlRleHQ7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGV4dC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS55ICogdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnNldFN0eWxlID0gZnVuY3Rpb24gKHN0eWxlKSB7XHJcbiAgICBzdHlsZSA9IHN0eWxlIHx8IHt9O1xyXG4gICAgc3R5bGUuZm9udCA9IHN0eWxlLmZvbnQgfHwgXCJib2xkIDIwcHQgQXJpYWxcIjtcclxuICAgIHN0eWxlLmZpbGwgPSBzdHlsZS5maWxsIHx8IFwiYmxhY2tcIjtcclxuICAgIHN0eWxlLmFsaWduID0gc3R5bGUuYWxpZ24gfHwgXCJsZWZ0XCI7XHJcbiAgICBzdHlsZS5zdHJva2UgPSBzdHlsZS5zdHJva2UgfHwgXCJibGFja1wiO1xyXG4gICAgc3R5bGUuc3Ryb2tlVGhpY2tuZXNzID0gc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIHx8IDA7XHJcbiAgICBzdHlsZS53b3JkV3JhcCA9IHN0eWxlLndvcmRXcmFwIHx8IGZhbHNlO1xyXG4gICAgc3R5bGUubGluZVNwYWNpbmcgPSBzdHlsZS5saW5lU3BhY2luZyB8fCAwO1xyXG4gICAgc3R5bGUud29yZFdyYXBXaWR0aCA9IHN0eWxlLndvcmRXcmFwV2lkdGggIT09IHVuZGVmaW5lZCA/IHN0eWxlLndvcmRXcmFwV2lkdGggOiAxMDA7XHJcblxyXG4gICAgc3R5bGUuZHJvcFNoYWRvdyA9IHN0eWxlLmRyb3BTaGFkb3cgfHwgZmFsc2U7XHJcbiAgICBzdHlsZS5kcm9wU2hhZG93QW5nbGUgPSBzdHlsZS5kcm9wU2hhZG93QW5nbGUgIT09IHVuZGVmaW5lZCA/IHN0eWxlLmRyb3BTaGFkb3dBbmdsZSA6IE1hdGguUEkgLyA2O1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlID0gc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlICE9PSB1bmRlZmluZWQgPyBzdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UgOiA0O1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0NvbG9yID0gc3R5bGUuZHJvcFNoYWRvd0NvbG9yIHx8IFwiYmxhY2tcIjtcclxuXHJcbiAgICB0aGlzLnN0eWxlID0gc3R5bGU7XHJcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0LnRvU3RyaW5nKCkgfHwgXCIgXCI7XHJcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUudXBkYXRlVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5zdHlsZS5mb250O1xyXG5cclxuICAgIHZhciBvdXRwdXRUZXh0ID0gdGhpcy50ZXh0O1xyXG5cclxuICAgIC8vIHdvcmQgd3JhcFxyXG4gICAgLy8gcHJlc2VydmUgb3JpZ2luYWwgdGV4dFxyXG4gICAgaWYgKHRoaXMuc3R5bGUud29yZFdyYXApIG91dHB1dFRleHQgPSB0aGlzLndvcmRXcmFwKHRoaXMudGV4dCk7XHJcblxyXG4gICAgLy9zcGxpdCB0ZXh0IGludG8gbGluZXNcclxuICAgIHZhciBsaW5lcyA9IG91dHB1dFRleHQuc3BsaXQoLyg/OlxcclxcbnxcXHJ8XFxuKS8pO1xyXG5cclxuICAgIC8vY2FsY3VsYXRlIHRleHQgd2lkdGhcclxuICAgIHZhciBsaW5lV2lkdGhzID0gW107XHJcbiAgICB2YXIgbWF4TGluZVdpZHRoID0gMDtcclxuICAgIHZhciBmb250UHJvcGVydGllcyA9IHRoaXMuZGV0ZXJtaW5lRm9udFByb3BlcnRpZXModGhpcy5zdHlsZS5mb250KTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbGluZVdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KGxpbmVzW2ldKS53aWR0aDtcclxuICAgICAgICBsaW5lV2lkdGhzW2ldID0gbGluZVdpZHRoO1xyXG4gICAgICAgIG1heExpbmVXaWR0aCA9IE1hdGgubWF4KG1heExpbmVXaWR0aCwgbGluZVdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgd2lkdGggPSBtYXhMaW5lV2lkdGggKyB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcztcclxuICAgIGlmICh0aGlzLnN0eWxlLmRyb3BTaGFkb3cpIHdpZHRoICs9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gKHdpZHRoICsgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCkgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgLy9jYWxjdWxhdGUgdGV4dCBoZWlnaHRcclxuICAgIHZhciBsaW5lSGVpZ2h0ID0gZm9udFByb3BlcnRpZXMuZm9udFNpemUgKyB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyArIHRoaXMuc3R5bGUubGluZVNwYWNpbmc7XHJcblxyXG4gICAgdmFyIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcy5sZW5ndGg7XHJcbiAgICBpZiAodGhpcy5zdHlsZS5kcm9wU2hhZG93KSBoZWlnaHQgKz0gdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gKGhlaWdodCAtIHRoaXMuc3R5bGUubGluZVNwYWNpbmcpICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnJlc29sdXRpb24sIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5pc0NvY29vbkpTKSB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIHVzZWQgZm9yIGRlYnVnZ2luZy4uXHJcbiAgICAvL3RoaXMuY29udGV4dC5maWxsU3R5bGUgPVwiI0ZGMDAwMFwiXHJcbiAgICAvL3RoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5zdHlsZS5mb250O1xyXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5zdHlsZS5zdHJva2U7XHJcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3M7XHJcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XHJcbiAgICB0aGlzLmNvbnRleHQubWl0ZXJMaW1pdCA9IDI7XHJcblxyXG4gICAgLy90aGlzLmNvbnRleHQubGluZUpvaW4gPSAncm91bmQnO1xyXG5cclxuICAgIHZhciBsaW5lUG9zaXRpb25YO1xyXG4gICAgdmFyIGxpbmVQb3NpdGlvblk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3R5bGUuZHJvcFNoYWRvdykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dDb2xvcjtcclxuXHJcbiAgICAgICAgdmFyIHhTaGFkb3dPZmZzZXQgPSBNYXRoLnNpbih0aGlzLnN0eWxlLmRyb3BTaGFkb3dBbmdsZSkgKiB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuICAgICAgICB2YXIgeVNoYWRvd09mZnNldCA9IE1hdGguY29zKHRoaXMuc3R5bGUuZHJvcFNoYWRvd0FuZ2xlKSAqIHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWCA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMjtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWSA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMiArIGkgKiBsaW5lSGVpZ2h0ICsgZm9udFByb3BlcnRpZXMuYXNjZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3R5bGUuYWxpZ24gPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSBtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3R5bGUuYWxpZ24gPT09IFwiY2VudGVyXCIpIHtcclxuICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gKG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV0pIC8gMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3R5bGUuZmlsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YICsgeFNoYWRvd09mZnNldCwgbGluZVBvc2l0aW9uWSArIHlTaGFkb3dPZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgaWYoZHJvcFNoYWRvdylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9zZXQgY2FudmFzIHRleHQgc3R5bGVzXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5zdHlsZS5maWxsO1xyXG5cclxuICAgIC8vZHJhdyBsaW5lcyBsaW5lIGJ5IGxpbmVcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxpbmVQb3NpdGlvblggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDI7XHJcbiAgICAgICAgbGluZVBvc2l0aW9uWSA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMiArIGkgKiBsaW5lSGVpZ2h0ICsgZm9udFByb3BlcnRpZXMuYXNjZW50O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdHlsZS5hbGlnbiA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gbWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3R5bGUuYWxpZ24gPT09IFwiY2VudGVyXCIpIHtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSAobWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXSkgLyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGUuc3Ryb2tlICYmIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YLCBsaW5lUG9zaXRpb25ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlLmZpbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YLCBsaW5lUG9zaXRpb25ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICBpZihkcm9wU2hhZG93KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlVGV4dHVyZSgpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy50ZXh0dXJlLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLnRleHR1cmUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG4gICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCA9IHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLmRpcnR5IHx8IHRoaXMucmVzb2x1dGlvbiAhPT0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMsIHJlbmRlclNlc3Npb24pO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5kZXRlcm1pbmVGb250UHJvcGVydGllcyA9IGZ1bmN0aW9uIChmb250U3R5bGUpIHtcclxuICAgIHZhciBwcm9wZXJ0aWVzID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGVbZm9udFN0eWxlXTtcclxuXHJcbiAgICBpZiAoIXByb3BlcnRpZXMpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0ge307XHJcblxyXG4gICAgICAgIHZhciBjYW52YXMgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXM7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDb250ZXh0O1xyXG5cclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250U3R5bGU7XHJcblxyXG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguY2VpbChjb250ZXh0Lm1lYXN1cmVUZXh0KFwifE3DiXFcIikud2lkdGgpO1xyXG4gICAgICAgIHZhciBiYXNlbGluZSA9IE1hdGguY2VpbChjb250ZXh0Lm1lYXN1cmVUZXh0KFwifE3DiXFcIikud2lkdGgpO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSAyICogYmFzZWxpbmU7XHJcblxyXG4gICAgICAgIGJhc2VsaW5lID0gKGJhc2VsaW5lICogMS40KSB8IDA7XHJcblxyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjZjAwXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0eWxlO1xyXG5cclxuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjMDAwXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcInxNw4lxXCIsIDAsIGJhc2VsaW5lKTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlZGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XHJcbiAgICAgICAgdmFyIHBpeGVscyA9IGltYWdlZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGxpbmUgPSB3aWR0aCAqIDQ7XHJcblxyXG4gICAgICAgIHZhciBpLCBqO1xyXG5cclxuICAgICAgICB2YXIgaWR4ID0gMDtcclxuICAgICAgICB2YXIgc3RvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBhc2NlbnQuIHNjYW4gZnJvbSB0b3AgdG8gYm90dG9tIHVudGlsIHdlIGZpbmQgYSBub24gcmVkIHBpeGVsXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJhc2VsaW5lOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxpbmU7IGogKz0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlZGF0YVtpZHggKyBqXSAhPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdG9wKSB7XHJcbiAgICAgICAgICAgICAgICBpZHggKz0gbGluZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmFzY2VudCA9IGJhc2VsaW5lIC0gaTtcclxuXHJcbiAgICAgICAgaWR4ID0gcGl4ZWxzIC0gbGluZTtcclxuICAgICAgICBzdG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGRlc2NlbnQuIHNjYW4gZnJvbSBib3R0b20gdG8gdG9wIHVudGlsIHdlIGZpbmQgYSBub24gcmVkIHBpeGVsXHJcbiAgICAgICAgZm9yIChpID0gaGVpZ2h0OyBpID4gYmFzZWxpbmU7IGktLSkge1xyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGluZTsgaiArPSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VkYXRhW2lkeCArIGpdICE9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXN0b3ApIHtcclxuICAgICAgICAgICAgICAgIGlkeCAtPSBsaW5lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3BlcnRpZXMuZGVzY2VudCA9IGkgLSBiYXNlbGluZTtcclxuICAgICAgICAvL1RPRE8gbWlnaHQgbmVlZCBhIHR3ZWFrLiBraW5kIG9mIGEgdGVtcCBmaXghXHJcbiAgICAgICAgcHJvcGVydGllcy5kZXNjZW50ICs9IDY7XHJcbiAgICAgICAgcHJvcGVydGllcy5mb250U2l6ZSA9IHByb3BlcnRpZXMuYXNjZW50ICsgcHJvcGVydGllcy5kZXNjZW50O1xyXG5cclxuICAgICAgICBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZVtmb250U3R5bGVdID0gcHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUud29yZFdyYXAgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgLy8gR3JlZWR5IHdyYXBwaW5nIGFsZ29yaXRobSB0aGF0IHdpbGwgd3JhcCB3b3JkcyBhcyB0aGUgbGluZSBncm93cyBsb25nZXJcclxuICAgIC8vIHRoYW4gaXRzIGhvcml6b250YWwgYm91bmRzLlxyXG4gICAgdmFyIHJlc3VsdCA9IFwiXCI7XHJcbiAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBzcGFjZUxlZnQgPSB0aGlzLnN0eWxlLndvcmRXcmFwV2lkdGg7XHJcbiAgICAgICAgdmFyIHdvcmRzID0gbGluZXNbaV0uc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgd29yZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIHdvcmRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh3b3Jkc1tqXSkud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB3b3JkV2lkdGhXaXRoU3BhY2UgPSB3b3JkV2lkdGggKyB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQoXCIgXCIpLndpZHRoO1xyXG4gICAgICAgICAgICBpZiAoaiA9PT0gMCB8fCB3b3JkV2lkdGhXaXRoU3BhY2UgPiBzcGFjZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNraXAgcHJpbnRpbmcgdGhlIG5ld2xpbmUgaWYgaXQncyB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgbGluZSB0aGF0IGlzXHJcbiAgICAgICAgICAgICAgICAvLyBncmVhdGVyIHRoYW4gdGhlIHdvcmQgd3JhcCB3aWR0aC5cclxuICAgICAgICAgICAgICAgIGlmIChqID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHdvcmRzW2pdO1xyXG4gICAgICAgICAgICAgICAgc3BhY2VMZWZ0ID0gdGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoIC0gd29yZFdpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VMZWZ0IC09IHdvcmRXaWR0aFdpdGhTcGFjZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiBcIiArIHdvcmRzW2pdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaSA8IGxpbmVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgaWYgKHRoaXMuZGlydHkpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMuY2FsbCh0aGlzLCBtYXRyaXgpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gbWFrZSBzdXJlIHRvIHJlc2V0IHRoZSB0aGUgY29udGV4dCBhbmQgY2FudmFzLi4gZG9udCB3YW50IHRoaXMgaGFuZ2luZyBhcm91bmQgaW4gbWVtb3J5IVxyXG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcclxuICAgIHRoaXMuY2FudmFzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnRleHR1cmUuZGVzdHJveSgpO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZSA9IHt9O1xyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDb250ZXh0ID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuIiwiVGlueS5DYW52YXNNYXNrTWFuYWdlciA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVGlueS5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkNhbnZhc01hc2tNYW5hZ2VyO1xyXG5cclxuVGlueS5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUucHVzaE1hc2sgPSBmdW5jdGlvbiAobWFza0RhdGEsIHJlbmRlclNlc3Npb24pIHtcclxuICAgIHZhciBjb250ZXh0ID0gcmVuZGVyU2Vzc2lvbi5jb250ZXh0O1xyXG5cclxuICAgIGNvbnRleHQuc2F2ZSgpO1xyXG5cclxuICAgIHZhciBjYWNoZUFscGhhID0gbWFza0RhdGEuYWxwaGE7XHJcbiAgICB2YXIgdHJhbnNmb3JtID0gbWFza0RhdGEud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIHJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgdHJhbnNmb3JtLmEgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS5iICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLmQgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS50eCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvblxyXG4gICAgKTtcclxuXHJcbiAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzTWFzayhtYXNrRGF0YSwgY29udGV4dCk7XHJcblxyXG4gICAgY29udGV4dC5jbGlwKCk7XHJcblxyXG4gICAgbWFza0RhdGEud29ybGRBbHBoYSA9IGNhY2hlQWxwaGE7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc01hc2tNYW5hZ2VyLnByb3RvdHlwZS5wb3BNYXNrID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5yZXN0b3JlKCk7XHJcbn07XHJcbiIsIlRpbnkuQ2FudmFzUmVuZGVyZXIgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gb3B0aW9ucy5yZXNvbHV0aW9uICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMucmVzb2x1dGlvbiA6IDE7XHJcblxyXG4gICAgdGhpcy5jbGVhckJlZm9yZVJlbmRlciA9IG9wdGlvbnMuY2xlYXJCZWZvcmVSZW5kZXIgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbGVhckJlZm9yZVJlbmRlciA6IHRydWU7XHJcblxyXG4gICAgdGhpcy50cmFuc3BhcmVudCA9IG9wdGlvbnMudHJhbnNwYXJlbnQgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy50cmFuc3BhcmVudCA6IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSA9IG9wdGlvbnMuYXV0b1Jlc2l6ZSB8fCBmYWxzZTtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoID0gd2lkdGggfHwgODAwO1xyXG4gICAgLy8gdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNjAwO1xyXG5cclxuICAgIC8vIHRoaXMud2lkdGggKj0gdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdGhpcy5oZWlnaHQgKj0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGlmICghVGlueS5kZWZhdWx0UmVuZGVyZXIpIFRpbnkuZGVmYXVsdFJlbmRlcmVyID0gdGhpcztcclxuXHJcbiAgICB2YXIgdmlldyA9ICh0aGlzLmRvbUVsZW1lbnQgPSBvcHRpb25zLmRvbUVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0ID0gdmlldy5nZXRDb250ZXh0KFwiMmRcIiwgeyBhbHBoYTogdGhpcy50cmFuc3BhcmVudCB9KTtcclxuXHJcbiAgICAvLyB2aWV3LndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHZpZXcuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5yZXNpemUod2lkdGggfHwgODAwLCBoZWlnaHQgfHwgNjAwKTtcclxuXHJcbiAgICB0aGlzLnNldENsZWFyQ29sb3IoXCIjZmZmZmZmXCIpO1xyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc01hc2tNYW5hZ2VyKSB0aGlzLm1hc2tNYW5hZ2VyID0gbmV3IFRpbnkuQ2FudmFzTWFza01hbmFnZXIoKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24gPSB7XHJcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxyXG4gICAgICAgIG1hc2tNYW5hZ2VyOiB0aGlzLm1hc2tNYW5hZ2VyLFxyXG4gICAgICAgIHNtb290aFByb3BlcnR5OiBudWxsLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElmIHRydWUgUGl4aSB3aWxsIE1hdGguZmxvb3IoKSB4L3kgdmFsdWVzIHdoZW4gcmVuZGVyaW5nLCBzdG9wcGluZyBwaXhlbCBpbnRlcnBvbGF0aW9uLlxyXG4gICAgICAgICAqIEhhbmR5IGZvciBjcmlzcCBwaXhlbCBhcnQgYW5kIHNwZWVkIG9uIGxlZ2FjeSBkZXZpY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcm91bmRQaXhlbHM6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChcImltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dCkgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYgKFwid2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwid2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmIChcIm1vekltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm1vekltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJvSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJtc0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzUmVuZGVyZXI7XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvcjtcclxuXHJcbiAgICAvLyBpZiAoY29sb3IgPT09IG51bGwpIHtcclxuICAgIC8vICAgICB0aGlzLmNsZWFyQ29sb3IgPSBudWxsO1xyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvciB8fCAweDAwMDAwMDtcclxuICAgIC8vIC8vIHRoaXMuYmFja2dyb3VuZENvbG9yU3BsaXQgPSBUaW55LmhleDJyZ2IodGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgLy8gdmFyIGhleCA9IHRoaXMuY2xlYXJDb2xvci50b1N0cmluZygxNik7XHJcbiAgICAvLyBoZXggPSAnMDAwMDAwJy5zdWJzdHIoMCwgNiAtIGhleC5sZW5ndGgpICsgaGV4O1xyXG4gICAgLy8gdGhpcy5fY2xlYXJDb2xvciA9ICcjJyArIGhleDtcclxufTtcclxuXHJcbi8vIFRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldFBpeGVsQXJ0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4vLyAgICAgdmFyIGNhbnZhcyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbi8vICAgICB2YXIgdHlwZXMgPSBbICdvcHRpbWl6ZVNwZWVkJywgJy1tb3otY3Jpc3AtZWRnZXMnLCAnLW8tY3Jpc3AtZWRnZXMnLCAnLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdCcsICdvcHRpbWl6ZS1jb250cmFzdCcsICdjcmlzcC1lZGdlcycsICdwaXhlbGF0ZWQnIF07XHJcblxyXG4vLyAgICAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBjYW52YXMuc3R5bGVbJ2ltYWdlLXJlbmRlcmluZyddID0gdHlwZTtcclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIGNhbnZhcy5zdHlsZS5tc0ludGVycG9sYXRpb25Nb2RlID0gJ25lYXJlc3QtbmVpZ2hib3InO1xyXG4vLyAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzID0gdHJ1ZTtcclxuLy8gfVxyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHNjZW5lKSB7XHJcbiAgICBzY2VuZS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xyXG5cclxuICAgIGlmIChuYXZpZ2F0b3IuaXNDb2Nvb25KUyAmJiB0aGlzLmRvbUVsZW1lbnQuc2NyZWVuY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jbGVhckJlZm9yZVJlbmRlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYW5zcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNsZWFyQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyT2JqZWN0KHNjZW5lKTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAocmVtb3ZlVmlldykge1xyXG4gICAgaWYgKHR5cGVvZiByZW1vdmVWaWV3ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgcmVtb3ZlVmlldyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlbW92ZVZpZXcgJiYgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUpIHtcclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZG9tRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5tYXNrTWFuYWdlciA9IG51bGw7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24gPSBudWxsO1xyXG5cclxuICAgIGlmIChUaW55LmRlZmF1bHRSZW5kZXJlciA9PT0gdGhpcykgVGlueS5kZWZhdWx0UmVuZGVyZXIgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgIHZpZXcud2lkdGggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgdmlldy5oZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICBpZiAodGhpcy5hdXRvUmVzaXplKSB7XHJcbiAgICAgICAgdmlldy5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIHZpZXcuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2V0UGl4ZWxSYXRpbyA9IGZ1bmN0aW9uIChyZXNvbHV0aW9uKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xyXG5cclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgIHZpZXcud2lkdGggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgdmlldy5oZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlck9iamVjdCA9IGZ1bmN0aW9uIChkaXNwbGF5T2JqZWN0LCBjb250ZXh0KSB7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcy5jb250ZXh0O1xyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICBkaXNwbGF5T2JqZWN0LnJlbmRlcih0aGlzLnJlbmRlclNlc3Npb24pO1xyXG59O1xyXG4iLCJUaW55LkNhbnZhc1RpbnRlciA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSA9IGZ1bmN0aW9uIChzcHJpdGUsIGNvbG9yKSB7XHJcbiAgICB2YXIgdGV4dHVyZSA9IHNwcml0ZS50ZXh0dXJlO1xyXG5cclxuICAgIGlmICghdGV4dHVyZS5fdGludENhY2hlKSB0ZXh0dXJlLl90aW50Q2FjaGUgPSB7fTtcclxuXHJcbiAgICBpZiAodGV4dHVyZS5fdGludENhY2hlW2NvbG9yXSkgcmV0dXJuIHRleHR1cmUuX3RpbnRDYWNoZVtjb2xvcl07XHJcblxyXG4gICAgdmFyIGNhbnZhcyA9IFRpbnkuQ2FudmFzVGludGVyLmNhbnZhcyB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5cclxuICAgIFRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QodGV4dHVyZSwgY29sb3IsIGNhbnZhcyk7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzVGludGVyLmNvbnZlcnRUaW50VG9JbWFnZSkge1xyXG4gICAgICAgIC8vIGlzIHRoaXMgYmV0dGVyP1xyXG4gICAgICAgIHZhciB0aW50SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aW50SW1hZ2Uuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG5cclxuICAgICAgICAvLyB0ZXh0dXJlLl90aW50Q2FjaGVbc3RyaW5nQ29sb3JdID0gdGludEltYWdlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBUaW55LkNhbnZhc1RpbnRlci5jYW52YXMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc1RpbnRlci5jYWNoZVRpbnQpIHRleHR1cmUuX3RpbnRDYWNoZVtjb2xvcl0gPSBjYW52YXM7XHJcblxyXG4gICAgcmV0dXJuIGNhbnZhcztcclxufTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoTXVsdGlwbHkgPSBmdW5jdGlvbiAodGV4dHVyZSwgY29sb3IsIGNhbnZhcykge1xyXG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgIHZhciBjcm9wID0gdGV4dHVyZS5jcm9wO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNyb3Aud2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gY3JvcC5oZWlnaHQ7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwibXVsdGlwbHlcIjtcclxuXHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0ZXh0dXJlLnNvdXJjZSwgY3JvcC54LCBjcm9wLnksIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0LCAwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLWF0b3BcIjtcclxuXHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0ZXh0dXJlLnNvdXJjZSwgY3JvcC54LCBjcm9wLnksIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0LCAwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci50aW50V2l0aFBlclBpeGVsID0gZnVuY3Rpb24gKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpIHtcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICB2YXIgY3JvcCA9IHRleHR1cmUuY3JvcDtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjcm9wLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGNyb3AuaGVpZ2h0O1xyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJjb3B5XCI7XHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0ZXh0dXJlLnNvdXJjZSwgY3JvcC54LCBjcm9wLnksIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0LCAwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgdmFyIHJnYlZhbHVlcyA9IFRpbnkuaGV4MnJnYihUaW55LnN0eWxlMmhleChjb2xvcikpO1xyXG4gICAgdmFyIHIgPSByZ2JWYWx1ZXNbMF0sXHJcbiAgICAgICAgZyA9IHJnYlZhbHVlc1sxXSxcclxuICAgICAgICBiID0gcmdiVmFsdWVzWzJdO1xyXG5cclxuICAgIHZhciBwaXhlbERhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgdmFyIHBpeGVscyA9IHBpeGVsRGF0YS5kYXRhO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGl4ZWxzLmxlbmd0aDsgaSArPSA0KSB7XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAwXSAqPSByO1xyXG4gICAgICAgIHBpeGVsc1tpICsgMV0gKj0gZztcclxuICAgICAgICBwaXhlbHNbaSArIDJdICo9IGI7XHJcblxyXG4gICAgICAgIGlmICghVGlueS5jYW5IYW5kbGVBbHBoYSkge1xyXG4gICAgICAgICAgICB2YXIgYWxwaGEgPSBwaXhlbHNbaSArIDNdO1xyXG5cclxuICAgICAgICAgICAgcGl4ZWxzW2kgKyAwXSAvPSAyNTUgLyBhbHBoYTtcclxuICAgICAgICAgICAgcGl4ZWxzW2kgKyAxXSAvPSAyNTUgLyBhbHBoYTtcclxuICAgICAgICAgICAgcGl4ZWxzW2kgKyAyXSAvPSAyNTUgLyBhbHBoYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEocGl4ZWxEYXRhLCAwLCAwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrSW52ZXJzZUFscGhhKCkge1xyXG4gICAgdmFyIGNhbnZhcyA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcigyLCAxLCB7IHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZSB9KTtcclxuXHJcbiAgICBjYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMTAsIDIwLCAzMCwgMC41KVwiO1xyXG5cclxuICAgIC8vICBEcmF3IGEgc2luZ2xlIHBpeGVsXHJcbiAgICBjYW52YXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgR2V0IHRoZSBjb2xvciB2YWx1ZXNcclxuICAgIHZhciBzMSA9IGNhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgUGxvdCB0aGVtIHRvIHgyXHJcbiAgICBjYW52YXMuY29udGV4dC5wdXRJbWFnZURhdGEoczEsIDEsIDApO1xyXG5cclxuICAgIC8vICBHZXQgdGhvc2UgdmFsdWVzXHJcbiAgICB2YXIgczIgPSBjYW52YXMuY29udGV4dC5nZXRJbWFnZURhdGEoMSwgMCwgMSwgMSk7XHJcblxyXG4gICAgLy8gIENvbXBhcmUgYW5kIHJldHVyblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICBzMi5kYXRhWzBdID09PSBzMS5kYXRhWzBdICYmXHJcbiAgICAgICAgczIuZGF0YVsxXSA9PT0gczEuZGF0YVsxXSAmJlxyXG4gICAgICAgIHMyLmRhdGFbMl0gPT09IHMxLmRhdGFbMl0gJiZcclxuICAgICAgICBzMi5kYXRhWzNdID09PSBzMS5kYXRhWzNdXHJcbiAgICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0JsZW5kTW9kZSgpIHtcclxuICAgIHZhciBwbmdIZWFkID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFRQUFBQUJBUU1BQUFERDhwMk9BQUFBQTFCTVZFWC9cIjtcclxuICAgIHZhciBwbmdFbmQgPSBcIkFBQUFDa2xFUVZRSTEyTmdBQUFBQWdBQjRpRzhNd0FBQUFCSlJVNUVya0pnZ2c9PVwiO1xyXG5cclxuICAgIHZhciBtYWdlbnRhID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgbWFnZW50YS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHllbGxvdyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgICB5ZWxsb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gNjtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiLCB7IHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJtdWx0aXBseVwiO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UobWFnZW50YSwgMCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHllbGxvdywgMiwgMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRleHQuZ2V0SW1hZ2VEYXRhKDIsIDAsIDEsIDEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMiwgMCwgMSwgMSkuZGF0YTtcclxuXHJcbiAgICAgICAgICAgIFRpbnkuc3VwcG9ydE5ld0JsZW5kTW9kZXMgPSBkYXRhWzBdID09PSAyNTUgJiYgZGF0YVsxXSA9PT0gMCAmJiBkYXRhWzJdID09PSAwO1xyXG4gICAgICAgICAgICBUaW55LkNhbnZhc1RpbnRlci50aW50TWV0aG9kID0gVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB5ZWxsb3cuc3JjID0gcG5nSGVhZCArIFwiL3dDS3h2UkZcIiArIHBuZ0VuZDtcclxuICAgIH07XHJcblxyXG4gICAgbWFnZW50YS5zcmMgPSBwbmdIZWFkICsgXCJBUDgwNE9hNlwiICsgcG5nRW5kO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuY29udmVydFRpbnRUb0ltYWdlID0gZmFsc2U7XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci5jYWNoZVRpbnQgPSBmYWxzZTtcclxuXHJcblRpbnkuY2FuSGFuZGxlQWxwaGEgPSBjaGVja0ludmVyc2VBbHBoYSgpO1xyXG5cclxuVGlueS5zdXBwb3J0TmV3QmxlbmRNb2RlcyA9IGNoZWNrQmxlbmRNb2RlKCk7XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci50aW50TWV0aG9kID0gVGlueS5zdXBwb3J0TmV3QmxlbmRNb2Rlc1xyXG4gICAgPyBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5XHJcbiAgICA6IFRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoUGVyUGl4ZWw7XHJcbiIsIlRpbnkuQ2FudmFzR3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcblRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3MgPSBmdW5jdGlvbiAoZ3JhcGhpY3MsIGNvbnRleHQpIHtcclxuICAgIHZhciB3b3JsZEFscGhhID0gZ3JhcGhpY3Mud29ybGRBbHBoYTtcclxuXHJcbiAgICBpZiAoZ3JhcGhpY3MuZGlydHkpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUdyYXBoaWNzVGludChncmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYXBoaWNzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBkYXRhID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhW2ldO1xyXG4gICAgICAgIHZhciBzaGFwZSA9IGRhdGEuc2hhcGU7XHJcblxyXG4gICAgICAgIHZhciBmaWxsQ29sb3IgPSBkYXRhLl9maWxsVGludDtcclxuICAgICAgICB2YXIgbGluZUNvbG9yID0gZGF0YS5fbGluZVRpbnQ7XHJcblxyXG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gZGF0YS5saW5lV2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5QT0xZKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBwb2ludHMubGVuZ3RoIC8gMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbaiAqIDJdLCBwb2ludHNbaiAqIDIgKyAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzaGFwZS5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IGFyZSB0aGUgc2FtZSBjbG9zZSB0aGUgcGF0aCAtIG11Y2ggbmVhdGVyIDopXHJcbiAgICAgICAgICAgIGlmIChwb2ludHNbMF0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl0gJiYgcG9pbnRzWzFdID09PSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGxpbmVDb2xvcjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJFQ1QpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gbGluZUNvbG9yO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5DSVJDKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gLSBuZWVkIHRvIGJlIFVuZGVmaW5lZCFcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGxpbmVDb2xvcjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkVMSVApIHtcclxuICAgICAgICAgICAgLy8gZWxsaXBzZSBjb2RlIHRha2VuIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE3Mjc5OC9ob3ctdG8tZHJhdy1hbi1vdmFsLWluLWh0bWw1LWNhbnZhc1xyXG5cclxuICAgICAgICAgICAgdmFyIHcgPSBzaGFwZS53aWR0aCAqIDI7XHJcbiAgICAgICAgICAgIHZhciBoID0gc2hhcGUuaGVpZ2h0ICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gc2hhcGUueCAtIHcgLyAyO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHNoYXBlLnkgLSBoIC8gMjtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIga2FwcGEgPSAwLjU1MjI4NDgsXHJcbiAgICAgICAgICAgICAgICBveCA9ICh3IC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgb3kgPSAoaCAvIDIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IHZlcnRpY2FsXHJcbiAgICAgICAgICAgICAgICB4ZSA9IHggKyB3LCAvLyB4LWVuZFxyXG4gICAgICAgICAgICAgICAgeWUgPSB5ICsgaCwgLy8geS1lbmRcclxuICAgICAgICAgICAgICAgIHhtID0geCArIHcgLyAyLCAvLyB4LW1pZGRsZVxyXG4gICAgICAgICAgICAgICAgeW0gPSB5ICsgaCAvIDI7IC8vIHktbWlkZGxlXHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyh4LCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4LCB5bSAtIG95LCB4bSAtIG94LCB5LCB4bSwgeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSArIG94LCB5LCB4ZSwgeW0gLSBveSwgeGUsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhlLCB5bSArIG95LCB4bSArIG94LCB5ZSwgeG0sIHllKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtIC0gb3gsIHllLCB4LCB5bSArIG95LCB4LCB5bSk7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbENvbG9yO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBsaW5lQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDKSB7XHJcbiAgICAgICAgICAgIHZhciByeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgIHZhciByeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHNoYXBlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gc2hhcGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gc2hhcGUucmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1heFJhZGl1cyA9IChNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIpIHwgMDtcclxuICAgICAgICAgICAgcmFkaXVzID0gcmFkaXVzID4gbWF4UmFkaXVzID8gbWF4UmFkaXVzIDogcmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocngsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSArIGhlaWdodCwgcnggKyByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCAtIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnkgKyBoZWlnaHQsIHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnksIHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSwgcngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbENvbG9yO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBsaW5lQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUNfTEpPSU4pXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB2YXIgcnggPSBzaGFwZS54O1xyXG4gICAgICAgIC8vICAgICB2YXIgcnkgPSBzaGFwZS55O1xyXG4gICAgICAgIC8vICAgICB2YXIgd2lkdGggPSBzaGFwZS53aWR0aDtcclxuICAgICAgICAvLyAgICAgdmFyIGhlaWdodCA9IHNoYXBlLmhlaWdodDtcclxuICAgICAgICAvLyAgICAgdmFyIHJhZGl1cyA9IHNoYXBlLnJhZGl1cztcclxuXHJcbiAgICAgICAgLy8gICAgIGlmIChkYXRhLmZpbGxDb2xvcilcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbENvbG9yO1xyXG4gICAgICAgIC8vICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGZpbGxDb2xvcjtcclxuICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgY29udGV4dC5saW5lSm9pbiA9IFwicm91bmRcIjtcclxuICAgICAgICAvLyAgICAgY29udGV4dC5saW5lV2lkdGggPSByYWRpdXM7XHJcblxyXG4gICAgICAgIC8vICAgICBjb250ZXh0LnN0cm9rZVJlY3QocnggKyAocmFkaXVzIC8gMiksIHJ5ICsgKHJhZGl1cyAvIDIpLCB3aWR0aCAtIHJhZGl1cywgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAvLyAgICAgY29udGV4dC5maWxsUmVjdChyeCArIChyYWRpdXMgLyAyKSwgcnkgKyAocmFkaXVzIC8gMiksIHdpZHRoIC0gcmFkaXVzLCBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3NNYXNrID0gZnVuY3Rpb24gKGdyYXBoaWNzLCBjb250ZXh0KSB7XHJcbiAgICB2YXIgbGVuID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhLmxlbmd0aDtcclxuXHJcbiAgICBpZiAobGVuID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHZhciBkYXRhID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhW2ldO1xyXG4gICAgICAgIHZhciBzaGFwZSA9IGRhdGEuc2hhcGU7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5QT0xZKSB7XHJcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBzaGFwZS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHBvaW50cy5sZW5ndGggLyAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tqICogMl0sIHBvaW50c1tqICogMiArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IGFyZSB0aGUgc2FtZSBjbG9zZSB0aGUgcGF0aCAtIG11Y2ggbmVhdGVyIDopXHJcbiAgICAgICAgICAgIGlmIChwb2ludHNbMF0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl0gJiYgcG9pbnRzWzFdID09PSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SRUNUKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVjdChzaGFwZS54LCBzaGFwZS55LCBzaGFwZS53aWR0aCwgc2hhcGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpIHtcclxuICAgICAgICAgICAgLy8gVE9ETyAtIG5lZWQgdG8gYmUgVW5kZWZpbmVkIVxyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhzaGFwZS54LCBzaGFwZS55LCBzaGFwZS5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkVMSVApIHtcclxuICAgICAgICAgICAgLy8gZWxsaXBzZSBjb2RlIHRha2VuIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE3Mjc5OC9ob3ctdG8tZHJhdy1hbi1vdmFsLWluLWh0bWw1LWNhbnZhc1xyXG5cclxuICAgICAgICAgICAgdmFyIHcgPSBzaGFwZS53aWR0aCAqIDI7XHJcbiAgICAgICAgICAgIHZhciBoID0gc2hhcGUuaGVpZ2h0ICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gc2hhcGUueCAtIHcgLyAyO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHNoYXBlLnkgLSBoIC8gMjtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYXBwYSA9IDAuNTUyMjg0OCxcclxuICAgICAgICAgICAgICAgIG94ID0gKHcgLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBveSA9IChoIC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcclxuICAgICAgICAgICAgICAgIHhlID0geCArIHcsIC8vIHgtZW5kXHJcbiAgICAgICAgICAgICAgICB5ZSA9IHkgKyBoLCAvLyB5LWVuZFxyXG4gICAgICAgICAgICAgICAgeG0gPSB4ICsgdyAvIDIsIC8vIHgtbWlkZGxlXHJcbiAgICAgICAgICAgICAgICB5bSA9IHkgKyBoIC8gMjsgLy8geS1taWRkbGVcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHgsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHgsIHltIC0gb3ksIHhtIC0gb3gsIHksIHhtLCB5KTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtICsgb3gsIHksIHhlLCB5bSAtIG95LCB4ZSwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeGUsIHltICsgb3ksIHhtICsgb3gsIHllLCB4bSwgeWUpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gLSBveCwgeWUsIHgsIHltICsgb3ksIHgsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMgfHwgZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTikge1xyXG4gICAgICAgICAgICB2YXIgcnggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICB2YXIgcnkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBzaGFwZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHNoYXBlLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHNoYXBlLnJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXhSYWRpdXMgPSAoTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyKSB8IDA7XHJcbiAgICAgICAgICAgIHJhZGl1cyA9IHJhZGl1cyA+IG1heFJhZGl1cyA/IG1heFJhZGl1cyA6IHJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHJ4LCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4LCByeSArIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCwgcnkgKyBoZWlnaHQsIHJ4ICsgcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0LCByeCArIHdpZHRoLCByeSArIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgd2lkdGgsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4ICsgd2lkdGgsIHJ5LCByeCArIHdpZHRoIC0gcmFkaXVzLCByeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgcmFkaXVzLCByeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCwgcnksIHJ4LCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DYW52YXNHcmFwaGljcy51cGRhdGVHcmFwaGljc1RpbnQgPSBmdW5jdGlvbiAoZ3JhcGhpY3MpIHtcclxuICAgIGNvbnNvbGUubG9nKGdyYXBoaWNzLnRpbnQpO1xyXG5cclxuICAgIGlmIChncmFwaGljcy50aW50ID09PSBcIiNmZmZmZmZcIikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGludEhleCA9IFRpbnkuc3R5bGUyaGV4KGdyYXBoaWNzLnRpbnQpO1xyXG4gICAgXHJcbiAgICB2YXIgdGludFIgPSAoKHRpbnRIZXggPj4gMTYpICYgMHhmZikgLyAyNTU7XHJcbiAgICB2YXIgdGludEcgPSAoKHRpbnRIZXggPj4gOCkgJiAweGZmKSAvIDI1NTtcclxuICAgIHZhciB0aW50QiA9ICh0aW50SGV4ICYgMHhmZikgLyAyNTU7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzLmdyYXBoaWNzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IFRpbnkuc3R5bGUyaGV4KGRhdGEuZmlsbENvbG9yKTtcclxuICAgICAgICB2YXIgbGluZUNvbG9yID0gVGlueS5zdHlsZTJoZXgoZGF0YS5saW5lQ29sb3IpO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBjb2xvclIgPSAoZmlsbENvbG9yID4+IDE2ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgdmFyIGNvbG9yRyA9IChmaWxsQ29sb3IgPj4gOCAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIHZhciBjb2xvckIgPSAoZmlsbENvbG9yICYgMHhGRikgLyAyNTU7IFxyXG4gICAgICAgIGNvbG9yUiAqPSB0aW50UjtcclxuICAgICAgICBjb2xvckcgKj0gdGludEc7XHJcbiAgICAgICAgY29sb3JCICo9IHRpbnRCO1xyXG4gICAgICAgIGZpbGxDb2xvciA9ICgoY29sb3JSKjI1NSA8PCAxNikgKyAoY29sb3JHKjI1NSA8PCA4KSArIGNvbG9yQioyNTUpO1xyXG4gICAgICAgIGNvbG9yUiA9IChsaW5lQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgICAgICBjb2xvckcgPSAobGluZUNvbG9yID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgICAgICBjb2xvckIgPSAobGluZUNvbG9yICYgMHhGRikgLyAyNTU7IFxyXG4gICAgICAgIGNvbG9yUiAqPSB0aW50UjtcclxuICAgICAgICBjb2xvckcgKj0gdGludEc7XHJcbiAgICAgICAgY29sb3JCICo9IHRpbnRCO1xyXG4gICAgICAgIGxpbmVDb2xvciA9ICgoY29sb3JSKjI1NSA8PCAxNikgKyAoY29sb3JHKjI1NSA8PCA4KSArIGNvbG9yQioyNTUpOyAgIFxyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIGRhdGEuX2ZpbGxUaW50ID1cclxuICAgICAgICAgICAgKCgoKChmaWxsQ29sb3IgPj4gMTYpICYgMHhmZikgLyAyNTUpICogdGludFIgKiAyNTUpIDw8IDE2KSArXHJcbiAgICAgICAgICAgICgoKCgoZmlsbENvbG9yID4+IDgpICYgMHhmZikgLyAyNTUpICogdGludEcgKiAyNTUpIDw8IDgpICtcclxuICAgICAgICAgICAgKChmaWxsQ29sb3IgJiAweGZmKSAvIDI1NSkgKiB0aW50QiAqIDI1NTtcclxuICAgICAgICBkYXRhLl9saW5lVGludCA9XHJcbiAgICAgICAgICAgICgoKCgobGluZUNvbG9yID4+IDE2KSAmIDB4ZmYpIC8gMjU1KSAqIHRpbnRSICogMjU1KSA8PCAxNikgK1xyXG4gICAgICAgICAgICAoKCgoKGxpbmVDb2xvciA+PiA4KSAmIDB4ZmYpIC8gMjU1KSAqIHRpbnRHICogMjU1KSA8PCA4KSArXHJcbiAgICAgICAgICAgICgobGluZUNvbG9yICYgMHhmZikgLyAyNTUpICogdGludEIgKiAyNTU7XHJcblxyXG4gICAgICAgIGRhdGEuX2ZpbGxUaW50ID0gVGlueS5oZXgyc3R5bGUoZGF0YS5fZmlsbFRpbnQpO1xyXG4gICAgICAgIGRhdGEuX2xpbmVUaW50ID0gVGlueS5oZXgyc3R5bGUoZGF0YS5fbGluZVRpbnQpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJ2YXIgbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cztcclxuXHJcblRpbnkuSW5wdXQgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHZhciB2aWV3ID0gKHRoaXMuZG9tRWxlbWVudCA9IGdhbWUuaW5wdXRWaWV3KTtcclxuXHJcbiAgICB0aGlzLmJvdW5kcyA9IHsgeDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xyXG4gICAgdGhpcy5jYW5kaWRhdGVzID0gW107XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxuXHJcbiAgICB0aGlzLmxhc3RNb3ZlID0gbnVsbDtcclxuICAgIHRoaXMuaXNEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5kb3duSGFuZGxlciA9IHRoaXMuZG93bkhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSB0aGlzLm1vdmVIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnVwSGFuZGxlciA9IHRoaXMudXBIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICAvLyB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcblxyXG4gICAgLy8gdmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcclxuXHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbih0aGlzKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRpbnkuSW5wdXQuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIFRpbnkuSW5wdXQuc3lzdGVtc1tpXS5pbml0LmNhbGwodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVCb3VuZHMoKTtcclxufTtcclxuXHJcblRpbnkuSW5wdXQucHJvdG90eXBlID0ge1xyXG4gICAgYWRkOiBmdW5jdGlvbiAob2JqZWN0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgb2JqZWN0LmlucHV0RW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIG9wdGlvbnMuc3lzdGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgb2JqZWN0LmlucHV0ID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4ob2JqZWN0LmlucHV0KTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gob2JqZWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5saXN0LmluZGV4T2Yob2JqZWN0KTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdmFyIHJlbW92ZWQgPSB0aGlzLmxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICByZW1vdmVkLmlucHV0ID0gbnVsbDtcclxuICAgICAgICAgICAgcmVtb3ZlZC5pbnB1dEVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dEhhbmRsZXI6IGZ1bmN0aW9uIChuYW1lLCBldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5hbWUpXHJcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuZ2V0Q29vcmRzKGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGNvb3JkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAobmFtZSAhPSBcIm1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5kaWRhdGVzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUaW55LklucHV0LnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBUaW55LklucHV0LnN5c3RlbXNbaV0ucHJlSGFuZGxlLmNhbGwodGhpcywgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNHb29kLCBvYmo7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCB0aGlzLmxpc3QubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmxpc3RbdF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmlucHV0RW5hYmxlZCB8fCAhb2JqLnBhcmVudCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaW5wdXQuY2hlY2tCb3VuZHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzR29vZCA9IG9iai5pbnB1dC5jaGVja0JvdW5kcy5jYWxsKHRoaXMsIG9iaiwgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlzR29vZCA9IFRpbnkuSW5wdXQuY2hlY2tCb3VuZHMuY2FsbCh0aGlzLCBvYmosIGNvb3Jkcy54LCBjb29yZHMueSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0dvb2QpIHRoaXMuY2FuZGlkYXRlcy5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgaSA9IHRoaXMuY2FuZGlkYXRlcy5sZW5ndGhcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jYW5kaWRhdGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gdGhpcy5jYW5kaWRhdGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dFtcImxhc3RfXCIgKyBuYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQobmFtZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IG9iai5pbnB1dFtcImxhc3RfZG93blwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50ICYmIFRpbnkuTWF0aC5kaXN0YW5jZShwb2ludC54LCBwb2ludC55LCBjb29yZHMueCwgY29vcmRzLnkpIDwgMzApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChcImNsaWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5pbnB1dC50cmFuc3BhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIG9iaiA9IHRoaXMuY2FuZGlkYXRlc1tpIC0gMV1cclxuICAgICAgICAgICAgICAgIC8vICAgICBvYmouaW5wdXRbXCJsYXN0X1wiICsgbmFtZV0gPSB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fVxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICBvYmouaW5wdXQuZW1pdChuYW1lLCB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKG5hbWUgPT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZhciBwb2ludCA9IG9iai5pbnB1dFtcImxhc3RfZG93blwiXVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAocG9pbnQgJiYgVGlueS5NYXRoLmRpc3RhbmNlKHBvaW50LngsIHBvaW50LnksIGNvb3Jkcy54LCBjb29yZHMueSkgPCAzMClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KFwiY2xpY2tcIiwge3g6IGNvb3Jkcy54LCB5OiBjb29yZHMueX0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVtaXQobmFtZSwge1xyXG4gICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdmVIYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmxhc3RNb3ZlID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJtb3ZlXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBIYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwidXBcIiwgdGhpcy5sYXN0TW92ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRvd25IYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRG93biA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZSA9IGV2ZW50O1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwiZG93blwiLCBldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrSGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJjbGlja1wiLCBldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldENvb3JkczogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNvb3JkcyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBldmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5jbGllbnRYICYmIGV2ZW50LmNsaWVudFkpIHtcclxuICAgICAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBNb3VzZSBldmVudFxyXG4gICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzICYmIGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkgfHwgY29vcmRzID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICB4OiBjb29yZHMueCAtIHRoaXMuYm91bmRzLngsXHJcbiAgICAgICAgICAgIHk6IGNvb3Jkcy55IC0gdGhpcy5ib3VuZHMueVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBjb29yZHM7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUJvdW5kczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJvdW5kcyA9IHRoaXMuYm91bmRzO1xyXG5cclxuICAgICAgICB2YXIgY2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgYm91bmRzLnggPSBjbGllbnRSZWN0LmxlZnQ7XHJcbiAgICAgICAgYm91bmRzLnkgPSBjbGllbnRSZWN0LnRvcDtcclxuICAgICAgICBib3VuZHMud2lkdGggPSBjbGllbnRSZWN0LndpZHRoO1xyXG4gICAgICAgIGJvdW5kcy5oZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG5cclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5JbnB1dC5jaGVja0JvdW5kcyA9IGZ1bmN0aW9uIChvYmosIHgsIHkpIHtcclxuICAgIGlmIChvYmoud29ybGRWaXNpYmxlKSB7XHJcbiAgICAgICAgaWYgKG9iai5nZXRCb3VuZHMoKS5jb250YWlucyh4LCB5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKG9iai5jaGlsZHJlbiAmJiBvYmouY2hpbGRyZW4ubGVuZ3RoID4gMClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IG9iai5jaGlsZHJlbi5sZW5ndGg7IHQrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIF9jaGVja09uQWN0aXZlT2JqZWN0cyhvYmouY2hpbGRyZW5bdF0sIHgsIHkpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxufTtcclxuXHJcblRpbnkuSW5wdXQuc3lzdGVtcyA9IFtdO1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcImlucHV0XCIsIFRpbnkuSW5wdXQpO1xyXG4iLCJUaW55LkNhY2hlID0ge1xyXG4gICAgaW1hZ2U6IHt9LFxyXG4gICAgdGV4dHVyZToge31cclxufTtcclxuXHJcblRpbnkuTG9hZGVyID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIGdhbWUuY2FjaGUgPSBUaW55LkNhY2hlO1xyXG5cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLnByb3RvdHlwZSA9IHtcclxuICAgIGNsZWFyQ2FjaGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciB5IGluIFRpbnkuQ2FjaGUudGV4dHVyZSkgVGlueS5DYWNoZS50ZXh0dXJlW3ldLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LkNhY2hlKSBUaW55LkNhY2hlW3ldID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIGFsbDogZnVuY3Rpb24gKGFycmF5KSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5saXN0LmNvbmNhdChhcnJheSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGltYWdlOiBmdW5jdGlvbiAoa2V5LCBzb3VyY2UpIHtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNwcml0ZXNoZWV0OiBmdW5jdGlvbiAoa2V5LCBzb3VyY2UsIGFyZ18xLCBhcmdfMiwgdG90YWxGcmFtZXMsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB0eXBlOiBcInNwcml0ZXNoZWV0XCJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGFyZ18xID09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgcmVzLndpZHRoID0gYXJnXzE7XHJcbiAgICAgICAgICAgIHJlcy5oZWlnaHQgPSBhcmdfMjtcclxuICAgICAgICAgICAgcmVzLnRvdGFsID0gdG90YWxGcmFtZXM7XHJcbiAgICAgICAgICAgIHJlcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJnXzEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXMuZGF0YSA9IGFyZ18xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gocmVzKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXRsYXM6IGZ1bmN0aW9uIChrZXksIHNvdXJjZSwgYXRsYXNEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goe1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIGRhdGE6IGF0bGFzRGF0YSxcclxuICAgICAgICAgICAgdHlwZTogXCJhdGxhc1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgZ2FtZSA9IHRoaXMuZ2FtZTtcclxuICAgICAgICB2YXIgbGlzdCA9IHRoaXMubGlzdDtcclxuXHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChnYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZE5leHQoKSB7XHJcbiAgICAgICAgICAgIC8vIHZhciBkb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGxpc3Quc2hpZnQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsb2FkZXIgPSBUaW55LkxvYWRlcltyZXNvdXJjZS50eXBlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2FkZXIpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRlcihyZXNvdXJjZSwgbG9hZGVkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbm5vdCBmaW5kIGxvYWRlciBmb3IgXCIgKyByZXNvdXJjZS50eXBlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkZWQocmVzb3VyY2UsIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGxvYWROZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGdhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2FkTmV4dCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIuYXRsYXMgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGNiKSB7XHJcbiAgICB2YXIga2V5ID0gcmVzb3VyY2Uua2V5O1xyXG5cclxuICAgIFRpbnkuTG9hZGVyLmltYWdlKHJlc291cmNlLCBmdW5jdGlvbiAocmVzb3VyY2UsIGltYWdlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNvdXJjZS5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB1dWlkID0ga2V5ICsgXCIuXCIgKyByZXNvdXJjZS5kYXRhW2ldLm5hbWU7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwgcmVzb3VyY2UuZGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG5cclxuICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLnNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gKHJlc291cmNlLCBjYikge1xyXG4gICAgdmFyIGtleSA9IHJlc291cmNlLmtleTtcclxuXHJcbiAgICBUaW55LkxvYWRlci5pbWFnZShyZXNvdXJjZSwgZnVuY3Rpb24gKHJlc291cmNlLCBpbWFnZSkge1xyXG4gICAgICAgIHZhciBsYXN0RnJhbWUsIHV1aWQsIHRleHR1cmU7XHJcblxyXG4gICAgICAgIGlmIChyZXNvdXJjZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBmcmFtZURhdGEgPSByZXNvdXJjZS5kYXRhO1xyXG4gICAgICAgICAgICBsYXN0RnJhbWUgPSBmcmFtZURhdGEubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGxhc3RGcmFtZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB1dWlkID0ga2V5ICsgXCIuXCIgKyBpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ueCksXHJcbiAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ueSksXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLndpZHRoKSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLmhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGZyYW1lRGF0YVtpXS5kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmxhc3RGcmFtZSA9IGxhc3RGcmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJhbWVXaWR0aCA9IHJlc291cmNlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgZnJhbWVIZWlnaHQgPSByZXNvdXJjZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZyYW1lV2lkdGgpIGZyYW1lV2lkdGggPSBNYXRoLmZsb29yKHdpZHRoIC8gKHJlc291cmNlLmNvbHMgfHwgMSkpO1xyXG4gICAgICAgICAgICBpZiAoIWZyYW1lSGVpZ2h0KSBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gKHJlc291cmNlLnJvd3MgfHwgMSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbHMgPSBNYXRoLmZsb29yKHdpZHRoIC8gZnJhbWVXaWR0aCk7XHJcbiAgICAgICAgICAgIHZhciByb3dzID0gTWF0aC5mbG9vcihoZWlnaHQgLyBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG90YWwgPSBjb2xzICogcm93cztcclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZS50b3RhbCkgdG90YWwgPSBNYXRoLm1pbih0b3RhbCwgcmVzb3VyY2UudG90YWwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHggPSAwO1xyXG4gICAgICAgICAgICB2YXIgeSA9IDA7XHJcbiAgICAgICAgICAgIGxhc3RGcmFtZSA9IHRvdGFsIC0gMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdXVpZCA9IGtleSArIFwiLlwiICsgaTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBmcmFtZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogZnJhbWVIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHJlc291cmNlLmR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcbiAgICAgICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICAgICAgICAgIHggKz0gZnJhbWVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoeCArIGZyYW1lV2lkdGggPiB3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHkgKz0gZnJhbWVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLmltYWdlID0gZnVuY3Rpb24gKHJlc291cmNlLCBjYikge1xyXG4gICAgLy8gaWYgKFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKSByZXR1cm4gY2IocmVzb3VyY2UsIFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUaW55LkNhY2hlLmltYWdlW3Jlc291cmNlLmtleV0gPSBpbWFnZTtcclxuXHJcbiAgICAgICAgY2IocmVzb3VyY2UsIGltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGNiKHJlc291cmNlLCBpbWFnZSk7XHJcbiAgICAvLyB9KVxyXG5cclxuICAgIGltYWdlLnNyYyA9IHJlc291cmNlLnNyYztcclxufTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJsb2FkXCIsIFRpbnkuTG9hZGVyKTtcclxuIiwidmFyIF9pc1NldFRpbWVPdXQsIF9vbkxvb3AsIF90aW1lT3V0SUQsIF9wcmV2VGltZSwgX2xhc3RUaW1lO1xyXG5cclxudmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxufTtcclxuXHJcbmlmIChzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiYgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxufSBlbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBub3cgPSBEYXRlLm5vdztcclxufVxyXG5cclxuVGlueS5SQUYgPSBmdW5jdGlvbiAoZ2FtZSwgZm9yY2VTZXRUaW1lT3V0KSB7XHJcbiAgICBpZiAoZm9yY2VTZXRUaW1lT3V0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb3JjZVNldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZm9yY2VTZXRUaW1lT3V0ID0gZm9yY2VTZXRUaW1lT3V0O1xyXG5cclxuICAgIHZhciB2ZW5kb3JzID0gW1wibXNcIiwgXCJtb3pcIiwgXCJ3ZWJraXRcIiwgXCJvXCJdO1xyXG5cclxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IHgrKykge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XHJcbiAgICAgICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIF9vbkxvb3AgPSBudWxsO1xyXG4gICAgX3RpbWVPdXRJRCA9IG51bGw7XHJcblxyXG4gICAgX3ByZXZUaW1lID0gMDtcclxuICAgIF9sYXN0VGltZSA9IDA7XHJcbn07XHJcblxyXG5UaW55LlJBRi5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9wcmV2VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB0aGlzLmZvcmNlU2V0VGltZU91dCkge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlU2V0VGltZW91dCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlUkFGKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfb25Mb29wKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVJBRjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9sYXN0VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX29uTG9vcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVNldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKTtcclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIFRpbnkuUkFGLnRpbWVUb0NhbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3ByZXZUaW1lID0gbm93KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoX2lzU2V0VGltZU91dCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RpbWVPdXRJRCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKF90aW1lT3V0SUQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUkFGLnRpbWVUb0NhbGwgPSAxNTtcclxuIiwidmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbnZhciBUaW1lciA9IGZ1bmN0aW9uIChhdXRvU3RhcnQsIGF1dG9SZW1vdmUsIGdhbWUsIGNiLCBjdHgsIGRlbGF5LCBsb29wLCBuLCBvbmNvbXBsZXRlKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5jYiA9IGNiIHx8IG5vb3A7XHJcbiAgICB0aGlzLmN0eCA9IGN0eCB8fCB0aGlzO1xyXG4gICAgdGhpcy5kZWxheSA9IGRlbGF5ID09IHVuZGVmaW5lZCA/IDEwMDAgOiBkZWxheTtcclxuICAgIHRoaXMubG9vcCA9IGxvb3A7XHJcbiAgICB0aGlzLmNvdW50ID0gbiB8fCAwO1xyXG4gICAgdGhpcy5yZXBlYXQgPSB0aGlzLmNvdW50ID4gMDtcclxuICAgIHRoaXMucnVubmluZyA9ICEhYXV0b1N0YXJ0O1xyXG4gICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IGF1dG9SZW1vdmU7XHJcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbmNvbXBsZXRlIHx8IG5vb3A7XHJcbn07XHJcblxyXG5UaW1lci5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YVRpbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0RnJhbWUgPj0gdGhpcy5kZWxheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMuY3R4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9SZW1vdmUgJiYgdGhpcy5nYW1lLnRpbWVyLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVGltZXIgPSBUaW1lcjtcclxuXHJcblRpbnkuVGltZXJDcmVhdG9yID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIHRoaXMuYXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvci5wcm90b3R5cGUgPSB7XHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAodG0pIHtcclxuICAgICAgICB2YXIgaW5kZXhPZiA9IHRoaXMubGlzdC5pbmRleE9mKHRtKTtcclxuICAgICAgICBpZiAoaW5kZXhPZiA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRtLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleE9mLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkOiBmdW5jdGlvbiAoZGVsYXksIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSkge1xyXG4gICAgICAgIGF1dG9zdGFydCA9IGF1dG9zdGFydCAhPSB1bmRlZmluZWQgPyBhdXRvc3RhcnQgOiB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICBhdXRvcmVtb3ZlID0gYXV0b3JlbW92ZSAhPSB1bmRlZmluZWQgPyBhdXRvcmVtb3ZlIDogdGhpcy5hdXRvUmVtb3ZlO1xyXG5cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlLCB0aGlzLmdhbWUsIGNiLCBjdHgsIGRlbGF5KTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGxvb3A6IGZ1bmN0aW9uIChkZWxheSwgY2IsIGN0eCwgYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlKSB7XHJcbiAgICAgICAgYXV0b3N0YXJ0ID0gYXV0b3N0YXJ0ICE9IHVuZGVmaW5lZCA/IGF1dG9zdGFydCA6IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIGF1dG9yZW1vdmUgPSBhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmU7XHJcblxyXG4gICAgICAgIHZhciB0aW1lciA9IG5ldyBUaW1lcihhdXRvc3RhcnQsIGF1dG9yZW1vdmUsIHRoaXMuZ2FtZSwgY2IsIGN0eCwgZGVsYXksIHRydWUpO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgcmVwZWF0OiBmdW5jdGlvbiAoZGVsYXksIG4sIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgY29tcGxldGUpIHtcclxuICAgICAgICBhdXRvc3RhcnQgPSBhdXRvc3RhcnQgIT0gdW5kZWZpbmVkID8gYXV0b3N0YXJ0IDogdGhpcy5hdXRvU3RhcnQ7XHJcbiAgICAgICAgYXV0b3JlbW92ZSA9IGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZTtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgdGhpcy5nYW1lLCBjYiwgY3R4LCBkZWxheSwgZmFsc2UsIG4sIGNvbXBsZXRlKTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcInRpbWVyXCIsIFRpbnkuVGltZXJDcmVhdG9yKTtcclxuIiwiLyoqXHJcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxyXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcclxuICovXHJcblxyXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fdHdlZW5zID0ge307XHJcbiAgICB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG59O1xyXG5cclxuX0dyb3VwLnByb3RvdHlwZSA9IHtcclxuICAgIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpLm1hcChcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHR3ZWVuSWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90d2VlbnNbdHdlZW5JZF07XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX3R3ZWVucyA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG4gICAgICAgIHZhciBpZCA9IHR3ZWVuLmdldElkKCk7XHJcbiAgICAgICAgdGhpcy5fdHdlZW5zW2lkXSA9IHR3ZWVuO1xyXG4gICAgICAgIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW2lkXSA9IHR3ZWVuO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG4gICAgICAgIHZhciBpZCA9IHR3ZWVuLmdldElkKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3R3ZWVuc1tpZF07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW2lkXTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGVsdGEsIHByZXNlcnZlKSB7XHJcbiAgICAgICAgdmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcclxuXHJcbiAgICAgICAgaWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xyXG5cclxuICAgICAgICAvLyBUd2VlbnMgYXJlIHVwZGF0ZWQgaW4gXCJiYXRjaGVzXCIuIElmIHlvdSBhZGQgYSBuZXcgdHdlZW4gZHVyaW5nIGFuXHJcbiAgICAgICAgLy8gdXBkYXRlLCB0aGVuIHRoZSBuZXcgdHdlZW4gd2lsbCBiZSB1cGRhdGVkIGluIHRoZSBuZXh0IGJhdGNoLlxyXG4gICAgICAgIC8vIElmIHlvdSByZW1vdmUgYSB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCBpdCBtYXkgb3IgbWF5IG5vdCBiZSB1cGRhdGVkLlxyXG4gICAgICAgIC8vIEhvd2V2ZXIsIGlmIHRoZSByZW1vdmVkIHR3ZWVuIHdhcyBhZGRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgYmF0Y2gsXHJcbiAgICAgICAgLy8gdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxyXG4gICAgICAgIHdoaWxlICh0d2Vlbklkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUoZGVsdGEpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcmVzZXJ2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgVFdFRU4gPSBuZXcgX0dyb3VwKCk7XHJcblxyXG5UV0VFTi5Hcm91cCA9IF9Hcm91cDtcclxuVFdFRU4uX25leHRJZCA9IDA7XHJcblRXRUVOLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBUV0VFTi5fbmV4dElkKys7XHJcbn07XHJcblxyXG4vLyAvLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxyXG4vLyAvLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXHJcbi8vIGlmICh0eXBlb2YgKHNlbGYpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmhydGltZSkge1xyXG4vLyAgVFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcclxuXHJcbi8vICAgICAgLy8gQ29udmVydCBbc2Vjb25kcywgbmFub3NlY29uZHNdIHRvIG1pbGxpc2Vjb25kcy5cclxuLy8gICAgICByZXR1cm4gdGltZVswXSAqIDEwMDAgKyB0aW1lWzFdIC8gMTAwMDAwMDtcclxuLy8gIH07XHJcbi8vIH1cclxuLy8gLy8gSW4gYSBicm93c2VyLCB1c2Ugc2VsZi5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG4vLyBlbHNlIGlmICh0eXBlb2YgKHNlbGYpICE9PSAndW5kZWZpbmVkJyAmJlxyXG4vLyAgICAgICAgICBzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiZcclxuLy8gICAgICAgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4vLyAgLy8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXHJcbi8vICAvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXHJcbi8vICBUV0VFTi5ub3cgPSBzZWxmLnBlcmZvcm1hbmNlLm5vdy5iaW5kKHNlbGYucGVyZm9ybWFuY2UpO1xyXG4vLyB9XHJcbi8vIC8vIFVzZSBEYXRlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXHJcbi8vIGVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcclxuLy8gIFRXRUVOLm5vdyA9IERhdGUubm93O1xyXG4vLyB9XHJcbi8vIC8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXHJcbi8vIGVsc2Uge1xyXG4vLyAgVFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuLy8gIH07XHJcbi8vIH1cclxuXHJcblRpbnkuVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0LCBncm91cCkge1xyXG4gICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuICAgIC8vIHRoaXMuX3BhdXNlU3RhcnQgPSBudWxsO1xyXG4gICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xyXG4gICAgdGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcclxuICAgIHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xyXG4gICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQgPSB7fTtcclxuICAgIHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcclxuICAgIHRoaXMuX3JlcGVhdCA9IDA7XHJcbiAgICB0aGlzLl9yZXBlYXREZWxheVRpbWUgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl95b3lvID0gZmFsc2U7XHJcbiAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuX3JldmVyc2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9kZWxheVRpbWUgPSAwO1xyXG4gICAgdGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcclxuICAgIHRoaXMuX3RpbWUgPSAwO1xyXG4gICAgdGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUaW55LkVhc2luZy5MaW5lYXIuTm9uZTtcclxuICAgIHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRpbnkuSW50ZXJwb2xhdGlvbi5MaW5lYXI7XHJcbiAgICB0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XHJcbiAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IG51bGw7XHJcbiAgICB0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fZ3JvdXAgPSBncm91cCB8fCBUV0VFTjtcclxuICAgIHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XHJcbn07XHJcblxyXG5UaW55LlR3ZWVuLnByb3RvdHlwZSA9IHtcclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1BsYXlpbmc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1BhdXNlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1BhdXNlZDtcclxuICAgIH0sXHJcblxyXG4gICAgdG86IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlc0VuZCA9IE9iamVjdC5jcmVhdGUocHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKGQpIHtcclxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAocmVzZXQpIHtcclxuICAgICAgICB0aGlzLl9ncm91cC5hZGQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX2RlbGF5VGltZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGFuIEFycmF5IHdhcyBwcm92aWRlZCBhcyBwcm9wZXJ0eSB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSBbdGhpcy5fb2JqZWN0W3Byb3BlcnR5XV0uY29uY2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxyXG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgbm90IHNldCB0aGF0IHByb3BlcnR5IGluIHRoZSBvYmplY3RcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIHN0YXJ0aW5nIHZhbHVlLCBvbmx5IG9uY2UgLSBpZiByZXNldCBzZXQgdG8gZmFsc2UuXHJcbiAgICAgICAgICAgIGlmIChyZXNldCA9PSB0cnVlIHx8IHR5cGVvZiB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX29iamVjdFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSAqPSAxLjA7IC8vIEVuc3VyZXMgd2UncmUgdXNpbmcgbnVtYmVycywgbm90IHN0cmluZ3NcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZ3JvdXAucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29uU3RvcENhbGxiYWNrICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKEluZmluaXR5LCBJbmZpbml0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzUGF1c2VkIHx8ICF0aGlzLl9pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuX3BhdXNlU3RhcnQgPSB0aW1lID09PSB1bmRlZmluZWQgPyBUV0VFTi5ub3coKSA6IHRpbWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc3VtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuX3N0YXJ0VGltZSArPSAodGltZSA9PT0gdW5kZWZpbmVkID8gVFdFRU4ubm93KCkgOiB0aW1lKVxyXG4gICAgICAgIC8vICAtIHRoaXMuX3BhdXNlU3RhcnQ7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuX3BhdXNlU3RhcnQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9ncm91cC5hZGQodGhpcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBncm91cDogZnVuY3Rpb24gKGdyb3VwKSB7XHJcbiAgICAgICAgdGhpcy5fZ3JvdXAgPSBncm91cDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZGVsYXk6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICB0aGlzLl9kZWxheVRpbWUgPSBhbW91bnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlcGVhdDogZnVuY3Rpb24gKHRpbWVzKSB7XHJcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gdGltZXM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlcGVhdERlbGF5OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICB5b3lvOiBmdW5jdGlvbiAoeW95bykge1xyXG4gICAgICAgIHRoaXMuX3lveW8gPSB5b3lvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uIChlYXNpbmdGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2Vhc2luZ0Z1bmN0aW9uID0gZWFzaW5nRnVuY3Rpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGludGVycG9sYXRpb246IGZ1bmN0aW9uIChpbnRlcnBvbGF0aW9uRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uRnVuY3Rpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYWluOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb25TdGFydDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fb25TdGFydENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVXBkYXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uUmVwZWF0OiBmdW5jdGlvbiBvblJlcGVhdChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uU3RvcDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGVsdGEpIHtcclxuICAgICAgICB2YXIgcHJvcGVydHk7XHJcbiAgICAgICAgdmFyIGVsYXBzZWQ7XHJcbiAgICAgICAgdmFyIHZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLl90aW1lICs9IGRlbHRhO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdGltZSA8IHRoaXMuX3N0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29uU3RhcnRDYWxsYmFjayAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25TdGFydENhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsYXBzZWQgPSAodGhpcy5fdGltZSAtIHRoaXMuX3N0YXJ0VGltZSkgLyB0aGlzLl9kdXJhdGlvbjtcclxuICAgICAgICBlbGFwc2VkID0gdGhpcy5fZHVyYXRpb24gPT09IDAgfHwgZWxhcHNlZCA+IDEgPyAxIDogZWxhcHNlZDtcclxuXHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLl9lYXNpbmdGdW5jdGlvbihlbGFwc2VkKTtcclxuXHJcbiAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcclxuICAgICAgICAgICAgLy8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3RcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUGFyc2VzIHJlbGF0aXZlIGVuZCB2YWx1ZXMgd2l0aCBzdGFydCBhcyBiYXNlIChlLmcuOiArMTAsIC0zKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kLmNoYXJBdCgwKSA9PT0gXCIrXCIgfHwgZW5kLmNoYXJBdCgwKSA9PT0gXCItXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gcGFyc2VGbG9hdChlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW5kID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vblVwZGF0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCwgZWxhcHNlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZWxhcHNlZCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGaW5pdGUodGhpcy5fcmVwZWF0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlcGVhdC0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XHJcbiAgICAgICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gKyBwYXJzZUZsb2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3lveW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSB0bXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3lveW8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXZlcnNlZCA9ICF0aGlzLl9yZXZlcnNlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVwZWF0RGVsYXlUaW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLl9yZXBlYXREZWxheVRpbWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX2RlbGF5VGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb25SZXBlYXRDYWxsYmFjayAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuRWFzaW5nID0ge1xyXG4gICAgTGluZWFyOiB7XHJcbiAgICAgICAgTm9uZTogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBRdWFkcmF0aWM6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGsgKiBrO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGsgKiAoMiAtIGspO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogayAqIGs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAtMC41ICogKC0tayAqIChrIC0gMikgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEN1YmljOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrICogayAqIGs7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gLS1rICogayAqIGsgKyAxO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogayAqIGsgKiBrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFF1YXJ0aWM6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGsgKiBrICogayAqIGs7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gMSAtIC0tayAqIGsgKiBrICogaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAtMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBRdWludGljOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrICogayAqIGsgKiBrICogaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtLWsgKiBrICogayAqIGsgKiBrICsgMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGsgKiBrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrICogayArIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2ludXNvaWRhbDoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguY29zKChrICogTWF0aC5QSSkgLyAyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbigoayAqIE1hdGguUEkpIC8gMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeHBvbmVudGlhbDoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gayA9PT0gMCA/IDAgOiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gayA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLTEwICogayk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmIChrID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGsgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKC1NYXRoLnBvdygyLCAtMTAgKiAoayAtIDEpKSArIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQ2lyY3VsYXI6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIC0tayAqIGspO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRWxhc3RpYzoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoayA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChrID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKGsgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoayA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdygyLCAtMTAgKiBrKSAqIE1hdGguc2luKChrIC0gMC4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmIChrID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGsgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBrICo9IDI7XHJcblxyXG4gICAgICAgICAgICBpZiAoayA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEJhY2s6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XHJcblxyXG4gICAgICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBCb3VuY2U6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEgLSBUaW55LkVhc2luZy5Cb3VuY2UuT3V0KDEgLSBrKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmIChrIDwgMSAvIDIuNzUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiBrICogaztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrIDwgMiAvIDIuNzUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAoayAtPSAxLjUgLyAyLjc1KSAqIGsgKyAwLjc1O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGsgPCAyLjUgLyAyLjc1KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKGsgLT0gMi4yNSAvIDIuNzUpICogayArIDAuOTM3NTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAoayAtPSAyLjYyNSAvIDIuNzUpICogayArIDAuOTg0Mzc1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmIChrIDwgMC41KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGlueS5FYXNpbmcuQm91bmNlLkluKGsgKiAyKSAqIDAuNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFRpbnkuRWFzaW5nLkJvdW5jZS5PdXQoayAqIDIgLSAxKSAqIDAuNSArIDAuNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkludGVycG9sYXRpb24gPSB7XHJcbiAgICBMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcbiAgICAgICAgdmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdmFyIGYgPSBtICogaztcclxuICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoZik7XHJcbiAgICAgICAgdmFyIGZuID0gVGlueS5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcclxuXHJcbiAgICAgICAgaWYgKGsgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmbih2WzBdLCB2WzFdLCBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmbih2W2ldLCB2W2kgKyAxID4gbSA/IG0gOiBpICsgMV0sIGYgLSBpKTtcclxuICAgIH0sXHJcblxyXG4gICAgQmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xyXG4gICAgICAgIHZhciBiID0gMDtcclxuICAgICAgICB2YXIgbiA9IHYubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgcHcgPSBNYXRoLnBvdztcclxuICAgICAgICB2YXIgYm4gPSBUaW55LkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcclxuICAgICAgICAgICAgYiArPSBwdygxIC0gaywgbiAtIGkpICogcHcoaywgaSkgKiB2W2ldICogYm4obiwgaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYjtcclxuICAgIH0sXHJcblxyXG4gICAgQ2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcclxuICAgICAgICB2YXIgbSA9IHYubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgZiA9IG0gKiBrO1xyXG4gICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihmKTtcclxuICAgICAgICB2YXIgZm4gPSBUaW55LkludGVycG9sYXRpb24uVXRpbHMuQ2F0bXVsbFJvbTtcclxuXHJcbiAgICAgICAgaWYgKHZbMF0gPT09IHZbbV0pIHtcclxuICAgICAgICAgICAgaWYgKGsgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBpID0gTWF0aC5mbG9vcigoZiA9IG0gKiAoMSArIGspKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmbih2WyhpIC0gMSArIG0pICUgbV0sIHZbaV0sIHZbKGkgKyAxKSAlIG1dLCB2WyhpICsgMikgJSBtXSwgZiAtIGkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChrIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZbbV0gLSAoZm4odlttXSwgdlttXSwgdlttIC0gMV0sIHZbbSAtIDFdLCBmIC0gbSkgLSB2W21dKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZuKHZbaSA/IGkgLSAxIDogMF0sIHZbaV0sIHZbbSA8IGkgKyAxID8gbSA6IGkgKyAxXSwgdlttIDwgaSArIDIgPyBtIDogaSArIDJdLCBmIC0gaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVdGlsczoge1xyXG4gICAgICAgIExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcclxuICAgICAgICAgICAgdmFyIGZjID0gVGlueS5JbnRlcnBvbGF0aW9uLlV0aWxzLkZhY3RvcmlhbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGEgPSBbMV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzID0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYVtuXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhW25dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyAqPSBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGFbbl0gPSBzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKSxcclxuXHJcbiAgICAgICAgQ2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XHJcbiAgICAgICAgICAgIHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcclxuICAgICAgICAgICAgdmFyIHYxID0gKHAzIC0gcDEpICogMC41O1xyXG4gICAgICAgICAgICB2YXIgdDIgPSB0ICogdDtcclxuICAgICAgICAgICAgdmFyIHQzID0gdCAqIHQyO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0zICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVHdlZW5NYW5hZ2VyID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmJ1ZmZlckxpc3QgPSBbXTtcclxuICAgIHRoaXMuZ3JvdXAgPSBuZXcgX0dyb3VwKCk7XHJcbn07XHJcblxyXG5UaW55LlR3ZWVuTWFuYWdlci5wcm90b3R5cGUgPSB7XHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG4gICAgICAgIHRoaXMuZ3JvdXAucmVtb3ZlKHR3ZWVuKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55LlR3ZWVuKG9iaiwgdGhpcy5ncm91cCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJMaXN0Lmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcy5ncm91cC5fdHdlZW5zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyTGlzdC5wdXNoKHRoaXMuZ3JvdXAuX3R3ZWVuc1trXSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXAuX3R3ZWVuc1trXS5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVzdW1lKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyTGlzdFtpXS5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYnVmZmVyTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIHRoaXMuZ3JvdXAudXBkYXRlKGRlbHRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwidHdlZW5zXCIsIFRpbnkuVHdlZW5NYW5hZ2VyKTtcclxuIiwiVGlueS5SZW5kZXJUZXh0dXJlID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHJlbmRlcmVyLCByZXNvbHV0aW9uKSB7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgMTAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgMTAwO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgcmVzb2x1dGlvbiA9IHJlc29sdXRpb24gfHwgMTtcclxuXHJcbiAgICAvLyB0aGlzLmZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICAvLyB0aGlzLmNyb3AgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUgPSBuZXcgVGlueS5CYXNlVGV4dHVyZSgpO1xyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZS53aWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUuaGFzTG9hZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMudGV4dHVyZUJ1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcih0aGlzLndpZHRoICogcmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBUaW55LlRleHR1cmUuY2FsbChcclxuICAgICAgICB0aGlzLFxyXG4gICAgICAgIHRoaXMudGV4dHVyZUJ1ZmZlci5jYW52YXMsXHJcbiAgICAgICAgbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHJlc29sdXRpb24pLCBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogcmVzb2x1dGlvbikpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XHJcblxyXG4gICAgLy8gdGhpcy5oYXNMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlciB8fCBUaW55LmRlZmF1bHRSZW5kZXJlcjtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuVGV4dHVyZS5wcm90b3R5cGUpO1xyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5SZW5kZXJUZXh0dXJlO1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgdXBkYXRlQmFzZSkge1xyXG4gICAgaWYgKHdpZHRoID09PSB0aGlzLndpZHRoICYmIGhlaWdodCA9PT0gdGhpcy5oZWlnaHQpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gd2lkdGggPiAwICYmIGhlaWdodCA+IDA7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLmZyYW1lLndpZHRoID0gdGhpcy5jcm9wLndpZHRoID0gd2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICB0aGlzLmZyYW1lLmhlaWdodCA9IHRoaXMuY3JvcC5oZWlnaHQgPSBoZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgaWYgKHVwZGF0ZUJhc2UpIHtcclxuICAgICAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgICAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy52YWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZUJ1ZmZlci5yZXNpemUodGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy52YWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZUJ1ZmZlci5jbGVhcigpO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZGlzcGxheU9iamVjdCwgbWF0cml4LCBjbGVhcikge1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgdmFyIHd0ID0gZGlzcGxheU9iamVjdC53b3JsZFRyYW5zZm9ybTtcclxuICAgIHd0LmlkZW50aXR5KCk7XHJcbiAgICBpZiAobWF0cml4KSB3dC5hcHBlbmQobWF0cml4KTtcclxuXHJcbiAgICAvLyBzZXRXb3JsZCBBbHBoYSB0byBlbnN1cmUgdGhhdCB0aGUgb2JqZWN0IGlzIHJlbmRlcmVyIGF0IGZ1bGwgb3BhY2l0eVxyXG4gICAgZGlzcGxheU9iamVjdC53b3JsZEFscGhhID0gMTtcclxuXHJcbiAgICAvLyBUaW1lIHRvIHVwZGF0ZSBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSBkaXNwbGF5T2JqZWN0IHdpdGggdGhlIG5ldyBtYXRyaXguLlxyXG4gICAgdmFyIGNoaWxkcmVuID0gZGlzcGxheU9iamVjdC5jaGlsZHJlbjtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgIGNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbGVhcikgdGhpcy50ZXh0dXJlQnVmZmVyLmNsZWFyKCk7XHJcblxyXG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLnRleHR1cmVCdWZmZXIuY29udGV4dDtcclxuXHJcbiAgICB2YXIgcmVhbFJlc29sdXRpb24gPSB0aGlzLnJlbmRlcmVyLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyT2JqZWN0KGRpc3BsYXlPYmplY3QsIGNvbnRleHQpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbiA9IHJlYWxSZXNvbHV0aW9uO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5nZXRJbWFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1hZ2Uuc3JjID0gdGhpcy5nZXRCYXNlNjQoKTtcclxuICAgIHJldHVybiBpbWFnZTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0QmFzZTY0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FudmFzKCkudG9EYXRhVVJMKCk7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldENhbnZhcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRleHR1cmVCdWZmZXIuY2FudmFzO1xyXG59O1xyXG4iLCIvLyBUaW55LlRleHR1cmVDYWNoZSA9IHt9O1xyXG4vLyBUaW55LkZyYW1lQ2FjaGUgPSB7fTtcclxuVGlueS5UZXh0dXJlQ2FjaGVJZEdlbmVyYXRvciA9IDA7XHJcblRpbnkuVGV4dHVyZVNpbGVudEZhaWwgPSBmYWxzZTtcclxuXHJcblRpbnkuVGV4dHVyZSA9IGZ1bmN0aW9uIChzb3VyY2UsIGZyYW1lLCBjcm9wLCB0cmltKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgIHRoaXMubm9GcmFtZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IDE7XHJcblxyXG4gICAgdGhpcy5oYXNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoIWZyYW1lKSB7XHJcbiAgICAgICAgdGhpcy5ub0ZyYW1lID0gdHJ1ZTtcclxuICAgICAgICBmcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHNvdXJjZTtcclxuXHJcbiAgICAgICAgc291cmNlID0gVGlueS5DYWNoZS5pbWFnZVtrZXldO1xyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZSkgdGhyb3cgbmV3IEVycm9yKFwiQ2FjaGUgRXJyb3I6IGltYWdlIFwiICsga2V5ICsgXCIgZG9lc2B0IGZvdW5kIGluIGNhY2hlXCIpO1xyXG5cclxuICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVba2V5XSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG5cclxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZTtcclxuXHJcbiAgICB0aGlzLnRyaW0gPSB0cmltO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gMDtcclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IDA7XHJcblxyXG4gICAgdGhpcy5jcm9wID0gY3JvcCB8fCBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcblxyXG4gICAgaWYgKCh0aGlzLnNvdXJjZS5jb21wbGV0ZSB8fCB0aGlzLnNvdXJjZS5nZXRDb250ZXh0KSAmJiB0aGlzLnNvdXJjZS53aWR0aCAmJiB0aGlzLnNvdXJjZS5oZWlnaHQpIHtcclxuICAgICAgICB0aGlzLm9uU291cmNlTG9hZGVkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBzY29wZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zb3VyY2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5vblNvdXJjZUxvYWRlZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UZXh0dXJlO1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5vblNvdXJjZUxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaGFzTG9hZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMud2lkdGggPSB0aGlzLnNvdXJjZS5uYXR1cmFsV2lkdGggfHwgdGhpcy5zb3VyY2Uud2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuc291cmNlLm5hdHVyYWxIZWlnaHQgfHwgdGhpcy5zb3VyY2UuaGVpZ2h0O1xyXG5cclxuICAgIGlmICh0aGlzLm5vRnJhbWUpIHRoaXMuZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuc2V0RnJhbWUodGhpcy5mcmFtZSk7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLmFkZFRvQ2FjaGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBUaW55LkNhY2hlLnRleHR1cmVba2V5XSA9IHRoaXM7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmtleSkge1xyXG4gICAgICAgIGRlbGV0ZSBUaW55LkNhY2hlLnRleHR1cmVbdGhpcy5rZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc291cmNlID0gbnVsbDtcclxuICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuc2V0RnJhbWUgPSBmdW5jdGlvbiAoZnJhbWUpIHtcclxuICAgIHRoaXMubm9GcmFtZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZTtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gZnJhbWUgJiYgZnJhbWUud2lkdGggJiYgZnJhbWUuaGVpZ2h0ICYmIHRoaXMuc291cmNlICYmIHRoaXMuaGFzTG9hZGVkO1xyXG5cclxuICAgIGlmICghdGhpcy52YWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIHRoaXMud2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgIC8vIHRoaXMuaGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuY3JvcC54ID0gZnJhbWUueDtcclxuICAgIHRoaXMuY3JvcC55ID0gZnJhbWUueTtcclxuICAgIHRoaXMuY3JvcC53aWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgdGhpcy5jcm9wLmhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuXHJcbiAgICBpZiAoIXRoaXMudHJpbSAmJiAoZnJhbWUueCArIGZyYW1lLndpZHRoID4gdGhpcy53aWR0aCB8fCBmcmFtZS55ICsgZnJhbWUuaGVpZ2h0ID4gdGhpcy5oZWlnaHQpKSB7XHJcbiAgICAgICAgaWYgKCFUaW55LlRleHR1cmVTaWxlbnRGYWlsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRleHR1cmUgRXJyb3I6IGZyYW1lIGRvZXMgbm90IGZpdCBpbnNpZGUgdGhlIGJhc2UgVGV4dHVyZSBkaW1lbnNpb25zIFwiICsgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRyaW0pIHtcclxuICAgICAgICAvLyB0aGlzLndpZHRoID0gdGhpcy50cmltLndpZHRoO1xyXG4gICAgICAgIC8vIHRoaXMuaGVpZ2h0ID0gdGhpcy50cmltLmhlaWdodDtcclxuICAgICAgICB0aGlzLmZyYW1lLndpZHRoID0gdGhpcy50cmltLndpZHRoO1xyXG4gICAgICAgIHRoaXMuZnJhbWUuaGVpZ2h0ID0gdGhpcy50cmltLmhlaWdodDtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5mcm9tSW1hZ2UgPSBmdW5jdGlvbihrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbilcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtrZXldO1xyXG5cclxuLy8gICAgIGlmKCF0ZXh0dXJlKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKFRpbnkuQmFzZVRleHR1cmUuZnJvbUltYWdlKGtleSwgaW1hZ2VVcmwsIGNyb3Nzb3JpZ2luKSk7XHJcbi8vICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXlcclxuLy8gICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtrZXldID0gdGV4dHVyZTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5mcm9tRnJhbWUgPSBmdW5jdGlvbihmcmFtZUlkKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2ZyYW1lSWRdO1xyXG4vLyAgICAgaWYoIXRleHR1cmUpIHRocm93IG5ldyBFcnJvcignVGhlIGZyYW1lSWQgXCInICsgZnJhbWVJZCArICdcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdGV4dHVyZSBjYWNoZSAnKTtcclxuLy8gICAgIHJldHVybiB0ZXh0dXJlO1xyXG4vLyB9O1xyXG5cclxuVGlueS5UZXh0dXJlLmZyb21DYW52YXMgPSBmdW5jdGlvbiAoY2FudmFzKSB7XHJcbiAgICAvLyBpZighY2FudmFzLl90aW55SWQpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgY2FudmFzLl90aW55SWQgPSAnX2Zyb21fY2FudmFzXycgKyBUaW55LlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yKys7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdmFyIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbY2FudmFzLl90aW55SWRdO1xyXG5cclxuICAgIC8vIGlmKCF0ZXh0dXJlKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKCBjYW52YXMgKTtcclxuICAgIC8vICAgICBUaW55LkNhY2hlLnRleHR1cmVbY2FudmFzLl90aW55SWRdID0gdGV4dHVyZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyByZXR1cm4gdGV4dHVyZTtcclxuICAgIHJldHVybiBuZXcgVGlueS5UZXh0dXJlKGNhbnZhcyk7XHJcbn07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuYWRkVGV4dHVyZVRvQ2FjaGUgPSBmdW5jdGlvbih0ZXh0dXJlLCBpZClcclxuLy8ge1xyXG4vLyAgICAgVGlueS5UZXh0dXJlQ2FjaGVbaWRdID0gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5yZW1vdmVUZXh0dXJlRnJvbUNhY2hlID0gZnVuY3Rpb24oaWQpXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgZGVsZXRlIFRpbnkuVGV4dHVyZUNhY2hlW2lkXTtcclxuLy8gICAgIGRlbGV0ZSBUaW55LkJhc2VUZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07XHJcbiIsIlRpbnkuQ2FudmFzQnVmZmVyID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNCdWZmZXI7XHJcblxyXG5UaW55LkNhbnZhc0J1ZmZlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0J1ZmZlci5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbn07XHJcbiIsImZ1bmN0aW9uIEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5hID0gW107XHJcbiAgICB0aGlzLm4gPSAwO1xyXG59XHJcblxyXG5UaW55LkV2ZW50RW1pdHRlciA9IHtcclxuICAgIGNhbGw6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IG9iai5wcm90b3R5cGUgfHwgb2JqO1xyXG4gICAgICAgICAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbihvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWl4aW46IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnNfZXZlbnRzID0ge307XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHB1c2hMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdID0gbmV3IEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5hLnB1c2goZm4sIGNvbnRleHQgfHwgbnVsbCwgb25jZSB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5uICs9IDM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmoub25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4sIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgcHVzaExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm9uID0gcHVzaExpc3RlbmVyO1xyXG5cclxuICAgICAgICBvYmoub2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbiwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZuQXJyYXkgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XS5hO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmbikge1xyXG4gICAgICAgICAgICAgICAgZm5BcnJheS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZuQXJyYXkubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpXSA9PSBmbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmbkFycmF5W2ldID09IGZuICYmIGZuQXJyYXlbaSArIDFdID09IGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbkFycmF5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouZW1pdCA9IGZ1bmN0aW9uIChldmVudCwgYTEsIGEyLCBhMykge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZuQXJyYXkgPSBsaXN0ZW5lcnMuYTtcclxuICAgICAgICAgICAgbGlzdGVuZXJzLm4gPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBmbiwgY3R4O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aCAtIGxpc3RlbmVycy5uOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgIGZuID0gZm5BcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGN0eCA9IGZuQXJyYXlbaSArIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmbkFycmF5W2kgKyAyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGVuIDw9IDEpIGZuLmNhbGwoY3R4KTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxlbiA9PSAyKSBmbi5jYWxsKGN0eCwgYTEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGVuID09IDMpIGZuLmNhbGwoY3R4LCBhMSwgYTIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBmbi5jYWxsKGN0eCwgYTEsIGEyLCBhMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGZuQXJyYXlbaSArIDJdKVxyXG4gICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZuQXJyYXkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcbiIsImlmICghRGF0ZS5ub3cpIHtcclxuICBEYXRlLm5vdyA9IGZ1bmN0aW9uIG5vdygpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICB9O1xyXG59XHJcblxyXG5pZiAodHlwZW9mIEZsb2F0MzJBcnJheSA9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgd2luZG93LkZsb2F0MzJBcnJheSA9IEFycmF5O1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKFwiLi9taW5pLmpzXCIpO1xyXG5cclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL09iamVjdENyZWF0b3IuanMnKTsgLy8gMSBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvTG9hZGVyLmpzJyk7IC8vIDMgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL0lucHV0LmpzJyk7IC8vIDEgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL1RpbWVyLmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9Ud2Vlbi5qc1wiKTtcclxuXHJcbnJlcXVpcmUoXCIuL21hdGgvUm91bmRlZFJlY3RhbmdsZS5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vbWF0aC9Qb2x5Z29uLmpzXCIpOyAvL1xyXG5yZXF1aXJlKFwiLi9tYXRoL0NpcmNsZS5qc1wiKTsgLy8gNiBLYlxyXG5cclxucmVxdWlyZShcIi4vcmVuZGVyZXJzL0dyYXBoaWNzUmVuZGVyZXIuanNcIik7IC8vIDRLYlxyXG5cclxucmVxdWlyZShcIi4vb2JqZWN0cy9HcmFwaGljcy5qc1wiKTsgLy8gMTAgS2JcclxuLy8gcmVxdWlyZSgnLi9vYmplY3RzL1RpbGluZ1Nwcml0ZS5qcycpOyAvLyA0IEtiICAgIyMjIyMjIyMjIyMjIyMjIFRpbGluZ1Nwcml0ZSAgZ2FtZS5hZGQudGlsZXNwcml0ZVxyXG5cclxucmVxdWlyZShcIi4vdGV4dHVyZXMvUmVuZGVyVGV4dHVyZS5qc1wiKTsgLy8gMiBLYlxyXG5cclxucmVxdWlyZShcIi4vdXRpbHMvQ2FudmFzQnVmZmVyLmpzXCIpOyAvLyAxIEtiXHJcbnJlcXVpcmUoXCIuL3JlbmRlcmVycy9DYW52YXNNYXNrTWFuYWdlci5qc1wiKTsgLy8gMUtiXHJcbnJlcXVpcmUoXCIuL3JlbmRlcmVycy9DYW52YXNUaW50ZXIuanNcIik7IC8vIDMgS2IgIyMjIyMjIyMjIyMjIyMjIyB0aW50IGZ1bmN0aW9uXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==