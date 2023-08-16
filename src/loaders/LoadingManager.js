import { registerSystem } from '../app/registrar';
import { EventEmitter } from '../utils/EventEmitter';
import { Cache } from './Cache';

var LoadingManager = function (parent) {
    EventEmitter.mixin(this);
    parent.cache = Cache;

    this.game = parent;
    this.list = [];
};

LoadingManager.prototype = {
    clearCache: function () {
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

            var loader = LoadingManager[resource.type];

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

registerSystem('load', LoadingManager);

export { LoadingManager };
