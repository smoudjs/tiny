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
__webpack_require__(/*! ./math/Ellipse */ "./plugins/extra/math/Ellipse.js");
__webpack_require__(/*! ./objects/TilingSprite */ "./plugins/extra/objects/TilingSprite.js");
__webpack_require__(/*! ./objects/RenderLayer */ "./plugins/extra/objects/RenderLayer.js");
__webpack_require__(/*! ./objects/ProgressBar */ "./plugins/extra/objects/ProgressBar.js");
__webpack_require__(/*! ./objects/Button */ "./plugins/extra/objects/Button.js");
__webpack_require__(/*! ./textures/Texture */ "./plugins/extra/textures/Texture.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9leHRyYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCLGlCQUFpQixTQUFTO0FBQzFCLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RBLHdDQUF3Qzs7Ozs7O1VDQXhDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxtQkFBTyxDQUFDLHlEQUFpQjtBQUN6QixtQkFBTyxDQUFDLHVEQUFnQjtBQUN4QixtQkFBTyxDQUFDLHVFQUF3QjtBQUNoQyxtQkFBTyxDQUFDLHFFQUF1QjtBQUMvQixtQkFBTyxDQUFDLHFFQUF1QjtBQUMvQixtQkFBTyxDQUFDLDJEQUFrQjtBQUMxQixtQkFBTyxDQUFDLCtEQUFvQiIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvbWF0aC9FbGxpcHNlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvb2JqZWN0cy9CdXR0b24uanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9leHRyYS9vYmplY3RzL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvb2JqZWN0cy9SZW5kZXJMYXllci5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2V4dHJhL29iamVjdHMvVGlsaW5nU3ByaXRlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvc3lzdGVtcy9Ud2Vlbi5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2V4dHJhL3RleHR1cmVzL1RleHR1cmUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiVGlueS5FbGxpcHNlID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgd2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgMDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuRUxJUDtcclxufTtcclxuXHJcblRpbnkuRWxsaXBzZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkVsbGlwc2U7XHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3RWxsaXBzZSA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLmRyYXdTaGFwZShuZXcgVGlueS5FbGxpcHNlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuIiwiVGlueS5CdXR0b24gPSBmdW5jdGlvbihpbnB1dCwgcGFyYW1zKSB7XHJcblxyXG4gICAgdmFyIG9wdGlvbnM7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBsYWJlbDogcGFyYW1zLFxyXG4gICAgICAgICAgICB3aWR0aDogMTYwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDQwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IHBhcmFtcztcclxuICAgICAgICBvcHRpb25zLndpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAxNjA7XHJcbiAgICAgICAgb3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA0MDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmcgPSBuZXcgVGlueS5HcmFwaGljcygpO1xyXG4gICAgYmcuYmVnaW5GaWxsKFwiIzRlNjNkZlwiKTtcclxuICAgIGJnLmRyYXdSb3VuZGVkUmVjdCgwLCAwLCBvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodCwgMTApO1xyXG4gICAgYmcuZW5kRmlsbCgpO1xyXG4gICAgYmcubGluZVN0eWxlKDUsIFwiIzNlNGZiMlwiLCAxKTtcclxuICAgIGJnLmRyYXdSb3VuZGVkUmVjdCgwLCAwLCBvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodCwgMTApO1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLmNhbGwodGhpcywgYmcuZ2VuZXJhdGVUZXh0dXJlKCkpO1xyXG5cclxuICAgIHZhciBsYWJlbCA9IHRoaXMubGFiZWwgPSBuZXcgVGlueS5UZXh0KG9wdGlvbnMubGFiZWwsIHtcclxuICAgICAgICBmaWxsOiBcIiNmZmZmZmZcIixcclxuICAgICAgICBmb250OiBcIjMwMCAxM3B0IEFyaWFsXCIsXHJcbiAgICAgICAgYWxpZ246IFwiY2VudGVyXCJcclxuICAgIH0pO1xyXG4gICAgbGFiZWwueSA9IDI7XHJcbiAgICBsYWJlbC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICB0aGlzLmFkZChsYWJlbCk7XHJcblxyXG4gICAgdGhpcy5hbmNob3Iuc2V0KDAuNSk7XHJcblxyXG4gICAgaW5wdXQuYWRkKHRoaXMpO1xyXG5cclxuICAgIGlucHV0Lm9uKFwibW92ZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgaWYgKGJvdW5kcy5jb250YWlucyhlLngsIGUueSkpIHRoaXMudGludCA9IFwiI2ExYTFhMVwiXHJcbiAgICAgICAgZWxzZSB0aGlzLnRpbnQgPSBcIiNmZmZmZmZcIlxyXG4gICAgfSAsIHRoaXMpXHJcblxyXG4gICAgdGhpcy5pbnB1dC5vbihcImRvd25cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2V0KDAuOTUpO1xyXG4gICAgfSwgdGhpcylcclxuXHJcbiAgICB0aGlzLmlucHV0Lm9uKFwidXBcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2V0KDEuMDUpO1xyXG4gICAgfSwgdGhpcylcclxufTtcclxuXHJcblRpbnkuQnV0dG9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5TcHJpdGUucHJvdG90eXBlKTtcclxuVGlueS5CdXR0b24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5CdXR0b247IiwidmFyIGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgYmdDb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICBiZ0FscGhhOiAxLFxyXG4gICAgdmFsdWU6IDEsXHJcbiAgICB3aWR0aDogMjMwLFxyXG4gICAgaGVpZ2h0OiAzMCxcclxuICAgIHJhZGl1czogMTUsXHJcbiAgICBjb2xvcnM6IFtcIiNmZjAwMDBcIiwgXCIjZmZjMzIyXCIsIFwiIzA4YzAxM1wiXSxcclxuICAgIGFuaW1hdGVkOiB0cnVlLFxyXG4gICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICBlYXNpbmc6IFRpbnkuRWFzaW5nLkN1YmljLkluT3V0LFxyXG4gICAgc3Ryb2tlQ29sb3I6IFwiI2UxZTFlMVwiLFxyXG4gICAgc3Ryb2tlV2lkdGg6IDAsXHJcbiAgICBzdHJva2VBbHBoYTogMSxcclxuICAgIHJlc29sdXRpb246IDFcclxufTtcclxuXHJcblRpbnkuUHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgZm9yICh2YXIga2V5IGluIGRlZmF1bHRPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnNba2V5XSA9PSB1bmRlZmluZWQpIG9wdGlvbnNba2V5XSA9IGRlZmF1bHRPcHRpb25zW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGdyYXBoaWNzID0gbmV3IFRpbnkuR3JhcGhpY3MoKTtcclxuXHJcbiAgICBncmFwaGljcy5iZWdpbkZpbGwob3B0aW9ucy5iZ0NvbG9yLCBvcHRpb25zLmJnQWxwaGEpO1xyXG4gICAgZ3JhcGhpY3MuZHJhd1JvdW5kZWRSZWN0KFxyXG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlV2lkdGggLyAyLFxyXG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlV2lkdGggLyAyLFxyXG4gICAgICAgIG9wdGlvbnMud2lkdGgsXHJcbiAgICAgICAgb3B0aW9ucy5oZWlnaHQsXHJcbiAgICAgICAgb3B0aW9ucy5yYWRpdXNcclxuICAgICk7XHJcbiAgICBncmFwaGljcy5lbmRGaWxsKCk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuc3Ryb2tlV2lkdGgpIHtcclxuICAgICAgICBncmFwaGljcy5saW5lU3R5bGUob3B0aW9ucy5zdHJva2VXaWR0aCwgb3B0aW9ucy5zdHJva2VDb2xvciwgb3B0aW9ucy5zdHJva2VBbHBoYSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZHJhd1JvdW5kZWRSZWN0KFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBvcHRpb25zLndpZHRoICsgb3B0aW9ucy5zdHJva2VXaWR0aCxcclxuICAgICAgICAgICAgb3B0aW9ucy5oZWlnaHQgKyBvcHRpb25zLnN0cm9rZVdpZHRoLFxyXG4gICAgICAgICAgICBvcHRpb25zLnJhZGl1cyArIG9wdGlvbnMuc3Ryb2tlV2lkdGggLyAyXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIGdyYXBoaWNzLmdlbmVyYXRlVGV4dHVyZShvcHRpb25zLnJlc29sdXRpb24pKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvci5zZXQoMC41KTtcclxuXHJcbiAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWUgfHwgdGhpcy5nYW1lO1xyXG4gICAgdGhpcy5hbmltYXRlZCA9IG9wdGlvbnMuYW5pbWF0ZWQ7XHJcbiAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcclxuICAgIHRoaXMuZWFzaW5nID0gb3B0aW9ucy5lYXNpbmc7XHJcbiAgICB0aGlzLnZhbHVlID0gb3B0aW9ucy52YWx1ZTtcclxuICAgIHRoaXMub3JpZ2luYWxXaWR0aCA9IG9wdGlvbnMud2lkdGggKiBvcHRpb25zLnJlc29sdXRpb247XHJcbiAgICB0aGlzLl90d2VlbiA9IG51bGw7XHJcbiAgICB0aGlzLl9jcm9wID0gbmV3IFRpbnkuUmVjdGFuZ2xlKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBvcHRpb25zLndpZHRoICogb3B0aW9ucy5yZXNvbHV0aW9uLFxyXG4gICAgICAgIG9wdGlvbnMuaGVpZ2h0ICogb3B0aW9ucy5yZXNvbHV0aW9uXHJcbiAgICApO1xyXG4gICAgdGhpcy5fc3ByaXRlcyA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5jb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIGdyYXBoaWNzLmJlZ2luRmlsbChvcHRpb25zLmNvbG9yc1tpXSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIG9wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0LCBvcHRpb25zLnJhZGl1cyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xyXG5cclxuICAgICAgICB2YXIgY29sb3JTcHJpdGUgPSBuZXcgVGlueS5TcHJpdGUoZ3JhcGhpY3MuZ2VuZXJhdGVUZXh0dXJlKG9wdGlvbnMucmVzb2x1dGlvbikpO1xyXG4gICAgICAgIGNvbG9yU3ByaXRlLmFuY2hvciA9IHRoaXMuYW5jaG9yO1xyXG4gICAgICAgIC8vIGNvbG9yU3ByaXRlLmFuY2hvci5zZXQoMC41KTtcclxuICAgICAgICBjb2xvclNwcml0ZS50ZXh0dXJlLmNyb3AgPSB0aGlzLl9jcm9wO1xyXG4gICAgICAgIHRoaXMuYWRkKGNvbG9yU3ByaXRlKTtcclxuICAgICAgICB0aGlzLl9zcHJpdGVzLnB1c2goY29sb3JTcHJpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdyYXBoaWNzLmRlc3Ryb3koKTtcclxuXHJcbiAgICB0aGlzLl9zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxufTtcclxuXHJcblRpbnkuUHJvZ3Jlc3NCYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlNwcml0ZS5wcm90b3R5cGUpO1xyXG5UaW55LlByb2dyZXNzQmFyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUHJvZ3Jlc3NCYXI7XHJcblxyXG5UaW55LlByb2dyZXNzQmFyLnByb3RvdHlwZS5fc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIHZhbHVlID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgdmFsdWUpKTtcclxuXHJcbiAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB2YWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG5cclxuICAgIGlmICh2YWx1ZSA9PSB0aGlzLl92YWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5fY3JvcC53aWR0aCA9IHRoaXMub3JpZ2luYWxXaWR0aCAqIHZhbHVlO1xyXG5cclxuICAgIGlmICh2YWx1ZSA9PSAwIHx8IHRoaXMuX3Nwcml0ZXMubGVuZ3RoID09PSAxKSByZXR1cm47XHJcbiAgICBpZiAodmFsdWUgPT0gMSkge1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZXNbdGhpcy5fc3ByaXRlcy5sZW5ndGggLSAxXS5hbHBoYSA9IDE7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9zcHJpdGVzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlc1sxXS5hbHBoYSA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9zcHJpdGVzLmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgdmFyIHN0ZXAgPSAwLjU7XHJcbiAgICAgICAgdmFyIGxlcnA7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+PSBzdGVwKSB7XHJcbiAgICAgICAgICAgIGxlcnAgPSAxIC0gKDEgLSB2YWx1ZSkgLyBzdGVwO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGVzWzFdLmFscGhhID0gMTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlc1syXS5hbHBoYSA9IGxlcnAgKiBsZXJwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCBzdGVwKSB7XHJcbiAgICAgICAgICAgIGxlcnAgPSAoMSAtIHZhbHVlIC0gc3RlcCkgLyBzdGVwO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGVzWzFdLmFscGhhID0gMSAtIGxlcnAgKiBsZXJwO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGVzWzJdLmFscGhhID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtaXhlcyA9IHRoaXMuX3Nwcml0ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgc3RlcCA9IDEgLyBtaXhlcztcclxuXHJcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcih2YWx1ZSAqIG1peGVzKSArIDE7XHJcbiAgICAgICAgdmFyIGFscGhhID0gKHZhbHVlIC0gc3RlcCAqIChpbmRleCAtIDEpKSAvIHN0ZXA7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGVzW2ldLmFscGhhID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Nwcml0ZXNbaW5kZXggLSAxXS5hbHBoYSA9IDE7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlc1tpbmRleF0uYWxwaGEgPSBhbHBoYTtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUHJvZ3Jlc3NCYXIucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICB2YWx1ZSA9IE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHZhbHVlKSk7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMuYW5pbWF0ZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHdlZW4pIHRoaXMuX3R3ZWVuLnN0b3AoKTtcclxuXHJcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHRtcE9iaiA9IHsgdmFsdWU6IF9zZWxmLl92YWx1ZSB9O1xyXG5cclxuICAgICAgICB0aGlzLl90d2VlbiA9IHRoaXMuZ2FtZS50d2VlbnNcclxuICAgICAgICAgICAgLmFkZCh0bXBPYmopXHJcbiAgICAgICAgICAgIC50byh7IHZhbHVlOiB2YWx1ZSB9LCB0aGlzLmR1cmF0aW9uKVxyXG4gICAgICAgICAgICAuZWFzaW5nKHRoaXMuZWFzaW5nKVxyXG4gICAgICAgICAgICAub25VcGRhdGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3NlbGYuX3NldFZhbHVlKHRtcE9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlByb2dyZXNzQmFyLmRlZmF1bHRPcHRpb25zID0gZGVmYXVsdE9wdGlvbnM7XHJcbiIsIlRpbnkuUmVuZGVyTGF5ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlckxheWVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LlJlbmRlckxheWVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmVuZGVyTGF5ZXI7XHJcblxyXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVGlueS5SZW5kZXJMYXllci5wcm90b3R5cGUuYWRkQ2hpbGRBdCA9IGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDw9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgIGNoaWxkLl9SZW5kZXJMYXllcl9yZW5kZXIgPSBjaGlsZC5yZW5kZXI7XHJcbiAgICAgICAgY2hpbGQucmVuZGVyID0gbm9vcDtcclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGNoaWxkICsgXCJhZGRDaGlsZEF0OiBUaGUgaW5kZXggXCIgKyBpbmRleCArIFwiIHN1cHBsaWVkIGlzIG91dCBvZiBib3VuZHMgXCIgKyB0aGlzLmNoaWxkcmVuLmxlbmd0aFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UaW55LlJlbmRlckxheWVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICB2YXIgY2hpbGQgPSB0aGlzLmdldENoaWxkQXQoaW5kZXgpO1xyXG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIGNoaWxkLnJlbmRlciA9IGNoaWxkLl9SZW5kZXJMYXllcl9yZW5kZXI7XHJcbiAgICBjaGlsZC5fUmVuZGVyTGF5ZXJfcmVuZGVyID0gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gY2hpbGQ7XHJcbn07XHJcblxyXG5UaW55LlJlbmRlckxheWVyLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7fVxyXG5cclxuXHJcblRpbnkuUmVuZGVyTGF5ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLl9SZW5kZXJMYXllcl9yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIE1hdCBHcm92ZXMgaHR0cDovL21hdGdyb3Zlcy5jb20vXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgdGlsaW5nIHNwcml0ZSBpcyBhIGZhc3Qgd2F5IG9mIHJlbmRlcmluZyBhIHRpbGluZyBpbWFnZVxyXG4gKlxyXG4gKiBAY2xhc3MgVGlsaW5nU3ByaXRlXHJcbiAqIEBleHRlbmRzIFNwcml0ZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHRleHR1cmUge1RleHR1cmV9IHRoZSB0ZXh0dXJlIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqIEBwYXJhbSB3aWR0aCB7TnVtYmVyfSAgdGhlIHdpZHRoIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqIEBwYXJhbSBoZWlnaHQge051bWJlcn0gdGhlIGhlaWdodCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gKi9cclxuVGlueS5UaWxpbmdTcHJpdGUgPSBmdW5jdGlvbiAodGV4dHVyZSwga2V5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICBUaW55LlNwcml0ZS5jYWxsKHRoaXMsIHRleHR1cmUsIGtleSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgd2l0aCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxyXG4gICAgICogQHR5cGUgTnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX3dpZHRoID0gd2lkdGggfHwgMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGhlaWdodCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSBoZWlnaHRcclxuICAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQgfHwgMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNjYWxpbmcgb2YgdGhlIGltYWdlIHRoYXQgaXMgYmVpbmcgdGlsZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgdGlsZVNjYWxlXHJcbiAgICAgKiBAdHlwZSBQb2ludFxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpbGVTY2FsZSA9IG5ldyBUaW55LlBvaW50KDEsIDEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBwb2ludCB0aGF0IHJlcHJlc2VudHMgdGhlIHNjYWxlIG9mIHRoZSB0ZXh0dXJlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB0aWxlU2NhbGVPZmZzZXRcclxuICAgICAqIEB0eXBlIFBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0ID0gbmV3IFRpbnkuUG9pbnQoMSwgMSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb2Zmc2V0IHBvc2l0aW9uIG9mIHRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHRpbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVQb3NpdGlvblxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBuZXcgVGlueS5Qb2ludCgwLCAwKTtcclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5TcHJpdGUucHJvdG90eXBlKTtcclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UaWxpbmdTcHJpdGU7XHJcblxyXG4vKipcclxuICogVGhlIHdpZHRoIG9mIHRoZSBzcHJpdGUsIHNldHRpbmcgdGhpcyB3aWxsIGFjdHVhbGx5IG1vZGlmeSB0aGUgc2NhbGUgdG8gYWNoaWV2ZSB0aGUgdmFsdWUgc2V0XHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSB3aWR0aFxyXG4gKiBAdHlwZSBOdW1iZXJcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogVGhlIGhlaWdodCBvZiB0aGUgVGlsaW5nU3ByaXRlLCBzZXR0aW5nIHRoaXMgd2lsbCBhY3R1YWxseSBtb2RpZnkgdGhlIHNjYWxlIHRvIGFjaGlldmUgdGhlIHZhbHVlIHNldFxyXG4gKlxyXG4gKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAqIEB0eXBlIE51bWJlclxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKHRleHR1cmUsIGtleSkge1xyXG4gICAgdmFyIHVwZGF0ZWQgPSBUaW55LlNwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZS5jYWxsKHRoaXMsIHRleHR1cmUsIGtleSk7XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoVGV4dHVyZSA9IHVwZGF0ZWQ7XHJcbn07XHJcblxyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICB2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMud29ybGRBbHBoYTtcclxuXHJcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICB0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRyYW5zZm9ybS5jICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICB0cmFuc2Zvcm0udHkgKiByZXNvbHV0aW9uXHJcbiAgICApO1xyXG5cclxuICAgIGlmICghdGhpcy5fX3RpbGVQYXR0ZXJuIHx8IHRoaXMucmVmcmVzaFRleHR1cmUpIHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlVGlsaW5nVGV4dHVyZShmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbGluZ1RleHR1cmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fX3RpbGVQYXR0ZXJuID0gY29udGV4dC5jcmVhdGVQYXR0ZXJuKHRoaXMudGlsaW5nVGV4dHVyZS5zb3VyY2UsIFwicmVwZWF0XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgYmxlbmQgbW9kZVxyXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlICE9PSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUpIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcclxuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGlsZVBvc2l0aW9uID0gdGhpcy50aWxlUG9zaXRpb247XHJcbiAgICB2YXIgdGlsZVNjYWxlID0gdGhpcy50aWxlU2NhbGU7XHJcblxyXG4gICAgdGlsZVBvc2l0aW9uLnggJT0gdGhpcy50aWxpbmdUZXh0dXJlLndpZHRoO1xyXG4gICAgdGlsZVBvc2l0aW9uLnkgJT0gdGhpcy50aWxpbmdUZXh0dXJlLmhlaWdodDtcclxuXHJcbiAgICAvLyBvZmZzZXQgLSBtYWtlIHN1cmUgdG8gYWNjb3VudCBmb3IgdGhlIGFuY2hvciBwb2ludC4uXHJcbiAgICBjb250ZXh0LnNjYWxlKHRpbGVTY2FsZS54LCB0aWxlU2NhbGUueSk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZShcclxuICAgICAgICB0aWxlUG9zaXRpb24ueCArIHRoaXMuYW5jaG9yLnggKiAtdGhpcy5fd2lkdGgsXHJcbiAgICAgICAgdGlsZVBvc2l0aW9uLnkgKyB0aGlzLmFuY2hvci55ICogLXRoaXMuX2hlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX190aWxlUGF0dGVybjtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KC10aWxlUG9zaXRpb24ueCwgLXRpbGVQb3NpdGlvbi55LCB0aGlzLl93aWR0aCAvIHRpbGVTY2FsZS54LCB0aGlzLl9oZWlnaHQgLyB0aWxlU2NhbGUueSk7XHJcblxyXG4gICAgY29udGV4dC5zY2FsZSgxIC8gdGlsZVNjYWxlLngsIDEgLyB0aWxlU2NhbGUueSk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZShcclxuICAgICAgICAtdGlsZVBvc2l0aW9uLnggKyB0aGlzLmFuY2hvci54ICogdGhpcy5fd2lkdGgsXHJcbiAgICAgICAgLXRpbGVQb3NpdGlvbi55ICsgdGhpcy5hbmNob3IueSAqIHRoaXMuX2hlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBmcmFtaW5nIHJlY3RhbmdsZSBvZiB0aGUgc3ByaXRlIGFzIGEgVGlueS5SZWN0YW5nbGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBtZXRob2QgZ2V0Qm91bmRzXHJcbiAqIEByZXR1cm4ge1JlY3RhbmdsZX0gdGhlIGZyYW1pbmcgcmVjdGFuZ2xlXHJcbiAqL1xyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGg7XHJcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEgLSB0aGlzLmFuY2hvci54KTtcclxuICAgIHZhciB3MSA9IHdpZHRoICogLXRoaXMuYW5jaG9yLng7XHJcblxyXG4gICAgdmFyIGgwID0gaGVpZ2h0ICogKDEgLSB0aGlzLmFuY2hvci55KTtcclxuICAgIHZhciBoMSA9IGhlaWdodCAqIC10aGlzLmFuY2hvci55O1xyXG5cclxuICAgIHZhciB3b3JsZFRyYW5zZm9ybSA9IHRoaXMud29ybGRUcmFuc2Zvcm07XHJcblxyXG4gICAgdmFyIGEgPSB3b3JsZFRyYW5zZm9ybS5hO1xyXG4gICAgdmFyIGIgPSB3b3JsZFRyYW5zZm9ybS5iO1xyXG4gICAgdmFyIGMgPSB3b3JsZFRyYW5zZm9ybS5jO1xyXG4gICAgdmFyIGQgPSB3b3JsZFRyYW5zZm9ybS5kO1xyXG4gICAgdmFyIHR4ID0gd29ybGRUcmFuc2Zvcm0udHg7XHJcbiAgICB2YXIgdHkgPSB3b3JsZFRyYW5zZm9ybS50eTtcclxuXHJcbiAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgIHZhciB5MSA9IGQgKiBoMSArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgdmFyIHgzID0gYSAqIHcwICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDQgPSBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5NCA9IGQgKiBoMCArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgIHZhciBtYXhYID0gLUluZmluaXR5O1xyXG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgdmFyIG1pblggPSBJbmZpbml0eTtcclxuICAgIHZhciBtaW5ZID0gSW5maW5pdHk7XHJcblxyXG4gICAgbWluWCA9IHgxIDwgbWluWCA/IHgxIDogbWluWDtcclxuICAgIG1pblggPSB4MiA8IG1pblggPyB4MiA6IG1pblg7XHJcbiAgICBtaW5YID0geDMgPCBtaW5YID8geDMgOiBtaW5YO1xyXG4gICAgbWluWCA9IHg0IDwgbWluWCA/IHg0IDogbWluWDtcclxuXHJcbiAgICBtaW5ZID0geTEgPCBtaW5ZID8geTEgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHkyIDwgbWluWSA/IHkyIDogbWluWTtcclxuICAgIG1pblkgPSB5MyA8IG1pblkgPyB5MyA6IG1pblk7XHJcbiAgICBtaW5ZID0geTQgPCBtaW5ZID8geTQgOiBtaW5ZO1xyXG5cclxuICAgIG1heFggPSB4MSA+IG1heFggPyB4MSA6IG1heFg7XHJcbiAgICBtYXhYID0geDIgPiBtYXhYID8geDIgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHgzID4gbWF4WCA/IHgzIDogbWF4WDtcclxuICAgIG1heFggPSB4NCA+IG1heFggPyB4NCA6IG1heFg7XHJcblxyXG4gICAgbWF4WSA9IHkxID4gbWF4WSA/IHkxIDogbWF4WTtcclxuICAgIG1heFkgPSB5MiA+IG1heFkgPyB5MiA6IG1heFk7XHJcbiAgICBtYXhZID0geTMgPiBtYXhZID8geTMgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHk0ID4gbWF4WSA/IHk0IDogbWF4WTtcclxuXHJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuICAgIGJvdW5kcy54ID0gbWluWDtcclxuICAgIGJvdW5kcy53aWR0aCA9IG1heFggLSBtaW5YO1xyXG5cclxuICAgIGJvdW5kcy55ID0gbWluWTtcclxuICAgIGJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gbWluWTtcclxuXHJcbiAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYWdhaW4gaW4gdGhlIHJlbmRlciBjeWNsZSB3ZSBkbyBub3QgaGF2ZSB0byByZWNhbGN1bGF0ZVxyXG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IGJvdW5kcztcclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdoZW4gdGhlIHRleHR1cmUgaXMgdXBkYXRlZCwgdGhpcyBldmVudCB3aWxsIGZpcmUgdG8gdXBkYXRlIHRoZSBzY2FsZSBhbmQgZnJhbWVcclxuICpcclxuICogQG1ldGhvZCBvblRleHR1cmVVcGRhdGVcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBtZXRob2QgZ2VuZXJhdGVUaWxpbmdUZXh0dXJlXHJcbiAqXHJcbiAqIEBwYXJhbSBmb3JjZVBvd2VyT2ZUd28ge0Jvb2xlYW59IFdoZXRoZXIgd2Ugd2FudCB0byBmb3JjZSB0aGUgdGV4dHVyZSB0byBiZSBhIHBvd2VyIG9mIHR3b1xyXG4gKi9cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdlbmVyYXRlVGlsaW5nVGV4dHVyZSA9IGZ1bmN0aW9uIChmb3JjZVBvd2VyT2ZUd28pIHtcclxuICAgIGlmICghdGhpcy50ZXh0dXJlLmhhc0xvYWRlZCkgcmV0dXJuO1xyXG5cclxuICAgIHZhciB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlO1xyXG4gICAgdmFyIGZyYW1lID0gdGV4dHVyZS5mcmFtZTtcclxuICAgIHZhciB0YXJnZXRXaWR0aCwgdGFyZ2V0SGVpZ2h0O1xyXG5cclxuICAgIC8vICBDaGVjayB0aGF0IHRoZSBmcmFtZSBpcyB0aGUgc2FtZSBzaXplIGFzIHRoZSBiYXNlIHRleHR1cmUuXHJcbiAgICAvLyB2YXIgaXNGcmFtZSA9IGZyYW1lLndpZHRoICE9PSB0ZXh0dXJlLndpZHRoIHx8IGZyYW1lLmhlaWdodCAhPT0gdGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgLy8gdmFyIG5ld1RleHR1cmVSZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghZm9yY2VQb3dlck9mVHdvKSB7XHJcbiAgICAgICAgLy8gaWYgKHRleHR1cmUuY3JvcCkgLy8gY29tbWVudGVkIGJlY2FzdWUgaXQgYWx3YXlzIHByZXNlbnRcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgdGFyZ2V0V2lkdGggPSB0ZXh0dXJlLmNyb3Aud2lkdGg7XHJcbiAgICAgICAgdGFyZ2V0SGVpZ2h0ID0gdGV4dHVyZS5jcm9wLmhlaWdodDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGFyZ2V0V2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgICAgICAvLyAgICAgdGFyZ2V0SGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gbmV3VGV4dHVyZVJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gaWYgKHRleHR1cmUuY3JvcCkgLy8gY29tbWVudGVkIGJlY2FzdWUgaXQgYWx3YXlzIHByZXNlbnRcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgdGFyZ2V0V2lkdGggPSBUaW55LmdldE5leHRQb3dlck9mVHdvKHRleHR1cmUuY3JvcC53aWR0aCk7XHJcbiAgICAgICAgdGFyZ2V0SGVpZ2h0ID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byh0ZXh0dXJlLmNyb3AuaGVpZ2h0KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGFyZ2V0V2lkdGggPSBUaW55LmdldE5leHRQb3dlck9mVHdvKGZyYW1lLndpZHRoKTtcclxuICAgICAgICAvLyAgICAgdGFyZ2V0SGVpZ2h0ID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byhmcmFtZS5oZWlnaHQpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gbmV3VGV4dHVyZVJlcXVpcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gIElmIHRoZSBCYXNlVGV4dHVyZSBkaW1lbnNpb25zIGRvbid0IG1hdGNoIHRoZSB0ZXh0dXJlIGZyYW1lIHRoZW4gd2UgbmVlZCBhIG5ldyB0ZXh0dXJlIGFueXdheSBiZWNhdXNlIGl0J3MgcGFydCBvZiBhIHRleHR1cmUgYXRsYXNcclxuICAgICAgICAvLyBpZiAoZnJhbWUud2lkdGggIT09IHRhcmdldFdpZHRoIHx8IGZyYW1lLmhlaWdodCAhPT0gdGFyZ2V0SGVpZ2h0IHx8IHRleHR1cmUud2lkdGggIT09IHRhcmdldFdpZHRoIHx8IHRleHR1cmUuaGVpZ2h0IHx8IHRhcmdldEhlaWdodCkgbmV3VGV4dHVyZVJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiAobmV3VGV4dHVyZVJlcXVpcmVkKVxyXG4gICAgLy8ge1xyXG4gICAgdmFyIGNhbnZhc0J1ZmZlcjtcclxuXHJcbiAgICBpZiAodGhpcy50aWxpbmdUZXh0dXJlICYmIHRoaXMudGlsaW5nVGV4dHVyZS5pc1RpbGluZykge1xyXG4gICAgICAgIGNhbnZhc0J1ZmZlciA9IHRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXI7XHJcbiAgICAgICAgY2FudmFzQnVmZmVyLnJlc2l6ZSh0YXJnZXRXaWR0aCwgdGFyZ2V0SGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUud2lkdGggPSB0YXJnZXRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUuaGVpZ2h0ID0gdGFyZ2V0SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbnZhc0J1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcih0YXJnZXRXaWR0aCwgdGFyZ2V0SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmNhbnZhc0J1ZmZlciA9IGNhbnZhc0J1ZmZlcjtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUuaXNUaWxpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbnZhc0J1ZmZlci5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICB0ZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICB0ZXh0dXJlLmNyb3AueCxcclxuICAgICAgICB0ZXh0dXJlLmNyb3AueSxcclxuICAgICAgICB0ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgdGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGFyZ2V0V2lkdGgsXHJcbiAgICAgICAgdGFyZ2V0SGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0LnggPSBmcmFtZS53aWR0aCAvIHRhcmdldFdpZHRoO1xyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQueSA9IGZyYW1lLmhlaWdodCAvIHRhcmdldEhlaWdodDtcclxuICAgIC8vIH1cclxuXHJcbiAgICB0aGlzLnJlZnJlc2hUZXh0dXJlID0gZmFsc2U7XHJcbn07XHJcblxyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLnRpbGluZ1RleHR1cmUpIHtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUuZGVzdHJveSh0cnVlKTtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUgPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlR3ZWVuTWFuYWdlci5wcm90b3R5cGUucmVtb3ZlQnlPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgdHdlZW5zID0gdGhpcy5ncm91cC5fdHdlZW5zO1xyXG4gICAgdmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModHdlZW5zKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHR3ZWVuID0gdHdlZW5zW3R3ZWVuSWRzW2ldXTtcclxuXHJcbiAgICAgICAgaWYgKHR3ZWVuLl9vYmplY3QgPT09IG9iaikgdGhpcy5yZW1vdmUodHdlZW4pO1xyXG4gICAgfVxyXG59O1xyXG4iLCJUaW55LlRleHR1cmUuRU1QVFkgPSBuZXcgVGlueS5UZXh0dXJlKHt9LCBuZXcgVGlueS5SZWN0YW5nbGUoKSwgbmV3IFRpbnkuUmVjdGFuZ2xlKCkpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKFwiLi9zeXN0ZW1zL1R3ZWVuXCIpO1xyXG5yZXF1aXJlKFwiLi9tYXRoL0VsbGlwc2VcIik7XHJcbnJlcXVpcmUoXCIuL29iamVjdHMvVGlsaW5nU3ByaXRlXCIpO1xyXG5yZXF1aXJlKFwiLi9vYmplY3RzL1JlbmRlckxheWVyXCIpO1xyXG5yZXF1aXJlKFwiLi9vYmplY3RzL1Byb2dyZXNzQmFyXCIpO1xyXG5yZXF1aXJlKFwiLi9vYmplY3RzL0J1dHRvblwiKTtcclxucmVxdWlyZShcIi4vdGV4dHVyZXMvVGV4dHVyZVwiKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9