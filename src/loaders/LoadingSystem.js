import { App } from '../app/App.js';
import { EventTarget } from '../utils/EventTarget.js';
import { Cache } from './Cache.js';

var LoadingSystem = function (parent) {
  EventTarget.mixin(this);
  parent.cache = Cache;

  this.game = parent;
  this.list = [];
};

LoadingSystem.prototype = {
  dispose: function () {
    for (var y in Cache.texture) Cache.texture[y].destroy();
    for (var y in Cache) Cache[y] = {};
  },

  all: function (array) {
    this.list = this.list.concat(array);
  },

  start: function (callback) {
    var _this = this;
    var game = _this.game;
    var list = _this.list;

    var total = list.length;

    if (total == 0) {
      callback.call(game);
      return;
    }

    function loadNext() {
      // var done = false;
      var resource = list.shift();

      var loader = LoadingSystem[resource.type];

      if (loader) {
        loader(resource, loaded);
      } else {
        console.warn('Cannot find loader for ' + resource.type);
        loaded();
      }
    }

    function loaded(resource, data) {
      _this.emit('progress', 1 - list.length / total);
      if (list.length != 0) {
        loadNext();
      } else {
        _this.emit('complete');
        callback.call(game);
      }
    }

    loadNext();
  }
};

LoadingSystem.system = {
  name: 'load',
  rooted: true
};

App.registerSystem(LoadingSystem);

export { LoadingSystem };
