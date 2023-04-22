/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/extra/math/Ellipse.js":
/*!***************************************!*\
  !*** ./plugins/extra/math/Ellipse.js ***!
  \***************************************/
/***/ (() => {

Tiny.Ellipse = function (x, y, width, height) {
    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    this.x = x || 0;
    this.y = y || 0;

    this.width = width || 0;
    this.height = height || 0;

    this.type = Tiny.Primitives.ELIP;
};

Tiny.Ellipse.prototype.constructor = Tiny.Ellipse;

Tiny.Graphics.prototype.drawEllipse = function (x, y, width, height) {
    this.drawShape(new Tiny.Ellipse(x, y, width, height));

    return this;
};


/***/ }),

/***/ "./plugins/extra/objects/ProgressBar.js":
/*!**********************************************!*\
  !*** ./plugins/extra/objects/ProgressBar.js ***!
  \**********************************************/
/***/ (() => {

var defaultOptions = {
    bgColor: "#ffffff",
    bgAlpha: 1,
    value: 1,
    width: 230,
    height: 30,
    radius: 15,
    colors: ["#ff0000", "#ffc322", "#08c013"],
    animated: true,
    duration: 1000,
    easing: Tiny.Easing.Cubic.InOut,
    strokeColor: "#e1e1e1",
    strokeWidth: 0,
    strokeAlpha: 1,
    resolution: 1
};

Tiny.ProgressBar = function (options) {
    options = options || {};

    for (var key in defaultOptions) {
        if (options[key] == undefined) options[key] = defaultOptions[key];
    }

    var graphics = new Tiny.Graphics();

    graphics.beginFill(options.bgColor, options.bgAlpha);
    graphics.drawRoundedRect(
        options.strokeWidth / 2,
        options.strokeWidth / 2,
        options.width,
        options.height,
        options.radius
    );
    graphics.endFill();

    if (options.strokeWidth) {
        graphics.lineStyle(options.strokeWidth, options.strokeColor, options.strokeAlpha);
        graphics.drawRoundedRect(
            0,
            0,
            options.width + options.strokeWidth,
            options.height + options.strokeWidth,
            options.radius + options.strokeWidth / 2
        );
    }

    Tiny.Sprite.call(this, graphics.generateTexture(options.resolution));

    this.anchor.set(0.5);

    this.game = options.game || this.game;
    this.animated = options.animated;
    this.duration = options.duration;
    this.easing = options.easing;
    this.value = options.value;
    this.originalWidth = options.width * options.resolution;
    this._tween = null;
    this._crop = new Tiny.Rectangle(
        0,
        0,
        options.width * options.resolution,
        options.height * options.resolution
    );
    this._sprites = [];

    for (var i = 0; i < options.colors.length; i++) {
        graphics.clear();
        graphics.beginFill(options.colors[i]);
        graphics.drawRoundedRect(0, 0, options.width, options.height, options.radius);
        graphics.endFill();

        var colorSprite = new Tiny.Sprite(graphics.generateTexture(options.resolution));
        colorSprite.anchor = this.anchor;
        // colorSprite.anchor.set(0.5);
        colorSprite.texture.crop = this._crop;
        this.add(colorSprite);
        this._sprites.push(colorSprite);
    }

    graphics.destroy();

    this._setValue(this.value);
};

Tiny.ProgressBar.prototype = Object.create(Tiny.Sprite.prototype);
Tiny.ProgressBar.prototype.constructor = Tiny.ProgressBar;

Tiny.ProgressBar.prototype._setValue = function (value) {

    value = Math.min(1, Math.max(0, value));

    if (value == this._value) return;

    this._value = value;

    this._crop.width = this.originalWidth * value;

    if (value == 0 || this._sprites.length === 1) return;
    if (value == 1) {
        this._sprites[this._sprites.length - 1].alpha = 1;
        return;
    }

    var step;
    if (this._sprites.length == 2) {
        this._sprites[1].alpha = value;
    } else if (this._sprites.length == 3) {
        step = 0.5;
        var lerp;

        if (value >= step) {
            lerp = 1 - (1 - value) / step;
            this._sprites[1].alpha = 1;
            this._sprites[2].alpha = lerp * lerp;
        } else if (value < step) {
            lerp = (1 - value - step) / step;
            this._sprites[1].alpha = 1 - lerp * lerp;
            this._sprites[2].alpha = 0;
        }
    } else {
        var mixes = this._sprites.length - 1;
        step = 1 / mixes;

        var index = Math.floor(value * mixes) + 1;
        var alpha = (value - step * (index - 1)) / step;

        for (var i = 0; i < this._sprites.length; i++) {
            this._sprites[i].alpha = 0;
        }

        this._sprites[index - 1].alpha = 1;
        this._sprites[index].alpha = alpha;
    }
};

Tiny.ProgressBar.prototype.setValue = function (value) {
    value = Math.min(1, Math.max(0, value));
    this.value = value;

    if (this.animated) {
        if (this._tween) this._tween.stop();

        var _self = this;

        var tmpObj = { value: _self._value };

        this._tween = this.game.tweens
            .add(tmpObj)
            .to({ value: value }, this.duration)
            .easing(this.easing)
            .onUpdate(function () {
                _self._setValue(tmpObj.value);
            })
            .start();
    } else {
        this._setValue(value);
    }
};

Tiny.ProgressBar.defaultOptions = defaultOptions;


/***/ }),

/***/ "./plugins/extra/objects/RenderLayer.js":
/*!**********************************************!*\
  !*** ./plugins/extra/objects/RenderLayer.js ***!
  \**********************************************/
