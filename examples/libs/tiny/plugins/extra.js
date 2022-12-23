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

    this.type = Tiny.Primitives.ELIP
};

Tiny.Ellipse.prototype.constructor = Tiny.Ellipse;


Tiny.Graphics.prototype.drawEllipse = function(x, y, width, height)
{
    this.drawShape(new Tiny.Ellipse(x, y, width, height));

    return this;
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

Tiny.TilingSprite.prototype.render = function(renderSession)
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
            this.__tilePattern = context.createPattern(this.tilingTexture.source, 'repeat');
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

    tilePosition.x %= this.tilingTexture.width;
    tilePosition.y %= this.tilingTexture.height;

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
        this.children[i].render(renderSession);
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
    if (!this.texture.hasLoaded) return;

    var texture = this.texture;
    var frame = texture.frame;
    var targetWidth, targetHeight;

    //  Check that the frame is the same size as the base texture.
    // var isFrame = frame.width !== texture.width || frame.height !== texture.height;

    // var newTextureRequired = false;

    if (!forcePowerOfTwo)
    {
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
    }
    else
    {
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

        if (this.tilingTexture && this.tilingTexture.isTiling)
        {
            canvasBuffer = this.tilingTexture.canvasBuffer;
            canvasBuffer.resize(targetWidth, targetHeight);
            this.tilingTexture.width = targetWidth;
            this.tilingTexture.height = targetHeight;
            this.tilingTexture.needsUpdate = true;
        }
        else
        {
            canvasBuffer = new Tiny.CanvasBuffer(targetWidth, targetHeight);

            this.tilingTexture = Tiny.Texture.fromCanvas(canvasBuffer.canvas);
            this.tilingTexture.canvasBuffer = canvasBuffer;
            this.tilingTexture.isTiling = true;
        }

        canvasBuffer.context.drawImage(texture.source,
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
    // }

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

/***/ "./plugins/extra/systems/Tween.js":
/*!****************************************!*\
  !*** ./plugins/extra/systems/Tween.js ***!
  \****************************************/
/***/ (() => {


Tiny.TweenManager.prototype.removeByObject = function (obj) {

    var tweens = this.group._tweens;
    var tweenIds = Object.keys(tweens);
    
    for (var i = 0; i < tweenIds.length; i++) 
    {
        var tween = tweens[tweenIds[i]];

        if (tween._object === obj) this.remove(tween);
    }
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
/*!********************************!*\
  !*** ./plugins/extra/index.js ***!
  \********************************/

__webpack_require__(/*! ./systems/Tween */ "./plugins/extra/systems/Tween.js");
__webpack_require__(/*! ./math/Ellipse */ "./plugins/extra/math/Ellipse.js");
__webpack_require__(/*! ./objects/TilingSprite */ "./plugins/extra/objects/TilingSprite.js");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9leHRyYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUIsaUJBQWlCLFNBQVM7QUFDMUIsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFNBQVM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3JYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDWkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBO0FBQ0EsbUJBQU8sQ0FBQyx5REFBaUI7QUFDekIsbUJBQU8sQ0FBQyx1REFBZ0I7QUFDeEIsbUJBQU8sQ0FBQyx1RUFBd0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvbWF0aC9FbGxpcHNlLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvZXh0cmEvb2JqZWN0cy9UaWxpbmdTcHJpdGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9leHRyYS9zeXN0ZW1zL1R3ZWVuLmpzIiwid2VicGFjazovL2g1dGlueS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2V4dHJhL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5UaW55LkVsbGlwc2UgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgIHggPSB4IHx8IDA7XHJcbiAgICB5ID0geSB8fCAwO1xyXG4gICAgd2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XHJcblxyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgMDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBUaW55LlByaW1pdGl2ZXMuRUxJUFxyXG59O1xyXG5cclxuVGlueS5FbGxpcHNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuRWxsaXBzZTtcclxuXHJcblxyXG5UaW55LkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3RWxsaXBzZSA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIHRoaXMuZHJhd1NoYXBlKG5ldyBUaW55LkVsbGlwc2UoeCwgeSwgd2lkdGgsIGhlaWdodCkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59OyIsIi8qKlxyXG4gKiBAYXV0aG9yIE1hdCBHcm92ZXMgaHR0cDovL21hdGdyb3Zlcy5jb20vXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgdGlsaW5nIHNwcml0ZSBpcyBhIGZhc3Qgd2F5IG9mIHJlbmRlcmluZyBhIHRpbGluZyBpbWFnZVxyXG4gKlxyXG4gKiBAY2xhc3MgVGlsaW5nU3ByaXRlXHJcbiAqIEBleHRlbmRzIFNwcml0ZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHRleHR1cmUge1RleHR1cmV9IHRoZSB0ZXh0dXJlIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqIEBwYXJhbSB3aWR0aCB7TnVtYmVyfSAgdGhlIHdpZHRoIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqIEBwYXJhbSBoZWlnaHQge051bWJlcn0gdGhlIGhlaWdodCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gKi9cclxuVGlueS5UaWxpbmdTcHJpdGUgPSBmdW5jdGlvbih0ZXh0dXJlLCBrZXksIHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIFRpbnkuU3ByaXRlLmNhbGwoIHRoaXMsIHRleHR1cmUsIGtleSApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHdpdGggb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgd2lkdGhcclxuICAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoIHx8IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoZWlnaHQgb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzY2FsaW5nIG9mIHRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHRpbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVTY2FsZVxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBuZXcgVGlueS5Qb2ludCgxLDEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBwb2ludCB0aGF0IHJlcHJlc2VudHMgdGhlIHNjYWxlIG9mIHRoZSB0ZXh0dXJlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB0aWxlU2NhbGVPZmZzZXRcclxuICAgICAqIEB0eXBlIFBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0ID0gbmV3IFRpbnkuUG9pbnQoMSwxKTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb2Zmc2V0IHBvc2l0aW9uIG9mIHRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHRpbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVQb3NpdGlvblxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBuZXcgVGlueS5Qb2ludCgwLDApO1xyXG5cclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5TcHJpdGUucHJvdG90eXBlKTtcclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UaWxpbmdTcHJpdGU7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSB3aWR0aCBvZiB0aGUgc3ByaXRlLCBzZXR0aW5nIHRoaXMgd2lsbCBhY3R1YWxseSBtb2RpZnkgdGhlIHNjYWxlIHRvIGFjaGlldmUgdGhlIHZhbHVlIHNldFxyXG4gKlxyXG4gKiBAcHJvcGVydHkgd2lkdGhcclxuICogQHR5cGUgTnVtYmVyXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLCAnd2lkdGgnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogVGhlIGhlaWdodCBvZiB0aGUgVGlsaW5nU3ByaXRlLCBzZXR0aW5nIHRoaXMgd2lsbCBhY3R1YWxseSBtb2RpZnkgdGhlIHNjYWxlIHRvIGFjaGlldmUgdGhlIHZhbHVlIHNldFxyXG4gKlxyXG4gKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAqIEB0eXBlIE51bWJlclxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24odGV4dHVyZSwga2V5KVxyXG57XHJcbiAgICB2YXIgdXBkYXRlZCA9IFRpbnkuU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlLmNhbGwodGhpcywgdGV4dHVyZSwga2V5KTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2hUZXh0dXJlID0gdXBkYXRlZDtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKXJldHVybjtcclxuICAgIFxyXG4gICAgdmFyIGNvbnRleHQgPSByZW5kZXJTZXNzaW9uLmNvbnRleHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG4gICAgXHJcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgIFxyXG4gICAgdmFyIHJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgY29udGV4dC5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtLmEgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmMgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmQgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50eSAqIHJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmICghdGhpcy5fX3RpbGVQYXR0ZXJuIHx8IHRoaXMucmVmcmVzaFRleHR1cmUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVRpbGluZ1RleHR1cmUoZmFsc2UpO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX190aWxlUGF0dGVybiA9IGNvbnRleHQuY3JlYXRlUGF0dGVybih0aGlzLnRpbGluZ1RleHR1cmUuc291cmNlLCAncmVwZWF0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgYmxlbmQgbW9kZVxyXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlICE9PSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRpbGVQb3NpdGlvbiA9IHRoaXMudGlsZVBvc2l0aW9uO1xyXG4gICAgdmFyIHRpbGVTY2FsZSA9IHRoaXMudGlsZVNjYWxlO1xyXG5cclxuICAgIHRpbGVQb3NpdGlvbi54ICU9IHRoaXMudGlsaW5nVGV4dHVyZS53aWR0aDtcclxuICAgIHRpbGVQb3NpdGlvbi55ICU9IHRoaXMudGlsaW5nVGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgLy8gb2Zmc2V0IC0gbWFrZSBzdXJlIHRvIGFjY291bnQgZm9yIHRoZSBhbmNob3IgcG9pbnQuLlxyXG4gICAgY29udGV4dC5zY2FsZSh0aWxlU2NhbGUueCx0aWxlU2NhbGUueSk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZSh0aWxlUG9zaXRpb24ueCArICh0aGlzLmFuY2hvci54ICogLXRoaXMuX3dpZHRoKSwgdGlsZVBvc2l0aW9uLnkgKyAodGhpcy5hbmNob3IueSAqIC10aGlzLl9oZWlnaHQpKTtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX190aWxlUGF0dGVybjtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KC10aWxlUG9zaXRpb24ueCxcclxuICAgICAgICAgICAgICAgICAgICAtdGlsZVBvc2l0aW9uLnksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggLyB0aWxlU2NhbGUueCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgLyB0aWxlU2NhbGUueSk7XHJcblxyXG4gICAgY29udGV4dC5zY2FsZSgxIC8gdGlsZVNjYWxlLngsIDEgLyB0aWxlU2NhbGUueSk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZSgtdGlsZVBvc2l0aW9uLnggKyAodGhpcy5hbmNob3IueCAqIHRoaXMuX3dpZHRoKSwgLXRpbGVQb3NpdGlvbi55ICsgKHRoaXMuYW5jaG9yLnkgKiB0aGlzLl9oZWlnaHQpKTtcclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4qIFJldHVybnMgdGhlIGZyYW1pbmcgcmVjdGFuZ2xlIG9mIHRoZSBzcHJpdGUgYXMgYSBUaW55LlJlY3RhbmdsZSBvYmplY3RcclxuKlxyXG4qIEBtZXRob2QgZ2V0Qm91bmRzXHJcbiogQHJldHVybiB7UmVjdGFuZ2xlfSB0aGUgZnJhbWluZyByZWN0YW5nbGVcclxuKi9cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGg7XHJcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEtdGhpcy5hbmNob3IueCk7XHJcbiAgICB2YXIgdzEgPSB3aWR0aCAqIC10aGlzLmFuY2hvci54O1xyXG5cclxuICAgIHZhciBoMCA9IGhlaWdodCAqICgxLXRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG4gICAgXHJcbiAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgIHZhciB5MSA9IGQgKiBoMSArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgdmFyIHgzID0gYSAqIHcwICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDQgPSAgYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTQgPSAgZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICBtaW5YID0geDEgPCBtaW5YID8geDEgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgIG1pblkgPSB5MSA8IG1pblkgPyB5MSA6IG1pblk7XHJcbiAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgbWF4WCA9IHgxID4gbWF4WCA/IHgxIDogbWF4WDtcclxuICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICBtYXhZID0geTEgPiBtYXhZID8geTEgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBXaGVuIHRoZSB0ZXh0dXJlIGlzIHVwZGF0ZWQsIHRoaXMgZXZlbnQgd2lsbCBmaXJlIHRvIHVwZGF0ZSB0aGUgc2NhbGUgYW5kIGZyYW1lXHJcbiAqXHJcbiAqIEBtZXRob2Qgb25UZXh0dXJlVXBkYXRlXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4qIFxyXG4qIEBtZXRob2QgZ2VuZXJhdGVUaWxpbmdUZXh0dXJlXHJcbiogXHJcbiogQHBhcmFtIGZvcmNlUG93ZXJPZlR3byB7Qm9vbGVhbn0gV2hldGhlciB3ZSB3YW50IHRvIGZvcmNlIHRoZSB0ZXh0dXJlIHRvIGJlIGEgcG93ZXIgb2YgdHdvXHJcbiovXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5nZW5lcmF0ZVRpbGluZ1RleHR1cmUgPSBmdW5jdGlvbihmb3JjZVBvd2VyT2ZUd28pXHJcbntcclxuICAgIGlmICghdGhpcy50ZXh0dXJlLmhhc0xvYWRlZCkgcmV0dXJuO1xyXG5cclxuICAgIHZhciB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlO1xyXG4gICAgdmFyIGZyYW1lID0gdGV4dHVyZS5mcmFtZTtcclxuICAgIHZhciB0YXJnZXRXaWR0aCwgdGFyZ2V0SGVpZ2h0O1xyXG5cclxuICAgIC8vICBDaGVjayB0aGF0IHRoZSBmcmFtZSBpcyB0aGUgc2FtZSBzaXplIGFzIHRoZSBiYXNlIHRleHR1cmUuXHJcbiAgICAvLyB2YXIgaXNGcmFtZSA9IGZyYW1lLndpZHRoICE9PSB0ZXh0dXJlLndpZHRoIHx8IGZyYW1lLmhlaWdodCAhPT0gdGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgLy8gdmFyIG5ld1RleHR1cmVSZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghZm9yY2VQb3dlck9mVHdvKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlmICh0ZXh0dXJlLmNyb3ApIC8vIGNvbW1lbnRlZCBiZWNhc3VlIGl0IGFsd2F5cyBwcmVzZW50XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICB0YXJnZXRXaWR0aCA9IHRleHR1cmUuY3JvcC53aWR0aDtcclxuICAgICAgICAgICAgdGFyZ2V0SGVpZ2h0ID0gdGV4dHVyZS5jcm9wLmhlaWdodDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGFyZ2V0V2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgICAgICAvLyAgICAgdGFyZ2V0SGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgIFxyXG4gICAgICAgIC8vIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgLy8gaWYgKHRleHR1cmUuY3JvcCkgLy8gY29tbWVudGVkIGJlY2FzdWUgaXQgYWx3YXlzIHByZXNlbnRcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIHRhcmdldFdpZHRoID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byh0ZXh0dXJlLmNyb3Aud2lkdGgpO1xyXG4gICAgICAgICAgICB0YXJnZXRIZWlnaHQgPSBUaW55LmdldE5leHRQb3dlck9mVHdvKHRleHR1cmUuY3JvcC5oZWlnaHQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRXaWR0aCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28oZnJhbWUud2lkdGgpO1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRIZWlnaHQgPSBUaW55LmdldE5leHRQb3dlck9mVHdvKGZyYW1lLmhlaWdodCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIEJhc2VUZXh0dXJlIGRpbWVuc2lvbnMgZG9uJ3QgbWF0Y2ggdGhlIHRleHR1cmUgZnJhbWUgdGhlbiB3ZSBuZWVkIGEgbmV3IHRleHR1cmUgYW55d2F5IGJlY2F1c2UgaXQncyBwYXJ0IG9mIGEgdGV4dHVyZSBhdGxhc1xyXG4gICAgICAgIC8vIGlmIChmcmFtZS53aWR0aCAhPT0gdGFyZ2V0V2lkdGggfHwgZnJhbWUuaGVpZ2h0ICE9PSB0YXJnZXRIZWlnaHQgfHwgdGV4dHVyZS53aWR0aCAhPT0gdGFyZ2V0V2lkdGggfHwgdGV4dHVyZS5oZWlnaHQgfHwgdGFyZ2V0SGVpZ2h0KSBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIChuZXdUZXh0dXJlUmVxdWlyZWQpXHJcbiAgICAvLyB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0J1ZmZlcjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSAmJiB0aGlzLnRpbGluZ1RleHR1cmUuaXNUaWxpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW52YXNCdWZmZXIgPSB0aGlzLnRpbGluZ1RleHR1cmUuY2FudmFzQnVmZmVyO1xyXG4gICAgICAgICAgICBjYW52YXNCdWZmZXIucmVzaXplKHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUud2lkdGggPSB0YXJnZXRXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmhlaWdodCA9IHRhcmdldEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXIgPSBjYW52YXNCdWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5pc1RpbGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW52YXNCdWZmZXIuY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLmNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRIZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnRpbGVTY2FsZU9mZnNldC54ID0gZnJhbWUud2lkdGggLyB0YXJnZXRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGVTY2FsZU9mZnNldC55ID0gZnJhbWUuaGVpZ2h0IC8gdGFyZ2V0SGVpZ2h0O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHRoaXMucmVmcmVzaFRleHR1cmUgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLnRpbGluZ1RleHR1cmUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbn07IiwiXHJcblRpbnkuVHdlZW5NYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVCeU9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHJcbiAgICB2YXIgdHdlZW5zID0gdGhpcy5ncm91cC5fdHdlZW5zO1xyXG4gICAgdmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModHdlZW5zKTtcclxuICAgIFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHR3ZWVuID0gdHdlZW5zW3R3ZWVuSWRzW2ldXTtcclxuXHJcbiAgICAgICAgaWYgKHR3ZWVuLl9vYmplY3QgPT09IG9iaikgdGhpcy5yZW1vdmUodHdlZW4pO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlxyXG5yZXF1aXJlKCcuL3N5c3RlbXMvVHdlZW4nKTtcclxucmVxdWlyZSgnLi9tYXRoL0VsbGlwc2UnKTtcclxucmVxdWlyZSgnLi9vYmplY3RzL1RpbGluZ1Nwcml0ZScpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==