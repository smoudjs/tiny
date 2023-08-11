import { registerSystem } from './registrar';
import { EventEmitter } from '../utils/EventEmitter';

var Cache = {
    image: {},
    texture: {}
};

var Loader = function (game) {
    EventEmitter.mixin(this);
    game.cache = Cache;

    this.game = game;
    this.list = [];
};

Loader.prototype = {
    clearCache: function () {
        for (var y in Cache.texture) Cache.texture[y].destroy();

        for (var y in Cache) Cache[y] = {};
    },

    all: function (array) {
        this.list = this.list.concat(array);
    },

    image: function (key, source) {
        this.list.push({
            src: source,
            key: key,
            type: 'image'
        });
    },

    spritesheet: function (key, source, arg_1, arg_2, totalFrames, duration) {
        var res = {
            src: source,
            key: key,
            type: 'spritesheet'
        };

        if (typeof arg_1 == 'number') {
            res.width = arg_1;
            res.height = arg_2;
            res.total = totalFrames;
            res.duration = duration;
        } else if (arg_1.length > 0) {
            res.data = arg_1;
        }

        this.list.push(res);
    },

    atlas: function (key, source, atlasData) {
        this.list.push({
            src: source,
            key: key,
            data: atlasData,
            type: 'atlas'
        });
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

            var loader = Loader[resource.type];

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

Loader.atlas = function (resource, cb) {
    var key = resource.key;

    Loader.image(resource, function (resource, image) {
        for (var i = 0; i < resource.data.length; i++) {
            var uuid = key + '.' + resource.data[i].name;
            var texture = new Tiny.Texture(image, resource.data[i]);
            texture.key = key;

            Cache.texture[uuid] = texture;
        }

        cb();
    });
};

Loader.spritesheet = function (resource, cb) {
    var key = resource.key;

    Loader.image(resource, function (resource, image) {
        var lastFrame, uuid, texture;

        if (resource.data) {
            var frameData = resource.data;
            lastFrame = frameData.length - 1;

            for (var i = 0; i <= lastFrame; i++) {
                uuid = key + '.' + i;

                texture = new Tiny.Texture(image, {
                    name: i,
                    x: Math.floor(frameData[i].x),
                    y: Math.floor(frameData[i].y),
                    width: Math.floor(frameData[i].width),
                    height: Math.floor(frameData[i].height),
                    duration: frameData[i].duration
                });

                texture.key = key;
                texture.lastFrame = lastFrame;

                Cache.texture[uuid] = texture;
            }
        } else {
            var width = image.naturalWidth || image.width;
            var height = image.naturalHeight || image.height;

            var frameWidth = resource.width;
            var frameHeight = resource.height;

            if (!frameWidth) frameWidth = Math.floor(width / (resource.cols || 1));
            if (!frameHeight) frameHeight = Math.floor(height / (resource.rows || 1));

            var cols = Math.floor(width / frameWidth);
            var rows = Math.floor(height / frameHeight);

            var total = cols * rows;

            if (total === 0) {
                return cb();
            }

            if (resource.total) total = Math.min(total, resource.total);

            var x = 0;
            var y = 0;
            lastFrame = total - 1;

            for (var i = 0; i < total; i++) {
                uuid = key + '.' + i;
                texture = new Tiny.Texture(image, {
                    name: i,
                    x: x,
                    y: y,
                    width: frameWidth,
                    height: frameHeight,
                    duration: resource.duration
                });
                texture.key = key;
                texture.lastFrame = lastFrame;
                Cache.texture[uuid] = texture;

                x += frameWidth;

                if (x + frameWidth > width) {
                    x = 0;
                    y += frameHeight;
                }
            }
        }

        cb();
    });
};

Loader.image = function (resource, cb) {
    // if (Cache["image"][resource.key]) return cb(resource, Cache["image"][resource.key]);

    const image = new Image();

    image.addEventListener('load', function () {
        Cache.image[resource.key] = image;

        cb(resource, image);
    });

    // image.addEventListener('error', function()
    // {
    //     cb(resource, image);
    // })

    image.src = resource.src;
};

registerSystem('load', Loader);

export { Loader, Cache };
