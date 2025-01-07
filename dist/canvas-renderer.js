/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 694:
/***/ (function() {

Tiny.Object2D.prototype.renderCanvas = function (renderSession) {
  if (this.visible === false || this.alpha === 0) return;
  if (this._cacheAsBitmap) {
    this._renderCachedSprite(renderSession);
    return;
  }
  if (this._mask) {
    renderSession.maskManager.pushMask(this._mask, renderSession);
  }
  for (var i = 0, j = this.children.length; i < j; i++) {
    this.children[i].renderCanvas(renderSession);
  }
  if (this._mask) {
    renderSession.maskManager.popMask(renderSession);
  }
};
Tiny.Sprite.prototype.renderCanvas = function (renderSession) {
  // If the sprite is not visible or the alpha is 0 then no need to render this element
  if (this.visible === false || this.alpha === 0 || this.renderable === false || this.texture.crop.width <= 0 || this.texture.crop.height <= 0) return;
  if (this.blendMode !== renderSession.currentBlendMode) {
    renderSession.currentBlendMode = this.blendMode;
    renderSession.context.globalCompositeOperation = renderSession.blendModes[renderSession.currentBlendMode];
  }
  if (this._mask) {
    renderSession.maskManager.pushMask(this._mask, renderSession);
  }

  //  Ignore null sources
  if (this.texture.valid) {
    var resolution = this.texture.base.resolution / renderSession.resolution;
    renderSession.context.globalAlpha = this.worldAlpha;

    //  If the texture is trimmed we offset by the trim x/y, otherwise we use the frame dimensions
    var dx = this.texture.trim ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width;
    var dy = this.texture.trim ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;

    //  Allow for pixel rounding
    if (renderSession.roundPixels) {
      renderSession.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, this.worldTransform.tx * renderSession.resolution | 0, this.worldTransform.ty * renderSession.resolution | 0);
      dx = dx | 0;
      dy = dy | 0;
    } else {
      renderSession.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, this.worldTransform.tx * renderSession.resolution, this.worldTransform.ty * renderSession.resolution);
    }
    if (this.tint["int"] !== 0xffffff) {
      if (this.cachedTint !== this.tint["int"]) {
        this.cachedTint = this.tint["int"];
        this.tintedTexture = Tiny.CanvasTinter.getTintedTexture(this, this.tint);
      }
      renderSession.context.drawImage(this.tintedTexture, 0, 0, this.texture.crop.width, this.texture.crop.height, dx / resolution, dy / resolution, this.texture.crop.width / resolution, this.texture.crop.height / resolution);
    } else {
      renderSession.context.drawImage(this.texture.base.source, this.texture.crop.x, this.texture.crop.y, this.texture.crop.width, this.texture.crop.height, dx / resolution, dy / resolution, this.texture.crop.width / resolution, this.texture.crop.height / resolution);
    }
  }

  // OVERWRITE
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].renderCanvas(renderSession);
  }
  if (this._mask) {
    renderSession.maskManager.popMask(renderSession);
  }
};
Tiny.Text.prototype.renderCanvas = function (renderSession) {
  if (this.dirty || this.resolution !== renderSession.resolution) {
    this.resolution = renderSession.resolution;
    this.updateText();
    this.dirty = false;
  }
  Tiny.Sprite.prototype.renderCanvas.call(this, renderSession);
};

/**
 * This function will draw the display object to the texture.
 *
 * @method renderCanvas
 * @param displayObject {DisplayObject} The display object to render this texture on
 * @param [matrix] {Matrix} Optional matrix to apply to the display object before rendering.
 * @param [clear] {Boolean} If true the texture will be cleared before the displayObject is drawn
 * @private
 */