/***/ (() => {

Tiny.RenderLayer = function () {
    Tiny.Object2D.call(this);
};

Tiny.RenderLayer.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.RenderLayer.prototype.constructor = Tiny.RenderLayer;

var noop = function () {};

Tiny.RenderLayer.prototype.addChildAt = function (child, index) {
    if (index >= 0 && index <= this.children.length) {

        child._RenderLayer_render = child.render;
        child.render = noop;

        this.children.splice(index, 0, child);

        return child;
    } else {
        throw new Error(
            child + "addChildAt: The index " + index + " supplied is out of bounds " + this.children.length
        );
    }
};

Tiny.RenderLayer.prototype.removeChildAt = function (index) {
    var child = this.getChildAt(index);
    this.children.splice(index, 1);

    child.render = child._RenderLayer_render;
    child._RenderLayer_render = null;

    return child;
};

Tiny.RenderLayer.prototype.updateTransform = function () {}


Tiny.RenderLayer.prototype.render = function (renderSession) {
    if (this.visible === false || this.alpha === 0) return;

    if (this._cacheAsBitmap) {
        this._renderCachedSprite(renderSession);
        return;
    }

    if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    for (var i = 0; i < this.children.length; i++) {
        this.children[i]._RenderLayer_render(renderSession);
    }

    if (this._mask) {
        renderSession.maskManager.popMask(renderSession);
    }
};


/***/ }),

/***/ "./plugins/extra/objects/TilingSprite.js":
/*!***********************************************!*\
  !*** ./plugins/extra/objects/TilingSprite.js ***!
  \***********************************************/
