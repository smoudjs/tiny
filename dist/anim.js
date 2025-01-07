/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./packages/anim/Anim.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var noop = function noop() {};
var _nextId = 0;
var Anim = /*#__PURE__*/function () {
  function Anim(obj, options) {
    _classCallCheck(this, Anim);
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
  return _createClass(Anim, [{
    key: "setValue",
    value: function setValue() {}
  }, {
    key: "reverse",
    value: function reverse() {
      this._reverse = !this._reverse;
    }
  }, {
    key: "start",
    value: function start() {
      if (!this.running) {
        this.running = true;
        if (this.system) this.system.addAnim(this);
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.running) {
        this.running = false;
        if (this.system) this.system.removeAnim(this);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
      this._time = 0;
      this.setValue(0);
      if (this.system) this.system.removeAnim(this);
      this.onStop(this.parent);
    }
  }, {
    key: "update",
    value: function update(delta) {
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
  }]);
}();

;// ./packages/anim/SpritesheetAnim.js
function SpritesheetAnim_typeof(o) { "@babel/helpers - typeof"; return SpritesheetAnim_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, SpritesheetAnim_typeof(o); }
function SpritesheetAnim_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function SpritesheetAnim_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, SpritesheetAnim_toPropertyKey(o.key), o); } }
function SpritesheetAnim_createClass(e, r, t) { return r && SpritesheetAnim_defineProperties(e.prototype, r), t && SpritesheetAnim_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function SpritesheetAnim_toPropertyKey(t) { var i = SpritesheetAnim_toPrimitive(t, "string"); return "symbol" == SpritesheetAnim_typeof(i) ? i : i + ""; }
function SpritesheetAnim_toPrimitive(t, r) { if ("object" != SpritesheetAnim_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != SpritesheetAnim_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == SpritesheetAnim_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var SpritesheetAnim = /*#__PURE__*/function (_Anim) {
  function SpritesheetAnim(obj, options) {
    var _this;
    SpritesheetAnim_classCallCheck(this, SpritesheetAnim);
    _this = _callSuper(this, SpritesheetAnim, [obj, options]);
    _this.frames = [];
    _this.currentIndex = 0;
    var data = options.data;
    if (typeof data === 'string') {
      data = {
        key: data
      };
    }
    if (Array.isArray(data)) _this.frames = data;else if (data.key) {
      var texture = Tiny.Cache.texture[data.key + '.0'];
      if (texture) {
        var from = data.from || 0;
        var to = data.to || texture.lastFrame;
        for (var frame = from; frame <= to; frame++) {
          _this.frames.push(texture.key + '.' + frame);
        }
      }
    }
    if (_this.frames.length > 0) {
      if (options.fps) _this.duration = 1000 / options.fps * _this.frames.length;
      _this.valid = true;
    }
    return _this;
  }
  _inherits(SpritesheetAnim, _Anim);
  return SpritesheetAnim_createClass(SpritesheetAnim, [{
    key: "reverse",
    value: function reverse() {
      _superPropGet(SpritesheetAnim, "reverse", this, 3)([]);
      if (!this.repeatDelay) this._time += this.duration / this.frames.length;
    }
  }, {
    key: "setValue",
    value: function setValue(progress) {
      var index = this.frames.length * progress | 0;
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
  }]);
}(Anim);
Anim.spritesheet = SpritesheetAnim;

;// ./packages/anim/KeyframesAnim.js
function KeyframesAnim_typeof(o) { "@babel/helpers - typeof"; return KeyframesAnim_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, KeyframesAnim_typeof(o); }
function KeyframesAnim_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function KeyframesAnim_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, KeyframesAnim_toPropertyKey(o.key), o); } }
function KeyframesAnim_createClass(e, r, t) { return r && KeyframesAnim_defineProperties(e.prototype, r), t && KeyframesAnim_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function KeyframesAnim_toPropertyKey(t) { var i = KeyframesAnim_toPrimitive(t, "string"); return "symbol" == KeyframesAnim_typeof(i) ? i : i + ""; }
function KeyframesAnim_toPrimitive(t, r) { if ("object" != KeyframesAnim_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != KeyframesAnim_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function KeyframesAnim_callSuper(t, o, e) { return o = KeyframesAnim_getPrototypeOf(o), KeyframesAnim_possibleConstructorReturn(t, KeyframesAnim_isNativeReflectConstruct() ? Reflect.construct(o, e || [], KeyframesAnim_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function KeyframesAnim_possibleConstructorReturn(t, e) { if (e && ("object" == KeyframesAnim_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return KeyframesAnim_assertThisInitialized(t); }
function KeyframesAnim_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function KeyframesAnim_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (KeyframesAnim_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function KeyframesAnim_getPrototypeOf(t) { return KeyframesAnim_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, KeyframesAnim_getPrototypeOf(t); }
function KeyframesAnim_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && KeyframesAnim_setPrototypeOf(t, e); }
function KeyframesAnim_setPrototypeOf(t, e) { return KeyframesAnim_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, KeyframesAnim_setPrototypeOf(t, e); }

var path, len;
var KeyframesAnim = /*#__PURE__*/function (_Anim) {
  function KeyframesAnim(parent, options) {
    var _this;
    KeyframesAnim_classCallCheck(this, KeyframesAnim);
    _this = KeyframesAnim_callSuper(this, KeyframesAnim, [parent, options]);
    _this.setFrames(options.data);
    if (!options.duration) _this.duration = _this._duration;
    return _this;
  }
  KeyframesAnim_inherits(KeyframesAnim, _Anim);
  return KeyframesAnim_createClass(KeyframesAnim, [{
    key: "setFrames",
    value: function setFrames(frames) {
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
        for (var v = 0; v < _values.length; v++) {
          var params = _values[v];
          var name = params.name;
          var obj = parent;
          var key, prev;
          if (name) obj = skeleton[name];else name = '__default__';
          if (!obj) continue;
          for (var prop in params) {
            if (prop == 'name') continue;
            if (KeyframesAnim_typeof(params[prop]) == 'object') {
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
                paths.push({
                  obj: obj[prop],
                  name: p,
                  val: params[prop][p],
                  prev: prev
                });
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
              paths.push({
                obj: obj,
                name: prop,
                val: params[prop],
                prev: prev
              });
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
  }, {
    key: "setPose",
    value: function setPose(pose) {
      var parent = this.parent;
      if (pose) parent.anim.pose = pose;
      pose = parent.anim.pose;
      var skeleton = parent.anim.data;
      for (var key in pose) {
        var splited = key.split('.');
        var obj = skeleton[splited[0]];
        if (!obj) obj = parent;
        var prop = splited[1];
        if (KeyframesAnim_typeof(pose[key]) == 'object') {
          for (var p in pose[key]) {
            obj[prop][p] = pose[key][p];
          }
        } else {
          obj[prop] = pose[key];
        }
      }
    }
  }, {
    key: "_setValue",
    value: function _setValue(frame, progress) {
      len = frame.paths.length;
      if (len == 0) return;
      while (len--) {
        path = frame.paths[len];
        path.obj[path.name] = path.prev + (path.val - path.prev) * progress;
      }
    }
  }, {
    key: "setValue",
    value: function setValue(progress) {
      var index = 0;
      var frame = this.frames[index];

      // console.log(progress);
      while (frame.trigger < progress) {
        frame = this.frames[++index];
      }
      if (index != this.lastIndex) {
        this.lastIndex = index;
        if (this._reverse) this._setValue(this.frames[this.lastIndex], 0);else this._setValue(this.frames[this.lastIndex], 1);
      }
      this._setValue(frame, 1 - (frame.trigger - progress) / frame.prevDelta);
    }
  }]);
}(Anim);
Anim.keyframes = KeyframesAnim;

;// ./packages/anim/AnimationManager.js
function AnimationManager_typeof(o) { "@babel/helpers - typeof"; return AnimationManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, AnimationManager_typeof(o); }
function AnimationManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function AnimationManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, AnimationManager_toPropertyKey(o.key), o); } }
function AnimationManager_createClass(e, r, t) { return r && AnimationManager_defineProperties(e.prototype, r), t && AnimationManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function AnimationManager_toPropertyKey(t) { var i = AnimationManager_toPrimitive(t, "string"); return "symbol" == AnimationManager_typeof(i) ? i : i + ""; }
function AnimationManager_toPrimitive(t, r) { if ("object" != AnimationManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != AnimationManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var AnimationManager = /*#__PURE__*/function () {
  function AnimationManager(game) {
    AnimationManager_classCallCheck(this, AnimationManager);
    this.game = game;
    this.anims = {};
    // this._addedAnims = {};
    this.cache = {};
  }
  return AnimationManager_createClass(AnimationManager, [{
    key: "create",
    value: function create(options) {
      options.system = this;
      options.type = options.type || 'spritesheet';
      this.cache[options.key] = options;
      // this.list.push(options);
    }
  }, {
    key: "removeAnim",
    value: function removeAnim(animation) {
      var uuid = animation.uuid;
      delete this.anims[uuid];
      // delete this._addedAnims[uuid];

      // var index = this.list.indexOf(animation);
      // if (index > -1) this.list.splice(index, 1);
    }
  }, {
    key: "addAnim",
    value: function addAnim(anim) {
      var uuid = anim.uuid;
      this.anims[uuid] = anim;
      // this._addedAnims[uuid] = anim;
    }
  }, {
    key: "add",
    value: function add(obj, data) {
      var manager = this;
      obj.anim = {
        cache: {},
        data: data || {},
        current: null,
        system: this
      };
      obj.play = function (options) {
        if (obj.anim.current) manager.removeAnim(obj.anim.current);
        if (typeof options === 'string') options = {
          key: options
        };
        var source = manager.cache[options.key];
        var __class__ = Anim[source.type];
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
  }, {
    key: "update",
    value: function update(delta) {
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
  }, {
    key: "destroy",
    value: function destroy(clearCache) {
      // this.list.length = 0;
      this.cache = {};
      this.anims = {};
      // this._addedAnims = {};
    }
  }]);
}();
Tiny.registerSystem('anim', AnimationManager);
;// ./packages/anim/index.js




Tiny.Anim = Anim;
Tiny.SpritesheetAnim = SpritesheetAnim;
Tiny.KeyframesAnim = KeyframesAnim;
/******/ })()
;