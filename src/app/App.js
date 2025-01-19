import { EventTarget } from '../utils/EventTarget.js';
import { SystemTarget } from '../utils/SystemTarget.js';
import { RAF } from './RAF.js';

var noop = function () {};

var App = function () {
  this.state = 0;
  this.timeScale = 1;
  this.time = 0;
  this.width = 0;
  this.height = 0;

  this.paused = false;
  this.pauseDuration = 0;
  this.inputView = document.body;

  this.updatable = [];
  this.resizable = [];

  if (!App.instance) App.instance = this;

  this.boot = this.boot || noop;
  this.preload = this.preload || noop;
  this.create = this.create || noop;
  this.update = this.update || noop;
  this.render = this.render || noop;

  var self = this;
  setTimeout(function () {
    self._boot();
  }, 0);
};

App.prototype._boot = function () {
  this.initSystems();
  this.raf = new RAF(this);
  this.boot();
  var self = this;
  setTimeout(function () {
    if (self.load) self._preload();
    else self._create();
  }, 0);
};

App.prototype._preload = function () {
  this.preload();
  this.state = 1;
  this.load.start(this._create);
};

App.prototype._create = function () {
  this.emit('load');
  this.create();

  if (this.raf) {
    this.raf.start();
  }

  this.state = 2;
};

App.prototype.pause = function () {
  if (this.raf) {
    this.raf.reset();
  }

  if (!this.paused) {
    for (var i = 0; i < this.systems.length; i++) {
      if (this.systems[i].pause) this.systems[i].pause();
    }

    this.paused = true;
  }
};

App.prototype.resume = function () {
  if (this.raf) {
    this.raf.reset();
  }

  if (this.paused) {
    for (var i = 0; i < this.systems.length; i++) {
      if (this.systems[i].resume) this.systems[i].resume();
    }

    this.paused = false;
  }
};

App.prototype._update = function (delta) {
  if (!this.paused) {
    delta *= this.timeScale;
    this.time += delta;
    this.update(this.time, delta);
    this.emit('update', delta);

    for (var i = 0; i < this.updatable.length; i++) {
      this.updatable[i].update(delta);
    }
  } else {
    this.pauseDuration += delta;
  }

  this.render();
  this.emit('postrender');
};

App.prototype.resize = function (width, height) {
  this.width = width || this.width;
  this.height = height || this.height;

  if (this.state > 0) {
    this.emit('resize', width, height);
  }

  var self = this;
  setTimeout(function () {
    for (var i = 0; i < self.resizable.length; i++) {
      self.resizable[i].resize(width, height);
    }
  }, 0);
};

App.prototype.destroy = function (clearCache) {
  this.disposeSystems();
  this.paused = true;

  if (clearCache && this.load) {
    this.load.clearCache();
  }

  if (this.raf) {
    this.raf.stop();
  }

  if (App.instance === this) App.instance = null;
};

EventTarget.mixin(App);
SystemTarget.mixin(App);

export { App };
