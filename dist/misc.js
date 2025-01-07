/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 644:
/***/ (function() {

Tiny.Object2D.prototype.removeChildren = function (beginIndex, endIndex) {
  var begin = beginIndex || 0;
  var end = typeof endIndex === 'number' ? endIndex : this.children.length;
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
    throw new Error('removeChildren: Range Error, numeric values are outside the acceptable range');
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";

;// ./packages/misc/Opaque.js
var Opaque = function Opaque(options) {
  // Tiny.BaseObject2D.call(this);

  var canvas = new Tiny.CanvasBuffer(1, 1);
  var ctx = canvas.context;
  ctx.fillStyle = options.color || '#000000';
  ctx.rect(0, 0, 1000, 1000);
  ctx.fill();
  Tiny.Sprite.call(this, new Tiny.Texture(canvas.canvas));
  var game = this.game = options.game;
  this.visible = true;
  this._bounds = new Tiny.Rectangle(0, 0, 1, 1);

  // this.color = options.color || '#000000';
  this.alpha = options.alpha || 0.5;
  if (options.input !== false) {
    game.input.add(this, {
      transparent: options.transparent
    });
  }
};
Opaque.prototype = Object.assign(Object.create(Tiny.Sprite.prototype), {
  constructor: Opaque,
  updateTransform: function updateTransform() {
    var wt = this.worldTransform;
    wt.a = this.game.width;
    wt.d = this.game.height;
    this.worldAlpha = this.alpha;
  },
  getBounds: function getBounds() {
    this._bounds.width = this.game.width;
    this._bounds.height = this.game.height;
    return this._bounds;
  }
});
Object.defineProperty(Opaque.prototype, 'worldVisible', {
  get: function get() {
    return this.visible;
  }
});

// Opaque.prototype.render = function () {};

// Opaque.prototype.renderCanvas = function (renderSession) {
//     if (this.visible === false || this.alpha === 0) return;

//     renderSession.context.setTransform(1, 0, 0, 1, 0, 0);
//     // renderSession.context.resetTransform();

//     renderSession.context.globalAlpha = this.alpha;
//     renderSession.context.fillStyle = this.color;
//     renderSession.context.fillRect(
//         0,
//         0,
//         renderSession.context.canvas.width,
//         renderSession.context.canvas.height
//     );

//     renderSession.context.globalAlpha = 1;
// };


;// ./packages/misc/RenderLayer.js
var RenderLayer = function RenderLayer() {
  Tiny.Object2D.call(this);
};
RenderLayer.prototype = Object.create(Tiny.Object2D.prototype);
RenderLayer.prototype.constructor = RenderLayer;
var noop = function noop() {};
RenderLayer.prototype.addChildAt = function (child, index) {
  if (index >= 0 && index <= this.children.length) {
    child._RenderLayer_render = child.render;
    child.render = noop;
    this.children.splice(index, 0, child);
    return child;
  } else {
    throw new Error(child + 'addChildAt: The index ' + index + ' supplied is out of bounds ' + this.children.length);
  }
};
RenderLayer.prototype.removeChildAt = function (index) {
  var child = this.getChildAt(index);
  this.children.splice(index, 1);
  child.render = child._RenderLayer_render;
  child._RenderLayer_render = null;
  return child;
};
RenderLayer.prototype.updateTransform = function () {};
RenderLayer.prototype.renderCanvas = function (renderSession) {
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

// EXTERNAL MODULE: ./packages/misc/extends.js
var misc_extends = __webpack_require__(644);
;// ./packages/misc/index.js



Tiny.Opaque = Opaque;
Tiny.RenderLayer = RenderLayer;
}();
/******/ })()
;