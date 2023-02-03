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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlueS5taW5pLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlCQUF5QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkJBQTJCO0FBQ25EO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2xKQSxtQkFBTyxDQUFDLG9EQUFxQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLDhCQUFVO0FBQ2xCLG1CQUFPLENBQUMsb0NBQWE7QUFDckIsbUJBQU8sQ0FBQywwQ0FBZ0IsR0FBRztBQUMzQixtQkFBTyxDQUFDLDRDQUFpQixHQUFHO0FBQzVCLG1CQUFPLENBQUMsOENBQWtCLEdBQUc7QUFDN0IsbUJBQU8sQ0FBQyxvREFBcUIsR0FBRztBQUNoQztBQUNBLG1CQUFPLENBQUMsZ0VBQTJCLEdBQUc7QUFDdEMsbUJBQU8sQ0FBQyx3REFBdUIsR0FBRztBQUNsQyxtQkFBTyxDQUFDLGtEQUFvQixHQUFHO0FBQy9CO0FBQ0EsbUJBQU8sQ0FBQyx3RUFBK0IsR0FBRzs7Ozs7Ozs7Ozs7QUNmMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUY7QUFDekY7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7Ozs7OztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE9BQU87QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdlVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDLHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkMsd0JBQXdCLFVBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx5QkFBeUI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwrQkFBK0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywrQkFBK0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsUUFBUTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0EsNkNBQTZDLHlCQUF5QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCx5QkFBeUI7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUJBQXlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuUEE7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBcUQ7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxnQ0FBZ0Msb0JBQW9CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0NBQWtDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxtQkFBTyxDQUFDLGdDQUFXO0FBQ25CO0FBQ0EsbUJBQU8sQ0FBQyw4Q0FBa0IsR0FBRztBQUM3QiwwQ0FBMEM7QUFDMUMsbUJBQU8sQ0FBQyxvREFBcUIsR0FBRztBQUNoQyxtQkFBTyxDQUFDLGtEQUFvQixHQUFHO0FBQy9CLG1CQUFPLENBQUMsa0RBQW9CLEdBQUc7QUFDL0I7QUFDQSxtQkFBTyxDQUFDLDREQUF5QjtBQUNqQztBQUNBLG1CQUFPLENBQUMsd0RBQXVCLEdBQUc7QUFDbEM7QUFDQSxtQkFBTyxDQUFDLG9EQUFxQixHQUFHO0FBQ2hDLG1CQUFPLENBQUMsZ0RBQW1CLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvQXBwLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9iYXNlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvTWF0aC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvbWF0aC9NYXRyaXguanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL21hdGgvUmVjdGFuZ2xlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9vYmplY3RzL0Jhc2VPYmplY3QyRC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvb2JqZWN0cy9PYmplY3QyRC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvb2JqZWN0cy9TY2VuZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvb2JqZWN0cy9TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL29iamVjdHMvVGV4dC5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvcmVuZGVyZXJzL0NhbnZhc1JlbmRlcmVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL0lucHV0LmpzIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9zeXN0ZW1zL0xvYWRlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvc3lzdGVtcy9SQUYuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3N5c3RlbXMvVGltZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3RleHR1cmVzL1RleHR1cmUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vc3JjL3V0aWxzL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9zcmMvdXRpbHMvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3NyYy9taW5pLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBub29wID0gZnVuY3Rpb24gKCkge307XHJcblxyXG5UaW55LkFwcCA9IGZ1bmN0aW9uIChzdGF0ZXMpIHtcclxuICAgIHRoaXMuY2FsbGJhY2tDb250ZXh0ID0gdGhpcztcclxuICAgIHRoaXMuc3RhdGUgPSAwO1xyXG4gICAgdGhpcy50aW1lU2NhbGUgPSAxO1xyXG4gICAgdGhpcy53aWR0aCA9IDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IDA7XHJcbiAgICB0aGlzLnN5c3RlbXMgPSBbXTtcclxuICAgIHRoaXMudXBkYXRhYmxlID0gW107XHJcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYXVzZUR1cmF0aW9uID0gMDtcclxuICAgIHRoaXMuaW5wdXRWaWV3ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICBpZiAoVGlueS5FdmVudEVtaXR0ZXIpIFRpbnkuRXZlbnRFbWl0dGVyLm1peGluKHRoaXMpO1xyXG5cclxuICAgIHN0YXRlcyA9IHN0YXRlcyB8fCB7fTtcclxuICAgIHRoaXMuYm9vdCA9IHN0YXRlcy5ib290IHx8IHRoaXMuYm9vdCB8fCBub29wO1xyXG4gICAgdGhpcy5wcmVsb2FkID0gc3RhdGVzLnByZWxvYWQgfHwgdGhpcy5wcmVsb2FkIHx8IG5vb3A7XHJcbiAgICB0aGlzLmNyZWF0ZSA9IHN0YXRlcy5jcmVhdGUgfHwgdGhpcy5jcmVhdGUgfHwgbm9vcDtcclxuICAgIHRoaXMudXBkYXRlID0gc3RhdGVzLnVwZGF0ZSB8fCB0aGlzLnVwZGF0ZSB8fCBub29wO1xyXG4gICAgdGhpcy5yZW5kZXIgPSBzdGF0ZXMucmVuZGVyIHx8IHRoaXMucmVuZGVyIHx8IG5vb3A7XHJcbiAgICB0aGlzLl9yZXNpemVfY2IgPSBzdGF0ZXMucmVzaXplIHx8IG5vb3A7XHJcbiAgICB0aGlzLl9kZXN0cm95X2NiID0gc3RhdGVzLmRlc3Ryb3kgfHwgbm9vcDtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9ib290KCk7XHJcbiAgICB9LCAwKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fYm9vdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVGlueS5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHN5c3RlbSA9IFRpbnkuc3lzdGVtc1tpXTtcclxuXHJcbiAgICAgICAgdmFyIF9zeXNfID0gbmV3IHN5c3RlbS5fY2xhc3NfKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtcy5wdXNoKF9zeXNfKTtcclxuICAgICAgICBpZiAoX3N5c18udXBkYXRlKSB0aGlzLnVwZGF0YWJsZS5wdXNoKF9zeXNfKTtcclxuXHJcbiAgICAgICAgaWYgKHN5c3RlbS5uYW1lKSB0aGlzW3N5c3RlbS5uYW1lXSA9IF9zeXNfO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChUaW55LlJBRikge1xyXG4gICAgICAgIHRoaXMucmFmID0gbmV3IFRpbnkuUkFGKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYm9vdC5jYWxsKHRoaXMuY2FsbGJhY2tDb250ZXh0KTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoc2VsZi5sb2FkKSBzZWxmLl9wcmVsb2FkKCk7XHJcbiAgICAgICAgZWxzZSBzZWxmLl9jcmVhdGUoKTtcclxuICAgIH0sIDApO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLl9wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5wcmVsb2FkLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IDE7XHJcbiAgICB0aGlzLmxvYWQuc3RhcnQodGhpcy5fY3JlYXRlKTtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5jcmVhdGUuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcblxyXG4gICAgaWYgKHRoaXMucmFmKSB7XHJcbiAgICAgICAgdGhpcy5yYWYuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXRlID0gMjtcclxufTtcclxuXHJcblRpbnkuQXBwLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnJhZikge1xyXG4gICAgICAgIHRoaXMucmFmLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zeXN0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN5c3RlbXNbaV0ucGF1c2UpIHRoaXMuc3lzdGVtc1tpXS5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnJhZikge1xyXG4gICAgICAgIHRoaXMucmFmLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3lzdGVtc1tpXS5yZXN1bWUpIHRoaXMuc3lzdGVtc1tpXS5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uICh0aW1lLCBkZWx0YSkge1xyXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgIGRlbHRhICo9IHRoaXMudGltZVNjYWxlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQsIHRpbWUsIGRlbHRhKTtcclxuICAgICAgICB0aGlzLmVtaXQoXCJ1cGRhdGVcIiwgZGVsdGEpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudXBkYXRhYmxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRhYmxlW2ldLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhdXNlRHVyYXRpb24gKz0gZGVsdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIHRoaXMuZW1pdChcInBvc3RyZW5kZXJcIik7XHJcbn07XHJcblxyXG5UaW55LkFwcC5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCB0aGlzLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzaXplX2NiLmNhbGwodGhpcy5jYWxsYmFja0NvbnRleHQsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoc2VsZi5pbnB1dCkgc2VsZi5pbnB1dC51cGRhdGVCb3VuZHMoKTtcclxuICAgIH0sIDApO1xyXG59O1xyXG5cclxuVGlueS5BcHAucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoY2xlYXJDYWNoZSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5zeXN0ZW1zW2ldLmRlc3Ryb3kpIHRoaXMuc3lzdGVtc1tpXS5kZXN0cm95KGNsZWFyQ2FjaGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoY2xlYXJDYWNoZSkge1xyXG4gICAgICAgIHRoaXMubG9hZC5jbGVhckNhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmFmKSB7XHJcbiAgICAgICAgdGhpcy5yYWYuc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2Rlc3Ryb3lfY2IuY2FsbCh0aGlzLmNhbGxiYWNrQ29udGV4dCk7XHJcbn07XHJcbiIsInJlcXVpcmUoXCIuL3V0aWxzL3BvbHlmaWxsLmpzXCIpO1xyXG5cclxud2luZG93LlRpbnkgPSB7fTtcclxuXHJcbnJlcXVpcmUoXCIuL0FwcC5qc1wiKTtcclxucmVxdWlyZShcIi4vZ2xvYmFsLmpzXCIpO1xyXG5yZXF1aXJlKFwiLi9tYXRoL01hdGguanNcIik7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vbWF0aC9Qb2ludC5qc1wiKTsgLy9cclxucmVxdWlyZShcIi4vbWF0aC9NYXRyaXguanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL21hdGgvUmVjdGFuZ2xlLmpzXCIpOyAvLyAgOCBLYlxyXG5cclxucmVxdWlyZShcIi4vb2JqZWN0cy9CYXNlT2JqZWN0MkQuanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL29iamVjdHMvT2JqZWN0MkQuanNcIik7IC8vXHJcbnJlcXVpcmUoXCIuL29iamVjdHMvU2NlbmUuanNcIik7IC8vIDEwIEtiXHJcblxyXG5yZXF1aXJlKFwiLi9yZW5kZXJlcnMvQ2FudmFzUmVuZGVyZXIuanNcIik7IC8vIDMgS2JcclxuIiwiVGlueS5WRVJTSU9OID0gXCIyLjEuNlwiO1xyXG5cclxuVGlueS5zeXN0ZW1zID0gW107XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtID0gZnVuY3Rpb24gKG5hbWUsIHN5c3RlbSkge1xyXG4gICAgVGlueS5zeXN0ZW1zLnB1c2goe1xyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgX2NsYXNzXzogc3lzdGVtXHJcbiAgICB9KTtcclxufTtcclxuXHJcblRpbnkuUHJpbWl0aXZlcyA9IHtcclxuICAgIFBPTFk6IDAsXHJcbiAgICBSRUNUOiAxLFxyXG4gICAgQ0lSQzogMixcclxuICAgIEVMSVA6IDMsXHJcbiAgICBSUkVDOiA0LFxyXG4gICAgUlJFQ19MSk9JTjogNVxyXG59O1xyXG5cclxuVGlueS5ybmQgPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xyXG59O1xyXG5cclxuVGlueS5jb2xvcjJyZ2IgPSBmdW5jdGlvbiAoc3R5bGUpIHtcclxuICAgIHJldHVybiBUaW55LmhleDJyZ2IoVGlueS5zdHlsZTJoZXgoc3R5bGUpKTtcclxufTtcclxuXHJcblRpbnkuY29sb3Iyc3R5bGUgPSBmdW5jdGlvbiAoc3R5bGUpIHtcclxuICAgIHJldHVybiBzdHlsZTtcclxufTtcclxuXHJcblRpbnkuc3R5bGUyaGV4ID0gZnVuY3Rpb24gKHN0eWxlKSB7XHJcbiAgICByZXR1cm4gK3N0eWxlLnJlcGxhY2UoXCIjXCIsIFwiMHhcIik7XHJcbn07XHJcblxyXG5UaW55LmhleDJzdHlsZSA9IGZ1bmN0aW9uIChoZXgpIHtcclxuICAgIHJldHVybiBcIiNcIiArIChcIjAwMDAwXCIgKyAoaGV4IHwgMCkudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO1xyXG59O1xyXG5cclxuVGlueS5oZXgycmdiID0gZnVuY3Rpb24gKGhleCkge1xyXG4gICAgcmV0dXJuIFsoKGhleCA+PiAxNikgJiAweGZmKSAvIDI1NSwgKChoZXggPj4gOCkgJiAweGZmKSAvIDI1NSwgKGhleCAmIDB4ZmYpIC8gMjU1XTtcclxufTtcclxuXHJcblRpbnkucmdiMmhleCA9IGZ1bmN0aW9uIChyZ2IpIHtcclxuICAgIHJldHVybiAoKHJnYlswXSAqIDI1NSkgPDwgMTYpICsgKChyZ2JbMV0gKiAyNTUpIDw8IDgpICsgcmdiWzJdICogMjU1O1xyXG59O1xyXG4iLCJUaW55Lk1hdGggPSB7XHJcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgdmFyIGR4ID0geDEgLSB4MjtcclxuICAgICAgICB2YXIgZHkgPSB5MSAtIHkyO1xyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgIH1cclxufTtcclxuXHJcbnZhciBkZWdyZWVUb1JhZGlhbnNGYWN0b3IgPSBNYXRoLlBJIC8gMTgwO1xyXG52YXIgcmFkaWFuVG9EZWdyZWVzRmFjdG9yID0gMTgwIC8gTWF0aC5QSTtcclxuXHJcblRpbnkuTWF0aC5kZWdUb1JhZCA9IGZ1bmN0aW9uIGRlZ1RvUmFkKGRlZ3JlZXMpIHtcclxuICAgIHJldHVybiBkZWdyZWVzICogZGVncmVlVG9SYWRpYW5zRmFjdG9yO1xyXG59O1xyXG5cclxuVGlueS5NYXRoLnJhZFRvRGVnID0gZnVuY3Rpb24gcmFkVG9EZWcocmFkaWFucykge1xyXG4gICAgcmV0dXJuIHJhZGlhbnMgKiByYWRpYW5Ub0RlZ3JlZXNGYWN0b3I7XHJcbn07XHJcbiIsIlRpbnkuTWF0cml4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hID0gMTtcclxuXHJcbiAgICB0aGlzLmIgPSAwO1xyXG5cclxuICAgIHRoaXMuYyA9IDA7XHJcblxyXG4gICAgdGhpcy5kID0gMTtcclxuXHJcbiAgICB0aGlzLnR4ID0gMDtcclxuXHJcbiAgICB0aGlzLnR5ID0gMDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55Lk1BVFJJWDtcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5mcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgIHRoaXMuYSA9IGFycmF5WzBdO1xyXG4gICAgdGhpcy5iID0gYXJyYXlbMV07XHJcbiAgICB0aGlzLmMgPSBhcnJheVszXTtcclxuICAgIHRoaXMuZCA9IGFycmF5WzRdO1xyXG4gICAgdGhpcy50eCA9IGFycmF5WzJdO1xyXG4gICAgdGhpcy50eSA9IGFycmF5WzVdO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAodHJhbnNwb3NlKSB7XHJcbiAgICBpZiAoIXRoaXMuYXJyYXkpIHtcclxuICAgICAgICB0aGlzLmFycmF5ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xyXG5cclxuICAgIGlmICh0cmFuc3Bvc2UpIHtcclxuICAgICAgICBhcnJheVswXSA9IHRoaXMuYTtcclxuICAgICAgICBhcnJheVsxXSA9IHRoaXMuYjtcclxuICAgICAgICBhcnJheVsyXSA9IDA7XHJcbiAgICAgICAgYXJyYXlbM10gPSB0aGlzLmM7XHJcbiAgICAgICAgYXJyYXlbNF0gPSB0aGlzLmQ7XHJcbiAgICAgICAgYXJyYXlbNV0gPSAwO1xyXG4gICAgICAgIGFycmF5WzZdID0gdGhpcy50eDtcclxuICAgICAgICBhcnJheVs3XSA9IHRoaXMudHk7XHJcbiAgICAgICAgYXJyYXlbOF0gPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhcnJheVswXSA9IHRoaXMuYTtcclxuICAgICAgICBhcnJheVsxXSA9IHRoaXMuYztcclxuICAgICAgICBhcnJheVsyXSA9IHRoaXMudHg7XHJcbiAgICAgICAgYXJyYXlbM10gPSB0aGlzLmI7XHJcbiAgICAgICAgYXJyYXlbNF0gPSB0aGlzLmQ7XHJcbiAgICAgICAgYXJyYXlbNV0gPSB0aGlzLnR5O1xyXG4gICAgICAgIGFycmF5WzZdID0gMDtcclxuICAgICAgICBhcnJheVs3XSA9IDA7XHJcbiAgICAgICAgYXJyYXlbOF0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJheTtcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uIChwb3MsIG5ld1Bvcykge1xyXG4gICAgbmV3UG9zID0gbmV3UG9zIHx8IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdmFyIHggPSBwb3MueDtcclxuICAgIHZhciB5ID0gcG9zLnk7XHJcblxyXG4gICAgbmV3UG9zLnggPSB0aGlzLmEgKiB4ICsgdGhpcy5jICogeSArIHRoaXMudHg7XHJcbiAgICBuZXdQb3MueSA9IHRoaXMuYiAqIHggKyB0aGlzLmQgKiB5ICsgdGhpcy50eTtcclxuXHJcbiAgICByZXR1cm4gbmV3UG9zO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGx5SW52ZXJzZSA9IGZ1bmN0aW9uIChwb3MsIG5ld1Bvcykge1xyXG4gICAgbmV3UG9zID0gbmV3UG9zIHx8IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdmFyIGlkID0gMSAvICh0aGlzLmEgKiB0aGlzLmQgKyB0aGlzLmMgKiAtdGhpcy5iKTtcclxuICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICB2YXIgeSA9IHBvcy55O1xyXG5cclxuICAgIG5ld1Bvcy54ID0gdGhpcy5kICogaWQgKiB4ICsgLXRoaXMuYyAqIGlkICogeSArICh0aGlzLnR5ICogdGhpcy5jIC0gdGhpcy50eCAqIHRoaXMuZCkgKiBpZDtcclxuICAgIG5ld1Bvcy55ID0gdGhpcy5hICogaWQgKiB5ICsgLXRoaXMuYiAqIGlkICogeCArICgtdGhpcy50eSAqIHRoaXMuYSArIHRoaXMudHggKiB0aGlzLmIpICogaWQ7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BvcztcclxufTtcclxuXHJcblRpbnkuTWF0cml4LnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdGhpcy50eCArPSB4O1xyXG4gICAgdGhpcy50eSArPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMuYSAqPSB4O1xyXG4gICAgdGhpcy5kICo9IHk7XHJcbiAgICB0aGlzLmMgKj0geDtcclxuICAgIHRoaXMuYiAqPSB5O1xyXG4gICAgdGhpcy50eCAqPSB4O1xyXG4gICAgdGhpcy50eSAqPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xyXG4gICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XHJcblxyXG4gICAgdmFyIGExID0gdGhpcy5hO1xyXG4gICAgdmFyIGMxID0gdGhpcy5jO1xyXG4gICAgdmFyIHR4MSA9IHRoaXMudHg7XHJcblxyXG4gICAgdGhpcy5hID0gYTEgKiBjb3MgLSB0aGlzLmIgKiBzaW47XHJcbiAgICB0aGlzLmIgPSBhMSAqIHNpbiArIHRoaXMuYiAqIGNvcztcclxuICAgIHRoaXMuYyA9IGMxICogY29zIC0gdGhpcy5kICogc2luO1xyXG4gICAgdGhpcy5kID0gYzEgKiBzaW4gKyB0aGlzLmQgKiBjb3M7XHJcbiAgICB0aGlzLnR4ID0gdHgxICogY29zIC0gdGhpcy50eSAqIHNpbjtcclxuICAgIHRoaXMudHkgPSB0eDEgKiBzaW4gKyB0aGlzLnR5ICogY29zO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5NYXRyaXgucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICAgIHZhciBhMSA9IHRoaXMuYTtcclxuICAgIHZhciBiMSA9IHRoaXMuYjtcclxuICAgIHZhciBjMSA9IHRoaXMuYztcclxuICAgIHZhciBkMSA9IHRoaXMuZDtcclxuXHJcbiAgICB0aGlzLmEgPSBtYXRyaXguYSAqIGExICsgbWF0cml4LmIgKiBjMTtcclxuICAgIHRoaXMuYiA9IG1hdHJpeC5hICogYjEgKyBtYXRyaXguYiAqIGQxO1xyXG4gICAgdGhpcy5jID0gbWF0cml4LmMgKiBhMSArIG1hdHJpeC5kICogYzE7XHJcbiAgICB0aGlzLmQgPSBtYXRyaXguYyAqIGIxICsgbWF0cml4LmQgKiBkMTtcclxuXHJcbiAgICB0aGlzLnR4ID0gbWF0cml4LnR4ICogYTEgKyBtYXRyaXgudHkgKiBjMSArIHRoaXMudHg7XHJcbiAgICB0aGlzLnR5ID0gbWF0cml4LnR4ICogYjEgKyBtYXRyaXgudHkgKiBkMSArIHRoaXMudHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55Lk1hdHJpeC5wcm90b3R5cGUuaWRlbnRpdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmEgPSAxO1xyXG4gICAgdGhpcy5iID0gMDtcclxuICAgIHRoaXMuYyA9IDA7XHJcbiAgICB0aGlzLmQgPSAxO1xyXG4gICAgdGhpcy50eCA9IDA7XHJcbiAgICB0aGlzLnR5ID0gMDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuaWRlbnRpdHlNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuIiwiVGlueS5Qb2ludCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbn07XHJcblxyXG5UaW55LlBvaW50LnByb3RvdHlwZSA9IHtcclxuICAgIHNldDogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICAgICAgdGhpcy55ID0geSB8fCAoeSAhPT0gMCA/IHRoaXMueCA6IDApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5SZWN0YW5nbGUgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgeCA9IHggfHwgMDtcclxuICAgIHkgPSB5IHx8IDA7XHJcbiAgICB3aWR0aCA9IHdpZHRoIHx8IDA7XHJcbiAgICBoZWlnaHQgPSBoZWlnaHQgfHwgMDtcclxuXHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuUkVDVDtcclxufTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSA9IHtcclxuICAgIHNldFRvOiBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWluczogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gVGlueS5SZWN0YW5nbGUuY29udGFpbnModGhpcywgeCwgeSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGludGVyc2VjdHM6IGZ1bmN0aW9uIChiKSB7XHJcbiAgICAgICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmludGVyc2VjdHModGhpcywgYik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5SZWN0YW5nbGUucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMueSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB2YWx1ZSAtIHRoaXMueTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJyaWdodFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPD0gdGhpcy54KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB2YWx1ZSAtIHRoaXMueDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUmVjdGFuZ2xlLnByb3RvdHlwZSwgXCJ2b2x1bWVcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggKiB0aGlzLmhlaWdodDtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LlJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJlY3RhbmdsZTtcclxuXHJcblRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGEsIHgsIHkpIHtcclxuICAgIGlmIChhLndpZHRoIDw9IDAgfHwgYS5oZWlnaHQgPD0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geCA+PSBhLnggJiYgeCA8IGEucmlnaHQgJiYgeSA+PSBhLnkgJiYgeSA8IGEuYm90dG9tO1xyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUuY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uIChhLCBwb2ludCkge1xyXG4gICAgcmV0dXJuIFRpbnkuUmVjdGFuZ2xlLmNvbnRhaW5zKGEsIHBvaW50LngsIHBvaW50LnkpO1xyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUuY29udGFpbnNSZWN0ID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIC8vICBJZiB0aGUgZ2l2ZW4gcmVjdCBoYXMgYSBsYXJnZXIgdm9sdW1lIHRoYW4gdGhpcyBvbmUgdGhlbiBpdCBjYW4gbmV2ZXIgY29udGFpbiBpdFxyXG4gICAgaWYgKGEudm9sdW1lID4gYi52b2x1bWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGEueCA+PSBiLnggJiYgYS55ID49IGIueSAmJiBhLnJpZ2h0IDwgYi5yaWdodCAmJiBhLmJvdHRvbSA8IGIuYm90dG9tO1xyXG59O1xyXG5cclxuVGlueS5SZWN0YW5nbGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICBpZiAoYS53aWR0aCA8PSAwIHx8IGEuaGVpZ2h0IDw9IDAgfHwgYi53aWR0aCA8PSAwIHx8IGIuaGVpZ2h0IDw9IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICEoYS5yaWdodCA8IGIueCB8fCBhLmJvdHRvbSA8IGIueSB8fCBhLnggPiBiLnJpZ2h0IHx8IGEueSA+IGIuYm90dG9tKTtcclxufTtcclxuXHJcblRpbnkuRW1wdHlSZWN0YW5nbGUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMCwgMCk7XHJcbiIsInZhciBwaTIgPSBNYXRoLlBJICogMjtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJEID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUaW55LlBvaW50KDEsIDEpO1xyXG4gICAgdGhpcy5waXZvdCA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmFscGhhID0gMTtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnJlbmRlcmFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMud29ybGRBbHBoYSA9IDE7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLl9zciA9IDA7XHJcbiAgICB0aGlzLl9jciA9IDE7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkJhc2VPYmplY3QyRDtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IG51bGw7XHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMucmVuZGVyYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZGVzdHJveUNhY2hlZFNwcml0ZSgpO1xyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ3b3JsZFZpc2libGVcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGlmICghaXRlbS52aXNpYmxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnBhcmVudDtcclxuICAgICAgICB9IHdoaWxlIChpdGVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJjYWNoZUFzQml0bWFwXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUFzQml0bWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwID09PSB2YWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIHNvbWUgbWF0cml4IHJlZnMgZm9yIGVhc3kgYWNjZXNzXHJcbiAgICB2YXIgcHQgPSB0aGlzLnBhcmVudC53b3JsZFRyYW5zZm9ybTtcclxuICAgIHZhciB3dCA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgLy8gdGVtcG9yYXJ5IG1hdHJpeCB2YXJpYWJsZXNcclxuICAgIHZhciBhLCBiLCBjLCBkLCB0eCwgdHk7XHJcblxyXG4gICAgLy8gc28gaWYgcm90YXRpb24gaXMgYmV0d2VlbiAwIHRoZW4gd2UgY2FuIHNpbXBsaWZ5IHRoZSBtdWx0aXBsaWNhdGlvbiBwcm9jZXNzLi5cclxuICAgIGlmICh0aGlzLnJvdGF0aW9uICUgcGkyKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSByb3RhdGlvbiBpcyB0aGUgc2FtZSBhcyB0aGUgcHJldmlvdXMgcmVuZGVyLiBUaGlzIG1lYW5zIHdlIG9ubHkgbmVlZCB0byB1c2Ugc2luIGFuZCBjb3Mgd2hlbiByb3RhdGlvbiBhY3R1YWxseSBjaGFuZ2VzXHJcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb24gIT09IHRoaXMucm90YXRpb25DYWNoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uQ2FjaGUgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9zciA9IE1hdGguc2luKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9jciA9IE1hdGguY29zKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtYXRyaXggdmFsdWVzIG9mIHRoZSBkaXNwbGF5b2JqZWN0IGJhc2VkIG9uIGl0cyB0cmFuc2Zvcm0gcHJvcGVydGllcy4uXHJcbiAgICAgICAgYSA9IHRoaXMuX2NyICogdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGIgPSB0aGlzLl9zciAqIHRoaXMuc2NhbGUueDtcclxuICAgICAgICBjID0gLXRoaXMuX3NyICogdGhpcy5zY2FsZS55O1xyXG4gICAgICAgIGQgPSB0aGlzLl9jciAqIHRoaXMuc2NhbGUueTtcclxuICAgICAgICB0eCA9IHRoaXMucG9zaXRpb24ueDtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgZm9yIHBpdm90Li4gbm90IG9mdGVuIHVzZWQgc28gZ2VhcmVkIHRvd2FyZHMgdGhhdCBmYWN0IVxyXG4gICAgICAgIGlmICh0aGlzLnBpdm90LnggfHwgdGhpcy5waXZvdC55KSB7XHJcbiAgICAgICAgICAgIHR4IC09IHRoaXMucGl2b3QueCAqIGEgKyB0aGlzLnBpdm90LnkgKiBjO1xyXG4gICAgICAgICAgICB0eSAtPSB0aGlzLnBpdm90LnggKiBiICsgdGhpcy5waXZvdC55ICogZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbmNhdCB0aGUgcGFyZW50IG1hdHJpeCB3aXRoIHRoZSBvYmplY3RzIHRyYW5zZm9ybS5cclxuICAgICAgICB3dC5hID0gYSAqIHB0LmEgKyBiICogcHQuYztcclxuICAgICAgICB3dC5iID0gYSAqIHB0LmIgKyBiICogcHQuZDtcclxuICAgICAgICB3dC5jID0gYyAqIHB0LmEgKyBkICogcHQuYztcclxuICAgICAgICB3dC5kID0gYyAqIHB0LmIgKyBkICogcHQuZDtcclxuICAgICAgICB3dC50eCA9IHR4ICogcHQuYSArIHR5ICogcHQuYyArIHB0LnR4O1xyXG4gICAgICAgIHd0LnR5ID0gdHggKiBwdC5iICsgdHkgKiBwdC5kICsgcHQudHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGxldHMgZG8gdGhlIGZhc3QgdmVyc2lvbiBhcyB3ZSBrbm93IHRoZXJlIGlzIG5vIHJvdGF0aW9uLi5cclxuICAgICAgICBhID0gdGhpcy5zY2FsZS54O1xyXG4gICAgICAgIGQgPSB0aGlzLnNjYWxlLnk7XHJcblxyXG4gICAgICAgIHR4ID0gdGhpcy5wb3NpdGlvbi54IC0gdGhpcy5waXZvdC54ICogYTtcclxuICAgICAgICB0eSA9IHRoaXMucG9zaXRpb24ueSAtIHRoaXMucGl2b3QueSAqIGQ7XHJcblxyXG4gICAgICAgIHd0LmEgPSBhICogcHQuYTtcclxuICAgICAgICB3dC5iID0gYSAqIHB0LmI7XHJcbiAgICAgICAgd3QuYyA9IGQgKiBwdC5jO1xyXG4gICAgICAgIHd0LmQgPSBkICogcHQuZDtcclxuICAgICAgICB3dC50eCA9IHR4ICogcHQuYSArIHR5ICogcHQuYyArIHB0LnR4O1xyXG4gICAgICAgIHd0LnR5ID0gdHggKiBwdC5iICsgdHkgKiBwdC5kICsgcHQudHk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbXVsdGlwbHkgdGhlIGFscGhhcy4uXHJcbiAgICB0aGlzLndvcmxkQWxwaGEgPSB0aGlzLmFscGhhICogdGhpcy5wYXJlbnQud29ybGRBbHBoYTtcclxufTtcclxuXHJcbi8vIHBlcmZvcm1hbmNlIGluY3JlYXNlIHRvIGF2b2lkIHVzaW5nIGNhbGwuLiAoMTB4IGZhc3RlcilcclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0gPSBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICAgIC8vIG1hdHJpeCA9IG1hdHJpeDsvL2p1c3QgdG8gZ2V0IHBhc3NlZCBqcyBoaW50aW5nIChhbmQgcHJlc2VydmUgaW5oZXJpdGFuY2UpXHJcbiAgICByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5nZXRMb2NhbEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldEJvdW5kcyhUaW55LmlkZW50aXR5TWF0cml4KTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5nZW5lcmF0ZVRleHR1cmUgPSBmdW5jdGlvbiAocmVzb2x1dGlvbiwgcmVuZGVyZXIpIHtcclxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldExvY2FsQm91bmRzKCk7XHJcblxyXG4gICAgdmFyIHJlbmRlclRleHR1cmUgPSBuZXcgVGlueS5SZW5kZXJUZXh0dXJlKGJvdW5kcy53aWR0aCB8IDAsIGJvdW5kcy5oZWlnaHQgfCAwLCByZW5kZXJlciwgcmVzb2x1dGlvbik7XHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuXHJcbiAgICByZW5kZXJUZXh0dXJlLnJlbmRlcih0aGlzLCBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeCk7XHJcblxyXG4gICAgcmV0dXJuIHJlbmRlclRleHR1cmU7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUudXBkYXRlQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLnRvR2xvYmFsID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcbiAgICAvLyBkb24ndCBuZWVkIHRvIHVbZGF0ZSB0aGUgbG90XHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIHJldHVybiB0aGlzLndvcmxkVHJhbnNmb3JtLmFwcGx5KHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS50b0xvY2FsID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBmcm9tKSB7XHJcbiAgICBpZiAoZnJvbSkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gZnJvbS50b0dsb2JhbChwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG9uJ3QgbmVlZCB0byB1W2RhdGUgdGhlIGxvdFxyXG4gICAgdGhpcy5kaXNwbGF5T2JqZWN0VXBkYXRlVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm0uYXBwbHlJbnZlcnNlKHBvc2l0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZS5fcmVuZGVyQ2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsIHJlbmRlclNlc3Npb24pO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbiAgICB0aGlzLl9jYWNoZUFzQml0bWFwID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlZFNwcml0ZSkge1xyXG4gICAgICAgIHZhciByZW5kZXJUZXh0dXJlID0gbmV3IFRpbnkuUmVuZGVyVGV4dHVyZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7IC8vLCByZW5kZXJTZXNzaW9uLnJlbmRlcmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FjaGVkU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKHJlbmRlclRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlc2l6ZShib3VuZHMud2lkdGggfCAwLCBib3VuZHMuaGVpZ2h0IHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgudHggPSAtYm91bmRzLng7XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5fdGVtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5yZW5kZXIodGhpcywgVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXgsIHRydWUpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueCA9IC0oYm91bmRzLnggLyBib3VuZHMud2lkdGgpO1xyXG4gICAgdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55ID0gLShib3VuZHMueSAvIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlQXNCaXRtYXAgPSB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQucHJvdG90eXBlLl9kZXN0cm95Q2FjaGVkU3ByaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZWRTcHJpdGUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5kZXN0cm95KHRydWUpO1xyXG5cclxuICAgIHRoaXMuX2NhY2hlZFNwcml0ZSA9IG51bGw7XHJcbn07XHJcblxyXG5UaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHt9O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ4XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLng7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSwgXCJ5XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5CYXNlT2JqZWN0MkQuX3RlbXBNYXRyaXggPSBuZXcgVGlueS5NYXRyaXgoKTtcclxuIiwiVGlueS5PYmplY3QyRCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgdGhpcy5fYm91bmRzID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXNrID0gbnVsbDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuT2JqZWN0MkQ7XHJcblxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsICdpbnB1dEVuYWJsZWQnLCB7XHJcblxyXG4vLyAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICByZXR1cm4gKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5lbmFibGVkKVxyXG4vLyAgICAgfSxcclxuXHJcbi8vICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbi8vICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0ID09PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLmlucHV0ID0ge2VuYWJsZWQ6IHRydWUsIHBhcmVudDogdGhpc31cclxuLy8gICAgICAgICAgICAgICAgIFRpbnkuRXZlbnRUYXJnZXQubWl4aW4odGhpcy5pbnB1dClcclxuLy8gICAgICAgICAgICAgfSBlbHNlXHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmVuYWJsZWQgPSB0cnVlXHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5pbnB1dCAhPT0gbnVsbCAmJiAodGhpcy5pbnB1dC5lbmFibGVkID0gZmFsc2UpXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG5cclxuLy8gfSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5PYmplY3QyRC5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCAqIHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGg7XHJcblxyXG4gICAgICAgIGlmICh3aWR0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueSAqIHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChoZWlnaHQgIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyBoZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS55ID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55Lk9iamVjdDJELnByb3RvdHlwZSwgXCJtYXNrXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNrO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKSB0aGlzLl9tYXNrLmlzTWFzayA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9tYXNrID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXNrKSB0aGlzLl9tYXNrLmlzTWFzayA9IHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuXHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuX2JvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gbnVsbDtcclxuICAgIHRoaXMuX21hc2sgPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLmlucHV0KSB0aGlzLmlucHV0LnN5c3RlbS5yZW1vdmUodGhpcyk7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgIHJldHVybiB0aGlzLmFkZENoaWxkQXQoY2hpbGQsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoKTtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChjaGlsZC5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50LnJlbW92ZShjaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5nYW1lKSBjaGlsZC5nYW1lID0gdGhpcy5nYW1lO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgY2hpbGQgKyBcImFkZENoaWxkQXQ6IFRoZSBpbmRleCBcIiArIGluZGV4ICsgXCIgc3VwcGxpZWQgaXMgb3V0IG9mIGJvdW5kcyBcIiArIHRoaXMuY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnN3YXBDaGlsZHJlbiA9IGZ1bmN0aW9uIChjaGlsZCwgY2hpbGQyKSB7XHJcbiAgICBpZiAoY2hpbGQgPT09IGNoaWxkMikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaW5kZXgxID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcclxuICAgIHZhciBpbmRleDIgPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQyKTtcclxuXHJcbiAgICBpZiAoaW5kZXgxIDwgMCB8fCBpbmRleDIgPCAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3dhcENoaWxkcmVuOiBCb3RoIHRoZSBzdXBwbGllZCBPYmplY3RzIG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgY2FsbGVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuW2luZGV4MV0gPSBjaGlsZDI7XHJcbiAgICB0aGlzLmNoaWxkcmVuW2luZGV4Ml0gPSBjaGlsZDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldENoaWxkSW5kZXggPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN1cHBsaWVkIE9iamVjdCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlclwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbmRleDtcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnNldENoaWxkSW5kZXggPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN1cHBsaWVkIGluZGV4IGlzIG91dCBvZiBib3VuZHNcIik7XHJcbiAgICB9XHJcbiAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGN1cnJlbnRJbmRleCwgMSk7IC8vcmVtb3ZlIGZyb20gb2xkIHBvc2l0aW9uXHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpOyAvL2FkZCBhdCBuZXcgcG9zaXRpb25cclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIFwiZ2V0Q2hpbGRBdDogU3VwcGxpZWQgaW5kZXggXCIgK1xyXG4gICAgICAgICAgICAgICAgaW5kZXggK1xyXG4gICAgICAgICAgICAgICAgXCIgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkIGxpc3QsIG9yIHRoZSBzdXBwbGllZCBPYmplY3QgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXJcIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltpbmRleF07XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlQ2hpbGRBdChpbmRleCk7XHJcbn07XHJcblxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICB2YXIgY2hpbGQgPSB0aGlzLmdldENoaWxkQXQoaW5kZXgpO1xyXG4gICAgY2hpbGQucGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgcmV0dXJuIGNoaWxkO1xyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRyZW4gPSBmdW5jdGlvbiAoYmVnaW5JbmRleCwgZW5kSW5kZXgpIHtcclxuICAgIHZhciBiZWdpbiA9IGJlZ2luSW5kZXggfHwgMDtcclxuICAgIHZhciBlbmQgPSB0eXBlb2YgZW5kSW5kZXggPT09IFwibnVtYmVyXCIgPyBlbmRJbmRleCA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgdmFyIHJhbmdlID0gZW5kIC0gYmVnaW47XHJcblxyXG4gICAgaWYgKHJhbmdlID4gMCAmJiByYW5nZSA8PSBlbmQpIHtcclxuICAgICAgICB2YXIgcmVtb3ZlZCA9IHRoaXMuY2hpbGRyZW4uc3BsaWNlKGJlZ2luLCByYW5nZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdmVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHJlbW92ZWRbaV07XHJcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgICB9IGVsc2UgaWYgKHJhbmdlID09PSAwICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZW1vdmVDaGlsZHJlbjogUmFuZ2UgRXJyb3IsIG51bWVyaWMgdmFsdWVzIGFyZSBvdXRzaWRlIHRoZSBhY2NlcHRhYmxlIHJhbmdlXCIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmRpc3BsYXlPYmplY3RVcGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCkgcmV0dXJuO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gcGVyZm9ybWFuY2UgaW5jcmVhc2UgdG8gYXZvaWQgdXNpbmcgY2FsbC4uICgxMHggZmFzdGVyKVxyXG5UaW55Lk9iamVjdDJELnByb3RvdHlwZS5kaXNwbGF5T2JqZWN0Q29udGFpbmVyVXBkYXRlVHJhbnNmb3JtID0gVGlueS5PYmplY3QyRC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtO1xyXG5cclxuVGlueS5PYmplY3QyRC5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuICAgIGlmICh0aGlzLl9jYWNoZWRTcHJpdGUpIHJldHVybiB0aGlzLl9jYWNoZWRTcHJpdGUuZ2V0Qm91bmRzKCk7XHJcblxyXG4gICAgLy8gVE9ETyB0aGUgYm91bmRzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGN1bGF0ZWQgdGhpcyByZW5kZXIgc2Vzc2lvbiBzbyByZXR1cm4gd2hhdCB3ZSBoYXZlXHJcblxyXG4gICAgdmFyIG1pblggPSBJbmZpbml0eTtcclxuICAgIHZhciBtaW5ZID0gSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgY2hpbGRCb3VuZHM7XHJcbiAgICB2YXIgY2hpbGRNYXhYO1xyXG4gICAgdmFyIGNoaWxkTWF4WTtcclxuXHJcbiAgICB2YXIgY2hpbGRWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XHJcblxyXG4gICAgICAgIGlmICghY2hpbGQudmlzaWJsZSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGNoaWxkVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNoaWxkQm91bmRzID0gdGhpcy5jaGlsZHJlbltpXS5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICAgICAgbWluWCA9IG1pblggPCBjaGlsZEJvdW5kcy54ID8gbWluWCA6IGNoaWxkQm91bmRzLng7XHJcbiAgICAgICAgbWluWSA9IG1pblkgPCBjaGlsZEJvdW5kcy55ID8gbWluWSA6IGNoaWxkQm91bmRzLnk7XHJcblxyXG4gICAgICAgIGNoaWxkTWF4WCA9IGNoaWxkQm91bmRzLndpZHRoICsgY2hpbGRCb3VuZHMueDtcclxuICAgICAgICBjaGlsZE1heFkgPSBjaGlsZEJvdW5kcy5oZWlnaHQgKyBjaGlsZEJvdW5kcy55O1xyXG5cclxuICAgICAgICBtYXhYID0gbWF4WCA+IGNoaWxkTWF4WCA/IG1heFggOiBjaGlsZE1heFg7XHJcbiAgICAgICAgbWF4WSA9IG1heFkgPiBjaGlsZE1heFkgPyBtYXhZIDogY2hpbGRNYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2hpbGRWaXNpYmxlKSByZXR1cm4gVGlueS5FbXB0eVJlY3RhbmdsZTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIFRPRE86IHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICAvL3RoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmdldExvY2FsQm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1hdHJpeENhY2hlID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gVGlueS5pZGVudGl0eU1hdHJpeDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbWF0cml4Q2FjaGU7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblRpbnkuT2JqZWN0MkQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5TY2VuZSA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLndvcmxkVHJhbnNmb3JtID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG59O1xyXG5cclxuVGlueS5TY2VuZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuT2JqZWN0MkQucHJvdG90eXBlKTtcclxuVGlueS5TY2VuZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNjZW5lO1xyXG5cclxuVGlueS5TY2VuZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy53b3JsZEFscGhhID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlNwcml0ZSA9IGZ1bmN0aW9uICh0ZXh0dXJlLCBrZXkpIHtcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvciA9IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdGhpcy5zZXRUZXh0dXJlKHRleHR1cmUsIGtleSwgZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuX3dpZHRoID0gMDtcclxuXHJcbiAgICB0aGlzLl9oZWlnaHQgPSAwO1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLnRpbnQgPSBcIiNGRkZGRkZcIjtcclxuXHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlLmhhc0xvYWRlZCkge1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlNwcml0ZTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlNwcml0ZS5wcm90b3R5cGUsIFwiZnJhbWVOYW1lXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHR1cmUuZnJhbWUubmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLmZyYW1lLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuQ2FjaGUudGV4dHVyZVt0aGlzLnRleHR1cmUua2V5ICsgXCIuXCIgKyB2YWx1ZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5TcHJpdGUucHJvdG90eXBlLCBcImZyYW1lXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLmxhc3RGcmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZnJhbWUgPiB0aGlzLnRleHR1cmUubGFzdEZyYW1lKSB0aGlzLl9mcmFtZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dHVyZShUaW55LkNhY2hlLnRleHR1cmVbdGhpcy50ZXh0dXJlLmtleSArIFwiLlwiICsgdGhpcy5fZnJhbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ICogdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IHZhbHVlIC8gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuU3ByaXRlLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueSAqIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS55ID0gdmFsdWUgLyB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKHRleHR1cmUsIGtleSwgdXBkYXRlRGltZW5zaW9uKSB7XHJcbiAgICBpZiAodHlwZW9mIHRleHR1cmUgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBpbWFnZVBhdGggPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSBpbWFnZVBhdGggKyBcIi5cIiArIGtleTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbaW1hZ2VQYXRoXTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlUGF0aCk7XHJcbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBFcnJvcignQ2FjaGUgRXJyb3I6IGltYWdlICcgKyBpbWFnZVBhdGggKyAnIGRvZXNgdCBmb3VuZCBpbiBjYWNoZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZXh0dXJlID09PSB0ZXh0dXJlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgIHRoaXMuY2FjaGVkVGludCA9IFwiI0ZGRkZGRlwiO1xyXG5cclxuICAgIGlmICh1cGRhdGVEaW1lbnNpb24gPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLm9uVGV4dHVyZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLm9uVGV4dHVyZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIHNvIGlmIF93aWR0aCBpcyAwIHRoZW4gd2lkdGggd2FzIG5vdCBzZXQuLlxyXG4gICAgaWYgKHRoaXMuX3dpZHRoKSB0aGlzLnNjYWxlLnggPSB0aGlzLl93aWR0aCAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIGlmICh0aGlzLl9oZWlnaHQpIHRoaXMuc2NhbGUueSA9IHRoaXMuX2hlaWdodCAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbn07XHJcblxyXG5UaW55LlNwcml0ZS5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uICh0aW1lciwgZGVsYXkpIHtcclxuICAgIGlmICh0aGlzLnRleHR1cmUubGFzdEZyYW1lICYmIHRoaXMudGV4dHVyZS5mcmFtZS5pbmRleCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IHx8IHRoaXMudGV4dHVyZS5mcmFtZS5kdXJhdGlvbiB8fCAxMDA7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aW1lci5sb29wKFxyXG4gICAgICAgICAgICAgICAgZGVsYXksXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmRlbGF5ID0gZGVsYXkgfHwgdGhpcy50ZXh0dXJlLmZyYW1lLmR1cmF0aW9uIHx8IDEwMDtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kZWxheSA9IGRlbGF5O1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAobWF0cml4KSB7XHJcbiAgICB2YXIgd2lkdGggPSB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGggLyB0aGlzLnRleHR1cmUucmVzb2x1dGlvbjtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0IC8gdGhpcy50ZXh0dXJlLnJlc29sdXRpb247XHJcblxyXG4gICAgdmFyIHcwID0gd2lkdGggKiAoMSAtIHRoaXMuYW5jaG9yLngpO1xyXG4gICAgdmFyIHcxID0gd2lkdGggKiAtdGhpcy5hbmNob3IueDtcclxuXHJcbiAgICB2YXIgaDAgPSBoZWlnaHQgKiAoMSAtIHRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gbWF0cml4IHx8IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIGlmIChiID09PSAwICYmIGMgPT09IDApIHtcclxuICAgICAgICAvLyAvLyBzY2FsZSBtYXkgYmUgbmVnYXRpdmUhXHJcbiAgICAgICAgLy8gaWYgKGEgPCAwKSBhICo9IC0xO1xyXG4gICAgICAgIC8vIGlmIChkIDwgMCkgZCAqPSAtMTtcclxuXHJcbiAgICAgICAgLy8gLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBubyByb3RhdGlvbiBnb2luZyBvbiByaWdodD8gUklHSFQ/XHJcbiAgICAgICAgLy8gLy8gaWYgdGhhdHMgdGhlIGNhc2UgdGhlbiB3ZSBjYW4gYXZvaWQgY2hlY2tpbmcgdGhlIGJvdW5kIHZhbHVlcyEgeWF5XHJcbiAgICAgICAgLy8gbWluWCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgIC8vIG1heFggPSBhICogdzAgKyB0eDtcclxuICAgICAgICAvLyBtaW5ZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgLy8gbWF4WSA9IGQgKiBoMCArIHR5O1xyXG5cclxuICAgICAgICBpZiAoYSA8IDApIHtcclxuICAgICAgICAgICAgbWluWCA9IGEgKiB3MCArIHR4O1xyXG4gICAgICAgICAgICBtYXhYID0gYSAqIHcxICsgdHg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWluWCA9IGEgKiB3MSArIHR4O1xyXG4gICAgICAgICAgICBtYXhYID0gYSAqIHcwICsgdHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZCA8IDApIHtcclxuICAgICAgICAgICAgbWluWSA9IGQgKiBoMCArIHR5O1xyXG4gICAgICAgICAgICBtYXhZID0gZCAqIGgxICsgdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWluWSA9IGQgKiBoMSArIHR5O1xyXG4gICAgICAgICAgICBtYXhZID0gZCAqIGgwICsgdHk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgICAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICAgICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgICAgICB2YXIgeDQgPSBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgICAgICB2YXIgeTQgPSBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICAgICAgbWluWCA9IHgxIDwgbWluWCA/IHgxIDogbWluWDtcclxuICAgICAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICAgICAgbWluWCA9IHg0IDwgbWluWCA/IHg0IDogbWluWDtcclxuXHJcbiAgICAgICAgbWluWSA9IHkxIDwgbWluWSA/IHkxIDogbWluWTtcclxuICAgICAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICAgICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICAgICAgbWF4WCA9IHgxID4gbWF4WCA/IHgxIDogbWF4WDtcclxuICAgICAgICBtYXhYID0geDIgPiBtYXhYID8geDIgOiBtYXhYO1xyXG4gICAgICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICAgICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICAgICAgbWF4WSA9IHkxID4gbWF4WSA/IHkxIDogbWF4WTtcclxuICAgICAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICAgICAgbWF4WSA9IHk0ID4gbWF4WSA/IHk0IDogbWF4WTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG5cclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYWdhaW4gaW4gdGhlIHJlbmRlciBjeWNsZSB3ZSBkbyBub3QgaGF2ZSB0byByZWNhbGN1bGF0ZVxyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IGJvdW5kcztcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuVGlueS5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICAvLyBJZiB0aGUgc3ByaXRlIGlzIG5vdCB2aXNpYmxlIG9yIHRoZSBhbHBoYSBpcyAwIHRoZW4gbm8gbmVlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50XHJcbiAgICBpZiAoXHJcbiAgICAgICAgdGhpcy52aXNpYmxlID09PSBmYWxzZSB8fFxyXG4gICAgICAgIHRoaXMuYWxwaGEgPT09IDAgfHxcclxuICAgICAgICB0aGlzLnJlbmRlcmFibGUgPT09IGZhbHNlIHx8XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggPD0gMCB8fFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCA8PSAwXHJcbiAgICApXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIElnbm9yZSBudWxsIHNvdXJjZXNcclxuICAgIGlmICh0aGlzLnRleHR1cmUudmFsaWQpIHtcclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHRoaXMudGV4dHVyZS5yZXNvbHV0aW9uIC8gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgICAgIC8vICBJZiB0aGUgdGV4dHVyZSBpcyB0cmltbWVkIHdlIG9mZnNldCBieSB0aGUgdHJpbSB4L3ksIG90aGVyd2lzZSB3ZSB1c2UgdGhlIGZyYW1lIGRpbWVuc2lvbnNcclxuICAgICAgICB2YXIgZHggPSB0aGlzLnRleHR1cmUudHJpbVxyXG4gICAgICAgICAgICA/IHRoaXMudGV4dHVyZS50cmltLnggLSB0aGlzLmFuY2hvci54ICogdGhpcy50ZXh0dXJlLnRyaW0ud2lkdGhcclxuICAgICAgICAgICAgOiB0aGlzLmFuY2hvci54ICogLXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB2YXIgZHkgPSB0aGlzLnRleHR1cmUudHJpbVxyXG4gICAgICAgICAgICA/IHRoaXMudGV4dHVyZS50cmltLnkgLSB0aGlzLmFuY2hvci55ICogdGhpcy50ZXh0dXJlLnRyaW0uaGVpZ2h0XHJcbiAgICAgICAgICAgIDogdGhpcy5hbmNob3IueSAqIC10aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAvLyAgQWxsb3cgZm9yIHBpeGVsIHJvdW5kaW5nXHJcbiAgICAgICAgaWYgKHJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMpIHtcclxuICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgICh0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKSB8IDAsXHJcbiAgICAgICAgICAgICAgICAodGhpcy53b3JsZFRyYW5zZm9ybS50eSAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikgfCAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGR4ID0gZHggfCAwO1xyXG4gICAgICAgICAgICBkeSA9IGR5IHwgMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5iLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbnQgIT09IFwiI0ZGRkZGRlwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlZFRpbnQgIT09IHRoaXMudGludCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRUaW50ID0gdGhpcy50aW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW50ZWRUZXh0dXJlID0gVGlueS5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSh0aGlzLCB0aGlzLnRpbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW50ZWRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIGR4IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIC8gcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCAvIHJlc29sdXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLngsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBkeCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICBkeSAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgLyByZXNvbHV0aW9uXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE9WRVJXUklURVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcbiIsIlRpbnkuVGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBzdHlsZSkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gMTtcclxuXHJcbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKHRoaXMuY2FudmFzKSk7XHJcblxyXG4gICAgdGhpcy5zZXRUZXh0KHRleHQpO1xyXG4gICAgdGhpcy5zZXRTdHlsZShzdHlsZSk7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlNwcml0ZS5wcm90b3R5cGUpO1xyXG5UaW55LlRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UZXh0O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGV4dC5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggKiB0aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRleHQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueSAqIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnkgPSB2YWx1ZSAvIHRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5UZXh0LnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChzdHlsZSkge1xyXG4gICAgc3R5bGUgPSBzdHlsZSB8fCB7fTtcclxuICAgIHN0eWxlLmZvbnQgPSBzdHlsZS5mb250IHx8IFwiYm9sZCAyMHB0IEFyaWFsXCI7XHJcbiAgICBzdHlsZS5maWxsID0gc3R5bGUuZmlsbCB8fCBcImJsYWNrXCI7XHJcbiAgICBzdHlsZS5hbGlnbiA9IHN0eWxlLmFsaWduIHx8IFwibGVmdFwiO1xyXG4gICAgc3R5bGUuc3Ryb2tlID0gc3R5bGUuc3Ryb2tlIHx8IFwiYmxhY2tcIjtcclxuICAgIHN0eWxlLnN0cm9rZVRoaWNrbmVzcyA9IHN0eWxlLnN0cm9rZVRoaWNrbmVzcyB8fCAwO1xyXG4gICAgc3R5bGUud29yZFdyYXAgPSBzdHlsZS53b3JkV3JhcCB8fCBmYWxzZTtcclxuICAgIHN0eWxlLmxpbmVTcGFjaW5nID0gc3R5bGUubGluZVNwYWNpbmcgfHwgMDtcclxuICAgIHN0eWxlLndvcmRXcmFwV2lkdGggPSBzdHlsZS53b3JkV3JhcFdpZHRoICE9PSB1bmRlZmluZWQgPyBzdHlsZS53b3JkV3JhcFdpZHRoIDogMTAwO1xyXG5cclxuICAgIHN0eWxlLmRyb3BTaGFkb3cgPSBzdHlsZS5kcm9wU2hhZG93IHx8IGZhbHNlO1xyXG4gICAgc3R5bGUuZHJvcFNoYWRvd0FuZ2xlID0gc3R5bGUuZHJvcFNoYWRvd0FuZ2xlICE9PSB1bmRlZmluZWQgPyBzdHlsZS5kcm9wU2hhZG93QW5nbGUgOiBNYXRoLlBJIC8gNjtcclxuICAgIHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSA9IHN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSAhPT0gdW5kZWZpbmVkID8gc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlIDogNDtcclxuICAgIHN0eWxlLmRyb3BTaGFkb3dDb2xvciA9IHN0eWxlLmRyb3BTaGFkb3dDb2xvciB8fCBcImJsYWNrXCI7XHJcblxyXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xyXG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dC50b1N0cmluZygpIHx8IFwiIFwiO1xyXG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnVwZGF0ZVRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiA9IHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuc3R5bGUuZm9udDtcclxuXHJcbiAgICB2YXIgb3V0cHV0VGV4dCA9IHRoaXMudGV4dDtcclxuXHJcbiAgICAvLyB3b3JkIHdyYXBcclxuICAgIC8vIHByZXNlcnZlIG9yaWdpbmFsIHRleHRcclxuICAgIGlmICh0aGlzLnN0eWxlLndvcmRXcmFwKSBvdXRwdXRUZXh0ID0gdGhpcy53b3JkV3JhcCh0aGlzLnRleHQpO1xyXG5cclxuICAgIC8vc3BsaXQgdGV4dCBpbnRvIGxpbmVzXHJcbiAgICB2YXIgbGluZXMgPSBvdXRwdXRUZXh0LnNwbGl0KC8oPzpcXHJcXG58XFxyfFxcbikvKTtcclxuXHJcbiAgICAvL2NhbGN1bGF0ZSB0ZXh0IHdpZHRoXHJcbiAgICB2YXIgbGluZVdpZHRocyA9IFtdO1xyXG4gICAgdmFyIG1heExpbmVXaWR0aCA9IDA7XHJcbiAgICB2YXIgZm9udFByb3BlcnRpZXMgPSB0aGlzLmRldGVybWluZUZvbnRQcm9wZXJ0aWVzKHRoaXMuc3R5bGUuZm9udCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGxpbmVXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dChsaW5lc1tpXSkud2lkdGg7XHJcbiAgICAgICAgbGluZVdpZHRoc1tpXSA9IGxpbmVXaWR0aDtcclxuICAgICAgICBtYXhMaW5lV2lkdGggPSBNYXRoLm1heChtYXhMaW5lV2lkdGgsIGxpbmVXaWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHdpZHRoID0gbWF4TGluZVdpZHRoICsgdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3M7XHJcbiAgICBpZiAodGhpcy5zdHlsZS5kcm9wU2hhZG93KSB3aWR0aCArPSB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9ICh3aWR0aCArIHRoaXMuY29udGV4dC5saW5lV2lkdGgpICogdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIC8vY2FsY3VsYXRlIHRleHQgaGVpZ2h0XHJcbiAgICB2YXIgbGluZUhlaWdodCA9IGZvbnRQcm9wZXJ0aWVzLmZvbnRTaXplICsgdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgKyB0aGlzLnN0eWxlLmxpbmVTcGFjaW5nO1xyXG5cclxuICAgIHZhciBoZWlnaHQgPSBsaW5lSGVpZ2h0ICogbGluZXMubGVuZ3RoO1xyXG4gICAgaWYgKHRoaXMuc3R5bGUuZHJvcFNoYWRvdykgaGVpZ2h0ICs9IHRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IChoZWlnaHQgLSB0aGlzLnN0eWxlLmxpbmVTcGFjaW5nKSAqIHRoaXMucmVzb2x1dGlvbjtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuc2NhbGUodGhpcy5yZXNvbHV0aW9uLCB0aGlzLnJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmIChuYXZpZ2F0b3IuaXNDb2Nvb25KUykgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBkZWJ1Z2dpbmcuLlxyXG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFN0eWxlID1cIiNGRjAwMDBcIlxyXG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuc3R5bGUuZm9udDtcclxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuc3R5bGUuc3Ryb2tlO1xyXG4gICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzO1xyXG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xyXG4gICAgdGhpcy5jb250ZXh0Lm1pdGVyTGltaXQgPSAyO1xyXG5cclxuICAgIC8vdGhpcy5jb250ZXh0LmxpbmVKb2luID0gJ3JvdW5kJztcclxuXHJcbiAgICB2YXIgbGluZVBvc2l0aW9uWDtcclxuICAgIHZhciBsaW5lUG9zaXRpb25ZO1xyXG5cclxuICAgIGlmICh0aGlzLnN0eWxlLmRyb3BTaGFkb3cpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5zdHlsZS5kcm9wU2hhZG93Q29sb3I7XHJcblxyXG4gICAgICAgIHZhciB4U2hhZG93T2Zmc2V0ID0gTWF0aC5zaW4odGhpcy5zdHlsZS5kcm9wU2hhZG93QW5nbGUpICogdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7XHJcbiAgICAgICAgdmFyIHlTaGFkb3dPZmZzZXQgPSBNYXRoLmNvcyh0aGlzLnN0eWxlLmRyb3BTaGFkb3dBbmdsZSkgKiB0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDI7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblkgPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDIgKyBpICogbGluZUhlaWdodCArIGZvbnRQcm9wZXJ0aWVzLmFzY2VudDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlLmFsaWduID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gbWF4TGluZVdpZHRoIC0gbGluZVdpZHRoc1tpXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0eWxlLmFsaWduID09PSBcImNlbnRlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IChtYXhMaW5lV2lkdGggLSBsaW5lV2lkdGhzW2ldKSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlLmZpbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCArIHhTaGFkb3dPZmZzZXQsIGxpbmVQb3NpdGlvblkgKyB5U2hhZG93T2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gIGlmKGRyb3BTaGFkb3cpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vc2V0IGNhbnZhcyB0ZXh0IHN0eWxlc1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuc3R5bGUuZmlsbDtcclxuXHJcbiAgICAvL2RyYXcgbGluZXMgbGluZSBieSBsaW5lXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsaW5lUG9zaXRpb25YID0gdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MgLyAyO1xyXG4gICAgICAgIGxpbmVQb3NpdGlvblkgPSB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyAvIDIgKyBpICogbGluZUhlaWdodCArIGZvbnRQcm9wZXJ0aWVzLmFzY2VudDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGUuYWxpZ24gPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICBsaW5lUG9zaXRpb25YICs9IG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0eWxlLmFsaWduID09PSBcImNlbnRlclwiKSB7XHJcbiAgICAgICAgICAgIGxpbmVQb3NpdGlvblggKz0gKG1heExpbmVXaWR0aCAtIGxpbmVXaWR0aHNbaV0pIC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlLnN0cm9rZSAmJiB0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCwgbGluZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdHlsZS5maWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChsaW5lc1tpXSwgbGluZVBvc2l0aW9uWCwgbGluZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgaWYoZHJvcFNoYWRvdylcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVRleHR1cmUoKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUudXBkYXRlVGV4dHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudGV4dHVyZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy50ZXh0dXJlLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxuICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoID0gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgPSB0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuX3dpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICBpZiAodGhpcy5kaXJ0eSB8fCB0aGlzLnJlc29sdXRpb24gIT09IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbikge1xyXG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLCByZW5kZXJTZXNzaW9uKTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZGV0ZXJtaW5lRm9udFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoZm9udFN0eWxlKSB7XHJcbiAgICB2YXIgcHJvcGVydGllcyA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhY2hlW2ZvbnRTdHlsZV07XHJcblxyXG4gICAgaWYgKCFwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgcHJvcGVydGllcyA9IHt9O1xyXG5cclxuICAgICAgICB2YXIgY2FudmFzID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzO1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ29udGV4dDtcclxuXHJcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udFN0eWxlO1xyXG5cclxuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmNlaWwoY29udGV4dC5tZWFzdXJlVGV4dChcInxNw4lxXCIpLndpZHRoKTtcclxuICAgICAgICB2YXIgYmFzZWxpbmUgPSBNYXRoLmNlaWwoY29udGV4dC5tZWFzdXJlVGV4dChcInxNw4lxXCIpLndpZHRoKTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gMiAqIGJhc2VsaW5lO1xyXG5cclxuICAgICAgICBiYXNlbGluZSA9IChiYXNlbGluZSAqIDEuNCkgfCAwO1xyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2YwMFwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnRTdHlsZTtcclxuXHJcbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXCJ8TcOJcVwiLCAwLCBiYXNlbGluZSk7XHJcblxyXG4gICAgICAgIHZhciBpbWFnZWRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xyXG4gICAgICAgIHZhciBwaXhlbHMgPSBpbWFnZWRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHZhciBsaW5lID0gd2lkdGggKiA0O1xyXG5cclxuICAgICAgICB2YXIgaSwgajtcclxuXHJcbiAgICAgICAgdmFyIGlkeCA9IDA7XHJcbiAgICAgICAgdmFyIHN0b3AgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gYXNjZW50LiBzY2FuIGZyb20gdG9wIHRvIGJvdHRvbSB1bnRpbCB3ZSBmaW5kIGEgbm9uIHJlZCBwaXhlbFxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBiYXNlbGluZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsaW5lOyBqICs9IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbWFnZWRhdGFbaWR4ICsgal0gIT09IDI1NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc3RvcCkge1xyXG4gICAgICAgICAgICAgICAgaWR4ICs9IGxpbmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvcGVydGllcy5hc2NlbnQgPSBiYXNlbGluZSAtIGk7XHJcblxyXG4gICAgICAgIGlkeCA9IHBpeGVscyAtIGxpbmU7XHJcbiAgICAgICAgc3RvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBkZXNjZW50LiBzY2FuIGZyb20gYm90dG9tIHRvIHRvcCB1bnRpbCB3ZSBmaW5kIGEgbm9uIHJlZCBwaXhlbFxyXG4gICAgICAgIGZvciAoaSA9IGhlaWdodDsgaSA+IGJhc2VsaW5lOyBpLS0pIHtcclxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxpbmU7IGogKz0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlZGF0YVtpZHggKyBqXSAhPT0gMjU1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdG9wKSB7XHJcbiAgICAgICAgICAgICAgICBpZHggLT0gbGluZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmRlc2NlbnQgPSBpIC0gYmFzZWxpbmU7XHJcbiAgICAgICAgLy9UT0RPIG1pZ2h0IG5lZWQgYSB0d2Vhay4ga2luZCBvZiBhIHRlbXAgZml4IVxyXG4gICAgICAgIHByb3BlcnRpZXMuZGVzY2VudCArPSA2O1xyXG4gICAgICAgIHByb3BlcnRpZXMuZm9udFNpemUgPSBwcm9wZXJ0aWVzLmFzY2VudCArIHByb3BlcnRpZXMuZGVzY2VudDtcclxuXHJcbiAgICAgICAgVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGVbZm9udFN0eWxlXSA9IHByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLndvcmRXcmFwID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIC8vIEdyZWVkeSB3cmFwcGluZyBhbGdvcml0aG0gdGhhdCB3aWxsIHdyYXAgd29yZHMgYXMgdGhlIGxpbmUgZ3Jvd3MgbG9uZ2VyXHJcbiAgICAvLyB0aGFuIGl0cyBob3Jpem9udGFsIGJvdW5kcy5cclxuICAgIHZhciByZXN1bHQgPSBcIlwiO1xyXG4gICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdChcIlxcblwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgc3BhY2VMZWZ0ID0gdGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoO1xyXG4gICAgICAgIHZhciB3b3JkcyA9IGxpbmVzW2ldLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHdvcmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciB3b3JkV2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQod29yZHNbal0pLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgd29yZFdpZHRoV2l0aFNwYWNlID0gd29yZFdpZHRoICsgdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KFwiIFwiKS53aWR0aDtcclxuICAgICAgICAgICAgaWYgKGogPT09IDAgfHwgd29yZFdpZHRoV2l0aFNwYWNlID4gc3BhY2VMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHByaW50aW5nIHRoZSBuZXdsaW5lIGlmIGl0J3MgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGxpbmUgdGhhdCBpc1xyXG4gICAgICAgICAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRoZSB3b3JkIHdyYXAgd2lkdGguXHJcbiAgICAgICAgICAgICAgICBpZiAoaiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB3b3Jkc1tqXTtcclxuICAgICAgICAgICAgICAgIHNwYWNlTGVmdCA9IHRoaXMuc3R5bGUud29yZFdyYXBXaWR0aCAtIHdvcmRXaWR0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlTGVmdCAtPSB3b3JkV2lkdGhXaXRoU3BhY2U7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIgXCIgKyB3b3Jkc1tqXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGkgPCBsaW5lcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5UaW55LlRleHQucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICAgIGlmICh0aGlzLmRpcnR5KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBUaW55LlNwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzLmNhbGwodGhpcywgbWF0cml4KTtcclxufTtcclxuXHJcblRpbnkuVGV4dC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSB0byByZXNldCB0aGUgdGhlIGNvbnRleHQgYW5kIGNhbnZhcy4uIGRvbnQgd2FudCB0aGlzIGhhbmdpbmcgYXJvdW5kIGluIG1lbW9yeSFcclxuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlLmRlc3Ryb3koKTtcclxuXHJcbiAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FjaGUgPSB7fTtcclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuVGlueS5UZXh0LmZvbnRQcm9wZXJ0aWVzQ29udGV4dCA9IFRpbnkuVGV4dC5mb250UHJvcGVydGllc0NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiIsIlRpbnkuQ2FudmFzUmVuZGVyZXIgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gb3B0aW9ucy5yZXNvbHV0aW9uICE9IHVuZGVmaW5lZCA/IG9wdGlvbnMucmVzb2x1dGlvbiA6IDE7XHJcblxyXG4gICAgdGhpcy5jbGVhckJlZm9yZVJlbmRlciA9IG9wdGlvbnMuY2xlYXJCZWZvcmVSZW5kZXIgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbGVhckJlZm9yZVJlbmRlciA6IHRydWU7XHJcblxyXG4gICAgdGhpcy50cmFuc3BhcmVudCA9IG9wdGlvbnMudHJhbnNwYXJlbnQgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy50cmFuc3BhcmVudCA6IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSA9IG9wdGlvbnMuYXV0b1Jlc2l6ZSB8fCBmYWxzZTtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoID0gd2lkdGggfHwgODAwO1xyXG4gICAgLy8gdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNjAwO1xyXG5cclxuICAgIC8vIHRoaXMud2lkdGggKj0gdGhpcy5yZXNvbHV0aW9uO1xyXG4gICAgLy8gdGhpcy5oZWlnaHQgKj0gdGhpcy5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGlmICghVGlueS5kZWZhdWx0UmVuZGVyZXIpIFRpbnkuZGVmYXVsdFJlbmRlcmVyID0gdGhpcztcclxuXHJcbiAgICB2YXIgdmlldyA9ICh0aGlzLmRvbUVsZW1lbnQgPSBvcHRpb25zLmRvbUVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0ID0gdmlldy5nZXRDb250ZXh0KFwiMmRcIiwgeyBhbHBoYTogdGhpcy50cmFuc3BhcmVudCB9KTtcclxuXHJcbiAgICAvLyB2aWV3LndpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbjtcclxuICAgIC8vIHZpZXcuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb247XHJcblxyXG4gICAgdGhpcy5yZXNpemUod2lkdGggfHwgODAwLCBoZWlnaHQgfHwgNjAwKTtcclxuXHJcbiAgICB0aGlzLnNldENsZWFyQ29sb3IoXCIjZmZmZmZmXCIpO1xyXG5cclxuICAgIGlmIChUaW55LkNhbnZhc01hc2tNYW5hZ2VyKSB0aGlzLm1hc2tNYW5hZ2VyID0gbmV3IFRpbnkuQ2FudmFzTWFza01hbmFnZXIoKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24gPSB7XHJcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxyXG4gICAgICAgIG1hc2tNYW5hZ2VyOiB0aGlzLm1hc2tNYW5hZ2VyLFxyXG4gICAgICAgIHNtb290aFByb3BlcnR5OiBudWxsLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElmIHRydWUgUGl4aSB3aWxsIE1hdGguZmxvb3IoKSB4L3kgdmFsdWVzIHdoZW4gcmVuZGVyaW5nLCBzdG9wcGluZyBwaXhlbCBpbnRlcnBvbGF0aW9uLlxyXG4gICAgICAgICAqIEhhbmR5IGZvciBjcmlzcCBwaXhlbCBhcnQgYW5kIHNwZWVkIG9uIGxlZ2FjeSBkZXZpY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcm91bmRQaXhlbHM6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChcImltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dCkgdGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5ID0gXCJpbWFnZVNtb290aGluZ0VuYWJsZWRcIjtcclxuICAgIGVsc2UgaWYgKFwid2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwid2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbiAgICBlbHNlIGlmIChcIm1vekltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm1vekltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJvSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCIgaW4gdGhpcy5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eSA9IFwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiO1xyXG4gICAgZWxzZSBpZiAoXCJtc0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiIGluIHRoaXMuY29udGV4dClcclxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHkgPSBcIm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI7XHJcbn07XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQ2FudmFzUmVuZGVyZXI7XHJcblxyXG5UaW55LkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvcjtcclxuXHJcbiAgICAvLyBpZiAoY29sb3IgPT09IG51bGwpIHtcclxuICAgIC8vICAgICB0aGlzLmNsZWFyQ29sb3IgPSBudWxsO1xyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvciB8fCAweDAwMDAwMDtcclxuICAgIC8vIC8vIHRoaXMuYmFja2dyb3VuZENvbG9yU3BsaXQgPSBUaW55LmhleDJyZ2IodGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgLy8gdmFyIGhleCA9IHRoaXMuY2xlYXJDb2xvci50b1N0cmluZygxNik7XHJcbiAgICAvLyBoZXggPSAnMDAwMDAwJy5zdWJzdHIoMCwgNiAtIGhleC5sZW5ndGgpICsgaGV4O1xyXG4gICAgLy8gdGhpcy5fY2xlYXJDb2xvciA9ICcjJyArIGhleDtcclxufTtcclxuXHJcbi8vIFRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnNldFBpeGVsQXJ0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4vLyAgICAgdmFyIGNhbnZhcyA9IHRoaXMuZG9tRWxlbWVudDtcclxuXHJcbi8vICAgICB2YXIgdHlwZXMgPSBbICdvcHRpbWl6ZVNwZWVkJywgJy1tb3otY3Jpc3AtZWRnZXMnLCAnLW8tY3Jpc3AtZWRnZXMnLCAnLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdCcsICdvcHRpbWl6ZS1jb250cmFzdCcsICdjcmlzcC1lZGdlcycsICdwaXhlbGF0ZWQnIF07XHJcblxyXG4vLyAgICAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBjYW52YXMuc3R5bGVbJ2ltYWdlLXJlbmRlcmluZyddID0gdHlwZTtcclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIGNhbnZhcy5zdHlsZS5tc0ludGVycG9sYXRpb25Nb2RlID0gJ25lYXJlc3QtbmVpZ2hib3InO1xyXG4vLyAgICAgdGhpcy5yZW5kZXJTZXNzaW9uLnJvdW5kUGl4ZWxzID0gdHJ1ZTtcclxuLy8gfVxyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHNjZW5lKSB7XHJcbiAgICBzY2VuZS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xyXG5cclxuICAgIGlmIChuYXZpZ2F0b3IuaXNDb2Nvb25KUyAmJiB0aGlzLmRvbUVsZW1lbnQuc2NyZWVuY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jbGVhckJlZm9yZVJlbmRlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYW5zcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCAqIHRoaXMucmVzb2x1dGlvbiwgdGhpcy5oZWlnaHQgKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNsZWFyQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoICogdGhpcy5yZXNvbHV0aW9uLCB0aGlzLmhlaWdodCAqIHRoaXMucmVzb2x1dGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyT2JqZWN0KHNjZW5lKTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAocmVtb3ZlVmlldykge1xyXG4gICAgaWYgKHR5cGVvZiByZW1vdmVWaWV3ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgcmVtb3ZlVmlldyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlbW92ZVZpZXcgJiYgdGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUpIHtcclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZG9tRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5tYXNrTWFuYWdlciA9IG51bGw7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24gPSBudWxsO1xyXG5cclxuICAgIGlmIChUaW55LmRlZmF1bHRSZW5kZXJlciA9PT0gdGhpcykgVGlueS5kZWZhdWx0UmVuZGVyZXIgPSBudWxsO1xyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgIHZpZXcud2lkdGggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgdmlldy5oZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICBpZiAodGhpcy5hdXRvUmVzaXplKSB7XHJcbiAgICAgICAgdmlldy5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIHZpZXcuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuc2V0UGl4ZWxSYXRpbyA9IGZ1bmN0aW9uIChyZXNvbHV0aW9uKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xyXG5cclxuICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgIHZpZXcud2lkdGggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggKiB0aGlzLnJlc29sdXRpb24pO1xyXG4gICAgdmlldy5oZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogdGhpcy5yZXNvbHV0aW9uKTtcclxufTtcclxuXHJcblRpbnkuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlck9iamVjdCA9IGZ1bmN0aW9uIChkaXNwbGF5T2JqZWN0LCBjb250ZXh0KSB7XHJcbiAgICB0aGlzLnJlbmRlclNlc3Npb24uY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcy5jb250ZXh0O1xyXG4gICAgdGhpcy5yZW5kZXJTZXNzaW9uLnJlc29sdXRpb24gPSB0aGlzLnJlc29sdXRpb247XHJcbiAgICBkaXNwbGF5T2JqZWN0LnJlbmRlcih0aGlzLnJlbmRlclNlc3Npb24pO1xyXG59O1xyXG4iLCJ2YXIgbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cztcclxuXHJcblRpbnkuSW5wdXQgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHZhciB2aWV3ID0gKHRoaXMuZG9tRWxlbWVudCA9IGdhbWUuaW5wdXRWaWV3KTtcclxuXHJcbiAgICB0aGlzLmJvdW5kcyA9IHsgeDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xyXG4gICAgdGhpcy5jYW5kaWRhdGVzID0gW107XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxuXHJcbiAgICB0aGlzLmxhc3RNb3ZlID0gbnVsbDtcclxuICAgIHRoaXMuaXNEb3duID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5kb3duSGFuZGxlciA9IHRoaXMuZG93bkhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSB0aGlzLm1vdmVIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnVwSGFuZGxlciA9IHRoaXMudXBIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICAvLyB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcblxyXG4gICAgLy8gdmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcclxuXHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3ZlSGFuZGxlcik7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMudXBIYW5kbGVyKTtcclxuXHJcbiAgICBUaW55LkV2ZW50RW1pdHRlci5taXhpbih0aGlzKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRpbnkuSW5wdXQuc3lzdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIFRpbnkuSW5wdXQuc3lzdGVtc1tpXS5pbml0LmNhbGwodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVCb3VuZHMoKTtcclxufTtcclxuXHJcblRpbnkuSW5wdXQucHJvdG90eXBlID0ge1xyXG4gICAgYWRkOiBmdW5jdGlvbiAob2JqZWN0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgb2JqZWN0LmlucHV0RW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIG9wdGlvbnMuc3lzdGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgb2JqZWN0LmlucHV0ID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4ob2JqZWN0LmlucHV0KTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gob2JqZWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5saXN0LmluZGV4T2Yob2JqZWN0KTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdmFyIHJlbW92ZWQgPSB0aGlzLmxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICByZW1vdmVkLmlucHV0ID0gbnVsbDtcclxuICAgICAgICAgICAgcmVtb3ZlZC5pbnB1dEVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dEhhbmRsZXI6IGZ1bmN0aW9uIChuYW1lLCBldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5hbWUpXHJcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuZ2V0Q29vcmRzKGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGNvb3JkcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAobmFtZSAhPSBcIm1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5kaWRhdGVzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUaW55LklucHV0LnN5c3RlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBUaW55LklucHV0LnN5c3RlbXNbaV0ucHJlSGFuZGxlLmNhbGwodGhpcywgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNHb29kLCBvYmo7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCB0aGlzLmxpc3QubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmxpc3RbdF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmlucHV0RW5hYmxlZCB8fCAhb2JqLnBhcmVudCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaW5wdXQuY2hlY2tCb3VuZHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzR29vZCA9IG9iai5pbnB1dC5jaGVja0JvdW5kcy5jYWxsKHRoaXMsIG9iaiwgY29vcmRzLngsIGNvb3Jkcy55KTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlzR29vZCA9IFRpbnkuSW5wdXQuY2hlY2tCb3VuZHMuY2FsbCh0aGlzLCBvYmosIGNvb3Jkcy54LCBjb29yZHMueSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0dvb2QpIHRoaXMuY2FuZGlkYXRlcy5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgaSA9IHRoaXMuY2FuZGlkYXRlcy5sZW5ndGhcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jYW5kaWRhdGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gdGhpcy5jYW5kaWRhdGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5pbnB1dFtcImxhc3RfXCIgKyBuYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy55XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmlucHV0LmVtaXQobmFtZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IG9iai5pbnB1dFtcImxhc3RfZG93blwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50ICYmIFRpbnkuTWF0aC5kaXN0YW5jZShwb2ludC54LCBwb2ludC55LCBjb29yZHMueCwgY29vcmRzLnkpIDwgMzApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5wdXQuZW1pdChcImNsaWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5pbnB1dC50cmFuc3BhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIG9iaiA9IHRoaXMuY2FuZGlkYXRlc1tpIC0gMV1cclxuICAgICAgICAgICAgICAgIC8vICAgICBvYmouaW5wdXRbXCJsYXN0X1wiICsgbmFtZV0gPSB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fVxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICBvYmouaW5wdXQuZW1pdChuYW1lLCB7eDogY29vcmRzLngsIHk6IGNvb3Jkcy55fSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKG5hbWUgPT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZhciBwb2ludCA9IG9iai5pbnB1dFtcImxhc3RfZG93blwiXVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAocG9pbnQgJiYgVGlueS5NYXRoLmRpc3RhbmNlKHBvaW50LngsIHBvaW50LnksIGNvb3Jkcy54LCBjb29yZHMueSkgPCAzMClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG9iai5pbnB1dC5lbWl0KFwiY2xpY2tcIiwge3g6IGNvb3Jkcy54LCB5OiBjb29yZHMueX0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVtaXQobmFtZSwge1xyXG4gICAgICAgICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdmVIYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmxhc3RNb3ZlID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJtb3ZlXCIsIGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBIYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwidXBcIiwgdGhpcy5sYXN0TW92ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRvd25IYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRG93biA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZSA9IGV2ZW50O1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyKFwiZG93blwiLCBldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrSGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIoXCJjbGlja1wiLCBldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldENvb3JkczogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNvb3JkcyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBldmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgbGlzdGVuaW5nVG9Ub3VjaEV2ZW50cyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5jbGllbnRYICYmIGV2ZW50LmNsaWVudFkpIHtcclxuICAgICAgICAgICAgICAgIGNvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBNb3VzZSBldmVudFxyXG4gICAgICAgICAgICBjb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChsaXN0ZW5pbmdUb1RvdWNoRXZlbnRzICYmIGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkgfHwgY29vcmRzID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29vcmRzID0ge1xyXG4gICAgICAgICAgICB4OiBjb29yZHMueCAtIHRoaXMuYm91bmRzLngsXHJcbiAgICAgICAgICAgIHk6IGNvb3Jkcy55IC0gdGhpcy5ib3VuZHMueVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBjb29yZHM7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUJvdW5kczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJvdW5kcyA9IHRoaXMuYm91bmRzO1xyXG5cclxuICAgICAgICB2YXIgY2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgYm91bmRzLnggPSBjbGllbnRSZWN0LmxlZnQ7XHJcbiAgICAgICAgYm91bmRzLnkgPSBjbGllbnRSZWN0LnRvcDtcclxuICAgICAgICBib3VuZHMud2lkdGggPSBjbGllbnRSZWN0LndpZHRoO1xyXG4gICAgICAgIGJvdW5kcy5oZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2aWV3ID0gdGhpcy5kb21FbGVtZW50O1xyXG5cclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuZG93bkhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLm1vdmVIYW5kbGVyKTtcclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnVwSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG5cclxuICAgICAgICB2aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5kb3duSGFuZGxlcik7XHJcbiAgICAgICAgdmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW92ZUhhbmRsZXIpO1xyXG4gICAgICAgIHZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy51cEhhbmRsZXIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5JbnB1dC5jaGVja0JvdW5kcyA9IGZ1bmN0aW9uIChvYmosIHgsIHkpIHtcclxuICAgIGlmIChvYmoud29ybGRWaXNpYmxlKSB7XHJcbiAgICAgICAgaWYgKG9iai5nZXRCb3VuZHMoKS5jb250YWlucyh4LCB5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKG9iai5jaGlsZHJlbiAmJiBvYmouY2hpbGRyZW4ubGVuZ3RoID4gMClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IG9iai5jaGlsZHJlbi5sZW5ndGg7IHQrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIF9jaGVja09uQWN0aXZlT2JqZWN0cyhvYmouY2hpbGRyZW5bdF0sIHgsIHkpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxufTtcclxuXHJcblRpbnkuSW5wdXQuc3lzdGVtcyA9IFtdO1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcImlucHV0XCIsIFRpbnkuSW5wdXQpO1xyXG4iLCJUaW55LkNhY2hlID0ge1xyXG4gICAgaW1hZ2U6IHt9LFxyXG4gICAgdGV4dHVyZToge31cclxufTtcclxuXHJcblRpbnkuTG9hZGVyID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIGdhbWUuY2FjaGUgPSBUaW55LkNhY2hlO1xyXG5cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLnByb3RvdHlwZSA9IHtcclxuICAgIGNsZWFyQ2FjaGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciB5IGluIFRpbnkuQ2FjaGUudGV4dHVyZSkgVGlueS5DYWNoZS50ZXh0dXJlW3ldLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LkNhY2hlKSBUaW55LkNhY2hlW3ldID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIGFsbDogZnVuY3Rpb24gKGFycmF5KSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5saXN0LmNvbmNhdChhcnJheSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGltYWdlOiBmdW5jdGlvbiAoa2V5LCBzb3VyY2UpIHtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIHNyYzogc291cmNlLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNwcml0ZXNoZWV0OiBmdW5jdGlvbiAoa2V5LCBzb3VyY2UsIGFyZ18xLCBhcmdfMiwgdG90YWxGcmFtZXMsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHtcclxuICAgICAgICAgICAgc3JjOiBzb3VyY2UsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB0eXBlOiBcInNwcml0ZXNoZWV0XCJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGFyZ18xID09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgcmVzLndpZHRoID0gYXJnXzE7XHJcbiAgICAgICAgICAgIHJlcy5oZWlnaHQgPSBhcmdfMjtcclxuICAgICAgICAgICAgcmVzLnRvdGFsID0gdG90YWxGcmFtZXM7XHJcbiAgICAgICAgICAgIHJlcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJnXzEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXMuZGF0YSA9IGFyZ18xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gocmVzKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXRsYXM6IGZ1bmN0aW9uIChrZXksIHNvdXJjZSwgYXRsYXNEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goe1xyXG4gICAgICAgICAgICBzcmM6IHNvdXJjZSxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIGRhdGE6IGF0bGFzRGF0YSxcclxuICAgICAgICAgICAgdHlwZTogXCJhdGxhc1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgZ2FtZSA9IHRoaXMuZ2FtZTtcclxuICAgICAgICB2YXIgbGlzdCA9IHRoaXMubGlzdDtcclxuXHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChnYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZE5leHQoKSB7XHJcbiAgICAgICAgICAgIC8vIHZhciBkb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGxpc3Quc2hpZnQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsb2FkZXIgPSBUaW55LkxvYWRlcltyZXNvdXJjZS50eXBlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2FkZXIpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRlcihyZXNvdXJjZSwgbG9hZGVkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbm5vdCBmaW5kIGxvYWRlciBmb3IgXCIgKyByZXNvdXJjZS50eXBlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkZWQocmVzb3VyY2UsIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGxvYWROZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGdhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2FkTmV4dCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIuYXRsYXMgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGNiKSB7XHJcbiAgICB2YXIga2V5ID0gcmVzb3VyY2Uua2V5O1xyXG5cclxuICAgIFRpbnkuTG9hZGVyLmltYWdlKHJlc291cmNlLCBmdW5jdGlvbiAocmVzb3VyY2UsIGltYWdlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNvdXJjZS5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB1dWlkID0ga2V5ICsgXCIuXCIgKyByZXNvdXJjZS5kYXRhW2ldLm5hbWU7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZSwgcmVzb3VyY2UuZGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG5cclxuICAgICAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLnNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gKHJlc291cmNlLCBjYikge1xyXG4gICAgdmFyIGtleSA9IHJlc291cmNlLmtleTtcclxuXHJcbiAgICBUaW55LkxvYWRlci5pbWFnZShyZXNvdXJjZSwgZnVuY3Rpb24gKHJlc291cmNlLCBpbWFnZSkge1xyXG4gICAgICAgIHZhciBsYXN0RnJhbWUsIHV1aWQsIHRleHR1cmU7XHJcblxyXG4gICAgICAgIGlmIChyZXNvdXJjZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBmcmFtZURhdGEgPSByZXNvdXJjZS5kYXRhO1xyXG4gICAgICAgICAgICBsYXN0RnJhbWUgPSBmcmFtZURhdGEubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGxhc3RGcmFtZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB1dWlkID0ga2V5ICsgXCIuXCIgKyBpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ueCksXHJcbiAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihmcmFtZURhdGFbaV0ueSksXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLndpZHRoKSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IE1hdGguZmxvb3IoZnJhbWVEYXRhW2ldLmhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGZyYW1lRGF0YVtpXS5kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmxhc3RGcmFtZSA9IGxhc3RGcmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJhbWVXaWR0aCA9IHJlc291cmNlLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgZnJhbWVIZWlnaHQgPSByZXNvdXJjZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZyYW1lV2lkdGgpIGZyYW1lV2lkdGggPSBNYXRoLmZsb29yKHdpZHRoIC8gKHJlc291cmNlLmNvbHMgfHwgMSkpO1xyXG4gICAgICAgICAgICBpZiAoIWZyYW1lSGVpZ2h0KSBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gKHJlc291cmNlLnJvd3MgfHwgMSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbHMgPSBNYXRoLmZsb29yKHdpZHRoIC8gZnJhbWVXaWR0aCk7XHJcbiAgICAgICAgICAgIHZhciByb3dzID0gTWF0aC5mbG9vcihoZWlnaHQgLyBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG90YWwgPSBjb2xzICogcm93cztcclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZS50b3RhbCkgdG90YWwgPSBNYXRoLm1pbih0b3RhbCwgcmVzb3VyY2UudG90YWwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHggPSAwO1xyXG4gICAgICAgICAgICB2YXIgeSA9IDA7XHJcbiAgICAgICAgICAgIGxhc3RGcmFtZSA9IHRvdGFsIC0gMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdXVpZCA9IGtleSArIFwiLlwiICsgaTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKGltYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBmcmFtZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogZnJhbWVIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHJlc291cmNlLmR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5sYXN0RnJhbWUgPSBsYXN0RnJhbWU7XHJcbiAgICAgICAgICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICAgICAgICAgIHggKz0gZnJhbWVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoeCArIGZyYW1lV2lkdGggPiB3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHkgKz0gZnJhbWVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLmltYWdlID0gZnVuY3Rpb24gKHJlc291cmNlLCBjYikge1xyXG4gICAgLy8gaWYgKFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKSByZXR1cm4gY2IocmVzb3VyY2UsIFRpbnkuQ2FjaGVbXCJpbWFnZVwiXVtyZXNvdXJjZS5rZXldKTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUaW55LkNhY2hlLmltYWdlW3Jlc291cmNlLmtleV0gPSBpbWFnZTtcclxuXHJcbiAgICAgICAgY2IocmVzb3VyY2UsIGltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGNiKHJlc291cmNlLCBpbWFnZSk7XHJcbiAgICAvLyB9KVxyXG5cclxuICAgIGltYWdlLnNyYyA9IHJlc291cmNlLnNyYztcclxufTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJsb2FkXCIsIFRpbnkuTG9hZGVyKTtcclxuIiwidmFyIF9pc1NldFRpbWVPdXQsIF9vbkxvb3AsIF90aW1lT3V0SUQsIF9wcmV2VGltZSwgX2xhc3RUaW1lO1xyXG5cclxudmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxufTtcclxuXHJcbmlmIChzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiYgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbm93ID0gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZChzZWxmLnBlcmZvcm1hbmNlKTtcclxufSBlbHNlIGlmIChEYXRlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBub3cgPSBEYXRlLm5vdztcclxufVxyXG5cclxuVGlueS5SQUYgPSBmdW5jdGlvbiAoZ2FtZSwgZm9yY2VTZXRUaW1lT3V0KSB7XHJcbiAgICBpZiAoZm9yY2VTZXRUaW1lT3V0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb3JjZVNldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZm9yY2VTZXRUaW1lT3V0ID0gZm9yY2VTZXRUaW1lT3V0O1xyXG5cclxuICAgIHZhciB2ZW5kb3JzID0gW1wibXNcIiwgXCJtb3pcIiwgXCJ3ZWJraXRcIiwgXCJvXCJdO1xyXG5cclxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IHgrKykge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XHJcbiAgICAgICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuICAgIF9vbkxvb3AgPSBudWxsO1xyXG4gICAgX3RpbWVPdXRJRCA9IG51bGw7XHJcblxyXG4gICAgX3ByZXZUaW1lID0gMDtcclxuICAgIF9sYXN0VGltZSA9IDA7XHJcbn07XHJcblxyXG5UaW55LlJBRi5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9wcmV2VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB0aGlzLmZvcmNlU2V0VGltZU91dCkge1xyXG4gICAgICAgICAgICBfaXNTZXRUaW1lT3V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlU2V0VGltZW91dCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9pc1NldFRpbWVPdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIF9vbkxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudXBkYXRlUkFGKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfb25Mb29wKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVJBRjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9sYXN0VGltZSA9IG5vdygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX29uTG9vcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVNldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfbGFzdFRpbWUgPSBub3coKTtcclxuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLl91cGRhdGUoTWF0aC5mbG9vcihfbGFzdFRpbWUpLCBfbGFzdFRpbWUgLSBfcHJldlRpbWUpO1xyXG5cclxuICAgICAgICAgICAgX3RpbWVPdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KF9vbkxvb3AsIFRpbnkuUkFGLnRpbWVUb0NhbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfcHJldlRpbWUgPSBfbGFzdFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3ByZXZUaW1lID0gbm93KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoX2lzU2V0VGltZU91dCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RpbWVPdXRJRCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKF90aW1lT3V0SUQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUkFGLnRpbWVUb0NhbGwgPSAxNTtcclxuIiwidmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbnZhciBUaW1lciA9IGZ1bmN0aW9uIChhdXRvU3RhcnQsIGF1dG9SZW1vdmUsIGdhbWUsIGNiLCBjdHgsIGRlbGF5LCBsb29wLCBuLCBvbmNvbXBsZXRlKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5jYiA9IGNiIHx8IG5vb3A7XHJcbiAgICB0aGlzLmN0eCA9IGN0eCB8fCB0aGlzO1xyXG4gICAgdGhpcy5kZWxheSA9IGRlbGF5ID09IHVuZGVmaW5lZCA/IDEwMDAgOiBkZWxheTtcclxuICAgIHRoaXMubG9vcCA9IGxvb3A7XHJcbiAgICB0aGlzLmNvdW50ID0gbiB8fCAwO1xyXG4gICAgdGhpcy5yZXBlYXQgPSB0aGlzLmNvdW50ID4gMDtcclxuICAgIHRoaXMucnVubmluZyA9ICEhYXV0b1N0YXJ0O1xyXG4gICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IGF1dG9SZW1vdmU7XHJcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbmNvbXBsZXRlIHx8IG5vb3A7XHJcbn07XHJcblxyXG5UaW1lci5wcm90b3R5cGUgPSB7XHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGFzdEZyYW1lID0gMDtcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YVRpbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0RnJhbWUgPj0gdGhpcy5kZWxheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMuY3R4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZSAmJiB0aGlzLmdhbWUudGltZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9SZW1vdmUgJiYgdGhpcy5nYW1lLnRpbWVyLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuVGltZXIgPSBUaW1lcjtcclxuXHJcblRpbnkuVGltZXJDcmVhdG9yID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIHRoaXMuYXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXV0b1JlbW92ZSA9IHRydWU7XHJcbn07XHJcblxyXG5UaW55LlRpbWVyQ3JlYXRvci5wcm90b3R5cGUgPSB7XHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAodG0pIHtcclxuICAgICAgICB2YXIgaW5kZXhPZiA9IHRoaXMubGlzdC5pbmRleE9mKHRtKTtcclxuICAgICAgICBpZiAoaW5kZXhPZiA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRtLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleE9mLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkOiBmdW5jdGlvbiAoZGVsYXksIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSkge1xyXG4gICAgICAgIGF1dG9zdGFydCA9IGF1dG9zdGFydCAhPSB1bmRlZmluZWQgPyBhdXRvc3RhcnQgOiB0aGlzLmF1dG9TdGFydDtcclxuICAgICAgICBhdXRvcmVtb3ZlID0gYXV0b3JlbW92ZSAhPSB1bmRlZmluZWQgPyBhdXRvcmVtb3ZlIDogdGhpcy5hdXRvUmVtb3ZlO1xyXG5cclxuICAgICAgICB2YXIgdGltZXIgPSBuZXcgVGltZXIoYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlLCB0aGlzLmdhbWUsIGNiLCBjdHgsIGRlbGF5KTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGxvb3A6IGZ1bmN0aW9uIChkZWxheSwgY2IsIGN0eCwgYXV0b3N0YXJ0LCBhdXRvcmVtb3ZlKSB7XHJcbiAgICAgICAgYXV0b3N0YXJ0ID0gYXV0b3N0YXJ0ICE9IHVuZGVmaW5lZCA/IGF1dG9zdGFydCA6IHRoaXMuYXV0b1N0YXJ0O1xyXG4gICAgICAgIGF1dG9yZW1vdmUgPSBhdXRvcmVtb3ZlICE9IHVuZGVmaW5lZCA/IGF1dG9yZW1vdmUgOiB0aGlzLmF1dG9SZW1vdmU7XHJcblxyXG4gICAgICAgIHZhciB0aW1lciA9IG5ldyBUaW1lcihhdXRvc3RhcnQsIGF1dG9yZW1vdmUsIHRoaXMuZ2FtZSwgY2IsIGN0eCwgZGVsYXksIHRydWUpO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gdGltZXI7XHJcbiAgICB9LFxyXG4gICAgcmVwZWF0OiBmdW5jdGlvbiAoZGVsYXksIG4sIGNiLCBjdHgsIGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgY29tcGxldGUpIHtcclxuICAgICAgICBhdXRvc3RhcnQgPSBhdXRvc3RhcnQgIT0gdW5kZWZpbmVkID8gYXV0b3N0YXJ0IDogdGhpcy5hdXRvU3RhcnQ7XHJcbiAgICAgICAgYXV0b3JlbW92ZSA9IGF1dG9yZW1vdmUgIT0gdW5kZWZpbmVkID8gYXV0b3JlbW92ZSA6IHRoaXMuYXV0b1JlbW92ZTtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IFRpbWVyKGF1dG9zdGFydCwgYXV0b3JlbW92ZSwgdGhpcy5nYW1lLCBjYiwgY3R4LCBkZWxheSwgZmFsc2UsIG4sIGNvbXBsZXRlKTtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyO1xyXG4gICAgfSxcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcInRpbWVyXCIsIFRpbnkuVGltZXJDcmVhdG9yKTtcclxuIiwiLy8gVGlueS5UZXh0dXJlQ2FjaGUgPSB7fTtcclxuLy8gVGlueS5GcmFtZUNhY2hlID0ge307XHJcblRpbnkuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3IgPSAwO1xyXG5UaW55LlRleHR1cmVTaWxlbnRGYWlsID0gZmFsc2U7XHJcblxyXG5UaW55LlRleHR1cmUgPSBmdW5jdGlvbiAoc291cmNlLCBmcmFtZSwgY3JvcCwgdHJpbSkge1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxO1xyXG5cclxuICAgIHRoaXMuaGFzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFmcmFtZSkge1xyXG4gICAgICAgIHRoaXMubm9GcmFtZSA9IHRydWU7XHJcbiAgICAgICAgZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoMCwgMCwgMSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBrZXkgPSBzb3VyY2U7XHJcblxyXG4gICAgICAgIHNvdXJjZSA9IFRpbnkuQ2FjaGUuaW1hZ2Vba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UpIHRocm93IG5ldyBFcnJvcihcIkNhY2hlIEVycm9yOiBpbWFnZSBcIiArIGtleSArIFwiIGRvZXNgdCBmb3VuZCBpbiBjYWNoZVwiKTtcclxuXHJcbiAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW2tleV0gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy50cmltID0gdHJpbTtcclxuXHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG5cclxuICAgIHRoaXMuY3JvcCA9IGNyb3AgfHwgbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG5cclxuICAgIGlmICgodGhpcy5zb3VyY2UuY29tcGxldGUgfHwgdGhpcy5zb3VyY2UuZ2V0Q29udGV4dCkgJiYgdGhpcy5zb3VyY2Uud2lkdGggJiYgdGhpcy5zb3VyY2UuaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5vblNvdXJjZUxvYWRlZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc291cmNlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUub25Tb3VyY2VMb2FkZWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGV4dHVyZTtcclxuXHJcblRpbnkuVGV4dHVyZS5wcm90b3R5cGUub25Tb3VyY2VMb2FkZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmhhc0xvYWRlZCA9IHRydWU7XHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy5zb3VyY2UubmF0dXJhbFdpZHRoIHx8IHRoaXMuc291cmNlLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLnNvdXJjZS5uYXR1cmFsSGVpZ2h0IHx8IHRoaXMuc291cmNlLmhlaWdodDtcclxuXHJcbiAgICBpZiAodGhpcy5ub0ZyYW1lKSB0aGlzLmZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLnNldEZyYW1lKHRoaXMuZnJhbWUpO1xyXG59O1xyXG5cclxuVGlueS5UZXh0dXJlLnByb3RvdHlwZS5hZGRUb0NhY2hlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgVGlueS5DYWNoZS50ZXh0dXJlW2tleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5rZXkpIHtcclxuICAgICAgICBkZWxldGUgVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMua2V5XTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XHJcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LlRleHR1cmUucHJvdG90eXBlLnNldEZyYW1lID0gZnVuY3Rpb24gKGZyYW1lKSB7XHJcbiAgICB0aGlzLm5vRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy52YWxpZCA9IGZyYW1lICYmIGZyYW1lLndpZHRoICYmIGZyYW1lLmhlaWdodCAmJiB0aGlzLnNvdXJjZSAmJiB0aGlzLmhhc0xvYWRlZDtcclxuXHJcbiAgICBpZiAoIXRoaXMudmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvLyB0aGlzLndpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICAvLyB0aGlzLmhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLmNyb3AueCA9IGZyYW1lLng7XHJcbiAgICB0aGlzLmNyb3AueSA9IGZyYW1lLnk7XHJcbiAgICB0aGlzLmNyb3Aud2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgIHRoaXMuY3JvcC5oZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLnRyaW0gJiYgKGZyYW1lLnggKyBmcmFtZS53aWR0aCA+IHRoaXMud2lkdGggfHwgZnJhbWUueSArIGZyYW1lLmhlaWdodCA+IHRoaXMuaGVpZ2h0KSkge1xyXG4gICAgICAgIGlmICghVGlueS5UZXh0dXJlU2lsZW50RmFpbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZXh0dXJlIEVycm9yOiBmcmFtZSBkb2VzIG5vdCBmaXQgaW5zaWRlIHRoZSBiYXNlIFRleHR1cmUgZGltZW5zaW9ucyBcIiArIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50cmltKSB7XHJcbiAgICAgICAgLy8gdGhpcy53aWR0aCA9IHRoaXMudHJpbS53aWR0aDtcclxuICAgICAgICAvLyB0aGlzLmhlaWdodCA9IHRoaXMudHJpbS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5mcmFtZS53aWR0aCA9IHRoaXMudHJpbS53aWR0aDtcclxuICAgICAgICB0aGlzLmZyYW1lLmhlaWdodCA9IHRoaXMudHJpbS5oZWlnaHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuZnJvbUltYWdlID0gZnVuY3Rpb24oa2V5LCBpbWFnZVVybCwgY3Jvc3NvcmlnaW4pXHJcbi8vIHtcclxuLy8gICAgIHZhciB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVba2V5XTtcclxuXHJcbi8vICAgICBpZighdGV4dHVyZSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShUaW55LkJhc2VUZXh0dXJlLmZyb21JbWFnZShrZXksIGltYWdlVXJsLCBjcm9zc29yaWdpbikpO1xyXG4vLyAgICAgICAgIHRleHR1cmUua2V5ID0ga2V5XHJcbi8vICAgICAgICAgVGlueS5UZXh0dXJlQ2FjaGVba2V5XSA9IHRleHR1cmU7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIHRleHR1cmU7XHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlRleHR1cmUuZnJvbUZyYW1lID0gZnVuY3Rpb24oZnJhbWVJZClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHRleHR1cmUgPSBUaW55LlRleHR1cmVDYWNoZVtmcmFtZUlkXTtcclxuLy8gICAgIGlmKCF0ZXh0dXJlKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmcmFtZUlkIFwiJyArIGZyYW1lSWQgKyAnXCIgZG9lcyBub3QgZXhpc3QgaW4gdGhlIHRleHR1cmUgY2FjaGUgJyk7XHJcbi8vICAgICByZXR1cm4gdGV4dHVyZTtcclxuLy8gfTtcclxuXHJcblRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzID0gZnVuY3Rpb24gKGNhbnZhcykge1xyXG4gICAgLy8gaWYoIWNhbnZhcy5fdGlueUlkKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGNhbnZhcy5fdGlueUlkID0gJ19mcm9tX2NhbnZhc18nICsgVGlueS5UZXh0dXJlQ2FjaGVJZEdlbmVyYXRvcisrO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHZhciB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2NhbnZhcy5fdGlueUlkXTtcclxuXHJcbiAgICAvLyBpZighdGV4dHVyZSlcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZSggY2FudmFzICk7XHJcbiAgICAvLyAgICAgVGlueS5DYWNoZS50ZXh0dXJlW2NhbnZhcy5fdGlueUlkXSA9IHRleHR1cmU7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcmV0dXJuIHRleHR1cmU7XHJcbiAgICByZXR1cm4gbmV3IFRpbnkuVGV4dHVyZShjYW52YXMpO1xyXG59O1xyXG5cclxuLy8gVGlueS5UZXh0dXJlLmFkZFRleHR1cmVUb0NhY2hlID0gZnVuY3Rpb24odGV4dHVyZSwgaWQpXHJcbi8vIHtcclxuLy8gICAgIFRpbnkuVGV4dHVyZUNhY2hlW2lkXSA9IHRleHR1cmU7XHJcbi8vIH07XHJcblxyXG4vLyBUaW55LlRleHR1cmUucmVtb3ZlVGV4dHVyZUZyb21DYWNoZSA9IGZ1bmN0aW9uKGlkKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuVGV4dHVyZUNhY2hlW2lkXTtcclxuLy8gICAgIGRlbGV0ZSBUaW55LlRleHR1cmVDYWNoZVtpZF07XHJcbi8vICAgICBkZWxldGUgVGlueS5CYXNlVGV4dHVyZUNhY2hlW2lkXTtcclxuLy8gICAgIHJldHVybiB0ZXh0dXJlO1xyXG4vLyB9O1xyXG4iLCJmdW5jdGlvbiBFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuYSA9IFtdO1xyXG4gICAgdGhpcy5uID0gMDtcclxufVxyXG5cclxuVGlueS5FdmVudEVtaXR0ZXIgPSB7XHJcbiAgICBjYWxsOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICBvYmogPSBvYmoucHJvdG90eXBlIHx8IG9iajtcclxuICAgICAgICAgICAgVGlueS5FdmVudEVtaXR0ZXIubWl4aW4ob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzX2V2ZW50cyA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBwdXNoTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNfZXZlbnRzW2V2ZW50XSA9IG5ldyBFdmVudExpc3RlbmVycygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0ZW5lcnMuYS5wdXNoKGZuLCBjb250ZXh0IHx8IG51bGwsIG9uY2UgfHwgZmFsc2UpO1xyXG4gICAgICAgICAgICBsaXN0ZW5lcnMubiArPSAzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2JqLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHB1c2hMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5vbiA9IHB1c2hMaXN0ZW5lcjtcclxuXHJcbiAgICAgICAgb2JqLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgZm4sIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbkFycmF5ID0gbGlzdGVuZXJzX2V2ZW50c1tldmVudF0uYTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZm4pIHtcclxuICAgICAgICAgICAgICAgIGZuQXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbkFycmF5Lmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuQXJyYXlbaV0gPT0gZm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5BcnJheS5zcGxpY2UoaSwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZuQXJyYXkubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpXSA9PSBmbiAmJiBmbkFycmF5W2kgKyAxXSA9PSBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuQXJyYXkuc3BsaWNlKGksIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZm5BcnJheS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGExLCBhMiwgYTMpIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmVyc19ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbkFycmF5ID0gbGlzdGVuZXJzLmE7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5uID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgZm4sIGN0eDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5BcnJheS5sZW5ndGggLSBsaXN0ZW5lcnMubjsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICBmbiA9IGZuQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICBjdHggPSBmbkFycmF5W2kgKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZm5BcnJheVtpICsgMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8PSAxKSBmbi5jYWxsKGN0eCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZW4gPT0gMikgZm4uY2FsbChjdHgsIGExKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxlbiA9PSAzKSBmbi5jYWxsKGN0eCwgYTEsIGEyKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgZm4uY2FsbChjdHgsIGExLCBhMiwgYTMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIChmbkFycmF5W2kgKyAyXSlcclxuICAgICAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBmbkFycmF5LnNwbGljZShpLCAzKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpIC09IDM7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbkFycmF5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbGlzdGVuZXJzX2V2ZW50c1tldmVudF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG4iLCJpZiAoIURhdGUubm93KSB7XHJcbiAgRGF0ZS5ub3cgPSBmdW5jdGlvbiBub3coKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgfTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBGbG9hdDMyQXJyYXkgPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gIHdpbmRvdy5GbG9hdDMyQXJyYXkgPSBBcnJheTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZShcIi4vYmFzZS5qc1wiKTtcclxuXHJcbnJlcXVpcmUoXCIuL3N5c3RlbXMvUkFGLmpzXCIpOyAvLyAyIEtiXHJcbi8vIHJlcXVpcmUoJy4vc3lzdGVtcy9PYmplY3RDcmVhdG9yLmpzJyk7IC8vIDEgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9Mb2FkZXIuanNcIik7IC8vIDMgS2JcclxucmVxdWlyZShcIi4vc3lzdGVtcy9JbnB1dC5qc1wiKTsgLy8gMSBLYlxyXG5yZXF1aXJlKFwiLi9zeXN0ZW1zL1RpbWVyLmpzXCIpOyAvLyAxIEtiXHJcblxyXG5yZXF1aXJlKFwiLi91dGlscy9FdmVudEVtaXR0ZXIuanNcIik7XHJcblxyXG5yZXF1aXJlKFwiLi90ZXh0dXJlcy9UZXh0dXJlLmpzXCIpOyAvLyA0IEtiXHJcblxyXG5yZXF1aXJlKFwiLi9vYmplY3RzL1Nwcml0ZS5qc1wiKTsgLy8gMyBLYlxyXG5yZXF1aXJlKFwiLi9vYmplY3RzL1RleHQuanNcIik7IC8vIDUgS2JcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9