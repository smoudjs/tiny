/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 340:
/***/ (function() {

// if (this._prevTint !== this.tint.int) {
//       this._boundsDirty = true;
//       this._prevTint = this.tint.int;
//   }

Object.assign(Tiny.Graphics.prototype, {
  /**
   * Useful function that returns a texture of the graphics object that can then be used to create sprites
   * This can be quite useful if your geometry is complicated and needs to be reused multiple times.
   *
   * @method generateTexture
   * @param resolution {Number} The resolution of the texture being generated
   * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
   * @return {Texture} a texture of the graphics object
   */
  generateTexture: function generateTexture(resolution, scaleMode) {
    resolution = resolution || 1;
    var bounds = this.getBounds();
    var canvasBuffer = new Tiny.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);
    var texture = new Tiny.Texture(canvasBuffer.canvas, scaleMode);
    texture.base.resolution = resolution;
    canvasBuffer.context.scale(resolution, resolution);
    canvasBuffer.context.translate(-bounds.x, -bounds.y);
    Tiny.CanvasGraphics.renderGraphics(this, canvasBuffer.context);
    return texture;
  },
  /**
   * Renders the object using the Canvas renderer
   *
   * @method renderCanvas
   * @param renderSession {RenderSession}
   * @private
   */
  renderCanvas: function renderCanvas(renderSession) {
    // if the sprite is not visible or the alpha is 0 then no need to render this element
    if (this.visible === false || this.alpha === 0 || this.isMask === true) return;
    if (this._cacheAsBitmap) {
      if (this.dirty || this.cachedSpriteDirty) {
        this._generateCachedSprite();

        // we will also need to update the texture
        this.updateCachedSpriteTexture();
        this.cachedSpriteDirty = false;
        this.dirty = false;
      }
      this._cachedSprite.alpha = this.alpha;
      Tiny.Sprite.prototype.renderCanvas.call(this._cachedSprite, renderSession);
      return;
    } else {
      var context = renderSession.context;
      var transform = this.worldTransform;
      if (this._prevTint !== this.tint["int"]) {
        this.dirty = true;
        this._prevTint = this.tint["int"];
      }
      if (this.blendMode !== renderSession.currentBlendMode) {
        renderSession.currentBlendMode = this.blendMode;
        context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
      }
      if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
      }
      var resolution = renderSession.resolution;
      context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution);
      Tiny.CanvasGraphics.renderGraphics(this, context);

      // simple render children!
      for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i]._renderCanvas(renderSession);
      }
      if (this._mask) {
        renderSession.maskManager.popMask(renderSession);
      }
    }
  },
  /**
   * Generates the cached sprite when the sprite has cacheAsBitmap = true
   *
   * @method _generateCachedSprite
   * @private
   */
  _generateCachedSprite: function _generateCachedSprite() {
    var bounds = this.getLocalBounds();
    if (!this._cachedSprite) {
      var canvasBuffer = new Tiny.CanvasBuffer(bounds.width, bounds.height);
      var texture = new Tiny.Texture(canvasBuffer.canvas);
      this._cachedSprite = new Tiny.Sprite(texture);
      this._cachedSprite.buffer = canvasBuffer;
      this._cachedSprite.worldTransform = this.worldTransform;
    } else {
      this._cachedSprite.buffer.resize(bounds.width, bounds.height);
    }

    // leverage the anchor to account for the offset of the element
    this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
    this._cachedSprite.anchor.y = -(bounds.y / bounds.height);

    // this._cachedSprite.buffer.context.save();
    this._cachedSprite.buffer.context.translate(-bounds.x, -bounds.y);

    // make sure we set the alpha of the graphics to 1 for the render..
    this.worldAlpha = 1;
    this.dirty = true;
    // now render the graphic..
    Tiny.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context);
    this._cachedSprite.alpha = this.alpha;
  },
  /**
   * Updates texture size based on canvas size
   *
   * @method updateCachedSpriteTexture
   * @private
   */
  updateCachedSpriteTexture: function updateCachedSpriteTexture() {
    var cachedSprite = this._cachedSprite;
    var texture = cachedSprite.texture;
    var canvas = cachedSprite.buffer.canvas;
    texture.base.width = canvas.width;
    texture.base.height = canvas.height;
    texture.crop.width = texture.frame.width = canvas.width;
    texture.crop.height = texture.frame.height = canvas.height;
    cachedSprite._width = canvas.width;
    cachedSprite._height = canvas.height;

    // update the dirty base textures
    texture.base.dirty();
  },
  /**
   * Destroys a previous cached sprite.
   *
   * @method destroyCachedSprite
   */
  destroyCachedSprite: function destroyCachedSprite() {
    this._cachedSprite.texture.destroy(true);

    // let the gc collect the unused sprite
    // TODO could be object pooled!
    this._cachedSprite = null;
  }
});

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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";

