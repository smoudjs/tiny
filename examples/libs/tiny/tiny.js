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

__webpack_require__(/*! ./renderers/CanvasRenderer.js */ "./src/renderers/CanvasRenderer.js"); // 3 Kb

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

__webpack_require__(/*! ./renderers/GraphicsRenderer.js */ "./src/renderers/GraphicsRenderer.js"); // 4Kb

__webpack_require__(/*! ./objects/Graphics.js */ "./src/objects/Graphics.js"); // 10 Kb
// require('./objects/TilingSprite.js'); // 4 Kb   ############### TilingSprite  game.add.tilesprite

__webpack_require__(/*! ./textures/RenderTexture.js */ "./src/textures/RenderTexture.js"); // 2 Kb

__webpack_require__(/*! ./utils/CanvasBuffer.js */ "./src/utils/CanvasBuffer.js"); // 1 Kb
__webpack_require__(/*! ./renderers/CanvasMaskManager.js */ "./src/renderers/CanvasMaskManager.js"); // 1Kb
__webpack_require__(/*! ./renderers/CanvasTinter.js */ "./src/renderers/CanvasTinter.js"); // 3 Kb ################ tint function

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

/***/ "./src/renderers/CanvasRenderer.js":
/*!*****************************************!*\
  !*** ./src/renderers/CanvasRenderer.js ***!
  \*****************************************/
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
/*! no static exports found */
/***/ (function(module, exports) {


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL0NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC9NYXRoLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL01hdHJpeC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC9Qb2ludC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC9Qb2x5Z29uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0aC9Sb3VuZGVkUmVjdGFuZ2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9taW5pLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0Jhc2VPYmplY3QyRC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9HcmFwaGljcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9PYmplY3QyRC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9TY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyZXJzL0NhbnZhc01hc2tNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXJlcnMvQ2FudmFzUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlcmVycy9DYW52YXNUaW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlcmVycy9HcmFwaGljc1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zeXN0ZW1zL0lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9zeXN0ZW1zL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3lzdGVtcy9SQUYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N5c3RlbXMvVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N5c3RlbXMvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHR1cmVzL1JlbmRlclRleHR1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHR1cmVzL1RleHR1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NhbnZhc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9wb2x5ZmlsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7OztBQ3RMdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJCQUEyQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5S0EsbUJBQU8sQ0FBQyxvREFBcUI7O0FBRTdCOztBQUVBLG1CQUFPLENBQUMsOEJBQVU7QUFDbEIsbUJBQU8sQ0FBQyxvQ0FBYTtBQUNyQixtQkFBTyxDQUFDLDBDQUFnQixFQUFFO0FBQzFCLG1CQUFPLENBQUMsNENBQWlCLEVBQUU7QUFDM0IsbUJBQU8sQ0FBQyw4Q0FBa0IsRUFBRTtBQUM1QixtQkFBTyxDQUFDLG9EQUFxQixFQUFFOztBQUUvQixtQkFBTyxDQUFDLGdFQUEyQixFQUFFO0FBQ3JDLG1CQUFPLENBQUMsd0RBQXVCLEVBQUU7QUFDakMsbUJBQU8sQ0FBQyxrREFBb0IsRUFBRTs7QUFFOUIsbUJBQU8sQ0FBQyx3RUFBK0IsRUFBRSxROzs7Ozs7Ozs7Ozs7QUNkekM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUMvQ0EsbUJBQU8sQ0FBQyxnQ0FBVzs7QUFFbkIseUNBQXlDO0FBQ3pDLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLG1CQUFPLENBQUMsa0RBQW9COztBQUU1QixtQkFBTyxDQUFDLGtFQUE0QixFQUFFO0FBQ3RDLG1CQUFPLENBQUMsZ0RBQW1CLEVBQUU7QUFDN0IsbUJBQU8sQ0FBQyw4Q0FBa0IsRUFBRTs7QUFFNUIsbUJBQU8sQ0FBQyw0RUFBaUMsRUFBRTs7QUFFM0MsbUJBQU8sQ0FBQyx3REFBdUIsRUFBRTtBQUNqQyx3Q0FBd0M7O0FBRXhDLG1CQUFPLENBQUMsb0VBQTZCLEVBQUU7O0FBRXZDLG1CQUFPLENBQUMsNERBQXlCLEVBQUU7QUFDbkMsbUJBQU8sQ0FBQyw4RUFBa0MsRUFBRTtBQUM1QyxtQkFBTyxDQUFDLG9FQUE2QixFQUFFLHVDOzs7Ozs7Ozs7OztBQ3JCdkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQzVUQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0M7Ozs7Ozs7Ozs7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLDRDQUE0QyxhQUFhOztBQUV6RCx1QkFBdUIseUJBQXlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQSx3Q0FBd0MsY0FBYztBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdEQUFnRCxTQUFTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDdkxEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEscUQ7Ozs7Ozs7Ozs7O0FDOUhBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0U7Ozs7Ozs7Ozs7O0FDdENBLG1CQUFPLENBQUMsZ0NBQVc7OztBQUduQixtQkFBTyxDQUFDLDhDQUFrQixFQUFFO0FBQzVCLHlDQUF5QztBQUN6QyxtQkFBTyxDQUFDLG9EQUFxQixFQUFFO0FBQy9CLG1CQUFPLENBQUMsa0RBQW9CLEVBQUU7QUFDOUIsbUJBQU8sQ0FBQyxrREFBb0IsRUFBRTs7QUFFOUIsbUJBQU8sQ0FBQyw0REFBeUI7O0FBRWpDLG1CQUFPLENBQUMsd0RBQXVCLEVBQUU7O0FBRWpDLG1CQUFPLENBQUMsb0RBQXFCLEVBQUU7QUFDL0IsbUJBQU8sQ0FBQyxnREFBbUIsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FDYjdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdGQUF3Rjs7QUFFeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELGtEOzs7Ozs7Ozs7OztBQ3ZSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0MsdUJBQXVCOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qiw4QkFBOEI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsbUJBQW1CO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7OztBQzUxQkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUMsMENBQTBDO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUMvVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2hXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0Esc0JBQXNCLFVBQVU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0Esc0JBQXNCLFVBQVU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrRjs7Ozs7Ozs7Ozs7O0FDbllBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQSxDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDJDQUEyQywwQkFBMEI7O0FBRXJFO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxDO0FBQ0EsNENBQTRDLG1CQUFtQjs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2hMQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOENBQThDLHlCQUF5Qjs7QUFFdkU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCx5QkFBeUI7O0FBRTVFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNoTUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixrQ0FBa0M7QUFDckQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHlCQUF5QixxQkFBcUI7QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsa0NBQWtDO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNwVkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLCtCQUErQjtBQUNsRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQiwrQkFBK0I7QUFDOUQ7QUFDQTs7QUFFQTs7QUFFQSwrQkFBK0Isc0JBQXNCO0FBQ3JEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLHdEQUF3RCxRQUFRO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvREFBb0Q7O0FBRXBELDZDQUE2Qyx5QkFBeUI7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCx5QkFBeUI7QUFDakY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIseUJBQXlCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEseUM7Ozs7Ozs7Ozs7OztBQ2hSQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBLDRDO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixXQUFXO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTs7QUFFQSx5Qzs7Ozs7Ozs7Ozs7QUNwUEE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdDQUF3Qyx5QkFBeUI7QUFDakU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLHFEQUFxRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlCOzs7Ozs7Ozs7OztBQzdIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0Q7Ozs7Ozs7Ozs7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7O0FBRXZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQSxnRUFBZ0Usc0JBQXNCO0FBQ3RGO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTs7QUFFQSxrRUFBa0Usc0JBQXNCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlEOzs7Ozs7Ozs7Ozs7O0FDLytCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7Ozs7Ozs7Ozs7O0FDcExBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isb0JBQW9CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkIsa0NBQWtDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InRpbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJcclxudmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuVGlueS5BcHAgPSBmdW5jdGlvbihzdGF0ZXMpXHJcbntcclxuICAgIHRoaXMuY2FsbGJhY2tDb250ZXh0ID0gdGhpcztcclxuICAgIHRoaXMuc3RhdGUgPSAwO1xyXG4gICAgdGhpcy50aW1lU2NhbGUgPSAxO1xyXG4gICAgdGhpcy53aWR0aCA9IDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IDA7XHJcbiAgICB0aGlzLnN5c3RlbXMgPSBbXTtcclxuICAgIHRoaXMudXBkYXRhYmxlID0gW107XHJcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYXVzZUR1cmF0aW9uID0gMDtcclxuICAgIHRoaXMuaW5wdXRWaWV3ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICBzdGF0ZXMgPSBzdGF0ZXMgfHwge307XHJcbiAgICB0aGlzLmJvb3QgPSBzdGF0ZXMuYm9vdCB8fCB0aGlzLmJvb3QgfHwgbm9vcDtcclxuICAgIHRoaXMucHJlbG9hZCA9IHN0YXRlcy5wcmVsb2FkIHx8IHRoaXMucHJlbG9hZCB8fCBub29wO1xyXG4gICAgdGhpcy5jcmVhdGUgPSBzdGF0ZXMuY3JlYXRlIHx8IHRoaXMuY3JlYXRlIHx8IG5vb3A7XHJcbiAgICB0aGlzLnVwZGF0ZSA9IHN0YXRlcy51cGRhdGUgfHwgdGhpcy51cGRhdGUgfHwgbm9vcDtcclxuICAgIHRoaXMucmVuZGVyID0gc3RhdGVzLnJlbmRlciB8fCB0aGlzLnJlbmRlciB8fCBub29wO1xyXG4gICAgdGhpcy5fcmVzaXplX2NiID0gc3RhdGVzLnJlc2l6ZSB8fCBub29wO1xyXG4gICAgdGhpcy5fZGVzdHJveV9jYiA9IHN0YXRlcy5kZXN0cm95IHx8IG5vb3A7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgc2VsZi5fYm9vdCgpO1xyXG4gICAgfSwgMCk7XHJcbn1cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fYm9vdCA9IGZ1bmN0aW9uKClcclxue1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5zeXN0ZW1zLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzeXN0ZW0gPSBUaW55LnN5c3RlbXNbaV07XHJcblxyXG4gICAgICAgIHZhciBfc3lzXyA9IG5ldyBzeXN0ZW0uX2NsYXNzXyh0aGlzKTtcclxuICAgICAgICB0aGlzLnN5c3RlbXMucHVzaChfc3lzXyk7XHJcbiAgICAgICAgaWYgKF9zeXNfLnVwZGF0ZSkgdGhpcy51cGRhdGFibGUucHVzaChfc3lzXyk7XHJcblxyXG4gICAgICAgIGlmIChzeXN0ZW0ubmFtZSkgdGhpc1tzeXN0ZW0ubmFtZV0gPSBfc3lzXztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoVGlueS5SQUYpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmFmID0gbmV3IFRpbnkuUkFGKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYm9vdC5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZiAoc2VsZi5sb2FkKSBzZWxmLl9wcmVsb2FkKCk7XHJcbiAgICAgICAgZWxzZSBzZWxmLl9jcmVhdGUoKTtcclxuICAgIH0sIDApXHJcbn1cclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fcHJlbG9hZCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5wcmVsb2FkLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IDE7XHJcbiAgICB0aGlzLmxvYWQuc3RhcnQodGhpcy5fY3JlYXRlKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSBcclxue1xyXG4gICAgdGhpcy5jcmVhdGUuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcblxyXG4gICAgaWYgKHRoaXMucmFmKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhZi5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGUgPSAyO1xyXG59XHJcblxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSBcclxue1xyXG4gICAgaWYgKHRoaXMucmFmKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wYXVzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLnBhdXNlKSB0aGlzLnN5c3RlbXNbaV0ucGF1c2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYgKHRoaXMucmFmKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodGhpcy5wYXVzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLnJlc3VtZSkgdGhpcy5zeXN0ZW1zW2ldLnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbih0aW1lLCBkZWx0YSlcclxue1xyXG4gICAgaWYgKCF0aGlzLnBhdXNlZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZS5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aW1lLCBkZWx0YSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51cGRhdGFibGUubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0YWJsZVtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBhdXNlRHVyYXRpb24gKz0gZGVsdGFcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG59XHJcblxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCB0aGlzLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUgPiAwKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9yZXNpemVfY2IuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChzZWxmLmlucHV0KSBzZWxmLmlucHV0LnVwZGF0ZUJvdW5kcygpO1xyXG4gICAgfSwgMClcclxufVxyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihjbGVhckNhY2hlKVxyXG57XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3lzdGVtcy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLmRlc3Ryb3kpIHRoaXMuc3lzdGVtc1tpXS5kZXN0cm95KGNsZWFyQ2FjaGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoY2xlYXJDYWNoZSkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmNsZWFyQ2FjaGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yYWYpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmFmLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kZXN0cm95X2NiLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG59XHJcbiIsInJlcXVpcmUoJy4vdXRpbHMvcG9seWZpbGwuanMnKTtcclxuXHJcbndpbmRvdy5UaW55ID0ge307XHJcblxyXG5yZXF1aXJlKCcuL0FwcC5qcycpO1xyXG5yZXF1aXJlKCcuL2dsb2JhbC5qcycpO1xyXG5yZXF1aXJlKCcuL21hdGgvTWF0aC5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoJy4vbWF0aC9Qb2ludC5qcycpOyAgICAgIC8vXHJcbnJlcXVpcmUoJy4vbWF0aC9NYXRyaXguanMnKTsgICAgIC8vXHJcbnJlcXVpcmUoJy4vbWF0aC9SZWN0YW5nbGUuanMnKTsgIC8vICA4IEtiXHJcblxyXG5yZXF1aXJlKCcuL29iamVjdHMvQmFzZU9iamVjdDJELmpzJyk7ICAgICAgICAgICAgIC8vXHJcbnJlcXVpcmUoJy4vb2JqZWN0cy9PYmplY3QyRC5qcycpOyAgICAvL1xyXG5yZXF1aXJlKCcuL29iamVjdHMvU2NlbmUuanMnKTsgICAgICAgICAgICAgICAgICAgICAvLyAxMCBLYlxyXG5cclxucmVxdWlyZSgnLi9yZW5kZXJlcnMvQ2FudmFzUmVuZGVyZXIuanMnKTsgLy8gMyBLYiIsIlxyXG5UaW55LlZFUlNJT04gPSBcIjEuNC45XCI7XHJcblxyXG5UaW55LnN5c3RlbXMgPSBbXTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0gPSBmdW5jdGlvbihuYW1lLCBzeXN0ZW0pIHtcclxuICAgIFRpbnkuc3lzdGVtcy5wdXNoKHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIF9jbGFzc186IHN5c3RlbVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblRpbnkuUHJpbWl0aXZlcyA9IHtcclxuICAgIFBPTFk6IDAsXHJcbiAgICBSRUNUOiAxLCBcclxuICAgIENJUkM6IDIsXHJcbiAgICBFTElQOiAzLFxyXG4gICAgUlJFQzogNCxcclxuICAgIFJSRUNfTEpPSU46IDVcclxufVxyXG5cclxuVGlueS5ybmQgPSBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XHJcbn07XHJcblxyXG5UaW55LmNvbG9yMnJnYiA9IGZ1bmN0aW9uKHN0eWxlKSB7XHJcbiAgICByZXR1cm4gVGlueS5oZXgycmdiKFRpbnkuc3R5bGUyaGV4KHN0eWxlKSk7XHJcbn1cclxuXHJcblRpbnkuY29sb3Iyc3R5bGUgPSBmdW5jdGlvbihzdHlsZSkge1xyXG4gICAgcmV0dXJuIHN0eWxlO1xyXG59O1xyXG5cclxuVGlueS5zdHlsZTJoZXggPSBmdW5jdGlvbihzdHlsZSkge1xyXG4gICAgcmV0dXJuICtzdHlsZS5yZXBsYWNlKCcjJywgJzB4Jyk7XHJcbn07XHJcblxyXG5UaW55LmhleDJzdHlsZSA9IGZ1bmN0aW9uKGhleCkge1xyXG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICggaGV4IHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG59XHJcblxyXG5UaW55LmhleDJyZ2IgPSBmdW5jdGlvbihoZXgpIHtcclxuICAgIHJldHVybiBbKGhleCA+PiAxNiAmIDB4RkYpIC8gMjU1LCAoIGhleCA+PiA4ICYgMHhGRikgLyAyNTUsIChoZXggJiAweEZGKS8gMjU1XTtcclxufTtcclxuXHJcblRpbnkucmdiMmhleCA9IGZ1bmN0aW9uKHJnYikge1xyXG4gICAgcmV0dXJuICgocmdiWzBdKjI1NSA8PCAxNikgKyAocmdiWzFdKjI1NSA8PCA4KSArIHJnYlsyXSoyNTUpO1xyXG59OyIsInJlcXVpcmUoJy4vbWluaS5qcycpXHJcblxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvT2JqZWN0Q3JlYXRvci5qcycpOyAvLyAxIEtiXHJcbi8vIHJlcXVpcmUoJy4vc3lzdGVtcy9Mb2FkZXIuanMnKTsgLy8gMyBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvSW5wdXQuanMnKTsgLy8gMSBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvVGltZXIuanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvVHdlZW4uanMnKTtcclxuXHJcbnJlcXVpcmUoJy4vbWF0aC9Sb3VuZGVkUmVjdGFuZ2xlLmpzJyk7XHQvL1xyXG5yZXF1aXJlKCcuL21hdGgvUG9seWdvbi5qcycpO1x0XHRcdC8vXHJcbnJlcXVpcmUoJy4vbWF0aC9DaXJjbGUuanMnKTtcdFx0XHQvLyA2IEtiXHJcblxyXG5yZXF1aXJlKCcuL3JlbmRlcmVycy9HcmFwaGljc1JlbmRlcmVyLmpzJyk7IC8vIDRLYlxyXG5cclxucmVxdWlyZSgnLi9vYmplY3RzL0dyYXBoaWNzLmpzJyk7IC8vIDEwIEtiXHJcbi8vIHJlcXVpcmUoJy4vb2JqZWN0cy9UaWxpbmdTcHJpdGUuanMnKTsgLy8gNCBLYiAgICMjIyMjIyMjIyMjIyMjIyBUaWxpbmdTcHJpdGUgIGdhbWUuYWRkLnRpbGVzcHJpdGVcclxuXHJcbnJlcXVpcmUoJy4vdGV4dHVyZXMvUmVuZGVyVGV4dHVyZS5qcycpOyAvLyAyIEtiXHJcblxyXG5yZXF1aXJlKCcuL3V0aWxzL0NhbnZhc0J1ZmZlci5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoJy4vcmVuZGVyZXJzL0NhbnZhc01hc2tNYW5hZ2VyLmpzJyk7IC8vIDFLYlxyXG5yZXF1aXJlKCcuL3JlbmRlcmVycy9DYW52YXNUaW50ZXIuanMnKTsgLy8gMyBLYiAjIyMjIyMjIyMjIyMjIyMjIHRpbnQgZnVuY3Rpb24iLCJUaW55LkNpcmNsZSA9IGZ1bmN0aW9uICh4LCB5LCBkaWFtZXRlcikge1xyXG5cclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgZGlhbWV0ZXIgPSBkaWFtZXRlciB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcblxyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB0aGlzLl9kaWFtZXRlciA9IGRpYW1ldGVyO1xyXG5cclxuICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcblxyXG4gICAgaWYgKGRpYW1ldGVyID4gMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSBkaWFtZXRlciAqIDAuNTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuQ0lSQztcclxuXHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgZ2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGlueS5SZWN0YW5nbGUodGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLmRpYW1ldGVyLCB0aGlzLmRpYW1ldGVyKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRvOiBmdW5jdGlvbiAoeCwgeSwgZGlhbWV0ZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuX2RpYW1ldGVyID0gZGlhbWV0ZXI7XHJcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gZGlhbWV0ZXIgKiAwLjU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29weUZyb206IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0VG8oc291cmNlLngsIHNvdXJjZS55LCBzb3VyY2UuZGlhbWV0ZXIpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29weVRvOiBmdW5jdGlvbiAoZGVzdCkge1xyXG5cclxuICAgICAgICBkZXN0LnggPSB0aGlzLng7XHJcbiAgICAgICAgZGVzdC55ID0gdGhpcy55O1xyXG4gICAgICAgIGRlc3QuZGlhbWV0ZXIgPSB0aGlzLl9kaWFtZXRlcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlc3Q7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24gKGRlc3QsIHJvdW5kKSB7XHJcblxyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IFRpbnkuTWF0aC5kaXN0YW5jZSh0aGlzLngsIHRoaXMueSwgZGVzdC54LCBkZXN0LnkpO1xyXG4gICAgICAgIHJldHVybiByb3VuZCA/IE1hdGgucm91bmQoZGlzdGFuY2UpIDogZGlzdGFuY2U7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvdXRwdXQgPT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5DaXJjbGUodGhpcy54LCB0aGlzLnksIHRoaXMuZGlhbWV0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXQuc2V0VG8odGhpcy54LCB0aGlzLnksIHRoaXMuZGlhbWV0ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoeCwgeSkge1xyXG5cclxuICAgICAgICByZXR1cm4gVGlueS5DaXJjbGUuY29udGFpbnModGhpcywgeCwgeSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvZmZzZXQ6IGZ1bmN0aW9uIChkeCwgZHkpIHtcclxuXHJcbiAgICAgICAgdGhpcy54ICs9IGR4O1xyXG4gICAgICAgIHRoaXMueSArPSBkeTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvZmZzZXRQb2ludDogZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0KHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2lyY2xlO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJkaWFtZXRlclwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpYW1ldGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWUgKiAwLjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcInJhZGl1c1wiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IHZhbHVlICogMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImxlZnRcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggLSB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMueClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnggLSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPCB0aGlzLngpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdmFsdWUgLSB0aGlzLng7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJ0b3BcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgLSB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnkgLSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHZhbHVlIC0gdGhpcy55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiYXJlYVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yYWRpdXMgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguUEkgKiB0aGlzLl9yYWRpdXMgKiB0aGlzLl9yYWRpdXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiZW1wdHlcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fZGlhbWV0ZXIgPT09IDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKDAsIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblRpbnkuQ2lyY2xlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGEsIHgsIHkpIHtcclxuXHJcbiAgICAvLyAgQ2hlY2sgaWYgeC95IGFyZSB3aXRoaW4gdGhlIGJvdW5kcyBmaXJzdFxyXG4gICAgaWYgKGEucmFkaXVzID4gMCAmJiB4ID49IGEubGVmdCAmJiB4IDw9IGEucmlnaHQgJiYgeSA+PSBhLnRvcCAmJiB5IDw9IGEuYm90dG9tKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkeCA9IChhLnggLSB4KSAqIChhLnggLSB4KTtcclxuICAgICAgICB2YXIgZHkgPSAoYS55IC0geSkgKiAoYS55IC0geSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoZHggKyBkeSkgPD0gKGEucmFkaXVzICogYS5yYWRpdXMpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgcmV0dXJuIChhLnggPT0gYi54ICYmIGEueSA9PSBiLnkgJiYgYS5kaWFtZXRlciA9PSBiLmRpYW1ldGVyKTtcclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgcmV0dXJuIChUaW55Lk1hdGguZGlzdGFuY2UoYS54LCBhLnksIGIueCwgYi55KSA8PSAoYS5yYWRpdXMgKyBiLnJhZGl1cykpO1xyXG59O1xyXG5cclxuXHJcblRpbnkuQ2lyY2xlLmludGVyc2VjdHNSZWN0YW5nbGUgPSBmdW5jdGlvbiAoYywgcikge1xyXG5cclxuICAgIHZhciBjeCA9IE1hdGguYWJzKGMueCAtIHIueCAtIHIuaGFsZldpZHRoKTtcclxuICAgIHZhciB4RGlzdCA9IHIuaGFsZldpZHRoICsgYy5yYWRpdXM7XHJcblxyXG4gICAgaWYgKGN4ID4geERpc3QpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjeSA9IE1hdGguYWJzKGMueSAtIHIueSAtIHIuaGFsZkhlaWdodCk7XHJcbiAgICB2YXIgeURpc3QgPSByLmhhbGZIZWlnaHQgKyBjLnJhZGl1cztcclxuXHJcbiAgICBpZiAoY3kgPiB5RGlzdClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN4IDw9IHIuaGFsZldpZHRoIHx8IGN5IDw9IHIuaGFsZkhlaWdodClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeENvcm5lckRpc3QgPSBjeCAtIHIuaGFsZldpZHRoO1xyXG4gICAgdmFyIHlDb3JuZXJEaXN0ID0gY3kgLSByLmhhbGZIZWlnaHQ7XHJcbiAgICB2YXIgeENvcm5lckRpc3RTcSA9IHhDb3JuZXJEaXN0ICogeENvcm5lckRpc3Q7XHJcbiAgICB2YXIgeUNvcm5lckRpc3RTcSA9IHlDb3JuZXJEaXN0ICogeUNvcm5lckRpc3Q7XHJcbiAgICB2YXIgbWF4Q29ybmVyRGlzdFNxID0gYy5yYWRpdXMgKiBjLnJhZGl1cztcclxuXHJcbiAgICByZXR1cm4geENvcm5lckRpc3RTcSArIHlDb3JuZXJEaXN0U3EgPD0gbWF4Q29ybmVyRGlzdFNxO1xyXG5cclxufTtcclxuIiwiXHJcblRpbnkuTWF0aCA9IHtcclxuXHJcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyKSB7XHJcblxyXG4gICAgICAgIHZhciBkeCA9IHgxIC0geDI7XHJcbiAgICAgICAgdmFyIGR5ID0geTEgLSB5MjtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvciA9IE1hdGguUEkgLyAxODA7XHJcbnZhciByYWRpYW5Ub0RlZ3JlZXNGYWN0b3IgPSAxODAgLyBNYXRoLlBJO1xyXG5cclxuVGlueS5NYXRoLmRlZ1RvUmFkID0gZnVuY3Rpb24gZGVnVG9SYWQgKGRlZ3JlZXMpIHtcclxuICAgIHJldHVybiBkZWdyZWVzICogZGVncmVlVG9SYWRpYW5zRmFjdG9yO1xyXG59O1xyXG5cclxuVGlueS5NYXRoLnJhZFRvRGVnID0gZnVuY3Rpb24gcmFkVG9EZWcgKHJhZGlhbnMpIHtcclxuICAgIHJldHVybiByYWRpYW5zICogcmFkaWFuVG9EZWdyZWVzRmFjdG9yO1xyXG59OyIsIlxyXG5UaW55Lk1hdHJpeCA9IGZ1bmN0aW9uKClcclxue1xyXG5cclxuICAgIHRoaXMuYSA9IDE7XHJcblxyXG4gICAgdGhpcy5iID0gMDtcclxuXHJcbiAgICB0aGlzLmMgPSAwO1xyXG5cclxuICAgIHRoaXMuZCA9IDE7XHJcblxyXG4gICAgdGhpcy50eCA9IDA7XHJcblxyXG4gICAgdGhpcy50eSA9IDA7XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5NQVRSSVg7XHJcblxyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmZyb21BcnJheSA9IGZ1bmN0aW9uKGFycmF5KVxyXG57XHJcbiAgICB0aGlzLmEgPSBhcnJheVswXTtcclxuICAgIHRoaXMuYiA9IGFycmF5WzFdO1xyXG4gICAgdGhpcy5jID0gYXJyYXlbM107XHJcbiAgICB0aGlzLmQgPSBhcnJheVs0XTtcclxuICAgIHRoaXMudHggPSBhcnJheVsyXTtcclxuICAgIHRoaXMudHkgPSBhcnJheVs1XTtcclxufTtcclxuXHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKHRyYW5zcG9zZSlcclxue1xyXG4gICAgaWYgKCF0aGlzLmFycmF5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XHJcblxyXG4gICAgaWYgKHRyYW5zcG9zZSlcclxuICAgIHtcclxuICAgICAgICBhcnJheVswXSA9IHRoaXMuYTtcclxuICAgICAgICBhcnJheVsxXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVsyXSA9IDA7XHJcbiAgICAgICAgYXJyYXlbM10gPSB0aGlzLmM7XHJcbiAgICAgICAgYXJyYXlbNF0gPSB0aGlzLmQ7XHJcbiAgICAgICAgYXJyYXlbNV0gPSAwO1xyXG4gICAgICAgIGFycmF5WzZdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVs3XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbOF0gPSAxO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5jO1xyXG4gICAgICAgIGFycmF5WzJdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbNl0gPSAwO1xyXG4gICAgICAgIGFycmF5WzddID0gMDtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24ocG9zLCBuZXdQb3MpXHJcbntcclxuICAgIG5ld1BvcyA9IG5ld1BvcyB8fCBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICB2YXIgeSA9IHBvcy55O1xyXG5cclxuICAgIG5ld1Bvcy54ID0gdGhpcy5hICogeCArIHRoaXMuYyAqIHkgKyB0aGlzLnR4O1xyXG4gICAgbmV3UG9zLnkgPSB0aGlzLmIgKiB4ICsgdGhpcy5kICogeSArIHRoaXMudHk7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BvcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBseUludmVyc2UgPSBmdW5jdGlvbihwb3MsIG5ld1Bvcylcclxue1xyXG4gICAgbmV3UG9zID0gbmV3UG9zIHx8IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdmFyIGlkID0gMSAvICh0aGlzLmEgKiB0aGlzLmQgKyB0aGlzLmMgKiAtdGhpcy5iKTtcclxuICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICB2YXIgeSA9IHBvcy55O1xyXG5cclxuICAgIG5ld1Bvcy54ID0gdGhpcy5kICogaWQgKiB4ICsgLXRoaXMuYyAqIGlkICogeSArICh0aGlzLnR5ICogdGhpcy5jIC0gdGhpcy50eCAqIHRoaXMuZCkgKiBpZDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5hICogaWQgKiB5ICsgLXRoaXMuYiAqIGlkICogeCArICgtdGhpcy50eSAqIHRoaXMuYSArIHRoaXMudHggKiB0aGlzLmIpICogaWQ7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BvcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbih4LCB5KVxyXG57XHJcbiAgICB0aGlzLnR4ICs9IHg7XHJcbiAgICB0aGlzLnR5ICs9IHk7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgdGhpcy5hICo9IHg7XHJcbiAgICB0aGlzLmQgKj0geTtcclxuICAgIHRoaXMuYyAqPSB4O1xyXG4gICAgdGhpcy5iICo9IHk7XHJcbiAgICB0aGlzLnR4ICo9IHg7XHJcbiAgICB0aGlzLnR5ICo9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24oYW5nbGUpXHJcbntcclxuICAgIHZhciBjb3MgPSBNYXRoLmNvcyggYW5nbGUgKTtcclxuICAgIHZhciBzaW4gPSBNYXRoLnNpbiggYW5nbGUgKTtcclxuXHJcbiAgICB2YXIgYTEgPSB0aGlzLmE7XHJcbiAgICB2YXIgYzEgPSB0aGlzLmM7XHJcbiAgICB2YXIgdHgxID0gdGhpcy50eDtcclxuXHJcbiAgICB0aGlzLmEgPSBhMSAqIGNvcy10aGlzLmIgKiBzaW47XHJcbiAgICB0aGlzLmIgPSBhMSAqIHNpbit0aGlzLmIgKiBjb3M7XHJcbiAgICB0aGlzLmMgPSBjMSAqIGNvcy10aGlzLmQgKiBzaW47XHJcbiAgICB0aGlzLmQgPSBjMSAqIHNpbit0aGlzLmQgKiBjb3M7XHJcbiAgICB0aGlzLnR4ID0gdHgxICogY29zIC0gdGhpcy50eSAqIHNpbjtcclxuICAgIHRoaXMudHkgPSB0eDEgKiBzaW4gKyB0aGlzLnR5ICogY29zO1xyXG4gXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihtYXRyaXgpXHJcbntcclxuICAgIHZhciBhMSA9IHRoaXMuYTtcclxuICAgIHZhciBiMSA9IHRoaXMuYjtcclxuICAgIHZhciBjMSA9IHRoaXMuYztcclxuICAgIHZhciBkMSA9IHRoaXMuZDtcclxuXHJcbiAgICB0aGlzLmEgID0gbWF0cml4LmEgKiBhMSArIG1hdHJpeC5iICogYzE7XHJcbiAgICB0aGlzLmIgID0gbWF0cml4LmEgKiBiMSArIG1hdHJpeC5iICogZDE7XHJcbiAgICB0aGlzLmMgID0gbWF0cml4LmMgKiBhMSArIG1hdHJpeC5kICogYzE7XHJcbiAgICB0aGlzLmQgID0gbWF0cml4LmMgKiBiMSArIG1hdHJpeC5kICogZDE7XHJcblxyXG4gICAgdGhpcy50eCA9IG1hdHJpeC50eCAqIGExICsgbWF0cml4LnR5ICogYzEgKyB0aGlzLnR4O1xyXG4gICAgdGhpcy50eSA9IG1hdHJpeC50eCAqIGIxICsgbWF0cml4LnR5ICogZDEgKyB0aGlzLnR5O1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5pZGVudGl0eSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5hID0gMTtcclxuICAgIHRoaXMuYiA9IDA7XHJcbiAgICB0aGlzLmMgPSAwO1xyXG4gICAgdGhpcy5kID0gMTtcclxuICAgIHRoaXMudHggPSAwO1xyXG4gICAgdGhpcy50eSA9IDA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LmlkZW50aXR5TWF0cml4ID0gbmV3IFRpbnkuTWF0cml4KCk7IiwiVGlueS5Qb2ludCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbn07XHJcblxyXG5UaW55LlBvaW50LnByb3RvdHlwZSA9IHtcclxuXHQgc2V0OiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8ICggKHkgIT09IDApID8gdGhpcy54IDogMCApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufTsiLCJcclxuVGlueS5Qb2x5Z29uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hcmVhID0gMDtcclxuICAgIHRoaXMuX3BvaW50cyA9IFtdO1xyXG5cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldFRvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUE9MWTtcclxuXHJcbn07XHJcblxyXG5UaW55LlBvbHlnb24ucHJvdG90eXBlID0ge1xyXG5cclxuICAgIHRvTnVtYmVyQXJyYXk6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09ICd1bmRlZmluZWQnKSB7IG91dHB1dCA9IFtdOyB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcG9pbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9wb2ludHNbaV0gPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2godGhpcy5fcG9pbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0ueCk7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaV0ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBmbGF0dGVuOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMudG9OdW1iZXJBcnJheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcblxyXG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLl9wb2ludHMuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09IFwidW5kZWZpbmVkXCIgfHwgb3V0cHV0ID09PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gbmV3IFRpbnkuUG9seWdvbihwb2ludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXQuc2V0VG8ocG9pbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuX3BvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGluc2lkZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gLTEsIGogPSBsZW5ndGggLSAxOyArK2kgPCBsZW5ndGg7IGogPSBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGl4ID0gdGhpcy5fcG9pbnRzW2ldLng7XHJcbiAgICAgICAgICAgIHZhciBpeSA9IHRoaXMuX3BvaW50c1tpXS55O1xyXG5cclxuICAgICAgICAgICAgdmFyIGp4ID0gdGhpcy5fcG9pbnRzW2pdLng7XHJcbiAgICAgICAgICAgIHZhciBqeSA9IHRoaXMuX3BvaW50c1tqXS55O1xyXG5cclxuICAgICAgICAgICAgaWYgKCgoaXkgPD0geSAmJiB5IDwgankpIHx8IChqeSA8PSB5ICYmIHkgPCBpeSkpICYmICh4IDwgKGp4IC0gaXgpICogKHkgLSBpeSkgLyAoankgLSBpeSkgKyBpeCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnNpZGU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHBvaW50cykge1xyXG5cclxuICAgICAgICB0aGlzLmFyZWEgPSAwO1xyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgSWYgcG9pbnRzIGlzbid0IGFuIGFycmF5LCB1c2UgYXJndW1lbnRzIGFzIHRoZSBhcnJheVxyXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocG9pbnRzKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHkwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICAgICAgICAgIC8vICBBbGxvd3MgZm9yIG1peGVkLXR5cGUgYXJndW1lbnRzXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcG9pbnRzW2ldID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBUaW55LlBvaW50KHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IFRpbnkuUG9pbnQocG9pbnRzW2ldLngsIHBvaW50c1tpXS55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2ludHMucHVzaChwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgTG93ZXN0IGJvdW5kYXJ5XHJcbiAgICAgICAgICAgICAgICBpZiAocC55IDwgeTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTAgPSBwLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQXJlYSh5MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGN1bGF0ZUFyZWE6IGZ1bmN0aW9uICh5MCkge1xyXG5cclxuICAgICAgICB2YXIgcDE7XHJcbiAgICAgICAgdmFyIHAyO1xyXG4gICAgICAgIHZhciBhdmdIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHdpZHRoO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5fcG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcDEgPSB0aGlzLl9wb2ludHNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLl9wb2ludHNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuX3BvaW50c1tpICsgMV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF2Z0hlaWdodCA9ICgocDEueSAtIHkwKSArIChwMi55IC0geTApKSAvIDI7XHJcbiAgICAgICAgICAgIHdpZHRoID0gcDEueCAtIHAyLng7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSArPSBhdmdIZWlnaHQgKiB3aWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmFyZWE7XHJcblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuUG9seWdvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlBvbHlnb247XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5Qb2x5Z29uLnByb3RvdHlwZSwgJ3BvaW50cycsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24ocG9pbnRzKSB7XHJcblxyXG4gICAgICAgIGlmIChwb2ludHMgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG8ocG9pbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gIENsZWFyIHRoZSBwb2ludHNcclxuICAgICAgICAgICAgdGhpcy5zZXRUbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuIiwiXHJcblRpbnkuUmVjdGFuZ2xlID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcbiAgICB4ID0geCB8fCAwO1xyXG4gICAgeSA9IHkgfHwgMDtcclxuICAgIHdpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIGhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SRUNUXHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGludGVyc2VjdHM6IGZ1bmN0aW9uIChiKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzKHRoaXMsIGIpO1xyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLnkpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdmFsdWUgLSB0aGlzLnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPD0gdGhpcy54KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB2YWx1ZSAtIHRoaXMueDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwidm9sdW1lXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LlJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJlY3RhbmdsZTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGEsIHgsIHkpIHtcclxuXHJcbiAgICBpZiAoYS53aWR0aCA8PSAwIHx8IGEuaGVpZ2h0IDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoeCA+PSBhLnggJiYgeCA8IGEucmlnaHQgJiYgeSA+PSBhLnkgJiYgeSA8IGEuYm90dG9tKTtcclxuXHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKGEsIHBvaW50KSB7XHJcblxyXG4gICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zKGEsIHBvaW50LngsIHBvaW50LnkpO1xyXG5cclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUmVjdCA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblxyXG4gICAgLy8gIElmIHRoZSBnaXZlbiByZWN0IGhhcyBhIGxhcmdlciB2b2x1bWUgdGhhbiB0aGlzIG9uZSB0aGVuIGl0IGNhbiBuZXZlciBjb250YWluIGl0XHJcbiAgICBpZiAoYS52b2x1bWUgPiBiLnZvbHVtZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChhLnggPj0gYi54ICYmIGEueSA+PSBiLnkgJiYgYS5yaWdodCA8IGIucmlnaHQgJiYgYS5ib3R0b20gPCBiLmJvdHRvbSk7XHJcblxyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblxyXG4gICAgaWYgKGEud2lkdGggPD0gMCB8fCBhLmhlaWdodCA8PSAwIHx8IGIud2lkdGggPD0gMCB8fCBiLmhlaWdodCA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIShhLnJpZ2h0IDwgYi54IHx8IGEuYm90dG9tIDwgYi55IHx8IGEueCA+IGIucmlnaHQgfHwgYS55ID4gYi5ib3R0b20pO1xyXG5cclxufTtcclxuXHJcblRpbnkuRW1wdHlSZWN0YW5nbGUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMCwgMCk7IiwiVGlueS5Sb3VuZGVkUmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG57XHJcblxyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXMgfHwgMjA7XHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUlJFQztcclxufTtcclxuXHJcblRpbnkuUm91bmRlZFJlY3RhbmdsZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiBuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5yYWRpdXMpO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIGlmICh0aGlzLndpZHRoIDw9IDAgfHwgdGhpcy5oZWlnaHQgPD0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHgxID0gdGhpcy54O1xyXG5cclxuICAgIGlmICh4ID49IHgxICYmIHggPD0geDEgKyB0aGlzLndpZHRoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB5MSA9IHRoaXMueTtcclxuXHJcbiAgICAgICAgaWYgKHkgPj0geTEgJiYgeSA8PSB5MSArIHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuUm91bmRlZFJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJvdW5kZWRSZWN0YW5nbGU7IiwicmVxdWlyZSgnLi9iYXNlLmpzJylcclxuXHJcblxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvUkFGLmpzJyk7IC8vIDIgS2JcclxuLy8gcmVxdWlyZSgnLi9zeXN0ZW1zL09iamVjdENyZWF0b3IuanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvTG9hZGVyLmpzJyk7IC8vIDMgS2JcclxucmVxdWlyZSgnLi9zeXN0ZW1zL0lucHV0LmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZSgnLi9zeXN0ZW1zL1RpbWVyLmpzJyk7IC8vIDEgS2JcclxuXHJcbnJlcXVpcmUoJy4vdXRpbHMvRXZlbnRFbWl0dGVyLmpzJyk7XHJcblxyXG5yZXF1aXJlKCcuL3RleHR1cmVzL1RleHR1cmUuanMnKTtcdFx0Ly8gNCBLYlxyXG5cclxucmVxdWlyZSgnLi9vYmplY3RzL1Nwcml0ZS5qcycpOyAvLyAzIEtiXHJcbnJlcXVpcmUoJy4vb2JqZWN0cy9UZXh0LmpzJyk7IC8vIDUgS2JcclxuXHJcblxyXG4iLCJcclxudmFyIHBpMiA9IE1hdGguUEkgKiAyO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVGlueS5Qb2ludCgwLCAwKTtcclxuICAgIHRoaXMuc2NhbGUgPSBuZXcgVGlueS5Qb2ludCgxLCAxKTtcclxuICAgIHRoaXMucGl2b3QgPSBuZXcgVGlueS5Qb2ludCgwLCAwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAwO1xyXG4gICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSAxO1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4gICAgdGhpcy5fc3IgPSAwO1xyXG4gICAgdGhpcy5fY3IgPSAxO1xyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IGZhbHNlO1xyXG59O1xyXG5cclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQmFzZU9iamVjdDJEO1xyXG5cclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZiAodGhpcy5wYXJlbnQpXHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlKCB0aGlzIClcclxuXHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbnVsbDtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCAnd29ybGRWaXNpYmxlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBpdGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgZG9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghaXRlbS52aXNpYmxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUoaXRlbSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCAnY2FjaGVBc0JpdG1hcCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fY2FjaGVBc0JpdG1hcDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICghdGhpcy5wYXJlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBzb21lIG1hdHJpeCByZWZzIGZvciBlYXN5IGFjY2Vzc1xyXG4gICAgdmFyIHB0ID0gdGhpcy5wYXJlbnQud29ybGRUcmFuc2Zvcm07XHJcbiAgICB2YXIgd3QgPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIC8vIHRlbXBvcmFyeSBtYXRyaXggdmFyaWFibGVzXHJcbiAgICB2YXIgYSwgYiwgYywgZCwgdHgsIHR5O1xyXG5cclxuICAgIC8vIHNvIGlmIHJvdGF0aW9uIGlzIGJldHdlZW4gMCB0aGVuIHdlIGNhbiBzaW1wbGlmeSB0aGUgbXVsdGlwbGljYXRpb24gcHJvY2Vzcy4uXHJcbiAgICBpZiAodGhpcy5yb3RhdGlvbiAlIHBpMilcclxuICAgIHtcclxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHJvdGF0aW9uIGlzIHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91cyByZW5kZXIuIFRoaXMgbWVhbnMgd2Ugb25seSBuZWVkIHRvIHVzZSBzaW4gYW5kIGNvcyB3aGVuIHJvdGF0aW9uIGFjdHVhbGx5IGNoYW5nZXNcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbiAhPT0gdGhpcy5yb3RhdGlvbkNhY2hlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkNhY2hlID0gdGhpcy5yb3RhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fc3IgPSBNYXRoLnNpbih0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fY3IgPSBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbWF0cml4IHZhbHVlcyBvZiB0aGUgZGlzcGxheW9iamVjdCBiYXNlZCBvbiBpdHMgdHJhbnNmb3JtIHByb3BlcnRpZXMuLlxyXG4gICAgICAgIGEgID0gIHRoaXMuX2NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGIgID0gIHRoaXMuX3NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGMgID0gLXRoaXMuX3NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIGQgID0gIHRoaXMuX2NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIHR4ID0gIHRoaXMucG9zaXRpb24ueDtcclxuICAgICAgICB0eSA9ICB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIHBpdm90Li4gbm90IG9mdGVuIHVzZWQgc28gZ2VhcmVkIHRvd2FyZHMgdGhhdCBmYWN0IVxyXG4gICAgICAgIGlmICh0aGlzLnBpdm90LnggfHwgdGhpcy5waXZvdC55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHggLT0gdGhpcy5waXZvdC54ICogYSArIHRoaXMucGl2b3QueSAqIGM7XHJcbiAgICAgICAgICAgIHR5IC09IHRoaXMucGl2b3QueCAqIGIgKyB0aGlzLnBpdm90LnkgKiBkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uY2F0IHRoZSBwYXJlbnQgbWF0cml4IHdpdGggdGhlIG9iamVjdHMgdHJhbnNmb3JtLlxyXG4gICAgICAgIHd0LmEgID0gYSAgKiBwdC5hICsgYiAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmIgID0gYSAgKiBwdC5iICsgYiAgKiBwdC5kO1xyXG4gICAgICAgIHd0LmMgID0gYyAgKiBwdC5hICsgZCAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgID0gYyAgKiBwdC5iICsgZCAgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICAvLyBsZXRzIGRvIHRoZSBmYXN0IHZlcnNpb24gYXMgd2Uga25vdyB0aGVyZSBpcyBubyByb3RhdGlvbi4uXHJcbiAgICAgICAgYSAgPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgZCAgPSB0aGlzLnNjYWxlLnk7XHJcblxyXG4gICAgICAgIHR4ID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy5waXZvdC54ICogYTtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueSAtIHRoaXMucGl2b3QueSAqIGQ7XHJcblxyXG4gICAgICAgIHd0LmEgID0gYSAgKiBwdC5hO1xyXG4gICAgICAgIHd0LmIgID0gYSAgKiBwdC5iO1xyXG4gICAgICAgIHd0LmMgID0gZCAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgID0gZCAgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtdWx0aXBseSB0aGUgYWxwaGFzLi5cclxuICAgIHRoaXMud29ybGRBbHBoYSA9IHRoaXMuYWxwaGEgKiB0aGlzLnBhcmVudC53b3JsZEFscGhhO1xyXG5cclxufTtcclxuXHJcbi8vIHBlcmZvcm1hbmNlIGluY3JlYXNlIHRvIGF2b2lkIHVzaW5nIGNhbGwuLiAoMTB4IGZhc3RlcilcclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0gPSBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKG1hdHJpeClcclxue1xyXG4gICAgLy8gbWF0cml4ID0gbWF0cml4Oy8vanVzdCB0byBnZXQgcGFzc2VkIGpzIGhpbnRpbmcgKGFuZCBwcmVzZXJ2ZSBpbmhlcml0YW5jZSlcclxuICAgIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5nZXRCb3VuZHMoVGlueS5pZGVudGl0eU1hdHJpeCk7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZ2VuZXJhdGVUZXh0dXJlID0gZnVuY3Rpb24ocmVzb2x1dGlvbiwgcmVuZGVyZXIpXHJcbntcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwLCByZW5kZXJlciwgcmVzb2x1dGlvbik7XHJcbiAgICBcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LnR4ID0gLWJvdW5kcy54O1xyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHkgPSAtYm91bmRzLnk7XHJcbiAgICBcclxuICAgIHJlbmRlclRleHR1cmUucmVuZGVyKHRoaXMsIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4KTtcclxuXHJcbiAgICByZXR1cm4gcmVuZGVyVGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVDYWNoZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxufTtcclxuXHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudG9HbG9iYWwgPSBmdW5jdGlvbihwb3NpdGlvbilcclxue1xyXG4gICAgLy8gZG9uJ3QgbmVlZCB0byB1W2RhdGUgdGhlIGxvdFxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICByZXR1cm4gdGhpcy53b3JsZFRyYW5zZm9ybS5hcHBseShwb3NpdGlvbik7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudG9Mb2NhbCA9IGZ1bmN0aW9uKHBvc2l0aW9uLCBmcm9tKVxyXG57XHJcbiAgICBpZiAoZnJvbSlcclxuICAgIHtcclxuICAgICAgICBwb3NpdGlvbiA9IGZyb20udG9HbG9iYWwocG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvbid0IG5lZWQgdG8gdVtkYXRlIHRoZSBsb3RcclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLndvcmxkVHJhbnNmb3JtLmFwcGx5SW52ZXJzZShwb3NpdGlvbik7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX3JlbmRlckNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsIHJlbmRlclNlc3Npb24pO1xyXG4gICAgXHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsO1xyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwKTsvLywgcmVuZGVyU2Vzc2lvbi5yZW5kZXJlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG5ldyBUaW55LlNwcml0ZShyZW5kZXJUZXh0dXJlKTtcclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUud29ybGRUcmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlc2l6ZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LnR4ID0gLWJvdW5kcy54O1xyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHkgPSAtYm91bmRzLnk7XHJcbiAgICBcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlbmRlcih0aGlzLCBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeCwgdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci54ID0gLSggYm91bmRzLnggLyBib3VuZHMud2lkdGggKTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueSA9IC0oIGJvdW5kcy55IC8gYm91bmRzLmhlaWdodCApO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9kZXN0cm95Q2FjaGVkU3ByaXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbnVsbDtcclxufTtcclxuXHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgXHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCAneCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLng7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgJ3knLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi55O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4ID0gbmV3IFRpbnkuTWF0cml4KCk7IiwiVGlueS5HcmFwaGljc0RhdGEgPSBmdW5jdGlvbihsaW5lV2lkdGgsIGxpbmVDb2xvciwgbGluZUFscGhhLCBmaWxsQ29sb3IsIGZpbGxBbHBoYSwgZmlsbCwgc2hhcGUpIHtcclxuICAgIHRoaXMubGluZVdpZHRoID0gbGluZVdpZHRoO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSBsaW5lQ29sb3I7XHJcbiAgICB0aGlzLmxpbmVBbHBoYSA9IGxpbmVBbHBoYTtcclxuICAgIHRoaXMuX2xpbmVUaW50ID0gbGluZUNvbG9yO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IGZpbGxBbHBoYTtcclxuICAgIHRoaXMuX2ZpbGxUaW50ID0gZmlsbENvbG9yO1xyXG4gICAgdGhpcy5maWxsID0gZmlsbDtcclxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcclxuICAgIHRoaXMudHlwZSA9IHNoYXBlLnR5cGU7XHJcblxyXG59O1xyXG5cclxuVGlueS5HcmFwaGljc0RhdGEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5HcmFwaGljc0RhdGE7XHJcblxyXG5UaW55LkdyYXBoaWNzRGF0YS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IEdyYXBoaWNzRGF0YShcclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCxcclxuICAgICAgICB0aGlzLmxpbmVDb2xvcixcclxuICAgICAgICB0aGlzLmxpbmVBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGxDb2xvcixcclxuICAgICAgICB0aGlzLmZpbGxBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGwsXHJcbiAgICAgICAgdGhpcy5zaGFwZVxyXG4gICAgKTtcclxuXHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gMTtcclxuICAgIHRoaXMubGluZVdpZHRoID0gMDtcclxuICAgIHRoaXMubGluZUNvbG9yID0gMDtcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhID0gW107XHJcbiAgICB0aGlzLnRpbnQgPSBcIiNGRkZGRkZcIjtcclxuICAgIHRoaXMuYmxlbmRNb2RlID0gXCJzb3VyY2Utb3ZlclwiO1xyXG4gICAgdGhpcy5jdXJyZW50UGF0aCA9IG51bGw7XHJcbiAgICB0aGlzLmlzTWFzayA9IGZhbHNlO1xyXG4gICAgdGhpcy5ib3VuZHNQYWRkaW5nID0gMDtcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcyA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLDAsMSwxKTtcclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSBmYWxzZTtcclxuXHJcbn07XHJcblxyXG4vLyBjb25zdHJ1Y3RvclxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRpbnkuT2JqZWN0MkQucHJvdG90eXBlICk7XHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5HcmFwaGljcztcclxuXHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5saW5lU3R5bGUgPSBmdW5jdGlvbihsaW5lV2lkdGgsIGNvbG9yLCBhbHBoYSlcclxue1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGggfHwgMDtcclxuICAgIHRoaXMubGluZUNvbG9yID0gY29sb3IgfHwgXCIjMDAwMDAwXCI7XHJcbiAgICB0aGlzLmxpbmVBbHBoYSA9IChhbHBoYSA9PT0gdW5kZWZpbmVkKSA/IDEgOiBhbHBoYTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gaGFsZndheSB0aHJvdWdoIGEgbGluZT8gc3RhcnQgYSBuZXcgb25lIVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5Qb2x5Z29uKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLnNsaWNlKC0yKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgaXRzIGVtcHR5IHNvIGxldHMganVzdCBzZXQgdGhlIGxpbmUgcHJvcGVydGllc1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVXaWR0aCA9IHRoaXMubGluZVdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVDb2xvciA9IHRoaXMubGluZUNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVBbHBoYSA9IHRoaXMubGluZUFscGhhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlBvbHlnb24oW3gsIHldKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5saW5lVG8gPSBmdW5jdGlvbih4LCB5KVxyXG57XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMucHVzaCh4LCB5KTtcclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUucXVhZHJhdGljQ3VydmVUbyA9IGZ1bmN0aW9uKGNwWCwgY3BZLCB0b1gsIHRvWSlcclxue1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzID0gWzAsIDBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB4YSxcclxuICAgICAgICB5YSxcclxuICAgICAgICBuID0gMjAsXHJcbiAgICAgICAgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHM7XHJcblxyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZyb21YID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXTtcclxuICAgIHZhciBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV07XHJcbiAgICB2YXIgaiA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyArK2kpXHJcbiAgICB7XHJcbiAgICAgICAgaiA9IGkgLyBuO1xyXG5cclxuICAgICAgICB4YSA9IGZyb21YICsgKCAoY3BYIC0gZnJvbVgpICogaiApO1xyXG4gICAgICAgIHlhID0gZnJvbVkgKyAoIChjcFkgLSBmcm9tWSkgKiBqICk7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKCB4YSArICggKChjcFggKyAoICh0b1ggLSBjcFgpICogaiApKSAtIHhhKSAqIGogKSxcclxuICAgICAgICAgICAgICAgICAgICAgeWEgKyAoICgoY3BZICsgKCAodG9ZIC0gY3BZKSAqIGogKSkgLSB5YSkgKiBqICkgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmJlemllckN1cnZlVG8gPSBmdW5jdGlvbihjcFgsIGNwWSwgY3BYMiwgY3BZMiwgdG9YLCB0b1kpXHJcbntcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyA9IFswLCAwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbiA9IDIwLFxyXG4gICAgICAgIGR0LFxyXG4gICAgICAgIGR0MixcclxuICAgICAgICBkdDMsXHJcbiAgICAgICAgdDIsXHJcbiAgICAgICAgdDMsXHJcbiAgICAgICAgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHM7XHJcblxyXG4gICAgdmFyIGZyb21YID0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl07XHJcbiAgICB2YXIgZnJvbVkgPSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXTtcclxuICAgIHZhciBqID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyArK2kpXHJcbiAgICB7XHJcbiAgICAgICAgaiA9IGkgLyBuO1xyXG5cclxuICAgICAgICBkdCA9ICgxIC0gaik7XHJcbiAgICAgICAgZHQyID0gZHQgKiBkdDtcclxuICAgICAgICBkdDMgPSBkdDIgKiBkdDtcclxuXHJcbiAgICAgICAgdDIgPSBqICogajtcclxuICAgICAgICB0MyA9IHQyICogajtcclxuICAgICAgICBcclxuICAgICAgICBwb2ludHMucHVzaCggZHQzICogZnJvbVggKyAzICogZHQyICogaiAqIGNwWCArIDMgKiBkdCAqIHQyICogY3BYMiArIHQzICogdG9YLFxyXG4gICAgICAgICAgICAgICAgICAgICBkdDMgKiBmcm9tWSArIDMgKiBkdDIgKiBqICogY3BZICsgMyAqIGR0ICogdDIgKiBjcFkyICsgdDMgKiB0b1kpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmFyY1RvID0gZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIsIHJhZGl1cylcclxue1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLnB1c2goeDEsIHkxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oeDEsIHkxKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMsXHJcbiAgICAgICAgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aC0yXSxcclxuICAgICAgICBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoLTFdLFxyXG4gICAgICAgIGExID0gZnJvbVkgLSB5MSxcclxuICAgICAgICBiMSA9IGZyb21YIC0geDEsXHJcbiAgICAgICAgYTIgPSB5MiAgIC0geTEsXHJcbiAgICAgICAgYjIgPSB4MiAgIC0geDEsXHJcbiAgICAgICAgbW0gPSBNYXRoLmFicyhhMSAqIGIyIC0gYjEgKiBhMik7XHJcblxyXG4gICAgaWYgKG1tIDwgMS4wZS04IHx8IHJhZGl1cyA9PT0gMClcclxuICAgIHtcclxuICAgICAgICBpZiAocG9pbnRzW3BvaW50cy5sZW5ndGgtMl0gIT09IHgxIHx8IHBvaW50c1twb2ludHMubGVuZ3RoLTFdICE9PSB5MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHgxLCB5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkZCA9IGExICogYTEgKyBiMSAqIGIxLFxyXG4gICAgICAgICAgICBjYyA9IGEyICogYTIgKyBiMiAqIGIyLFxyXG4gICAgICAgICAgICB0dCA9IGExICogYTIgKyBiMSAqIGIyLFxyXG4gICAgICAgICAgICBrMSA9IHJhZGl1cyAqIE1hdGguc3FydChkZCkgLyBtbSxcclxuICAgICAgICAgICAgazIgPSByYWRpdXMgKiBNYXRoLnNxcnQoY2MpIC8gbW0sXHJcbiAgICAgICAgICAgIGoxID0gazEgKiB0dCAvIGRkLFxyXG4gICAgICAgICAgICBqMiA9IGsyICogdHQgLyBjYyxcclxuICAgICAgICAgICAgY3ggPSBrMSAqIGIyICsgazIgKiBiMSxcclxuICAgICAgICAgICAgY3kgPSBrMSAqIGEyICsgazIgKiBhMSxcclxuICAgICAgICAgICAgcHggPSBiMSAqIChrMiArIGoxKSxcclxuICAgICAgICAgICAgcHkgPSBhMSAqIChrMiArIGoxKSxcclxuICAgICAgICAgICAgcXggPSBiMiAqIChrMSArIGoyKSxcclxuICAgICAgICAgICAgcXkgPSBhMiAqIChrMSArIGoyKSxcclxuICAgICAgICAgICAgc3RhcnRBbmdsZSA9IE1hdGguYXRhbjIocHkgLSBjeSwgcHggLSBjeCksXHJcbiAgICAgICAgICAgIGVuZEFuZ2xlICAgPSBNYXRoLmF0YW4yKHF5IC0gY3ksIHF4IC0gY3gpO1xyXG5cclxuICAgICAgICB0aGlzLmFyYyhjeCArIHgxLCBjeSArIHkxLCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBiMSAqIGEyID4gYjIgKiBhMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5hcmMgPSBmdW5jdGlvbihjeCwgY3ksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGFudGljbG9ja3dpc2UpXHJcbntcclxuICAgIC8vICBJZiB3ZSBkbyB0aGlzIHdlIGNhbiBuZXZlciBkcmF3IGEgZnVsbCBjaXJjbGVcclxuICAgIGlmIChzdGFydEFuZ2xlID09PSBlbmRBbmdsZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGFudGljbG9ja3dpc2UgPT09ICd1bmRlZmluZWQnKSB7IGFudGljbG9ja3dpc2UgPSBmYWxzZTsgfVxyXG5cclxuICAgIGlmICghYW50aWNsb2Nrd2lzZSAmJiBlbmRBbmdsZSA8PSBzdGFydEFuZ2xlKVxyXG4gICAge1xyXG4gICAgICAgIGVuZEFuZ2xlICs9IE1hdGguUEkgKiAyO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYW50aWNsb2Nrd2lzZSAmJiBzdGFydEFuZ2xlIDw9IGVuZEFuZ2xlKVxyXG4gICAge1xyXG4gICAgICAgIHN0YXJ0QW5nbGUgKz0gTWF0aC5QSSAqIDI7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN3ZWVwID0gYW50aWNsb2Nrd2lzZSA/IChzdGFydEFuZ2xlIC0gZW5kQW5nbGUpICogLTEgOiAoZW5kQW5nbGUgLSBzdGFydEFuZ2xlKTtcclxuICAgIHZhciBzZWdzID0gIE1hdGguY2VpbChNYXRoLmFicyhzd2VlcCkgLyAoTWF0aC5QSSAqIDIpKSAqIDQwO1xyXG5cclxuICAgIC8vICBTd2VlcCBjaGVjayAtIG1vdmVkIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGRvIHRoZSBtb3ZlVG8gYmVsb3cgaWYgdGhlIGFyYyBmYWlsc1xyXG4gICAgaWYgKHN3ZWVwID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFydFggPSBjeCArIE1hdGguY29zKHN0YXJ0QW5nbGUpICogcmFkaXVzO1xyXG4gICAgdmFyIHN0YXJ0WSA9IGN5ICsgTWF0aC5zaW4oc3RhcnRBbmdsZSkgKiByYWRpdXM7XHJcblxyXG4gICAgaWYgKGFudGljbG9ja3dpc2UgJiYgdGhpcy5maWxsaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKGN4LCBjeSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjdXJyZW50UGF0aCB3aWxsIGFsd2F5cyBleGlzdCBhZnRlciBjYWxsaW5nIGEgbW92ZVRvXHJcbiAgICB2YXIgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHM7XHJcblxyXG4gICAgdmFyIHRoZXRhID0gc3dlZXAgLyAoc2VncyAqIDIpO1xyXG4gICAgdmFyIHRoZXRhMiA9IHRoZXRhICogMjtcclxuXHJcbiAgICB2YXIgY1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xyXG4gICAgdmFyIHNUaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcclxuICAgIFxyXG4gICAgdmFyIHNlZ01pbnVzID0gc2VncyAtIDE7XHJcblxyXG4gICAgdmFyIHJlbWFpbmRlciA9IChzZWdNaW51cyAlIDEpIC8gc2VnTWludXM7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gc2VnTWludXM7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVhbCA9ICBpICsgcmVtYWluZGVyICogaTtcclxuICAgIFxyXG4gICAgICAgIHZhciBhbmdsZSA9ICgodGhldGEpICsgc3RhcnRBbmdsZSArICh0aGV0YTIgKiByZWFsKSk7XHJcblxyXG4gICAgICAgIHZhciBjID0gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgIHZhciBzID0gLU1hdGguc2luKGFuZ2xlKTtcclxuXHJcbiAgICAgICAgcG9pbnRzLnB1c2goKCAoY1RoZXRhICogIGMpICsgKHNUaGV0YSAqIHMpICkgKiByYWRpdXMgKyBjeCxcclxuICAgICAgICAgICAgICAgICAgICAoIChjVGhldGEgKiAtcykgKyAoc1RoZXRhICogYykgKSAqIHJhZGl1cyArIGN5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmJlZ2luRmlsbCA9IGZ1bmN0aW9uKGNvbG9yLCBhbHBoYSlcclxue1xyXG4gICAgdGhpcy5maWxsaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gY29sb3IgfHwgXCIjMDAwMDAwXCI7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IChhbHBoYSA9PT0gdW5kZWZpbmVkKSA/IDEgOiBhbHBoYTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoIDw9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmZpbGwgPSB0aGlzLmZpbGxpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbENvbG9yID0gdGhpcy5maWxsQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbEFscGhhID0gdGhpcy5maWxsQWxwaGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZW5kRmlsbCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5maWxsaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbGxDb2xvciA9IG51bGw7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IDE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3UmVjdCA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Um91bmRlZFJlY3QgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Um91bmRlZFJlY3QyID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG57ICAgXHJcbiAgICB2YXIgc2hhcGUgPSBuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cylcclxuICAgIHNoYXBlLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTjtcclxuICAgIHRoaXMuZHJhd1NoYXBlKHNoYXBlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Q2lyY2xlID0gZnVuY3Rpb24oeCwgeSwgZGlhbWV0ZXIpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LkNpcmNsZSh4LCB5LCBkaWFtZXRlcikpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd0VsbGlwc2UgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5FbGxpcHNlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdQb2x5Z29uID0gZnVuY3Rpb24ocGF0aClcclxue1xyXG4gICAgLy8gcHJldmVudHMgYW4gYXJndW1lbnQgYXNzaWdubWVudCBkZW9wdFxyXG4gICAgLy8gc2VlIHNlY3Rpb24gMy4xOiBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL3dpa2kvT3B0aW1pemF0aW9uLWtpbGxlcnMjMy1tYW5hZ2luZy1hcmd1bWVudHNcclxuICAgIHZhciBwb2ludHMgPSBwYXRoO1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShwb2ludHMpKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHByZXZlbnRzIGFuIGFyZ3VtZW50IGxlYWsgZGVvcHRcclxuICAgICAgICAvLyBzZWUgc2VjdGlvbiAzLjI6IGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzLW1hbmFnaW5nLWFyZ3VtZW50c1xyXG4gICAgICAgIHBvaW50cyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb2ludHNbaV0gPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlBvbHlnb24ocG9pbnRzKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSAwO1xyXG4gICAgdGhpcy5maWxsaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmdyYXBoaWNzRGF0YSA9IFtdO1xyXG4gICAgdGhpcy51cGRhdGVMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkZXN0cm95Q2hpbGRyZW4pXHJcbntcclxuICAgIFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5nZW5lcmF0ZVRleHR1cmUgPSBmdW5jdGlvbihyZXNvbHV0aW9uKVxyXG57XHJcbiAgICByZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCAxO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xyXG4gICBcclxuICAgIHZhciBjYW52YXNCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIoYm91bmRzLndpZHRoICogcmVzb2x1dGlvbiwgYm91bmRzLmhlaWdodCAqIHJlc29sdXRpb24pO1xyXG4gICAgXHJcbiAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKGNhbnZhc0J1ZmZlci5jYW52YXMpO1xyXG4gICAgdGV4dHVyZS5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC5zY2FsZShyZXNvbHV0aW9uLCByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC50cmFuc2xhdGUoLWJvdW5kcy54LC1ib3VuZHMueSk7XHJcbiAgICBcclxuICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcywgY2FudmFzQnVmZmVyLmNvbnRleHQpO1xyXG5cclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgaWYgKHRoaXMuaXNNYXNrID09PSB0cnVlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGUgdGludCBoYXMgY2hhbmdlZCwgc2V0IHRoZSBncmFwaGljcyBvYmplY3QgdG8gZGlydHkuXHJcbiAgICBpZiAodGhpcy5fcHJldlRpbnQgIT09IHRoaXMudGludCkge1xyXG4gICAgICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9wcmV2VGludCA9IHRoaXMudGludDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCk7XHJcbiAgIFxyXG4gICAgICAgICAgICAvLyB3ZSB3aWxsIGFsc28gbmVlZCB0byB1cGRhdGUgdGhlIHRleHR1cmVcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYWNoZWRTcHJpdGVUZXh0dXJlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYWxwaGEgPSB0aGlzLmFscGhhO1xyXG4gICAgICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsIHJlbmRlclNlc3Npb24pO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSByZW5kZXJTZXNzaW9uLmNvbnRleHQ7XHJcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYmxlbmRNb2RlICE9PSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcclxuICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgY29udGV4dC5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtLmEgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5iICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmQgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50eCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvbik7XHJcblxyXG4gICAgICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcywgY29udGV4dCk7XHJcblxyXG4gICAgICAgICAvLyBzaW1wbGUgcmVuZGVyIGNoaWxkcmVuIVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obWF0cml4KVxyXG57XHJcbiAgICBpZighdGhpcy5fY3VycmVudEJvdW5kcyB8fCB0aGlzLl9ib3VuZHNEaXJ0eSlcclxuICAgIHtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIGFuIGVtcHR5IG9iamVjdCBpZiB0aGUgaXRlbSBpcyBhIG1hc2shXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlbmRlcmFibGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2JvdW5kc0RpcnR5IClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxvY2FsQm91bmRzKCk7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbG9jYWxCb3VuZHM7XHJcblxyXG4gICAgdmFyIHcwID0gYm91bmRzLng7XHJcbiAgICB2YXIgdzEgPSBib3VuZHMud2lkdGggKyBib3VuZHMueDtcclxuXHJcbiAgICB2YXIgaDAgPSBib3VuZHMueTtcclxuICAgIHZhciBoMSA9IGJvdW5kcy5oZWlnaHQgKyBib3VuZHMueTtcclxuXHJcbiAgICB2YXIgd29ybGRUcmFuc2Zvcm0gPSBtYXRyaXggfHwgdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG5cclxuICAgIHZhciB4MSA9IGEgKiB3MSArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICB2YXIgeTIgPSBkICogaDEgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgIHZhciB4NCA9ICBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5NCA9ICBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IHgxO1xyXG4gICAgdmFyIG1heFkgPSB5MTtcclxuXHJcbiAgICB2YXIgbWluWCA9IHgxO1xyXG4gICAgdmFyIG1pblkgPSB5MTtcclxuXHJcbiAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgbWluWSA9IHkyIDwgbWluWSA/IHkyIDogbWluWTtcclxuICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICBtaW5ZID0geTQgPCBtaW5ZID8geTQgOiBtaW5ZO1xyXG5cclxuICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzLnggPSBtaW5YO1xyXG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Qm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uKCBwb2ludCApXHJcbntcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvaW50LCAgdGVtcFBvaW50KTtcclxuXHJcbiAgICB2YXIgZ3JhcGhpY3NEYXRhID0gdGhpcy5ncmFwaGljc0RhdGE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljc0RhdGFbaV07XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5maWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvbmx5IGRlYWwgd2l0aCBmaWxscy4uXHJcbiAgICAgICAgaWYgKGRhdGEuc2hhcGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIGRhdGEuc2hhcGUuY29udGFpbnMoIHRlbXBQb2ludC54LCB0ZW1wUG9pbnQueSApIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUudXBkYXRlTG9jYWxCb3VuZHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JhcGhpY3NEYXRhLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2hhcGUsIHBvaW50cywgeCwgeSwgdywgaDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gZGF0YS50eXBlO1xyXG4gICAgICAgICAgICB2YXIgbGluZVdpZHRoID0gZGF0YS5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVCB8fCB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQyB8fCB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLnggLSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgeSA9IHNoYXBlLnkgLSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLndpZHRoICsgbGluZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgaCA9IHNoYXBlLmhlaWdodCArIGxpbmVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCA8IG1pblggPyB4IDogbWluWDtcclxuICAgICAgICAgICAgICAgIG1heFggPSB4ICsgdyA+IG1heFggPyB4ICsgdyA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWSA9IHkgPCBtaW5ZID8geSA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0geSArIGggPiBtYXhZID8geSArIGggOiBtYXhZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5DSVJDKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgICAgIHkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLnJhZGl1cyArIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUucmFkaXVzICsgbGluZVdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCAtIHcgPCBtaW5YID8geCAtIHcgOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGggPCBtaW5ZID8geSAtIGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgICAgICB5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgICAgIHcgPSBzaGFwZS53aWR0aCArIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUuaGVpZ2h0ICsgbGluZVdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCAtIHcgPCBtaW5YID8geCAtIHcgOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGggPCBtaW5ZID8geSAtIGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFBPTFkgLSBhc3N1bWVzIHBvaW50cyBhcmUgc2VxdWVudGlhbCwgbm90IFBvaW50IG9iamVjdHNcclxuICAgICAgICAgICAgICAgIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBvaW50cy5sZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRzW2pdIGluc3RhbmNlb2YgVGlueS5Qb2ludClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb2ludHNbal0ueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBvaW50c1tqXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcG9pbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9pbnRzW2ogKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgcG9pbnRzLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHggLSBsaW5lV2lkdGggPCBtaW5YID8geCAtIGxpbmVXaWR0aCA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHggKyBsaW5lV2lkdGggPiBtYXhYID8geCArIGxpbmVXaWR0aCA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pblkgPSB5IC0gbGluZVdpZHRoIDwgbWluWSA/IHkgLSBsaW5lV2lkdGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgbGluZVdpZHRoID4gbWF4WSA/IHkgKyBsaW5lV2lkdGggOiBtYXhZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIG1pblggPSAwO1xyXG4gICAgICAgIG1heFggPSAwO1xyXG4gICAgICAgIG1pblkgPSAwO1xyXG4gICAgICAgIG1heFkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYWRkaW5nID0gdGhpcy5ib3VuZHNQYWRkaW5nO1xyXG4gICAgXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy54ID0gbWluWCAtIHBhZGRpbmc7XHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy53aWR0aCA9IChtYXhYIC0gbWluWCkgKyBwYWRkaW5nICogMjtcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy55ID0gbWluWSAtIHBhZGRpbmc7XHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy5oZWlnaHQgPSAobWF4WSAtIG1pblkpICsgcGFkZGluZyAqIDI7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0J1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcihib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIgPSBjYW52YXNCdWZmZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5yZXNpemUoYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXZlcmFnZSB0aGUgYW5jaG9yIHRvIGFjY291bnQgZm9yIHRoZSBvZmZzZXQgb2YgdGhlIGVsZW1lbnRcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueCA9IC0oYm91bmRzLnggLyBib3VuZHMud2lkdGgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLShib3VuZHMueSAvIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dC5zYXZlKCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQudHJhbnNsYXRlKC1ib3VuZHMueCwgLWJvdW5kcy55KTtcclxuICAgIFxyXG4gICAgLy8gbWFrZSBzdXJlIHdlIHNldCB0aGUgYWxwaGEgb2YgdGhlIGdyYXBoaWNzIHRvIDEgZm9yIHRoZSByZW5kZXIuLiBcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgLy8gbm93IHJlbmRlciB0aGUgZ3JhcGhpYy4uXHJcbiAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYWxwaGEgPSB0aGlzLmFscGhhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZXMgdGV4dHVyZSBzaXplIGJhc2VkIG9uIGNhbnZhcyBzaXplXHJcbiAqXHJcbiAqIEBtZXRob2QgdXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUudXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIGNhY2hlZFNwcml0ZSA9IHRoaXMuX2NhY2hlZFNwcml0ZTtcclxuICAgIHZhciB0ZXh0dXJlID0gY2FjaGVkU3ByaXRlLnRleHR1cmU7XHJcbiAgICB2YXIgY2FudmFzID0gY2FjaGVkU3ByaXRlLmJ1ZmZlci5jYW52YXM7XHJcblxyXG4gICAgdGV4dHVyZS53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRleHR1cmUuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHRleHR1cmUuY3JvcC53aWR0aCA9IHRleHR1cmUuZnJhbWUud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICB0ZXh0dXJlLmNyb3AuaGVpZ2h0ID0gdGV4dHVyZS5mcmFtZS5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgIGNhY2hlZFNwcml0ZS5fd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBjYWNoZWRTcHJpdGUuX2hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVzdHJveXMgYSBwcmV2aW91cyBjYWNoZWQgc3ByaXRlLlxyXG4gKlxyXG4gKiBAbWV0aG9kIGRlc3Ryb3lDYWNoZWRTcHJpdGVcclxuICovXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1NoYXBlID0gZnVuY3Rpb24oc2hhcGUpXHJcbntcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNoZWNrIGN1cnJlbnQgcGF0aCFcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoIDw9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50UGF0aCA9IG51bGw7XHJcblxyXG4gICAgLy8gIEhhbmRsZSBtaXhlZC10eXBlIHBvbHlnb25zXHJcbiAgICBpZiAoc2hhcGUgaW5zdGFuY2VvZiBUaW55LlBvbHlnb24pXHJcbiAgICB7XHJcbiAgICAgICAgc2hhcGUuZmxhdHRlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYXRhID0gbmV3IFRpbnkuR3JhcGhpY3NEYXRhKHRoaXMubGluZVdpZHRoLCB0aGlzLmxpbmVDb2xvciwgdGhpcy5saW5lQWxwaGEsIHRoaXMuZmlsbENvbG9yLCB0aGlzLmZpbGxBbHBoYSwgdGhpcy5maWxsaW5nLCBzaGFwZSk7XHJcbiAgICBcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2goZGF0YSk7XHJcblxyXG4gICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpXHJcbiAgICB7XHJcbiAgICAgICAgZGF0YS5zaGFwZS5jbG9zZWQgPSB0aGlzLmZpbGxpbmc7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGF0aCA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuR3JhcGhpY3MucHJvdG90eXBlLCBcImNhY2hlQXNCaXRtYXBcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0pOyIsIlxyXG5UaW55Lk9iamVjdDJEID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgIHRoaXMuX2JvdW5kcyA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFzayA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSApO1xyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuT2JqZWN0MkQ7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsICdpbnB1dEVuYWJsZWQnLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICByZXR1cm4gKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5lbmFibGVkKVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbi8vICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0ID09PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLmlucHV0ID0ge2VuYWJsZWQ6IHRydWUsIHBhcmVudDogdGhpc31cclxuLy8gICAgICAgICAgICAgICAgIFRpbnkuRXZlbnRUYXJnZXQubWl4aW4odGhpcy5pbnB1dClcclxuLy8gICAgICAgICAgICAgfSBlbHNlIFxyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5lbmFibGVkID0gdHJ1ZVxyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuaW5wdXQgIT09IG51bGwgJiYgKHRoaXMuaW5wdXQuZW5hYmxlZCA9IGZhbHNlKVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCAnd2lkdGgnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy5nZXRMb2NhbEJvdW5kcygpLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpLndpZHRoO1xyXG5cclxuICAgICAgICBpZih3aWR0aCAhPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gd2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5zY2FsZS55ICogdGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGhlaWdodCAhPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gaGVpZ2h0IDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS55ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsICdtYXNrJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hc2s7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHRoaXMuX21hc2suaXNNYXNrID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX21hc2sgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHRoaXMuX21hc2suaXNNYXNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIGkgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgIFxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLl9ib3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXNrID0gbnVsbDtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuaW5wdXQpIHRoaXMuaW5wdXQuc3lzdGVtLnJlbW92ZSh0aGlzKTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGNoaWxkKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5hZGRDaGlsZEF0KGNoaWxkLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCk7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5hZGRDaGlsZEF0ID0gZnVuY3Rpb24oY2hpbGQsIGluZGV4KVxyXG57XHJcbiAgICBpZihpbmRleCA+PSAwICYmIGluZGV4IDw9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGNoaWxkLnBhcmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudC5yZW1vdmUoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkgY2hpbGQuZ2FtZSA9IHRoaXMuZ2FtZTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihjaGlsZCArICdhZGRDaGlsZEF0OiBUaGUgaW5kZXggJysgaW5kZXggKycgc3VwcGxpZWQgaXMgb3V0IG9mIGJvdW5kcyAnICsgdGhpcy5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuc3dhcENoaWxkcmVuID0gZnVuY3Rpb24oY2hpbGQsIGNoaWxkMilcclxue1xyXG4gICAgaWYoY2hpbGQgPT09IGNoaWxkMikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaW5kZXgxID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcclxuICAgIHZhciBpbmRleDIgPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQyKTtcclxuXHJcbiAgICBpZihpbmRleDEgPCAwIHx8IGluZGV4MiA8IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N3YXBDaGlsZHJlbjogQm90aCB0aGUgc3VwcGxpZWQgT2JqZWN0cyBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlci4nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuW2luZGV4MV0gPSBjaGlsZDI7XHJcbiAgICB0aGlzLmNoaWxkcmVuW2luZGV4Ml0gPSBjaGlsZDtcclxuXHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24oY2hpbGQpXHJcbntcclxuICAgIHZhciBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHN1cHBsaWVkIE9iamVjdCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlcicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuc2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uKGNoaWxkLCBpbmRleClcclxue1xyXG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmNoaWxkcmVuLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzdXBwbGllZCBpbmRleCBpcyBvdXQgb2YgYm91bmRzJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGN1cnJlbnRJbmRleCwgMSk7IC8vcmVtb3ZlIGZyb20gb2xkIHBvc2l0aW9uXHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpOyAvL2FkZCBhdCBuZXcgcG9zaXRpb25cclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbihpbmRleClcclxue1xyXG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmNoaWxkcmVuLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldENoaWxkQXQ6IFN1cHBsaWVkIGluZGV4ICcrIGluZGV4ICsnIGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZCBsaXN0LCBvciB0aGUgc3VwcGxpZWQgT2JqZWN0IG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltpbmRleF07XHJcbiAgICBcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGNoaWxkKVxyXG57XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoIGNoaWxkICk7XHJcbiAgICBpZihpbmRleCA9PT0gLTEpcmV0dXJuO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVDaGlsZEF0KCBpbmRleCApO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdCA9IGZ1bmN0aW9uKGluZGV4KVxyXG57XHJcbiAgICB2YXIgY2hpbGQgPSB0aGlzLmdldENoaWxkQXQoIGluZGV4ICk7XHJcbiAgICBjaGlsZC5wYXJlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSggaW5kZXgsIDEgKTtcclxuICAgIHJldHVybiBjaGlsZDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbW92ZUNoaWxkcmVuID0gZnVuY3Rpb24oYmVnaW5JbmRleCwgZW5kSW5kZXgpXHJcbntcclxuICAgIHZhciBiZWdpbiA9IGJlZ2luSW5kZXggfHwgMDtcclxuICAgIHZhciBlbmQgPSB0eXBlb2YgZW5kSW5kZXggPT09ICdudW1iZXInID8gZW5kSW5kZXggOiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgIHZhciByYW5nZSA9IGVuZCAtIGJlZ2luO1xyXG5cclxuICAgIGlmIChyYW5nZSA+IDAgJiYgcmFuZ2UgPD0gZW5kKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZW1vdmVkID0gdGhpcy5jaGlsZHJlbi5zcGxpY2UoYmVnaW4sIHJhbmdlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW92ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gcmVtb3ZlZFtpXTtcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJhbmdlID09PSAwICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdyZW1vdmVDaGlsZHJlbjogUmFuZ2UgRXJyb3IsIG51bWVyaWMgdmFsdWVzIGFyZSBvdXRzaWRlIHRoZSBhY2NlcHRhYmxlIHJhbmdlJyApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZighdGhpcy52aXNpYmxlKXJldHVybjtcclxuXHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICBpZih0aGlzLl9jYWNoZUFzQml0bWFwKXJldHVybjtcclxuXHJcbiAgICBmb3IodmFyIGk9MCxqPXRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpPGo7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gcGVyZm9ybWFuY2UgaW5jcmVhc2UgdG8gYXZvaWQgdXNpbmcgY2FsbC4uICgxMHggZmFzdGVyKVxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5kaXNwbGF5T2JqZWN0Q29udGFpbmVyVXBkYXRlVHJhbnNmb3JtID0gVGlueS5PYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClyZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuICAgIGlmICh0aGlzLl9jYWNoZWRTcHJpdGUpIHJldHVybiB0aGlzLl9jYWNoZWRTcHJpdGUuZ2V0Qm91bmRzKClcclxuXHJcbiAgICAvLyBUT0RPIHRoZSBib3VuZHMgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsY3VsYXRlZCB0aGlzIHJlbmRlciBzZXNzaW9uIHNvIHJldHVybiB3aGF0IHdlIGhhdmVcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBjaGlsZEJvdW5kcztcclxuICAgIHZhciBjaGlsZE1heFg7XHJcbiAgICB2YXIgY2hpbGRNYXhZO1xyXG5cclxuICAgIHZhciBjaGlsZFZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICBmb3IodmFyIGk9MCxqPXRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpPGo7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFjaGlsZC52aXNpYmxlKWNvbnRpbnVlO1xyXG5cclxuICAgICAgICBjaGlsZFZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICBjaGlsZEJvdW5kcyA9IHRoaXMuY2hpbGRyZW5baV0uZ2V0Qm91bmRzKCk7XHJcbiAgICAgXHJcbiAgICAgICAgbWluWCA9IG1pblggPCBjaGlsZEJvdW5kcy54ID8gbWluWCA6IGNoaWxkQm91bmRzLng7XHJcbiAgICAgICAgbWluWSA9IG1pblkgPCBjaGlsZEJvdW5kcy55ID8gbWluWSA6IGNoaWxkQm91bmRzLnk7XHJcblxyXG4gICAgICAgIGNoaWxkTWF4WCA9IGNoaWxkQm91bmRzLndpZHRoICsgY2hpbGRCb3VuZHMueDtcclxuICAgICAgICBjaGlsZE1heFkgPSBjaGlsZEJvdW5kcy5oZWlnaHQgKyBjaGlsZEJvdW5kcy55O1xyXG5cclxuICAgICAgICBtYXhYID0gbWF4WCA+IGNoaWxkTWF4WCA/IG1heFggOiBjaGlsZE1heFg7XHJcbiAgICAgICAgbWF4WSA9IG1heFkgPiBjaGlsZE1heFkgPyBtYXhZIDogY2hpbGRNYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFjaGlsZFZpc2libGUpXHJcbiAgICAgICAgcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuICAgIGJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAvLyBUT0RPOiBzdG9yZSBhIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYWdhaW4gaW4gdGhlIHJlbmRlciBjeWNsZSB3ZSBkbyBub3QgaGF2ZSB0byByZWNhbGN1bGF0ZVxyXG4gICAgLy90aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG4gICBcclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRMb2NhbEJvdW5kcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIG1hdHJpeENhY2hlID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gVGlueS5pZGVudGl0eU1hdHJpeDtcclxuXHJcbiAgICBmb3IodmFyIGk9MCxqPXRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpPGo7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xyXG5cclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBtYXRyaXhDYWNoZTtcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNhY2hlZFNwcml0ZShyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59OyIsIlRpbnkuU2NlbmUgPSBmdW5jdGlvbihnYW1lKVxyXG57XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwoIHRoaXMgKTtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbn07XHJcblxyXG5UaW55LlNjZW5lLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRpbnkuT2JqZWN0MkQucHJvdG90eXBlICk7XHJcblRpbnkuU2NlbmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5TY2VuZTtcclxuXHJcblRpbnkuU2NlbmUucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxufTsiLCJcclxuVGlueS5TcHJpdGUgPSBmdW5jdGlvbih0ZXh0dXJlLCBrZXkpXHJcbntcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvciA9IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdGhpcy5zZXRUZXh0dXJlKHRleHR1cmUsIGtleSwgZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuX3dpZHRoID0gMDtcclxuXHJcbiAgICB0aGlzLl9oZWlnaHQgPSAwO1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLnRpbnQgPSBcIiNGRkZGRkZcIjtcclxuXHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlLmhhc0xvYWRlZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9uVGV4dHVyZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IHRydWU7XHJcbn07XHJcblxyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55Lk9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuU3ByaXRlO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ2ZyYW1lTmFtZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHR1cmUuZnJhbWUubmFtZVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5mcmFtZS5uYW1lKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dHVyZShUaW55LkNhY2hlLnRleHR1cmVbdGhpcy50ZXh0dXJlLmtleSArIFwiLlwiICsgdmFsdWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ2ZyYW1lJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lXHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLmxhc3RGcmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHZhbHVlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9mcmFtZSA+IHRoaXMudGV4dHVyZS5sYXN0RnJhbWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZSA9IDBcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuQ2FjaGUudGV4dHVyZVt0aGlzLnRleHR1cmUua2V5ICsgXCIuXCIgKyB0aGlzLl9mcmFtZV0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnd2lkdGgnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5zY2FsZS55ICogdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbih0ZXh0dXJlLCBrZXksIHVwZGF0ZURpbWVuc2lvbilcclxue1xyXG4gICAgaWYgKHR5cGVvZiB0ZXh0dXJlID09IFwic3RyaW5nXCIpIFxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbWFnZVBhdGggPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICE9IHVuZGVmaW5lZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSBpbWFnZVBhdGggKyBcIi5cIiArIGtleTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbaW1hZ2VQYXRoXTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlUGF0aCk7XHJcbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBFcnJvcignQ2FjaGUgRXJyb3I6IGltYWdlICcgKyBpbWFnZVBhdGggKyAnIGRvZXNgdCBmb3VuZCBpbiBjYWNoZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlID09PSB0ZXh0dXJlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgIHRoaXMuY2FjaGVkVGludCA9IFwiI0ZGRkZGRlwiO1xyXG5cclxuICAgIGlmICh1cGRhdGVEaW1lbnNpb24gPT09IHRydWUpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUub25UZXh0dXJlVXBkYXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAvLyBzbyBpZiBfd2lkdGggaXMgMCB0aGVuIHdpZHRoIHdhcyBub3Qgc2V0Li5cclxuICAgIGlmICh0aGlzLl93aWR0aCkgdGhpcy5zY2FsZS54ID0gdGhpcy5fd2lkdGggLyB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICBpZiAodGhpcy5faGVpZ2h0KSB0aGlzLnNjYWxlLnkgPSB0aGlzLl9oZWlnaHQgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLmFuaW1hdGUgPSBmdW5jdGlvbih0aW1lciwgZGVsYXkpXHJcbntcclxuICAgIGlmICh0aGlzLnRleHR1cmUubGFzdEZyYW1lICYmIHRoaXMudGV4dHVyZS5mcmFtZS5pbmRleCAhPSB1bmRlZmluZWQpIFxyXG4gICAge1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgfHwgKHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDApO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW9uKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGltZXIubG9vcChkZWxheSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lICs9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IGRlbGF5IHx8ICh0aGlzLnRleHR1cmUuZnJhbWUuZHVyYXRpb24gfHwgMTAwKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmRlbGF5ID0gZGVsYXk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKG1hdHJpeClcclxue1xyXG4gICAgdmFyIHdpZHRoID0gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoIC8gdGhpcy50ZXh0dXJlLnJlc29sdXRpb247XHJcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodCAvIHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEtdGhpcy5hbmNob3IueCk7XHJcbiAgICB2YXIgdzEgPSB3aWR0aCAqIC10aGlzLmFuY2hvci54O1xyXG5cclxuICAgIHZhciBoMCA9IGhlaWdodCAqICgxLXRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gbWF0cml4IHx8IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIGlmIChiID09PSAwICYmIGMgPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgLy8gLy8gc2NhbGUgbWF5IGJlIG5lZ2F0aXZlIVxyXG4gICAgICAgIC8vIGlmIChhIDwgMCkgYSAqPSAtMTtcclxuICAgICAgICAvLyBpZiAoZCA8IDApIGQgKj0gLTE7XHJcblxyXG4gICAgICAgIC8vIC8vIHRoaXMgbWVhbnMgdGhlcmUgaXMgbm8gcm90YXRpb24gZ29pbmcgb24gcmlnaHQ/IFJJR0hUP1xyXG4gICAgICAgIC8vIC8vIGlmIHRoYXRzIHRoZSBjYXNlIHRoZW4gd2UgY2FuIGF2b2lkIGNoZWNraW5nIHRoZSBib3VuZCB2YWx1ZXMhIHlheSAgICAgICAgIFxyXG4gICAgICAgIC8vIG1pblggPSBhICogdzEgKyB0eDtcclxuICAgICAgICAvLyBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgLy8gbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgIC8vIG1heFkgPSBkICogaDAgKyB0eTtcclxuXHJcbiAgICAgICAgaWYgKGEgPCAwKSB7XHJcbiAgICAgICAgICAgIG1pblggPSBhICogdzAgKyB0eDtcclxuICAgICAgICAgICAgbWF4WCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1pblggPSBhICogdzEgKyB0eDtcclxuICAgICAgICAgICAgbWF4WCA9IGEgKiB3MCArIHR4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGQgPCAwKSB7XHJcbiAgICAgICAgICAgIG1pblkgPSBkICogaDAgKyB0eTtcclxuICAgICAgICAgICAgbWF4WSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1pblkgPSBkICogaDEgKyB0eTtcclxuICAgICAgICAgICAgbWF4WSA9IGQgKiBoMCArIHR5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDQgPSAgYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICAgICAgdmFyIHk0ID0gIGQgKiBoMCArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgICAgICBtaW5YID0geDEgPCBtaW5YID8geDEgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4MiA8IG1pblggPyB4MiA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgICAgICBtaW5ZID0geTEgPCBtaW5ZID8geTEgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5MiA8IG1pblkgPyB5MiA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTQgPCBtaW5ZID8geTQgOiBtaW5ZO1xyXG5cclxuICAgICAgICBtYXhYID0geDEgPiBtYXhYID8geDEgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHgzID4gbWF4WCA/IHgzIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDQgPiBtYXhYID8geDQgOiBtYXhYO1xyXG5cclxuICAgICAgICBtYXhZID0geTEgPiBtYXhZID8geTEgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5MiA+IG1heFkgPyB5MiA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIC8vIElmIHRoZSBzcHJpdGUgaXMgbm90IHZpc2libGUgb3IgdGhlIGFscGhhIGlzIDAgdGhlbiBubyBuZWVkIHRvIHJlbmRlciB0aGlzIGVsZW1lbnRcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDAgfHwgdGhpcy5yZW5kZXJhYmxlID09PSBmYWxzZSB8fCB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCA8PSAwIHx8IHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCA8PSAwKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlICE9PSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBJZ25vcmUgbnVsbCBzb3VyY2VzXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlLnZhbGlkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZXNvbHV0aW9uID0gdGhpcy50ZXh0dXJlLnJlc29sdXRpb24gLyByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMud29ybGRBbHBoYTtcclxuXHJcblxyXG4gICAgICAgIC8vICBJZiB0aGUgdGV4dHVyZSBpcyB0cmltbWVkIHdlIG9mZnNldCBieSB0aGUgdHJpbSB4L3ksIG90aGVyd2lzZSB3ZSB1c2UgdGhlIGZyYW1lIGRpbWVuc2lvbnNcclxuICAgICAgICB2YXIgZHggPSAodGhpcy50ZXh0dXJlLnRyaW0pID8gdGhpcy50ZXh0dXJlLnRyaW0ueCAtIHRoaXMuYW5jaG9yLnggKiB0aGlzLnRleHR1cmUudHJpbS53aWR0aCA6IHRoaXMuYW5jaG9yLnggKiAtdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgICAgIHZhciBkeSA9ICh0aGlzLnRleHR1cmUudHJpbSkgPyB0aGlzLnRleHR1cmUudHJpbS55IC0gdGhpcy5hbmNob3IueSAqIHRoaXMudGV4dHVyZS50cmltLmhlaWdodCA6IHRoaXMuYW5jaG9yLnkgKiAtdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gIEFsbG93IGZvciBwaXhlbCByb3VuZGluZ1xyXG4gICAgICAgIGlmIChyZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgICh0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKSB8IDAsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eSAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwKTtcclxuICAgICAgICAgICAgZHggPSBkeCB8IDA7XHJcbiAgICAgICAgICAgIGR5ID0gZHkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5iLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGludCAhPT0gXCIjRkZGRkZGXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZWRUaW50ICE9PSB0aGlzLnRpbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkVGludCA9IHRoaXMudGludDtcclxuICAgICAgICAgICAgICAgIHRoaXMudGludGVkVGV4dHVyZSA9IFRpbnkuQ2FudmFzVGludGVyLmdldFRpbnRlZFRleHR1cmUodGhpcywgdGhpcy50aW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbnRlZFRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgLyByZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE9WRVJXUklURVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTsiLCJcclxuVGlueS5UZXh0ID0gZnVuY3Rpb24odGV4dCwgc3R5bGUpXHJcbntcclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gMTtcclxuXHJcbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKHRoaXMuY2FudmFzKSk7XHJcblxyXG4gICAgdGhpcy5zZXRUZXh0KHRleHQpO1xyXG4gICAgdGhpcy5zZXRTdHlsZShzdHlsZSk7XHJcblxyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5TcHJpdGUucHJvdG90eXBlKTtcclxuVGlueS5UZXh0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGV4dDtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRleHQucHJvdG90eXBlLCAnd2lkdGgnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZih0aGlzLmRpcnR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRleHQucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuICB0aGlzLnNjYWxlLnkgKiB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uKHN0eWxlKVxyXG57XHJcbiAgICBzdHlsZSA9IHN0eWxlIHx8IHt9O1xyXG4gICAgc3R5bGUuZm9udCA9IHN0eWxlLmZvbnQgfHwgJ2JvbGQgMjBwdCBBcmlhbCc7XHJcbiAgICBzdHlsZS5maWxsID0gc3R5bGUuZmlsbCB8fCAnYmxhY2snO1xyXG4gICAgc3R5bGUuYWxpZ24gPSBzdHlsZS5hbGlnbiB8fCAnbGVmdCc7XHJcbiAgICBzdHlsZS5zdHJva2UgPSBzdHlsZS5zdHJva2UgfHwgJ2JsYWNrJztcclxuICAgIHN0eWxlLnN0cm9rZVRoaWNrbmVzcyA9IHN0eWxlLnN0cm9rZVRoaWNrbmVzcyB8fCAwO1xyXG4gICAgc3R5bGUud29yZFdyYXAgPSBzdHlsZS53b3JkV3JhcCB8fCBmYWxzZTtcclxuICAgIHN0eWxlLmxpbmVTcGFjaW5nID0gc3R5bGUubGluZVNwYWNpbmcgfHwgMFxyXG4gICAgc3R5bGUud29yZFdyYXBXaWR0aCA9IHN0eWxlLndvcmRXcmFwV2lkdGggIT09IHVuZGVmaW5lZCA/IHN0eWxlLndvcmRXcmFwV2lkdGggOiAxMDA7XHJcbiAgICBcclxuICAgIHN0eWxlLmRyb3BTaGFkb3cgPSBzdHlsZS5kcm9wU2hhZG93IHx8IGZhbHNlO1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0FuZ2xlID0gc3R5bGUuZHJvcFNoYWRvd0FuZ2xlICE9PSB1bmRlZmluZWQgPyBzdHlsZS5kcm9wU2hhZG93QW5nbGUgOiBNYXRoLlBJIC8gNjtcclxuICAgIHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSA9IHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSAhPT0gdW5kZWZpbmVkID8gc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlIDogNDtcclxuICAgIHN0eWxlLmRyb3BTaGFkb3dDb2xvciA9IHN0eWxlLmRyb3BTaGFkb3dDb2xvciB8fCAnYmxhY2snO1xyXG5cclxuICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcclxuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24odGV4dClcclxue1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dC50b1N0cmluZygpIHx8ICcgJztcclxuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuc3R5bGUuZm9udDtcclxuXHJcbiAgICB2YXIgb3V0cHV0VGV4dCA9IHRoaXMudGV4dDtcclxuXHJcbiAgICAvLyB3b3JkIHdyYXBcclxuICAgIC8vIHByZXNlcnZlIG9yaWdpbmFsIHRleHRcclxuICAgIGlmKHRoaXMuc3R5bGUud29yZFdyYXApb3V0cHV0VGV4dCA9IHRoaXMud29yZFdyYXAodGhpcy50ZXh0KTtcclxuXHJcbiAgICAvL3NwbGl0IHRleHQgaW50byBsaW5lc1xyXG4gICAgdmFyIGxpbmVzID0gb3V0cHV0VGV4dC5zcGxpdCgvKD86XFxyXFxufFxccnxcXG4pLyk7XHJcblxyXG4gICAgLy9jYWxjdWxhdGUgdGV4dCB3aWR0aFxyXG4gICAgdmFyIGxpbmVXaWR0aHMgPSBbXTtcclxuICAgIHZhciBtYXhMaW5lV2lkdGggPSAwO1xyXG4gICAgdmFyIGZvbnRQcm9wZXJ0aWVzID0gdGhpcy5kZXRlcm1pbmVGb250UHJvcGVydGllcyh0aGlzLnN0eWxlLmZvbnQpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgbGluZVdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KGxpbmVzW2ldKS53aWR0aDtcclxuICAgICAgICBsaW5lV2lkdGhzW2ldID0gbGluZVdpZHRoO1xyXG4gICAgICAgIG1heExpbmVXaWR0aCA9IE1hdGgubWF4KG1heExpbmVXaWR0aCwgbGluZVdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgd2lkdGggPSBtYXhMaW5lV2lkdGggKyB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcztcclxuICAgIGlmKHRoaXMuc3R5bGUuZHJvcFNoYWRvdyl3aWR0aCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9ICggd2lkdGggKyB0aGlzLmNvbnRleHQubGluZVdpZHRoICkgKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICBcclxuICAgIC8vY2FsY3VsYXRlIHRleHQgaGVpZ2h0XHJcbiAgICB2YXIgbGluZUhlaWdodCA9IGZvbnRQcm9wZXJ0aWVzLmZvbnRTaXplICsgdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgKyB0aGlzLnN0eWxlLmxpbmVTcGFjaW5nO1xyXG4gXHJcbiAgICB2YXIgaGVpZ2h0ID0gbGluZUhlaWdodCAqIGxpbmVzLmxlbmd0aDtcclxuICAgIGlmKHRoaXMuc3R5bGUuZHJvcFNoYWRvdyloZWlnaHQgKz0gdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gKGhlaWdodCAtIHRoaXMuc3R5bGUubGluZVNwYWNpbmcpICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5zY2FsZSggdGhpcy5yZXNvbHV0aW9uLCB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmKG5hdmlnYXRvci5pc0NvY29vbkpTKSB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsMCx0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgXHJcbiAgICAvLyB1c2VkIGZvciBkZWJ1Z2dpbmcuLlxyXG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFN0eWxlID1cIiNGRjAwMDBcIlxyXG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuc3R5bGUuZm9udDtcclxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuc3R5bGUuc3Ryb2tlO1xyXG4gICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzO1xyXG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdhbHBoYWJldGljJztcclxuICAgIHRoaXMuY29udGV4dC5taXRlckxpbWl0ID0gMjtcclxuXHJcbiAgICAvL3RoaXMuY29udGV4dC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcblxyXG4gICAgdmFyIGxpbmVQb3NpdGlvblg7XHJcbiAgICB2YXIgbGluZVBvc2l0aW9uWTtcclxuXHJcbiAgICBpZih0aGlzLnN0eWxlLmRyb3BTaGFkb3cpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0NvbG9yO1xyXG5cclxuICAgICAgICB2YXIgeFNoYWRvd09mZnNldCA9IE1hdGguc2luKHRoaXMuc3R5bGUuZHJvcFNoYWRvd0FuZ2xlKSAqIHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG4gICAgICAgIHZhciB5U2hhZG93T2Zmc2V0ID0gTWF0aC5jb3ModGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDI7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblkgPSAodGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyICsgaSAqIGxpbmVIZWlnaHQpICsgZm9udFByb3BlcnRpZXMuYXNjZW50O1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5zdHlsZS5hbGlnbiA9PT0gJ3JpZ2h0JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSBtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5zdHlsZS5hbGlnbiA9PT0gJ2NlbnRlcicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gKG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV0pIC8gMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5zdHlsZS5maWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblggKyB4U2hhZG93T2Zmc2V0LCBsaW5lUG9zaXRpb25ZICsgeVNoYWRvd09mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyAgaWYoZHJvcFNoYWRvdylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9zZXQgY2FudmFzIHRleHQgc3R5bGVzXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5zdHlsZS5maWxsO1xyXG4gICAgXHJcbiAgICAvL2RyYXcgbGluZXMgbGluZSBieSBsaW5lXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgbGluZVBvc2l0aW9uWCA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMjtcclxuICAgICAgICBsaW5lUG9zaXRpb25ZID0gKHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMiArIGkgKiBsaW5lSGVpZ2h0KSArIGZvbnRQcm9wZXJ0aWVzLmFzY2VudDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zdHlsZS5hbGlnbiA9PT0gJ3JpZ2h0JylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gbWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnN0eWxlLmFsaWduID09PSAnY2VudGVyJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gKG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV0pIC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc3R5bGUuc3Ryb2tlICYmIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblgsIGxpbmVQb3NpdGlvblkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5zdHlsZS5maWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YLCBsaW5lUG9zaXRpb25ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAvLyAgaWYoZHJvcFNoYWRvdylcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVRleHR1cmUoKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUudXBkYXRlVGV4dHVyZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy50ZXh0dXJlLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLnRleHR1cmUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG4gICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCA9IHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgaWYodGhpcy5kaXJ0eSB8fCB0aGlzLnJlc29sdXRpb24gIT09IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuICAgICBcclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLCByZW5kZXJTZXNzaW9uKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZGV0ZXJtaW5lRm9udFByb3BlcnRpZXMgPSBmdW5jdGlvbihmb250U3R5bGUpXHJcbntcclxuICAgIHZhciBwcm9wZXJ0aWVzID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGVbZm9udFN0eWxlXTtcclxuXHJcbiAgICBpZighcHJvcGVydGllcylcclxuICAgIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNhbnZhcyA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcztcclxuICAgICAgICB2YXIgY29udGV4dCA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NvbnRleHQ7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnRTdHlsZTtcclxuXHJcbiAgICAgICAgdmFyIHdpZHRoID0gTWF0aC5jZWlsKGNvbnRleHQubWVhc3VyZVRleHQoJ3xNw4lxJykud2lkdGgpO1xyXG4gICAgICAgIHZhciBiYXNlbGluZSA9IE1hdGguY2VpbChjb250ZXh0Lm1lYXN1cmVUZXh0KCd8TcOJcScpLndpZHRoKTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gMiAqIGJhc2VsaW5lO1xyXG5cclxuICAgICAgICBiYXNlbGluZSA9IGJhc2VsaW5lICogMS40IHwgMDtcclxuXHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnI2YwMCc7XHJcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0eWxlO1xyXG5cclxuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9ICdhbHBoYWJldGljJztcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KCd8TcOJcScsIDAsIGJhc2VsaW5lKTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlZGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XHJcbiAgICAgICAgdmFyIHBpeGVscyA9IGltYWdlZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGxpbmUgPSB3aWR0aCAqIDQ7XHJcblxyXG4gICAgICAgIHZhciBpLCBqO1xyXG5cclxuICAgICAgICB2YXIgaWR4ID0gMDtcclxuICAgICAgICB2YXIgc3RvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBhc2NlbnQuIHNjYW4gZnJvbSB0b3AgdG8gYm90dG9tIHVudGlsIHdlIGZpbmQgYSBub24gcmVkIHBpeGVsXHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgYmFzZWxpbmU7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGxpbmU7IGogKz0gNClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VkYXRhW2lkeCArIGpdICE9PSAyNTUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXN0b3ApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkeCArPSBsaW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3BlcnRpZXMuYXNjZW50ID0gYmFzZWxpbmUgLSBpO1xyXG5cclxuICAgICAgICBpZHggPSBwaXhlbHMgLSBsaW5lO1xyXG4gICAgICAgIHN0b3AgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gZGVzY2VudC4gc2NhbiBmcm9tIGJvdHRvbSB0byB0b3AgdW50aWwgd2UgZmluZCBhIG5vbiByZWQgcGl4ZWxcclxuICAgICAgICBmb3IoaSA9IGhlaWdodDsgaSA+IGJhc2VsaW5lOyBpLS0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBsaW5lOyBqICs9IDQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGltYWdlZGF0YVtpZHggKyBqXSAhPT0gMjU1KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFzdG9wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZHggLT0gbGluZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmRlc2NlbnQgPSBpIC0gYmFzZWxpbmU7XHJcbiAgICAgICAgLy9UT0RPIG1pZ2h0IG5lZWQgYSB0d2Vhay4ga2luZCBvZiBhIHRlbXAgZml4IVxyXG4gICAgICAgIHByb3BlcnRpZXMuZGVzY2VudCArPSA2O1xyXG4gICAgICAgIHByb3BlcnRpZXMuZm9udFNpemUgPSBwcm9wZXJ0aWVzLmFzY2VudCArIHByb3BlcnRpZXMuZGVzY2VudDtcclxuXHJcbiAgICAgICAgVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGVbZm9udFN0eWxlXSA9IHByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLndvcmRXcmFwID0gZnVuY3Rpb24odGV4dClcclxue1xyXG4gICAgLy8gR3JlZWR5IHdyYXBwaW5nIGFsZ29yaXRobSB0aGF0IHdpbGwgd3JhcCB3b3JkcyBhcyB0aGUgbGluZSBncm93cyBsb25nZXJcclxuICAgIC8vIHRoYW4gaXRzIGhvcml6b250YWwgYm91bmRzLlxyXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzcGFjZUxlZnQgPSB0aGlzLnN0eWxlLndvcmRXcmFwV2lkdGg7XHJcbiAgICAgICAgdmFyIHdvcmRzID0gbGluZXNbaV0uc3BsaXQoJyAnKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHdvcmRzLmxlbmd0aDsgaisrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHdvcmRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh3b3Jkc1tqXSkud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB3b3JkV2lkdGhXaXRoU3BhY2UgPSB3b3JkV2lkdGggKyB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQoJyAnKS53aWR0aDtcclxuICAgICAgICAgICAgaWYoaiA9PT0gMCB8fCB3b3JkV2lkdGhXaXRoU3BhY2UgPiBzcGFjZUxlZnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFNraXAgcHJpbnRpbmcgdGhlIG5ld2xpbmUgaWYgaXQncyB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgbGluZSB0aGF0IGlzXHJcbiAgICAgICAgICAgICAgICAvLyBncmVhdGVyIHRoYW4gdGhlIHdvcmQgd3JhcCB3aWR0aC5cclxuICAgICAgICAgICAgICAgIGlmKGogPiAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxuJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB3b3Jkc1tqXTtcclxuICAgICAgICAgICAgICAgIHNwYWNlTGVmdCA9IHRoaXMuc3R5bGUud29yZFdyYXBXaWR0aCAtIHdvcmRXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlTGVmdCAtPSB3b3JkV2lkdGhXaXRoU3BhY2U7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJyAnICsgd29yZHNbal07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpIDwgbGluZXMubGVuZ3RoLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcbic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obWF0cml4KVxyXG57XHJcbiAgICBpZih0aGlzLmRpcnR5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gVGlueS5TcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcy5jYWxsKHRoaXMsIG1hdHJpeCk7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIC8vIG1ha2Ugc3VyZSB0byByZXNldCB0aGUgdGhlIGNvbnRleHQgYW5kIGNhbnZhcy4uIGRvbnQgd2FudCB0aGlzIGhhbmdpbmcgYXJvdW5kIGluIG1lbW9yeSFcclxuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlLmRlc3Ryb3koKTtcclxuXHJcbiAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGUgPSB7fTtcclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NvbnRleHQgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsiLCJcclxuVGlueS5DYW52YXNNYXNrTWFuYWdlciA9IGZ1bmN0aW9uKClcclxue1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkNhbnZhc01hc2tNYW5hZ2VyO1xyXG5cclxuVGlueS5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUucHVzaE1hc2sgPSBmdW5jdGlvbihtYXNrRGF0YSwgcmVuZGVyU2Vzc2lvbilcclxue1xyXG5cdHZhciBjb250ZXh0ID0gcmVuZGVyU2Vzc2lvbi5jb250ZXh0O1xyXG5cclxuICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgXHJcbiAgICB2YXIgY2FjaGVBbHBoYSA9IG1hc2tEYXRhLmFscGhhO1xyXG4gICAgdmFyIHRyYW5zZm9ybSA9IG1hc2tEYXRhLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciByZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybS5hICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5iICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5jICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5kICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50eCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHkgKiByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzTWFzayhtYXNrRGF0YSwgY29udGV4dCk7XHJcblxyXG4gICAgY29udGV4dC5jbGlwKCk7XHJcblxyXG4gICAgbWFza0RhdGEud29ybGRBbHBoYSA9IGNhY2hlQWxwaGE7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc01hc2tNYW5hZ2VyLnByb3RvdHlwZS5wb3BNYXNrID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnJlc3RvcmUoKTtcclxufTsiLCJcclxuVGlueS5DYW52YXNSZW5kZXJlciA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpXHJcbnsgICBcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gKG9wdGlvbnMucmVzb2x1dGlvbiAhPSB1bmRlZmluZWQgPyBvcHRpb25zLnJlc29sdXRpb24gOiAxKTtcclxuXHJcbiAgICB0aGlzLmNsZWFyQmVmb3JlUmVuZGVyID0gKG9wdGlvbnMuY2xlYXJCZWZvcmVSZW5kZXIgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbGVhckJlZm9yZVJlbmRlciA6IHRydWUpO1xyXG5cclxuICAgIHRoaXMudHJhbnNwYXJlbnQgPSAob3B0aW9ucy50cmFuc3BhcmVudCAhPSB1bmRlZmluZWQgPyBvcHRpb25zLnRyYW5zcGFyZW50IDogZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSA9IG9wdGlvbnMuYXV0b1Jlc2l6ZSB8fCBmYWxzZTtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoID0gd2lkdGggfHwgODAwO1xyXG4gICAgLy8gdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNjAwO1xyXG5cclxuICAgIC8vIHRoaXMud2lkdGggKj0gdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdGhpcy5oZWlnaHQgKj0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGlmICghVGlueS5kZWZhdWx0UmVuZGVyZXIpIFRpbnkuZGVmYXVsdFJlbmRlcmVyID0gdGhpcztcclxuXHJcbiAgICB2YXIgdmlldyA9IHRoaXMuZG9tRWxlbWVudCA9IG9wdGlvbnMuZG9tRWxlbWVudCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImNhbnZhc1wiICk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0ID0gdmlldy5nZXRDb250ZXh0KCBcIjJkXCIsIHsgYWxwaGE6IHRoaXMudHJhbnNwYXJlbnQgfSApO1xyXG5cclxuICAgIC8vIHZpZXcud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdmlldy5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLnJlc2l6ZSh3aWR0aCB8fCA4MDAsIGhlaWdodCB8fCA2MDApO1xyXG5cclxuICAgIHRoaXMuc2V0Q2xlYXJDb2xvcihcIiNmZmZmZmZcIik7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzTWFza01hbmFnZXIpXHJcbiAgICAgICAgdGhpcy5tYXNrTWFuYWdlciA9IG5ldyBUaW55LkNhbnZhc01hc2tNYW5hZ2VyKCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcclxuICAgICAgICBtYXNrTWFuYWdlcjogdGhpcy5tYXNrTWFuYWdlcixcclxuICAgICAgICBzbW9vdGhQcm9wZXJ0eTogbnVsbCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJZiB0cnVlIFBpeGkgd2lsbCBNYXRoLmZsb29yKCkgeC95IHZhbHVlcyB3aGVuIHJlbmRlcmluZywgc3RvcHBpbmcgcGl4ZWwgaW50ZXJwb2xhdGlvbi5cclxuICAgICAgICAgKiBIYW5keSBmb3IgY3Jpc3AgcGl4ZWwgYXJ0IGFuZCBzcGVlZCBvbiBsZWdhY3kgZGV2aWNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJvdW5kUGl4ZWxzOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgaWYoXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJvSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJtc0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzUmVuZGVyZXI7XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24oY29sb3IpXHJcbnsgICBcclxuICAgIHRoaXMuY2xlYXJDb2xvciA9IGNvbG9yO1xyXG4gICAgXHJcbiAgICAvLyBpZiAoY29sb3IgPT09IG51bGwpIHtcclxuICAgIC8vICAgICB0aGlzLmNsZWFyQ29sb3IgPSBudWxsO1xyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvciB8fCAweDAwMDAwMDtcclxuICAgIC8vIC8vIHRoaXMuYmFja2dyb3VuZENvbG9yU3BsaXQgPSBUaW55LmhleDJyZ2IodGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgLy8gdmFyIGhleCA9IHRoaXMuY2xlYXJDb2xvci50b1N0cmluZygxNik7XHJcbiAgICAvLyBoZXggPSAnMDAwMDAwJy5zdWJzdHIoMCwgNiAtIGhleC5sZW5ndGgpICsgaGV4O1xyXG4gICAgLy8gdGhpcy5fY2xlYXJDb2xvciA9ICcjJyArIGhleDtcclxuXHJcbn07XHJcblxyXG4vLyBUaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRQaXhlbEFydCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgIHZhciBjYW52YXMgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcbiAgICBcclxuLy8gICAgIHZhciB0eXBlcyA9IFsgJ29wdGltaXplU3BlZWQnLCAnLW1vei1jcmlzcC1lZGdlcycsICctby1jcmlzcC1lZGdlcycsICctd2Via2l0LW9wdGltaXplLWNvbnRyYXN0JywgJ29wdGltaXplLWNvbnRyYXN0JywgJ2NyaXNwLWVkZ2VzJywgJ3BpeGVsYXRlZCcgXTtcclxuXHJcbi8vICAgICB0eXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIGNhbnZhcy5zdHlsZVsnaW1hZ2UtcmVuZGVyaW5nJ10gPSB0eXBlO1xyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgY2FudmFzLnN0eWxlLm1zSW50ZXJwb2xhdGlvbk1vZGUgPSAnbmVhcmVzdC1uZWlnaGJvcic7XHJcbi8vICAgICB0aGlzLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSB0cnVlO1xyXG4vLyB9XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihzY2VuZSlcclxue1xyXG4gICAgc2NlbmUudXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5pc0NvY29vbkpTICYmIHRoaXMuZG9tRWxlbWVudC5zY3JlZW5jYW52YXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuY2xlYXJCZWZvcmVSZW5kZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY2xlYXJDb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMucmVuZGVyT2JqZWN0KHNjZW5lKTtcclxuXHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24ocmVtb3ZlVmlldylcclxueyAgIFxyXG4gICAgaWYgKHR5cGVvZiByZW1vdmVWaWV3ID09PSBcInVuZGVmaW5lZFwiKSB7IHJlbW92ZVZpZXcgPSB0cnVlOyB9XHJcblxyXG4gICAgaWYgKHJlbW92ZVZpZXcgJiYgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcclxuICAgIHRoaXMubWFza01hbmFnZXIgPSBudWxsO1xyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uID0gbnVsbDtcclxuXHJcbiAgICBpZiAoVGlueS5kZWZhdWx0UmVuZGVyZXIgPT09IHRoaXMpIFRpbnkuZGVmYXVsdFJlbmRlcmVyID0gbnVsbDtcclxuXHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB2YXIgdmlldyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbiAgICB2aWV3LndpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgIHZpZXcuaGVpZ2h0ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgIHZpZXcuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuICAgICAgICB2aWV3LnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldFBpeGVsUmF0aW8gPSBmdW5jdGlvbihyZXNvbHV0aW9uKVxyXG57XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xyXG5cclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgIHZpZXcud2lkdGggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgdmlldy5oZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlck9iamVjdCA9IGZ1bmN0aW9uKGRpc3BsYXlPYmplY3QsIGNvbnRleHQpXHJcbntcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLmNvbnRleHQ7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24ucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuICAgIGRpc3BsYXlPYmplY3QucmVuZGVyKHRoaXMucmVuZGVyU2Vzc2lvbik7XHJcbn07IiwiXHJcblRpbnkuQ2FudmFzVGludGVyID0gZnVuY3Rpb24oKVxyXG57XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci5nZXRUaW50ZWRUZXh0dXJlID0gZnVuY3Rpb24oc3ByaXRlLCBjb2xvcilcclxue1xyXG4gICAgdmFyIHRleHR1cmUgPSBzcHJpdGUudGV4dHVyZTtcclxuXHJcbiAgICBpZiAoIXRleHR1cmUuX3RpbnRDYWNoZSkgdGV4dHVyZS5fdGludENhY2hlID0ge307XHJcblxyXG4gICAgaWYgKHRleHR1cmUuX3RpbnRDYWNoZVtjb2xvcl0pIHJldHVybiB0ZXh0dXJlLl90aW50Q2FjaGVbY29sb3JdO1xyXG5cclxuICAgIHZhciBjYW52YXMgPSBUaW55LkNhbnZhc1RpbnRlci5jYW52YXMgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIFxyXG4gICAgVGlueS5DYW52YXNUaW50ZXIudGludE1ldGhvZCh0ZXh0dXJlLCBjb2xvciwgY2FudmFzKTtcclxuXHJcbiAgICBpZiAoVGlueS5DYW52YXNUaW50ZXIuY29udmVydFRpbnRUb0ltYWdlKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlzIHRoaXMgYmV0dGVyP1xyXG4gICAgICAgIHZhciB0aW50SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aW50SW1hZ2Uuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG5cclxuICAgICAgICAvLyB0ZXh0dXJlLl90aW50Q2FjaGVbc3RyaW5nQ29sb3JdID0gdGludEltYWdlO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG5cclxuICAgICAgICBUaW55LkNhbnZhc1RpbnRlci5jYW52YXMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc1RpbnRlci5jYWNoZVRpbnQpIHRleHR1cmUuX3RpbnRDYWNoZVtjb2xvcl0gPSBjYW52YXM7XHJcblxyXG4gICAgcmV0dXJuIGNhbnZhcztcclxufTtcclxuXHJcblRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoTXVsdGlwbHkgPSBmdW5jdGlvbih0ZXh0dXJlLCBjb2xvciwgY2FudmFzKVxyXG57XHJcbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCBcIjJkXCIgKTtcclxuXHJcbiAgICB2YXIgY3JvcCA9IHRleHR1cmUuY3JvcDtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjcm9wLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGNyb3AuaGVpZ2h0O1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShjb2xvcik7XHJcbiAgICBcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQpO1xyXG4gICAgXHJcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwibXVsdGlwbHlcIjtcclxuXHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0ZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLWF0b3BcIjtcclxuXHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0ZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCk7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1RpbnRlci50aW50V2l0aFBlclBpeGVsID0gZnVuY3Rpb24odGV4dHVyZSwgY29sb3IsIGNhbnZhcylcclxue1xyXG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgIHZhciBjcm9wID0gdGV4dHVyZS5jcm9wO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNyb3Aud2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gY3JvcC5oZWlnaHQ7XHJcbiAgXHJcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiY29weVwiO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQpO1xyXG5cclxuICAgIHZhciByZ2JWYWx1ZXMgPSBUaW55LmNvbG9yMnJnYihjb2xvcik7XHJcbiAgICB2YXIgciA9IHJnYlZhbHVlc1swXSwgZyA9IHJnYlZhbHVlc1sxXSwgYiA9IHJnYlZhbHVlc1syXTtcclxuXHJcbiAgICB2YXIgcGl4ZWxEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY3JvcC53aWR0aCwgY3JvcC5oZWlnaHQpO1xyXG5cclxuICAgIHZhciBwaXhlbHMgPSBwaXhlbERhdGEuZGF0YTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBpeGVscy5sZW5ndGg7IGkgKz0gNClcclxuICAgIHtcclxuICAgICAgcGl4ZWxzW2krMF0gKj0gcjtcclxuICAgICAgcGl4ZWxzW2krMV0gKj0gZztcclxuICAgICAgcGl4ZWxzW2krMl0gKj0gYjtcclxuXHJcbiAgICAgIGlmICghVGlueS5jYW5IYW5kbGVBbHBoYSlcclxuICAgICAge1xyXG4gICAgICAgIHZhciBhbHBoYSA9IHBpeGVsc1tpKzNdO1xyXG5cclxuICAgICAgICBwaXhlbHNbaSswXSAvPSAyNTUgLyBhbHBoYTtcclxuICAgICAgICBwaXhlbHNbaSsxXSAvPSAyNTUgLyBhbHBoYTtcclxuICAgICAgICBwaXhlbHNbaSsyXSAvPSAyNTUgLyBhbHBoYTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKHBpeGVsRGF0YSwgMCwgMCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjaGVja0ludmVyc2VBbHBoYSgpXHJcbntcclxuICAgIHZhciBjYW52YXMgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIoMiwgMSwge3dpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZX0pO1xyXG5cclxuICAgIGNhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgxMCwgMjAsIDMwLCAwLjUpXCI7XHJcblxyXG4gICAgLy8gIERyYXcgYSBzaW5nbGUgcGl4ZWxcclxuICAgIGNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIC8vICBHZXQgdGhlIGNvbG9yIHZhbHVlc1xyXG4gICAgdmFyIHMxID0gY2FudmFzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIC8vICBQbG90IHRoZW0gdG8geDJcclxuICAgIGNhbnZhcy5jb250ZXh0LnB1dEltYWdlRGF0YShzMSwgMSwgMCk7XHJcblxyXG4gICAgLy8gIEdldCB0aG9zZSB2YWx1ZXNcclxuICAgIHZhciBzMiA9IGNhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YSgxLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgQ29tcGFyZSBhbmQgcmV0dXJuXHJcbiAgICByZXR1cm4gKHMyLmRhdGFbMF0gPT09IHMxLmRhdGFbMF0gJiYgczIuZGF0YVsxXSA9PT0gczEuZGF0YVsxXSAmJiBzMi5kYXRhWzJdID09PSBzMS5kYXRhWzJdICYmIHMyLmRhdGFbM10gPT09IHMxLmRhdGFbM10pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2hlY2tCbGVuZE1vZGUgKClcclxue1xyXG4gICAgdmFyIHBuZ0hlYWQgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBUUFBQUFCQVFNQUFBREQ4cDJPQUFBQUExQk1WRVgvJztcclxuICAgIHZhciBwbmdFbmQgPSAnQUFBQUNrbEVRVlFJMTJOZ0FBQUFBZ0FCNGlHOE13QUFBQUJKUlU1RXJrSmdnZz09JztcclxuXHJcbiAgICB2YXIgbWFnZW50YSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIG1hZ2VudGEub25sb2FkID0gZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB2YXIgeWVsbG93ID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgICAgIHllbGxvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSA2O1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7d2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlfSk7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseSc7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShtYWdlbnRhLCAwLCAwKTtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoeWVsbG93LCAyLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGV4dC5nZXRJbWFnZURhdGEoMiwgMCwgMSwgMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgyLCAwLCAxLCAxKS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgVGlueS5zdXBwb3J0TmV3QmxlbmRNb2RlcyA9IChkYXRhWzBdID09PSAyNTUgJiYgZGF0YVsxXSA9PT0gMCAmJiBkYXRhWzJdID09PSAwKTtcclxuICAgICAgICAgICAgVGlueS5DYW52YXNUaW50ZXIudGludE1ldGhvZCA9IFRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoTXVsdGlwbHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeWVsbG93LnNyYyA9IHBuZ0hlYWQgKyAnL3dDS3h2UkYnICsgcG5nRW5kO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYWdlbnRhLnNyYyA9IHBuZ0hlYWQgKyAnQVA4MDRPYTYnICsgcG5nRW5kO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuXHJcblRpbnkuQ2FudmFzVGludGVyLmNvbnZlcnRUaW50VG9JbWFnZSA9IGZhbHNlO1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuY2FjaGVUaW50ID0gZmFsc2U7XHJcblxyXG5UaW55LmNhbkhhbmRsZUFscGhhID0gY2hlY2tJbnZlcnNlQWxwaGEoKTtcclxuXHJcblRpbnkuc3VwcG9ydE5ld0JsZW5kTW9kZXMgPSBjaGVja0JsZW5kTW9kZSgpO1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludE1ldGhvZCA9IFRpbnkuc3VwcG9ydE5ld0JsZW5kTW9kZXMgPyBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5IDogIFRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoUGVyUGl4ZWw7XHJcbiIsIlxyXG5UaW55LkNhbnZhc0dyYXBoaWNzID0gZnVuY3Rpb24oKVxyXG57XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzID0gZnVuY3Rpb24oZ3JhcGhpY3MsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciB3b3JsZEFscGhhID0gZ3JhcGhpY3Mud29ybGRBbHBoYTtcclxuXHJcbiAgICBpZiAoZ3JhcGhpY3MuZGlydHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHcmFwaGljc1RpbnQoZ3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IGRhdGEuX2ZpbGxUaW50O1xyXG4gICAgICAgIHZhciBsaW5lQ29sb3IgPSBkYXRhLl9saW5lVGludDtcclxuXHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBkYXRhLmxpbmVXaWR0aDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUE9MWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaj0xOyBqIDwgcG9pbnRzLmxlbmd0aC8yOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tqICogMl0sIHBvaW50c1tqICogMiArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNoYXBlLmNsb3NlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl0gJiYgcG9pbnRzWzFdID09PSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJFQ1QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsQ29sb3IgfHwgZGF0YS5maWxsQ29sb3IgPT09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuQ0lSQylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gLSBuZWVkIHRvIGJlIFVuZGVmaW5lZCFcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUucmFkaXVzLDAsMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5FTElQKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gZWxsaXBzZSBjb2RlIHRha2VuIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE3Mjc5OC9ob3ctdG8tZHJhdy1hbi1vdmFsLWluLWh0bWw1LWNhbnZhc1xyXG5cclxuICAgICAgICAgICAgdmFyIHcgPSBzaGFwZS53aWR0aCAqIDI7XHJcbiAgICAgICAgICAgIHZhciBoID0gc2hhcGUuaGVpZ2h0ICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gc2hhcGUueCAtIHcvMjtcclxuICAgICAgICAgICAgdmFyIHkgPSBzaGFwZS55IC0gaC8yO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYXBwYSA9IDAuNTUyMjg0OCxcclxuICAgICAgICAgICAgICAgIG94ID0gKHcgLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBveSA9IChoIC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcclxuICAgICAgICAgICAgICAgIHhlID0geCArIHcsICAgICAgICAgICAvLyB4LWVuZFxyXG4gICAgICAgICAgICAgICAgeWUgPSB5ICsgaCwgICAgICAgICAgIC8vIHktZW5kXHJcbiAgICAgICAgICAgICAgICB4bSA9IHggKyB3IC8gMiwgICAgICAgLy8geC1taWRkbGVcclxuICAgICAgICAgICAgICAgIHltID0geSArIGggLyAyOyAgICAgICAvLyB5LW1pZGRsZVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeCwgeW0gLSBveSwgeG0gLSBveCwgeSwgeG0sIHkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gKyBveCwgeSwgeGUsIHltIC0gb3ksIHhlLCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4ZSwgeW0gKyBveSwgeG0gKyBveCwgeWUsIHhtLCB5ZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSAtIG94LCB5ZSwgeCwgeW0gKyBveSwgeCwgeW0pO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShsaW5lQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF4UmFkaXVzID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyIHwgMDtcclxuICAgICAgICAgICAgcmFkaXVzID0gcmFkaXVzID4gbWF4UmFkaXVzID8gbWF4UmFkaXVzIDogcmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocngsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSArIGhlaWdodCwgcnggKyByYWRpdXMsIHJ5ICsgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCAtIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnkgKyBoZWlnaHQsIHJ4ICsgd2lkdGgsIHJ5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyB3aWR0aCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocnggKyB3aWR0aCwgcnksIHJ4ICsgd2lkdGggLSByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocnggKyByYWRpdXMsIHJ5KTtcclxuICAgICAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHJ4LCByeSwgcngsIHJ5ICsgcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGxDb2xvciB8fCBkYXRhLmZpbGxDb2xvciA9PT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUaW55LmNvbG9yMnN0eWxlKGxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUNfTEpPSU4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcnggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICB2YXIgcnkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBzaGFwZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHNoYXBlLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHNoYXBlLnJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGxDb2xvciB8fCBkYXRhLmZpbGxDb2xvciA9PT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gVGlueS5jb2xvcjJzdHlsZShmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFRpbnkuY29sb3Iyc3R5bGUoZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5saW5lSm9pbiA9IFwicm91bmRcIjtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QocnggKyAocmFkaXVzIC8gMiksIHJ5ICsgKHJhZGl1cyAvIDIpLCB3aWR0aCAtIHJhZGl1cywgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChyeCArIChyYWRpdXMgLyAyKSwgcnkgKyAocmFkaXVzIC8gMiksIHdpZHRoIC0gcmFkaXVzLCBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3NNYXNrID0gZnVuY3Rpb24oZ3JhcGhpY3MsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciBsZW4gPSBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoO1xyXG5cclxuICAgIGlmIChsZW4gPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzLmdyYXBoaWNzRGF0YVtpXTtcclxuICAgICAgICB2YXIgc2hhcGUgPSBkYXRhLnNoYXBlO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUE9MWSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBqPTE7IGogPCBwb2ludHMubGVuZ3RoLzI7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2ogKiAyXSwgcG9pbnRzW2ogKiAyICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl0gJiYgcG9pbnRzWzFdID09PSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVjdChzaGFwZS54LCBzaGFwZS55LCBzaGFwZS53aWR0aCwgc2hhcGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuQ0lSQylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gLSBuZWVkIHRvIGJlIFVuZGVmaW5lZCFcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkVMSVApXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy8gZWxsaXBzZSBjb2RlIHRha2VuIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE3Mjc5OC9ob3ctdG8tZHJhdy1hbi1vdmFsLWluLWh0bWw1LWNhbnZhc1xyXG5cclxuICAgICAgICAgICAgdmFyIHcgPSBzaGFwZS53aWR0aCAqIDI7XHJcbiAgICAgICAgICAgIHZhciBoID0gc2hhcGUuaGVpZ2h0ICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gc2hhcGUueCAtIHcvMjtcclxuICAgICAgICAgICAgdmFyIHkgPSBzaGFwZS55IC0gaC8yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGthcHBhID0gMC41NTIyODQ4LFxyXG4gICAgICAgICAgICAgICAgb3ggPSAodyAvIDIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IGhvcml6b250YWxcclxuICAgICAgICAgICAgICAgIG95ID0gKGggLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCB2ZXJ0aWNhbFxyXG4gICAgICAgICAgICAgICAgeGUgPSB4ICsgdywgICAgICAgICAgIC8vIHgtZW5kXHJcbiAgICAgICAgICAgICAgICB5ZSA9IHkgKyBoLCAgICAgICAgICAgLy8geS1lbmRcclxuICAgICAgICAgICAgICAgIHhtID0geCArIHcgLyAyLCAgICAgICAvLyB4LW1pZGRsZVxyXG4gICAgICAgICAgICAgICAgeW0gPSB5ICsgaCAvIDI7ICAgICAgIC8vIHktbWlkZGxlXHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyh4LCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4LCB5bSAtIG95LCB4bSAtIG94LCB5LCB4bSwgeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSArIG94LCB5LCB4ZSwgeW0gLSBveSwgeGUsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhlLCB5bSArIG95LCB4bSArIG94LCB5ZSwgeG0sIHllKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtIC0gb3gsIHllLCB4LCB5bSArIG95LCB4LCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMgfHwgZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcnggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICB2YXIgcnkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBzaGFwZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHNoYXBlLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHNoYXBlLnJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXhSYWRpdXMgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIgfCAwO1xyXG4gICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgPiBtYXhSYWRpdXMgPyBtYXhSYWRpdXMgOiByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhyeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5ICsgaGVpZ2h0LCByeCArIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoIC0gcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSArIGhlaWdodCwgcnggKyB3aWR0aCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoLCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSwgcnggKyB3aWR0aCAtIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5LCByeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzR3JhcGhpY3MudXBkYXRlR3JhcGhpY3NUaW50ID0gZnVuY3Rpb24oZ3JhcGhpY3MpXHJcbntcclxuICAgIGlmIChncmFwaGljcy50aW50ID09PSAweEZGRkZGRilcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRpbnRSID0gKGdyYXBoaWNzLnRpbnQgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgIHZhciB0aW50RyA9IChncmFwaGljcy50aW50ID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgIHZhciB0aW50QiA9IChncmFwaGljcy50aW50ICYgMHhGRikvIDI1NTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYXBoaWNzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzLmdyYXBoaWNzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IGRhdGEuZmlsbENvbG9yIHwgMDtcclxuICAgICAgICB2YXIgbGluZUNvbG9yID0gZGF0YS5saW5lQ29sb3IgfCAwO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBjb2xvclIgPSAoZmlsbENvbG9yID4+IDE2ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgdmFyIGNvbG9yRyA9IChmaWxsQ29sb3IgPj4gOCAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIHZhciBjb2xvckIgPSAoZmlsbENvbG9yICYgMHhGRikgLyAyNTU7IFxyXG4gICAgICAgIGNvbG9yUiAqPSB0aW50UjtcclxuICAgICAgICBjb2xvckcgKj0gdGludEc7XHJcbiAgICAgICAgY29sb3JCICo9IHRpbnRCO1xyXG4gICAgICAgIGZpbGxDb2xvciA9ICgoY29sb3JSKjI1NSA8PCAxNikgKyAoY29sb3JHKjI1NSA8PCA4KSArIGNvbG9yQioyNTUpO1xyXG4gICAgICAgIGNvbG9yUiA9IChsaW5lQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgICAgICBjb2xvckcgPSAobGluZUNvbG9yID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgICAgICBjb2xvckIgPSAobGluZUNvbG9yICYgMHhGRikgLyAyNTU7IFxyXG4gICAgICAgIGNvbG9yUiAqPSB0aW50UjtcclxuICAgICAgICBjb2xvckcgKj0gdGludEc7XHJcbiAgICAgICAgY29sb3JCICo9IHRpbnRCO1xyXG4gICAgICAgIGxpbmVDb2xvciA9ICgoY29sb3JSKjI1NSA8PCAxNikgKyAoY29sb3JHKjI1NSA8PCA4KSArIGNvbG9yQioyNTUpOyAgIFxyXG4gICAgICAgICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgZGF0YS5fZmlsbFRpbnQgPSAoKChmaWxsQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NSAqIHRpbnRSKjI1NSA8PCAxNikgKyAoKGZpbGxDb2xvciA+PiA4ICYgMHhGRikgLyAyNTUgKiB0aW50RyoyNTUgPDwgOCkgKyAgKGZpbGxDb2xvciAmIDB4RkYpIC8gMjU1ICogdGludEIqMjU1KTtcclxuICAgICAgICBkYXRhLl9saW5lVGludCA9ICgoKGxpbmVDb2xvciA+PiAxNiAmIDB4RkYpIC8gMjU1ICogdGludFIqMjU1IDw8IDE2KSArICgobGluZUNvbG9yID4+IDggJiAweEZGKSAvIDI1NSAqIHRpbnRHKjI1NSA8PCA4KSArICAobGluZUNvbG9yICYgMHhGRikgLyAyNTUgKiB0aW50QioyNTUpO1xyXG5cclxuICAgIH1cclxufTsiLCJ2YXIgbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cztcclxuXHJcblRpbnkuSW5wdXQgPSBmdW5jdGlvbihnYW1lKVxyXG57XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQgPSBnYW1lLmlucHV0VmlldztcclxuXHJcbiAgICB0aGlzLmJvdW5kcyA9IHt4OiAwLCB5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwfTtcclxuICAgIHRoaXMuY2FuZGlkYXRlcyA9IFtdO1xyXG4gICAgdGhpcy5saXN0ID0gW107XHJcblxyXG4gICAgdGhpcy5sYXN0TW92ZSA9IG51bGw7XHJcbiAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZG93bkhhbmRsZXIgPSB0aGlzLmRvd25IYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gdGhpcy5tb3ZlSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy51cEhhbmRsZXIgPSB0aGlzLnVwSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgLy8gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcclxuXHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy51cEhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICAvLyB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG5cclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy51cEhhbmRsZXIpO1xyXG5cclxuICAgIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKHRoaXMpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5JbnB1dC5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgVGlueS5JbnB1dC5zeXN0ZW1zW2ldLmluaXQuY2FsbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUJvdW5kcygpO1xyXG59O1xyXG5cclxuVGlueS5JbnB1dC5wcm90b3R5cGUgPSB7XHJcblxyXG5cclxuICAgIGFkZDogZnVuY3Rpb24ob2JqZWN0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgb2JqZWN0LmlucHV0RW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIG9wdGlvbnMuc3lzdGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgb2JqZWN0LmlucHV0ID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4ob2JqZWN0LmlucHV0KVxyXG5cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChvYmplY3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uKG9iamVjdCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubGlzdC5pbmRleE9mKG9iamVjdCk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVkID0gdGhpcy5saXN0W2luZGV4XTtcclxuICAgICAgICAgICAgcmVtb3ZlZC5pbnB1dCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlbW92ZWQuaW5wdXRFbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRIYW5kbGVyOiBmdW5jdGlvbihuYW1lLCBldmVudClcclxuICAgIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhuYW1lKVxyXG4gICAgICAgIHZhciBjb29yZHMgPSB0aGlzLmdldENvb3JkcyhldmVudCk7XHJcblxyXG4gICAgICAgIGlmIChjb29yZHMgIT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobmFtZSAhPSBcIm1vdmVcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5kaWRhdGVzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUaW55LklucHV0LnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBUaW55LklucHV0LnN5c3RlbXNbaV0ucHJlSGFuZGxlLmNhbGwodGhpcywgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNHb29kLCBvYmo7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCB0aGlzLmxpc3QubGVuZ3RoOyB0KyspIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMubGlzdFt0XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaW5wdXRFbmFibGVkIHx8ICFvYmoucGFyZW50KSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5pbnB1dC5jaGVja0JvdW5kcykgaXNHb29kID0gb2JqLmlucHV0LmNoZWNrQm91bmRzLmNhbGwodGhpcywgb2JqLCBjb29yZHMueCwgY29vcmRzLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaXNHb29kID0gVGlueS5JbnB1dC5jaGVja0JvdW5kcy5jYWxsKHRoaXMsIG9iaiwgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzR29vZCkgdGhpcy5jYW5kaWRhdGVzLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBpID0gdGhpcy5jYW5kaWRhdGVzLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gdGhpcy5jYW5kaWRhdGVzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmlucHV0W1wibGFzdF9cIiArIG5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSBcInVwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSBvYmouaW5wdXRbXCJsYXN0X2Rvd25cIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50ICYmIFRpbnkuTWF0aC5kaXN0YW5jZShwb2ludC54LCBwb2ludC55LCBjb29yZHMueCwgY29vcmRzLnkpIDwgMzApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChcImNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5pbnB1dC50cmFuc3BhcmVudCkgXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB2YXIgb2JqID0gdGhpcy5jYW5kaWRhdGVzW2kgLSAxXVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9iai5pbnB1dFtcImxhc3RfXCIgKyBuYW1lXSA9IHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9iai5pbnB1dC5lbWl0KG5hbWUsIHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAobmFtZSA9PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdmFyIHBvaW50ID0gb2JqLmlucHV0W1wibGFzdF9kb3duXCJdXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmIChwb2ludCAmJiBUaW55Lk1hdGguZGlzdGFuY2UocG9pbnQueCwgcG9pbnQueSwgY29vcmRzLngsIGNvb3Jkcy55KSA8IDMwKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQoXCJjbGlja1wiLCB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChuYW1lLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW92ZUhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGFzdE1vdmUgPSBldmVudDtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcIm1vdmVcIiwgZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cEhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXNEb3duID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJ1cFwiLCB0aGlzLmxhc3RNb3ZlKTtcclxuICAgIH0sXHJcblxyXG4gICAgZG93bkhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxhc3RNb3ZlID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJkb3duXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tIYW5kbGVyOiBmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcImNsaWNrXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q29vcmRzOiBmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB2YXIgY29vcmRzID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9PSAndW5kZWZpbmVkJyAmJiBldmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBldmVudC50b3VjaGVzWzBdLmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmNsaWVudFggJiYgZXZlbnQuY2xpZW50WSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGxpc3RlbmluZ1RvVG91Y2hFdmVudHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBNb3VzZSBldmVudFxyXG4gICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxpc3RlbmluZ1RvVG91Y2hFdmVudHMgJiYgZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50IHx8IGNvb3JkcyA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgeDogKGNvb3Jkcy54IC0gdGhpcy5ib3VuZHMueCksXHJcbiAgICAgICAgICAgIHk6IChjb29yZHMueSAtIHRoaXMuYm91bmRzLnkpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBjb29yZHM7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUJvdW5kczogZnVuY3Rpb24oKSBcclxuICAgIHtcclxuICAgICAgICBib3VuZHMgPSB0aGlzLmJvdW5kcztcclxuXHJcbiAgICAgICAgdmFyIGNsaWVudFJlY3QgPSB0aGlzLmRvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIGJvdW5kcy54ID0gY2xpZW50UmVjdC5sZWZ0O1xyXG4gICAgICAgIGJvdW5kcy55ID0gY2xpZW50UmVjdC50b3A7XHJcbiAgICAgICAgYm91bmRzLndpZHRoID0gY2xpZW50UmVjdC53aWR0aDtcclxuICAgICAgICBib3VuZHMuaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgdmlldyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy51cEhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLnVwSGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcblxyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnVwSGFuZGxlcik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LklucHV0LmNoZWNrQm91bmRzID0gZnVuY3Rpb24ob2JqLCB4LCB5KVxyXG57XHJcbiAgICBpZiAob2JqLndvcmxkVmlzaWJsZSlcclxuICAgIHtcclxuICAgICAgICBpZiAob2JqLmdldEJvdW5kcygpLmNvbnRhaW5zKHgsIHkpKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiAob2JqLmNoaWxkcmVuICYmIG9iai5jaGlsZHJlbi5sZW5ndGggPiAwKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGZvciAodmFyIHQgPSAwOyB0IDwgb2JqLmNoaWxkcmVuLmxlbmd0aDsgdCsrKSBcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIF9jaGVja09uQWN0aXZlT2JqZWN0cyhvYmouY2hpbGRyZW5bdF0sIHgsIHkpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxufVxyXG5cclxuVGlueS5JbnB1dC5zeXN0ZW1zID0gW107XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwiaW5wdXRcIiwgVGlueS5JbnB1dCk7IiwiXHJcblRpbnkuQ2FjaGUgPSB7XHJcbiAgICBpbWFnZToge30sXHJcbiAgICB0ZXh0dXJlOiB7fVxyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIgPSBmdW5jdGlvbihnYW1lKVxyXG57XHJcbiAgICBnYW1lLmNhY2hlID0gVGlueS5DYWNoZTtcclxuXHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5saXN0ID0gW107XHJcbn07XHJcblxyXG5UaW55LkxvYWRlci5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgY2xlYXJDYWNoZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIHkgaW4gVGlueS5DYWNoZS50ZXh0dXJlKSBUaW55LkNhY2hlLnRleHR1cmVbeV0uZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciB5IGluIFRpbnkuQ2FjaGUpIFRpbnkuQ2FjaGVbeV0gPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgYWxsOiBmdW5jdGlvbihhcnJheSkge1xyXG5cclxuICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QuY29uY2F0KGFycmF5KTsgXHJcbiAgICB9LFxyXG5cclxuICAgIGltYWdlOiBmdW5jdGlvbihrZXksIHNvdXJjZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNwcml0ZXNoZWV0OiBmdW5jdGlvbihrZXksIHNvdXJjZSwgYXJnXzEsIGFyZ18yLCB0b3RhbEZyYW1lcywgZHVyYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB0eXBlOiBcInNwcml0ZXNoZWV0XCJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGFyZ18xID09IFwibnVtYmVyXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXMud2lkdGggPSBhcmdfMTtcclxuICAgICAgICAgICAgcmVzLmhlaWdodCA9IGFyZ18yO1xyXG4gICAgICAgICAgICByZXMudG90YWwgPSB0b3RhbEZyYW1lcztcclxuICAgICAgICAgICAgcmVzLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ18xLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXMuZGF0YSA9IGFyZ18xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gocmVzKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXRsYXM6IGZ1bmN0aW9uKGtleSwgc291cmNlLCBhdGxhc0RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIGRhdGE6IGF0bGFzRGF0YSxcclxuICAgICAgICAgICAgdHlwZTogXCJhdGxhc1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbihjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICB2YXIgZ2FtZSA9IHRoaXMuZ2FtZTtcclxuICAgICAgICB2YXIgbGlzdCA9IHRoaXMubGlzdDtcclxuXHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGdhbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkTmV4dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyB2YXIgZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBsaXN0LnNoaWZ0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9hZGVyID0gVGlueS5Mb2FkZXJbcmVzb3VyY2UudHlwZV07XHJcblxyXG4gICAgICAgICAgICBpZiAobG9hZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZXIocmVzb3VyY2UsIGxvYWRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3QgZmluZCBsb2FkZXIgZm9yIFwiICsgcmVzb3VyY2UudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZGVkKHJlc291cmNlLCBkYXRhKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCAhPSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbG9hZE5leHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGdhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2FkTmV4dCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIuYXRsYXMgPSBmdW5jdGlvbihyZXNvdXJjZSwgY2IpXHJcbntcclxuICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XHJcblxyXG4gICAgVGlueS5Mb2FkZXIuaW1hZ2UocmVzb3VyY2UsIGZ1bmN0aW9uKHJlc291cmNlLCBpbWFnZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzb3VyY2UuZGF0YS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB1dWlkID0ga2V5ICsgXCIuXCIgKyByZXNvdXJjZS5kYXRhW2ldLm5hbWU7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwgcmVzb3VyY2UuZGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG5cclxuICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuVGlueS5Mb2FkZXIuc3ByaXRlc2hlZXQgPSBmdW5jdGlvbihyZXNvdXJjZSwgY2IpXHJcbntcclxuICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XHJcblxyXG4gICAgVGlueS5Mb2FkZXIuaW1hZ2UocmVzb3VyY2UsIGZ1bmN0aW9uKHJlc291cmNlLCBpbWFnZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBsYXN0RnJhbWUsIHV1aWQsIHRleHR1cmU7XHJcblxyXG4gICAgICAgIGlmIChyZXNvdXJjZS5kYXRhKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJhbWVEYXRhID0gcmVzb3VyY2UuZGF0YTtcclxuICAgICAgICAgICAgbGFzdEZyYW1lID0gKGZyYW1lRGF0YS5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGxhc3RGcmFtZTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1dWlkID0ga2V5ICsgXCIuXCIgKyBpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ueCksXHJcbiAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ueSksXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLndpZHRoKSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLmhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGZyYW1lRGF0YVtpXS5kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmxhc3RGcmFtZSA9IGxhc3RGcmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBpbWFnZS5uYXR1cmFsV2lkdGggfHwgaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBpbWFnZS5uYXR1cmFsSGVpZ2h0IHx8IGltYWdlLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcmFtZVdpZHRoID0gcmVzb3VyY2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBmcmFtZUhlaWdodCA9IHJlc291cmNlLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmICghZnJhbWVXaWR0aCkgZnJhbWVXaWR0aCA9IE1hdGguZmxvb3Iod2lkdGggLyAocmVzb3VyY2UuY29scyB8fCAxKSk7XHJcbiAgICAgICAgICAgIGlmICghZnJhbWVIZWlnaHQpIGZyYW1lSGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgLyAocmVzb3VyY2Uucm93cyB8fCAxKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29scyA9IE1hdGguZmxvb3Iod2lkdGggLyBmcmFtZVdpZHRoKTtcclxuICAgICAgICAgICAgdmFyIHJvd3MgPSBNYXRoLmZsb29yKGhlaWdodCAvIGZyYW1lSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0b3RhbCA9IGNvbHMgKiByb3dzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRvdGFsID09PSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZS50b3RhbCkgdG90YWwgPSBNYXRoLm1pbih0b3RhbCwgcmVzb3VyY2UudG90YWwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHggPSAwO1xyXG4gICAgICAgICAgICB2YXIgeSA9IDA7XHJcbiAgICAgICAgICAgIGxhc3RGcmFtZSA9IHRvdGFsIC0gMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdXVpZCA9IGtleSArIFwiLlwiICsgaTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBmcmFtZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogZnJhbWVIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHJlc291cmNlLmR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcbiAgICAgICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICAgICAgICAgIHggKz0gZnJhbWVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoeCArIGZyYW1lV2lkdGggPiB3aWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB5ICs9IGZyYW1lSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYigpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5UaW55LkxvYWRlci5pbWFnZSA9IGZ1bmN0aW9uKHJlc291cmNlLCBjYikgXHJcbntcclxuICAgIC8vIGlmIChUaW55LkNhY2hlW1wiaW1hZ2VcIl1bcmVzb3VyY2Uua2V5XSkgcmV0dXJuIGNiKHJlc291cmNlLCBUaW55LkNhY2hlW1wiaW1hZ2VcIl1bcmVzb3VyY2Uua2V5XSk7XHJcblxyXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIFRpbnkuQ2FjaGUuaW1hZ2VbcmVzb3VyY2Uua2V5XSA9IGltYWdlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNiKHJlc291cmNlLCBpbWFnZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBjYihyZXNvdXJjZSwgaW1hZ2UpO1xyXG4gICAgLy8gfSlcclxuXHJcbiAgICBpbWFnZS5zcmMgPSByZXNvdXJjZS5zcmM7XHJcbn1cclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJsb2FkXCIsIFRpbnkuTG9hZGVyKTsiLCJ2YXIgX2lzU2V0VGltZU91dCwgX29uTG9vcCwgX3RpbWVPdXRJRCwgX3ByZXZUaW1lLCBfbGFzdFRpbWU7XHJcblxyXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbn1cclxuXHJcbmlmIChzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiYgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxufSBlbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBub3cgPSBEYXRlLm5vdztcclxufVxyXG5cclxuVGlueS5SQUYgPSBmdW5jdGlvbiAoZ2FtZSwgZm9yY2VTZXRUaW1lT3V0KVxyXG57XHJcblxyXG4gICAgaWYgKGZvcmNlU2V0VGltZU91dCA9PT0gdW5kZWZpbmVkKSB7IGZvcmNlU2V0VGltZU91dCA9IGZhbHNlOyB9XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG5cclxuICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmZvcmNlU2V0VGltZU91dCA9IGZvcmNlU2V0VGltZU91dDtcclxuXHJcbiAgICB2YXIgdmVuZG9ycyA9IFtcclxuICAgICAgICAnbXMnLFxyXG4gICAgICAgICdtb3onLFxyXG4gICAgICAgICd3ZWJraXQnLFxyXG4gICAgICAgICdvJ1xyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyB4KyspXHJcbiAgICB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XHJcbiAgICB9XHJcblxyXG4gICAgX2lzU2V0VGltZU91dCA9IGZhbHNlO1xyXG4gICAgX29uTG9vcCA9IG51bGw7XHJcbiAgICBfdGltZU91dElEID0gbnVsbDtcclxuXHJcbiAgICBfcHJldlRpbWUgPSAwXHJcbiAgICBfbGFzdFRpbWUgPSAwXHJcbn07XHJcblxyXG5UaW55LlJBRi5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIF9wcmV2VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB0aGlzLmZvcmNlU2V0VGltZU91dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9pc1NldFRpbWVPdXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgX29uTG9vcCA9IGZ1bmN0aW9uICgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy51cGRhdGVTZXRUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnNldFRpbWVvdXQoX29uTG9vcCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy51cGRhdGVSQUYoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9vbkxvb3ApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlUkFGOiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIF9sYXN0VGltZSA9IG5vdygpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5fdXBkYXRlKE1hdGguZmxvb3IoX2xhc3RUaW1lKSwgX2xhc3RUaW1lIC0gX3ByZXZUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9vbkxvb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3ByZXZUaW1lID0gX2xhc3RUaW1lXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVTZXRUaW1lb3V0OiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIF9sYXN0VGltZSA9IG5vdygpXHJcbiAgICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIFRpbnkuUkFGLnRpbWVUb0NhbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWVcclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkgXHJcbiAgICB7XHJcbiAgICAgICAgX3ByZXZUaW1lID0gbm93KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9pc1NldFRpbWVPdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RpbWVPdXRJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShfdGltZU91dElEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlJBRi50aW1lVG9DYWxsID0gMTU7IiwidmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxudmFyIFRpbWVyID0gZnVuY3Rpb24oc3RhdHVzLCBhdXRvUmVtb3ZlLCBnYW1lLCBjYiwgZGVsYXksIGxvb3AsIG4sIG9uY29tcGxldGUpXHJcbntcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLl9jYl8gPSBjYiB8fCBub29wO1xyXG4gICAgdGhpcy5kZWxheSA9IChkZWxheSA9PSB1bmRlZmluZWQgPyAxMDAwIDogZGVsYXkpO1xyXG4gICAgdGhpcy5sb29wID0gbG9vcDtcclxuICAgIHRoaXMuX2NvdW50ID0gbiB8fCAwO1xyXG4gICAgdGhpcy5fcmVwZWF0ID0gKHRoaXMuX2NvdW50ID4gMCk7XHJcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcclxuICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICB0aGlzLmF1dG9SZW1vdmUgPSBhdXRvUmVtb3ZlO1xyXG4gICAgdGhpcy5fb25jb21wbGV0ZSA9IG9uY29tcGxldGUgfHwgbm9vcDtcclxufVxyXG5cclxuVGltZXIucHJvdG90eXBlID0ge1xyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICB9LFxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICB9LFxyXG4gICAgc3RvcDogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLl9sYXN0RnJhbWUgPSAwO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oZGVsdGFUaW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSArPSBkZWx0YVRpbWVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhc3RGcmFtZSA+PSB0aGlzLmRlbGF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYl8oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVwZWF0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvdW50ID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9SZW1vdmUgJiYgdGhpcy5nYW1lLnRpbWVyLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmxvb3ApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5UaW55LlRpbWVyID0gVGltZXI7XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvciA9IGZ1bmN0aW9uKGdhbWUpXHJcbntcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIHRoaXMuYXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvci5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbihkZWx0YSkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goZnVuY3Rpb24odG0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0bS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQWxsOiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goZnVuY3Rpb24odG0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0bS5zdG9wKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24odG0pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZGV4T2YgPSB0aGlzLmxpc3QuaW5kZXhPZih0bSk7XHJcbiAgICAgICAgaWYgKGluZGV4T2YgPiAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRtLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleE9mLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkOiBmdW5jdGlvbihkZWxheSwgY2IsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoYXV0b3N0YXJ0ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXRvc3RhcnQgPSB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKChhdXRvc3RhcnQgPyAxIDogMCksIChhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmUpLCB0aGlzLmdhbWUsIGNiLCBkZWxheSk7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2godGltZXIpO1xyXG4gICAgICAgIHJldHVybiB0aW1lcjtcclxuICAgIH0sXHJcbiAgICBsb29wOiBmdW5jdGlvbihkZWxheSwgY2IsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoYXV0b3N0YXJ0ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXRvc3RhcnQgPSB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKChhdXRvc3RhcnQgPyAxIDogMCksIChhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmUpLCB0aGlzLmdhbWUsIGNiLCBkZWxheSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2godGltZXIpO1xyXG4gICAgICAgIHJldHVybiB0aW1lcjtcclxuICAgIH0sXHJcbiAgICByZXBlYXQ6IGZ1bmN0aW9uKGRlbGF5LCBuLCBjYiwgY29tcGxldGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKCh0aGlzLmF1dG9TdGFydCA/IDEgOiAwKSwgdGhpcy5hdXRvUmVtb3ZlLCB0aGlzLmdhbWUsIGNiLCBkZWxheSwgZmFsc2UsIG4sIGNvbXBsZXRlKTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwidGltZXJcIiwgVGlueS5UaW1lckNyZWF0b3IpOyIsIi8qKlxyXG4gKiBUd2Vlbi5qcyAtIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qcy9ncmFwaHMvY29udHJpYnV0b3JzIGZvciB0aGUgZnVsbCBsaXN0IG9mIGNvbnRyaWJ1dG9ycy5cclxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXHJcbiAqL1xyXG5cclxuXHJcbnZhciBfR3JvdXAgPSBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy5fdHdlZW5zID0ge307XHJcblx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcclxufTtcclxuXHJcbl9Hcm91cC5wcm90b3R5cGUgPSB7XHJcblx0Z2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl90d2VlbnNbdHdlZW5JZF07XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRyZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0aGlzLl90d2VlbnMgPSB7fTtcclxuXHJcblx0fSxcclxuXHJcblx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcclxuXHJcblx0XHR0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV0gPSB0d2VlbjtcclxuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldID0gdHdlZW47XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlbW92ZTogZnVuY3Rpb24gKHR3ZWVuKSB7XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXTtcclxuXHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVt0d2Vlbi5nZXRJZCgpXTtcclxuXHJcblx0fSxcclxuXHJcblx0dXBkYXRlOiBmdW5jdGlvbiAodGltZSwgcHJlc2VydmUpIHtcclxuXHJcblx0XHR2YXIgdHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpO1xyXG5cclxuXHRcdGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0aW1lIDogVFdFRU4ubm93KCk7XHJcblxyXG5cdFx0Ly8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhblxyXG5cdFx0Ly8gdXBkYXRlLCB0aGVuIHRoZSBuZXcgdHdlZW4gd2lsbCBiZSB1cGRhdGVkIGluIHRoZSBuZXh0IGJhdGNoLlxyXG5cdFx0Ly8gSWYgeW91IHJlbW92ZSBhIHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIGl0IG1heSBvciBtYXkgbm90IGJlIHVwZGF0ZWQuXHJcblx0XHQvLyBIb3dldmVyLCBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLFxyXG5cdFx0Ly8gdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxyXG5cdFx0d2hpbGUgKHR3ZWVuSWRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcclxuXHJcblx0XHRcdFx0aWYgKHR3ZWVuICYmIHR3ZWVuLnVwZGF0ZSh0aW1lKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdHR3ZWVuLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIXByZXNlcnZlKSB7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH1cclxufTtcclxuXHJcbnZhciBUV0VFTiA9IG5ldyBfR3JvdXAoKTtcclxuXHJcblRXRUVOLkdyb3VwID0gX0dyb3VwO1xyXG5UV0VFTi5fbmV4dElkID0gMDtcclxuVFdFRU4ubmV4dElkID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBUV0VFTi5fbmV4dElkKys7XHJcbn07XHJcblxyXG5cclxuLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbC5cclxuLy8gSW4gbm9kZS5qcywgdXNlIHByb2Nlc3MuaHJ0aW1lLlxyXG5pZiAodHlwZW9mIChzZWxmKSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIChwcm9jZXNzKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5ocnRpbWUpIHtcclxuXHRUV0VFTi5ub3cgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XHJcblxyXG5cdFx0Ly8gQ29udmVydCBbc2Vjb25kcywgbmFub3NlY29uZHNdIHRvIG1pbGxpc2Vjb25kcy5cclxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xyXG5cdH07XHJcbn1cclxuLy8gSW4gYSBicm93c2VyLCB1c2Ugc2VsZi5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG5lbHNlIGlmICh0eXBlb2YgKHNlbGYpICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gICAgICAgICBzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdCBzZWxmLnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0Ly8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXHJcblx0Ly8gbGVhZHMgdG8gYW4gaW52b2NhdGlvbiBleGNlcHRpb24gaW4gQ2hyb21lLlxyXG5cdFRXRUVOLm5vdyA9IHNlbGYucGVyZm9ybWFuY2Uubm93LmJpbmQoc2VsZi5wZXJmb3JtYW5jZSk7XHJcbn1cclxuLy8gVXNlIERhdGUubm93IGlmIGl0IGlzIGF2YWlsYWJsZS5cclxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG5cdFRXRUVOLm5vdyA9IERhdGUubm93O1xyXG59XHJcbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXHJcbmVsc2Uge1xyXG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHR9O1xyXG59XHJcblxyXG5cclxuVFdFRU4uVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0LCBncm91cCkge1xyXG5cdHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcblx0dGhpcy5fcGF1c2VTdGFydCA9IG51bGw7XHJcblx0dGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xyXG5cdHRoaXMuX3ZhbHVlc1N0YXJ0ID0ge307XHJcblx0dGhpcy5fdmFsdWVzRW5kID0ge307XHJcblx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQgPSB7fTtcclxuXHR0aGlzLl9kdXJhdGlvbiA9IDEwMDA7XHJcblx0dGhpcy5fcmVwZWF0ID0gMDtcclxuXHR0aGlzLl9yZXBlYXREZWxheVRpbWUgPSB1bmRlZmluZWQ7XHJcblx0dGhpcy5feW95byA9IGZhbHNlO1xyXG5cdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xyXG5cdHRoaXMuX3JldmVyc2VkID0gZmFsc2U7XHJcblx0dGhpcy5fZGVsYXlUaW1lID0gMDtcclxuXHR0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xyXG5cdHRoaXMuX2Vhc2luZ0Z1bmN0aW9uID0gVFdFRU4uRWFzaW5nLkxpbmVhci5Ob25lO1xyXG5cdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRXRUVOLkludGVycG9sYXRpb24uTGluZWFyO1xyXG5cdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBbXTtcclxuXHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBudWxsO1xyXG5cdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XHJcblx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XHJcblx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IG51bGw7XHJcblx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IG51bGw7XHJcblx0dGhpcy5fZ3JvdXAgPSBncm91cCB8fCBUV0VFTjtcclxuXHR0aGlzLl9pZCA9IFRXRUVOLm5leHRJZCgpO1xyXG5cclxufTtcclxuXHJcblRXRUVOLlR3ZWVuLnByb3RvdHlwZSA9IHtcclxuXHRnZXRJZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xyXG5cdH0sXHJcblxyXG5cdGlzUGxheWluZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzUGxheWluZztcclxuXHR9LFxyXG5cclxuXHRpc1BhdXNlZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzUGF1c2VkO1xyXG5cdH0sXHJcblxyXG5cdHRvOiBmdW5jdGlvbiAocHJvcGVydGllcywgZHVyYXRpb24pIHtcclxuXHJcblx0XHR0aGlzLl92YWx1ZXNFbmQgPSBPYmplY3QuY3JlYXRlKHByb3BlcnRpZXMpO1xyXG5cclxuXHRcdGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGR1cmF0aW9uOiBmdW5jdGlvbiBkdXJhdGlvbihkKSB7XHJcblx0XHR0aGlzLl9kdXJhdGlvbiA9IGQ7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzdGFydDogZnVuY3Rpb24gKHRpbWUpIHtcclxuXHJcblx0XHR0aGlzLl9ncm91cC5hZGQodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdHlwZW9mIHRpbWUgPT09ICdzdHJpbmcnID8gVFdFRU4ubm93KCkgKyBwYXJzZUZsb2F0KHRpbWUpIDogdGltZSA6IFRXRUVOLm5vdygpO1xyXG5cdFx0dGhpcy5fc3RhcnRUaW1lICs9IHRoaXMuX2RlbGF5VGltZTtcclxuXHJcblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIGFuIEFycmF5IHdhcyBwcm92aWRlZCBhcyBwcm9wZXJ0eSB2YWx1ZVxyXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcclxuXHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElmIGB0bygpYCBzcGVjaWZpZXMgYSBwcm9wZXJ0eSB0aGF0IGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3QsXHJcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxyXG5cdFx0XHRpZiAodGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNhdmUgdGhlIHN0YXJ0aW5nIHZhbHVlLCBidXQgb25seSBvbmNlLlxyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSkgPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fb2JqZWN0W3Byb3BlcnR5XTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldICo9IDEuMDsgLy8gRW5zdXJlcyB3ZSdyZSB1c2luZyBudW1iZXJzLCBub3Qgc3RyaW5nc1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2lzUGxheWluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5fb25TdG9wQ2FsbGJhY2sgIT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0ZW5kOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dGhpcy51cGRhdGUoSW5maW5pdHkpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHBhdXNlOiBmdW5jdGlvbih0aW1lKSB7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2lzUGF1c2VkIHx8ICF0aGlzLl9pc1BsYXlpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faXNQYXVzZWQgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX3BhdXNlU3RhcnQgPSB0aW1lID09PSB1bmRlZmluZWQgPyBUV0VFTi5ub3coKSA6IHRpbWU7XHJcblxyXG5cdFx0dGhpcy5fZ3JvdXAucmVtb3ZlKHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRyZXN1bWU6IGZ1bmN0aW9uKHRpbWUpIHtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2lzUGF1c2VkIHx8ICF0aGlzLl9pc1BsYXlpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9zdGFydFRpbWUgKz0gKHRpbWUgPT09IHVuZGVmaW5lZCA/IFRXRUVOLm5vdygpIDogdGltZSlcclxuXHRcdFx0LSB0aGlzLl9wYXVzZVN0YXJ0O1xyXG5cclxuXHRcdHRoaXMuX3BhdXNlU3RhcnQgPSAwO1xyXG5cclxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0c3RvcENoYWluZWRUd2VlbnM6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XHJcblx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRncm91cDogZnVuY3Rpb24gKGdyb3VwKSB7XHJcblx0XHR0aGlzLl9ncm91cCA9IGdyb3VwO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0ZGVsYXk6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuXHJcblx0XHR0aGlzLl9kZWxheVRpbWUgPSBhbW91bnQ7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0cmVwZWF0OiBmdW5jdGlvbiAodGltZXMpIHtcclxuXHJcblx0XHR0aGlzLl9yZXBlYXQgPSB0aW1lcztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRyZXBlYXREZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xyXG5cclxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHR5b3lvOiBmdW5jdGlvbiAoeW95bykge1xyXG5cclxuXHRcdHRoaXMuX3lveW8gPSB5b3lvO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGVhc2luZzogZnVuY3Rpb24gKGVhc2luZ0Z1bmN0aW9uKSB7XHJcblxyXG5cdFx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXNpbmdGdW5jdGlvbjtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiAoaW50ZXJwb2xhdGlvbkZ1bmN0aW9uKSB7XHJcblxyXG5cdFx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gaW50ZXJwb2xhdGlvbkZ1bmN0aW9uO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGNoYWluOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvblN0YXJ0OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvblVwZGF0ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uUmVwZWF0OiBmdW5jdGlvbiBvblJlcGVhdChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvblN0b3A6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uU3RvcENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0dXBkYXRlOiBmdW5jdGlvbiAodGltZSkge1xyXG5cclxuXHRcdHZhciBwcm9wZXJ0eTtcclxuXHRcdHZhciBlbGFwc2VkO1xyXG5cdFx0dmFyIHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9PT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsYXBzZWQgPSAodGltZSAtIHRoaXMuX3N0YXJ0VGltZSkgLyB0aGlzLl9kdXJhdGlvbjtcclxuXHRcdGVsYXBzZWQgPSAodGhpcy5fZHVyYXRpb24gPT09IDAgfHwgZWxhcHNlZCA+IDEpID8gMSA6IGVsYXBzZWQ7XHJcblxyXG5cdFx0dmFsdWUgPSB0aGlzLl9lYXNpbmdGdW5jdGlvbihlbGFwc2VkKTtcclxuXHJcblx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3RcclxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBzdGFydCA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xyXG5cdFx0XHR2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcclxuXHJcblx0XHRcdGlmIChlbmQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gUGFyc2VzIHJlbGF0aXZlIGVuZCB2YWx1ZXMgd2l0aCBzdGFydCBhcyBiYXNlIChlLmcuOiArMTAsIC0zKVxyXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGVuZC5jaGFyQXQoMCkgPT09ICcrJyB8fCBlbmQuY2hhckF0KDApID09PSAnLScpIHtcclxuXHRcdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlbmQgPSBwYXJzZUZsb2F0KGVuZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cclxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QsIGVsYXBzZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlbGFwc2VkID09PSAxKSB7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5fcmVwZWF0ID4gMCkge1xyXG5cclxuXHRcdFx0XHRpZiAoaXNGaW5pdGUodGhpcy5fcmVwZWF0KSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fcmVwZWF0LS07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xyXG5cdFx0XHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5feW95bykge1xyXG5cdFx0XHRcdFx0XHR2YXIgdG1wID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcclxuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IHRtcDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcclxuXHRcdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gIXRoaXMuX3JldmVyc2VkO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX3JlcGVhdERlbGF5VGltZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fcmVwZWF0RGVsYXlUaW1lO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fZGVsYXlUaW1lO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xyXG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcclxuXHRcdFx0XHRcdC8vIGV2ZW4gaWYgdGhlIGB1cGRhdGUoKWAgbWV0aG9kIHdhcyBjYWxsZWQgd2F5IHBhc3QgdGhlIGR1cmF0aW9uIG9mIHRoZSB0d2VlblxyXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9XHJcbn07XHJcblxyXG5cclxuVFdFRU4uRWFzaW5nID0ge1xyXG5cclxuXHRMaW5lYXI6IHtcclxuXHJcblx0XHROb25lOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGs7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRRdWFkcmF0aWM6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiBrICogaztcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiBrICogKDIgLSBrKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xyXG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIC0gMC41ICogKC0tayAqIChrIC0gMikgLSAxKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdEN1YmljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xyXG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0UXVhcnRpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGs7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtICgtLWsgKiBrICogayAqIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0UXVpbnRpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGsgKiBrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrICogayArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0U2ludXNvaWRhbDoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRFeHBvbmVudGlhbDoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0gMTAgKiBrKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xyXG5cdFx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoLSBNYXRoLnBvdygyLCAtIDEwICogKGsgLSAxKSkgKyAyKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdENpcmN1bGFyOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gayAqIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIE1hdGguc3FydCgxIC0gKC0tayAqIGspKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xyXG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0RWxhc3RpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIE1hdGgucG93KDIsIC0xMCAqIGspICogTWF0aC5zaW4oKGsgLSAwLjEpICogNSAqIE1hdGguUEkpICsgMTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ayAqPSAyO1xyXG5cclxuXHRcdFx0aWYgKGsgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0QmFjazoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0Qm91bmNlOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KDEgLSBrKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmIChrIDwgKDEgLyAyLjc1KSkge1xyXG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiBrICogaztcclxuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xyXG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMS41IC8gMi43NSkpICogayArIDAuNzU7XHJcblx0XHRcdH0gZWxzZSBpZiAoayA8ICgyLjUgLyAyLjc1KSkge1xyXG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjYyNSAvIDIuNzUpKSAqIGsgKyAwLjk4NDM3NTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA8IDAuNSkge1xyXG5cdFx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLkluKGsgKiAyKSAqIDAuNTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59O1xyXG5cclxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcclxuXHJcblx0TGluZWFyOiBmdW5jdGlvbiAodiwgaykge1xyXG5cclxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xyXG5cdFx0dmFyIGYgPSBtICogaztcclxuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcclxuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xyXG5cclxuXHRcdGlmIChrIDwgMCkge1xyXG5cdFx0XHRyZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGsgPiAxKSB7XHJcblx0XHRcdHJldHVybiBmbih2W21dLCB2W20gLSAxXSwgbSAtIGYpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmbih2W2ldLCB2W2kgKyAxID4gbSA/IG0gOiBpICsgMV0sIGYgLSBpKTtcclxuXHJcblx0fSxcclxuXHJcblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xyXG5cclxuXHRcdHZhciBiID0gMDtcclxuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xyXG5cdFx0dmFyIHB3ID0gTWF0aC5wb3c7XHJcblx0XHR2YXIgYm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkJlcm5zdGVpbjtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcclxuXHRcdFx0YiArPSBwdygxIC0gaywgbiAtIGkpICogcHcoaywgaSkgKiB2W2ldICogYm4obiwgaSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGI7XHJcblxyXG5cdH0sXHJcblxyXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgZiA9IG0gKiBrO1xyXG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG5cdFx0dmFyIGZuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5DYXRtdWxsUm9tO1xyXG5cclxuXHRcdGlmICh2WzBdID09PSB2W21dKSB7XHJcblxyXG5cdFx0XHRpZiAoayA8IDApIHtcclxuXHRcdFx0XHRpID0gTWF0aC5mbG9vcihmID0gbSAqICgxICsgaykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYgKGsgPCAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChrID4gMSkge1xyXG5cdFx0XHRcdHJldHVybiB2W21dIC0gKGZuKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0VXRpbHM6IHtcclxuXHJcblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcclxuXHJcblx0XHRcdHJldHVybiAocDEgLSBwMCkgKiB0ICsgcDA7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XHJcblxyXG5cdFx0XHR2YXIgZmMgPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkZhY3RvcmlhbDtcclxuXHJcblx0XHRcdHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0RmFjdG9yaWFsOiAoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0dmFyIGEgPSBbMV07XHJcblxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcclxuXHJcblx0XHRcdFx0dmFyIHMgPSAxO1xyXG5cclxuXHRcdFx0XHRpZiAoYVtuXSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFbbl07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gbjsgaSA+IDE7IGktLSkge1xyXG5cdFx0XHRcdFx0cyAqPSBpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0YVtuXSA9IHM7XHJcblx0XHRcdFx0cmV0dXJuIHM7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdH0pKCksXHJcblxyXG5cdFx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XHJcblxyXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XHJcblx0XHRcdHZhciB2MSA9IChwMyAtIHAxKSAqIDAuNTtcclxuXHRcdFx0dmFyIHQyID0gdCAqIHQ7XHJcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcclxuXHJcblx0XHRcdHJldHVybiAoMiAqIHAxIC0gMiAqIHAyICsgdjAgKyB2MSkgKiB0MyArICgtIDMgKiBwMSArIDMgKiBwMiAtIDIgKiB2MCAtIHYxKSAqIHQyICsgdjAgKiB0ICsgcDE7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59O1xyXG5cclxud2luZG93LlRXRUVOID0gVFdFRU5cclxuXHJcblxyXG5UaW55LlR3ZWVuTWFuYWdlciA9IGZ1bmN0aW9uKGdhbWUpXHJcbntcclxuXHR0aGlzLmdhbWUgPSBnYW1lO1xyXG5cdHRoaXMuYnVmZmVyTGlzdCA9IFtdO1xyXG59O1xyXG5cclxuVGlueS5Ud2Vlbk1hbmFnZXIucHJvdG90eXBlID0ge1xyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uKG9iaikge1xyXG5cdFx0cmV0dXJuIG5ldyBUV0VFTi5Ud2VlbihvYmopO1xyXG5cdH0sXHJcblxyXG5cdHBhdXNlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5idWZmZXJMaXN0Lmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGsgaW4gVFdFRU4uX3R3ZWVucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyTGlzdC5wdXNoKFRXRUVOLl90d2VlbnNba10pO1xyXG4gICAgICAgICAgICBUV0VFTi5fdHdlZW5zW2tdLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cdH0sXHJcblxyXG5cdHJlc3VtZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5idWZmZXJMaXN0LmZvckVhY2goZnVuY3Rpb24odHdlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0d2Vlbi5yZXN1bWUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmJ1ZmZlckxpc3QubGVuZ3RoID0gMDtcclxuICAgICAgICBcclxuXHR9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oZGVsdGEpIHtcclxuICAgICAgICBUV0VFTi51cGRhdGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcbiAgICBcdHRoaXMuYnVmZmVyTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgXHRUV0VFTi5yZW1vdmVBbGwoKTtcclxuICAgIH1cclxufVxyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcInR3ZWVuc1wiLCBUaW55LlR3ZWVuTWFuYWdlcik7IiwiXHJcblRpbnkuUmVuZGVyVGV4dHVyZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIHJlbmRlcmVyLCByZXNvbHV0aW9uKVxyXG57XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgMTAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgMTAwO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgcmVzb2x1dGlvbiA9IHJlc29sdXRpb24gfHwgMTtcclxuXHJcbiAgICAvLyB0aGlzLmZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICAvLyB0aGlzLmNyb3AgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUgPSBuZXcgVGlueS5CYXNlVGV4dHVyZSgpO1xyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZS53aWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB0aGlzLmJhc2VUZXh0dXJlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdGhpcy5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIC8vIHRoaXMuYmFzZVRleHR1cmUuaGFzTG9hZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMudGV4dHVyZUJ1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcih0aGlzLndpZHRoICogcmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBUaW55LlRleHR1cmUuY2FsbCh0aGlzLFxyXG4gICAgICAgIHRoaXMudGV4dHVyZUJ1ZmZlci5jYW52YXMsXHJcbiAgICAgICAgbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHJlc29sdXRpb24pLCBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogcmVzb2x1dGlvbikpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XHJcblxyXG4gICAgLy8gdGhpcy5oYXNMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlciB8fCBUaW55LmRlZmF1bHRSZW5kZXJlcjtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuVGV4dHVyZS5wcm90b3R5cGUpO1xyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5SZW5kZXJUZXh0dXJlO1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCB1cGRhdGVCYXNlKVxyXG57XHJcbiAgICBpZiAod2lkdGggPT09IHRoaXMud2lkdGggJiYgaGVpZ2h0ID09PSB0aGlzLmhlaWdodClyZXR1cm47XHJcblxyXG4gICAgdGhpcy52YWxpZCA9ICh3aWR0aCA+IDAgJiYgaGVpZ2h0ID4gMCk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLmZyYW1lLndpZHRoID0gdGhpcy5jcm9wLndpZHRoID0gd2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICB0aGlzLmZyYW1lLmhlaWdodCA9IHRoaXMuY3JvcC5oZWlnaHQgPSBoZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgaWYgKHVwZGF0ZUJhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy5iYXNlVGV4dHVyZS53aWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAgICAgLy8gdGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBpZighdGhpcy52YWxpZClyZXR1cm47XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyLnJlc2l6ZSh0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZighdGhpcy52YWxpZClyZXR1cm47XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyLmNsZWFyKCk7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGRpc3BsYXlPYmplY3QsIG1hdHJpeCwgY2xlYXIpXHJcbntcclxuICAgIGlmKCF0aGlzLnZhbGlkKXJldHVybjtcclxuXHJcbiAgICB2YXIgd3QgPSBkaXNwbGF5T2JqZWN0LndvcmxkVHJhbnNmb3JtO1xyXG4gICAgd3QuaWRlbnRpdHkoKTtcclxuICAgIGlmKG1hdHJpeCl3dC5hcHBlbmQobWF0cml4KTtcclxuICAgIFxyXG4gICAgLy8gc2V0V29ybGQgQWxwaGEgdG8gZW5zdXJlIHRoYXQgdGhlIG9iamVjdCBpcyByZW5kZXJlciBhdCBmdWxsIG9wYWNpdHlcclxuICAgIGRpc3BsYXlPYmplY3Qud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgLy8gVGltZSB0byB1cGRhdGUgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgZGlzcGxheU9iamVjdCB3aXRoIHRoZSBuZXcgbWF0cml4Li4gICAgXHJcbiAgICB2YXIgY2hpbGRyZW4gPSBkaXNwbGF5T2JqZWN0LmNoaWxkcmVuO1xyXG5cclxuICAgIGZvcih2YXIgaSA9IDAsIGogPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoY2xlYXIpdGhpcy50ZXh0dXJlQnVmZmVyLmNsZWFyKCk7XHJcblxyXG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLnRleHR1cmVCdWZmZXIuY29udGV4dDtcclxuXHJcbiAgICB2YXIgcmVhbFJlc29sdXRpb24gPSB0aGlzLnJlbmRlcmVyLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyT2JqZWN0KGRpc3BsYXlPYmplY3QsIGNvbnRleHQpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbiA9IHJlYWxSZXNvbHV0aW9uO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5nZXRJbWFnZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWFnZS5zcmMgPSB0aGlzLmdldEJhc2U2NCgpO1xyXG4gICAgcmV0dXJuIGltYWdlO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5nZXRCYXNlNjQgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmdldENhbnZhcygpLnRvRGF0YVVSTCgpO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5nZXRDYW52YXMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnRleHR1cmVCdWZmZXIuY2FudmFzO1xyXG59OyIsIlxyXG4vLyBUaW55LlRleHR1cmVDYWNoZSA9IHt9O1xyXG4vLyBUaW55LkZyYW1lQ2FjaGUgPSB7fTtcclxuVGlueS5UZXh0dXJlQ2FjaGVJZEdlbmVyYXRvciA9IDA7XHJcblRpbnkuVGV4dHVyZVNpbGVudEZhaWwgPSBmYWxzZTtcclxuXHJcblRpbnkuVGV4dHVyZSA9IGZ1bmN0aW9uKHNvdXJjZSwgZnJhbWUsIGNyb3AsIHRyaW0pXHJcbntcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgdGhpcy5ub0ZyYW1lID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gMTtcclxuXHJcbiAgICB0aGlzLmhhc0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghZnJhbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ub0ZyYW1lID0gdHJ1ZTtcclxuICAgICAgICBmcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLDAsMSwxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PSBcInN0cmluZ1wiKSBcclxuICAgIHtcclxuICAgICAgICB2YXIga2V5ID0gc291cmNlO1xyXG5cclxuICAgICAgICBzb3VyY2UgPSBUaW55LkNhY2hlLmltYWdlW2tleV07XHJcblxyXG4gICAgICAgIGlmICghc291cmNlKSB0aHJvdyBuZXcgRXJyb3IoJ0NhY2hlIEVycm9yOiBpbWFnZSAnICsga2V5ICsgJyBkb2VzYHQgZm91bmQgaW4gY2FjaGUnKTtcclxuXHJcbiAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW2tleV0gPSB0aGlzO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcblxyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lO1xyXG5cclxuICAgIHRoaXMudHJpbSA9IHRyaW07XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuXHJcbiAgICB0aGlzLmNyb3AgPSBjcm9wIHx8IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICBpZigodGhpcy5zb3VyY2UuY29tcGxldGUgfHwgdGhpcy5zb3VyY2UuZ2V0Q29udGV4dCkgJiYgdGhpcy5zb3VyY2Uud2lkdGggJiYgdGhpcy5zb3VyY2UuaGVpZ2h0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25Tb3VyY2VMb2FkZWQoKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc291cmNlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzY29wZS5vblNvdXJjZUxvYWRlZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UZXh0dXJlO1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5vblNvdXJjZUxvYWRlZCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5oYXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgdGhpcy53aWR0aCA9IHRoaXMuc291cmNlLm5hdHVyYWxXaWR0aCB8fCB0aGlzLnNvdXJjZS53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zb3VyY2UubmF0dXJhbEhlaWdodCB8fCB0aGlzLnNvdXJjZS5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMubm9GcmFtZSkgdGhpcy5mcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5zZXRGcmFtZSh0aGlzLmZyYW1lKTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuYWRkVG9DYWNoZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgVGlueS5DYWNoZS50ZXh0dXJlW2tleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICh0aGlzLmtleSkge1xyXG4gICAgICAgIGRlbGV0ZSBUaW55LkNhY2hlLnRleHR1cmVbdGhpcy5rZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc291cmNlID0gbnVsbDtcclxuICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuc2V0RnJhbWUgPSBmdW5jdGlvbihmcmFtZSlcclxue1xyXG4gICAgdGhpcy5ub0ZyYW1lID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSBmcmFtZSAmJiBmcmFtZS53aWR0aCAmJiBmcmFtZS5oZWlnaHQgJiYgdGhpcy5zb3VyY2UgJiYgdGhpcy5oYXNMb2FkZWQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLnZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgLy8gdGhpcy53aWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgLy8gdGhpcy5oZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5jcm9wLnggPSBmcmFtZS54O1xyXG4gICAgdGhpcy5jcm9wLnkgPSBmcmFtZS55O1xyXG4gICAgdGhpcy5jcm9wLndpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICB0aGlzLmNyb3AuaGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgIGlmICghdGhpcy50cmltICYmIChmcmFtZS54ICsgZnJhbWUud2lkdGggPiB0aGlzLndpZHRoIHx8IGZyYW1lLnkgKyBmcmFtZS5oZWlnaHQgPiB0aGlzLmhlaWdodCkpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFUaW55LlRleHR1cmVTaWxlbnRGYWlsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXh0dXJlIEVycm9yOiBmcmFtZSBkb2VzIG5vdCBmaXQgaW5zaWRlIHRoZSBiYXNlIFRleHR1cmUgZGltZW5zaW9ucyAnICsgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRyaW0pXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy53aWR0aCA9IHRoaXMudHJpbS53aWR0aDtcclxuICAgICAgICAvLyB0aGlzLmhlaWdodCA9IHRoaXMudHJpbS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5mcmFtZS53aWR0aCA9IHRoaXMudHJpbS53aWR0aDtcclxuICAgICAgICB0aGlzLmZyYW1lLmhlaWdodCA9IHRoaXMudHJpbS5oZWlnaHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuZnJvbUltYWdlID0gZnVuY3Rpb24oa2V5LCBpbWFnZVVybCwgY3Jvc3NvcmlnaW4pXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVba2V5XTtcclxuXHJcbi8vICAgICBpZighdGV4dHVyZSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShUaW55LkJhc2VUZXh0dXJlLmZyb21JbWFnZShrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbikpO1xyXG4vLyAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5XHJcbi8vICAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVba2V5XSA9IHRleHR1cmU7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuZnJvbUZyYW1lID0gZnVuY3Rpb24oZnJhbWVJZClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtmcmFtZUlkXTtcclxuLy8gICAgIGlmKCF0ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmcmFtZUlkIFwiJyArIGZyYW1lSWQgKyAnXCIgZG9lcyBub3QgZXhpc3QgaW4gdGhlIHRleHR1cmUgY2FjaGUgJyk7XHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcblRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzID0gZnVuY3Rpb24oY2FudmFzKVxyXG57XHJcbiAgICAvLyBpZighY2FudmFzLl90aW55SWQpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgY2FudmFzLl90aW55SWQgPSAnX2Zyb21fY2FudmFzXycgKyBUaW55LlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yKys7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdmFyIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbY2FudmFzLl90aW55SWRdO1xyXG5cclxuICAgIC8vIGlmKCF0ZXh0dXJlKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKCBjYW52YXMgKTtcclxuICAgIC8vICAgICBUaW55LkNhY2hlLnRleHR1cmVbY2FudmFzLl90aW55SWRdID0gdGV4dHVyZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyByZXR1cm4gdGV4dHVyZTtcclxuICAgIHJldHVybiBuZXcgVGlueS5UZXh0dXJlKCBjYW52YXMgKTtcclxufTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5hZGRUZXh0dXJlVG9DYWNoZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGlkKVxyXG4vLyB7XHJcbi8vICAgICBUaW55LlRleHR1cmVDYWNoZVtpZF0gPSB0ZXh0dXJlO1xyXG4vLyB9O1xyXG5cclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5yZW1vdmVUZXh0dXJlRnJvbUNhY2hlID0gZnVuY3Rpb24oaWQpXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgZGVsZXRlIFRpbnkuVGV4dHVyZUNhY2hlW2lkXTtcclxuLy8gICAgIGRlbGV0ZSBUaW55LkJhc2VUZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07IiwiVGlueS5DYW52YXNCdWZmZXIgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKVxyXG57XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzQnVmZmVyO1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59OyIsIlxyXG5mdW5jdGlvbiBFdmVudExpc3RlbmVycygpIFxyXG57XHJcbiAgICB0aGlzLmEgPSBbXTtcclxuICAgIHRoaXMubiA9IDA7XHJcbn1cclxuXHJcblRpbnkuRXZlbnRFbWl0dGVyID0ge1xyXG5cclxuICAgIGNhbGw6IGZ1bmN0aW9uKG9iaikgXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKG9iaikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYmogPSBvYmoucHJvdG90eXBlIHx8IG9iajtcclxuICAgICAgICAgICAgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4ob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluOiBmdW5jdGlvbihvYmopIFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyc19ldmVudHMgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHVzaExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XVxyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdID0gbmV3IEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5hLnB1c2goZm4sIGNvbnRleHQgfHwgbnVsbCwgb25jZSB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5uICs9IDM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmoub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbiwgY29udGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1c2hMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2JqLm9uID0gcHVzaExpc3RlbmVyO1xyXG5cclxuICAgICAgICBvYmoub2ZmID0gZnVuY3Rpb24oZXZlbnQsIGZuLCBjb250ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdXHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZuQXJyYXkgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XS5hO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmbikgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZuQXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghY29udGV4dCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGg7IGkgKz0gMylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpXSA9PSBmbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGg7IGkgKz0gMylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpXSA9PSBmbiAmJiBmbkFycmF5W2kgKyAxXSA9PSBjb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbkFycmF5Lmxlbmd0aCA9PSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmouZW1pdCA9IGZ1bmN0aW9uKGV2ZW50LCBhMSwgYTIsIGEzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbkFycmF5ID0gbGlzdGVuZXJzLmE7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5uID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aCAtIGxpc3RlbmVycy5uOyBpICs9IDMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gMSlcclxuICAgICAgICAgICAgICAgICAgICBmbkFycmF5W2ldLmNhbGwoZm5BcnJheVtpICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGVuID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgZm5BcnJheVtpXS5jYWxsKGZuQXJyYXlbaSArIDFdLCBhMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZW4gPT0gMylcclxuICAgICAgICAgICAgICAgICAgICBmbkFycmF5W2ldLmNhbGwoZm5BcnJheVtpICsgMV0sIGExLCBhMik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZm5BcnJheVtpXS5jYWxsKGZuQXJyYXlbaSArIDFdLCBhMSwgYTIsIGEzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpICsgMl0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZm5BcnJheS5sZW5ndGggPT0gMCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsiLCJpZiAoIURhdGUubm93KSB7XHJcbiAgRGF0ZS5ub3cgPSBmdW5jdGlvbiBub3coKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKHR5cGVvZihGbG9hdDMyQXJyYXkpID09ICd1bmRlZmluZWQnKVxyXG57XHJcblx0d2luZG93LkZsb2F0MzJBcnJheSA9IEFycmF5XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9