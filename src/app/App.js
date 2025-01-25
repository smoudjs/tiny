import { EventTarget } from '../utils/EventTarget.js';
import { SystemTarget } from '../utils/SystemTarget.js';
import { RAF } from './RAF.js';
import { getValue } from '../utils/index.js';

var noop = function () {};

var App = function (options) {
  this.state = 0;
  this.timeScale = getValue(options, 'timeScale', 0);
  this.time = 0;
  this.width = getValue(options, 'width', 0);
  this.height = getValue(options, 'height', 0);
  this.resolution = getValue(options, 'resolution', 1);
  this.paused = false;
  this.pauseDuration = 0;
  this.inputView = document.body;

  const RendererClass = getValue(options, 'renderer', null);
  if (RendererClass) {
    this.renderer = new RendererClass(options);
    this.inputView = this.renderer.domElement;
  } else {
    this.render = noop;
  }

  this.updatable = [];

  if (!App.instance) App.instance = this;

  this.boot = this.boot || noop;
  this.preload = this.preload || noop;
  this.create = this.create || noop;
  this.update = this.update || noop;

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

App.prototype.render = function () {
  this.renderer.render(this.scene, this.camera);
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

  if (this.renderer) this.renderer.resize(width, height);
};

App.prototype.setResolution = function (resolution) {
  this.resolution = resolution || this.resolution;
  if (this.renderer) this.renderer.setResolution(this.resolution);
  this.emit('resize', this.width, this.height);
};

App.prototype.destroy = function () {
  this.disposeSystems();
  this.paused = true;

  if (this.raf) {
    this.raf.stop();
  }

  if (this.renderer) this.renderer.dispose();

  this.emit('destroy');

  if (App.instance === this) App.instance = null;
};

EventTarget.mixin(App);
SystemTarget.mixin(App);

export { App };
