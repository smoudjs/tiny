/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/anim/Anim.js":
/*!******************************!*\
  !*** ./plugins/anim/Anim.js ***!
  \******************************/
/***/ (function() {

class Anim {
    constructor(obj, options) {
        this.parent = obj;
        this.duration = options.duration || 1000;
        this._time = 0;
        this.running = false;
        this.repeat = options.repeat || 0;
        this._reverse = options.reverse || false;
        this.yoyo = options.yoyo || false;
        this.repeatDelay = options.repeatDelay || 0;
        this._delay = 0;
        if (options.delay) this._delay = -options.delay;
    }
    setValue() {}
    reverse() {
        this._reverse = !this._reverse;
    }
    start() {
        this.running = true;
    }
    pause() {
        this.running = false;
    }
    stop() {
        this.running = false;
        this._time = 0;
        this.setValue(0);
    }
    update(delta) {
        if (!this.parent.worldTransform || !this.valid) return false;

        if (this.running) {
            if (this._delay < 0) {
                this._delay += delta;
                return;
            }

            this._time += delta;
            if (this._time > this.duration) {
                if (this.repeat > 0 || this.repeat == -1) {
                    do {
                        this._time -= this.duration;
                    } while (this._time > this.duration);

                    if (this.repeat > 0) this.repeat--;

                    if (this.repeatDelay) {
                        this._delay = -this.repeatDelay;
                    }

                    if (this.yoyo) this.reverse();
                } else {
                    this._time = this.duration;
                    this.running = false;
                    return false;
                }
            }
            var progress = this._time / this.duration;
            if (this._reverse) progress = 1 - progress;
            this.setValue(progress);
        }
    }
}

Tiny.Anim = Anim;


/***/ }),

/***/ "./plugins/anim/AnimationManager.js":
/*!******************************************!*\
  !*** ./plugins/anim/AnimationManager.js ***!
  \******************************************/
/***/ (function() {

class AnimationManager {
    constructor(game) {
        this.game = game;
        this.list = [];
        this.anims = {};
        this.uid = 0;
    }

    create(options) {
        options.type = options.type || 'spritesheet';
        this.anims[options.key] = options;
        // this.list.push(options);
    }

    remove(animation) {
        var index = this.list.indexOf(animation);
        if (index > -1) this.list.splice(index, 1);
    }

    add(obj) {
        let manager = this;

        obj.anim = {};

        obj.play = function (options) {
            
            if (obj.anim.current) manager.remove(obj.anim.current);

            if (typeof options === 'string') options = { key: options };

            var source = manager.anims[options.key];
            var __class__ = Tiny.Anim[source.type];

            for (var key in source) {
                if (options[key] === undefined) options[key] = source[key];
            }

            var animation = new __class__(obj, options);
            obj.anim.current = animation;
            // manager.list[++this.uid] = animation;
            manager.list.push(animation);
            animation.start();

            return animation;

            // body...
        };

        obj.pause = function () {
            obj.anim.current && obj.anim.current.pause();
        };

        obj.stop = function () {
            if (obj.anim.current) {
                obj.anim.current.stop();
                manager.remove(obj.anim.current);
            }
        };
    }

    update(delta) {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].update(delta);
        }
    }

    destroy(clearCache) {
        this.list.length = 0;
        this.anims = {};
    }
}

Tiny.registerSystem('anim', AnimationManager);


/***/ }),

/***/ "./plugins/anim/KeyframesAnim.js":
/*!***************************************!*\
  !*** ./plugins/anim/KeyframesAnim.js ***!
  \***************************************/
