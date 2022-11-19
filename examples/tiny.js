/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {


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
        this.update.call(this.callbackContext, time, delta);

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

__webpack_require__(/*! ./renderer/CanvasRenderer.js */ "./src/renderer/CanvasRenderer.js"); // 3 Kb

/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.VERSION = "1.4.9";

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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./mini.js */ "./src/mini.js")

// require('./systems/ObjectCreator.js'); // 1 Kb
// require('./systems/Loader.js'); // 3 Kb
// require('./systems/Input.js'); // 1 Kb
// require('./systems/Timer.js'); // 1 Kb
__webpack_require__(/*! ./systems/Tween.js */ "./src/systems/Tween.js");

__webpack_require__(/*! ./math/RoundedRectangle.js */ "./src/math/RoundedRectangle.js");	//
__webpack_require__(/*! ./math/Polygon.js */ "./src/math/Polygon.js");			//
__webpack_require__(/*! ./math/Circle.js */ "./src/math/Circle.js");			// 6 Kb

__webpack_require__(/*! ./renderer/GraphicsRenderer.js */ "./src/renderer/GraphicsRenderer.js"); // 4Kb

__webpack_require__(/*! ./objects/Graphics.js */ "./src/objects/Graphics.js"); // 10 Kb
// require('./objects/TilingSprite.js'); // 4 Kb   ############### TilingSprite  game.add.tilesprite

__webpack_require__(/*! ./textures/RenderTexture.js */ "./src/textures/RenderTexture.js"); // 2 Kb

__webpack_require__(/*! ./utils/CanvasBuffer.js */ "./src/utils/CanvasBuffer.js"); // 1 Kb
__webpack_require__(/*! ./renderer/CanvasMaskManager.js */ "./src/renderer/CanvasMaskManager.js"); // 1Kb
__webpack_require__(/*! ./renderer/CanvasTinter.js */ "./src/renderer/CanvasTinter.js"); // 3 Kb ################ tint function

/***/ }),

