/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ (function() {

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
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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

// Object.defineProperty(Tiny.Sprite.prototype, 'frame', {
//     get: function () {
//         return this._frame;
//     },

//     set: function (value) {
//         if (this.texture.lastFrame) {
//             this._frame = value;
//             if (this._frame > this.texture.lastFrame) this._frame = 0;
//             else if (this._frame < 0) this._frame = this.texture.lastFrame;
//             this.setTexture(Tiny.Cache.texture[this.texture.key + '.' + this._frame]);
//         }
//     }
// });

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

Tiny.Sprite.prototype.setTexture = function (texture, frameName, updateDimension) {
    if (typeof texture == 'string') {
        var imagePath = texture;

        if (frameName != undefined) {
            imagePath = imagePath + '.' + frameName;
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

// Tiny.Sprite.prototype.animate = function (delay, yoyo) {
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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
                    name: i,
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
                    name: i,
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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
        this.update(Infinity);
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
/***/ (function() {

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
/***/ (function() {

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

    if (typeof source == 'string') {
        var key = source;

        source = Tiny.Cache.image[key];

        if (!source) throw new Error('Cache Error: image ' + key + ' does`t found in cache');

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

Tiny.Texture.prototype.addToCache = function (key, frameName) {
    this.key = this.key || key;
    this.frame.name = this.frame.name || frameName;

    if (this.frame.name) key += '.' + this.frame.name;

    Tiny.Cache.texture[key] = this;
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
            throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);
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
/***/ (function() {

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
/***/ (function() {

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
/***/ (function() {

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
!function() {
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

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlueS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDJCQUEyQjtBQUNuRDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pKQSxtQkFBTyxDQUFDLG9EQUFxQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLDhCQUFVO0FBQ2xCLG1CQUFPLENBQUMsb0NBQWE7QUFDckIsbUJBQU8sQ0FBQywwQ0FBZ0IsR0FBRztBQUMzQixtQkFBTyxDQUFDLDRDQUFpQixHQUFHO0FBQzVCLG1CQUFPLENBQUMsOENBQWtCLEdBQUc7QUFDN0IsbUJBQU8sQ0FBQyxvREFBcUIsR0FBRztBQUNoQztBQUNBLG1CQUFPLENBQUMsZ0VBQTJCLEdBQUc7QUFDdEMsbUJBQU8sQ0FBQyx3REFBdUIsR0FBRztBQUNsQyxtQkFBTyxDQUFDLGtEQUFvQixHQUFHO0FBQy9CO0FBQ0EsbUJBQU8sQ0FBQyx3RUFBK0IsR0FBRzs7Ozs7Ozs7Ozs7QUNmMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlCQUF5QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxTQUFTO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQzlJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvQkEsbUJBQU8sQ0FBQyxnQ0FBVztBQUNuQjtBQUNBLG1CQUFPLENBQUMsOENBQWtCLEdBQUc7QUFDN0IsMENBQTBDO0FBQzFDLG1CQUFPLENBQUMsb0RBQXFCLEdBQUc7QUFDaEMsbUJBQU8sQ0FBQyxrREFBb0IsR0FBRztBQUMvQixtQkFBTyxDQUFDLGtEQUFvQixHQUFHO0FBQy9CO0FBQ0EsbUJBQU8sQ0FBQyw0REFBeUI7QUFDakM7QUFDQSxtQkFBTyxDQUFDLHdEQUF1QixHQUFHO0FBQ2xDO0FBQ0EsbUJBQU8sQ0FBQyxvREFBcUIsR0FBRztBQUNoQyxtQkFBTyxDQUFDLGdEQUFtQixHQUFHOzs7Ozs7Ozs7OztBQ2I5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUY7QUFDekY7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7Ozs7OztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDhCQUE4QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxtQkFBbUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQzV2QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDalZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDLHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkMsd0JBQXdCLFVBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHlCQUF5QjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQywwQkFBMEI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCwwQkFBMEI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0JBQStCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsK0JBQStCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELFFBQVE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBLDZDQUE2Qyx5QkFBeUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QseUJBQXlCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDblBBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsV0FBVztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IscURBQXFEO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFCQUFxQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHVFQUF1RSxzQkFBc0I7QUFDN0Y7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzQkFBc0I7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCLDRCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsT0FBTztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsZ0NBQWdDLG9CQUFvQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrQ0FBa0M7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLG1CQUFPLENBQUMsZ0NBQVc7QUFDbkI7QUFDQSwwQ0FBMEM7QUFDMUMsbUNBQW1DO0FBQ25DLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsbUJBQU8sQ0FBQyxrREFBb0I7QUFDNUI7QUFDQSxtQkFBTyxDQUFDLGtFQUE0QixHQUFHO0FBQ3ZDLG1CQUFPLENBQUMsZ0RBQW1CLEdBQUc7QUFDOUIsbUJBQU8sQ0FBQyw4Q0FBa0IsR0FBRztBQUM3QjtBQUNBLG1CQUFPLENBQUMsNEVBQWlDLEdBQUc7QUFDNUM7QUFDQSxtQkFBTyxDQUFDLHdEQUF1QixHQUFHO0FBQ2xDLHlDQUF5QztBQUN6QztBQUNBLG1CQUFPLENBQUMsb0VBQTZCLEdBQUc7QUFDeEM7QUFDQSxtQkFBTyxDQUFDLDREQUF5QixHQUFHO0FBQ3BDLG1CQUFPLENBQUMsOEVBQWtDLEdBQUc7QUFDN0MsbUJBQU8sQ0FBQyxvRUFBNkIsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9DaXJjbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvTWF0aC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9NYXRyaXguanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUG9seWdvbi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9SZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUm91bmRlZFJlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWluaS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvb2JqZWN0cy9CYXNlT2JqZWN0MkQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvR3JhcGhpY3MuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvT2JqZWN0MkQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvU2NlbmUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvU3ByaXRlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL1RleHQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3JlbmRlcmVycy9DYW52YXNNYXNrTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvcmVuZGVyZXJzL0NhbnZhc1JlbmRlcmVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9yZW5kZXJlcnMvQ2FudmFzVGludGVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9yZW5kZXJlcnMvR3JhcGhpY3NSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9JbnB1dC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9Mb2FkZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvUkFGLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL1RpbWVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL1R3ZWVuLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy90ZXh0dXJlcy9UZXh0dXJlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy91dGlscy9DYW52YXNCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3V0aWxzL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdXRpbHMvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVGlueS5BcHAgPSBmdW5jdGlvbiAoc3RhdGVzKSB7XHJcbiAgICB0aGlzLmNhbGxiYWNrQ29udGV4dCA9IHRoaXM7XHJcbiAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgIHRoaXMudGltZVNjYWxlID0gMTtcclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5zeXN0ZW1zID0gW107XHJcbiAgICB0aGlzLnVwZGF0YWJsZSA9IFtdO1xyXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VEdXJhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmlucHV0VmlldyA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgaWYgKCFUaW55LmFwcCkgVGlueS5hcHAgPSB0aGlzO1xyXG5cclxuICAgIGlmIChUaW55LkV2ZW50RW1pdHRlcikgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4odGhpcyk7XHJcblxyXG4gICAgc3RhdGVzID0gc3RhdGVzIHx8IHt9O1xyXG4gICAgdGhpcy5ib290ID0gc3RhdGVzLmJvb3QgfHwgdGhpcy5ib290IHx8IG5vb3A7XHJcbiAgICB0aGlzLnByZWxvYWQgPSBzdGF0ZXMucHJlbG9hZCB8fCB0aGlzLnByZWxvYWQgfHwgbm9vcDtcclxuICAgIHRoaXMuY3JlYXRlID0gc3RhdGVzLmNyZWF0ZSB8fCB0aGlzLmNyZWF0ZSB8fCBub29wO1xyXG4gICAgdGhpcy51cGRhdGUgPSBzdGF0ZXMudXBkYXRlIHx8IHRoaXMudXBkYXRlIHx8IG5vb3A7XHJcbiAgICB0aGlzLnJlbmRlciA9IHN0YXRlcy5yZW5kZXIgfHwgdGhpcy5yZW5kZXIgfHwgbm9vcDtcclxuICAgIHRoaXMuX3Jlc2l6ZV9jYiA9IHN0YXRlcy5yZXNpemUgfHwgbm9vcDtcclxuICAgIHRoaXMuX2Rlc3Ryb3lfY2IgPSBzdGF0ZXMuZGVzdHJveSB8fCBub29wO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX2Jvb3QoKTtcclxuICAgIH0sIDApO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl9ib290ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUaW55LnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgc3lzdGVtID0gVGlueS5zeXN0ZW1zW2ldO1xyXG5cclxuICAgICAgICB2YXIgX3N5c18gPSBuZXcgc3lzdGVtLl9jbGFzc18odGhpcyk7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1zLnB1c2goX3N5c18pO1xyXG4gICAgICAgIGlmIChfc3lzXy51cGRhdGUpIHRoaXMudXBkYXRhYmxlLnB1c2goX3N5c18pO1xyXG5cclxuICAgICAgICBpZiAoc3lzdGVtLm5hbWUpIHRoaXNbc3lzdGVtLm5hbWVdID0gX3N5c187XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFRpbnkuUkFGKSB7XHJcbiAgICAgICAgdGhpcy5yYWYgPSBuZXcgVGlueS5SQUYodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ib290LmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChzZWxmLmxvYWQpIHNlbGYuX3ByZWxvYWQoKTtcclxuICAgICAgICBlbHNlIHNlbGYuX2NyZWF0ZSgpO1xyXG4gICAgfSwgMCk7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuX3ByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnByZWxvYWQuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcbiAgICB0aGlzLnN0YXRlID0gMTtcclxuICAgIHRoaXMubG9hZC5zdGFydCh0aGlzLl9jcmVhdGUpO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl9jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmVtaXQoXCJsb2FkXCIpO1xyXG4gICAgdGhpcy5jcmVhdGUuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcblxyXG4gICAgaWYgKHRoaXMucmFmKSB7XHJcbiAgICAgICAgdGhpcy5yYWYuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXRlID0gMjtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnJhZikge1xyXG4gICAgICAgIHRoaXMucmFmLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN5c3RlbXNbaV0ucGF1c2UpIHRoaXMuc3lzdGVtc1tpXS5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnJhZikge1xyXG4gICAgICAgIHRoaXMucmFmLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3lzdGVtc1tpXS5yZXN1bWUpIHRoaXMuc3lzdGVtc1tpXS5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uICh0aW1lLCBkZWx0YSkge1xyXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgIGRlbHRhICo9IHRoaXMudGltZVNjYWxlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQsIHRpbWUsIGRlbHRhKTtcclxuICAgICAgICB0aGlzLmVtaXQoXCJ1cGRhdGVcIiwgZGVsdGEpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudXBkYXRhYmxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRhYmxlW2ldLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhdXNlRHVyYXRpb24gKz0gZGVsdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIHRoaXMuZW1pdChcInBvc3RyZW5kZXJcIik7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCB0aGlzLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzaXplX2NiLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmVtaXQoXCJyZXNpemVcIiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuaW5wdXQpIHNlbGYuaW5wdXQudXBkYXRlQm91bmRzKCk7XHJcbiAgICB9LCAwKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGNsZWFyQ2FjaGUpIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLnN5c3RlbXNbaV0uZGVzdHJveSkgdGhpcy5zeXN0ZW1zW2ldLmRlc3Ryb3koY2xlYXJDYWNoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG5cclxuICAgIGlmIChjbGVhckNhY2hlKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmNsZWFyQ2FjaGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yYWYpIHtcclxuICAgICAgICB0aGlzLnJhZi5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZGVzdHJveV9jYi5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuXHJcbiAgICBpZiAoVGlueS5hcHAgPT09IHRoaXMpIFRpbnkuYXBwID0gbnVsbDtcclxufTtcclxuIiwicmVxdWlyZShcIi4vdXRpbHMvcG9seWZpbGwuanNcIik7XHJcblxyXG53aW5kb3cuVGlueSA9IHt9O1xyXG5cclxucmVxdWlyZShcIi4vQXBwLmpzXCIpO1xyXG5yZXF1aXJlKFwiLi9nbG9iYWwuanNcIik7XHJcbnJlcXVpcmUoXCIuL21hdGgvTWF0aC5qc1wiKTsgLy8gMSBLYlxyXG5yZXF1aXJlKFwiLi9tYXRoL1BvaW50LmpzXCIpOyAvL1xyXG5yZXF1aXJlKFwiLi9tYXRoL01hdHJpeC5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vbWF0aC9SZWN0YW5nbGUuanNcIik7IC8vICA4IEtiXHJcblxyXG5yZXF1aXJlKFwiLi9vYmplY3RzL0Jhc2VPYmplY3QyRC5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vb2JqZWN0cy9PYmplY3QyRC5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vb2JqZWN0cy9TY2VuZS5qc1wiKTsgLy8gMTAgS2JcclxuXHJcbnJlcXVpcmUoXCIuL3JlbmRlcmVycy9DYW52YXNSZW5kZXJlci5qc1wiKTsgLy8gMyBLYlxyXG4iLCJUaW55LlZFUlNJT04gPSAnMi4xLjEyJztcclxuXHJcblRpbnkuc3lzdGVtcyA9IFtdO1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbSA9IGZ1bmN0aW9uIChuYW1lLCBzeXN0ZW0pIHtcclxuICAgIFRpbnkuc3lzdGVtcy5wdXNoKHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIF9jbGFzc186IHN5c3RlbVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5UaW55LlByaW1pdGl2ZXMgPSB7XHJcbiAgICBQT0xZOiAwLFxyXG4gICAgUkVDVDogMSxcclxuICAgIENJUkM6IDIsXHJcbiAgICBFTElQOiAzLFxyXG4gICAgUlJFQzogNCxcclxuICAgIFJSRUNfTEpPSU46IDVcclxufTtcclxuXHJcblRpbnkucm5kID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcclxufTtcclxuXHJcblRpbnkuc3R5bGUyaGV4ID0gZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICByZXR1cm4gK2NvbG9yLnJlcGxhY2UoJyMnLCAnMHgnKTtcclxufTtcclxuXHJcblRpbnkuaGV4MnN0eWxlID0gZnVuY3Rpb24gKGhleCkge1xyXG4gICAgcmV0dXJuICcjJyArICgnMDAwMDAnICsgKGhleCB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxufTtcclxuXHJcblRpbnkuaGV4MnJnYiA9IGZ1bmN0aW9uIChoZXgpIHtcclxuICAgIHJldHVybiBbKChoZXggPj4gMTYpICYgMHhmZikgLyAyNTUsICgoaGV4ID4+IDgpICYgMHhmZikgLyAyNTUsIChoZXggJiAweGZmKSAvIDI1NV07XHJcbn07XHJcblxyXG5UaW55LnJnYjJoZXggPSBmdW5jdGlvbiAocmdiKSB7XHJcbiAgICByZXR1cm4gKChyZ2JbMF0gKiAyNTUpIDw8IDE2KSArICgocmdiWzFdICogMjU1KSA8PCA4KSArIHJnYlsyXSAqIDI1NTtcclxufTtcclxuIiwiVGlueS5DaXJjbGUgPSBmdW5jdGlvbiAoeCwgeSwgZGlhbWV0ZXIpIHtcclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgZGlhbWV0ZXIgPSBkaWFtZXRlciB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcblxyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB0aGlzLl9kaWFtZXRlciA9IGRpYW1ldGVyO1xyXG5cclxuICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcblxyXG4gICAgaWYgKGRpYW1ldGVyID4gMCkge1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IGRpYW1ldGVyICogMC41O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5DSVJDO1xyXG59O1xyXG5cclxuVGlueS5DaXJjbGUucHJvdG90eXBlID0ge1xyXG4gICAgZ2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55LlJlY3RhbmdsZSh0aGlzLnggLSB0aGlzLnJhZGl1cywgdGhpcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMuZGlhbWV0ZXIsIHRoaXMuZGlhbWV0ZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHgsIHksIGRpYW1ldGVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuX2RpYW1ldGVyID0gZGlhbWV0ZXI7XHJcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gZGlhbWV0ZXIgKiAwLjU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb3B5RnJvbTogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldFRvKHNvdXJjZS54LCBzb3VyY2UueSwgc291cmNlLmRpYW1ldGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgY29weVRvOiBmdW5jdGlvbiAoZGVzdCkge1xyXG4gICAgICAgIGRlc3QueCA9IHRoaXMueDtcclxuICAgICAgICBkZXN0LnkgPSB0aGlzLnk7XHJcbiAgICAgICAgZGVzdC5kaWFtZXRlciA9IHRoaXMuX2RpYW1ldGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVzdDtcclxuICAgIH0sXHJcblxyXG4gICAgZGlzdGFuY2U6IGZ1bmN0aW9uIChkZXN0LCByb3VuZCkge1xyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IFRpbnkuTWF0aC5kaXN0YW5jZSh0aGlzLngsIHRoaXMueSwgZGVzdC54LCBkZXN0LnkpO1xyXG4gICAgICAgIHJldHVybiByb3VuZCA/IE1hdGgucm91bmQoZGlzdGFuY2UpIDogZGlzdGFuY2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09IFwidW5kZWZpbmVkXCIgfHwgb3V0cHV0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG5ldyBUaW55LkNpcmNsZSh0aGlzLngsIHRoaXMueSwgdGhpcy5kaWFtZXRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0cHV0LnNldFRvKHRoaXMueCwgdGhpcy55LCB0aGlzLmRpYW1ldGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHJldHVybiBUaW55LkNpcmNsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuICAgIH0sXHJcblxyXG4gICAgb2Zmc2V0OiBmdW5jdGlvbiAoZHgsIGR5KSB7XHJcbiAgICAgICAgdGhpcy54ICs9IGR4O1xyXG4gICAgICAgIHRoaXMueSArPSBkeTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9mZnNldFBvaW50OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXQocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkNpcmNsZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiZGlhbWV0ZXJcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpYW1ldGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWUgKiAwLjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwicmFkaXVzXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSB2YWx1ZSAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwibGVmdFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54IC0gdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMueCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnggLSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJyaWdodFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IHRoaXMueCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB2YWx1ZSAtIHRoaXMueDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJ0b3BcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSAtIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLnkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdGhpcy55IC0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiYm90dG9tXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHZhbHVlIC0gdGhpcy55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImFyZWFcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JhZGl1cyA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguUEkgKiB0aGlzLl9yYWRpdXMgKiB0aGlzLl9yYWRpdXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiZW1wdHlcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpYW1ldGVyID09PSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKDAsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LkNpcmNsZS5jb250YWlucyA9IGZ1bmN0aW9uIChhLCB4LCB5KSB7XHJcbiAgICAvLyAgQ2hlY2sgaWYgeC95IGFyZSB3aXRoaW4gdGhlIGJvdW5kcyBmaXJzdFxyXG4gICAgaWYgKGEucmFkaXVzID4gMCAmJiB4ID49IGEubGVmdCAmJiB4IDw9IGEucmlnaHQgJiYgeSA+PSBhLnRvcCAmJiB5IDw9IGEuYm90dG9tKSB7XHJcbiAgICAgICAgdmFyIGR4ID0gKGEueCAtIHgpICogKGEueCAtIHgpO1xyXG4gICAgICAgIHZhciBkeSA9IChhLnkgLSB5KSAqIChhLnkgLSB5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGR4ICsgZHkgPD0gYS5yYWRpdXMgKiBhLnJhZGl1cztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DaXJjbGUuZXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIHJldHVybiBhLnggPT0gYi54ICYmIGEueSA9PSBiLnkgJiYgYS5kaWFtZXRlciA9PSBiLmRpYW1ldGVyO1xyXG59O1xyXG5cclxuVGlueS5DaXJjbGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICByZXR1cm4gVGlueS5NYXRoLmRpc3RhbmNlKGEueCwgYS55LCBiLngsIGIueSkgPD0gYS5yYWRpdXMgKyBiLnJhZGl1cztcclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLmludGVyc2VjdHNSZWN0YW5nbGUgPSBmdW5jdGlvbiAoYywgcikge1xyXG4gICAgdmFyIGN4ID0gTWF0aC5hYnMoYy54IC0gci54IC0gci5oYWxmV2lkdGgpO1xyXG4gICAgdmFyIHhEaXN0ID0gci5oYWxmV2lkdGggKyBjLnJhZGl1cztcclxuXHJcbiAgICBpZiAoY3ggPiB4RGlzdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY3kgPSBNYXRoLmFicyhjLnkgLSByLnkgLSByLmhhbGZIZWlnaHQpO1xyXG4gICAgdmFyIHlEaXN0ID0gci5oYWxmSGVpZ2h0ICsgYy5yYWRpdXM7XHJcblxyXG4gICAgaWYgKGN5ID4geURpc3QpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN4IDw9IHIuaGFsZldpZHRoIHx8IGN5IDw9IHIuaGFsZkhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB4Q29ybmVyRGlzdCA9IGN4IC0gci5oYWxmV2lkdGg7XHJcbiAgICB2YXIgeUNvcm5lckRpc3QgPSBjeSAtIHIuaGFsZkhlaWdodDtcclxuICAgIHZhciB4Q29ybmVyRGlzdFNxID0geENvcm5lckRpc3QgKiB4Q29ybmVyRGlzdDtcclxuICAgIHZhciB5Q29ybmVyRGlzdFNxID0geUNvcm5lckRpc3QgKiB5Q29ybmVyRGlzdDtcclxuICAgIHZhciBtYXhDb3JuZXJEaXN0U3EgPSBjLnJhZGl1cyAqIGMucmFkaXVzO1xyXG5cclxuICAgIHJldHVybiB4Q29ybmVyRGlzdFNxICsgeUNvcm5lckRpc3RTcSA8PSBtYXhDb3JuZXJEaXN0U3E7XHJcbn07XHJcbiIsIlRpbnkuTWF0aCA9IHtcclxuICAgIGRpc3RhbmNlOiBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgICAgICB2YXIgZHggPSB4MSAtIHgyO1xyXG4gICAgICAgIHZhciBkeSA9IHkxIC0geTI7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvciA9IE1hdGguUEkgLyAxODA7XHJcbnZhciByYWRpYW5Ub0RlZ3JlZXNGYWN0b3IgPSAxODAgLyBNYXRoLlBJO1xyXG5cclxuVGlueS5NYXRoLmRlZ1RvUmFkID0gZnVuY3Rpb24gZGVnVG9SYWQoZGVncmVlcykge1xyXG4gICAgcmV0dXJuIGRlZ3JlZXMgKiBkZWdyZWVUb1JhZGlhbnNGYWN0b3I7XHJcbn07XHJcblxyXG5UaW55Lk1hdGgucmFkVG9EZWcgPSBmdW5jdGlvbiByYWRUb0RlZyhyYWRpYW5zKSB7XHJcbiAgICByZXR1cm4gcmFkaWFucyAqIHJhZGlhblRvRGVncmVlc0ZhY3RvcjtcclxufTtcclxuIiwiVGlueS5NYXRyaXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmEgPSAxO1xyXG5cclxuICAgIHRoaXMuYiA9IDA7XHJcblxyXG4gICAgdGhpcy5jID0gMDtcclxuXHJcbiAgICB0aGlzLmQgPSAxO1xyXG5cclxuICAgIHRoaXMudHggPSAwO1xyXG5cclxuICAgIHRoaXMudHkgPSAwO1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuTUFUUklYO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmZyb21BcnJheSA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgdGhpcy5hID0gYXJyYXlbMF07XHJcbiAgICB0aGlzLmIgPSBhcnJheVsxXTtcclxuICAgIHRoaXMuYyA9IGFycmF5WzNdO1xyXG4gICAgdGhpcy5kID0gYXJyYXlbNF07XHJcbiAgICB0aGlzLnR4ID0gYXJyYXlbMl07XHJcbiAgICB0aGlzLnR5ID0gYXJyYXlbNV07XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICh0cmFuc3Bvc2UpIHtcclxuICAgIGlmICghdGhpcy5hcnJheSkge1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XHJcblxyXG4gICAgaWYgKHRyYW5zcG9zZSkge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5iO1xyXG4gICAgICAgIGFycmF5WzJdID0gMDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYztcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IDA7XHJcbiAgICAgICAgYXJyYXlbNl0gPSB0aGlzLnR4O1xyXG4gICAgICAgIGFycmF5WzddID0gdGhpcy50eTtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5jO1xyXG4gICAgICAgIGFycmF5WzJdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbNl0gPSAwO1xyXG4gICAgICAgIGFycmF5WzddID0gMDtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24gKHBvcywgbmV3UG9zKSB7XHJcbiAgICBuZXdQb3MgPSBuZXdQb3MgfHwgbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB2YXIgeCA9IHBvcy54O1xyXG4gICAgdmFyIHkgPSBwb3MueTtcclxuXHJcbiAgICBuZXdQb3MueCA9IHRoaXMuYSAqIHggKyB0aGlzLmMgKiB5ICsgdGhpcy50eDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5iICogeCArIHRoaXMuZCAqIHkgKyB0aGlzLnR5O1xyXG5cclxuICAgIHJldHVybiBuZXdQb3M7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwbHlJbnZlcnNlID0gZnVuY3Rpb24gKHBvcywgbmV3UG9zKSB7XHJcbiAgICBuZXdQb3MgPSBuZXdQb3MgfHwgbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB2YXIgaWQgPSAxIC8gKHRoaXMuYSAqIHRoaXMuZCArIHRoaXMuYyAqIC10aGlzLmIpO1xyXG4gICAgdmFyIHggPSBwb3MueDtcclxuICAgIHZhciB5ID0gcG9zLnk7XHJcblxyXG4gICAgbmV3UG9zLnggPSB0aGlzLmQgKiBpZCAqIHggKyAtdGhpcy5jICogaWQgKiB5ICsgKHRoaXMudHkgKiB0aGlzLmMgLSB0aGlzLnR4ICogdGhpcy5kKSAqIGlkO1xyXG4gICAgbmV3UG9zLnkgPSB0aGlzLmEgKiBpZCAqIHkgKyAtdGhpcy5iICogaWQgKiB4ICsgKC10aGlzLnR5ICogdGhpcy5hICsgdGhpcy50eCAqIHRoaXMuYikgKiBpZDtcclxuXHJcbiAgICByZXR1cm4gbmV3UG9zO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLnR4ICs9IHg7XHJcbiAgICB0aGlzLnR5ICs9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdGhpcy5hICo9IHg7XHJcbiAgICB0aGlzLmQgKj0geTtcclxuICAgIHRoaXMuYyAqPSB4O1xyXG4gICAgdGhpcy5iICo9IHk7XHJcbiAgICB0aGlzLnR4ICo9IHg7XHJcbiAgICB0aGlzLnR5ICo9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgdmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcclxuXHJcbiAgICB2YXIgYTEgPSB0aGlzLmE7XHJcbiAgICB2YXIgYzEgPSB0aGlzLmM7XHJcbiAgICB2YXIgdHgxID0gdGhpcy50eDtcclxuXHJcbiAgICB0aGlzLmEgPSBhMSAqIGNvcyAtIHRoaXMuYiAqIHNpbjtcclxuICAgIHRoaXMuYiA9IGExICogc2luICsgdGhpcy5iICogY29zO1xyXG4gICAgdGhpcy5jID0gYzEgKiBjb3MgLSB0aGlzLmQgKiBzaW47XHJcbiAgICB0aGlzLmQgPSBjMSAqIHNpbiArIHRoaXMuZCAqIGNvcztcclxuICAgIHRoaXMudHggPSB0eDEgKiBjb3MgLSB0aGlzLnR5ICogc2luO1xyXG4gICAgdGhpcy50eSA9IHR4MSAqIHNpbiArIHRoaXMudHkgKiBjb3M7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgdmFyIGExID0gdGhpcy5hO1xyXG4gICAgdmFyIGIxID0gdGhpcy5iO1xyXG4gICAgdmFyIGMxID0gdGhpcy5jO1xyXG4gICAgdmFyIGQxID0gdGhpcy5kO1xyXG5cclxuICAgIHRoaXMuYSA9IG1hdHJpeC5hICogYTEgKyBtYXRyaXguYiAqIGMxO1xyXG4gICAgdGhpcy5iID0gbWF0cml4LmEgKiBiMSArIG1hdHJpeC5iICogZDE7XHJcbiAgICB0aGlzLmMgPSBtYXRyaXguYyAqIGExICsgbWF0cml4LmQgKiBjMTtcclxuICAgIHRoaXMuZCA9IG1hdHJpeC5jICogYjEgKyBtYXRyaXguZCAqIGQxO1xyXG5cclxuICAgIHRoaXMudHggPSBtYXRyaXgudHggKiBhMSArIG1hdHJpeC50eSAqIGMxICsgdGhpcy50eDtcclxuICAgIHRoaXMudHkgPSBtYXRyaXgudHggKiBiMSArIG1hdHJpeC50eSAqIGQxICsgdGhpcy50eTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5pZGVudGl0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYSA9IDE7XHJcbiAgICB0aGlzLmIgPSAwO1xyXG4gICAgdGhpcy5jID0gMDtcclxuICAgIHRoaXMuZCA9IDE7XHJcbiAgICB0aGlzLnR4ID0gMDtcclxuICAgIHRoaXMudHkgPSAwO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5pZGVudGl0eU1hdHJpeCA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4iLCJUaW55LlBvaW50ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgIHRoaXMueSA9IHkgfHwgMDtcclxufTtcclxuXHJcblRpbnkuUG9pbnQucHJvdG90eXBlID0ge1xyXG4gICAgc2V0OiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8ICh5ICE9PSAwID8gdGhpcy54IDogMCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlBvbHlnb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFyZWEgPSAwO1xyXG4gICAgdGhpcy5fcG9pbnRzID0gW107XHJcblxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5zZXRUby5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLlBPTFk7XHJcbn07XHJcblxyXG5UaW55LlBvbHlnb24ucHJvdG90eXBlID0ge1xyXG4gICAgdG9OdW1iZXJBcnJheTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9wb2ludHNbaV0gPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXS54KTtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH0sXHJcblxyXG4gICAgZmxhdHRlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMudG9OdW1iZXJBcnJheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5fcG9pbnRzLnNsaWNlKCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiIHx8IG91dHB1dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5Qb2x5Z29uKHBvaW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0cHV0LnNldFRvKHBvaW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5fcG9pbnRzLmxlbmd0aDtcclxuICAgICAgICB2YXIgaW5zaWRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAtMSwgaiA9IGxlbmd0aCAtIDE7ICsraSA8IGxlbmd0aDsgaiA9IGkpIHtcclxuICAgICAgICAgICAgdmFyIGl4ID0gdGhpcy5fcG9pbnRzW2ldLng7XHJcbiAgICAgICAgICAgIHZhciBpeSA9IHRoaXMuX3BvaW50c1tpXS55O1xyXG5cclxuICAgICAgICAgICAgdmFyIGp4ID0gdGhpcy5fcG9pbnRzW2pdLng7XHJcbiAgICAgICAgICAgIHZhciBqeSA9IHRoaXMuX3BvaW50c1tqXS55O1xyXG5cclxuICAgICAgICAgICAgaWYgKCgoaXkgPD0geSAmJiB5IDwgankpIHx8IChqeSA8PSB5ICYmIHkgPCBpeSkpICYmIHggPCAoKGp4IC0gaXgpICogKHkgLSBpeSkpIC8gKGp5IC0gaXkpICsgaXgpIHtcclxuICAgICAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnNpZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRvOiBmdW5jdGlvbiAocG9pbnRzKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhID0gMDtcclxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vICBJZiBwb2ludHMgaXNuJ3QgYW4gYXJyYXksIHVzZSBhcmd1bWVudHMgYXMgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwb2ludHMpKSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgeTAgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsbG93cyBmb3IgbWl4ZWQtdHlwZSBhcmd1bWVudHNcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludHNbaV0gPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBUaW55LlBvaW50KHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBUaW55LlBvaW50KHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9pbnRzLnB1c2gocCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gIExvd2VzdCBib3VuZGFyeVxyXG4gICAgICAgICAgICAgICAgaWYgKHAueSA8IHkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTAgPSBwLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQXJlYSh5MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2FsY3VsYXRlQXJlYTogZnVuY3Rpb24gKHkwKSB7XHJcbiAgICAgICAgdmFyIHAxO1xyXG4gICAgICAgIHZhciBwMjtcclxuICAgICAgICB2YXIgYXZnSGVpZ2h0O1xyXG4gICAgICAgIHZhciB3aWR0aDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX3BvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBwMSA9IHRoaXMuX3BvaW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuX3BvaW50c1swXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5fcG9pbnRzW2kgKyAxXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXZnSGVpZ2h0ID0gKHAxLnkgLSB5MCArIChwMi55IC0geTApKSAvIDI7XHJcbiAgICAgICAgICAgIHdpZHRoID0gcDEueCAtIHAyLng7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSArPSBhdmdIZWlnaHQgKiB3aWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmFyZWE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlBvbHlnb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5Qb2x5Z29uO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUG9seWdvbi5wcm90b3R5cGUsIFwicG9pbnRzXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHBvaW50cykge1xyXG4gICAgICAgIGlmIChwb2ludHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKHBvaW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gIENsZWFyIHRoZSBwb2ludHNcclxuICAgICAgICAgICAgdGhpcy5zZXRUbygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiIsIlRpbnkuUmVjdGFuZ2xlID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgd2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLlJFQ1Q7XHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5wcm90b3R5cGUgPSB7XHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zKHRoaXMsIHgsIHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbnRlcnNlY3RzOiBmdW5jdGlvbiAoYikge1xyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzKHRoaXMsIGIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJib3R0b21cIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLnkpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdmFsdWUgLSB0aGlzLnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwicmlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMueCkge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdmFsdWUgLSB0aGlzLng7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwidm9sdW1lXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5SZWN0YW5nbGU7XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWlucyA9IGZ1bmN0aW9uIChhLCB4LCB5KSB7XHJcbiAgICBpZiAoYS53aWR0aCA8PSAwIHx8IGEuaGVpZ2h0IDw9IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHggPj0gYS54ICYmIHggPCBhLnJpZ2h0ICYmIHkgPj0gYS55ICYmIHkgPCBhLmJvdHRvbTtcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUG9pbnQgPSBmdW5jdGlvbiAoYSwgcG9pbnQpIHtcclxuICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jb250YWlucyhhLCBwb2ludC54LCBwb2ludC55KTtcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUmVjdCA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAvLyAgSWYgdGhlIGdpdmVuIHJlY3QgaGFzIGEgbGFyZ2VyIHZvbHVtZSB0aGFuIHRoaXMgb25lIHRoZW4gaXQgY2FuIG5ldmVyIGNvbnRhaW4gaXRcclxuICAgIGlmIChhLnZvbHVtZSA+IGIudm9sdW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhLnggPj0gYi54ICYmIGEueSA+PSBiLnkgJiYgYS5yaWdodCA8IGIucmlnaHQgJiYgYS5ib3R0b20gPCBiLmJvdHRvbTtcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgaWYgKGEud2lkdGggPD0gMCB8fCBhLmhlaWdodCA8PSAwIHx8IGIud2lkdGggPD0gMCB8fCBiLmhlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhKGEucmlnaHQgPCBiLnggfHwgYS5ib3R0b20gPCBiLnkgfHwgYS54ID4gYi5yaWdodCB8fCBhLnkgPiBiLmJvdHRvbSk7XHJcbn07XHJcblxyXG5UaW55LkVtcHR5UmVjdGFuZ2xlID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDAsIDApO1xyXG4iLCJUaW55LlJvdW5kZWRSZWN0YW5nbGUgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKSB7XHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cyB8fCAwO1xyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLlJSRUM7XHJcbn07XHJcblxyXG5UaW55LlJvdW5kZWRSZWN0YW5nbGUucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLnJhZGl1cyk7XHJcbn07XHJcblxyXG5UaW55LlJvdW5kZWRSZWN0YW5nbGUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIGlmICh0aGlzLndpZHRoIDw9IDAgfHwgdGhpcy5oZWlnaHQgPD0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeDEgPSB0aGlzLng7XHJcblxyXG4gICAgaWYgKHggPj0geDEgJiYgeCA8PSB4MSArIHRoaXMud2lkdGgpIHtcclxuICAgICAgICB2YXIgeTEgPSB0aGlzLnk7XHJcblxyXG4gICAgICAgIGlmICh5ID49IHkxICYmIHkgPD0geTEgKyB0aGlzLmhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUm91bmRlZFJlY3RhbmdsZTtcclxuIiwicmVxdWlyZShcIi4vYmFzZS5qc1wiKTtcclxuXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvUkFGLmpzXCIpOyAvLyAyIEtiXHJcbi8vIHJlcXVpcmUoJy4vc3lzdGVtcy9PYmplY3RDcmVhdG9yLmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9Mb2FkZXIuanNcIik7IC8vIDMgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9JbnB1dC5qc1wiKTsgLy8gMSBLYlxyXG5yZXF1aXJlKFwiLi9zeXN0ZW1zL1RpbWVyLmpzXCIpOyAvLyAxIEtiXHJcblxyXG5yZXF1aXJlKFwiLi91dGlscy9FdmVudEVtaXR0ZXIuanNcIik7XHJcblxyXG5yZXF1aXJlKFwiLi90ZXh0dXJlcy9UZXh0dXJlLmpzXCIpOyAvLyA0IEtiXHJcblxyXG5yZXF1aXJlKFwiLi9vYmplY3RzL1Nwcml0ZS5qc1wiKTsgLy8gMyBLYlxyXG5yZXF1aXJlKFwiLi9vYmplY3RzL1RleHQuanNcIik7IC8vIDUgS2JcclxuIiwidmFyIHBpMiA9IE1hdGguUEkgKiAyO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFRpbnkuUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnNjYWxlID0gbmV3IFRpbnkuUG9pbnQoMSwgMSk7XHJcbiAgICB0aGlzLnBpdm90ID0gbmV3IFRpbnkuUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgIHRoaXMuYWxwaGEgPSAxO1xyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuICAgIHRoaXMuX3NyID0gMDtcclxuICAgIHRoaXMuX2NyID0gMTtcclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQmFzZU9iamVjdDJEO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnQpIHRoaXMucGFyZW50LnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbnVsbDtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCBcIndvcmxkVmlzaWJsZVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaXRlbSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLnZpc2libGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ucGFyZW50O1xyXG4gICAgICAgIH0gd2hpbGUgKGl0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCBcImNhY2hlQXNCaXRtYXBcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlQXNCaXRtYXA7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXAgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgc29tZSBtYXRyaXggcmVmcyBmb3IgZWFzeSBhY2Nlc3NcclxuICAgIHZhciBwdCA9IHRoaXMucGFyZW50LndvcmxkVHJhbnNmb3JtO1xyXG4gICAgdmFyIHd0ID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICAvLyB0ZW1wb3JhcnkgbWF0cml4IHZhcmlhYmxlc1xyXG4gICAgdmFyIGEsIGIsIGMsIGQsIHR4LCB0eTtcclxuXHJcbiAgICAvLyBzbyBpZiByb3RhdGlvbiBpcyBiZXR3ZWVuIDAgdGhlbiB3ZSBjYW4gc2ltcGxpZnkgdGhlIG11bHRpcGxpY2F0aW9uIHByb2Nlc3MuLlxyXG4gICAgaWYgKHRoaXMucm90YXRpb24gJSBwaTIpIHtcclxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHJvdGF0aW9uIGlzIHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91cyByZW5kZXIuIFRoaXMgbWVhbnMgd2Ugb25seSBuZWVkIHRvIHVzZSBzaW4gYW5kIGNvcyB3aGVuIHJvdGF0aW9uIGFjdHVhbGx5IGNoYW5nZXNcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbiAhPT0gdGhpcy5yb3RhdGlvbkNhY2hlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb25DYWNoZSA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX3NyID0gTWF0aC5zaW4odGhpcy5yb3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyID0gTWF0aC5jb3ModGhpcy5yb3RhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG1hdHJpeCB2YWx1ZXMgb2YgdGhlIGRpc3BsYXlvYmplY3QgYmFzZWQgb24gaXRzIHRyYW5zZm9ybSBwcm9wZXJ0aWVzLi5cclxuICAgICAgICBhID0gdGhpcy5fY3IgKiB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgYiA9IHRoaXMuX3NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGMgPSAtdGhpcy5fc3IgKiB0aGlzLnNjYWxlLnk7XHJcbiAgICAgICAgZCA9IHRoaXMuX2NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIHR4ID0gdGhpcy5wb3NpdGlvbi54O1xyXG4gICAgICAgIHR5ID0gdGhpcy5wb3NpdGlvbi55O1xyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgcGl2b3QuLiBub3Qgb2Z0ZW4gdXNlZCBzbyBnZWFyZWQgdG93YXJkcyB0aGF0IGZhY3QhXHJcbiAgICAgICAgaWYgKHRoaXMucGl2b3QueCB8fCB0aGlzLnBpdm90LnkpIHtcclxuICAgICAgICAgICAgdHggLT0gdGhpcy5waXZvdC54ICogYSArIHRoaXMucGl2b3QueSAqIGM7XHJcbiAgICAgICAgICAgIHR5IC09IHRoaXMucGl2b3QueCAqIGIgKyB0aGlzLnBpdm90LnkgKiBkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uY2F0IHRoZSBwYXJlbnQgbWF0cml4IHdpdGggdGhlIG9iamVjdHMgdHJhbnNmb3JtLlxyXG4gICAgICAgIHd0LmEgPSBhICogcHQuYSArIGIgKiBwdC5jO1xyXG4gICAgICAgIHd0LmIgPSBhICogcHQuYiArIGIgKiBwdC5kO1xyXG4gICAgICAgIHd0LmMgPSBjICogcHQuYSArIGQgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgPSBjICogcHQuYiArIGQgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbGV0cyBkbyB0aGUgZmFzdCB2ZXJzaW9uIGFzIHdlIGtub3cgdGhlcmUgaXMgbm8gcm90YXRpb24uLlxyXG4gICAgICAgIGEgPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgZCA9IHRoaXMuc2NhbGUueTtcclxuXHJcbiAgICAgICAgdHggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnBpdm90LnggKiBhO1xyXG4gICAgICAgIHR5ID0gdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5waXZvdC55ICogZDtcclxuXHJcbiAgICAgICAgd3QuYSA9IGEgKiBwdC5hO1xyXG4gICAgICAgIHd0LmIgPSBhICogcHQuYjtcclxuICAgICAgICB3dC5jID0gZCAqIHB0LmM7XHJcbiAgICAgICAgd3QuZCA9IGQgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtdWx0aXBseSB0aGUgYWxwaGFzLi5cclxuICAgIHRoaXMud29ybGRBbHBoYSA9IHRoaXMuYWxwaGEgKiB0aGlzLnBhcmVudC53b3JsZEFscGhhO1xyXG59O1xyXG5cclxuLy8gcGVyZm9ybWFuY2UgaW5jcmVhc2UgdG8gYXZvaWQgdXNpbmcgY2FsbC4uICgxMHggZmFzdGVyKVxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSA9IFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgLy8gbWF0cml4ID0gbWF0cml4Oy8vanVzdCB0byBnZXQgcGFzc2VkIGpzIGhpbnRpbmcgKGFuZCBwcmVzZXJ2ZSBpbmhlcml0YW5jZSlcclxuICAgIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRzKFRpbnkuaWRlbnRpdHlNYXRyaXgpO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdlbmVyYXRlVGV4dHVyZSA9IGZ1bmN0aW9uIChyZXNvbHV0aW9uLCByZW5kZXJlcikge1xyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICB2YXIgcmVuZGVyVGV4dHVyZSA9IG5ldyBUaW55LlJlbmRlclRleHR1cmUoYm91bmRzLndpZHRoIHwgMCwgYm91bmRzLmhlaWdodCB8IDAsIHJlbmRlcmVyLCByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eCA9IC1ib3VuZHMueDtcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LnR5ID0gLWJvdW5kcy55O1xyXG5cclxuICAgIHJlbmRlclRleHR1cmUucmVuZGVyKHRoaXMsIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4KTtcclxuXHJcbiAgICByZXR1cm4gcmVuZGVyVGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVDYWNoZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCk7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudG9HbG9iYWwgPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcclxuICAgIC8vIGRvbid0IG5lZWQgdG8gdVtkYXRlIHRoZSBsb3RcclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgcmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHkocG9zaXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnRvTG9jYWwgPSBmdW5jdGlvbiAocG9zaXRpb24sIGZyb20pIHtcclxuICAgIGlmIChmcm9tKSB7XHJcbiAgICAgICAgcG9zaXRpb24gPSBmcm9tLnRvR2xvYmFsKHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkb24ndCBuZWVkIHRvIHVbZGF0ZSB0aGUgbG90XHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy53b3JsZFRyYW5zZm9ybS5hcHBseUludmVyc2UocG9zaXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9yZW5kZXJDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSwgcmVuZGVyU2Vzc2lvbik7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbnVsbDtcclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIGlmICghdGhpcy5fY2FjaGVkU3ByaXRlKSB7XHJcbiAgICAgICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwKTsgLy8sIHJlbmRlclNlc3Npb24ucmVuZGVyZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBuZXcgVGlueS5TcHJpdGUocmVuZGVyVGV4dHVyZSk7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUucmVzaXplKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eCA9IC1ib3VuZHMueDtcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LnR5ID0gLWJvdW5kcy55O1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlbmRlcih0aGlzLCBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeCwgdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci54ID0gLShib3VuZHMueCAvIGJvdW5kcy53aWR0aCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnkgPSAtKGJvdW5kcy55IC8gYm91bmRzLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge307XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCBcInhcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCBcInlcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeCA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4iLCJUaW55LkdyYXBoaWNzRGF0YSA9IGZ1bmN0aW9uIChsaW5lV2lkdGgsIGxpbmVDb2xvciwgbGluZUFscGhhLCBmaWxsQ29sb3IsIGZpbGxBbHBoYSwgZmlsbCwgc2hhcGUpIHtcclxuICAgIHRoaXMubGluZVdpZHRoID0gbGluZVdpZHRoO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSBsaW5lQ29sb3I7XHJcbiAgICB0aGlzLmxpbmVBbHBoYSA9IGxpbmVBbHBoYTtcclxuICAgIHRoaXMuX2xpbmVUaW50ID0gbGluZUNvbG9yO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IGZpbGxBbHBoYTtcclxuICAgIHRoaXMuX2ZpbGxUaW50ID0gZmlsbENvbG9yO1xyXG4gICAgdGhpcy5maWxsID0gZmlsbDtcclxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcclxuICAgIHRoaXMudHlwZSA9IHNoYXBlLnR5cGU7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzRGF0YS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkdyYXBoaWNzRGF0YTtcclxuXHJcblRpbnkuR3JhcGhpY3NEYXRhLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgR3JhcGhpY3NEYXRhKFxyXG4gICAgICAgIHRoaXMubGluZVdpZHRoLFxyXG4gICAgICAgIHRoaXMubGluZUNvbG9yLFxyXG4gICAgICAgIHRoaXMubGluZUFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbENvbG9yLFxyXG4gICAgICAgIHRoaXMuZmlsbEFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbCxcclxuICAgICAgICB0aGlzLnNoYXBlXHJcbiAgICApO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5maWxsQWxwaGEgPSAxO1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSAwO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSBcIiMwMDAwMDBcIjtcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhID0gW107XHJcbiAgICB0aGlzLnRpbnQgPSBcIiNmZmZmZmZcIjtcclxuICAgIHRoaXMuYmxlbmRNb2RlID0gXCJzb3VyY2Utb3ZlclwiO1xyXG4gICAgdGhpcy5jdXJyZW50UGF0aCA9IG51bGw7XHJcbiAgICB0aGlzLmlzTWFzayA9IGZhbHNlO1xyXG4gICAgdGhpcy5ib3VuZHNQYWRkaW5nID0gMDtcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcyA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSBmYWxzZTtcclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55Lk9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5HcmFwaGljcztcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVTdHlsZSA9IGZ1bmN0aW9uIChsaW5lV2lkdGgsIGNvbG9yLCBhbHBoYSkge1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGggfHwgMDtcclxuICAgIHRoaXMubGluZUNvbG9yID0gY29sb3IgfHwgXCIjMDAwMDAwXCI7XHJcbiAgICB0aGlzLmxpbmVBbHBoYSA9IGFscGhhID09PSB1bmRlZmluZWQgPyAxIDogYWxwaGE7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIGhhbGZ3YXkgdGhyb3VnaCBhIGxpbmU/IHN0YXJ0IGEgbmV3IG9uZSFcclxuICAgICAgICAgICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbih0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5zbGljZSgtMikpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgaXRzIGVtcHR5IHNvIGxldHMganVzdCBzZXQgdGhlIGxpbmUgcHJvcGVydGllc1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVXaWR0aCA9IHRoaXMubGluZVdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVDb2xvciA9IHRoaXMubGluZUNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVBbHBoYSA9IHRoaXMubGluZUFscGhhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5Qb2x5Z29uKFt4LCB5XSkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUubGluZVRvID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIGlmICghdGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLnB1c2goeCwgeSk7XHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnF1YWRyYXRpY0N1cnZlVG8gPSBmdW5jdGlvbiAoY3BYLCBjcFksIHRvWCwgdG9ZKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeGEsXHJcbiAgICAgICAgeWEsXHJcbiAgICAgICAgbiA9IDIwLFxyXG4gICAgICAgIHBvaW50cyA9IHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzO1xyXG5cclxuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZyb21YID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXTtcclxuICAgIHZhciBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV07XHJcbiAgICB2YXIgaiA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyArK2kpIHtcclxuICAgICAgICBqID0gaSAvIG47XHJcblxyXG4gICAgICAgIHhhID0gZnJvbVggKyAoY3BYIC0gZnJvbVgpICogajtcclxuICAgICAgICB5YSA9IGZyb21ZICsgKGNwWSAtIGZyb21ZKSAqIGo7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKHhhICsgKGNwWCArICh0b1ggLSBjcFgpICogaiAtIHhhKSAqIGosIHlhICsgKGNwWSArICh0b1kgLSBjcFkpICogaiAtIHlhKSAqIGopO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYmV6aWVyQ3VydmVUbyA9IGZ1bmN0aW9uIChjcFgsIGNwWSwgY3BYMiwgY3BZMiwgdG9YLCB0b1kpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyA9IFswLCAwXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuID0gMjAsXHJcbiAgICAgICAgZHQsXHJcbiAgICAgICAgZHQyLFxyXG4gICAgICAgIGR0MyxcclxuICAgICAgICB0MixcclxuICAgICAgICB0MyxcclxuICAgICAgICBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICB2YXIgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDJdO1xyXG4gICAgdmFyIGZyb21ZID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXTtcclxuICAgIHZhciBqID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyArK2kpIHtcclxuICAgICAgICBqID0gaSAvIG47XHJcblxyXG4gICAgICAgIGR0ID0gMSAtIGo7XHJcbiAgICAgICAgZHQyID0gZHQgKiBkdDtcclxuICAgICAgICBkdDMgPSBkdDIgKiBkdDtcclxuXHJcbiAgICAgICAgdDIgPSBqICogajtcclxuICAgICAgICB0MyA9IHQyICogajtcclxuXHJcbiAgICAgICAgcG9pbnRzLnB1c2goXHJcbiAgICAgICAgICAgIGR0MyAqIGZyb21YICsgMyAqIGR0MiAqIGogKiBjcFggKyAzICogZHQgKiB0MiAqIGNwWDIgKyB0MyAqIHRvWCxcclxuICAgICAgICAgICAgZHQzICogZnJvbVkgKyAzICogZHQyICogaiAqIGNwWSArIDMgKiBkdCAqIHQyICogY3BZMiArIHQzICogdG9ZXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmFyY1RvID0gZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyLCByYWRpdXMpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5wdXNoKHgxLCB5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyh4MSwgeTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyxcclxuICAgICAgICBmcm9tWCA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl0sXHJcbiAgICAgICAgZnJvbVkgPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLFxyXG4gICAgICAgIGExID0gZnJvbVkgLSB5MSxcclxuICAgICAgICBiMSA9IGZyb21YIC0geDEsXHJcbiAgICAgICAgYTIgPSB5MiAtIHkxLFxyXG4gICAgICAgIGIyID0geDIgLSB4MSxcclxuICAgICAgICBtbSA9IE1hdGguYWJzKGExICogYjIgLSBiMSAqIGEyKTtcclxuXHJcbiAgICBpZiAobW0gPCAxLjBlLTggfHwgcmFkaXVzID09PSAwKSB7XHJcbiAgICAgICAgaWYgKHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl0gIT09IHgxIHx8IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0gIT09IHkxKSB7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHgxLCB5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZGQgPSBhMSAqIGExICsgYjEgKiBiMSxcclxuICAgICAgICAgICAgY2MgPSBhMiAqIGEyICsgYjIgKiBiMixcclxuICAgICAgICAgICAgdHQgPSBhMSAqIGEyICsgYjEgKiBiMixcclxuICAgICAgICAgICAgazEgPSAocmFkaXVzICogTWF0aC5zcXJ0KGRkKSkgLyBtbSxcclxuICAgICAgICAgICAgazIgPSAocmFkaXVzICogTWF0aC5zcXJ0KGNjKSkgLyBtbSxcclxuICAgICAgICAgICAgajEgPSAoazEgKiB0dCkgLyBkZCxcclxuICAgICAgICAgICAgajIgPSAoazIgKiB0dCkgLyBjYyxcclxuICAgICAgICAgICAgY3ggPSBrMSAqIGIyICsgazIgKiBiMSxcclxuICAgICAgICAgICAgY3kgPSBrMSAqIGEyICsgazIgKiBhMSxcclxuICAgICAgICAgICAgcHggPSBiMSAqIChrMiArIGoxKSxcclxuICAgICAgICAgICAgcHkgPSBhMSAqIChrMiArIGoxKSxcclxuICAgICAgICAgICAgcXggPSBiMiAqIChrMSArIGoyKSxcclxuICAgICAgICAgICAgcXkgPSBhMiAqIChrMSArIGoyKSxcclxuICAgICAgICAgICAgc3RhcnRBbmdsZSA9IE1hdGguYXRhbjIocHkgLSBjeSwgcHggLSBjeCksXHJcbiAgICAgICAgICAgIGVuZEFuZ2xlID0gTWF0aC5hdGFuMihxeSAtIGN5LCBxeCAtIGN4KTtcclxuXHJcbiAgICAgICAgdGhpcy5hcmMoY3ggKyB4MSwgY3kgKyB5MSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYjEgKiBhMiA+IGIyICogYTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYXJjID0gZnVuY3Rpb24gKGN4LCBjeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSkge1xyXG4gICAgLy8gIElmIHdlIGRvIHRoaXMgd2UgY2FuIG5ldmVyIGRyYXcgYSBmdWxsIGNpcmNsZVxyXG4gICAgaWYgKHN0YXJ0QW5nbGUgPT09IGVuZEFuZ2xlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBhbnRpY2xvY2t3aXNlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgYW50aWNsb2Nrd2lzZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghYW50aWNsb2Nrd2lzZSAmJiBlbmRBbmdsZSA8PSBzdGFydEFuZ2xlKSB7XHJcbiAgICAgICAgZW5kQW5nbGUgKz0gTWF0aC5QSSAqIDI7XHJcbiAgICB9IGVsc2UgaWYgKGFudGljbG9ja3dpc2UgJiYgc3RhcnRBbmdsZSA8PSBlbmRBbmdsZSkge1xyXG4gICAgICAgIHN0YXJ0QW5nbGUgKz0gTWF0aC5QSSAqIDI7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN3ZWVwID0gYW50aWNsb2Nrd2lzZSA/IChzdGFydEFuZ2xlIC0gZW5kQW5nbGUpICogLTEgOiBlbmRBbmdsZSAtIHN0YXJ0QW5nbGU7XHJcbiAgICB2YXIgc2VncyA9IE1hdGguY2VpbChNYXRoLmFicyhzd2VlcCkgLyAoTWF0aC5QSSAqIDIpKSAqIDQwO1xyXG5cclxuICAgIC8vICBTd2VlcCBjaGVjayAtIG1vdmVkIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGRvIHRoZSBtb3ZlVG8gYmVsb3cgaWYgdGhlIGFyYyBmYWlsc1xyXG4gICAgaWYgKHN3ZWVwID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0YXJ0WCA9IGN4ICsgTWF0aC5jb3Moc3RhcnRBbmdsZSkgKiByYWRpdXM7XHJcbiAgICB2YXIgc3RhcnRZID0gY3kgKyBNYXRoLnNpbihzdGFydEFuZ2xlKSAqIHJhZGl1cztcclxuXHJcbiAgICBpZiAoYW50aWNsb2Nrd2lzZSAmJiB0aGlzLmZpbGxpbmcpIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyhjeCwgY3kpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGN1cnJlbnRQYXRoIHdpbGwgYWx3YXlzIGV4aXN0IGFmdGVyIGNhbGxpbmcgYSBtb3ZlVG9cclxuICAgIHZhciBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICB2YXIgdGhldGEgPSBzd2VlcCAvIChzZWdzICogMik7XHJcbiAgICB2YXIgdGhldGEyID0gdGhldGEgKiAyO1xyXG5cclxuICAgIHZhciBjVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XHJcbiAgICB2YXIgc1RoZXRhID0gTWF0aC5zaW4odGhldGEpO1xyXG5cclxuICAgIHZhciBzZWdNaW51cyA9IHNlZ3MgLSAxO1xyXG5cclxuICAgIHZhciByZW1haW5kZXIgPSAoc2VnTWludXMgJSAxKSAvIHNlZ01pbnVzO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHNlZ01pbnVzOyBpKyspIHtcclxuICAgICAgICB2YXIgcmVhbCA9IGkgKyByZW1haW5kZXIgKiBpO1xyXG5cclxuICAgICAgICB2YXIgYW5nbGUgPSB0aGV0YSArIHN0YXJ0QW5nbGUgKyB0aGV0YTIgKiByZWFsO1xyXG5cclxuICAgICAgICB2YXIgYyA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICB2YXIgcyA9IC1NYXRoLnNpbihhbmdsZSk7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKChjVGhldGEgKiBjICsgc1RoZXRhICogcykgKiByYWRpdXMgKyBjeCwgKGNUaGV0YSAqIC1zICsgc1RoZXRhICogYykgKiByYWRpdXMgKyBjeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5iZWdpbkZpbGwgPSBmdW5jdGlvbiAoY29sb3IsIGFscGhhKSB7XHJcbiAgICB0aGlzLmZpbGxpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBjb2xvciB8fCBcIiMwMDAwMDBcIjtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gYWxwaGEgPT09IHVuZGVmaW5lZCA/IDEgOiBhbHBoYTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPD0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmZpbGwgPSB0aGlzLmZpbGxpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbENvbG9yID0gdGhpcy5maWxsQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbEFscGhhID0gdGhpcy5maWxsQWxwaGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZW5kRmlsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmlsbGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBudWxsO1xyXG4gICAgdGhpcy5maWxsQWxwaGEgPSAxO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1JlY3QgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdCA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpIHtcclxuICAgIGlmIChyYWRpdXMgPiAwKSB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cykpO1xyXG4gICAgZWxzZSB0aGlzLmRyYXdSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLy8gVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1JvdW5kZWRSZWN0MiA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cylcclxuLy8ge1xyXG4vLyAgICAgdmFyIHNoYXBlID0gbmV3IFRpbnkuUm91bmRlZFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbi8vICAgICBzaGFwZS50eXBlID0gVGlueS5QcmltaXRpdmVzLlJSRUNfTEpPSU47XHJcbi8vICAgICB0aGlzLmRyYXdTaGFwZShzaGFwZSk7XHJcblxyXG4vLyAgICAgcmV0dXJuIHRoaXM7XHJcbi8vIH07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Q2lyY2xlID0gZnVuY3Rpb24gKHgsIHksIGRpYW1ldGVyKSB7XHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5DaXJjbGUoeCwgeSwgZGlhbWV0ZXIpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vIE1vdmVkIHRvIGV4dHJhIEVsbGlwc2VcclxuLy8gVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd0VsbGlwc2UgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0KVxyXG4vLyB7XHJcbi8vICAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5FbGxpcHNlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbi8vICAgICByZXR1cm4gdGhpcztcclxuLy8gfTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdQb2x5Z29uID0gZnVuY3Rpb24gKHBhdGgpIHtcclxuICAgIC8vIHByZXZlbnRzIGFuIGFyZ3VtZW50IGFzc2lnbm1lbnQgZGVvcHRcclxuICAgIC8vIHNlZSBzZWN0aW9uIDMuMTogaHR0cHM6Ly9naXRodWIuY29tL3BldGthYW50b25vdi9ibHVlYmlyZC93aWtpL09wdGltaXphdGlvbi1raWxsZXJzIzMtbWFuYWdpbmctYXJndW1lbnRzXHJcbiAgICB2YXIgcG9pbnRzID0gcGF0aDtcclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocG9pbnRzKSkge1xyXG4gICAgICAgIC8vIHByZXZlbnRzIGFuIGFyZ3VtZW50IGxlYWsgZGVvcHRcclxuICAgICAgICAvLyBzZWUgc2VjdGlvbiAzLjI6IGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzLW1hbmFnaW5nLWFyZ3VtZW50c1xyXG4gICAgICAgIHBvaW50cyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgcG9pbnRzW2ldID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5Qb2x5Z29uKHBvaW50cykpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IDA7XHJcbiAgICB0aGlzLmZpbGxpbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhID0gW107XHJcbiAgICB0aGlzLnVwZGF0ZUxvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRlc3Ryb3lDaGlsZHJlbikge1xyXG4gICAgVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmdlbmVyYXRlVGV4dHVyZSA9IGZ1bmN0aW9uIChyZXNvbHV0aW9uKSB7XHJcbiAgICByZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCAxO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xyXG5cclxuICAgIHZhciBjYW52YXNCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIoYm91bmRzLndpZHRoICogcmVzb2x1dGlvbiwgYm91bmRzLmhlaWdodCAqIHJlc29sdXRpb24pO1xyXG5cclxuICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICB0ZXh0dXJlLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xyXG5cclxuICAgIGNhbnZhc0J1ZmZlci5jb250ZXh0LnNjYWxlKHJlc29sdXRpb24sIHJlc29sdXRpb24pO1xyXG5cclxuICAgIGNhbnZhc0J1ZmZlci5jb250ZXh0LnRyYW5zbGF0ZSgtYm91bmRzLngsIC1ib3VuZHMueSk7XHJcblxyXG4gICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLCBjYW52YXNCdWZmZXIuY29udGV4dCk7XHJcblxyXG4gICAgcmV0dXJuIHRleHR1cmU7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgaWYgKHRoaXMuaXNNYXNrID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRoZSB0aW50IGhhcyBjaGFuZ2VkLCBzZXQgdGhlIGdyYXBoaWNzIG9iamVjdCB0byBkaXJ0eS5cclxuICAgIGlmICh0aGlzLl9wcmV2VGludCAhPT0gdGhpcy50aW50KSB7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3ByZXZUaW50ID0gdGhpcy50aW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkU3ByaXRlRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHdlIHdpbGwgYWxzbyBuZWVkIHRvIHVwZGF0ZSB0aGUgdGV4dHVyZVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhY2hlZFNwcml0ZVRleHR1cmUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbHBoYSA9IHRoaXMuYWxwaGE7XHJcbiAgICAgICAgVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSwgcmVuZGVyU2Vzc2lvbik7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSByZW5kZXJTZXNzaW9uLmNvbnRleHQ7XHJcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKSB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS5hICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS5kICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvblxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcywgY29udGV4dCk7XHJcblxyXG4gICAgICAgIC8vIHNpbXBsZSByZW5kZXIgY2hpbGRyZW4hXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICAgIGlmICghdGhpcy5fY3VycmVudEJvdW5kcyB8fCB0aGlzLl9ib3VuZHNEaXJ0eSkge1xyXG4gICAgICAgIC8vIHJldHVybiBhbiBlbXB0eSBvYmplY3QgaWYgdGhlIGl0ZW0gaXMgYSBtYXNrIVxyXG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJhYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2JvdW5kc0RpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTG9jYWxCb3VuZHMoKTtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fbG9jYWxCb3VuZHM7XHJcblxyXG4gICAgICAgIHZhciB3MCA9IGJvdW5kcy54O1xyXG4gICAgICAgIHZhciB3MSA9IGJvdW5kcy53aWR0aCArIGJvdW5kcy54O1xyXG5cclxuICAgICAgICB2YXIgaDAgPSBib3VuZHMueTtcclxuICAgICAgICB2YXIgaDEgPSBib3VuZHMuaGVpZ2h0ICsgYm91bmRzLnk7XHJcblxyXG4gICAgICAgIHZhciB3b3JsZFRyYW5zZm9ybSA9IG1hdHJpeCB8fCB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgICAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICAgICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgICAgIHZhciBjID0gd29ybGRUcmFuc2Zvcm0uYztcclxuICAgICAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICAgICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICAgICAgdmFyIHR5ID0gd29ybGRUcmFuc2Zvcm0udHk7XHJcblxyXG4gICAgICAgIHZhciB4MSA9IGEgKiB3MSArIGMgKiBoMSArIHR4O1xyXG4gICAgICAgIHZhciB5MSA9IGQgKiBoMSArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDIgPSBhICogdzAgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTIgPSBkICogaDEgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgzID0gYSAqIHcwICsgYyAqIGgwICsgdHg7XHJcbiAgICAgICAgdmFyIHkzID0gZCAqIGgwICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4NCA9IGEgKiB3MSArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5NCA9IGQgKiBoMCArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgICAgICB2YXIgbWF4WCA9IHgxO1xyXG4gICAgICAgIHZhciBtYXhZID0geTE7XHJcblxyXG4gICAgICAgIHZhciBtaW5YID0geDE7XHJcbiAgICAgICAgdmFyIG1pblkgPSB5MTtcclxuXHJcbiAgICAgICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDMgPCBtaW5YID8geDMgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgICAgIG1pblkgPSB5MiA8IG1pblkgPyB5MiA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTQgPCBtaW5ZID8geTQgOiBtaW5ZO1xyXG5cclxuICAgICAgICBtYXhYID0geDIgPiBtYXhYID8geDIgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICAgICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTMgPiBtYXhZID8geTMgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcblxyXG4gICAgICAgIHRoaXMuX2JvdW5kcy54ID0gbWluWDtcclxuICAgICAgICB0aGlzLl9ib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuXHJcbiAgICAgICAgdGhpcy5fYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEJvdW5kcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmNvbnRhaW5zUG9pbnQgPSBmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvaW50LCB0ZW1wUG9pbnQpO1xyXG5cclxuICAgIHZhciBncmFwaGljc0RhdGEgPSB0aGlzLmdyYXBoaWNzRGF0YTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBkYXRhID0gZ3JhcGhpY3NEYXRhW2ldO1xyXG5cclxuICAgICAgICBpZiAoIWRhdGEuZmlsbCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG9ubHkgZGVhbCB3aXRoIGZpbGxzLi5cclxuICAgICAgICBpZiAoZGF0YS5zaGFwZSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zaGFwZS5jb250YWlucyh0ZW1wUG9pbnQueCwgdGVtcFBvaW50LnkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS51cGRhdGVMb2NhbEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JhcGhpY3NEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBzaGFwZSwgcG9pbnRzLCB4LCB5LCB3LCBoO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ3JhcGhpY3NEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gZGF0YS50eXBlO1xyXG4gICAgICAgICAgICB2YXIgbGluZVdpZHRoID0gZGF0YS5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SRUNUIHx8XHJcbiAgICAgICAgICAgICAgICB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQyB8fFxyXG4gICAgICAgICAgICAgICAgdHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUNfTEpPSU5cclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gc2hhcGUueCAtIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICB5ID0gc2hhcGUueSAtIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICB3ID0gc2hhcGUud2lkdGggKyBsaW5lV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUuaGVpZ2h0ICsgbGluZVdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblggPSB4IDwgbWluWCA/IHggOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSA8IG1pblkgPyB5IDogbWluWTtcclxuICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgaCA+IG1heFkgPyB5ICsgaCA6IG1heFk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpIHtcclxuICAgICAgICAgICAgICAgIHggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICAgICAgeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgICAgICB3ID0gc2hhcGUucmFkaXVzICsgbGluZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIGggPSBzaGFwZS5yYWRpdXMgKyBsaW5lV2lkdGggLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblggPSB4IC0gdyA8IG1pblggPyB4IC0gdyA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICBtYXhYID0geCArIHcgPiBtYXhYID8geCArIHcgOiBtYXhYO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblkgPSB5IC0gaCA8IG1pblkgPyB5IC0gaCA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0geSArIGggPiBtYXhZID8geSArIGggOiBtYXhZO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5FTElQKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgICAgIHkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLndpZHRoICsgbGluZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIGggPSBzaGFwZS5oZWlnaHQgKyBsaW5lV2lkdGggLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblggPSB4IC0gdyA8IG1pblggPyB4IC0gdyA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICBtYXhYID0geCArIHcgPiBtYXhYID8geCArIHcgOiBtYXhYO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblkgPSB5IC0gaCA8IG1pblkgPyB5IC0gaCA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0geSArIGggPiBtYXhZID8geSArIGggOiBtYXhZO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUE9MWSAtIGFzc3VtZXMgcG9pbnRzIGFyZSBzZXF1ZW50aWFsLCBub3QgUG9pbnQgb2JqZWN0c1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcG9pbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50c1tqXSBpbnN0YW5jZW9mIFRpbnkuUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHBvaW50c1tqXS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9pbnRzW2pdLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHBvaW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBvaW50c1tqICsgMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA8IHBvaW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pblggPSB4IC0gbGluZVdpZHRoIDwgbWluWCA/IHggLSBsaW5lV2lkdGggOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFggPSB4ICsgbGluZVdpZHRoID4gbWF4WCA/IHggKyBsaW5lV2lkdGggOiBtYXhYO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGxpbmVXaWR0aCA8IG1pblkgPyB5IC0gbGluZVdpZHRoIDogbWluWTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhZID0geSArIGxpbmVXaWR0aCA+IG1heFkgPyB5ICsgbGluZVdpZHRoIDogbWF4WTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWluWCA9IDA7XHJcbiAgICAgICAgbWF4WCA9IDA7XHJcbiAgICAgICAgbWluWSA9IDA7XHJcbiAgICAgICAgbWF4WSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhZGRpbmcgPSB0aGlzLmJvdW5kc1BhZGRpbmc7XHJcblxyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMueCA9IG1pblggLSBwYWRkaW5nO1xyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMud2lkdGggPSBtYXhYIC0gbWluWCArIHBhZGRpbmcgKiAyO1xyXG5cclxuICAgIHRoaXMuX2xvY2FsQm91bmRzLnkgPSBtaW5ZIC0gcGFkZGluZztcclxuICAgIHRoaXMuX2xvY2FsQm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZICsgcGFkZGluZyAqIDI7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIGlmICghdGhpcy5fY2FjaGVkU3ByaXRlKSB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0J1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcihib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG5ldyBUaW55LlNwcml0ZSh0ZXh0dXJlKTtcclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyID0gY2FudmFzQnVmZmVyO1xyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUud29ybGRUcmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLnJlc2l6ZShib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldmVyYWdlIHRoZSBhbmNob3IgdG8gYWNjb3VudCBmb3IgdGhlIG9mZnNldCBvZiB0aGUgZWxlbWVudFxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci54ID0gLShib3VuZHMueCAvIGJvdW5kcy53aWR0aCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnkgPSAtKGJvdW5kcy55IC8gYm91bmRzLmhlaWdodCk7XHJcblxyXG4gICAgLy8gdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5jb250ZXh0LnNhdmUoKTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dC50cmFuc2xhdGUoLWJvdW5kcy54LCAtYm91bmRzLnkpO1xyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGFscGhhIG9mIHRoZSBncmFwaGljcyB0byAxIGZvciB0aGUgcmVuZGVyLi5cclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgLy8gbm93IHJlbmRlciB0aGUgZ3JhcGhpYy4uXHJcbiAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYWxwaGEgPSB0aGlzLmFscGhhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZXMgdGV4dHVyZSBzaXplIGJhc2VkIG9uIGNhbnZhcyBzaXplXHJcbiAqXHJcbiAqIEBtZXRob2QgdXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUudXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjYWNoZWRTcHJpdGUgPSB0aGlzLl9jYWNoZWRTcHJpdGU7XHJcbiAgICB2YXIgdGV4dHVyZSA9IGNhY2hlZFNwcml0ZS50ZXh0dXJlO1xyXG4gICAgdmFyIGNhbnZhcyA9IGNhY2hlZFNwcml0ZS5idWZmZXIuY2FudmFzO1xyXG5cclxuICAgIHRleHR1cmUud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICB0ZXh0dXJlLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICB0ZXh0dXJlLmNyb3Aud2lkdGggPSB0ZXh0dXJlLmZyYW1lLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgdGV4dHVyZS5jcm9wLmhlaWdodCA9IHRleHR1cmUuZnJhbWUuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICBjYWNoZWRTcHJpdGUuX3dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY2FjaGVkU3ByaXRlLl9oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlc3Ryb3lzIGEgcHJldmlvdXMgY2FjaGVkIHNwcml0ZS5cclxuICpcclxuICogQG1ldGhvZCBkZXN0cm95Q2FjaGVkU3ByaXRlXHJcbiAqL1xyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kZXN0cm95Q2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUuZGVzdHJveSh0cnVlKTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3U2hhcGUgPSBmdW5jdGlvbiAoc2hhcGUpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgY3VycmVudCBwYXRoIVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPD0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50UGF0aCA9IG51bGw7XHJcblxyXG4gICAgLy8gIEhhbmRsZSBtaXhlZC10eXBlIHBvbHlnb25zXHJcbiAgICBpZiAoc2hhcGUgaW5zdGFuY2VvZiBUaW55LlBvbHlnb24pIHtcclxuICAgICAgICBzaGFwZS5mbGF0dGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRhdGEgPSBuZXcgVGlueS5HcmFwaGljc0RhdGEoXHJcbiAgICAgICAgdGhpcy5saW5lV2lkdGgsXHJcbiAgICAgICAgdGhpcy5saW5lQ29sb3IsXHJcbiAgICAgICAgdGhpcy5saW5lQWxwaGEsXHJcbiAgICAgICAgdGhpcy5maWxsQ29sb3IsXHJcbiAgICAgICAgdGhpcy5maWxsQWxwaGEsXHJcbiAgICAgICAgdGhpcy5maWxsaW5nLFxyXG4gICAgICAgIHNoYXBlXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2goZGF0YSk7XHJcblxyXG4gICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpIHtcclxuICAgICAgICBkYXRhLnNoYXBlLmNsb3NlZCA9IHRoaXMuZmlsbGluZztcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYXRoID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkdyYXBoaWNzLnByb3RvdHlwZSwgXCJjYWNoZUFzQml0bWFwXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiIsIlRpbnkuT2JqZWN0MkQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgIHRoaXMuX2JvdW5kcyA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFzayA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlKTtcclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55Lk9iamVjdDJEO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCAnaW5wdXRFbmFibGVkJywge1xyXG5cclxuLy8gICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbi8vICAgICAgICAgcmV0dXJuICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZW5hYmxlZClcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4vLyAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dCA9PT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHtlbmFibGVkOiB0cnVlLCBwYXJlbnQ6IHRoaXN9XHJcbi8vICAgICAgICAgICAgICAgICBUaW55LkV2ZW50VGFyZ2V0Lm1peGluKHRoaXMuaW5wdXQpXHJcbi8vICAgICAgICAgICAgIH0gZWxzZVxyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5lbmFibGVkID0gdHJ1ZVxyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuaW5wdXQgIT09IG51bGwgJiYgKHRoaXMuaW5wdXQuZW5hYmxlZCA9IGZhbHNlKVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpLndpZHRoO1xyXG5cclxuICAgICAgICBpZiAod2lkdGggIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ID0gdmFsdWUgLyB3aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnkgKiB0aGlzLmdldExvY2FsQm91bmRzKCkuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmdldExvY2FsQm91bmRzKCkuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoaGVpZ2h0ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gaGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsIFwibWFza1wiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFzaztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFzaykgdGhpcy5fbWFzay5pc01hc2sgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFzayA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaykgdGhpcy5fbWFzay5pc01hc2sgPSB0cnVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaSA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLl9ib3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXNrID0gbnVsbDtcclxuXHJcbiAgICBpZiAodGhpcy5pbnB1dCkgdGhpcy5pbnB1dC5zeXN0ZW0ucmVtb3ZlKHRoaXMpO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGRDaGlsZEF0KGNoaWxkLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCk7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5hZGRDaGlsZEF0ID0gZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xyXG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPD0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoY2hpbGQucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudC5yZW1vdmUoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkgY2hpbGQuZ2FtZSA9IHRoaXMuZ2FtZTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGNoaWxkICsgXCJhZGRDaGlsZEF0OiBUaGUgaW5kZXggXCIgKyBpbmRleCArIFwiIHN1cHBsaWVkIGlzIG91dCBvZiBib3VuZHMgXCIgKyB0aGlzLmNoaWxkcmVuLmxlbmd0aFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5zd2FwQ2hpbGRyZW4gPSBmdW5jdGlvbiAoY2hpbGQsIGNoaWxkMikge1xyXG4gICAgaWYgKGNoaWxkID09PSBjaGlsZDIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGluZGV4MSA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZCk7XHJcbiAgICB2YXIgaW5kZXgyID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkMik7XHJcblxyXG4gICAgaWYgKGluZGV4MSA8IDAgfHwgaW5kZXgyIDwgMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInN3YXBDaGlsZHJlbjogQm90aCB0aGUgc3VwcGxpZWQgT2JqZWN0cyBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlci5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbltpbmRleDFdID0gY2hpbGQyO1xyXG4gICAgdGhpcy5jaGlsZHJlbltpbmRleDJdID0gY2hpbGQ7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdXBwbGllZCBPYmplY3QgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5zZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xyXG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdXBwbGllZCBpbmRleCBpcyBvdXQgb2YgYm91bmRzXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZCk7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShjdXJyZW50SW5kZXgsIDEpOyAvL3JlbW92ZSBmcm9tIG9sZCBwb3NpdGlvblxyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTsgLy9hZGQgYXQgbmV3IHBvc2l0aW9uXHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRDaGlsZEF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBcImdldENoaWxkQXQ6IFN1cHBsaWVkIGluZGV4IFwiICtcclxuICAgICAgICAgICAgICAgIGluZGV4ICtcclxuICAgICAgICAgICAgICAgIFwiIGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZCBsaXN0LCBvciB0aGUgc3VwcGxpZWQgT2JqZWN0IG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baW5kZXhdO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnJlbW92ZUNoaWxkQXQoaW5kZXgpO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgdmFyIGNoaWxkID0gdGhpcy5nZXRDaGlsZEF0KGluZGV4KTtcclxuICAgIGNoaWxkLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHJldHVybiBjaGlsZDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy52aXNpYmxlKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApIHJldHVybjtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIHBlcmZvcm1hbmNlIGluY3JlYXNlIHRvIGF2b2lkIHVzaW5nIGNhbGwuLiAoMTB4IGZhc3RlcilcclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZGlzcGxheU9iamVjdENvbnRhaW5lclVwZGF0ZVRyYW5zZm9ybSA9IFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcbiAgICBpZiAodGhpcy5fY2FjaGVkU3ByaXRlKSByZXR1cm4gdGhpcy5fY2FjaGVkU3ByaXRlLmdldEJvdW5kcygpO1xyXG5cclxuICAgIC8vIFRPRE8gdGhlIGJvdW5kcyBoYXZlIGFscmVhZHkgYmVlbiBjYWxjdWxhdGVkIHRoaXMgcmVuZGVyIHNlc3Npb24gc28gcmV0dXJuIHdoYXQgd2UgaGF2ZVxyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIHZhciBtYXhYID0gLUluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIGNoaWxkQm91bmRzO1xyXG4gICAgdmFyIGNoaWxkTWF4WDtcclxuICAgIHZhciBjaGlsZE1heFk7XHJcblxyXG4gICAgdmFyIGNoaWxkVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkLnZpc2libGUpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICBjaGlsZFZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICBjaGlsZEJvdW5kcyA9IHRoaXMuY2hpbGRyZW5baV0uZ2V0Qm91bmRzKCk7XHJcblxyXG4gICAgICAgIG1pblggPSBtaW5YIDwgY2hpbGRCb3VuZHMueCA/IG1pblggOiBjaGlsZEJvdW5kcy54O1xyXG4gICAgICAgIG1pblkgPSBtaW5ZIDwgY2hpbGRCb3VuZHMueSA/IG1pblkgOiBjaGlsZEJvdW5kcy55O1xyXG5cclxuICAgICAgICBjaGlsZE1heFggPSBjaGlsZEJvdW5kcy53aWR0aCArIGNoaWxkQm91bmRzLng7XHJcbiAgICAgICAgY2hpbGRNYXhZID0gY2hpbGRCb3VuZHMuaGVpZ2h0ICsgY2hpbGRCb3VuZHMueTtcclxuXHJcbiAgICAgICAgbWF4WCA9IG1heFggPiBjaGlsZE1heFggPyBtYXhYIDogY2hpbGRNYXhYO1xyXG4gICAgICAgIG1heFkgPSBtYXhZID4gY2hpbGRNYXhZID8gbWF4WSA6IGNoaWxkTWF4WTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNoaWxkVmlzaWJsZSkgcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuICAgIGJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAvLyBUT0RPOiBzdG9yZSBhIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYWdhaW4gaW4gdGhlIHJlbmRlciBjeWNsZSB3ZSBkbyBub3QgaGF2ZSB0byByZWNhbGN1bGF0ZVxyXG4gICAgLy90aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRMb2NhbEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBtYXRyaXhDYWNoZSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IFRpbnkuaWRlbnRpdHlNYXRyaXg7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XHJcblxyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG1hdHJpeENhY2hlO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyQ2FjaGVkU3ByaXRlKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcbiIsIlRpbnkuU2NlbmUgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG4gICAgVGlueS5PYmplY3QyRC5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxufTtcclxuXHJcblRpbnkuU2NlbmUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55Lk9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuU2NlbmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5TY2VuZTtcclxuXHJcblRpbnkuU2NlbmUucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5TcHJpdGUgPSBmdW5jdGlvbiAodGV4dHVyZSwga2V5KSB7XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dHVyZSh0ZXh0dXJlLCBrZXksIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLl93aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5faGVpZ2h0ID0gMDtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy50aW50ID0gJyNmZmZmZmYnO1xyXG5cclxuICAgIHRoaXMuYmxlbmRNb2RlID0gJ3NvdXJjZS1vdmVyJztcclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlLmhhc0xvYWRlZCkge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNwcml0ZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdmcmFtZU5hbWUnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlLmZyYW1lLm5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5mcmFtZS5uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dHVyZShUaW55LkNhY2hlLnRleHR1cmVbdGhpcy50ZXh0dXJlLmtleSArICcuJyArIHZhbHVlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdmcmFtZScsIHtcclxuLy8gICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLl9mcmFtZTtcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuLy8gICAgICAgICBpZiAodGhpcy50ZXh0dXJlLmxhc3RGcmFtZSkge1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHZhbHVlO1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5fZnJhbWUgPiB0aGlzLnRleHR1cmUubGFzdEZyYW1lKSB0aGlzLl9mcmFtZSA9IDA7XHJcbi8vICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2ZyYW1lIDwgMCkgdGhpcy5fZnJhbWUgPSB0aGlzLnRleHR1cmUubGFzdEZyYW1lO1xyXG4vLyAgICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMudGV4dHVyZS5rZXkgKyAnLicgKyB0aGlzLl9mcmFtZV0pO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnd2lkdGgnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnkgKiB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uICh0ZXh0dXJlLCBmcmFtZU5hbWUsIHVwZGF0ZURpbWVuc2lvbikge1xyXG4gICAgaWYgKHR5cGVvZiB0ZXh0dXJlID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdmFyIGltYWdlUGF0aCA9IHRleHR1cmU7XHJcblxyXG4gICAgICAgIGlmIChmcmFtZU5hbWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IGltYWdlUGF0aCArICcuJyArIGZyYW1lTmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbaW1hZ2VQYXRoXTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlUGF0aCk7XHJcbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBFcnJvcignQ2FjaGUgRXJyb3I6IGltYWdlICcgKyBpbWFnZVBhdGggKyAnIGRvZXNgdCBmb3VuZCBpbiBjYWNoZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlID09PSB0ZXh0dXJlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgIHRoaXMuY2FjaGVkVGludCA9ICcjZmZmZmZmJztcclxuXHJcbiAgICBpZiAodXBkYXRlRGltZW5zaW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5vblRleHR1cmVVcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5vblRleHR1cmVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBzbyBpZiBfd2lkdGggaXMgMCB0aGVuIHdpZHRoIHdhcyBub3Qgc2V0Li5cclxuICAgIGlmICh0aGlzLl93aWR0aCkgdGhpcy5zY2FsZS54ID0gdGhpcy5fd2lkdGggLyB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICBpZiAodGhpcy5faGVpZ2h0KSB0aGlzLnNjYWxlLnkgPSB0aGlzLl9oZWlnaHQgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG59O1xyXG5cclxuLy8gVGlueS5TcHJpdGUucHJvdG90eXBlLmFuaW1hdGUgPSBmdW5jdGlvbiAoZGVsYXksIHlveW8pIHtcclxuLy8gICAgIHRoaXMucmV2ZXJzZSA9IGZhbHNlO1xyXG4vLyAgICAgdGhpcy55b3lvID0geW95bztcclxuXHJcbi8vICAgICBpZiAodGhpcy50ZXh0dXJlLmxhc3RGcmFtZSkge1xyXG4vLyAgICAgICAgIGRlbGF5ID0gZGVsYXkgfHwgdGhpcy50ZXh0dXJlLmZyYW1lLmR1cmF0aW9uIHx8IDEwMDtcclxuXHJcbi8vICAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbikge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuZ2FtZS50aW1lci5sb29wKFxyXG4vLyAgICAgICAgICAgICAgICAgZGVsYXksXHJcbi8vICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueW95bykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmFtZSA9PT0gMCkgdGhpcy5yZXZlcnNlID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZnJhbWUgPT09IHRoaXMudGV4dHVyZS5sYXN0RnJhbWUpIHRoaXMucmV2ZXJzZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lICs9IHRoaXMucmV2ZXJzZSA/IC0xIDogMTtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IGRlbGF5IHx8IHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDA7XHJcbi8vICAgICAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAgICAgdGhpc1xyXG4vLyAgICAgICAgICAgICApO1xyXG5cclxuLy8gICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKTtcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IGRlbGF5O1xyXG4vLyAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdGFydCgpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAobWF0cml4KSB7XHJcbiAgICB2YXIgd2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggLyB0aGlzLnRleHR1cmUucmVzb2x1dGlvbjtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0IC8gdGhpcy50ZXh0dXJlLnJlc29sdXRpb247XHJcblxyXG4gICAgdmFyIHcwID0gd2lkdGggKiAoMSAtIHRoaXMuYW5jaG9yLngpO1xyXG4gICAgdmFyIHcxID0gd2lkdGggKiAtdGhpcy5hbmNob3IueDtcclxuXHJcbiAgICB2YXIgaDAgPSBoZWlnaHQgKiAoMSAtIHRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gbWF0cml4IHx8IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIGlmIChiID09PSAwICYmIGMgPT09IDApIHtcclxuICAgICAgICAvLyAvLyBzY2FsZSBtYXkgYmUgbmVnYXRpdmUhXHJcbiAgICAgICAgLy8gaWYgKGEgPCAwKSBhICo9IC0xO1xyXG4gICAgICAgIC8vIGlmIChkIDwgMCkgZCAqPSAtMTtcclxuXHJcbiAgICAgICAgLy8gLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBubyByb3RhdGlvbiBnb2luZyBvbiByaWdodD8gUklHSFQ/XHJcbiAgICAgICAgLy8gLy8gaWYgdGhhdHMgdGhlIGNhc2UgdGhlbiB3ZSBjYW4gYXZvaWQgY2hlY2tpbmcgdGhlIGJvdW5kIHZhbHVlcyEgeWF5XHJcbiAgICAgICAgLy8gbWluWCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgIC8vIG1heFggPSBhICogdzAgKyB0eDtcclxuICAgICAgICAvLyBtaW5ZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgLy8gbWF4WSA9IGQgKiBoMCArIHR5O1xyXG5cclxuICAgICAgICBpZiAoYSA8IDApIHtcclxuICAgICAgICAgICAgbWluWCA9IGEgKiB3MCArIHR4O1xyXG4gICAgICAgICAgICBtYXhYID0gYSAqIHcxICsgdHg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWluWCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgICAgICBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZCA8IDApIHtcclxuICAgICAgICAgICAgbWluWSA9IGQgKiBoMCArIHR5O1xyXG4gICAgICAgICAgICBtYXhZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgICAgICBtYXhZID0gZCAqIGgwICsgdHk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDQgPSBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTQgPSBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgbWluWCA9IHgxIDwgbWluWCA/IHgxIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHg0IDwgbWluWCA/IHg0IDogbWluWDtcclxuXHJcbiAgICAgICAgbWluWSA9IHkxIDwgbWluWSA/IHkxIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICAgICAgbWF4WCA9IHgxID4gbWF4WCA/IHgxIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDIgPiBtYXhYID8geDIgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICAgICAgbWF4WSA9IHkxID4gbWF4WSA/IHkxIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHk0ID4gbWF4WSA/IHk0IDogbWF4WTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG5cclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYWdhaW4gaW4gdGhlIHJlbmRlciBjeWNsZSB3ZSBkbyBub3QgaGF2ZSB0byByZWNhbGN1bGF0ZVxyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IGJvdW5kcztcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICAvLyBJZiB0aGUgc3ByaXRlIGlzIG5vdCB2aXNpYmxlIG9yIHRoZSBhbHBoYSBpcyAwIHRoZW4gbm8gbmVlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50XHJcbiAgICBpZiAoXHJcbiAgICAgICAgdGhpcy52aXNpYmxlID09PSBmYWxzZSB8fFxyXG4gICAgICAgIHRoaXMuYWxwaGEgPT09IDAgfHxcclxuICAgICAgICB0aGlzLnJlbmRlcmFibGUgPT09IGZhbHNlIHx8XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPD0gMCB8fFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCA8PSAwXHJcbiAgICApXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIElnbm9yZSBudWxsIHNvdXJjZXNcclxuICAgIGlmICh0aGlzLnRleHR1cmUudmFsaWQpIHtcclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uIC8gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgICAgIC8vICBJZiB0aGUgdGV4dHVyZSBpcyB0cmltbWVkIHdlIG9mZnNldCBieSB0aGUgdHJpbSB4L3ksIG90aGVyd2lzZSB3ZSB1c2UgdGhlIGZyYW1lIGRpbWVuc2lvbnNcclxuICAgICAgICB2YXIgZHggPSB0aGlzLnRleHR1cmUudHJpbVxyXG4gICAgICAgICAgICA/IHRoaXMudGV4dHVyZS50cmltLnggLSB0aGlzLmFuY2hvci54ICogdGhpcy50ZXh0dXJlLnRyaW0ud2lkdGhcclxuICAgICAgICAgICAgOiB0aGlzLmFuY2hvci54ICogLXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB2YXIgZHkgPSB0aGlzLnRleHR1cmUudHJpbVxyXG4gICAgICAgICAgICA/IHRoaXMudGV4dHVyZS50cmltLnkgLSB0aGlzLmFuY2hvci55ICogdGhpcy50ZXh0dXJlLnRyaW0uaGVpZ2h0XHJcbiAgICAgICAgICAgIDogdGhpcy5hbmNob3IueSAqIC10aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAvLyAgQWxsb3cgZm9yIHBpeGVsIHJvdW5kaW5nXHJcbiAgICAgICAgaWYgKHJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMpIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgICh0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKSB8IDAsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eSAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGR4ID0gZHggfCAwO1xyXG4gICAgICAgICAgICBkeSA9IGR5IHwgMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5iLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbnQgIT09ICcjZmZmZmZmJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZWRUaW50ICE9PSB0aGlzLnRpbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkVGludCA9IHRoaXMudGludDtcclxuICAgICAgICAgICAgICAgIHRoaXMudGludGVkVGV4dHVyZSA9IFRpbnkuQ2FudmFzVGludGVyLmdldFRpbnRlZFRleHR1cmUodGhpcywgdGhpcy50aW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgIHRoaXMudGludGVkVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBkeCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICBkeSAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgLyByZXNvbHV0aW9uXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueSxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBPVkVSV1JJVEVcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlRleHQgPSBmdW5jdGlvbiAodGV4dCwgc3R5bGUpIHtcclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IDE7XHJcblxyXG4gICAgVGlueS5TcHJpdGUuY2FsbCh0aGlzLCBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyh0aGlzLmNhbnZhcykpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dCh0ZXh0KTtcclxuICAgIHRoaXMuc2V0U3R5bGUoc3R5bGUpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5TcHJpdGUucHJvdG90eXBlKTtcclxuVGlueS5UZXh0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGV4dDtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRleHQucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnkgKiB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbiAoc3R5bGUpIHtcclxuICAgIHN0eWxlID0gc3R5bGUgfHwge307XHJcbiAgICBzdHlsZS5mb250ID0gc3R5bGUuZm9udCB8fCBcImJvbGQgMjBwdCBBcmlhbFwiO1xyXG4gICAgc3R5bGUuZmlsbCA9IHN0eWxlLmZpbGwgfHwgXCJibGFja1wiO1xyXG4gICAgc3R5bGUuYWxpZ24gPSBzdHlsZS5hbGlnbiB8fCBcImxlZnRcIjtcclxuICAgIHN0eWxlLnN0cm9rZSA9IHN0eWxlLnN0cm9rZSB8fCBcImJsYWNrXCI7XHJcbiAgICBzdHlsZS5zdHJva2VUaGlja25lc3MgPSBzdHlsZS5zdHJva2VUaGlja25lc3MgfHwgMDtcclxuICAgIHN0eWxlLndvcmRXcmFwID0gc3R5bGUud29yZFdyYXAgfHwgZmFsc2U7XHJcbiAgICBzdHlsZS5saW5lU3BhY2luZyA9IHN0eWxlLmxpbmVTcGFjaW5nIHx8IDA7XHJcbiAgICBzdHlsZS53b3JkV3JhcFdpZHRoID0gc3R5bGUud29yZFdyYXBXaWR0aCAhPT0gdW5kZWZpbmVkID8gc3R5bGUud29yZFdyYXBXaWR0aCA6IDEwMDtcclxuXHJcbiAgICBzdHlsZS5kcm9wU2hhZG93ID0gc3R5bGUuZHJvcFNoYWRvdyB8fCBmYWxzZTtcclxuICAgIHN0eWxlLmRyb3BTaGFkb3dBbmdsZSA9IHN0eWxlLmRyb3BTaGFkb3dBbmdsZSAhPT0gdW5kZWZpbmVkID8gc3R5bGUuZHJvcFNoYWRvd0FuZ2xlIDogTWF0aC5QSSAvIDY7XHJcbiAgICBzdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UgPSBzdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UgIT09IHVuZGVmaW5lZCA/IHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSA6IDQ7XHJcbiAgICBzdHlsZS5kcm9wU2hhZG93Q29sb3IgPSBzdHlsZS5kcm9wU2hhZG93Q29sb3IgfHwgXCJibGFja1wiO1xyXG5cclxuICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcclxuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMudGV4dCA9IHRleHQudG9TdHJpbmcoKSB8fCBcIiBcIjtcclxuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy50ZXh0dXJlLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLnN0eWxlLmZvbnQ7XHJcblxyXG4gICAgdmFyIG91dHB1dFRleHQgPSB0aGlzLnRleHQ7XHJcblxyXG4gICAgLy8gd29yZCB3cmFwXHJcbiAgICAvLyBwcmVzZXJ2ZSBvcmlnaW5hbCB0ZXh0XHJcbiAgICBpZiAodGhpcy5zdHlsZS53b3JkV3JhcCkgb3V0cHV0VGV4dCA9IHRoaXMud29yZFdyYXAodGhpcy50ZXh0KTtcclxuXHJcbiAgICAvL3NwbGl0IHRleHQgaW50byBsaW5lc1xyXG4gICAgdmFyIGxpbmVzID0gb3V0cHV0VGV4dC5zcGxpdCgvKD86XFxyXFxufFxccnxcXG4pLyk7XHJcblxyXG4gICAgLy9jYWxjdWxhdGUgdGV4dCB3aWR0aFxyXG4gICAgdmFyIGxpbmVXaWR0aHMgPSBbXTtcclxuICAgIHZhciBtYXhMaW5lV2lkdGggPSAwO1xyXG4gICAgdmFyIGZvbnRQcm9wZXJ0aWVzID0gdGhpcy5kZXRlcm1pbmVGb250UHJvcGVydGllcyh0aGlzLnN0eWxlLmZvbnQpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBsaW5lV2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQobGluZXNbaV0pLndpZHRoO1xyXG4gICAgICAgIGxpbmVXaWR0aHNbaV0gPSBsaW5lV2lkdGg7XHJcbiAgICAgICAgbWF4TGluZVdpZHRoID0gTWF0aC5tYXgobWF4TGluZVdpZHRoLCBsaW5lV2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB3aWR0aCA9IG1heExpbmVXaWR0aCArIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzO1xyXG4gICAgaWYgKHRoaXMuc3R5bGUuZHJvcFNoYWRvdykgd2lkdGggKz0gdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcblxyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSAod2lkdGggKyB0aGlzLmNvbnRleHQubGluZVdpZHRoKSAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICAvL2NhbGN1bGF0ZSB0ZXh0IGhlaWdodFxyXG4gICAgdmFyIGxpbmVIZWlnaHQgPSBmb250UHJvcGVydGllcy5mb250U2l6ZSArIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzICsgdGhpcy5zdHlsZS5saW5lU3BhY2luZztcclxuXHJcbiAgICB2YXIgaGVpZ2h0ID0gbGluZUhlaWdodCAqIGxpbmVzLmxlbmd0aDtcclxuICAgIGlmICh0aGlzLnN0eWxlLmRyb3BTaGFkb3cpIGhlaWdodCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSAoaGVpZ2h0IC0gdGhpcy5zdHlsZS5saW5lU3BhY2luZykgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKHRoaXMucmVzb2x1dGlvbiwgdGhpcy5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICBpZiAobmF2aWdhdG9yLmlzQ29jb29uSlMpIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgLy8gdXNlZCBmb3IgZGVidWdnaW5nLi5cclxuICAgIC8vdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9XCIjRkYwMDAwXCJcclxuICAgIC8vdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLnN0eWxlLmZvbnQ7XHJcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0eWxlLnN0cm9rZTtcclxuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcztcclxuICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcclxuICAgIHRoaXMuY29udGV4dC5taXRlckxpbWl0ID0gMjtcclxuXHJcbiAgICAvL3RoaXMuY29udGV4dC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcblxyXG4gICAgdmFyIGxpbmVQb3NpdGlvblg7XHJcbiAgICB2YXIgbGluZVBvc2l0aW9uWTtcclxuXHJcbiAgICBpZiAodGhpcy5zdHlsZS5kcm9wU2hhZG93KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0NvbG9yO1xyXG5cclxuICAgICAgICB2YXIgeFNoYWRvd09mZnNldCA9IE1hdGguc2luKHRoaXMuc3R5bGUuZHJvcFNoYWRvd0FuZ2xlKSAqIHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG4gICAgICAgIHZhciB5U2hhZG93T2Zmc2V0ID0gTWF0aC5jb3ModGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyO1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25ZID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyICsgaSAqIGxpbmVIZWlnaHQgKyBmb250UHJvcGVydGllcy5hc2NlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdHlsZS5hbGlnbiA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdHlsZS5hbGlnbiA9PT0gXCJjZW50ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSAobWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXSkgLyAyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdHlsZS5maWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblggKyB4U2hhZG93T2Zmc2V0LCBsaW5lUG9zaXRpb25ZICsgeVNoYWRvd09mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICBpZihkcm9wU2hhZG93KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3NldCBjYW52YXMgdGV4dCBzdHlsZXNcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLnN0eWxlLmZpbGw7XHJcblxyXG4gICAgLy9kcmF3IGxpbmVzIGxpbmUgYnkgbGluZVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGluZVBvc2l0aW9uWCA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMjtcclxuICAgICAgICBsaW5lUG9zaXRpb25ZID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyICsgaSAqIGxpbmVIZWlnaHQgKyBmb250UHJvcGVydGllcy5hc2NlbnQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlLmFsaWduID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSBtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdHlsZS5hbGlnbiA9PT0gXCJjZW50ZXJcIikge1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdHlsZS5zdHJva2UgJiYgdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblgsIGxpbmVQb3NpdGlvblkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGUuZmlsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblgsIGxpbmVQb3NpdGlvblkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gIGlmKGRyb3BTaGFkb3cpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVUZXh0dXJlKCk7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnVwZGF0ZVRleHR1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnRleHR1cmUud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMudGV4dHVyZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbiAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCA9IHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0ID0gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLl93aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgaWYgKHRoaXMuZGlydHkgfHwgdGhpcy5yZXNvbHV0aW9uICE9PSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pIHtcclxuICAgICAgICB0aGlzLnJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcywgcmVuZGVyU2Vzc2lvbik7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLmRldGVybWluZUZvbnRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGZvbnRTdHlsZSkge1xyXG4gICAgdmFyIHByb3BlcnRpZXMgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZVtmb250U3R5bGVdO1xyXG5cclxuICAgIGlmICghcHJvcGVydGllcykge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSB7fTtcclxuXHJcbiAgICAgICAgdmFyIGNhbnZhcyA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcztcclxuICAgICAgICB2YXIgY29udGV4dCA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NvbnRleHQ7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnRTdHlsZTtcclxuXHJcbiAgICAgICAgdmFyIHdpZHRoID0gTWF0aC5jZWlsKGNvbnRleHQubWVhc3VyZVRleHQoXCJ8TcOJcVwiKS53aWR0aCk7XHJcbiAgICAgICAgdmFyIGJhc2VsaW5lID0gTWF0aC5jZWlsKGNvbnRleHQubWVhc3VyZVRleHQoXCJ8TcOJcVwiKS53aWR0aCk7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IDIgKiBiYXNlbGluZTtcclxuXHJcbiAgICAgICAgYmFzZWxpbmUgPSAoYmFzZWxpbmUgKiAxLjQpIHwgMDtcclxuXHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNmMDBcIjtcclxuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250U3R5bGU7XHJcblxyXG4gICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KFwifE3DiXFcIiwgMCwgYmFzZWxpbmUpO1xyXG5cclxuICAgICAgICB2YXIgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcclxuICAgICAgICB2YXIgcGl4ZWxzID0gaW1hZ2VkYXRhLmxlbmd0aDtcclxuICAgICAgICB2YXIgbGluZSA9IHdpZHRoICogNDtcclxuXHJcbiAgICAgICAgdmFyIGksIGo7XHJcblxyXG4gICAgICAgIHZhciBpZHggPSAwO1xyXG4gICAgICAgIHZhciBzdG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGFzY2VudC4gc2NhbiBmcm9tIHRvcCB0byBib3R0b20gdW50aWwgd2UgZmluZCBhIG5vbiByZWQgcGl4ZWxcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYmFzZWxpbmU7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGluZTsgaiArPSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VkYXRhW2lkeCArIGpdICE9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXN0b3ApIHtcclxuICAgICAgICAgICAgICAgIGlkeCArPSBsaW5lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3BlcnRpZXMuYXNjZW50ID0gYmFzZWxpbmUgLSBpO1xyXG5cclxuICAgICAgICBpZHggPSBwaXhlbHMgLSBsaW5lO1xyXG4gICAgICAgIHN0b3AgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gZGVzY2VudC4gc2NhbiBmcm9tIGJvdHRvbSB0byB0b3AgdW50aWwgd2UgZmluZCBhIG5vbiByZWQgcGl4ZWxcclxuICAgICAgICBmb3IgKGkgPSBoZWlnaHQ7IGkgPiBiYXNlbGluZTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsaW5lOyBqICs9IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbWFnZWRhdGFbaWR4ICsgal0gIT09IDI1NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc3RvcCkge1xyXG4gICAgICAgICAgICAgICAgaWR4IC09IGxpbmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvcGVydGllcy5kZXNjZW50ID0gaSAtIGJhc2VsaW5lO1xyXG4gICAgICAgIC8vVE9ETyBtaWdodCBuZWVkIGEgdHdlYWsuIGtpbmQgb2YgYSB0ZW1wIGZpeCFcclxuICAgICAgICBwcm9wZXJ0aWVzLmRlc2NlbnQgKz0gNjtcclxuICAgICAgICBwcm9wZXJ0aWVzLmZvbnRTaXplID0gcHJvcGVydGllcy5hc2NlbnQgKyBwcm9wZXJ0aWVzLmRlc2NlbnQ7XHJcblxyXG4gICAgICAgIFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhY2hlW2ZvbnRTdHlsZV0gPSBwcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS53b3JkV3JhcCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAvLyBHcmVlZHkgd3JhcHBpbmcgYWxnb3JpdGhtIHRoYXQgd2lsbCB3cmFwIHdvcmRzIGFzIHRoZSBsaW5lIGdyb3dzIGxvbmdlclxyXG4gICAgLy8gdGhhbiBpdHMgaG9yaXpvbnRhbCBib3VuZHMuXHJcbiAgICB2YXIgcmVzdWx0ID0gXCJcIjtcclxuICAgIHZhciBsaW5lcyA9IHRleHQuc3BsaXQoXCJcXG5cIik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHNwYWNlTGVmdCA9IHRoaXMuc3R5bGUud29yZFdyYXBXaWR0aDtcclxuICAgICAgICB2YXIgd29yZHMgPSBsaW5lc1tpXS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3b3Jkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICB2YXIgd29yZFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHdvcmRzW2pdKS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIHdvcmRXaWR0aFdpdGhTcGFjZSA9IHdvcmRXaWR0aCArIHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dChcIiBcIikud2lkdGg7XHJcbiAgICAgICAgICAgIGlmIChqID09PSAwIHx8IHdvcmRXaWR0aFdpdGhTcGFjZSA+IHNwYWNlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2tpcCBwcmludGluZyB0aGUgbmV3bGluZSBpZiBpdCdzIHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBsaW5lIHRoYXQgaXNcclxuICAgICAgICAgICAgICAgIC8vIGdyZWF0ZXIgdGhhbiB0aGUgd29yZCB3cmFwIHdpZHRoLlxyXG4gICAgICAgICAgICAgICAgaWYgKGogPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gd29yZHNbal07XHJcbiAgICAgICAgICAgICAgICBzcGFjZUxlZnQgPSB0aGlzLnN0eWxlLndvcmRXcmFwV2lkdGggLSB3b3JkV2lkdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUxlZnQgLT0gd29yZFdpZHRoV2l0aFNwYWNlO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiIFwiICsgd29yZHNbal07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpIDwgbGluZXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAobWF0cml4KSB7XHJcbiAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gVGlueS5TcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcy5jYWxsKHRoaXMsIG1hdHJpeCk7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBtYWtlIHN1cmUgdG8gcmVzZXQgdGhlIHRoZSBjb250ZXh0IGFuZCBjYW52YXMuLiBkb250IHdhbnQgdGhpcyBoYW5naW5nIGFyb3VuZCBpbiBtZW1vcnkhXHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5jYW52YXMgPSBudWxsO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZS5kZXN0cm95KCk7XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhY2hlID0ge307XHJcblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NvbnRleHQgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4iLCJUaW55LkNhbnZhc01hc2tNYW5hZ2VyID0gZnVuY3Rpb24gKCkge307XHJcblxyXG5UaW55LkNhbnZhc01hc2tNYW5hZ2VyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzTWFza01hbmFnZXI7XHJcblxyXG5UaW55LkNhbnZhc01hc2tNYW5hZ2VyLnByb3RvdHlwZS5wdXNoTWFzayA9IGZ1bmN0aW9uIChtYXNrRGF0YSwgcmVuZGVyU2Vzc2lvbikge1xyXG4gICAgdmFyIGNvbnRleHQgPSByZW5kZXJTZXNzaW9uLmNvbnRleHQ7XHJcblxyXG4gICAgY29udGV4dC5zYXZlKCk7XHJcblxyXG4gICAgdmFyIGNhY2hlQWxwaGEgPSBtYXNrRGF0YS5hbHBoYTtcclxuICAgIHZhciB0cmFuc2Zvcm0gPSBtYXNrRGF0YS53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICB0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS5jICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0udHkgKiByZXNvbHV0aW9uXHJcbiAgICApO1xyXG5cclxuICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3NNYXNrKG1hc2tEYXRhLCBjb250ZXh0KTtcclxuXHJcbiAgICBjb250ZXh0LmNsaXAoKTtcclxuXHJcbiAgICBtYXNrRGF0YS53b3JsZEFscGhhID0gY2FjaGVBbHBoYTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLnBvcE1hc2sgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnJlc3RvcmUoKTtcclxufTtcclxuIiwiVGlueS5DYW52YXNSZW5kZXJlciA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSBvcHRpb25zLnJlc29sdXRpb24gIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5yZXNvbHV0aW9uIDogMTtcclxuXHJcbiAgICB0aGlzLmNsZWFyQmVmb3JlUmVuZGVyID0gb3B0aW9ucy5jbGVhckJlZm9yZVJlbmRlciAhPSB1bmRlZmluZWQgPyBvcHRpb25zLmNsZWFyQmVmb3JlUmVuZGVyIDogdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnRyYW5zcGFyZW50ID0gb3B0aW9ucy50cmFuc3BhcmVudCAhPSB1bmRlZmluZWQgPyBvcHRpb25zLnRyYW5zcGFyZW50IDogZmFsc2U7XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplID0gb3B0aW9ucy5hdXRvUmVzaXplIHx8IGZhbHNlO1xyXG5cclxuICAgIC8vIHRoaXMud2lkdGggPSB3aWR0aCB8fCA4MDA7XHJcbiAgICAvLyB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCA2MDA7XHJcblxyXG4gICAgLy8gdGhpcy53aWR0aCAqPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB0aGlzLmhlaWdodCAqPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgaWYgKCFUaW55LmRlZmF1bHRSZW5kZXJlcikgVGlueS5kZWZhdWx0UmVuZGVyZXIgPSB0aGlzO1xyXG5cclxuICAgIHZhciB2aWV3ID0gKHRoaXMuZG9tRWxlbWVudCA9IG9wdGlvbnMuZG9tRWxlbWVudCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB2aWV3LmdldENvbnRleHQoXCIyZFwiLCB7IGFscGhhOiB0aGlzLnRyYW5zcGFyZW50IH0pO1xyXG5cclxuICAgIC8vIHZpZXcud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdmlldy5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLnJlc2l6ZSh3aWR0aCB8fCA4MDAsIGhlaWdodCB8fCA2MDApO1xyXG5cclxuICAgIHRoaXMuc2V0Q2xlYXJDb2xvcihcIiNmZmZmZmZcIik7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzTWFza01hbmFnZXIpIHRoaXMubWFza01hbmFnZXIgPSBuZXcgVGlueS5DYW52YXNNYXNrTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbiA9IHtcclxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgbWFza01hbmFnZXI6IHRoaXMubWFza01hbmFnZXIsXHJcbiAgICAgICAgc21vb3RoUHJvcGVydHk6IG51bGwsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgdHJ1ZSBQaXhpIHdpbGwgTWF0aC5mbG9vcigpIHgveSB2YWx1ZXMgd2hlbiByZW5kZXJpbmcsIHN0b3BwaW5nIHBpeGVsIGludGVycG9sYXRpb24uXHJcbiAgICAgICAgICogSGFuZHkgZm9yIGNyaXNwIHBpeGVsIGFydCBhbmQgc3BlZWQgb24gbGVnYWN5IGRldmljZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICByb3VuZFBpeGVsczogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgaWYgKFwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KSB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcImltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYgKFwibW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwibW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmIChcIm9JbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJvSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmIChcIm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwibXNJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNSZW5kZXJlcjtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuICAgIHRoaXMuY2xlYXJDb2xvciA9IGNvbG9yO1xyXG5cclxuICAgIC8vIGlmIChjb2xvciA9PT0gbnVsbCkge1xyXG4gICAgLy8gICAgIHRoaXMuY2xlYXJDb2xvciA9IG51bGw7XHJcbiAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHRoaXMuY2xlYXJDb2xvciA9IGNvbG9yIHx8IDB4MDAwMDAwO1xyXG4gICAgLy8gLy8gdGhpcy5iYWNrZ3JvdW5kQ29sb3JTcGxpdCA9IFRpbnkuaGV4MnJnYih0aGlzLmJhY2tncm91bmRDb2xvcik7XHJcbiAgICAvLyB2YXIgaGV4ID0gdGhpcy5jbGVhckNvbG9yLnRvU3RyaW5nKDE2KTtcclxuICAgIC8vIGhleCA9ICcwMDAwMDAnLnN1YnN0cigwLCA2IC0gaGV4Lmxlbmd0aCkgKyBoZXg7XHJcbiAgICAvLyB0aGlzLl9jbGVhckNvbG9yID0gJyMnICsgaGV4O1xyXG59O1xyXG5cclxuLy8gVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2V0UGl4ZWxBcnQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICB2YXIgY2FudmFzID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuLy8gICAgIHZhciB0eXBlcyA9IFsgJ29wdGltaXplU3BlZWQnLCAnLW1vei1jcmlzcC1lZGdlcycsICctby1jcmlzcC1lZGdlcycsICctd2Via2l0LW9wdGltaXplLWNvbnRyYXN0JywgJ29wdGltaXplLWNvbnRyYXN0JywgJ2NyaXNwLWVkZ2VzJywgJ3BpeGVsYXRlZCcgXTtcclxuXHJcbi8vICAgICB0eXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIGNhbnZhcy5zdHlsZVsnaW1hZ2UtcmVuZGVyaW5nJ10gPSB0eXBlO1xyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgY2FudmFzLnN0eWxlLm1zSW50ZXJwb2xhdGlvbk1vZGUgPSAnbmVhcmVzdC1uZWlnaGJvcic7XHJcbi8vICAgICB0aGlzLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSB0cnVlO1xyXG4vLyB9XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgIHNjZW5lLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5pc0NvY29vbkpTICYmIHRoaXMuZG9tRWxlbWVudC5zY3JlZW5jYW52YXMpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNsZWFyQmVmb3JlUmVuZGVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY2xlYXJDb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJPYmplY3Qoc2NlbmUpO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChyZW1vdmVWaWV3KSB7XHJcbiAgICBpZiAodHlwZW9mIHJlbW92ZVZpZXcgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICByZW1vdmVWaWV3ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVtb3ZlVmlldyAmJiB0aGlzLmRvbUVsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZG9tRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLm1hc2tNYW5hZ2VyID0gbnVsbDtcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbiA9IG51bGw7XHJcblxyXG4gICAgaWYgKFRpbnkuZGVmYXVsdFJlbmRlcmVyID09PSB0aGlzKSBUaW55LmRlZmF1bHRSZW5kZXJlciA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgdmlldy53aWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICB2aWV3LmhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcclxuICAgICAgICB2aWV3LnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgdmlldy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24gKHJlc29sdXRpb24pIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XHJcblxyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgdmlldy53aWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICB2aWV3LmhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyT2JqZWN0ID0gZnVuY3Rpb24gKGRpc3BsYXlPYmplY3QsIGNvbnRleHQpIHtcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLmNvbnRleHQ7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24ucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuICAgIGRpc3BsYXlPYmplY3QucmVuZGVyKHRoaXMucmVuZGVyU2Vzc2lvbik7XHJcbn07XHJcbiIsIlRpbnkuQ2FudmFzVGludGVyID0gZnVuY3Rpb24gKCkge307XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci5nZXRUaW50ZWRUZXh0dXJlID0gZnVuY3Rpb24gKHNwcml0ZSwgY29sb3IpIHtcclxuICAgIHZhciB0ZXh0dXJlID0gc3ByaXRlLnRleHR1cmU7XHJcblxyXG4gICAgaWYgKCF0ZXh0dXJlLl90aW50Q2FjaGUpIHRleHR1cmUuX3RpbnRDYWNoZSA9IHt9O1xyXG5cclxuICAgIGlmICh0ZXh0dXJlLl90aW50Q2FjaGVbY29sb3JdKSByZXR1cm4gdGV4dHVyZS5fdGludENhY2hlW2NvbG9yXTtcclxuXHJcbiAgICB2YXIgY2FudmFzID0gVGlueS5DYW52YXNUaW50ZXIuY2FudmFzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcblxyXG4gICAgVGlueS5DYW52YXNUaW50ZXIudGludE1ldGhvZCh0ZXh0dXJlLCBjb2xvciwgY2FudmFzKTtcclxuXHJcbiAgICBpZiAoVGlueS5DYW52YXNUaW50ZXIuY29udmVydFRpbnRUb0ltYWdlKSB7XHJcbiAgICAgICAgLy8gaXMgdGhpcyBiZXR0ZXI/XHJcbiAgICAgICAgdmFyIHRpbnRJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRpbnRJbWFnZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcblxyXG4gICAgICAgIC8vIHRleHR1cmUuX3RpbnRDYWNoZVtzdHJpbmdDb2xvcl0gPSB0aW50SW1hZ2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIFRpbnkuQ2FudmFzVGludGVyLmNhbnZhcyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzVGludGVyLmNhY2hlVGludCkgdGV4dHVyZS5fdGludENhY2hlW2NvbG9yXSA9IGNhbnZhcztcclxuXHJcbiAgICByZXR1cm4gY2FudmFzO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseSA9IGZ1bmN0aW9uICh0ZXh0dXJlLCBjb2xvciwgY2FudmFzKSB7XHJcbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgdmFyIGNyb3AgPSB0ZXh0dXJlLmNyb3A7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY3JvcC53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBjcm9wLmhlaWdodDtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQpO1xyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJtdWx0aXBseVwiO1xyXG5cclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRleHR1cmUuc291cmNlLCBjcm9wLngsIGNyb3AueSwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQsIDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tYXRvcFwiO1xyXG5cclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRleHR1cmUuc291cmNlLCBjcm9wLngsIGNyb3AueSwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQsIDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoUGVyUGl4ZWwgPSBmdW5jdGlvbiAodGV4dHVyZSwgY29sb3IsIGNhbnZhcykge1xyXG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgIHZhciBjcm9wID0gdGV4dHVyZS5jcm9wO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNyb3Aud2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gY3JvcC5oZWlnaHQ7XHJcblxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImNvcHlcIjtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRleHR1cmUuc291cmNlLCBjcm9wLngsIGNyb3AueSwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQsIDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICB2YXIgcmdiVmFsdWVzID0gVGlueS5oZXgycmdiKFRpbnkuc3R5bGUyaGV4KGNvbG9yKSk7XHJcbiAgICB2YXIgciA9IHJnYlZhbHVlc1swXSxcclxuICAgICAgICBnID0gcmdiVmFsdWVzWzFdLFxyXG4gICAgICAgIGIgPSByZ2JWYWx1ZXNbMl07XHJcblxyXG4gICAgdmFyIHBpeGVsRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICB2YXIgcGl4ZWxzID0gcGl4ZWxEYXRhLmRhdGE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwaXhlbHMubGVuZ3RoOyBpICs9IDQpIHtcclxuICAgICAgICBwaXhlbHNbaSArIDBdICo9IHI7XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAxXSAqPSBnO1xyXG4gICAgICAgIHBpeGVsc1tpICsgMl0gKj0gYjtcclxuXHJcbiAgICAgICAgaWYgKCFUaW55LmNhbkhhbmRsZUFscGhhKSB7XHJcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IHBpeGVsc1tpICsgM107XHJcblxyXG4gICAgICAgICAgICBwaXhlbHNbaSArIDBdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgICAgICBwaXhlbHNbaSArIDFdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgICAgICBwaXhlbHNbaSArIDJdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShwaXhlbERhdGEsIDAsIDApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2hlY2tJbnZlcnNlQWxwaGEoKSB7XHJcbiAgICB2YXIgY2FudmFzID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKDIsIDEsIHsgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlIH0pO1xyXG5cclxuICAgIGNhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgxMCwgMjAsIDMwLCAwLjUpXCI7XHJcblxyXG4gICAgLy8gIERyYXcgYSBzaW5nbGUgcGl4ZWxcclxuICAgIGNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIC8vICBHZXQgdGhlIGNvbG9yIHZhbHVlc1xyXG4gICAgdmFyIHMxID0gY2FudmFzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIC8vICBQbG90IHRoZW0gdG8geDJcclxuICAgIGNhbnZhcy5jb250ZXh0LnB1dEltYWdlRGF0YShzMSwgMSwgMCk7XHJcblxyXG4gICAgLy8gIEdldCB0aG9zZSB2YWx1ZXNcclxuICAgIHZhciBzMiA9IGNhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YSgxLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgQ29tcGFyZSBhbmQgcmV0dXJuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIHMyLmRhdGFbMF0gPT09IHMxLmRhdGFbMF0gJiZcclxuICAgICAgICBzMi5kYXRhWzFdID09PSBzMS5kYXRhWzFdICYmXHJcbiAgICAgICAgczIuZGF0YVsyXSA9PT0gczEuZGF0YVsyXSAmJlxyXG4gICAgICAgIHMyLmRhdGFbM10gPT09IHMxLmRhdGFbM11cclxuICAgICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrQmxlbmRNb2RlKCkge1xyXG4gICAgdmFyIHBuZ0hlYWQgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQVFBQUFBQkFRTUFBQUREOHAyT0FBQUFBMUJNVkVYL1wiO1xyXG4gICAgdmFyIHBuZ0VuZCA9IFwiQUFBQUNrbEVRVlFJMTJOZ0FBQUFBZ0FCNGlHOE13QUFBQUJKUlU1RXJrSmdnZz09XCI7XHJcblxyXG4gICAgdmFyIG1hZ2VudGEgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBtYWdlbnRhLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgeWVsbG93ID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgICAgIHllbGxvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSA2O1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIsIHsgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcIm11bHRpcGx5XCI7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShtYWdlbnRhLCAwLCAwKTtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoeWVsbG93LCAyLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGV4dC5nZXRJbWFnZURhdGEoMiwgMCwgMSwgMSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgyLCAwLCAxLCAxKS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgVGlueS5zdXBwb3J0TmV3QmxlbmRNb2RlcyA9IGRhdGFbMF0gPT09IDI1NSAmJiBkYXRhWzFdID09PSAwICYmIGRhdGFbMl0gPT09IDA7XHJcbiAgICAgICAgICAgIFRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QgPSBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHllbGxvdy5zcmMgPSBwbmdIZWFkICsgXCIvd0NLeHZSRlwiICsgcG5nRW5kO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYWdlbnRhLnNyYyA9IHBuZ0hlYWQgKyBcIkFQODA0T2E2XCIgKyBwbmdFbmQ7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci5jb252ZXJ0VGludFRvSW1hZ2UgPSBmYWxzZTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLmNhY2hlVGludCA9IGZhbHNlO1xyXG5cclxuVGlueS5jYW5IYW5kbGVBbHBoYSA9IGNoZWNrSW52ZXJzZUFscGhhKCk7XHJcblxyXG5UaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzID0gY2hlY2tCbGVuZE1vZGUoKTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QgPSBUaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzXHJcbiAgICA/IFRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoTXVsdGlwbHlcclxuICAgIDogVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhQZXJQaXhlbDtcclxuIiwiVGlueS5DYW52YXNHcmFwaGljcyA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyA9IGZ1bmN0aW9uIChncmFwaGljcywgY29udGV4dCkge1xyXG4gICAgdmFyIHdvcmxkQWxwaGEgPSBncmFwaGljcy53b3JsZEFscGhhO1xyXG5cclxuICAgIGlmIChncmFwaGljcy5kaXJ0eSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlR3JhcGhpY3NUaW50KGdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IGRhdGEuX2ZpbGxUaW50O1xyXG4gICAgICAgIHZhciBsaW5lQ29sb3IgPSBkYXRhLl9saW5lVGludDtcclxuXHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBkYXRhLmxpbmVXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBzaGFwZS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHBvaW50cy5sZW5ndGggLyAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tqICogMl0sIHBvaW50c1tqICogMiArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNoYXBlLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXSAmJiBwb2ludHNbMV0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGxDb2xvcjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gbGluZUNvbG9yO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGxDb2xvcjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBsaW5lQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpIHtcclxuICAgICAgICAgICAgLy8gVE9ETyAtIG5lZWQgdG8gYmUgVW5kZWZpbmVkIVxyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhzaGFwZS54LCBzaGFwZS55LCBzaGFwZS5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGxDb2xvcjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gbGluZUNvbG9yO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUCkge1xyXG4gICAgICAgICAgICAvLyBlbGxpcHNlIGNvZGUgdGFrZW4gZnJvbTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTcyNzk4L2hvdy10by1kcmF3LWFuLW92YWwtaW4taHRtbDUtY2FudmFzXHJcblxyXG4gICAgICAgICAgICB2YXIgdyA9IHNoYXBlLndpZHRoICogMjtcclxuICAgICAgICAgICAgdmFyIGggPSBzaGFwZS5oZWlnaHQgKiAyO1xyXG5cclxuICAgICAgICAgICAgdmFyIHggPSBzaGFwZS54IC0gdyAvIDI7XHJcbiAgICAgICAgICAgIHZhciB5ID0gc2hhcGUueSAtIGggLyAyO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYXBwYSA9IDAuNTUyMjg0OCxcclxuICAgICAgICAgICAgICAgIG94ID0gKHcgLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBveSA9IChoIC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcclxuICAgICAgICAgICAgICAgIHhlID0geCArIHcsIC8vIHgtZW5kXHJcbiAgICAgICAgICAgICAgICB5ZSA9IHkgKyBoLCAvLyB5LWVuZFxyXG4gICAgICAgICAgICAgICAgeG0gPSB4ICsgdyAvIDIsIC8vIHgtbWlkZGxlXHJcbiAgICAgICAgICAgICAgICB5bSA9IHkgKyBoIC8gMjsgLy8geS1taWRkbGVcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHgsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHgsIHltIC0gb3ksIHhtIC0gb3gsIHksIHhtLCB5KTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtICsgb3gsIHksIHhlLCB5bSAtIG95LCB4ZSwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeGUsIHltICsgb3ksIHhtICsgb3gsIHllLCB4bSwgeWUpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gLSBveCwgeWUsIHgsIHltICsgb3ksIHgsIHltKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGxpbmVDb2xvcjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMpIHtcclxuICAgICAgICAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF4UmFkaXVzID0gKE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMikgfCAwO1xyXG4gICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgPiBtYXhSYWRpdXMgPyBtYXhSYWRpdXMgOiByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhyeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5ICsgaGVpZ2h0LCByeCArIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoIC0gcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSArIGhlaWdodCwgcnggKyB3aWR0aCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoLCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSwgcnggKyB3aWR0aCAtIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5LCByeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGxpbmVDb2xvcjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTilcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHZhciByeCA9IHNoYXBlLng7XHJcbiAgICAgICAgLy8gICAgIHZhciByeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgLy8gICAgIHZhciB3aWR0aCA9IHNoYXBlLndpZHRoO1xyXG4gICAgICAgIC8vICAgICB2YXIgaGVpZ2h0ID0gc2hhcGUuaGVpZ2h0O1xyXG4gICAgICAgIC8vICAgICB2YXIgcmFkaXVzID0gc2hhcGUucmFkaXVzO1xyXG5cclxuICAgICAgICAvLyAgICAgaWYgKGRhdGEuZmlsbENvbG9yKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgIC8vICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgLy8gICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gZmlsbENvbG9yO1xyXG4gICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICBjb250ZXh0LmxpbmVKb2luID0gXCJyb3VuZFwiO1xyXG4gICAgICAgIC8vICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHJhZGl1cztcclxuXHJcbiAgICAgICAgLy8gICAgIGNvbnRleHQuc3Ryb2tlUmVjdChyeCArIChyYWRpdXMgLyAyKSwgcnkgKyAocmFkaXVzIC8gMiksIHdpZHRoIC0gcmFkaXVzLCBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgIC8vICAgICBjb250ZXh0LmZpbGxSZWN0KHJ4ICsgKHJhZGl1cyAvIDIpLCByeSArIChyYWRpdXMgLyAyKSwgd2lkdGggLSByYWRpdXMsIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljc01hc2sgPSBmdW5jdGlvbiAoZ3JhcGhpY3MsIGNvbnRleHQpIHtcclxuICAgIHZhciBsZW4gPSBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoO1xyXG5cclxuICAgIGlmIChsZW4gPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpIHtcclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcG9pbnRzLmxlbmd0aCAvIDI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2ogKiAyXSwgcG9pbnRzW2ogKiAyICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXSAmJiBwb2ludHNbMV0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJFQ1QpIHtcclxuICAgICAgICAgICAgY29udGV4dC5yZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuQ0lSQykge1xyXG4gICAgICAgICAgICAvLyBUT0RPIC0gbmVlZCB0byBiZSBVbmRlZmluZWQhXHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUCkge1xyXG4gICAgICAgICAgICAvLyBlbGxpcHNlIGNvZGUgdGFrZW4gZnJvbTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTcyNzk4L2hvdy10by1kcmF3LWFuLW92YWwtaW4taHRtbDUtY2FudmFzXHJcblxyXG4gICAgICAgICAgICB2YXIgdyA9IHNoYXBlLndpZHRoICogMjtcclxuICAgICAgICAgICAgdmFyIGggPSBzaGFwZS5oZWlnaHQgKiAyO1xyXG5cclxuICAgICAgICAgICAgdmFyIHggPSBzaGFwZS54IC0gdyAvIDI7XHJcbiAgICAgICAgICAgIHZhciB5ID0gc2hhcGUueSAtIGggLyAyO1xyXG5cclxuICAgICAgICAgICAgdmFyIGthcHBhID0gMC41NTIyODQ4LFxyXG4gICAgICAgICAgICAgICAgb3ggPSAodyAvIDIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IGhvcml6b250YWxcclxuICAgICAgICAgICAgICAgIG95ID0gKGggLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCB2ZXJ0aWNhbFxyXG4gICAgICAgICAgICAgICAgeGUgPSB4ICsgdywgLy8geC1lbmRcclxuICAgICAgICAgICAgICAgIHllID0geSArIGgsIC8vIHktZW5kXHJcbiAgICAgICAgICAgICAgICB4bSA9IHggKyB3IC8gMiwgLy8geC1taWRkbGVcclxuICAgICAgICAgICAgICAgIHltID0geSArIGggLyAyOyAvLyB5LW1pZGRsZVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeCwgeW0gLSBveSwgeG0gLSBveCwgeSwgeG0sIHkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gKyBveCwgeSwgeGUsIHltIC0gb3ksIHhlLCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4ZSwgeW0gKyBveSwgeG0gKyBveCwgeWUsIHhtLCB5ZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSAtIG94LCB5ZSwgeCwgeW0gKyBveSwgeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQyB8fCBkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOKSB7XHJcbiAgICAgICAgICAgIHZhciByeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgIHZhciByeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHNoYXBlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gc2hhcGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gc2hhcGUucmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1heFJhZGl1cyA9IChNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIpIHwgMDtcclxuICAgICAgICAgICAgcmFkaXVzID0gcmFkaXVzID4gbWF4UmFkaXVzID8gbWF4UmFkaXVzIDogcmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocngsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSArIGhlaWdodCwgcnggKyByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCAtIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnkgKyBoZWlnaHQsIHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnksIHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSwgcngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnVwZGF0ZUdyYXBoaWNzVGludCA9IGZ1bmN0aW9uIChncmFwaGljcykge1xyXG4gICAgY29uc29sZS5sb2coZ3JhcGhpY3MudGludCk7XHJcblxyXG4gICAgaWYgKGdyYXBoaWNzLnRpbnQgPT09IFwiI2ZmZmZmZlwiKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0aW50SGV4ID0gVGlueS5zdHlsZTJoZXgoZ3JhcGhpY3MudGludCk7XHJcbiAgICBcclxuICAgIHZhciB0aW50UiA9ICgodGludEhleCA+PiAxNikgJiAweGZmKSAvIDI1NTtcclxuICAgIHZhciB0aW50RyA9ICgodGludEhleCA+PiA4KSAmIDB4ZmYpIC8gMjU1O1xyXG4gICAgdmFyIHRpbnRCID0gKHRpbnRIZXggJiAweGZmKSAvIDI1NTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYXBoaWNzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBkYXRhID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhW2ldO1xyXG5cclxuICAgICAgICB2YXIgZmlsbENvbG9yID0gVGlueS5zdHlsZTJoZXgoZGF0YS5maWxsQ29sb3IpO1xyXG4gICAgICAgIHZhciBsaW5lQ29sb3IgPSBUaW55LnN0eWxlMmhleChkYXRhLmxpbmVDb2xvcik7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIGNvbG9yUiA9IChmaWxsQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgICAgICB2YXIgY29sb3JHID0gKGZpbGxDb2xvciA+PiA4ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgdmFyIGNvbG9yQiA9IChmaWxsQ29sb3IgJiAweEZGKSAvIDI1NTsgXHJcbiAgICAgICAgY29sb3JSICo9IHRpbnRSO1xyXG4gICAgICAgIGNvbG9yRyAqPSB0aW50RztcclxuICAgICAgICBjb2xvckIgKj0gdGludEI7XHJcbiAgICAgICAgZmlsbENvbG9yID0gKChjb2xvclIqMjU1IDw8IDE2KSArIChjb2xvckcqMjU1IDw8IDgpICsgY29sb3JCKjI1NSk7XHJcbiAgICAgICAgY29sb3JSID0gKGxpbmVDb2xvciA+PiAxNiAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIGNvbG9yRyA9IChsaW5lQ29sb3IgPj4gOCAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIGNvbG9yQiA9IChsaW5lQ29sb3IgJiAweEZGKSAvIDI1NTsgXHJcbiAgICAgICAgY29sb3JSICo9IHRpbnRSO1xyXG4gICAgICAgIGNvbG9yRyAqPSB0aW50RztcclxuICAgICAgICBjb2xvckIgKj0gdGludEI7XHJcbiAgICAgICAgbGluZUNvbG9yID0gKChjb2xvclIqMjU1IDw8IDE2KSArIChjb2xvckcqMjU1IDw8IDgpICsgY29sb3JCKjI1NSk7ICAgXHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgZGF0YS5fZmlsbFRpbnQgPVxyXG4gICAgICAgICAgICAoKCgoKGZpbGxDb2xvciA+PiAxNikgJiAweGZmKSAvIDI1NSkgKiB0aW50UiAqIDI1NSkgPDwgMTYpICtcclxuICAgICAgICAgICAgKCgoKChmaWxsQ29sb3IgPj4gOCkgJiAweGZmKSAvIDI1NSkgKiB0aW50RyAqIDI1NSkgPDwgOCkgK1xyXG4gICAgICAgICAgICAoKGZpbGxDb2xvciAmIDB4ZmYpIC8gMjU1KSAqIHRpbnRCICogMjU1O1xyXG4gICAgICAgIGRhdGEuX2xpbmVUaW50ID1cclxuICAgICAgICAgICAgKCgoKChsaW5lQ29sb3IgPj4gMTYpICYgMHhmZikgLyAyNTUpICogdGludFIgKiAyNTUpIDw8IDE2KSArXHJcbiAgICAgICAgICAgICgoKCgobGluZUNvbG9yID4+IDgpICYgMHhmZikgLyAyNTUpICogdGludEcgKiAyNTUpIDw8IDgpICtcclxuICAgICAgICAgICAgKChsaW5lQ29sb3IgJiAweGZmKSAvIDI1NSkgKiB0aW50QiAqIDI1NTtcclxuXHJcbiAgICAgICAgZGF0YS5fZmlsbFRpbnQgPSBUaW55LmhleDJzdHlsZShkYXRhLl9maWxsVGludCk7XHJcbiAgICAgICAgZGF0YS5fbGluZVRpbnQgPSBUaW55LmhleDJzdHlsZShkYXRhLl9saW5lVGludCk7XHJcbiAgICB9XHJcbn07XHJcbiIsInZhciBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzO1xyXG5cclxuVGlueS5JbnB1dCA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdmFyIHZpZXcgPSAodGhpcy5kb21FbGVtZW50ID0gZ2FtZS5pbnB1dFZpZXcpO1xyXG5cclxuICAgIHRoaXMuYm91bmRzID0geyB4OiAwLCB5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XHJcbiAgICB0aGlzLmNhbmRpZGF0ZXMgPSBbXTtcclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG5cclxuICAgIHRoaXMubGFzdE1vdmUgPSBudWxsO1xyXG4gICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmRvd25IYW5kbGVyID0gdGhpcy5kb3duSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IHRoaXMubW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBIYW5kbGVyID0gdGhpcy51cEhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIC8vIHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICAvLyB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG5cclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG5cclxuICAgIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKHRoaXMpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5JbnB1dC5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgVGlueS5JbnB1dC5zeXN0ZW1zW2ldLmluaXQuY2FsbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUJvdW5kcygpO1xyXG59O1xyXG5cclxuVGlueS5JbnB1dC5wcm90b3R5cGUgPSB7XHJcbiAgICBhZGQ6IGZ1bmN0aW9uIChvYmplY3QsIG9wdGlvbnMpIHtcclxuICAgICAgICBvYmplY3QuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgb3B0aW9ucy5zeXN0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICBvYmplY3QuaW5wdXQgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbihvYmplY3QuaW5wdXQpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChvYmplY3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3QuaW5kZXhPZihvYmplY3QpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlZCA9IHRoaXMubGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIHJlbW92ZWQuaW5wdXQgPSBudWxsO1xyXG4gICAgICAgICAgICByZW1vdmVkLmlucHV0RW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0SGFuZGxlcjogZnVuY3Rpb24gKG5hbWUsIGV2ZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSlcclxuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5nZXRDb29yZHMoZXZlbnQpO1xyXG5cclxuICAgICAgICBpZiAoY29vcmRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lICE9IFwibW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRpbnkuSW5wdXQuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpbnkuSW5wdXQuc3lzdGVtc1tpXS5wcmVIYW5kbGUuY2FsbCh0aGlzLCBjb29yZHMueCwgY29vcmRzLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc0dvb2QsIG9iajtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMubGlzdC5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMubGlzdFt0XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaW5wdXRFbmFibGVkIHx8ICFvYmoucGFyZW50KSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5pbnB1dC5jaGVja0JvdW5kcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNHb29kID0gb2JqLmlucHV0LmNoZWNrQm91bmRzLmNhbGwodGhpcywgb2JqLCBjb29yZHMueCwgY29vcmRzLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaXNHb29kID0gVGlueS5JbnB1dC5jaGVja0JvdW5kcy5jYWxsKHRoaXMsIG9iaiwgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzR29vZCkgdGhpcy5jYW5kaWRhdGVzLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBpID0gdGhpcy5jYW5kaWRhdGVzLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmNhbmRpZGF0ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmlucHV0W1wibGFzdF9cIiArIG5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gb2JqLmlucHV0W1wibGFzdF9kb3duXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnQgJiYgVGlueS5NYXRoLmRpc3RhbmNlKHBvaW50LngsIHBvaW50LnksIGNvb3Jkcy54LCBjb29yZHMueSkgPCAzMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KFwiY2xpY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmlucHV0LnRyYW5zcGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB2YXIgb2JqID0gdGhpcy5jYW5kaWRhdGVzW2kgLSAxXVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9iai5pbnB1dFtcImxhc3RfXCIgKyBuYW1lXSA9IHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9iai5pbnB1dC5lbWl0KG5hbWUsIHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAobmFtZSA9PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdmFyIHBvaW50ID0gb2JqLmlucHV0W1wibGFzdF9kb3duXCJdXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmIChwb2ludCAmJiBUaW55Lk1hdGguZGlzdGFuY2UocG9pbnQueCwgcG9pbnQueSwgY29vcmRzLngsIGNvb3Jkcy55KSA8IDMwKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQoXCJjbGlja1wiLCB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW92ZUhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMubGFzdE1vdmUgPSBldmVudDtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcIm1vdmVcIiwgZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cEhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNEb3duID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJ1cFwiLCB0aGlzLmxhc3RNb3ZlKTtcclxuICAgIH0sXHJcblxyXG4gICAgZG93bkhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxhc3RNb3ZlID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJkb3duXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tIYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcImNsaWNrXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q29vcmRzOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgY29vcmRzID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGV2ZW50IGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xyXG4gICAgICAgICAgICBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBldmVudC50b3VjaGVzWzBdLmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmNsaWVudFggJiYgZXZlbnQuY2xpZW50WSkge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGxpc3RlbmluZ1RvVG91Y2hFdmVudHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE1vdXNlIGV2ZW50XHJcbiAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICB5OiBldmVudC5jbGllbnRZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKGxpc3RlbmluZ1RvVG91Y2hFdmVudHMgJiYgZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB8fCBjb29yZHMgPT09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgIHg6IGNvb3Jkcy54IC0gdGhpcy5ib3VuZHMueCxcclxuICAgICAgICAgICAgeTogY29vcmRzLnkgLSB0aGlzLmJvdW5kcy55XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlQm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYm91bmRzID0gdGhpcy5ib3VuZHM7XHJcblxyXG4gICAgICAgIHZhciBjbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBib3VuZHMueCA9IGNsaWVudFJlY3QubGVmdDtcclxuICAgICAgICBib3VuZHMueSA9IGNsaWVudFJlY3QudG9wO1xyXG4gICAgICAgIGJvdW5kcy53aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XHJcbiAgICAgICAgYm91bmRzLmhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcblxyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LklucHV0LmNoZWNrQm91bmRzID0gZnVuY3Rpb24gKG9iaiwgeCwgeSkge1xyXG4gICAgaWYgKG9iai53b3JsZFZpc2libGUpIHtcclxuICAgICAgICBpZiAob2JqLmdldEJvdW5kcygpLmNvbnRhaW5zKHgsIHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiAob2JqLmNoaWxkcmVuICYmIG9iai5jaGlsZHJlbi5sZW5ndGggPiAwKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGZvciAodmFyIHQgPSAwOyB0IDwgb2JqLmNoaWxkcmVuLmxlbmd0aDsgdCsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgX2NoZWNrT25BY3RpdmVPYmplY3RzKG9iai5jaGlsZHJlblt0XSwgeCwgeSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59O1xyXG5cclxuVGlueS5JbnB1dC5zeXN0ZW1zID0gW107XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwiaW5wdXRcIiwgVGlueS5JbnB1dCk7XHJcbiIsIlRpbnkuQ2FjaGUgPSB7XHJcbiAgICBpbWFnZToge30sXHJcbiAgICB0ZXh0dXJlOiB7fVxyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG4gICAgZ2FtZS5jYWNoZSA9IFRpbnkuQ2FjaGU7XHJcblxyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIucHJvdG90eXBlID0ge1xyXG4gICAgY2xlYXJDYWNoZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIHkgaW4gVGlueS5DYWNoZS50ZXh0dXJlKSBUaW55LkNhY2hlLnRleHR1cmVbeV0uZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciB5IGluIFRpbnkuQ2FjaGUpIFRpbnkuQ2FjaGVbeV0gPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgYWxsOiBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QuY29uY2F0KGFycmF5KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW1hZ2U6IGZ1bmN0aW9uIChrZXksIHNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlXCJcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3ByaXRlc2hlZXQ6IGZ1bmN0aW9uIChrZXksIHNvdXJjZSwgYXJnXzEsIGFyZ18yLCB0b3RhbEZyYW1lcywgZHVyYXRpb24pIHtcclxuICAgICAgICB2YXIgcmVzID0ge1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHR5cGU6IFwic3ByaXRlc2hlZXRcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnXzEgPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICByZXMud2lkdGggPSBhcmdfMTtcclxuICAgICAgICAgICAgcmVzLmhlaWdodCA9IGFyZ18yO1xyXG4gICAgICAgICAgICByZXMudG90YWwgPSB0b3RhbEZyYW1lcztcclxuICAgICAgICAgICAgcmVzLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdfMS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlcy5kYXRhID0gYXJnXzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChyZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhdGxhczogZnVuY3Rpb24gKGtleSwgc291cmNlLCBhdGxhc0RhdGEpIHtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgZGF0YTogYXRsYXNEYXRhLFxyXG4gICAgICAgICAgICB0eXBlOiBcImF0bGFzXCJcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5saXN0O1xyXG5cclxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGdhbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkTmV4dCgpIHtcclxuICAgICAgICAgICAgLy8gdmFyIGRvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gbGlzdC5zaGlmdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlciA9IFRpbnkuTG9hZGVyW3Jlc291cmNlLnR5cGVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvYWRlcikge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVyKHJlc291cmNlLCBsb2FkZWQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2Fubm90IGZpbmQgbG9hZGVyIGZvciBcIiArIHJlc291cmNlLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRlZChyZXNvdXJjZSwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbG9hZE5leHQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZ2FtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWROZXh0KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkxvYWRlci5hdGxhcyA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgY2IpIHtcclxuICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XHJcblxyXG4gICAgVGlueS5Mb2FkZXIuaW1hZ2UocmVzb3VyY2UsIGZ1bmN0aW9uIChyZXNvdXJjZSwgaW1hZ2UpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc291cmNlLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHV1aWQgPSBrZXkgKyBcIi5cIiArIHJlc291cmNlLmRhdGFbaV0ubmFtZTtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCByZXNvdXJjZS5kYXRhW2ldKTtcclxuICAgICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXk7XHJcblxyXG4gICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2IoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIuc3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGNiKSB7XHJcbiAgICB2YXIga2V5ID0gcmVzb3VyY2Uua2V5O1xyXG5cclxuICAgIFRpbnkuTG9hZGVyLmltYWdlKHJlc291cmNlLCBmdW5jdGlvbiAocmVzb3VyY2UsIGltYWdlKSB7XHJcbiAgICAgICAgdmFyIGxhc3RGcmFtZSwgdXVpZCwgdGV4dHVyZTtcclxuXHJcbiAgICAgICAgaWYgKHJlc291cmNlLmRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGZyYW1lRGF0YSA9IHJlc291cmNlLmRhdGE7XHJcbiAgICAgICAgICAgIGxhc3RGcmFtZSA9IGZyYW1lRGF0YS5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbGFzdEZyYW1lOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHV1aWQgPSBrZXkgKyBcIi5cIiArIGk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoaW1hZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLngpLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS53aWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS5oZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBmcmFtZURhdGFbaV0uZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyYW1lV2lkdGggPSByZXNvdXJjZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGZyYW1lSGVpZ2h0ID0gcmVzb3VyY2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmcmFtZVdpZHRoKSBmcmFtZVdpZHRoID0gTWF0aC5mbG9vcih3aWR0aCAvIChyZXNvdXJjZS5jb2xzIHx8IDEpKTtcclxuICAgICAgICAgICAgaWYgKCFmcmFtZUhlaWdodCkgZnJhbWVIZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCAvIChyZXNvdXJjZS5yb3dzIHx8IDEpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xzID0gTWF0aC5mbG9vcih3aWR0aCAvIGZyYW1lV2lkdGgpO1xyXG4gICAgICAgICAgICB2YXIgcm93cyA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvdGFsID0gY29scyAqIHJvd3M7XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UudG90YWwpIHRvdGFsID0gTWF0aC5taW4odG90YWwsIHJlc291cmNlLnRvdGFsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gMDtcclxuICAgICAgICAgICAgdmFyIHkgPSAwO1xyXG4gICAgICAgICAgICBsYXN0RnJhbWUgPSB0b3RhbCAtIDE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHV1aWQgPSBrZXkgKyBcIi5cIiArIGk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBmcmFtZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogZnJhbWVIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHJlc291cmNlLmR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcbiAgICAgICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICAgICAgICAgIHggKz0gZnJhbWVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoeCArIGZyYW1lV2lkdGggPiB3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHkgKz0gZnJhbWVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLmltYWdlID0gZnVuY3Rpb24gKHJlc291cmNlLCBjYikge1xyXG4gICAgLy8gaWYgKFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKSByZXR1cm4gY2IocmVzb3VyY2UsIFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUaW55LkNhY2hlLmltYWdlW3Jlc291cmNlLmtleV0gPSBpbWFnZTtcclxuXHJcbiAgICAgICAgY2IocmVzb3VyY2UsIGltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGNiKHJlc291cmNlLCBpbWFnZSk7XHJcbiAgICAvLyB9KVxyXG5cclxuICAgIGltYWdlLnNyYyA9IHJlc291cmNlLnNyYztcclxufTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJsb2FkXCIsIFRpbnkuTG9hZGVyKTtcclxuIiwidmFyIF9pc1NldFRpbWVPdXQsIF9vbkxvb3AsIF90aW1lT3V0SUQsIF9wcmV2VGltZSwgX2xhc3RUaW1lO1xyXG5cclxudmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxufTtcclxuXHJcbmlmIChzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiYgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxufSBlbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBub3cgPSBEYXRlLm5vdztcclxufVxyXG5cclxuVGlueS5SQUYgPSBmdW5jdGlvbiAoZ2FtZSwgZm9yY2VTZXRUaW1lT3V0KSB7XHJcbiAgICBpZiAoZm9yY2VTZXRUaW1lT3V0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb3JjZVNldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZm9yY2VTZXRUaW1lT3V0ID0gZm9yY2VTZXRUaW1lT3V0O1xyXG5cclxuICAgIHZhciB2ZW5kb3JzID0gW1wibXNcIiwgXCJtb3pcIiwgXCJ3ZWJraXRcIiwgXCJvXCJdO1xyXG5cclxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IHgrKykge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XHJcbiAgICAgICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIF9vbkxvb3AgPSBudWxsO1xyXG4gICAgX3RpbWVPdXRJRCA9IG51bGw7XHJcblxyXG4gICAgX3ByZXZUaW1lID0gMDtcclxuICAgIF9sYXN0VGltZSA9IDA7XHJcbn07XHJcblxyXG5UaW55LlJBRi5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9wcmV2VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB0aGlzLmZvcmNlU2V0VGltZU91dCkge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlU2V0VGltZW91dCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlUkFGKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfb25Mb29wKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVJBRjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9sYXN0VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX29uTG9vcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVNldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKTtcclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIFRpbnkuUkFGLnRpbWVUb0NhbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3ByZXZUaW1lID0gbm93KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoX2lzU2V0VGltZU91dCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RpbWVPdXRJRCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKF90aW1lT3V0SUQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUkFGLnRpbWVUb0NhbGwgPSAxNTtcclxuIiwidmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbnZhciBUaW1lciA9IGZ1bmN0aW9uIChhdXRvU3RhcnQsIGF1dG9SZW1vdmUsIGdhbWUsIGNiLCBjdHgsIGRlbGF5LCBsb29wLCBuLCBvbmNvbXBsZXRlKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5jYiA9IGNiIHx8IG5vb3A7XHJcbiAgICB0aGlzLmN0eCA9IGN0eCB8fCB0aGlzO1xyXG4gICAgdGhpcy5kZWxheSA9IGRlbGF5ID09IHVuZGVmaW5lZCA/IDEwMDAgOiBkZWxheTtcclxuICAgIHRoaXMubG9vcCA9IGxvb3A7XHJcbiAgICB0aGlzLmNvdW50ID0gbiB8fCAwO1xyXG4gICAgdGhpcy5yZXBlYXQgPSB0aGlzLmNvdW50ID4gMDtcclxuICAgIHRoaXMucnVubmluZyA9ICEhYXV0b1N0YXJ0O1xyXG4gICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IGF1dG9SZW1vdmU7XHJcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbmNvbXBsZXRlIHx8IG5vb3A7XHJcbn07XHJcblxyXG5UaW1lci5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YVRpbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0RnJhbWUgPj0gdGhpcy5kZWxheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMuY3R4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9SZW1vdmUgJiYgdGhpcy5nYW1lLnRpbWVyLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVGltZXIgPSBUaW1lcjtcclxuXHJcblRpbnkuVGltZXJDcmVhdG9yID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIHRoaXMuYXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvci5wcm90b3R5cGUgPSB7XHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAodG0pIHtcclxuICAgICAgICB2YXIgaW5kZXhPZiA9IHRoaXMubGlzdC5pbmRleE9mKHRtKTtcclxuICAgICAgICBpZiAoaW5kZXhPZiA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRtLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleE9mLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkOiBmdW5jdGlvbiAoZGVsYXksIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSkge1xyXG4gICAgICAgIGF1dG9zdGFydCA9IGF1dG9zdGFydCAhPSB1bmRlZmluZWQgPyBhdXRvc3RhcnQgOiB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICBhdXRvcmVtb3ZlID0gYXV0b3JlbW92ZSAhPSB1bmRlZmluZWQgPyBhdXRvcmVtb3ZlIDogdGhpcy5hdXRvUmVtb3ZlO1xyXG5cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlLCB0aGlzLmdhbWUsIGNiLCBjdHgsIGRlbGF5KTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGxvb3A6IGZ1bmN0aW9uIChkZWxheSwgY2IsIGN0eCwgYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlKSB7XHJcbiAgICAgICAgYXV0b3N0YXJ0ID0gYXV0b3N0YXJ0ICE9IHVuZGVmaW5lZCA/IGF1dG9zdGFydCA6IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIGF1dG9yZW1vdmUgPSBhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmU7XHJcblxyXG4gICAgICAgIHZhciB0aW1lciA9IG5ldyBUaW1lcihhdXRvc3RhcnQsIGF1dG9yZW1vdmUsIHRoaXMuZ2FtZSwgY2IsIGN0eCwgZGVsYXksIHRydWUpO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgcmVwZWF0OiBmdW5jdGlvbiAoZGVsYXksIG4sIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgY29tcGxldGUpIHtcclxuICAgICAgICBhdXRvc3RhcnQgPSBhdXRvc3RhcnQgIT0gdW5kZWZpbmVkID8gYXV0b3N0YXJ0IDogdGhpcy5hdXRvU3RhcnQ7XHJcbiAgICAgICAgYXV0b3JlbW92ZSA9IGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZTtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgdGhpcy5nYW1lLCBjYiwgY3R4LCBkZWxheSwgZmFsc2UsIG4sIGNvbXBsZXRlKTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcInRpbWVyXCIsIFRpbnkuVGltZXJDcmVhdG9yKTtcclxuIiwiLyoqXHJcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxyXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcclxuICovXHJcblxyXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fdHdlZW5zID0ge307XHJcbiAgICB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG59O1xyXG5cclxuX0dyb3VwLnByb3RvdHlwZSA9IHtcclxuICAgIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpLm1hcChcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHR3ZWVuSWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90d2VlbnNbdHdlZW5JZF07XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX3R3ZWVucyA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG4gICAgICAgIHZhciBpZCA9IHR3ZWVuLmdldElkKCk7XHJcbiAgICAgICAgdGhpcy5fdHdlZW5zW2lkXSA9IHR3ZWVuO1xyXG4gICAgICAgIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW2lkXSA9IHR3ZWVuO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG4gICAgICAgIHZhciBpZCA9IHR3ZWVuLmdldElkKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3R3ZWVuc1tpZF07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW2lkXTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGVsdGEsIHByZXNlcnZlKSB7XHJcbiAgICAgICAgdmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcclxuXHJcbiAgICAgICAgaWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xyXG5cclxuICAgICAgICAvLyBUd2VlbnMgYXJlIHVwZGF0ZWQgaW4gXCJiYXRjaGVzXCIuIElmIHlvdSBhZGQgYSBuZXcgdHdlZW4gZHVyaW5nIGFuXHJcbiAgICAgICAgLy8gdXBkYXRlLCB0aGVuIHRoZSBuZXcgdHdlZW4gd2lsbCBiZSB1cGRhdGVkIGluIHRoZSBuZXh0IGJhdGNoLlxyXG4gICAgICAgIC8vIElmIHlvdSByZW1vdmUgYSB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCBpdCBtYXkgb3IgbWF5IG5vdCBiZSB1cGRhdGVkLlxyXG4gICAgICAgIC8vIEhvd2V2ZXIsIGlmIHRoZSByZW1vdmVkIHR3ZWVuIHdhcyBhZGRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgYmF0Y2gsXHJcbiAgICAgICAgLy8gdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxyXG4gICAgICAgIHdoaWxlICh0d2Vlbklkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUoZGVsdGEpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcmVzZXJ2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgVFdFRU4gPSBuZXcgX0dyb3VwKCk7XHJcblxyXG5UV0VFTi5Hcm91cCA9IF9Hcm91cDtcclxuVFdFRU4uX25leHRJZCA9IDA7XHJcblRXRUVOLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBUV0VFTi5fbmV4dElkKys7XHJcbn07XHJcblxyXG4vLyAvLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxyXG4vLyAvLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXHJcbi8vIGlmICh0eXBlb2YgKHNlbGYpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmhydGltZSkge1xyXG4vLyAgVFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcclxuXHJcbi8vICAgICAgLy8gQ29udmVydCBbc2Vjb25kcywgbmFub3NlY29uZHNdIHRvIG1pbGxpc2Vjb25kcy5cclxuLy8gICAgICByZXR1cm4gdGltZVswXSAqIDEwMDAgKyB0aW1lWzFdIC8gMTAwMDAwMDtcclxuLy8gIH07XHJcbi8vIH1cclxuLy8gLy8gSW4gYSBicm93c2VyLCB1c2Ugc2VsZi5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG4vLyBlbHNlIGlmICh0eXBlb2YgKHNlbGYpICE9PSAndW5kZWZpbmVkJyAmJlxyXG4vLyAgICAgICAgICBzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiZcclxuLy8gICAgICAgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4vLyAgLy8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXHJcbi8vICAvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXHJcbi8vICBUV0VFTi5ub3cgPSBzZWxmLnBlcmZvcm1hbmNlLm5vdy5iaW5kKHNlbGYucGVyZm9ybWFuY2UpO1xyXG4vLyB9XHJcbi8vIC8vIFVzZSBEYXRlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXHJcbi8vIGVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcclxuLy8gIFRXRUVOLm5vdyA9IERhdGUubm93O1xyXG4vLyB9XHJcbi8vIC8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXHJcbi8vIGVsc2Uge1xyXG4vLyAgVFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuLy8gIH07XHJcbi8vIH1cclxuXHJcblRpbnkuVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0LCBncm91cCkge1xyXG4gICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuICAgIC8vIHRoaXMuX3BhdXNlU3RhcnQgPSBudWxsO1xyXG4gICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xyXG4gICAgdGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcclxuICAgIHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xyXG4gICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQgPSB7fTtcclxuICAgIHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcclxuICAgIHRoaXMuX3JlcGVhdCA9IDA7XHJcbiAgICB0aGlzLl9yZXBlYXREZWxheVRpbWUgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl95b3lvID0gZmFsc2U7XHJcbiAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuX3JldmVyc2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9kZWxheVRpbWUgPSAwO1xyXG4gICAgdGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcclxuICAgIHRoaXMuX3RpbWUgPSAwO1xyXG4gICAgdGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUaW55LkVhc2luZy5MaW5lYXIuTm9uZTtcclxuICAgIHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRpbnkuSW50ZXJwb2xhdGlvbi5MaW5lYXI7XHJcbiAgICB0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XHJcbiAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IG51bGw7XHJcbiAgICB0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fZ3JvdXAgPSBncm91cCB8fCBUV0VFTjtcclxuICAgIHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XHJcbn07XHJcblxyXG5UaW55LlR3ZWVuLnByb3RvdHlwZSA9IHtcclxuICAgIGdldElkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1BsYXlpbmc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1BhdXNlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1BhdXNlZDtcclxuICAgIH0sXHJcblxyXG4gICAgdG86IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlc0VuZCA9IE9iamVjdC5jcmVhdGUocHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKGQpIHtcclxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAocmVzZXQpIHtcclxuICAgICAgICB0aGlzLl9ncm91cC5hZGQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX2RlbGF5VGltZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGFuIEFycmF5IHdhcyBwcm92aWRlZCBhcyBwcm9wZXJ0eSB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSBbdGhpcy5fb2JqZWN0W3Byb3BlcnR5XV0uY29uY2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxyXG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgbm90IHNldCB0aGF0IHByb3BlcnR5IGluIHRoZSBvYmplY3RcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIHN0YXJ0aW5nIHZhbHVlLCBvbmx5IG9uY2UgLSBpZiByZXNldCBzZXQgdG8gZmFsc2UuXHJcbiAgICAgICAgICAgIGlmIChyZXNldCA9PSB0cnVlIHx8IHR5cGVvZiB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX29iamVjdFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSAqPSAxLjA7IC8vIEVuc3VyZXMgd2UncmUgdXNpbmcgbnVtYmVycywgbm90IHN0cmluZ3NcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZ3JvdXAucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29uU3RvcENhbGxiYWNrICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKEluZmluaXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5fcGF1c2VTdGFydCA9IHRpbWUgPT09IHVuZGVmaW5lZCA/IFRXRUVOLm5vdygpIDogdGltZTtcclxuXHJcbiAgICAgICAgdGhpcy5fZ3JvdXAucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgcmVzdW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc1BhdXNlZCB8fCAhdGhpcy5faXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5fc3RhcnRUaW1lICs9ICh0aW1lID09PSB1bmRlZmluZWQgPyBUV0VFTi5ub3coKSA6IHRpbWUpXHJcbiAgICAgICAgLy8gIC0gdGhpcy5fcGF1c2VTdGFydDtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5fcGF1c2VTdGFydCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BDaGFpbmVkVHdlZW5zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdyb3VwOiBmdW5jdGlvbiAoZ3JvdXApIHtcclxuICAgICAgICB0aGlzLl9ncm91cCA9IGdyb3VwO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgIHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgcmVwZWF0OiBmdW5jdGlvbiAodGltZXMpIHtcclxuICAgICAgICB0aGlzLl9yZXBlYXQgPSB0aW1lcztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgcmVwZWF0RGVsYXk6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICB0aGlzLl9yZXBlYXREZWxheVRpbWUgPSBhbW91bnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHlveW86IGZ1bmN0aW9uICh5b3lvKSB7XHJcbiAgICAgICAgdGhpcy5feW95byA9IHlveW87XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2luZzogZnVuY3Rpb24gKGVhc2luZ0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXNpbmdGdW5jdGlvbjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgaW50ZXJwb2xhdGlvbjogZnVuY3Rpb24gKGludGVycG9sYXRpb25GdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IGludGVycG9sYXRpb25GdW5jdGlvbjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2hhaW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9jaGFpbmVkVHdlZW5zID0gYXJndW1lbnRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblN0YXJ0OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb25VcGRhdGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb25SZXBlYXQ6IGZ1bmN0aW9uIG9uUmVwZWF0KGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb25TdG9wOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vblN0b3BDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIHZhciBwcm9wZXJ0eTtcclxuICAgICAgICB2YXIgZWxhcHNlZDtcclxuICAgICAgICB2YXIgdmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWUgKz0gZGVsdGE7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl90aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb25TdGFydENhbGxiYWNrICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxhcHNlZCA9ICh0aGlzLl90aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xyXG4gICAgICAgIGVsYXBzZWQgPSB0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xyXG5cclxuICAgICAgICB2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xyXG5cclxuICAgICAgICBmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xyXG4gICAgICAgICAgICAvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24oZW5kLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmQuY2hhckF0KDApID09PSBcIitcIiB8fCBlbmQuY2hhckF0KDApID09PSBcIi1cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBwYXJzZUZsb2F0KGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vblVwZGF0ZUNhbGxiYWNrICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0LCBlbGFwc2VkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbGFwc2VkID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlcGVhdCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVwZWF0LS07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVhc3NpZ24gc3RhcnRpbmcgdmFsdWVzLCByZXN0YXJ0IGJ5IG1ha2luZyBzdGFydFRpbWUgPSBub3dcclxuICAgICAgICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5feW95bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IHRtcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feW95bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JldmVyc2VkID0gIXRoaXMuX3JldmVyc2VkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZXBlYXREZWxheVRpbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX3JlcGVhdERlbGF5VGltZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gdGhpcy5fZGVsYXlUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vblJlcGVhdENhbGxiYWNrICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25SZXBlYXRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBjaGFpbmVkIHR3ZWVucyBzdGFydCBleGFjdGx5IGF0IHRoZSB0aW1lIHRoZXkgc2hvdWxkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW4gaWYgdGhlIGB1cGRhdGUoKWAgbWV0aG9kIHdhcyBjYWxsZWQgd2F5IHBhc3QgdGhlIGR1cmF0aW9uIG9mIHRoZSB0d2VlblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5FYXNpbmcgPSB7XHJcbiAgICBMaW5lYXI6IHtcclxuICAgICAgICBOb25lOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFF1YWRyYXRpYzoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gayAqIGs7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gayAqICgyIC0gayk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBrICogaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQ3ViaWM6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGsgKiBrICogaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtLWsgKiBrICogayArIDE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBrICogayAqIGs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUXVhcnRpYzoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gayAqIGsgKiBrICogaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxIC0gLS1rICogayAqIGsgKiBrO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgLSAyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFF1aW50aWM6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTaW51c29pZGFsOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxIC0gTWF0aC5jb3MoKGsgKiBNYXRoLlBJKSAvIDIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc2luKChrICogTWF0aC5QSSkgLyAyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4cG9uZW50aWFsOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtMTAgKiBrKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKGsgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoayA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICsgMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaXJjdWxhcjoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gayAqIGspO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gLS1rICogayk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFbGFzdGljOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmIChrID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGsgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoayA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChrID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucG93KDIsIC0xMCAqIGspICogTWF0aC5zaW4oKGsgLSAwLjEpICogNSAqIE1hdGguUEkpICsgMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKGsgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoayA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGsgKj0gMjtcclxuXHJcbiAgICAgICAgICAgIGlmIChrIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQmFjazoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICB2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcclxuXHJcbiAgICAgICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEJvdW5jZToge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gMSAtIFRpbnkuRWFzaW5nLkJvdW5jZS5PdXQoMSAtIGspO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKGsgPCAxIC8gMi43NSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGsgPCAyIC8gMi43NSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIChrIC09IDEuNSAvIDIuNzUpICogayArIDAuNzU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoayA8IDIuNSAvIDIuNzUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAoayAtPSAyLjI1IC8gMi43NSkgKiBrICsgMC45Mzc1O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIChrIC09IDIuNjI1IC8gMi43NSkgKiBrICsgMC45ODQzNzU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKGsgPCAwLjUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBUaW55LkVhc2luZy5Cb3VuY2UuSW4oayAqIDIpICogMC41O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gVGlueS5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuSW50ZXJwb2xhdGlvbiA9IHtcclxuICAgIExpbmVhcjogZnVuY3Rpb24gKHYsIGspIHtcclxuICAgICAgICB2YXIgbSA9IHYubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgZiA9IG0gKiBrO1xyXG4gICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihmKTtcclxuICAgICAgICB2YXIgZm4gPSBUaW55LkludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xyXG5cclxuICAgICAgICBpZiAoayA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGsgPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmbih2W21dLCB2W20gLSAxXSwgbSAtIGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcbiAgICAgICAgdmFyIGIgPSAwO1xyXG4gICAgICAgIHZhciBuID0gdi5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBwdyA9IE1hdGgucG93O1xyXG4gICAgICAgIHZhciBibiA9IFRpbnkuSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IG47IGkrKykge1xyXG4gICAgICAgICAgICBiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBiO1xyXG4gICAgfSxcclxuXHJcbiAgICBDYXRtdWxsUm9tOiBmdW5jdGlvbiAodiwgaykge1xyXG4gICAgICAgIHZhciBtID0gdi5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBmID0gbSAqIGs7XHJcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG4gICAgICAgIHZhciBmbiA9IFRpbnkuSW50ZXJwb2xhdGlvbi5VdGlscy5DYXRtdWxsUm9tO1xyXG5cclxuICAgICAgICBpZiAodlswXSA9PT0gdlttXSkge1xyXG4gICAgICAgICAgICBpZiAoayA8IDApIHtcclxuICAgICAgICAgICAgICAgIGkgPSBNYXRoLmZsb29yKChmID0gbSAqICgxICsgaykpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGsgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGsgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFV0aWxzOiB7XHJcbiAgICAgICAgTGluZWFyOiBmdW5jdGlvbiAocDAsIHAxLCB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAocDEgLSBwMCkgKiB0ICsgcDA7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQmVybnN0ZWluOiBmdW5jdGlvbiAobiwgaSkge1xyXG4gICAgICAgICAgICB2YXIgZmMgPSBUaW55LkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZjKG4pIC8gZmMoaSkgLyBmYyhuIC0gaSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgRmFjdG9yaWFsOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYSA9IFsxXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHMgPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhW25dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFbbl07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IG47IGkgPiAxOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzICo9IGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYVtuXSA9IHM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpLFxyXG5cclxuICAgICAgICBDYXRtdWxsUm9tOiBmdW5jdGlvbiAocDAsIHAxLCBwMiwgcDMsIHQpIHtcclxuICAgICAgICAgICAgdmFyIHYwID0gKHAyIC0gcDApICogMC41O1xyXG4gICAgICAgICAgICB2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XHJcbiAgICAgICAgICAgIHZhciB0MiA9IHQgKiB0O1xyXG4gICAgICAgICAgICB2YXIgdDMgPSB0ICogdDI7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKDIgKiBwMSAtIDIgKiBwMiArIHYwICsgdjEpICogdDMgKyAoLTMgKiBwMSArIDMgKiBwMiAtIDIgKiB2MCAtIHYxKSAqIHQyICsgdjAgKiB0ICsgcDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5Ud2Vlbk1hbmFnZXIgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuYnVmZmVyTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5ncm91cCA9IG5ldyBfR3JvdXAoKTtcclxufTtcclxuXHJcblRpbnkuVHdlZW5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKHR3ZWVuKSB7XHJcbiAgICAgICAgdGhpcy5ncm91cC5yZW1vdmUodHdlZW4pO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGQ6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRpbnkuVHdlZW4ob2JqLCB0aGlzLmdyb3VwKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlckxpc3QubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzLmdyb3VwLl90d2VlbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5idWZmZXJMaXN0LnB1c2godGhpcy5ncm91cC5fdHdlZW5zW2tdKTtcclxuICAgICAgICAgICAgdGhpcy5ncm91cC5fdHdlZW5zW2tdLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZXN1bWUoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJ1ZmZlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5idWZmZXJMaXN0W2ldLnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5idWZmZXJMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRlbHRhKSB7XHJcbiAgICAgICAgdGhpcy5ncm91cC51cGRhdGUoZGVsdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5ncm91cC5yZW1vdmVBbGwoKTtcclxuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJ0d2VlbnNcIiwgVGlueS5Ud2Vlbk1hbmFnZXIpO1xyXG4iLCJUaW55LlJlbmRlclRleHR1cmUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgcmVuZGVyZXIsIHJlc29sdXRpb24pIHtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCAxMDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAxMDA7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICByZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCAxO1xyXG5cclxuICAgIC8vIHRoaXMuZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIC8vIHRoaXMuY3JvcCA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZSA9IG5ldyBUaW55LkJhc2VUZXh0dXJlKCk7XHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZS5oYXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRoaXMud2lkdGggKiByZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHJlc29sdXRpb24pO1xyXG5cclxuICAgIFRpbnkuVGV4dHVyZS5jYWxsKFxyXG4gICAgICAgIHRoaXMsXHJcbiAgICAgICAgdGhpcy50ZXh0dXJlQnVmZmVyLmNhbnZhcyxcclxuICAgICAgICBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgTWF0aC5mbG9vcih0aGlzLndpZHRoICogcmVzb2x1dGlvbiksIE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiByZXNvbHV0aW9uKSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICAvLyB0aGlzLmhhc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyIHx8IFRpbnkuZGVmYXVsdFJlbmRlcmVyO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5UZXh0dXJlLnByb3RvdHlwZSk7XHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJlbmRlclRleHR1cmU7XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCB1cGRhdGVCYXNlKSB7XHJcbiAgICBpZiAod2lkdGggPT09IHRoaXMud2lkdGggJiYgaGVpZ2h0ID09PSB0aGlzLmhlaWdodCkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSB3aWR0aCA+IDAgJiYgaGVpZ2h0ID4gMDtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMuZnJhbWUud2lkdGggPSB0aGlzLmNyb3Aud2lkdGggPSB3aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIHRoaXMuZnJhbWUuaGVpZ2h0ID0gdGhpcy5jcm9wLmhlaWdodCA9IGhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICBpZiAodXBkYXRlQmFzZSkge1xyXG4gICAgICAgIC8vIHRoaXMuYmFzZVRleHR1cmUud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgICAgIC8vIHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyLnJlc2l6ZSh0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyLmNsZWFyKCk7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkaXNwbGF5T2JqZWN0LCBtYXRyaXgsIGNsZWFyKSB7XHJcbiAgICBpZiAoIXRoaXMudmFsaWQpIHJldHVybjtcclxuXHJcbiAgICB2YXIgd3QgPSBkaXNwbGF5T2JqZWN0LndvcmxkVHJhbnNmb3JtO1xyXG4gICAgd3QuaWRlbnRpdHkoKTtcclxuICAgIGlmIChtYXRyaXgpIHd0LmFwcGVuZChtYXRyaXgpO1xyXG5cclxuICAgIC8vIHNldFdvcmxkIEFscGhhIHRvIGVuc3VyZSB0aGF0IHRoZSBvYmplY3QgaXMgcmVuZGVyZXIgYXQgZnVsbCBvcGFjaXR5XHJcbiAgICBkaXNwbGF5T2JqZWN0LndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgIC8vIFRpbWUgdG8gdXBkYXRlIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIGRpc3BsYXlPYmplY3Qgd2l0aCB0aGUgbmV3IG1hdHJpeC4uXHJcbiAgICB2YXIgY2hpbGRyZW4gPSBkaXNwbGF5T2JqZWN0LmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsZWFyKSB0aGlzLnRleHR1cmVCdWZmZXIuY2xlYXIoKTtcclxuXHJcbiAgICB2YXIgY29udGV4dCA9IHRoaXMudGV4dHVyZUJ1ZmZlci5jb250ZXh0O1xyXG5cclxuICAgIHZhciByZWFsUmVzb2x1dGlvbiA9IHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXJPYmplY3QoZGlzcGxheU9iamVjdCwgY29udGV4dCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uID0gcmVhbFJlc29sdXRpb247XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWFnZS5zcmMgPSB0aGlzLmdldEJhc2U2NCgpO1xyXG4gICAgcmV0dXJuIGltYWdlO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5nZXRCYXNlNjQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYW52YXMoKS50b0RhdGFVUkwoKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0Q2FudmFzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dHVyZUJ1ZmZlci5jYW52YXM7XHJcbn07XHJcbiIsIi8vIFRpbnkuVGV4dHVyZUNhY2hlID0ge307XHJcbi8vIFRpbnkuRnJhbWVDYWNoZSA9IHt9O1xyXG5UaW55LlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yID0gMDtcclxuVGlueS5UZXh0dXJlU2lsZW50RmFpbCA9IGZhbHNlO1xyXG5cclxuVGlueS5UZXh0dXJlID0gZnVuY3Rpb24gKHNvdXJjZSwgZnJhbWUsIGNyb3AsIHRyaW0pIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgdGhpcy5ub0ZyYW1lID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gMTtcclxuXHJcbiAgICB0aGlzLmhhc0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghZnJhbWUpIHtcclxuICAgICAgICB0aGlzLm5vRnJhbWUgPSB0cnVlO1xyXG4gICAgICAgIGZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2Ygc291cmNlID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHNvdXJjZTtcclxuXHJcbiAgICAgICAgc291cmNlID0gVGlueS5DYWNoZS5pbWFnZVtrZXldO1xyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZSkgdGhyb3cgbmV3IEVycm9yKCdDYWNoZSBFcnJvcjogaW1hZ2UgJyArIGtleSArICcgZG9lc2B0IGZvdW5kIGluIGNhY2hlJyk7XHJcblxyXG4gICAgICAgIFRpbnkuQ2FjaGUudGV4dHVyZVtrZXldID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcblxyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lO1xyXG5cclxuICAgIHRoaXMudHJpbSA9IHRyaW07XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuXHJcbiAgICB0aGlzLmNyb3AgPSBjcm9wIHx8IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICBpZiAoKHRoaXMuc291cmNlLmNvbXBsZXRlIHx8IHRoaXMuc291cmNlLmdldENvbnRleHQpICYmIHRoaXMuc291cmNlLndpZHRoICYmIHRoaXMuc291cmNlLmhlaWdodCkge1xyXG4gICAgICAgIHRoaXMub25Tb3VyY2VMb2FkZWQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHNjb3BlID0gdGhpcztcclxuICAgICAgICB0aGlzLnNvdXJjZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLm9uU291cmNlTG9hZGVkKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlRleHR1cmU7XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLm9uU291cmNlTG9hZGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5oYXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgdGhpcy53aWR0aCA9IHRoaXMuc291cmNlLm5hdHVyYWxXaWR0aCB8fCB0aGlzLnNvdXJjZS53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zb3VyY2UubmF0dXJhbEhlaWdodCB8fCB0aGlzLnNvdXJjZS5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMubm9GcmFtZSkgdGhpcy5mcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5zZXRGcmFtZSh0aGlzLmZyYW1lKTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuYWRkVG9DYWNoZSA9IGZ1bmN0aW9uIChrZXksIGZyYW1lTmFtZSkge1xyXG4gICAgdGhpcy5rZXkgPSB0aGlzLmtleSB8fCBrZXk7XHJcbiAgICB0aGlzLmZyYW1lLm5hbWUgPSB0aGlzLmZyYW1lLm5hbWUgfHwgZnJhbWVOYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLmZyYW1lLm5hbWUpIGtleSArPSAnLicgKyB0aGlzLmZyYW1lLm5hbWU7XHJcblxyXG4gICAgVGlueS5DYWNoZS50ZXh0dXJlW2tleV0gPSB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMua2V5KSB7XHJcbiAgICAgICAgZGVsZXRlIFRpbnkuQ2FjaGUudGV4dHVyZVt0aGlzLmtleV07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zb3VyY2UgPSBudWxsO1xyXG4gICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5zZXRGcmFtZSA9IGZ1bmN0aW9uIChmcmFtZSkge1xyXG4gICAgdGhpcy5ub0ZyYW1lID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSBmcmFtZSAmJiBmcmFtZS53aWR0aCAmJiBmcmFtZS5oZWlnaHQgJiYgdGhpcy5zb3VyY2UgJiYgdGhpcy5oYXNMb2FkZWQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLnZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgLy8gdGhpcy53aWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgLy8gdGhpcy5oZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5jcm9wLnggPSBmcmFtZS54O1xyXG4gICAgdGhpcy5jcm9wLnkgPSBmcmFtZS55O1xyXG4gICAgdGhpcy5jcm9wLndpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICB0aGlzLmNyb3AuaGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgIGlmICghdGhpcy50cmltICYmIChmcmFtZS54ICsgZnJhbWUud2lkdGggPiB0aGlzLndpZHRoIHx8IGZyYW1lLnkgKyBmcmFtZS5oZWlnaHQgPiB0aGlzLmhlaWdodCkpIHtcclxuICAgICAgICBpZiAoIVRpbnkuVGV4dHVyZVNpbGVudEZhaWwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXh0dXJlIEVycm9yOiBmcmFtZSBkb2VzIG5vdCBmaXQgaW5zaWRlIHRoZSBiYXNlIFRleHR1cmUgZGltZW5zaW9ucyAnICsgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRyaW0pIHtcclxuICAgICAgICAvLyB0aGlzLndpZHRoID0gdGhpcy50cmltLndpZHRoO1xyXG4gICAgICAgIC8vIHRoaXMuaGVpZ2h0ID0gdGhpcy50cmltLmhlaWdodDtcclxuICAgICAgICB0aGlzLmZyYW1lLndpZHRoID0gdGhpcy50cmltLndpZHRoO1xyXG4gICAgICAgIHRoaXMuZnJhbWUuaGVpZ2h0ID0gdGhpcy50cmltLmhlaWdodDtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5mcm9tSW1hZ2UgPSBmdW5jdGlvbihrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbilcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtrZXldO1xyXG5cclxuLy8gICAgIGlmKCF0ZXh0dXJlKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKFRpbnkuQmFzZVRleHR1cmUuZnJvbUltYWdlKGtleSwgaW1hZ2VVcmwsIGNyb3Nzb3JpZ2luKSk7XHJcbi8vICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXlcclxuLy8gICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtrZXldID0gdGV4dHVyZTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5mcm9tRnJhbWUgPSBmdW5jdGlvbihmcmFtZUlkKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2ZyYW1lSWRdO1xyXG4vLyAgICAgaWYoIXRleHR1cmUpIHRocm93IG5ldyBFcnJvcignVGhlIGZyYW1lSWQgXCInICsgZnJhbWVJZCArICdcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdGV4dHVyZSBjYWNoZSAnKTtcclxuLy8gICAgIHJldHVybiB0ZXh0dXJlO1xyXG4vLyB9O1xyXG5cclxuVGlueS5UZXh0dXJlLmZyb21DYW52YXMgPSBmdW5jdGlvbiAoY2FudmFzKSB7XHJcbiAgICAvLyBpZighY2FudmFzLl90aW55SWQpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgY2FudmFzLl90aW55SWQgPSAnX2Zyb21fY2FudmFzXycgKyBUaW55LlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yKys7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdmFyIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbY2FudmFzLl90aW55SWRdO1xyXG5cclxuICAgIC8vIGlmKCF0ZXh0dXJlKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKCBjYW52YXMgKTtcclxuICAgIC8vICAgICBUaW55LkNhY2hlLnRleHR1cmVbY2FudmFzLl90aW55SWRdID0gdGV4dHVyZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyByZXR1cm4gdGV4dHVyZTtcclxuICAgIHJldHVybiBuZXcgVGlueS5UZXh0dXJlKGNhbnZhcyk7XHJcbn07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuYWRkVGV4dHVyZVRvQ2FjaGUgPSBmdW5jdGlvbih0ZXh0dXJlLCBpZClcclxuLy8ge1xyXG4vLyAgICAgVGlueS5UZXh0dXJlQ2FjaGVbaWRdID0gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5yZW1vdmVUZXh0dXJlRnJvbUNhY2hlID0gZnVuY3Rpb24oaWQpXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgZGVsZXRlIFRpbnkuVGV4dHVyZUNhY2hlW2lkXTtcclxuLy8gICAgIGRlbGV0ZSBUaW55LkJhc2VUZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07XHJcbiIsIlRpbnkuQ2FudmFzQnVmZmVyID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNCdWZmZXI7XHJcblxyXG5UaW55LkNhbnZhc0J1ZmZlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0J1ZmZlci5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbn07XHJcbiIsImZ1bmN0aW9uIEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5hID0gW107XHJcbiAgICB0aGlzLm4gPSAwO1xyXG59XHJcblxyXG5UaW55LkV2ZW50RW1pdHRlciA9IHtcclxuICAgIGNhbGw6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IG9iai5wcm90b3R5cGUgfHwgb2JqO1xyXG4gICAgICAgICAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbihvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWl4aW46IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lcnNfZXZlbnRzID0ge307XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHB1c2hMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdID0gbmV3IEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5hLnB1c2goZm4sIGNvbnRleHQgfHwgbnVsbCwgb25jZSB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5uICs9IDM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmoub25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4sIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgcHVzaExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLm9uID0gcHVzaExpc3RlbmVyO1xyXG5cclxuICAgICAgICBvYmoub2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbiwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZuQXJyYXkgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XS5hO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmbikge1xyXG4gICAgICAgICAgICAgICAgZm5BcnJheS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZuQXJyYXkubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpXSA9PSBmbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmbkFycmF5W2ldID09IGZuICYmIGZuQXJyYXlbaSArIDFdID09IGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbkFycmF5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouZW1pdCA9IGZ1bmN0aW9uIChldmVudCwgYTEsIGEyLCBhMykge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZuQXJyYXkgPSBsaXN0ZW5lcnMuYTtcclxuICAgICAgICAgICAgbGlzdGVuZXJzLm4gPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBmbiwgY3R4O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aCAtIGxpc3RlbmVycy5uOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgIGZuID0gZm5BcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGN0eCA9IGZuQXJyYXlbaSArIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmbkFycmF5W2kgKyAyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGVuIDw9IDEpIGZuLmNhbGwoY3R4KTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxlbiA9PSAyKSBmbi5jYWxsKGN0eCwgYTEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGVuID09IDMpIGZuLmNhbGwoY3R4LCBhMSwgYTIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBmbi5jYWxsKGN0eCwgYTEsIGEyLCBhMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGZuQXJyYXlbaSArIDJdKVxyXG4gICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZuQXJyYXkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcbiIsImlmICghRGF0ZS5ub3cpIHtcclxuICBEYXRlLm5vdyA9IGZ1bmN0aW9uIG5vdygpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICB9O1xyXG59XHJcblxyXG5pZiAodHlwZW9mIEZsb2F0MzJBcnJheSA9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgd2luZG93LkZsb2F0MzJBcnJheSA9IEFycmF5O1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKFwiLi9taW5pLmpzXCIpO1xyXG5cclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL09iamVjdENyZWF0b3IuanMnKTsgLy8gMSBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvTG9hZGVyLmpzJyk7IC8vIDMgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL0lucHV0LmpzJyk7IC8vIDEgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL1RpbWVyLmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9Ud2Vlbi5qc1wiKTtcclxuXHJcbnJlcXVpcmUoXCIuL21hdGgvUm91bmRlZFJlY3RhbmdsZS5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vbWF0aC9Qb2x5Z29uLmpzXCIpOyAvL1xyXG5yZXF1aXJlKFwiLi9tYXRoL0NpcmNsZS5qc1wiKTsgLy8gNiBLYlxyXG5cclxucmVxdWlyZShcIi4vcmVuZGVyZXJzL0dyYXBoaWNzUmVuZGVyZXIuanNcIik7IC8vIDRLYlxyXG5cclxucmVxdWlyZShcIi4vb2JqZWN0cy9HcmFwaGljcy5qc1wiKTsgLy8gMTAgS2JcclxuLy8gcmVxdWlyZSgnLi9vYmplY3RzL1RpbGluZ1Nwcml0ZS5qcycpOyAvLyA0IEtiICAgIyMjIyMjIyMjIyMjIyMjIFRpbGluZ1Nwcml0ZSAgZ2FtZS5hZGQudGlsZXNwcml0ZVxyXG5cclxucmVxdWlyZShcIi4vdGV4dHVyZXMvUmVuZGVyVGV4dHVyZS5qc1wiKTsgLy8gMiBLYlxyXG5cclxucmVxdWlyZShcIi4vdXRpbHMvQ2FudmFzQnVmZmVyLmpzXCIpOyAvLyAxIEtiXHJcbnJlcXVpcmUoXCIuL3JlbmRlcmVycy9DYW52YXNNYXNrTWFuYWdlci5qc1wiKTsgLy8gMUtiXHJcbnJlcXVpcmUoXCIuL3JlbmRlcmVycy9DYW52YXNUaW50ZXIuanNcIik7IC8vIDMgS2IgIyMjIyMjIyMjIyMjIyMjIyB0aW50IGZ1bmN0aW9uXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==