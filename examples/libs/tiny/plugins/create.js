/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/create/spritesheet.js":
/*!***************************************!*\
  !*** ./plugins/create/spritesheet.js ***!
  \***************************************/
/***/ (function() {

Tiny.Create.spritesheet = function spritesheet(options) {
    var resolution = options.resolution || 1;
    var frameWidth = (resolution * options.width) | 0;
    var frameHeight = (resolution * options.height) | 0;
    var frames = options.frames;
    var key = options.key;
    var lastFrame = frames - 1;

    var totalWidth = frameWidth * options.frames;
    var renderer = Tiny.defaultRenderer;

    var textureBuffer = new Tiny.CanvasBuffer(totalWidth, frameHeight);

    var tmpMatrix = new Tiny.Matrix();
    // var scale = 
    // tmpMatrix.scale(0.5, 0.5);

    var uuid, texture, frame, displayObject, bounds, wt, context;

    for (var index = 0; index < frames; index++) {
        frame = new Tiny.Rectangle(frameWidth * index, 0, frameWidth, frameHeight);

        context = textureBuffer.context;

        displayObject = options.draw((index + 1) / frames, context, frame);

        bounds = displayObject.getBounds();
        // console.log(bounds.x, bounds.y, bounds.width, bounds.height);

        // tmpMatrix.translate()
        tmpMatrix.tx = -bounds.x + frame.x;
        tmpMatrix.ty = -bounds.y;

        wt = displayObject.worldTransform;
        wt.tx = options.width * index + options.width / 2;
        wt.ty = options.height / 2;
        // wt.identity();
        // wt.scale(0.5, 0.5);
        // wt.a = 0.5;
        // wt.d = 0.5;

        // console.log(wt.a, wt.d)

        // wt.append(tmpMatrix);
        // console.log(wt.a, wt.d)
            
        // displayObject.width = 50;
        // displayObject.height = 50;

        // setWorld Alpha to ensure that the object is renderer at full opacity
        displayObject.worldAlpha = 1;

        // Time to update all the children of the displayObject with the new matrix..
        var children = displayObject.children;

        for (var i = 0, j = children.length; i < j; i++) {
            children[i].updateTransform();
        }

        var realResolution = renderer.resolution;

        renderer.resolution = resolution;

        renderer.renderObject(displayObject, context);

        // if (__DEBUG__) {
        //     context.resetTransform();
        //     context.rect(frame.x, frame.y, frame.width, frame.height);
        //     context.stroke();
        // }

        renderer.resolution = realResolution;

        uuid = key + '.' + index;

        texture = new Tiny.Texture(textureBuffer.canvas, frame);

        texture.key = key;
        texture.lastFrame = lastFrame;

        Tiny.Cache.texture[uuid] = texture;
    }

    Tiny.Cache.texture[key] = new Tiny.Texture(textureBuffer.canvas);

    // return renderTexture;
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
!function() {
/*!*********************************!*\
  !*** ./plugins/create/index.js ***!
  \*********************************/
Tiny.Create = {};

__webpack_require__(/*! ./spritesheet */ "./plugins/create/spritesheet.js");
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9jcmVhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsT0FBTztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3RGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBLG1CQUFPLENBQUMsc0RBQWUsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvY3JlYXRlL3Nwcml0ZXNoZWV0LmpzIiwid2VicGFjazovL2g1dGlueS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2NyZWF0ZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJUaW55LkNyZWF0ZS5zcHJpdGVzaGVldCA9IGZ1bmN0aW9uIHNwcml0ZXNoZWV0KG9wdGlvbnMpIHtcclxuICAgIHZhciByZXNvbHV0aW9uID0gb3B0aW9ucy5yZXNvbHV0aW9uIHx8IDE7XHJcbiAgICB2YXIgZnJhbWVXaWR0aCA9IChyZXNvbHV0aW9uICogb3B0aW9ucy53aWR0aCkgfCAwO1xyXG4gICAgdmFyIGZyYW1lSGVpZ2h0ID0gKHJlc29sdXRpb24gKiBvcHRpb25zLmhlaWdodCkgfCAwO1xyXG4gICAgdmFyIGZyYW1lcyA9IG9wdGlvbnMuZnJhbWVzO1xyXG4gICAgdmFyIGtleSA9IG9wdGlvbnMua2V5O1xyXG4gICAgdmFyIGxhc3RGcmFtZSA9IGZyYW1lcyAtIDE7XHJcblxyXG4gICAgdmFyIHRvdGFsV2lkdGggPSBmcmFtZVdpZHRoICogb3B0aW9ucy5mcmFtZXM7XHJcbiAgICB2YXIgcmVuZGVyZXIgPSBUaW55LmRlZmF1bHRSZW5kZXJlcjtcclxuXHJcbiAgICB2YXIgdGV4dHVyZUJ1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcih0b3RhbFdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgdmFyIHRtcE1hdHJpeCA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4gICAgLy8gdmFyIHNjYWxlID0gXHJcbiAgICAvLyB0bXBNYXRyaXguc2NhbGUoMC41LCAwLjUpO1xyXG5cclxuICAgIHZhciB1dWlkLCB0ZXh0dXJlLCBmcmFtZSwgZGlzcGxheU9iamVjdCwgYm91bmRzLCB3dCwgY29udGV4dDtcclxuXHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZnJhbWVzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoZnJhbWVXaWR0aCAqIGluZGV4LCAwLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQgPSB0ZXh0dXJlQnVmZmVyLmNvbnRleHQ7XHJcblxyXG4gICAgICAgIGRpc3BsYXlPYmplY3QgPSBvcHRpb25zLmRyYXcoKGluZGV4ICsgMSkgLyBmcmFtZXMsIGNvbnRleHQsIGZyYW1lKTtcclxuXHJcbiAgICAgICAgYm91bmRzID0gZGlzcGxheU9iamVjdC5nZXRCb3VuZHMoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib3VuZHMueCwgYm91bmRzLnksIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIHRtcE1hdHJpeC50cmFuc2xhdGUoKVxyXG4gICAgICAgIHRtcE1hdHJpeC50eCA9IC1ib3VuZHMueCArIGZyYW1lLng7XHJcbiAgICAgICAgdG1wTWF0cml4LnR5ID0gLWJvdW5kcy55O1xyXG5cclxuICAgICAgICB3dCA9IGRpc3BsYXlPYmplY3Qud29ybGRUcmFuc2Zvcm07XHJcbiAgICAgICAgd3QudHggPSBvcHRpb25zLndpZHRoICogaW5kZXggKyBvcHRpb25zLndpZHRoIC8gMjtcclxuICAgICAgICB3dC50eSA9IG9wdGlvbnMuaGVpZ2h0IC8gMjtcclxuICAgICAgICAvLyB3dC5pZGVudGl0eSgpO1xyXG4gICAgICAgIC8vIHd0LnNjYWxlKDAuNSwgMC41KTtcclxuICAgICAgICAvLyB3dC5hID0gMC41O1xyXG4gICAgICAgIC8vIHd0LmQgPSAwLjU7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHd0LmEsIHd0LmQpXHJcblxyXG4gICAgICAgIC8vIHd0LmFwcGVuZCh0bXBNYXRyaXgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHd0LmEsIHd0LmQpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIGRpc3BsYXlPYmplY3Qud2lkdGggPSA1MDtcclxuICAgICAgICAvLyBkaXNwbGF5T2JqZWN0LmhlaWdodCA9IDUwO1xyXG5cclxuICAgICAgICAvLyBzZXRXb3JsZCBBbHBoYSB0byBlbnN1cmUgdGhhdCB0aGUgb2JqZWN0IGlzIHJlbmRlcmVyIGF0IGZ1bGwgb3BhY2l0eVxyXG4gICAgICAgIGRpc3BsYXlPYmplY3Qud29ybGRBbHBoYSA9IDE7XHJcblxyXG4gICAgICAgIC8vIFRpbWUgdG8gdXBkYXRlIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIGRpc3BsYXlPYmplY3Qgd2l0aCB0aGUgbmV3IG1hdHJpeC4uXHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gZGlzcGxheU9iamVjdC5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICAgICAgY2hpbGRyZW5baV0udXBkYXRlVHJhbnNmb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVhbFJlc29sdXRpb24gPSByZW5kZXJlci5yZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICByZW5kZXJlci5yZXNvbHV0aW9uID0gcmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyT2JqZWN0KGRpc3BsYXlPYmplY3QsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICAvLyBpZiAoX19ERUJVR19fKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnRleHQucmVzZXRUcmFuc2Zvcm0oKTtcclxuICAgICAgICAvLyAgICAgY29udGV4dC5yZWN0KGZyYW1lLngsIGZyYW1lLnksIGZyYW1lLndpZHRoLCBmcmFtZS5oZWlnaHQpO1xyXG4gICAgICAgIC8vICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgcmVuZGVyZXIucmVzb2x1dGlvbiA9IHJlYWxSZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICB1dWlkID0ga2V5ICsgJy4nICsgaW5kZXg7XHJcblxyXG4gICAgICAgIHRleHR1cmUgPSBuZXcgVGlueS5UZXh0dXJlKHRleHR1cmVCdWZmZXIuY2FudmFzLCBmcmFtZSk7XHJcblxyXG4gICAgICAgIHRleHR1cmUua2V5ID0ga2V5O1xyXG4gICAgICAgIHRleHR1cmUubGFzdEZyYW1lID0gbGFzdEZyYW1lO1xyXG5cclxuICAgICAgICBUaW55LkNhY2hlLnRleHR1cmVbdXVpZF0gPSB0ZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbnkuQ2FjaGUudGV4dHVyZVtrZXldID0gbmV3IFRpbnkuVGV4dHVyZSh0ZXh0dXJlQnVmZmVyLmNhbnZhcyk7XHJcblxyXG4gICAgLy8gcmV0dXJuIHJlbmRlclRleHR1cmU7XHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJUaW55LkNyZWF0ZSA9IHt9O1xyXG5cclxucmVxdWlyZSgnLi9zcHJpdGVzaGVldCcpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==