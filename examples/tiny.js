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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
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

/***/ "../src/Tiny.js":
/*!**********************!*\
  !*** ../src/Tiny.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var Tiny = function(width, height, parentNode, enableRAF, states)
{
    parentNode = parentNode ? document.getElementById(parentNode) : document.body;
    this._preboot(width, height, enableRAF, states);

    this.renderer = new Tiny.CanvasRenderer(this.width, this.height,
    {
        autoResize: true
    });

    var view = this.canvas = this.inputView = this.renderer.view;

    parentNode.appendChild(view);
    view.style.position = 'absolute';

    view.style.top = "0px";
    view.style.left = "0px";

    view.style.transformOrigin = '0% 0%';
    view.style.perspective = '1000px';

    this._boot();
}

Tiny.prototype._preload = function()
{
    this.preload.call(this.callbackContext);
    this.state = 1;

    if (Tiny.Loader) 
    {
        this.load.start(this._create);
    }
    else 
    {
        this._create();
    }
};

Tiny.prototype.setPixelRatio = function(dpr)
{
    this.renderer.resolution = dpr;
};

Tiny.prototype._render = function()
{
    this.renderer.render(this.stage);
};

Tiny.prototype.resize = function(width, height, scale)
{
    this._resize(width, height, scale);
};

Tiny.prototype.destroy = function()
{
    this._destroy();
};

module.exports = Tiny;

/***/ }),

/***/ "../src/TinyCommon.js":
/*!****************************!*\
  !*** ../src/TinyCommon.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


var _tween_enabled = false;

var noop = function() {};

var COMMON = {

    _preboot: function(width, height, enableRAF, states)
    {
        this.height = height || 720;
        this.width = width || 430;

        this.callbackContext = this;
        states = states || {};
        this.state = 0;
        this.preload = this.preload || states.preload || noop;
        this.create = this.create || states.create || noop;
        this.update = this.update || states.update || noop;
        this._resize_cb = this._resize_cb || states.resize || noop;
        this._destroy_cb = this._destroy_cb || states.destroy || noop;

        this.stage = new Tiny.Stage(this);


        if (typeof window.TWEEN == "object") 
        {
            _tween_enabled = true;
        }

        this._raf = enableRAF && Tiny.RAF;


        this.time = {
            timeToCall: 15
        }

        this.paused = false;
        this.pauseDuration = 0;
        this.tweens = [];
    },

    _boot: function()
    {
        if (Tiny.Loader) 
        {
            this.load = new Tiny.Loader(this)
        }

        if (Tiny.ObjectCreator) 
        {
            this.add = new Tiny.ObjectCreator(this)
        }

        if (Tiny.Input) 
        {
            this.input = new Tiny.Input(this)
        }

        if (Tiny.TimerCreator) 
        {
            this.timer = new Tiny.TimerCreator(this)
        }

        if (Tiny.Particles) 
        {
            this.particles = new Tiny.Particles(this)
        }

        if (this._raf) 
        {
            this.raf = new Tiny.RAF(this);
        }

        Tiny.defaultRenderer = this.renderer
        var self = this
        setTimeout(function()
        {
            self._preload()
        }, 0)
    },

    _resize: function(width, height, scale)
    {
        this.width = width || this.width;
        this.height = height || this.height;

        this.renderer.resize(this.width, this.height);

        if (this.state > 0) 
        {
            this._resize_cb.call(this.callbackContext, this.width, this.height, scale);
        }
    },

    _create: function()
    {
        this.create.call(this.callbackContext);

        if (this._raf) 
        {
            this.raf.start();
        }

        this.state = 2;
    },

    pause: function()
    {
        if (!this.paused)
        {
            if (_tween_enabled)
            {
                this.tweens.length = 0;

                for (var k in TWEEN._tweens)
                {
                    this.tweens.push(TWEEN._tweens[k]);
                    TWEEN._tweens[k].pause();
                }
            }

            this.paused = true;
        }
    },


    resume: function()
    {
        if (this.paused)
        {
            if (_tween_enabled)
            {
                this.tweens.forEach(function(tween)
                {
                    tween.resume();
                })

                this.tweens.length = 0;
            }

            this.paused = false;
        }
    },

    _update: function(time, delta)
    {
        if (!this.paused)
        {
            this.update.call(this.callbackContext, time, delta);

            if (_tween_enabled) 
            {
                TWEEN.update();
            }

            if (this.timers) 
            {
                this.timers.forEach(function(e)
                {
                    e.update(delta);
                })
            }

            this.stage.updateTransform();

            if (this.particles)
            {
                this.particles.update(delta);
            }
        }
        else
        {
            this.pauseDuration += delta
            this.stage.updateTransform();
        }

        this._render();
    },

    _destroy: function()
    {
        if (Tiny.Input) 
        {
            this.input.destroy();
        }

        if (_tween_enabled) 
        {
            TWEEN.removeAll();
        }

        if (this.timers) 
        {
            this.timer.removeAll();
        }

        this.paused = true;
        this.stage.destroy();

        for (var y in Tiny.TextureCache) Tiny.TextureCache[y].destroy(true);

        for (var y in Tiny.BaseTextureCache) Tiny.BaseTextureCache[y].destroy();

        Tiny.BaseTextureCache = [];
        Tiny.TextureCache = [];
        this.stage.children = [];
        this.update();
        this.renderer.destroy(true);

        if (this._raf) 
        {
            this.raf.stop();
        }

        this._destroy_cb.call(this.callbackContext);
    }

}

COMMON.stop = COMMON.pause;
COMMON.play = COMMON.resume;
COMMON.setSize = COMMON.resize;

for (var key in COMMON) 
{
    Tiny.prototype[key] = COMMON[key];
}

/***/ }),

/***/ "../src/display/DisplayObject.js":
/*!***************************************!*\
  !*** ../src/display/DisplayObject.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var pi2 = Math.PI * 2;

Tiny.DisplayObject = function()
{
    this.position = new Tiny.Point(0, 0);
    this.scale = new Tiny.Point(1, 1);
    this.pivot = new Tiny.Point(0, 0);
    this.rotation = 0;
    this.alpha = 1;
    this.visible = true;
    this.hitArea = null;
    this.renderable = false;
    this.parent = null;
    this.stage = null;
    this.worldAlpha = 1;
    this.worldTransform = new Tiny.Matrix();
    this._sr = 0;
    this._cr = 1;
    this._bounds = new Tiny.Rectangle(0, 0, 1, 1);
    this._currentBounds = null;
    this._mask = null;
    this._cacheAsBitmap = false;
    this._cacheIsDirty = false;
    this.input = null
};

Object.defineProperty(Tiny.DisplayObject.prototype, 'inputEnabled', {

    get: function() {
        return (this.input && this.input.enabled)
    },

    set: function(value) {
        if (value) {
            if (this.input === null) {
                this.input = {enabled: true, parent: this}
                Tiny.EventTarget.mixin(this.input)
            } else 
                this.input.enabled = true
        } else {
            this.input !== null && (this.input.enabled = false)
        }
    }

});

Tiny.DisplayObject.prototype.constructor = Tiny.DisplayObject;


Tiny.DisplayObject.prototype.destroy = function()
{
    if (this.children)
    {
        var i = this.children.length;

        while (i--)
        {
            this.children[i].destroy();
        }

        this.children = [];
    }

    if (this.parent)
        this.parent.removeChild( this )

    this.hitArea = null;
    this.parent = null;
    this.stage = null;
    this.worldTransform = null;
    this._bounds = null;
    this._currentBounds = null;
    this._mask = null;

    this.renderable = false;
    this._destroyCachedSprite();
};

Object.defineProperty(Tiny.DisplayObject.prototype, 'worldVisible', {

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

Object.defineProperty(Tiny.DisplayObject.prototype, 'mask', {

    get: function() {
        return this._mask;
    },

    set: function(value) {

        if (this._mask) this._mask.isMask = false;

        this._mask = value;

        if (this._mask) this._mask.isMask = true;
    }

});

Object.defineProperty(Tiny.DisplayObject.prototype, 'cacheAsBitmap', {

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

Tiny.DisplayObject.prototype.updateTransform = function()
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
Tiny.DisplayObject.prototype.displayObjectUpdateTransform = Tiny.DisplayObject.prototype.updateTransform;

Tiny.DisplayObject.prototype.getBounds = function(matrix)
{
    matrix = matrix;//just to get passed js hinting (and preserve inheritance)
    return Tiny.EmptyRectangle;
};

Tiny.DisplayObject.prototype.getLocalBounds = function()
{
    return this.getBounds(Tiny.identityMatrix);
};

Tiny.DisplayObject.prototype.setStageReference = function(stage)
{
    this.stage = stage;
};

Tiny.DisplayObject.prototype.preUpdate = function()
{
};

Tiny.DisplayObject.prototype.generateTexture = function(resolution, renderer)
{
    var bounds = this.getLocalBounds();

    var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0, renderer, resolution);
    
    Tiny.DisplayObject._tempMatrix.tx = -bounds.x;
    Tiny.DisplayObject._tempMatrix.ty = -bounds.y;
    
    renderTexture.render(this, Tiny.DisplayObject._tempMatrix);

    return renderTexture;
};

Tiny.DisplayObject.prototype.updateCache = function()
{
    this._generateCachedSprite();
};


Tiny.DisplayObject.prototype.toGlobal = function(position)
{
    // don't need to u[date the lot
    this.displayObjectUpdateTransform();
    return this.worldTransform.apply(position);
};

Tiny.DisplayObject.prototype.toLocal = function(position, from)
{
    if (from)
    {
        position = from.toGlobal(position);
    }

    // don't need to u[date the lot
    this.displayObjectUpdateTransform();

    return this.worldTransform.applyInverse(position);
};

Tiny.DisplayObject.prototype._renderCachedSprite = function(renderSession)
{
    this._cachedSprite.worldAlpha = this.worldAlpha;

    Tiny.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);
    
};

Tiny.DisplayObject.prototype._generateCachedSprite = function()
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


    Tiny.DisplayObject._tempMatrix.tx = -bounds.x;
    Tiny.DisplayObject._tempMatrix.ty = -bounds.y;
    
    this._cachedSprite.texture.render(this, Tiny.DisplayObject._tempMatrix, true);

    this._cachedSprite.anchor.x = -( bounds.x / bounds.width );
    this._cachedSprite.anchor.y = -( bounds.y / bounds.height );

    this._cacheAsBitmap = true;
};

Tiny.DisplayObject.prototype._destroyCachedSprite = function()
{
    if (!this._cachedSprite) return;

    this._cachedSprite.texture.destroy(true);

    this._cachedSprite = null;
};


Tiny.DisplayObject.prototype._renderCanvas = function(renderSession)
{
    
};

Object.defineProperty(Tiny.DisplayObject.prototype, 'x', {

    get: function() {
        return  this.position.x;
    },

    set: function(value) {
        this.position.x = value;
    }

});

Object.defineProperty(Tiny.DisplayObject.prototype, 'y', {

    get: function() {
        return  this.position.y;
    },

    set: function(value) {
        this.position.y = value;
    }

});

Tiny.DisplayObject._tempMatrix = new Tiny.Matrix();

/***/ }),

/***/ "../src/display/DisplayObjectContainer.js":
/*!************************************************!*\
  !*** ../src/display/DisplayObjectContainer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.DisplayObjectContainer = function()
{
    Tiny.DisplayObject.call(this);

    this.children = [];
    
};

Tiny.DisplayObjectContainer.prototype = Object.create( Tiny.DisplayObject.prototype );
Tiny.DisplayObjectContainer.prototype.constructor = Tiny.DisplayObjectContainer;

Object.defineProperty(Tiny.DisplayObjectContainer.prototype, 'width', {

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

Object.defineProperty(Tiny.DisplayObjectContainer.prototype, 'height', {

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

Tiny.DisplayObjectContainer.prototype.addChild = function(child)
{
    return this.addChildAt(child, this.children.length);
};

Tiny.DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
    if(index >= 0 && index <= this.children.length)
    {
        if(child.parent)
        {
            child.parent.removeChild(child);
        }

        child.parent = this;

        child.game = this.game;

        this.children.splice(index, 0, child);

        if(this.stage)child.setStageReference(this.stage);

        return child;
    }
    else
    {
        throw new Error(child + 'addChildAt: The index '+ index +' supplied is out of bounds ' + this.children.length);
    }
};

Tiny.DisplayObjectContainer.prototype.swapChildren = function(child, child2)
{
    if(child === child2) {
        return;
    }

    var index1 = this.getChildIndex(child);
    var index2 = this.getChildIndex(child2);

    if(index1 < 0 || index2 < 0) {
        throw new Error('swapChildren: Both the supplied DisplayObjects must be a child of the caller.');
    }

    this.children[index1] = child2;
    this.children[index2] = child;

};

Tiny.DisplayObjectContainer.prototype.getChildIndex = function(child)
{
    var index = this.children.indexOf(child);
    if (index === -1)
    {
        throw new Error('The supplied DisplayObject must be a child of the caller');
    }
    return index;
};

Tiny.DisplayObjectContainer.prototype.setChildIndex = function(child, index)
{
    if (index < 0 || index >= this.children.length)
    {
        throw new Error('The supplied index is out of bounds');
    }
    var currentIndex = this.getChildIndex(child);
    this.children.splice(currentIndex, 1); //remove from old position
    this.children.splice(index, 0, child); //add at new position
};

Tiny.DisplayObjectContainer.prototype.getChildAt = function(index)
{
    if (index < 0 || index >= this.children.length)
    {
        throw new Error('getChildAt: Supplied index '+ index +' does not exist in the child list, or the supplied DisplayObject must be a child of the caller');
    }
    return this.children[index];
    
};

Tiny.DisplayObjectContainer.prototype.removeChild = function(child)
{
    var index = this.children.indexOf( child );
    if(index === -1)return;
    
    return this.removeChildAt( index );
};

Tiny.DisplayObjectContainer.prototype.removeChildAt = function(index)
{
    var child = this.getChildAt( index );
    if(this.stage)
        child.removeStageReference();

    child.parent = undefined;
    this.children.splice( index, 1 );
    return child;
};

Tiny.DisplayObjectContainer.prototype.removeChildren = function(beginIndex, endIndex)
{
    var begin = beginIndex || 0;
    var end = typeof endIndex === 'number' ? endIndex : this.children.length;
    var range = end - begin;

    if (range > 0 && range <= end)
    {
        var removed = this.children.splice(begin, range);
        for (var i = 0; i < removed.length; i++) {
            var child = removed[i];
            if(this.stage)
                child.removeStageReference();
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

Tiny.DisplayObjectContainer.prototype.updateTransform = function()
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
Tiny.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform = Tiny.DisplayObjectContainer.prototype.updateTransform;

Tiny.DisplayObjectContainer.prototype.getBounds = function()
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

Tiny.DisplayObjectContainer.prototype.getLocalBounds = function()
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

Tiny.DisplayObjectContainer.prototype.setStageReference = function(stage)
{
    this.stage = stage;
    
    for (var i=0; i < this.children.length; i++)
    {
        this.children[i].setStageReference(stage)
    }
};

Tiny.DisplayObjectContainer.prototype.removeStageReference = function()
{
    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].removeStageReference();
    }

    this.stage = null;
};

Tiny.DisplayObjectContainer.prototype._renderCanvas = function(renderSession)
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
        this.children[i]._renderCanvas(renderSession);
    }

    if (this._mask)
    {
        renderSession.maskManager.popMask(renderSession);
    }
};

/***/ }),

/***/ "../src/display/Stage.js":
/*!*******************************!*\
  !*** ../src/display/Stage.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

Tiny.Stage = function(game)
{
    Tiny.DisplayObjectContainer.call( this );
    this.worldTransform = new Tiny.Matrix();
    this.game = game
    this.stage = this;

    this.setBackgroundColor(0xffffff)
};

Tiny.Stage.prototype = Object.create( Tiny.DisplayObjectContainer.prototype );
Tiny.Stage.prototype.constructor = Tiny.Stage;

Tiny.Stage.prototype.updateTransform = function()
{
    this.worldAlpha = 1;

    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].updateTransform();
    }
};


Tiny.Stage.prototype.setBackgroundColor = function(backgroundColor)
{
    this.backgroundColor = backgroundColor || 0x000000;
    this.backgroundColorSplit = Tiny.hex2rgb(this.backgroundColor);
    var hex = this.backgroundColor.toString(16);
    hex = '000000'.substr(0, 6 - hex.length) + hex;
    this.backgroundColorString = '#' + hex;
};

/***/ }),

/***/ "../src/global.js":
/*!************************!*\
  !*** ../src/global.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.VERSION = "1.4.4";
Tiny._UID = 0;

Tiny.Polygon = function() {}

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

Tiny.hex2rgb = function(hex) {
    return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
};

Tiny.rgb2hex = function(rgb) {
    return ((rgb[0]*255 << 16) + (rgb[1]*255 << 8) + rgb[2]*255);
};

Tiny.getNextPowerOfTwo = function(number)
{
    if (number > 0 && (number & (number - 1)) === 0)
        return number;
    else
    {
        var result = 1;
        while (result < number) result <<= 1;
        return result;
    }
};

Tiny.isPowerOfTwo = function(width, height)
{
    return (width > 0 && (width & (width - 1)) === 0 && height > 0 && (height & (height - 1)) === 0);
};


/***/ }),

/***/ "../src/managers/Input.js":
/*!********************************!*\
  !*** ../src/managers/Input.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var lastMove, _active_objects, listeningToTouchEvents, _last_bounds;
var game, currentEmiter;

function windowToUISpace(x, y, history)
{
    var bounds = ((history && _last_bounds) ? _last_bounds : (_last_bounds = game.inputView.getBoundingClientRect(), _last_bounds));

    return {
        x: (x - bounds.left),
        y: (y - bounds.top),
    };
}

function _getCoords(event, history)
{
    var coords = null;

    if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent)
    {
        listeningToTouchEvents = true;

        if (event.touches.length > 0)
        {
            coords = {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY
            };
        }
        else if (event.pageX && event.pageY)
        {
            coords = {
                x: event.pageX,
                y: event.pageY
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
            x: event.pageX,
            y: event.pageY
        };
    }

    if (listeningToTouchEvents && event instanceof MouseEvent || coords === null) return null;

    coords = windowToUISpace(coords.x, coords.y, history);

    return coords;
}

function _checkOnActiveObjects(obj, x, y)
{
    if (obj.inputEnabled && obj.worldVisible)
    {
        if (obj.getBounds().contains(x, y)) 
        {
            _active_objects.push(obj);
        }
    }

    if (obj.children && obj.children.length > 0)
    {
        for (var t = 0; t < obj.children.length; t++) 
        {
            _checkOnActiveObjects(obj.children[t], x, y);
        }
    }
}

function inputHandler(name, event, history)
{
    // console.log(name)
    var coords = _getCoords(event, history);

    if (coords !== null)
    {
        if (name != "move")
        {
            _active_objects.length = 0;

            _checkOnActiveObjects(game.stage, coords.x, coords.y)

            //var i = _active_objects.length

            for (var i = _active_objects.length - 1; i >= 0; i--)
            {
                var obj = _active_objects[i]
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
            //     var obj = _active_objects[i - 1]
            //     obj.input["last_" + name] = {x: coords.x, y: coords.y}

            //     obj.input.emit(name, {x: coords.x, y: coords.y})

            //     if (name == "up") {
            //         var point = obj.input["last_down"]
            //         if (point && Tiny.Math.distance(point.x, point.y, coords.x, coords.y) < 30)
            //             obj.input.emit("click", {x: coords.x, y: coords.y})
            //     }
            // }
        }

        currentEmiter.emit(name,
        {
            x: coords.x,
            y: coords.y
        });
    }
}

function moveHandler(event)
{
    lastMove = event;
    inputHandler("move", event, true);
}

function upHandler(event)
{
    currentEmiter.isDown = false;
    inputHandler("up", lastMove, true);
}

function downHandler(event)
{
    currentEmiter.isDown = true;
    lastMove = event;
    inputHandler("down", event, false);
}

function clickHandler(event)
{
    inputHandler("click", event, false);
}

Tiny.Input = function(parent)
{
    game = game = parent;
    _active_objects = [];
    currentEmiter = this;

    lastMove = null;
    this.isDown = false;

    var t = game.inputView.addEventListener;
    t('touchstart', downHandler);
    t('touchmove', moveHandler);
    t('touchend', upHandler);
    t('touchcancel', upHandler);

    // t('click', clickHandler);

    t('mousedown', downHandler);
    t('mousemove', moveHandler);
    t('mouseup', upHandler);

    Tiny.EventTarget.mixin(this)
};

Tiny.Input.prototype = {
    destroy: function()
    {
        var t = game.inputView.removeEventListener;
        t('touchstart', downHandler);
        t('touchmove', moveHandler);
        t('touchend', upHandler);
        t('touchcancel', upHandler);

        // t('click', clickHandler);

        t('mousedown', downHandler);
        t('mousemove', moveHandler);
        t('mouseup', upHandler);
    }
};

/***/ }),

/***/ "../src/managers/Loader.js":
/*!*********************************!*\
  !*** ../src/managers/Loader.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

Tiny.Loader = function(game)
{
    this.game = game;
    this.cache = [];
};

Tiny.Loader.loadSpriteSheet = function(key, frameData)
{
    var max_no_frame = (frameData.length - 1);

    for (var i = 0; i <= max_no_frame; i++)
    {
        var uuid = key + "_" + i;

        Tiny.TextureCache[uuid] = new Tiny.Texture(Tiny.BaseTextureCache[key],
        {
            index: i,
            x: Math.floor(frameData[i].x),
            y: Math.floor(frameData[i].y),
            width: Math.floor(frameData[i].width),
            height: Math.floor(frameData[i].height),
            duration: frameData[i].duration
        });
        Tiny.TextureCache[uuid].key = key;
        Tiny.TextureCache[uuid].max_no_frame = max_no_frame;
    }

    return max_no_frame;
}

Tiny.Loader.parseSpriteSheet = function(key, frameWidth, frameHeight, duration)
{
    var img = Tiny.BaseTextureCache[key];

    var width = img.width;
    var height = img.height;

    if (frameWidth <= 0)
    {
        frameWidth = Math.floor(-width / Math.min(-1, frameWidth));
    }

    if (frameHeight <= 0)
    {
        frameHeight = Math.floor(-height / Math.min(-1, frameHeight));
    }

    var row = Math.floor((width) / (frameWidth));
    var column = Math.floor((height) / (frameHeight));
    var total = row * column;

    if (total === 0) 
    {
        return null;
    }

    var x = 0;
    var y = 0;

    var max_no_frame = total - 1;
    var frameData = {};

    for (var i = 0; i < total; i++)
    {
        frameData = {
            index: i,
            x: x,
            y: y,
            width: frameWidth,
            height: frameHeight,
            duration: duration
        }
        var uuid = key + "_" + i;
        Tiny.TextureCache[uuid] = new Tiny.Texture(img, frameData);
        Tiny.TextureCache[uuid].key = key;
        Tiny.TextureCache[uuid].max_no_frame = max_no_frame;

        x += frameWidth;

        if (x + frameWidth > width)
        {
            x = 0;
            y += frameHeight;
        }
    }

    return max_no_frame;
}

Tiny.Loader.loadAtlas = function(key, atlasData)
{
    for (var i = 0; i < atlasData.length; i++)
    {
        var keyframe = key + "_" + atlasData[i].name

        Tiny.TextureCache[keyframe] = new Tiny.Texture(Tiny.BaseTextureCache[key], atlasData[i]);
        Tiny.TextureCache[keyframe].key = key;
    }
}

Tiny.Loader.prototype = {

    image: function(key, source)
    {
        this.cache.push(
        {
            src: source,
            key: key,
            cb: function() {}
        })
    },

    spritesheet: function(key, source, arg_1, arg_2, duration)
    {
        this.cache.push(
        {
            src: source,
            key: key,
            cb: function()
            {
                if (typeof arg_1 == "number") 
                {
                    Tiny.TextureCache[key].max_no_frame = Tiny.Loader.parseSpriteSheet(key, arg_1, arg_2, duration);
                }
                else if (arg_1.length > 0) 
                {
                    Tiny.TextureCache[key].max_no_frame = Tiny.Loader.loadSpriteSheet(key, arg_1);
                }
            }
        })
    },

    atlas: function(key, source, atlasData)
    {
        this.cache.push(
        {
            src: source,
            key: key,
            cb: function()
            {
                Tiny.Loader.loadAtlas(key, atlasData);
            }
        })
    },

    start: function(_cb_)
    {
        var game = this.game;
        var cache = this.cache;

        if (cache.length == 0)
        {
            _cb_.call(game);
            return;
        }

        function loadNextData()
        {
            var done = false;
            var _current_data = cache.shift();
            var img = new Image();
            img.onload = dataLoaded;
            img.src = _current_data.src

            function dataLoaded()
            {
                Tiny.BaseTextureCache[_current_data.key] = new Tiny.BaseTexture(img);
                Tiny.TextureCache[_current_data.key] = new Tiny.Texture(Tiny.BaseTextureCache[_current_data.key]);
                Tiny.TextureCache[_current_data.key].key = _current_data.key

                _current_data.cb()
                if (!done)
                {
                    img.onload = null;
                    done = true;
                    if (cache.length != 0)
                    {
                        loadNextData();
                    }
                    else
                    {
                        _cb_.call(game)
                    }
                }
            }
        }
        loadNextData();
    }
};

/***/ }),

/***/ "../src/managers/ObjectCreator.js":
/*!****************************************!*\
  !*** ../src/managers/ObjectCreator.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Tiny.ObjectCreator = function(game)
{
    this.game = game;
};

Tiny.ObjectCreator.prototype = {
    group: function(x, y)
    {
        var group = new Tiny.DisplayObjectContainer();
        this.game.stage.addChild(group);

        group.x = x || 0;
        group.y = y || 0;

        return group;
    },
    sprite: function(x, y, imagePath, key)
    {
        var sprite = new Tiny.Sprite(imagePath, key);
        sprite.frame = 0;

        this.game.stage.addChild(sprite)

        sprite.x = x || 0;
        sprite.y = y || 0;

        return sprite;
    },
    text: function(x, y, text, tyle)
    {
        var text = new Tiny.Text(text, tyle);

        this.game.stage.addChild(text);

        text.x = x || 0;
        text.y = y || 0;

        return text;
    },
    tileSprite: function(x, y, w, h, imagePath, key)
    {
        var tile = new Tiny.TilingSprite(imagePath, key, w, h);
        this.game.stage.addChild(tile);

        tile.x = x || 0;
        tile.y = y || 0;

        return tile;
    },
    graphics: function(x, y)
    {
        var graphics = new Tiny.Graphics();

        this.game.stage.addChild(graphics);

        graphics.x = x || 0;
        graphics.y = y || 0;

        return graphics;
    }
};

/***/ }),

/***/ "../src/managers/Timer.js":
/*!********************************!*\
  !*** ../src/managers/Timer.js ***!
  \********************************/
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
    this.game.timers = [];
    this.autoStart = true;
    this.autoRemove = true;
};

Tiny.TimerCreator.prototype = {
    removeAll: function()
    {
        this.game.timers.forEach(function(tm)
        {
            tm.stop();
        });

        this.game.timers = [];
    },
    remove: function(tm)
    {
        var indexOf = this.game.timers.indexOf(tm);
        if (indexOf > -1)
        {
            tm.stop();
            this.game.timers.splice(indexOf, 1);
        }
    },
    add: function(delay, cb, autostart, autoremove)
    {
        if (autostart == undefined) 
        {
            autostart = this.autoStart;
        }
        var timer = new Timer((autostart ? 1 : 0), (autoremove != undefined ? autoremove : this.autoRemove), this.game, cb, delay);
        this.game.timers.push(timer);
        return timer;
    },
    loop: function(delay, cb, autostart, autoremove)
    {
        if (autostart == undefined) 
        {
            autostart = this.autoStart;
        }
        var timer = new Timer((autostart ? 1 : 0), (autoremove != undefined ? autoremove : this.autoRemove), this.game, cb, delay, true);
        this.game.timers.push(timer);
        return timer;
    },
    repeat: function(delay, n, cb, complete)
    {
        var timer = new Timer((this.autoStart ? 1 : 0), this.autoRemove, this.game, cb, delay, false, n, complete);
        this.game.timers.push(timer);
        return timer;
    }
};

/***/ }),

/***/ "../src/math/Circle.js":
/*!*****************************!*\
  !*** ../src/math/Circle.js ***!
  \*****************************/
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

/***/ "../src/math/Math.js":
/*!***************************!*\
  !*** ../src/math/Math.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.Math = {

    // fuzzyEqual: function (a, b, epsilon) {
    //     if (typeof epsilon === 'undefined') { epsilon = 0.0001; }
    //     return Math.abs(a - b) < epsilon;
    // },

    // fuzzyLessThan: function (a, b, epsilon) {
    //     if (typeof epsilon === 'undefined') { epsilon = 0.0001; }
    //     return a < b + epsilon;
    // },

    // fuzzyGreaterThan: function (a, b, epsilon) {
    //     if (typeof epsilon === 'undefined') { epsilon = 0.0001; }
    //     return a > b - epsilon;
    // },

    // fuzzyCeil: function (val, epsilon) {
    //     if (typeof epsilon === 'undefined') { epsilon = 0.0001; }
    //     return Math.ceil(val - epsilon);
    // },

    // fuzzyFloor: function (val, epsilon) {
    //     if (typeof epsilon === 'undefined') { epsilon = 0.0001; }
    //     return Math.floor(val + epsilon);
    // },

    // average: function () {

    //     var sum = 0;

    //     for (var i = 0; i < arguments.length; i++) {
    //         sum += (+arguments[i]);
    //     }

    //     return sum / arguments.length;

    // },

    // truncate: function (n) {
    //     return Math.trunc(n);
    // },

    // shear: function (n) {
    //     return n % 1;
    // },

    // snapTo: function (input, gap, start) {

    //     if (typeof start === 'undefined') { start = 0; }

    //     if (gap === 0) {
    //         return input;
    //     }

    //     input -= start;
    //     input = gap * Math.round(input / gap);

    //     return start + input;

    // },

    // snapToFloor: function (input, gap, start) {

    //     if (typeof start === 'undefined') { start = 0; }

    //     if (gap === 0) {
    //         return input;
    //     }

    //     input -= start;
    //     input = gap * Math.floor(input / gap);

    //     return start + input;

    // },

    // snapToCeil: function (input, gap, start) {

    //     if (typeof start === 'undefined') { start = 0; }

    //     if (gap === 0) {
    //         return input;
    //     }

    //     input -= start;
    //     input = gap * Math.ceil(input / gap);

    //     return start + input;

    // },

    // snapToInArray: function (input, arr, sort) {

    //     if (typeof sort === 'undefined') { sort = true; }

    //     if (sort) {
    //         arr.sort();
    //     }

    //     return Phaser.ArrayUtils.findClosest(input, arr);

    // },

    // roundTo: function (value, place, base) {

    //     if (typeof place === 'undefined') { place = 0; }
    //     if (typeof base === 'undefined') { base = 10; }

    //     var p = Math.pow(base, -place);

    //     return Math.round(value * p) / p;

    // },

    // floorTo: function (value, place, base) {

    //     if (typeof place === 'undefined') { place = 0; }
    //     if (typeof base === 'undefined') { base = 10; }

    //     var p = Math.pow(base, -place);

    //     return Math.floor(value * p) / p;

    // },

    // ceilTo: function (value, place, base) {

    //     if (typeof place === 'undefined') { place = 0; }
    //     if (typeof base === 'undefined') { base = 10; }

    //     var p = Math.pow(base, -place);

    //     return Math.ceil(value * p) / p;

    // },

    // interpolateFloat: function (a, b, weight) {
    //     return (b - a) * weight + a;
    // },

    // angleBetween: function (x1, y1, x2, y2) {
    //     return Math.atan2(y2 - y1, x2 - x1);
    // },

    // angleBetweenY: function (x1, y1, x2, y2) {
    //     return Math.atan2(x2 - x1, y2 - y1);
    // },

    // angleBetweenPoints: function (point1, point2) {
    //     return Math.atan2(point2.y - point1.y, point2.x - point1.x);
    // },

    // angleBetweenPointsY: function (point1, point2) {
    //     return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    // },

    // reverseAngle: function (angleRad) {
    //     return this.normalizeAngle(angleRad + Math.PI, true);
    // },

    // normalizeAngle: function (angleRad) {

    //     angleRad = angleRad % (2 * Math.PI);
    //     return angleRad >= 0 ? angleRad : angleRad + 2 * Math.PI;

    // },

    // normalizeLatitude: function (lat) {
    //     return Phaser.Math.clamp(lat, -90, 90);
    // },

    // normalizeLongitude: function (lng) {
    //     return Phaser.Math.wrap(lng, -180, 180);
    // },

    // chanceRoll: function (chance) {
    //     return Phaser.Utils.chanceRoll(chance);
    // },

    // numberArray: function (start, end) {
    //     return Phaser.ArrayUtils.numberArray(start, end);
    // },

    // numberArrayStep: function(start, end, step) {
    //     return Phaser.ArrayUtils.numberArrayStep(start, end, step);
    // },

    // maxAdd: function (value, amount, max) {
    //     return Math.min(value + amount, max);
    // },

    // minSub: function (value, amount, min) {
    //     return Math.max(value - amount, min);
    // },

    // wrap: function (value, min, max) {

    //     var range = max - min;

    //     if (range <= 0)
    //     {
    //         return 0;
    //     }

    //     var result = (value - min) % range;

    //     if (result < 0)
    //     {
    //         result += range;
    //     }

    //     return result + min;

    // },

    // wrapValue: function (value, amount, max) {

    //     var diff;
    //     value = Math.abs(value);
    //     amount = Math.abs(amount);
    //     max = Math.abs(max);
    //     diff = (value + amount) % max;

    //     return diff;

    // },

    // limitValue: function(value, min, max) {
    //     return Phaser.Math.clamp(value, min, max);
    // },

    // randomSign: function () {
    //     return Phaser.Utils.randomChoice(-1, 1);
    // },

    // isOdd: function (n) {
    //     // Does not work with extremely large values
    //     return (n & 1);
    // },

    // isEven: function (n) {
    //     // Does not work with extremely large values
    //     return !(n & 1);
    // },

    // min: function () {
 
    //     if (arguments.length === 1 && typeof arguments[0] === 'object')
    //     {
    //         var data = arguments[0];
    //     }
    //     else
    //     {
    //         var data = arguments;
    //     }
 
    //     for (var i = 1, min = 0, len = data.length; i < len; i++)
    //     {
    //         if (data[i] < data[min])
    //         {
    //             min = i;
    //         }
    //     }

    //     return data[min];

    // },

    // max: function () {
 
    //     if (arguments.length === 1 && typeof arguments[0] === 'object')
    //     {
    //         var data = arguments[0];
    //     }
    //     else
    //     {
    //         var data = arguments;
    //     }
 
    //     for (var i = 1, max = 0, len = data.length; i < len; i++)
    //     {
    //         if (data[i] > data[max])
    //         {
    //             max = i;
    //         }
    //     }

    //     return data[max];

    // },

    // minProperty: function (property) {

    //     if (arguments.length === 2 && typeof arguments[1] === 'object')
    //     {
    //         var data = arguments[1];
    //     }
    //     else
    //     {
    //         var data = arguments.slice(1);
    //     }

    //     for (var i = 1, min = 0, len = data.length; i < len; i++)
    //     {
    //         if (data[i][property] < data[min][property])
    //         {
    //             min = i;
    //         }
    //     }

    //     return data[min][property];

    // },

    // maxProperty: function (property) {

    //     if (arguments.length === 2 && typeof arguments[1] === 'object')
    //     {
    //         var data = arguments[1];
    //     }
    //     else
    //     {
    //         var data = arguments.slice(1);
    //     }

    //     for (var i = 1, max = 0, len = data.length; i < len; i++)
    //     {
    //         if (data[i][property] > data[max][property])
    //         {
    //             max = i;
    //         }
    //     }

    //     return data[max][property];

    // },

    // wrapAngle: function (angle, radians) {

    //     return radians ? this.wrap(angle, -Math.PI, Math.PI) : this.wrap(angle, -180, 180);

    // },

    // angleLimit: function (angle, min, max) {

    //     var result = angle;

    //     if (angle > max)
    //     {
    //         result = max;
    //     }
    //     else if (angle < min)
    //     {
    //         result = min;
    //     }

    //     return result;

    // },

    // linearInterpolation: function (v, k) {

    //     var m = v.length - 1;
    //     var f = m * k;
    //     var i = Math.floor(f);

    //     if (k < 0)
    //     {
    //         return this.linear(v[0], v[1], f);
    //     }

    //     if (k > 1)
    //     {
    //         return this.linear(v[m], v[m - 1], m - f);
    //     }

    //     return this.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);

    // },

    // bezierInterpolation: function (v, k) {

    //     var b = 0;
    //     var n = v.length - 1;

    //     for (var i = 0; i <= n; i++)
    //     {
    //         b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * this.bernstein(n, i);
    //     }

    //     return b;

    // },

    // catmullRomInterpolation: function (v, k) {

    //     var m = v.length - 1;
    //     var f = m * k;
    //     var i = Math.floor(f);

    //     if (v[0] === v[m])
    //     {
    //         if (k < 0)
    //         {
    //             i = Math.floor(f = m * (1 + k));
    //         }

    //         return this.catmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    //     }
    //     else
    //     {
    //         if (k < 0)
    //         {
    //             return v[0] - (this.catmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);
    //         }

    //         if (k > 1)
    //         {
    //             return v[m] - (this.catmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
    //         }

    //         return this.catmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    //     }

    // },

    // linear: function (p0, p1, t) {
    //     return (p1 - p0) * t + p0;
    // },

    // bernstein: function (n, i) {
    //     return this.factorial(n) / this.factorial(i) / this.factorial(n - i);
    // },

    // factorial : function( value ){

    //     if (value === 0)
    //     {
    //         return 1;
    //     }

    //     var res = value;

    //     while(--value)
    //     {
    //         res *= value;
    //     }

    //     return res;

    // },

    // catmullRom: function (p0, p1, p2, p3, t) {

    //     var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;

    //     return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

    // },

    // difference: function (a, b) {
    //     return Math.abs(a - b);
    // },

    // getRandom: function (objects, startIndex, length) {
    //     return Phaser.ArrayUtils.getRandomItem(objects, startIndex, length);
    // },

    // removeRandom: function (objects, startIndex, length) {
    //     return Phaser.ArrayUtils.removeRandomItem(objects, startIndex, length);
    // },

    // floor: function (value) {
    //     return Math.trunc(value);
    // },

    // ceil: function (value) {
    //     return Phaser.Math.roundAwayFromZero(value);
    // },

    // roundAwayFromZero: function (value) {
    //     // "Opposite" of truncate.
    //     return (value > 0) ? Math.ceil(value) : Math.floor(value);
    // },

    // sinCosGenerator: function (length, sinAmplitude, cosAmplitude, frequency) {

    //     if (typeof sinAmplitude === 'undefined') { sinAmplitude = 1.0; }
    //     if (typeof cosAmplitude === 'undefined') { cosAmplitude = 1.0; }
    //     if (typeof frequency === 'undefined') { frequency = 1.0; }

    //     var sin = sinAmplitude;
    //     var cos = cosAmplitude;
    //     var frq = frequency * Math.PI / length;

    //     var cosTable = [];
    //     var sinTable = [];

    //     for (var c = 0; c < length; c++) {

    //         cos -= sin * frq;
    //         sin += cos * frq;

    //         cosTable[c] = cos;
    //         sinTable[c] = sin;

    //     }

    //     return { sin: sinTable, cos: cosTable, length: length };

    // },

    // shift: function (array) {

    //     var s = array.shift();
    //     array.push(s);

    //     return s;

    // },

    // shuffleArray: function (array) {
    //     return Phaser.ArrayUtils.shuffle(array);
    // },

    distance: function (x1, y1, x2, y2) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);

    },

    // distancePow: function (x1, y1, x2, y2, pow) {

    //     if (typeof pow === 'undefined') { pow = 2; }

    //     return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow));

    // },

    // distanceRounded: function (x1, y1, x2, y2) {
    //     return Math.round(Phaser.Math.distance(x1, y1, x2, y2));
    // },

    // clamp: function (x, a, b) {
    //     return ( x < a ) ? a : ( ( x > b ) ? b : x );
    // },

    // clampBottom: function (x, a) {
    //     return x < a ? a : x;
    // },

    // within: function (a, b, tolerance) {
    //     return (Math.abs(a - b) <= tolerance);
    // },

    // mapLinear: function (x, a1, a2, b1, b2) {
    //     return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );
    // },

    // smoothstep: function (x, min, max) {
    //     x = Math.max(0, Math.min(1, (x - min) / (max - min)));
    //     return x * x * (3 - 2 * x);
    // },

    // smootherstep: function (x, min, max) {
    //     x = Math.max(0, Math.min(1, (x - min) / (max - min)));
    //     return x * x * x * (x * (x * 6 - 15) + 10);
    // },

    // sign: function (x) {
    //     return ( x < 0 ) ? -1 : ( ( x > 0 ) ? 1 : 0 );
    // },

    // percent: function (a, b, base) {

    //     if (typeof base === 'undefined') { base = 0; }

    //     if (a > b || base > b)
    //     {
    //         return 1;
    //     }
    //     else if (a < base || base > a)
    //     {
    //         return 0;
    //     }
    //     else
    //     {
    //         return (a - base) / b;
    //     }

    // }

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

/***/ "../src/math/Matrix.js":
/*!*****************************!*\
  !*** ../src/math/Matrix.js ***!
  \*****************************/
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

/***/ "../src/math/Point.js":
/*!****************************!*\
  !*** ../src/math/Point.js ***!
  \****************************/
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
    },

    setTo: function (x, y) {
    	this.set(x, y)
    }
};

/***/ }),

/***/ "../src/math/Polygon.js":
/*!******************************!*\
  !*** ../src/math/Polygon.js ***!
  \******************************/
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

/***/ "../src/math/Rectangle.js":
/*!********************************!*\
  !*** ../src/math/Rectangle.js ***!
  \********************************/
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

    // offset: function (dx, dy) {

    //     this.x += dx;
    //     this.y += dy;

    //     return this;

    // },

    // offsetPoint: function (point) {

    //     return this.offset(point.x, point.y);

    // },

    setTo: function (x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;

    },

    // scale: function (x, y) {

    //     if (typeof y === 'undefined') { y = x; }

    //     this.width *= x;
    //     this.height *= y;

    //     return this;

    // },

    // centerOn: function (x, y) {

    //     this.centerX = x;
    //     this.centerY = y;

    //     return this;

    // },

    // floor: function () {

    //     this.x = Math.floor(this.x);
    //     this.y = Math.floor(this.y);

    // },

    // floorAll: function () {

    //     this.x = Math.floor(this.x);
    //     this.y = Math.floor(this.y);
    //     this.width = Math.floor(this.width);
    //     this.height = Math.floor(this.height);

    // },

    // copyFrom: function (source) {

    //     return this.setTo(source.x, source.y, source.width, source.height);

    // },

    // copyTo: function (dest) {

    //     dest.x = this.x;
    //     dest.y = this.y;
    //     dest.width = this.width;
    //     dest.height = this.height;

    //     return dest;

    // },

    // inflate: function (dx, dy) {

    //     return Tiny.Rectangle.inflate(this, dx, dy);

    // },

    // size: function (output) {

    //     return Tiny.Rectangle.size(this, output);

    // },

    // clone: function (output) {

    //     return Tiny.Rectangle.clone(this, output);

    // },

    contains: function (x, y) {

        return Tiny.Rectangle.contains(this, x, y);

    },

    // containsRect: function (b) {

    //     return Tiny.Rectangle.containsRect(b, this);

    // },

    // equals: function (b) {

    //     return Tiny.Rectangle.equals(this, b);

    // },

    // intersection: function (b, out) {

    //     return Tiny.Rectangle.intersection(this, b, out);

    // },


    intersects: function (b) {

        return Tiny.Rectangle.intersects(this, b);

    },

    // intersectsRaw: function (left, right, top, bottom, tolerance) {

    //     return Tiny.Rectangle.intersectsRaw(this, left, right, top, bottom, tolerance);

    // },

    // union: function (b, out) {

    //     return Tiny.Rectangle.union(this, b, out);

    // }

};

// Object.defineProperty(Tiny.Rectangle.prototype, "halfWidth", {

//     get: function () {
//         return Math.round(this.width / 2);
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "halfHeight", {

//     get: function () {
//         return Math.round(this.height / 2);
//     }

// });

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

// Object.defineProperty(Tiny.Rectangle.prototype, "bottomRight", {

//     get: function () {
//         return new Tiny.Point(this.right, this.bottom);
//     },

//     set: function (value) {
//         this.right = value.x;
//         this.bottom = value.y;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "left", {

//     get: function () {
//         return this.x;
//     },

//     set: function (value) {
//         if (value >= this.right) {
//             this.width = 0;
//         } else {
//             this.width = this.right - value;
//         }
//         this.x = value;
//     }

// });

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

// Object.defineProperty(Tiny.Rectangle.prototype, "perimeter", {

//     get: function () {
//         return (this.width * 2) + (this.height * 2);
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "centerX", {

//     get: function () {
//         return this.x + this.halfWidth;
//     },

//     set: function (value) {
//         this.x = value - this.halfWidth;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "centerY", {

//     get: function () {
//         return this.y + this.halfHeight;
//     },

//     set: function (value) {
//         this.y = value - this.halfHeight;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "randomX", {

//     get: function () {

//         return this.x + (Math.random() * this.width);

//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "randomY", {

//     get: function () {

//         return this.y + (Math.random() * this.height);

//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "top", {

//     get: function () {
//         return this.y;
//     },

//     set: function (value) {
//         if (value >= this.bottom) {
//             this.height = 0;
//             this.y = value;
//         } else {
//             this.height = (this.bottom - value);
//         }
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "topLeft", {

//     get: function () {
//         return new Tiny.Point(this.x, this.y);
//     },

//     set: function (value) {
//         this.x = value.x;
//         this.y = value.y;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "topRight", {

//     get: function () {
//         return new Tiny.Point(this.x + this.width, this.y);
//     },

//     set: function (value) {
//         this.right = value.x;
//         this.y = value.y;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "empty", {

//     get: function () {
//         return (!this.width || !this.height);
//     },

//     set: function (value) {

//         if (value === true)
//         {
//             this.setTo(0, 0, 0, 0);
//         }

//     }

// });

Tiny.Rectangle.prototype.constructor = Tiny.Rectangle;

// Tiny.Rectangle.inflate = function (a, dx, dy) {

//     a.x -= dx;
//     a.width += 2 * dx;
//     a.y -= dy;
//     a.height += 2 * dy;

//     return a;

// };

// Tiny.Rectangle.inflatePoint = function (a, point) {

//     return Tiny.Rectangle.inflate(a, point.x, point.y);

// };

// Tiny.Rectangle.size = function (a, output) {

//     if (typeof output === "undefined" || output === null)
//     {
//         output = new Tiny.Point(a.width, a.height);
//     }
//     else
//     {
//         output.setTo(a.width, a.height);
//     }

//     return output;

// };

// Tiny.Rectangle.clone = function (a, output) {

//     if (typeof output === "undefined" || output === null)
//     {
//         output = new Tiny.Rectangle(a.x, a.y, a.width, a.height);
//     }
//     else
//     {
//         output.setTo(a.x, a.y, a.width, a.height);
//     }

//     return output;

// };

Tiny.Rectangle.contains = function (a, x, y) {

    if (a.width <= 0 || a.height <= 0)
    {
        return false;
    }

    return (x >= a.x && x < a.right && y >= a.y && y < a.bottom);

};

// Tiny.Rectangle.containsRaw = function (rx, ry, rw, rh, x, y) {

//     return (x >= rx && x < (rx + rw) && y >= ry && y < (ry + rh));

// };

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

// Tiny.Rectangle.equals = function (a, b) {

//     return (a.x == b.x && a.y == b.y && a.width == b.width && a.height == b.height);

// };

// Tiny.Rectangle.sameDimensions = function (a, b) {

//     return (a.width === b.width && a.height === b.height);

// };

// Tiny.Rectangle.intersection = function (a, b, output) {

//     if (typeof output === "undefined")
//     {
//         output = new Tiny.Rectangle();
//     }

//     if (Tiny.Rectangle.intersects(a, b))
//     {
//         output.x = Math.max(a.x, b.x);
//         output.y = Math.max(a.y, b.y);
//         output.width = Math.min(a.right, b.right) - output.x;
//         output.height = Math.min(a.bottom, b.bottom) - output.y;
//     }

//     return output;

// };

Tiny.Rectangle.intersects = function (a, b) {

    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0)
    {
        return false;
    }

    return !(a.right < b.x || a.bottom < b.y || a.x > b.right || a.y > b.bottom);

};

// Tiny.Rectangle.intersectsRaw = function (a, left, right, top, bottom, tolerance) {

//     if (typeof tolerance === "undefined") { tolerance = 0; }

//     return !(left > a.right + tolerance || right < a.left - tolerance || top > a.bottom + tolerance || bottom < a.top - tolerance);

// };

// Tiny.Rectangle.union = function (a, b, output) {

//     if (typeof output === "undefined")
//     {
//         output = new Tiny.Rectangle();
//     }

//     return output.setTo(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.right, b.right) - Math.min(a.left, b.left), Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top));

// };

// Tiny.Rectangle.aabb = function(points, out) {

//     if (typeof out === "undefined") {
//         out = new Tiny.Rectangle();
//     }

//     var xMax = Number.MIN_VALUE,
//         xMin = Number.MAX_VALUE,
//         yMax = Number.MIN_VALUE,
//         yMin = Number.MAX_VALUE;

//     points.forEach(function(point) {
//         if (point.x > xMax) {
//             xMax = point.x;
//         }
//         if (point.x < xMin) {
//             xMin = point.x;
//         }

//         if (point.y > yMax) {
//             yMax = point.y;
//         }
//         if (point.y < yMin) {
//             yMin = point.y;
//         }
//     });

//     out.setTo(xMin, yMin, xMax - xMin, yMax - yMin);

//     return out;
// };

Tiny.EmptyRectangle = new Tiny.Rectangle(0, 0, 0, 0);

/***/ }),

/***/ "../src/math/RoundedRectangle.js":
/*!***************************************!*\
  !*** ../src/math/RoundedRectangle.js ***!
  \***************************************/
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

/***/ "../src/objects/Graphics.js":
/*!**********************************!*\
  !*** ../src/objects/Graphics.js ***!
  \**********************************/
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
    Tiny.DisplayObjectContainer.call(this);

    this.renderable = true;
    this.fillAlpha = 1;
    this.lineWidth = 0;
    this.lineColor = 0;
    this.graphicsData = [];
    this.tint = 0xFFFFFF;
    this.blendMode = "source-over";
    this.currentPath = null;
    this._webGL = [];
    this.isMask = false;
    this.boundsPadding = 0;

    this._localBounds = new Tiny.Rectangle(0,0,1,1);
    this._boundsDirty = true;
    this.cachedSpriteDirty = false;

};

// constructor
Tiny.Graphics.prototype = Object.create( Tiny.DisplayObjectContainer.prototype );
Tiny.Graphics.prototype.constructor = Tiny.Graphics;


Tiny.Graphics.prototype.lineStyle = function(lineWidth, color, alpha)
{
    this.lineWidth = lineWidth || 0;
    this.lineColor = color || 0;
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
    this.fillColor = color || 0;
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
    if (this.children)
    {
        var i = this.children.length;

        while (i--)
        {
            this.children[i].destroy();
        }

        this.children = [];
    }

    this.clear();
};

Tiny.Graphics.prototype.generateTexture = function(resolution)
{
    resolution = resolution || 1;

    var bounds = this.getBounds();
   
    var canvasBuffer = new Tiny.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);
    
    var texture = Tiny.Texture.fromCanvas(canvasBuffer.canvas);
    texture.baseTexture.resolution = resolution;

    canvasBuffer.context.scale(resolution, resolution);

    canvasBuffer.context.translate(-bounds.x,-bounds.y);
    
    Tiny.CanvasGraphics.renderGraphics(this, canvasBuffer.context);

    return texture;
};

Tiny.Graphics.prototype._renderCanvas = function(renderSession)
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
        Tiny.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);

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
            this.children[i]._renderCanvas(renderSession);
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

    texture.baseTexture.width = canvas.width;
    texture.baseTexture.height = canvas.height;
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

/***/ "../src/objects/Sprite.js":
/*!********************************!*\
  !*** ../src/objects/Sprite.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.Sprite = function(texture, key)
{
    Tiny.DisplayObjectContainer.call(this);

    this.anchor = new Tiny.Point();

    this.setTexture(texture, key, false);

    this._width = 0;

    this._height = 0;

    this._frame = 0;

    this.tint = 0xFFFFFF;

    this.blendMode = "source-over";

    this.shader = null;

    if (this.texture.baseTexture.hasLoaded)
    {
        this.onTextureUpdate();
    }

    this.renderable = true;
};


Tiny.Sprite.prototype = Object.create(Tiny.DisplayObjectContainer.prototype);
Tiny.Sprite.prototype.constructor = Tiny.Sprite;

Object.defineProperty(Tiny.Sprite.prototype, 'frameName', {

    get: function() {
        return this.texture.frame.name
    },

    set: function(value) {
        if (this.texture.frame.name) 
        {
            this.setTexture(Tiny.TextureCache[this.texture.key + "_" + value])
        }
    }

});

Object.defineProperty(Tiny.Sprite.prototype, 'frame', {

    get: function() {
        return this._frame
    },

    set: function(value) {
        if (this.texture.max_no_frame) {
            this._frame = value
            if (this._frame > this.texture.max_no_frame)
                this._frame = 0
            this.setTexture(Tiny.TextureCache[this.texture.key + "_" + this._frame])
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
            imagePath = imagePath + "_" + key;
        }

        texture = Tiny.TextureCache[imagePath]

        if (!texture) 
        {
            throw new Error('Cache Error: image ' + imagePath + ' does`t found in cache');
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

Tiny.Sprite.prototype.animate = function(delay)
{
    if (this.texture.max_no_frame && this.texture.frame.index != undefined) {
        var o_delay = delay || (this.texture.frame.duration || 100)
        if (!this.animation) {
            this.animation = this.game.timer.loop(o_delay, function() {
                this.frame += 1
                this.animation.delay = delay || (this.texture.frame.duration || 100)
            }.bind(this))
            this.animation.start()
        } else {
            this.animation.delay = o_delay
            this.animation.start()
        }
    }
};

Tiny.Sprite.prototype.getBounds = function(matrix)
{
    var width = this.texture.frame.width;
    var height = this.texture.frame.height;

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
        // scale may be negative!
        if (a < 0) a *= -1;
        if (d < 0) d *= -1;

        // this means there is no rotation going on right? RIGHT?
        // if thats the case then we can avoid checking the bound values! yay         
        minX = a * w1 + tx;
        maxX = a * w0 + tx;
        minY = d * h1 + ty;
        maxY = d * h0 + ty;
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


Tiny.Sprite.prototype._renderCanvas = function(renderSession)
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
        var resolution = this.texture.baseTexture.resolution / renderSession.resolution;

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

        if (this.tint !== 0xFFFFFF)
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
                                this.texture.baseTexture.source,
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
        this.children[i]._renderCanvas(renderSession);
    }

    if (this._mask)
    {
        renderSession.maskManager.popMask(renderSession);
    }
};

/***/ }),

/***/ "../src/objects/Text.js":
/*!******************************!*\
  !*** ../src/objects/Text.js ***!
  \******************************/
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
    style.wordWrapWidth = style.wordWrapWidth || 100;
    
    style.dropShadow = style.dropShadow || false;
    style.dropShadowAngle = style.dropShadowAngle || Math.PI / 6;
    style.dropShadowDistance = style.dropShadowDistance || 4;
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
    this.texture.baseTexture.resolution = this.resolution;

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
    this.texture.baseTexture.width = this.canvas.width;
    this.texture.baseTexture.height = this.canvas.height;
    this.texture.crop.width = this.texture.frame.width = this.canvas.width;
    this.texture.crop.height = this.texture.frame.height = this.canvas.height;

    this._width = this.canvas.width;
    this._height = this.canvas.height;
};

Tiny.Text.prototype._renderCanvas = function(renderSession)
{
    if(this.dirty)
    {
        this.resolution = renderSession.resolution;

        this.updateText();
        this.dirty = false;
    }
     
    Tiny.Sprite.prototype._renderCanvas.call(this, renderSession);
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

Tiny.Text.prototype.destroy = function(destroyBaseTexture)
{
    // make sure to reset the the context and canvas.. dont want this hanging around in memory!
    this.context = null;
    this.canvas = null;

    this.texture.destroy(destroyBaseTexture === undefined ? true : destroyBaseTexture);
};

Tiny.Text.fontPropertiesCache = {};
Tiny.Text.fontPropertiesCanvas = document.createElement('canvas');
Tiny.Text.fontPropertiesContext = Tiny.Text.fontPropertiesCanvas.getContext('2d');

/***/ }),

/***/ "../src/objects/TilingSprite.js":
/*!**************************************!*\
  !*** ../src/objects/TilingSprite.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * A tiling sprite is a fast way of rendering a tiling image
 *
 * @class TilingSprite
 * @extends Sprite
 * @constructor
 * @param texture {Texture} the texture of the tiling sprite
 * @param width {Number}  the width of the tiling sprite
 * @param height {Number} the height of the tiling sprite
 */
Tiny.TilingSprite = function(texture, key, width, height)
{
    Tiny.Sprite.call( this, texture, key );

    /**
     * The with of the tiling sprite
     *
     * @property width
     * @type Number
     */
    this._width = width || 100;

    /**
     * The height of the tiling sprite
     *
     * @property height
     * @type Number
     */
    this._height = height || 100;

    /**
     * The scaling of the image that is being tiled
     *
     * @property tileScale
     * @type Point
     */
    this.tileScale = new Tiny.Point(1,1);

    /**
     * A point that represents the scale of the texture object
     *
     * @property tileScaleOffset
     * @type Point
     */
    this.tileScaleOffset = new Tiny.Point(1,1);
    
    /**
     * The offset position of the image that is being tiled
     *
     * @property tilePosition
     * @type Point
     */
    this.tilePosition = new Tiny.Point(0,0);

};

// constructor
Tiny.TilingSprite.prototype = Object.create(Tiny.Sprite.prototype);
Tiny.TilingSprite.prototype.constructor = Tiny.TilingSprite;


/**
 * The width of the sprite, setting this will actually modify the scale to achieve the value set
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Tiny.TilingSprite.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        
        this._width = value;
    }
});

/**
 * The height of the TilingSprite, setting this will actually modify the scale to achieve the value set
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Tiny.TilingSprite.prototype, 'height', {
    get: function() {
        return  this._height;
    },
    set: function(value) {
        this._height = value;
    }
});

Tiny.TilingSprite.prototype.setTexture = function(texture, key)
{
    var updated = Tiny.Sprite.prototype.setTexture.call(this, texture, key);

    this.refreshTexture = updated;
};

Tiny.TilingSprite.prototype._renderCanvas = function(renderSession)
{
    if (this.visible === false || this.alpha === 0)return;
    
    var context = renderSession.context;

    if (this._mask)
    {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    context.globalAlpha = this.worldAlpha;
    
    var transform = this.worldTransform;
    
    var resolution = renderSession.resolution;

    context.setTransform(transform.a * resolution,
                         transform.b * resolution,
                         transform.c * resolution,
                         transform.d * resolution,
                         transform.tx * resolution,
                         transform.ty * resolution);

    if (!this.__tilePattern || this.refreshTexture)
    {
        this.generateTilingTexture(false);
    
        if (this.tilingTexture)
        {
            this.__tilePattern = context.createPattern(this.tilingTexture.baseTexture.source, 'repeat');
        }
        else
        {
            return;
        }
    }

    // check blend mode
    if (this.blendMode !== renderSession.currentBlendMode)
    {
        renderSession.currentBlendMode = this.blendMode;
        context.globalCompositeOperation = renderSession.currentBlendMode;
    }

    var tilePosition = this.tilePosition;
    var tileScale = this.tileScale;

    tilePosition.x %= this.tilingTexture.baseTexture.width;
    tilePosition.y %= this.tilingTexture.baseTexture.height;

    // offset - make sure to account for the anchor point..
    context.scale(tileScale.x,tileScale.y);
    context.translate(tilePosition.x + (this.anchor.x * -this._width), tilePosition.y + (this.anchor.y * -this._height));

    context.fillStyle = this.__tilePattern;

    context.fillRect(-tilePosition.x,
                    -tilePosition.y,
                    this._width / tileScale.x,
                    this._height / tileScale.y);

    context.scale(1 / tileScale.x, 1 / tileScale.y);
    context.translate(-tilePosition.x + (this.anchor.x * this._width), -tilePosition.y + (this.anchor.y * this._height));

    if (this._mask)
    {
        renderSession.maskManager.popMask(renderSession);
    }

    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i]._renderCanvas(renderSession);
    }
};


/**
* Returns the framing rectangle of the sprite as a Tiny.Rectangle object
*
* @method getBounds
* @return {Rectangle} the framing rectangle
*/
Tiny.TilingSprite.prototype.getBounds = function()
{
    var width = this._width;
    var height = this._height;

    var w0 = width * (1-this.anchor.x);
    var w1 = width * -this.anchor.x;

    var h0 = height * (1-this.anchor.y);
    var h1 = height * -this.anchor.y;

    var worldTransform = this.worldTransform;

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

    var maxX = -Infinity;
    var maxY = -Infinity;

    var minX = Infinity;
    var minY = Infinity;

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

    var bounds = this._bounds;

    bounds.x = minX;
    bounds.width = maxX - minX;

    bounds.y = minY;
    bounds.height = maxY - minY;

    // store a reference so that if this function gets called again in the render cycle we do not have to recalculate
    this._currentBounds = bounds;

    return bounds;
};



/**
 * When the texture is updated, this event will fire to update the scale and frame
 *
 * @method onTextureUpdate
 * @param event
 * @private
 */

/**
* 
* @method generateTilingTexture
* 
* @param forcePowerOfTwo {Boolean} Whether we want to force the texture to be a power of two
*/
Tiny.TilingSprite.prototype.generateTilingTexture = function(forcePowerOfTwo)
{
    if (!this.texture.baseTexture.hasLoaded) return;

    var texture = this.texture;
    var frame = texture.frame;
    var targetWidth, targetHeight;

    //  Check that the frame is the same size as the base texture.
    var isFrame = frame.width !== texture.baseTexture.width || frame.height !== texture.baseTexture.height;

    var newTextureRequired = false;

    if (!forcePowerOfTwo)
    {
        if (texture.crop)
        {
            targetWidth = texture.crop.width;
            targetHeight = texture.crop.height;
        }
        else
        {
            targetWidth = frame.width;
            targetHeight = frame.height;
        }
       
        newTextureRequired = true;
    }
    else
    {
        if (texture.crop)
        {
            targetWidth = Tiny.getNextPowerOfTwo(texture.crop.width);
            targetHeight = Tiny.getNextPowerOfTwo(texture.crop.height);
        }
        else
        {
            targetWidth = Tiny.getNextPowerOfTwo(frame.width);
            targetHeight = Tiny.getNextPowerOfTwo(frame.height);
        }

        newTextureRequired = true;

        //  If the BaseTexture dimensions don't match the texture frame then we need a new texture anyway because it's part of a texture atlas
        // if (frame.width !== targetWidth || frame.height !== targetHeight || texture.baseTexture.width !== targetWidth || texture.baseTexture.height || targetHeight) newTextureRequired = true;
    }

    if (newTextureRequired)
    {
        var canvasBuffer;

        if (this.tilingTexture && this.tilingTexture.isTiling)
        {
            canvasBuffer = this.tilingTexture.canvasBuffer;
            canvasBuffer.resize(targetWidth, targetHeight);
            this.tilingTexture.baseTexture.width = targetWidth;
            this.tilingTexture.baseTexture.height = targetHeight;
            this.tilingTexture.needsUpdate = true;
        }
        else
        {
            canvasBuffer = new Tiny.CanvasBuffer(targetWidth, targetHeight);

            this.tilingTexture = Tiny.Texture.fromCanvas(canvasBuffer.canvas);
            this.tilingTexture.canvasBuffer = canvasBuffer;
            this.tilingTexture.isTiling = true;
        }

        canvasBuffer.context.drawImage(texture.baseTexture.source,
                               texture.crop.x,
                               texture.crop.y,
                               texture.crop.width,
                               texture.crop.height,
                               0,
                               0,
                               targetWidth,
                               targetHeight);

        this.tileScaleOffset.x = frame.width / targetWidth;
        this.tileScaleOffset.y = frame.height / targetHeight;
    }

    this.refreshTexture = false;
};

Tiny.TilingSprite.prototype.destroy = function () {

    Tiny.Sprite.prototype.destroy.call(this);

    this.tileScale = null;
    this.tileScaleOffset = null;
    this.tilePosition = null;

    if (this.tilingTexture)
    {
        this.tilingTexture.destroy(true);
        this.tilingTexture = null;
    }

};

/***/ }),

/***/ "../src/renderer/CanvasMaskManager.js":
/*!********************************************!*\
  !*** ../src/renderer/CanvasMaskManager.js ***!
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

/***/ "../src/renderer/CanvasRenderer.js":
/*!*****************************************!*\
  !*** ../src/renderer/CanvasRenderer.js ***!
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

    this.width = width || 800;

    this.height = height || 600;

    this.width *= this.resolution;
    this.height *= this.resolution;

    this.view = options.view || document.createElement( "canvas" );

    this.context = this.view.getContext( "2d", { alpha: this.transparent } );

    this.view.width = this.width;
    this.view.height = this.height;

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

    this.resize(width, height);

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


Tiny.CanvasRenderer.prototype.render = function(stage)
{
    
    this.context.setTransform(1,0,0,1,0,0);

    this.context.globalAlpha = 1;

    this.renderSession.currentBlendMode = "source-over";
    this.context.globalCompositeOperation = "source-over";

    if (navigator.isCocoonJS && this.view.screencanvas)
    {
        this.context.fillStyle = "black";
        this.context.clear();
    }
    
    if (this.clearBeforeRender)
    {
        if (this.transparent)
        {
            this.context.clearRect(0, 0, this.width, this.height);
        }
        else
        {
            this.context.fillStyle = stage.backgroundColorString;
            this.context.fillRect(0, 0, this.width , this.height);
        }
    }
    
    this.renderDisplayObject(stage);

};

Tiny.CanvasRenderer.prototype.destroy = function(removeView)
{   
    if (typeof removeView === "undefined") { removeView = true; }

    if (removeView && this.view.parentNode)
    {
        this.view.parentNode.removeChild(this.view);
    }

    this.view = null;
    this.context = null;
    this.maskManager = null;
    this.renderSession = null;

};

Tiny.CanvasRenderer.prototype.resize = function(width, height)
{
    this.width = width * this.resolution;
    this.height = height * this.resolution;

    this.view.width = this.width;
    this.view.height = this.height;

    if (this.autoResize) {
        this.view.style.width = this.width / this.resolution + "px";
        this.view.style.height = this.height / this.resolution + "px";
    }
};

Tiny.CanvasRenderer.prototype.renderDisplayObject = function(displayObject, context)
{
    this.renderSession.context = context || this.context;
    this.renderSession.resolution = this.resolution;
    displayObject._renderCanvas(this.renderSession);
};

/***/ }),

/***/ "../src/renderer/CanvasTinter.js":
/*!***************************************!*\
  !*** ../src/renderer/CanvasTinter.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.CanvasTinter = function()
{
};

Tiny.CanvasTinter.getTintedTexture = function(sprite, color)
{
    var texture = sprite.texture;

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

    return canvas;
};

Tiny.CanvasTinter.tintWithMultiply = function(texture, color, canvas)
{
    var context = canvas.getContext( "2d" );

    var crop = texture.crop;

    canvas.width = crop.width;
    canvas.height = crop.height;

    context.fillStyle = "#" + ("00000" + ( color | 0).toString(16)).substr(-6);
    
    context.fillRect(0, 0, crop.width, crop.height);
    
    context.globalCompositeOperation = "multiply";

    context.drawImage(texture.baseTexture.source,
                           crop.x,
                           crop.y,
                           crop.width,
                           crop.height,
                           0,
                           0,
                           crop.width,
                           crop.height);

    context.globalCompositeOperation = "destination-atop";

    context.drawImage(texture.baseTexture.source,
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
    context.drawImage(texture.baseTexture.source,
                           crop.x,
                           crop.y,
                           crop.width,
                           crop.height,
                           0,
                           0,
                           crop.width,
                           crop.height);

    var rgbValues = Tiny.hex2rgb(color);
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
    var canvas = new Tiny.CanvasBuffer(2, 1);

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
            var context = canvas.getContext('2d');

            context.globalCompositeOperation = 'multiply';

            context.drawImage(magenta, 0, 0);
            context.drawImage(yellow, 2, 0);

            if (!context.getImageData(2, 0, 1, 1))
            {
                return false;
            }

            var data = context.getImageData(2, 0, 1, 1).data;

            Tiny.supportNewBlendModes = (data[0] === 255 && data[1] === 0 && data[2] === 0);
        };

        yellow.src = pngHead + '/wCKxvRF' + pngEnd;
    };

    magenta.src = pngHead + 'AP804Oa6' + pngEnd;

    return false;
}


Tiny.CanvasTinter.convertTintToImage = false;

Tiny.canHandleAlpha = checkInverseAlpha();

Tiny.supportNewBlendModes = checkBlendMode();

Tiny.CanvasTinter.tintMethod = Tiny.supportNewBlendModes ? Tiny.CanvasTinter.tintWithMultiply :  Tiny.CanvasTinter.tintWithPerPixel;


/***/ }),

/***/ "../src/renderer/GraphicsRenderer.js":
/*!*******************************************!*\
  !*** ../src/renderer/GraphicsRenderer.js ***!
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
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            }
        }
        else if (data.type === Tiny.Primitives.RECT)
        {
            if (data.fillColor || data.fillColor === 0)
            {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fillRect(shape.x, shape.y, shape.width, shape.height);
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
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
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
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
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
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
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            }

            if (data.lineWidth)
            {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
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
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.strokeStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
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

/***/ "../src/textures/BaseTexture.js":
/*!**************************************!*\
  !*** ../src/textures/BaseTexture.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.BaseTextureCache = {};

Tiny.BaseTextureCacheIdGenerator = 0;

Tiny.BaseTexture = function(source)
{
    this.resolution = 1;

    this.width = 100;

    this.height = 100;

    this.hasLoaded = false;

    this.source = source;

    this.uid = Tiny._UID++;

    if(!source) return;

    if((this.source.complete || this.source.getContext) && this.source.width && this.source.height)
    {
        this.hasLoaded = true;
        this.width = this.source.naturalWidth || this.source.width;
        this.height = this.source.naturalHeight || this.source.height;
    }
    else
    {
        var scope = this;
        this.source.onload = function() {
            scope.hasLoaded = true;
            scope.width = scope.source.naturalWidth || scope.source.width;
            scope.height = scope.source.naturalHeight || scope.source.height;
        };
    }

    this.imageUrl = null;
};

Tiny.BaseTexture.prototype.constructor = Tiny.BaseTexture;

Tiny.BaseTexture.prototype.destroy = function()
{
    if(this.imageUrl)
    {
        delete Tiny.BaseTextureCache[this.key];
        delete Tiny.TextureCache[this.key];
        this.imageUrl = null;
        if (!navigator.isCocoonJS) this.source.src = '';
    }
    else if (this.source && this.source._pixiId)
    {
        delete Tiny.BaseTextureCache[this.source._pixiId];
    }
    this.source = null;
};

Tiny.BaseTexture.fromImage = function(key, imageUrl, crossorigin)
{
    var baseTexture = Tiny.BaseTextureCache[key];

    if(crossorigin === undefined && imageUrl.indexOf('data:') === -1) crossorigin = true;

    if(!baseTexture)
    {
        // new Image() breaks tex loading in some versions of Chrome.
        // See https://code.google.com/p/chromium/issues/detail?id=238071
        var image = new Image();//document.createElement('img');

        if (crossorigin)
        {
            image.crossOrigin = '';
        }

        image.src = imageUrl;
        baseTexture = new Tiny.BaseTexture(image);
        baseTexture.imageUrl = imageUrl;
        baseTexture.key = key;
        Tiny.BaseTextureCache[key] = baseTexture;
    }

    return baseTexture;
};

Tiny.BaseTexture.fromCanvas = function(canvas)
{
    if(!canvas._pixiId)
    {
        canvas._pixiId = 'canvas_' + Tiny.TextureCacheIdGenerator++;
    }

    var baseTexture = Tiny.BaseTextureCache[canvas._pixiId];

    if(!baseTexture)
    {
        baseTexture = new Tiny.BaseTexture(canvas);
        Tiny.BaseTextureCache[canvas._pixiId] = baseTexture;
    }

    return baseTexture;
};

/***/ }),

/***/ "../src/textures/RenderTexture.js":
/*!****************************************!*\
  !*** ../src/textures/RenderTexture.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.RenderTexture = function(width, height, renderer, resolution)
{
    this.width = width || 100;
    this.height = height || 100;

    this.resolution = resolution || 1;

    this.frame = new Tiny.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);

    this.crop = new Tiny.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);

    this.baseTexture = new Tiny.BaseTexture();
    this.baseTexture.width = this.width * this.resolution;
    this.baseTexture.height = this.height * this.resolution;
    this.baseTexture._glTextures = [];
    this.baseTexture.resolution = this.resolution;

    this.baseTexture.hasLoaded = true;

    Tiny.Texture.call(this,
        this.baseTexture,
        new Tiny.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution)
    );

    this.renderer = renderer || Tiny.defaultRenderer;

    this.render = this.renderCanvas;
    this.textureBuffer = new Tiny.CanvasBuffer(this.width* this.resolution, this.height* this.resolution);
    this.baseTexture.source = this.textureBuffer.canvas;

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
        this.baseTexture.width = this.width * this.resolution;
        this.baseTexture.height = this.height * this.resolution;
    }

    if(!this.valid)return;

    this.textureBuffer.resize(this.width, this.height);
};

Tiny.RenderTexture.prototype.clear = function()
{
    if(!this.valid)return;

    this.textureBuffer.clear();
};

Tiny.RenderTexture.prototype.renderCanvas = function(displayObject, matrix, clear)
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

    this.renderer.renderDisplayObject(displayObject, context);

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

/***/ "../src/textures/Texture.js":
/*!**********************************!*\
  !*** ../src/textures/Texture.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.TextureCache = {};
Tiny.FrameCache = {};

Tiny.TextureSilentFail = false;

Tiny.TextureCacheIdGenerator = 0;

Tiny.Texture = function(baseTexture, frame, crop, trim)
{
    this.noFrame = false;

    if (!frame)
    {
        this.noFrame = true;
        frame = new Tiny.Rectangle(0,0,1,1);
    }

    if (baseTexture instanceof Tiny.Texture)
    {
        baseTexture = baseTexture.baseTexture;
    }

    this.baseTexture = baseTexture;

    this.frame = frame;

    this.trim = trim;

    this.valid = false;

    this.width = 0;

    this.height = 0;

    this.crop = crop || new Tiny.Rectangle(0, 0, 1, 1);

    if (baseTexture.hasLoaded)
    {
        if (this.noFrame) 
            frame = new Tiny.Rectangle(0, 0, baseTexture.width, baseTexture.height);
        this.setFrame(frame);
    }
};

Tiny.Texture.prototype.constructor = Tiny.Texture;

Tiny.Texture.prototype.onBaseTextureLoaded = function()
{
    var baseTexture = this.baseTexture;

    if (this.noFrame) this.frame = new Tiny.Rectangle(0, 0, baseTexture.width, baseTexture.height);

    this.setFrame(this.frame);

};

Tiny.Texture.prototype.destroy = function(destroyBase)
{
    if (destroyBase) this.baseTexture.destroy();

    this.valid = false;
};

Tiny.Texture.prototype.setFrame = function(frame)
{
    this.noFrame = false;

    this.frame = frame;
    this.width = frame.width;
    this.height = frame.height;

    this.crop.x = frame.x;
    this.crop.y = frame.y;
    this.crop.width = frame.width;
    this.crop.height = frame.height;

    if (!this.trim && (frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height))
    {
        if (!Tiny.TextureSilentFail)
        {
            throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);
        }

        this.valid = false;
        return;
    }

    this.valid = frame && frame.width && frame.height && this.baseTexture.source && this.baseTexture.hasLoaded;

    if (this.trim)
    {
        this.width = this.trim.width;
        this.height = this.trim.height;
        this.frame.width = this.trim.width;
        this.frame.height = this.trim.height;
    }
};

Tiny.Texture.fromImage = function(key, imageUrl, crossorigin)
{
    var texture = Tiny.TextureCache[key];

    if(!texture)
    {
        texture = new Tiny.Texture(Tiny.BaseTexture.fromImage(key, imageUrl, crossorigin));
        texture.key = key
        Tiny.TextureCache[key] = texture;
    }

    return texture;
};

Tiny.Texture.fromFrame = function(frameId)
{
    var texture = Tiny.TextureCache[frameId];
    if(!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ');
    return texture;
};

Tiny.Texture.fromCanvas = function(canvas)
{
    var baseTexture = Tiny.BaseTexture.fromCanvas(canvas);

    return new Tiny.Texture( baseTexture );

};

Tiny.Texture.addTextureToCache = function(texture, id)
{
    Tiny.TextureCache[id] = texture;
};


Tiny.Texture.removeTextureFromCache = function(id)
{
    var texture = Tiny.TextureCache[id];
    delete Tiny.TextureCache[id];
    delete Tiny.BaseTextureCache[id];
    return texture;
};

/***/ }),

/***/ "../src/utils/CanvasBuffer.js":
/*!************************************!*\
  !*** ../src/utils/CanvasBuffer.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Tiny.CanvasBuffer = function(width, height)
{

    this.width = width;

    this.height = height;

    this.canvas = document.createElement("canvas");

    this.context = this.canvas.getContext("2d");

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

/***/ "../src/utils/EventTarget.js":
/*!***********************************!*\
  !*** ../src/utils/EventTarget.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

Tiny.EventTarget = {

    call: function callCompat(obj) {
        if(obj) {
            obj = obj.prototype || obj;
            Tiny.EventTarget.mixin(obj);
        }
    },

    mixin: function mixin(obj) {

        obj.listeners = function listeners(eventName) {
            this._listeners = this._listeners || {};

            return this._listeners[eventName] ? this._listeners[eventName].slice() : [];
        };

        obj.emit = obj.dispatchEvent = function emit(eventName, data) {
            this._listeners = this._listeners || {};

            //backwards compat with old method ".emit({ type: 'something' })"
            if (typeof eventName === 'object') {
                data = eventName;
                eventName = eventName.type;
            }

            //ensure we are using a real Tiny event
            if (!data || data.__isEventObject !== true) {
                data = new Tiny.Event(this, eventName, data);
            }

            //iterate the listeners
            if (this._listeners && this._listeners[eventName]) {
                var listeners = this._listeners[eventName].slice(0),
                    length = listeners.length,
                    fn = listeners[0],
                    i;

                for (i = 0; i < length; fn = listeners[++i]) {
                    //call the event listener
                    fn._cb_.call(fn._ctx_, data);

                    //if "stopImmediatePropagation" is called, stop calling sibling events
                    if (data.stoppedImmediate) {
                        return this;
                    }
                }

                //if "stopPropagation" is called then don't bubble the event
                if (data.stopped) {
                    return this;
                }
            }

            //bubble this event up the scene graph
            if (this.parent && this.parent.emit) {
                this.parent.emit.call(this.parent, eventName, data);
            }

            return this;
        };

        obj.on = obj.addEventListener = function on(eventName, fn, cbcontext) {
            this._listeners = this._listeners || {};

            (this._listeners[eventName] = this._listeners[eventName] || [])
                .push({_cb_: fn, _ctx_: cbcontext});

            return this;
        };

        obj.once = function once(eventName, fn, cbcontext) {
            this._listeners = this._listeners || {};

            var self = this;

            function onceHandlerWrapper() {
                fn.apply(cbcontext, arguments);
                self.off(eventName, fn, cbcontext);
            }

            onceHandlerWrapper._originalHandler = fn;

            return this.on(eventName, onceHandlerWrapper, cbcontext);
        };

        obj.off = obj.removeEventListener = function off(eventName, fn, ctx) {
            this._listeners = this._listeners || {};

            if (!this._listeners[eventName])
                return this;

            var list = this._listeners[eventName],
                i = fn ? list.length : 0;

            while (i-- > 0) {
                if (list[i]._cb_ === fn || list[i]._cb_._originalHandler === fn) {
                    if (ctx && list[i]._ctx_) {
                        if (list[i]._ctx_ === ctx) {
                            list.splice(list.indexOf(list[i]), 1);
                        }
                    } else if (!ctx && !list[i]._ctx_) {
                        list.splice(list.indexOf(list[i]), 1);
                    }
                }
            }

            if (list.length === 0) {
                delete this._listeners[eventName];
            }

            return this;
        };

        obj.removeAllListeners = function removeAllListeners(eventName) {
            this._listeners = this._listeners || {};

            if (!this._listeners[eventName])
                return this;

            delete this._listeners[eventName];

            return this;
        };
    }
};

Tiny.Event = function(target, name, data) {
    //for duck typing in the ".on()" function

    for (var k in data) {
        this[k] = data[k]
    }

    this.__isEventObject = true;

    this.stopped = false;

    this.stoppedImmediate = false;

    this.target = target;

    this.type = name;

    this.timeStamp = Date.now();
};

Tiny.Event.prototype.stopPropagation = function stopPropagation() {
    this.stopped = true;
};

Tiny.Event.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
    this.stoppedImmediate = true;
};

/***/ }),

/***/ "../src/utils/RAF.js":
/*!***************************!*\
  !*** ../src/utils/RAF.js ***!
  \***************************/
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

            _timeOutID = window.setTimeout(_onLoop, this.game.time.timeToCall);
        }
        _prevTime = _lastTime
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

/***/ }),

/***/ "../src/utils/Tween.js":
/*!*****************************!*\
  !*** ../src/utils/Tween.js ***!
  \*****************************/
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../src/utils/polyfill.js":
/*!********************************!*\
  !*** ../src/utils/polyfill.js ***!
  \********************************/
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

/***/ }),

/***/ "./base.js":
/*!*****************!*\
  !*** ./base.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../src/utils/polyfill.js */ "../src/utils/polyfill.js");

window.Tiny = __webpack_require__(/*! ../src/Tiny.js */ "../src/Tiny.js");

__webpack_require__(/*! ../src/TinyCommon.js */ "../src/TinyCommon.js");

__webpack_require__(/*! ../src/global.js */ "../src/global.js");
__webpack_require__(/*! ../src/math/Math.js */ "../src/math/Math.js"); // 1 Kb
__webpack_require__(/*! ../src/math/Point.js */ "../src/math/Point.js");      //
__webpack_require__(/*! ../src/math/Matrix.js */ "../src/math/Matrix.js");     //
__webpack_require__(/*! ../src/math/Rectangle.js */ "../src/math/Rectangle.js");  //  8 Kb

__webpack_require__(/*! ../src/display/DisplayObject.js */ "../src/display/DisplayObject.js");             //
__webpack_require__(/*! ../src/display/DisplayObjectContainer.js */ "../src/display/DisplayObjectContainer.js");    //
__webpack_require__(/*! ../src/display/Stage.js */ "../src/display/Stage.js");                     // 10 Kb

__webpack_require__(/*! ../src/renderer/CanvasRenderer.js */ "../src/renderer/CanvasRenderer.js"); // 3 Kb

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./standard.js */ "./standard.js")


__webpack_require__(/*! ../src/math/RoundedRectangle.js */ "../src/math/RoundedRectangle.js");	//
__webpack_require__(/*! ../src/math/Polygon.js */ "../src/math/Polygon.js");			//
__webpack_require__(/*! ../src/math/Circle.js */ "../src/math/Circle.js");			// 6 Kb

__webpack_require__(/*! ../src/renderer/GraphicsRenderer.js */ "../src/renderer/GraphicsRenderer.js"); // 4Kb

__webpack_require__(/*! ../src/objects/Graphics.js */ "../src/objects/Graphics.js"); // 10 Kb
__webpack_require__(/*! ../src/objects/TilingSprite.js */ "../src/objects/TilingSprite.js"); // 4 Kb   ############### TilingSprite  game.add.tilesprite

__webpack_require__(/*! ../src/textures/RenderTexture.js */ "../src/textures/RenderTexture.js"); // 2 Kb

__webpack_require__(/*! ../src/utils/CanvasBuffer.js */ "../src/utils/CanvasBuffer.js"); // 1 Kb
__webpack_require__(/*! ../src/renderer/CanvasMaskManager.js */ "../src/renderer/CanvasMaskManager.js"); // 1Kb
__webpack_require__(/*! ../src/renderer/CanvasTinter.js */ "../src/renderer/CanvasTinter.js"); // 3 Kb ################ tint function


__webpack_require__(/*! ../src/utils/Tween.js */ "../src/utils/Tween.js");


/***/ }),

/***/ "./mini.js":
/*!*****************!*\
  !*** ./mini.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./base.js */ "./base.js")


__webpack_require__(/*! ../src/utils/RAF.js */ "../src/utils/RAF.js"); // 2 Kb

__webpack_require__(/*! ../src/textures/BaseTexture.js */ "../src/textures/BaseTexture.js");	//
__webpack_require__(/*! ../src/textures/Texture.js */ "../src/textures/Texture.js");		// 4 Kb

__webpack_require__(/*! ../src/objects/Sprite.js */ "../src/objects/Sprite.js"); // 3 Kb
__webpack_require__(/*! ../src/objects/Text.js */ "../src/objects/Text.js"); // 5 Kb




/***/ }),

/***/ "./standard.js":
/*!*********************!*\
  !*** ./standard.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./mini.js */ "./mini.js")

__webpack_require__(/*! ../src/managers/ObjectCreator.js */ "../src/managers/ObjectCreator.js"); // 1 Kb
__webpack_require__(/*! ../src/managers/Loader.js */ "../src/managers/Loader.js"); // 3 Kb
__webpack_require__(/*! ../src/managers/Input.js */ "../src/managers/Input.js"); // 1 Kb
__webpack_require__(/*! ../src/managers/Timer.js */ "../src/managers/Timer.js"); // 1 Kb

__webpack_require__(/*! ../src/utils/EventTarget.js */ "../src/utils/EventTarget.js");





/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9UaW55LmpzIiwid2VicGFjazovLy8uLi9zcmMvVGlueUNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2Rpc3BsYXkvRGlzcGxheU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2Rpc3BsYXkvRGlzcGxheU9iamVjdENvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2Rpc3BsYXkvU3RhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tYW5hZ2Vycy9JbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL21hbmFnZXJzL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL21hbmFnZXJzL09iamVjdENyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tYW5hZ2Vycy9UaW1lci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL21hdGgvQ2lyY2xlLmpzIiwid2VicGFjazovLy8uLi9zcmMvbWF0aC9NYXRoLmpzIiwid2VicGFjazovLy8uLi9zcmMvbWF0aC9NYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tYXRoL1BvaW50LmpzIiwid2VicGFjazovLy8uLi9zcmMvbWF0aC9Qb2x5Z29uLmpzIiwid2VicGFjazovLy8uLi9zcmMvbWF0aC9SZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tYXRoL1JvdW5kZWRSZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9vYmplY3RzL0dyYXBoaWNzLmpzIiwid2VicGFjazovLy8uLi9zcmMvb2JqZWN0cy9TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9vYmplY3RzL1RleHQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9vYmplY3RzL1RpbGluZ1Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3JlbmRlcmVyL0NhbnZhc01hc2tNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uLi9zcmMvcmVuZGVyZXIvQ2FudmFzUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXJlci9DYW52YXNUaW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXJlci9HcmFwaGljc1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi9zcmMvdGV4dHVyZXMvQmFzZVRleHR1cmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlLmpzIiwid2VicGFjazovLy8uLi9zcmMvdGV4dHVyZXMvVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3V0aWxzL0NhbnZhc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3V0aWxzL0V2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovLy8uLi9zcmMvdXRpbHMvUkFGLmpzIiwid2VicGFjazovLy8uLi9zcmMvdXRpbHMvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy91dGlscy9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9iYXNlLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL21pbmkuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhbmRhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQjs7Ozs7Ozs7Ozs7O0FDMURBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNqT0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdGQUF3Rjs7QUFFeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELG1EOzs7Ozs7Ozs7Ozs7QUMzVkE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLDBCQUEwQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDL1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsb0RBQW9ELFFBQVE7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQseUNBQXlDLHlCQUF5Qjs7QUFFbEU7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHlCQUF5QjtBQUM3RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQzlNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUM1REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDbEhBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUM1VEE7O0FBRUE7QUFDQSxnREFBZ0Qsa0JBQWtCO0FBQ2xFO0FBQ0EsUUFBUTs7QUFFUjtBQUNBLGdEQUFnRCxrQkFBa0I7QUFDbEU7QUFDQSxRQUFROztBQUVSO0FBQ0EsZ0RBQWdELGtCQUFrQjtBQUNsRTtBQUNBLFFBQVE7O0FBRVI7QUFDQSxnREFBZ0Qsa0JBQWtCO0FBQ2xFO0FBQ0EsUUFBUTs7QUFFUjtBQUNBLGdEQUFnRCxrQkFBa0I7QUFDbEU7QUFDQSxRQUFROztBQUVSOztBQUVBOztBQUVBLDBCQUEwQixzQkFBc0I7QUFDaEQ7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSOztBQUVBLDhDQUE4QyxXQUFXOztBQUV6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBLDhDQUE4QyxXQUFXOztBQUV6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBLDhDQUE4QyxXQUFXOztBQUV6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBLDZDQUE2QyxhQUFhOztBQUUxRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQSw4Q0FBOEMsV0FBVztBQUN6RCw2Q0FBNkMsV0FBVzs7QUFFeEQ7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQSw4Q0FBOEMsV0FBVztBQUN6RCw2Q0FBNkMsV0FBVzs7QUFFeEQ7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQSw4Q0FBOEMsV0FBVztBQUN6RCw2Q0FBNkMsV0FBVzs7QUFFeEQ7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjs7QUFFQTtBQUNBOztBQUVBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQXNELFNBQVM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNEQUFzRCxTQUFTO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQXNELFNBQVM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTs7QUFFQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSOztBQUVBLHFEQUFxRCxvQkFBb0I7QUFDekUscURBQXFELG9CQUFvQjtBQUN6RSxrREFBa0QsaUJBQWlCOztBQUVuRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQkFBMEIsWUFBWTs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQjs7QUFFbkIsUUFBUTs7QUFFUjs7QUFFQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBLDRDQUE0QyxTQUFTOztBQUVyRDs7QUFFQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjs7QUFFQSw2Q0FBNkMsVUFBVTs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUMvbEJBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3Qzs7Ozs7Ozs7Ozs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsNENBQTRDLGFBQWE7O0FBRXpELHVCQUF1Qix5QkFBeUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBLHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0RBQWdELFNBQVM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0QsU0FBUztBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN2TEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQSwwQ0FBMEMsT0FBTzs7QUFFakQ7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUEsUUFBUTs7O0FBR1I7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBOztBQUVBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsOENBQThDLGVBQWU7O0FBRTdEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7O0FBRUEscUQ7Ozs7Ozs7Ozs7O0FDeGhCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9FOzs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyx1QkFBdUI7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDhCQUE4QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixtQkFBbUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7O0FDdjJCRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDM1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtGOzs7Ozs7Ozs7OztBQ2xZQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0IsaUJBQWlCLE9BQU87QUFDeEIsa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRTs7Ozs7Ozs7Ozs7O0FDcFhBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQSxDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxnREFBZ0QsMEJBQTBCOztBQUUxRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxDO0FBQ0EsNENBQTRDLG1CQUFtQjs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUM5SEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3ZMQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGtDQUFrQztBQUNyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx5QkFBeUIscUJBQXFCO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixrQ0FBa0M7QUFDckQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNuVkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNoSEE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDNUlBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQzNCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1REFBdUQsb0JBQW9CO0FBQzNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsWUFBWTtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsMkJBQTJCOztBQUVsRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ3pKQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLHlCQUF5QjtBQUNqRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIscURBQXFEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7O0FBRXZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQSxnRUFBZ0Usc0JBQXNCO0FBQ3RGO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTs7QUFFQSxrRUFBa0Usc0JBQXNCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsb0I7Ozs7Ozs7Ozs7OztBQ2g4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ1RBLG1CQUFPLENBQUMsMERBQTBCOztBQUVsQyxjQUFjLG1CQUFPLENBQUMsc0NBQWdCOztBQUV0QyxtQkFBTyxDQUFDLGtEQUFzQjs7QUFFOUIsbUJBQU8sQ0FBQywwQ0FBa0I7QUFDMUIsbUJBQU8sQ0FBQyxnREFBcUIsRUFBRTtBQUMvQixtQkFBTyxDQUFDLGtEQUFzQixFQUFFO0FBQ2hDLG1CQUFPLENBQUMsb0RBQXVCLEVBQUU7QUFDakMsbUJBQU8sQ0FBQywwREFBMEIsRUFBRTs7QUFFcEMsbUJBQU8sQ0FBQyx3RUFBaUMsRUFBRTtBQUMzQyxtQkFBTyxDQUFDLDBGQUEwQyxFQUFFO0FBQ3BELG1CQUFPLENBQUMsd0RBQXlCLEVBQUU7O0FBRW5DLG1CQUFPLENBQUMsNEVBQW1DLEVBQUUsUTs7Ozs7Ozs7Ozs7QUNoQjdDLG1CQUFPLENBQUMsb0NBQWU7OztBQUd2QixtQkFBTyxDQUFDLHdFQUFpQyxFQUFFO0FBQzNDLG1CQUFPLENBQUMsc0RBQXdCLEVBQUU7QUFDbEMsbUJBQU8sQ0FBQyxvREFBdUIsRUFBRTs7QUFFakMsbUJBQU8sQ0FBQyxnRkFBcUMsRUFBRTs7QUFFL0MsbUJBQU8sQ0FBQyw4REFBNEIsRUFBRTtBQUN0QyxtQkFBTyxDQUFDLHNFQUFnQyxFQUFFOztBQUUxQyxtQkFBTyxDQUFDLDBFQUFrQyxFQUFFOztBQUU1QyxtQkFBTyxDQUFDLGtFQUE4QixFQUFFO0FBQ3hDLG1CQUFPLENBQUMsa0ZBQXNDLEVBQUU7QUFDaEQsbUJBQU8sQ0FBQyx3RUFBaUMsRUFBRTs7O0FBRzNDLG1CQUFPLENBQUMsb0RBQXVCOzs7Ozs7Ozs7Ozs7QUNuQi9CLG1CQUFPLENBQUMsNEJBQVc7OztBQUduQixtQkFBTyxDQUFDLGdEQUFxQixFQUFFOztBQUUvQixtQkFBTyxDQUFDLHNFQUFnQyxFQUFFO0FBQzFDLG1CQUFPLENBQUMsOERBQTRCLEVBQUU7O0FBRXRDLG1CQUFPLENBQUMsMERBQTBCLEVBQUU7QUFDcEMsbUJBQU8sQ0FBQyxzREFBd0IsRUFBRTs7Ozs7Ozs7Ozs7Ozs7QUNUbEMsbUJBQU8sQ0FBQyw0QkFBVzs7QUFFbkIsbUJBQU8sQ0FBQywwRUFBa0MsRUFBRTtBQUM1QyxtQkFBTyxDQUFDLDREQUEyQixFQUFFO0FBQ3JDLG1CQUFPLENBQUMsMERBQTBCLEVBQUU7QUFDcEMsbUJBQU8sQ0FBQywwREFBMEIsRUFBRTs7QUFFcEMsbUJBQU8sQ0FBQyxnRUFBNkIiLCJmaWxlIjoidGlueS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwidmFyIFRpbnkgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBwYXJlbnROb2RlLCBlbmFibGVSQUYsIHN0YXRlcylcclxue1xyXG4gICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnROb2RlKSA6IGRvY3VtZW50LmJvZHk7XHJcbiAgICB0aGlzLl9wcmVib290KHdpZHRoLCBoZWlnaHQsIGVuYWJsZVJBRiwgc3RhdGVzKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRpbnkuQ2FudmFzUmVuZGVyZXIodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsXHJcbiAgICB7XHJcbiAgICAgICAgYXV0b1Jlc2l6ZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmNhbnZhcyA9IHRoaXMuaW5wdXRWaWV3ID0gdGhpcy5yZW5kZXJlci52aWV3O1xyXG5cclxuICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodmlldyk7XHJcbiAgICB2aWV3LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHJcbiAgICB2aWV3LnN0eWxlLnRvcCA9IFwiMHB4XCI7XHJcbiAgICB2aWV3LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG5cclxuICAgIHZpZXcuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJzAlIDAlJztcclxuICAgIHZpZXcuc3R5bGUucGVyc3BlY3RpdmUgPSAnMTAwMHB4JztcclxuXHJcbiAgICB0aGlzLl9ib290KCk7XHJcbn1cclxuXHJcblRpbnkucHJvdG90eXBlLl9wcmVsb2FkID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLnByZWxvYWQuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcbiAgICB0aGlzLnN0YXRlID0gMTtcclxuXHJcbiAgICBpZiAoVGlueS5Mb2FkZXIpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZC5zdGFydCh0aGlzLl9jcmVhdGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9jcmVhdGUoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkucHJvdG90eXBlLnNldFBpeGVsUmF0aW8gPSBmdW5jdGlvbihkcHIpXHJcbntcclxuICAgIHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbiA9IGRwcjtcclxufTtcclxuXHJcblRpbnkucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc3RhZ2UpO1xyXG59O1xyXG5cclxuVGlueS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgc2NhbGUpXHJcbntcclxuICAgIHRoaXMuX3Jlc2l6ZSh3aWR0aCwgaGVpZ2h0LCBzY2FsZSk7XHJcbn07XHJcblxyXG5UaW55LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLl9kZXN0cm95KCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRpbnk7IiwiXHJcbnZhciBfdHdlZW5fZW5hYmxlZCA9IGZhbHNlO1xyXG5cclxudmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxudmFyIENPTU1PTiA9IHtcclxuXHJcbiAgICBfcHJlYm9vdDogZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgZW5hYmxlUkFGLCBzdGF0ZXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNzIwO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA0MzA7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tDb250ZXh0ID0gdGhpcztcclxuICAgICAgICBzdGF0ZXMgPSBzdGF0ZXMgfHwge307XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5wcmVsb2FkID0gdGhpcy5wcmVsb2FkIHx8IHN0YXRlcy5wcmVsb2FkIHx8IG5vb3A7XHJcbiAgICAgICAgdGhpcy5jcmVhdGUgPSB0aGlzLmNyZWF0ZSB8fCBzdGF0ZXMuY3JlYXRlIHx8IG5vb3A7XHJcbiAgICAgICAgdGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZSB8fCBzdGF0ZXMudXBkYXRlIHx8IG5vb3A7XHJcbiAgICAgICAgdGhpcy5fcmVzaXplX2NiID0gdGhpcy5fcmVzaXplX2NiIHx8IHN0YXRlcy5yZXNpemUgfHwgbm9vcDtcclxuICAgICAgICB0aGlzLl9kZXN0cm95X2NiID0gdGhpcy5fZGVzdHJveV9jYiB8fCBzdGF0ZXMuZGVzdHJveSB8fCBub29wO1xyXG5cclxuICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFRpbnkuU3RhZ2UodGhpcyk7XHJcblxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5UV0VFTiA9PSBcIm9iamVjdFwiKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF90d2Vlbl9lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JhZiA9IGVuYWJsZVJBRiAmJiBUaW55LlJBRjtcclxuXHJcblxyXG4gICAgICAgIHRoaXMudGltZSA9IHtcclxuICAgICAgICAgICAgdGltZVRvQ2FsbDogMTVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYXVzZUR1cmF0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnR3ZWVucyA9IFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYm9vdDogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChUaW55LkxvYWRlcikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQgPSBuZXcgVGlueS5Mb2FkZXIodGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChUaW55Lk9iamVjdENyZWF0b3IpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hZGQgPSBuZXcgVGlueS5PYmplY3RDcmVhdG9yKHRoaXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoVGlueS5JbnB1dCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gbmV3IFRpbnkuSW5wdXQodGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChUaW55LlRpbWVyQ3JlYXRvcikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gbmV3IFRpbnkuVGltZXJDcmVhdG9yKHRoaXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoVGlueS5QYXJ0aWNsZXMpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBuZXcgVGlueS5QYXJ0aWNsZXModGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yYWYpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWYgPSBuZXcgVGlueS5SQUYodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUaW55LmRlZmF1bHRSZW5kZXJlciA9IHRoaXMucmVuZGVyZXJcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYuX3ByZWxvYWQoKVxyXG4gICAgICAgIH0sIDApXHJcbiAgICB9LFxyXG5cclxuICAgIF9yZXNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIHNjYWxlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCB0aGlzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID4gMCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNpemVfY2IuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHNjYWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGU6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZS5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3JhZikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDI7XHJcbiAgICB9LFxyXG5cclxuICAgIHBhdXNlOiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhdXNlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfdHdlZW5fZW5hYmxlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50d2VlbnMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIFRXRUVOLl90d2VlbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50d2VlbnMucHVzaChUV0VFTi5fdHdlZW5zW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICBUV0VFTi5fdHdlZW5zW2tdLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICByZXN1bWU6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5wYXVzZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3R3ZWVuX2VuYWJsZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHdlZW5zLmZvckVhY2goZnVuY3Rpb24odHdlZW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHdlZW4ucmVzdW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudHdlZW5zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlOiBmdW5jdGlvbih0aW1lLCBkZWx0YSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMucGF1c2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCwgdGltZSwgZGVsdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKF90d2Vlbl9lbmFibGVkKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVFdFRU4udXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVycykgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXJzLmZvckVhY2goZnVuY3Rpb24oZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGljbGVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlcy51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VEdXJhdGlvbiArPSBkZWx0YVxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9kZXN0cm95OiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKFRpbnkuSW5wdXQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX3R3ZWVuX2VuYWJsZWQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVFdFRU4ucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lcnMpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lci5yZW1vdmVBbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0YWdlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LlRleHR1cmVDYWNoZSkgVGlueS5UZXh0dXJlQ2FjaGVbeV0uZGVzdHJveSh0cnVlKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LkJhc2VUZXh0dXJlQ2FjaGUpIFRpbnkuQmFzZVRleHR1cmVDYWNoZVt5XS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgIFRpbnkuQmFzZVRleHR1cmVDYWNoZSA9IFtdO1xyXG4gICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlID0gW107XHJcbiAgICAgICAgdGhpcy5zdGFnZS5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5kZXN0cm95KHRydWUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmFmKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFmLnN0b3AoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lfY2IuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5DT01NT04uc3RvcCA9IENPTU1PTi5wYXVzZTtcclxuQ09NTU9OLnBsYXkgPSBDT01NT04ucmVzdW1lO1xyXG5DT01NT04uc2V0U2l6ZSA9IENPTU1PTi5yZXNpemU7XHJcblxyXG5mb3IgKHZhciBrZXkgaW4gQ09NTU9OKSBcclxue1xyXG4gICAgVGlueS5wcm90b3R5cGVba2V5XSA9IENPTU1PTltrZXldO1xyXG59IiwiXHJcbnZhciBwaTIgPSBNYXRoLlBJICogMjtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUaW55LlBvaW50KDEsIDEpO1xyXG4gICAgdGhpcy5waXZvdCA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmFscGhhID0gMTtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLmhpdEFyZWEgPSBudWxsO1xyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLnN0YWdlID0gbnVsbDtcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLl9zciA9IDA7XHJcbiAgICB0aGlzLl9jciA9IDE7XHJcbiAgICB0aGlzLl9ib3VuZHMgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX21hc2sgPSBudWxsO1xyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fY2FjaGVJc0RpcnR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmlucHV0ID0gbnVsbFxyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsICdpbnB1dEVuYWJsZWQnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5lbmFibGVkKVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ID0ge2VuYWJsZWQ6IHRydWUsIHBhcmVudDogdGhpc31cclxuICAgICAgICAgICAgICAgIFRpbnkuRXZlbnRUYXJnZXQubWl4aW4odGhpcy5pbnB1dClcclxuICAgICAgICAgICAgfSBlbHNlIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5lbmFibGVkID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgIT09IG51bGwgJiYgKHRoaXMuaW5wdXQuZW5hYmxlZCA9IGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuRGlzcGxheU9iamVjdDtcclxuXHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIHdoaWxlIChpLS0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXJlbnQpXHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQoIHRoaXMgKVxyXG5cclxuICAgIHRoaXMuaGl0QXJlYSA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLnN0YWdlID0gbnVsbDtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBudWxsO1xyXG4gICAgdGhpcy5fYm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFzayA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSwgJ3dvcmxkVmlzaWJsZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgaXRlbSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW0udmlzaWJsZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpdGVtID0gaXRlbS5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlKGl0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsICdtYXNrJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hc2s7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHRoaXMuX21hc2suaXNNYXNrID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX21hc2sgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHRoaXMuX21hc2suaXNNYXNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsICdjYWNoZUFzQml0bWFwJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwID09PSB2YWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICghdGhpcy5wYXJlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBzb21lIG1hdHJpeCByZWZzIGZvciBlYXN5IGFjY2Vzc1xyXG4gICAgdmFyIHB0ID0gdGhpcy5wYXJlbnQud29ybGRUcmFuc2Zvcm07XHJcbiAgICB2YXIgd3QgPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIC8vIHRlbXBvcmFyeSBtYXRyaXggdmFyaWFibGVzXHJcbiAgICB2YXIgYSwgYiwgYywgZCwgdHgsIHR5O1xyXG5cclxuICAgIC8vIHNvIGlmIHJvdGF0aW9uIGlzIGJldHdlZW4gMCB0aGVuIHdlIGNhbiBzaW1wbGlmeSB0aGUgbXVsdGlwbGljYXRpb24gcHJvY2Vzcy4uXHJcbiAgICBpZiAodGhpcy5yb3RhdGlvbiAlIHBpMilcclxuICAgIHtcclxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHJvdGF0aW9uIGlzIHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91cyByZW5kZXIuIFRoaXMgbWVhbnMgd2Ugb25seSBuZWVkIHRvIHVzZSBzaW4gYW5kIGNvcyB3aGVuIHJvdGF0aW9uIGFjdHVhbGx5IGNoYW5nZXNcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbiAhPT0gdGhpcy5yb3RhdGlvbkNhY2hlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkNhY2hlID0gdGhpcy5yb3RhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fc3IgPSBNYXRoLnNpbih0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fY3IgPSBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbWF0cml4IHZhbHVlcyBvZiB0aGUgZGlzcGxheW9iamVjdCBiYXNlZCBvbiBpdHMgdHJhbnNmb3JtIHByb3BlcnRpZXMuLlxyXG4gICAgICAgIGEgID0gIHRoaXMuX2NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGIgID0gIHRoaXMuX3NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGMgID0gLXRoaXMuX3NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIGQgID0gIHRoaXMuX2NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIHR4ID0gIHRoaXMucG9zaXRpb24ueDtcclxuICAgICAgICB0eSA9ICB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIHBpdm90Li4gbm90IG9mdGVuIHVzZWQgc28gZ2VhcmVkIHRvd2FyZHMgdGhhdCBmYWN0IVxyXG4gICAgICAgIGlmICh0aGlzLnBpdm90LnggfHwgdGhpcy5waXZvdC55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHggLT0gdGhpcy5waXZvdC54ICogYSArIHRoaXMucGl2b3QueSAqIGM7XHJcbiAgICAgICAgICAgIHR5IC09IHRoaXMucGl2b3QueCAqIGIgKyB0aGlzLnBpdm90LnkgKiBkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uY2F0IHRoZSBwYXJlbnQgbWF0cml4IHdpdGggdGhlIG9iamVjdHMgdHJhbnNmb3JtLlxyXG4gICAgICAgIHd0LmEgID0gYSAgKiBwdC5hICsgYiAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmIgID0gYSAgKiBwdC5iICsgYiAgKiBwdC5kO1xyXG4gICAgICAgIHd0LmMgID0gYyAgKiBwdC5hICsgZCAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgID0gYyAgKiBwdC5iICsgZCAgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICAvLyBsZXRzIGRvIHRoZSBmYXN0IHZlcnNpb24gYXMgd2Uga25vdyB0aGVyZSBpcyBubyByb3RhdGlvbi4uXHJcbiAgICAgICAgYSAgPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgZCAgPSB0aGlzLnNjYWxlLnk7XHJcblxyXG4gICAgICAgIHR4ID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy5waXZvdC54ICogYTtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueSAtIHRoaXMucGl2b3QueSAqIGQ7XHJcblxyXG4gICAgICAgIHd0LmEgID0gYSAgKiBwdC5hO1xyXG4gICAgICAgIHd0LmIgID0gYSAgKiBwdC5iO1xyXG4gICAgICAgIHd0LmMgID0gZCAgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgID0gZCAgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtdWx0aXBseSB0aGUgYWxwaGFzLi5cclxuICAgIHRoaXMud29ybGRBbHBoYSA9IHRoaXMuYWxwaGEgKiB0aGlzLnBhcmVudC53b3JsZEFscGhhO1xyXG5cclxufTtcclxuXHJcbi8vIHBlcmZvcm1hbmNlIGluY3JlYXNlIHRvIGF2b2lkIHVzaW5nIGNhbGwuLiAoMTB4IGZhc3RlcilcclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtID0gVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKG1hdHJpeClcclxue1xyXG4gICAgbWF0cml4ID0gbWF0cml4Oy8vanVzdCB0byBnZXQgcGFzc2VkIGpzIGhpbnRpbmcgKGFuZCBwcmVzZXJ2ZSBpbmhlcml0YW5jZSlcclxuICAgIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5nZXRMb2NhbEJvdW5kcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRzKFRpbnkuaWRlbnRpdHlNYXRyaXgpO1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5zZXRTdGFnZVJlZmVyZW5jZSA9IGZ1bmN0aW9uKHN0YWdlKVxyXG57XHJcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnByZVVwZGF0ZSA9IGZ1bmN0aW9uKClcclxue1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5nZW5lcmF0ZVRleHR1cmUgPSBmdW5jdGlvbihyZXNvbHV0aW9uLCByZW5kZXJlcilcclxue1xyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICB2YXIgcmVuZGVyVGV4dHVyZSA9IG5ldyBUaW55LlJlbmRlclRleHR1cmUoYm91bmRzLndpZHRoIHwgMCwgYm91bmRzLmhlaWdodCB8IDAsIHJlbmRlcmVyLCByZXNvbHV0aW9uKTtcclxuICAgIFxyXG4gICAgVGlueS5EaXNwbGF5T2JqZWN0Ll90ZW1wTWF0cml4LnR4ID0gLWJvdW5kcy54O1xyXG4gICAgVGlueS5EaXNwbGF5T2JqZWN0Ll90ZW1wTWF0cml4LnR5ID0gLWJvdW5kcy55O1xyXG4gICAgXHJcbiAgICByZW5kZXJUZXh0dXJlLnJlbmRlcih0aGlzLCBUaW55LkRpc3BsYXlPYmplY3QuX3RlbXBNYXRyaXgpO1xyXG5cclxuICAgIHJldHVybiByZW5kZXJUZXh0dXJlO1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS51cGRhdGVDYWNoZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxufTtcclxuXHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnRvR2xvYmFsID0gZnVuY3Rpb24ocG9zaXRpb24pXHJcbntcclxuICAgIC8vIGRvbid0IG5lZWQgdG8gdVtkYXRlIHRoZSBsb3RcclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgcmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHkocG9zaXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS50b0xvY2FsID0gZnVuY3Rpb24ocG9zaXRpb24sIGZyb20pXHJcbntcclxuICAgIGlmIChmcm9tKVxyXG4gICAge1xyXG4gICAgICAgIHBvc2l0aW9uID0gZnJvbS50b0dsb2JhbChwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG9uJ3QgbmVlZCB0byB1W2RhdGUgdGhlIGxvdFxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuX3JlbmRlckNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzLmNhbGwodGhpcy5fY2FjaGVkU3ByaXRlLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIFxyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGxcclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIGlmICghdGhpcy5fY2FjaGVkU3ByaXRlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZW5kZXJUZXh0dXJlID0gbmV3IFRpbnkuUmVuZGVyVGV4dHVyZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7Ly8sIHJlbmRlclNlc3Npb24ucmVuZGVyZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBuZXcgVGlueS5TcHJpdGUocmVuZGVyVGV4dHVyZSk7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5yZXNpemUoYm91bmRzLndpZHRoIHwgMCwgYm91bmRzLmhlaWdodCB8IDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBUaW55LkRpc3BsYXlPYmplY3QuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkRpc3BsYXlPYmplY3QuX3RlbXBNYXRyaXgudHkgPSAtYm91bmRzLnk7XHJcbiAgICBcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlbmRlcih0aGlzLCBUaW55LkRpc3BsYXlPYmplY3QuX3RlbXBNYXRyaXgsIHRydWUpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueCA9IC0oIGJvdW5kcy54IC8gYm91bmRzLndpZHRoICk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnkgPSAtKCBib3VuZHMueSAvIGJvdW5kcy5oZWlnaHQgKTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICghdGhpcy5fY2FjaGVkU3ByaXRlKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUuZGVzdHJveSh0cnVlKTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsO1xyXG59O1xyXG5cclxuXHJcblRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuX3JlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIFxyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsICd4Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLnBvc2l0aW9uLng7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsICd5Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Ll90ZW1wTWF0cml4ID0gbmV3IFRpbnkuTWF0cml4KCk7IiwiXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lciA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgVGlueS5EaXNwbGF5T2JqZWN0LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgXHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSApO1xyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUsICd3aWR0aCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGg7XHJcblxyXG4gICAgICAgIGlmKHdpZHRoICE9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ID0gdmFsdWUgLyB3aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUsICdoZWlnaHQnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuc2NhbGUueSAqIHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChoZWlnaHQgIT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIGhlaWdodCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5hZGRDaGlsZEF0KGNoaWxkLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCk7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbihjaGlsZCwgaW5kZXgpXHJcbntcclxuICAgIGlmKGluZGV4ID49IDAgJiYgaW5kZXggPD0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2hpbGQucGFyZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNoaWxkLmdhbWUgPSB0aGlzLmdhbWU7XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc3RhZ2UpY2hpbGQuc2V0U3RhZ2VSZWZlcmVuY2UodGhpcy5zdGFnZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY2hpbGQgKyAnYWRkQ2hpbGRBdDogVGhlIGluZGV4ICcrIGluZGV4ICsnIHN1cHBsaWVkIGlzIG91dCBvZiBib3VuZHMgJyArIHRoaXMuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuc3dhcENoaWxkcmVuID0gZnVuY3Rpb24oY2hpbGQsIGNoaWxkMilcclxue1xyXG4gICAgaWYoY2hpbGQgPT09IGNoaWxkMikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaW5kZXgxID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcclxuICAgIHZhciBpbmRleDIgPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQyKTtcclxuXHJcbiAgICBpZihpbmRleDEgPCAwIHx8IGluZGV4MiA8IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N3YXBDaGlsZHJlbjogQm90aCB0aGUgc3VwcGxpZWQgRGlzcGxheU9iamVjdHMgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXIuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbltpbmRleDFdID0gY2hpbGQyO1xyXG4gICAgdGhpcy5jaGlsZHJlbltpbmRleDJdID0gY2hpbGQ7XHJcblxyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24oY2hpbGQpXHJcbntcclxuICAgIHZhciBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHN1cHBsaWVkIERpc3BsYXlPYmplY3QgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXInKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbmRleDtcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuc2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uKGNoaWxkLCBpbmRleClcclxue1xyXG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmNoaWxkcmVuLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzdXBwbGllZCBpbmRleCBpcyBvdXQgb2YgYm91bmRzJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGN1cnJlbnRJbmRleCwgMSk7IC8vcmVtb3ZlIGZyb20gb2xkIHBvc2l0aW9uXHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpOyAvL2FkZCBhdCBuZXcgcG9zaXRpb25cclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q2hpbGRBdCA9IGZ1bmN0aW9uKGluZGV4KVxyXG57XHJcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0Q2hpbGRBdDogU3VwcGxpZWQgaW5kZXggJysgaW5kZXggKycgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkIGxpc3QsIG9yIHRoZSBzdXBwbGllZCBEaXNwbGF5T2JqZWN0IG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltpbmRleF07XHJcbiAgICBcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihjaGlsZClcclxue1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKCBjaGlsZCApO1xyXG4gICAgaWYoaW5kZXggPT09IC0xKXJldHVybjtcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlQ2hpbGRBdCggaW5kZXggKTtcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdCA9IGZ1bmN0aW9uKGluZGV4KVxyXG57XHJcbiAgICB2YXIgY2hpbGQgPSB0aGlzLmdldENoaWxkQXQoIGluZGV4ICk7XHJcbiAgICBpZih0aGlzLnN0YWdlKVxyXG4gICAgICAgIGNoaWxkLnJlbW92ZVN0YWdlUmVmZXJlbmNlKCk7XHJcblxyXG4gICAgY2hpbGQucGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoIGluZGV4LCAxICk7XHJcbiAgICByZXR1cm4gY2hpbGQ7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkcmVuID0gZnVuY3Rpb24oYmVnaW5JbmRleCwgZW5kSW5kZXgpXHJcbntcclxuICAgIHZhciBiZWdpbiA9IGJlZ2luSW5kZXggfHwgMDtcclxuICAgIHZhciBlbmQgPSB0eXBlb2YgZW5kSW5kZXggPT09ICdudW1iZXInID8gZW5kSW5kZXggOiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgIHZhciByYW5nZSA9IGVuZCAtIGJlZ2luO1xyXG5cclxuICAgIGlmIChyYW5nZSA+IDAgJiYgcmFuZ2UgPD0gZW5kKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZW1vdmVkID0gdGhpcy5jaGlsZHJlbi5zcGxpY2UoYmVnaW4sIHJhbmdlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW92ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gcmVtb3ZlZFtpXTtcclxuICAgICAgICAgICAgaWYodGhpcy5zdGFnZSlcclxuICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZVN0YWdlUmVmZXJlbmNlKCk7XHJcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyYW5nZSA9PT0gMCAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAncmVtb3ZlQ2hpbGRyZW46IFJhbmdlIEVycm9yLCBudW1lcmljIHZhbHVlcyBhcmUgb3V0c2lkZSB0aGUgYWNjZXB0YWJsZSByYW5nZScgKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZighdGhpcy52aXNpYmxlKXJldHVybjtcclxuXHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICBpZih0aGlzLl9jYWNoZUFzQml0bWFwKXJldHVybjtcclxuXHJcbiAgICBmb3IodmFyIGk9MCxqPXRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpPGo7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gcGVyZm9ybWFuY2UgaW5jcmVhc2UgdG8gYXZvaWQgdXNpbmcgY2FsbC4uICgxMHggZmFzdGVyKVxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmRpc3BsYXlPYmplY3RDb250YWluZXJVcGRhdGVUcmFuc2Zvcm0gPSBUaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClyZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuICAgIGlmICh0aGlzLl9jYWNoZWRTcHJpdGUpIHJldHVybiB0aGlzLl9jYWNoZWRTcHJpdGUuZ2V0Qm91bmRzKClcclxuXHJcbiAgICAvLyBUT0RPIHRoZSBib3VuZHMgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsY3VsYXRlZCB0aGlzIHJlbmRlciBzZXNzaW9uIHNvIHJldHVybiB3aGF0IHdlIGhhdmVcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBjaGlsZEJvdW5kcztcclxuICAgIHZhciBjaGlsZE1heFg7XHJcbiAgICB2YXIgY2hpbGRNYXhZO1xyXG5cclxuICAgIHZhciBjaGlsZFZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICBmb3IodmFyIGk9MCxqPXRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpPGo7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFjaGlsZC52aXNpYmxlKWNvbnRpbnVlO1xyXG5cclxuICAgICAgICBjaGlsZFZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICBjaGlsZEJvdW5kcyA9IHRoaXMuY2hpbGRyZW5baV0uZ2V0Qm91bmRzKCk7XHJcbiAgICAgXHJcbiAgICAgICAgbWluWCA9IG1pblggPCBjaGlsZEJvdW5kcy54ID8gbWluWCA6IGNoaWxkQm91bmRzLng7XHJcbiAgICAgICAgbWluWSA9IG1pblkgPCBjaGlsZEJvdW5kcy55ID8gbWluWSA6IGNoaWxkQm91bmRzLnk7XHJcblxyXG4gICAgICAgIGNoaWxkTWF4WCA9IGNoaWxkQm91bmRzLndpZHRoICsgY2hpbGRCb3VuZHMueDtcclxuICAgICAgICBjaGlsZE1heFkgPSBjaGlsZEJvdW5kcy5oZWlnaHQgKyBjaGlsZEJvdW5kcy55O1xyXG5cclxuICAgICAgICBtYXhYID0gbWF4WCA+IGNoaWxkTWF4WCA/IG1heFggOiBjaGlsZE1heFg7XHJcbiAgICAgICAgbWF4WSA9IG1heFkgPiBjaGlsZE1heFkgPyBtYXhZIDogY2hpbGRNYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFjaGlsZFZpc2libGUpXHJcbiAgICAgICAgcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuICAgIGJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAvLyBUT0RPOiBzdG9yZSBhIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYWdhaW4gaW4gdGhlIHJlbmRlciBjeWNsZSB3ZSBkbyBub3QgaGF2ZSB0byByZWNhbGN1bGF0ZVxyXG4gICAgLy90aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG4gICBcclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgbWF0cml4Q2FjaGUgPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBUaW55LmlkZW50aXR5TWF0cml4O1xyXG5cclxuICAgIGZvcih2YXIgaT0wLGo9dGhpcy5jaGlsZHJlbi5sZW5ndGg7IGk8ajsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XHJcblxyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG1hdHJpeENhY2hlO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnNldFN0YWdlUmVmZXJlbmNlID0gZnVuY3Rpb24oc3RhZ2UpXHJcbntcclxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuICAgIFxyXG4gICAgZm9yICh2YXIgaT0wOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnNldFN0YWdlUmVmZXJlbmNlKHN0YWdlKVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVTdGFnZVJlZmVyZW5jZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVtb3ZlU3RhZ2VSZWZlcmVuY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YWdlID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuX3JlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0uX3JlbmRlckNhbnZhcyhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07IiwiVGlueS5TdGFnZSA9IGZ1bmN0aW9uKGdhbWUpXHJcbntcclxuICAgIFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKCB0aGlzICk7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICB0aGlzLnN0YWdlID0gdGhpcztcclxuXHJcbiAgICB0aGlzLnNldEJhY2tncm91bmRDb2xvcigweGZmZmZmZilcclxufTtcclxuXHJcblRpbnkuU3RhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSApO1xyXG5UaW55LlN0YWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuU3RhZ2U7XHJcblxyXG5UaW55LlN0YWdlLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuVGlueS5TdGFnZS5wcm90b3R5cGUuc2V0QmFja2dyb3VuZENvbG9yID0gZnVuY3Rpb24oYmFja2dyb3VuZENvbG9yKVxyXG57XHJcbiAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvciB8fCAweDAwMDAwMDtcclxuICAgIHRoaXMuYmFja2dyb3VuZENvbG9yU3BsaXQgPSBUaW55LmhleDJyZ2IodGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgdmFyIGhleCA9IHRoaXMuYmFja2dyb3VuZENvbG9yLnRvU3RyaW5nKDE2KTtcclxuICAgIGhleCA9ICcwMDAwMDAnLnN1YnN0cigwLCA2IC0gaGV4Lmxlbmd0aCkgKyBoZXg7XHJcbiAgICB0aGlzLmJhY2tncm91bmRDb2xvclN0cmluZyA9ICcjJyArIGhleDtcclxufTsiLCJcclxuVGlueS5WRVJTSU9OID0gXCIxLjQuNFwiO1xyXG5UaW55Ll9VSUQgPSAwO1xyXG5cclxuVGlueS5Qb2x5Z29uID0gZnVuY3Rpb24oKSB7fVxyXG5cclxuVGlueS5QcmltaXRpdmVzID0ge1xyXG4gICAgUE9MWTogMCxcclxuICAgIFJFQ1Q6IDEsIFxyXG4gICAgQ0lSQzogMixcclxuICAgIEVMSVA6IDMsXHJcbiAgICBSUkVDOiA0LFxyXG4gICAgUlJFQ19MSk9JTjogNVxyXG59XHJcblxyXG5UaW55LnJuZCA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcclxufTtcclxuXHJcblRpbnkuaGV4MnJnYiA9IGZ1bmN0aW9uKGhleCkge1xyXG4gICAgcmV0dXJuIFsoaGV4ID4+IDE2ICYgMHhGRikgLyAyNTUsICggaGV4ID4+IDggJiAweEZGKSAvIDI1NSwgKGhleCAmIDB4RkYpLyAyNTVdO1xyXG59O1xyXG5cclxuVGlueS5yZ2IyaGV4ID0gZnVuY3Rpb24ocmdiKSB7XHJcbiAgICByZXR1cm4gKChyZ2JbMF0qMjU1IDw8IDE2KSArIChyZ2JbMV0qMjU1IDw8IDgpICsgcmdiWzJdKjI1NSk7XHJcbn07XHJcblxyXG5UaW55LmdldE5leHRQb3dlck9mVHdvID0gZnVuY3Rpb24obnVtYmVyKVxyXG57XHJcbiAgICBpZiAobnVtYmVyID4gMCAmJiAobnVtYmVyICYgKG51bWJlciAtIDEpKSA9PT0gMClcclxuICAgICAgICByZXR1cm4gbnVtYmVyO1xyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAxO1xyXG4gICAgICAgIHdoaWxlIChyZXN1bHQgPCBudW1iZXIpIHJlc3VsdCA8PD0gMTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5pc1Bvd2VyT2ZUd28gPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICByZXR1cm4gKHdpZHRoID4gMCAmJiAod2lkdGggJiAod2lkdGggLSAxKSkgPT09IDAgJiYgaGVpZ2h0ID4gMCAmJiAoaGVpZ2h0ICYgKGhlaWdodCAtIDEpKSA9PT0gMCk7XHJcbn07XHJcbiIsInZhciBsYXN0TW92ZSwgX2FjdGl2ZV9vYmplY3RzLCBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzLCBfbGFzdF9ib3VuZHM7XHJcbnZhciBnYW1lLCBjdXJyZW50RW1pdGVyO1xyXG5cclxuZnVuY3Rpb24gd2luZG93VG9VSVNwYWNlKHgsIHksIGhpc3RvcnkpXHJcbntcclxuICAgIHZhciBib3VuZHMgPSAoKGhpc3RvcnkgJiYgX2xhc3RfYm91bmRzKSA/IF9sYXN0X2JvdW5kcyA6IChfbGFzdF9ib3VuZHMgPSBnYW1lLmlucHV0Vmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgX2xhc3RfYm91bmRzKSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB4OiAoeCAtIGJvdW5kcy5sZWZ0KSxcclxuICAgICAgICB5OiAoeSAtIGJvdW5kcy50b3ApLFxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gX2dldENvb3JkcyhldmVudCwgaGlzdG9yeSlcclxue1xyXG4gICAgdmFyIGNvb3JkcyA9IG51bGw7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9PSAndW5kZWZpbmVkJyAmJiBldmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC50b3VjaGVzWzBdLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQudG91Y2hlc1swXS5wYWdlWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC5wYWdlWCAmJiBldmVudC5wYWdlWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQucGFnZVlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICAvLyBNb3VzZSBldmVudFxyXG4gICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgeDogZXZlbnQucGFnZVgsXHJcbiAgICAgICAgICAgIHk6IGV2ZW50LnBhZ2VZXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyAmJiBldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgfHwgY29vcmRzID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBjb29yZHMgPSB3aW5kb3dUb1VJU3BhY2UoY29vcmRzLngsIGNvb3Jkcy55LCBoaXN0b3J5KTtcclxuXHJcbiAgICByZXR1cm4gY29vcmRzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfY2hlY2tPbkFjdGl2ZU9iamVjdHMob2JqLCB4LCB5KVxyXG57XHJcbiAgICBpZiAob2JqLmlucHV0RW5hYmxlZCAmJiBvYmoud29ybGRWaXNpYmxlKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChvYmouZ2V0Qm91bmRzKCkuY29udGFpbnMoeCwgeSkpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2FjdGl2ZV9vYmplY3RzLnB1c2gob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9iai5jaGlsZHJlbiAmJiBvYmouY2hpbGRyZW4ubGVuZ3RoID4gMClcclxuICAgIHtcclxuICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IG9iai5jaGlsZHJlbi5sZW5ndGg7IHQrKykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY2hlY2tPbkFjdGl2ZU9iamVjdHMob2JqLmNoaWxkcmVuW3RdLCB4LCB5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlucHV0SGFuZGxlcihuYW1lLCBldmVudCwgaGlzdG9yeSlcclxue1xyXG4gICAgLy8gY29uc29sZS5sb2cobmFtZSlcclxuICAgIHZhciBjb29yZHMgPSBfZ2V0Q29vcmRzKGV2ZW50LCBoaXN0b3J5KTtcclxuXHJcbiAgICBpZiAoY29vcmRzICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChuYW1lICE9IFwibW92ZVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2FjdGl2ZV9vYmplY3RzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICBfY2hlY2tPbkFjdGl2ZU9iamVjdHMoZ2FtZS5zdGFnZSwgY29vcmRzLngsIGNvb3Jkcy55KVxyXG5cclxuICAgICAgICAgICAgLy92YXIgaSA9IF9hY3RpdmVfb2JqZWN0cy5sZW5ndGhcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBfYWN0aXZlX29iamVjdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBfYWN0aXZlX29iamVjdHNbaV1cclxuICAgICAgICAgICAgICAgIG9iai5pbnB1dFtcImxhc3RfXCIgKyBuYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KG5hbWUsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJ1cFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IG9iai5pbnB1dFtcImxhc3RfZG93blwiXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2ludCAmJiBUaW55Lk1hdGguZGlzdGFuY2UocG9pbnQueCwgcG9pbnQueSwgY29vcmRzLngsIGNvb3Jkcy55KSA8IDMwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChcImNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5pbnB1dC50cmFuc3BhcmVudCkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgb2JqID0gX2FjdGl2ZV9vYmplY3RzW2kgLSAxXVxyXG4gICAgICAgICAgICAvLyAgICAgb2JqLmlucHV0W1wibGFzdF9cIiArIG5hbWVdID0ge3g6IGNvb3Jkcy54LCB5OiBjb29yZHMueX1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICBvYmouaW5wdXQuZW1pdChuYW1lLCB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgICBpZiAobmFtZSA9PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB2YXIgcG9pbnQgPSBvYmouaW5wdXRbXCJsYXN0X2Rvd25cIl1cclxuICAgICAgICAgICAgLy8gICAgICAgICBpZiAocG9pbnQgJiYgVGlueS5NYXRoLmRpc3RhbmNlKHBvaW50LngsIHBvaW50LnksIGNvb3Jkcy54LCBjb29yZHMueSkgPCAzMClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQoXCJjbGlja1wiLCB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fSlcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudEVtaXRlci5lbWl0KG5hbWUsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZUhhbmRsZXIoZXZlbnQpXHJcbntcclxuICAgIGxhc3RNb3ZlID0gZXZlbnQ7XHJcbiAgICBpbnB1dEhhbmRsZXIoXCJtb3ZlXCIsIGV2ZW50LCB0cnVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBIYW5kbGVyKGV2ZW50KVxyXG57XHJcbiAgICBjdXJyZW50RW1pdGVyLmlzRG93biA9IGZhbHNlO1xyXG4gICAgaW5wdXRIYW5kbGVyKFwidXBcIiwgbGFzdE1vdmUsIHRydWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb3duSGFuZGxlcihldmVudClcclxue1xyXG4gICAgY3VycmVudEVtaXRlci5pc0Rvd24gPSB0cnVlO1xyXG4gICAgbGFzdE1vdmUgPSBldmVudDtcclxuICAgIGlucHV0SGFuZGxlcihcImRvd25cIiwgZXZlbnQsIGZhbHNlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGV2ZW50KVxyXG57XHJcbiAgICBpbnB1dEhhbmRsZXIoXCJjbGlja1wiLCBldmVudCwgZmFsc2UpO1xyXG59XHJcblxyXG5UaW55LklucHV0ID0gZnVuY3Rpb24ocGFyZW50KVxyXG57XHJcbiAgICBnYW1lID0gZ2FtZSA9IHBhcmVudDtcclxuICAgIF9hY3RpdmVfb2JqZWN0cyA9IFtdO1xyXG4gICAgY3VycmVudEVtaXRlciA9IHRoaXM7XHJcblxyXG4gICAgbGFzdE1vdmUgPSBudWxsO1xyXG4gICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgdCA9IGdhbWUuaW5wdXRWaWV3LmFkZEV2ZW50TGlzdGVuZXI7XHJcbiAgICB0KCd0b3VjaHN0YXJ0JywgZG93bkhhbmRsZXIpO1xyXG4gICAgdCgndG91Y2htb3ZlJywgbW92ZUhhbmRsZXIpO1xyXG4gICAgdCgndG91Y2hlbmQnLCB1cEhhbmRsZXIpO1xyXG4gICAgdCgndG91Y2hjYW5jZWwnLCB1cEhhbmRsZXIpO1xyXG5cclxuICAgIC8vIHQoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcclxuXHJcbiAgICB0KCdtb3VzZWRvd24nLCBkb3duSGFuZGxlcik7XHJcbiAgICB0KCdtb3VzZW1vdmUnLCBtb3ZlSGFuZGxlcik7XHJcbiAgICB0KCdtb3VzZXVwJywgdXBIYW5kbGVyKTtcclxuXHJcbiAgICBUaW55LkV2ZW50VGFyZ2V0Lm1peGluKHRoaXMpXHJcbn07XHJcblxyXG5UaW55LklucHV0LnByb3RvdHlwZSA9IHtcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgdCA9IGdhbWUuaW5wdXRWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXI7XHJcbiAgICAgICAgdCgndG91Y2hzdGFydCcsIGRvd25IYW5kbGVyKTtcclxuICAgICAgICB0KCd0b3VjaG1vdmUnLCBtb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgdCgndG91Y2hlbmQnLCB1cEhhbmRsZXIpO1xyXG4gICAgICAgIHQoJ3RvdWNoY2FuY2VsJywgdXBIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgLy8gdCgnY2xpY2snLCBjbGlja0hhbmRsZXIpO1xyXG5cclxuICAgICAgICB0KCdtb3VzZWRvd24nLCBkb3duSGFuZGxlcik7XHJcbiAgICAgICAgdCgnbW91c2Vtb3ZlJywgbW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIHQoJ21vdXNldXAnLCB1cEhhbmRsZXIpO1xyXG4gICAgfVxyXG59OyIsIlRpbnkuTG9hZGVyID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuY2FjaGUgPSBbXTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLmxvYWRTcHJpdGVTaGVldCA9IGZ1bmN0aW9uKGtleSwgZnJhbWVEYXRhKVxyXG57XHJcbiAgICB2YXIgbWF4X25vX2ZyYW1lID0gKGZyYW1lRGF0YS5sZW5ndGggLSAxKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBtYXhfbm9fZnJhbWU7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgdXVpZCA9IGtleSArIFwiX1wiICsgaTtcclxuXHJcbiAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVbdXVpZF0gPSBuZXcgVGlueS5UZXh0dXJlKFRpbnkuQmFzZVRleHR1cmVDYWNoZVtrZXldLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLngpLFxyXG4gICAgICAgICAgICB5OiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS55KSxcclxuICAgICAgICAgICAgd2lkdGg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLndpZHRoKSxcclxuICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS5oZWlnaHQpLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZnJhbWVEYXRhW2ldLmR1cmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVbdXVpZF0ua2V5ID0ga2V5O1xyXG4gICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlW3V1aWRdLm1heF9ub19mcmFtZSA9IG1heF9ub19mcmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWF4X25vX2ZyYW1lO1xyXG59XHJcblxyXG5UaW55LkxvYWRlci5wYXJzZVNwcml0ZVNoZWV0ID0gZnVuY3Rpb24oa2V5LCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCwgZHVyYXRpb24pXHJcbntcclxuICAgIHZhciBpbWcgPSBUaW55LkJhc2VUZXh0dXJlQ2FjaGVba2V5XTtcclxuXHJcbiAgICB2YXIgd2lkdGggPSBpbWcud2lkdGg7XHJcbiAgICB2YXIgaGVpZ2h0ID0gaW1nLmhlaWdodDtcclxuXHJcbiAgICBpZiAoZnJhbWVXaWR0aCA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIGZyYW1lV2lkdGggPSBNYXRoLmZsb29yKC13aWR0aCAvIE1hdGgubWluKC0xLCBmcmFtZVdpZHRoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZyYW1lSGVpZ2h0IDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgZnJhbWVIZWlnaHQgPSBNYXRoLmZsb29yKC1oZWlnaHQgLyBNYXRoLm1pbigtMSwgZnJhbWVIZWlnaHQpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcm93ID0gTWF0aC5mbG9vcigod2lkdGgpIC8gKGZyYW1lV2lkdGgpKTtcclxuICAgIHZhciBjb2x1bW4gPSBNYXRoLmZsb29yKChoZWlnaHQpIC8gKGZyYW1lSGVpZ2h0KSk7XHJcbiAgICB2YXIgdG90YWwgPSByb3cgKiBjb2x1bW47XHJcblxyXG4gICAgaWYgKHRvdGFsID09PSAwKSBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeCA9IDA7XHJcbiAgICB2YXIgeSA9IDA7XHJcblxyXG4gICAgdmFyIG1heF9ub19mcmFtZSA9IHRvdGFsIC0gMTtcclxuICAgIHZhciBmcmFtZURhdGEgPSB7fTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgZnJhbWVEYXRhID0ge1xyXG4gICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgd2lkdGg6IGZyYW1lV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogZnJhbWVIZWlnaHQsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXVpZCA9IGtleSArIFwiX1wiICsgaTtcclxuICAgICAgICBUaW55LlRleHR1cmVDYWNoZVt1dWlkXSA9IG5ldyBUaW55LlRleHR1cmUoaW1nLCBmcmFtZURhdGEpO1xyXG4gICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlW3V1aWRdLmtleSA9IGtleTtcclxuICAgICAgICBUaW55LlRleHR1cmVDYWNoZVt1dWlkXS5tYXhfbm9fZnJhbWUgPSBtYXhfbm9fZnJhbWU7XHJcblxyXG4gICAgICAgIHggKz0gZnJhbWVXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKHggKyBmcmFtZVdpZHRoID4gd2lkdGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4ID0gMDtcclxuICAgICAgICAgICAgeSArPSBmcmFtZUhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1heF9ub19mcmFtZTtcclxufVxyXG5cclxuVGlueS5Mb2FkZXIubG9hZEF0bGFzID0gZnVuY3Rpb24oa2V5LCBhdGxhc0RhdGEpXHJcbntcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXRsYXNEYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBrZXlmcmFtZSA9IGtleSArIFwiX1wiICsgYXRsYXNEYXRhW2ldLm5hbWVcclxuXHJcbiAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVba2V5ZnJhbWVdID0gbmV3IFRpbnkuVGV4dHVyZShUaW55LkJhc2VUZXh0dXJlQ2FjaGVba2V5XSwgYXRsYXNEYXRhW2ldKTtcclxuICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtrZXlmcmFtZV0ua2V5ID0ga2V5O1xyXG4gICAgfVxyXG59XHJcblxyXG5UaW55LkxvYWRlci5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgaW1hZ2U6IGZ1bmN0aW9uKGtleSwgc291cmNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2FjaGUucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgY2I6IGZ1bmN0aW9uKCkge31cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBzcHJpdGVzaGVldDogZnVuY3Rpb24oa2V5LCBzb3VyY2UsIGFyZ18xLCBhcmdfMiwgZHVyYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYWNoZS5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBjYjogZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ18xID09IFwibnVtYmVyXCIpIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlW2tleV0ubWF4X25vX2ZyYW1lID0gVGlueS5Mb2FkZXIucGFyc2VTcHJpdGVTaGVldChrZXksIGFyZ18xLCBhcmdfMiwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJnXzEubGVuZ3RoID4gMCkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVba2V5XS5tYXhfbm9fZnJhbWUgPSBUaW55LkxvYWRlci5sb2FkU3ByaXRlU2hlZXQoa2V5LCBhcmdfMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhdGxhczogZnVuY3Rpb24oa2V5LCBzb3VyY2UsIGF0bGFzRGF0YSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhY2hlLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIGNiOiBmdW5jdGlvbigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRpbnkuTG9hZGVyLmxvYWRBdGxhcyhrZXksIGF0bGFzRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24oX2NiXylcclxuICAgIHtcclxuICAgICAgICB2YXIgZ2FtZSA9IHRoaXMuZ2FtZTtcclxuICAgICAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xyXG5cclxuICAgICAgICBpZiAoY2FjaGUubGVuZ3RoID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY2JfLmNhbGwoZ2FtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWROZXh0RGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRfZGF0YSA9IGNhY2hlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGRhdGFMb2FkZWQ7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBfY3VycmVudF9kYXRhLnNyY1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZGF0YUxvYWRlZCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRpbnkuQmFzZVRleHR1cmVDYWNoZVtfY3VycmVudF9kYXRhLmtleV0gPSBuZXcgVGlueS5CYXNlVGV4dHVyZShpbWcpO1xyXG4gICAgICAgICAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVbX2N1cnJlbnRfZGF0YS5rZXldID0gbmV3IFRpbnkuVGV4dHVyZShUaW55LkJhc2VUZXh0dXJlQ2FjaGVbX2N1cnJlbnRfZGF0YS5rZXldKTtcclxuICAgICAgICAgICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlW19jdXJyZW50X2RhdGEua2V5XS5rZXkgPSBfY3VycmVudF9kYXRhLmtleVxyXG5cclxuICAgICAgICAgICAgICAgIF9jdXJyZW50X2RhdGEuY2IoKVxyXG4gICAgICAgICAgICAgICAgaWYgKCFkb25lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZS5sZW5ndGggIT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWROZXh0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY2JfLmNhbGwoZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbG9hZE5leHREYXRhKCk7XHJcbiAgICB9XHJcbn07IiwiVGlueS5PYmplY3RDcmVhdG9yID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0Q3JlYXRvci5wcm90b3R5cGUgPSB7XHJcbiAgICBncm91cDogZnVuY3Rpb24oeCwgeSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZ3JvdXAgPSBuZXcgVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmFkZENoaWxkKGdyb3VwKTtcclxuXHJcbiAgICAgICAgZ3JvdXAueCA9IHggfHwgMDtcclxuICAgICAgICBncm91cC55ID0geSB8fCAwO1xyXG5cclxuICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICB9LFxyXG4gICAgc3ByaXRlOiBmdW5jdGlvbih4LCB5LCBpbWFnZVBhdGgsIGtleSlcclxuICAgIHtcclxuICAgICAgICB2YXIgc3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKGltYWdlUGF0aCwga2V5KTtcclxuICAgICAgICBzcHJpdGUuZnJhbWUgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYWRkQ2hpbGQoc3ByaXRlKVxyXG5cclxuICAgICAgICBzcHJpdGUueCA9IHggfHwgMDtcclxuICAgICAgICBzcHJpdGUueSA9IHkgfHwgMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNwcml0ZTtcclxuICAgIH0sXHJcbiAgICB0ZXh0OiBmdW5jdGlvbih4LCB5LCB0ZXh0LCB0eWxlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZXh0ID0gbmV3IFRpbnkuVGV4dCh0ZXh0LCB0eWxlKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmFkZENoaWxkKHRleHQpO1xyXG5cclxuICAgICAgICB0ZXh0LnggPSB4IHx8IDA7XHJcbiAgICAgICAgdGV4dC55ID0geSB8fCAwO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH0sXHJcbiAgICB0aWxlU3ByaXRlOiBmdW5jdGlvbih4LCB5LCB3LCBoLCBpbWFnZVBhdGgsIGtleSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdGlsZSA9IG5ldyBUaW55LlRpbGluZ1Nwcml0ZShpbWFnZVBhdGgsIGtleSwgdywgaCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmFkZENoaWxkKHRpbGUpO1xyXG5cclxuICAgICAgICB0aWxlLnggPSB4IHx8IDA7XHJcbiAgICAgICAgdGlsZS55ID0geSB8fCAwO1xyXG5cclxuICAgICAgICByZXR1cm4gdGlsZTtcclxuICAgIH0sXHJcbiAgICBncmFwaGljczogZnVuY3Rpb24oeCwgeSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZ3JhcGhpY3MgPSBuZXcgVGlueS5HcmFwaGljcygpO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYWRkQ2hpbGQoZ3JhcGhpY3MpO1xyXG5cclxuICAgICAgICBncmFwaGljcy54ID0geCB8fCAwO1xyXG4gICAgICAgIGdyYXBoaWNzLnkgPSB5IHx8IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBncmFwaGljcztcclxuICAgIH1cclxufTsiLCJ2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XHJcblxyXG52YXIgVGltZXIgPSBmdW5jdGlvbihzdGF0dXMsIGF1dG9SZW1vdmUsIGdhbWUsIGNiLCBkZWxheSwgbG9vcCwgbiwgb25jb21wbGV0ZSlcclxue1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuX2NiXyA9IGNiIHx8IG5vb3A7XHJcbiAgICB0aGlzLmRlbGF5ID0gKGRlbGF5ID09IHVuZGVmaW5lZCA/IDEwMDAgOiBkZWxheSk7XHJcbiAgICB0aGlzLmxvb3AgPSBsb29wO1xyXG4gICAgdGhpcy5fY291bnQgPSBuIHx8IDA7XHJcbiAgICB0aGlzLl9yZXBlYXQgPSAodGhpcy5fY291bnQgPiAwKTtcclxuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IGF1dG9SZW1vdmU7XHJcbiAgICB0aGlzLl9vbmNvbXBsZXRlID0gb25jb21wbGV0ZSB8fCBub29wO1xyXG59XHJcblxyXG5UaW1lci5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMTtcclxuICAgIH0sXHJcbiAgICBwYXVzZTogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbihkZWx0YVRpbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdEZyYW1lICs9IGRlbHRhVGltZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFzdEZyYW1lID49IHRoaXMuZGVsYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NiXygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZXBlYXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY291bnQgPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMubG9vcClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvUmVtb3ZlICYmIHRoaXMuZ2FtZS50aW1lci5yZW1vdmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblRpbnkuVGltZXIgPSBUaW1lcjtcclxuXHJcblRpbnkuVGltZXJDcmVhdG9yID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuZ2FtZS50aW1lcnMgPSBbXTtcclxuICAgIHRoaXMuYXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvci5wcm90b3R5cGUgPSB7XHJcbiAgICByZW1vdmVBbGw6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdhbWUudGltZXJzLmZvckVhY2goZnVuY3Rpb24odG0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0bS5zdG9wKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS50aW1lcnMgPSBbXTtcclxuICAgIH0sXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uKHRtKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbmRleE9mID0gdGhpcy5nYW1lLnRpbWVycy5pbmRleE9mKHRtKTtcclxuICAgICAgICBpZiAoaW5kZXhPZiA+IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdG0uc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUudGltZXJzLnNwbGljZShpbmRleE9mLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkOiBmdW5jdGlvbihkZWxheSwgY2IsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoYXV0b3N0YXJ0ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXRvc3RhcnQgPSB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKChhdXRvc3RhcnQgPyAxIDogMCksIChhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmUpLCB0aGlzLmdhbWUsIGNiLCBkZWxheSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWVycy5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgbG9vcDogZnVuY3Rpb24oZGVsYXksIGNiLCBhdXRvc3RhcnQsIGF1dG9yZW1vdmUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGF1dG9zdGFydCA9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXV0b3N0YXJ0ID0gdGhpcy5hdXRvU3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0aW1lciA9IG5ldyBUaW1lcigoYXV0b3N0YXJ0ID8gMSA6IDApLCAoYXV0b3JlbW92ZSAhPSB1bmRlZmluZWQgPyBhdXRvcmVtb3ZlIDogdGhpcy5hdXRvUmVtb3ZlKSwgdGhpcy5nYW1lLCBjYiwgZGVsYXksIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS50aW1lcnMucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIHJlcGVhdDogZnVuY3Rpb24oZGVsYXksIG4sIGNiLCBjb21wbGV0ZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoKHRoaXMuYXV0b1N0YXJ0ID8gMSA6IDApLCB0aGlzLmF1dG9SZW1vdmUsIHRoaXMuZ2FtZSwgY2IsIGRlbGF5LCBmYWxzZSwgbiwgY29tcGxldGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS50aW1lcnMucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfVxyXG59OyIsIlRpbnkuQ2lyY2xlID0gZnVuY3Rpb24gKHgsIHksIGRpYW1ldGVyKSB7XHJcblxyXG4gICAgeCA9IHggfHwgMDtcclxuICAgIHkgPSB5IHx8IDA7XHJcbiAgICBkaWFtZXRlciA9IGRpYW1ldGVyIHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geDtcclxuXHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMuX2RpYW1ldGVyID0gZGlhbWV0ZXI7XHJcblxyXG4gICAgdGhpcy5fcmFkaXVzID0gMDtcclxuXHJcbiAgICBpZiAoZGlhbWV0ZXIgPiAwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IGRpYW1ldGVyICogMC41O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5DSVJDO1xyXG5cclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW55LlJlY3RhbmdsZSh0aGlzLnggLSB0aGlzLnJhZGl1cywgdGhpcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMuZGlhbWV0ZXIsIHRoaXMuZGlhbWV0ZXIpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5LCBkaWFtZXRlcikge1xyXG5cclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSBkaWFtZXRlcjtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSBkaWFtZXRlciAqIDAuNTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb3B5RnJvbTogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zZXRUbyhzb3VyY2UueCwgc291cmNlLnksIHNvdXJjZS5kaWFtZXRlcik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb3B5VG86IGZ1bmN0aW9uIChkZXN0KSB7XHJcblxyXG4gICAgICAgIGRlc3QueCA9IHRoaXMueDtcclxuICAgICAgICBkZXN0LnkgPSB0aGlzLnk7XHJcbiAgICAgICAgZGVzdC5kaWFtZXRlciA9IHRoaXMuX2RpYW1ldGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVzdDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRpc3RhbmNlOiBmdW5jdGlvbiAoZGVzdCwgcm91bmQpIHtcclxuXHJcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gVGlueS5NYXRoLmRpc3RhbmNlKHRoaXMueCwgdGhpcy55LCBkZXN0LngsIGRlc3QueSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdW5kID8gTWF0aC5yb3VuZChkaXN0YW5jZSkgOiBkaXN0YW5jZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiIHx8IG91dHB1dCA9PT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG5ldyBUaW55LkNpcmNsZSh0aGlzLngsIHRoaXMueSwgdGhpcy5kaWFtZXRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dC5zZXRUbyh0aGlzLngsIHRoaXMueSwgdGhpcy5kaWFtZXRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgICAgIHJldHVybiBUaW55LkNpcmNsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9mZnNldDogZnVuY3Rpb24gKGR4LCBkeSkge1xyXG5cclxuICAgICAgICB0aGlzLnggKz0gZHg7XHJcbiAgICAgICAgdGhpcy55ICs9IGR5O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9mZnNldFBvaW50OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXQocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuVGlueS5DaXJjbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DaXJjbGU7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImRpYW1ldGVyXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlhbWV0ZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSB2YWx1ZSAqIDAuNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwicmFkaXVzXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gdmFsdWUgKiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwibGVmdFwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAtIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gdGhpcy54KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHRoaXMueCAtIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwicmlnaHRcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHRoaXMueClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB2YWx1ZSAtIHRoaXMueDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcInRvcFwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSAtIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gdGhpcy55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHRoaXMueSAtIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiYm90dG9tXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPCB0aGlzLnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdmFsdWUgLSB0aGlzLnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJhcmVhXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3JhZGl1cyA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSSAqIHRoaXMuX3JhZGl1cyAqIHRoaXMuX3JhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJlbXB0eVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl9kaWFtZXRlciA9PT0gMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG8oMCwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuVGlueS5DaXJjbGUuY29udGFpbnMgPSBmdW5jdGlvbiAoYSwgeCwgeSkge1xyXG5cclxuICAgIC8vICBDaGVjayBpZiB4L3kgYXJlIHdpdGhpbiB0aGUgYm91bmRzIGZpcnN0XHJcbiAgICBpZiAoYS5yYWRpdXMgPiAwICYmIHggPj0gYS5sZWZ0ICYmIHggPD0gYS5yaWdodCAmJiB5ID49IGEudG9wICYmIHkgPD0gYS5ib3R0b20pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGR4ID0gKGEueCAtIHgpICogKGEueCAtIHgpO1xyXG4gICAgICAgIHZhciBkeSA9IChhLnkgLSB5KSAqIChhLnkgLSB5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChkeCArIGR5KSA8PSAoYS5yYWRpdXMgKiBhLnJhZGl1cyk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuQ2lyY2xlLmVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICByZXR1cm4gKGEueCA9PSBiLnggJiYgYS55ID09IGIueSAmJiBhLmRpYW1ldGVyID09IGIuZGlhbWV0ZXIpO1xyXG59O1xyXG5cclxuVGlueS5DaXJjbGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICByZXR1cm4gKFRpbnkuTWF0aC5kaXN0YW5jZShhLngsIGEueSwgYi54LCBiLnkpIDw9IChhLnJhZGl1cyArIGIucmFkaXVzKSk7XHJcbn07XHJcblxyXG5cclxuVGlueS5DaXJjbGUuaW50ZXJzZWN0c1JlY3RhbmdsZSA9IGZ1bmN0aW9uIChjLCByKSB7XHJcblxyXG4gICAgdmFyIGN4ID0gTWF0aC5hYnMoYy54IC0gci54IC0gci5oYWxmV2lkdGgpO1xyXG4gICAgdmFyIHhEaXN0ID0gci5oYWxmV2lkdGggKyBjLnJhZGl1cztcclxuXHJcbiAgICBpZiAoY3ggPiB4RGlzdClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN5ID0gTWF0aC5hYnMoYy55IC0gci55IC0gci5oYWxmSGVpZ2h0KTtcclxuICAgIHZhciB5RGlzdCA9IHIuaGFsZkhlaWdodCArIGMucmFkaXVzO1xyXG5cclxuICAgIGlmIChjeSA+IHlEaXN0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3ggPD0gci5oYWxmV2lkdGggfHwgY3kgPD0gci5oYWxmSGVpZ2h0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB4Q29ybmVyRGlzdCA9IGN4IC0gci5oYWxmV2lkdGg7XHJcbiAgICB2YXIgeUNvcm5lckRpc3QgPSBjeSAtIHIuaGFsZkhlaWdodDtcclxuICAgIHZhciB4Q29ybmVyRGlzdFNxID0geENvcm5lckRpc3QgKiB4Q29ybmVyRGlzdDtcclxuICAgIHZhciB5Q29ybmVyRGlzdFNxID0geUNvcm5lckRpc3QgKiB5Q29ybmVyRGlzdDtcclxuICAgIHZhciBtYXhDb3JuZXJEaXN0U3EgPSBjLnJhZGl1cyAqIGMucmFkaXVzO1xyXG5cclxuICAgIHJldHVybiB4Q29ybmVyRGlzdFNxICsgeUNvcm5lckRpc3RTcSA8PSBtYXhDb3JuZXJEaXN0U3E7XHJcblxyXG59O1xyXG4iLCJcclxuVGlueS5NYXRoID0ge1xyXG5cclxuICAgIC8vIGZ1enp5RXF1YWw6IGZ1bmN0aW9uIChhLCBiLCBlcHNpbG9uKSB7XHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBlcHNpbG9uID09PSAndW5kZWZpbmVkJykgeyBlcHNpbG9uID0gMC4wMDAxOyB9XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8IGVwc2lsb247XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGZ1enp5TGVzc1RoYW46IGZ1bmN0aW9uIChhLCBiLCBlcHNpbG9uKSB7XHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBlcHNpbG9uID09PSAndW5kZWZpbmVkJykgeyBlcHNpbG9uID0gMC4wMDAxOyB9XHJcbiAgICAvLyAgICAgcmV0dXJuIGEgPCBiICsgZXBzaWxvbjtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZnV6enlHcmVhdGVyVGhhbjogZnVuY3Rpb24gKGEsIGIsIGVwc2lsb24pIHtcclxuICAgIC8vICAgICBpZiAodHlwZW9mIGVwc2lsb24gPT09ICd1bmRlZmluZWQnKSB7IGVwc2lsb24gPSAwLjAwMDE7IH1cclxuICAgIC8vICAgICByZXR1cm4gYSA+IGIgLSBlcHNpbG9uO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBmdXp6eUNlaWw6IGZ1bmN0aW9uICh2YWwsIGVwc2lsb24pIHtcclxuICAgIC8vICAgICBpZiAodHlwZW9mIGVwc2lsb24gPT09ICd1bmRlZmluZWQnKSB7IGVwc2lsb24gPSAwLjAwMDE7IH1cclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5jZWlsKHZhbCAtIGVwc2lsb24pO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBmdXp6eUZsb29yOiBmdW5jdGlvbiAodmFsLCBlcHNpbG9uKSB7XHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBlcHNpbG9uID09PSAndW5kZWZpbmVkJykgeyBlcHNpbG9uID0gMC4wMDAxOyB9XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguZmxvb3IodmFsICsgZXBzaWxvbik7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGF2ZXJhZ2U6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyAgICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgIHN1bSArPSAoK2FyZ3VtZW50c1tpXSk7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICByZXR1cm4gc3VtIC8gYXJndW1lbnRzLmxlbmd0aDtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHRydW5jYXRlOiBmdW5jdGlvbiAobikge1xyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLnRydW5jKG4pO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBzaGVhcjogZnVuY3Rpb24gKG4pIHtcclxuICAgIC8vICAgICByZXR1cm4gbiAlIDE7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHNuYXBUbzogZnVuY3Rpb24gKGlucHV0LCBnYXAsIHN0YXJ0KSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7IHN0YXJ0ID0gMDsgfVxyXG5cclxuICAgIC8vICAgICBpZiAoZ2FwID09PSAwKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGlucHV0IC09IHN0YXJ0O1xyXG4gICAgLy8gICAgIGlucHV0ID0gZ2FwICogTWF0aC5yb3VuZChpbnB1dCAvIGdhcCk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBzdGFydCArIGlucHV0O1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc25hcFRvRmxvb3I6IGZ1bmN0aW9uIChpbnB1dCwgZ2FwLCBzdGFydCkge1xyXG5cclxuICAgIC8vICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAndW5kZWZpbmVkJykgeyBzdGFydCA9IDA7IH1cclxuXHJcbiAgICAvLyAgICAgaWYgKGdhcCA9PT0gMCkge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBpbnB1dCAtPSBzdGFydDtcclxuICAgIC8vICAgICBpbnB1dCA9IGdhcCAqIE1hdGguZmxvb3IoaW5wdXQgLyBnYXApO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gc3RhcnQgKyBpbnB1dDtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHNuYXBUb0NlaWw6IGZ1bmN0aW9uIChpbnB1dCwgZ2FwLCBzdGFydCkge1xyXG5cclxuICAgIC8vICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAndW5kZWZpbmVkJykgeyBzdGFydCA9IDA7IH1cclxuXHJcbiAgICAvLyAgICAgaWYgKGdhcCA9PT0gMCkge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBpbnB1dCAtPSBzdGFydDtcclxuICAgIC8vICAgICBpbnB1dCA9IGdhcCAqIE1hdGguY2VpbChpbnB1dCAvIGdhcCk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBzdGFydCArIGlucHV0O1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc25hcFRvSW5BcnJheTogZnVuY3Rpb24gKGlucHV0LCBhcnIsIHNvcnQpIHtcclxuXHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBzb3J0ID09PSAndW5kZWZpbmVkJykgeyBzb3J0ID0gdHJ1ZTsgfVxyXG5cclxuICAgIC8vICAgICBpZiAoc29ydCkge1xyXG4gICAgLy8gICAgICAgICBhcnIuc29ydCgpO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5BcnJheVV0aWxzLmZpbmRDbG9zZXN0KGlucHV0LCBhcnIpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gcm91bmRUbzogZnVuY3Rpb24gKHZhbHVlLCBwbGFjZSwgYmFzZSkge1xyXG5cclxuICAgIC8vICAgICBpZiAodHlwZW9mIHBsYWNlID09PSAndW5kZWZpbmVkJykgeyBwbGFjZSA9IDA7IH1cclxuICAgIC8vICAgICBpZiAodHlwZW9mIGJhc2UgPT09ICd1bmRlZmluZWQnKSB7IGJhc2UgPSAxMDsgfVxyXG5cclxuICAgIC8vICAgICB2YXIgcCA9IE1hdGgucG93KGJhc2UsIC1wbGFjZSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogcCkgLyBwO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZmxvb3JUbzogZnVuY3Rpb24gKHZhbHVlLCBwbGFjZSwgYmFzZSkge1xyXG5cclxuICAgIC8vICAgICBpZiAodHlwZW9mIHBsYWNlID09PSAndW5kZWZpbmVkJykgeyBwbGFjZSA9IDA7IH1cclxuICAgIC8vICAgICBpZiAodHlwZW9mIGJhc2UgPT09ICd1bmRlZmluZWQnKSB7IGJhc2UgPSAxMDsgfVxyXG5cclxuICAgIC8vICAgICB2YXIgcCA9IE1hdGgucG93KGJhc2UsIC1wbGFjZSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLmZsb29yKHZhbHVlICogcCkgLyBwO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gY2VpbFRvOiBmdW5jdGlvbiAodmFsdWUsIHBsYWNlLCBiYXNlKSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgcGxhY2UgPT09ICd1bmRlZmluZWQnKSB7IHBsYWNlID0gMDsgfVxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgYmFzZSA9PT0gJ3VuZGVmaW5lZCcpIHsgYmFzZSA9IDEwOyB9XHJcblxyXG4gICAgLy8gICAgIHZhciBwID0gTWF0aC5wb3coYmFzZSwgLXBsYWNlKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSAqIHApIC8gcDtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGludGVycG9sYXRlRmxvYXQ6IGZ1bmN0aW9uIChhLCBiLCB3ZWlnaHQpIHtcclxuICAgIC8vICAgICByZXR1cm4gKGIgLSBhKSAqIHdlaWdodCArIGE7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGFuZ2xlQmV0d2VlbjogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB4MSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGFuZ2xlQmV0d2Vlblk6IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLmF0YW4yKHgyIC0geDEsIHkyIC0geTEpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBhbmdsZUJldHdlZW5Qb2ludHM6IGZ1bmN0aW9uIChwb2ludDEsIHBvaW50Mikge1xyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLmF0YW4yKHBvaW50Mi55IC0gcG9pbnQxLnksIHBvaW50Mi54IC0gcG9pbnQxLngpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBhbmdsZUJldHdlZW5Qb2ludHNZOiBmdW5jdGlvbiAocG9pbnQxLCBwb2ludDIpIHtcclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5hdGFuMihwb2ludDIueCAtIHBvaW50MS54LCBwb2ludDIueSAtIHBvaW50MS55KTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gcmV2ZXJzZUFuZ2xlOiBmdW5jdGlvbiAoYW5nbGVSYWQpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVBbmdsZShhbmdsZVJhZCArIE1hdGguUEksIHRydWUpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBub3JtYWxpemVBbmdsZTogZnVuY3Rpb24gKGFuZ2xlUmFkKSB7XHJcblxyXG4gICAgLy8gICAgIGFuZ2xlUmFkID0gYW5nbGVSYWQgJSAoMiAqIE1hdGguUEkpO1xyXG4gICAgLy8gICAgIHJldHVybiBhbmdsZVJhZCA+PSAwID8gYW5nbGVSYWQgOiBhbmdsZVJhZCArIDIgKiBNYXRoLlBJO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gbm9ybWFsaXplTGF0aXR1ZGU6IGZ1bmN0aW9uIChsYXQpIHtcclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLk1hdGguY2xhbXAobGF0LCAtOTAsIDkwKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gbm9ybWFsaXplTG9uZ2l0dWRlOiBmdW5jdGlvbiAobG5nKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5NYXRoLndyYXAobG5nLCAtMTgwLCAxODApO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBjaGFuY2VSb2xsOiBmdW5jdGlvbiAoY2hhbmNlKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5VdGlscy5jaGFuY2VSb2xsKGNoYW5jZSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG51bWJlckFycmF5OiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xyXG4gICAgLy8gICAgIHJldHVybiBQaGFzZXIuQXJyYXlVdGlscy5udW1iZXJBcnJheShzdGFydCwgZW5kKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gbnVtYmVyQXJyYXlTdGVwOiBmdW5jdGlvbihzdGFydCwgZW5kLCBzdGVwKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5BcnJheVV0aWxzLm51bWJlckFycmF5U3RlcChzdGFydCwgZW5kLCBzdGVwKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gbWF4QWRkOiBmdW5jdGlvbiAodmFsdWUsIGFtb3VudCwgbWF4KSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGgubWluKHZhbHVlICsgYW1vdW50LCBtYXgpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBtaW5TdWI6IGZ1bmN0aW9uICh2YWx1ZSwgYW1vdW50LCBtaW4pIHtcclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5tYXgodmFsdWUgLSBhbW91bnQsIG1pbik7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHdyYXA6IGZ1bmN0aW9uICh2YWx1ZSwgbWluLCBtYXgpIHtcclxuXHJcbiAgICAvLyAgICAgdmFyIHJhbmdlID0gbWF4IC0gbWluO1xyXG5cclxuICAgIC8vICAgICBpZiAocmFuZ2UgPD0gMClcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiAwO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgdmFyIHJlc3VsdCA9ICh2YWx1ZSAtIG1pbikgJSByYW5nZTtcclxuXHJcbiAgICAvLyAgICAgaWYgKHJlc3VsdCA8IDApXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXN1bHQgKz0gcmFuZ2U7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICByZXR1cm4gcmVzdWx0ICsgbWluO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gd3JhcFZhbHVlOiBmdW5jdGlvbiAodmFsdWUsIGFtb3VudCwgbWF4KSB7XHJcblxyXG4gICAgLy8gICAgIHZhciBkaWZmO1xyXG4gICAgLy8gICAgIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xyXG4gICAgLy8gICAgIGFtb3VudCA9IE1hdGguYWJzKGFtb3VudCk7XHJcbiAgICAvLyAgICAgbWF4ID0gTWF0aC5hYnMobWF4KTtcclxuICAgIC8vICAgICBkaWZmID0gKHZhbHVlICsgYW1vdW50KSAlIG1heDtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGRpZmY7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBsaW1pdFZhbHVlOiBmdW5jdGlvbih2YWx1ZSwgbWluLCBtYXgpIHtcclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLk1hdGguY2xhbXAodmFsdWUsIG1pbiwgbWF4KTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gcmFuZG9tU2lnbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIHJldHVybiBQaGFzZXIuVXRpbHMucmFuZG9tQ2hvaWNlKC0xLCAxKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gaXNPZGQ6IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAvLyAgICAgLy8gRG9lcyBub3Qgd29yayB3aXRoIGV4dHJlbWVseSBsYXJnZSB2YWx1ZXNcclxuICAgIC8vICAgICByZXR1cm4gKG4gJiAxKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gaXNFdmVuOiBmdW5jdGlvbiAobikge1xyXG4gICAgLy8gICAgIC8vIERvZXMgbm90IHdvcmsgd2l0aCBleHRyZW1lbHkgbGFyZ2UgdmFsdWVzXHJcbiAgICAvLyAgICAgcmV0dXJuICEobiAmIDEpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBtaW46IGZ1bmN0aW9uICgpIHtcclxuIFxyXG4gICAgLy8gICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHNbMF07XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2VcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzO1xyXG4gICAgLy8gICAgIH1cclxuIFxyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAxLCBtaW4gPSAwLCBsZW4gPSBkYXRhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaWYgKGRhdGFbaV0gPCBkYXRhW21pbl0pXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIG1pbiA9IGk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBkYXRhW21pbl07XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBtYXg6IGZ1bmN0aW9uICgpIHtcclxuIFxyXG4gICAgLy8gICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHNbMF07XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2VcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzO1xyXG4gICAgLy8gICAgIH1cclxuIFxyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAxLCBtYXggPSAwLCBsZW4gPSBkYXRhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaWYgKGRhdGFbaV0gPiBkYXRhW21heF0pXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIG1heCA9IGk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBkYXRhW21heF07XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBtaW5Qcm9wZXJ0eTogZnVuY3Rpb24gKHByb3BlcnR5KSB7XHJcblxyXG4gICAgLy8gICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdvYmplY3QnKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHNbMV07XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2VcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzLnNsaWNlKDEpO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDEsIG1pbiA9IDAsIGxlbiA9IGRhdGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBpZiAoZGF0YVtpXVtwcm9wZXJ0eV0gPCBkYXRhW21pbl1bcHJvcGVydHldKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBtaW4gPSBpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICByZXR1cm4gZGF0YVttaW5dW3Byb3BlcnR5XTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG1heFByb3BlcnR5OiBmdW5jdGlvbiAocHJvcGVydHkpIHtcclxuXHJcbiAgICAvLyAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ29iamVjdCcpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1sxXTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHMuc2xpY2UoMSk7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBmb3IgKHZhciBpID0gMSwgbWF4ID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGlmIChkYXRhW2ldW3Byb3BlcnR5XSA+IGRhdGFbbWF4XVtwcm9wZXJ0eV0pXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIG1heCA9IGk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBkYXRhW21heF1bcHJvcGVydHldO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gd3JhcEFuZ2xlOiBmdW5jdGlvbiAoYW5nbGUsIHJhZGlhbnMpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHJhZGlhbnMgPyB0aGlzLndyYXAoYW5nbGUsIC1NYXRoLlBJLCBNYXRoLlBJKSA6IHRoaXMud3JhcChhbmdsZSwgLTE4MCwgMTgwKTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGFuZ2xlTGltaXQ6IGZ1bmN0aW9uIChhbmdsZSwgbWluLCBtYXgpIHtcclxuXHJcbiAgICAvLyAgICAgdmFyIHJlc3VsdCA9IGFuZ2xlO1xyXG5cclxuICAgIC8vICAgICBpZiAoYW5nbGUgPiBtYXgpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXN1bHQgPSBtYXg7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2UgaWYgKGFuZ2xlIDwgbWluKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmVzdWx0ID0gbWluO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGxpbmVhckludGVycG9sYXRpb246IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG4gICAgLy8gICAgIHZhciBtID0gdi5sZW5ndGggLSAxO1xyXG4gICAgLy8gICAgIHZhciBmID0gbSAqIGs7XHJcbiAgICAvLyAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG5cclxuICAgIC8vICAgICBpZiAoayA8IDApXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5saW5lYXIodlswXSwgdlsxXSwgZik7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBpZiAoayA+IDEpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5saW5lYXIodlttXSwgdlttIC0gMV0sIG0gLSBmKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLmxpbmVhcih2W2ldLCB2W2kgKyAxID4gbSA/IG0gOiBpICsgMV0sIGYgLSBpKTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGJlemllckludGVycG9sYXRpb246IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG4gICAgLy8gICAgIHZhciBiID0gMDtcclxuICAgIC8vICAgICB2YXIgbiA9IHYubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgYiArPSBNYXRoLnBvdygxIC0gaywgbiAtIGkpICogTWF0aC5wb3coaywgaSkgKiB2W2ldICogdGhpcy5iZXJuc3RlaW4obiwgaSk7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICByZXR1cm4gYjtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGNhdG11bGxSb21JbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiAodiwgaykge1xyXG5cclxuICAgIC8vICAgICB2YXIgbSA9IHYubGVuZ3RoIC0gMTtcclxuICAgIC8vICAgICB2YXIgZiA9IG0gKiBrO1xyXG4gICAgLy8gICAgIHZhciBpID0gTWF0aC5mbG9vcihmKTtcclxuXHJcbiAgICAvLyAgICAgaWYgKHZbMF0gPT09IHZbbV0pXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBpZiAoayA8IDApXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGkgPSBNYXRoLmZsb29yKGYgPSBtICogKDEgKyBrKSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLmNhdG11bGxSb20odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaWYgKGsgPCAwKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gdlswXSAtICh0aGlzLmNhdG11bGxSb20odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIGlmIChrID4gMSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHZbbV0gLSAodGhpcy5jYXRtdWxsUm9tKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLmNhdG11bGxSb20odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBsaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcclxuICAgIC8vICAgICByZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBiZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuZmFjdG9yaWFsKG4pIC8gdGhpcy5mYWN0b3JpYWwoaSkgLyB0aGlzLmZhY3RvcmlhbChuIC0gaSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGZhY3RvcmlhbCA6IGZ1bmN0aW9uKCB2YWx1ZSApe1xyXG5cclxuICAgIC8vICAgICBpZiAodmFsdWUgPT09IDApXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gMTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHZhciByZXMgPSB2YWx1ZTtcclxuXHJcbiAgICAvLyAgICAgd2hpbGUoLS12YWx1ZSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJlcyAqPSB2YWx1ZTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiByZXM7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBjYXRtdWxsUm9tOiBmdW5jdGlvbiAocDAsIHAxLCBwMiwgcDMsIHQpIHtcclxuXHJcbiAgICAvLyAgICAgdmFyIHYwID0gKHAyIC0gcDApICogMC41LCB2MSA9IChwMyAtIHAxKSAqIDAuNSwgdDIgPSB0ICogdCwgdDMgPSB0ICogdDI7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiAoMiAqIHAxIC0gMiAqIHAyICsgdjAgKyB2MSkgKiB0MyArICgtMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGRpZmZlcmVuY2U6IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZ2V0UmFuZG9tOiBmdW5jdGlvbiAob2JqZWN0cywgc3RhcnRJbmRleCwgbGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5BcnJheVV0aWxzLmdldFJhbmRvbUl0ZW0ob2JqZWN0cywgc3RhcnRJbmRleCwgbGVuZ3RoKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gcmVtb3ZlUmFuZG9tOiBmdW5jdGlvbiAob2JqZWN0cywgc3RhcnRJbmRleCwgbGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5BcnJheVV0aWxzLnJlbW92ZVJhbmRvbUl0ZW0ob2JqZWN0cywgc3RhcnRJbmRleCwgbGVuZ3RoKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZmxvb3I6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLnRydW5jKHZhbHVlKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gY2VpbDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5NYXRoLnJvdW5kQXdheUZyb21aZXJvKHZhbHVlKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gcm91bmRBd2F5RnJvbVplcm86IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgLy8gICAgIC8vIFwiT3Bwb3NpdGVcIiBvZiB0cnVuY2F0ZS5cclxuICAgIC8vICAgICByZXR1cm4gKHZhbHVlID4gMCkgPyBNYXRoLmNlaWwodmFsdWUpIDogTWF0aC5mbG9vcih2YWx1ZSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHNpbkNvc0dlbmVyYXRvcjogZnVuY3Rpb24gKGxlbmd0aCwgc2luQW1wbGl0dWRlLCBjb3NBbXBsaXR1ZGUsIGZyZXF1ZW5jeSkge1xyXG5cclxuICAgIC8vICAgICBpZiAodHlwZW9mIHNpbkFtcGxpdHVkZSA9PT0gJ3VuZGVmaW5lZCcpIHsgc2luQW1wbGl0dWRlID0gMS4wOyB9XHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBjb3NBbXBsaXR1ZGUgPT09ICd1bmRlZmluZWQnKSB7IGNvc0FtcGxpdHVkZSA9IDEuMDsgfVxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgZnJlcXVlbmN5ID09PSAndW5kZWZpbmVkJykgeyBmcmVxdWVuY3kgPSAxLjA7IH1cclxuXHJcbiAgICAvLyAgICAgdmFyIHNpbiA9IHNpbkFtcGxpdHVkZTtcclxuICAgIC8vICAgICB2YXIgY29zID0gY29zQW1wbGl0dWRlO1xyXG4gICAgLy8gICAgIHZhciBmcnEgPSBmcmVxdWVuY3kgKiBNYXRoLlBJIC8gbGVuZ3RoO1xyXG5cclxuICAgIC8vICAgICB2YXIgY29zVGFibGUgPSBbXTtcclxuICAgIC8vICAgICB2YXIgc2luVGFibGUgPSBbXTtcclxuXHJcbiAgICAvLyAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBsZW5ndGg7IGMrKykge1xyXG5cclxuICAgIC8vICAgICAgICAgY29zIC09IHNpbiAqIGZycTtcclxuICAgIC8vICAgICAgICAgc2luICs9IGNvcyAqIGZycTtcclxuXHJcbiAgICAvLyAgICAgICAgIGNvc1RhYmxlW2NdID0gY29zO1xyXG4gICAgLy8gICAgICAgICBzaW5UYWJsZVtjXSA9IHNpbjtcclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICByZXR1cm4geyBzaW46IHNpblRhYmxlLCBjb3M6IGNvc1RhYmxlLCBsZW5ndGg6IGxlbmd0aCB9O1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc2hpZnQ6IGZ1bmN0aW9uIChhcnJheSkge1xyXG5cclxuICAgIC8vICAgICB2YXIgcyA9IGFycmF5LnNoaWZ0KCk7XHJcbiAgICAvLyAgICAgYXJyYXkucHVzaChzKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHM7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBzaHVmZmxlQXJyYXk6IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgLy8gICAgIHJldHVybiBQaGFzZXIuQXJyYXlVdGlscy5zaHVmZmxlKGFycmF5KTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgZGlzdGFuY2U6IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5Mikge1xyXG5cclxuICAgICAgICB2YXIgZHggPSB4MSAtIHgyO1xyXG4gICAgICAgIHZhciBkeSA9IHkxIC0geTI7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gZGlzdGFuY2VQb3c6IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5MiwgcG93KSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgcG93ID09PSAndW5kZWZpbmVkJykgeyBwb3cgPSAyOyB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeDIgLSB4MSwgcG93KSArIE1hdGgucG93KHkyIC0geTEsIHBvdykpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZGlzdGFuY2VSb3VuZGVkOiBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5yb3VuZChQaGFzZXIuTWF0aC5kaXN0YW5jZSh4MSwgeTEsIHgyLCB5MikpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBjbGFtcDogZnVuY3Rpb24gKHgsIGEsIGIpIHtcclxuICAgIC8vICAgICByZXR1cm4gKCB4IDwgYSApID8gYSA6ICggKCB4ID4gYiApID8gYiA6IHggKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gY2xhbXBCb3R0b206IGZ1bmN0aW9uICh4LCBhKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHggPCBhID8gYSA6IHg7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHdpdGhpbjogZnVuY3Rpb24gKGEsIGIsIHRvbGVyYW5jZSkge1xyXG4gICAgLy8gICAgIHJldHVybiAoTWF0aC5hYnMoYSAtIGIpIDw9IHRvbGVyYW5jZSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG1hcExpbmVhcjogZnVuY3Rpb24gKHgsIGExLCBhMiwgYjEsIGIyKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGIxICsgKCB4IC0gYTEgKSAqICggYjIgLSBiMSApIC8gKCBhMiAtIGExICk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHNtb290aHN0ZXA6IGZ1bmN0aW9uICh4LCBtaW4sIG1heCkge1xyXG4gICAgLy8gICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoeCAtIG1pbikgLyAobWF4IC0gbWluKSkpO1xyXG4gICAgLy8gICAgIHJldHVybiB4ICogeCAqICgzIC0gMiAqIHgpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBzbW9vdGhlcnN0ZXA6IGZ1bmN0aW9uICh4LCBtaW4sIG1heCkge1xyXG4gICAgLy8gICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoeCAtIG1pbikgLyAobWF4IC0gbWluKSkpO1xyXG4gICAgLy8gICAgIHJldHVybiB4ICogeCAqIHggKiAoeCAqICh4ICogNiAtIDE1KSArIDEwKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc2lnbjogZnVuY3Rpb24gKHgpIHtcclxuICAgIC8vICAgICByZXR1cm4gKCB4IDwgMCApID8gLTEgOiAoICggeCA+IDAgKSA/IDEgOiAwICk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHBlcmNlbnQ6IGZ1bmN0aW9uIChhLCBiLCBiYXNlKSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgYmFzZSA9PT0gJ3VuZGVmaW5lZCcpIHsgYmFzZSA9IDA7IH1cclxuXHJcbiAgICAvLyAgICAgaWYgKGEgPiBiIHx8IGJhc2UgPiBiKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2UgaWYgKGEgPCBiYXNlIHx8IGJhc2UgPiBhKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2VcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiAoYSAtIGJhc2UpIC8gYjtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gfVxyXG5cclxufTtcclxuXHJcbnZhciBkZWdyZWVUb1JhZGlhbnNGYWN0b3IgPSBNYXRoLlBJIC8gMTgwO1xyXG52YXIgcmFkaWFuVG9EZWdyZWVzRmFjdG9yID0gMTgwIC8gTWF0aC5QSTtcclxuXHJcblRpbnkuTWF0aC5kZWdUb1JhZCA9IGZ1bmN0aW9uIGRlZ1RvUmFkIChkZWdyZWVzKSB7XHJcbiAgICByZXR1cm4gZGVncmVlcyAqIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvcjtcclxufTtcclxuXHJcblRpbnkuTWF0aC5yYWRUb0RlZyA9IGZ1bmN0aW9uIHJhZFRvRGVnIChyYWRpYW5zKSB7XHJcbiAgICByZXR1cm4gcmFkaWFucyAqIHJhZGlhblRvRGVncmVlc0ZhY3RvcjtcclxufTsiLCJcclxuVGlueS5NYXRyaXggPSBmdW5jdGlvbigpXHJcbntcclxuXHJcbiAgICB0aGlzLmEgPSAxO1xyXG5cclxuICAgIHRoaXMuYiA9IDA7XHJcblxyXG4gICAgdGhpcy5jID0gMDtcclxuXHJcbiAgICB0aGlzLmQgPSAxO1xyXG5cclxuICAgIHRoaXMudHggPSAwO1xyXG5cclxuICAgIHRoaXMudHkgPSAwO1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuTUFUUklYO1xyXG5cclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5mcm9tQXJyYXkgPSBmdW5jdGlvbihhcnJheSlcclxue1xyXG4gICAgdGhpcy5hID0gYXJyYXlbMF07XHJcbiAgICB0aGlzLmIgPSBhcnJheVsxXTtcclxuICAgIHRoaXMuYyA9IGFycmF5WzNdO1xyXG4gICAgdGhpcy5kID0gYXJyYXlbNF07XHJcbiAgICB0aGlzLnR4ID0gYXJyYXlbMl07XHJcbiAgICB0aGlzLnR5ID0gYXJyYXlbNV07XHJcbn07XHJcblxyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbih0cmFuc3Bvc2UpXHJcbntcclxuICAgIGlmICghdGhpcy5hcnJheSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFycmF5ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xyXG5cclxuICAgIGlmICh0cmFuc3Bvc2UpXHJcbiAgICB7XHJcbiAgICAgICAgYXJyYXlbMF0gPSB0aGlzLmE7XHJcbiAgICAgICAgYXJyYXlbMV0gPSB0aGlzLmI7XHJcbiAgICAgICAgYXJyYXlbMl0gPSAwO1xyXG4gICAgICAgIGFycmF5WzNdID0gdGhpcy5jO1xyXG4gICAgICAgIGFycmF5WzRdID0gdGhpcy5kO1xyXG4gICAgICAgIGFycmF5WzVdID0gMDtcclxuICAgICAgICBhcnJheVs2XSA9IHRoaXMudHg7XHJcbiAgICAgICAgYXJyYXlbN10gPSB0aGlzLnR5O1xyXG4gICAgICAgIGFycmF5WzhdID0gMTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBhcnJheVswXSA9IHRoaXMuYTtcclxuICAgICAgICBhcnJheVsxXSA9IHRoaXMuYztcclxuICAgICAgICBhcnJheVsyXSA9IHRoaXMudHg7XHJcbiAgICAgICAgYXJyYXlbM10gPSB0aGlzLmI7XHJcbiAgICAgICAgYXJyYXlbNF0gPSB0aGlzLmQ7XHJcbiAgICAgICAgYXJyYXlbNV0gPSB0aGlzLnR5O1xyXG4gICAgICAgIGFycmF5WzZdID0gMDtcclxuICAgICAgICBhcnJheVs3XSA9IDA7XHJcbiAgICAgICAgYXJyYXlbOF0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJheTtcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHBvcywgbmV3UG9zKVxyXG57XHJcbiAgICBuZXdQb3MgPSBuZXdQb3MgfHwgbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB2YXIgeCA9IHBvcy54O1xyXG4gICAgdmFyIHkgPSBwb3MueTtcclxuXHJcbiAgICBuZXdQb3MueCA9IHRoaXMuYSAqIHggKyB0aGlzLmMgKiB5ICsgdGhpcy50eDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5iICogeCArIHRoaXMuZCAqIHkgKyB0aGlzLnR5O1xyXG5cclxuICAgIHJldHVybiBuZXdQb3M7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwbHlJbnZlcnNlID0gZnVuY3Rpb24ocG9zLCBuZXdQb3MpXHJcbntcclxuICAgIG5ld1BvcyA9IG5ld1BvcyB8fCBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHZhciBpZCA9IDEgLyAodGhpcy5hICogdGhpcy5kICsgdGhpcy5jICogLXRoaXMuYik7XHJcbiAgICB2YXIgeCA9IHBvcy54O1xyXG4gICAgdmFyIHkgPSBwb3MueTtcclxuXHJcbiAgICBuZXdQb3MueCA9IHRoaXMuZCAqIGlkICogeCArIC10aGlzLmMgKiBpZCAqIHkgKyAodGhpcy50eSAqIHRoaXMuYyAtIHRoaXMudHggKiB0aGlzLmQpICogaWQ7XHJcbiAgICBuZXdQb3MueSA9IHRoaXMuYSAqIGlkICogeSArIC10aGlzLmIgKiBpZCAqIHggKyAoLXRoaXMudHkgKiB0aGlzLmEgKyB0aGlzLnR4ICogdGhpcy5iKSAqIGlkO1xyXG5cclxuICAgIHJldHVybiBuZXdQb3M7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgdGhpcy50eCArPSB4O1xyXG4gICAgdGhpcy50eSArPSB5O1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5zY2FsZSA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIHRoaXMuYSAqPSB4O1xyXG4gICAgdGhpcy5kICo9IHk7XHJcbiAgICB0aGlzLmMgKj0geDtcclxuICAgIHRoaXMuYiAqPSB5O1xyXG4gICAgdGhpcy50eCAqPSB4O1xyXG4gICAgdGhpcy50eSAqPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uKGFuZ2xlKVxyXG57XHJcbiAgICB2YXIgY29zID0gTWF0aC5jb3MoIGFuZ2xlICk7XHJcbiAgICB2YXIgc2luID0gTWF0aC5zaW4oIGFuZ2xlICk7XHJcblxyXG4gICAgdmFyIGExID0gdGhpcy5hO1xyXG4gICAgdmFyIGMxID0gdGhpcy5jO1xyXG4gICAgdmFyIHR4MSA9IHRoaXMudHg7XHJcblxyXG4gICAgdGhpcy5hID0gYTEgKiBjb3MtdGhpcy5iICogc2luO1xyXG4gICAgdGhpcy5iID0gYTEgKiBzaW4rdGhpcy5iICogY29zO1xyXG4gICAgdGhpcy5jID0gYzEgKiBjb3MtdGhpcy5kICogc2luO1xyXG4gICAgdGhpcy5kID0gYzEgKiBzaW4rdGhpcy5kICogY29zO1xyXG4gICAgdGhpcy50eCA9IHR4MSAqIGNvcyAtIHRoaXMudHkgKiBzaW47XHJcbiAgICB0aGlzLnR5ID0gdHgxICogc2luICsgdGhpcy50eSAqIGNvcztcclxuIFxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obWF0cml4KVxyXG57XHJcbiAgICB2YXIgYTEgPSB0aGlzLmE7XHJcbiAgICB2YXIgYjEgPSB0aGlzLmI7XHJcbiAgICB2YXIgYzEgPSB0aGlzLmM7XHJcbiAgICB2YXIgZDEgPSB0aGlzLmQ7XHJcblxyXG4gICAgdGhpcy5hICA9IG1hdHJpeC5hICogYTEgKyBtYXRyaXguYiAqIGMxO1xyXG4gICAgdGhpcy5iICA9IG1hdHJpeC5hICogYjEgKyBtYXRyaXguYiAqIGQxO1xyXG4gICAgdGhpcy5jICA9IG1hdHJpeC5jICogYTEgKyBtYXRyaXguZCAqIGMxO1xyXG4gICAgdGhpcy5kICA9IG1hdHJpeC5jICogYjEgKyBtYXRyaXguZCAqIGQxO1xyXG5cclxuICAgIHRoaXMudHggPSBtYXRyaXgudHggKiBhMSArIG1hdHJpeC50eSAqIGMxICsgdGhpcy50eDtcclxuICAgIHRoaXMudHkgPSBtYXRyaXgudHggKiBiMSArIG1hdHJpeC50eSAqIGQxICsgdGhpcy50eTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuaWRlbnRpdHkgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuYSA9IDE7XHJcbiAgICB0aGlzLmIgPSAwO1xyXG4gICAgdGhpcy5jID0gMDtcclxuICAgIHRoaXMuZCA9IDE7XHJcbiAgICB0aGlzLnR4ID0gMDtcclxuICAgIHRoaXMudHkgPSAwO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5pZGVudGl0eU1hdHJpeCA9IG5ldyBUaW55Lk1hdHJpeCgpOyIsIlRpbnkuUG9pbnQgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG59O1xyXG5cclxuVGlueS5Qb2ludC5wcm90b3R5cGUgPSB7XHJcblx0IHNldDogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICAgICAgdGhpcy55ID0geSB8fCAoICh5ICE9PSAwKSA/IHRoaXMueCA6IDAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRvOiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgXHR0aGlzLnNldCh4LCB5KVxyXG4gICAgfVxyXG59OyIsIlxyXG5UaW55LlBvbHlnb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFyZWEgPSAwO1xyXG4gICAgdGhpcy5fcG9pbnRzID0gW107XHJcblxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0VG8uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5QT0xZO1xyXG5cclxufTtcclxuXHJcblRpbnkuUG9seWdvbi5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgdG9OdW1iZXJBcnJheTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gJ3VuZGVmaW5lZCcpIHsgb3V0cHV0ID0gW107IH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wb2ludHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3BvaW50c1tpXSA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh0aGlzLl9wb2ludHNbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXS54KTtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGZsYXR0ZW46IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy50b051bWJlckFycmF5KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuXHJcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMuX3BvaW50cy5zbGljZSgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvdXRwdXQgPT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5Qb2x5Z29uKHBvaW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dC5zZXRUbyhwb2ludHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoeCwgeSkge1xyXG5cclxuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5fcG9pbnRzLmxlbmd0aDtcclxuICAgICAgICB2YXIgaW5zaWRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAtMSwgaiA9IGxlbmd0aCAtIDE7ICsraSA8IGxlbmd0aDsgaiA9IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaXggPSB0aGlzLl9wb2ludHNbaV0ueDtcclxuICAgICAgICAgICAgdmFyIGl5ID0gdGhpcy5fcG9pbnRzW2ldLnk7XHJcblxyXG4gICAgICAgICAgICB2YXIganggPSB0aGlzLl9wb2ludHNbal0ueDtcclxuICAgICAgICAgICAgdmFyIGp5ID0gdGhpcy5fcG9pbnRzW2pdLnk7XHJcblxyXG4gICAgICAgICAgICBpZiAoKChpeSA8PSB5ICYmIHkgPCBqeSkgfHwgKGp5IDw9IHkgJiYgeSA8IGl5KSkgJiYgKHggPCAoanggLSBpeCkgKiAoeSAtIGl5KSAvIChqeSAtIGl5KSArIGl4KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5zaWRlID0gIWluc2lkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluc2lkZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRvOiBmdW5jdGlvbiAocG9pbnRzKSB7XHJcblxyXG4gICAgICAgIHRoaXMuYXJlYSA9IDA7XHJcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gW107XHJcblxyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBJZiBwb2ludHMgaXNuJ3QgYW4gYXJyYXksIHVzZSBhcmd1bWVudHMgYXMgdGhlIGFycmF5XHJcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwb2ludHMpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgeTAgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsbG93cyBmb3IgbWl4ZWQtdHlwZSBhcmd1bWVudHNcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludHNbaV0gPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IFRpbnkuUG9pbnQocG9pbnRzW2ldLCBwb2ludHNbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgVGlueS5Qb2ludChwb2ludHNbaV0ueCwgcG9pbnRzW2ldLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvaW50cy5wdXNoKHApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICBMb3dlc3QgYm91bmRhcnlcclxuICAgICAgICAgICAgICAgIGlmIChwLnkgPCB5MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB5MCA9IHAueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVBcmVhKHkwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2FsY3VsYXRlQXJlYTogZnVuY3Rpb24gKHkwKSB7XHJcblxyXG4gICAgICAgIHZhciBwMTtcclxuICAgICAgICB2YXIgcDI7XHJcbiAgICAgICAgdmFyIGF2Z0hlaWdodDtcclxuICAgICAgICB2YXIgd2lkdGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9wb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwMSA9IHRoaXMuX3BvaW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpID09PSBsZW4gLSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuX3BvaW50c1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5fcG9pbnRzW2kgKyAxXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXZnSGVpZ2h0ID0gKChwMS55IC0geTApICsgKHAyLnkgLSB5MCkpIC8gMjtcclxuICAgICAgICAgICAgd2lkdGggPSBwMS54IC0gcDIueDtcclxuICAgICAgICAgICAgdGhpcy5hcmVhICs9IGF2Z0hlaWdodCAqIHdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJlYTtcclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuVGlueS5Qb2x5Z29uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUG9seWdvbjtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlBvbHlnb24ucHJvdG90eXBlLCAncG9pbnRzJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbihwb2ludHMpIHtcclxuXHJcbiAgICAgICAgaWYgKHBvaW50cyAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUbyhwb2ludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgQ2xlYXIgdGhlIHBvaW50c1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG4iLCJcclxuVGlueS5SZWN0YW5nbGUgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgd2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLlJFQ1RcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICAvLyBvZmZzZXQ6IGZ1bmN0aW9uIChkeCwgZHkpIHtcclxuXHJcbiAgICAvLyAgICAgdGhpcy54ICs9IGR4O1xyXG4gICAgLy8gICAgIHRoaXMueSArPSBkeTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBvZmZzZXRQb2ludDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLm9mZnNldChwb2ludC54LCBwb2ludC55KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIHNldFRvOiBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHNjYWxlOiBmdW5jdGlvbiAoeCwgeSkge1xyXG5cclxuICAgIC8vICAgICBpZiAodHlwZW9mIHkgPT09ICd1bmRlZmluZWQnKSB7IHkgPSB4OyB9XHJcblxyXG4gICAgLy8gICAgIHRoaXMud2lkdGggKj0geDtcclxuICAgIC8vICAgICB0aGlzLmhlaWdodCAqPSB5O1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGNlbnRlck9uOiBmdW5jdGlvbiAoeCwgeSkge1xyXG5cclxuICAgIC8vICAgICB0aGlzLmNlbnRlclggPSB4O1xyXG4gICAgLy8gICAgIHRoaXMuY2VudGVyWSA9IHk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZmxvb3I6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyAgICAgdGhpcy54ID0gTWF0aC5mbG9vcih0aGlzLngpO1xyXG4gICAgLy8gICAgIHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGZsb29yQWxsOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gICAgIHRoaXMueCA9IE1hdGguZmxvb3IodGhpcy54KTtcclxuICAgIC8vICAgICB0aGlzLnkgPSBNYXRoLmZsb29yKHRoaXMueSk7XHJcbiAgICAvLyAgICAgdGhpcy53aWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCk7XHJcbiAgICAvLyAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGNvcHlGcm9tOiBmdW5jdGlvbiAoc291cmNlKSB7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLnNldFRvKHNvdXJjZS54LCBzb3VyY2UueSwgc291cmNlLndpZHRoLCBzb3VyY2UuaGVpZ2h0KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGNvcHlUbzogZnVuY3Rpb24gKGRlc3QpIHtcclxuXHJcbiAgICAvLyAgICAgZGVzdC54ID0gdGhpcy54O1xyXG4gICAgLy8gICAgIGRlc3QueSA9IHRoaXMueTtcclxuICAgIC8vICAgICBkZXN0LndpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIC8vICAgICBkZXN0LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gZGVzdDtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGluZmxhdGU6IGZ1bmN0aW9uIChkeCwgZHkpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmluZmxhdGUodGhpcywgZHgsIGR5KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHNpemU6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLnNpemUodGhpcywgb3V0cHV0KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGNsb25lOiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jbG9uZSh0aGlzLCBvdXRwdXQpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNvbnRhaW5zUmVjdDogZnVuY3Rpb24gKGIpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUmVjdChiLCB0aGlzKTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGVxdWFsczogZnVuY3Rpb24gKGIpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmVxdWFscyh0aGlzLCBiKTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGludGVyc2VjdGlvbjogZnVuY3Rpb24gKGIsIG91dCkge1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0aW9uKHRoaXMsIGIsIG91dCk7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcblxyXG4gICAgaW50ZXJzZWN0czogZnVuY3Rpb24gKGIpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmludGVyc2VjdHModGhpcywgYik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnRlcnNlY3RzUmF3OiBmdW5jdGlvbiAobGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCB0b2xlcmFuY2UpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmludGVyc2VjdHNSYXcodGhpcywgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCB0b2xlcmFuY2UpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gdW5pb246IGZ1bmN0aW9uIChiLCBvdXQpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLnVuaW9uKHRoaXMsIGIsIG91dCk7XHJcblxyXG4gICAgLy8gfVxyXG5cclxufTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwiaGFsZldpZHRoXCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLndpZHRoIC8gMik7XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwiaGFsZkhlaWdodFwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5oZWlnaHQgLyAyKTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJib3R0b21cIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPD0gdGhpcy55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHZhbHVlIC0gdGhpcy55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJib3R0b21SaWdodFwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIG5ldyBUaW55LlBvaW50KHRoaXMucmlnaHQsIHRoaXMuYm90dG9tKTtcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuLy8gICAgICAgICB0aGlzLnJpZ2h0ID0gdmFsdWUueDtcclxuLy8gICAgICAgICB0aGlzLmJvdHRvbSA9IHZhbHVlLnk7XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwibGVmdFwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMueDtcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuLy8gICAgICAgICBpZiAodmFsdWUgPj0gdGhpcy5yaWdodCkge1xyXG4vLyAgICAgICAgICAgICB0aGlzLndpZHRoID0gMDtcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5yaWdodCAtIHZhbHVlO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICB0aGlzLnggPSB2YWx1ZTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJyaWdodFwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMueCkge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdmFsdWUgLSB0aGlzLng7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInZvbHVtZVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggKiB0aGlzLmhlaWdodDtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJwZXJpbWV0ZXJcIiwge1xyXG5cclxuLy8gICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgIHJldHVybiAodGhpcy53aWR0aCAqIDIpICsgKHRoaXMuaGVpZ2h0ICogMik7XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwiY2VudGVyWFwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMuaGFsZldpZHRoO1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4vLyAgICAgICAgIHRoaXMueCA9IHZhbHVlIC0gdGhpcy5oYWxmV2lkdGg7XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwiY2VudGVyWVwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGFsZkhlaWdodDtcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuLy8gICAgICAgICB0aGlzLnkgPSB2YWx1ZSAtIHRoaXMuaGFsZkhlaWdodDtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJyYW5kb21YXCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMueCArIChNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCk7XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInJhbmRvbVlcIiwge1xyXG5cclxuLy8gICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG5cclxuLy8gICAgICAgICByZXR1cm4gdGhpcy55ICsgKE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodCk7XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInRvcFwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMueTtcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuLy8gICAgICAgICBpZiAodmFsdWUgPj0gdGhpcy5ib3R0b20pIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4vLyAgICAgICAgICAgICB0aGlzLnkgPSB2YWx1ZTtcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmhlaWdodCA9ICh0aGlzLmJvdHRvbSAtIHZhbHVlKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwidG9wTGVmdFwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIG5ldyBUaW55LlBvaW50KHRoaXMueCwgdGhpcy55KTtcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuLy8gICAgICAgICB0aGlzLnggPSB2YWx1ZS54O1xyXG4vLyAgICAgICAgIHRoaXMueSA9IHZhbHVlLnk7XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwidG9wUmlnaHRcIiwge1xyXG5cclxuLy8gICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBuZXcgVGlueS5Qb2ludCh0aGlzLnggKyB0aGlzLndpZHRoLCB0aGlzLnkpO1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4vLyAgICAgICAgIHRoaXMucmlnaHQgPSB2YWx1ZS54O1xyXG4vLyAgICAgICAgIHRoaXMueSA9IHZhbHVlLnk7XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwiZW1wdHlcIiwge1xyXG5cclxuLy8gICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgIHJldHVybiAoIXRoaXMud2lkdGggfHwgIXRoaXMuaGVpZ2h0KTtcclxuLy8gICAgIH0sXHJcblxyXG4vLyAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbi8vICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxyXG4vLyAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5zZXRUbygwLCAwLCAwLCAwKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG5UaW55LlJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJlY3RhbmdsZTtcclxuXHJcbi8vIFRpbnkuUmVjdGFuZ2xlLmluZmxhdGUgPSBmdW5jdGlvbiAoYSwgZHgsIGR5KSB7XHJcblxyXG4vLyAgICAgYS54IC09IGR4O1xyXG4vLyAgICAgYS53aWR0aCArPSAyICogZHg7XHJcbi8vICAgICBhLnkgLT0gZHk7XHJcbi8vICAgICBhLmhlaWdodCArPSAyICogZHk7XHJcblxyXG4vLyAgICAgcmV0dXJuIGE7XHJcblxyXG4vLyB9O1xyXG5cclxuLy8gVGlueS5SZWN0YW5nbGUuaW5mbGF0ZVBvaW50ID0gZnVuY3Rpb24gKGEsIHBvaW50KSB7XHJcblxyXG4vLyAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmluZmxhdGUoYSwgcG9pbnQueCwgcG9pbnQueSk7XHJcblxyXG4vLyB9O1xyXG5cclxuLy8gVGlueS5SZWN0YW5nbGUuc2l6ZSA9IGZ1bmN0aW9uIChhLCBvdXRwdXQpIHtcclxuXHJcbi8vICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvdXRwdXQgPT09IG51bGwpXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgb3V0cHV0ID0gbmV3IFRpbnkuUG9pbnQoYS53aWR0aCwgYS5oZWlnaHQpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgZWxzZVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIG91dHB1dC5zZXRUbyhhLndpZHRoLCBhLmhlaWdodCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS5jbG9uZSA9IGZ1bmN0aW9uIChhLCBvdXRwdXQpIHtcclxuXHJcbi8vICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvdXRwdXQgPT09IG51bGwpXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgb3V0cHV0ID0gbmV3IFRpbnkuUmVjdGFuZ2xlKGEueCwgYS55LCBhLndpZHRoLCBhLmhlaWdodCk7XHJcbi8vICAgICB9XHJcbi8vICAgICBlbHNlXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgb3V0cHV0LnNldFRvKGEueCwgYS55LCBhLndpZHRoLCBhLmhlaWdodCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbi8vIH07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWlucyA9IGZ1bmN0aW9uIChhLCB4LCB5KSB7XHJcblxyXG4gICAgaWYgKGEud2lkdGggPD0gMCB8fCBhLmhlaWdodCA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKHggPj0gYS54ICYmIHggPCBhLnJpZ2h0ICYmIHkgPj0gYS55ICYmIHkgPCBhLmJvdHRvbSk7XHJcblxyXG59O1xyXG5cclxuLy8gVGlueS5SZWN0YW5nbGUuY29udGFpbnNSYXcgPSBmdW5jdGlvbiAocngsIHJ5LCBydywgcmgsIHgsIHkpIHtcclxuXHJcbi8vICAgICByZXR1cm4gKHggPj0gcnggJiYgeCA8IChyeCArIHJ3KSAmJiB5ID49IHJ5ICYmIHkgPCAocnkgKyByaCkpO1xyXG5cclxuLy8gfTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zUG9pbnQgPSBmdW5jdGlvbiAoYSwgcG9pbnQpIHtcclxuXHJcbiAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuY29udGFpbnMoYSwgcG9pbnQueCwgcG9pbnQueSk7XHJcblxyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUuY29udGFpbnNSZWN0ID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHJcbiAgICAvLyAgSWYgdGhlIGdpdmVuIHJlY3QgaGFzIGEgbGFyZ2VyIHZvbHVtZSB0aGFuIHRoaXMgb25lIHRoZW4gaXQgY2FuIG5ldmVyIGNvbnRhaW4gaXRcclxuICAgIGlmIChhLnZvbHVtZSA+IGIudm9sdW1lKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGEueCA+PSBiLnggJiYgYS55ID49IGIueSAmJiBhLnJpZ2h0IDwgYi5yaWdodCAmJiBhLmJvdHRvbSA8IGIuYm90dG9tKTtcclxuXHJcbn07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cclxuLy8gICAgIHJldHVybiAoYS54ID09IGIueCAmJiBhLnkgPT0gYi55ICYmIGEud2lkdGggPT0gYi53aWR0aCAmJiBhLmhlaWdodCA9PSBiLmhlaWdodCk7XHJcblxyXG4vLyB9O1xyXG5cclxuLy8gVGlueS5SZWN0YW5nbGUuc2FtZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cclxuLy8gICAgIHJldHVybiAoYS53aWR0aCA9PT0gYi53aWR0aCAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQpO1xyXG5cclxuLy8gfTtcclxuXHJcbi8vIFRpbnkuUmVjdGFuZ2xlLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uIChhLCBiLCBvdXRwdXQpIHtcclxuXHJcbi8vICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIilcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5SZWN0YW5nbGUoKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBpZiAoVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0cyhhLCBiKSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBvdXRwdXQueCA9IE1hdGgubWF4KGEueCwgYi54KTtcclxuLy8gICAgICAgICBvdXRwdXQueSA9IE1hdGgubWF4KGEueSwgYi55KTtcclxuLy8gICAgICAgICBvdXRwdXQud2lkdGggPSBNYXRoLm1pbihhLnJpZ2h0LCBiLnJpZ2h0KSAtIG91dHB1dC54O1xyXG4vLyAgICAgICAgIG91dHB1dC5oZWlnaHQgPSBNYXRoLm1pbihhLmJvdHRvbSwgYi5ib3R0b20pIC0gb3V0cHV0Lnk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIG91dHB1dDtcclxuXHJcbi8vIH07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHJcbiAgICBpZiAoYS53aWR0aCA8PSAwIHx8IGEuaGVpZ2h0IDw9IDAgfHwgYi53aWR0aCA8PSAwIHx8IGIuaGVpZ2h0IDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhKGEucmlnaHQgPCBiLnggfHwgYS5ib3R0b20gPCBiLnkgfHwgYS54ID4gYi5yaWdodCB8fCBhLnkgPiBiLmJvdHRvbSk7XHJcblxyXG59O1xyXG5cclxuLy8gVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0c1JhdyA9IGZ1bmN0aW9uIChhLCBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHRvbGVyYW5jZSkge1xyXG5cclxuLy8gICAgIGlmICh0eXBlb2YgdG9sZXJhbmNlID09PSBcInVuZGVmaW5lZFwiKSB7IHRvbGVyYW5jZSA9IDA7IH1cclxuXHJcbi8vICAgICByZXR1cm4gIShsZWZ0ID4gYS5yaWdodCArIHRvbGVyYW5jZSB8fCByaWdodCA8IGEubGVmdCAtIHRvbGVyYW5jZSB8fCB0b3AgPiBhLmJvdHRvbSArIHRvbGVyYW5jZSB8fCBib3R0b20gPCBhLnRvcCAtIHRvbGVyYW5jZSk7XHJcblxyXG4vLyB9O1xyXG5cclxuLy8gVGlueS5SZWN0YW5nbGUudW5pb24gPSBmdW5jdGlvbiAoYSwgYiwgb3V0cHV0KSB7XHJcblxyXG4vLyAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09IFwidW5kZWZpbmVkXCIpXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgb3V0cHV0ID0gbmV3IFRpbnkuUmVjdGFuZ2xlKCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIG91dHB1dC5zZXRUbyhNYXRoLm1pbihhLngsIGIueCksIE1hdGgubWluKGEueSwgYi55KSwgTWF0aC5tYXgoYS5yaWdodCwgYi5yaWdodCkgLSBNYXRoLm1pbihhLmxlZnQsIGIubGVmdCksIE1hdGgubWF4KGEuYm90dG9tLCBiLmJvdHRvbSkgLSBNYXRoLm1pbihhLnRvcCwgYi50b3ApKTtcclxuXHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS5hYWJiID0gZnVuY3Rpb24ocG9pbnRzLCBvdXQpIHtcclxuXHJcbi8vICAgICBpZiAodHlwZW9mIG91dCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4vLyAgICAgICAgIG91dCA9IG5ldyBUaW55LlJlY3RhbmdsZSgpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHZhciB4TWF4ID0gTnVtYmVyLk1JTl9WQUxVRSxcclxuLy8gICAgICAgICB4TWluID0gTnVtYmVyLk1BWF9WQUxVRSxcclxuLy8gICAgICAgICB5TWF4ID0gTnVtYmVyLk1JTl9WQUxVRSxcclxuLy8gICAgICAgICB5TWluID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbi8vICAgICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbihwb2ludCkge1xyXG4vLyAgICAgICAgIGlmIChwb2ludC54ID4geE1heCkge1xyXG4vLyAgICAgICAgICAgICB4TWF4ID0gcG9pbnQueDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgaWYgKHBvaW50LnggPCB4TWluKSB7XHJcbi8vICAgICAgICAgICAgIHhNaW4gPSBwb2ludC54O1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgaWYgKHBvaW50LnkgPiB5TWF4KSB7XHJcbi8vICAgICAgICAgICAgIHlNYXggPSBwb2ludC55O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBpZiAocG9pbnQueSA8IHlNaW4pIHtcclxuLy8gICAgICAgICAgICAgeU1pbiA9IHBvaW50Lnk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgb3V0LnNldFRvKHhNaW4sIHlNaW4sIHhNYXggLSB4TWluLCB5TWF4IC0geU1pbik7XHJcblxyXG4vLyAgICAgcmV0dXJuIG91dDtcclxuLy8gfTtcclxuXHJcblRpbnkuRW1wdHlSZWN0YW5nbGUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMCwgMCk7IiwiVGlueS5Sb3VuZGVkUmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG57XHJcblxyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXMgfHwgMjA7XHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUlJFQztcclxufTtcclxuXHJcblRpbnkuUm91bmRlZFJlY3RhbmdsZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiBuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5yYWRpdXMpO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIGlmICh0aGlzLndpZHRoIDw9IDAgfHwgdGhpcy5oZWlnaHQgPD0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHgxID0gdGhpcy54O1xyXG5cclxuICAgIGlmICh4ID49IHgxICYmIHggPD0geDEgKyB0aGlzLndpZHRoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB5MSA9IHRoaXMueTtcclxuXHJcbiAgICAgICAgaWYgKHkgPj0geTEgJiYgeSA8PSB5MSArIHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuUm91bmRlZFJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJvdW5kZWRSZWN0YW5nbGU7IiwiVGlueS5HcmFwaGljc0RhdGEgPSBmdW5jdGlvbihsaW5lV2lkdGgsIGxpbmVDb2xvciwgbGluZUFscGhhLCBmaWxsQ29sb3IsIGZpbGxBbHBoYSwgZmlsbCwgc2hhcGUpIHtcclxuICAgIHRoaXMubGluZVdpZHRoID0gbGluZVdpZHRoO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSBsaW5lQ29sb3I7XHJcbiAgICB0aGlzLmxpbmVBbHBoYSA9IGxpbmVBbHBoYTtcclxuICAgIHRoaXMuX2xpbmVUaW50ID0gbGluZUNvbG9yO1xyXG4gICAgdGhpcy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IGZpbGxBbHBoYTtcclxuICAgIHRoaXMuX2ZpbGxUaW50ID0gZmlsbENvbG9yO1xyXG4gICAgdGhpcy5maWxsID0gZmlsbDtcclxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcclxuICAgIHRoaXMudHlwZSA9IHNoYXBlLnR5cGU7XHJcblxyXG59O1xyXG5cclxuVGlueS5HcmFwaGljc0RhdGEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5HcmFwaGljc0RhdGE7XHJcblxyXG5UaW55LkdyYXBoaWNzRGF0YS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IEdyYXBoaWNzRGF0YShcclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCxcclxuICAgICAgICB0aGlzLmxpbmVDb2xvcixcclxuICAgICAgICB0aGlzLmxpbmVBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGxDb2xvcixcclxuICAgICAgICB0aGlzLmZpbGxBbHBoYSxcclxuICAgICAgICB0aGlzLmZpbGwsXHJcbiAgICAgICAgdGhpcy5zaGFwZVxyXG4gICAgKTtcclxuXHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBUaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5maWxsQWxwaGEgPSAxO1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSAwO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSAwO1xyXG4gICAgdGhpcy5ncmFwaGljc0RhdGEgPSBbXTtcclxuICAgIHRoaXMudGludCA9IDB4RkZGRkZGO1xyXG4gICAgdGhpcy5ibGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcbiAgICB0aGlzLmN1cnJlbnRQYXRoID0gbnVsbDtcclxuICAgIHRoaXMuX3dlYkdMID0gW107XHJcbiAgICB0aGlzLmlzTWFzayA9IGZhbHNlO1xyXG4gICAgdGhpcy5ib3VuZHNQYWRkaW5nID0gMDtcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcyA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLDAsMSwxKTtcclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSBmYWxzZTtcclxuXHJcbn07XHJcblxyXG4vLyBjb25zdHJ1Y3RvclxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUgKTtcclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkdyYXBoaWNzO1xyXG5cclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVTdHlsZSA9IGZ1bmN0aW9uKGxpbmVXaWR0aCwgY29sb3IsIGFscGhhKVxyXG57XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aCB8fCAwO1xyXG4gICAgdGhpcy5saW5lQ29sb3IgPSBjb2xvciB8fCAwO1xyXG4gICAgdGhpcy5saW5lQWxwaGEgPSAoYWxwaGEgPT09IHVuZGVmaW5lZCkgPyAxIDogYWxwaGE7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGhhbGZ3YXkgdGhyb3VnaCBhIGxpbmU/IHN0YXJ0IGEgbmV3IG9uZSFcclxuICAgICAgICAgICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbih0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5zbGljZSgtMikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGl0cyBlbXB0eSBzbyBsZXRzIGp1c3Qgc2V0IHRoZSBsaW5lIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5saW5lQ29sb3IgPSB0aGlzLmxpbmVDb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5saW5lQWxwaGEgPSB0aGlzLmxpbmVBbHBoYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbih4LCB5KVxyXG57XHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5Qb2x5Z29uKFt4LCB5XSkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUubGluZVRvID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLnB1c2goeCwgeSk7XHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLnF1YWRyYXRpY0N1cnZlVG8gPSBmdW5jdGlvbihjcFgsIGNwWSwgdG9YLCB0b1kpXHJcbntcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyA9IFswLCAwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeGEsXHJcbiAgICAgICAgeWEsXHJcbiAgICAgICAgbiA9IDIwLFxyXG4gICAgICAgIHBvaW50cyA9IHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzO1xyXG5cclxuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBmcm9tWCA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl07XHJcbiAgICB2YXIgZnJvbVkgPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgdmFyIGogPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gbjsgKytpKVxyXG4gICAge1xyXG4gICAgICAgIGogPSBpIC8gbjtcclxuXHJcbiAgICAgICAgeGEgPSBmcm9tWCArICggKGNwWCAtIGZyb21YKSAqIGogKTtcclxuICAgICAgICB5YSA9IGZyb21ZICsgKCAoY3BZIC0gZnJvbVkpICogaiApO1xyXG5cclxuICAgICAgICBwb2ludHMucHVzaCggeGEgKyAoICgoY3BYICsgKCAodG9YIC0gY3BYKSAqIGogKSkgLSB4YSkgKiBqICksXHJcbiAgICAgICAgICAgICAgICAgICAgIHlhICsgKCAoKGNwWSArICggKHRvWSAtIGNwWSkgKiBqICkpIC0geWEpICogaiApICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5iZXppZXJDdXJ2ZVRvID0gZnVuY3Rpb24oY3BYLCBjcFksIGNwWDIsIGNwWTIsIHRvWCwgdG9ZKVxyXG57XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKDAsMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG4gPSAyMCxcclxuICAgICAgICBkdCxcclxuICAgICAgICBkdDIsXHJcbiAgICAgICAgZHQzLFxyXG4gICAgICAgIHQyLFxyXG4gICAgICAgIHQzLFxyXG4gICAgICAgIHBvaW50cyA9IHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzO1xyXG5cclxuICAgIHZhciBmcm9tWCA9IHBvaW50c1twb2ludHMubGVuZ3RoLTJdO1xyXG4gICAgdmFyIGZyb21ZID0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMV07XHJcbiAgICB2YXIgaiA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gbjsgKytpKVxyXG4gICAge1xyXG4gICAgICAgIGogPSBpIC8gbjtcclxuXHJcbiAgICAgICAgZHQgPSAoMSAtIGopO1xyXG4gICAgICAgIGR0MiA9IGR0ICogZHQ7XHJcbiAgICAgICAgZHQzID0gZHQyICogZHQ7XHJcblxyXG4gICAgICAgIHQyID0gaiAqIGo7XHJcbiAgICAgICAgdDMgPSB0MiAqIGo7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcG9pbnRzLnB1c2goIGR0MyAqIGZyb21YICsgMyAqIGR0MiAqIGogKiBjcFggKyAzICogZHQgKiB0MiAqIGNwWDIgKyB0MyAqIHRvWCxcclxuICAgICAgICAgICAgICAgICAgICAgZHQzICogZnJvbVkgKyAzICogZHQyICogaiAqIGNwWSArIDMgKiBkdCAqIHQyICogY3BZMiArIHQzICogdG9ZKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5hcmNUbyA9IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyLCByYWRpdXMpXHJcbntcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5wdXNoKHgxLCB5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKHgxLCB5MSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBvaW50cyA9IHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLFxyXG4gICAgICAgIGZyb21YID0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl0sXHJcbiAgICAgICAgZnJvbVkgPSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSxcclxuICAgICAgICBhMSA9IGZyb21ZIC0geTEsXHJcbiAgICAgICAgYjEgPSBmcm9tWCAtIHgxLFxyXG4gICAgICAgIGEyID0geTIgICAtIHkxLFxyXG4gICAgICAgIGIyID0geDIgICAtIHgxLFxyXG4gICAgICAgIG1tID0gTWF0aC5hYnMoYTEgKiBiMiAtIGIxICogYTIpO1xyXG5cclxuICAgIGlmIChtbSA8IDEuMGUtOCB8fCByYWRpdXMgPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHBvaW50c1twb2ludHMubGVuZ3RoLTJdICE9PSB4MSB8fCBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSAhPT0geTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaCh4MSwgeTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB2YXIgZGQgPSBhMSAqIGExICsgYjEgKiBiMSxcclxuICAgICAgICAgICAgY2MgPSBhMiAqIGEyICsgYjIgKiBiMixcclxuICAgICAgICAgICAgdHQgPSBhMSAqIGEyICsgYjEgKiBiMixcclxuICAgICAgICAgICAgazEgPSByYWRpdXMgKiBNYXRoLnNxcnQoZGQpIC8gbW0sXHJcbiAgICAgICAgICAgIGsyID0gcmFkaXVzICogTWF0aC5zcXJ0KGNjKSAvIG1tLFxyXG4gICAgICAgICAgICBqMSA9IGsxICogdHQgLyBkZCxcclxuICAgICAgICAgICAgajIgPSBrMiAqIHR0IC8gY2MsXHJcbiAgICAgICAgICAgIGN4ID0gazEgKiBiMiArIGsyICogYjEsXHJcbiAgICAgICAgICAgIGN5ID0gazEgKiBhMiArIGsyICogYTEsXHJcbiAgICAgICAgICAgIHB4ID0gYjEgKiAoazIgKyBqMSksXHJcbiAgICAgICAgICAgIHB5ID0gYTEgKiAoazIgKyBqMSksXHJcbiAgICAgICAgICAgIHF4ID0gYjIgKiAoazEgKyBqMiksXHJcbiAgICAgICAgICAgIHF5ID0gYTIgKiAoazEgKyBqMiksXHJcbiAgICAgICAgICAgIHN0YXJ0QW5nbGUgPSBNYXRoLmF0YW4yKHB5IC0gY3ksIHB4IC0gY3gpLFxyXG4gICAgICAgICAgICBlbmRBbmdsZSAgID0gTWF0aC5hdGFuMihxeSAtIGN5LCBxeCAtIGN4KTtcclxuXHJcbiAgICAgICAgdGhpcy5hcmMoY3ggKyB4MSwgY3kgKyB5MSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYjEgKiBhMiA+IGIyICogYTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuYXJjID0gZnVuY3Rpb24oY3gsIGN5LCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBhbnRpY2xvY2t3aXNlKVxyXG57XHJcbiAgICAvLyAgSWYgd2UgZG8gdGhpcyB3ZSBjYW4gbmV2ZXIgZHJhdyBhIGZ1bGwgY2lyY2xlXHJcbiAgICBpZiAoc3RhcnRBbmdsZSA9PT0gZW5kQW5nbGUpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBhbnRpY2xvY2t3aXNlID09PSAndW5kZWZpbmVkJykgeyBhbnRpY2xvY2t3aXNlID0gZmFsc2U7IH1cclxuXHJcbiAgICBpZiAoIWFudGljbG9ja3dpc2UgJiYgZW5kQW5nbGUgPD0gc3RhcnRBbmdsZSlcclxuICAgIHtcclxuICAgICAgICBlbmRBbmdsZSArPSBNYXRoLlBJICogMjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFudGljbG9ja3dpc2UgJiYgc3RhcnRBbmdsZSA8PSBlbmRBbmdsZSlcclxuICAgIHtcclxuICAgICAgICBzdGFydEFuZ2xlICs9IE1hdGguUEkgKiAyO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzd2VlcCA9IGFudGljbG9ja3dpc2UgPyAoc3RhcnRBbmdsZSAtIGVuZEFuZ2xlKSAqIC0xIDogKGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSk7XHJcbiAgICB2YXIgc2VncyA9ICBNYXRoLmNlaWwoTWF0aC5hYnMoc3dlZXApIC8gKE1hdGguUEkgKiAyKSkgKiA0MDtcclxuXHJcbiAgICAvLyAgU3dlZXAgY2hlY2sgLSBtb3ZlZCBoZXJlIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBkbyB0aGUgbW92ZVRvIGJlbG93IGlmIHRoZSBhcmMgZmFpbHNcclxuICAgIGlmIChzd2VlcCA9PT0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RhcnRYID0gY3ggKyBNYXRoLmNvcyhzdGFydEFuZ2xlKSAqIHJhZGl1cztcclxuICAgIHZhciBzdGFydFkgPSBjeSArIE1hdGguc2luKHN0YXJ0QW5nbGUpICogcmFkaXVzO1xyXG5cclxuICAgIGlmIChhbnRpY2xvY2t3aXNlICYmIHRoaXMuZmlsbGluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbyhjeCwgY3kpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKHN0YXJ0WCwgc3RhcnRZKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAgY3VycmVudFBhdGggd2lsbCBhbHdheXMgZXhpc3QgYWZ0ZXIgY2FsbGluZyBhIG1vdmVUb1xyXG4gICAgdmFyIHBvaW50cyA9IHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzO1xyXG5cclxuICAgIHZhciB0aGV0YSA9IHN3ZWVwIC8gKHNlZ3MgKiAyKTtcclxuICAgIHZhciB0aGV0YTIgPSB0aGV0YSAqIDI7XHJcblxyXG4gICAgdmFyIGNUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcclxuICAgIHZhciBzVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XHJcbiAgICBcclxuICAgIHZhciBzZWdNaW51cyA9IHNlZ3MgLSAxO1xyXG5cclxuICAgIHZhciByZW1haW5kZXIgPSAoc2VnTWludXMgJSAxKSAvIHNlZ01pbnVzO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHNlZ01pbnVzOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlYWwgPSAgaSArIHJlbWFpbmRlciAqIGk7XHJcbiAgICBcclxuICAgICAgICB2YXIgYW5nbGUgPSAoKHRoZXRhKSArIHN0YXJ0QW5nbGUgKyAodGhldGEyICogcmVhbCkpO1xyXG5cclxuICAgICAgICB2YXIgYyA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICB2YXIgcyA9IC1NYXRoLnNpbihhbmdsZSk7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKCggKGNUaGV0YSAqICBjKSArIChzVGhldGEgKiBzKSApICogcmFkaXVzICsgY3gsXHJcbiAgICAgICAgICAgICAgICAgICAgKCAoY1RoZXRhICogLXMpICsgKHNUaGV0YSAqIGMpICkgKiByYWRpdXMgKyBjeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5iZWdpbkZpbGwgPSBmdW5jdGlvbihjb2xvciwgYWxwaGEpXHJcbntcclxuICAgIHRoaXMuZmlsbGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmZpbGxDb2xvciA9IGNvbG9yIHx8IDA7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IChhbHBoYSA9PT0gdW5kZWZpbmVkKSA/IDEgOiBhbHBoYTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoIDw9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmZpbGwgPSB0aGlzLmZpbGxpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbENvbG9yID0gdGhpcy5maWxsQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbEFscGhhID0gdGhpcy5maWxsQWxwaGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZW5kRmlsbCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5maWxsaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbGxDb2xvciA9IG51bGw7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IDE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3UmVjdCA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Um91bmRlZFJlY3QgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Um91bmRlZFJlY3QyID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG57ICAgXHJcbiAgICB2YXIgc2hhcGUgPSBuZXcgVGlueS5Sb3VuZGVkUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cylcclxuICAgIHNoYXBlLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTjtcclxuICAgIHRoaXMuZHJhd1NoYXBlKHNoYXBlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Q2lyY2xlID0gZnVuY3Rpb24oeCwgeSwgZGlhbWV0ZXIpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LkNpcmNsZSh4LCB5LCBkaWFtZXRlcikpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd0VsbGlwc2UgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5FbGxpcHNlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdQb2x5Z29uID0gZnVuY3Rpb24ocGF0aClcclxue1xyXG4gICAgLy8gcHJldmVudHMgYW4gYXJndW1lbnQgYXNzaWdubWVudCBkZW9wdFxyXG4gICAgLy8gc2VlIHNlY3Rpb24gMy4xOiBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL3dpa2kvT3B0aW1pemF0aW9uLWtpbGxlcnMjMy1tYW5hZ2luZy1hcmd1bWVudHNcclxuICAgIHZhciBwb2ludHMgPSBwYXRoO1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShwb2ludHMpKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHByZXZlbnRzIGFuIGFyZ3VtZW50IGxlYWsgZGVvcHRcclxuICAgICAgICAvLyBzZWUgc2VjdGlvbiAzLjI6IGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzLW1hbmFnaW5nLWFyZ3VtZW50c1xyXG4gICAgICAgIHBvaW50cyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb2ludHNbaV0gPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlBvbHlnb24ocG9pbnRzKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSAwO1xyXG4gICAgdGhpcy5maWxsaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmdyYXBoaWNzRGF0YSA9IFtdO1xyXG4gICAgdGhpcy51cGRhdGVMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkZXN0cm95Q2hpbGRyZW4pXHJcbntcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIHdoaWxlIChpLS0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5nZW5lcmF0ZVRleHR1cmUgPSBmdW5jdGlvbihyZXNvbHV0aW9uKVxyXG57XHJcbiAgICByZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCAxO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xyXG4gICBcclxuICAgIHZhciBjYW52YXNCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIoYm91bmRzLndpZHRoICogcmVzb2x1dGlvbiwgYm91bmRzLmhlaWdodCAqIHJlc29sdXRpb24pO1xyXG4gICAgXHJcbiAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKGNhbnZhc0J1ZmZlci5jYW52YXMpO1xyXG4gICAgdGV4dHVyZS5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC5zY2FsZShyZXNvbHV0aW9uLCByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC50cmFuc2xhdGUoLWJvdW5kcy54LC1ib3VuZHMueSk7XHJcbiAgICBcclxuICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcywgY2FudmFzQnVmZmVyLmNvbnRleHQpO1xyXG5cclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuX3JlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLmlzTWFzayA9PT0gdHJ1ZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGhlIHRpbnQgaGFzIGNoYW5nZWQsIHNldCB0aGUgZ3JhcGhpY3Mgb2JqZWN0IHRvIGRpcnR5LlxyXG4gICAgaWYgKHRoaXMuX3ByZXZUaW50ICE9PSB0aGlzLnRpbnQpIHtcclxuICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcHJldlRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkU3ByaXRlRGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICBcclxuICAgICAgICAgICAgLy8gd2Ugd2lsbCBhbHNvIG5lZWQgdG8gdXBkYXRlIHRoZSB0ZXh0dXJlXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFscGhhID0gdGhpcy5hbHBoYTtcclxuICAgICAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUuX3JlbmRlckNhbnZhcy5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSwgcmVuZGVyU2Vzc2lvbik7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuICAgICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICBjb250ZXh0LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5jICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHkgKiByZXNvbHV0aW9uKTtcclxuXHJcbiAgICAgICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgIC8vIHNpbXBsZSByZW5kZXIgY2hpbGRyZW4hXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5fcmVuZGVyQ2FudmFzKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obWF0cml4KVxyXG57XHJcbiAgICBpZighdGhpcy5fY3VycmVudEJvdW5kcyB8fCB0aGlzLl9ib3VuZHNEaXJ0eSlcclxuICAgIHtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIGFuIGVtcHR5IG9iamVjdCBpZiB0aGUgaXRlbSBpcyBhIG1hc2shXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlbmRlcmFibGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2JvdW5kc0RpcnR5IClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxvY2FsQm91bmRzKCk7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbG9jYWxCb3VuZHM7XHJcblxyXG4gICAgdmFyIHcwID0gYm91bmRzLng7XHJcbiAgICB2YXIgdzEgPSBib3VuZHMud2lkdGggKyBib3VuZHMueDtcclxuXHJcbiAgICB2YXIgaDAgPSBib3VuZHMueTtcclxuICAgIHZhciBoMSA9IGJvdW5kcy5oZWlnaHQgKyBib3VuZHMueTtcclxuXHJcbiAgICB2YXIgd29ybGRUcmFuc2Zvcm0gPSBtYXRyaXggfHwgdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG5cclxuICAgIHZhciB4MSA9IGEgKiB3MSArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICB2YXIgeTIgPSBkICogaDEgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgIHZhciB4NCA9ICBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5NCA9ICBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IHgxO1xyXG4gICAgdmFyIG1heFkgPSB5MTtcclxuXHJcbiAgICB2YXIgbWluWCA9IHgxO1xyXG4gICAgdmFyIG1pblkgPSB5MTtcclxuXHJcbiAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgbWluWSA9IHkyIDwgbWluWSA/IHkyIDogbWluWTtcclxuICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICBtaW5ZID0geTQgPCBtaW5ZID8geTQgOiBtaW5ZO1xyXG5cclxuICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzLnggPSBtaW5YO1xyXG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Qm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uKCBwb2ludCApXHJcbntcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvaW50LCAgdGVtcFBvaW50KTtcclxuXHJcbiAgICB2YXIgZ3JhcGhpY3NEYXRhID0gdGhpcy5ncmFwaGljc0RhdGE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljc0RhdGFbaV07XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5maWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvbmx5IGRlYWwgd2l0aCBmaWxscy4uXHJcbiAgICAgICAgaWYgKGRhdGEuc2hhcGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIGRhdGEuc2hhcGUuY29udGFpbnMoIHRlbXBQb2ludC54LCB0ZW1wUG9pbnQueSApIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUudXBkYXRlTG9jYWxCb3VuZHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JhcGhpY3NEYXRhLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2hhcGUsIHBvaW50cywgeCwgeSwgdywgaDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gZGF0YS50eXBlO1xyXG4gICAgICAgICAgICB2YXIgbGluZVdpZHRoID0gZGF0YS5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVCB8fCB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQyB8fCB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLnggLSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgeSA9IHNoYXBlLnkgLSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLndpZHRoICsgbGluZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgaCA9IHNoYXBlLmhlaWdodCArIGxpbmVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCA8IG1pblggPyB4IDogbWluWDtcclxuICAgICAgICAgICAgICAgIG1heFggPSB4ICsgdyA+IG1heFggPyB4ICsgdyA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWSA9IHkgPCBtaW5ZID8geSA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0geSArIGggPiBtYXhZID8geSArIGggOiBtYXhZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5DSVJDKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgICAgIHkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLnJhZGl1cyArIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUucmFkaXVzICsgbGluZVdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCAtIHcgPCBtaW5YID8geCAtIHcgOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGggPCBtaW5ZID8geSAtIGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgICAgICB5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgICAgIHcgPSBzaGFwZS53aWR0aCArIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUuaGVpZ2h0ICsgbGluZVdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCAtIHcgPCBtaW5YID8geCAtIHcgOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGggPCBtaW5ZID8geSAtIGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFBPTFkgLSBhc3N1bWVzIHBvaW50cyBhcmUgc2VxdWVudGlhbCwgbm90IFBvaW50IG9iamVjdHNcclxuICAgICAgICAgICAgICAgIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBvaW50cy5sZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRzW2pdIGluc3RhbmNlb2YgVGlueS5Qb2ludClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb2ludHNbal0ueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBvaW50c1tqXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcG9pbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9pbnRzW2ogKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgcG9pbnRzLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHggLSBsaW5lV2lkdGggPCBtaW5YID8geCAtIGxpbmVXaWR0aCA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHggKyBsaW5lV2lkdGggPiBtYXhYID8geCArIGxpbmVXaWR0aCA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pblkgPSB5IC0gbGluZVdpZHRoIDwgbWluWSA/IHkgLSBsaW5lV2lkdGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgbGluZVdpZHRoID4gbWF4WSA/IHkgKyBsaW5lV2lkdGggOiBtYXhZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIG1pblggPSAwO1xyXG4gICAgICAgIG1heFggPSAwO1xyXG4gICAgICAgIG1pblkgPSAwO1xyXG4gICAgICAgIG1heFkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYWRkaW5nID0gdGhpcy5ib3VuZHNQYWRkaW5nO1xyXG4gICAgXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy54ID0gbWluWCAtIHBhZGRpbmc7XHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy53aWR0aCA9IChtYXhYIC0gbWluWCkgKyBwYWRkaW5nICogMjtcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy55ID0gbWluWSAtIHBhZGRpbmc7XHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy5oZWlnaHQgPSAobWF4WSAtIG1pblkpICsgcGFkZGluZyAqIDI7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0J1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcihib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIgPSBjYW52YXNCdWZmZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5yZXNpemUoYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXZlcmFnZSB0aGUgYW5jaG9yIHRvIGFjY291bnQgZm9yIHRoZSBvZmZzZXQgb2YgdGhlIGVsZW1lbnRcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueCA9IC0oYm91bmRzLnggLyBib3VuZHMud2lkdGgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLShib3VuZHMueSAvIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dC5zYXZlKCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQudHJhbnNsYXRlKC1ib3VuZHMueCwgLWJvdW5kcy55KTtcclxuICAgIFxyXG4gICAgLy8gbWFrZSBzdXJlIHdlIHNldCB0aGUgYWxwaGEgb2YgdGhlIGdyYXBoaWNzIHRvIDEgZm9yIHRoZSByZW5kZXIuLiBcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgLy8gbm93IHJlbmRlciB0aGUgZ3JhcGhpYy4uXHJcbiAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYWxwaGEgPSB0aGlzLmFscGhhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZXMgdGV4dHVyZSBzaXplIGJhc2VkIG9uIGNhbnZhcyBzaXplXHJcbiAqXHJcbiAqIEBtZXRob2QgdXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUudXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIGNhY2hlZFNwcml0ZSA9IHRoaXMuX2NhY2hlZFNwcml0ZTtcclxuICAgIHZhciB0ZXh0dXJlID0gY2FjaGVkU3ByaXRlLnRleHR1cmU7XHJcbiAgICB2YXIgY2FudmFzID0gY2FjaGVkU3ByaXRlLmJ1ZmZlci5jYW52YXM7XHJcblxyXG4gICAgdGV4dHVyZS5iYXNlVGV4dHVyZS53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRleHR1cmUuYmFzZVRleHR1cmUuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHRleHR1cmUuY3JvcC53aWR0aCA9IHRleHR1cmUuZnJhbWUud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICB0ZXh0dXJlLmNyb3AuaGVpZ2h0ID0gdGV4dHVyZS5mcmFtZS5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgIGNhY2hlZFNwcml0ZS5fd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBjYWNoZWRTcHJpdGUuX2hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVzdHJveXMgYSBwcmV2aW91cyBjYWNoZWQgc3ByaXRlLlxyXG4gKlxyXG4gKiBAbWV0aG9kIGRlc3Ryb3lDYWNoZWRTcHJpdGVcclxuICovXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1NoYXBlID0gZnVuY3Rpb24oc2hhcGUpXHJcbntcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNoZWNrIGN1cnJlbnQgcGF0aCFcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoIDw9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50UGF0aCA9IG51bGw7XHJcblxyXG4gICAgLy8gIEhhbmRsZSBtaXhlZC10eXBlIHBvbHlnb25zXHJcbiAgICBpZiAoc2hhcGUgaW5zdGFuY2VvZiBUaW55LlBvbHlnb24pXHJcbiAgICB7XHJcbiAgICAgICAgc2hhcGUuZmxhdHRlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYXRhID0gbmV3IFRpbnkuR3JhcGhpY3NEYXRhKHRoaXMubGluZVdpZHRoLCB0aGlzLmxpbmVDb2xvciwgdGhpcy5saW5lQWxwaGEsIHRoaXMuZmlsbENvbG9yLCB0aGlzLmZpbGxBbHBoYSwgdGhpcy5maWxsaW5nLCBzaGFwZSk7XHJcbiAgICBcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2goZGF0YSk7XHJcblxyXG4gICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpXHJcbiAgICB7XHJcbiAgICAgICAgZGF0YS5zaGFwZS5jbG9zZWQgPSB0aGlzLmZpbGxpbmc7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGF0aCA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuR3JhcGhpY3MucHJvdG90eXBlLCBcImNhY2hlQXNCaXRtYXBcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0pOyIsIlxyXG5UaW55LlNwcml0ZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSlcclxue1xyXG4gICAgVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dHVyZSh0ZXh0dXJlLCBrZXksIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLl93aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5faGVpZ2h0ID0gMDtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy50aW50ID0gMHhGRkZGRkY7XHJcblxyXG4gICAgdGhpcy5ibGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG4gICAgdGhpcy5zaGFkZXIgPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuaGFzTG9hZGVkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxufTtcclxuXHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpO1xyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNwcml0ZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdmcmFtZU5hbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlLmZyYW1lLm5hbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUuZnJhbWUubmFtZSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdmFsdWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ2ZyYW1lJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lXHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLm1heF9ub19mcmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHZhbHVlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9mcmFtZSA+IHRoaXMudGV4dHVyZS5tYXhfbm9fZnJhbWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZSA9IDBcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuVGV4dHVyZUNhY2hlW3RoaXMudGV4dHVyZS5rZXkgKyBcIl9cIiArIHRoaXMuX2ZyYW1lXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICd3aWR0aCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLnNjYWxlLnkgKiB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSwgdXBkYXRlRGltZW5zaW9uKVxyXG57XHJcbiAgICBpZiAodHlwZW9mIHRleHR1cmUgPT0gXCJzdHJpbmdcIikgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGltYWdlUGF0aCA9IHRleHR1cmU7XHJcblxyXG4gICAgICAgIGlmIChrZXkgIT0gdW5kZWZpbmVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IGltYWdlUGF0aCArIFwiX1wiICsga2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2ltYWdlUGF0aF1cclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FjaGUgRXJyb3I6IGltYWdlICcgKyBpbWFnZVBhdGggKyAnIGRvZXNgdCBmb3VuZCBpbiBjYWNoZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlID09PSB0ZXh0dXJlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgIHRoaXMuY2FjaGVkVGludCA9IDB4RkZGRkZGO1xyXG5cclxuICAgIGlmICh1cGRhdGVEaW1lbnNpb24gPT09IHRydWUpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUub25UZXh0dXJlVXBkYXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAvLyBzbyBpZiBfd2lkdGggaXMgMCB0aGVuIHdpZHRoIHdhcyBub3Qgc2V0Li5cclxuICAgIGlmICh0aGlzLl93aWR0aCkgdGhpcy5zY2FsZS54ID0gdGhpcy5fd2lkdGggLyB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICBpZiAodGhpcy5faGVpZ2h0KSB0aGlzLnNjYWxlLnkgPSB0aGlzLl9oZWlnaHQgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLmFuaW1hdGUgPSBmdW5jdGlvbihkZWxheSlcclxue1xyXG4gICAgaWYgKHRoaXMudGV4dHVyZS5tYXhfbm9fZnJhbWUgJiYgdGhpcy50ZXh0dXJlLmZyYW1lLmluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhciBvX2RlbGF5ID0gZGVsYXkgfHwgKHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDApXHJcbiAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuZ2FtZS50aW1lci5sb29wKG9fZGVsYXksIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSArPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IGRlbGF5IHx8ICh0aGlzLnRleHR1cmUuZnJhbWUuZHVyYXRpb24gfHwgMTAwKVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0YXJ0KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IG9fZGVsYXlcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbihtYXRyaXgpXHJcbntcclxuICAgIHZhciB3aWR0aCA9IHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEtdGhpcy5hbmNob3IueCk7XHJcbiAgICB2YXIgdzEgPSB3aWR0aCAqIC10aGlzLmFuY2hvci54O1xyXG5cclxuICAgIHZhciBoMCA9IGhlaWdodCAqICgxLXRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gbWF0cml4IHx8IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIGlmIChiID09PSAwICYmIGMgPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgLy8gc2NhbGUgbWF5IGJlIG5lZ2F0aXZlIVxyXG4gICAgICAgIGlmIChhIDwgMCkgYSAqPSAtMTtcclxuICAgICAgICBpZiAoZCA8IDApIGQgKj0gLTE7XHJcblxyXG4gICAgICAgIC8vIHRoaXMgbWVhbnMgdGhlcmUgaXMgbm8gcm90YXRpb24gZ29pbmcgb24gcmlnaHQ/IFJJR0hUP1xyXG4gICAgICAgIC8vIGlmIHRoYXRzIHRoZSBjYXNlIHRoZW4gd2UgY2FuIGF2b2lkIGNoZWNraW5nIHRoZSBib3VuZCB2YWx1ZXMhIHlheSAgICAgICAgIFxyXG4gICAgICAgIG1pblggPSBhICogdzEgKyB0eDtcclxuICAgICAgICBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgIG1heFkgPSBkICogaDAgKyB0eTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDQgPSAgYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICAgICAgdmFyIHk0ID0gIGQgKiBoMCArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgICAgICBtaW5YID0geDEgPCBtaW5YID8geDEgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4MiA8IG1pblggPyB4MiA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgICAgICBtaW5ZID0geTEgPCBtaW5ZID8geTEgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5MiA8IG1pblkgPyB5MiA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTQgPCBtaW5ZID8geTQgOiBtaW5ZO1xyXG5cclxuICAgICAgICBtYXhYID0geDEgPiBtYXhYID8geDEgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHgzID4gbWF4WCA/IHgzIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDQgPiBtYXhYID8geDQgOiBtYXhYO1xyXG5cclxuICAgICAgICBtYXhZID0geTEgPiBtYXhZID8geTEgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5MiA+IG1heFkgPyB5MiA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLl9yZW5kZXJDYW52YXMgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICAvLyBJZiB0aGUgc3ByaXRlIGlzIG5vdCB2aXNpYmxlIG9yIHRoZSBhbHBoYSBpcyAwIHRoZW4gbm8gbmVlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwIHx8IHRoaXMucmVuZGVyYWJsZSA9PT0gZmFsc2UgfHwgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPD0gMCB8fCB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAgSWdub3JlIG51bGwgc291cmNlc1xyXG4gICAgaWYgKHRoaXMudGV4dHVyZS52YWxpZClcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uIC8gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIHRleHR1cmUgaXMgdHJpbW1lZCB3ZSBvZmZzZXQgYnkgdGhlIHRyaW0geC95LCBvdGhlcndpc2Ugd2UgdXNlIHRoZSBmcmFtZSBkaW1lbnNpb25zXHJcbiAgICAgICAgdmFyIGR4ID0gKHRoaXMudGV4dHVyZS50cmltKSA/IHRoaXMudGV4dHVyZS50cmltLnggLSB0aGlzLmFuY2hvci54ICogdGhpcy50ZXh0dXJlLnRyaW0ud2lkdGggOiB0aGlzLmFuY2hvci54ICogLXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB2YXIgZHkgPSAodGhpcy50ZXh0dXJlLnRyaW0pID8gdGhpcy50ZXh0dXJlLnRyaW0ueSAtIHRoaXMuYW5jaG9yLnkgKiB0aGlzLnRleHR1cmUudHJpbS5oZWlnaHQgOiB0aGlzLmFuY2hvci55ICogLXRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vICBBbGxvdyBmb3IgcGl4ZWwgcm91bmRpbmdcclxuICAgICAgICBpZiAocmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmQsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pIHwgMCk7XHJcbiAgICAgICAgICAgIGR4ID0gZHggfCAwO1xyXG4gICAgICAgICAgICBkeSA9IGR5IHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbnQgIT09IDB4RkZGRkZGKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkVGludCAhPT0gdGhpcy50aW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZFRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbnRlZFRleHR1cmUgPSBUaW55LkNhbnZhc1RpbnRlci5nZXRUaW50ZWRUZXh0dXJlKHRoaXMsIHRoaXMudGludCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW50ZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeSAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCAvIHJlc29sdXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBPVkVSV1JJVEVcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLl9yZW5kZXJDYW52YXMocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59OyIsIlxuVGlueS5UZXh0ID0gZnVuY3Rpb24odGV4dCwgc3R5bGUpXG57XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IDE7XG5cbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKHRoaXMuY2FudmFzKSk7XG5cbiAgICB0aGlzLnNldFRleHQodGV4dCk7XG4gICAgdGhpcy5zZXRTdHlsZShzdHlsZSk7XG5cbn07XG5cblRpbnkuVGV4dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuU3ByaXRlLnByb3RvdHlwZSk7XG5UaW55LlRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UZXh0O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgJ3dpZHRoJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYodGhpcy5kaXJ0eSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuICAgIH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmKHRoaXMuZGlydHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gIHRoaXMuc2NhbGUueSAqIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgfVxufSk7XG5cblRpbnkuVGV4dC5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbihzdHlsZSlcbntcbiAgICBzdHlsZSA9IHN0eWxlIHx8IHt9O1xuICAgIHN0eWxlLmZvbnQgPSBzdHlsZS5mb250IHx8ICdib2xkIDIwcHQgQXJpYWwnO1xuICAgIHN0eWxlLmZpbGwgPSBzdHlsZS5maWxsIHx8ICdibGFjayc7XG4gICAgc3R5bGUuYWxpZ24gPSBzdHlsZS5hbGlnbiB8fCAnbGVmdCc7XG4gICAgc3R5bGUuc3Ryb2tlID0gc3R5bGUuc3Ryb2tlIHx8ICdibGFjayc7XG4gICAgc3R5bGUuc3Ryb2tlVGhpY2tuZXNzID0gc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIHx8IDA7XG4gICAgc3R5bGUud29yZFdyYXAgPSBzdHlsZS53b3JkV3JhcCB8fCBmYWxzZTtcbiAgICBzdHlsZS5saW5lU3BhY2luZyA9IHN0eWxlLmxpbmVTcGFjaW5nIHx8IDBcbiAgICBzdHlsZS53b3JkV3JhcFdpZHRoID0gc3R5bGUud29yZFdyYXBXaWR0aCB8fCAxMDA7XG4gICAgXG4gICAgc3R5bGUuZHJvcFNoYWRvdyA9IHN0eWxlLmRyb3BTaGFkb3cgfHwgZmFsc2U7XG4gICAgc3R5bGUuZHJvcFNoYWRvd0FuZ2xlID0gc3R5bGUuZHJvcFNoYWRvd0FuZ2xlIHx8IE1hdGguUEkgLyA2O1xuICAgIHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSA9IHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSB8fCA0O1xuICAgIHN0eWxlLmRyb3BTaGFkb3dDb2xvciA9IHN0eWxlLmRyb3BTaGFkb3dDb2xvciB8fCAnYmxhY2snO1xuXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xufTtcblxuVGlueS5UZXh0LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24odGV4dClcbntcbiAgICB0aGlzLnRleHQgPSB0ZXh0LnRvU3RyaW5nKCkgfHwgJyAnO1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xufTtcblxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0ID0gZnVuY3Rpb24oKVxue1xuICAgIHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xuXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLnN0eWxlLmZvbnQ7XG5cbiAgICB2YXIgb3V0cHV0VGV4dCA9IHRoaXMudGV4dDtcblxuICAgIC8vIHdvcmQgd3JhcFxuICAgIC8vIHByZXNlcnZlIG9yaWdpbmFsIHRleHRcbiAgICBpZih0aGlzLnN0eWxlLndvcmRXcmFwKW91dHB1dFRleHQgPSB0aGlzLndvcmRXcmFwKHRoaXMudGV4dCk7XG5cbiAgICAvL3NwbGl0IHRleHQgaW50byBsaW5lc1xuICAgIHZhciBsaW5lcyA9IG91dHB1dFRleHQuc3BsaXQoLyg/OlxcclxcbnxcXHJ8XFxuKS8pO1xuXG4gICAgLy9jYWxjdWxhdGUgdGV4dCB3aWR0aFxuICAgIHZhciBsaW5lV2lkdGhzID0gW107XG4gICAgdmFyIG1heExpbmVXaWR0aCA9IDA7XG4gICAgdmFyIGZvbnRQcm9wZXJ0aWVzID0gdGhpcy5kZXRlcm1pbmVGb250UHJvcGVydGllcyh0aGlzLnN0eWxlLmZvbnQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgICB2YXIgbGluZVdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KGxpbmVzW2ldKS53aWR0aDtcbiAgICAgICAgbGluZVdpZHRoc1tpXSA9IGxpbmVXaWR0aDtcbiAgICAgICAgbWF4TGluZVdpZHRoID0gTWF0aC5tYXgobWF4TGluZVdpZHRoLCBsaW5lV2lkdGgpO1xuICAgIH1cblxuICAgIHZhciB3aWR0aCA9IG1heExpbmVXaWR0aCArIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzO1xuICAgIGlmKHRoaXMuc3R5bGUuZHJvcFNoYWRvdyl3aWR0aCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcblxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gKCB3aWR0aCArIHRoaXMuY29udGV4dC5saW5lV2lkdGggKSAqIHRoaXMucmVzb2x1dGlvbjtcbiAgICBcbiAgICAvL2NhbGN1bGF0ZSB0ZXh0IGhlaWdodFxuICAgIHZhciBsaW5lSGVpZ2h0ID0gZm9udFByb3BlcnRpZXMuZm9udFNpemUgKyB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyArIHRoaXMuc3R5bGUubGluZVNwYWNpbmc7XG4gXG4gICAgdmFyIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcy5sZW5ndGg7XG4gICAgaWYodGhpcy5zdHlsZS5kcm9wU2hhZG93KWhlaWdodCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcblxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IChoZWlnaHQgLSB0aGlzLnN0eWxlLmxpbmVTcGFjaW5nKSAqIHRoaXMucmVzb2x1dGlvbjtcblxuICAgIHRoaXMuY29udGV4dC5zY2FsZSggdGhpcy5yZXNvbHV0aW9uLCB0aGlzLnJlc29sdXRpb24pO1xuXG4gICAgaWYobmF2aWdhdG9yLmlzQ29jb29uSlMpIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwwLHRoaXMuY2FudmFzLndpZHRoLHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgXG4gICAgLy8gdXNlZCBmb3IgZGVidWdnaW5nLi5cbiAgICAvL3RoaXMuY29udGV4dC5maWxsU3R5bGUgPVwiI0ZGMDAwMFwiXG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5zdHlsZS5mb250O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuc3R5bGUuc3Ryb2tlO1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcztcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnO1xuICAgIHRoaXMuY29udGV4dC5taXRlckxpbWl0ID0gMjtcblxuICAgIC8vdGhpcy5jb250ZXh0LmxpbmVKb2luID0gJ3JvdW5kJztcblxuICAgIHZhciBsaW5lUG9zaXRpb25YO1xuICAgIHZhciBsaW5lUG9zaXRpb25ZO1xuXG4gICAgaWYodGhpcy5zdHlsZS5kcm9wU2hhZG93KVxuICAgIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0NvbG9yO1xuXG4gICAgICAgIHZhciB4U2hhZG93T2Zmc2V0ID0gTWF0aC5zaW4odGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XG4gICAgICAgIHZhciB5U2hhZG93T2Zmc2V0ID0gTWF0aC5jb3ModGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyO1xuICAgICAgICAgICAgbGluZVBvc2l0aW9uWSA9ICh0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDIgKyBpICogbGluZUhlaWdodCkgKyBmb250UHJvcGVydGllcy5hc2NlbnQ7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdyaWdodCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSBtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnN0eWxlLmFsaWduID09PSAnY2VudGVyJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc3R5bGUuZmlsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblggKyB4U2hhZG93T2Zmc2V0LCBsaW5lUG9zaXRpb25ZICsgeVNoYWRvd09mZnNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyAgaWYoZHJvcFNoYWRvdylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vc2V0IGNhbnZhcyB0ZXh0IHN0eWxlc1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLnN0eWxlLmZpbGw7XG4gICAgXG4gICAgLy9kcmF3IGxpbmVzIGxpbmUgYnkgbGluZVxuICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICAgIGxpbmVQb3NpdGlvblggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDI7XG4gICAgICAgIGxpbmVQb3NpdGlvblkgPSAodGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyICsgaSAqIGxpbmVIZWlnaHQpICsgZm9udFByb3BlcnRpZXMuYXNjZW50O1xuXG4gICAgICAgIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdyaWdodCcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gbWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdjZW50ZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnN0eWxlLnN0cm9rZSAmJiB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblgsIGxpbmVQb3NpdGlvblkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zdHlsZS5maWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblgsIGxpbmVQb3NpdGlvblkpO1xuICAgICAgICB9XG5cbiAgICAgIC8vICBpZihkcm9wU2hhZG93KVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVGV4dHVyZSgpO1xufTtcblxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0dXJlID0gZnVuY3Rpb24oKVxue1xuICAgIHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgIHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuXG4gICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG59O1xuXG5UaW55LlRleHQucHJvdG90eXBlLl9yZW5kZXJDYW52YXMgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxue1xuICAgIGlmKHRoaXMuZGlydHkpXG4gICAge1xuICAgICAgICB0aGlzLnJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XG5cbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICB9XG4gICAgIFxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzLmNhbGwodGhpcywgcmVuZGVyU2Vzc2lvbik7XG59O1xuXG5UaW55LlRleHQucHJvdG90eXBlLmRldGVybWluZUZvbnRQcm9wZXJ0aWVzID0gZnVuY3Rpb24oZm9udFN0eWxlKVxue1xuICAgIHZhciBwcm9wZXJ0aWVzID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGVbZm9udFN0eWxlXTtcblxuICAgIGlmKCFwcm9wZXJ0aWVzKVxuICAgIHtcbiAgICAgICAgcHJvcGVydGllcyA9IHt9O1xuICAgICAgICBcbiAgICAgICAgdmFyIGNhbnZhcyA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcztcbiAgICAgICAgdmFyIGNvbnRleHQgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDb250ZXh0O1xuXG4gICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnRTdHlsZTtcblxuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmNlaWwoY29udGV4dC5tZWFzdXJlVGV4dCgnfE3DiXEnKS53aWR0aCk7XG4gICAgICAgIHZhciBiYXNlbGluZSA9IE1hdGguY2VpbChjb250ZXh0Lm1lYXN1cmVUZXh0KCd8TcOJcScpLndpZHRoKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IDIgKiBiYXNlbGluZTtcblxuICAgICAgICBiYXNlbGluZSA9IGJhc2VsaW5lICogMS40IHwgMDtcblxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjZjAwJztcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250U3R5bGU7XG5cbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnYWxwaGFiZXRpYyc7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KCd8TcOJcScsIDAsIGJhc2VsaW5lKTtcblxuICAgICAgICB2YXIgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICAgICAgdmFyIHBpeGVscyA9IGltYWdlZGF0YS5sZW5ndGg7XG4gICAgICAgIHZhciBsaW5lID0gd2lkdGggKiA0O1xuXG4gICAgICAgIHZhciBpLCBqO1xuXG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB2YXIgc3RvcCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGFzY2VudC4gc2NhbiBmcm9tIHRvcCB0byBib3R0b20gdW50aWwgd2UgZmluZCBhIG5vbiByZWQgcGl4ZWxcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgYmFzZWxpbmU7IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbGluZTsgaiArPSA0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGltYWdlZGF0YVtpZHggKyBqXSAhPT0gMjU1KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCFzdG9wKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkeCArPSBsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvcGVydGllcy5hc2NlbnQgPSBiYXNlbGluZSAtIGk7XG5cbiAgICAgICAgaWR4ID0gcGl4ZWxzIC0gbGluZTtcbiAgICAgICAgc3RvcCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGRlc2NlbnQuIHNjYW4gZnJvbSBib3R0b20gdG8gdG9wIHVudGlsIHdlIGZpbmQgYSBub24gcmVkIHBpeGVsXG4gICAgICAgIGZvcihpID0gaGVpZ2h0OyBpID4gYmFzZWxpbmU7IGktLSlcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbGluZTsgaiArPSA0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGltYWdlZGF0YVtpZHggKyBqXSAhPT0gMjU1KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCFzdG9wKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkeCAtPSBsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvcGVydGllcy5kZXNjZW50ID0gaSAtIGJhc2VsaW5lO1xuICAgICAgICAvL1RPRE8gbWlnaHQgbmVlZCBhIHR3ZWFrLiBraW5kIG9mIGEgdGVtcCBmaXghXG4gICAgICAgIHByb3BlcnRpZXMuZGVzY2VudCArPSA2O1xuICAgICAgICBwcm9wZXJ0aWVzLmZvbnRTaXplID0gcHJvcGVydGllcy5hc2NlbnQgKyBwcm9wZXJ0aWVzLmRlc2NlbnQ7XG5cbiAgICAgICAgVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGVbZm9udFN0eWxlXSA9IHByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XG59O1xuXG5UaW55LlRleHQucHJvdG90eXBlLndvcmRXcmFwID0gZnVuY3Rpb24odGV4dClcbntcbiAgICAvLyBHcmVlZHkgd3JhcHBpbmcgYWxnb3JpdGhtIHRoYXQgd2lsbCB3cmFwIHdvcmRzIGFzIHRoZSBsaW5lIGdyb3dzIGxvbmdlclxuICAgIC8vIHRoYW4gaXRzIGhvcml6b250YWwgYm91bmRzLlxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgICAgdmFyIHNwYWNlTGVmdCA9IHRoaXMuc3R5bGUud29yZFdyYXBXaWR0aDtcbiAgICAgICAgdmFyIHdvcmRzID0gbGluZXNbaV0uc3BsaXQoJyAnKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3b3Jkcy5sZW5ndGg7IGorKylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHdvcmRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh3b3Jkc1tqXSkud2lkdGg7XG4gICAgICAgICAgICB2YXIgd29yZFdpZHRoV2l0aFNwYWNlID0gd29yZFdpZHRoICsgdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KCcgJykud2lkdGg7XG4gICAgICAgICAgICBpZihqID09PSAwIHx8IHdvcmRXaWR0aFdpdGhTcGFjZSA+IHNwYWNlTGVmdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHByaW50aW5nIHRoZSBuZXdsaW5lIGlmIGl0J3MgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGxpbmUgdGhhdCBpc1xuICAgICAgICAgICAgICAgIC8vIGdyZWF0ZXIgdGhhbiB0aGUgd29yZCB3cmFwIHdpZHRoLlxuICAgICAgICAgICAgICAgIGlmKGogPiAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXG4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gd29yZHNbal07XG4gICAgICAgICAgICAgICAgc3BhY2VMZWZ0ID0gdGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoIC0gd29yZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNwYWNlTGVmdCAtPSB3b3JkV2lkdGhXaXRoU3BhY2U7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICcgJyArIHdvcmRzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgPCBsaW5lcy5sZW5ndGgtMSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmVzdWx0ICs9ICdcXG4nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5UaW55LlRleHQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKG1hdHJpeClcbntcbiAgICBpZih0aGlzLmRpcnR5KVxuICAgIHtcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gVGlueS5TcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcy5jYWxsKHRoaXMsIG1hdHJpeCk7XG59O1xuXG5UaW55LlRleHQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihkZXN0cm95QmFzZVRleHR1cmUpXG57XG4gICAgLy8gbWFrZSBzdXJlIHRvIHJlc2V0IHRoZSB0aGUgY29udGV4dCBhbmQgY2FudmFzLi4gZG9udCB3YW50IHRoaXMgaGFuZ2luZyBhcm91bmQgaW4gbWVtb3J5IVxuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5jYW52YXMgPSBudWxsO1xuXG4gICAgdGhpcy50ZXh0dXJlLmRlc3Ryb3koZGVzdHJveUJhc2VUZXh0dXJlID09PSB1bmRlZmluZWQgPyB0cnVlIDogZGVzdHJveUJhc2VUZXh0dXJlKTtcbn07XG5cblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhY2hlID0ge307XG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NvbnRleHQgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsiLCIvKipcclxuICogQGF1dGhvciBNYXQgR3JvdmVzIGh0dHA6Ly9tYXRncm92ZXMuY29tL1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHRpbGluZyBzcHJpdGUgaXMgYSBmYXN0IHdheSBvZiByZW5kZXJpbmcgYSB0aWxpbmcgaW1hZ2VcclxuICpcclxuICogQGNsYXNzIFRpbGluZ1Nwcml0ZVxyXG4gKiBAZXh0ZW5kcyBTcHJpdGVcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB0ZXh0dXJlIHtUZXh0dXJlfSB0aGUgdGV4dHVyZSBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gKiBAcGFyYW0gd2lkdGgge051bWJlcn0gIHRoZSB3aWR0aCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gKiBAcGFyYW0gaGVpZ2h0IHtOdW1iZXJ9IHRoZSBoZWlnaHQgb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICovXHJcblRpbnkuVGlsaW5nU3ByaXRlID0gZnVuY3Rpb24odGV4dHVyZSwga2V5LCB3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICBUaW55LlNwcml0ZS5jYWxsKCB0aGlzLCB0ZXh0dXJlLCBrZXkgKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB3aXRoIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHdpZHRoXHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aCB8fCAxMDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IGhlaWdodFxyXG4gICAgICogQHR5cGUgTnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodCB8fCAxMDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2NhbGluZyBvZiB0aGUgaW1hZ2UgdGhhdCBpcyBiZWluZyB0aWxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB0aWxlU2NhbGVcclxuICAgICAqIEB0eXBlIFBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGlsZVNjYWxlID0gbmV3IFRpbnkuUG9pbnQoMSwxKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgcG9pbnQgdGhhdCByZXByZXNlbnRzIHRoZSBzY2FsZSBvZiB0aGUgdGV4dHVyZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgdGlsZVNjYWxlT2Zmc2V0XHJcbiAgICAgKiBAdHlwZSBQb2ludFxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpbGVTY2FsZU9mZnNldCA9IG5ldyBUaW55LlBvaW50KDEsMSk7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG9mZnNldCBwb3NpdGlvbiBvZiB0aGUgaW1hZ2UgdGhhdCBpcyBiZWluZyB0aWxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB0aWxlUG9zaXRpb25cclxuICAgICAqIEB0eXBlIFBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGlsZVBvc2l0aW9uID0gbmV3IFRpbnkuUG9pbnQoMCwwKTtcclxuXHJcbn07XHJcblxyXG4vLyBjb25zdHJ1Y3RvclxyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuU3ByaXRlLnByb3RvdHlwZSk7XHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGlsaW5nU3ByaXRlO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgd2lkdGggb2YgdGhlIHNwcml0ZSwgc2V0dGluZyB0aGlzIHdpbGwgYWN0dWFsbHkgbW9kaWZ5IHRoZSBzY2FsZSB0byBhY2hpZXZlIHRoZSB2YWx1ZSBzZXRcclxuICpcclxuICogQHByb3BlcnR5IHdpZHRoXHJcbiAqIEB0eXBlIE51bWJlclxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBoZWlnaHQgb2YgdGhlIFRpbGluZ1Nwcml0ZSwgc2V0dGluZyB0aGlzIHdpbGwgYWN0dWFsbHkgbW9kaWZ5IHRoZSBzY2FsZSB0byBhY2hpZXZlIHRoZSB2YWx1ZSBzZXRcclxuICpcclxuICogQHByb3BlcnR5IGhlaWdodFxyXG4gKiBAdHlwZSBOdW1iZXJcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUsICdoZWlnaHQnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5faGVpZ2h0O1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSlcclxue1xyXG4gICAgdmFyIHVwZGF0ZWQgPSBUaW55LlNwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZS5jYWxsKHRoaXMsIHRleHR1cmUsIGtleSk7XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoVGV4dHVyZSA9IHVwZGF0ZWQ7XHJcbn07XHJcblxyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuX3JlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApcmV0dXJuO1xyXG4gICAgXHJcbiAgICB2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcbiAgICBcclxuICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG4gICAgXHJcbiAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvbik7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9fdGlsZVBhdHRlcm4gfHwgdGhpcy5yZWZyZXNoVGV4dHVyZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlVGlsaW5nVGV4dHVyZShmYWxzZSk7XHJcbiAgICBcclxuICAgICAgICBpZiAodGhpcy50aWxpbmdUZXh0dXJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fX3RpbGVQYXR0ZXJuID0gY29udGV4dC5jcmVhdGVQYXR0ZXJuKHRoaXMudGlsaW5nVGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsICdyZXBlYXQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBibGVuZCBtb2RlXHJcbiAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSlcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcclxuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGlsZVBvc2l0aW9uID0gdGhpcy50aWxlUG9zaXRpb247XHJcbiAgICB2YXIgdGlsZVNjYWxlID0gdGhpcy50aWxlU2NhbGU7XHJcblxyXG4gICAgdGlsZVBvc2l0aW9uLnggJT0gdGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLndpZHRoO1xyXG4gICAgdGlsZVBvc2l0aW9uLnkgJT0gdGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLmhlaWdodDtcclxuXHJcbiAgICAvLyBvZmZzZXQgLSBtYWtlIHN1cmUgdG8gYWNjb3VudCBmb3IgdGhlIGFuY2hvciBwb2ludC4uXHJcbiAgICBjb250ZXh0LnNjYWxlKHRpbGVTY2FsZS54LHRpbGVTY2FsZS55KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKHRpbGVQb3NpdGlvbi54ICsgKHRoaXMuYW5jaG9yLnggKiAtdGhpcy5fd2lkdGgpLCB0aWxlUG9zaXRpb24ueSArICh0aGlzLmFuY2hvci55ICogLXRoaXMuX2hlaWdodCkpO1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fX3RpbGVQYXR0ZXJuO1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFJlY3QoLXRpbGVQb3NpdGlvbi54LFxyXG4gICAgICAgICAgICAgICAgICAgIC10aWxlUG9zaXRpb24ueSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCAvIHRpbGVTY2FsZS54LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCAvIHRpbGVTY2FsZS55KTtcclxuXHJcbiAgICBjb250ZXh0LnNjYWxlKDEgLyB0aWxlU2NhbGUueCwgMSAvIHRpbGVTY2FsZS55KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKC10aWxlUG9zaXRpb24ueCArICh0aGlzLmFuY2hvci54ICogdGhpcy5fd2lkdGgpLCAtdGlsZVBvc2l0aW9uLnkgKyAodGhpcy5hbmNob3IueSAqIHRoaXMuX2hlaWdodCkpO1xyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5fcmVuZGVyQ2FudmFzKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4qIFJldHVybnMgdGhlIGZyYW1pbmcgcmVjdGFuZ2xlIG9mIHRoZSBzcHJpdGUgYXMgYSBUaW55LlJlY3RhbmdsZSBvYmplY3RcclxuKlxyXG4qIEBtZXRob2QgZ2V0Qm91bmRzXHJcbiogQHJldHVybiB7UmVjdGFuZ2xlfSB0aGUgZnJhbWluZyByZWN0YW5nbGVcclxuKi9cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGg7XHJcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEtdGhpcy5hbmNob3IueCk7XHJcbiAgICB2YXIgdzEgPSB3aWR0aCAqIC10aGlzLmFuY2hvci54O1xyXG5cclxuICAgIHZhciBoMCA9IGhlaWdodCAqICgxLXRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG4gICAgXHJcbiAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgIHZhciB5MSA9IGQgKiBoMSArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgdmFyIHgzID0gYSAqIHcwICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDQgPSAgYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTQgPSAgZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICBtaW5YID0geDEgPCBtaW5YID8geDEgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgIG1pblkgPSB5MSA8IG1pblkgPyB5MSA6IG1pblk7XHJcbiAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgbWF4WCA9IHgxID4gbWF4WCA/IHgxIDogbWF4WDtcclxuICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICBtYXhZID0geTEgPiBtYXhZID8geTEgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBXaGVuIHRoZSB0ZXh0dXJlIGlzIHVwZGF0ZWQsIHRoaXMgZXZlbnQgd2lsbCBmaXJlIHRvIHVwZGF0ZSB0aGUgc2NhbGUgYW5kIGZyYW1lXHJcbiAqXHJcbiAqIEBtZXRob2Qgb25UZXh0dXJlVXBkYXRlXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4qIFxyXG4qIEBtZXRob2QgZ2VuZXJhdGVUaWxpbmdUZXh0dXJlXHJcbiogXHJcbiogQHBhcmFtIGZvcmNlUG93ZXJPZlR3byB7Qm9vbGVhbn0gV2hldGhlciB3ZSB3YW50IHRvIGZvcmNlIHRoZSB0ZXh0dXJlIHRvIGJlIGEgcG93ZXIgb2YgdHdvXHJcbiovXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5nZW5lcmF0ZVRpbGluZ1RleHR1cmUgPSBmdW5jdGlvbihmb3JjZVBvd2VyT2ZUd28pXHJcbntcclxuICAgIGlmICghdGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLmhhc0xvYWRlZCkgcmV0dXJuO1xyXG5cclxuICAgIHZhciB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlO1xyXG4gICAgdmFyIGZyYW1lID0gdGV4dHVyZS5mcmFtZTtcclxuICAgIHZhciB0YXJnZXRXaWR0aCwgdGFyZ2V0SGVpZ2h0O1xyXG5cclxuICAgIC8vICBDaGVjayB0aGF0IHRoZSBmcmFtZSBpcyB0aGUgc2FtZSBzaXplIGFzIHRoZSBiYXNlIHRleHR1cmUuXHJcbiAgICB2YXIgaXNGcmFtZSA9IGZyYW1lLndpZHRoICE9PSB0ZXh0dXJlLmJhc2VUZXh0dXJlLndpZHRoIHx8IGZyYW1lLmhlaWdodCAhPT0gdGV4dHVyZS5iYXNlVGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgdmFyIG5ld1RleHR1cmVSZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghZm9yY2VQb3dlck9mVHdvKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0ZXh0dXJlLmNyb3ApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YXJnZXRXaWR0aCA9IHRleHR1cmUuY3JvcC53aWR0aDtcclxuICAgICAgICAgICAgdGFyZ2V0SGVpZ2h0ID0gdGV4dHVyZS5jcm9wLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFyZ2V0V2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgICAgICAgICAgdGFyZ2V0SGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRleHR1cmUuY3JvcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhcmdldFdpZHRoID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byh0ZXh0dXJlLmNyb3Aud2lkdGgpO1xyXG4gICAgICAgICAgICB0YXJnZXRIZWlnaHQgPSBUaW55LmdldE5leHRQb3dlck9mVHdvKHRleHR1cmUuY3JvcC5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YXJnZXRXaWR0aCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28oZnJhbWUud2lkdGgpO1xyXG4gICAgICAgICAgICB0YXJnZXRIZWlnaHQgPSBUaW55LmdldE5leHRQb3dlck9mVHdvKGZyYW1lLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIEJhc2VUZXh0dXJlIGRpbWVuc2lvbnMgZG9uJ3QgbWF0Y2ggdGhlIHRleHR1cmUgZnJhbWUgdGhlbiB3ZSBuZWVkIGEgbmV3IHRleHR1cmUgYW55d2F5IGJlY2F1c2UgaXQncyBwYXJ0IG9mIGEgdGV4dHVyZSBhdGxhc1xyXG4gICAgICAgIC8vIGlmIChmcmFtZS53aWR0aCAhPT0gdGFyZ2V0V2lkdGggfHwgZnJhbWUuaGVpZ2h0ICE9PSB0YXJnZXRIZWlnaHQgfHwgdGV4dHVyZS5iYXNlVGV4dHVyZS53aWR0aCAhPT0gdGFyZ2V0V2lkdGggfHwgdGV4dHVyZS5iYXNlVGV4dHVyZS5oZWlnaHQgfHwgdGFyZ2V0SGVpZ2h0KSBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdUZXh0dXJlUmVxdWlyZWQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0J1ZmZlcjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSAmJiB0aGlzLnRpbGluZ1RleHR1cmUuaXNUaWxpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW52YXNCdWZmZXIgPSB0aGlzLnRpbGluZ1RleHR1cmUuY2FudmFzQnVmZmVyO1xyXG4gICAgICAgICAgICBjYW52YXNCdWZmZXIucmVzaXplKHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUud2lkdGggPSB0YXJnZXRXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLmhlaWdodCA9IHRhcmdldEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXIgPSBjYW52YXNCdWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5pc1RpbGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW52YXNCdWZmZXIuY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLmNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRIZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnRpbGVTY2FsZU9mZnNldC54ID0gZnJhbWUud2lkdGggLyB0YXJnZXRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGVTY2FsZU9mZnNldC55ID0gZnJhbWUuaGVpZ2h0IC8gdGFyZ2V0SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVmcmVzaFRleHR1cmUgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLnRpbGluZ1RleHR1cmUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbn07IiwiXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIgPSBmdW5jdGlvbigpXHJcbntcclxufTtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNNYXNrTWFuYWdlcjtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLnB1c2hNYXNrID0gZnVuY3Rpb24obWFza0RhdGEsIHJlbmRlclNlc3Npb24pXHJcbntcclxuXHR2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgIFxyXG4gICAgdmFyIGNhY2hlQWxwaGEgPSBtYXNrRGF0YS5hbHBoYTtcclxuICAgIHZhciB0cmFuc2Zvcm0gPSBtYXNrRGF0YS53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvbik7XHJcblxyXG4gICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljc01hc2sobWFza0RhdGEsIGNvbnRleHQpO1xyXG5cclxuICAgIGNvbnRleHQuY2xpcCgpO1xyXG5cclxuICAgIG1hc2tEYXRhLndvcmxkQWxwaGEgPSBjYWNoZUFscGhhO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUucG9wTWFzayA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5yZXN0b3JlKCk7XHJcbn07IiwiXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKVxyXG57ICAgXHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG5cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IChvcHRpb25zLnJlc29sdXRpb24gIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5yZXNvbHV0aW9uIDogMSk7XHJcblxyXG4gICAgdGhpcy5jbGVhckJlZm9yZVJlbmRlciA9IChvcHRpb25zLmNsZWFyQmVmb3JlUmVuZGVyICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xlYXJCZWZvcmVSZW5kZXIgOiB0cnVlKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zcGFyZW50ID0gKG9wdGlvbnMudHJhbnNwYXJlbnQgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy50cmFuc3BhcmVudCA6IGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUgPSBvcHRpb25zLmF1dG9SZXNpemUgfHwgZmFsc2U7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDgwMDtcclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCA2MDA7XHJcblxyXG4gICAgdGhpcy53aWR0aCAqPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICB0aGlzLmhlaWdodCAqPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy52aWV3ID0gb3B0aW9ucy52aWV3IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiY2FudmFzXCIgKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLnZpZXcuZ2V0Q29udGV4dCggXCIyZFwiLCB7IGFscGhhOiB0aGlzLnRyYW5zcGFyZW50IH0gKTtcclxuXHJcbiAgICB0aGlzLnZpZXcud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgdGhpcy52aWV3LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc01hc2tNYW5hZ2VyKVxyXG4gICAgICAgIHRoaXMubWFza01hbmFnZXIgPSBuZXcgVGlueS5DYW52YXNNYXNrTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbiA9IHtcclxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgbWFza01hbmFnZXI6IHRoaXMubWFza01hbmFnZXIsXHJcbiAgICAgICAgc21vb3RoUHJvcGVydHk6IG51bGwsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgdHJ1ZSBQaXhpIHdpbGwgTWF0aC5mbG9vcigpIHgveSB2YWx1ZXMgd2hlbiByZW5kZXJpbmcsIHN0b3BwaW5nIHBpeGVsIGludGVycG9sYXRpb24uXHJcbiAgICAgICAgICogSGFuZHkgZm9yIGNyaXNwIHBpeGVsIGFydCBhbmQgc3BlZWQgb24gbGVnYWN5IGRldmljZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICByb3VuZFBpeGVsczogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgaWYoXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJvSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJtc0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzUmVuZGVyZXI7XHJcblxyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oc3RhZ2UpXHJcbntcclxuICAgIFxyXG4gICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5pc0NvY29vbkpTICYmIHRoaXMudmlldy5zY3JlZW5jYW52YXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuY2xlYXJCZWZvcmVSZW5kZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHN0YWdlLmJhY2tncm91bmRDb2xvclN0cmluZztcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGggLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLnJlbmRlckRpc3BsYXlPYmplY3Qoc3RhZ2UpO1xyXG5cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihyZW1vdmVWaWV3KVxyXG57ICAgXHJcbiAgICBpZiAodHlwZW9mIHJlbW92ZVZpZXcgPT09IFwidW5kZWZpbmVkXCIpIHsgcmVtb3ZlVmlldyA9IHRydWU7IH1cclxuXHJcbiAgICBpZiAocmVtb3ZlVmlldyAmJiB0aGlzLnZpZXcucGFyZW50Tm9kZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlldyA9IG51bGw7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5tYXNrTWFuYWdlciA9IG51bGw7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24gPSBudWxsO1xyXG5cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMudmlldy53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICB0aGlzLnZpZXcuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgIHRoaXMudmlldy5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggLyB0aGlzLnJlc29sdXRpb24gKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy52aWV3LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0IC8gdGhpcy5yZXNvbHV0aW9uICsgXCJweFwiO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRGlzcGxheU9iamVjdCA9IGZ1bmN0aW9uKGRpc3BsYXlPYmplY3QsIGNvbnRleHQpXHJcbntcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLmNvbnRleHQ7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24ucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuICAgIGRpc3BsYXlPYmplY3QuX3JlbmRlckNhbnZhcyh0aGlzLnJlbmRlclNlc3Npb24pO1xyXG59OyIsIlxyXG5UaW55LkNhbnZhc1RpbnRlciA9IGZ1bmN0aW9uKClcclxue1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSA9IGZ1bmN0aW9uKHNwcml0ZSwgY29sb3IpXHJcbntcclxuICAgIHZhciB0ZXh0dXJlID0gc3ByaXRlLnRleHR1cmU7XHJcblxyXG4gICAgdmFyIGNhbnZhcyA9IFRpbnkuQ2FudmFzVGludGVyLmNhbnZhcyB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgXHJcbiAgICBUaW55LkNhbnZhc1RpbnRlci50aW50TWV0aG9kKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpO1xyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc1RpbnRlci5jb252ZXJ0VGludFRvSW1hZ2UpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gaXMgdGhpcyBiZXR0ZXI/XHJcbiAgICAgICAgdmFyIHRpbnRJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRpbnRJbWFnZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcblxyXG4gICAgICAgIC8vIHRleHR1cmUudGludENhY2hlW3N0cmluZ0NvbG9yXSA9IHRpbnRJbWFnZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuXHJcbiAgICAgICAgVGlueS5DYW52YXNUaW50ZXIuY2FudmFzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2FudmFzO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseSA9IGZ1bmN0aW9uKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpXHJcbntcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoIFwiMmRcIiApO1xyXG5cclxuICAgIHZhciBjcm9wID0gdGV4dHVyZS5jcm9wO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNyb3Aud2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gY3JvcC5oZWlnaHQ7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNcIiArIChcIjAwMDAwXCIgKyAoIGNvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuICAgIFxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcIm11bHRpcGx5XCI7XHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQpO1xyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1hdG9wXCI7XHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQpO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhQZXJQaXhlbCA9IGZ1bmN0aW9uKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpXHJcbntcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICB2YXIgY3JvcCA9IHRleHR1cmUuY3JvcDtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjcm9wLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGNyb3AuaGVpZ2h0O1xyXG4gIFxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImNvcHlcIjtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRleHR1cmUuYmFzZVRleHR1cmUuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICB2YXIgcmdiVmFsdWVzID0gVGlueS5oZXgycmdiKGNvbG9yKTtcclxuICAgIHZhciByID0gcmdiVmFsdWVzWzBdLCBnID0gcmdiVmFsdWVzWzFdLCBiID0gcmdiVmFsdWVzWzJdO1xyXG5cclxuICAgIHZhciBwaXhlbERhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgdmFyIHBpeGVscyA9IHBpeGVsRGF0YS5kYXRhO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGl4ZWxzLmxlbmd0aDsgaSArPSA0KVxyXG4gICAge1xyXG4gICAgICBwaXhlbHNbaSswXSAqPSByO1xyXG4gICAgICBwaXhlbHNbaSsxXSAqPSBnO1xyXG4gICAgICBwaXhlbHNbaSsyXSAqPSBiO1xyXG5cclxuICAgICAgaWYgKCFUaW55LmNhbkhhbmRsZUFscGhhKVxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyIGFscGhhID0gcGl4ZWxzW2krM107XHJcblxyXG4gICAgICAgIHBpeGVsc1tpKzBdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgIHBpeGVsc1tpKzFdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgIHBpeGVsc1tpKzJdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEocGl4ZWxEYXRhLCAwLCAwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrSW52ZXJzZUFscGhhKClcclxue1xyXG4gICAgdmFyIGNhbnZhcyA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcigyLCAxKTtcclxuXHJcbiAgICBjYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMTAsIDIwLCAzMCwgMC41KVwiO1xyXG5cclxuICAgIC8vICBEcmF3IGEgc2luZ2xlIHBpeGVsXHJcbiAgICBjYW52YXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgR2V0IHRoZSBjb2xvciB2YWx1ZXNcclxuICAgIHZhciBzMSA9IGNhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgUGxvdCB0aGVtIHRvIHgyXHJcbiAgICBjYW52YXMuY29udGV4dC5wdXRJbWFnZURhdGEoczEsIDEsIDApO1xyXG5cclxuICAgIC8vICBHZXQgdGhvc2UgdmFsdWVzXHJcbiAgICB2YXIgczIgPSBjYW52YXMuY29udGV4dC5nZXRJbWFnZURhdGEoMSwgMCwgMSwgMSk7XHJcblxyXG4gICAgLy8gIENvbXBhcmUgYW5kIHJldHVyblxyXG4gICAgcmV0dXJuIChzMi5kYXRhWzBdID09PSBzMS5kYXRhWzBdICYmIHMyLmRhdGFbMV0gPT09IHMxLmRhdGFbMV0gJiYgczIuZGF0YVsyXSA9PT0gczEuZGF0YVsyXSAmJiBzMi5kYXRhWzNdID09PSBzMS5kYXRhWzNdKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrQmxlbmRNb2RlICgpXHJcbntcclxuICAgIHZhciBwbmdIZWFkID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQVFBQUFBQkFRTUFBQUREOHAyT0FBQUFBMUJNVkVYLyc7XHJcbiAgICB2YXIgcG5nRW5kID0gJ0FBQUFDa2xFUVZRSTEyTmdBQUFBQWdBQjRpRzhNd0FBQUFCSlJVNUVya0pnZ2c9PSc7XHJcblxyXG4gICAgdmFyIG1hZ2VudGEgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBtYWdlbnRhLm9ubG9hZCA9IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHllbGxvdyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgICB5ZWxsb3cub25sb2FkID0gZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gNjtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseSc7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShtYWdlbnRhLCAwLCAwKTtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoeWVsbG93LCAyLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGV4dC5nZXRJbWFnZURhdGEoMiwgMCwgMSwgMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgyLCAwLCAxLCAxKS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgVGlueS5zdXBwb3J0TmV3QmxlbmRNb2RlcyA9IChkYXRhWzBdID09PSAyNTUgJiYgZGF0YVsxXSA9PT0gMCAmJiBkYXRhWzJdID09PSAwKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB5ZWxsb3cuc3JjID0gcG5nSGVhZCArICcvd0NLeHZSRicgKyBwbmdFbmQ7XHJcbiAgICB9O1xyXG5cclxuICAgIG1hZ2VudGEuc3JjID0gcG5nSGVhZCArICdBUDgwNE9hNicgKyBwbmdFbmQ7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuY29udmVydFRpbnRUb0ltYWdlID0gZmFsc2U7XHJcblxyXG5UaW55LmNhbkhhbmRsZUFscGhhID0gY2hlY2tJbnZlcnNlQWxwaGEoKTtcclxuXHJcblRpbnkuc3VwcG9ydE5ld0JsZW5kTW9kZXMgPSBjaGVja0JsZW5kTW9kZSgpO1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludE1ldGhvZCA9IFRpbnkuc3VwcG9ydE5ld0JsZW5kTW9kZXMgPyBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5IDogIFRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoUGVyUGl4ZWw7XHJcbiIsIlxyXG5UaW55LkNhbnZhc0dyYXBoaWNzID0gZnVuY3Rpb24oKVxyXG57XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzID0gZnVuY3Rpb24oZ3JhcGhpY3MsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciB3b3JsZEFscGhhID0gZ3JhcGhpY3Mud29ybGRBbHBoYTtcclxuXHJcbiAgICBpZiAoZ3JhcGhpY3MuZGlydHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHcmFwaGljc1RpbnQoZ3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IGRhdGEuX2ZpbGxUaW50O1xyXG4gICAgICAgIHZhciBsaW5lQ29sb3IgPSBkYXRhLl9saW5lVGludDtcclxuXHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBkYXRhLmxpbmVXaWR0aDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUE9MWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaj0xOyBqIDwgcG9pbnRzLmxlbmd0aC8yOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tqICogMl0sIHBvaW50c1tqICogMiArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNoYXBlLmNsb3NlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl0gJiYgcG9pbnRzWzFdID09PSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMnICsgKCcwMDAwMCcgKyAoIGZpbGxDb2xvciB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMnICsgKCcwMDAwMCcgKyAoIGxpbmVDb2xvciB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGxDb2xvciB8fCBkYXRhLmZpbGxDb2xvciA9PT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMnICsgKCcwMDAwMCcgKyAoIGZpbGxDb2xvciB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggbGluZUNvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPIC0gbmVlZCB0byBiZSBVbmRlZmluZWQhXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLnJhZGl1cywwLDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggZmlsbENvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggbGluZUNvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5FTElQKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gZWxsaXBzZSBjb2RlIHRha2VuIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE3Mjc5OC9ob3ctdG8tZHJhdy1hbi1vdmFsLWluLWh0bWw1LWNhbnZhc1xyXG5cclxuICAgICAgICAgICAgdmFyIHcgPSBzaGFwZS53aWR0aCAqIDI7XHJcbiAgICAgICAgICAgIHZhciBoID0gc2hhcGUuaGVpZ2h0ICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gc2hhcGUueCAtIHcvMjtcclxuICAgICAgICAgICAgdmFyIHkgPSBzaGFwZS55IC0gaC8yO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYXBwYSA9IDAuNTUyMjg0OCxcclxuICAgICAgICAgICAgICAgIG94ID0gKHcgLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBveSA9IChoIC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcclxuICAgICAgICAgICAgICAgIHhlID0geCArIHcsICAgICAgICAgICAvLyB4LWVuZFxyXG4gICAgICAgICAgICAgICAgeWUgPSB5ICsgaCwgICAgICAgICAgIC8vIHktZW5kXHJcbiAgICAgICAgICAgICAgICB4bSA9IHggKyB3IC8gMiwgICAgICAgLy8geC1taWRkbGVcclxuICAgICAgICAgICAgICAgIHltID0geSArIGggLyAyOyAgICAgICAvLyB5LW1pZGRsZVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeCwgeW0gLSBveSwgeG0gLSBveCwgeSwgeG0sIHkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gKyBveCwgeSwgeGUsIHltIC0gb3ksIHhlLCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4ZSwgeW0gKyBveSwgeG0gKyBveCwgeWUsIHhtLCB5ZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSAtIG94LCB5ZSwgeCwgeW0gKyBveSwgeCwgeW0pO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjJyArICgnMDAwMDAnICsgKCBmaWxsQ29sb3IgfCAwKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICcjJyArICgnMDAwMDAnICsgKCBsaW5lQ29sb3IgfCAwKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcnggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICB2YXIgcnkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBzaGFwZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHNoYXBlLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHNoYXBlLnJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXhSYWRpdXMgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIgfCAwO1xyXG4gICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgPiBtYXhSYWRpdXMgPyBtYXhSYWRpdXMgOiByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhyeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5ICsgaGVpZ2h0LCByeCArIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoIC0gcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSArIGhlaWdodCwgcnggKyB3aWR0aCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoLCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSwgcnggKyB3aWR0aCAtIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5LCByeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbENvbG9yIHx8IGRhdGEuZmlsbENvbG9yID09PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggZmlsbENvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggbGluZUNvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsQ29sb3IgfHwgZGF0YS5maWxsQ29sb3IgPT09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjJyArICgnMDAwMDAnICsgKCBmaWxsQ29sb3IgfCAwKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMnICsgKCcwMDAwMCcgKyAoIGZpbGxDb2xvciB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5saW5lSm9pbiA9IFwicm91bmRcIjtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QocnggKyAocmFkaXVzIC8gMiksIHJ5ICsgKHJhZGl1cyAvIDIpLCB3aWR0aCAtIHJhZGl1cywgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChyeCArIChyYWRpdXMgLyAyKSwgcnkgKyAocmFkaXVzIC8gMiksIHdpZHRoIC0gcmFkaXVzLCBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3NNYXNrID0gZnVuY3Rpb24oZ3JhcGhpY3MsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciBsZW4gPSBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoO1xyXG5cclxuICAgIGlmIChsZW4gPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzLmdyYXBoaWNzRGF0YVtpXTtcclxuICAgICAgICB2YXIgc2hhcGUgPSBkYXRhLnNoYXBlO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUE9MWSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBqPTE7IGogPCBwb2ludHMubGVuZ3RoLzI7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2ogKiAyXSwgcG9pbnRzW2ogKiAyICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl0gJiYgcG9pbnRzWzFdID09PSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVjdChzaGFwZS54LCBzaGFwZS55LCBzaGFwZS53aWR0aCwgc2hhcGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuQ0lSQylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gLSBuZWVkIHRvIGJlIFVuZGVmaW5lZCFcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkVMSVApXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy8gZWxsaXBzZSBjb2RlIHRha2VuIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE3Mjc5OC9ob3ctdG8tZHJhdy1hbi1vdmFsLWluLWh0bWw1LWNhbnZhc1xyXG5cclxuICAgICAgICAgICAgdmFyIHcgPSBzaGFwZS53aWR0aCAqIDI7XHJcbiAgICAgICAgICAgIHZhciBoID0gc2hhcGUuaGVpZ2h0ICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gc2hhcGUueCAtIHcvMjtcclxuICAgICAgICAgICAgdmFyIHkgPSBzaGFwZS55IC0gaC8yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGthcHBhID0gMC41NTIyODQ4LFxyXG4gICAgICAgICAgICAgICAgb3ggPSAodyAvIDIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IGhvcml6b250YWxcclxuICAgICAgICAgICAgICAgIG95ID0gKGggLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCB2ZXJ0aWNhbFxyXG4gICAgICAgICAgICAgICAgeGUgPSB4ICsgdywgICAgICAgICAgIC8vIHgtZW5kXHJcbiAgICAgICAgICAgICAgICB5ZSA9IHkgKyBoLCAgICAgICAgICAgLy8geS1lbmRcclxuICAgICAgICAgICAgICAgIHhtID0geCArIHcgLyAyLCAgICAgICAvLyB4LW1pZGRsZVxyXG4gICAgICAgICAgICAgICAgeW0gPSB5ICsgaCAvIDI7ICAgICAgIC8vIHktbWlkZGxlXHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyh4LCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4LCB5bSAtIG95LCB4bSAtIG94LCB5LCB4bSwgeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSArIG94LCB5LCB4ZSwgeW0gLSBveSwgeGUsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhlLCB5bSArIG95LCB4bSArIG94LCB5ZSwgeG0sIHllKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtIC0gb3gsIHllLCB4LCB5bSArIG95LCB4LCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMgfHwgZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcnggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICB2YXIgcnkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBzaGFwZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHNoYXBlLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHNoYXBlLnJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXhSYWRpdXMgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIgfCAwO1xyXG4gICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgPiBtYXhSYWRpdXMgPyBtYXhSYWRpdXMgOiByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhyeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5ICsgaGVpZ2h0LCByeCArIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoIC0gcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSArIGhlaWdodCwgcnggKyB3aWR0aCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoLCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSwgcnggKyB3aWR0aCAtIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5LCByeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzR3JhcGhpY3MudXBkYXRlR3JhcGhpY3NUaW50ID0gZnVuY3Rpb24oZ3JhcGhpY3MpXHJcbntcclxuICAgIGlmIChncmFwaGljcy50aW50ID09PSAweEZGRkZGRilcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRpbnRSID0gKGdyYXBoaWNzLnRpbnQgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgIHZhciB0aW50RyA9IChncmFwaGljcy50aW50ID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgIHZhciB0aW50QiA9IChncmFwaGljcy50aW50ICYgMHhGRikvIDI1NTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYXBoaWNzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzLmdyYXBoaWNzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IGRhdGEuZmlsbENvbG9yIHwgMDtcclxuICAgICAgICB2YXIgbGluZUNvbG9yID0gZGF0YS5saW5lQ29sb3IgfCAwO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBjb2xvclIgPSAoZmlsbENvbG9yID4+IDE2ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgdmFyIGNvbG9yRyA9IChmaWxsQ29sb3IgPj4gOCAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIHZhciBjb2xvckIgPSAoZmlsbENvbG9yICYgMHhGRikgLyAyNTU7IFxyXG4gICAgICAgIGNvbG9yUiAqPSB0aW50UjtcclxuICAgICAgICBjb2xvckcgKj0gdGludEc7XHJcbiAgICAgICAgY29sb3JCICo9IHRpbnRCO1xyXG4gICAgICAgIGZpbGxDb2xvciA9ICgoY29sb3JSKjI1NSA8PCAxNikgKyAoY29sb3JHKjI1NSA8PCA4KSArIGNvbG9yQioyNTUpO1xyXG4gICAgICAgIGNvbG9yUiA9IChsaW5lQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgICAgICBjb2xvckcgPSAobGluZUNvbG9yID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgICAgICBjb2xvckIgPSAobGluZUNvbG9yICYgMHhGRikgLyAyNTU7IFxyXG4gICAgICAgIGNvbG9yUiAqPSB0aW50UjtcclxuICAgICAgICBjb2xvckcgKj0gdGludEc7XHJcbiAgICAgICAgY29sb3JCICo9IHRpbnRCO1xyXG4gICAgICAgIGxpbmVDb2xvciA9ICgoY29sb3JSKjI1NSA8PCAxNikgKyAoY29sb3JHKjI1NSA8PCA4KSArIGNvbG9yQioyNTUpOyAgIFxyXG4gICAgICAgICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgZGF0YS5fZmlsbFRpbnQgPSAoKChmaWxsQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NSAqIHRpbnRSKjI1NSA8PCAxNikgKyAoKGZpbGxDb2xvciA+PiA4ICYgMHhGRikgLyAyNTUgKiB0aW50RyoyNTUgPDwgOCkgKyAgKGZpbGxDb2xvciAmIDB4RkYpIC8gMjU1ICogdGludEIqMjU1KTtcclxuICAgICAgICBkYXRhLl9saW5lVGludCA9ICgoKGxpbmVDb2xvciA+PiAxNiAmIDB4RkYpIC8gMjU1ICogdGludFIqMjU1IDw8IDE2KSArICgobGluZUNvbG9yID4+IDggJiAweEZGKSAvIDI1NSAqIHRpbnRHKjI1NSA8PCA4KSArICAobGluZUNvbG9yICYgMHhGRikgLyAyNTUgKiB0aW50QioyNTUpO1xyXG5cclxuICAgIH1cclxufTsiLCJcclxuVGlueS5CYXNlVGV4dHVyZUNhY2hlID0ge307XHJcblxyXG5UaW55LkJhc2VUZXh0dXJlQ2FjaGVJZEdlbmVyYXRvciA9IDA7XHJcblxyXG5UaW55LkJhc2VUZXh0dXJlID0gZnVuY3Rpb24oc291cmNlKVxyXG57XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSAxMDA7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAxMDA7XHJcblxyXG4gICAgdGhpcy5oYXNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuXHJcbiAgICB0aGlzLnVpZCA9IFRpbnkuX1VJRCsrO1xyXG5cclxuICAgIGlmKCFzb3VyY2UpIHJldHVybjtcclxuXHJcbiAgICBpZigodGhpcy5zb3VyY2UuY29tcGxldGUgfHwgdGhpcy5zb3VyY2UuZ2V0Q29udGV4dCkgJiYgdGhpcy5zb3VyY2Uud2lkdGggJiYgdGhpcy5zb3VyY2UuaGVpZ2h0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaGFzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5zb3VyY2UubmF0dXJhbFdpZHRoIHx8IHRoaXMuc291cmNlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zb3VyY2UubmF0dXJhbEhlaWdodCB8fCB0aGlzLnNvdXJjZS5oZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNjb3BlID0gdGhpcztcclxuICAgICAgICB0aGlzLnNvdXJjZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2NvcGUuaGFzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2NvcGUud2lkdGggPSBzY29wZS5zb3VyY2UubmF0dXJhbFdpZHRoIHx8IHNjb3BlLnNvdXJjZS53aWR0aDtcclxuICAgICAgICAgICAgc2NvcGUuaGVpZ2h0ID0gc2NvcGUuc291cmNlLm5hdHVyYWxIZWlnaHQgfHwgc2NvcGUuc291cmNlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW1hZ2VVcmwgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5CYXNlVGV4dHVyZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkJhc2VUZXh0dXJlO1xyXG5cclxuVGlueS5CYXNlVGV4dHVyZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy5pbWFnZVVybClcclxuICAgIHtcclxuICAgICAgICBkZWxldGUgVGlueS5CYXNlVGV4dHVyZUNhY2hlW3RoaXMua2V5XTtcclxuICAgICAgICBkZWxldGUgVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy5rZXldO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VVcmwgPSBudWxsO1xyXG4gICAgICAgIGlmICghbmF2aWdhdG9yLmlzQ29jb29uSlMpIHRoaXMuc291cmNlLnNyYyA9ICcnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UuX3BpeGlJZClcclxuICAgIHtcclxuICAgICAgICBkZWxldGUgVGlueS5CYXNlVGV4dHVyZUNhY2hlW3RoaXMuc291cmNlLl9waXhpSWRdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zb3VyY2UgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5CYXNlVGV4dHVyZS5mcm9tSW1hZ2UgPSBmdW5jdGlvbihrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbilcclxue1xyXG4gICAgdmFyIGJhc2VUZXh0dXJlID0gVGlueS5CYXNlVGV4dHVyZUNhY2hlW2tleV07XHJcblxyXG4gICAgaWYoY3Jvc3NvcmlnaW4gPT09IHVuZGVmaW5lZCAmJiBpbWFnZVVybC5pbmRleE9mKCdkYXRhOicpID09PSAtMSkgY3Jvc3NvcmlnaW4gPSB0cnVlO1xyXG5cclxuICAgIGlmKCFiYXNlVGV4dHVyZSlcclxuICAgIHtcclxuICAgICAgICAvLyBuZXcgSW1hZ2UoKSBicmVha3MgdGV4IGxvYWRpbmcgaW4gc29tZSB2ZXJzaW9ucyBvZiBDaHJvbWUuXHJcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yMzgwNzFcclxuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTsvL2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuICAgICAgICBpZiAoY3Jvc3NvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgYmFzZVRleHR1cmUgPSBuZXcgVGlueS5CYXNlVGV4dHVyZShpbWFnZSk7XHJcbiAgICAgICAgYmFzZVRleHR1cmUuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuICAgICAgICBiYXNlVGV4dHVyZS5rZXkgPSBrZXk7XHJcbiAgICAgICAgVGlueS5CYXNlVGV4dHVyZUNhY2hlW2tleV0gPSBiYXNlVGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYmFzZVRleHR1cmU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VUZXh0dXJlLmZyb21DYW52YXMgPSBmdW5jdGlvbihjYW52YXMpXHJcbntcclxuICAgIGlmKCFjYW52YXMuX3BpeGlJZClcclxuICAgIHtcclxuICAgICAgICBjYW52YXMuX3BpeGlJZCA9ICdjYW52YXNfJyArIFRpbnkuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3IrKztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmFzZVRleHR1cmUgPSBUaW55LkJhc2VUZXh0dXJlQ2FjaGVbY2FudmFzLl9waXhpSWRdO1xyXG5cclxuICAgIGlmKCFiYXNlVGV4dHVyZSlcclxuICAgIHtcclxuICAgICAgICBiYXNlVGV4dHVyZSA9IG5ldyBUaW55LkJhc2VUZXh0dXJlKGNhbnZhcyk7XHJcbiAgICAgICAgVGlueS5CYXNlVGV4dHVyZUNhY2hlW2NhbnZhcy5fcGl4aUlkXSA9IGJhc2VUZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiYXNlVGV4dHVyZTtcclxufTsiLCJcclxuVGlueS5SZW5kZXJUZXh0dXJlID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgcmVuZGVyZXIsIHJlc29sdXRpb24pXHJcbntcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCAxMDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAxMDA7XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCAxO1xyXG5cclxuICAgIHRoaXMuZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIHRoaXMuY3JvcCA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgdGhpcy5iYXNlVGV4dHVyZSA9IG5ldyBUaW55LkJhc2VUZXh0dXJlKCk7XHJcbiAgICB0aGlzLmJhc2VUZXh0dXJlLndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICB0aGlzLmJhc2VUZXh0dXJlLl9nbFRleHR1cmVzID0gW107XHJcbiAgICB0aGlzLmJhc2VUZXh0dXJlLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5iYXNlVGV4dHVyZS5oYXNMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgIFRpbnkuVGV4dHVyZS5jYWxsKHRoaXMsXHJcbiAgICAgICAgdGhpcy5iYXNlVGV4dHVyZSxcclxuICAgICAgICBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlciB8fCBUaW55LmRlZmF1bHRSZW5kZXJlcjtcclxuXHJcbiAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyQ2FudmFzO1xyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRoaXMud2lkdGgqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICB0aGlzLmJhc2VUZXh0dXJlLnNvdXJjZSA9IHRoaXMudGV4dHVyZUJ1ZmZlci5jYW52YXM7XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlRleHR1cmUucHJvdG90eXBlKTtcclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmVuZGVyVGV4dHVyZTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgdXBkYXRlQmFzZSlcclxue1xyXG4gICAgaWYgKHdpZHRoID09PSB0aGlzLndpZHRoICYmIGhlaWdodCA9PT0gdGhpcy5oZWlnaHQpcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSAod2lkdGggPiAwICYmIGhlaWdodCA+IDApO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5mcmFtZS53aWR0aCA9IHRoaXMuY3JvcC53aWR0aCA9IHdpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgdGhpcy5mcmFtZS5oZWlnaHQgPSB0aGlzLmNyb3AuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGlmICh1cGRhdGVCYXNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYmFzZVRleHR1cmUud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgICAgIHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIXRoaXMudmFsaWQpcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZUJ1ZmZlci5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYoIXRoaXMudmFsaWQpcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZUJ1ZmZlci5jbGVhcigpO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZW5kZXJDYW52YXMgPSBmdW5jdGlvbihkaXNwbGF5T2JqZWN0LCBtYXRyaXgsIGNsZWFyKVxyXG57XHJcbiAgICBpZighdGhpcy52YWxpZClyZXR1cm47XHJcblxyXG4gICAgdmFyIHd0ID0gZGlzcGxheU9iamVjdC53b3JsZFRyYW5zZm9ybTtcclxuICAgIHd0LmlkZW50aXR5KCk7XHJcbiAgICBpZihtYXRyaXgpd3QuYXBwZW5kKG1hdHJpeCk7XHJcbiAgICBcclxuICAgIC8vIHNldFdvcmxkIEFscGhhIHRvIGVuc3VyZSB0aGF0IHRoZSBvYmplY3QgaXMgcmVuZGVyZXIgYXQgZnVsbCBvcGFjaXR5XHJcbiAgICBkaXNwbGF5T2JqZWN0LndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgIC8vIFRpbWUgdG8gdXBkYXRlIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIGRpc3BsYXlPYmplY3Qgd2l0aCB0aGUgbmV3IG1hdHJpeC4uICAgIFxyXG4gICAgdmFyIGNoaWxkcmVuID0gZGlzcGxheU9iamVjdC5jaGlsZHJlbjtcclxuXHJcbiAgICBmb3IodmFyIGkgPSAwLCBqID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIGNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGNsZWFyKXRoaXMudGV4dHVyZUJ1ZmZlci5jbGVhcigpO1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gdGhpcy50ZXh0dXJlQnVmZmVyLmNvbnRleHQ7XHJcblxyXG4gICAgdmFyIHJlYWxSZXNvbHV0aW9uID0gdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckRpc3BsYXlPYmplY3QoZGlzcGxheU9iamVjdCwgY29udGV4dCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uID0gcmVhbFJlc29sdXRpb247XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltYWdlLnNyYyA9IHRoaXMuZ2V0QmFzZTY0KCk7XHJcbiAgICByZXR1cm4gaW1hZ2U7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldEJhc2U2NCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FudmFzKCkudG9EYXRhVVJMKCk7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmdldENhbnZhcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dHVyZUJ1ZmZlci5jYW52YXM7XHJcbn07IiwiXHJcblRpbnkuVGV4dHVyZUNhY2hlID0ge307XHJcblRpbnkuRnJhbWVDYWNoZSA9IHt9O1xyXG5cclxuVGlueS5UZXh0dXJlU2lsZW50RmFpbCA9IGZhbHNlO1xyXG5cclxuVGlueS5UZXh0dXJlQ2FjaGVJZEdlbmVyYXRvciA9IDA7XHJcblxyXG5UaW55LlRleHR1cmUgPSBmdW5jdGlvbihiYXNlVGV4dHVyZSwgZnJhbWUsIGNyb3AsIHRyaW0pXHJcbntcclxuICAgIHRoaXMubm9GcmFtZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghZnJhbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ub0ZyYW1lID0gdHJ1ZTtcclxuICAgICAgICBmcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLDAsMSwxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYmFzZVRleHR1cmUgaW5zdGFuY2VvZiBUaW55LlRleHR1cmUpXHJcbiAgICB7XHJcbiAgICAgICAgYmFzZVRleHR1cmUgPSBiYXNlVGV4dHVyZS5iYXNlVGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJhc2VUZXh0dXJlID0gYmFzZVRleHR1cmU7XHJcblxyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lO1xyXG5cclxuICAgIHRoaXMudHJpbSA9IHRyaW07XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuXHJcbiAgICB0aGlzLmNyb3AgPSBjcm9wIHx8IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICBpZiAoYmFzZVRleHR1cmUuaGFzTG9hZGVkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLm5vRnJhbWUpIFxyXG4gICAgICAgICAgICBmcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCBiYXNlVGV4dHVyZS53aWR0aCwgYmFzZVRleHR1cmUuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnNldEZyYW1lKGZyYW1lKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlRleHR1cmU7XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLm9uQmFzZVRleHR1cmVMb2FkZWQgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBiYXNlVGV4dHVyZSA9IHRoaXMuYmFzZVRleHR1cmU7XHJcblxyXG4gICAgaWYgKHRoaXMubm9GcmFtZSkgdGhpcy5mcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCBiYXNlVGV4dHVyZS53aWR0aCwgYmFzZVRleHR1cmUuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLnNldEZyYW1lKHRoaXMuZnJhbWUpO1xyXG5cclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKGRlc3Ryb3lCYXNlKVxyXG57XHJcbiAgICBpZiAoZGVzdHJveUJhc2UpIHRoaXMuYmFzZVRleHR1cmUuZGVzdHJveSgpO1xyXG5cclxuICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUuc2V0RnJhbWUgPSBmdW5jdGlvbihmcmFtZSlcclxue1xyXG4gICAgdGhpcy5ub0ZyYW1lID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lO1xyXG4gICAgdGhpcy53aWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5jcm9wLnggPSBmcmFtZS54O1xyXG4gICAgdGhpcy5jcm9wLnkgPSBmcmFtZS55O1xyXG4gICAgdGhpcy5jcm9wLndpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICB0aGlzLmNyb3AuaGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgIGlmICghdGhpcy50cmltICYmIChmcmFtZS54ICsgZnJhbWUud2lkdGggPiB0aGlzLmJhc2VUZXh0dXJlLndpZHRoIHx8IGZyYW1lLnkgKyBmcmFtZS5oZWlnaHQgPiB0aGlzLmJhc2VUZXh0dXJlLmhlaWdodCkpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFUaW55LlRleHR1cmVTaWxlbnRGYWlsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXh0dXJlIEVycm9yOiBmcmFtZSBkb2VzIG5vdCBmaXQgaW5zaWRlIHRoZSBiYXNlIFRleHR1cmUgZGltZW5zaW9ucyAnICsgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmFsaWQgPSBmcmFtZSAmJiBmcmFtZS53aWR0aCAmJiBmcmFtZS5oZWlnaHQgJiYgdGhpcy5iYXNlVGV4dHVyZS5zb3VyY2UgJiYgdGhpcy5iYXNlVGV4dHVyZS5oYXNMb2FkZWQ7XHJcblxyXG4gICAgaWYgKHRoaXMudHJpbSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy50cmltLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy50cmltLmhlaWdodDtcclxuICAgICAgICB0aGlzLmZyYW1lLndpZHRoID0gdGhpcy50cmltLndpZHRoO1xyXG4gICAgICAgIHRoaXMuZnJhbWUuaGVpZ2h0ID0gdGhpcy50cmltLmhlaWdodDtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5mcm9tSW1hZ2UgPSBmdW5jdGlvbihrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbilcclxue1xyXG4gICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtrZXldO1xyXG5cclxuICAgIGlmKCF0ZXh0dXJlKVxyXG4gICAge1xyXG4gICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKFRpbnkuQmFzZVRleHR1cmUuZnJvbUltYWdlKGtleSwgaW1hZ2VVcmwsIGNyb3Nzb3JpZ2luKSk7XHJcbiAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXlcclxuICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtrZXldID0gdGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5mcm9tRnJhbWUgPSBmdW5jdGlvbihmcmFtZUlkKVxyXG57XHJcbiAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2ZyYW1lSWRdO1xyXG4gICAgaWYoIXRleHR1cmUpIHRocm93IG5ldyBFcnJvcignVGhlIGZyYW1lSWQgXCInICsgZnJhbWVJZCArICdcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdGV4dHVyZSBjYWNoZSAnKTtcclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLmZyb21DYW52YXMgPSBmdW5jdGlvbihjYW52YXMpXHJcbntcclxuICAgIHZhciBiYXNlVGV4dHVyZSA9IFRpbnkuQmFzZVRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXMpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGlueS5UZXh0dXJlKCBiYXNlVGV4dHVyZSApO1xyXG5cclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5hZGRUZXh0dXJlVG9DYWNoZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGlkKVxyXG57XHJcbiAgICBUaW55LlRleHR1cmVDYWNoZVtpZF0gPSB0ZXh0dXJlO1xyXG59O1xyXG5cclxuXHJcblRpbnkuVGV4dHVyZS5yZW1vdmVUZXh0dXJlRnJvbUNhY2hlID0gZnVuY3Rpb24oaWQpXHJcbntcclxuICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVbaWRdO1xyXG4gICAgZGVsZXRlIFRpbnkuVGV4dHVyZUNhY2hlW2lkXTtcclxuICAgIGRlbGV0ZSBUaW55LkJhc2VUZXh0dXJlQ2FjaGVbaWRdO1xyXG4gICAgcmV0dXJuIHRleHR1cmU7XHJcbn07IiwiVGlueS5DYW52YXNCdWZmZXIgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzQnVmZmVyO1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59OyIsIlRpbnkuRXZlbnRUYXJnZXQgPSB7XHJcblxyXG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbENvbXBhdChvYmopIHtcclxuICAgICAgICBpZihvYmopIHtcclxuICAgICAgICAgICAgb2JqID0gb2JqLnByb3RvdHlwZSB8fCBvYmo7XHJcbiAgICAgICAgICAgIFRpbnkuRXZlbnRUYXJnZXQubWl4aW4ob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluOiBmdW5jdGlvbiBtaXhpbihvYmopIHtcclxuXHJcbiAgICAgICAgb2JqLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdID8gdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0uc2xpY2UoKSA6IFtdO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5lbWl0ID0gb2JqLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMgfHwge307XHJcblxyXG4gICAgICAgICAgICAvL2JhY2t3YXJkcyBjb21wYXQgd2l0aCBvbGQgbWV0aG9kIFwiLmVtaXQoeyB0eXBlOiAnc29tZXRoaW5nJyB9KVwiXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnROYW1lID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGV2ZW50TmFtZTtcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50eXBlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2Vuc3VyZSB3ZSBhcmUgdXNpbmcgYSByZWFsIFRpbnkgZXZlbnRcclxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEuX19pc0V2ZW50T2JqZWN0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFRpbnkuRXZlbnQodGhpcywgZXZlbnROYW1lLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9pdGVyYXRlIHRoZSBsaXN0ZW5lcnNcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVycyAmJiB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnNsaWNlKDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZm4gPSBsaXN0ZW5lcnNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgaTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBmbiA9IGxpc3RlbmVyc1srK2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYWxsIHRoZSBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgICAgICAgICAgICAgIGZuLl9jYl8uY2FsbChmbi5fY3R4XywgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgXCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cIiBpcyBjYWxsZWQsIHN0b3AgY2FsbGluZyBzaWJsaW5nIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0b3BwZWRJbW1lZGlhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgXCJzdG9wUHJvcGFnYXRpb25cIiBpcyBjYWxsZWQgdGhlbiBkb24ndCBidWJibGUgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYnViYmxlIHRoaXMgZXZlbnQgdXAgdGhlIHNjZW5lIGdyYXBoXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5lbWl0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0LmNhbGwodGhpcy5wYXJlbnQsIGV2ZW50TmFtZSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5vbiA9IG9iai5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gb24oZXZlbnROYW1lLCBmbiwgY2Jjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICh0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSA9IHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdKVxyXG4gICAgICAgICAgICAgICAgLnB1c2goe19jYl86IGZuLCBfY3R4XzogY2Jjb250ZXh0fSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnROYW1lLCBmbiwgY2Jjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uY2VIYW5kbGVyV3JhcHBlcigpIHtcclxuICAgICAgICAgICAgICAgIGZuLmFwcGx5KGNiY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIHNlbGYub2ZmKGV2ZW50TmFtZSwgZm4sIGNiY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9uY2VIYW5kbGVyV3JhcHBlci5fb3JpZ2luYWxIYW5kbGVyID0gZm47XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbihldmVudE5hbWUsIG9uY2VIYW5kbGVyV3JhcHBlciwgY2Jjb250ZXh0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoub2ZmID0gb2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiBvZmYoZXZlbnROYW1lLCBmbiwgY3R4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0sXHJcbiAgICAgICAgICAgICAgICBpID0gZm4gPyBsaXN0Lmxlbmd0aCA6IDA7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoaS0tID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0uX2NiXyA9PT0gZm4gfHwgbGlzdFtpXS5fY2JfLl9vcmlnaW5hbEhhbmRsZXIgPT09IGZuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eCAmJiBsaXN0W2ldLl9jdHhfKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldLl9jdHhfID09PSBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGxpc3QuaW5kZXhPZihsaXN0W2ldKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFjdHggJiYgIWxpc3RbaV0uX2N0eF8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKGxpc3RbaV0pLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMgfHwge307XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5FdmVudCA9IGZ1bmN0aW9uKHRhcmdldCwgbmFtZSwgZGF0YSkge1xyXG4gICAgLy9mb3IgZHVjayB0eXBpbmcgaW4gdGhlIFwiLm9uKClcIiBmdW5jdGlvblxyXG5cclxuICAgIGZvciAodmFyIGsgaW4gZGF0YSkge1xyXG4gICAgICAgIHRoaXNba10gPSBkYXRhW2tdXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fX2lzRXZlbnRPYmplY3QgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc3RvcHBlZEltbWVkaWF0ZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cclxuICAgIHRoaXMudHlwZSA9IG5hbWU7XHJcblxyXG4gICAgdGhpcy50aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG59O1xyXG5cclxuVGlueS5FdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uKCkge1xyXG4gICAgdGhpcy5zdG9wcGVkID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIHtcclxuICAgIHRoaXMuc3RvcHBlZEltbWVkaWF0ZSA9IHRydWU7XHJcbn07IiwidmFyIF9pc1NldFRpbWVPdXQsIF9vbkxvb3AsIF90aW1lT3V0SUQsIF9wcmV2VGltZSwgX2xhc3RUaW1lO1xyXG5cclxudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG59XHJcblxyXG5pZiAoc2VsZi5wZXJmb3JtYW5jZSAhPT0gdW5kZWZpbmVkICYmIHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG5vdyA9IHNlbGYucGVyZm9ybWFuY2Uubm93LmJpbmQoc2VsZi5wZXJmb3JtYW5jZSk7XHJcbn0gZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gRGF0ZS5ub3c7XHJcbn1cclxuXHJcblRpbnkuUkFGID0gZnVuY3Rpb24gKGdhbWUsIGZvcmNlU2V0VGltZU91dClcclxue1xyXG5cclxuICAgIGlmIChmb3JjZVNldFRpbWVPdXQgPT09IHVuZGVmaW5lZCkgeyBmb3JjZVNldFRpbWVPdXQgPSBmYWxzZTsgfVxyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuXHJcbiAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5mb3JjZVNldFRpbWVPdXQgPSBmb3JjZVNldFRpbWVPdXQ7XHJcblxyXG4gICAgdmFyIHZlbmRvcnMgPSBbXHJcbiAgICAgICAgJ21zJyxcclxuICAgICAgICAnbW96JyxcclxuICAgICAgICAnd2Via2l0JyxcclxuICAgICAgICAnbydcclxuICAgIF07XHJcblxyXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgeCsrKVxyXG4gICAge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIF9vbkxvb3AgPSBudWxsO1xyXG4gICAgX3RpbWVPdXRJRCA9IG51bGw7XHJcblxyXG4gICAgX3ByZXZUaW1lID0gMFxyXG4gICAgX2xhc3RUaW1lID0gMFxyXG59O1xyXG5cclxuVGlueS5SQUYucHJvdG90eXBlID0ge1xyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG5cclxuICAgICAgICBfcHJldlRpbWUgPSBub3coKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgdGhpcy5mb3JjZVNldFRpbWVPdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlU2V0VGltZW91dCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBfb25Mb29wID0gZnVuY3Rpb24gKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlUkFGKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfb25Mb29wKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVJBRjogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuX3VwZGF0ZShNYXRoLmZsb29yKF9sYXN0VGltZSksIF9sYXN0VGltZSAtIF9wcmV2VGltZSk7XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfb25Mb29wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9wcmV2VGltZSA9IF9sYXN0VGltZVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlU2V0VGltZW91dDogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKVxyXG4gICAgICAgIGlmICh0aGlzLmlzUnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5fdXBkYXRlKE1hdGguZmxvb3IoX2xhc3RUaW1lKSwgX2xhc3RUaW1lIC0gX3ByZXZUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cuc2V0VGltZW91dChfb25Mb29wLCB0aGlzLmdhbWUudGltZS50aW1lVG9DYWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX3ByZXZUaW1lID0gX2xhc3RUaW1lXHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9pc1NldFRpbWVPdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RpbWVPdXRJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShfdGltZU91dElEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn07IiwiLyoqXHJcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxyXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcclxuICovXHJcblxyXG5cclxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLl90d2VlbnMgPSB7fTtcclxuXHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG59O1xyXG5cclxuX0dyb3VwLnByb3RvdHlwZSA9IHtcclxuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKS5tYXAoZnVuY3Rpb24gKHR3ZWVuSWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3R3ZWVuc1t0d2VlbklkXTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xyXG5cclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG5cclxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xyXG5cdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV0gPSB0d2VlbjtcclxuXHJcblx0fSxcclxuXHJcblx0cmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcclxuXHJcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldO1xyXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldO1xyXG5cclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xyXG5cclxuXHRcdHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XHJcblxyXG5cdFx0aWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBUV0VFTi5ub3coKTtcclxuXHJcblx0XHQvLyBUd2VlbnMgYXJlIHVwZGF0ZWQgaW4gXCJiYXRjaGVzXCIuIElmIHlvdSBhZGQgYSBuZXcgdHdlZW4gZHVyaW5nIGFuXHJcblx0XHQvLyB1cGRhdGUsIHRoZW4gdGhlIG5ldyB0d2VlbiB3aWxsIGJlIHVwZGF0ZWQgaW4gdGhlIG5leHQgYmF0Y2guXHJcblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC5cclxuXHRcdC8vIEhvd2V2ZXIsIGlmIHRoZSByZW1vdmVkIHR3ZWVuIHdhcyBhZGRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgYmF0Y2gsXHJcblx0XHQvLyB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXHJcblx0XHR3aGlsZSAodHdlZW5JZHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xyXG5cclxuXHRcdFx0XHRpZiAodHdlZW4gJiYgdHdlZW4udXBkYXRlKHRpbWUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmICghcHJlc2VydmUpIHtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fVxyXG59O1xyXG5cclxudmFyIFRXRUVOID0gbmV3IF9Hcm91cCgpO1xyXG5cclxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XHJcblRXRUVOLl9uZXh0SWQgPSAwO1xyXG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcclxufTtcclxuXHJcblxyXG4vLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxyXG4vLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXHJcbmlmICh0eXBlb2YgKHNlbGYpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmhydGltZSkge1xyXG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcclxuXHJcblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxyXG5cdFx0cmV0dXJuIHRpbWVbMF0gKiAxMDAwICsgdGltZVsxXSAvIDEwMDAwMDA7XHJcblx0fTtcclxufVxyXG4vLyBJbiBhIGJyb3dzZXIsIHVzZSBzZWxmLnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXHJcbmVsc2UgaWYgKHR5cGVvZiAoc2VsZikgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgICAgIHNlbGYucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0IHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuXHQvLyBUaGlzIG11c3QgYmUgYm91bmQsIGJlY2F1c2UgZGlyZWN0bHkgYXNzaWduaW5nIHRoaXMgZnVuY3Rpb25cclxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXHJcblx0VFdFRU4ubm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxufVxyXG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG5lbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XHJcbn1cclxuLy8gT3RoZXJ3aXNlLCB1c2UgJ25ldyBEYXRlKCkuZ2V0VGltZSgpJy5cclxuZWxzZSB7XHJcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdH07XHJcbn1cclxuXHJcblxyXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XHJcblx0dGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9wYXVzZVN0YXJ0ID0gbnVsbDtcclxuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XHJcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcclxuXHR0aGlzLl92YWx1ZXNFbmQgPSB7fTtcclxuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xyXG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcclxuXHR0aGlzLl9yZXBlYXQgPSAwO1xyXG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcclxuXHR0aGlzLl95b3lvID0gZmFsc2U7XHJcblx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XHJcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xyXG5cdHRoaXMuX3N0YXJ0VGltZSA9IG51bGw7XHJcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XHJcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XHJcblx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IFtdO1xyXG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XHJcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xyXG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9ncm91cCA9IGdyb3VwIHx8IFRXRUVOO1xyXG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XHJcblxyXG59O1xyXG5cclxuVFdFRU4uVHdlZW4ucHJvdG90eXBlID0ge1xyXG5cdGdldElkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faWQ7XHJcblx0fSxcclxuXHJcblx0aXNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xyXG5cdH0sXHJcblxyXG5cdGlzUGF1c2VkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNQYXVzZWQ7XHJcblx0fSxcclxuXHJcblx0dG86IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xyXG5cclxuXHRcdHRoaXMuX3ZhbHVlc0VuZCA9IE9iamVjdC5jcmVhdGUocHJvcGVydGllcyk7XHJcblxyXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0ZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKGQpIHtcclxuXHRcdHRoaXMuX2R1cmF0aW9uID0gZDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN0YXJ0OiBmdW5jdGlvbiAodGltZSkge1xyXG5cclxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XHJcblx0XHR0aGlzLl9zdGFydFRpbWUgKz0gdGhpcy5fZGVsYXlUaW1lO1xyXG5cclxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXHJcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxyXG5cdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSBbdGhpcy5fb2JqZWN0W3Byb3BlcnR5XV0uY29uY2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcclxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XHJcblx0XHRcdGlmICh0aGlzLl9vYmplY3RbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUsIGJ1dCBvbmx5IG9uY2UuXHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0c3RvcDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RvcENoYWluZWRUd2VlbnMoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZShJbmZpbml0eSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0cGF1c2U6IGZ1bmN0aW9uKHRpbWUpIHtcclxuXHJcblx0XHRpZiAodGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VTdGFydCA9IHRpbWUgPT09IHVuZGVmaW5lZCA/IFRXRUVOLm5vdygpIDogdGltZTtcclxuXHJcblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlc3VtZTogZnVuY3Rpb24odGltZSkge1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSAodGltZSA9PT0gdW5kZWZpbmVkID8gVFdFRU4ubm93KCkgOiB0aW1lKVxyXG5cdFx0XHQtIHRoaXMuX3BhdXNlU3RhcnQ7XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VTdGFydCA9IDA7XHJcblxyXG5cdFx0dGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcclxuXHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdG9wKCk7XHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdGdyb3VwOiBmdW5jdGlvbiAoZ3JvdXApIHtcclxuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRkZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xyXG5cclxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRyZXBlYXQ6IGZ1bmN0aW9uICh0aW1lcykge1xyXG5cclxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcblxyXG5cdFx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHlveW86IGZ1bmN0aW9uICh5b3lvKSB7XHJcblxyXG5cdFx0dGhpcy5feW95byA9IHlveW87XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0ZWFzaW5nOiBmdW5jdGlvbiAoZWFzaW5nRnVuY3Rpb24pIHtcclxuXHJcblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhc2luZ0Z1bmN0aW9uO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGludGVycG9sYXRpb246IGZ1bmN0aW9uIChpbnRlcnBvbGF0aW9uRnVuY3Rpb24pIHtcclxuXHJcblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uRnVuY3Rpb247XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0Y2hhaW46IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gYXJndW1lbnRzO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uVXBkYXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0b25SZXBlYXQ6IGZ1bmN0aW9uIG9uUmVwZWF0KGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uQ29tcGxldGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uU3RvcDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lKSB7XHJcblxyXG5cdFx0dmFyIHByb3BlcnR5O1xyXG5cdFx0dmFyIGVsYXBzZWQ7XHJcblx0XHR2YXIgdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRpbWUgPCB0aGlzLl9zdGFydFRpbWUpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xyXG5cdFx0ZWxhcHNlZCA9ICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSkgPyAxIDogZWxhcHNlZDtcclxuXHJcblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xyXG5cclxuXHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XHJcblxyXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxyXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XHJcblx0XHRcdHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG5cclxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24oZW5kLCB2YWx1ZSk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXHJcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xyXG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxyXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCwgZWxhcHNlZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGVsYXBzZWQgPT09IDEpIHtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XHJcblxyXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XHJcblx0XHRcdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gKyBwYXJzZUZsb2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLl95b3lvKSB7XHJcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xyXG5cdFx0XHRcdFx0dGhpcy5fcmV2ZXJzZWQgPSAhdGhpcy5fcmV2ZXJzZWQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fcmVwZWF0RGVsYXlUaW1lICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9kZWxheVRpbWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fb25SZXBlYXRDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XHJcblx0XHRcdFx0XHQvLyBNYWtlIHRoZSBjaGFpbmVkIHR3ZWVucyBzdGFydCBleGFjdGx5IGF0IHRoZSB0aW1lIHRoZXkgc2hvdWxkLFxyXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXHJcblx0XHRcdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH1cclxufTtcclxuXHJcblxyXG5UV0VFTi5FYXNpbmcgPSB7XHJcblxyXG5cdExpbmVhcjoge1xyXG5cclxuXHRcdE5vbmU6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gaztcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdFF1YWRyYXRpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiAoMiAtIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0Q3ViaWM6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiBrICogayAqIGs7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRRdWFydGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRRdWludGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogayAqIGs7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRTaW51c29pZGFsOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdEV4cG9uZW50aWFsOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayA9PT0gMCA/IDAgOiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLSAxMCAqIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDEwMjQsIGsgLSAxKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgtIE1hdGgucG93KDIsIC0gMTAgKiAoayAtIDEpKSArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0Q2lyY3VsYXI6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRFbGFzdGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRrICo9IDI7XHJcblxyXG5cdFx0XHRpZiAoayA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gLTAuNSAqIE1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAtMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRCYWNrOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHZhciBzID0gMS43MDE1ODtcclxuXHJcblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRCb3VuY2U6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gVFdFRU4uRWFzaW5nLkJvdW5jZS5PdXQoMSAtIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPCAoMSAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgxLjUgLyAyLjc1KSkgKiBrICsgMC43NTtcclxuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmIChrIDwgMC41KSB7XHJcblx0XHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuSW4oayAqIDIpICogMC41O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5PdXQoayAqIDIgLSAxKSAqIDAuNSArIDAuNTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xyXG5cclxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgZiA9IG0gKiBrO1xyXG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG5cdFx0dmFyIGZuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5MaW5lYXI7XHJcblxyXG5cdFx0aWYgKGsgPCAwKSB7XHJcblx0XHRcdHJldHVybiBmbih2WzBdLCB2WzFdLCBmKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoayA+IDEpIHtcclxuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIGIgPSAwO1xyXG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgcHcgPSBNYXRoLnBvdztcclxuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDw9IG47IGkrKykge1xyXG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYjtcclxuXHJcblx0fSxcclxuXHJcblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcclxuXHJcblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcclxuXHRcdHZhciBmID0gbSAqIGs7XHJcblx0XHR2YXIgaSA9IE1hdGguZmxvb3IoZik7XHJcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XHJcblxyXG5cdFx0aWYgKHZbMF0gPT09IHZbbV0pIHtcclxuXHJcblx0XHRcdGlmIChrIDwgMCkge1xyXG5cdFx0XHRcdGkgPSBNYXRoLmZsb29yKGYgPSBtICogKDEgKyBrKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmbih2WyhpIC0gMSArIG0pICUgbV0sIHZbaV0sIHZbKGkgKyAxKSAlIG1dLCB2WyhpICsgMikgJSBtXSwgZiAtIGkpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiAoayA8IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPiAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIHZbbV0gLSAoZm4odlttXSwgdlttXSwgdlttIC0gMV0sIHZbbSAtIDFdLCBmIC0gbSkgLSB2W21dKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZuKHZbaSA/IGkgLSAxIDogMF0sIHZbaV0sIHZbbSA8IGkgKyAxID8gbSA6IGkgKyAxXSwgdlttIDwgaSArIDIgPyBtIDogaSArIDJdLCBmIC0gaSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRVdGlsczoge1xyXG5cclxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xyXG5cclxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcclxuXHJcblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xyXG5cclxuXHRcdFx0cmV0dXJuIGZjKG4pIC8gZmMoaSkgLyBmYyhuIC0gaSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHR2YXIgYSA9IFsxXTtcclxuXHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xyXG5cclxuXHRcdFx0XHR2YXIgcyA9IDE7XHJcblxyXG5cdFx0XHRcdGlmIChhW25dKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XHJcblx0XHRcdFx0XHRzICo9IGk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhW25dID0gcztcclxuXHRcdFx0XHRyZXR1cm4gcztcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0fSkoKSxcclxuXHJcblx0XHRDYXRtdWxsUm9tOiBmdW5jdGlvbiAocDAsIHAxLCBwMiwgcDMsIHQpIHtcclxuXHJcblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcclxuXHRcdFx0dmFyIHYxID0gKHAzIC0gcDEpICogMC41O1xyXG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcclxuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xyXG5cclxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG53aW5kb3cuVFdFRU4gPSBUV0VFTiIsImlmICghRGF0ZS5ub3cpIHtcclxuICBEYXRlLm5vdyA9IGZ1bmN0aW9uIG5vdygpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICB9O1xyXG59XHJcblxyXG5pZiAodHlwZW9mKEZsb2F0MzJBcnJheSkgPT0gJ3VuZGVmaW5lZCcpXHJcbntcclxuXHR3aW5kb3cuRmxvYXQzMkFycmF5ID0gQXJyYXlcclxufSIsInJlcXVpcmUoJy4uL3NyYy91dGlscy9wb2x5ZmlsbC5qcycpO1xyXG5cclxud2luZG93LlRpbnkgPSByZXF1aXJlKCcuLi9zcmMvVGlueS5qcycpO1xyXG5cclxucmVxdWlyZSgnLi4vc3JjL1RpbnlDb21tb24uanMnKTtcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy9nbG9iYWwuanMnKTtcclxucmVxdWlyZSgnLi4vc3JjL21hdGgvTWF0aC5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoJy4uL3NyYy9tYXRoL1BvaW50LmpzJyk7ICAgICAgLy9cclxucmVxdWlyZSgnLi4vc3JjL21hdGgvTWF0cml4LmpzJyk7ICAgICAvL1xyXG5yZXF1aXJlKCcuLi9zcmMvbWF0aC9SZWN0YW5nbGUuanMnKTsgIC8vICA4IEtiXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvZGlzcGxheS9EaXNwbGF5T2JqZWN0LmpzJyk7ICAgICAgICAgICAgIC8vXHJcbnJlcXVpcmUoJy4uL3NyYy9kaXNwbGF5L0Rpc3BsYXlPYmplY3RDb250YWluZXIuanMnKTsgICAgLy9cclxucmVxdWlyZSgnLi4vc3JjL2Rpc3BsYXkvU3RhZ2UuanMnKTsgICAgICAgICAgICAgICAgICAgICAvLyAxMCBLYlxyXG5cclxucmVxdWlyZSgnLi4vc3JjL3JlbmRlcmVyL0NhbnZhc1JlbmRlcmVyLmpzJyk7IC8vIDMgS2IiLCJyZXF1aXJlKCcuL3N0YW5kYXJkLmpzJylcclxuXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvbWF0aC9Sb3VuZGVkUmVjdGFuZ2xlLmpzJyk7XHQvL1xyXG5yZXF1aXJlKCcuLi9zcmMvbWF0aC9Qb2x5Z29uLmpzJyk7XHRcdFx0Ly9cclxucmVxdWlyZSgnLi4vc3JjL21hdGgvQ2lyY2xlLmpzJyk7XHRcdFx0Ly8gNiBLYlxyXG5cclxucmVxdWlyZSgnLi4vc3JjL3JlbmRlcmVyL0dyYXBoaWNzUmVuZGVyZXIuanMnKTsgLy8gNEtiXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvb2JqZWN0cy9HcmFwaGljcy5qcycpOyAvLyAxMCBLYlxyXG5yZXF1aXJlKCcuLi9zcmMvb2JqZWN0cy9UaWxpbmdTcHJpdGUuanMnKTsgLy8gNCBLYiAgICMjIyMjIyMjIyMjIyMjIyBUaWxpbmdTcHJpdGUgIGdhbWUuYWRkLnRpbGVzcHJpdGVcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlLmpzJyk7IC8vIDIgS2JcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy91dGlscy9DYW52YXNCdWZmZXIuanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuLi9zcmMvcmVuZGVyZXIvQ2FudmFzTWFza01hbmFnZXIuanMnKTsgLy8gMUtiXHJcbnJlcXVpcmUoJy4uL3NyYy9yZW5kZXJlci9DYW52YXNUaW50ZXIuanMnKTsgLy8gMyBLYiAjIyMjIyMjIyMjIyMjIyMjIHRpbnQgZnVuY3Rpb25cclxuXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvdXRpbHMvVHdlZW4uanMnKTtcclxuIiwicmVxdWlyZSgnLi9iYXNlLmpzJylcclxuXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvdXRpbHMvUkFGLmpzJyk7IC8vIDIgS2JcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy90ZXh0dXJlcy9CYXNlVGV4dHVyZS5qcycpO1x0Ly9cclxucmVxdWlyZSgnLi4vc3JjL3RleHR1cmVzL1RleHR1cmUuanMnKTtcdFx0Ly8gNCBLYlxyXG5cclxucmVxdWlyZSgnLi4vc3JjL29iamVjdHMvU3ByaXRlLmpzJyk7IC8vIDMgS2JcclxucmVxdWlyZSgnLi4vc3JjL29iamVjdHMvVGV4dC5qcycpOyAvLyA1IEtiXHJcblxyXG5cclxuIiwicmVxdWlyZSgnLi9taW5pLmpzJylcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy9tYW5hZ2Vycy9PYmplY3RDcmVhdG9yLmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZSgnLi4vc3JjL21hbmFnZXJzL0xvYWRlci5qcycpOyAvLyAzIEtiXHJcbnJlcXVpcmUoJy4uL3NyYy9tYW5hZ2Vycy9JbnB1dC5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoJy4uL3NyYy9tYW5hZ2Vycy9UaW1lci5qcycpOyAvLyAxIEtiXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvdXRpbHMvRXZlbnRUYXJnZXQuanMnKTtcclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==