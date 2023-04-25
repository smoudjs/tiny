/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/anim/Anim.js":
/*!******************************!*\
  !*** ./plugins/anim/Anim.js ***!
  \******************************/
/***/ (function() {

var noop = function () {};

var _nextId = 0;

class Anim {
    constructor(obj, options) {
        this.uuid = _nextId++;
        this.key = options.key;
        this.system = options.system;
        this.parent = obj;
        this.valid = false;
        this.duration = options.duration || 1000;
        this._time = 0;
        this.running = false;
        this.repeat = options.repeat || 0;
        this._reverse = options.reverse || false;
        this.yoyo = options.yoyo || false;
        this.repeatDelay = options.repeatDelay || 0;
        this._delay = 0;
        this.onStart = options.onStart || noop;
        this.onStop = options.onStop || noop;
        this.onComplete = options.onComplete || noop;
        this.onRepeat = options.onRepeat || noop;
        if (options.delay) this._delay = -options.delay;
        this._onStartFired = false;
    }
    setValue() {}
    reverse() {
        this._reverse = !this._reverse;
    }
    start() {
        if (!this.running) {
            this.running = true;
            if (this.system) this.system.addAnim(this);
        }
    }
    pause() {
        if (this.running) {
            this.running = false;
            if (this.system) this.system.removeAnim(this);
        }
    }
    stop() {
        this.running = false;
        this._time = 0;
        this.setValue(0);
        if (this.system) this.system.removeAnim(this);
        this.onStop(this.parent);
    }
    update(delta) {
        if (!this.parent.worldTransform || !this.valid) return false;

        if (this.running) {
            if (this._delay < 0) {
                this._delay += delta;
                return true;
            }

            if (!this._onStartFired) {
                this._onStartFired = true;
                this.onStart(this.parent);
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
                    this.onRepeat(this.parent);
                } else {
                    this.onComplete(this.parent);
                    this._time = this.duration;
                    this.running = false;
                    return false;
                }
            }
            var progress = this._time / this.duration;
            if (this._reverse) progress = 1 - progress;
            this.setValue(progress);
        }

        return true;
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
        this.anims = {};
        // this._addedAnims = {};
        this.cache = {};
    }

    create(options) {
        options.system = this;
        options.type = options.type || 'spritesheet';
        this.cache[options.key] = options;
        // this.list.push(options);
    }

    removeAnim(animation) {
        var uuid = animation.uuid;
        delete this.anims[uuid];
        // delete this._addedAnims[uuid];

        // var index = this.list.indexOf(animation);
        // if (index > -1) this.list.splice(index, 1);
    }

    addAnim(anim) {
        var uuid = anim.uuid;
        this.anims[uuid] = anim;
        // this._addedAnims[uuid] = anim;
    }

    add(obj, data) {
        let manager = this;

        obj.anim = {
            cache: {},
            data: data || {},
            current: null,
            system: this
        };

        obj.play = function (options) {
            if (obj.anim.current) manager.removeAnim(obj.anim.current);

            if (typeof options === 'string') options = { key: options };

            var source = manager.cache[options.key];
            var __class__ = Tiny.Anim[source.type];

            for (var key in source) {
                if (options[key] === undefined) options[key] = source[key];
            }

            var animation = new __class__(obj, options);
            obj.anim.current = animation;

            // manager.list.push(animation);
            animation.start();
            // manager.addAnim(animation);

            return animation;

            // body...
        };

        obj.resume = function () {
            obj.anim.current && obj.anim.current.start();
        };

        obj.pause = function () {
            obj.anim.current && obj.anim.current.pause();
        };

        obj.stop = function () {
            obj.anim.current && obj.anim.current.stop();
        };
    }

    update(delta) {
        // for (var i = 0; i < this.list.length; i++) {
        //     this.list[i].update(delta);
        // }

        var _ids = Object.keys(this.anims);

        if (_ids.length === 0) return;

        // do {
        //     this._addedAnims = {};

        for (var i = 0; i < _ids.length; i++) {
            var anim = this.anims[_ids[i]];

            if (anim && anim.update(delta) === false) {
                // anim.running = false;

                // if (!preserve) {
                delete this.anims[_ids[i]];
                // }
            }
        }

        //     _ids = Object.keys(this._addedAnims);

        // } while (_ids.length > 0);

        // while (ids.length > 0) {
        //     this._addedAnims = {};

        // for (var i = 0; i < ids.length; i++) {
        //     var anim = this.anims[ids[i]];

        //     if (anim && anim.update(delta) === false) {
        //         // anim.running = false;

        //         // if (!preserve) {
        //         delete this.anims[ids[i]];
        //         // }
        //     }
        // }

        // ids = Object.keys(this._addedAnims);
        // }

        return true;
    }

    destroy(clearCache) {
        // this.list.length = 0;
        this.cache = {};
        this.anims = {};
        // this._addedAnims = {};
    }
}

Tiny.registerSystem('anim', AnimationManager);


/***/ }),

