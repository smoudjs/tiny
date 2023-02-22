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

/***/ "./plugins/extra/objects/Button.js":
/*!*****************************************!*\
  !*** ./plugins/extra/objects/Button.js ***!
  \*****************************************/
/***/ (() => {

Tiny.Button = function(input, params) {

    var options;

    if (typeof params === "string") {
        options = {
            label: params,
            width: 160,
            height: 40
        }
    }
    else {
        options = params;
        options.width = options.width || 160;
        options.height = options.height || 40;
    }

    var bg = new Tiny.Graphics();
    bg.beginFill("#4e63df");
    bg.drawRoundedRect(0, 0, options.width, options.height, 10);
    bg.endFill();
    bg.lineStyle(5, "#3e4fb2", 1);
    bg.drawRoundedRect(0, 0, options.width, options.height, 10);

    Tiny.Sprite.call(this, bg.generateTexture());

    var label = this.label = new Tiny.Text(options.label, {
        fill: "#ffffff",
        font: "300 13pt Arial",
        align: "center"
    });
    label.y = 2;
    label.anchor.set(0.5);
    this.add(label);

    this.anchor.set(0.5);

    input.add(this);

    input.on("move", function(e) {
        var bounds = this.getBounds();
        if (bounds.contains(e.x, e.y)) this.tint = "#a1a1a1"
        else this.tint = "#ffffff"
    } , this)

    this.input.on("down", function(e) {
        this.scale.set(0.95);
    }, this)

    this.input.on("up", function(e) {
        this.scale.set(1.05);
    }, this)
};

Tiny.Button.prototype = Object.create(Tiny.Sprite.prototype);
Tiny.Button.prototype.constructor = Tiny.Button;

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

    if (value == undefined) value = this._value;

    if (value == this._value) return;

    this._value = value;

    this._crop.width = this.originalWidth * value;

    if (value == 0 || this._sprites.length === 1) return;
    if (value == 1) {
        this._sprites[this._sprites.length - 1].alpha = 1;
        return;
    }

    if (this._sprites.length == 2) {
        this._sprites[1].alpha = value;
    } else if (this._sprites.length == 3) {
        var step = 0.5;
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
        var step = 1 / mixes;

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
__webpack_require__(/*! ./math/Ellipse */ "./plugins/extra/math/Ellipse.js");
__webpack_require__(/*! ./objects/TilingSprite */ "./plugins/extra/objects/TilingSprite.js");
__webpack_require__(/*! ./objects/RenderLayer */ "./plugins/extra/objects/RenderLayer.js");
__webpack_require__(/*! ./objects/ProgressBar */ "./plugins/extra/objects/ProgressBar.js");
__webpack_require__(/*! ./objects/Button */ "./plugins/extra/objects/Button.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9leHRyYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCLGlCQUFpQixTQUFTO0FBQzFCLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDVEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLG1CQUFPLENBQUMseURBQWlCO0FBQ3pCLG1CQUFPLENBQUMsdURBQWdCO0FBQ3hCLG1CQUFPLENBQUMsdUVBQXdCO0FBQ2hDLG1CQUFPLENBQUMscUVBQXVCO0FBQy9CLG1CQUFPLENBQUMscUVBQXVCO0FBQy9CLG1CQUFPLENBQUMsMkRBQWtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9leHRyYS9tYXRoL0VsbGlwc2UuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9leHRyYS9vYmplY3RzL0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2V4dHJhL29iamVjdHMvUHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9leHRyYS9vYmplY3RzL1JlbmRlckxheWVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvb2JqZWN0cy9UaWxpbmdTcHJpdGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9leHRyYS9zeXN0ZW1zL1R3ZWVuLmpzIiwid2VicGFjazovL2g1dGlueS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2V4dHJhL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlRpbnkuRWxsaXBzZSA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB4ID0geCB8fCAwO1xyXG4gICAgeSA9IHkgfHwgMDtcclxuICAgIHdpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIGhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG5cclxuICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgIHRoaXMueSA9IHkgfHwgMDtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcblxyXG4gICAgdGhpcy50eXBlID0gVGlueS5QcmltaXRpdmVzLkVMSVA7XHJcbn07XHJcblxyXG5UaW55LkVsbGlwc2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5FbGxpcHNlO1xyXG5cclxuVGlueS5HcmFwaGljcy5wcm90b3R5cGUuZHJhd0VsbGlwc2UgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuRWxsaXBzZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbiIsIlRpbnkuQnV0dG9uID0gZnVuY3Rpb24oaW5wdXQsIHBhcmFtcykge1xyXG5cclxuICAgIHZhciBvcHRpb25zO1xyXG5cclxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgbGFiZWw6IHBhcmFtcyxcclxuICAgICAgICAgICAgd2lkdGg6IDE2MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgPSBwYXJhbXM7XHJcbiAgICAgICAgb3B0aW9ucy53aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgMTYwO1xyXG4gICAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNDA7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJnID0gbmV3IFRpbnkuR3JhcGhpY3MoKTtcclxuICAgIGJnLmJlZ2luRmlsbChcIiM0ZTYzZGZcIik7XHJcbiAgICBiZy5kcmF3Um91bmRlZFJlY3QoMCwgMCwgb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHQsIDEwKTtcclxuICAgIGJnLmVuZEZpbGwoKTtcclxuICAgIGJnLmxpbmVTdHlsZSg1LCBcIiMzZTRmYjJcIiwgMSk7XHJcbiAgICBiZy5kcmF3Um91bmRlZFJlY3QoMCwgMCwgb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHQsIDEwKTtcclxuXHJcbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIGJnLmdlbmVyYXRlVGV4dHVyZSgpKTtcclxuXHJcbiAgICB2YXIgbGFiZWwgPSB0aGlzLmxhYmVsID0gbmV3IFRpbnkuVGV4dChvcHRpb25zLmxhYmVsLCB7XHJcbiAgICAgICAgZmlsbDogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgZm9udDogXCIzMDAgMTNwdCBBcmlhbFwiLFxyXG4gICAgICAgIGFsaWduOiBcImNlbnRlclwiXHJcbiAgICB9KTtcclxuICAgIGxhYmVsLnkgPSAyO1xyXG4gICAgbGFiZWwuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgdGhpcy5hZGQobGFiZWwpO1xyXG5cclxuICAgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xyXG5cclxuICAgIGlucHV0LmFkZCh0aGlzKTtcclxuXHJcbiAgICBpbnB1dC5vbihcIm1vdmVcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xyXG4gICAgICAgIGlmIChib3VuZHMuY29udGFpbnMoZS54LCBlLnkpKSB0aGlzLnRpbnQgPSBcIiNhMWExYTFcIlxyXG4gICAgICAgIGVsc2UgdGhpcy50aW50ID0gXCIjZmZmZmZmXCJcclxuICAgIH0gLCB0aGlzKVxyXG5cclxuICAgIHRoaXMuaW5wdXQub24oXCJkb3duXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnNldCgwLjk1KTtcclxuICAgIH0sIHRoaXMpXHJcblxyXG4gICAgdGhpcy5pbnB1dC5vbihcInVwXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnNldCgxLjA1KTtcclxuICAgIH0sIHRoaXMpXHJcbn07XHJcblxyXG5UaW55LkJ1dHRvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuU3ByaXRlLnByb3RvdHlwZSk7XHJcblRpbnkuQnV0dG9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuQnV0dG9uOyIsInZhciBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgIGJnQ29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgYmdBbHBoYTogMSxcclxuICAgIHZhbHVlOiAxLFxyXG4gICAgd2lkdGg6IDIzMCxcclxuICAgIGhlaWdodDogMzAsXHJcbiAgICByYWRpdXM6IDE1LFxyXG4gICAgY29sb3JzOiBbXCIjZmYwMDAwXCIsIFwiI2ZmYzMyMlwiLCBcIiMwOGMwMTNcIl0sXHJcbiAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgZWFzaW5nOiBUaW55LkVhc2luZy5DdWJpYy5Jbk91dCxcclxuICAgIHN0cm9rZUNvbG9yOiBcIiNlMWUxZTFcIixcclxuICAgIHN0cm9rZVdpZHRoOiAwLFxyXG4gICAgc3Ryb2tlQWxwaGE6IDEsXHJcbiAgICByZXNvbHV0aW9uOiAxXHJcbn07XHJcblxyXG5UaW55LlByb2dyZXNzQmFyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIGZvciAodmFyIGtleSBpbiBkZWZhdWx0T3B0aW9ucykge1xyXG4gICAgICAgIGlmIChvcHRpb25zW2tleV0gPT0gdW5kZWZpbmVkKSBvcHRpb25zW2tleV0gPSBkZWZhdWx0T3B0aW9uc1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBncmFwaGljcyA9IG5ldyBUaW55LkdyYXBoaWNzKCk7XHJcblxyXG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKG9wdGlvbnMuYmdDb2xvciwgb3B0aW9ucy5iZ0FscGhhKTtcclxuICAgIGdyYXBoaWNzLmRyYXdSb3VuZGVkUmVjdChcclxuICAgICAgICBvcHRpb25zLnN0cm9rZVdpZHRoIC8gMixcclxuICAgICAgICBvcHRpb25zLnN0cm9rZVdpZHRoIC8gMixcclxuICAgICAgICBvcHRpb25zLndpZHRoLFxyXG4gICAgICAgIG9wdGlvbnMuaGVpZ2h0LFxyXG4gICAgICAgIG9wdGlvbnMucmFkaXVzXHJcbiAgICApO1xyXG4gICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnN0cm9rZVdpZHRoKSB7XHJcbiAgICAgICAgZ3JhcGhpY3MubGluZVN0eWxlKG9wdGlvbnMuc3Ryb2tlV2lkdGgsIG9wdGlvbnMuc3Ryb2tlQ29sb3IsIG9wdGlvbnMuc3Ryb2tlQWxwaGEpO1xyXG4gICAgICAgIGdyYXBoaWNzLmRyYXdSb3VuZGVkUmVjdChcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgb3B0aW9ucy53aWR0aCArIG9wdGlvbnMuc3Ryb2tlV2lkdGgsXHJcbiAgICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0ICsgb3B0aW9ucy5zdHJva2VXaWR0aCxcclxuICAgICAgICAgICAgb3B0aW9ucy5yYWRpdXMgKyBvcHRpb25zLnN0cm9rZVdpZHRoIC8gMlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgVGlueS5TcHJpdGUuY2FsbCh0aGlzLCBncmFwaGljcy5nZW5lcmF0ZVRleHR1cmUob3B0aW9ucy5yZXNvbHV0aW9uKSk7XHJcblxyXG4gICAgdGhpcy5hbmNob3Iuc2V0KDAuNSk7XHJcblxyXG4gICAgdGhpcy5nYW1lID0gb3B0aW9ucy5nYW1lIHx8IHRoaXMuZ2FtZTtcclxuICAgIHRoaXMuYW5pbWF0ZWQgPSBvcHRpb25zLmFuaW1hdGVkO1xyXG4gICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XHJcbiAgICB0aGlzLmVhc2luZyA9IG9wdGlvbnMuZWFzaW5nO1xyXG4gICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWU7XHJcbiAgICB0aGlzLm9yaWdpbmFsV2lkdGggPSBvcHRpb25zLndpZHRoICogb3B0aW9ucy5yZXNvbHV0aW9uO1xyXG4gICAgdGhpcy5fdHdlZW4gPSBudWxsO1xyXG4gICAgdGhpcy5fY3JvcCA9IG5ldyBUaW55LlJlY3RhbmdsZShcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgb3B0aW9ucy53aWR0aCAqIG9wdGlvbnMucmVzb2x1dGlvbixcclxuICAgICAgICBvcHRpb25zLmhlaWdodCAqIG9wdGlvbnMucmVzb2x1dGlvblxyXG4gICAgKTtcclxuICAgIHRoaXMuX3Nwcml0ZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMuY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICBncmFwaGljcy5iZWdpbkZpbGwob3B0aW9ucy5jb2xvcnNbaV0pO1xyXG4gICAgICAgIGdyYXBoaWNzLmRyYXdSb3VuZGVkUmVjdCgwLCAwLCBvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodCwgb3B0aW9ucy5yYWRpdXMpO1xyXG4gICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcclxuXHJcbiAgICAgICAgdmFyIGNvbG9yU3ByaXRlID0gbmV3IFRpbnkuU3ByaXRlKGdyYXBoaWNzLmdlbmVyYXRlVGV4dHVyZShvcHRpb25zLnJlc29sdXRpb24pKTtcclxuICAgICAgICBjb2xvclNwcml0ZS5hbmNob3IgPSB0aGlzLmFuY2hvcjtcclxuICAgICAgICAvLyBjb2xvclNwcml0ZS5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgY29sb3JTcHJpdGUudGV4dHVyZS5jcm9wID0gdGhpcy5fY3JvcDtcclxuICAgICAgICB0aGlzLmFkZChjb2xvclNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlcy5wdXNoKGNvbG9yU3ByaXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBncmFwaGljcy5kZXN0cm95KCk7XHJcblxyXG4gICAgdGhpcy5fc2V0VmFsdWUodGhpcy52YWx1ZSk7XHJcbn07XHJcblxyXG5UaW55LlByb2dyZXNzQmFyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5TcHJpdGUucHJvdG90eXBlKTtcclxuVGlueS5Qcm9ncmVzc0Jhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlByb2dyZXNzQmFyO1xyXG5cclxuVGlueS5Qcm9ncmVzc0Jhci5wcm90b3R5cGUuX3NldFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICB2YWx1ZSA9IE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHZhbHVlKSk7XHJcblxyXG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuXHJcbiAgICBpZiAodmFsdWUgPT0gdGhpcy5fdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuX2Nyb3Aud2lkdGggPSB0aGlzLm9yaWdpbmFsV2lkdGggKiB2YWx1ZTtcclxuXHJcbiAgICBpZiAodmFsdWUgPT0gMCB8fCB0aGlzLl9zcHJpdGVzLmxlbmd0aCA9PT0gMSkgcmV0dXJuO1xyXG4gICAgaWYgKHZhbHVlID09IDEpIHtcclxuICAgICAgICB0aGlzLl9zcHJpdGVzW3RoaXMuX3Nwcml0ZXMubGVuZ3RoIC0gMV0uYWxwaGEgPSAxO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fc3ByaXRlcy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZXNbMV0uYWxwaGEgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fc3ByaXRlcy5sZW5ndGggPT0gMykge1xyXG4gICAgICAgIHZhciBzdGVwID0gMC41O1xyXG4gICAgICAgIHZhciBsZXJwO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPj0gc3RlcCkge1xyXG4gICAgICAgICAgICBsZXJwID0gMSAtICgxIC0gdmFsdWUpIC8gc3RlcDtcclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlc1sxXS5hbHBoYSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZXNbMl0uYWxwaGEgPSBsZXJwICogbGVycDtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgc3RlcCkge1xyXG4gICAgICAgICAgICBsZXJwID0gKDEgLSB2YWx1ZSAtIHN0ZXApIC8gc3RlcDtcclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlc1sxXS5hbHBoYSA9IDEgLSBsZXJwICogbGVycDtcclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlc1syXS5hbHBoYSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbWl4ZXMgPSB0aGlzLl9zcHJpdGVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdmFyIHN0ZXAgPSAxIC8gbWl4ZXM7XHJcblxyXG4gICAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IodmFsdWUgKiBtaXhlcykgKyAxO1xyXG4gICAgICAgIHZhciBhbHBoYSA9ICh2YWx1ZSAtIHN0ZXAgKiAoaW5kZXggLSAxKSkgLyBzdGVwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Nwcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlc1tpXS5hbHBoYSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zcHJpdGVzW2luZGV4IC0gMV0uYWxwaGEgPSAxO1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZXNbaW5kZXhdLmFscGhhID0gYWxwaGE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlByb2dyZXNzQmFyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgdmFsdWUgPSBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCB2YWx1ZSkpO1xyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgIGlmICh0aGlzLmFuaW1hdGVkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R3ZWVuKSB0aGlzLl90d2Vlbi5zdG9wKCk7XHJcblxyXG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciB0bXBPYmogPSB7IHZhbHVlOiBfc2VsZi5fdmFsdWUgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHdlZW4gPSB0aGlzLmdhbWUudHdlZW5zXHJcbiAgICAgICAgICAgIC5hZGQodG1wT2JqKVxyXG4gICAgICAgICAgICAudG8oeyB2YWx1ZTogdmFsdWUgfSwgdGhpcy5kdXJhdGlvbilcclxuICAgICAgICAgICAgLmVhc2luZyh0aGlzLmVhc2luZylcclxuICAgICAgICAgICAgLm9uVXBkYXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLl9zZXRWYWx1ZSh0bXBPYmoudmFsdWUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5Qcm9ncmVzc0Jhci5kZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xyXG4iLCJUaW55LlJlbmRlckxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgVGlueS5PYmplY3QyRC5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJMYXllci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuT2JqZWN0MkQucHJvdG90eXBlKTtcclxuVGlueS5SZW5kZXJMYXllci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlJlbmRlckxheWVyO1xyXG5cclxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcblRpbnkuUmVuZGVyTGF5ZXIucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xyXG5cclxuICAgICAgICBjaGlsZC5fUmVuZGVyTGF5ZXJfcmVuZGVyID0gY2hpbGQucmVuZGVyO1xyXG4gICAgICAgIGNoaWxkLnJlbmRlciA9IG5vb3A7XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBjaGlsZCArIFwiYWRkQ2hpbGRBdDogVGhlIGluZGV4IFwiICsgaW5kZXggKyBcIiBzdXBwbGllZCBpcyBvdXQgb2YgYm91bmRzIFwiICsgdGhpcy5jaGlsZHJlbi5sZW5ndGhcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5SZW5kZXJMYXllci5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgdmFyIGNoaWxkID0gdGhpcy5nZXRDaGlsZEF0KGluZGV4KTtcclxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICBjaGlsZC5yZW5kZXIgPSBjaGlsZC5fUmVuZGVyTGF5ZXJfcmVuZGVyO1xyXG4gICAgY2hpbGQuX1JlbmRlckxheWVyX3JlbmRlciA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGNoaWxkO1xyXG59O1xyXG5cclxuVGlueS5SZW5kZXJMYXllci5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge31cclxuXHJcblxyXG5UaW55LlJlbmRlckxheWVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyQ2FjaGVkU3ByaXRlKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5fUmVuZGVyTGF5ZXJfcmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG4iLCIvKipcclxuICogQGF1dGhvciBNYXQgR3JvdmVzIGh0dHA6Ly9tYXRncm92ZXMuY29tL1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHRpbGluZyBzcHJpdGUgaXMgYSBmYXN0IHdheSBvZiByZW5kZXJpbmcgYSB0aWxpbmcgaW1hZ2VcclxuICpcclxuICogQGNsYXNzIFRpbGluZ1Nwcml0ZVxyXG4gKiBAZXh0ZW5kcyBTcHJpdGVcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB0ZXh0dXJlIHtUZXh0dXJlfSB0aGUgdGV4dHVyZSBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gKiBAcGFyYW0gd2lkdGgge051bWJlcn0gIHRoZSB3aWR0aCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gKiBAcGFyYW0gaGVpZ2h0IHtOdW1iZXJ9IHRoZSBoZWlnaHQgb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICovXHJcblRpbnkuVGlsaW5nU3ByaXRlID0gZnVuY3Rpb24gKHRleHR1cmUsIGtleSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgVGlueS5TcHJpdGUuY2FsbCh0aGlzLCB0ZXh0dXJlLCBrZXkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHdpdGggb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgd2lkdGhcclxuICAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoIHx8IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoZWlnaHQgb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzY2FsaW5nIG9mIHRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHRpbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVTY2FsZVxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBuZXcgVGlueS5Qb2ludCgxLCAxKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgcG9pbnQgdGhhdCByZXByZXNlbnRzIHRoZSBzY2FsZSBvZiB0aGUgdGV4dHVyZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgdGlsZVNjYWxlT2Zmc2V0XHJcbiAgICAgKiBAdHlwZSBQb2ludFxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpbGVTY2FsZU9mZnNldCA9IG5ldyBUaW55LlBvaW50KDEsIDEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG9mZnNldCBwb3NpdGlvbiBvZiB0aGUgaW1hZ2UgdGhhdCBpcyBiZWluZyB0aWxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB0aWxlUG9zaXRpb25cclxuICAgICAqIEB0eXBlIFBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGlsZVBvc2l0aW9uID0gbmV3IFRpbnkuUG9pbnQoMCwgMCk7XHJcbn07XHJcblxyXG4vLyBjb25zdHJ1Y3RvclxyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuU3ByaXRlLnByb3RvdHlwZSk7XHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuVGlsaW5nU3ByaXRlO1xyXG5cclxuLyoqXHJcbiAqIFRoZSB3aWR0aCBvZiB0aGUgc3ByaXRlLCBzZXR0aW5nIHRoaXMgd2lsbCBhY3R1YWxseSBtb2RpZnkgdGhlIHNjYWxlIHRvIGFjaGlldmUgdGhlIHZhbHVlIHNldFxyXG4gKlxyXG4gKiBAcHJvcGVydHkgd2lkdGhcclxuICogQHR5cGUgTnVtYmVyXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBoZWlnaHQgb2YgdGhlIFRpbGluZ1Nwcml0ZSwgc2V0dGluZyB0aGlzIHdpbGwgYWN0dWFsbHkgbW9kaWZ5IHRoZSBzY2FsZSB0byBhY2hpZXZlIHRoZSB2YWx1ZSBzZXRcclxuICpcclxuICogQHByb3BlcnR5IGhlaWdodFxyXG4gKiBAdHlwZSBOdW1iZXJcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uICh0ZXh0dXJlLCBrZXkpIHtcclxuICAgIHZhciB1cGRhdGVkID0gVGlueS5TcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmUuY2FsbCh0aGlzLCB0ZXh0dXJlLCBrZXkpO1xyXG5cclxuICAgIHRoaXMucmVmcmVzaFRleHR1cmUgPSB1cGRhdGVkO1xyXG59O1xyXG5cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgdmFyIGNvbnRleHQgPSByZW5kZXJTZXNzaW9uLmNvbnRleHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIHJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgdHJhbnNmb3JtLmEgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS5iICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLmQgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS50eCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvblxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX190aWxlUGF0dGVybiB8fCB0aGlzLnJlZnJlc2hUZXh0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVRpbGluZ1RleHR1cmUoZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aWxpbmdUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX190aWxlUGF0dGVybiA9IGNvbnRleHQuY3JlYXRlUGF0dGVybih0aGlzLnRpbGluZ1RleHR1cmUuc291cmNlLCBcInJlcGVhdFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGJsZW5kIG1vZGVcclxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSAhPT0gcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRpbGVQb3NpdGlvbiA9IHRoaXMudGlsZVBvc2l0aW9uO1xyXG4gICAgdmFyIHRpbGVTY2FsZSA9IHRoaXMudGlsZVNjYWxlO1xyXG5cclxuICAgIHRpbGVQb3NpdGlvbi54ICU9IHRoaXMudGlsaW5nVGV4dHVyZS53aWR0aDtcclxuICAgIHRpbGVQb3NpdGlvbi55ICU9IHRoaXMudGlsaW5nVGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgLy8gb2Zmc2V0IC0gbWFrZSBzdXJlIHRvIGFjY291bnQgZm9yIHRoZSBhbmNob3IgcG9pbnQuLlxyXG4gICAgY29udGV4dC5zY2FsZSh0aWxlU2NhbGUueCwgdGlsZVNjYWxlLnkpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUoXHJcbiAgICAgICAgdGlsZVBvc2l0aW9uLnggKyB0aGlzLmFuY2hvci54ICogLXRoaXMuX3dpZHRoLFxyXG4gICAgICAgIHRpbGVQb3NpdGlvbi55ICsgdGhpcy5hbmNob3IueSAqIC10aGlzLl9oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9fdGlsZVBhdHRlcm47XHJcblxyXG4gICAgY29udGV4dC5maWxsUmVjdCgtdGlsZVBvc2l0aW9uLngsIC10aWxlUG9zaXRpb24ueSwgdGhpcy5fd2lkdGggLyB0aWxlU2NhbGUueCwgdGhpcy5faGVpZ2h0IC8gdGlsZVNjYWxlLnkpO1xyXG5cclxuICAgIGNvbnRleHQuc2NhbGUoMSAvIHRpbGVTY2FsZS54LCAxIC8gdGlsZVNjYWxlLnkpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUoXHJcbiAgICAgICAgLXRpbGVQb3NpdGlvbi54ICsgdGhpcy5hbmNob3IueCAqIHRoaXMuX3dpZHRoLFxyXG4gICAgICAgIC10aWxlUG9zaXRpb24ueSArIHRoaXMuYW5jaG9yLnkgKiB0aGlzLl9oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZnJhbWluZyByZWN0YW5nbGUgb2YgdGhlIHNwcml0ZSBhcyBhIFRpbnkuUmVjdGFuZ2xlIG9iamVjdFxyXG4gKlxyXG4gKiBAbWV0aG9kIGdldEJvdW5kc1xyXG4gKiBAcmV0dXJuIHtSZWN0YW5nbGV9IHRoZSBmcmFtaW5nIHJlY3RhbmdsZVxyXG4gKi9cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB3aWR0aCA9IHRoaXMuX3dpZHRoO1xyXG4gICAgdmFyIGhlaWdodCA9IHRoaXMuX2hlaWdodDtcclxuXHJcbiAgICB2YXIgdzAgPSB3aWR0aCAqICgxIC0gdGhpcy5hbmNob3IueCk7XHJcbiAgICB2YXIgdzEgPSB3aWR0aCAqIC10aGlzLmFuY2hvci54O1xyXG5cclxuICAgIHZhciBoMCA9IGhlaWdodCAqICgxIC0gdGhpcy5hbmNob3IueSk7XHJcbiAgICB2YXIgaDEgPSBoZWlnaHQgKiAtdGhpcy5hbmNob3IueTtcclxuXHJcbiAgICB2YXIgd29ybGRUcmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciBhID0gd29ybGRUcmFuc2Zvcm0uYTtcclxuICAgIHZhciBiID0gd29ybGRUcmFuc2Zvcm0uYjtcclxuICAgIHZhciBjID0gd29ybGRUcmFuc2Zvcm0uYztcclxuICAgIHZhciBkID0gd29ybGRUcmFuc2Zvcm0uZDtcclxuICAgIHZhciB0eCA9IHdvcmxkVHJhbnNmb3JtLnR4O1xyXG4gICAgdmFyIHR5ID0gd29ybGRUcmFuc2Zvcm0udHk7XHJcblxyXG4gICAgdmFyIHgxID0gYSAqIHcxICsgYyAqIGgxICsgdHg7XHJcbiAgICB2YXIgeTEgPSBkICogaDEgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICB2YXIgeDIgPSBhICogdzAgKyBjICogaDEgKyB0eDtcclxuICAgIHZhciB5MiA9IGQgKiBoMSArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgIHZhciB4MyA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xyXG4gICAgdmFyIHkzID0gZCAqIGgwICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgdmFyIHg0ID0gYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTQgPSBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIG1pblggPSB4MSA8IG1pblggPyB4MSA6IG1pblg7XHJcbiAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgbWluWSA9IHkxIDwgbWluWSA/IHkxIDogbWluWTtcclxuICAgIG1pblkgPSB5MiA8IG1pblkgPyB5MiA6IG1pblk7XHJcbiAgICBtaW5ZID0geTMgPCBtaW5ZID8geTMgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICBtYXhYID0geDEgPiBtYXhYID8geDEgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHgyID4gbWF4WCA/IHgyIDogbWF4WDtcclxuICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICBtYXhYID0geDQgPiBtYXhYID8geDQgOiBtYXhYO1xyXG5cclxuICAgIG1heFkgPSB5MSA+IG1heFkgPyB5MSA6IG1heFk7XHJcbiAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuXHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGVuIHRoZSB0ZXh0dXJlIGlzIHVwZGF0ZWQsIHRoaXMgZXZlbnQgd2lsbCBmaXJlIHRvIHVwZGF0ZSB0aGUgc2NhbGUgYW5kIGZyYW1lXHJcbiAqXHJcbiAqIEBtZXRob2Qgb25UZXh0dXJlVXBkYXRlXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAbWV0aG9kIGdlbmVyYXRlVGlsaW5nVGV4dHVyZVxyXG4gKlxyXG4gKiBAcGFyYW0gZm9yY2VQb3dlck9mVHdvIHtCb29sZWFufSBXaGV0aGVyIHdlIHdhbnQgdG8gZm9yY2UgdGhlIHRleHR1cmUgdG8gYmUgYSBwb3dlciBvZiB0d29cclxuICovXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5nZW5lcmF0ZVRpbGluZ1RleHR1cmUgPSBmdW5jdGlvbiAoZm9yY2VQb3dlck9mVHdvKSB7XHJcbiAgICBpZiAoIXRoaXMudGV4dHVyZS5oYXNMb2FkZWQpIHJldHVybjtcclxuXHJcbiAgICB2YXIgdGV4dHVyZSA9IHRoaXMudGV4dHVyZTtcclxuICAgIHZhciBmcmFtZSA9IHRleHR1cmUuZnJhbWU7XHJcbiAgICB2YXIgdGFyZ2V0V2lkdGgsIHRhcmdldEhlaWdodDtcclxuXHJcbiAgICAvLyAgQ2hlY2sgdGhhdCB0aGUgZnJhbWUgaXMgdGhlIHNhbWUgc2l6ZSBhcyB0aGUgYmFzZSB0ZXh0dXJlLlxyXG4gICAgLy8gdmFyIGlzRnJhbWUgPSBmcmFtZS53aWR0aCAhPT0gdGV4dHVyZS53aWR0aCB8fCBmcmFtZS5oZWlnaHQgIT09IHRleHR1cmUuaGVpZ2h0O1xyXG5cclxuICAgIC8vIHZhciBuZXdUZXh0dXJlUmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoIWZvcmNlUG93ZXJPZlR3bykge1xyXG4gICAgICAgIC8vIGlmICh0ZXh0dXJlLmNyb3ApIC8vIGNvbW1lbnRlZCBiZWNhc3VlIGl0IGFsd2F5cyBwcmVzZW50XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIHRhcmdldFdpZHRoID0gdGV4dHVyZS5jcm9wLndpZHRoO1xyXG4gICAgICAgIHRhcmdldEhlaWdodCA9IHRleHR1cmUuY3JvcC5oZWlnaHQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRhcmdldFdpZHRoID0gZnJhbWUud2lkdGg7XHJcbiAgICAgICAgLy8gICAgIHRhcmdldEhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGlmICh0ZXh0dXJlLmNyb3ApIC8vIGNvbW1lbnRlZCBiZWNhc3VlIGl0IGFsd2F5cyBwcmVzZW50XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIHRhcmdldFdpZHRoID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byh0ZXh0dXJlLmNyb3Aud2lkdGgpO1xyXG4gICAgICAgIHRhcmdldEhlaWdodCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28odGV4dHVyZS5jcm9wLmhlaWdodCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRhcmdldFdpZHRoID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byhmcmFtZS53aWR0aCk7XHJcbiAgICAgICAgLy8gICAgIHRhcmdldEhlaWdodCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28oZnJhbWUuaGVpZ2h0KTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vICBJZiB0aGUgQmFzZVRleHR1cmUgZGltZW5zaW9ucyBkb24ndCBtYXRjaCB0aGUgdGV4dHVyZSBmcmFtZSB0aGVuIHdlIG5lZWQgYSBuZXcgdGV4dHVyZSBhbnl3YXkgYmVjYXVzZSBpdCdzIHBhcnQgb2YgYSB0ZXh0dXJlIGF0bGFzXHJcbiAgICAgICAgLy8gaWYgKGZyYW1lLndpZHRoICE9PSB0YXJnZXRXaWR0aCB8fCBmcmFtZS5oZWlnaHQgIT09IHRhcmdldEhlaWdodCB8fCB0ZXh0dXJlLndpZHRoICE9PSB0YXJnZXRXaWR0aCB8fCB0ZXh0dXJlLmhlaWdodCB8fCB0YXJnZXRIZWlnaHQpIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKG5ld1RleHR1cmVSZXF1aXJlZClcclxuICAgIC8vIHtcclxuICAgIHZhciBjYW52YXNCdWZmZXI7XHJcblxyXG4gICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSAmJiB0aGlzLnRpbGluZ1RleHR1cmUuaXNUaWxpbmcpIHtcclxuICAgICAgICBjYW52YXNCdWZmZXIgPSB0aGlzLnRpbGluZ1RleHR1cmUuY2FudmFzQnVmZmVyO1xyXG4gICAgICAgIGNhbnZhc0J1ZmZlci5yZXNpemUodGFyZ2V0V2lkdGgsIHRhcmdldEhlaWdodCk7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLndpZHRoID0gdGFyZ2V0V2lkdGg7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmhlaWdodCA9IHRhcmdldEhlaWdodDtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjYW52YXNCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIodGFyZ2V0V2lkdGgsIHRhcmdldEhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZSA9IFRpbnkuVGV4dHVyZS5mcm9tQ2FudmFzKGNhbnZhc0J1ZmZlci5jYW52YXMpO1xyXG4gICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXIgPSBjYW52YXNCdWZmZXI7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmlzVGlsaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjYW52YXNCdWZmZXIuY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgdGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgdGV4dHVyZS5jcm9wLngsXHJcbiAgICAgICAgdGV4dHVyZS5jcm9wLnksXHJcbiAgICAgICAgdGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgIHRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRhcmdldFdpZHRoLFxyXG4gICAgICAgIHRhcmdldEhlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnRpbGVTY2FsZU9mZnNldC54ID0gZnJhbWUud2lkdGggLyB0YXJnZXRXaWR0aDtcclxuICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0LnkgPSBmcmFtZS5oZWlnaHQgLyB0YXJnZXRIZWlnaHQ7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoVGV4dHVyZSA9IGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBUaW55LlNwcml0ZS5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMudGlsZVNjYWxlID0gbnVsbDtcclxuICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0ID0gbnVsbDtcclxuICAgIHRoaXMudGlsZVBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgICBpZiAodGhpcy50aWxpbmdUZXh0dXJlKSB7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuIiwiVGlueS5Ud2Vlbk1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUJ5T2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgdmFyIHR3ZWVucyA9IHRoaXMuZ3JvdXAuX3R3ZWVucztcclxuICAgIHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHR3ZWVucyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0d2VlbiA9IHR3ZWVuc1t0d2Vlbklkc1tpXV07XHJcblxyXG4gICAgICAgIGlmICh0d2Vlbi5fb2JqZWN0ID09PSBvYmopIHRoaXMucmVtb3ZlKHR3ZWVuKTtcclxuICAgIH1cclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInJlcXVpcmUoXCIuL3N5c3RlbXMvVHdlZW5cIik7XHJcbnJlcXVpcmUoXCIuL21hdGgvRWxsaXBzZVwiKTtcclxucmVxdWlyZShcIi4vb2JqZWN0cy9UaWxpbmdTcHJpdGVcIik7XHJcbnJlcXVpcmUoXCIuL29iamVjdHMvUmVuZGVyTGF5ZXJcIik7XHJcbnJlcXVpcmUoXCIuL29iamVjdHMvUHJvZ3Jlc3NCYXJcIik7XHJcbnJlcXVpcmUoXCIuL29iamVjdHMvQnV0dG9uXCIpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=