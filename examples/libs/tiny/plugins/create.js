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

        if(displayObject) {

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
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9jcmVhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3pGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBLG1CQUFPLENBQUMsc0RBQWUsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvY3JlYXRlL3Nwcml0ZXNoZWV0LmpzIiwid2VicGFjazovL2g1dGlueS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL2NyZWF0ZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJUaW55LkNyZWF0ZS5zcHJpdGVzaGVldCA9IGZ1bmN0aW9uIHNwcml0ZXNoZWV0KG9wdGlvbnMpIHtcclxuICAgIHZhciByZXNvbHV0aW9uID0gb3B0aW9ucy5yZXNvbHV0aW9uIHx8IDE7XHJcbiAgICB2YXIgZnJhbWVXaWR0aCA9IChyZXNvbHV0aW9uICogb3B0aW9ucy53aWR0aCkgfCAwO1xyXG4gICAgdmFyIGZyYW1lSGVpZ2h0ID0gKHJlc29sdXRpb24gKiBvcHRpb25zLmhlaWdodCkgfCAwO1xyXG4gICAgdmFyIGZyYW1lcyA9IG9wdGlvbnMuZnJhbWVzO1xyXG4gICAgdmFyIGtleSA9IG9wdGlvbnMua2V5O1xyXG4gICAgdmFyIGxhc3RGcmFtZSA9IGZyYW1lcyAtIDE7XHJcblxyXG4gICAgdmFyIHRvdGFsV2lkdGggPSBmcmFtZVdpZHRoICogb3B0aW9ucy5mcmFtZXM7XHJcbiAgICB2YXIgcmVuZGVyZXIgPSBUaW55LmRlZmF1bHRSZW5kZXJlcjtcclxuXHJcbiAgICB2YXIgdGV4dHVyZUJ1ZmZlciA9IG5ldyBUaW55LkNhbnZhc0J1ZmZlcih0b3RhbFdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgdmFyIHRtcE1hdHJpeCA9IG5ldyBUaW55Lk1hdHJpeCgpO1xyXG4gICAgLy8gdmFyIHNjYWxlID0gXHJcbiAgICAvLyB0bXBNYXRyaXguc2NhbGUoMC41LCAwLjUpO1xyXG5cclxuICAgIHZhciB1dWlkLCB0ZXh0dXJlLCBmcmFtZSwgZGlzcGxheU9iamVjdCwgYm91bmRzLCB3dCwgY29udGV4dDtcclxuXHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZnJhbWVzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgZnJhbWUgPSBuZXcgVGlueS5SZWN0YW5nbGUoZnJhbWVXaWR0aCAqIGluZGV4LCAwLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQgPSB0ZXh0dXJlQnVmZmVyLmNvbnRleHQ7XHJcblxyXG4gICAgICAgIGRpc3BsYXlPYmplY3QgPSBvcHRpb25zLmRyYXcoKGluZGV4ICsgMSkgLyBmcmFtZXMsIGNvbnRleHQsIGZyYW1lKTtcclxuXHJcbiAgICAgICAgaWYoZGlzcGxheU9iamVjdCkge1xyXG5cclxuICAgICAgICAgICAgYm91bmRzID0gZGlzcGxheU9iamVjdC5nZXRCb3VuZHMoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYm91bmRzLngsIGJvdW5kcy55LCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gdG1wTWF0cml4LnRyYW5zbGF0ZSgpXHJcbiAgICAgICAgICAgIHRtcE1hdHJpeC50eCA9IC1ib3VuZHMueCArIGZyYW1lLng7XHJcbiAgICAgICAgICAgIHRtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuXHJcbiAgICAgICAgICAgIHd0ID0gZGlzcGxheU9iamVjdC53b3JsZFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgd3QudHggPSBvcHRpb25zLndpZHRoICogaW5kZXggKyBvcHRpb25zLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgd3QudHkgPSBvcHRpb25zLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIC8vIHd0LmlkZW50aXR5KCk7XHJcbiAgICAgICAgICAgIC8vIHd0LnNjYWxlKDAuNSwgMC41KTtcclxuICAgICAgICAgICAgLy8gd3QuYSA9IDAuNTtcclxuICAgICAgICAgICAgLy8gd3QuZCA9IDAuNTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHd0LmEsIHd0LmQpXHJcblxyXG4gICAgICAgICAgICAvLyB3dC5hcHBlbmQodG1wTWF0cml4KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cod3QuYSwgd3QuZClcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBkaXNwbGF5T2JqZWN0LndpZHRoID0gNTA7XHJcbiAgICAgICAgICAgIC8vIGRpc3BsYXlPYmplY3QuaGVpZ2h0ID0gNTA7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRXb3JsZCBBbHBoYSB0byBlbnN1cmUgdGhhdCB0aGUgb2JqZWN0IGlzIHJlbmRlcmVyIGF0IGZ1bGwgb3BhY2l0eVxyXG4gICAgICAgICAgICBkaXNwbGF5T2JqZWN0LndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgICAgICAgICAgLy8gVGltZSB0byB1cGRhdGUgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgZGlzcGxheU9iamVjdCB3aXRoIHRoZSBuZXcgbWF0cml4Li5cclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gZGlzcGxheU9iamVjdC5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXS51cGRhdGVUcmFuc2Zvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHJlYWxSZXNvbHV0aW9uID0gcmVuZGVyZXIucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyT2JqZWN0KGRpc3BsYXlPYmplY3QsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgKF9fREVCVUdfXykge1xyXG4gICAgICAgICAgICAvLyAgICAgY29udGV4dC5yZXNldFRyYW5zZm9ybSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgY29udGV4dC5yZWN0KGZyYW1lLngsIGZyYW1lLnksIGZyYW1lLndpZHRoLCBmcmFtZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICAvLyAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgcmVuZGVyZXIucmVzb2x1dGlvbiA9IHJlYWxSZXNvbHV0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXVpZCA9IGtleSArICcuJyArIGluZGV4O1xyXG5cclxuICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZSh0ZXh0dXJlQnVmZmVyLmNhbnZhcywgZnJhbWUpO1xyXG5cclxuICAgICAgICB0ZXh0dXJlLmtleSA9IGtleTtcclxuICAgICAgICB0ZXh0dXJlLmxhc3RGcmFtZSA9IGxhc3RGcmFtZTtcclxuXHJcbiAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICBUaW55LkNhY2hlLnRleHR1cmVba2V5XSA9IG5ldyBUaW55LlRleHR1cmUodGV4dHVyZUJ1ZmZlci5jYW52YXMpO1xyXG5cclxuICAgIC8vIHJldHVybiByZW5kZXJUZXh0dXJlO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiVGlueS5DcmVhdGUgPSB7fTtcclxuXHJcbnJlcXVpcmUoJy4vc3ByaXRlc2hlZXQnKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=