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

Tiny.VERSION = "2.1.6";

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

Tiny.color2rgb = function (style) {
    return Tiny.hex2rgb(Tiny.style2hex(style));
};

Tiny.color2style = function (style) {
    return style;
};

Tiny.style2hex = function (style) {
    return +style.replace("#", "0x");
};

Tiny.hex2style = function (hex) {
    return "#" + ("00000" + (hex | 0).toString(16)).substr(-6);
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
    this.radius = radius || 20;
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
    this.lineColor = 0;
    this.graphicsData = [];
    this.tint = "#FFFFFF";
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
    this.drawShape(new Tiny.RoundedRectangle(x, y, width, height, radius));

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

Tiny.Object2D.prototype.removeChildren = function (beginIndex, endIndex) {
    var begin = beginIndex || 0;
    var end = typeof endIndex === "number" ? endIndex : this.children.length;
    var range = end - begin;

    if (range > 0 && range <= end) {
        var removed = this.children.splice(begin, range);
        for (var i = 0; i < removed.length; i++) {
            var child = removed[i];
            child.parent = undefined;
        }
        return removed;
    } else if (range === 0 && this.children.length === 0) {
        return [];
    } else {
        throw new Error("removeChildren: Range Error, numeric values are outside the acceptable range");
    }
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

    this.tint = "#FFFFFF";

    this.blendMode = "source-over";

    if (this.texture.hasLoaded) {
        this.onTextureUpdate();
    }

    this.renderable = true;
};

Tiny.Sprite.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.Sprite.prototype.constructor = Tiny.Sprite;

Object.defineProperty(Tiny.Sprite.prototype, "frameName", {
    get: function () {
        return this.texture.frame.name;
    },

    set: function (value) {
        if (this.texture.frame.name) {
            this.setTexture(Tiny.Cache.texture[this.texture.key + "." + value]);
        }
    }
});

Object.defineProperty(Tiny.Sprite.prototype, "frame", {
    get: function () {
        return this._frame;
    },

    set: function (value) {
        if (this.texture.lastFrame) {
            this._frame = value;
            if (this._frame > this.texture.lastFrame) this._frame = 0;
            this.setTexture(Tiny.Cache.texture[this.texture.key + "." + this._frame]);
        }
    }
});

Object.defineProperty(Tiny.Sprite.prototype, "width", {
    get: function () {
        return this.scale.x * this.texture.frame.width;
    },

    set: function (value) {
        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    }
});

Object.defineProperty(Tiny.Sprite.prototype, "height", {
    get: function () {
        return this.scale.y * this.texture.frame.height;
    },

    set: function (value) {
        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    }
});

Tiny.Sprite.prototype.setTexture = function (texture, key, updateDimension) {
    if (typeof texture == "string") {
        var imagePath = texture;

        if (key != undefined) {
            imagePath = imagePath + "." + key;
        }

        texture = Tiny.Cache.texture[imagePath];

        if (!texture) {
            texture = new Tiny.Texture(imagePath);
            // throw new Error('Cache Error: image ' + imagePath + ' does`t found in cache');
        }
    }

    if (this.texture === texture) return false;

    this.texture = texture;
    this.cachedTint = "#FFFFFF";

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

Tiny.Sprite.prototype.animate = function (timer, delay) {
    if (this.texture.lastFrame && this.texture.frame.index != undefined) {
        delay = delay || this.texture.frame.duration || 100;

        if (!this.animation) {
            this.animation = timer.loop(
                delay,
                function () {
                    this.frame += 1;
                    this.animation.delay = delay || this.texture.frame.duration || 100;
                }.bind(this)
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

        if (this.tint !== "#FFFFFF") {
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

    context.fillStyle = Tiny.color2style(color);

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

    var rgbValues = Tiny.color2rgb(color);
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
                context.fillStyle = Tiny.color2style(fillColor);
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
                context.stroke();
            }
        } else if (data.type === Tiny.Primitives.RECT) {
            if (data.fillColor || data.fillColor === 0) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.fillRect(shape.x, shape.y, shape.width, shape.height);
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
                context.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
        } else if (data.type === Tiny.Primitives.CIRC) {
            // TODO - need to be Undefined!
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.closePath();

            if (data.fill) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
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
                context.fillStyle = Tiny.color2style(fillColor);
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
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

            if (data.fillColor || data.fillColor === 0) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
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

        //     if (data.fillColor || data.fillColor === 0)
        //     {
        //         context.globalAlpha = data.fillAlpha * worldAlpha;
        //         context.fillStyle = Tiny.color2style(fillColor);
        //         context.strokeStyle = Tiny.color2style(fillColor);
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
    if (graphics.tint === 0xffffff) {
        return;
    }

    var tintR = ((graphics.tint >> 16) & 0xff) / 255;
    var tintG = ((graphics.tint >> 8) & 0xff) / 255;
    var tintB = (graphics.tint & 0xff) / 255;

    for (var i = 0; i < graphics.graphicsData.length; i++) {
        var data = graphics.graphicsData[i];

        var fillColor = data.fillColor | 0;
        var lineColor = data.lineColor | 0;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlueS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDJCQUEyQjtBQUNuRDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsSkEsbUJBQU8sQ0FBQyxvREFBcUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQyw4QkFBVTtBQUNsQixtQkFBTyxDQUFDLG9DQUFhO0FBQ3JCLG1CQUFPLENBQUMsMENBQWdCLEdBQUc7QUFDM0IsbUJBQU8sQ0FBQyw0Q0FBaUIsR0FBRztBQUM1QixtQkFBTyxDQUFDLDhDQUFrQixHQUFHO0FBQzdCLG1CQUFPLENBQUMsb0RBQXFCLEdBQUc7QUFDaEM7QUFDQSxtQkFBTyxDQUFDLGdFQUEyQixHQUFHO0FBQ3RDLG1CQUFPLENBQUMsd0RBQXVCLEdBQUc7QUFDbEMsbUJBQU8sQ0FBQyxrREFBb0IsR0FBRztBQUMvQjtBQUNBLG1CQUFPLENBQUMsd0VBQStCLEdBQUc7Ozs7Ozs7Ozs7O0FDZjFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGNBQWM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsU0FBUztBQUMxRDtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFNBQVM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7O0FDOUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9CQSxtQkFBTyxDQUFDLGdDQUFXO0FBQ25CO0FBQ0EsbUJBQU8sQ0FBQyw4Q0FBa0IsR0FBRztBQUM3QiwwQ0FBMEM7QUFDMUMsbUJBQU8sQ0FBQyxvREFBcUIsR0FBRztBQUNoQyxtQkFBTyxDQUFDLGtEQUFvQixHQUFHO0FBQy9CLG1CQUFPLENBQUMsa0RBQW9CLEdBQUc7QUFDL0I7QUFDQSxtQkFBTyxDQUFDLDREQUF5QjtBQUNqQztBQUNBLG1CQUFPLENBQUMsd0RBQXVCLEdBQUc7QUFDbEM7QUFDQSxtQkFBTyxDQUFDLG9EQUFxQixHQUFHO0FBQ2hDLG1CQUFPLENBQUMsZ0RBQW1CLEdBQUc7Ozs7Ozs7Ozs7O0FDYjlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RjtBQUN6RjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7Ozs7Ozs7Ozs7O0FDdk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDhCQUE4QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxtQkFBbUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQzN2QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQyx3QkFBd0IsVUFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixjQUFjO0FBQ3ZDLHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9VQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx5QkFBeUI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMEJBQTBCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsMEJBQTBCO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtDQUFrQztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN4U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwrQkFBK0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywrQkFBK0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsUUFBUTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0EsNkNBQTZDLHlCQUF5QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCx5QkFBeUI7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUJBQXlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuUEE7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBcUQ7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsdUVBQXVFLHNCQUFzQjtBQUM3RjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNCQUFzQjtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDMXpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxPQUFPO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsZ0NBQWdDLG9CQUFvQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrQ0FBa0M7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLG1CQUFPLENBQUMsZ0NBQVc7QUFDbkI7QUFDQSwwQ0FBMEM7QUFDMUMsbUNBQW1DO0FBQ25DLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsbUJBQU8sQ0FBQyxrREFBb0I7QUFDNUI7QUFDQSxtQkFBTyxDQUFDLGtFQUE0QixHQUFHO0FBQ3ZDLG1CQUFPLENBQUMsZ0RBQW1CLEdBQUc7QUFDOUIsbUJBQU8sQ0FBQyw4Q0FBa0IsR0FBRztBQUM3QjtBQUNBLG1CQUFPLENBQUMsNEVBQWlDLEdBQUc7QUFDNUM7QUFDQSxtQkFBTyxDQUFDLHdEQUF1QixHQUFHO0FBQ2xDLHlDQUF5QztBQUN6QztBQUNBLG1CQUFPLENBQUMsb0VBQTZCLEdBQUc7QUFDeEM7QUFDQSxtQkFBTyxDQUFDLDREQUF5QixHQUFHO0FBQ3BDLG1CQUFPLENBQUMsOEVBQWtDLEdBQUc7QUFDN0MsbUJBQU8sQ0FBQyxvRUFBNkIsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9DaXJjbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvTWF0aC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9NYXRyaXguanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUG9seWdvbi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9SZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUm91bmRlZFJlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWluaS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvb2JqZWN0cy9CYXNlT2JqZWN0MkQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvR3JhcGhpY3MuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvT2JqZWN0MkQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvU2NlbmUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvU3ByaXRlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL1RleHQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3JlbmRlcmVycy9DYW52YXNNYXNrTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvcmVuZGVyZXJzL0NhbnZhc1JlbmRlcmVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9yZW5kZXJlcnMvQ2FudmFzVGludGVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9yZW5kZXJlcnMvR3JhcGhpY3NSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9JbnB1dC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9Mb2FkZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvUkFGLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL1RpbWVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL1R3ZWVuLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy90ZXh0dXJlcy9UZXh0dXJlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy91dGlscy9DYW52YXNCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3V0aWxzL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdXRpbHMvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVGlueS5BcHAgPSBmdW5jdGlvbiAoc3RhdGVzKSB7XHJcbiAgICB0aGlzLmNhbGxiYWNrQ29udGV4dCA9IHRoaXM7XHJcbiAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgIHRoaXMudGltZVNjYWxlID0gMTtcclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5zeXN0ZW1zID0gW107XHJcbiAgICB0aGlzLnVwZGF0YWJsZSA9IFtdO1xyXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VEdXJhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmlucHV0VmlldyA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgaWYgKFRpbnkuRXZlbnRFbWl0dGVyKSBUaW55LkV2ZW50RW1pdHRlci5taXhpbih0aGlzKTtcclxuXHJcbiAgICBzdGF0ZXMgPSBzdGF0ZXMgfHwge307XHJcbiAgICB0aGlzLmJvb3QgPSBzdGF0ZXMuYm9vdCB8fCB0aGlzLmJvb3QgfHwgbm9vcDtcclxuICAgIHRoaXMucHJlbG9hZCA9IHN0YXRlcy5wcmVsb2FkIHx8IHRoaXMucHJlbG9hZCB8fCBub29wO1xyXG4gICAgdGhpcy5jcmVhdGUgPSBzdGF0ZXMuY3JlYXRlIHx8IHRoaXMuY3JlYXRlIHx8IG5vb3A7XHJcbiAgICB0aGlzLnVwZGF0ZSA9IHN0YXRlcy51cGRhdGUgfHwgdGhpcy51cGRhdGUgfHwgbm9vcDtcclxuICAgIHRoaXMucmVuZGVyID0gc3RhdGVzLnJlbmRlciB8fCB0aGlzLnJlbmRlciB8fCBub29wO1xyXG4gICAgdGhpcy5fcmVzaXplX2NiID0gc3RhdGVzLnJlc2l6ZSB8fCBub29wO1xyXG4gICAgdGhpcy5fZGVzdHJveV9jYiA9IHN0YXRlcy5kZXN0cm95IHx8IG5vb3A7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VsZi5fYm9vdCgpO1xyXG4gICAgfSwgMCk7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuX2Jvb3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRpbnkuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBzeXN0ZW0gPSBUaW55LnN5c3RlbXNbaV07XHJcblxyXG4gICAgICAgIHZhciBfc3lzXyA9IG5ldyBzeXN0ZW0uX2NsYXNzXyh0aGlzKTtcclxuICAgICAgICB0aGlzLnN5c3RlbXMucHVzaChfc3lzXyk7XHJcbiAgICAgICAgaWYgKF9zeXNfLnVwZGF0ZSkgdGhpcy51cGRhdGFibGUucHVzaChfc3lzXyk7XHJcblxyXG4gICAgICAgIGlmIChzeXN0ZW0ubmFtZSkgdGhpc1tzeXN0ZW0ubmFtZV0gPSBfc3lzXztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoVGlueS5SQUYpIHtcclxuICAgICAgICB0aGlzLnJhZiA9IG5ldyBUaW55LlJBRih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJvb3QuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYubG9hZCkgc2VsZi5fcHJlbG9hZCgpO1xyXG4gICAgICAgIGVsc2Ugc2VsZi5fY3JlYXRlKCk7XHJcbiAgICB9LCAwKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fcHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMucHJlbG9hZC5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuICAgIHRoaXMuc3RhdGUgPSAxO1xyXG4gICAgdGhpcy5sb2FkLnN0YXJ0KHRoaXMuX2NyZWF0ZSk7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY3JlYXRlLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG5cclxuICAgIGlmICh0aGlzLnJhZikge1xyXG4gICAgICAgIHRoaXMucmFmLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IDI7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5yYWYpIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wYXVzZWQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLnBhdXNlKSB0aGlzLnN5c3RlbXNbaV0ucGF1c2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5yYWYpIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN5c3RlbXNbaV0ucmVzdW1lKSB0aGlzLnN5c3RlbXNbaV0ucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAodGltZSwgZGVsdGEpIHtcclxuICAgIGlmICghdGhpcy5wYXVzZWQpIHtcclxuICAgICAgICBkZWx0YSAqPSB0aGlzLnRpbWVTY2FsZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZS5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwidXBkYXRlXCIsIGRlbHRhKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVwZGF0YWJsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0YWJsZVtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZUR1cmF0aW9uICs9IGRlbHRhO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB0aGlzLmVtaXQoXCJwb3N0cmVuZGVyXCIpO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgdGhpcy53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlID4gMCkge1xyXG4gICAgICAgIHRoaXMuX3Jlc2l6ZV9jYi5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuaW5wdXQpIHNlbGYuaW5wdXQudXBkYXRlQm91bmRzKCk7XHJcbiAgICB9LCAwKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGNsZWFyQ2FjaGUpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtc1tpXS5kZXN0cm95KSB0aGlzLnN5c3RlbXNbaV0uZGVzdHJveShjbGVhckNhY2hlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XHJcblxyXG4gICAgaWYgKGNsZWFyQ2FjaGUpIHtcclxuICAgICAgICB0aGlzLmxvYWQuY2xlYXJDYWNoZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJhZikge1xyXG4gICAgICAgIHRoaXMucmFmLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kZXN0cm95X2NiLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG59O1xyXG4iLCJyZXF1aXJlKFwiLi91dGlscy9wb2x5ZmlsbC5qc1wiKTtcclxuXHJcbndpbmRvdy5UaW55ID0ge307XHJcblxyXG5yZXF1aXJlKFwiLi9BcHAuanNcIik7XHJcbnJlcXVpcmUoXCIuL2dsb2JhbC5qc1wiKTtcclxucmVxdWlyZShcIi4vbWF0aC9NYXRoLmpzXCIpOyAvLyAxIEtiXHJcbnJlcXVpcmUoXCIuL21hdGgvUG9pbnQuanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL21hdGgvTWF0cml4LmpzXCIpOyAvL1xyXG5yZXF1aXJlKFwiLi9tYXRoL1JlY3RhbmdsZS5qc1wiKTsgLy8gIDggS2JcclxuXHJcbnJlcXVpcmUoXCIuL29iamVjdHMvQmFzZU9iamVjdDJELmpzXCIpOyAvL1xyXG5yZXF1aXJlKFwiLi9vYmplY3RzL09iamVjdDJELmpzXCIpOyAvL1xyXG5yZXF1aXJlKFwiLi9vYmplY3RzL1NjZW5lLmpzXCIpOyAvLyAxMCBLYlxyXG5cclxucmVxdWlyZShcIi4vcmVuZGVyZXJzL0NhbnZhc1JlbmRlcmVyLmpzXCIpOyAvLyAzIEtiXHJcbiIsIlRpbnkuVkVSU0lPTiA9IFwiMi4xLjZcIjtcclxuXHJcblRpbnkuc3lzdGVtcyA9IFtdO1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbSA9IGZ1bmN0aW9uIChuYW1lLCBzeXN0ZW0pIHtcclxuICAgIFRpbnkuc3lzdGVtcy5wdXNoKHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIF9jbGFzc186IHN5c3RlbVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5UaW55LlByaW1pdGl2ZXMgPSB7XHJcbiAgICBQT0xZOiAwLFxyXG4gICAgUkVDVDogMSxcclxuICAgIENJUkM6IDIsXHJcbiAgICBFTElQOiAzLFxyXG4gICAgUlJFQzogNCxcclxuICAgIFJSRUNfTEpPSU46IDVcclxufTtcclxuXHJcblRpbnkucm5kID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcclxufTtcclxuXHJcblRpbnkuY29sb3IycmdiID0gZnVuY3Rpb24gKHN0eWxlKSB7XHJcbiAgICByZXR1cm4gVGlueS5oZXgycmdiKFRpbnkuc3R5bGUyaGV4KHN0eWxlKSk7XHJcbn07XHJcblxyXG5UaW55LmNvbG9yMnN0eWxlID0gZnVuY3Rpb24gKHN0eWxlKSB7XHJcbiAgICByZXR1cm4gc3R5bGU7XHJcbn07XHJcblxyXG5UaW55LnN0eWxlMmhleCA9IGZ1bmN0aW9uIChzdHlsZSkge1xyXG4gICAgcmV0dXJuICtzdHlsZS5yZXBsYWNlKFwiI1wiLCBcIjB4XCIpO1xyXG59O1xyXG5cclxuVGlueS5oZXgyc3R5bGUgPSBmdW5jdGlvbiAoaGV4KSB7XHJcbiAgICByZXR1cm4gXCIjXCIgKyAoXCIwMDAwMFwiICsgKGhleCB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxufTtcclxuXHJcblRpbnkuaGV4MnJnYiA9IGZ1bmN0aW9uIChoZXgpIHtcclxuICAgIHJldHVybiBbKChoZXggPj4gMTYpICYgMHhmZikgLyAyNTUsICgoaGV4ID4+IDgpICYgMHhmZikgLyAyNTUsIChoZXggJiAweGZmKSAvIDI1NV07XHJcbn07XHJcblxyXG5UaW55LnJnYjJoZXggPSBmdW5jdGlvbiAocmdiKSB7XHJcbiAgICByZXR1cm4gKChyZ2JbMF0gKiAyNTUpIDw8IDE2KSArICgocmdiWzFdICogMjU1KSA8PCA4KSArIHJnYlsyXSAqIDI1NTtcclxufTtcclxuIiwiVGlueS5DaXJjbGUgPSBmdW5jdGlvbiAoeCwgeSwgZGlhbWV0ZXIpIHtcclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgZGlhbWV0ZXIgPSBkaWFtZXRlciB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcblxyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB0aGlzLl9kaWFtZXRlciA9IGRpYW1ldGVyO1xyXG5cclxuICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcblxyXG4gICAgaWYgKGRpYW1ldGVyID4gMCkge1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IGRpYW1ldGVyICogMC41O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5DSVJDO1xyXG59O1xyXG5cclxuVGlueS5DaXJjbGUucHJvdG90eXBlID0ge1xyXG4gICAgZ2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55LlJlY3RhbmdsZSh0aGlzLnggLSB0aGlzLnJhZGl1cywgdGhpcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMuZGlhbWV0ZXIsIHRoaXMuZGlhbWV0ZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHgsIHksIGRpYW1ldGVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuX2RpYW1ldGVyID0gZGlhbWV0ZXI7XHJcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gZGlhbWV0ZXIgKiAwLjU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb3B5RnJvbTogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldFRvKHNvdXJjZS54LCBzb3VyY2UueSwgc291cmNlLmRpYW1ldGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgY29weVRvOiBmdW5jdGlvbiAoZGVzdCkge1xyXG4gICAgICAgIGRlc3QueCA9IHRoaXMueDtcclxuICAgICAgICBkZXN0LnkgPSB0aGlzLnk7XHJcbiAgICAgICAgZGVzdC5kaWFtZXRlciA9IHRoaXMuX2RpYW1ldGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVzdDtcclxuICAgIH0sXHJcblxyXG4gICAgZGlzdGFuY2U6IGZ1bmN0aW9uIChkZXN0LCByb3VuZCkge1xyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IFRpbnkuTWF0aC5kaXN0YW5jZSh0aGlzLngsIHRoaXMueSwgZGVzdC54LCBkZXN0LnkpO1xyXG4gICAgICAgIHJldHVybiByb3VuZCA/IE1hdGgucm91bmQoZGlzdGFuY2UpIDogZGlzdGFuY2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09IFwidW5kZWZpbmVkXCIgfHwgb3V0cHV0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG5ldyBUaW55LkNpcmNsZSh0aGlzLngsIHRoaXMueSwgdGhpcy5kaWFtZXRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0cHV0LnNldFRvKHRoaXMueCwgdGhpcy55LCB0aGlzLmRpYW1ldGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHJldHVybiBUaW55LkNpcmNsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuICAgIH0sXHJcblxyXG4gICAgb2Zmc2V0OiBmdW5jdGlvbiAoZHgsIGR5KSB7XHJcbiAgICAgICAgdGhpcy54ICs9IGR4O1xyXG4gICAgICAgIHRoaXMueSArPSBkeTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9mZnNldFBvaW50OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXQocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkNpcmNsZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiZGlhbWV0ZXJcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpYW1ldGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWUgKiAwLjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwicmFkaXVzXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSB2YWx1ZSAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwibGVmdFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54IC0gdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMueCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnggLSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJyaWdodFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IHRoaXMueCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB2YWx1ZSAtIHRoaXMueDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJ0b3BcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSAtIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLnkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdGhpcy55IC0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiYm90dG9tXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHZhbHVlIC0gdGhpcy55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImFyZWFcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JhZGl1cyA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguUEkgKiB0aGlzLl9yYWRpdXMgKiB0aGlzLl9yYWRpdXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiZW1wdHlcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpYW1ldGVyID09PSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKDAsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LkNpcmNsZS5jb250YWlucyA9IGZ1bmN0aW9uIChhLCB4LCB5KSB7XHJcbiAgICAvLyAgQ2hlY2sgaWYgeC95IGFyZSB3aXRoaW4gdGhlIGJvdW5kcyBmaXJzdFxyXG4gICAgaWYgKGEucmFkaXVzID4gMCAmJiB4ID49IGEubGVmdCAmJiB4IDw9IGEucmlnaHQgJiYgeSA+PSBhLnRvcCAmJiB5IDw9IGEuYm90dG9tKSB7XHJcbiAgICAgICAgdmFyIGR4ID0gKGEueCAtIHgpICogKGEueCAtIHgpO1xyXG4gICAgICAgIHZhciBkeSA9IChhLnkgLSB5KSAqIChhLnkgLSB5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGR4ICsgZHkgPD0gYS5yYWRpdXMgKiBhLnJhZGl1cztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DaXJjbGUuZXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIHJldHVybiBhLnggPT0gYi54ICYmIGEueSA9PSBiLnkgJiYgYS5kaWFtZXRlciA9PSBiLmRpYW1ldGVyO1xyXG59O1xyXG5cclxuVGlueS5DaXJjbGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICByZXR1cm4gVGlueS5NYXRoLmRpc3RhbmNlKGEueCwgYS55LCBiLngsIGIueSkgPD0gYS5yYWRpdXMgKyBiLnJhZGl1cztcclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLmludGVyc2VjdHNSZWN0YW5nbGUgPSBmdW5jdGlvbiAoYywgcikge1xyXG4gICAgdmFyIGN4ID0gTWF0aC5hYnMoYy54IC0gci54IC0gci5oYWxmV2lkdGgpO1xyXG4gICAgdmFyIHhEaXN0ID0gci5oYWxmV2lkdGggKyBjLnJhZGl1cztcclxuXHJcbiAgICBpZiAoY3ggPiB4RGlzdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY3kgPSBNYXRoLmFicyhjLnkgLSByLnkgLSByLmhhbGZIZWlnaHQpO1xyXG4gICAgdmFyIHlEaXN0ID0gci5oYWxmSGVpZ2h0ICsgYy5yYWRpdXM7XHJcblxyXG4gICAgaWYgKGN5ID4geURpc3QpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN4IDw9IHIuaGFsZldpZHRoIHx8IGN5IDw9IHIuaGFsZkhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB4Q29ybmVyRGlzdCA9IGN4IC0gci5oYWxmV2lkdGg7XHJcbiAgICB2YXIgeUNvcm5lckRpc3QgPSBjeSAtIHIuaGFsZkhlaWdodDtcclxuICAgIHZhciB4Q29ybmVyRGlzdFNxID0geENvcm5lckRpc3QgKiB4Q29ybmVyRGlzdDtcclxuICAgIHZhciB5Q29ybmVyRGlzdFNxID0geUNvcm5lckRpc3QgKiB5Q29ybmVyRGlzdDtcclxuICAgIHZhciBtYXhDb3JuZXJEaXN0U3EgPSBjLnJhZGl1cyAqIGMucmFkaXVzO1xyXG5cclxuICAgIHJldHVybiB4Q29ybmVyRGlzdFNxICsgeUNvcm5lckRpc3RTcSA8PSBtYXhDb3JuZXJEaXN0U3E7XHJcbn07XHJcbiIsIlRpbnkuTWF0aCA9IHtcclxuICAgIGRpc3RhbmNlOiBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgICAgICB2YXIgZHggPSB4MSAtIHgyO1xyXG4gICAgICAgIHZhciBkeSA9IHkxIC0geTI7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvciA9IE1hdGguUEkgLyAxODA7XHJcbnZhciByYWRpYW5Ub0RlZ3JlZXNGYWN0b3IgPSAxODAgLyBNYXRoLlBJO1xyXG5cclxuVGlueS5NYXRoLmRlZ1RvUmFkID0gZnVuY3Rpb24gZGVnVG9SYWQoZGVncmVlcykge1xyXG4gICAgcmV0dXJuIGRlZ3JlZXMgKiBkZWdyZWVUb1JhZGlhbnNGYWN0b3I7XHJcbn07XHJcblxyXG5UaW55Lk1hdGgucmFkVG9EZWcgPSBmdW5jdGlvbiByYWRUb0RlZyhyYWRpYW5zKSB7XHJcbiAgICByZXR1cm4gcmFkaWFucyAqIHJhZGlhblRvRGVncmVlc0ZhY3RvcjtcclxufTtcclxuIiwiVGlueS5NYXRyaXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmEgPSAxO1xyXG5cclxuICAgIHRoaXMuYiA9IDA7XHJcblxyXG4gICAgdGhpcy5jID0gMDtcclxuXHJcbiAgICB0aGlzLmQgPSAxO1xyXG5cclxuICAgIHRoaXMudHggPSAwO1xyXG5cclxuICAgIHRoaXMudHkgPSAwO1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuTUFUUklYO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmZyb21BcnJheSA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgdGhpcy5hID0gYXJyYXlbMF07XHJcbiAgICB0aGlzLmIgPSBhcnJheVsxXTtcclxuICAgIHRoaXMuYyA9IGFycmF5WzNdO1xyXG4gICAgdGhpcy5kID0gYXJyYXlbNF07XHJcbiAgICB0aGlzLnR4ID0gYXJyYXlbMl07XHJcbiAgICB0aGlzLnR5ID0gYXJyYXlbNV07XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICh0cmFuc3Bvc2UpIHtcclxuICAgIGlmICghdGhpcy5hcnJheSkge1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XHJcblxyXG4gICAgaWYgKHRyYW5zcG9zZSkge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5iO1xyXG4gICAgICAgIGFycmF5WzJdID0gMDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYztcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IDA7XHJcbiAgICAgICAgYXJyYXlbNl0gPSB0aGlzLnR4O1xyXG4gICAgICAgIGFycmF5WzddID0gdGhpcy50eTtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5jO1xyXG4gICAgICAgIGFycmF5WzJdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbNl0gPSAwO1xyXG4gICAgICAgIGFycmF5WzddID0gMDtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24gKHBvcywgbmV3UG9zKSB7XHJcbiAgICBuZXdQb3MgPSBuZXdQb3MgfHwgbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB2YXIgeCA9IHBvcy54O1xyXG4gICAgdmFyIHkgPSBwb3MueTtcclxuXHJcbiAgICBuZXdQb3MueCA9IHRoaXMuYSAqIHggKyB0aGlzLmMgKiB5ICsgdGhpcy50eDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5iICogeCArIHRoaXMuZCAqIHkgKyB0aGlzLnR5O1xyXG5cclxuICAgIHJldHVybiBuZXdQb3M7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwbHlJbnZlcnNlID0gZnVuY3Rpb24gKHBvcywgbmV3UG9zKSB7XHJcbiAgICBuZXdQb3MgPSBuZXdQb3MgfHwgbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB2YXIgaWQgPSAxIC8gKHRoaXMuYSAqIHRoaXMuZCArIHRoaXMuYyAqIC10aGlzLmIpO1xyXG4gICAgdmFyIHggPSBwb3MueDtcclxuICAgIHZhciB5ID0gcG9zLnk7XHJcblxyXG4gICAgbmV3UG9zLnggPSB0aGlzLmQgKiBpZCAqIHggKyAtdGhpcy5jICogaWQgKiB5ICsgKHRoaXMudHkgKiB0aGlzLmMgLSB0aGlzLnR4ICogdGhpcy5kKSAqIGlkO1xyXG4gICAgbmV3UG9zLnkgPSB0aGlzLmEgKiBpZCAqIHkgKyAtdGhpcy5iICogaWQgKiB4ICsgKC10aGlzLnR5ICogdGhpcy5hICsgdGhpcy50eCAqIHRoaXMuYikgKiBpZDtcclxuXHJcbiAgICByZXR1cm4gbmV3UG9zO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLnR4ICs9IHg7XHJcbiAgICB0aGlzLnR5ICs9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdGhpcy5hICo9IHg7XHJcbiAgICB0aGlzLmQgKj0geTtcclxuICAgIHRoaXMuYyAqPSB4O1xyXG4gICAgdGhpcy5iICo9IHk7XHJcbiAgICB0aGlzLnR4ICo9IHg7XHJcbiAgICB0aGlzLnR5ICo9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgdmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcclxuXHJcbiAgICB2YXIgYTEgPSB0aGlzLmE7XHJcbiAgICB2YXIgYzEgPSB0aGlzLmM7XHJcbiAgICB2YXIgdHgxID0gdGhpcy50eDtcclxuXHJcbiAgICB0aGlzLmEgPSBhMSAqIGNvcyAtIHRoaXMuYiAqIHNpbjtcclxuICAgIHRoaXMuYiA9IGExICogc2luICsgdGhpcy5iICogY29zO1xyXG4gICAgdGhpcy5jID0gYzEgKiBjb3MgLSB0aGlzLmQgKiBzaW47XHJcbiAgICB0aGlzLmQgPSBjMSAqIHNpbiArIHRoaXMuZCAqIGNvcztcclxuICAgIHRoaXMudHggPSB0eDEgKiBjb3MgLSB0aGlzLnR5ICogc2luO1xyXG4gICAgdGhpcy50eSA9IHR4MSAqIHNpbiArIHRoaXMudHkgKiBjb3M7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgdmFyIGExID0gdGhpcy5hO1xyXG4gICAgdmFyIGIxID0gdGhpcy5iO1xyXG4gICAgdmFyIGMxID0gdGhpcy5jO1xyXG4gICAgdmFyIGQxID0gdGhpcy5kO1xyXG5cclxuICAgIHRoaXMuYSA9IG1hdHJpeC5hICogYTEgKyBtYXRyaXguYiAqIGMxO1xyXG4gICAgdGhpcy5iID0gbWF0cml4LmEgKiBiMSArIG1hdHJpeC5iICogZDE7XHJcbiAgICB0aGlzLmMgPSBtYXRyaXguYyAqIGExICsgbWF0cml4LmQgKiBjMTtcclxuICAgIHRoaXMuZCA9IG1hdHJpeC5jICogYjEgKyBtYXRyaXguZCAqIGQxO1xyXG5cclxuICAgIHRoaXMudHggPSBtYXRyaXgudHggKiBhMSArIG1hdHJpeC50eSAqIGMxICsgdGhpcy50eDtcclxuICAgIHRoaXMudHkgPSBtYXRyaXgudHggKiBiMSArIG1hdHJpeC50eSAqIGQxICsgdGhpcy50eTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5pZGVudGl0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYSA9IDE7XHJcbiAgICB0aGlzLmIgPSAwO1xyXG4gICAgdGhpcy5jID0gMDtcclxuICAgIHRoaXMuZCA9IDE7XHJcbiAgICB0aGlzLnR4ID0gMDtcclxuICAgIHRoaXMudHkgPSAwO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5pZGVudGl0eU1hdHJpeCA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4iLCJUaW55LlBvaW50ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgIHRoaXMueSA9IHkgfHwgMDtcclxufTtcclxuXHJcblRpbnkuUG9pbnQucHJvdG90eXBlID0ge1xyXG4gICAgc2V0OiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8ICh5ICE9PSAwID8gdGhpcy54IDogMCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlBvbHlnb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFyZWEgPSAwO1xyXG4gICAgdGhpcy5fcG9pbnRzID0gW107XHJcblxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5zZXRUby5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLlBPTFk7XHJcbn07XHJcblxyXG5UaW55LlBvbHlnb24ucHJvdG90eXBlID0ge1xyXG4gICAgdG9OdW1iZXJBcnJheTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9wb2ludHNbaV0gPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXS54KTtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH0sXHJcblxyXG4gICAgZmxhdHRlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMudG9OdW1iZXJBcnJheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5fcG9pbnRzLnNsaWNlKCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiIHx8IG91dHB1dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5Qb2x5Z29uKHBvaW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0cHV0LnNldFRvKHBvaW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5fcG9pbnRzLmxlbmd0aDtcclxuICAgICAgICB2YXIgaW5zaWRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAtMSwgaiA9IGxlbmd0aCAtIDE7ICsraSA8IGxlbmd0aDsgaiA9IGkpIHtcclxuICAgICAgICAgICAgdmFyIGl4ID0gdGhpcy5fcG9pbnRzW2ldLng7XHJcbiAgICAgICAgICAgIHZhciBpeSA9IHRoaXMuX3BvaW50c1tpXS55O1xyXG5cclxuICAgICAgICAgICAgdmFyIGp4ID0gdGhpcy5fcG9pbnRzW2pdLng7XHJcbiAgICAgICAgICAgIHZhciBqeSA9IHRoaXMuX3BvaW50c1tqXS55O1xyXG5cclxuICAgICAgICAgICAgaWYgKCgoaXkgPD0geSAmJiB5IDwgankpIHx8IChqeSA8PSB5ICYmIHkgPCBpeSkpICYmIHggPCAoKGp4IC0gaXgpICogKHkgLSBpeSkpIC8gKGp5IC0gaXkpICsgaXgpIHtcclxuICAgICAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnNpZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRvOiBmdW5jdGlvbiAocG9pbnRzKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhID0gMDtcclxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vICBJZiBwb2ludHMgaXNuJ3QgYW4gYXJyYXksIHVzZSBhcmd1bWVudHMgYXMgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwb2ludHMpKSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgeTAgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsbG93cyBmb3IgbWl4ZWQtdHlwZSBhcmd1bWVudHNcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludHNbaV0gPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBUaW55LlBvaW50KHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBUaW55LlBvaW50KHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9pbnRzLnB1c2gocCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gIExvd2VzdCBib3VuZGFyeVxyXG4gICAgICAgICAgICAgICAgaWYgKHAueSA8IHkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTAgPSBwLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQXJlYSh5MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2FsY3VsYXRlQXJlYTogZnVuY3Rpb24gKHkwKSB7XHJcbiAgICAgICAgdmFyIHAxO1xyXG4gICAgICAgIHZhciBwMjtcclxuICAgICAgICB2YXIgYXZnSGVpZ2h0O1xyXG4gICAgICAgIHZhciB3aWR0aDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX3BvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBwMSA9IHRoaXMuX3BvaW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuX3BvaW50c1swXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5fcG9pbnRzW2kgKyAxXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXZnSGVpZ2h0ID0gKHAxLnkgLSB5MCArIChwMi55IC0geTApKSAvIDI7XHJcbiAgICAgICAgICAgIHdpZHRoID0gcDEueCAtIHAyLng7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSArPSBhdmdIZWlnaHQgKiB3aWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmFyZWE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlBvbHlnb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5Qb2x5Z29uO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUG9seWdvbi5wcm90b3R5cGUsIFwicG9pbnRzXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHBvaW50cykge1xyXG4gICAgICAgIGlmIChwb2ludHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKHBvaW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gIENsZWFyIHRoZSBwb2ludHNcclxuICAgICAgICAgICAgdGhpcy5zZXRUbygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiIsIlRpbnkuUmVjdGFuZ2xlID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgd2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLlJFQ1Q7XHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5wcm90b3R5cGUgPSB7XHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zKHRoaXMsIHgsIHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbnRlcnNlY3RzOiBmdW5jdGlvbiAoYikge1xyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzKHRoaXMsIGIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJib3R0b21cIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLnkpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdmFsdWUgLSB0aGlzLnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwicmlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMueCkge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdmFsdWUgLSB0aGlzLng7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwidm9sdW1lXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5SZWN0YW5nbGU7XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWlucyA9IGZ1bmN0aW9uIChhLCB4LCB5KSB7XHJcbiAgICBpZiAoYS53aWR0aCA8PSAwIHx8IGEuaGVpZ2h0IDw9IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHggPj0gYS54ICYmIHggPCBhLnJpZ2h0ICYmIHkgPj0gYS55ICYmIHkgPCBhLmJvdHRvbTtcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUG9pbnQgPSBmdW5jdGlvbiAoYSwgcG9pbnQpIHtcclxuICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jb250YWlucyhhLCBwb2ludC54LCBwb2ludC55KTtcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUmVjdCA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAvLyAgSWYgdGhlIGdpdmVuIHJlY3QgaGFzIGEgbGFyZ2VyIHZvbHVtZSB0aGFuIHRoaXMgb25lIHRoZW4gaXQgY2FuIG5ldmVyIGNvbnRhaW4gaXRcclxuICAgIGlmIChhLnZvbHVtZSA+IGIudm9sdW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhLnggPj0gYi54ICYmIGEueSA+PSBiLnkgJiYgYS5yaWdodCA8IGIucmlnaHQgJiYgYS5ib3R0b20gPCBiLmJvdHRvbTtcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgaWYgKGEud2lkdGggPD0gMCB8fCBhLmhlaWdodCA8PSAwIHx8IGIud2lkdGggPD0gMCB8fCBiLmhlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhKGEucmlnaHQgPCBiLnggfHwgYS5ib3R0b20gPCBiLnkgfHwgYS54ID4gYi5yaWdodCB8fCBhLnkgPiBiLmJvdHRvbSk7XHJcbn07XHJcblxyXG5UaW55LkVtcHR5UmVjdGFuZ2xlID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDAsIDApO1xyXG4iLCJUaW55LlJvdW5kZWRSZWN0YW5nbGUgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKSB7XHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cyB8fCAyMDtcclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SUkVDO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5yYWRpdXMpO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICBpZiAodGhpcy53aWR0aCA8PSAwIHx8IHRoaXMuaGVpZ2h0IDw9IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHgxID0gdGhpcy54O1xyXG5cclxuICAgIGlmICh4ID49IHgxICYmIHggPD0geDEgKyB0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgdmFyIHkxID0gdGhpcy55O1xyXG5cclxuICAgICAgICBpZiAoeSA+PSB5MSAmJiB5IDw9IHkxICsgdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuUm91bmRlZFJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJvdW5kZWRSZWN0YW5nbGU7XHJcbiIsInJlcXVpcmUoXCIuL2Jhc2UuanNcIik7XHJcblxyXG5yZXF1aXJlKFwiLi9zeXN0ZW1zL1JBRi5qc1wiKTsgLy8gMiBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvT2JqZWN0Q3JlYXRvci5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvTG9hZGVyLmpzXCIpOyAvLyAzIEtiXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvSW5wdXQuanNcIik7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9UaW1lci5qc1wiKTsgLy8gMSBLYlxyXG5cclxucmVxdWlyZShcIi4vdXRpbHMvRXZlbnRFbWl0dGVyLmpzXCIpO1xyXG5cclxucmVxdWlyZShcIi4vdGV4dHVyZXMvVGV4dHVyZS5qc1wiKTsgLy8gNCBLYlxyXG5cclxucmVxdWlyZShcIi4vb2JqZWN0cy9TcHJpdGUuanNcIik7IC8vIDMgS2JcclxucmVxdWlyZShcIi4vb2JqZWN0cy9UZXh0LmpzXCIpOyAvLyA1IEtiXHJcbiIsInZhciBwaTIgPSBNYXRoLlBJICogMjtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJEID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUaW55LlBvaW50KDEsIDEpO1xyXG4gICAgdGhpcy5waXZvdCA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmFscGhhID0gMTtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLl9zciA9IDA7XHJcbiAgICB0aGlzLl9jciA9IDE7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkJhc2VPYmplY3QyRDtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG51bGw7XHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZGVzdHJveUNhY2hlZFNwcml0ZSgpO1xyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ3b3JsZFZpc2libGVcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGlmICghaXRlbS52aXNpYmxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnBhcmVudDtcclxuICAgICAgICB9IHdoaWxlIChpdGVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJjYWNoZUFzQml0bWFwXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwID09PSB2YWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIHNvbWUgbWF0cml4IHJlZnMgZm9yIGVhc3kgYWNjZXNzXHJcbiAgICB2YXIgcHQgPSB0aGlzLnBhcmVudC53b3JsZFRyYW5zZm9ybTtcclxuICAgIHZhciB3dCA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgLy8gdGVtcG9yYXJ5IG1hdHJpeCB2YXJpYWJsZXNcclxuICAgIHZhciBhLCBiLCBjLCBkLCB0eCwgdHk7XHJcblxyXG4gICAgLy8gc28gaWYgcm90YXRpb24gaXMgYmV0d2VlbiAwIHRoZW4gd2UgY2FuIHNpbXBsaWZ5IHRoZSBtdWx0aXBsaWNhdGlvbiBwcm9jZXNzLi5cclxuICAgIGlmICh0aGlzLnJvdGF0aW9uICUgcGkyKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSByb3RhdGlvbiBpcyB0aGUgc2FtZSBhcyB0aGUgcHJldmlvdXMgcmVuZGVyLiBUaGlzIG1lYW5zIHdlIG9ubHkgbmVlZCB0byB1c2Ugc2luIGFuZCBjb3Mgd2hlbiByb3RhdGlvbiBhY3R1YWxseSBjaGFuZ2VzXHJcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb24gIT09IHRoaXMucm90YXRpb25DYWNoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uQ2FjaGUgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9zciA9IE1hdGguc2luKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9jciA9IE1hdGguY29zKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtYXRyaXggdmFsdWVzIG9mIHRoZSBkaXNwbGF5b2JqZWN0IGJhc2VkIG9uIGl0cyB0cmFuc2Zvcm0gcHJvcGVydGllcy4uXHJcbiAgICAgICAgYSA9IHRoaXMuX2NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGIgPSB0aGlzLl9zciAqIHRoaXMuc2NhbGUueDtcclxuICAgICAgICBjID0gLXRoaXMuX3NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIGQgPSB0aGlzLl9jciAqIHRoaXMuc2NhbGUueTtcclxuICAgICAgICB0eCA9IHRoaXMucG9zaXRpb24ueDtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIHBpdm90Li4gbm90IG9mdGVuIHVzZWQgc28gZ2VhcmVkIHRvd2FyZHMgdGhhdCBmYWN0IVxyXG4gICAgICAgIGlmICh0aGlzLnBpdm90LnggfHwgdGhpcy5waXZvdC55KSB7XHJcbiAgICAgICAgICAgIHR4IC09IHRoaXMucGl2b3QueCAqIGEgKyB0aGlzLnBpdm90LnkgKiBjO1xyXG4gICAgICAgICAgICB0eSAtPSB0aGlzLnBpdm90LnggKiBiICsgdGhpcy5waXZvdC55ICogZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbmNhdCB0aGUgcGFyZW50IG1hdHJpeCB3aXRoIHRoZSBvYmplY3RzIHRyYW5zZm9ybS5cclxuICAgICAgICB3dC5hID0gYSAqIHB0LmEgKyBiICogcHQuYztcclxuICAgICAgICB3dC5iID0gYSAqIHB0LmIgKyBiICogcHQuZDtcclxuICAgICAgICB3dC5jID0gYyAqIHB0LmEgKyBkICogcHQuYztcclxuICAgICAgICB3dC5kID0gYyAqIHB0LmIgKyBkICogcHQuZDtcclxuICAgICAgICB3dC50eCA9IHR4ICogcHQuYSArIHR5ICogcHQuYyArIHB0LnR4O1xyXG4gICAgICAgIHd0LnR5ID0gdHggKiBwdC5iICsgdHkgKiBwdC5kICsgcHQudHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGxldHMgZG8gdGhlIGZhc3QgdmVyc2lvbiBhcyB3ZSBrbm93IHRoZXJlIGlzIG5vIHJvdGF0aW9uLi5cclxuICAgICAgICBhID0gdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGQgPSB0aGlzLnNjYWxlLnk7XHJcblxyXG4gICAgICAgIHR4ID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy5waXZvdC54ICogYTtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueSAtIHRoaXMucGl2b3QueSAqIGQ7XHJcblxyXG4gICAgICAgIHd0LmEgPSBhICogcHQuYTtcclxuICAgICAgICB3dC5iID0gYSAqIHB0LmI7XHJcbiAgICAgICAgd3QuYyA9IGQgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgPSBkICogcHQuZDtcclxuICAgICAgICB3dC50eCA9IHR4ICogcHQuYSArIHR5ICogcHQuYyArIHB0LnR4O1xyXG4gICAgICAgIHd0LnR5ID0gdHggKiBwdC5iICsgdHkgKiBwdC5kICsgcHQudHk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbXVsdGlwbHkgdGhlIGFscGhhcy4uXHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSB0aGlzLmFscGhhICogdGhpcy5wYXJlbnQud29ybGRBbHBoYTtcclxufTtcclxuXHJcbi8vIHBlcmZvcm1hbmNlIGluY3JlYXNlIHRvIGF2b2lkIHVzaW5nIGNhbGwuLiAoMTB4IGZhc3RlcilcclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0gPSBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICAgIC8vIG1hdHJpeCA9IG1hdHJpeDsvL2p1c3QgdG8gZ2V0IHBhc3NlZCBqcyBoaW50aW5nIChhbmQgcHJlc2VydmUgaW5oZXJpdGFuY2UpXHJcbiAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5nZXRMb2NhbEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldEJvdW5kcyhUaW55LmlkZW50aXR5TWF0cml4KTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5nZW5lcmF0ZVRleHR1cmUgPSBmdW5jdGlvbiAocmVzb2x1dGlvbiwgcmVuZGVyZXIpIHtcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwLCByZW5kZXJlciwgcmVzb2x1dGlvbik7XHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuXHJcbiAgICByZW5kZXJUZXh0dXJlLnJlbmRlcih0aGlzLCBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeCk7XHJcblxyXG4gICAgcmV0dXJuIHJlbmRlclRleHR1cmU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnRvR2xvYmFsID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcbiAgICAvLyBkb24ndCBuZWVkIHRvIHVbZGF0ZSB0aGUgbG90XHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIHJldHVybiB0aGlzLndvcmxkVHJhbnNmb3JtLmFwcGx5KHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS50b0xvY2FsID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBmcm9tKSB7XHJcbiAgICBpZiAoZnJvbSkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gZnJvbS50b0dsb2JhbChwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG9uJ3QgbmVlZCB0byB1W2RhdGUgdGhlIGxvdFxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5fcmVuZGVyQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsIHJlbmRlclNlc3Npb24pO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSkge1xyXG4gICAgICAgIHZhciByZW5kZXJUZXh0dXJlID0gbmV3IFRpbnkuUmVuZGVyVGV4dHVyZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7IC8vLCByZW5kZXJTZXNzaW9uLnJlbmRlcmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHJlbmRlclRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlc2l6ZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5yZW5kZXIodGhpcywgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgsIHRydWUpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueCA9IC0oYm91bmRzLnggLyBib3VuZHMud2lkdGgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLShib3VuZHMueSAvIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9kZXN0cm95Q2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5kZXN0cm95KHRydWUpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHt9O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ4XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLng7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ5XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuIiwiVGlueS5HcmFwaGljc0RhdGEgPSBmdW5jdGlvbiAobGluZVdpZHRoLCBsaW5lQ29sb3IsIGxpbmVBbHBoYSwgZmlsbENvbG9yLCBmaWxsQWxwaGEsIGZpbGwsIHNoYXBlKSB7XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuICAgIHRoaXMubGluZUNvbG9yID0gbGluZUNvbG9yO1xyXG4gICAgdGhpcy5saW5lQWxwaGEgPSBsaW5lQWxwaGE7XHJcbiAgICB0aGlzLl9saW5lVGludCA9IGxpbmVDb2xvcjtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gZmlsbENvbG9yO1xyXG4gICAgdGhpcy5maWxsQWxwaGEgPSBmaWxsQWxwaGE7XHJcbiAgICB0aGlzLl9maWxsVGludCA9IGZpbGxDb2xvcjtcclxuICAgIHRoaXMuZmlsbCA9IGZpbGw7XHJcbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XHJcbiAgICB0aGlzLnR5cGUgPSBzaGFwZS50eXBlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljc0RhdGEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5HcmFwaGljc0RhdGE7XHJcblxyXG5UaW55LkdyYXBoaWNzRGF0YS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmV3IEdyYXBoaWNzRGF0YShcclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCxcclxuICAgICAgICB0aGlzLmxpbmVDb2xvcixcclxuICAgICAgICB0aGlzLmxpbmVBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGxDb2xvcixcclxuICAgICAgICB0aGlzLmZpbGxBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGwsXHJcbiAgICAgICAgdGhpcy5zaGFwZVxyXG4gICAgKTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gMTtcclxuICAgIHRoaXMubGluZVdpZHRoID0gMDtcclxuICAgIHRoaXMubGluZUNvbG9yID0gMDtcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhID0gW107XHJcbiAgICB0aGlzLnRpbnQgPSBcIiNGRkZGRkZcIjtcclxuICAgIHRoaXMuYmxlbmRNb2RlID0gXCJzb3VyY2Utb3ZlclwiO1xyXG4gICAgdGhpcy5jdXJyZW50UGF0aCA9IG51bGw7XHJcbiAgICB0aGlzLmlzTWFzayA9IGZhbHNlO1xyXG4gICAgdGhpcy5ib3VuZHNQYWRkaW5nID0gMDtcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcyA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSBmYWxzZTtcclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55Lk9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5HcmFwaGljcztcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVTdHlsZSA9IGZ1bmN0aW9uIChsaW5lV2lkdGgsIGNvbG9yLCBhbHBoYSkge1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGggfHwgMDtcclxuICAgIHRoaXMubGluZUNvbG9yID0gY29sb3IgfHwgXCIjMDAwMDAwXCI7XHJcbiAgICB0aGlzLmxpbmVBbHBoYSA9IGFscGhhID09PSB1bmRlZmluZWQgPyAxIDogYWxwaGE7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIGhhbGZ3YXkgdGhyb3VnaCBhIGxpbmU/IHN0YXJ0IGEgbmV3IG9uZSFcclxuICAgICAgICAgICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbih0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5zbGljZSgtMikpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgaXRzIGVtcHR5IHNvIGxldHMganVzdCBzZXQgdGhlIGxpbmUgcHJvcGVydGllc1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVXaWR0aCA9IHRoaXMubGluZVdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVDb2xvciA9IHRoaXMubGluZUNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVBbHBoYSA9IHRoaXMubGluZUFscGhhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5Qb2x5Z29uKFt4LCB5XSkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUubGluZVRvID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIGlmICghdGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLnB1c2goeCwgeSk7XHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnF1YWRyYXRpY0N1cnZlVG8gPSBmdW5jdGlvbiAoY3BYLCBjcFksIHRvWCwgdG9ZKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeGEsXHJcbiAgICAgICAgeWEsXHJcbiAgICAgICAgbiA9IDIwLFxyXG4gICAgICAgIHBvaW50cyA9IHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzO1xyXG5cclxuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZyb21YID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXTtcclxuICAgIHZhciBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV07XHJcbiAgICB2YXIgaiA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyArK2kpIHtcclxuICAgICAgICBqID0gaSAvIG47XHJcblxyXG4gICAgICAgIHhhID0gZnJvbVggKyAoY3BYIC0gZnJvbVgpICogajtcclxuICAgICAgICB5YSA9IGZyb21ZICsgKGNwWSAtIGZyb21ZKSAqIGo7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKHhhICsgKGNwWCArICh0b1ggLSBjcFgpICogaiAtIHhhKSAqIGosIHlhICsgKGNwWSArICh0b1kgLSBjcFkpICogaiAtIHlhKSAqIGopO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYmV6aWVyQ3VydmVUbyA9IGZ1bmN0aW9uIChjcFgsIGNwWSwgY3BYMiwgY3BZMiwgdG9YLCB0b1kpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyA9IFswLCAwXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuID0gMjAsXHJcbiAgICAgICAgZHQsXHJcbiAgICAgICAgZHQyLFxyXG4gICAgICAgIGR0MyxcclxuICAgICAgICB0MixcclxuICAgICAgICB0MyxcclxuICAgICAgICBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICB2YXIgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDJdO1xyXG4gICAgdmFyIGZyb21ZID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXTtcclxuICAgIHZhciBqID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyArK2kpIHtcclxuICAgICAgICBqID0gaSAvIG47XHJcblxyXG4gICAgICAgIGR0ID0gMSAtIGo7XHJcbiAgICAgICAgZHQyID0gZHQgKiBkdDtcclxuICAgICAgICBkdDMgPSBkdDIgKiBkdDtcclxuXHJcbiAgICAgICAgdDIgPSBqICogajtcclxuICAgICAgICB0MyA9IHQyICogajtcclxuXHJcbiAgICAgICAgcG9pbnRzLnB1c2goXHJcbiAgICAgICAgICAgIGR0MyAqIGZyb21YICsgMyAqIGR0MiAqIGogKiBjcFggKyAzICogZHQgKiB0MiAqIGNwWDIgKyB0MyAqIHRvWCxcclxuICAgICAgICAgICAgZHQzICogZnJvbVkgKyAzICogZHQyICogaiAqIGNwWSArIDMgKiBkdCAqIHQyICogY3BZMiArIHQzICogdG9ZXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmFyY1RvID0gZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyLCByYWRpdXMpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5wdXNoKHgxLCB5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyh4MSwgeTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyxcclxuICAgICAgICBmcm9tWCA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl0sXHJcbiAgICAgICAgZnJvbVkgPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLFxyXG4gICAgICAgIGExID0gZnJvbVkgLSB5MSxcclxuICAgICAgICBiMSA9IGZyb21YIC0geDEsXHJcbiAgICAgICAgYTIgPSB5MiAtIHkxLFxyXG4gICAgICAgIGIyID0geDIgLSB4MSxcclxuICAgICAgICBtbSA9IE1hdGguYWJzKGExICogYjIgLSBiMSAqIGEyKTtcclxuXHJcbiAgICBpZiAobW0gPCAxLjBlLTggfHwgcmFkaXVzID09PSAwKSB7XHJcbiAgICAgICAgaWYgKHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl0gIT09IHgxIHx8IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0gIT09IHkxKSB7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHgxLCB5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZGQgPSBhMSAqIGExICsgYjEgKiBiMSxcclxuICAgICAgICAgICAgY2MgPSBhMiAqIGEyICsgYjIgKiBiMixcclxuICAgICAgICAgICAgdHQgPSBhMSAqIGEyICsgYjEgKiBiMixcclxuICAgICAgICAgICAgazEgPSAocmFkaXVzICogTWF0aC5zcXJ0KGRkKSkgLyBtbSxcclxuICAgICAgICAgICAgazIgPSAocmFkaXVzICogTWF0aC5zcXJ0KGNjKSkgLyBtbSxcclxuICAgICAgICAgICAgajEgPSAoazEgKiB0dCkgLyBkZCxcclxuICAgICAgICAgICAgajIgPSAoazIgKiB0dCkgLyBjYyxcclxuICAgICAgICAgICAgY3ggPSBrMSAqIGIyICsgazIgKiBiMSxcclxuICAgICAgICAgICAgY3kgPSBrMSAqIGEyICsgazIgKiBhMSxcclxuICAgICAgICAgICAgcHggPSBiMSAqIChrMiArIGoxKSxcclxuICAgICAgICAgICAgcHkgPSBhMSAqIChrMiArIGoxKSxcclxuICAgICAgICAgICAgcXggPSBiMiAqIChrMSArIGoyKSxcclxuICAgICAgICAgICAgcXkgPSBhMiAqIChrMSArIGoyKSxcclxuICAgICAgICAgICAgc3RhcnRBbmdsZSA9IE1hdGguYXRhbjIocHkgLSBjeSwgcHggLSBjeCksXHJcbiAgICAgICAgICAgIGVuZEFuZ2xlID0gTWF0aC5hdGFuMihxeSAtIGN5LCBxeCAtIGN4KTtcclxuXHJcbiAgICAgICAgdGhpcy5hcmMoY3ggKyB4MSwgY3kgKyB5MSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYjEgKiBhMiA+IGIyICogYTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYXJjID0gZnVuY3Rpb24gKGN4LCBjeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSkge1xyXG4gICAgLy8gIElmIHdlIGRvIHRoaXMgd2UgY2FuIG5ldmVyIGRyYXcgYSBmdWxsIGNpcmNsZVxyXG4gICAgaWYgKHN0YXJ0QW5nbGUgPT09IGVuZEFuZ2xlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBhbnRpY2xvY2t3aXNlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgYW50aWNsb2Nrd2lzZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghYW50aWNsb2Nrd2lzZSAmJiBlbmRBbmdsZSA8PSBzdGFydEFuZ2xlKSB7XHJcbiAgICAgICAgZW5kQW5nbGUgKz0gTWF0aC5QSSAqIDI7XHJcbiAgICB9IGVsc2UgaWYgKGFudGljbG9ja3dpc2UgJiYgc3RhcnRBbmdsZSA8PSBlbmRBbmdsZSkge1xyXG4gICAgICAgIHN0YXJ0QW5nbGUgKz0gTWF0aC5QSSAqIDI7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN3ZWVwID0gYW50aWNsb2Nrd2lzZSA/IChzdGFydEFuZ2xlIC0gZW5kQW5nbGUpICogLTEgOiBlbmRBbmdsZSAtIHN0YXJ0QW5nbGU7XHJcbiAgICB2YXIgc2VncyA9IE1hdGguY2VpbChNYXRoLmFicyhzd2VlcCkgLyAoTWF0aC5QSSAqIDIpKSAqIDQwO1xyXG5cclxuICAgIC8vICBTd2VlcCBjaGVjayAtIG1vdmVkIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGRvIHRoZSBtb3ZlVG8gYmVsb3cgaWYgdGhlIGFyYyBmYWlsc1xyXG4gICAgaWYgKHN3ZWVwID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0YXJ0WCA9IGN4ICsgTWF0aC5jb3Moc3RhcnRBbmdsZSkgKiByYWRpdXM7XHJcbiAgICB2YXIgc3RhcnRZID0gY3kgKyBNYXRoLnNpbihzdGFydEFuZ2xlKSAqIHJhZGl1cztcclxuXHJcbiAgICBpZiAoYW50aWNsb2Nrd2lzZSAmJiB0aGlzLmZpbGxpbmcpIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyhjeCwgY3kpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGN1cnJlbnRQYXRoIHdpbGwgYWx3YXlzIGV4aXN0IGFmdGVyIGNhbGxpbmcgYSBtb3ZlVG9cclxuICAgIHZhciBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICB2YXIgdGhldGEgPSBzd2VlcCAvIChzZWdzICogMik7XHJcbiAgICB2YXIgdGhldGEyID0gdGhldGEgKiAyO1xyXG5cclxuICAgIHZhciBjVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XHJcbiAgICB2YXIgc1RoZXRhID0gTWF0aC5zaW4odGhldGEpO1xyXG5cclxuICAgIHZhciBzZWdNaW51cyA9IHNlZ3MgLSAxO1xyXG5cclxuICAgIHZhciByZW1haW5kZXIgPSAoc2VnTWludXMgJSAxKSAvIHNlZ01pbnVzO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHNlZ01pbnVzOyBpKyspIHtcclxuICAgICAgICB2YXIgcmVhbCA9IGkgKyByZW1haW5kZXIgKiBpO1xyXG5cclxuICAgICAgICB2YXIgYW5nbGUgPSB0aGV0YSArIHN0YXJ0QW5nbGUgKyB0aGV0YTIgKiByZWFsO1xyXG5cclxuICAgICAgICB2YXIgYyA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICB2YXIgcyA9IC1NYXRoLnNpbihhbmdsZSk7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKChjVGhldGEgKiBjICsgc1RoZXRhICogcykgKiByYWRpdXMgKyBjeCwgKGNUaGV0YSAqIC1zICsgc1RoZXRhICogYykgKiByYWRpdXMgKyBjeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5iZWdpbkZpbGwgPSBmdW5jdGlvbiAoY29sb3IsIGFscGhhKSB7XHJcbiAgICB0aGlzLmZpbGxpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBjb2xvciB8fCBcIiMwMDAwMDBcIjtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gYWxwaGEgPT09IHVuZGVmaW5lZCA/IDEgOiBhbHBoYTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPD0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmZpbGwgPSB0aGlzLmZpbGxpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbENvbG9yID0gdGhpcy5maWxsQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbEFscGhhID0gdGhpcy5maWxsQWxwaGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZW5kRmlsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmlsbGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBudWxsO1xyXG4gICAgdGhpcy5maWxsQWxwaGEgPSAxO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1JlY3QgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdCA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpIHtcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBUaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Um91bmRlZFJlY3QyID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgc2hhcGUgPSBuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cylcclxuLy8gICAgIHNoYXBlLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTjtcclxuLy8gICAgIHRoaXMuZHJhd1NoYXBlKHNoYXBlKTtcclxuXHJcbi8vICAgICByZXR1cm4gdGhpcztcclxuLy8gfTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdDaXJjbGUgPSBmdW5jdGlvbiAoeCwgeSwgZGlhbWV0ZXIpIHtcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LkNpcmNsZSh4LCB5LCBkaWFtZXRlcikpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLy8gTW92ZWQgdG8gZXh0cmEgRWxsaXBzZVxyXG4vLyBUaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3RWxsaXBzZSA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbi8vIHtcclxuLy8gICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LkVsbGlwc2UoeCwgeSwgd2lkdGgsIGhlaWdodCkpO1xyXG5cclxuLy8gICAgIHJldHVybiB0aGlzO1xyXG4vLyB9O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1BvbHlnb24gPSBmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgLy8gcHJldmVudHMgYW4gYXJndW1lbnQgYXNzaWdubWVudCBkZW9wdFxyXG4gICAgLy8gc2VlIHNlY3Rpb24gMy4xOiBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL3dpa2kvT3B0aW1pemF0aW9uLWtpbGxlcnMjMy1tYW5hZ2luZy1hcmd1bWVudHNcclxuICAgIHZhciBwb2ludHMgPSBwYXRoO1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShwb2ludHMpKSB7XHJcbiAgICAgICAgLy8gcHJldmVudHMgYW4gYXJndW1lbnQgbGVhayBkZW9wdFxyXG4gICAgICAgIC8vIHNlZSBzZWN0aW9uIDMuMjogaHR0cHM6Ly9naXRodWIuY29tL3BldGthYW50b25vdi9ibHVlYmlyZC93aWtpL09wdGltaXphdGlvbi1raWxsZXJzIzMtbWFuYWdpbmctYXJndW1lbnRzXHJcbiAgICAgICAgcG9pbnRzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBwb2ludHNbaV0gPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlBvbHlnb24ocG9pbnRzKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubGluZVdpZHRoID0gMDtcclxuICAgIHRoaXMuZmlsbGluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5ncmFwaGljc0RhdGEgPSBbXTtcclxuICAgIHRoaXMudXBkYXRlTG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZGVzdHJveUNoaWxkcmVuKSB7XHJcbiAgICBUaW55Lk9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZ2VuZXJhdGVUZXh0dXJlID0gZnVuY3Rpb24gKHJlc29sdXRpb24pIHtcclxuICAgIHJlc29sdXRpb24gPSByZXNvbHV0aW9uIHx8IDE7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XHJcblxyXG4gICAgdmFyIGNhbnZhc0J1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcihib3VuZHMud2lkdGggKiByZXNvbHV0aW9uLCBib3VuZHMuaGVpZ2h0ICogcmVzb2x1dGlvbik7XHJcblxyXG4gICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXNCdWZmZXIuY2FudmFzKTtcclxuICAgIHRleHR1cmUucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XHJcblxyXG4gICAgY2FudmFzQnVmZmVyLmNvbnRleHQuc2NhbGUocmVzb2x1dGlvbiwgcmVzb2x1dGlvbik7XHJcblxyXG4gICAgY2FudmFzQnVmZmVyLmNvbnRleHQudHJhbnNsYXRlKC1ib3VuZHMueCwgLWJvdW5kcy55KTtcclxuXHJcbiAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsIGNhbnZhc0J1ZmZlci5jb250ZXh0KTtcclxuXHJcbiAgICByZXR1cm4gdGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICBpZiAodGhpcy5pc01hc2sgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGhlIHRpbnQgaGFzIGNoYW5nZWQsIHNldCB0aGUgZ3JhcGhpY3Mgb2JqZWN0IHRvIGRpcnR5LlxyXG4gICAgaWYgKHRoaXMuX3ByZXZUaW50ICE9PSB0aGlzLnRpbnQpIHtcclxuICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcHJldlRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApIHtcclxuICAgICAgICBpZiAodGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gd2Ugd2lsbCBhbHNvIG5lZWQgdG8gdXBkYXRlIHRoZSB0ZXh0dXJlXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFscGhhID0gdGhpcy5hbHBoYTtcclxuICAgICAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcy5fY2FjaGVkU3ByaXRlLCByZW5kZXJTZXNzaW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuICAgICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYmxlbmRNb2RlICE9PSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUpIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICBjb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgdHJhbnNmb3JtLmEgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS5jICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgdHJhbnNmb3JtLmQgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0udHkgKiByZXNvbHV0aW9uXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgLy8gc2ltcGxlIHJlbmRlciBjaGlsZHJlbiFcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgaWYgKCF0aGlzLl9jdXJyZW50Qm91bmRzIHx8IHRoaXMuX2JvdW5kc0RpcnR5KSB7XHJcbiAgICAgICAgLy8gcmV0dXJuIGFuIGVtcHR5IG9iamVjdCBpZiB0aGUgaXRlbSBpcyBhIG1hc2shXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlbmRlcmFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fYm91bmRzRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVMb2NhbEJvdW5kcygpO1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9sb2NhbEJvdW5kcztcclxuXHJcbiAgICAgICAgdmFyIHcwID0gYm91bmRzLng7XHJcbiAgICAgICAgdmFyIHcxID0gYm91bmRzLndpZHRoICsgYm91bmRzLng7XHJcblxyXG4gICAgICAgIHZhciBoMCA9IGJvdW5kcy55O1xyXG4gICAgICAgIHZhciBoMSA9IGJvdW5kcy5oZWlnaHQgKyBib3VuZHMueTtcclxuXHJcbiAgICAgICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gbWF0cml4IHx8IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgICAgIHZhciBhID0gd29ybGRUcmFuc2Zvcm0uYTtcclxuICAgICAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICAgICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgICAgIHZhciBkID0gd29ybGRUcmFuc2Zvcm0uZDtcclxuICAgICAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgICAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICAgICAgdmFyIHgxID0gYSAqIHcxICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgICAgIHZhciB5MiA9IGQgKiBoMSArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHg0ID0gYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICAgICAgdmFyIHk0ID0gZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgICAgIHZhciBtYXhYID0geDE7XHJcbiAgICAgICAgdmFyIG1heFkgPSB5MTtcclxuXHJcbiAgICAgICAgdmFyIG1pblggPSB4MTtcclxuICAgICAgICB2YXIgbWluWSA9IHkxO1xyXG5cclxuICAgICAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHg0IDwgbWluWCA/IHg0IDogbWluWDtcclxuXHJcbiAgICAgICAgbWluWSA9IHkyIDwgbWluWSA/IHkyIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTMgPCBtaW5ZID8geTMgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHgzID4gbWF4WCA/IHgzIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDQgPiBtYXhYID8geDQgOiBtYXhYO1xyXG5cclxuICAgICAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHk0ID4gbWF4WSA/IHk0IDogbWF4WTtcclxuXHJcbiAgICAgICAgdGhpcy5fYm91bmRzLnggPSBtaW5YO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG5cclxuICAgICAgICB0aGlzLl9ib3VuZHMueSA9IG1pblk7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Qm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hcHBseUludmVyc2UocG9pbnQsIHRlbXBQb2ludCk7XHJcblxyXG4gICAgdmFyIGdyYXBoaWNzRGF0YSA9IHRoaXMuZ3JhcGhpY3NEYXRhO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JhcGhpY3NEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljc0RhdGFbaV07XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5maWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb25seSBkZWFsIHdpdGggZmlsbHMuLlxyXG4gICAgICAgIGlmIChkYXRhLnNoYXBlKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNoYXBlLmNvbnRhaW5zKHRlbXBQb2ludC54LCB0ZW1wUG9pbnQueSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnVwZGF0ZUxvY2FsQm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1pblggPSBJbmZpbml0eTtcclxuICAgIHZhciBtYXhYID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5ZID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICBpZiAodGhpcy5ncmFwaGljc0RhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHNoYXBlLCBwb2ludHMsIHgsIHksIHcsIGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdyYXBoaWNzRGF0YVtpXTtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBkYXRhLnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBsaW5lV2lkdGggPSBkYXRhLmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgc2hhcGUgPSBkYXRhLnNoYXBlO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgdHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJFQ1QgfHxcclxuICAgICAgICAgICAgICAgIHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDIHx8XHJcbiAgICAgICAgICAgICAgICB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTlxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHggPSBzaGFwZS54IC0gbGluZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIHkgPSBzaGFwZS55IC0gbGluZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIHcgPSBzaGFwZS53aWR0aCArIGxpbmVXaWR0aDtcclxuICAgICAgICAgICAgICAgIGggPSBzaGFwZS5oZWlnaHQgKyBsaW5lV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWCA9IHggPCBtaW5YID8geCA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICBtYXhYID0geCArIHcgPiBtYXhYID8geCArIHcgOiBtYXhYO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblkgPSB5IDwgbWluWSA/IHkgOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuQ0lSQykge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgICAgICB5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgICAgIHcgPSBzaGFwZS5yYWRpdXMgKyBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgaCA9IHNoYXBlLnJhZGl1cyArIGxpbmVXaWR0aCAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWCA9IHggLSB3IDwgbWluWCA/IHggLSB3IDogbWluWDtcclxuICAgICAgICAgICAgICAgIG1heFggPSB4ICsgdyA+IG1heFggPyB4ICsgdyA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWSA9IHkgLSBoIDwgbWluWSA/IHkgLSBoIDogbWluWTtcclxuICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgaCA+IG1heFkgPyB5ICsgaCA6IG1heFk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkVMSVApIHtcclxuICAgICAgICAgICAgICAgIHggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICAgICAgeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgICAgICB3ID0gc2hhcGUud2lkdGggKyBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgaCA9IHNoYXBlLmhlaWdodCArIGxpbmVXaWR0aCAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWCA9IHggLSB3IDwgbWluWCA/IHggLSB3IDogbWluWDtcclxuICAgICAgICAgICAgICAgIG1heFggPSB4ICsgdyA+IG1heFggPyB4ICsgdyA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWSA9IHkgLSBoIDwgbWluWSA/IHkgLSBoIDogbWluWTtcclxuICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgaCA+IG1heFkgPyB5ICsgaCA6IG1heFk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQT0xZIC0gYXNzdW1lcyBwb2ludHMgYXJlIHNlcXVlbnRpYWwsIG5vdCBQb2ludCBvYmplY3RzXHJcbiAgICAgICAgICAgICAgICBwb2ludHMgPSBzaGFwZS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwb2ludHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRzW2pdIGluc3RhbmNlb2YgVGlueS5Qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcG9pbnRzW2pdLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwb2ludHNbal0ueTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcG9pbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9pbnRzW2ogKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgcG9pbnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHggLSBsaW5lV2lkdGggPCBtaW5YID8geCAtIGxpbmVXaWR0aCA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHggKyBsaW5lV2lkdGggPiBtYXhYID8geCArIGxpbmVXaWR0aCA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pblkgPSB5IC0gbGluZVdpZHRoIDwgbWluWSA/IHkgLSBsaW5lV2lkdGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgbGluZVdpZHRoID4gbWF4WSA/IHkgKyBsaW5lV2lkdGggOiBtYXhZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtaW5YID0gMDtcclxuICAgICAgICBtYXhYID0gMDtcclxuICAgICAgICBtaW5ZID0gMDtcclxuICAgICAgICBtYXhZID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGFkZGluZyA9IHRoaXMuYm91bmRzUGFkZGluZztcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy54ID0gbWluWCAtIHBhZGRpbmc7XHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YICsgcGFkZGluZyAqIDI7XHJcblxyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMueSA9IG1pblkgLSBwYWRkaW5nO1xyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblkgKyBwYWRkaW5nICogMjtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpIHtcclxuICAgICAgICB2YXIgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXNCdWZmZXIuY2FudmFzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIgPSBjYW52YXNCdWZmZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIucmVzaXplKGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbGV2ZXJhZ2UgdGhlIGFuY2hvciB0byBhY2NvdW50IGZvciB0aGUgb2Zmc2V0IG9mIHRoZSBlbGVtZW50XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnggPSAtKGJvdW5kcy54IC8gYm91bmRzLndpZHRoKTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueSA9IC0oYm91bmRzLnkgLyBib3VuZHMuaGVpZ2h0KTtcclxuXHJcbiAgICAvLyB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQuc2F2ZSgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5jb250ZXh0LnRyYW5zbGF0ZSgtYm91bmRzLngsIC1ib3VuZHMueSk7XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIHdlIHNldCB0aGUgYWxwaGEgb2YgdGhlIGdyYXBoaWNzIHRvIDEgZm9yIHRoZSByZW5kZXIuLlxyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuXHJcbiAgICAvLyBub3cgcmVuZGVyIHRoZSBncmFwaGljLi5cclxuICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcywgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5jb250ZXh0KTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbHBoYSA9IHRoaXMuYWxwaGE7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB0ZXh0dXJlIHNpemUgYmFzZWQgb24gY2FudmFzIHNpemVcclxuICpcclxuICogQG1ldGhvZCB1cGRhdGVDYWNoZWRTcHJpdGVUZXh0dXJlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS51cGRhdGVDYWNoZWRTcHJpdGVUZXh0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhY2hlZFNwcml0ZSA9IHRoaXMuX2NhY2hlZFNwcml0ZTtcclxuICAgIHZhciB0ZXh0dXJlID0gY2FjaGVkU3ByaXRlLnRleHR1cmU7XHJcbiAgICB2YXIgY2FudmFzID0gY2FjaGVkU3ByaXRlLmJ1ZmZlci5jYW52YXM7XHJcblxyXG4gICAgdGV4dHVyZS53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRleHR1cmUuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHRleHR1cmUuY3JvcC53aWR0aCA9IHRleHR1cmUuZnJhbWUud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICB0ZXh0dXJlLmNyb3AuaGVpZ2h0ID0gdGV4dHVyZS5mcmFtZS5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgIGNhY2hlZFNwcml0ZS5fd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBjYWNoZWRTcHJpdGUuX2hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVzdHJveXMgYSBwcmV2aW91cyBjYWNoZWQgc3ByaXRlLlxyXG4gKlxyXG4gKiBAbWV0aG9kIGRlc3Ryb3lDYWNoZWRTcHJpdGVcclxuICovXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5kZXN0cm95KHRydWUpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdTaGFwZSA9IGZ1bmN0aW9uIChzaGFwZSkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpIHtcclxuICAgICAgICAvLyBjaGVjayBjdXJyZW50IHBhdGghXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA8PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY3NEYXRhLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRQYXRoID0gbnVsbDtcclxuXHJcbiAgICAvLyAgSGFuZGxlIG1peGVkLXR5cGUgcG9seWdvbnNcclxuICAgIGlmIChzaGFwZSBpbnN0YW5jZW9mIFRpbnkuUG9seWdvbikge1xyXG4gICAgICAgIHNoYXBlLmZsYXR0ZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGF0YSA9IG5ldyBUaW55LkdyYXBoaWNzRGF0YShcclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCxcclxuICAgICAgICB0aGlzLmxpbmVDb2xvcixcclxuICAgICAgICB0aGlzLmxpbmVBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGxDb2xvcixcclxuICAgICAgICB0aGlzLmZpbGxBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGxpbmcsXHJcbiAgICAgICAgc2hhcGVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5ncmFwaGljc0RhdGEucHVzaChkYXRhKTtcclxuXHJcbiAgICBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUE9MWSkge1xyXG4gICAgICAgIGRhdGEuc2hhcGUuY2xvc2VkID0gdGhpcy5maWxsaW5nO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhdGggPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuR3JhcGhpY3MucHJvdG90eXBlLCBcImNhY2hlQXNCaXRtYXBcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlQXNCaXRtYXA7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIiwiVGlueS5PYmplY3QyRCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgdGhpcy5fYm91bmRzID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXNrID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuT2JqZWN0MkQ7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsICdpbnB1dEVuYWJsZWQnLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICByZXR1cm4gKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5lbmFibGVkKVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbi8vICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0ID09PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLmlucHV0ID0ge2VuYWJsZWQ6IHRydWUsIHBhcmVudDogdGhpc31cclxuLy8gICAgICAgICAgICAgICAgIFRpbnkuRXZlbnRUYXJnZXQubWl4aW4odGhpcy5pbnB1dClcclxuLy8gICAgICAgICAgICAgfSBlbHNlXHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmVuYWJsZWQgPSB0cnVlXHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5pbnB1dCAhPT0gbnVsbCAmJiAodGhpcy5pbnB1dC5lbmFibGVkID0gZmFsc2UpXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGg7XHJcblxyXG4gICAgICAgIGlmICh3aWR0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueSAqIHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChoZWlnaHQgIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyBoZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS55ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgXCJtYXNrXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNrO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKSB0aGlzLl9tYXNrLmlzTWFzayA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9tYXNrID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKSB0aGlzLl9tYXNrLmlzTWFzayA9IHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuXHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuX2JvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX21hc2sgPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLmlucHV0KSB0aGlzLmlucHV0LnN5c3RlbS5yZW1vdmUodGhpcyk7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgIHJldHVybiB0aGlzLmFkZENoaWxkQXQoY2hpbGQsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoKTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChjaGlsZC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50LnJlbW92ZShjaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5nYW1lKSBjaGlsZC5nYW1lID0gdGhpcy5nYW1lO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgY2hpbGQgKyBcImFkZENoaWxkQXQ6IFRoZSBpbmRleCBcIiArIGluZGV4ICsgXCIgc3VwcGxpZWQgaXMgb3V0IG9mIGJvdW5kcyBcIiArIHRoaXMuY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnN3YXBDaGlsZHJlbiA9IGZ1bmN0aW9uIChjaGlsZCwgY2hpbGQyKSB7XHJcbiAgICBpZiAoY2hpbGQgPT09IGNoaWxkMikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaW5kZXgxID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcclxuICAgIHZhciBpbmRleDIgPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQyKTtcclxuXHJcbiAgICBpZiAoaW5kZXgxIDwgMCB8fCBpbmRleDIgPCAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3dhcENoaWxkcmVuOiBCb3RoIHRoZSBzdXBwbGllZCBPYmplY3RzIG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuW2luZGV4MV0gPSBjaGlsZDI7XHJcbiAgICB0aGlzLmNoaWxkcmVuW2luZGV4Ml0gPSBjaGlsZDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldENoaWxkSW5kZXggPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN1cHBsaWVkIE9iamVjdCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlclwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbmRleDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnNldENoaWxkSW5kZXggPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN1cHBsaWVkIGluZGV4IGlzIG91dCBvZiBib3VuZHNcIik7XHJcbiAgICB9XHJcbiAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGN1cnJlbnRJbmRleCwgMSk7IC8vcmVtb3ZlIGZyb20gb2xkIHBvc2l0aW9uXHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpOyAvL2FkZCBhdCBuZXcgcG9zaXRpb25cclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hpbGRBdDogU3VwcGxpZWQgaW5kZXggXCIgK1xyXG4gICAgICAgICAgICAgICAgaW5kZXggK1xyXG4gICAgICAgICAgICAgICAgXCIgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkIGxpc3QsIG9yIHRoZSBzdXBwbGllZCBPYmplY3QgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXJcIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltpbmRleF07XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlQ2hpbGRBdChpbmRleCk7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICB2YXIgY2hpbGQgPSB0aGlzLmdldENoaWxkQXQoaW5kZXgpO1xyXG4gICAgY2hpbGQucGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgcmV0dXJuIGNoaWxkO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRyZW4gPSBmdW5jdGlvbiAoYmVnaW5JbmRleCwgZW5kSW5kZXgpIHtcclxuICAgIHZhciBiZWdpbiA9IGJlZ2luSW5kZXggfHwgMDtcclxuICAgIHZhciBlbmQgPSB0eXBlb2YgZW5kSW5kZXggPT09IFwibnVtYmVyXCIgPyBlbmRJbmRleCA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgdmFyIHJhbmdlID0gZW5kIC0gYmVnaW47XHJcblxyXG4gICAgaWYgKHJhbmdlID4gMCAmJiByYW5nZSA8PSBlbmQpIHtcclxuICAgICAgICB2YXIgcmVtb3ZlZCA9IHRoaXMuY2hpbGRyZW4uc3BsaWNlKGJlZ2luLCByYW5nZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdmVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHJlbW92ZWRbaV07XHJcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgICB9IGVsc2UgaWYgKHJhbmdlID09PSAwICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZW1vdmVDaGlsZHJlbjogUmFuZ2UgRXJyb3IsIG51bWVyaWMgdmFsdWVzIGFyZSBvdXRzaWRlIHRoZSBhY2NlcHRhYmxlIHJhbmdlXCIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCkgcmV0dXJuO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gcGVyZm9ybWFuY2UgaW5jcmVhc2UgdG8gYXZvaWQgdXNpbmcgY2FsbC4uICgxMHggZmFzdGVyKVxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5kaXNwbGF5T2JqZWN0Q29udGFpbmVyVXBkYXRlVHJhbnNmb3JtID0gVGlueS5PYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuICAgIGlmICh0aGlzLl9jYWNoZWRTcHJpdGUpIHJldHVybiB0aGlzLl9jYWNoZWRTcHJpdGUuZ2V0Qm91bmRzKCk7XHJcblxyXG4gICAgLy8gVE9ETyB0aGUgYm91bmRzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGN1bGF0ZWQgdGhpcyByZW5kZXIgc2Vzc2lvbiBzbyByZXR1cm4gd2hhdCB3ZSBoYXZlXHJcblxyXG4gICAgdmFyIG1pblggPSBJbmZpbml0eTtcclxuICAgIHZhciBtaW5ZID0gSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgY2hpbGRCb3VuZHM7XHJcbiAgICB2YXIgY2hpbGRNYXhYO1xyXG4gICAgdmFyIGNoaWxkTWF4WTtcclxuXHJcbiAgICB2YXIgY2hpbGRWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XHJcblxyXG4gICAgICAgIGlmICghY2hpbGQudmlzaWJsZSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGNoaWxkVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNoaWxkQm91bmRzID0gdGhpcy5jaGlsZHJlbltpXS5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICAgICAgbWluWCA9IG1pblggPCBjaGlsZEJvdW5kcy54ID8gbWluWCA6IGNoaWxkQm91bmRzLng7XHJcbiAgICAgICAgbWluWSA9IG1pblkgPCBjaGlsZEJvdW5kcy55ID8gbWluWSA6IGNoaWxkQm91bmRzLnk7XHJcblxyXG4gICAgICAgIGNoaWxkTWF4WCA9IGNoaWxkQm91bmRzLndpZHRoICsgY2hpbGRCb3VuZHMueDtcclxuICAgICAgICBjaGlsZE1heFkgPSBjaGlsZEJvdW5kcy5oZWlnaHQgKyBjaGlsZEJvdW5kcy55O1xyXG5cclxuICAgICAgICBtYXhYID0gbWF4WCA+IGNoaWxkTWF4WCA/IG1heFggOiBjaGlsZE1heFg7XHJcbiAgICAgICAgbWF4WSA9IG1heFkgPiBjaGlsZE1heFkgPyBtYXhZIDogY2hpbGRNYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2hpbGRWaXNpYmxlKSByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIFRPRE86IHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICAvL3RoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1hdHJpeENhY2hlID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gVGlueS5pZGVudGl0eU1hdHJpeDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbWF0cml4Q2FjaGU7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5TY2VuZSA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG59O1xyXG5cclxuVGlueS5TY2VuZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuT2JqZWN0MkQucHJvdG90eXBlKTtcclxuVGlueS5TY2VuZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNjZW5lO1xyXG5cclxuVGlueS5TY2VuZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlNwcml0ZSA9IGZ1bmN0aW9uICh0ZXh0dXJlLCBrZXkpIHtcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvciA9IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdGhpcy5zZXRUZXh0dXJlKHRleHR1cmUsIGtleSwgZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuX3dpZHRoID0gMDtcclxuXHJcbiAgICB0aGlzLl9oZWlnaHQgPSAwO1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLnRpbnQgPSBcIiNGRkZGRkZcIjtcclxuXHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlLmhhc0xvYWRlZCkge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNwcml0ZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsIFwiZnJhbWVOYW1lXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHR1cmUuZnJhbWUubmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLmZyYW1lLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuQ2FjaGUudGV4dHVyZVt0aGlzLnRleHR1cmUua2V5ICsgXCIuXCIgKyB2YWx1ZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCBcImZyYW1lXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLmxhc3RGcmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZnJhbWUgPiB0aGlzLnRleHR1cmUubGFzdEZyYW1lKSB0aGlzLl9mcmFtZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dHVyZShUaW55LkNhY2hlLnRleHR1cmVbdGhpcy50ZXh0dXJlLmtleSArIFwiLlwiICsgdGhpcy5fZnJhbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueSAqIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKHRleHR1cmUsIGtleSwgdXBkYXRlRGltZW5zaW9uKSB7XHJcbiAgICBpZiAodHlwZW9mIHRleHR1cmUgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBpbWFnZVBhdGggPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSBpbWFnZVBhdGggKyBcIi5cIiArIGtleTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbaW1hZ2VQYXRoXTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlUGF0aCk7XHJcbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBFcnJvcignQ2FjaGUgRXJyb3I6IGltYWdlICcgKyBpbWFnZVBhdGggKyAnIGRvZXNgdCBmb3VuZCBpbiBjYWNoZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlID09PSB0ZXh0dXJlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgIHRoaXMuY2FjaGVkVGludCA9IFwiI0ZGRkZGRlwiO1xyXG5cclxuICAgIGlmICh1cGRhdGVEaW1lbnNpb24gPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLm9uVGV4dHVyZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLm9uVGV4dHVyZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIHNvIGlmIF93aWR0aCBpcyAwIHRoZW4gd2lkdGggd2FzIG5vdCBzZXQuLlxyXG4gICAgaWYgKHRoaXMuX3dpZHRoKSB0aGlzLnNjYWxlLnggPSB0aGlzLl93aWR0aCAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIGlmICh0aGlzLl9oZWlnaHQpIHRoaXMuc2NhbGUueSA9IHRoaXMuX2hlaWdodCAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uICh0aW1lciwgZGVsYXkpIHtcclxuICAgIGlmICh0aGlzLnRleHR1cmUubGFzdEZyYW1lICYmIHRoaXMudGV4dHVyZS5mcmFtZS5pbmRleCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IHx8IHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDA7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aW1lci5sb29wKFxyXG4gICAgICAgICAgICAgICAgZGVsYXksXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmRlbGF5ID0gZGVsYXkgfHwgdGhpcy50ZXh0dXJlLmZyYW1lLmR1cmF0aW9uIHx8IDEwMDtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IGRlbGF5O1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAobWF0cml4KSB7XHJcbiAgICB2YXIgd2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggLyB0aGlzLnRleHR1cmUucmVzb2x1dGlvbjtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0IC8gdGhpcy50ZXh0dXJlLnJlc29sdXRpb247XHJcblxyXG4gICAgdmFyIHcwID0gd2lkdGggKiAoMSAtIHRoaXMuYW5jaG9yLngpO1xyXG4gICAgdmFyIHcxID0gd2lkdGggKiAtdGhpcy5hbmNob3IueDtcclxuXHJcbiAgICB2YXIgaDAgPSBoZWlnaHQgKiAoMSAtIHRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gbWF0cml4IHx8IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIGlmIChiID09PSAwICYmIGMgPT09IDApIHtcclxuICAgICAgICAvLyAvLyBzY2FsZSBtYXkgYmUgbmVnYXRpdmUhXHJcbiAgICAgICAgLy8gaWYgKGEgPCAwKSBhICo9IC0xO1xyXG4gICAgICAgIC8vIGlmIChkIDwgMCkgZCAqPSAtMTtcclxuXHJcbiAgICAgICAgLy8gLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBubyByb3RhdGlvbiBnb2luZyBvbiByaWdodD8gUklHSFQ/XHJcbiAgICAgICAgLy8gLy8gaWYgdGhhdHMgdGhlIGNhc2UgdGhlbiB3ZSBjYW4gYXZvaWQgY2hlY2tpbmcgdGhlIGJvdW5kIHZhbHVlcyEgeWF5XHJcbiAgICAgICAgLy8gbWluWCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgIC8vIG1heFggPSBhICogdzAgKyB0eDtcclxuICAgICAgICAvLyBtaW5ZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgLy8gbWF4WSA9IGQgKiBoMCArIHR5O1xyXG5cclxuICAgICAgICBpZiAoYSA8IDApIHtcclxuICAgICAgICAgICAgbWluWCA9IGEgKiB3MCArIHR4O1xyXG4gICAgICAgICAgICBtYXhYID0gYSAqIHcxICsgdHg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWluWCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgICAgICBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZCA8IDApIHtcclxuICAgICAgICAgICAgbWluWSA9IGQgKiBoMCArIHR5O1xyXG4gICAgICAgICAgICBtYXhZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgICAgICBtYXhZID0gZCAqIGgwICsgdHk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDQgPSBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTQgPSBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgbWluWCA9IHgxIDwgbWluWCA/IHgxIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHg0IDwgbWluWCA/IHg0IDogbWluWDtcclxuXHJcbiAgICAgICAgbWluWSA9IHkxIDwgbWluWSA/IHkxIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICAgICAgbWF4WCA9IHgxID4gbWF4WCA/IHgxIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDIgPiBtYXhYID8geDIgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICAgICAgbWF4WSA9IHkxID4gbWF4WSA/IHkxIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHk0ID4gbWF4WSA/IHk0IDogbWF4WTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG5cclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYWdhaW4gaW4gdGhlIHJlbmRlciBjeWNsZSB3ZSBkbyBub3QgaGF2ZSB0byByZWNhbGN1bGF0ZVxyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IGJvdW5kcztcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICAvLyBJZiB0aGUgc3ByaXRlIGlzIG5vdCB2aXNpYmxlIG9yIHRoZSBhbHBoYSBpcyAwIHRoZW4gbm8gbmVlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50XHJcbiAgICBpZiAoXHJcbiAgICAgICAgdGhpcy52aXNpYmxlID09PSBmYWxzZSB8fFxyXG4gICAgICAgIHRoaXMuYWxwaGEgPT09IDAgfHxcclxuICAgICAgICB0aGlzLnJlbmRlcmFibGUgPT09IGZhbHNlIHx8XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPD0gMCB8fFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCA8PSAwXHJcbiAgICApXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIElnbm9yZSBudWxsIHNvdXJjZXNcclxuICAgIGlmICh0aGlzLnRleHR1cmUudmFsaWQpIHtcclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uIC8gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgICAgIC8vICBJZiB0aGUgdGV4dHVyZSBpcyB0cmltbWVkIHdlIG9mZnNldCBieSB0aGUgdHJpbSB4L3ksIG90aGVyd2lzZSB3ZSB1c2UgdGhlIGZyYW1lIGRpbWVuc2lvbnNcclxuICAgICAgICB2YXIgZHggPSB0aGlzLnRleHR1cmUudHJpbVxyXG4gICAgICAgICAgICA/IHRoaXMudGV4dHVyZS50cmltLnggLSB0aGlzLmFuY2hvci54ICogdGhpcy50ZXh0dXJlLnRyaW0ud2lkdGhcclxuICAgICAgICAgICAgOiB0aGlzLmFuY2hvci54ICogLXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB2YXIgZHkgPSB0aGlzLnRleHR1cmUudHJpbVxyXG4gICAgICAgICAgICA/IHRoaXMudGV4dHVyZS50cmltLnkgLSB0aGlzLmFuY2hvci55ICogdGhpcy50ZXh0dXJlLnRyaW0uaGVpZ2h0XHJcbiAgICAgICAgICAgIDogdGhpcy5hbmNob3IueSAqIC10aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAvLyAgQWxsb3cgZm9yIHBpeGVsIHJvdW5kaW5nXHJcbiAgICAgICAgaWYgKHJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMpIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgICh0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKSB8IDAsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eSAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGR4ID0gZHggfCAwO1xyXG4gICAgICAgICAgICBkeSA9IGR5IHwgMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5iLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbnQgIT09IFwiI0ZGRkZGRlwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlZFRpbnQgIT09IHRoaXMudGludCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRUaW50ID0gdGhpcy50aW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW50ZWRUZXh0dXJlID0gVGlueS5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSh0aGlzLCB0aGlzLnRpbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW50ZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIGR4IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCAvIHJlc29sdXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLngsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBkeCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICBkeSAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgLyByZXNvbHV0aW9uXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE9WRVJXUklURVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcbiIsIlRpbnkuVGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBzdHlsZSkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gMTtcclxuXHJcbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKHRoaXMuY2FudmFzKSk7XHJcblxyXG4gICAgdGhpcy5zZXRUZXh0KHRleHQpO1xyXG4gICAgdGhpcy5zZXRTdHlsZShzdHlsZSk7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlNwcml0ZS5wcm90b3R5cGUpO1xyXG5UaW55LlRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UZXh0O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGV4dC5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRleHQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueSAqIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChzdHlsZSkge1xyXG4gICAgc3R5bGUgPSBzdHlsZSB8fCB7fTtcclxuICAgIHN0eWxlLmZvbnQgPSBzdHlsZS5mb250IHx8IFwiYm9sZCAyMHB0IEFyaWFsXCI7XHJcbiAgICBzdHlsZS5maWxsID0gc3R5bGUuZmlsbCB8fCBcImJsYWNrXCI7XHJcbiAgICBzdHlsZS5hbGlnbiA9IHN0eWxlLmFsaWduIHx8IFwibGVmdFwiO1xyXG4gICAgc3R5bGUuc3Ryb2tlID0gc3R5bGUuc3Ryb2tlIHx8IFwiYmxhY2tcIjtcclxuICAgIHN0eWxlLnN0cm9rZVRoaWNrbmVzcyA9IHN0eWxlLnN0cm9rZVRoaWNrbmVzcyB8fCAwO1xyXG4gICAgc3R5bGUud29yZFdyYXAgPSBzdHlsZS53b3JkV3JhcCB8fCBmYWxzZTtcclxuICAgIHN0eWxlLmxpbmVTcGFjaW5nID0gc3R5bGUubGluZVNwYWNpbmcgfHwgMDtcclxuICAgIHN0eWxlLndvcmRXcmFwV2lkdGggPSBzdHlsZS53b3JkV3JhcFdpZHRoICE9PSB1bmRlZmluZWQgPyBzdHlsZS53b3JkV3JhcFdpZHRoIDogMTAwO1xyXG5cclxuICAgIHN0eWxlLmRyb3BTaGFkb3cgPSBzdHlsZS5kcm9wU2hhZG93IHx8IGZhbHNlO1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0FuZ2xlID0gc3R5bGUuZHJvcFNoYWRvd0FuZ2xlICE9PSB1bmRlZmluZWQgPyBzdHlsZS5kcm9wU2hhZG93QW5nbGUgOiBNYXRoLlBJIC8gNjtcclxuICAgIHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSA9IHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSAhPT0gdW5kZWZpbmVkID8gc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlIDogNDtcclxuICAgIHN0eWxlLmRyb3BTaGFkb3dDb2xvciA9IHN0eWxlLmRyb3BTaGFkb3dDb2xvciB8fCBcImJsYWNrXCI7XHJcblxyXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xyXG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dC50b1N0cmluZygpIHx8IFwiIFwiO1xyXG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnVwZGF0ZVRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuc3R5bGUuZm9udDtcclxuXHJcbiAgICB2YXIgb3V0cHV0VGV4dCA9IHRoaXMudGV4dDtcclxuXHJcbiAgICAvLyB3b3JkIHdyYXBcclxuICAgIC8vIHByZXNlcnZlIG9yaWdpbmFsIHRleHRcclxuICAgIGlmICh0aGlzLnN0eWxlLndvcmRXcmFwKSBvdXRwdXRUZXh0ID0gdGhpcy53b3JkV3JhcCh0aGlzLnRleHQpO1xyXG5cclxuICAgIC8vc3BsaXQgdGV4dCBpbnRvIGxpbmVzXHJcbiAgICB2YXIgbGluZXMgPSBvdXRwdXRUZXh0LnNwbGl0KC8oPzpcXHJcXG58XFxyfFxcbikvKTtcclxuXHJcbiAgICAvL2NhbGN1bGF0ZSB0ZXh0IHdpZHRoXHJcbiAgICB2YXIgbGluZVdpZHRocyA9IFtdO1xyXG4gICAgdmFyIG1heExpbmVXaWR0aCA9IDA7XHJcbiAgICB2YXIgZm9udFByb3BlcnRpZXMgPSB0aGlzLmRldGVybWluZUZvbnRQcm9wZXJ0aWVzKHRoaXMuc3R5bGUuZm9udCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGxpbmVXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dChsaW5lc1tpXSkud2lkdGg7XHJcbiAgICAgICAgbGluZVdpZHRoc1tpXSA9IGxpbmVXaWR0aDtcclxuICAgICAgICBtYXhMaW5lV2lkdGggPSBNYXRoLm1heChtYXhMaW5lV2lkdGgsIGxpbmVXaWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHdpZHRoID0gbWF4TGluZVdpZHRoICsgdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3M7XHJcbiAgICBpZiAodGhpcy5zdHlsZS5kcm9wU2hhZG93KSB3aWR0aCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9ICh3aWR0aCArIHRoaXMuY29udGV4dC5saW5lV2lkdGgpICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIC8vY2FsY3VsYXRlIHRleHQgaGVpZ2h0XHJcbiAgICB2YXIgbGluZUhlaWdodCA9IGZvbnRQcm9wZXJ0aWVzLmZvbnRTaXplICsgdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgKyB0aGlzLnN0eWxlLmxpbmVTcGFjaW5nO1xyXG5cclxuICAgIHZhciBoZWlnaHQgPSBsaW5lSGVpZ2h0ICogbGluZXMubGVuZ3RoO1xyXG4gICAgaWYgKHRoaXMuc3R5bGUuZHJvcFNoYWRvdykgaGVpZ2h0ICs9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IChoZWlnaHQgLSB0aGlzLnN0eWxlLmxpbmVTcGFjaW5nKSAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuc2NhbGUodGhpcy5yZXNvbHV0aW9uLCB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmIChuYXZpZ2F0b3IuaXNDb2Nvb25KUykgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBkZWJ1Z2dpbmcuLlxyXG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFN0eWxlID1cIiNGRjAwMDBcIlxyXG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuc3R5bGUuZm9udDtcclxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuc3R5bGUuc3Ryb2tlO1xyXG4gICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzO1xyXG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xyXG4gICAgdGhpcy5jb250ZXh0Lm1pdGVyTGltaXQgPSAyO1xyXG5cclxuICAgIC8vdGhpcy5jb250ZXh0LmxpbmVKb2luID0gJ3JvdW5kJztcclxuXHJcbiAgICB2YXIgbGluZVBvc2l0aW9uWDtcclxuICAgIHZhciBsaW5lUG9zaXRpb25ZO1xyXG5cclxuICAgIGlmICh0aGlzLnN0eWxlLmRyb3BTaGFkb3cpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5zdHlsZS5kcm9wU2hhZG93Q29sb3I7XHJcblxyXG4gICAgICAgIHZhciB4U2hhZG93T2Zmc2V0ID0gTWF0aC5zaW4odGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcbiAgICAgICAgdmFyIHlTaGFkb3dPZmZzZXQgPSBNYXRoLmNvcyh0aGlzLnN0eWxlLmRyb3BTaGFkb3dBbmdsZSkgKiB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDI7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblkgPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDIgKyBpICogbGluZUhlaWdodCArIGZvbnRQcm9wZXJ0aWVzLmFzY2VudDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlLmFsaWduID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gbWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0eWxlLmFsaWduID09PSBcImNlbnRlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlLmZpbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCArIHhTaGFkb3dPZmZzZXQsIGxpbmVQb3NpdGlvblkgKyB5U2hhZG93T2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gIGlmKGRyb3BTaGFkb3cpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vc2V0IGNhbnZhcyB0ZXh0IHN0eWxlc1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuc3R5bGUuZmlsbDtcclxuXHJcbiAgICAvL2RyYXcgbGluZXMgbGluZSBieSBsaW5lXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsaW5lUG9zaXRpb25YID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyO1xyXG4gICAgICAgIGxpbmVQb3NpdGlvblkgPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDIgKyBpICogbGluZUhlaWdodCArIGZvbnRQcm9wZXJ0aWVzLmFzY2VudDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGUuYWxpZ24gPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0eWxlLmFsaWduID09PSBcImNlbnRlclwiKSB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gKG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV0pIC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlLnN0cm9rZSAmJiB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCwgbGluZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdHlsZS5maWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCwgbGluZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgaWYoZHJvcFNoYWRvdylcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVRleHR1cmUoKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUudXBkYXRlVGV4dHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudGV4dHVyZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy50ZXh0dXJlLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxuICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoID0gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuX3dpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICBpZiAodGhpcy5kaXJ0eSB8fCB0aGlzLnJlc29sdXRpb24gIT09IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikge1xyXG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLCByZW5kZXJTZXNzaW9uKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZGV0ZXJtaW5lRm9udFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoZm9udFN0eWxlKSB7XHJcbiAgICB2YXIgcHJvcGVydGllcyA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhY2hlW2ZvbnRTdHlsZV07XHJcblxyXG4gICAgaWYgKCFwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgcHJvcGVydGllcyA9IHt9O1xyXG5cclxuICAgICAgICB2YXIgY2FudmFzID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzO1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ29udGV4dDtcclxuXHJcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0eWxlO1xyXG5cclxuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmNlaWwoY29udGV4dC5tZWFzdXJlVGV4dChcInxNw4lxXCIpLndpZHRoKTtcclxuICAgICAgICB2YXIgYmFzZWxpbmUgPSBNYXRoLmNlaWwoY29udGV4dC5tZWFzdXJlVGV4dChcInxNw4lxXCIpLndpZHRoKTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gMiAqIGJhc2VsaW5lO1xyXG5cclxuICAgICAgICBiYXNlbGluZSA9IChiYXNlbGluZSAqIDEuNCkgfCAwO1xyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2YwMFwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnRTdHlsZTtcclxuXHJcbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXCJ8TcOJcVwiLCAwLCBiYXNlbGluZSk7XHJcblxyXG4gICAgICAgIHZhciBpbWFnZWRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xyXG4gICAgICAgIHZhciBwaXhlbHMgPSBpbWFnZWRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHZhciBsaW5lID0gd2lkdGggKiA0O1xyXG5cclxuICAgICAgICB2YXIgaSwgajtcclxuXHJcbiAgICAgICAgdmFyIGlkeCA9IDA7XHJcbiAgICAgICAgdmFyIHN0b3AgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gYXNjZW50LiBzY2FuIGZyb20gdG9wIHRvIGJvdHRvbSB1bnRpbCB3ZSBmaW5kIGEgbm9uIHJlZCBwaXhlbFxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBiYXNlbGluZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsaW5lOyBqICs9IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbWFnZWRhdGFbaWR4ICsgal0gIT09IDI1NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc3RvcCkge1xyXG4gICAgICAgICAgICAgICAgaWR4ICs9IGxpbmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvcGVydGllcy5hc2NlbnQgPSBiYXNlbGluZSAtIGk7XHJcblxyXG4gICAgICAgIGlkeCA9IHBpeGVscyAtIGxpbmU7XHJcbiAgICAgICAgc3RvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBkZXNjZW50LiBzY2FuIGZyb20gYm90dG9tIHRvIHRvcCB1bnRpbCB3ZSBmaW5kIGEgbm9uIHJlZCBwaXhlbFxyXG4gICAgICAgIGZvciAoaSA9IGhlaWdodDsgaSA+IGJhc2VsaW5lOyBpLS0pIHtcclxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxpbmU7IGogKz0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlZGF0YVtpZHggKyBqXSAhPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdG9wKSB7XHJcbiAgICAgICAgICAgICAgICBpZHggLT0gbGluZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmRlc2NlbnQgPSBpIC0gYmFzZWxpbmU7XHJcbiAgICAgICAgLy9UT0RPIG1pZ2h0IG5lZWQgYSB0d2Vhay4ga2luZCBvZiBhIHRlbXAgZml4IVxyXG4gICAgICAgIHByb3BlcnRpZXMuZGVzY2VudCArPSA2O1xyXG4gICAgICAgIHByb3BlcnRpZXMuZm9udFNpemUgPSBwcm9wZXJ0aWVzLmFzY2VudCArIHByb3BlcnRpZXMuZGVzY2VudDtcclxuXHJcbiAgICAgICAgVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGVbZm9udFN0eWxlXSA9IHByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLndvcmRXcmFwID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIC8vIEdyZWVkeSB3cmFwcGluZyBhbGdvcml0aG0gdGhhdCB3aWxsIHdyYXAgd29yZHMgYXMgdGhlIGxpbmUgZ3Jvd3MgbG9uZ2VyXHJcbiAgICAvLyB0aGFuIGl0cyBob3Jpem9udGFsIGJvdW5kcy5cclxuICAgIHZhciByZXN1bHQgPSBcIlwiO1xyXG4gICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdChcIlxcblwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgc3BhY2VMZWZ0ID0gdGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoO1xyXG4gICAgICAgIHZhciB3b3JkcyA9IGxpbmVzW2ldLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHdvcmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciB3b3JkV2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQod29yZHNbal0pLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgd29yZFdpZHRoV2l0aFNwYWNlID0gd29yZFdpZHRoICsgdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KFwiIFwiKS53aWR0aDtcclxuICAgICAgICAgICAgaWYgKGogPT09IDAgfHwgd29yZFdpZHRoV2l0aFNwYWNlID4gc3BhY2VMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHByaW50aW5nIHRoZSBuZXdsaW5lIGlmIGl0J3MgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGxpbmUgdGhhdCBpc1xyXG4gICAgICAgICAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRoZSB3b3JkIHdyYXAgd2lkdGguXHJcbiAgICAgICAgICAgICAgICBpZiAoaiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB3b3Jkc1tqXTtcclxuICAgICAgICAgICAgICAgIHNwYWNlTGVmdCA9IHRoaXMuc3R5bGUud29yZFdyYXBXaWR0aCAtIHdvcmRXaWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlTGVmdCAtPSB3b3JkV2lkdGhXaXRoU3BhY2U7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIgXCIgKyB3b3Jkc1tqXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGkgPCBsaW5lcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICAgIGlmICh0aGlzLmRpcnR5KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBUaW55LlNwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzLmNhbGwodGhpcywgbWF0cml4KTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSB0byByZXNldCB0aGUgdGhlIGNvbnRleHQgYW5kIGNhbnZhcy4uIGRvbnQgd2FudCB0aGlzIGhhbmdpbmcgYXJvdW5kIGluIG1lbW9yeSFcclxuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlLmRlc3Ryb3koKTtcclxuXHJcbiAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGUgPSB7fTtcclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ29udGV4dCA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiIsIlRpbnkuQ2FudmFzTWFza01hbmFnZXIgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNNYXNrTWFuYWdlcjtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLnB1c2hNYXNrID0gZnVuY3Rpb24gKG1hc2tEYXRhLCByZW5kZXJTZXNzaW9uKSB7XHJcbiAgICB2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKTtcclxuXHJcbiAgICB2YXIgY2FjaGVBbHBoYSA9IG1hc2tEYXRhLmFscGhhO1xyXG4gICAgdmFyIHRyYW5zZm9ybSA9IG1hc2tEYXRhLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciByZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgIHRyYW5zZm9ybS5hICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLmMgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS5kICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS50eSAqIHJlc29sdXRpb25cclxuICAgICk7XHJcblxyXG4gICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljc01hc2sobWFza0RhdGEsIGNvbnRleHQpO1xyXG5cclxuICAgIGNvbnRleHQuY2xpcCgpO1xyXG5cclxuICAgIG1hc2tEYXRhLndvcmxkQWxwaGEgPSBjYWNoZUFscGhhO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUucG9wTWFzayA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQucmVzdG9yZSgpO1xyXG59O1xyXG4iLCJUaW55LkNhbnZhc1JlbmRlcmVyID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IG9wdGlvbnMucmVzb2x1dGlvbiAhPSB1bmRlZmluZWQgPyBvcHRpb25zLnJlc29sdXRpb24gOiAxO1xyXG5cclxuICAgIHRoaXMuY2xlYXJCZWZvcmVSZW5kZXIgPSBvcHRpb25zLmNsZWFyQmVmb3JlUmVuZGVyICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xlYXJCZWZvcmVSZW5kZXIgOiB0cnVlO1xyXG5cclxuICAgIHRoaXMudHJhbnNwYXJlbnQgPSBvcHRpb25zLnRyYW5zcGFyZW50ICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMudHJhbnNwYXJlbnQgOiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUgPSBvcHRpb25zLmF1dG9SZXNpemUgfHwgZmFsc2U7XHJcblxyXG4gICAgLy8gdGhpcy53aWR0aCA9IHdpZHRoIHx8IDgwMDtcclxuICAgIC8vIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDYwMDtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoICo9IHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHRoaXMuaGVpZ2h0ICo9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICBpZiAoIVRpbnkuZGVmYXVsdFJlbmRlcmVyKSBUaW55LmRlZmF1bHRSZW5kZXJlciA9IHRoaXM7XHJcblxyXG4gICAgdmFyIHZpZXcgPSAodGhpcy5kb21FbGVtZW50ID0gb3B0aW9ucy5kb21FbGVtZW50IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IHZpZXcuZ2V0Q29udGV4dChcIjJkXCIsIHsgYWxwaGE6IHRoaXMudHJhbnNwYXJlbnQgfSk7XHJcblxyXG4gICAgLy8gdmlldy53aWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB2aWV3LmhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMucmVzaXplKHdpZHRoIHx8IDgwMCwgaGVpZ2h0IHx8IDYwMCk7XHJcblxyXG4gICAgdGhpcy5zZXRDbGVhckNvbG9yKFwiI2ZmZmZmZlwiKTtcclxuXHJcbiAgICBpZiAoVGlueS5DYW52YXNNYXNrTWFuYWdlcikgdGhpcy5tYXNrTWFuYWdlciA9IG5ldyBUaW55LkNhbnZhc01hc2tNYW5hZ2VyKCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcclxuICAgICAgICBtYXNrTWFuYWdlcjogdGhpcy5tYXNrTWFuYWdlcixcclxuICAgICAgICBzbW9vdGhQcm9wZXJ0eTogbnVsbCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJZiB0cnVlIFBpeGkgd2lsbCBNYXRoLmZsb29yKCkgeC95IHZhbHVlcyB3aGVuIHJlbmRlcmluZywgc3RvcHBpbmcgcGl4ZWwgaW50ZXJwb2xhdGlvbi5cclxuICAgICAgICAgKiBIYW5keSBmb3IgY3Jpc3AgcGl4ZWwgYXJ0IGFuZCBzcGVlZCBvbiBsZWdhY3kgZGV2aWNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJvdW5kUGl4ZWxzOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmIChcIndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYgKFwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm9JbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYgKFwibXNJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJtc0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkNhbnZhc1JlbmRlcmVyO1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG4gICAgdGhpcy5jbGVhckNvbG9yID0gY29sb3I7XHJcblxyXG4gICAgLy8gaWYgKGNvbG9yID09PSBudWxsKSB7XHJcbiAgICAvLyAgICAgdGhpcy5jbGVhckNvbG9yID0gbnVsbDtcclxuICAgIC8vICAgICByZXR1cm47XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdGhpcy5jbGVhckNvbG9yID0gY29sb3IgfHwgMHgwMDAwMDA7XHJcbiAgICAvLyAvLyB0aGlzLmJhY2tncm91bmRDb2xvclNwbGl0ID0gVGlueS5oZXgycmdiKHRoaXMuYmFja2dyb3VuZENvbG9yKTtcclxuICAgIC8vIHZhciBoZXggPSB0aGlzLmNsZWFyQ29sb3IudG9TdHJpbmcoMTYpO1xyXG4gICAgLy8gaGV4ID0gJzAwMDAwMCcuc3Vic3RyKDAsIDYgLSBoZXgubGVuZ3RoKSArIGhleDtcclxuICAgIC8vIHRoaXMuX2NsZWFyQ29sb3IgPSAnIycgKyBoZXg7XHJcbn07XHJcblxyXG4vLyBUaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRQaXhlbEFydCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgIHZhciBjYW52YXMgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4vLyAgICAgdmFyIHR5cGVzID0gWyAnb3B0aW1pemVTcGVlZCcsICctbW96LWNyaXNwLWVkZ2VzJywgJy1vLWNyaXNwLWVkZ2VzJywgJy13ZWJraXQtb3B0aW1pemUtY29udHJhc3QnLCAnb3B0aW1pemUtY29udHJhc3QnLCAnY3Jpc3AtZWRnZXMnLCAncGl4ZWxhdGVkJyBdO1xyXG5cclxuLy8gICAgIHR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgY2FudmFzLnN0eWxlWydpbWFnZS1yZW5kZXJpbmcnXSA9IHR5cGU7XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICBjYW52YXMuc3R5bGUubXNJbnRlcnBvbGF0aW9uTW9kZSA9ICduZWFyZXN0LW5laWdoYm9yJztcclxuLy8gICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscyA9IHRydWU7XHJcbi8vIH1cclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChzY2VuZSkge1xyXG4gICAgc2NlbmUudXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xyXG5cclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gXCJzb3VyY2Utb3ZlclwiO1xyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcclxuXHJcbiAgICBpZiAobmF2aWdhdG9yLmlzQ29jb29uSlMgJiYgdGhpcy5kb21FbGVtZW50LnNjcmVlbmNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY2xlYXJCZWZvcmVSZW5kZXIpIHtcclxuICAgICAgICBpZiAodGhpcy50cmFuc3BhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jbGVhckNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlck9iamVjdChzY2VuZSk7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKHJlbW92ZVZpZXcpIHtcclxuICAgIGlmICh0eXBlb2YgcmVtb3ZlVmlldyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHJlbW92ZVZpZXcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZW1vdmVWaWV3ICYmIHRoaXMuZG9tRWxlbWVudC5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcclxuICAgIHRoaXMubWFza01hbmFnZXIgPSBudWxsO1xyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uID0gbnVsbDtcclxuXHJcbiAgICBpZiAoVGlueS5kZWZhdWx0UmVuZGVyZXIgPT09IHRoaXMpIFRpbnkuZGVmYXVsdFJlbmRlcmVyID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB2YXIgdmlldyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbiAgICB2aWV3LndpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgIHZpZXcuaGVpZ2h0ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgIHZpZXcuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuICAgICAgICB2aWV3LnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldFBpeGVsUmF0aW8gPSBmdW5jdGlvbiAocmVzb2x1dGlvbikge1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICB2YXIgdmlldyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbiAgICB2aWV3LndpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgIHZpZXcuaGVpZ2h0ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJPYmplY3QgPSBmdW5jdGlvbiAoZGlzcGxheU9iamVjdCwgY29udGV4dCkge1xyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uLmNvbnRleHQgPSBjb250ZXh0IHx8IHRoaXMuY29udGV4dDtcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgZGlzcGxheU9iamVjdC5yZW5kZXIodGhpcy5yZW5kZXJTZXNzaW9uKTtcclxufTtcclxuIiwiVGlueS5DYW52YXNUaW50ZXIgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLmdldFRpbnRlZFRleHR1cmUgPSBmdW5jdGlvbiAoc3ByaXRlLCBjb2xvcikge1xyXG4gICAgdmFyIHRleHR1cmUgPSBzcHJpdGUudGV4dHVyZTtcclxuXHJcbiAgICBpZiAoIXRleHR1cmUuX3RpbnRDYWNoZSkgdGV4dHVyZS5fdGludENhY2hlID0ge307XHJcblxyXG4gICAgaWYgKHRleHR1cmUuX3RpbnRDYWNoZVtjb2xvcl0pIHJldHVybiB0ZXh0dXJlLl90aW50Q2FjaGVbY29sb3JdO1xyXG5cclxuICAgIHZhciBjYW52YXMgPSBUaW55LkNhbnZhc1RpbnRlci5jYW52YXMgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHJcbiAgICBUaW55LkNhbnZhc1RpbnRlci50aW50TWV0aG9kKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpO1xyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc1RpbnRlci5jb252ZXJ0VGludFRvSW1hZ2UpIHtcclxuICAgICAgICAvLyBpcyB0aGlzIGJldHRlcj9cclxuICAgICAgICB2YXIgdGludEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGludEltYWdlLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuXHJcbiAgICAgICAgLy8gdGV4dHVyZS5fdGludENhY2hlW3N0cmluZ0NvbG9yXSA9IHRpbnRJbWFnZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVGlueS5DYW52YXNUaW50ZXIuY2FudmFzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoVGlueS5DYW52YXNUaW50ZXIuY2FjaGVUaW50KSB0ZXh0dXJlLl90aW50Q2FjaGVbY29sb3JdID0gY2FudmFzO1xyXG5cclxuICAgIHJldHVybiBjYW52YXM7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5ID0gZnVuY3Rpb24gKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpIHtcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICB2YXIgY3JvcCA9IHRleHR1cmUuY3JvcDtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjcm9wLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGNyb3AuaGVpZ2h0O1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShjb2xvcik7XHJcblxyXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcIm11bHRpcGx5XCI7XHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5zb3VyY2UsIGNyb3AueCwgY3JvcC55LCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCwgMCwgMCwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQpO1xyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1hdG9wXCI7XHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5zb3VyY2UsIGNyb3AueCwgY3JvcC55LCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCwgMCwgMCwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQpO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhQZXJQaXhlbCA9IGZ1bmN0aW9uICh0ZXh0dXJlLCBjb2xvciwgY2FudmFzKSB7XHJcbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgdmFyIGNyb3AgPSB0ZXh0dXJlLmNyb3A7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY3JvcC53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBjcm9wLmhlaWdodDtcclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiY29weVwiO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5zb3VyY2UsIGNyb3AueCwgY3JvcC55LCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCwgMCwgMCwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQpO1xyXG5cclxuICAgIHZhciByZ2JWYWx1ZXMgPSBUaW55LmNvbG9yMnJnYihjb2xvcik7XHJcbiAgICB2YXIgciA9IHJnYlZhbHVlc1swXSxcclxuICAgICAgICBnID0gcmdiVmFsdWVzWzFdLFxyXG4gICAgICAgIGIgPSByZ2JWYWx1ZXNbMl07XHJcblxyXG4gICAgdmFyIHBpeGVsRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICB2YXIgcGl4ZWxzID0gcGl4ZWxEYXRhLmRhdGE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwaXhlbHMubGVuZ3RoOyBpICs9IDQpIHtcclxuICAgICAgICBwaXhlbHNbaSArIDBdICo9IHI7XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAxXSAqPSBnO1xyXG4gICAgICAgIHBpeGVsc1tpICsgMl0gKj0gYjtcclxuXHJcbiAgICAgICAgaWYgKCFUaW55LmNhbkhhbmRsZUFscGhhKSB7XHJcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IHBpeGVsc1tpICsgM107XHJcblxyXG4gICAgICAgICAgICBwaXhlbHNbaSArIDBdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgICAgICBwaXhlbHNbaSArIDFdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgICAgICBwaXhlbHNbaSArIDJdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShwaXhlbERhdGEsIDAsIDApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2hlY2tJbnZlcnNlQWxwaGEoKSB7XHJcbiAgICB2YXIgY2FudmFzID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKDIsIDEsIHsgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlIH0pO1xyXG5cclxuICAgIGNhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgxMCwgMjAsIDMwLCAwLjUpXCI7XHJcblxyXG4gICAgLy8gIERyYXcgYSBzaW5nbGUgcGl4ZWxcclxuICAgIGNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIC8vICBHZXQgdGhlIGNvbG9yIHZhbHVlc1xyXG4gICAgdmFyIHMxID0gY2FudmFzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIC8vICBQbG90IHRoZW0gdG8geDJcclxuICAgIGNhbnZhcy5jb250ZXh0LnB1dEltYWdlRGF0YShzMSwgMSwgMCk7XHJcblxyXG4gICAgLy8gIEdldCB0aG9zZSB2YWx1ZXNcclxuICAgIHZhciBzMiA9IGNhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YSgxLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgQ29tcGFyZSBhbmQgcmV0dXJuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIHMyLmRhdGFbMF0gPT09IHMxLmRhdGFbMF0gJiZcclxuICAgICAgICBzMi5kYXRhWzFdID09PSBzMS5kYXRhWzFdICYmXHJcbiAgICAgICAgczIuZGF0YVsyXSA9PT0gczEuZGF0YVsyXSAmJlxyXG4gICAgICAgIHMyLmRhdGFbM10gPT09IHMxLmRhdGFbM11cclxuICAgICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrQmxlbmRNb2RlKCkge1xyXG4gICAgdmFyIHBuZ0hlYWQgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQVFBQUFBQkFRTUFBQUREOHAyT0FBQUFBMUJNVkVYL1wiO1xyXG4gICAgdmFyIHBuZ0VuZCA9IFwiQUFBQUNrbEVRVlFJMTJOZ0FBQUFBZ0FCNGlHOE13QUFBQUJKUlU1RXJrSmdnZz09XCI7XHJcblxyXG4gICAgdmFyIG1hZ2VudGEgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBtYWdlbnRhLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgeWVsbG93ID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgICAgIHllbGxvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSA2O1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIsIHsgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcIm11bHRpcGx5XCI7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShtYWdlbnRhLCAwLCAwKTtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoeWVsbG93LCAyLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGV4dC5nZXRJbWFnZURhdGEoMiwgMCwgMSwgMSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgyLCAwLCAxLCAxKS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgVGlueS5zdXBwb3J0TmV3QmxlbmRNb2RlcyA9IGRhdGFbMF0gPT09IDI1NSAmJiBkYXRhWzFdID09PSAwICYmIGRhdGFbMl0gPT09IDA7XHJcbiAgICAgICAgICAgIFRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QgPSBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHllbGxvdy5zcmMgPSBwbmdIZWFkICsgXCIvd0NLeHZSRlwiICsgcG5nRW5kO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYWdlbnRhLnNyYyA9IHBuZ0hlYWQgKyBcIkFQODA0T2E2XCIgKyBwbmdFbmQ7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci5jb252ZXJ0VGludFRvSW1hZ2UgPSBmYWxzZTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLmNhY2hlVGludCA9IGZhbHNlO1xyXG5cclxuVGlueS5jYW5IYW5kbGVBbHBoYSA9IGNoZWNrSW52ZXJzZUFscGhhKCk7XHJcblxyXG5UaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzID0gY2hlY2tCbGVuZE1vZGUoKTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QgPSBUaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzXHJcbiAgICA/IFRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoTXVsdGlwbHlcclxuICAgIDogVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhQZXJQaXhlbDtcclxuIiwiVGlueS5DYW52YXNHcmFwaGljcyA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyA9IGZ1bmN0aW9uIChncmFwaGljcywgY29udGV4dCkge1xyXG4gICAgdmFyIHdvcmxkQWxwaGEgPSBncmFwaGljcy53b3JsZEFscGhhO1xyXG5cclxuICAgIGlmIChncmFwaGljcy5kaXJ0eSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlR3JhcGhpY3NUaW50KGdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IGRhdGEuX2ZpbGxUaW50O1xyXG4gICAgICAgIHZhciBsaW5lQ29sb3IgPSBkYXRhLl9saW5lVGludDtcclxuXHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBkYXRhLmxpbmVXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBzaGFwZS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHBvaW50cy5sZW5ndGggLyAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tqICogMl0sIHBvaW50c1tqICogMiArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNoYXBlLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXSAmJiBwb2ludHNbMV0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsQ29sb3IgfHwgZGF0YS5maWxsQ29sb3IgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpIHtcclxuICAgICAgICAgICAgLy8gVE9ETyAtIG5lZWQgdG8gYmUgVW5kZWZpbmVkIVxyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhzaGFwZS54LCBzaGFwZS55LCBzaGFwZS5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUCkge1xyXG4gICAgICAgICAgICAvLyBlbGxpcHNlIGNvZGUgdGFrZW4gZnJvbTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTcyNzk4L2hvdy10by1kcmF3LWFuLW92YWwtaW4taHRtbDUtY2FudmFzXHJcblxyXG4gICAgICAgICAgICB2YXIgdyA9IHNoYXBlLndpZHRoICogMjtcclxuICAgICAgICAgICAgdmFyIGggPSBzaGFwZS5oZWlnaHQgKiAyO1xyXG5cclxuICAgICAgICAgICAgdmFyIHggPSBzaGFwZS54IC0gdyAvIDI7XHJcbiAgICAgICAgICAgIHZhciB5ID0gc2hhcGUueSAtIGggLyAyO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYXBwYSA9IDAuNTUyMjg0OCxcclxuICAgICAgICAgICAgICAgIG94ID0gKHcgLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBveSA9IChoIC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcclxuICAgICAgICAgICAgICAgIHhlID0geCArIHcsIC8vIHgtZW5kXHJcbiAgICAgICAgICAgICAgICB5ZSA9IHkgKyBoLCAvLyB5LWVuZFxyXG4gICAgICAgICAgICAgICAgeG0gPSB4ICsgdyAvIDIsIC8vIHgtbWlkZGxlXHJcbiAgICAgICAgICAgICAgICB5bSA9IHkgKyBoIC8gMjsgLy8geS1taWRkbGVcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHgsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHgsIHltIC0gb3ksIHhtIC0gb3gsIHksIHhtLCB5KTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtICsgb3gsIHksIHhlLCB5bSAtIG95LCB4ZSwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeGUsIHltICsgb3ksIHhtICsgb3gsIHllLCB4bSwgeWUpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gLSBveCwgeWUsIHgsIHltICsgb3ksIHgsIHltKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUobGluZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMpIHtcclxuICAgICAgICAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF4UmFkaXVzID0gKE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMikgfCAwO1xyXG4gICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgPiBtYXhSYWRpdXMgPyBtYXhSYWRpdXMgOiByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhyeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5ICsgaGVpZ2h0LCByeCArIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoIC0gcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSArIGhlaWdodCwgcnggKyB3aWR0aCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoLCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSwgcnggKyB3aWR0aCAtIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5LCByeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbENvbG9yIHx8IGRhdGEuZmlsbENvbG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUobGluZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTilcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHZhciByeCA9IHNoYXBlLng7XHJcbiAgICAgICAgLy8gICAgIHZhciByeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgLy8gICAgIHZhciB3aWR0aCA9IHNoYXBlLndpZHRoO1xyXG4gICAgICAgIC8vICAgICB2YXIgaGVpZ2h0ID0gc2hhcGUuaGVpZ2h0O1xyXG4gICAgICAgIC8vICAgICB2YXIgcmFkaXVzID0gc2hhcGUucmFkaXVzO1xyXG5cclxuICAgICAgICAvLyAgICAgaWYgKGRhdGEuZmlsbENvbG9yIHx8IGRhdGEuZmlsbENvbG9yID09PSAwKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgIC8vICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgLy8gICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShmaWxsQ29sb3IpO1xyXG4gICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICBjb250ZXh0LmxpbmVKb2luID0gXCJyb3VuZFwiO1xyXG4gICAgICAgIC8vICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHJhZGl1cztcclxuXHJcbiAgICAgICAgLy8gICAgIGNvbnRleHQuc3Ryb2tlUmVjdChyeCArIChyYWRpdXMgLyAyKSwgcnkgKyAocmFkaXVzIC8gMiksIHdpZHRoIC0gcmFkaXVzLCBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgIC8vICAgICBjb250ZXh0LmZpbGxSZWN0KHJ4ICsgKHJhZGl1cyAvIDIpLCByeSArIChyYWRpdXMgLyAyKSwgd2lkdGggLSByYWRpdXMsIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljc01hc2sgPSBmdW5jdGlvbiAoZ3JhcGhpY3MsIGNvbnRleHQpIHtcclxuICAgIHZhciBsZW4gPSBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoO1xyXG5cclxuICAgIGlmIChsZW4gPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpIHtcclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcG9pbnRzLmxlbmd0aCAvIDI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2ogKiAyXSwgcG9pbnRzW2ogKiAyICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXSAmJiBwb2ludHNbMV0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJFQ1QpIHtcclxuICAgICAgICAgICAgY29udGV4dC5yZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuQ0lSQykge1xyXG4gICAgICAgICAgICAvLyBUT0RPIC0gbmVlZCB0byBiZSBVbmRlZmluZWQhXHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUCkge1xyXG4gICAgICAgICAgICAvLyBlbGxpcHNlIGNvZGUgdGFrZW4gZnJvbTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTcyNzk4L2hvdy10by1kcmF3LWFuLW92YWwtaW4taHRtbDUtY2FudmFzXHJcblxyXG4gICAgICAgICAgICB2YXIgdyA9IHNoYXBlLndpZHRoICogMjtcclxuICAgICAgICAgICAgdmFyIGggPSBzaGFwZS5oZWlnaHQgKiAyO1xyXG5cclxuICAgICAgICAgICAgdmFyIHggPSBzaGFwZS54IC0gdyAvIDI7XHJcbiAgICAgICAgICAgIHZhciB5ID0gc2hhcGUueSAtIGggLyAyO1xyXG5cclxuICAgICAgICAgICAgdmFyIGthcHBhID0gMC41NTIyODQ4LFxyXG4gICAgICAgICAgICAgICAgb3ggPSAodyAvIDIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IGhvcml6b250YWxcclxuICAgICAgICAgICAgICAgIG95ID0gKGggLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCB2ZXJ0aWNhbFxyXG4gICAgICAgICAgICAgICAgeGUgPSB4ICsgdywgLy8geC1lbmRcclxuICAgICAgICAgICAgICAgIHllID0geSArIGgsIC8vIHktZW5kXHJcbiAgICAgICAgICAgICAgICB4bSA9IHggKyB3IC8gMiwgLy8geC1taWRkbGVcclxuICAgICAgICAgICAgICAgIHltID0geSArIGggLyAyOyAvLyB5LW1pZGRsZVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeCwgeW0gLSBveSwgeG0gLSBveCwgeSwgeG0sIHkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gKyBveCwgeSwgeGUsIHltIC0gb3ksIHhlLCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4ZSwgeW0gKyBveSwgeG0gKyBveCwgeWUsIHhtLCB5ZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSAtIG94LCB5ZSwgeCwgeW0gKyBveSwgeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQyB8fCBkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOKSB7XHJcbiAgICAgICAgICAgIHZhciByeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgIHZhciByeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHNoYXBlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gc2hhcGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gc2hhcGUucmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1heFJhZGl1cyA9IChNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIpIHwgMDtcclxuICAgICAgICAgICAgcmFkaXVzID0gcmFkaXVzID4gbWF4UmFkaXVzID8gbWF4UmFkaXVzIDogcmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocngsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSArIGhlaWdodCwgcnggKyByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCAtIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnkgKyBoZWlnaHQsIHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnksIHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSwgcngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnVwZGF0ZUdyYXBoaWNzVGludCA9IGZ1bmN0aW9uIChncmFwaGljcykge1xyXG4gICAgaWYgKGdyYXBoaWNzLnRpbnQgPT09IDB4ZmZmZmZmKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0aW50UiA9ICgoZ3JhcGhpY3MudGludCA+PiAxNikgJiAweGZmKSAvIDI1NTtcclxuICAgIHZhciB0aW50RyA9ICgoZ3JhcGhpY3MudGludCA+PiA4KSAmIDB4ZmYpIC8gMjU1O1xyXG4gICAgdmFyIHRpbnRCID0gKGdyYXBoaWNzLnRpbnQgJiAweGZmKSAvIDI1NTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYXBoaWNzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBkYXRhID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhW2ldO1xyXG5cclxuICAgICAgICB2YXIgZmlsbENvbG9yID0gZGF0YS5maWxsQ29sb3IgfCAwO1xyXG4gICAgICAgIHZhciBsaW5lQ29sb3IgPSBkYXRhLmxpbmVDb2xvciB8IDA7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIGNvbG9yUiA9IChmaWxsQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgICAgICB2YXIgY29sb3JHID0gKGZpbGxDb2xvciA+PiA4ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgdmFyIGNvbG9yQiA9IChmaWxsQ29sb3IgJiAweEZGKSAvIDI1NTsgXHJcbiAgICAgICAgY29sb3JSICo9IHRpbnRSO1xyXG4gICAgICAgIGNvbG9yRyAqPSB0aW50RztcclxuICAgICAgICBjb2xvckIgKj0gdGludEI7XHJcbiAgICAgICAgZmlsbENvbG9yID0gKChjb2xvclIqMjU1IDw8IDE2KSArIChjb2xvckcqMjU1IDw8IDgpICsgY29sb3JCKjI1NSk7XHJcbiAgICAgICAgY29sb3JSID0gKGxpbmVDb2xvciA+PiAxNiAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIGNvbG9yRyA9IChsaW5lQ29sb3IgPj4gOCAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIGNvbG9yQiA9IChsaW5lQ29sb3IgJiAweEZGKSAvIDI1NTsgXHJcbiAgICAgICAgY29sb3JSICo9IHRpbnRSO1xyXG4gICAgICAgIGNvbG9yRyAqPSB0aW50RztcclxuICAgICAgICBjb2xvckIgKj0gdGludEI7XHJcbiAgICAgICAgbGluZUNvbG9yID0gKChjb2xvclIqMjU1IDw8IDE2KSArIChjb2xvckcqMjU1IDw8IDgpICsgY29sb3JCKjI1NSk7ICAgXHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgZGF0YS5fZmlsbFRpbnQgPVxyXG4gICAgICAgICAgICAoKCgoKGZpbGxDb2xvciA+PiAxNikgJiAweGZmKSAvIDI1NSkgKiB0aW50UiAqIDI1NSkgPDwgMTYpICtcclxuICAgICAgICAgICAgKCgoKChmaWxsQ29sb3IgPj4gOCkgJiAweGZmKSAvIDI1NSkgKiB0aW50RyAqIDI1NSkgPDwgOCkgK1xyXG4gICAgICAgICAgICAoKGZpbGxDb2xvciAmIDB4ZmYpIC8gMjU1KSAqIHRpbnRCICogMjU1O1xyXG4gICAgICAgIGRhdGEuX2xpbmVUaW50ID1cclxuICAgICAgICAgICAgKCgoKChsaW5lQ29sb3IgPj4gMTYpICYgMHhmZikgLyAyNTUpICogdGludFIgKiAyNTUpIDw8IDE2KSArXHJcbiAgICAgICAgICAgICgoKCgobGluZUNvbG9yID4+IDgpICYgMHhmZikgLyAyNTUpICogdGludEcgKiAyNTUpIDw8IDgpICtcclxuICAgICAgICAgICAgKChsaW5lQ29sb3IgJiAweGZmKSAvIDI1NSkgKiB0aW50QiAqIDI1NTtcclxuICAgIH1cclxufTtcclxuIiwidmFyIGxpc3RlbmluZ1RvVG91Y2hFdmVudHM7XHJcblxyXG5UaW55LklucHV0ID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB2YXIgdmlldyA9ICh0aGlzLmRvbUVsZW1lbnQgPSBnYW1lLmlucHV0Vmlldyk7XHJcblxyXG4gICAgdGhpcy5ib3VuZHMgPSB7IHg6IDAsIHk6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcclxuICAgIHRoaXMuY2FuZGlkYXRlcyA9IFtdO1xyXG4gICAgdGhpcy5saXN0ID0gW107XHJcblxyXG4gICAgdGhpcy5sYXN0TW92ZSA9IG51bGw7XHJcbiAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZG93bkhhbmRsZXIgPSB0aGlzLmRvd25IYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gdGhpcy5tb3ZlSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy51cEhhbmRsZXIgPSB0aGlzLnVwSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgLy8gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcclxuXHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG5cclxuICAgIC8vIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcblxyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcblxyXG4gICAgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4odGhpcyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUaW55LklucHV0LnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBUaW55LklucHV0LnN5c3RlbXNbaV0uaW5pdC5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlQm91bmRzKCk7XHJcbn07XHJcblxyXG5UaW55LklucHV0LnByb3RvdHlwZSA9IHtcclxuICAgIGFkZDogZnVuY3Rpb24gKG9iamVjdCwgb3B0aW9ucykge1xyXG4gICAgICAgIG9iamVjdC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLnN5c3RlbSA9IHRoaXM7XHJcblxyXG4gICAgICAgIG9iamVjdC5pbnB1dCA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKG9iamVjdC5pbnB1dCk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKG9iamVjdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubGlzdC5pbmRleE9mKG9iamVjdCk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVkID0gdGhpcy5saXN0W2luZGV4XTtcclxuICAgICAgICAgICAgcmVtb3ZlZC5pbnB1dCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlbW92ZWQuaW5wdXRFbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRIYW5kbGVyOiBmdW5jdGlvbiAobmFtZSwgZXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhuYW1lKVxyXG4gICAgICAgIHZhciBjb29yZHMgPSB0aGlzLmdldENvb3JkcyhldmVudCk7XHJcblxyXG4gICAgICAgIGlmIChjb29yZHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUgIT0gXCJtb3ZlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuZGlkYXRlcy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5JbnB1dC5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGlueS5JbnB1dC5zeXN0ZW1zW2ldLnByZUhhbmRsZS5jYWxsKHRoaXMsIGNvb3Jkcy54LCBjb29yZHMueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzR29vZCwgb2JqO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhpcy5saXN0Lmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gdGhpcy5saXN0W3RdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5pbnB1dEVuYWJsZWQgfHwgIW9iai5wYXJlbnQpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmlucHV0LmNoZWNrQm91bmRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0dvb2QgPSBvYmouaW5wdXQuY2hlY2tCb3VuZHMuY2FsbCh0aGlzLCBvYmosIGNvb3Jkcy54LCBjb29yZHMueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpc0dvb2QgPSBUaW55LklucHV0LmNoZWNrQm91bmRzLmNhbGwodGhpcywgb2JqLCBjb29yZHMueCwgY29vcmRzLnkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNHb29kKSB0aGlzLmNhbmRpZGF0ZXMucHVzaChvYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGkgPSB0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuY2FuZGlkYXRlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMuY2FuZGlkYXRlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXRbXCJsYXN0X1wiICsgbmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KG5hbWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09IFwidXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSBvYmouaW5wdXRbXCJsYXN0X2Rvd25cIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2ludCAmJiBUaW55Lk1hdGguZGlzdGFuY2UocG9pbnQueCwgcG9pbnQueSwgY29vcmRzLngsIGNvb3Jkcy55KSA8IDMwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQoXCJjbGlja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaW5wdXQudHJhbnNwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHZhciBvYmogPSB0aGlzLmNhbmRpZGF0ZXNbaSAtIDFdXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgb2JqLmlucHV0W1wibGFzdF9cIiArIG5hbWVdID0ge3g6IGNvb3Jkcy54LCB5OiBjb29yZHMueX1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgb2JqLmlucHV0LmVtaXQobmFtZSwge3g6IGNvb3Jkcy54LCB5OiBjb29yZHMueX0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChuYW1lID09IFwidXBcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YXIgcG9pbnQgPSBvYmouaW5wdXRbXCJsYXN0X2Rvd25cIl1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYgKHBvaW50ICYmIFRpbnkuTWF0aC5kaXN0YW5jZShwb2ludC54LCBwb2ludC55LCBjb29yZHMueCwgY29vcmRzLnkpIDwgMzApXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChcImNsaWNrXCIsIHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbWl0KG5hbWUsIHtcclxuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3ZlSGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZSA9IGV2ZW50O1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwibW92ZVwiLCBldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwSGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcInVwXCIsIHRoaXMubGFzdE1vdmUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkb3duSGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGFzdE1vdmUgPSBldmVudDtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcImRvd25cIiwgZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja0hhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwiY2xpY2tcIiwgZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDb29yZHM6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciBjb29yZHMgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmluZ1RvVG91Y2hFdmVudHMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBldmVudC50b3VjaGVzWzBdLmNsaWVudFlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY2xpZW50WCAmJiBldmVudC5jbGllbnRZKSB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBldmVudC5jbGllbnRZXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTW91c2UgZXZlbnRcclxuICAgICAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgobGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyAmJiBldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHx8IGNvb3JkcyA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgeDogY29vcmRzLnggLSB0aGlzLmJvdW5kcy54LFxyXG4gICAgICAgICAgICB5OiBjb29yZHMueSAtIHRoaXMuYm91bmRzLnlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gY29vcmRzO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVCb3VuZHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBib3VuZHMgPSB0aGlzLmJvdW5kcztcclxuXHJcbiAgICAgICAgdmFyIGNsaWVudFJlY3QgPSB0aGlzLmRvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIGJvdW5kcy54ID0gY2xpZW50UmVjdC5sZWZ0O1xyXG4gICAgICAgIGJvdW5kcy55ID0gY2xpZW50UmVjdC50b3A7XHJcbiAgICAgICAgYm91bmRzLndpZHRoID0gY2xpZW50UmVjdC53aWR0aDtcclxuICAgICAgICBib3VuZHMuaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdmlldyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy8gdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuSW5wdXQuY2hlY2tCb3VuZHMgPSBmdW5jdGlvbiAob2JqLCB4LCB5KSB7XHJcbiAgICBpZiAob2JqLndvcmxkVmlzaWJsZSkge1xyXG4gICAgICAgIGlmIChvYmouZ2V0Qm91bmRzKCkuY29udGFpbnMoeCwgeSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIChvYmouY2hpbGRyZW4gJiYgb2JqLmNoaWxkcmVuLmxlbmd0aCA+IDApXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCBvYmouY2hpbGRyZW4ubGVuZ3RoOyB0KyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBfY2hlY2tPbkFjdGl2ZU9iamVjdHMob2JqLmNoaWxkcmVuW3RdLCB4LCB5KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn07XHJcblxyXG5UaW55LklucHV0LnN5c3RlbXMgPSBbXTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJpbnB1dFwiLCBUaW55LklucHV0KTtcclxuIiwiVGlueS5DYWNoZSA9IHtcclxuICAgIGltYWdlOiB7fSxcclxuICAgIHRleHR1cmU6IHt9XHJcbn07XHJcblxyXG5UaW55LkxvYWRlciA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICBnYW1lLmNhY2hlID0gVGlueS5DYWNoZTtcclxuXHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5saXN0ID0gW107XHJcbn07XHJcblxyXG5UaW55LkxvYWRlci5wcm90b3R5cGUgPSB7XHJcbiAgICBjbGVhckNhY2hlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LkNhY2hlLnRleHR1cmUpIFRpbnkuQ2FjaGUudGV4dHVyZVt5XS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIHkgaW4gVGlueS5DYWNoZSkgVGlueS5DYWNoZVt5XSA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBhbGw6IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMubGlzdC5jb25jYXQoYXJyYXkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbWFnZTogZnVuY3Rpb24gKGtleSwgc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goe1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzcHJpdGVzaGVldDogZnVuY3Rpb24gKGtleSwgc291cmNlLCBhcmdfMSwgYXJnXzIsIHRvdGFsRnJhbWVzLCBkdXJhdGlvbikge1xyXG4gICAgICAgIHZhciByZXMgPSB7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgdHlwZTogXCJzcHJpdGVzaGVldFwiXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdfMSA9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHJlcy53aWR0aCA9IGFyZ18xO1xyXG4gICAgICAgICAgICByZXMuaGVpZ2h0ID0gYXJnXzI7XHJcbiAgICAgICAgICAgIHJlcy50b3RhbCA9IHRvdGFsRnJhbWVzO1xyXG4gICAgICAgICAgICByZXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ18xLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmVzLmRhdGEgPSBhcmdfMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHJlcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGF0bGFzOiBmdW5jdGlvbiAoa2V5LCBzb3VyY2UsIGF0bGFzRGF0YSkge1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBkYXRhOiBhdGxhc0RhdGEsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiYXRsYXNcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGdhbWUgPSB0aGlzLmdhbWU7XHJcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLmxpc3Q7XHJcblxyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZ2FtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWROZXh0KCkge1xyXG4gICAgICAgICAgICAvLyB2YXIgZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBsaXN0LnNoaWZ0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9hZGVyID0gVGlueS5Mb2FkZXJbcmVzb3VyY2UudHlwZV07XHJcblxyXG4gICAgICAgICAgICBpZiAobG9hZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZXIocmVzb3VyY2UsIGxvYWRlZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3QgZmluZCBsb2FkZXIgZm9yIFwiICsgcmVzb3VyY2UudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZGVkKHJlc291cmNlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkTmV4dCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChnYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9hZE5leHQoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuTG9hZGVyLmF0bGFzID0gZnVuY3Rpb24gKHJlc291cmNlLCBjYikge1xyXG4gICAgdmFyIGtleSA9IHJlc291cmNlLmtleTtcclxuXHJcbiAgICBUaW55LkxvYWRlci5pbWFnZShyZXNvdXJjZSwgZnVuY3Rpb24gKHJlc291cmNlLCBpbWFnZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzb3VyY2UuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdXVpZCA9IGtleSArIFwiLlwiICsgcmVzb3VyY2UuZGF0YVtpXS5uYW1lO1xyXG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoaW1hZ2UsIHJlc291cmNlLmRhdGFbaV0pO1xyXG4gICAgICAgICAgICB0ZXh0dXJlLmtleSA9IGtleTtcclxuXHJcbiAgICAgICAgICAgIFRpbnkuQ2FjaGUudGV4dHVyZVt1dWlkXSA9IHRleHR1cmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYigpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5UaW55LkxvYWRlci5zcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgY2IpIHtcclxuICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XHJcblxyXG4gICAgVGlueS5Mb2FkZXIuaW1hZ2UocmVzb3VyY2UsIGZ1bmN0aW9uIChyZXNvdXJjZSwgaW1hZ2UpIHtcclxuICAgICAgICB2YXIgbGFzdEZyYW1lLCB1dWlkLCB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAocmVzb3VyY2UuZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZnJhbWVEYXRhID0gcmVzb3VyY2UuZGF0YTtcclxuICAgICAgICAgICAgbGFzdEZyYW1lID0gZnJhbWVEYXRhLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBsYXN0RnJhbWU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdXVpZCA9IGtleSArIFwiLlwiICsgaTtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLngpLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS53aWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS5oZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBmcmFtZURhdGFbaV0uZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyYW1lV2lkdGggPSByZXNvdXJjZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGZyYW1lSGVpZ2h0ID0gcmVzb3VyY2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmcmFtZVdpZHRoKSBmcmFtZVdpZHRoID0gTWF0aC5mbG9vcih3aWR0aCAvIChyZXNvdXJjZS5jb2xzIHx8IDEpKTtcclxuICAgICAgICAgICAgaWYgKCFmcmFtZUhlaWdodCkgZnJhbWVIZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCAvIChyZXNvdXJjZS5yb3dzIHx8IDEpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xzID0gTWF0aC5mbG9vcih3aWR0aCAvIGZyYW1lV2lkdGgpO1xyXG4gICAgICAgICAgICB2YXIgcm93cyA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvdGFsID0gY29scyAqIHJvd3M7XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UudG90YWwpIHRvdGFsID0gTWF0aC5taW4odG90YWwsIHJlc291cmNlLnRvdGFsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gMDtcclxuICAgICAgICAgICAgdmFyIHkgPSAwO1xyXG4gICAgICAgICAgICBsYXN0RnJhbWUgPSB0b3RhbCAtIDE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHV1aWQgPSBrZXkgKyBcIi5cIiArIGk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogZnJhbWVXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGZyYW1lSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiByZXNvdXJjZS5kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmtleSA9IGtleTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUubGFzdEZyYW1lID0gbGFzdEZyYW1lO1xyXG4gICAgICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuXHJcbiAgICAgICAgICAgICAgICB4ICs9IGZyYW1lV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHggKyBmcmFtZVdpZHRoID4gd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB5ICs9IGZyYW1lSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYigpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5UaW55LkxvYWRlci5pbWFnZSA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgY2IpIHtcclxuICAgIC8vIGlmIChUaW55LkNhY2hlW1wiaW1hZ2VcIl1bcmVzb3VyY2Uua2V5XSkgcmV0dXJuIGNiKHJlc291cmNlLCBUaW55LkNhY2hlW1wiaW1hZ2VcIl1bcmVzb3VyY2Uua2V5XSk7XHJcblxyXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVGlueS5DYWNoZS5pbWFnZVtyZXNvdXJjZS5rZXldID0gaW1hZ2U7XHJcblxyXG4gICAgICAgIGNiKHJlc291cmNlLCBpbWFnZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBjYihyZXNvdXJjZSwgaW1hZ2UpO1xyXG4gICAgLy8gfSlcclxuXHJcbiAgICBpbWFnZS5zcmMgPSByZXNvdXJjZS5zcmM7XHJcbn07XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwibG9hZFwiLCBUaW55LkxvYWRlcik7XHJcbiIsInZhciBfaXNTZXRUaW1lT3V0LCBfb25Mb29wLCBfdGltZU91dElELCBfcHJldlRpbWUsIF9sYXN0VGltZTtcclxuXHJcbnZhciBub3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbn07XHJcblxyXG5pZiAoc2VsZi5wZXJmb3JtYW5jZSAhPT0gdW5kZWZpbmVkICYmIHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG5vdyA9IHNlbGYucGVyZm9ybWFuY2Uubm93LmJpbmQoc2VsZi5wZXJmb3JtYW5jZSk7XHJcbn0gZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gRGF0ZS5ub3c7XHJcbn1cclxuXHJcblRpbnkuUkFGID0gZnVuY3Rpb24gKGdhbWUsIGZvcmNlU2V0VGltZU91dCkge1xyXG4gICAgaWYgKGZvcmNlU2V0VGltZU91dCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZm9yY2VTZXRUaW1lT3V0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG5cclxuICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmZvcmNlU2V0VGltZU91dCA9IGZvcmNlU2V0VGltZU91dDtcclxuXHJcbiAgICB2YXIgdmVuZG9ycyA9IFtcIm1zXCIsIFwibW96XCIsIFwid2Via2l0XCIsIFwib1wiXTtcclxuXHJcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyB4KyspIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyBcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPVxyXG4gICAgICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIl0gfHwgd2luZG93W3ZlbmRvcnNbeF0gKyBcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcclxuICAgIH1cclxuXHJcbiAgICBfaXNTZXRUaW1lT3V0ID0gZmFsc2U7XHJcbiAgICBfb25Mb29wID0gbnVsbDtcclxuICAgIF90aW1lT3V0SUQgPSBudWxsO1xyXG5cclxuICAgIF9wcmV2VGltZSA9IDA7XHJcbiAgICBfbGFzdFRpbWUgPSAwO1xyXG59O1xyXG5cclxuVGlueS5SQUYucHJvdG90eXBlID0ge1xyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfcHJldlRpbWUgPSBub3coKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgdGhpcy5mb3JjZVNldFRpbWVPdXQpIHtcclxuICAgICAgICAgICAgX2lzU2V0VGltZU91dCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBfb25Mb29wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZVNldFRpbWVvdXQoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cuc2V0VGltZW91dChfb25Mb29wLCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBfb25Mb29wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZVJBRigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX29uTG9vcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVSQUY6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5fdXBkYXRlKE1hdGguZmxvb3IoX2xhc3RUaW1lKSwgX2xhc3RUaW1lIC0gX3ByZXZUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9vbkxvb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3ByZXZUaW1lID0gX2xhc3RUaW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVTZXRUaW1lb3V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX2xhc3RUaW1lID0gbm93KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5fdXBkYXRlKE1hdGguZmxvb3IoX2xhc3RUaW1lKSwgX2xhc3RUaW1lIC0gX3ByZXZUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cuc2V0VGltZW91dChfb25Mb29wLCBUaW55LlJBRi50aW1lVG9DYWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX3ByZXZUaW1lID0gX2xhc3RUaW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9wcmV2VGltZSA9IG5vdygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKF9pc1NldFRpbWVPdXQpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aW1lT3V0SUQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShfdGltZU91dElEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlJBRi50aW1lVG9DYWxsID0gMTU7XHJcbiIsInZhciBub29wID0gZnVuY3Rpb24gKCkge307XHJcblxyXG52YXIgVGltZXIgPSBmdW5jdGlvbiAoYXV0b1N0YXJ0LCBhdXRvUmVtb3ZlLCBnYW1lLCBjYiwgY3R4LCBkZWxheSwgbG9vcCwgbiwgb25jb21wbGV0ZSkge1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuY2IgPSBjYiB8fCBub29wO1xyXG4gICAgdGhpcy5jdHggPSBjdHggfHwgdGhpcztcclxuICAgIHRoaXMuZGVsYXkgPSBkZWxheSA9PSB1bmRlZmluZWQgPyAxMDAwIDogZGVsYXk7XHJcbiAgICB0aGlzLmxvb3AgPSBsb29wO1xyXG4gICAgdGhpcy5jb3VudCA9IG4gfHwgMDtcclxuICAgIHRoaXMucmVwZWF0ID0gdGhpcy5jb3VudCA+IDA7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSAhIWF1dG9TdGFydDtcclxuICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICB0aGlzLmF1dG9SZW1vdmUgPSBhdXRvUmVtb3ZlO1xyXG4gICAgdGhpcy5vbkNvbXBsZXRlID0gb25jb21wbGV0ZSB8fCBub29wO1xyXG59O1xyXG5cclxuVGltZXIucHJvdG90eXBlID0ge1xyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGVsdGFUaW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVubmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0RnJhbWUgKz0gZGVsdGFUaW1lO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFzdEZyYW1lID49IHRoaXMuZGVsYXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLmN0eCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RnJhbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9SZW1vdmUgJiYgdGhpcy5nYW1lLnRpbWVyLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5sb29wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvUmVtb3ZlICYmIHRoaXMuZ2FtZS50aW1lci5yZW1vdmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlRpbWVyID0gVGltZXI7XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvciA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB0aGlzLmF1dG9TdGFydCA9IHRydWU7XHJcbiAgICB0aGlzLmF1dG9SZW1vdmUgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5UaW1lckNyZWF0b3IucHJvdG90eXBlID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGVsdGEpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0udXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLnN0b3AoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKHRtKSB7XHJcbiAgICAgICAgdmFyIGluZGV4T2YgPSB0aGlzLmxpc3QuaW5kZXhPZih0bSk7XHJcbiAgICAgICAgaWYgKGluZGV4T2YgPiAtMSkge1xyXG4gICAgICAgICAgICB0bS5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXhPZiwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZDogZnVuY3Rpb24gKGRlbGF5LCBjYiwgY3R4LCBhdXRvc3RhcnQsIGF1dG9yZW1vdmUpIHtcclxuICAgICAgICBhdXRvc3RhcnQgPSBhdXRvc3RhcnQgIT0gdW5kZWZpbmVkID8gYXV0b3N0YXJ0IDogdGhpcy5hdXRvU3RhcnQ7XHJcbiAgICAgICAgYXV0b3JlbW92ZSA9IGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZTtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgdGhpcy5nYW1lLCBjYiwgY3R4LCBkZWxheSk7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2godGltZXIpO1xyXG4gICAgICAgIHJldHVybiB0aW1lcjtcclxuICAgIH0sXHJcbiAgICBsb29wOiBmdW5jdGlvbiAoZGVsYXksIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSkge1xyXG4gICAgICAgIGF1dG9zdGFydCA9IGF1dG9zdGFydCAhPSB1bmRlZmluZWQgPyBhdXRvc3RhcnQgOiB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICBhdXRvcmVtb3ZlID0gYXV0b3JlbW92ZSAhPSB1bmRlZmluZWQgPyBhdXRvcmVtb3ZlIDogdGhpcy5hdXRvUmVtb3ZlO1xyXG5cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlLCB0aGlzLmdhbWUsIGNiLCBjdHgsIGRlbGF5LCB0cnVlKTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIHJlcGVhdDogZnVuY3Rpb24gKGRlbGF5LCBuLCBjYiwgY3R4LCBhdXRvc3RhcnQsIGF1dG9yZW1vdmUsIGNvbXBsZXRlKSB7XHJcbiAgICAgICAgYXV0b3N0YXJ0ID0gYXV0b3N0YXJ0ICE9IHVuZGVmaW5lZCA/IGF1dG9zdGFydCA6IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIGF1dG9yZW1vdmUgPSBhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmU7XHJcblxyXG4gICAgICAgIHZhciB0aW1lciA9IG5ldyBUaW1lcihhdXRvc3RhcnQsIGF1dG9yZW1vdmUsIHRoaXMuZ2FtZSwgY2IsIGN0eCwgZGVsYXksIGZhbHNlLCBuLCBjb21wbGV0ZSk7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2godGltZXIpO1xyXG4gICAgICAgIHJldHVybiB0aW1lcjtcclxuICAgIH0sXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGwoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJ0aW1lclwiLCBUaW55LlRpbWVyQ3JlYXRvcik7XHJcbiIsIi8qKlxyXG4gKiBUd2Vlbi5qcyAtIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qcy9ncmFwaHMvY29udHJpYnV0b3JzIGZvciB0aGUgZnVsbCBsaXN0IG9mIGNvbnRyaWJ1dG9ycy5cclxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXHJcbiAqL1xyXG5cclxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX3R3ZWVucyA9IHt9O1xyXG4gICAgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcclxufTtcclxuXHJcbl9Hcm91cC5wcm90b3R5cGUgPSB7XHJcbiAgICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKS5tYXAoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICh0d2VlbklkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcylcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl90d2VlbnMgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcclxuICAgICAgICB2YXIgaWQgPSB0d2Vlbi5nZXRJZCgpO1xyXG4gICAgICAgIHRoaXMuX3R3ZWVuc1tpZF0gPSB0d2VlbjtcclxuICAgICAgICB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVtpZF0gPSB0d2VlbjtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcclxuICAgICAgICB2YXIgaWQgPSB0d2Vlbi5nZXRJZCgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl90d2VlbnNbaWRdO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVtpZF07XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRlbHRhLCBwcmVzZXJ2ZSkge1xyXG4gICAgICAgIHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XHJcblxyXG4gICAgICAgIGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBUV0VFTi5ub3coKTtcclxuXHJcbiAgICAgICAgLy8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhblxyXG4gICAgICAgIC8vIHVwZGF0ZSwgdGhlbiB0aGUgbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cclxuICAgICAgICAvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC5cclxuICAgICAgICAvLyBIb3dldmVyLCBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLFxyXG4gICAgICAgIC8vIHRoZW4gaXQgd2lsbCBub3QgYmUgdXBkYXRlZC5cclxuICAgICAgICB3aGlsZSAodHdlZW5JZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHR3ZWVuID0gdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHdlZW4gJiYgdHdlZW4udXBkYXRlKGRlbHRhKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0d2Vlbi5faXNQbGF5aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJlc2VydmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIFRXRUVOID0gbmV3IF9Hcm91cCgpO1xyXG5cclxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XHJcblRXRUVOLl9uZXh0SWQgPSAwO1xyXG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gVFdFRU4uX25leHRJZCsrO1xyXG59O1xyXG5cclxuLy8gLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbC5cclxuLy8gLy8gSW4gbm9kZS5qcywgdXNlIHByb2Nlc3MuaHJ0aW1lLlxyXG4vLyBpZiAodHlwZW9mIChzZWxmKSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIChwcm9jZXNzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5ocnRpbWUpIHtcclxuLy8gIFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XHJcblxyXG4vLyAgICAgIC8vIENvbnZlcnQgW3NlY29uZHMsIG5hbm9zZWNvbmRzXSB0byBtaWxsaXNlY29uZHMuXHJcbi8vICAgICAgcmV0dXJuIHRpbWVbMF0gKiAxMDAwICsgdGltZVsxXSAvIDEwMDAwMDA7XHJcbi8vICB9O1xyXG4vLyB9XHJcbi8vIC8vIEluIGEgYnJvd3NlciwgdXNlIHNlbGYucGVyZm9ybWFuY2Uubm93IGlmIGl0IGlzIGF2YWlsYWJsZS5cclxuLy8gZWxzZSBpZiAodHlwZW9mIChzZWxmKSAhPT0gJ3VuZGVmaW5lZCcgJiZcclxuLy8gICAgICAgICAgc2VsZi5wZXJmb3JtYW5jZSAhPT0gdW5kZWZpbmVkICYmXHJcbi8vICAgICAgIHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuLy8gIC8vIFRoaXMgbXVzdCBiZSBib3VuZCwgYmVjYXVzZSBkaXJlY3RseSBhc3NpZ25pbmcgdGhpcyBmdW5jdGlvblxyXG4vLyAgLy8gbGVhZHMgdG8gYW4gaW52b2NhdGlvbiBleGNlcHRpb24gaW4gQ2hyb21lLlxyXG4vLyAgVFdFRU4ubm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxuLy8gfVxyXG4vLyAvLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG4vLyBlbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcbi8vICBUV0VFTi5ub3cgPSBEYXRlLm5vdztcclxuLy8gfVxyXG4vLyAvLyBPdGhlcndpc2UsIHVzZSAnbmV3IERhdGUoKS5nZXRUaW1lKCknLlxyXG4vLyBlbHNlIHtcclxuLy8gIFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbi8vICB9O1xyXG4vLyB9XHJcblxyXG5UaW55LlR3ZWVuID0gZnVuY3Rpb24gKG9iamVjdCwgZ3JvdXApIHtcclxuICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAvLyB0aGlzLl9wYXVzZVN0YXJ0ID0gbnVsbDtcclxuICAgIHRoaXMuX29iamVjdCA9IG9iamVjdDtcclxuICAgIHRoaXMuX3ZhbHVlc1N0YXJ0ID0ge307XHJcbiAgICB0aGlzLl92YWx1ZXNFbmQgPSB7fTtcclxuICAgIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XHJcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDEwMDA7XHJcbiAgICB0aGlzLl9yZXBlYXQgPSAwO1xyXG4gICAgdGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5feW95byA9IGZhbHNlO1xyXG4gICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZGVsYXlUaW1lID0gMDtcclxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IG51bGw7XHJcbiAgICB0aGlzLl90aW1lID0gMDtcclxuICAgIHRoaXMuX2Vhc2luZ0Z1bmN0aW9uID0gVGlueS5FYXNpbmcuTGluZWFyLk5vbmU7XHJcbiAgICB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBUaW55LkludGVycG9sYXRpb24uTGluZWFyO1xyXG4gICAgdGhpcy5fY2hhaW5lZFR3ZWVucyA9IFtdO1xyXG4gICAgdGhpcy5fb25TdGFydENhbGxiYWNrID0gbnVsbDtcclxuICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gbnVsbDtcclxuICAgIHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgPSBudWxsO1xyXG4gICAgdGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcclxuICAgIHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcclxuICAgIHRoaXMuX2dyb3VwID0gZ3JvdXAgfHwgVFdFRU47XHJcbiAgICB0aGlzLl9pZCA9IFRXRUVOLm5leHRJZCgpO1xyXG59O1xyXG5cclxuVGlueS5Ud2Vlbi5wcm90b3R5cGUgPSB7XHJcbiAgICBnZXRJZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG4gICAgaXNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUGxheWluZztcclxuICAgIH0sXHJcblxyXG4gICAgaXNQYXVzZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNQYXVzZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvOiBmdW5jdGlvbiAocHJvcGVydGllcywgZHVyYXRpb24pIHtcclxuICAgICAgICB0aGlzLl92YWx1ZXNFbmQgPSBPYmplY3QuY3JlYXRlKHByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICBpZiAoZHVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGR1cmF0aW9uOiBmdW5jdGlvbiBkdXJhdGlvbihkKSB7XHJcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSBkO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKHJlc2V0KSB7XHJcbiAgICAgICAgdGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RpbWUgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLl9kZWxheVRpbWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbG9jYWwgY29weSBvZiB0aGUgQXJyYXkgd2l0aCB0aGUgc3RhcnQgdmFsdWUgYXQgdGhlIGZyb250XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcclxuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vYmplY3RbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTYXZlIHRoZSBzdGFydGluZyB2YWx1ZSwgb25seSBvbmNlIC0gaWYgcmVzZXQgc2V0IHRvIGZhbHNlLlxyXG4gICAgICAgICAgICBpZiAocmVzZXQgPT0gdHJ1ZSB8fCB0eXBlb2YgdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzUGxheWluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vblN0b3BDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZShJbmZpbml0eSwgSW5maW5pdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1BhdXNlZCB8fCAhdGhpcy5faXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyB0aGlzLl9wYXVzZVN0YXJ0ID0gdGltZSA9PT0gdW5kZWZpbmVkID8gVFdFRU4ubm93KCkgOiB0aW1lO1xyXG5cclxuICAgICAgICB0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzUGF1c2VkIHx8ICF0aGlzLl9pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyB0aGlzLl9zdGFydFRpbWUgKz0gKHRpbWUgPT09IHVuZGVmaW5lZCA/IFRXRUVOLm5vdygpIDogdGltZSlcclxuICAgICAgICAvLyAgLSB0aGlzLl9wYXVzZVN0YXJ0O1xyXG5cclxuICAgICAgICAvLyB0aGlzLl9wYXVzZVN0YXJ0ID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcENoYWluZWRUd2VlbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ3JvdXA6IGZ1bmN0aW9uIChncm91cCkge1xyXG4gICAgICAgIHRoaXMuX2dyb3VwID0gZ3JvdXA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGF5OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5fZGVsYXlUaW1lID0gYW1vdW50O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXBlYXQ6IGZ1bmN0aW9uICh0aW1lcykge1xyXG4gICAgICAgIHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXBlYXREZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgIHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgeW95bzogZnVuY3Rpb24gKHlveW8pIHtcclxuICAgICAgICB0aGlzLl95b3lvID0geW95bztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZWFzaW5nOiBmdW5jdGlvbiAoZWFzaW5nRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhc2luZ0Z1bmN0aW9uO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiAoaW50ZXJwb2xhdGlvbkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gaW50ZXJwb2xhdGlvbkZ1bmN0aW9uO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFpbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uU3RhcnQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblVwZGF0ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblJlcGVhdDogZnVuY3Rpb24gb25SZXBlYXQoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblN0b3A6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX29uU3RvcENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRlbHRhKSB7XHJcbiAgICAgICAgdmFyIHByb3BlcnR5O1xyXG4gICAgICAgIHZhciBlbGFwc2VkO1xyXG4gICAgICAgIHZhciB2YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGltZSArPSBkZWx0YTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWUgPCB0aGlzLl9zdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGFwc2VkID0gKHRoaXMuX3RpbWUgLSB0aGlzLl9zdGFydFRpbWUpIC8gdGhpcy5fZHVyYXRpb247XHJcbiAgICAgICAgZWxhcHNlZCA9IHRoaXMuX2R1cmF0aW9uID09PSAwIHx8IGVsYXBzZWQgPiAxID8gMSA6IGVsYXBzZWQ7XHJcblxyXG4gICAgICAgIHZhbHVlID0gdGhpcy5fZWFzaW5nRnVuY3Rpb24oZWxhcHNlZCk7XHJcblxyXG4gICAgICAgIGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XHJcbiAgICAgICAgICAgIC8vIERvbid0IHVwZGF0ZSBwcm9wZXJ0aWVzIHRoYXQgZG8gbm90IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbmQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbihlbmQsIHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW5kID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZC5jaGFyQXQoMCkgPT09IFwiK1wiIHx8IGVuZC5jaGFyQXQoMCkgPT09IFwiLVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgcGFyc2VGbG9hdChlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IG5vbiBudW1lcmljIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QsIGVsYXBzZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVsYXBzZWQgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZSA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVwZWF0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRmluaXRlKHRoaXMuX3JlcGVhdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXBlYXQtLTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xyXG4gICAgICAgICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl95b3lvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl95b3lvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmV2ZXJzZWQgPSAhdGhpcy5fcmV2ZXJzZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlcGVhdERlbGF5VGltZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gdGhpcy5fcmVwZWF0RGVsYXlUaW1lO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLl9kZWxheVRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vblJlcGVhdENhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgdGhlIGNoYWluZWQgdHdlZW5zIHN0YXJ0IGV4YWN0bHkgYXQgdGhlIHRpbWUgdGhleSBzaG91bGQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkVhc2luZyA9IHtcclxuICAgIExpbmVhcjoge1xyXG4gICAgICAgIE5vbmU6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUXVhZHJhdGljOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrICogaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrICogKDIgLSBrKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGsgKiBrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgtLWsgKiAoayAtIDIpIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDdWJpYzoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gayAqIGsgKiBrO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0tayAqIGsgKiBrICsgMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGsgKiBrICogaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICsgMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBRdWFydGljOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrICogayAqIGsgKiBrO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEgLSAtLWsgKiBrICogayAqIGs7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUXVpbnRpYzoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gayAqIGsgKiBrICogayAqIGs7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAqIGsgKyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNpbnVzb2lkYWw6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEgLSBNYXRoLmNvcygoayAqIE1hdGguUEkpIC8gMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zaW4oKGsgKiBNYXRoLlBJKSAvIDIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogaykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRXhwb25lbnRpYWw6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0xMCAqIGspO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoayA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChrID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDEwMjQsIGsgLSAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENpcmN1bGFyOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSAtLWsgKiBrKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5zcXJ0KDEgLSBrICogaykgLSAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtIChrIC09IDIpICogaykgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEVsYXN0aWM6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgaWYgKGsgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoayA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAtTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIGlmIChrID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGsgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoayA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChrID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgayAqPSAyO1xyXG5cclxuICAgICAgICAgICAgaWYgKGsgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIE1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAtMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBCYWNrOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIC0tayAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1OCAqIDEuNTI1O1xyXG5cclxuICAgICAgICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQm91bmNlOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxIC0gVGlueS5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoayA8IDEgLyAyLjc1KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogayAqIGs7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoayA8IDIgLyAyLjc1KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKGsgLT0gMS41IC8gMi43NSkgKiBrICsgMC43NTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrIDwgMi41IC8gMi43NSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIChrIC09IDIuMjUgLyAyLjc1KSAqIGsgKyAwLjkzNzU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKGsgLT0gMi42MjUgLyAyLjc1KSAqIGsgKyAwLjk4NDM3NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICBpZiAoayA8IDAuNSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRpbnkuRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBUaW55LkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5JbnRlcnBvbGF0aW9uID0ge1xyXG4gICAgTGluZWFyOiBmdW5jdGlvbiAodiwgaykge1xyXG4gICAgICAgIHZhciBtID0gdi5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBmID0gbSAqIGs7XHJcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG4gICAgICAgIHZhciBmbiA9IFRpbnkuSW50ZXJwb2xhdGlvbi5VdGlscy5MaW5lYXI7XHJcblxyXG4gICAgICAgIGlmIChrIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEJlemllcjogZnVuY3Rpb24gKHYsIGspIHtcclxuICAgICAgICB2YXIgYiA9IDA7XHJcbiAgICAgICAgdmFyIG4gPSB2Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdmFyIHB3ID0gTWF0aC5wb3c7XHJcbiAgICAgICAgdmFyIGJuID0gVGlueS5JbnRlcnBvbGF0aW9uLlV0aWxzLkJlcm5zdGVpbjtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGI7XHJcbiAgICB9LFxyXG5cclxuICAgIENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XHJcbiAgICAgICAgdmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdmFyIGYgPSBtICogaztcclxuICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoZik7XHJcbiAgICAgICAgdmFyIGZuID0gVGlueS5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XHJcblxyXG4gICAgICAgIGlmICh2WzBdID09PSB2W21dKSB7XHJcbiAgICAgICAgICAgIGlmIChrIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgaSA9IE1hdGguZmxvb3IoKGYgPSBtICogKDEgKyBrKSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoayA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2WzBdIC0gKGZuKHZbMF0sIHZbMF0sIHZbMV0sIHZbMV0sIC1mKSAtIHZbMF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2W21dIC0gKGZuKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVXRpbHM6IHtcclxuICAgICAgICBMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XHJcbiAgICAgICAgICAgIHZhciBmYyA9IFRpbnkuSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhID0gWzFdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcyA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFbbl0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVtuXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gbjsgaSA+IDE7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHMgKj0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBhW25dID0gcztcclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCksXHJcblxyXG4gICAgICAgIENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xyXG4gICAgICAgICAgICB2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XHJcbiAgICAgICAgICAgIHZhciB2MSA9IChwMyAtIHAxKSAqIDAuNTtcclxuICAgICAgICAgICAgdmFyIHQyID0gdCAqIHQ7XHJcbiAgICAgICAgICAgIHZhciB0MyA9IHQgKiB0MjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoMiAqIHAxIC0gMiAqIHAyICsgdjAgKyB2MSkgKiB0MyArICgtMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlR3ZWVuTWFuYWdlciA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5idWZmZXJMaXN0ID0gW107XHJcbiAgICB0aGlzLmdyb3VwID0gbmV3IF9Hcm91cCgpO1xyXG59O1xyXG5cclxuVGlueS5Ud2Vlbk1hbmFnZXIucHJvdG90eXBlID0ge1xyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcclxuICAgICAgICB0aGlzLmdyb3VwLnJlbW92ZSh0d2Vlbik7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGlueS5Ud2VlbihvYmosIHRoaXMuZ3JvdXApO1xyXG4gICAgfSxcclxuXHJcbiAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyTGlzdC5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrIGluIHRoaXMuZ3JvdXAuX3R3ZWVucykge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlckxpc3QucHVzaCh0aGlzLmdyb3VwLl90d2VlbnNba10pO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwLl90d2VlbnNba10ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc3VtZSgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnVmZmVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlckxpc3RbaV0ucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJ1ZmZlckxpc3QubGVuZ3RoID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGVsdGEpIHtcclxuICAgICAgICB0aGlzLmdyb3VwLnVwZGF0ZShkZWx0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlckxpc3QubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLmdyb3VwLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcInR3ZWVuc1wiLCBUaW55LlR3ZWVuTWFuYWdlcik7XHJcbiIsIlRpbnkuUmVuZGVyVGV4dHVyZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCByZW5kZXJlciwgcmVzb2x1dGlvbikge1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDEwMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMDtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgIHJlc29sdXRpb24gPSByZXNvbHV0aW9uIHx8IDE7XHJcblxyXG4gICAgLy8gdGhpcy5mcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgLy8gdGhpcy5jcm9wID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlID0gbmV3IFRpbnkuQmFzZVRleHR1cmUoKTtcclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLmhhc0xvYWRlZCA9IHRydWU7XHJcbiAgICB0aGlzLnRleHR1cmVCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIodGhpcy53aWR0aCAqIHJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogcmVzb2x1dGlvbik7XHJcblxyXG4gICAgVGlueS5UZXh0dXJlLmNhbGwoXHJcbiAgICAgICAgdGhpcyxcclxuICAgICAgICB0aGlzLnRleHR1cmVCdWZmZXIuY2FudmFzLFxyXG4gICAgICAgIG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCBNYXRoLmZsb29yKHRoaXMud2lkdGggKiByZXNvbHV0aW9uKSwgTWF0aC5mbG9vcih0aGlzLmhlaWdodCAqIHJlc29sdXRpb24pKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xyXG5cclxuICAgIC8vIHRoaXMuaGFzTG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXIgfHwgVGlueS5kZWZhdWx0UmVuZGVyZXI7XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlRleHR1cmUucHJvdG90eXBlKTtcclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmVuZGVyVGV4dHVyZTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHVwZGF0ZUJhc2UpIHtcclxuICAgIGlmICh3aWR0aCA9PT0gdGhpcy53aWR0aCAmJiBoZWlnaHQgPT09IHRoaXMuaGVpZ2h0KSByZXR1cm47XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IHdpZHRoID4gMCAmJiBoZWlnaHQgPiAwO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5mcmFtZS53aWR0aCA9IHRoaXMuY3JvcC53aWR0aCA9IHdpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgdGhpcy5mcmFtZS5oZWlnaHQgPSB0aGlzLmNyb3AuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGlmICh1cGRhdGVCYXNlKSB7XHJcbiAgICAgICAgLy8gdGhpcy5iYXNlVGV4dHVyZS53aWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAgICAgLy8gdGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMudmFsaWQpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnRleHR1cmVCdWZmZXIucmVzaXplKHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMudmFsaWQpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnRleHR1cmVCdWZmZXIuY2xlYXIoKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGRpc3BsYXlPYmplY3QsIG1hdHJpeCwgY2xlYXIpIHtcclxuICAgIGlmICghdGhpcy52YWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIHZhciB3dCA9IGRpc3BsYXlPYmplY3Qud29ybGRUcmFuc2Zvcm07XHJcbiAgICB3dC5pZGVudGl0eSgpO1xyXG4gICAgaWYgKG1hdHJpeCkgd3QuYXBwZW5kKG1hdHJpeCk7XHJcblxyXG4gICAgLy8gc2V0V29ybGQgQWxwaGEgdG8gZW5zdXJlIHRoYXQgdGhlIG9iamVjdCBpcyByZW5kZXJlciBhdCBmdWxsIG9wYWNpdHlcclxuICAgIGRpc3BsYXlPYmplY3Qud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgLy8gVGltZSB0byB1cGRhdGUgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgZGlzcGxheU9iamVjdCB3aXRoIHRoZSBuZXcgbWF0cml4Li5cclxuICAgIHZhciBjaGlsZHJlbiA9IGRpc3BsYXlPYmplY3QuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICBjaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xlYXIpIHRoaXMudGV4dHVyZUJ1ZmZlci5jbGVhcigpO1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gdGhpcy50ZXh0dXJlQnVmZmVyLmNvbnRleHQ7XHJcblxyXG4gICAgdmFyIHJlYWxSZXNvbHV0aW9uID0gdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlck9iamVjdChkaXNwbGF5T2JqZWN0LCBjb250ZXh0KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlc29sdXRpb24gPSByZWFsUmVzb2x1dGlvbjtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0SW1hZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltYWdlLnNyYyA9IHRoaXMuZ2V0QmFzZTY0KCk7XHJcbiAgICByZXR1cm4gaW1hZ2U7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldEJhc2U2NCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldENhbnZhcygpLnRvRGF0YVVSTCgpO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5nZXRDYW52YXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50ZXh0dXJlQnVmZmVyLmNhbnZhcztcclxufTtcclxuIiwiLy8gVGlueS5UZXh0dXJlQ2FjaGUgPSB7fTtcclxuLy8gVGlueS5GcmFtZUNhY2hlID0ge307XHJcblRpbnkuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3IgPSAwO1xyXG5UaW55LlRleHR1cmVTaWxlbnRGYWlsID0gZmFsc2U7XHJcblxyXG5UaW55LlRleHR1cmUgPSBmdW5jdGlvbiAoc291cmNlLCBmcmFtZSwgY3JvcCwgdHJpbSkge1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIHRoaXMuaGFzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFmcmFtZSkge1xyXG4gICAgICAgIHRoaXMubm9GcmFtZSA9IHRydWU7XHJcbiAgICAgICAgZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBrZXkgPSBzb3VyY2U7XHJcblxyXG4gICAgICAgIHNvdXJjZSA9IFRpbnkuQ2FjaGUuaW1hZ2Vba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UpIHRocm93IG5ldyBFcnJvcihcIkNhY2hlIEVycm9yOiBpbWFnZSBcIiArIGtleSArIFwiIGRvZXNgdCBmb3VuZCBpbiBjYWNoZVwiKTtcclxuXHJcbiAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW2tleV0gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy50cmltID0gdHJpbTtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG5cclxuICAgIHRoaXMuY3JvcCA9IGNyb3AgfHwgbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIGlmICgodGhpcy5zb3VyY2UuY29tcGxldGUgfHwgdGhpcy5zb3VyY2UuZ2V0Q29udGV4dCkgJiYgdGhpcy5zb3VyY2Uud2lkdGggJiYgdGhpcy5zb3VyY2UuaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5vblNvdXJjZUxvYWRlZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc291cmNlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUub25Tb3VyY2VMb2FkZWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGV4dHVyZTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUub25Tb3VyY2VMb2FkZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmhhc0xvYWRlZCA9IHRydWU7XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5zb3VyY2UubmF0dXJhbFdpZHRoIHx8IHRoaXMuc291cmNlLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLnNvdXJjZS5uYXR1cmFsSGVpZ2h0IHx8IHRoaXMuc291cmNlLmhlaWdodDtcclxuXHJcbiAgICBpZiAodGhpcy5ub0ZyYW1lKSB0aGlzLmZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLnNldEZyYW1lKHRoaXMuZnJhbWUpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5hZGRUb0NhY2hlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgVGlueS5DYWNoZS50ZXh0dXJlW2tleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5rZXkpIHtcclxuICAgICAgICBkZWxldGUgVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMua2V5XTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLnNldEZyYW1lID0gZnVuY3Rpb24gKGZyYW1lKSB7XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZyYW1lICYmIGZyYW1lLndpZHRoICYmIGZyYW1lLmhlaWdodCAmJiB0aGlzLnNvdXJjZSAmJiB0aGlzLmhhc0xvYWRlZDtcclxuXHJcbiAgICBpZiAoIXRoaXMudmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICAvLyB0aGlzLmhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLmNyb3AueCA9IGZyYW1lLng7XHJcbiAgICB0aGlzLmNyb3AueSA9IGZyYW1lLnk7XHJcbiAgICB0aGlzLmNyb3Aud2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgIHRoaXMuY3JvcC5oZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLnRyaW0gJiYgKGZyYW1lLnggKyBmcmFtZS53aWR0aCA+IHRoaXMud2lkdGggfHwgZnJhbWUueSArIGZyYW1lLmhlaWdodCA+IHRoaXMuaGVpZ2h0KSkge1xyXG4gICAgICAgIGlmICghVGlueS5UZXh0dXJlU2lsZW50RmFpbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZXh0dXJlIEVycm9yOiBmcmFtZSBkb2VzIG5vdCBmaXQgaW5zaWRlIHRoZSBiYXNlIFRleHR1cmUgZGltZW5zaW9ucyBcIiArIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50cmltKSB7XHJcbiAgICAgICAgLy8gdGhpcy53aWR0aCA9IHRoaXMudHJpbS53aWR0aDtcclxuICAgICAgICAvLyB0aGlzLmhlaWdodCA9IHRoaXMudHJpbS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5mcmFtZS53aWR0aCA9IHRoaXMudHJpbS53aWR0aDtcclxuICAgICAgICB0aGlzLmZyYW1lLmhlaWdodCA9IHRoaXMudHJpbS5oZWlnaHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuZnJvbUltYWdlID0gZnVuY3Rpb24oa2V5LCBpbWFnZVVybCwgY3Jvc3NvcmlnaW4pXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVba2V5XTtcclxuXHJcbi8vICAgICBpZighdGV4dHVyZSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShUaW55LkJhc2VUZXh0dXJlLmZyb21JbWFnZShrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbikpO1xyXG4vLyAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5XHJcbi8vICAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVba2V5XSA9IHRleHR1cmU7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuZnJvbUZyYW1lID0gZnVuY3Rpb24oZnJhbWVJZClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtmcmFtZUlkXTtcclxuLy8gICAgIGlmKCF0ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmcmFtZUlkIFwiJyArIGZyYW1lSWQgKyAnXCIgZG9lcyBub3QgZXhpc3QgaW4gdGhlIHRleHR1cmUgY2FjaGUgJyk7XHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcblRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzID0gZnVuY3Rpb24gKGNhbnZhcykge1xyXG4gICAgLy8gaWYoIWNhbnZhcy5fdGlueUlkKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGNhbnZhcy5fdGlueUlkID0gJ19mcm9tX2NhbnZhc18nICsgVGlueS5UZXh0dXJlQ2FjaGVJZEdlbmVyYXRvcisrO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHZhciB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2NhbnZhcy5fdGlueUlkXTtcclxuXHJcbiAgICAvLyBpZighdGV4dHVyZSlcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZSggY2FudmFzICk7XHJcbiAgICAvLyAgICAgVGlueS5DYWNoZS50ZXh0dXJlW2NhbnZhcy5fdGlueUlkXSA9IHRleHR1cmU7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcmV0dXJuIHRleHR1cmU7XHJcbiAgICByZXR1cm4gbmV3IFRpbnkuVGV4dHVyZShjYW52YXMpO1xyXG59O1xyXG5cclxuLy8gVGlueS5UZXh0dXJlLmFkZFRleHR1cmVUb0NhY2hlID0gZnVuY3Rpb24odGV4dHVyZSwgaWQpXHJcbi8vIHtcclxuLy8gICAgIFRpbnkuVGV4dHVyZUNhY2hlW2lkXSA9IHRleHR1cmU7XHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlRleHR1cmUucmVtb3ZlVGV4dHVyZUZyb21DYWNoZSA9IGZ1bmN0aW9uKGlkKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2lkXTtcclxuLy8gICAgIGRlbGV0ZSBUaW55LlRleHR1cmVDYWNoZVtpZF07XHJcbi8vICAgICBkZWxldGUgVGlueS5CYXNlVGV4dHVyZUNhY2hlW2lkXTtcclxuLy8gICAgIHJldHVybiB0ZXh0dXJlO1xyXG4vLyB9O1xyXG4iLCJUaW55LkNhbnZhc0J1ZmZlciA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzQnVmZmVyO1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcclxuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59O1xyXG4iLCJmdW5jdGlvbiBFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuYSA9IFtdO1xyXG4gICAgdGhpcy5uID0gMDtcclxufVxyXG5cclxuVGlueS5FdmVudEVtaXR0ZXIgPSB7XHJcbiAgICBjYWxsOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICBvYmogPSBvYmoucHJvdG90eXBlIHx8IG9iajtcclxuICAgICAgICAgICAgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4ob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzX2V2ZW50cyA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBwdXNoTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XSA9IG5ldyBFdmVudExpc3RlbmVycygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0ZW5lcnMuYS5wdXNoKGZuLCBjb250ZXh0IHx8IG51bGwsIG9uY2UgfHwgZmFsc2UpO1xyXG4gICAgICAgICAgICBsaXN0ZW5lcnMubiArPSAzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2JqLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHB1c2hMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5vbiA9IHB1c2hMaXN0ZW5lcjtcclxuXHJcbiAgICAgICAgb2JqLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgZm4sIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbkFycmF5ID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF0uYTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZm4pIHtcclxuICAgICAgICAgICAgICAgIGZuQXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuQXJyYXlbaV0gPT0gZm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZuQXJyYXkubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpXSA9PSBmbiAmJiBmbkFycmF5W2kgKyAxXSA9PSBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZm5BcnJheS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGExLCBhMiwgYTMpIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbkFycmF5ID0gbGlzdGVuZXJzLmE7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5uID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgZm4sIGN0eDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGggLSBsaXN0ZW5lcnMubjsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICBmbiA9IGZuQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICBjdHggPSBmbkFycmF5W2kgKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpICsgMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8PSAxKSBmbi5jYWxsKGN0eCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZW4gPT0gMikgZm4uY2FsbChjdHgsIGExKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxlbiA9PSAzKSBmbi5jYWxsKGN0eCwgYTEsIGEyKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgZm4uY2FsbChjdHgsIGExLCBhMiwgYTMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIChmbkFycmF5W2kgKyAyXSlcclxuICAgICAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbkFycmF5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG4iLCJpZiAoIURhdGUubm93KSB7XHJcbiAgRGF0ZS5ub3cgPSBmdW5jdGlvbiBub3coKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBGbG9hdDMyQXJyYXkgPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gIHdpbmRvdy5GbG9hdDMyQXJyYXkgPSBBcnJheTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZShcIi4vbWluaS5qc1wiKTtcclxuXHJcbi8vIHJlcXVpcmUoJy4vc3lzdGVtcy9PYmplY3RDcmVhdG9yLmpzJyk7IC8vIDEgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL0xvYWRlci5qcycpOyAvLyAzIEtiXHJcbi8vIHJlcXVpcmUoJy4vc3lzdGVtcy9JbnB1dC5qcycpOyAvLyAxIEtiXHJcbi8vIHJlcXVpcmUoJy4vc3lzdGVtcy9UaW1lci5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvVHdlZW4uanNcIik7XHJcblxyXG5yZXF1aXJlKFwiLi9tYXRoL1JvdW5kZWRSZWN0YW5nbGUuanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL21hdGgvUG9seWdvbi5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vbWF0aC9DaXJjbGUuanNcIik7IC8vIDYgS2JcclxuXHJcbnJlcXVpcmUoXCIuL3JlbmRlcmVycy9HcmFwaGljc1JlbmRlcmVyLmpzXCIpOyAvLyA0S2JcclxuXHJcbnJlcXVpcmUoXCIuL29iamVjdHMvR3JhcGhpY3MuanNcIik7IC8vIDEwIEtiXHJcbi8vIHJlcXVpcmUoJy4vb2JqZWN0cy9UaWxpbmdTcHJpdGUuanMnKTsgLy8gNCBLYiAgICMjIyMjIyMjIyMjIyMjIyBUaWxpbmdTcHJpdGUgIGdhbWUuYWRkLnRpbGVzcHJpdGVcclxuXHJcbnJlcXVpcmUoXCIuL3RleHR1cmVzL1JlbmRlclRleHR1cmUuanNcIik7IC8vIDIgS2JcclxuXHJcbnJlcXVpcmUoXCIuL3V0aWxzL0NhbnZhc0J1ZmZlci5qc1wiKTsgLy8gMSBLYlxyXG5yZXF1aXJlKFwiLi9yZW5kZXJlcnMvQ2FudmFzTWFza01hbmFnZXIuanNcIik7IC8vIDFLYlxyXG5yZXF1aXJlKFwiLi9yZW5kZXJlcnMvQ2FudmFzVGludGVyLmpzXCIpOyAvLyAzIEtiICMjIyMjIyMjIyMjIyMjIyMgdGludCBmdW5jdGlvblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=