/***/ (function() {

class KeyframesAnim extends Tiny.Anim {
    constructor(obj, options) {
        super(obj, options);

        this.data = options.data;
        this.valid = true;
    }

    setValue(progress) {
        var index = (this.frames.length * progress) | 0;
        if (index > this.frames.length - 1) index = this.frames.length - 1;

        // console.log(index);

        if (index != this.currentIndex) {
            this.currentIndex = index;
            // if (this.reverse) index = this.frames.length - index - 1;
            var frame = this.frames[index];

            // console.log(index);
            var texture = Tiny.Cache.texture[frame];

            // texture &&
            this.parent.setTexture(texture);
            // this.parent.setTexture(Tiny.Cache.texture[this.texture.key + "." +frame]);
            // console.log(progress);
        }
    }
}

Tiny.Anim.keyframes = KeyframesAnim;


/***/ }),

/***/ "./plugins/anim/SpritesheetAnim.js":
/*!*****************************************!*\
  !*** ./plugins/anim/SpritesheetAnim.js ***!
  \*****************************************/
/***/ (function() {

class SpritesheetAnim extends Tiny.Anim {
    constructor(obj, options) {
        super(obj, options);

        this.frames = [];
        this.currentIndex = 0;

        var data = options.data;

        if (typeof data === 'string') {
            data = { key: data };
        }

        if (Array.isArray(data)) this.frames = data;
        else if (data.key) {
            var texture = Tiny.Cache.texture[data.key + '.0'];

            if (texture) {
                var from = data.from || 0;
                var to = data.to || texture.lastFrame;

                for (var frame = from; frame <= to; frame++) {
                    this.frames.push(texture.key + '.' + frame);
                }
            }
        }

        if (this.frames.length > 0) {
            if (options.fps) this.duration = (1000 / options.fps) * this.frames.length;

            this.valid = true;
        }
    }

    reverse() {
        super.reverse();
        if (!this.repeatDelay) this._time += this.duration / this.frames.length;
    }

    setValue(progress) {
        var index = (this.frames.length * progress) | 0;
        if (index > this.frames.length - 1) index = this.frames.length - 1;

        // console.log(index);

        if (index != this.currentIndex) {
            this.currentIndex = index;
            // if (this.reverse) index = this.frames.length - index - 1;
            var frame = this.frames[index];

            // console.log(index);
            var texture = Tiny.Cache.texture[frame];

            // texture &&
            this.parent.setTexture(texture);
            // this.parent.setTexture(Tiny.Cache.texture[this.texture.key + "." +frame]);
            // console.log(progress);
        }
    }
}

Tiny.Anim.spritesheet = SpritesheetAnim;


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
/*!*******************************!*\
  !*** ./plugins/anim/index.js ***!
  \*******************************/
__webpack_require__(/*! ./Anim */ "./plugins/anim/Anim.js");
__webpack_require__(/*! ./SpritesheetAnim */ "./plugins/anim/SpritesheetAnim.js");
__webpack_require__(/*! ./KeyframesAnim */ "./plugins/anim/KeyframesAnim.js");
__webpack_require__(/*! ./AnimationManager */ "./plugins/anim/AnimationManager.js");
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9hbmltLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsYUFBYTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzdEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsbUJBQU8sQ0FBQyxzQ0FBUTtBQUNoQixtQkFBTyxDQUFDLDREQUFtQjtBQUMzQixtQkFBTyxDQUFDLHdEQUFpQjtBQUN6QixtQkFBTyxDQUFDLDhEQUFvQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9hbmltL0FuaW0uanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9hbmltL0FuaW1hdGlvbk1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9hbmltL0tleWZyYW1lc0FuaW0uanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9hbmltL1Nwcml0ZXNoZWV0QW5pbS5qcyIsIndlYnBhY2s6Ly9oNXRpbnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9hbmltL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFuaW0ge1xyXG4gICAgY29uc3RydWN0b3Iob2JqLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBvYmo7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMDtcclxuICAgICAgICB0aGlzLl90aW1lID0gMDtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlcGVhdCA9IG9wdGlvbnMucmVwZWF0IHx8IDA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IG9wdGlvbnMucmV2ZXJzZSB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLnlveW8gPSBvcHRpb25zLnlveW8gfHwgZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXBlYXREZWxheSA9IG9wdGlvbnMucmVwZWF0RGVsYXkgfHwgMDtcclxuICAgICAgICB0aGlzLl9kZWxheSA9IDA7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVsYXkpIHRoaXMuX2RlbGF5ID0gLW9wdGlvbnMuZGVsYXk7XHJcbiAgICB9XHJcbiAgICBzZXRWYWx1ZSgpIHt9XHJcbiAgICByZXZlcnNlKCkge1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2UgPSAhdGhpcy5fcmV2ZXJzZTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSgwKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShkZWx0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQud29ybGRUcmFuc2Zvcm0gfHwgIXRoaXMudmFsaWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucnVubmluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGVsYXkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWxheSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGltZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RpbWUgPiB0aGlzLmR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXQgPiAwIHx8IHRoaXMucmVwZWF0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lIC09IHRoaXMuZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAodGhpcy5fdGltZSA+IHRoaXMuZHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXQgPiAwKSB0aGlzLnJlcGVhdC0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXREZWxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWxheSA9IC10aGlzLnJlcGVhdERlbGF5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueW95bykgdGhpcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSB0aGlzLl90aW1lIC8gdGhpcy5kdXJhdGlvbjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JldmVyc2UpIHByb2dyZXNzID0gMSAtIHByb2dyZXNzO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHByb2dyZXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblRpbnkuQW5pbSA9IEFuaW07XHJcbiIsImNsYXNzIEFuaW1hdGlvbk1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5hbmltcyA9IHt9O1xyXG4gICAgICAgIHRoaXMudWlkID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUob3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCAnc3ByaXRlc2hlZXQnO1xyXG4gICAgICAgIHRoaXMuYW5pbXNbb3B0aW9ucy5rZXldID0gb3B0aW9ucztcclxuICAgICAgICAvLyB0aGlzLmxpc3QucHVzaChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUoYW5pbWF0aW9uKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5saXN0LmluZGV4T2YoYW5pbWF0aW9uKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKG9iaikge1xyXG4gICAgICAgIGxldCBtYW5hZ2VyID0gdGhpcztcclxuXHJcbiAgICAgICAgb2JqLmFuaW0gPSB7fTtcclxuXHJcbiAgICAgICAgb2JqLnBsYXkgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKG9iai5hbmltLmN1cnJlbnQpIG1hbmFnZXIucmVtb3ZlKG9iai5hbmltLmN1cnJlbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykgb3B0aW9ucyA9IHsga2V5OiBvcHRpb25zIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgc291cmNlID0gbWFuYWdlci5hbmltc1tvcHRpb25zLmtleV07XHJcbiAgICAgICAgICAgIHZhciBfX2NsYXNzX18gPSBUaW55LkFuaW1bc291cmNlLnR5cGVdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSBvcHRpb25zW2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IG5ldyBfX2NsYXNzX18ob2JqLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgb2JqLmFuaW0uY3VycmVudCA9IGFuaW1hdGlvbjtcclxuICAgICAgICAgICAgLy8gbWFuYWdlci5saXN0WysrdGhpcy51aWRdID0gYW5pbWF0aW9uO1xyXG4gICAgICAgICAgICBtYW5hZ2VyLmxpc3QucHVzaChhbmltYXRpb24pO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhbmltYXRpb247XHJcblxyXG4gICAgICAgICAgICAvLyBib2R5Li4uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLnBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvYmouYW5pbS5jdXJyZW50ICYmIG9iai5hbmltLmN1cnJlbnQucGF1c2UoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYmouc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG9iai5hbmltLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIG9iai5hbmltLmN1cnJlbnQuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlci5yZW1vdmUob2JqLmFuaW0uY3VycmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkZWx0YSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KGNsZWFyQ2FjaGUpIHtcclxuICAgICAgICB0aGlzLmxpc3QubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLmFuaW1zID0ge307XHJcbiAgICB9XHJcbn1cclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oJ2FuaW0nLCBBbmltYXRpb25NYW5hZ2VyKTtcclxuIiwiY2xhc3MgS2V5ZnJhbWVzQW5pbSBleHRlbmRzIFRpbnkuQW5pbSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvYmosIG9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihvYmosIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEgPSBvcHRpb25zLmRhdGE7XHJcbiAgICAgICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUocHJvZ3Jlc3MpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAodGhpcy5mcmFtZXMubGVuZ3RoICogcHJvZ3Jlc3MpIHwgMDtcclxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLmZyYW1lcy5sZW5ndGggLSAxKSBpbmRleCA9IHRoaXMuZnJhbWVzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ICE9IHRoaXMuY3VycmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnJldmVyc2UpIGluZGV4ID0gdGhpcy5mcmFtZXMubGVuZ3RoIC0gaW5kZXggLSAxO1xyXG4gICAgICAgICAgICB2YXIgZnJhbWUgPSB0aGlzLmZyYW1lc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmRleCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2ZyYW1lXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRleHR1cmUgJiZcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5wYXJlbnQuc2V0VGV4dHVyZShUaW55LkNhY2hlLnRleHR1cmVbdGhpcy50ZXh0dXJlLmtleSArIFwiLlwiICtmcmFtZV0pO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9ncmVzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5UaW55LkFuaW0ua2V5ZnJhbWVzID0gS2V5ZnJhbWVzQW5pbTtcclxuIiwiY2xhc3MgU3ByaXRlc2hlZXRBbmltIGV4dGVuZHMgVGlueS5BbmltIHtcclxuICAgIGNvbnN0cnVjdG9yKG9iaiwgb3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKG9iaiwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuZnJhbWVzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBkYXRhID0geyBrZXk6IGRhdGEgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB0aGlzLmZyYW1lcyA9IGRhdGE7XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YS5rZXkpIHtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbZGF0YS5rZXkgKyAnLjAnXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IGRhdGEuZnJvbSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvID0gZGF0YS50byB8fCB0ZXh0dXJlLmxhc3RGcmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBmcmFtZSA9IGZyb207IGZyYW1lIDw9IHRvOyBmcmFtZSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZXMucHVzaCh0ZXh0dXJlLmtleSArICcuJyArIGZyYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZnJhbWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZnBzKSB0aGlzLmR1cmF0aW9uID0gKDEwMDAgLyBvcHRpb25zLmZwcykgKiB0aGlzLmZyYW1lcy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpIHtcclxuICAgICAgICBzdXBlci5yZXZlcnNlKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlcGVhdERlbGF5KSB0aGlzLl90aW1lICs9IHRoaXMuZHVyYXRpb24gLyB0aGlzLmZyYW1lcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWUocHJvZ3Jlc3MpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAodGhpcy5mcmFtZXMubGVuZ3RoICogcHJvZ3Jlc3MpIHwgMDtcclxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLmZyYW1lcy5sZW5ndGggLSAxKSBpbmRleCA9IHRoaXMuZnJhbWVzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ICE9IHRoaXMuY3VycmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnJldmVyc2UpIGluZGV4ID0gdGhpcy5mcmFtZXMubGVuZ3RoIC0gaW5kZXggLSAxO1xyXG4gICAgICAgICAgICB2YXIgZnJhbWUgPSB0aGlzLmZyYW1lc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmRleCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2ZyYW1lXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRleHR1cmUgJiZcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5wYXJlbnQuc2V0VGV4dHVyZShUaW55LkNhY2hlLnRleHR1cmVbdGhpcy50ZXh0dXJlLmtleSArIFwiLlwiICtmcmFtZV0pO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9ncmVzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5UaW55LkFuaW0uc3ByaXRlc2hlZXQgPSBTcHJpdGVzaGVldEFuaW07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKCcuL0FuaW0nKTtcclxucmVxdWlyZSgnLi9TcHJpdGVzaGVldEFuaW0nKTtcclxucmVxdWlyZSgnLi9LZXlmcmFtZXNBbmltJyk7XHJcbnJlcXVpcmUoJy4vQW5pbWF0aW9uTWFuYWdlcicpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==