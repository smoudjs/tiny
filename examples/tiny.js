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
    parentNode = parentNode || document.body;
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
        states = states ||
        {};
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
    renderSession = renderSession;
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


Tiny.VERSION = "1.4.0";
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

Tiny.Graphics.prototype.generateTexture = function(resolution, scaleMode)
{
    resolution = resolution || 1;

    var bounds = this.getBounds();
   
    var canvasBuffer = new Tiny.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);
    
    var texture = Tiny.Texture.fromCanvas(canvasBuffer.canvas, scaleMode);
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

    // update the dirty base textures
    texture.baseTexture.dirty();
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

    // update the dirty base textures
    this.texture.baseTexture.dirty();
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
    
    this.tilingTexture.baseTexture._powerOf2 = true;
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

    this.refresh = true;

    this.view.width = this.width;
    this.view.height = this.height;

    if (Tiny.CanvasMaskManager)
        this.maskManager = new Tiny.CanvasMaskManager();

    this.renderSession = {
        context: this.context,
        maskManager: this.maskManager,
        scaleMode: 0,
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

    this._UID = Tiny._UID++;

    this.premultipliedAlpha = true;

    this.mipmap = false;

    this._dirty = [true, true, true, true];

    if(!source)return;

    if((this.source.complete || this.source.getContext) && this.source.width && this.source.height)
    {
        this.hasLoaded = true;
        this.width = this.source.naturalWidth || this.source.width;
        this.height = this.source.naturalHeight || this.source.height;
        this.dirty();
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

    this._powerOf2 = false;

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

Tiny.BaseTexture.prototype.updateSourceImage = function(newSrc)
{
    this.hasLoaded = false;
    this.source.src = null;
    this.source.src = newSrc;
};

Tiny.BaseTexture.prototype.dirty = function()
{

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
        baseTexture.key = key
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

    this._updateUvs();
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

    this.requiresUpdate = false;

    this._uvs = null;

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
    
    if (this.valid) this._updateUvs();

};

Tiny.Texture.prototype._updateUvs = function()
{
    if(!this._uvs)this._uvs = new Tiny.TextureUvs();

    var frame = this.crop;
    var tw = this.baseTexture.width;
    var th = this.baseTexture.height;
    
    this._uvs.x0 = frame.x / tw;
    this._uvs.y0 = frame.y / th;

    this._uvs.x1 = (frame.x + frame.width) / tw;
    this._uvs.y1 = frame.y / th;

    this._uvs.x2 = (frame.x + frame.width) / tw;
    this._uvs.y2 = (frame.y + frame.height) / th;

    this._uvs.x3 = frame.x / tw;
    this._uvs.y3 = (frame.y + frame.height) / th;
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

Tiny.TextureUvs = function()
{
    this.x0 = 0;
    this.y0 = 0;

    this.x1 = 0;
    this.y1 = 0;

    this.x2 = 0;
    this.y2 = 0;

    this.x3 = 0;
    this.y3 = 0;
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

        _prevTime = now()

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
    },

    isSetTimeOut: function ()
    {
        return _isSetTimeOut;
    },

    isRAF: function ()
    {
        return (_isSetTimeOut === false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9UaW55LmpzIiwid2VicGFjazovLy8uLi9zcmMvVGlueUNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2Rpc3BsYXkvRGlzcGxheU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2Rpc3BsYXkvRGlzcGxheU9iamVjdENvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2Rpc3BsYXkvU3RhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tYW5hZ2Vycy9JbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL21hbmFnZXJzL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL21hbmFnZXJzL09iamVjdENyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tYW5hZ2Vycy9UaW1lci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL21hdGgvQ2lyY2xlLmpzIiwid2VicGFjazovLy8uLi9zcmMvbWF0aC9NYXRoLmpzIiwid2VicGFjazovLy8uLi9zcmMvbWF0aC9NYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tYXRoL1BvaW50LmpzIiwid2VicGFjazovLy8uLi9zcmMvbWF0aC9Qb2x5Z29uLmpzIiwid2VicGFjazovLy8uLi9zcmMvbWF0aC9SZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tYXRoL1JvdW5kZWRSZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9vYmplY3RzL0dyYXBoaWNzLmpzIiwid2VicGFjazovLy8uLi9zcmMvb2JqZWN0cy9TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9vYmplY3RzL1RleHQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9vYmplY3RzL1RpbGluZ1Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3JlbmRlcmVyL0NhbnZhc01hc2tNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uLi9zcmMvcmVuZGVyZXIvQ2FudmFzUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXJlci9DYW52YXNUaW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZW5kZXJlci9HcmFwaGljc1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi9zcmMvdGV4dHVyZXMvQmFzZVRleHR1cmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlLmpzIiwid2VicGFjazovLy8uLi9zcmMvdGV4dHVyZXMvVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3V0aWxzL0NhbnZhc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3V0aWxzL0V2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovLy8uLi9zcmMvdXRpbHMvUkFGLmpzIiwid2VicGFjazovLy8uLi9zcmMvdXRpbHMvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy91dGlscy9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9iYXNlLmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL21pbmkuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhbmRhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQjs7Ozs7Ozs7Ozs7O0FDMURBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2xPQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esd0ZBQXdGOztBQUV4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELG1EOzs7Ozs7Ozs7Ozs7QUMzVkE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLDBCQUEwQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDL1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDOUJBLGVBQWUsT0FBUztBQUN4Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIseUJBQXlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxvREFBb0QsUUFBUTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdEOztBQUVoRCx5Q0FBeUMseUJBQXlCOztBQUVsRTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QseUJBQXlCO0FBQzdFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQzVMQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQzVEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNsSEE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQzVUQTs7QUFFQTtBQUNBLGdEQUFnRCxrQkFBa0I7QUFDbEU7QUFDQSxRQUFROztBQUVSO0FBQ0EsZ0RBQWdELGtCQUFrQjtBQUNsRTtBQUNBLFFBQVE7O0FBRVI7QUFDQSxnREFBZ0Qsa0JBQWtCO0FBQ2xFO0FBQ0EsUUFBUTs7QUFFUjtBQUNBLGdEQUFnRCxrQkFBa0I7QUFDbEU7QUFDQSxRQUFROztBQUVSO0FBQ0EsZ0RBQWdELGtCQUFrQjtBQUNsRTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUEsMEJBQTBCLHNCQUFzQjtBQUNoRDtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUEsOENBQThDLFdBQVc7O0FBRXpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUEsOENBQThDLFdBQVc7O0FBRXpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUEsOENBQThDLFdBQVc7O0FBRXpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUEsNkNBQTZDLGFBQWE7O0FBRTFEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBLDhDQUE4QyxXQUFXO0FBQ3pELDZDQUE2QyxXQUFXOztBQUV4RDs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBLDhDQUE4QyxXQUFXO0FBQ3pELDZDQUE2QyxXQUFXOztBQUV4RDs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBLDhDQUE4QyxXQUFXO0FBQ3pELDZDQUE2QyxXQUFXOztBQUV4RDs7QUFFQTs7QUFFQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7O0FBRUEsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNEQUFzRCxTQUFTO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQXNELFNBQVM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBOztBQUVBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUEscURBQXFELG9CQUFvQjtBQUN6RSxxREFBcUQsb0JBQW9CO0FBQ3pFLGtEQUFrRCxpQkFBaUI7O0FBRW5FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDBCQUEwQixZQUFZOztBQUV0QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1COztBQUVuQixRQUFROztBQUVSOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjtBQUNBO0FBQ0EsUUFBUTs7QUFFUjs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUEsNENBQTRDLFNBQVM7O0FBRXJEOztBQUVBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQSxRQUFROztBQUVSOztBQUVBLDZDQUE2QyxVQUFVOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQy9sQkE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdDOzs7Ozs7Ozs7OztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSw0Q0FBNEMsYUFBYTs7QUFFekQsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLGNBQWM7QUFDdEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnREFBZ0QsU0FBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtEQUFrRCxTQUFTO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3ZMRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBLDBDQUEwQyxPQUFPOztBQUVqRDtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBO0FBQ0E7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFROztBQUVSOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQSxRQUFROztBQUVSOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQSxRQUFROzs7QUFHUjs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBOztBQUVBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSTs7QUFFSjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSw4Q0FBOEMsZUFBZTs7QUFFN0Q7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTs7QUFFQSxxRDs7Ozs7Ozs7Ozs7QUN4aEJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0U7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0NBQStDLHVCQUF1Qjs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1CQUFtQixlQUFlO0FBQ2xDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsOEJBQThCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLG1CQUFtQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7OztBQzEyQkQ7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQzNVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtGOzs7Ozs7Ozs7OztBQ3JZQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0IsaUJBQWlCLE9BQU87QUFDeEIsa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRTs7Ozs7Ozs7Ozs7O0FDdFhBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQSxDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxnREFBZ0QsMEJBQTBCOztBQUUxRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEM7QUFDQSw0Q0FBNEMsbUJBQW1COztBQUUvRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2pJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDdkxBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsa0NBQWtDO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx5QkFBeUIscUJBQXFCO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHlCQUF5QixxQkFBcUI7QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGtDQUFrQztBQUNyRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ25WQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2xIQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUN2TEE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDM0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVEQUF1RCxvQkFBb0I7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixZQUFZO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QiwyQkFBMkI7O0FBRWxEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDekpBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3Q0FBd0MseUJBQXlCO0FBQ2pFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixxREFBcUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFOzs7Ozs7Ozs7OztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVILEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IscUJBQXFCOztBQUV2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUEsZ0VBQWdFLHNCQUFzQjtBQUN0RjtBQUNBOztBQUVBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7O0FBRUEsa0VBQWtFLHNCQUFzQjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLG9COzs7Ozs7Ozs7Ozs7QUNoOEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNUQSxtQkFBTyxDQUFDLDBEQUEwQjs7QUFFbEMsY0FBYyxtQkFBTyxDQUFDLHNDQUFnQjs7QUFFdEMsbUJBQU8sQ0FBQyxrREFBc0I7O0FBRTlCLG1CQUFPLENBQUMsMENBQWtCO0FBQzFCLG1CQUFPLENBQUMsZ0RBQXFCLEVBQUU7QUFDL0IsbUJBQU8sQ0FBQyxrREFBc0IsRUFBRTtBQUNoQyxtQkFBTyxDQUFDLG9EQUF1QixFQUFFO0FBQ2pDLG1CQUFPLENBQUMsMERBQTBCLEVBQUU7O0FBRXBDLG1CQUFPLENBQUMsd0VBQWlDLEVBQUU7QUFDM0MsbUJBQU8sQ0FBQywwRkFBMEMsRUFBRTtBQUNwRCxtQkFBTyxDQUFDLHdEQUF5QixFQUFFOztBQUVuQyxtQkFBTyxDQUFDLDRFQUFtQyxFQUFFLFE7Ozs7Ozs7Ozs7O0FDaEI3QyxtQkFBTyxDQUFDLG9DQUFlOzs7QUFHdkIsbUJBQU8sQ0FBQyx3RUFBaUMsRUFBRTtBQUMzQyxtQkFBTyxDQUFDLHNEQUF3QixFQUFFO0FBQ2xDLG1CQUFPLENBQUMsb0RBQXVCLEVBQUU7O0FBRWpDLG1CQUFPLENBQUMsZ0ZBQXFDLEVBQUU7O0FBRS9DLG1CQUFPLENBQUMsOERBQTRCLEVBQUU7QUFDdEMsbUJBQU8sQ0FBQyxzRUFBZ0MsRUFBRTs7QUFFMUMsbUJBQU8sQ0FBQywwRUFBa0MsRUFBRTs7QUFFNUMsbUJBQU8sQ0FBQyxrRUFBOEIsRUFBRTtBQUN4QyxtQkFBTyxDQUFDLGtGQUFzQyxFQUFFO0FBQ2hELG1CQUFPLENBQUMsd0VBQWlDLEVBQUU7OztBQUczQyxtQkFBTyxDQUFDLG9EQUF1Qjs7Ozs7Ozs7Ozs7O0FDbkIvQixtQkFBTyxDQUFDLDRCQUFXOzs7QUFHbkIsbUJBQU8sQ0FBQyxnREFBcUIsRUFBRTs7QUFFL0IsbUJBQU8sQ0FBQyxzRUFBZ0MsRUFBRTtBQUMxQyxtQkFBTyxDQUFDLDhEQUE0QixFQUFFOztBQUV0QyxtQkFBTyxDQUFDLDBEQUEwQixFQUFFO0FBQ3BDLG1CQUFPLENBQUMsc0RBQXdCLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0FDVGxDLG1CQUFPLENBQUMsNEJBQVc7O0FBRW5CLG1CQUFPLENBQUMsMEVBQWtDLEVBQUU7QUFDNUMsbUJBQU8sQ0FBQyw0REFBMkIsRUFBRTtBQUNyQyxtQkFBTyxDQUFDLDBEQUEwQixFQUFFO0FBQ3BDLG1CQUFPLENBQUMsMERBQTBCLEVBQUU7O0FBRXBDLG1CQUFPLENBQUMsZ0VBQTZCIiwiZmlsZSI6InRpbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsInZhciBUaW55ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgcGFyZW50Tm9kZSwgZW5hYmxlUkFGLCBzdGF0ZXMpXHJcbntcclxuICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICB0aGlzLl9wcmVib290KHdpZHRoLCBoZWlnaHQsIGVuYWJsZVJBRiwgc3RhdGVzKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRpbnkuQ2FudmFzUmVuZGVyZXIodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsXHJcbiAgICB7XHJcbiAgICAgICAgYXV0b1Jlc2l6ZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmNhbnZhcyA9IHRoaXMuaW5wdXRWaWV3ID0gdGhpcy5yZW5kZXJlci52aWV3O1xyXG5cclxuICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodmlldyk7XHJcbiAgICB2aWV3LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHJcbiAgICB2aWV3LnN0eWxlLnRvcCA9IFwiMHB4XCI7XHJcbiAgICB2aWV3LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG5cclxuICAgIHZpZXcuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJzAlIDAlJztcclxuICAgIHZpZXcuc3R5bGUucGVyc3BlY3RpdmUgPSAnMTAwMHB4JztcclxuXHJcbiAgICB0aGlzLl9ib290KCk7XHJcbn1cclxuXHJcblRpbnkucHJvdG90eXBlLl9wcmVsb2FkID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLnByZWxvYWQuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcbiAgICB0aGlzLnN0YXRlID0gMTtcclxuXHJcbiAgICBpZiAoVGlueS5Mb2FkZXIpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZC5zdGFydCh0aGlzLl9jcmVhdGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9jcmVhdGUoKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkucHJvdG90eXBlLnNldFBpeGVsUmF0aW8gPSBmdW5jdGlvbihkcHIpXHJcbntcclxuICAgIHRoaXMucmVuZGVyZXIucmVzb2x1dGlvbiA9IGRwcjtcclxufTtcclxuXHJcblRpbnkucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc3RhZ2UpO1xyXG59O1xyXG5cclxuVGlueS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgc2NhbGUpXHJcbntcclxuICAgIHRoaXMuX3Jlc2l6ZSh3aWR0aCwgaGVpZ2h0LCBzY2FsZSk7XHJcbn07XHJcblxyXG5UaW55LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLl9kZXN0cm95KCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRpbnk7IiwiXHJcbnZhciBfdHdlZW5fZW5hYmxlZCA9IGZhbHNlO1xyXG5cclxudmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxudmFyIENPTU1PTiA9IHtcclxuXHJcbiAgICBfcHJlYm9vdDogZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgZW5hYmxlUkFGLCBzdGF0ZXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNzIwO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA0MzA7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tDb250ZXh0ID0gdGhpcztcclxuICAgICAgICBzdGF0ZXMgPSBzdGF0ZXMgfHxcclxuICAgICAgICB7fTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgICAgICB0aGlzLnByZWxvYWQgPSB0aGlzLnByZWxvYWQgfHwgc3RhdGVzLnByZWxvYWQgfHwgbm9vcDtcclxuICAgICAgICB0aGlzLmNyZWF0ZSA9IHRoaXMuY3JlYXRlIHx8IHN0YXRlcy5jcmVhdGUgfHwgbm9vcDtcclxuICAgICAgICB0aGlzLnVwZGF0ZSA9IHRoaXMudXBkYXRlIHx8IHN0YXRlcy51cGRhdGUgfHwgbm9vcDtcclxuICAgICAgICB0aGlzLl9yZXNpemVfY2IgPSB0aGlzLl9yZXNpemVfY2IgfHwgc3RhdGVzLnJlc2l6ZSB8fCBub29wO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lfY2IgPSB0aGlzLl9kZXN0cm95X2NiIHx8IHN0YXRlcy5kZXN0cm95IHx8IG5vb3A7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgVGlueS5TdGFnZSh0aGlzKTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LlRXRUVOID09IFwib2JqZWN0XCIpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3R3ZWVuX2VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmFmID0gZW5hYmxlUkFGICYmIFRpbnkuUkFGO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy50aW1lID0ge1xyXG4gICAgICAgICAgICB0aW1lVG9DYWxsOiAxNVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhdXNlRHVyYXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMudHdlZW5zID0gW107XHJcbiAgICB9LFxyXG5cclxuICAgIF9ib290OiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKFRpbnkuTG9hZGVyKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZCA9IG5ldyBUaW55LkxvYWRlcih0aGlzKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFRpbnkuT2JqZWN0Q3JlYXRvcikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFkZCA9IG5ldyBUaW55Lk9iamVjdENyZWF0b3IodGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChUaW55LklucHV0KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBuZXcgVGlueS5JbnB1dCh0aGlzKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFRpbnkuVGltZXJDcmVhdG9yKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBuZXcgVGlueS5UaW1lckNyZWF0b3IodGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChUaW55LlBhcnRpY2xlcykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IG5ldyBUaW55LlBhcnRpY2xlcyh0aGlzKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3JhZikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZiA9IG5ldyBUaW55LlJBRih0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRpbnkuZGVmYXVsdFJlbmRlcmVyID0gdGhpcy5yZW5kZXJlclxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi5fcHJlbG9hZCgpXHJcbiAgICAgICAgfSwgMClcclxuICAgIH0sXHJcblxyXG4gICAgX3Jlc2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgc2NhbGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IHRoaXMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZV9jYi5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgc2NhbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2NyZWF0ZTogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmFmKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFmLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0gMjtcclxuICAgIH0sXHJcblxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMucGF1c2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF90d2Vlbl9lbmFibGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR3ZWVucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgaW4gVFdFRU4uX3R3ZWVucylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR3ZWVucy5wdXNoKFRXRUVOLl90d2VlbnNba10pO1xyXG4gICAgICAgICAgICAgICAgICAgIFRXRUVOLl90d2VlbnNba10ucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIHJlc3VtZTogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnBhdXNlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfdHdlZW5fZW5hYmxlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50d2VlbnMuZm9yRWFjaChmdW5jdGlvbih0d2VlbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0d2Vlbi5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50d2VlbnMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGU6IGZ1bmN0aW9uKHRpbWUsIGRlbHRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5wYXVzZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZS5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aW1lLCBkZWx0YSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX3R3ZWVuX2VuYWJsZWQpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUV0VFTi51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXJzKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcnMuZm9yRWFjaChmdW5jdGlvbihlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGUudXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UudXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0aWNsZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZUR1cmF0aW9uICs9IGRlbHRhXHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UudXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZiAoVGlueS5JbnB1dCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfdHdlZW5fZW5hYmxlZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUV0VFTi5yZW1vdmVBbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVycykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciB5IGluIFRpbnkuVGV4dHVyZUNhY2hlKSBUaW55LlRleHR1cmVDYWNoZVt5XS5kZXN0cm95KHRydWUpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciB5IGluIFRpbnkuQmFzZVRleHR1cmVDYWNoZSkgVGlueS5CYXNlVGV4dHVyZUNhY2hlW3ldLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgVGlueS5CYXNlVGV4dHVyZUNhY2hlID0gW107XHJcbiAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGUgPSBbXTtcclxuICAgICAgICB0aGlzLnN0YWdlLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmRlc3Ryb3kodHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yYWYpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWYuc3RvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGVzdHJveV9jYi5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkNPTU1PTi5zdG9wID0gQ09NTU9OLnBhdXNlO1xyXG5DT01NT04ucGxheSA9IENPTU1PTi5yZXN1bWU7XHJcbkNPTU1PTi5zZXRTaXplID0gQ09NTU9OLnJlc2l6ZTtcclxuXHJcbmZvciAodmFyIGtleSBpbiBDT01NT04pIFxyXG57XHJcbiAgICBUaW55LnByb3RvdHlwZVtrZXldID0gQ09NTU9OW2tleV07XHJcbn0iLCJcclxudmFyIHBpMiA9IE1hdGguUEkgKiAyO1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFRpbnkuUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnNjYWxlID0gbmV3IFRpbnkuUG9pbnQoMSwgMSk7XHJcbiAgICB0aGlzLnBpdm90ID0gbmV3IFRpbnkuUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgIHRoaXMuYWxwaGEgPSAxO1xyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuaGl0QXJlYSA9IG51bGw7XHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMuc3RhZ2UgPSBudWxsO1xyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuICAgIHRoaXMuX3NyID0gMDtcclxuICAgIHRoaXMuX2NyID0gMTtcclxuICAgIHRoaXMuX2JvdW5kcyA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFzayA9IG51bGw7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcbiAgICB0aGlzLl9jYWNoZUlzRGlydHkgPSBmYWxzZTtcclxuICAgIHRoaXMuaW5wdXQgPSBudWxsXHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSwgJ2lucHV0RW5hYmxlZCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmVuYWJsZWQpXHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB7ZW5hYmxlZDogdHJ1ZSwgcGFyZW50OiB0aGlzfVxyXG4gICAgICAgICAgICAgICAgVGlueS5FdmVudFRhcmdldC5taXhpbih0aGlzLmlucHV0KVxyXG4gICAgICAgICAgICB9IGVsc2UgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmVuYWJsZWQgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCAhPT0gbnVsbCAmJiAodGhpcy5pbnB1dC5lbmFibGVkID0gZmFsc2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5EaXNwbGF5T2JqZWN0O1xyXG5cclxuXHJcblRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGktLSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhcmVudClcclxuICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCggdGhpcyApXHJcblxyXG4gICAgdGhpcy5oaXRBcmVhID0gbnVsbDtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMuc3RhZ2UgPSBudWxsO1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG51bGw7XHJcbiAgICB0aGlzLl9ib3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXNrID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLCAnd29ybGRWaXNpYmxlJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBpdGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgZG9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghaXRlbS52aXNpYmxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUoaXRlbSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSwgJ21hc2snLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFzaztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaykgdGhpcy5fbWFzay5pc01hc2sgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFzayA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFzaykgdGhpcy5fbWFzay5pc01hc2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSwgJ2NhY2hlQXNCaXRtYXAnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX2NhY2hlQXNCaXRtYXA7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXAgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIHNvbWUgbWF0cml4IHJlZnMgZm9yIGVhc3kgYWNjZXNzXHJcbiAgICB2YXIgcHQgPSB0aGlzLnBhcmVudC53b3JsZFRyYW5zZm9ybTtcclxuICAgIHZhciB3dCA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgLy8gdGVtcG9yYXJ5IG1hdHJpeCB2YXJpYWJsZXNcclxuICAgIHZhciBhLCBiLCBjLCBkLCB0eCwgdHk7XHJcblxyXG4gICAgLy8gc28gaWYgcm90YXRpb24gaXMgYmV0d2VlbiAwIHRoZW4gd2UgY2FuIHNpbXBsaWZ5IHRoZSBtdWx0aXBsaWNhdGlvbiBwcm9jZXNzLi5cclxuICAgIGlmICh0aGlzLnJvdGF0aW9uICUgcGkyKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgcm90YXRpb24gaXMgdGhlIHNhbWUgYXMgdGhlIHByZXZpb3VzIHJlbmRlci4gVGhpcyBtZWFucyB3ZSBvbmx5IG5lZWQgdG8gdXNlIHNpbiBhbmQgY29zIHdoZW4gcm90YXRpb24gYWN0dWFsbHkgY2hhbmdlc1xyXG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uICE9PSB0aGlzLnJvdGF0aW9uQ2FjaGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uQ2FjaGUgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9zciA9IE1hdGguc2luKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9jciA9IE1hdGguY29zKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtYXRyaXggdmFsdWVzIG9mIHRoZSBkaXNwbGF5b2JqZWN0IGJhc2VkIG9uIGl0cyB0cmFuc2Zvcm0gcHJvcGVydGllcy4uXHJcbiAgICAgICAgYSAgPSAgdGhpcy5fY3IgKiB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgYiAgPSAgdGhpcy5fc3IgKiB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgYyAgPSAtdGhpcy5fc3IgKiB0aGlzLnNjYWxlLnk7XHJcbiAgICAgICAgZCAgPSAgdGhpcy5fY3IgKiB0aGlzLnNjYWxlLnk7XHJcbiAgICAgICAgdHggPSAgdGhpcy5wb3NpdGlvbi54O1xyXG4gICAgICAgIHR5ID0gIHRoaXMucG9zaXRpb24ueTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjaGVjayBmb3IgcGl2b3QuLiBub3Qgb2Z0ZW4gdXNlZCBzbyBnZWFyZWQgdG93YXJkcyB0aGF0IGZhY3QhXHJcbiAgICAgICAgaWYgKHRoaXMucGl2b3QueCB8fCB0aGlzLnBpdm90LnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eCAtPSB0aGlzLnBpdm90LnggKiBhICsgdGhpcy5waXZvdC55ICogYztcclxuICAgICAgICAgICAgdHkgLT0gdGhpcy5waXZvdC54ICogYiArIHRoaXMucGl2b3QueSAqIGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25jYXQgdGhlIHBhcmVudCBtYXRyaXggd2l0aCB0aGUgb2JqZWN0cyB0cmFuc2Zvcm0uXHJcbiAgICAgICAgd3QuYSAgPSBhICAqIHB0LmEgKyBiICAqIHB0LmM7XHJcbiAgICAgICAgd3QuYiAgPSBhICAqIHB0LmIgKyBiICAqIHB0LmQ7XHJcbiAgICAgICAgd3QuYyAgPSBjICAqIHB0LmEgKyBkICAqIHB0LmM7XHJcbiAgICAgICAgd3QuZCAgPSBjICAqIHB0LmIgKyBkICAqIHB0LmQ7XHJcbiAgICAgICAgd3QudHggPSB0eCAqIHB0LmEgKyB0eSAqIHB0LmMgKyBwdC50eDtcclxuICAgICAgICB3dC50eSA9IHR4ICogcHQuYiArIHR5ICogcHQuZCArIHB0LnR5O1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldHMgZG8gdGhlIGZhc3QgdmVyc2lvbiBhcyB3ZSBrbm93IHRoZXJlIGlzIG5vIHJvdGF0aW9uLi5cclxuICAgICAgICBhICA9IHRoaXMuc2NhbGUueDtcclxuICAgICAgICBkICA9IHRoaXMuc2NhbGUueTtcclxuXHJcbiAgICAgICAgdHggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnBpdm90LnggKiBhO1xyXG4gICAgICAgIHR5ID0gdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5waXZvdC55ICogZDtcclxuXHJcbiAgICAgICAgd3QuYSAgPSBhICAqIHB0LmE7XHJcbiAgICAgICAgd3QuYiAgPSBhICAqIHB0LmI7XHJcbiAgICAgICAgd3QuYyAgPSBkICAqIHB0LmM7XHJcbiAgICAgICAgd3QuZCAgPSBkICAqIHB0LmQ7XHJcbiAgICAgICAgd3QudHggPSB0eCAqIHB0LmEgKyB0eSAqIHB0LmMgKyBwdC50eDtcclxuICAgICAgICB3dC50eSA9IHR4ICogcHQuYiArIHR5ICogcHQuZCArIHB0LnR5O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG11bHRpcGx5IHRoZSBhbHBoYXMuLlxyXG4gICAgdGhpcy53b3JsZEFscGhhID0gdGhpcy5hbHBoYSAqIHRoaXMucGFyZW50LndvcmxkQWxwaGE7XHJcblxyXG59O1xyXG5cclxuLy8gcGVyZm9ybWFuY2UgaW5jcmVhc2UgdG8gYXZvaWQgdXNpbmcgY2FsbC4uICgxMHggZmFzdGVyKVxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0gPSBUaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obWF0cml4KVxyXG57XHJcbiAgICBtYXRyaXggPSBtYXRyaXg7Ly9qdXN0IHRvIGdldCBwYXNzZWQganMgaGludGluZyAoYW5kIHByZXNlcnZlIGluaGVyaXRhbmNlKVxyXG4gICAgcmV0dXJuIFRpbnkuRW1wdHlSZWN0YW5nbGU7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5nZXRCb3VuZHMoVGlueS5pZGVudGl0eU1hdHJpeCk7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnNldFN0YWdlUmVmZXJlbmNlID0gZnVuY3Rpb24oc3RhZ2UpXHJcbntcclxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUucHJlVXBkYXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmdlbmVyYXRlVGV4dHVyZSA9IGZ1bmN0aW9uKHJlc29sdXRpb24sIHJlbmRlcmVyKVxyXG57XHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIHZhciByZW5kZXJUZXh0dXJlID0gbmV3IFRpbnkuUmVuZGVyVGV4dHVyZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCwgcmVuZGVyZXIsIHJlc29sdXRpb24pO1xyXG4gICAgXHJcbiAgICBUaW55LkRpc3BsYXlPYmplY3QuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkRpc3BsYXlPYmplY3QuX3RlbXBNYXRyaXgudHkgPSAtYm91bmRzLnk7XHJcbiAgICBcclxuICAgIHJlbmRlclRleHR1cmUucmVuZGVyKHRoaXMsIFRpbnkuRGlzcGxheU9iamVjdC5fdGVtcE1hdHJpeCk7XHJcblxyXG4gICAgcmV0dXJuIHJlbmRlclRleHR1cmU7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnVwZGF0ZUNhY2hlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG59O1xyXG5cclxuXHJcblRpbnkuRGlzcGxheU9iamVjdC5wcm90b3R5cGUudG9HbG9iYWwgPSBmdW5jdGlvbihwb3NpdGlvbilcclxue1xyXG4gICAgLy8gZG9uJ3QgbmVlZCB0byB1W2RhdGUgdGhlIGxvdFxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICByZXR1cm4gdGhpcy53b3JsZFRyYW5zZm9ybS5hcHBseShwb3NpdGlvbik7XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnRvTG9jYWwgPSBmdW5jdGlvbihwb3NpdGlvbiwgZnJvbSlcclxue1xyXG4gICAgaWYgKGZyb20pXHJcbiAgICB7XHJcbiAgICAgICAgcG9zaXRpb24gPSBmcm9tLnRvR2xvYmFsKHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkb24ndCBuZWVkIHRvIHVbZGF0ZSB0aGUgbG90XHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy53b3JsZFRyYW5zZm9ybS5hcHBseUludmVyc2UocG9zaXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fcmVuZGVyQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLl9yZW5kZXJDYW52YXMuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsIHJlbmRlclNlc3Npb24pO1xyXG4gICAgXHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbnVsbFxyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwKTsvLywgcmVuZGVyU2Vzc2lvbi5yZW5kZXJlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG5ldyBUaW55LlNwcml0ZShyZW5kZXJUZXh0dXJlKTtcclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUud29ybGRUcmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlc2l6ZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFRpbnkuRGlzcGxheU9iamVjdC5fdGVtcE1hdHJpeC50eCA9IC1ib3VuZHMueDtcclxuICAgIFRpbnkuRGlzcGxheU9iamVjdC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuICAgIFxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUucmVuZGVyKHRoaXMsIFRpbnkuRGlzcGxheU9iamVjdC5fdGVtcE1hdHJpeCwgdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci54ID0gLSggYm91bmRzLnggLyBib3VuZHMud2lkdGggKTtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueSA9IC0oIGJvdW5kcy55IC8gYm91bmRzLmhlaWdodCApO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fZGVzdHJveUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5kZXN0cm95KHRydWUpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbn07XHJcblxyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgcmVuZGVyU2Vzc2lvbiA9IHJlbmRlclNlc3Npb247XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSwgJ3gnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMucG9zaXRpb24ueDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSwgJ3knLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMucG9zaXRpb24ueTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3QuX3RlbXBNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTsiLCJcclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBUaW55LkRpc3BsYXlPYmplY3QuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICBcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlICk7XHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkRpc3BsYXlPYmplY3RDb250YWluZXI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDtcclxuXHJcbiAgICAgICAgaWYod2lkdGggIT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5zY2FsZS55ICogdGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGhlaWdodCAhPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gaGVpZ2h0IDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS55ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmFkZENoaWxkQXQoY2hpbGQsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoKTtcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuYWRkQ2hpbGRBdCA9IGZ1bmN0aW9uKGNoaWxkLCBpbmRleClcclxue1xyXG4gICAgaWYoaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLmNoaWxkcmVuLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICBpZihjaGlsZC5wYXJlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgY2hpbGQuZ2FtZSA9IHRoaXMuZ2FtZTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zdGFnZSljaGlsZC5zZXRTdGFnZVJlZmVyZW5jZSh0aGlzLnN0YWdlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihjaGlsZCArICdhZGRDaGlsZEF0OiBUaGUgaW5kZXggJysgaW5kZXggKycgc3VwcGxpZWQgaXMgb3V0IG9mIGJvdW5kcyAnICsgdGhpcy5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5zd2FwQ2hpbGRyZW4gPSBmdW5jdGlvbihjaGlsZCwgY2hpbGQyKVxyXG57XHJcbiAgICBpZihjaGlsZCA9PT0gY2hpbGQyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbmRleDEgPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xyXG4gICAgdmFyIGluZGV4MiA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZDIpO1xyXG5cclxuICAgIGlmKGluZGV4MSA8IDAgfHwgaW5kZXgyIDwgMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc3dhcENoaWxkcmVuOiBCb3RoIHRoZSBzdXBwbGllZCBEaXNwbGF5T2JqZWN0cyBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlci4nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuW2luZGV4MV0gPSBjaGlsZDI7XHJcbiAgICB0aGlzLmNoaWxkcmVuW2luZGV4Ml0gPSBjaGlsZDtcclxuXHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmdldENoaWxkSW5kZXggPSBmdW5jdGlvbihjaGlsZClcclxue1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc3VwcGxpZWQgRGlzcGxheU9iamVjdCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlcicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5zZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24oY2hpbGQsIGluZGV4KVxyXG57XHJcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHN1cHBsaWVkIGluZGV4IGlzIG91dCBvZiBib3VuZHMnKTtcclxuICAgIH1cclxuICAgIHZhciBjdXJyZW50SW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoY3VycmVudEluZGV4LCAxKTsgLy9yZW1vdmUgZnJvbSBvbGQgcG9zaXRpb25cclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7IC8vYWRkIGF0IG5ldyBwb3NpdGlvblxyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRDaGlsZEF0ID0gZnVuY3Rpb24oaW5kZXgpXHJcbntcclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRDaGlsZEF0OiBTdXBwbGllZCBpbmRleCAnKyBpbmRleCArJyBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdCwgb3IgdGhlIHN1cHBsaWVkIERpc3BsYXlPYmplY3QgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXInKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2luZGV4XTtcclxuICAgIFxyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKVxyXG57XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoIGNoaWxkICk7XHJcbiAgICBpZihpbmRleCA9PT0gLTEpcmV0dXJuO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVDaGlsZEF0KCBpbmRleCApO1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0ID0gZnVuY3Rpb24oaW5kZXgpXHJcbntcclxuICAgIHZhciBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRBdCggaW5kZXggKTtcclxuICAgIGlmKHRoaXMuc3RhZ2UpXHJcbiAgICAgICAgY2hpbGQucmVtb3ZlU3RhZ2VSZWZlcmVuY2UoKTtcclxuXHJcbiAgICBjaGlsZC5wYXJlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSggaW5kZXgsIDEgKTtcclxuICAgIHJldHVybiBjaGlsZDtcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ2hpbGRyZW4gPSBmdW5jdGlvbihiZWdpbkluZGV4LCBlbmRJbmRleClcclxue1xyXG4gICAgdmFyIGJlZ2luID0gYmVnaW5JbmRleCB8fCAwO1xyXG4gICAgdmFyIGVuZCA9IHR5cGVvZiBlbmRJbmRleCA9PT0gJ251bWJlcicgPyBlbmRJbmRleCA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgdmFyIHJhbmdlID0gZW5kIC0gYmVnaW47XHJcblxyXG4gICAgaWYgKHJhbmdlID4gMCAmJiByYW5nZSA8PSBlbmQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlbW92ZWQgPSB0aGlzLmNoaWxkcmVuLnNwbGljZShiZWdpbiwgcmFuZ2UpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3ZlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSByZW1vdmVkW2ldO1xyXG4gICAgICAgICAgICBpZih0aGlzLnN0YWdlKVxyXG4gICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlU3RhZ2VSZWZlcmVuY2UoKTtcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJhbmdlID09PSAwICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdyZW1vdmVDaGlsZHJlbjogUmFuZ2UgRXJyb3IsIG51bWVyaWMgdmFsdWVzIGFyZSBvdXRzaWRlIHRoZSBhY2NlcHRhYmxlIHJhbmdlJyApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKCF0aGlzLnZpc2libGUpcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIGlmKHRoaXMuX2NhY2hlQXNCaXRtYXApcmV0dXJuO1xyXG5cclxuICAgIGZvcih2YXIgaT0wLGo9dGhpcy5jaGlsZHJlbi5sZW5ndGg7IGk8ajsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBwZXJmb3JtYW5jZSBpbmNyZWFzZSB0byBhdm9pZCB1c2luZyBjYWxsLi4gKDEweCBmYXN0ZXIpXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZGlzcGxheU9iamVjdENvbnRhaW5lclVwZGF0ZVRyYW5zZm9ybSA9IFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKXJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG4gICAgaWYgKHRoaXMuX2NhY2hlZFNwcml0ZSkgcmV0dXJuIHRoaXMuX2NhY2hlZFNwcml0ZS5nZXRCb3VuZHMoKVxyXG5cclxuICAgIC8vIFRPRE8gdGhlIGJvdW5kcyBoYXZlIGFscmVhZHkgYmVlbiBjYWxjdWxhdGVkIHRoaXMgcmVuZGVyIHNlc3Npb24gc28gcmV0dXJuIHdoYXQgd2UgaGF2ZVxyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIHZhciBtYXhYID0gLUluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIGNoaWxkQm91bmRzO1xyXG4gICAgdmFyIGNoaWxkTWF4WDtcclxuICAgIHZhciBjaGlsZE1heFk7XHJcblxyXG4gICAgdmFyIGNoaWxkVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIGZvcih2YXIgaT0wLGo9dGhpcy5jaGlsZHJlbi5sZW5ndGg7IGk8ajsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIWNoaWxkLnZpc2libGUpY29udGludWU7XHJcblxyXG4gICAgICAgIGNoaWxkVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNoaWxkQm91bmRzID0gdGhpcy5jaGlsZHJlbltpXS5nZXRCb3VuZHMoKTtcclxuICAgICBcclxuICAgICAgICBtaW5YID0gbWluWCA8IGNoaWxkQm91bmRzLnggPyBtaW5YIDogY2hpbGRCb3VuZHMueDtcclxuICAgICAgICBtaW5ZID0gbWluWSA8IGNoaWxkQm91bmRzLnkgPyBtaW5ZIDogY2hpbGRCb3VuZHMueTtcclxuXHJcbiAgICAgICAgY2hpbGRNYXhYID0gY2hpbGRCb3VuZHMud2lkdGggKyBjaGlsZEJvdW5kcy54O1xyXG4gICAgICAgIGNoaWxkTWF4WSA9IGNoaWxkQm91bmRzLmhlaWdodCArIGNoaWxkQm91bmRzLnk7XHJcblxyXG4gICAgICAgIG1heFggPSBtYXhYID4gY2hpbGRNYXhYID8gbWF4WCA6IGNoaWxkTWF4WDtcclxuICAgICAgICBtYXhZID0gbWF4WSA+IGNoaWxkTWF4WSA/IG1heFkgOiBjaGlsZE1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIWNoaWxkVmlzaWJsZSlcclxuICAgICAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIFRPRE86IHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICAvL3RoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcbiAgIFxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0TG9jYWxCb3VuZHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBtYXRyaXhDYWNoZSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IFRpbnkuaWRlbnRpdHlNYXRyaXg7XHJcblxyXG4gICAgZm9yKHZhciBpPTAsaj10aGlzLmNoaWxkcmVuLmxlbmd0aDsgaTxqOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbWF0cml4Q2FjaGU7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuc2V0U3RhZ2VSZWZlcmVuY2UgPSBmdW5jdGlvbihzdGFnZSlcclxue1xyXG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG4gICAgXHJcbiAgICBmb3IgKHZhciBpPTA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0uc2V0U3RhZ2VSZWZlcmVuY2Uoc3RhZ2UpXHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnJlbW92ZVN0YWdlUmVmZXJlbmNlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW1vdmVTdGFnZVJlZmVyZW5jZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhZ2UgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNhY2hlZFNwcml0ZShyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5fcmVuZGVyQ2FudmFzKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTsiLCJUaW55LlN0YWdlID0gZnVuY3Rpb24oZ2FtZSlcclxue1xyXG4gICAgVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNhbGwoIHRoaXMgKTtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWVcclxuICAgIHRoaXMuc3RhZ2UgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKDB4ZmZmZmZmKVxyXG59O1xyXG5cclxuVGlueS5TdGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlICk7XHJcblRpbnkuU3RhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5TdGFnZTtcclxuXHJcblRpbnkuU3RhZ2UucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5UaW55LlN0YWdlLnByb3RvdHlwZS5zZXRCYWNrZ3JvdW5kQ29sb3IgPSBmdW5jdGlvbihiYWNrZ3JvdW5kQ29sb3IpXHJcbntcclxuICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yIHx8IDB4MDAwMDAwO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3JTcGxpdCA9IFRpbnkuaGV4MnJnYih0aGlzLmJhY2tncm91bmRDb2xvcik7XHJcbiAgICB2YXIgaGV4ID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IudG9TdHJpbmcoMTYpO1xyXG4gICAgaGV4ID0gJzAwMDAwMCcuc3Vic3RyKDAsIDYgLSBoZXgubGVuZ3RoKSArIGhleDtcclxuICAgIHRoaXMuYmFja2dyb3VuZENvbG9yU3RyaW5nID0gJyMnICsgaGV4O1xyXG59OyIsIlxyXG5UaW55LlZFUlNJT04gPSBfVkVSU0lPTl87XHJcblRpbnkuX1VJRCA9IDA7XHJcblxyXG5UaW55LlBvbHlnb24gPSBmdW5jdGlvbigpIHt9XHJcblxyXG5UaW55LlByaW1pdGl2ZXMgPSB7XHJcbiAgICBQT0xZOiAwLFxyXG4gICAgUkVDVDogMSwgXHJcbiAgICBDSVJDOiAyLFxyXG4gICAgRUxJUDogMyxcclxuICAgIFJSRUM6IDQsXHJcbiAgICBSUkVDX0xKT0lOOiA1XHJcbn1cclxuXHJcblRpbnkucm5kID0gZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xyXG59O1xyXG5cclxuVGlueS5oZXgycmdiID0gZnVuY3Rpb24oaGV4KSB7XHJcbiAgICByZXR1cm4gWyhoZXggPj4gMTYgJiAweEZGKSAvIDI1NSwgKCBoZXggPj4gOCAmIDB4RkYpIC8gMjU1LCAoaGV4ICYgMHhGRikvIDI1NV07XHJcbn07XHJcblxyXG5UaW55LnJnYjJoZXggPSBmdW5jdGlvbihyZ2IpIHtcclxuICAgIHJldHVybiAoKHJnYlswXSoyNTUgPDwgMTYpICsgKHJnYlsxXSoyNTUgPDwgOCkgKyByZ2JbMl0qMjU1KTtcclxufTtcclxuXHJcblRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28gPSBmdW5jdGlvbihudW1iZXIpXHJcbntcclxuICAgIGlmIChudW1iZXIgPiAwICYmIChudW1iZXIgJiAobnVtYmVyIC0gMSkpID09PSAwKVxyXG4gICAgICAgIHJldHVybiBudW1iZXI7XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IDE7XHJcbiAgICAgICAgd2hpbGUgKHJlc3VsdCA8IG51bWJlcikgcmVzdWx0IDw8PSAxO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LmlzUG93ZXJPZlR3byA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHJldHVybiAod2lkdGggPiAwICYmICh3aWR0aCAmICh3aWR0aCAtIDEpKSA9PT0gMCAmJiBoZWlnaHQgPiAwICYmIChoZWlnaHQgJiAoaGVpZ2h0IC0gMSkpID09PSAwKTtcclxufTtcclxuIiwidmFyIGxhc3RNb3ZlLCBfYWN0aXZlX29iamVjdHMsIGxpc3RlbmluZ1RvVG91Y2hFdmVudHMsIF9sYXN0X2JvdW5kcztcclxudmFyIGdhbWUsIGN1cnJlbnRFbWl0ZXI7XHJcblxyXG5mdW5jdGlvbiB3aW5kb3dUb1VJU3BhY2UoeCwgeSwgaGlzdG9yeSlcclxue1xyXG4gICAgdmFyIGJvdW5kcyA9ICgoaGlzdG9yeSAmJiBfbGFzdF9ib3VuZHMpID8gX2xhc3RfYm91bmRzIDogKF9sYXN0X2JvdW5kcyA9IGdhbWUuaW5wdXRWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBfbGFzdF9ib3VuZHMpKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6ICh4IC0gYm91bmRzLmxlZnQpLFxyXG4gICAgICAgIHk6ICh5IC0gYm91bmRzLnRvcCksXHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBfZ2V0Q29vcmRzKGV2ZW50LCBoaXN0b3J5KVxyXG57XHJcbiAgICB2YXIgY29vcmRzID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT09ICd1bmRlZmluZWQnICYmIGV2ZW50IGluc3RhbmNlb2YgVG91Y2hFdmVudClcclxuICAgIHtcclxuICAgICAgICBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsXHJcbiAgICAgICAgICAgICAgICB5OiBldmVudC50b3VjaGVzWzBdLnBhZ2VZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LnBhZ2VYICYmIGV2ZW50LnBhZ2VZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgeDogZXZlbnQucGFnZVgsXHJcbiAgICAgICAgICAgICAgICB5OiBldmVudC5wYWdlWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIC8vIE1vdXNlIGV2ZW50XHJcbiAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICB4OiBldmVudC5wYWdlWCxcclxuICAgICAgICAgICAgeTogZXZlbnQucGFnZVlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzICYmIGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCB8fCBjb29yZHMgPT09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgIGNvb3JkcyA9IHdpbmRvd1RvVUlTcGFjZShjb29yZHMueCwgY29vcmRzLnksIGhpc3RvcnkpO1xyXG5cclxuICAgIHJldHVybiBjb29yZHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9jaGVja09uQWN0aXZlT2JqZWN0cyhvYmosIHgsIHkpXHJcbntcclxuICAgIGlmIChvYmouaW5wdXRFbmFibGVkICYmIG9iai53b3JsZFZpc2libGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKG9iai5nZXRCb3VuZHMoKS5jb250YWlucyh4LCB5KSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYWN0aXZlX29iamVjdHMucHVzaChvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAob2JqLmNoaWxkcmVuICYmIG9iai5jaGlsZHJlbi5sZW5ndGggPiAwKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgb2JqLmNoaWxkcmVuLmxlbmd0aDsgdCsrKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jaGVja09uQWN0aXZlT2JqZWN0cyhvYmouY2hpbGRyZW5bdF0sIHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5wdXRIYW5kbGVyKG5hbWUsIGV2ZW50LCBoaXN0b3J5KVxyXG57XHJcbiAgICAvLyBjb25zb2xlLmxvZyhuYW1lKVxyXG4gICAgdmFyIGNvb3JkcyA9IF9nZXRDb29yZHMoZXZlbnQsIGhpc3RvcnkpO1xyXG5cclxuICAgIGlmIChjb29yZHMgIT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKG5hbWUgIT0gXCJtb3ZlXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYWN0aXZlX29iamVjdHMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgIF9jaGVja09uQWN0aXZlT2JqZWN0cyhnYW1lLnN0YWdlLCBjb29yZHMueCwgY29vcmRzLnkpXHJcblxyXG4gICAgICAgICAgICAvL3ZhciBpID0gX2FjdGl2ZV9vYmplY3RzLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IF9hY3RpdmVfb2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IF9hY3RpdmVfb2JqZWN0c1tpXVxyXG4gICAgICAgICAgICAgICAgb2JqLmlucHV0W1wibGFzdF9cIiArIG5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQobmFtZSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSBcInVwXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gb2JqLmlucHV0W1wibGFzdF9kb3duXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50ICYmIFRpbnkuTWF0aC5kaXN0YW5jZShwb2ludC54LCBwb2ludC55LCBjb29yZHMueCwgY29vcmRzLnkpIDwgMzApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KFwiY2xpY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmlucHV0LnRyYW5zcGFyZW50KSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBvYmogPSBfYWN0aXZlX29iamVjdHNbaSAtIDFdXHJcbiAgICAgICAgICAgIC8vICAgICBvYmouaW5wdXRbXCJsYXN0X1wiICsgbmFtZV0gPSB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fVxyXG5cclxuICAgICAgICAgICAgLy8gICAgIG9iai5pbnB1dC5lbWl0KG5hbWUsIHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9KVxyXG5cclxuICAgICAgICAgICAgLy8gICAgIGlmIChuYW1lID09IFwidXBcIikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHZhciBwb2ludCA9IG9iai5pbnB1dFtcImxhc3RfZG93blwiXVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChwb2ludCAmJiBUaW55Lk1hdGguZGlzdGFuY2UocG9pbnQueCwgcG9pbnQueSwgY29vcmRzLngsIGNvb3Jkcy55KSA8IDMwKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChcImNsaWNrXCIsIHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9KVxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50RW1pdGVyLmVtaXQobmFtZSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlSGFuZGxlcihldmVudClcclxue1xyXG4gICAgbGFzdE1vdmUgPSBldmVudDtcclxuICAgIGlucHV0SGFuZGxlcihcIm1vdmVcIiwgZXZlbnQsIHRydWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cEhhbmRsZXIoZXZlbnQpXHJcbntcclxuICAgIGN1cnJlbnRFbWl0ZXIuaXNEb3duID0gZmFsc2U7XHJcbiAgICBpbnB1dEhhbmRsZXIoXCJ1cFwiLCBsYXN0TW92ZSwgdHJ1ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvd25IYW5kbGVyKGV2ZW50KVxyXG57XHJcbiAgICBjdXJyZW50RW1pdGVyLmlzRG93biA9IHRydWU7XHJcbiAgICBsYXN0TW92ZSA9IGV2ZW50O1xyXG4gICAgaW5wdXRIYW5kbGVyKFwiZG93blwiLCBldmVudCwgZmFsc2UpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGlja0hhbmRsZXIoZXZlbnQpXHJcbntcclxuICAgIGlucHV0SGFuZGxlcihcImNsaWNrXCIsIGV2ZW50LCBmYWxzZSk7XHJcbn1cclxuXHJcblRpbnkuSW5wdXQgPSBmdW5jdGlvbihwYXJlbnQpXHJcbntcclxuICAgIGdhbWUgPSBnYW1lID0gcGFyZW50O1xyXG4gICAgX2FjdGl2ZV9vYmplY3RzID0gW107XHJcbiAgICBjdXJyZW50RW1pdGVyID0gdGhpcztcclxuXHJcbiAgICBsYXN0TW92ZSA9IG51bGw7XHJcbiAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG5cclxuICAgIHZhciB0ID0gZ2FtZS5pbnB1dFZpZXcuYWRkRXZlbnRMaXN0ZW5lcjtcclxuICAgIHQoJ3RvdWNoc3RhcnQnLCBkb3duSGFuZGxlcik7XHJcbiAgICB0KCd0b3VjaG1vdmUnLCBtb3ZlSGFuZGxlcik7XHJcbiAgICB0KCd0b3VjaGVuZCcsIHVwSGFuZGxlcik7XHJcbiAgICB0KCd0b3VjaGNhbmNlbCcsIHVwSGFuZGxlcik7XHJcblxyXG4gICAgLy8gdCgnY2xpY2snLCBjbGlja0hhbmRsZXIpO1xyXG5cclxuICAgIHQoJ21vdXNlZG93bicsIGRvd25IYW5kbGVyKTtcclxuICAgIHQoJ21vdXNlbW92ZScsIG1vdmVIYW5kbGVyKTtcclxuICAgIHQoJ21vdXNldXAnLCB1cEhhbmRsZXIpO1xyXG5cclxuICAgIFRpbnkuRXZlbnRUYXJnZXQubWl4aW4odGhpcylcclxufTtcclxuXHJcblRpbnkuSW5wdXQucHJvdG90eXBlID0ge1xyXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ID0gZ2FtZS5pbnB1dFZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcclxuICAgICAgICB0KCd0b3VjaHN0YXJ0JywgZG93bkhhbmRsZXIpO1xyXG4gICAgICAgIHQoJ3RvdWNobW92ZScsIG1vdmVIYW5kbGVyKTtcclxuICAgICAgICB0KCd0b3VjaGVuZCcsIHVwSGFuZGxlcik7XHJcbiAgICAgICAgdCgndG91Y2hjYW5jZWwnLCB1cEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyB0KCdjbGljaycsIGNsaWNrSGFuZGxlcik7XHJcblxyXG4gICAgICAgIHQoJ21vdXNlZG93bicsIGRvd25IYW5kbGVyKTtcclxuICAgICAgICB0KCdtb3VzZW1vdmUnLCBtb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgdCgnbW91c2V1cCcsIHVwSGFuZGxlcik7XHJcbiAgICB9XHJcbn07IiwiVGlueS5Mb2FkZXIgPSBmdW5jdGlvbihnYW1lKVxyXG57XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5jYWNoZSA9IFtdO1xyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIubG9hZFNwcml0ZVNoZWV0ID0gZnVuY3Rpb24oa2V5LCBmcmFtZURhdGEpXHJcbntcclxuICAgIHZhciBtYXhfbm9fZnJhbWUgPSAoZnJhbWVEYXRhLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IG1heF9ub19mcmFtZTsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB1dWlkID0ga2V5ICsgXCJfXCIgKyBpO1xyXG5cclxuICAgICAgICBUaW55LlRleHR1cmVDYWNoZVt1dWlkXSA9IG5ldyBUaW55LlRleHR1cmUoVGlueS5CYXNlVGV4dHVyZUNhY2hlW2tleV0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgeDogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ueCksXHJcbiAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLnkpLFxyXG4gICAgICAgICAgICB3aWR0aDogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ud2lkdGgpLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLmhlaWdodCksXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBmcmFtZURhdGFbaV0uZHVyYXRpb25cclxuICAgICAgICB9KTtcclxuICAgICAgICBUaW55LlRleHR1cmVDYWNoZVt1dWlkXS5rZXkgPSBrZXk7XHJcbiAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVbdXVpZF0ubWF4X25vX2ZyYW1lID0gbWF4X25vX2ZyYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXhfbm9fZnJhbWU7XHJcbn1cclxuXHJcblRpbnkuTG9hZGVyLnBhcnNlU3ByaXRlU2hlZXQgPSBmdW5jdGlvbihrZXksIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0LCBkdXJhdGlvbilcclxue1xyXG4gICAgdmFyIGltZyA9IFRpbnkuQmFzZVRleHR1cmVDYWNoZVtrZXldO1xyXG5cclxuICAgIHZhciB3aWR0aCA9IGltZy53aWR0aDtcclxuICAgIHZhciBoZWlnaHQgPSBpbWcuaGVpZ2h0O1xyXG5cclxuICAgIGlmIChmcmFtZVdpZHRoIDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgZnJhbWVXaWR0aCA9IE1hdGguZmxvb3IoLXdpZHRoIC8gTWF0aC5taW4oLTEsIGZyYW1lV2lkdGgpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZnJhbWVIZWlnaHQgPD0gMClcclxuICAgIHtcclxuICAgICAgICBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoLWhlaWdodCAvIE1hdGgubWluKC0xLCBmcmFtZUhlaWdodCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByb3cgPSBNYXRoLmZsb29yKCh3aWR0aCkgLyAoZnJhbWVXaWR0aCkpO1xyXG4gICAgdmFyIGNvbHVtbiA9IE1hdGguZmxvb3IoKGhlaWdodCkgLyAoZnJhbWVIZWlnaHQpKTtcclxuICAgIHZhciB0b3RhbCA9IHJvdyAqIGNvbHVtbjtcclxuXHJcbiAgICBpZiAodG90YWwgPT09IDApIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB4ID0gMDtcclxuICAgIHZhciB5ID0gMDtcclxuXHJcbiAgICB2YXIgbWF4X25vX2ZyYW1lID0gdG90YWwgLSAxO1xyXG4gICAgdmFyIGZyYW1lRGF0YSA9IHt9O1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKylcclxuICAgIHtcclxuICAgICAgICBmcmFtZURhdGEgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiBpLFxyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICB3aWR0aDogZnJhbWVXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBmcmFtZUhlaWdodCxcclxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1dWlkID0ga2V5ICsgXCJfXCIgKyBpO1xyXG4gICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlW3V1aWRdID0gbmV3IFRpbnkuVGV4dHVyZShpbWcsIGZyYW1lRGF0YSk7XHJcbiAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVbdXVpZF0ua2V5ID0ga2V5O1xyXG4gICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlW3V1aWRdLm1heF9ub19mcmFtZSA9IG1heF9ub19mcmFtZTtcclxuXHJcbiAgICAgICAgeCArPSBmcmFtZVdpZHRoO1xyXG5cclxuICAgICAgICBpZiAoeCArIGZyYW1lV2lkdGggPiB3aWR0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICB5ICs9IGZyYW1lSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWF4X25vX2ZyYW1lO1xyXG59XHJcblxyXG5UaW55LkxvYWRlci5sb2FkQXRsYXMgPSBmdW5jdGlvbihrZXksIGF0bGFzRGF0YSlcclxue1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdGxhc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGtleWZyYW1lID0ga2V5ICsgXCJfXCIgKyBhdGxhc0RhdGFbaV0ubmFtZVxyXG5cclxuICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtrZXlmcmFtZV0gPSBuZXcgVGlueS5UZXh0dXJlKFRpbnkuQmFzZVRleHR1cmVDYWNoZVtrZXldLCBhdGxhc0RhdGFbaV0pO1xyXG4gICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlW2tleWZyYW1lXS5rZXkgPSBrZXk7XHJcbiAgICB9XHJcbn1cclxuXHJcblRpbnkuTG9hZGVyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBpbWFnZTogZnVuY3Rpb24oa2V5LCBzb3VyY2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYWNoZS5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBjYjogZnVuY3Rpb24oKSB7fVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNwcml0ZXNoZWV0OiBmdW5jdGlvbihrZXksIHNvdXJjZSwgYXJnXzEsIGFyZ18yLCBkdXJhdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhY2hlLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIGNiOiBmdW5jdGlvbigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnXzEgPT0gXCJudW1iZXJcIikgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVba2V5XS5tYXhfbm9fZnJhbWUgPSBUaW55LkxvYWRlci5wYXJzZVNwcml0ZVNoZWV0KGtleSwgYXJnXzEsIGFyZ18yLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmdfMS5sZW5ndGggPiAwKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtrZXldLm1heF9ub19mcmFtZSA9IFRpbnkuTG9hZGVyLmxvYWRTcHJpdGVTaGVldChrZXksIGFyZ18xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGF0bGFzOiBmdW5jdGlvbihrZXksIHNvdXJjZSwgYXRsYXNEYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2FjaGUucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgY2I6IGZ1bmN0aW9uKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGlueS5Mb2FkZXIubG9hZEF0bGFzKGtleSwgYXRsYXNEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbihfY2JfKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XHJcblxyXG4gICAgICAgIGlmIChjYWNoZS5sZW5ndGggPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jYl8uY2FsbChnYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZE5leHREYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBfY3VycmVudF9kYXRhID0gY2FjaGUuc2hpZnQoKTtcclxuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBpbWcub25sb2FkID0gZGF0YUxvYWRlZDtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IF9jdXJyZW50X2RhdGEuc3JjXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkYXRhTG9hZGVkKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGlueS5CYXNlVGV4dHVyZUNhY2hlW19jdXJyZW50X2RhdGEua2V5XSA9IG5ldyBUaW55LkJhc2VUZXh0dXJlKGltZyk7XHJcbiAgICAgICAgICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtfY3VycmVudF9kYXRhLmtleV0gPSBuZXcgVGlueS5UZXh0dXJlKFRpbnkuQmFzZVRleHR1cmVDYWNoZVtfY3VycmVudF9kYXRhLmtleV0pO1xyXG4gICAgICAgICAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVbX2N1cnJlbnRfZGF0YS5rZXldLmtleSA9IF9jdXJyZW50X2RhdGEua2V5XHJcblxyXG4gICAgICAgICAgICAgICAgX2N1cnJlbnRfZGF0YS5jYigpXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRvbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlLmxlbmd0aCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZE5leHREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jYl8uY2FsbChnYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2FkTmV4dERhdGEoKTtcclxuICAgIH1cclxufTsiLCJUaW55Lk9iamVjdENyZWF0b3IgPSBmdW5jdGlvbihnYW1lKVxyXG57XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3RDcmVhdG9yLnByb3RvdHlwZSA9IHtcclxuICAgIGdyb3VwOiBmdW5jdGlvbih4LCB5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBncm91cCA9IG5ldyBUaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYWRkQ2hpbGQoZ3JvdXApO1xyXG5cclxuICAgICAgICBncm91cC54ID0geCB8fCAwO1xyXG4gICAgICAgIGdyb3VwLnkgPSB5IHx8IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBncm91cDtcclxuICAgIH0sXHJcbiAgICBzcHJpdGU6IGZ1bmN0aW9uKHgsIHksIGltYWdlUGF0aCwga2V5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzcHJpdGUgPSBuZXcgVGlueS5TcHJpdGUoaW1hZ2VQYXRoLCBrZXkpO1xyXG4gICAgICAgIHNwcml0ZS5mcmFtZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGFnZS5hZGRDaGlsZChzcHJpdGUpXHJcblxyXG4gICAgICAgIHNwcml0ZS54ID0geCB8fCAwO1xyXG4gICAgICAgIHNwcml0ZS55ID0geSB8fCAwO1xyXG5cclxuICAgICAgICByZXR1cm4gc3ByaXRlO1xyXG4gICAgfSxcclxuICAgIHRleHQ6IGZ1bmN0aW9uKHgsIHksIHRleHQsIHR5bGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRleHQgPSBuZXcgVGlueS5UZXh0KHRleHQsIHR5bGUpO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYWRkQ2hpbGQodGV4dCk7XHJcblxyXG4gICAgICAgIHRleHQueCA9IHggfHwgMDtcclxuICAgICAgICB0ZXh0LnkgPSB5IHx8IDA7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfSxcclxuICAgIHRpbGVTcHJpdGU6IGZ1bmN0aW9uKHgsIHksIHcsIGgsIGltYWdlUGF0aCwga2V5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0aWxlID0gbmV3IFRpbnkuVGlsaW5nU3ByaXRlKGltYWdlUGF0aCwga2V5LCB3LCBoKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYWRkQ2hpbGQodGlsZSk7XHJcblxyXG4gICAgICAgIHRpbGUueCA9IHggfHwgMDtcclxuICAgICAgICB0aWxlLnkgPSB5IHx8IDA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aWxlO1xyXG4gICAgfSxcclxuICAgIGdyYXBoaWNzOiBmdW5jdGlvbih4LCB5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBncmFwaGljcyA9IG5ldyBUaW55LkdyYXBoaWNzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGFnZS5hZGRDaGlsZChncmFwaGljcyk7XHJcblxyXG4gICAgICAgIGdyYXBoaWNzLnggPSB4IHx8IDA7XHJcbiAgICAgICAgZ3JhcGhpY3MueSA9IHkgfHwgMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdyYXBoaWNzO1xyXG4gICAgfVxyXG59OyIsInZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbnZhciBUaW1lciA9IGZ1bmN0aW9uKHN0YXR1cywgYXV0b1JlbW92ZSwgZ2FtZSwgY2IsIGRlbGF5LCBsb29wLCBuLCBvbmNvbXBsZXRlKVxyXG57XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5fY2JfID0gY2IgfHwgbm9vcDtcclxuICAgIHRoaXMuZGVsYXkgPSAoZGVsYXkgPT0gdW5kZWZpbmVkID8gMTAwMCA6IGRlbGF5KTtcclxuICAgIHRoaXMubG9vcCA9IGxvb3A7XHJcbiAgICB0aGlzLl9jb3VudCA9IG4gfHwgMDtcclxuICAgIHRoaXMuX3JlcGVhdCA9ICh0aGlzLl9jb3VudCA+IDApO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICB0aGlzLl9sYXN0RnJhbWUgPSAwO1xyXG4gICAgdGhpcy5hdXRvUmVtb3ZlID0gYXV0b1JlbW92ZTtcclxuICAgIHRoaXMuX29uY29tcGxldGUgPSBvbmNvbXBsZXRlIHx8IG5vb3A7XHJcbn1cclxuXHJcblRpbWVyLnByb3RvdHlwZSA9IHtcclxuICAgIHN0YXJ0OiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgfSxcclxuICAgIHBhdXNlOiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgfSxcclxuICAgIHN0b3A6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGRlbHRhVGltZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0RnJhbWUgKz0gZGVsdGFUaW1lXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0RnJhbWUgPj0gdGhpcy5kZWxheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2JfKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RnJhbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlcGVhdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb3VudCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvUmVtb3ZlICYmIHRoaXMuZ2FtZS50aW1lci5yZW1vdmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29uY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5sb29wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9SZW1vdmUgJiYgdGhpcy5nYW1lLnRpbWVyLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuVGlueS5UaW1lciA9IFRpbWVyO1xyXG5cclxuVGlueS5UaW1lckNyZWF0b3IgPSBmdW5jdGlvbihnYW1lKVxyXG57XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5nYW1lLnRpbWVycyA9IFtdO1xyXG4gICAgdGhpcy5hdXRvU3RhcnQgPSB0cnVlO1xyXG4gICAgdGhpcy5hdXRvUmVtb3ZlID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGltZXJDcmVhdG9yLnByb3RvdHlwZSA9IHtcclxuICAgIHJlbW92ZUFsbDogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZ2FtZS50aW1lcnMuZm9yRWFjaChmdW5jdGlvbih0bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRtLnN0b3AoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWVycyA9IFtdO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24odG0pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZGV4T2YgPSB0aGlzLmdhbWUudGltZXJzLmluZGV4T2YodG0pO1xyXG4gICAgICAgIGlmIChpbmRleE9mID4gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0bS5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS50aW1lcnMuc3BsaWNlKGluZGV4T2YsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZGQ6IGZ1bmN0aW9uKGRlbGF5LCBjYiwgYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChhdXRvc3RhcnQgPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1dG9zdGFydCA9IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoKGF1dG9zdGFydCA/IDEgOiAwKSwgKGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZSksIHRoaXMuZ2FtZSwgY2IsIGRlbGF5KTtcclxuICAgICAgICB0aGlzLmdhbWUudGltZXJzLnB1c2godGltZXIpO1xyXG4gICAgICAgIHJldHVybiB0aW1lcjtcclxuICAgIH0sXHJcbiAgICBsb29wOiBmdW5jdGlvbihkZWxheSwgY2IsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoYXV0b3N0YXJ0ID09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXRvc3RhcnQgPSB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKChhdXRvc3RhcnQgPyAxIDogMCksIChhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmUpLCB0aGlzLmdhbWUsIGNiLCBkZWxheSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWVycy5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgcmVwZWF0OiBmdW5jdGlvbihkZWxheSwgbiwgY2IsIGNvbXBsZXRlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0aW1lciA9IG5ldyBUaW1lcigodGhpcy5hdXRvU3RhcnQgPyAxIDogMCksIHRoaXMuYXV0b1JlbW92ZSwgdGhpcy5nYW1lLCBjYiwgZGVsYXksIGZhbHNlLCBuLCBjb21wbGV0ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWVycy5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9XHJcbn07IiwiVGlueS5DaXJjbGUgPSBmdW5jdGlvbiAoeCwgeSwgZGlhbWV0ZXIpIHtcclxuXHJcbiAgICB4ID0geCB8fCAwO1xyXG4gICAgeSA9IHkgfHwgMDtcclxuICAgIGRpYW1ldGVyID0gZGlhbWV0ZXIgfHwgMDtcclxuXHJcbiAgICB0aGlzLnggPSB4O1xyXG5cclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy5fZGlhbWV0ZXIgPSBkaWFtZXRlcjtcclxuXHJcbiAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG5cclxuICAgIGlmIChkaWFtZXRlciA+IDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gZGlhbWV0ZXIgKiAwLjU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLkNJUkM7XHJcblxyXG59O1xyXG5cclxuVGlueS5DaXJjbGUucHJvdG90eXBlID0ge1xyXG5cclxuICAgIGdldEJvdW5kczogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRpbnkuUmVjdGFuZ2xlKHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgdGhpcy5kaWFtZXRlciwgdGhpcy5kaWFtZXRlcik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUbzogZnVuY3Rpb24gKHgsIHksIGRpYW1ldGVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLl9kaWFtZXRlciA9IGRpYW1ldGVyO1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IGRpYW1ldGVyICogMC41O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvcHlGcm9tOiBmdW5jdGlvbiAoc291cmNlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnNldFRvKHNvdXJjZS54LCBzb3VyY2UueSwgc291cmNlLmRpYW1ldGVyKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvcHlUbzogZnVuY3Rpb24gKGRlc3QpIHtcclxuXHJcbiAgICAgICAgZGVzdC54ID0gdGhpcy54O1xyXG4gICAgICAgIGRlc3QueSA9IHRoaXMueTtcclxuICAgICAgICBkZXN0LmRpYW1ldGVyID0gdGhpcy5fZGlhbWV0ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiBkZXN0O1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZGlzdGFuY2U6IGZ1bmN0aW9uIChkZXN0LCByb3VuZCkge1xyXG5cclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBUaW55Lk1hdGguZGlzdGFuY2UodGhpcy54LCB0aGlzLnksIGRlc3QueCwgZGVzdC55KTtcclxuICAgICAgICByZXR1cm4gcm91bmQgPyBNYXRoLnJvdW5kKGRpc3RhbmNlKSA6IGRpc3RhbmNlO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09IFwidW5kZWZpbmVkXCIgfHwgb3V0cHV0ID09PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gbmV3IFRpbnkuQ2lyY2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLmRpYW1ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3V0cHV0LnNldFRvKHRoaXMueCwgdGhpcy55LCB0aGlzLmRpYW1ldGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFRpbnkuQ2lyY2xlLmNvbnRhaW5zKHRoaXMsIHgsIHkpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb2Zmc2V0OiBmdW5jdGlvbiAoZHgsIGR5KSB7XHJcblxyXG4gICAgICAgIHRoaXMueCArPSBkeDtcclxuICAgICAgICB0aGlzLnkgKz0gZHk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb2Zmc2V0UG9pbnQ6IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9mZnNldChwb2ludC54LCBwb2ludC55KTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkNpcmNsZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwiZGlhbWV0ZXJcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaWFtZXRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHZhbHVlICogMC41O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJyYWRpdXNcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSB2YWx1ZSAqIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54IC0gdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLngpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdGhpcy54IC0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJyaWdodFwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMuX3JhZGl1cztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy54KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZGlhbWV0ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHZhbHVlIC0gdGhpcy54O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkNpcmNsZS5wcm90b3R5cGUsIFwidG9wXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55IC0gdGhpcy5fcmFkaXVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9kaWFtZXRlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gdGhpcy55IC0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQ2lyY2xlLnByb3RvdHlwZSwgXCJib3R0b21cIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLl9yYWRpdXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHRoaXMueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpYW1ldGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSB2YWx1ZSAtIHRoaXMueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImFyZWFcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmFkaXVzID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlBJICogdGhpcy5fcmFkaXVzICogdGhpcy5fcmFkaXVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5DaXJjbGUucHJvdG90eXBlLCBcImVtcHR5XCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX2RpYW1ldGVyID09PSAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUbygwLCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LkNpcmNsZS5jb250YWlucyA9IGZ1bmN0aW9uIChhLCB4LCB5KSB7XHJcblxyXG4gICAgLy8gIENoZWNrIGlmIHgveSBhcmUgd2l0aGluIHRoZSBib3VuZHMgZmlyc3RcclxuICAgIGlmIChhLnJhZGl1cyA+IDAgJiYgeCA+PSBhLmxlZnQgJiYgeCA8PSBhLnJpZ2h0ICYmIHkgPj0gYS50b3AgJiYgeSA8PSBhLmJvdHRvbSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZHggPSAoYS54IC0geCkgKiAoYS54IC0geCk7XHJcbiAgICAgICAgdmFyIGR5ID0gKGEueSAtIHkpICogKGEueSAtIHkpO1xyXG5cclxuICAgICAgICByZXR1cm4gKGR4ICsgZHkpIDw9IChhLnJhZGl1cyAqIGEucmFkaXVzKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuVGlueS5DaXJjbGUuZXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIHJldHVybiAoYS54ID09IGIueCAmJiBhLnkgPT0gYi55ICYmIGEuZGlhbWV0ZXIgPT0gYi5kaWFtZXRlcik7XHJcbn07XHJcblxyXG5UaW55LkNpcmNsZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIHJldHVybiAoVGlueS5NYXRoLmRpc3RhbmNlKGEueCwgYS55LCBiLngsIGIueSkgPD0gKGEucmFkaXVzICsgYi5yYWRpdXMpKTtcclxufTtcclxuXHJcblxyXG5UaW55LkNpcmNsZS5pbnRlcnNlY3RzUmVjdGFuZ2xlID0gZnVuY3Rpb24gKGMsIHIpIHtcclxuXHJcbiAgICB2YXIgY3ggPSBNYXRoLmFicyhjLnggLSByLnggLSByLmhhbGZXaWR0aCk7XHJcbiAgICB2YXIgeERpc3QgPSByLmhhbGZXaWR0aCArIGMucmFkaXVzO1xyXG5cclxuICAgIGlmIChjeCA+IHhEaXN0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY3kgPSBNYXRoLmFicyhjLnkgLSByLnkgLSByLmhhbGZIZWlnaHQpO1xyXG4gICAgdmFyIHlEaXN0ID0gci5oYWxmSGVpZ2h0ICsgYy5yYWRpdXM7XHJcblxyXG4gICAgaWYgKGN5ID4geURpc3QpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjeCA8PSByLmhhbGZXaWR0aCB8fCBjeSA8PSByLmhhbGZIZWlnaHQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHhDb3JuZXJEaXN0ID0gY3ggLSByLmhhbGZXaWR0aDtcclxuICAgIHZhciB5Q29ybmVyRGlzdCA9IGN5IC0gci5oYWxmSGVpZ2h0O1xyXG4gICAgdmFyIHhDb3JuZXJEaXN0U3EgPSB4Q29ybmVyRGlzdCAqIHhDb3JuZXJEaXN0O1xyXG4gICAgdmFyIHlDb3JuZXJEaXN0U3EgPSB5Q29ybmVyRGlzdCAqIHlDb3JuZXJEaXN0O1xyXG4gICAgdmFyIG1heENvcm5lckRpc3RTcSA9IGMucmFkaXVzICogYy5yYWRpdXM7XHJcblxyXG4gICAgcmV0dXJuIHhDb3JuZXJEaXN0U3EgKyB5Q29ybmVyRGlzdFNxIDw9IG1heENvcm5lckRpc3RTcTtcclxuXHJcbn07XHJcbiIsIlxyXG5UaW55Lk1hdGggPSB7XHJcblxyXG4gICAgLy8gZnV6enlFcXVhbDogZnVuY3Rpb24gKGEsIGIsIGVwc2lsb24pIHtcclxuICAgIC8vICAgICBpZiAodHlwZW9mIGVwc2lsb24gPT09ICd1bmRlZmluZWQnKSB7IGVwc2lsb24gPSAwLjAwMDE7IH1cclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDwgZXBzaWxvbjtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZnV6enlMZXNzVGhhbjogZnVuY3Rpb24gKGEsIGIsIGVwc2lsb24pIHtcclxuICAgIC8vICAgICBpZiAodHlwZW9mIGVwc2lsb24gPT09ICd1bmRlZmluZWQnKSB7IGVwc2lsb24gPSAwLjAwMDE7IH1cclxuICAgIC8vICAgICByZXR1cm4gYSA8IGIgKyBlcHNpbG9uO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBmdXp6eUdyZWF0ZXJUaGFuOiBmdW5jdGlvbiAoYSwgYiwgZXBzaWxvbikge1xyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgZXBzaWxvbiA9PT0gJ3VuZGVmaW5lZCcpIHsgZXBzaWxvbiA9IDAuMDAwMTsgfVxyXG4gICAgLy8gICAgIHJldHVybiBhID4gYiAtIGVwc2lsb247XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGZ1enp5Q2VpbDogZnVuY3Rpb24gKHZhbCwgZXBzaWxvbikge1xyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgZXBzaWxvbiA9PT0gJ3VuZGVmaW5lZCcpIHsgZXBzaWxvbiA9IDAuMDAwMTsgfVxyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLmNlaWwodmFsIC0gZXBzaWxvbik7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGZ1enp5Rmxvb3I6IGZ1bmN0aW9uICh2YWwsIGVwc2lsb24pIHtcclxuICAgIC8vICAgICBpZiAodHlwZW9mIGVwc2lsb24gPT09ICd1bmRlZmluZWQnKSB7IGVwc2lsb24gPSAwLjAwMDE7IH1cclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwgKyBlcHNpbG9uKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gYXZlcmFnZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vICAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgc3VtICs9ICgrYXJndW1lbnRzW2ldKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBzdW0gLyBhcmd1bWVudHMubGVuZ3RoO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gdHJ1bmNhdGU6IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGgudHJ1bmMobik7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHNoZWFyOiBmdW5jdGlvbiAobikge1xyXG4gICAgLy8gICAgIHJldHVybiBuICUgMTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc25hcFRvOiBmdW5jdGlvbiAoaW5wdXQsIGdhcCwgc3RhcnQpIHtcclxuXHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHsgc3RhcnQgPSAwOyB9XHJcblxyXG4gICAgLy8gICAgIGlmIChnYXAgPT09IDApIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgaW5wdXQgLT0gc3RhcnQ7XHJcbiAgICAvLyAgICAgaW5wdXQgPSBnYXAgKiBNYXRoLnJvdW5kKGlucHV0IC8gZ2FwKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHN0YXJ0ICsgaW5wdXQ7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBzbmFwVG9GbG9vcjogZnVuY3Rpb24gKGlucHV0LCBnYXAsIHN0YXJ0KSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7IHN0YXJ0ID0gMDsgfVxyXG5cclxuICAgIC8vICAgICBpZiAoZ2FwID09PSAwKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGlucHV0IC09IHN0YXJ0O1xyXG4gICAgLy8gICAgIGlucHV0ID0gZ2FwICogTWF0aC5mbG9vcihpbnB1dCAvIGdhcCk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBzdGFydCArIGlucHV0O1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc25hcFRvQ2VpbDogZnVuY3Rpb24gKGlucHV0LCBnYXAsIHN0YXJ0KSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7IHN0YXJ0ID0gMDsgfVxyXG5cclxuICAgIC8vICAgICBpZiAoZ2FwID09PSAwKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGlucHV0IC09IHN0YXJ0O1xyXG4gICAgLy8gICAgIGlucHV0ID0gZ2FwICogTWF0aC5jZWlsKGlucHV0IC8gZ2FwKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHN0YXJ0ICsgaW5wdXQ7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBzbmFwVG9JbkFycmF5OiBmdW5jdGlvbiAoaW5wdXQsIGFyciwgc29ydCkge1xyXG5cclxuICAgIC8vICAgICBpZiAodHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnKSB7IHNvcnQgPSB0cnVlOyB9XHJcblxyXG4gICAgLy8gICAgIGlmIChzb3J0KSB7XHJcbiAgICAvLyAgICAgICAgIGFyci5zb3J0KCk7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLkFycmF5VXRpbHMuZmluZENsb3Nlc3QoaW5wdXQsIGFycik7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyByb3VuZFRvOiBmdW5jdGlvbiAodmFsdWUsIHBsYWNlLCBiYXNlKSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgcGxhY2UgPT09ICd1bmRlZmluZWQnKSB7IHBsYWNlID0gMDsgfVxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgYmFzZSA9PT0gJ3VuZGVmaW5lZCcpIHsgYmFzZSA9IDEwOyB9XHJcblxyXG4gICAgLy8gICAgIHZhciBwID0gTWF0aC5wb3coYmFzZSwgLXBsYWNlKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBwKSAvIHA7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBmbG9vclRvOiBmdW5jdGlvbiAodmFsdWUsIHBsYWNlLCBiYXNlKSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgcGxhY2UgPT09ICd1bmRlZmluZWQnKSB7IHBsYWNlID0gMDsgfVxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgYmFzZSA9PT0gJ3VuZGVmaW5lZCcpIHsgYmFzZSA9IDEwOyB9XHJcblxyXG4gICAgLy8gICAgIHZhciBwID0gTWF0aC5wb3coYmFzZSwgLXBsYWNlKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguZmxvb3IodmFsdWUgKiBwKSAvIHA7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBjZWlsVG86IGZ1bmN0aW9uICh2YWx1ZSwgcGxhY2UsIGJhc2UpIHtcclxuXHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBwbGFjZSA9PT0gJ3VuZGVmaW5lZCcpIHsgcGxhY2UgPSAwOyB9XHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBiYXNlID09PSAndW5kZWZpbmVkJykgeyBiYXNlID0gMTA7IH1cclxuXHJcbiAgICAvLyAgICAgdmFyIHAgPSBNYXRoLnBvdyhiYXNlLCAtcGxhY2UpO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5jZWlsKHZhbHVlICogcCkgLyBwO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gaW50ZXJwb2xhdGVGbG9hdDogZnVuY3Rpb24gKGEsIGIsIHdlaWdodCkge1xyXG4gICAgLy8gICAgIHJldHVybiAoYiAtIGEpICogd2VpZ2h0ICsgYTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gYW5nbGVCZXR3ZWVuOiBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5hdGFuMih5MiAtIHkxLCB4MiAtIHgxKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gYW5nbGVCZXR3ZWVuWTogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguYXRhbjIoeDIgLSB4MSwgeTIgLSB5MSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGFuZ2xlQmV0d2VlblBvaW50czogZnVuY3Rpb24gKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguYXRhbjIocG9pbnQyLnkgLSBwb2ludDEueSwgcG9pbnQyLnggLSBwb2ludDEueCk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGFuZ2xlQmV0d2VlblBvaW50c1k6IGZ1bmN0aW9uIChwb2ludDEsIHBvaW50Mikge1xyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLmF0YW4yKHBvaW50Mi54IC0gcG9pbnQxLngsIHBvaW50Mi55IC0gcG9pbnQxLnkpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyByZXZlcnNlQW5nbGU6IGZ1bmN0aW9uIChhbmdsZVJhZCkge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZUFuZ2xlKGFuZ2xlUmFkICsgTWF0aC5QSSwgdHJ1ZSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG5vcm1hbGl6ZUFuZ2xlOiBmdW5jdGlvbiAoYW5nbGVSYWQpIHtcclxuXHJcbiAgICAvLyAgICAgYW5nbGVSYWQgPSBhbmdsZVJhZCAlICgyICogTWF0aC5QSSk7XHJcbiAgICAvLyAgICAgcmV0dXJuIGFuZ2xlUmFkID49IDAgPyBhbmdsZVJhZCA6IGFuZ2xlUmFkICsgMiAqIE1hdGguUEk7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBub3JtYWxpemVMYXRpdHVkZTogZnVuY3Rpb24gKGxhdCkge1xyXG4gICAgLy8gICAgIHJldHVybiBQaGFzZXIuTWF0aC5jbGFtcChsYXQsIC05MCwgOTApO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBub3JtYWxpemVMb25naXR1ZGU6IGZ1bmN0aW9uIChsbmcpIHtcclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLk1hdGgud3JhcChsbmcsIC0xODAsIDE4MCk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGNoYW5jZVJvbGw6IGZ1bmN0aW9uIChjaGFuY2UpIHtcclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLlV0aWxzLmNoYW5jZVJvbGwoY2hhbmNlKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gbnVtYmVyQXJyYXk6IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5BcnJheVV0aWxzLm51bWJlckFycmF5KHN0YXJ0LCBlbmQpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBudW1iZXJBcnJheVN0ZXA6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIHN0ZXApIHtcclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLkFycmF5VXRpbHMubnVtYmVyQXJyYXlTdGVwKHN0YXJ0LCBlbmQsIHN0ZXApO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBtYXhBZGQ6IGZ1bmN0aW9uICh2YWx1ZSwgYW1vdW50LCBtYXgpIHtcclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5taW4odmFsdWUgKyBhbW91bnQsIG1heCk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG1pblN1YjogZnVuY3Rpb24gKHZhbHVlLCBhbW91bnQsIG1pbikge1xyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLm1heCh2YWx1ZSAtIGFtb3VudCwgbWluKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gd3JhcDogZnVuY3Rpb24gKHZhbHVlLCBtaW4sIG1heCkge1xyXG5cclxuICAgIC8vICAgICB2YXIgcmFuZ2UgPSBtYXggLSBtaW47XHJcblxyXG4gICAgLy8gICAgIGlmIChyYW5nZSA8PSAwKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICB2YXIgcmVzdWx0ID0gKHZhbHVlIC0gbWluKSAlIHJhbmdlO1xyXG5cclxuICAgIC8vICAgICBpZiAocmVzdWx0IDwgMClcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJlc3VsdCArPSByYW5nZTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiByZXN1bHQgKyBtaW47XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyB3cmFwVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSwgYW1vdW50LCBtYXgpIHtcclxuXHJcbiAgICAvLyAgICAgdmFyIGRpZmY7XHJcbiAgICAvLyAgICAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XHJcbiAgICAvLyAgICAgYW1vdW50ID0gTWF0aC5hYnMoYW1vdW50KTtcclxuICAgIC8vICAgICBtYXggPSBNYXRoLmFicyhtYXgpO1xyXG4gICAgLy8gICAgIGRpZmYgPSAodmFsdWUgKyBhbW91bnQpICUgbWF4O1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gZGlmZjtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGxpbWl0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlLCBtaW4sIG1heCkge1xyXG4gICAgLy8gICAgIHJldHVybiBQaGFzZXIuTWF0aC5jbGFtcCh2YWx1ZSwgbWluLCBtYXgpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyByYW5kb21TaWduOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5VdGlscy5yYW5kb21DaG9pY2UoLTEsIDEpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBpc09kZDogZnVuY3Rpb24gKG4pIHtcclxuICAgIC8vICAgICAvLyBEb2VzIG5vdCB3b3JrIHdpdGggZXh0cmVtZWx5IGxhcmdlIHZhbHVlc1xyXG4gICAgLy8gICAgIHJldHVybiAobiAmIDEpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBpc0V2ZW46IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAvLyAgICAgLy8gRG9lcyBub3Qgd29yayB3aXRoIGV4dHJlbWVseSBsYXJnZSB2YWx1ZXNcclxuICAgIC8vICAgICByZXR1cm4gIShuICYgMSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG1pbjogZnVuY3Rpb24gKCkge1xyXG4gXHJcbiAgICAvLyAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1swXTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHM7XHJcbiAgICAvLyAgICAgfVxyXG4gXHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDEsIG1pbiA9IDAsIGxlbiA9IGRhdGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBpZiAoZGF0YVtpXSA8IGRhdGFbbWluXSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgbWluID0gaTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGRhdGFbbWluXTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG1heDogZnVuY3Rpb24gKCkge1xyXG4gXHJcbiAgICAvLyAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1swXTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHM7XHJcbiAgICAvLyAgICAgfVxyXG4gXHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDEsIG1heCA9IDAsIGxlbiA9IGRhdGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBpZiAoZGF0YVtpXSA+IGRhdGFbbWF4XSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgbWF4ID0gaTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGRhdGFbbWF4XTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG1pblByb3BlcnR5OiBmdW5jdGlvbiAocHJvcGVydHkpIHtcclxuXHJcbiAgICAvLyAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ29iamVjdCcpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1sxXTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHMuc2xpY2UoMSk7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBmb3IgKHZhciBpID0gMSwgbWluID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGlmIChkYXRhW2ldW3Byb3BlcnR5XSA8IGRhdGFbbWluXVtwcm9wZXJ0eV0pXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIG1pbiA9IGk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBkYXRhW21pbl1bcHJvcGVydHldO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gbWF4UHJvcGVydHk6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xyXG5cclxuICAgIC8vICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgYXJndW1lbnRzWzFdID09PSAnb2JqZWN0JylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzWzFdO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50cy5zbGljZSgxKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAxLCBtYXggPSAwLCBsZW4gPSBkYXRhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaWYgKGRhdGFbaV1bcHJvcGVydHldID4gZGF0YVttYXhdW3Byb3BlcnR5XSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgbWF4ID0gaTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGRhdGFbbWF4XVtwcm9wZXJ0eV07XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyB3cmFwQW5nbGU6IGZ1bmN0aW9uIChhbmdsZSwgcmFkaWFucykge1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gcmFkaWFucyA/IHRoaXMud3JhcChhbmdsZSwgLU1hdGguUEksIE1hdGguUEkpIDogdGhpcy53cmFwKGFuZ2xlLCAtMTgwLCAxODApO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gYW5nbGVMaW1pdDogZnVuY3Rpb24gKGFuZ2xlLCBtaW4sIG1heCkge1xyXG5cclxuICAgIC8vICAgICB2YXIgcmVzdWx0ID0gYW5nbGU7XHJcblxyXG4gICAgLy8gICAgIGlmIChhbmdsZSA+IG1heClcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJlc3VsdCA9IG1heDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZSBpZiAoYW5nbGUgPCBtaW4pXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXN1bHQgPSBtaW47XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gbGluZWFySW50ZXJwb2xhdGlvbjogZnVuY3Rpb24gKHYsIGspIHtcclxuXHJcbiAgICAvLyAgICAgdmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcbiAgICAvLyAgICAgdmFyIGYgPSBtICogaztcclxuICAgIC8vICAgICB2YXIgaSA9IE1hdGguZmxvb3IoZik7XHJcblxyXG4gICAgLy8gICAgIGlmIChrIDwgMClcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLmxpbmVhcih2WzBdLCB2WzFdLCBmKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGlmIChrID4gMSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLmxpbmVhcih2W21dLCB2W20gLSAxXSwgbSAtIGYpO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMubGluZWFyKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gYmV6aWVySW50ZXJwb2xhdGlvbjogZnVuY3Rpb24gKHYsIGspIHtcclxuXHJcbiAgICAvLyAgICAgdmFyIGIgPSAwO1xyXG4gICAgLy8gICAgIHZhciBuID0gdi5sZW5ndGggLSAxO1xyXG5cclxuICAgIC8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBiICs9IE1hdGgucG93KDEgLSBrLCBuIC0gaSkgKiBNYXRoLnBvdyhrLCBpKSAqIHZbaV0gKiB0aGlzLmJlcm5zdGVpbihuLCBpKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBiO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gY2F0bXVsbFJvbUludGVycG9sYXRpb246IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG4gICAgLy8gICAgIHZhciBtID0gdi5sZW5ndGggLSAxO1xyXG4gICAgLy8gICAgIHZhciBmID0gbSAqIGs7XHJcbiAgICAvLyAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG5cclxuICAgIC8vICAgICBpZiAodlswXSA9PT0gdlttXSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGlmIChrIDwgMClcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgaSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuY2F0bXVsbFJvbSh2WyhpIC0gMSArIG0pICUgbV0sIHZbaV0sIHZbKGkgKyAxKSAlIG1dLCB2WyhpICsgMikgJSBtXSwgZiAtIGkpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBpZiAoayA8IDApXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiB2WzBdIC0gKHRoaXMuY2F0bXVsbFJvbSh2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgaWYgKGsgPiAxKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gdlttXSAtICh0aGlzLmNhdG11bGxSb20odlttXSwgdlttXSwgdlttIC0gMV0sIHZbbSAtIDFdLCBmIC0gbSkgLSB2W21dKTtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuY2F0bXVsbFJvbSh2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGxpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xyXG4gICAgLy8gICAgIHJldHVybiAocDEgLSBwMCkgKiB0ICsgcDA7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5mYWN0b3JpYWwobikgLyB0aGlzLmZhY3RvcmlhbChpKSAvIHRoaXMuZmFjdG9yaWFsKG4gLSBpKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZmFjdG9yaWFsIDogZnVuY3Rpb24oIHZhbHVlICl7XHJcblxyXG4gICAgLy8gICAgIGlmICh2YWx1ZSA9PT0gMClcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiAxO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgdmFyIHJlcyA9IHZhbHVlO1xyXG5cclxuICAgIC8vICAgICB3aGlsZSgtLXZhbHVlKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmVzICo9IHZhbHVlO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHJlcztcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGNhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xyXG5cclxuICAgIC8vICAgICB2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjUsIHYxID0gKHAzIC0gcDEpICogMC41LCB0MiA9IHQgKiB0LCB0MyA9IHQgKiB0MjtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0zICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZGlmZmVyZW5jZTogZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIC8vICAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBnZXRSYW5kb206IGZ1bmN0aW9uIChvYmplY3RzLCBzdGFydEluZGV4LCBsZW5ndGgpIHtcclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLkFycmF5VXRpbHMuZ2V0UmFuZG9tSXRlbShvYmplY3RzLCBzdGFydEluZGV4LCBsZW5ndGgpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyByZW1vdmVSYW5kb206IGZ1bmN0aW9uIChvYmplY3RzLCBzdGFydEluZGV4LCBsZW5ndGgpIHtcclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLkFycmF5VXRpbHMucmVtb3ZlUmFuZG9tSXRlbShvYmplY3RzLCBzdGFydEluZGV4LCBsZW5ndGgpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBmbG9vcjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGgudHJ1bmModmFsdWUpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBjZWlsOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIC8vICAgICByZXR1cm4gUGhhc2VyLk1hdGgucm91bmRBd2F5RnJvbVplcm8odmFsdWUpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyByb3VuZEF3YXlGcm9tWmVybzogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvLyAgICAgLy8gXCJPcHBvc2l0ZVwiIG9mIHRydW5jYXRlLlxyXG4gICAgLy8gICAgIHJldHVybiAodmFsdWUgPiAwKSA/IE1hdGguY2VpbCh2YWx1ZSkgOiBNYXRoLmZsb29yKHZhbHVlKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc2luQ29zR2VuZXJhdG9yOiBmdW5jdGlvbiAobGVuZ3RoLCBzaW5BbXBsaXR1ZGUsIGNvc0FtcGxpdHVkZSwgZnJlcXVlbmN5KSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2Ygc2luQW1wbGl0dWRlID09PSAndW5kZWZpbmVkJykgeyBzaW5BbXBsaXR1ZGUgPSAxLjA7IH1cclxuICAgIC8vICAgICBpZiAodHlwZW9mIGNvc0FtcGxpdHVkZSA9PT0gJ3VuZGVmaW5lZCcpIHsgY29zQW1wbGl0dWRlID0gMS4wOyB9XHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBmcmVxdWVuY3kgPT09ICd1bmRlZmluZWQnKSB7IGZyZXF1ZW5jeSA9IDEuMDsgfVxyXG5cclxuICAgIC8vICAgICB2YXIgc2luID0gc2luQW1wbGl0dWRlO1xyXG4gICAgLy8gICAgIHZhciBjb3MgPSBjb3NBbXBsaXR1ZGU7XHJcbiAgICAvLyAgICAgdmFyIGZycSA9IGZyZXF1ZW5jeSAqIE1hdGguUEkgLyBsZW5ndGg7XHJcblxyXG4gICAgLy8gICAgIHZhciBjb3NUYWJsZSA9IFtdO1xyXG4gICAgLy8gICAgIHZhciBzaW5UYWJsZSA9IFtdO1xyXG5cclxuICAgIC8vICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGxlbmd0aDsgYysrKSB7XHJcblxyXG4gICAgLy8gICAgICAgICBjb3MgLT0gc2luICogZnJxO1xyXG4gICAgLy8gICAgICAgICBzaW4gKz0gY29zICogZnJxO1xyXG5cclxuICAgIC8vICAgICAgICAgY29zVGFibGVbY10gPSBjb3M7XHJcbiAgICAvLyAgICAgICAgIHNpblRhYmxlW2NdID0gc2luO1xyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHJldHVybiB7IHNpbjogc2luVGFibGUsIGNvczogY29zVGFibGUsIGxlbmd0aDogbGVuZ3RoIH07XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBzaGlmdDogZnVuY3Rpb24gKGFycmF5KSB7XHJcblxyXG4gICAgLy8gICAgIHZhciBzID0gYXJyYXkuc2hpZnQoKTtcclxuICAgIC8vICAgICBhcnJheS5wdXNoKHMpO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gcztcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHNodWZmbGVBcnJheTogZnVuY3Rpb24gKGFycmF5KSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFBoYXNlci5BcnJheVV0aWxzLnNodWZmbGUoYXJyYXkpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyKSB7XHJcblxyXG4gICAgICAgIHZhciBkeCA9IHgxIC0geDI7XHJcbiAgICAgICAgdmFyIGR5ID0geTEgLSB5MjtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBkaXN0YW5jZVBvdzogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyLCBwb3cpIHtcclxuXHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBwb3cgPT09ICd1bmRlZmluZWQnKSB7IHBvdyA9IDI7IH1cclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4MiAtIHgxLCBwb3cpICsgTWF0aC5wb3coeTIgLSB5MSwgcG93KSk7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBkaXN0YW5jZVJvdW5kZWQ6IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgLy8gICAgIHJldHVybiBNYXRoLnJvdW5kKFBoYXNlci5NYXRoLmRpc3RhbmNlKHgxLCB5MSwgeDIsIHkyKSk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIGNsYW1wOiBmdW5jdGlvbiAoeCwgYSwgYikge1xyXG4gICAgLy8gICAgIHJldHVybiAoIHggPCBhICkgPyBhIDogKCAoIHggPiBiICkgPyBiIDogeCApO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBjbGFtcEJvdHRvbTogZnVuY3Rpb24gKHgsIGEpIHtcclxuICAgIC8vICAgICByZXR1cm4geCA8IGEgPyBhIDogeDtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gd2l0aGluOiBmdW5jdGlvbiAoYSwgYiwgdG9sZXJhbmNlKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIChNYXRoLmFicyhhIC0gYikgPD0gdG9sZXJhbmNlKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gbWFwTGluZWFyOiBmdW5jdGlvbiAoeCwgYTEsIGEyLCBiMSwgYjIpIHtcclxuICAgIC8vICAgICByZXR1cm4gYjEgKyAoIHggLSBhMSApICogKCBiMiAtIGIxICkgLyAoIGEyIC0gYTEgKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc21vb3Roc3RlcDogZnVuY3Rpb24gKHgsIG1pbiwgbWF4KSB7XHJcbiAgICAvLyAgICAgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsICh4IC0gbWluKSAvIChtYXggLSBtaW4pKSk7XHJcbiAgICAvLyAgICAgcmV0dXJuIHggKiB4ICogKDMgLSAyICogeCk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIHNtb290aGVyc3RlcDogZnVuY3Rpb24gKHgsIG1pbiwgbWF4KSB7XHJcbiAgICAvLyAgICAgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsICh4IC0gbWluKSAvIChtYXggLSBtaW4pKSk7XHJcbiAgICAvLyAgICAgcmV0dXJuIHggKiB4ICogeCAqICh4ICogKHggKiA2IC0gMTUpICsgMTApO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBzaWduOiBmdW5jdGlvbiAoeCkge1xyXG4gICAgLy8gICAgIHJldHVybiAoIHggPCAwICkgPyAtMSA6ICggKCB4ID4gMCApID8gMSA6IDAgKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gcGVyY2VudDogZnVuY3Rpb24gKGEsIGIsIGJhc2UpIHtcclxuXHJcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBiYXNlID09PSAndW5kZWZpbmVkJykgeyBiYXNlID0gMDsgfVxyXG5cclxuICAgIC8vICAgICBpZiAoYSA+IGIgfHwgYmFzZSA+IGIpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gMTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZSBpZiAoYSA8IGJhc2UgfHwgYmFzZSA+IGEpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gMDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIChhIC0gYmFzZSkgLyBiO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyB9XHJcblxyXG59O1xyXG5cclxudmFyIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvciA9IE1hdGguUEkgLyAxODA7XHJcbnZhciByYWRpYW5Ub0RlZ3JlZXNGYWN0b3IgPSAxODAgLyBNYXRoLlBJO1xyXG5cclxuVGlueS5NYXRoLmRlZ1RvUmFkID0gZnVuY3Rpb24gZGVnVG9SYWQgKGRlZ3JlZXMpIHtcclxuICAgIHJldHVybiBkZWdyZWVzICogZGVncmVlVG9SYWRpYW5zRmFjdG9yO1xyXG59O1xyXG5cclxuVGlueS5NYXRoLnJhZFRvRGVnID0gZnVuY3Rpb24gcmFkVG9EZWcgKHJhZGlhbnMpIHtcclxuICAgIHJldHVybiByYWRpYW5zICogcmFkaWFuVG9EZWdyZWVzRmFjdG9yO1xyXG59OyIsIlxyXG5UaW55Lk1hdHJpeCA9IGZ1bmN0aW9uKClcclxue1xyXG5cclxuICAgIHRoaXMuYSA9IDE7XHJcblxyXG4gICAgdGhpcy5iID0gMDtcclxuXHJcbiAgICB0aGlzLmMgPSAwO1xyXG5cclxuICAgIHRoaXMuZCA9IDE7XHJcblxyXG4gICAgdGhpcy50eCA9IDA7XHJcblxyXG4gICAgdGhpcy50eSA9IDA7XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5NQVRSSVg7XHJcblxyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmZyb21BcnJheSA9IGZ1bmN0aW9uKGFycmF5KVxyXG57XHJcbiAgICB0aGlzLmEgPSBhcnJheVswXTtcclxuICAgIHRoaXMuYiA9IGFycmF5WzFdO1xyXG4gICAgdGhpcy5jID0gYXJyYXlbM107XHJcbiAgICB0aGlzLmQgPSBhcnJheVs0XTtcclxuICAgIHRoaXMudHggPSBhcnJheVsyXTtcclxuICAgIHRoaXMudHkgPSBhcnJheVs1XTtcclxufTtcclxuXHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKHRyYW5zcG9zZSlcclxue1xyXG4gICAgaWYgKCF0aGlzLmFycmF5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XHJcblxyXG4gICAgaWYgKHRyYW5zcG9zZSlcclxuICAgIHtcclxuICAgICAgICBhcnJheVswXSA9IHRoaXMuYTtcclxuICAgICAgICBhcnJheVsxXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVsyXSA9IDA7XHJcbiAgICAgICAgYXJyYXlbM10gPSB0aGlzLmM7XHJcbiAgICAgICAgYXJyYXlbNF0gPSB0aGlzLmQ7XHJcbiAgICAgICAgYXJyYXlbNV0gPSAwO1xyXG4gICAgICAgIGFycmF5WzZdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVs3XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbOF0gPSAxO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5jO1xyXG4gICAgICAgIGFycmF5WzJdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbNl0gPSAwO1xyXG4gICAgICAgIGFycmF5WzddID0gMDtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24ocG9zLCBuZXdQb3MpXHJcbntcclxuICAgIG5ld1BvcyA9IG5ld1BvcyB8fCBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICB2YXIgeSA9IHBvcy55O1xyXG5cclxuICAgIG5ld1Bvcy54ID0gdGhpcy5hICogeCArIHRoaXMuYyAqIHkgKyB0aGlzLnR4O1xyXG4gICAgbmV3UG9zLnkgPSB0aGlzLmIgKiB4ICsgdGhpcy5kICogeSArIHRoaXMudHk7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BvcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBseUludmVyc2UgPSBmdW5jdGlvbihwb3MsIG5ld1Bvcylcclxue1xyXG4gICAgbmV3UG9zID0gbmV3UG9zIHx8IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdmFyIGlkID0gMSAvICh0aGlzLmEgKiB0aGlzLmQgKyB0aGlzLmMgKiAtdGhpcy5iKTtcclxuICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICB2YXIgeSA9IHBvcy55O1xyXG5cclxuICAgIG5ld1Bvcy54ID0gdGhpcy5kICogaWQgKiB4ICsgLXRoaXMuYyAqIGlkICogeSArICh0aGlzLnR5ICogdGhpcy5jIC0gdGhpcy50eCAqIHRoaXMuZCkgKiBpZDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5hICogaWQgKiB5ICsgLXRoaXMuYiAqIGlkICogeCArICgtdGhpcy50eSAqIHRoaXMuYSArIHRoaXMudHggKiB0aGlzLmIpICogaWQ7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BvcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbih4LCB5KVxyXG57XHJcbiAgICB0aGlzLnR4ICs9IHg7XHJcbiAgICB0aGlzLnR5ICs9IHk7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgdGhpcy5hICo9IHg7XHJcbiAgICB0aGlzLmQgKj0geTtcclxuICAgIHRoaXMuYyAqPSB4O1xyXG4gICAgdGhpcy5iICo9IHk7XHJcbiAgICB0aGlzLnR4ICo9IHg7XHJcbiAgICB0aGlzLnR5ICo9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24oYW5nbGUpXHJcbntcclxuICAgIHZhciBjb3MgPSBNYXRoLmNvcyggYW5nbGUgKTtcclxuICAgIHZhciBzaW4gPSBNYXRoLnNpbiggYW5nbGUgKTtcclxuXHJcbiAgICB2YXIgYTEgPSB0aGlzLmE7XHJcbiAgICB2YXIgYzEgPSB0aGlzLmM7XHJcbiAgICB2YXIgdHgxID0gdGhpcy50eDtcclxuXHJcbiAgICB0aGlzLmEgPSBhMSAqIGNvcy10aGlzLmIgKiBzaW47XHJcbiAgICB0aGlzLmIgPSBhMSAqIHNpbit0aGlzLmIgKiBjb3M7XHJcbiAgICB0aGlzLmMgPSBjMSAqIGNvcy10aGlzLmQgKiBzaW47XHJcbiAgICB0aGlzLmQgPSBjMSAqIHNpbit0aGlzLmQgKiBjb3M7XHJcbiAgICB0aGlzLnR4ID0gdHgxICogY29zIC0gdGhpcy50eSAqIHNpbjtcclxuICAgIHRoaXMudHkgPSB0eDEgKiBzaW4gKyB0aGlzLnR5ICogY29zO1xyXG4gXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihtYXRyaXgpXHJcbntcclxuICAgIHZhciBhMSA9IHRoaXMuYTtcclxuICAgIHZhciBiMSA9IHRoaXMuYjtcclxuICAgIHZhciBjMSA9IHRoaXMuYztcclxuICAgIHZhciBkMSA9IHRoaXMuZDtcclxuXHJcbiAgICB0aGlzLmEgID0gbWF0cml4LmEgKiBhMSArIG1hdHJpeC5iICogYzE7XHJcbiAgICB0aGlzLmIgID0gbWF0cml4LmEgKiBiMSArIG1hdHJpeC5iICogZDE7XHJcbiAgICB0aGlzLmMgID0gbWF0cml4LmMgKiBhMSArIG1hdHJpeC5kICogYzE7XHJcbiAgICB0aGlzLmQgID0gbWF0cml4LmMgKiBiMSArIG1hdHJpeC5kICogZDE7XHJcblxyXG4gICAgdGhpcy50eCA9IG1hdHJpeC50eCAqIGExICsgbWF0cml4LnR5ICogYzEgKyB0aGlzLnR4O1xyXG4gICAgdGhpcy50eSA9IG1hdHJpeC50eCAqIGIxICsgbWF0cml4LnR5ICogZDEgKyB0aGlzLnR5O1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5pZGVudGl0eSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5hID0gMTtcclxuICAgIHRoaXMuYiA9IDA7XHJcbiAgICB0aGlzLmMgPSAwO1xyXG4gICAgdGhpcy5kID0gMTtcclxuICAgIHRoaXMudHggPSAwO1xyXG4gICAgdGhpcy50eSA9IDA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LmlkZW50aXR5TWF0cml4ID0gbmV3IFRpbnkuTWF0cml4KCk7IiwiVGlueS5Qb2ludCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbn07XHJcblxyXG5UaW55LlBvaW50LnByb3RvdHlwZSA9IHtcclxuXHQgc2V0OiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8ICggKHkgIT09IDApID8gdGhpcy54IDogMCApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICBcdHRoaXMuc2V0KHgsIHkpXHJcbiAgICB9XHJcbn07IiwiXHJcblRpbnkuUG9seWdvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYXJlYSA9IDA7XHJcbiAgICB0aGlzLl9wb2ludHMgPSBbXTtcclxuXHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXRUby5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLlBPTFk7XHJcblxyXG59O1xyXG5cclxuVGlueS5Qb2x5Z29uLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICB0b051bWJlckFycmF5OiBmdW5jdGlvbiAob3V0cHV0KSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSAndW5kZWZpbmVkJykgeyBvdXRwdXQgPSBbXTsgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3BvaW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcG9pbnRzW2ldID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2godGhpcy5fcG9pbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHRoaXMuX3BvaW50c1tpICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2godGhpcy5fcG9pbnRzW2ldLngpO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2godGhpcy5fcG9pbnRzW2ldLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZmxhdHRlbjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB0aGlzLl9wb2ludHMgPSB0aGlzLnRvTnVtYmVyQXJyYXkoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG5cclxuICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5fcG9pbnRzLnNsaWNlKCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiIHx8IG91dHB1dCA9PT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG5ldyBUaW55LlBvbHlnb24ocG9pbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3V0cHV0LnNldFRvKHBvaW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLl9wb2ludHMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBpbnNpZGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IC0xLCBqID0gbGVuZ3RoIC0gMTsgKytpIDwgbGVuZ3RoOyBqID0gaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpeCA9IHRoaXMuX3BvaW50c1tpXS54O1xyXG4gICAgICAgICAgICB2YXIgaXkgPSB0aGlzLl9wb2ludHNbaV0ueTtcclxuXHJcbiAgICAgICAgICAgIHZhciBqeCA9IHRoaXMuX3BvaW50c1tqXS54O1xyXG4gICAgICAgICAgICB2YXIgankgPSB0aGlzLl9wb2ludHNbal0ueTtcclxuXHJcbiAgICAgICAgICAgIGlmICgoKGl5IDw9IHkgJiYgeSA8IGp5KSB8fCAoankgPD0geSAmJiB5IDwgaXkpKSAmJiAoeCA8IChqeCAtIGl4KSAqICh5IC0gaXkpIC8gKGp5IC0gaXkpICsgaXgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnNpZGUgPSAhaW5zaWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5zaWRlO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0VG86IGZ1bmN0aW9uIChwb2ludHMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5hcmVhID0gMDtcclxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gIElmIHBvaW50cyBpc24ndCBhbiBhcnJheSwgdXNlIGFyZ3VtZW50cyBhcyB0aGUgYXJyYXlcclxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBvaW50cykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvaW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB5MCA9IE51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gICAgICAgICAgICAvLyAgQWxsb3dzIGZvciBtaXhlZC10eXBlIGFyZ3VtZW50c1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBvaW50c1tpXSA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgVGlueS5Qb2ludChwb2ludHNbaV0sIHBvaW50c1tpICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBUaW55LlBvaW50KHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9pbnRzLnB1c2gocCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gIExvd2VzdCBib3VuZGFyeVxyXG4gICAgICAgICAgICAgICAgaWYgKHAueSA8IHkwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHkwID0gcC55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUFyZWEoeTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjYWxjdWxhdGVBcmVhOiBmdW5jdGlvbiAoeTApIHtcclxuXHJcbiAgICAgICAgdmFyIHAxO1xyXG4gICAgICAgIHZhciBwMjtcclxuICAgICAgICB2YXIgYXZnSGVpZ2h0O1xyXG4gICAgICAgIHZhciB3aWR0aDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX3BvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHAxID0gdGhpcy5fcG9pbnRzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5fcG9pbnRzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLl9wb2ludHNbaSArIDFdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhdmdIZWlnaHQgPSAoKHAxLnkgLSB5MCkgKyAocDIueSAtIHkwKSkgLyAyO1xyXG4gICAgICAgICAgICB3aWR0aCA9IHAxLnggLSBwMi54O1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgKz0gYXZnSGVpZ2h0ICogd2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hcmVhO1xyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5UaW55LlBvbHlnb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5Qb2x5Z29uO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUG9seWdvbi5wcm90b3R5cGUsICdwb2ludHMnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHBvaW50cykge1xyXG5cclxuICAgICAgICBpZiAocG9pbnRzICE9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvKHBvaW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBDbGVhciB0aGUgcG9pbnRzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG8oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcbiIsIlxyXG5UaW55LlJlY3RhbmdsZSA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG4gICAgeCA9IHggfHwgMDtcclxuICAgIHkgPSB5IHx8IDA7XHJcbiAgICB3aWR0aCA9IHdpZHRoIHx8IDA7XHJcbiAgICBoZWlnaHQgPSBoZWlnaHQgfHwgMDtcclxuXHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUkVDVFxyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUucHJvdG90eXBlID0ge1xyXG5cclxuICAgIC8vIG9mZnNldDogZnVuY3Rpb24gKGR4LCBkeSkge1xyXG5cclxuICAgIC8vICAgICB0aGlzLnggKz0gZHg7XHJcbiAgICAvLyAgICAgdGhpcy55ICs9IGR5O1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vIG9mZnNldFBvaW50OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMub2Zmc2V0KHBvaW50LngsIHBvaW50LnkpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc2NhbGU6IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgeSA9PT0gJ3VuZGVmaW5lZCcpIHsgeSA9IHg7IH1cclxuXHJcbiAgICAvLyAgICAgdGhpcy53aWR0aCAqPSB4O1xyXG4gICAgLy8gICAgIHRoaXMuaGVpZ2h0ICo9IHk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gY2VudGVyT246IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgLy8gICAgIHRoaXMuY2VudGVyWCA9IHg7XHJcbiAgICAvLyAgICAgdGhpcy5jZW50ZXJZID0geTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBmbG9vcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vICAgICB0aGlzLnggPSBNYXRoLmZsb29yKHRoaXMueCk7XHJcbiAgICAvLyAgICAgdGhpcy55ID0gTWF0aC5mbG9vcih0aGlzLnkpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZmxvb3JBbGw6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyAgICAgdGhpcy54ID0gTWF0aC5mbG9vcih0aGlzLngpO1xyXG4gICAgLy8gICAgIHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55KTtcclxuICAgIC8vICAgICB0aGlzLndpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoKTtcclxuICAgIC8vICAgICB0aGlzLmhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gY29weUZyb206IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuc2V0VG8oc291cmNlLngsIHNvdXJjZS55LCBzb3VyY2Uud2lkdGgsIHNvdXJjZS5oZWlnaHQpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gY29weVRvOiBmdW5jdGlvbiAoZGVzdCkge1xyXG5cclxuICAgIC8vICAgICBkZXN0LnggPSB0aGlzLng7XHJcbiAgICAvLyAgICAgZGVzdC55ID0gdGhpcy55O1xyXG4gICAgLy8gICAgIGRlc3Qud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgLy8gICAgIGRlc3QuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBkZXN0O1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gaW5mbGF0ZTogZnVuY3Rpb24gKGR4LCBkeSkge1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuaW5mbGF0ZSh0aGlzLCBkeCwgZHkpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gc2l6ZTogZnVuY3Rpb24gKG91dHB1dCkge1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuc2l6ZSh0aGlzLCBvdXRwdXQpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gY2xvbmU6IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNsb25lKHRoaXMsIG91dHB1dCk7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zKHRoaXMsIHgsIHkpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gY29udGFpbnNSZWN0OiBmdW5jdGlvbiAoYikge1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuY29udGFpbnNSZWN0KGIsIHRoaXMpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gZXF1YWxzOiBmdW5jdGlvbiAoYikge1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuZXF1YWxzKHRoaXMsIGIpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gaW50ZXJzZWN0aW9uOiBmdW5jdGlvbiAoYiwgb3V0KSB7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5pbnRlcnNlY3Rpb24odGhpcywgYiwgb3V0KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuXHJcbiAgICBpbnRlcnNlY3RzOiBmdW5jdGlvbiAoYikge1xyXG5cclxuICAgICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0cyh0aGlzLCBiKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGludGVyc2VjdHNSYXc6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHRvbGVyYW5jZSkge1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0c1Jhdyh0aGlzLCBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHRvbGVyYW5jZSk7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyB1bmlvbjogZnVuY3Rpb24gKGIsIG91dCkge1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUudW5pb24odGhpcywgYiwgb3V0KTtcclxuXHJcbiAgICAvLyB9XHJcblxyXG59O1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJoYWxmV2lkdGhcIiwge1xyXG5cclxuLy8gICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHRoaXMud2lkdGggLyAyKTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJoYWxmSGVpZ2h0XCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLmhlaWdodCAvIDIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLnkpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdmFsdWUgLSB0aGlzLnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcImJvdHRvbVJpZ2h0XCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gbmV3IFRpbnkuUG9pbnQodGhpcy5yaWdodCwgdGhpcy5ib3R0b20pO1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4vLyAgICAgICAgIHRoaXMucmlnaHQgPSB2YWx1ZS54O1xyXG4vLyAgICAgICAgIHRoaXMuYm90dG9tID0gdmFsdWUueTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy54O1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4vLyAgICAgICAgIGlmICh2YWx1ZSA+PSB0aGlzLnJpZ2h0KSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLnJpZ2h0IC0gdmFsdWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHRoaXMueCA9IHZhbHVlO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPD0gdGhpcy54KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB2YWx1ZSAtIHRoaXMueDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwidm9sdW1lXCIsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInBlcmltZXRlclwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuICh0aGlzLndpZHRoICogMikgKyAodGhpcy5oZWlnaHQgKiAyKTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJjZW50ZXJYXCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy5oYWxmV2lkdGg7XHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbi8vICAgICAgICAgdGhpcy54ID0gdmFsdWUgLSB0aGlzLmhhbGZXaWR0aDtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJjZW50ZXJZXCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oYWxmSGVpZ2h0O1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4vLyAgICAgICAgIHRoaXMueSA9IHZhbHVlIC0gdGhpcy5oYWxmSGVpZ2h0O1xyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInJhbmRvbVhcIiwge1xyXG5cclxuLy8gICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG5cclxuLy8gICAgICAgICByZXR1cm4gdGhpcy54ICsgKE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoKTtcclxuXHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwicmFuZG9tWVwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnkgKyAoTWF0aC5yYW5kb20oKSAqIHRoaXMuaGVpZ2h0KTtcclxuXHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwidG9wXCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy55O1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4vLyAgICAgICAgIGlmICh2YWx1ZSA+PSB0aGlzLmJvdHRvbSkge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IDA7XHJcbi8vICAgICAgICAgICAgIHRoaXMueSA9IHZhbHVlO1xyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gKHRoaXMuYm90dG9tIC0gdmFsdWUpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJ0b3BMZWZ0XCIsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gbmV3IFRpbnkuUG9pbnQodGhpcy54LCB0aGlzLnkpO1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4vLyAgICAgICAgIHRoaXMueCA9IHZhbHVlLng7XHJcbi8vICAgICAgICAgdGhpcy55ID0gdmFsdWUueTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJ0b3BSaWdodFwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIG5ldyBUaW55LlBvaW50KHRoaXMueCArIHRoaXMud2lkdGgsIHRoaXMueSk7XHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbi8vICAgICAgICAgdGhpcy5yaWdodCA9IHZhbHVlLng7XHJcbi8vICAgICAgICAgdGhpcy55ID0gdmFsdWUueTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pO1xyXG5cclxuLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJlbXB0eVwiLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuICghdGhpcy53aWR0aCB8fCAhdGhpcy5oZWlnaHQpO1xyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cclxuLy8gICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpXHJcbi8vICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICB0aGlzLnNldFRvKDAsIDAsIDAsIDApO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmVjdGFuZ2xlO1xyXG5cclxuLy8gVGlueS5SZWN0YW5nbGUuaW5mbGF0ZSA9IGZ1bmN0aW9uIChhLCBkeCwgZHkpIHtcclxuXHJcbi8vICAgICBhLnggLT0gZHg7XHJcbi8vICAgICBhLndpZHRoICs9IDIgKiBkeDtcclxuLy8gICAgIGEueSAtPSBkeTtcclxuLy8gICAgIGEuaGVpZ2h0ICs9IDIgKiBkeTtcclxuXHJcbi8vICAgICByZXR1cm4gYTtcclxuXHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS5pbmZsYXRlUG9pbnQgPSBmdW5jdGlvbiAoYSwgcG9pbnQpIHtcclxuXHJcbi8vICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuaW5mbGF0ZShhLCBwb2ludC54LCBwb2ludC55KTtcclxuXHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS5zaXplID0gZnVuY3Rpb24gKGEsIG91dHB1dCkge1xyXG5cclxuLy8gICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiIHx8IG91dHB1dCA9PT0gbnVsbClcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5Qb2ludChhLndpZHRoLCBhLmhlaWdodCk7XHJcbi8vICAgICB9XHJcbi8vICAgICBlbHNlXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgb3V0cHV0LnNldFRvKGEud2lkdGgsIGEuaGVpZ2h0KTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZXR1cm4gb3V0cHV0O1xyXG5cclxuLy8gfTtcclxuXHJcbi8vIFRpbnkuUmVjdGFuZ2xlLmNsb25lID0gZnVuY3Rpb24gKGEsIG91dHB1dCkge1xyXG5cclxuLy8gICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiIHx8IG91dHB1dCA9PT0gbnVsbClcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5SZWN0YW5nbGUoYS54LCBhLnksIGEud2lkdGgsIGEuaGVpZ2h0KTtcclxuLy8gICAgIH1cclxuLy8gICAgIGVsc2VcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBvdXRwdXQuc2V0VG8oYS54LCBhLnksIGEud2lkdGgsIGEuaGVpZ2h0KTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZXR1cm4gb3V0cHV0O1xyXG5cclxuLy8gfTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGEsIHgsIHkpIHtcclxuXHJcbiAgICBpZiAoYS53aWR0aCA8PSAwIHx8IGEuaGVpZ2h0IDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoeCA+PSBhLnggJiYgeCA8IGEucmlnaHQgJiYgeSA+PSBhLnkgJiYgeSA8IGEuYm90dG9tKTtcclxuXHJcbn07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS5jb250YWluc1JhdyA9IGZ1bmN0aW9uIChyeCwgcnksIHJ3LCByaCwgeCwgeSkge1xyXG5cclxuLy8gICAgIHJldHVybiAoeCA+PSByeCAmJiB4IDwgKHJ4ICsgcncpICYmIHkgPj0gcnkgJiYgeSA8IChyeSArIHJoKSk7XHJcblxyXG4vLyB9O1xyXG5cclxuVGlueS5SZWN0YW5nbGUuY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uIChhLCBwb2ludCkge1xyXG5cclxuICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jb250YWlucyhhLCBwb2ludC54LCBwb2ludC55KTtcclxuXHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWluc1JlY3QgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cclxuICAgIC8vICBJZiB0aGUgZ2l2ZW4gcmVjdCBoYXMgYSBsYXJnZXIgdm9sdW1lIHRoYW4gdGhpcyBvbmUgdGhlbiBpdCBjYW4gbmV2ZXIgY29udGFpbiBpdFxyXG4gICAgaWYgKGEudm9sdW1lID4gYi52b2x1bWUpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoYS54ID49IGIueCAmJiBhLnkgPj0gYi55ICYmIGEucmlnaHQgPCBiLnJpZ2h0ICYmIGEuYm90dG9tIDwgYi5ib3R0b20pO1xyXG5cclxufTtcclxuXHJcbi8vIFRpbnkuUmVjdGFuZ2xlLmVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblxyXG4vLyAgICAgcmV0dXJuIChhLnggPT0gYi54ICYmIGEueSA9PSBiLnkgJiYgYS53aWR0aCA9PSBiLndpZHRoICYmIGEuaGVpZ2h0ID09IGIuaGVpZ2h0KTtcclxuXHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS5zYW1lRGltZW5zaW9ucyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblxyXG4vLyAgICAgcmV0dXJuIChhLndpZHRoID09PSBiLndpZHRoICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCk7XHJcblxyXG4vLyB9O1xyXG5cclxuLy8gVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKGEsIGIsIG91dHB1dCkge1xyXG5cclxuLy8gICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIG91dHB1dCA9IG5ldyBUaW55LlJlY3RhbmdsZSgpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGlmIChUaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzKGEsIGIpKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIG91dHB1dC54ID0gTWF0aC5tYXgoYS54LCBiLngpO1xyXG4vLyAgICAgICAgIG91dHB1dC55ID0gTWF0aC5tYXgoYS55LCBiLnkpO1xyXG4vLyAgICAgICAgIG91dHB1dC53aWR0aCA9IE1hdGgubWluKGEucmlnaHQsIGIucmlnaHQpIC0gb3V0cHV0Lng7XHJcbi8vICAgICAgICAgb3V0cHV0LmhlaWdodCA9IE1hdGgubWluKGEuYm90dG9tLCBiLmJvdHRvbSkgLSBvdXRwdXQueTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZXR1cm4gb3V0cHV0O1xyXG5cclxuLy8gfTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cclxuICAgIGlmIChhLndpZHRoIDw9IDAgfHwgYS5oZWlnaHQgPD0gMCB8fCBiLndpZHRoIDw9IDAgfHwgYi5oZWlnaHQgPD0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICEoYS5yaWdodCA8IGIueCB8fCBhLmJvdHRvbSA8IGIueSB8fCBhLnggPiBiLnJpZ2h0IHx8IGEueSA+IGIuYm90dG9tKTtcclxuXHJcbn07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzUmF3ID0gZnVuY3Rpb24gKGEsIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgdG9sZXJhbmNlKSB7XHJcblxyXG4vLyAgICAgaWYgKHR5cGVvZiB0b2xlcmFuY2UgPT09IFwidW5kZWZpbmVkXCIpIHsgdG9sZXJhbmNlID0gMDsgfVxyXG5cclxuLy8gICAgIHJldHVybiAhKGxlZnQgPiBhLnJpZ2h0ICsgdG9sZXJhbmNlIHx8IHJpZ2h0IDwgYS5sZWZ0IC0gdG9sZXJhbmNlIHx8IHRvcCA+IGEuYm90dG9tICsgdG9sZXJhbmNlIHx8IGJvdHRvbSA8IGEudG9wIC0gdG9sZXJhbmNlKTtcclxuXHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlJlY3RhbmdsZS51bmlvbiA9IGZ1bmN0aW9uIChhLCBiLCBvdXRwdXQpIHtcclxuXHJcbi8vICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJ1bmRlZmluZWRcIilcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBvdXRwdXQgPSBuZXcgVGlueS5SZWN0YW5nbGUoKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZXR1cm4gb3V0cHV0LnNldFRvKE1hdGgubWluKGEueCwgYi54KSwgTWF0aC5taW4oYS55LCBiLnkpLCBNYXRoLm1heChhLnJpZ2h0LCBiLnJpZ2h0KSAtIE1hdGgubWluKGEubGVmdCwgYi5sZWZ0KSwgTWF0aC5tYXgoYS5ib3R0b20sIGIuYm90dG9tKSAtIE1hdGgubWluKGEudG9wLCBiLnRvcCkpO1xyXG5cclxuLy8gfTtcclxuXHJcbi8vIFRpbnkuUmVjdGFuZ2xlLmFhYmIgPSBmdW5jdGlvbihwb2ludHMsIG91dCkge1xyXG5cclxuLy8gICAgIGlmICh0eXBlb2Ygb3V0ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbi8vICAgICAgICAgb3V0ID0gbmV3IFRpbnkuUmVjdGFuZ2xlKCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgdmFyIHhNYXggPSBOdW1iZXIuTUlOX1ZBTFVFLFxyXG4vLyAgICAgICAgIHhNaW4gPSBOdW1iZXIuTUFYX1ZBTFVFLFxyXG4vLyAgICAgICAgIHlNYXggPSBOdW1iZXIuTUlOX1ZBTFVFLFxyXG4vLyAgICAgICAgIHlNaW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuLy8gICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHBvaW50KSB7XHJcbi8vICAgICAgICAgaWYgKHBvaW50LnggPiB4TWF4KSB7XHJcbi8vICAgICAgICAgICAgIHhNYXggPSBwb2ludC54O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBpZiAocG9pbnQueCA8IHhNaW4pIHtcclxuLy8gICAgICAgICAgICAgeE1pbiA9IHBvaW50Lng7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBpZiAocG9pbnQueSA+IHlNYXgpIHtcclxuLy8gICAgICAgICAgICAgeU1heCA9IHBvaW50Lnk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGlmIChwb2ludC55IDwgeU1pbikge1xyXG4vLyAgICAgICAgICAgICB5TWluID0gcG9pbnQueTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICBvdXQuc2V0VG8oeE1pbiwgeU1pbiwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKTtcclxuXHJcbi8vICAgICByZXR1cm4gb3V0O1xyXG4vLyB9O1xyXG5cclxuVGlueS5FbXB0eVJlY3RhbmdsZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAwLCAwKTsiLCJUaW55LlJvdW5kZWRSZWN0YW5nbGUgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbntcclxuXHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cyB8fCAyMDtcclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SUkVDO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLnJhZGl1cyk7XHJcbn07XHJcblxyXG5UaW55LlJvdW5kZWRSZWN0YW5nbGUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oeCwgeSlcclxue1xyXG4gICAgaWYgKHRoaXMud2lkdGggPD0gMCB8fCB0aGlzLmhlaWdodCA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeDEgPSB0aGlzLng7XHJcblxyXG4gICAgaWYgKHggPj0geDEgJiYgeCA8PSB4MSArIHRoaXMud2lkdGgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHkxID0gdGhpcy55O1xyXG5cclxuICAgICAgICBpZiAoeSA+PSB5MSAmJiB5IDw9IHkxICsgdGhpcy5oZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5Sb3VuZGVkUmVjdGFuZ2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUm91bmRlZFJlY3RhbmdsZTsiLCJUaW55LkdyYXBoaWNzRGF0YSA9IGZ1bmN0aW9uKGxpbmVXaWR0aCwgbGluZUNvbG9yLCBsaW5lQWxwaGEsIGZpbGxDb2xvciwgZmlsbEFscGhhLCBmaWxsLCBzaGFwZSkge1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcbiAgICB0aGlzLmxpbmVDb2xvciA9IGxpbmVDb2xvcjtcclxuICAgIHRoaXMubGluZUFscGhhID0gbGluZUFscGhhO1xyXG4gICAgdGhpcy5fbGluZVRpbnQgPSBsaW5lQ29sb3I7XHJcbiAgICB0aGlzLmZpbGxDb2xvciA9IGZpbGxDb2xvcjtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gZmlsbEFscGhhO1xyXG4gICAgdGhpcy5fZmlsbFRpbnQgPSBmaWxsQ29sb3I7XHJcbiAgICB0aGlzLmZpbGwgPSBmaWxsO1xyXG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xyXG4gICAgdGhpcy50eXBlID0gc2hhcGUudHlwZTtcclxuXHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzRGF0YS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkdyYXBoaWNzRGF0YTtcclxuXHJcblRpbnkuR3JhcGhpY3NEYXRhLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgR3JhcGhpY3NEYXRhKFxyXG4gICAgICAgIHRoaXMubGluZVdpZHRoLFxyXG4gICAgICAgIHRoaXMubGluZUNvbG9yLFxyXG4gICAgICAgIHRoaXMubGluZUFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbENvbG9yLFxyXG4gICAgICAgIHRoaXMuZmlsbEFscGhhLFxyXG4gICAgICAgIHRoaXMuZmlsbCxcclxuICAgICAgICB0aGlzLnNoYXBlXHJcbiAgICApO1xyXG5cclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLmZpbGxBbHBoYSA9IDE7XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IDA7XHJcbiAgICB0aGlzLmxpbmVDb2xvciA9IDA7XHJcbiAgICB0aGlzLmdyYXBoaWNzRGF0YSA9IFtdO1xyXG4gICAgdGhpcy50aW50ID0gMHhGRkZGRkY7XHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuICAgIHRoaXMuY3VycmVudFBhdGggPSBudWxsO1xyXG4gICAgdGhpcy5fd2ViR0wgPSBbXTtcclxuICAgIHRoaXMuaXNNYXNrID0gZmFsc2U7XHJcbiAgICB0aGlzLmJvdW5kc1BhZGRpbmcgPSAwO1xyXG5cclxuICAgIHRoaXMuX2xvY2FsQm91bmRzID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsMCwxLDEpO1xyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IGZhbHNlO1xyXG5cclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSApO1xyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuR3JhcGhpY3M7XHJcblxyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUubGluZVN0eWxlID0gZnVuY3Rpb24obGluZVdpZHRoLCBjb2xvciwgYWxwaGEpXHJcbntcclxuICAgIHRoaXMubGluZVdpZHRoID0gbGluZVdpZHRoIHx8IDA7XHJcbiAgICB0aGlzLmxpbmVDb2xvciA9IGNvbG9yIHx8IDA7XHJcbiAgICB0aGlzLmxpbmVBbHBoYSA9IChhbHBoYSA9PT0gdW5kZWZpbmVkKSA/IDEgOiBhbHBoYTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGF0aClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gaGFsZndheSB0aHJvdWdoIGEgbGluZT8gc3RhcnQgYSBuZXcgb25lIVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5Qb2x5Z29uKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLnNsaWNlKC0yKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgaXRzIGVtcHR5IHNvIGxldHMganVzdCBzZXQgdGhlIGxpbmUgcHJvcGVydGllc1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVXaWR0aCA9IHRoaXMubGluZVdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVDb2xvciA9IHRoaXMubGluZUNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLmxpbmVBbHBoYSA9IHRoaXMubGluZUFscGhhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uKHgsIHkpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LlBvbHlnb24oW3gsIHldKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5saW5lVG8gPSBmdW5jdGlvbih4LCB5KVxyXG57XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMucHVzaCh4LCB5KTtcclxuICAgIHRoaXMuX2JvdW5kc0RpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2FjaGVkU3ByaXRlRGlydHkgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUucXVhZHJhdGljQ3VydmVUbyA9IGZ1bmN0aW9uKGNwWCwgY3BZLCB0b1gsIHRvWSlcclxue1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzID0gWzAsIDBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVUbygwLDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB4YSxcclxuICAgICAgICB5YSxcclxuICAgICAgICBuID0gMjAsXHJcbiAgICAgICAgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHM7XHJcblxyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZyb21YID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXTtcclxuICAgIHZhciBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV07XHJcbiAgICB2YXIgaiA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyArK2kpXHJcbiAgICB7XHJcbiAgICAgICAgaiA9IGkgLyBuO1xyXG5cclxuICAgICAgICB4YSA9IGZyb21YICsgKCAoY3BYIC0gZnJvbVgpICogaiApO1xyXG4gICAgICAgIHlhID0gZnJvbVkgKyAoIChjcFkgLSBmcm9tWSkgKiBqICk7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKCB4YSArICggKChjcFggKyAoICh0b1ggLSBjcFgpICogaiApKSAtIHhhKSAqIGogKSxcclxuICAgICAgICAgICAgICAgICAgICAgeWEgKyAoICgoY3BZICsgKCAodG9ZIC0gY3BZKSAqIGogKSkgLSB5YSkgKiBqICkgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmJlemllckN1cnZlVG8gPSBmdW5jdGlvbihjcFgsIGNwWSwgY3BYMiwgY3BZMiwgdG9YLCB0b1kpXHJcbntcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cyA9IFswLCAwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oMCwwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbiA9IDIwLFxyXG4gICAgICAgIGR0LFxyXG4gICAgICAgIGR0MixcclxuICAgICAgICBkdDMsXHJcbiAgICAgICAgdDIsXHJcbiAgICAgICAgdDMsXHJcbiAgICAgICAgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHM7XHJcblxyXG4gICAgdmFyIGZyb21YID0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl07XHJcbiAgICB2YXIgZnJvbVkgPSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXTtcclxuICAgIHZhciBqID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyArK2kpXHJcbiAgICB7XHJcbiAgICAgICAgaiA9IGkgLyBuO1xyXG5cclxuICAgICAgICBkdCA9ICgxIC0gaik7XHJcbiAgICAgICAgZHQyID0gZHQgKiBkdDtcclxuICAgICAgICBkdDMgPSBkdDIgKiBkdDtcclxuXHJcbiAgICAgICAgdDIgPSBqICogajtcclxuICAgICAgICB0MyA9IHQyICogajtcclxuICAgICAgICBcclxuICAgICAgICBwb2ludHMucHVzaCggZHQzICogZnJvbVggKyAzICogZHQyICogaiAqIGNwWCArIDMgKiBkdCAqIHQyICogY3BYMiArIHQzICogdG9YLFxyXG4gICAgICAgICAgICAgICAgICAgICBkdDMgKiBmcm9tWSArIDMgKiBkdDIgKiBqICogY3BZICsgMyAqIGR0ICogdDIgKiBjcFkyICsgdDMgKiB0b1kpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmFyY1RvID0gZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIsIHJhZGl1cylcclxue1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhdGgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguc2hhcGUucG9pbnRzLnB1c2goeDEsIHkxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oeDEsIHkxKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMsXHJcbiAgICAgICAgZnJvbVggPSBwb2ludHNbcG9pbnRzLmxlbmd0aC0yXSxcclxuICAgICAgICBmcm9tWSA9IHBvaW50c1twb2ludHMubGVuZ3RoLTFdLFxyXG4gICAgICAgIGExID0gZnJvbVkgLSB5MSxcclxuICAgICAgICBiMSA9IGZyb21YIC0geDEsXHJcbiAgICAgICAgYTIgPSB5MiAgIC0geTEsXHJcbiAgICAgICAgYjIgPSB4MiAgIC0geDEsXHJcbiAgICAgICAgbW0gPSBNYXRoLmFicyhhMSAqIGIyIC0gYjEgKiBhMik7XHJcblxyXG4gICAgaWYgKG1tIDwgMS4wZS04IHx8IHJhZGl1cyA9PT0gMClcclxuICAgIHtcclxuICAgICAgICBpZiAocG9pbnRzW3BvaW50cy5sZW5ndGgtMl0gIT09IHgxIHx8IHBvaW50c1twb2ludHMubGVuZ3RoLTFdICE9PSB5MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHgxLCB5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkZCA9IGExICogYTEgKyBiMSAqIGIxLFxyXG4gICAgICAgICAgICBjYyA9IGEyICogYTIgKyBiMiAqIGIyLFxyXG4gICAgICAgICAgICB0dCA9IGExICogYTIgKyBiMSAqIGIyLFxyXG4gICAgICAgICAgICBrMSA9IHJhZGl1cyAqIE1hdGguc3FydChkZCkgLyBtbSxcclxuICAgICAgICAgICAgazIgPSByYWRpdXMgKiBNYXRoLnNxcnQoY2MpIC8gbW0sXHJcbiAgICAgICAgICAgIGoxID0gazEgKiB0dCAvIGRkLFxyXG4gICAgICAgICAgICBqMiA9IGsyICogdHQgLyBjYyxcclxuICAgICAgICAgICAgY3ggPSBrMSAqIGIyICsgazIgKiBiMSxcclxuICAgICAgICAgICAgY3kgPSBrMSAqIGEyICsgazIgKiBhMSxcclxuICAgICAgICAgICAgcHggPSBiMSAqIChrMiArIGoxKSxcclxuICAgICAgICAgICAgcHkgPSBhMSAqIChrMiArIGoxKSxcclxuICAgICAgICAgICAgcXggPSBiMiAqIChrMSArIGoyKSxcclxuICAgICAgICAgICAgcXkgPSBhMiAqIChrMSArIGoyKSxcclxuICAgICAgICAgICAgc3RhcnRBbmdsZSA9IE1hdGguYXRhbjIocHkgLSBjeSwgcHggLSBjeCksXHJcbiAgICAgICAgICAgIGVuZEFuZ2xlICAgPSBNYXRoLmF0YW4yKHF5IC0gY3ksIHF4IC0gY3gpO1xyXG5cclxuICAgICAgICB0aGlzLmFyYyhjeCArIHgxLCBjeSArIHkxLCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBiMSAqIGEyID4gYjIgKiBhMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5hcmMgPSBmdW5jdGlvbihjeCwgY3ksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGFudGljbG9ja3dpc2UpXHJcbntcclxuICAgIC8vICBJZiB3ZSBkbyB0aGlzIHdlIGNhbiBuZXZlciBkcmF3IGEgZnVsbCBjaXJjbGVcclxuICAgIGlmIChzdGFydEFuZ2xlID09PSBlbmRBbmdsZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGFudGljbG9ja3dpc2UgPT09ICd1bmRlZmluZWQnKSB7IGFudGljbG9ja3dpc2UgPSBmYWxzZTsgfVxyXG5cclxuICAgIGlmICghYW50aWNsb2Nrd2lzZSAmJiBlbmRBbmdsZSA8PSBzdGFydEFuZ2xlKVxyXG4gICAge1xyXG4gICAgICAgIGVuZEFuZ2xlICs9IE1hdGguUEkgKiAyO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYW50aWNsb2Nrd2lzZSAmJiBzdGFydEFuZ2xlIDw9IGVuZEFuZ2xlKVxyXG4gICAge1xyXG4gICAgICAgIHN0YXJ0QW5nbGUgKz0gTWF0aC5QSSAqIDI7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN3ZWVwID0gYW50aWNsb2Nrd2lzZSA/IChzdGFydEFuZ2xlIC0gZW5kQW5nbGUpICogLTEgOiAoZW5kQW5nbGUgLSBzdGFydEFuZ2xlKTtcclxuICAgIHZhciBzZWdzID0gIE1hdGguY2VpbChNYXRoLmFicyhzd2VlcCkgLyAoTWF0aC5QSSAqIDIpKSAqIDQwO1xyXG5cclxuICAgIC8vICBTd2VlcCBjaGVjayAtIG1vdmVkIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGRvIHRoZSBtb3ZlVG8gYmVsb3cgaWYgdGhlIGFyYyBmYWlsc1xyXG4gICAgaWYgKHN3ZWVwID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFydFggPSBjeCArIE1hdGguY29zKHN0YXJ0QW5nbGUpICogcmFkaXVzO1xyXG4gICAgdmFyIHN0YXJ0WSA9IGN5ICsgTWF0aC5zaW4oc3RhcnRBbmdsZSkgKiByYWRpdXM7XHJcblxyXG4gICAgaWYgKGFudGljbG9ja3dpc2UgJiYgdGhpcy5maWxsaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKGN4LCBjeSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBjdXJyZW50UGF0aCB3aWxsIGFsd2F5cyBleGlzdCBhZnRlciBjYWxsaW5nIGEgbW92ZVRvXHJcbiAgICB2YXIgcG9pbnRzID0gdGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHM7XHJcblxyXG4gICAgdmFyIHRoZXRhID0gc3dlZXAgLyAoc2VncyAqIDIpO1xyXG4gICAgdmFyIHRoZXRhMiA9IHRoZXRhICogMjtcclxuXHJcbiAgICB2YXIgY1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xyXG4gICAgdmFyIHNUaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcclxuICAgIFxyXG4gICAgdmFyIHNlZ01pbnVzID0gc2VncyAtIDE7XHJcblxyXG4gICAgdmFyIHJlbWFpbmRlciA9IChzZWdNaW51cyAlIDEpIC8gc2VnTWludXM7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gc2VnTWludXM7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVhbCA9ICBpICsgcmVtYWluZGVyICogaTtcclxuICAgIFxyXG4gICAgICAgIHZhciBhbmdsZSA9ICgodGhldGEpICsgc3RhcnRBbmdsZSArICh0aGV0YTIgKiByZWFsKSk7XHJcblxyXG4gICAgICAgIHZhciBjID0gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgIHZhciBzID0gLU1hdGguc2luKGFuZ2xlKTtcclxuXHJcbiAgICAgICAgcG9pbnRzLnB1c2goKCAoY1RoZXRhICogIGMpICsgKHNUaGV0YSAqIHMpICkgKiByYWRpdXMgKyBjeCxcclxuICAgICAgICAgICAgICAgICAgICAoIChjVGhldGEgKiAtcykgKyAoc1RoZXRhICogYykgKSAqIHJhZGl1cyArIGN5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmJlZ2luRmlsbCA9IGZ1bmN0aW9uKGNvbG9yLCBhbHBoYSlcclxue1xyXG4gICAgdGhpcy5maWxsaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gY29sb3IgfHwgMDtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gKGFscGhhID09PSB1bmRlZmluZWQpID8gMSA6IGFscGhhO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoLnNoYXBlLnBvaW50cy5sZW5ndGggPD0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhdGguZmlsbCA9IHRoaXMuZmlsbGluZztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5maWxsQ29sb3IgPSB0aGlzLmZpbGxDb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGF0aC5maWxsQWxwaGEgPSB0aGlzLmZpbGxBbHBoYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5lbmRGaWxsID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmZpbGxpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsbENvbG9yID0gbnVsbDtcclxuICAgIHRoaXMuZmlsbEFscGhhID0gMTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSZWN0ID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodClcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdCA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cylcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUm91bmRlZFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdSb3VuZGVkUmVjdDIgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpXHJcbnsgICBcclxuICAgIHZhciBzaGFwZSA9IG5ldyBUaW55LlJvdW5kZWRSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzKVxyXG4gICAgc2hhcGUudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOO1xyXG4gICAgdGhpcy5kcmF3U2hhcGUoc2hhcGUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdDaXJjbGUgPSBmdW5jdGlvbih4LCB5LCBkaWFtZXRlcilcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuQ2lyY2xlKHgsIHksIGRpYW1ldGVyKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3RWxsaXBzZSA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LkVsbGlwc2UoeCwgeSwgd2lkdGgsIGhlaWdodCkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1BvbHlnb24gPSBmdW5jdGlvbihwYXRoKVxyXG57XHJcbiAgICAvLyBwcmV2ZW50cyBhbiBhcmd1bWVudCBhc3NpZ25tZW50IGRlb3B0XHJcbiAgICAvLyBzZWUgc2VjdGlvbiAzLjE6IGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzLW1hbmFnaW5nLWFyZ3VtZW50c1xyXG4gICAgdmFyIHBvaW50cyA9IHBhdGg7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBvaW50cykpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gcHJldmVudHMgYW4gYXJndW1lbnQgbGVhayBkZW9wdFxyXG4gICAgICAgIC8vIHNlZSBzZWN0aW9uIDMuMjogaHR0cHM6Ly9naXRodWIuY29tL3BldGthYW50b25vdi9ibHVlYmlyZC93aWtpL09wdGltaXphdGlvbi1raWxsZXJzIzMtbWFuYWdpbmctYXJndW1lbnRzXHJcbiAgICAgICAgcG9pbnRzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7ICsraSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvaW50c1tpXSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuUG9seWdvbihwb2ludHMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmxpbmVXaWR0aCA9IDA7XHJcbiAgICB0aGlzLmZpbGxpbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlZFNwcml0ZURpcnR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhID0gW107XHJcbiAgICB0aGlzLnVwZGF0ZUxvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRlc3Ryb3lDaGlsZHJlbilcclxue1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGktLSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxufTtcclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmdlbmVyYXRlVGV4dHVyZSA9IGZ1bmN0aW9uKHJlc29sdXRpb24sIHNjYWxlTW9kZSlcclxue1xyXG4gICAgcmVzb2x1dGlvbiA9IHJlc29sdXRpb24gfHwgMTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcclxuICAgXHJcbiAgICB2YXIgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKGJvdW5kcy53aWR0aCAqIHJlc29sdXRpb24sIGJvdW5kcy5oZWlnaHQgKiByZXNvbHV0aW9uKTtcclxuICAgIFxyXG4gICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXNCdWZmZXIuY2FudmFzLCBzY2FsZU1vZGUpO1xyXG4gICAgdGV4dHVyZS5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC5zY2FsZShyZXNvbHV0aW9uLCByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC50cmFuc2xhdGUoLWJvdW5kcy54LC1ib3VuZHMueSk7XHJcbiAgICBcclxuICAgIFRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcywgY2FudmFzQnVmZmVyLmNvbnRleHQpO1xyXG5cclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuX3JlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLmlzTWFzayA9PT0gdHJ1ZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGhlIHRpbnQgaGFzIGNoYW5nZWQsIHNldCB0aGUgZ3JhcGhpY3Mgb2JqZWN0IHRvIGRpcnR5LlxyXG4gICAgaWYgKHRoaXMuX3ByZXZUaW50ICE9PSB0aGlzLnRpbnQpIHtcclxuICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcHJldlRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkU3ByaXRlRGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICBcclxuICAgICAgICAgICAgLy8gd2Ugd2lsbCBhbHNvIG5lZWQgdG8gdXBkYXRlIHRoZSB0ZXh0dXJlXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZHNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFscGhhID0gdGhpcy5hbHBoYTtcclxuICAgICAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUuX3JlbmRlckNhbnZhcy5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSwgcmVuZGVyU2Vzc2lvbik7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuICAgICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICBjb250ZXh0LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5jICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHkgKiByZXNvbHV0aW9uKTtcclxuXHJcbiAgICAgICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgIC8vIHNpbXBsZSByZW5kZXIgY2hpbGRyZW4hXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5fcmVuZGVyQ2FudmFzKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obWF0cml4KVxyXG57XHJcbiAgICBpZighdGhpcy5fY3VycmVudEJvdW5kcyB8fCB0aGlzLl9ib3VuZHNEaXJ0eSlcclxuICAgIHtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIGFuIGVtcHR5IG9iamVjdCBpZiB0aGUgaXRlbSBpcyBhIG1hc2shXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlbmRlcmFibGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2JvdW5kc0RpcnR5IClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxvY2FsQm91bmRzKCk7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbG9jYWxCb3VuZHM7XHJcblxyXG4gICAgdmFyIHcwID0gYm91bmRzLng7XHJcbiAgICB2YXIgdzEgPSBib3VuZHMud2lkdGggKyBib3VuZHMueDtcclxuXHJcbiAgICB2YXIgaDAgPSBib3VuZHMueTtcclxuICAgIHZhciBoMSA9IGJvdW5kcy5oZWlnaHQgKyBib3VuZHMueTtcclxuXHJcbiAgICB2YXIgd29ybGRUcmFuc2Zvcm0gPSBtYXRyaXggfHwgdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG5cclxuICAgIHZhciB4MSA9IGEgKiB3MSArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICB2YXIgeTIgPSBkICogaDEgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgIHZhciB4NCA9ICBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5NCA9ICBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IHgxO1xyXG4gICAgdmFyIG1heFkgPSB5MTtcclxuXHJcbiAgICB2YXIgbWluWCA9IHgxO1xyXG4gICAgdmFyIG1pblkgPSB5MTtcclxuXHJcbiAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgbWluWSA9IHkyIDwgbWluWSA/IHkyIDogbWluWTtcclxuICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICBtaW5ZID0geTQgPCBtaW5ZID8geTQgOiBtaW5ZO1xyXG5cclxuICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzLnggPSBtaW5YO1xyXG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Qm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uKCBwb2ludCApXHJcbntcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvaW50LCAgdGVtcFBvaW50KTtcclxuXHJcbiAgICB2YXIgZ3JhcGhpY3NEYXRhID0gdGhpcy5ncmFwaGljc0RhdGE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljc0RhdGFbaV07XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5maWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvbmx5IGRlYWwgd2l0aCBmaWxscy4uXHJcbiAgICAgICAgaWYgKGRhdGEuc2hhcGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIGRhdGEuc2hhcGUuY29udGFpbnMoIHRlbXBQb2ludC54LCB0ZW1wUG9pbnQueSApIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUudXBkYXRlTG9jYWxCb3VuZHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JhcGhpY3NEYXRhLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2hhcGUsIHBvaW50cywgeCwgeSwgdywgaDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gZGF0YS50eXBlO1xyXG4gICAgICAgICAgICB2YXIgbGluZVdpZHRoID0gZGF0YS5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVCB8fCB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQyB8fCB0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLnggLSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgeSA9IHNoYXBlLnkgLSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLndpZHRoICsgbGluZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgaCA9IHNoYXBlLmhlaWdodCArIGxpbmVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCA8IG1pblggPyB4IDogbWluWDtcclxuICAgICAgICAgICAgICAgIG1heFggPSB4ICsgdyA+IG1heFggPyB4ICsgdyA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluWSA9IHkgPCBtaW5ZID8geSA6IG1pblk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0geSArIGggPiBtYXhZID8geSArIGggOiBtYXhZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5DSVJDKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgICAgIHkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICAgICAgdyA9IHNoYXBlLnJhZGl1cyArIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUucmFkaXVzICsgbGluZVdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCAtIHcgPCBtaW5YID8geCAtIHcgOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGggPCBtaW5ZID8geSAtIGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBUaW55LlByaW1pdGl2ZXMuRUxJUClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeCA9IHNoYXBlLng7XHJcbiAgICAgICAgICAgICAgICB5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgICAgIHcgPSBzaGFwZS53aWR0aCArIGxpbmVXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICBoID0gc2hhcGUuaGVpZ2h0ICsgbGluZVdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5YID0geCAtIHcgPCBtaW5YID8geCAtIHcgOiBtaW5YO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggKyB3ID4gbWF4WCA/IHggKyB3IDogbWF4WDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5ZID0geSAtIGggPCBtaW5ZID8geSAtIGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgKyBoID4gbWF4WSA/IHkgKyBoIDogbWF4WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFBPTFkgLSBhc3N1bWVzIHBvaW50cyBhcmUgc2VxdWVudGlhbCwgbm90IFBvaW50IG9iamVjdHNcclxuICAgICAgICAgICAgICAgIHBvaW50cyA9IHNoYXBlLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBvaW50cy5sZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRzW2pdIGluc3RhbmNlb2YgVGlueS5Qb2ludClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb2ludHNbal0ueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBvaW50c1tqXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcG9pbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9pbnRzW2ogKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgcG9pbnRzLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHggLSBsaW5lV2lkdGggPCBtaW5YID8geCAtIGxpbmVXaWR0aCA6IG1pblg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHggKyBsaW5lV2lkdGggPiBtYXhYID8geCArIGxpbmVXaWR0aCA6IG1heFg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pblkgPSB5IC0gbGluZVdpZHRoIDwgbWluWSA/IHkgLSBsaW5lV2lkdGggOiBtaW5ZO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFkgPSB5ICsgbGluZVdpZHRoID4gbWF4WSA/IHkgKyBsaW5lV2lkdGggOiBtYXhZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIG1pblggPSAwO1xyXG4gICAgICAgIG1heFggPSAwO1xyXG4gICAgICAgIG1pblkgPSAwO1xyXG4gICAgICAgIG1heFkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYWRkaW5nID0gdGhpcy5ib3VuZHNQYWRkaW5nO1xyXG4gICAgXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy54ID0gbWluWCAtIHBhZGRpbmc7XHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy53aWR0aCA9IChtYXhYIC0gbWluWCkgKyBwYWRkaW5nICogMjtcclxuXHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy55ID0gbWluWSAtIHBhZGRpbmc7XHJcbiAgICB0aGlzLl9sb2NhbEJvdW5kcy5oZWlnaHQgPSAobWF4WSAtIG1pblkpICsgcGFkZGluZyAqIDI7XHJcbn07XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0J1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcihib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIgPSBjYW52YXNCdWZmZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5yZXNpemUoYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXZlcmFnZSB0aGUgYW5jaG9yIHRvIGFjY291bnQgZm9yIHRoZSBvZmZzZXQgb2YgdGhlIGVsZW1lbnRcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueCA9IC0oYm91bmRzLnggLyBib3VuZHMud2lkdGgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLShib3VuZHMueSAvIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dC5zYXZlKCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQudHJhbnNsYXRlKC1ib3VuZHMueCwgLWJvdW5kcy55KTtcclxuICAgIFxyXG4gICAgLy8gbWFrZSBzdXJlIHdlIHNldCB0aGUgYWxwaGEgb2YgdGhlIGdyYXBoaWNzIHRvIDEgZm9yIHRoZSByZW5kZXIuLiBcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgLy8gbm93IHJlbmRlciB0aGUgZ3JhcGhpYy4uXHJcbiAgICBUaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsIHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYWxwaGEgPSB0aGlzLmFscGhhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZXMgdGV4dHVyZSBzaXplIGJhc2VkIG9uIGNhbnZhcyBzaXplXHJcbiAqXHJcbiAqIEBtZXRob2QgdXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUudXBkYXRlQ2FjaGVkU3ByaXRlVGV4dHVyZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIGNhY2hlZFNwcml0ZSA9IHRoaXMuX2NhY2hlZFNwcml0ZTtcclxuICAgIHZhciB0ZXh0dXJlID0gY2FjaGVkU3ByaXRlLnRleHR1cmU7XHJcbiAgICB2YXIgY2FudmFzID0gY2FjaGVkU3ByaXRlLmJ1ZmZlci5jYW52YXM7XHJcblxyXG4gICAgdGV4dHVyZS5iYXNlVGV4dHVyZS53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRleHR1cmUuYmFzZVRleHR1cmUuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHRleHR1cmUuY3JvcC53aWR0aCA9IHRleHR1cmUuZnJhbWUud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICB0ZXh0dXJlLmNyb3AuaGVpZ2h0ID0gdGV4dHVyZS5mcmFtZS5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgIGNhY2hlZFNwcml0ZS5fd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBjYWNoZWRTcHJpdGUuX2hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBkaXJ0eSBiYXNlIHRleHR1cmVzXHJcbiAgICB0ZXh0dXJlLmJhc2VUZXh0dXJlLmRpcnR5KCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVzdHJveXMgYSBwcmV2aW91cyBjYWNoZWQgc3ByaXRlLlxyXG4gKlxyXG4gKiBAbWV0aG9kIGRlc3Ryb3lDYWNoZWRTcHJpdGVcclxuICovXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1NoYXBlID0gZnVuY3Rpb24oc2hhcGUpXHJcbntcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYXRoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNoZWNrIGN1cnJlbnQgcGF0aCFcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGF0aC5zaGFwZS5wb2ludHMubGVuZ3RoIDw9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50UGF0aCA9IG51bGw7XHJcblxyXG4gICAgLy8gIEhhbmRsZSBtaXhlZC10eXBlIHBvbHlnb25zXHJcbiAgICBpZiAoc2hhcGUgaW5zdGFuY2VvZiBUaW55LlBvbHlnb24pXHJcbiAgICB7XHJcbiAgICAgICAgc2hhcGUuZmxhdHRlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYXRhID0gbmV3IFRpbnkuR3JhcGhpY3NEYXRhKHRoaXMubGluZVdpZHRoLCB0aGlzLmxpbmVDb2xvciwgdGhpcy5saW5lQWxwaGEsIHRoaXMuZmlsbENvbG9yLCB0aGlzLmZpbGxBbHBoYSwgdGhpcy5maWxsaW5nLCBzaGFwZSk7XHJcbiAgICBcclxuICAgIHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2goZGF0YSk7XHJcblxyXG4gICAgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlBPTFkpXHJcbiAgICB7XHJcbiAgICAgICAgZGF0YS5zaGFwZS5jbG9zZWQgPSB0aGlzLmZpbGxpbmc7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGF0aCA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZWRTcHJpdGVEaXJ0eSA9IHRydWU7XHJcblxyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuR3JhcGhpY3MucHJvdG90eXBlLCBcImNhY2hlQXNCaXRtYXBcIiwge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5fYm91bmRzRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0pOyIsIlxyXG5UaW55LlNwcml0ZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSlcclxue1xyXG4gICAgVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dHVyZSh0ZXh0dXJlLCBrZXksIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLl93aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5faGVpZ2h0ID0gMDtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy50aW50ID0gMHhGRkZGRkY7XHJcblxyXG4gICAgdGhpcy5ibGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG4gICAgdGhpcy5zaGFkZXIgPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuaGFzTG9hZGVkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxufTtcclxuXHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpO1xyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNwcml0ZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdmcmFtZU5hbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlLmZyYW1lLm5hbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUuZnJhbWUubmFtZSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdmFsdWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ2ZyYW1lJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lXHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLm1heF9ub19mcmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHZhbHVlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9mcmFtZSA+IHRoaXMudGV4dHVyZS5tYXhfbm9fZnJhbWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZSA9IDBcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuVGV4dHVyZUNhY2hlW3RoaXMudGV4dHVyZS5rZXkgKyBcIl9cIiArIHRoaXMuX2ZyYW1lXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICd3aWR0aCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLnNjYWxlLnkgKiB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSwgdXBkYXRlRGltZW5zaW9uKVxyXG57XHJcbiAgICBpZiAodHlwZW9mIHRleHR1cmUgPT0gXCJzdHJpbmdcIikgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGltYWdlUGF0aCA9IHRleHR1cmU7XHJcblxyXG4gICAgICAgIGlmIChrZXkgIT0gdW5kZWZpbmVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGltYWdlUGF0aCA9IGltYWdlUGF0aCArIFwiX1wiICsga2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2ltYWdlUGF0aF1cclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FjaGUgRXJyb3I6IGltYWdlICcgKyBpbWFnZVBhdGggKyAnIGRvZXNgdCBmb3VuZCBpbiBjYWNoZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlID09PSB0ZXh0dXJlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgIHRoaXMuY2FjaGVkVGludCA9IDB4RkZGRkZGO1xyXG5cclxuICAgIGlmICh1cGRhdGVEaW1lbnNpb24gPT09IHRydWUpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUub25UZXh0dXJlVXBkYXRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAvLyBzbyBpZiBfd2lkdGggaXMgMCB0aGVuIHdpZHRoIHdhcyBub3Qgc2V0Li5cclxuICAgIGlmICh0aGlzLl93aWR0aCkgdGhpcy5zY2FsZS54ID0gdGhpcy5fd2lkdGggLyB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICBpZiAodGhpcy5faGVpZ2h0KSB0aGlzLnNjYWxlLnkgPSB0aGlzLl9oZWlnaHQgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLmFuaW1hdGUgPSBmdW5jdGlvbihkZWxheSlcclxue1xyXG4gICAgaWYgKHRoaXMudGV4dHVyZS5tYXhfbm9fZnJhbWUgJiYgdGhpcy50ZXh0dXJlLmZyYW1lLmluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhciBvX2RlbGF5ID0gZGVsYXkgfHwgKHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDApXHJcbiAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuZ2FtZS50aW1lci5sb29wKG9fZGVsYXksIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSArPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IGRlbGF5IHx8ICh0aGlzLnRleHR1cmUuZnJhbWUuZHVyYXRpb24gfHwgMTAwKVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0YXJ0KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IG9fZGVsYXlcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbihtYXRyaXgpXHJcbntcclxuICAgIHZhciB3aWR0aCA9IHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEtdGhpcy5hbmNob3IueCk7XHJcbiAgICB2YXIgdzEgPSB3aWR0aCAqIC10aGlzLmFuY2hvci54O1xyXG5cclxuICAgIHZhciBoMCA9IGhlaWdodCAqICgxLXRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gbWF0cml4IHx8IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIGlmIChiID09PSAwICYmIGMgPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgLy8gc2NhbGUgbWF5IGJlIG5lZ2F0aXZlIVxyXG4gICAgICAgIGlmIChhIDwgMCkgYSAqPSAtMTtcclxuICAgICAgICBpZiAoZCA8IDApIGQgKj0gLTE7XHJcblxyXG4gICAgICAgIC8vIHRoaXMgbWVhbnMgdGhlcmUgaXMgbm8gcm90YXRpb24gZ29pbmcgb24gcmlnaHQ/IFJJR0hUP1xyXG4gICAgICAgIC8vIGlmIHRoYXRzIHRoZSBjYXNlIHRoZW4gd2UgY2FuIGF2b2lkIGNoZWNraW5nIHRoZSBib3VuZCB2YWx1ZXMhIHlheSAgICAgICAgIFxyXG4gICAgICAgIG1pblggPSBhICogdzEgKyB0eDtcclxuICAgICAgICBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgIG1heFkgPSBkICogaDAgKyB0eTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDQgPSAgYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICAgICAgdmFyIHk0ID0gIGQgKiBoMCArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgICAgICBtaW5YID0geDEgPCBtaW5YID8geDEgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4MiA8IG1pblggPyB4MiA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgICAgICBtaW5ZID0geTEgPCBtaW5ZID8geTEgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5MiA8IG1pblkgPyB5MiA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTQgPCBtaW5ZID8geTQgOiBtaW5ZO1xyXG5cclxuICAgICAgICBtYXhYID0geDEgPiBtYXhYID8geDEgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHgzID4gbWF4WCA/IHgzIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDQgPiBtYXhYID8geDQgOiBtYXhYO1xyXG5cclxuICAgICAgICBtYXhZID0geTEgPiBtYXhZID8geTEgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5MiA+IG1heFkgPyB5MiA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLl9yZW5kZXJDYW52YXMgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICAvLyBJZiB0aGUgc3ByaXRlIGlzIG5vdCB2aXNpYmxlIG9yIHRoZSBhbHBoYSBpcyAwIHRoZW4gbm8gbmVlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwIHx8IHRoaXMucmVuZGVyYWJsZSA9PT0gZmFsc2UgfHwgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPD0gMCB8fCB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAgSWdub3JlIG51bGwgc291cmNlc1xyXG4gICAgaWYgKHRoaXMudGV4dHVyZS52YWxpZClcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uIC8gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIHRleHR1cmUgaXMgdHJpbW1lZCB3ZSBvZmZzZXQgYnkgdGhlIHRyaW0geC95LCBvdGhlcndpc2Ugd2UgdXNlIHRoZSBmcmFtZSBkaW1lbnNpb25zXHJcbiAgICAgICAgdmFyIGR4ID0gKHRoaXMudGV4dHVyZS50cmltKSA/IHRoaXMudGV4dHVyZS50cmltLnggLSB0aGlzLmFuY2hvci54ICogdGhpcy50ZXh0dXJlLnRyaW0ud2lkdGggOiB0aGlzLmFuY2hvci54ICogLXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB2YXIgZHkgPSAodGhpcy50ZXh0dXJlLnRyaW0pID8gdGhpcy50ZXh0dXJlLnRyaW0ueSAtIHRoaXMuYW5jaG9yLnkgKiB0aGlzLnRleHR1cmUudHJpbS5oZWlnaHQgOiB0aGlzLmFuY2hvci55ICogLXRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vICBBbGxvdyBmb3IgcGl4ZWwgcm91bmRpbmdcclxuICAgICAgICBpZiAocmVuZGVyU2Vzc2lvbi5yb3VuZFBpeGVscylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmQsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pIHwgMCk7XHJcbiAgICAgICAgICAgIGR4ID0gZHggfCAwO1xyXG4gICAgICAgICAgICBkeSA9IGR5IHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbnQgIT09IDB4RkZGRkZGKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkVGludCAhPT0gdGhpcy50aW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZFRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbnRlZFRleHR1cmUgPSBUaW55LkNhbnZhc1RpbnRlci5nZXRUaW50ZWRUZXh0dXJlKHRoaXMsIHRoaXMudGludCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW50ZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeSAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCAvIHJlc29sdXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBPVkVSV1JJVEVcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLl9yZW5kZXJDYW52YXMocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59OyIsIlxuVGlueS5UZXh0ID0gZnVuY3Rpb24odGV4dCwgc3R5bGUpXG57XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IDE7XG5cbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKHRoaXMuY2FudmFzKSk7XG5cbiAgICB0aGlzLnNldFRleHQodGV4dCk7XG4gICAgdGhpcy5zZXRTdHlsZShzdHlsZSk7XG5cbn07XG5cblRpbnkuVGV4dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuU3ByaXRlLnByb3RvdHlwZSk7XG5UaW55LlRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UZXh0O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgJ3dpZHRoJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYodGhpcy5kaXJ0eSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuICAgIH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmKHRoaXMuZGlydHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gIHRoaXMuc2NhbGUueSAqIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgfVxufSk7XG5cblRpbnkuVGV4dC5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbihzdHlsZSlcbntcbiAgICBzdHlsZSA9IHN0eWxlIHx8IHt9O1xuICAgIHN0eWxlLmZvbnQgPSBzdHlsZS5mb250IHx8ICdib2xkIDIwcHQgQXJpYWwnO1xuICAgIHN0eWxlLmZpbGwgPSBzdHlsZS5maWxsIHx8ICdibGFjayc7XG4gICAgc3R5bGUuYWxpZ24gPSBzdHlsZS5hbGlnbiB8fCAnbGVmdCc7XG4gICAgc3R5bGUuc3Ryb2tlID0gc3R5bGUuc3Ryb2tlIHx8ICdibGFjayc7XG4gICAgc3R5bGUuc3Ryb2tlVGhpY2tuZXNzID0gc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIHx8IDA7XG4gICAgc3R5bGUud29yZFdyYXAgPSBzdHlsZS53b3JkV3JhcCB8fCBmYWxzZTtcbiAgICBzdHlsZS5saW5lU3BhY2luZyA9IHN0eWxlLmxpbmVTcGFjaW5nIHx8IDBcbiAgICBzdHlsZS53b3JkV3JhcFdpZHRoID0gc3R5bGUud29yZFdyYXBXaWR0aCB8fCAxMDA7XG4gICAgXG4gICAgc3R5bGUuZHJvcFNoYWRvdyA9IHN0eWxlLmRyb3BTaGFkb3cgfHwgZmFsc2U7XG4gICAgc3R5bGUuZHJvcFNoYWRvd0FuZ2xlID0gc3R5bGUuZHJvcFNoYWRvd0FuZ2xlIHx8IE1hdGguUEkgLyA2O1xuICAgIHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSA9IHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSB8fCA0O1xuICAgIHN0eWxlLmRyb3BTaGFkb3dDb2xvciA9IHN0eWxlLmRyb3BTaGFkb3dDb2xvciB8fCAnYmxhY2snO1xuXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xufTtcblxuVGlueS5UZXh0LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24odGV4dClcbntcbiAgICB0aGlzLnRleHQgPSB0ZXh0LnRvU3RyaW5nKCkgfHwgJyAnO1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xufTtcblxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0ID0gZnVuY3Rpb24oKVxue1xuICAgIHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xuXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLnN0eWxlLmZvbnQ7XG5cbiAgICB2YXIgb3V0cHV0VGV4dCA9IHRoaXMudGV4dDtcblxuICAgIC8vIHdvcmQgd3JhcFxuICAgIC8vIHByZXNlcnZlIG9yaWdpbmFsIHRleHRcbiAgICBpZih0aGlzLnN0eWxlLndvcmRXcmFwKW91dHB1dFRleHQgPSB0aGlzLndvcmRXcmFwKHRoaXMudGV4dCk7XG5cbiAgICAvL3NwbGl0IHRleHQgaW50byBsaW5lc1xuICAgIHZhciBsaW5lcyA9IG91dHB1dFRleHQuc3BsaXQoLyg/OlxcclxcbnxcXHJ8XFxuKS8pO1xuXG4gICAgLy9jYWxjdWxhdGUgdGV4dCB3aWR0aFxuICAgIHZhciBsaW5lV2lkdGhzID0gW107XG4gICAgdmFyIG1heExpbmVXaWR0aCA9IDA7XG4gICAgdmFyIGZvbnRQcm9wZXJ0aWVzID0gdGhpcy5kZXRlcm1pbmVGb250UHJvcGVydGllcyh0aGlzLnN0eWxlLmZvbnQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgICB2YXIgbGluZVdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KGxpbmVzW2ldKS53aWR0aDtcbiAgICAgICAgbGluZVdpZHRoc1tpXSA9IGxpbmVXaWR0aDtcbiAgICAgICAgbWF4TGluZVdpZHRoID0gTWF0aC5tYXgobWF4TGluZVdpZHRoLCBsaW5lV2lkdGgpO1xuICAgIH1cblxuICAgIHZhciB3aWR0aCA9IG1heExpbmVXaWR0aCArIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzO1xuICAgIGlmKHRoaXMuc3R5bGUuZHJvcFNoYWRvdyl3aWR0aCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcblxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gKCB3aWR0aCArIHRoaXMuY29udGV4dC5saW5lV2lkdGggKSAqIHRoaXMucmVzb2x1dGlvbjtcbiAgICBcbiAgICAvL2NhbGN1bGF0ZSB0ZXh0IGhlaWdodFxuICAgIHZhciBsaW5lSGVpZ2h0ID0gZm9udFByb3BlcnRpZXMuZm9udFNpemUgKyB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyArIHRoaXMuc3R5bGUubGluZVNwYWNpbmc7XG4gXG4gICAgdmFyIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcy5sZW5ndGg7XG4gICAgaWYodGhpcy5zdHlsZS5kcm9wU2hhZG93KWhlaWdodCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcblxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IChoZWlnaHQgLSB0aGlzLnN0eWxlLmxpbmVTcGFjaW5nKSAqIHRoaXMucmVzb2x1dGlvbjtcblxuICAgIHRoaXMuY29udGV4dC5zY2FsZSggdGhpcy5yZXNvbHV0aW9uLCB0aGlzLnJlc29sdXRpb24pO1xuXG4gICAgaWYobmF2aWdhdG9yLmlzQ29jb29uSlMpIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwwLHRoaXMuY2FudmFzLndpZHRoLHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgXG4gICAgLy8gdXNlZCBmb3IgZGVidWdnaW5nLi5cbiAgICAvL3RoaXMuY29udGV4dC5maWxsU3R5bGUgPVwiI0ZGMDAwMFwiXG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5zdHlsZS5mb250O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuc3R5bGUuc3Ryb2tlO1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcztcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnO1xuICAgIHRoaXMuY29udGV4dC5taXRlckxpbWl0ID0gMjtcblxuICAgIC8vdGhpcy5jb250ZXh0LmxpbmVKb2luID0gJ3JvdW5kJztcblxuICAgIHZhciBsaW5lUG9zaXRpb25YO1xuICAgIHZhciBsaW5lUG9zaXRpb25ZO1xuXG4gICAgaWYodGhpcy5zdHlsZS5kcm9wU2hhZG93KVxuICAgIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0NvbG9yO1xuXG4gICAgICAgIHZhciB4U2hhZG93T2Zmc2V0ID0gTWF0aC5zaW4odGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XG4gICAgICAgIHZhciB5U2hhZG93T2Zmc2V0ID0gTWF0aC5jb3ModGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyO1xuICAgICAgICAgICAgbGluZVBvc2l0aW9uWSA9ICh0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDIgKyBpICogbGluZUhlaWdodCkgKyBmb250UHJvcGVydGllcy5hc2NlbnQ7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdyaWdodCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSBtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnN0eWxlLmFsaWduID09PSAnY2VudGVyJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc3R5bGUuZmlsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblggKyB4U2hhZG93T2Zmc2V0LCBsaW5lUG9zaXRpb25ZICsgeVNoYWRvd09mZnNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyAgaWYoZHJvcFNoYWRvdylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vc2V0IGNhbnZhcyB0ZXh0IHN0eWxlc1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLnN0eWxlLmZpbGw7XG4gICAgXG4gICAgLy9kcmF3IGxpbmVzIGxpbmUgYnkgbGluZVxuICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICAgIGxpbmVQb3NpdGlvblggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDI7XG4gICAgICAgIGxpbmVQb3NpdGlvblkgPSAodGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyICsgaSAqIGxpbmVIZWlnaHQpICsgZm9udFByb3BlcnRpZXMuYXNjZW50O1xuXG4gICAgICAgIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdyaWdodCcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gbWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuc3R5bGUuYWxpZ24gPT09ICdjZW50ZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnN0eWxlLnN0cm9rZSAmJiB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblgsIGxpbmVQb3NpdGlvblkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zdHlsZS5maWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobGluZXNbaV0sIGxpbmVQb3NpdGlvblgsIGxpbmVQb3NpdGlvblkpO1xuICAgICAgICB9XG5cbiAgICAgIC8vICBpZihkcm9wU2hhZG93KVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVGV4dHVyZSgpO1xufTtcblxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0dXJlID0gZnVuY3Rpb24oKVxue1xuICAgIHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgIHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuXG4gICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG5cbiAgICAvLyB1cGRhdGUgdGhlIGRpcnR5IGJhc2UgdGV4dHVyZXNcbiAgICB0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuZGlydHkoKTtcbn07XG5cblRpbnkuVGV4dC5wcm90b3R5cGUuX3JlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXG57XG4gICAgaWYodGhpcy5kaXJ0eSlcbiAgICB7XG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcblxuICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgIH1cbiAgICAgXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLl9yZW5kZXJDYW52YXMuY2FsbCh0aGlzLCByZW5kZXJTZXNzaW9uKTtcbn07XG5cblRpbnkuVGV4dC5wcm90b3R5cGUuZGV0ZXJtaW5lRm9udFByb3BlcnRpZXMgPSBmdW5jdGlvbihmb250U3R5bGUpXG57XG4gICAgdmFyIHByb3BlcnRpZXMgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZVtmb250U3R5bGVdO1xuXG4gICAgaWYoIXByb3BlcnRpZXMpXG4gICAge1xuICAgICAgICBwcm9wZXJ0aWVzID0ge307XG4gICAgICAgIFxuICAgICAgICB2YXIgY2FudmFzID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzO1xuICAgICAgICB2YXIgY29udGV4dCA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NvbnRleHQ7XG5cbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0eWxlO1xuXG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguY2VpbChjb250ZXh0Lm1lYXN1cmVUZXh0KCd8TcOJcScpLndpZHRoKTtcbiAgICAgICAgdmFyIGJhc2VsaW5lID0gTWF0aC5jZWlsKGNvbnRleHQubWVhc3VyZVRleHQoJ3xNw4lxJykud2lkdGgpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gMiAqIGJhc2VsaW5lO1xuXG4gICAgICAgIGJhc2VsaW5lID0gYmFzZWxpbmUgKiAxLjQgfCAwO1xuXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNmMDAnO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnRTdHlsZTtcblxuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9ICdhbHBoYWJldGljJztcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMCc7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoJ3xNw4lxJywgMCwgYmFzZWxpbmUpO1xuXG4gICAgICAgIHZhciBpbWFnZWRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgICAgICB2YXIgcGl4ZWxzID0gaW1hZ2VkYXRhLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmUgPSB3aWR0aCAqIDQ7XG5cbiAgICAgICAgdmFyIGksIGo7XG5cbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBzdG9wID0gZmFsc2U7XG5cbiAgICAgICAgLy8gYXNjZW50LiBzY2FuIGZyb20gdG9wIHRvIGJvdHRvbSB1bnRpbCB3ZSBmaW5kIGEgbm9uIHJlZCBwaXhlbFxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBiYXNlbGluZTsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBsaW5lOyBqICs9IDQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VkYXRhW2lkeCArIGpdICE9PSAyNTUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXN0b3ApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWR4ICs9IGxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wZXJ0aWVzLmFzY2VudCA9IGJhc2VsaW5lIC0gaTtcblxuICAgICAgICBpZHggPSBwaXhlbHMgLSBsaW5lO1xuICAgICAgICBzdG9wID0gZmFsc2U7XG5cbiAgICAgICAgLy8gZGVzY2VudC4gc2NhbiBmcm9tIGJvdHRvbSB0byB0b3AgdW50aWwgd2UgZmluZCBhIG5vbiByZWQgcGl4ZWxcbiAgICAgICAgZm9yKGkgPSBoZWlnaHQ7IGkgPiBiYXNlbGluZTsgaS0tKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBsaW5lOyBqICs9IDQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoaW1hZ2VkYXRhW2lkeCArIGpdICE9PSAyNTUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXN0b3ApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWR4IC09IGxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wZXJ0aWVzLmRlc2NlbnQgPSBpIC0gYmFzZWxpbmU7XG4gICAgICAgIC8vVE9ETyBtaWdodCBuZWVkIGEgdHdlYWsuIGtpbmQgb2YgYSB0ZW1wIGZpeCFcbiAgICAgICAgcHJvcGVydGllcy5kZXNjZW50ICs9IDY7XG4gICAgICAgIHByb3BlcnRpZXMuZm9udFNpemUgPSBwcm9wZXJ0aWVzLmFzY2VudCArIHByb3BlcnRpZXMuZGVzY2VudDtcblxuICAgICAgICBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZVtmb250U3R5bGVdID0gcHJvcGVydGllcztcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcGVydGllcztcbn07XG5cblRpbnkuVGV4dC5wcm90b3R5cGUud29yZFdyYXAgPSBmdW5jdGlvbih0ZXh0KVxue1xuICAgIC8vIEdyZWVkeSB3cmFwcGluZyBhbGdvcml0aG0gdGhhdCB3aWxsIHdyYXAgd29yZHMgYXMgdGhlIGxpbmUgZ3Jvd3MgbG9uZ2VyXG4gICAgLy8gdGhhbiBpdHMgaG9yaXpvbnRhbCBib3VuZHMuXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcbicpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgICB2YXIgc3BhY2VMZWZ0ID0gdGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoO1xuICAgICAgICB2YXIgd29yZHMgPSBsaW5lc1tpXS5zcGxpdCgnICcpO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHdvcmRzLmxlbmd0aDsgaisrKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgd29yZFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHdvcmRzW2pdKS53aWR0aDtcbiAgICAgICAgICAgIHZhciB3b3JkV2lkdGhXaXRoU3BhY2UgPSB3b3JkV2lkdGggKyB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQoJyAnKS53aWR0aDtcbiAgICAgICAgICAgIGlmKGogPT09IDAgfHwgd29yZFdpZHRoV2l0aFNwYWNlID4gc3BhY2VMZWZ0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFNraXAgcHJpbnRpbmcgdGhlIG5ld2xpbmUgaWYgaXQncyB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgbGluZSB0aGF0IGlzXG4gICAgICAgICAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRoZSB3b3JkIHdyYXAgd2lkdGguXG4gICAgICAgICAgICAgICAgaWYoaiA+IDApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB3b3Jkc1tqXTtcbiAgICAgICAgICAgICAgICBzcGFjZUxlZnQgPSB0aGlzLnN0eWxlLndvcmRXcmFwV2lkdGggLSB3b3JkV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3BhY2VMZWZ0IC09IHdvcmRXaWR0aFdpdGhTcGFjZTtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJyAnICsgd29yZHNbal07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSA8IGxpbmVzLmxlbmd0aC0xKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblRpbnkuVGV4dC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obWF0cml4KVxue1xuICAgIGlmKHRoaXMuZGlydHkpXG4gICAge1xuICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBUaW55LlNwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzLmNhbGwodGhpcywgbWF0cml4KTtcbn07XG5cblRpbnkuVGV4dC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKGRlc3Ryb3lCYXNlVGV4dHVyZSlcbntcbiAgICAvLyBtYWtlIHN1cmUgdG8gcmVzZXQgdGhlIHRoZSBjb250ZXh0IGFuZCBjYW52YXMuLiBkb250IHdhbnQgdGhpcyBoYW5naW5nIGFyb3VuZCBpbiBtZW1vcnkhXG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG5cbiAgICB0aGlzLnRleHR1cmUuZGVzdHJveShkZXN0cm95QmFzZVRleHR1cmUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBkZXN0cm95QmFzZVRleHR1cmUpO1xufTtcblxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGUgPSB7fTtcblRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ29udGV4dCA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyIsIi8qKlxyXG4gKiBAYXV0aG9yIE1hdCBHcm92ZXMgaHR0cDovL21hdGdyb3Zlcy5jb20vXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgdGlsaW5nIHNwcml0ZSBpcyBhIGZhc3Qgd2F5IG9mIHJlbmRlcmluZyBhIHRpbGluZyBpbWFnZVxyXG4gKlxyXG4gKiBAY2xhc3MgVGlsaW5nU3ByaXRlXHJcbiAqIEBleHRlbmRzIFNwcml0ZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHRleHR1cmUge1RleHR1cmV9IHRoZSB0ZXh0dXJlIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqIEBwYXJhbSB3aWR0aCB7TnVtYmVyfSAgdGhlIHdpZHRoIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqIEBwYXJhbSBoZWlnaHQge051bWJlcn0gdGhlIGhlaWdodCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gKi9cclxuVGlueS5UaWxpbmdTcHJpdGUgPSBmdW5jdGlvbih0ZXh0dXJlLCBrZXksIHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIFRpbnkuU3ByaXRlLmNhbGwoIHRoaXMsIHRleHR1cmUsIGtleSApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHdpdGggb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgd2lkdGhcclxuICAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoIHx8IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoZWlnaHQgb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzY2FsaW5nIG9mIHRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHRpbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVTY2FsZVxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBuZXcgVGlueS5Qb2ludCgxLDEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBwb2ludCB0aGF0IHJlcHJlc2VudHMgdGhlIHNjYWxlIG9mIHRoZSB0ZXh0dXJlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB0aWxlU2NhbGVPZmZzZXRcclxuICAgICAqIEB0eXBlIFBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0ID0gbmV3IFRpbnkuUG9pbnQoMSwxKTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb2Zmc2V0IHBvc2l0aW9uIG9mIHRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHRpbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVQb3NpdGlvblxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBuZXcgVGlueS5Qb2ludCgwLDApO1xyXG5cclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5TcHJpdGUucHJvdG90eXBlKTtcclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UaWxpbmdTcHJpdGU7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSB3aWR0aCBvZiB0aGUgc3ByaXRlLCBzZXR0aW5nIHRoaXMgd2lsbCBhY3R1YWxseSBtb2RpZnkgdGhlIHNjYWxlIHRvIGFjaGlldmUgdGhlIHZhbHVlIHNldFxyXG4gKlxyXG4gKiBAcHJvcGVydHkgd2lkdGhcclxuICogQHR5cGUgTnVtYmVyXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLCAnd2lkdGgnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogVGhlIGhlaWdodCBvZiB0aGUgVGlsaW5nU3ByaXRlLCBzZXR0aW5nIHRoaXMgd2lsbCBhY3R1YWxseSBtb2RpZnkgdGhlIHNjYWxlIHRvIGFjaGlldmUgdGhlIHZhbHVlIHNldFxyXG4gKlxyXG4gKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAqIEB0eXBlIE51bWJlclxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24odGV4dHVyZSwga2V5KVxyXG57XHJcbiAgICB2YXIgdXBkYXRlZCA9IFRpbnkuU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlLmNhbGwodGhpcywgdGV4dHVyZSwga2V5KTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2hUZXh0dXJlID0gdXBkYXRlZDtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMClyZXR1cm47XHJcbiAgICBcclxuICAgIHZhciBjb250ZXh0ID0gcmVuZGVyU2Vzc2lvbi5jb250ZXh0O1xyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMud29ybGRBbHBoYTtcclxuICAgIFxyXG4gICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICBcclxuICAgIHZhciByZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybS5hICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5iICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5jICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5kICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50eCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHkgKiByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX190aWxlUGF0dGVybiB8fCB0aGlzLnJlZnJlc2hUZXh0dXJlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVUaWxpbmdUZXh0dXJlKGZhbHNlKTtcclxuICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnRpbGluZ1RleHR1cmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9fdGlsZVBhdHRlcm4gPSBjb250ZXh0LmNyZWF0ZVBhdHRlcm4odGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZSwgJ3JlcGVhdCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGJsZW5kIG1vZGVcclxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0aWxlUG9zaXRpb24gPSB0aGlzLnRpbGVQb3NpdGlvbjtcclxuICAgIHZhciB0aWxlU2NhbGUgPSB0aGlzLnRpbGVTY2FsZTtcclxuXHJcbiAgICB0aWxlUG9zaXRpb24ueCAlPSB0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUud2lkdGg7XHJcbiAgICB0aWxlUG9zaXRpb24ueSAlPSB0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUuaGVpZ2h0O1xyXG5cclxuICAgIC8vIG9mZnNldCAtIG1ha2Ugc3VyZSB0byBhY2NvdW50IGZvciB0aGUgYW5jaG9yIHBvaW50Li5cclxuICAgIGNvbnRleHQuc2NhbGUodGlsZVNjYWxlLngsdGlsZVNjYWxlLnkpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUodGlsZVBvc2l0aW9uLnggKyAodGhpcy5hbmNob3IueCAqIC10aGlzLl93aWR0aCksIHRpbGVQb3NpdGlvbi55ICsgKHRoaXMuYW5jaG9yLnkgKiAtdGhpcy5faGVpZ2h0KSk7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9fdGlsZVBhdHRlcm47XHJcblxyXG4gICAgY29udGV4dC5maWxsUmVjdCgtdGlsZVBvc2l0aW9uLngsXHJcbiAgICAgICAgICAgICAgICAgICAgLXRpbGVQb3NpdGlvbi55LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoIC8gdGlsZVNjYWxlLngsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0IC8gdGlsZVNjYWxlLnkpO1xyXG5cclxuICAgIGNvbnRleHQuc2NhbGUoMSAvIHRpbGVTY2FsZS54LCAxIC8gdGlsZVNjYWxlLnkpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUoLXRpbGVQb3NpdGlvbi54ICsgKHRoaXMuYW5jaG9yLnggKiB0aGlzLl93aWR0aCksIC10aWxlUG9zaXRpb24ueSArICh0aGlzLmFuY2hvci55ICogdGhpcy5faGVpZ2h0KSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLl9yZW5kZXJDYW52YXMocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiogUmV0dXJucyB0aGUgZnJhbWluZyByZWN0YW5nbGUgb2YgdGhlIHNwcml0ZSBhcyBhIFRpbnkuUmVjdGFuZ2xlIG9iamVjdFxyXG4qXHJcbiogQG1ldGhvZCBnZXRCb3VuZHNcclxuKiBAcmV0dXJuIHtSZWN0YW5nbGV9IHRoZSBmcmFtaW5nIHJlY3RhbmdsZVxyXG4qL1xyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgd2lkdGggPSB0aGlzLl93aWR0aDtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XHJcblxyXG4gICAgdmFyIHcwID0gd2lkdGggKiAoMS10aGlzLmFuY2hvci54KTtcclxuICAgIHZhciB3MSA9IHdpZHRoICogLXRoaXMuYW5jaG9yLng7XHJcblxyXG4gICAgdmFyIGgwID0gaGVpZ2h0ICogKDEtdGhpcy5hbmNob3IueSk7XHJcbiAgICB2YXIgaDEgPSBoZWlnaHQgKiAtdGhpcy5hbmNob3IueTtcclxuXHJcbiAgICB2YXIgd29ybGRUcmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciBhID0gd29ybGRUcmFuc2Zvcm0uYTtcclxuICAgIHZhciBiID0gd29ybGRUcmFuc2Zvcm0uYjtcclxuICAgIHZhciBjID0gd29ybGRUcmFuc2Zvcm0uYztcclxuICAgIHZhciBkID0gd29ybGRUcmFuc2Zvcm0uZDtcclxuICAgIHZhciB0eCA9IHdvcmxkVHJhbnNmb3JtLnR4O1xyXG4gICAgdmFyIHR5ID0gd29ybGRUcmFuc2Zvcm0udHk7XHJcbiAgICBcclxuICAgIHZhciB4MSA9IGEgKiB3MSArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICB2YXIgeTIgPSBkICogaDEgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgIHZhciB4NCA9ICBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5NCA9ICBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIG1pblggPSB4MSA8IG1pblggPyB4MSA6IG1pblg7XHJcbiAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgbWluWSA9IHkxIDwgbWluWSA/IHkxIDogbWluWTtcclxuICAgIG1pblkgPSB5MiA8IG1pblkgPyB5MiA6IG1pblk7XHJcbiAgICBtaW5ZID0geTMgPCBtaW5ZID8geTMgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICBtYXhYID0geDEgPiBtYXhYID8geDEgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHgyID4gbWF4WCA/IHgyIDogbWF4WDtcclxuICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICBtYXhYID0geDQgPiBtYXhYID8geDQgOiBtYXhYO1xyXG5cclxuICAgIG1heFkgPSB5MSA+IG1heFkgPyB5MSA6IG1heFk7XHJcbiAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuXHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFdoZW4gdGhlIHRleHR1cmUgaXMgdXBkYXRlZCwgdGhpcyBldmVudCB3aWxsIGZpcmUgdG8gdXBkYXRlIHRoZSBzY2FsZSBhbmQgZnJhbWVcclxuICpcclxuICogQG1ldGhvZCBvblRleHR1cmVVcGRhdGVcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiogXHJcbiogQG1ldGhvZCBnZW5lcmF0ZVRpbGluZ1RleHR1cmVcclxuKiBcclxuKiBAcGFyYW0gZm9yY2VQb3dlck9mVHdvIHtCb29sZWFufSBXaGV0aGVyIHdlIHdhbnQgdG8gZm9yY2UgdGhlIHRleHR1cmUgdG8gYmUgYSBwb3dlciBvZiB0d29cclxuKi9cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdlbmVyYXRlVGlsaW5nVGV4dHVyZSA9IGZ1bmN0aW9uKGZvcmNlUG93ZXJPZlR3bylcclxue1xyXG4gICAgaWYgKCF0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuaGFzTG9hZGVkKSByZXR1cm47XHJcblxyXG4gICAgdmFyIHRleHR1cmUgPSB0aGlzLnRleHR1cmU7XHJcbiAgICB2YXIgZnJhbWUgPSB0ZXh0dXJlLmZyYW1lO1xyXG4gICAgdmFyIHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQ7XHJcblxyXG4gICAgLy8gIENoZWNrIHRoYXQgdGhlIGZyYW1lIGlzIHRoZSBzYW1lIHNpemUgYXMgdGhlIGJhc2UgdGV4dHVyZS5cclxuICAgIHZhciBpc0ZyYW1lID0gZnJhbWUud2lkdGggIT09IHRleHR1cmUuYmFzZVRleHR1cmUud2lkdGggfHwgZnJhbWUuaGVpZ2h0ICE9PSB0ZXh0dXJlLmJhc2VUZXh0dXJlLmhlaWdodDtcclxuXHJcbiAgICB2YXIgbmV3VGV4dHVyZVJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFmb3JjZVBvd2VyT2ZUd28pXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRleHR1cmUuY3JvcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhcmdldFdpZHRoID0gdGV4dHVyZS5jcm9wLndpZHRoO1xyXG4gICAgICAgICAgICB0YXJnZXRIZWlnaHQgPSB0ZXh0dXJlLmNyb3AuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YXJnZXRXaWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgICAgICAgICB0YXJnZXRIZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgbmV3VGV4dHVyZVJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBpZiAodGV4dHVyZS5jcm9wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFyZ2V0V2lkdGggPSBUaW55LmdldE5leHRQb3dlck9mVHdvKHRleHR1cmUuY3JvcC53aWR0aCk7XHJcbiAgICAgICAgICAgIHRhcmdldEhlaWdodCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28odGV4dHVyZS5jcm9wLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhcmdldFdpZHRoID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byhmcmFtZS53aWR0aCk7XHJcbiAgICAgICAgICAgIHRhcmdldEhlaWdodCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28oZnJhbWUuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vICBJZiB0aGUgQmFzZVRleHR1cmUgZGltZW5zaW9ucyBkb24ndCBtYXRjaCB0aGUgdGV4dHVyZSBmcmFtZSB0aGVuIHdlIG5lZWQgYSBuZXcgdGV4dHVyZSBhbnl3YXkgYmVjYXVzZSBpdCdzIHBhcnQgb2YgYSB0ZXh0dXJlIGF0bGFzXHJcbiAgICAgICAgLy8gaWYgKGZyYW1lLndpZHRoICE9PSB0YXJnZXRXaWR0aCB8fCBmcmFtZS5oZWlnaHQgIT09IHRhcmdldEhlaWdodCB8fCB0ZXh0dXJlLmJhc2VUZXh0dXJlLndpZHRoICE9PSB0YXJnZXRXaWR0aCB8fCB0ZXh0dXJlLmJhc2VUZXh0dXJlLmhlaWdodCB8fCB0YXJnZXRIZWlnaHQpIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld1RleHR1cmVSZXF1aXJlZClcclxuICAgIHtcclxuICAgICAgICB2YXIgY2FudmFzQnVmZmVyO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aWxpbmdUZXh0dXJlICYmIHRoaXMudGlsaW5nVGV4dHVyZS5pc1RpbGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbnZhc0J1ZmZlciA9IHRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXI7XHJcbiAgICAgICAgICAgIGNhbnZhc0J1ZmZlci5yZXNpemUodGFyZ2V0V2lkdGgsIHRhcmdldEhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5iYXNlVGV4dHVyZS53aWR0aCA9IHRhcmdldFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUuaGVpZ2h0ID0gdGFyZ2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW52YXNCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIodGFyZ2V0V2lkdGgsIHRhcmdldEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUgPSBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXNCdWZmZXIuY2FudmFzKTtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmNhbnZhc0J1ZmZlciA9IGNhbnZhc0J1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmlzVGlsaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbnZhc0J1ZmZlci5jb250ZXh0LmRyYXdJbWFnZSh0ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5jcm9wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0LnggPSBmcmFtZS53aWR0aCAvIHRhcmdldFdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0LnkgPSBmcmFtZS5oZWlnaHQgLyB0YXJnZXRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoVGV4dHVyZSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUuX3Bvd2VyT2YyID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLnRpbGluZ1RleHR1cmUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbn07IiwiXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIgPSBmdW5jdGlvbigpXHJcbntcclxufTtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNNYXNrTWFuYWdlcjtcclxuXHJcblRpbnkuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLnB1c2hNYXNrID0gZnVuY3Rpb24obWFza0RhdGEsIHJlbmRlclNlc3Npb24pXHJcbntcclxuXHR2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuXHJcbiAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgIFxyXG4gICAgdmFyIGNhY2hlQWxwaGEgPSBtYXNrRGF0YS5hbHBoYTtcclxuICAgIHZhciB0cmFuc2Zvcm0gPSBtYXNrRGF0YS53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvbik7XHJcblxyXG4gICAgVGlueS5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljc01hc2sobWFza0RhdGEsIGNvbnRleHQpO1xyXG5cclxuICAgIGNvbnRleHQuY2xpcCgpO1xyXG5cclxuICAgIG1hc2tEYXRhLndvcmxkQWxwaGEgPSBjYWNoZUFscGhhO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUucG9wTWFzayA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5yZXN0b3JlKCk7XHJcbn07IiwiXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKVxyXG57ICAgXHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG5cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IChvcHRpb25zLnJlc29sdXRpb24gIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5yZXNvbHV0aW9uIDogMSk7XHJcblxyXG4gICAgdGhpcy5jbGVhckJlZm9yZVJlbmRlciA9IChvcHRpb25zLmNsZWFyQmVmb3JlUmVuZGVyICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xlYXJCZWZvcmVSZW5kZXIgOiB0cnVlKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zcGFyZW50ID0gKG9wdGlvbnMudHJhbnNwYXJlbnQgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy50cmFuc3BhcmVudCA6IGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUgPSBvcHRpb25zLmF1dG9SZXNpemUgfHwgZmFsc2U7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDgwMDtcclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCA2MDA7XHJcblxyXG4gICAgdGhpcy53aWR0aCAqPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICB0aGlzLmhlaWdodCAqPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy52aWV3ID0gb3B0aW9ucy52aWV3IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiY2FudmFzXCIgKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLnZpZXcuZ2V0Q29udGV4dCggXCIyZFwiLCB7IGFscGhhOiB0aGlzLnRyYW5zcGFyZW50IH0gKTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2ggPSB0cnVlO1xyXG5cclxuICAgIHRoaXMudmlldy53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICB0aGlzLnZpZXcuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzTWFza01hbmFnZXIpXHJcbiAgICAgICAgdGhpcy5tYXNrTWFuYWdlciA9IG5ldyBUaW55LkNhbnZhc01hc2tNYW5hZ2VyKCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uID0ge1xyXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcclxuICAgICAgICBtYXNrTWFuYWdlcjogdGhpcy5tYXNrTWFuYWdlcixcclxuICAgICAgICBzY2FsZU1vZGU6IDAsXHJcbiAgICAgICAgc21vb3RoUHJvcGVydHk6IG51bGwsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgdHJ1ZSBQaXhpIHdpbGwgTWF0aC5mbG9vcigpIHgveSB2YWx1ZXMgd2hlbiByZW5kZXJpbmcsIHN0b3BwaW5nIHBpeGVsIGludGVycG9sYXRpb24uXHJcbiAgICAgICAgICogSGFuZHkgZm9yIGNyaXNwIHBpeGVsIGFydCBhbmQgc3BlZWQgb24gbGVnYWN5IGRldmljZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICByb3VuZFBpeGVsczogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgaWYoXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYoXCJvSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJtc0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzUmVuZGVyZXI7XHJcblxyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oc3RhZ2UpXHJcbntcclxuICAgIFxyXG4gICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5pc0NvY29vbkpTICYmIHRoaXMudmlldy5zY3JlZW5jYW52YXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuY2xlYXJCZWZvcmVSZW5kZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHN0YWdlLmJhY2tncm91bmRDb2xvclN0cmluZztcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGggLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLnJlbmRlckRpc3BsYXlPYmplY3Qoc3RhZ2UpO1xyXG5cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihyZW1vdmVWaWV3KVxyXG57ICAgXHJcbiAgICBpZiAodHlwZW9mIHJlbW92ZVZpZXcgPT09IFwidW5kZWZpbmVkXCIpIHsgcmVtb3ZlVmlldyA9IHRydWU7IH1cclxuXHJcbiAgICBpZiAocmVtb3ZlVmlldyAmJiB0aGlzLnZpZXcucGFyZW50Tm9kZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlldyA9IG51bGw7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5tYXNrTWFuYWdlciA9IG51bGw7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24gPSBudWxsO1xyXG5cclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMudmlldy53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICB0aGlzLnZpZXcuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgIHRoaXMudmlldy5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggLyB0aGlzLnJlc29sdXRpb24gKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy52aWV3LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0IC8gdGhpcy5yZXNvbHV0aW9uICsgXCJweFwiO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRGlzcGxheU9iamVjdCA9IGZ1bmN0aW9uKGRpc3BsYXlPYmplY3QsIGNvbnRleHQpXHJcbntcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLmNvbnRleHQ7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24ucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuICAgIGRpc3BsYXlPYmplY3QuX3JlbmRlckNhbnZhcyh0aGlzLnJlbmRlclNlc3Npb24pO1xyXG59OyIsIlxyXG5UaW55LkNhbnZhc1RpbnRlciA9IGZ1bmN0aW9uKClcclxue1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSA9IGZ1bmN0aW9uKHNwcml0ZSwgY29sb3IpXHJcbntcclxuICAgIHZhciB0ZXh0dXJlID0gc3ByaXRlLnRleHR1cmU7XHJcblxyXG4gICAgdmFyIGNhbnZhcyA9IFRpbnkuQ2FudmFzVGludGVyLmNhbnZhcyB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgXHJcbiAgICBUaW55LkNhbnZhc1RpbnRlci50aW50TWV0aG9kKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpO1xyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc1RpbnRlci5jb252ZXJ0VGludFRvSW1hZ2UpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gaXMgdGhpcyBiZXR0ZXI/XHJcbiAgICAgICAgdmFyIHRpbnRJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRpbnRJbWFnZS5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcblxyXG4gICAgICAgIC8vIHRleHR1cmUudGludENhY2hlW3N0cmluZ0NvbG9yXSA9IHRpbnRJbWFnZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuXHJcbiAgICAgICAgVGlueS5DYW52YXNUaW50ZXIuY2FudmFzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2FudmFzO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseSA9IGZ1bmN0aW9uKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpXHJcbntcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoIFwiMmRcIiApO1xyXG5cclxuICAgIHZhciBjcm9wID0gdGV4dHVyZS5jcm9wO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IGNyb3Aud2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gY3JvcC5oZWlnaHQ7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNcIiArIChcIjAwMDAwXCIgKyAoIGNvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNyb3Aud2lkdGgsIGNyb3AuaGVpZ2h0KTtcclxuICAgIFxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcIm11bHRpcGx5XCI7XHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQpO1xyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1hdG9wXCI7XHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQpO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludFdpdGhQZXJQaXhlbCA9IGZ1bmN0aW9uKHRleHR1cmUsIGNvbG9yLCBjYW52YXMpXHJcbntcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICB2YXIgY3JvcCA9IHRleHR1cmUuY3JvcDtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjcm9wLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGNyb3AuaGVpZ2h0O1xyXG4gIFxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImNvcHlcIjtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRleHR1cmUuYmFzZVRleHR1cmUuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjcm9wLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3AuaGVpZ2h0KTtcclxuXHJcbiAgICB2YXIgcmdiVmFsdWVzID0gVGlueS5oZXgycmdiKGNvbG9yKTtcclxuICAgIHZhciByID0gcmdiVmFsdWVzWzBdLCBnID0gcmdiVmFsdWVzWzFdLCBiID0gcmdiVmFsdWVzWzJdO1xyXG5cclxuICAgIHZhciBwaXhlbERhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjcm9wLndpZHRoLCBjcm9wLmhlaWdodCk7XHJcblxyXG4gICAgdmFyIHBpeGVscyA9IHBpeGVsRGF0YS5kYXRhO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGl4ZWxzLmxlbmd0aDsgaSArPSA0KVxyXG4gICAge1xyXG4gICAgICBwaXhlbHNbaSswXSAqPSByO1xyXG4gICAgICBwaXhlbHNbaSsxXSAqPSBnO1xyXG4gICAgICBwaXhlbHNbaSsyXSAqPSBiO1xyXG5cclxuICAgICAgaWYgKCFUaW55LmNhbkhhbmRsZUFscGhhKVxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyIGFscGhhID0gcGl4ZWxzW2krM107XHJcblxyXG4gICAgICAgIHBpeGVsc1tpKzBdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgIHBpeGVsc1tpKzFdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICAgIHBpeGVsc1tpKzJdIC89IDI1NSAvIGFscGhhO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEocGl4ZWxEYXRhLCAwLCAwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrSW52ZXJzZUFscGhhKClcclxue1xyXG4gICAgdmFyIGNhbnZhcyA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcigyLCAxKTtcclxuXHJcbiAgICBjYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMTAsIDIwLCAzMCwgMC41KVwiO1xyXG5cclxuICAgIC8vICBEcmF3IGEgc2luZ2xlIHBpeGVsXHJcbiAgICBjYW52YXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgR2V0IHRoZSBjb2xvciB2YWx1ZXNcclxuICAgIHZhciBzMSA9IGNhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCAxLCAxKTtcclxuXHJcbiAgICAvLyAgUGxvdCB0aGVtIHRvIHgyXHJcbiAgICBjYW52YXMuY29udGV4dC5wdXRJbWFnZURhdGEoczEsIDEsIDApO1xyXG5cclxuICAgIC8vICBHZXQgdGhvc2UgdmFsdWVzXHJcbiAgICB2YXIgczIgPSBjYW52YXMuY29udGV4dC5nZXRJbWFnZURhdGEoMSwgMCwgMSwgMSk7XHJcblxyXG4gICAgLy8gIENvbXBhcmUgYW5kIHJldHVyblxyXG4gICAgcmV0dXJuIChzMi5kYXRhWzBdID09PSBzMS5kYXRhWzBdICYmIHMyLmRhdGFbMV0gPT09IHMxLmRhdGFbMV0gJiYgczIuZGF0YVsyXSA9PT0gczEuZGF0YVsyXSAmJiBzMi5kYXRhWzNdID09PSBzMS5kYXRhWzNdKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrQmxlbmRNb2RlICgpXHJcbntcclxuICAgIHZhciBwbmdIZWFkID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQVFBQUFBQkFRTUFBQUREOHAyT0FBQUFBMUJNVkVYLyc7XHJcbiAgICB2YXIgcG5nRW5kID0gJ0FBQUFDa2xFUVZRSTEyTmdBQUFBQWdBQjRpRzhNd0FBQUFCSlJVNUVya0pnZ2c9PSc7XHJcblxyXG4gICAgdmFyIG1hZ2VudGEgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBtYWdlbnRhLm9ubG9hZCA9IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHllbGxvdyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgICB5ZWxsb3cub25sb2FkID0gZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gNjtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseSc7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShtYWdlbnRhLCAwLCAwKTtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoeWVsbG93LCAyLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGV4dC5nZXRJbWFnZURhdGEoMiwgMCwgMSwgMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgyLCAwLCAxLCAxKS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgVGlueS5zdXBwb3J0TmV3QmxlbmRNb2RlcyA9IChkYXRhWzBdID09PSAyNTUgJiYgZGF0YVsxXSA9PT0gMCAmJiBkYXRhWzJdID09PSAwKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB5ZWxsb3cuc3JjID0gcG5nSGVhZCArICcvd0NLeHZSRicgKyBwbmdFbmQ7XHJcbiAgICB9O1xyXG5cclxuICAgIG1hZ2VudGEuc3JjID0gcG5nSGVhZCArICdBUDgwNE9hNicgKyBwbmdFbmQ7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuVGlueS5DYW52YXNUaW50ZXIuY29udmVydFRpbnRUb0ltYWdlID0gZmFsc2U7XHJcblxyXG5UaW55LmNhbkhhbmRsZUFscGhhID0gY2hlY2tJbnZlcnNlQWxwaGEoKTtcclxuXHJcblRpbnkuc3VwcG9ydE5ld0JsZW5kTW9kZXMgPSBjaGVja0JsZW5kTW9kZSgpO1xyXG5cclxuVGlueS5DYW52YXNUaW50ZXIudGludE1ldGhvZCA9IFRpbnkuc3VwcG9ydE5ld0JsZW5kTW9kZXMgPyBUaW55LkNhbnZhc1RpbnRlci50aW50V2l0aE11bHRpcGx5IDogIFRpbnkuQ2FudmFzVGludGVyLnRpbnRXaXRoUGVyUGl4ZWw7XHJcbiIsIlxyXG5UaW55LkNhbnZhc0dyYXBoaWNzID0gZnVuY3Rpb24oKVxyXG57XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzID0gZnVuY3Rpb24oZ3JhcGhpY3MsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciB3b3JsZEFscGhhID0gZ3JhcGhpY3Mud29ybGRBbHBoYTtcclxuXHJcbiAgICBpZiAoZ3JhcGhpY3MuZGlydHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHcmFwaGljc1RpbnQoZ3JhcGhpY3MpO1xyXG4gICAgICAgIGdyYXBoaWNzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBncmFwaGljcy5ncmFwaGljc0RhdGFbaV07XHJcbiAgICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IGRhdGEuX2ZpbGxUaW50O1xyXG4gICAgICAgIHZhciBsaW5lQ29sb3IgPSBkYXRhLl9saW5lVGludDtcclxuXHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBkYXRhLmxpbmVXaWR0aDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUE9MWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaj0xOyBqIDwgcG9pbnRzLmxlbmd0aC8yOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tqICogMl0sIHBvaW50c1tqICogMiArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNoYXBlLmNsb3NlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl0gJiYgcG9pbnRzWzFdID09PSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMnICsgKCcwMDAwMCcgKyAoIGZpbGxDb2xvciB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5saW5lV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmxpbmVBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMnICsgKCcwMDAwMCcgKyAoIGxpbmVDb2xvciB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGxDb2xvciB8fCBkYXRhLmZpbGxDb2xvciA9PT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEuZmlsbEFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMnICsgKCcwMDAwMCcgKyAoIGZpbGxDb2xvciB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3Qoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUud2lkdGgsIHNoYXBlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggbGluZUNvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLndpZHRoLCBzaGFwZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkNJUkMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPIC0gbmVlZCB0byBiZSBVbmRlZmluZWQhXHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHNoYXBlLngsIHNoYXBlLnksIHNoYXBlLnJhZGl1cywwLDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggZmlsbENvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggbGluZUNvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5FTElQKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gZWxsaXBzZSBjb2RlIHRha2VuIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE3Mjc5OC9ob3ctdG8tZHJhdy1hbi1vdmFsLWluLWh0bWw1LWNhbnZhc1xyXG5cclxuICAgICAgICAgICAgdmFyIHcgPSBzaGFwZS53aWR0aCAqIDI7XHJcbiAgICAgICAgICAgIHZhciBoID0gc2hhcGUuaGVpZ2h0ICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gc2hhcGUueCAtIHcvMjtcclxuICAgICAgICAgICAgdmFyIHkgPSBzaGFwZS55IC0gaC8yO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYXBwYSA9IDAuNTUyMjg0OCxcclxuICAgICAgICAgICAgICAgIG94ID0gKHcgLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBveSA9IChoIC8gMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcclxuICAgICAgICAgICAgICAgIHhlID0geCArIHcsICAgICAgICAgICAvLyB4LWVuZFxyXG4gICAgICAgICAgICAgICAgeWUgPSB5ICsgaCwgICAgICAgICAgIC8vIHktZW5kXHJcbiAgICAgICAgICAgICAgICB4bSA9IHggKyB3IC8gMiwgICAgICAgLy8geC1taWRkbGVcclxuICAgICAgICAgICAgICAgIHltID0geSArIGggLyAyOyAgICAgICAvLyB5LW1pZGRsZVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeW0pO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeCwgeW0gLSBveSwgeG0gLSBveCwgeSwgeG0sIHkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oeG0gKyBveCwgeSwgeGUsIHltIC0gb3ksIHhlLCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4ZSwgeW0gKyBveSwgeG0gKyBveCwgeWUsIHhtLCB5ZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSAtIG94LCB5ZSwgeCwgeW0gKyBveSwgeCwgeW0pO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZpbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjJyArICgnMDAwMDAnICsgKCBmaWxsQ29sb3IgfCAwKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGluZVdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5saW5lQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICcjJyArICgnMDAwMDAnICsgKCBsaW5lQ29sb3IgfCAwKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcnggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICB2YXIgcnkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBzaGFwZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHNoYXBlLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHNoYXBlLnJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXhSYWRpdXMgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIgfCAwO1xyXG4gICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgPiBtYXhSYWRpdXMgPyBtYXhSYWRpdXMgOiByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhyeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5ICsgaGVpZ2h0LCByeCArIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoIC0gcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSArIGhlaWdodCwgcnggKyB3aWR0aCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoLCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSwgcnggKyB3aWR0aCAtIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5LCByeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsbENvbG9yIHx8IGRhdGEuZmlsbENvbG9yID09PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gZGF0YS5maWxsQWxwaGEgKiB3b3JsZEFscGhhO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggZmlsbENvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmVXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IGRhdGEubGluZUFscGhhICogd29ybGRBbHBoYTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIycgKyAoJzAwMDAwJyArICggbGluZUNvbG9yIHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFRpbnkuUHJpbWl0aXZlcy5SUkVDX0xKT0lOKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJ4ID0gc2hhcGUueDtcclxuICAgICAgICAgICAgdmFyIHJ5ID0gc2hhcGUueTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2hhcGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBzaGFwZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaGFwZS5yYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWxsQ29sb3IgfHwgZGF0YS5maWxsQ29sb3IgPT09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBkYXRhLmZpbGxBbHBoYSAqIHdvcmxkQWxwaGE7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjJyArICgnMDAwMDAnICsgKCBmaWxsQ29sb3IgfCAwKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMnICsgKCcwMDAwMCcgKyAoIGZpbGxDb2xvciB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5saW5lSm9pbiA9IFwicm91bmRcIjtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QocnggKyAocmFkaXVzIC8gMiksIHJ5ICsgKHJhZGl1cyAvIDIpLCB3aWR0aCAtIHJhZGl1cywgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChyeCArIChyYWRpdXMgLyAyKSwgcnkgKyAocmFkaXVzIC8gMiksIHdpZHRoIC0gcmFkaXVzLCBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3NNYXNrID0gZnVuY3Rpb24oZ3JhcGhpY3MsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciBsZW4gPSBncmFwaGljcy5ncmFwaGljc0RhdGEubGVuZ3RoO1xyXG5cclxuICAgIGlmIChsZW4gPT09IDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzLmdyYXBoaWNzRGF0YVtpXTtcclxuICAgICAgICB2YXIgc2hhcGUgPSBkYXRhLnNoYXBlO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUE9MWSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gc2hhcGUucG9pbnRzO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBqPTE7IGogPCBwb2ludHMubGVuZ3RoLzI7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2ogKiAyXSwgcG9pbnRzW2ogKiAyICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgYXJlIHRoZSBzYW1lIGNsb3NlIHRoZSBwYXRoIC0gbXVjaCBuZWF0ZXIgOilcclxuICAgICAgICAgICAgaWYgKHBvaW50c1swXSA9PT0gcG9pbnRzW3BvaW50cy5sZW5ndGgtMl0gJiYgcG9pbnRzWzFdID09PSBwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUkVDVClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVjdChzaGFwZS54LCBzaGFwZS55LCBzaGFwZS53aWR0aCwgc2hhcGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuQ0lSQylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gLSBuZWVkIHRvIGJlIFVuZGVmaW5lZCFcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoc2hhcGUueCwgc2hhcGUueSwgc2hhcGUucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLkVMSVApXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy8gZWxsaXBzZSBjb2RlIHRha2VuIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE3Mjc5OC9ob3ctdG8tZHJhdy1hbi1vdmFsLWluLWh0bWw1LWNhbnZhc1xyXG5cclxuICAgICAgICAgICAgdmFyIHcgPSBzaGFwZS53aWR0aCAqIDI7XHJcbiAgICAgICAgICAgIHZhciBoID0gc2hhcGUuaGVpZ2h0ICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gc2hhcGUueCAtIHcvMjtcclxuICAgICAgICAgICAgdmFyIHkgPSBzaGFwZS55IC0gaC8yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGthcHBhID0gMC41NTIyODQ4LFxyXG4gICAgICAgICAgICAgICAgb3ggPSAodyAvIDIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IGhvcml6b250YWxcclxuICAgICAgICAgICAgICAgIG95ID0gKGggLyAyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCB2ZXJ0aWNhbFxyXG4gICAgICAgICAgICAgICAgeGUgPSB4ICsgdywgICAgICAgICAgIC8vIHgtZW5kXHJcbiAgICAgICAgICAgICAgICB5ZSA9IHkgKyBoLCAgICAgICAgICAgLy8geS1lbmRcclxuICAgICAgICAgICAgICAgIHhtID0geCArIHcgLyAyLCAgICAgICAvLyB4LW1pZGRsZVxyXG4gICAgICAgICAgICAgICAgeW0gPSB5ICsgaCAvIDI7ICAgICAgIC8vIHktbWlkZGxlXHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyh4LCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4LCB5bSAtIG95LCB4bSAtIG94LCB5LCB4bSwgeSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyh4bSArIG94LCB5LCB4ZSwgeW0gLSBveSwgeGUsIHltKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhlLCB5bSArIG95LCB4bSArIG94LCB5ZSwgeG0sIHllKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHhtIC0gb3gsIHllLCB4LCB5bSArIG95LCB4LCB5bSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gVGlueS5QcmltaXRpdmVzLlJSRUMgfHwgZGF0YS50eXBlID09PSBUaW55LlByaW1pdGl2ZXMuUlJFQ19MSk9JTilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcnggPSBzaGFwZS54O1xyXG4gICAgICAgICAgICB2YXIgcnkgPSBzaGFwZS55O1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBzaGFwZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHNoYXBlLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHNoYXBlLnJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXhSYWRpdXMgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDIgfCAwO1xyXG4gICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgPiBtYXhSYWRpdXMgPyBtYXhSYWRpdXMgOiByYWRpdXM7XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhyeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5ICsgaGVpZ2h0LCByeCArIHJhZGl1cywgcnkgKyBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoIC0gcmFkaXVzLCByeSArIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSArIGhlaWdodCwgcnggKyB3aWR0aCwgcnkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHdpZHRoLCByeSArIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhyeCArIHdpZHRoLCByeSwgcnggKyB3aWR0aCAtIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhyeCArIHJhZGl1cywgcnkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocngsIHJ5LCByeCwgcnkgKyByYWRpdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQ2FudmFzR3JhcGhpY3MudXBkYXRlR3JhcGhpY3NUaW50ID0gZnVuY3Rpb24oZ3JhcGhpY3MpXHJcbntcclxuICAgIGlmIChncmFwaGljcy50aW50ID09PSAweEZGRkZGRilcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRpbnRSID0gKGdyYXBoaWNzLnRpbnQgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgIHZhciB0aW50RyA9IChncmFwaGljcy50aW50ID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgIHZhciB0aW50QiA9IChncmFwaGljcy50aW50ICYgMHhGRikvIDI1NTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYXBoaWNzLmdyYXBoaWNzRGF0YS5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IGdyYXBoaWNzLmdyYXBoaWNzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IGRhdGEuZmlsbENvbG9yIHwgMDtcclxuICAgICAgICB2YXIgbGluZUNvbG9yID0gZGF0YS5saW5lQ29sb3IgfCAwO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBjb2xvclIgPSAoZmlsbENvbG9yID4+IDE2ICYgMHhGRikgLyAyNTU7XHJcbiAgICAgICAgdmFyIGNvbG9yRyA9IChmaWxsQ29sb3IgPj4gOCAmIDB4RkYpIC8gMjU1O1xyXG4gICAgICAgIHZhciBjb2xvckIgPSAoZmlsbENvbG9yICYgMHhGRikgLyAyNTU7IFxyXG4gICAgICAgIGNvbG9yUiAqPSB0aW50UjtcclxuICAgICAgICBjb2xvckcgKj0gdGludEc7XHJcbiAgICAgICAgY29sb3JCICo9IHRpbnRCO1xyXG4gICAgICAgIGZpbGxDb2xvciA9ICgoY29sb3JSKjI1NSA8PCAxNikgKyAoY29sb3JHKjI1NSA8PCA4KSArIGNvbG9yQioyNTUpO1xyXG4gICAgICAgIGNvbG9yUiA9IChsaW5lQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NTtcclxuICAgICAgICBjb2xvckcgPSAobGluZUNvbG9yID4+IDggJiAweEZGKSAvIDI1NTtcclxuICAgICAgICBjb2xvckIgPSAobGluZUNvbG9yICYgMHhGRikgLyAyNTU7IFxyXG4gICAgICAgIGNvbG9yUiAqPSB0aW50UjtcclxuICAgICAgICBjb2xvckcgKj0gdGludEc7XHJcbiAgICAgICAgY29sb3JCICo9IHRpbnRCO1xyXG4gICAgICAgIGxpbmVDb2xvciA9ICgoY29sb3JSKjI1NSA8PCAxNikgKyAoY29sb3JHKjI1NSA8PCA4KSArIGNvbG9yQioyNTUpOyAgIFxyXG4gICAgICAgICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgZGF0YS5fZmlsbFRpbnQgPSAoKChmaWxsQ29sb3IgPj4gMTYgJiAweEZGKSAvIDI1NSAqIHRpbnRSKjI1NSA8PCAxNikgKyAoKGZpbGxDb2xvciA+PiA4ICYgMHhGRikgLyAyNTUgKiB0aW50RyoyNTUgPDwgOCkgKyAgKGZpbGxDb2xvciAmIDB4RkYpIC8gMjU1ICogdGludEIqMjU1KTtcclxuICAgICAgICBkYXRhLl9saW5lVGludCA9ICgoKGxpbmVDb2xvciA+PiAxNiAmIDB4RkYpIC8gMjU1ICogdGludFIqMjU1IDw8IDE2KSArICgobGluZUNvbG9yID4+IDggJiAweEZGKSAvIDI1NSAqIHRpbnRHKjI1NSA8PCA4KSArICAobGluZUNvbG9yICYgMHhGRikgLyAyNTUgKiB0aW50QioyNTUpO1xyXG5cclxuICAgIH1cclxufTsiLCJcclxuVGlueS5CYXNlVGV4dHVyZUNhY2hlID0ge307XHJcblxyXG5UaW55LkJhc2VUZXh0dXJlQ2FjaGVJZEdlbmVyYXRvciA9IDA7XHJcblxyXG5UaW55LkJhc2VUZXh0dXJlID0gZnVuY3Rpb24oc291cmNlKVxyXG57XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSAxMDA7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAxMDA7XHJcblxyXG4gICAgdGhpcy5oYXNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuXHJcbiAgICB0aGlzLl9VSUQgPSBUaW55Ll9VSUQrKztcclxuXHJcbiAgICB0aGlzLnByZW11bHRpcGxpZWRBbHBoYSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5taXBtYXAgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9kaXJ0eSA9IFt0cnVlLCB0cnVlLCB0cnVlLCB0cnVlXTtcclxuXHJcbiAgICBpZighc291cmNlKXJldHVybjtcclxuXHJcbiAgICBpZigodGhpcy5zb3VyY2UuY29tcGxldGUgfHwgdGhpcy5zb3VyY2UuZ2V0Q29udGV4dCkgJiYgdGhpcy5zb3VyY2Uud2lkdGggJiYgdGhpcy5zb3VyY2UuaGVpZ2h0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaGFzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5zb3VyY2UubmF0dXJhbFdpZHRoIHx8IHRoaXMuc291cmNlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zb3VyY2UubmF0dXJhbEhlaWdodCB8fCB0aGlzLnNvdXJjZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzY29wZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zb3VyY2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmhhc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjb3BlLndpZHRoID0gc2NvcGUuc291cmNlLm5hdHVyYWxXaWR0aCB8fCBzY29wZS5zb3VyY2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHNjb3BlLmhlaWdodCA9IHNjb3BlLnNvdXJjZS5uYXR1cmFsSGVpZ2h0IHx8IHNjb3BlLnNvdXJjZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmltYWdlVXJsID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl9wb3dlck9mMiA9IGZhbHNlO1xyXG5cclxufTtcclxuXHJcblRpbnkuQmFzZVRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5CYXNlVGV4dHVyZTtcclxuXHJcblRpbnkuQmFzZVRleHR1cmUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMuaW1hZ2VVcmwpXHJcbiAgICB7XHJcbiAgICAgICAgZGVsZXRlIFRpbnkuQmFzZVRleHR1cmVDYWNoZVt0aGlzLmtleV07XHJcbiAgICAgICAgZGVsZXRlIFRpbnkuVGV4dHVyZUNhY2hlW3RoaXMua2V5XTtcclxuICAgICAgICB0aGlzLmltYWdlVXJsID0gbnVsbDtcclxuICAgICAgICBpZiAoIW5hdmlnYXRvci5pc0NvY29vbkpTKSB0aGlzLnNvdXJjZS5zcmMgPSAnJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLl9waXhpSWQpXHJcbiAgICB7XHJcbiAgICAgICAgZGVsZXRlIFRpbnkuQmFzZVRleHR1cmVDYWNoZVt0aGlzLnNvdXJjZS5fcGl4aUlkXTtcclxuICAgIH1cclxuICAgIHRoaXMuc291cmNlID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuQmFzZVRleHR1cmUucHJvdG90eXBlLnVwZGF0ZVNvdXJjZUltYWdlID0gZnVuY3Rpb24obmV3U3JjKVxyXG57XHJcbiAgICB0aGlzLmhhc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zb3VyY2Uuc3JjID0gbnVsbDtcclxuICAgIHRoaXMuc291cmNlLnNyYyA9IG5ld1NyYztcclxufTtcclxuXHJcblRpbnkuQmFzZVRleHR1cmUucHJvdG90eXBlLmRpcnR5ID0gZnVuY3Rpb24oKVxyXG57XHJcblxyXG59O1xyXG5cclxuVGlueS5CYXNlVGV4dHVyZS5mcm9tSW1hZ2UgPSBmdW5jdGlvbihrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbilcclxue1xyXG4gICAgdmFyIGJhc2VUZXh0dXJlID0gVGlueS5CYXNlVGV4dHVyZUNhY2hlW2tleV07XHJcblxyXG4gICAgaWYoY3Jvc3NvcmlnaW4gPT09IHVuZGVmaW5lZCAmJiBpbWFnZVVybC5pbmRleE9mKCdkYXRhOicpID09PSAtMSkgY3Jvc3NvcmlnaW4gPSB0cnVlO1xyXG5cclxuICAgIGlmKCFiYXNlVGV4dHVyZSlcclxuICAgIHtcclxuICAgICAgICAvLyBuZXcgSW1hZ2UoKSBicmVha3MgdGV4IGxvYWRpbmcgaW4gc29tZSB2ZXJzaW9ucyBvZiBDaHJvbWUuXHJcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yMzgwNzFcclxuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTsvL2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuICAgICAgICBpZiAoY3Jvc3NvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgYmFzZVRleHR1cmUgPSBuZXcgVGlueS5CYXNlVGV4dHVyZShpbWFnZSk7XHJcbiAgICAgICAgYmFzZVRleHR1cmUuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuICAgICAgICBiYXNlVGV4dHVyZS5rZXkgPSBrZXlcclxuICAgICAgICBUaW55LkJhc2VUZXh0dXJlQ2FjaGVba2V5XSA9IGJhc2VUZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiYXNlVGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuQmFzZVRleHR1cmUuZnJvbUNhbnZhcyA9IGZ1bmN0aW9uKGNhbnZhcylcclxue1xyXG4gICAgaWYoIWNhbnZhcy5fcGl4aUlkKVxyXG4gICAge1xyXG4gICAgICAgIGNhbnZhcy5fcGl4aUlkID0gJ2NhbnZhc18nICsgVGlueS5UZXh0dXJlQ2FjaGVJZEdlbmVyYXRvcisrO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBiYXNlVGV4dHVyZSA9IFRpbnkuQmFzZVRleHR1cmVDYWNoZVtjYW52YXMuX3BpeGlJZF07XHJcblxyXG4gICAgaWYoIWJhc2VUZXh0dXJlKVxyXG4gICAge1xyXG4gICAgICAgIGJhc2VUZXh0dXJlID0gbmV3IFRpbnkuQmFzZVRleHR1cmUoY2FudmFzKTtcclxuICAgICAgICBUaW55LkJhc2VUZXh0dXJlQ2FjaGVbY2FudmFzLl9waXhpSWRdID0gYmFzZVRleHR1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJhc2VUZXh0dXJlO1xyXG59OyIsIlxyXG5UaW55LlJlbmRlclRleHR1cmUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCByZW5kZXJlciwgcmVzb2x1dGlvbilcclxue1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDEwMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMDtcclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHV0aW9uIHx8IDE7XHJcblxyXG4gICAgdGhpcy5mcmFtZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgdGhpcy5jcm9wID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICB0aGlzLmJhc2VUZXh0dXJlID0gbmV3IFRpbnkuQmFzZVRleHR1cmUoKTtcclxuICAgIHRoaXMuYmFzZVRleHR1cmUud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgdGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIHRoaXMuYmFzZVRleHR1cmUuX2dsVGV4dHVyZXMgPSBbXTtcclxuICAgIHRoaXMuYmFzZVRleHR1cmUucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLmJhc2VUZXh0dXJlLmhhc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgVGlueS5UZXh0dXJlLmNhbGwodGhpcyxcclxuICAgICAgICB0aGlzLmJhc2VUZXh0dXJlLFxyXG4gICAgICAgIG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbilcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyIHx8IFRpbnkuZGVmYXVsdFJlbmRlcmVyO1xyXG5cclxuICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXJDYW52YXM7XHJcbiAgICB0aGlzLnRleHR1cmVCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIodGhpcy53aWR0aCogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgIHRoaXMuYmFzZVRleHR1cmUuc291cmNlID0gdGhpcy50ZXh0dXJlQnVmZmVyLmNhbnZhcztcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLl91cGRhdGVVdnMoKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuVGV4dHVyZS5wcm90b3R5cGUpO1xyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5SZW5kZXJUZXh0dXJlO1xyXG5cclxuVGlueS5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCB1cGRhdGVCYXNlKVxyXG57XHJcbiAgICBpZiAod2lkdGggPT09IHRoaXMud2lkdGggJiYgaGVpZ2h0ID09PSB0aGlzLmhlaWdodClyZXR1cm47XHJcblxyXG4gICAgdGhpcy52YWxpZCA9ICh3aWR0aCA+IDAgJiYgaGVpZ2h0ID4gMCk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLmZyYW1lLndpZHRoID0gdGhpcy5jcm9wLndpZHRoID0gd2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICB0aGlzLmZyYW1lLmhlaWdodCA9IHRoaXMuY3JvcC5oZWlnaHQgPSBoZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgaWYgKHVwZGF0ZUJhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5iYXNlVGV4dHVyZS53aWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb247XHJcbiAgICAgICAgdGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBpZighdGhpcy52YWxpZClyZXR1cm47XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyLnJlc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZighdGhpcy52YWxpZClyZXR1cm47XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlQnVmZmVyLmNsZWFyKCk7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlclRleHR1cmUucHJvdG90eXBlLnJlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKGRpc3BsYXlPYmplY3QsIG1hdHJpeCwgY2xlYXIpXHJcbntcclxuICAgIGlmKCF0aGlzLnZhbGlkKXJldHVybjtcclxuXHJcbiAgICB2YXIgd3QgPSBkaXNwbGF5T2JqZWN0LndvcmxkVHJhbnNmb3JtO1xyXG4gICAgd3QuaWRlbnRpdHkoKTtcclxuICAgIGlmKG1hdHJpeCl3dC5hcHBlbmQobWF0cml4KTtcclxuICAgIFxyXG4gICAgLy8gc2V0V29ybGQgQWxwaGEgdG8gZW5zdXJlIHRoYXQgdGhlIG9iamVjdCBpcyByZW5kZXJlciBhdCBmdWxsIG9wYWNpdHlcclxuICAgIGRpc3BsYXlPYmplY3Qud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgLy8gVGltZSB0byB1cGRhdGUgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgZGlzcGxheU9iamVjdCB3aXRoIHRoZSBuZXcgbWF0cml4Li4gICAgXHJcbiAgICB2YXIgY2hpbGRyZW4gPSBkaXNwbGF5T2JqZWN0LmNoaWxkcmVuO1xyXG5cclxuICAgIGZvcih2YXIgaSA9IDAsIGogPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoY2xlYXIpdGhpcy50ZXh0dXJlQnVmZmVyLmNsZWFyKCk7XHJcblxyXG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLnRleHR1cmVCdWZmZXIuY29udGV4dDtcclxuXHJcbiAgICB2YXIgcmVhbFJlc29sdXRpb24gPSB0aGlzLnJlbmRlcmVyLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyRGlzcGxheU9iamVjdChkaXNwbGF5T2JqZWN0LCBjb250ZXh0KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlc29sdXRpb24gPSByZWFsUmVzb2x1dGlvbjtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0SW1hZ2UgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1hZ2Uuc3JjID0gdGhpcy5nZXRCYXNlNjQoKTtcclxuICAgIHJldHVybiBpbWFnZTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0QmFzZTY0ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDYW52YXMoKS50b0RhdGFVUkwoKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuZ2V0Q2FudmFzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy50ZXh0dXJlQnVmZmVyLmNhbnZhcztcclxufTsiLCJcclxuVGlueS5UZXh0dXJlQ2FjaGUgPSB7fTtcclxuVGlueS5GcmFtZUNhY2hlID0ge307XHJcblxyXG5UaW55LlRleHR1cmVTaWxlbnRGYWlsID0gZmFsc2U7XHJcblxyXG5UaW55LlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yID0gMDtcclxuXHJcblRpbnkuVGV4dHVyZSA9IGZ1bmN0aW9uKGJhc2VUZXh0dXJlLCBmcmFtZSwgY3JvcCwgdHJpbSlcclxue1xyXG4gICAgdGhpcy5ub0ZyYW1lID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFmcmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vRnJhbWUgPSB0cnVlO1xyXG4gICAgICAgIGZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsMCwxLDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChiYXNlVGV4dHVyZSBpbnN0YW5jZW9mIFRpbnkuVGV4dHVyZSlcclxuICAgIHtcclxuICAgICAgICBiYXNlVGV4dHVyZSA9IGJhc2VUZXh0dXJlLmJhc2VUZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYmFzZVRleHR1cmUgPSBiYXNlVGV4dHVyZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy50cmltID0gdHJpbTtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5yZXF1aXJlc1VwZGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3V2cyA9IG51bGw7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG5cclxuICAgIHRoaXMuY3JvcCA9IGNyb3AgfHwgbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIGlmIChiYXNlVGV4dHVyZS5oYXNMb2FkZWQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9GcmFtZSkgXHJcbiAgICAgICAgICAgIGZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIGJhc2VUZXh0dXJlLndpZHRoLCBiYXNlVGV4dHVyZS5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuc2V0RnJhbWUoZnJhbWUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGV4dHVyZTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUub25CYXNlVGV4dHVyZUxvYWRlZCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIGJhc2VUZXh0dXJlID0gdGhpcy5iYXNlVGV4dHVyZTtcclxuXHJcbiAgICBpZiAodGhpcy5ub0ZyYW1lKSB0aGlzLmZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIGJhc2VUZXh0dXJlLndpZHRoLCBiYXNlVGV4dHVyZS5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuc2V0RnJhbWUodGhpcy5mcmFtZSk7XHJcblxyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oZGVzdHJveUJhc2UpXHJcbntcclxuICAgIGlmIChkZXN0cm95QmFzZSkgdGhpcy5iYXNlVGV4dHVyZS5kZXN0cm95KCk7XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5zZXRGcmFtZSA9IGZ1bmN0aW9uKGZyYW1lKVxyXG57XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcbiAgICB0aGlzLndpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLmNyb3AueCA9IGZyYW1lLng7XHJcbiAgICB0aGlzLmNyb3AueSA9IGZyYW1lLnk7XHJcbiAgICB0aGlzLmNyb3Aud2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgIHRoaXMuY3JvcC5oZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLnRyaW0gJiYgKGZyYW1lLnggKyBmcmFtZS53aWR0aCA+IHRoaXMuYmFzZVRleHR1cmUud2lkdGggfHwgZnJhbWUueSArIGZyYW1lLmhlaWdodCA+IHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0KSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIVRpbnkuVGV4dHVyZVNpbGVudEZhaWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RleHR1cmUgRXJyb3I6IGZyYW1lIGRvZXMgbm90IGZpdCBpbnNpZGUgdGhlIGJhc2UgVGV4dHVyZSBkaW1lbnNpb25zICcgKyB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZyYW1lICYmIGZyYW1lLndpZHRoICYmIGZyYW1lLmhlaWdodCAmJiB0aGlzLmJhc2VUZXh0dXJlLnNvdXJjZSAmJiB0aGlzLmJhc2VUZXh0dXJlLmhhc0xvYWRlZDtcclxuXHJcbiAgICBpZiAodGhpcy50cmltKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLnRyaW0ud2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLnRyaW0uaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZnJhbWUud2lkdGggPSB0aGlzLnRyaW0ud2lkdGg7XHJcbiAgICAgICAgdGhpcy5mcmFtZS5oZWlnaHQgPSB0aGlzLnRyaW0uaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodGhpcy52YWxpZCkgdGhpcy5fdXBkYXRlVXZzKCk7XHJcblxyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5fdXBkYXRlVXZzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZighdGhpcy5fdXZzKXRoaXMuX3V2cyA9IG5ldyBUaW55LlRleHR1cmVVdnMoKTtcclxuXHJcbiAgICB2YXIgZnJhbWUgPSB0aGlzLmNyb3A7XHJcbiAgICB2YXIgdHcgPSB0aGlzLmJhc2VUZXh0dXJlLndpZHRoO1xyXG4gICAgdmFyIHRoID0gdGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQ7XHJcbiAgICBcclxuICAgIHRoaXMuX3V2cy54MCA9IGZyYW1lLnggLyB0dztcclxuICAgIHRoaXMuX3V2cy55MCA9IGZyYW1lLnkgLyB0aDtcclxuXHJcbiAgICB0aGlzLl91dnMueDEgPSAoZnJhbWUueCArIGZyYW1lLndpZHRoKSAvIHR3O1xyXG4gICAgdGhpcy5fdXZzLnkxID0gZnJhbWUueSAvIHRoO1xyXG5cclxuICAgIHRoaXMuX3V2cy54MiA9IChmcmFtZS54ICsgZnJhbWUud2lkdGgpIC8gdHc7XHJcbiAgICB0aGlzLl91dnMueTIgPSAoZnJhbWUueSArIGZyYW1lLmhlaWdodCkgLyB0aDtcclxuXHJcbiAgICB0aGlzLl91dnMueDMgPSBmcmFtZS54IC8gdHc7XHJcbiAgICB0aGlzLl91dnMueTMgPSAoZnJhbWUueSArIGZyYW1lLmhlaWdodCkgLyB0aDtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5mcm9tSW1hZ2UgPSBmdW5jdGlvbihrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbilcclxue1xyXG4gICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtrZXldO1xyXG5cclxuICAgIGlmKCF0ZXh0dXJlKVxyXG4gICAge1xyXG4gICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKFRpbnkuQmFzZVRleHR1cmUuZnJvbUltYWdlKGtleSwgaW1hZ2VVcmwsIGNyb3Nzb3JpZ2luKSk7XHJcbiAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXlcclxuICAgICAgICBUaW55LlRleHR1cmVDYWNoZVtrZXldID0gdGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5mcm9tRnJhbWUgPSBmdW5jdGlvbihmcmFtZUlkKVxyXG57XHJcbiAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2ZyYW1lSWRdO1xyXG4gICAgaWYoIXRleHR1cmUpIHRocm93IG5ldyBFcnJvcignVGhlIGZyYW1lSWQgXCInICsgZnJhbWVJZCArICdcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdGV4dHVyZSBjYWNoZSAnKTtcclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLmZyb21DYW52YXMgPSBmdW5jdGlvbihjYW52YXMpXHJcbntcclxuICAgIHZhciBiYXNlVGV4dHVyZSA9IFRpbnkuQmFzZVRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXMpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGlueS5UZXh0dXJlKCBiYXNlVGV4dHVyZSApO1xyXG5cclxufTtcclxuXHJcblRpbnkuVGV4dHVyZS5hZGRUZXh0dXJlVG9DYWNoZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGlkKVxyXG57XHJcbiAgICBUaW55LlRleHR1cmVDYWNoZVtpZF0gPSB0ZXh0dXJlO1xyXG59O1xyXG5cclxuXHJcblRpbnkuVGV4dHVyZS5yZW1vdmVUZXh0dXJlRnJvbUNhY2hlID0gZnVuY3Rpb24oaWQpXHJcbntcclxuICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVbaWRdO1xyXG4gICAgZGVsZXRlIFRpbnkuVGV4dHVyZUNhY2hlW2lkXTtcclxuICAgIGRlbGV0ZSBUaW55LkJhc2VUZXh0dXJlQ2FjaGVbaWRdO1xyXG4gICAgcmV0dXJuIHRleHR1cmU7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmVVdnMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMueDAgPSAwO1xyXG4gICAgdGhpcy55MCA9IDA7XHJcblxyXG4gICAgdGhpcy54MSA9IDA7XHJcbiAgICB0aGlzLnkxID0gMDtcclxuXHJcbiAgICB0aGlzLngyID0gMDtcclxuICAgIHRoaXMueTIgPSAwO1xyXG5cclxuICAgIHRoaXMueDMgPSAwO1xyXG4gICAgdGhpcy55MyA9IDA7XHJcbn07IiwiVGlueS5DYW52YXNCdWZmZXIgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzQnVmZmVyO1xyXG5cclxuVGlueS5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KVxyXG57XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59OyIsIlRpbnkuRXZlbnRUYXJnZXQgPSB7XHJcblxyXG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbENvbXBhdChvYmopIHtcclxuICAgICAgICBpZihvYmopIHtcclxuICAgICAgICAgICAgb2JqID0gb2JqLnByb3RvdHlwZSB8fCBvYmo7XHJcbiAgICAgICAgICAgIFRpbnkuRXZlbnRUYXJnZXQubWl4aW4ob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluOiBmdW5jdGlvbiBtaXhpbihvYmopIHtcclxuXHJcbiAgICAgICAgb2JqLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdID8gdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0uc2xpY2UoKSA6IFtdO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5lbWl0ID0gb2JqLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMgfHwge307XHJcblxyXG4gICAgICAgICAgICAvL2JhY2t3YXJkcyBjb21wYXQgd2l0aCBvbGQgbWV0aG9kIFwiLmVtaXQoeyB0eXBlOiAnc29tZXRoaW5nJyB9KVwiXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnROYW1lID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGV2ZW50TmFtZTtcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50eXBlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2Vuc3VyZSB3ZSBhcmUgdXNpbmcgYSByZWFsIFRpbnkgZXZlbnRcclxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEuX19pc0V2ZW50T2JqZWN0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFRpbnkuRXZlbnQodGhpcywgZXZlbnROYW1lLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9pdGVyYXRlIHRoZSBsaXN0ZW5lcnNcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVycyAmJiB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnNsaWNlKDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZm4gPSBsaXN0ZW5lcnNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgaTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBmbiA9IGxpc3RlbmVyc1srK2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYWxsIHRoZSBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgICAgICAgICAgICAgIGZuLl9jYl8uY2FsbChmbi5fY3R4XywgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgXCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cIiBpcyBjYWxsZWQsIHN0b3AgY2FsbGluZyBzaWJsaW5nIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0b3BwZWRJbW1lZGlhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgXCJzdG9wUHJvcGFnYXRpb25cIiBpcyBjYWxsZWQgdGhlbiBkb24ndCBidWJibGUgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYnViYmxlIHRoaXMgZXZlbnQgdXAgdGhlIHNjZW5lIGdyYXBoXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5lbWl0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0LmNhbGwodGhpcy5wYXJlbnQsIGV2ZW50TmFtZSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5vbiA9IG9iai5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gb24oZXZlbnROYW1lLCBmbiwgY2Jjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICh0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSA9IHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdKVxyXG4gICAgICAgICAgICAgICAgLnB1c2goe19jYl86IGZuLCBfY3R4XzogY2Jjb250ZXh0fSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnROYW1lLCBmbiwgY2Jjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uY2VIYW5kbGVyV3JhcHBlcigpIHtcclxuICAgICAgICAgICAgICAgIGZuLmFwcGx5KGNiY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIHNlbGYub2ZmKGV2ZW50TmFtZSwgZm4sIGNiY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9uY2VIYW5kbGVyV3JhcHBlci5fb3JpZ2luYWxIYW5kbGVyID0gZm47XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbihldmVudE5hbWUsIG9uY2VIYW5kbGVyV3JhcHBlciwgY2Jjb250ZXh0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoub2ZmID0gb2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiBvZmYoZXZlbnROYW1lLCBmbiwgY3R4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0sXHJcbiAgICAgICAgICAgICAgICBpID0gZm4gPyBsaXN0Lmxlbmd0aCA6IDA7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoaS0tID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0uX2NiXyA9PT0gZm4gfHwgbGlzdFtpXS5fY2JfLl9vcmlnaW5hbEhhbmRsZXIgPT09IGZuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eCAmJiBsaXN0W2ldLl9jdHhfKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldLl9jdHhfID09PSBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGxpc3QuaW5kZXhPZihsaXN0W2ldKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFjdHggJiYgIWxpc3RbaV0uX2N0eF8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKGxpc3RbaV0pLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMgfHwge307XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5FdmVudCA9IGZ1bmN0aW9uKHRhcmdldCwgbmFtZSwgZGF0YSkge1xyXG4gICAgLy9mb3IgZHVjayB0eXBpbmcgaW4gdGhlIFwiLm9uKClcIiBmdW5jdGlvblxyXG5cclxuICAgIGZvciAodmFyIGsgaW4gZGF0YSkge1xyXG4gICAgICAgIHRoaXNba10gPSBkYXRhW2tdXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fX2lzRXZlbnRPYmplY3QgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc3RvcHBlZEltbWVkaWF0ZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cclxuICAgIHRoaXMudHlwZSA9IG5hbWU7XHJcblxyXG4gICAgdGhpcy50aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG59O1xyXG5cclxuVGlueS5FdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uKCkge1xyXG4gICAgdGhpcy5zdG9wcGVkID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIHtcclxuICAgIHRoaXMuc3RvcHBlZEltbWVkaWF0ZSA9IHRydWU7XHJcbn07IiwidmFyIF9pc1NldFRpbWVPdXQsIF9vbkxvb3AsIF90aW1lT3V0SUQsIF9wcmV2VGltZSwgX2xhc3RUaW1lO1xyXG5cclxudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG59XHJcblxyXG5pZiAoc2VsZi5wZXJmb3JtYW5jZSAhPT0gdW5kZWZpbmVkICYmIHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG5vdyA9IHNlbGYucGVyZm9ybWFuY2Uubm93LmJpbmQoc2VsZi5wZXJmb3JtYW5jZSk7XHJcbn0gZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gRGF0ZS5ub3c7XHJcbn1cclxuXHJcblRpbnkuUkFGID0gZnVuY3Rpb24gKGdhbWUsIGZvcmNlU2V0VGltZU91dClcclxue1xyXG5cclxuICAgIGlmIChmb3JjZVNldFRpbWVPdXQgPT09IHVuZGVmaW5lZCkgeyBmb3JjZVNldFRpbWVPdXQgPSBmYWxzZTsgfVxyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuXHJcbiAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5mb3JjZVNldFRpbWVPdXQgPSBmb3JjZVNldFRpbWVPdXQ7XHJcblxyXG4gICAgdmFyIHZlbmRvcnMgPSBbXHJcbiAgICAgICAgJ21zJyxcclxuICAgICAgICAnbW96JyxcclxuICAgICAgICAnd2Via2l0JyxcclxuICAgICAgICAnbydcclxuICAgIF07XHJcblxyXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgeCsrKVxyXG4gICAge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIF9vbkxvb3AgPSBudWxsO1xyXG4gICAgX3RpbWVPdXRJRCA9IG51bGw7XHJcblxyXG4gICAgX3ByZXZUaW1lID0gMFxyXG4gICAgX2xhc3RUaW1lID0gMFxyXG59O1xyXG5cclxuVGlueS5SQUYucHJvdG90eXBlID0ge1xyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG5cclxuICAgICAgICBfcHJldlRpbWUgPSBub3coKVxyXG5cclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB0aGlzLmZvcmNlU2V0VGltZU91dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9pc1NldFRpbWVPdXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgX29uTG9vcCA9IGZ1bmN0aW9uICgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy51cGRhdGVTZXRUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnNldFRpbWVvdXQoX29uTG9vcCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy51cGRhdGVSQUYoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9vbkxvb3ApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlUkFGOiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIF9sYXN0VGltZSA9IG5vdygpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5fdXBkYXRlKE1hdGguZmxvb3IoX2xhc3RUaW1lKSwgX2xhc3RUaW1lIC0gX3ByZXZUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9vbkxvb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3ByZXZUaW1lID0gX2xhc3RUaW1lXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVTZXRUaW1lb3V0OiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIF9sYXN0VGltZSA9IG5vdygpXHJcbiAgICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIHRoaXMuZ2FtZS50aW1lLnRpbWVUb0NhbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWVcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICBpZiAoX2lzU2V0VGltZU91dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGltZU91dElEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKF90aW1lT3V0SUQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgaXNTZXRUaW1lT3V0OiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfaXNTZXRUaW1lT3V0O1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1JBRjogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKF9pc1NldFRpbWVPdXQgPT09IGZhbHNlKTtcclxuICAgIH1cclxuXHJcbn07IiwiLyoqXHJcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxyXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcclxuICovXHJcblxyXG5cclxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLl90d2VlbnMgPSB7fTtcclxuXHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG59O1xyXG5cclxuX0dyb3VwLnByb3RvdHlwZSA9IHtcclxuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKS5tYXAoZnVuY3Rpb24gKHR3ZWVuSWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3R3ZWVuc1t0d2VlbklkXTtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xyXG5cclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG5cclxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xyXG5cdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV0gPSB0d2VlbjtcclxuXHJcblx0fSxcclxuXHJcblx0cmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcclxuXHJcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldO1xyXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldO1xyXG5cclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xyXG5cclxuXHRcdHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XHJcblxyXG5cdFx0aWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBUV0VFTi5ub3coKTtcclxuXHJcblx0XHQvLyBUd2VlbnMgYXJlIHVwZGF0ZWQgaW4gXCJiYXRjaGVzXCIuIElmIHlvdSBhZGQgYSBuZXcgdHdlZW4gZHVyaW5nIGFuXHJcblx0XHQvLyB1cGRhdGUsIHRoZW4gdGhlIG5ldyB0d2VlbiB3aWxsIGJlIHVwZGF0ZWQgaW4gdGhlIG5leHQgYmF0Y2guXHJcblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC5cclxuXHRcdC8vIEhvd2V2ZXIsIGlmIHRoZSByZW1vdmVkIHR3ZWVuIHdhcyBhZGRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgYmF0Y2gsXHJcblx0XHQvLyB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXHJcblx0XHR3aGlsZSAodHdlZW5JZHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xyXG5cclxuXHRcdFx0XHRpZiAodHdlZW4gJiYgdHdlZW4udXBkYXRlKHRpbWUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmICghcHJlc2VydmUpIHtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fVxyXG59O1xyXG5cclxudmFyIFRXRUVOID0gbmV3IF9Hcm91cCgpO1xyXG5cclxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XHJcblRXRUVOLl9uZXh0SWQgPSAwO1xyXG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcclxufTtcclxuXHJcblxyXG4vLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxyXG4vLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXHJcbmlmICh0eXBlb2YgKHNlbGYpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmhydGltZSkge1xyXG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcclxuXHJcblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxyXG5cdFx0cmV0dXJuIHRpbWVbMF0gKiAxMDAwICsgdGltZVsxXSAvIDEwMDAwMDA7XHJcblx0fTtcclxufVxyXG4vLyBJbiBhIGJyb3dzZXIsIHVzZSBzZWxmLnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXHJcbmVsc2UgaWYgKHR5cGVvZiAoc2VsZikgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgICAgIHNlbGYucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0IHNlbGYucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcclxuXHQvLyBUaGlzIG11c3QgYmUgYm91bmQsIGJlY2F1c2UgZGlyZWN0bHkgYXNzaWduaW5nIHRoaXMgZnVuY3Rpb25cclxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXHJcblx0VFdFRU4ubm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxufVxyXG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG5lbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XHJcbn1cclxuLy8gT3RoZXJ3aXNlLCB1c2UgJ25ldyBEYXRlKCkuZ2V0VGltZSgpJy5cclxuZWxzZSB7XHJcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdH07XHJcbn1cclxuXHJcblxyXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XHJcblx0dGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9wYXVzZVN0YXJ0ID0gbnVsbDtcclxuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XHJcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcclxuXHR0aGlzLl92YWx1ZXNFbmQgPSB7fTtcclxuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xyXG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcclxuXHR0aGlzLl9yZXBlYXQgPSAwO1xyXG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcclxuXHR0aGlzLl95b3lvID0gZmFsc2U7XHJcblx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XHJcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xyXG5cdHRoaXMuX3N0YXJ0VGltZSA9IG51bGw7XHJcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XHJcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XHJcblx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IFtdO1xyXG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XHJcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuXHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xyXG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLl9ncm91cCA9IGdyb3VwIHx8IFRXRUVOO1xyXG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XHJcblxyXG59O1xyXG5cclxuVFdFRU4uVHdlZW4ucHJvdG90eXBlID0ge1xyXG5cdGdldElkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faWQ7XHJcblx0fSxcclxuXHJcblx0aXNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xyXG5cdH0sXHJcblxyXG5cdGlzUGF1c2VkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNQYXVzZWQ7XHJcblx0fSxcclxuXHJcblx0dG86IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xyXG5cclxuXHRcdHRoaXMuX3ZhbHVlc0VuZCA9IE9iamVjdC5jcmVhdGUocHJvcGVydGllcyk7XHJcblxyXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0ZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKGQpIHtcclxuXHRcdHRoaXMuX2R1cmF0aW9uID0gZDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN0YXJ0OiBmdW5jdGlvbiAodGltZSkge1xyXG5cclxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XHJcblx0XHR0aGlzLl9zdGFydFRpbWUgKz0gdGhpcy5fZGVsYXlUaW1lO1xyXG5cclxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXHJcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxyXG5cdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSBbdGhpcy5fb2JqZWN0W3Byb3BlcnR5XV0uY29uY2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcclxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XHJcblx0XHRcdGlmICh0aGlzLl9vYmplY3RbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUsIGJ1dCBvbmx5IG9uY2UuXHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0c3RvcDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RvcENoYWluZWRUd2VlbnMoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZShJbmZpbml0eSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0cGF1c2U6IGZ1bmN0aW9uKHRpbWUpIHtcclxuXHJcblx0XHRpZiAodGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VTdGFydCA9IHRpbWUgPT09IHVuZGVmaW5lZCA/IFRXRUVOLm5vdygpIDogdGltZTtcclxuXHJcblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlc3VtZTogZnVuY3Rpb24odGltZSkge1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSAodGltZSA9PT0gdW5kZWZpbmVkID8gVFdFRU4ubm93KCkgOiB0aW1lKVxyXG5cdFx0XHQtIHRoaXMuX3BhdXNlU3RhcnQ7XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VTdGFydCA9IDA7XHJcblxyXG5cdFx0dGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcclxuXHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdG9wKCk7XHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdGdyb3VwOiBmdW5jdGlvbiAoZ3JvdXApIHtcclxuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRkZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xyXG5cclxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRyZXBlYXQ6IGZ1bmN0aW9uICh0aW1lcykge1xyXG5cclxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcblxyXG5cdFx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHlveW86IGZ1bmN0aW9uICh5b3lvKSB7XHJcblxyXG5cdFx0dGhpcy5feW95byA9IHlveW87XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0ZWFzaW5nOiBmdW5jdGlvbiAoZWFzaW5nRnVuY3Rpb24pIHtcclxuXHJcblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhc2luZ0Z1bmN0aW9uO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGludGVycG9sYXRpb246IGZ1bmN0aW9uIChpbnRlcnBvbGF0aW9uRnVuY3Rpb24pIHtcclxuXHJcblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uRnVuY3Rpb247XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0Y2hhaW46IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gYXJndW1lbnRzO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uVXBkYXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0b25SZXBlYXQ6IGZ1bmN0aW9uIG9uUmVwZWF0KGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uQ29tcGxldGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG5cclxuXHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG9uU3RvcDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lKSB7XHJcblxyXG5cdFx0dmFyIHByb3BlcnR5O1xyXG5cdFx0dmFyIGVsYXBzZWQ7XHJcblx0XHR2YXIgdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRpbWUgPCB0aGlzLl9zdGFydFRpbWUpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xyXG5cdFx0ZWxhcHNlZCA9ICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSkgPyAxIDogZWxhcHNlZDtcclxuXHJcblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xyXG5cclxuXHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzRW5kKSB7XHJcblxyXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxyXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XHJcblx0XHRcdHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG5cclxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24oZW5kLCB2YWx1ZSk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXHJcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xyXG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxyXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCwgZWxhcHNlZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGVsYXBzZWQgPT09IDEpIHtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XHJcblxyXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XHJcblx0XHRcdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gKyBwYXJzZUZsb2F0KHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLl95b3lvKSB7XHJcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xyXG5cdFx0XHRcdFx0dGhpcy5fcmV2ZXJzZWQgPSAhdGhpcy5fcmV2ZXJzZWQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fcmVwZWF0RGVsYXlUaW1lICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9kZWxheVRpbWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fb25SZXBlYXRDYWxsYmFjayAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XHJcblx0XHRcdFx0XHQvLyBNYWtlIHRoZSBjaGFpbmVkIHR3ZWVucyBzdGFydCBleGFjdGx5IGF0IHRoZSB0aW1lIHRoZXkgc2hvdWxkLFxyXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXHJcblx0XHRcdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH1cclxufTtcclxuXHJcblxyXG5UV0VFTi5FYXNpbmcgPSB7XHJcblxyXG5cdExpbmVhcjoge1xyXG5cclxuXHRcdE5vbmU6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gaztcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdFF1YWRyYXRpYzoge1xyXG5cclxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiBrO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIGsgKiAoMiAtIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0Q3ViaWM6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiBrICogayAqIGs7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRRdWFydGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRRdWludGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogayAqIGs7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRTaW51c29pZGFsOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdEV4cG9uZW50aWFsOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayA9PT0gMCA/IDAgOiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gayA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLSAxMCAqIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDEwMjQsIGsgLSAxKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDAuNSAqICgtIE1hdGgucG93KDIsIC0gMTAgKiAoayAtIDEpKSArIDIpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0Q2lyY3VsYXI6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRFbGFzdGljOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoayA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRrICo9IDI7XHJcblxyXG5cdFx0XHRpZiAoayA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gLTAuNSAqIE1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAtMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRCYWNrOiB7XHJcblxyXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG5cdFx0XHRyZXR1cm4gayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHZhciBzID0gMS43MDE1ODtcclxuXHJcblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcblxyXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcclxuXHJcblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRCb3VuY2U6IHtcclxuXHJcblx0XHRJbjogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdHJldHVybiAxIC0gVFdFRU4uRWFzaW5nLkJvdW5jZS5PdXQoMSAtIGspO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xyXG5cclxuXHRcdFx0aWYgKGsgPCAoMSAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgxLjUgLyAyLjc1KSkgKiBrICsgMC43NTtcclxuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuXHJcblx0XHRcdGlmIChrIDwgMC41KSB7XHJcblx0XHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuSW4oayAqIDIpICogMC41O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5PdXQoayAqIDIgLSAxKSAqIDAuNSArIDAuNTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xyXG5cclxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIG0gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgZiA9IG0gKiBrO1xyXG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG5cdFx0dmFyIGZuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5MaW5lYXI7XHJcblxyXG5cdFx0aWYgKGsgPCAwKSB7XHJcblx0XHRcdHJldHVybiBmbih2WzBdLCB2WzFdLCBmKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoayA+IDEpIHtcclxuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XHJcblxyXG5cdFx0dmFyIGIgPSAwO1xyXG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XHJcblx0XHR2YXIgcHcgPSBNYXRoLnBvdztcclxuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDw9IG47IGkrKykge1xyXG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYjtcclxuXHJcblx0fSxcclxuXHJcblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcclxuXHJcblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcclxuXHRcdHZhciBmID0gbSAqIGs7XHJcblx0XHR2YXIgaSA9IE1hdGguZmxvb3IoZik7XHJcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XHJcblxyXG5cdFx0aWYgKHZbMF0gPT09IHZbbV0pIHtcclxuXHJcblx0XHRcdGlmIChrIDwgMCkge1xyXG5cdFx0XHRcdGkgPSBNYXRoLmZsb29yKGYgPSBtICogKDEgKyBrKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmbih2WyhpIC0gMSArIG0pICUgbV0sIHZbaV0sIHZbKGkgKyAxKSAlIG1dLCB2WyhpICsgMikgJSBtXSwgZiAtIGkpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiAoayA8IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPiAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIHZbbV0gLSAoZm4odlttXSwgdlttXSwgdlttIC0gMV0sIHZbbSAtIDFdLCBmIC0gbSkgLSB2W21dKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZuKHZbaSA/IGkgLSAxIDogMF0sIHZbaV0sIHZbbSA8IGkgKyAxID8gbSA6IGkgKyAxXSwgdlttIDwgaSArIDIgPyBtIDogaSArIDJdLCBmIC0gaSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRVdGlsczoge1xyXG5cclxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xyXG5cclxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcclxuXHJcblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xyXG5cclxuXHRcdFx0cmV0dXJuIGZjKG4pIC8gZmMoaSkgLyBmYyhuIC0gaSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHR2YXIgYSA9IFsxXTtcclxuXHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xyXG5cclxuXHRcdFx0XHR2YXIgcyA9IDE7XHJcblxyXG5cdFx0XHRcdGlmIChhW25dKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XHJcblx0XHRcdFx0XHRzICo9IGk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhW25dID0gcztcclxuXHRcdFx0XHRyZXR1cm4gcztcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0fSkoKSxcclxuXHJcblx0XHRDYXRtdWxsUm9tOiBmdW5jdGlvbiAocDAsIHAxLCBwMiwgcDMsIHQpIHtcclxuXHJcblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcclxuXHRcdFx0dmFyIHYxID0gKHAzIC0gcDEpICogMC41O1xyXG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcclxuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xyXG5cclxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG53aW5kb3cuVFdFRU4gPSBUV0VFTiIsImlmICghRGF0ZS5ub3cpIHtcclxuICBEYXRlLm5vdyA9IGZ1bmN0aW9uIG5vdygpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICB9O1xyXG59XHJcblxyXG5pZiAodHlwZW9mKEZsb2F0MzJBcnJheSkgPT0gJ3VuZGVmaW5lZCcpXHJcbntcclxuXHR3aW5kb3cuRmxvYXQzMkFycmF5ID0gQXJyYXlcclxufSIsInJlcXVpcmUoJy4uL3NyYy91dGlscy9wb2x5ZmlsbC5qcycpO1xyXG5cclxud2luZG93LlRpbnkgPSByZXF1aXJlKCcuLi9zcmMvVGlueS5qcycpO1xyXG5cclxucmVxdWlyZSgnLi4vc3JjL1RpbnlDb21tb24uanMnKTtcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy9nbG9iYWwuanMnKTtcclxucmVxdWlyZSgnLi4vc3JjL21hdGgvTWF0aC5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoJy4uL3NyYy9tYXRoL1BvaW50LmpzJyk7ICAgICAgLy9cclxucmVxdWlyZSgnLi4vc3JjL21hdGgvTWF0cml4LmpzJyk7ICAgICAvL1xyXG5yZXF1aXJlKCcuLi9zcmMvbWF0aC9SZWN0YW5nbGUuanMnKTsgIC8vICA4IEtiXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvZGlzcGxheS9EaXNwbGF5T2JqZWN0LmpzJyk7ICAgICAgICAgICAgIC8vXHJcbnJlcXVpcmUoJy4uL3NyYy9kaXNwbGF5L0Rpc3BsYXlPYmplY3RDb250YWluZXIuanMnKTsgICAgLy9cclxucmVxdWlyZSgnLi4vc3JjL2Rpc3BsYXkvU3RhZ2UuanMnKTsgICAgICAgICAgICAgICAgICAgICAvLyAxMCBLYlxyXG5cclxucmVxdWlyZSgnLi4vc3JjL3JlbmRlcmVyL0NhbnZhc1JlbmRlcmVyLmpzJyk7IC8vIDMgS2IiLCJyZXF1aXJlKCcuL3N0YW5kYXJkLmpzJylcclxuXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvbWF0aC9Sb3VuZGVkUmVjdGFuZ2xlLmpzJyk7XHQvL1xyXG5yZXF1aXJlKCcuLi9zcmMvbWF0aC9Qb2x5Z29uLmpzJyk7XHRcdFx0Ly9cclxucmVxdWlyZSgnLi4vc3JjL21hdGgvQ2lyY2xlLmpzJyk7XHRcdFx0Ly8gNiBLYlxyXG5cclxucmVxdWlyZSgnLi4vc3JjL3JlbmRlcmVyL0dyYXBoaWNzUmVuZGVyZXIuanMnKTsgLy8gNEtiXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvb2JqZWN0cy9HcmFwaGljcy5qcycpOyAvLyAxMCBLYlxyXG5yZXF1aXJlKCcuLi9zcmMvb2JqZWN0cy9UaWxpbmdTcHJpdGUuanMnKTsgLy8gNCBLYiAgICMjIyMjIyMjIyMjIyMjIyBUaWxpbmdTcHJpdGUgIGdhbWUuYWRkLnRpbGVzcHJpdGVcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlLmpzJyk7IC8vIDIgS2JcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy91dGlscy9DYW52YXNCdWZmZXIuanMnKTsgLy8gMSBLYlxyXG5yZXF1aXJlKCcuLi9zcmMvcmVuZGVyZXIvQ2FudmFzTWFza01hbmFnZXIuanMnKTsgLy8gMUtiXHJcbnJlcXVpcmUoJy4uL3NyYy9yZW5kZXJlci9DYW52YXNUaW50ZXIuanMnKTsgLy8gMyBLYiAjIyMjIyMjIyMjIyMjIyMjIHRpbnQgZnVuY3Rpb25cclxuXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvdXRpbHMvVHdlZW4uanMnKTtcclxuIiwicmVxdWlyZSgnLi9iYXNlLmpzJylcclxuXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvdXRpbHMvUkFGLmpzJyk7IC8vIDIgS2JcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy90ZXh0dXJlcy9CYXNlVGV4dHVyZS5qcycpO1x0Ly9cclxucmVxdWlyZSgnLi4vc3JjL3RleHR1cmVzL1RleHR1cmUuanMnKTtcdFx0Ly8gNCBLYlxyXG5cclxucmVxdWlyZSgnLi4vc3JjL29iamVjdHMvU3ByaXRlLmpzJyk7IC8vIDMgS2JcclxucmVxdWlyZSgnLi4vc3JjL29iamVjdHMvVGV4dC5qcycpOyAvLyA1IEtiXHJcblxyXG5cclxuIiwicmVxdWlyZSgnLi9taW5pLmpzJylcclxuXHJcbnJlcXVpcmUoJy4uL3NyYy9tYW5hZ2Vycy9PYmplY3RDcmVhdG9yLmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZSgnLi4vc3JjL21hbmFnZXJzL0xvYWRlci5qcycpOyAvLyAzIEtiXHJcbnJlcXVpcmUoJy4uL3NyYy9tYW5hZ2Vycy9JbnB1dC5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoJy4uL3NyYy9tYW5hZ2Vycy9UaW1lci5qcycpOyAvLyAxIEtiXHJcblxyXG5yZXF1aXJlKCcuLi9zcmMvdXRpbHMvRXZlbnRUYXJnZXQuanMnKTtcclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==