;// ./packages/canvas-graphics/CanvasGraphics.js
var CanvasGraphics = function CanvasGraphics() {};
CanvasGraphics.renderGraphics = function (graphics, context) {
  var worldAlpha = graphics.worldAlpha;
  if (graphics.dirty) {
    this.updateGraphicsTint(graphics);
    graphics.dirty = false;
  }
  for (var i = 0; i < graphics.graphicsData.length; i++) {
    var data = graphics.graphicsData[i];
    var shape = data.shape;
    var fillColor = data._fillTint;
    var lineColor = data._lineTint;
    context.lineWidth = data.lineWidth;
    if (data.type === Tiny.POLY) {
      context.beginPath();
      var points = shape.points;
      context.moveTo(points[0], points[1]);
      for (var j = 1; j < points.length / 2; j++) {
        context.lineTo(points[j * 2], points[j * 2 + 1]);
      }
      if (shape.closed) {
        context.lineTo(points[0], points[1]);
      }

      // if the first and last point are the same close the path - much neater :)
      if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
        context.closePath();
      }
      if (data.fill) {
        context.globalAlpha = fillColor.a * worldAlpha;
        context.fillStyle = fillColor.toStyle();
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = lineColor.a * worldAlpha;
        context.strokeStyle = lineColor.toStyle();
        context.stroke();
      }
    } else if (data.type === Tiny.RECT) {
      if (data.fillColor) {
        context.globalAlpha = fillColor.a * worldAlpha;
        context.fillStyle = fillColor.toStyle();
        context.fillRect(shape.x, shape.y, shape.width, shape.height);
      }
      if (data.lineWidth) {
        context.globalAlpha = lineColor.a * worldAlpha;
        context.strokeStyle = lineColor.toStyle();
        context.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
    } else if (data.type === Tiny.CIRC) {
      // TODO - need to be Undefined!
      context.beginPath();
      context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      context.closePath();
      if (data.fill) {
        context.globalAlpha = fillColor.a * worldAlpha;
        context.fillStyle = fillColor.toStyle();
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = lineColor.a * worldAlpha;
        context.strokeStyle = lineColor.toStyle();
        context.stroke();
      }
    } else if (data.type === Tiny.ELIP) {
      // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

      var w = shape.width * 2;
      var h = shape.height * 2;
      var x = shape.x - w / 2;
      var y = shape.y - h / 2;
      context.beginPath();
      var kappa = 0.5522848,
        ox = w / 2 * kappa,
        // control point offset horizontal
        oy = h / 2 * kappa,
        // control point offset vertical
        xe = x + w,
        // x-end
        ye = y + h,
        // y-end
        xm = x + w / 2,
        // x-middle
        ym = y + h / 2; // y-middle

      context.moveTo(x, ym);
      context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      context.closePath();
      if (data.fill) {
        context.globalAlpha = fillColor.a * worldAlpha;
        context.fillStyle = fillColor.toStyle();
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = lineColor.a * worldAlpha;
        context.strokeStyle = lineColor.toStyle();
        context.stroke();
      }
    } else if (data.type === Tiny.RREC) {
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
      if (data.fillColor) {
        context.globalAlpha = fillColor.a * worldAlpha;
        context.fillStyle = fillColor.toStyle();
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = lineColor.a * worldAlpha;
        context.strokeStyle = lineColor.toStyle();
        context.stroke();
      }
    }
    // else if (data.type === Tiny.RREC_LJOIN)
    // {
    //     var rx = shape.x;
    //     var ry = shape.y;
    //     var width = shape.width;
    //     var height = shape.height;
    //     var radius = shape.radius;

    //     if (data.fillColor)
    //     {
    //         context.globalAlpha = fillColor.a * worldAlpha;
    //         context.fillStyle = fillColor.toStyle();
    //         context.strokeStyle = fillColor;
    //     }

    //     context.lineJoin = "round";
    //     context.lineWidth = radius;

    //     context.strokeRect(rx + (radius / 2), ry + (radius / 2), width - radius, height - radius);
    //     context.fillRect(rx + (radius / 2), ry + (radius / 2), width - radius, height - radius);
    // }
  }
};
CanvasGraphics.renderGraphicsMask = function (graphics, context) {
  var len = graphics.graphicsData.length;
  if (len === 0) {
    return;
  }
  context.beginPath();
  for (var i = 0; i < len; i++) {
    var data = graphics.graphicsData[i];
    var shape = data.shape;
    if (data.type === Tiny.POLY) {
      var points = shape.points;
      context.moveTo(points[0], points[1]);
      for (var j = 1; j < points.length / 2; j++) {
        context.lineTo(points[j * 2], points[j * 2 + 1]);
      }

      // if the first and last point are the same close the path - much neater :)
      if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
        context.closePath();
      }
    } else if (data.type === Tiny.RECT) {
      context.rect(shape.x, shape.y, shape.width, shape.height);
      context.closePath();
    } else if (data.type === Tiny.CIRC) {
      // TODO - need to be Undefined!
      context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      context.closePath();
    } else if (data.type === Tiny.ELIP) {
      // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

      var w = shape.width * 2;
      var h = shape.height * 2;
      var x = shape.x - w / 2;
      var y = shape.y - h / 2;
      var kappa = 0.5522848,
        ox = w / 2 * kappa,
        // control point offset horizontal
        oy = h / 2 * kappa,
        // control point offset vertical
        xe = x + w,
        // x-end
        ye = y + h,
        // y-end
        xm = x + w / 2,
        // x-middle
        ym = y + h / 2; // y-middle

      context.moveTo(x, ym);
      context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      context.closePath();
    } else if (data.type === Tiny.RREC) {
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
CanvasGraphics.updateGraphicsTint = function (graphics) {
  if (graphics.tint["int"] === 0xffffff) {
    return;
  }

  // var tintHex = Tiny.style2hex(graphics.tint);

  // var tintR = ((tintHex >> 16) & 0xff) / 255;
  // var tintG = ((tintHex >> 8) & 0xff) / 255;
  // var tintB = (tintHex & 0xff) / 255;

  for (var i = 0; i < graphics.graphicsData.length; i++) {
    var data = graphics.graphicsData[i];
    data._fillTint = new Tiny.Color(data.fillColor).multiply(graphics.tint);
    data._lineTint = new Tiny.Color(data.lineColor).multiply(graphics.tint);

    // var fillColor = Tiny.style2hex(data.fillColor);
    // var lineColor = Tiny.style2hex(data.lineColor);

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

    // data._fillTint =
    //     (((((fillColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
    //     (((((fillColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
    //     ((fillColor & 0xff) / 255) * tintB * 255;
    // data._lineTint =
    //     (((((lineColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
    //     (((((lineColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
    //     ((lineColor & 0xff) / 255) * tintB * 255;

    // data._fillTint = Tiny.hex2style(data._fillTint);
    // data._lineTint = Tiny.hex2style(data._lineTint);
  }
};

;// ./packages/canvas-graphics/CanvasMaskManager.js
var CanvasMaskManager = function CanvasMaskManager() {};
CanvasMaskManager.prototype.constructor = CanvasMaskManager;
CanvasMaskManager.prototype.pushMask = function (maskData, renderSession) {
  var context = renderSession.context;
  context.save();
  var cacheAlpha = maskData.alpha;
  var transform = maskData.worldTransform;
  var resolution = renderSession.resolution;
  context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution);
  Tiny.CanvasGraphics.renderGraphicsMask(maskData, context);
  context.clip();
  maskData.worldAlpha = cacheAlpha;
};
CanvasMaskManager.prototype.popMask = function (renderSession) {
  renderSession.context.restore();
};

// EXTERNAL MODULE: ./packages/canvas-graphics/extends.js
var canvas_graphics_extends = __webpack_require__(340);
;// ./packages/canvas-graphics/index.js



Tiny.CanvasGraphics = CanvasGraphics;
Tiny.CanvasMaskManager = CanvasMaskManager;
}();
/******/ })()
;