/***/ "./plugins/anim/KeyframesAnim.js":
/*!***************************************!*\
  !*** ./plugins/anim/KeyframesAnim.js ***!
  \***************************************/
/***/ (function() {

var path, len;

class KeyframesAnim extends Tiny.Anim {
    constructor(parent, options) {
        super(parent, options);

        this.setFrames(options.data);

        if (!options.duration) this.duration = this._duration;
    }

    setFrames(frames) {
        var parent = this.parent;

        this.setPose();

        var skeleton = parent.anim.data;
        parent.anim.pose = parent.anim.pose || {};
        var pose = parent.anim.pose;

        if (!skeleton || !frames) return;

        var values = frames.values;
        var times = frames.times;

        var lastTime = times[times.length - 1];

        if (!lastTime) return;

        this._duration = lastTime * 1000;

        if (parent.anim.cache[this.key]) {
            this.frames = parent.anim.cache[this.key];
            this.valid = true;
            return;
        }

        this.frames = [];

        var prevs = {};

        for (var index = 0; index < times.length; index++) {
            var time = times[index];
            var _values = values[index];
            var trigger = time / lastTime;

            var paths = [];

            var prevDelta;

            if (index === 0) {
                prevDelta = trigger;
            } else {
                prevDelta = trigger - this.frames[index - 1].trigger;
            }

            this.frames.push({
                trigger: trigger,
                paths: paths,
                prevDelta: prevDelta
            });

            if (!_values || _values.length === 0) continue;

            for (let v = 0; v < _values.length; v++) {
                var params = _values[v];
                var name = params.name;

                var obj = parent;
                var key, prev;
                if (name) obj = skeleton[name];
                else name = '__default__';

                if (!obj) continue;

                for (var prop in params) {
                    if (prop == 'name') continue;

                    if (typeof params[prop] == 'object') {
                        for (var p in params[prop]) {
                            prev = prevs[name + prop + p];
                            if (prev == null) {
                                key = name + '.' + prop;
                                pose[key] = pose[key] || {};
                                prev = pose[key][p];
                                if (prev == null) {
                                    prev = obj[prop][p];
                                    pose[key][p] = prev;
                                }
                            }
                            paths.push({ obj: obj[prop], name: p, val: params[prop][p], prev: prev });
                            prevs[name + prop + p] = params[prop][p];
                        }
                    } else {
                        prev = prevs[name + prop];
                        if (prev == null) {
                            key = name + '.' + prop;
                            prev = pose[key];
                            if (prev == null) {
                                prev = obj[prop];
                                pose[key] = prev;
                            }
                        }
                        paths.push({ obj: obj, name: prop, val: params[prop], prev: prev });
                        prevs[name + prop] = params[prop];
                    }
                }
            }
        }

        if (Object.keys(prevs).length === 0) return;

        // for (var index = 0; index < this.frames.length; index++) {
        //     var frame = this.frames[index];
        //     var trigger = frame.trigger;

        //     var prevDelta = 1;

        //     if (index === 0) {
        //         prevDelta = trigger;
        //     } else {
        //         prevDelta = trigger - this.frames[index - 1].trigger;
        //     }

        //     frame.prevDelta = prevDelta;
        // }

        // console.log(this.frames);
        // console.log(pose);

        this.lastIndex = this._reverse ? this.frames.length - 1 : 0;

        this.valid = true;

        parent.anim.cache[this.key] = this.frames;
    }

    setPose(pose) {
        var parent = this.parent;

        if (pose) parent.anim.pose = pose;
        pose = parent.anim.pose;
        var skeleton = parent.anim.data;

        for (var key in pose) {
            var splited = key.split('.');
            var obj = skeleton[splited[0]];
            if (!obj) obj = parent;
            var prop = splited[1];

            if (typeof pose[key] == 'object') {
                for (var p in pose[key]) {
                    obj[prop][p] = pose[key][p];
                }
            } else {
                obj[prop] = pose[key];
            }
        }
    }

    _setValue(frame, progress) {
        len = frame.paths.length;

        if (len == 0) return;

        while (len--) {
            path = frame.paths[len];
            path.obj[path.name] = path.prev + (path.val - path.prev) * progress;
        }
    }

    setValue(progress) {
        var index = 0;
        var frame = this.frames[index];

        // console.log(progress);
        while (frame.trigger < progress) {
            frame = this.frames[++index];
        }

        if (index != this.lastIndex) {
            this.lastIndex = index;
            if (this._reverse) this._setValue(this.frames[this.lastIndex], 0);
            else this._setValue(this.frames[this.lastIndex], 1);
        }

        this._setValue(frame, 1 - (frame.trigger - progress) / frame.prevDelta);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLG1CQUFPLENBQUMsc0NBQVE7QUFDaEIsbUJBQU8sQ0FBQyw0REFBbUI7QUFDM0IsbUJBQU8sQ0FBQyx3REFBaUI7QUFDekIsbUJBQU8sQ0FBQyw4REFBb0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvYW5pbS9BbmltLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvYW5pbS9BbmltYXRpb25NYW5hZ2VyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvYW5pbS9LZXlmcmFtZXNBbmltLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvYW5pbS9TcHJpdGVzaGVldEFuaW0uanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvYW5pbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxudmFyIF9uZXh0SWQgPSAwO1xyXG5cclxuY2xhc3MgQW5pbSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvYmosIG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnV1aWQgPSBfbmV4dElkKys7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcclxuICAgICAgICB0aGlzLnN5c3RlbSA9IG9wdGlvbnMuc3lzdGVtO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gb2JqO1xyXG4gICAgICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVwZWF0ID0gb3B0aW9ucy5yZXBlYXQgfHwgMDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlIHx8IGZhbHNlO1xyXG4gICAgICAgIHRoaXMueW95byA9IG9wdGlvbnMueW95byB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlcGVhdERlbGF5ID0gb3B0aW9ucy5yZXBlYXREZWxheSB8fCAwO1xyXG4gICAgICAgIHRoaXMuX2RlbGF5ID0gMDtcclxuICAgICAgICB0aGlzLm9uU3RhcnQgPSBvcHRpb25zLm9uU3RhcnQgfHwgbm9vcDtcclxuICAgICAgICB0aGlzLm9uU3RvcCA9IG9wdGlvbnMub25TdG9wIHx8IG5vb3A7XHJcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlID0gb3B0aW9ucy5vbkNvbXBsZXRlIHx8IG5vb3A7XHJcbiAgICAgICAgdGhpcy5vblJlcGVhdCA9IG9wdGlvbnMub25SZXBlYXQgfHwgbm9vcDtcclxuICAgICAgICBpZiAob3B0aW9ucy5kZWxheSkgdGhpcy5fZGVsYXkgPSAtb3B0aW9ucy5kZWxheTtcclxuICAgICAgICB0aGlzLl9vblN0YXJ0RmlyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldFZhbHVlKCkge31cclxuICAgIHJldmVyc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9ICF0aGlzLl9yZXZlcnNlO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3lzdGVtKSB0aGlzLnN5c3RlbS5hZGRBbmltKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN5c3RlbSkgdGhpcy5zeXN0ZW0ucmVtb3ZlQW5pbSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoMCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtKSB0aGlzLnN5c3RlbS5yZW1vdmVBbmltKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25TdG9wKHRoaXMucGFyZW50KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShkZWx0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQud29ybGRUcmFuc2Zvcm0gfHwgIXRoaXMudmFsaWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucnVubmluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGVsYXkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWxheSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX29uU3RhcnRGaXJlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25TdGFydEZpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TdGFydCh0aGlzLnBhcmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgKz0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aW1lID4gdGhpcy5kdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVwZWF0ID4gMCB8fCB0aGlzLnJlcGVhdCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZSAtPSB0aGlzLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHRoaXMuX3RpbWUgPiB0aGlzLmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVwZWF0ID4gMCkgdGhpcy5yZXBlYXQtLTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVwZWF0RGVsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVsYXkgPSAtdGhpcy5yZXBlYXREZWxheTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlveW8pIHRoaXMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SZXBlYXQodGhpcy5wYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUodGhpcy5wYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSB0aGlzLl90aW1lIC8gdGhpcy5kdXJhdGlvbjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JldmVyc2UpIHByb2dyZXNzID0gMSAtIHByb2dyZXNzO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHByb2dyZXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5UaW55LkFuaW0gPSBBbmltO1xyXG4iLCJjbGFzcyBBbmltYXRpb25NYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuYW5pbXMgPSB7fTtcclxuICAgICAgICAvLyB0aGlzLl9hZGRlZEFuaW1zID0ge307XHJcbiAgICAgICAgdGhpcy5jYWNoZSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucy5zeXN0ZW0gPSB0aGlzO1xyXG4gICAgICAgIG9wdGlvbnMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCAnc3ByaXRlc2hlZXQnO1xyXG4gICAgICAgIHRoaXMuY2FjaGVbb3B0aW9ucy5rZXldID0gb3B0aW9ucztcclxuICAgICAgICAvLyB0aGlzLmxpc3QucHVzaChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbmltKGFuaW1hdGlvbikge1xyXG4gICAgICAgIHZhciB1dWlkID0gYW5pbWF0aW9uLnV1aWQ7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuYW5pbXNbdXVpZF07XHJcbiAgICAgICAgLy8gZGVsZXRlIHRoaXMuX2FkZGVkQW5pbXNbdXVpZF07XHJcblxyXG4gICAgICAgIC8vIHZhciBpbmRleCA9IHRoaXMubGlzdC5pbmRleE9mKGFuaW1hdGlvbik7XHJcbiAgICAgICAgLy8gaWYgKGluZGV4ID4gLTEpIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEFuaW0oYW5pbSkge1xyXG4gICAgICAgIHZhciB1dWlkID0gYW5pbS51dWlkO1xyXG4gICAgICAgIHRoaXMuYW5pbXNbdXVpZF0gPSBhbmltO1xyXG4gICAgICAgIC8vIHRoaXMuX2FkZGVkQW5pbXNbdXVpZF0gPSBhbmltO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChvYmosIGRhdGEpIHtcclxuICAgICAgICBsZXQgbWFuYWdlciA9IHRoaXM7XHJcblxyXG4gICAgICAgIG9iai5hbmltID0ge1xyXG4gICAgICAgICAgICBjYWNoZToge30sXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEgfHwge30sXHJcbiAgICAgICAgICAgIGN1cnJlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIHN5c3RlbTogdGhpc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5wbGF5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKG9iai5hbmltLmN1cnJlbnQpIG1hbmFnZXIucmVtb3ZlQW5pbShvYmouYW5pbS5jdXJyZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIG9wdGlvbnMgPSB7IGtleTogb3B0aW9ucyB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IG1hbmFnZXIuY2FjaGVbb3B0aW9ucy5rZXldO1xyXG4gICAgICAgICAgICB2YXIgX19jbGFzc19fID0gVGlueS5BbmltW3NvdXJjZS50eXBlXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCkgb3B0aW9uc1trZXldID0gc291cmNlW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbmltYXRpb24gPSBuZXcgX19jbGFzc19fKG9iaiwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG9iai5hbmltLmN1cnJlbnQgPSBhbmltYXRpb247XHJcblxyXG4gICAgICAgICAgICAvLyBtYW5hZ2VyLmxpc3QucHVzaChhbmltYXRpb24pO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uc3RhcnQoKTtcclxuICAgICAgICAgICAgLy8gbWFuYWdlci5hZGRBbmltKGFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy8gYm9keS4uLlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9iai5hbmltLmN1cnJlbnQgJiYgb2JqLmFuaW0uY3VycmVudC5zdGFydCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9iai5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb2JqLmFuaW0uY3VycmVudCAmJiBvYmouYW5pbS5jdXJyZW50LnBhdXNlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb2JqLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9iai5hbmltLmN1cnJlbnQgJiYgb2JqLmFuaW0uY3VycmVudC5zdG9wKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGVsdGEpIHtcclxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxpc3RbaV0udXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHZhciBfaWRzID0gT2JqZWN0LmtleXModGhpcy5hbmltcyk7XHJcblxyXG4gICAgICAgIGlmIChfaWRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBkbyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX2FkZGVkQW5pbXMgPSB7fTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfaWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhbmltID0gdGhpcy5hbmltc1tfaWRzW2ldXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhbmltICYmIGFuaW0udXBkYXRlKGRlbHRhKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFuaW0ucnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmICghcHJlc2VydmUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFuaW1zW19pZHNbaV1dO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgX2lkcyA9IE9iamVjdC5rZXlzKHRoaXMuX2FkZGVkQW5pbXMpO1xyXG5cclxuICAgICAgICAvLyB9IHdoaWxlIChfaWRzLmxlbmd0aCA+IDApO1xyXG5cclxuICAgICAgICAvLyB3aGlsZSAoaWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5fYWRkZWRBbmltcyA9IHt9O1xyXG5cclxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICB2YXIgYW5pbSA9IHRoaXMuYW5pbXNbaWRzW2ldXTtcclxuXHJcbiAgICAgICAgLy8gICAgIGlmIChhbmltICYmIGFuaW0udXBkYXRlKGRlbHRhKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGFuaW0ucnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGlmICghcHJlc2VydmUpIHtcclxuICAgICAgICAvLyAgICAgICAgIGRlbGV0ZSB0aGlzLmFuaW1zW2lkc1tpXV07XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGlkcyA9IE9iamVjdC5rZXlzKHRoaXMuX2FkZGVkQW5pbXMpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveShjbGVhckNhY2hlKSB7XHJcbiAgICAgICAgLy8gdGhpcy5saXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5jYWNoZSA9IHt9O1xyXG4gICAgICAgIHRoaXMuYW5pbXMgPSB7fTtcclxuICAgICAgICAvLyB0aGlzLl9hZGRlZEFuaW1zID0ge307XHJcbiAgICB9XHJcbn1cclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oJ2FuaW0nLCBBbmltYXRpb25NYW5hZ2VyKTtcclxuIiwidmFyIHBhdGgsIGxlbjtcclxuXHJcbmNsYXNzIEtleWZyYW1lc0FuaW0gZXh0ZW5kcyBUaW55LkFuaW0ge1xyXG4gICAgY29uc3RydWN0b3IocGFyZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIocGFyZW50LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRGcmFtZXMob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmR1cmF0aW9uKSB0aGlzLmR1cmF0aW9uID0gdGhpcy5fZHVyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RnJhbWVzKGZyYW1lcykge1xyXG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudDtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRQb3NlKCk7XHJcblxyXG4gICAgICAgIHZhciBza2VsZXRvbiA9IHBhcmVudC5hbmltLmRhdGE7XHJcbiAgICAgICAgcGFyZW50LmFuaW0ucG9zZSA9IHBhcmVudC5hbmltLnBvc2UgfHwge307XHJcbiAgICAgICAgdmFyIHBvc2UgPSBwYXJlbnQuYW5pbS5wb3NlO1xyXG5cclxuICAgICAgICBpZiAoIXNrZWxldG9uIHx8ICFmcmFtZXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIHZhbHVlcyA9IGZyYW1lcy52YWx1ZXM7XHJcbiAgICAgICAgdmFyIHRpbWVzID0gZnJhbWVzLnRpbWVzO1xyXG5cclxuICAgICAgICB2YXIgbGFzdFRpbWUgPSB0aW1lc1t0aW1lcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgaWYgKCFsYXN0VGltZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGxhc3RUaW1lICogMTAwMDtcclxuXHJcbiAgICAgICAgaWYgKHBhcmVudC5hbmltLmNhY2hlW3RoaXMua2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lcyA9IHBhcmVudC5hbmltLmNhY2hlW3RoaXMua2V5XTtcclxuICAgICAgICAgICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZnJhbWVzID0gW107XHJcblxyXG4gICAgICAgIHZhciBwcmV2cyA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGltZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gdGltZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB2YXIgX3ZhbHVlcyA9IHZhbHVlc1tpbmRleF07XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyID0gdGltZSAvIGxhc3RUaW1lO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhdGhzID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJldkRlbHRhO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2RGVsdGEgPSB0cmlnZ2VyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJldkRlbHRhID0gdHJpZ2dlciAtIHRoaXMuZnJhbWVzW2luZGV4IC0gMV0udHJpZ2dlcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5mcmFtZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxyXG4gICAgICAgICAgICAgICAgcGF0aHM6IHBhdGhzLFxyXG4gICAgICAgICAgICAgICAgcHJldkRlbHRhOiBwcmV2RGVsdGFcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIV92YWx1ZXMgfHwgX3ZhbHVlcy5sZW5ndGggPT09IDApIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCBfdmFsdWVzLmxlbmd0aDsgdisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gX3ZhbHVlc1t2XTtcclxuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gcGFyYW1zLm5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHBhcmVudDtcclxuICAgICAgICAgICAgICAgIHZhciBrZXksIHByZXY7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSkgb2JqID0gc2tlbGV0b25bbmFtZV07XHJcbiAgICAgICAgICAgICAgICBlbHNlIG5hbWUgPSAnX19kZWZhdWx0X18nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb2JqKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wID09ICduYW1lJykgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zW3Byb3BdID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcGFyYW1zW3Byb3BdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ID0gcHJldnNbbmFtZSArIHByb3AgKyBwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBuYW1lICsgJy4nICsgcHJvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NlW2tleV0gPSBwb3NlW2tleV0gfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IHBvc2Vba2V5XVtwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXYgPSBvYmpbcHJvcF1bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2Vba2V5XVtwXSA9IHByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHMucHVzaCh7IG9iajogb2JqW3Byb3BdLCBuYW1lOiBwLCB2YWw6IHBhcmFtc1twcm9wXVtwXSwgcHJldjogcHJldiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZzW25hbWUgKyBwcm9wICsgcF0gPSBwYXJhbXNbcHJvcF1bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2ID0gcHJldnNbbmFtZSArIHByb3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBuYW1lICsgJy4nICsgcHJvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXYgPSBwb3NlW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IG9ialtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NlW2tleV0gPSBwcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhzLnB1c2goeyBvYmo6IG9iaiwgbmFtZTogcHJvcCwgdmFsOiBwYXJhbXNbcHJvcF0sIHByZXY6IHByZXYgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZzW25hbWUgKyBwcm9wXSA9IHBhcmFtc1twcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwcmV2cykubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmZyYW1lcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAvLyAgICAgdmFyIGZyYW1lID0gdGhpcy5mcmFtZXNbaW5kZXhdO1xyXG4gICAgICAgIC8vICAgICB2YXIgdHJpZ2dlciA9IGZyYW1lLnRyaWdnZXI7XHJcblxyXG4gICAgICAgIC8vICAgICB2YXIgcHJldkRlbHRhID0gMTtcclxuXHJcbiAgICAgICAgLy8gICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgIC8vICAgICAgICAgcHJldkRlbHRhID0gdHJpZ2dlcjtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIHByZXZEZWx0YSA9IHRyaWdnZXIgLSB0aGlzLmZyYW1lc1tpbmRleCAtIDFdLnRyaWdnZXI7XHJcbiAgICAgICAgLy8gICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIGZyYW1lLnByZXZEZWx0YSA9IHByZXZEZWx0YTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZnJhbWVzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwb3NlKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0SW5kZXggPSB0aGlzLl9yZXZlcnNlID8gdGhpcy5mcmFtZXMubGVuZ3RoIC0gMSA6IDA7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBwYXJlbnQuYW5pbS5jYWNoZVt0aGlzLmtleV0gPSB0aGlzLmZyYW1lcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NlKHBvc2UpIHtcclxuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XHJcblxyXG4gICAgICAgIGlmIChwb3NlKSBwYXJlbnQuYW5pbS5wb3NlID0gcG9zZTtcclxuICAgICAgICBwb3NlID0gcGFyZW50LmFuaW0ucG9zZTtcclxuICAgICAgICB2YXIgc2tlbGV0b24gPSBwYXJlbnQuYW5pbS5kYXRhO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcG9zZSkge1xyXG4gICAgICAgICAgICB2YXIgc3BsaXRlZCA9IGtleS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gc2tlbGV0b25bc3BsaXRlZFswXV07XHJcbiAgICAgICAgICAgIGlmICghb2JqKSBvYmogPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gc3BsaXRlZFsxXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcG9zZVtrZXldID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwIGluIHBvc2Vba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialtwcm9wXVtwXSA9IHBvc2Vba2V5XVtwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9ialtwcm9wXSA9IHBvc2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2V0VmFsdWUoZnJhbWUsIHByb2dyZXNzKSB7XHJcbiAgICAgICAgbGVuID0gZnJhbWUucGF0aHMubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAobGVuID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgd2hpbGUgKGxlbi0tKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBmcmFtZS5wYXRoc1tsZW5dO1xyXG4gICAgICAgICAgICBwYXRoLm9ialtwYXRoLm5hbWVdID0gcGF0aC5wcmV2ICsgKHBhdGgudmFsIC0gcGF0aC5wcmV2KSAqIHByb2dyZXNzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZShwcm9ncmVzcykge1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIGZyYW1lID0gdGhpcy5mcmFtZXNbaW5kZXhdO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9ncmVzcyk7XHJcbiAgICAgICAgd2hpbGUgKGZyYW1lLnRyaWdnZXIgPCBwcm9ncmVzcykge1xyXG4gICAgICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWVzWysraW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4ICE9IHRoaXMubGFzdEluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZXZlcnNlKSB0aGlzLl9zZXRWYWx1ZSh0aGlzLmZyYW1lc1t0aGlzLmxhc3RJbmRleF0sIDApO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuX3NldFZhbHVlKHRoaXMuZnJhbWVzW3RoaXMubGFzdEluZGV4XSwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zZXRWYWx1ZShmcmFtZSwgMSAtIChmcmFtZS50cmlnZ2VyIC0gcHJvZ3Jlc3MpIC8gZnJhbWUucHJldkRlbHRhKTtcclxuICAgIH1cclxufVxyXG5cclxuVGlueS5BbmltLmtleWZyYW1lcyA9IEtleWZyYW1lc0FuaW07XHJcbiIsImNsYXNzIFNwcml0ZXNoZWV0QW5pbSBleHRlbmRzIFRpbnkuQW5pbSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvYmosIG9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihvYmosIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLmZyYW1lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgZGF0YSA9IHsga2V5OiBkYXRhIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgdGhpcy5mcmFtZXMgPSBkYXRhO1xyXG4gICAgICAgIGVsc2UgaWYgKGRhdGEua2V5KSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2RhdGEua2V5ICsgJy4wJ107XHJcblxyXG4gICAgICAgICAgICBpZiAodGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBkYXRhLmZyb20gfHwgMDtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IGRhdGEudG8gfHwgdGV4dHVyZS5sYXN0RnJhbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZnJhbWUgPSBmcm9tOyBmcmFtZSA8PSB0bzsgZnJhbWUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVzLnB1c2godGV4dHVyZS5rZXkgKyAnLicgKyBmcmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZyYW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmZwcykgdGhpcy5kdXJhdGlvbiA9ICgxMDAwIC8gb3B0aW9ucy5mcHMpICogdGhpcy5mcmFtZXMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKSB7XHJcbiAgICAgICAgc3VwZXIucmV2ZXJzZSgpO1xyXG4gICAgICAgIGlmICghdGhpcy5yZXBlYXREZWxheSkgdGhpcy5fdGltZSArPSB0aGlzLmR1cmF0aW9uIC8gdGhpcy5mcmFtZXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbHVlKHByb2dyZXNzKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gKHRoaXMuZnJhbWVzLmxlbmd0aCAqIHByb2dyZXNzKSB8IDA7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gdGhpcy5mcmFtZXMubGVuZ3RoIC0gMSkgaW5kZXggPSB0aGlzLmZyYW1lcy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmRleCk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCAhPSB0aGlzLmN1cnJlbnRJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5yZXZlcnNlKSBpbmRleCA9IHRoaXMuZnJhbWVzLmxlbmd0aCAtIGluZGV4IC0gMTtcclxuICAgICAgICAgICAgdmFyIGZyYW1lID0gdGhpcy5mcmFtZXNbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IFRpbnkuQ2FjaGUudGV4dHVyZVtmcmFtZV07XHJcblxyXG4gICAgICAgICAgICAvLyB0ZXh0dXJlICYmXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnNldFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucGFyZW50LnNldFRleHR1cmUoVGlueS5DYWNoZS50ZXh0dXJlW3RoaXMudGV4dHVyZS5rZXkgKyBcIi5cIiArZnJhbWVdKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZ3Jlc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuVGlueS5BbmltLnNwcml0ZXNoZWV0ID0gU3ByaXRlc2hlZXRBbmltO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZSgnLi9BbmltJyk7XHJcbnJlcXVpcmUoJy4vU3ByaXRlc2hlZXRBbmltJyk7XHJcbnJlcXVpcmUoJy4vS2V5ZnJhbWVzQW5pbScpO1xyXG5yZXF1aXJlKCcuL0FuaW1hdGlvbk1hbmFnZXInKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=