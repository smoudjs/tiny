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
/*!*********************!*\
  !*** ./src/mini.js ***!
  \*********************/
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

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlueS5taW5pLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlCQUF5QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkJBQTJCO0FBQ25EO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekpBLG1CQUFPLENBQUMsb0RBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMsOEJBQVU7QUFDbEIsbUJBQU8sQ0FBQyxvQ0FBYTtBQUNyQixtQkFBTyxDQUFDLDBDQUFnQixHQUFHO0FBQzNCLG1CQUFPLENBQUMsNENBQWlCLEdBQUc7QUFDNUIsbUJBQU8sQ0FBQyw4Q0FBa0IsR0FBRztBQUM3QixtQkFBTyxDQUFDLG9EQUFxQixHQUFHO0FBQ2hDO0FBQ0EsbUJBQU8sQ0FBQyxnRUFBMkIsR0FBRztBQUN0QyxtQkFBTyxDQUFDLHdEQUF1QixHQUFHO0FBQ2xDLG1CQUFPLENBQUMsa0RBQW9CLEdBQUc7QUFDL0I7QUFDQSxtQkFBTyxDQUFDLHdFQUErQixHQUFHOzs7Ozs7Ozs7OztBQ2YxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUZBQXlGO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7Ozs7QUN2T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDalZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDLHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkMsd0JBQXdCLFVBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx5QkFBeUI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwrQkFBK0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywrQkFBK0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsUUFBUTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0EsNkNBQTZDLHlCQUF5QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCx5QkFBeUI7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUJBQXlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuUEE7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBcUQ7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsZ0NBQWdDLG9CQUFvQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrQ0FBa0M7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLG1CQUFPLENBQUMsZ0NBQVc7QUFDbkI7QUFDQSxtQkFBTyxDQUFDLDhDQUFrQixHQUFHO0FBQzdCLDBDQUEwQztBQUMxQyxtQkFBTyxDQUFDLG9EQUFxQixHQUFHO0FBQ2hDLG1CQUFPLENBQUMsa0RBQW9CLEdBQUc7QUFDL0IsbUJBQU8sQ0FBQyxrREFBb0IsR0FBRztBQUMvQjtBQUNBLG1CQUFPLENBQUMsNERBQXlCO0FBQ2pDO0FBQ0EsbUJBQU8sQ0FBQyx3REFBdUIsR0FBRztBQUNsQztBQUNBLG1CQUFPLENBQUMsb0RBQXFCLEdBQUc7QUFDaEMsbUJBQU8sQ0FBQyxnREFBbUIsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9NYXRoLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9tYXRoL01hdHJpeC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9Qb2ludC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9SZWN0YW5nbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvQmFzZU9iamVjdDJELmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL09iamVjdDJELmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL1NjZW5lLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL1Nwcml0ZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvb2JqZWN0cy9UZXh0LmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9yZW5kZXJlcnMvQ2FudmFzUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvSW5wdXQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvTG9hZGVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL1JBRi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9UaW1lci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdGV4dHVyZXMvVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdXRpbHMvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy91dGlscy9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21pbmkuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcblRpbnkuQXBwID0gZnVuY3Rpb24gKHN0YXRlcykge1xyXG4gICAgdGhpcy5jYWxsYmFja0NvbnRleHQgPSB0aGlzO1xyXG4gICAgdGhpcy5zdGF0ZSA9IDA7XHJcbiAgICB0aGlzLnRpbWVTY2FsZSA9IDE7XHJcbiAgICB0aGlzLndpZHRoID0gMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgIHRoaXMuc3lzdGVtcyA9IFtdO1xyXG4gICAgdGhpcy51cGRhdGFibGUgPSBbXTtcclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhdXNlRHVyYXRpb24gPSAwO1xyXG4gICAgdGhpcy5pbnB1dFZpZXcgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgIGlmICghVGlueS5hcHApIFRpbnkuYXBwID0gdGhpcztcclxuXHJcbiAgICBpZiAoVGlueS5FdmVudEVtaXR0ZXIpIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKHRoaXMpO1xyXG5cclxuICAgIHN0YXRlcyA9IHN0YXRlcyB8fCB7fTtcclxuICAgIHRoaXMuYm9vdCA9IHN0YXRlcy5ib290IHx8IHRoaXMuYm9vdCB8fCBub29wO1xyXG4gICAgdGhpcy5wcmVsb2FkID0gc3RhdGVzLnByZWxvYWQgfHwgdGhpcy5wcmVsb2FkIHx8IG5vb3A7XHJcbiAgICB0aGlzLmNyZWF0ZSA9IHN0YXRlcy5jcmVhdGUgfHwgdGhpcy5jcmVhdGUgfHwgbm9vcDtcclxuICAgIHRoaXMudXBkYXRlID0gc3RhdGVzLnVwZGF0ZSB8fCB0aGlzLnVwZGF0ZSB8fCBub29wO1xyXG4gICAgdGhpcy5yZW5kZXIgPSBzdGF0ZXMucmVuZGVyIHx8IHRoaXMucmVuZGVyIHx8IG5vb3A7XHJcbiAgICB0aGlzLl9yZXNpemVfY2IgPSBzdGF0ZXMucmVzaXplIHx8IG5vb3A7XHJcbiAgICB0aGlzLl9kZXN0cm95X2NiID0gc3RhdGVzLmRlc3Ryb3kgfHwgbm9vcDtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9ib290KCk7XHJcbiAgICB9LCAwKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fYm9vdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHN5c3RlbSA9IFRpbnkuc3lzdGVtc1tpXTtcclxuXHJcbiAgICAgICAgdmFyIF9zeXNfID0gbmV3IHN5c3RlbS5fY2xhc3NfKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtcy5wdXNoKF9zeXNfKTtcclxuICAgICAgICBpZiAoX3N5c18udXBkYXRlKSB0aGlzLnVwZGF0YWJsZS5wdXNoKF9zeXNfKTtcclxuXHJcbiAgICAgICAgaWYgKHN5c3RlbS5uYW1lKSB0aGlzW3N5c3RlbS5uYW1lXSA9IF9zeXNfO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChUaW55LlJBRikge1xyXG4gICAgICAgIHRoaXMucmFmID0gbmV3IFRpbnkuUkFGKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYm9vdC5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoc2VsZi5sb2FkKSBzZWxmLl9wcmVsb2FkKCk7XHJcbiAgICAgICAgZWxzZSBzZWxmLl9jcmVhdGUoKTtcclxuICAgIH0sIDApO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl9wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5wcmVsb2FkLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IDE7XHJcbiAgICB0aGlzLmxvYWQuc3RhcnQodGhpcy5fY3JlYXRlKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5lbWl0KFwibG9hZFwiKTtcclxuICAgIHRoaXMuY3JlYXRlLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG5cclxuICAgIGlmICh0aGlzLnJhZikge1xyXG4gICAgICAgIHRoaXMucmFmLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IDI7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5yYWYpIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wYXVzZWQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLnBhdXNlKSB0aGlzLnN5c3RlbXNbaV0ucGF1c2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5yYWYpIHtcclxuICAgICAgICB0aGlzLnJhZi5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN5c3RlbXNbaV0ucmVzdW1lKSB0aGlzLnN5c3RlbXNbaV0ucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAodGltZSwgZGVsdGEpIHtcclxuICAgIGlmICghdGhpcy5wYXVzZWQpIHtcclxuICAgICAgICBkZWx0YSAqPSB0aGlzLnRpbWVTY2FsZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZS5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aW1lLCBkZWx0YSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwidXBkYXRlXCIsIGRlbHRhKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVwZGF0YWJsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0YWJsZVtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZUR1cmF0aW9uICs9IGRlbHRhO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB0aGlzLmVtaXQoXCJwb3N0cmVuZGVyXCIpO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgdGhpcy53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlID4gMCkge1xyXG4gICAgICAgIHRoaXMuX3Jlc2l6ZV9jYi5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwicmVzaXplXCIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChzZWxmLmlucHV0KSBzZWxmLmlucHV0LnVwZGF0ZUJvdW5kcygpO1xyXG4gICAgfSwgMCk7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChjbGVhckNhY2hlKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLmRlc3Ryb3kpIHRoaXMuc3lzdGVtc1tpXS5kZXN0cm95KGNsZWFyQ2FjaGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoY2xlYXJDYWNoZSkge1xyXG4gICAgICAgIHRoaXMubG9hZC5jbGVhckNhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmFmKSB7XHJcbiAgICAgICAgdGhpcy5yYWYuc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2Rlc3Ryb3lfY2IuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcblxyXG4gICAgaWYgKFRpbnkuYXBwID09PSB0aGlzKSBUaW55LmFwcCA9IG51bGw7XHJcbn07XHJcbiIsInJlcXVpcmUoXCIuL3V0aWxzL3BvbHlmaWxsLmpzXCIpO1xyXG5cclxud2luZG93LlRpbnkgPSB7fTtcclxuXHJcbnJlcXVpcmUoXCIuL0FwcC5qc1wiKTtcclxucmVxdWlyZShcIi4vZ2xvYmFsLmpzXCIpO1xyXG5yZXF1aXJlKFwiLi9tYXRoL01hdGguanNcIik7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vbWF0aC9Qb2ludC5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vbWF0aC9NYXRyaXguanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL21hdGgvUmVjdGFuZ2xlLmpzXCIpOyAvLyAgOCBLYlxyXG5cclxucmVxdWlyZShcIi4vb2JqZWN0cy9CYXNlT2JqZWN0MkQuanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL29iamVjdHMvT2JqZWN0MkQuanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL29iamVjdHMvU2NlbmUuanNcIik7IC8vIDEwIEtiXHJcblxyXG5yZXF1aXJlKFwiLi9yZW5kZXJlcnMvQ2FudmFzUmVuZGVyZXIuanNcIik7IC8vIDMgS2JcclxuIiwiVGlueS5WRVJTSU9OID0gJzIuMS4xMic7XHJcblxyXG5UaW55LnN5c3RlbXMgPSBbXTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0gPSBmdW5jdGlvbiAobmFtZSwgc3lzdGVtKSB7XHJcbiAgICBUaW55LnN5c3RlbXMucHVzaCh7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBfY2xhc3NfOiBzeXN0ZW1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuVGlueS5QcmltaXRpdmVzID0ge1xyXG4gICAgUE9MWTogMCxcclxuICAgIFJFQ1Q6IDEsXHJcbiAgICBDSVJDOiAyLFxyXG4gICAgRUxJUDogMyxcclxuICAgIFJSRUM6IDQsXHJcbiAgICBSUkVDX0xKT0lOOiA1XHJcbn07XHJcblxyXG5UaW55LnJuZCA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XHJcbn07XHJcblxyXG5UaW55LnN0eWxlMmhleCA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG4gICAgcmV0dXJuICtjb2xvci5yZXBsYWNlKCcjJywgJzB4Jyk7XHJcbn07XHJcblxyXG5UaW55LmhleDJzdHlsZSA9IGZ1bmN0aW9uIChoZXgpIHtcclxuICAgIHJldHVybiAnIycgKyAoJzAwMDAwJyArIChoZXggfCAwKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7XHJcbn07XHJcblxyXG5UaW55LmhleDJyZ2IgPSBmdW5jdGlvbiAoaGV4KSB7XHJcbiAgICByZXR1cm4gWygoaGV4ID4+IDE2KSAmIDB4ZmYpIC8gMjU1LCAoKGhleCA+PiA4KSAmIDB4ZmYpIC8gMjU1LCAoaGV4ICYgMHhmZikgLyAyNTVdO1xyXG59O1xyXG5cclxuVGlueS5yZ2IyaGV4ID0gZnVuY3Rpb24gKHJnYikge1xyXG4gICAgcmV0dXJuICgocmdiWzBdICogMjU1KSA8PCAxNikgKyAoKHJnYlsxXSAqIDI1NSkgPDwgOCkgKyByZ2JbMl0gKiAyNTU7XHJcbn07XHJcbiIsIlRpbnkuTWF0aCA9IHtcclxuICAgIGRpc3RhbmNlOiBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgICAgICB2YXIgZHggPSB4MSAtIHgyO1xyXG4gICAgICAgIHZhciBkeSA9IHkxIC0geTI7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvciA9IE1hdGguUEkgLyAxODA7XHJcbnZhciByYWRpYW5Ub0RlZ3JlZXNGYWN0b3IgPSAxODAgLyBNYXRoLlBJO1xyXG5cclxuVGlueS5NYXRoLmRlZ1RvUmFkID0gZnVuY3Rpb24gZGVnVG9SYWQoZGVncmVlcykge1xyXG4gICAgcmV0dXJuIGRlZ3JlZXMgKiBkZWdyZWVUb1JhZGlhbnNGYWN0b3I7XHJcbn07XHJcblxyXG5UaW55Lk1hdGgucmFkVG9EZWcgPSBmdW5jdGlvbiByYWRUb0RlZyhyYWRpYW5zKSB7XHJcbiAgICByZXR1cm4gcmFkaWFucyAqIHJhZGlhblRvRGVncmVlc0ZhY3RvcjtcclxufTtcclxuIiwiVGlueS5NYXRyaXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmEgPSAxO1xyXG5cclxuICAgIHRoaXMuYiA9IDA7XHJcblxyXG4gICAgdGhpcy5jID0gMDtcclxuXHJcbiAgICB0aGlzLmQgPSAxO1xyXG5cclxuICAgIHRoaXMudHggPSAwO1xyXG5cclxuICAgIHRoaXMudHkgPSAwO1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuTUFUUklYO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmZyb21BcnJheSA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgdGhpcy5hID0gYXJyYXlbMF07XHJcbiAgICB0aGlzLmIgPSBhcnJheVsxXTtcclxuICAgIHRoaXMuYyA9IGFycmF5WzNdO1xyXG4gICAgdGhpcy5kID0gYXJyYXlbNF07XHJcbiAgICB0aGlzLnR4ID0gYXJyYXlbMl07XHJcbiAgICB0aGlzLnR5ID0gYXJyYXlbNV07XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICh0cmFuc3Bvc2UpIHtcclxuICAgIGlmICghdGhpcy5hcnJheSkge1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XHJcblxyXG4gICAgaWYgKHRyYW5zcG9zZSkge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5iO1xyXG4gICAgICAgIGFycmF5WzJdID0gMDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYztcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IDA7XHJcbiAgICAgICAgYXJyYXlbNl0gPSB0aGlzLnR4O1xyXG4gICAgICAgIGFycmF5WzddID0gdGhpcy50eTtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFycmF5WzBdID0gdGhpcy5hO1xyXG4gICAgICAgIGFycmF5WzFdID0gdGhpcy5jO1xyXG4gICAgICAgIGFycmF5WzJdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVszXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVs0XSA9IHRoaXMuZDtcclxuICAgICAgICBhcnJheVs1XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbNl0gPSAwO1xyXG4gICAgICAgIGFycmF5WzddID0gMDtcclxuICAgICAgICBhcnJheVs4XSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24gKHBvcywgbmV3UG9zKSB7XHJcbiAgICBuZXdQb3MgPSBuZXdQb3MgfHwgbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB2YXIgeCA9IHBvcy54O1xyXG4gICAgdmFyIHkgPSBwb3MueTtcclxuXHJcbiAgICBuZXdQb3MueCA9IHRoaXMuYSAqIHggKyB0aGlzLmMgKiB5ICsgdGhpcy50eDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5iICogeCArIHRoaXMuZCAqIHkgKyB0aGlzLnR5O1xyXG5cclxuICAgIHJldHVybiBuZXdQb3M7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwbHlJbnZlcnNlID0gZnVuY3Rpb24gKHBvcywgbmV3UG9zKSB7XHJcbiAgICBuZXdQb3MgPSBuZXdQb3MgfHwgbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB2YXIgaWQgPSAxIC8gKHRoaXMuYSAqIHRoaXMuZCArIHRoaXMuYyAqIC10aGlzLmIpO1xyXG4gICAgdmFyIHggPSBwb3MueDtcclxuICAgIHZhciB5ID0gcG9zLnk7XHJcblxyXG4gICAgbmV3UG9zLnggPSB0aGlzLmQgKiBpZCAqIHggKyAtdGhpcy5jICogaWQgKiB5ICsgKHRoaXMudHkgKiB0aGlzLmMgLSB0aGlzLnR4ICogdGhpcy5kKSAqIGlkO1xyXG4gICAgbmV3UG9zLnkgPSB0aGlzLmEgKiBpZCAqIHkgKyAtdGhpcy5iICogaWQgKiB4ICsgKC10aGlzLnR5ICogdGhpcy5hICsgdGhpcy50eCAqIHRoaXMuYikgKiBpZDtcclxuXHJcbiAgICByZXR1cm4gbmV3UG9zO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLnR4ICs9IHg7XHJcbiAgICB0aGlzLnR5ICs9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdGhpcy5hICo9IHg7XHJcbiAgICB0aGlzLmQgKj0geTtcclxuICAgIHRoaXMuYyAqPSB4O1xyXG4gICAgdGhpcy5iICo9IHk7XHJcbiAgICB0aGlzLnR4ICo9IHg7XHJcbiAgICB0aGlzLnR5ICo9IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgdmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcclxuXHJcbiAgICB2YXIgYTEgPSB0aGlzLmE7XHJcbiAgICB2YXIgYzEgPSB0aGlzLmM7XHJcbiAgICB2YXIgdHgxID0gdGhpcy50eDtcclxuXHJcbiAgICB0aGlzLmEgPSBhMSAqIGNvcyAtIHRoaXMuYiAqIHNpbjtcclxuICAgIHRoaXMuYiA9IGExICogc2luICsgdGhpcy5iICogY29zO1xyXG4gICAgdGhpcy5jID0gYzEgKiBjb3MgLSB0aGlzLmQgKiBzaW47XHJcbiAgICB0aGlzLmQgPSBjMSAqIHNpbiArIHRoaXMuZCAqIGNvcztcclxuICAgIHRoaXMudHggPSB0eDEgKiBjb3MgLSB0aGlzLnR5ICogc2luO1xyXG4gICAgdGhpcy50eSA9IHR4MSAqIHNpbiArIHRoaXMudHkgKiBjb3M7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgdmFyIGExID0gdGhpcy5hO1xyXG4gICAgdmFyIGIxID0gdGhpcy5iO1xyXG4gICAgdmFyIGMxID0gdGhpcy5jO1xyXG4gICAgdmFyIGQxID0gdGhpcy5kO1xyXG5cclxuICAgIHRoaXMuYSA9IG1hdHJpeC5hICogYTEgKyBtYXRyaXguYiAqIGMxO1xyXG4gICAgdGhpcy5iID0gbWF0cml4LmEgKiBiMSArIG1hdHJpeC5iICogZDE7XHJcbiAgICB0aGlzLmMgPSBtYXRyaXguYyAqIGExICsgbWF0cml4LmQgKiBjMTtcclxuICAgIHRoaXMuZCA9IG1hdHJpeC5jICogYjEgKyBtYXRyaXguZCAqIGQxO1xyXG5cclxuICAgIHRoaXMudHggPSBtYXRyaXgudHggKiBhMSArIG1hdHJpeC50eSAqIGMxICsgdGhpcy50eDtcclxuICAgIHRoaXMudHkgPSBtYXRyaXgudHggKiBiMSArIG1hdHJpeC50eSAqIGQxICsgdGhpcy50eTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5pZGVudGl0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYSA9IDE7XHJcbiAgICB0aGlzLmIgPSAwO1xyXG4gICAgdGhpcy5jID0gMDtcclxuICAgIHRoaXMuZCA9IDE7XHJcbiAgICB0aGlzLnR4ID0gMDtcclxuICAgIHRoaXMudHkgPSAwO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5pZGVudGl0eU1hdHJpeCA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4iLCJUaW55LlBvaW50ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgIHRoaXMueSA9IHkgfHwgMDtcclxufTtcclxuXHJcblRpbnkuUG9pbnQucHJvdG90eXBlID0ge1xyXG4gICAgc2V0OiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8ICh5ICE9PSAwID8gdGhpcy54IDogMCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlJlY3RhbmdsZSA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB4ID0geCB8fCAwO1xyXG4gICAgeSA9IHkgfHwgMDtcclxuICAgIHdpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIGhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5SRUNUO1xyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUucHJvdG90eXBlID0ge1xyXG4gICAgc2V0VG86IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHJldHVybiBUaW55LlJlY3RhbmdsZS5jb250YWlucyh0aGlzLCB4LCB5KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW50ZXJzZWN0czogZnVuY3Rpb24gKGIpIHtcclxuICAgICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0cyh0aGlzLCBiKTtcclxuICAgIH1cclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlJlY3RhbmdsZS5wcm90b3R5cGUsIFwiYm90dG9tXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPD0gdGhpcy55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHZhbHVlIC0gdGhpcy55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLngpIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHZhbHVlIC0gdGhpcy54O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcInZvbHVtZVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmVjdGFuZ2xlO1xyXG5cclxuVGlueS5SZWN0YW5nbGUuY29udGFpbnMgPSBmdW5jdGlvbiAoYSwgeCwgeSkge1xyXG4gICAgaWYgKGEud2lkdGggPD0gMCB8fCBhLmhlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4ID49IGEueCAmJiB4IDwgYS5yaWdodCAmJiB5ID49IGEueSAmJiB5IDwgYS5ib3R0b207XHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKGEsIHBvaW50KSB7XHJcbiAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuY29udGFpbnMoYSwgcG9pbnQueCwgcG9pbnQueSk7XHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5jb250YWluc1JlY3QgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgLy8gIElmIHRoZSBnaXZlbiByZWN0IGhhcyBhIGxhcmdlciB2b2x1bWUgdGhhbiB0aGlzIG9uZSB0aGVuIGl0IGNhbiBuZXZlciBjb250YWluIGl0XHJcbiAgICBpZiAoYS52b2x1bWUgPiBiLnZvbHVtZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYS54ID49IGIueCAmJiBhLnkgPj0gYi55ICYmIGEucmlnaHQgPCBiLnJpZ2h0ICYmIGEuYm90dG9tIDwgYi5ib3R0b207XHJcbn07XHJcblxyXG5UaW55LlJlY3RhbmdsZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIGlmIChhLndpZHRoIDw9IDAgfHwgYS5oZWlnaHQgPD0gMCB8fCBiLndpZHRoIDw9IDAgfHwgYi5oZWlnaHQgPD0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIShhLnJpZ2h0IDwgYi54IHx8IGEuYm90dG9tIDwgYi55IHx8IGEueCA+IGIucmlnaHQgfHwgYS55ID4gYi5ib3R0b20pO1xyXG59O1xyXG5cclxuVGlueS5FbXB0eVJlY3RhbmdsZSA9IG5ldyBUaW55LlJlY3RhbmdsZSgwLCAwLCAwLCAwKTtcclxuIiwidmFyIHBpMiA9IE1hdGguUEkgKiAyO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFRpbnkuUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnNjYWxlID0gbmV3IFRpbnkuUG9pbnQoMSwgMSk7XHJcbiAgICB0aGlzLnBpdm90ID0gbmV3IFRpbnkuUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgIHRoaXMuYWxwaGEgPSAxO1xyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuICAgIHRoaXMuX3NyID0gMDtcclxuICAgIHRoaXMuX2NyID0gMTtcclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQmFzZU9iamVjdDJEO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnQpIHRoaXMucGFyZW50LnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbnVsbDtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCBcIndvcmxkVmlzaWJsZVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaXRlbSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLnZpc2libGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ucGFyZW50O1xyXG4gICAgICAgIH0gd2hpbGUgKGl0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCBcImNhY2hlQXNCaXRtYXBcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlQXNCaXRtYXA7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXAgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgc29tZSBtYXRyaXggcmVmcyBmb3IgZWFzeSBhY2Nlc3NcclxuICAgIHZhciBwdCA9IHRoaXMucGFyZW50LndvcmxkVHJhbnNmb3JtO1xyXG4gICAgdmFyIHd0ID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICAvLyB0ZW1wb3JhcnkgbWF0cml4IHZhcmlhYmxlc1xyXG4gICAgdmFyIGEsIGIsIGMsIGQsIHR4LCB0eTtcclxuXHJcbiAgICAvLyBzbyBpZiByb3RhdGlvbiBpcyBiZXR3ZWVuIDAgdGhlbiB3ZSBjYW4gc2ltcGxpZnkgdGhlIG11bHRpcGxpY2F0aW9uIHByb2Nlc3MuLlxyXG4gICAgaWYgKHRoaXMucm90YXRpb24gJSBwaTIpIHtcclxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHJvdGF0aW9uIGlzIHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91cyByZW5kZXIuIFRoaXMgbWVhbnMgd2Ugb25seSBuZWVkIHRvIHVzZSBzaW4gYW5kIGNvcyB3aGVuIHJvdGF0aW9uIGFjdHVhbGx5IGNoYW5nZXNcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbiAhPT0gdGhpcy5yb3RhdGlvbkNhY2hlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb25DYWNoZSA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX3NyID0gTWF0aC5zaW4odGhpcy5yb3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyID0gTWF0aC5jb3ModGhpcy5yb3RhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG1hdHJpeCB2YWx1ZXMgb2YgdGhlIGRpc3BsYXlvYmplY3QgYmFzZWQgb24gaXRzIHRyYW5zZm9ybSBwcm9wZXJ0aWVzLi5cclxuICAgICAgICBhID0gdGhpcy5fY3IgKiB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgYiA9IHRoaXMuX3NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGMgPSAtdGhpcy5fc3IgKiB0aGlzLnNjYWxlLnk7XHJcbiAgICAgICAgZCA9IHRoaXMuX2NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIHR4ID0gdGhpcy5wb3NpdGlvbi54O1xyXG4gICAgICAgIHR5ID0gdGhpcy5wb3NpdGlvbi55O1xyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgcGl2b3QuLiBub3Qgb2Z0ZW4gdXNlZCBzbyBnZWFyZWQgdG93YXJkcyB0aGF0IGZhY3QhXHJcbiAgICAgICAgaWYgKHRoaXMucGl2b3QueCB8fCB0aGlzLnBpdm90LnkpIHtcclxuICAgICAgICAgICAgdHggLT0gdGhpcy5waXZvdC54ICogYSArIHRoaXMucGl2b3QueSAqIGM7XHJcbiAgICAgICAgICAgIHR5IC09IHRoaXMucGl2b3QueCAqIGIgKyB0aGlzLnBpdm90LnkgKiBkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uY2F0IHRoZSBwYXJlbnQgbWF0cml4IHdpdGggdGhlIG9iamVjdHMgdHJhbnNmb3JtLlxyXG4gICAgICAgIHd0LmEgPSBhICogcHQuYSArIGIgKiBwdC5jO1xyXG4gICAgICAgIHd0LmIgPSBhICogcHQuYiArIGIgKiBwdC5kO1xyXG4gICAgICAgIHd0LmMgPSBjICogcHQuYSArIGQgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgPSBjICogcHQuYiArIGQgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbGV0cyBkbyB0aGUgZmFzdCB2ZXJzaW9uIGFzIHdlIGtub3cgdGhlcmUgaXMgbm8gcm90YXRpb24uLlxyXG4gICAgICAgIGEgPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICAgZCA9IHRoaXMuc2NhbGUueTtcclxuXHJcbiAgICAgICAgdHggPSB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnBpdm90LnggKiBhO1xyXG4gICAgICAgIHR5ID0gdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5waXZvdC55ICogZDtcclxuXHJcbiAgICAgICAgd3QuYSA9IGEgKiBwdC5hO1xyXG4gICAgICAgIHd0LmIgPSBhICogcHQuYjtcclxuICAgICAgICB3dC5jID0gZCAqIHB0LmM7XHJcbiAgICAgICAgd3QuZCA9IGQgKiBwdC5kO1xyXG4gICAgICAgIHd0LnR4ID0gdHggKiBwdC5hICsgdHkgKiBwdC5jICsgcHQudHg7XHJcbiAgICAgICAgd3QudHkgPSB0eCAqIHB0LmIgKyB0eSAqIHB0LmQgKyBwdC50eTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtdWx0aXBseSB0aGUgYWxwaGFzLi5cclxuICAgIHRoaXMud29ybGRBbHBoYSA9IHRoaXMuYWxwaGEgKiB0aGlzLnBhcmVudC53b3JsZEFscGhhO1xyXG59O1xyXG5cclxuLy8gcGVyZm9ybWFuY2UgaW5jcmVhc2UgdG8gYXZvaWQgdXNpbmcgY2FsbC4uICgxMHggZmFzdGVyKVxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSA9IFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgLy8gbWF0cml4ID0gbWF0cml4Oy8vanVzdCB0byBnZXQgcGFzc2VkIGpzIGhpbnRpbmcgKGFuZCBwcmVzZXJ2ZSBpbmhlcml0YW5jZSlcclxuICAgIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRzKFRpbnkuaWRlbnRpdHlNYXRyaXgpO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdlbmVyYXRlVGV4dHVyZSA9IGZ1bmN0aW9uIChyZXNvbHV0aW9uLCByZW5kZXJlcikge1xyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICB2YXIgcmVuZGVyVGV4dHVyZSA9IG5ldyBUaW55LlJlbmRlclRleHR1cmUoYm91bmRzLndpZHRoIHwgMCwgYm91bmRzLmhlaWdodCB8IDAsIHJlbmRlcmVyLCByZXNvbHV0aW9uKTtcclxuXHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eCA9IC1ib3VuZHMueDtcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LnR5ID0gLWJvdW5kcy55O1xyXG5cclxuICAgIHJlbmRlclRleHR1cmUucmVuZGVyKHRoaXMsIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4KTtcclxuXHJcbiAgICByZXR1cm4gcmVuZGVyVGV4dHVyZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS51cGRhdGVDYWNoZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCk7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudG9HbG9iYWwgPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcclxuICAgIC8vIGRvbid0IG5lZWQgdG8gdVtkYXRlIHRoZSBsb3RcclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgcmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHkocG9zaXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnRvTG9jYWwgPSBmdW5jdGlvbiAocG9zaXRpb24sIGZyb20pIHtcclxuICAgIGlmIChmcm9tKSB7XHJcbiAgICAgICAgcG9zaXRpb24gPSBmcm9tLnRvR2xvYmFsKHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkb24ndCBuZWVkIHRvIHVbZGF0ZSB0aGUgbG90XHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy53b3JsZFRyYW5zZm9ybS5hcHBseUludmVyc2UocG9zaXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9yZW5kZXJDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSwgcmVuZGVyU2Vzc2lvbik7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbnVsbDtcclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpO1xyXG5cclxuICAgIGlmICghdGhpcy5fY2FjaGVkU3ByaXRlKSB7XHJcbiAgICAgICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwKTsgLy8sIHJlbmRlclNlc3Npb24ucmVuZGVyZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZWRTcHJpdGUgPSBuZXcgVGlueS5TcHJpdGUocmVuZGVyVGV4dHVyZSk7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUucmVzaXplKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eCA9IC1ib3VuZHMueDtcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELl90ZW1wTWF0cml4LnR5ID0gLWJvdW5kcy55O1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlbmRlcih0aGlzLCBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeCwgdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci54ID0gLShib3VuZHMueCAvIGJvdW5kcy53aWR0aCk7XHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnkgPSAtKGJvdW5kcy55IC8gYm91bmRzLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVBc0JpdG1hcCA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge307XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCBcInhcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLCBcInlcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeCA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4iLCJUaW55Lk9iamVjdDJEID0gZnVuY3Rpb24gKCkge1xyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICB0aGlzLl9ib3VuZHMgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX21hc2sgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5PYmplY3QyRDtcclxuXHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgJ2lucHV0RW5hYmxlZCcsIHtcclxuXHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgIHJldHVybiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmVuYWJsZWQpXHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuLy8gICAgICAgICBpZiAodmFsdWUpIHtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQgPT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB7ZW5hYmxlZDogdHJ1ZSwgcGFyZW50OiB0aGlzfVxyXG4vLyAgICAgICAgICAgICAgICAgVGlueS5FdmVudFRhcmdldC5taXhpbih0aGlzLmlucHV0KVxyXG4vLyAgICAgICAgICAgICB9IGVsc2VcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZW5hYmxlZCA9IHRydWVcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmlucHV0ICE9PSBudWxsICYmICh0aGlzLmlucHV0LmVuYWJsZWQgPSBmYWxzZSlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG4vLyB9KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy5nZXRMb2NhbEJvdW5kcygpLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDtcclxuXHJcbiAgICAgICAgaWYgKHdpZHRoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gd2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS55ICogdGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGhlaWdodCAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIGhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnkgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLCBcIm1hc2tcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hc2s7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHRoaXMuX21hc2suaXNNYXNrID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX21hc2sgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2spIHRoaXMuX21hc2suaXNNYXNrID0gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGkgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG5cclxuICAgIFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5fYm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFzayA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuaW5wdXQpIHRoaXMuaW5wdXQuc3lzdGVtLnJlbW92ZSh0aGlzKTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkQ2hpbGRBdChjaGlsZCwgdGhpcy5jaGlsZHJlbi5sZW5ndGgpO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuYWRkQ2hpbGRBdCA9IGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDw9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xyXG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdhbWUpIGNoaWxkLmdhbWUgPSB0aGlzLmdhbWU7XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBjaGlsZCArIFwiYWRkQ2hpbGRBdDogVGhlIGluZGV4IFwiICsgaW5kZXggKyBcIiBzdXBwbGllZCBpcyBvdXQgb2YgYm91bmRzIFwiICsgdGhpcy5jaGlsZHJlbi5sZW5ndGhcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuc3dhcENoaWxkcmVuID0gZnVuY3Rpb24gKGNoaWxkLCBjaGlsZDIpIHtcclxuICAgIGlmIChjaGlsZCA9PT0gY2hpbGQyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbmRleDEgPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xyXG4gICAgdmFyIGluZGV4MiA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZDIpO1xyXG5cclxuICAgIGlmIChpbmRleDEgPCAwIHx8IGluZGV4MiA8IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzd2FwQ2hpbGRyZW46IEJvdGggdGhlIHN1cHBsaWVkIE9iamVjdHMgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXIuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hpbGRyZW5baW5kZXgxXSA9IGNoaWxkMjtcclxuICAgIHRoaXMuY2hpbGRyZW5baW5kZXgyXSA9IGNoaWxkO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3VwcGxpZWQgT2JqZWN0IG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuc2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3VwcGxpZWQgaW5kZXggaXMgb3V0IG9mIGJvdW5kc1wiKTtcclxuICAgIH1cclxuICAgIHZhciBjdXJyZW50SW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoY3VycmVudEluZGV4LCAxKTsgLy9yZW1vdmUgZnJvbSBvbGQgcG9zaXRpb25cclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7IC8vYWRkIGF0IG5ldyBwb3NpdGlvblxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Q2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgXCJnZXRDaGlsZEF0OiBTdXBwbGllZCBpbmRleCBcIiArXHJcbiAgICAgICAgICAgICAgICBpbmRleCArXHJcbiAgICAgICAgICAgICAgICBcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdCwgb3IgdGhlIHN1cHBsaWVkIE9iamVjdCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlclwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2luZGV4XTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHJldHVybjtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVDaGlsZEF0KGluZGV4KTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbW92ZUNoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIHZhciBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRBdChpbmRleCk7XHJcbiAgICBjaGlsZC5wYXJlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gY2hpbGQ7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuZGlzcGxheU9iamVjdFVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKSByZXR1cm47XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBwZXJmb3JtYW5jZSBpbmNyZWFzZSB0byBhdm9pZCB1c2luZyBjYWxsLi4gKDEweCBmYXN0ZXIpXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmRpc3BsYXlPYmplY3RDb250YWluZXJVcGRhdGVUcmFuc2Zvcm0gPSBUaW55Lk9iamVjdDJELnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG4gICAgaWYgKHRoaXMuX2NhY2hlZFNwcml0ZSkgcmV0dXJuIHRoaXMuX2NhY2hlZFNwcml0ZS5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICAvLyBUT0RPIHRoZSBib3VuZHMgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsY3VsYXRlZCB0aGlzIHJlbmRlciBzZXNzaW9uIHNvIHJldHVybiB3aGF0IHdlIGhhdmVcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBjaGlsZEJvdW5kcztcclxuICAgIHZhciBjaGlsZE1heFg7XHJcbiAgICB2YXIgY2hpbGRNYXhZO1xyXG5cclxuICAgIHZhciBjaGlsZFZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcclxuXHJcbiAgICAgICAgaWYgKCFjaGlsZC52aXNpYmxlKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgY2hpbGRWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY2hpbGRCb3VuZHMgPSB0aGlzLmNoaWxkcmVuW2ldLmdldEJvdW5kcygpO1xyXG5cclxuICAgICAgICBtaW5YID0gbWluWCA8IGNoaWxkQm91bmRzLnggPyBtaW5YIDogY2hpbGRCb3VuZHMueDtcclxuICAgICAgICBtaW5ZID0gbWluWSA8IGNoaWxkQm91bmRzLnkgPyBtaW5ZIDogY2hpbGRCb3VuZHMueTtcclxuXHJcbiAgICAgICAgY2hpbGRNYXhYID0gY2hpbGRCb3VuZHMud2lkdGggKyBjaGlsZEJvdW5kcy54O1xyXG4gICAgICAgIGNoaWxkTWF4WSA9IGNoaWxkQm91bmRzLmhlaWdodCArIGNoaWxkQm91bmRzLnk7XHJcblxyXG4gICAgICAgIG1heFggPSBtYXhYID4gY2hpbGRNYXhYID8gbWF4WCA6IGNoaWxkTWF4WDtcclxuICAgICAgICBtYXhZID0gbWF4WSA+IGNoaWxkTWF4WSA/IG1heFkgOiBjaGlsZE1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjaGlsZFZpc2libGUpIHJldHVybiBUaW55LkVtcHR5UmVjdGFuZ2xlO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gVE9ETzogc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIC8vdGhpcy5fY3VycmVudEJvdW5kcyA9IGJvdW5kcztcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0TG9jYWxCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbWF0cml4Q2FjaGUgPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBUaW55LmlkZW50aXR5TWF0cml4O1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xyXG5cclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBtYXRyaXhDYWNoZTtcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNhY2hlZFNwcml0ZShyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlNjZW5lID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbn07XHJcblxyXG5UaW55LlNjZW5lLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LlNjZW5lLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuU2NlbmU7XHJcblxyXG5UaW55LlNjZW5lLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcbn07XHJcbiIsIlRpbnkuU3ByaXRlID0gZnVuY3Rpb24gKHRleHR1cmUsIGtleSkge1xyXG4gICAgVGlueS5PYmplY3QyRC5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYW5jaG9yID0gbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB0aGlzLnNldFRleHR1cmUodGV4dHVyZSwga2V5LCBmYWxzZSk7XHJcblxyXG4gICAgdGhpcy5fd2lkdGggPSAwO1xyXG5cclxuICAgIHRoaXMuX2hlaWdodCA9IDA7XHJcblxyXG4gICAgdGhpcy5fZnJhbWUgPSAwO1xyXG5cclxuICAgIHRoaXMudGludCA9ICcjZmZmZmZmJztcclxuXHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9ICdzb3VyY2Utb3Zlcic7XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dHVyZS5oYXNMb2FkZWQpIHtcclxuICAgICAgICB0aGlzLm9uVGV4dHVyZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuT2JqZWN0MkQucHJvdG90eXBlKTtcclxuVGlueS5TcHJpdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5TcHJpdGU7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnZnJhbWVOYW1lJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZS5mcmFtZS5uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUuZnJhbWUubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMudGV4dHVyZS5rZXkgKyAnLicgKyB2YWx1ZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCAnZnJhbWUnLCB7XHJcbi8vICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWU7XHJcbi8vICAgICB9LFxyXG5cclxuLy8gICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbi8vICAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5sYXN0RnJhbWUpIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB2YWx1ZTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lID4gdGhpcy50ZXh0dXJlLmxhc3RGcmFtZSkgdGhpcy5fZnJhbWUgPSAwO1xyXG4vLyAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9mcmFtZSA8IDApIHRoaXMuX2ZyYW1lID0gdGhpcy50ZXh0dXJlLmxhc3RGcmFtZTtcclxuLy8gICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuQ2FjaGUudGV4dHVyZVt0aGlzLnRleHR1cmUua2V5ICsgJy4nICsgdGhpcy5fZnJhbWVdKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsICdoZWlnaHQnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS55ICogdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSwgZnJhbWVOYW1lLCB1cGRhdGVEaW1lbnNpb24pIHtcclxuICAgIGlmICh0eXBlb2YgdGV4dHVyZSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHZhciBpbWFnZVBhdGggPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAoZnJhbWVOYW1lICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSBpbWFnZVBhdGggKyAnLicgKyBmcmFtZU5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2ltYWdlUGF0aF07XHJcblxyXG4gICAgICAgIGlmICghdGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZVBhdGgpO1xyXG4gICAgICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoJ0NhY2hlIEVycm9yOiBpbWFnZSAnICsgaW1hZ2VQYXRoICsgJyBkb2VzYHQgZm91bmQgaW4gY2FjaGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dHVyZSA9PT0gdGV4dHVyZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICB0aGlzLmNhY2hlZFRpbnQgPSAnI2ZmZmZmZic7XHJcblxyXG4gICAgaWYgKHVwZGF0ZURpbWVuc2lvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUub25UZXh0dXJlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gc28gaWYgX3dpZHRoIGlzIDAgdGhlbiB3aWR0aCB3YXMgbm90IHNldC4uXHJcbiAgICBpZiAodGhpcy5fd2lkdGgpIHRoaXMuc2NhbGUueCA9IHRoaXMuX3dpZHRoIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgaWYgKHRoaXMuX2hlaWdodCkgdGhpcy5zY2FsZS55ID0gdGhpcy5faGVpZ2h0IC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxufTtcclxuXHJcbi8vIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24gKGRlbGF5LCB5b3lvKSB7XHJcbi8vICAgICB0aGlzLnJldmVyc2UgPSBmYWxzZTtcclxuLy8gICAgIHRoaXMueW95byA9IHlveW87XHJcblxyXG4vLyAgICAgaWYgKHRoaXMudGV4dHVyZS5sYXN0RnJhbWUpIHtcclxuLy8gICAgICAgICBkZWxheSA9IGRlbGF5IHx8IHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDA7XHJcblxyXG4vLyAgICAgICAgIGlmICghdGhpcy5hbmltYXRpb24pIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmdhbWUudGltZXIubG9vcChcclxuLy8gICAgICAgICAgICAgICAgIGRlbGF5LFxyXG4vLyAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlveW8pIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhbWUgPT09IDApIHRoaXMucmV2ZXJzZSA9IGZhbHNlO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZyYW1lID09PSB0aGlzLnRleHR1cmUubGFzdEZyYW1lKSB0aGlzLnJldmVyc2UgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZSArPSB0aGlzLnJldmVyc2UgPyAtMSA6IDE7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZGVsYXkgPSBkZWxheSB8fCB0aGlzLnRleHR1cmUuZnJhbWUuZHVyYXRpb24gfHwgMTAwO1xyXG4vLyAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgIHRoaXNcclxuLy8gICAgICAgICAgICAgKTtcclxuXHJcbi8vICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0YXJ0KCk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZGVsYXkgPSBkZWxheTtcclxuLy8gICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgdmFyIHdpZHRoID0gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoIC8gdGhpcy50ZXh0dXJlLnJlc29sdXRpb247XHJcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodCAvIHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEgLSB0aGlzLmFuY2hvci54KTtcclxuICAgIHZhciB3MSA9IHdpZHRoICogLXRoaXMuYW5jaG9yLng7XHJcblxyXG4gICAgdmFyIGgwID0gaGVpZ2h0ICogKDEgLSB0aGlzLmFuY2hvci55KTtcclxuICAgIHZhciBoMSA9IGhlaWdodCAqIC10aGlzLmFuY2hvci55O1xyXG5cclxuICAgIHZhciB3b3JsZFRyYW5zZm9ybSA9IG1hdHJpeCB8fCB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciBhID0gd29ybGRUcmFuc2Zvcm0uYTtcclxuICAgIHZhciBiID0gd29ybGRUcmFuc2Zvcm0uYjtcclxuICAgIHZhciBjID0gd29ybGRUcmFuc2Zvcm0uYztcclxuICAgIHZhciBkID0gd29ybGRUcmFuc2Zvcm0uZDtcclxuICAgIHZhciB0eCA9IHdvcmxkVHJhbnNmb3JtLnR4O1xyXG4gICAgdmFyIHR5ID0gd29ybGRUcmFuc2Zvcm0udHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICBpZiAoYiA9PT0gMCAmJiBjID09PSAwKSB7XHJcbiAgICAgICAgLy8gLy8gc2NhbGUgbWF5IGJlIG5lZ2F0aXZlIVxyXG4gICAgICAgIC8vIGlmIChhIDwgMCkgYSAqPSAtMTtcclxuICAgICAgICAvLyBpZiAoZCA8IDApIGQgKj0gLTE7XHJcblxyXG4gICAgICAgIC8vIC8vIHRoaXMgbWVhbnMgdGhlcmUgaXMgbm8gcm90YXRpb24gZ29pbmcgb24gcmlnaHQ/IFJJR0hUP1xyXG4gICAgICAgIC8vIC8vIGlmIHRoYXRzIHRoZSBjYXNlIHRoZW4gd2UgY2FuIGF2b2lkIGNoZWNraW5nIHRoZSBib3VuZCB2YWx1ZXMhIHlheVxyXG4gICAgICAgIC8vIG1pblggPSBhICogdzEgKyB0eDtcclxuICAgICAgICAvLyBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgLy8gbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgIC8vIG1heFkgPSBkICogaDAgKyB0eTtcclxuXHJcbiAgICAgICAgaWYgKGEgPCAwKSB7XHJcbiAgICAgICAgICAgIG1pblggPSBhICogdzAgKyB0eDtcclxuICAgICAgICAgICAgbWF4WCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1pblggPSBhICogdzEgKyB0eDtcclxuICAgICAgICAgICAgbWF4WCA9IGEgKiB3MCArIHR4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGQgPCAwKSB7XHJcbiAgICAgICAgICAgIG1pblkgPSBkICogaDAgKyB0eTtcclxuICAgICAgICAgICAgbWF4WSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1pblkgPSBkICogaDEgKyB0eTtcclxuICAgICAgICAgICAgbWF4WSA9IGQgKiBoMCArIHR5O1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHgxID0gYSAqIHcxICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgICAgIHZhciB5MiA9IGQgKiBoMSArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHg0ID0gYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICAgICAgdmFyIHk0ID0gZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgICAgIG1pblggPSB4MSA8IG1pblggPyB4MSA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDMgPCBtaW5YID8geDMgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgICAgIG1pblkgPSB5MSA8IG1pblkgPyB5MSA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHkyIDwgbWluWSA/IHkyIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTMgPCBtaW5ZID8geTMgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgICAgIG1heFggPSB4MSA+IG1heFggPyB4MSA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHgyID4gbWF4WCA/IHgyIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4NCA+IG1heFggPyB4NCA6IG1heFg7XHJcblxyXG4gICAgICAgIG1heFkgPSB5MSA+IG1heFkgPyB5MSA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTMgPiBtYXhZID8geTMgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuXHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgLy8gSWYgdGhlIHNwcml0ZSBpcyBub3QgdmlzaWJsZSBvciB0aGUgYWxwaGEgaXMgMCB0aGVuIG5vIG5lZWQgdG8gcmVuZGVyIHRoaXMgZWxlbWVudFxyXG4gICAgaWYgKFxyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHxcclxuICAgICAgICB0aGlzLmFscGhhID09PSAwIHx8XHJcbiAgICAgICAgdGhpcy5yZW5kZXJhYmxlID09PSBmYWxzZSB8fFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIDw9IDAgfHxcclxuICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPD0gMFxyXG4gICAgKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSkge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICBJZ25vcmUgbnVsbCBzb3VyY2VzXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlLnZhbGlkKSB7XHJcbiAgICAgICAgdmFyIHJlc29sdXRpb24gPSB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiAvIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIHRleHR1cmUgaXMgdHJpbW1lZCB3ZSBvZmZzZXQgYnkgdGhlIHRyaW0geC95LCBvdGhlcndpc2Ugd2UgdXNlIHRoZSBmcmFtZSBkaW1lbnNpb25zXHJcbiAgICAgICAgdmFyIGR4ID0gdGhpcy50ZXh0dXJlLnRyaW1cclxuICAgICAgICAgICAgPyB0aGlzLnRleHR1cmUudHJpbS54IC0gdGhpcy5hbmNob3IueCAqIHRoaXMudGV4dHVyZS50cmltLndpZHRoXHJcbiAgICAgICAgICAgIDogdGhpcy5hbmNob3IueCAqIC10aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICAgICAgdmFyIGR5ID0gdGhpcy50ZXh0dXJlLnRyaW1cclxuICAgICAgICAgICAgPyB0aGlzLnRleHR1cmUudHJpbS55IC0gdGhpcy5hbmNob3IueSAqIHRoaXMudGV4dHVyZS50cmltLmhlaWdodFxyXG4gICAgICAgICAgICA6IHRoaXMuYW5jaG9yLnkgKiAtdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gIEFsbG93IGZvciBwaXhlbCByb3VuZGluZ1xyXG4gICAgICAgIGlmIChyZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzKSB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmQsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pIHwgMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBkeCA9IGR4IHwgMDtcclxuICAgICAgICAgICAgZHkgPSBkeSB8IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50aW50ICE9PSAnI2ZmZmZmZicpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkVGludCAhPT0gdGhpcy50aW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZFRpbnQgPSB0aGlzLnRpbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbnRlZFRleHR1cmUgPSBUaW55LkNhbnZhc1RpbnRlci5nZXRUaW50ZWRUZXh0dXJlKHRoaXMsIHRoaXMudGludCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbnRlZFRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLnksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIGR4IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCAvIHJlc29sdXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT1ZFUldSSVRFXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5UZXh0ID0gZnVuY3Rpb24gKHRleHQsIHN0eWxlKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLmNhbGwodGhpcywgVGlueS5UZXh0dXJlLmZyb21DYW52YXModGhpcy5jYW52YXMpKTtcclxuXHJcbiAgICB0aGlzLnNldFRleHQodGV4dCk7XHJcbiAgICB0aGlzLnNldFN0eWxlKHN0eWxlKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuU3ByaXRlLnByb3RvdHlwZSk7XHJcblRpbnkuVGV4dC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlRleHQ7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UZXh0LnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGV4dC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS55ICogdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueSA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnNldFN0eWxlID0gZnVuY3Rpb24gKHN0eWxlKSB7XHJcbiAgICBzdHlsZSA9IHN0eWxlIHx8IHt9O1xyXG4gICAgc3R5bGUuZm9udCA9IHN0eWxlLmZvbnQgfHwgXCJib2xkIDIwcHQgQXJpYWxcIjtcclxuICAgIHN0eWxlLmZpbGwgPSBzdHlsZS5maWxsIHx8IFwiYmxhY2tcIjtcclxuICAgIHN0eWxlLmFsaWduID0gc3R5bGUuYWxpZ24gfHwgXCJsZWZ0XCI7XHJcbiAgICBzdHlsZS5zdHJva2UgPSBzdHlsZS5zdHJva2UgfHwgXCJibGFja1wiO1xyXG4gICAgc3R5bGUuc3Ryb2tlVGhpY2tuZXNzID0gc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIHx8IDA7XHJcbiAgICBzdHlsZS53b3JkV3JhcCA9IHN0eWxlLndvcmRXcmFwIHx8IGZhbHNlO1xyXG4gICAgc3R5bGUubGluZVNwYWNpbmcgPSBzdHlsZS5saW5lU3BhY2luZyB8fCAwO1xyXG4gICAgc3R5bGUud29yZFdyYXBXaWR0aCA9IHN0eWxlLndvcmRXcmFwV2lkdGggIT09IHVuZGVmaW5lZCA/IHN0eWxlLndvcmRXcmFwV2lkdGggOiAxMDA7XHJcblxyXG4gICAgc3R5bGUuZHJvcFNoYWRvdyA9IHN0eWxlLmRyb3BTaGFkb3cgfHwgZmFsc2U7XHJcbiAgICBzdHlsZS5kcm9wU2hhZG93QW5nbGUgPSBzdHlsZS5kcm9wU2hhZG93QW5nbGUgIT09IHVuZGVmaW5lZCA/IHN0eWxlLmRyb3BTaGFkb3dBbmdsZSA6IE1hdGguUEkgLyA2O1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlID0gc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlICE9PSB1bmRlZmluZWQgPyBzdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UgOiA0O1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0NvbG9yID0gc3R5bGUuZHJvcFNoYWRvd0NvbG9yIHx8IFwiYmxhY2tcIjtcclxuXHJcbiAgICB0aGlzLnN0eWxlID0gc3R5bGU7XHJcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0LnRvU3RyaW5nKCkgfHwgXCIgXCI7XHJcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUudXBkYXRlVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uID0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5zdHlsZS5mb250O1xyXG5cclxuICAgIHZhciBvdXRwdXRUZXh0ID0gdGhpcy50ZXh0O1xyXG5cclxuICAgIC8vIHdvcmQgd3JhcFxyXG4gICAgLy8gcHJlc2VydmUgb3JpZ2luYWwgdGV4dFxyXG4gICAgaWYgKHRoaXMuc3R5bGUud29yZFdyYXApIG91dHB1dFRleHQgPSB0aGlzLndvcmRXcmFwKHRoaXMudGV4dCk7XHJcblxyXG4gICAgLy9zcGxpdCB0ZXh0IGludG8gbGluZXNcclxuICAgIHZhciBsaW5lcyA9IG91dHB1dFRleHQuc3BsaXQoLyg/OlxcclxcbnxcXHJ8XFxuKS8pO1xyXG5cclxuICAgIC8vY2FsY3VsYXRlIHRleHQgd2lkdGhcclxuICAgIHZhciBsaW5lV2lkdGhzID0gW107XHJcbiAgICB2YXIgbWF4TGluZVdpZHRoID0gMDtcclxuICAgIHZhciBmb250UHJvcGVydGllcyA9IHRoaXMuZGV0ZXJtaW5lRm9udFByb3BlcnRpZXModGhpcy5zdHlsZS5mb250KTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbGluZVdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KGxpbmVzW2ldKS53aWR0aDtcclxuICAgICAgICBsaW5lV2lkdGhzW2ldID0gbGluZVdpZHRoO1xyXG4gICAgICAgIG1heExpbmVXaWR0aCA9IE1hdGgubWF4KG1heExpbmVXaWR0aCwgbGluZVdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgd2lkdGggPSBtYXhMaW5lV2lkdGggKyB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcztcclxuICAgIGlmICh0aGlzLnN0eWxlLmRyb3BTaGFkb3cpIHdpZHRoICs9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gKHdpZHRoICsgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCkgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgLy9jYWxjdWxhdGUgdGV4dCBoZWlnaHRcclxuICAgIHZhciBsaW5lSGVpZ2h0ID0gZm9udFByb3BlcnRpZXMuZm9udFNpemUgKyB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyArIHRoaXMuc3R5bGUubGluZVNwYWNpbmc7XHJcblxyXG4gICAgdmFyIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcy5sZW5ndGg7XHJcbiAgICBpZiAodGhpcy5zdHlsZS5kcm9wU2hhZG93KSBoZWlnaHQgKz0gdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcblxyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gKGhlaWdodCAtIHRoaXMuc3R5bGUubGluZVNwYWNpbmcpICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnJlc29sdXRpb24sIHRoaXMucmVzb2x1dGlvbik7XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5pc0NvY29vbkpTKSB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIHVzZWQgZm9yIGRlYnVnZ2luZy4uXHJcbiAgICAvL3RoaXMuY29udGV4dC5maWxsU3R5bGUgPVwiI0ZGMDAwMFwiXHJcbiAgICAvL3RoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5zdHlsZS5mb250O1xyXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5zdHlsZS5zdHJva2U7XHJcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3M7XHJcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XHJcbiAgICB0aGlzLmNvbnRleHQubWl0ZXJMaW1pdCA9IDI7XHJcblxyXG4gICAgLy90aGlzLmNvbnRleHQubGluZUpvaW4gPSAncm91bmQnO1xyXG5cclxuICAgIHZhciBsaW5lUG9zaXRpb25YO1xyXG4gICAgdmFyIGxpbmVQb3NpdGlvblk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3R5bGUuZHJvcFNoYWRvdykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dDb2xvcjtcclxuXHJcbiAgICAgICAgdmFyIHhTaGFkb3dPZmZzZXQgPSBNYXRoLnNpbih0aGlzLnN0eWxlLmRyb3BTaGFkb3dBbmdsZSkgKiB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuICAgICAgICB2YXIgeVNoYWRvd09mZnNldCA9IE1hdGguY29zKHRoaXMuc3R5bGUuZHJvcFNoYWRvd0FuZ2xlKSAqIHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWCA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMjtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWSA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMiArIGkgKiBsaW5lSGVpZ2h0ICsgZm9udFByb3BlcnRpZXMuYXNjZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3R5bGUuYWxpZ24gPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSBtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3R5bGUuYWxpZ24gPT09IFwiY2VudGVyXCIpIHtcclxuICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gKG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV0pIC8gMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3R5bGUuZmlsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YICsgeFNoYWRvd09mZnNldCwgbGluZVBvc2l0aW9uWSArIHlTaGFkb3dPZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgaWYoZHJvcFNoYWRvdylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9zZXQgY2FudmFzIHRleHQgc3R5bGVzXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5zdHlsZS5maWxsO1xyXG5cclxuICAgIC8vZHJhdyBsaW5lcyBsaW5lIGJ5IGxpbmVcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxpbmVQb3NpdGlvblggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDI7XHJcbiAgICAgICAgbGluZVBvc2l0aW9uWSA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzIC8gMiArIGkgKiBsaW5lSGVpZ2h0ICsgZm9udFByb3BlcnRpZXMuYXNjZW50O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdHlsZS5hbGlnbiA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gbWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3R5bGUuYWxpZ24gPT09IFwiY2VudGVyXCIpIHtcclxuICAgICAgICAgICAgbGluZVBvc2l0aW9uWCArPSAobWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXSkgLyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGUuc3Ryb2tlICYmIHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YLCBsaW5lUG9zaXRpb25ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlLmZpbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KGxpbmVzW2ldLCBsaW5lUG9zaXRpb25YLCBsaW5lUG9zaXRpb25ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICBpZihkcm9wU2hhZG93KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlVGV4dHVyZSgpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy50ZXh0dXJlLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLnRleHR1cmUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG4gICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCA9IHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLmRpcnR5IHx8IHRoaXMucmVzb2x1dGlvbiAhPT0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMsIHJlbmRlclNlc3Npb24pO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5kZXRlcm1pbmVGb250UHJvcGVydGllcyA9IGZ1bmN0aW9uIChmb250U3R5bGUpIHtcclxuICAgIHZhciBwcm9wZXJ0aWVzID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGVbZm9udFN0eWxlXTtcclxuXHJcbiAgICBpZiAoIXByb3BlcnRpZXMpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0ge307XHJcblxyXG4gICAgICAgIHZhciBjYW52YXMgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXM7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDb250ZXh0O1xyXG5cclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250U3R5bGU7XHJcblxyXG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguY2VpbChjb250ZXh0Lm1lYXN1cmVUZXh0KFwifE3DiXFcIikud2lkdGgpO1xyXG4gICAgICAgIHZhciBiYXNlbGluZSA9IE1hdGguY2VpbChjb250ZXh0Lm1lYXN1cmVUZXh0KFwifE3DiXFcIikud2lkdGgpO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSAyICogYmFzZWxpbmU7XHJcblxyXG4gICAgICAgIGJhc2VsaW5lID0gKGJhc2VsaW5lICogMS40KSB8IDA7XHJcblxyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjZjAwXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0eWxlO1xyXG5cclxuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjMDAwXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcInxNw4lxXCIsIDAsIGJhc2VsaW5lKTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlZGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XHJcbiAgICAgICAgdmFyIHBpeGVscyA9IGltYWdlZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGxpbmUgPSB3aWR0aCAqIDQ7XHJcblxyXG4gICAgICAgIHZhciBpLCBqO1xyXG5cclxuICAgICAgICB2YXIgaWR4ID0gMDtcclxuICAgICAgICB2YXIgc3RvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBhc2NlbnQuIHNjYW4gZnJvbSB0b3AgdG8gYm90dG9tIHVudGlsIHdlIGZpbmQgYSBub24gcmVkIHBpeGVsXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJhc2VsaW5lOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxpbmU7IGogKz0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlZGF0YVtpZHggKyBqXSAhPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdG9wKSB7XHJcbiAgICAgICAgICAgICAgICBpZHggKz0gbGluZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmFzY2VudCA9IGJhc2VsaW5lIC0gaTtcclxuXHJcbiAgICAgICAgaWR4ID0gcGl4ZWxzIC0gbGluZTtcclxuICAgICAgICBzdG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGRlc2NlbnQuIHNjYW4gZnJvbSBib3R0b20gdG8gdG9wIHVudGlsIHdlIGZpbmQgYSBub24gcmVkIHBpeGVsXHJcbiAgICAgICAgZm9yIChpID0gaGVpZ2h0OyBpID4gYmFzZWxpbmU7IGktLSkge1xyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGluZTsgaiArPSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VkYXRhW2lkeCArIGpdICE9PSAyNTUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXN0b3ApIHtcclxuICAgICAgICAgICAgICAgIGlkeCAtPSBsaW5lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3BlcnRpZXMuZGVzY2VudCA9IGkgLSBiYXNlbGluZTtcclxuICAgICAgICAvL1RPRE8gbWlnaHQgbmVlZCBhIHR3ZWFrLiBraW5kIG9mIGEgdGVtcCBmaXghXHJcbiAgICAgICAgcHJvcGVydGllcy5kZXNjZW50ICs9IDY7XHJcbiAgICAgICAgcHJvcGVydGllcy5mb250U2l6ZSA9IHByb3BlcnRpZXMuYXNjZW50ICsgcHJvcGVydGllcy5kZXNjZW50O1xyXG5cclxuICAgICAgICBUaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZVtmb250U3R5bGVdID0gcHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUud29yZFdyYXAgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgLy8gR3JlZWR5IHdyYXBwaW5nIGFsZ29yaXRobSB0aGF0IHdpbGwgd3JhcCB3b3JkcyBhcyB0aGUgbGluZSBncm93cyBsb25nZXJcclxuICAgIC8vIHRoYW4gaXRzIGhvcml6b250YWwgYm91bmRzLlxyXG4gICAgdmFyIHJlc3VsdCA9IFwiXCI7XHJcbiAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBzcGFjZUxlZnQgPSB0aGlzLnN0eWxlLndvcmRXcmFwV2lkdGg7XHJcbiAgICAgICAgdmFyIHdvcmRzID0gbGluZXNbaV0uc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgd29yZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIHdvcmRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh3b3Jkc1tqXSkud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB3b3JkV2lkdGhXaXRoU3BhY2UgPSB3b3JkV2lkdGggKyB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQoXCIgXCIpLndpZHRoO1xyXG4gICAgICAgICAgICBpZiAoaiA9PT0gMCB8fCB3b3JkV2lkdGhXaXRoU3BhY2UgPiBzcGFjZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNraXAgcHJpbnRpbmcgdGhlIG5ld2xpbmUgaWYgaXQncyB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgbGluZSB0aGF0IGlzXHJcbiAgICAgICAgICAgICAgICAvLyBncmVhdGVyIHRoYW4gdGhlIHdvcmQgd3JhcCB3aWR0aC5cclxuICAgICAgICAgICAgICAgIGlmIChqID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHdvcmRzW2pdO1xyXG4gICAgICAgICAgICAgICAgc3BhY2VMZWZ0ID0gdGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoIC0gd29yZFdpZHRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VMZWZ0IC09IHdvcmRXaWR0aFdpdGhTcGFjZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiBcIiArIHdvcmRzW2pdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaSA8IGxpbmVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gICAgaWYgKHRoaXMuZGlydHkpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMuY2FsbCh0aGlzLCBtYXRyaXgpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gbWFrZSBzdXJlIHRvIHJlc2V0IHRoZSB0aGUgY29udGV4dCBhbmQgY2FudmFzLi4gZG9udCB3YW50IHRoaXMgaGFuZ2luZyBhcm91bmQgaW4gbWVtb3J5IVxyXG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcclxuICAgIHRoaXMuY2FudmFzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnRleHR1cmUuZGVzdHJveSgpO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDYWNoZSA9IHt9O1xyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5UaW55LlRleHQuZm9udFByb3BlcnRpZXNDb250ZXh0ID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuIiwiVGlueS5DYW52YXNSZW5kZXJlciA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSBvcHRpb25zLnJlc29sdXRpb24gIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5yZXNvbHV0aW9uIDogMTtcclxuXHJcbiAgICB0aGlzLmNsZWFyQmVmb3JlUmVuZGVyID0gb3B0aW9ucy5jbGVhckJlZm9yZVJlbmRlciAhPSB1bmRlZmluZWQgPyBvcHRpb25zLmNsZWFyQmVmb3JlUmVuZGVyIDogdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnRyYW5zcGFyZW50ID0gb3B0aW9ucy50cmFuc3BhcmVudCAhPSB1bmRlZmluZWQgPyBvcHRpb25zLnRyYW5zcGFyZW50IDogZmFsc2U7XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplID0gb3B0aW9ucy5hdXRvUmVzaXplIHx8IGZhbHNlO1xyXG5cclxuICAgIC8vIHRoaXMud2lkdGggPSB3aWR0aCB8fCA4MDA7XHJcbiAgICAvLyB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCA2MDA7XHJcblxyXG4gICAgLy8gdGhpcy53aWR0aCAqPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICAvLyB0aGlzLmhlaWdodCAqPSB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgaWYgKCFUaW55LmRlZmF1bHRSZW5kZXJlcikgVGlueS5kZWZhdWx0UmVuZGVyZXIgPSB0aGlzO1xyXG5cclxuICAgIHZhciB2aWV3ID0gKHRoaXMuZG9tRWxlbWVudCA9IG9wdGlvbnMuZG9tRWxlbWVudCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSB2aWV3LmdldENvbnRleHQoXCIyZFwiLCB7IGFscGhhOiB0aGlzLnRyYW5zcGFyZW50IH0pO1xyXG5cclxuICAgIC8vIHZpZXcud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdmlldy5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLnJlc2l6ZSh3aWR0aCB8fCA4MDAsIGhlaWdodCB8fCA2MDApO1xyXG5cclxuICAgIHRoaXMuc2V0Q2xlYXJDb2xvcihcIiNmZmZmZmZcIik7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FudmFzTWFza01hbmFnZXIpIHRoaXMubWFza01hbmFnZXIgPSBuZXcgVGlueS5DYW52YXNNYXNrTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbiA9IHtcclxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgbWFza01hbmFnZXI6IHRoaXMubWFza01hbmFnZXIsXHJcbiAgICAgICAgc21vb3RoUHJvcGVydHk6IG51bGwsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgdHJ1ZSBQaXhpIHdpbGwgTWF0aC5mbG9vcigpIHgveSB2YWx1ZXMgd2hlbiByZW5kZXJpbmcsIHN0b3BwaW5nIHBpeGVsIGludGVycG9sYXRpb24uXHJcbiAgICAgICAgICogSGFuZHkgZm9yIGNyaXNwIHBpeGVsIGFydCBhbmQgc3BlZWQgb24gbGVnYWN5IGRldmljZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICByb3VuZFBpeGVsczogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgaWYgKFwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KSB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcImltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYgKFwibW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwibW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmIChcIm9JbWFnZVNtb290aGluZ0VuYWJsZWRcIiBpbiB0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJvSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmIChcIm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwibXNJbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5DYW52YXNSZW5kZXJlcjtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuICAgIHRoaXMuY2xlYXJDb2xvciA9IGNvbG9yO1xyXG5cclxuICAgIC8vIGlmIChjb2xvciA9PT0gbnVsbCkge1xyXG4gICAgLy8gICAgIHRoaXMuY2xlYXJDb2xvciA9IG51bGw7XHJcbiAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHRoaXMuY2xlYXJDb2xvciA9IGNvbG9yIHx8IDB4MDAwMDAwO1xyXG4gICAgLy8gLy8gdGhpcy5iYWNrZ3JvdW5kQ29sb3JTcGxpdCA9IFRpbnkuaGV4MnJnYih0aGlzLmJhY2tncm91bmRDb2xvcik7XHJcbiAgICAvLyB2YXIgaGV4ID0gdGhpcy5jbGVhckNvbG9yLnRvU3RyaW5nKDE2KTtcclxuICAgIC8vIGhleCA9ICcwMDAwMDAnLnN1YnN0cigwLCA2IC0gaGV4Lmxlbmd0aCkgKyBoZXg7XHJcbiAgICAvLyB0aGlzLl9jbGVhckNvbG9yID0gJyMnICsgaGV4O1xyXG59O1xyXG5cclxuLy8gVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2V0UGl4ZWxBcnQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICB2YXIgY2FudmFzID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuLy8gICAgIHZhciB0eXBlcyA9IFsgJ29wdGltaXplU3BlZWQnLCAnLW1vei1jcmlzcC1lZGdlcycsICctby1jcmlzcC1lZGdlcycsICctd2Via2l0LW9wdGltaXplLWNvbnRyYXN0JywgJ29wdGltaXplLWNvbnRyYXN0JywgJ2NyaXNwLWVkZ2VzJywgJ3BpeGVsYXRlZCcgXTtcclxuXHJcbi8vICAgICB0eXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIGNhbnZhcy5zdHlsZVsnaW1hZ2UtcmVuZGVyaW5nJ10gPSB0eXBlO1xyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgY2FudmFzLnN0eWxlLm1zSW50ZXJwb2xhdGlvbk1vZGUgPSAnbmVhcmVzdC1uZWlnaGJvcic7XHJcbi8vICAgICB0aGlzLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSB0cnVlO1xyXG4vLyB9XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgIHNjZW5lLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5pc0NvY29vbkpTICYmIHRoaXMuZG9tRWxlbWVudC5zY3JlZW5jYW52YXMpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNsZWFyQmVmb3JlUmVuZGVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY2xlYXJDb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24sIHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJPYmplY3Qoc2NlbmUpO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChyZW1vdmVWaWV3KSB7XHJcbiAgICBpZiAodHlwZW9mIHJlbW92ZVZpZXcgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICByZW1vdmVWaWV3ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVtb3ZlVmlldyAmJiB0aGlzLmRvbUVsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZG9tRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kb21FbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLm1hc2tNYW5hZ2VyID0gbnVsbDtcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbiA9IG51bGw7XHJcblxyXG4gICAgaWYgKFRpbnkuZGVmYXVsdFJlbmRlcmVyID09PSB0aGlzKSBUaW55LmRlZmF1bHRSZW5kZXJlciA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgdmlldy53aWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICB2aWV3LmhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcclxuICAgICAgICB2aWV3LnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgdmlldy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24gKHJlc29sdXRpb24pIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XHJcblxyXG4gICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgdmlldy53aWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICB2aWV3LmhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyT2JqZWN0ID0gZnVuY3Rpb24gKGRpc3BsYXlPYmplY3QsIGNvbnRleHQpIHtcclxuICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzLmNvbnRleHQ7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24ucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuICAgIGRpc3BsYXlPYmplY3QucmVuZGVyKHRoaXMucmVuZGVyU2Vzc2lvbik7XHJcbn07XHJcbiIsInZhciBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzO1xyXG5cclxuVGlueS5JbnB1dCA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdmFyIHZpZXcgPSAodGhpcy5kb21FbGVtZW50ID0gZ2FtZS5pbnB1dFZpZXcpO1xyXG5cclxuICAgIHRoaXMuYm91bmRzID0geyB4OiAwLCB5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XHJcbiAgICB0aGlzLmNhbmRpZGF0ZXMgPSBbXTtcclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG5cclxuICAgIHRoaXMubGFzdE1vdmUgPSBudWxsO1xyXG4gICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmRvd25IYW5kbGVyID0gdGhpcy5kb3duSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IHRoaXMubW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBIYW5kbGVyID0gdGhpcy51cEhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIC8vIHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICAvLyB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG5cclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG5cclxuICAgIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKHRoaXMpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5JbnB1dC5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgVGlueS5JbnB1dC5zeXN0ZW1zW2ldLmluaXQuY2FsbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUJvdW5kcygpO1xyXG59O1xyXG5cclxuVGlueS5JbnB1dC5wcm90b3R5cGUgPSB7XHJcbiAgICBhZGQ6IGZ1bmN0aW9uIChvYmplY3QsIG9wdGlvbnMpIHtcclxuICAgICAgICBvYmplY3QuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgb3B0aW9ucy5zeXN0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICBvYmplY3QuaW5wdXQgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbihvYmplY3QuaW5wdXQpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChvYmplY3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3QuaW5kZXhPZihvYmplY3QpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlZCA9IHRoaXMubGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIHJlbW92ZWQuaW5wdXQgPSBudWxsO1xyXG4gICAgICAgICAgICByZW1vdmVkLmlucHV0RW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0SGFuZGxlcjogZnVuY3Rpb24gKG5hbWUsIGV2ZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSlcclxuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5nZXRDb29yZHMoZXZlbnQpO1xyXG5cclxuICAgICAgICBpZiAoY29vcmRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lICE9IFwibW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRpbnkuSW5wdXQuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpbnkuSW5wdXQuc3lzdGVtc1tpXS5wcmVIYW5kbGUuY2FsbCh0aGlzLCBjb29yZHMueCwgY29vcmRzLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc0dvb2QsIG9iajtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMubGlzdC5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMubGlzdFt0XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaW5wdXRFbmFibGVkIHx8ICFvYmoucGFyZW50KSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5pbnB1dC5jaGVja0JvdW5kcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNHb29kID0gb2JqLmlucHV0LmNoZWNrQm91bmRzLmNhbGwodGhpcywgb2JqLCBjb29yZHMueCwgY29vcmRzLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaXNHb29kID0gVGlueS5JbnB1dC5jaGVja0JvdW5kcy5jYWxsKHRoaXMsIG9iaiwgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzR29vZCkgdGhpcy5jYW5kaWRhdGVzLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBpID0gdGhpcy5jYW5kaWRhdGVzLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmNhbmRpZGF0ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmlucHV0W1wibGFzdF9cIiArIG5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gb2JqLmlucHV0W1wibGFzdF9kb3duXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnQgJiYgVGlueS5NYXRoLmRpc3RhbmNlKHBvaW50LngsIHBvaW50LnksIGNvb3Jkcy54LCBjb29yZHMueSkgPCAzMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KFwiY2xpY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmlucHV0LnRyYW5zcGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB2YXIgb2JqID0gdGhpcy5jYW5kaWRhdGVzW2kgLSAxXVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9iai5pbnB1dFtcImxhc3RfXCIgKyBuYW1lXSA9IHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9iai5pbnB1dC5lbWl0KG5hbWUsIHt4OiBjb29yZHMueCwgeTogY29vcmRzLnl9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAobmFtZSA9PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdmFyIHBvaW50ID0gb2JqLmlucHV0W1wibGFzdF9kb3duXCJdXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmIChwb2ludCAmJiBUaW55Lk1hdGguZGlzdGFuY2UocG9pbnQueCwgcG9pbnQueSwgY29vcmRzLngsIGNvb3Jkcy55KSA8IDMwKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQoXCJjbGlja1wiLCB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW92ZUhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMubGFzdE1vdmUgPSBldmVudDtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcIm1vdmVcIiwgZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cEhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNEb3duID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJ1cFwiLCB0aGlzLmxhc3RNb3ZlKTtcclxuICAgIH0sXHJcblxyXG4gICAgZG93bkhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxhc3RNb3ZlID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJkb3duXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tIYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlcihcImNsaWNrXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q29vcmRzOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgY29vcmRzID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGV2ZW50IGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xyXG4gICAgICAgICAgICBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBldmVudC50b3VjaGVzWzBdLmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmNsaWVudFggJiYgZXZlbnQuY2xpZW50WSkge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGxpc3RlbmluZ1RvVG91Y2hFdmVudHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE1vdXNlIGV2ZW50XHJcbiAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICB5OiBldmVudC5jbGllbnRZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKGxpc3RlbmluZ1RvVG91Y2hFdmVudHMgJiYgZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB8fCBjb29yZHMgPT09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgIHg6IGNvb3Jkcy54IC0gdGhpcy5ib3VuZHMueCxcclxuICAgICAgICAgICAgeTogY29vcmRzLnkgLSB0aGlzLmJvdW5kcy55XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlQm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYm91bmRzID0gdGhpcy5ib3VuZHM7XHJcblxyXG4gICAgICAgIHZhciBjbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBib3VuZHMueCA9IGNsaWVudFJlY3QubGVmdDtcclxuICAgICAgICBib3VuZHMueSA9IGNsaWVudFJlY3QudG9wO1xyXG4gICAgICAgIGJvdW5kcy53aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XHJcbiAgICAgICAgYm91bmRzLmhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcblxyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmRvd25IYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LklucHV0LmNoZWNrQm91bmRzID0gZnVuY3Rpb24gKG9iaiwgeCwgeSkge1xyXG4gICAgaWYgKG9iai53b3JsZFZpc2libGUpIHtcclxuICAgICAgICBpZiAob2JqLmdldEJvdW5kcygpLmNvbnRhaW5zKHgsIHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiAob2JqLmNoaWxkcmVuICYmIG9iai5jaGlsZHJlbi5sZW5ndGggPiAwKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGZvciAodmFyIHQgPSAwOyB0IDwgb2JqLmNoaWxkcmVuLmxlbmd0aDsgdCsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgX2NoZWNrT25BY3RpdmVPYmplY3RzKG9iai5jaGlsZHJlblt0XSwgeCwgeSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59O1xyXG5cclxuVGlueS5JbnB1dC5zeXN0ZW1zID0gW107XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwiaW5wdXRcIiwgVGlueS5JbnB1dCk7XHJcbiIsIlRpbnkuQ2FjaGUgPSB7XHJcbiAgICBpbWFnZToge30sXHJcbiAgICB0ZXh0dXJlOiB7fVxyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG4gICAgZ2FtZS5jYWNoZSA9IFRpbnkuQ2FjaGU7XHJcblxyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIucHJvdG90eXBlID0ge1xyXG4gICAgY2xlYXJDYWNoZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIHkgaW4gVGlueS5DYWNoZS50ZXh0dXJlKSBUaW55LkNhY2hlLnRleHR1cmVbeV0uZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciB5IGluIFRpbnkuQ2FjaGUpIFRpbnkuQ2FjaGVbeV0gPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgYWxsOiBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QuY29uY2F0KGFycmF5KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW1hZ2U6IGZ1bmN0aW9uIChrZXksIHNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlXCJcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3ByaXRlc2hlZXQ6IGZ1bmN0aW9uIChrZXksIHNvdXJjZSwgYXJnXzEsIGFyZ18yLCB0b3RhbEZyYW1lcywgZHVyYXRpb24pIHtcclxuICAgICAgICB2YXIgcmVzID0ge1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHR5cGU6IFwic3ByaXRlc2hlZXRcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnXzEgPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICByZXMud2lkdGggPSBhcmdfMTtcclxuICAgICAgICAgICAgcmVzLmhlaWdodCA9IGFyZ18yO1xyXG4gICAgICAgICAgICByZXMudG90YWwgPSB0b3RhbEZyYW1lcztcclxuICAgICAgICAgICAgcmVzLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdfMS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlcy5kYXRhID0gYXJnXzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChyZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhdGxhczogZnVuY3Rpb24gKGtleSwgc291cmNlLCBhdGxhc0RhdGEpIHtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgZGF0YTogYXRsYXNEYXRhLFxyXG4gICAgICAgICAgICB0eXBlOiBcImF0bGFzXCJcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5saXN0O1xyXG5cclxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGdhbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkTmV4dCgpIHtcclxuICAgICAgICAgICAgLy8gdmFyIGRvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gbGlzdC5zaGlmdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlciA9IFRpbnkuTG9hZGVyW3Jlc291cmNlLnR5cGVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvYWRlcikge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVyKHJlc291cmNlLCBsb2FkZWQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2Fubm90IGZpbmQgbG9hZGVyIGZvciBcIiArIHJlc291cmNlLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRlZChyZXNvdXJjZSwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbG9hZE5leHQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZ2FtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWROZXh0KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkxvYWRlci5hdGxhcyA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgY2IpIHtcclxuICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XHJcblxyXG4gICAgVGlueS5Mb2FkZXIuaW1hZ2UocmVzb3VyY2UsIGZ1bmN0aW9uIChyZXNvdXJjZSwgaW1hZ2UpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc291cmNlLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHV1aWQgPSBrZXkgKyBcIi5cIiArIHJlc291cmNlLmRhdGFbaV0ubmFtZTtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCByZXNvdXJjZS5kYXRhW2ldKTtcclxuICAgICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXk7XHJcblxyXG4gICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2IoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIuc3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGNiKSB7XHJcbiAgICB2YXIga2V5ID0gcmVzb3VyY2Uua2V5O1xyXG5cclxuICAgIFRpbnkuTG9hZGVyLmltYWdlKHJlc291cmNlLCBmdW5jdGlvbiAocmVzb3VyY2UsIGltYWdlKSB7XHJcbiAgICAgICAgdmFyIGxhc3RGcmFtZSwgdXVpZCwgdGV4dHVyZTtcclxuXHJcbiAgICAgICAgaWYgKHJlc291cmNlLmRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGZyYW1lRGF0YSA9IHJlc291cmNlLmRhdGE7XHJcbiAgICAgICAgICAgIGxhc3RGcmFtZSA9IGZyYW1lRGF0YS5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbGFzdEZyYW1lOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHV1aWQgPSBrZXkgKyBcIi5cIiArIGk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoaW1hZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLngpLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS53aWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLmZsb29yKGZyYW1lRGF0YVtpXS5oZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBmcmFtZURhdGFbaV0uZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyYW1lV2lkdGggPSByZXNvdXJjZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGZyYW1lSGVpZ2h0ID0gcmVzb3VyY2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmcmFtZVdpZHRoKSBmcmFtZVdpZHRoID0gTWF0aC5mbG9vcih3aWR0aCAvIChyZXNvdXJjZS5jb2xzIHx8IDEpKTtcclxuICAgICAgICAgICAgaWYgKCFmcmFtZUhlaWdodCkgZnJhbWVIZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCAvIChyZXNvdXJjZS5yb3dzIHx8IDEpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xzID0gTWF0aC5mbG9vcih3aWR0aCAvIGZyYW1lV2lkdGgpO1xyXG4gICAgICAgICAgICB2YXIgcm93cyA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvdGFsID0gY29scyAqIHJvd3M7XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UudG90YWwpIHRvdGFsID0gTWF0aC5taW4odG90YWwsIHJlc291cmNlLnRvdGFsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gMDtcclxuICAgICAgICAgICAgdmFyIHkgPSAwO1xyXG4gICAgICAgICAgICBsYXN0RnJhbWUgPSB0b3RhbCAtIDE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHV1aWQgPSBrZXkgKyBcIi5cIiArIGk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBmcmFtZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogZnJhbWVIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHJlc291cmNlLmR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcbiAgICAgICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICAgICAgICAgIHggKz0gZnJhbWVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoeCArIGZyYW1lV2lkdGggPiB3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHkgKz0gZnJhbWVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLmltYWdlID0gZnVuY3Rpb24gKHJlc291cmNlLCBjYikge1xyXG4gICAgLy8gaWYgKFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKSByZXR1cm4gY2IocmVzb3VyY2UsIFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUaW55LkNhY2hlLmltYWdlW3Jlc291cmNlLmtleV0gPSBpbWFnZTtcclxuXHJcbiAgICAgICAgY2IocmVzb3VyY2UsIGltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGNiKHJlc291cmNlLCBpbWFnZSk7XHJcbiAgICAvLyB9KVxyXG5cclxuICAgIGltYWdlLnNyYyA9IHJlc291cmNlLnNyYztcclxufTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJsb2FkXCIsIFRpbnkuTG9hZGVyKTtcclxuIiwidmFyIF9pc1NldFRpbWVPdXQsIF9vbkxvb3AsIF90aW1lT3V0SUQsIF9wcmV2VGltZSwgX2xhc3RUaW1lO1xyXG5cclxudmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxufTtcclxuXHJcbmlmIChzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiYgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxufSBlbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBub3cgPSBEYXRlLm5vdztcclxufVxyXG5cclxuVGlueS5SQUYgPSBmdW5jdGlvbiAoZ2FtZSwgZm9yY2VTZXRUaW1lT3V0KSB7XHJcbiAgICBpZiAoZm9yY2VTZXRUaW1lT3V0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb3JjZVNldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZm9yY2VTZXRUaW1lT3V0ID0gZm9yY2VTZXRUaW1lT3V0O1xyXG5cclxuICAgIHZhciB2ZW5kb3JzID0gW1wibXNcIiwgXCJtb3pcIiwgXCJ3ZWJraXRcIiwgXCJvXCJdO1xyXG5cclxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IHgrKykge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XHJcbiAgICAgICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIF9vbkxvb3AgPSBudWxsO1xyXG4gICAgX3RpbWVPdXRJRCA9IG51bGw7XHJcblxyXG4gICAgX3ByZXZUaW1lID0gMDtcclxuICAgIF9sYXN0VGltZSA9IDA7XHJcbn07XHJcblxyXG5UaW55LlJBRi5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9wcmV2VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB0aGlzLmZvcmNlU2V0VGltZU91dCkge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlU2V0VGltZW91dCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlUkFGKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfb25Mb29wKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVJBRjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9sYXN0VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX29uTG9vcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVNldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKTtcclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIFRpbnkuUkFGLnRpbWVUb0NhbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3ByZXZUaW1lID0gbm93KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoX2lzU2V0VGltZU91dCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RpbWVPdXRJRCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKF90aW1lT3V0SUQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUkFGLnRpbWVUb0NhbGwgPSAxNTtcclxuIiwidmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbnZhciBUaW1lciA9IGZ1bmN0aW9uIChhdXRvU3RhcnQsIGF1dG9SZW1vdmUsIGdhbWUsIGNiLCBjdHgsIGRlbGF5LCBsb29wLCBuLCBvbmNvbXBsZXRlKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5jYiA9IGNiIHx8IG5vb3A7XHJcbiAgICB0aGlzLmN0eCA9IGN0eCB8fCB0aGlzO1xyXG4gICAgdGhpcy5kZWxheSA9IGRlbGF5ID09IHVuZGVmaW5lZCA/IDEwMDAgOiBkZWxheTtcclxuICAgIHRoaXMubG9vcCA9IGxvb3A7XHJcbiAgICB0aGlzLmNvdW50ID0gbiB8fCAwO1xyXG4gICAgdGhpcy5yZXBlYXQgPSB0aGlzLmNvdW50ID4gMDtcclxuICAgIHRoaXMucnVubmluZyA9ICEhYXV0b1N0YXJ0O1xyXG4gICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IGF1dG9SZW1vdmU7XHJcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbmNvbXBsZXRlIHx8IG5vb3A7XHJcbn07XHJcblxyXG5UaW1lci5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YVRpbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0RnJhbWUgPj0gdGhpcy5kZWxheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMuY3R4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9SZW1vdmUgJiYgdGhpcy5nYW1lLnRpbWVyLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVGltZXIgPSBUaW1lcjtcclxuXHJcblRpbnkuVGltZXJDcmVhdG9yID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIHRoaXMuYXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvci5wcm90b3R5cGUgPSB7XHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAodG0pIHtcclxuICAgICAgICB2YXIgaW5kZXhPZiA9IHRoaXMubGlzdC5pbmRleE9mKHRtKTtcclxuICAgICAgICBpZiAoaW5kZXhPZiA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRtLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleE9mLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkOiBmdW5jdGlvbiAoZGVsYXksIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSkge1xyXG4gICAgICAgIGF1dG9zdGFydCA9IGF1dG9zdGFydCAhPSB1bmRlZmluZWQgPyBhdXRvc3RhcnQgOiB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICBhdXRvcmVtb3ZlID0gYXV0b3JlbW92ZSAhPSB1bmRlZmluZWQgPyBhdXRvcmVtb3ZlIDogdGhpcy5hdXRvUmVtb3ZlO1xyXG5cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlLCB0aGlzLmdhbWUsIGNiLCBjdHgsIGRlbGF5KTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGxvb3A6IGZ1bmN0aW9uIChkZWxheSwgY2IsIGN0eCwgYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlKSB7XHJcbiAgICAgICAgYXV0b3N0YXJ0ID0gYXV0b3N0YXJ0ICE9IHVuZGVmaW5lZCA/IGF1dG9zdGFydCA6IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIGF1dG9yZW1vdmUgPSBhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmU7XHJcblxyXG4gICAgICAgIHZhciB0aW1lciA9IG5ldyBUaW1lcihhdXRvc3RhcnQsIGF1dG9yZW1vdmUsIHRoaXMuZ2FtZSwgY2IsIGN0eCwgZGVsYXksIHRydWUpO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgcmVwZWF0OiBmdW5jdGlvbiAoZGVsYXksIG4sIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgY29tcGxldGUpIHtcclxuICAgICAgICBhdXRvc3RhcnQgPSBhdXRvc3RhcnQgIT0gdW5kZWZpbmVkID8gYXV0b3N0YXJ0IDogdGhpcy5hdXRvU3RhcnQ7XHJcbiAgICAgICAgYXV0b3JlbW92ZSA9IGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZTtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgdGhpcy5nYW1lLCBjYiwgY3R4LCBkZWxheSwgZmFsc2UsIG4sIGNvbXBsZXRlKTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcInRpbWVyXCIsIFRpbnkuVGltZXJDcmVhdG9yKTtcclxuIiwiLy8gVGlueS5UZXh0dXJlQ2FjaGUgPSB7fTtcclxuLy8gVGlueS5GcmFtZUNhY2hlID0ge307XHJcblRpbnkuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3IgPSAwO1xyXG5UaW55LlRleHR1cmVTaWxlbnRGYWlsID0gZmFsc2U7XHJcblxyXG5UaW55LlRleHR1cmUgPSBmdW5jdGlvbiAoc291cmNlLCBmcmFtZSwgY3JvcCwgdHJpbSkge1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIHRoaXMuaGFzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFmcmFtZSkge1xyXG4gICAgICAgIHRoaXMubm9GcmFtZSA9IHRydWU7XHJcbiAgICAgICAgZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB2YXIga2V5ID0gc291cmNlO1xyXG5cclxuICAgICAgICBzb3VyY2UgPSBUaW55LkNhY2hlLmltYWdlW2tleV07XHJcblxyXG4gICAgICAgIGlmICghc291cmNlKSB0aHJvdyBuZXcgRXJyb3IoJ0NhY2hlIEVycm9yOiBpbWFnZSAnICsga2V5ICsgJyBkb2VzYHQgZm91bmQgaW4gY2FjaGUnKTtcclxuXHJcbiAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW2tleV0gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy50cmltID0gdHJpbTtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG5cclxuICAgIHRoaXMuY3JvcCA9IGNyb3AgfHwgbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIGlmICgodGhpcy5zb3VyY2UuY29tcGxldGUgfHwgdGhpcy5zb3VyY2UuZ2V0Q29udGV4dCkgJiYgdGhpcy5zb3VyY2Uud2lkdGggJiYgdGhpcy5zb3VyY2UuaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5vblNvdXJjZUxvYWRlZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc291cmNlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUub25Tb3VyY2VMb2FkZWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGV4dHVyZTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUub25Tb3VyY2VMb2FkZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmhhc0xvYWRlZCA9IHRydWU7XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5zb3VyY2UubmF0dXJhbFdpZHRoIHx8IHRoaXMuc291cmNlLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLnNvdXJjZS5uYXR1cmFsSGVpZ2h0IHx8IHRoaXMuc291cmNlLmhlaWdodDtcclxuXHJcbiAgICBpZiAodGhpcy5ub0ZyYW1lKSB0aGlzLmZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLnNldEZyYW1lKHRoaXMuZnJhbWUpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5hZGRUb0NhY2hlID0gZnVuY3Rpb24gKGtleSwgZnJhbWVOYW1lKSB7XHJcbiAgICB0aGlzLmtleSA9IHRoaXMua2V5IHx8IGtleTtcclxuICAgIHRoaXMuZnJhbWUubmFtZSA9IHRoaXMuZnJhbWUubmFtZSB8fCBmcmFtZU5hbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuZnJhbWUubmFtZSkga2V5ICs9ICcuJyArIHRoaXMuZnJhbWUubmFtZTtcclxuXHJcbiAgICBUaW55LkNhY2hlLnRleHR1cmVba2V5XSA9IHRoaXM7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5rZXkpIHtcclxuICAgICAgICBkZWxldGUgVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMua2V5XTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLnNldEZyYW1lID0gZnVuY3Rpb24gKGZyYW1lKSB7XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZyYW1lICYmIGZyYW1lLndpZHRoICYmIGZyYW1lLmhlaWdodCAmJiB0aGlzLnNvdXJjZSAmJiB0aGlzLmhhc0xvYWRlZDtcclxuXHJcbiAgICBpZiAoIXRoaXMudmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICAvLyB0aGlzLmhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLmNyb3AueCA9IGZyYW1lLng7XHJcbiAgICB0aGlzLmNyb3AueSA9IGZyYW1lLnk7XHJcbiAgICB0aGlzLmNyb3Aud2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgIHRoaXMuY3JvcC5oZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLnRyaW0gJiYgKGZyYW1lLnggKyBmcmFtZS53aWR0aCA+IHRoaXMud2lkdGggfHwgZnJhbWUueSArIGZyYW1lLmhlaWdodCA+IHRoaXMuaGVpZ2h0KSkge1xyXG4gICAgICAgIGlmICghVGlueS5UZXh0dXJlU2lsZW50RmFpbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RleHR1cmUgRXJyb3I6IGZyYW1lIGRvZXMgbm90IGZpdCBpbnNpZGUgdGhlIGJhc2UgVGV4dHVyZSBkaW1lbnNpb25zICcgKyB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHJpbSkge1xyXG4gICAgICAgIC8vIHRoaXMud2lkdGggPSB0aGlzLnRyaW0ud2lkdGg7XHJcbiAgICAgICAgLy8gdGhpcy5oZWlnaHQgPSB0aGlzLnRyaW0uaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZnJhbWUud2lkdGggPSB0aGlzLnRyaW0ud2lkdGg7XHJcbiAgICAgICAgdGhpcy5mcmFtZS5oZWlnaHQgPSB0aGlzLnRyaW0uaGVpZ2h0O1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gVGlueS5UZXh0dXJlLmZyb21JbWFnZSA9IGZ1bmN0aW9uKGtleSwgaW1hZ2VVcmwsIGNyb3Nzb3JpZ2luKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2tleV07XHJcblxyXG4vLyAgICAgaWYoIXRleHR1cmUpXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoVGlueS5CYXNlVGV4dHVyZS5mcm9tSW1hZ2Uoa2V5LCBpbWFnZVVybCwgY3Jvc3NvcmlnaW4pKTtcclxuLy8gICAgICAgICB0ZXh0dXJlLmtleSA9IGtleVxyXG4vLyAgICAgICAgIFRpbnkuVGV4dHVyZUNhY2hlW2tleV0gPSB0ZXh0dXJlO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHJldHVybiB0ZXh0dXJlO1xyXG4vLyB9O1xyXG5cclxuLy8gVGlueS5UZXh0dXJlLmZyb21GcmFtZSA9IGZ1bmN0aW9uKGZyYW1lSWQpXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVbZnJhbWVJZF07XHJcbi8vICAgICBpZighdGV4dHVyZSkgdGhyb3cgbmV3IEVycm9yKCdUaGUgZnJhbWVJZCBcIicgKyBmcmFtZUlkICsgJ1wiIGRvZXMgbm90IGV4aXN0IGluIHRoZSB0ZXh0dXJlIGNhY2hlICcpO1xyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07XHJcblxyXG5UaW55LlRleHR1cmUuZnJvbUNhbnZhcyA9IGZ1bmN0aW9uIChjYW52YXMpIHtcclxuICAgIC8vIGlmKCFjYW52YXMuX3RpbnlJZClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBjYW52YXMuX3RpbnlJZCA9ICdfZnJvbV9jYW52YXNfJyArIFRpbnkuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3IrKztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB2YXIgdGV4dHVyZSA9IFRpbnkuQ2FjaGUudGV4dHVyZVtjYW52YXMuX3RpbnlJZF07XHJcblxyXG4gICAgLy8gaWYoIXRleHR1cmUpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoIGNhbnZhcyApO1xyXG4gICAgLy8gICAgIFRpbnkuQ2FjaGUudGV4dHVyZVtjYW52YXMuX3RpbnlJZF0gPSB0ZXh0dXJlO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgcmV0dXJuIG5ldyBUaW55LlRleHR1cmUoY2FudmFzKTtcclxufTtcclxuXHJcbi8vIFRpbnkuVGV4dHVyZS5hZGRUZXh0dXJlVG9DYWNoZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGlkKVxyXG4vLyB7XHJcbi8vICAgICBUaW55LlRleHR1cmVDYWNoZVtpZF0gPSB0ZXh0dXJlO1xyXG4vLyB9O1xyXG5cclxuLy8gVGlueS5UZXh0dXJlLnJlbW92ZVRleHR1cmVGcm9tQ2FjaGUgPSBmdW5jdGlvbihpZClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtpZF07XHJcbi8vICAgICBkZWxldGUgVGlueS5UZXh0dXJlQ2FjaGVbaWRdO1xyXG4vLyAgICAgZGVsZXRlIFRpbnkuQmFzZVRleHR1cmVDYWNoZVtpZF07XHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTtcclxuIiwiZnVuY3Rpb24gRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLmEgPSBbXTtcclxuICAgIHRoaXMubiA9IDA7XHJcbn1cclxuXHJcblRpbnkuRXZlbnRFbWl0dGVyID0ge1xyXG4gICAgY2FsbDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgb2JqID0gb2JqLnByb3RvdHlwZSB8fCBvYmo7XHJcbiAgICAgICAgICAgIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtaXhpbjogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyc19ldmVudHMgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHVzaExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF0gPSBuZXcgRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdGVuZXJzLmEucHVzaChmbiwgY29udGV4dCB8fCBudWxsLCBvbmNlIHx8IGZhbHNlKTtcclxuICAgICAgICAgICAgbGlzdGVuZXJzLm4gKz0gMztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9iai5vbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBmbiwgY29udGV4dCkge1xyXG4gICAgICAgICAgICBwdXNoTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmoub24gPSBwdXNoTGlzdGVuZXI7XHJcblxyXG4gICAgICAgIG9iai5vZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGZuLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgZm5BcnJheSA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdLmE7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZuKSB7XHJcbiAgICAgICAgICAgICAgICBmbkFycmF5Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmbkFycmF5W2ldID09IGZuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuQXJyYXlbaV0gPT0gZm4gJiYgZm5BcnJheVtpICsgMV0gPT0gY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZuQXJyYXkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50LCBhMSwgYTIsIGEzKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgZm5BcnJheSA9IGxpc3RlbmVycy5hO1xyXG4gICAgICAgICAgICBsaXN0ZW5lcnMubiA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGZuLCBjdHg7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZuQXJyYXkubGVuZ3RoIC0gbGlzdGVuZXJzLm47IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgZm4gPSBmbkFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgY3R4ID0gZm5BcnJheVtpICsgMV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZuQXJyYXlbaSArIDJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gMSkgZm4uY2FsbChjdHgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGVuID09IDIpIGZuLmNhbGwoY3R4LCBhMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZW4gPT0gMykgZm4uY2FsbChjdHgsIGExLCBhMik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGZuLmNhbGwoY3R4LCBhMSwgYTIsIGEzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoZm5BcnJheVtpICsgMl0pXHJcbiAgICAgICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaSAtPSAzO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZm5BcnJheS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuIiwiaWYgKCFEYXRlLm5vdykge1xyXG4gIERhdGUubm93ID0gZnVuY3Rpb24gbm93KCkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgRmxvYXQzMkFycmF5ID09IFwidW5kZWZpbmVkXCIpIHtcclxuICB3aW5kb3cuRmxvYXQzMkFycmF5ID0gQXJyYXk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInJlcXVpcmUoXCIuL2Jhc2UuanNcIik7XHJcblxyXG5yZXF1aXJlKFwiLi9zeXN0ZW1zL1JBRi5qc1wiKTsgLy8gMiBLYlxyXG4vLyByZXF1aXJlKCcuL3N5c3RlbXMvT2JqZWN0Q3JlYXRvci5qcycpOyAvLyAxIEtiXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvTG9hZGVyLmpzXCIpOyAvLyAzIEtiXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvSW5wdXQuanNcIik7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9UaW1lci5qc1wiKTsgLy8gMSBLYlxyXG5cclxucmVxdWlyZShcIi4vdXRpbHMvRXZlbnRFbWl0dGVyLmpzXCIpO1xyXG5cclxucmVxdWlyZShcIi4vdGV4dHVyZXMvVGV4dHVyZS5qc1wiKTsgLy8gNCBLYlxyXG5cclxucmVxdWlyZShcIi4vb2JqZWN0cy9TcHJpdGUuanNcIik7IC8vIDMgS2JcclxucmVxdWlyZShcIi4vb2JqZWN0cy9UZXh0LmpzXCIpOyAvLyA1IEtiXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==