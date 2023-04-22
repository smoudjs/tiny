/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/create/spritesheet.js":
/*!***************************************!*\
  !*** ./plugins/create/spritesheet.js ***!
  \***************************************/
/***/ (() => {

Tiny.Create.spritesheet = function spritesheet(options) {
    var resolution = options.resolution || 1;
    var frameWidth = (resolution * options.width) | 0;
    var frameHeight = (resolution * options.height) | 0;
    var frames = options.frames;
    var key = options.key;
    var lastFrame = frames - 1;

    var totalWidth = frameWidth * options.frames;
    var renderer = Tiny.defaultRenderer;
    console.log(totalWidth, frames, lastFrame);

    var textureBuffer = new Tiny.CanvasBuffer(totalWidth, frameHeight);

    var tmpMatrix = new Tiny.Matrix();
    // var scale = 
    // tmpMatrix.scale(0.5, 0.5);

    var uid, texture, frame, displayObject, bounds, wt, context;

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
(() => {
/*!*********************************!*\
  !*** ./plugins/create/index.js ***!
  \*********************************/
Tiny.Create = {};

__webpack_require__(/*! ./spritesheet */ "./plugins/create/spritesheet.js");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9jcmVhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxPQUFPO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDdkZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQyxzREFBZSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9jcmVhdGUvc3ByaXRlc2hlZXQuanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvY3JlYXRlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlRpbnkuQ3JlYXRlLnNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gc3ByaXRlc2hlZXQob3B0aW9ucykge1xyXG4gICAgdmFyIHJlc29sdXRpb24gPSBvcHRpb25zLnJlc29sdXRpb24gfHwgMTtcclxuICAgIHZhciBmcmFtZVdpZHRoID0gKHJlc29sdXRpb24gKiBvcHRpb25zLndpZHRoKSB8IDA7XHJcbiAgICB2YXIgZnJhbWVIZWlnaHQgPSAocmVzb2x1dGlvbiAqIG9wdGlvbnMuaGVpZ2h0KSB8IDA7XHJcbiAgICB2YXIgZnJhbWVzID0gb3B0aW9ucy5mcmFtZXM7XHJcbiAgICB2YXIga2V5ID0gb3B0aW9ucy5rZXk7XHJcbiAgICB2YXIgbGFzdEZyYW1lID0gZnJhbWVzIC0gMTtcclxuXHJcbiAgICB2YXIgdG90YWxXaWR0aCA9IGZyYW1lV2lkdGggKiBvcHRpb25zLmZyYW1lcztcclxuICAgIHZhciByZW5kZXJlciA9IFRpbnkuZGVmYXVsdFJlbmRlcmVyO1xyXG4gICAgY29uc29sZS5sb2codG90YWxXaWR0aCwgZnJhbWVzLCBsYXN0RnJhbWUpO1xyXG5cclxuICAgIHZhciB0ZXh0dXJlQnVmZmVyID0gbmV3IFRpbnkuQ2FudmFzQnVmZmVyKHRvdGFsV2lkdGgsIGZyYW1lSGVpZ2h0KTtcclxuXHJcbiAgICB2YXIgdG1wTWF0cml4ID0gbmV3IFRpbnkuTWF0cml4KCk7XHJcbiAgICAvLyB2YXIgc2NhbGUgPSBcclxuICAgIC8vIHRtcE1hdHJpeC5zY2FsZSgwLjUsIDAuNSk7XHJcblxyXG4gICAgdmFyIHVpZCwgdGV4dHVyZSwgZnJhbWUsIGRpc3BsYXlPYmplY3QsIGJvdW5kcywgd3QsIGNvbnRleHQ7XHJcblxyXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGZyYW1lczsgaW5kZXgrKykge1xyXG4gICAgICAgIGZyYW1lID0gbmV3IFRpbnkuUmVjdGFuZ2xlKGZyYW1lV2lkdGggKiBpbmRleCwgMCwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xyXG5cclxuICAgICAgICBjb250ZXh0ID0gdGV4dHVyZUJ1ZmZlci5jb250ZXh0O1xyXG5cclxuICAgICAgICBkaXNwbGF5T2JqZWN0ID0gb3B0aW9ucy5kcmF3KChpbmRleCArIDEpIC8gZnJhbWVzLCBjb250ZXh0LCBmcmFtZSk7XHJcblxyXG4gICAgICAgIGJvdW5kcyA9IGRpc3BsYXlPYmplY3QuZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm91bmRzLngsIGJvdW5kcy55LCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyB0bXBNYXRyaXgudHJhbnNsYXRlKClcclxuICAgICAgICB0bXBNYXRyaXgudHggPSAtYm91bmRzLnggKyBmcmFtZS54O1xyXG4gICAgICAgIHRtcE1hdHJpeC50eSA9IC1ib3VuZHMueTtcclxuXHJcbiAgICAgICAgd3QgPSBkaXNwbGF5T2JqZWN0LndvcmxkVHJhbnNmb3JtO1xyXG4gICAgICAgIHd0LnR4ID0gb3B0aW9ucy53aWR0aCAqIGluZGV4ICsgb3B0aW9ucy53aWR0aCAvIDI7XHJcbiAgICAgICAgd3QudHkgPSBvcHRpb25zLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLy8gd3QuaWRlbnRpdHkoKTtcclxuICAgICAgICAvLyB3dC5zY2FsZSgwLjUsIDAuNSk7XHJcbiAgICAgICAgLy8gd3QuYSA9IDAuNTtcclxuICAgICAgICAvLyB3dC5kID0gMC41O1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh3dC5hLCB3dC5kKVxyXG5cclxuICAgICAgICAvLyB3dC5hcHBlbmQodG1wTWF0cml4KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh3dC5hLCB3dC5kKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyBkaXNwbGF5T2JqZWN0LndpZHRoID0gNTA7XHJcbiAgICAgICAgLy8gZGlzcGxheU9iamVjdC5oZWlnaHQgPSA1MDtcclxuXHJcbiAgICAgICAgLy8gc2V0V29ybGQgQWxwaGEgdG8gZW5zdXJlIHRoYXQgdGhlIG9iamVjdCBpcyByZW5kZXJlciBhdCBmdWxsIG9wYWNpdHlcclxuICAgICAgICBkaXNwbGF5T2JqZWN0LndvcmxkQWxwaGEgPSAxO1xyXG5cclxuICAgICAgICAvLyBUaW1lIHRvIHVwZGF0ZSBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSBkaXNwbGF5T2JqZWN0IHdpdGggdGhlIG5ldyBtYXRyaXguLlxyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGRpc3BsYXlPYmplY3QuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlYWxSZXNvbHV0aW9uID0gcmVuZGVyZXIucmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgcmVuZGVyZXIucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XHJcblxyXG4gICAgICAgIHJlbmRlcmVyLnJlbmRlck9iamVjdChkaXNwbGF5T2JqZWN0LCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgLy8gaWYgKF9fREVCVUdfXykge1xyXG4gICAgICAgIC8vICAgICBjb250ZXh0LnJlc2V0VHJhbnNmb3JtKCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnRleHQucmVjdChmcmFtZS54LCBmcmFtZS55LCBmcmFtZS53aWR0aCwgZnJhbWUuaGVpZ2h0KTtcclxuICAgICAgICAvLyAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHJlbmRlcmVyLnJlc29sdXRpb24gPSByZWFsUmVzb2x1dGlvbjtcclxuXHJcbiAgICAgICAgdXVpZCA9IGtleSArICcuJyArIGluZGV4O1xyXG5cclxuICAgICAgICB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZSh0ZXh0dXJlQnVmZmVyLmNhbnZhcywgZnJhbWUpO1xyXG5cclxuICAgICAgICB0ZXh0dXJlLmtleSA9IGtleTtcclxuICAgICAgICB0ZXh0dXJlLmxhc3RGcmFtZSA9IGxhc3RGcmFtZTtcclxuXHJcbiAgICAgICAgVGlueS5DYWNoZS50ZXh0dXJlW3V1aWRdID0gdGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICBUaW55LkNhY2hlLnRleHR1cmVba2V5XSA9IG5ldyBUaW55LlRleHR1cmUodGV4dHVyZUJ1ZmZlci5jYW52YXMpO1xyXG5cclxuICAgIC8vIHJldHVybiByZW5kZXJUZXh0dXJlO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiVGlueS5DcmVhdGUgPSB7fTtcclxuXHJcbnJlcXVpcmUoJy4vc3ByaXRlc2hlZXQnKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=