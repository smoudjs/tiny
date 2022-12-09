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
/******/ 	return __webpack_require__(__webpack_require__.s = "./plugins/extra/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./plugins/extra/index.js":
/*!********************************!*\
  !*** ./plugins/extra/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./math/Ellipse */ "./plugins/extra/math/Ellipse.js");
__webpack_require__(/*! ./objects/TilingSprite */ "./plugins/extra/objects/TilingSprite.js");

/***/ }),

/***/ "./plugins/extra/math/Ellipse.js":
/*!***************************************!*\
  !*** ./plugins/extra/math/Ellipse.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGx1Z2lucy9leHRyYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wbHVnaW5zL2V4dHJhL21hdGgvRWxsaXBzZS5qcyIsIndlYnBhY2s6Ly8vLi9wbHVnaW5zL2V4dHJhL29iamVjdHMvVGlsaW5nU3ByaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxtQkFBTyxDQUFDLHVEQUFnQjtBQUN4QixtQkFBTyxDQUFDLHVFQUF3QixFOzs7Ozs7Ozs7Ozs7QUNBaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQixpQkFBaUIsT0FBTztBQUN4QixrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFFBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFIiwiZmlsZSI6InBsdWdpbnMvZXh0cmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BsdWdpbnMvZXh0cmEvaW5kZXguanNcIik7XG4iLCJyZXF1aXJlKCcuL21hdGgvRWxsaXBzZScpO1xyXG5yZXF1aXJlKCcuL29iamVjdHMvVGlsaW5nU3ByaXRlJyk7IiwiXHJcblRpbnkuRWxsaXBzZSA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG4gICAgeCA9IHggfHwgMDtcclxuICAgIHkgPSB5IHx8IDA7XHJcbiAgICB3aWR0aCA9IHdpZHRoIHx8IDA7XHJcbiAgICBoZWlnaHQgPSBoZWlnaHQgfHwgMDtcclxuXHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG5cclxuICAgIHRoaXMudHlwZSA9IFRpbnkuUHJpbWl0aXZlcy5FTElQXHJcbn07XHJcblxyXG5UaW55LkVsbGlwc2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5FbGxpcHNlO1xyXG5cclxuXHJcblRpbnkuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdFbGxpcHNlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodClcclxue1xyXG4gICAgdGhpcy5kcmF3U2hhcGUobmV3IFRpbnkuRWxsaXBzZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07IiwiLyoqXHJcbiAqIEBhdXRob3IgTWF0IEdyb3ZlcyBodHRwOi8vbWF0Z3JvdmVzLmNvbS9cclxuICovXHJcblxyXG4vKipcclxuICogQSB0aWxpbmcgc3ByaXRlIGlzIGEgZmFzdCB3YXkgb2YgcmVuZGVyaW5nIGEgdGlsaW5nIGltYWdlXHJcbiAqXHJcbiAqIEBjbGFzcyBUaWxpbmdTcHJpdGVcclxuICogQGV4dGVuZHMgU3ByaXRlXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0gdGV4dHVyZSB7VGV4dHVyZX0gdGhlIHRleHR1cmUgb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICogQHBhcmFtIHdpZHRoIHtOdW1iZXJ9ICB0aGUgd2lkdGggb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICogQHBhcmFtIGhlaWdodCB7TnVtYmVyfSB0aGUgaGVpZ2h0IG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqL1xyXG5UaW55LlRpbGluZ1Nwcml0ZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSwgd2lkdGgsIGhlaWdodClcclxue1xyXG4gICAgVGlueS5TcHJpdGUuY2FsbCggdGhpcywgdGV4dHVyZSwga2V5ICk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgd2l0aCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxyXG4gICAgICogQHR5cGUgTnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX3dpZHRoID0gd2lkdGggfHwgMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGhlaWdodCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSBoZWlnaHRcclxuICAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQgfHwgMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNjYWxpbmcgb2YgdGhlIGltYWdlIHRoYXQgaXMgYmVpbmcgdGlsZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgdGlsZVNjYWxlXHJcbiAgICAgKiBAdHlwZSBQb2ludFxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpbGVTY2FsZSA9IG5ldyBUaW55LlBvaW50KDEsMSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHBvaW50IHRoYXQgcmVwcmVzZW50cyB0aGUgc2NhbGUgb2YgdGhlIHRleHR1cmUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVTY2FsZU9mZnNldFxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQgPSBuZXcgVGlueS5Qb2ludCgxLDEpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvZmZzZXQgcG9zaXRpb24gb2YgdGhlIGltYWdlIHRoYXQgaXMgYmVpbmcgdGlsZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgdGlsZVBvc2l0aW9uXHJcbiAgICAgKiBAdHlwZSBQb2ludFxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpbGVQb3NpdGlvbiA9IG5ldyBUaW55LlBvaW50KDAsMCk7XHJcblxyXG59O1xyXG5cclxuLy8gY29uc3RydWN0b3JcclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LlNwcml0ZS5wcm90b3R5cGUpO1xyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlRpbGluZ1Nwcml0ZTtcclxuXHJcblxyXG4vKipcclxuICogVGhlIHdpZHRoIG9mIHRoZSBzcHJpdGUsIHNldHRpbmcgdGhpcyB3aWxsIGFjdHVhbGx5IG1vZGlmeSB0aGUgc2NhbGUgdG8gYWNoaWV2ZSB0aGUgdmFsdWUgc2V0XHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSB3aWR0aFxyXG4gKiBAdHlwZSBOdW1iZXJcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUsICd3aWR0aCcsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgaGVpZ2h0IG9mIHRoZSBUaWxpbmdTcHJpdGUsIHNldHRpbmcgdGhpcyB3aWxsIGFjdHVhbGx5IG1vZGlmeSB0aGUgc2NhbGUgdG8gYWNoaWV2ZSB0aGUgdmFsdWUgc2V0XHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSBoZWlnaHRcclxuICogQHR5cGUgTnVtYmVyXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX2hlaWdodDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbih0ZXh0dXJlLCBrZXkpXHJcbntcclxuICAgIHZhciB1cGRhdGVkID0gVGlueS5TcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmUuY2FsbCh0aGlzLCB0ZXh0dXJlLCBrZXkpO1xyXG5cclxuICAgIHRoaXMucmVmcmVzaFRleHR1cmUgPSB1cGRhdGVkO1xyXG59O1xyXG5cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApcmV0dXJuO1xyXG4gICAgXHJcbiAgICB2YXIgY29udGV4dCA9IHJlbmRlclNlc3Npb24uY29udGV4dDtcclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcbiAgICBcclxuICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG4gICAgXHJcbiAgICB2YXIgcmVzb2x1dGlvbiA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0uYSAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYiAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uYyAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZCAqIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udHggKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR5ICogcmVzb2x1dGlvbik7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9fdGlsZVBhdHRlcm4gfHwgdGhpcy5yZWZyZXNoVGV4dHVyZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlVGlsaW5nVGV4dHVyZShmYWxzZSk7XHJcbiAgICBcclxuICAgICAgICBpZiAodGhpcy50aWxpbmdUZXh0dXJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fX3RpbGVQYXR0ZXJuID0gY29udGV4dC5jcmVhdGVQYXR0ZXJuKHRoaXMudGlsaW5nVGV4dHVyZS5zb3VyY2UsICdyZXBlYXQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBibGVuZCBtb2RlXHJcbiAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSlcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcclxuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGlsZVBvc2l0aW9uID0gdGhpcy50aWxlUG9zaXRpb247XHJcbiAgICB2YXIgdGlsZVNjYWxlID0gdGhpcy50aWxlU2NhbGU7XHJcblxyXG4gICAgdGlsZVBvc2l0aW9uLnggJT0gdGhpcy50aWxpbmdUZXh0dXJlLndpZHRoO1xyXG4gICAgdGlsZVBvc2l0aW9uLnkgJT0gdGhpcy50aWxpbmdUZXh0dXJlLmhlaWdodDtcclxuXHJcbiAgICAvLyBvZmZzZXQgLSBtYWtlIHN1cmUgdG8gYWNjb3VudCBmb3IgdGhlIGFuY2hvciBwb2ludC4uXHJcbiAgICBjb250ZXh0LnNjYWxlKHRpbGVTY2FsZS54LHRpbGVTY2FsZS55KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKHRpbGVQb3NpdGlvbi54ICsgKHRoaXMuYW5jaG9yLnggKiAtdGhpcy5fd2lkdGgpLCB0aWxlUG9zaXRpb24ueSArICh0aGlzLmFuY2hvci55ICogLXRoaXMuX2hlaWdodCkpO1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fX3RpbGVQYXR0ZXJuO1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFJlY3QoLXRpbGVQb3NpdGlvbi54LFxyXG4gICAgICAgICAgICAgICAgICAgIC10aWxlUG9zaXRpb24ueSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCAvIHRpbGVTY2FsZS54LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCAvIHRpbGVTY2FsZS55KTtcclxuXHJcbiAgICBjb250ZXh0LnNjYWxlKDEgLyB0aWxlU2NhbGUueCwgMSAvIHRpbGVTY2FsZS55KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKC10aWxlUG9zaXRpb24ueCArICh0aGlzLmFuY2hvci54ICogdGhpcy5fd2lkdGgpLCAtdGlsZVBvc2l0aW9uLnkgKyAodGhpcy5hbmNob3IueSAqIHRoaXMuX2hlaWdodCkpO1xyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucG9wTWFzayhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiogUmV0dXJucyB0aGUgZnJhbWluZyByZWN0YW5nbGUgb2YgdGhlIHNwcml0ZSBhcyBhIFRpbnkuUmVjdGFuZ2xlIG9iamVjdFxyXG4qXHJcbiogQG1ldGhvZCBnZXRCb3VuZHNcclxuKiBAcmV0dXJuIHtSZWN0YW5nbGV9IHRoZSBmcmFtaW5nIHJlY3RhbmdsZVxyXG4qL1xyXG5UaW55LlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgd2lkdGggPSB0aGlzLl93aWR0aDtcclxuICAgIHZhciBoZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XHJcblxyXG4gICAgdmFyIHcwID0gd2lkdGggKiAoMS10aGlzLmFuY2hvci54KTtcclxuICAgIHZhciB3MSA9IHdpZHRoICogLXRoaXMuYW5jaG9yLng7XHJcblxyXG4gICAgdmFyIGgwID0gaGVpZ2h0ICogKDEtdGhpcy5hbmNob3IueSk7XHJcbiAgICB2YXIgaDEgPSBoZWlnaHQgKiAtdGhpcy5hbmNob3IueTtcclxuXHJcbiAgICB2YXIgd29ybGRUcmFuc2Zvcm0gPSB0aGlzLndvcmxkVHJhbnNmb3JtO1xyXG5cclxuICAgIHZhciBhID0gd29ybGRUcmFuc2Zvcm0uYTtcclxuICAgIHZhciBiID0gd29ybGRUcmFuc2Zvcm0uYjtcclxuICAgIHZhciBjID0gd29ybGRUcmFuc2Zvcm0uYztcclxuICAgIHZhciBkID0gd29ybGRUcmFuc2Zvcm0uZDtcclxuICAgIHZhciB0eCA9IHdvcmxkVHJhbnNmb3JtLnR4O1xyXG4gICAgdmFyIHR5ID0gd29ybGRUcmFuc2Zvcm0udHk7XHJcbiAgICBcclxuICAgIHZhciB4MSA9IGEgKiB3MSArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkxID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIHgyID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XHJcbiAgICB2YXIgeTIgPSBkICogaDEgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDMgPSBhICogdzAgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5MyA9IGQgKiBoMCArIGIgKiB3MCArIHR5O1xyXG5cclxuICAgIHZhciB4NCA9ICBhICogdzEgKyBjICogaDAgKyB0eDtcclxuICAgIHZhciB5NCA9ICBkICogaDAgKyBiICogdzEgKyB0eTtcclxuXHJcbiAgICB2YXIgbWF4WCA9IC1JbmZpbml0eTtcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5O1xyXG5cclxuICAgIHZhciBtaW5YID0gSW5maW5pdHk7XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xyXG5cclxuICAgIG1pblggPSB4MSA8IG1pblggPyB4MSA6IG1pblg7XHJcbiAgICBtaW5YID0geDIgPCBtaW5YID8geDIgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgzIDwgbWluWCA/IHgzIDogbWluWDtcclxuICAgIG1pblggPSB4NCA8IG1pblggPyB4NCA6IG1pblg7XHJcblxyXG4gICAgbWluWSA9IHkxIDwgbWluWSA/IHkxIDogbWluWTtcclxuICAgIG1pblkgPSB5MiA8IG1pblkgPyB5MiA6IG1pblk7XHJcbiAgICBtaW5ZID0geTMgPCBtaW5ZID8geTMgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHk0IDwgbWluWSA/IHk0IDogbWluWTtcclxuXHJcbiAgICBtYXhYID0geDEgPiBtYXhYID8geDEgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHgyID4gbWF4WCA/IHgyIDogbWF4WDtcclxuICAgIG1heFggPSB4MyA+IG1heFggPyB4MyA6IG1heFg7XHJcbiAgICBtYXhYID0geDQgPiBtYXhYID8geDQgOiBtYXhYO1xyXG5cclxuICAgIG1heFkgPSB5MSA+IG1heFkgPyB5MSA6IG1heFk7XHJcbiAgICBtYXhZID0geTIgPiBtYXhZID8geTIgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkzID4gbWF4WSA/IHkzIDogbWF4WTtcclxuICAgIG1heFkgPSB5NCA+IG1heFkgPyB5NCA6IG1heFk7XHJcblxyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcclxuXHJcbiAgICBib3VuZHMueCA9IG1pblg7XHJcbiAgICBib3VuZHMud2lkdGggPSBtYXhYIC0gbWluWDtcclxuXHJcbiAgICBib3VuZHMueSA9IG1pblk7XHJcbiAgICBib3VuZHMuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcblxyXG4gICAgLy8gc3RvcmUgYSByZWZlcmVuY2Ugc28gdGhhdCBpZiB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGFnYWluIGluIHRoZSByZW5kZXIgY3ljbGUgd2UgZG8gbm90IGhhdmUgdG8gcmVjYWxjdWxhdGVcclxuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBib3VuZHM7XHJcblxyXG4gICAgcmV0dXJuIGJvdW5kcztcclxufTtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFdoZW4gdGhlIHRleHR1cmUgaXMgdXBkYXRlZCwgdGhpcyBldmVudCB3aWxsIGZpcmUgdG8gdXBkYXRlIHRoZSBzY2FsZSBhbmQgZnJhbWVcclxuICpcclxuICogQG1ldGhvZCBvblRleHR1cmVVcGRhdGVcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiogXHJcbiogQG1ldGhvZCBnZW5lcmF0ZVRpbGluZ1RleHR1cmVcclxuKiBcclxuKiBAcGFyYW0gZm9yY2VQb3dlck9mVHdvIHtCb29sZWFufSBXaGV0aGVyIHdlIHdhbnQgdG8gZm9yY2UgdGhlIHRleHR1cmUgdG8gYmUgYSBwb3dlciBvZiB0d29cclxuKi9cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdlbmVyYXRlVGlsaW5nVGV4dHVyZSA9IGZ1bmN0aW9uKGZvcmNlUG93ZXJPZlR3bylcclxue1xyXG4gICAgaWYgKCF0aGlzLnRleHR1cmUuaGFzTG9hZGVkKSByZXR1cm47XHJcblxyXG4gICAgdmFyIHRleHR1cmUgPSB0aGlzLnRleHR1cmU7XHJcbiAgICB2YXIgZnJhbWUgPSB0ZXh0dXJlLmZyYW1lO1xyXG4gICAgdmFyIHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQ7XHJcblxyXG4gICAgLy8gIENoZWNrIHRoYXQgdGhlIGZyYW1lIGlzIHRoZSBzYW1lIHNpemUgYXMgdGhlIGJhc2UgdGV4dHVyZS5cclxuICAgIC8vIHZhciBpc0ZyYW1lID0gZnJhbWUud2lkdGggIT09IHRleHR1cmUud2lkdGggfHwgZnJhbWUuaGVpZ2h0ICE9PSB0ZXh0dXJlLmhlaWdodDtcclxuXHJcbiAgICAvLyB2YXIgbmV3VGV4dHVyZVJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFmb3JjZVBvd2VyT2ZUd28pXHJcbiAgICB7XHJcbiAgICAgICAgLy8gaWYgKHRleHR1cmUuY3JvcCkgLy8gY29tbWVudGVkIGJlY2FzdWUgaXQgYWx3YXlzIHByZXNlbnRcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIHRhcmdldFdpZHRoID0gdGV4dHVyZS5jcm9wLndpZHRoO1xyXG4gICAgICAgICAgICB0YXJnZXRIZWlnaHQgPSB0ZXh0dXJlLmNyb3AuaGVpZ2h0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRXaWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgICAgIC8vICAgICB0YXJnZXRIZWlnaHQgPSBmcmFtZS5oZWlnaHQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgXHJcbiAgICAgICAgLy8gbmV3VGV4dHVyZVJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICAvLyBpZiAodGV4dHVyZS5jcm9wKSAvLyBjb21tZW50ZWQgYmVjYXN1ZSBpdCBhbHdheXMgcHJlc2VudFxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAgICAgdGFyZ2V0V2lkdGggPSBUaW55LmdldE5leHRQb3dlck9mVHdvKHRleHR1cmUuY3JvcC53aWR0aCk7XHJcbiAgICAgICAgICAgIHRhcmdldEhlaWdodCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28odGV4dHVyZS5jcm9wLmhlaWdodCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRhcmdldFdpZHRoID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byhmcmFtZS53aWR0aCk7XHJcbiAgICAgICAgLy8gICAgIHRhcmdldEhlaWdodCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28oZnJhbWUuaGVpZ2h0KTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vICBJZiB0aGUgQmFzZVRleHR1cmUgZGltZW5zaW9ucyBkb24ndCBtYXRjaCB0aGUgdGV4dHVyZSBmcmFtZSB0aGVuIHdlIG5lZWQgYSBuZXcgdGV4dHVyZSBhbnl3YXkgYmVjYXVzZSBpdCdzIHBhcnQgb2YgYSB0ZXh0dXJlIGF0bGFzXHJcbiAgICAgICAgLy8gaWYgKGZyYW1lLndpZHRoICE9PSB0YXJnZXRXaWR0aCB8fCBmcmFtZS5oZWlnaHQgIT09IHRhcmdldEhlaWdodCB8fCB0ZXh0dXJlLndpZHRoICE9PSB0YXJnZXRXaWR0aCB8fCB0ZXh0dXJlLmhlaWdodCB8fCB0YXJnZXRIZWlnaHQpIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKG5ld1RleHR1cmVSZXF1aXJlZClcclxuICAgIC8vIHtcclxuICAgICAgICB2YXIgY2FudmFzQnVmZmVyO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aWxpbmdUZXh0dXJlICYmIHRoaXMudGlsaW5nVGV4dHVyZS5pc1RpbGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbnZhc0J1ZmZlciA9IHRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXI7XHJcbiAgICAgICAgICAgIGNhbnZhc0J1ZmZlci5yZXNpemUodGFyZ2V0V2lkdGgsIHRhcmdldEhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS53aWR0aCA9IHRhcmdldFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUuaGVpZ2h0ID0gdGFyZ2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW52YXNCdWZmZXIgPSBuZXcgVGlueS5DYW52YXNCdWZmZXIodGFyZ2V0V2lkdGgsIHRhcmdldEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUgPSBUaW55LlRleHR1cmUuZnJvbUNhbnZhcyhjYW52YXNCdWZmZXIuY2FudmFzKTtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmNhbnZhc0J1ZmZlciA9IGNhbnZhc0J1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmlzVGlsaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbnZhc0J1ZmZlci5jb250ZXh0LmRyYXdJbWFnZSh0ZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5jcm9wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0LnggPSBmcmFtZS53aWR0aCAvIHRhcmdldFdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0LnkgPSBmcmFtZS5oZWlnaHQgLyB0YXJnZXRIZWlnaHQ7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoVGV4dHVyZSA9IGZhbHNlO1xyXG59O1xyXG5cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgVGlueS5TcHJpdGUucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnRpbGVTY2FsZSA9IG51bGw7XHJcbiAgICB0aGlzLnRpbGVTY2FsZU9mZnNldCA9IG51bGw7XHJcbiAgICB0aGlzLnRpbGVQb3NpdGlvbiA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUuZGVzdHJveSh0cnVlKTtcclxuICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxufTsiXSwic291cmNlUm9vdCI6IiJ9