/***/ (() => {

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
Tiny.TilingSprite = function (texture, key, width, height) {
    Tiny.Sprite.call(this, texture, key);

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
    this.tileScale = new Tiny.Point(1, 1);

    /**
     * A point that represents the scale of the texture object
     *
     * @property tileScaleOffset
     * @type Point
     */
    this.tileScaleOffset = new Tiny.Point(1, 1);

    /**
     * The offset position of the image that is being tiled
     *
     * @property tilePosition
     * @type Point
     */
    this.tilePosition = new Tiny.Point(0, 0);
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
Object.defineProperty(Tiny.TilingSprite.prototype, "width", {
    get: function () {
        return this._width;
    },
    set: function (value) {
        this._width = value;
    }
});

/**
 * The height of the TilingSprite, setting this will actually modify the scale to achieve the value set
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Tiny.TilingSprite.prototype, "height", {
    get: function () {
        return this._height;
    },
    set: function (value) {
        this._height = value;
    }
});

Tiny.TilingSprite.prototype.setTexture = function (texture, key) {
    var updated = Tiny.Sprite.prototype.setTexture.call(this, texture, key);

    this.refreshTexture = updated;
};

Tiny.TilingSprite.prototype.render = function (renderSession) {
    if (this.visible === false || this.alpha === 0) return;

    var context = renderSession.context;

    if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    context.globalAlpha = this.worldAlpha;

    var transform = this.worldTransform;

    var resolution = renderSession.resolution;

    context.setTransform(
        transform.a * resolution,
        transform.b * resolution,
        transform.c * resolution,
        transform.d * resolution,
        transform.tx * resolution,
        transform.ty * resolution
    );

    if (!this.__tilePattern || this.refreshTexture) {
        this.generateTilingTexture(false);

        if (this.tilingTexture) {
            this.__tilePattern = context.createPattern(this.tilingTexture.source, "repeat");
        } else {
            return;
        }
    }

    // check blend mode
    if (this.blendMode !== renderSession.currentBlendMode) {
        renderSession.currentBlendMode = this.blendMode;
        context.globalCompositeOperation = renderSession.currentBlendMode;
    }

    var tilePosition = this.tilePosition;
    var tileScale = this.tileScale;

    tilePosition.x %= this.tilingTexture.width;
    tilePosition.y %= this.tilingTexture.height;

    // offset - make sure to account for the anchor point..
    context.scale(tileScale.x, tileScale.y);
    context.translate(
        tilePosition.x + this.anchor.x * -this._width,
        tilePosition.y + this.anchor.y * -this._height
    );

    context.fillStyle = this.__tilePattern;

    context.fillRect(-tilePosition.x, -tilePosition.y, this._width / tileScale.x, this._height / tileScale.y);

    context.scale(1 / tileScale.x, 1 / tileScale.y);
    context.translate(
        -tilePosition.x + this.anchor.x * this._width,
        -tilePosition.y + this.anchor.y * this._height
    );

    if (this._mask) {
        renderSession.maskManager.popMask(renderSession);
    }

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].render(renderSession);
    }
};

/**
 * Returns the framing rectangle of the sprite as a Tiny.Rectangle object
 *
 * @method getBounds
 * @return {Rectangle} the framing rectangle
 */
Tiny.TilingSprite.prototype.getBounds = function () {
    var width = this._width;
    var height = this._height;

    var w0 = width * (1 - this.anchor.x);
    var w1 = width * -this.anchor.x;

    var h0 = height * (1 - this.anchor.y);
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

    var x4 = a * w1 + c * h0 + tx;
    var y4 = d * h0 + b * w1 + ty;

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
Tiny.TilingSprite.prototype.generateTilingTexture = function (forcePowerOfTwo) {
    if (!this.texture.hasLoaded) return;

    var texture = this.texture;
    var frame = texture.frame;
    var targetWidth, targetHeight;

    //  Check that the frame is the same size as the base texture.
    // var isFrame = frame.width !== texture.width || frame.height !== texture.height;

    // var newTextureRequired = false;

    if (!forcePowerOfTwo) {
        // if (texture.crop) // commented becasue it always present
        // {
        targetWidth = texture.crop.width;
        targetHeight = texture.crop.height;
        // }
        // else
        // {
        //     targetWidth = frame.width;
        //     targetHeight = frame.height;
        // }

        // newTextureRequired = true;
    } else {
        // if (texture.crop) // commented becasue it always present
        // {
        targetWidth = Tiny.getNextPowerOfTwo(texture.crop.width);
        targetHeight = Tiny.getNextPowerOfTwo(texture.crop.height);
        // }
        // else
        // {
        //     targetWidth = Tiny.getNextPowerOfTwo(frame.width);
        //     targetHeight = Tiny.getNextPowerOfTwo(frame.height);
        // }

        // newTextureRequired = true;

        //  If the BaseTexture dimensions don't match the texture frame then we need a new texture anyway because it's part of a texture atlas
        // if (frame.width !== targetWidth || frame.height !== targetHeight || texture.width !== targetWidth || texture.height || targetHeight) newTextureRequired = true;
    }

    // if (newTextureRequired)
    // {
    var canvasBuffer;

    if (this.tilingTexture && this.tilingTexture.isTiling) {
        canvasBuffer = this.tilingTexture.canvasBuffer;
        canvasBuffer.resize(targetWidth, targetHeight);
        this.tilingTexture.width = targetWidth;
        this.tilingTexture.height = targetHeight;
        this.tilingTexture.needsUpdate = true;
    } else {
        canvasBuffer = new Tiny.CanvasBuffer(targetWidth, targetHeight);

        this.tilingTexture = Tiny.Texture.fromCanvas(canvasBuffer.canvas);
        this.tilingTexture.canvasBuffer = canvasBuffer;
        this.tilingTexture.isTiling = true;
    }

    canvasBuffer.context.drawImage(
        texture.source,
        texture.crop.x,
        texture.crop.y,
        texture.crop.width,
        texture.crop.height,
        0,
        0,
        targetWidth,
        targetHeight
    );

    this.tileScaleOffset.x = frame.width / targetWidth;
    this.tileScaleOffset.y = frame.height / targetHeight;
    // }

    this.refreshTexture = false;
};

Tiny.TilingSprite.prototype.destroy = function () {
    Tiny.Sprite.prototype.destroy.call(this);

    this.tileScale = null;
    this.tileScaleOffset = null;
    this.tilePosition = null;

    if (this.tilingTexture) {
        this.tilingTexture.destroy(true);
        this.tilingTexture = null;
    }
};


/***/ }),

/***/ "./plugins/extra/systems/Loader.js":
/*!*****************************************!*\
  !*** ./plugins/extra/systems/Loader.js ***!
  \*****************************************/
/***/ (() => {

Tiny.Cache.font = {};

Tiny.Loader.prototype.font = function (key, src, weight) {
    this.list.push({
        key: key,
        src: src,
        weight: weight,
        type: "font"
    });
};

Tiny.Loader.font = function (resource, cb) {

    var weight = resource.weight || 'normal';
    var key = resource.key + '-' + weight;

    if (Tiny.Cache.font[key]) return cb();

    var font = new FontFace(resource.key, 'url(' + resource.src + ')', { weight: weight });
    font.load().then(
        function () {
            document.fonts.add(font);
            Tiny.Cache.font[key] = font;
            cb();
        },
        function () {
            console.error(err);
        }
    );
};

/***/ }),

/***/ "./plugins/extra/systems/Tween.js":
/*!****************************************!*\
  !*** ./plugins/extra/systems/Tween.js ***!
  \****************************************/
/***/ (() => {

Tiny.TweenManager.prototype.removeByObject = function (obj) {
    var tweens = this.group._tweens;
    var tweenIds = Object.keys(tweens);

    for (var i = 0; i < tweenIds.length; i++) {
        var tween = tweens[tweenIds[i]];

        if (tween._object === obj) this.remove(tween);
    }
};


/***/ }),

/***/ "./plugins/extra/textures/Texture.js":
/*!*******************************************!*\
  !*** ./plugins/extra/textures/Texture.js ***!
  \*******************************************/
/***/ (() => {

Tiny.Texture.EMPTY = new Tiny.Texture({}, new Tiny.Rectangle(), new Tiny.Rectangle());

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
/*!********************************!*\
  !*** ./plugins/extra/index.js ***!
  \********************************/
__webpack_require__(/*! ./systems/Tween */ "./plugins/extra/systems/Tween.js");
__webpack_require__(/*! ./systems/Loader */ "./plugins/extra/systems/Loader.js");
__webpack_require__(/*! ./math/Ellipse */ "./plugins/extra/math/Ellipse.js");
__webpack_require__(/*! ./objects/TilingSprite */ "./plugins/extra/objects/TilingSprite.js");
__webpack_require__(/*! ./objects/RenderLayer */ "./plugins/extra/objects/RenderLayer.js");
__webpack_require__(/*! ./objects/ProgressBar */ "./plugins/extra/objects/ProgressBar.js");
// require('./objects/Button');
__webpack_require__(/*! ./textures/Texture */ "./plugins/extra/textures/Texture.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9leHRyYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUIsaUJBQWlCLFNBQVM7QUFDMUIsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsZ0JBQWdCO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQSx3Q0FBd0M7Ozs7OztVQ0F4QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsbUJBQU8sQ0FBQyx5REFBaUI7QUFDekIsbUJBQU8sQ0FBQywyREFBa0I7QUFDMUIsbUJBQU8sQ0FBQyx1REFBZ0I7QUFDeEIsbUJBQU8sQ0FBQyx1RUFBd0I7QUFDaEMsbUJBQU8sQ0FBQyxxRUFBdUI7QUFDL0IsbUJBQU8sQ0FBQyxxRUFBdUI7QUFDL0I7QUFDQSxtQkFBTyxDQUFDLCtEQUFvQiIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvbWF0aC9FbGxpcHNlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvb2JqZWN0cy9Qcm9ncmVzc0Jhci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2V4dHJhL29iamVjdHMvUmVuZGVyTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9leHRyYS9vYmplY3RzL1RpbGluZ1Nwcml0ZS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2V4dHJhL3N5c3RlbXMvTG9hZGVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvc3lzdGVtcy9Ud2Vlbi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2V4dHJhL3RleHR1cmVzL1RleHR1cmUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiVGlueS5FbGxpcHNlID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgd2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgMDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuRUxJUDtcclxufTtcclxuXHJcblRpbnkuRWxsaXBzZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkVsbGlwc2U7XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3RWxsaXBzZSA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5FbGxpcHNlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuIiwidmFyIGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgYmdDb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICBiZ0FscGhhOiAxLFxyXG4gICAgdmFsdWU6IDEsXHJcbiAgICB3aWR0aDogMjMwLFxyXG4gICAgaGVpZ2h0OiAzMCxcclxuICAgIHJhZGl1czogMTUsXHJcbiAgICBjb2xvcnM6IFtcIiNmZjAwMDBcIiwgXCIjZmZjMzIyXCIsIFwiIzA4YzAxM1wiXSxcclxuICAgIGFuaW1hdGVkOiB0cnVlLFxyXG4gICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICBlYXNpbmc6IFRpbnkuRWFzaW5nLkN1YmljLkluT3V0LFxyXG4gICAgc3Ryb2tlQ29sb3I6IFwiI2UxZTFlMVwiLFxyXG4gICAgc3Ryb2tlV2lkdGg6IDAsXHJcbiAgICBzdHJva2VBbHBoYTogMSxcclxuICAgIHJlc29sdXRpb246IDFcclxufTtcclxuXHJcblRpbnkuUHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgZm9yICh2YXIga2V5IGluIGRlZmF1bHRPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnNba2V5XSA9PSB1bmRlZmluZWQpIG9wdGlvbnNba2V5XSA9IGRlZmF1bHRPcHRpb25zW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGdyYXBoaWNzID0gbmV3IFRpbnkuR3JhcGhpY3MoKTtcclxuXHJcbiAgICBncmFwaGljcy5iZWdpbkZpbGwob3B0aW9ucy5iZ0NvbG9yLCBvcHRpb25zLmJnQWxwaGEpO1xyXG4gICAgZ3JhcGhpY3MuZHJhd1JvdW5kZWRSZWN0KFxyXG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlV2lkdGggLyAyLFxyXG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlV2lkdGggLyAyLFxyXG4gICAgICAgIG9wdGlvbnMud2lkdGgsXHJcbiAgICAgICAgb3B0aW9ucy5oZWlnaHQsXHJcbiAgICAgICAgb3B0aW9ucy5yYWRpdXNcclxuICAgICk7XHJcbiAgICBncmFwaGljcy5lbmRGaWxsKCk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuc3Ryb2tlV2lkdGgpIHtcclxuICAgICAgICBncmFwaGljcy5saW5lU3R5bGUob3B0aW9ucy5zdHJva2VXaWR0aCwgb3B0aW9ucy5zdHJva2VDb2xvciwgb3B0aW9ucy5zdHJva2VBbHBoYSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZHJhd1JvdW5kZWRSZWN0KFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBvcHRpb25zLndpZHRoICsgb3B0aW9ucy5zdHJva2VXaWR0aCxcclxuICAgICAgICAgICAgb3B0aW9ucy5oZWlnaHQgKyBvcHRpb25zLnN0cm9rZVdpZHRoLFxyXG4gICAgICAgICAgICBvcHRpb25zLnJhZGl1cyArIG9wdGlvbnMuc3Ryb2tlV2lkdGggLyAyXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIGdyYXBoaWNzLmdlbmVyYXRlVGV4dHVyZShvcHRpb25zLnJlc29sdXRpb24pKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvci5zZXQoMC41KTtcclxuXHJcbiAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWUgfHwgdGhpcy5nYW1lO1xyXG4gICAgdGhpcy5hbmltYXRlZCA9IG9wdGlvbnMuYW5pbWF0ZWQ7XHJcbiAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcclxuICAgIHRoaXMuZWFzaW5nID0gb3B0aW9ucy5lYXNpbmc7XHJcbiAgICB0aGlzLnZhbHVlID0gb3B0aW9ucy52YWx1ZTtcclxuICAgIHRoaXMub3JpZ2luYWxXaWR0aCA9IG9wdGlvbnMud2lkdGggKiBvcHRpb25zLnJlc29sdXRpb247XHJcbiAgICB0aGlzLl90d2VlbiA9IG51bGw7XHJcbiAgICB0aGlzLl9jcm9wID0gbmV3IFRpbnkuUmVjdGFuZ2xlKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBvcHRpb25zLndpZHRoICogb3B0aW9ucy5yZXNvbHV0aW9uLFxyXG4gICAgICAgIG9wdGlvbnMuaGVpZ2h0ICogb3B0aW9ucy5yZXNvbHV0aW9uXHJcbiAgICApO1xyXG4gICAgdGhpcy5fc3ByaXRlcyA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5jb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIGdyYXBoaWNzLmJlZ2luRmlsbChvcHRpb25zLmNvbG9yc1tpXSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIG9wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0LCBvcHRpb25zLnJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xyXG5cclxuICAgICAgICB2YXIgY29sb3JTcHJpdGUgPSBuZXcgVGlueS5TcHJpdGUoZ3JhcGhpY3MuZ2VuZXJhdGVUZXh0dXJlKG9wdGlvbnMucmVzb2x1dGlvbikpO1xyXG4gICAgICAgIGNvbG9yU3ByaXRlLmFuY2hvciA9IHRoaXMuYW5jaG9yO1xyXG4gICAgICAgIC8vIGNvbG9yU3ByaXRlLmFuY2hvci5zZXQoMC41KTtcclxuICAgICAgICBjb2xvclNwcml0ZS50ZXh0dXJlLmNyb3AgPSB0aGlzLl9jcm9wO1xyXG4gICAgICAgIHRoaXMuYWRkKGNvbG9yU3ByaXRlKTtcclxuICAgICAgICB0aGlzLl9zcHJpdGVzLnB1c2goY29sb3JTcHJpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdyYXBoaWNzLmRlc3Ryb3koKTtcclxuXHJcbiAgICB0aGlzLl9zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxufTtcclxuXHJcblRpbnkuUHJvZ3Jlc3NCYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlNwcml0ZS5wcm90b3R5cGUpO1xyXG5UaW55LlByb2dyZXNzQmFyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUHJvZ3Jlc3NCYXI7XHJcblxyXG5UaW55LlByb2dyZXNzQmFyLnByb3RvdHlwZS5fc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICB2YWx1ZSA9IE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHZhbHVlKSk7XHJcblxyXG4gICAgaWYgKHZhbHVlID09IHRoaXMuX3ZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICB0aGlzLl9jcm9wLndpZHRoID0gdGhpcy5vcmlnaW5hbFdpZHRoICogdmFsdWU7XHJcblxyXG4gICAgaWYgKHZhbHVlID09IDAgfHwgdGhpcy5fc3ByaXRlcy5sZW5ndGggPT09IDEpIHJldHVybjtcclxuICAgIGlmICh2YWx1ZSA9PSAxKSB7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlc1t0aGlzLl9zcHJpdGVzLmxlbmd0aCAtIDFdLmFscGhhID0gMTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0ZXA7XHJcbiAgICBpZiAodGhpcy5fc3ByaXRlcy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZXNbMV0uYWxwaGEgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fc3ByaXRlcy5sZW5ndGggPT0gMykge1xyXG4gICAgICAgIHN0ZXAgPSAwLjU7XHJcbiAgICAgICAgdmFyIGxlcnA7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+PSBzdGVwKSB7XHJcbiAgICAgICAgICAgIGxlcnAgPSAxIC0gKDEgLSB2YWx1ZSkgLyBzdGVwO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGVzWzFdLmFscGhhID0gMTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlc1syXS5hbHBoYSA9IGxlcnAgKiBsZXJwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCBzdGVwKSB7XHJcbiAgICAgICAgICAgIGxlcnAgPSAoMSAtIHZhbHVlIC0gc3RlcCkgLyBzdGVwO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGVzWzFdLmFscGhhID0gMSAtIGxlcnAgKiBsZXJwO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGVzWzJdLmFscGhhID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtaXhlcyA9IHRoaXMuX3Nwcml0ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICBzdGVwID0gMSAvIG1peGVzO1xyXG5cclxuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKHZhbHVlICogbWl4ZXMpICsgMTtcclxuICAgICAgICB2YXIgYWxwaGEgPSAodmFsdWUgLSBzdGVwICogKGluZGV4IC0gMSkpIC8gc3RlcDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZXNbaV0uYWxwaGEgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3ByaXRlc1tpbmRleCAtIDFdLmFscGhhID0gMTtcclxuICAgICAgICB0aGlzLl9zcHJpdGVzW2luZGV4XS5hbHBoYSA9IGFscGhhO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5Qcm9ncmVzc0Jhci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIHZhbHVlID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgdmFsdWUpKTtcclxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5hbmltYXRlZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90d2VlbikgdGhpcy5fdHdlZW4uc3RvcCgpO1xyXG5cclxuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgdG1wT2JqID0geyB2YWx1ZTogX3NlbGYuX3ZhbHVlIH07XHJcblxyXG4gICAgICAgIHRoaXMuX3R3ZWVuID0gdGhpcy5nYW1lLnR3ZWVuc1xyXG4gICAgICAgICAgICAuYWRkKHRtcE9iailcclxuICAgICAgICAgICAgLnRvKHsgdmFsdWU6IHZhbHVlIH0sIHRoaXMuZHVyYXRpb24pXHJcbiAgICAgICAgICAgIC5lYXNpbmcodGhpcy5lYXNpbmcpXHJcbiAgICAgICAgICAgIC5vblVwZGF0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5fc2V0VmFsdWUodG1wT2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3NldFZhbHVlKHZhbHVlKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUHJvZ3Jlc3NCYXIuZGVmYXVsdE9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucztcclxuIiwiVGlueS5SZW5kZXJMYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyTGF5ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55Lk9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuUmVuZGVyTGF5ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5SZW5kZXJMYXllcjtcclxuXHJcbnZhciBub29wID0gZnVuY3Rpb24gKCkge307XHJcblxyXG5UaW55LlJlbmRlckxheWVyLnByb3RvdHlwZS5hZGRDaGlsZEF0ID0gZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xyXG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPD0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgY2hpbGQuX1JlbmRlckxheWVyX3JlbmRlciA9IGNoaWxkLnJlbmRlcjtcclxuICAgICAgICBjaGlsZC5yZW5kZXIgPSBub29wO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgY2hpbGQgKyBcImFkZENoaWxkQXQ6IFRoZSBpbmRleCBcIiArIGluZGV4ICsgXCIgc3VwcGxpZWQgaXMgb3V0IG9mIGJvdW5kcyBcIiArIHRoaXMuY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUmVuZGVyTGF5ZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIHZhciBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRBdChpbmRleCk7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgY2hpbGQucmVuZGVyID0gY2hpbGQuX1JlbmRlckxheWVyX3JlbmRlcjtcclxuICAgIGNoaWxkLl9SZW5kZXJMYXllcl9yZW5kZXIgPSBudWxsO1xyXG5cclxuICAgIHJldHVybiBjaGlsZDtcclxufTtcclxuXHJcblRpbnkuUmVuZGVyTGF5ZXIucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHt9XHJcblxyXG5cclxuVGlueS5SZW5kZXJMYXllci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcCkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNhY2hlZFNwcml0ZShyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0uX1JlbmRlckxheWVyX3JlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTtcclxuIiwiLyoqXHJcbiAqIEBhdXRob3IgTWF0IEdyb3ZlcyBodHRwOi8vbWF0Z3JvdmVzLmNvbS9cclxuICovXHJcblxyXG4vKipcclxuICogQSB0aWxpbmcgc3ByaXRlIGlzIGEgZmFzdCB3YXkgb2YgcmVuZGVyaW5nIGEgdGlsaW5nIGltYWdlXHJcbiAqXHJcbiAqIEBjbGFzcyBUaWxpbmdTcHJpdGVcclxuICogQGV4dGVuZHMgU3ByaXRlXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0gdGV4dHVyZSB7VGV4dHVyZX0gdGhlIHRleHR1cmUgb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICogQHBhcmFtIHdpZHRoIHtOdW1iZXJ9ICB0aGUgd2lkdGggb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICogQHBhcmFtIGhlaWdodCB7TnVtYmVyfSB0aGUgaGVpZ2h0IG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqL1xyXG5UaW55LlRpbGluZ1Nwcml0ZSA9IGZ1bmN0aW9uICh0ZXh0dXJlLCBrZXksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIFRpbnkuU3ByaXRlLmNhbGwodGhpcywgdGV4dHVyZSwga2V5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB3aXRoIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHdpZHRoXHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aCB8fCAxMDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IGhlaWdodFxyXG4gICAgICogQHR5cGUgTnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodCB8fCAxMDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2NhbGluZyBvZiB0aGUgaW1hZ2UgdGhhdCBpcyBiZWluZyB0aWxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB0aWxlU2NhbGVcclxuICAgICAqIEB0eXBlIFBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGlsZVNjYWxlID0gbmV3IFRpbnkuUG9pbnQoMSwgMSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHBvaW50IHRoYXQgcmVwcmVzZW50cyB0aGUgc2NhbGUgb2YgdGhlIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVTY2FsZU9mZnNldFxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQgPSBuZXcgVGlueS5Qb2ludCgxLCAxKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvZmZzZXQgcG9zaXRpb24gb2YgdGhlIGltYWdlIHRoYXQgaXMgYmVpbmcgdGlsZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgdGlsZVBvc2l0aW9uXHJcbiAgICAgKiBAdHlwZSBQb2ludFxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpbGVQb3NpdGlvbiA9IG5ldyBUaW55LlBvaW50KDAsIDApO1xyXG59O1xyXG5cclxuLy8gY29uc3RydWN0b3JcclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlNwcml0ZS5wcm90b3R5cGUpO1xyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlRpbGluZ1Nwcml0ZTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgd2lkdGggb2YgdGhlIHNwcml0ZSwgc2V0dGluZyB0aGlzIHdpbGwgYWN0dWFsbHkgbW9kaWZ5IHRoZSBzY2FsZSB0byBhY2hpZXZlIHRoZSB2YWx1ZSBzZXRcclxuICpcclxuICogQHByb3BlcnR5IHdpZHRoXHJcbiAqIEB0eXBlIE51bWJlclxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgaGVpZ2h0IG9mIHRoZSBUaWxpbmdTcHJpdGUsIHNldHRpbmcgdGhpcyB3aWxsIGFjdHVhbGx5IG1vZGlmeSB0aGUgc2NhbGUgdG8gYWNoaWV2ZSB0aGUgdmFsdWUgc2V0XHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSBoZWlnaHRcclxuICogQHR5cGUgTnVtYmVyXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSwga2V5KSB7XHJcbiAgICB2YXIgdXBkYXRlZCA9IFRpbnkuU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlLmNhbGwodGhpcywgdGV4dHVyZSwga2V5KTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2hUZXh0dXJlID0gdXBkYXRlZDtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gcmVuZGVyU2Vzc2lvbi5jb250ZXh0O1xyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciByZXNvbHV0aW9uID0gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uO1xyXG5cclxuICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgIHRyYW5zZm9ybS5hICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLmMgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS5kICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS50eSAqIHJlc29sdXRpb25cclxuICAgICk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9fdGlsZVBhdHRlcm4gfHwgdGhpcy5yZWZyZXNoVGV4dHVyZSkge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVUaWxpbmdUZXh0dXJlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9fdGlsZVBhdHRlcm4gPSBjb250ZXh0LmNyZWF0ZVBhdHRlcm4odGhpcy50aWxpbmdUZXh0dXJlLnNvdXJjZSwgXCJyZXBlYXRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBibGVuZCBtb2RlXHJcbiAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSkge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0aWxlUG9zaXRpb24gPSB0aGlzLnRpbGVQb3NpdGlvbjtcclxuICAgIHZhciB0aWxlU2NhbGUgPSB0aGlzLnRpbGVTY2FsZTtcclxuXHJcbiAgICB0aWxlUG9zaXRpb24ueCAlPSB0aGlzLnRpbGluZ1RleHR1cmUud2lkdGg7XHJcbiAgICB0aWxlUG9zaXRpb24ueSAlPSB0aGlzLnRpbGluZ1RleHR1cmUuaGVpZ2h0O1xyXG5cclxuICAgIC8vIG9mZnNldCAtIG1ha2Ugc3VyZSB0byBhY2NvdW50IGZvciB0aGUgYW5jaG9yIHBvaW50Li5cclxuICAgIGNvbnRleHQuc2NhbGUodGlsZVNjYWxlLngsIHRpbGVTY2FsZS55KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKFxyXG4gICAgICAgIHRpbGVQb3NpdGlvbi54ICsgdGhpcy5hbmNob3IueCAqIC10aGlzLl93aWR0aCxcclxuICAgICAgICB0aWxlUG9zaXRpb24ueSArIHRoaXMuYW5jaG9yLnkgKiAtdGhpcy5faGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fX3RpbGVQYXR0ZXJuO1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFJlY3QoLXRpbGVQb3NpdGlvbi54LCAtdGlsZVBvc2l0aW9uLnksIHRoaXMuX3dpZHRoIC8gdGlsZVNjYWxlLngsIHRoaXMuX2hlaWdodCAvIHRpbGVTY2FsZS55KTtcclxuXHJcbiAgICBjb250ZXh0LnNjYWxlKDEgLyB0aWxlU2NhbGUueCwgMSAvIHRpbGVTY2FsZS55KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKFxyXG4gICAgICAgIC10aWxlUG9zaXRpb24ueCArIHRoaXMuYW5jaG9yLnggKiB0aGlzLl93aWR0aCxcclxuICAgICAgICAtdGlsZVBvc2l0aW9uLnkgKyB0aGlzLmFuY2hvci55ICogdGhpcy5faGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGZyYW1pbmcgcmVjdGFuZ2xlIG9mIHRoZSBzcHJpdGUgYXMgYSBUaW55LlJlY3RhbmdsZSBvYmplY3RcclxuICpcclxuICogQG1ldGhvZCBnZXRCb3VuZHNcclxuICogQHJldHVybiB7UmVjdGFuZ2xlfSB0aGUgZnJhbWluZyByZWN0YW5nbGVcclxuICovXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgd2lkdGggPSB0aGlzLl93aWR0aDtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XHJcblxyXG4gICAgdmFyIHcwID0gd2lkdGggKiAoMSAtIHRoaXMuYW5jaG9yLngpO1xyXG4gICAgdmFyIHcxID0gd2lkdGggKiAtdGhpcy5hbmNob3IueDtcclxuXHJcbiAgICB2YXIgaDAgPSBoZWlnaHQgKiAoMSAtIHRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG5cclxuICAgIHZhciB4MSA9IGEgKiB3MSArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICB2YXIgeTIgPSBkICogaDEgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgIHZhciB4NCA9IGEgKiB3MSArIGMgKiBoMCArIHR4O1xyXG4gICAgdmFyIHk0ID0gZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICBtaW5YID0geDEgPCBtaW5YID8geDEgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgIG1pblkgPSB5MSA8IG1pblkgPyB5MSA6IG1pblk7XHJcbiAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgbWF4WCA9IHgxID4gbWF4WCA/IHgxIDogbWF4WDtcclxuICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICBtYXhZID0geTEgPiBtYXhZID8geTEgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG4vKipcclxuICogV2hlbiB0aGUgdGV4dHVyZSBpcyB1cGRhdGVkLCB0aGlzIGV2ZW50IHdpbGwgZmlyZSB0byB1cGRhdGUgdGhlIHNjYWxlIGFuZCBmcmFtZVxyXG4gKlxyXG4gKiBAbWV0aG9kIG9uVGV4dHVyZVVwZGF0ZVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICogQHByaXZhdGVcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogQG1ldGhvZCBnZW5lcmF0ZVRpbGluZ1RleHR1cmVcclxuICpcclxuICogQHBhcmFtIGZvcmNlUG93ZXJPZlR3byB7Qm9vbGVhbn0gV2hldGhlciB3ZSB3YW50IHRvIGZvcmNlIHRoZSB0ZXh0dXJlIHRvIGJlIGEgcG93ZXIgb2YgdHdvXHJcbiAqL1xyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuZ2VuZXJhdGVUaWxpbmdUZXh0dXJlID0gZnVuY3Rpb24gKGZvcmNlUG93ZXJPZlR3bykge1xyXG4gICAgaWYgKCF0aGlzLnRleHR1cmUuaGFzTG9hZGVkKSByZXR1cm47XHJcblxyXG4gICAgdmFyIHRleHR1cmUgPSB0aGlzLnRleHR1cmU7XHJcbiAgICB2YXIgZnJhbWUgPSB0ZXh0dXJlLmZyYW1lO1xyXG4gICAgdmFyIHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQ7XHJcblxyXG4gICAgLy8gIENoZWNrIHRoYXQgdGhlIGZyYW1lIGlzIHRoZSBzYW1lIHNpemUgYXMgdGhlIGJhc2UgdGV4dHVyZS5cclxuICAgIC8vIHZhciBpc0ZyYW1lID0gZnJhbWUud2lkdGggIT09IHRleHR1cmUud2lkdGggfHwgZnJhbWUuaGVpZ2h0ICE9PSB0ZXh0dXJlLmhlaWdodDtcclxuXHJcbiAgICAvLyB2YXIgbmV3VGV4dHVyZVJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFmb3JjZVBvd2VyT2ZUd28pIHtcclxuICAgICAgICAvLyBpZiAodGV4dHVyZS5jcm9wKSAvLyBjb21tZW50ZWQgYmVjYXN1ZSBpdCBhbHdheXMgcHJlc2VudFxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICB0YXJnZXRXaWR0aCA9IHRleHR1cmUuY3JvcC53aWR0aDtcclxuICAgICAgICB0YXJnZXRIZWlnaHQgPSB0ZXh0dXJlLmNyb3AuaGVpZ2h0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRXaWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRIZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBpZiAodGV4dHVyZS5jcm9wKSAvLyBjb21tZW50ZWQgYmVjYXN1ZSBpdCBhbHdheXMgcHJlc2VudFxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICB0YXJnZXRXaWR0aCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28odGV4dHVyZS5jcm9wLndpZHRoKTtcclxuICAgICAgICB0YXJnZXRIZWlnaHQgPSBUaW55LmdldE5leHRQb3dlck9mVHdvKHRleHR1cmUuY3JvcC5oZWlnaHQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRXaWR0aCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28oZnJhbWUud2lkdGgpO1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRIZWlnaHQgPSBUaW55LmdldE5leHRQb3dlck9mVHdvKGZyYW1lLmhlaWdodCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIEJhc2VUZXh0dXJlIGRpbWVuc2lvbnMgZG9uJ3QgbWF0Y2ggdGhlIHRleHR1cmUgZnJhbWUgdGhlbiB3ZSBuZWVkIGEgbmV3IHRleHR1cmUgYW55d2F5IGJlY2F1c2UgaXQncyBwYXJ0IG9mIGEgdGV4dHVyZSBhdGxhc1xyXG4gICAgICAgIC8vIGlmIChmcmFtZS53aWR0aCAhPT0gdGFyZ2V0V2lkdGggfHwgZnJhbWUuaGVpZ2h0ICE9PSB0YXJnZXRIZWlnaHQgfHwgdGV4dHVyZS53aWR0aCAhPT0gdGFyZ2V0V2lkdGggfHwgdGV4dHVyZS5oZWlnaHQgfHwgdGFyZ2V0SGVpZ2h0KSBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIChuZXdUZXh0dXJlUmVxdWlyZWQpXHJcbiAgICAvLyB7XHJcbiAgICB2YXIgY2FudmFzQnVmZmVyO1xyXG5cclxuICAgIGlmICh0aGlzLnRpbGluZ1RleHR1cmUgJiYgdGhpcy50aWxpbmdUZXh0dXJlLmlzVGlsaW5nKSB7XHJcbiAgICAgICAgY2FudmFzQnVmZmVyID0gdGhpcy50aWxpbmdUZXh0dXJlLmNhbnZhc0J1ZmZlcjtcclxuICAgICAgICBjYW52YXNCdWZmZXIucmVzaXplKHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS53aWR0aCA9IHRhcmdldFdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5oZWlnaHQgPSB0YXJnZXRIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUgPSBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXNCdWZmZXIuY2FudmFzKTtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUuY2FudmFzQnVmZmVyID0gY2FudmFzQnVmZmVyO1xyXG4gICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5pc1RpbGluZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2FudmFzQnVmZmVyLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgIHRleHR1cmUuc291cmNlLFxyXG4gICAgICAgIHRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgIHRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgIHRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICB0ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0YXJnZXRXaWR0aCxcclxuICAgICAgICB0YXJnZXRIZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQueCA9IGZyYW1lLndpZHRoIC8gdGFyZ2V0V2lkdGg7XHJcbiAgICB0aGlzLnRpbGVTY2FsZU9mZnNldC55ID0gZnJhbWUuaGVpZ2h0IC8gdGFyZ2V0SGVpZ2h0O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHRoaXMucmVmcmVzaFRleHR1cmUgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnRpbGVTY2FsZSA9IG51bGw7XHJcbiAgICB0aGlzLnRpbGVTY2FsZU9mZnNldCA9IG51bGw7XHJcbiAgICB0aGlzLnRpbGVQb3NpdGlvbiA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSkge1xyXG4gICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5kZXN0cm95KHRydWUpO1xyXG4gICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZSA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcbiIsIlRpbnkuQ2FjaGUuZm9udCA9IHt9O1xyXG5cclxuVGlueS5Mb2FkZXIucHJvdG90eXBlLmZvbnQgPSBmdW5jdGlvbiAoa2V5LCBzcmMsIHdlaWdodCkge1xyXG4gICAgdGhpcy5saXN0LnB1c2goe1xyXG4gICAgICAgIGtleToga2V5LFxyXG4gICAgICAgIHNyYzogc3JjLFxyXG4gICAgICAgIHdlaWdodDogd2VpZ2h0LFxyXG4gICAgICAgIHR5cGU6IFwiZm9udFwiXHJcbiAgICB9KTtcclxufTtcclxuXHJcblRpbnkuTG9hZGVyLmZvbnQgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGNiKSB7XHJcblxyXG4gICAgdmFyIHdlaWdodCA9IHJlc291cmNlLndlaWdodCB8fCAnbm9ybWFsJztcclxuICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXkgKyAnLScgKyB3ZWlnaHQ7XHJcblxyXG4gICAgaWYgKFRpbnkuQ2FjaGUuZm9udFtrZXldKSByZXR1cm4gY2IoKTtcclxuXHJcbiAgICB2YXIgZm9udCA9IG5ldyBGb250RmFjZShyZXNvdXJjZS5rZXksICd1cmwoJyArIHJlc291cmNlLnNyYyArICcpJywgeyB3ZWlnaHQ6IHdlaWdodCB9KTtcclxuICAgIGZvbnQubG9hZCgpLnRoZW4oXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5mb250cy5hZGQoZm9udCk7XHJcbiAgICAgICAgICAgIFRpbnkuQ2FjaGUuZm9udFtrZXldID0gZm9udDtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn07IiwiVGlueS5Ud2Vlbk1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUJ5T2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgdmFyIHR3ZWVucyA9IHRoaXMuZ3JvdXAuX3R3ZWVucztcclxuICAgIHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHR3ZWVucyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0d2VlbiA9IHR3ZWVuc1t0d2Vlbklkc1tpXV07XHJcblxyXG4gICAgICAgIGlmICh0d2Vlbi5fb2JqZWN0ID09PSBvYmopIHRoaXMucmVtb3ZlKHR3ZWVuKTtcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5UZXh0dXJlLkVNUFRZID0gbmV3IFRpbnkuVGV4dHVyZSh7fSwgbmV3IFRpbnkuUmVjdGFuZ2xlKCksIG5ldyBUaW55LlJlY3RhbmdsZSgpKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZSgnLi9zeXN0ZW1zL1R3ZWVuJyk7XHJcbnJlcXVpcmUoJy4vc3lzdGVtcy9Mb2FkZXInKTtcclxucmVxdWlyZSgnLi9tYXRoL0VsbGlwc2UnKTtcclxucmVxdWlyZSgnLi9vYmplY3RzL1RpbGluZ1Nwcml0ZScpO1xyXG5yZXF1aXJlKCcuL29iamVjdHMvUmVuZGVyTGF5ZXInKTtcclxucmVxdWlyZSgnLi9vYmplY3RzL1Byb2dyZXNzQmFyJyk7XHJcbi8vIHJlcXVpcmUoJy4vb2JqZWN0cy9CdXR0b24nKTtcclxucmVxdWlyZSgnLi90ZXh0dXJlcy9UZXh0dXJlJyk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==