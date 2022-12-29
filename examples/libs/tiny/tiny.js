/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ (() => {


var noop = function() {};

Tiny.App = function(states)
{
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
    setTimeout(function()
    {
        self._boot();
    }, 0);
}

Tiny.App.prototype._boot = function()
{

    for (var i = 0; i < Tiny.systems.length; i++)
    {
        var system = Tiny.systems[i];

        var _sys_ = new system._class_(this);
        this.systems.push(_sys_);
        if (_sys_.update) this.updatable.push(_sys_);

        if (system.name) this[system.name] = _sys_;
    }

    if (Tiny.RAF) 
    {
        this.raf = new Tiny.RAF(this);
    }

    this.boot.call(this.callbackContext);

    var self = this;
    setTimeout(function()
    {
        if (self.load) self._preload();
        else self._create();
    }, 0)
}

Tiny.App.prototype._preload = function()
{
    this.preload.call(this.callbackContext);
    this.state = 1;
    this.load.start(this._create);
};

Tiny.App.prototype._create = function() 
{
    this.create.call(this.callbackContext);

    if (this.raf) 
    {
        this.raf.start();
    }

    this.state = 2;
}


Tiny.App.prototype.pause = function() 
{
    if (this.raf) 
    {
        this.raf.reset();
    }

    if (!this.paused)
    {
        for (var i = 0; i < this.systems.length; i++)
        {
            if (this.systems[i].pause) this.systems[i].pause();
        }

        this.paused = true;
    }
}

Tiny.App.prototype.resume = function()
{
    if (this.raf) 
    {
        this.raf.reset();
    }
    
    if (this.paused)
    {
        for (var i = 0; i < this.systems.length; i++)
        {
            if (this.systems[i].resume) this.systems[i].resume();
        }

        this.paused = false;
    }
}

Tiny.App.prototype._update = function(time, delta)
{
    if (!this.paused)
    {
        delta *= this.timeScale;
        this.update.call(this.callbackContext, time, delta);
        this.emit("update", delta);

        for (var i = 0; i < this.updatable.length; i++)
        {
            this.updatable[i].update(delta);
        }
    }
    else
    {
        this.pauseDuration += delta
    }

    this.render();
    this.emit("postrender");
}


Tiny.App.prototype.resize = function(width, height)
{
    this.width = width || this.width;
    this.height = height || this.height;

    if (this.state > 0) 
    {
        this._resize_cb.call(this.callbackContext, this.width, this.height);
    }

    var self = this;
    setTimeout(function()
    {
        if (self.input) self.input.updateBounds();
    }, 0)
}

Tiny.App.prototype.destroy = function(clearCache)
{
    for (var i = 0; i < this.systems.length; i++)
    {
        if (this.systems[i].destroy) this.systems[i].destroy(clearCache);
    }

    this.paused = true;

    if (clearCache) 
    {
        this.load.clearCache();
    }

    if (this.raf) 
    {
        this.raf.stop();
    }

    this._destroy_cb.call(this.callbackContext);
}


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
__webpack_require__(/*! ./math/Point.js */ "./src/math/Point.js");      //
__webpack_require__(/*! ./math/Matrix.js */ "./src/math/Matrix.js");     //
__webpack_require__(/*! ./math/Rectangle.js */ "./src/math/Rectangle.js");  //  8 Kb

__webpack_require__(/*! ./objects/BaseObject2D.js */ "./src/objects/BaseObject2D.js");             //
__webpack_require__(/*! ./objects/Object2D.js */ "./src/objects/Object2D.js");    //
__webpack_require__(/*! ./objects/Scene.js */ "./src/objects/Scene.js");                     // 10 Kb

__webpack_require__(/*! ./renderers/CanvasRenderer.js */ "./src/renderers/CanvasRenderer.js"); // 3 Kb

/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/***/ (() => {


Tiny.VERSION = "2.1.3";

Tiny.systems = [];

Tiny.registerSystem = function(name, system) {
    Tiny.systems.push({
        name: name,
        _class_: system
    });
}

Tiny.Primitives = {
    POLY: 0,
    RECT: 1, 
    CIRC: 2,
    ELIP: 3,
    RREC: 4,
    RREC_LJOIN: 5
}

Tiny.rnd = function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

Tiny.color2rgb = function(style) {
    return Tiny.hex2rgb(Tiny.style2hex(style));
}

Tiny.color2style = function(style) {
    return style;
};

Tiny.style2hex = function(style) {
    return +style.replace('#', '0x');
};

Tiny.hex2style = function(hex) {
    return "#" + ("00000" + ( hex | 0).toString(16)).substr(-6);
}

Tiny.hex2rgb = function(hex) {
    return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
};

Tiny.rgb2hex = function(rgb) {
    return ((rgb[0]*255 << 16) + (rgb[1]*255 << 8) + rgb[2]*255);
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

    if (diameter > 0)
    {
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

        if (typeof output === "undefined" || output === null)
        {
            output = new Tiny.Circle(this.x, this.y, this.diameter);
        }
        else
        {
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

        if (value > 0)
        {
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

        if (value > 0)
        {
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

        if (value > this.x)
        {
            this._radius = 0;
            this._diameter = 0;
        }
        else
        {
            this.radius = this.x - value;
        }

    }

});

Object.defineProperty(Tiny.Circle.prototype, "right", {

    get: function () {
        return this.x + this._radius;
    },

    set: function (value) {

        if (value < this.x)
        {
            this._radius = 0;
            this._diameter = 0;
        }
        else
        {
            this.radius = value - this.x;
        }

    }

});

Object.defineProperty(Tiny.Circle.prototype, "top", {

    get: function () {
        return this.y - this._radius;
    },

    set: function (value) {

        if (value > this.y)
        {
            this._radius = 0;
            this._diameter = 0;
        }
        else
        {
            this.radius = this.y - value;
        }

    }

});

Object.defineProperty(Tiny.Circle.prototype, "bottom", {

    get: function () {
        return this.y + this._radius;
    },

    set: function (value) {

        if (value < this.y)
        {
            this._radius = 0;
            this._diameter = 0;
        }
        else
        {
            this.radius = value - this.y;
        }

    }

});

Object.defineProperty(Tiny.Circle.prototype, "area", {

    get: function () {

        if (this._radius > 0)
        {
            return Math.PI * this._radius * this._radius;
        }
        else
        {
            return 0;
        }

    }

});

Object.defineProperty(Tiny.Circle.prototype, "empty", {

    get: function () {
        return (this._diameter === 0);
    },

    set: function (value) {

        if (value === true)
        {
            this.setTo(0, 0, 0);
        }

    }

});

Tiny.Circle.contains = function (a, x, y) {

    //  Check if x/y are within the bounds first
    if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y <= a.bottom)
    {
        var dx = (a.x - x) * (a.x - x);
        var dy = (a.y - y) * (a.y - y);

        return (dx + dy) <= (a.radius * a.radius);
    }
    else
    {
        return false;
    }

};

Tiny.Circle.equals = function (a, b) {
    return (a.x == b.x && a.y == b.y && a.diameter == b.diameter);
};

Tiny.Circle.intersects = function (a, b) {
    return (Tiny.Math.distance(a.x, a.y, b.x, b.y) <= (a.radius + b.radius));
};


Tiny.Circle.intersectsRectangle = function (c, r) {

    var cx = Math.abs(c.x - r.x - r.halfWidth);
    var xDist = r.halfWidth + c.radius;

    if (cx > xDist)
    {
        return false;
    }

    var cy = Math.abs(c.y - r.y - r.halfHeight);
    var yDist = r.halfHeight + c.radius;

    if (cy > yDist)
    {
        return false;
    }

    if (cx <= r.halfWidth || cy <= r.halfHeight)
    {
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

Tiny.Math.degToRad = function degToRad (degrees) {
    return degrees * degreeToRadiansFactor;
};

Tiny.Math.radToDeg = function radToDeg (radians) {
    return radians * radianToDegreesFactor;
};

/***/ }),

/***/ "./src/math/Matrix.js":
/*!****************************!*\
  !*** ./src/math/Matrix.js ***!
  \****************************/
/***/ (() => {


Tiny.Matrix = function()
{

    this.a = 1;

    this.b = 0;

    this.c = 0;

    this.d = 1;

    this.tx = 0;

    this.ty = 0;

    this.type = Tiny.MATRIX;

};

Tiny.Matrix.prototype.fromArray = function(array)
{
    this.a = array[0];
    this.b = array[1];
    this.c = array[3];
    this.d = array[4];
    this.tx = array[2];
    this.ty = array[5];
};


Tiny.Matrix.prototype.toArray = function(transpose)
{
    if (!this.array)
    {
        this.array = new Float32Array(9);
    }

    var array = this.array;

    if (transpose)
    {
        array[0] = this.a;
        array[1] = this.b;
        array[2] = 0;
        array[3] = this.c;
        array[4] = this.d;
        array[5] = 0;
        array[6] = this.tx;
        array[7] = this.ty;
        array[8] = 1;
    }
    else
    {
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

Tiny.Matrix.prototype.apply = function(pos, newPos)
{
    newPos = newPos || new Tiny.Point();

    var x = pos.x;
    var y = pos.y;

    newPos.x = this.a * x + this.c * y + this.tx;
    newPos.y = this.b * x + this.d * y + this.ty;

    return newPos;
};

Tiny.Matrix.prototype.applyInverse = function(pos, newPos)
{
    newPos = newPos || new Tiny.Point();

    var id = 1 / (this.a * this.d + this.c * -this.b);
    var x = pos.x;
    var y = pos.y;

    newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
    newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;

    return newPos;
};

Tiny.Matrix.prototype.translate = function(x, y)
{
    this.tx += x;
    this.ty += y;
    
    return this;
};

Tiny.Matrix.prototype.scale = function(x, y)
{
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;

    return this;
};

Tiny.Matrix.prototype.rotate = function(angle)
{
    var cos = Math.cos( angle );
    var sin = Math.sin( angle );

    var a1 = this.a;
    var c1 = this.c;
    var tx1 = this.tx;

    this.a = a1 * cos-this.b * sin;
    this.b = a1 * sin+this.b * cos;
    this.c = c1 * cos-this.d * sin;
    this.d = c1 * sin+this.d * cos;
    this.tx = tx1 * cos - this.ty * sin;
    this.ty = tx1 * sin + this.ty * cos;
 
    return this;
};

Tiny.Matrix.prototype.append = function(matrix)
{
    var a1 = this.a;
    var b1 = this.b;
    var c1 = this.c;
    var d1 = this.d;

    this.a  = matrix.a * a1 + matrix.b * c1;
    this.b  = matrix.a * b1 + matrix.b * d1;
    this.c  = matrix.c * a1 + matrix.d * c1;
    this.d  = matrix.c * b1 + matrix.d * d1;

    this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
    this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
    
    return this;
};

Tiny.Matrix.prototype.identity = function()
{
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
        this.y = y || ( (y !== 0) ? this.x : 0 );

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

    if (arguments.length > 0)
    {
        this.setTo.apply(this, arguments);
    }
    this.closed = true;
    this.type = Tiny.Primitives.POLY;

};

Tiny.Polygon.prototype = {

    toNumberArray: function (output) {

        if (typeof output === 'undefined') { output = []; }

        for (var i = 0; i < this._points.length; i++)
        {
            if (typeof this._points[i] === 'number')
            {
                output.push(this._points[i]);
                output.push(this._points[i + 1]);
                i++;
            }
            else
            {
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

        if (typeof output === "undefined" || output === null)
        {
            output = new Tiny.Polygon(points);
        }
        else
        {
            output.setTo(points);
        }

        return output;

    },

    contains: function (x, y) {

        var length = this._points.length;
        var inside = false;

        for (var i = -1, j = length - 1; ++i < length; j = i)
        {
            var ix = this._points[i].x;
            var iy = this._points[i].y;

            var jx = this._points[j].x;
            var jy = this._points[j].y;

            if (((iy <= y && y < jy) || (jy <= y && y < iy)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix))
            {
                inside = !inside;
            }
        }

        return inside;

    },

    setTo: function (points) {

        this.area = 0;
        this._points = [];

        if (arguments.length > 0)
        {
            //  If points isn't an array, use arguments as the array
            if (!Array.isArray(points))
            {
                points = Array.prototype.slice.call(arguments);
            }

            var y0 = Number.MAX_VALUE;

            //  Allows for mixed-type arguments
            for (var i = 0, len = points.length; i < len; i++)
            {
                if (typeof points[i] === 'number')
                {
                    var p = new Tiny.Point(points[i], points[i + 1]);
                    i++;
                }
                else
                {
                    var p = new Tiny.Point(points[i].x, points[i].y);
                }

                this._points.push(p);

                //  Lowest boundary
                if (p.y < y0)
                {
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

        for (var i = 0, len = this._points.length; i < len; i++)
        {
            p1 = this._points[i];

            if (i === len - 1)
            {
                p2 = this._points[0];
            }
            else
            {
                p2 = this._points[i + 1];
            }

            avgHeight = ((p1.y - y0) + (p2.y - y0)) / 2;
            width = p1.x - p2.x;
            this.area += avgHeight * width;
        }

        return this.area;

    }

};

Tiny.Polygon.prototype.constructor = Tiny.Polygon;

Object.defineProperty(Tiny.Polygon.prototype, 'points', {

    get: function() {
        return this._points;
    },

    set: function(points) {

        if (points != null)
        {
            this.setTo(points);
        }
        else
        {
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

    this.type = Tiny.Primitives.RECT
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

    if (a.width <= 0 || a.height <= 0)
    {
        return false;
    }

    return (x >= a.x && x < a.right && y >= a.y && y < a.bottom);

};

Tiny.Rectangle.containsPoint = function (a, point) {

    return Tiny.Rectangle.contains(a, point.x, point.y);

};

Tiny.Rectangle.containsRect = function (a, b) {

    //  If the given rect has a larger volume than this one then it can never contain it
    if (a.volume > b.volume)
    {
        return false;
    }

    return (a.x >= b.x && a.y >= b.y && a.right < b.right && a.bottom < b.bottom);

};

Tiny.Rectangle.intersects = function (a, b) {

    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0)
    {
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

Tiny.RoundedRectangle = function(x, y, width, height, radius)
{

    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.radius = radius || 20;
    this.type = Tiny.Primitives.RREC;
};

Tiny.RoundedRectangle.prototype.clone = function()
{
    return new Tiny.RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
};

Tiny.RoundedRectangle.prototype.contains = function(x, y)
{
    if (this.width <= 0 || this.height <= 0)
    {
        return false;
    }

    var x1 = this.x;

    if (x >= x1 && x <= x1 + this.width)
    {
        var y1 = this.y;

        if (y >= y1 && y <= y1 + this.height)
        {
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

__webpack_require__(/*! ./base.js */ "./src/base.js")


__webpack_require__(/*! ./systems/RAF.js */ "./src/systems/RAF.js"); // 2 Kb
// require('./systems/ObjectCreator.js'); // 1 Kb
__webpack_require__(/*! ./systems/Loader.js */ "./src/systems/Loader.js"); // 3 Kb
__webpack_require__(/*! ./systems/Input.js */ "./src/systems/Input.js"); // 1 Kb
__webpack_require__(/*! ./systems/Timer.js */ "./src/systems/Timer.js"); // 1 Kb

__webpack_require__(/*! ./utils/EventEmitter.js */ "./src/utils/EventEmitter.js");

__webpack_require__(/*! ./textures/Texture.js */ "./src/textures/Texture.js");		// 4 Kb

__webpack_require__(/*! ./objects/Sprite.js */ "./src/objects/Sprite.js"); // 3 Kb
__webpack_require__(/*! ./objects/Text.js */ "./src/objects/Text.js"); // 5 Kb




/***/ }),

/***/ "./src/objects/BaseObject2D.js":
/*!*************************************!*\
  !*** ./src/objects/BaseObject2D.js ***!
  \*************************************/
/***/ (() => {


var pi2 = Math.PI * 2;

Tiny.BaseObject2D = function()
{
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


Tiny.BaseObject2D.prototype.destroy = function()
{
    if (this.parent)
        this.parent.remove( this )

    this.parent = null;
    this.worldTransform = null;
    this.visible = false;
    this.renderable = false;
    this._destroyCachedSprite();
};

Object.defineProperty(Tiny.BaseObject2D.prototype, 'worldVisible', {

    get: function() {

        var item = this;

        do
        {
            if (!item.visible) return false;
            item = item.parent;
        }
        while(item);

        return true;
    }

});

Object.defineProperty(Tiny.BaseObject2D.prototype, 'cacheAsBitmap', {

    get: function() {
        return  this._cacheAsBitmap;
    },

    set: function(value) {

        if (this._cacheAsBitmap === value) return;

        if (value)
        {
            this._generateCachedSprite();
        }
        else
        {
            this._destroyCachedSprite();
        }

        this._cacheAsBitmap = value;
    }
});

Tiny.BaseObject2D.prototype.updateTransform = function()
{
    if (!this.parent)
    {
        return;
    }

    // create some matrix refs for easy access
    var pt = this.parent.worldTransform;
    var wt = this.worldTransform;

    // temporary matrix variables
    var a, b, c, d, tx, ty;

    // so if rotation is between 0 then we can simplify the multiplication process..
    if (this.rotation % pi2)
    {
        // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
        if (this.rotation !== this.rotationCache)
        {
            this.rotationCache = this.rotation;
            this._sr = Math.sin(this.rotation);
            this._cr = Math.cos(this.rotation);
        }

        // get the matrix values of the displayobject based on its transform properties..
        a  =  this._cr * this.scale.x;
        b  =  this._sr * this.scale.x;
        c  = -this._sr * this.scale.y;
        d  =  this._cr * this.scale.y;
        tx =  this.position.x;
        ty =  this.position.y;
        
        // check for pivot.. not often used so geared towards that fact!
        if (this.pivot.x || this.pivot.y)
        {
            tx -= this.pivot.x * a + this.pivot.y * c;
            ty -= this.pivot.x * b + this.pivot.y * d;
        }

        // concat the parent matrix with the objects transform.
        wt.a  = a  * pt.a + b  * pt.c;
        wt.b  = a  * pt.b + b  * pt.d;
        wt.c  = c  * pt.a + d  * pt.c;
        wt.d  = c  * pt.b + d  * pt.d;
        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
        wt.ty = tx * pt.b + ty * pt.d + pt.ty;
    }
    else
    {
        // lets do the fast version as we know there is no rotation..
        a  = this.scale.x;
        d  = this.scale.y;

        tx = this.position.x - this.pivot.x * a;
        ty = this.position.y - this.pivot.y * d;

        wt.a  = a  * pt.a;
        wt.b  = a  * pt.b;
        wt.c  = d  * pt.c;
        wt.d  = d  * pt.d;
        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
        wt.ty = tx * pt.b + ty * pt.d + pt.ty;
    }

    // multiply the alphas..
    this.worldAlpha = this.alpha * this.parent.worldAlpha;

};

// performance increase to avoid using call.. (10x faster)
Tiny.BaseObject2D.prototype.displayObjectUpdateTransform = Tiny.BaseObject2D.prototype.updateTransform;

Tiny.BaseObject2D.prototype.getBounds = function(matrix)
{
    // matrix = matrix;//just to get passed js hinting (and preserve inheritance)
    return Tiny.EmptyRectangle;
};

Tiny.BaseObject2D.prototype.getLocalBounds = function()
{
    return this.getBounds(Tiny.identityMatrix);
};

Tiny.BaseObject2D.prototype.generateTexture = function(resolution, renderer)
{
    var bounds = this.getLocalBounds();

    var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0, renderer, resolution);
    
    Tiny.BaseObject2D._tempMatrix.tx = -bounds.x;
    Tiny.BaseObject2D._tempMatrix.ty = -bounds.y;
    
    renderTexture.render(this, Tiny.BaseObject2D._tempMatrix);

    return renderTexture;
};

Tiny.BaseObject2D.prototype.updateCache = function()
{
    this._generateCachedSprite();
};


Tiny.BaseObject2D.prototype.toGlobal = function(position)
{
    // don't need to u[date the lot
    this.displayObjectUpdateTransform();
    return this.worldTransform.apply(position);
};

Tiny.BaseObject2D.prototype.toLocal = function(position, from)
{
    if (from)
    {
        position = from.toGlobal(position);
    }

    // don't need to u[date the lot
    this.displayObjectUpdateTransform();

    return this.worldTransform.applyInverse(position);
};

Tiny.BaseObject2D.prototype._renderCachedSprite = function(renderSession)
{
    this._cachedSprite.worldAlpha = this.worldAlpha;

    Tiny.Sprite.prototype.render.call(this._cachedSprite, renderSession);
    
};

Tiny.BaseObject2D.prototype._generateCachedSprite = function()
{
    this._cachedSprite = null;
    this._cacheAsBitmap = false;

    var bounds = this.getLocalBounds();

    if (!this._cachedSprite)
    {
        var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0);//, renderSession.renderer);

        this._cachedSprite = new Tiny.Sprite(renderTexture);
        this._cachedSprite.worldTransform = this.worldTransform;
    }
    else
    {
        this._cachedSprite.texture.resize(bounds.width | 0, bounds.height | 0);
    }


    Tiny.BaseObject2D._tempMatrix.tx = -bounds.x;
    Tiny.BaseObject2D._tempMatrix.ty = -bounds.y;
    
    this._cachedSprite.texture.render(this, Tiny.BaseObject2D._tempMatrix, true);

    this._cachedSprite.anchor.x = -( bounds.x / bounds.width );
    this._cachedSprite.anchor.y = -( bounds.y / bounds.height );

    this._cacheAsBitmap = true;
};

Tiny.BaseObject2D.prototype._destroyCachedSprite = function()
{
    if (!this._cachedSprite) return;

    this._cachedSprite.texture.destroy(true);

    this._cachedSprite = null;
};


Tiny.BaseObject2D.prototype.render = function(renderSession)
{
    
};

Object.defineProperty(Tiny.BaseObject2D.prototype, 'x', {

    get: function() {
        return this.position.x;
    },

    set: function(value) {
        this.position.x = value;
    }

});

Object.defineProperty(Tiny.BaseObject2D.prototype, 'y', {

    get: function() {
        return this.position.y;
    },

    set: function(value) {
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

Tiny.GraphicsData = function(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape) {
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

Tiny.GraphicsData.prototype.clone = function() {

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

Tiny.Graphics = function()
{
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

    this._localBounds = new Tiny.Rectangle(0,0,1,1);
    this._boundsDirty = true;
    this.cachedSpriteDirty = false;

};

// constructor
Tiny.Graphics.prototype = Object.create( Tiny.Object2D.prototype );
Tiny.Graphics.prototype.constructor = Tiny.Graphics;


Tiny.Graphics.prototype.lineStyle = function(lineWidth, color, alpha)
{
    this.lineWidth = lineWidth || 0;
    this.lineColor = color || "#000000";
    this.lineAlpha = (alpha === undefined) ? 1 : alpha;

    if (this.currentPath)
    {
        if (this.currentPath.shape.points.length)
        {
            // halfway through a line? start a new one!
            this.drawShape(new Tiny.Polygon(this.currentPath.shape.points.slice(-2)));
        }
        else
        {
            // otherwise its empty so lets just set the line properties
            this.currentPath.lineWidth = this.lineWidth;
            this.currentPath.lineColor = this.lineColor;
            this.currentPath.lineAlpha = this.lineAlpha;
        }
    }

    return this;
};

Tiny.Graphics.prototype.moveTo = function(x, y)
{
    this.drawShape(new Tiny.Polygon([x, y]));

    return this;
};

Tiny.Graphics.prototype.lineTo = function(x, y)
{
    if (!this.currentPath)
    {
        this.moveTo(0, 0);
    }

    this.currentPath.shape.points.push(x, y);
    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.quadraticCurveTo = function(cpX, cpY, toX, toY)
{
    if (this.currentPath)
    {
        if (this.currentPath.shape.points.length === 0)
        {
            this.currentPath.shape.points = [0, 0];
        }
    }
    else
    {
        this.moveTo(0,0);
    }

    var xa,
        ya,
        n = 20,
        points = this.currentPath.shape.points;

    if (points.length === 0)
    {
        this.moveTo(0, 0);
    }

    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];
    var j = 0;
    for (var i = 1; i <= n; ++i)
    {
        j = i / n;

        xa = fromX + ( (cpX - fromX) * j );
        ya = fromY + ( (cpY - fromY) * j );

        points.push( xa + ( ((cpX + ( (toX - cpX) * j )) - xa) * j ),
                     ya + ( ((cpY + ( (toY - cpY) * j )) - ya) * j ) );
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.bezierCurveTo = function(cpX, cpY, cpX2, cpY2, toX, toY)
{
    if (this.currentPath)
    {
        if (this.currentPath.shape.points.length === 0)
        {
            this.currentPath.shape.points = [0, 0];
        }
    }
    else
    {
        this.moveTo(0,0);
    }

    var n = 20,
        dt,
        dt2,
        dt3,
        t2,
        t3,
        points = this.currentPath.shape.points;

    var fromX = points[points.length-2];
    var fromY = points[points.length-1];
    var j = 0;

    for (var i = 1; i <= n; ++i)
    {
        j = i / n;

        dt = (1 - j);
        dt2 = dt * dt;
        dt3 = dt2 * dt;

        t2 = j * j;
        t3 = t2 * j;
        
        points.push( dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX,
                     dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
    }
    
    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.arcTo = function(x1, y1, x2, y2, radius)
{
    if (this.currentPath)
    {
        if (this.currentPath.shape.points.length === 0)
        {
            this.currentPath.shape.points.push(x1, y1);
        }
    }
    else
    {
        this.moveTo(x1, y1);
    }

    var points = this.currentPath.shape.points,
        fromX = points[points.length-2],
        fromY = points[points.length-1],
        a1 = fromY - y1,
        b1 = fromX - x1,
        a2 = y2   - y1,
        b2 = x2   - x1,
        mm = Math.abs(a1 * b2 - b1 * a2);

    if (mm < 1.0e-8 || radius === 0)
    {
        if (points[points.length-2] !== x1 || points[points.length-1] !== y1)
        {
            points.push(x1, y1);
        }
    }
    else
    {
        var dd = a1 * a1 + b1 * b1,
            cc = a2 * a2 + b2 * b2,
            tt = a1 * a2 + b1 * b2,
            k1 = radius * Math.sqrt(dd) / mm,
            k2 = radius * Math.sqrt(cc) / mm,
            j1 = k1 * tt / dd,
            j2 = k2 * tt / cc,
            cx = k1 * b2 + k2 * b1,
            cy = k1 * a2 + k2 * a1,
            px = b1 * (k2 + j1),
            py = a1 * (k2 + j1),
            qx = b2 * (k1 + j2),
            qy = a2 * (k1 + j2),
            startAngle = Math.atan2(py - cy, px - cx),
            endAngle   = Math.atan2(qy - cy, qx - cx);

        this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.arc = function(cx, cy, radius, startAngle, endAngle, anticlockwise)
{
    //  If we do this we can never draw a full circle
    if (startAngle === endAngle)
    {
        return this;
    }

    if (typeof anticlockwise === 'undefined') { anticlockwise = false; }

    if (!anticlockwise && endAngle <= startAngle)
    {
        endAngle += Math.PI * 2;
    }
    else if (anticlockwise && startAngle <= endAngle)
    {
        startAngle += Math.PI * 2;
    }

    var sweep = anticlockwise ? (startAngle - endAngle) * -1 : (endAngle - startAngle);
    var segs =  Math.ceil(Math.abs(sweep) / (Math.PI * 2)) * 40;

    //  Sweep check - moved here because we don't want to do the moveTo below if the arc fails
    if (sweep === 0)
    {
        return this;
    }

    var startX = cx + Math.cos(startAngle) * radius;
    var startY = cy + Math.sin(startAngle) * radius;

    if (anticlockwise && this.filling)
    {
        this.moveTo(cx, cy);
    }
    else
    {
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

    for (var i = 0; i <= segMinus; i++)
    {
        var real =  i + remainder * i;
    
        var angle = ((theta) + startAngle + (theta2 * real));

        var c = Math.cos(angle);
        var s = -Math.sin(angle);

        points.push(( (cTheta *  c) + (sTheta * s) ) * radius + cx,
                    ( (cTheta * -s) + (sTheta * c) ) * radius + cy);
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;

    return this;
};

Tiny.Graphics.prototype.beginFill = function(color, alpha)
{
    this.filling = true;
    this.fillColor = color || "#000000";
    this.fillAlpha = (alpha === undefined) ? 1 : alpha;

    if (this.currentPath)
    {
        if (this.currentPath.shape.points.length <= 2)
        {
            this.currentPath.fill = this.filling;
            this.currentPath.fillColor = this.fillColor;
            this.currentPath.fillAlpha = this.fillAlpha;
        }
    }

    return this;
};

Tiny.Graphics.prototype.endFill = function()
{
    this.filling = false;
    this.fillColor = null;
    this.fillAlpha = 1;

    return this;
};

Tiny.Graphics.prototype.drawRect = function(x, y, width, height)
{
    this.drawShape(new Tiny.Rectangle(x, y, width, height));

    return this;
};

Tiny.Graphics.prototype.drawRoundedRect = function(x, y, width, height, radius)
{
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


Tiny.Graphics.prototype.drawCircle = function(x, y, diameter)
{
    this.drawShape(new Tiny.Circle(x, y, diameter));

    return this;
};

// Moved to extra Ellipse
// Tiny.Graphics.prototype.drawEllipse = function(x, y, width, height)
// {
//     this.drawShape(new Tiny.Ellipse(x, y, width, height));

//     return this;
// };

Tiny.Graphics.prototype.drawPolygon = function(path)
{
    // prevents an argument assignment deopt
    // see section 3.1: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
    var points = path;

    if (!Array.isArray(points))
    {
        // prevents an argument leak deopt
        // see section 3.2: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
        points = new Array(arguments.length);

        for (var i = 0; i < points.length; ++i)
        {
            points[i] = arguments[i];
        }
    }

    this.drawShape(new Tiny.Polygon(points));

    return this;
};

Tiny.Graphics.prototype.clear = function()
{
    this.lineWidth = 0;
    this.filling = false;

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;
    this.graphicsData = [];
    this.updateLocalBounds();

    return this;
};

Tiny.Graphics.prototype.destroy = function (destroyChildren)
{
    Tiny.Object2D.prototype.destroy.call(this);

    this.clear();
};

Tiny.Graphics.prototype.generateTexture = function(resolution)
{
    resolution = resolution || 1;

    var bounds = this.getBounds();
   
    var canvasBuffer = new Tiny.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);
    
    var texture = Tiny.Texture.fromCanvas(canvasBuffer.canvas);
    texture.resolution = resolution;

    canvasBuffer.context.scale(resolution, resolution);

    canvasBuffer.context.translate(-bounds.x,-bounds.y);
    
    Tiny.CanvasGraphics.renderGraphics(this, canvasBuffer.context);

    return texture;
};

Tiny.Graphics.prototype.render = function(renderSession)
{
    if (this.isMask === true)
    {
        return;
    }

    // if the tint has changed, set the graphics object to dirty.
    if (this._prevTint !== this.tint) {
        this._boundsDirty = true;
        this._prevTint = this.tint;
    }

    if (this._cacheAsBitmap)
    {
        if (this.cachedSpriteDirty)
        {
            this._generateCachedSprite();
   
            // we will also need to update the texture
            this.updateCachedSpriteTexture();

            this.cachedSpriteDirty = false;
            this._boundsDirty = false;
        }

        this._cachedSprite.alpha = this.alpha;
        Tiny.Sprite.prototype.render.call(this._cachedSprite, renderSession);

        return;
    }
    else
    {
        var context = renderSession.context;
        var transform = this.worldTransform;
        
        if (this.blendMode !== renderSession.currentBlendMode)
        {
            renderSession.currentBlendMode = this.blendMode;
            context.globalCompositeOperation = renderSession.currentBlendMode;
        }

        if (this._mask)
        {
            renderSession.maskManager.pushMask(this._mask, renderSession);
        }

        var resolution = renderSession.resolution;

        context.setTransform(transform.a * resolution,
                             transform.b * resolution,
                             transform.c * resolution,
                             transform.d * resolution,
                             transform.tx * resolution,
                             transform.ty * resolution);

        Tiny.CanvasGraphics.renderGraphics(this, context);

         // simple render children!
        for (var i = 0; i < this.children.length; i++)
        {
            this.children[i].render(renderSession);
        }

        if (this._mask)
        {
            renderSession.maskManager.popMask(renderSession);
        }
    }
};

Tiny.Graphics.prototype.getBounds = function(matrix)
{
    if(!this._currentBounds || this._boundsDirty)
    {

        // return an empty object if the item is a mask!
        if (!this.renderable)
        {
            return Tiny.EmptyRectangle;
        }

    if (this._boundsDirty )
    {
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

    var x4 =  a * w1 + c * h0 + tx;
    var y4 =  d * h0 + b * w1 + ty;

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

Tiny.Graphics.prototype.containsPoint = function( point )
{
    this.worldTransform.applyInverse(point,  tempPoint);

    var graphicsData = this.graphicsData;

    for (var i = 0; i < graphicsData.length; i++)
    {
        var data = graphicsData[i];

        if (!data.fill)
        {
            continue;
        }

        // only deal with fills..
        if (data.shape)
        {
            if ( data.shape.contains( tempPoint.x, tempPoint.y ) )
            {
                return true;
            }
        }
    }

    return false;
};

Tiny.Graphics.prototype.updateLocalBounds = function()
{
    var minX = Infinity;
    var maxX = -Infinity;

    var minY = Infinity;
    var maxY = -Infinity;

    if (this.graphicsData.length)
    {
        var shape, points, x, y, w, h;

        for (var i = 0; i < this.graphicsData.length; i++)
        {
            var data = this.graphicsData[i];
            var type = data.type;
            var lineWidth = data.lineWidth;
            shape = data.shape;

            if (type === Tiny.Primitives.RECT || type === Tiny.Primitives.RREC || type === Tiny.Primitives.RREC_LJOIN)
            {
                x = shape.x - lineWidth / 2;
                y = shape.y - lineWidth / 2;
                w = shape.width + lineWidth;
                h = shape.height + lineWidth;

                minX = x < minX ? x : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y < minY ? y : minY;
                maxY = y + h > maxY ? y + h : maxY;
            }
            else if (type === Tiny.Primitives.CIRC)
            {
                x = shape.x;
                y = shape.y;
                w = shape.radius + lineWidth / 2;
                h = shape.radius + lineWidth / 2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            }
            else if (type === Tiny.Primitives.ELIP)
            {
                x = shape.x;
                y = shape.y;
                w = shape.width + lineWidth / 2;
                h = shape.height + lineWidth / 2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            }
            else
            {
                // POLY - assumes points are sequential, not Point objects
                points = shape.points;

                for (var j = 0; j < points.length; j++)
                {
                    if (points[j] instanceof Tiny.Point)
                    {
                        x = points[j].x;
                        y = points[j].y;
                    }
                    else
                    {
                        x = points[j];
                        y = points[j + 1];

                        if (j < points.length - 1)
                        {
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
    }
    else
    {
        minX = 0;
        maxX = 0;
        minY = 0;
        maxY = 0;
    }

    var padding = this.boundsPadding;
    
    this._localBounds.x = minX - padding;
    this._localBounds.width = (maxX - minX) + padding * 2;

    this._localBounds.y = minY - padding;
    this._localBounds.height = (maxY - minY) + padding * 2;
};

Tiny.Graphics.prototype._generateCachedSprite = function()
{
    var bounds = this.getLocalBounds();

    if (!this._cachedSprite)
    {
        var canvasBuffer = new Tiny.CanvasBuffer(bounds.width, bounds.height);
        var texture = Tiny.Texture.fromCanvas(canvasBuffer.canvas);
        
        this._cachedSprite = new Tiny.Sprite(texture);
        this._cachedSprite.buffer = canvasBuffer;

        this._cachedSprite.worldTransform = this.worldTransform;
    }
    else
    {
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
Tiny.Graphics.prototype.updateCachedSpriteTexture = function()
{
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
Tiny.Graphics.prototype.destroyCachedSprite = function()
{
    this._cachedSprite.texture.destroy(true);
    this._cachedSprite = null;
};

Tiny.Graphics.prototype.drawShape = function(shape)
{
    if (this.currentPath)
    {
        // check current path!
        if (this.currentPath.shape.points.length <= 2)
        {
            this.graphicsData.pop();
        }
    }

    this.currentPath = null;

    //  Handle mixed-type polygons
    if (shape instanceof Tiny.Polygon)
    {
        shape.flatten();
    }

    var data = new Tiny.GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, shape);
    
    this.graphicsData.push(data);

    if (data.type === Tiny.Primitives.POLY)
    {
        data.shape.closed = this.filling;
        this.currentPath = data;
    }

    this._boundsDirty = true;
    this.cachedSpriteDirty = true;


    return data;
};

Object.defineProperty(Tiny.Graphics.prototype, "cacheAsBitmap", {

    get: function() {
        return  this._cacheAsBitmap;
    },

    set: function(value) {

        this._cacheAsBitmap = value;

        if (this._cacheAsBitmap)
        {
            this._generateCachedSprite();
        }
        else
        {
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


Tiny.Object2D = function()
{
    Tiny.BaseObject2D.call(this);

    this.children = [];
    this._bounds = new Tiny.Rectangle(0, 0, 1, 1);
    this._currentBounds = null;
    this._mask = null;
};

Tiny.Object2D.prototype = Object.create( Tiny.BaseObject2D.prototype );
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

Object.defineProperty(Tiny.Object2D.prototype, 'width', {

    get: function() {
        return this.scale.x * this.getLocalBounds().width;
    },

    set: function(value) {
        
        var width = this.getLocalBounds().width;

        if(width !== 0)
        {
            this.scale.x = value / width;
        }
        else
        {
            this.scale.x = 1;
        }

        
        this._width = value;
    }
});

Object.defineProperty(Tiny.Object2D.prototype, 'height', {

    get: function() {
        return  this.scale.y * this.getLocalBounds().height;
    },

    set: function(value) {

        var height = this.getLocalBounds().height;

        if (height !== 0)
        {
            this.scale.y = value / height ;
        }
        else
        {
            this.scale.y = 1;
        }

        this._height = value;
    }

});

Object.defineProperty(Tiny.Object2D.prototype, 'mask', {

    get: function() {
        return this._mask;
    },

    set: function(value) {

        if (this._mask) this._mask.isMask = false;

        this._mask = value;

        if (this._mask) this._mask.isMask = true;
    }

});

Tiny.Object2D.prototype.destroy = function()
{
    var i = this.children.length;

    while (i--)
    {
        this.children[i].destroy();
    }

    this.children = [];
    
    Tiny.BaseObject2D.prototype.destroy.call(this);

    this._bounds = null;
    this._currentBounds = null;
    this._mask = null;
    
    if (this.input) this.input.system.remove(this);
};

Tiny.Object2D.prototype.add = function(child)
{
    return this.addChildAt(child, this.children.length);
};

Tiny.Object2D.prototype.addChildAt = function(child, index)
{
    if(index >= 0 && index <= this.children.length)
    {
        if(child.parent)
        {
            child.parent.remove(child);
        }

        child.parent = this;

        if (this.game) child.game = this.game;

        this.children.splice(index, 0, child);

        return child;
    }
    else
    {
        throw new Error(child + 'addChildAt: The index '+ index +' supplied is out of bounds ' + this.children.length);
    }
};

Tiny.Object2D.prototype.swapChildren = function(child, child2)
{
    if(child === child2) {
        return;
    }

    var index1 = this.getChildIndex(child);
    var index2 = this.getChildIndex(child2);

    if(index1 < 0 || index2 < 0) {
        throw new Error('swapChildren: Both the supplied Objects must be a child of the caller.');
    }

    this.children[index1] = child2;
    this.children[index2] = child;

};

Tiny.Object2D.prototype.getChildIndex = function(child)
{
    var index = this.children.indexOf(child);
    if (index === -1)
    {
        throw new Error('The supplied Object must be a child of the caller');
    }
    return index;
};

Tiny.Object2D.prototype.setChildIndex = function(child, index)
{
    if (index < 0 || index >= this.children.length)
    {
        throw new Error('The supplied index is out of bounds');
    }
    var currentIndex = this.getChildIndex(child);
    this.children.splice(currentIndex, 1); //remove from old position
    this.children.splice(index, 0, child); //add at new position
};

Tiny.Object2D.prototype.getChildAt = function(index)
{
    if (index < 0 || index >= this.children.length)
    {
        throw new Error('getChildAt: Supplied index '+ index +' does not exist in the child list, or the supplied Object must be a child of the caller');
    }
    return this.children[index];
    
};

Tiny.Object2D.prototype.remove = function(child)
{
    var index = this.children.indexOf( child );
    if(index === -1)return;
    
    return this.removeChildAt( index );
};

Tiny.Object2D.prototype.removeChildAt = function(index)
{
    var child = this.getChildAt( index );
    child.parent = undefined;
    this.children.splice( index, 1 );
    return child;
};

Tiny.Object2D.prototype.removeChildren = function(beginIndex, endIndex)
{
    var begin = beginIndex || 0;
    var end = typeof endIndex === 'number' ? endIndex : this.children.length;
    var range = end - begin;

    if (range > 0 && range <= end)
    {
        var removed = this.children.splice(begin, range);
        for (var i = 0; i < removed.length; i++) {
            var child = removed[i];
            child.parent = undefined;
        }
        return removed;
    }
    else if (range === 0 && this.children.length === 0)
    {
        return [];
    }
    else
    {
        throw new Error( 'removeChildren: Range Error, numeric values are outside the acceptable range' );
    }
};

Tiny.Object2D.prototype.updateTransform = function()
{
    if(!this.visible)return;

    this.displayObjectUpdateTransform();

    if(this._cacheAsBitmap)return;

    for(var i=0,j=this.children.length; i<j; i++)
    {
        this.children[i].updateTransform();
    }
};

// performance increase to avoid using call.. (10x faster)
Tiny.Object2D.prototype.displayObjectContainerUpdateTransform = Tiny.Object2D.prototype.updateTransform;

Tiny.Object2D.prototype.getBounds = function()
{
    if(this.children.length === 0)return Tiny.EmptyRectangle;
    if (this._cachedSprite) return this._cachedSprite.getBounds()

    // TODO the bounds have already been calculated this render session so return what we have

    var minX = Infinity;
    var minY = Infinity;

    var maxX = -Infinity;
    var maxY = -Infinity;

    var childBounds;
    var childMaxX;
    var childMaxY;

    var childVisible = false;

    for(var i=0,j=this.children.length; i<j; i++)
    {
        var child = this.children[i];
        
        if(!child.visible)continue;

        childVisible = true;

        childBounds = this.children[i].getBounds();
     
        minX = minX < childBounds.x ? minX : childBounds.x;
        minY = minY < childBounds.y ? minY : childBounds.y;

        childMaxX = childBounds.width + childBounds.x;
        childMaxY = childBounds.height + childBounds.y;

        maxX = maxX > childMaxX ? maxX : childMaxX;
        maxY = maxY > childMaxY ? maxY : childMaxY;
    }

    if(!childVisible)
        return Tiny.EmptyRectangle;

    var bounds = this._bounds;

    bounds.x = minX;
    bounds.y = minY;
    bounds.width = maxX - minX;
    bounds.height = maxY - minY;

    // TODO: store a reference so that if this function gets called again in the render cycle we do not have to recalculate
    //this._currentBounds = bounds;
   
    return bounds;
};

Tiny.Object2D.prototype.getLocalBounds = function()
{
    var matrixCache = this.worldTransform;

    this.worldTransform = Tiny.identityMatrix;

    for(var i=0,j=this.children.length; i<j; i++)
    {
        this.children[i].updateTransform();
    }

    var bounds = this.getBounds();

    this.worldTransform = matrixCache;

    return bounds;
};

Tiny.Object2D.prototype.render = function(renderSession)
{
    if (this.visible === false || this.alpha === 0) return;

    if (this._cacheAsBitmap)
    {
        this._renderCachedSprite(renderSession);
        return;
    }

    if (this._mask)
    {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].render(renderSession);
    }

    if (this._mask)
    {
        renderSession.maskManager.popMask(renderSession);
    }
};

/***/ }),

/***/ "./src/objects/Scene.js":
/*!******************************!*\
  !*** ./src/objects/Scene.js ***!
  \******************************/
/***/ (() => {

Tiny.Scene = function(game)
{
    Tiny.Object2D.call( this );
    this.worldTransform = new Tiny.Matrix();
    this.game = game;
};

Tiny.Scene.prototype = Object.create( Tiny.Object2D.prototype );
Tiny.Scene.prototype.constructor = Tiny.Scene;

Tiny.Scene.prototype.updateTransform = function()
{
    this.worldAlpha = 1;

    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].updateTransform();
    }
};

/***/ }),

/***/ "./src/objects/Sprite.js":
/*!*******************************!*\
  !*** ./src/objects/Sprite.js ***!
  \*******************************/
/***/ (() => {


Tiny.Sprite = function(texture, key)
{
    Tiny.Object2D.call(this);

    this.anchor = new Tiny.Point();

    this.setTexture(texture, key, false);

    this._width = 0;

    this._height = 0;

    this._frame = 0;

    this.tint = "#FFFFFF";

    this.blendMode = "source-over";

    if (this.texture.hasLoaded)
    {
        this.onTextureUpdate();
    }

    this.renderable = true;
};


Tiny.Sprite.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.Sprite.prototype.constructor = Tiny.Sprite;

Object.defineProperty(Tiny.Sprite.prototype, 'frameName', {

    get: function() {
        return this.texture.frame.name
    },

    set: function(value) {
        if (this.texture.frame.name) 
        {
            this.setTexture(Tiny.Cache.texture[this.texture.key + "." + value])
        }
    }

});

Object.defineProperty(Tiny.Sprite.prototype, 'frame', {

    get: function() {
        return this._frame
    },

    set: function(value) {
        if (this.texture.lastFrame) {
            this._frame = value
            if (this._frame > this.texture.lastFrame)
                this._frame = 0
            this.setTexture(Tiny.Cache.texture[this.texture.key + "." + this._frame])
        }
    }

});

Object.defineProperty(Tiny.Sprite.prototype, 'width', {

    get: function() {
        return this.scale.x * this.texture.frame.width;
    },

    set: function(value) {
        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    }

});

Object.defineProperty(Tiny.Sprite.prototype, 'height', {

    get: function() {
        return  this.scale.y * this.texture.frame.height;
    },

    set: function(value) {
        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    }

});

Tiny.Sprite.prototype.setTexture = function(texture, key, updateDimension)
{
    if (typeof texture == "string") 
    {
        var imagePath = texture;

        if (key != undefined) 
        {
            imagePath = imagePath + "." + key;
        }

        texture = Tiny.Cache.texture[imagePath];

        if (!texture) 
        {
            texture = new Tiny.Texture(imagePath);
            // throw new Error('Cache Error: image ' + imagePath + ' does`t found in cache');
        }
    }

    if (this.texture === texture) return false;

    this.texture = texture;
    this.cachedTint = "#FFFFFF";

    if (updateDimension === true) 
    {
        this.onTextureUpdate();
    }

    return true;
};

Tiny.Sprite.prototype.onTextureUpdate = function()
{
    // so if _width is 0 then width was not set..
    if (this._width) this.scale.x = this._width / this.texture.frame.width;
    if (this._height) this.scale.y = this._height / this.texture.frame.height;
};

Tiny.Sprite.prototype.animate = function(timer, delay)
{
    if (this.texture.lastFrame && this.texture.frame.index != undefined) 
    {
        delay = delay || (this.texture.frame.duration || 100);

        if (!this.animation) 
        {
            this.animation = timer.loop(delay, function() {
                this.frame += 1;
                this.animation.delay = delay || (this.texture.frame.duration || 100);
            }.bind(this));
            
            this.animation.start();
        }
        else
        {
            this.animation.delay = delay;
            this.animation.start();
        }
    }
};

Tiny.Sprite.prototype.getBounds = function(matrix)
{
    var width = this.texture.frame.width / this.texture.resolution;
    var height = this.texture.frame.height / this.texture.resolution;

    var w0 = width * (1-this.anchor.x);
    var w1 = width * -this.anchor.x;

    var h0 = height * (1-this.anchor.y);
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

    if (b === 0 && c === 0)
    {
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
    }
    else
    {
        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;

        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;

        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;

        var x4 =  a * w1 + c * h0 + tx;
        var y4 =  d * h0 + b * w1 + ty;

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


Tiny.Sprite.prototype.render = function(renderSession)
{
    // If the sprite is not visible or the alpha is 0 then no need to render this element
    if (this.visible === false || this.alpha === 0 || this.renderable === false || this.texture.crop.width <= 0 || this.texture.crop.height <= 0) return;

    if (this.blendMode !== renderSession.currentBlendMode)
    {
        renderSession.currentBlendMode = this.blendMode;
        renderSession.context.globalCompositeOperation = renderSession.currentBlendMode;
    }

    if (this._mask)
    {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    //  Ignore null sources
    if (this.texture.valid)
    {
        var resolution = this.texture.resolution / renderSession.resolution;

        renderSession.context.globalAlpha = this.worldAlpha;


        //  If the texture is trimmed we offset by the trim x/y, otherwise we use the frame dimensions
        var dx = (this.texture.trim) ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width;
        var dy = (this.texture.trim) ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;

        //  Allow for pixel rounding
        if (renderSession.roundPixels)
        {
            renderSession.context.setTransform(
                this.worldTransform.a,
                this.worldTransform.b,
                this.worldTransform.c,
                this.worldTransform.d,
                (this.worldTransform.tx * renderSession.resolution) | 0,
                (this.worldTransform.ty * renderSession.resolution) | 0);
            dx = dx | 0;
            dy = dy | 0;
        }
        else
        {
            renderSession.context.setTransform(
                this.worldTransform.a,
                this.worldTransform.b,
                this.worldTransform.c,
                this.worldTransform.d,
                this.worldTransform.tx * renderSession.resolution,
                this.worldTransform.ty * renderSession.resolution);
        }

        if (this.tint !== "#FFFFFF")
        {
            if (this.cachedTint !== this.tint)
            {
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
                                this.texture.crop.height / resolution);
        }
        else
        {
            renderSession.context.drawImage(
                                this.texture.source,
                                this.texture.crop.x,
                                this.texture.crop.y,
                                this.texture.crop.width,
                                this.texture.crop.height,
                                dx / resolution,
                                dy / resolution,
                                this.texture.crop.width / resolution,
                                this.texture.crop.height / resolution);
        }
    }

    // OVERWRITE
    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].render(renderSession);
    }

    if (this._mask)
    {
        renderSession.maskManager.popMask(renderSession);
    }
};

/***/ }),

/***/ "./src/objects/Text.js":
/*!*****************************!*\
  !*** ./src/objects/Text.js ***!
  \*****************************/
/***/ (() => {


Tiny.Text = function(text, style)
{
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.resolution = 1;

    Tiny.Sprite.call(this, Tiny.Texture.fromCanvas(this.canvas));

    this.setText(text);
    this.setStyle(style);

};

Tiny.Text.prototype = Object.create(Tiny.Sprite.prototype);
Tiny.Text.prototype.constructor = Tiny.Text;

Object.defineProperty(Tiny.Text.prototype, 'width', {
    get: function() {

        if(this.dirty)
        {
            this.updateText();
            this.dirty = false;
        }


        return this.scale.x * this.texture.frame.width;
    },
    set: function(value) {
        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    }
});

Object.defineProperty(Tiny.Text.prototype, 'height', {
    get: function() {

        if(this.dirty)
        {
            this.updateText();
            this.dirty = false;
        }


        return  this.scale.y * this.texture.frame.height;
    },
    set: function(value) {
        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    }
});

Tiny.Text.prototype.setStyle = function(style)
{
    style = style || {};
    style.font = style.font || 'bold 20pt Arial';
    style.fill = style.fill || 'black';
    style.align = style.align || 'left';
    style.stroke = style.stroke || 'black';
    style.strokeThickness = style.strokeThickness || 0;
    style.wordWrap = style.wordWrap || false;
    style.lineSpacing = style.lineSpacing || 0
    style.wordWrapWidth = style.wordWrapWidth !== undefined ? style.wordWrapWidth : 100;
    
    style.dropShadow = style.dropShadow || false;
    style.dropShadowAngle = style.dropShadowAngle !== undefined ? style.dropShadowAngle : Math.PI / 6;
    style.dropShadowDistance = style.dropShadowDistance !== undefined ? style.dropShadowDistance : 4;
    style.dropShadowColor = style.dropShadowColor || 'black';

    this.style = style;
    this.dirty = true;
};

Tiny.Text.prototype.setText = function(text)
{
    this.text = text.toString() || ' ';
    this.dirty = true;
};

Tiny.Text.prototype.updateText = function()
{
    this.texture.resolution = this.resolution;

    this.context.font = this.style.font;

    var outputText = this.text;

    // word wrap
    // preserve original text
    if(this.style.wordWrap)outputText = this.wordWrap(this.text);

    //split text into lines
    var lines = outputText.split(/(?:\r\n|\r|\n)/);

    //calculate text width
    var lineWidths = [];
    var maxLineWidth = 0;
    var fontProperties = this.determineFontProperties(this.style.font);
    for (var i = 0; i < lines.length; i++)
    {
        var lineWidth = this.context.measureText(lines[i]).width;
        lineWidths[i] = lineWidth;
        maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }

    var width = maxLineWidth + this.style.strokeThickness;
    if(this.style.dropShadow)width += this.style.dropShadowDistance;

    this.canvas.width = ( width + this.context.lineWidth ) * this.resolution;
    
    //calculate text height
    var lineHeight = fontProperties.fontSize + this.style.strokeThickness + this.style.lineSpacing;
 
    var height = lineHeight * lines.length;
    if(this.style.dropShadow)height += this.style.dropShadowDistance;

    this.canvas.height = (height - this.style.lineSpacing) * this.resolution;

    this.context.scale( this.resolution, this.resolution);

    if(navigator.isCocoonJS) this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    
    // used for debugging..
    //this.context.fillStyle ="#FF0000"
    //this.context.fillRect(0, 0, this.canvas.width,this.canvas.height);

    this.context.font = this.style.font;
    this.context.strokeStyle = this.style.stroke;
    this.context.lineWidth = this.style.strokeThickness;
    this.context.textBaseline = 'alphabetic';
    this.context.miterLimit = 2;

    //this.context.lineJoin = 'round';

    var linePositionX;
    var linePositionY;

    if(this.style.dropShadow)
    {
        this.context.fillStyle = this.style.dropShadowColor;

        var xShadowOffset = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance;
        var yShadowOffset = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;

        for (i = 0; i < lines.length; i++)
        {
            linePositionX = this.style.strokeThickness / 2;
            linePositionY = (this.style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

            if(this.style.align === 'right')
            {
                linePositionX += maxLineWidth - lineWidths[i];
            }
            else if(this.style.align === 'center')
            {
                linePositionX += (maxLineWidth - lineWidths[i]) / 2;
            }

            if(this.style.fill)
            {
                this.context.fillText(lines[i], linePositionX + xShadowOffset, linePositionY + yShadowOffset);
            }

          //  if(dropShadow)
        }
    }

    //set canvas text styles
    this.context.fillStyle = this.style.fill;
    
    //draw lines line by line
    for (i = 0; i < lines.length; i++)
    {
        linePositionX = this.style.strokeThickness / 2;
        linePositionY = (this.style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

        if(this.style.align === 'right')
        {
            linePositionX += maxLineWidth - lineWidths[i];
        }
        else if(this.style.align === 'center')
        {
            linePositionX += (maxLineWidth - lineWidths[i]) / 2;
        }

        if(this.style.stroke && this.style.strokeThickness)
        {
            this.context.strokeText(lines[i], linePositionX, linePositionY);
        }

        if(this.style.fill)
        {
            this.context.fillText(lines[i], linePositionX, linePositionY);
        }

      //  if(dropShadow)
    }

    this.updateTexture();
};

Tiny.Text.prototype.updateTexture = function()
{
    this.texture.width = this.canvas.width;
    this.texture.height = this.canvas.height;
    this.texture.crop.width = this.texture.frame.width = this.canvas.width;
    this.texture.crop.height = this.texture.frame.height = this.canvas.height;

    this._width = this.canvas.width;
    this._height = this.canvas.height;
};

Tiny.Text.prototype.render = function(renderSession)
{
    if(this.dirty || this.resolution !== renderSession.resolution)
    {
        this.resolution = renderSession.resolution;

        this.updateText();
        this.dirty = false;
    }
     
    Tiny.Sprite.prototype.render.call(this, renderSession);
};

Tiny.Text.prototype.determineFontProperties = function(fontStyle)
{
    var properties = Tiny.Text.fontPropertiesCache[fontStyle];

    if(!properties)
    {
        properties = {};
        
        var canvas = Tiny.Text.fontPropertiesCanvas;
        var context = Tiny.Text.fontPropertiesContext;

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
        for(i = 0; i < baseline; i++)
        {
            for(j = 0; j < line; j += 4)
            {
                if(imagedata[idx + j] !== 255)
                {
                    stop = true;
                    break;
                }
            }
            if(!stop)
            {
                idx += line;
            }
            else
            {
                break;
            }
        }

        properties.ascent = baseline - i;

        idx = pixels - line;
        stop = false;

        // descent. scan from bottom to top until we find a non red pixel
        for(i = height; i > baseline; i--)
        {
            for(j = 0; j < line; j += 4)
            {
                if(imagedata[idx + j] !== 255)
                {
                    stop = true;
                    break;
                }
            }
            if(!stop)
            {
                idx -= line;
            }
            else
            {
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

Tiny.Text.prototype.wordWrap = function(text)
{
    // Greedy wrapping algorithm that will wrap words as the line grows longer
    // than its horizontal bounds.
    var result = '';
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++)
    {
        var spaceLeft = this.style.wordWrapWidth;
        var words = lines[i].split(' ');
        for (var j = 0; j < words.length; j++)
        {
            var wordWidth = this.context.measureText(words[j]).width;
            var wordWidthWithSpace = wordWidth + this.context.measureText(' ').width;
            if(j === 0 || wordWidthWithSpace > spaceLeft)
            {
                // Skip printing the newline if it's the first word of the line that is
                // greater than the word wrap width.
                if(j > 0)
                {
                    result += '\n';
                }
                result += words[j];
                spaceLeft = this.style.wordWrapWidth - wordWidth;
            }
            else
            {
                spaceLeft -= wordWidthWithSpace;
                result += ' ' + words[j];
            }
        }

        if (i < lines.length-1)
        {
            result += '\n';
        }
    }
    return result;
};

Tiny.Text.prototype.getBounds = function(matrix)
{
    if(this.dirty)
    {
        this.updateText();
        this.dirty = false;
    }

    return Tiny.Sprite.prototype.getBounds.call(this, matrix);
};

Tiny.Text.prototype.destroy = function()
{
    // make sure to reset the the context and canvas.. dont want this hanging around in memory!
    this.context = null;
    this.canvas = null;

    this.texture.destroy();

    Tiny.Sprite.prototype.destroy.call(this);
};

Tiny.Text.fontPropertiesCache = {};
Tiny.Text.fontPropertiesCanvas = document.createElement('canvas');
Tiny.Text.fontPropertiesContext = Tiny.Text.fontPropertiesCanvas.getContext('2d');

/***/ }),

/***/ "./src/renderers/CanvasMaskManager.js":
/*!********************************************!*\
  !*** ./src/renderers/CanvasMaskManager.js ***!
  \********************************************/
/***/ (() => {


Tiny.CanvasMaskManager = function()
{
};

Tiny.CanvasMaskManager.prototype.constructor = Tiny.CanvasMaskManager;

Tiny.CanvasMaskManager.prototype.pushMask = function(maskData, renderSession)
{
	var context = renderSession.context;

    context.save();
    
    var cacheAlpha = maskData.alpha;
    var transform = maskData.worldTransform;

    var resolution = renderSession.resolution;

    context.setTransform(transform.a * resolution,
                         transform.b * resolution,
                         transform.c * resolution,
                         transform.d * resolution,
                         transform.tx * resolution,
                         transform.ty * resolution);

    Tiny.CanvasGraphics.renderGraphicsMask(maskData, context);

    context.clip();

    maskData.worldAlpha = cacheAlpha;
};

Tiny.CanvasMaskManager.prototype.popMask = function(renderSession)
{
    renderSession.context.restore();
};

/***/ }),

/***/ "./src/renderers/CanvasRenderer.js":
/*!*****************************************!*\
  !*** ./src/renderers/CanvasRenderer.js ***!
  \*****************************************/
/***/ (() => {


Tiny.CanvasRenderer = function(width, height, options)
{   
    options = options || {}

    this.resolution = (options.resolution != undefined ? options.resolution : 1);

    this.clearBeforeRender = (options.clearBeforeRender != undefined ? options.clearBeforeRender : true);

    this.transparent = (options.transparent != undefined ? options.transparent : false);

    this.autoResize = options.autoResize || false;

    // this.width = width || 800;
    // this.height = height || 600;

    // this.width *= this.resolution;
    // this.height *= this.resolution;

    if (!Tiny.defaultRenderer) Tiny.defaultRenderer = this;

    var view = this.domElement = options.domElement || document.createElement( "canvas" );

    this.context = view.getContext( "2d", { alpha: this.transparent } );

    // view.width = this.width * this.resolution;
    // view.height = this.height * this.resolution;

    this.resize(width || 800, height || 600);

    this.setClearColor("#ffffff");

    if (Tiny.CanvasMaskManager)
        this.maskManager = new Tiny.CanvasMaskManager();

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


    if("imageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "imageSmoothingEnabled";
    else if("webkitImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "webkitImageSmoothingEnabled";
    else if("mozImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "mozImageSmoothingEnabled";
    else if("oImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "oImageSmoothingEnabled";
    else if ("msImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "msImageSmoothingEnabled";
};

Tiny.CanvasRenderer.prototype.constructor = Tiny.CanvasRenderer;

Tiny.CanvasRenderer.prototype.setClearColor = function(color)
{   
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

Tiny.CanvasRenderer.prototype.render = function(scene)
{
    scene.updateTransform();

    this.context.setTransform(1,0,0,1,0,0);

    this.context.globalAlpha = 1;

    this.renderSession.currentBlendMode = "source-over";
    this.context.globalCompositeOperation = "source-over";

    if (navigator.isCocoonJS && this.domElement.screencanvas)
    {
        this.context.fillStyle = "black";
        this.context.clear();
    }
    
    if (this.clearBeforeRender)
    {
        if (this.transparent)
        {
            this.context.clearRect(0, 0, this.width * this.resolution, this.height * this.resolution);
        }
        else
        {
            this.context.fillStyle = this.clearColor;
            this.context.fillRect(0, 0, this.width * this.resolution, this.height * this.resolution);
        }
    }
    
    this.renderObject(scene);

};

Tiny.CanvasRenderer.prototype.destroy = function(removeView)
{   
    if (typeof removeView === "undefined") { removeView = true; }

    if (removeView && this.domElement.parentNode)
    {
        this.domElement.parentNode.removeChild(this.domElement);
    }

    this.domElement = null;
    this.context = null;
    this.maskManager = null;
    this.renderSession = null;

    if (Tiny.defaultRenderer === this) Tiny.defaultRenderer = null;

};

Tiny.CanvasRenderer.prototype.resize = function(width, height)
{
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

Tiny.CanvasRenderer.prototype.setPixelRatio = function(resolution)
{
    this.resolution = resolution;

    var view = this.domElement;

    view.width = Math.floor(this.width * this.resolution);
    view.height = Math.floor(this.height * this.resolution);
};

Tiny.CanvasRenderer.prototype.renderObject = function(displayObject, context)
{
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


Tiny.CanvasTinter = function()
{
};

Tiny.CanvasTinter.getTintedTexture = function(sprite, color)
{
    var texture = sprite.texture;

    if (!texture._tintCache) texture._tintCache = {};

    if (texture._tintCache[color]) return texture._tintCache[color];

    var canvas = Tiny.CanvasTinter.canvas || document.createElement("canvas");
    
    Tiny.CanvasTinter.tintMethod(texture, color, canvas);

    if (Tiny.CanvasTinter.convertTintToImage)
    {
        // is this better?
        var tintImage = new Image();
        tintImage.src = canvas.toDataURL();

        // texture._tintCache[stringColor] = tintImage;
    }
    else
    {

        Tiny.CanvasTinter.canvas = null;
    }

    if (Tiny.CanvasTinter.cacheTint) texture._tintCache[color] = canvas;

    return canvas;
};

Tiny.CanvasTinter.tintWithMultiply = function(texture, color, canvas)
{
    var context = canvas.getContext( "2d" );

    var crop = texture.crop;

    canvas.width = crop.width;
    canvas.height = crop.height;

    context.fillStyle = Tiny.color2style(color);
    
    context.fillRect(0, 0, crop.width, crop.height);
    
    context.globalCompositeOperation = "multiply";

    context.drawImage(texture.source,
                           crop.x,
                           crop.y,
                           crop.width,
                           crop.height,
                           0,
                           0,
                           crop.width,
                           crop.height);

    context.globalCompositeOperation = "destination-atop";

    context.drawImage(texture.source,
                           crop.x,
                           crop.y,
                           crop.width,
                           crop.height,
                           0,
                           0,
                           crop.width,
                           crop.height);
};

Tiny.CanvasTinter.tintWithPerPixel = function(texture, color, canvas)
{
    var context = canvas.getContext("2d");

    var crop = texture.crop;

    canvas.width = crop.width;
    canvas.height = crop.height;
  
    context.globalCompositeOperation = "copy";
    context.drawImage(texture.source,
                           crop.x,
                           crop.y,
                           crop.width,
                           crop.height,
                           0,
                           0,
                           crop.width,
                           crop.height);

    var rgbValues = Tiny.color2rgb(color);
    var r = rgbValues[0], g = rgbValues[1], b = rgbValues[2];

    var pixelData = context.getImageData(0, 0, crop.width, crop.height);

    var pixels = pixelData.data;

    for (var i = 0; i < pixels.length; i += 4)
    {
      pixels[i+0] *= r;
      pixels[i+1] *= g;
      pixels[i+2] *= b;

      if (!Tiny.canHandleAlpha)
      {
        var alpha = pixels[i+3];

        pixels[i+0] /= 255 / alpha;
        pixels[i+1] /= 255 / alpha;
        pixels[i+2] /= 255 / alpha;
      }
    }

    context.putImageData(pixelData, 0, 0);
};

function checkInverseAlpha()
{
    var canvas = new Tiny.CanvasBuffer(2, 1, {willReadFrequently: true});

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
    return (s2.data[0] === s1.data[0] && s2.data[1] === s1.data[1] && s2.data[2] === s1.data[2] && s2.data[3] === s1.data[3]);
};

function checkBlendMode ()
{
    var pngHead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';
    var pngEnd = 'AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';

    var magenta = new Image();

    magenta.onload = function ()
    {
        var yellow = new Image();

        yellow.onload = function ()
        {
            var canvas = document.createElement('canvas');
            canvas.width = 6;
            canvas.height = 1;
            var context = canvas.getContext('2d', {willReadFrequently: true});

            context.globalCompositeOperation = 'multiply';

            context.drawImage(magenta, 0, 0);
            context.drawImage(yellow, 2, 0);

            if (!context.getImageData(2, 0, 1, 1))
            {
                return false;
            }

            var data = context.getImageData(2, 0, 1, 1).data;

            Tiny.supportNewBlendModes = (data[0] === 255 && data[1] === 0 && data[2] === 0);
            Tiny.CanvasTinter.tintMethod = Tiny.CanvasTinter.tintWithMultiply;
        };

        yellow.src = pngHead + '/wCKxvRF' + pngEnd;
    };

    magenta.src = pngHead + 'AP804Oa6' + pngEnd;

    return false;
}


Tiny.CanvasTinter.convertTintToImage = false;

Tiny.CanvasTinter.cacheTint = false;

Tiny.canHandleAlpha = checkInverseAlpha();

Tiny.supportNewBlendModes = checkBlendMode();

Tiny.CanvasTinter.tintMethod = Tiny.supportNewBlendModes ? Tiny.CanvasTinter.tintWithMultiply :  Tiny.CanvasTinter.tintWithPerPixel;


/***/ }),

/***/ "./src/renderers/GraphicsRenderer.js":
/*!*******************************************!*\
  !*** ./src/renderers/GraphicsRenderer.js ***!
  \*******************************************/
/***/ (() => {


Tiny.CanvasGraphics = function()
{
};

Tiny.CanvasGraphics.renderGraphics = function(graphics, context)
{
    var worldAlpha = graphics.worldAlpha;

    if (graphics.dirty)
    {
        this.updateGraphicsTint(graphics);
        graphics.dirty = false;
    }

    for (var i = 0; i < graphics.graphicsData.length; i++)
    {
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        var fillColor = data._fillTint;
        var lineColor = data._lineTint;

        context.lineWidth = data.lineWidth;
        
        if (data.type === Tiny.Primitives.POLY)
        {
            context.beginPath();

            var points = shape.points;

            context.moveTo(points[0], points[1]);

            for (var j=1; j < points.length/2; j++)
            {
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            }

            if (shape.closed)
            {
                context.lineTo(points[0], points[1]);
            }

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length-2] && points[1] === points[points.length-1])
            {
                context.closePath();
            }

            if (data.fill)
            {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.fill();
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
                context.stroke();
            }
        }
        else if (data.type === Tiny.Primitives.RECT)
        {
            if (data.fillColor || data.fillColor === 0)
            {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.fillRect(shape.x, shape.y, shape.width, shape.height);
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
                context.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
        }
        else if (data.type === Tiny.Primitives.CIRC)
        {
            // TODO - need to be Undefined!
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius,0,2*Math.PI);
            context.closePath();

            if (data.fill)
            {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.fill();
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
                context.stroke();
            }
        }
        else if (data.type === Tiny.Primitives.ELIP)
        {
            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w/2;
            var y = shape.y - h/2;

            context.beginPath();

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w,           // x-end
                ye = y + h,           // y-end
                xm = x + w / 2,       // x-middle
                ym = y + h / 2;       // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

            context.closePath();

            if (data.fill)
            {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.fill();
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = Tiny.color2style(lineColor);
                context.stroke();
            }
        }
        else if (data.type === Tiny.Primitives.RREC)
        {
            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = Math.min(width, height) / 2 | 0;
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

            if (data.fillColor || data.fillColor === 0)
            {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.fill();
            }

            if (data.lineWidth)
            {
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

Tiny.CanvasGraphics.renderGraphicsMask = function(graphics, context)
{
    var len = graphics.graphicsData.length;

    if (len === 0)
    {
        return;
    }

    context.beginPath();

    for (var i = 0; i < len; i++)
    {
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        if (data.type === Tiny.Primitives.POLY)
        {

            var points = shape.points;
        
            context.moveTo(points[0], points[1]);

            for (var j=1; j < points.length/2; j++)
            {
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            }

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length-2] && points[1] === points[points.length-1])
            {
                context.closePath();
            }

        }
        else if (data.type === Tiny.Primitives.RECT)
        {
            context.rect(shape.x, shape.y, shape.width, shape.height);
            context.closePath();
        }
        else if (data.type === Tiny.Primitives.CIRC)
        {
            // TODO - need to be Undefined!
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.closePath();
        }
        else if (data.type === Tiny.Primitives.ELIP)
        {

            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w/2;
            var y = shape.y - h/2;

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w,           // x-end
                ye = y + h,           // y-end
                xm = x + w / 2,       // x-middle
                ym = y + h / 2;       // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            context.closePath();
        }
        else if (data.type === Tiny.Primitives.RREC || data.type === Tiny.Primitives.RREC_LJOIN)
        {

            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = Math.min(width, height) / 2 | 0;
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

Tiny.CanvasGraphics.updateGraphicsTint = function(graphics)
{
    if (graphics.tint === 0xFFFFFF)
    {
        return;
    }

    var tintR = (graphics.tint >> 16 & 0xFF) / 255;
    var tintG = (graphics.tint >> 8 & 0xFF) / 255;
    var tintB = (graphics.tint & 0xFF)/ 255;

    for (var i = 0; i < graphics.graphicsData.length; i++)
    {
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
        
        data._fillTint = (((fillColor >> 16 & 0xFF) / 255 * tintR*255 << 16) + ((fillColor >> 8 & 0xFF) / 255 * tintG*255 << 8) +  (fillColor & 0xFF) / 255 * tintB*255);
        data._lineTint = (((lineColor >> 16 & 0xFF) / 255 * tintR*255 << 16) + ((lineColor >> 8 & 0xFF) / 255 * tintG*255 << 8) +  (lineColor & 0xFF) / 255 * tintB*255);

    }
};

/***/ }),

/***/ "./src/systems/Input.js":
/*!******************************!*\
  !*** ./src/systems/Input.js ***!
  \******************************/
/***/ (() => {

var listeningToTouchEvents;

Tiny.Input = function(game)
{
    this.game = game;
    var view = this.domElement = game.inputView;

    this.bounds = {x: 0, y: 0, width: 0, height: 0};
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

    Tiny.EventEmitter.mixin(this);

    for (var i = 0; i < Tiny.Input.systems.length; i++) {
        Tiny.Input.systems[i].init.call(this);
    }

    this.updateBounds();
};

Tiny.Input.prototype = {


    add: function(object, options) {
        object.inputEnabled = true;

        options = options || {};
        options.system = this;

        object.input = options;

        Tiny.EventEmitter.mixin(object.input)

        this.list.push(object);
    },

    remove: function(object) {
        var index = this.list.indexOf(object);

        if (index > -1) {
            var removed = this.list[index];
            removed.input = null;
            removed.inputEnabled = false;

            this.list.splice(index, 1);

            return removed;
        }
    },

    inputHandler: function(name, event)
    {
        // console.log(name)
        var coords = this.getCoords(event);

        if (coords !== null)
        {
            if (name != "move")
            {
                this.candidates.length = 0;

                for (var i = 0; i < Tiny.Input.systems.length; i++) {
                    Tiny.Input.systems[i].preHandle.call(this, coords.x, coords.y);
                }

                var isGood, obj;

                for (var t = 0; t < this.list.length; t++) 
                {
                    obj = this.list[t];

                    if (!obj.inputEnabled || !obj.parent) continue;

                    if (obj.input.checkBounds) isGood = obj.input.checkBounds.call(this, obj, coords.x, coords.y);
                    else isGood = Tiny.Input.checkBounds.call(this, obj, coords.x, coords.y);

                    if (isGood) this.candidates.push(obj);
                }

                //var i = this.candidates.length

                for (var i = this.candidates.length - 1; i >= 0; i--)
                {
                    obj = this.candidates[i]
                    obj.input["last_" + name] = {
                        x: coords.x,
                        y: coords.y
                    }

                    obj.input.emit(name,
                    {
                        x: coords.x,
                        y: coords.y
                    })

                    if (name == "up")
                    {
                        var point = obj.input["last_down"]
                        if (point && Tiny.Math.distance(point.x, point.y, coords.x, coords.y) < 30)
                            obj.input.emit("click",
                            {
                                x: coords.x,
                                y: coords.y
                            })
                    }

                    if (!obj.input.transparent) 
                    {
                        break
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

            this.emit(name,
            {
                x: coords.x,
                y: coords.y
            });
        }
    },

    moveHandler: function(event)
    {
        this.lastMove = event;
        this.inputHandler("move", event);
    },

    upHandler: function(event)
    {
        this.isDown = false;
        this.inputHandler("up", this.lastMove);
    },

    downHandler: function(event)
    {
        this.isDown = true;
        this.lastMove = event;
        this.inputHandler("down", event);
    },

    clickHandler: function(event)
    {
        this.inputHandler("click", event);
    },

    getCoords: function(event)
    {
        var coords = null;

        if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent)
        {
            listeningToTouchEvents = true;

            if (event.touches.length > 0)
            {
                coords = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                };
            }
            else if (event.clientX && event.clientY)
            {
                coords = {
                    x: event.clientX,
                    y: event.clientY
                };
            }
            else
            {
                // listeningToTouchEvents = false;
            }
        }
        else
        {
            // Mouse event
            coords = {
                x: event.clientX,
                y: event.clientY
            };
        }

        if (listeningToTouchEvents && event instanceof MouseEvent || coords === null) return null;

        coords = {
            x: (coords.x - this.bounds.x),
            y: (coords.y - this.bounds.y),
        };

        return coords;
    },

    updateBounds: function() 
    {
        bounds = this.bounds;

        var clientRect = this.domElement.getBoundingClientRect();

        bounds.x = clientRect.left;
        bounds.y = clientRect.top;
        bounds.width = clientRect.width;
        bounds.height = clientRect.height;
    },

    destroy: function()
    {
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

Tiny.Input.checkBounds = function(obj, x, y)
{
    if (obj.worldVisible)
    {
        if (obj.getBounds().contains(x, y)) 
        {
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
}

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

Tiny.Loader = function(game)
{
    game.cache = Tiny.Cache;

    this.game = game;
    this.list = [];
};

Tiny.Loader.prototype = {

    clearCache: function() {

        for (var y in Tiny.Cache.texture) Tiny.Cache.texture[y].destroy();

        for (var y in Tiny.Cache) Tiny.Cache[y] = {};
    },

    all: function(array) {

        this.list = this.list.concat(array); 
    },

    image: function(key, source)
    {
        this.list.push(
        {
            src: source,
            key: key,
            type: "image"
        });
    },

    spritesheet: function(key, source, arg_1, arg_2, totalFrames, duration)
    {
        var res = {
            src: source,
            key: key,
            type: "spritesheet"
        };

        if (typeof arg_1 == "number")
        {
            res.width = arg_1;
            res.height = arg_2;
            res.total = totalFrames;
            res.duration = duration;
        }
        else if (arg_1.length > 0)
        {
            res.data = arg_1;
        }

        this.list.push(res);
    },

    atlas: function(key, source, atlasData)
    {
        this.list.push(
        {
            src: source,
            key: key,
            data: atlasData,
            type: "atlas"
        });
    },

    start: function(callback)
    {
        var game = this.game;
        var list = this.list;

        if (list.length == 0)
        {
            callback.call(game);
            return;
        }

        function loadNext()
        {
            // var done = false;
            var resource = list.shift();

            var loader = Tiny.Loader[resource.type];

            if (loader) {
                loader(resource, loaded);
            }
            else {
                console.warn("Cannot find loader for " + resource.type);
                loaded();
            }
        }

        function loaded(resource, data) 
        {
            if (list.length != 0) 
            {
                loadNext();
            }
            else 
            {
                callback.call(game);
            }
        }

        loadNext();
    }
};

Tiny.Loader.atlas = function(resource, cb)
{
    var key = resource.key;

    Tiny.Loader.image(resource, function(resource, image) {
        
        for (var i = 0; i < resource.data.length; i++)
        {
            var uuid = key + "." + resource.data[i].name;
            var texture = new Tiny.Texture(image, resource.data[i]);
            texture.key = key;

            Tiny.Cache.texture[uuid] = texture;
        }

        cb();
    });
}

Tiny.Loader.spritesheet = function(resource, cb)
{
    var key = resource.key;

    Tiny.Loader.image(resource, function(resource, image) {
        
        var lastFrame, uuid, texture;

        if (resource.data) {

            var frameData = resource.data;
            lastFrame = (frameData.length - 1);

            for (var i = 0; i <= lastFrame; i++)
            {
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
        }
        else 
        {
            var width = image.naturalWidth || image.width;
            var height = image.naturalHeight || image.height;

            var frameWidth = resource.width;
            var frameHeight = resource.height;

            if (!frameWidth) frameWidth = Math.floor(width / (resource.cols || 1));
            if (!frameHeight) frameHeight = Math.floor(height / (resource.rows || 1));

            var cols = Math.floor(width / frameWidth);
            var rows = Math.floor(height / frameHeight);

            var total = cols * rows;

            if (total === 0) 
            {
                return cb();
            }

            if (resource.total) total = Math.min(total, resource.total);

            var x = 0;
            var y = 0;
            lastFrame = total - 1;

            for (var i = 0; i < total; i++)
            {
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

                if (x + frameWidth > width)
                {
                    x = 0;
                    y += frameHeight;
                }
            }
        }

        cb();
    });
}


Tiny.Loader.image = function(resource, cb) 
{
    // if (Tiny.Cache["image"][resource.key]) return cb(resource, Tiny.Cache["image"][resource.key]);

    const image = new Image();

    image.addEventListener('load', function()
    {
        Tiny.Cache.image[resource.key] = image;
        
        cb(resource, image);
    });

    // image.addEventListener('error', function()
    // {
    //     cb(resource, image);
    // })

    image.src = resource.src;
}

Tiny.registerSystem("load", Tiny.Loader);

/***/ }),

/***/ "./src/systems/RAF.js":
/*!****************************!*\
  !*** ./src/systems/RAF.js ***!
  \****************************/
/***/ (() => {

var _isSetTimeOut, _onLoop, _timeOutID, _prevTime, _lastTime;

var now = function() {
    return new Date().getTime();
}

if (self.performance !== undefined && self.performance.now !== undefined) {
    now = self.performance.now.bind(self.performance);
} else if (Date.now !== undefined) {
    now = Date.now;
}

Tiny.RAF = function (game, forceSetTimeOut)
{

    if (forceSetTimeOut === undefined) { forceSetTimeOut = false; }
    this.game = game;

    this.isRunning = false;
    this.forceSetTimeOut = forceSetTimeOut;

    var vendors = [
        'ms',
        'moz',
        'webkit',
        'o'
    ];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
    {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    _isSetTimeOut = false;
    _onLoop = null;
    _timeOutID = null;

    _prevTime = 0
    _lastTime = 0
};

Tiny.RAF.prototype = {

    start: function ()
    {

        _prevTime = now();

        this.isRunning = true;

        var _this = this;

        if (!window.requestAnimationFrame || this.forceSetTimeOut)
        {
            _isSetTimeOut = true;

            _onLoop = function ()
            {
                return _this.updateSetTimeout();
            };

            _timeOutID = window.setTimeout(_onLoop, 0);
        }
        else
        {
            _isSetTimeOut = false;

            _onLoop = function ()
            {
                
                return _this.updateRAF();
            };

            _timeOutID = window.requestAnimationFrame(_onLoop);
        }
    },

    updateRAF: function ()
    {
        _lastTime = now()

        if (this.isRunning)
        {
            this.game._update(Math.floor(_lastTime), _lastTime - _prevTime);

            _timeOutID = window.requestAnimationFrame(_onLoop);
        }

        _prevTime = _lastTime

    },

    updateSetTimeout: function ()
    {
        _lastTime = now()
        if (this.isRunning)
        {
            this.game._update(Math.floor(_lastTime), _lastTime - _prevTime);

            _timeOutID = window.setTimeout(_onLoop, Tiny.RAF.timeToCall);
        }
        _prevTime = _lastTime
    },

    reset: function() 
    {
        _prevTime = now();
    },

    stop: function ()
    {
        if (_isSetTimeOut)
        {
            clearTimeout(_timeOutID);
        }
        else
        {
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

var noop = function() {};

var Timer = function(autoStart, autoRemove, game, cb, ctx, delay, loop, n, oncomplete)
{
    this.game = game;
    this.cb = cb || noop;
    this.ctx = ctx || this;
    this.delay = (delay == undefined ? 1000 : delay);
    this.loop = loop;
    this.count = n || 0;
    this.repeat = (this.count > 0);
    this.running = !!autoStart;
    this._lastFrame = 0;
    this.autoRemove = autoRemove;
    this.onComplete = oncomplete || noop;
}

Timer.prototype = {
    start: function()
    {
        this.running = true;
    },
    pause: function()
    {
        this.running = false;
    },
    stop: function()
    {
        this.running = false;
        this._lastFrame = 0;
    },
    update: function(deltaTime)
    {
        if (this.running)
        {
            this._lastFrame += deltaTime
            if (this._lastFrame >= this.delay)
            {
                this.cb.call(this.ctx);
                this._lastFrame = 0;
                if (this.repeat)
                {
                    this.count--;
                    if (this.count === 0)
                    {
                        this.running = false;
                        this.autoRemove && this.game.timer.remove(this);
                        this.onComplete();
                    }
                }
                else if (!this.loop)
                {
                    this.running = false;
                    this.autoRemove && this.game.timer.remove(this);
                }
            }
        }
    }
}

Tiny.Timer = Timer;

Tiny.TimerCreator = function(game)
{
    this.game = game;
    this.list = [];
    this.autoStart = true;
    this.autoRemove = true;
};

Tiny.TimerCreator.prototype = {

    update: function(delta) 
    {
        for (var i = 0; i < this.list.length; i++)
        {
            this.list[i].update(delta);
        }
    },
    removeAll: function()
    {
        for (var i = 0; i < this.list.length; i++)
        {
            this.list[i].stop();
        }

        this.list = [];
    },
    remove: function(tm)
    {
        var indexOf = this.list.indexOf(tm);
        if (indexOf > -1)
        {
            tm.stop();
            this.list.splice(indexOf, 1);
        }
    },
    add: function(delay, cb, ctx, autostart, autoremove)
    {
        autostart = autostart != undefined ? autostart : this.autoStart;
        autoremove = autoremove != undefined ? autoremove : this.autoRemove;

        var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay);
        this.list.push(timer);
        return timer;
    },
    loop: function(delay, cb, ctx, autostart, autoremove)
    {
        autostart = autostart != undefined ? autostart : this.autoStart;
        autoremove = autoremove != undefined ? autoremove : this.autoRemove;

        var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay, true);
        this.list.push(timer);
        return timer;
    },
    repeat: function(delay, n, cb, ctx, autostart, autoremove, complete)
    {
        autostart = autostart != undefined ? autostart : this.autoStart;
        autoremove = autoremove != undefined ? autoremove : this.autoRemove;

        var timer = new Timer(autostart, autoremove, this.game, cb, ctx, delay, false, n, complete);
        this.list.push(timer);
        return timer;
    },
    destroy: function() {
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

		return Object.keys(this._tweens).map(function (tweenId) {
			return this._tweens[tweenId];
		}.bind(this));

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
// 	TWEEN.now = function () {
// 		var time = process.hrtime();

// 		// Convert [seconds, nanoseconds] to milliseconds.
// 		return time[0] * 1000 + time[1] / 1000000;
// 	};
// }
// // In a browser, use self.performance.now if it is available.
// else if (typeof (self) !== 'undefined' &&
//          self.performance !== undefined &&
// 		 self.performance.now !== undefined) {
// 	// This must be bound, because directly assigning this function
// 	// leads to an invocation exception in Chrome.
// 	TWEEN.now = self.performance.now.bind(self.performance);
// }
// // Use Date.now if it is available.
// else if (Date.now !== undefined) {
// 	TWEEN.now = Date.now;
// }
// // Otherwise, use 'new Date().getTime()'.
// else {
// 	TWEEN.now = function () {
// 		return new Date().getTime();
// 	};
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
			if (reset == true || typeof(this._valuesStart[property]) === 'undefined') {
				this._valuesStart[property] = this._object[property];
			}

			if ((this._valuesStart[property] instanceof Array) === false) {
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

	pause: function() {

		if (this._isPaused || !this._isPlaying) {
			return this;
		}

		this._isPaused = true;

		// this._pauseStart = time === undefined ? TWEEN.now() : time;

		this._group.remove(this);

		return this;

	},

	resume: function() {

		if (!this._isPaused || !this._isPlaying) {
			return this;
		}

		this._isPaused = false;

		// this._startTime += (time === undefined ? TWEEN.now() : time)
		// 	- this._pauseStart;

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
		elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

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
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
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

					if (typeof (this._valuesEnd[property]) === 'string') {
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

			return - 0.5 * (--k * (k - 2) - 1);

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

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

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

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

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

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

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

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
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

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
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

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

window.TWEEN = TWEEN

Tiny.TweenManager = function(game)
{
	this.game = game;
	this.bufferList = [];
	this.group = new _Group();
};

Tiny.TweenManager.prototype = {

	remove: function(tween) {
		this.group.remove(tween);
	},

	add: function(obj) {
		return new Tiny.Tween(obj, this.group);
	},

	pause: function() {

        this.bufferList.length = 0;

        for (var k in this.group._tweens)
        {
            this.bufferList.push(this.group._tweens[k]);
            this.group._tweens[k].pause();
        }
        
	},

	resume() {

		for (var i = 0; i < this.bufferList.length; i++)
        {
            this.bufferList[i].resume();
        }

        this.bufferList.length = 0;
        
	},

    update: function(delta) {
        this.group.update(delta);
    },

    destroy: function() {
    	this.bufferList.length = 0;
    	this.group.removeAll();
    	this.group = null;
    }
}

Tiny.registerSystem("tweens", Tiny.TweenManager);

/***/ }),

/***/ "./src/textures/RenderTexture.js":
/*!***************************************!*\
  !*** ./src/textures/RenderTexture.js ***!
  \***************************************/
/***/ (() => {


Tiny.RenderTexture = function(width, height, renderer, resolution)
{
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

    Tiny.Texture.call(this,
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

Tiny.RenderTexture.prototype.resize = function(width, height, updateBase)
{
    if (width === this.width && height === this.height)return;

    this.valid = (width > 0 && height > 0);

    this.width = width;
    this.height = height;
    this.frame.width = this.crop.width = width * this.resolution;
    this.frame.height = this.crop.height = height * this.resolution;

    if (updateBase)
    {
        // this.baseTexture.width = this.width * this.resolution;
        // this.baseTexture.height = this.height * this.resolution;
    }

    if(!this.valid)return;

    this.textureBuffer.resize(this.width * this.resolution, this.height * this.resolution);
};

Tiny.RenderTexture.prototype.clear = function()
{
    if(!this.valid)return;

    this.textureBuffer.clear();
};

Tiny.RenderTexture.prototype.render = function(displayObject, matrix, clear)
{
    if(!this.valid)return;

    var wt = displayObject.worldTransform;
    wt.identity();
    if(matrix)wt.append(matrix);
    
    // setWorld Alpha to ensure that the object is renderer at full opacity
    displayObject.worldAlpha = 1;

    // Time to update all the children of the displayObject with the new matrix..    
    var children = displayObject.children;

    for(var i = 0, j = children.length; i < j; i++)
    {
        children[i].updateTransform();
    }

    if(clear)this.textureBuffer.clear();

    var context = this.textureBuffer.context;

    var realResolution = this.renderer.resolution;

    this.renderer.resolution = this.resolution;

    this.renderer.renderObject(displayObject, context);

    this.renderer.resolution = realResolution;
};

Tiny.RenderTexture.prototype.getImage = function()
{
    var image = new Image();
    image.src = this.getBase64();
    return image;
};

Tiny.RenderTexture.prototype.getBase64 = function()
{
    return this.getCanvas().toDataURL();
};

Tiny.RenderTexture.prototype.getCanvas = function()
{
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

Tiny.Texture = function(source, frame, crop, trim)
{
    // console.log(this);
    this.noFrame = false;

    this.resolution = 1;

    this.hasLoaded = false;

    if (!frame)
    {
        this.noFrame = true;
        frame = new Tiny.Rectangle(0,0,1,1);
    }

    if (typeof source == "string") 
    {
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

    if((this.source.complete || this.source.getContext) && this.source.width && this.source.height)
    {
        this.onSourceLoaded();
    }
    else
    {
        var scope = this;
        this.source.onload = function() {
            scope.onSourceLoaded();
        };
    }
};

Tiny.Texture.prototype.constructor = Tiny.Texture;

Tiny.Texture.prototype.onSourceLoaded = function()
{
    this.hasLoaded = true;
    this.width = this.source.naturalWidth || this.source.width;
    this.height = this.source.naturalHeight || this.source.height;

    if (this.noFrame) this.frame = new Tiny.Rectangle(0, 0, this.width, this.height);

    this.setFrame(this.frame);
};

Tiny.Texture.prototype.addToCache = function(key)
{
    Tiny.Cache.texture[key] = this;
    this.key = key;
};

Tiny.Texture.prototype.destroy = function()
{
    if (this.key) {
        delete Tiny.Cache.texture[this.key];
    }

    this.source = null;
    this.valid = false;
};

Tiny.Texture.prototype.setFrame = function(frame)
{
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

    if (!this.trim && (frame.x + frame.width > this.width || frame.y + frame.height > this.height))
    {
        if (!Tiny.TextureSilentFail)
        {
            throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);
        }

        this.valid = false;
        return;
    }

    if (this.trim)
    {
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

Tiny.Texture.fromCanvas = function(canvas)
{
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
    return new Tiny.Texture( canvas );
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

Tiny.CanvasBuffer = function(width, height, options)
{

    this.width = width;

    this.height = height;

    this.canvas = document.createElement("canvas");

    this.context = this.canvas.getContext("2d", options);

    this.canvas.width = width;
    this.canvas.height = height;
};

Tiny.CanvasBuffer.prototype.constructor = Tiny.CanvasBuffer;

Tiny.CanvasBuffer.prototype.clear = function()
{
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0,0, this.width, this.height);
};

Tiny.CanvasBuffer.prototype.resize = function(width, height)
{
    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;
};

/***/ }),

/***/ "./src/utils/EventEmitter.js":
/*!***********************************!*\
  !*** ./src/utils/EventEmitter.js ***!
  \***********************************/
/***/ (() => {


function EventListeners() 
{
    this.a = [];
    this.n = 0;
}

Tiny.EventEmitter = {

    call: function(obj) 
    {
        if (obj) 
        {
            obj = obj.prototype || obj;
            Tiny.EventEmitter.mixin(obj);
        }
    },

    mixin: function(obj) 
    {
        const listeners_events = {};

        function pushListener(event, fn, context, once)
        {
            var listeners = listeners_events[event]

            if (!listeners)
            {
                listeners = listeners_events[event] = new EventListeners();
            }

            listeners.a.push(fn, context || null, once || false);
            listeners.n += 3;
        }

        obj.once = function(event, fn, context)
        {
            pushListener(event, fn, context, true);
        }

        obj.on = pushListener;

        obj.off = function(event, fn, context)
        {
            var listeners = listeners_events[event]

            if (!listeners) return;

            var fnArray = listeners_events[event].a;

            if (!fn) 
            {
                fnArray.length = 0;
            }
            else if (!context) 
            {
                for (var i = 0; i < fnArray.length; i += 3)
                {
                    if (fnArray[i] == fn)
                    {
                        fnArray.splice(i, 3);
                        i -= 3;
                    }
                }
            }
            else 
            {
                for (var i = 0; i < fnArray.length; i += 3)
                {
                    if (fnArray[i] == fn && fnArray[i + 1] == context)
                    {
                        fnArray.splice(i, 3);
                        i -= 3;
                    }
                }
            }

            if (fnArray.length == 0) 
            {
                delete listeners_events[event];
            }
        }

        obj.emit = function(event, a1, a2, a3)
        {
            var listeners = listeners_events[event];

            if (!listeners) return;

            var fnArray = listeners.a;
            listeners.n = 0;

            var len = arguments.length;
            var fn, ctx;

            for (var i = 0; i < fnArray.length - listeners.n; i += 3)
            {
                fn = fnArray[i];
                ctx = fnArray[i + 1];
                
                if (fnArray[i + 2])
                {
                    fnArray.splice(i, 3);
                    i -= 3;
                }

                if (len <= 1)
                    fn.call(ctx);
                else if (len == 2)
                    fn.call(ctx, a1);
                else if (len == 3)
                    fn.call(ctx, a1, a2);
                else
                    fn.call(ctx, a1, a2, a3);

                // if (fnArray[i + 2])
                // {
                //     fnArray.splice(i, 3);
                //     i -= 3;
                // }
            }

            if (fnArray.length == 0) 
            {
                delete listeners_events[event];
            }
        }
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

if (typeof(Float32Array) == 'undefined')
{
	window.Float32Array = Array
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
__webpack_require__(/*! ./mini.js */ "./src/mini.js")

// require('./systems/ObjectCreator.js'); // 1 Kb
// require('./systems/Loader.js'); // 3 Kb
// require('./systems/Input.js'); // 1 Kb
// require('./systems/Timer.js'); // 1 Kb
__webpack_require__(/*! ./systems/Tween.js */ "./src/systems/Tween.js");

__webpack_require__(/*! ./math/RoundedRectangle.js */ "./src/math/RoundedRectangle.js");	//
__webpack_require__(/*! ./math/Polygon.js */ "./src/math/Polygon.js");			//
__webpack_require__(/*! ./math/Circle.js */ "./src/math/Circle.js");			// 6 Kb

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlueS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkJBQTJCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkxBLG1CQUFPLENBQUMsb0RBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMsOEJBQVU7QUFDbEIsbUJBQU8sQ0FBQyxvQ0FBYTtBQUNyQixtQkFBTyxDQUFDLDBDQUFnQixHQUFHO0FBQzNCLG1CQUFPLENBQUMsNENBQWlCLFFBQVE7QUFDakMsbUJBQU8sQ0FBQyw4Q0FBa0IsT0FBTztBQUNqQyxtQkFBTyxDQUFDLG9EQUFxQixJQUFJO0FBQ2pDO0FBQ0EsbUJBQU8sQ0FBQyxnRUFBMkIsZUFBZTtBQUNsRCxtQkFBTyxDQUFDLHdEQUF1QixNQUFNO0FBQ3JDLG1CQUFPLENBQUMsa0RBQW9CLHVCQUF1QjtBQUNuRDtBQUNBLG1CQUFPLENBQUMsd0VBQStCLEdBQUc7Ozs7Ozs7Ozs7QUNmMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxTQUFTO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7QUN4TEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdENBLG1CQUFPLENBQUMsZ0NBQVc7QUFDbkI7QUFDQTtBQUNBLG1CQUFPLENBQUMsOENBQWtCLEdBQUc7QUFDN0IsMENBQTBDO0FBQzFDLG1CQUFPLENBQUMsb0RBQXFCLEdBQUc7QUFDaEMsbUJBQU8sQ0FBQyxrREFBb0IsR0FBRztBQUMvQixtQkFBTyxDQUFDLGtEQUFvQixHQUFHO0FBQy9CO0FBQ0EsbUJBQU8sQ0FBQyw0REFBeUI7QUFDakM7QUFDQSxtQkFBTyxDQUFDLHdEQUF1QixJQUFJO0FBQ25DO0FBQ0EsbUJBQU8sQ0FBQyxvREFBcUIsR0FBRztBQUNoQyxtQkFBTyxDQUFDLGdEQUFtQixHQUFHO0FBQzlCO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7Ozs7O0FDdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw4QkFBOEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxtQkFBbUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7QUM5MUJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsS0FBSztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMvVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0EsdUJBQXVCLFVBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0EsdUJBQXVCLFVBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcFlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLDBCQUEwQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx5QkFBeUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHlCQUF5QjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLCtCQUErQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywrQkFBK0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsUUFBUTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBLDZDQUE2Qyx5QkFBeUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QseUJBQXlCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUJBQXlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pSQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFdBQVc7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHFEQUFxRDtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLHNCQUFzQjtBQUN2RjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsc0JBQXNCO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNEJBQTRCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMS9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG9CQUFvQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGtDQUFrQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ1RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxtQkFBTyxDQUFDLGdDQUFXO0FBQ25CO0FBQ0EsMENBQTBDO0FBQzFDLG1DQUFtQztBQUNuQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLG1CQUFPLENBQUMsa0RBQW9CO0FBQzVCO0FBQ0EsbUJBQU8sQ0FBQyxrRUFBNEIsR0FBRztBQUN2QyxtQkFBTyxDQUFDLGdEQUFtQixLQUFLO0FBQ2hDLG1CQUFPLENBQUMsOENBQWtCLEtBQUs7QUFDL0I7QUFDQSxtQkFBTyxDQUFDLDRFQUFpQyxHQUFHO0FBQzVDO0FBQ0EsbUJBQU8sQ0FBQyx3REFBdUIsR0FBRztBQUNsQyx5Q0FBeUM7QUFDekM7QUFDQSxtQkFBTyxDQUFDLG9FQUE2QixHQUFHO0FBQ3hDO0FBQ0EsbUJBQU8sQ0FBQyw0REFBeUIsR0FBRztBQUNwQyxtQkFBTyxDQUFDLDhFQUFrQyxHQUFHO0FBQzdDLG1CQUFPLENBQUMsb0VBQTZCLEdBQUcsc0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvQXBwLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9iYXNlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvQ2lyY2xlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL01hdGguanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvTWF0cml4LmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL1BvaW50LmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL1BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUmVjdGFuZ2xlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL1JvdW5kZWRSZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21pbmkuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvQmFzZU9iamVjdDJELmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL0dyYXBoaWNzLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL09iamVjdDJELmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL1NjZW5lLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL1Nwcml0ZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvb2JqZWN0cy9UZXh0LmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9yZW5kZXJlcnMvQ2FudmFzTWFza01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3JlbmRlcmVycy9DYW52YXNSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvcmVuZGVyZXJzL0NhbnZhc1RpbnRlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvcmVuZGVyZXJzL0dyYXBoaWNzUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvSW5wdXQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvTG9hZGVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL1JBRi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9UaW1lci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9Ud2Vlbi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdGV4dHVyZXMvUmVuZGVyVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdGV4dHVyZXMvVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdXRpbHMvQ2FudmFzQnVmZmVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy91dGlscy9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3V0aWxzL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2g1dGlueS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcblRpbnkuQXBwID0gZnVuY3Rpb24oc3RhdGVzKVxyXG57XHJcbiAgICB0aGlzLmNhbGxiYWNrQ29udGV4dCA9IHRoaXM7XHJcbiAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgIHRoaXMudGltZVNjYWxlID0gMTtcclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5zeXN0ZW1zID0gW107XHJcbiAgICB0aGlzLnVwZGF0YWJsZSA9IFtdO1xyXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VEdXJhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmlucHV0VmlldyA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgaWYgKFRpbnkuRXZlbnRFbWl0dGVyKSBUaW55LkV2ZW50RW1pdHRlci5taXhpbih0aGlzKTtcclxuXHJcbiAgICBzdGF0ZXMgPSBzdGF0ZXMgfHwge307XHJcbiAgICB0aGlzLmJvb3QgPSBzdGF0ZXMuYm9vdCB8fCB0aGlzLmJvb3QgfHwgbm9vcDtcclxuICAgIHRoaXMucHJlbG9hZCA9IHN0YXRlcy5wcmVsb2FkIHx8IHRoaXMucHJlbG9hZCB8fCBub29wO1xyXG4gICAgdGhpcy5jcmVhdGUgPSBzdGF0ZXMuY3JlYXRlIHx8IHRoaXMuY3JlYXRlIHx8IG5vb3A7XHJcbiAgICB0aGlzLnVwZGF0ZSA9IHN0YXRlcy51cGRhdGUgfHwgdGhpcy51cGRhdGUgfHwgbm9vcDtcclxuICAgIHRoaXMucmVuZGVyID0gc3RhdGVzLnJlbmRlciB8fCB0aGlzLnJlbmRlciB8fCBub29wO1xyXG4gICAgdGhpcy5fcmVzaXplX2NiID0gc3RhdGVzLnJlc2l6ZSB8fCBub29wO1xyXG4gICAgdGhpcy5fZGVzdHJveV9jYiA9IHN0YXRlcy5kZXN0cm95IHx8IG5vb3A7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgc2VsZi5fYm9vdCgpO1xyXG4gICAgfSwgMCk7XHJcbn1cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fYm9vdCA9IGZ1bmN0aW9uKClcclxue1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5zeXN0ZW1zLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzeXN0ZW0gPSBUaW55LnN5c3RlbXNbaV07XHJcblxyXG4gICAgICAgIHZhciBfc3lzXyA9IG5ldyBzeXN0ZW0uX2NsYXNzXyh0aGlzKTtcclxuICAgICAgICB0aGlzLnN5c3RlbXMucHVzaChfc3lzXyk7XHJcbiAgICAgICAgaWYgKF9zeXNfLnVwZGF0ZSkgdGhpcy51cGRhdGFibGUucHVzaChfc3lzXyk7XHJcblxyXG4gICAgICAgIGlmIChzeXN0ZW0ubmFtZSkgdGhpc1tzeXN0ZW0ubmFtZV0gPSBfc3lzXztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoVGlueS5SQUYpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmFmID0gbmV3IFRpbnkuUkFGKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYm9vdC5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZiAoc2VsZi5sb2FkKSBzZWxmLl9wcmVsb2FkKCk7XHJcbiAgICAgICAgZWxzZSBzZWxmLl9jcmVhdGUoKTtcclxuICAgIH0sIDApXHJcbn1cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fcHJlbG9hZCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5wcmVsb2FkLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IDE7XHJcbiAgICB0aGlzLmxvYWQuc3RhcnQodGhpcy5fY3JlYXRlKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSBcclxue1xyXG4gICAgdGhpcy5jcmVhdGUuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcblxyXG4gICAgaWYgKHRoaXMucmFmKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhZi5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGUgPSAyO1xyXG59XHJcblxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSBcclxue1xyXG4gICAgaWYgKHRoaXMucmFmKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wYXVzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLnBhdXNlKSB0aGlzLnN5c3RlbXNbaV0ucGF1c2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYgKHRoaXMucmFmKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodGhpcy5wYXVzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLnJlc3VtZSkgdGhpcy5zeXN0ZW1zW2ldLnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbih0aW1lLCBkZWx0YSlcclxue1xyXG4gICAgaWYgKCF0aGlzLnBhdXNlZClcclxuICAgIHtcclxuICAgICAgICBkZWx0YSAqPSB0aGlzLnRpbWVTY2FsZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZS5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwidXBkYXRlXCIsIGRlbHRhKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVwZGF0YWJsZS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRhYmxlW2ldLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGF1c2VEdXJhdGlvbiArPSBkZWx0YVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB0aGlzLmVtaXQoXCJwb3N0cmVuZGVyXCIpO1xyXG59XHJcblxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCB0aGlzLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUgPiAwKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9yZXNpemVfY2IuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChzZWxmLmlucHV0KSBzZWxmLmlucHV0LnVwZGF0ZUJvdW5kcygpO1xyXG4gICAgfSwgMClcclxufVxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihjbGVhckNhY2hlKVxyXG57XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3lzdGVtcy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLmRlc3Ryb3kpIHRoaXMuc3lzdGVtc1tpXS5kZXN0cm95KGNsZWFyQ2FjaGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoY2xlYXJDYWNoZSkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmNsZWFyQ2FjaGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yYWYpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmFmLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kZXN0cm95X2NiLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG59XHJcbiIsInJlcXVpcmUoJy4vdXRpbHMvcG9seWZpbGwuanMnKTtcclxuXHJcbndpbmRvdy5UaW55ID0ge307XHJcblxyXG5yZXF1aXJlKCcuL0FwcC5qcycpO1xyXG5yZXF1aXJlKCcuL2dsb2JhbC5qcycpO1xyXG5yZXF1aXJlKCcuL21hdGgvTWF0aC5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoJy4vbWF0aC9Qb2ludC5qcycpOyAgICAgIC8vXHJcbnJlcXVpcmUoJy4vbWF0aC9NYXRyaXguanMnKTsgICAgIC8vXHJcbnJlcXVpcmUoJy4vbWF0aC9SZWN0YW5nbGUuanMnKTsgIC8vICA4IEtiXHJcblxyXG5yZXF1aXJlKCcuL29iamVjdHMvQmFzZU9iamVjdDJELmpzJyk7ICAgICAgICAgICAgIC8vXHJcbnJlcXVpcmUoJy4vb2JqZWN0cy9PYmplY3QyRC5qcycpOyAgICAvL1xyXG5yZXF1aXJlKCcuL29iamVjdHMvU2NlbmUuanMnKTsgICAgICAgICAgICAgICAgICAgICAvLyAxMCBLYlxyXG5cclxucmVxdWlyZSgnLi9yZW5kZXJlcnMvQ2FudmFzUmVuZGVyZXIuanMnKTsgLy8gMyBLYiIsIlxyXG5UaW55LlZFUlNJT04gPSBcIjIuMS4zXCI7XHJcblxyXG5UaW55LnN5c3RlbXMgPSBbXTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0gPSBmdW5jdGlvbihuYW1lLCBzeXN0ZW0pIHtcclxuICAgIFRpbnkuc3lzdGVtcy5wdXNoKHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIF9jbGFzc186IHN5c3RlbVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblRpbnkuUHJpbWl0aXZlcyA9IHtcclxuICAgIFBPTFk6IDAsXHJcbiAgICBSRUNUOiAxLCBcclxuICAgIENJUkM6IDIsXHJcbiAgICBFTElQOiAzLFxyXG4gICAgUlJFQzogNCxcclxuICAgIFJSRUNfTEpPSU46IDVcclxufVxyXG5cclxuVGlueS5ybmQgPSBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XHJcbn07XHJcblxyXG5UaW55LmNvbG9yMnJnYiA9IGZ1bmN0aW9uKHN0eWxlKSB7XHJcbiAgICByZXR1cm4gVGlueS5oZXgycmdiKFRpbnkuc3R5bGUyaGV4KHN0eWxlKSk7XHJcbn1cclxuXHJcblRpbnkuY29sb3Iyc3R5bGUgPSBmdW5jdGlvbihzdHlsZSkge1xyXG4gICAgcmV0dXJuIHN0eWxlO1xyXG59O1xyXG5cclxuVGlueS5zdHlsZTJoZXggPSBmdW5jdGlvbihzdHlsZSkge1xyXG4gICAgcmV0dXJuICtzdHlsZS5yZXBsYWNlKCcjJywgJzB4Jyk7XHJcbn07XHJcblxyXG5UaW55LmhleDJzdHlsZSA9IGZ1bmN0aW9uKGhleCkge1xyXG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICggaGV4IHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG59XHJcblxyXG5UaW55LmhleDJyZ2IgPSBmdW5jdGlvbihoZXgpIHtcclxuICAgIHJldHVybiBbKGhleCA+PiAxNiAmIDB4RkYpIC8gMjU1LCAoIGhleCA+PiA4ICYgMHhGRikgLyAyNTUsIChoZXggJiAweEZGKS8gMjU1XTtcclxufTtcclxuXHJcblRpbnkucmdiMmhleCA9IGZ1bmN0aW9uKHJnYikge1xyXG4gICAgcmV0dXJuICgocmdiWzBdKjI1NSA8PCAxNikgKyAocmdiWzFdKjI1NSA8PCA4KSArIHJnYlsyXSoyNTUpO1xyXG59OyIsIlRpbnkuQ2lyY2xlID0gZnVuY3Rpb24gKHgsIHksIGRpYW1ldGVyKSB7XHJcblxyXG4gICAgeCA9IHggfHwgMDtcclxuICAgIHkgPSB5IHx8IDA7XHJcbiAgICBkaWFtZXRlciA9IGRpYW1ldGVyIHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geDtcclxuXHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMuX2RpYW1ldGVyID0gZGlhbWV0ZXI7XHJcblxyXG4gICAgdGhpcy5fcmFkaXVzID0gMDtcclxuXHJcbiAgICBpZiAoZGlhbWV0ZXIgPiAwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IGRpYW1ldGVyICogMC41O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5DSVJDO1xyXG5cclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55LlJlY3RhbmdsZSh0aGlzLnggLSB0aGlzLnJhZGl1cywgdGhpcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMuZGlhbWV0ZXIsIHRoaXMuZGlhbWV0ZXIpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5LCBkaWFtZXRlcikge1xyXG5cclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSBkaWFtZXRlcjtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSBkaWFtZXRlciAqIDAuNTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb3B5RnJvbTogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zZXRUbyhzb3VyY2UueCwgc291cmNlLnksIHNvdXJjZS5kaWFtZXRlcik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb3B5VG86IGZ1bmN0aW9uIChkZXN0KSB7XHJcblxyXG4gICAgICAgIGRlc3QueCA9IHRoaXMueDtcclxuICAgICAgICBkZXN0LnkgPSB0aGlzLnk7XHJcbiAgICAgICAgZGVzdC5kaWFtZXRlciA9IHRoaXMuX2RpYW1ldGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVzdDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRpc3RhbmNlOiBmdW5jdGlvbiAoZGVzdCwgcm91bmQpIHtcclxuXHJcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gVGlueS5NYXRoLmRpc3RhbmNlKHRoaXMueCwgdGhpcy55LCBkZXN0LngsIGRlc3QueSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdW5kID8gTWF0aC5yb3VuZChkaXN0YW5jZSkgOiBkaXN0YW5jZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiIHx8IG91dHB1dCA9PT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG5ldyBUaW55LkNpcmNsZSh0aGlzLngsIHRoaXMueSwgdGhpcy5kaWFtZXRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dC5zZXRUbyh0aGlzLngsIHRoaXMueSwgdGhpcy5kaWFtZXRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgICAgIHJldHVybiBUaW55LkNpcmNsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9mZnNldDogZnVuY3Rpb24gKGR4LCBkeSkge1xyXG5cclxuICAgICAgICB0aGlzLnggKz0gZHg7XHJcbiAgICAgICAgdGhpcy55ICs9IGR5O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9mZnNldFBvaW50OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXQocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuVGlueS5DaXJjbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DaXJjbGU7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImRpYW1ldGVyXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlhbWV0ZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSB2YWx1ZSAqIDAuNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwicmFkaXVzXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gdmFsdWUgKiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwibGVmdFwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAtIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gdGhpcy54KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHRoaXMueCAtIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwicmlnaHRcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHRoaXMueClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB2YWx1ZSAtIHRoaXMueDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcInRvcFwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSAtIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gdGhpcy55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHRoaXMueSAtIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiYm90dG9tXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPCB0aGlzLnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdmFsdWUgLSB0aGlzLnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJhcmVhXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3JhZGl1cyA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSSAqIHRoaXMuX3JhZGl1cyAqIHRoaXMuX3JhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJlbXB0eVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl9kaWFtZXRlciA9PT0gMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG8oMCwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5DaXJjbGUuY29udGFpbnMgPSBmdW5jdGlvbiAoYSwgeCwgeSkge1xyXG5cclxuICAgIC8vICBDaGVjayBpZiB4L3kgYXJlIHdpdGhpbiB0aGUgYm91bmRzIGZpcnN0XHJcbiAgICBpZiAoYS5yYWRpdXMgPiAwICYmIHggPj0gYS5sZWZ0ICYmIHggPD0gYS5yaWdodCAmJiB5ID49IGEudG9wICYmIHkgPD0gYS5ib3R0b20pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGR4ID0gKGEueCAtIHgpICogKGEueCAtIHgpO1xyXG4gICAgICAgIHZhciBkeSA9IChhLnkgLSB5KSAqIChhLnkgLSB5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChkeCArIGR5KSA8PSAoYS5yYWRpdXMgKiBhLnJhZGl1cyk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLmVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICByZXR1cm4gKGEueCA9PSBiLnggJiYgYS55ID09IGIueSAmJiBhLmRpYW1ldGVyID09IGIuZGlhbWV0ZXIpO1xyXG59O1xyXG5cclxuVGlueS5DaXJjbGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICByZXR1cm4gKFRpbnkuTWF0aC5kaXN0YW5jZShhLngsIGEueSwgYi54LCBiLnkpIDw9IChhLnJhZGl1cyArIGIucmFkaXVzKSk7XHJcbn07XHJcblxyXG5cclxuVGlueS5DaXJjbGUuaW50ZXJzZWN0c1JlY3RhbmdsZSA9IGZ1bmN0aW9uIChjLCByKSB7XHJcblxyXG4gICAgdmFyIGN4ID0gTWF0aC5hYnMoYy54IC0gci54IC0gci5oYWxmV2lkdGgpO1xyXG4gICAgdmFyIHhEaXN0ID0gci5oYWxmV2lkdGggKyBjLnJhZGl1cztcclxuXHJcbiAgICBpZiAoY3ggPiB4RGlzdClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN5ID0gTWF0aC5hYnMoYy55IC0gci55IC0gci5oYWxmSGVpZ2h0KTtcclxuICAgIHZhciB5RGlzdCA9IHIuaGFsZkhlaWdodCArIGMucmFkaXVzO1xyXG5cclxuICAgIGlmIChjeSA+IHlEaXN0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3ggPD0gci5oYWxmV2lkdGggfHwgY3kgPD0gci5oYWxmSGVpZ2h0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB4Q29ybmVyRGlzdCA9IGN4IC0gci5oYWxmV2lkdGg7XHJcbiAgICB2YXIgeUNvcm5lckRpc3QgPSBjeSAtIHIuaGFsZkhlaWdodDtcclxuICAgIHZhciB4Q29ybmVyRGlzdFNxID0geENvcm5lckRpc3QgKiB4Q29ybmVyRGlzdDtcclxuICAgIHZhciB5Q29ybmVyRGlzdFNxID0geUNvcm5lckRpc3QgKiB5Q29ybmVyRGlzdDtcclxuICAgIHZhciBtYXhDb3JuZXJEaXN0U3EgPSBjLnJhZGl1cyAqIGMucmFkaXVzO1xyXG5cclxuICAgIHJldHVybiB4Q29ybmVyRGlzdFNxICsgeUNvcm5lckRpc3RTcSA8PSBtYXhDb3JuZXJEaXN0U3E7XHJcblxyXG59O1xyXG4iLCJcclxuVGlueS5NYXRoID0ge1xyXG5cclxuICAgIGRpc3RhbmNlOiBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcclxuXHJcbiAgICAgICAgdmFyIGR4ID0geDEgLSB4MjtcclxuICAgICAgICB2YXIgZHkgPSB5MSAtIHkyO1xyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgZGVncmVlVG9SYWRpYW5zRmFjdG9yID0gTWF0aC5QSSAvIDE4MDtcclxudmFyIHJhZGlhblRvRGVncmVlc0ZhY3RvciA9IDE4MCAvIE1hdGguUEk7XHJcblxyXG5UaW55Lk1hdGguZGVnVG9SYWQgPSBmdW5jdGlvbiBkZWdUb1JhZCAoZGVncmVlcykge1xyXG4gICAgcmV0dXJuIGRlZ3JlZXMgKiBkZWdyZWVUb1JhZGlhbnNGYWN0b3I7XHJcbn07XHJcblxyXG5UaW55Lk1hdGgucmFkVG9EZWcgPSBmdW5jdGlvbiByYWRUb0RlZyAocmFkaWFucykge1xyXG4gICAgcmV0dXJuIHJhZGlhbnMgKiByYWRpYW5Ub0RlZ3JlZXNGYWN0b3I7XHJcbn07IiwiXHJcblRpbnkuTWF0cml4ID0gZnVuY3Rpb24oKVxyXG57XHJcblxyXG4gICAgdGhpcy5hID0gMTtcclxuXHJcbiAgICB0aGlzLmIgPSAwO1xyXG5cclxuICAgIHRoaXMuYyA9IDA7XHJcblxyXG4gICAgdGhpcy5kID0gMTtcclxuXHJcbiAgICB0aGlzLnR4ID0gMDtcclxuXHJcbiAgICB0aGlzLnR5ID0gMDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55Lk1BVFJJWDtcclxuXHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuZnJvbUFycmF5ID0gZnVuY3Rpb24oYXJyYXkpXHJcbntcclxuICAgIHRoaXMuYSA9IGFycmF5WzBdO1xyXG4gICAgdGhpcy5iID0gYXJyYXlbMV07XHJcbiAgICB0aGlzLmMgPSBhcnJheVszXTtcclxuICAgIHRoaXMuZCA9IGFycmF5WzRdO1xyXG4gICAgdGhpcy50eCA9IGFycmF5WzJdO1xyXG4gICAgdGhpcy50eSA9IGFycmF5WzVdO1xyXG59O1xyXG5cclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24odHJhbnNwb3NlKVxyXG57XHJcbiAgICBpZiAoIXRoaXMuYXJyYXkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoOSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFycmF5ID0gdGhpcy5hcnJheTtcclxuXHJcbiAgICBpZiAodHJhbnNwb3NlKVxyXG4gICAge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5iO1xyXG4gICAgICAgIGFycmF5WzJdID0gMDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYztcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IDA7XHJcbiAgICAgICAgYXJyYXlbNl0gPSB0aGlzLnR4O1xyXG4gICAgICAgIGFycmF5WzddID0gdGhpcy50eTtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgYXJyYXlbMF0gPSB0aGlzLmE7XHJcbiAgICAgICAgYXJyYXlbMV0gPSB0aGlzLmM7XHJcbiAgICAgICAgYXJyYXlbMl0gPSB0aGlzLnR4O1xyXG4gICAgICAgIGFycmF5WzNdID0gdGhpcy5iO1xyXG4gICAgICAgIGFycmF5WzRdID0gdGhpcy5kO1xyXG4gICAgICAgIGFycmF5WzVdID0gdGhpcy50eTtcclxuICAgICAgICBhcnJheVs2XSA9IDA7XHJcbiAgICAgICAgYXJyYXlbN10gPSAwO1xyXG4gICAgICAgIGFycmF5WzhdID0gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbihwb3MsIG5ld1Bvcylcclxue1xyXG4gICAgbmV3UG9zID0gbmV3UG9zIHx8IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdmFyIHggPSBwb3MueDtcclxuICAgIHZhciB5ID0gcG9zLnk7XHJcblxyXG4gICAgbmV3UG9zLnggPSB0aGlzLmEgKiB4ICsgdGhpcy5jICogeSArIHRoaXMudHg7XHJcbiAgICBuZXdQb3MueSA9IHRoaXMuYiAqIHggKyB0aGlzLmQgKiB5ICsgdGhpcy50eTtcclxuXHJcbiAgICByZXR1cm4gbmV3UG9zO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5SW52ZXJzZSA9IGZ1bmN0aW9uKHBvcywgbmV3UG9zKVxyXG57XHJcbiAgICBuZXdQb3MgPSBuZXdQb3MgfHwgbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB2YXIgaWQgPSAxIC8gKHRoaXMuYSAqIHRoaXMuZCArIHRoaXMuYyAqIC10aGlzLmIpO1xyXG4gICAgdmFyIHggPSBwb3MueDtcclxuICAgIHZhciB5ID0gcG9zLnk7XHJcblxyXG4gICAgbmV3UG9zLnggPSB0aGlzLmQgKiBpZCAqIHggKyAtdGhpcy5jICogaWQgKiB5ICsgKHRoaXMudHkgKiB0aGlzLmMgLSB0aGlzLnR4ICogdGhpcy5kKSAqIGlkO1xyXG4gICAgbmV3UG9zLnkgPSB0aGlzLmEgKiBpZCAqIHkgKyAtdGhpcy5iICogaWQgKiB4ICsgKC10aGlzLnR5ICogdGhpcy5hICsgdGhpcy50eCAqIHRoaXMuYikgKiBpZDtcclxuXHJcbiAgICByZXR1cm4gbmV3UG9zO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIHRoaXMudHggKz0geDtcclxuICAgIHRoaXMudHkgKz0geTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbih4LCB5KVxyXG57XHJcbiAgICB0aGlzLmEgKj0geDtcclxuICAgIHRoaXMuZCAqPSB5O1xyXG4gICAgdGhpcy5jICo9IHg7XHJcbiAgICB0aGlzLmIgKj0geTtcclxuICAgIHRoaXMudHggKj0geDtcclxuICAgIHRoaXMudHkgKj0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbihhbmdsZSlcclxue1xyXG4gICAgdmFyIGNvcyA9IE1hdGguY29zKCBhbmdsZSApO1xyXG4gICAgdmFyIHNpbiA9IE1hdGguc2luKCBhbmdsZSApO1xyXG5cclxuICAgIHZhciBhMSA9IHRoaXMuYTtcclxuICAgIHZhciBjMSA9IHRoaXMuYztcclxuICAgIHZhciB0eDEgPSB0aGlzLnR4O1xyXG5cclxuICAgIHRoaXMuYSA9IGExICogY29zLXRoaXMuYiAqIHNpbjtcclxuICAgIHRoaXMuYiA9IGExICogc2luK3RoaXMuYiAqIGNvcztcclxuICAgIHRoaXMuYyA9IGMxICogY29zLXRoaXMuZCAqIHNpbjtcclxuICAgIHRoaXMuZCA9IGMxICogc2luK3RoaXMuZCAqIGNvcztcclxuICAgIHRoaXMudHggPSB0eDEgKiBjb3MgLSB0aGlzLnR5ICogc2luO1xyXG4gICAgdGhpcy50eSA9IHR4MSAqIHNpbiArIHRoaXMudHkgKiBjb3M7XHJcbiBcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG1hdHJpeClcclxue1xyXG4gICAgdmFyIGExID0gdGhpcy5hO1xyXG4gICAgdmFyIGIxID0gdGhpcy5iO1xyXG4gICAgdmFyIGMxID0gdGhpcy5jO1xyXG4gICAgdmFyIGQxID0gdGhpcy5kO1xyXG5cclxuICAgIHRoaXMuYSAgPSBtYXRyaXguYSAqIGExICsgbWF0cml4LmIgKiBjMTtcclxuICAgIHRoaXMuYiAgPSBtYXRyaXguYSAqIGIxICsgbWF0cml4LmIgKiBkMTtcclxuICAgIHRoaXMuYyAgPSBtYXRyaXguYyAqIGExICsgbWF0cml4LmQgKiBjMTtcclxuICAgIHRoaXMuZCAgPSBtYXRyaXguYyAqIGIxICsgbWF0cml4LmQgKiBkMTtcclxuXHJcbiAgICB0aGlzLnR4ID0gbWF0cml4LnR4ICogYTEgKyBtYXRyaXgudHkgKiBjMSArIHRoaXMudHg7XHJcbiAgICB0aGlzLnR5ID0gbWF0cml4LnR4ICogYjEgKyBtYXRyaXgudHkgKiBkMSArIHRoaXMudHk7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmlkZW50aXR5ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmEgPSAxO1xyXG4gICAgdGhpcy5iID0gMDtcclxuICAgIHRoaXMuYyA9IDA7XHJcbiAgICB0aGlzLmQgPSAxO1xyXG4gICAgdGhpcy50eCA9IDA7XHJcbiAgICB0aGlzLnR5ID0gMDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuaWRlbnRpdHlNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTsiLCJUaW55LlBvaW50ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgIHRoaXMueSA9IHkgfHwgMDtcclxufTtcclxuXHJcblRpbnkuUG9pbnQucHJvdG90eXBlID0ge1xyXG5cdCBzZXQ6IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgICAgIHRoaXMueSA9IHkgfHwgKCAoeSAhPT0gMCkgPyB0aGlzLnggOiAwICk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59OyIsIlxyXG5UaW55LlBvbHlnb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFyZWEgPSAwO1xyXG4gICAgdGhpcy5fcG9pbnRzID0gW107XHJcblxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0VG8uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5QT0xZO1xyXG5cclxufTtcclxuXHJcblRpbnkuUG9seWdvbi5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgdG9OdW1iZXJBcnJheTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gJ3VuZGVmaW5lZCcpIHsgb3V0cHV0ID0gW107IH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wb2ludHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3BvaW50c1tpXSA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXS54KTtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGZsYXR0ZW46IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy50b051bWJlckFycmF5KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuXHJcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMuX3BvaW50cy5zbGljZSgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvdXRwdXQgPT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5Qb2x5Z29uKHBvaW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dC5zZXRUbyhwb2ludHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoeCwgeSkge1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5fcG9pbnRzLmxlbmd0aDtcclxuICAgICAgICB2YXIgaW5zaWRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAtMSwgaiA9IGxlbmd0aCAtIDE7ICsraSA8IGxlbmd0aDsgaiA9IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaXggPSB0aGlzLl9wb2ludHNbaV0ueDtcclxuICAgICAgICAgICAgdmFyIGl5ID0gdGhpcy5fcG9pbnRzW2ldLnk7XHJcblxyXG4gICAgICAgICAgICB2YXIganggPSB0aGlzLl9wb2ludHNbal0ueDtcclxuICAgICAgICAgICAgdmFyIGp5ID0gdGhpcy5fcG9pbnRzW2pdLnk7XHJcblxyXG4gICAgICAgICAgICBpZiAoKChpeSA8PSB5ICYmIHkgPCBqeSkgfHwgKGp5IDw9IHkgJiYgeSA8IGl5KSkgJiYgKHggPCAoanggLSBpeCkgKiAoeSAtIGl5KSAvIChqeSAtIGl5KSArIGl4KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5zaWRlID0gIWluc2lkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluc2lkZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRvOiBmdW5jdGlvbiAocG9pbnRzKSB7XHJcblxyXG4gICAgICAgIHRoaXMuYXJlYSA9IDA7XHJcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gW107XHJcblxyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBJZiBwb2ludHMgaXNuJ3QgYW4gYXJyYXksIHVzZSBhcmd1bWVudHMgYXMgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwb2ludHMpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgeTAgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsbG93cyBmb3IgbWl4ZWQtdHlwZSBhcmd1bWVudHNcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludHNbaV0gPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IFRpbnkuUG9pbnQocG9pbnRzW2ldLCBwb2ludHNbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgVGlueS5Qb2ludChwb2ludHNbaV0ueCwgcG9pbnRzW2ldLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvaW50cy5wdXNoKHApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICBMb3dlc3QgYm91bmRhcnlcclxuICAgICAgICAgICAgICAgIGlmIChwLnkgPCB5MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB5MCA9IHAueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVBcmVhKHkwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2FsY3VsYXRlQXJlYTogZnVuY3Rpb24gKHkwKSB7XHJcblxyXG4gICAgICAgIHZhciBwMTtcclxuICAgICAgICB2YXIgcDI7XHJcbiAgICAgICAgdmFyIGF2Z0hlaWdodDtcclxuICAgICAgICB2YXIgd2lkdGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9wb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwMSA9IHRoaXMuX3BvaW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpID09PSBsZW4gLSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuX3BvaW50c1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5fcG9pbnRzW2kgKyAxXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXZnSGVpZ2h0ID0gKChwMS55IC0geTApICsgKHAyLnkgLSB5MCkpIC8gMjtcclxuICAgICAgICAgICAgd2lkdGggPSBwMS54IC0gcDIueDtcclxuICAgICAgICAgICAgdGhpcy5hcmVhICs9IGF2Z0hlaWdodCAqIHdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJlYTtcclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuVGlueS5Qb2x5Z29uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUG9seWdvbjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlBvbHlnb24ucHJvdG90eXBlLCAncG9pbnRzJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbihwb2ludHMpIHtcclxuXHJcbiAgICAgICAgaWYgKHBvaW50cyAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUbyhwb2ludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgQ2xlYXIgdGhlIHBvaW50c1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG4iLCJcclxuVGlueS5SZWN0YW5nbGUgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgd2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLlJFQ1RcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zKHRoaXMsIHgsIHkpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW50ZXJzZWN0czogZnVuY3Rpb24gKGIpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmludGVyc2VjdHModGhpcywgYik7XHJcblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwiYm90dG9tXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMueSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB2YWx1ZSAtIHRoaXMueTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwicmlnaHRcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLngpIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHZhbHVlIC0gdGhpcy54O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJ2b2x1bWVcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmVjdGFuZ2xlO1xyXG5cclxuVGlueS5SZWN0YW5nbGUuY29udGFpbnMgPSBmdW5jdGlvbiAoYSwgeCwgeSkge1xyXG5cclxuICAgIGlmIChhLndpZHRoIDw9IDAgfHwgYS5oZWlnaHQgPD0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICh4ID49IGEueCAmJiB4IDwgYS5yaWdodCAmJiB5ID49IGEueSAmJiB5IDwgYS5ib3R0b20pO1xyXG5cclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUG9pbnQgPSBmdW5jdGlvbiAoYSwgcG9pbnQpIHtcclxuXHJcbiAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuY29udGFpbnMoYSwgcG9pbnQueCwgcG9pbnQueSk7XHJcblxyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUuY29udGFpbnNSZWN0ID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHJcbiAgICAvLyAgSWYgdGhlIGdpdmVuIHJlY3QgaGFzIGEgbGFyZ2VyIHZvbHVtZSB0aGFuIHRoaXMgb25lIHRoZW4gaXQgY2FuIG5ldmVyIGNvbnRhaW4gaXRcclxuICAgIGlmIChhLnZvbHVtZSA+IGIudm9sdW1lKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGEueCA+PSBiLnggJiYgYS55ID49IGIueSAmJiBhLnJpZ2h0IDwgYi5yaWdodCAmJiBhLmJvdHRvbSA8IGIuYm90dG9tKTtcclxuXHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHJcbiAgICBpZiAoYS53aWR0aCA8PSAwIHx8IGEuaGVpZ2h0IDw9IDAgfHwgYi53aWR0aCA8PSAwIHx8IGIuaGVpZ2h0IDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhKGEucmlnaHQgPCBiLnggfHwgYS5ib3R0b20gPCBiLnkgfHwgYS54ID4gYi5yaWdodCB8fCBhLnkgPiBiLmJvdHRvbSk7XHJcblxyXG59O1xyXG5cclxuVGlueS5FbXB0eVJlY3RhbmdsZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAwLCAwKTsiLCJUaW55LlJvdW5kZWRSZWN0YW5nbGUgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbntcclxuXHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cyB8fCAyMDtcclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SUkVDO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLnJhZGl1cyk7XHJcbn07XHJcblxyXG5UaW55LlJvdW5kZWRSZWN0YW5nbGUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgaWYgKHRoaXMud2lkdGggPD0gMCB8fCB0aGlzLmhlaWdodCA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeDEgPSB0aGlzLng7XHJcblxyXG4gICAgaWYgKHggPj0geDEgJiYgeCA8PSB4MSArIHRoaXMud2lkdGgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHkxID0gdGhpcy55O1xyXG5cclxuICAgICAgICBpZiAoeSA+PSB5MSAmJiB5IDw9IHkxICsgdGhpcy5oZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUm91bmRlZFJlY3RhbmdsZTsiLCJyZXF1aXJlKCcuL2Jhc2UuanMnKVxyXG5cclxuXHJcbnJlcXVpcmUoJy4vc3lzdGVtcy9SQUYuanMnKTsgLy8gMiBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvT2JqZWN0Q3JlYXRvci5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoJy4vc3lzdGVtcy9Mb2FkZXIuanMnKTsgLy8gMyBLYlxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvSW5wdXQuanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvVGltZXIuanMnKTsgLy8gMSBLYlxyXG5cclxucmVxdWlyZSgnLi91dGlscy9FdmVudEVtaXR0ZXIuanMnKTtcclxuXHJcbnJlcXVpcmUoJy4vdGV4dHVyZXMvVGV4dHVyZS5qcycpO1x0XHQvLyA0IEtiXHJcblxyXG5yZXF1aXJlKCcuL29iamVjdHMvU3ByaXRlLmpzJyk7IC8vIDMgS2JcclxucmVxdWlyZSgnLi9vYmplY3RzL1RleHQuanMnKTsgLy8gNSBLYlxyXG5cclxuXHJcbiIsIlxyXG52YXIgcGkyID0gTWF0aC5QSSAqIDI7XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUaW55LlBvaW50KDEsIDEpO1xyXG4gICAgdGhpcy5waXZvdCA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmFscGhhID0gMTtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLl9zciA9IDA7XHJcbiAgICB0aGlzLl9jciA9IDE7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcbn07XHJcblxyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5CYXNlT2JqZWN0MkQ7XHJcblxyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICh0aGlzLnBhcmVudClcclxuICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmUoIHRoaXMgKVxyXG5cclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBudWxsO1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUsICd3b3JsZFZpc2libGUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICBkb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLnZpc2libGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZShpdGVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUsICdjYWNoZUFzQml0bWFwJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwID09PSB2YWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIHNvbWUgbWF0cml4IHJlZnMgZm9yIGVhc3kgYWNjZXNzXHJcbiAgICB2YXIgcHQgPSB0aGlzLnBhcmVudC53b3JsZFRyYW5zZm9ybTtcclxuICAgIHZhciB3dCA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgLy8gdGVtcG9yYXJ5IG1hdHJpeCB2YXJpYWJsZXNcclxuICAgIHZhciBhLCBiLCBjLCBkLCB0eCwgdHk7XHJcblxyXG4gICAgLy8gc28gaWYgcm90YXRpb24gaXMgYmV0d2VlbiAwIHRoZW4gd2UgY2FuIHNpbXBsaWZ5IHRoZSBtdWx0aXBsaWNhdGlvbiBwcm9jZXNzLi5cclxuICAgIGlmICh0aGlzLnJvdGF0aW9uICUgcGkyKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgcm90YXRpb24gaXMgdGhlIHNhbWUgYXMgdGhlIHByZXZpb3VzIHJlbmRlci4gVGhpcyBtZWFucyB3ZSBvbmx5IG5lZWQgdG8gdXNlIHNpbiBhbmQgY29zIHdoZW4gcm90YXRpb24gYWN0dWFsbHkgY2hhbmdlc1xyXG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uICE9PSB0aGlzLnJvdGF0aW9uQ2FjaGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uQ2FjaGUgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9zciA9IE1hdGguc2luKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9jciA9IE1hdGguY29zKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtYXRyaXggdmFsdWVzIG9mIHRoZSBkaXNwbGF5b2JqZWN0IGJhc2VkIG9uIGl0cyB0cmFuc2Zvcm0gcHJvcGVydGllcy4uXHJcbiAgICAgICAgYSAgPSAgdGhpcy5fY3IgKiB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgYiAgPSAgdGhpcy5fc3IgKiB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgYyAgPSAtdGhpcy5fc3IgKiB0aGlzLnNjYWxlLnk7XHJcbiAgICAgICAgZCAgPSAgdGhpcy5fY3IgKiB0aGlzLnNjYWxlLnk7XHJcbiAgICAgICAgdHggPSAgdGhpcy5wb3NpdGlvbi54O1xyXG4gICAgICAgIHR5ID0gIHRoaXMucG9zaXRpb24ueTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjaGVjayBmb3IgcGl2b3QuLiBub3Qgb2Z0ZW4gdXNlZCBzbyBnZWFyZWQgdG93YXJkcyB0aGF0IGZhY3QhXHJcbiAgICAgICAgaWYgKHRoaXMucGl2b3QueCB8fCB0aGlzLnBpdm90LnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eCAtPSB0aGlzLnBpdm90LnggKiBhICsgdGhpcy5waXZvdC55ICogYztcclxuICAgICAgICAgICAgdHkgLT0gdGhpcy5waXZvdC54ICogYiArIHRoaXMucGl2b3QueSAqIGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25jYXQgdGhlIHBhcmVudCBtYXRyaXggd2l0aCB0aGUgb2JqZWN0cyB0cmFuc2Zvcm0uXHJcbiAgICAgICAgd3QuYSAgPSBhICAqIHB0LmEgKyBiICAqIHB0LmM7XHJcbiAgICAgICAgd3QuYiAgPSBhICAqIHB0LmIgKyBiICAqIHB0LmQ7XHJcbiAgICAgICAgd3QuYyAgPSBjICAqIHB0LmEgKyBkICAqIHB0LmM7XHJcbiAgICAgICAgd3QuZCAgPSBjICAqIHB0LmIgKyBkICAqIHB0LmQ7XHJcbiAgICAgICAgd3QudHggPSB0eCAqIHB0LmEgKyB0eSAqIHB0LmMgKyBwdC50eDtcclxuICAgICAgICB3dC50eSA9IHR4ICogcHQuYiArIHR5ICogcHQuZCArIHB0LnR5O1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldHMgZG8gdGhlIGZhc3QgdmVyc2lvbiBhcyB3ZSBrbm93IHRoZXJlIGlzIG5vIHJvdGF0aW9uLi5cclxuICAgICAgICBhICA9IHRoaXMuc2NhbGUueDtcclxuICAgICAgICBkICA9IHRoaXMuc2NhbGUueTtcclxuXHJcbiAgICAgICAgdHggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnBpdm90LnggKiBhO1xyXG4gICAgICAgIHR5ID0gdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5waXZvdC55ICogZDtcclxuXHJcbiAgICAgICAgd3QuYSAgPSBhICAqIHB0LmE7XHJcbiAgICAgICAgd3QuYiAgPSBhICAqIHB0LmI7XHJcbiAgICAgICAgd3QuYyAgPSBkICAqIHB0LmM7XHJcbiAgICAgICAgd3QuZCAgPSBkICAqIHB0LmQ7XHJcbiAgICAgICAgd3QudHggPSB0eCAqIHB0LmEgKyB0eSAqIHB0LmMgKyBwdC50eDtcclxuICAgICAgICB3dC50eSA9IHR4ICogcHQuYiArIHR5ICogcHQuZCArIHB0LnR5O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG11bHRpcGx5IHRoZSBhbHBoYXMuLlxyXG4gICAgdGhpcy53b3JsZEFscGhhID0gdGhpcy5hbHBoYSAqIHRoaXMucGFyZW50LndvcmxkQWxwaGE7XHJcblxyXG59O1xyXG5cclxuLy8gcGVyZm9ybWFuY2UgaW5jcmVhc2UgdG8gYXZvaWQgdXNpbmcgY2FsbC4uICgxMHggZmFzdGVyKVxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSA9IFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obWF0cml4KVxyXG57XHJcbiAgICAvLyBtYXRyaXggPSBtYXRyaXg7Ly9qdXN0IHRvIGdldCBwYXNzZWQganMgaGludGluZyAoYW5kIHByZXNlcnZlIGluaGVyaXRhbmNlKVxyXG4gICAgcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZ2V0TG9jYWxCb3VuZHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmdldEJvdW5kcyhUaW55LmlkZW50aXR5TWF0cml4KTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5nZW5lcmF0ZVRleHR1cmUgPSBmdW5jdGlvbihyZXNvbHV0aW9uLCByZW5kZXJlcilcclxue1xyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICB2YXIgcmVuZGVyVGV4dHVyZSA9IG5ldyBUaW55LlJlbmRlclRleHR1cmUoYm91bmRzLndpZHRoIHwgMCwgYm91bmRzLmhlaWdodCB8IDAsIHJlbmRlcmVyLCByZXNvbHV0aW9uKTtcclxuICAgIFxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuICAgIFxyXG4gICAgcmVuZGVyVGV4dHVyZS5yZW5kZXIodGhpcywgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgpO1xyXG5cclxuICAgIHJldHVybiByZW5kZXJUZXh0dXJlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZUNhY2hlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG59O1xyXG5cclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS50b0dsb2JhbCA9IGZ1bmN0aW9uKHBvc2l0aW9uKVxyXG57XHJcbiAgICAvLyBkb24ndCBuZWVkIHRvIHVbZGF0ZSB0aGUgbG90XHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIHJldHVybiB0aGlzLndvcmxkVHJhbnNmb3JtLmFwcGx5KHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS50b0xvY2FsID0gZnVuY3Rpb24ocG9zaXRpb24sIGZyb20pXHJcbntcclxuICAgIGlmIChmcm9tKVxyXG4gICAge1xyXG4gICAgICAgIHBvc2l0aW9uID0gZnJvbS50b0dsb2JhbChwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG9uJ3QgbmVlZCB0byB1W2RhdGUgdGhlIGxvdFxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5fcmVuZGVyQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSwgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICBcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVuZGVyVGV4dHVyZSA9IG5ldyBUaW55LlJlbmRlclRleHR1cmUoYm91bmRzLndpZHRoIHwgMCwgYm91bmRzLmhlaWdodCB8IDApOy8vLCByZW5kZXJTZXNzaW9uLnJlbmRlcmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHJlbmRlclRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUucmVzaXplKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuICAgIFxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUucmVuZGVyKHRoaXMsIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LCB0cnVlKTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnggPSAtKCBib3VuZHMueCAvIGJvdW5kcy53aWR0aCApO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLSggYm91bmRzLnkgLyBib3VuZHMuaGVpZ2h0ICk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICghdGhpcy5fY2FjaGVkU3ByaXRlKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUuZGVzdHJveSh0cnVlKTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsO1xyXG59O1xyXG5cclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUsICd4Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCAneScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTsiLCJUaW55LkdyYXBoaWNzRGF0YSA9IGZ1bmN0aW9uKGxpbmVXaWR0aCwgbGluZUNvbG9yLCBsaW5lQWxwaGEsIGZpbGxDb2xvciwgZmlsbEFscGhhLCBmaWxsLCBzaGFwZSkge1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcbiAgICB0aGlzLmxpbmVDb2xvciA9IGxpbmVDb2xvcjtcclxuICAgIHRoaXMubGluZUFscGhhID0gbGluZUFscGhhO1xyXG4gICAgdGhpcy5fbGluZVRpbnQgPSBsaW5lQ29sb3I7XHJcbiAgICB0aGlzLmZpbGxDb2xvciA9IGZpbGxDb2xvcjtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gZmlsbEFscGhhO1xyXG4gICAgdGhpcy5fZmlsbFRpbnQgPSBmaWxsQ29sb3I7XHJcbiAgICB0aGlzLmZpbGwgPSBmaWxsO1xyXG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xyXG4gICAgdGhpcy50eXBlID0gc2hhcGUudHlwZTtcclxuXHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzRGF0YS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkdyYXBoaWNzRGF0YTtcclxuXHJcblRpbnkuR3JhcGhpY3NEYXRhLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgR3JhcGhpY3NEYXRhKFxyXG4gICAgICAgIHRoaXMubGluZVdpZHRoLFxyXG4gICAgICAgIHRoaXMubGluZUNvbG9yLFxyXG4gICAgICAgIHRoaXMubGluZUFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbENvbG9yLFxyXG4gICAgICAgIHRoaXMuZmlsbEFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbCxcclxuICAgICAgICB0aGlzLnNoYXBlXHJcbiAgICApO1xyXG5cclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5maWxsQWxwaGEgPSAxO1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSAwO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSAwO1xyXG4gICAgdGhpcy5ncmFwaGljc0RhdGEgPSBbXTtcclxuICAgIHRoaXMudGludCA9IFwiI0ZGRkZGRlwiO1xyXG4gICAgdGhpcy5ibGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcbiAgICB0aGlzLmN1cnJlbnRQYXRoID0gbnVsbDtcclxuICAgIHRoaXMuaXNNYXNrID0gZmFsc2U7XHJcbiAgICB0aGlzLmJvdW5kc1BhZGRpbmcgPSAwO1xyXG5cclxuICAgIHRoaXMuX2xvY2FsQm91bmRzID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsMCwxLDEpO1xyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IGZhbHNlO1xyXG5cclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5PYmplY3QyRC5wcm90b3R5cGUgKTtcclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkdyYXBoaWNzO1xyXG5cclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVTdHlsZSA9IGZ1bmN0aW9uKGxpbmVXaWR0aCwgY29sb3IsIGFscGhhKVxyXG57XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aCB8fCAwO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSBjb2xvciB8fCBcIiMwMDAwMDBcIjtcclxuICAgIHRoaXMubGluZUFscGhhID0gKGFscGhhID09PSB1bmRlZmluZWQpID8gMSA6IGFscGhhO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBoYWxmd2F5IHRocm91Z2ggYSBsaW5lPyBzdGFydCBhIG5ldyBvbmUhXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlBvbHlnb24odGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMuc2xpY2UoLTIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBpdHMgZW1wdHkgc28gbGV0cyBqdXN0IHNldCB0aGUgbGluZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGgubGluZVdpZHRoID0gdGhpcy5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGgubGluZUNvbG9yID0gdGhpcy5saW5lQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGgubGluZUFscGhhID0gdGhpcy5saW5lQWxwaGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbihbeCwgeV0pKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVUbyA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIGlmICghdGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5wdXNoKHgsIHkpO1xyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5xdWFkcmF0aWNDdXJ2ZVRvID0gZnVuY3Rpb24oY3BYLCBjcFksIHRvWCwgdG9ZKVxyXG57XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHhhLFxyXG4gICAgICAgIHlhLFxyXG4gICAgICAgIG4gPSAyMCxcclxuICAgICAgICBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDJdO1xyXG4gICAgdmFyIGZyb21ZID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXTtcclxuICAgIHZhciBqID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG47ICsraSlcclxuICAgIHtcclxuICAgICAgICBqID0gaSAvIG47XHJcblxyXG4gICAgICAgIHhhID0gZnJvbVggKyAoIChjcFggLSBmcm9tWCkgKiBqICk7XHJcbiAgICAgICAgeWEgPSBmcm9tWSArICggKGNwWSAtIGZyb21ZKSAqIGogKTtcclxuXHJcbiAgICAgICAgcG9pbnRzLnB1c2goIHhhICsgKCAoKGNwWCArICggKHRvWCAtIGNwWCkgKiBqICkpIC0geGEpICogaiApLFxyXG4gICAgICAgICAgICAgICAgICAgICB5YSArICggKChjcFkgKyAoICh0b1kgLSBjcFkpICogaiApKSAtIHlhKSAqIGogKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYmV6aWVyQ3VydmVUbyA9IGZ1bmN0aW9uKGNwWCwgY3BZLCBjcFgyLCBjcFkyLCB0b1gsIHRvWSlcclxue1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzID0gWzAsIDBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuID0gMjAsXHJcbiAgICAgICAgZHQsXHJcbiAgICAgICAgZHQyLFxyXG4gICAgICAgIGR0MyxcclxuICAgICAgICB0MixcclxuICAgICAgICB0MyxcclxuICAgICAgICBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICB2YXIgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aC0yXTtcclxuICAgIHZhciBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoLTFdO1xyXG4gICAgdmFyIGogPSAwO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG47ICsraSlcclxuICAgIHtcclxuICAgICAgICBqID0gaSAvIG47XHJcblxyXG4gICAgICAgIGR0ID0gKDEgLSBqKTtcclxuICAgICAgICBkdDIgPSBkdCAqIGR0O1xyXG4gICAgICAgIGR0MyA9IGR0MiAqIGR0O1xyXG5cclxuICAgICAgICB0MiA9IGogKiBqO1xyXG4gICAgICAgIHQzID0gdDIgKiBqO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBvaW50cy5wdXNoKCBkdDMgKiBmcm9tWCArIDMgKiBkdDIgKiBqICogY3BYICsgMyAqIGR0ICogdDIgKiBjcFgyICsgdDMgKiB0b1gsXHJcbiAgICAgICAgICAgICAgICAgICAgIGR0MyAqIGZyb21ZICsgMyAqIGR0MiAqIGogKiBjcFkgKyAzICogZHQgKiB0MiAqIGNwWTIgKyB0MyAqIHRvWSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYXJjVG8gPSBmdW5jdGlvbih4MSwgeTEsIHgyLCB5MiwgcmFkaXVzKVxyXG57XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMucHVzaCh4MSwgeTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyh4MSwgeTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyxcclxuICAgICAgICBmcm9tWCA9IHBvaW50c1twb2ludHMubGVuZ3RoLTJdLFxyXG4gICAgICAgIGZyb21ZID0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMV0sXHJcbiAgICAgICAgYTEgPSBmcm9tWSAtIHkxLFxyXG4gICAgICAgIGIxID0gZnJvbVggLSB4MSxcclxuICAgICAgICBhMiA9IHkyICAgLSB5MSxcclxuICAgICAgICBiMiA9IHgyICAgLSB4MSxcclxuICAgICAgICBtbSA9IE1hdGguYWJzKGExICogYjIgLSBiMSAqIGEyKTtcclxuXHJcbiAgICBpZiAobW0gPCAxLjBlLTggfHwgcmFkaXVzID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChwb2ludHNbcG9pbnRzLmxlbmd0aC0yXSAhPT0geDEgfHwgcG9pbnRzW3BvaW50cy5sZW5ndGgtMV0gIT09IHkxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2goeDEsIHkxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRkID0gYTEgKiBhMSArIGIxICogYjEsXHJcbiAgICAgICAgICAgIGNjID0gYTIgKiBhMiArIGIyICogYjIsXHJcbiAgICAgICAgICAgIHR0ID0gYTEgKiBhMiArIGIxICogYjIsXHJcbiAgICAgICAgICAgIGsxID0gcmFkaXVzICogTWF0aC5zcXJ0KGRkKSAvIG1tLFxyXG4gICAgICAgICAgICBrMiA9IHJhZGl1cyAqIE1hdGguc3FydChjYykgLyBtbSxcclxuICAgICAgICAgICAgajEgPSBrMSAqIHR0IC8gZGQsXHJcbiAgICAgICAgICAgIGoyID0gazIgKiB0dCAvIGNjLFxyXG4gICAgICAgICAgICBjeCA9IGsxICogYjIgKyBrMiAqIGIxLFxyXG4gICAgICAgICAgICBjeSA9IGsxICogYTIgKyBrMiAqIGExLFxyXG4gICAgICAgICAgICBweCA9IGIxICogKGsyICsgajEpLFxyXG4gICAgICAgICAgICBweSA9IGExICogKGsyICsgajEpLFxyXG4gICAgICAgICAgICBxeCA9IGIyICogKGsxICsgajIpLFxyXG4gICAgICAgICAgICBxeSA9IGEyICogKGsxICsgajIpLFxyXG4gICAgICAgICAgICBzdGFydEFuZ2xlID0gTWF0aC5hdGFuMihweSAtIGN5LCBweCAtIGN4KSxcclxuICAgICAgICAgICAgZW5kQW5nbGUgICA9IE1hdGguYXRhbjIocXkgLSBjeSwgcXggLSBjeCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXJjKGN4ICsgeDEsIGN5ICsgeTEsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGIxICogYTIgPiBiMiAqIGExKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmFyYyA9IGZ1bmN0aW9uKGN4LCBjeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSlcclxue1xyXG4gICAgLy8gIElmIHdlIGRvIHRoaXMgd2UgY2FuIG5ldmVyIGRyYXcgYSBmdWxsIGNpcmNsZVxyXG4gICAgaWYgKHN0YXJ0QW5nbGUgPT09IGVuZEFuZ2xlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgYW50aWNsb2Nrd2lzZSA9PT0gJ3VuZGVmaW5lZCcpIHsgYW50aWNsb2Nrd2lzZSA9IGZhbHNlOyB9XHJcblxyXG4gICAgaWYgKCFhbnRpY2xvY2t3aXNlICYmIGVuZEFuZ2xlIDw9IHN0YXJ0QW5nbGUpXHJcbiAgICB7XHJcbiAgICAgICAgZW5kQW5nbGUgKz0gTWF0aC5QSSAqIDI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhbnRpY2xvY2t3aXNlICYmIHN0YXJ0QW5nbGUgPD0gZW5kQW5nbGUpXHJcbiAgICB7XHJcbiAgICAgICAgc3RhcnRBbmdsZSArPSBNYXRoLlBJICogMjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3dlZXAgPSBhbnRpY2xvY2t3aXNlID8gKHN0YXJ0QW5nbGUgLSBlbmRBbmdsZSkgKiAtMSA6IChlbmRBbmdsZSAtIHN0YXJ0QW5nbGUpO1xyXG4gICAgdmFyIHNlZ3MgPSAgTWF0aC5jZWlsKE1hdGguYWJzKHN3ZWVwKSAvIChNYXRoLlBJICogMikpICogNDA7XHJcblxyXG4gICAgLy8gIFN3ZWVwIGNoZWNrIC0gbW92ZWQgaGVyZSBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gZG8gdGhlIG1vdmVUbyBiZWxvdyBpZiB0aGUgYXJjIGZhaWxzXHJcbiAgICBpZiAoc3dlZXAgPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0YXJ0WCA9IGN4ICsgTWF0aC5jb3Moc3RhcnRBbmdsZSkgKiByYWRpdXM7XHJcbiAgICB2YXIgc3RhcnRZID0gY3kgKyBNYXRoLnNpbihzdGFydEFuZ2xlKSAqIHJhZGl1cztcclxuXHJcbiAgICBpZiAoYW50aWNsb2Nrd2lzZSAmJiB0aGlzLmZpbGxpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oY3gsIGN5KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGN1cnJlbnRQYXRoIHdpbGwgYWx3YXlzIGV4aXN0IGFmdGVyIGNhbGxpbmcgYSBtb3ZlVG9cclxuICAgIHZhciBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICB2YXIgdGhldGEgPSBzd2VlcCAvIChzZWdzICogMik7XHJcbiAgICB2YXIgdGhldGEyID0gdGhldGEgKiAyO1xyXG5cclxuICAgIHZhciBjVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XHJcbiAgICB2YXIgc1RoZXRhID0gTWF0aC5zaW4odGhldGEpO1xyXG4gICAgXHJcbiAgICB2YXIgc2VnTWludXMgPSBzZWdzIC0gMTtcclxuXHJcbiAgICB2YXIgcmVtYWluZGVyID0gKHNlZ01pbnVzICUgMSkgLyBzZWdNaW51cztcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzZWdNaW51czsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZWFsID0gIGkgKyByZW1haW5kZXIgKiBpO1xyXG4gICAgXHJcbiAgICAgICAgdmFyIGFuZ2xlID0gKCh0aGV0YSkgKyBzdGFydEFuZ2xlICsgKHRoZXRhMiAqIHJlYWwpKTtcclxuXHJcbiAgICAgICAgdmFyIGMgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgICAgdmFyIHMgPSAtTWF0aC5zaW4oYW5nbGUpO1xyXG5cclxuICAgICAgICBwb2ludHMucHVzaCgoIChjVGhldGEgKiAgYykgKyAoc1RoZXRhICogcykgKSAqIHJhZGl1cyArIGN4LFxyXG4gICAgICAgICAgICAgICAgICAgICggKGNUaGV0YSAqIC1zKSArIChzVGhldGEgKiBjKSApICogcmFkaXVzICsgY3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYmVnaW5GaWxsID0gZnVuY3Rpb24oY29sb3IsIGFscGhhKVxyXG57XHJcbiAgICB0aGlzLmZpbGxpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBjb2xvciB8fCBcIiMwMDAwMDBcIjtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gKGFscGhhID09PSB1bmRlZmluZWQpID8gMSA6IGFscGhhO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPD0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbCA9IHRoaXMuZmlsbGluZztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5maWxsQ29sb3IgPSB0aGlzLmZpbGxDb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5maWxsQWxwaGEgPSB0aGlzLmZpbGxBbHBoYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5lbmRGaWxsID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmZpbGxpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gbnVsbDtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gMTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSZWN0ID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodClcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdCA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cylcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUm91bmRlZFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vIFRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdDIgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbi8vIHsgICBcclxuLy8gICAgIHZhciBzaGFwZSA9IG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG4vLyAgICAgc2hhcGUudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOO1xyXG4vLyAgICAgdGhpcy5kcmF3U2hhcGUoc2hhcGUpO1xyXG5cclxuLy8gICAgIHJldHVybiB0aGlzO1xyXG4vLyB9O1xyXG5cclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdDaXJjbGUgPSBmdW5jdGlvbih4LCB5LCBkaWFtZXRlcilcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuQ2lyY2xlKHgsIHksIGRpYW1ldGVyKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBNb3ZlZCB0byBleHRyYSBFbGxpcHNlXHJcbi8vIFRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdFbGxpcHNlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodClcclxuLy8ge1xyXG4vLyAgICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuRWxsaXBzZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XHJcblxyXG4vLyAgICAgcmV0dXJuIHRoaXM7XHJcbi8vIH07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3UG9seWdvbiA9IGZ1bmN0aW9uKHBhdGgpXHJcbntcclxuICAgIC8vIHByZXZlbnRzIGFuIGFyZ3VtZW50IGFzc2lnbm1lbnQgZGVvcHRcclxuICAgIC8vIHNlZSBzZWN0aW9uIDMuMTogaHR0cHM6Ly9naXRodWIuY29tL3BldGthYW50b25vdi9ibHVlYmlyZC93aWtpL09wdGltaXphdGlvbi1raWxsZXJzIzMtbWFuYWdpbmctYXJndW1lbnRzXHJcbiAgICB2YXIgcG9pbnRzID0gcGF0aDtcclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocG9pbnRzKSlcclxuICAgIHtcclxuICAgICAgICAvLyBwcmV2ZW50cyBhbiBhcmd1bWVudCBsZWFrIGRlb3B0XHJcbiAgICAgICAgLy8gc2VlIHNlY3Rpb24gMy4yOiBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL3dpa2kvT3B0aW1pemF0aW9uLWtpbGxlcnMjMy1tYW5hZ2luZy1hcmd1bWVudHNcclxuICAgICAgICBwb2ludHMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9pbnRzW2ldID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5Qb2x5Z29uKHBvaW50cykpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMubGluZVdpZHRoID0gMDtcclxuICAgIHRoaXMuZmlsbGluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5ncmFwaGljc0RhdGEgPSBbXTtcclxuICAgIHRoaXMudXBkYXRlTG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZGVzdHJveUNoaWxkcmVuKVxyXG57XHJcbiAgICBUaW55Lk9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZ2VuZXJhdGVUZXh0dXJlID0gZnVuY3Rpb24ocmVzb2x1dGlvbilcclxue1xyXG4gICAgcmVzb2x1dGlvbiA9IHJlc29sdXRpb24gfHwgMTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcclxuICAgXHJcbiAgICB2YXIgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKGJvdW5kcy53aWR0aCAqIHJlc29sdXRpb24sIGJvdW5kcy5oZWlnaHQgKiByZXNvbHV0aW9uKTtcclxuICAgIFxyXG4gICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXNCdWZmZXIuY2FudmFzKTtcclxuICAgIHRleHR1cmUucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XHJcblxyXG4gICAgY2FudmFzQnVmZmVyLmNvbnRleHQuc2NhbGUocmVzb2x1dGlvbiwgcmVzb2x1dGlvbik7XHJcblxyXG4gICAgY2FudmFzQnVmZmVyLmNvbnRleHQudHJhbnNsYXRlKC1ib3VuZHMueCwtYm91bmRzLnkpO1xyXG4gICAgXHJcbiAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsIGNhbnZhc0J1ZmZlci5jb250ZXh0KTtcclxuXHJcbiAgICByZXR1cm4gdGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLmlzTWFzayA9PT0gdHJ1ZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGhlIHRpbnQgaGFzIGNoYW5nZWQsIHNldCB0aGUgZ3JhcGhpY3Mgb2JqZWN0IHRvIGRpcnR5LlxyXG4gICAgaWYgKHRoaXMuX3ByZXZUaW50ICE9PSB0aGlzLnRpbnQpIHtcclxuICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcHJldlRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkU3ByaXRlRGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICBcclxuICAgICAgICAgICAgLy8gd2Ugd2lsbCBhbHNvIG5lZWQgdG8gdXBkYXRlIHRoZSB0ZXh0dXJlXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFscGhhID0gdGhpcy5hbHBoYTtcclxuICAgICAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcy5fY2FjaGVkU3ByaXRlLCByZW5kZXJTZXNzaW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gcmVuZGVyU2Vzc2lvbi5jb250ZXh0O1xyXG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybS5hICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmMgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5kICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50eSAqIHJlc29sdXRpb24pO1xyXG5cclxuICAgICAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgLy8gc2ltcGxlIHJlbmRlciBjaGlsZHJlbiFcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKG1hdHJpeClcclxue1xyXG4gICAgaWYoIXRoaXMuX2N1cnJlbnRCb3VuZHMgfHwgdGhpcy5fYm91bmRzRGlydHkpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIC8vIHJldHVybiBhbiBlbXB0eSBvYmplY3QgaWYgdGhlIGl0ZW0gaXMgYSBtYXNrIVxyXG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJhYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9ib3VuZHNEaXJ0eSApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMb2NhbEJvdW5kcygpO1xyXG4gICAgICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2xvY2FsQm91bmRzO1xyXG5cclxuICAgIHZhciB3MCA9IGJvdW5kcy54O1xyXG4gICAgdmFyIHcxID0gYm91bmRzLndpZHRoICsgYm91bmRzLng7XHJcblxyXG4gICAgdmFyIGgwID0gYm91bmRzLnk7XHJcbiAgICB2YXIgaDEgPSBib3VuZHMuaGVpZ2h0ICsgYm91bmRzLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gbWF0cml4IHx8IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgIHZhciB5MSA9IGQgKiBoMSArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgdmFyIHgzID0gYSAqIHcwICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDQgPSAgYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTQgPSAgZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIG1heFggPSB4MTtcclxuICAgIHZhciBtYXhZID0geTE7XHJcblxyXG4gICAgdmFyIG1pblggPSB4MTtcclxuICAgIHZhciBtaW5ZID0geTE7XHJcblxyXG4gICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgIG1pblkgPSB5MiA8IG1pblkgPyB5MiA6IG1pblk7XHJcbiAgICBtaW5ZID0geTMgPCBtaW5ZID8geTMgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICBtYXhYID0geDIgPiBtYXhYID8geDIgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHgzID4gbWF4WCA/IHgzIDogbWF4WDtcclxuICAgIG1heFggPSB4NCA+IG1heFggPyB4NCA6IG1heFg7XHJcblxyXG4gICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG5cclxuICAgIHRoaXMuX2JvdW5kcy54ID0gbWluWDtcclxuICAgIHRoaXMuX2JvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG5cclxuICAgIHRoaXMuX2JvdW5kcy55ID0gbWluWTtcclxuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEJvdW5kcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmNvbnRhaW5zUG9pbnQgPSBmdW5jdGlvbiggcG9pbnQgKVxyXG57XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmFwcGx5SW52ZXJzZShwb2ludCwgIHRlbXBQb2ludCk7XHJcblxyXG4gICAgdmFyIGdyYXBoaWNzRGF0YSA9IHRoaXMuZ3JhcGhpY3NEYXRhO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JhcGhpY3NEYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0gZ3JhcGhpY3NEYXRhW2ldO1xyXG5cclxuICAgICAgICBpZiAoIWRhdGEuZmlsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb25seSBkZWFsIHdpdGggZmlsbHMuLlxyXG4gICAgICAgIGlmIChkYXRhLnNoYXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCBkYXRhLnNoYXBlLmNvbnRhaW5zKCB0ZW1wUG9pbnQueCwgdGVtcFBvaW50LnkgKSApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnVwZGF0ZUxvY2FsQm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIGlmICh0aGlzLmdyYXBoaWNzRGF0YS5sZW5ndGgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNoYXBlLCBwb2ludHMsIHgsIHksIHcsIGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZ3JhcGhpY3NEYXRhW2ldO1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGRhdGEudHlwZTtcclxuICAgICAgICAgICAgdmFyIGxpbmVXaWR0aCA9IGRhdGEubGluZVdpZHRoO1xyXG4gICAgICAgICAgICBzaGFwZSA9IGRhdGEuc2hhcGU7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJFQ1QgfHwgdHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMgfHwgdHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUNfTEpPSU4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHggPSBzaGFwZS54IC0gbGluZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIHkgPSBzaGFwZS55IC0gbGluZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIHcgPSBzaGFwZS53aWR0aCArIGxpbmVXaWR0aDtcclxuICAgICAgICAgICAgICAgIGggPSBzaGFwZS5oZWlnaHQgKyBsaW5lV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWCA9IHggPCBtaW5YID8geCA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICBtYXhYID0geCArIHcgPiBtYXhYID8geCArIHcgOiBtYXhYO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblkgPSB5IDwgbWluWSA/IHkgOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuQ0lSQylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgICAgICB5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgICAgIHcgPSBzaGFwZS5yYWRpdXMgKyBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgaCA9IHNoYXBlLnJhZGl1cyArIGxpbmVXaWR0aCAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWCA9IHggLSB3IDwgbWluWCA/IHggLSB3IDogbWluWDtcclxuICAgICAgICAgICAgICAgIG1heFggPSB4ICsgdyA+IG1heFggPyB4ICsgdyA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWSA9IHkgLSBoIDwgbWluWSA/IHkgLSBoIDogbWluWTtcclxuICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgaCA+IG1heFkgPyB5ICsgaCA6IG1heFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkVMSVApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICAgICAgeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgICAgICB3ID0gc2hhcGUud2lkdGggKyBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgaCA9IHNoYXBlLmhlaWdodCArIGxpbmVXaWR0aCAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWCA9IHggLSB3IDwgbWluWCA/IHggLSB3IDogbWluWDtcclxuICAgICAgICAgICAgICAgIG1heFggPSB4ICsgdyA+IG1heFggPyB4ICsgdyA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWSA9IHkgLSBoIDwgbWluWSA/IHkgLSBoIDogbWluWTtcclxuICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgaCA+IG1heFkgPyB5ICsgaCA6IG1heFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBQT0xZIC0gYXNzdW1lcyBwb2ludHMgYXJlIHNlcXVlbnRpYWwsIG5vdCBQb2ludCBvYmplY3RzXHJcbiAgICAgICAgICAgICAgICBwb2ludHMgPSBzaGFwZS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwb2ludHMubGVuZ3RoOyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50c1tqXSBpbnN0YW5jZW9mIFRpbnkuUG9pbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcG9pbnRzW2pdLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwb2ludHNbal0ueTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHBvaW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBvaW50c1tqICsgMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA8IHBvaW50cy5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pblggPSB4IC0gbGluZVdpZHRoIDwgbWluWCA/IHggLSBsaW5lV2lkdGggOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFggPSB4ICsgbGluZVdpZHRoID4gbWF4WCA/IHggKyBsaW5lV2lkdGggOiBtYXhYO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGxpbmVXaWR0aCA8IG1pblkgPyB5IC0gbGluZVdpZHRoIDogbWluWTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhZID0geSArIGxpbmVXaWR0aCA+IG1heFkgPyB5ICsgbGluZVdpZHRoIDogbWF4WTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBtaW5YID0gMDtcclxuICAgICAgICBtYXhYID0gMDtcclxuICAgICAgICBtaW5ZID0gMDtcclxuICAgICAgICBtYXhZID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGFkZGluZyA9IHRoaXMuYm91bmRzUGFkZGluZztcclxuICAgIFxyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMueCA9IG1pblggLSBwYWRkaW5nO1xyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMud2lkdGggPSAobWF4WCAtIG1pblgpICsgcGFkZGluZyAqIDI7XHJcblxyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMueSA9IG1pblkgLSBwYWRkaW5nO1xyXG4gICAgdGhpcy5fbG9jYWxCb3VuZHMuaGVpZ2h0ID0gKG1heFkgLSBtaW5ZKSArIHBhZGRpbmcgKiAyO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIGlmICghdGhpcy5fY2FjaGVkU3ByaXRlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjYW52YXNCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIoYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcclxuICAgICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKGNhbnZhc0J1ZmZlci5jYW52YXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG5ldyBUaW55LlNwcml0ZSh0ZXh0dXJlKTtcclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyID0gY2FudmFzQnVmZmVyO1xyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUud29ybGRUcmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIucmVzaXplKGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbGV2ZXJhZ2UgdGhlIGFuY2hvciB0byBhY2NvdW50IGZvciB0aGUgb2Zmc2V0IG9mIHRoZSBlbGVtZW50XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnggPSAtKGJvdW5kcy54IC8gYm91bmRzLndpZHRoKTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueSA9IC0oYm91bmRzLnkgLyBib3VuZHMuaGVpZ2h0KTtcclxuXHJcbiAgICAvLyB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQuc2F2ZSgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5jb250ZXh0LnRyYW5zbGF0ZSgtYm91bmRzLngsIC1ib3VuZHMueSk7XHJcbiAgICBcclxuICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGFscGhhIG9mIHRoZSBncmFwaGljcyB0byAxIGZvciB0aGUgcmVuZGVyLi4gXHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgIC8vIG5vdyByZW5kZXIgdGhlIGdyYXBoaWMuLlxyXG4gICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLCB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFscGhhID0gdGhpcy5hbHBoYTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRleHR1cmUgc2l6ZSBiYXNlZCBvbiBjYW52YXMgc2l6ZVxyXG4gKlxyXG4gKiBAbWV0aG9kIHVwZGF0ZUNhY2hlZFNwcml0ZVRleHR1cmVcclxuICogQHByaXZhdGVcclxuICovXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnVwZGF0ZUNhY2hlZFNwcml0ZVRleHR1cmUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBjYWNoZWRTcHJpdGUgPSB0aGlzLl9jYWNoZWRTcHJpdGU7XHJcbiAgICB2YXIgdGV4dHVyZSA9IGNhY2hlZFNwcml0ZS50ZXh0dXJlO1xyXG4gICAgdmFyIGNhbnZhcyA9IGNhY2hlZFNwcml0ZS5idWZmZXIuY2FudmFzO1xyXG5cclxuICAgIHRleHR1cmUud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICB0ZXh0dXJlLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICB0ZXh0dXJlLmNyb3Aud2lkdGggPSB0ZXh0dXJlLmZyYW1lLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgdGV4dHVyZS5jcm9wLmhlaWdodCA9IHRleHR1cmUuZnJhbWUuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICBjYWNoZWRTcHJpdGUuX3dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY2FjaGVkU3ByaXRlLl9oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlc3Ryb3lzIGEgcHJldmlvdXMgY2FjaGVkIHNwcml0ZS5cclxuICpcclxuICogQG1ldGhvZCBkZXN0cm95Q2FjaGVkU3ByaXRlXHJcbiAqL1xyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kZXN0cm95Q2FjaGVkU3ByaXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5kZXN0cm95KHRydWUpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdTaGFwZSA9IGZ1bmN0aW9uKHNoYXBlKVxyXG57XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICAvLyBjaGVjayBjdXJyZW50IHBhdGghXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA8PSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljc0RhdGEucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudFBhdGggPSBudWxsO1xyXG5cclxuICAgIC8vICBIYW5kbGUgbWl4ZWQtdHlwZSBwb2x5Z29uc1xyXG4gICAgaWYgKHNoYXBlIGluc3RhbmNlb2YgVGlueS5Qb2x5Z29uKVxyXG4gICAge1xyXG4gICAgICAgIHNoYXBlLmZsYXR0ZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGF0YSA9IG5ldyBUaW55LkdyYXBoaWNzRGF0YSh0aGlzLmxpbmVXaWR0aCwgdGhpcy5saW5lQ29sb3IsIHRoaXMubGluZUFscGhhLCB0aGlzLmZpbGxDb2xvciwgdGhpcy5maWxsQWxwaGEsIHRoaXMuZmlsbGluZywgc2hhcGUpO1xyXG4gICAgXHJcbiAgICB0aGlzLmdyYXBoaWNzRGF0YS5wdXNoKGRhdGEpO1xyXG5cclxuICAgIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5QT0xZKVxyXG4gICAge1xyXG4gICAgICAgIGRhdGEuc2hhcGUuY2xvc2VkID0gdGhpcy5maWxsaW5nO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhdGggPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkdyYXBoaWNzLnByb3RvdHlwZSwgXCJjYWNoZUFzQml0bWFwXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fY2FjaGVBc0JpdG1hcDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59KTsiLCJcclxuVGlueS5PYmplY3QyRCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICB0aGlzLl9ib3VuZHMgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX21hc2sgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUgKTtcclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55Lk9iamVjdDJEO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCAnaW5wdXRFbmFibGVkJywge1xyXG5cclxuLy8gICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbi8vICAgICAgICAgcmV0dXJuICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZW5hYmxlZClcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4vLyAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dCA9PT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHtlbmFibGVkOiB0cnVlLCBwYXJlbnQ6IHRoaXN9XHJcbi8vICAgICAgICAgICAgICAgICBUaW55LkV2ZW50VGFyZ2V0Lm1peGluKHRoaXMuaW5wdXQpXHJcbi8vICAgICAgICAgICAgIH0gZWxzZSBcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZW5hYmxlZCA9IHRydWVcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmlucHV0ICE9PSBudWxsICYmICh0aGlzLmlucHV0LmVuYWJsZWQgPSBmYWxzZSlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDtcclxuXHJcbiAgICAgICAgaWYod2lkdGggIT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsICdoZWlnaHQnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuc2NhbGUueSAqIHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChoZWlnaHQgIT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIGhlaWdodCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCAnbWFzaycsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNrO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKSB0aGlzLl9tYXNrLmlzTWFzayA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9tYXNrID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKSB0aGlzLl9tYXNrLmlzTWFzayA9IHRydWU7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBpID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICBcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFzayA9IG51bGw7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLmlucHV0KSB0aGlzLmlucHV0LnN5c3RlbS5yZW1vdmUodGhpcyk7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihjaGlsZClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkQ2hpbGRBdChjaGlsZCwgdGhpcy5jaGlsZHJlbi5sZW5ndGgpO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuYWRkQ2hpbGRBdCA9IGZ1bmN0aW9uKGNoaWxkLCBpbmRleClcclxue1xyXG4gICAgaWYoaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLmNoaWxkcmVuLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICBpZihjaGlsZC5wYXJlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdhbWUpIGNoaWxkLmdhbWUgPSB0aGlzLmdhbWU7XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY2hpbGQgKyAnYWRkQ2hpbGRBdDogVGhlIGluZGV4ICcrIGluZGV4ICsnIHN1cHBsaWVkIGlzIG91dCBvZiBib3VuZHMgJyArIHRoaXMuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnN3YXBDaGlsZHJlbiA9IGZ1bmN0aW9uKGNoaWxkLCBjaGlsZDIpXHJcbntcclxuICAgIGlmKGNoaWxkID09PSBjaGlsZDIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGluZGV4MSA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZCk7XHJcbiAgICB2YXIgaW5kZXgyID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkMik7XHJcblxyXG4gICAgaWYoaW5kZXgxIDwgMCB8fCBpbmRleDIgPCAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzd2FwQ2hpbGRyZW46IEJvdGggdGhlIHN1cHBsaWVkIE9iamVjdHMgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXIuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbltpbmRleDFdID0gY2hpbGQyO1xyXG4gICAgdGhpcy5jaGlsZHJlbltpbmRleDJdID0gY2hpbGQ7XHJcblxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uKGNoaWxkKVxyXG57XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSlcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzdXBwbGllZCBPYmplY3QgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXInKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbmRleDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnNldENoaWxkSW5kZXggPSBmdW5jdGlvbihjaGlsZCwgaW5kZXgpXHJcbntcclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc3VwcGxpZWQgaW5kZXggaXMgb3V0IG9mIGJvdW5kcycpO1xyXG4gICAgfVxyXG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZCk7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShjdXJyZW50SW5kZXgsIDEpOyAvL3JlbW92ZSBmcm9tIG9sZCBwb3NpdGlvblxyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTsgLy9hZGQgYXQgbmV3IHBvc2l0aW9uXHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRDaGlsZEF0ID0gZnVuY3Rpb24oaW5kZXgpXHJcbntcclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRDaGlsZEF0OiBTdXBwbGllZCBpbmRleCAnKyBpbmRleCArJyBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdCwgb3IgdGhlIHN1cHBsaWVkIE9iamVjdCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlcicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baW5kZXhdO1xyXG4gICAgXHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihjaGlsZClcclxue1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKCBjaGlsZCApO1xyXG4gICAgaWYoaW5kZXggPT09IC0xKXJldHVybjtcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlQ2hpbGRBdCggaW5kZXggKTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbW92ZUNoaWxkQXQgPSBmdW5jdGlvbihpbmRleClcclxue1xyXG4gICAgdmFyIGNoaWxkID0gdGhpcy5nZXRDaGlsZEF0KCBpbmRleCApO1xyXG4gICAgY2hpbGQucGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoIGluZGV4LCAxICk7XHJcbiAgICByZXR1cm4gY2hpbGQ7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbiA9IGZ1bmN0aW9uKGJlZ2luSW5kZXgsIGVuZEluZGV4KVxyXG57XHJcbiAgICB2YXIgYmVnaW4gPSBiZWdpbkluZGV4IHx8IDA7XHJcbiAgICB2YXIgZW5kID0gdHlwZW9mIGVuZEluZGV4ID09PSAnbnVtYmVyJyA/IGVuZEluZGV4IDogdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICB2YXIgcmFuZ2UgPSBlbmQgLSBiZWdpbjtcclxuXHJcbiAgICBpZiAocmFuZ2UgPiAwICYmIHJhbmdlIDw9IGVuZClcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVtb3ZlZCA9IHRoaXMuY2hpbGRyZW4uc3BsaWNlKGJlZ2luLCByYW5nZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdmVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHJlbW92ZWRbaV07XHJcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyYW5nZSA9PT0gMCAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAncmVtb3ZlQ2hpbGRyZW46IFJhbmdlIEVycm9yLCBudW1lcmljIHZhbHVlcyBhcmUgb3V0c2lkZSB0aGUgYWNjZXB0YWJsZSByYW5nZScgKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYoIXRoaXMudmlzaWJsZSlyZXR1cm47XHJcblxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgaWYodGhpcy5fY2FjaGVBc0JpdG1hcClyZXR1cm47XHJcblxyXG4gICAgZm9yKHZhciBpPTAsaj10aGlzLmNoaWxkcmVuLmxlbmd0aDsgaTxqOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIHBlcmZvcm1hbmNlIGluY3JlYXNlIHRvIGF2b2lkIHVzaW5nIGNhbGwuLiAoMTB4IGZhc3RlcilcclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZGlzcGxheU9iamVjdENvbnRhaW5lclVwZGF0ZVRyYW5zZm9ybSA9IFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcbiAgICBpZiAodGhpcy5fY2FjaGVkU3ByaXRlKSByZXR1cm4gdGhpcy5fY2FjaGVkU3ByaXRlLmdldEJvdW5kcygpXHJcblxyXG4gICAgLy8gVE9ETyB0aGUgYm91bmRzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGN1bGF0ZWQgdGhpcyByZW5kZXIgc2Vzc2lvbiBzbyByZXR1cm4gd2hhdCB3ZSBoYXZlXHJcblxyXG4gICAgdmFyIG1pblggPSBJbmZpbml0eTtcclxuICAgIHZhciBtaW5ZID0gSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgY2hpbGRCb3VuZHM7XHJcbiAgICB2YXIgY2hpbGRNYXhYO1xyXG4gICAgdmFyIGNoaWxkTWF4WTtcclxuXHJcbiAgICB2YXIgY2hpbGRWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgZm9yKHZhciBpPTAsaj10aGlzLmNoaWxkcmVuLmxlbmd0aDsgaTxqOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcclxuICAgICAgICBcclxuICAgICAgICBpZighY2hpbGQudmlzaWJsZSljb250aW51ZTtcclxuXHJcbiAgICAgICAgY2hpbGRWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY2hpbGRCb3VuZHMgPSB0aGlzLmNoaWxkcmVuW2ldLmdldEJvdW5kcygpO1xyXG4gICAgIFxyXG4gICAgICAgIG1pblggPSBtaW5YIDwgY2hpbGRCb3VuZHMueCA/IG1pblggOiBjaGlsZEJvdW5kcy54O1xyXG4gICAgICAgIG1pblkgPSBtaW5ZIDwgY2hpbGRCb3VuZHMueSA/IG1pblkgOiBjaGlsZEJvdW5kcy55O1xyXG5cclxuICAgICAgICBjaGlsZE1heFggPSBjaGlsZEJvdW5kcy53aWR0aCArIGNoaWxkQm91bmRzLng7XHJcbiAgICAgICAgY2hpbGRNYXhZID0gY2hpbGRCb3VuZHMuaGVpZ2h0ICsgY2hpbGRCb3VuZHMueTtcclxuXHJcbiAgICAgICAgbWF4WCA9IG1heFggPiBjaGlsZE1heFggPyBtYXhYIDogY2hpbGRNYXhYO1xyXG4gICAgICAgIG1heFkgPSBtYXhZID4gY2hpbGRNYXhZID8gbWF4WSA6IGNoaWxkTWF4WTtcclxuICAgIH1cclxuXHJcbiAgICBpZighY2hpbGRWaXNpYmxlKVxyXG4gICAgICAgIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gVE9ETzogc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIC8vdGhpcy5fY3VycmVudEJvdW5kcyA9IGJvdW5kcztcclxuICAgXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0TG9jYWxCb3VuZHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBtYXRyaXhDYWNoZSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IFRpbnkuaWRlbnRpdHlNYXRyaXg7XHJcblxyXG4gICAgZm9yKHZhciBpPTAsaj10aGlzLmNoaWxkcmVuLmxlbmd0aDsgaTxqOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbWF0cml4Q2FjaGU7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTsiLCJUaW55LlNjZW5lID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgVGlueS5PYmplY3QyRC5jYWxsKCB0aGlzICk7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG59O1xyXG5cclxuVGlueS5TY2VuZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55Lk9iamVjdDJELnByb3RvdHlwZSApO1xyXG5UaW55LlNjZW5lLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuU2NlbmU7XHJcblxyXG5UaW55LlNjZW5lLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcbn07IiwiXHJcblRpbnkuU3ByaXRlID0gZnVuY3Rpb24odGV4dHVyZSwga2V5KVxyXG57XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dHVyZSh0ZXh0dXJlLCBrZXksIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLl93aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5faGVpZ2h0ID0gMDtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy50aW50ID0gXCIjRkZGRkZGXCI7XHJcblxyXG4gICAgdGhpcy5ibGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dHVyZS5oYXNMb2FkZWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vblRleHR1cmVVcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSB0cnVlO1xyXG59O1xyXG5cclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNwcml0ZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdmcmFtZU5hbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlLmZyYW1lLm5hbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUuZnJhbWUubmFtZSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMudGV4dHVyZS5rZXkgKyBcIi5cIiArIHZhbHVlXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdmcmFtZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5sYXN0RnJhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZnJhbWUgPiB0aGlzLnRleHR1cmUubGFzdEZyYW1lKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSAwXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dHVyZShUaW55LkNhY2hlLnRleHR1cmVbdGhpcy50ZXh0dXJlLmtleSArIFwiLlwiICsgdGhpcy5fZnJhbWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdoZWlnaHQnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuc2NhbGUueSAqIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24odGV4dHVyZSwga2V5LCB1cGRhdGVEaW1lbnNpb24pXHJcbntcclxuICAgIGlmICh0eXBlb2YgdGV4dHVyZSA9PSBcInN0cmluZ1wiKSBcclxuICAgIHtcclxuICAgICAgICB2YXIgaW1hZ2VQYXRoID0gdGV4dHVyZTtcclxuXHJcbiAgICAgICAgaWYgKGtleSAhPSB1bmRlZmluZWQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gaW1hZ2VQYXRoICsgXCIuXCIgKyBrZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2ltYWdlUGF0aF07XHJcblxyXG4gICAgICAgIGlmICghdGV4dHVyZSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZVBhdGgpO1xyXG4gICAgICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoJ0NhY2hlIEVycm9yOiBpbWFnZSAnICsgaW1hZ2VQYXRoICsgJyBkb2VzYHQgZm91bmQgaW4gY2FjaGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dHVyZSA9PT0gdGV4dHVyZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICB0aGlzLmNhY2hlZFRpbnQgPSBcIiNGRkZGRkZcIjtcclxuXHJcbiAgICBpZiAodXBkYXRlRGltZW5zaW9uID09PSB0cnVlKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9uVGV4dHVyZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLm9uVGV4dHVyZVVwZGF0ZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgLy8gc28gaWYgX3dpZHRoIGlzIDAgdGhlbiB3aWR0aCB3YXMgbm90IHNldC4uXHJcbiAgICBpZiAodGhpcy5fd2lkdGgpIHRoaXMuc2NhbGUueCA9IHRoaXMuX3dpZHRoIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgaWYgKHRoaXMuX2hlaWdodCkgdGhpcy5zY2FsZS55ID0gdGhpcy5faGVpZ2h0IC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24odGltZXIsIGRlbGF5KVxyXG57XHJcbiAgICBpZiAodGhpcy50ZXh0dXJlLmxhc3RGcmFtZSAmJiB0aGlzLnRleHR1cmUuZnJhbWUuaW5kZXggIT0gdW5kZWZpbmVkKSBcclxuICAgIHtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IHx8ICh0aGlzLnRleHR1cmUuZnJhbWUuZHVyYXRpb24gfHwgMTAwKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRpbWVyLmxvb3AoZGVsYXksIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZGVsYXkgPSBkZWxheSB8fCAodGhpcy50ZXh0dXJlLmZyYW1lLmR1cmF0aW9uIHx8IDEwMCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IGRlbGF5O1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbihtYXRyaXgpXHJcbntcclxuICAgIHZhciB3aWR0aCA9IHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aCAvIHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uO1xyXG4gICAgdmFyIGhlaWdodCA9IHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQgLyB0aGlzLnRleHR1cmUucmVzb2x1dGlvbjtcclxuXHJcbiAgICB2YXIgdzAgPSB3aWR0aCAqICgxLXRoaXMuYW5jaG9yLngpO1xyXG4gICAgdmFyIHcxID0gd2lkdGggKiAtdGhpcy5hbmNob3IueDtcclxuXHJcbiAgICB2YXIgaDAgPSBoZWlnaHQgKiAoMS10aGlzLmFuY2hvci55KTtcclxuICAgIHZhciBoMSA9IGhlaWdodCAqIC10aGlzLmFuY2hvci55O1xyXG5cclxuICAgIHZhciB3b3JsZFRyYW5zZm9ybSA9IG1hdHJpeCB8fCB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciBhID0gd29ybGRUcmFuc2Zvcm0uYTtcclxuICAgIHZhciBiID0gd29ybGRUcmFuc2Zvcm0uYjtcclxuICAgIHZhciBjID0gd29ybGRUcmFuc2Zvcm0uYztcclxuICAgIHZhciBkID0gd29ybGRUcmFuc2Zvcm0uZDtcclxuICAgIHZhciB0eCA9IHdvcmxkVHJhbnNmb3JtLnR4O1xyXG4gICAgdmFyIHR5ID0gd29ybGRUcmFuc2Zvcm0udHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICBpZiAoYiA9PT0gMCAmJiBjID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIC8vIC8vIHNjYWxlIG1heSBiZSBuZWdhdGl2ZSFcclxuICAgICAgICAvLyBpZiAoYSA8IDApIGEgKj0gLTE7XHJcbiAgICAgICAgLy8gaWYgKGQgPCAwKSBkICo9IC0xO1xyXG5cclxuICAgICAgICAvLyAvLyB0aGlzIG1lYW5zIHRoZXJlIGlzIG5vIHJvdGF0aW9uIGdvaW5nIG9uIHJpZ2h0PyBSSUdIVD9cclxuICAgICAgICAvLyAvLyBpZiB0aGF0cyB0aGUgY2FzZSB0aGVuIHdlIGNhbiBhdm9pZCBjaGVja2luZyB0aGUgYm91bmQgdmFsdWVzISB5YXkgICAgICAgICBcclxuICAgICAgICAvLyBtaW5YID0gYSAqIHcxICsgdHg7XHJcbiAgICAgICAgLy8gbWF4WCA9IGEgKiB3MCArIHR4O1xyXG4gICAgICAgIC8vIG1pblkgPSBkICogaDEgKyB0eTtcclxuICAgICAgICAvLyBtYXhZID0gZCAqIGgwICsgdHk7XHJcblxyXG4gICAgICAgIGlmIChhIDwgMCkge1xyXG4gICAgICAgICAgICBtaW5YID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgICAgIG1heFggPSBhICogdzEgKyB0eDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtaW5YID0gYSAqIHcxICsgdHg7XHJcbiAgICAgICAgICAgIG1heFggPSBhICogdzAgKyB0eDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkIDwgMCkge1xyXG4gICAgICAgICAgICBtaW5ZID0gZCAqIGgwICsgdHk7XHJcbiAgICAgICAgICAgIG1heFkgPSBkICogaDEgKyB0eTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtaW5ZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgICAgIG1heFkgPSBkICogaDAgKyB0eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHgxID0gYSAqIHcxICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgICAgIHZhciB5MiA9IGQgKiBoMSArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHg0ID0gIGEgKiB3MSArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5NCA9ICBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgbWluWCA9IHgxIDwgbWluWCA/IHgxIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHg0IDwgbWluWCA/IHg0IDogbWluWDtcclxuXHJcbiAgICAgICAgbWluWSA9IHkxIDwgbWluWSA/IHkxIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICAgICAgbWF4WCA9IHgxID4gbWF4WCA/IHgxIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDIgPiBtYXhYID8geDIgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICAgICAgbWF4WSA9IHkxID4gbWF4WSA/IHkxIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHk0ID4gbWF4WSA/IHk0IDogbWF4WTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG5cclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYWdhaW4gaW4gdGhlIHJlbmRlciBjeWNsZSB3ZSBkbyBub3QgaGF2ZSB0byByZWNhbGN1bGF0ZVxyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IGJvdW5kcztcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICAvLyBJZiB0aGUgc3ByaXRlIGlzIG5vdCB2aXNpYmxlIG9yIHRoZSBhbHBoYSBpcyAwIHRoZW4gbm8gbmVlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwIHx8IHRoaXMucmVuZGVyYWJsZSA9PT0gZmFsc2UgfHwgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPD0gMCB8fCB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAgSWdub3JlIG51bGwgc291cmNlc1xyXG4gICAgaWYgKHRoaXMudGV4dHVyZS52YWxpZClcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uIC8gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIHRleHR1cmUgaXMgdHJpbW1lZCB3ZSBvZmZzZXQgYnkgdGhlIHRyaW0geC95LCBvdGhlcndpc2Ugd2UgdXNlIHRoZSBmcmFtZSBkaW1lbnNpb25zXHJcbiAgICAgICAgdmFyIGR4ID0gKHRoaXMudGV4dHVyZS50cmltKSA/IHRoaXMudGV4dHVyZS50cmltLnggLSB0aGlzLmFuY2hvci54ICogdGhpcy50ZXh0dXJlLnRyaW0ud2lkdGggOiB0aGlzLmFuY2hvci54ICogLXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB2YXIgZHkgPSAodGhpcy50ZXh0dXJlLnRyaW0pID8gdGhpcy50ZXh0dXJlLnRyaW0ueSAtIHRoaXMuYW5jaG9yLnkgKiB0aGlzLnRleHR1cmUudHJpbS5oZWlnaHQgOiB0aGlzLmFuY2hvci55ICogLXRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vICBBbGxvdyBmb3IgcGl4ZWwgcm91bmRpbmdcclxuICAgICAgICBpZiAocmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmQsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pIHwgMCk7XHJcbiAgICAgICAgICAgIGR4ID0gZHggfCAwO1xyXG4gICAgICAgICAgICBkeSA9IGR5IHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbnQgIT09IFwiI0ZGRkZGRlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkVGludCAhPT0gdGhpcy50aW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZFRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbnRlZFRleHR1cmUgPSBUaW55LkNhbnZhc1RpbnRlci5nZXRUaW50ZWRUZXh0dXJlKHRoaXMsIHRoaXMudGludCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW50ZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeSAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCAvIHJlc29sdXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBPVkVSV1JJVEVcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07IiwiXHJcblRpbnkuVGV4dCA9IGZ1bmN0aW9uKHRleHQsIHN0eWxlKVxyXG57XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IDE7XHJcblxyXG4gICAgVGlueS5TcHJpdGUuY2FsbCh0aGlzLCBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyh0aGlzLmNhbnZhcykpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dCh0ZXh0KTtcclxuICAgIHRoaXMuc2V0U3R5bGUoc3R5bGUpO1xyXG5cclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuU3ByaXRlLnByb3RvdHlwZSk7XHJcblRpbnkuVGV4dC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlRleHQ7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiAgdGhpcy5zY2FsZS55ICogdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbihzdHlsZSlcclxue1xyXG4gICAgc3R5bGUgPSBzdHlsZSB8fCB7fTtcclxuICAgIHN0eWxlLmZvbnQgPSBzdHlsZS5mb250IHx8ICdib2xkIDIwcHQgQXJpYWwnO1xyXG4gICAgc3R5bGUuZmlsbCA9IHN0eWxlLmZpbGwgfHwgJ2JsYWNrJztcclxuICAgIHN0eWxlLmFsaWduID0gc3R5bGUuYWxpZ24gfHwgJ2xlZnQnO1xyXG4gICAgc3R5bGUuc3Ryb2tlID0gc3R5bGUuc3Ryb2tlIHx8ICdibGFjayc7XHJcbiAgICBzdHlsZS5zdHJva2VUaGlja25lc3MgPSBzdHlsZS5zdHJva2VUaGlja25lc3MgfHwgMDtcclxuICAgIHN0eWxlLndvcmRXcmFwID0gc3R5bGUud29yZFdyYXAgfHwgZmFsc2U7XHJcbiAgICBzdHlsZS5saW5lU3BhY2luZyA9IHN0eWxlLmxpbmVTcGFjaW5nIHx8IDBcclxuICAgIHN0eWxlLndvcmRXcmFwV2lkdGggPSBzdHlsZS53b3JkV3JhcFdpZHRoICE9PSB1bmRlZmluZWQgPyBzdHlsZS53b3JkV3JhcFdpZHRoIDogMTAwO1xyXG4gICAgXHJcbiAgICBzdHlsZS5kcm9wU2hhZG93ID0gc3R5bGUuZHJvcFNoYWRvdyB8fCBmYWxzZTtcclxuICAgIHN0eWxlLmRyb3BTaGFkb3dBbmdsZSA9IHN0eWxlLmRyb3BTaGFkb3dBbmdsZSAhPT0gdW5kZWZpbmVkID8gc3R5bGUuZHJvcFNoYWRvd0FuZ2xlIDogTWF0aC5QSSAvIDY7XHJcbiAgICBzdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UgPSBzdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UgIT09IHVuZGVmaW5lZCA/IHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSA6IDQ7XHJcbiAgICBzdHlsZS5kcm9wU2hhZG93Q29sb3IgPSBzdHlsZS5kcm9wU2hhZG93Q29sb3IgfHwgJ2JsYWNrJztcclxuXHJcbiAgICB0aGlzLnN0eWxlID0gc3R5bGU7XHJcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uKHRleHQpXHJcbntcclxuICAgIHRoaXMudGV4dCA9IHRleHQudG9TdHJpbmcoKSB8fCAnICc7XHJcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUudXBkYXRlVGV4dCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy50ZXh0dXJlLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLnN0eWxlLmZvbnQ7XHJcblxyXG4gICAgdmFyIG91dHB1dFRleHQgPSB0aGlzLnRleHQ7XHJcblxyXG4gICAgLy8gd29yZCB3cmFwXHJcbiAgICAvLyBwcmVzZXJ2ZSBvcmlnaW5hbCB0ZXh0XHJcbiAgICBpZih0aGlzLnN0eWxlLndvcmRXcmFwKW91dHB1dFRleHQgPSB0aGlzLndvcmRXcmFwKHRoaXMudGV4dCk7XHJcblxyXG4gICAgLy9zcGxpdCB0ZXh0IGludG8gbGluZXNcclxuICAgIHZhciBsaW5lcyA9IG91dHB1dFRleHQuc3BsaXQoLyg/OlxcclxcbnxcXHJ8XFxuKS8pO1xyXG5cclxuICAgIC8vY2FsY3VsYXRlIHRleHQgd2lkdGhcclxuICAgIHZhciBsaW5lV2lkdGhzID0gW107XHJcbiAgICB2YXIgbWF4TGluZVdpZHRoID0gMDtcclxuICAgIHZhciBmb250UHJvcGVydGllcyA9IHRoaXMuZGV0ZXJtaW5lRm9udFByb3BlcnRpZXModGhpcy5zdHlsZS5mb250KTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxpbmVXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dChsaW5lc1tpXSkud2lkdGg7XHJcbiAgICAgICAgbGluZVdpZHRoc1tpXSA9IGxpbmVXaWR0aDtcclxuICAgICAgICBtYXhMaW5lV2lkdGggPSBNYXRoLm1heChtYXhMaW5lV2lkdGgsIGxpbmVXaWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHdpZHRoID0gbWF4TGluZVdpZHRoICsgdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3M7XHJcbiAgICBpZih0aGlzLnN0eWxlLmRyb3BTaGFkb3cpd2lkdGggKz0gdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcblxyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSAoIHdpZHRoICsgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCApICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgXHJcbiAgICAvL2NhbGN1bGF0ZSB0ZXh0IGhlaWdodFxyXG4gICAgdmFyIGxpbmVIZWlnaHQgPSBmb250UHJvcGVydGllcy5mb250U2l6ZSArIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzICsgdGhpcy5zdHlsZS5saW5lU3BhY2luZztcclxuIFxyXG4gICAgdmFyIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcy5sZW5ndGg7XHJcbiAgICBpZih0aGlzLnN0eWxlLmRyb3BTaGFkb3cpaGVpZ2h0ICs9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IChoZWlnaHQgLSB0aGlzLnN0eWxlLmxpbmVTcGFjaW5nKSAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuc2NhbGUoIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICBpZihuYXZpZ2F0b3IuaXNDb2Nvb25KUykgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLDAsdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgIFxyXG4gICAgLy8gdXNlZCBmb3IgZGVidWdnaW5nLi5cclxuICAgIC8vdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9XCIjRkYwMDAwXCJcclxuICAgIC8vdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLnN0eWxlLmZvbnQ7XHJcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLnN0eWxlLnN0cm9rZTtcclxuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcztcclxuICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnYWxwaGFiZXRpYyc7XHJcbiAgICB0aGlzLmNvbnRleHQubWl0ZXJMaW1pdCA9IDI7XHJcblxyXG4gICAgLy90aGlzLmNvbnRleHQubGluZUpvaW4gPSAncm91bmQnO1xyXG5cclxuICAgIHZhciBsaW5lUG9zaXRpb25YO1xyXG4gICAgdmFyIGxpbmVQb3NpdGlvblk7XHJcblxyXG4gICAgaWYodGhpcy5zdHlsZS5kcm9wU2hhZG93KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dDb2xvcjtcclxuXHJcbiAgICAgICAgdmFyIHhTaGFkb3dPZmZzZXQgPSBNYXRoLnNpbih0aGlzLnN0eWxlLmRyb3BTaGFkb3dBbmdsZSkgKiB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuICAgICAgICB2YXIgeVNoYWRvd09mZnNldCA9IE1hdGguY29zKHRoaXMuc3R5bGUuZHJvcFNoYWRvd0FuZ2xlKSAqIHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyO1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25ZID0gKHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMiArIGkgKiBsaW5lSGVpZ2h0KSArIGZvbnRQcm9wZXJ0aWVzLmFzY2VudDtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdyaWdodCcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gbWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdjZW50ZXInKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3R5bGUuZmlsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YICsgeFNoYWRvd09mZnNldCwgbGluZVBvc2l0aW9uWSArIHlTaGFkb3dPZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gIGlmKGRyb3BTaGFkb3cpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vc2V0IGNhbnZhcyB0ZXh0IHN0eWxlc1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuc3R5bGUuZmlsbDtcclxuICAgIFxyXG4gICAgLy9kcmF3IGxpbmVzIGxpbmUgYnkgbGluZVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIGxpbmVQb3NpdGlvblggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDI7XHJcbiAgICAgICAgbGluZVBvc2l0aW9uWSA9ICh0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDIgKyBpICogbGluZUhlaWdodCkgKyBmb250UHJvcGVydGllcy5hc2NlbnQ7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdyaWdodCcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5zdHlsZS5hbGlnbiA9PT0gJ2NlbnRlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnN0eWxlLnN0cm9rZSAmJiB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YLCBsaW5lUG9zaXRpb25ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc3R5bGUuZmlsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCwgbGluZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gIGlmKGRyb3BTaGFkb3cpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVUZXh0dXJlKCk7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnVwZGF0ZVRleHR1cmUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMudGV4dHVyZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy50ZXh0dXJlLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxuICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoID0gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuX3dpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmKHRoaXMuZGlydHkgfHwgdGhpcy5yZXNvbHV0aW9uICE9PSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcywgcmVuZGVyU2Vzc2lvbik7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLmRldGVybWluZUZvbnRQcm9wZXJ0aWVzID0gZnVuY3Rpb24oZm9udFN0eWxlKVxyXG57XHJcbiAgICB2YXIgcHJvcGVydGllcyA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhY2hlW2ZvbnRTdHlsZV07XHJcblxyXG4gICAgaWYoIXByb3BlcnRpZXMpXHJcbiAgICB7XHJcbiAgICAgICAgcHJvcGVydGllcyA9IHt9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjYW52YXMgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXM7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDb250ZXh0O1xyXG5cclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250U3R5bGU7XHJcblxyXG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguY2VpbChjb250ZXh0Lm1lYXN1cmVUZXh0KCd8TcOJcScpLndpZHRoKTtcclxuICAgICAgICB2YXIgYmFzZWxpbmUgPSBNYXRoLmNlaWwoY29udGV4dC5tZWFzdXJlVGV4dCgnfE3DiXEnKS53aWR0aCk7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IDIgKiBiYXNlbGluZTtcclxuXHJcbiAgICAgICAgYmFzZWxpbmUgPSBiYXNlbGluZSAqIDEuNCB8IDA7XHJcblxyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNmMDAnO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnRTdHlsZTtcclxuXHJcbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnYWxwaGFiZXRpYyc7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCgnfE3DiXEnLCAwLCBiYXNlbGluZSk7XHJcblxyXG4gICAgICAgIHZhciBpbWFnZWRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xyXG4gICAgICAgIHZhciBwaXhlbHMgPSBpbWFnZWRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHZhciBsaW5lID0gd2lkdGggKiA0O1xyXG5cclxuICAgICAgICB2YXIgaSwgajtcclxuXHJcbiAgICAgICAgdmFyIGlkeCA9IDA7XHJcbiAgICAgICAgdmFyIHN0b3AgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gYXNjZW50LiBzY2FuIGZyb20gdG9wIHRvIGJvdHRvbSB1bnRpbCB3ZSBmaW5kIGEgbm9uIHJlZCBwaXhlbFxyXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGJhc2VsaW5lOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBsaW5lOyBqICs9IDQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGltYWdlZGF0YVtpZHggKyBqXSAhPT0gMjU1KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFzdG9wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZHggKz0gbGluZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmFzY2VudCA9IGJhc2VsaW5lIC0gaTtcclxuXHJcbiAgICAgICAgaWR4ID0gcGl4ZWxzIC0gbGluZTtcclxuICAgICAgICBzdG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGRlc2NlbnQuIHNjYW4gZnJvbSBib3R0b20gdG8gdG9wIHVudGlsIHdlIGZpbmQgYSBub24gcmVkIHBpeGVsXHJcbiAgICAgICAgZm9yKGkgPSBoZWlnaHQ7IGkgPiBiYXNlbGluZTsgaS0tKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbGluZTsgaiArPSA0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZWRhdGFbaWR4ICsgal0gIT09IDI1NSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighc3RvcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWR4IC09IGxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvcGVydGllcy5kZXNjZW50ID0gaSAtIGJhc2VsaW5lO1xyXG4gICAgICAgIC8vVE9ETyBtaWdodCBuZWVkIGEgdHdlYWsuIGtpbmQgb2YgYSB0ZW1wIGZpeCFcclxuICAgICAgICBwcm9wZXJ0aWVzLmRlc2NlbnQgKz0gNjtcclxuICAgICAgICBwcm9wZXJ0aWVzLmZvbnRTaXplID0gcHJvcGVydGllcy5hc2NlbnQgKyBwcm9wZXJ0aWVzLmRlc2NlbnQ7XHJcblxyXG4gICAgICAgIFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhY2hlW2ZvbnRTdHlsZV0gPSBwcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS53b3JkV3JhcCA9IGZ1bmN0aW9uKHRleHQpXHJcbntcclxuICAgIC8vIEdyZWVkeSB3cmFwcGluZyBhbGdvcml0aG0gdGhhdCB3aWxsIHdyYXAgd29yZHMgYXMgdGhlIGxpbmUgZ3Jvd3MgbG9uZ2VyXHJcbiAgICAvLyB0aGFuIGl0cyBob3Jpem9udGFsIGJvdW5kcy5cclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIHZhciBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcbicpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgc3BhY2VMZWZ0ID0gdGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoO1xyXG4gICAgICAgIHZhciB3b3JkcyA9IGxpbmVzW2ldLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3b3Jkcy5sZW5ndGg7IGorKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB3b3JkV2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQod29yZHNbal0pLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgd29yZFdpZHRoV2l0aFNwYWNlID0gd29yZFdpZHRoICsgdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KCcgJykud2lkdGg7XHJcbiAgICAgICAgICAgIGlmKGogPT09IDAgfHwgd29yZFdpZHRoV2l0aFNwYWNlID4gc3BhY2VMZWZ0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHByaW50aW5nIHRoZSBuZXdsaW5lIGlmIGl0J3MgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGxpbmUgdGhhdCBpc1xyXG4gICAgICAgICAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRoZSB3b3JkIHdyYXAgd2lkdGguXHJcbiAgICAgICAgICAgICAgICBpZihqID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcbic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gd29yZHNbal07XHJcbiAgICAgICAgICAgICAgICBzcGFjZUxlZnQgPSB0aGlzLnN0eWxlLndvcmRXcmFwV2lkdGggLSB3b3JkV2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUxlZnQgLT0gd29yZFdpZHRoV2l0aFNwYWNlO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICcgJyArIHdvcmRzW2pdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaSA8IGxpbmVzLmxlbmd0aC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9ICdcXG4nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKG1hdHJpeClcclxue1xyXG4gICAgaWYodGhpcy5kaXJ0eSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMuY2FsbCh0aGlzLCBtYXRyaXgpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAvLyBtYWtlIHN1cmUgdG8gcmVzZXQgdGhlIHRoZSBjb250ZXh0IGFuZCBjYW52YXMuLiBkb250IHdhbnQgdGhpcyBoYW5naW5nIGFyb3VuZCBpbiBtZW1vcnkhXHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5jYW52YXMgPSBudWxsO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZS5kZXN0cm95KCk7XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhY2hlID0ge307XHJcblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDb250ZXh0ID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzLmdldENvbnRleHQoJzJkJyk7IiwiXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIgPSBmdW5jdGlvbigpXHJcbntcclxufTtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNNYXNrTWFuYWdlcjtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLnB1c2hNYXNrID0gZnVuY3Rpb24obWFza0RhdGEsIHJlbmRlclNlc3Npb24pXHJcbntcclxuXHR2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgIFxyXG4gICAgdmFyIGNhY2hlQWxwaGEgPSBtYXNrRGF0YS5hbHBoYTtcclxuICAgIHZhciB0cmFuc2Zvcm0gPSBtYXNrRGF0YS53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvbik7XHJcblxyXG4gICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljc01hc2sobWFza0RhdGEsIGNvbnRleHQpO1xyXG5cclxuICAgIGNvbnRleHQuY2xpcCgpO1xyXG5cclxuICAgIG1hc2tEYXRhLndvcmxkQWxwaGEgPSBjYWNoZUFscGhhO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUucG9wTWFzayA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5yZXN0b3JlKCk7XHJcbn07IiwiXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKVxyXG57ICAgXHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG5cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IChvcHRpb25zLnJlc29sdXRpb24gIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5yZXNvbHV0aW9uIDogMSk7XHJcblxyXG4gICAgdGhpcy5jbGVhckJlZm9yZVJlbmRlciA9IChvcHRpb25zLmNsZWFyQmVmb3JlUmVuZGVyICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xlYXJCZWZvcmVSZW5kZXIgOiB0cnVlKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zcGFyZW50ID0gKG9wdGlvbnMudHJhbnNwYXJlbnQgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy50cmFuc3BhcmVudCA6IGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUgPSBvcHRpb25zLmF1dG9SZXNpemUgfHwgZmFsc2U7XHJcblxyXG4gICAgLy8gdGhpcy53aWR0aCA9IHdpZHRoIHx8IDgwMDtcclxuICAgIC8vIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDYwMDtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoICo9IHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHRoaXMuaGVpZ2h0ICo9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICBpZiAoIVRpbnkuZGVmYXVsdFJlbmRlcmVyKSBUaW55LmRlZmF1bHRSZW5kZXJlciA9IHRoaXM7XHJcblxyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQgPSBvcHRpb25zLmRvbUVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJjYW52YXNcIiApO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IHZpZXcuZ2V0Q29udGV4dCggXCIyZFwiLCB7IGFscGhhOiB0aGlzLnRyYW5zcGFyZW50IH0gKTtcclxuXHJcbiAgICAvLyB2aWV3LndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHZpZXcuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5yZXNpemUod2lkdGggfHwgODAwLCBoZWlnaHQgfHwgNjAwKTtcclxuXHJcbiAgICB0aGlzLnNldENsZWFyQ29sb3IoXCIjZmZmZmZmXCIpO1xyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc01hc2tNYW5hZ2VyKVxyXG4gICAgICAgIHRoaXMubWFza01hbmFnZXIgPSBuZXcgVGlueS5DYW52YXNNYXNrTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbiA9IHtcclxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgbWFza01hbmFnZXI6IHRoaXMubWFza01hbmFnZXIsXHJcbiAgICAgICAgc21vb3RoUHJvcGVydHk6IG51bGwsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgdHJ1ZSBQaXhpIHdpbGwgTWF0aC5mbG9vcigpIHgveSB2YWx1ZXMgd2hlbiByZW5kZXJpbmcsIHN0b3BwaW5nIHBpeGVsIGludGVycG9sYXRpb24uXHJcbiAgICAgICAgICogSGFuZHkgZm9yIGNyaXNwIHBpeGVsIGFydCBhbmQgc3BlZWQgb24gbGVnYWN5IGRldmljZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICByb3VuZFBpeGVsczogZmFsc2VcclxuICAgIH07XHJcblxyXG5cclxuICAgIGlmKFwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmKFwid2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwid2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmKFwibW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwibW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmKFwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm9JbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYgKFwibXNJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJtc0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkNhbnZhc1JlbmRlcmVyO1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uKGNvbG9yKVxyXG57ICAgXHJcbiAgICB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvcjtcclxuICAgIFxyXG4gICAgLy8gaWYgKGNvbG9yID09PSBudWxsKSB7XHJcbiAgICAvLyAgICAgdGhpcy5jbGVhckNvbG9yID0gbnVsbDtcclxuICAgIC8vICAgICByZXR1cm47XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdGhpcy5jbGVhckNvbG9yID0gY29sb3IgfHwgMHgwMDAwMDA7XHJcbiAgICAvLyAvLyB0aGlzLmJhY2tncm91bmRDb2xvclNwbGl0ID0gVGlueS5oZXgycmdiKHRoaXMuYmFja2dyb3VuZENvbG9yKTtcclxuICAgIC8vIHZhciBoZXggPSB0aGlzLmNsZWFyQ29sb3IudG9TdHJpbmcoMTYpO1xyXG4gICAgLy8gaGV4ID0gJzAwMDAwMCcuc3Vic3RyKDAsIDYgLSBoZXgubGVuZ3RoKSArIGhleDtcclxuICAgIC8vIHRoaXMuX2NsZWFyQ29sb3IgPSAnIycgKyBoZXg7XHJcblxyXG59O1xyXG5cclxuLy8gVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2V0UGl4ZWxBcnQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICB2YXIgY2FudmFzID0gdGhpcy5kb21FbGVtZW50O1xyXG4gICAgXHJcbi8vICAgICB2YXIgdHlwZXMgPSBbICdvcHRpbWl6ZVNwZWVkJywgJy1tb3otY3Jpc3AtZWRnZXMnLCAnLW8tY3Jpc3AtZWRnZXMnLCAnLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdCcsICdvcHRpbWl6ZS1jb250cmFzdCcsICdjcmlzcC1lZGdlcycsICdwaXhlbGF0ZWQnIF07XHJcblxyXG4vLyAgICAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBjYW52YXMuc3R5bGVbJ2ltYWdlLXJlbmRlcmluZyddID0gdHlwZTtcclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIGNhbnZhcy5zdHlsZS5tc0ludGVycG9sYXRpb25Nb2RlID0gJ25lYXJlc3QtbmVpZ2hib3InO1xyXG4vLyAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzID0gdHJ1ZTtcclxuLy8gfVxyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oc2NlbmUpXHJcbntcclxuICAgIHNjZW5lLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xyXG5cclxuICAgIGlmIChuYXZpZ2F0b3IuaXNDb2Nvb25KUyAmJiB0aGlzLmRvbUVsZW1lbnQuc2NyZWVuY2FudmFzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICh0aGlzLmNsZWFyQmVmb3JlUmVuZGVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYW5zcGFyZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNsZWFyQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLnJlbmRlck9iamVjdChzY2VuZSk7XHJcblxyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKHJlbW92ZVZpZXcpXHJcbnsgICBcclxuICAgIGlmICh0eXBlb2YgcmVtb3ZlVmlldyA9PT0gXCJ1bmRlZmluZWRcIikgeyByZW1vdmVWaWV3ID0gdHJ1ZTsgfVxyXG5cclxuICAgIGlmIChyZW1vdmVWaWV3ICYmIHRoaXMuZG9tRWxlbWVudC5wYXJlbnROb2RlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZG9tRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLm1hc2tNYW5hZ2VyID0gbnVsbDtcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbiA9IG51bGw7XHJcblxyXG4gICAgaWYgKFRpbnkuZGVmYXVsdFJlbmRlcmVyID09PSB0aGlzKSBUaW55LmRlZmF1bHRSZW5kZXJlciA9IG51bGw7XHJcblxyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodClcclxue1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgdmlldy53aWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICB2aWV3LmhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcclxuICAgICAgICB2aWV3LnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgdmlldy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24ocmVzb2x1dGlvbilcclxue1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICB2YXIgdmlldyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbiAgICB2aWV3LndpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgIHZpZXcuaGVpZ2h0ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJPYmplY3QgPSBmdW5jdGlvbihkaXNwbGF5T2JqZWN0LCBjb250ZXh0KVxyXG57XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcy5jb250ZXh0O1xyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICBkaXNwbGF5T2JqZWN0LnJlbmRlcih0aGlzLnJlbmRlclNlc3Npb24pO1xyXG59OyIsIlxyXG5UaW55LkNhbnZhc1RpbnRlciA9IGZ1bmN0aW9uKClcclxue1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSA9IGZ1bmN0aW9uKHNwcml0ZSwgY29sb3IpXHJcbntcclxuICAgIHZhciB0ZXh0dXJlID0gc3ByaXRlLnRleHR1cmU7XHJcblxyXG4gICAgaWYgKCF0ZXh0dXJlLl90aW50Q2FjaGUpIHRleHR1cmUuX3RpbnRDYWNoZSA9IHt9O1xyXG5cclxuICAgIGlmICh0ZXh0dXJlLl90aW50Q2FjaGVbY29sb3JdKSByZXR1cm4gdGV4dHVyZS5fdGludENhY2hlW2NvbG9yXTtcclxuXHJcbiAgICB2YXIgY2FudmFzID0gVGlueS5DYW52YXNUaW50ZXIuY2FudmFzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICBcclxuICAgIFRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QodGV4dHVyZSwgY29sb3IsIGNhbnZhcyk7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzVGludGVyLmNvbnZlcnRUaW50VG9JbWFnZSlcclxuICAgIHtcclxuICAgICAgICAvLyBpcyB0aGlzIGJldHRlcj9cclxuICAgICAgICB2YXIgdGludEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGludEltYWdlLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuXHJcbiAgICAgICAgLy8gdGV4dHVyZS5fdGludENhY2hlW3N0cmluZ0NvbG9yXSA9IHRpbnRJbWFnZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuXHJcbiAgICAgICAgVGlueS5DYW52YXNUaW50ZXIuY2FudmFzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoVGlueS5DYW52YXNUaW50ZXIuY2FjaGVUaW50KSB0ZXh0dXJlLl90aW50Q2FjaGVbY29sb3JdID0gY2FudmFzO1xyXG5cclxuICAgIHJldHVybiBjYW52YXM7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5ID0gZnVuY3Rpb24odGV4dHVyZSwgY29sb3IsIGNhbnZhcylcclxue1xyXG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCggXCIyZFwiICk7XHJcblxyXG4gICAgdmFyIGNyb3AgPSB0ZXh0dXJlLmNyb3A7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY3JvcC53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBjcm9wLmhlaWdodDtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoY29sb3IpO1xyXG4gICAgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuICAgIFxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcIm11bHRpcGx5XCI7XHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQpO1xyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1hdG9wXCI7XHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQpO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhQZXJQaXhlbCA9IGZ1bmN0aW9uKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpXHJcbntcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICB2YXIgY3JvcCA9IHRleHR1cmUuY3JvcDtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjcm9wLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGNyb3AuaGVpZ2h0O1xyXG4gIFxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImNvcHlcIjtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRleHR1cmUuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICB2YXIgcmdiVmFsdWVzID0gVGlueS5jb2xvcjJyZ2IoY29sb3IpO1xyXG4gICAgdmFyIHIgPSByZ2JWYWx1ZXNbMF0sIGcgPSByZ2JWYWx1ZXNbMV0sIGIgPSByZ2JWYWx1ZXNbMl07XHJcblxyXG4gICAgdmFyIHBpeGVsRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICB2YXIgcGl4ZWxzID0gcGl4ZWxEYXRhLmRhdGE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwaXhlbHMubGVuZ3RoOyBpICs9IDQpXHJcbiAgICB7XHJcbiAgICAgIHBpeGVsc1tpKzBdICo9IHI7XHJcbiAgICAgIHBpeGVsc1tpKzFdICo9IGc7XHJcbiAgICAgIHBpeGVsc1tpKzJdICo9IGI7XHJcblxyXG4gICAgICBpZiAoIVRpbnkuY2FuSGFuZGxlQWxwaGEpXHJcbiAgICAgIHtcclxuICAgICAgICB2YXIgYWxwaGEgPSBwaXhlbHNbaSszXTtcclxuXHJcbiAgICAgICAgcGl4ZWxzW2krMF0gLz0gMjU1IC8gYWxwaGE7XHJcbiAgICAgICAgcGl4ZWxzW2krMV0gLz0gMjU1IC8gYWxwaGE7XHJcbiAgICAgICAgcGl4ZWxzW2krMl0gLz0gMjU1IC8gYWxwaGE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShwaXhlbERhdGEsIDAsIDApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2hlY2tJbnZlcnNlQWxwaGEoKVxyXG57XHJcbiAgICB2YXIgY2FudmFzID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKDIsIDEsIHt3aWxsUmVhZEZyZXF1ZW50bHk6IHRydWV9KTtcclxuXHJcbiAgICBjYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMTAsIDIwLCAzMCwgMC41KVwiO1xyXG5cclxuICAgIC8vICBEcmF3IGEgc2luZ2xlIHBpeGVsXHJcbiAgICBjYW52YXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgR2V0IHRoZSBjb2xvciB2YWx1ZXNcclxuICAgIHZhciBzMSA9IGNhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgUGxvdCB0aGVtIHRvIHgyXHJcbiAgICBjYW52YXMuY29udGV4dC5wdXRJbWFnZURhdGEoczEsIDEsIDApO1xyXG5cclxuICAgIC8vICBHZXQgdGhvc2UgdmFsdWVzXHJcbiAgICB2YXIgczIgPSBjYW52YXMuY29udGV4dC5nZXRJbWFnZURhdGEoMSwgMCwgMSwgMSk7XHJcblxyXG4gICAgLy8gIENvbXBhcmUgYW5kIHJldHVyblxyXG4gICAgcmV0dXJuIChzMi5kYXRhWzBdID09PSBzMS5kYXRhWzBdICYmIHMyLmRhdGFbMV0gPT09IHMxLmRhdGFbMV0gJiYgczIuZGF0YVsyXSA9PT0gczEuZGF0YVsyXSAmJiBzMi5kYXRhWzNdID09PSBzMS5kYXRhWzNdKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrQmxlbmRNb2RlICgpXHJcbntcclxuICAgIHZhciBwbmdIZWFkID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQVFBQUFBQkFRTUFBQUREOHAyT0FBQUFBMUJNVkVYLyc7XHJcbiAgICB2YXIgcG5nRW5kID0gJ0FBQUFDa2xFUVZRSTEyTmdBQUFBQWdBQjRpRzhNd0FBQUFCSlJVNUVya0pnZ2c9PSc7XHJcblxyXG4gICAgdmFyIG1hZ2VudGEgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBtYWdlbnRhLm9ubG9hZCA9IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHllbGxvdyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgICB5ZWxsb3cub25sb2FkID0gZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gNjtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJywge3dpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZX0pO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbXVsdGlwbHknO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UobWFnZW50YSwgMCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHllbGxvdywgMiwgMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRleHQuZ2V0SW1hZ2VEYXRhKDIsIDAsIDEsIDEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMiwgMCwgMSwgMSkuZGF0YTtcclxuXHJcbiAgICAgICAgICAgIFRpbnkuc3VwcG9ydE5ld0JsZW5kTW9kZXMgPSAoZGF0YVswXSA9PT0gMjU1ICYmIGRhdGFbMV0gPT09IDAgJiYgZGF0YVsyXSA9PT0gMCk7XHJcbiAgICAgICAgICAgIFRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QgPSBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHllbGxvdy5zcmMgPSBwbmdIZWFkICsgJy93Q0t4dlJGJyArIHBuZ0VuZDtcclxuICAgIH07XHJcblxyXG4gICAgbWFnZW50YS5zcmMgPSBwbmdIZWFkICsgJ0FQODA0T2E2JyArIHBuZ0VuZDtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci5jb252ZXJ0VGludFRvSW1hZ2UgPSBmYWxzZTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLmNhY2hlVGludCA9IGZhbHNlO1xyXG5cclxuVGlueS5jYW5IYW5kbGVBbHBoYSA9IGNoZWNrSW52ZXJzZUFscGhhKCk7XHJcblxyXG5UaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzID0gY2hlY2tCbGVuZE1vZGUoKTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QgPSBUaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzID8gVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseSA6ICBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aFBlclBpeGVsO1xyXG4iLCJcclxuVGlueS5DYW52YXNHcmFwaGljcyA9IGZ1bmN0aW9uKClcclxue1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyA9IGZ1bmN0aW9uKGdyYXBoaWNzLCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgd29ybGRBbHBoYSA9IGdyYXBoaWNzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgaWYgKGdyYXBoaWNzLmRpcnR5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXBkYXRlR3JhcGhpY3NUaW50KGdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhW2ldO1xyXG4gICAgICAgIHZhciBzaGFwZSA9IGRhdGEuc2hhcGU7XHJcblxyXG4gICAgICAgIHZhciBmaWxsQ29sb3IgPSBkYXRhLl9maWxsVGludDtcclxuICAgICAgICB2YXIgbGluZUNvbG9yID0gZGF0YS5fbGluZVRpbnQ7XHJcblxyXG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gZGF0YS5saW5lV2lkdGg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGo9MTsgaiA8IHBvaW50cy5sZW5ndGgvMjsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbaiAqIDJdLCBwb2ludHNbaiAqIDIgKyAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzaGFwZS5jbG9zZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IGFyZSB0aGUgc2FtZSBjbG9zZSB0aGUgcGF0aCAtIG11Y2ggbmVhdGVyIDopXHJcbiAgICAgICAgICAgIGlmIChwb2ludHNbMF0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoLTJdICYmIHBvaW50c1sxXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SRUNUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbENvbG9yIHx8IGRhdGEuZmlsbENvbG9yID09PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPIC0gbmVlZCB0byBiZSBVbmRlZmluZWQhXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLnJhZGl1cywwLDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUobGluZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGVsbGlwc2UgY29kZSB0YWtlbiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIxNzI3OTgvaG93LXRvLWRyYXctYW4tb3ZhbC1pbi1odG1sNS1jYW52YXNcclxuXHJcbiAgICAgICAgICAgIHZhciB3ID0gc2hhcGUud2lkdGggKiAyO1xyXG4gICAgICAgICAgICB2YXIgaCA9IHNoYXBlLmhlaWdodCAqIDI7XHJcblxyXG4gICAgICAgICAgICB2YXIgeCA9IHNoYXBlLnggLSB3LzI7XHJcbiAgICAgICAgICAgIHZhciB5ID0gc2hhcGUueSAtIGgvMjtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIga2FwcGEgPSAwLjU1MjI4NDgsXHJcbiAgICAgICAgICAgICAgICBveCA9ICh3IC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgb3kgPSAoaCAvIDIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IHZlcnRpY2FsXHJcbiAgICAgICAgICAgICAgICB4ZSA9IHggKyB3LCAgICAgICAgICAgLy8geC1lbmRcclxuICAgICAgICAgICAgICAgIHllID0geSArIGgsICAgICAgICAgICAvLyB5LWVuZFxyXG4gICAgICAgICAgICAgICAgeG0gPSB4ICsgdyAvIDIsICAgICAgIC8vIHgtbWlkZGxlXHJcbiAgICAgICAgICAgICAgICB5bSA9IHkgKyBoIC8gMjsgICAgICAgLy8geS1taWRkbGVcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHgsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHgsIHltIC0gb3ksIHhtIC0gb3gsIHksIHhtLCB5KTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtICsgb3gsIHksIHhlLCB5bSAtIG95LCB4ZSwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeGUsIHltICsgb3ksIHhtICsgb3gsIHllLCB4bSwgeWUpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gLSBveCwgeWUsIHgsIHltICsgb3ksIHgsIHltKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUobGluZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgIHZhciByeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHNoYXBlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gc2hhcGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gc2hhcGUucmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1heFJhZGl1cyA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMiB8IDA7XHJcbiAgICAgICAgICAgIHJhZGl1cyA9IHJhZGl1cyA+IG1heFJhZGl1cyA/IG1heFJhZGl1cyA6IHJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHJ4LCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4LCByeSArIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCwgcnkgKyBoZWlnaHQsIHJ4ICsgcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0LCByeCArIHdpZHRoLCByeSArIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgd2lkdGgsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4ICsgd2lkdGgsIHJ5LCByeCArIHdpZHRoIC0gcmFkaXVzLCByeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgcmFkaXVzLCByeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCwgcnksIHJ4LCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsQ29sb3IgfHwgZGF0YS5maWxsQ29sb3IgPT09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAvLyAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAvLyAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgLy8gICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgLy8gICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgIC8vICAgICBpZiAoZGF0YS5maWxsQ29sb3IgfHwgZGF0YS5maWxsQ29sb3IgPT09IDApXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgLy8gICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgLy8gICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIGNvbnRleHQubGluZUpvaW4gPSBcInJvdW5kXCI7XHJcbiAgICAgICAgLy8gICAgIGNvbnRleHQubGluZVdpZHRoID0gcmFkaXVzO1xyXG5cclxuICAgICAgICAvLyAgICAgY29udGV4dC5zdHJva2VSZWN0KHJ4ICsgKHJhZGl1cyAvIDIpLCByeSArIChyYWRpdXMgLyAyKSwgd2lkdGggLSByYWRpdXMsIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgLy8gICAgIGNvbnRleHQuZmlsbFJlY3QocnggKyAocmFkaXVzIC8gMiksIHJ5ICsgKHJhZGl1cyAvIDIpLCB3aWR0aCAtIHJhZGl1cywgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzTWFzayA9IGZ1bmN0aW9uKGdyYXBoaWNzLCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgbGVuID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhLmxlbmd0aDtcclxuXHJcbiAgICBpZiAobGVuID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuICAgICAgICBcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaj0xOyBqIDwgcG9pbnRzLmxlbmd0aC8yOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tqICogMl0sIHBvaW50c1tqICogMiArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IGFyZSB0aGUgc2FtZSBjbG9zZSB0aGUgcGF0aCAtIG11Y2ggbmVhdGVyIDopXHJcbiAgICAgICAgICAgIGlmIChwb2ludHNbMF0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoLTJdICYmIHBvaW50c1sxXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJFQ1QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LnJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPIC0gbmVlZCB0byBiZSBVbmRlZmluZWQhXHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5FTElQKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGVsbGlwc2UgY29kZSB0YWtlbiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIxNzI3OTgvaG93LXRvLWRyYXctYW4tb3ZhbC1pbi1odG1sNS1jYW52YXNcclxuXHJcbiAgICAgICAgICAgIHZhciB3ID0gc2hhcGUud2lkdGggKiAyO1xyXG4gICAgICAgICAgICB2YXIgaCA9IHNoYXBlLmhlaWdodCAqIDI7XHJcblxyXG4gICAgICAgICAgICB2YXIgeCA9IHNoYXBlLnggLSB3LzI7XHJcbiAgICAgICAgICAgIHZhciB5ID0gc2hhcGUueSAtIGgvMjtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYXBwYSA9IDAuNTUyMjg0OCxcclxuICAgICAgICAgICAgICAgIG94ID0gKHcgLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBveSA9IChoIC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcclxuICAgICAgICAgICAgICAgIHhlID0geCArIHcsICAgICAgICAgICAvLyB4LWVuZFxyXG4gICAgICAgICAgICAgICAgeWUgPSB5ICsgaCwgICAgICAgICAgIC8vIHktZW5kXHJcbiAgICAgICAgICAgICAgICB4bSA9IHggKyB3IC8gMiwgICAgICAgLy8geC1taWRkbGVcclxuICAgICAgICAgICAgICAgIHltID0geSArIGggLyAyOyAgICAgICAvLyB5LW1pZGRsZVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeCwgeW0gLSBveSwgeG0gLSBveCwgeSwgeG0sIHkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gKyBveCwgeSwgeGUsIHltIC0gb3ksIHhlLCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4ZSwgeW0gKyBveSwgeG0gKyBveCwgeWUsIHhtLCB5ZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSAtIG94LCB5ZSwgeCwgeW0gKyBveSwgeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDIHx8IGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUNfTEpPSU4pXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF4UmFkaXVzID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyIHwgMDtcclxuICAgICAgICAgICAgcmFkaXVzID0gcmFkaXVzID4gbWF4UmFkaXVzID8gbWF4UmFkaXVzIDogcmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocngsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSArIGhlaWdodCwgcnggKyByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCAtIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnkgKyBoZWlnaHQsIHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnksIHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSwgcngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnVwZGF0ZUdyYXBoaWNzVGludCA9IGZ1bmN0aW9uKGdyYXBoaWNzKVxyXG57XHJcbiAgICBpZiAoZ3JhcGhpY3MudGludCA9PT0gMHhGRkZGRkYpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0aW50UiA9IChncmFwaGljcy50aW50ID4+IDE2ICYgMHhGRikgLyAyNTU7XHJcbiAgICB2YXIgdGludEcgPSAoZ3JhcGhpY3MudGludCA+PiA4ICYgMHhGRikgLyAyNTU7XHJcbiAgICB2YXIgdGludEIgPSAoZ3JhcGhpY3MudGludCAmIDB4RkYpLyAyNTU7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcblxyXG4gICAgICAgIHZhciBmaWxsQ29sb3IgPSBkYXRhLmZpbGxDb2xvciB8IDA7XHJcbiAgICAgICAgdmFyIGxpbmVDb2xvciA9IGRhdGEubGluZUNvbG9yIHwgMDtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgY29sb3JSID0gKGZpbGxDb2xvciA+PiAxNiAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIHZhciBjb2xvckcgPSAoZmlsbENvbG9yID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgICAgICB2YXIgY29sb3JCID0gKGZpbGxDb2xvciAmIDB4RkYpIC8gMjU1OyBcclxuICAgICAgICBjb2xvclIgKj0gdGludFI7XHJcbiAgICAgICAgY29sb3JHICo9IHRpbnRHO1xyXG4gICAgICAgIGNvbG9yQiAqPSB0aW50QjtcclxuICAgICAgICBmaWxsQ29sb3IgPSAoKGNvbG9yUioyNTUgPDwgMTYpICsgKGNvbG9yRyoyNTUgPDwgOCkgKyBjb2xvckIqMjU1KTtcclxuICAgICAgICBjb2xvclIgPSAobGluZUNvbG9yID4+IDE2ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgY29sb3JHID0gKGxpbmVDb2xvciA+PiA4ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgY29sb3JCID0gKGxpbmVDb2xvciAmIDB4RkYpIC8gMjU1OyBcclxuICAgICAgICBjb2xvclIgKj0gdGludFI7XHJcbiAgICAgICAgY29sb3JHICo9IHRpbnRHO1xyXG4gICAgICAgIGNvbG9yQiAqPSB0aW50QjtcclxuICAgICAgICBsaW5lQ29sb3IgPSAoKGNvbG9yUioyNTUgPDwgMTYpICsgKGNvbG9yRyoyNTUgPDwgOCkgKyBjb2xvckIqMjU1KTsgICBcclxuICAgICAgICAqL1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRhdGEuX2ZpbGxUaW50ID0gKCgoZmlsbENvbG9yID4+IDE2ICYgMHhGRikgLyAyNTUgKiB0aW50UioyNTUgPDwgMTYpICsgKChmaWxsQ29sb3IgPj4gOCAmIDB4RkYpIC8gMjU1ICogdGludEcqMjU1IDw8IDgpICsgIChmaWxsQ29sb3IgJiAweEZGKSAvIDI1NSAqIHRpbnRCKjI1NSk7XHJcbiAgICAgICAgZGF0YS5fbGluZVRpbnQgPSAoKChsaW5lQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NSAqIHRpbnRSKjI1NSA8PCAxNikgKyAoKGxpbmVDb2xvciA+PiA4ICYgMHhGRikgLyAyNTUgKiB0aW50RyoyNTUgPDwgOCkgKyAgKGxpbmVDb2xvciAmIDB4RkYpIC8gMjU1ICogdGludEIqMjU1KTtcclxuXHJcbiAgICB9XHJcbn07IiwidmFyIGxpc3RlbmluZ1RvVG91Y2hFdmVudHM7XHJcblxyXG5UaW55LklucHV0ID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50ID0gZ2FtZS5pbnB1dFZpZXc7XHJcblxyXG4gICAgdGhpcy5ib3VuZHMgPSB7eDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMH07XHJcbiAgICB0aGlzLmNhbmRpZGF0ZXMgPSBbXTtcclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG5cclxuICAgIHRoaXMubGFzdE1vdmUgPSBudWxsO1xyXG4gICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmRvd25IYW5kbGVyID0gdGhpcy5kb3duSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IHRoaXMubW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBIYW5kbGVyID0gdGhpcy51cEhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIC8vIHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLnVwSGFuZGxlcik7XHJcblxyXG4gICAgLy8gdmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcclxuXHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbih0aGlzKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRpbnkuSW5wdXQuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIFRpbnkuSW5wdXQuc3lzdGVtc1tpXS5pbml0LmNhbGwodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVCb3VuZHMoKTtcclxufTtcclxuXHJcblRpbnkuSW5wdXQucHJvdG90eXBlID0ge1xyXG5cclxuXHJcbiAgICBhZGQ6IGZ1bmN0aW9uKG9iamVjdCwgb3B0aW9ucykge1xyXG4gICAgICAgIG9iamVjdC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLnN5c3RlbSA9IHRoaXM7XHJcblxyXG4gICAgICAgIG9iamVjdC5pbnB1dCA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKG9iamVjdC5pbnB1dClcclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gob2JqZWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihvYmplY3QpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3QuaW5kZXhPZihvYmplY3QpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlZCA9IHRoaXMubGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIHJlbW92ZWQuaW5wdXQgPSBudWxsO1xyXG4gICAgICAgICAgICByZW1vdmVkLmlucHV0RW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0SGFuZGxlcjogZnVuY3Rpb24obmFtZSwgZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSlcclxuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5nZXRDb29yZHMoZXZlbnQpO1xyXG5cclxuICAgICAgICBpZiAoY29vcmRzICE9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUgIT0gXCJtb3ZlXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuZGlkYXRlcy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5JbnB1dC5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGlueS5JbnB1dC5zeXN0ZW1zW2ldLnByZUhhbmRsZS5jYWxsKHRoaXMsIGNvb3Jkcy54LCBjb29yZHMueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzR29vZCwgb2JqO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhpcy5saXN0Lmxlbmd0aDsgdCsrKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmxpc3RbdF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmlucHV0RW5hYmxlZCB8fCAhb2JqLnBhcmVudCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaW5wdXQuY2hlY2tCb3VuZHMpIGlzR29vZCA9IG9iai5pbnB1dC5jaGVja0JvdW5kcy5jYWxsKHRoaXMsIG9iaiwgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlzR29vZCA9IFRpbnkuSW5wdXQuY2hlY2tCb3VuZHMuY2FsbCh0aGlzLCBvYmosIGNvb3Jkcy54LCBjb29yZHMueSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0dvb2QpIHRoaXMuY2FuZGlkYXRlcy5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgaSA9IHRoaXMuY2FuZGlkYXRlcy5sZW5ndGhcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jYW5kaWRhdGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMuY2FuZGlkYXRlc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dFtcImxhc3RfXCIgKyBuYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJ1cFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gb2JqLmlucHV0W1wibGFzdF9kb3duXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2ludCAmJiBUaW55Lk1hdGguZGlzdGFuY2UocG9pbnQueCwgcG9pbnQueSwgY29vcmRzLngsIGNvb3Jkcy55KSA8IDMwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQoXCJjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaW5wdXQudHJhbnNwYXJlbnQpIFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIG9iaiA9IHRoaXMuY2FuZGlkYXRlc1tpIC0gMV1cclxuICAgICAgICAgICAgICAgIC8vICAgICBvYmouaW5wdXRbXCJsYXN0X1wiICsgbmFtZV0gPSB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fVxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICBvYmouaW5wdXQuZW1pdChuYW1lLCB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKG5hbWUgPT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZhciBwb2ludCA9IG9iai5pbnB1dFtcImxhc3RfZG93blwiXVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAocG9pbnQgJiYgVGlueS5NYXRoLmRpc3RhbmNlKHBvaW50LngsIHBvaW50LnksIGNvb3Jkcy54LCBjb29yZHMueSkgPCAzMClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KFwiY2xpY2tcIiwge3g6IGNvb3Jkcy54LCB5OiBjb29yZHMueX0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVtaXQobmFtZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdmVIYW5kbGVyOiBmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxhc3RNb3ZlID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJtb3ZlXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBIYW5kbGVyOiBmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwidXBcIiwgdGhpcy5sYXN0TW92ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRvd25IYW5kbGVyOiBmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzRG93biA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZSA9IGV2ZW50O1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwiZG93blwiLCBldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJjbGlja1wiLCBldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldENvb3JkczogZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvb3JkcyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5jbGllbnRYICYmIGV2ZW50LmNsaWVudFkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gTW91c2UgZXZlbnRcclxuICAgICAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzICYmIGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCB8fCBjb29yZHMgPT09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgIHg6IChjb29yZHMueCAtIHRoaXMuYm91bmRzLngpLFxyXG4gICAgICAgICAgICB5OiAoY29vcmRzLnkgLSB0aGlzLmJvdW5kcy55KSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gY29vcmRzO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVCb3VuZHM6IGZ1bmN0aW9uKCkgXHJcbiAgICB7XHJcbiAgICAgICAgYm91bmRzID0gdGhpcy5ib3VuZHM7XHJcblxyXG4gICAgICAgIHZhciBjbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBib3VuZHMueCA9IGNsaWVudFJlY3QubGVmdDtcclxuICAgICAgICBib3VuZHMueSA9IGNsaWVudFJlY3QudG9wO1xyXG4gICAgICAgIGJvdW5kcy53aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XHJcbiAgICAgICAgYm91bmRzLmhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy51cEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG5cclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy51cEhhbmRsZXIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5JbnB1dC5jaGVja0JvdW5kcyA9IGZ1bmN0aW9uKG9iaiwgeCwgeSlcclxue1xyXG4gICAgaWYgKG9iai53b3JsZFZpc2libGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKG9iai5nZXRCb3VuZHMoKS5jb250YWlucyh4LCB5KSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKG9iai5jaGlsZHJlbiAmJiBvYmouY2hpbGRyZW4ubGVuZ3RoID4gMClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IG9iai5jaGlsZHJlbi5sZW5ndGg7IHQrKykgXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBfY2hlY2tPbkFjdGl2ZU9iamVjdHMob2JqLmNoaWxkcmVuW3RdLCB4LCB5KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcblRpbnkuSW5wdXQuc3lzdGVtcyA9IFtdO1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcImlucHV0XCIsIFRpbnkuSW5wdXQpOyIsIlxyXG5UaW55LkNhY2hlID0ge1xyXG4gICAgaW1hZ2U6IHt9LFxyXG4gICAgdGV4dHVyZToge31cclxufTtcclxuXHJcblRpbnkuTG9hZGVyID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgZ2FtZS5jYWNoZSA9IFRpbnkuQ2FjaGU7XHJcblxyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIucHJvdG90eXBlID0ge1xyXG5cclxuICAgIGNsZWFyQ2FjaGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmb3IgKHZhciB5IGluIFRpbnkuQ2FjaGUudGV4dHVyZSkgVGlueS5DYWNoZS50ZXh0dXJlW3ldLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LkNhY2hlKSBUaW55LkNhY2hlW3ldID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIGFsbDogZnVuY3Rpb24oYXJyYXkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5saXN0LmNvbmNhdChhcnJheSk7IFxyXG4gICAgfSxcclxuXHJcbiAgICBpbWFnZTogZnVuY3Rpb24oa2V5LCBzb3VyY2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzcHJpdGVzaGVldDogZnVuY3Rpb24oa2V5LCBzb3VyY2UsIGFyZ18xLCBhcmdfMiwgdG90YWxGcmFtZXMsIGR1cmF0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZXMgPSB7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgdHlwZTogXCJzcHJpdGVzaGVldFwiXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdfMSA9PSBcIm51bWJlclwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzLndpZHRoID0gYXJnXzE7XHJcbiAgICAgICAgICAgIHJlcy5oZWlnaHQgPSBhcmdfMjtcclxuICAgICAgICAgICAgcmVzLnRvdGFsID0gdG90YWxGcmFtZXM7XHJcbiAgICAgICAgICAgIHJlcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdfMS5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzLmRhdGEgPSBhcmdfMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHJlcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGF0bGFzOiBmdW5jdGlvbihrZXksIHNvdXJjZSwgYXRsYXNEYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBkYXRhOiBhdGxhc0RhdGEsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiYXRsYXNcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24oY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGdhbWUgPSB0aGlzLmdhbWU7XHJcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLmxpc3Q7XHJcblxyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChnYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZE5leHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gdmFyIGRvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gbGlzdC5zaGlmdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlciA9IFRpbnkuTG9hZGVyW3Jlc291cmNlLnR5cGVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvYWRlcikge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVyKHJlc291cmNlLCBsb2FkZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2Fubm90IGZpbmQgbG9hZGVyIGZvciBcIiArIHJlc291cmNlLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRlZChyZXNvdXJjZSwgZGF0YSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggIT0gMCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxvYWROZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChnYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9hZE5leHQoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuTG9hZGVyLmF0bGFzID0gZnVuY3Rpb24ocmVzb3VyY2UsIGNiKVxyXG57XHJcbiAgICB2YXIga2V5ID0gcmVzb3VyY2Uua2V5O1xyXG5cclxuICAgIFRpbnkuTG9hZGVyLmltYWdlKHJlc291cmNlLCBmdW5jdGlvbihyZXNvdXJjZSwgaW1hZ2UpIHtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc291cmNlLmRhdGEubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdXVpZCA9IGtleSArIFwiLlwiICsgcmVzb3VyY2UuZGF0YVtpXS5uYW1lO1xyXG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoaW1hZ2UsIHJlc291cmNlLmRhdGFbaV0pO1xyXG4gICAgICAgICAgICB0ZXh0dXJlLmtleSA9IGtleTtcclxuXHJcbiAgICAgICAgICAgIFRpbnkuQ2FjaGUudGV4dHVyZVt1dWlkXSA9IHRleHR1cmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYigpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblRpbnkuTG9hZGVyLnNwcml0ZXNoZWV0ID0gZnVuY3Rpb24ocmVzb3VyY2UsIGNiKVxyXG57XHJcbiAgICB2YXIga2V5ID0gcmVzb3VyY2Uua2V5O1xyXG5cclxuICAgIFRpbnkuTG9hZGVyLmltYWdlKHJlc291cmNlLCBmdW5jdGlvbihyZXNvdXJjZSwgaW1hZ2UpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgbGFzdEZyYW1lLCB1dWlkLCB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAocmVzb3VyY2UuZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyYW1lRGF0YSA9IHJlc291cmNlLmRhdGE7XHJcbiAgICAgICAgICAgIGxhc3RGcmFtZSA9IChmcmFtZURhdGEubGVuZ3RoIC0gMSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBsYXN0RnJhbWU7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdXVpZCA9IGtleSArIFwiLlwiICsgaTtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLngpLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS53aWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS5oZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBmcmFtZURhdGFbaV0uZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJhbWVXaWR0aCA9IHJlc291cmNlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgZnJhbWVIZWlnaHQgPSByZXNvdXJjZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZyYW1lV2lkdGgpIGZyYW1lV2lkdGggPSBNYXRoLmZsb29yKHdpZHRoIC8gKHJlc291cmNlLmNvbHMgfHwgMSkpO1xyXG4gICAgICAgICAgICBpZiAoIWZyYW1lSGVpZ2h0KSBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gKHJlc291cmNlLnJvd3MgfHwgMSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbHMgPSBNYXRoLmZsb29yKHdpZHRoIC8gZnJhbWVXaWR0aCk7XHJcbiAgICAgICAgICAgIHZhciByb3dzID0gTWF0aC5mbG9vcihoZWlnaHQgLyBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG90YWwgPSBjb2xzICogcm93cztcclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbCA9PT0gMCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UudG90YWwpIHRvdGFsID0gTWF0aC5taW4odG90YWwsIHJlc291cmNlLnRvdGFsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gMDtcclxuICAgICAgICAgICAgdmFyIHkgPSAwO1xyXG4gICAgICAgICAgICBsYXN0RnJhbWUgPSB0b3RhbCAtIDE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHV1aWQgPSBrZXkgKyBcIi5cIiArIGk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogZnJhbWVXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGZyYW1lSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiByZXNvdXJjZS5kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmtleSA9IGtleTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUubGFzdEZyYW1lID0gbGFzdEZyYW1lO1xyXG4gICAgICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuXHJcbiAgICAgICAgICAgICAgICB4ICs9IGZyYW1lV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHggKyBmcmFtZVdpZHRoID4gd2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgeSArPSBmcmFtZUhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2IoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuVGlueS5Mb2FkZXIuaW1hZ2UgPSBmdW5jdGlvbihyZXNvdXJjZSwgY2IpIFxyXG57XHJcbiAgICAvLyBpZiAoVGlueS5DYWNoZVtcImltYWdlXCJdW3Jlc291cmNlLmtleV0pIHJldHVybiBjYihyZXNvdXJjZSwgVGlueS5DYWNoZVtcImltYWdlXCJdW3Jlc291cmNlLmtleV0pO1xyXG5cclxuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBUaW55LkNhY2hlLmltYWdlW3Jlc291cmNlLmtleV0gPSBpbWFnZTtcclxuICAgICAgICBcclxuICAgICAgICBjYihyZXNvdXJjZSwgaW1hZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbigpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgY2IocmVzb3VyY2UsIGltYWdlKTtcclxuICAgIC8vIH0pXHJcblxyXG4gICAgaW1hZ2Uuc3JjID0gcmVzb3VyY2Uuc3JjO1xyXG59XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwibG9hZFwiLCBUaW55LkxvYWRlcik7IiwidmFyIF9pc1NldFRpbWVPdXQsIF9vbkxvb3AsIF90aW1lT3V0SUQsIF9wcmV2VGltZSwgX2xhc3RUaW1lO1xyXG5cclxudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG59XHJcblxyXG5pZiAoc2VsZi5wZXJmb3JtYW5jZSAhPT0gdW5kZWZpbmVkICYmIHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG5vdyA9IHNlbGYucGVyZm9ybWFuY2Uubm93LmJpbmQoc2VsZi5wZXJmb3JtYW5jZSk7XHJcbn0gZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gRGF0ZS5ub3c7XHJcbn1cclxuXHJcblRpbnkuUkFGID0gZnVuY3Rpb24gKGdhbWUsIGZvcmNlU2V0VGltZU91dClcclxue1xyXG5cclxuICAgIGlmIChmb3JjZVNldFRpbWVPdXQgPT09IHVuZGVmaW5lZCkgeyBmb3JjZVNldFRpbWVPdXQgPSBmYWxzZTsgfVxyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuXHJcbiAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5mb3JjZVNldFRpbWVPdXQgPSBmb3JjZVNldFRpbWVPdXQ7XHJcblxyXG4gICAgdmFyIHZlbmRvcnMgPSBbXHJcbiAgICAgICAgJ21zJyxcclxuICAgICAgICAnbW96JyxcclxuICAgICAgICAnd2Via2l0JyxcclxuICAgICAgICAnbydcclxuICAgIF07XHJcblxyXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgeCsrKVxyXG4gICAge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIF9vbkxvb3AgPSBudWxsO1xyXG4gICAgX3RpbWVPdXRJRCA9IG51bGw7XHJcblxyXG4gICAgX3ByZXZUaW1lID0gMFxyXG4gICAgX2xhc3RUaW1lID0gMFxyXG59O1xyXG5cclxuVGlueS5SQUYucHJvdG90eXBlID0ge1xyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG5cclxuICAgICAgICBfcHJldlRpbWUgPSBub3coKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgdGhpcy5mb3JjZVNldFRpbWVPdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlU2V0VGltZW91dCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBfb25Mb29wID0gZnVuY3Rpb24gKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlUkFGKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfb25Mb29wKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVJBRjogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuX3VwZGF0ZShNYXRoLmZsb29yKF9sYXN0VGltZSksIF9sYXN0VGltZSAtIF9wcmV2VGltZSk7XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfb25Mb29wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9wcmV2VGltZSA9IF9sYXN0VGltZVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlU2V0VGltZW91dDogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKVxyXG4gICAgICAgIGlmICh0aGlzLmlzUnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5fdXBkYXRlKE1hdGguZmxvb3IoX2xhc3RUaW1lKSwgX2xhc3RUaW1lIC0gX3ByZXZUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cuc2V0VGltZW91dChfb25Mb29wLCBUaW55LlJBRi50aW1lVG9DYWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX3ByZXZUaW1lID0gX2xhc3RUaW1lXHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2V0OiBmdW5jdGlvbigpIFxyXG4gICAge1xyXG4gICAgICAgIF9wcmV2VGltZSA9IG5vdygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wOiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChfaXNTZXRUaW1lT3V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aW1lT3V0SUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoX3RpbWVPdXRJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5SQUYudGltZVRvQ2FsbCA9IDE1OyIsInZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbnZhciBUaW1lciA9IGZ1bmN0aW9uKGF1dG9TdGFydCwgYXV0b1JlbW92ZSwgZ2FtZSwgY2IsIGN0eCwgZGVsYXksIGxvb3AsIG4sIG9uY29tcGxldGUpXHJcbntcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmNiID0gY2IgfHwgbm9vcDtcclxuICAgIHRoaXMuY3R4ID0gY3R4IHx8IHRoaXM7XHJcbiAgICB0aGlzLmRlbGF5ID0gKGRlbGF5ID09IHVuZGVmaW5lZCA/IDEwMDAgOiBkZWxheSk7XHJcbiAgICB0aGlzLmxvb3AgPSBsb29wO1xyXG4gICAgdGhpcy5jb3VudCA9IG4gfHwgMDtcclxuICAgIHRoaXMucmVwZWF0ID0gKHRoaXMuY291bnQgPiAwKTtcclxuICAgIHRoaXMucnVubmluZyA9ICEhYXV0b1N0YXJ0O1xyXG4gICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IGF1dG9SZW1vdmU7XHJcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbmNvbXBsZXRlIHx8IG5vb3A7XHJcbn1cclxuXHJcblRpbWVyLnByb3RvdHlwZSA9IHtcclxuICAgIHN0YXJ0OiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBwYXVzZTogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIHN0b3A6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9sYXN0RnJhbWUgPSAwO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oZGVsdGFUaW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0RnJhbWUgKz0gZGVsdGFUaW1lXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0RnJhbWUgPj0gdGhpcy5kZWxheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMuY3R4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5sb29wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5UaW55LlRpbWVyID0gVGltZXI7XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvciA9IGZ1bmN0aW9uKGdhbWUpXHJcbntcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIHRoaXMuYXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvci5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbihkZWx0YSkgXHJcbiAgICB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0udXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQWxsOiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih0bSlcclxuICAgIHtcclxuICAgICAgICB2YXIgaW5kZXhPZiA9IHRoaXMubGlzdC5pbmRleE9mKHRtKTtcclxuICAgICAgICBpZiAoaW5kZXhPZiA+IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdG0uc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4T2YsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZGQ6IGZ1bmN0aW9uKGRlbGF5LCBjYiwgY3R4LCBhdXRvc3RhcnQsIGF1dG9yZW1vdmUpXHJcbiAgICB7XHJcbiAgICAgICAgYXV0b3N0YXJ0ID0gYXV0b3N0YXJ0ICE9IHVuZGVmaW5lZCA/IGF1dG9zdGFydCA6IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIGF1dG9yZW1vdmUgPSBhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmU7XHJcblxyXG4gICAgICAgIHZhciB0aW1lciA9IG5ldyBUaW1lcihhdXRvc3RhcnQsIGF1dG9yZW1vdmUsIHRoaXMuZ2FtZSwgY2IsIGN0eCwgZGVsYXkpO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgbG9vcDogZnVuY3Rpb24oZGVsYXksIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSlcclxuICAgIHtcclxuICAgICAgICBhdXRvc3RhcnQgPSBhdXRvc3RhcnQgIT0gdW5kZWZpbmVkID8gYXV0b3N0YXJ0IDogdGhpcy5hdXRvU3RhcnQ7XHJcbiAgICAgICAgYXV0b3JlbW92ZSA9IGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZTtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgdGhpcy5nYW1lLCBjYiwgY3R4LCBkZWxheSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2godGltZXIpO1xyXG4gICAgICAgIHJldHVybiB0aW1lcjtcclxuICAgIH0sXHJcbiAgICByZXBlYXQ6IGZ1bmN0aW9uKGRlbGF5LCBuLCBjYiwgY3R4LCBhdXRvc3RhcnQsIGF1dG9yZW1vdmUsIGNvbXBsZXRlKVxyXG4gICAge1xyXG4gICAgICAgIGF1dG9zdGFydCA9IGF1dG9zdGFydCAhPSB1bmRlZmluZWQgPyBhdXRvc3RhcnQgOiB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICBhdXRvcmVtb3ZlID0gYXV0b3JlbW92ZSAhPSB1bmRlZmluZWQgPyBhdXRvcmVtb3ZlIDogdGhpcy5hdXRvUmVtb3ZlO1xyXG5cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlLCB0aGlzLmdhbWUsIGNiLCBjdHgsIGRlbGF5LCBmYWxzZSwgbiwgY29tcGxldGUpO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGwoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJ0aW1lclwiLCBUaW55LlRpbWVyQ3JlYXRvcik7IiwiLyoqXHJcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxyXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcclxuICovXHJcblxyXG5cclxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLl90d2VlbnMgPSB7fTtcclxuXHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG59O1xyXG5cclxuX0dyb3VwLnByb3RvdHlwZSA9IHtcclxuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKS5tYXAoZnVuY3Rpb24gKHR3ZWVuSWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3R3ZWVuc1t0d2VlbklkXTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xyXG5cclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG5cdFx0dmFyIGlkID0gdHdlZW4uZ2V0SWQoKTtcclxuXHRcdHRoaXMuX3R3ZWVuc1tpZF0gPSB0d2VlbjtcclxuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW2lkXSA9IHR3ZWVuO1xyXG5cclxuXHR9LFxyXG5cclxuXHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG5cdFx0dmFyIGlkID0gdHdlZW4uZ2V0SWQoKTtcclxuXHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbaWRdO1xyXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW2lkXTtcclxuXHJcblx0fSxcclxuXHJcblx0dXBkYXRlOiBmdW5jdGlvbiAoZGVsdGEsIHByZXNlcnZlKSB7XHJcblxyXG5cdFx0dmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcclxuXHJcblx0XHRpZiAodHdlZW5JZHMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyB0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xyXG5cclxuXHRcdC8vIFR3ZWVucyBhcmUgdXBkYXRlZCBpbiBcImJhdGNoZXNcIi4gSWYgeW91IGFkZCBhIG5ldyB0d2VlbiBkdXJpbmcgYW5cclxuXHRcdC8vIHVwZGF0ZSwgdGhlbiB0aGUgbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cclxuXHRcdC8vIElmIHlvdSByZW1vdmUgYSB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCBpdCBtYXkgb3IgbWF5IG5vdCBiZSB1cGRhdGVkLlxyXG5cdFx0Ly8gSG93ZXZlciwgaWYgdGhlIHJlbW92ZWQgdHdlZW4gd2FzIGFkZGVkIGR1cmluZyB0aGUgY3VycmVudCBiYXRjaCxcclxuXHRcdC8vIHRoZW4gaXQgd2lsbCBub3QgYmUgdXBkYXRlZC5cclxuXHRcdHdoaWxlICh0d2Vlbklkcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdHZhciB0d2VlbiA9IHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XHJcblxyXG5cdFx0XHRcdGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUoZGVsdGEpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmICghcHJlc2VydmUpIHtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fVxyXG59O1xyXG5cclxudmFyIFRXRUVOID0gbmV3IF9Hcm91cCgpO1xyXG5cclxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XHJcblRXRUVOLl9uZXh0SWQgPSAwO1xyXG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcclxufTtcclxuXHJcblxyXG4vLyAvLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxyXG4vLyAvLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXHJcbi8vIGlmICh0eXBlb2YgKHNlbGYpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmhydGltZSkge1xyXG4vLyBcdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcclxuLy8gXHRcdHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcclxuXHJcbi8vIFx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxyXG4vLyBcdFx0cmV0dXJuIHRpbWVbMF0gKiAxMDAwICsgdGltZVsxXSAvIDEwMDAwMDA7XHJcbi8vIFx0fTtcclxuLy8gfVxyXG4vLyAvLyBJbiBhIGJyb3dzZXIsIHVzZSBzZWxmLnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXHJcbi8vIGVsc2UgaWYgKHR5cGVvZiAoc2VsZikgIT09ICd1bmRlZmluZWQnICYmXHJcbi8vICAgICAgICAgIHNlbGYucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxyXG4vLyBcdFx0IHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuLy8gXHQvLyBUaGlzIG11c3QgYmUgYm91bmQsIGJlY2F1c2UgZGlyZWN0bHkgYXNzaWduaW5nIHRoaXMgZnVuY3Rpb25cclxuLy8gXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXHJcbi8vIFx0VFdFRU4ubm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxuLy8gfVxyXG4vLyAvLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG4vLyBlbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcbi8vIFx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XHJcbi8vIH1cclxuLy8gLy8gT3RoZXJ3aXNlLCB1c2UgJ25ldyBEYXRlKCkuZ2V0VGltZSgpJy5cclxuLy8gZWxzZSB7XHJcbi8vIFx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xyXG4vLyBcdFx0cmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4vLyBcdH07XHJcbi8vIH1cclxuXHJcblxyXG5UaW55LlR3ZWVuID0gZnVuY3Rpb24gKG9iamVjdCwgZ3JvdXApIHtcclxuXHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cdC8vIHRoaXMuX3BhdXNlU3RhcnQgPSBudWxsO1xyXG5cdHRoaXMuX29iamVjdCA9IG9iamVjdDtcclxuXHR0aGlzLl92YWx1ZXNTdGFydCA9IHt9O1xyXG5cdHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xyXG5cdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XHJcblx0dGhpcy5fZHVyYXRpb24gPSAxMDAwO1xyXG5cdHRoaXMuX3JlcGVhdCA9IDA7XHJcblx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xyXG5cdHRoaXMuX3lveW8gPSBmYWxzZTtcclxuXHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHR0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xyXG5cdHRoaXMuX2RlbGF5VGltZSA9IDA7XHJcblx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcclxuXHR0aGlzLl90aW1lID0gMDtcclxuXHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IFRpbnkuRWFzaW5nLkxpbmVhci5Ob25lO1xyXG5cdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRpbnkuSW50ZXJwb2xhdGlvbi5MaW5lYXI7XHJcblx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IFtdO1xyXG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XHJcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xyXG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9ncm91cCA9IGdyb3VwIHx8IFRXRUVOO1xyXG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XHJcblxyXG59O1xyXG5cclxuVGlueS5Ud2Vlbi5wcm90b3R5cGUgPSB7XHJcblx0Z2V0SWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9pZDtcclxuXHR9LFxyXG5cclxuXHRpc1BsYXlpbmc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XHJcblx0fSxcclxuXHJcblx0aXNQYXVzZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9pc1BhdXNlZDtcclxuXHR9LFxyXG5cclxuXHR0bzogZnVuY3Rpb24gKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XHJcblxyXG5cdFx0dGhpcy5fdmFsdWVzRW5kID0gT2JqZWN0LmNyZWF0ZShwcm9wZXJ0aWVzKTtcclxuXHJcblx0XHRpZiAoZHVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRkdXJhdGlvbjogZnVuY3Rpb24gZHVyYXRpb24oZCkge1xyXG5cdFx0dGhpcy5fZHVyYXRpb24gPSBkO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c3RhcnQ6IGZ1bmN0aW9uIChyZXNldCkge1xyXG5cclxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcblx0XHR0aGlzLl90aW1lID0gMDtcclxuXHJcblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX2RlbGF5VGltZTtcclxuXHJcblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIGFuIEFycmF5IHdhcyBwcm92aWRlZCBhcyBwcm9wZXJ0eSB2YWx1ZVxyXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcclxuXHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElmIGB0bygpYCBzcGVjaWZpZXMgYSBwcm9wZXJ0eSB0aGF0IGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3QsXHJcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxyXG5cdFx0XHRpZiAodGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNhdmUgdGhlIHN0YXJ0aW5nIHZhbHVlLCBvbmx5IG9uY2UgLSBpZiByZXNldCBzZXQgdG8gZmFsc2UuXHJcblx0XHRcdGlmIChyZXNldCA9PSB0cnVlIHx8IHR5cGVvZih0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0pID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX29iamVjdFtwcm9wZXJ0eV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSAqPSAxLjA7IC8vIEVuc3VyZXMgd2UncmUgdXNpbmcgbnVtYmVycywgbm90IHN0cmluZ3NcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzdG9wOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZ3JvdXAucmVtb3ZlKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuX29uU3RvcENhbGxiYWNrICE9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGVuZDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHRoaXMudXBkYXRlKEluZmluaXR5LCBJbmZpbml0eSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0cGF1c2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGlmICh0aGlzLl9pc1BhdXNlZCB8fCAhdGhpcy5faXNQbGF5aW5nKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcclxuXHJcblx0XHQvLyB0aGlzLl9wYXVzZVN0YXJ0ID0gdGltZSA9PT0gdW5kZWZpbmVkID8gVFdFRU4ubm93KCkgOiB0aW1lO1xyXG5cclxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0cmVzdW1lOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2lzUGF1c2VkIHx8ICF0aGlzLl9pc1BsYXlpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcblx0XHQvLyB0aGlzLl9zdGFydFRpbWUgKz0gKHRpbWUgPT09IHVuZGVmaW5lZCA/IFRXRUVOLm5vdygpIDogdGltZSlcclxuXHRcdC8vIFx0LSB0aGlzLl9wYXVzZVN0YXJ0O1xyXG5cclxuXHRcdC8vIHRoaXMuX3BhdXNlU3RhcnQgPSAwO1xyXG5cclxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0c3RvcENoYWluZWRUd2VlbnM6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XHJcblx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRncm91cDogZnVuY3Rpb24gKGdyb3VwKSB7XHJcblx0XHR0aGlzLl9ncm91cCA9IGdyb3VwO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0ZGVsYXk6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuXHJcblx0XHR0aGlzLl9kZWxheVRpbWUgPSBhbW91bnQ7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0cmVwZWF0OiBmdW5jdGlvbiAodGltZXMpIHtcclxuXHJcblx0XHR0aGlzLl9yZXBlYXQgPSB0aW1lcztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRyZXBlYXREZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xyXG5cclxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHR5b3lvOiBmdW5jdGlvbiAoeW95bykge1xyXG5cclxuXHRcdHRoaXMuX3lveW8gPSB5b3lvO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGVhc2luZzogZnVuY3Rpb24gKGVhc2luZ0Z1bmN0aW9uKSB7XHJcblxyXG5cdFx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXNpbmdGdW5jdGlvbjtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiAoaW50ZXJwb2xhdGlvbkZ1bmN0aW9uKSB7XHJcblxyXG5cdFx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gaW50ZXJwb2xhdGlvbkZ1bmN0aW9uO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGNoYWluOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvblN0YXJ0OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvblVwZGF0ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uUmVwZWF0OiBmdW5jdGlvbiBvblJlcGVhdChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvblN0b3A6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uU3RvcENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0dXBkYXRlOiBmdW5jdGlvbiAoZGVsdGEpIHtcclxuXHJcblx0XHR2YXIgcHJvcGVydHk7XHJcblx0XHR2YXIgZWxhcHNlZDtcclxuXHRcdHZhciB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl90aW1lICs9IGRlbHRhO1xyXG5cclxuXHRcdGlmICh0aGlzLl90aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9PT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsYXBzZWQgPSAodGhpcy5fdGltZSAtIHRoaXMuX3N0YXJ0VGltZSkgLyB0aGlzLl9kdXJhdGlvbjtcclxuXHRcdGVsYXBzZWQgPSAodGhpcy5fZHVyYXRpb24gPT09IDAgfHwgZWxhcHNlZCA+IDEpID8gMSA6IGVsYXBzZWQ7XHJcblxyXG5cdFx0dmFsdWUgPSB0aGlzLl9lYXNpbmdGdW5jdGlvbihlbGFwc2VkKTtcclxuXHJcblx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3RcclxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBzdGFydCA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xyXG5cdFx0XHR2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcclxuXHJcblx0XHRcdGlmIChlbmQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gUGFyc2VzIHJlbGF0aXZlIGVuZCB2YWx1ZXMgd2l0aCBzdGFydCBhcyBiYXNlIChlLmcuOiArMTAsIC0zKVxyXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGVuZC5jaGFyQXQoMCkgPT09ICcrJyB8fCBlbmQuY2hhckF0KDApID09PSAnLScpIHtcclxuXHRcdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlbmQgPSBwYXJzZUZsb2F0KGVuZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cclxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QsIGVsYXBzZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlbGFwc2VkID09PSAxKSB7XHJcblxyXG5cdFx0XHR0aGlzLl90aW1lID0gMDtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XHJcblxyXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XHJcblx0XHRcdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gKyBwYXJzZUZsb2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLl95b3lvKSB7XHJcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xyXG5cdFx0XHRcdFx0dGhpcy5fcmV2ZXJzZWQgPSAhdGhpcy5fcmV2ZXJzZWQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fcmVwZWF0RGVsYXlUaW1lICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX3JlcGVhdERlbGF5VGltZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGhpcy5fZGVsYXlUaW1lO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xyXG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcclxuXHRcdFx0XHRcdC8vIGV2ZW4gaWYgdGhlIGB1cGRhdGUoKWAgbWV0aG9kIHdhcyBjYWxsZWQgd2F5IHBhc3QgdGhlIGR1cmF0aW9uIG9mIHRoZSB0d2VlblxyXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fVxyXG59O1xyXG5cclxuXHJcblRpbnkuRWFzaW5nID0ge1xyXG5cclxuXHRMaW5lYXI6IHtcclxuXHJcblx0XHROb25lOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGs7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRRdWFkcmF0aWM6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiBrICogaztcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiBrICogKDIgLSBrKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xyXG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIC0gMC41ICogKC0tayAqIChrIC0gMikgLSAxKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdEN1YmljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xyXG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0UXVhcnRpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGs7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtICgtLWsgKiBrICogayAqIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0UXVpbnRpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGsgKiBrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrICogayArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0U2ludXNvaWRhbDoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRFeHBvbmVudGlhbDoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0gMTAgKiBrKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xyXG5cdFx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoLSBNYXRoLnBvdygyLCAtIDEwICogKGsgLSAxKSkgKyAyKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdENpcmN1bGFyOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gayAqIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIE1hdGguc3FydCgxIC0gKC0tayAqIGspKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xyXG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0RWxhc3RpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIE1hdGgucG93KDIsIC0xMCAqIGspICogTWF0aC5zaW4oKGsgLSAwLjEpICogNSAqIE1hdGguUEkpICsgMTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ayAqPSAyO1xyXG5cclxuXHRcdFx0aWYgKGsgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0QmFjazoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0Qm91bmNlOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtIFRpbnkuRWFzaW5nLkJvdW5jZS5PdXQoMSAtIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPCAoMSAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgxLjUgLyAyLjc1KSkgKiBrICsgMC43NTtcclxuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmIChrIDwgMC41KSB7XHJcblx0XHRcdFx0cmV0dXJuIFRpbnkuRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBUaW55LkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59O1xyXG5cclxuVGlueS5JbnRlcnBvbGF0aW9uID0ge1xyXG5cclxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgZiA9IG0gKiBrO1xyXG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG5cdFx0dmFyIGZuID0gVGlueS5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcclxuXHJcblx0XHRpZiAoayA8IDApIHtcclxuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChrID4gMSkge1xyXG5cdFx0XHRyZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdEJlemllcjogZnVuY3Rpb24gKHYsIGspIHtcclxuXHJcblx0XHR2YXIgYiA9IDA7XHJcblx0XHR2YXIgbiA9IHYubGVuZ3RoIC0gMTtcclxuXHRcdHZhciBwdyA9IE1hdGgucG93O1xyXG5cdFx0dmFyIGJuID0gVGlueS5JbnRlcnBvbGF0aW9uLlV0aWxzLkJlcm5zdGVpbjtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcclxuXHRcdFx0YiArPSBwdygxIC0gaywgbiAtIGkpICogcHcoaywgaSkgKiB2W2ldICogYm4obiwgaSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGI7XHJcblxyXG5cdH0sXHJcblxyXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgZiA9IG0gKiBrO1xyXG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG5cdFx0dmFyIGZuID0gVGlueS5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XHJcblxyXG5cdFx0aWYgKHZbMF0gPT09IHZbbV0pIHtcclxuXHJcblx0XHRcdGlmIChrIDwgMCkge1xyXG5cdFx0XHRcdGkgPSBNYXRoLmZsb29yKGYgPSBtICogKDEgKyBrKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmbih2WyhpIC0gMSArIG0pICUgbV0sIHZbaV0sIHZbKGkgKyAxKSAlIG1dLCB2WyhpICsgMikgJSBtXSwgZiAtIGkpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiAoayA8IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPiAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIHZbbV0gLSAoZm4odlttXSwgdlttXSwgdlttIC0gMV0sIHZbbSAtIDFdLCBmIC0gbSkgLSB2W21dKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZuKHZbaSA/IGkgLSAxIDogMF0sIHZbaV0sIHZbbSA8IGkgKyAxID8gbSA6IGkgKyAxXSwgdlttIDwgaSArIDIgPyBtIDogaSArIDJdLCBmIC0gaSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRVdGlsczoge1xyXG5cclxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xyXG5cclxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcclxuXHJcblx0XHRcdHZhciBmYyA9IFRpbnkuSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XHJcblxyXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHZhciBhID0gWzFdO1xyXG5cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChuKSB7XHJcblxyXG5cdFx0XHRcdHZhciBzID0gMTtcclxuXHJcblx0XHRcdFx0aWYgKGFbbl0pIHtcclxuXHRcdFx0XHRcdHJldHVybiBhW25dO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IG47IGkgPiAxOyBpLS0pIHtcclxuXHRcdFx0XHRcdHMgKj0gaTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGFbbl0gPSBzO1xyXG5cdFx0XHRcdHJldHVybiBzO1xyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHR9KSgpLFxyXG5cclxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xyXG5cclxuXHRcdFx0dmFyIHYwID0gKHAyIC0gcDApICogMC41O1xyXG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XHJcblx0XHRcdHZhciB0MiA9IHQgKiB0O1xyXG5cdFx0XHR2YXIgdDMgPSB0ICogdDI7XHJcblxyXG5cdFx0XHRyZXR1cm4gKDIgKiBwMSAtIDIgKiBwMiArIHYwICsgdjEpICogdDMgKyAoLSAzICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufTtcclxuXHJcbndpbmRvdy5UV0VFTiA9IFRXRUVOXHJcblxyXG5UaW55LlR3ZWVuTWFuYWdlciA9IGZ1bmN0aW9uKGdhbWUpXHJcbntcclxuXHR0aGlzLmdhbWUgPSBnYW1lO1xyXG5cdHRoaXMuYnVmZmVyTGlzdCA9IFtdO1xyXG5cdHRoaXMuZ3JvdXAgPSBuZXcgX0dyb3VwKCk7XHJcbn07XHJcblxyXG5UaW55LlR3ZWVuTWFuYWdlci5wcm90b3R5cGUgPSB7XHJcblxyXG5cdHJlbW92ZTogZnVuY3Rpb24odHdlZW4pIHtcclxuXHRcdHRoaXMuZ3JvdXAucmVtb3ZlKHR3ZWVuKTtcclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uKG9iaikge1xyXG5cdFx0cmV0dXJuIG5ldyBUaW55LlR3ZWVuKG9iaiwgdGhpcy5ncm91cCk7XHJcblx0fSxcclxuXHJcblx0cGF1c2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLmJ1ZmZlckxpc3QubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzLmdyb3VwLl90d2VlbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlckxpc3QucHVzaCh0aGlzLmdyb3VwLl90d2VlbnNba10pO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwLl90d2VlbnNba10ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0fSxcclxuXHJcblx0cmVzdW1lKCkge1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5idWZmZXJMaXN0W2ldLnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5idWZmZXJMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgXHJcblx0fSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGRlbHRhKSB7XHJcbiAgICAgICAgdGhpcy5ncm91cC51cGRhdGUoZGVsdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgIFx0dGhpcy5idWZmZXJMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICBcdHRoaXMuZ3JvdXAucmVtb3ZlQWxsKCk7XHJcbiAgICBcdHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwidHdlZW5zXCIsIFRpbnkuVHdlZW5NYW5hZ2VyKTsiLCJcclxuVGlueS5SZW5kZXJUZXh0dXJlID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgcmVuZGVyZXIsIHJlc29sdXRpb24pXHJcbntcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCAxMDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAxMDA7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICByZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCAxO1xyXG5cclxuICAgIC8vIHRoaXMuZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIC8vIHRoaXMuY3JvcCA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZSA9IG5ldyBUaW55LkJhc2VUZXh0dXJlKCk7XHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZS5oYXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRoaXMud2lkdGggKiByZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHJlc29sdXRpb24pO1xyXG5cclxuICAgIFRpbnkuVGV4dHVyZS5jYWxsKHRoaXMsXHJcbiAgICAgICAgdGhpcy50ZXh0dXJlQnVmZmVyLmNhbnZhcyxcclxuICAgICAgICBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgTWF0aC5mbG9vcih0aGlzLndpZHRoICogcmVzb2x1dGlvbiksIE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiByZXNvbHV0aW9uKSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICAvLyB0aGlzLmhhc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyIHx8IFRpbnkuZGVmYXVsdFJlbmRlcmVyO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5UZXh0dXJlLnByb3RvdHlwZSk7XHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJlbmRlclRleHR1cmU7XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIHVwZGF0ZUJhc2UpXHJcbntcclxuICAgIGlmICh3aWR0aCA9PT0gdGhpcy53aWR0aCAmJiBoZWlnaHQgPT09IHRoaXMuaGVpZ2h0KXJldHVybjtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gKHdpZHRoID4gMCAmJiBoZWlnaHQgPiAwKTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMuZnJhbWUud2lkdGggPSB0aGlzLmNyb3Aud2lkdGggPSB3aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIHRoaXMuZnJhbWUuaGVpZ2h0ID0gdGhpcy5jcm9wLmhlaWdodCA9IGhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICBpZiAodXBkYXRlQmFzZSlcclxuICAgIHtcclxuICAgICAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgICAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCF0aGlzLnZhbGlkKXJldHVybjtcclxuXHJcbiAgICB0aGlzLnRleHR1cmVCdWZmZXIucmVzaXplKHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKCF0aGlzLnZhbGlkKXJldHVybjtcclxuXHJcbiAgICB0aGlzLnRleHR1cmVCdWZmZXIuY2xlYXIoKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oZGlzcGxheU9iamVjdCwgbWF0cml4LCBjbGVhcilcclxue1xyXG4gICAgaWYoIXRoaXMudmFsaWQpcmV0dXJuO1xyXG5cclxuICAgIHZhciB3dCA9IGRpc3BsYXlPYmplY3Qud29ybGRUcmFuc2Zvcm07XHJcbiAgICB3dC5pZGVudGl0eSgpO1xyXG4gICAgaWYobWF0cml4KXd0LmFwcGVuZChtYXRyaXgpO1xyXG4gICAgXHJcbiAgICAvLyBzZXRXb3JsZCBBbHBoYSB0byBlbnN1cmUgdGhhdCB0aGUgb2JqZWN0IGlzIHJlbmRlcmVyIGF0IGZ1bGwgb3BhY2l0eVxyXG4gICAgZGlzcGxheU9iamVjdC53b3JsZEFscGhhID0gMTtcclxuXHJcbiAgICAvLyBUaW1lIHRvIHVwZGF0ZSBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSBkaXNwbGF5T2JqZWN0IHdpdGggdGhlIG5ldyBtYXRyaXguLiAgICBcclxuICAgIHZhciBjaGlsZHJlbiA9IGRpc3BsYXlPYmplY3QuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yKHZhciBpID0gMCwgaiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKylcclxuICAgIHtcclxuICAgICAgICBjaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihjbGVhcil0aGlzLnRleHR1cmVCdWZmZXIuY2xlYXIoKTtcclxuXHJcbiAgICB2YXIgY29udGV4dCA9IHRoaXMudGV4dHVyZUJ1ZmZlci5jb250ZXh0O1xyXG5cclxuICAgIHZhciByZWFsUmVzb2x1dGlvbiA9IHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXJPYmplY3QoZGlzcGxheU9iamVjdCwgY29udGV4dCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uID0gcmVhbFJlc29sdXRpb247XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltYWdlLnNyYyA9IHRoaXMuZ2V0QmFzZTY0KCk7XHJcbiAgICByZXR1cm4gaW1hZ2U7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldEJhc2U2NCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FudmFzKCkudG9EYXRhVVJMKCk7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldENhbnZhcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dHVyZUJ1ZmZlci5jYW52YXM7XHJcbn07IiwiXHJcbi8vIFRpbnkuVGV4dHVyZUNhY2hlID0ge307XHJcbi8vIFRpbnkuRnJhbWVDYWNoZSA9IHt9O1xyXG5UaW55LlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yID0gMDtcclxuVGlueS5UZXh0dXJlU2lsZW50RmFpbCA9IGZhbHNlO1xyXG5cclxuVGlueS5UZXh0dXJlID0gZnVuY3Rpb24oc291cmNlLCBmcmFtZSwgY3JvcCwgdHJpbSlcclxue1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIHRoaXMuaGFzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFmcmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vRnJhbWUgPSB0cnVlO1xyXG4gICAgICAgIGZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsMCwxLDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2Ygc291cmNlID09IFwic3RyaW5nXCIpIFxyXG4gICAge1xyXG4gICAgICAgIHZhciBrZXkgPSBzb3VyY2U7XHJcblxyXG4gICAgICAgIHNvdXJjZSA9IFRpbnkuQ2FjaGUuaW1hZ2Vba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UpIHRocm93IG5ldyBFcnJvcignQ2FjaGUgRXJyb3I6IGltYWdlICcgKyBrZXkgKyAnIGRvZXNgdCBmb3VuZCBpbiBjYWNoZScpO1xyXG5cclxuICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVba2V5XSA9IHRoaXM7XHJcbiAgICBcclxuICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy50cmltID0gdHJpbTtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG5cclxuICAgIHRoaXMuY3JvcCA9IGNyb3AgfHwgbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIGlmKCh0aGlzLnNvdXJjZS5jb21wbGV0ZSB8fCB0aGlzLnNvdXJjZS5nZXRDb250ZXh0KSAmJiB0aGlzLnNvdXJjZS53aWR0aCAmJiB0aGlzLnNvdXJjZS5oZWlnaHQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vblNvdXJjZUxvYWRlZCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzY29wZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zb3VyY2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLm9uU291cmNlTG9hZGVkKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlRleHR1cmU7XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLm9uU291cmNlTG9hZGVkID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmhhc0xvYWRlZCA9IHRydWU7XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5zb3VyY2UubmF0dXJhbFdpZHRoIHx8IHRoaXMuc291cmNlLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLnNvdXJjZS5uYXR1cmFsSGVpZ2h0IHx8IHRoaXMuc291cmNlLmhlaWdodDtcclxuXHJcbiAgICBpZiAodGhpcy5ub0ZyYW1lKSB0aGlzLmZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLnNldEZyYW1lKHRoaXMuZnJhbWUpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5hZGRUb0NhY2hlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBUaW55LkNhY2hlLnRleHR1cmVba2V5XSA9IHRoaXM7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYgKHRoaXMua2V5KSB7XHJcbiAgICAgICAgZGVsZXRlIFRpbnkuQ2FjaGUudGV4dHVyZVt0aGlzLmtleV07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zb3VyY2UgPSBudWxsO1xyXG4gICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5zZXRGcmFtZSA9IGZ1bmN0aW9uKGZyYW1lKVxyXG57XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZyYW1lICYmIGZyYW1lLndpZHRoICYmIGZyYW1lLmhlaWdodCAmJiB0aGlzLnNvdXJjZSAmJiB0aGlzLmhhc0xvYWRlZDtcclxuXHJcbiAgICBpZiAoIXRoaXMudmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICAvLyB0aGlzLmhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLmNyb3AueCA9IGZyYW1lLng7XHJcbiAgICB0aGlzLmNyb3AueSA9IGZyYW1lLnk7XHJcbiAgICB0aGlzLmNyb3Aud2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgIHRoaXMuY3JvcC5oZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLnRyaW0gJiYgKGZyYW1lLnggKyBmcmFtZS53aWR0aCA+IHRoaXMud2lkdGggfHwgZnJhbWUueSArIGZyYW1lLmhlaWdodCA+IHRoaXMuaGVpZ2h0KSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIVRpbnkuVGV4dHVyZVNpbGVudEZhaWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RleHR1cmUgRXJyb3I6IGZyYW1lIGRvZXMgbm90IGZpdCBpbnNpZGUgdGhlIGJhc2UgVGV4dHVyZSBkaW1lbnNpb25zICcgKyB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHJpbSlcclxuICAgIHtcclxuICAgICAgICAvLyB0aGlzLndpZHRoID0gdGhpcy50cmltLndpZHRoO1xyXG4gICAgICAgIC8vIHRoaXMuaGVpZ2h0ID0gdGhpcy50cmltLmhlaWdodDtcclxuICAgICAgICB0aGlzLmZyYW1lLndpZHRoID0gdGhpcy50cmltLndpZHRoO1xyXG4gICAgICAgIHRoaXMuZnJhbWUuaGVpZ2h0ID0gdGhpcy50cmltLmhlaWdodDtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5mcm9tSW1hZ2UgPSBmdW5jdGlvbihrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbilcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtrZXldO1xyXG5cclxuLy8gICAgIGlmKCF0ZXh0dXJlKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKFRpbnkuQmFzZVRleHR1cmUuZnJvbUltYWdlKGtleSwgaW1hZ2VVcmwsIGNyb3Nzb3JpZ2luKSk7XHJcbi8vICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXlcclxuLy8gICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtrZXldID0gdGV4dHVyZTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5mcm9tRnJhbWUgPSBmdW5jdGlvbihmcmFtZUlkKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2ZyYW1lSWRdO1xyXG4vLyAgICAgaWYoIXRleHR1cmUpIHRocm93IG5ldyBFcnJvcignVGhlIGZyYW1lSWQgXCInICsgZnJhbWVJZCArICdcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdGV4dHVyZSBjYWNoZSAnKTtcclxuLy8gICAgIHJldHVybiB0ZXh0dXJlO1xyXG4vLyB9O1xyXG5cclxuVGlueS5UZXh0dXJlLmZyb21DYW52YXMgPSBmdW5jdGlvbihjYW52YXMpXHJcbntcclxuICAgIC8vIGlmKCFjYW52YXMuX3RpbnlJZClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBjYW52YXMuX3RpbnlJZCA9ICdfZnJvbV9jYW52YXNfJyArIFRpbnkuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3IrKztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB2YXIgdGV4dHVyZSA9IFRpbnkuQ2FjaGUudGV4dHVyZVtjYW52YXMuX3RpbnlJZF07XHJcblxyXG4gICAgLy8gaWYoIXRleHR1cmUpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoIGNhbnZhcyApO1xyXG4gICAgLy8gICAgIFRpbnkuQ2FjaGUudGV4dHVyZVtjYW52YXMuX3RpbnlJZF0gPSB0ZXh0dXJlO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgcmV0dXJuIG5ldyBUaW55LlRleHR1cmUoIGNhbnZhcyApO1xyXG59O1xyXG5cclxuLy8gVGlueS5UZXh0dXJlLmFkZFRleHR1cmVUb0NhY2hlID0gZnVuY3Rpb24odGV4dHVyZSwgaWQpXHJcbi8vIHtcclxuLy8gICAgIFRpbnkuVGV4dHVyZUNhY2hlW2lkXSA9IHRleHR1cmU7XHJcbi8vIH07XHJcblxyXG5cclxuLy8gVGlueS5UZXh0dXJlLnJlbW92ZVRleHR1cmVGcm9tQ2FjaGUgPSBmdW5jdGlvbihpZClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtpZF07XHJcbi8vICAgICBkZWxldGUgVGlueS5UZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgZGVsZXRlIFRpbnkuQmFzZVRleHR1cmVDYWNoZVtpZF07XHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTsiLCJUaW55LkNhbnZhc0J1ZmZlciA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpXHJcbntcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNCdWZmZXI7XHJcblxyXG5UaW55LkNhbnZhc0J1ZmZlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XHJcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbn07IiwiXHJcbmZ1bmN0aW9uIEV2ZW50TGlzdGVuZXJzKCkgXHJcbntcclxuICAgIHRoaXMuYSA9IFtdO1xyXG4gICAgdGhpcy5uID0gMDtcclxufVxyXG5cclxuVGlueS5FdmVudEVtaXR0ZXIgPSB7XHJcblxyXG4gICAgY2FsbDogZnVuY3Rpb24ob2JqKSBcclxuICAgIHtcclxuICAgICAgICBpZiAob2JqKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9iaiA9IG9iai5wcm90b3R5cGUgfHwgb2JqO1xyXG4gICAgICAgICAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbihvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWl4aW46IGZ1bmN0aW9uKG9iaikgXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzX2V2ZW50cyA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBwdXNoTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdXHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF0gPSBuZXcgRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdGVuZXJzLmEucHVzaChmbiwgY29udGV4dCB8fCBudWxsLCBvbmNlIHx8IGZhbHNlKTtcclxuICAgICAgICAgICAgbGlzdGVuZXJzLm4gKz0gMztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9iai5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuLCBjb250ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVzaExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmoub24gPSBwdXNoTGlzdGVuZXI7XHJcblxyXG4gICAgICAgIG9iai5vZmYgPSBmdW5jdGlvbihldmVudCwgZm4sIGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF1cclxuXHJcbiAgICAgICAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgZm5BcnJheSA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdLmE7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZuKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm5BcnJheS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCFjb250ZXh0KSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aDsgaSArPSAzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmbkFycmF5W2ldID09IGZuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aDsgaSArPSAzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmbkFycmF5W2ldID09IGZuICYmIGZuQXJyYXlbaSArIDFdID09IGNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZuQXJyYXkubGVuZ3RoID09IDApIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9iai5lbWl0ID0gZnVuY3Rpb24oZXZlbnQsIGExLCBhMiwgYTMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZuQXJyYXkgPSBsaXN0ZW5lcnMuYTtcclxuICAgICAgICAgICAgbGlzdGVuZXJzLm4gPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBmbiwgY3R4O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aCAtIGxpc3RlbmVycy5uOyBpICs9IDMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZuID0gZm5BcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGN0eCA9IGZuQXJyYXlbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpICsgMl0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gMSlcclxuICAgICAgICAgICAgICAgICAgICBmbi5jYWxsKGN0eCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZW4gPT0gMilcclxuICAgICAgICAgICAgICAgICAgICBmbi5jYWxsKGN0eCwgYTEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGVuID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgZm4uY2FsbChjdHgsIGExLCBhMik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZm4uY2FsbChjdHgsIGExLCBhMiwgYTMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIChmbkFycmF5W2kgKyAyXSlcclxuICAgICAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbkFycmF5Lmxlbmd0aCA9PSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyIsImlmICghRGF0ZS5ub3cpIHtcclxuICBEYXRlLm5vdyA9IGZ1bmN0aW9uIG5vdygpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICB9O1xyXG59XHJcblxyXG5pZiAodHlwZW9mKEZsb2F0MzJBcnJheSkgPT0gJ3VuZGVmaW5lZCcpXHJcbntcclxuXHR3aW5kb3cuRmxvYXQzMkFycmF5ID0gQXJyYXlcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKCcuL21pbmkuanMnKVxyXG5cclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL09iamVjdENyZWF0b3IuanMnKTsgLy8gMSBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvTG9hZGVyLmpzJyk7IC8vIDMgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL0lucHV0LmpzJyk7IC8vIDEgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL1RpbWVyLmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZSgnLi9zeXN0ZW1zL1R3ZWVuLmpzJyk7XHJcblxyXG5yZXF1aXJlKCcuL21hdGgvUm91bmRlZFJlY3RhbmdsZS5qcycpO1x0Ly9cclxucmVxdWlyZSgnLi9tYXRoL1BvbHlnb24uanMnKTtcdFx0XHQvL1xyXG5yZXF1aXJlKCcuL21hdGgvQ2lyY2xlLmpzJyk7XHRcdFx0Ly8gNiBLYlxyXG5cclxucmVxdWlyZSgnLi9yZW5kZXJlcnMvR3JhcGhpY3NSZW5kZXJlci5qcycpOyAvLyA0S2JcclxuXHJcbnJlcXVpcmUoJy4vb2JqZWN0cy9HcmFwaGljcy5qcycpOyAvLyAxMCBLYlxyXG4vLyByZXF1aXJlKCcuL29iamVjdHMvVGlsaW5nU3ByaXRlLmpzJyk7IC8vIDQgS2IgICAjIyMjIyMjIyMjIyMjIyMgVGlsaW5nU3ByaXRlICBnYW1lLmFkZC50aWxlc3ByaXRlXHJcblxyXG5yZXF1aXJlKCcuL3RleHR1cmVzL1JlbmRlclRleHR1cmUuanMnKTsgLy8gMiBLYlxyXG5cclxucmVxdWlyZSgnLi91dGlscy9DYW52YXNCdWZmZXIuanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuL3JlbmRlcmVycy9DYW52YXNNYXNrTWFuYWdlci5qcycpOyAvLyAxS2JcclxucmVxdWlyZSgnLi9yZW5kZXJlcnMvQ2FudmFzVGludGVyLmpzJyk7IC8vIDMgS2IgIyMjIyMjIyMjIyMjIyMjIyB0aW50IGZ1bmN0aW9uIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9