/***/ "./src/math/Circle.js":
/*!****************************!*\
  !*** ./src/math/Circle.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {


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
/*! no static exports found */
/***/ (function(module, exports) {


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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {


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
/*! no static exports found */
/***/ (function(module, exports) {


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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {


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
    matrix = matrix;//just to get passed js hinting (and preserve inheritance)
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
    this._cachedSprite = null
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
/*! no static exports found */
/***/ (function(module, exports) {

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

Tiny.Graphics.prototype.drawRoundedRect2 = function(x, y, width, height, radius)
{   
    var shape = new Tiny.RoundedRectangle(x, y, width, height, radius)
    shape.type = Tiny.Primitives.RREC_LJOIN;
    this.drawShape(shape);

    return this;
};


Tiny.Graphics.prototype.drawCircle = function(x, y, diameter)
{
    this.drawShape(new Tiny.Circle(x, y, diameter));

    return this;
};

Tiny.Graphics.prototype.drawEllipse = function(x, y, width, height)
{
    this.drawShape(new Tiny.Ellipse(x, y, width, height));

    return this;
};

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
/*! no static exports found */
/***/ (function(module, exports) {


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

        child.game = this.game;

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {


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
    this.cachedTint = 0xFFFFFF;

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
/*! no static exports found */
/***/ (function(module, exports) {


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
    if(this.dirty)
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

/***/ "./src/renderer/CanvasMaskManager.js":
/*!*******************************************!*\
  !*** ./src/renderer/CanvasMaskManager.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {


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

/***/ "./src/renderer/CanvasRenderer.js":
/*!****************************************!*\
  !*** ./src/renderer/CanvasRenderer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


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

    this.setSize(width || 800, height || 600);

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

Tiny.CanvasRenderer.prototype.setSize = function(width, height)
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
    displayObject.updateTransform();
    this.renderSession.context = context || this.context;
    this.renderSession.resolution = this.resolution;
    displayObject.render(this.renderSession);
};

/***/ }),

/***/ "./src/renderer/CanvasTinter.js":
/*!**************************************!*\
  !*** ./src/renderer/CanvasTinter.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.CanvasTinter = function()
{
};

Tiny.Texture.prototype.tintCache = {}

Tiny.CanvasTinter.getTintedTexture = function(sprite, color)
{
    var texture = sprite.texture;

    if (texture.tintCache[color]) return texture.tintCache[color];

    var canvas = Tiny.CanvasTinter.canvas || document.createElement("canvas");
    
    Tiny.CanvasTinter.tintMethod(texture, color, canvas);

    if (Tiny.CanvasTinter.convertTintToImage)
    {
        // is this better?
        var tintImage = new Image();
        tintImage.src = canvas.toDataURL();

        // texture.tintCache[stringColor] = tintImage;
    }
    else
    {

        Tiny.CanvasTinter.canvas = null;
    }

    if (Tiny.CanvasTinter.cacheTint) texture.tintCache[color] = canvas;

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

Tiny.CanvasTinter.cacheTint = true;

Tiny.canHandleAlpha = checkInverseAlpha();

Tiny.supportNewBlendModes = checkBlendMode();

Tiny.CanvasTinter.tintMethod = Tiny.supportNewBlendModes ? Tiny.CanvasTinter.tintWithMultiply :  Tiny.CanvasTinter.tintWithPerPixel;


/***/ }),

/***/ "./src/renderer/GraphicsRenderer.js":
/*!******************************************!*\
  !*** ./src/renderer/GraphicsRenderer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {


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
        else if (data.type === Tiny.Primitives.RREC_LJOIN)
        {
            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            if (data.fillColor || data.fillColor === 0)
            {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = Tiny.color2style(fillColor);
                context.strokeStyle = Tiny.color2style(fillColor);
            }

            context.lineJoin = "round";
            context.lineWidth = radius;

            context.strokeRect(rx + (radius / 2), ry + (radius / 2), width - radius, height - radius);
            context.fillRect(rx + (radius / 2), ry + (radius / 2), width - radius, height - radius);
        }
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
/*! no static exports found */
/***/ (function(module, exports) {

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
                    var obj = this.candidates[i]
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
/*! no static exports found */
/***/ (function(module, exports) {


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
        
        if (resource.data) {

            var frameData = resource.data;
            var lastFrame = (frameData.length - 1);

            for (var i = 0; i <= lastFrame; i++)
            {
                var uuid = key + "." + i;

                var texture = new Tiny.Texture(image, {
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
            var lastFrame = total - 1;

            for (var i = 0; i < total; i++)
            {
                var uuid = key + "." + i;
                var texture = new Tiny.Texture(image, {
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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {

var noop = function() {};

var Timer = function(status, autoRemove, game, cb, delay, loop, n, oncomplete)
{
    this.game = game;
    this._cb_ = cb || noop;
    this.delay = (delay == undefined ? 1000 : delay);
    this.loop = loop;
    this._count = n || 0;
    this._repeat = (this._count > 0);
    this.status = status;
    this._lastFrame = 0;
    this.autoRemove = autoRemove;
    this._oncomplete = oncomplete || noop;
}

Timer.prototype = {
    start: function()
    {
        this.status = 1;
    },
    pause: function()
    {
        this.status = 0;
    },
    stop: function()
    {
        this.status = 0;
        this._lastFrame = 0;
    },
    update: function(deltaTime)
    {
        if (this.status)
        {
            this._lastFrame += deltaTime
            if (this._lastFrame >= this.delay)
            {
                this._cb_();
                this._lastFrame = 0;
                if (this._repeat)
                {
                    this._count--;
                    if (this._count === 0)
                    {
                        this.status = 0;
                        this.autoRemove && this.game.timer.remove(this);
                        this._oncomplete();
                    }
                }
                else if (!this.loop)
                {
                    this.status = 0;
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
        this.list.forEach(function(tm)
        {
            tm.update(delta);
        })
    },
    removeAll: function()
    {
        this.list.forEach(function(tm)
        {
            tm.stop();
        });

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
    add: function(delay, cb, autostart, autoremove)
    {
        if (autostart == undefined) 
        {
            autostart = this.autoStart;
        }
        var timer = new Timer((autostart ? 1 : 0), (autoremove != undefined ? autoremove : this.autoRemove), this.game, cb, delay);
        this.list.push(timer);
        return timer;
    },
    loop: function(delay, cb, autostart, autoremove)
    {
        if (autostart == undefined) 
        {
            autostart = this.autoStart;
        }
        var timer = new Timer((autostart ? 1 : 0), (autoremove != undefined ? autoremove : this.autoRemove), this.game, cb, delay, true);
        this.list.push(timer);
        return timer;
    },
    repeat: function(delay, n, cb, complete)
    {
        var timer = new Timer((this.autoStart ? 1 : 0), this.autoRemove, this.game, cb, delay, false, n, complete);
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
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

		this._tweens[tween.getId()] = tween;
		this._tweensAddedDuringUpdate[tween.getId()] = tween;

	},

	remove: function (tween) {

		delete this._tweens[tween.getId()];
		delete this._tweensAddedDuringUpdate[tween.getId()];

	},

	update: function (time, preserve) {

		var tweenIds = Object.keys(this._tweens);

		if (tweenIds.length === 0) {
			return false;
		}

		time = time !== undefined ? time : TWEEN.now();

		// Tweens are updated in "batches". If you add a new tween during an
		// update, then the new tween will be updated in the next batch.
		// If you remove a tween during an update, it may or may not be updated.
		// However, if the removed tween was added during the current batch,
		// then it will not be updated.
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};

			for (var i = 0; i < tweenIds.length; i++) {

				var tween = this._tweens[tweenIds[i]];

				if (tween && tween.update(time) === false) {
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


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (self) === 'undefined' && typeof (process) !== 'undefined' && process.hrtime) {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use self.performance.now if it is available.
else if (typeof (self) !== 'undefined' &&
         self.performance !== undefined &&
		 self.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = self.performance.now.bind(self.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object, group) {
	this._isPaused = false;
	this._pauseStart = null;
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
	this._easingFunction = TWEEN.Easing.Linear.None;
	this._interpolationFunction = TWEEN.Interpolation.Linear;
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

TWEEN.Tween.prototype = {
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

	start: function (time) {

		this._group.add(this);

		this._isPlaying = true;

		this._isPaused = false;

		this._onStartCallbackFired = false;

		this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
		this._startTime += this._delayTime;

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

			// Save the starting value, but only once.
			if (typeof(this._valuesStart[property]) === 'undefined') {
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

		this.update(Infinity);
		return this;

	},

	pause: function(time) {

		if (this._isPaused || !this._isPlaying) {
			return this;
		}

		this._isPaused = true;

		this._pauseStart = time === undefined ? TWEEN.now() : time;

		this._group.remove(this);

		return this;

	},

	resume: function(time) {

		if (!this._isPaused || !this._isPlaying) {
			return this;
		}

		this._isPaused = false;

		this._startTime += (time === undefined ? TWEEN.now() : time)
			- this._pauseStart;

		this._pauseStart = 0;

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

	update: function (time) {

		var property;
		var elapsed;
		var value;

		if (time < this._startTime) {
			return true;
		}

		if (this._onStartCallbackFired === false) {

			if (this._onStartCallback !== null) {
				this._onStartCallback(this._object);
			}

			this._onStartCallbackFired = true;
		}

		elapsed = (time - this._startTime) / this._duration;
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
					this._startTime = time + this._repeatDelayTime;
				} else {
					this._startTime = time + this._delayTime;
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
					this._chainedTweens[i].start(this._startTime + this._duration);
				}

				return false;

			}

		}

		return true;

	}
};


TWEEN.Easing = {

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

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

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
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

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
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

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

			var fc = TWEEN.Interpolation.Utils.Factorial;

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
};

Tiny.TweenManager.prototype = {

	add: function(obj) {
		return new TWEEN.Tween(obj);
	},

	pause: function() {

        this.bufferList.length = 0;

        for (var k in TWEEN._tweens)
        {
            this.bufferList.push(TWEEN._tweens[k]);
            TWEEN._tweens[k].pause();
        }
        
	},

	resume() {

        this.bufferList.forEach(function(tween)
        {
            tween.resume();
        })

        this.bufferList.length = 0;
        
	},

    update: function(delta) {
        TWEEN.update();
    },

    destroy: function() {
    	this.bufferList.length = 0;
    	TWEEN.removeAll();
    }
}

Tiny.registerSystem("tweens", Tiny.TweenManager);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/textures/RenderTexture.js":
/*!***************************************!*\
  !*** ./src/textures/RenderTexture.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


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
        new Tiny.Rectangle(0, 0, this.width * resolution, this.height * resolution)
    );

    this.resolution = resolution || 1;

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

    this.textureBuffer.resize(this.width, this.height);
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
/*! no static exports found */
/***/ (function(module, exports) {


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

    this.valid = frame && frame.width && frame.height && this.source && this.hasLoaded;

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {


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

            for (var i = 0; i < fnArray.length - listeners.n; i += 3)
            {
                if (len <= 1)
                    fnArray[i].call(fnArray[i + 1]);
                else if (len == 2)
                    fnArray[i].call(fnArray[i + 1], a1);
                else if (len == 3)
                    fnArray[i].call(fnArray[i + 1], a1, a2);
                else
                    fnArray[i].call(fnArray[i + 1], a1, a2, a3);

                if (fnArray[i + 2])
                {
                    fnArray.splice(i, 3);
                    i -= 3;
                }
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
/*! no static exports found */
/***/ (function(module, exports) {

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

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL0NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC9NYXRoLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL01hdHJpeC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC9Qb2ludC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC9Qb2x5Z29uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC9Sb3VuZGVkUmVjdGFuZ2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9taW5pLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0Jhc2VPYmplY3QyRC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9HcmFwaGljcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9PYmplY3QyRC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9TY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyZXIvQ2FudmFzTWFza01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlcmVyL0NhbnZhc1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXJlci9DYW52YXNUaW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlcmVyL0dyYXBoaWNzUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N5c3RlbXMvSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N5c3RlbXMvTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zeXN0ZW1zL1JBRi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3lzdGVtcy9UaW1lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3lzdGVtcy9Ud2Vlbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGV4dHVyZXMvUmVuZGVyVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGV4dHVyZXMvVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ2FudmFzQnVmZmVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3BvbHlmaWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdEx0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIseUJBQXlCO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIseUJBQXlCO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlLQSxtQkFBTyxDQUFDLG9EQUFxQjs7QUFFN0I7O0FBRUEsbUJBQU8sQ0FBQyw4QkFBVTtBQUNsQixtQkFBTyxDQUFDLG9DQUFhO0FBQ3JCLG1CQUFPLENBQUMsMENBQWdCLEVBQUU7QUFDMUIsbUJBQU8sQ0FBQyw0Q0FBaUIsRUFBRTtBQUMzQixtQkFBTyxDQUFDLDhDQUFrQixFQUFFO0FBQzVCLG1CQUFPLENBQUMsb0RBQXFCLEVBQUU7O0FBRS9CLG1CQUFPLENBQUMsZ0VBQTJCLEVBQUU7QUFDckMsbUJBQU8sQ0FBQyx3REFBdUIsRUFBRTtBQUNqQyxtQkFBTyxDQUFDLGtEQUFvQixFQUFFOztBQUU5QixtQkFBTyxDQUFDLHNFQUE4QixFQUFFLFE7Ozs7Ozs7Ozs7OztBQ2R4Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQy9DQSxtQkFBTyxDQUFDLGdDQUFXOztBQUVuQix5Q0FBeUM7QUFDekMsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsbUJBQU8sQ0FBQyxrREFBb0I7O0FBRTVCLG1CQUFPLENBQUMsa0VBQTRCLEVBQUU7QUFDdEMsbUJBQU8sQ0FBQyxnREFBbUIsRUFBRTtBQUM3QixtQkFBTyxDQUFDLDhDQUFrQixFQUFFOztBQUU1QixtQkFBTyxDQUFDLDBFQUFnQyxFQUFFOztBQUUxQyxtQkFBTyxDQUFDLHdEQUF1QixFQUFFO0FBQ2pDLHdDQUF3Qzs7QUFFeEMsbUJBQU8sQ0FBQyxvRUFBNkIsRUFBRTs7QUFFdkMsbUJBQU8sQ0FBQyw0REFBeUIsRUFBRTtBQUNuQyxtQkFBTyxDQUFDLDRFQUFpQyxFQUFFO0FBQzNDLG1CQUFPLENBQUMsa0VBQTRCLEVBQUUsdUM7Ozs7Ozs7Ozs7O0FDckJ0Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDNVRBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3Qzs7Ozs7Ozs7Ozs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsNENBQTRDLGFBQWE7O0FBRXpELHVCQUF1Qix5QkFBeUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBLHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0RBQWdELFNBQVM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0QsU0FBUztBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN2TEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxxRDs7Ozs7Ozs7Ozs7QUM5SEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvRTs7Ozs7Ozs7Ozs7QUN0Q0EsbUJBQU8sQ0FBQyxnQ0FBVzs7O0FBR25CLG1CQUFPLENBQUMsOENBQWtCLEVBQUU7QUFDNUIseUNBQXlDO0FBQ3pDLG1CQUFPLENBQUMsb0RBQXFCLEVBQUU7QUFDL0IsbUJBQU8sQ0FBQyxrREFBb0IsRUFBRTtBQUM5QixtQkFBTyxDQUFDLGtEQUFvQixFQUFFOztBQUU5QixtQkFBTyxDQUFDLDREQUF5Qjs7QUFFakMsbUJBQU8sQ0FBQyx3REFBdUIsRUFBRTs7QUFFakMsbUJBQU8sQ0FBQyxvREFBcUIsRUFBRTtBQUMvQixtQkFBTyxDQUFDLGdEQUFtQixFQUFFOzs7Ozs7Ozs7Ozs7Ozs7QUNiN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esd0ZBQXdGOztBQUV4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsa0Q7Ozs7Ozs7Ozs7O0FDdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyx1QkFBdUI7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDhCQUE4QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixtQkFBbUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7O0FDNTFCRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQy9WQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDaFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtGOzs7Ozs7Ozs7Ozs7QUNuWUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNBLEM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsMkNBQTJDLDBCQUEwQjs7QUFFckU7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxDO0FBQ0EsNENBQTRDLG1CQUFtQjs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDaExBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEMseUJBQXlCOztBQUV2RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHlCQUF5Qjs7QUFFNUU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2hNQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGtDQUFrQztBQUNyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx5QkFBeUIscUJBQXFCO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixrQ0FBa0M7QUFDckQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7OztBQ3BWQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLCtCQUErQjtBQUM5RDtBQUNBOztBQUVBOztBQUVBLCtCQUErQixzQkFBc0I7QUFDckQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsd0RBQXdELFFBQVE7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRDs7QUFFcEQsNkNBQTZDLHlCQUF5Qjs7QUFFdEU7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHlCQUF5QjtBQUNqRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQix5QkFBeUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx5Qzs7Ozs7Ozs7Ozs7O0FDaFJBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUEsNEM7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLFdBQVc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBOztBQUVBLHlDOzs7Ozs7Ozs7OztBQ2xQQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLHlCQUF5QjtBQUNqRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIscURBQXFEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEseUI7Ozs7Ozs7Ozs7O0FDN0hBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnRDs7Ozs7Ozs7Ozs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHFCQUFxQjs7QUFFdkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBLGdFQUFnRSxzQkFBc0I7QUFDdEY7QUFDQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBLGtFQUFrRSxzQkFBc0I7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUQ7Ozs7Ozs7Ozs7Ozs7QUMvK0JBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDakhBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLOzs7Ozs7Ozs7OztBQ2pMQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isb0JBQW9CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsMkJBQTJCLGtDQUFrQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJ0aW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiXHJcbnZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcblRpbnkuQXBwID0gZnVuY3Rpb24oc3RhdGVzKVxyXG57XHJcbiAgICB0aGlzLmNhbGxiYWNrQ29udGV4dCA9IHRoaXM7XHJcbiAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgIHRoaXMudGltZVNjYWxlID0gMTtcclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5zeXN0ZW1zID0gW107XHJcbiAgICB0aGlzLnVwZGF0YWJsZSA9IFtdO1xyXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucGF1c2VEdXJhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmlucHV0VmlldyA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgc3RhdGVzID0gc3RhdGVzIHx8IHt9O1xyXG4gICAgdGhpcy5ib290ID0gc3RhdGVzLmJvb3QgfHwgdGhpcy5ib290IHx8IG5vb3A7XHJcbiAgICB0aGlzLnByZWxvYWQgPSBzdGF0ZXMucHJlbG9hZCB8fCB0aGlzLnByZWxvYWQgfHwgbm9vcDtcclxuICAgIHRoaXMuY3JlYXRlID0gc3RhdGVzLmNyZWF0ZSB8fCB0aGlzLmNyZWF0ZSB8fCBub29wO1xyXG4gICAgdGhpcy51cGRhdGUgPSBzdGF0ZXMudXBkYXRlIHx8IHRoaXMudXBkYXRlIHx8IG5vb3A7XHJcbiAgICB0aGlzLnJlbmRlciA9IHN0YXRlcy5yZW5kZXIgfHwgdGhpcy5yZW5kZXIgfHwgbm9vcDtcclxuICAgIHRoaXMuX3Jlc2l6ZV9jYiA9IHN0YXRlcy5yZXNpemUgfHwgbm9vcDtcclxuICAgIHRoaXMuX2Rlc3Ryb3lfY2IgPSBzdGF0ZXMuZGVzdHJveSB8fCBub29wO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHNlbGYuX2Jvb3QoKTtcclxuICAgIH0sIDApO1xyXG59XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuX2Jvb3QgPSBmdW5jdGlvbigpXHJcbntcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRpbnkuc3lzdGVtcy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgc3lzdGVtID0gVGlueS5zeXN0ZW1zW2ldO1xyXG5cclxuICAgICAgICB2YXIgX3N5c18gPSBuZXcgc3lzdGVtLl9jbGFzc18odGhpcyk7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1zLnB1c2goX3N5c18pO1xyXG4gICAgICAgIGlmIChfc3lzXy51cGRhdGUpIHRoaXMudXBkYXRhYmxlLnB1c2goX3N5c18pO1xyXG5cclxuICAgICAgICBpZiAoc3lzdGVtLm5hbWUpIHRoaXNbc3lzdGVtLm5hbWVdID0gX3N5c187XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFRpbnkuUkFGKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhZiA9IG5ldyBUaW55LlJBRih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJvb3QuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHNlbGYubG9hZCkgc2VsZi5fcHJlbG9hZCgpO1xyXG4gICAgICAgIGVsc2Ugc2VsZi5fY3JlYXRlKCk7XHJcbiAgICB9LCAwKVxyXG59XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuX3ByZWxvYWQgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMucHJlbG9hZC5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuICAgIHRoaXMuc3RhdGUgPSAxO1xyXG4gICAgdGhpcy5sb2FkLnN0YXJ0KHRoaXMuX2NyZWF0ZSk7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkgXHJcbntcclxuICAgIHRoaXMuY3JlYXRlLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG5cclxuICAgIGlmICh0aGlzLnJhZikgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yYWYuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXRlID0gMjtcclxufVxyXG5cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkgXHJcbntcclxuICAgIGlmICh0aGlzLnJhZikgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yYWYucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMucGF1c2VkKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3lzdGVtc1tpXS5wYXVzZSkgdGhpcy5zeXN0ZW1zW2ldLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICh0aGlzLnJhZikgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yYWYucmVzZXQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMucGF1c2VkKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3lzdGVtc1tpXS5yZXN1bWUpIHRoaXMuc3lzdGVtc1tpXS5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24odGltZSwgZGVsdGEpXHJcbntcclxuICAgIGlmICghdGhpcy5wYXVzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCwgdGltZSwgZGVsdGEpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudXBkYXRhYmxlLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGFibGVbaV0udXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wYXVzZUR1cmF0aW9uICs9IGRlbHRhXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxufVxyXG5cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgdGhpcy53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlID4gMCkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fcmVzaXplX2NiLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZiAoc2VsZi5pbnB1dCkgc2VsZi5pbnB1dC51cGRhdGVCb3VuZHMoKTtcclxuICAgIH0sIDApXHJcbn1cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oY2xlYXJDYWNoZSlcclxue1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtc1tpXS5kZXN0cm95KSB0aGlzLnN5c3RlbXNbaV0uZGVzdHJveShjbGVhckNhY2hlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XHJcblxyXG4gICAgaWYgKGNsZWFyQ2FjaGUpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZC5jbGVhckNhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmFmKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhZi5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZGVzdHJveV9jYi5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxufVxyXG4iLCJyZXF1aXJlKCcuL3V0aWxzL3BvbHlmaWxsLmpzJyk7XHJcblxyXG53aW5kb3cuVGlueSA9IHt9O1xyXG5cclxucmVxdWlyZSgnLi9BcHAuanMnKTtcclxucmVxdWlyZSgnLi9nbG9iYWwuanMnKTtcclxucmVxdWlyZSgnLi9tYXRoL01hdGguanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuL21hdGgvUG9pbnQuanMnKTsgICAgICAvL1xyXG5yZXF1aXJlKCcuL21hdGgvTWF0cml4LmpzJyk7ICAgICAvL1xyXG5yZXF1aXJlKCcuL21hdGgvUmVjdGFuZ2xlLmpzJyk7ICAvLyAgOCBLYlxyXG5cclxucmVxdWlyZSgnLi9vYmplY3RzL0Jhc2VPYmplY3QyRC5qcycpOyAgICAgICAgICAgICAvL1xyXG5yZXF1aXJlKCcuL29iamVjdHMvT2JqZWN0MkQuanMnKTsgICAgLy9cclxucmVxdWlyZSgnLi9vYmplY3RzL1NjZW5lLmpzJyk7ICAgICAgICAgICAgICAgICAgICAgLy8gMTAgS2JcclxuXHJcbnJlcXVpcmUoJy4vcmVuZGVyZXIvQ2FudmFzUmVuZGVyZXIuanMnKTsgLy8gMyBLYiIsIlxyXG5UaW55LlZFUlNJT04gPSBcIjEuNC45XCI7XHJcblxyXG5UaW55LnN5c3RlbXMgPSBbXTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0gPSBmdW5jdGlvbihuYW1lLCBzeXN0ZW0pIHtcclxuICAgIFRpbnkuc3lzdGVtcy5wdXNoKHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIF9jbGFzc186IHN5c3RlbVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblRpbnkuUHJpbWl0aXZlcyA9IHtcclxuICAgIFBPTFk6IDAsXHJcbiAgICBSRUNUOiAxLCBcclxuICAgIENJUkM6IDIsXHJcbiAgICBFTElQOiAzLFxyXG4gICAgUlJFQzogNCxcclxuICAgIFJSRUNfTEpPSU46IDVcclxufVxyXG5cclxuVGlueS5ybmQgPSBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XHJcbn07XHJcblxyXG5UaW55LmNvbG9yMnJnYiA9IGZ1bmN0aW9uKHN0eWxlKSB7XHJcbiAgICByZXR1cm4gVGlueS5oZXgycmdiKFRpbnkuc3R5bGUyaGV4KHN0eWxlKSk7XHJcbn1cclxuXHJcblRpbnkuY29sb3Iyc3R5bGUgPSBmdW5jdGlvbihzdHlsZSkge1xyXG4gICAgcmV0dXJuIHN0eWxlO1xyXG59O1xyXG5cclxuVGlueS5zdHlsZTJoZXggPSBmdW5jdGlvbihzdHlsZSkge1xyXG4gICAgcmV0dXJuICtzdHlsZS5yZXBsYWNlKCcjJywgJzB4Jyk7XHJcbn07XHJcblxyXG5UaW55LmhleDJzdHlsZSA9IGZ1bmN0aW9uKGhleCkge1xyXG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICggaGV4IHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG59XHJcblxyXG5UaW55LmhleDJyZ2IgPSBmdW5jdGlvbihoZXgpIHtcclxuICAgIHJldHVybiBbKGhleCA+PiAxNiAmIDB4RkYpIC8gMjU1LCAoIGhleCA+PiA4ICYgMHhGRikgLyAyNTUsIChoZXggJiAweEZGKS8gMjU1XTtcclxufTtcclxuXHJcblRpbnkucmdiMmhleCA9IGZ1bmN0aW9uKHJnYikge1xyXG4gICAgcmV0dXJuICgocmdiWzBdKjI1NSA8PCAxNikgKyAocmdiWzFdKjI1NSA8PCA4KSArIHJnYlsyXSoyNTUpO1xyXG59OyIsInJlcXVpcmUoJy4vbWluaS5qcycpXHJcblxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvT2JqZWN0Q3JlYXRvci5qcycpOyAvLyAxIEtiXHJcbi8vIHJlcXVpcmUoJy4vc3lzdGVtcy9Mb2FkZXIuanMnKTsgLy8gMyBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvSW5wdXQuanMnKTsgLy8gMSBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvVGltZXIuanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvVHdlZW4uanMnKTtcclxuXHJcbnJlcXVpcmUoJy4vbWF0aC9Sb3VuZGVkUmVjdGFuZ2xlLmpzJyk7XHQvL1xyXG5yZXF1aXJlKCcuL21hdGgvUG9seWdvbi5qcycpO1x0XHRcdC8vXHJcbnJlcXVpcmUoJy4vbWF0aC9DaXJjbGUuanMnKTtcdFx0XHQvLyA2IEtiXHJcblxyXG5yZXF1aXJlKCcuL3JlbmRlcmVyL0dyYXBoaWNzUmVuZGVyZXIuanMnKTsgLy8gNEtiXHJcblxyXG5yZXF1aXJlKCcuL29iamVjdHMvR3JhcGhpY3MuanMnKTsgLy8gMTAgS2JcclxuLy8gcmVxdWlyZSgnLi9vYmplY3RzL1RpbGluZ1Nwcml0ZS5qcycpOyAvLyA0IEtiICAgIyMjIyMjIyMjIyMjIyMjIFRpbGluZ1Nwcml0ZSAgZ2FtZS5hZGQudGlsZXNwcml0ZVxyXG5cclxucmVxdWlyZSgnLi90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlLmpzJyk7IC8vIDIgS2JcclxuXHJcbnJlcXVpcmUoJy4vdXRpbHMvQ2FudmFzQnVmZmVyLmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZSgnLi9yZW5kZXJlci9DYW52YXNNYXNrTWFuYWdlci5qcycpOyAvLyAxS2JcclxucmVxdWlyZSgnLi9yZW5kZXJlci9DYW52YXNUaW50ZXIuanMnKTsgLy8gMyBLYiAjIyMjIyMjIyMjIyMjIyMjIHRpbnQgZnVuY3Rpb24iLCJUaW55LkNpcmNsZSA9IGZ1bmN0aW9uICh4LCB5LCBkaWFtZXRlcikge1xyXG5cclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgZGlhbWV0ZXIgPSBkaWFtZXRlciB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcblxyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB0aGlzLl9kaWFtZXRlciA9IGRpYW1ldGVyO1xyXG5cclxuICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcblxyXG4gICAgaWYgKGRpYW1ldGVyID4gMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSBkaWFtZXRlciAqIDAuNTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuQ0lSQztcclxuXHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgZ2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGlueS5SZWN0YW5nbGUodGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLmRpYW1ldGVyLCB0aGlzLmRpYW1ldGVyKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRvOiBmdW5jdGlvbiAoeCwgeSwgZGlhbWV0ZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuX2RpYW1ldGVyID0gZGlhbWV0ZXI7XHJcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gZGlhbWV0ZXIgKiAwLjU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29weUZyb206IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0VG8oc291cmNlLngsIHNvdXJjZS55LCBzb3VyY2UuZGlhbWV0ZXIpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29weVRvOiBmdW5jdGlvbiAoZGVzdCkge1xyXG5cclxuICAgICAgICBkZXN0LnggPSB0aGlzLng7XHJcbiAgICAgICAgZGVzdC55ID0gdGhpcy55O1xyXG4gICAgICAgIGRlc3QuZGlhbWV0ZXIgPSB0aGlzLl9kaWFtZXRlcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlc3Q7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24gKGRlc3QsIHJvdW5kKSB7XHJcblxyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IFRpbnkuTWF0aC5kaXN0YW5jZSh0aGlzLngsIHRoaXMueSwgZGVzdC54LCBkZXN0LnkpO1xyXG4gICAgICAgIHJldHVybiByb3VuZCA/IE1hdGgucm91bmQoZGlzdGFuY2UpIDogZGlzdGFuY2U7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvdXRwdXQgPT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5DaXJjbGUodGhpcy54LCB0aGlzLnksIHRoaXMuZGlhbWV0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXQuc2V0VG8odGhpcy54LCB0aGlzLnksIHRoaXMuZGlhbWV0ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoeCwgeSkge1xyXG5cclxuICAgICAgICByZXR1cm4gVGlueS5DaXJjbGUuY29udGFpbnModGhpcywgeCwgeSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvZmZzZXQ6IGZ1bmN0aW9uIChkeCwgZHkpIHtcclxuXHJcbiAgICAgICAgdGhpcy54ICs9IGR4O1xyXG4gICAgICAgIHRoaXMueSArPSBkeTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvZmZzZXRQb2ludDogZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0KHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2lyY2xlO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJkaWFtZXRlclwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpYW1ldGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWUgKiAwLjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcInJhZGl1c1wiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IHZhbHVlICogMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImxlZnRcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggLSB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMueClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnggLSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPCB0aGlzLngpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdmFsdWUgLSB0aGlzLng7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJ0b3BcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgLSB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnkgLSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHZhbHVlIC0gdGhpcy55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiYXJlYVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yYWRpdXMgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguUEkgKiB0aGlzLl9yYWRpdXMgKiB0aGlzLl9yYWRpdXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiZW1wdHlcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fZGlhbWV0ZXIgPT09IDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKDAsIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblRpbnkuQ2lyY2xlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGEsIHgsIHkpIHtcclxuXHJcbiAgICAvLyAgQ2hlY2sgaWYgeC95IGFyZSB3aXRoaW4gdGhlIGJvdW5kcyBmaXJzdFxyXG4gICAgaWYgKGEucmFkaXVzID4gMCAmJiB4ID49IGEubGVmdCAmJiB4IDw9IGEucmlnaHQgJiYgeSA+PSBhLnRvcCAmJiB5IDw9IGEuYm90dG9tKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkeCA9IChhLnggLSB4KSAqIChhLnggLSB4KTtcclxuICAgICAgICB2YXIgZHkgPSAoYS55IC0geSkgKiAoYS55IC0geSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoZHggKyBkeSkgPD0gKGEucmFkaXVzICogYS5yYWRpdXMpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgcmV0dXJuIChhLnggPT0gYi54ICYmIGEueSA9PSBiLnkgJiYgYS5kaWFtZXRlciA9PSBiLmRpYW1ldGVyKTtcclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgcmV0dXJuIChUaW55Lk1hdGguZGlzdGFuY2UoYS54LCBhLnksIGIueCwgYi55KSA8PSAoYS5yYWRpdXMgKyBiLnJhZGl1cykpO1xyXG59O1xyXG5cclxuXHJcblRpbnkuQ2lyY2xlLmludGVyc2VjdHNSZWN0YW5nbGUgPSBmdW5jdGlvbiAoYywgcikge1xyXG5cclxuICAgIHZhciBjeCA9IE1hdGguYWJzKGMueCAtIHIueCAtIHIuaGFsZldpZHRoKTtcclxuICAgIHZhciB4RGlzdCA9IHIuaGFsZldpZHRoICsgYy5yYWRpdXM7XHJcblxyXG4gICAgaWYgKGN4ID4geERpc3QpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjeSA9IE1hdGguYWJzKGMueSAtIHIueSAtIHIuaGFsZkhlaWdodCk7XHJcbiAgICB2YXIgeURpc3QgPSByLmhhbGZIZWlnaHQgKyBjLnJhZGl1cztcclxuXHJcbiAgICBpZiAoY3kgPiB5RGlzdClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN4IDw9IHIuaGFsZldpZHRoIHx8IGN5IDw9IHIuaGFsZkhlaWdodClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeENvcm5lckRpc3QgPSBjeCAtIHIuaGFsZldpZHRoO1xyXG4gICAgdmFyIHlDb3JuZXJEaXN0ID0gY3kgLSByLmhhbGZIZWlnaHQ7XHJcbiAgICB2YXIgeENvcm5lckRpc3RTcSA9IHhDb3JuZXJEaXN0ICogeENvcm5lckRpc3Q7XHJcbiAgICB2YXIgeUNvcm5lckRpc3RTcSA9IHlDb3JuZXJEaXN0ICogeUNvcm5lckRpc3Q7XHJcbiAgICB2YXIgbWF4Q29ybmVyRGlzdFNxID0gYy5yYWRpdXMgKiBjLnJhZGl1cztcclxuXHJcbiAgICByZXR1cm4geENvcm5lckRpc3RTcSArIHlDb3JuZXJEaXN0U3EgPD0gbWF4Q29ybmVyRGlzdFNxO1xyXG5cclxufTtcclxuIiwiXHJcblRpbnkuTWF0aCA9IHtcclxuXHJcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyKSB7XHJcblxyXG4gICAgICAgIHZhciBkeCA9IHgxIC0geDI7XHJcbiAgICAgICAgdmFyIGR5ID0geTEgLSB5MjtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvciA9IE1hdGguUEkgLyAxODA7XHJcbnZhciByYWRpYW5Ub0RlZ3JlZXNGYWN0b3IgPSAxODAgLyBNYXRoLlBJO1xyXG5cclxuVGlueS5NYXRoLmRlZ1RvUmFkID0gZnVuY3Rpb24gZGVnVG9SYWQgKGRlZ3JlZXMpIHtcclxuICAgIHJldHVybiBkZWdyZWVzICogZGVncmVlVG9SYWRpYW5zRmFjdG9yO1xyXG59O1xyXG5cclxuVGlueS5NYXRoLnJhZFRvRGVnID0gZnVuY3Rpb24gcmFkVG9EZWcgKHJhZGlhbnMpIHtcclxuICAgIHJldHVybiByYWRpYW5zICogcmFkaWFuVG9EZWdyZWVzRmFjdG9yO1xyXG59OyIsIlxyXG5UaW55Lk1hdHJpeCA9IGZ1bmN0aW9uKClcclxue1xyXG5cclxuICAgIHRoaXMuYSA9IDE7XHJcblxyXG4gICAgdGhpcy5iID0gMDtcclxuXHJcbiAgICB0aGlzLmMgPSAwO1xyXG5cclxuICAgIHRoaXMuZCA9IDE7XHJcblxyXG4gICAgdGhpcy50eCA9IDA7XHJcblxyXG4gICAgdGhpcy50eSA9IDA7XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5NQVRSSVg7XHJcblxyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmZyb21BcnJheSA9IGZ1bmN0aW9uKGFycmF5KVxyXG57XHJcbiAgICB0aGlzLmEgPSBhcnJheVswXTtcclxuICAgIHRoaXMuYiA9IGFycmF5WzFdO1xyXG4gICAgdGhpcy5jID0gYXJyYXlbM107XHJcbiAgICB0aGlzLmQgPSBhcnJheVs0XTtcclxuICAgIHRoaXMudHggPSBhcnJheVsyXTtcclxuICAgIHRoaXMudHkgPSBhcnJheVs1XTtcclxufTtcclxuXHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKHRyYW5zcG9zZSlcclxue1xyXG4gICAgaWYgKCF0aGlzLmFycmF5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XHJcblxyXG4gICAgaWYgKHRyYW5zcG9zZSlcclxuICAgIHtcclxuICAgICAgICBhcnJheVswXSA9IHRoaXMuYTtcclxuICAgICAgICBhcnJheVsxXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVsyXSA9IDA7XHJcbiAgICAgICAgYXJyYXlbM10gPSB0aGlzLmM7XHJcbiAgICAgICAgYXJyYXlbNF0gPSB0aGlzLmQ7XHJcbiAgICAgICAgYXJyYXlbNV0gPSAwO1xyXG4gICAgICAgIGFycmF5WzZdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVs3XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbOF0gPSAxO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5jO1xyXG4gICAgICAgIGFycmF5WzJdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbNl0gPSAwO1xyXG4gICAgICAgIGFycmF5WzddID0gMDtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24ocG9zLCBuZXdQb3MpXHJcbntcclxuICAgIG5ld1BvcyA9IG5ld1BvcyB8fCBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICB2YXIgeSA9IHBvcy55O1xyXG5cclxuICAgIG5ld1Bvcy54ID0gdGhpcy5hICogeCArIHRoaXMuYyAqIHkgKyB0aGlzLnR4O1xyXG4gICAgbmV3UG9zLnkgPSB0aGlzLmIgKiB4ICsgdGhpcy5kICogeSArIHRoaXMudHk7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BvcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBseUludmVyc2UgPSBmdW5jdGlvbihwb3MsIG5ld1Bvcylcclxue1xyXG4gICAgbmV3UG9zID0gbmV3UG9zIHx8IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdmFyIGlkID0gMSAvICh0aGlzLmEgKiB0aGlzLmQgKyB0aGlzLmMgKiAtdGhpcy5iKTtcclxuICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICB2YXIgeSA9IHBvcy55O1xyXG5cclxuICAgIG5ld1Bvcy54ID0gdGhpcy5kICogaWQgKiB4ICsgLXRoaXMuYyAqIGlkICogeSArICh0aGlzLnR5ICogdGhpcy5jIC0gdGhpcy50eCAqIHRoaXMuZCkgKiBpZDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5hICogaWQgKiB5ICsgLXRoaXMuYiAqIGlkICogeCArICgtdGhpcy50eSAqIHRoaXMuYSArIHRoaXMudHggKiB0aGlzLmIpICogaWQ7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BvcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbih4LCB5KVxyXG57XHJcbiAgICB0aGlzLnR4ICs9IHg7XHJcbiAgICB0aGlzLnR5ICs9IHk7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgdGhpcy5hICo9IHg7XHJcbiAgICB0aGlzLmQgKj0geTtcclxuICAgIHRoaXMuYyAqPSB4O1xyXG4gICAgdGhpcy5iICo9IHk7XHJcbiAgICB0aGlzLnR4ICo9IHg7XHJcbiAgICB0aGlzLnR5ICo9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24oYW5nbGUpXHJcbntcclxuICAgIHZhciBjb3MgPSBNYXRoLmNvcyggYW5nbGUgKTtcclxuICAgIHZhciBzaW4gPSBNYXRoLnNpbiggYW5nbGUgKTtcclxuXHJcbiAgICB2YXIgYTEgPSB0aGlzLmE7XHJcbiAgICB2YXIgYzEgPSB0aGlzLmM7XHJcbiAgICB2YXIgdHgxID0gdGhpcy50eDtcclxuXHJcbiAgICB0aGlzLmEgPSBhMSAqIGNvcy10aGlzLmIgKiBzaW47XHJcbiAgICB0aGlzLmIgPSBhMSAqIHNpbit0aGlzLmIgKiBjb3M7XHJcbiAgICB0aGlzLmMgPSBjMSAqIGNvcy10aGlzLmQgKiBzaW47XHJcbiAgICB0aGlzLmQgPSBjMSAqIHNpbit0aGlzLmQgKiBjb3M7XHJcbiAgICB0aGlzLnR4ID0gdHgxICogY29zIC0gdGhpcy50eSAqIHNpbjtcclxuICAgIHRoaXMudHkgPSB0eDEgKiBzaW4gKyB0aGlzLnR5ICogY29zO1xyXG4gXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihtYXRyaXgpXHJcbntcclxuICAgIHZhciBhMSA9IHRoaXMuYTtcclxuICAgIHZhciBiMSA9IHRoaXMuYjtcclxuICAgIHZhciBjMSA9IHRoaXMuYztcclxuICAgIHZhciBkMSA9IHRoaXMuZDtcclxuXHJcbiAgICB0aGlzLmEgID0gbWF0cml4LmEgKiBhMSArIG1hdHJpeC5iICogYzE7XHJcbiAgICB0aGlzLmIgID0gbWF0cml4LmEgKiBiMSArIG1hdHJpeC5iICogZDE7XHJcbiAgICB0aGlzLmMgID0gbWF0cml4LmMgKiBhMSArIG1hdHJpeC5kICogYzE7XHJcbiAgICB0aGlzLmQgID0gbWF0cml4LmMgKiBiMSArIG1hdHJpeC5kICogZDE7XHJcblxyXG4gICAgdGhpcy50eCA9IG1hdHJpeC50eCAqIGExICsgbWF0cml4LnR5ICogYzEgKyB0aGlzLnR4O1xyXG4gICAgdGhpcy50eSA9IG1hdHJpeC50eCAqIGIxICsgbWF0cml4LnR5ICogZDEgKyB0aGlzLnR5O1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5pZGVudGl0eSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5hID0gMTtcclxuICAgIHRoaXMuYiA9IDA7XHJcbiAgICB0aGlzLmMgPSAwO1xyXG4gICAgdGhpcy5kID0gMTtcclxuICAgIHRoaXMudHggPSAwO1xyXG4gICAgdGhpcy50eSA9IDA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LmlkZW50aXR5TWF0cml4ID0gbmV3IFRpbnkuTWF0cml4KCk7IiwiVGlueS5Qb2ludCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbn07XHJcblxyXG5UaW55LlBvaW50LnByb3RvdHlwZSA9IHtcclxuXHQgc2V0OiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8ICggKHkgIT09IDApID8gdGhpcy54IDogMCApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufTsiLCJcclxuVGlueS5Qb2x5Z29uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hcmVhID0gMDtcclxuICAgIHRoaXMuX3BvaW50cyA9IFtdO1xyXG5cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldFRvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUE9MWTtcclxuXHJcbn07XHJcblxyXG5UaW55LlBvbHlnb24ucHJvdG90eXBlID0ge1xyXG5cclxuICAgIHRvTnVtYmVyQXJyYXk6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09ICd1bmRlZmluZWQnKSB7IG91dHB1dCA9IFtdOyB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcG9pbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9wb2ludHNbaV0gPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2godGhpcy5fcG9pbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0ueCk7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBmbGF0dGVuOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMudG9OdW1iZXJBcnJheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcblxyXG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLl9wb2ludHMuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09IFwidW5kZWZpbmVkXCIgfHwgb3V0cHV0ID09PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gbmV3IFRpbnkuUG9seWdvbihwb2ludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXQuc2V0VG8ocG9pbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuX3BvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGluc2lkZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gLTEsIGogPSBsZW5ndGggLSAxOyArK2kgPCBsZW5ndGg7IGogPSBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGl4ID0gdGhpcy5fcG9pbnRzW2ldLng7XHJcbiAgICAgICAgICAgIHZhciBpeSA9IHRoaXMuX3BvaW50c1tpXS55O1xyXG5cclxuICAgICAgICAgICAgdmFyIGp4ID0gdGhpcy5fcG9pbnRzW2pdLng7XHJcbiAgICAgICAgICAgIHZhciBqeSA9IHRoaXMuX3BvaW50c1tqXS55O1xyXG5cclxuICAgICAgICAgICAgaWYgKCgoaXkgPD0geSAmJiB5IDwgankpIHx8IChqeSA8PSB5ICYmIHkgPCBpeSkpICYmICh4IDwgKGp4IC0gaXgpICogKHkgLSBpeSkgLyAoankgLSBpeSkgKyBpeCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnNpZGU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHBvaW50cykge1xyXG5cclxuICAgICAgICB0aGlzLmFyZWEgPSAwO1xyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgSWYgcG9pbnRzIGlzbid0IGFuIGFycmF5LCB1c2UgYXJndW1lbnRzIGFzIHRoZSBhcnJheVxyXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocG9pbnRzKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHkwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICAgICAgICAgIC8vICBBbGxvd3MgZm9yIG1peGVkLXR5cGUgYXJndW1lbnRzXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcG9pbnRzW2ldID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBUaW55LlBvaW50KHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IFRpbnkuUG9pbnQocG9pbnRzW2ldLngsIHBvaW50c1tpXS55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2ludHMucHVzaChwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgTG93ZXN0IGJvdW5kYXJ5XHJcbiAgICAgICAgICAgICAgICBpZiAocC55IDwgeTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTAgPSBwLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQXJlYSh5MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGN1bGF0ZUFyZWE6IGZ1bmN0aW9uICh5MCkge1xyXG5cclxuICAgICAgICB2YXIgcDE7XHJcbiAgICAgICAgdmFyIHAyO1xyXG4gICAgICAgIHZhciBhdmdIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHdpZHRoO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5fcG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcDEgPSB0aGlzLl9wb2ludHNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLl9wb2ludHNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuX3BvaW50c1tpICsgMV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF2Z0hlaWdodCA9ICgocDEueSAtIHkwKSArIChwMi55IC0geTApKSAvIDI7XHJcbiAgICAgICAgICAgIHdpZHRoID0gcDEueCAtIHAyLng7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSArPSBhdmdIZWlnaHQgKiB3aWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmFyZWE7XHJcblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuUG9seWdvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlBvbHlnb247XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5Qb2x5Z29uLnByb3RvdHlwZSwgJ3BvaW50cycsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24ocG9pbnRzKSB7XHJcblxyXG4gICAgICAgIGlmIChwb2ludHMgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG8ocG9pbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gIENsZWFyIHRoZSBwb2ludHNcclxuICAgICAgICAgICAgdGhpcy5zZXRUbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuIiwiXHJcblRpbnkuUmVjdGFuZ2xlID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcbiAgICB4ID0geCB8fCAwO1xyXG4gICAgeSA9IHkgfHwgMDtcclxuICAgIHdpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIGhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SRUNUXHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGludGVyc2VjdHM6IGZ1bmN0aW9uIChiKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzKHRoaXMsIGIpO1xyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLnkpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdmFsdWUgLSB0aGlzLnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPD0gdGhpcy54KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB2YWx1ZSAtIHRoaXMueDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwidm9sdW1lXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LlJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJlY3RhbmdsZTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGEsIHgsIHkpIHtcclxuXHJcbiAgICBpZiAoYS53aWR0aCA8PSAwIHx8IGEuaGVpZ2h0IDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoeCA+PSBhLnggJiYgeCA8IGEucmlnaHQgJiYgeSA+PSBhLnkgJiYgeSA8IGEuYm90dG9tKTtcclxuXHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKGEsIHBvaW50KSB7XHJcblxyXG4gICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zKGEsIHBvaW50LngsIHBvaW50LnkpO1xyXG5cclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUmVjdCA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblxyXG4gICAgLy8gIElmIHRoZSBnaXZlbiByZWN0IGhhcyBhIGxhcmdlciB2b2x1bWUgdGhhbiB0aGlzIG9uZSB0aGVuIGl0IGNhbiBuZXZlciBjb250YWluIGl0XHJcbiAgICBpZiAoYS52b2x1bWUgPiBiLnZvbHVtZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChhLnggPj0gYi54ICYmIGEueSA+PSBiLnkgJiYgYS5yaWdodCA8IGIucmlnaHQgJiYgYS5ib3R0b20gPCBiLmJvdHRvbSk7XHJcblxyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblxyXG4gICAgaWYgKGEud2lkdGggPD0gMCB8fCBhLmhlaWdodCA8PSAwIHx8IGIud2lkdGggPD0gMCB8fCBiLmhlaWdodCA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIShhLnJpZ2h0IDwgYi54IHx8IGEuYm90dG9tIDwgYi55IHx8IGEueCA+IGIucmlnaHQgfHwgYS55ID4gYi5ib3R0b20pO1xyXG5cclxufTtcclxuXHJcblRpbnkuRW1wdHlSZWN0YW5nbGUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMCwgMCk7IiwiVGlueS5Sb3VuZGVkUmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG57XHJcblxyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXMgfHwgMjA7XHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUlJFQztcclxufTtcclxuXHJcblRpbnkuUm91bmRlZFJlY3RhbmdsZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiBuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5yYWRpdXMpO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIGlmICh0aGlzLndpZHRoIDw9IDAgfHwgdGhpcy5oZWlnaHQgPD0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHgxID0gdGhpcy54O1xyXG5cclxuICAgIGlmICh4ID49IHgxICYmIHggPD0geDEgKyB0aGlzLndpZHRoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB5MSA9IHRoaXMueTtcclxuXHJcbiAgICAgICAgaWYgKHkgPj0geTEgJiYgeSA8PSB5MSArIHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuUm91bmRlZFJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJvdW5kZWRSZWN0YW5nbGU7IiwicmVxdWlyZSgnLi9iYXNlLmpzJylcclxuXHJcblxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvUkFGLmpzJyk7IC8vIDIgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL09iamVjdENyZWF0b3IuanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvTG9hZGVyLmpzJyk7IC8vIDMgS2JcclxucmVxdWlyZSgnLi9zeXN0ZW1zL0lucHV0LmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZSgnLi9zeXN0ZW1zL1RpbWVyLmpzJyk7IC8vIDEgS2JcclxuXHJcbnJlcXVpcmUoJy4vdXRpbHMvRXZlbnRFbWl0dGVyLmpzJyk7XHJcblxyXG5yZXF1aXJlKCcuL3RleHR1cmVzL1RleHR1cmUuanMnKTtcdFx0Ly8gNCBLYlxyXG5cclxucmVxdWlyZSgnLi9vYmplY3RzL1Nwcml0ZS5qcycpOyAvLyAzIEtiXHJcbnJlcXVpcmUoJy4vb2JqZWN0cy9UZXh0LmpzJyk7IC8vIDUgS2JcclxuXHJcblxyXG4iLCJcclxudmFyIHBpMiA9IE1hdGguUEkgKiAyO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVGlueS5Qb2ludCgwLCAwKTtcclxuICAgIHRoaXMuc2NhbGUgPSBuZXcgVGlueS5Qb2ludCgxLCAxKTtcclxuICAgIHRoaXMucGl2b3QgPSBuZXcgVGlueS5Qb2ludCgwLCAwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAwO1xyXG4gICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSAxO1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4gICAgdGhpcy5fc3IgPSAwO1xyXG4gICAgdGhpcy5fY3IgPSAxO1xyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IGZhbHNlO1xyXG59O1xyXG5cclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQmFzZU9iamVjdDJEO1xyXG5cclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZiAodGhpcy5wYXJlbnQpXHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlKCB0aGlzIClcclxuXHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbnVsbDtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCAnd29ybGRWaXNpYmxlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBpdGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgZG9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghaXRlbS52aXNpYmxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUoaXRlbSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCAnY2FjaGVBc0JpdG1hcCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fY2FjaGVBc0JpdG1hcDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICghdGhpcy5wYXJlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBzb21lIG1hdHJpeCByZWZzIGZvciBlYXN5IGFjY2Vzc1xyXG4gICAgdmFyIHB0ID0gdGhpcy5wYXJlbnQud29ybGRUcmFuc2Zvcm07XHJcbiAgICB2YXIgd3QgPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIC8vIHRlbXBvcmFyeSBtYXRyaXggdmFyaWFibGVzXHJcbiAgICB2YXIgYSwgYiwgYywgZCwgdHgsIHR5O1xyXG5cclxuICAgIC8vIHNvIGlmIHJvdGF0aW9uIGlzIGJldHdlZW4gMCB0aGVuIHdlIGNhbiBzaW1wbGlmeSB0aGUgbXVsdGlwbGljYXRpb24gcHJvY2Vzcy4uXHJcbiAgICBpZiAodGhpcy5yb3RhdGlvbiAlIHBpMilcclxuICAgIHtcclxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHJvdGF0aW9uIGlzIHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91cyByZW5kZXIuIFRoaXMgbWVhbnMgd2Ugb25seSBuZWVkIHRvIHVzZSBzaW4gYW5kIGNvcyB3aGVuIHJvdGF0aW9uIGFjdHVhbGx5IGNoYW5nZXNcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbiAhPT0gdGhpcy5yb3RhdGlvbkNhY2hlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkNhY2hlID0gdGhpcy5yb3RhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fc3IgPSBNYXRoLnNpbih0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fY3IgPSBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbWF0cml4IHZhbHVlcyBvZiB0aGUgZGlzcGxheW9iamVjdCBiYXNlZCBvbiBpdHMgdHJhbnNmb3JtIHByb3BlcnRpZXMuLlxyXG4gICAgICAgIGEgID0gIHRoaXMuX2NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGIgID0gIHRoaXMuX3NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGMgID0gLXRoaXMuX3NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIGQgID0gIHRoaXMuX2NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIHR4ID0gIHRoaXMucG9zaXRpb24ueDtcclxuICAgICAgICB0eSA9ICB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIHBpdm90Li4gbm90IG9mdGVuIHVzZWQgc28gZ2VhcmVkIHRvd2FyZHMgdGhhdCBmYWN0IVxyXG4gICAgICAgIGlmICh0aGlzLnBpdm90LnggfHwgdGhpcy5waXZvdC55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHggLT0gdGhpcy5waXZvdC54ICogYSArIHRoaXMucGl2b3QueSAqIGM7XHJcbiAgICAgICAgICAgIHR5IC09IHRoaXMucGl2b3QueCAqIGIgKyB0aGlzLnBpdm90LnkgKiBkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uY2F0IHRoZSBwYXJlbnQgbWF0cml4IHdpdGggdGhlIG9iamVjdHMgdHJhbnNmb3JtLlxyXG4gICAgICAgIHd0LmEgID0gYSAgKiBwdC5hICsgYiAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmIgID0gYSAgKiBwdC5iICsgYiAgKiBwdC5kO1xyXG4gICAgICAgIHd0LmMgID0gYyAgKiBwdC5hICsgZCAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgID0gYyAgKiBwdC5iICsgZCAgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICAvLyBsZXRzIGRvIHRoZSBmYXN0IHZlcnNpb24gYXMgd2Uga25vdyB0aGVyZSBpcyBubyByb3RhdGlvbi4uXHJcbiAgICAgICAgYSAgPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgZCAgPSB0aGlzLnNjYWxlLnk7XHJcblxyXG4gICAgICAgIHR4ID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy5waXZvdC54ICogYTtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueSAtIHRoaXMucGl2b3QueSAqIGQ7XHJcblxyXG4gICAgICAgIHd0LmEgID0gYSAgKiBwdC5hO1xyXG4gICAgICAgIHd0LmIgID0gYSAgKiBwdC5iO1xyXG4gICAgICAgIHd0LmMgID0gZCAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgID0gZCAgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtdWx0aXBseSB0aGUgYWxwaGFzLi5cclxuICAgIHRoaXMud29ybGRBbHBoYSA9IHRoaXMuYWxwaGEgKiB0aGlzLnBhcmVudC53b3JsZEFscGhhO1xyXG5cclxufTtcclxuXHJcbi8vIHBlcmZvcm1hbmNlIGluY3JlYXNlIHRvIGF2b2lkIHVzaW5nIGNhbGwuLiAoMTB4IGZhc3RlcilcclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0gPSBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKG1hdHJpeClcclxue1xyXG4gICAgbWF0cml4ID0gbWF0cml4Oy8vanVzdCB0byBnZXQgcGFzc2VkIGpzIGhpbnRpbmcgKGFuZCBwcmVzZXJ2ZSBpbmhlcml0YW5jZSlcclxuICAgIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5nZXRCb3VuZHMoVGlueS5pZGVudGl0eU1hdHJpeCk7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZ2VuZXJhdGVUZXh0dXJlID0gZnVuY3Rpb24ocmVzb2x1dGlvbiwgcmVuZGVyZXIpXHJcbntcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwLCByZW5kZXJlciwgcmVzb2x1dGlvbik7XHJcbiAgICBcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LnR4ID0gLWJvdW5kcy54O1xyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHkgPSAtYm91bmRzLnk7XHJcbiAgICBcclxuICAgIHJlbmRlclRleHR1cmUucmVuZGVyKHRoaXMsIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4KTtcclxuXHJcbiAgICByZXR1cm4gcmVuZGVyVGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVDYWNoZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxufTtcclxuXHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudG9HbG9iYWwgPSBmdW5jdGlvbihwb3NpdGlvbilcclxue1xyXG4gICAgLy8gZG9uJ3QgbmVlZCB0byB1W2RhdGUgdGhlIGxvdFxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICByZXR1cm4gdGhpcy53b3JsZFRyYW5zZm9ybS5hcHBseShwb3NpdGlvbik7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudG9Mb2NhbCA9IGZ1bmN0aW9uKHBvc2l0aW9uLCBmcm9tKVxyXG57XHJcbiAgICBpZiAoZnJvbSlcclxuICAgIHtcclxuICAgICAgICBwb3NpdGlvbiA9IGZyb20udG9HbG9iYWwocG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvbid0IG5lZWQgdG8gdVtkYXRlIHRoZSBsb3RcclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLndvcmxkVHJhbnNmb3JtLmFwcGx5SW52ZXJzZShwb3NpdGlvbik7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX3JlbmRlckNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsIHJlbmRlclNlc3Npb24pO1xyXG4gICAgXHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsXHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVuZGVyVGV4dHVyZSA9IG5ldyBUaW55LlJlbmRlclRleHR1cmUoYm91bmRzLndpZHRoIHwgMCwgYm91bmRzLmhlaWdodCB8IDApOy8vLCByZW5kZXJTZXNzaW9uLnJlbmRlcmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHJlbmRlclRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUucmVzaXplKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuICAgIFxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUucmVuZGVyKHRoaXMsIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LCB0cnVlKTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnggPSAtKCBib3VuZHMueCAvIGJvdW5kcy53aWR0aCApO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLSggYm91bmRzLnkgLyBib3VuZHMuaGVpZ2h0ICk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICghdGhpcy5fY2FjaGVkU3ByaXRlKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUuZGVzdHJveSh0cnVlKTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsO1xyXG59O1xyXG5cclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUsICd4Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCAneScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTsiLCJUaW55LkdyYXBoaWNzRGF0YSA9IGZ1bmN0aW9uKGxpbmVXaWR0aCwgbGluZUNvbG9yLCBsaW5lQWxwaGEsIGZpbGxDb2xvciwgZmlsbEFscGhhLCBmaWxsLCBzaGFwZSkge1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcbiAgICB0aGlzLmxpbmVDb2xvciA9IGxpbmVDb2xvcjtcclxuICAgIHRoaXMubGluZUFscGhhID0gbGluZUFscGhhO1xyXG4gICAgdGhpcy5fbGluZVRpbnQgPSBsaW5lQ29sb3I7XHJcbiAgICB0aGlzLmZpbGxDb2xvciA9IGZpbGxDb2xvcjtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gZmlsbEFscGhhO1xyXG4gICAgdGhpcy5fZmlsbFRpbnQgPSBmaWxsQ29sb3I7XHJcbiAgICB0aGlzLmZpbGwgPSBmaWxsO1xyXG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xyXG4gICAgdGhpcy50eXBlID0gc2hhcGUudHlwZTtcclxuXHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzRGF0YS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkdyYXBoaWNzRGF0YTtcclxuXHJcblRpbnkuR3JhcGhpY3NEYXRhLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgR3JhcGhpY3NEYXRhKFxyXG4gICAgICAgIHRoaXMubGluZVdpZHRoLFxyXG4gICAgICAgIHRoaXMubGluZUNvbG9yLFxyXG4gICAgICAgIHRoaXMubGluZUFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbENvbG9yLFxyXG4gICAgICAgIHRoaXMuZmlsbEFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbCxcclxuICAgICAgICB0aGlzLnNoYXBlXHJcbiAgICApO1xyXG5cclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5maWxsQWxwaGEgPSAxO1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSAwO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSAwO1xyXG4gICAgdGhpcy5ncmFwaGljc0RhdGEgPSBbXTtcclxuICAgIHRoaXMudGludCA9IFwiI0ZGRkZGRlwiO1xyXG4gICAgdGhpcy5ibGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcbiAgICB0aGlzLmN1cnJlbnRQYXRoID0gbnVsbDtcclxuICAgIHRoaXMuaXNNYXNrID0gZmFsc2U7XHJcbiAgICB0aGlzLmJvdW5kc1BhZGRpbmcgPSAwO1xyXG5cclxuICAgIHRoaXMuX2xvY2FsQm91bmRzID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsMCwxLDEpO1xyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IGZhbHNlO1xyXG5cclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5PYmplY3QyRC5wcm90b3R5cGUgKTtcclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkdyYXBoaWNzO1xyXG5cclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVTdHlsZSA9IGZ1bmN0aW9uKGxpbmVXaWR0aCwgY29sb3IsIGFscGhhKVxyXG57XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aCB8fCAwO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSBjb2xvciB8fCBcIiMwMDAwMDBcIjtcclxuICAgIHRoaXMubGluZUFscGhhID0gKGFscGhhID09PSB1bmRlZmluZWQpID8gMSA6IGFscGhhO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBoYWxmd2F5IHRocm91Z2ggYSBsaW5lPyBzdGFydCBhIG5ldyBvbmUhXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlBvbHlnb24odGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMuc2xpY2UoLTIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBpdHMgZW1wdHkgc28gbGV0cyBqdXN0IHNldCB0aGUgbGluZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGgubGluZVdpZHRoID0gdGhpcy5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGgubGluZUNvbG9yID0gdGhpcy5saW5lQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGgubGluZUFscGhhID0gdGhpcy5saW5lQWxwaGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbihbeCwgeV0pKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVUbyA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIGlmICghdGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5wdXNoKHgsIHkpO1xyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5xdWFkcmF0aWNDdXJ2ZVRvID0gZnVuY3Rpb24oY3BYLCBjcFksIHRvWCwgdG9ZKVxyXG57XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHhhLFxyXG4gICAgICAgIHlhLFxyXG4gICAgICAgIG4gPSAyMCxcclxuICAgICAgICBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDJdO1xyXG4gICAgdmFyIGZyb21ZID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXTtcclxuICAgIHZhciBqID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG47ICsraSlcclxuICAgIHtcclxuICAgICAgICBqID0gaSAvIG47XHJcblxyXG4gICAgICAgIHhhID0gZnJvbVggKyAoIChjcFggLSBmcm9tWCkgKiBqICk7XHJcbiAgICAgICAgeWEgPSBmcm9tWSArICggKGNwWSAtIGZyb21ZKSAqIGogKTtcclxuXHJcbiAgICAgICAgcG9pbnRzLnB1c2goIHhhICsgKCAoKGNwWCArICggKHRvWCAtIGNwWCkgKiBqICkpIC0geGEpICogaiApLFxyXG4gICAgICAgICAgICAgICAgICAgICB5YSArICggKChjcFkgKyAoICh0b1kgLSBjcFkpICogaiApKSAtIHlhKSAqIGogKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYmV6aWVyQ3VydmVUbyA9IGZ1bmN0aW9uKGNwWCwgY3BZLCBjcFgyLCBjcFkyLCB0b1gsIHRvWSlcclxue1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzID0gWzAsIDBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuID0gMjAsXHJcbiAgICAgICAgZHQsXHJcbiAgICAgICAgZHQyLFxyXG4gICAgICAgIGR0MyxcclxuICAgICAgICB0MixcclxuICAgICAgICB0MyxcclxuICAgICAgICBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICB2YXIgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aC0yXTtcclxuICAgIHZhciBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoLTFdO1xyXG4gICAgdmFyIGogPSAwO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG47ICsraSlcclxuICAgIHtcclxuICAgICAgICBqID0gaSAvIG47XHJcblxyXG4gICAgICAgIGR0ID0gKDEgLSBqKTtcclxuICAgICAgICBkdDIgPSBkdCAqIGR0O1xyXG4gICAgICAgIGR0MyA9IGR0MiAqIGR0O1xyXG5cclxuICAgICAgICB0MiA9IGogKiBqO1xyXG4gICAgICAgIHQzID0gdDIgKiBqO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBvaW50cy5wdXNoKCBkdDMgKiBmcm9tWCArIDMgKiBkdDIgKiBqICogY3BYICsgMyAqIGR0ICogdDIgKiBjcFgyICsgdDMgKiB0b1gsXHJcbiAgICAgICAgICAgICAgICAgICAgIGR0MyAqIGZyb21ZICsgMyAqIGR0MiAqIGogKiBjcFkgKyAzICogZHQgKiB0MiAqIGNwWTIgKyB0MyAqIHRvWSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYXJjVG8gPSBmdW5jdGlvbih4MSwgeTEsIHgyLCB5MiwgcmFkaXVzKVxyXG57XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMucHVzaCh4MSwgeTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyh4MSwgeTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyxcclxuICAgICAgICBmcm9tWCA9IHBvaW50c1twb2ludHMubGVuZ3RoLTJdLFxyXG4gICAgICAgIGZyb21ZID0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMV0sXHJcbiAgICAgICAgYTEgPSBmcm9tWSAtIHkxLFxyXG4gICAgICAgIGIxID0gZnJvbVggLSB4MSxcclxuICAgICAgICBhMiA9IHkyICAgLSB5MSxcclxuICAgICAgICBiMiA9IHgyICAgLSB4MSxcclxuICAgICAgICBtbSA9IE1hdGguYWJzKGExICogYjIgLSBiMSAqIGEyKTtcclxuXHJcbiAgICBpZiAobW0gPCAxLjBlLTggfHwgcmFkaXVzID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChwb2ludHNbcG9pbnRzLmxlbmd0aC0yXSAhPT0geDEgfHwgcG9pbnRzW3BvaW50cy5sZW5ndGgtMV0gIT09IHkxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2goeDEsIHkxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRkID0gYTEgKiBhMSArIGIxICogYjEsXHJcbiAgICAgICAgICAgIGNjID0gYTIgKiBhMiArIGIyICogYjIsXHJcbiAgICAgICAgICAgIHR0ID0gYTEgKiBhMiArIGIxICogYjIsXHJcbiAgICAgICAgICAgIGsxID0gcmFkaXVzICogTWF0aC5zcXJ0KGRkKSAvIG1tLFxyXG4gICAgICAgICAgICBrMiA9IHJhZGl1cyAqIE1hdGguc3FydChjYykgLyBtbSxcclxuICAgICAgICAgICAgajEgPSBrMSAqIHR0IC8gZGQsXHJcbiAgICAgICAgICAgIGoyID0gazIgKiB0dCAvIGNjLFxyXG4gICAgICAgICAgICBjeCA9IGsxICogYjIgKyBrMiAqIGIxLFxyXG4gICAgICAgICAgICBjeSA9IGsxICogYTIgKyBrMiAqIGExLFxyXG4gICAgICAgICAgICBweCA9IGIxICogKGsyICsgajEpLFxyXG4gICAgICAgICAgICBweSA9IGExICogKGsyICsgajEpLFxyXG4gICAgICAgICAgICBxeCA9IGIyICogKGsxICsgajIpLFxyXG4gICAgICAgICAgICBxeSA9IGEyICogKGsxICsgajIpLFxyXG4gICAgICAgICAgICBzdGFydEFuZ2xlID0gTWF0aC5hdGFuMihweSAtIGN5LCBweCAtIGN4KSxcclxuICAgICAgICAgICAgZW5kQW5nbGUgICA9IE1hdGguYXRhbjIocXkgLSBjeSwgcXggLSBjeCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXJjKGN4ICsgeDEsIGN5ICsgeTEsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGIxICogYTIgPiBiMiAqIGExKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmFyYyA9IGZ1bmN0aW9uKGN4LCBjeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSlcclxue1xyXG4gICAgLy8gIElmIHdlIGRvIHRoaXMgd2UgY2FuIG5ldmVyIGRyYXcgYSBmdWxsIGNpcmNsZVxyXG4gICAgaWYgKHN0YXJ0QW5nbGUgPT09IGVuZEFuZ2xlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgYW50aWNsb2Nrd2lzZSA9PT0gJ3VuZGVmaW5lZCcpIHsgYW50aWNsb2Nrd2lzZSA9IGZhbHNlOyB9XHJcblxyXG4gICAgaWYgKCFhbnRpY2xvY2t3aXNlICYmIGVuZEFuZ2xlIDw9IHN0YXJ0QW5nbGUpXHJcbiAgICB7XHJcbiAgICAgICAgZW5kQW5nbGUgKz0gTWF0aC5QSSAqIDI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhbnRpY2xvY2t3aXNlICYmIHN0YXJ0QW5nbGUgPD0gZW5kQW5nbGUpXHJcbiAgICB7XHJcbiAgICAgICAgc3RhcnRBbmdsZSArPSBNYXRoLlBJICogMjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3dlZXAgPSBhbnRpY2xvY2t3aXNlID8gKHN0YXJ0QW5nbGUgLSBlbmRBbmdsZSkgKiAtMSA6IChlbmRBbmdsZSAtIHN0YXJ0QW5nbGUpO1xyXG4gICAgdmFyIHNlZ3MgPSAgTWF0aC5jZWlsKE1hdGguYWJzKHN3ZWVwKSAvIChNYXRoLlBJICogMikpICogNDA7XHJcblxyXG4gICAgLy8gIFN3ZWVwIGNoZWNrIC0gbW92ZWQgaGVyZSBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gZG8gdGhlIG1vdmVUbyBiZWxvdyBpZiB0aGUgYXJjIGZhaWxzXHJcbiAgICBpZiAoc3dlZXAgPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0YXJ0WCA9IGN4ICsgTWF0aC5jb3Moc3RhcnRBbmdsZSkgKiByYWRpdXM7XHJcbiAgICB2YXIgc3RhcnRZID0gY3kgKyBNYXRoLnNpbihzdGFydEFuZ2xlKSAqIHJhZGl1cztcclxuXHJcbiAgICBpZiAoYW50aWNsb2Nrd2lzZSAmJiB0aGlzLmZpbGxpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oY3gsIGN5KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIGN1cnJlbnRQYXRoIHdpbGwgYWx3YXlzIGV4aXN0IGFmdGVyIGNhbGxpbmcgYSBtb3ZlVG9cclxuICAgIHZhciBwb2ludHMgPSB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cztcclxuXHJcbiAgICB2YXIgdGhldGEgPSBzd2VlcCAvIChzZWdzICogMik7XHJcbiAgICB2YXIgdGhldGEyID0gdGhldGEgKiAyO1xyXG5cclxuICAgIHZhciBjVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XHJcbiAgICB2YXIgc1RoZXRhID0gTWF0aC5zaW4odGhldGEpO1xyXG4gICAgXHJcbiAgICB2YXIgc2VnTWludXMgPSBzZWdzIC0gMTtcclxuXHJcbiAgICB2YXIgcmVtYWluZGVyID0gKHNlZ01pbnVzICUgMSkgLyBzZWdNaW51cztcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzZWdNaW51czsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZWFsID0gIGkgKyByZW1haW5kZXIgKiBpO1xyXG4gICAgXHJcbiAgICAgICAgdmFyIGFuZ2xlID0gKCh0aGV0YSkgKyBzdGFydEFuZ2xlICsgKHRoZXRhMiAqIHJlYWwpKTtcclxuXHJcbiAgICAgICAgdmFyIGMgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgICAgdmFyIHMgPSAtTWF0aC5zaW4oYW5nbGUpO1xyXG5cclxuICAgICAgICBwb2ludHMucHVzaCgoIChjVGhldGEgKiAgYykgKyAoc1RoZXRhICogcykgKSAqIHJhZGl1cyArIGN4LFxyXG4gICAgICAgICAgICAgICAgICAgICggKGNUaGV0YSAqIC1zKSArIChzVGhldGEgKiBjKSApICogcmFkaXVzICsgY3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYmVnaW5GaWxsID0gZnVuY3Rpb24oY29sb3IsIGFscGhhKVxyXG57XHJcbiAgICB0aGlzLmZpbGxpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBjb2xvciB8fCBcIiMwMDAwMDBcIjtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gKGFscGhhID09PSB1bmRlZmluZWQpID8gMSA6IGFscGhhO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPD0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbCA9IHRoaXMuZmlsbGluZztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5maWxsQ29sb3IgPSB0aGlzLmZpbGxDb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5maWxsQWxwaGEgPSB0aGlzLmZpbGxBbHBoYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5lbmRGaWxsID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmZpbGxpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gbnVsbDtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gMTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSZWN0ID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodClcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdCA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cylcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUm91bmRlZFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdDIgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbnsgICBcclxuICAgIHZhciBzaGFwZSA9IG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG4gICAgc2hhcGUudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOO1xyXG4gICAgdGhpcy5kcmF3U2hhcGUoc2hhcGUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdDaXJjbGUgPSBmdW5jdGlvbih4LCB5LCBkaWFtZXRlcilcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuQ2lyY2xlKHgsIHksIGRpYW1ldGVyKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3RWxsaXBzZSA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LkVsbGlwc2UoeCwgeSwgd2lkdGgsIGhlaWdodCkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1BvbHlnb24gPSBmdW5jdGlvbihwYXRoKVxyXG57XHJcbiAgICAvLyBwcmV2ZW50cyBhbiBhcmd1bWVudCBhc3NpZ25tZW50IGRlb3B0XHJcbiAgICAvLyBzZWUgc2VjdGlvbiAzLjE6IGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzLW1hbmFnaW5nLWFyZ3VtZW50c1xyXG4gICAgdmFyIHBvaW50cyA9IHBhdGg7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBvaW50cykpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gcHJldmVudHMgYW4gYXJndW1lbnQgbGVhayBkZW9wdFxyXG4gICAgICAgIC8vIHNlZSBzZWN0aW9uIDMuMjogaHR0cHM6Ly9naXRodWIuY29tL3BldGthYW50b25vdi9ibHVlYmlyZC93aWtpL09wdGltaXphdGlvbi1raWxsZXJzIzMtbWFuYWdpbmctYXJndW1lbnRzXHJcbiAgICAgICAgcG9pbnRzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7ICsraSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvaW50c1tpXSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbihwb2ludHMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IDA7XHJcbiAgICB0aGlzLmZpbGxpbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhID0gW107XHJcbiAgICB0aGlzLnVwZGF0ZUxvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRlc3Ryb3lDaGlsZHJlbilcclxue1xyXG4gICAgVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmdlbmVyYXRlVGV4dHVyZSA9IGZ1bmN0aW9uKHJlc29sdXRpb24pXHJcbntcclxuICAgIHJlc29sdXRpb24gPSByZXNvbHV0aW9uIHx8IDE7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XHJcbiAgIFxyXG4gICAgdmFyIGNhbnZhc0J1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcihib3VuZHMud2lkdGggKiByZXNvbHV0aW9uLCBib3VuZHMuaGVpZ2h0ICogcmVzb2x1dGlvbik7XHJcbiAgICBcclxuICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICB0ZXh0dXJlLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xyXG5cclxuICAgIGNhbnZhc0J1ZmZlci5jb250ZXh0LnNjYWxlKHJlc29sdXRpb24sIHJlc29sdXRpb24pO1xyXG5cclxuICAgIGNhbnZhc0J1ZmZlci5jb250ZXh0LnRyYW5zbGF0ZSgtYm91bmRzLngsLWJvdW5kcy55KTtcclxuICAgIFxyXG4gICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLCBjYW52YXNCdWZmZXIuY29udGV4dCk7XHJcblxyXG4gICAgcmV0dXJuIHRleHR1cmU7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZiAodGhpcy5pc01hc2sgPT09IHRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRoZSB0aW50IGhhcyBjaGFuZ2VkLCBzZXQgdGhlIGdyYXBoaWNzIG9iamVjdCB0byBkaXJ0eS5cclxuICAgIGlmICh0aGlzLl9wcmV2VGludCAhPT0gdGhpcy50aW50KSB7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3ByZXZUaW50ID0gdGhpcy50aW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlZFNwcml0ZURpcnR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuICAgXHJcbiAgICAgICAgICAgIC8vIHdlIHdpbGwgYWxzbyBuZWVkIHRvIHVwZGF0ZSB0aGUgdGV4dHVyZVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhY2hlZFNwcml0ZVRleHR1cmUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbHBoYSA9IHRoaXMuYWxwaGE7XHJcbiAgICAgICAgVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSwgcmVuZGVyU2Vzc2lvbik7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuICAgICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICBjb250ZXh0LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5jICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHkgKiByZXNvbHV0aW9uKTtcclxuXHJcbiAgICAgICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgIC8vIHNpbXBsZSByZW5kZXIgY2hpbGRyZW4hXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbihtYXRyaXgpXHJcbntcclxuICAgIGlmKCF0aGlzLl9jdXJyZW50Qm91bmRzIHx8IHRoaXMuX2JvdW5kc0RpcnR5KVxyXG4gICAge1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gYW4gZW1wdHkgb2JqZWN0IGlmIHRoZSBpdGVtIGlzIGEgbWFzayFcclxuICAgICAgICBpZiAoIXRoaXMucmVuZGVyYWJsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fYm91bmRzRGlydHkgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxCb3VuZHMoKTtcclxuICAgICAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9sb2NhbEJvdW5kcztcclxuXHJcbiAgICB2YXIgdzAgPSBib3VuZHMueDtcclxuICAgIHZhciB3MSA9IGJvdW5kcy53aWR0aCArIGJvdW5kcy54O1xyXG5cclxuICAgIHZhciBoMCA9IGJvdW5kcy55O1xyXG4gICAgdmFyIGgxID0gYm91bmRzLmhlaWdodCArIGJvdW5kcy55O1xyXG5cclxuICAgIHZhciB3b3JsZFRyYW5zZm9ybSA9IG1hdHJpeCB8fCB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciBhID0gd29ybGRUcmFuc2Zvcm0uYTtcclxuICAgIHZhciBiID0gd29ybGRUcmFuc2Zvcm0uYjtcclxuICAgIHZhciBjID0gd29ybGRUcmFuc2Zvcm0uYztcclxuICAgIHZhciBkID0gd29ybGRUcmFuc2Zvcm0uZDtcclxuICAgIHZhciB0eCA9IHdvcmxkVHJhbnNmb3JtLnR4O1xyXG4gICAgdmFyIHR5ID0gd29ybGRUcmFuc2Zvcm0udHk7XHJcblxyXG4gICAgdmFyIHgxID0gYSAqIHcxICsgYyAqIGgxICsgdHg7XHJcbiAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICB2YXIgeDIgPSBhICogdzAgKyBjICogaDEgKyB0eDtcclxuICAgIHZhciB5MiA9IGQgKiBoMSArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgdmFyIHkzID0gZCAqIGgwICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgdmFyIHg0ID0gIGEgKiB3MSArIGMgKiBoMCArIHR4O1xyXG4gICAgdmFyIHk0ID0gIGQgKiBoMCArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgIHZhciBtYXhYID0geDE7XHJcbiAgICB2YXIgbWF4WSA9IHkxO1xyXG5cclxuICAgIHZhciBtaW5YID0geDE7XHJcbiAgICB2YXIgbWluWSA9IHkxO1xyXG5cclxuICAgIG1pblggPSB4MiA8IG1pblggPyB4MiA6IG1pblg7XHJcbiAgICBtaW5YID0geDMgPCBtaW5YID8geDMgOiBtaW5YO1xyXG4gICAgbWluWCA9IHg0IDwgbWluWCA/IHg0IDogbWluWDtcclxuXHJcbiAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgbWF4WCA9IHgyID4gbWF4WCA/IHgyIDogbWF4WDtcclxuICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICBtYXhYID0geDQgPiBtYXhYID8geDQgOiBtYXhYO1xyXG5cclxuICAgIG1heFkgPSB5MiA+IG1heFkgPyB5MiA6IG1heFk7XHJcbiAgICBtYXhZID0geTMgPiBtYXhZID8geTMgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHk0ID4gbWF4WSA/IHk0IDogbWF4WTtcclxuXHJcbiAgICB0aGlzLl9ib3VuZHMueCA9IG1pblg7XHJcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuXHJcbiAgICB0aGlzLl9ib3VuZHMueSA9IG1pblk7XHJcbiAgICB0aGlzLl9ib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRCb3VuZHM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24oIHBvaW50IClcclxue1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hcHBseUludmVyc2UocG9pbnQsICB0ZW1wUG9pbnQpO1xyXG5cclxuICAgIHZhciBncmFwaGljc0RhdGEgPSB0aGlzLmdyYXBoaWNzRGF0YTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgaWYgKCFkYXRhLmZpbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG9ubHkgZGVhbCB3aXRoIGZpbGxzLi5cclxuICAgICAgICBpZiAoZGF0YS5zaGFwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICggZGF0YS5zaGFwZS5jb250YWlucyggdGVtcFBvaW50LngsIHRlbXBQb2ludC55ICkgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS51cGRhdGVMb2NhbEJvdW5kcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIG1pblggPSBJbmZpbml0eTtcclxuICAgIHZhciBtYXhYID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5ZID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICBpZiAodGhpcy5ncmFwaGljc0RhdGEubGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzaGFwZSwgcG9pbnRzLCB4LCB5LCB3LCBoO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ3JhcGhpY3NEYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdyYXBoaWNzRGF0YVtpXTtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBkYXRhLnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBsaW5lV2lkdGggPSBkYXRhLmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgc2hhcGUgPSBkYXRhLnNoYXBlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SRUNUIHx8IHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDIHx8IHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4ID0gc2hhcGUueCAtIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICB5ID0gc2hhcGUueSAtIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICB3ID0gc2hhcGUud2lkdGggKyBsaW5lV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUuaGVpZ2h0ICsgbGluZVdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblggPSB4IDwgbWluWCA/IHggOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSA8IG1pblkgPyB5IDogbWluWTtcclxuICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgaCA+IG1heFkgPyB5ICsgaCA6IG1heFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICAgICAgeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgICAgICB3ID0gc2hhcGUucmFkaXVzICsgbGluZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIGggPSBzaGFwZS5yYWRpdXMgKyBsaW5lV2lkdGggLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblggPSB4IC0gdyA8IG1pblggPyB4IC0gdyA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICBtYXhYID0geCArIHcgPiBtYXhYID8geCArIHcgOiBtYXhYO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblkgPSB5IC0gaCA8IG1pblkgPyB5IC0gaCA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0geSArIGggPiBtYXhZID8geSArIGggOiBtYXhZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5FTElQKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgICAgIHkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLndpZHRoICsgbGluZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIGggPSBzaGFwZS5oZWlnaHQgKyBsaW5lV2lkdGggLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblggPSB4IC0gdyA8IG1pblggPyB4IC0gdyA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICBtYXhYID0geCArIHcgPiBtYXhYID8geCArIHcgOiBtYXhYO1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblkgPSB5IC0gaCA8IG1pblkgPyB5IC0gaCA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0geSArIGggPiBtYXhZID8geSArIGggOiBtYXhZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gUE9MWSAtIGFzc3VtZXMgcG9pbnRzIGFyZSBzZXF1ZW50aWFsLCBub3QgUG9pbnQgb2JqZWN0c1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcG9pbnRzLmxlbmd0aDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2ludHNbal0gaW5zdGFuY2VvZiBUaW55LlBvaW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHBvaW50c1tqXS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9pbnRzW2pdLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwb2ludHNbaiArIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBwb2ludHMubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5YID0geCAtIGxpbmVXaWR0aCA8IG1pblggPyB4IC0gbGluZVdpZHRoIDogbWluWDtcclxuICAgICAgICAgICAgICAgICAgICBtYXhYID0geCArIGxpbmVXaWR0aCA+IG1heFggPyB4ICsgbGluZVdpZHRoIDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluWSA9IHkgLSBsaW5lV2lkdGggPCBtaW5ZID8geSAtIGxpbmVXaWR0aCA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBsaW5lV2lkdGggPiBtYXhZID8geSArIGxpbmVXaWR0aCA6IG1heFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgbWluWCA9IDA7XHJcbiAgICAgICAgbWF4WCA9IDA7XHJcbiAgICAgICAgbWluWSA9IDA7XHJcbiAgICAgICAgbWF4WSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhZGRpbmcgPSB0aGlzLmJvdW5kc1BhZGRpbmc7XHJcbiAgICBcclxuICAgIHRoaXMuX2xvY2FsQm91bmRzLnggPSBtaW5YIC0gcGFkZGluZztcclxuICAgIHRoaXMuX2xvY2FsQm91bmRzLndpZHRoID0gKG1heFggLSBtaW5YKSArIHBhZGRpbmcgKiAyO1xyXG5cclxuICAgIHRoaXMuX2xvY2FsQm91bmRzLnkgPSBtaW5ZIC0gcGFkZGluZztcclxuICAgIHRoaXMuX2xvY2FsQm91bmRzLmhlaWdodCA9IChtYXhZIC0gbWluWSkgKyBwYWRkaW5nICogMjtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXNCdWZmZXIuY2FudmFzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBuZXcgVGlueS5TcHJpdGUodGV4dHVyZSk7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlciA9IGNhbnZhc0J1ZmZlcjtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLnJlc2l6ZShib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldmVyYWdlIHRoZSBhbmNob3IgdG8gYWNjb3VudCBmb3IgdGhlIG9mZnNldCBvZiB0aGUgZWxlbWVudFxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci54ID0gLShib3VuZHMueCAvIGJvdW5kcy53aWR0aCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnkgPSAtKGJvdW5kcy55IC8gYm91bmRzLmhlaWdodCk7XHJcblxyXG4gICAgLy8gdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5jb250ZXh0LnNhdmUoKTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dC50cmFuc2xhdGUoLWJvdW5kcy54LCAtYm91bmRzLnkpO1xyXG4gICAgXHJcbiAgICAvLyBtYWtlIHN1cmUgd2Ugc2V0IHRoZSBhbHBoYSBvZiB0aGUgZ3JhcGhpY3MgdG8gMSBmb3IgdGhlIHJlbmRlci4uIFxyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuXHJcbiAgICAvLyBub3cgcmVuZGVyIHRoZSBncmFwaGljLi5cclxuICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcywgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5jb250ZXh0KTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbHBoYSA9IHRoaXMuYWxwaGE7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB0ZXh0dXJlIHNpemUgYmFzZWQgb24gY2FudmFzIHNpemVcclxuICpcclxuICogQG1ldGhvZCB1cGRhdGVDYWNoZWRTcHJpdGVUZXh0dXJlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS51cGRhdGVDYWNoZWRTcHJpdGVUZXh0dXJlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgY2FjaGVkU3ByaXRlID0gdGhpcy5fY2FjaGVkU3ByaXRlO1xyXG4gICAgdmFyIHRleHR1cmUgPSBjYWNoZWRTcHJpdGUudGV4dHVyZTtcclxuICAgIHZhciBjYW52YXMgPSBjYWNoZWRTcHJpdGUuYnVmZmVyLmNhbnZhcztcclxuXHJcbiAgICB0ZXh0dXJlLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgdGV4dHVyZS5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgdGV4dHVyZS5jcm9wLndpZHRoID0gdGV4dHVyZS5mcmFtZS53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRleHR1cmUuY3JvcC5oZWlnaHQgPSB0ZXh0dXJlLmZyYW1lLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgY2FjaGVkU3ByaXRlLl93aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGNhY2hlZFNwcml0ZS5faGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZXN0cm95cyBhIHByZXZpb3VzIGNhY2hlZCBzcHJpdGUuXHJcbiAqXHJcbiAqIEBtZXRob2QgZGVzdHJveUNhY2hlZFNwcml0ZVxyXG4gKi9cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZGVzdHJveUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUuZGVzdHJveSh0cnVlKTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3U2hhcGUgPSBmdW5jdGlvbihzaGFwZSlcclxue1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY2hlY2sgY3VycmVudCBwYXRoIVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPD0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY3NEYXRhLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRQYXRoID0gbnVsbDtcclxuXHJcbiAgICAvLyAgSGFuZGxlIG1peGVkLXR5cGUgcG9seWdvbnNcclxuICAgIGlmIChzaGFwZSBpbnN0YW5jZW9mIFRpbnkuUG9seWdvbilcclxuICAgIHtcclxuICAgICAgICBzaGFwZS5mbGF0dGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRhdGEgPSBuZXcgVGlueS5HcmFwaGljc0RhdGEodGhpcy5saW5lV2lkdGgsIHRoaXMubGluZUNvbG9yLCB0aGlzLmxpbmVBbHBoYSwgdGhpcy5maWxsQ29sb3IsIHRoaXMuZmlsbEFscGhhLCB0aGlzLmZpbGxpbmcsIHNoYXBlKTtcclxuICAgIFxyXG4gICAgdGhpcy5ncmFwaGljc0RhdGEucHVzaChkYXRhKTtcclxuXHJcbiAgICBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUE9MWSlcclxuICAgIHtcclxuICAgICAgICBkYXRhLnNoYXBlLmNsb3NlZCA9IHRoaXMuZmlsbGluZztcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYXRoID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5HcmFwaGljcy5wcm90b3R5cGUsIFwiY2FjaGVBc0JpdG1hcFwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX2NhY2hlQXNCaXRtYXA7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSk7IiwiXHJcblRpbnkuT2JqZWN0MkQgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgdGhpcy5fYm91bmRzID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXNrID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlICk7XHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5PYmplY3QyRDtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgJ2lucHV0RW5hYmxlZCcsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgIHJldHVybiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmVuYWJsZWQpXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuLy8gICAgICAgICBpZiAodmFsdWUpIHtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQgPT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB7ZW5hYmxlZDogdHJ1ZSwgcGFyZW50OiB0aGlzfVxyXG4vLyAgICAgICAgICAgICAgICAgVGlueS5FdmVudFRhcmdldC5taXhpbih0aGlzLmlucHV0KVxyXG4vLyAgICAgICAgICAgICB9IGVsc2UgXHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmVuYWJsZWQgPSB0cnVlXHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5pbnB1dCAhPT0gbnVsbCAmJiAodGhpcy5pbnB1dC5lbmFibGVkID0gZmFsc2UpXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsICd3aWR0aCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGg7XHJcblxyXG4gICAgICAgIGlmKHdpZHRoICE9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ID0gdmFsdWUgLyB3aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLnNjYWxlLnkgKiB0aGlzLmdldExvY2FsQm91bmRzKCkuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmdldExvY2FsQm91bmRzKCkuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoaGVpZ2h0ICE9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyBoZWlnaHQgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnkgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgJ21hc2snLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFzaztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaykgdGhpcy5fbWFzay5pc01hc2sgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFzayA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaykgdGhpcy5fbWFzay5pc01hc2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgaSA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChpLS0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgXHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuX2JvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX21hc2sgPSBudWxsO1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5pbnB1dCkgdGhpcy5pbnB1dC5zeXN0ZW0ucmVtb3ZlKHRoaXMpO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oY2hpbGQpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmFkZENoaWxkQXQoY2hpbGQsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoKTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbihjaGlsZCwgaW5kZXgpXHJcbntcclxuICAgIGlmKGluZGV4ID49IDAgJiYgaW5kZXggPD0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2hpbGQucGFyZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50LnJlbW92ZShjaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICBjaGlsZC5nYW1lID0gdGhpcy5nYW1lO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNoaWxkICsgJ2FkZENoaWxkQXQ6IFRoZSBpbmRleCAnKyBpbmRleCArJyBzdXBwbGllZCBpcyBvdXQgb2YgYm91bmRzICcgKyB0aGlzLmNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5zd2FwQ2hpbGRyZW4gPSBmdW5jdGlvbihjaGlsZCwgY2hpbGQyKVxyXG57XHJcbiAgICBpZihjaGlsZCA9PT0gY2hpbGQyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbmRleDEgPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xyXG4gICAgdmFyIGluZGV4MiA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZDIpO1xyXG5cclxuICAgIGlmKGluZGV4MSA8IDAgfHwgaW5kZXgyIDwgMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc3dhcENoaWxkcmVuOiBCb3RoIHRoZSBzdXBwbGllZCBPYmplY3RzIG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hpbGRyZW5baW5kZXgxXSA9IGNoaWxkMjtcclxuICAgIHRoaXMuY2hpbGRyZW5baW5kZXgyXSA9IGNoaWxkO1xyXG5cclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldENoaWxkSW5kZXggPSBmdW5jdGlvbihjaGlsZClcclxue1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc3VwcGxpZWQgT2JqZWN0IG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5zZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24oY2hpbGQsIGluZGV4KVxyXG57XHJcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHN1cHBsaWVkIGluZGV4IGlzIG91dCBvZiBib3VuZHMnKTtcclxuICAgIH1cclxuICAgIHZhciBjdXJyZW50SW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoY3VycmVudEluZGV4LCAxKTsgLy9yZW1vdmUgZnJvbSBvbGQgcG9zaXRpb25cclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7IC8vYWRkIGF0IG5ldyBwb3NpdGlvblxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Q2hpbGRBdCA9IGZ1bmN0aW9uKGluZGV4KVxyXG57XHJcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0Q2hpbGRBdDogU3VwcGxpZWQgaW5kZXggJysgaW5kZXggKycgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkIGxpc3QsIG9yIHRoZSBzdXBwbGllZCBPYmplY3QgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXInKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2luZGV4XTtcclxuICAgIFxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oY2hpbGQpXHJcbntcclxuICAgIHZhciBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZiggY2hpbGQgKTtcclxuICAgIGlmKGluZGV4ID09PSAtMSlyZXR1cm47XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLnJlbW92ZUNoaWxkQXQoIGluZGV4ICk7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0ID0gZnVuY3Rpb24oaW5kZXgpXHJcbntcclxuICAgIHZhciBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRBdCggaW5kZXggKTtcclxuICAgIGNoaWxkLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKCBpbmRleCwgMSApO1xyXG4gICAgcmV0dXJuIGNoaWxkO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRyZW4gPSBmdW5jdGlvbihiZWdpbkluZGV4LCBlbmRJbmRleClcclxue1xyXG4gICAgdmFyIGJlZ2luID0gYmVnaW5JbmRleCB8fCAwO1xyXG4gICAgdmFyIGVuZCA9IHR5cGVvZiBlbmRJbmRleCA9PT0gJ251bWJlcicgPyBlbmRJbmRleCA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgdmFyIHJhbmdlID0gZW5kIC0gYmVnaW47XHJcblxyXG4gICAgaWYgKHJhbmdlID4gMCAmJiByYW5nZSA8PSBlbmQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlbW92ZWQgPSB0aGlzLmNoaWxkcmVuLnNwbGljZShiZWdpbiwgcmFuZ2UpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3ZlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSByZW1vdmVkW2ldO1xyXG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmFuZ2UgPT09IDAgJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ3JlbW92ZUNoaWxkcmVuOiBSYW5nZSBFcnJvciwgbnVtZXJpYyB2YWx1ZXMgYXJlIG91dHNpZGUgdGhlIGFjY2VwdGFibGUgcmFuZ2UnICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKCF0aGlzLnZpc2libGUpcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIGlmKHRoaXMuX2NhY2hlQXNCaXRtYXApcmV0dXJuO1xyXG5cclxuICAgIGZvcih2YXIgaT0wLGo9dGhpcy5jaGlsZHJlbi5sZW5ndGg7IGk8ajsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBwZXJmb3JtYW5jZSBpbmNyZWFzZSB0byBhdm9pZCB1c2luZyBjYWxsLi4gKDEweCBmYXN0ZXIpXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmRpc3BsYXlPYmplY3RDb250YWluZXJVcGRhdGVUcmFuc2Zvcm0gPSBUaW55Lk9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKXJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG4gICAgaWYgKHRoaXMuX2NhY2hlZFNwcml0ZSkgcmV0dXJuIHRoaXMuX2NhY2hlZFNwcml0ZS5nZXRCb3VuZHMoKVxyXG5cclxuICAgIC8vIFRPRE8gdGhlIGJvdW5kcyBoYXZlIGFscmVhZHkgYmVlbiBjYWxjdWxhdGVkIHRoaXMgcmVuZGVyIHNlc3Npb24gc28gcmV0dXJuIHdoYXQgd2UgaGF2ZVxyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIHZhciBtYXhYID0gLUluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIGNoaWxkQm91bmRzO1xyXG4gICAgdmFyIGNoaWxkTWF4WDtcclxuICAgIHZhciBjaGlsZE1heFk7XHJcblxyXG4gICAgdmFyIGNoaWxkVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIGZvcih2YXIgaT0wLGo9dGhpcy5jaGlsZHJlbi5sZW5ndGg7IGk8ajsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIWNoaWxkLnZpc2libGUpY29udGludWU7XHJcblxyXG4gICAgICAgIGNoaWxkVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNoaWxkQm91bmRzID0gdGhpcy5jaGlsZHJlbltpXS5nZXRCb3VuZHMoKTtcclxuICAgICBcclxuICAgICAgICBtaW5YID0gbWluWCA8IGNoaWxkQm91bmRzLnggPyBtaW5YIDogY2hpbGRCb3VuZHMueDtcclxuICAgICAgICBtaW5ZID0gbWluWSA8IGNoaWxkQm91bmRzLnkgPyBtaW5ZIDogY2hpbGRCb3VuZHMueTtcclxuXHJcbiAgICAgICAgY2hpbGRNYXhYID0gY2hpbGRCb3VuZHMud2lkdGggKyBjaGlsZEJvdW5kcy54O1xyXG4gICAgICAgIGNoaWxkTWF4WSA9IGNoaWxkQm91bmRzLmhlaWdodCArIGNoaWxkQm91bmRzLnk7XHJcblxyXG4gICAgICAgIG1heFggPSBtYXhYID4gY2hpbGRNYXhYID8gbWF4WCA6IGNoaWxkTWF4WDtcclxuICAgICAgICBtYXhZID0gbWF4WSA+IGNoaWxkTWF4WSA/IG1heFkgOiBjaGlsZE1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIWNoaWxkVmlzaWJsZSlcclxuICAgICAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIFRPRE86IHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICAvL3RoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcbiAgIFxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgbWF0cml4Q2FjaGUgPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBUaW55LmlkZW50aXR5TWF0cml4O1xyXG5cclxuICAgIGZvcih2YXIgaT0wLGo9dGhpcy5jaGlsZHJlbi5sZW5ndGg7IGk8ajsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XHJcblxyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG1hdHJpeENhY2hlO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyQ2FjaGVkU3ByaXRlKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07IiwiVGlueS5TY2VuZSA9IGZ1bmN0aW9uKGdhbWUpXHJcbntcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCggdGhpcyApO1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxufTtcclxuXHJcblRpbnkuU2NlbmUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5PYmplY3QyRC5wcm90b3R5cGUgKTtcclxuVGlueS5TY2VuZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNjZW5lO1xyXG5cclxuVGlueS5TY2VuZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG59OyIsIlxyXG5UaW55LlNwcml0ZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSlcclxue1xyXG4gICAgVGlueS5PYmplY3QyRC5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYW5jaG9yID0gbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB0aGlzLnNldFRleHR1cmUodGV4dHVyZSwga2V5LCBmYWxzZSk7XHJcblxyXG4gICAgdGhpcy5fd2lkdGggPSAwO1xyXG5cclxuICAgIHRoaXMuX2hlaWdodCA9IDA7XHJcblxyXG4gICAgdGhpcy5fZnJhbWUgPSAwO1xyXG5cclxuICAgIHRoaXMudGludCA9IFwiI0ZGRkZGRlwiO1xyXG5cclxuICAgIHRoaXMuYmxlbmRNb2RlID0gXCJzb3VyY2Utb3ZlclwiO1xyXG5cclxuICAgIGlmICh0aGlzLnRleHR1cmUuaGFzTG9hZGVkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxufTtcclxuXHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuT2JqZWN0MkQucHJvdG90eXBlKTtcclxuVGlueS5TcHJpdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5TcHJpdGU7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnZnJhbWVOYW1lJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZS5mcmFtZS5uYW1lXHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLmZyYW1lLm5hbWUpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuQ2FjaGUudGV4dHVyZVt0aGlzLnRleHR1cmUua2V5ICsgXCIuXCIgKyB2YWx1ZV0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnZnJhbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUubGFzdEZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdmFsdWVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lID4gdGhpcy50ZXh0dXJlLmxhc3RGcmFtZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gMFxyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMudGV4dHVyZS5rZXkgKyBcIi5cIiArIHRoaXMuX2ZyYW1lXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICd3aWR0aCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLnNjYWxlLnkgKiB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSwgdXBkYXRlRGltZW5zaW9uKVxyXG57XHJcbiAgICBpZiAodHlwZW9mIHRleHR1cmUgPT0gXCJzdHJpbmdcIikgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGltYWdlUGF0aCA9IHRleHR1cmU7XHJcblxyXG4gICAgICAgIGlmIChrZXkgIT0gdW5kZWZpbmVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IGltYWdlUGF0aCArIFwiLlwiICsga2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dHVyZSA9IFRpbnkuQ2FjaGUudGV4dHVyZVtpbWFnZVBhdGhdO1xyXG5cclxuICAgICAgICBpZiAoIXRleHR1cmUpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoaW1hZ2VQYXRoKTtcclxuICAgICAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdDYWNoZSBFcnJvcjogaW1hZ2UgJyArIGltYWdlUGF0aCArICcgZG9lc2B0IGZvdW5kIGluIGNhY2hlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRleHR1cmUgPT09IHRleHR1cmUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgdGhpcy5jYWNoZWRUaW50ID0gMHhGRkZGRkY7XHJcblxyXG4gICAgaWYgKHVwZGF0ZURpbWVuc2lvbiA9PT0gdHJ1ZSkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vblRleHR1cmVVcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5vblRleHR1cmVVcGRhdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIC8vIHNvIGlmIF93aWR0aCBpcyAwIHRoZW4gd2lkdGggd2FzIG5vdCBzZXQuLlxyXG4gICAgaWYgKHRoaXMuX3dpZHRoKSB0aGlzLnNjYWxlLnggPSB0aGlzLl93aWR0aCAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIGlmICh0aGlzLl9oZWlnaHQpIHRoaXMuc2NhbGUueSA9IHRoaXMuX2hlaWdodCAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uKHRpbWVyLCBkZWxheSlcclxue1xyXG4gICAgaWYgKHRoaXMudGV4dHVyZS5sYXN0RnJhbWUgJiYgdGhpcy50ZXh0dXJlLmZyYW1lLmluZGV4ICE9IHVuZGVmaW5lZCkgXHJcbiAgICB7XHJcbiAgICAgICAgZGVsYXkgPSBkZWxheSB8fCAodGhpcy50ZXh0dXJlLmZyYW1lLmR1cmF0aW9uIHx8IDEwMCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpb24pIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aW1lci5sb29wKGRlbGF5LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUgKz0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmRlbGF5ID0gZGVsYXkgfHwgKHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDApO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZGVsYXkgPSBkZWxheTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obWF0cml4KVxyXG57XHJcbiAgICB2YXIgd2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggLyB0aGlzLnRleHR1cmUucmVzb2x1dGlvbjtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0IC8gdGhpcy50ZXh0dXJlLnJlc29sdXRpb247XHJcblxyXG4gICAgdmFyIHcwID0gd2lkdGggKiAoMS10aGlzLmFuY2hvci54KTtcclxuICAgIHZhciB3MSA9IHdpZHRoICogLXRoaXMuYW5jaG9yLng7XHJcblxyXG4gICAgdmFyIGgwID0gaGVpZ2h0ICogKDEtdGhpcy5hbmNob3IueSk7XHJcbiAgICB2YXIgaDEgPSBoZWlnaHQgKiAtdGhpcy5hbmNob3IueTtcclxuXHJcbiAgICB2YXIgd29ybGRUcmFuc2Zvcm0gPSBtYXRyaXggfHwgdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG5cclxuICAgIHZhciBtYXhYID0gLUluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIG1pblggPSBJbmZpbml0eTtcclxuICAgIHZhciBtaW5ZID0gSW5maW5pdHk7XHJcblxyXG4gICAgaWYgKGIgPT09IDAgJiYgYyA9PT0gMClcclxuICAgIHtcclxuICAgICAgICAvLyAvLyBzY2FsZSBtYXkgYmUgbmVnYXRpdmUhXHJcbiAgICAgICAgLy8gaWYgKGEgPCAwKSBhICo9IC0xO1xyXG4gICAgICAgIC8vIGlmIChkIDwgMCkgZCAqPSAtMTtcclxuXHJcbiAgICAgICAgLy8gLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBubyByb3RhdGlvbiBnb2luZyBvbiByaWdodD8gUklHSFQ/XHJcbiAgICAgICAgLy8gLy8gaWYgdGhhdHMgdGhlIGNhc2UgdGhlbiB3ZSBjYW4gYXZvaWQgY2hlY2tpbmcgdGhlIGJvdW5kIHZhbHVlcyEgeWF5ICAgICAgICAgXHJcbiAgICAgICAgLy8gbWluWCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgIC8vIG1heFggPSBhICogdzAgKyB0eDtcclxuICAgICAgICAvLyBtaW5ZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgLy8gbWF4WSA9IGQgKiBoMCArIHR5O1xyXG5cclxuICAgICAgICBpZiAoYSA8IDApIHtcclxuICAgICAgICAgICAgbWluWCA9IGEgKiB3MCArIHR4O1xyXG4gICAgICAgICAgICBtYXhYID0gYSAqIHcxICsgdHg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWluWCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgICAgICBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZCA8IDApIHtcclxuICAgICAgICAgICAgbWluWSA9IGQgKiBoMCArIHR5O1xyXG4gICAgICAgICAgICBtYXhZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgICAgICBtYXhZID0gZCAqIGgwICsgdHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHZhciB4MSA9IGEgKiB3MSArIGMgKiBoMSArIHR4O1xyXG4gICAgICAgIHZhciB5MSA9IGQgKiBoMSArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDIgPSBhICogdzAgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTIgPSBkICogaDEgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgzID0gYSAqIHcwICsgYyAqIGgwICsgdHg7XHJcbiAgICAgICAgdmFyIHkzID0gZCAqIGgwICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4NCA9ICBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTQgPSAgZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgICAgIG1pblggPSB4MSA8IG1pblggPyB4MSA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDMgPCBtaW5YID8geDMgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgICAgIG1pblkgPSB5MSA8IG1pblkgPyB5MSA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHkyIDwgbWluWSA/IHkyIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTMgPCBtaW5ZID8geTMgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgICAgIG1heFggPSB4MSA+IG1heFggPyB4MSA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHgyID4gbWF4WCA/IHgyIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4NCA+IG1heFggPyB4NCA6IG1heFg7XHJcblxyXG4gICAgICAgIG1heFkgPSB5MSA+IG1heFkgPyB5MSA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTMgPiBtYXhZID8geTMgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuXHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgLy8gSWYgdGhlIHNwcml0ZSBpcyBub3QgdmlzaWJsZSBvciB0aGUgYWxwaGEgaXMgMCB0aGVuIG5vIG5lZWQgdG8gcmVuZGVyIHRoaXMgZWxlbWVudFxyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCB8fCB0aGlzLnJlbmRlcmFibGUgPT09IGZhbHNlIHx8IHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIDw9IDAgfHwgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IDw9IDApIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSlcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIElnbm9yZSBudWxsIHNvdXJjZXNcclxuICAgIGlmICh0aGlzLnRleHR1cmUudmFsaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlc29sdXRpb24gPSB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiAvIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuXHJcbiAgICAgICAgLy8gIElmIHRoZSB0ZXh0dXJlIGlzIHRyaW1tZWQgd2Ugb2Zmc2V0IGJ5IHRoZSB0cmltIHgveSwgb3RoZXJ3aXNlIHdlIHVzZSB0aGUgZnJhbWUgZGltZW5zaW9uc1xyXG4gICAgICAgIHZhciBkeCA9ICh0aGlzLnRleHR1cmUudHJpbSkgPyB0aGlzLnRleHR1cmUudHJpbS54IC0gdGhpcy5hbmNob3IueCAqIHRoaXMudGV4dHVyZS50cmltLndpZHRoIDogdGhpcy5hbmNob3IueCAqIC10aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICAgICAgdmFyIGR5ID0gKHRoaXMudGV4dHVyZS50cmltKSA/IHRoaXMudGV4dHVyZS50cmltLnkgLSB0aGlzLmFuY2hvci55ICogdGhpcy50ZXh0dXJlLnRyaW0uaGVpZ2h0IDogdGhpcy5hbmNob3IueSAqIC10aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAvLyAgQWxsb3cgZm9yIHBpeGVsIHJvdW5kaW5nXHJcbiAgICAgICAgaWYgKHJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5iLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pIHwgMCxcclxuICAgICAgICAgICAgICAgICh0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKSB8IDApO1xyXG4gICAgICAgICAgICBkeCA9IGR4IHwgMDtcclxuICAgICAgICAgICAgZHkgPSBkeSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eSAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50aW50ICE9PSBcIiNGRkZGRkZcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlZFRpbnQgIT09IHRoaXMudGludClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRUaW50ID0gdGhpcy50aW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW50ZWRUZXh0dXJlID0gVGlueS5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSh0aGlzLCB0aGlzLnRpbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGludGVkVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeSAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCAvIHJlc29sdXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgLyByZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT1ZFUldSSVRFXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59OyIsIlxyXG5UaW55LlRleHQgPSBmdW5jdGlvbih0ZXh0LCBzdHlsZSlcclxue1xyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLmNhbGwodGhpcywgVGlueS5UZXh0dXJlLmZyb21DYW52YXModGhpcy5jYW52YXMpKTtcclxuXHJcbiAgICB0aGlzLnNldFRleHQodGV4dCk7XHJcbiAgICB0aGlzLnNldFN0eWxlKHN0eWxlKTtcclxuXHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlNwcml0ZS5wcm90b3R5cGUpO1xyXG5UaW55LlRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UZXh0O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGV4dC5wcm90b3R5cGUsICd3aWR0aCcsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGV4dC5wcm90b3R5cGUsICdoZWlnaHQnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZih0aGlzLmRpcnR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gIHRoaXMuc2NhbGUueSAqIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnNldFN0eWxlID0gZnVuY3Rpb24oc3R5bGUpXHJcbntcclxuICAgIHN0eWxlID0gc3R5bGUgfHwge307XHJcbiAgICBzdHlsZS5mb250ID0gc3R5bGUuZm9udCB8fCAnYm9sZCAyMHB0IEFyaWFsJztcclxuICAgIHN0eWxlLmZpbGwgPSBzdHlsZS5maWxsIHx8ICdibGFjayc7XHJcbiAgICBzdHlsZS5hbGlnbiA9IHN0eWxlLmFsaWduIHx8ICdsZWZ0JztcclxuICAgIHN0eWxlLnN0cm9rZSA9IHN0eWxlLnN0cm9rZSB8fCAnYmxhY2snO1xyXG4gICAgc3R5bGUuc3Ryb2tlVGhpY2tuZXNzID0gc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIHx8IDA7XHJcbiAgICBzdHlsZS53b3JkV3JhcCA9IHN0eWxlLndvcmRXcmFwIHx8IGZhbHNlO1xyXG4gICAgc3R5bGUubGluZVNwYWNpbmcgPSBzdHlsZS5saW5lU3BhY2luZyB8fCAwXHJcbiAgICBzdHlsZS53b3JkV3JhcFdpZHRoID0gc3R5bGUud29yZFdyYXBXaWR0aCAhPT0gdW5kZWZpbmVkID8gc3R5bGUud29yZFdyYXBXaWR0aCA6IDEwMDtcclxuICAgIFxyXG4gICAgc3R5bGUuZHJvcFNoYWRvdyA9IHN0eWxlLmRyb3BTaGFkb3cgfHwgZmFsc2U7XHJcbiAgICBzdHlsZS5kcm9wU2hhZG93QW5nbGUgPSBzdHlsZS5kcm9wU2hhZG93QW5nbGUgIT09IHVuZGVmaW5lZCA/IHN0eWxlLmRyb3BTaGFkb3dBbmdsZSA6IE1hdGguUEkgLyA2O1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlID0gc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlICE9PSB1bmRlZmluZWQgPyBzdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UgOiA0O1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0NvbG9yID0gc3R5bGUuZHJvcFNoYWRvd0NvbG9yIHx8ICdibGFjayc7XHJcblxyXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xyXG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbih0ZXh0KVxyXG57XHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0LnRvU3RyaW5nKCkgfHwgJyAnO1xyXG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnVwZGF0ZVRleHQgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5zdHlsZS5mb250O1xyXG5cclxuICAgIHZhciBvdXRwdXRUZXh0ID0gdGhpcy50ZXh0O1xyXG5cclxuICAgIC8vIHdvcmQgd3JhcFxyXG4gICAgLy8gcHJlc2VydmUgb3JpZ2luYWwgdGV4dFxyXG4gICAgaWYodGhpcy5zdHlsZS53b3JkV3JhcClvdXRwdXRUZXh0ID0gdGhpcy53b3JkV3JhcCh0aGlzLnRleHQpO1xyXG5cclxuICAgIC8vc3BsaXQgdGV4dCBpbnRvIGxpbmVzXHJcbiAgICB2YXIgbGluZXMgPSBvdXRwdXRUZXh0LnNwbGl0KC8oPzpcXHJcXG58XFxyfFxcbikvKTtcclxuXHJcbiAgICAvL2NhbGN1bGF0ZSB0ZXh0IHdpZHRoXHJcbiAgICB2YXIgbGluZVdpZHRocyA9IFtdO1xyXG4gICAgdmFyIG1heExpbmVXaWR0aCA9IDA7XHJcbiAgICB2YXIgZm9udFByb3BlcnRpZXMgPSB0aGlzLmRldGVybWluZUZvbnRQcm9wZXJ0aWVzKHRoaXMuc3R5bGUuZm9udCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsaW5lV2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQobGluZXNbaV0pLndpZHRoO1xyXG4gICAgICAgIGxpbmVXaWR0aHNbaV0gPSBsaW5lV2lkdGg7XHJcbiAgICAgICAgbWF4TGluZVdpZHRoID0gTWF0aC5tYXgobWF4TGluZVdpZHRoLCBsaW5lV2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB3aWR0aCA9IG1heExpbmVXaWR0aCArIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzO1xyXG4gICAgaWYodGhpcy5zdHlsZS5kcm9wU2hhZG93KXdpZHRoICs9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gKCB3aWR0aCArIHRoaXMuY29udGV4dC5saW5lV2lkdGggKSAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIFxyXG4gICAgLy9jYWxjdWxhdGUgdGV4dCBoZWlnaHRcclxuICAgIHZhciBsaW5lSGVpZ2h0ID0gZm9udFByb3BlcnRpZXMuZm9udFNpemUgKyB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyArIHRoaXMuc3R5bGUubGluZVNwYWNpbmc7XHJcbiBcclxuICAgIHZhciBoZWlnaHQgPSBsaW5lSGVpZ2h0ICogbGluZXMubGVuZ3RoO1xyXG4gICAgaWYodGhpcy5zdHlsZS5kcm9wU2hhZG93KWhlaWdodCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSAoaGVpZ2h0IC0gdGhpcy5zdHlsZS5saW5lU3BhY2luZykgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKCB0aGlzLnJlc29sdXRpb24sIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgaWYobmF2aWdhdG9yLmlzQ29jb29uSlMpIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwwLHRoaXMuY2FudmFzLndpZHRoLHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICBcclxuICAgIC8vIHVzZWQgZm9yIGRlYnVnZ2luZy4uXHJcbiAgICAvL3RoaXMuY29udGV4dC5maWxsU3R5bGUgPVwiI0ZGMDAwMFwiXHJcbiAgICAvL3RoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5zdHlsZS5mb250O1xyXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5zdHlsZS5zdHJva2U7XHJcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3M7XHJcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnO1xyXG4gICAgdGhpcy5jb250ZXh0Lm1pdGVyTGltaXQgPSAyO1xyXG5cclxuICAgIC8vdGhpcy5jb250ZXh0LmxpbmVKb2luID0gJ3JvdW5kJztcclxuXHJcbiAgICB2YXIgbGluZVBvc2l0aW9uWDtcclxuICAgIHZhciBsaW5lUG9zaXRpb25ZO1xyXG5cclxuICAgIGlmKHRoaXMuc3R5bGUuZHJvcFNoYWRvdylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5zdHlsZS5kcm9wU2hhZG93Q29sb3I7XHJcblxyXG4gICAgICAgIHZhciB4U2hhZG93T2Zmc2V0ID0gTWF0aC5zaW4odGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcbiAgICAgICAgdmFyIHlTaGFkb3dPZmZzZXQgPSBNYXRoLmNvcyh0aGlzLnN0eWxlLmRyb3BTaGFkb3dBbmdsZSkgKiB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWCA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMjtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWSA9ICh0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDIgKyBpICogbGluZUhlaWdodCkgKyBmb250UHJvcGVydGllcy5hc2NlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnN0eWxlLmFsaWduID09PSAncmlnaHQnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnN0eWxlLmFsaWduID09PSAnY2VudGVyJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSAobWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXSkgLyAyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnN0eWxlLmZpbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCArIHhTaGFkb3dPZmZzZXQsIGxpbmVQb3NpdGlvblkgKyB5U2hhZG93T2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vICBpZihkcm9wU2hhZG93KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3NldCBjYW52YXMgdGV4dCBzdHlsZXNcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLnN0eWxlLmZpbGw7XHJcbiAgICBcclxuICAgIC8vZHJhdyBsaW5lcyBsaW5lIGJ5IGxpbmVcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICBsaW5lUG9zaXRpb25YID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyO1xyXG4gICAgICAgIGxpbmVQb3NpdGlvblkgPSAodGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyICsgaSAqIGxpbmVIZWlnaHQpICsgZm9udFByb3BlcnRpZXMuYXNjZW50O1xyXG5cclxuICAgICAgICBpZih0aGlzLnN0eWxlLmFsaWduID09PSAncmlnaHQnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSBtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdjZW50ZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSAobWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXSkgLyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5zdHlsZS5zdHJva2UgJiYgdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCwgbGluZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnN0eWxlLmZpbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblgsIGxpbmVQb3NpdGlvblkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vICBpZihkcm9wU2hhZG93KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlVGV4dHVyZSgpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0dXJlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLnRleHR1cmUud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMudGV4dHVyZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbiAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCA9IHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0ID0gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLl93aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZih0aGlzLmRpcnR5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMsIHJlbmRlclNlc3Npb24pO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5kZXRlcm1pbmVGb250UHJvcGVydGllcyA9IGZ1bmN0aW9uKGZvbnRTdHlsZSlcclxue1xyXG4gICAgdmFyIHByb3BlcnRpZXMgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZVtmb250U3R5bGVdO1xyXG5cclxuICAgIGlmKCFwcm9wZXJ0aWVzKVxyXG4gICAge1xyXG4gICAgICAgIHByb3BlcnRpZXMgPSB7fTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2FudmFzID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzO1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ29udGV4dDtcclxuXHJcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0eWxlO1xyXG5cclxuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmNlaWwoY29udGV4dC5tZWFzdXJlVGV4dCgnfE3DiXEnKS53aWR0aCk7XHJcbiAgICAgICAgdmFyIGJhc2VsaW5lID0gTWF0aC5jZWlsKGNvbnRleHQubWVhc3VyZVRleHQoJ3xNw4lxJykud2lkdGgpO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSAyICogYmFzZWxpbmU7XHJcblxyXG4gICAgICAgIGJhc2VsaW5lID0gYmFzZWxpbmUgKiAxLjQgfCAwO1xyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjZjAwJztcclxuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250U3R5bGU7XHJcblxyXG4gICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoJ3xNw4lxJywgMCwgYmFzZWxpbmUpO1xyXG5cclxuICAgICAgICB2YXIgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcclxuICAgICAgICB2YXIgcGl4ZWxzID0gaW1hZ2VkYXRhLmxlbmd0aDtcclxuICAgICAgICB2YXIgbGluZSA9IHdpZHRoICogNDtcclxuXHJcbiAgICAgICAgdmFyIGksIGo7XHJcblxyXG4gICAgICAgIHZhciBpZHggPSAwO1xyXG4gICAgICAgIHZhciBzdG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGFzY2VudC4gc2NhbiBmcm9tIHRvcCB0byBib3R0b20gdW50aWwgd2UgZmluZCBhIG5vbiByZWQgcGl4ZWxcclxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBiYXNlbGluZTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbGluZTsgaiArPSA0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZWRhdGFbaWR4ICsgal0gIT09IDI1NSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighc3RvcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWR4ICs9IGxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvcGVydGllcy5hc2NlbnQgPSBiYXNlbGluZSAtIGk7XHJcblxyXG4gICAgICAgIGlkeCA9IHBpeGVscyAtIGxpbmU7XHJcbiAgICAgICAgc3RvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBkZXNjZW50LiBzY2FuIGZyb20gYm90dG9tIHRvIHRvcCB1bnRpbCB3ZSBmaW5kIGEgbm9uIHJlZCBwaXhlbFxyXG4gICAgICAgIGZvcihpID0gaGVpZ2h0OyBpID4gYmFzZWxpbmU7IGktLSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGxpbmU7IGogKz0gNClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VkYXRhW2lkeCArIGpdICE9PSAyNTUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXN0b3ApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkeCAtPSBsaW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3BlcnRpZXMuZGVzY2VudCA9IGkgLSBiYXNlbGluZTtcclxuICAgICAgICAvL1RPRE8gbWlnaHQgbmVlZCBhIHR3ZWFrLiBraW5kIG9mIGEgdGVtcCBmaXghXHJcbiAgICAgICAgcHJvcGVydGllcy5kZXNjZW50ICs9IDY7XHJcbiAgICAgICAgcHJvcGVydGllcy5mb250U2l6ZSA9IHByb3BlcnRpZXMuYXNjZW50ICsgcHJvcGVydGllcy5kZXNjZW50O1xyXG5cclxuICAgICAgICBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZVtmb250U3R5bGVdID0gcHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUud29yZFdyYXAgPSBmdW5jdGlvbih0ZXh0KVxyXG57XHJcbiAgICAvLyBHcmVlZHkgd3JhcHBpbmcgYWxnb3JpdGhtIHRoYXQgd2lsbCB3cmFwIHdvcmRzIGFzIHRoZSBsaW5lIGdyb3dzIGxvbmdlclxyXG4gICAgLy8gdGhhbiBpdHMgaG9yaXpvbnRhbCBib3VuZHMuXHJcbiAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNwYWNlTGVmdCA9IHRoaXMuc3R5bGUud29yZFdyYXBXaWR0aDtcclxuICAgICAgICB2YXIgd29yZHMgPSBsaW5lc1tpXS5zcGxpdCgnICcpO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgd29yZHMubGVuZ3RoOyBqKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgd29yZFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHdvcmRzW2pdKS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIHdvcmRXaWR0aFdpdGhTcGFjZSA9IHdvcmRXaWR0aCArIHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCgnICcpLndpZHRoO1xyXG4gICAgICAgICAgICBpZihqID09PSAwIHx8IHdvcmRXaWR0aFdpdGhTcGFjZSA+IHNwYWNlTGVmdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gU2tpcCBwcmludGluZyB0aGUgbmV3bGluZSBpZiBpdCdzIHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBsaW5lIHRoYXQgaXNcclxuICAgICAgICAgICAgICAgIC8vIGdyZWF0ZXIgdGhhbiB0aGUgd29yZCB3cmFwIHdpZHRoLlxyXG4gICAgICAgICAgICAgICAgaWYoaiA+IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXG4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHdvcmRzW2pdO1xyXG4gICAgICAgICAgICAgICAgc3BhY2VMZWZ0ID0gdGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoIC0gd29yZFdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VMZWZ0IC09IHdvcmRXaWR0aFdpdGhTcGFjZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnICcgKyB3b3Jkc1tqXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGkgPCBsaW5lcy5sZW5ndGgtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFxuJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbihtYXRyaXgpXHJcbntcclxuICAgIGlmKHRoaXMuZGlydHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBUaW55LlNwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzLmNhbGwodGhpcywgbWF0cml4KTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgLy8gbWFrZSBzdXJlIHRvIHJlc2V0IHRoZSB0aGUgY29udGV4dCBhbmQgY2FudmFzLi4gZG9udCB3YW50IHRoaXMgaGFuZ2luZyBhcm91bmQgaW4gbWVtb3J5IVxyXG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcclxuICAgIHRoaXMuY2FudmFzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnRleHR1cmUuZGVzdHJveSgpO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZSA9IHt9O1xyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ29udGV4dCA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyIsIlxyXG5UaW55LkNhbnZhc01hc2tNYW5hZ2VyID0gZnVuY3Rpb24oKVxyXG57XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc01hc2tNYW5hZ2VyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzTWFza01hbmFnZXI7XHJcblxyXG5UaW55LkNhbnZhc01hc2tNYW5hZ2VyLnByb3RvdHlwZS5wdXNoTWFzayA9IGZ1bmN0aW9uKG1hc2tEYXRhLCByZW5kZXJTZXNzaW9uKVxyXG57XHJcblx0dmFyIGNvbnRleHQgPSByZW5kZXJTZXNzaW9uLmNvbnRleHQ7XHJcblxyXG4gICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICBcclxuICAgIHZhciBjYWNoZUFscGhhID0gbWFza0RhdGEuYWxwaGE7XHJcbiAgICB2YXIgdHJhbnNmb3JtID0gbWFza0RhdGEud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIHJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgY29udGV4dC5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtLmEgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmMgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmQgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50eSAqIHJlc29sdXRpb24pO1xyXG5cclxuICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3NNYXNrKG1hc2tEYXRhLCBjb250ZXh0KTtcclxuXHJcbiAgICBjb250ZXh0LmNsaXAoKTtcclxuXHJcbiAgICBtYXNrRGF0YS53b3JsZEFscGhhID0gY2FjaGVBbHBoYTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLnBvcE1hc2sgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQucmVzdG9yZSgpO1xyXG59OyIsIlxyXG5UaW55LkNhbnZhc1JlbmRlcmVyID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgb3B0aW9ucylcclxueyAgIFxyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAob3B0aW9ucy5yZXNvbHV0aW9uICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMucmVzb2x1dGlvbiA6IDEpO1xyXG5cclxuICAgIHRoaXMuY2xlYXJCZWZvcmVSZW5kZXIgPSAob3B0aW9ucy5jbGVhckJlZm9yZVJlbmRlciAhPSB1bmRlZmluZWQgPyBvcHRpb25zLmNsZWFyQmVmb3JlUmVuZGVyIDogdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy50cmFuc3BhcmVudCA9IChvcHRpb25zLnRyYW5zcGFyZW50ICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMudHJhbnNwYXJlbnQgOiBmYWxzZSk7XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplID0gb3B0aW9ucy5hdXRvUmVzaXplIHx8IGZhbHNlO1xyXG5cclxuICAgIC8vIHRoaXMud2lkdGggPSB3aWR0aCB8fCA4MDA7XHJcbiAgICAvLyB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCA2MDA7XHJcblxyXG4gICAgLy8gdGhpcy53aWR0aCAqPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB0aGlzLmhlaWdodCAqPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgaWYgKCFUaW55LmRlZmF1bHRSZW5kZXJlcikgVGlueS5kZWZhdWx0UmVuZGVyZXIgPSB0aGlzO1xyXG5cclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50ID0gb3B0aW9ucy5kb21FbGVtZW50IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiY2FudmFzXCIgKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB2aWV3LmdldENvbnRleHQoIFwiMmRcIiwgeyBhbHBoYTogdGhpcy50cmFuc3BhcmVudCB9ICk7XHJcblxyXG4gICAgLy8gdmlldy53aWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB2aWV3LmhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMuc2V0U2l6ZSh3aWR0aCB8fCA4MDAsIGhlaWdodCB8fCA2MDApO1xyXG5cclxuICAgIHRoaXMuc2V0Q2xlYXJDb2xvcihcIiNmZmZmZmZcIik7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzTWFza01hbmFnZXIpXHJcbiAgICAgICAgdGhpcy5tYXNrTWFuYWdlciA9IG5ldyBUaW55LkNhbnZhc01hc2tNYW5hZ2VyKCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcclxuICAgICAgICBtYXNrTWFuYWdlcjogdGhpcy5tYXNrTWFuYWdlcixcclxuICAgICAgICBzbW9vdGhQcm9wZXJ0eTogbnVsbCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJZiB0cnVlIFBpeGkgd2lsbCBNYXRoLmZsb29yKCkgeC95IHZhbHVlcyB3aGVuIHJlbmRlcmluZywgc3RvcHBpbmcgcGl4ZWwgaW50ZXJwb2xhdGlvbi5cclxuICAgICAgICAgKiBIYW5keSBmb3IgY3Jpc3AgcGl4ZWwgYXJ0IGFuZCBzcGVlZCBvbiBsZWdhY3kgZGV2aWNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJvdW5kUGl4ZWxzOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgaWYoXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJvSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJtc0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzUmVuZGVyZXI7XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24oY29sb3IpXHJcbnsgICBcclxuICAgIHRoaXMuY2xlYXJDb2xvciA9IGNvbG9yO1xyXG4gICAgXHJcbiAgICAvLyBpZiAoY29sb3IgPT09IG51bGwpIHtcclxuICAgIC8vICAgICB0aGlzLmNsZWFyQ29sb3IgPSBudWxsO1xyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvciB8fCAweDAwMDAwMDtcclxuICAgIC8vIC8vIHRoaXMuYmFja2dyb3VuZENvbG9yU3BsaXQgPSBUaW55LmhleDJyZ2IodGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgLy8gdmFyIGhleCA9IHRoaXMuY2xlYXJDb2xvci50b1N0cmluZygxNik7XHJcbiAgICAvLyBoZXggPSAnMDAwMDAwJy5zdWJzdHIoMCwgNiAtIGhleC5sZW5ndGgpICsgaGV4O1xyXG4gICAgLy8gdGhpcy5fY2xlYXJDb2xvciA9ICcjJyArIGhleDtcclxuXHJcbn07XHJcblxyXG4vLyBUaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRQaXhlbEFydCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgIHZhciBjYW52YXMgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcbiAgICBcclxuLy8gICAgIHZhciB0eXBlcyA9IFsgJ29wdGltaXplU3BlZWQnLCAnLW1vei1jcmlzcC1lZGdlcycsICctby1jcmlzcC1lZGdlcycsICctd2Via2l0LW9wdGltaXplLWNvbnRyYXN0JywgJ29wdGltaXplLWNvbnRyYXN0JywgJ2NyaXNwLWVkZ2VzJywgJ3BpeGVsYXRlZCcgXTtcclxuXHJcbi8vICAgICB0eXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIGNhbnZhcy5zdHlsZVsnaW1hZ2UtcmVuZGVyaW5nJ10gPSB0eXBlO1xyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgY2FudmFzLnN0eWxlLm1zSW50ZXJwb2xhdGlvbk1vZGUgPSAnbmVhcmVzdC1uZWlnaGJvcic7XHJcbi8vICAgICB0aGlzLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSB0cnVlO1xyXG4vLyB9XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihzY2VuZSlcclxue1xyXG4gICAgXHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xyXG5cclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gXCJzb3VyY2Utb3ZlclwiO1xyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcclxuXHJcbiAgICBpZiAobmF2aWdhdG9yLmlzQ29jb29uSlMgJiYgdGhpcy5kb21FbGVtZW50LnNjcmVlbmNhbnZhcylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodGhpcy5jbGVhckJlZm9yZVJlbmRlcilcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy50cmFuc3BhcmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jbGVhckNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5yZW5kZXJPYmplY3Qoc2NlbmUpO1xyXG5cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihyZW1vdmVWaWV3KVxyXG57ICAgXHJcbiAgICBpZiAodHlwZW9mIHJlbW92ZVZpZXcgPT09IFwidW5kZWZpbmVkXCIpIHsgcmVtb3ZlVmlldyA9IHRydWU7IH1cclxuXHJcbiAgICBpZiAocmVtb3ZlVmlldyAmJiB0aGlzLmRvbUVsZW1lbnQucGFyZW50Tm9kZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZG9tRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5tYXNrTWFuYWdlciA9IG51bGw7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24gPSBudWxsO1xyXG5cclxuICAgIGlmIChUaW55LmRlZmF1bHRSZW5kZXJlciA9PT0gdGhpcykgVGlueS5kZWZhdWx0UmVuZGVyZXIgPSBudWxsO1xyXG5cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB2YXIgdmlldyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbiAgICB2aWV3LndpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgIHZpZXcuaGVpZ2h0ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgIHZpZXcuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuICAgICAgICB2aWV3LnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldFBpeGVsUmF0aW8gPSBmdW5jdGlvbihyZXNvbHV0aW9uKVxyXG57XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xyXG5cclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgIHZpZXcud2lkdGggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgdmlldy5oZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlck9iamVjdCA9IGZ1bmN0aW9uKGRpc3BsYXlPYmplY3QsIGNvbnRleHQpXHJcbntcclxuICAgIGRpc3BsYXlPYmplY3QudXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcy5jb250ZXh0O1xyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICBkaXNwbGF5T2JqZWN0LnJlbmRlcih0aGlzLnJlbmRlclNlc3Npb24pO1xyXG59OyIsIlxyXG5UaW55LkNhbnZhc1RpbnRlciA9IGZ1bmN0aW9uKClcclxue1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS50aW50Q2FjaGUgPSB7fVxyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSA9IGZ1bmN0aW9uKHNwcml0ZSwgY29sb3IpXHJcbntcclxuICAgIHZhciB0ZXh0dXJlID0gc3ByaXRlLnRleHR1cmU7XHJcblxyXG4gICAgaWYgKHRleHR1cmUudGludENhY2hlW2NvbG9yXSkgcmV0dXJuIHRleHR1cmUudGludENhY2hlW2NvbG9yXTtcclxuXHJcbiAgICB2YXIgY2FudmFzID0gVGlueS5DYW52YXNUaW50ZXIuY2FudmFzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICBcclxuICAgIFRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QodGV4dHVyZSwgY29sb3IsIGNhbnZhcyk7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzVGludGVyLmNvbnZlcnRUaW50VG9JbWFnZSlcclxuICAgIHtcclxuICAgICAgICAvLyBpcyB0aGlzIGJldHRlcj9cclxuICAgICAgICB2YXIgdGludEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGludEltYWdlLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuXHJcbiAgICAgICAgLy8gdGV4dHVyZS50aW50Q2FjaGVbc3RyaW5nQ29sb3JdID0gdGludEltYWdlO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG5cclxuICAgICAgICBUaW55LkNhbnZhc1RpbnRlci5jYW52YXMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc1RpbnRlci5jYWNoZVRpbnQpIHRleHR1cmUudGludENhY2hlW2NvbG9yXSA9IGNhbnZhcztcclxuXHJcbiAgICByZXR1cm4gY2FudmFzO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseSA9IGZ1bmN0aW9uKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpXHJcbntcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoIFwiMmRcIiApO1xyXG5cclxuICAgIHZhciBjcm9wID0gdGV4dHVyZS5jcm9wO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNyb3Aud2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gY3JvcC5oZWlnaHQ7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGNvbG9yKTtcclxuICAgIFxyXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcbiAgICBcclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJtdWx0aXBseVwiO1xyXG5cclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRleHR1cmUuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tYXRvcFwiO1xyXG5cclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRleHR1cmUuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AuaGVpZ2h0KTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoUGVyUGl4ZWwgPSBmdW5jdGlvbih0ZXh0dXJlLCBjb2xvciwgY2FudmFzKVxyXG57XHJcbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgdmFyIGNyb3AgPSB0ZXh0dXJlLmNyb3A7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gY3JvcC53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBjcm9wLmhlaWdodDtcclxuICBcclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJjb3B5XCI7XHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0ZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgdmFyIHJnYlZhbHVlcyA9IFRpbnkuY29sb3IycmdiKGNvbG9yKTtcclxuICAgIHZhciByID0gcmdiVmFsdWVzWzBdLCBnID0gcmdiVmFsdWVzWzFdLCBiID0gcmdiVmFsdWVzWzJdO1xyXG5cclxuICAgIHZhciBwaXhlbERhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgdmFyIHBpeGVscyA9IHBpeGVsRGF0YS5kYXRhO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGl4ZWxzLmxlbmd0aDsgaSArPSA0KVxyXG4gICAge1xyXG4gICAgICBwaXhlbHNbaSswXSAqPSByO1xyXG4gICAgICBwaXhlbHNbaSsxXSAqPSBnO1xyXG4gICAgICBwaXhlbHNbaSsyXSAqPSBiO1xyXG5cclxuICAgICAgaWYgKCFUaW55LmNhbkhhbmRsZUFscGhhKVxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyIGFscGhhID0gcGl4ZWxzW2krM107XHJcblxyXG4gICAgICAgIHBpeGVsc1tpKzBdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgIHBpeGVsc1tpKzFdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgIHBpeGVsc1tpKzJdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEocGl4ZWxEYXRhLCAwLCAwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrSW52ZXJzZUFscGhhKClcclxue1xyXG4gICAgdmFyIGNhbnZhcyA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcigyLCAxLCB7d2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlfSk7XHJcblxyXG4gICAgY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDEwLCAyMCwgMzAsIDAuNSlcIjtcclxuXHJcbiAgICAvLyAgRHJhdyBhIHNpbmdsZSBwaXhlbFxyXG4gICAgY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgMSwgMSk7XHJcblxyXG4gICAgLy8gIEdldCB0aGUgY29sb3IgdmFsdWVzXHJcbiAgICB2YXIgczEgPSBjYW52YXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgMSwgMSk7XHJcblxyXG4gICAgLy8gIFBsb3QgdGhlbSB0byB4MlxyXG4gICAgY2FudmFzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHMxLCAxLCAwKTtcclxuXHJcbiAgICAvLyAgR2V0IHRob3NlIHZhbHVlc1xyXG4gICAgdmFyIHMyID0gY2FudmFzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDEsIDAsIDEsIDEpO1xyXG5cclxuICAgIC8vICBDb21wYXJlIGFuZCByZXR1cm5cclxuICAgIHJldHVybiAoczIuZGF0YVswXSA9PT0gczEuZGF0YVswXSAmJiBzMi5kYXRhWzFdID09PSBzMS5kYXRhWzFdICYmIHMyLmRhdGFbMl0gPT09IHMxLmRhdGFbMl0gJiYgczIuZGF0YVszXSA9PT0gczEuZGF0YVszXSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjaGVja0JsZW5kTW9kZSAoKVxyXG57XHJcbiAgICB2YXIgcG5nSGVhZCA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFRQUFBQUJBUU1BQUFERDhwMk9BQUFBQTFCTVZFWC8nO1xyXG4gICAgdmFyIHBuZ0VuZCA9ICdBQUFBQ2tsRVFWUUkxMk5nQUFBQUFnQUI0aUc4TXdBQUFBQkpSVTVFcmtKZ2dnPT0nO1xyXG5cclxuICAgIHZhciBtYWdlbnRhID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgbWFnZW50YS5vbmxvYWQgPSBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB5ZWxsb3cgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICAgICAgeWVsbG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDY7XHJcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSAxO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHt3aWxsUmVhZEZyZXF1ZW50bHk6IHRydWV9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5JztcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKG1hZ2VudGEsIDAsIDApO1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh5ZWxsb3csIDIsIDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250ZXh0LmdldEltYWdlRGF0YSgyLCAwLCAxLCAxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDIsIDAsIDEsIDEpLmRhdGE7XHJcblxyXG4gICAgICAgICAgICBUaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzID0gKGRhdGFbMF0gPT09IDI1NSAmJiBkYXRhWzFdID09PSAwICYmIGRhdGFbMl0gPT09IDApO1xyXG4gICAgICAgICAgICBUaW55LkNhbnZhc1RpbnRlci50aW50TWV0aG9kID0gVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB5ZWxsb3cuc3JjID0gcG5nSGVhZCArICcvd0NLeHZSRicgKyBwbmdFbmQ7XHJcbiAgICB9O1xyXG5cclxuICAgIG1hZ2VudGEuc3JjID0gcG5nSGVhZCArICdBUDgwNE9hNicgKyBwbmdFbmQ7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuY29udmVydFRpbnRUb0ltYWdlID0gZmFsc2U7XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci5jYWNoZVRpbnQgPSB0cnVlO1xyXG5cclxuVGlueS5jYW5IYW5kbGVBbHBoYSA9IGNoZWNrSW52ZXJzZUFscGhhKCk7XHJcblxyXG5UaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzID0gY2hlY2tCbGVuZE1vZGUoKTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLnRpbnRNZXRob2QgPSBUaW55LnN1cHBvcnROZXdCbGVuZE1vZGVzID8gVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseSA6ICBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aFBlclBpeGVsO1xyXG4iLCJcclxuVGlueS5DYW52YXNHcmFwaGljcyA9IGZ1bmN0aW9uKClcclxue1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyA9IGZ1bmN0aW9uKGdyYXBoaWNzLCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgd29ybGRBbHBoYSA9IGdyYXBoaWNzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgaWYgKGdyYXBoaWNzLmRpcnR5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXBkYXRlR3JhcGhpY3NUaW50KGdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhW2ldO1xyXG4gICAgICAgIHZhciBzaGFwZSA9IGRhdGEuc2hhcGU7XHJcblxyXG4gICAgICAgIHZhciBmaWxsQ29sb3IgPSBkYXRhLl9maWxsVGludDtcclxuICAgICAgICB2YXIgbGluZUNvbG9yID0gZGF0YS5fbGluZVRpbnQ7XHJcblxyXG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gZGF0YS5saW5lV2lkdGg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGo9MTsgaiA8IHBvaW50cy5sZW5ndGgvMjsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbaiAqIDJdLCBwb2ludHNbaiAqIDIgKyAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzaGFwZS5jbG9zZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IGFyZSB0aGUgc2FtZSBjbG9zZSB0aGUgcGF0aCAtIG11Y2ggbmVhdGVyIDopXHJcbiAgICAgICAgICAgIGlmIChwb2ludHNbMF0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoLTJdICYmIHBvaW50c1sxXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SRUNUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbENvbG9yIHx8IGRhdGEuZmlsbENvbG9yID09PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPIC0gbmVlZCB0byBiZSBVbmRlZmluZWQhXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLnJhZGl1cywwLDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUobGluZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGVsbGlwc2UgY29kZSB0YWtlbiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIxNzI3OTgvaG93LXRvLWRyYXctYW4tb3ZhbC1pbi1odG1sNS1jYW52YXNcclxuXHJcbiAgICAgICAgICAgIHZhciB3ID0gc2hhcGUud2lkdGggKiAyO1xyXG4gICAgICAgICAgICB2YXIgaCA9IHNoYXBlLmhlaWdodCAqIDI7XHJcblxyXG4gICAgICAgICAgICB2YXIgeCA9IHNoYXBlLnggLSB3LzI7XHJcbiAgICAgICAgICAgIHZhciB5ID0gc2hhcGUueSAtIGgvMjtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIga2FwcGEgPSAwLjU1MjI4NDgsXHJcbiAgICAgICAgICAgICAgICBveCA9ICh3IC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgb3kgPSAoaCAvIDIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IHZlcnRpY2FsXHJcbiAgICAgICAgICAgICAgICB4ZSA9IHggKyB3LCAgICAgICAgICAgLy8geC1lbmRcclxuICAgICAgICAgICAgICAgIHllID0geSArIGgsICAgICAgICAgICAvLyB5LWVuZFxyXG4gICAgICAgICAgICAgICAgeG0gPSB4ICsgdyAvIDIsICAgICAgIC8vIHgtbWlkZGxlXHJcbiAgICAgICAgICAgICAgICB5bSA9IHkgKyBoIC8gMjsgICAgICAgLy8geS1taWRkbGVcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHgsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHgsIHltIC0gb3ksIHhtIC0gb3gsIHksIHhtLCB5KTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtICsgb3gsIHksIHhlLCB5bSAtIG95LCB4ZSwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeGUsIHltICsgb3ksIHhtICsgb3gsIHllLCB4bSwgeWUpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gLSBveCwgeWUsIHgsIHltICsgb3ksIHgsIHltKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUobGluZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgIHZhciByeSA9IHNoYXBlLnk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHNoYXBlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gc2hhcGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gc2hhcGUucmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1heFJhZGl1cyA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMiB8IDA7XHJcbiAgICAgICAgICAgIHJhZGl1cyA9IHJhZGl1cyA+IG1heFJhZGl1cyA/IG1heFJhZGl1cyA6IHJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHJ4LCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4LCByeSArIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCwgcnkgKyBoZWlnaHQsIHJ4ICsgcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0LCByeCArIHdpZHRoLCByeSArIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgd2lkdGgsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4ICsgd2lkdGgsIHJ5LCByeCArIHdpZHRoIC0gcmFkaXVzLCByeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHJ4ICsgcmFkaXVzLCByeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCwgcnksIHJ4LCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsQ29sb3IgfHwgZGF0YS5maWxsQ29sb3IgPT09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsQ29sb3IgfHwgZGF0YS5maWxsQ29sb3IgPT09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZUpvaW4gPSBcInJvdW5kXCI7XHJcbiAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gcmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KHJ4ICsgKHJhZGl1cyAvIDIpLCByeSArIChyYWRpdXMgLyAyKSwgd2lkdGggLSByYWRpdXMsIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QocnggKyAocmFkaXVzIC8gMiksIHJ5ICsgKHJhZGl1cyAvIDIpLCB3aWR0aCAtIHJhZGl1cywgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzTWFzayA9IGZ1bmN0aW9uKGdyYXBoaWNzLCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgbGVuID0gZ3JhcGhpY3MuZ3JhcGhpY3NEYXRhLmxlbmd0aDtcclxuXHJcbiAgICBpZiAobGVuID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuICAgICAgICBcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaj0xOyBqIDwgcG9pbnRzLmxlbmd0aC8yOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tqICogMl0sIHBvaW50c1tqICogMiArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IGFyZSB0aGUgc2FtZSBjbG9zZSB0aGUgcGF0aCAtIG11Y2ggbmVhdGVyIDopXHJcbiAgICAgICAgICAgIGlmIChwb2ludHNbMF0gPT09IHBvaW50c1twb2ludHMubGVuZ3RoLTJdICYmIHBvaW50c1sxXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJFQ1QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LnJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPIC0gbmVlZCB0byBiZSBVbmRlZmluZWQhXHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5FTElQKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGVsbGlwc2UgY29kZSB0YWtlbiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIxNzI3OTgvaG93LXRvLWRyYXctYW4tb3ZhbC1pbi1odG1sNS1jYW52YXNcclxuXHJcbiAgICAgICAgICAgIHZhciB3ID0gc2hhcGUud2lkdGggKiAyO1xyXG4gICAgICAgICAgICB2YXIgaCA9IHNoYXBlLmhlaWdodCAqIDI7XHJcblxyXG4gICAgICAgICAgICB2YXIgeCA9IHNoYXBlLnggLSB3LzI7XHJcbiAgICAgICAgICAgIHZhciB5ID0gc2hhcGUueSAtIGgvMjtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYXBwYSA9IDAuNTUyMjg0OCxcclxuICAgICAgICAgICAgICAgIG94ID0gKHcgLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBveSA9IChoIC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcclxuICAgICAgICAgICAgICAgIHhlID0geCArIHcsICAgICAgICAgICAvLyB4LWVuZFxyXG4gICAgICAgICAgICAgICAgeWUgPSB5ICsgaCwgICAgICAgICAgIC8vIHktZW5kXHJcbiAgICAgICAgICAgICAgICB4bSA9IHggKyB3IC8gMiwgICAgICAgLy8geC1taWRkbGVcclxuICAgICAgICAgICAgICAgIHltID0geSArIGggLyAyOyAgICAgICAvLyB5LW1pZGRsZVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeCwgeW0gLSBveSwgeG0gLSBveCwgeSwgeG0sIHkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gKyBveCwgeSwgeGUsIHltIC0gb3ksIHhlLCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4ZSwgeW0gKyBveSwgeG0gKyBveCwgeWUsIHhtLCB5ZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSAtIG94LCB5ZSwgeCwgeW0gKyBveSwgeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDIHx8IGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUNfTEpPSU4pXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF4UmFkaXVzID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyIHwgMDtcclxuICAgICAgICAgICAgcmFkaXVzID0gcmFkaXVzID4gbWF4UmFkaXVzID8gbWF4UmFkaXVzIDogcmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocngsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSArIGhlaWdodCwgcnggKyByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCAtIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnkgKyBoZWlnaHQsIHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnksIHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSwgcngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnVwZGF0ZUdyYXBoaWNzVGludCA9IGZ1bmN0aW9uKGdyYXBoaWNzKVxyXG57XHJcbiAgICBpZiAoZ3JhcGhpY3MudGludCA9PT0gMHhGRkZGRkYpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0aW50UiA9IChncmFwaGljcy50aW50ID4+IDE2ICYgMHhGRikgLyAyNTU7XHJcbiAgICB2YXIgdGludEcgPSAoZ3JhcGhpY3MudGludCA+PiA4ICYgMHhGRikgLyAyNTU7XHJcbiAgICB2YXIgdGludEIgPSAoZ3JhcGhpY3MudGludCAmIDB4RkYpLyAyNTU7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcblxyXG4gICAgICAgIHZhciBmaWxsQ29sb3IgPSBkYXRhLmZpbGxDb2xvciB8IDA7XHJcbiAgICAgICAgdmFyIGxpbmVDb2xvciA9IGRhdGEubGluZUNvbG9yIHwgMDtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgY29sb3JSID0gKGZpbGxDb2xvciA+PiAxNiAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIHZhciBjb2xvckcgPSAoZmlsbENvbG9yID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgICAgICB2YXIgY29sb3JCID0gKGZpbGxDb2xvciAmIDB4RkYpIC8gMjU1OyBcclxuICAgICAgICBjb2xvclIgKj0gdGludFI7XHJcbiAgICAgICAgY29sb3JHICo9IHRpbnRHO1xyXG4gICAgICAgIGNvbG9yQiAqPSB0aW50QjtcclxuICAgICAgICBmaWxsQ29sb3IgPSAoKGNvbG9yUioyNTUgPDwgMTYpICsgKGNvbG9yRyoyNTUgPDwgOCkgKyBjb2xvckIqMjU1KTtcclxuICAgICAgICBjb2xvclIgPSAobGluZUNvbG9yID4+IDE2ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgY29sb3JHID0gKGxpbmVDb2xvciA+PiA4ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgY29sb3JCID0gKGxpbmVDb2xvciAmIDB4RkYpIC8gMjU1OyBcclxuICAgICAgICBjb2xvclIgKj0gdGludFI7XHJcbiAgICAgICAgY29sb3JHICo9IHRpbnRHO1xyXG4gICAgICAgIGNvbG9yQiAqPSB0aW50QjtcclxuICAgICAgICBsaW5lQ29sb3IgPSAoKGNvbG9yUioyNTUgPDwgMTYpICsgKGNvbG9yRyoyNTUgPDwgOCkgKyBjb2xvckIqMjU1KTsgICBcclxuICAgICAgICAqL1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRhdGEuX2ZpbGxUaW50ID0gKCgoZmlsbENvbG9yID4+IDE2ICYgMHhGRikgLyAyNTUgKiB0aW50UioyNTUgPDwgMTYpICsgKChmaWxsQ29sb3IgPj4gOCAmIDB4RkYpIC8gMjU1ICogdGludEcqMjU1IDw8IDgpICsgIChmaWxsQ29sb3IgJiAweEZGKSAvIDI1NSAqIHRpbnRCKjI1NSk7XHJcbiAgICAgICAgZGF0YS5fbGluZVRpbnQgPSAoKChsaW5lQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NSAqIHRpbnRSKjI1NSA8PCAxNikgKyAoKGxpbmVDb2xvciA+PiA4ICYgMHhGRikgLyAyNTUgKiB0aW50RyoyNTUgPDwgOCkgKyAgKGxpbmVDb2xvciAmIDB4RkYpIC8gMjU1ICogdGludEIqMjU1KTtcclxuXHJcbiAgICB9XHJcbn07IiwidmFyIGxpc3RlbmluZ1RvVG91Y2hFdmVudHM7XHJcblxyXG5UaW55LklucHV0ID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50ID0gZ2FtZS5pbnB1dFZpZXc7XHJcblxyXG4gICAgdGhpcy5ib3VuZHMgPSB7eDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMH07XHJcbiAgICB0aGlzLmNhbmRpZGF0ZXMgPSBbXTtcclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG5cclxuICAgIHRoaXMubGFzdE1vdmUgPSBudWxsO1xyXG4gICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmRvd25IYW5kbGVyID0gdGhpcy5kb3duSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IHRoaXMubW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBIYW5kbGVyID0gdGhpcy51cEhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIC8vIHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLnVwSGFuZGxlcik7XHJcblxyXG4gICAgLy8gdmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcclxuXHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbih0aGlzKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRpbnkuSW5wdXQuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIFRpbnkuSW5wdXQuc3lzdGVtc1tpXS5pbml0LmNhbGwodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVCb3VuZHMoKTtcclxufTtcclxuXHJcblRpbnkuSW5wdXQucHJvdG90eXBlID0ge1xyXG5cclxuXHJcbiAgICBhZGQ6IGZ1bmN0aW9uKG9iamVjdCwgb3B0aW9ucykge1xyXG4gICAgICAgIG9iamVjdC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLnN5c3RlbSA9IHRoaXM7XHJcblxyXG4gICAgICAgIG9iamVjdC5pbnB1dCA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKG9iamVjdC5pbnB1dClcclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gob2JqZWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihvYmplY3QpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3QuaW5kZXhPZihvYmplY3QpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlZCA9IHRoaXMubGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIHJlbW92ZWQuaW5wdXQgPSBudWxsO1xyXG4gICAgICAgICAgICByZW1vdmVkLmlucHV0RW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0SGFuZGxlcjogZnVuY3Rpb24obmFtZSwgZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSlcclxuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5nZXRDb29yZHMoZXZlbnQpO1xyXG5cclxuICAgICAgICBpZiAoY29vcmRzICE9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUgIT0gXCJtb3ZlXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuZGlkYXRlcy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5JbnB1dC5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGlueS5JbnB1dC5zeXN0ZW1zW2ldLnByZUhhbmRsZS5jYWxsKHRoaXMsIGNvb3Jkcy54LCBjb29yZHMueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzR29vZCwgb2JqO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhpcy5saXN0Lmxlbmd0aDsgdCsrKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmxpc3RbdF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmlucHV0RW5hYmxlZCB8fCAhb2JqLnBhcmVudCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaW5wdXQuY2hlY2tCb3VuZHMpIGlzR29vZCA9IG9iai5pbnB1dC5jaGVja0JvdW5kcy5jYWxsKHRoaXMsIG9iaiwgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlzR29vZCA9IFRpbnkuSW5wdXQuY2hlY2tCb3VuZHMuY2FsbCh0aGlzLCBvYmosIGNvb3Jkcy54LCBjb29yZHMueSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0dvb2QpIHRoaXMuY2FuZGlkYXRlcy5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgaSA9IHRoaXMuY2FuZGlkYXRlcy5sZW5ndGhcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jYW5kaWRhdGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNhbmRpZGF0ZXNbaV1cclxuICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXRbXCJsYXN0X1wiICsgbmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQobmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09IFwidXBcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IG9iai5pbnB1dFtcImxhc3RfZG93blwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnQgJiYgVGlueS5NYXRoLmRpc3RhbmNlKHBvaW50LngsIHBvaW50LnksIGNvb3Jkcy54LCBjb29yZHMueSkgPCAzMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KFwiY2xpY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmlucHV0LnRyYW5zcGFyZW50KSBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHZhciBvYmogPSB0aGlzLmNhbmRpZGF0ZXNbaSAtIDFdXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgb2JqLmlucHV0W1wibGFzdF9cIiArIG5hbWVdID0ge3g6IGNvb3Jkcy54LCB5OiBjb29yZHMueX1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgb2JqLmlucHV0LmVtaXQobmFtZSwge3g6IGNvb3Jkcy54LCB5OiBjb29yZHMueX0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChuYW1lID09IFwidXBcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YXIgcG9pbnQgPSBvYmouaW5wdXRbXCJsYXN0X2Rvd25cIl1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYgKHBvaW50ICYmIFRpbnkuTWF0aC5kaXN0YW5jZShwb2ludC54LCBwb2ludC55LCBjb29yZHMueCwgY29vcmRzLnkpIDwgMzApXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChcImNsaWNrXCIsIHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbWl0KG5hbWUsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3ZlSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZSA9IGV2ZW50O1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwibW92ZVwiLCBldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcInVwXCIsIHRoaXMubGFzdE1vdmUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkb3duSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGFzdE1vdmUgPSBldmVudDtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcImRvd25cIiwgZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja0hhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwiY2xpY2tcIiwgZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDb29yZHM6IGZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb29yZHMgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT09ICd1bmRlZmluZWQnICYmIGV2ZW50IGluc3RhbmNlb2YgVG91Y2hFdmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RlbmluZ1RvVG91Y2hFdmVudHMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBldmVudC50b3VjaGVzWzBdLmNsaWVudFlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQuY2xpZW50WCAmJiBldmVudC5jbGllbnRZKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBldmVudC5jbGllbnRZXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIE1vdXNlIGV2ZW50XHJcbiAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICB5OiBldmVudC5jbGllbnRZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyAmJiBldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgfHwgY29vcmRzID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICB4OiAoY29vcmRzLnggLSB0aGlzLmJvdW5kcy54KSxcclxuICAgICAgICAgICAgeTogKGNvb3Jkcy55IC0gdGhpcy5ib3VuZHMueSksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlQm91bmRzOiBmdW5jdGlvbigpIFxyXG4gICAge1xyXG4gICAgICAgIGJvdW5kcyA9IHRoaXMuYm91bmRzO1xyXG5cclxuICAgICAgICB2YXIgY2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgYm91bmRzLnggPSBjbGllbnRSZWN0LmxlZnQ7XHJcbiAgICAgICAgYm91bmRzLnkgPSBjbGllbnRSZWN0LnRvcDtcclxuICAgICAgICBib3VuZHMud2lkdGggPSBjbGllbnRSZWN0LndpZHRoO1xyXG4gICAgICAgIGJvdW5kcy5oZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnVwSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy8gdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuSW5wdXQuY2hlY2tCb3VuZHMgPSBmdW5jdGlvbihvYmosIHgsIHkpXHJcbntcclxuICAgIGlmIChvYmoud29ybGRWaXNpYmxlKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChvYmouZ2V0Qm91bmRzKCkuY29udGFpbnMoeCwgeSkpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIChvYmouY2hpbGRyZW4gJiYgb2JqLmNoaWxkcmVuLmxlbmd0aCA+IDApXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCBvYmouY2hpbGRyZW4ubGVuZ3RoOyB0KyspIFxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgX2NoZWNrT25BY3RpdmVPYmplY3RzKG9iai5jaGlsZHJlblt0XSwgeCwgeSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59XHJcblxyXG5UaW55LklucHV0LnN5c3RlbXMgPSBbXTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJpbnB1dFwiLCBUaW55LklucHV0KTsiLCJcclxuVGlueS5DYWNoZSA9IHtcclxuICAgIGltYWdlOiB7fSxcclxuICAgIHRleHR1cmU6IHt9XHJcbn07XHJcblxyXG5UaW55LkxvYWRlciA9IGZ1bmN0aW9uKGdhbWUpXHJcbntcclxuICAgIGdhbWUuY2FjaGUgPSBUaW55LkNhY2hlO1xyXG5cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBjbGVhckNhY2hlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LkNhY2hlLnRleHR1cmUpIFRpbnkuQ2FjaGUudGV4dHVyZVt5XS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIHkgaW4gVGlueS5DYWNoZSkgVGlueS5DYWNoZVt5XSA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBhbGw6IGZ1bmN0aW9uKGFycmF5KSB7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMubGlzdC5jb25jYXQoYXJyYXkpOyBcclxuICAgIH0sXHJcblxyXG4gICAgaW1hZ2U6IGZ1bmN0aW9uKGtleSwgc291cmNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlXCJcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3ByaXRlc2hlZXQ6IGZ1bmN0aW9uKGtleSwgc291cmNlLCBhcmdfMSwgYXJnXzIsIHRvdGFsRnJhbWVzLCBkdXJhdGlvbilcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVzID0ge1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHR5cGU6IFwic3ByaXRlc2hlZXRcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnXzEgPT0gXCJudW1iZXJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlcy53aWR0aCA9IGFyZ18xO1xyXG4gICAgICAgICAgICByZXMuaGVpZ2h0ID0gYXJnXzI7XHJcbiAgICAgICAgICAgIHJlcy50b3RhbCA9IHRvdGFsRnJhbWVzO1xyXG4gICAgICAgICAgICByZXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJnXzEubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlcy5kYXRhID0gYXJnXzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChyZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhdGxhczogZnVuY3Rpb24oa2V5LCBzb3VyY2UsIGF0bGFzRGF0YSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgZGF0YTogYXRsYXNEYXRhLFxyXG4gICAgICAgICAgICB0eXBlOiBcImF0bGFzXCJcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5saXN0O1xyXG5cclxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZ2FtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWROZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHZhciBkb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGxpc3Quc2hpZnQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsb2FkZXIgPSBUaW55LkxvYWRlcltyZXNvdXJjZS50eXBlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2FkZXIpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRlcihyZXNvdXJjZSwgbG9hZGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbm5vdCBmaW5kIGxvYWRlciBmb3IgXCIgKyByZXNvdXJjZS50eXBlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkZWQocmVzb3VyY2UsIGRhdGEpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoICE9IDApIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsb2FkTmV4dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZ2FtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWROZXh0KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkxvYWRlci5hdGxhcyA9IGZ1bmN0aW9uKHJlc291cmNlLCBjYilcclxue1xyXG4gICAgdmFyIGtleSA9IHJlc291cmNlLmtleTtcclxuXHJcbiAgICBUaW55LkxvYWRlci5pbWFnZShyZXNvdXJjZSwgZnVuY3Rpb24ocmVzb3VyY2UsIGltYWdlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNvdXJjZS5kYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHV1aWQgPSBrZXkgKyBcIi5cIiArIHJlc291cmNlLmRhdGFbaV0ubmFtZTtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCByZXNvdXJjZS5kYXRhW2ldKTtcclxuICAgICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXk7XHJcblxyXG4gICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2IoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5UaW55LkxvYWRlci5zcHJpdGVzaGVldCA9IGZ1bmN0aW9uKHJlc291cmNlLCBjYilcclxue1xyXG4gICAgdmFyIGtleSA9IHJlc291cmNlLmtleTtcclxuXHJcbiAgICBUaW55LkxvYWRlci5pbWFnZShyZXNvdXJjZSwgZnVuY3Rpb24ocmVzb3VyY2UsIGltYWdlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHJlc291cmNlLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcmFtZURhdGEgPSByZXNvdXJjZS5kYXRhO1xyXG4gICAgICAgICAgICB2YXIgbGFzdEZyYW1lID0gKGZyYW1lRGF0YS5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGxhc3RGcmFtZTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IGtleSArIFwiLlwiICsgaTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoaW1hZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS54KSxcclxuICAgICAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS55KSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ud2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0uaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogZnJhbWVEYXRhW2ldLmR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmtleSA9IGtleTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUubGFzdEZyYW1lID0gbGFzdEZyYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgIFRpbnkuQ2FjaGUudGV4dHVyZVt1dWlkXSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyYW1lV2lkdGggPSByZXNvdXJjZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGZyYW1lSGVpZ2h0ID0gcmVzb3VyY2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmcmFtZVdpZHRoKSBmcmFtZVdpZHRoID0gTWF0aC5mbG9vcih3aWR0aCAvIChyZXNvdXJjZS5jb2xzIHx8IDEpKTtcclxuICAgICAgICAgICAgaWYgKCFmcmFtZUhlaWdodCkgZnJhbWVIZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCAvIChyZXNvdXJjZS5yb3dzIHx8IDEpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xzID0gTWF0aC5mbG9vcih3aWR0aCAvIGZyYW1lV2lkdGgpO1xyXG4gICAgICAgICAgICB2YXIgcm93cyA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvdGFsID0gY29scyAqIHJvd3M7XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWwgPT09IDApIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc291cmNlLnRvdGFsKSB0b3RhbCA9IE1hdGgubWluKHRvdGFsLCByZXNvdXJjZS50b3RhbCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgeCA9IDA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gMDtcclxuICAgICAgICAgICAgdmFyIGxhc3RGcmFtZSA9IHRvdGFsIC0gMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBrZXkgKyBcIi5cIiArIGk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoaW1hZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGZyYW1lV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBmcmFtZUhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogcmVzb3VyY2UuZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmxhc3RGcmFtZSA9IGxhc3RGcmFtZTtcclxuICAgICAgICAgICAgICAgIFRpbnkuQ2FjaGUudGV4dHVyZVt1dWlkXSA9IHRleHR1cmU7XHJcblxyXG4gICAgICAgICAgICAgICAgeCArPSBmcmFtZVdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh4ICsgZnJhbWVXaWR0aCA+IHdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHkgKz0gZnJhbWVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblRpbnkuTG9hZGVyLmltYWdlID0gZnVuY3Rpb24ocmVzb3VyY2UsIGNiKSBcclxue1xyXG4gICAgLy8gaWYgKFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKSByZXR1cm4gY2IocmVzb3VyY2UsIFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgVGlueS5DYWNoZS5pbWFnZVtyZXNvdXJjZS5rZXldID0gaW1hZ2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2IocmVzb3VyY2UsIGltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGNiKHJlc291cmNlLCBpbWFnZSk7XHJcbiAgICAvLyB9KVxyXG5cclxuICAgIGltYWdlLnNyYyA9IHJlc291cmNlLnNyYztcclxufVxyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcImxvYWRcIiwgVGlueS5Mb2FkZXIpOyIsInZhciBfaXNTZXRUaW1lT3V0LCBfb25Mb29wLCBfdGltZU91dElELCBfcHJldlRpbWUsIF9sYXN0VGltZTtcclxuXHJcbnZhciBub3cgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxufVxyXG5cclxuaWYgKHNlbGYucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJiBzZWxmLnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBub3cgPSBzZWxmLnBlcmZvcm1hbmNlLm5vdy5iaW5kKHNlbGYucGVyZm9ybWFuY2UpO1xyXG59IGVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG5vdyA9IERhdGUubm93O1xyXG59XHJcblxyXG5UaW55LlJBRiA9IGZ1bmN0aW9uIChnYW1lLCBmb3JjZVNldFRpbWVPdXQpXHJcbntcclxuXHJcbiAgICBpZiAoZm9yY2VTZXRUaW1lT3V0ID09PSB1bmRlZmluZWQpIHsgZm9yY2VTZXRUaW1lT3V0ID0gZmFsc2U7IH1cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZm9yY2VTZXRUaW1lT3V0ID0gZm9yY2VTZXRUaW1lT3V0O1xyXG5cclxuICAgIHZhciB2ZW5kb3JzID0gW1xyXG4gICAgICAgICdtcycsXHJcbiAgICAgICAgJ21veicsXHJcbiAgICAgICAgJ3dlYmtpdCcsXHJcbiAgICAgICAgJ28nXHJcbiAgICBdO1xyXG5cclxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IHgrKylcclxuICAgIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XHJcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICAgIH1cclxuXHJcbiAgICBfaXNTZXRUaW1lT3V0ID0gZmFsc2U7XHJcbiAgICBfb25Mb29wID0gbnVsbDtcclxuICAgIF90aW1lT3V0SUQgPSBudWxsO1xyXG5cclxuICAgIF9wcmV2VGltZSA9IDBcclxuICAgIF9sYXN0VGltZSA9IDBcclxufTtcclxuXHJcblRpbnkuUkFGLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKClcclxuICAgIHtcclxuXHJcbiAgICAgICAgX3ByZXZUaW1lID0gbm93KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHRoaXMuZm9yY2VTZXRUaW1lT3V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2lzU2V0VGltZU91dCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBfb25Mb29wID0gZnVuY3Rpb24gKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZVNldFRpbWVvdXQoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cuc2V0VGltZW91dChfb25Mb29wLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2lzU2V0VGltZU91dCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgX29uTG9vcCA9IGZ1bmN0aW9uICgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZVJBRigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX29uTG9vcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVSQUY6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgX2xhc3RUaW1lID0gbm93KClcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX29uTG9vcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWVcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVNldFRpbWVvdXQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgX2xhc3RUaW1lID0gbm93KClcclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuX3VwZGF0ZShNYXRoLmZsb29yKF9sYXN0VGltZSksIF9sYXN0VGltZSAtIF9wcmV2VGltZSk7XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnNldFRpbWVvdXQoX29uTG9vcCwgVGlueS5SQUYudGltZVRvQ2FsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9wcmV2VGltZSA9IF9sYXN0VGltZVxyXG4gICAgfSxcclxuXHJcbiAgICByZXNldDogZnVuY3Rpb24oKSBcclxuICAgIHtcclxuICAgICAgICBfcHJldlRpbWUgPSBub3coKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICBpZiAoX2lzU2V0VGltZU91dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGltZU91dElEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKF90aW1lT3V0SUQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUkFGLnRpbWVUb0NhbGwgPSAxNTsiLCJ2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XHJcblxyXG52YXIgVGltZXIgPSBmdW5jdGlvbihzdGF0dXMsIGF1dG9SZW1vdmUsIGdhbWUsIGNiLCBkZWxheSwgbG9vcCwgbiwgb25jb21wbGV0ZSlcclxue1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuX2NiXyA9IGNiIHx8IG5vb3A7XHJcbiAgICB0aGlzLmRlbGF5ID0gKGRlbGF5ID09IHVuZGVmaW5lZCA/IDEwMDAgOiBkZWxheSk7XHJcbiAgICB0aGlzLmxvb3AgPSBsb29wO1xyXG4gICAgdGhpcy5fY291bnQgPSBuIHx8IDA7XHJcbiAgICB0aGlzLl9yZXBlYXQgPSAodGhpcy5fY291bnQgPiAwKTtcclxuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IGF1dG9SZW1vdmU7XHJcbiAgICB0aGlzLl9vbmNvbXBsZXRlID0gb25jb21wbGV0ZSB8fCBub29wO1xyXG59XHJcblxyXG5UaW1lci5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgIH0sXHJcbiAgICBwYXVzZTogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbihkZWx0YVRpbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdEZyYW1lICs9IGRlbHRhVGltZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFzdEZyYW1lID49IHRoaXMuZGVsYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NiXygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZXBlYXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY291bnQgPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMubG9vcClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvUmVtb3ZlICYmIHRoaXMuZ2FtZS50aW1lci5yZW1vdmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblRpbnkuVGltZXIgPSBUaW1lcjtcclxuXHJcblRpbnkuVGltZXJDcmVhdG9yID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG4gICAgdGhpcy5hdXRvU3RhcnQgPSB0cnVlO1xyXG4gICAgdGhpcy5hdXRvUmVtb3ZlID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGltZXJDcmVhdG9yLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGRlbHRhKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChmdW5jdGlvbih0bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRtLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICByZW1vdmVBbGw6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChmdW5jdGlvbih0bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRtLnN0b3AoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih0bSlcclxuICAgIHtcclxuICAgICAgICB2YXIgaW5kZXhPZiA9IHRoaXMubGlzdC5pbmRleE9mKHRtKTtcclxuICAgICAgICBpZiAoaW5kZXhPZiA+IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdG0uc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4T2YsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZGQ6IGZ1bmN0aW9uKGRlbGF5LCBjYiwgYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChhdXRvc3RhcnQgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1dG9zdGFydCA9IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoKGF1dG9zdGFydCA/IDEgOiAwKSwgKGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZSksIHRoaXMuZ2FtZSwgY2IsIGRlbGF5KTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGxvb3A6IGZ1bmN0aW9uKGRlbGF5LCBjYiwgYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChhdXRvc3RhcnQgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1dG9zdGFydCA9IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoKGF1dG9zdGFydCA/IDEgOiAwKSwgKGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZSksIHRoaXMuZ2FtZSwgY2IsIGRlbGF5LCB0cnVlKTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIHJlcGVhdDogZnVuY3Rpb24oZGVsYXksIG4sIGNiLCBjb21wbGV0ZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoKHRoaXMuYXV0b1N0YXJ0ID8gMSA6IDApLCB0aGlzLmF1dG9SZW1vdmUsIHRoaXMuZ2FtZSwgY2IsIGRlbGF5LCBmYWxzZSwgbiwgY29tcGxldGUpO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGwoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJ0aW1lclwiLCBUaW55LlRpbWVyQ3JlYXRvcik7IiwiLyoqXHJcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxyXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcclxuICovXHJcblxyXG5cclxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLl90d2VlbnMgPSB7fTtcclxuXHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG59O1xyXG5cclxuX0dyb3VwLnByb3RvdHlwZSA9IHtcclxuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKS5tYXAoZnVuY3Rpb24gKHR3ZWVuSWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3R3ZWVuc1t0d2VlbklkXTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xyXG5cclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG5cclxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xyXG5cdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV0gPSB0d2VlbjtcclxuXHJcblx0fSxcclxuXHJcblx0cmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcclxuXHJcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldO1xyXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldO1xyXG5cclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xyXG5cclxuXHRcdHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XHJcblxyXG5cdFx0aWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBUV0VFTi5ub3coKTtcclxuXHJcblx0XHQvLyBUd2VlbnMgYXJlIHVwZGF0ZWQgaW4gXCJiYXRjaGVzXCIuIElmIHlvdSBhZGQgYSBuZXcgdHdlZW4gZHVyaW5nIGFuXHJcblx0XHQvLyB1cGRhdGUsIHRoZW4gdGhlIG5ldyB0d2VlbiB3aWxsIGJlIHVwZGF0ZWQgaW4gdGhlIG5leHQgYmF0Y2guXHJcblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC5cclxuXHRcdC8vIEhvd2V2ZXIsIGlmIHRoZSByZW1vdmVkIHR3ZWVuIHdhcyBhZGRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgYmF0Y2gsXHJcblx0XHQvLyB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXHJcblx0XHR3aGlsZSAodHdlZW5JZHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xyXG5cclxuXHRcdFx0XHRpZiAodHdlZW4gJiYgdHdlZW4udXBkYXRlKHRpbWUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmICghcHJlc2VydmUpIHtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fVxyXG59O1xyXG5cclxudmFyIFRXRUVOID0gbmV3IF9Hcm91cCgpO1xyXG5cclxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XHJcblRXRUVOLl9uZXh0SWQgPSAwO1xyXG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcclxufTtcclxuXHJcblxyXG4vLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxyXG4vLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXHJcbmlmICh0eXBlb2YgKHNlbGYpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmhydGltZSkge1xyXG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcclxuXHJcblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxyXG5cdFx0cmV0dXJuIHRpbWVbMF0gKiAxMDAwICsgdGltZVsxXSAvIDEwMDAwMDA7XHJcblx0fTtcclxufVxyXG4vLyBJbiBhIGJyb3dzZXIsIHVzZSBzZWxmLnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXHJcbmVsc2UgaWYgKHR5cGVvZiAoc2VsZikgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgICAgIHNlbGYucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0IHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuXHQvLyBUaGlzIG11c3QgYmUgYm91bmQsIGJlY2F1c2UgZGlyZWN0bHkgYXNzaWduaW5nIHRoaXMgZnVuY3Rpb25cclxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXHJcblx0VFdFRU4ubm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxufVxyXG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG5lbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XHJcbn1cclxuLy8gT3RoZXJ3aXNlLCB1c2UgJ25ldyBEYXRlKCkuZ2V0VGltZSgpJy5cclxuZWxzZSB7XHJcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdH07XHJcbn1cclxuXHJcblxyXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XHJcblx0dGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9wYXVzZVN0YXJ0ID0gbnVsbDtcclxuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XHJcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcclxuXHR0aGlzLl92YWx1ZXNFbmQgPSB7fTtcclxuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xyXG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcclxuXHR0aGlzLl9yZXBlYXQgPSAwO1xyXG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcclxuXHR0aGlzLl95b3lvID0gZmFsc2U7XHJcblx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XHJcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xyXG5cdHRoaXMuX3N0YXJ0VGltZSA9IG51bGw7XHJcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XHJcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XHJcblx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IFtdO1xyXG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XHJcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xyXG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9ncm91cCA9IGdyb3VwIHx8IFRXRUVOO1xyXG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XHJcblxyXG59O1xyXG5cclxuVFdFRU4uVHdlZW4ucHJvdG90eXBlID0ge1xyXG5cdGdldElkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faWQ7XHJcblx0fSxcclxuXHJcblx0aXNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xyXG5cdH0sXHJcblxyXG5cdGlzUGF1c2VkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNQYXVzZWQ7XHJcblx0fSxcclxuXHJcblx0dG86IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xyXG5cclxuXHRcdHRoaXMuX3ZhbHVlc0VuZCA9IE9iamVjdC5jcmVhdGUocHJvcGVydGllcyk7XHJcblxyXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0ZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKGQpIHtcclxuXHRcdHRoaXMuX2R1cmF0aW9uID0gZDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN0YXJ0OiBmdW5jdGlvbiAodGltZSkge1xyXG5cclxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XHJcblx0XHR0aGlzLl9zdGFydFRpbWUgKz0gdGhpcy5fZGVsYXlUaW1lO1xyXG5cclxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXHJcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxyXG5cdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSBbdGhpcy5fb2JqZWN0W3Byb3BlcnR5XV0uY29uY2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcclxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XHJcblx0XHRcdGlmICh0aGlzLl9vYmplY3RbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUsIGJ1dCBvbmx5IG9uY2UuXHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0c3RvcDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RvcENoYWluZWRUd2VlbnMoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZShJbmZpbml0eSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0cGF1c2U6IGZ1bmN0aW9uKHRpbWUpIHtcclxuXHJcblx0XHRpZiAodGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VTdGFydCA9IHRpbWUgPT09IHVuZGVmaW5lZCA/IFRXRUVOLm5vdygpIDogdGltZTtcclxuXHJcblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlc3VtZTogZnVuY3Rpb24odGltZSkge1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSAodGltZSA9PT0gdW5kZWZpbmVkID8gVFdFRU4ubm93KCkgOiB0aW1lKVxyXG5cdFx0XHQtIHRoaXMuX3BhdXNlU3RhcnQ7XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VTdGFydCA9IDA7XHJcblxyXG5cdFx0dGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcclxuXHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdG9wKCk7XHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdGdyb3VwOiBmdW5jdGlvbiAoZ3JvdXApIHtcclxuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRkZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xyXG5cclxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRyZXBlYXQ6IGZ1bmN0aW9uICh0aW1lcykge1xyXG5cclxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcblxyXG5cdFx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHlveW86IGZ1bmN0aW9uICh5b3lvKSB7XHJcblxyXG5cdFx0dGhpcy5feW95byA9IHlveW87XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0ZWFzaW5nOiBmdW5jdGlvbiAoZWFzaW5nRnVuY3Rpb24pIHtcclxuXHJcblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhc2luZ0Z1bmN0aW9uO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGludGVycG9sYXRpb246IGZ1bmN0aW9uIChpbnRlcnBvbGF0aW9uRnVuY3Rpb24pIHtcclxuXHJcblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uRnVuY3Rpb247XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0Y2hhaW46IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gYXJndW1lbnRzO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uVXBkYXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0b25SZXBlYXQ6IGZ1bmN0aW9uIG9uUmVwZWF0KGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uQ29tcGxldGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uU3RvcDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lKSB7XHJcblxyXG5cdFx0dmFyIHByb3BlcnR5O1xyXG5cdFx0dmFyIGVsYXBzZWQ7XHJcblx0XHR2YXIgdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRpbWUgPCB0aGlzLl9zdGFydFRpbWUpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xyXG5cdFx0ZWxhcHNlZCA9ICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSkgPyAxIDogZWxhcHNlZDtcclxuXHJcblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xyXG5cclxuXHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XHJcblxyXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxyXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XHJcblx0XHRcdHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG5cclxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24oZW5kLCB2YWx1ZSk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXHJcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xyXG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxyXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCwgZWxhcHNlZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGVsYXBzZWQgPT09IDEpIHtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XHJcblxyXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XHJcblx0XHRcdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gKyBwYXJzZUZsb2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLl95b3lvKSB7XHJcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xyXG5cdFx0XHRcdFx0dGhpcy5fcmV2ZXJzZWQgPSAhdGhpcy5fcmV2ZXJzZWQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fcmVwZWF0RGVsYXlUaW1lICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9kZWxheVRpbWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fb25SZXBlYXRDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XHJcblx0XHRcdFx0XHQvLyBNYWtlIHRoZSBjaGFpbmVkIHR3ZWVucyBzdGFydCBleGFjdGx5IGF0IHRoZSB0aW1lIHRoZXkgc2hvdWxkLFxyXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXHJcblx0XHRcdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH1cclxufTtcclxuXHJcblxyXG5UV0VFTi5FYXNpbmcgPSB7XHJcblxyXG5cdExpbmVhcjoge1xyXG5cclxuXHRcdE5vbmU6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gaztcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdFF1YWRyYXRpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiAoMiAtIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0Q3ViaWM6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiBrICogayAqIGs7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRRdWFydGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRRdWludGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogayAqIGs7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRTaW51c29pZGFsOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdEV4cG9uZW50aWFsOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayA9PT0gMCA/IDAgOiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLSAxMCAqIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDEwMjQsIGsgLSAxKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgtIE1hdGgucG93KDIsIC0gMTAgKiAoayAtIDEpKSArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0Q2lyY3VsYXI6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRFbGFzdGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRrICo9IDI7XHJcblxyXG5cdFx0XHRpZiAoayA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gLTAuNSAqIE1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAtMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRCYWNrOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHZhciBzID0gMS43MDE1ODtcclxuXHJcblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRCb3VuY2U6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gVFdFRU4uRWFzaW5nLkJvdW5jZS5PdXQoMSAtIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPCAoMSAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgxLjUgLyAyLjc1KSkgKiBrICsgMC43NTtcclxuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmIChrIDwgMC41KSB7XHJcblx0XHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuSW4oayAqIDIpICogMC41O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5PdXQoayAqIDIgLSAxKSAqIDAuNSArIDAuNTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xyXG5cclxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgZiA9IG0gKiBrO1xyXG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG5cdFx0dmFyIGZuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5MaW5lYXI7XHJcblxyXG5cdFx0aWYgKGsgPCAwKSB7XHJcblx0XHRcdHJldHVybiBmbih2WzBdLCB2WzFdLCBmKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoayA+IDEpIHtcclxuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIGIgPSAwO1xyXG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgcHcgPSBNYXRoLnBvdztcclxuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDw9IG47IGkrKykge1xyXG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYjtcclxuXHJcblx0fSxcclxuXHJcblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcclxuXHJcblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcclxuXHRcdHZhciBmID0gbSAqIGs7XHJcblx0XHR2YXIgaSA9IE1hdGguZmxvb3IoZik7XHJcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XHJcblxyXG5cdFx0aWYgKHZbMF0gPT09IHZbbV0pIHtcclxuXHJcblx0XHRcdGlmIChrIDwgMCkge1xyXG5cdFx0XHRcdGkgPSBNYXRoLmZsb29yKGYgPSBtICogKDEgKyBrKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmbih2WyhpIC0gMSArIG0pICUgbV0sIHZbaV0sIHZbKGkgKyAxKSAlIG1dLCB2WyhpICsgMikgJSBtXSwgZiAtIGkpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiAoayA8IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPiAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIHZbbV0gLSAoZm4odlttXSwgdlttXSwgdlttIC0gMV0sIHZbbSAtIDFdLCBmIC0gbSkgLSB2W21dKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZuKHZbaSA/IGkgLSAxIDogMF0sIHZbaV0sIHZbbSA8IGkgKyAxID8gbSA6IGkgKyAxXSwgdlttIDwgaSArIDIgPyBtIDogaSArIDJdLCBmIC0gaSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRVdGlsczoge1xyXG5cclxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xyXG5cclxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcclxuXHJcblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xyXG5cclxuXHRcdFx0cmV0dXJuIGZjKG4pIC8gZmMoaSkgLyBmYyhuIC0gaSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHR2YXIgYSA9IFsxXTtcclxuXHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xyXG5cclxuXHRcdFx0XHR2YXIgcyA9IDE7XHJcblxyXG5cdFx0XHRcdGlmIChhW25dKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XHJcblx0XHRcdFx0XHRzICo9IGk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhW25dID0gcztcclxuXHRcdFx0XHRyZXR1cm4gcztcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0fSkoKSxcclxuXHJcblx0XHRDYXRtdWxsUm9tOiBmdW5jdGlvbiAocDAsIHAxLCBwMiwgcDMsIHQpIHtcclxuXHJcblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcclxuXHRcdFx0dmFyIHYxID0gKHAzIC0gcDEpICogMC41O1xyXG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcclxuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xyXG5cclxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG53aW5kb3cuVFdFRU4gPSBUV0VFTlxyXG5cclxuXHJcblRpbnkuVHdlZW5NYW5hZ2VyID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG5cdHRoaXMuZ2FtZSA9IGdhbWU7XHJcblx0dGhpcy5idWZmZXJMaXN0ID0gW107XHJcbn07XHJcblxyXG5UaW55LlR3ZWVuTWFuYWdlci5wcm90b3R5cGUgPSB7XHJcblxyXG5cdGFkZDogZnVuY3Rpb24ob2JqKSB7XHJcblx0XHRyZXR1cm4gbmV3IFRXRUVOLlR3ZWVuKG9iaik7XHJcblx0fSxcclxuXHJcblx0cGF1c2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLmJ1ZmZlckxpc3QubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBUV0VFTi5fdHdlZW5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5idWZmZXJMaXN0LnB1c2goVFdFRU4uX3R3ZWVuc1trXSk7XHJcbiAgICAgICAgICAgIFRXRUVOLl90d2VlbnNba10ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0fSxcclxuXHJcblx0cmVzdW1lKCkge1xyXG5cclxuICAgICAgICB0aGlzLmJ1ZmZlckxpc3QuZm9yRWFjaChmdW5jdGlvbih0d2VlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR3ZWVuLnJlc3VtZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuYnVmZmVyTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIFxyXG5cdH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbihkZWx0YSkge1xyXG4gICAgICAgIFRXRUVOLnVwZGF0ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgIFx0dGhpcy5idWZmZXJMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICBcdFRXRUVOLnJlbW92ZUFsbCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwidHdlZW5zXCIsIFRpbnkuVHdlZW5NYW5hZ2VyKTsiLCJcclxuVGlueS5SZW5kZXJUZXh0dXJlID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgcmVuZGVyZXIsIHJlc29sdXRpb24pXHJcbntcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCAxMDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAxMDA7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICByZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCAxO1xyXG5cclxuICAgIC8vIHRoaXMuZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIC8vIHRoaXMuY3JvcCA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZSA9IG5ldyBUaW55LkJhc2VUZXh0dXJlKCk7XHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZS5oYXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRoaXMud2lkdGggKiByZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHJlc29sdXRpb24pO1xyXG5cclxuICAgIFRpbnkuVGV4dHVyZS5jYWxsKHRoaXMsXHJcbiAgICAgICAgdGhpcy50ZXh0dXJlQnVmZmVyLmNhbnZhcyxcclxuICAgICAgICBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCAqIHJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogcmVzb2x1dGlvbilcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCAxO1xyXG5cclxuICAgIC8vIHRoaXMuaGFzTG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXIgfHwgVGlueS5kZWZhdWx0UmVuZGVyZXI7XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlRleHR1cmUucHJvdG90eXBlKTtcclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmVuZGVyVGV4dHVyZTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgdXBkYXRlQmFzZSlcclxue1xyXG4gICAgaWYgKHdpZHRoID09PSB0aGlzLndpZHRoICYmIGhlaWdodCA9PT0gdGhpcy5oZWlnaHQpcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSAod2lkdGggPiAwICYmIGhlaWdodCA+IDApO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5mcmFtZS53aWR0aCA9IHRoaXMuY3JvcC53aWR0aCA9IHdpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgdGhpcy5mcmFtZS5oZWlnaHQgPSB0aGlzLmNyb3AuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGlmICh1cGRhdGVCYXNlKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHRoaXMuYmFzZVRleHR1cmUud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgICAgIC8vIHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIXRoaXMudmFsaWQpcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZUJ1ZmZlci5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYoIXRoaXMudmFsaWQpcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZUJ1ZmZlci5jbGVhcigpO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihkaXNwbGF5T2JqZWN0LCBtYXRyaXgsIGNsZWFyKVxyXG57XHJcbiAgICBpZighdGhpcy52YWxpZClyZXR1cm47XHJcblxyXG4gICAgdmFyIHd0ID0gZGlzcGxheU9iamVjdC53b3JsZFRyYW5zZm9ybTtcclxuICAgIHd0LmlkZW50aXR5KCk7XHJcbiAgICBpZihtYXRyaXgpd3QuYXBwZW5kKG1hdHJpeCk7XHJcbiAgICBcclxuICAgIC8vIHNldFdvcmxkIEFscGhhIHRvIGVuc3VyZSB0aGF0IHRoZSBvYmplY3QgaXMgcmVuZGVyZXIgYXQgZnVsbCBvcGFjaXR5XHJcbiAgICBkaXNwbGF5T2JqZWN0LndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgIC8vIFRpbWUgdG8gdXBkYXRlIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIGRpc3BsYXlPYmplY3Qgd2l0aCB0aGUgbmV3IG1hdHJpeC4uICAgIFxyXG4gICAgdmFyIGNoaWxkcmVuID0gZGlzcGxheU9iamVjdC5jaGlsZHJlbjtcclxuXHJcbiAgICBmb3IodmFyIGkgPSAwLCBqID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIGNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGNsZWFyKXRoaXMudGV4dHVyZUJ1ZmZlci5jbGVhcigpO1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gdGhpcy50ZXh0dXJlQnVmZmVyLmNvbnRleHQ7XHJcblxyXG4gICAgdmFyIHJlYWxSZXNvbHV0aW9uID0gdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlck9iamVjdChkaXNwbGF5T2JqZWN0LCBjb250ZXh0KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlc29sdXRpb24gPSByZWFsUmVzb2x1dGlvbjtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0SW1hZ2UgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1hZ2Uuc3JjID0gdGhpcy5nZXRCYXNlNjQoKTtcclxuICAgIHJldHVybiBpbWFnZTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0QmFzZTY0ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYW52YXMoKS50b0RhdGFVUkwoKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0Q2FudmFzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy50ZXh0dXJlQnVmZmVyLmNhbnZhcztcclxufTsiLCJcclxuLy8gVGlueS5UZXh0dXJlQ2FjaGUgPSB7fTtcclxuLy8gVGlueS5GcmFtZUNhY2hlID0ge307XHJcblRpbnkuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3IgPSAwO1xyXG5UaW55LlRleHR1cmVTaWxlbnRGYWlsID0gZmFsc2U7XHJcblxyXG5UaW55LlRleHR1cmUgPSBmdW5jdGlvbihzb3VyY2UsIGZyYW1lLCBjcm9wLCB0cmltKVxyXG57XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgIHRoaXMubm9GcmFtZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IDE7XHJcblxyXG4gICAgdGhpcy5oYXNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoIWZyYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9GcmFtZSA9IHRydWU7XHJcbiAgICAgICAgZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwwLDEsMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT0gXCJzdHJpbmdcIikgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGtleSA9IHNvdXJjZTtcclxuXHJcbiAgICAgICAgc291cmNlID0gVGlueS5DYWNoZS5pbWFnZVtrZXldO1xyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZSkgdGhyb3cgbmV3IEVycm9yKCdDYWNoZSBFcnJvcjogaW1hZ2UgJyArIGtleSArICcgZG9lc2B0IGZvdW5kIGluIGNhY2hlJyk7XHJcblxyXG4gICAgICAgIFRpbnkuQ2FjaGUudGV4dHVyZVtrZXldID0gdGhpcztcclxuICAgIFxyXG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG5cclxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZTtcclxuXHJcbiAgICB0aGlzLnRyaW0gPSB0cmltO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gMDtcclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IDA7XHJcblxyXG4gICAgdGhpcy5jcm9wID0gY3JvcCB8fCBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcblxyXG4gICAgaWYoKHRoaXMuc291cmNlLmNvbXBsZXRlIHx8IHRoaXMuc291cmNlLmdldENvbnRleHQpICYmIHRoaXMuc291cmNlLndpZHRoICYmIHRoaXMuc291cmNlLmhlaWdodClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9uU291cmNlTG9hZGVkKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNjb3BlID0gdGhpcztcclxuICAgICAgICB0aGlzLnNvdXJjZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2NvcGUub25Tb3VyY2VMb2FkZWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGV4dHVyZTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUub25Tb3VyY2VMb2FkZWQgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuaGFzTG9hZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMud2lkdGggPSB0aGlzLnNvdXJjZS5uYXR1cmFsV2lkdGggfHwgdGhpcy5zb3VyY2Uud2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuc291cmNlLm5hdHVyYWxIZWlnaHQgfHwgdGhpcy5zb3VyY2UuaGVpZ2h0O1xyXG5cclxuICAgIGlmICh0aGlzLm5vRnJhbWUpIHRoaXMuZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuc2V0RnJhbWUodGhpcy5mcmFtZSk7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLmFkZFRvQ2FjaGUgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIFRpbnkuQ2FjaGUudGV4dHVyZVtrZXldID0gdGhpcztcclxuICAgIHRoaXMua2V5ID0ga2V5O1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZiAodGhpcy5rZXkpIHtcclxuICAgICAgICBkZWxldGUgVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMua2V5XTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLnNldEZyYW1lID0gZnVuY3Rpb24oZnJhbWUpXHJcbntcclxuICAgIHRoaXMubm9GcmFtZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZTtcclxuICAgIC8vIHRoaXMud2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgIC8vIHRoaXMuaGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuY3JvcC54ID0gZnJhbWUueDtcclxuICAgIHRoaXMuY3JvcC55ID0gZnJhbWUueTtcclxuICAgIHRoaXMuY3JvcC53aWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgdGhpcy5jcm9wLmhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuXHJcbiAgICBpZiAoIXRoaXMudHJpbSAmJiAoZnJhbWUueCArIGZyYW1lLndpZHRoID4gdGhpcy53aWR0aCB8fCBmcmFtZS55ICsgZnJhbWUuaGVpZ2h0ID4gdGhpcy5oZWlnaHQpKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghVGlueS5UZXh0dXJlU2lsZW50RmFpbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGV4dHVyZSBFcnJvcjogZnJhbWUgZG9lcyBub3QgZml0IGluc2lkZSB0aGUgYmFzZSBUZXh0dXJlIGRpbWVuc2lvbnMgJyArIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZhbGlkID0gZnJhbWUgJiYgZnJhbWUud2lkdGggJiYgZnJhbWUuaGVpZ2h0ICYmIHRoaXMuc291cmNlICYmIHRoaXMuaGFzTG9hZGVkO1xyXG5cclxuICAgIGlmICh0aGlzLnRyaW0pXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy53aWR0aCA9IHRoaXMudHJpbS53aWR0aDtcclxuICAgICAgICAvLyB0aGlzLmhlaWdodCA9IHRoaXMudHJpbS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5mcmFtZS53aWR0aCA9IHRoaXMudHJpbS53aWR0aDtcclxuICAgICAgICB0aGlzLmZyYW1lLmhlaWdodCA9IHRoaXMudHJpbS5oZWlnaHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuZnJvbUltYWdlID0gZnVuY3Rpb24oa2V5LCBpbWFnZVVybCwgY3Jvc3NvcmlnaW4pXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVba2V5XTtcclxuXHJcbi8vICAgICBpZighdGV4dHVyZSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShUaW55LkJhc2VUZXh0dXJlLmZyb21JbWFnZShrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbikpO1xyXG4vLyAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5XHJcbi8vICAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVba2V5XSA9IHRleHR1cmU7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuZnJvbUZyYW1lID0gZnVuY3Rpb24oZnJhbWVJZClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtmcmFtZUlkXTtcclxuLy8gICAgIGlmKCF0ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmcmFtZUlkIFwiJyArIGZyYW1lSWQgKyAnXCIgZG9lcyBub3QgZXhpc3QgaW4gdGhlIHRleHR1cmUgY2FjaGUgJyk7XHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcblRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzID0gZnVuY3Rpb24oY2FudmFzKVxyXG57XHJcbiAgICAvLyBpZighY2FudmFzLl90aW55SWQpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgY2FudmFzLl90aW55SWQgPSAnX2Zyb21fY2FudmFzXycgKyBUaW55LlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yKys7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdmFyIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbY2FudmFzLl90aW55SWRdO1xyXG5cclxuICAgIC8vIGlmKCF0ZXh0dXJlKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKCBjYW52YXMgKTtcclxuICAgIC8vICAgICBUaW55LkNhY2hlLnRleHR1cmVbY2FudmFzLl90aW55SWRdID0gdGV4dHVyZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyByZXR1cm4gdGV4dHVyZTtcclxuICAgIHJldHVybiBuZXcgVGlueS5UZXh0dXJlKCBjYW52YXMgKTtcclxufTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5hZGRUZXh0dXJlVG9DYWNoZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGlkKVxyXG4vLyB7XHJcbi8vICAgICBUaW55LlRleHR1cmVDYWNoZVtpZF0gPSB0ZXh0dXJlO1xyXG4vLyB9O1xyXG5cclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5yZW1vdmVUZXh0dXJlRnJvbUNhY2hlID0gZnVuY3Rpb24oaWQpXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgZGVsZXRlIFRpbnkuVGV4dHVyZUNhY2hlW2lkXTtcclxuLy8gICAgIGRlbGV0ZSBUaW55LkJhc2VUZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07IiwiVGlueS5DYW52YXNCdWZmZXIgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKVxyXG57XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzQnVmZmVyO1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59OyIsIlxyXG5mdW5jdGlvbiBFdmVudExpc3RlbmVycygpIFxyXG57XHJcbiAgICB0aGlzLmEgPSBbXTtcclxuICAgIHRoaXMubiA9IDA7XHJcbn1cclxuXHJcblRpbnkuRXZlbnRFbWl0dGVyID0ge1xyXG5cclxuICAgIGNhbGw6IGZ1bmN0aW9uKG9iaikgXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKG9iaikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYmogPSBvYmoucHJvdG90eXBlIHx8IG9iajtcclxuICAgICAgICAgICAgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4ob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluOiBmdW5jdGlvbihvYmopIFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyc19ldmVudHMgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHVzaExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XVxyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdID0gbmV3IEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5hLnB1c2goZm4sIGNvbnRleHQgfHwgbnVsbCwgb25jZSB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5uICs9IDM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmoub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbiwgY29udGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1c2hMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2JqLm9uID0gcHVzaExpc3RlbmVyO1xyXG5cclxuICAgICAgICBvYmoub2ZmID0gZnVuY3Rpb24oZXZlbnQsIGZuLCBjb250ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdXHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZuQXJyYXkgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XS5hO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmbikgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZuQXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghY29udGV4dCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGg7IGkgKz0gMylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpXSA9PSBmbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGg7IGkgKz0gMylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpXSA9PSBmbiAmJiBmbkFycmF5W2kgKyAxXSA9PSBjb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbkFycmF5Lmxlbmd0aCA9PSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmouZW1pdCA9IGZ1bmN0aW9uKGV2ZW50LCBhMSwgYTIsIGEzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbkFycmF5ID0gbGlzdGVuZXJzLmE7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5uID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aCAtIGxpc3RlbmVycy5uOyBpICs9IDMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gMSlcclxuICAgICAgICAgICAgICAgICAgICBmbkFycmF5W2ldLmNhbGwoZm5BcnJheVtpICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGVuID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgZm5BcnJheVtpXS5jYWxsKGZuQXJyYXlbaSArIDFdLCBhMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZW4gPT0gMylcclxuICAgICAgICAgICAgICAgICAgICBmbkFycmF5W2ldLmNhbGwoZm5BcnJheVtpICsgMV0sIGExLCBhMik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZm5BcnJheVtpXS5jYWxsKGZuQXJyYXlbaSArIDFdLCBhMSwgYTIsIGEzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpICsgMl0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZm5BcnJheS5sZW5ndGggPT0gMCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsiLCJpZiAoIURhdGUubm93KSB7XHJcbiAgRGF0ZS5ub3cgPSBmdW5jdGlvbiBub3coKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKHR5cGVvZihGbG9hdDMyQXJyYXkpID09ICd1bmRlZmluZWQnKVxyXG57XHJcblx0d2luZG93LkZsb2F0MzJBcnJheSA9IEFycmF5XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9