Tiny.RenderTexture.prototype.renderCanvas = function (displayObject, matrix, clear) {
  if (!this.valid) return;
  var wt = displayObject.worldTransform;
  wt.identity();
  if (matrix) wt.append(matrix);

  // setWorld Alpha to ensure that the object is renderer at full opacity
  displayObject.worldAlpha = 1;

  // Time to update all the children of the displayObject with the new matrix..
  var children = displayObject.children;
  for (var i = 0, j = children.length; i < j; i++) {
    children[i].updateTransform();
  }
  wt.identity();
  if (clear) this.textureBuffer.clear();
  var context = this.textureBuffer.context;
  var realResolution = this.renderer.resolution;
  this.renderer.resolution = this.base.resolution;
  this.renderer.renderObject(displayObject, context);
  this.renderer.resolution = realResolution;
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";

;// ./packages/canvas-renderer/utils.js
// export const canUseNewCanvasBlendModes = function () {
//     var canvas = document.createElement('canvas');
//     canvas.width = 1;
//     canvas.height = 1;
//     var context = canvas.getContext('2d');
//     context.fillStyle = '#000';
//     context.fillRect(0, 0, 1, 1);
//     context.globalCompositeOperation = 'multiply';
//     context.fillStyle = '#fff';
//     context.fillRect(0, 0, 1, 1);
//     return context.getImageData(0, 0, 1, 1).data[0] === 0;
// };

// function canUseNewCanvasBlendModes() {
//     var pngHead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';
//     var pngEnd = 'AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';

//     var magenta = new Image();

//     magenta.onload = function () {
//         var yellow = new Image();

//         yellow.onload = function () {
//             var canvas = document.createElement('canvas');
//             canvas.width = 6;
//             canvas.height = 1;
//             var context = canvas.getContext('2d', { willReadFrequently: true });

//             context.globalCompositeOperation = 'multiply';

//             context.drawImage(magenta, 0, 0);
//             context.drawImage(yellow, 2, 0);

//             if (!context.getImageData(2, 0, 1, 1)) {
//                 return false;
//             }

//             var data = context.getImageData(2, 0, 1, 1).data;

//             Tiny.supportNewBlendModes = data[0] === 255 && data[1] === 0 && data[2] === 0;
//             CanvasTinter.tintMethod = CanvasTinter.tintWithMultiply;
//         };

//         yellow.src = pngHead + '/wCKxvRF' + pngEnd;
//     };

//     magenta.src = pngHead + 'AP804Oa6' + pngEnd;

//     return false;
// }

function createColoredCanvas(color) {
  var canvas = document.createElement('canvas');
  canvas.width = 6;
  canvas.height = 1;
  var context = canvas.getContext('2d');
  context.fillStyle = color;
  context.fillRect(0, 0, 6, 1);
  return canvas;
}
var canUseNewCanvasBlendModesValue;
function canUseNewCanvasBlendModes() {
  if (canUseNewCanvasBlendModesValue !== undefined) {
    return canUseNewCanvasBlendModesValue;
  }
  var magenta = createColoredCanvas('#ff00ff');
  var yellow = createColoredCanvas('#ffff00');
  var canvas = document.createElement('canvas');
  canvas.width = 6;
  canvas.height = 1;
  var context = canvas.getContext('2d');
  context.globalCompositeOperation = 'multiply';
  context.drawImage(magenta, 0, 0);
  context.drawImage(yellow, 2, 0);
  var imageData = context.getImageData(2, 0, 1, 1);
  if (!imageData) {
    canUseNewCanvasBlendModesValue = false;
  } else {
    var data = imageData.data;
    canUseNewCanvasBlendModesValue = data[0] === 255 && data[1] === 0 && data[2] === 0;
  }
  return canUseNewCanvasBlendModesValue;
}
function checkInverseAlpha() {
  var canvas = new Tiny.CanvasBuffer(2, 1, {
    willReadFrequently: true
  });
  canvas.context.fillStyle = 'rgba(10, 20, 30, 0.5)';

  //  Draw a single pixel
  canvas.context.fillRect(0, 0, 1, 1);

  //  Get the color values
  var s1 = canvas.context.getImageData(0, 0, 1, 1);

  //  Plot them to x2
  canvas.context.putImageData(s1, 1, 0);

  //  Get those values
  var s2 = canvas.context.getImageData(1, 0, 1, 1);

  //  Compare and return
  return s2.data[0] === s1.data[0] && s2.data[1] === s1.data[1] && s2.data[2] === s1.data[2] && s2.data[3] === s1.data[3];
}
;// ./packages/canvas-renderer/CanvasRenderer.js

var CanvasRenderer = function CanvasRenderer(width, height, options) {
  options = options || {};
  this.resolution = options.resolution != undefined ? options.resolution : 1;
  this._resolution = this.resolution;
  this.clearBeforeRender = options.clearBeforeRender != undefined ? options.clearBeforeRender : true;
  this.transparent = options.transparent != undefined ? options.transparent : false;
  this.autoResize = options.autoResize || false;

  // this.width = width || 800;
  // this.height = height || 600;

  // this.width *= this.resolution;
  // this.height *= this.resolution;

  if (!Tiny.defaultRenderer) Tiny.defaultRenderer = this;
  var view = this.domElement = options.domElement || document.createElement('canvas');
  this.context = view.getContext('2d', {
    alpha: this.transparent
  });
  this._context = this.context;

  // view.width = this.width * this.resolution;
  // view.height = this.height * this.resolution;

  this.resize(width || 800, height || 600);
  this.setClearColor(0xffffff);
  if (Tiny.CanvasMaskManager) this.maskManager = new Tiny.CanvasMaskManager();
  this.roundPixels = false;
  if ('imageSmoothingEnabled' in this.context) this.smoothProperty = 'imageSmoothingEnabled';else if ('webkitImageSmoothingEnabled' in this.context) this.smoothProperty = 'webkitImageSmoothingEnabled';else if ('mozImageSmoothingEnabled' in this.context) this.smoothProperty = 'mozImageSmoothingEnabled';else if ('oImageSmoothingEnabled' in this.context) this.smoothProperty = 'oImageSmoothingEnabled';else if ('msImageSmoothingEnabled' in this.context) this.smoothProperty = 'msImageSmoothingEnabled';
  var BlendModes = [];
  var modes = Tiny;
  BlendModes[modes.NORMAL] = 'source-over';
  BlendModes[modes.ADD] = 'lighter'; //IS THIS OK???

  var canUse = canUseNewCanvasBlendModes();
  BlendModes[modes.MULTIPLY] = canUse ? 'multiply' : 'source-over';
  BlendModes[modes.SCREEN] = canUse ? 'screen' : 'source-over';
  BlendModes[modes.OVERLAY] = canUse ? 'overlay' : 'source-over';
  BlendModes[modes.DARKEN] = canUse ? 'darken' : 'source-over';
  BlendModes[modes.LIGHTEN] = canUse ? 'lighten' : 'source-over';
  BlendModes[modes.COLOR_DODGE] = canUse ? 'color-dodge' : 'source-over';
  BlendModes[modes.COLOR_BURN] = canUse ? 'color-burn' : 'source-over';
  BlendModes[modes.HARD_LIGHT] = canUse ? 'hard-light' : 'source-over';
  BlendModes[modes.SOFT_LIGHT] = canUse ? 'soft-light' : 'source-over';
  BlendModes[modes.DIFFERENCE] = canUse ? 'difference' : 'source-over';
  BlendModes[modes.EXCLUSION] = canUse ? 'exclusion' : 'source-over';
  BlendModes[modes.HUE] = canUse ? 'hue' : 'source-over';
  BlendModes[modes.SATURATION] = canUse ? 'saturation' : 'source-over';
  BlendModes[modes.COLOR] = canUse ? 'color' : 'source-over';
  BlendModes[modes.LUMINOSITY] = canUse ? 'luminosity' : 'source-over';
  this.blendModes = BlendModes;
};
CanvasRenderer.prototype.constructor = CanvasRenderer;
CanvasRenderer.prototype.setClearColor = function (color) {
  this.clearColor = new Tiny.Color(color).toStyle();

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

// CanvasRenderer.prototype.setPixelArt = function() {

//     var canvas = this.domElement;

//     var types = [ 'optimizeSpeed', '-moz-crisp-edges', '-o-crisp-edges', '-webkit-optimize-contrast', 'optimize-contrast', 'crisp-edges', 'pixelated' ];

//     types.forEach(function (type)
//     {
//         canvas.style['image-rendering'] = type;
//     });

//     canvas.style.msInterpolationMode = 'nearest-neighbor';
//     this.renderSession.roundPixels = true;
// }

CanvasRenderer.prototype.render = function (scene) {
  scene.updateTransform();
  this._context.setTransform(1, 0, 0, 1, 0, 0);
  this._context.globalAlpha = 1;
  this.currentBlendMode = Tiny.NORMAL;
  this._context.globalCompositeOperation = this.blendModes[Tiny.NORMAL];
  if (navigator.isCocoonJS && this.domElement.screencanvas) {
    this._context.fillStyle = 'black';
    this._context.clear();
  }
  if (this.clearBeforeRender) {
    if (this.transparent) {
      this._context.clearRect(0, 0, this.width * this._resolution, this.height * this._resolution);
    } else {
      this._context.fillStyle = this.clearColor;
      this._context.fillRect(0, 0, this.width * this._resolution, this.height * this._resolution);
    }
  }
  this.renderObject(scene);
};
CanvasRenderer.prototype.destroy = function (removeView) {
  if (typeof removeView === 'undefined') {
    removeView = true;
  }
  if (removeView && this.domElement.parentNode) {
    this.domElement.parentNode.removeChild(this.domElement);
  }
  this.domElement = null;
  this.context = null;
  this.maskManager = null;
  // this.renderSession = null;

  if (Tiny.defaultRenderer === this) Tiny.defaultRenderer = null;
};
CanvasRenderer.prototype.resize = function (width, height) {
  this.width = width;
  this.height = height;
  var view = this.domElement;
  view.width = Math.floor(this.width * this._resolution);
  view.height = Math.floor(this.height * this._resolution);
  if (this.autoResize) {
    view.style.width = width + 'px';
    view.style.height = height + 'px';
  }
};
CanvasRenderer.prototype.setPixelRatio = function (resolution) {
  this._resolution = this.resolution = resolution;
  var view = this.domElement;
  view.width = Math.floor(this.width * this._resolution);
  view.height = Math.floor(this.height * this._resolution);
};
CanvasRenderer.prototype.renderObject = function (displayObject, context, resolution) {
  this.context = context || this._context;
  // this.resolution = resolution || this._resolution;
  displayObject.renderCanvas(this);
};

;// ./packages/canvas-renderer/CanvasTinter.js

var canHandleAlpha = checkInverseAlpha();
var CanvasTinter = function CanvasTinter() {};
CanvasTinter.getTintedTexture = function (sprite, color) {
  var key = color["int"];
  var texture = sprite.texture;
  if (!texture._tintCache) texture._tintCache = {};
  if (texture._tintCache[key]) return texture._tintCache[key];
  var canvas = CanvasTinter.canvas || document.createElement('canvas');
  CanvasTinter.tintMethod(texture, color, canvas);
  if (CanvasTinter.convertTintToImage) {
    // is this better?
    var tintImage = new Image();
    tintImage.src = canvas.toDataURL();

    // texture._tintCache[stringColor] = tintImage;
  } else {
    CanvasTinter.canvas = null;
  }
  if (CanvasTinter.cacheTint) texture._tintCache[key] = canvas;
  return canvas;
};
CanvasTinter.tintWithMultiply = function (texture, color, canvas) {
  var context = canvas.getContext('2d');
  var crop = texture.crop;
  canvas.width = crop.width;
  canvas.height = crop.height;
  context.fillStyle = color.toStyle();
  context.fillRect(0, 0, crop.width, crop.height);
  context.globalCompositeOperation = 'multiply';
  context.drawImage(texture.base.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  context.globalCompositeOperation = 'destination-atop';
  context.drawImage(texture.base.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
};
CanvasTinter.tintWithPerPixel = function (texture, color, canvas) {
  var context = canvas.getContext('2d');
  var crop = texture.crop;
  canvas.width = crop.width;
  canvas.height = crop.height;
  context.globalCompositeOperation = 'copy';
  context.drawImage(texture.base.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  var pixelData = context.getImageData(0, 0, crop.width, crop.height);
  var pixels = pixelData.data;
  for (var i = 0; i < pixels.length; i += 4) {
    pixels[i + 0] *= color.r;
    pixels[i + 1] *= color.g;
    pixels[i + 2] *= color.b;
    if (!canHandleAlpha) {
      var alpha = pixels[i + 3];
      pixels[i + 0] /= 255 / alpha;
      pixels[i + 1] /= 255 / alpha;
      pixels[i + 2] /= 255 / alpha;
    }
  }
  context.putImageData(pixelData, 0, 0);
};
CanvasTinter.convertTintToImage = false;
CanvasTinter.cacheTint = true;
CanvasTinter.tintMethod = canUseNewCanvasBlendModes() ? CanvasTinter.tintWithMultiply : CanvasTinter.tintWithPerPixel;

;// ./packages/canvas-renderer/Detector.js
function autoDetectRenderer(width, height, options) {
  var webgl = function () {
    try {
      var canvas = document.createElement('canvas');
      return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }();
  if (webgl) {
    return new Tiny.Renderer(width, height, options);
  }
  return new Tiny.CanvasRenderer(width, height, options);
}

// EXTERNAL MODULE: ./packages/canvas-renderer/extends.js
var canvas_renderer_extends = __webpack_require__(694);
;// ./packages/canvas-renderer/index.js




Tiny.CanvasRenderer = CanvasRenderer;
Tiny.CanvasTinter = CanvasTinter;
Tiny.autoDetectRenderer = autoDetectRenderer;

// Tiny.autoDetectRenderer = function (width, height, options) {
//     if (Tiny.Renderer && core.utils.isWebGLSupported()) {
//         return new Tiny.Renderer(width, height, options);
//     }

//     return new CanvasRenderer(width, height, options);
// };
}();
/******/ })()
;