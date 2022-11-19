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

__webpack_require__(/*! ./objects/TilingSprite */ "./plugins/extra/objects/TilingSprite.js");

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
       
        // newTextureRequired = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGx1Z2lucy9leHRyYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wbHVnaW5zL2V4dHJhL29iamVjdHMvVGlsaW5nU3ByaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxtQkFBTyxDQUFDLHVFQUF3QixFOzs7Ozs7Ozs7OztBQ0FoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0IsaUJBQWlCLE9BQU87QUFDeEIsa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRSIsImZpbGUiOiJwbHVnaW5zL2V4dHJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wbHVnaW5zL2V4dHJhL2luZGV4LmpzXCIpO1xuIiwicmVxdWlyZSgnLi9vYmplY3RzL1RpbGluZ1Nwcml0ZScpOyIsIi8qKlxyXG4gKiBAYXV0aG9yIE1hdCBHcm92ZXMgaHR0cDovL21hdGdyb3Zlcy5jb20vXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgdGlsaW5nIHNwcml0ZSBpcyBhIGZhc3Qgd2F5IG9mIHJlbmRlcmluZyBhIHRpbGluZyBpbWFnZVxyXG4gKlxyXG4gKiBAY2xhc3MgVGlsaW5nU3ByaXRlXHJcbiAqIEBleHRlbmRzIFNwcml0ZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHRleHR1cmUge1RleHR1cmV9IHRoZSB0ZXh0dXJlIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqIEBwYXJhbSB3aWR0aCB7TnVtYmVyfSAgdGhlIHdpZHRoIG9mIHRoZSB0aWxpbmcgc3ByaXRlXHJcbiAqIEBwYXJhbSBoZWlnaHQge051bWJlcn0gdGhlIGhlaWdodCBvZiB0aGUgdGlsaW5nIHNwcml0ZVxyXG4gKi9cclxuVGlueS5UaWxpbmdTcHJpdGUgPSBmdW5jdGlvbih0ZXh0dXJlLCBrZXksIHdpZHRoLCBoZWlnaHQpXHJcbntcclxuICAgIFRpbnkuU3ByaXRlLmNhbGwoIHRoaXMsIHRleHR1cmUsIGtleSApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHdpdGggb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgd2lkdGhcclxuICAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoIHx8IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoZWlnaHQgb2YgdGhlIHRpbGluZyBzcHJpdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzY2FsaW5nIG9mIHRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHRpbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVTY2FsZVxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBuZXcgVGlueS5Qb2ludCgxLDEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBwb2ludCB0aGF0IHJlcHJlc2VudHMgdGhlIHNjYWxlIG9mIHRoZSB0ZXh0dXJlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB0aWxlU2NhbGVPZmZzZXRcclxuICAgICAqIEB0eXBlIFBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGlsZVNjYWxlT2Zmc2V0ID0gbmV3IFRpbnkuUG9pbnQoMSwxKTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb2Zmc2V0IHBvc2l0aW9uIG9mIHRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHRpbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHRpbGVQb3NpdGlvblxyXG4gICAgICogQHR5cGUgUG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBuZXcgVGlueS5Qb2ludCgwLDApO1xyXG5cclxufTtcclxuXHJcbi8vIGNvbnN0cnVjdG9yXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5TcHJpdGUucHJvdG90eXBlKTtcclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5UaWxpbmdTcHJpdGU7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSB3aWR0aCBvZiB0aGUgc3ByaXRlLCBzZXR0aW5nIHRoaXMgd2lsbCBhY3R1YWxseSBtb2RpZnkgdGhlIHNjYWxlIHRvIGFjaGlldmUgdGhlIHZhbHVlIHNldFxyXG4gKlxyXG4gKiBAcHJvcGVydHkgd2lkdGhcclxuICogQHR5cGUgTnVtYmVyXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLCAnd2lkdGgnLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogVGhlIGhlaWdodCBvZiB0aGUgVGlsaW5nU3ByaXRlLCBzZXR0aW5nIHRoaXMgd2lsbCBhY3R1YWxseSBtb2RpZnkgdGhlIHNjYWxlIHRvIGFjaGlldmUgdGhlIHZhbHVlIHNldFxyXG4gKlxyXG4gKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAqIEB0eXBlIE51bWJlclxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24odGV4dHVyZSwga2V5KVxyXG57XHJcbiAgICB2YXIgdXBkYXRlZCA9IFRpbnkuU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlLmNhbGwodGhpcywgdGV4dHVyZSwga2V5KTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2hUZXh0dXJlID0gdXBkYXRlZDtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKXJldHVybjtcclxuICAgIFxyXG4gICAgdmFyIGNvbnRleHQgPSByZW5kZXJTZXNzaW9uLmNvbnRleHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG4gICAgXHJcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuICAgIFxyXG4gICAgdmFyIHJlc29sdXRpb24gPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgY29udGV4dC5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtLmEgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmIgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmMgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLmQgKiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnR4ICogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50eSAqIHJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmICghdGhpcy5fX3RpbGVQYXR0ZXJuIHx8IHRoaXMucmVmcmVzaFRleHR1cmUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVRpbGluZ1RleHR1cmUoZmFsc2UpO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX190aWxlUGF0dGVybiA9IGNvbnRleHQuY3JlYXRlUGF0dGVybih0aGlzLnRpbGluZ1RleHR1cmUuc291cmNlLCAncmVwZWF0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgYmxlbmQgbW9kZVxyXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlICE9PSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcbiAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRpbGVQb3NpdGlvbiA9IHRoaXMudGlsZVBvc2l0aW9uO1xyXG4gICAgdmFyIHRpbGVTY2FsZSA9IHRoaXMudGlsZVNjYWxlO1xyXG5cclxuICAgIHRpbGVQb3NpdGlvbi54ICU9IHRoaXMudGlsaW5nVGV4dHVyZS53aWR0aDtcclxuICAgIHRpbGVQb3NpdGlvbi55ICU9IHRoaXMudGlsaW5nVGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgLy8gb2Zmc2V0IC0gbWFrZSBzdXJlIHRvIGFjY291bnQgZm9yIHRoZSBhbmNob3IgcG9pbnQuLlxyXG4gICAgY29udGV4dC5zY2FsZSh0aWxlU2NhbGUueCx0aWxlU2NhbGUueSk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZSh0aWxlUG9zaXRpb24ueCArICh0aGlzLmFuY2hvci54ICogLXRoaXMuX3dpZHRoKSwgdGlsZVBvc2l0aW9uLnkgKyAodGhpcy5hbmNob3IueSAqIC10aGlzLl9oZWlnaHQpKTtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX190aWxlUGF0dGVybjtcclxuXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KC10aWxlUG9zaXRpb24ueCxcclxuICAgICAgICAgICAgICAgICAgICAtdGlsZVBvc2l0aW9uLnksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggLyB0aWxlU2NhbGUueCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgLyB0aWxlU2NhbGUueSk7XHJcblxyXG4gICAgY29udGV4dC5zY2FsZSgxIC8gdGlsZVNjYWxlLngsIDEgLyB0aWxlU2NhbGUueSk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZSgtdGlsZVBvc2l0aW9uLnggKyAodGhpcy5hbmNob3IueCAqIHRoaXMuX3dpZHRoKSwgLXRpbGVQb3NpdGlvbi55ICsgKHRoaXMuYW5jaG9yLnkgKiB0aGlzLl9oZWlnaHQpKTtcclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4qIFJldHVybnMgdGhlIGZyYW1pbmcgcmVjdGFuZ2xlIG9mIHRoZSBzcHJpdGUgYXMgYSBUaW55LlJlY3RhbmdsZSBvYmplY3RcclxuKlxyXG4qIEBtZXRob2QgZ2V0Qm91bmRzXHJcbiogQHJldHVybiB7UmVjdGFuZ2xlfSB0aGUgZnJhbWluZyByZWN0YW5nbGVcclxuKi9cclxuVGlueS5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGg7XHJcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xyXG5cclxuICAgIHZhciB3MCA9IHdpZHRoICogKDEtdGhpcy5hbmNob3IueCk7XHJcbiAgICB2YXIgdzEgPSB3aWR0aCAqIC10aGlzLmFuY2hvci54O1xyXG5cclxuICAgIHZhciBoMCA9IGhlaWdodCAqICgxLXRoaXMuYW5jaG9yLnkpO1xyXG4gICAgdmFyIGgxID0gaGVpZ2h0ICogLXRoaXMuYW5jaG9yLnk7XHJcblxyXG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gdGhpcy53b3JsZFRyYW5zZm9ybTtcclxuXHJcbiAgICB2YXIgYSA9IHdvcmxkVHJhbnNmb3JtLmE7XHJcbiAgICB2YXIgYiA9IHdvcmxkVHJhbnNmb3JtLmI7XHJcbiAgICB2YXIgYyA9IHdvcmxkVHJhbnNmb3JtLmM7XHJcbiAgICB2YXIgZCA9IHdvcmxkVHJhbnNmb3JtLmQ7XHJcbiAgICB2YXIgdHggPSB3b3JsZFRyYW5zZm9ybS50eDtcclxuICAgIHZhciB0eSA9IHdvcmxkVHJhbnNmb3JtLnR5O1xyXG4gICAgXHJcbiAgICB2YXIgeDEgPSBhICogdzEgKyBjICogaDEgKyB0eDtcclxuICAgIHZhciB5MSA9IGQgKiBoMSArIGIgKiB3MSArIHR5O1xyXG5cclxuICAgIHZhciB4MiA9IGEgKiB3MCArIGMgKiBoMSArIHR4O1xyXG4gICAgdmFyIHkyID0gZCAqIGgxICsgYiAqIHcwICsgdHk7XHJcblxyXG4gICAgdmFyIHgzID0gYSAqIHcwICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTMgPSBkICogaDAgKyBiICogdzAgKyB0eTtcclxuXHJcbiAgICB2YXIgeDQgPSAgYSAqIHcxICsgYyAqIGgwICsgdHg7XHJcbiAgICB2YXIgeTQgPSAgZCAqIGgwICsgYiAqIHcxICsgdHk7XHJcblxyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHk7XHJcbiAgICB2YXIgbWF4WSA9IC1JbmZpbml0eTtcclxuXHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5O1xyXG4gICAgdmFyIG1pblkgPSBJbmZpbml0eTtcclxuXHJcbiAgICBtaW5YID0geDEgPCBtaW5YID8geDEgOiBtaW5YO1xyXG4gICAgbWluWCA9IHgyIDwgbWluWCA/IHgyIDogbWluWDtcclxuICAgIG1pblggPSB4MyA8IG1pblggPyB4MyA6IG1pblg7XHJcbiAgICBtaW5YID0geDQgPCBtaW5YID8geDQgOiBtaW5YO1xyXG5cclxuICAgIG1pblkgPSB5MSA8IG1pblkgPyB5MSA6IG1pblk7XHJcbiAgICBtaW5ZID0geTIgPCBtaW5ZID8geTIgOiBtaW5ZO1xyXG4gICAgbWluWSA9IHkzIDwgbWluWSA/IHkzIDogbWluWTtcclxuICAgIG1pblkgPSB5NCA8IG1pblkgPyB5NCA6IG1pblk7XHJcblxyXG4gICAgbWF4WCA9IHgxID4gbWF4WCA/IHgxIDogbWF4WDtcclxuICAgIG1heFggPSB4MiA+IG1heFggPyB4MiA6IG1heFg7XHJcbiAgICBtYXhYID0geDMgPiBtYXhYID8geDMgOiBtYXhYO1xyXG4gICAgbWF4WCA9IHg0ID4gbWF4WCA/IHg0IDogbWF4WDtcclxuXHJcbiAgICBtYXhZID0geTEgPiBtYXhZID8geTEgOiBtYXhZO1xyXG4gICAgbWF4WSA9IHkyID4gbWF4WSA/IHkyIDogbWF4WTtcclxuICAgIG1heFkgPSB5MyA+IG1heFkgPyB5MyA6IG1heFk7XHJcbiAgICBtYXhZID0geTQgPiBtYXhZID8geTQgOiBtYXhZO1xyXG5cclxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XHJcblxyXG4gICAgYm91bmRzLnggPSBtaW5YO1xyXG4gICAgYm91bmRzLndpZHRoID0gbWF4WCAtIG1pblg7XHJcblxyXG4gICAgYm91bmRzLnkgPSBtaW5ZO1xyXG4gICAgYm91bmRzLmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG5cclxuICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHNvIHRoYXQgaWYgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhZ2FpbiBpbiB0aGUgcmVuZGVyIGN5Y2xlIHdlIGRvIG5vdCBoYXZlIHRvIHJlY2FsY3VsYXRlXHJcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gYm91bmRzO1xyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbn07XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBXaGVuIHRoZSB0ZXh0dXJlIGlzIHVwZGF0ZWQsIHRoaXMgZXZlbnQgd2lsbCBmaXJlIHRvIHVwZGF0ZSB0aGUgc2NhbGUgYW5kIGZyYW1lXHJcbiAqXHJcbiAqIEBtZXRob2Qgb25UZXh0dXJlVXBkYXRlXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4qIFxyXG4qIEBtZXRob2QgZ2VuZXJhdGVUaWxpbmdUZXh0dXJlXHJcbiogXHJcbiogQHBhcmFtIGZvcmNlUG93ZXJPZlR3byB7Qm9vbGVhbn0gV2hldGhlciB3ZSB3YW50IHRvIGZvcmNlIHRoZSB0ZXh0dXJlIHRvIGJlIGEgcG93ZXIgb2YgdHdvXHJcbiovXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5nZW5lcmF0ZVRpbGluZ1RleHR1cmUgPSBmdW5jdGlvbihmb3JjZVBvd2VyT2ZUd28pXHJcbntcclxuICAgIGlmICghdGhpcy50ZXh0dXJlLmhhc0xvYWRlZCkgcmV0dXJuO1xyXG5cclxuICAgIHZhciB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlO1xyXG4gICAgdmFyIGZyYW1lID0gdGV4dHVyZS5mcmFtZTtcclxuICAgIHZhciB0YXJnZXRXaWR0aCwgdGFyZ2V0SGVpZ2h0O1xyXG5cclxuICAgIC8vICBDaGVjayB0aGF0IHRoZSBmcmFtZSBpcyB0aGUgc2FtZSBzaXplIGFzIHRoZSBiYXNlIHRleHR1cmUuXHJcbiAgICAvLyB2YXIgaXNGcmFtZSA9IGZyYW1lLndpZHRoICE9PSB0ZXh0dXJlLndpZHRoIHx8IGZyYW1lLmhlaWdodCAhPT0gdGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgLy8gdmFyIG5ld1RleHR1cmVSZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghZm9yY2VQb3dlck9mVHdvKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0ZXh0dXJlLmNyb3ApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YXJnZXRXaWR0aCA9IHRleHR1cmUuY3JvcC53aWR0aDtcclxuICAgICAgICAgICAgdGFyZ2V0SGVpZ2h0ID0gdGV4dHVyZS5jcm9wLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFyZ2V0V2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgICAgICAgICAgdGFyZ2V0SGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIC8vIG5ld1RleHR1cmVSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRleHR1cmUuY3JvcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhcmdldFdpZHRoID0gVGlueS5nZXROZXh0UG93ZXJPZlR3byh0ZXh0dXJlLmNyb3Aud2lkdGgpO1xyXG4gICAgICAgICAgICB0YXJnZXRIZWlnaHQgPSBUaW55LmdldE5leHRQb3dlck9mVHdvKHRleHR1cmUuY3JvcC5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YXJnZXRXaWR0aCA9IFRpbnkuZ2V0TmV4dFBvd2VyT2ZUd28oZnJhbWUud2lkdGgpO1xyXG4gICAgICAgICAgICB0YXJnZXRIZWlnaHQgPSBUaW55LmdldE5leHRQb3dlck9mVHdvKGZyYW1lLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAgSWYgdGhlIEJhc2VUZXh0dXJlIGRpbWVuc2lvbnMgZG9uJ3QgbWF0Y2ggdGhlIHRleHR1cmUgZnJhbWUgdGhlbiB3ZSBuZWVkIGEgbmV3IHRleHR1cmUgYW55d2F5IGJlY2F1c2UgaXQncyBwYXJ0IG9mIGEgdGV4dHVyZSBhdGxhc1xyXG4gICAgICAgIC8vIGlmIChmcmFtZS53aWR0aCAhPT0gdGFyZ2V0V2lkdGggfHwgZnJhbWUuaGVpZ2h0ICE9PSB0YXJnZXRIZWlnaHQgfHwgdGV4dHVyZS53aWR0aCAhPT0gdGFyZ2V0V2lkdGggfHwgdGV4dHVyZS5oZWlnaHQgfHwgdGFyZ2V0SGVpZ2h0KSBuZXdUZXh0dXJlUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIChuZXdUZXh0dXJlUmVxdWlyZWQpXHJcbiAgICAvLyB7XHJcbiAgICAgICAgdmFyIGNhbnZhc0J1ZmZlcjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGlsaW5nVGV4dHVyZSAmJiB0aGlzLnRpbGluZ1RleHR1cmUuaXNUaWxpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW52YXNCdWZmZXIgPSB0aGlzLnRpbGluZ1RleHR1cmUuY2FudmFzQnVmZmVyO1xyXG4gICAgICAgICAgICBjYW52YXNCdWZmZXIucmVzaXplKHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbGluZ1RleHR1cmUud2lkdGggPSB0YXJnZXRXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmhlaWdodCA9IHRhcmdldEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FudmFzQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gVGlueS5UZXh0dXJlLmZyb21DYW52YXMoY2FudmFzQnVmZmVyLmNhbnZhcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXIgPSBjYW52YXNCdWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudGlsaW5nVGV4dHVyZS5pc1RpbGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW52YXNCdWZmZXIuY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLmNyb3AueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRIZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnRpbGVTY2FsZU9mZnNldC54ID0gZnJhbWUud2lkdGggLyB0YXJnZXRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGVTY2FsZU9mZnNldC55ID0gZnJhbWUuaGVpZ2h0IC8gdGFyZ2V0SGVpZ2h0O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHRoaXMucmVmcmVzaFRleHR1cmUgPSBmYWxzZTtcclxufTtcclxuXHJcblRpbnkuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIFRpbnkuU3ByaXRlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy50aWxlU2NhbGUgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlU2NhbGVPZmZzZXQgPSBudWxsO1xyXG4gICAgdGhpcy50aWxlUG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLnRpbGluZ1RleHR1cmUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50aWxpbmdUZXh0dXJlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==